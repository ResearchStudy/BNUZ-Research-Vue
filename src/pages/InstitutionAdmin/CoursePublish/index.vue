<template>
  <div class="course-modify__container">
    <el-dialog
      title="编辑头像"
      width="1000px"
      :visible="isModalOpened"
      :before-close="hanldeModalClose"
      top="5vh"
    >
      <div class="cropper__container">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <vueCropper
              style="width:100%;height:400px"
              ref="cropper"
              :img="coursesDetail.imageUrl"
              :autoCrop="true"
              :fixedBox="false"
              :canMoveBox="false"
              :autoCropWidth="200"
              :autoCropHeight="200"
              :centerBox="true"
              @realTime="generatePreviews"
            />
          </el-col>
          <el-col :span="7">
            <div class="cropper__wrap">
              <div class="cropper__title">裁剪预览</div>
              <div :style="previews.div" class="cropper__preview">
                <img :src="previews.url" :style="previews.img" />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-button type="primary" @click="handleImageCut">确认</el-button>
          <el-button type="primary" @click="hanldeModalClose">取消</el-button>
        </el-row>
      </div>
    </el-dialog>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容中心</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布课程</el-breadcrumb-item>
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
        <el-form-item label="课程子标题" prop="subtitle">
          <div class="content">
            <el-input v-model="coursesDetail.subtitle"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="适合人群" prop="suitable_for_crowd">
          <div class="content">
            <el-input v-model="coursesDetail.suitable_for_crowd"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="价钱" prop="price">
          <div class="content">
            <el-input v-model="coursesDetail.price"></el-input>
          </div>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="课程类型" prop="course_type">
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
          </el-col>
          <el-col :span="16">
            <el-form-item label="课程标签" prop="tag">
              <div class="content">
                <el-select
                  style="width:80%"
                  v-model="coursesDetail.tag"
                  placeholder="请选择标签"
                  filterable
                  multiple
                  @change="handleTagChange"
                  value-key="id"
                >
                  <el-option
                    v-for="item in tagList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="课程时间" prop="course_time">
          <div class="content">
            <el-date-picker
              style="width:100%"
              unlink-panels
              v-model="coursesDetail.course_time"
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
          <el-form-item label="省份" style="width:50%" prop="province_id">
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
          <el-form-item label="城市" style="width:50%" prop="city_id">
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
              accept=".jpg, .jpeg, .png"
            >
              <img v-if="coursesDetail.imageUrl" :src="coursesDetail.imageUrl" class="avatar" />
              <i v-if="!coursesDetail.imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
                <div class="terms__detail">
                  <el-form-item prop="scheduling">
                    <quill-editor v-model="coursesDetail.scheduling" ref="schedulingEditor"></quill-editor>
                  </el-form-item>
                </div>
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
                >
                  <div
                    v-for="(term,index) in termsDetail.termsList"
                    :key="term.key"
                    style="margin-bottom:40px"
                  >
                    <div class="terms__title">
                      第{{index+1}}期
                      <el-button
                        v-if="index!==0"
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
                <div class="terms__detail">
                  <el-form-item prop="notice">
                    <quill-editor v-model="coursesDetail.notice" ref="noticeEditor"></quill-editor>
                  </el-form-item>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form-item>
        <el-form-item label="是否发布">
          <div class="content">
            <el-tooltip :content="coursesDetail.status===1?'发布':'暂存'" placement="top">
              <el-switch
                v-model="coursesDetail.status"
                :active-value="1"
                :inactive-value="2"
                active-color="#409EFF"
              ></el-switch>
            </el-tooltip>
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
  name: "CoursePublish",
  data() {
    return {
      id: -1,
      title: "",
      typeList: [
        { label: "知识科普", value: 1 },
        { label: "自然观赏", value: 2 },
        { label: "体验考察", value: 4 },
        { label: "励志拓展", value: 8 },
        { label: "文化康乐", value: 16 }
      ],
      coursesDetail: {
        address_id: "",
        title: "",
        subtitle: "",
        suitable_for_crowd: "",
        course_type: "",
        tag: [],
        course_time: [],
        province_id: "",
        city_id: "",
        address_details: "",
        description: "",
        imageUrl: "",
        details: "",
        scheduling: "",
        notice: "",
        price: ""
      },
      termsDetail: {
        termsList: [
          {
            title: "",
            planned: "",
            price: "",
            timeRange: [],
            remarks: ""
          }
        ]
      },
      deleteTermsList: [],
      provinceList: [],
      cityList: [],
      tagList: [],
      courseRules: courseRules,
      termRules: termRules,
      preProvinceId: -1,
      preCityId: -1,
      preAddressDetail: "",
      isModalOpened: false,
      previews: {},
      preImageUrl: ""
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    this.id = id;
    await this.getTagList();
    await this.getProvinceList();
  },
  methods: {
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
    async handleAvatarUpload({ file }) {
      this.isUploaded = true;
      const coursesDetail = this.coursesDetail;
      this.coursesDetail = {
        ...coursesDetail,
        imageUrl: await this.getImageInfo(file)
      };
      this.isModalOpened = true;
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
        title: "",
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
        subtitle,
        description,
        course_type,
        tag,
        course_time,
        details,
        scheduling,
        notice,
        imageUrl,
        province_id,
        city_id,
        address_detail,
        suitable_for_crowd,
        status,
        price
      } = this.coursesDetail;
      const [start_time, end_time] = course_time;
      const {
        data: { id: newAddressId }
      } = await this.$http.post("/api/address", {
        country_id: 1,
        province_id,
        city_id,
        details: address_detail
      });
      this.coursesDetail.address_id = newAddressId;
      await this.$http.post(`/api/courses`, {
        title,
        subtitle,
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
        status,
        term: this.termsDetail.termsList.map(
          ({ price, planned, timeRange: [start_time, end_time], remarks }) => ({
            planned: parseInt(planned),
            price: parseInt(price),
            start_time: start_time / 1000,
            end_time: end_time / 1000,
            remarks,
            title: ""
          })
        ),
        price: parseInt(price)
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
          await this.handleCourseSubmit();
          const { status } = this.coursesDetail;
          this.$message({
            type: "success",
            message: status === 1 ? "发布成功" : "暂存成功",
            isSingle: true
          });
          this.$router.push({ path: "/institution-admin/course-list" });
        })
        .catch(({ message }) => {
          this.$message({
            type: "error",
            message: message,
            isSingle: true
          });
        });
    },
    hanldeModalClose() {
      this.isModalOpened = false;
      this.coursesDetail.imageUrl = this.preImageUrl;
    },
    generatePreviews(data) {
      this.previews = data;
    },
    handleImageCut() {
      this.$refs.cropper.getCropData(data => {
        this.coursesDetail.imageUrl = data;
        this.preImageUrl = data;
        this.isModalOpened = false;
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