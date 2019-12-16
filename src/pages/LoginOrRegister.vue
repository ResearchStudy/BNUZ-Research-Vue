<template>
    <div>
        <el-row>
            <el-col :span="14" :offset="1"><div class="banner ">
            </div></el-col>
            <el-col :span="7" :offset="1"><div class="banner ">
                <div style="text-align: center;font-size: 37px;font-weight: bold;padding-top: 95px">欢迎{{modulesName}}</div>
                <div>
                    <el-form :model="form" :rules="rules" ref="form" label-width="100px" style="width: 80%;padding: 30px">
                        <el-form-item label="用户名" prop="key">
                            <el-input v-model="form.key"></el-input>
                        </el-form-item><el-form-item label="密码" prop="password">
                            <el-input v-model="form.password" type="password"></el-input>
                        </el-form-item>
                        <div style="display: flex;justify-content: center;padding-left: 100px;">
                            <el-button type="primary" style="width: 80%" @click="dispatchSubmit()">{{modulesName}}</el-button>
                        </div>
                    </el-form>
                </div>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    import {login, register} from '@/api/user'
    export default {
        name: "LoginOrRegister",
        data(){
            return {
                form: {
                    key: '',
                    password: ''
                },
                rules: {
                    key: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },
                modulesName: this.$route.fullPath.replace("/", "") === 'login' ? '登录' : '注册'
            }
        },
        methods:{
            login(){
                login({...this.form, remember: false}).then((res) => {
                    console.log(res)
                })
            },
            register(){
                register({...this.form, username: this.form.key}).then((res) => {
                    console.log(res)
                })
            },
            dispatchSubmit(){
                if(this.$route.fullPath.replace("/", "") === 'login'){
                    this.login();
                }else{
                    this.register();
                }
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
