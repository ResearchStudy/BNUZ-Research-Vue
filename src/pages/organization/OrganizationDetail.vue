<template>
<div class="container">
  <h1 style="color: #409eff">{{organizationInfo.name}}</h1>
  <span style="padding-right: 20px">联系人: {{organizationInfo.legal_person}}</span>
  <span>联系电话: {{organizationInfo.phone}}</span>
  <el-divider></el-divider>
  <div style="display: flex">
    <div>
      <img :src="'/api/resources/' + organizationInfo.logo" alt="机构Logo" style="width: 450px;height: 200px">
    </div>
    <div style="padding-left: 40px">
      <div class="detail-info">成立时间: {{organizationInfo.establishDate}}</div>
      <div class="detail-info">注册资金: 人民币{{organizationInfo.registered_money}}万元</div>
      <div class="detail-info">经营范围: {{organizationInfo.business_scope}}</div>
      <div class="detail-info">注册地址: {{organizationInfo.address.country_name}} {{organizationInfo.address.province_name}} {{organizationInfo.address.city_name}} {{organizationInfo.address.details}}</div>
    </div>
  </div>
  <el-divider></el-divider>
  <el-tabs v-model="activeName">
    <el-tab-pane label="发布的课程" name="first">
      <div v-for="course in courseList" :key="course.id">
        <div style="display: inline-flex;width: 100%;cursor: pointer" @click="navigateToCourse(course.id)">
          <div style="width: 120px;height: 120px">
            <img :src="'/api/resources/' + course.cover" alt="" style="width: 100px;height: 100px">
          </div>
          <div style="padding-left: 30px">
            <h4>{{course.title}}</h4>
            <div>
              {{course.description}}
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="发布的资讯" name="second">
      <div v-for="information in informationList" :key="information.id">
        <div style="display: inline-flex;width: 100%;cursor: pointer"  @click="navigateToInformation(information.id)">
          <div style="width: 120px;height: 120px">
            <img :src="'/api/resources/' + information.cover" alt="" style="width: 100px;height: 100px">
          </div>
          <div style="padding-left: 30px">
            <h4>{{information.title}}</h4>
            <div>
              {{information.abstract}}
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
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
  import {getInstitutionsInfo} from "../../api/institutions";
  import {getCoursesList} from "../../api/courses";
  import {getInformationList} from "../../api/information";

  export default {
        name: "OrganizationDetail",
        mounted(){
          this.getInstitutionsInfo(this.$route.params.id);
        },
        computed:{
            page(){
                return this.activeName === 'first' ? this.coursePage : this.informationPage
            },
            limit(){
                return this.activeName === 'first' ? this.courseLimit : this.informationLimit
            },
            total(){
                return this.activeName === 'first' ? this.courseTotal : this.informationTotal
            },
        },
        data(){
            return{
                organizationInfo: {},
                activeName: 'first',
                courseList: [],
                informationList: [],
                coursePage: 1,
                courseLimit: 5,
                courseTotal: 0,
                informationPage: 1,
                informationLimit: 5,
                informationTotal: 0,
                id: ''
            }
        },
        methods:{
            async getInstitutionsInfo(id){
                const result = await getInstitutionsInfo(id)
                const organizationInfo = result.institution_details
                const date = new Date(organizationInfo.establish_time * 1000)
                const month = date.getMonth() + 1 > 12 ? 1 : date.getMonth() + 1
                organizationInfo.establishDate = date.getFullYear() + "年" + month + "月" + date.getDate() + "日";
                this.organizationInfo = organizationInfo;
                this.id = result.id
                const courseList = await getCoursesList({institution_id: result.id,page: 1,limit: 5});
                this.courseTotal = courseList.total
                this.courseList = courseList.courses
                const informationList = await getInformationList({institution_id: result.id,page: 1,limit: 5});
                this.informationTotal = informationList.total
                this.informationList = informationList.informations
            },
            async getInformationList(page, limit){
                const id = this.id
                const informationList = await getInformationList({institution_id: id,page, limit});
                this.informationTotal = informationList.total
                this.informationList = informationList.informations
            },
            async getCourseList(page, limit){
                const id = this.id
                const courseList = await getCoursesList({institution_id: id,page, limit});
                this.courseTotal = courseList.total
                this.courseList = courseList.courses
            },
            handleSizeChange(limit){
                if(this.activeName === 'first'){
                    this.courseLimit = limit;
                    this.getCourseList(this.page, limit)
                }else{
                    this.informationLimit = limit;
                    this.getInformationList(this.page, limit)
                }
            },
            handleCurrentChange(page) {
                if(this.activeName === 'first'){
                    this.coursePage = page;
                    this.getCourseList(page, this.limit)
                }else{
                    this.informationPage = page;
                    this.getInformationList(page, this.limit)
                }
            },
            navigateToCourse(id){
                this.$router.push({path: `/courses/${id}`})
            },
            navigateToInformation(id){
                this.$router.push({path: `/informations/${id}`})
            }
        }
    }
</script>

<style scoped>
.container{
  width: 70%;
  margin-left: 15%;
}
  .detail-info{
    padding: 10px;
  }
</style>
