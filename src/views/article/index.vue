<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- <FollowedUser
            :is_followed="article.is_followed"
            :aut_id="article.aut_id"
            @update-is_Followed="article.is_followed = $event"
          ></FollowedUser> -->
          <FollowedUser
            v-model="article.is_followed"
            :aut_id="article.aut_id"
          ></FollowedUser>
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
            v-if="article.is_followed"
            @click="onFollowed"
            :loading="isFollowedLoading"
            >已关注</van-button
          >
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-else
            @click="onFollowed"
            :loading="isFollowedLoading"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- <ComponentListVue :source="articleId"/> -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-button icon="comment-o"></van-button>
          <StarArticle v-model="article.is_collected" :articleId="articleId" />
          <LikeArticle v-model="article.attitude" :articleId="articleId" />
          <van-button icon="share"></van-button>
        </div>
        <!-- /底部区域 -->
        <!-- //底部区域下方添加 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost :target="article.art_id" @post-success="onPostSuccess" />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="+errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <ComponentListVue
        :source="articleId"
        :list="commentList"
        @reply-click="onReplyClick"
      />
    </div>
    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
      close-icon-position="top-left"
    >
      <CommentReply :comment="currentComment" @close="isReplyShow = false" v-if="isReplyShow"
    /></van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from "@/api/article"
// import { deleteFollowed, addFollowed } from "@/api/user"
import { ImagePreview } from "vant"
import FollowedUser from "@/components/followed-user"
import ComponentListVue from "./components/comment-list.vue"
import StarArticle from "@/components/star-article"
import LikeArticle from "@/components/like-article"
import CommentPost from "@/views/article/components/comment-post.vue"
import CommentReply from "@/views/article/components/comment-reply.vue"
export default {
  // 组件名称
  name: "ArticleIndex",
  // 组件参数 接收来自父组件的数据
  props: {
    articleId: {
      type: [String, Array],
      required: true
    }
  },
  // 局部注册的组件
  components: {
    FollowedUser,
    ComponentListVue,
    StarArticle,
    LikeArticle,
    CommentPost,
    CommentReply
  },
  // 组件状态值
  data() {
    return {
      isReplyShow: false,
      article: {},
      isLoading: true, // 文章加载状态
      errStatus: "", // 请求异常状态
      isFollowedLoading: false,
      totalCommentCount: 0,
      isPostShow: false,
      commentList: [],
      currentComment: {} //  当前点击回复的评论项
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    onReplyClick(comment) {
      // 将子组件中传给我评论对象存储到当前组件
      this.currentComment = comment

      // 展示评论回复弹层
      this.isReplyShow = true
    },
    onPostSuccess(data) {
      // 关闭弹出层
      this.isPostShow = false
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data)
      this.totalCommentCount++ // 发布评论成功，评论总数+1
    },
    async loadArticle() {
      try {
        this.isLoading = true
        const ret = await getArticleById(this.articleId)
        // throw new Error('模拟异常')
        console.log("ret article", ret)
        this.article = ret.data.data
        this.isLoading = false
        this.$nextTick(() => {
          console.log(
            "imgs",
            document.querySelector(".article-content").querySelectorAll("img")
          )
          console.log(
            "imgs",
            this.$refs["article-content"].querySelectorAll("img")
          )
          this.previewImage()
        })
      } catch (e) {
        console.log(e)
        this.errStatus = e?.response?.status || "其他异常"
        this.isLoading = false
      }
    },
    previewImage() {
      const imgs = Array.from(
        this.$refs["article-content"].querySelectorAll("img")
      )
      const images = imgs.map((it) => it.src)
      imgs.forEach((img, i) => {
        img.onclick = function () {
          ImagePreview({
            images,
            startPosition: i
          })
        }
      })
    }
    // async onFollowed() {
    //   try {
    //     this.isFollowedLoading = true
    //     if (this.article.is_followed) {
    //       await deleteFollowed(this.article.aut_id)
    //     } else {
    //       await addFollowed(this.article.aut_id)
    //     }
    //     this.article.is_followed = !this.article.is_followed
    //     this.isFollowedLoading = false
    //   } catch (e) {
    //     if (+e?.response.status === 400) {
    //       this.$toast.fail(e?.response?.data?.message || "自己不能关注自己")
    //     } else {
    //       this.$toast.fail(
    //         this.article.is_followed ? "取消关注用户失败" : "关注用户失败"
    //       )
    //     }
    //     console.log(e)
    //     this.isFollowedLoading = false
    //   }
    // }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.loadArticle()
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
