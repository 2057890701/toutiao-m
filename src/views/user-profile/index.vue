<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" ref="file" hidden @change="onFileChange" />
    <van-popup
      v-model="isUpdatePhotoShow"
      style="height: 100%;"
      position="bottom"
    >
      <UpdatePhoto
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
        v-if="isUpdatePhotoShow"
      />
    </van-popup>
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
        @click="$refs.file.click()"
      />
    </van-cell>

    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender == 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />

    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 70%;"
      close-icon-position="top-left"
      position="bottom"
    >
      <UpdateName
        @close="isUpdateNameShow = false"
        v-model="user.name"
        v-if="isUpdateNameShow"
      />
    </van-popup>
    <van-popup
      v-model="isUpdateGenderShow"
      style="height: 70%;"
      close-icon-position="top-left"
      position="bottom"
    >
      <UpdateGender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <van-popup
      v-model="isUpdateBirthdayShow"
      style="height: 70%;"
      close-icon-position="top-left"
      position="bottom"
    >
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>
  </div>
</template>
<script>
import { getUserProfile } from "@/api/user"
import UpdateName from "./components/update-name.vue"
import UpdateGender from "./components/update-gender.vue"
import UpdateBirthday from "./components/update-birthday.vue"
import UpdatePhoto from "./components/update-photo.vue"
export default {
  // 组件名称
  name: "UserProfile",
  // 局部注册的组件
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: ""
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  created() {
    this.loadUserProfile()
  },
  mounted() {},
  // 组件方法
  methods: {
    async loadUserProfile() {
      try {
        const ret = await getUserProfile()
        console.log(ret)
        this.user = ret.data.data
        console.log(this.user)
      } catch (e) {
        console.log("e user-profile", e)
      }
    },
    onFileChange(e) {
      // 获取文件对象
      const file = e.target.files[0]
      console.log(file)
      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      //  file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      e.target.value = ""
      console.log(this.img)
    }
  }
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }

  .photo-cell {
    .van-cell__value {
      display: flex;
      flex-direction: row-reverse;
    }
  }
}
</style>
