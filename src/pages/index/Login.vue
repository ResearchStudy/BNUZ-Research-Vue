<template>
  <div style="padding-top: 45px">
    <el-row>
      <el-col :span="13" :offset="1">
        <div class="banner " style="margin-right: 0px;margin-left:20%;width:100%">
          <img src="../../assets/img/logo-banner.jpeg" alt="" style="height: 420px">
        </div>
      </el-col>
      <el-col :span="8" :offset="1">
        <div class="banner ">
          <div style="text-align: center;font-size: 37px;font-weight: bold;padding-top: 95px">欢迎登录</div>
          <div>
            <el-form :model="form" :rules="loginRules" ref="form" label-width="100px" style="width: 80%;padding: 30px">
              <el-form-item label="用户名" prop="key">
                <el-input v-model="form.key"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <div style="display: flex;justify-content: center;padding-left: 100px;">
                <el-button type="primary" style="width: 80%" @click="dispatchSubmit()">登录</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {login} from '@/api/user'

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    key: '',
                    password: ''
                },
                loginRules: {
                    key: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                }
            }
        },
        methods: {
            getAvator(id){
              this.$http.get("/api/accounts/" + id).then(res => {
                if (res.data.avator !== "") {
                  localStorage.setItem("avator","/api/resources/" + res.data.avator);
                }
                else{
                  localStorage.setItem("avator","/api/resources/eyJleHBpcmVfYXQiOi0xLCJhY2NvdW50X2lkIjotMSwicGF0aCI6InN0b3JhZ2U6Ly9hY2NvdW50X2F2YXRvckAyLzE1NzkwMTE5MDItYXZhdG9yLmpwZyIsInB1YmxpYyI6dHJ1ZSwiZmlsZV9uYW1lIjoiIn0=")
                }
              });
            },
            login() {
                const loginInfo = {
                    key: this.form.key,
                    password: this.form.password,
                    remember: true
                };
                login(loginInfo).then((res) => {
                    localStorage.setItem("id", res.id)
                    this.getAvator(res.id)
                    this.$router.push({path: "/"})
                })
            },
            dispatchSubmit() {
              this.$refs['form'].validate((valid) => {
                if (valid) {
                  this.login()
                } else {
                  this.$message({
                    showClose: true,
                    message: `用户名或密码不能为空`,
                    type: 'error',
                    isSingle: true
                  });
                  return false;
                }
              });
            }
        }
    }
</script>

<style scoped>

  .banner {
    height: 450px;
    overflow: hidden;
  }
</style>
