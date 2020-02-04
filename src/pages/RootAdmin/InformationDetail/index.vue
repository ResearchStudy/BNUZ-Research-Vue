<template>
  <div class="information-detail__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>资讯详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{informationDetails.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="information-detail__wrap">
      <div class="information-detail__title">基本信息</div>
      <el-divider></el-divider>
      <el-form ref="form" label-width="120px" label-suffix=":">
        <el-form-item label="资讯标题">
          <div class="content">{{informationDetails.title}}</div>
        </el-form-item>
        <el-form-item label="资讯摘要">
          <div class="content">{{informationDetails.abstract}}</div>
        </el-form-item>
        <el-form-item label="资讯封面">
          <div
            class="logo"
            :style="{backgroundImage:`url(${'/api/resources/'+informationDetails.cover})`}"
          ></div>
        </el-form-item>
        <el-form-item label="资讯类型">
          <div class="content">{{informationDetails.information_type===1?'时事':'政策'}}</div>
        </el-form-item>
        <el-form-item label="机构名称">
          <div class="content">{{informationDetails.institution_name}}</div>
        </el-form-item>
        <el-form-item label="资讯内容">
          <div class="content" v-html="informationDetails.content"></div>
        </el-form-item>
        <el-form-item label="更新时间">
          <div class="content">{{new Date(informationDetails.update_time*1000).toLocaleString()}}</div>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="附件列表">
          <div class="content">
            <enclousure-list v-if="resources.length!==0" :resources="resources"></enclousure-list>
            <div v-else>无</div>
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
  name: "InformationDetail",
  components: { EnclousureList },
  data() {
    return {
      id: -1,
      informationDetails: {},
      resources: []
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.id = id;
    await this.getInformationDetail();
  },
  methods: {
    async getInformationDetail() {
      const { data } = await this.$http.get(`/api/information/${this.id}`);
      this.informationDetails = data;
      this.resources = data.resources;
    },
    async handleAdoptClick(isAdopted) {
      await this.$http.post(`/api/information/${this.id}/examine`, {
        adopt: isAdopted,
        reply: "没有回复哦"
      });
      this.$message({
        type: "success",
        message: "审核成功！",
        isSingle: true
      });
      this.$router.push({
        path: "/root-admin/information-list"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.information-detail {
  &__container {
    width: 90%;
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
      width: 280px;
      height: 150px;
      margin-top: 13px;
      margin-left: 30px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    /deep/ .el-form-item {
      margin-bottom: 16px;
    }
  }
}
</style>