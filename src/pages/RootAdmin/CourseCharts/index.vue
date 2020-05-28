<template>
  <div class="institution-map">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/root-admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计中心</el-breadcrumb-item>
      <el-breadcrumb-item>课程统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="z-index:2;position:absolute;margin-left:80%">
      <el-button type="primary" icon="el-icon-right" circle @click="changeTable"></el-button>
    </div>
    <div class="institution-map_wrap">
      <div :style="{height:'580px',width:'100%'}" class="map" ref="myEchart"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

import "../../../../node_modules/echarts/map/js/china.js";
export default {
  name: "echarts",
  props: ["userJson"],
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.chinaConfigure();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    randomData() {
      return Math.round(Math.random() * 100);
    },
    changeTable() {
      this.$router.push("/root-admin/course-statistics");
    },
    chinaConfigure() {
      console.log(this.userJson);
      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({
        title: [
          {
            text: "课程统计",
            left: "center"
          },
          {
            subtext: "课程个数",
            subtextStyle: {
              color: "#E47833",
              fontSize: 16
            },

            left: "20%",
            top: "80%",
            textAlign: "center"
          },
          {
            subtext: "销售额",
            subtextStyle: {
              color: "#00009C",
              fontSize: 16
            },
            left: "70%",
            top: "80%",
            textAlign: "center"
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: " left",
          data: [
            "知识科普型",
            "自然观赏型",
            "体验考察型",
            "励志拓展型",
            "文化康乐型"
          ]
        },
        series: [
          {
            name: "课程数量",
            type: "pie",
            radius: "40%",
            center: ["20%", "50%"],
            data: [
              { value: 1, name: "知识科普型" },
              { value: 0, name: "自然观赏型" },
              { value: 2, name: "体验考察型" },
              { value: 0, name: "励志拓展型" },
              { value: 1, name: "文化康乐型" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          {
            name: "销售额",
            type: "pie",
            radius: "40%",
            center: ["70%", "50%"],
            data: [
              { value: 20, name: "知识科普型" },
              { value: 10, name: "自然观赏型" },
              { value: 20, name: "体验考察型" },
              { value: 32, name: "励志拓展型" },
              { value: 14, name: "文化康乐型" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.institution-map {
  &__wrap {
    margin-top: 40px;
    padding: 10px;
    background: #fff;
    position: relative;
  }
}
.map {
  margin-top: 20px;
  margin-right: 10px;
  position: relative;
}
</style>