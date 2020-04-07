<template>
  <el-menu
    :default-active="$route.path"
    class="sider-nav__container"
    :unique-opened="true"
    theme=dark
    background-color="#F6F6F8"
    router
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-office-building"></i>
        <span>机构管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/root-admin/audit-pending-list">待审核机构</el-menu-item>
        <el-menu-item index="/root-admin/audit-finish-list">已审核机构</el-menu-item>
        <el-menu-item index="/root-admin/audit-pending-modify">待审核修改</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/root-admin/course-list">课程列表</el-menu-item>
        <el-menu-item index="/root-admin/information-list">资讯列表</el-menu-item>
        <el-menu-item index="/root-admin/tags">标签管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>用户中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/root-admin/accounts">会员管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-pie-chart"></i>
        <span>统计中心</span>
      </template>
      <el-menu-item-group></el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item-group></el-menu-item-group>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-s-data"></i>
        <span>数据管理</span>
      </template>
      <el-menu-item-group></el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "SiderNav"
};
</script>

<style lang="scss" scoped>
.el-menu {
  border: 0 !important;
}
</style>