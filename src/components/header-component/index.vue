<template>
  <div id="header">
    <div class="left">
      <div class="logo">北师研学</div>
      <div style="display: flex; justify-content: space-between">
        <header-link
          v-for="title in titleArr"
          :title="title.name"
          :href="title.href"
          :key="title.name"
        />
      </div>
    </div>
    <div class="right" style="margin-right: 10px">
      <button
        style="margin-right: 30px"
        v-if="role === 8"
        @click="$router.push({path: '/institution-admin/course-publish'})"
      >我要发布</button>
      <button v-if="!isRegisted" style="margin-right: 30px" @click="checkRegister()">入驻合作</button>
      <button style="margin-right: 17px" @click="navigateTo('/register')" v-if="!isLogin">注册</button>
      <button @click="navigateTo('/login')" v-if="!isLogin">登录</button>
      <el-dropdown v-if="isLogin">
        <div
          style="cursor: pointer;padding-right: 20px;color: white;display: flex;align-items: center"
        >
          <img :src="$store.state.avator" style="width: 30px;padding-right: 5px" />
          {{userInfo.nickname}}
          <span></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="drop">
          <el-dropdown-item @click.native="navigateToPre" v-if="isUser">个人空间</el-dropdown-item>
          <el-dropdown-item @click.native="navigateToAdmin">个人设置</el-dropdown-item>
          <el-dropdown-item @click.native="navigateToPass">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="dialogVisible = true" v-if="role === 99">备份/还原</el-dropdown-item>
          <el-dropdown-item @click.native="logout()" class="layout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      title="备份还原"
      width="40%"
      :visible.sync="dialogVisible"
      :modal="false"
      :close-on-click-modal="false"
    >
      <el-table
        :data="tableData"
        style="width: 100%;font-size:16px;"
        height="300px"
        size="mini"
        v-loading="tableLoading"
        element-tableLoading-text="拼命加载中"
        :show-header="false"
      >
        <el-table-column prop="title"  align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column fixed="right"  width="180">
          <template slot-scope="scope">
            <el-button @click="handleRestore(scope.row.id)" class="btn-backup" type="primary" size="mini">还原</el-button>
            <el-button
              @click="handleDelete(scope.row.id)"
              type="danger"
              :disabled="scope.row.name=='系统默认备份'?true:false"
              size="mini"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button size="small" class="btn-backup" type="primary" @click="handleBackup" :loading="backupLoading">备份</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HeaderLink from "@/components/header-component/HeaderLink";
export default {
  name: "Header",
  components: { HeaderLink },
  data() {
    return {
      id: "",
      tableData: [{ name: "系统默认备份" }],
      dialogVisible: false,
      backupLoading: false,
      tableLoading: false,
      titleArr: [
        {
          name: "首页",
          href: "/"
        },
        {
          name: "课程",
          href: "/courses"
        },
        {
          name: "机构",
          href: "/organization"
        },
        {
          name: "APP",
          href: "/app"
        },
        {
          name: "资讯",
          href: "/informations"
        },
        {
          name: "掠影",
          href: "/glimpse"
        },
        {
          name: "我们",
          href: "/us"
        }
      ]
    };
  },

  methods: {
    navigateTo(path) {
      this.$router.push({ path: path });
    },
    dialogShow() {
      this.backupVisible = true;
    },
    checkRegister() {
      if (
        !localStorage.getItem("id") ||
        localStorage.getItem("id").length === 0
      ) {
        alert("请先登录！");
        this.$router.push({ path: "/login" });
      } else if (this.role === 8) {
        alert("您已入驻，无需重复申请！");
        this.$router.push({ path: "/" });
      } else {
        this.$http
          .get("/api/accounts/login/check")
          .then(async ({ data: { status } }) => {
            if (!status) {
              this.$router.push({ path: "/login" });
              this.$message({
                message: "请先登录",
                type: "error",
                isSingle: true
              });
            } else {
              const {
                data: { enrolls }
              } = await this.$http.get("/api/institutions/enroll/list");
              if (enrolls.length !== 0) {
                this.$alert("请耐心等待审核通过", "您已申请", {
                  confirmButtonText: "确定"
                });
                return;
              }
              this.$router.push({ path: "/organization/register" });
            }
          });
      }
    },

    navigateToAdmin() {
      if (this.$store.getters.role === 99) {
        this.$router.push({ path: "/root-admin" });
      } else if (this.$store.getters.role === 8) {
        this.$router.push({ path: "/institution-admin" });
      } else if (
        this.$store.getters.role === 0 ||
        this.$store.getters.role === 1 ||
        this.$store.getters.role === 2
      ) {
        this.$router.push({ path: "/person" });
      }
    },
    navigateToPre() {
      if (this.$store.getters.role === 99) {
        this.$router.push({ path: "/root-admin/accounts" });
      } else if (this.$store.getters.role === 8) {
        this.$router.push({ path: "/institution-admin/preEnrollStudent" });
      } else if (
        this.$store.getters.role === 0 ||
        this.$store.getters.role === 1 ||
        this.$store.getters.role === 2
      ) {
        this.$router.push({ path: "/person/pre-entry" });
      }
    },
    navigateToPass() {
      if (this.$store.getters.role === 99) {
        this.$router.push({ path: "/root-admin" });
      } else if (this.$store.getters.role === 8) {
        this.$router.push({ path: "/institution-admin" });
      } else if (
        this.$store.getters.role === 0 ||
        this.$store.getters.role === 1 ||
        this.$store.getters.role === 2
      ) {
        this.$router.push({ path: "/person/reset-pwd" });
      }
    },
    logout() {
      this.$router.push({ path: "/logout" });
    },
    handleBackup() {
      this.backupLoading = false;
    }
  },

  computed: {
    isRegisted() {
      const roleList = [4, 8, 99];
      return roleList.some(role => role === this.$store.getters.role);
    },
    role() {
      return this.$store.getters.role || "";
    },
    isUser() {
      if (this.$store.getters.role === 99) {
        return false;
      } else {
        return true;
      }
    },
    isLogin() {
      return (
        this.$store.getters.role !== "" &&
        this.$store.getters.role !== undefined
      );
    },
    userInfo() {
      return this.$store.getters.userInfo || {};
    }
  }
};
</script>

<style scoped>
#header {
  position: fixed;
  width: 100%;
  color: white;
  background-color: #202329;
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  z-index: 999;
}
.btn-backup {
    color: #FFF;
    background-color: #14889A;
    border-color: #14889A;
}
.left,
.right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-family: "SimHei";
  font-size: 30px;
  cursor: pointer;
  margin: 0px 50px;
}
.right button {
  border: 1px #5dd5c8 solid;
  border-radius: 15px;
  background-color: inherit;
  color: white;
  letter-spacing: 1px;
  padding: 0px 9px 0px 11px;
  font-size: 13px;
}
.right button:hover {
  color: #5dd5c8;
  transition: color 0.2s;
}
.right button:focus {
  outline: 0;
}
.drop {
  color: white;
  width: 150px;
  background-color: #202329;
}
.layout {
  border-top-style: solid;
  border-color: white;
}
</style>
