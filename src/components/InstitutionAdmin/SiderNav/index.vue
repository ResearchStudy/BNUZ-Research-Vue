<template>
  <el-menu
    class="sider-nav__container"
    :unique-opened="true"
    :default-openeds="['1', '2', '3', '4' ]"
    theme=dark
    background-color="#F6F6F8"
    router
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-office-building"></i>
        <span>账户中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/institution-admin/dashboard">基本资料</el-menu-item>
        <el-menu-item index="1-2">修改密码</el-menu-item>
        <el-menu-item index="1-2">修改手机号</el-menu-item>
        <el-menu-item index="1-2">修改地址</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>内容中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/institution-admin/courseManager">课程管理</el-menu-item>


        <el-menu-item index="/institution-admin/informationManager">资讯管理</el-menu-item>
        <el-menu-item index="2-5">附件管理</el-menu-item>
        <el-menu-item index="/insitution-admin/tags">标签管理</el-menu-item>
        <el-menu-item index="2-5">课程评论管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>用户中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/institution-admin/preEnrollStudent">预报名学生</el-menu-item>
        <el-menu-item index="/root-admin/accounts">已报名学生</el-menu-item>
        <el-menu-item index="/root-admin/accounts">批量报名</el-menu-item>
        <el-menu-item index="/root-admin/accounts">退款申请</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-pie-chart"></i>
        <span>统计中心</span>
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