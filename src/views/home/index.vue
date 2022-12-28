<template>
  <div class="home_container">
    <van-nav-bar left-arrow fixed>
      <template #title>
        <van-button type="info" size="small" round to="/search"
          ><van-icon name="search" />搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="show = true">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <van-popup
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEditVue
        :active="active"
        :my-channels="channels"
        @update-active="updateActive"
      ></ChannelEditVue>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from "@/views/home/components/article-list.vue"
import { getUserChannels } from "@/api/login"
import ChannelEditVue from "@/views/home/components/channelEdit.vue"
import { mapState } from "vuex"
import { getItem } from "@/utils/storage"
export default {
  // 组件名称
  name: "HomeIndex",
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    ArticleList,
    ChannelEditVue
  },
  // 组件状态值
  data() {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },
  // 计算属性
  computed: {
    ...mapState(["UserToken"])
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async loadUserChannels() {
      try {
        let channels = []
        if (this.UserToken) {
          // 已登录，请求获取线上的频道数据
          const { data } = await getUserChannels() //这时获取到的是“登录用户的频道列表”
          channels = data.data.channels
        } else {
          // 未登录
          const localChannels = getItem("TOUTIAO_CHANNELS")
          if (localChannels) {
            // 有本地频道数据，则使用
            channels = localChannels
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            const { data } = await getUserChannels() //这时获取到的是“默认的频道列表”
            channels = data.data.channels
          }
        }

        // 将数据更新到组件中
        this.channels = channels
      } catch (err) {
        console.log(err)
        this.$toast("数据获取失败")
      }
    },
    updateActive(index, isShow = true) {
      this.active = index
      this.show = isShow
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    this.loadUserChannels()
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
}
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.home_container {
  padding-top: 92px;
  padding-bottom: 100px;

  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      //这里只需要给父节点channel-tabs添加/deep/,这样下边的子节点都会生效
      height: 82px;
    }

    /deep/ .van-tab {
      //这个比较特殊，我们在结构中写有van-tab标签，但是在渲染的时候没有data标记，所以也需要deep
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
  }
  .placeholder {
    //占位元素为了解决最后一个tab标签被汉堡盖住问题（看下边的图）
    flex-shrink: 0; //此元素不参与flex的
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.iconfont {
      font-size: 33px;
    }
    &:before {
      //找到父节点，添加伪元素（这个是汉堡按钮与tab之间的一个竖线）
      content: "";
      position: absolute;
      left: 0;
      width: 1px; //在模拟器上看不到（手机上没问题），如果想看到改为2px
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
