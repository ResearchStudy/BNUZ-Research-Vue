<template>
  <div class="course-modify__container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容中心</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{coursesDetail.id}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="course-modify__wrap">
      <div class="course-modify__title">基本信息</div>
      <el-form
        ref="coursesDetail"
        :model="coursesDetail"
        :rules="courseRules"
        label-width="120px"
        label-suffix=":"
      >
        <el-form-item label="课程标题" prop="title">
          <div class="content">
            <el-input v-model="coursesDetail.title"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="课程子标题" prop="sub_title">
          <div class="content">
            <el-input v-model="coursesDetail.sub_title"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="适合人群" prop="suitable_for_crowd">
          <div class="content">
            <el-input v-model="coursesDetail.suitable_for_crowd"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="课程类型">
          <div class="content">
            <el-select
              v-model="coursesDetail.course_type"
              placeholder="请选择类型"
              filterable
              @change="handleTypeChange"
              value-key="id"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="课程标签">
          <div class="content">
            <el-select
              v-model="coursesDetail.tag"
              placeholder="请选择标签"
              filterable
              multiple
              @change="handleTagChange"
              value-key="id"
            >
              <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="课程时间">
          <div class="content">
            <el-date-picker
              style="width:100%"
              unlink-panels
              v-model="coursesDetail.timeRange"
              value-format="timestamp"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :clearable="false"
              :editable="false"
            ></el-date-picker>
          </div>
        </el-form-item>
        <div style="display:flex">
          <el-form-item label="省份" style="width:50%">
            <div class="content">
              <el-select
                v-model="coursesDetail.province_id"
                placeholder="请选择省份"
                filterable
                @change="handleProvinceChange"
                value-key="id"
              >
                <el-option
                  v-for="item in provinceList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="城市" style="width:50%">
            <div class="content">
              <el-select
                v-model="coursesDetail.city_id"
                filterable
                value-key="id"
                placeholder="请选择城市"
              >
                <el-option
                  v-for="item in cityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="详细地址" prop="address_detail">
          <div class="content">
            <el-input v-model="coursesDetail.address_detail"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <div class="content">
            <el-input v-model="coursesDetail.description"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="课程封面">
          <div class="content">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :http-request="handleAvatarUpload"
            >
              <img v-if="coursesDetail.imageUrl" :src="coursesDetail.imageUrl" class="avatar" />
              <i v-if="!coursesDetail.imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="是否发布" prop="details">
          <div class="content">
            <el-switch
              v-model="coursesDetail.status"
              :active-value="1"
              :inactive-value="2"
              active-color="#409EFF"
            ></el-switch>
          </div>
        </el-form-item>
        <el-form-item label="课程详情" prop="details">
          <div class="content">
            <quill-editor v-model="coursesDetail.details" ref="detailsEditor"></quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="content">
            <el-tabs value="scheduling">
              <el-tab-pane label="行程安排" name="scheduling">
                <quill-editor v-model="coursesDetail.scheduling" ref="schedulingEditor"></quill-editor>
              </el-tab-pane>
              <el-tab-pane label="开营时间" name="time">
                <el-button @click="handleAddTermClick">添加学期</el-button>
                <el-form
                  class="terms__detail"
                  ref="termsDetail"
                  :model="termsDetail"
                  label-width="6em"
                  label-suffix=":"
                  label-position="left"
                  hide-required-asterisk
                >
                  <div
                    v-for="(term,index) in termsDetail.termsList"
                    :key="term.key"
                    style="margin-bottom:40px"
                  >
                    <div class="terms__title">
                      第{{index+1}}期
                      <el-button
                        circle
                        type="danger"
                        size="mini"
                        icon="el-icon-delete"
                        @click="handleDeleteTermClick(index,term.id)"
                        style="margin-left:20px"
                      ></el-button>
                    </div>
                    <el-form-item
                      label="计划人数"
                      :prop="'termsList.'+index+'.planned'"
                      :rules="termRules.planned"
                    >
                      <el-input v-model="term.planned"></el-input>
                    </el-form-item>
                    <el-form-item
                      label="价格"
                      :prop="'termsList.'+index+'.price'"
                      :rules="termRules.price"
                    >
                      <el-input v-model="term.price"></el-input>
                    </el-form-item>
                    <el-form-item
                      label="活动时间"
                      :prop="'termsList.'+index+'.timeRange'"
                      :rules="termRules.timeRange"
                    >
                      <el-date-picker
                        style="width:100%"
                        unlink-panels
                        v-model="term.timeRange"
                        value-format="timestamp"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :clearable="false"
                        :editable="false"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item
                      label="备注"
                      :prop="'termsList.'+index+'.remarks'"
                      :rules="termRules.remarks"
                    >
                      <el-input v-model="term.remarks"></el-input>
                    </el-form-item>
                  </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="报名须知" name="notice">
                <quill-editor v-model="coursesDetail.notice" ref="noticeEditor"></quill-editor>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="content">
            <el-button type="primary" @click="handleSaveClick()">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { courseRules, termRules } from "./validate";
export default {
  name: "CourseModify",
  data() {
    return {
      id: -1,
      typeList: [
        { label: "知识科普", value: 1 },
        { label: "自然观赏", value: 2 },
        { label: "体验考察", value: 4 },
        { label: "励志拓展", value: 8 },
        { label: "文化康乐", value: 16 }
      ],
      coursesDetail: {},
      termsDetail: {
        termsList: []
      },
      deleteTermsList: [],
      provinceList: [],
      cityList: [],
      tagList: [],
      courseRules: courseRules,
      termRules: termRules,
      preProvinceId: -1,
      preCityId: -1,
      preAddressDetail: ""
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.id = id;
    await this.getProvinceList();
    await this.getCourseDetail();
    await this.getCityList();
    await this.getTagList();
    await this.getTermList();
  },
  methods: {
    async getCourseDetail() {
      const { data } = await this.$http.get(`/api/courses/${this.id}`);
      const {
        start_time,
        end_time,
        tag,
        address: { id, province_id, city_id, details }
      } = data;
      this.coursesDetail = {
        ...data,
        timeRange: [start_time * 1000, end_time * 1000],
        address_id: id,
        province_id,
        city_id,
        address_detail: details,
        tag: tag.map(item => item.id)
      };
      this.preProvinceId = province_id;
      this.preCityId = city_id;
      this.preAddressDetail = details;
      this.coursesDetail.imageUrl = await this.getPreImageInfo();
    },
    async getTermList() {
      const { data } = await this.$http.get(`/api/courses/${this.id}/terms`);
      this.termsDetail.termsList = data.map(term => {
        const { id, planned, price, remarks, start_time, end_time } = term;
        return {
          id,
          planned,
          price,
          remarks,
          timeRange: [start_time * 1000, end_time * 1000]
        };
      });
    },
    handleTypeChange(type) {
      this.coursesDetail.course_type = type;
    },
    handleTagChange(tag) {
      this.coursesDetail.tag = tag;
    },
    async getProvinceList() {
      const {
        data: { address: provinceList }
      } = await this.$http.get("/api/address/list", {
        target: 2
      });
      this.provinceList = provinceList;
    },
    async getCityList() {
      const {
        data: { address: cityList }
      } = await this.$http.get("/api/address/list", {
        target: 3,
        parent: this.coursesDetail.province_id
      });
      this.cityList = cityList;
    },
    async handleProvinceChange(provinceId) {
      this.coursesDetail.province_id = provinceId;
      await this.getCityList();
      this.coursesDetail.city_id = this.cityList[0].id;
    },
    handleCityChange(cityId) {
      this.coursesDetail.city_id = cityId;
    },
    async getTagList() {
      const {
        data: { tags }
      } = await this.$http.get("/api/tags/list");
      this.tagList = tags;
    },
    getPreImageInfo() {
      return new Promise(async resolve => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = `/api/resources/${this.coursesDetail.cover}`;
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          const res = canvas.toDataURL("image/jpeg");
          resolve(res);
        };
      });
    },
    async handleAvatarUpload({ file }) {
      this.isUploaded = true;
      const coursesDetail = this.coursesDetail;
      this.coursesDetail = {
        ...coursesDetail,
        imageUrl: await this.getImageInfo(file)
      };
    },
    getImageInfo(file) {
      return new Promise(async resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          resolve(e.target.result);
        };
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message({
          type: "error",
          message: "只能JPG或者PNG"
        });
      }
      if (!isLt2M) {
        this.$message({
          type: "error",
          message: "超过2M"
        });
      }
      return (isJPG || isPNG) && isLt2M;
    },
    handleAddTermClick() {
      this.termsDetail.termsList.push({
        id: -1,
        planned: "",
        price: "",
        timeRange: [],
        remarks: "",
        key: new Date().getTime()
      });
    },
    handleDeleteTermClick(index, id) {
      this.termsDetail.termsList.splice(index, 1);
      this.deleteTermsList.push(id);
    },
    async handleCourseSubmit() {
      const {
        title,
        sub_title,
        description,
        course_type,
        tag,
        timeRange,
        details,
        scheduling,
        notice,
        imageUrl,
        province_id,
        city_id,
        address_detail,
        suitable_for_crowd,
        status
      } = this.coursesDetail;
      const [start_time, end_time] = timeRange;

      const isAddressChange =
        this.preProvinceId !== province_id ||
        this.preCityId !== city_id ||
        this.preAddressDetail !== address_detail;

      if (isAddressChange) {
        const {
          data: { id: newAddressId }
        } = await this.$http.post("/api/address", {
          country_id: 1,
          province_id,
          city_id,
          details: address_detail
        });
        this.coursesDetail.address_id = newAddressId;
      }
      await this.$http.put(`/api/courses/${this.id}`, {
        title,
        subtitle: sub_title,
        description,
        course_type,
        tag,
        details,
        start_time: start_time / 1000,
        end_time: end_time / 1000,
        scheduling,
        notice,
        cover: imageUrl,
        address_id: this.coursesDetail.address_id,
        suitable_for_crowd,
        status
      });
    },
    async handleTermSubmit() {
      const { termsList } = this.termsDetail;
      termsList.forEach(async ({ id, price, planned, timeRange, remarks }) => {
        const isNewTerm = id === -1;
        const [start_time, end_time] = timeRange;
        const requestBody = {
          planned: parseInt(planned),
          price: parseInt(price),
          start_time: start_time / 1000,
          end_time: end_time / 1000,
          remarks
        };
        if (!isNewTerm) {
          await this.$http.put(
            `/api/courses/${this.id}/terms/${id}`,
            requestBody
          );
        } else {
          await this.$http.post(`/api/courses/${this.id}/terms`, requestBody);
        }
      });
      const deleteTermsList = this.deleteTermsList.filter(id => id !== -1);
      if (deleteTermsList.length === 0) return;
      await this.$http.delete(`/api/courses/${this.id}/terms`, {
        data: {
          ids: deleteTermsList
        }
      });
    },
    handleSaveClick() {
      const courseValid = new Promise((resolve, reject) => {
        this.$refs["coursesDetail"].validate(valid => {
          if (valid) resolve();
          reject({
            message: "请按要求完成表格"
          });
        });
      });
      const termValid = new Promise((resolve, reject) => {
        this.$refs["termsDetail"].validate(valid => {
          if (valid) resolve();
          reject({
            message: "请按要求完成表格"
          });
        });
      });

      Promise.all([courseValid, termValid])
        .then(async () => {
          await this.handleTermSubmit();
          await this.handleCourseSubmit();
          this.$message({
            type: "success",
            message: "修改成功",
            isSingle: true
          });
        })
        .catch(({ message }) => {
          this.$message({
            type: "error",
            message: message,
            isSingle: true
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./recover.scss";

.course-modify {
  &__container {
  }

  &__title {
    margin-bottom: 30px;
    color: #333;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 8px;
  }

  &__wrap {
    margin-top: 20px;
    padding: 10px;
    background: #fff;

    .content {
      max-width: 80%;
      margin-left: 30px;
      color: #666;
    }
  }
}

.terms {
  &__title {
    display: flex;
    align-items: center;
    margin: 20px 0;
    color: #333;
    font-size: 26px;
    font-weight: bold;
  }

  &__detail {
    /deep/ .el-form-item__error {
      margin-left: 0;
    }
  }
}
</style>