<template>
  <div style="padding: 50px">
    <div style="width: 80%;margin-left: 10%">
      <div>
        <h1>发布课程</h1>
        <el-divider></el-divider>
      </div>
      <div  v-if="activeName === 'first'">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="课程名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="课程子标题">
            <el-input v-model="form.subtitle"></el-input>
          </el-form-item>
          <el-form-item label="课程类型">
            <el-input v-model="form.course_type"></el-input>
          </el-form-item>
          <el-form-item label="适合人群">
            <el-input v-model="form.suitable_for_crowd"></el-input>
          </el-form-item>
          <el-form-item label="课程封面">
            <el-upload
                    class="avatar-uploader"
                    action="#"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="handleAvatarUpload"
            >
              <img
                      v-if="form.cover"
                      :src="form.cover"
                      class="avatar"
              />
              <i v-if="!form.cover" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="省份">
                <el-select v-model="form.address.province_id" placeholder="请选择省份"
                           @change="getCityList(form.address.province_id)">
                  <el-option v-for="province in provinceList" :label="province.name" :key="province.id"
                             :value="province.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市">
                <el-select v-model="form.address.city_id" placeholder="请选择城市">
                  <el-option v-for="city in cityList" :label="city.name" :key="city.id" :value="city.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div style="padding-bottom: 10px">课程详情</div>
          <div >
            <quill-editor v-model="form.details"
                          ref="myQuillEditor" class="warrper">
            </quill-editor>
          </div>
          <div style="display: flex;justify-content: center;margin-top: 20px">
            <el-button type="primary" @click="navigateToSecond()">立即创建</el-button>
          </div>
        </el-form>
      </div>
      <div v-else>
        <el-tabs v-model="activeName">
          <el-tab-pane label="行程安排" name="second">
            <div >
              <quill-editor v-model="form.details"
                            ref="myQuillEditor" class="warrper">
              </quill-editor>
            </div>
          </el-tab-pane>
          <el-tab-pane label="开营时间" name="third">
            <div>
              <el-row>
                <el-col :span="2">活动时间</el-col>
                <el-col :span="22">
                  <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker></el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  备注
                </el-col>
                <el-col :span="22">
                  <el-input
                          type="textarea"
                          :rows="3"
                          placeholder="请输入内容"
                          v-model="textarea">
                  </el-input>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="研学服务" name="fourth">
            <div >
              <quill-editor v-model="form.details"
                            ref="myQuillEditor" class="warrper">
              </quill-editor>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
    import {getAddressById} from "../../api/address";

    export default {
        name: "CoursesForm",
        data() {
            return {
                activeName: 'first',
                value1: '',
                textarea: '',
                form: {
                    title: '',
                    subtitle: '',
                    course_type: '',
                    cover: '',
                    description: '',
                    details: '',
                    suitable_for_crowd: '',
                    address: {
                        province_id: '',
                        city_id: ''
                    },
                },
                provinceList: [],
                cityList: []
            };
        },
        methods: {
            async handleAvatarUpload({file}) {
                this.form.cover = await this.getImageInfo(file);
            },
            getPreImageInfo() {
                return new Promise(async resolve => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const img = new Image();
                    img.src = this.institutionDetails.imageUrl;

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
            async getProvinceList() {
                const result = await getAddressById({target: 2});
                this.provinceList = result.address;
            },
            async getCityList(provinceId) {
                this.form.address.city_id = ''
                const result = await getAddressById({
                    target: 3,
                    parent: provinceId
                });
                this.cityList = result.address;
            },
            navigateToSecond(){
                this.activeName = 'second'
            }
        }
    }
</script>

<style scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 70px;
  }
  
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 70px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  
  .avatar {
    width: 70px;
    height: 70px;
    display: block;
  }
  .ql-container.ql-snow{
    min-height: 180px;
  }
</style>
