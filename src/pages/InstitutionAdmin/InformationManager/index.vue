<template>
  <div class="audit-pending-list__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/root-admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容中心</el-breadcrumb-item>
      <el-breadcrumb-item>资讯管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="information-list__wrap">
      <div class="information-list__header">
        <el-button type="primary" @click="naviateToPublish()">发布新资讯</el-button>

        <div class="search-input">
          <el-input
            placeholder="请输入要搜索的内容"
            v-model="searchValue"
            @input="handleSearchChange"
            @clear="handleClearClick"
            prefix-icon="el-icon-search"
            clearable
          />
        </div>
      </div>
      <div class="information-list__table">
        <el-table
          v-loading="isLoading"
          element-loading-text="数据加载中..."
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="calc(100vh - 255px)"
        >
          <el-table-column type="selection" width="60" align="center"></el-table-column>

          <el-table-column
            prop="title"
            label="标题"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link
                class="router-link"
                :to="`/institution-admin/information-list/${scope.row.id}`"
              >{{scope.row.title}}</router-link>
            </template>
          </el-table-column>

          <el-table-column
            prop="author"
            label="发布者"
            width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.author_name}}</template>
          </el-table-column>

          <el-table-column
            prop="updateTime"
            label="更新时间"
            width="100"
            align="center"
            show-overflow-tooltip
          >
            <template
              slot-scope="scope"
            >{{new Date(scope.row.update_time*1000).toLocaleDateString()}}</template>
          </el-table-column>

          <el-table-column
            prop="status"
            label="状态"
            width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{generateStatus(scope.row.status)}}</template>
          </el-table-column>
          <el-table-column prop="abstract" label="摘要" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.abstract}}</template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                :disabled="!(scope.row.status===16 || scope.row.status===4)"
                size="mini"
                type="primary"
                @click="handleUpdateClick(scope.row.id)"
              >编辑</el-button>
              <el-popover
                placement="top"
                width="160"
                trigger="click"
                :ref="`popover-${scope.$index}`"
              >
                <p>确认删除该课程吗？</p>
                <div style="text-align: right; margin: 0;">
                  <el-button size="mini" type="text" @click="closePopover(scope.$index)">取消</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleDeleteInformation(scope.row.id,scope.$index)"
                  >确定</el-button>
                </div>
                <el-button
                  :disabled="scope.row.status===1"
                  slot="reference"
                  size="mini"
                  type="danger"
                >删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="information-list__pagination">
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
  name: "InformationList",
  data() {
    return {
      isLoading: true,
      searchValue: "",
      totalTagsCount: 0,
      totalPage: 0,
      currentPage: 1,
      currentTableData: [],
      tableData: [],
      multipleSelection: []
    };
  },
  async mounted() {
    this.getInformationList();
  },
  methods: {
    async getInformationList() {
      const {
        data: { informations, total }
      } = await this.$http.get("/api/information/list", {
        limit: "10",
        page: this.currentPage + "",
        me: "1"
      });

      this.currentTableData = informations;
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    generateStatus(status) {
      const statusList = {
        1: "待审核",
        2: "已发布",
        4: "驳回",
        8: "下架",
        16: "草稿"
      };
      return statusList[status] || "无";
    },

    naviateToPublish() {
      this.$router.push({ path: "/institution-admin/publishInformation" });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async handleCurrentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.isLoading = true;
      await this.getInformationList();
      this.isLoading = false;
    },
    handleSearchChange(val) {
      this.searchValue = val;
      if (this.searchValue === "") {
        const start = (this.currentPage - 1) * 10;
        const end = (start + 1) * 10;
        this.currentTableData = this.tableData.slice(start, end);
        this.totalPage = Math.ceil(this.tableData.length / 10);
        this.totalTagsCount = this.tableData.length;
        return;
      }

      this.currentTableData = this.tableData.filter(
        item => item.name === this.searchValue
      );
      this.currentPage = Math.ceil(this.currentTableData.length / 10) || 1;
      this.totalPage = Math.ceil(this.currentTableData.length / 10);
      this.totalTagsCount = this.currentTableData.length;
    },
    handleClearClick() {
      this.searchValue = "";
      const start = (this.currentPage - 1) * 10;
      const end = (start + 1) * 10;
      this.currentTableData = this.tableData.slice(start, end);
    },
    async handleUpdateClick(id) {
      this.$router.push({
        path: "/institution-admin/information-update/" + id
      });
    },

    async handleDeleteInformation(id, index) {
      this.closePopover(index);
      await this.$http.delete(`/api/information/${id}`);
      await this.getInformationList();
      this.$message({
        type: "success",
        message: "删除成功！",
        isSingle: true
      });
      this.handleCurrentPageChange(this.currentPage);
    },
    closePopover(index) {
      this.$refs[`popover-${index}`].doClose();
    }
  }
};
</script>

<style lang="scss" scoped>
.information-list {
  &__container {
    height: calc(100vh - 100px);
  }

  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 10px;
    background: #fff;

    .search-input {
      width: 50%;
      margin-left: auto;
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