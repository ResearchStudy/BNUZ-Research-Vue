<template>
  <div class="institution-admin-dashboard__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户中心</el-breadcrumb-item>
      <el-breadcrumb-item>基本资料</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="institution-admin-dashboard__main">
      <div class="institution-admin-dashboard__wrap">
        <div class="institution-admin-dashboard__title">基本资料</div>
        <el-form ref="form" label-width="120px" label-suffix=":">
          <el-form-item label="企业名称">
            <div class="content">
              <el-input v-model="institutionDetails.name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="企业注册号">
            <div class="content">
              <el-input v-model="institutionDetails.tax_id"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="企业类型">
            <div class="content">
              <el-input v-model="institutionDetails.institution_type"></el-input>
            </div>
          </el-form-item>
          <div style="display:flex">
            <el-form-item label="省份" style="width:50%">
              <div class="content">
                <el-input v-model="institutionDetails.province_name"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="城市" style="width:50%">
              <div class="content">
                <el-input v-model="institutionDetails.city_name"></el-input>
              </div>
            </el-form-item>
          </div>
          <el-form-item label="详细地址">
            <div class="content">
              <el-input v-model="institutionDetails.details"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="法定代表人">
            <div class="content">
              <el-input v-model="institutionDetails.legal_person"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="成立时间">
            <div class="content">
              <el-date-picker
                type="date"
                v-model="institutionDetails.establish_time"
                placeholder="成立时间"
                value-format="timestamp"
                style="width: 100%;"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="注册资金">
            <div class="content">
              <el-input v-model="institutionDetails.registered_money"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="营业期限">
            <div class="content">
              <!-- <el-col :span="11">
                <el-date-picker
                  type="date"
                  v-model="institutionDetails.business_license_start_time"
                  value-format="timestamp"
                  placeholder="开始时间"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  v-model="institutionDetails.business_license_ent_time"
                  value-format="timestamp"
                  placeholder="结束时间"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>-->
              <el-date-picker
                style="width:100%"
                unlink-panels
                v-model="timeRange"
                value-format="timestamp"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="登记机关">
            <div class="content">
              <el-input v-model="institutionDetails.registration_authority"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="核准时间">
            <div class="content">
              <el-date-picker
                type="date"
                v-model="institutionDetails.approval_time"
                value-format="timestamp"
                placeholder="核准时间"
                style="width: 100%;"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="联系电话">
            <div class="content">
              <el-input v-model="institutionDetails.phone"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="经营范围">
            <div class="content">
              <el-input type="textarea" v-model="institutionDetails.business_scope"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="头像">
            <div class="content">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :on-progress="handleAvatarProgress"
              >
                <el-progress
                  class="upload-progress"
                  v-if="isUploading"
                  type="circle"
                  :percentage="uploadPercent"
                ></el-progress>
                <img v-if="imageUrl && !isUploading" :src="imageUrl" class="avatar" />
                <i v-if="!imageUrl && !isUploading" class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="更多发票信息">
            <div class="content">
              <el-switch v-model="isMore" active-color="#409EFF" inactive-color="#d7d7d7"></el-switch>
            </div>
          </el-form-item>
          <div v-if="isMore">
            <el-form-item label="发票抬头">
              <div class="content">
                <el-input v-model="institutionDetails.invoice_rise"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="纳税人识别号">
              <div class="content">
                <el-input v-model="institutionDetails.taxpayer_distinguish"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="电话号码">
              <div class="content">
                <el-input v-model="institutionDetails.phone"></el-input>
              </div>
            </el-form-item>
          </div>
          <el-form-item>
            <div class="content">
              <el-button type="primary" @click="handleSaveClick">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InsitutionAdminDashBoard",
  data() {
    return {
      id: -1,
      isMore: false,
      isUploading: false,
      institutionDetails: {},
      timeRange: [],
      imageUrl: "",
      uploadPercent: 0
    };
  },
  async mounted() {
    const {
      getters: { userInfo }
    } = this.$store;
    const { id } = userInfo;
    this.id = id;
    await this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const {
        data: { institution_details }
      } = await this.$http.get(`/api/institutions/me`);
      const {
        establish_time,
        approval_time,
        business_license_start_time,
        business_license_ent_time,
        logo,
        address: { province_name, city_name, details }
      } = institution_details;
      this.institutionDetails = {
        ...institution_details,
        establish_time: establish_time * 1000,
        approval_time: approval_time * 1000,
        province_name,
        city_name,
        details
      };
      this.timeRange = [
        business_license_start_time * 1000,
        business_license_ent_time * 1000
      ];
      this.imageUrl = "/api/resources/" + logo;
    },
    async handleSaveClick() {
      const [
        business_license_start_time,
        business_license_ent_time
      ] = this.timeRange;
      const {
        name,
        invoice_rise,
        taxpayer_distinguish,
        phone,
        address_id,
        logo
      } = this.institutionDetails;
      console.log(
        name,
        invoice_rise,
        taxpayer_distinguish,
        phone,
        address_id,
        logo,
        business_license_start_time,
        business_license_ent_time,
      );
    },
    handleAvatarProgress(event) {
      this.isUploading = true;
      this.uploadPercent = parseInt(event.percent.toFixed(0));
    },
    handleAvatarSuccess(res, file) {
      this.isUploading = false;
      this.uploadPercent = 0;
      // this.imageUrl = URL.createObjectURL(file.raw);
      const reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = e => {
        this.imageUrl = e.target.result;
      };
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
    }
  }
};
</script>

<style lang="scss" scoped>
.institution-admin-dashboard {
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

  &__main {
    background: #fff;
  }

  &__wrap {
    width: 70%;
    margin-top: 20px;
    padding: 10px;

    .content {
      // max-width: 50%;
      margin-left: 30px;
      color: #666;

      .upload-progress {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 178px;
        height: 178px;
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
    }

    .logo {
      width: 50%;
      height: 300px;
      margin-top: 13px;
      margin-left: 30px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      // background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    }

    /deep/ .el-form-item {
      margin-bottom: 16px;
    }
  }
}
</style>