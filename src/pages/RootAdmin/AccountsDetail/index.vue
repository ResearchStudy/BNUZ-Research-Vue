<template>
  <div class="accounts-detail__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>会员管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{accountsDetails.nickname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="accounts-detail__wrap">
      <div class="accounts-detail__title">基本信息</div>
      <el-form
        ref="accountsDetails"
        :model="accountsDetails"
        :rules="rules"
        label-width="120px"
        label-suffix=":"
      >
        <el-form-item label="真实姓名" prop="realname">
          <div class="content">
            <el-input v-model="accountsDetails.realname"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <div class="content">
            <el-input v-model="accountsDetails.nickname"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="个性签名" prop="motto">
          <div class="content">
            <el-input v-model="accountsDetails.motto"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="用户角色">
          <div class="content">
            <el-select
              v-model="accountsDetails.role"
              placeholder="请选择角色"
              filterable
              @change="handleRoleChange"
              value-key="id"
            >
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="头像">
          <div class="content">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :http-request="handleAvatarUpload"
            >
              <img v-if="accountsDetails.imageUrl" :src="accountsDetails.imageUrl" class="avatar" />
              <i v-if="!accountsDetails.imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="content">
            <el-button type="primary" @click="handleSaveClick('accountsDetails')">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import rules from "./validate";
export default {
  name: "AccountDetail",
  data() {
    return {
      id: -1,
      accountsDetails: {},
      roleList: [
        { label: "学生", value: 1 },
        { label: "家长", value: 2 },
        { label: "系统管理员", value: 99 }
      ],
      rules: rules
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.id = id;
    await this.getAccountDetail();
  },
  methods: {
    async getAccountDetail() {
      const { data } = await this.$http.get(`/api/accounts/${this.id}`);
      this.accountsDetails = {
        ...data,
        imageUrl: ""
      };
      this.accountsDetails.imageUrl = await this.getPreImageInfo();
    },
    handleRoleChange(role) {
      this.accountsDetails.role = role;
    },
    getPreImageInfo() {
      return new Promise(async resolve => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = `/api/resources/${this.accountsDetails.avator}`;
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const res = canvas.toDataURL("image/jpeg");
          resolve(res);
        };
      });
    },
    async handleAvatarUpload({ file }) {
      this.isUploaded = true;
      this.accountsDetails.imageUrl = await this.getImageInfo(file);
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message({
          type: "error",
          message: "只能JPG或者PNG"
        });
      }
      if (!isLt2M) {
        this.$message({
          type: "error",
          message: "超过2M"
        });
      }
      return (isJPG || isPNG) && isLt2M;
    },
    handleSaveClick(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const {
            nickname,
            realname,
            motto,
            role,
            imageUrl
          } = this.accountsDetails;
          await this.$http.put(`/api/accounts/${this.id}`, {
            nickname,
            realname,
            motto,
            role,
            avator: imageUrl
          });
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$router.push({
            path:'/root-admin/accounts'
          })
        } else {
          this.$message({
            type: "error",
            message: "请按要求完成表格"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.accounts-detail {
  &__container {
  }

  &__title {
    margin-bottom: 30px;
    color: #333;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 8px;
  }

  &__wrap {
    margin-top: 20px;
    padding: 10px;
    background: #fff;

    .content {
      max-width: 80%;
      margin-left: 30px;
      color: #666;
    }

    /deep/ .el-form-item {
      margin-bottom: 16px;
    }

    /deep/ .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    /deep/ .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }

    /deep/ .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    /deep/ .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    /deep/ .el-form-item__content {
      margin-bottom: 10px;
    }

    /deep/ .el-form-item__error {
      margin-left: 30px;
    }
  }
}
</style>