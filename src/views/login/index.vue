<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
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
      <el-button type="primary" class="login-submit">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const validatePassword = (rule, value, callback) => {
  if (!value) return callback(new Error('请输入密码'))
  if (value.length < 6) return callback(new Error('密码不能少于6位'))
  callback()
}

const loginForm = ref({
  username: 'superAdmin',
  password: '123456'
})

const passwordType = ref('password')

const loginRules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, validator: validatePassword, trigger: 'blur' }]
})

const passwordTypeChange = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

const eyeIcon = computed(() =>
  passwordType.value === 'password' ? 'eye' : 'eye-open'
)
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

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        height: 47px;
        background: transparent;
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
