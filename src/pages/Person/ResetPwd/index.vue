<template>
  <div class="reset-pwd_container">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-top:2px"
    >
      <el-breadcrumb-item :to="{ path: '/person/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="reset-pwd_wrap">
      <div class="reset-pwd_form">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item
            label="原密码"
            prop="oldPass"
          >
            <el-input
              type="password"
              placeholder="请输入原密码"
              v-model="form.oldPass"
              style="width:45% ; margin-bottom : 20px"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新密码"
            prop="newPass"
          >
            <el-input
              type="password"
              placeholder="请设置新密码"
              v-model="form.newPass"
              style="width:45% ; margin-bottom : 20px"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="checkPass"
          >
            <el-input
              type="password"
              placeholder="请确认新密码"
              v-model="form.checkPass"
              style="width:45% ; margin-bottom : 20px"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-left:8%">
            <el-button
              style="width : 100px"
              type="primary"
              @click="onSubmit"
            >提交</el-button>
            <el-button
              style="margin-left:20px ; width : 100px"
              @click="handleCancel()"
            >取消</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ResetPwd",

  data() {
    let validateNewPassword = (rule, value, callback) => {
      if (value === this.form.oldPass) {
        callback(new Error("新密码不能与原密码相同!"));
      } else {
        callback();
      }
    };
    let validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.form.newPass) {
        callback(new Error("与新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {},
      rules: {
        oldPass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPass: [
          { required: true, message: "请设置新密码", trigger: "blur" },
          { validator: validateNewPassword, trigger: "blur" },
          { min: 8, max: 32, message: "长度在8到32之间", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateNewPassword2, trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.$store.getters.userInfo.id);
          this.$http
            .put("/api/accounts/" + this.$store.getters.userInfo.id, {
              new_password: this.form.newPass,
              old_password: this.form.oldPass,
            })
            .then(res => {
              if(res.data.id !== null){
                this.$message({
                type:"success",
                message:"修改密码成功!",
                isSingle: true
                });
                this.form = {}
                             
              }
            }).catch(err => {
              console.log(err);
                this.$message({
                type:"error",
                message:"原密码输入有误!",
                isSingle: true
                });

            });
        } else {
          this.$message({
            type: "error",
            message: "请正确填写表单",
            isSingle: true
          });
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.reset-pwd {
  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 13px;
    background: #fff;
  }
  &_wrap {
    margin-top: 20px;
    padding: 10px;
    background: #fff;
  }
  &_form {
    margin-top: 10%;
    margin-left: 25%;
    margin-bottom: 10%;
  }
}
</style>

