<template>
  <div>
    <a-drawer
        :closable="true"
        :visible="drawerVisible"
        placement="bottom"
        title="感谢下载Edgeless Hub"
        @close="onCloseDrawer"
    >
      <p>
        我们强烈建议您阅读Wiki后再使用Edgeless，在这里有大部分问题的解决方案和所有的Edgeless特色功能
      </p>
      <a-button
          type="primary"
          @click="goto('https://wiki.edgeless.top/v2/required.html')"
      >好
      </a-button
      >
    </a-drawer>
    <a-layout>
      <a-layout-header style="background-color: white">
        <a-space>
          <img class="logo" src="https://home.edgeless.top/favicon.ico"/>
          <p class="title">&nbsp;&nbsp;&nbsp;&nbsp;Edgeless</p>
          <a-menu
              :default-selected-keys="['3']"
              :selectable="false"
              :style="{ lineHeight: '64px' }"
              mode="horizontal"
          >
            <a-menu-item key="1">
              <a href="https://home.edgeless.top" target="_blank">首页</a>
            </a-menu-item>
            <a-menu-item key="2">
              <a href="https://wiki.edgeless.top" target="_blank">文档</a>
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
            banner
            closable
            message="Edgeless Hub只能在Windows10/11 64位系统上运行，我们视能够日常使用此版本Windows系统的电脑为Edgeless的硬件准入门槛"
        />
        <Notice v-else channel="Down"/>
        <a-result>
          <template slot="title">
            Edgeless Hub
            <a-tag
                color="blue"
                @click="
                goto(
                  'https://wiki.edgeless.top/v2/global/log.html#edgeless-hub更新日志-当前已发布最新版本-hub-beta',
                  true
                )
              "
            >Beta {{ hub_version }}
            </a-tag
            >
          </template>
          <template slot="subTitle">
            使用Edgeless聚合客户端制作启动盘和个性化您的Edgeless
          </template>
          <img
              slot="icon"
              class="display_img"
              src="https://pineapple.edgeless.top/picbed/down/1.jpg"
          />
          <template #extra>
            <a-space direction="vertical">
              <a-space>
                <template v-if="enable_download">
                  <a-button
                      key="console"
                      type="primary"
                      @click="onClickHubDownload"
                  >立即下载
                  </a-button
                  >
                </template>
                <template v-else>
                  <a-button
                      key="console"
                      type="primary"
                      @click="
                      goto(
                        'https://wiki.edgeless.top/v2/guide/burn_manual.html'
                      )
                    "
                  >手动制作
                  </a-button
                  >
                </template>
                <a-dropdown-button
                    v-on:click="stationAlert('https://zfile.edgeless.top/2/main')"
                >
                  访问网页版
                  <a-icon slot="icon" type="down"/>
                  <a-menu slot="overlay">
                    <a-menu-item
                        key="0"
                        v-on:click="
                        stationAlert(
                          'https://home.edgeless.top/jump/lurenjia.html'
                        )
                      "
                    >
                      <a-icon type="hdd"/>
                      访问备用站
                    </a-menu-item
                    >
                    <a-menu-item
                        key="1"
                        v-on:click="
                        stationAlert('https://home.edgeless.top/jump/189.html')
                      "
                    >
                      <a-icon type="cloud"/>
                      访问天翼盘
                    </a-menu-item
                    >
                    <a-menu-item
                        key="2"
                        v-on:click="
                        goto(
                          'https://pineapple.edgeless.top/api/v2/info/iso_addr'
                        )
                      "
                    >
                      <a-icon type="file"/>
                      下载ISO镜像
                    </a-menu-item
                    >
                  </a-menu>
                </a-dropdown-button>
              </a-space>
              <br/>
              <a-tooltip placement="right">
                <template slot="title"
                >Edgeless Hub的源代码已经公开在<a
                    href="https://github.com/EdgelessPE/edgeless-hub"
                    target="_blank"
                >GitHub仓库</a
                >，欢迎审阅
                </template
                >

                <p>
                  <a-icon type="question-circle"/>
                  这个应用是否安全？
                </p>
              </a-tooltip>
            </a-space>
          </template>
        </a-result>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Copyright © {{ year }} Edgeless Project
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import Notice from "@/Notice";

const ua = require("ua-device");
export default {
  name: "Download",
  data() {
    return {
      year: 2021,
      hub_version: "",
      hub_addr: "",
      enable_download: false,
      drawerVisible: false,
      address: ""
    };
  },
  components: {
    Notice,
  },
  methods: {
    goto(url, newTab) {
      if (newTab) {
        window.open(url);
      } else document.location = encodeURI(url);
    },
    onClickHubDownload() {
      this.drawerVisible = true;
      this.goto(this.address);
    },
    onCloseDrawer() {
      this.drawerVisible = false;
    },
    stationAlert(url) {
      this.$info({
        title: "推荐使用Edgeless Hub",
        content:
            "Edgeless Hub使用国内千兆上行服务器作为镜像源，且支持插件更新、快速配置、获取内测等网页版没有的功能，而且免费开源无广告。",
        onOk() {
          document.location = url;
        },
        onCancel: this.uaConfig,
        okText: "继续前往",
        maskClosable: true,
        closable: true,
      });
    },
    uaConfig() {
      //判断ua
      let UA = new ua(navigator.userAgent);
      //console.log(UA);

      //跳过安卓和iOS用户提示
      if (UA.os.name === "iOS" || UA.os.name === "Android") {
        this.$info({
          title: "请使用PC访问本站",
          content: "移动端无法获得最佳的浏览体验",
        });
        this.enable_download = true;
      } else {
        if (UA.os.name === "Windows") {
          //判断是否为10
          if (UA.os.version.original < 10) {
            this.$info({
              title: "不支持过时的Windows系统",
              content:
                  "Edgeless Hub只能在Windows10/11 64位系统上运行，请手动制作启动盘，或尝试绕过这一限制",
            });
          } else {
            //判断系统位数
            let agent = navigator.userAgent.toLowerCase();
            if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
              this.enable_download = true;
            } else {
              //对Win10 32位系统进行提示
              this.$info({
                title: "不支持过时的32位系统",
                content:
                    "Edgeless Hub只能在Windows10/11 64位系统上运行，请手动制作启动盘，或升级您的系统",
              });
            }
          }
        } else {
          //对非Windows用户提示下载ISO
          this.$info({
            title: "您正在使用类UNIX系统浏览此页面",
            content: "请手动制作启动盘",
          });
        }
      }
    }
  },
  created() {
    //获取年份
    let date = new Date();
    this.year = date.getFullYear();

    //获取Hub版本号和下载地址
    this.$axios
        .get("https://pineapple.edgeless.top/api/v2/info/hub",{timeout:5000})
        .then((res) => {
          this.hub_version = res.data.version;
          this.address = res.data.address
        })
    .catch((e)=>{
      console.log(e)
      this.$error({
        title:"似乎无法连接到菠萝云",
        content:"已知部分地区（浙江等）的移动宽带无法连接到菠萝云，我们已经安排服务器供应商前去交涉，当然也有可能是我们的服务器发生了故障"
      })
    });

    //获取跳转参数
    let match = window.location.search.substring(1).match(/backup=[\d]/)
    if (match) {
      let targetIndex = match[0].split("=")[1]
      console.log(targetIndex)
      switch (targetIndex) {
        case "1":
          this.stationAlert('https://home.edgeless.top/jump/lurenjia.html')
          return
        case "2":
          this.stationAlert('https://home.edgeless.top/jump/189.html')
          return
        default :
          console.log("Error target index")
      }
    } else {
      this.uaConfig()
    }


  },
};
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
