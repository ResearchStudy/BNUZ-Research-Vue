<template>
  <div class="tabs-manager__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>TAG管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tabs-manager__wrap">
      <div class="tabs-manager__header">
        <el-button type="danger">批量删除</el-button>
        <el-button type="primary">添加TAG</el-button>
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
          <el-table-column prop="id" label="ID" width="140" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="tag"
            label="TAG名称"
            width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="docs" label="文档数" width="140" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="time" label="添加时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >移除</el-button>
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
      currentPage: 0,
      currentTableData: [],
      tableData: [
        {
          id: "1",
          tag: "艺术",
          docs: "0",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "2",
          tag: "自然",
          docs: "11",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "3",
          tag: "历史",
          docs: "2",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "4",
          tag: "华中",
          docs: "3",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "5",
          tag: "华北",
          docs: "8",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "6",
          tag: "东北",
          docs: "21",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "7",
          tag: "国际",
          docs: "9",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "8",
          tag: "国内",
          docs: "45",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "9",
          tag: "政策",
          docs: "1",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "10",
          tag: "文化",
          docs: "0",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "11",
          tag: "语文",
          docs: "6",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "12",
          tag: "数学",
          docs: "23",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "13",
          tag: "政治",
          docs: "76",
          time: "2019-12-11 20:03:53"
        },
        {
          id: "14",
          tag: "生物",
          docs: "14",
          time: "2019-12-11 20:03:53"
        }
      ],
      multipleSelection: []
    };
  },
  mounted() {
    this.totalPage = Math.ceil(this.tableData.length / 10);
    this.totalTagsCount = this.tableData.length;
    this.currentPage = 1;
    this.currentTableData = this.tableData.slice(0, 10);
  },
  methods: {
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
    handleCurrentPageChange(currentPage) {
      const start = (currentPage - 1) * 10;
      const end = (start + 1) * 10;

      this.currentPage = currentPage;
      this.currentTableData = this.tableData.slice(start, end);
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