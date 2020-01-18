<template>
  <el-menu
    :default-active="$route.path"
    class="sider-nav__container"
    :default-openeds="['1', '2']"
    :unique-opened="true"
    theme=dark
    background-color="#F6F6F8"
    router
  >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-user-solid"></i>账号中心</template>
        <el-menu-item-group>
        <el-menu-item index="/person/dashboard">基本资料</el-menu-item>
        <el-menu-item index="/person/reset-pwd">修改密码</el-menu-item>
        <el-menu-item index="/person/reset-phone">修改手机号</el-menu-item>
        <el-menu-item index="/person/address">修改联系地址</el-menu-item>
        <el-menu-item index="1-5">第三方账号绑定</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-shopping-cart-full"></i>课程中心</template>
        <el-menu-item-group>
        <el-menu-item index="/person/pre-entry">预报名课程</el-menu-item>
        <el-menu-item index="/person/alr-entry">已报名课程</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

</template>


<script>
export default {
    name:"SiderNav"
}
</script>
<style lang="scss" scoped>
.e1-menu {
    border: 0 !important;
}
.logo-header {
    color : #409EFF;
    height : 50px;
    line-height:50px;
}
</style>