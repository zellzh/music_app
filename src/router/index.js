import Vue from 'vue'
import VueRouter from 'vue-router'

// 函数参数: 组件懒加载
const Recommend = () => import('../views/Recommend')
const Detail = () => import('../views/Detail')
const Singer = () => import('../views/Singer')
const Rank = () => import('../views/Rank')
const Search = () => import('../views/Search')

Vue.use(VueRouter)


const routes = [
  { path: '/', redirect: '/recommend' },
  {
    path: '/recommend',
    component: Recommend,
    // 子路由
    children: [
      { path: 'detail',
        props: (route) => ({ type: route.query.type, id: route.query.id }),
        component: Detail
      }
    ]
  },
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'router-active'
})

export default router
