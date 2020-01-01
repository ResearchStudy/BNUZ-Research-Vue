<template>
  <div>
    <div style="width: 60%;margin-left: 22%;margin-top: 3%">
      <el-steps :active="active">
        <el-step title="步骤 1" description="填写机构基本信息"></el-step>
        <el-step title="步骤 2" description="上传附件材料"></el-step>
        <el-step title="步骤 3" description="等候审核"></el-step>
      </el-steps>
    </div>

    <div style="margin-top: 20px; width:50%; margin-left: 25%" v-if="active === 1">
      <div>
        <el-divider  content-position="center" ><span style="font-size: 20px">基本资料</span></el-divider>
      </div>
      <el-form ref="form" :model="form" label-width="100px" >
        <el-form-item label="企业名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="企业注册号">
          <el-input v-model="form.tax_id"></el-input>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-input v-model="form.institution_type"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="成立时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.establish_time" style="width: 100%;"></el-date-picker>
            </el-form-item>

          </el-col>
          <el-col :span="8">
            <el-form-item label="省份">
              <el-select v-model="form.address.province_id" placeholder="请选择省份" @change="getCityList(form.address.province_id)">
                <el-option v-for="province in provinceList" :label="province.name" :key="province.id" :value="province.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-select v-model="form.address.city_id" placeholder="请选择城市">
                <el-option v-for="city in cityList" :label="city.name" :key="city.id" :value="city.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="详细地址">
          <el-input v-model="form.address.details"></el-input>
        </el-form-item>



        <el-row>
          <el-col span="8">
            <el-form-item label="法人">
              <el-input v-model="form.legal_person"></el-input>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="联系电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="核准时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.approval_time" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col span="16">
            <el-form-item label="营业期限">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.business_license_start_time" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col :span="1" :offset="1">
                <span style="font-size: 10px">-</span>
              </el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.business_license_end_time" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="注册资金">
              <el-input v-model="form.registered_money" type="number"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item label="登记机关">
          <el-input v-model="form.registration_authority"></el-input>
        </el-form-item>


        <el-form-item label="经营范围">
          <el-input type="textarea" v-model="form.business_scope"></el-input>
        </el-form-item>
        <el-row>
          <el-col span="12">
            <el-form-item label="联系人">
              <el-input v-model="form.contact_man"></el-input>
            </el-form-item>
          </el-col>

          <el-col span="12">
            <el-form-item label="手机号码">
              <el-input v-model="form.contact_number"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <p style="text-align: center;font-size: 20px;color:red;font-weight: bold">
          注：以上信息均为必填项且应与机构在当地工商部门登记的保持一致，机构需确保信息真实有效！
        </p>
        <div>
          <el-divider content-position="center" ></el-divider>
        </div>
        <el-form-item label="更多开票信息" prop="hasInvoice">
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
        <div style="text-align: center">
          <el-form-item>
            <el-button type="primary" @click="nextPage">下一步</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div style="margin-top: 20px; width:50%; margin-left: 25%" v-if="active === 2">
      <div style="text-align: center">
        <span style="font-weight: bold">上传附件材料</span> <span style="color: #afafaf">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</span>
      </div>
      <div style="margin-top: 40px">
        <el-row style="height: 100px">
          <el-col :span="7" :offset="4">
            <span class="label">上传机构显示封面</span>
          </el-col>
          <el-col :span="11">
            <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleAvatarUpload"
            >
              <img
                      v-if="form.logo"
                      :src="form.logo"
                      class="avatar"
              />
              <i v-if="!form.logo" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-row style="height: 100px">
          <el-col :span="7" :offset="4">
            <span class="label">上传经营许可证</span>
          </el-col>
          <el-col :span="11">
            <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleBusinessLicenceUpload"
            >
              <img
                      v-if="form.business_license"
                      :src="form.business_license"
                      class="avatar"
              />
              <i v-if="!form.business_license" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" :offset="4">
            <span class="label">其他补充说明文件</span>
          </el-col>
          <el-col :span="7">
            <el-upload
                    class="upload-demo"
                    drag
                    action="#"
                    :http-request="beforeOtherFilesUpload"
                    multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col>
        </el-row>
      </div>
      <div style="text-align: center;margin: 20px 0px">
        <el-button type="primary" @click="enrollInstitutionsMsg()">立即创建</el-button>
      </div>
    </div>
    <div style="margin-top: 20px; width:50%; margin-left: 25%" v-if="active === 3">
      <div style="text-align: center;font-size: 100px">
        等待审核通过
      </div>
      <div style="text-align: center;margin: 20px 0px">
        <el-button type="primary" @click="navigateToIndex()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAddressById, saveAddress} from "../../api/address";
  import {enrollInstitutions, institutionsFilesUpload} from "../../api/institutions";

  export default {
        name: "OrganizationRegister",
        mounted(){


            this.getProvinceList();
        },
        data(){
            return {
                active: 1,
                form: {
                  name: '',
                  tax_id: '',
                  institution_type: '',
                  legal_person: '',
                  establish_time: '',
                  registered_money:'',
                  business_license: '',
                  business_license_start_time: '',
                  business_license_end_time: '',
                  approval_time: '',
                  registration_authority: '',
                  business_scope: '',
                  hasInvoice: false,
                  invoice_rise: '',
                  taxpayer_distinguish: '',
                  invoice_phone: '',
                  logo: '',
                  address: {
                    province_id: '',
                      city_id: '',
                      details: ''
                  },
                  files:[]
                },
                provinceList: [],
                cityList: []
            }
        },
        methods:{
            nextPage(){
                this.active = this.active + 1
            },
            navigateToIndex(){
                this.$router.push({path: '/'})
            },
            beforeOtherFilesUpload({file}){
                this.form.files.push(file)
            },
            async getProvinceList() {
                const result = await getAddressById({target: 2});
                this.provinceList = result.address;
            },
            async getCityList(provinceId) {
                this.form.address.city_id = ''
                const result = await getAddressById({
                    target: 3,
                    parent: provinceId
                });
                this.cityList = result.address;
            },
            async enrollInstitutionsMsg(){
                const data = {
                    ...this.form.address,
                    country_id: 1
                };
                const that = this;
                saveAddress(data).then((res) => {
                    const addressId = res.id;
                    const data = {
                        ...this.form,
                        address_id: addressId,
                        registered_money: parseInt(this.form.registered_money),
                        business_license_start_time: new Date(this.form.business_license_start_time).getTime()/1000,
                        establish_time: new Date(this.form.establish_time).getTime()/1000,
                        business_license_end_time: new Date(this.form.business_license_end_time).getTime()/1000,
                        approval_time: new Date(this.form.approval_time).getTime()/1000
                    }
                    enrollInstitutions(data).then((res) => {
                        const formData = new FormData();
                        formData.append("files", this.form.files);
                        institutionsFilesUpload(res.id, this.form.files).then(() => {
                            that.nextPage();
                        })
                    })
                })
            },
            async handleAvatarUpload({ file }) {
                this.form.logo = await this.getImageInfo(file);
            },
            async handleBusinessLicenceUpload({ file }) {
                this.form.business_license = await this.getImageInfo(file);
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
            }
        }
    }
</script>

<style scoped>
.label{
  font-weight: bold;font-size: 15px
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 70px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.avatar {
  width: 70px;
  height: 70px;
  display: block;
}
</style>
