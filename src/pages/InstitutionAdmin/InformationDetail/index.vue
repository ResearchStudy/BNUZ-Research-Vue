<template>
  <div style="margin-top: 50px">
    <div style="width: 70%;margin-left: 15%;margin-bottom: 30px">
      <div style="text-align: center;font-size: 22px;line-height: 50px;color: #747474;font-weight: bold;">{{informationDetail.title}}</div>
      <div class="show-content">
        <div>
          发布时间：{{informationDetail.createDate}}
        </div>
        <div style="margin-left: 20px">
          来源：{{informationDetail.institution_name}}
        </div>
      </div>

      <div v-html="informationDetail.content">
      </div>
    </div>
  </div>
</template>

<script>
  import {getInformationById} from '../../../api/information'
  export default {
    name: "Detail",
    mounted(){
      this.getInformationInfo(this.$route.params.id)
    },
    data(){
      return {
        informationDetail: {}
      }
    },
    methods: {
      async getInformationInfo(id){
        const result = await getInformationById(id);
        const date = new Date(result.create_time * 1000)
        const month = date.getMonth() + 1 > 12 ? 1 : date.getMonth() + 1
        result.createDate = date.getFullYear() + "年" + month + "月" + date.getDate() + "日";
        this.informationDetail = result
      }
    }

  }
</script>

<style scoped>
  .show-content{
    color: #888;
    padding: 5px 0 15px;
    border-bottom: 1px dotted #ddd;
    display: flex;
    justify-content: center;
  }
</style>
