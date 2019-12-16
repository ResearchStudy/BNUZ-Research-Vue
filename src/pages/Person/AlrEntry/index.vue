<template>
  <div class="pre-entry__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/person/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程中心</el-breadcrumb-item>
      <el-breadcrumb-item>已报名课程</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pre-entry__wrap">
      <div class="pre-entry__header">
        
        <div class="search-input">
          <el-button
            style="margin-right:20px;"
            type="success"
            icon="el-icon-refresh-right"
            circle
            @click="handleRefreshClick"
          />
          <el-input
            placeholder="请输入要搜索的课程"
            v-model="searchValue"
            @change="handleSearchChange"
            @clear="handleClearClick"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSearchClick">搜索</el-button>
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
            prop="name"
            label="课程名字"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="introduction"
            label="简要介绍"
            width="220"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
        
          <el-table-column
            prop="StartTime"
            label="开始时间"
            width="200"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="EndTime"
            label="结束事件"
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
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEntry(scope.$index, scope.row)">退款</el-button>
              <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  name: "AlrEntry",
  data() {
    return {
      searchValue: "",
      totalTagsCount: 0,
      totalPage: 0,
      currentPage: 0,
      currentTableData: [],
      tableData: [],
      multipleSelection: []
    };
  },
  mounted() {
    this.tableData = [
      {
        id: 1,
        name: "北师珠",
        introduction: "这是一个很长的介绍，一点都不简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 2,
        name: "北理工",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 3,
        name: "吉珠",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 4,
        name: "中大",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 5,
        name: "北师大",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 6,
        name: "北师珠",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 7,
        name: "北大",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 8,
        name: "清华",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 9,
        name: "交大",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 10,
        name: "华农",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      },
      {
        id: 11,
        name: "哈佛",
        introduction: "这是一个很长的介绍，一点都简短",
        StartTime: "2019-12-14",
        EndTime: "2019-12-14",
        price: "10000",
      }
    ];
    this.totalPage = Math.ceil(this.tableData.length / 10);
    this.totalTagsCount = this.tableData.length;
    this.currentPage = 1;
    this.currentTableData = this.tableData.slice(0, 10);
  },
  methods: {

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
    // handleEntry(index,rows){
    //     alert(rows.index.name);
    // },
    // handleDelete(index,rows){

    // },
    handleCurrentPageChange(currentPage) {
      const start = (currentPage - 1) * 10;
      const end = (start + 1) * 10;
      this.currentPage = currentPage;
      this.currentTableData = this.tableData.slice(start, end);
    },
    handleSearchChange(val) {
      this.searchValue = val;
    },
    handleClearClick() {
      this.searchValue = "";
      // const start = (this.currentPage - 1) * 10;
      // const end = (start + 1) * 10;
      // this.currentTableData = this.tableData.slice(start, end);
    },
    handleRefreshClick() {
      const start = (this.currentPage - 1) * 10;
      const end = (start + 1) * 10;
      this.currentTableData = this.tableData.slice(start, end);
    },
    handleSearchClick() {
      if (this.searchValue === "") {
        this.$message({
          message: "请输入要搜索的课程",
          type: "warning",
          duration: 1500,
          showClose: true
        });
        return;
      }

      this.currentTableData = this.tableData.filter(
        item => item.name.search(this.searchValue) != -1
      );
    }
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
      width: 50%;
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