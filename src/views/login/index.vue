<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      ref="loginFormRef"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="请输入用户名"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="请输入密码"
          :type="passwordType"
          v-model="loginForm.password"
        ></el-input>
        <span class="show-pwd" @click="passwordTypeChange">
          <svg-icon :icon="eyeIcon"></svg-icon>
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        type="primary"
        class="login-submit"
        size="large"
        :loading="loading"
        @click="loginSubmit(loginFormRef)"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect/index.vue'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const loginFormRef = ref()

const i18n = useI18n()
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    return callback(new Error(i18n.t('msg.login.passwordRule')))
  }
  callback()
}

const loginForm = ref({
  username: 'superAdmin',
  password: '123456'
})

const passwordType = ref('password')

const loginRules = ref({
  username: [
    {
      required: true,
      message: i18n.t('msg.login.usernameRule'),
      trigger: 'blur'
    }
  ],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})

const loading = ref(false)
const store = useStore()
// 计算属性-密码类型Icon
const eyeIcon = computed(() =>
  passwordType.value === 'password' ? 'eye' : 'eye-open'
)
// 点击切换密码显示类型
const passwordTypeChange = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
// 点击登录
const loginSubmit = (formEl) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (!valid) return
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        ElMessage.success('登录验证通过！')
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
$bg: #2b3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        height: 47px;
        background: transparent;
        border: none;
        border-radius: 0px;
        // padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
      }

      .el-input__wrapper {
        width: 100%;
        height: 47px;
        background: transparent;
        box-shadow: none;

        border: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
      }
    }

    .login-submit {
      width: 100%;
      margin-bottom: 30px;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep(.lang-select) {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
