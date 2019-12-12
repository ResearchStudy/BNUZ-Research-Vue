<template>
  <el-menu
    default-active="1"
    class="sider-nav__container"
    @open="handleOpen"
    @close="handleClose"
    :unique-opened="true"
    router
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-order"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">内容管理</el-menu-item>
        <el-menu-item index="1-2">栏目管理</el-menu-item>
        <el-menu-item index="1-3">评论管理</el-menu-item>
        <el-menu-item index="1-4">稿件管理</el-menu-item>
        <el-menu-item index="1-5">附件管理</el-menu-item>
        <el-menu-item index="1-6">模型管理</el-menu-item>
        <el-menu-item index="/admin/tabs">TAG管理</el-menu-item>
        <el-menu-item index="1-8">网站管理</el-menu-item>
        <el-menu-item index="1-9">批量更新URL</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>会员管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">会员管理</el-menu-item>
        <el-menu-item index="2-2">审核会员</el-menu-item>
        <el-menu-item index="2-3">积分记录</el-menu-item>
        <el-menu-item index="2-4">订单管理</el-menu-item>
        <el-menu-item index="2-5">消息管理</el-menu-item>
        <el-menu-item index="2-6">群发消息</el-menu-item>
        <el-menu-item index="2-7">会员统计</el-menu-item>
        <el-menu-item index="2-8">会员组管理</el-menu-item>
        <el-menu-item index="2-9">会员中心设置</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>模块管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">模块管理</el-menu-item>
        <el-menu-item index="3-2">采集管理</el-menu-item>
        <el-menu-item index="3-3">广告管理</el-menu-item>
        <el-menu-item index="3-4">支付模块</el-menu-item>
        <el-menu-item index="3-5">留言管理</el-menu-item>
        <el-menu-item index="3-6">轮播图管理</el-menu-item>
        <el-menu-item index="3-7">自定义表单</el-menu-item>
        <el-menu-item index="3-8">友情链接管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-chat-dot-round"></i>
        <span>微信管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">微信管理</el-menu-item>
        <el-menu-item index="4-2">微信用户</el-menu-item>
        <el-menu-item index="4-3">分组管理</el-menu-item>
        <el-menu-item index="4-4">微信菜单</el-menu-item>
        <el-menu-item index="4-5">消息回复</el-menu-item>
        <el-menu-item index="4-6">消息管理</el-menu-item>
        <el-menu-item index="4-7">微信场景</el-menu-item>
        <el-menu-item index="4-8">素材管理</el-menu-item>
        <el-menu-item index="4-9">高级群发</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span>管理员管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1">管理员管理</el-menu-item>
        <el-menu-item index="5-2">角色管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="6-1">系统管理</el-menu-item>
        <el-menu-item index="6-2">邮件配置</el-menu-item>
        <el-menu-item index="6-3">自定义配置</el-menu-item>
        <el-menu-item index="6-4">屏蔽词管理</el-menu-item>
        <el-menu-item index="6-6">SQL命令行</el-menu-item>
        <el-menu-item index="6-6">后台菜单管理</el-menu-item>
        <el-menu-item index="6-7">URL规则管理</el-menu-item>
        <el-menu-item index="6-8">后台操作日志</el-menu-item>
        <el-menu-item index="6-9">后台登录日志</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-data-analysis"></i>
        <span>数据管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="6-1">系统管理</el-menu-item>
        <el-menu-item index="6-2">邮件配置</el-menu-item>
        <el-menu-item index="6-3">自定义配置</el-menu-item>
        <el-menu-item index="6-4">屏蔽词管理</el-menu-item>
        <el-menu-item index="6-6">SQL命令行</el-menu-item>
        <el-menu-item index="6-6">后台菜单管理</el-menu-item>
        <el-menu-item index="6-7">URL规则管理</el-menu-item>
        <el-menu-item index="6-8">后台操作日志</el-menu-item>
        <el-menu-item index="6-9">后台登录日志</el-menu-item>
      </el-menu-item-group>
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

// .el-menu-item {
//   color: #fff;
//   &:hover {
//     color: #333 !important;
//     background: #fff !important;
//   }
// }

// .el-submenu__title {
//   color: #fff !important;
// }
</style>