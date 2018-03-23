<template>
  <div class="1">

    <!-- 施工日计划我已审批筛选-表头-开始 -->
    <van-nav-bar title="筛选" left-text="返回" right-text="筛选"  @click-left="onClickLeft" @click-right="onClickRight">
    </van-nav-bar>
    <div v-show="doneWorkIsShow===true">
      <van-cell><h4>是否审批</h4></van-cell>
      <van-radio-group v-model="isArchived">
        <van-cell-group>
          <van-cell><van-radio name="false">审批中</van-radio></van-cell>
          <van-cell><van-radio name="true">已审批</van-radio></van-cell>
        </van-cell-group>
      </van-radio-group>
      <!--<mt-radio
        title="是否审批"
        v-model="isArchived"
        :options=archive_options>
      </mt-radio>-->
    </div>
    <van-cell><h4>筛选条件</h4></van-cell>
    <van-radio-group v-model="workflowId">
      <van-cell-group>
        <van-cell><van-radio name="119">国家验收</van-radio></van-cell>
      </van-cell-group>
    </van-radio-group>
    <!--<mt-radio
      title="筛选选项"
      v-model="filter"
      :options=options>
    </mt-radio>-->
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from 'axios';
  import { NavBar,Radio  } from 'vant';

  export default {
    name:'HomeFilter',
    data() {
      return {
        doneWorkIsShow:false,
        isArchived:'false',
        workflowId:'119',
      }
    },
    mounted: function() {
      var data = this.$route.query
      this.doneWorkIsShow=data.doneWorkIsShow
      this.isArchived=""+data.isArchived
    },
    watch: {
      $route: function (to, from) {
        console.log("watch函数............")
        if(to.path==='/Home/filter'){
          var data = to.query;
          this.doneWorkIsShow=data.doneWorkIsShow
          this.isArchived=""+data.isArchived
        }
      }
    },
    methods: {
      // 表头返回按钮事件
      onClickLeft() {
        // Toast('返回');
        this.$router.push({path: '/Home'});
      },
      // 表头关闭按钮事件
      onClickRight() {
        var query;
        if(this.doneWorkIsShow===true){
            query={
              isArchived:this.isArchived,
              workflowId:this.workflowId
            }
        }else{
          query={
            workflowId:this.workflowId
          }
        }
        this.$router.push({path: '/Home',query:query});
      },

      //  点击审批状态事件
      onClickStatus(data){
        //向我已审批页面展示-传递流程类型id 变量名van-button--normal
        this.$router.push({path: '/Home'});
      },

      //  点击营业线施工日计划选择按钮事件
      onClickSgrjh(data){
        var typeId = '';
        //向我已审批页页面展示-传递流程类型id 变量名van-button--normal
        //流程类型id  51营业线 52临近营业线 53非营业线
        if(data != null && data == '1'){
          typeId = '51';
        }else if(data != null && data == '2'){
          typeId = '52';
        }else if(data != null && data == '3'){
          typeId = '53';
        }else{
          typeId = '';
        }
        bus.$emit('van-button--normal',typeId)
        this.$router.push({path: '/Home'});
      },

    }
  };
</script>

<style scoped>
  /* 施工日计划我已审批筛选-选择条件-样式 */
  .van-button--default {
    margin: 10px 0px 0px 10px;
  }
  /* 施工日计划我已审批筛选-类型标题-样式 */
  h1{
    /*font: 0.4em sans-serif;*/
    font: 0.9em sans-serif;
    margin: 10px 0px 0px 20px;
  }










</style>
