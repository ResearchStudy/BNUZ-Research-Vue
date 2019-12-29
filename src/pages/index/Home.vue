<template>
<div>
  <div class="banner">
    <img src="../../assets/img/banner.jpeg" alt="" style="height: 150px;width: 100%">
  </div>
  <!--<div class="search-group">-->
    <!--<el-input placeholder="请输入内容" v-model="searchValue">-->
      <!--<el-button slot="append" icon="el-icon-search" type="primary"></el-button>-->
    <!--</el-input>-->
  <!--</div>-->
  <!--<div style="margin-top: 10px;width: 70%;margin-left: 15%">-->
    <!--<el-tag-->
            <!--v-for="tag in tagList"-->
            <!--:key="tag.id"-->
            <!--effect="plain" style="margin: 5px">-->
      <!--{{ tag.name }}-->
    <!--</el-tag>-->
  <!--</div>-->
  <div style="width: 70%;margin-top: 10px;margin-left: 15%;display: flex">
    <div style="border: 1px solid black;width: 25%">
      <div style="border-bottom: 1px solid #f2f2f2;padding: 10px 15px">
        <span>最新课程</span> | <span>最新资讯</span>
      </div>
      <div>
        <div style="display: flex;justify-content: space-between;padding: 10px 15px" v-for="course in coursesList" :key="course.id">
          <div style="font-weight: bold">{{course.title}}</div>
        </div>
      </div>
    </div>
    <div style="margin-left: 30px;width: 35%">
      <el-carousel height="312px" style="width: 100%">
        <el-carousel-item v-for="item in 4" :key="item" >
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="margin-left: 30px;width: 40%">
      <el-row style="text-align: right">
        <el-col :span="8"><img src="../../assets/img/default-cover.jpeg" alt="" class="default-cover"></el-col>
        <el-col :span="8"><img src="../../assets/img/default-cover.jpeg" alt="" class="default-cover"></el-col>
        <el-col :span="8"><img src="../../assets/img/default-cover.jpeg" alt="" class="default-cover"></el-col>
        <el-col :span="8"><img src="../../assets/img/default-cover.jpeg" alt="" class="default-cover"></el-col>
        <el-col :span="8"><img src="../../assets/img/default-cover.jpeg" alt="" class="default-cover"></el-col>
        <el-col :span="8"><img src="../../assets/img/default-cover.jpeg" alt="" class="default-cover"></el-col>
      </el-row>
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
    import {getCoursesList} from "../../api/courses";
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
                this.coursesList = result.courses.slice(result.total - 5)
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
  .banner{
    margin-left: 15%;
    width: 70%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 312px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .default-cover{
    height: 150px
  }
</style>
