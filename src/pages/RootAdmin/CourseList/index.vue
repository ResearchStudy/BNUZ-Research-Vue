<template>
  <div class="course-list__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="course-list__wrap">
      <div class="course-list__header">
        <el-button type="primary" @click="handleMultiAdoptClick(true)">批量通过</el-button>
        <el-button type="danger" @click="handleMultiAdoptClick(false)">批量不通过</el-button>
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
      <div class="course-list__table">
        <el-table
          v-loading="isLoading"
          element-loading-text="数据加载中..."
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="calc(100vh - 245px)"
        >
          <el-table-column type="selection" width="60" align="center"></el-table-column>
          <el-table-column
            prop="sub_title"
            label="课程名称"
            width="240"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link
                class="router-link"
                :to="`/root-admin/course-list/${scope.row.id}`"
              >{{scope.row.sub_title}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="institution_name"
            label="机构名称"
            width="240"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.institution_name}}</template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="课程介绍"
            min-width="200"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.description}}</template>
          </el-table-column>
          
          <el-table-column
            prop="update_time"
            label="更新时间"
            width="120"
            align="center"
            show-overflow-tooltip
          >
            <template
              slot-scope="scope"
            >{{new Date(scope.row.update_time*1000).toLocaleDateString()}}</template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleAdoptClick(scope.row.id, true)">通过</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleAdoptClick(scope.row.id, false)"
              >不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="course-list__pagination">
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
  name: "InfomationList",
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
    this.getCourseList();
  },
  methods: {
    async getCourseList() {
      const {
        data: { courses, total }
      } = await this.$http.get("/api/courses/list", {
        limit: "10",
        page: this.currentPage + "",
        status: "1",
        me: "1"
      });
      console.log(courses)
      this.currentTableData = courses;
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
    async handleAdoptClick(id, isAdopted) {
      await this.$http.post(`/api/information/${id}/examine`, {
        adopt: isAdopted,
        reply: "没有回复哦"
      });
      if ((this.totalTagsCount - 1) % 10 === 0) {
        this.currentPage -= 1;
      }
      await this.getCourseList();
      this.$message({
        type: "success",
        message: "处理成功！",
        isSingle: true
      });
    },
    async handleMultiAdoptClick(isAdopted) {
      const handleIdList = this.multipleSelection.map(
        selection => selection.id
      );
      await Promise.all(
        handleIdList.map(async id => {
          await this.$http.post(`/api/information/${id}/examine`, {
            adopt: isAdopted,
            reply: "没有回复哦",
            ids: handleIdList
          });
        })
      );
      await this.getCourseList();
      this.$message({
        type: "success",
        message: "处理成功！",
        isSingle: true
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.course-list {
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