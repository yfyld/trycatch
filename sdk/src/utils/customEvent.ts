import { EventParam } from '@/types';

(function () {
    if (typeof window.CustomEvent === 'function') {
        return;
    }
    function MyCustomEvent<T>(event: string, params: EventParam<T>): CustomEvent<T> {
        params = params || {
            canBubbleArg: false,
            cancelableArg: false,
            detailArg: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.canBubbleArg, params.cancelableArg, params.detailArg);
        return evt;
    }
    MyCustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = MyCustomEvent;
})();

