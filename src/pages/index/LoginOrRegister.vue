<template>
  <div>
    <el-row>
      <el-col :span="14" :offset="1">
        <div class="banner ">
        </div>
      </el-col>
      <el-col :span="7" :offset="1">
        <div class="banner ">
          <div style="text-align: center;font-size: 37px;font-weight: bold;padding-top: 95px">欢迎{{modulesName}}</div>
          <div>
            <el-form :model="form" :rules="isLogin ? loginRules : registerRules" ref="form" label-width="100px" style="width: 80%;padding: 30px">
              <el-form-item label="用户名" prop="key">
                <el-input v-model="form.key"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" :type="isLogin ? 'password' : 'text'"></el-input>
              </el-form-item>
              <div style="display: flex;justify-content: center;padding-left: 100px;">
                <el-button type="primary" style="width: 80%" @click="dispatchSubmit()">{{modulesName}}</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {register,login} from '@/api/user'

    export default {
        name: "LoginOrRegister",
        watch:{
            '$route.path':function(newVal){
                this.modulesName = newVal.replace("/", "") === 'login' ? '登录' : '注册'
            }
        },
        data() {
            return {
                form: {
                    key: '',
                    password: ''
                },
                loginRules: {
                    key: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                },
                registerRules: {
                    key: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 6, max: 50, message: '长度在6到50之间', trigger: 'blur'}
                    ],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 8, max: 32, message: '长度在8到32之间', trigger: 'blur'}
                    ],
                },
                modulesName: this.$route.fullPath.replace("/", "") === 'login' ? '登录' : '注册',
                isLogin: this.$route.fullPath.replace("/", "") === 'login'
            }
        },
        methods: {
            login() {
                const loginInfo = {
                    key: this.form.key,
                    password: this.form.password
                };
                login(loginInfo).then((res) => {
                    localStorage.setItem("id", res.id)
                    this.$router.push({path: "/"})
                })
            },
            register() {
                register({...this.form, username: this.form.key}).then((res) => {
                    console.log(res)
                })
            },
            dispatchSubmit() {
              this.$refs['form'].validate((valid) => {
                if (valid) {
                  this.isLogin ? this.login() : this.register()
                } else {
                  this.$message({
                    showClose: true,
                    message: `${this.modulesName}信息不符合要求，请重新输入`,
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
    height: 500px;
    border: 1px solid black;
  }
</style>
