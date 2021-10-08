<template>
  <div>
    <a-drawer
        title="感谢下载Edgeless Hub"
        placement="bottom"
        :closable="true"
        :visible="drawerVisible"
        @close="onCloseDrawer"
    >
      <p>我们强烈建议您阅读Wiki后再使用Edgeless，在这里有大部分问题的解决方案和所有的Edgeless特色功能</p>
      <a-button type="primary" @click="goto('https://wiki.edgeless.top/v2/required.html')">好</a-button>
    </a-drawer>
    <a-layout>
      <a-layout-header style="background-color: white">
        <a-space>
          <img class="logo" src="https://home.edgeless.top/favicon.ico"/>
          <p class="title">&nbsp;&nbsp;&nbsp;&nbsp;Edgeless</p>
          <a-menu
              mode="horizontal"
              :default-selected-keys="['3']"
              :style="{ lineHeight: '64px' }"
              :selectable="false"
          >
            <a-menu-item key="1">
              <a target="_blank" href="https://home.edgeless.top">首页</a>
            </a-menu-item>
            <a-menu-item key="2">
              <a target="_blank" href="https://wiki.edgeless.top">文档</a>
            </a-menu-item>
            <a-menu-item key="3">
              下载
            </a-menu-item>
          </a-menu>
        </a-space>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px;background-color: white">
        <a-alert
            v-if="!enable_download"
            message="Edgeless Hub只能在Windows10 64位系统上运行，我们视能够日常使用此版本Windows系统的电脑为Edgeless的硬件准入门槛"
            banner
            closable
        />
        <Notice channel="Down"/>
        <a-result>
          <template slot="title">
            Edgeless Hub
            <a-tag color="blue" @click="goto('https://wiki.edgeless.top/v2/global/log.html#edgeless-hub更新日志-当前已发布最新版本-hub-beta',true)">Beta {{hub_version}}</a-tag>
          </template>
          <template slot="subTitle">
            使用Edgeless聚合客户端制作启动盘和个性化您的Edgeless
          </template>
          <img src="https://pineapple.edgeless.top/picbed/down/1.jpg" slot="icon" class="display_img"/>
          <template #extra>
            <a-space direction="vertical">
              <a-space>
                <template v-if="enable_download">
                  <a-button key="console" type="primary" @click="onClickHubDownload">立即下载</a-button>
                </template>
                <template v-else>
                  <a-button key="console" type="primary" @click="goto('https://wiki.edgeless.top/v2/guide/burn_manual.html')">手动制作</a-button>
                </template>
                <a-dropdown-button v-on:click="stationAlert('https://zfile.edgeless.top/2/main')">
                  访问网页版
                  <a-icon slot="icon" type="down" />
                  <a-menu slot="overlay">
                    <a-menu-item key="0" v-on:click="stationAlert('https://home.edgeless.top/jump/lurenjia.html')"> <a-icon type="hdd" />访问备用站</a-menu-item>
                    <a-menu-item key="1" v-on:click="stationAlert('https://home.edgeless.top/jump/189.html')"> <a-icon type="cloud" />访问天翼盘</a-menu-item>
                    <a-menu-item key="2" v-on:click="goto('https://pineapple.edgeless.top/api/v2/info/iso_addr')"> <a-icon type="file" />下载ISO镜像</a-menu-item>
                  </a-menu>
                </a-dropdown-button>
              </a-space>
              <br/>
              <a-tooltip placement="right">
                <template slot="title">Edgeless Hub的源代码已经公开在<a href="https://github.com/EdgelessPE/edgeless-hub" target="_blank">GitHub仓库</a>，欢迎审阅</template>

                <p><a-icon type="question-circle" />  这个应用是否安全？ </p>
              </a-tooltip>

            </a-space>
          </template>
        </a-result>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Copyright © {{year}} Edgeless Project
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import Notice from "@/Notice";
const ua=require('ua-device')
export default {
  name:'Download',
  data(){
    return{
      year:2021,
      hub_version:"",
      hub_addr:"",
      enable_download:false,
      drawerVisible:false
    }
  },
  components:{
    Notice
  },
  methods:{
    goto(url,newTab){
      if(newTab){
        window.open(url)
      }else document.location=encodeURI(url)
    },
    onClickHubDownload(){
      this.drawerVisible=true
      this.goto('https://pineapple.edgeless.top/api/v2/info/hub_addr')
    },
    onCloseDrawer(){
      this.drawerVisible=false
    },
    stationAlert(url){
      this.$info({
        title: '推荐使用Edgeless Hub',
        content:'Edgeless Hub使用国内千兆上行服务器作为镜像源，且支持插件更新、快速配置、获取内测等网页版没有的功能。',
        onOk() {
          document.location=url
        },
        okText:"好",
        cancelText:"取消",
        maskClosable:true,
        closable:true
      })
    }
  },
  created() {
    //获取年份
    let date=new Date()
    this.year=date.getFullYear()

    //获取Hub版本号和下载地址
    this.$axios.get("https://pineapple.edgeless.top/api/v2/info/hub_version")
    .then((res)=>{
      this.hub_version=res.data
    })

    //判断ua
    let UA=new ua(navigator.userAgent)
    console.log(UA)

    //跳过安卓和iOS用户提示
    if(UA.os.name==='iOS'||UA.os.name==='Android'){
      this.$info({
        title:'请使用PC访问本站',
        content:'移动端无法获得最佳的浏览体验'
      })
      this.enable_download=true
    }else{
      if(UA.os.name==='Windows'){
        //判断是否为10
        if(UA.os.version.original<10){
          this.$info({
            title:'您不在使用Windows10系统',
            content:'Edgeless Hub只能在Windows10 64位系统上运行，请手动制作启动盘'
          })
        }else{
          //判断系统位数
          let agent = navigator.userAgent.toLowerCase();
          if(agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 ) {
            this.enable_download=true
          }else{
            //对Win10 32位系统进行提示
            this.$info({
              title:'您正在使用32位系统',
              content:'Edgeless Hub只能在Windows10 64位系统上运行，请手动制作启动盘'
            })
          }
        }
      }else{
        //对非Windows用户提示下载ISO
        this.$info({
          title:'您正在使用类UNIX系统浏览此页面',
          content:'请手动制作启动盘'
        })
      }
    }
  }
}
</script>
<style>
.logo {
  float: left;
  width: 31px;
  height: 30px;
}
.title {
   width: 120px;
   height: 15px;
   margin: -32px 0 0 0;
   font-size: large;
 }
.display_img {
  width: 600px;
  height: auto;
}
</style>
