<template>
  <div class="reset-phone_container">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-top:2px"
    >
      <el-breadcrumb-item :to="{ path: '/person' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改手机</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="reset-phone_wrap">
      <div class="reset-phone_form">
        <el-form
          label-width="100px"
          
          :model="form"
          ref="form"
          :rules="rules"
        >
        <el-form-item
            label="当前手机号码"
           
          >
            <el-label
              v-model="form.current_phone"
              style="margin-bottom:20px;"
            ></el-label>
            
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="phone"
          >
            <el-input
              v-model="form.phone"
              style="margin-bottom:20px;"
            ></el-input>
            
          </el-form-item>

          <el-form-item
            label="验证码"
            prop="code"
          >
            <el-input
              v-model="form.code"
              style="margin-bottom:20px;"
            >
            <template slot="append">
      <div class="divIdentifyingCode" @click="getIdentifyingCode(true)">
        <img id="imgIdentifyingCode" src="http://dmimg.5054399.com/allimg/pkm/pk/22.jpg" style="height:30px; width: 100px; cursor: pointer;" alt="点击更换"
             title="点击更换" />
      </div></template></el-input>
          </el-form-item>
          
 
          <el-form-item
            label="短信验证码"
            prop="SMS_code"
          >
            <el-input
              v-model="form.phone"
              style="margin-bottom:20px"
            ><el-button slot="append" type="primary">点击获取验证码</el-button></el-input>
          </el-form-item>
          <el-form-item
            label="当前密码"
            prop="password"
          >
            <el-input
              v-model="form.passwrod"
              style="margin-bottom:20px;"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="width:100px "
              type="primary"
              @click="onSubmit"
            >提交</el-button>

          </el-form-item>
        </el-form>
      </div>

    </div>

  </div>

</template>

<script>



export default {
  name: "ResetPhone",
  data() {
    let checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      console.log(reg.test(value));
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('手机格式有误'));
      }
        
    };   

    
    
    return {
      


      form:{
      },

      rules: {
        password : [
          {required : true , message : "邮箱不能为空" , trigger: "blur" },
        ],
        phone : [
          { required: true, message: "电话不能为空", trigger: "blur" },
          {validator : checkPhone , trigger : 'blur'},

        ],
        code : [
          {required : true , message : "验证码不能为空" , trigger : "blur"}
        ],
        SMS_code : [
          {required : true , message : "短信验证码不能为空" , trigger : "blur"}
        ]
      } 
     
    };
  },
  async mounted() {
      await this.getPhone();
  },


  methods: {

    async handleCancel(){
      window.location.reload();
    },
    async getPhone() {  
       this.form.id = this.$store.getters.userInfo.id;
        console.log(this.form.id);
        await this.$http.get('/api/accounts/' + this.form.id).then(res => {
            console.log(res.data)
            this.form.current_phone = res.data.phone
        })
    },
    

 




  }
};
</script>

<style lang="scss" scoped>
.reset-phone {
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