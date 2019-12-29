<template>
  <div style="padding: 50px">
    <v-header></v-header>
    <div style="width: 80%;margin-left: 10%">
      <div>
        <h1>发布资讯</h1>
        <el-divider></el-divider>
      </div>
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-row>
          <el-col span="8">
            <el-form-item label="类型">
              <el-select v-model="form.information_type" placeholder="请选择">
                <el-option
                        v-for="item in information_type"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="发布时间">
              <div class="content">
                <el-date-picker
                        type="date"
                        v-model="form.establish_time"
                        placeholder="发布时间"
                        value-format="timestamp"
                        style="width: 220px"
                        :clearable="false"
                        :editable="false"
                ></el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item label="封面">
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

          <el-form-item label="摘要">
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form.abstract"
                    >
            </el-input>
          </el-form-item>

        <el-form-item label="详情">
          <div >
            <quill-editor v-model="form.content"
                          ref="myQuillEditor" class="warrper">
            </quill-editor>
          </div>
        </el-form-item>

        <el-row>
          <el-col span = "4">
            <el-form-item>
              <div >
                <el-button @click="saveInformation()" type="primary" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
              </div>
            </el-form-item>
          </el-col>
          <el-col span = "2">
           <el-form-item>
            <div >
              <el-button @click="submit()" type="primary" v-loading.fullscreen.lock="fullscreenLoading">立即发布</el-button>
            </div>
          </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <v-footer></v-footer>
  </div>
</template>


<script>

  import {saveInformation,submitInformation} from "../../api/information";

  //import appHeader from '../../components/header-component/index.vue';
  import appFooter from '../../components/footer-component/index.vue';

  export default {
    name: "InformationForm",
    components:{
      //'v-header':appHeader,
      'v-footer':appFooter
    },
    data() {
      return {
        fullscreenLoading: false,
        id:0,
        form: {
          title: '',
          information_type: '',
          cover: '',
          abstract: '',
          publist_time:'',
          content: ''
          },

        information_type: [{
          value: 1,
          label: "行业资讯"
        },{
          value: 2,
          label: "研学政策"
        }]
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

      saveInformation(){//暂存
        this.form.status = 16;//暂存
        this.form.publist_time = new Date(this.form.publist_time).getTime() / 1000
        this.fullscreenLoading = true
        saveInformation(this.form).then((res) => {
          this.fullscreenLoading = false
          this.id = res.id,
          this.$message({
            message: '保存成功' ,
            type: 'success'
          });
          //this.$router.push({path: '/insitution-admin/informationManager'})
        })

      },

      submit(){
        if(this.id == 0){  //不暂存，直接发布
          this.form.status = 1;
          this.form.publist_time = new Date(this.form.publist_time).getTime() / 1000
          this.fullscreenLoading = true
          saveInformation(this.form).then(() => {
            this.fullscreenLoading = false
                    this.$message({
                      message: '发布成功' ,
                      type: 'success'
                    });
            this.$router.push({path: '/insitution-admin/informationManager'})
          })
        }else{
          //当保存后，再点击立即发布
          this.form.status = 1;
          this.form.publist_time = new Date(this.form.publist_time).getTime() / 1000
          this.fullscreenLoading = true
          submitInformation(this.form,this.id).then(() => {
            this.fullscreenLoading = false
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.$router.push({path: '/insitution-admin/informationManager'})
          })
        }


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
