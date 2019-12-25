<template>
<div style="width: 80%;margin-left: 10%;margin-top: 50px;">
  <div style="border: 1px dashed #f2f2f2;padding: 20px;display: flex">
    <div style="padding: 50px">
      <img :src="info.src" style="width: 400px">
    </div>
    <div style="width: 100%">
      <el-row>
        <el-col>
          <h3>{{info.title}}</h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <h4>{{info.sub_title}}</h4>
        </el-col>
      </el-row>
     <el-row>
       <el-col :span="2">
         适合人群:
       </el-col>
       <el-col :span="10">
         {{info.suitable_for_crowd}}
       </el-col>
     </el-row>
     <el-row>
       <el-col :span="2">
         研学城市:
       </el-col>
       <el-col :span="10">
         {{info.address.city_name ? info.address.city_name : ''}}
       </el-col>
     </el-row>
     <el-row>
       <el-col :span="2">
         行程天数:
       </el-col>
       <el-col :span="10">
         {{info.travel_days }}天
       </el-col>
     </el-row>
     <el-row>
       <el-col :span="2">
         研学日期:
       </el-col>
       <el-col :span="10">
         {{info.startTime}}月 - {{info.endTime}}月
       </el-col>
     </el-row>
     <el-row>
       <el-col>
         <el-button type="primary" @click="preEnroll()">预约报名</el-button>
       </el-col>
     </el-row>
     <el-row>
       <el-col :span="2">
         分享:
       </el-col>
     </el-row>
    </div>
  </div>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="课程详情" name="first">
        <div v-html="info.details"></div>
      </el-tab-pane>
      <el-tab-pane label="行程安排" name="second">
        <div v-html="info.scheduling"></div>
      </el-tab-pane>
      <el-tab-pane label="研学服务" name="third">
        <div v-html="info.notice"></div>
      </el-tab-pane>
      <el-tab-pane label="预约报名" name="four"></el-tab-pane>
    </el-tabs>
  </div>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="enroll">
      <el-form-item label="用户名称" label-width="100px">
        <el-input v-model="enroll.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="档期" label-width="100px">
        <el-select v-model="enroll.term_id" placeholder="请选择">
          <el-option
                  v-for="item in termList"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" label-width="100px">
        <el-radio-group v-model="enroll.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户邮箱" label-width="100px">
        <el-input v-model="enroll.email"></el-input>
      </el-form-item>
      <el-form-item label="年龄" label-width="100px">
        <el-input v-model="enroll.age" type="number"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" label-width="100px">
        <el-input v-model="enroll.phone"></el-input>
      </el-form-item>
      <el-form-item label="留言备注" label-width="100px">
        <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="enroll.remarks">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="preEnrollSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import {getCoursesById, getTermByCoursesId, preEnroll} from '../../api/courses'
    export default {
      name: "CoursesDetail",
      data(){
        return {
          info: {},
          dialogFormVisible: false,
          activeName: 'first',
          enroll: {
              name: '',
              sex: '',
              email: '',
              age: '',
              phone: '',
              remarks: '',
              term_id: ''
          },
          termList: []
        }
      },
      mounted(){
        this.getCoursesInfo()
      },
      methods: {
        async getCoursesInfo(){
            this.info = await getCoursesById(this.$route.params.id);
            this.info.src = `/api/resources/${this.info.cover}`
            this.info.startTime = new Date(this.info.start_time * 1000).getMonth() + 1 > 12 ? 1 : new Date(this.info.start_time * 1000).getMonth() + 1
            this.info.endTime = new Date(this.info.end_time * 1000).getMonth() + 1 > 12 ? 1 : new Date(this.info.end_time * 1000).getMonth() + 1
        },
        async preEnroll(){
          this.dialogFormVisible = true
          this.termList = await getTermByCoursesId(this.$route.params.id)
        },
        preEnrollSubmit(){
            this.enroll.age = parseInt(this.enroll.age)
           preEnroll(this.$route.params.id, this.enroll).then(res => {
               console.log(res)
               this.dialogFormVisible = false
           })
        },
          handleClick(tab){
            if(tab.name === 'four'){
                this.dialogFormVisible = true
            }
          }
      }
    }
</script>

<style scoped>
.el-row{
  margin: 10px 0px;
}
</style>
