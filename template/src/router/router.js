import Vue from 'vue';
import Router from 'vue-router';
// pages
import Index from '../views/index';
// modules

// import RouterZ from './modules/router-z'


let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        // ...RouterZ
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

//解决vue路由报错页面显示白板问题
router.onError((error) => {
  const isChunkLoadFailed = error.message.indexOf('Loading chunk') > -1;
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});


Vue.use(Router);

export default router;
