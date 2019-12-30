<template>
<div style="padding: 0px 10px;width: 90%;margin-left: 5%">
  <div class="banner">
    <img src="../../assets/img/banner.jpeg" alt="" style="height: 150px;width: 100%">
  </div>
  <div style="margin-top: 10px;display: flex">
    <div style="background: #f8f8f8;width: 25%">
      <div style="padding: 10px">
        <span @click="activeTab = 'course'" :style="activeTab === 'course' ? {color: '#409EFF'} : ''" style="cursor: pointer">最新课程</span> |
        <span @click="activeTab = 'information'" :style="activeTab === 'information' ? {color: '#409EFF'} : ''" style="cursor: pointer">最新资讯</span>
      </div>
      <div>
        <div style="display: flex;height: 32px;line-height: 32px;overflow: hidden;padding: 0px 5px" v-for="item in infoList" :key="item.id">
          <el-link  style="font-size: 14px;" @click="navigateToDetail(item.id)">{{item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}}</el-link>
        </div>
      </div>
    </div>
    <div style="width: 55%">
      <el-carousel height="312px" style="width: 100%">
        <el-carousel-item v-for="item in carouselList" :key="item" >
          <img :src="item" alt="" style="width: 100%;height: 312px">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="margin-left: 5px;width: 20%">
      <div style="display: flex;justify-content: space-around">
        <img src="../../assets/img/default-cover/knowledge.png" alt="" class="default-cover" @click="navigateCourse({course_type: 1})">
        <img src="../../assets/img/default-cover/nature.png" alt="" class="default-cover" @click="navigateCourse({course_type: 2})">
        <img src="../../assets/img/default-cover/partice.png" alt="" class="default-cover" @click="navigateCourse({course_type: 4})">
      </div>
      <div style="display: flex;justify-content: space-around">
        <img src="../../assets/img/default-cover/determin.jpeg" alt="" class="default-cover" @click="navigateCourse({course_type: 8})">
        <img src="../../assets/img/default-cover/culture.jpeg" alt="" class="default-cover" @click="navigateCourse({course_type: 16})">
        <img src="../../assets/img/default-cover/recommend.jpeg" alt="" class="default-cover" @click="navigateCourse({})">
      </div>
<!--      <el-row style="text-align: right">-->
<!--        <el-col :span="8"><img src="../../assets/img/default-cover/knowledge.png" alt="" class="default-cover" @click="navigateCourse({course_type: 1})"></el-col>-->
<!--        <el-col :span="8"><img src="../../assets/img/default-cover/nature.png" alt="" class="default-cover" @click="navigateCourse({course_type: 2})"></el-col>-->
<!--        <el-col :span="8"><img src="../../assets/img/default-cover/partice.png" alt="" class="default-cover" @click="navigateCourse({course_type: 4})"></el-col>-->
<!--        <el-col :span="8"><img src="../../assets/img/default-cover/determin.jpeg" alt="" class="default-cover" @click="navigateCourse({course_type: 8})"></el-col>-->
<!--        <el-col :span="8"><img src="../../assets/img/default-cover/culture.jpeg" alt="" class="default-cover" @click="navigateCourse({course_type: 16})"></el-col>-->
<!--        <el-col :span="8"><img src="../../assets/img/default-cover/recommend.jpeg" alt="" class="default-cover" @click="navigateCourse({})"></el-col>-->
<!--      </el-row>-->
    </div>
  </div>
  <div class="hot-city-group" ref="hotCityGroup">
    <div><h2>热门城市 | </h2></div>
    <div @mouseenter="showArrow = true" @mouseleave="showArrow = false">
      <div class="left-arrow" v-show="showArrow" @click="scroll(true)"><img src="../../assets/img/arrow-left.png" alt=""></div>
      <div class="right-arrow" v-show="showArrow" @click="scroll(false)"><img src="../../assets/img/arrow-right.png" alt=""></div>
      <div style="display: inline-flex;">
        <div class="hot-city beijing" @click="navigateCourse({province: 1})">
          <h3 style="color: white">北京</h3>
          <h4 style="color: white">Beijing</h4>
        </div>
        <div class="hot-city changsha" @click="navigateCourse({city:184})">
          <h3 style="color: white">长沙</h3>
          <h4 style="color: white">Changsha</h4>
        </div>
        <div class="hot-city chengdu" @click="navigateCourse({city: 240})">
          <h3 style="color: white">成都</h3>
          <h4 style="color: white">Chengdu</h4>
        </div>
        <div class="hot-city guangzhou" @click="navigateCourse({city: 198})">
          <h3 style="color: white">广州</h3>
          <h4 style="color: white">Gangzhou</h4>
        </div>
        <div class="hot-city hangzhou" @click="navigateCourse({city: 88})">
          <h3 style="color: white">杭州</h3>
          <h4 style="color: white">Hangzhou</h4>
        </div>
        <div class="hot-city qingdao" @click="navigateCourse({city: 136})">
          <h3 style="color: white">青岛</h3>
          <h4 style="color: white">Qingdao</h4>
        </div>
        <div class="hot-city zhengzhou" @click="navigateCourse({city: 152})">
          <h3 style="color: white">郑州</h3>
          <h4 style="color: white">Zhengzhou</h4>
        </div>
      </div>
      <div style="display: inline-flex;margin-top: 30px">
        <div class="hot-city shanghai" @click="navigateCourse({province: 9})">
          <h3 style="color: white">上海</h3>
          <h4 style="color: white">Shanghai</h4>
        </div>
        <div class="hot-city suzhou" @click="navigateCourse({city: 79})">
          <h3 style="color: white">苏州</h3>
          <h4 style="color: white">Suzhou</h4>
        </div>
        <div class="hot-city tianjin" @click="navigateCourse({province: 2})">
          <h3 style="color: white">天津</h3>
          <h4 style="color: white">Tianjin</h4>
        </div>
        <div class="hot-city wuhan" @click="navigateCourse({city: 170})">
          <h3 style="color: white">武汉</h3>
          <h4 style="color: white">Wuhan</h4>
        </div>
        <div class="hot-city xiamen" @click="navigateCourse({city: 116})">
          <h3 style="color: white">厦门</h3>
          <h4 style="color: white">Xiamen</h4>
        </div>
        <div class="hot-city xian" @click="navigateCourse({city: 293})">
          <h3 style="color: white">西安</h3>
          <h4 style="color: white">Xian</h4>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    import {getTags} from "../../api/tags";
    import {getCoursesList} from "../../api/courses";
    import {getInformationList} from "../../api/information";
    export default {
        name: "Home",
        data(){
          return{
              tagList: [],
              searchValue: '',
              coursesList: [],
              informationList: [],
              showArrow: false,
              activeTab: 'course',
              carouselList: []
          }
        },
        computed:{
          infoList(){
              return this.activeTab === 'course' ? this.coursesList : this.informationList;
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
                const courseList = await getCoursesList();
                this.coursesList = courseList.courses.slice(0,8)
                const informationList = await getInformationList();
                this.informationList = informationList.informations.slice(0,8)
                const carouseMap = this.coursesList.map((item) => {
                    return `/api/resources/${item.cover}`
                })
                this.carouselList = carouseMap
            },
            scroll(isLeft){
                this.$nextTick(() => {
                    if(isLeft){
                        this.$refs.hotCityGroup.scrollLeft -= 150
                    }else {
                        this.$refs.hotCityGroup.scrollLeft += 150
                    }
                })
            },
            navigateToDetail(id){
                if(this.activeTab === 'course'){
                    this.$router.push({path: `/courses/${id}`})
                }else{
                    this.$router.push({path: `/informations/${id}`})

                }
            },
            navigateCourse(info) {
              this.$router.push({name: 'CoursesList', params: info})
            }
        }
    }
</script>

<style scoped>
  .hot-city{
    width: 200px;
    background-size: cover;
    padding-left: 20px;
    margin-right: 30px;
    cursor: pointer;
  }
  .hot-city.beijing{
    background-image: url("../../assets/img/city/beijing.jpeg");
  }
  .hot-city.changsha{
    background-image: url("../../assets/img/city/changsha.jpeg");
  }
  .hot-city.chengdu{
    background-image: url("../../assets/img/city/chengdu.jpg");
  }
  .hot-city.guangzhou{
    background-image: url("../../assets/img/city/guangzhou.png");
  }
  .hot-city.hangzhou{
    background-image: url("../../assets/img/city/hangzhou.jpg");
  }
  .hot-city.qingdao{
    background-image: url("../../assets/img/city/qingdao.jpg");
  }
  .hot-city.shanghai{
    background-image: url("../../assets/img/city/shanghai.jpg");
  }
  .hot-city.suzhou{
    background-image: url("../../assets/img/city/suzhou.jpg");
  }
  .hot-city.tianjin{
    background-image: url("../../assets/img/city/tianjin.jpg");
  }
  .hot-city.wuhan{
    background-image: url("../../assets/img/city/wuhan.jpg");
  }
  .hot-city.xiamen{
    background-image: url("../../assets/img/city/xiamen.jpeg");
  }
  .hot-city.xian{
    background-image: url("../../assets/img/city/xian.jpg");
  }
  .hot-city.zhengzhou{
    background-image: url("../../assets/img/city/zhengzhou.jpg");
  }
  .left-arrow{
    position: absolute;
    margin-top: 100px;
    cursor: pointer;
  }
  .right-arrow{
    position: absolute;
    margin-top: 100px;
    margin-left: calc(95%);
    cursor: pointer;
  }
  .hot-city-group{
    overflow-x: auto;
    scroll-behavior:smooth
  }
  .hot-city-group::-webkit-scrollbar{
    display:none
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
    height: 150px;
    width: 33.3%;
    cursor: pointer;
  }
</style>
