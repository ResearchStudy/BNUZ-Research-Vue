<template>
  <div class="institution-statistics__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/root-admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计中心</el-breadcrumb-item>
      <el-breadcrumb-item>机构统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="institution-statistics__wrap">
      <div class="institution-statistics__header">
        <el-input
          type="text"
          placeholder="请输入搜索内容"
          class="width"
          v-model="name"
        ></el-input>
        <el-select
          v-model="province_id"
          clearable
          class="width"
          @change="getCityList(province_id)"
          placeholder="请选择省份"
        >
          <el-option
            v-for="province in provinceList"
            :label="province.name"
            :key="province.id"
            :value="province.id"
          ></el-option>
        </el-select>
          <el-select
            v-model="city_id"
            placeholder="请选择城市"
            clearable
            class="width"
          >
            <el-option
              v-for="city in cityList"
              :label="city.name"
              :key="city.id"
              :value="city.id"
            ></el-option>
          </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleSearchChange()"
        >搜索</el-button>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="excelDow"
        >导出</el-button>
      </div>
      <div class="institution-statistics__table">
        <el-table
          v-loading="isLoading"
          element-loading-text="数据加载中..."
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          border
          style="width: 100%"
          height="calc(100vh - 255px)"
        >
          <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
          <el-table-column
            prop="name"
            label="机构名称"
            min-width="200"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link
                class="router-link"
                :to="`/root-admin/institution-details/${scope.row.id}`"
              >{{scope.row.institution_details.name}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="institution_type"
            label="机构类型"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.institution_details.institution_type}}</template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.institution_details.address.province_name}}</template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="城市"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.institution_details.address.city_name}}</template>
          </el-table-column>
          <el-table-column
            prop="legal_person"
            label="法人"
            width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.institution_details.legal_person}}</template>
          </el-table-column>
          <el-table-column
            prop="approval_time"
            label="核准时间"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{new Date(scope.row.institution_details.approval_time*1000).toLocaleDateString()}}</template>
          </el-table-column>
          <el-table-column
            prop="registered_money"
            label="注册金额"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.institution_details.registered_money}}</template>
          </el-table-column>
          <el-table-column
            prop="contact_number"
            label="联系方式"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.institution_details.contact_number}}</template>
          </el-table-column>
          <el-table-column
            prop="business_scope"
            label="经营范围"
            min-width="200"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.institution_details.business_scope}}</template>
          </el-table-column>
          <!-- <el-table-column
            prop="status"
            label="审核状态"
            width="150"
            align="center"
            show-overflow-tooltip
          ><template slot-scope="scope">{{(scope.row.status === 2) ? '' : (!scope.row.handle) ? '等待处理' : scope.row.adopt ? '已通过' : '未通过'}}</template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="institution-statistics__pagination">
        <div class="pagination__info">共{{totalTagsCount}}条记录，共{{totalPage}}页，当前显示第{{currentPage}}页</div>
        <el-pagination
          class="pagination__container"
          background
          @current-change="handleCurrentPageChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next"
          :total="totalTagsCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddressById } from "@/api/address";
export default {
  name: "InstitutionStatistics",
  data() {
    return {
      isLoading: true,
      searchValue: "",
      totalTagsCount: 0,
      totalPage: 0,
      currentPage: 1,
      currentTableData: [],
      tableData: [],
      multipleSelection: [],
      name: "",
      province_id: "",
      city_id : "",
      provinceList: [],
      cityList: [],
    };
  },
  async mounted() {
    await this.getInstitutionList();
    await this.getProvinceList();
  },
  methods: {
    async getProvinceList() {
      const result = await getAddressById({ target: 2 });
      this.provinceList = result.address;
    },
    async getCityList(provinceId) {
      this.city_id = "";
      const result = await getAddressById({
        target: 3,
        parent: provinceId
      });
      this.cityList = result.address;
    },
    async getInstitutionList() {
      const {
        data : {institutions , total}
      } = await this.$http.get("/api/institutions/list", {
        limit: "10",
        page: this.currentPage + "",
        name: this.name,
        city: this.city_id,
        province: this.province_id,
        
      });
      console.log(institutions)
      const idList = institutions.map(item => item.id);
      const { data: institutionList } = await this.$http.post(
        "/api/institutions/_mget",
        {
          ids: idList
        }
      );
      console.log(institutionList)
      this.currentTableData = institutionList;
      this.totalTagsCount = total;
      this.totalPage = Math.ceil(total / 10);
      this.isLoading = false;
    },
    setCurrentTableData() {
      const start = (this.currentPage - 1) * 10;
      const end = this.currentPage * 10;
      this.totalPage = Math.ceil(this.tableData.length / 10);
      this.totalTagsCount = this.tableData.length;
      this.currentTableData = this.tableData.slice(start, end);
    },
    async handleCurrentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.isLoading = true;
      await this.getInstitutionList();
      this.isLoading = false;
    },
    async handleSearchChange() {
      this.isLoading = true
      await this.getInstitutionList()
      this.isLoading = false
    },
    handleClearClick() {
      this.searchValue = "";
      const start = (this.currentPage - 1) * 10;
      const end = (start + 1) * 10;
      this.currentTableData = this.tableData.slice(start, end);
    },
    excelDow() {
      import("@/vendor/Export2Excel.js").then(moudle => {
        const tHeader = [
          "机构名称",
          "省份",
          "城市",
          "注册资金",
          "注册时间",
          "申请时间",
          "机构简介",
          "审核状态"
        ];
        const filterVal = [
          "name",
          "province",
          "city",
          "register_money",
          "applyTime",
          "description",
          "status"
        ];
        const list = this.currentTableData;
        const data = this.formatJson(filterVal, list);
        moudle
          .export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename === "" ? "系统日志" : this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>

<style lang="scss" scoped>
.width {
  width: 200px;
  margin-right: 10px;
}
.institution-statistics {
  &__container {
    height: calc(100vh - 100px);
  }

  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 10px;
    background: #fff;

    margin-bottom: 20px;
    .el-button {
      padding: 11px 20px;
    }
  }

  &__wrap {
    margin-top: 20px;
    padding: 10px;
    background: #fff;

    /deep/ .router-link {
      // display: block;
      color: #606266;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #1890ff;
      }
    }
  }

  &__pagination {
    display: flex;
    height: 30px;
    margin-top: 20px;

    .pagination {
      &__info {
        color: #333;
      }

      &__container {
        margin-left: auto;
      }
    }
  }
}
</style>