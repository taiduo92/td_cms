<template>
    <div class="v_header">
        <el-row :gutter="20" >
            <el-col :span="6" >
                <div class="header-left" v-if="isLeft">
                    <slot name="left" > <span @click="returnPageFn">返回</span></slot>
                </div>
                <div v-else style="opacity: 0;">.</div>
            </el-col>
            <el-col :span="12">
                <div class="header-title">
                    <slot name="title">详情页</slot>
                </div>
            </el-col>

            <el-col :span="6" v-if="isRight">
    
                <div class="header-right"  >
                    <slot name="right" >  恢复数据</slot>
                </div>
            </el-col>

        </el-row>
        <div class="header-pleacholder"></div>
    </div>
</template>

<script>
    export default {
        props:{
            isLeft:{
                type:Boolean,
                default:true
            },
            isRight:{
                type:Boolean,
                default:false
            }
        },
        methods: {
            //返回上一页
            returnPageFn(){
                this.$router.go(-1);
            }
        },
    }
</script>

<style>
    .v_header{
        /* position: relative; */
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        background-color: #fff;
        text-align: center;
        padding:0 10px;
        box-sizing: border-box;
        font-size: 16px;
    }
    /* .header-fixed{
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        z-index: 100;
        width:100%;
        height: 50px;
    } */
    /* .header-pleacholder{
        width: 100%;
        height: 50px;
        line-height: 50px;
    } */
    .header-left{
        width:100%;
        height: 100%;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNjU0OTc2NUNBRjIxMUU4ODcxRUU4NEI4NzUzQkVBOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNjU0OTc2NkNBRjIxMUU4ODcxRUU4NEI4NzUzQkVBOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU2NTQ5NzYzQ0FGMjExRTg4NzFFRTg0Qjg3NTNCRUE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU2NTQ5NzY0Q0FGMjExRTg4NzFFRTg0Qjg3NTNCRUE5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YgFA3gAAA/lJREFUeNrsmmlLlFEUx899ZpxcK7OiDDe0gva9oKKxxSToA/S+zAWhepElihcUS2kDccl80bu+QeWWvWmjoqAFWtzNItPKHZ15Tue6IdZcMRxnxnsPCHfGy8zDb/7nf8+59zJEBB2uw9AINCANSAPSgDQgDUgD0oB0aEAakAakAWlAPhZWd38BY2xWPucsxyW9TriKAMfpZS/9siXhFriSkwOmTwOajUjmuLzXhDqCs27srTCiUtDuHBkXKp1iAo7TCQ8QJ+BMBDJIUdqD0vNxmcOEWlLO+n/9n95f6PMe9L+RxHHp4ADU0nCDy0kId5VUUFo+hpmjytno0vwB6gMC4JxygAScIaEchE0yOGgBe1Em61AKkFjKhwahhpSz2XXdAA1+CyC+grO2eVEHzQROjxNqaLhFopxGZkB8SRZrVaqSTrmEoVTnVNNwq+uCE5pspJxyzlqUajXOcFw83A/VVOdsk0xrttnAXpzFmuddqzEdnDHlbJcop8VieAaORxWUdBkX9ZlQRavVDhkc9AN7GWdNSnXzAo7ZD1WUVjsl01qtZMgV2axRqe2OdI4LsR8qSTm7JMppM2wQX8pZg6c9ck4BnS/AkEETKkk5uyVL+Rc/Uk55Nqv3hhXWOpdwuvpGlLNHUgS2Exx7CWefvaU+Y+6+HyQ2zFI5Bg+ZcJ/g7JXBsZAh38xmn2by+e5+frcriLrywGET7sngUFp9pWSPnymceeFBaEIe/cj7JMr5ZiVDvsXZR2/cWXA/IIATMjgGKac0m30ALw19quFpQOQvdyTyWmGaUJeSi2vVBWRAFlF6JIPkGIK6UxzXKAmonLN+mwGJtNo/lvjUSjLzutO5uFpJD6LCrzc0CBJJSU8kSgo3SUlUM8UpadKFGawnYFRJTyVKWjXshIdJuRir5CpWxFm3vwFHCdIzGSQc9h5Ic9JquNrukHX0YrvDzwL26Tp6dz+/R+qg8gvstxEICcTuuWRahIOM+2QuxihZKApIQQYkkHG/cK0OiAQy7mSO0UpW0jc4+xVswBEavpRMi3KQcaflYZQyHjQ1xLGPYwBqZCcb4tiHis4DU4995qUHTY3Si+znmJJeSdItGkUJwDFSyWb1OmddIRY4TEp5LSkBYkTvlpqHEUql2OQYv7wgO58fv7wgzueVSLHJUZzJOplQEsAbiZJigZQkLlgpk2JTGtwfBOkgSeWtpHeLGxiAa0oCGocU4D8NJAbHlAU00rtlsg6rAYco3d658KJupQGJKOPsu4XSjbz+/d8rDJQqD2gcEtVJ+0kxt+llJ/0104NniIvkPr/M+3roUw0NSAPSgDQgDUgD0oA0IB0akAakAWlAGpCvxR8BBgCmn257cvnchAAAAABJRU5ErkJggg==) no-repeat;
        background-size: 24px 24px;
        background-position:0 13px;
        color: #647DFF;
        font-size:14px;
        cursor: pointer;
    }
    .header-right{
        font-size: 14px;
        color: #647DFF;
         cursor: pointer;
    }
    .header-title{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
