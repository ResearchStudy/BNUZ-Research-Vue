<template>
  <div class="course-detail__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/root-admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{courseDetails.sub_title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="course-detail__wrap">
      <div class="course-detail__title">基本信息</div>
      <el-divider></el-divider>
      <el-form ref="form" label-width="120px" label-suffix=":">
        <el-form-item label="课程名称">
          <div class="content">{{courseDetails.title}}</div>
        </el-form-item>
        <el-form-item label="课程描述">
          <div class="content">{{courseDetails.description}}</div>
        </el-form-item>
        <el-form-item label="课程封面">
          <div
            class="logo"
            :style="{backgroundImage:`url(${'/api/resources/'+courseDetails.cover})`}"
          ></div>
        </el-form-item>
        <el-form-item label="课程类型">
          <div class="content">{{tags[courseDetails.course_type - 1]}}</div>
        </el-form-item>
        <el-form-item label="课程标签">
          <div class="content">{{courseDetails.tags.toString()}}</div>
        </el-form-item>
        <el-form-item label="课程价格">
          <div class="content" v-html="courseDetails.price"></div>
        </el-form-item>
        <el-form-item label="适合人群">
          <div class="content" v-html="courseDetails.suitable_for_crowd"></div>
        </el-form-item>
        <el-form-item label="研学地址">
          <div class="content">{{courseDetails.address.province_name}}{{courseDetails.address.city_name}}{{courseDetails.address.district_name}}{{courseDetails.address.details}}</div>
        </el-form-item>
        <el-form-item label="行程天数">
          <div class="content">{{courseDetails.travel_days}}</div>
        </el-form-item>
        <el-form-item label="研学日期">
          <div class="content">{{new Date(courseDetails.start_time*1000).toLocaleString()}} - {{new Date(courseDetails.end_time*1000).toLocaleString()}}</div>
        </el-form-item>
        <el-form-item label="课程详情">
          <div class="content"  v-html="courseDetails.details"></div>
        </el-form-item>
        <el-form-item label="行程安排">
          <div class="content"  v-html="courseDetails.scheduling"></div>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item>
          <div class="content">
            <el-button type="primary" @click="handleAdoptClick(true)">通过审核</el-button>
            <el-button type="danger" @click="handleAdoptClick(false)">退回</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>


export default {
  name: "InformationDetail",
  data() {
    return {
      id: -1,
      courseDetails: {},
      resources: [],
      tags : ["知识科普型" , "自然观赏型" , " 体验考察型" , " 励志拓展型" , "文化康乐型"],
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.id = id;
    await this.getCourseDetails();
  },
  methods: {
    async getCourseDetails() {
      const { data } = await this.$http.get(`/api/courses/${this.id}`);
      this.courseDetails = data;
      this.courseDetails.tags = data.tag.map(item => item.name)
      console.log(data)
      this.resources = data.resources;
    },
    //原接口（api/courses/{${this.id}/examine}
    async handleAdoptClick(isAdopted) {
      await this.$http.post(`/api/courses/examine`, {
        id : this.id,
        adopt: isAdopted,
        reply: "没有回复哦"
      });
      this.$message({
        type: "success",
        message: "审核成功！",
        isSingle: true
      });
      this.$router.push({
        path: "/root-admin/course-list"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.course-detail {
  &__container {
    width: 90%;
  }

  &__title {
    margin-bottom: 30px;
    color: #333;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 8px;
  }

  &__wrap {
    margin-top: 20px;
    padding: 10px;
    background: #fff;

    .content {
      max-width: 80%;
      margin-left: 30px;
      color: #666;
    }

    .logo {
      width: 280px;
      height: 150px;
      margin-top: 13px;
      margin-left: 30px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    /deep/ .el-form-item {
      margin-bottom: 16px;
    }
  }
}
</style>