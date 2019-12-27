<template>
  <div class="audit-pending-list__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
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
                :to="`/insitution-admin/information-list/${scope.row.id}`"
              >{{scope.row.title}}</router-link>
            </template>
          </el-table-column>


          <el-table-column prop="author" label="发布者"  width="100" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.author_name}}</template>
          </el-table-column>

          <el-table-column prop="updateTime" label="更新时间" width="100" align="center" show-overflow-tooltip>
            <template slot-scope="scope">{{new Date(scope.row.update_time*1000).toLocaleDateString()}}</template>
          </el-table-column>

          <el-table-column
            prop="status"
            label="状态"
            width="60"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.status}}</template>


          </el-table-column>
          <el-table-column prop="abstract" label="摘要" align="center" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{scope.row.abstract}}</template>
          </el-table-column>


          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="handleUpdateClick(scope.row.id)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteInformation(scope.row.id)"
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
  name: "InformationList",
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
    await this.getInformationList();
  },
  methods: {
    async getInformationList() {
      const {
        data: { informations, total }
      } = await this.$http.get("/api/information/list", {
        limit: "10",
        page: this.currentPage + "",
        title:"",
        attribute:"",
        status:"",
        information_type: ""
      });


      const idList = informations.map(infors => infors.id);

      const { data: informationList } = await this.$http.post(
        "/api/information/_mget",
        {
          ids: idList
        }
      );

      this.currentTableData = informationList;
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

    naviateToPublish(){
      this.$router.push({path: '/insitution-admin/publishInformation'})
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async handleCurrentPageChange(currentPage) {
      this.currentPage = currentPage;
      await this.getAuditPendingList();
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
      this.$router.push({path: '/insitution-admin/information-update/'+id})


    },

    async handleDeleteInformation(id) {
      await this.$http.delete(`/api/information/${id}`);
      await this.getInformationList();
      this.$message({
        type: "success",
        message: "删除成功！",
        isSingle: true
      });
      this.handleCurrentPageChange(this.currentPage);
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