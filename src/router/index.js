import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import Login from '@/components/Login/Login'
import Home from '@/components/home'
import Reports from '@/components/Home/Reports'
import SubMerchant from '@/components/Home/component/SubMerchant'
import Transaction from '@/components/Home/component/Transaction'
import ForgotPassword from '@/components/ForgotPass/ForgotPassword'
import Password from '@/components/ForgotPass/component/Pass'
import Code from '@/components/ForgotPass/component/Code'
import NewPass from '@/components/ForgotPass/component/NewPass'
import SetnewPass from '@/components/ForgotPass/component/SetnewPass'
import UpdatePass from '@/components/ForgotPass/component/UpdatePass'
Vue.use(Router)
let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/mp',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/mp',
          name: 'reports',
          component: Reports,
          children: [
            {
              path: '/',
              name: 'subMerchanta',
              component: SubMerchant,
            },
            {
              path: '/mp/subMerchant',
              name: 'subMerchantb',
              component: SubMerchant,
            },
            {
              path: '/mp/transaction',
              name: 'transaction',
              component: Transaction,
            },
          ]
        }
      ]
    },
    {
        path: '/mp/login',
        name: 'login',
        component: Login
    },
    {
        path: '/mp/forgotPass',
        name: 'forgotPass',
        component: ForgotPassword,
        children: [
            {
                path: '/',
                name: 'password',
                component: Password,
            },
            {
                path: '/mp/code/:username',
                name: 'code',
                component: Code,
            },
            {
                path: '/mp/newPass/:username/:code',
                name: 'newPass',
                component: NewPass,
            },
            {
                path: '/mp/setnewPass',
                name: 'newPass',
                component: SetnewPass,
            },
            {
                path: '/mp/updatePass',
                name: 'updatePass',
                component: UpdatePass,
            },
        ]
    },
  ]
})
router.beforeEach((to, from, next) => {
    next();
    // iView.LoadingBar.start();
});
router.afterEach(() => {
    iView.LoadingBar.finish();
});
export default router
