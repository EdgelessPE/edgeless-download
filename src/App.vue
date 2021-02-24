<template>
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
      <a-result
          sub-title="使用Edgeless聚合客户端制作启动盘和个性化您的Edgeless"
      >
        <template slot="title">
          Edgeless Hub
          <a-tag color="blue">Beta {{hub_version}}</a-tag>
        </template>
        <img src="https://pineapple.edgeless.top/picbed/down/1.jpg" slot="icon" class="display_img"/>
        <template #extra>
          <a-button key="console" type="primary" v-on:click="goto('https://pineapple.edgeless.top/api/v2/info/hub_addr')">
            立即下载
          </a-button>
          <a-dropdown-button v-on:click="goto('https://pineapple.edgeless.top/')">
            访问下载站
            <a-icon slot="icon" type="down" />
            <a-menu slot="overlay">
              <a-menu-item key="1" v-on:click="goto('https://pineapple.edgeless.top/api/v2/info/iso_addr')"> <a-icon type="file" />下载ISO镜像</a-menu-item>
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
</template>
<script>
export default {
  name:'Download',
  data(){
    return{
      year:'2020',
      hub_version:"",
      hub_addr:""
    }
  },
  methods:{
    goto(url){
      document.location=url
    }
  },
  created() {
    //设置标题
    document.title="下载Edgeless"

    //获取年份
    let date=new Date()
    this.year=date.getFullYear()

    //获取Hub版本号和下载地址
    this.$axios.get("https://pineapple.edgeless.top/api/v2/info/hub_version")
    .then((res)=>{
      this.hub_version=res.data
    })
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
