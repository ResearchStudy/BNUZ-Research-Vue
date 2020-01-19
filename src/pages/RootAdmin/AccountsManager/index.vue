<template>
  <div class="accounts-manager__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>会员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="accounts-manager__wrap">
      <div class="accounts-manager__header">
        <el-button type="primary" @click="handleAddClick">添加用户</el-button>
      </div>
      <div class="accounts-manager__table">
        <el-table
          v-loading="isLoading"
          element-loading-text="数据加载中..."
          border
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="calc(100vh - 245px)"
        >
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
            min-width="200"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{new Date(scope.row.create_time*1000).toLocaleString()}}</template>
          </el-table-column>
          <el-table-column
            prop="author"
            label="更新时间"
            min-width="200"
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
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleEditClick(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleAdoptClick(scope.row.id, false)">删除</el-button>
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
    <el-dialog title="创建用户" :visible.sync="isDialogShow" width="30%">
      <el-form
        ref="accountForm"
        :model="accountForm"
        label-position="left"
        label-width="80px"
        :rules="rules"
        label-suffix=":"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="accountForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="accountForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="accountForm.role" placeholder="请选择用户角色">
            <el-option label="学生" value="1"></el-option>
            <el-option label="家长" value="2"></el-option>
            <el-option label="机构工作人员" value="4"></el-option>
            <el-option label="机构管理员" value="8"></el-option>
            <el-option label="系统管理员" value="99"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm('accountForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ruleList from "./validate";

export default {
  name: "AccountsManager",
  data() {
    return {
      isLoading: true,
      totalTagsCount: 0,
      totalPage: 0,
      currentPage: 1,
      currentTableData: [],
      tableData: [],
      multipleSelection: [],
      isDialogShow: false,
      accountForm: {
        username: "",
        password: "",
        role: ""
      },
      rules: ruleList
    };
  },
  async mounted() {
    this.getAccountsList();
  },
  methods: {
    async getAccountsList() {
      const {
        data: { accounts, total }
      } = await this.$http.get("/api/accounts/list", {
        limit: 10,
        page: this.currentPage,
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

      this.currentTableData = accountsInfoList;
      this.totalTagsCount = total;
      this.totalPage = Math.ceil(total / 10);
      this.isLoading = false;
    },

    generateRole(role) {
      const roleList = {
        1: "学生",
        2: "家长",
        4: "机构工作人员",
        8: "机构管理员",
        99: "系统管理员"
      };
      return roleList[role] || "无";
    },

    async handleAddClick() {
      this.isDialogShow = true;
    },
    // setCurrentTableData() {
    //   const start = (this.currentPage - 1) * 10;
    //   const end = this.currentPage * 10;
    //   this.totalPage = Math.ceil(this.tableData.length / 10);
    //   this.totalTagsCount = this.tableData.length;
    //   this.currentTableData = this.tableData.slice(start, end);
    // },
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
    async handleCurrentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.isLoading = true;
      await this.getAccountsList();
      this.isLoading = false;
    },
    handleDialogClose() {
      this.isDialogShow = false;
    },
    handleDialogConfirm(accountForm) {
      this.$refs[accountForm].validate(async valid => {
        if (valid) {
          const { username, password, role } = this.accountForm;
          await this.$http.post("/api/accounts/admin/create", {
            username,
            password,
            role: parseInt(role)
          });
          if (this.totalTagsCount % 10 === 0) {
            this.totalTagsCount += 1;
            await this.handleCurrentPageChange(this.currentPage + 1);
          } else {
            await this.getAccountsList();
          }
          this.isDialogShow = false;
          this.accountForm = {
            username: "",
            password: "",
            role: ""
          };
          this.$message({
            type: "success",
            message: "添加成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "请按要求完成表格"
          });
          return false;
        }
      });
    },
    handleEditClick(id) {
      this.$router.push({ path: `/root-admin/accounts-detail/${id}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.accounts-manager {
  &__container {
    height: calc(100vh - 100px);
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
