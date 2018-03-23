<template>
  <div class="basic-information-search">
    <div class="basic-information-search-header" >
      <van-nav-bar title="国家验收" right-text="关闭" @click-right="onClickRight">
      </van-nav-bar>
    </div>
    <div class="mainB">

      <div class="divscroll">
        <ul id="title">
          <li>项目管理机构</li>
          <li>项目名称</li>
          <li>国验申请计划上报时间</li>
          <li>国有土地使用证</li>
          <li>环保验收</li>
          <li>水保验收</li>
          <li>档案验收</li>
          <li>消防验收</li>
          <li>剩余工程</li>
          <li>竣工决算</li>
          <li>立交移交</li>
          <li>安全保护区设立</li>
          <li>资金到位情况</li>
        </ul>

        <ul id="content" v-bind:style="{width: setWidth + 'px' }">
        <li>
          <table v-bind:style="{width:settableWidth+'px'}">
          <tr>
            <td v-for="item in baseInfoList" v-html="item.xmgljgmc"></td>
          </tr>
        </table>
        </li>
        <li>
          <table v-bind:style="{width:settableWidth+'px'}" >
            <tr>
              <td v-for="item in baseInfoList" @click="handleRowHandle(item.gjysid,item.allxmmc)" :class="[ item.gjysid ? 'iscolor':0]" v-html="item.xmmc"></td>
            </tr>
          </table>
        </li>
        <li style="margin-top: -1px;margin-bottom: 1px;">
          <table v-bind:style="{width:settableWidth+'px'}">
            <tr >
              <td v-for="item in baseInfoList" v-html="item.gysqjhsbsj"></td>
            </tr>
          </table>
        </li>
        <li class="judge">

          <div id="judge" v-for="(item,index) in baseInfoList">
            <p v-for="itemss in item.gjysxq">
              <span v-show="itemss.wczt == 0 ">√</span>
              <span v-show="itemss.wczt == 1 ">×</span>
              <span v-show="itemss.wczt == 2 ">—</span>
              <span v-show="itemss.wczt != 1 && itemss.wczt != 0">—</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>

</template>

<script>
    import { NavBar,Toast,Waterfall } from 'vant'
    import $ from 'jquery'
    import axios from 'axios';

    export default {
      name: "basic-information-index",
      components: {
      },
      directives: {
        WaterfallLower: Waterfall('lower'),
      },
      data() {
        return {
          //初始化参数
          xmgljg:'',
          xmmc:'',
          allxmmc:'',
          gysqjhsbsj:'',
          gjysxq:[],
          gytdsyz:'',
          hbys:'',
          sbys:'',
          daysss:'',
          xfys:'',
          sygc:'',
          jgjs:'',
          ljyj:'',
          aqbhqsl:'',
          zjdwqk:'',
          baseInfoList: [],
          gjysid:'',
          setWidth:document.body.clientWidth-150,
          settableWidth:'2000',
        }
      },
      methods: {
        isEmptyObject(e) {
          var t;
          for (t in e)
            return !1;
          return !0
        },
        // 表头关闭按钮事件
        onClickRight() {
          RPM.closeApplication()
        },
        loadMore(){
            //var url = 'http://tljjgxt.r93535.com/GjysListServlet?userid=126060';
            var url = 'http://tljjgxt.r93535.com/GjysListServlet?userid='+this._GLOBAL.baseUserId;
            // var url = 'http://whjjgc.r93535.com/GjysListServlet?userid=223906';
            axios.get(url)
              .then(response => {
                var obj= response.data;
                console.log("数据：",response.data);
                var num = obj.length;
                this.settableWidth = num * 200;
                obj.forEach(function (value,index,array) {
                  for(var i = 0;i<10;i++){
                    if(!value.gjysxq[i]){
                      value.gjysxq[i] = '2';
                    }
                  }
                  value.allxmmc = value.xmmc;
                  if(value.xmmc.length>8){
                    value.xmmc = value.xmmc.slice(0,8)+"..."
                  }
                });
                for(var i in obj) {
                  this.baseInfoList.push(obj[i])
                }

              }).catch(err => {
              console.error(err.message)
            })
        },
        handleRowHandle(gjysid,xmmc) {

          let query ={
            gjysid:gjysid,
            xmmc:xmmc
          };
          if(gjysid){
            this.$store.commit('setStaticsObj',{xmmc:xmmc,gjysid:gjysid});
            this.$router.push({path:'/BasicInformation/detail',query: query});
          }else {
            return;
          }
        }
      },
      created(){
        this.loadMore();

      }
    }
</script>

<style scoped>
  .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
  .mainB{
    margin-top:44px;
  }
  .divscroll{
    position: relative;
  }
  ul{
    position: absolute;
    /*top:44px;*/
    float: left;
    /*border: 1px solid #ccc;*/
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  ul> li{
    text-align: center;
  }
  ul#title{
    left: 0px;
    width:154px;
    overflow: scroll;
    color: #909399;
  }
  ul#title>li{
    height:46px;
    text-align: center;
    line-height: 46px;
    font-weight: bold;
    border-top:1px solid #ccc;
  }
  ul#content{
    left: 155px;
    margin-bottom: 55px;
    margin-left: -2px;
    /*margin-top:-1px;*/
    overflow: scroll;
    color: #606266;
  }
  ul#content>li{
    margin-left:-1px;
  }
  table{
    /*width:2000px;*/
  }
  table tr{
   border-top:1px solid #ccc;
   margin-top: -1px;
   margin-left: -1px;
 }
  table tr>td{
    width: 150px !important;
    height:46px;
    text-align: center;
    line-height: 46px;
    border: 0;
    border-left: 1px solid #ccc;
    margin-left: -1px;
  }
  table tr>td:first-child{
    border-left:0;
  }
  /* 判断 */
  ul#content>li.judge{
    margin-left:0px;
    width:2000px;
  }
  #judge{
    width:200px;
    float: left;
  }
  #judge>p{
    width:100%;
    height: 46px;
    line-height: 46px;
    border-top:1px solid #ccc;
    border-right:1px solid #ccc;
  }
  #judge>p:first-child{
    margin-top: -1px;
  }
  #judge:last-child>p{
    border-right: 0;
  }

  /*可点击样式*/
  .iscolor{
    color: rgb(0, 135, 232);
  }


</style>
