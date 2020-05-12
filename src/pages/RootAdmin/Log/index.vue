<template>
  <div class="system-log__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/root-admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>系统日志</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="system-log__wrap">
      <div class="system-log__header">
        <el-input
          type="text"
          placeholder="请输入操作者"
          class="width"
          v-model="name"
        ></el-input>
        <el-select
          v-model="type"
          clearable
          class="width"
          placeholder="请选择日志类型"
        >
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.key"
            :key="item.key"
          ></el-option>
        </el-select>
        <!-- <el-date-picker
          class="width"
          v-model="sch_date"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker> -->
        <el-button type="primary" icon="el-icon-search" @click="handleSearchChange()"
          >搜索</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="excelDow"
          >导出</el-button
        >        
      </div>
      <div class="system-log__table">
        <el-table
          v-loading="isLoading"
          element-loading-text="数据加载中..."
          border
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="calc(100vh - 250px)"
        >
          <el-table-column prop="handle_name" label="操作者" width="160" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.handle_name}}</template>
          </el-table-column>
          <el-table-column prop="role" label="操作角色" width="160" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{generateRole(scope.row.role)}}</template>
          </el-table-column>
          <el-table-column prop="log_type" label="日志类型" width="160" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{generateType(scope.row.log_type)}}</template>
          </el-table-column>
          <el-table-column prop="log_title" label="日志标题" width="160" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.log_title || '-'}}</template>
          </el-table-column>
          <el-table-column prop="ip" label="IP地址" min-width="200" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.ip || '-'}}</template>
          </el-table-column>
          <el-table-column
            prop="handle_time"
            label="操作时间"
            min-width="200"
            align="center"
            show-overflow-tooltip
          >
          <template slot-scope="scope">{{scope.row.handle_time}}</template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <!-- <el-button size="mini" type="primary" @click="handleEditClick(scope.row.id)">编辑</el-button> -->
              <el-button size="mini" type="danger" @click="handleDeleteClick(scope.$index,scope.row.log_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="system-log__pagination">
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
    <!-- <el-dialog title="创建用户" :visible.sync="isDialogShow" width="30%">
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
    </el-dialog> -->
  </div>
</template>

<script>


export default {
  name: "SystemLog",
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
      name : '',
      type : '',
      source : '',
      options: [
        { label: '用户登录', key: 1 },
        { label: '用户登出', key: 0 },
        { label: '功能操作', key: 2 },
      ],
    };
  },
  async mounted() {
    this.getLogList();
  },
  methods: {
    async getLogList() {
      const {data} = await this.$http.get("/api/log/list",{
            limit: "10",
            page: this.currentPage + "",
            name : this.name,
            type : this.type
      })
      this.currentTableData = data.LogList;
      this.totalTagsCount = data.total;
      this.totalPage = Math.ceil(this.totalTagsCount / 10);
      this.isLoading = false;
    },

    generateType(type) {
      const handleList = {
        1: "用户登入",
        2: "功能操作",
        0: "用户登出"
      };
      return handleList[type] || "-";
    },
    generateRole(role) {
      const handleList = {
        1: "普通用户",
        16: "机构管理员",
        99: "系统管理员"
      };
      return handleList[role] || "-";
    },
    async handleDeleteClick(id){
      await this.$http.post('/api/log/delete/' + id);
      this.isLoading = true;
      await this.getLogList();
      this.isLoading = false;
    },
    async handleSearchChange(){
      console.log(this.type)
      this.isLoading = true;
      await this.getLogList();
      this.isLoading = false;
    },
    async handleAddClick() {
      this.isDialogShow = true;
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
      await this.getLogList();
      this.isLoading = false;
    },
    handleDialogClose() {
      this.isDialogShow = false;
    },
    excelDow() {
      import('@/vendor/Export2Excel.js').then(moudle => {
        const tHeader = ['序号', '操作者','操作类型', '日志类型', '日志标题', 'IP地址', '操作时间']
        const filterVal = ['log_id', 'handle_name','role', 'log_type', 'log_title', 'ip', 'handle_time']
        const list = this.currentTableData
        const data = this.formatJson(filterVal, list)
        moudle.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename === '' ? '系统日志' : this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        }).catch(err => {
            console.log(err);
        });
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
};
</script>

<style lang="scss" scoped>
.width {
  width: 200px;
  margin-right: 10px;
}
.system-log {
  &__container {
    height: calc(100vh - 100px);
  }

  &__wrap {
    margin-top: 10px;
    padding: 10px;
    background: #fff;
  }

  &__header {
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 20px;
    .el-button {
    padding: 11px 20px;
  }
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