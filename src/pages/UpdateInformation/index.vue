<template>
  <div style="padding: 50px">
    <div style="width: 80%;margin-left: 10%">
      <div>
        <h1 align="center">修改资讯</h1>
        <el-divider></el-divider>
      </div>
      <el-form :model="info" ref="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="info.title"></el-input>
        </el-form-item>

        <el-row>
          <el-col span="8">
            <el-form-item label="类型">
              <el-select v-model="info.information_type" placeholder="请选择">
                <el-option
                  v-for="item in information_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="发布时间">
              <div class="content">
                <el-date-picker
                  type="date"
                  v-model="info.createTime"
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
            action
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="handleAvatarUpload"
          >
            <img v-if="info.src" :src="info.src" class="avatar" />
            <i v-else class="el-icon-plus base-data_avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="摘要">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="info.abstract"></el-input>
        </el-form-item>

        <el-form-item label="详情">
          <div>
            <quill-editor v-model="info.content" ref="myQuillEditor" class="warrper"></quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <div>
            <el-button
              @click="submit()"
              type="primary"
              v-loading.fullscreen.lock="fullscreenLoading"
            >保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
import { saveInformation, getInformationById } from "../../api/information";

export default {
  name: "InformationForm",
  data() {
    return {
      imageUrl: "",
      fullscreenLoading: false,
      form: {
        title: "",
        information_type: "",
        cover: "",
        abstract: "",
        publist_time: "",
        content: ""
      },
      info: {},
      information_type: [
        {
          value: 1,
          label: "行业资讯"
        },
        {
          value: 2,
          label: "研学政策"
        }
      ]
    };
  },

  mounted() {
    this.getInformationInfo();
  },
  methods: {
    async getInformationInfo() {
      const infomation = await getInformationById(this.$route.params.id);
      const { cover, create_time } = infomation;
      this.imageUrl = `/api/resources/${cover}`;
      this.info = {
        ...infomation,
        src: await this.getPreImageInfo(),
        createTime: new Date(create_time * 1000)
      };
      // this.info.startTime =
      //   new Date(this.info.start_time * 1000).getMonth() + 1 > 12
      //     ? 1
      //     : new Date(this.info.start_time * 1000).getMonth() + 1;
      // this.info.endTime =
      //   new Date(this.info.end_time * 1000).getMonth() + 1 > 12
      //     ? 1
      //     : new Date(this.info.end_time * 1000).getMonth() + 1;
      // this.info.createTime = new Date(this.info.create_time * 1000);
    },

    async handleAvatarUpload({ file }) {
      this.info.src = await this.getImageInfo(file);
    },

    getPreImageInfo() {
      return new Promise(async resolve => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = this.imageUrl;

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

    submit() {
      this.fullscreenLoading = true;
      const {
        title,
        abstract,
        content,
        information_type,
        status,
        attribute,
        src
      } = this.info;
      saveInformation({
        title,
        abstract,
        content,
        information_type,
        cover: src,
        status,
        attribute
      }).then(() => {
        this.fullscreenLoading = false;
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.$router.push({ path: "/insitution-admin/informationManager" });
      });
    }
  }
};
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
.ql-container.ql-snow {
  min-height: 180px;
}
</style>
