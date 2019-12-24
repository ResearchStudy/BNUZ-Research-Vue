<template>
  <div>
    <el-row>
      <el-col :span="14" :offset="1">
        <div class="banner ">
        </div>
      </el-col>
      <el-col :span="7" :offset="1">
        <div class="banner ">
          <div style="text-align: center;font-size: 37px;font-weight: bold;padding-top: 95px">欢迎注册</div>
          <div>
            <el-form :model="form" :rules="registerRules" ref="form" label-width="100px" style="width: 80%;padding: 30px">
              <el-form-item label="用户名" prop="key">
                <el-input v-model="form.key"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="text"></el-input>
              </el-form-item>
              <div style="display: flex;justify-content: center;padding-left: 100px;">
                <el-button type="primary" style="width: 80%" @click="dispatchSubmit()">注册</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import {register, login} from '@/api/user'

    export default {
        name: "Register",
        data() {
            return {
                form: {
                    key: '',
                    password: ''
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
            }
        },
        methods: {
            register() {
                register({...this.form, username: this.form.key}).then(() => {
                    this.$message({
                        showClose: true,
                        message: `注册成功`,
                        type: 'success',
                        isSingle: true
                    });
                    const loginInfo = {
                        key: this.form.key,
                        password: this.form.password,
                        remember: true
                    };
                    login(loginInfo).then((res) => {
                        localStorage.setItem("id", res.id)
                        this.$router.push({path: "/"})
                    })
                })
            },
            dispatchSubmit() {
              this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.register()
                } else {
                  this.$message({
                    showClose: true,
                    message: `注册信息不符合要求，请重新输入`,
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
