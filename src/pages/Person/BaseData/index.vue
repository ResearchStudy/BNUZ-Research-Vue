<template>
  <div class="base-data_container">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-top:2px"
    >
      <el-breadcrumb-item :to="{ path: '/person' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号中心</el-breadcrumb-item>
      <el-breadcrumb-item>基本资料</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="base-data_wrap">
      <div class="base-data_form">
        <el-form
          label-width="80px"
          :model="form"
          ref="form"
          :rules="rules"
        >
          <el-form-item
            label="用户昵称"
            prop="nickname"
          >
            <el-input
              v-model="form.nickname"
              style="margin-bottom:20px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="姓名"
            prop="name"
          >
            <el-input
              v-model="form.name"
              style="margin-bottom:20px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电话"
            prop="phone"
          >
            <el-input
              v-model="form.phone"
              style="margin-bottom:20px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="form.email"
              style="margin-bottom:20px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width:100px "
              type="primary"
              @click="onSubmit"
            >提交</el-button>
            <el-button
              style="width:100px;margin-left:20px"
              @click="handleCancel"
            >取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="base-data_avatar">
        <span>头像设置</span>
        <!-- <el-upload
          class="base-data_avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :http-request="handleAvatarUpload"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="base-data_img-avatar"
          >
          
          <i
            v-else
            class="el-icon-plus base-data_avatar-uploader-icon"
          ></i>
        </el-upload> -->
        <img
          v-if="imageUrl"
          :src="imageUrl"
          class="base-data_img-avatar"
        >
        <App-Cropper :imageUrl.sync="imageUrl">
        </App-Cropper>
      </div>

    </div>

  </div>

</template>

<script>
import AppCropper from "@/components/Cropper/index.vue";
export default {
  name: "BaseData",
  components: {
    AppCropper
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      console.log(reg.test(value));
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("手机格式有误"));
      }
    };

    let checkEmail = (rlue, value, callback) => {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("邮箱格式有误"));
      }
    };

    return {
      imageUrl: "",
      isUploaded: false,
      preImageUrl: "",
      seen: false,
      form: {
        nickname: "111",
        name: "",
        phone: "",
        email: "",
        token: "",
        id: ""
      },

      rules: {
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        name: [{ required: true, message: "名字不能为空", trigger: "blur" }],
        nickname: [{ required: true, message: "昵称不能为空", trigger: "blur" }]
      }
    };
  },
  async mounted() {
    await this.getUserInfo();
  },

  methods: {
    async handleCancel() {
      window.location.reload();
    },
    async ChangeImg(params) {
      this.imageUrl = params;
    },
    async getUserInfo() {
      this.form.id = this.$store.getters.userInfo.id;
      console.log(this.form.id);
      await this.$http.get("/api/accounts/" + this.form.id).then(res => {
        console.log(res.data);
        this.form.nickname = res.data.nickname;
        this.form.name = res.data.realname;
        this.form.email = res.data.email;
        this.form.phone = res.data.phone;
        this.form.token = res.data.avator;
        this.imageUrl = "/api/resources/" + this.form.token;
        
      });
      this.preImageUrl = await this.getPreImageInfo();
    },

    async handleAvatarUpload({ file }) {
      this.isUploaded = true;
      this.imageUrl = await this.getImageInfo(file);
    },
    getPreImageInfo() {
      return new Promise(async resolve => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = this.imageUrl;

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const res = canvas.toDataURL("image/jpeg");
          resolve(res);
        };
      });
    },
    getImageInfo(file) {
      return new Promise(async resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          resolve(e.target.result);
        };
      });
    },
    async onSubmit() {
      await this.$refs.form.validate(valid => {
        if (valid) {
          const EditInfo = {
            nickname: this.form.nickname,
            realname: this.form.name,
            avator: this.imageUrl,
            phone: this.phone,
            email: this.email
          };

          this.$http
            .put("/api/accounts/" + this.form.id, EditInfo)
            .then(res => {
              if (res.data.id !== null) {
                this.$message({
                  type: "success",
                  message: "修改信息成功!",
                  isSingle: true
                });
                window.location.reload();
              }
            })
            .catch(err => {
              console.log(err);
              this.$message({
                type: "error",
                message: "修改失败！！!",
                isSingle: true
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "请正确填写信息！",
            isSingle: true
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.base-data {
  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 13px;
    background: #fff;
  }
  &_container {
  }
  &_wrap {
    margin-top: 20px;
    padding: 10px;
  }

  &_form {
    float: left;
    width: 40%;
    margin-left: 15%;
    margin-top: 5%;
    text-align: center;
    margin-bottom: 3%;
  }

  &_avatar {
    float: right;
    margin-top: 7%;
    margin-right: 20%;
    text-align: center;
  }
  &_avatar-uploader /deep/ .el-upload {
    margin-top: 10px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  &_avatar-uploader /deep/ .el-upload:hover {
    border-color: #409eff;
  }
  &_avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  &_img-avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>