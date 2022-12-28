<template>
  <div class="channel-edit">
    <van-cell title="我的频道" class="title-text" :border="false">
      <template>
        <van-button type="default" round class="edit-btn">编辑</van-button>
      </template>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        :text="channel.name"
        :class="{ active: index === active }"
        icon="clear"
        class="grid-item"
      />
    </van-grid>

    <van-cell title="推荐频道" class="title-text" :border="false"> </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        v-for="channel in recommendChannels"
        icon="plus"
        class="grid-item"
        :key="channel.id"
        :text="channel.name"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
// 这个组件，负责频道编辑弹层内的所有逻辑
export default {
  name: 'ChannelEdit',
  props: {
    // abc-foo-bar => abcFooBar
    // props命名:
    // 1. 在html中，因为html不区分大小写，所以多个单词使用`-`连字符把多个单词连起来
    // 2. 在js中，变量名是区分大小写，所以我们习惯写小驼峰的变量名，vue会把二者关联对应
    // 3. 这个对应，仅仅是props数据，自定义事件@事件名不适用这个规则，事件名严格对应，写什么用什么
    //    自定义事件: 例如@abc-foo，触发用this.$emit('abc-foo'); @updateName, 触发用this.$emit('updateName')
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: []
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const ret = await getAllChannels()
        this.allChannels = ret.data.data.channels
      } catch (err) {
        this.$toast.fail('获取所有频道数据失败')
      }
    }
  },
  computed: {
    // 数组方法回忆:
    // 1. some (某一个) 判断数组中有没有符合条件的元素，只要有一个符合条件 就返回 true; 如果全部都没有，才返回false
    // 2. every (每一个) 判断数组中是不是 每一个都符合条件，如果全部都符合，才返回true；只要任何一个不符合就返回false
    // 这个数据只是获取，没有赋值，所以用计算属性的简写形式就够
    recommendChannels() {
      const { allChannels, myChannels } = this
      const target = [] // 存储推荐频道数据的数组
      // allChannels - myChannels = recommendChannels
      // 遍历allChannels的每一项，判断这一项是否在myChannels中，如果在，不算推荐频道数据；如果不在，才算推荐频道数据
      allChannels.forEach(allChannelItem => {
        // 判断allChannelItem项的id，在myChannels中有没有。如果有，返回true 即存在，否则返回false
        const isExist = myChannels.some(myChannelItem => myChannelItem.id === allChannelItem.id)
        if (!isExist) {
          // 存入推荐频道数组中
          target.push(allChannelItem)
        }
      })
      return target
    },
    // 简化实现
    recommendChannels2() {
      return this.allChannels.filter(
        allChannelItem => !this.myChannels.some(myChannelItem => myChannelItem.id === allChannelItem.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 134px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
}

// 公共的grid-item样式
/deep/ .grid-item {
  width: 160px;
  height: 86px;
  margin-bottom: 10px;
  &.active .van-grid-item__text {
    color: red !important;
  }
  .van-grid-item__content {
    white-space: nowrap;
    background-color: #f4f5f6;
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
  }
}

// 推荐频道下的grid-item样式
/deep/ .recommend-grid {
  .grid-item {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}

// 我的频道下的grid-item样式
/deep/ .my-grid {
  .grid-item {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }
  }
}
</style>
