var __awaiter=this&&this.__awaiter||function(r,e,t,n){function o(r){return r instanceof t?r:new t((function(e){e(r)}))}return new(t||(t=Promise))((function(t,a){function i(r){try{c(n.next(r))}catch(r){a(r)}}function u(r){try{c(n["throw"](r))}catch(r){a(r)}}function c(r){r.done?t(r.value):o(r.value).then(i,u)}c((n=n.apply(r,e||[])).next())}))};var __generator=this&&this.__generator||function(r,e){var t={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,o,a,i;return i={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(i[Symbol.iterator]=function(){return this}),i;function u(r){return function(e){return c([r,e])}}function c(i){if(n)throw new TypeError("Generator is already executing.");while(t)try{if(n=1,o&&(a=i[0]&2?o["return"]:i[0]?o["throw"]||((a=o["return"])&&a.call(o),0):o.next)&&!(a=a.call(o,i[1])).done)return a;if(o=0,a)i=[i[0]&2,a.value];switch(i[0]){case 0:case 1:a=i;break;case 4:t.label++;return{value:i[1],done:false};case 5:t.label++;o=i[1];i=[0];continue;case 7:i=t.ops.pop();t.trys.pop();continue;default:if(!(a=t.trys,a=a.length>0&&a[a.length-1])&&(i[0]===6||i[0]===2)){t=0;continue}if(i[0]===3&&(!a||i[1]>a[0]&&i[1]<a[3])){t.label=i[1];break}if(i[0]===6&&t.label<a[1]){t.label=a[1];a=i;break}if(a&&t.label<a[2]){t.label=a[2];t.ops.push(i);break}if(a[2])t.ops.pop();t.trys.pop();continue}i=e.call(r,t)}catch(r){i=[6,r];o=0}finally{n=a=0}if(i[0]&5)throw i[1];return{value:i[0]?i[1]:void 0,done:true}}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register(["./p-d020342e.system.js","./p-5c49b484.system.js"],(function(r){"use strict";var e,t;return{setters:[function(r){e=r.c},function(r){t=r.a}],execute:function(){var n=this;var o="ION-CONTENT";var a=r("I","ion-content");var i=r("b",".ion-content-scroll-host");var u="".concat(a,", ").concat(i);var c=r("i",(function(r){return r.tagName===o}));var l=r("g",(function(r){return __awaiter(n,void 0,void 0,(function(){return __generator(this,(function(t){switch(t.label){case 0:if(!c(r))return[3,2];return[4,new Promise((function(t){return e(r,t)}))];case 1:t.sent();return[2,r.getScrollElement()];case 2:return[2,r]}}))}))}));var s=r("a",(function(r){var e=r.querySelector(i);if(e){return e}return r.querySelector(u)}));var f=r("f",(function(r){return r.closest(u)}));var v=r("s",(function(r,e){if(c(r)){var t=r;return t.scrollToTop(e)}return Promise.resolve(r.scrollTo({top:0,left:0,behavior:e>0?"smooth":"auto"}))}));var h=r("c",(function(r,e,t,n){if(c(r)){var o=r;return o.scrollByPoint(e,t,n)}return Promise.resolve(r.scrollBy({top:t,left:e,behavior:n>0?"smooth":"auto"}))}));var p=r("p",(function(r){return t(r,a)}));var y=r("d",(function(r){if(c(r)){var e=r;var t=e.scrollY;e.scrollY=false;return t}else{r.style.setProperty("overflow","hidden");return true}}));var b=r("r",(function(r,e){if(c(r)){r.scrollY=e}else{r.style.removeProperty("overflow")}}))}}}));