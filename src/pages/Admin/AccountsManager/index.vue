<template>
  <div class="accounts-manager__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>会员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="accounts-manager__wrap">
      <div class="accounts-manager__header">
        <el-button type="danger">批量删除</el-button>
        <el-button type="primary" @click="handleAddClick">添加用户</el-button>
      </div>
      <div class="accounts-manager__table">
        <el-table
          border
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column prop="id" label="ID" width="140" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column prop="tag" label="昵称" width="140" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.nickname}}</template>
          </el-table-column>
          <el-table-column prop="tag" label="角色" width="140" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{generateRole(scope.row.role)}}</template>
          </el-table-column>
          <el-table-column prop="tag" label="邮箱" width="140" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.email || '无'}}</template>
          </el-table-column>
          <el-table-column prop="tag" label="电话" width="140" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.phone || '无'}}</template>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="创建时间"
            min-width="180"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{new Date(scope.row.create_time*1000).toLocaleString()}}</template>
          </el-table-column>
          <el-table-column
            prop="author"
            label="更新时间"
            min-width="180"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{new Date(scope.row.update_time*1000).toLocaleString()}}</template>
          </el-table-column>
          <el-table-column prop="tag" label="邮箱验证" width="140" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.email_validated ?'已验证':'未验证'}}</template>
          </el-table-column>
          <el-table-column prop="tag" label="电话验证" width="140" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.phone_validated ?'已验证':'未验证'}}</template>
          </el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-button @click="handleDeleteTag(scope.row.id)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="accounts-manager__pagination">
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
  name: "AccountsManager",
  data() {
    return {
      totalTagsCount: 0,
      totalPage: 0,
      currentPage: 1,
      currentTableData: [],
      tableData: [],
      multipleSelection: []
    };
  },
  async mounted() {
    await this.handleLogin();
    await this.getAccountsList();
  },
  methods: {
    async handleLogin() {
      const data = await this.$http.post("/api/accounts/login/common", {
        key: "bb",
        password: "123",
        remember: true
      });
      console.log(data);
    },
    async getAccountsList() {
      const {
        data: { accounts }
      } = await this.$http.get("/api/accounts/list", {
        limit: 10,
        page: 1,
        key: "",
        id_code: ""
      });
      const idList = accounts.map(account => account.id);
      const { data: accountsInfoList } = await this.$http.post(
        "/api/accounts/_mget",
        {
          ids: idList
        }
      );

      this.tableData = accountsInfoList;
      this.totalPage = Math.ceil(this.tableData.length / 10);
      this.totalTagsCount = this.tableData.length;
      this.currentTableData = this.tableData.slice(0, 10);
    },
    generateRole(role) {
      const roleList = {
        1: "学生",
        2: "家长",
        4: "机构工作人员",
        8: "机构管理员",
        99: "系统管理员"
      };
      return roleList[role];
    },
    async handleAddClick() {
      this.$prompt("请输入标签名", "创建标签", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputErrorMessage: "请输入标签名！"
      })
        .then(async ({ value }) => {
          await this.$http.post("/api/tags", {
            name: value
          });
          await this.getTagsList();
          this.setCurrentTableData();
          this.$message({
            type: "success",
            message: "添加成功！"
          });
        })
        .catch(() => {});
    },
    setCurrentTableData() {
      const start = (this.currentPage - 1) * 10;
      const end = this.currentPage * 10;

      this.totalPage = Math.ceil(this.tableData.length / 10);
      this.totalTagsCount = this.tableData.length;
      this.currentTableData = this.tableData.slice(start, end);
    },
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
      this.currentPage = currentPage;
      this.setCurrentTableData();
    },
    async handleDeleteTag(id) {
      await this.$http.delete(`/api/tags/${id}`);
      await this.getTagsList();
      this.$message({
        type: "success",
        message: "删除成功！"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.accounts-manager {
  &__container {
  }

  &__wrap {
    margin-top: 20px;
    padding: 10px;
    background: #fff;
  }

  &__header {
    width: 100%;
    padding-bottom: 10px;
    background: #fff;
  }

  &__table {
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
