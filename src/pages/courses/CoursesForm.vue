<template>
<div style="padding: 50px">
  <div>
    <el-form :form="form" >

    </el-form>
  </div>
  <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--<el-tab-pane label="行程安排" name="second">配置管理</el-tab-pane>-->
    <!--<el-tab-pane label="开营时间" name="third">角色管理</el-tab-pane>-->
    <!--<el-tab-pane label="研学服务" name="fourth">定时任务补偿</el-tab-pane>-->
  <!--</el-tabs>-->
</div>
</template>

<script>
    export default {
        name: "CoursesForm",
        data() {
            return {
                activeName: 'first',
                form: {
                    title: '',
                    subtitle: '',
                    course_type: '',
                    cover: '',
                    description: ''
                }
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped>

</style>
