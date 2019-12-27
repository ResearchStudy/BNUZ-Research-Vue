<template>
  <div class="audit-pending-list__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容中心</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="information-list__wrap">
      <div class="information-list__header">


        <el-button type="primary" @click="naviateToPublish()">发布新课程</el-button>

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
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
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
                :to="`/courses/${scope.row.id}`"
              >{{scope.row.title}}</router-link>
            </template>
          </el-table-column>


          <el-table-column prop="type" label="类型"  width="100" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.course_type}}</template>
          </el-table-column>

          <el-table-column prop="travelDays" label="行程天数" width="100" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.travel_days}}</template>
          </el-table-column>

          <el-table-column
            prop="suitableForCrowd"
            label="适合人群"
            width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.suitable_for_crowd}}</template>


          </el-table-column>
          <el-table-column prop="desc" label="课程描述" align="center" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{scope.row.description}}</template>
          </el-table-column>


          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleAdoptClick(scope.row.id, true)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteCourse(scope.row.id)"
              >删除</el-button>
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
  name: "CourseList",
  data() {
    return {
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
    await this.getCourseList();
  },
  methods: {
    async getCourseList() {
      const {
        data: { courses, total }
      } = await this.$http.get("/api/courses/list", {
        limit: "10",
        page: this.currentPage + "",
        title:"",
        attribute:"",
        status:"",
        course_type: ""
      });


      const idList = courses.map(infors => infors.id);

      const { data: courseList } = await this.$http.post(
        "/api/courses/_mget",
        {
          ids: idList
        }
      );

      this.currentTableData = courseList;
      this.totalTagsCount = total;
      this.totalPage = Math.ceil(total / 10);
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

    async handleDeleteCourse(id) {
      await this.$http.delete(`/api/courses/${id}`);
      await this.getCourseList();
      this.$message({
        type: "success",
        message: "删除成功！",
        isSingle: true
      });
      this.handleCurrentPageChange(this.currentPage);
    },


    naviateToPublish(){
      this.$router.push({path: '/courses/form'})
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async handleCurrentPageChange(currentPage) {
      this.currentPage = currentPage;
      await this.getCourseList();
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
      await this.$http.post(`/api/institutions/enroll/handle/${id}`, {
        adopt: isAdopted,
        reply: "没有回复哦"
      });
      if ((this.totalTagsCount - 1) % 10 === 0) {
        this.currentPage -= 1;
      }
      await this.getAuditPendingList();
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

      await this.$http.post("/api/institutions/enroll/handle/_mpost", {
        adopt: isAdopted,
        reply: "没有回复哦",
        ids: handleIdList
      });
      await this.getAuditPendingList();
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
.information-list {
  &__container {
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