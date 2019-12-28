<template>
  <div class="address_container">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="margin-top:2px"
    >
      <el-breadcrumb-item :to="{ path: '/person' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改联系地址</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="address_wrap">
      <div class="address_form">
        <el-form
          label-width="100px"
          :model="form"
          ref="form"
          :rules="rules"
        >
          <el-form-item
          >
        <div class="address__title">编辑联系地址</div>

          </el-form-item>
          <el-form-item
            label="联系人"
            prop="contact"
          >
            <el-input
              placeholder="请输入您的真实姓名"
              v-model="form.contact"
              style="margin-bottom:20px;"
            ></el-input>

          </el-form-item>

          <el-form-item
            label="所在地区"
            prop="location"
          >
            <el-cascader
              v-model="form.location"
              placeholder="请选择您所在地区"
              style="float:left;margin-bottom:20px;width:100%"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>

          <el-form-item
            label="详细地址"
            prop="details"
          >
            <el-input
              placeholder="请填写您的详细路面和门牌号"
              v-model="form.details"
              style="margin-bottom:20px"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="phone"
          >
            <el-input
              placeholder="请填写您的手机号码"
              v-model="form.phone"
              style="margin-bottom:20px;"
            ></el-input>
          </el-form-item>
         
          <el-form-item>
            <div class="address_button">  
            <el-button
              style="width:100px "
              type="primary"
              @click="onSubmit"
            >提交</el-button>
            <el-button
              style="width:100px;margin-left:30px"
              @click="handleCancel"
            >取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: "ResetPhone",
  data() {
    let checkPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      console.log(reg.test(value));
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("您的手机格式有误"));
      }
    };

    return {
      form: {},
      location : [],
        options: [{
          value: 'guangdong',
          label: '广东',
          children: [{
            value: 'guangzhou',
            label: '广州',
            children: [{
              value: 'yuexiu',
              label: '越秀区'
            }, {
              value: 'tianhe',
              label: '天河区'
            }]
          }, {
            value: 'shenzhen',
            label: '深圳',
            children: [{
              value: 'futian',
              label: '福田'
            }, {
              value: 'longgang',
              label: '龙岗'
            }]
          }, {
            value: 'zhuhai',
            label: '珠海',
            children: [{
              value: 'xiangzhou',
              label: '香洲'
            }, {
              value: 'doumen',
              label: '斗门'
            }]
        }]
      }],

      rules: {
        contact: [{ required: true, message: "请填写联系人", trigger: "blur" }],
        phone: [
          { required: true, message: "请填写手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        details: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ],
        location: [
          { required: true, message: "请选择你的所在地区", trigger: "blur" }
        ]
      }
    };
  },
  async mounted() {
    
  },

  methods: {
    handleChange(value) {
        console.log(value);
    },
    async handleCancel() {
      window.location.reload();
    },

  }
};
</script>
<style lang="scss" scoped>
.address {
  &__header {
    display: flex;
    width: 100%;
    padding-bottom: 13px;
    background: #fff;
  }
  &_container {
  }
  &_button {
      text-align: center;
  }
  &_wrap {
    margin-top: 20px;
    padding: 10px;
  }
  &__title {
    font-size: 20px;
    text-align: center;
    letter-spacing: 5px;
  }

  &_form {
    float: left;
    width: 40%;
    margin-left: 15%;
    margin-top: 2%;
    text-align: center;
    margin-bottom: 3%;
  }

}
</style>