!function(t){function e(e){for(var i,o,s=e[0],c=e[1],u=e[2],d=0,m=[];d<s.length;d++)o=s[d],a[o]&&m.push(a[o][0]),a[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);for(l&&l(e);m.length;)m.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(i=!1)}i&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},a={app:0},r=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(t){var e=[],n=a[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise(function(e,i){n=a[t]=[e,i]});e.push(n[2]=i);var r,s=document.getElementsByTagName("head")[0],c=document.createElement("script");c.charset="utf-8",c.timeout=120,o.nc&&c.setAttribute("nonce",o.nc),c.src=function(t){return o.p+"version/1542497646323/js/"+t+".js"}(t),r=function(e){c.onerror=c.onload=null,clearTimeout(u);var n=a[t];if(0!==n){if(n){var i=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+i+": "+r+")");o.type=i,o.request=r,n[1](o)}a[t]=void 0}};var u=setTimeout(function(){r({type:"timeout",target:c})},12e4);c.onerror=c.onload=r,s.appendChild(c)}return Promise.all(e)},o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/",o.oe=function(t){throw console.error(t),t};var s=window.webpackJsonp=window.webpackJsonp||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;r.push([148,"vendors"]),n()}({148:function(t,e,n){n(149),t.exports=n(302)},149:function(t,e,n){"use strict";n.r(e);n(150),n(152),n(153),n(157),n(158),n(106),n(108),n(163),n(164),n(166),n(167),n(169),n(170),n(171),n(172),n(173),n(174),n(175),n(176),n(177),n(178),n(179),n(181),n(183),n(116),n(117),n(118),n(185),n(186),n(120),n(188),n(190),n(121),n(122),n(191),n(192),n(194),n(195),n(196),n(197),n(198),n(199),n(123),n(200),n(128),n(205),n(129),n(206),n(207),n(208),n(209),n(210),n(211),n(214),n(215),n(216),n(217),n(218),n(220),n(221),n(222),n(223),n(224),n(225),n(226),n(227),n(130),n(133),n(228),n(229),n(230),n(231),n(232),n(233),n(234),n(235),n(238),n(239),n(240),n(135),n(241);e.default={}},244:function(t,e){!function(e){var n="Modernizr"in e,i=e.Modernizr;!function(t,e,n){function i(t,e){return typeof t===e}var a=[],r={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(t,e){var n=this;setTimeout(function(){e(n[t])},0)},addTest:function(t,e,n){a.push({name:t,fn:e,options:n})},addAsyncTest:function(t){a.push({name:null,fn:t})}},o=function(){};o.prototype=r,o=new o;var s=[],c=e.documentElement,u="svg"===c.nodeName.toLowerCase();(function(){var t,e,n,r,c,u;for(var l in a)if(a.hasOwnProperty(l)){if(t=[],(e=a[l]).name&&(t.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(n=0;n<e.options.aliases.length;n++)t.push(e.options.aliases[n].toLowerCase());for(r=i(e.fn,"function")?e.fn():e.fn,c=0;c<t.length;c++)1===(u=t[c].split(".")).length?o[u[0]]=r:(!o[u[0]]||o[u[0]]instanceof Boolean||(o[u[0]]=new Boolean(o[u[0]])),o[u[0]][u[1]]=r),s.push((r?"":"no-")+u.join("-"))}})(),function(t){var e=c.className,n=o._config.classPrefix||"";if(u&&(e=e.baseVal),o._config.enableJSClass){var i=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");e=e.replace(i,"$1"+n+"js$2")}o._config.enableClasses&&(e+=" "+n+t.join(" "+n),u?c.className.baseVal=e:c.className=e)}(s),delete r.addTest,delete r.addAsyncTest;for(var l=0;l<o._q.length;l++)o._q[l]();t.Modernizr=o}(e,document),t.exports=e.Modernizr,n?e.Modernizr=i:delete e.Modernizr}(window)},246:function(t,e,n){},252:function(t,e){function n(t){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}n.keys=function(){return[]},n.resolve=n,t.exports=n,n.id=252},297:function(t,e,n){var i={"./en-gb.json":[303,0]};function a(t){var e=i[t];return e?n.e(e[1]).then(function(){var t=e[0];return n.t(t,3)}):Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e})}a.keys=function(){return Object.keys(i)},a.id=297,t.exports=a},302:function(t,e,n){"use strict";n.r(e);n(244);var i=n(12),a=n(61),r=n.n(a),o=n(143),s=(n(246),n(5));s.a.sensibleDefaults=!1;var c={},u=n(252),l={name:"Icon",props:{name:s.a.string.isRequired},computed:{icon:function(){return u("./".concat(this.name,".svg"))}}},d=n(82),m=n(1);var f=Object(m.a)(l,function(){var t=this.$createElement;return(this._self._c||t)("span",{class:this.$style.container,domProps:{innerHTML:this._s(this.icon)}})},[],!1,function(t){this.$style=d.default.locals||d.default},null,null);f.options.__file="Icon.vue";var h={Icon:f.exports},v=n(83),p="production",g="development",x="staging",w="local",y={LOCALE:"locale",API:"api"},b={LOCALE_ENABLED:"locale-enabled",LOCALE_ROUTING_ENABLED:"locale-routing-enabled",STATIC_ROOT:"static-root",PUBLIC_PATH:"public-path",VERSIONED_STATIC_ROOT:"versioned-static-root"},_={DEFAULT_LOCALE:"default-locale",AVAILABLE_LOCALES:"available-locales",PERSIST_QUERY_PARAMS:"persist-query-params"},M={},E=function(t,e){M[t]=e},I=function(t){return M[t]},T=function(){var t=I("configManager"),e=t.getProperty(_.AVAILABLE_LOCALES).map(function(t){return"string"==typeof t?{code:t,urlPrefix:t,translationKey:t}:t}),n={persistent:!1,defaultCode:t.getProperty(_.DEFAULT_LOCALE),languages:e};return{localeEnabled:t.getVariable(b.LOCALE_ENABLED),localeRoutingEnabled:t.getVariable(b.LOCALE_ROUTING_ENABLED),config:n}},S=n(4),O=n.n(S),P=n(6),$=n(144),A=n.n($);function L(t,e,n){for(var i=60/e,a=t.division*i,r=Math.floor(n.start/a)*a,o=[];r<n.end;){var s=r+t.pulseWidth*a;(r>n.start&&r<n.end||s>n.start&&s<n.end||r<n.start&&s>n.end)&&o.push({start:r,end:s}),r+=a}return o}function C(t,e,n,i,a){t.fillStyle="black",t.fillRect(0,0,t.canvas.width,t.canvas.height);var r=t.canvas.width/(i.end-i.start);!function(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"red",r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:.5,o=60/n,s=Math.ceil(e.start/o)*o;if(s>e.end)return;t.strokeStyle=a,t.lineWidth=r;var c=s;for(;c<e.end;){var u=R(t,c,e.start,i);t.beginPath(),t.moveTo(u,0),t.lineTo(u,t.canvas.height),t.stroke(),c+=o}}(t,i,n,r),function(t,e,n,i,a,r){var o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:2,s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"deepskyblue";t.lineWidth=o,t.strokeStyle=s;for(var c=[],u=0;u<e.length;u+=1){var l;(l=c).push.apply(l,A()(L(e[u],i,n)))}c=function(t){t.sort(function(t,e){return t.start-e.start});for(var e=[],n=0;n<t.length;n+=1)e.length&&t[n].start>=e[e.length-1].start&&t[n].start<=e[e.length-1].end?t[n].end>e[e.length-1].end&&(e[e.length-1].end=t[n].end):e.push(Object.assign({},t[n]));return e}(c);var d=function(t,e,n,i,a){var r=[],o=a,s=t.canvas.height-a,c=0;t.beginPath();for(var u=n.length,l=0;l<u;l+=1){var d=n[l],m=R(t,d.start,e.start,i);c=R(t,d.end,e.start,i),r.push({x:m,y:s}),r.push({x:m,y:o}),r.push({x:c,y:o}),r.push({x:c,y:s})}r.length?(r[0].x>0&&r.unshift({x:0,y:s}),r[r.length-1].x<t.canvas.width&&r.push({x:t.canvas.width,y:s})):(r.push({x:0,y:s}),r.push({x:t.canvas.width,y:s}));return r}(t,n,c,a,r);t.beginPath(),d.forEach(function(e,n){0===n?t.moveTo(e.x,e.y):t.lineTo(e.x,e.y)}),t.stroke()}(t,e,i,n,r,a)}function R(t,e,n,i){return i*(e-n)}function k(t,e){var n=.5*e,i=2*Math.PI;t.beginPath(),t.arc(n,n,n-1.5-2,0,i),t.strokeStyle="white",t.lineWidth=3,t.stroke()}var D=n(62),j=n.n(D),V=n(145),W=n.n(V),q=function(){function t(e){var n=this;j()(this,t),this.isRunning=!1,this.update=function(t){n.isRunning&&(n.callback(t),requestAnimationFrame(function(t){return n.update(t)}))},this.callback=e}return W()(t,[{key:"start",value:function(){this.isRunning||(this.isRunning=!0,this.update(performance.now()))}},{key:"stop",value:function(){this.isRunning=!1}}]),t}(),U=n(146),N=n.n(U),G={name:"WaveViewControls",props:{matrixItems:s.a.array.isRequired,timeWindow:s.a.number.isRequired},mounted:function(){this.mapper=new N.a(1,30),this.$refs.zoom.value=this.mapper.reverseMap(this.timeWindow)},methods:{onZoomSliderChange:function(t){this.$emit("timeWindowChange",this.mapper.map(parseInt(t.target.value,10)))}},computed:{selectedViewLabel:function(){return 0===this.matrixItems.length?"nothing":1===this.matrixItems.length?"item-".concat(this.matrixItems[0].position.x+1,".").concat(this.matrixItems[0].position.y+1):this.matrixItems[0].position.x===this.matrixItems[1].position.x?"column-".concat(this.matrixItems[0].position.x+1):"row-".concat(this.matrixItems[0].position.y+1)}}},B=n(84);var F=Object(m.a)(G,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.$style.controls},[n("div",[t._v("viewing: "),n("strong",[t._v(t._s(t.selectedViewLabel))])]),t._v(" "),n("div",[t._v("\n    window: "),n("strong",[t._v(t._s(t.timeWindow.toFixed(2))+"s")])]),t._v(" "),n("div",[n("input",{ref:"zoom",attrs:{type:"range"},on:{input:t.onZoomSliderChange}})])])},[],!1,function(t){this.$style=B.default.locals||B.default},null,null);F.options.__file="WaveViewControls.vue";var z=F.exports;function H(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.25,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:.7,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:18,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:10,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"deepskyblue",s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"black";t.clearRect(0,0,t.canvas.width,t.canvas.height);var c=2*Math.PI,u=.5*t.canvas.width,l={x:u,y:u},d=n*c+.5*(1-i)*c,m=d+i*c,f=d+e*(m-d);Y(t,d,f,o,l,u,a),Y(t,f,m,s,l,u,a),function(t,e,n,i,a,r){var o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:2,s=window.devicePixelRatio*i;t.strokeStyle=r,t.lineWidth=o*window.devicePixelRatio,t.beginPath(),t.moveTo(n.x+Math.cos(e)*s,n.y+Math.sin(e)*s),t.lineTo(n.x+Math.cos(e)*a,n.y+Math.sin(e)*a),t.stroke(),t.closePath()}(t,f,l,r,u,o)}function Y(t,e,n,i,a,r,o){var s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:0,c=o*window.devicePixelRatio;t.beginPath(),t.arc(a.x,a.y,r-.5*c-s,e,n),t.strokeStyle=i,t.lineWidth=c,t.stroke(),t.closePath()}var Q={name:"Dial",props:{width:s.a.number.isRequired,min:s.a.number.isRequired,max:s.a.number.isRequired,integer:s.a.bool.def(!1),value:s.a.number.isRequired,pixelsForFullRange:s.a.number.def(200),showValue:s.a.bool.def(!0)},data:function(){return{dialValue:this.value}},computed:{displayValue:function(){return this.integer?Math.trunc(this.dialValue):this.dialValue.toFixed(2)}},watch:{value:function(t){this.dialValue=t,this.draw()}},mounted:function(){this.context=this.$refs.canvas.getContext("2d"),setTimeout(this.resize)},methods:{draw:function(){H(this.context,(this.dialValue-this.min)/(this.max-this.min))},resize:function(){var t=this.$refs.wrap.offsetWidth;!function(t,e,n){var i=window.devicePixelRatio;t.style.width="".concat(e,"px"),t.style.height="".concat(n,"px"),t.width=e*i,t.height=n*i}(this.context.canvas,t,t),this.draw()},onCanvasMouseDown:function(t){this.startDragData={value:this.dialValue,x:t.pageX,y:t.pageY},document.addEventListener("mousemove",this.onDocumentMouseMove),document.addEventListener("mouseup",this.onDoucumentMouseUp),t.preventDefault()},onDoucumentMouseUp:function(){document.removeEventListener("mousemove",this.onDocumentMouseMove),document.removeEventListener("mouseup",this.onDoucumentMouseUp)},onDocumentMouseMove:function(t){var e=(this.startDragData.y-t.pageY)/this.pixelsForFullRange,n=this.startDragData.value+e*(this.max-this.min);this.dialValue=Math.min(this.max,Math.max(this.min,n)),this.integer&&(this.dialValue=Math.trunc(this.dialValue)),this.draw(),this.$emit("change",this.dialValue)}}},J=n(85);var X=Object(m.a)(Q,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"wrap",class:t.$style.dial,style:{width:t.width+"px"}},[n("canvas",{ref:"canvas",on:{mousedown:t.onCanvasMouseDown}}),t._v(" "),t.showValue?n("p",[t._v(t._s(t.displayValue))]):t._e()])},[],!1,function(t){this.$style=J.default.locals||J.default},null,null);X.options.__file="Dial.vue";var K=X.exports,Z={name:"WaveView",components:{Dial:K,WaveViewControls:z},props:{matrixItems:s.a.array.isRequired,height:s.a.number.isRequired,initialTimeWindow:s.a.number.isRequired,waveMargin:s.a.number.isRequired,showControls:s.a.bool.def(!1)},data:function(){return{width:0,startTime:0,timeWindow:this.initialTimeWindow}},computed:O()({},Object(P.d)({bpm:function(t){return t.app.bpm},playStartTime:function(t){return t.app.playStartTime}})),watch:{matrixItems:{handler:function(){this.draw()},deep:!0},playStartTime:function(t){-1===t?(this.frame.stop(),this.startTime=0,this.draw()):this.frame.start()}},mounted:function(){var t=this;setTimeout(function(){t.width=t.$refs.wrap.offsetWidth,t.context=t.$refs.canvas.getContext("2d"),t.frame=new q(t.onFrame),setTimeout(t.draw)})},methods:{onTimeWindowChange:function(t){this.timeWindow=t,this.draw()},onFrame:function(){this.startTime=this.$soundManager.context.currentTime-this.playStartTime,this.draw()},draw:function(){C(this.context,this.matrixItems,this.bpm,{start:this.startTime,end:this.startTime+this.timeWindow},this.waveMargin)}}},tt=n(86);var et=Object(m.a)(Z,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"wrap"},[n("canvas",{ref:"canvas",attrs:{width:t.width+"px",height:t.height+"px"}}),t._v(" "),t.showControls?n("WaveViewControls",{attrs:{"time-window":t.timeWindow,"matrix-items":t.matrixItems},on:{timeWindowChange:t.onTimeWindowChange}}):t._e()],1)},[],!1,function(t){this.$style=tt.default.locals||tt.default},null,null);et.options.__file="WaveView.vue";var nt=et.exports,it={name:"Sidebar"},at=n(87);var rt=Object(m.a)(it,function(){var t=this.$createElement;return(this._self._c||t)("div",{class:this.$style.content},[this._v("\n  Lorem ipsum dolor sit amet, fusce ut nam curabitur mattis velit neque, eget integer malesuada, voluptatibus tempus pellentesque, nec dapibus et urna, vitae quam ut quis. Suspendisse sed erat sed. Mi dis tincidunt dolor eleifend lectus, praesent pellentesque nec vivamus dolor suspendisse congue, convallis ut semper iaculis. Magna porttitor nunc nunc amet, tempor porta, dolor cillum laoreet diam ut ut sit, ornare ligula penatibus aliquam sed nunc adipiscing,\n")])},[],!1,function(t){this.$style=at.default.locals||at.default},null,null);rt.options.__file="Sidebar.vue";var ot=rt.exports,st={name:"Header"},ct=n(88);var ut=Object(m.a)(st,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{class:this.$style.wrap},[e("div",{class:this.$style.content},[e("h1",[this._v("trigger riot")]),this._v(" "),this._m(0)])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n      reimagining of "),e("a",{attrs:{target:"_blank",href:"http://tiptopaudio.com/trigger-riot/"}},[this._v("\n        tiptop audio's eurorack rhythm generator\n      ")])])}],!1,function(t){this.$style=ct.default.locals||ct.default},null,null);ut.options.__file="Header.vue";var lt,dt=ut.exports,mt="divide",ft="steps",ht="probability",vt="speed",pt="clock shift",gt="time shift",xt="pulse-width",wt=n(2),yt=n.n(wt),bt="".concat("matrix","/setActiveMatrixMode"),_t="".concat("matrix","/setActiveItems"),Mt="".concat("matrix","/setPulseWidth"),Et="".concat("matrix","/setDivision"),It="".concat("matrix","/setMatrix"),Tt="".concat("matrix","/init"),St={state:{activeMatrixMode:mt,matrix:null,activeItems:[]},getters:{},mutations:(lt={},yt()(lt,It,function(t,e){t.matrix=e}),yt()(lt,_t,function(t,e){t.activeItems=e}),yt()(lt,bt,function(t,e){t.activeMatrixMode=e}),yt()(lt,Mt,function(t,e){var n=t.matrix.items[e.matrixItemIndex];n&&(n.pulseWidth=e.pulseWidth)}),yt()(lt,Et,function(t,e){var n=t.matrix.items[e.matrixItemIndex];n&&(n.division=e.division)}),lt),actions:yt()({},Tt,function(t){t.commit(It,function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:4,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.25,i=[],a=0,r=0;r<t;r+=1)for(var o=0;o<e;o+=1){var s={index:a,position:{x:o,y:r},division:0,pulseWidth:n};i.push(s),a+=1}for(var c=[],u=function(t){c.push(i.filter(function(e){return e.position.x===t}))},l=0;l<e;l+=1)u(l);for(var d=[],m=function(t){d.push(i.filter(function(e){return e.position.y===t}))},f=0;f<t;f+=1)m(f);return{rows:d,columns:c,items:i}}()),t.commit(_t,[t.state.matrix.items[0]])})},Ot={name:"MatrixItem",components:{Dial:K},props:{matrixItem:s.a.any.isRequired},computed:O()({dialData:function(){return this.activeMatrixMode===mt?{value:this.matrixItem.division,min:0,max:255,integer:!0}:{value:this.matrixItem.pulseWidth,min:0,max:1}}},Object(P.d)({activeMatrixMode:function(t){return t.matrix.activeMatrixMode},activeMatrixItems:function(t){return t.matrix.activeItems}})),watch:{},methods:O()({onValueChange:function(t){this.activeMatrixMode===mt?this.setDivision({matrixItemIndex:this.matrixItem.index,division:t}):this.activeMatrixMode===xt&&this.setPulseWidth({matrixItemIndex:this.matrixItem.index,pulseWidth:t})}},Object(P.c)({setPulseWidth:Mt,setDivision:Et}))},Pt=n(89);var $t=Object(m.a)(Ot,function(){var t=this.$createElement;return(this._self._c||t)("Dial",{staticStyle:{margin:"0 auto"},attrs:{width:80,min:this.dialData.min,max:this.dialData.max,integer:this.dialData.integer,value:this.dialData.value},on:{change:this.onValueChange}})},[],!1,function(t){this.$style=Pt.default.locals||Pt.default},null,null);$t.options.__file="MatrixItem.vue";var At=$t.exports,Lt={name:"MatrixGroupItem",components:{WaveView:nt},props:{matrixItems:s.a.array.isRequired},methods:O()({onActivateClick:function(){this.setActiveItems(this.matrixItems)}},Object(P.c)({setActiveItems:_t}))},Ct=n(90);var Rt=Object(m.a)(Lt,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{on:{click:this.onActivateClick}},[e("WaveView",{attrs:{"matrix-items":this.matrixItems,"initial-time-window":5,height:30,"wave-margin":5}})],1)},[],!1,function(t){this.$style=Ct.default.locals||Ct.default},null,null);Rt.options.__file="MatrixGroupItem.vue";var kt=Rt.exports,Dt={name:"MatrixElement",components:{MatrixItem:At,MatrixGroupItem:kt},props:{items:s.a.array.isRequired},computed:{isGroup:function(){return this.items.length>1}},methods:O()({},Object(P.c)({setActiveItems:_t}),{onActivateClick:function(){this.setActiveItems(this.items)}})},jt=n(91);var Vt=Object(m.a)(Dt,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.$style.matrixElement},[n("div",{class:t.$style.controls},[n("button",{on:{click:t.onActivateClick}},[t._v("v")]),t._v(" "),n("button",[t._v("m")]),t._v(" "),n("button",[t._v("s")])]),t._v(" "),t.isGroup?t._e():n("MatrixItem",{class:t.$style.content,attrs:{"matrix-item":t.items[0]}}),t._v(" "),t.isGroup?n("MatrixGroupItem",{class:t.$style.content,attrs:{"matrix-items":t.items}}):t._e()],1)},[],!1,function(t){this.$style=jt.default.locals||jt.default},null,null);Vt.options.__file="MatrixElement.vue";var Wt={name:"Matrix",components:{MatrixElement:Vt.exports,MatrixGroupItem:kt},computed:O()({},Object(P.d)({matrix:function(t){return t.matrix.matrix},activeMatrixItems:function(t){return t.matrix.activeItems}})),methods:{itemIsActive:function(t){return this.activeMatrixItems.includes(t)}}},qt=n(92);var Ut=Object(m.a)(Wt,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.$style.wrap},[t.matrix?[t._l(t.matrix.rows,function(e,i){return n("div",{key:i,class:t.$style.row},[t._l(e,function(e){return n("MatrixElement",{key:e.position.x+"-"+e.position.y,class:[t.$style.rowItem,t.itemIsActive(e)?t.$style.active:null],attrs:{items:[e]}})}),t._v(" "),n("MatrixElement",{class:[t.$style.rowItem,t.$style.rowGroupItem],attrs:{items:e}})],2)}),t._v(" "),n("div",{class:t.$style.row},t._l(t.matrix.columns,function(e,i){return n("MatrixElement",{key:i,class:[t.$style.rowItem,t.$style.columnGroupItem],attrs:{items:e}})}))]:t._e()],2)},[],!1,function(t){this.$style=qt.default.locals||qt.default},null,null);Ut.options.__file="Matrix.vue";var Nt,Gt,Bt=Ut.exports,Ft="".concat("app","/setDeviceState"),zt="".concat("app","/setBPM"),Ht="".concat("app","/startPlay"),Yt="".concat("app","/stopPlay"),Qt="".concat("app","/setPlayStartTime"),Jt={state:{deviceState:null,bpm:120,playStartTime:-1},getters:{},mutations:(Nt={},yt()(Nt,Ft,function(t,e){t.deviceState=e}),yt()(Nt,zt,function(t,e){t.deviceState=e}),yt()(Nt,Qt,function(t,e){t.playStartTime=e}),Nt),actions:(Gt={},yt()(Gt,Ht,function(t){var e=I("soundManager").context;"suspended"===e.state&&e.resume(),console.log(e.currentTime),-1===t.state.playStartTime&&t.commit(Qt,e.currentTime)}),yt()(Gt,Yt,function(t){t.commit(Qt,-1)}),Gt)},Xt={name:"Transport",mounted:function(){!function(t,e){t.clearRect(0,0,e,e),k(t,e);var n=.5*e;t.beginPath(),t.moveTo(n+.4*n,n),t.lineTo(n-.2*n,n-.4*n),t.lineTo(n-.2*n,n+.4*n),t.fillStyle="white",t.fill()}(this.$refs.start.getContext("2d"),this.startStopButtonSize),function(t,e){t.clearRect(0,0,e,e),k(t,e);var n=.5*e,i=.3*n;t.beginPath(),t.moveTo(n+i,n+i),t.lineTo(n-i,n+i),t.lineTo(n-i,n-i),t.lineTo(n+i,n-i),t.lineTo(n+i,n+i),t.fillStyle="white",t.fill()}(this.$refs.stop.getContext("2d"),this.startStopButtonSize),this.frame=new q(this.onFrame)},data:function(){return{time:0,startStopButtonSize:45}},computed:O()({isPlaying:function(){return-1!==this.playStartTime}},Object(P.d)({bpm:function(t){return t.app.bpm},playStartTime:function(t){return t.app.playStartTime}})),methods:O()({startPlay:function(){this.start(),this.frame.start()},stopPlay:function(){this.stop(),this.frame.stop(),this.time=0},onFrame:function(){this.time=this.$soundManager.context.currentTime-this.playStartTime}},Object(P.b)({start:Ht,stop:Yt}))},Kt=n(93);var Zt=Object(m.a)(Xt,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{class:t.$style.info},[n("div",{class:t.$style.controls},[n("canvas",{directives:[{name:"show",rawName:"v-show",value:!t.isPlaying,expression:"!isPlaying"}],ref:"start",attrs:{width:t.startStopButtonSize,height:t.startStopButtonSize},on:{click:t.startPlay}}),t._v(" "),n("canvas",{directives:[{name:"show",rawName:"v-show",value:t.isPlaying,expression:"isPlaying"}],ref:"stop",attrs:{width:t.startStopButtonSize,height:t.startStopButtonSize},on:{click:t.stopPlay}})]),t._v(" "),n("div",{class:t.$style.time},[t._v("\n      "+t._s(t.time.toFixed(1))),n("small",[t._v("s")])]),t._v(" "),n("div",{class:t.$style.bpm},[t._v("\n      120"),n("small",[t._v("bpm")])])])])},[],!1,function(t){this.$style=Kt.default.locals||Kt.default},null,null);Zt.options.__file="Transport.vue";var te=Zt.exports,ee={name:"ModeSelector",data:function(){return{modes:[mt,ft,ht,vt,pt,gt,xt]}},computed:O()({},Object(P.d)({activeMatrixMode:function(t){return t.matrix.activeMatrixMode}})),methods:O()({modeIsEnabled:function(t){return t===mt||t===xt}},Object(P.c)({setActiveMatrixMode:bt}))},ne=n(94);var ie=Object(m.a)(ee,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ul",t._l(t.modes,function(e){return n("li",{key:e,class:(i={},i[t.$style.active]=e===t.activeMatrixMode,i[t.$style.disabled]=!t.modeIsEnabled(e),i),on:{click:function(n){t.modeIsEnabled(e)&&t.setActiveMatrixMode(e)}}},[t._v(t._s(e))]);var i}))])},[],!1,function(t){this.$style=ne.default.locals||ne.default},null,null);ie.options.__file="ModeSelector.vue";var ae={name:"HomePage",components:{WaveView:nt,Matrix:Bt,ModeSelector:ie.exports,Sidebar:ot,Header:dt,Transport:te},computed:O()({},Object(P.d)({matrix:function(t){return t.matrix.matrix},activeMatrixItems:function(t){return t.matrix.activeItems}}))},re=n(95);var oe=Object(m.a)(ae,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Header"),t._v(" "),n("div",{class:t.$style.wrap},[n("div",{class:t.$style.columns},[n("WaveView",{class:t.$style.mainColumn,attrs:{"matrix-items":t.activeMatrixItems,"initial-time-window":20,height:70,"wave-margin":20,"show-controls":!0}}),t._v(" "),n("Transport",{class:t.$style.sideColumn})],1),t._v(" "),n("div",{class:[t.$style.columns,t.$style.modeAndTransport]},[n("ModeSelector",{class:t.$style.mainColumn})],1),t._v(" "),n("div",{class:t.$style.columns},[n("Matrix",{class:t.$style.mainColumn}),t._v(" "),n("Sidebar",{class:t.$style.sideColumn})],1)])],1)},[],!1,function(t){this.$style=re.default.locals||re.default},null,null);oe.options.__file="HomePage.vue";var se={HOME:"home"},ce=[{path:"/",component:oe.exports,name:se.HOME}];i.a.use(v.a);var ue=null,le=function(){if(!ue){var t=T(),e=I("configManager"),n=t.localeEnabled&&t.localeRoutingEnabled?Object(a.routeParser)(ce,e.getProperty(_.DEFAULT_LOCALE)):ce.concat({path:"*",redirect:"/"});(ue=new v.a({mode:"history",routes:n,base:e.getVariable(b.PUBLIC_PATH)})).beforeEach(function(t,n,i){var a=e.getProperty(_.PERSIST_QUERY_PARAMS),r=!1,o=Object.assign({},t.query);a&&a.length>0&&a.forEach(function(t){void 0!==n.query[t]&&void 0===o[t]&&(o[t]=n.query[t],r=!0)}),r?i({path:t.path,query:o}):i()})}return ue},de={app:Jt,matrix:St};i.a.use(P.a);var me,fe,he,ve,pe=null,ge=function(){return pe||(pe=new P.a.Store({modules:de,strict:!1})),pe},xe=n(63),we=n.n(xe),ye=n(64),be=n.n(ye),_e={install:function(t,e){Object.keys(e).forEach(function(n){t.prototype[n]?console.error("Skipping ".concat(n,". ").concat(n," already exists on the Vue prototype")):Object.defineProperty(t.prototype,n,{get:function(){return e[n]}})})}},Me=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=O()({},n,e);return t.replace(/:(\w+)/g,function(t,e){return void 0!==i[e]?i[e]||"":t}).replace(/\/:(\w+\?+)/g,function(){return""}).replace(/\?/g,function(){return""}).replace(/:(\w+)/g,function(t,e){throw new Error('Param "'.concat(e,'" is missing in params'),i)})},Ee={ID:"id",SLUG:"slug"},Ie=[],Te={isLoaded:function(t){return Ie.includes(t)},setLoadCallback:function(t){me=t},getTranslation:function(t){var e=t.translationKey,i=t.code;return n(297)("./".concat(e,".json")).then(function(t){return Ie.push(i),me&&setTimeout(function(){me(i)}),t})}},Se=n(65),Oe=function(t){!function(){var t=I("configManager");i.a.use(_e,{$config:t,$gateway:I("gateway"),$http:we.a,$versionRoot:t.getVariable(b.VERSIONED_STATIC_ROOT),$staticRoot:t.getVariable(b.STATIC_ROOT),$soundManager:I("soundManager"),URLNames:y,PropertyNames:_,VariableNames:b,RouteNames:se,Params:Ee,createPath:Me,$deviceStateTracker:new be.a({mediaQueries:Se.b,deviceState:Se.a,showStateIndicator:!1}),DeviceState:Se.a})}();var e=I("configManager");return Promise.all([e.getVariable(b.LOCALE_ENABLED)?function(t){return new Promise(function(e){Te.isLoaded(t.getters.currentLanguage.code)?e():Te.setLoadCallback(function(n){n===t.getters.currentLanguage.code&&e()})})}(t):Promise.resolve()])},Pe=n(147),$e=n.n(Pe),Ae={environments:(fe={},yt()(fe,p,{variables:{},urls:{}}),yt()(fe,x,{extends:p,variables:{},urls:{}}),yt()(fe,g,{extends:x,variables:{},urls:{}}),yt()(fe,w,{extends:g,variables:{},urls:{}}),fe),variables:(he={},yt()(he,b.LOCALE_ENABLED,!1),yt()(he,b.LOCALE_ROUTING_ENABLED,!1),yt()(he,b.VERSIONED_STATIC_ROOT,(window.webpackPublicPath||"/")+"version/1542497646323/static/"),yt()(he,b.STATIC_ROOT,(window.webpackPublicPath||"/")+""),yt()(he,b.PUBLIC_PATH,window.webpackPublicPath||"/"),he),urls:yt()({},y.API,"".concat("/","api/")),properties:(ve={},yt()(ve,_.DEFAULT_LOCALE,"en-gb"),yt()(ve,_.AVAILABLE_LOCALES,["en-gb","en-us"]),yt()(ve,_.PERSIST_QUERY_PARAMS,[]),ve)},Le=p;switch(document.location.host.split(":").shift()){case"localhost":Le=w;break;default:Le=p}var Ce={config:Ae,environment:Le},Re=function(){var t=new $e.a;t.init(Ce.config,Ce.environment);var e=xe.create({baseURL:t.getURL(y.API),headers:{Accept:"application/json"},responseType:"json"});e.interceptors.response.use(function(t){return function(t){return t&&t.data&&void 0!==t.data.data?O()({},t,t.data):t}(t)},function(t){throw function(t){if(t&&t.response&&t.response.data&&t.response.data.error){var e=O()({config:t.config},t.response,t.response.data);return delete e.data,e}return t}(t)}),E("configManager",t),E("gateway",e),E("soundManager",new function t(){j()(this,t),this.context=new(window.AudioContext||window.webkitAudioContext)})},ke={name:"App",computed:O()({},Object(P.d)({deviceState:function(t){return t.app.deviceState}})),created:function(){this.$deviceStateTracker.addEventListener(ye.DeviceStateEvent.STATE_UPDATE,this.handleDeviceStateUpdate),this.setDeviceState(this.$deviceStateTracker.currentState),this.init()},methods:O()({},Object(P.b)({init:Tt}),Object(P.c)({setDeviceState:Ft}),{handleDeviceStateUpdate:function(t){this.setDeviceState(t.data.state)}})},De=n(96);var je=Object(m.a)(ke,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("router-view")],1)},[],!1,function(t){this.$style=De.default.locals||De.default},null,null);je.options.__file="App.vue";var Ve=je.exports,We={};Object.keys(We).forEach(function(t){return i.a.filter(t,We[t])}),Object.keys(c).forEach(function(t){return i.a.directive(t,c[t])}),Object.keys(h).forEach(function(t){return i.a.component(t,h[t])}),Re(),window.webpackPublicPath&&(n.p=window.webpackPublicPath);var qe=le(),Ue=ge(),Ne=T();Ne.localeEnabled&&(i.a.use(r.a,{store:Ue,router:Ne.localeRoutingEnabled?qe:null,config:Ne.config,proxy:Te}),i.a.initI18nManager()),Object(o.sync)(Ue,qe);var Ge=new i.a({router:qe,store:Ue,render:function(t){return t(Ve)}});Oe(Ue).then(function(){return Ge.$mount("#app")})},47:function(t,e,n){t.exports={container:"container-rOsfI30"}},48:function(t,e,n){t.exports={controls:"controls-28VeRhD"}},49:function(t,e,n){t.exports={dial:"dial-1j7CGXA"}},50:function(t,e,n){},51:function(t,e,n){t.exports={content:"content-3Yo_TiV"}},52:function(t,e,n){t.exports={wrap:"wrap-BUahSga",content:"content-3kgVuNm"}},53:function(t,e,n){},54:function(t,e,n){},55:function(t,e,n){t.exports={matrixElement:"matrixElement-29sDOc6",controls:"controls-2exnzAG"}},56:function(t,e,n){t.exports={wrap:"wrap-1Vctq6H",row:"row-3YGHVoz",rowItem:"rowItem-3OhWJc1",active:"active-28wv0I0",rowGroupItem:"rowGroupItem-3hGlYfv",columnGroupItem:"columnGroupItem-1EScXs7"}},57:function(t,e,n){t.exports={info:"info-17nsrve",controls:"controls-75k3t3C",time:"time-ktWI5nY",bpm:"bpm-2F9esqg"}},58:function(t,e,n){t.exports={disabled:"disabled-27w8XQM",active:"active-2w6Im4a"}},59:function(t,e,n){t.exports={wrap:"wrap-39unQBb",modeAndTransport:"modeAndTransport--HGeTGf",columns:"columns-1hQZKJi",mainColumn:"mainColumn-2rnFkag",sideColumn:"sideColumn-1TCUGNE"}},60:function(t,e,n){},65:function(t){t.exports={b:{SMALL:"(min-width: 480px)",MEDIUM:"(min-width: 768px)",LARGE:"(min-width: 1024px)"},a:{SMALL:0,MEDIUM:1,LARGE:2}}},82:function(t,e,n){"use strict";var i=n(47),a=n.n(i);e.default=a.a},84:function(t,e,n){"use strict";var i=n(48),a=n.n(i);e.default=a.a},85:function(t,e,n){"use strict";var i=n(49),a=n.n(i);e.default=a.a},86:function(t,e,n){"use strict";var i=n(50),a=n.n(i);e.default=a.a},87:function(t,e,n){"use strict";var i=n(51),a=n.n(i);e.default=a.a},88:function(t,e,n){"use strict";var i=n(52),a=n.n(i);e.default=a.a},89:function(t,e,n){"use strict";var i=n(53),a=n.n(i);e.default=a.a},90:function(t,e,n){"use strict";var i=n(54),a=n.n(i);e.default=a.a},91:function(t,e,n){"use strict";var i=n(55),a=n.n(i);e.default=a.a},92:function(t,e,n){"use strict";var i=n(56),a=n.n(i);e.default=a.a},93:function(t,e,n){"use strict";var i=n(57),a=n.n(i);e.default=a.a},94:function(t,e,n){"use strict";var i=n(58),a=n.n(i);e.default=a.a},95:function(t,e,n){"use strict";var i=n(59),a=n.n(i);e.default=a.a},96:function(t,e,n){"use strict";var i=n(60),a=n.n(i);e.default=a.a}});