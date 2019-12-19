<template>
  <div class="tabs-manager__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>TAG管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tabs-manager__wrap">
      <div class="tabs-manager__header">
        <el-button type="danger" @click="handleMultiDeleteTag">批量删除</el-button>
        <el-button type="primary" @click="handleAddClick">添加TAG</el-button>
      </div>
      <div class="tabs-manager__table">
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
          <el-table-column
            prop="tag"
            label="TAG名称"
            width="140"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column prop="author" label="添加者" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-button @click="handleDeleteTag(scope.row.id)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tabs-manager__pagination">
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
  name: "TabsManager",
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
    await this.getTagsList();
  },
  methods: {
    async getTagsList() {
      const {
        data: { tags }
      } = await this.$http.get("/api/tags/list");
      this.tableData = tags;
      this.setCurrentTableData();
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
          const isOverPage = (this.totalTagsCount - 1) % 10 === 0;
          isOverPage && this.handleCurrentPageChange(this.currentPage + 1);
          this.$message({
            type: "success",
            message: "添加成功！",
          });
        })
        .catch(() => {});
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
    setCurrentTableData() {
      const start = (this.currentPage - 1) * 10;
      const end = this.currentPage * 10;
      this.totalPage = Math.ceil(this.tableData.length / 10);
      this.totalTagsCount = this.tableData.length;
      this.currentTableData = this.tableData.slice(start, end);
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
        message: "删除成功！",
        isSingle: true
      });
      this.handleCurrentPageChange(this.currentPage);
    },
    async handleMultiDeleteTag() {
      const deleteIdList = this.multipleSelection.map(
        selection => selection.id
      );
      deleteIdList.forEach(async id => {
        await this.handleDeleteTag(id);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs-manager {
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