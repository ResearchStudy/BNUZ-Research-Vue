<template>
    <div>
        <el-row>
            <el-col :span="14" :offset="1"><div class="banner ">
            </div></el-col>
            <el-col :span="7" :offset="1"><div class="banner ">
                <div style="text-align: center;font-size: 37px;font-weight: bold;padding-top: 95px">欢迎登录</div>
                <div>
                    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" >
                        <el-form-item label="用户名" prop="name">
                            <el-input v-model="loginForm.name"></el-input>
                        </el-form-item><el-form-item label="密码" prop="password">
                            <el-input v-model="loginForm.password" type="password"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data(){
            return {
                loginForm: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
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
