/**
 * All Remote access APIs go here.
 */
import axios from 'axios';
// import qs from 'qs';
// axios.defaults.baseURL = process.env.API_HOST;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// import store from '../store/index';

/**
 * axios configurations.
 */
// axios.defaults.timeout = 10000; // timeout in 10 seconds.

// axios.defaults.baseURL = (process.env.NODE_ENV === 'productionTipction') ? process.env.API_HOST : process.env.API_HOST;

export default {
    send(method, uri, data) {
        return new Promise((resolve, reject) => {
            try {
                axios({
                    method: method,
                    url: uri,
                    data: data,
                    params: method === 'POST' ? '' : data,
                    headers: {
                        'Content-Type':'application/json'
                    }
                })
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                        reject(new Error('Communication exception, please check the network or retry later.'));
                    });
            }
            catch (e) {
                console.error(`Exception: ${e}`);
                reject(e);
            }
        });
    },
    Login(data) {
        return this.send('POST', `/xmp/v1/login`, data);
    },
    Logout (data) {
        return this.send('get', `/xmp/v1/logout`, data);
    },
    ForgotPass (data) {
        return this.send('POST', `/xmp/v1/check/account`, data);
    },
    getCode (data) {
        return this.send('POST', `/xmp/v1/get/code`, data);
    },
    checkCode (data) {
        return this.send('POST', `/xmp/v1/check/code`, data);
    },
    getSummary (data) {
        return this.send('get', `/xmp/v1/report/get/summary`, data);
    },
    getTransaction (data) {
        return this.send('get', `/xmp/v1/report/get/transaction`, data);
    },
    resetPassword (data) {
        return this.send('POST', `/xmp/v1/reset/password`, data);
    },
    downloadTransaction (data) {
        return this.send('get', `/xmp/v1/report/download/transaction`, data);
    },
    downloadTransactionAll (data) {
        return this.send('get', `/xmp/v1/report/download/all/transaction`, data);
    },
    resetForcePassword (data) {
        return this.send('POST', `/xmp/v1/reset/force/password`, data);
    },
    updatePassword (data) {
        return this.send('POST', `/xmp/v1/update/password`, data);
    }
};
