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

  export default {
        name: "Organization",
        data(){
            return{
                searchValue: "",
                insitutions: [],
                limit: 10,
                page: 1,
                total: 0
            }
        },
        mounted(){
          this.getInsititutionsList(1, 10)
        },
        methods:{
            getInsititutionsList(page, limit){
                getInstitutionsIds({page, limit}).then((res) => {
                    const ids = res.institutions.map((item) => item.id);
                    this.total = res.total
                    getInstitutionDetails({ids}).then((res) => {
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
