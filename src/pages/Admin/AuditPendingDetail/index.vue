<template>
  <div class="audit-pending-detail__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机构管理</el-breadcrumb-item>
      <el-breadcrumb-item>待审核机构</el-breadcrumb-item>
      <el-breadcrumb-item>北师珠</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="audit-pending-detail__wrap">
      <div class="audit-pending-detail__title">基本信息</div>
      <el-form ref="form" label-width="120px" label-suffix=":">
        <el-form-item label="企业名称">
          <div class="content">{{name}}</div>
        </el-form-item>
        <el-form-item label="企业注册号">
          <div class="content">{{taxId}}</div>
        </el-form-item>
        <el-form-item label="企业类型">
          <div class="content">{{institutionType}}</div>
        </el-form-item>
        <el-form-item label="详细地址">
          <div class="content">{{address}}</div>
        </el-form-item>
        <el-form-item label="法定代表人">
          <div class="content">{{legalPerson}}</div>
        </el-form-item>
        <el-form-item label="成立时间">
          <div class="content">{{establishTime}}</div>
        </el-form-item>
        <el-form-item label="注册资金">
          <div class="content">{{registeredMoney}}</div>
        </el-form-item>
        <el-form-item label="营业期限">
          <div class="content">{{businessLicenseStartTime}} 至 {{businessLicenseEntTime}}</div>
        </el-form-item>
        <el-form-item label="经营范围">
          <div class="content">{{businessScope}}</div>
        </el-form-item>
        <el-form-item label="登记机关">
          <div class="content">{{registrationAuthority}}</div>
        </el-form-item>
        <el-form-item label="核准时间">
          <div class="content">{{approvalTime}}</div>
        </el-form-item>
        <el-form-item label="营业执照">
          <div class="logo"></div>
        </el-form-item>
        <el-form-item>
          <div class="content">
            <el-button type="primary" @click="onSubmit">通过审核</el-button>
            <el-button type="danger">拒绝审核</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuditPendingDetail",
  data() {
    return {
      name: "北京师范大学珠海分校",
      taxId: "91310115323189418K",
      institutionType: "有限责任公司（自然人投资或控股）",
      address: "唐家湾镇金凤路18号",
      legalPerson: "陈某人",
      establishTime: "2019-11-09",
      registeredMoney: "200万人民币",
      businessLicenseStartTime: "2019-11-09",
      businessLicenseEntTime: "2031-12-14",
      businessScope:
        "电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务电子商务",
      registrationAuthority: "广东省香洲区市场监管局",
      approvalTime: "2019-12-14"
    };
  },
  mounted() {
    const { id } = this.$route.params;
    console.log(id);
    /* ajax获取待审核机构信息 */
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.audit-pending-detail {
  &__container {
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
      width: 50%;
      height: 300px;
      margin-top: 13px;
      margin-left: 30px;
      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    }

    /deep/ .el-form-item{
      margin-bottom: 16px;
    }
  }
}
</style>