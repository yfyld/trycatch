import { getFlag, setFlag, getLocationHref } from './util';

function historyEventTrigger (event: string, data: any) {
    const fetchEvent = new CustomEvent(event, {detail: data});
    window.dispatchEvent(fetchEvent);
}

export default function() {
    if (getFlag('historyInjected')) {
        return;
    }

    let globalData = {
        url: getLocationHref()
    }

    /* 
        调用history.pushState() 或 history.replaceState() 不会触发 popstate 事件。
        只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()）
    */
    const oldOnpopstate = window.onpopstate;
    window.onpopstate = function() {
        const data = {
            newURL: window.location.href,
            oldURL: globalData.url
        }
        globalData.url = window.location.href;
        historyEventTrigger.call(this, 'historyPopstate', data);
        if (oldOnpopstate) {
            return oldOnpopstate.apply(this, arguments);
        }
    }

    const oldPushState = window.history.pushState;
    oldPushState && (
        window.history.pushState = function(state, title, url) {
            const data = {
                newURL: window.location.href,
                oldURL: globalData.url
            } 
            globalData.url = window.location.href;
            historyEventTrigger.call(this, 'historyPushState', data);
            if (oldPushState) {
                return oldPushState.apply(this, arguments);
            }
        }
    )

    const oldReplaceState = window.history.replaceState;
    oldReplaceState && (
        window.history.replaceState = function() {
            const data = {
                newURL: window.location.href,
                oldURL: globalData.url
            }
            globalData.url = window.location.href;
            historyEventTrigger.call(this, 'historyReplaceState', data);
            if (oldReplaceState) {
                return oldReplaceState.apply(this, arguments);
            }
        }
    )
    

    setFlag('historyInjected', true);
}