<template>
<div>
  <div class="search-group">
    <el-input placeholder="请输入内容" v-model="searchValue">
      <el-button slot="append" icon="el-icon-search" type="primary"></el-button>
    </el-input>
  </div>
  <div class="search-group" style="border: 1px solid #f2f2f2;padding: 15px 30px">
    <div style="display: flex;justify-content: start">
      <div class="tag-item" style="color: #409eff">类别 :</div>
      <div class="tag-item">知识科普型</div>
      <div class="tag-item">自然观赏型</div>
      <div class="tag-item">体验考察型</div>
      <div class="tag-item">励志拓展型</div>
      <div class="tag-item">文化康乐型</div>
    </div>
    <div style="display: flex;justify-content: start">
      <div class="tag-item" style="color: #409eff">标签 :</div>
      <div v-for="tag in tagList" class="tag-item" :key="tag.id">
        {{tag.name}}
      </div>
    </div>
    <div style="display: flex;justify-content: start">
      <div class="tag-item" style="color: #409eff">营期 :</div>
      <div class="tag-item">1-3天</div>
      <div class="tag-item">3-5天</div>
      <div class="tag-item">5-7天</div>
      <div class="tag-item">7-10天</div>
      <div class="tag-item">10-12天</div>
      <div class="tag-item">12-15天</div>
      <div class="tag-item">15-28天</div>
      <div class="tag-item">28天以上</div>
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
    </div>
  </div>
  <div class="search-group" style="border: 1px solid #f2f2f2;padding: 5px 20px;margin-top: 0px;display: flex;justify-content: space-between;">
    <div style="padding-top: 10px">
      <span>综合</span>
      <span style="padding-left: 10px">最新</span>
      <span style="padding-left: 10px">最热</span>
    </div>
    <div style="display: flex;align-items: center">
      <img src="../../assets/img/card_list_icon.png" alt="" @click="displayType = 'card'">
      <img src="../../assets/img/list_icon.png" alt="" @click="displayType = 'list'">
    </div>
  </div>
  <div class="search-group" style="margin-top: 0px;background-color: #f2f2f2" v-show="displayType === 'card'">
    <el-row style="padding-top: 15px">
      <el-col :span="8" v-for="course in coursesList" :key="course.id" style="padding: 15px 30px;cursor: pointer"  @click.native="detail(course.id)" >
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
            searchValue: '',
            countryList: [],
            provinceList: [],
            cityList: [],
            country_id: '',
            province_id: '',
            city_id: '',
            coursesList: '',
            displayType: 'card'
        }
      },
      mounted(){
          this.getTags();
          this.getAllCountry();
          this.getCoursesList(0,8);
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
          async getCoursesList(page, limit) {
              const result = await getCoursesList({page, limit})
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
              console.log(id)
              this.$router.push({path: `/courses/${id}`})
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
  .tag-item{
    padding: 10px;
  }
</style>
