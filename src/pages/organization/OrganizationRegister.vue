<template>
  <div>
    <div style="width: 80%;margin-left: 10%;margin-top: 3%">
      <el-steps :active="active">
        <el-step title="步骤 1" description="填写机构基本信息"></el-step>
        <el-step title="步骤 2" description="上传附件材料"></el-step>
        <el-step title="步骤 3" description="等候审核"></el-step>
      </el-steps>
    </div>
    
    <div style="margin-top: 20px; width:50%; margin-left: 25%" v-if="active === 1">
      <div>
        <el-divider content-position="center" ><span style="font-size: 20px">基本资料</span></el-divider>
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
<!--        地址选择-->
<!--        <el-form-item label="详细地址">-->
<!--          <el-input v-model="form.institution_type"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="法定代表人">
          <el-input v-model="form.legal_person"></el-input>
        </el-form-item>
        <el-form-item label="成立时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.establish_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="注册资金">
          <el-input v-model="form.registered_money"></el-input>
        </el-form-item>
        <el-form-item label="营业期限">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.business_license_start_time" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="1" offset="1">
            <span style="font-size: 10px">-</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.business_license_end_time" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="登记机关">
          <el-input v-model="form.registration_authority"></el-input>
        </el-form-item>
        <el-form-item label="核准时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.approval_time" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input type="textarea" v-model="form.business_scope"></el-input>
        </el-form-item>
        <p style="text-align: center;font-size: 20px;color:red;font-weight: bold">
          注：以上信息应与机构在当地工商部门登记的保持一致，机构需确保信息真实有效！
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
        </div>
<!--        <el-form-item label="电话号码">-->
<!--          <el-input v-model="form.invoice_rise"></el-input>-->
<!--        </el-form-item>-->
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
        <el-row>
          <el-col :span="7" offset="4">
            <span class="label">上传机构显示封面</span>
          </el-col>
          <el-col :span="11">
            <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false">
              <img v-if="form.logo" :src="form.logo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" offset="4">
            <span class="label">上传经营许可证</span>
            <el-col :span="11">
              <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false">
                <img v-if="form.business_license" :src="form.business_license" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" offset="4">
            <span class="label">其他补充说明文件</span>
          </el-col>
          <el-col :span="7">
            <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col>
        </el-row>
      </div>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="nextPage()">立即创建</el-button>
      </div>
    </div>
    <div style="margin-top: 20px; width:50%; margin-left: 25%" v-if="active === 3">
      <div style="text-align: center;font-size: 100px">
        等待审核通过
      </div>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="navigateToIndex()">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "OrganizationRegister",
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
                  business_license_start_time: '',
                  business_license_end_time: '',
                  approval_time: '',
                  registration_authority: '',
                  business_scope: '',
                  hasInvoice: false,
                  invoice_rise: '',
                  taxpayer_distinguish: '',
                    logo: ''
                },
            }
        },
        methods:{
            nextPage(){
                this.active = this.active + 1
            },
            navigateToIndex(){
                this.$router.push({path: '/'})
            }
        }
    }
</script>

<style scoped>
.label{
  font-weight: bold;font-size: 20px
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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