<!--<template>-->
  <!--<van-tabbar v-model="active">-->
    <!--&lt;!&ndash;<van-tabbar-item icon="pending-evaluate" to="/Index">首页</van-tabbar-item>&ndash;&gt;-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/Index">-->
      <!--<span>首页</span>-->
      <!--<template slot="icon" slot-scope="props">-->
        <!--<img :src="props.active ? icon.active : icon.normal" />-->
      <!--</template>-->
    <!--</van-tabbar-item>-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/BasicInformation/BasicInformationIndex">统计</van-tabbar-item>-->
    <!--&lt;!&ndash;<van-tabbar-item icon="pending-evaluate" to="/OperationCondition/OperationConditionIndex">运行情况</van-tabbar-item>&ndash;&gt;-->
  <!--</van-tabbar>-->
<!--</template>-->

<!--<script>-->
  <!--import { Tabbar, TabbarItem } from 'vant';-->
    <!--export default {-->
      <!--name: "Tabbar",-->
      <!--data() {-->
        <!--return {-->
          <!--active: 0,-->
          <!--icon:{-->
            <!--normal: '../../assets/images/sgrjhImages/tj.png',-->
            <!--active: '../../assets/images/sgrjhImages/tjg.png'-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--.van-tabbar{-->
    <!--z-index: 8;-->
  <!--}-->

<!--</style>-->

<template>
  <div class="footer">
    <mt-tabbar v-model="selectedTab" fixed>
      <mt-tab-item id="首页">
        <img v-if="selectedTab==='首页'" slot="icon" src="../../assets/images/sgrjhImages/syg.png" >
        <img v-else slot="icon" src="../../assets/images/sgrjhImages/sg.png" >
        首页
      </mt-tab-item>
      <mt-tab-item id="统计">
        <img v-if="selectedTab==='统计'" slot="icon" src="../../assets/images/sgrjhImages/tjg.png" >
        <img v-else slot="icon" src="../../assets/images/sgrjhImages/tj.png" >
        统计
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  export default {
    name: "footer",
    data() {
      return {
        selectedTab:'首页',
        selected:false
      }
    },
    watch:{
      selectedTab(newVal,oldVal){
        switch (newVal){
          case '首页':
            this.$router.push({path: '/Home'});
            break;
          case '统计':
            this.$router.push({path: '/BasicInformation/BasicInformationIndex'});
            break;
        }
      }
    },
    methods:{
    }
  }
</script>

<style scoped>
  .mint-tabbar > .mint-tab-item.is-selected{
    background-color:#fff;
  }
  .van-tabbar{
    z-index: 8;
  }

</style>
