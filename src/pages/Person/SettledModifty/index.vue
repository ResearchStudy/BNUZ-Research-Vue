<template>

  <div>
    <el-dialog
      title="编辑头像"
      width="1000px"
      :visible="isModalOpened"
      :before-close="hanldeModalClose"
      top="5vh"
    >
      <div class="cropper__container">
        <el-row
          type="flex"
          justify="space-between"
        >
          <el-col :span="16">
            <vueCropper
              style="width:100%;height:400px"
              ref="cropper"
              :img="form.logo"
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
              <div
                :style="previews.div"
                class="cropper__preview"
              >
                <img
                  :src="previews.url"
                  :style="previews.img"
                />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-button
            type="primary"
            @click="handleImageCut"
          >确认</el-button>
          <el-button
            type="primary"
            @click="hanldeModalClose"
          >取消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/person/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号中心</el-breadcrumb-item>
      <el-breadcrumb-item>入驻审核</el-breadcrumb-item>
      <el-breadcrumb-item>{{form.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 20px; width:70%; margin-left: 15%">
      <el-form
        ref="form"
        :model="form"
        label-width="130px"
        :rules="rules"
        label-suffix=":"
      >
        <el-divider
          content-position="center"
          class="form__title"
        >
          <span>基本资料</span>
        </el-divider>
        <el-form-item
          label="上传营业执照"
          class="business-licence"
        >
          <el-tooltip
            content="上传营业执照, 以自动填写表格信息"
            placement="top"
          >
            <i class="el-icon-info"></i>
          </el-tooltip>
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="handleBusinessLicenceUpload"
            accept=".jpg, .jpeg, .png"
            v-loading="licenceLoading"
            element-loading-text="图片上传中"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            <img
              v-if="form.business_license"
              :src="form.business_license"
              class="avatar"
            />
            <i
              v-if="!form.business_license"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
          <span style="color:#fa4b2a">营业执照大小不能大于2M</span>
        </el-form-item>
        <el-form-item
          label="企业名称"
          prop="name"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="企业注册号"
          prop="tax_id"
        >
          <el-input v-model="form.tax_id"></el-input>
        </el-form-item>
        <el-form-item
          label="企业类型"
          prop="institution_type"
        >
          <el-input v-model="form.institution_type"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="成立时间"
              prop="establish_time"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.establish_time"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="省份"
              prop="province_id"
            >
              <el-select
                v-model="form.province_id"
                placeholder="请选择省份"
                @change="getCityList(form.province_id)"
              >
                <el-option
                  v-for="province in provinceList"
                  :label="province.name"
                  :key="province.id"
                  :value="province.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="城市"
              prop="city_id"
            >
              <el-select
                v-model="form.city_id"
                placeholder="请选择城市"
              >
                <el-option
                  v-for="city in cityList"
                  :label="city.name"
                  :key="city.id"
                  :value="city.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="详细地址"
          prop="details"
        >
          <el-input v-model="form.details"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="法人"
              prop="legal_person"
            >
              <el-input v-model="form.legal_person"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系电话"
              prop="phone"
            >
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="核准时间"
              prop="approval_time"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.approval_time"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item
              label="营业期限"
              prop="timeRange"
            >
              <el-date-picker
                style="width:100%"
                unlink-panels
                v-model="form.timeRange"
                value-format="timestamp"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable="false"
                :editable="false"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="注册资金"
              prop="registered_money"
            >
              <el-input v-model="form.registered_money"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="登记机关"
          prop="registration_authority"
        >
          <el-input v-model="form.registration_authority"></el-input>
        </el-form-item>
        <el-form-item
          label="经营范围"
          prop="business_scope"
        >
          <el-input
            type="textarea"
            v-model="form.business_scope"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="联系人"
              prop="contact_man"
            >
              <el-input v-model="form.contact_man"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="手机号码"
              prop="contact_number"
            >
              <el-input v-model="form.contact_number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <p style="text-align: center;font-size: 20px;color:red;font-weight: bold">注：以上信息均为必填项且应与机构在当地工商部门登记的保持一致，机构需确保信息真实有效！</p>
        <el-form-item
          label="更多开票信息"
          prop="hasInvoice"
        >
          <el-switch v-model="form.hasInvoice"></el-switch>
        </el-form-item>
        <div v-if="form.hasInvoice">
          <el-form-item label="发票抬头">
            <el-input v-model="form.invoice_rise"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号">
            <el-input v-model="form.taxpayer_distinguish"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="form.invoice_phone"></el-input>
          </el-form-item>
        </div>
        <el-divider
          content-position="center"
          class="form__title"
        >
          <span>附件信息</span>
        </el-divider>
        <el-form-item label="上传机构封面">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="handleAvatarUpload"
            accept=".jpg, .jpeg, .png"
          >
            <img
              v-if="form.logo"
              :src="form.logo"
              class="avatar"
            />
            <i
              v-if="!form.logo"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
          <span style="color:#fa4b2a">封面大小不能大于2M</span>
        </el-form-item>
        <el-form-item label="其他补充说明文件">
          <el-tooltip
            content="支持扩展名：.rar .zip .doc .docx .pdf .jpg..."
            placement="top"
          >
            <i class="el-icon-info"></i>
          </el-tooltip>
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :http-request="beforeOtherFilesUpload"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="enrollInstitutionsMsg(1)"
          >提交审核</el-button>
          <el-button
            type="primary"
            @click="enrollInstitutionsMsg(7)"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { getAddressById, saveAddress } from "@/api/address";
import {
  enrollInstitutions,
  institutionsFilesUpload,
  modiftyEnroll
} from "@/api/institutions";
import rules from "@/pages/organization/registerValidate";

export default {
  name: "OrganizationRegister",
  mounted() {
    this.getProvinceList();
    const { id } = this.$route.params;
    this.id = id;
    this.getEnroll();
  },
  data() {
    return {
      id: -1,
      active: 1,
      form: {
        name: "",
        tax_id: "",
        institution_type: "",
        legal_person: "",
        establish_time: "",
        registered_money: "",
        business_license: "",
        timeRange: [],
        business_license_start_time: "",
        business_license_end_time: "",
        approval_time: "",
        registration_authority: "",
        business_scope: "",
        hasInvoice: false,
        invoice_rise: "",
        taxpayer_distinguish: "",
        invoice_phone: "",
        logo: "",
        province_id: "",
        city_id: "",
        details: "",
        files: []
      },
      provinceList: [],
      cityList: [],
      rules: rules,
      isUploaded : false,
      licenceLoading: false,
      isModalOpened: false,
      previews: {},
      preImageUrl: ""
    };
  },
  methods: {
    async getEnroll() {
      const { data } = await this.$http.get(
        "/api/institutions/enroll/" + this.id
      );
      const { institution_details } = data;
      await this.getProvinceList();
      const provinceId = this.provinceList.filter(
        province => province.name === institution_details.address.province_name
      )[0].id;
      await this.getCityList(provinceId);
      const cityId = this.cityList.filter(
        city => city.name === institution_details.address.city_name
      )[0].id;
      this.previews.province_id = provinceId;
      this.previews.city_id = cityId;
      this.previews.details = institution_details.address.details,
      console.log(institution_details.business_license)
      this.form = {
          name: institution_details.name,
          tax_id: institution_details.tax_id,
          institution_type: institution_details.institution_type,
          legal_person: institution_details.legal_person,
          establish_time: institution_details.establish_time * 1000,
          registered_money: institution_details.registered_money,
          business_license:
            "/api/resources/" + institution_details.business_license,
          business_license_start_time:
            institution_details.business_license_start_time * 1000,
          business_license_end_time:
            institution_details.business_license_end_time * 1000,
          approval_time: institution_details.approval_time * 1000,
          registration_authority: institution_details.registration_authority,
          business_scope: institution_details.business_scope,
          invoice_rise: institution_details.invoice_rise,
          taxpayer_distinguish: institution_details.taxpayer_distinguish,
          invoice_phone: institution_details.invoice_phone,
          logo: "/api/resources/" + institution_details.logo,
          province_id: provinceId,
          city_id: cityId,
          contact_man: institution_details.contact_man,
          contact_number: institution_details.contact_number,
          details: institution_details.address.details,
          phone: institution_details.phone,
          timeRange: [
            institution_details.business_license_start_time * 1000,
            institution_details.business_license_ent_time * 1000
          ],
          
        };
        this.preImageUrl = await this.getPreImageInfo();
    },
    navigateToIndex() {
      this.$router.push({ path: "/" });
    },
    beforeOtherFilesUpload({ file }) {
      this.form.files.push(file);
    },
    async getProvinceList() {
      const result = await getAddressById({ target: 2 });
      this.provinceList = result.address;
    },
    async getCityList(provinceId) {
      this.form.city_id = "";
      const result = await getAddressById({
        target: 3,
        parent: provinceId
      });
      this.cityList = result.address;
    },
    getPreImageInfo() {
      return new Promise(async resolve => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = this.form.logo;

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
    async enrollInstitutionsMsg(status) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const { province_id, city_id, details } = this.form;
          const data = {
            province_id,
            city_id,
            details,
            country_id: 1
          };
         
          this.form.logo = this.isUploaded ? this.form.logo : this.preImageUrl
          
          saveAddress(data).then(res => {
            const addressId = res.id;
          
            const {
              timeRange: [
                business_license_start_time,
                business_license_end_time
              ]
            } = this.form;
            const data = {
              ...this.form,
              address_id: addressId,
              registered_money: parseInt(this.form.registered_money),
              business_license_start_time: business_license_start_time / 1000,
              establish_time:
                new Date(this.form.establish_time).getTime() / 1000,
              business_license_end_time: business_license_end_time / 1000,
              approval_time: new Date(this.form.approval_time).getTime() / 1000,
              status,
            };
            if (status === 7) {
              console.log(this.form.city_id)
              modiftyEnroll(data)
                .then(res => {
                  const formData = new FormData();
                  formData.append("files", this.form.files);
                  institutionsFilesUpload(res.id, this.form.files);
                  console.log("haohaohaohahooooo")
                })
                .then(() => {
                  this.$alert("修改成功", {
                    confirmButtonText: "确定",
                    callback: () => {
                      this.navigateToIndex();
                    }
                  });
                });
            }
            else{
            enrollInstitutions(data)
              .then(res => {
                const formData = new FormData();
                formData.append("files", this.form.files);
                institutionsFilesUpload(res.id, this.form.files);
              })
              .then(() => {
                this.$alert("请耐心等待审核通过", "申请成功", {
                  confirmButtonText: "确定",
                  callback: () => {
                    this.navigateToIndex();
                  }
                });
              });
          }
          })    
        } else {
          this.$message({
            type: "error",
            isSingle: true,
            message: "请按要求完成表格"
          });
        }
      });
    },
    async handleAvatarUpload({ file }) {
      this.isUploaded = true;
      this.form.logo = await this.getImageInfo(file);
      this.isModalOpened = true;
    },
    async handleBusinessLicenceUpload({ file }) {
      this.licenceLoading = true;
      const licenseImage = await this.getImageInfo(file);
      this.form.business_license = licenseImage;
      const param = new FormData();
      param.append("image", file);
      const {
        data: {
          address,
          business,
          capital,
          establish_date,
          name,
          person,
          reg_num,
          valid_period,
          type
        }
      } = await this.$http.post(
        "/api/institutions/enroll/distinguish/license",
        param,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      this.form.details = address;
      this.form.business_scope = business;
      this.form.registered_money = capital * 10000;
      this.form.approval_time = establish_date * 1000;
      this.form.establish_time = establish_date * 1000;
      this.form.timeRange = [establish_date * 1000, valid_period * 1000];
      this.form.name = name;
      this.form.legal_person = person;
      this.form.tax_id = reg_num;
      this.form.institution_type = type;
      this.$message({
        type: "success",
        isSingle: true,
        message: "营业执照上传成功，请手动补充余下信息"
      });
      this.licenceLoading = false;
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
      this.form.logo = this.preImageUrl;
    },
    generatePreviews(data) {
      this.previews = data;
    },
    handleImageCut() {
      this.$refs.cropper.getCropData(data => {
        this.form.logo = data;
        this.preImageUrl = data;
        this.isModalOpened = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.label {
  font-weight: bold;
  font-size: 15px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 200px;
  display: block;
}

.form {
  &__tips {
    color: #999;
    font-size: 18px;
    text-align: center;
  }
  &__title {
    margin: 40px 0 60px 0;

    span {
      color: #333;
      font-size: 30px;
      font-weight: bold;
    }
  }
}

.business-licence {
  /deep/ .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 300px;
  }

  /deep/ .el-loading-spinner {
    margin-top: 0;
    transform: translateY(-40%);
  }

  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 220px;
    line-height: 220px;
    text-align: center;
  }

  /deep/ .avatar {
    width: 300px;
    height: 220px;
    display: block;
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
