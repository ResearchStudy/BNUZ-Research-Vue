<template>
  <div class="institution-map">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/root-admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计中心</el-breadcrumb-item>
      <el-breadcrumb-item>机构分布</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="z-index:2;position:absolute;margin-left:80%"><el-button type="primary" icon="el-icon-right"  circle @click="changeTable"></el-button></div>
    <div class="institution-map_wrap">
      <div
        :style="{height:'580px',width:'100%'}"
        class="map"
        ref="myEchart"
      ></div>
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
      this.$router.push( '/root-admin/institution-statistics')
    },
    chinaConfigure() {
      console.log(this.userJson);
      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({
        // 进行相关配置

        tooltip: {}, // 鼠标移到图里面的浮动提示框
        title: {
          text: "各省份机构个数统计",
          left: "center"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        // dataRange: {
        //   show: false,
        //   min: 0,
        //   max: 1000,
        //   text: ["High", "Low"],
        //   realtime: true,
        //   calculable: true,
        //   color: ["orangered", "yellow", "lightskyblue"]
        // },
        visualMap: {
          min: 0,
          max: 100,
          text: ["多", "少"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"]
          }
        },
        //右侧导航
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)"
            },
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            name: "机构数", // 浮动框的标题
            type: "map",
            roam: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            geoIndex: 0,
            data: [
              { name: "北京", value: this.randomData() },
              { name: "天津", value: this.randomData() },
              { name: "上海", value: this.randomData() },
              { name: "重庆", value: this.randomData() },
              { name: "河北", value: this.randomData() },
              { name: "河南", value: this.randomData() },
              { name: "云南", value: this.randomData() },
              { name: "辽宁", value: this.randomData() },
              { name: "黑龙江", value: this.randomData() },
              { name: "湖南", value: this.randomData() },
              { name: "安徽", value: this.randomData() },
              { name: "山东", value: this.randomData() },
              { name: "新疆", value: this.randomData() },
              { name: "江苏", value: this.randomData() },
              { name: "浙江", value: this.randomData() },
              { name: "江西", value: this.randomData() },
              { name: "湖北", value: this.randomData() },
              { name: "广西", value: this.randomData() },
              { name: "甘肃", value: this.randomData() },
              { name: "山西", value: this.randomData() },
              { name: "内蒙古", value: this.randomData() },
              { name: "陕西", value: this.randomData() },
              { name: "吉林", value: this.randomData() },
              { name: "福建", value: this.randomData() },
              { name: "贵州", value: this.randomData() },
              { name: "广东", value: this.randomData() },
              { name: "青海", value: this.randomData() },
              { name: "西藏", value: this.randomData() },
              { name: "四川", value: this.randomData() },
              { name: "宁夏", value: this.randomData() },
              { name: "海南", value: this.randomData() },
              { name: "台湾", value: this.randomData() },
              { name: "香港", value: this.randomData() },
              { name: "澳门", value: this.randomData() }
            ]
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
    position:relative;
  }
}
.map {
  margin-top: 20px;
  margin-right: 10px;
  position:relative;
  
}


</style>

