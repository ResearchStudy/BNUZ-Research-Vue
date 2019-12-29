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
  <div class="hot-city-group" ref="hotCityGroup">
    <div><h2>热门城市 | </h2></div>
    <div @mouseenter="showArrow = true" @mouseleave="showArrow = false">
      <div class="left-arrow" v-show="showArrow" @click="scroll(true)"><img src="../../assets/img/arrow-left.png" alt=""></div>
      <div class="right-arrow" v-show="showArrow" @click="scroll(false)"><img src="../../assets/img/arrow-right.png" alt=""></div>
      <div style="display: inline-flex;">
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
      </div>
      <div style="display: inline-flex;margin-top: 30px">
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
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
              coursesList: [],
              showArrow: false
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
            scroll(isLeft){
                this.$nextTick(() => {
                    if(isLeft){
                        this.$refs.hotCityGroup.scrollLeft -= 100
                    }else {
                        this.$refs.hotCityGroup.scrollLeft += 100
                    }
                })
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
  .hot-city{
    width: 200px;
    background-image: url("../../assets/img/beijing.jpeg");
    background-size: cover;
    padding-left: 20px;
    margin-right: 30px;
  }
  .left-arrow{
    position: absolute;
    margin-top: 100px;
    cursor: pointer;
  }
  .right-arrow{
    position: absolute;
    margin-top: 100px;
    margin-left: calc(67%);
    cursor: pointer;
  }
  .hot-city-group{
    width: 70%;
    margin-left: 15%;
    overflow-x: auto;
    scroll-behavior:smooth
  }
  .hot-city-group::-webkit-scrollbar{
    display:none

  }
</style>
