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
          <el-form-item label="用户昵称" prop="nickname">
            <el-input
              v-model="form.nickname"
              style="margin-bottom:20px"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="form.name"
              style="margin-bottom:20px"
            ></el-input>
          </el-form-item >
          <el-form-item label="电话" prop="phone">
            <el-input
              v-model="form.phone"
              style="margin-bottom:20px"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
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
            <el-button style="width:100px;margin-left:20px" @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="base-data_avatar">
        <span>头像设置</span>
        <el-upload
          class="base-data_avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
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
        </el-upload>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-check"
        >确认</el-button>
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-refresh-right"
        >重置</el-button>
      </div>
    </div>

  </div>

</template>

<script>
// import { userInfo } from 'os';

export default {
  name: "BaseData",
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

    let checkEmail = (rlue , value , callback) => {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error('邮箱格式有误'));
      }
    };
    
    
    return {
      imageUrl:"",

      form:{
        nickname: "111",
        name: "",
        phone: "",
        email: "",
        token: "",
        id : ''
      },

      rules: {
        email : [
          {required : true , message : "邮箱不能为空" , trigger: "blur" },
          {validator : checkEmail , trigger : 'blur'},
        ],
        phone : [
          { required: true, message: "电话不能为空", trigger: "blur" },
          {validator : checkPhone , trigger : 'blur'},

        ],
        name : [
          {required : true , message : "名字不能为空" , trigger : "blur"}
        ],
        nickname : [
          {required : true , message : "昵称不能为空" , trigger : "blur"}
        ]
      } 
     
    };
  },
  async mounted() {
      await this.getUserInfo();
      // await this.getAvatar();
      await this.beforeAvatarUpload();
      await this.handleAvatarSuccess();
      await this.onSubmit();
      await this.handleCancel();
      
     
      
  },


  methods: {
    async handleCancel(){
      window.location.reload();
    },
    async getUserInfo() {  
       this.form.id = this.$store.getters.userInfo.id;
        // console.log(this.form.id);
        await this.$http.get('/api/accounts/' + this.form.id).then(res => {
            console.log(res.data.nickname)
            this.form.nickname = res.data.nickname
            this.form.name = res.data.realname
            this.form.email = res.data.email
            this.form.phone = res.data.phone
            this.form.token = res.data.avtor    
        }) 
    },
    // async getAvatar() {
    //     await this.$http.get('/api/account/'+this.token,{
    //         download : true,
    //         filename : 'a',

    //     }).then((res) => {
    //         let urlCreator = window.URL || window.webkitURL;
    //         let imageUrl = urlCreator.createObjectURL(res);
    //         this.imageUrl = imageUrl;

    //     })
    // },


    async handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    async beforeAvatarUpload(file) {
      const isJPG = file.type === "image/*";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async onSubmit() {
      await this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form.id);
          const EditInfo = {
            nickname : this.form.nickname,
            realname : this.form.name,
          }
          this.$http
            .put("/api/accounts/" + this.form.id,EditInfo)
            .then(res => {
              if(res.data.id !== null){
                this.$message({
                type:"success",
                message:"修改信息成功!",
                isSingle: true
              });   
                        
              }
            }).catch(err => {
              console.log(err);
                this.$message({
                type:"error",
                message:"修改失败！！!",
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