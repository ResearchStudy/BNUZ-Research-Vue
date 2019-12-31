<template>
<div>
  <div class="search-group" style="border: 1px solid #f2f2f2;padding: 15px 30px">
    <div style="display: flex;justify-content: start">
      <div class="tag-item" style="color: #409eff">类别 :</div>
      <div class="tag-item" @click="searchByCourseType(1)" style="cursor: pointer"><el-tag :effect="course_type === 1 ? 'dark' : 'plain'">知识科普型</el-tag></div>
      <div class="tag-item" @click="searchByCourseType(2)" style="cursor: pointer"><el-tag :effect="course_type === 2 ? 'dark' : 'plain'">自然观赏型</el-tag></div>
      <div class="tag-item" @click="searchByCourseType(4)" style="cursor: pointer"><el-tag :effect="course_type === 4 ? 'dark' : 'plain'">体验考察型</el-tag></div>
      <div class="tag-item" @click="searchByCourseType(8)" style="cursor: pointer"><el-tag :effect="course_type === 8 ? 'dark' : 'plain'">励志拓展型</el-tag></div>
      <div class="tag-item" @click="searchByCourseType(16)" style="cursor: pointer"><el-tag :effect="course_type === 16 ? 'dark' : 'plain'">文化康乐型</el-tag></div>
    </div>
    <div style="display: flex;justify-content: start">
      <div class="tag-item" style="color: #409eff">标签 :</div>
      <div v-for="tag in tagList" class="tag-item" :key="tag.id">
        <el-tag :effect="tags.indexOf(tag.id) !== -1 ? 'dark' : 'plain'" @click="searchByTag(tag.id)">{{tag.name}}</el-tag>
      </div>
    </div>
    <div style="display: flex;justify-content: start">
      <div class="tag-item" style="color: #409eff">营期 :</div>
      <div class="tag-item"><el-tag @click="searchByCourseTravel(1)" :effect="travel === 1 ? 'dark' : 'plain'">1-3天</el-tag></div>
      <div class="tag-item"><el-tag @click="searchByCourseTravel(2)" :effect="travel === 2 ? 'dark' : 'plain'">3-5天</el-tag></div>
      <div class="tag-item"><el-tag @click="searchByCourseTravel(3)" :effect="travel === 3 ? 'dark' : 'plain'">5-7天</el-tag></div>
      <div class="tag-item"><el-tag @click="searchByCourseTravel(4)" :effect="travel === 4 ? 'dark' : 'plain'">7-10天</el-tag></div>
      <div class="tag-item"><el-tag @click="searchByCourseTravel(5)" :effect="travel === 5 ? 'dark' : 'plain'">10-12天</el-tag></div>
      <div class="tag-item"><el-tag @click="searchByCourseTravel(6)" :effect="travel === 6 ? 'dark' : 'plain'">12-15天</el-tag></div>
      <div class="tag-item"><el-tag @click="searchByCourseTravel(7)" :effect="travel === 7 ? 'dark' : 'plain'">15-28天</el-tag></div>
      <div class="tag-item"><el-tag @click="searchByCourseTravel(8)" :effect="travel === 8 ? 'dark' : 'plain'">28天以上</el-tag></div>
    </div>
    <div style="display: inline-flex">
      <el-input placeholder="请输入内容" v-model="title" style="width: 300px;padding-right: 10px"></el-input>
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
  <div class="search-group" style="border: 1px solid #f2f2f2;padding: 5px 30px;margin-top: 0px;display: flex;justify-content: space-between;">
    <div style="padding-top: 10px">
      <span>综合</span>
      <span style="padding-left: 10px">最新111</span>
      <span style="padding-left: 10px">最热</span>
    </div>
    <div style="display: flex;align-items: center">
      <img src="../../assets/img/apps.png" alt="" @click="displayType = 'card'" style="width: 30px;height: 30px">
      <img src="../../assets/img/list.png" alt="" @click="displayType = 'list'" style="width: 30px;height: 30px">
    </div>
  </div>
  <div  style="margin-top: 0px;background-color: #f2f2f2" v-show="displayType === 'card'">
    <el-row style="padding: 15px">
      <el-col :span="8" v-for="course in coursesList" :key="course.id" style="padding: 10px; cursor: pointer"  @click.native="detail(course.id)" >
        <card  :title="course.title" :img-src="'/api/resources/' + course.cover" :course-type="course.courseType" :tag-name="course.tagName"/>
      </el-col>
    </el-row>
  </div>
  
  <div class="search-group" v-show="displayType === 'list'">
    <el-table
            :data="coursesList"
            style="width: 100%">
      <el-table-column
              prop="title"
              label="课程标题"
              width="250">
      </el-table-column>
      <el-table-column
              prop="subtitle"
              label="课程子标题"
              width="250">
      </el-table-column>
      <el-table-column
              prop="courseType"
              label="课程类型">
      </el-table-column>
      <el-table-column
              prop="tagName"
              label="课程标签">
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
            :page-sizes="[9,18,27]"
            :page-size="limit"
            :total="total"
            layout=" prev, pager, next, sizes, jumper">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import {getTags} from "../../api/tags";
  import {getAddressById} from "../../api/address";
  import {getCoursesList, mGetCoursesInfo} from "../../api/courses";
  import Card from "../../components/courses/card";

  const courseTypeList = [{id: 1, name: '知识科普'},{id: 2, name: '自然观赏'},{id: 4, name: '体验考察'},{id: 8, name: '励志拓展'},{id: 16, name: '文化康乐'},]


  export default {
      name: "CoursesList",
      components: {Card},
      data(){
        return {
            tagList: [],
            title: '',
            countryList: [],
            provinceList: [],
            cityList: [],
            country_id: '',
            province_id: '',
            city_id: '',
            coursesList: '',
            displayType: 'card',
            course_type: '',
            tags: [],
            travel: '',
            page: 1,
            limit: 9,
            total: 0

        }
      },
      mounted(){
          const params = this.$route.params
          this.getTags();
          this.getAllCountry();
          this.getCoursesList({page:1,limit:9, ...params});
      },
      methods: {
          async getTags(){
              const result = await getTags();
              this.tagList = result.tags;
          },
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
          async getCoursesList(params) {
              const result = await getCoursesList(params)
              this.page = result.page
              this.limit = result.limit
              this.total = result.total
              const ids = result.courses.map((item) => item.id)
              const courseList = await mGetCoursesInfo({ids});
              this.coursesList = courseList.map((item) => {
                  return {
                      ...item,
                      courseType: courseTypeList.filter((courseType) => courseType.id === item.course_type)[0].name,
                      tagName: item.tag.map((t) => t.name).join(' ')
                  }
              })
          },
          detail(id){
              this.$router.push({path: `/courses/${id}`})
          },
          async search(){
            const course_type = this.course_type;
            const tag = this.tags.join(",");
            const title = this.title;
            const travel = this.travel
            const city = this.city_id
            const province = this.province_id
            const country = this.country_id
            this.getCoursesList({course_type, tag, title, travel, city, province, country})
          },
          reset(){
            this.course_type = ''
            this.tags = []
            this.title = ''
            this.travel = ''
              this.city_id = ''
              this.province_id = ''
              this.country_id = ''
            this.search()
          },
          searchByCourseType(typeId){
              if(typeId === this.course_type){
                  this.course_type = ''
              }else{
                  this.course_type = typeId
              }
              this.search()
          },
          searchByCourseTravel(travelId){
              if(travelId === this.travel){
                  this.travel = ''
              }else{
                  this.travel = travelId
              }
              this.search()
          },
          searchByTag(id){
              if(this.tags.indexOf(id) !== -1){
                  const tags = this.tags.splice(this.tags.indexOf(id) + 1, 1);
                  this.tags = tags;
              }else{
                  this.tags.push(id)
              }
              this.search();
          },
          handleSizeChange(limit){
              this.limit = limit
              this.getCoursesList({page: this.page, limit})
          },
          handleCurrentChange(page) {
              this.page = page
              this.getInstitutionList({page, limit: this.limit})
          },
      }
    }
</script>

<style scoped>
  .search-group{
    margin-top: 30px;
  }
  .tag-item{
    padding: 10px;
  }
</style>
