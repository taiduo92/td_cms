//首页
import index from '../views/index/index'
//登陆
import login from '../views/login/login'
//木夕页
import mx from '../views/mx/mx'
//木夕创建章节
import mxCreate from '../views/mxCreate/mxCreate'
//关于我的页面
import aboutUs from '../views/aboutUs/aboutUs'
//预览页面
import preveiw from '../views/mx/preview.vue'



/***********       二级路由     *************** */
//章节详情页
import chapterDetail from '../views/mx/preview/chapterDetail.vue'
//单个章节发布列表页
import chapterItemList from '../views/mx/preview/chapterItemList.vue'
//章节详情页
import chapterList from '../views/mx/preview/chapterList'

const ROUTER = [
    //首页
    {
        path:'/',
        component:index
    },
    //登陆
    {
        name:"login",
        path:'/login',
        component:login
    },
    //木夕页
    {
        path:'/mx',
        component:mx,
        redirect:'/mx/preveiw',
        children:[
            //默认预览界面
            {
                name:"preveiw",
                path:"preveiw",
                component:preveiw
            },
            //章节列表页
            {
                name:"chapterList",
                path:'chapterList',
                component:chapterList
            },
            //单个章节列表页
            {
                name:'chapterItemList',
                path:'chapterItemList',
                component:chapterItemList
            }
           
        ]
        
    },
    //木夕创建作品页
    {
        path:'/mxCreate',
        component:mxCreate
    },
    //关于我们
    {
        path:'/about',
        component:aboutUs
    }
]


export default ROUTER;