<template>
  <div class="settled-detail__container">
    <el-breadcrumb separator-class="el-icon-arrow-right"
    style="margin-top:2px">
      <el-breadcrumb-item :to="{ path: '/person/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号中心</el-breadcrumb-item>
      <el-breadcrumb-item>入驻审核</el-breadcrumb-item>
      <el-breadcrumb-item>{{institutionDetails.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="settled-detail__wrap">
      <div class="settled-detail__title">基本信息</div>
      <el-form
        ref="form"
        label-width="120px"
        label-suffix=":"
      >
        <el-form-item label="企业名称">
          <div class="content">{{institutionDetails.name}}</div>
        </el-form-item>
        <el-form-item label="机构封面">
          <div
            class="logo"
            :style="{backgroundImage:`url(${'/api/resources/'+institutionDetails.logo})`}"
          ></div>
        </el-form-item>
        <el-form-item label="企业注册号">
          <div class="content">{{institutionDetails.tax_id}}</div>
        </el-form-item>
        <el-form-item label="企业类型">
          <div class="content">{{institutionDetails.institution_type}}</div>
        </el-form-item>
        <el-form-item label="详细地址">
          <div class="content">{{institutionDetails.address.country_name}} {{institutionDetails.address.province_name}} {{institutionDetails.address.city_name}} {{institutionDetails.address.details}}</div>
        </el-form-item>
        <el-form-item label="法定代表人">
          <div class="content">{{institutionDetails.legal_person}}</div>
        </el-form-item>
        <el-form-item label="联系电话">
          <div class="content">{{institutionDetails.phone}}</div>
        </el-form-item>
        <el-form-item label="成立时间">
          <div class="content">{{new Date(institutionDetails.establish_time*1000).toLocaleDateString()}}</div>
        </el-form-item>
        <el-form-item label="注册资金">
          <div class="content">{{institutionDetails.registered_money}}</div>
        </el-form-item>
        <el-form-item label="营业期限">
          <div class="content">{{new Date(institutionDetails.business_license_start_time*1000).toLocaleDateString()}} 至 {{new Date(institutionDetails.business_license_ent_time*1000).toLocaleDateString()}}</div>
        </el-form-item>
        <el-form-item label="经营范围">
          <div class="content">{{institutionDetails.business_scope}}</div>
        </el-form-item>
        <el-form-item label="登记机关">
          <div class="content">{{institutionDetails.registration_authority}}</div>
        </el-form-item>
        <el-form-item label="核准时间">
          <div class="content">{{new Date(institutionDetails.approval_time *1000).toLocaleDateString()}}</div>
        </el-form-item>
        <el-form-item label="营业执照">
          <div
            class="logo"
            :style="{backgroundImage:`url(${'/api/resources/'+institutionDetails.business_license})`}"
          ></div>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettledDetails",
  data() {
    return {
      id: -1,
      institutionDetails: {}
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.id = id;
    await this.getAuditPendingDetail();
  },
  methods: {
    async getAuditPendingDetail() {
      const { data } = await this.$http.post("/api/institutions/enroll/_mget", {
        ids: [this.id]
      });
      const { institution_details } = data[0];
      this.institutionDetails = institution_details;
    }
  }
};
</script>

<style lang="scss" scoped>
.settled-detail {
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
      width: 20%;
      height: 200px;
      margin-top: 13px;
      margin-left: 30px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      // background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    }

    /deep/ .el-form-item {
      margin-bottom: 16px;
    }
  }
}
</style>