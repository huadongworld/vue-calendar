import axios from "axios";

// declare your own store states
/**
 * @typedef {import('vuex').Store} Store
 * @typedef {import('axios').AxiosInstance} AxiosInstance
 * @typedef {import('vue-router').RouteRecordRaw} RouteRecordRaw
 * @typedef {import('vue').ComponentCustomProperties} ComponentCustomProperties
 */

/**
 * @typedef {object} State
 * @property {*} menuInfo
 * @property {*} sysUserInfo
 * @property {number} count
 */

/**
 * @type {ComponentCustomProperties}
 */
const customProperties = {
    $store: /** @type {Store<State>} */ ({}),
    $loading: null,
    $refs: null,
    $message: null,
    $hasPermission: null,
    "$capture_capture": null,
    $alert: null,
    $confirm: null,
    $http: /** @type {AxiosInstance} */ (axios),
    $validate: (data, rule) => {
        // implementation of $validate method
        return true;
    },
};

// provide typings for `this.$store`
Object.defineProperty(Vue.prototype, '$store', {
    get() {
        return customProperties.$store;
    },
});

Object.defineProperty(Vue.prototype, '$loading', {
    get() {
        return customProperties.$loading;
    },
});

Object.defineProperty(Vue.prototype, '$refs', {
    get() {
        return customProperties.$refs;
    },
});

Object.defineProperty(Vue.prototype, '$message', {
    get() {
        return customProperties.$message;
    },
});

Object.defineProperty(Vue.prototype, '$hasPermission', {
    get() {
        return customProperties.$hasPermission;
    },
});

Object.defineProperty(Vue.prototype, '$capture_capture', {
    get() {
        return customProperties.$capture_capture;
    },
});

Object.defineProperty(Vue.prototype, '$alert', {
    get() {
        return customProperties.$alert;
    },
});

Object.defineProperty(Vue.prototype, '$confirm', {
    get() {
        return customProperties.$confirm;
    },
});

Object.defineProperty(Vue.prototype, '$http', {
    get() {
        return customProperties.$http;
    },
});

Object.defineProperty(Vue.prototype, '$validate', {
    value: customProperties.$validate,
});

