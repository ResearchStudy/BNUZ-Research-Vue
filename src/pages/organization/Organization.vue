<template>
<div id="organization">
  <div class="banner"></div>
  <div class="search-group">
  </div>
  <div style="display: inline-flex;justify-content: center;width: 90%;margin-left: 5%;margin-top: 15px;">
    <div style="width: 30%;margin-right: 10px">
      <el-input placeholder="请输入内容" v-model="name"></el-input>
    </div>
    <div>
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
      <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="search">搜索</el-button>
      <el-button style="margin-left: 10px" @click="reset">重置</el-button>
    </div>
  </div>
  <div style="display: flex;justify-content: flex-end;width: 90%; margin-left: 5%;margin-top: 15px">
    <el-button type="primary" @click="naviateToRegister()">我要入驻</el-button>
  </div>
  <div style="margin-top: 30px; width: 90%;margin-left: 5%">
    <el-table
            :data="insitutions"
            style="width: 100%">
      <el-table-column
              prop="name"
              label="名称"
              width="300">
      </el-table-column>
      <el-table-column
              prop="province"
              label="省份"
              width="180">
      </el-table-column>
      <el-table-column
              prop="city"
              label="城市"
              width="180">
      </el-table-column>
      <el-table-column
              prop="startDate"
              label="成立时间">
      </el-table-column>
      <el-table-column
              prop="registerCapital"
              label="注册资金">
      </el-table-column>
      <el-table-column
              prop="phoneNumber"
              label="电话">
      </el-table-column>
      <el-table-column
              label="操作"
              width="100">
        <template slot-scope="scope">
          <el-button @click="detail(scope.row.id)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  import {getInstitutionsIds, getInstitutionDetails} from "../../api/institutions";
  import {getAddressById} from "../../api/address";

  export default {
        name: "Organization",
        data(){
            return{
                name: "",
                insitutions: [],
                limit: 10,
                page: 1,
                total: 0,
                countryList: [],
                provinceList: [],
                cityList: [],
                country_id: '',
                province_id: '',
                city_id: '',
            }
        },
        mounted(){
          this.getInsititutionsList({page:1, limit: 10})
          this.getAllCountry();
        },
        methods:{
            getInsititutionsList(params){
                getInstitutionsIds(params).then((res) => {
                    const ids = res.institutions.map((item) => item.id);
                    this.total = res.total
                    getInstitutionDetails({ids}).then((res) => {
                        if(res === null){
                            this.insitutions = []
                        }else{
                            const result = res.map((item) => {
                                const institutionDetail = item.institution_details;
                                const address = institutionDetail.address
                                return {
                                    id: item.id,
                                    name: institutionDetail.name,
                                    registerCapital:institutionDetail.registered_money,
                                    startDate: institutionDetail.establish_time,
                                    province: address.province_name,
                                    city: institutionDetail.city_name,
                                    phoneNumber: institutionDetail.phone
                                }
                            })
                            this.insitutions = result;
                        }
                    })
                })
            },
            handleSizeChange(limit){
              this.limit = limit
              this.getInsititutionsList(this.page, limit)
            },
            handleCurrentChange(page) {
              this.page = page
              this.getInsititutionsList(page, this.limit)
            },
            naviateToRegister(){
                this.$router.push({path: 'organization/register'})
            },
            detail(id) {
                this.$router.push({path: `/organization/${id}`})
            },
            async getProvinceList() {
                const countryId = this.country_id
                this.province_id = ''
                const result = await getAddressById({target: 2,parent: countryId});
                this.provinceList = result.address;
            },
            async getCityList() {
                const provinceId = this.province_id;
                this.city_id = ''
                const result = await getAddressById({
                    target: 3,
                    parent: provinceId
                });
                this.cityList = result.address;
            },
            async getAllCountry(){
                const result = await getAddressById({target: 1})
                this.countryList = result.address
            },
            async search(){
                const city = this.city_id
                const country = this.country_id
                const province = this.province_id
                const name = this.name
                const limit = this.limit
                this.getInsititutionsList({city, country, province, name, limit})
            },
            reset(){
                this.city_id = ''
                this.province_id = ''
                this.country_id = ''
                this.title = ''
                this.name = ''
                this.search()
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
