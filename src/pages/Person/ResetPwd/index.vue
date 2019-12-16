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
      <div class="reset-pwd_form ;float:left;">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="right"
        >
          <el-form-item label="当前密码">
            <el-input
              v-model="formData.oldPwd"
              placeholder="请输入当前密码"
              style="width:40% ; margin-bottom : +20px"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              placeholder="请设置密码"
              v-model="formData.newPwd"
              style="width:40% ; margin-bottom : +20px"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="formData.rePwd"
              placeholder="请确认密码"
              style="width:40% ; margin-bottom : +20px"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item style="margin-left:50px">
            <el-button
              style="width : 100px"
              type="primary"
              @click="onSubmit"
            >提交</el-button>
            <el-button style="margin-left:50px ; width : 100px">取消</el-button>
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
    return {
      formData: {
        oldPwd: "",
        newPwd: "",
        RePwd: "",
      }
    };
  },
  methods: {
    // checkphone(){

    // },

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
    padding-top: 60px;
    padding-left: 400px;
  }
}

</style>

