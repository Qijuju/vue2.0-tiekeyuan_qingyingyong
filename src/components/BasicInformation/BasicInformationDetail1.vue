<template>
  <div class="listDetail">
    <!--title-->
    <van-nav-bar
      fixed
      v-bind:title="xmmc"
      @click-left=""
      @click-right=""
    >
      <van-icon name="arrow-left" slot="left" />
      <van-icon name="arrow" slot="right" />
    </van-nav-bar>
    <!--内容-->
    <div class="divscroll">
      <table>
        <tr >
          <td class="tdfixed" style="">批复内容</td>
          <td>完成状态</td>
          <td>批复文号</td>
          <td>批复日期</td>
          <td>进展情况<br/>及问题</td>
          <td>督办要求</td>
          <td>上传下载文件</td>
        </tr>
        <tbody>
          <tr v-for="item in detailData">
            <td v-show="item.pfnr == 0" class="tdfixed">国有土地使用证</td>
            <td v-show="item.pfnr == 1" class="tdfixed">环保验收</td>
            <td v-show="item.pfnr == 2" class="tdfixed">水保验收</td>
            <td v-show="item.pfnr == 3" class="tdfixed">档案验收</td>
            <td v-show="item.pfnr == 4" class="tdfixed">消防验收</td>
            <td v-show="item.pfnr == 5" class="tdfixed">剩余工程</td>
            <td v-show="item.pfnr == 6" class="tdfixed">竣工决算</td>
            <td v-show="item.pfnr == 7" class="tdfixed">立交移交</td>
            <td v-show="item.pfnr == 8" class="tdfixed">安全保护区设立</td>
            <td v-show="item.pfnr == 9" class="tdfixed">资金到位情况</td>
            <td class="fixednext">
              <!--{{item.gytdsyz}}-->
              <span v-show="item.wczt == 0">√</span>
              <span v-show="item.wczt == 1">×</span>
              <span v-show="item.wczt == 2">-</span>
            </td>
            <td>{{item.pfwh}}</td>
            <td>{{item.pfrq}}</td>
            <td>{{item.jzqk}}</td>
            <td>{{item.dbyq}}</td>
            <td>{{item.fj}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <style>
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  </style>
</template>
<script>
  // 引入组件
  import Header from '../Common/Header'
  import $ from 'jquery'
  import { Dialog } from 'vant';

    export default {
      name: "listDetail",
      components: {
        Header
      },
      data(){
        return{
          checked: true,
          gjysid:this.$route.params.gjysid,// 获取通过路由传的值
          xmmc:this.$route.params.xmmc,    //项目名称
          detailData:[],
          popupVisible:false,
          popupTxt:'',
        }
      },
      created(){
        var txtL = this.xmmc.length;
          if(txtL>10){
            this.xmmc = this.xmmc.slice(0,10)+"...";
          }else {
            this.xmmc = this.xmmc;
          }
        this.getData();
      },
      methods:{
        popupClick(txt) { // popup弹出层点击事件
          this.popupVisible = true;
          this.popupTxt = txt;
        },
        getData(){
          let vm = this;
          console.log(this.xmmc);
          let url='http://tljjgxt.r93535.com/GjysbServlet?gjysid='+this.gjysid;
          // let url='http://whjjgc.r93535.com/GjysbServlet?gjysid='+this.gjysid;
          this.$http.get(url).then(
            res=>{
              vm.detailData = res.data;
              console.log("详情页面的数据：" ,vm.detailData);
            },
            res=>{
              console.log('error');
            }
          )
        }
      },
      // mounted:function () {
      //   var txtL = this.xmmc.length;
      //   if(txtL>7){
      //     this.xmmc = this.xmmc.slice(0,8);
      //   }else {
      //     this.xmmc = this.xmmc;
      //   }
      // }
    }
</script>

<style scoped>
  /* 折行显示 */
  .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    overflow: hidden;
  }
  .divscroll{
    overflow: scroll;
    margin-bottom: 50px;
    margin-top: 46px;
  }
  table tr td{
    /*white-space: nowrap;*/
    width: 150px;
    border: 1px solid rgb(187, 187, 187);
    text-align: center;
  }
  table tr  {
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 46px;
    border: 1px solid rgb(187, 187, 187);
  }
  table>:first-child td{
      padding: 0 10px;
    }
  table>:first-child>:nth-child(2){
   padding-left: 130px;
  }{
    padding: 0 10px;
  }
  .tdfixed{
    position : absolute;
    z-index: 0;
    WORD-WRAP: break-word;
    width: 120px;
    text-align: center;
    height: 46px;
    background-color: #fff;
    line-height: 46px;
    border-top: 0px solid rgb(187, 187, 187);
    border-bottom: 0px solid rgb(187, 187, 187);
  }
  .fixednext{
    padding-left: 120px;
  }
</style>
