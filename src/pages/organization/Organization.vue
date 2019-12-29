<template>
<div id="organization">
  <div class="banner"></div>
  <div class="search-group">
    <el-input placeholder="请输入内容" v-model="searchValue">
      <el-button slot="append" icon="el-icon-search" type="primary"></el-button>
    </el-input>
  </div>
  <div style="margin-left: 5%">
    <el-button type="primary" @click="naviateToRegister()">我要入驻</el-button>
  </div>

  <div class="search-group">
    <div v-for="institution in institutionList" :key="institution.stauts" style="cursor: pointer" @click="navigateToInformation(information.id)">
      <div style="display: flex;padding: 10px 15px">
        <div style="width: 400px;height: 200px">
          <img :src="'api/resources/' + institution.institution_details.logo" alt="" style="width: 400px;height: 200px">
        </div>
        <div style="width: 100%;padding-left: 30px">
          <h2>{{institution.name}}</h2>
          <div>
            {{institution.institution_details.business_scope}}
          </div>
          <div style="display: flex;justify-content: space-between;margin-top: 60px;">
            <div style="display: flex;align-items: center"><img src="../../assets/img/label.png" alt="label"> {{institution.informationType}}</div>
            <div>{{institution.createDate}}</div>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
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
  import {getAddressById} from "../../api/address";
  import {getInstitutionList, mGetInstitutionList} from "../../api/institutions";



  export default {
    name: "List",
    mounted(){
      this.getAllCountry();
      this.getInstitutionList(1, 5);
    },
    data(){
      return{
        searchValue: '',
        countryList: [],
        provinceList: [],
        cityList: [],
        country_id: '',
        province_id: '',
        city_id: '',
        institutionList: [],
        page: 1,
        limit: 5,
        total: 0
      }
    },
    methods:{
      async getAllCountry(){
        const result = await getAddressById({target: 1})
        this.countryList = result.address
      },
      async getProvinceList() {
        const countryId = this.country_id
        const result = await getAddressById({target: 2,parent: countryId});
        this.provinceList = result.address;
      },
      async getCityList() {
        const provinceId = this.province_id;
        const result = await getAddressById({
          target: 3,
          parent: provinceId
        });
        this.cityList = result.address;
      },
      async getInstitutionList(page, limit){
        const result = await getInstitutionList({page, limit});
        const ids = result.institutions.map((item) => item.id);
        this.page = result.page
        this.limit = result.limit
        this.total = result.total
        const institutions = await mGetInstitutionList({ids});
        const temp = institutions.map((item) => {
          const date = new Date(item.create_time * 1000)
          const month = date.getMonth() + 1 > 12 ? 1 : date.getMonth() + 1
          const createDate = date.getFullYear() + "年" + month + "月" + date.getDate() + "日";
          return{
            ...item,
            createDate,

          }
        })
        this.institutionList = temp
      },
      handleSizeChange(limit){
        this.limit = limit
        this.getInstitutionList(this.page, limit)
      },
      handleCurrentChange(page) {
        this.page = page
        this.getInstitutionList(page, this.limit)
      },
      navigateToInformation(id){
        this.$router.push({path: `/institutions/${id}`})
      }
    }
  }
</script>

<style scoped>
.banner{
  width: 90%;
  height: 150px;
  border: 1px solid black;
  align-items: center;
  margin-left: 5%;
}
.search-group{
  width: 70%;
  margin-left: 15%;
  margin-top: 30px;
}
</style>
