<template>
  <div style="padding: 50px">
    <div style="width: 80%;margin-left: 10%">
      <div>
        <h1>发布课程</h1>
        <el-divider></el-divider>
      </div>
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="课程名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="课程子标题">
            <el-input v-model="form.subtitle"></el-input>
          </el-form-item>
          <el-form-item label="适合人群">
            <el-input v-model="form.suitable_for_crowd"></el-input>
          </el-form-item>
          <el-form-item label="课程类型">
            <el-select v-model="form.course_type" placeholder="请选择">
              <el-option
                      v-for="item in courseType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程时间">
            <el-date-picker
                    v-model="form.date"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
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
        </el-form>
        <el-tabs v-model="activeName" style="margin-top: 30px">
          <el-tab-pane label="行程安排" name="second">
            <div >
              <quill-editor v-model="form.scheduling"
                            ref="myQuillEditor" class="warrper">
              </quill-editor>
            </div>

          </el-tab-pane>
          <el-tab-pane label="开营时间" name="third">
            <div v-for="term in form.term" :key="term.title">
              <el-row>
                <el-col :span="2"><h3>{{term.title}}</h3></el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="2">计划人数</el-col>
                <el-col :span="22">
                  <el-input type="number" v-model="term.planned"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="2">价格</el-col>
                <el-col :span="22">
                  <el-input type="number" v-model="term.price"></el-input>
                </el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="2">活动时间</el-col>
                <el-col :span="22">
                  <el-date-picker
                        v-model="term.date"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker></el-col>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-col :span="2">
                  备注
                </el-col>
                <el-col :span="22">
                  <el-input
                          type="textarea"
                          :rows="3"
                          placeholder="请输入内容"
                          v-model="term.remarks">
                  </el-input>
                </el-col>
              </el-row>
            </div>
            <div style="text-align: right;margin-top: 15px">
              <el-button plain @click="newTerm()">新增学期</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="研学服务" name="fourth">
            <div>
              <quill-editor v-model="form.notice"
                            ref="myQuillEditor" class="warrper">
              </quill-editor>
            </div>
            <div>
              <el-button @click="submit()" type="primary">立即创建</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
    import {getAddressById, saveAddress} from "../../api/address";
    import {saveCourses} from "../../api/courses";
    export default {
        name: "CoursesForm",
        data() {
            return {
                activeName: 'second',
                form: {
                    title: '',
                    subtitle: '',
                    course_type: '',
                    cover: '',
                    description: '',
                    scheduling: '',
                    details: '',
                    suitable_for_crowd: '',
                    address_id: '',
                    start_time: '',
                    end_time: '',
                    date: '',
                    notice: '',
                    address: {
                        province_id: '',
                        city_id: '',
                        country_id: 1
                    },
                    term:[
                        {
                            title: '第1期',
                            planned: 0,
                            price: 0,
                            start_time: '',
                            end_time: '',
                            remarks: '',
                            date: '',
                        }
                    ]
                },
                provinceList: [],
                cityList: [],
                courseType: [{
                    value: 1,
                    label: "知识科普"
                },{
                    value: 2,
                    label: "自然观赏"
                },{
                    value: 4,
                    label: "体验考察"
                },{
                    value: 8,
                    label: "励志拓展"
                },{
                    value: 16,
                    label: "文化康乐"
                }]
            };
        },
        mounted(){
            this.getProvinceList();
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
            newTerm(){
                const result = this.form.term;
                const text = result[result.length - 1].title;
                const number = parseInt(text.substring(1, text.length - 1)) + 1
                const lastTitle = `第${number}期`
                result.push({
                    title: lastTitle,
                    planned: 0,
                    price: 0,
                    start_time: '',
                    end_time: ''
                })
                this.form.term = result
            },
            submit(){
                this.form.start_time = new Date(this.form.date[0]).getTime()/1000
                this.form.end_time = new Date(this.form.date[1]).getTime()/1000
                const term  = this.form.term
                const termMapping = term.map((term) => {
                    return {
                        ...term,
                        planned: parseInt(term.planned),
                        price: parseInt(term.price),
                        start_time: new Date(term.date[0]).getTime()/1000,
                        end_time: new Date(term.date[1]).getTime()/1000,
                    }
                });
                this.form.term = termMapping
                saveAddress(this.form.address).then((res) => {
                    this.form.address_id = res.id
                    this.form.course_type = 1
                    this.form.price = 0
                    saveCourses(this.form).then((res) => {
                        console.log(res)
                    })
                })
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
