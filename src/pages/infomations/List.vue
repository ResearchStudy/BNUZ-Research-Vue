<template>
<div>
  <div class="search-group">
    <el-input placeholder="请输入内容" v-model="searchValue">
      <el-button slot="append" icon="el-icon-search" type="primary"></el-button>
    </el-input>
  </div>
  <div class="search-group">
    <el-select v-model="country_id" placeholder="国家" @change="getProvinceList">
      <el-option
              v-for="item in countryList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="province_id" placeholder="省份" style="padding-left: 10px" @change="getCityList">
      <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
      </el-option>
    </el-select>
    <el-select v-model="city_id" placeholder="城市" style="padding-left: 10px">
      <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
      </el-option>
    </el-select>
    <el-divider></el-divider>
  </div>

  <div class="search-group">
    <div v-for="information in informationList" :key="information.id" style="cursor: pointer" @click="navigateToInformation(information.id)">
      <div style="display: flex;padding: 10px 15px">
        <div style="width: 400px;height: 200px">
          <img :src="'api/resources/' + information.cover" alt="" style="width: 400px;height: 200px">
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
    import {getInformationList, mGetInformationList} from "../../api/information";

    const informationType = [{id: 1, name: '行业政策'}, {id: 2, name: '研学政策'}]

    export default {
        name: "List",
        mounted(){
            this.getAllCountry();
            this.getInformationList(1, 5);
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
                informationList: [],
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
            async getInformationList(page, limit){
                const result = await getInformationList({page, limit});
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
                    }
                })
                this.informationList = temp
            },
            handleSizeChange(limit){
                this.limit = limit
                this.getInformationList(this.page, limit)
            },
            handleCurrentChange(page) {
                this.page = page
                this.getInformationList(page, this.limit)
            },
            navigateToInformation(id){
                this.$router.push({path: `/informations/${id}`})
            }
        }
    }
</script>

<style scoped>
  .search-group{
    width: 70%;
    margin-left: 15%;
    margin-top: 30px;
  }
</style>
