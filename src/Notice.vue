<template>
  <a-alert
      v-if="showNotice"
      :message="noticeData.message"
      :description="noticeData.description"
      :type="noticeData.a_type"
      :show-icon="noticeData.show_icon"
      :closeText="noticeData.close_text"
      :after-close="recordId"
      banner
  />
</template>

<script>
export default {
  name: "Notice",
  props: ["channel"],
  data() {
    return {
      noticeData:
          {
            id: "",
            channel: "",
            message: "",
            description: "",
            a_type: "info",
            show_icon: true,
            close_text: ""
          },
      showNotice:false,
      ignoreId:""
    }
  },
  methods: {
    async fetchNotice() {
      const url = "https://legacy.edgeless.top/api/v2/info/notice"
      let axiosRes = await this.$axios.get(url)
      //选出当前通道的公告
      axiosRes.data.forEach((item)=>{
        if(item.channel===this.channel) {
          this.noticeData = item
        }
      })
      //console.log(this.noticeData)
      //判断是否需要显示此公告
      if(this.noticeData.id!==""&&this.noticeData.id!==this.ignoreId){
        this.showNotice=true
      }
    },
    recordId(){
      this.$cookies.set('ignoreId',this.noticeData.id,'30d',"/")
    }
  },
  created() {
    this.ignoreId=this.$cookies.get('ignoreId')?this.$cookies.get('ignoreId'):""
    this.fetchNotice()
  }
}
</script>
