/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 存储统计详情页项目名称
    staticsObj:{
      xmmc:'',
      gjysid:''
    }

  },
  getters: {
    staticsObj: state => state.staticsObj
  },
  mutations: {
    setStaticsObj: (state, { xmmc,gjysid}) => {
      state.staticsObj.xmmc = xmmc
      state.staticsObj.gjysid = gjysid
    },

    setNearBusinessLineSearch: (state, { xmmc,mc, dj, xingbie, /*sglc,*/ sglx, sgksrq, sgjsrq}) => {
      state.nearBusinessLineSearch.xmmc = xmmc
      state.nearBusinessLineSearch.mc = mc
      state.nearBusinessLineSearch.dj = dj
      state.nearBusinessLineSearch.xingbie = xingbie
      /*state.nearBusinessLineSearch.sglc = sglc*/
      state.nearBusinessLineSearch.sglx = sglx
      state.nearBusinessLineSearch.sgksrq = sgksrq
      state.nearBusinessLineSearch.sgjsrq = sgjsrq
    },
    setNonBusinessLineSearch: (state, { xmmc,mc, /*dj, xingbie, /!*sglc,*!/ sglx,*/ sgksrq, sgjsrq}) => {
      state.nearBusinessLineSearch.xmmc = xmmc
      state.nearBusinessLineSearch.mc = mc
      /*state.nearBusinessLineSearch.dj = dj
            state.nearBusinessLineSearch.xingbie = xingbie
            /!*state.nearBusinessLineSearch.sglc = sglc*!/
            state.nearBusinessLineSearch.sglx = sglx*/
      state.nearBusinessLineSearch.sgksrq = sgksrq
      state.nearBusinessLineSearch.sgjsrq = sgjsrq
    },
    // 选中的项目对象
    setSelectProjectObj: (state, { selectProjectObj}) => { // setBusinessLineSelectProjectName
      console.log("store选中的项目对象：" +JSON.stringify(selectProjectObj));
      state.selectProjectObj = selectProjectObj
    },
    setBusinessLineSelectProjectCount: (state, {count}) => {
      console.log("返回惹人鬼：" +count);
       state.businessLineSelectProjectCount = count
    },
    setProjectCount:(state,{count,year,month,day}) =>{ // 营业线组件传值
      // 根据父组件传过来的年、月、和当前月的天数，循环遍历转换成汉字格式追加到 days 对象中。
      var tempArr=[];
      for (var i=1;i<=count;i++){
        var obj={};
        var dt = new Date(year,parseInt(month-1), i);
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var monthDay = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        obj.day = i;
        obj.weekDay =weekDay[dt.getDay()];
        obj.monthDay = monthDay[month-1];
        obj.showBg = (i===day)?true:false; //判断是都是今天，是为showBg=true,反之，showBg=false。

        tempArr.push(obj);
      }

      state.projectCount = count,
      state.year = year,
      state.month = month,
      state.day = day,
      state.daysObj = tempArr,
      state.scrollLeft = (day-1)*66;// 设置默认滚动距离
      console.log('设置默认滚动距离;'+state.scrollLeft);

    }
  },
  actions: {
    getSong({commit, state}, hash){
      commit('toggleAudioLoadding', true)
      axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(({data}) => {
        data = data.data
        const songUrl = data.play_url
        const imgUrl = data.img
        const title = data.audio_name
        const songLength = data.timelength / 1000
        const singer = data.author_name
        const currentLength = 0;
        const lrc = data.lyrics
        const	audio = {songUrl, imgUrl, title, singer, songLength, currentLength}
        commit('setAudio', audio)
        commit('setLrc', lrc)
        commit('toggleAudioLoadding', false)
      })
    },
    prev({dispatch, state}){
      var list = state.listInfo.songList
      if (state.listInfo.songIndex == 0) {
        state.listInfo.songIndex = list.length
      } else {
        state.listInfo.songIndex--
      }
      var hash = list[state.listInfo.songIndex].hash
      dispatch('getSong', hash)
      dispatch('getLrc', hash)
    },
    next({dispatch, state}){
      var list = state.listInfo.songList
      if (state.listInfo.songIndex == list.length - 1) {
        state.listInfo.songIndex = 0
      } else {
        ++state.listInfo.songIndex
      }
      var hash = list[state.listInfo.songIndex].hash
      dispatch('getSong', hash)
      dispatch('getLrc', hash)
    }
  }
})

export default store
