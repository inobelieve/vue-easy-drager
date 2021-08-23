// const ctx = require.context("../example/", false, /\.vue$/);
//
// const routes = ctx.keys().map(key => ({
//   path: key
// }));
//
// console.log(ctx)
import {createRouter, createWebHashHistory} from 'vue-router'
import demo01 from "../example/demo01";

const routes = [
  {
    path: '/example/demo01',
    component: demo01
  }
]
routes.push({
  path: "/",
  redirect: "/example/demo01"
});
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

console.log(routes)
export default router;
