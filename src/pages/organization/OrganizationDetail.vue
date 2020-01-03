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
  <div style="display: flex;margin-bottom: 10px;justify-content: space-between">
    <div style="display: flex">
      <div :class="['tab-item',{active: activeName === 'first'}]" @mouseenter="changeTab('first')">发布的课程</div>
      <div :class="['tab-item',{active: activeName === 'second'}]" @mouseenter="changeTab('second')">发布的资讯</div>
    </div>
    <div>
      <span class="more" @click="moreClick"><i class="el-icon-circle-plus-outline"></i>MORE</span>
    </div>
  </div>
  <div>
    <div v-if="activeName === 'first'">
      <el-row >
        <el-col :span="6" v-for="course in courseList" :key="course.id" style="padding: 0px; cursor: pointer"   @click.native="navigateToCourse(course.id)">
          <card  :title="course.title" :img-src="'/api/resources/' + course.cover" :description="course.description" :tag-name="course.tagName"/>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row >
        <el-col :span="6" v-for="information in informationList" :key="information.id" style="padding: 0px; cursor: pointer" @click.native="navigateToInformation(information.id)">
          <card  :title="information.title" :img-src="'/api/resources/' + information.cover" :description="information.abstract" />
        </el-col>
      </el-row>
    </div>
  </div>
</div>
</template>

<script>
  import {getInstitutionsInfo} from "../../api/institutions";
  import {getCoursesList} from "../../api/courses";
  import {getInformationList} from "../../api/information";
  import Card from "../../components/courses/card";

  export default {
        name: "OrganizationDetail",
        components: {Card},
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
                const courseList = await getCoursesList({institution: result.id,page: 1,limit: 16});
                this.courseTotal = courseList.total
                this.courseList = courseList.courses
                const informationList = await getInformationList({institution: result.id,page: 1,limit: 16});
                this.informationTotal = informationList.total
                this.informationList = informationList.informations
            },
            async getInformationList(page, limit){
                const id = this.id
                const informationList = await getInformationList({institution: id,page, limit});
                this.informationTotal = informationList.total
                this.informationList = informationList.informations
            },
            async getCourseList(page, limit){
                const id = this.id
                const courseList = await getCoursesList({institution: id,page, limit});
                this.courseTotal = courseList.total
                this.courseList = courseList.courses
            },
            navigateToCourse(id){
                this.$router.push({path: `/courses/${id}`})
            },
            navigateToInformation(id){
                this.$router.push({path: `/informations/${id}`})
            },
            changeTab(name){
                this.activeName = name
            },
            moreClick(){
              if(this.activeName === 'first'){
                  this.$router.push({path: '/courses/'})
              }else{
                  this.$router.push({path: '/informations/'})
              }
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
  .tab-item{
    padding: 0px 10px 15px;
    border-bottom: 2px solid #f2f2f2;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .tab-item.active{
    color: #409eff;
    border-bottom: 3px solid #409eff !important;
  }
.more{
  font-size: 12px;
  display: flex;
  align-items: center;
}
.more:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>
