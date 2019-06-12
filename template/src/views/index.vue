<template>
  <div class="index-wrapper">
    <!--<div class="img-test"></div>-->
   
    <!-- <router-view></router-view> -->
    <div class="demo" >
       欢迎使用app-template模板
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
  };
</script>
<style lang="scss" scoped>
  /*
  @import "../assets/scss/helpers/mixins";

  .index-wrapper {
    // 引用public下的图片资源时 !! 直接以 public 下的文件夹开头，并且第一个参数为空 !!
    @include oss-bg('', 'pub-img/banner1.png', '?x-oss-process=image/resize,m_fill,h_280,w_690');
    .img-test {
      width: 400px;
      height: 400px;
      // 引用assets下的图片资源时 !! 相对路径(直到图片的上一级文件夹)为第一个参数，图片名称为第二个参数，必填!!
      @include oss-bg('../assets/image/', 'banner1.png', '?x-oss-process=image/resize,m_fill,h_280,w_690');
    }
  }
  */
  .demo{
    font-size: 24px;
    text-align: center
  }
</style>


















