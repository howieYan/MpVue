import moment from 'moment'
import Vue from 'vue';
import Vuex from 'vuex';

// 使用 Event Bus
const bus = new Vue();

export { bus };
export function formatTs (ts, format = 'YYYY-MM-DD') {
    let retVal = ''
    if (ts) {
        let time = moment.unix(ts)
        retVal = time.format(format)
        // debug && console.debug(`${ts} => ${retVal}(${time.format()})`)
    }
    return retVal
}
export function formatTsA (ts, format = 'YYYY-MM-DD') {
    let retVal = ''
    if (ts) {
        let time = moment(ts)
        retVal = time.format(format)
        // debug && console.debug(`${ts} => ${retVal}(${time.format()})`)
    }
    return retVal
}
export function formatTime (str, format = 'YYYY-MM-DD HH:mm:ss') {
  let retVal = ''
  if (str) {
    let time = moment(str)
    // retVal = time.format(format)
    retVal = time.unix(Number)
  }
  // debug && console.debug(`${str} => ${retVal}(${time.format()})`)
  return retVal
}
export function formatTimeA (str, format = 'HH:mm:ss') {
    let retVal = ''
    if (str) {
        let time = moment(str)
        // retVal = time.format(format)
        retVal = time.format(format)
    }
    // debug && console.debug(`${str} => ${retVal}(${time.format()})`)
    return retVal
}
export function formatTimeB (str, format = 'YYYY-MM-DD HH:mm:ss') {
    let retVal = ''
    if (str) {
        let time = moment(str)
        // retVal = time.format(format)
        retVal = time.format(format)
    }
    // debug && console.debug(`${str} => ${retVal}(${time.format()})`)
    return retVal
}
Vue.use(Vuex);
let version = (process.env.NODE_ENV === 'production') ? formatTimeB(new Date()) : formatTimeB(new Date())
const store = new Vuex.Store({
    state: {
        version: version ,
        versionNumber: '1.0.0' ,
        key: null,
        id: null,
        userData: null
    },
    getters: {
        getId (state) {
            let id = state.id;
            if(!id){
                id = JSON.parse(localStorage.getItem('id') || null)
            }
            return id;
        },
        getUserInfo (state) {
            let userData = JSON.parse(state.userData);
            if(!userData){
                userData = JSON.parse(localStorage.getItem('userData'))
            }
            return userData;
        }
    },
    mutations: {
        setId (state, id) {
            state.id = id;
            localStorage.setItem('id', id);
        },
        out (state) {
            state.userData = null
            localStorage.removeItem('userData');
        },
        setUserInfo (state, userData) {
            state.userData = userData
            localStorage.setItem('userData', userData);
        }
    },
  actions: {

  },
  modules: {
    // app,
    // user
  }
});

export default store;


