<template>
  <div>
    <van-nav-bar title="提示" right-text="关闭" @click-right="onClickRight"></van-nav-bar>
    <div class="content">
      当前用户无授权
    </div>
  </div>
</template>

<script>
  import {NavBar} from 'vant';

  export default {
    name: "authfailed",
    data() {
      return {}
    },
    components: {
      NavBar
    },
    methods: {
      // 表头关闭按钮事件
      onClickRight() {
        RPM.closeApplication()
      },
    }
  }
</script>

<style scoped>
  .content {
    padding-top: 10px;
    margin-top: 44px;
    margin-left: 10px;
    font-size: medium;
  }

  /* 设置头部 style start */
  .van-nav-bar {
    background: #2196F3;
    color: #fff;
  }

  .van-nav-bar .van-icon {
    color: #fff;
  }
</style>
