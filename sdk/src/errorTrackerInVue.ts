import { setFlag, getFlag } from './utils/util';
import CONS from './constant';
import { Trace } from '@/types';
import computedStackTrace from './utils/computedStackTrace';
import { sendData } from './send';

const ErrorTrackerInVue = {
    formatComponentName (vm: any): string {
        if (vm.$root === vm) { // 根组件
            return 'root';
        }
        const name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
        return name ? 'component <' + name + '>' : 'anoymous component' + (
            vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : ''
        )
    },

    computedErrorStackTrace(err: any, vm: any, info: any, level: any) {
        let errInfo: Trace = {};
        if (typeof err === 'string') {
            errInfo.message = err.replace(/[^:]+/, '');
            errInfo.name = err.replace(errInfo.message, '');
        } else {
            errInfo = computedStackTrace(err) || {
                name: '',
                message: ''
            }
        }
        const componentName = this.formatComponentName(vm);
        const propsData = vm.$options && vm.$options.propsData || '';
        sendData({
            type: CONS.VUE_ERROR,
            message: `${errInfo.message}(${info})`,
            level,
            componentName,
            propsData,
            name: errInfo.name,
            stack: errInfo.stack || [],
            time: Date.now()
        })
    },

    install(Vue: any): false | void {
        if (getFlag('watchVue') || !Vue || !Vue.config) {
            return false;
        }
        setFlag('watchVue', true);
        const hasConsole = typeof console !== 'undefined';
        Vue.config.warnHandler = (msg: any, vm: any, trace: any) => {
            if (hasConsole) {
                getFlag('consoleInjected') ? console.error(`[Vue warn]: ${msg}${trace}`, 'infoFromTryCatch') : console.error(`[Vue warn]: ${msg}${trace}`);
            }
            ErrorTrackerInVue.computedErrorStackTrace(msg, vm, trace, CONS.LEVEL.NORMAL);
        }

        Vue.config.errorHandler = (err: any, vm: any, info: any) => {
            if (hasConsole) {
                getFlag('consoleInjected') ? console.error(err, 'infoFromTryCatch') : console.error(err);
            }
            ErrorTrackerInVue.computedErrorStackTrace(err, vm, info, CONS.LEVEL.HIGH);
        }
    },

    uninstall (Vue: any): false | void {
        if (!this.isInstall || !Vue || !Vue.config) {
            return false;
        }

        setFlag('watchVue', false);
        Vue.config.warnHandler = null;
        Vue.config.errorHandler = null;
    }

}