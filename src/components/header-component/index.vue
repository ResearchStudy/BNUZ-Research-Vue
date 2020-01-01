<template>
    <div id="header">
        <div class="left">
            <div class="logo">北师研学</div>
            <div style="display: flex; justify-content: space-between">
                <header-link v-for="title in titleArr" :title="title.name" :href="title.href" :key="title.name"/>
            </div>
        </div>
        <div class="right" style="margin-right: 10px">
            <button style="margin-right: 30px"  @click="$router.push({path: 'organization/register'})">入驻合作</button>
            <button style="margin-right: 17px" @click="navigateTo('/register')" v-if="!isLogin">注册</button>
            <button @click="navigateTo('/login')" v-if="!isLogin">登录</button>
            <a v-if="isLogin" style="cursor: pointer;padding-right: 20px" @click="navigateToAdmin">{{userInfo.nickname}}</a>
            <button @click="logout()" v-if="isLogin">退出登录</button>
        </div>
    </div>
</template>

<script>
import HeaderLink from "@/components/header-component/HeaderLink";
export default {
  name: "Header",
  components: { HeaderLink },
  data() {
    return {
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
    navigateToAdmin() {
      if (this.role === 99) {
        this.$router.push({ path: "/root-admin" });
      } else if (this.role === 8) {
        this.$router.push({ path: "/insitution-admin" });
      } else if (this.role === 0 || this.role === 1 || this.role === 2) {
        this.$router.push({ path: "/person" });
      }
    },
    logout() {
      this.$router.push({ path: "/logout" });
    }
  },
  computed: {
    role() {
      return this.$store.getters.role || "";
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
  width: 100%;
  color: white;
  background-color: #202329;
  height: 60px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
}
.left,
.right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
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
</style>
