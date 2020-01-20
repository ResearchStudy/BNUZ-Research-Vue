<template>
  <div class="footerBtn">
    <el-button @click="dialogVisible=true">上传头像</el-button>
    <!-- 弹出层-裁剪 -->
    <el-dialog
      title="编辑头像"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <span>
        <el-row>
          <input
            type="file"
            id="uploads"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="uploadImg($event,1)"
            class="el-button"
            style="margin-bottom:15px"
          >
        </el-row>
        <el-row>
          <el-col :span="16">
            <!-- 裁剪 -->
            <vueCropper
              style="width:100%;height:300px"
              ref="cropper"
              :img="attach.customaryUrl"
              :autoCrop="options.autoCrop"
              :fixedBox="options.fixedBox"
              :canMoveBox="options.canMoveBox"
              :autoCropWidth="options.autoCropWidth"
              :autoCropHeight="options.autoCropHeight"
              :centerBox="options.centerBox"
              @realTime="realTime"
            >

            </vueCropper>
          </el-col>
          <el-col :span="8">
            <h2 align="center">头像预览</h2>
            <div class="show-preview">
              <div
                :style="previews.div"
                class="preview"
              >
                <img
                  :src="previews.url"
                  :style="previews.img"
                >
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row
          class="footerBtn"
          align="center"
        >
          <el-button
            type="primary"
            size="small"
            round=""
            @click="cut()"
          >确认</el-button>
          <el-button
            type="primary"
            size="small"
            round=""
            @click="handleClose"
          >取消</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      options: {
        autoCrop: true, //默认生成截图框
        fixedBox: false, //固定截图框大小
        canMoveBox: false, //截图框不能拖动
        autoCropWidth: 200, //截图框宽度
        autoCropHeight: 200, //截图框高度
        centerBox: false //截图框被限制在图片里面
      },
      previews: {}, //实时预览图数据
      attach: {
        id: "",
        customaryUrl: "", //原图片路径
        laterUrl: "", //裁剪后图片路径
        attachType: "photo" //附件类型
      },
      fileName: "" //本机文件地址
    };
  },
  methods: {
    //控制弹出层关闭
    handleClose() {
      this.dialogVisible = false;
    },
    //实时预览
    realTime(data) {
      this.previews = data;
    },
    async beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message({
          type: "error",
          message: "上传头像图片只能是 JPG/PNG 格式",
          isSingle: true
        });
      }
      if (!isLt2M) {
        this.$message({
          type: "error",
          message: "上传头像图片大小不能超过 2MB!",
          isSingle: true
        });
      }
      return isJPG && isLt2M;
    },
    //选择本地图片

    uploadImg(e) {
      var file = e.target.files[0];
      if (!this.beforeUpload(file)) {
        return false;
      }
      console.log(e.target.result);
      var reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file); //以dataURL形式读取文件
      reader.onload = e => {
        let data = e.target.result;
        that.attach.customaryUrl = data;
        let image = new Image()
        image.src = data
        image.onload = function() {
            if(this.width < 200 || this.height < 200){
              that.options.autoCropWidth = this.width;
              that.options.autoCropHeight = this.height;
            } 
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
      };
    },

    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
          resolve(e.target.result);
        }; // readAsDataURL
        fileReader.readAsDataURL(blob);
        fileReader.onerror = () => {
          reject(new Error("文件流异常"));
        };
      });
    },
    //确认截图,上传
    cut() {
      this.$refs.cropper.getCropBlob(res => {
        //res是裁剪后图片的bolb对象
        this.blobToBase64(res).then(res => {
          this.attach.customaryUrl = res;
          this.$emit("update:imageUrl", res);
        });
      });
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
/* 弹性布局 水平居中 */
.show-preview {
  display: flex;
  justify-content: center;
}

.preview {
  overflow: hidden;
  border: 1px solid #cccccc;
  background: #cccccc;
}
.footerBtn {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
</style>