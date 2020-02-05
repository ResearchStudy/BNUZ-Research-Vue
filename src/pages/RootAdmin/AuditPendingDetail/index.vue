<template>
  <div class="audit-pending-detail__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机构管理</el-breadcrumb-item>
      <el-breadcrumb-item>待审核机构</el-breadcrumb-item>
      <el-breadcrumb-item>{{institutionDetails.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="audit-pending-detail__wrap" style="width: 60%;margin-left: 8%">
      <div class="audit-pending-detail__title">基本信息</div>
      <el-divider></el-divider>
      <el-form ref="form" label-width="120px" label-suffix=":">
        <el-form-item label="企业名称">
          <div class="content">{{institutionDetails.name}}</div>
        </el-form-item>
        <el-form-item label="企业注册号">
          <div class="content">{{institutionDetails.tax_id}}</div>
        </el-form-item>
        <el-form-item label="企业类型">
          <div class="content">{{institutionDetails.institution_type}}</div>
        </el-form-item>

        <el-form-item label="详细地址" v-if="institutionDetails.address">
          <div class="content">{{details}}</div>
        </el-form-item>
        <el-form-item label="法定代表人">
          <div class="content">{{institutionDetails.legal_person}}</div>
        </el-form-item>
        <el-form-item label="成立时间">
          <div
            class="content"
          >{{new Date(institutionDetails.establish_time*1000).toLocaleDateString()}}</div>
        </el-form-item>

        <el-form-item label="注册资金">
          <div class="content">{{institutionDetails.registered_money}}</div>
        </el-form-item>
        <el-form-item label="营业期限">
          <div
            class="content"
          >{{new Date(institutionDetails.business_license_start_time*1000).toLocaleDateString()}} 至 {{new Date(institutionDetails.business_license_ent_time*1000).toLocaleDateString()}}</div>
        </el-form-item>
        <el-form-item label="经营范围">
          <div class="content">{{institutionDetails.business_scope}}</div>
        </el-form-item>
        <el-form-item label="登记机关">
          <div class="content">{{institutionDetails.registration_authority}}</div>
        </el-form-item>
        <el-form-item label="核准时间">
          <div
            class="content"
          >{{new Date(institutionDetails.approval_time *1000).toLocaleDateString()}}</div>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="头像">
          <div
            class="logo"
            :style="{backgroundImage:`url(${'/api/resources/'+institutionDetails.logo})`}"
          ></div>
        </el-form-item>
        <el-form-item label="营业执照">
          <div
            class="licence"
            v-if="institutionDetails.logo"
            :style="{backgroundImage:`url(${'/api/resources/'+institutionDetails.business_license})`}"
          ></div>
        </el-form-item>
        <el-form-item label="发票抬头">
          <div class="content">{{institutionDetails.invoice_rise}}</div>
        </el-form-item>
        <el-form-item label="纳税人识别号">
          <div class="content">{{institutionDetails.taxpayer_distinguish}}</div>
        </el-form-item>
        <el-form-item label="开票备注">
          <div class="content">{{institutionDetails.remarks || '无'}}</div>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="附件列表">
          <div class="content">
            <enclousure-list :resources="resources"></enclousure-list>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="content">
            <el-button type="primary" @click="handleAdoptClick(true)">通过审核</el-button>
            <el-button type="danger" @click="handleAdoptClick(false)">退回</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import EnclousureList from "@/components/EnclosureList";
export default {
  name: "AuditPendingDetail",
  components: { EnclousureList },
  data() {
    return {
      id: -1,
      institutionDetails: {},
      resources: []
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.id = id;
    await this.getAuditPendingDetail();
  },
  methods: {
    async getAuditPendingDetail() {
      const {
        data: { institution_details, resources }
      } = await this.$http.get(`/api/institutions/enroll/${this.id}`);
      this.institutionDetails = institution_details;
      this.resources = resources;
    },
    async handleAdoptClick(isAdopted) {
      await this.$http.post(`/api/institutions/enroll/handle/${this.id}`, {
        adopt: isAdopted,
        reply: "没有回复哦"
      });
      this.$message({
        type: "success",
        message: "处理成功！",
        isSingle: true
      });
      this.$router.push({
        path: "/root-admin/audit-pending-list"
      });
    }
  },
  computed: {
    details: function() {
      if (!this.institutionDetails) return "";
      const {
        address: { country_name, province_name, city_name }
      } = this.institutionDetails;
      return `${country_name} ${province_name} ${city_name}`;
    }
  }
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
      width: 200px;
      height: 200px;
      margin-top: 13px;
      margin-left: 30px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    .licence {
      width: 50%;
      height: 300px;
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