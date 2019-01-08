<template>

    <div class="v_aboutUs">
        <el-carousel :interval="4000" class="aboutUs-carousel" type="card" height="300px">
            <el-carousel-item v-for="item in 4" :key="item">
            <img src="../../assets/images/gan.png" />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped>
    .v_aboutUs{
        margin-top:30px;
    }
    .aboutUs-carousel{
        width:1200px;
        margin:0 auto;
    }


</style>