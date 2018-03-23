<template>
  <div class="statistics">
    view: {{this.$store.getters.isPlay}}
    <p style="color: #f30;">{{this.$store.getters.businessLineSearch.xmmc}}</p>

    <h1>{{test}}</h1>
  </div>
</template>

<script>
  export default{
    name:'statistics',
    data(){
      return {
        test: ''
      }
    },
    methods: {
    },
    mounted:function () {
      console.log("获取父组件的值："+this.$store.getters.businessLineSearch.xmmc);
      this.test=this.$store.getters.businessLineSearch.xmmc;
    },
    created:function () {
      this.$store.commit('setBusinessLineSearch',{xmmc:'opop'})
      console.log("获取父组件的值22："+this.$store.getters.businessLineSearch.xmmc);
    }

  }
</script>

<style>

</style>
