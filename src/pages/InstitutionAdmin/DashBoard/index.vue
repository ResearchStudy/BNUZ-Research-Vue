<template>
  <div class="institution-admin-dashboard__container">
    <el-dialog
      title="编辑头像"
      width="1000px"
      :visible="isModalOpened"
      :before-close="hanldeModalClose"
      top="5vh"
    >
      <div class="cropper__container">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <vueCropper
              style="width:100%;height:400px"
              ref="cropper"
              :img="institutionDetails.imageUrl"
              :autoCrop="true"
              :fixedBox="false"
              :canMoveBox="false"
              :autoCropWidth="200"
              :autoCropHeight="200"
              :centerBox="true"
              @realTime="generatePreviews"
            />
          </el-col>
          <el-col :span="7">
            <div class="cropper__wrap">
              <div class="cropper__title">裁剪预览</div>
              <div :style="previews.div" class="cropper__preview">
                <img :src="previews.url" :style="previews.img" />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-button type="primary" @click="handleImageCut">确认</el-button>
          <el-button type="primary" @click="hanldeModalClose">取消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户中心</el-breadcrumb-item>
      <el-breadcrumb-item>基本资料</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="institution-admin-dashboard__main">
      <div class="institution-admin-dashboard__wrap">
        <div class="institution-admin-dashboard__title">基本资料</div>
        <el-form
          ref="institutionDetails"
          :model="institutionDetails"
          :rules="rules"
          label-width="120px"
          label-suffix=":"
        >
          <el-form-item label="企业名称" prop="name">
            <div class="content">
              <el-input v-model="institutionDetails.name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="企业注册号" prop="tax_id">
            <div class="content">
              <el-input v-model="institutionDetails.tax_id"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="企业类型" prop="institution_type">
            <div class="content">
              <el-input v-model="institutionDetails.institution_type"></el-input>
            </div>
          </el-form-item>
          <div style="display:flex">
            <el-form-item label="省份" style="width:50%">
              <div class="content">
                <el-select
                  v-model="institutionDetails.province_id"
                  placeholder="请选择省份"
                  filterable
                  @change="handleProvinceChange"
                  value-key="id"
                >
                  <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="城市" style="width:50%">
              <div class="content">
                <el-select
                  v-model="institutionDetails.city_id"
                  filterable
                  value-key="id"
                  placeholder="请选择城市"
                >
                  <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </div>
          <el-form-item label="详细地址" prop="details">
            <div class="content">
              <el-input v-model="institutionDetails.details"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="法定代表人" prop="legal_person">
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
                :clearable="false"
                :editable="false"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="注册资金" prop="registered_money">
            <div class="content">
              <el-input v-model="institutionDetails.registered_money"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="营业期限">
            <div class="content">
              <el-date-picker
                style="width:100%"
                unlink-panels
                v-model="institutionDetails.timeRange"
                value-format="timestamp"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
                :editable="false"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="登记机关" prop="registration_authority">
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
                :clearable="false"
                :editable="false"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <div class="content">
              <el-input v-model="institutionDetails.phone"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="经营范围" prop="business_scope">
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
                :before-upload="beforeAvatarUpload"
                :http-request="handleAvatarUpload"
                accept=".png, .jpg, .jpeg"
              >
                <img
                  v-if="institutionDetails.imageUrl"
                  :src="institutionDetails.imageUrl"
                  class="avatar"
                />
                <i v-if="!institutionDetails.imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="更多发票信息">
            <div class="content">
              <el-switch v-model="isMore" active-color="#409EFF" inactive-color="#d7d7d7"></el-switch>
            </div>
          </el-form-item>
          <div v-if="isMore">
            <el-form-item label="发票抬头" prop="invoice_rise">
              <div class="content">
                <el-input v-model="institutionDetails.invoice_rise"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="纳税人识别号" prop="taxpayer_distinguish">
              <div class="content">
                <el-input v-model="institutionDetails.taxpayer_distinguish"></el-input>
              </div>
            </el-form-item>
          </div>
          <el-form-item>
            <div class="content">
              <el-button type="primary" @click="handleSaveClick('institutionDetails')">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
import ruleList from "./validate";
export default {
  name: "InsitutionAdminDashBoard",
  data() {
    return {
      institutionId: -1,
      isMore: false,
      isUploaded: false,
      institutionDetails: {},
      provinceList: [],
      cityList: [],
      addressList: [],
      preProvinceId: -1,
      preCityId: -1,
      preImageUrl: "",
      preDetails: "",
      rules: ruleList,
      isModalOpened: false,
      previews: {}
    };
  },
  async mounted() {
    await this.getInstitutionInfo();
  },
  methods: {
    async getInstitutionInfo() {
      const {
        data: { institution_details, id }
      } = await this.$http.get(`/api/institutions/me`);
      const {
        establish_time,
        approval_time,
        business_license_start_time,
        business_license_ent_time,
        logo,
        address: { details, province_name, city_name }
      } = institution_details;
      this.institutionId = id;

      await this.getProvinceList();
      const provinceId = this.provinceList.filter(
        province => province.name === province_name
      )[0].id;
      await this.getCityList(provinceId);
      const cityId = this.cityList.filter(city => city.name === city_name)[0]
        .id;

      this.preProvinceId = provinceId;
      this.preCityId = cityId;
      this.preDetails = details;
      this.institutionDetails = {
        ...institution_details,
        establish_time: establish_time * 1000,
        approval_time: approval_time * 1000,
        details,
        province_id: provinceId,
        city_id: cityId,
        timeRange: [
          business_license_start_time * 1000,
          business_license_ent_time * 1000
        ],
        imageUrl: "/api/resources/" + logo
      };
      this.preImageUrl = await this.getPreImageInfo();
    },
    handleSaveClick(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const [
            business_license_start_time,
            business_license_ent_time
          ] = this.institutionDetails.timeRange;
          const {
            name,
            invoice_rise,
            approval_time,
            taxpayer_distinguish,
            phone,
            institution_type,
            establish_time,
            legal_person,
            registered_money,
            registration_authority,
            business_scope,
            province_id,
            city_id,
            details,
            imageUrl,
            tax_id
          } = this.institutionDetails;

          const isAddressChange =
            this.preProvinceId !== province_id ||
            this.preCityId !== city_id ||
            this.preDetails !== details;

          if (isAddressChange) {
            const {
              data: { id: newAddressId }
            } = await this.$http.post("/api/address", {
              country_id: 1,
              province_id,
              city_id,
              details
            });
            this.institutionDetails.address_id = newAddressId;
          }

          const logoInfo = {
            logo: this.isUploaded ? imageUrl : this.preImageUrl
          };

          await this.$http.put(`/api/institutions/${this.institutionId}`, {
            name,
            invoice_rise,
            taxpayer_distinguish,
            phone,
            address_id: this.institutionDetails.address_id,
            approval_time: approval_time / 1000,
            business_license_start_time: business_license_start_time / 1000,
            business_license_ent_time: business_license_ent_time / 1000,
            institution_type,
            establish_time: establish_time / 1000,
            legal_person,
            registered_money: parseFloat(registered_money),
            registration_authority,
            business_scope,
            province_id,
            city_id,
            ...logoInfo,
            tax_id,
            details
          });
          this.$alert("请等待系统管理员审核", "提交成功", {
            confirmButtonText: "确定",
            callback: () => {
              this.$router.go(0);
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "请按要求完成表格"
          });
          return false;
        }
      });
    },
    async getProvinceList() {
      const {
        data: { address: provinceList }
      } = await this.$http.get("/api/address/list", {
        target: 2
      });
      this.provinceList = provinceList;
    },
    async getCityList(provinceId) {
      const {
        data: { address: cityList }
      } = await this.$http.get("/api/address/list", {
        target: 3,
        parent: provinceId
      });
      this.cityList = cityList;
    },
    async handleProvinceChange(provinceId) {
      this.institutionDetails.province_id = provinceId;
      await this.getCityList(provinceId);
      this.institutionDetails.city_id = this.cityList[0].id;
    },
    async handleAvatarUpload({ file }) {
      this.isUploaded = true;
      this.institutionDetails.imageUrl = await this.getImageInfo(file);
      this.isModalOpened = true;
    },
    getPreImageInfo() {
      return new Promise(async resolve => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = this.institutionDetails.imageUrl;

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
    hanldeModalClose() {
      this.isModalOpened = false;
      this.institutionDetails.imageUrl = this.preImageUrl;
    },
    generatePreviews(data) {
      this.previews = data;
    },
    handleImageCut() {
      this.$refs.cropper.getCropData(data => {
        this.institutionDetails.imageUrl = data;
        this.preImageUrl = data;
        this.isModalOpened = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./recover.scss";

.institution-admin-dashboard {
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
      margin-left: 30px;
      color: #666;

      .upload-progress {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 178px;
        height: 178px;
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
    }
  }
}

.cropper {
  &__container {
    // width: 1000px;
  }

  &__title {
    margin-bottom: 20px;
    color: #333;
    font-size: 26px;
    font-weight: bold;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__preview {
    overflow: hidden;
    border: 1px solid #cccccc;
    background: #cccccc;
  }
}
</style>