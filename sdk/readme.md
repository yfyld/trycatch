* js语法错误、代码异常
* ajax请求异常
* 静态资源加载异常
* Promise异常
* iframe异常
* 跨域Script error
* 崩溃和卡顿


### try-catch
try-catch 只能捕获到同步的运行时错误，不能捕获到语法和异步错误
```js
// 同步运行错误
try {
    let name = 'abcd';
    console.log(n);
} catch(e) {
    console.log(e);
}
// ReferenceError: n is not defined
```
```js
// 语法错误
try {
    let name = 'abcd;
    console.log(n);
} catch(e) {
    console.log(e);
}
// Uncaught SyntaxError: Invalid or unexpected token
```
```js
// 异步错误
try {
    setTimeout(() => {
        undefined.map(v => v);
    }, 1000)
} catch(e) {
    console.log(e)
}
// Uncaught TypeError: Cannot read property 'map' of undefined
```

### window.onerror
```js
window.onerror = function(message, url, lineNo, columnNo, error) {

}
```
可以捕获到同步运行时的错误、异步运行时错误，
不能捕获到静态资源异常、接口异常、语法错误

> onerror 最好写在所有JS脚本的前面，否则有可能捕获不到错误

> window.onerror函数只有返回true的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 Uncaught Error:xxx

> onerror 主要用来捕获预料之外的错误，而 try-catch 则是用来在可预见情况下监控特定的错误

### window.addEventListener('error', function(){}, true)
> 网络请求异常不会事件冒泡，因此必须在捕获阶段将其捕捉到，这种方式可以捕捉到网络请求异常，但无法判断HTTP的状态是404还是其他比如500

### Promise Catch
没有写catch的Promise中抛出的错误无法被onerror或try-catch捕获到
解决方案：为了防止有漏掉的Promise异常，建议在全局增加一个对unhandledrejection的监听，用来全局监听Uncaught Promise Error
```js
window.addEventListener('unhandledrejection', function(e){
    console.log(e);
})
```
> 如果去掉控制台的异常显示，需要加上e.preventDefault()

### VUE errorHandler
```js
Vue.config.errorHandler = (err, vm, info) => {
    console.log(err);
    console.log(vm);
    console.log(info);
}
```

### React异常捕获
```js
componentDidCatch(err, info) {
    console.log(err);
    console.log(info);
}
```
error boundaries 不会捕获下列错误
+ 事件处理器
+ 异步代码
+ 服务端的渲染代码
+ 在error boundaries 区域内的错误

### iframe异常
```html
<iframe src="./iframe.html"/>
<script>
    window.frames[0].onerror = function() {

    }
</script>
```

### Script error
一般情况，如果出现Script error的错误，基本可确定是出现了跨域问题，这时候不会有太多辅助信息

解决思路：
第一种：

1、跨域资源共享机制（CORS）：为script标签添加crossOrigin属性 2、服务器端需设置：Access-Control-Allow-Origin

第二种：
```js
const originAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, listener, options) {
    const wrappedListener = function(...args) {
        try {
            return listener.apply(this, args);
        } catch(err) {
            throw err;
        }
    }
    return originAddEventListener.call(this, type, wrappedListener, options);
}
```
浏览器不会对 try-catch 起来的异常进行跨域拦截，所以catch到的时候，是有堆栈信息的；重新throw出来异常的时候，执行的是同域代码，所以window.onerror捕获的时候不会丢失堆栈信息

### 崩溃和卡顿
卡顿：网页暂时响应比较慢，js可能无法及时执行

1、用Service Worker来实现网页崩溃的监控

Service Worker有自己独立的工作线程，与网页区分开，网页崩溃了，Service Worker一般情况下不会崩溃。

Service Worker生命周期比网页要长，可以用来监控网页的状态

### 错误上报

1、通过ajax发送数据

2、动态创建img标签的形式

3、window.navigator.sendBeacon



