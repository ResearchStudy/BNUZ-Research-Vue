<template>
  <div class="information__container">
    <div class="search-group">
      <el-input placeholder="请输入内容" v-model="title" style="width: 80%;padding-right: 10px"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 10px" @click="search">搜索</el-button>
    </div>
    <div>
      <div
        v-for="information in informationList"
        :key="information.id"
        style="cursor: pointer"
        @click="navigateToInformation(information.id)"
      >
        <div class="information__wrap">
          <div class="cover__container">
            <div
              class="cover"
              :style="`background-image:url(${information.cover})`"
              v-if="information.cover.length !== 0"
            />
            <div class="cover cover--default" src="../../assets/img/default-news.jpg" v-else />
          </div>

          <div style="width: 100%;padding-left: 30px">
            <div class="title">{{information.title}}</div>
            <div class="content">{{information.abstract}}</div>
            <div class="time">{{new Date(information.create_time*1000).toLocaleString()}}</div>
          </div>
        </div>
      </div>
    </div>

    <div style="display: flex;justify-content: center;margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,10,15,20]"
        :page-size="limit"
        :total="total"
        layout=" prev, pager, next, sizes, jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getInformationList } from "../../api/information";

// const informationType = [
//   { id: 1, name: "行业政策" },
//   { id: 2, name: "研学政策" }
// ];

export default {
  name: "List",
  mounted() {
    this.getInformationList({ page: 1, limit: 10, ...this.$route.params });
  },
  data() {
    return {
      title: "",
      informationList: [],
      page: 1,
      limit: 10,
      total: 0
    };
  },
  methods: {
    async getInformationList(params) {
      const result = await getInformationList(params);
      // const ids = result.informations.map((item) => item.id);
      this.page = result.page;
      this.limit = result.limit;
      this.total = result.total;
      // const informations = await mGetInformationList({ids});
      const temp = result.informations.map(item => {
        const date = new Date(item.create_time * 1000);
        const month = date.getMonth() + 1 > 12 ? 1 : date.getMonth() + 1;
        const createDate =
          date.getFullYear() + "年" + month + "月" + date.getDate() + "日";
        return {
          ...item,
          createDate,
          cover: item.cover.length !== 0 ? "/api/resources/" + item.cover : ""
          // informationType: informationType.filter(
          //   t => t.id === item.information_type
          // )[0].name,
        };
      });
      this.informationList = temp;
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getInformationList({ page: this.page, limit: limit });
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getInformationList({ page: page, limit: this.limit });
    },
    navigateToInformation(id) {
      this.$router.push({ path: `/informations/${id}` });
    },
    async search() {
      const title = this.title;
      const city = this.city_id;
      const province = this.province_id;
      const country = this.country_id;
      this.getInformationList({ title, city, province, country });
    },
    reset() {
      this.title = "";
      this.city_id = "";
      this.province_id = "";
      this.country_id = "";
      this.search();
    }
  }
};
</script>

<style lang="scss" scoped>
.search-group {
}

.information {
  &__container {
    width: 1000px;
    margin: 0 auto;
  }

  &__wrap {
    display: flex;
    padding: 40px 20px;
    border-bottom: 1px dashed rgba(51, 51, 51, 0.3);
    transition: all 0.25s ease-in-out;

    &:hover {
      background: #f7f7f7;
    }

    .cover__container {
      overflow: hidden;
      min-width: 280px;
      height: 150px;

      .cover {
        height: 150px;
        background-size: cover;
        background-repeat: no-repeat;
        transition: all 0.5s ease-in-out;

        &:hover {
          transform: scale(1.1, 1.1);
        }

        &--default {
          background-image: url(../../assets/img/default-news.jpg);
        }
      }
    }

    .title {
      overflow: hidden;
      height: 30px;
      font-size: 22px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color 0.25s ease;

      &:hover {
        color: #1890ff;
      }
    }

    .content {
      overflow: hidden;
      display: -webkit-box;
      height: 65px;
      margin: 10px 0 15px 0;
      color: #666;
      font-size: 16px;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }

    .time {
      height: 30px;
      color: #888;
      font-size: 14px;
      line-height: 44px;
    }
  }
}
</style>
