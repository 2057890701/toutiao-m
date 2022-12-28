<template>
  <div class="article-item">
    <!-- <van-cell :to="'/article/' + articleItem.art_id"> -->
    <van-cell
      :to="{ name: 'article', params: { articleId: articleItem.art_id } }"
    >
      <template #title>
        <div class="van-multi-ellipsis--l2">{{ articleItem.title }}</div>
      </template>
      <template #default v-if="+articleItem.cover.type === 1">
        <van-image
          :src="articleItem.cover.images[0]"
          fit="cover"
          class="right-cover"
        ></van-image>
      </template>
      <template #label>
        <div class="cover-wrap">
          <div v-if="+articleItem.cover.type === 3" class="cover-item">
            <van-image
              v-for="src in articleItem.cover.images"
              :src="src"
              fit="cover"
              class="cover-item-img"
            ></van-image>
          </div>
          <div class="label-info-wrap">
            <span>{{ articleItem.aut_name }}</span>
            <span>{{ articleItem.comm_count }}评论</span>
            <span>{{ articleItem.pubdate | relativeTime }}</span>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: "articleItem",
  // 组件参数 接收来自父组件的数据
  props: {
    articleItem: {
      type: Object,
      required: true
    }
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    padding: 30px 0;
    //.cover-item:last-child : 选择最后一个子元素
    //.cover-item:not(:last-child) : 选择非最后一个子元素
    .cover-item {
      display: flex;
      // flex: 1;
      height: 146px;
      &:not(:last-child) {
        //嵌套语法里&代表父元素.cover-item
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
        margin: 0 5px;
      }
    }
  }
}
</style>
