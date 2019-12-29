<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <sider-nav />
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
//import Header from "@/components/InstitutionAdmin/Header";
import appHeader from '../../../components/header-component/index.vue';
import SiderNav from "@/components/InstitutionAdmin/SiderNav";
export default {
  components: { MyHeader: appHeader, SiderNav },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.el-header {
  padding: 0;
  color: #333;
  line-height: 60px;
}

.el-footer {
  padding: 0;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  position: fixed;
  top: 60px;
  left: 0;
  overflow-x: hidden;
  height: calc(100vh - 60px);
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  margin-left: 200px;
  background-color: #f7f7f7;
  color: #333;
  text-align: left;
}

::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}

::-webkit-scrollbar-track {
  background: #fff;
}

::-webkit-scrollbar-thumb {
  background: #d7d7d7;
  /*border-radius: 20px;*/
}
</style>