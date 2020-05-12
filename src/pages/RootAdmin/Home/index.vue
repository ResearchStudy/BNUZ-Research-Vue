<template>
  <div class="app-container">
    <panel-group />
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card style="height:350px ; padding:10px">
          <div
            slot="header"
            class="clearfix"
          >
            <strong style="font-size:16px"> 待办事项</strong>
            <span class="time">{{ nowDate + ' ' + nowTime + ' ' + nowWeek }}</span>
          </div>

          <div class="text item">
            <a style="text-decoration: none; color: #606266;" href="/root-admin/audit-pending-list">
            <i
              class="el-icon-school"
              style="color: rgb(115, 103, 240)"
            /> 机构审核</a>
            <span style="float:right">{{institution}}</span>
          </div>
          <el-divider></el-divider>
          <div class="text item">
            <a style="text-decoration: none; color: #606266;" href="/root-admin/course-list">
            <i
              class="el-icon-reading"
              style="color: rgb(234, 84, 85)"
            /> 课程审核</a>
            <span style="float:right">{{course}}</span>
          </div>
          <el-divider></el-divider>
          <div class="text item">
            <a style="text-decoration: none; color: #606266;" href="/root-admin/information-list">
            <i
              class="el-icon-info"
              style="color: rgb(3, 150, 255)"
            /> 资讯审核</a>
            <span style="float:right">{{information}}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div
          v-for="(item, index) in chartList"
          :key="index"
          class="charts"
        >
          <component
            :is="'chart-' + item.chartType"
            :chart-data="item.chartData || {nameList: [], xList: [], dataList: []}"
            :mark-point="item.markPoint"
            :title="item.title"
            :x-unit="item.xUnit"
            :y-unit="item.yUnit"
            :height="item.height"
            :toolbox-show="item.toolboxShow || false"
          />

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./PanelGroup";
import Line from "./Line";
// import Bar from './Bar'
export default {
  components: {
    PanelGroup,
    "chart-line": Line
    // 'chart-bar': Bar
  },
  data() {
    return {
      nowDate: "", // 当前日期
      nowTime: "", // 当前时间
      nowWeek: "",
      loading: false,
      institution: 0,
      course: 0,
      information: 0,
      chartList: [
        {
          dataType: "loginAnalyze",
          title: "最近七天用户登录分析",
          height: "350px",
          chartType: "line",
          xUnit: "天",
          yUnit: "人数",
          chartData: {
            nameList: ["最近七天"],
            xList: ["4/23", "4/24", "4/25", "4/26", "4/27", "4/28", "4/29"],
            dataList: [[23, 46, 11, 55, 13, 12, 12]]
          }
        }
        // {
        //   title: '课程类型',
        //   height: '300px',
        //   chartType: 'bar',
        //   chartData: {
        //     nameList: ['课程类型'],
        //     xList: ['知识科普型', '自然观赏型', '体验考察型', '励志拓展型', '文化康乐型'],
        //     dataList: [[9, 3, 3,  3, 1, 2]]
        //   }
        // },
      ]
    };
  },
  methods: {
    //getCharts () {
    // userLoginAnalyzeApi({ days: 7 }).then(res => {
    //   this.loading = false
    //   if (res.success) {
    //     const data = res.content
    //     this.chartList.forEach(item => {
    //       if (item.dataType === 'loginAnalyze') {
    //         item.chartData = {
    //           nameList: data.daysList,
    //           xList: data.timeList,
    //           dataList: data.dataList
    //         }
    //       }
    //     })
    //   }
    // }).catch(() => {
    //   this.loading = false
    // })
    //}
    async getCharts() {
      const {
        data: { total : institution }
      } = await this.$http.get("/api/institutions/enroll/list", {
        limit: "10",
        page: this.currentPage + "",
        handle: false,
        adopt: false,
        name: ""
      });
      const {
        data: { total: information }
      } = await this.$http.get("/api/information/list", {
        limit: "10",
        page: this.currentPage + "",
        status: "1",
        me: "1"
      });
      const {
        data: { total: course }
      } = await this.$http.get("/api/courses/list", {
        limit: "10",
        page: this.currentPage + "",
        status: "1",
        me: "1"
      });
      this.institution = institution
      this.course = course
      this.information = information
      // const {data : {total : course}} = await this.$http.get('/api/institutions/enroll/list');
      // const {data : {total : information}} = await this.$http.get('/api/institutions/enroll/list');
    },
    currentTime() {
      setInterval(this.getDate, 500);
    },
    getDate: function() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let week = new Date().getDay();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      if (week == 1) {
        this.nowWeek = "星期一";
      } else if (week == 2) {
        this.nowWeek = "星期二";
      } else if (week == 3) {
        this.nowWeek = "星期三";
      } else if (week == 4) {
        this.nowWeek = "星期四";
      } else if (week == 5) {
        this.nowWeek = "星期五";
      } else if (week == 6) {
        this.nowWeek = "星期六";
      } else {
        this.nowWeek = "星期日";
      }
      _this.nowTime = hh + ":" + mf;
      _this.nowDate = yy + "/" + mm + "/" + dd;
    }
  },
  mounted() {
    this.getCharts();
    this.currentTime();
  },
  beforeDestroy: function() {
    if (this.getDate) {
      console.log("销毁定时器");
      clearInterval(this.getDate);
    }
  }
};
</script>

<style scoped lang="scss">
.time {
  color: #87de75;
  float: right;
}

.text {
  font-size: 16px;
  
}

.item {
  margin-bottom: 20px;
  text-decoration: none;  
}
.app-container {
  display: flex;
  flex-direction: column;
  .charts {
    flex: 1;
    margin-bottom: 20px;
    padding: 10px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.05);
  }
}
</style>