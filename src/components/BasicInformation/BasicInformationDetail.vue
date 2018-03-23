<template>
  <div class="basicInformationDetail">
    <!--title-->
    <van-nav-bar
      v-bind:title="xmmc"
      left-text="返回"
      @click-left="onClickLeft" right-text="关闭" @click-right="onClickRight"
    >
    </van-nav-bar>
    <!--弹出层-->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <p>{{popupTxt}}</p>
    </mt-popup>

    <el-table
      :data="detailData"
      style="width: 200%;Z-index:9999;text-align: center;margin-bottom: 55px;margin-top: 46px;"
      row-key="id"
      height="528"
      border
    >
      <el-table-column
        fixed
        prop="pfnr"
        label="批复内容"
        width="120">
      </el-table-column>
      <el-table-column
        prop="wczt"
        label="完成状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pfwh"
        label="批复文号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pfrq"
        label="批复日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="jzqk"
        label="进展情况及问题"
        width="120">
      </el-table-column>
      <el-table-column
        prop="dbyq"
        label="督办要求"
        width="120">
      </el-table-column>
      <el-table-column
        label="上传下载文件"
        prop="fj_array"
        width="150">
      <!--<template>-->
          <!--&lt;!&ndash;  <a v-for="item in fj_array" v-show="fj_array" :href="item.fj_url" download="fj" v-html="item.fj_name"></a> &ndash;&gt;-->
        <!--<span>{{fj_array.fj_name}}</span>-->
      <!--</template>-->
        <template scope="scope">
            <a v-for="item in scope.row.fj_array" v-show="scope.row.fj_array" :href="item.fj_url" download="fj" v-html="item.fj_name"></a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  // 引入组件
  import Header from '../Common/Header'
  import $ from 'jquery'
  import { Dialog } from 'vant';

    export default {
      name: "basicInformationDetail",
      components: {
        Header
      },
      data(){
        return{
          checked: true,
          gjysid:this.$store.getters.staticsObj.gjysid,// 获取通过路由传的值
          xmmc:this.$store.getters.staticsObj.xmmc,    //项目名称
          detailData:[],
          popupVisible:false,
          popupTxt:'',
          fjurl:'',
          fjname:'',
        }
      },
       mounted:function () {
         this.getData();
       },
      watch: {
        $route: function (to, from) {
          // console.log("2222222watch函数............")

          if(to.path == '/BasicInformation/detail'){
            let obj={};
            obj = to.query;

            // console.log("获取的标题:"+JSON.stringify(obj));

            if(!this.isEmptyObject(obj)){
              this.gjysid =obj.gjysid;
              this.xmmc = obj.xmmc;
              this.getData();
            }
          }
        },
      },
      methods:{
        isEmptyObject(e) {
          var t;
          for (t in e)
            return !1;
          return !0
        },
        // popupClick(txt) { // popup弹出层点击事件
        //   console.log("11111111111111111");
        //   this.popupVisible = true;
        //   this.popupTxt = txt;
        // },
        onClickLeft() {
          this.popupVisible = false;
          this.$router.push({path: '/BasicInformation/BasicInformationIndex'});
        },
        // 表头关闭按钮事件
        onClickRight() {
          RPM.closeApplication()
        },
        createFujianArray(field,array){
          if (field) {
            var arr = field.split(",")
            for (var i = 0; i < arr.length; i++) {
              if (arr[i]) {
                var item = arr[i].split("|")
                if (item && item.length == 2) {
                  var obj = {
                    fj_name: item[1],
                    fj_url: 'http://tljjgxt.r93535.com/FujianXiazai?fileid=' + item[0] + '&filename=' + encodeURIComponent(item[1])
                  };
                  array.push(obj);
                }
              }
            }
          }
        },
        getData(){
          let vm = this;
          let url='http://tljjgxt.r93535.com/GjysbServlet?gjysid='+this.gjysid;
          // let url='http://whjjgc.r93535.com/GjysbServlet?gjysid='+this.gjysid;
          this.$http.get(url).then(
            res=>{

              console.log("hahah:" +res.data);

              vm.detailData = res.data;

              console.log("shuju", JSON.stringify( vm.detailData));
              vm.detailData.forEach(function (value,index,array) {
                 //value.fj = "374|路局门户采集数据信息.docx"// "27|项目信息收集表.xlsx,27|项目信息收集表.xlsx,27|项目信息收集表.xlsx"
                console.log("******************************"+JSON.stringify(value));
                switch (value.wczt){
                  case '0':
                    value.wczt = '√';
                    break;
                  case '1':
                    value.wczt = '×';
                    break;
                  case '2':
                    value.wczt = '-';
                    break;
                }
                if (value.fj) {
                  value.fj_array = [];
                  vm.createFujianArray(value.fj, value.fj_array)
                }
                console.log("附件id：",value.fj_array);
                // if(value.fj.length){
                //   value.fjarray =  value.fj.split(",");
                //   for(var i=0;i<value.fjarray.length;i++){
                //     value.fjarrayaa[i] = {};
                //     value.fjarray[i] = value.fjarray[i].split("|");
                //     value.fjarrayaa[i].fjurl = 'http://tljjgxt.r93535.com/FujianXiazai?fileid='+value.fjarray[i][0]+'&filename='+value.fjarray[i][1];
                //     value.fjarrayaa[i].fjname= value.fjarray[i][1];
                //     value.fjarray[i] = [];
                //     value.fjarray[i].push(value.fjarrayaa[i]);
                //   }
                // }
              });
              console.log("数据：",JSON.stringify( vm.detailData));
              var _this = this;
              function popupClick(txt) { // popup弹出层点击事件
                _this.popupVisible = true;
                _this.popupTxt = txt;
                console.log("saduedfbuhvbsdfhkbdfjdvbjsdvbjfk",txt)
              }
              $(".van-nav-bar__title").click(function(){
                popupClick(_this.xmmc);
              });
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
  .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
  .el-table .cell,
  .el-table th div,
  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell {
    padding-left: 10px;
    text-align: center;
  }
  .el-table th .is-leaf .cell{
    font-weight: 400;
    color: #000;
  }
  .el-table tr td{
    padding: 0;
  }
  .el-table td, .el-table th{
    border: 1px solid #ebeef5;
  }
  .el-table .cell{
    text-align: center;
  }

  .van-nav-bar .van-icon {
    color: #fff;
  }
  /* popup */
  .mint-popup{
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding:5px;
  }
</style>
