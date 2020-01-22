<template>
  <div class="pre-entry__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/person/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程中心</el-breadcrumb-item>
      <el-breadcrumb-item>已报名课程</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="pre-entry__wrap">
      <div class="pre-entry__header">
        
        <div class="search-input" style="width:400px">
          <el-input
            placeholder="请输入要搜索的课程"
            v-model="searchValue"
            @change="handleSearchChange"
            @clear="handleClearClick"
            clearable
          ><i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <div class="pre-entry__table">
        <el-table
          v-loading="Loading"
          element-loading-text="数据加载中..."
          ref="multipleTable"
          :data="currentTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="calc(100vh - 255px)"
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
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handlePayFor(scope.row.id)"
              >售后</el-button>
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
      userId: "",
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


    handleCurrentPageChange(currentPage) {
      const start = (currentPage - 1) * 10;
      const end = (start + 1) * 10;
      this.currentPage = currentPage;
      this.currentTableData = this.tableData.slice(start, end);
    },

    handleClearClick() {
      this.searchValue = "";
      const start = (this.currentPage - 1) * 10;
      const end = (start + 1) * 10;
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
        item => item.name === this.searchValue
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