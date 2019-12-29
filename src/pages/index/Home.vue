<template>
<div>
  <div style="width: 70%;height: 200px;border: 1px solid black;margin-left: 15%">banner</div>
  <div class="search-group">
    <el-input placeholder="请输入内容" v-model="searchValue">
      <el-button slot="append" icon="el-icon-search" type="primary"></el-button>
    </el-input>
  </div>
  <div style="margin-top: 10px;width: 70%;margin-left: 15%">
    <el-tag
            v-for="tag in tagList"
            :key="tag.id"
            effect="plain" style="margin: 5px">
      {{ tag.name }}
    </el-tag>
  </div>
  <div style="width: 70%;margin-top: 10px;margin-left: 15%;display: flex">
    <div style="border: 1px solid black">
      <div style="border-bottom: 1px solid #f2f2f2;padding: 10px 15px">
        <span>最新课程</span> | <span>最新资讯</span>
      </div>
      <div>
        <div style="display: flex;justify-content: space-between;padding: 10px 15px" v-for="course in coursesList" :key="course.id">
          <div>{{course.title}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import {getTags} from "../../api/tags";
    import {getCoursesList, mGetCoursesInfo} from "../../api/courses";

    export default {
        name: "Home",
        data(){
          return{
              tagList: [],
              searchValue: '',
              coursesList: []
          }
        },
        mounted(){
          this.getTags();
          this.getNewestCoursesList();
        },
        methods:{
            async getTags() {
                const result = await getTags();
                this.tagList = result.tags;
            },
            async getNewestCoursesList() {
                const result = await getCoursesList();
                const ids = result.courses.slice(result.total - 10).map((item) => item.id)
                const courseList = await mGetCoursesInfo({ids});
                this.coursesList = courseList
            },
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
