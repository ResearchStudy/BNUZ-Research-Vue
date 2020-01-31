<template>
  <div class="settled__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/person/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号中心</el-breadcrumb-item>
      <el-breadcrumb-item>入驻审核</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="settled__wrap">
      <div class="settled__header">

        <div
          class="search-input"
          style="width:400px"
        >

          <el-input
            placeholder="请输入要搜索的入驻"
            v-model="searchValue"
            @change="handleSearchChange"
            @clear="handleClearClick"
            clearable
          ><i
              slot="prefix"
              class="el-input__icon el-icon-search"
            ></i>
          </el-input>
        </div>
      </div>
      <div class="settled__table">
        <el-table
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="calc(100vh - 255px)"
        >
          <el-table-column
            prop="type"
            label="id"
            width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column
            prop="institution_details.name"
            label="机构名称"
            width="200"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link
                class="router-link"
                :to="`/person/settled/${scope.row.id}`"
              >{{scope.row.institution_details.name}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="institution_details.institution_type"
            label="机构类型"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="create_time"
            label="创建时间"
            width="200"
            align="center"
            show-overflow-tooltip
          ><template slot-scope="scope">{{new Date(scope.row.create_time*1000).toLocaleString()}}</template>
          </el-table-column>
          <el-table-column
            prop="adpot"
            label="审核状态"
            width="200"
            align="center"
            show-overflow-tooltip
          ><template slot-scope="scope">{{scope.row.status === 1 ? '已提交':'暂存'}}</template>
          </el-table-column>
          <el-table-column
            prop="institution_details.registered_money"
            label="入驻金额"
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
                @click="handleEdit(scope.row.id)"
              >编辑</el-button>
              <el-popover
                placement="top"
                width="160"
                trigger="click"
                :ref="`popover-${scope.$index}`"
              >
                <p>确认删除该申请吗？</p>
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
      <div class="settled__pagination">
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
      Loading: true,
      searchValue: "",
      totalTagsCount: 0,
      totalPage: 0,
      currentPage: 0,
      currentTableData: [],
      tableData: [],
      multipleSelection: [],
      status:1,
    };
  },
  async mounted() {
    await this.getSettledList();
  },
  methods: {
    async getSettledList() {
      const {
        data: { enrolls, total }
      } = await this.$http.get("/api/institutions/enroll/list", {
        limit: "10",
        page: this.currentPage + "",
        handle: "",
        adpot: "",
        name: ""
      });
      console.log(enrolls)
      const idList = enrolls.map(enroll => enroll.id);
      const { data: settledList } = await this.$http.post(
        "/api/institutions/enroll/_mget",
        {
          ids: idList
        }
      );
      console.log(settledList);
      this.currentTableData = settledList;
      this.totalTagsCount = total;
      this.totalPage = Math.ceil(total / 10);
      this.Loading = false;
    },
    async handleEdit(id) {
       this.$router.push({
        path: "/person/settled-modifty/" + id
      });       
    },
    setCurrentTableData() {
      const start = (this.currentPage - 1) * 10;
      const end = this.currentPage * 10;
      this.totalPage = Math.ceil(this.tableData.length / 10);
      this.totalTagsCount = this.tableData.length;
      this.currentTableData = this.tableData.slice(start, end);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.settled {
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