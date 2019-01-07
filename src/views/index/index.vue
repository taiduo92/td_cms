<template>

  <div class="v_index">
      <el-carousel :interval="4000" class="index-carousel" type="always" height="480px" >
        <el-carousel-item v-for="item in bannerItem" :key="item" >
          <div class="carousel-background" :style="{background:'url('+item+') center top / auto 100% no-repeat'}"></div>
        </el-carousel-item>
      </el-carousel>

       <el-carousel :interval="4000" class="index-carousel" type="always" height="480px" >
        <el-carousel-item v-for="item in bannerItem" :key="item" >
          <div class="carousel-background" :style="{background:'url('+item+') center top / auto 100% no-repeat'}"></div>
        </el-carousel-item>
      </el-carousel>



       <el-carousel :interval="4000" class="index-carousel" type="always" height="480px" >
        <el-carousel-item v-for="item in bannerItem" :key="item" >
          <div class="carousel-background" :style="{background:'url('+item+') center top / auto 100% no-repeat'}"></div>
        </el-carousel-item>
      </el-carousel>

  </div>
</template>


<<script>
export default {
    data(){
      return {
          bannerItem:[
              require("../../assets/images/banner.jpg"),
              require("../../assets/images/banner1.jpg"),
              require("../../assets/images/banner2.jpg")
          ]
      }
    }
}
</script>
<style scoped>
  .index-carousel{
    width:100%;
    margin-bottom: 50px;
  }
  .carousel-background{
    width:100%;
    height: 100%;
  }

</style>