<template>
    <div class="mx-preview-right">
         <!-- 头部  BEGIN -->
        <pb-header :isLeft="false">
            <span slot="title" v-text="getProjectName"></span>
        </pb-header>
         <!-- 头部  END -->

         
    </div>
</template>

<script>

import pbHeader from '../../components/pb_header'

import { mapGetters } from 'vuex';

export default {
    components:{
        pbHeader
    },
     computed: {
        ...mapGetters([
            'getProjectName'
        ])
    },
    data(){
        return {
           
        }
    },
    methods: {
        
    },
}
</script>

<style>

</style>
