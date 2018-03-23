<template>
  <div class="index">
    <!-- title -->
    <!--<Header title="国家验收"></Header>-->
    <van-nav-bar title="国家验收" right-text="关闭" @click-right="onClickRight" fixed></van-nav-bar>
    <!--搜索栏-->
    <div class="tabs">
      <van-tabs @click="handleTabClick">
        <van-tab :title="'待我审批('+count+')'">
        </van-tab>
        <van-tab :title="'我已审批'">
        </van-tab>
        <van-tab :title="'我发起的'">
        </van-tab>
      </van-tabs>
      <div class="search">
        <div class="condition" @click="changStyle(0)">
          <img v-if="searchTab1" src="../../assets/images/images/searchg.png" alt="searchLogo">
          <img v-else="false" src="../../assets/images/images/search.png" alt="searchLogo">
          搜索
        </div>
        <div class="condition" @click="changStyle(1)">
          <img v-if="searchTab2"src="../../assets/images/images/sxg.png" alt="searchLogo">
          <img v-else="false" src="../../assets/images/images/sx.png" alt="searchLogo">
          筛选
        </div>
      </div>
    </div>

    <!-- 要滚动的内容 -->
    <scroller :on-infinite="infinite" :on-refresh="refresh" ref="myscroller">
      <div class="list" v-if="toDoWorkIsShow">
        <div class="listItem" v-for="item in ToDoWorkflowList" >
          <div @click="toDetail(item.url)">
          <p>流程标题：{{item.requestName}}</p>
          <p>流程类型：{{item.workflowName}}</p>
          <p>流程状态：{{item.currentNodeName}}</p>
          <p>审批人：{{item.creatorName}}</p>
          </div>
        </div>
      </div>
      <div class="list" v-if="doneWorkIsShow">
        <div class="listItem" v-for="item in ToDoWorkflowList">
          <div @click="toDetail(item.url)">
          <p>流程标题：{{item.requestName}}</p>
          <p>流程类型：{{item.workflowName}}</p>
          <p>流程状态：{{item.currentNodeName}}</p>
          <p>审批人：{{item.creatorName}}</p>
          </div>
        </div>
      </div>
      <div class="list" v-if="iStartedIsShow">
        <div class="listItem" v-for="item in ToDoWorkflowList">
          <div @click="toDetail(item.url)">
          <p>流程标题：{{item.requestName}}</p>
          <p>流程类型：{{item.workflowName}}</p>
          <p>流程状态：{{item.currentNodeName}}</p>
          <p>审批人：{{item.creatorName}}</p>
          </div>
        </div>
      </div>
    </scroller>
    <iframe  style="margin-top:93px;width:100%;height:1000px;display:none" :src="sessionUrl"></iframe>
    <!--<iframe  style="margin-top:93px;width:100%;height:1000px;display:none" src="http://whjjgc.r93535.com:89/verifyLogin.do?loginid=419448de-aaa3-44d4-99b8-8002a5efe029"></iframe>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios';
  import Header from '../Common/Header'
  import VueScroller from 'vue-scroller'
//  import Footer from '../Common/Footer'
  Vue.use(VueScroller)


  export default {
    name: "index",
    data(){
      return{
        sessionUrl:'http://tljjgxt.r93535.com:89/verifyLogin.do?loginid='+this._GLOBAL.loginId,
        active: 0,     // 默认选中的tab的下标
        count:3,       // 待我审批的数量
        pageNo : 1,   // 请求页码
        pageSize:7, // 每页请求数据的条数
        requestName:'',
        workflowTypeId:30,// 流程分类id 。 17代表：开工标准化； 18代表：安全风险管理
        workflowId:119,
        ToDoWorkflowList: [],  // 待办流程列表数据
        searchTab1:false,
        searchTab2:false,
        baseuserId:222423,
        noData: '',
        toDoWorkIsShow:true,
        doneWorkIsShow:false,
        iStartedIsShow:false,
        isArchived:false
      }
    },
    components:{
      Header,
      VueScroller
//      Footer
    },
    mounted:function () {
      this.getCount();
      this.getToDoWorkflowList(); // 获取‘待我审批’字典
      /*$('.p').each(function (i) {
        var txtL=$($('.p')[i]).text().length;
        if(txtL>8){
          $($('.p')[i]).addClass('wordBreak')
        }else {
          $($('.p')[i]).removeClass('wordBreak')
        }
      })*/
    },
    watch: {
      $route: function (to, from) {
        console.log("watch函数............")
        if(to.path==='/Home'){
          var data = to.query;
          if(from.path==='/Home/search'){
            if(data.requestName!=undefined){
              this.requestName=data.requestName
            }
            this.getToDoWorkflowList(); // 获取‘待我审批’字典
          }
          if(from.path==='/Home/filter'){
            if(this.doneWorkIsShow===true&&data.isArchived==='true'){
              this.isArchived=true
            }else{
              this.isArchived=false
            }
            if(data.workflowId!=undefined){
              this.workflowId=data.workflowId
            }
            this.getToDoWorkflowList();
          }
          if(from.path==='/Home/detail'){
            this.getToDoWorkflowList();
          }
        }
      }
    },
    methods:{
      toDetail(url){
        var query={
          url:url
        }
        this.$router.push({path:'/Home/detail',query:query});
      },
      // 表头关闭按钮事件
      onClickRight() {
        RPM.closeApplication()
      },
      // 获取‘待我审批’字典
      getToDoWorkflowList(){
        let vm = this;
        vm.pageNo = 1;
        var url = this.getUrl()
        //var url = 'http://whjjgc.r93535.com/GetToDoWorkflowList?baseuserId='+ vm.baseuserId+'&pageNo='+vm.pageNo+'&workflowTypeId='+ vm.workflowTypeId+'&pageSize=' + vm.pageSize;
        axios.get(url).then(response => {
          vm.ToDoWorkflowList = response.data;
          console.log("待我审批的列表数据："+JSON.stringify(vm.ToDoWorkflowList));
        }).catch(err => {
          console.error(err.message)
        })
      },
      getUrl(){
        var url=''
        if(this.toDoWorkIsShow===true){
          url= 'http://tljjgxt.r93535.com/GetToDoWorkflowList?baseuserId='+ this._GLOBAL.baseUserId+'&pageNo='+this.pageNo+'&workflowTypeId='+ this.workflowTypeId+'&pageSize=' + this.pageSize+'&requestName=' + this.requestName+'&workflowId=' + this.workflowId;
          // url= 'http://whjjgc.r93535.com/GetToDoWorkflowList?baseuserId='+ this.baseuserId+'&pageNo='+this.pageNo+'&workflowTypeId='+ this.workflowTypeId+'&pageSize=' + this.pageSize+'&requestName=' + this.requestName+'&workflowId=' + this.workflowId;
        }
        if(this.doneWorkIsShow===true){
          if(this.isArchived===false){
            url='http://tljjgxt.r93535.com/DoWorkflowListPCServlet?pageNo='+this.pageNo+'&pageSize='+this.pageSize+'&userId='+this._GLOBAL.baseUserId+'&workflowTypeId='+this.workflowTypeId+'&requestName=' + this.requestName+'&workflowId=' + this.workflowId;
            // url='http://whjjgc.r93535.com/DoWorkflowListPCServlet?pageNo='+this.pageNo+'&pageSize='+this.pageSize+'&userId='+this.baseuserId+'&workflowTypeId='+this.workflowTypeId+'&requestName=' + this.requestName+'&workflowId=' + this.workflowId;
          }else{
            url='http://tljjgxt.r93535.com/YiDoWorkflowListPCServlet?pageNo='+this.pageNo+'&pageSize='+this.pageSize+'&userId='+this._GLOBAL.baseUserId+'&workflowTypeId='+this.workflowTypeId+'&requestName=' + this.requestName+'&workflowId=' + this.workflowId;
            // url='http://whjjgc.r93535.com/YiDoWorkflowListPCServlet?pageNo='+this.pageNo+'&pageSize='+this.pageSize+'&userId='+this.baseuserId+'&workflowTypeId='+this.workflowTypeId+'&requestName=' + this.requestName+'&workflowId=' + this.workflowId;
          }
        }
        if(this.iStartedIsShow===true){
            url='http://tljjgxt.r93535.com/MyWorkflowRequestList?pageNo='+this.pageNo+'&pageSize='+this.pageSize+'&userId='+this._GLOBAL.baseUserId+'&workflowTypeId='+this.workflowTypeId+'&requestName=' + this.requestName+'&workflowId=' + this.workflowId;
            // url='http://whjjgc.r93535.com/MyWorkflowRequestList?pageNo='+this.pageNo+'&pageSize='+this.pageSize+'&userId='+this.baseuserId+'&workflowTypeId='+this.workflowTypeId+'&requestName=' + this.requestName+'&workflowId=' + this.workflowId;
        }
        console.log(url)
        return url
      },
      // 刷新首页数据
      refresh(done) {
        let vm= this;
        vm.getToDoWorkflowList(); // 调用请求首页数据的方法
        setTimeout(() => {
          this.$refs.myscroller.resize(); // 加载图标1.5s后消失
        }, 1500)
        done() // call done
      },

      // 加载更多
      infinite(done) {
        if(this.noData) {
          setTimeout(()=>{
            this.$refs.myscroller.finishInfinite(2);
          })
          return;
        }
        let vm = this;
        vm.pageNo++;
        var url=this.getUrl()
        //var url = 'http://whjjgc.r93535.com/GetToDoWorkflowList?baseuserId='+ vm.baseuserId+'&pageNo='+vm.pageNo+'&workflowTypeId='+ vm.workflowTypeId+'&pageSize=' +vm.pageSize;
        axios.get(url).then((response) => {
          let arr = response.data; // 请求数据的条数
          setTimeout(() => {
            if(arr.length < vm.pageSize) {
              vm.noData = "没有更多数据"
            }else {
              // 将新的数据源追加都数据源列表中
              if(arr!==''&&arr!==null&&arr!==undefined){
                for(var i=0;i<arr.length;i++){
                  let obj={};
                  obj["creatorName"] = arr[i].creatorName;
                  obj["currentNodeName"] = arr[i].currentNodeName;
                  obj["receiveTime"] = arr[i].receiveTime;
                  obj["requestId"] = arr[i].requestId;
                  obj["requestName"] = arr[i].requestName;
                  obj["url"] = arr[i].url;
                  obj["workflowName"] = arr[i].workflowName;
                  obj["workflowNewFlag"] = arr[i].workflowNewFlag;
                  obj["workflowTypeId"] = arr[i].workflowTypeId;
                  vm.ToDoWorkflowList.push(obj);
                }
              }else {
                return;
              }
            }
            vm.$refs.myscroller.resize();
            done()
          }, 1000);
        }, (response) => {
          console.log('error');
        });
      },
      //待我审批、我已审批、我发起的 点击事件
      handleTabClick(index) {
        let  vm=this;
        vm.active = index;
        switch (index){
          case 0:
            vm.toDoWorkIsShow = true;
            vm.doneWorkIsShow = false;
            vm.iStartedIsShow = false;
            this.getToDoWorkflowList()
            break;
          case 1:
            vm.toDoWorkIsShow = false;
            vm.doneWorkIsShow = true;
            vm.iStartedIsShow = false;
            this.getToDoWorkflowList()
            break;
          case 2:
            vm.toDoWorkIsShow = false;
            vm.doneWorkIsShow = false;
            vm.iStartedIsShow = true;
            this.getToDoWorkflowList()
            break;
          default:
            break;
        }
      },
      // 获取待我审批的数量
      getCount(){
        let vm = this;
        let url = 'http://tljjgxt.r93535.com/GetToDoWorkflowCount?baseuserId='+this._GLOBAL.baseUserId+'&workflowTypeId='+this.workflowTypeId;
        // let url = 'http://whjjgc.r93535.com/GetToDoWorkflowCount?baseuserId='+this.baseuserId+'&workflowTypeId='+this.workflowTypeId;
        vm.$http.get(url).then((response) => {
          vm.count = response.data;
        }, (response) => {
          console.log('error');
        });
      },
      // 搜索+筛选的点击事件
      changStyle(num){
        // 设置字体颜色
        $($('.condition')[num]).css({
          'color':'#0087e8',
        }).siblings().css({
          'color':'#333',
        })

        if (num===0){
          var query={
            toDoWorkIsShow:this.toDoWorkIsShow,
            doneWorkIsShow:this.doneWorkIsShow,
            iStartedIsShow:this.iStartedIsShow,
          }
          this.$router.push({path:'/Home/search',query:query});
          this.searchTab1 = true;
          this.searchTab2 = false;

        }else if (num===1){
          /*this.$store.commit('setHomeFilter',{doneWorkIsShow:this.doneWorkIsShow,isArchived:this.isArchived});*/
          var query={
            doneWorkIsShow:this.doneWorkIsShow,
            isArchived:this.isArchived
          }
          this.$router.push({path:'/Home/filter',query:query});
          this.searchTab1 = false;
          this.searchTab2 = true;
        }
      },


    }
  }
</script>

<style scoped>
  /* tabs 标签栏 start */
  .tabs{
    position: fixed;
    top:46px;
    left:0px;
    width:100%;
    z-index:3;
    background: #E5F2FA;
  }
  .search > .condition{
    display: inline-block;
    width:50%;
    height:44px;
    text-align: center;
    line-height:44px;
    border:1px solid #ccc;
  }
  .search > .condition:last-child{
    border-left:none;
    margin-left:-4px;
  }
  .search > .condition >img{
    width:20px;
    height:20px;
    vertical-align: middle;
  }

  /* 列表 start */
  .list{
    margin-bottom:80px;
    margin-top: 50px;
  }
  .list > .listItem{
    margin:10px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding:5px;
    -webkit-box-shadow:  0px 0px 5px 1px #ccc;
    -moz-box-shadow:    0px 0px 5px 1px #ccc;
    box-shadow:    0px 0px 5px 1px #ccc;

  }
  .list > .listItem > p{
    height:20px;
    line-height:20px;
    text-align: left;
  }
  /* 列表 end */
  .van-tab{
    background-color: #E5F2FA;
  }
  .van-tabs__nav{
    background-color: #E5F2FA;
  }
</style>
