<template>
  <div class="index">
    <h1>首页</h1>
    <button @click="add">add</button>
    <button @click="decrease">decrease</button>
    <button @click="oddAdd">oddAdd</button>
    <div>{{count}}</div>
    <div>{{getOdd}}</div>
  </div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'

    export default {
      name: "index",
      // 得到计算后的值
      computed:mapGetters(['count','getOdd']),
      // 发生点击事件触发不同的函数
      methods:mapActions(['add','decrease','oddAdd']),
      data(){
        return{

        }
      }
    }
</script>

<style scoped>

</style>
