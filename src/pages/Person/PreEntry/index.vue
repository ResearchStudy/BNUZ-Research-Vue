<template>
  <div class="pre-entry__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/person/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程中心</el-breadcrumb-item>
      <el-breadcrumb-item>预报名课程</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pre-entry__wrap">
      <div class="pre-entry__header">

        <div class="search-input">

          <el-input
            placeholder="请输入要搜索的课程"
            v-model="searchValue"
            @change="handleSearchChange"
            @clear="handleClearClick"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearchClick"
            >搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="pre-entry__table">
        <el-table
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            prop="course_title"
            label="课程名字"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_description"
            label="简要介绍"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="create_time"
            label="开始时间"
            :formatter="formatDate"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
            :formatter="formatDate2"
            label="结束时间"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="handleEntry(scope.$index, scope.row)"
              >确认</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pre-entry__pagination">
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
  name: "PreEntry",
  data() {
    return {
      userId: "",
      searchValue: "",
      totalTagsCount: 0,
      totalPage: 0,
      currentPage: 0,
      currentTableData: [],
      tableData: [],
      multipleSelection: []
    };
  },
  async mounted() {
    await this.getPreEntryList();
  },
  methods: {
    async getPreEntryList() {
      this.userId = this.$store.getters.userInfo.id;
      console.log(this.userId);

      const { data: data } = await this.$http.get("/api/accounts/dashboard");
      
      const { course_pre_enroll } = data;
      this.currentTableData = course_pre_enroll;
      this.totalTagsCount = course_pre_enroll.length;
      this.totalPage = Math.ceil(course_pre_enroll.length / 10);
     
    },
    formatDate2(row) {
      let date = new Date(parseInt(row.update_time) * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      return Y + M + D;
    },
    formatDate(row) {
      let date = new Date(parseInt(row.create_time) * 1000);
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      return Y + M + D;
    },
    setCurrentTableData() {
      const start = (this.currentPage - 1) * 10;
      const end = this.currentPage * 10;
      this.totalPage = Math.ceil(this.tableData.length / 10);
      this.totalTagsCount = this.tableData.length;
      this.currentTableData = this.tableData.slice(start, end);
    },


    handleCurrentPageChange(currentPage) {
      const start = (currentPage - 1) * 10;
      const end = (start + 1) * 10;
      this.currentPage = currentPage;
      this.currentTableData = this.tableData.slice(start, end);
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
        item => item.course_title === this.searchValue
      );
      
      this.currentPage = Math.ceil(this.currentTableData.length / 10) || 1;
      this.totalPage = Math.ceil(this.currentTableData.length / 10);
      this.totalTagsCount = this.currentTableData.length;
    },
  }
};
</script>

<style lang="scss" scoped>
.pre-entry {
  &__container {
  }

  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 10px;
    background: #fff;

    .search-input {
      display: flex;
      width: 40%;
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