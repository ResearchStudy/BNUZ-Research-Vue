<template>
<div id="organization " style="width: 78%;margin-left: 11%">
<!--
  <div class="banner">
    <img src="../../assets/img/banner.jpeg" alt="" style="height: 150px">
  </div>
-->
  <div class="search-group" style=" width: 83%;;margin-left: 5%;border: 1px solid #f2f2f2;padding: 15px 10px; background: #F6F6F8" >
    <div style="display: inline-block">
      <el-input placeholder="请输入内容111" v-model="name" style="width: 590px;padding-right: 10px;margin-left: 10px"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="search">搜索</el-button>
      <el-button style="margin-left: 10px" @click="reset">重置</el-button>
    </div>
    <div style="display: inline-block;margin-top: 10px;margin-left: 10px">
      <div >

        <el-select v-model="country_id" placeholder="国家" @change="getProvinceList" style="margin-right: 20px;width:170px">
          <el-option
                  v-for="item in countryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>

        <el-select v-model="province_id" placeholder="省份" style="padding-left: 10px;margin-right: 20px;width:170px" @change="getCityList">
          <el-option
                  v-for="item in provinceList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>

        <el-select v-model="city_id" placeholder="城市" style="padding-left: 10px;margin-right: 20px;width:185px">
          <el-option
                  v-for="item in cityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
  <!--
  <div style="display: flex;justify-content: flex-end;width: 90%; margin-left: 5%;margin-top: 15px">
    <el-button type="primary" @click="naviateToRegister()">我要入驻</el-button>
  </div>
-->
  <div class="search-group" style=" width: 83%;margin-left: 4%">
    <div v-for="institution in institutionList" :key="institution.id" style="cursor: pointer" @click="navigateToInformation(institution.id)">
      <div style="display: flex;padding: 10px 10px">
        <div style="width: 400px;height: 150px">
          <img :src="'api/resources/' + institution.institution_details.logo" alt="" style="width: 400px;height: 150px">
        </div>
        <div style="width: 100%;padding-left: 30px">
          <h2>{{institution.name}}</h2>
          <div>
            {{institution.institution_details.business_scope}}
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

    data(){
      return{
        name: '',
        countryList: [],
        provinceList: [],
        cityList: [],
        country_id: '',
        province_id: '',
        city_id: '',
        institutionList: [],
        page: 1,
        limit:9,
        total: 0
      }
    },

    mounted(){
      const params = this.$route.params
      this.getAllCountry();
      this.getInstitutionList({page:1,limit:9, ...params});

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

      async getInstitutionList(params){

        const result = await getInstitutionList({params});
        const ids = result.institutions.map((item) => item.id);
        this.page = result.page
        this.limit = result.limit
        this.total = result.total
        this.name = result.name

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


      async search(){
        const page = this.page
        const limit = this.limit
        const name = this.name;
        const city = this.city_id
        const province = this.province_id
        const country = this.country_id

        const result = await getInstitutionList({page,limit,name, city, country, province});
        const ids = result.institutions.map((item) => item.id);
        this.page = result.page
        this.limit = result.limit
        this.total = result.total
        this.name = result.name

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

      reset(){
        this.name = ''
        this.city_id = ''
        this.province_id = ''
        this.country_id = ''
        this.search()
      },

      naviateToRegister(){
        this.$router.push({path: 'organization/register'})
      },



      async getCityList() {
        const provinceId = this.province_id;
        const result = await getAddressById({
          target: 3,
          parent: provinceId
        });
        this.cityList = result.address;
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
        this.$router.push({path: `/organization/${id}`})
      }

    }
  }
</script>

<style scoped>
.banner{
  width: 90%;
  height: 150px;
  align-items: center;
  margin-left: 5%;
}
.search-group{
  width: 70%;
  margin-left: 15%;
  margin-top: 30px;
}
</style>
