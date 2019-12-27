<template>
  <div style="width: 80%;margin-left: 10%;margin-top: 50px;">
    <div style="border: 1px dashed #f2f2f2;padding: 20px;display: flex">

      <div style="width: 100%">
        <el-row style="width: 100%">
          <el-col style="width: 100%">
            <h3 align="center">{{info.title}}</h3>
          </el-col>
        </el-row>

        <el-row align-center>
          <el-col span="2">
            <label text-align="right" width = 30px>更新时间：</label>
          </el-col>
          <el-col span="4">
            <label  text-align="left" width = 50px>{{new Date(info.update_time*1000).toLocaleDateString()}}</label>
          </el-col>
          <el-col span="2">
            <label text-align="right" width = 30px>发布者：</label>
          </el-col>
          <el-col span="1">
            <label  text-align="left" width = 50px>{{info.author_name}}</label>
          </el-col>
        </el-row>
        <div v-html="info.content"></div>
      </div>
    </div>
    <div>
    </div>

  </div>
</template>

<script>
  import {getInformationById} from '../../../api/information'

  export default {
    name: "InformationDetail",
    data(){
      return {
        info: {},
        dialogFormVisible: false
      }
    },
    mounted(){
      this.getInformationInfo()
    },
    methods: {
      async getInformationInfo(){
        this.info = await getInformationById(this.$route.params.id);
        this.info.src = `/api/resources/${this.info.cover}`
        this.info.startTime = new Date(this.info.start_time * 1000).getMonth() + 1 > 12 ? 1 : new Date(this.info.start_time * 1000).getMonth() + 1
        this.info.endTime = new Date(this.info.end_time * 1000).getMonth() + 1 > 12 ? 1 : new Date(this.info.end_time * 1000).getMonth() + 1
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
