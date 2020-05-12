 <template>
  <div class="course-statistics__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/root-admin/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计中心</el-breadcrumb-item>
      <el-breadcrumb-item>课程统计</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="course-statistics__wrap">
      <div class="course-statistics__header">
        <el-input
          type="text"
          placeholder="请输入搜索内容"
          class="width"
          v-model="title"
        ></el-input>
        <el-select
          v-model="status"
          clearable
          class="width"
          placeholder="请选择课程状态"
        >
          <el-option
            v-for="item in statusOptions"
            :label="item.label"
            :value="item.key"
            :key="item.key"
          ></el-option>
        </el-select>
        <el-select
          v-model="type"
          clearable
          class="width"
          placeholder="请选择课程类型"
        >
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.key"
            :key="item.key"
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
      <div class="course-statistics__table">
        <el-table
          v-loading="isLoading"
          element-loading-text="数据加载中..."
          ref="multipleTable"
          :data="currentTableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          height="calc(100vh - 255px)"
        >
          <el-table-column
            prop="id"
            label="课程Id"
            width="80"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>

          <el-table-column
            prop="sub_title"
            label="课程名称"
            min-width="200"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link
                class="router-link"
                :to="`/courses/${scope.row.id}`"
              >{{scope.row.sub_title}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="course_type"
            label="课程类型"
            width="120"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{TypeOfCourse(scope.row.course_type)}}</template>
          </el-table-column>
          <el-table-column
            prop="institution_name"
            label="所属机构"
            min-width="120"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.institution_id}}</template>
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
          <!-- <el-table-column
            prop="status"
            label="课程状态"
            min-width="120"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{StatusOfCourse(scope.row.status)}}</template>
          </el-table-column> -->
           <el-table-column
            prop="price"
            label="价格"
            width="120"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.price}}</template>
          </el-table-column>
           <el-table-column
            prop="suitable_for_crowd"
            label="适合人群"
            width="120"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.suitable_for_crowd}}</template>
          </el-table-column>
           <el-table-column
            prop="travel_days"
            label="形程天数"
            width="120"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.travel_days}}</template>
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="开始时间"
            width="120"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{new Date(scope.row.start_time*1000).toLocaleDateString()}}</template>
          </el-table-column>
          <!-- <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-popover
                placement="top"
                width="160"
                trigger="click"
                :ref="`popover-${scope.$index}`"
              >
                <p>确认删除该标签吗？</p>
                <div style="text-align: right; margin: 0;">
                  <el-button size="mini" type="text" @click="closePopover(scope.$index)">取消</el-button>
                  <el-button
                    @click="handleDeleteCourse(scope.row.id,scope.$index)"
                    type="text"
                    size="small"
                  >确定</el-button>
                </div>
                <el-button slot="reference" size="mini" type="danger">删除</el-button>
              </el-popover>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="course-statistics__pagination">
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
      title: "",
      status: "",
      multipleSelection: [],
      type: "",
      options: [
        { key: 1, label: "知识科普型" },
        { key: 2, label: "自然观赏型" },
        { key: 4, label: "体验考察型" },
        { key: 8, label: "励志拓展型" },
        { key: 16, label: "文化康乐型" }
      ],
      statusOptions: [
        { key: 1, label: "未开始" },
        { key: 2, label: "进行中" },
        { key: 3, label: "已结束" }
      ],
      Type : ["知识科普型" , "自然观赏型" , "体验考察型" , "励志拓展型" , "文化康乐型"],
      Status : ["未开始" , "进行中" , "已结束"],
    };
  },

  async mounted() {
    this.getCourseList();
  },
  methods: {
    TypeOfCourse(val){
        if(val <= 2){
            return this.Type[val - 1]
        }
        if(val === 4){
          return this.Type[2]
        }
        if(val === 8){
          return this.Type[3]
        }
        return this.Type[4]
    },
    StatusOfCourse(val){
        if(val){
            return this.Status[val - 1]
        }
        return ""
    },
    async getCourseList() {
      const {
        data: { courses, total }
      } = await this.$http.get("/api/courses/list", {
        limit: "10",
        page: this.currentPage + "",
        course_type: this.type,
        status: this.status,
        title: this.title,
        me: "1",
      });
      
      const ids = courses.map(item => item.id);
    //   console.log(ids);
      const {data : courseList} = await this.$http.post("/api/courses/_mget", { ids });
      console.log(courseList)
      this.currentTableData = courseList;
      console.log(this.currentTableData)
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
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    async handleCurrentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.isLoading = true;
      await this.getCourseList();
      this.isLoading = false;
    },
    async handleSearchChange() {
      this.isLoading = true;
      await this.getCourseList();
      this.isLoading = false;
    },
    handleClearClick() {
      this.searchValue = "";
      const start = (this.currentPage - 1) * 10;
      const end = (start + 1) * 10;
      this.currentTableData = this.tableData.slice(start, end);
    },
    closePopover(index) {
      this.$refs[`popover-${index}`].doClose();
    },

    //原接口(/api/courses/${id}/examine)
    async handleDeleteCourse(id, index) {
      this.closePopover(index);
      await this.$http.delete(`/api/courses/${id}`);
      await this.getCourseList();
      this.$message({
        type: "success",
        message: "删除成功！",
        isSingle: true
      });
      this.handleCurrentPageChange(this.currentPage);
    },
    excelDow() {
      import("@/vendor/Export2Excel.js").then(moudle => {
        const tHeader = [
          "课程ID",
          "课程名称",
          "课程类型",
          "所属机构",
          "课程介绍",
          "课程状态",
          "更新时间",
        ];
        const filterVal = [
          "id",
          "sub_title",
          "course_type",
          "institution_name",
          "description",
          "status",
          "update_time"
        ];
        const list = this.currentTableData;
        const data = this.formatJson(filterVal, list);
        moudle
          .export_json_to_excel({
            header: tHeader,
            data,
            filename: this.course_type === "" ? "课程统计" : this.filename,
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
    // async handleMultiAdoptClick(isAdopted) {
    //   const handleIdList = this.multipleSelection.map(
    //     selection => selection.id
    //   );
    //   await Promise.all(
    //     handleIdList.map(async id => {
    //       await this.$http.post(`/api/information/${id}/examine`, {
    //         adopt: isAdopted,
    //         reply: "没有回复哦",
    //         ids: handleIdList
    //       });
    //     })
    //   );
    //   await this.getCourseList();
    //   this.$message({
    //     type: "success",
    //     message: "处理成功！",
    //     isSingle: true
    //   });
    // }
  }
};
</script>

<style lang="scss" scoped>
.width {
  width: 200px;
  margin-right: 10px;
}
.course-statistics {
  &__container {
    height: calc(100vh - 100px);
  }

  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 10px;
    background: #fff;

    margin-bottom: 10px;
    .el-button {
      padding: 11px 20px;
    }
  }

  &__wrap {
    margin-top: 10px;
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