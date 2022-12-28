<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <articleItem v-for="(item, index) in list" :articleItem="item" :key="index"></articleItem>
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import articleItem from "@/components/articleItem/articleItem.vue"
import { loadArticleList } from "@/api/channel"
export default {
  // 组件名称
  name: "ArticleList",
  // 组件参数 接收来自父组件的数据
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  // 局部注册的组件
  components: {
    articleItem
  },
  // 组件状态值
  data() {
    return {
      list: [], // 文章列表数据
      timestamp: null, // 请求时间戳
      loading: false, // 标识是否正在获取列表数据
      finished: false, // 标识列表数据已经全部拿到
      error: false, // 标识获取列表数据异常
      isRefreshLoading: false, // 标识是否处于下拉刷新中
      successText: ""
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async onRefresh() {
      try {
        const ret = await loadArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 0
        })
        this.isRefreshLoading = false
        this.list.unshift(...(ret?.data?.data?.results || []))
        this.successText = `刷新成功,更新了${ret.data?.data?.results.length}条数据`
      } catch {
        this.successText = "刷新失败, 请重试"
        this.isRefreshLoading = false
      }
    },
    async onLoad() {
      try {
        const ret = await loadArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 0
        })
        // if (Math.random() > 0.5) {
        //   throw new Error("模拟的异常")
        // }
        console.log(ret)
        this.list.push(...(ret?.data?.data?.results || []))
        if (ret.data?.data?.results.length) {
          this.timestamp = ret.data.data.pre_timestamp
        } else {
          this.finished = true
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        this.error = true
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },

    async loadArticleList() {
      try {
        const ret = await loadArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 0
        })
        console.log("ret", ret)
        this.list = ret.data.data.results
        this.timestamp = ret.data.data.pre_timestamp
      } catch (err) {
        console.error(err)
      }
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {
    // this.loadArticleList()
  },
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  mounted() {}
}
</script>

<style scoped lang="less">
.article-list {
  height: 80.2vh;
  overflow-y: auto;
}
</style>
