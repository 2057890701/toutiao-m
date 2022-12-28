<template>
  <div class="update-photo">
    <img :src="img" class="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css"
import Cropper from "cropperjs"
import { updateUserPhoto } from "@/api/user"
export default {
  // 组件名称
  name: "UpdatePhoto",
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  // 组件状态值
  data() {
    return { cropper: null }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {},
  mounted() {
    this.cropper = new Cropper(this.$refs.img, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: "move", // 画布可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
    console.log(this.cropper)
  },
  // 组件方法
  methods: {
    onConfirm() {
      // 配合服务器裁剪的 基于服务端的裁切使用 getData 方法获取裁切参数
      //  console.log(this.cropper.getData())
      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob)
        this.updateUserPhoto(blob)
      })
    },
    async updateUserPhoto(blob) {
      try {
        this.$toast.loading({
          message: "保存中...",
          forbidClick: true, // 禁止背景点击
          duration: 0 // 持续展示
        })
        const formData = new FormData()
        formData.append("photo", blob)
        formData.append('type', 'avatar')
        const ret = await updateUserPhoto(formData)
        this.$emit("update-photo", ret.data.data.photo)
        this.$emit("close")
        this.$toast.success("更新成功")
      } catch (e) {
        console.log(e)
        this.$toast.fail("更新失败")
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
