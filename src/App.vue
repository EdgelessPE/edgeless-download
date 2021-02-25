<template>
  <div>
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
        <a-result>
          <template slot="title">
            Edgeless Hub
            <a-tag color="blue">Beta {{hub_version}}</a-tag>
          </template>
          <template slot="subTitle">
            使用Edgeless聚合客户端制作启动盘和个性化您的Edgeless
          </template>
          <img src="https://pineapple.edgeless.top/picbed/down/1.jpg" slot="icon" class="display_img"/>
          <template #extra>
            <a-button key="console" type="primary" v-on:click="goto('https://pineapple.edgeless.top/api/v2/info/hub_addr')" :disabled="!enable_download">
              立即下载
            </a-button>
            <a-dropdown-button v-on:click="goto('https://pineapple.edgeless.top/')">
              访问下载站
              <a-icon slot="icon" type="down" />
              <a-menu slot="overlay">
                <a-menu-item key="0" v-on:click="goto('https://pineapple.edgeless.top/api/v2/info/iso_addr')"> <a-icon type="file" />下载ISO镜像</a-menu-item>
                <a-menu-item key="1" v-on:click="goto('https://cno.lanzous.com/iFfxDehpnrg')"> <a-icon type="history" />下载旧版制作工具</a-menu-item>
                <a-menu-item key="2" v-on:click="goto('https://pineapple.edgeless.top/#/2/main/插件包')"> <a-icon type="shop" />浏览插件包</a-menu-item>
                <a-menu-item key="3" v-on:click="goto('https://pineapple.edgeless.top/#/2/main/主题资源包')"> <a-icon type="skin" />浏览主题资源包</a-menu-item>
              </a-menu>
            </a-dropdown-button>
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
const ua=require('ua-device')
export default {
  name:'Download',
  data(){
    return{
      year:2021,
      hub_version:"",
      hub_addr:"",
      enable_download:false
    }
  },
  methods:{
    goto(url){
      document.location=url
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
            content:'Edgeless Hub只能在Windows10 64位系统上运行，请在下拉菜单中下载旧版制作工具'
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
              content:'Edgeless Hub只能在Windows10 64位系统上运行，请在下拉菜单中下载旧版制作工具'
            })
          }
        }
      }else{
        //对非Windows用户提示下载ISO
        this.$info({
          title:'您正在使用类UNIX系统浏览此页面',
          content:'请在下拉菜单中下载ISO然后使用Ventoy写入'
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
