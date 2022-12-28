<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}
      </van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        :text="channel.name"
        :icon="isEdit && !fixedChannels.includes(channel.id) ? 'clear' : ''"
        :class="{ active: index === active }"
        @click="onMyChannelClick(channel, index)"
      />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from "@/api/channel"
import { mapState } from "vuex"
import { setItem } from "@/utils/storage"
export default {
  name: "ChannelEdit",
  components: {},
  props: {
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
      allChannels: [],
      isEdit: false,
      fixedChannels: [0, 1]
    }
  },
  computed: {
    recommendChannels() {
      const { allChannels, myChannels } = this
      const target = []
      allChannels.forEach((allChannels) => {
        const isExist = myChannels.some(
          (myChannels) => myChannels.id === allChannels.id
        )
        if (!isExist) target.push(allChannels)
      })
      console.log(target)
      return target
    },
    // 简化实现
    recommendChannels2() {
      return this.allChannels.filter(
        (allChannelItem) =>
          !this.myChannels.some(
            (myChannelItem) => myChannelItem.id === allChannelItem.id
          )
      )
    },
    ...mapState(["UserToken"])
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const ret = await getAllChannels()
        console.log("ret1", ret)
        this.allChannels = ret.data.data.channels
        console.log(this.allChannels)
      } catch (err) {
        console.log("err", err)
      }
    },
    async onAddChannel(channel) {
      this.myChannels.push(channel)
      if (this.UserToken) {
        try {
          await addUserChannel({
            channels: [
              {
                id: channel.id,
                seq: this.myChannels.length + 1
              }
            ]
          })
          this.$toast.success("新增成功")
        } catch (err) {
          this.$toast.success("新增失败")
        }
      } else {
        setItem("TOUTIAO-CHANNELS", this.myChannels)
      }
    },
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        if (this.fixedChannels.includes(channel.id)) return
        this.myChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true)
        }
        // 4. 处理持久化 (添加这行代码)
        this.deleteChannel(channel)
      } else {
        this.$emit("update-active", index, false)
      }
    },
    async deleteChannel(channel) {
      if (this.UserToken) {
        try {
          await deleteUserChannel(channel.id)
          this.$toast.success("删除成功")
        } catch (e) {
          this.$toast.success("删除失败")
        }
      } else {
        setItem("TOUTIAO-CHANNELS", this.myChannels)
      }
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
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    &.active .van-grid-item__text {
      color: red !important;
    }

    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
        margin-top: 0em;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 25px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
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
}
</style>
