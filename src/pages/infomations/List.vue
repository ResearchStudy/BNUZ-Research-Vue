<template>
<div>
  <div class="search-group">
    <el-input placeholder="请输入内容" v-model="title" style="width: 89%;padding-right: 10px"></el-input>
    <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="search">搜索</el-button>
  </div>

  <div class="search-group" style="margin-top: 20px">
    <div v-for="information in informationList" :key="information.id" style="cursor: pointer" @click="navigateToInformation(information.id)">
      <div style="display: flex;padding: 5px 15px;border: 1px solid #f2f2f2;box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);margin-bottom: 10px">
        <div style="width: 400px;height: 200px">
          <img :src="information.src" alt="" style="width: 400px;height: 200px" v-if="information.cover.length !== 0">
          <img src="../../assets/img/default-news.jpg" alt="" style="width: 400px;height: 200px" v-else>
        </div>
        <div style="width: 100%;padding-left: 30px">
          <h2>{{information.title}}</h2>
          <div>
            {{information.abstract}}
          </div>
          <div style="display: flex;justify-content: space-between;margin-top: 60px;">
            <div style="display: flex;align-items: center"><img src="../../assets/img/label.png" alt="label"> {{information.informationType}}</div>
            <div>{{information.createDate}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div style="display: flex;justify-content: center;margin-top: 20px">
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[5,10,15,20]"
            :page-size="limit"
            :total="total"
            layout=" prev, pager, next, sizes, jumper">
    </el-pagination>
  </div>
</div>
</template>

<script>
    import {getInformationList, mGetInformationList} from "../../api/information";

    const informationType = [{id: 1, name: '行业政策'}, {id: 2, name: '研学政策'}]

    export default {
        name: "List",
        mounted(){
            this.getInformationList({page:1, limit: 5});
        },
        data(){
            return{
                title: '',
                informationList: [],
                page: 1,
                limit: 5,
                total: 0
            }
        },
        methods:{
            async getInformationList(params){
                const result = await getInformationList(params);
                const ids = result.informations.map((item) => item.id);
                this.page = result.page
                this.limit = result.limit
                this.total = result.total
                const informations = await mGetInformationList({ids});
                const temp = informations.map((item) => {
                    const date = new Date(item.create_time * 1000)
                    const month = date.getMonth() + 1 > 12 ? 1 : date.getMonth() + 1
                    const createDate = date.getFullYear() + "年" + month + "月" + date.getDate() + "日";
                    return{
                        ...item,
                        createDate,
                        informationType: informationType.filter((t) => t.id === item.information_type)[0].name,
                        src: item.cover.length === 0 ? '../../assets/img/default-news.jpg' : `/api/resources/${item.cover}`
                    }
                })
                this.informationList = temp
            },
            handleSizeChange(limit){
                this.limit = limit
                this.getInformationList({page: this.page, limit: limit})
            },
            handleCurrentChange(page) {
                this.page = page
                this.getInformationList({page:page, limit: this.limit})
            },
            navigateToInformation(id){
                this.$router.push({path: `/informations/${id}`})
            },
            async search(){
                const title = this.title
                const city = this.city_id
                const province = this.province_id
                const country = this.country_id
                this.getInformationList({title, city, province, country})
            },
            reset(){
                this.title = ''
                this.city_id = ''
                this.province_id = ''
                this.country_id = ''
                this.search()
            },
        }
    }
</script>

<style scoped>
  .search-group{
    width: 80%;
    margin-left: 10%;
    margin-top: 30px;
  }
</style>
