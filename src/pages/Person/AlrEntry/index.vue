<template>
  <div class="alr-entry__container">
    <el-breadcrumb separator-class="el-icon-arrow-right"
    style="margin-top:2px">
      <el-breadcrumb-item :to="{ path: '/person/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程中心</el-breadcrumb-item>
      <el-breadcrumb-item>已报名课程</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="alr-entry__wrap">
      <div class="alr-entry_header">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-button type="primary" size="medium">
              {{custom}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="is_pay">已付款</el-dropdown-item>
            <el-dropdown-item command="is_not_pay">未付款</el-dropdown-item>
            <el-dropdown-item command="is_refund">已退款</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="alr-entry__table">
        <el-table
          v-loading="Loading"
          element-loading-text="数据加载中..."
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="calc(100vh - 200px)"
        >
          <el-table-column
            prop="course_title"
            label="课程名字"
            min-width="200"
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
            width="200"
            align="center"
            show-overflow-tooltip
          ><template slot-scope="scope">{{new Date(scope.row.create_time*1000).toLocaleString()}}</template>
          </el-table-column>
          <el-table-column
            prop="update_time"
            label="结束时间"
            width="200"
            align="center"
            show-overflow-tooltip
          ><template slot-scope="scope">{{new Date(scope.row.update_time*1000).toLocaleString()}}</template>
          </el-table-column>
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
                size="mini"
                type="primary"
                @click="handleView(scope.row.id)"
              >查看</el-button>
              <el-popover
                placement="top"
                width="160"
                trigger="click"
                :ref="`popover-${scope.$index}`"
              >
                <p>确认删除该课程吗？</p>
                <div style="text-align: right; margin: 0;">
                  <el-button
                    size="mini"
                    type="text"
                    @click="closePopover(scope.$index)"
                  >取消</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleDeleteCourse(scope.row.id,scope.$index)"
                  >确定</el-button>
                </div>
                <el-button
                  slot="reference"
                  :disabled="scope.row.start_time< new Date().getTime()/1000"
                  size="mini"
                  type="danger"
                >删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="alr-entry__pagination">
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
      custom: "",
      userId: "",
      Loading: true,
      searchValue: "",
      totalTagsCount: 0,
      totalPage: 0,
      currentPage: 0,
      currentTableData: [],
      tableData: [],
      is_pay : {},
      is_not_pay : {},
      is_refund : {},
      multipleSelection: []
    };
  },
  async mounted() {
    await this.getPreEntryList();
  },
  methods: {
    async getPreEntryList() {
      this.userId = this.$store.getters.userInfo.id;
      const { data: data } = await this.$http.get("/api/accounts/dashboard");
      const { course_enroll } = data;
      const { is_pay, is_not_pay, is_refund } = course_enroll;
      console.log(course_enroll)
      this.is_pay = is_pay;
      this.is_not_pay = is_not_pay;
      this.is_refund = is_refund;
      this.currentTableData = is_pay;
      this.totalTagsCount = is_pay.length;
      this.totalPage = Math.ceil(is_pay.length / 10);
      this.custom = "已付款"
      this.Loading = false;
    },
    generate(command){
      const List = {
        is_not_pay: "未付款",
        is_pay: "已付款",
        is_refund: "已退款",
      };
      return List[command];
    },
    handleCommand(command){
      this.custom = this.generate(command)
      if(command === "is_pay"){
        this.currentTableData = this.is_pay;
      }
      else if(command === "is_not_pay"){
        this.currentTableData = this.is_not_pay;
      }
      else{
        this.currentTableData = this.is_refund;
      }
      this.totalTagsCount = this.currentTableData.length;
      this.totalPage = Math.ceil(this.totalTagsCount / 10);
      this.Loading = false;
    },
    handleView(){

    },
    setCurrentTableData() {
      const start = (this.currentPage - 1) * 10;
      const end = this.currentPage * 10;
      this.totalPage = Math.ceil(this.tableData.length / 10);
      this.totalTagsCount = this.tableData.length;
      this.currentTableData = this.tableData.slice(start, end);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    async handleDeleteCourse(id, index) {
      this.closePopover(index);
      await this.getPreEntryList();
      this.$message({
        type: "success",
        message: "删除成功！",
        isSingle: true
      });
      this.handleCurrentPageChange(this.currentPage);
    },
    async handleCurrentPageChange(currentPage) {
      this.currentPage = currentPage;
      this.Loading = true;
      await this.getPreEntryList();
      this.Loading = false;
    },

    closePopover(index) {
      this.$refs[`popover-${index}`].doClose();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size:14px!important
}

.alr-entry {
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