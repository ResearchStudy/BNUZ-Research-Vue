<template>
  <div
    style="width: 80%;margin-left: 10%;margin-top: 50px;display: inline-flex;justify-content: space-between"
  >
    <div style="width: 80%">
      <div style="border: 1px dashed #f2f2f2;padding: 20px;display: flex">
        <div style="padding: 50px">
          <img :src="info.src" style="width: 400px" />
        </div>
        <div style="width: 100%;padding-top: 45px">
          <h3>{{info.title}}</h3>
          <h4>{{info.sub_title}}</h4>
          <div class="info">适合人群: {{info.suitable_for_crowd}}</div>
          <div class="info">研学城市: {{info.address ? info.address.city_name : ''}}</div>
          <div class="info">行程天数: {{info.travel_days }}天</div>
          <div class="info">研学日期: {{info.startTime}}月 - {{info.endTime}}月</div>
          <div class="info">
            <el-button type="primary" @click="preEnroll()">预约报名</el-button>
          </div>
          <div class="info" style="display: flex">
            分享:
            <div style="display: flex">
              <img src="../../assets/img/qq.png" alt class="share-icon" />
              <img src="../../assets/img/wechat.png" alt class="share-icon" />
              <img src="../../assets/img/weibo.png" alt class="share-icon" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程详情" name="first">
            <div v-html="info.details"></div>
          </el-tab-pane>
          <el-tab-pane label="行程安排" name="second">
            <div v-html="info.scheduling"></div>
          </el-tab-pane>
          <el-tab-pane label="研学服务" name="third">
            <div v-html="info.notice"></div>
          </el-tab-pane>
          <el-tab-pane label="预约报名" name="four"></el-tab-pane>
        </el-tabs>
      </div>

      <el-dialog title="预约报名" :visible.sync="dialogFormVisible" :rules="rules">
        <el-form :model="enroll" :rules="rules" ref="enroll">
          <el-form-item label="用户名称" label-width="100px" prop="name">
            <el-input v-model="enroll.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="手机号码" label-width="100px" prop="phone">
            <el-input v-model="enroll.phone" :rules="rules"></el-input>
          </el-form-item>

          <el-form-item label="年龄" label-width="100px">
            <el-input v-model="enroll.age" type="number"></el-input>
          </el-form-item>

          <el-row>
            <el-col span="10">
              <el-form-item label="档期" label-width="100px">
                <el-select v-model="enroll.term_id" placeholder="请选择">
                  <el-option
                    v-for="item in termList"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col span="8">
              <el-form-item label="性别" label-width="100px">
                <el-radio-group v-model="enroll.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="用户邮箱" label-width="100px" prop="email">
            <el-input v-model="enroll.email"></el-input>
          </el-form-item>

          <el-form-item label="留言备注" label-width="100px">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="enroll.remarks"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="preEnrollSubmit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="width: 25%;border: 1px dotted #f2f2f2;margin-left: 5%">
      <h3 style="padding-left: 18px;">相似课程</h3>
      <div
        v-for="course in similarCourses"
        :key="course.id"
        @click="navigateToCoursesById(course.id)"
      >
        <card
          :title="course.title"
          :img-src="'/api/resources/' + course.cover"
          :description="course.description"
          :tag-name="course.tagName"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCoursesById,
  getCoursesList,
  getTermByCoursesId,
  preEnroll
} from "../../api/courses";
import Card from "../../components/courses/card";

export default {
  name: "CoursesDetail",
  components: { Card },
  data() {
    let checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      console.log(reg.test(value));
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("手机格式有误"));
      }
    };

    let checkEmail = (rlue, value, callback) => {
      const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("邮箱格式有误"));
      }
    };

    return {
      info: {},
      id: "",
      dialogFormVisible: false,
      activeName: "first",
      enroll: {
        name: "",
        sex: "",
        email: "",
        age: "",
        phone: "",
        remarks: "",
        term_id: ""
      },

      rules: {
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        name: [{ required: true, message: "名字不能为空", trigger: "blur" }],
        nickname: [{ required: true, message: "昵称不能为空", trigger: "blur" }]
      },
      termList: [],
      similarCourses: []
    };
  },

  watch: {
    $route() {
      this.id = this.$route.params.id;
    },
    id() {
      this.getCoursesInfo();
    }
  },
  mounted() {
    this.similarCourses = this.$route.params.similarCourses;
    this.getCoursesInfo();
  },
  methods: {
    async getCoursesInfo() {
      this.info = await getCoursesById(this.$route.params.id);
      const temp = await getCoursesList();
      const similarCourses = temp.courses
        .filter(course => course.id !== this.$route.params.id)
        .slice(0, 3);
      this.similarCourses = similarCourses;
      this.info.src = `/api/resources/${this.info.cover}`;
      this.info.startTime =
        new Date(this.info.start_time * 1000).getMonth() + 1 > 12
          ? 1
          : new Date(this.info.start_time * 1000).getMonth() + 1;
      this.info.endTime =
        new Date(this.info.end_time * 1000).getMonth() + 1 > 12
          ? 1
          : new Date(this.info.end_time * 1000).getMonth() + 1;
    },
    async preEnroll() {
      if (
        !localStorage.getItem("id") ||
        localStorage.getItem("id").length === 0
      ) {
        this.$router.push({ path: "/login" });
      } else {
        this.dialogFormVisible = true;
        this.termList = await getTermByCoursesId(this.$route.params.id);
      }
    },
    preEnrollSubmit() {
      this.enroll.age = parseInt(this.enroll.age);
      preEnroll(this.$route.params.id, this.enroll).then(res => {
        console.log(res);
        this.dialogFormVisible = false;
      });
    },
    handleClick(tab) {
      if (tab.name === "four") {
        this.preEnroll();
      }
    },
    async navigateToCoursesById(id) {
      this.$router.push({ name: `CoursesDetail`, params: { id } });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin: 10px 0px;
}
.info {
  margin: 10px 0;
}
.share-icon {
  width: 25px;
  height: 25px;
  margin-left: 10px;
}
</style>
