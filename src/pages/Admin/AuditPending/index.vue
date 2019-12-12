<template>
  <div class="audit-pending__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机构管理</el-breadcrumb-item>
      <el-breadcrumb-item>待审核机构</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="audit-pending__wrap">
      <div class="audit-pending__header">
        <el-button type="danger">批量删除</el-button>
        <el-button type="primary">添加机构</el-button>
        <div class="search-input">
          <el-button
            style="margin-right:20px;"
            type="success"
            icon="el-icon-refresh-right"
            circle
            @click="handleRefreshClick"
          />
          <el-input
            placeholder="请输入要搜索的内容"
            v-model="searchValue"
            @change="handleSearchChange"
            @clear="handleClearClick"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSearchClick">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="audit-pending__table">
        <el-table
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column
            prop="name"
            label="机构名称"
            width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="city" label="城市" width="140" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="money"
            label="注册资金"
            width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="registerTime"
            label="注册时间"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="applyTime"
            label="申请时间"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="description"
            label="机构简介"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="audit-pending__pagination">
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
export default {
  name: "AuditPending",
  data() {
    return {
      searchValue: "",
      totalTagsCount: 0,
      totalPage: 0,
      currentPage: 0,
      currentTableData: [],
      tableData: [],
      multipleSelection: []
    };
  },
  mounted() {
    this.tableData = [
      {
        id: 1,
        name: "北师珠",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 2,
        name: "北理工",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 3,
        name: "吉珠",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 4,
        name: "中大",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 5,
        name: "北师大",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 6,
        name: "北师珠",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 7,
        name: "北大",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 8,
        name: "清华",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 9,
        name: "交大",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 10,
        name: "华农",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      },
      {
        id: 11,
        name: "哈佛",
        province: "广东省",
        city: "珠海",
        money: "200w",
        registerTime: "2019-12-08",
        applyTime: "2019-12-12",
        description: "无"
      }
    ];
    this.totalPage = Math.ceil(this.tableData.length / 10);
    this.totalTagsCount = this.tableData.length;
    this.currentPage = 1;
    this.currentTableData = this.tableData.slice(0, 10);
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentPageChange(currentPage) {
      const start = (currentPage - 1) * 10;
      const end = (start + 1) * 10;
      this.currentPage = currentPage;
      this.currentTableData = this.tableData.slice(start, end);
    },
    handleSearchChange(val) {
      this.searchValue = val;
    },
    handleClearClick() {
      this.searchValue = "";
      // const start = (this.currentPage - 1) * 10;
      // const end = (start + 1) * 10;
      // this.currentTableData = this.tableData.slice(start, end);
    },
    handleRefreshClick() {
      const start = (this.currentPage - 1) * 10;
      const end = (start + 1) * 10;
      this.currentTableData = this.tableData.slice(start, end);
    },
    handleSearchClick() {
      if (this.searchValue === "") {
        this.$message({
          message: "请输入要搜索的内容",
          type: "warning",
          duration: 1500,
          showClose: true
        });
        return;
      }

      this.currentTableData = this.tableData.filter(
        item => item.name === this.searchValue
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.audit-pending {
  &__container {
  }

  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 10px;
    background: #fff;

    .search-input {
      display: flex;
      width: 50%;
      margin-left: auto;

      /deep/ .el-input-group__append {
        color: #fff;
        line-height: 39px;
        border: #409eff 1px solid;
        background: #409eff;

        &:hover {
          background: #66b1ff;
        }
      }
    }
  }

  &__wrap {
    margin-top: 20px;
    padding: 10px;
    background: #fff;
  }

  &__pagination {
    display: flex;
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