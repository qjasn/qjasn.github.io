var __awaiter=this&&this.__awaiter||function(e,t,i,r){function n(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,s){function o(e){try{l(r.next(e))}catch(e){s(e)}}function a(e){try{l(r["throw"](e))}catch(e){s(e)}}function l(e){e.done?i(e.value):n(e.value).then(o,a)}l((r=r.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},r,n,s,o;return o={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function a(e){return function(t){return l([e,t])}}function l(o){if(r)throw new TypeError("Generator is already executing.");while(i)try{if(r=1,n&&(s=o[0]&2?n["return"]:o[0]?n["throw"]||((s=n["return"])&&s.call(n),0):n.next)&&!(s=s.call(n,o[1])).done)return s;if(n=0,s)o=[o[0]&2,s.value];switch(o[0]){case 0:case 1:s=o;break;case 4:i.label++;return{value:o[1],done:false};case 5:i.label++;n=o[1];o=[0];continue;case 7:o=i.ops.pop();i.trys.pop();continue;default:if(!(s=i.trys,s=s.length>0&&s[s.length-1])&&(o[0]===6||o[0]===2)){i=0;continue}if(o[0]===3&&(!s||o[1]>s[0]&&o[1]<s[3])){i.label=o[1];break}if(o[0]===6&&i.label<s[1]){i.label=s[1];s=o;break}if(s&&i.label<s[2]){i.label=s[2];i.ops.push(o);break}if(s[2])i.ops.pop();i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e];n=0}finally{r=s=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true}}};
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */System.register(["./p-492d5033.system.js","./p-315311a8.system.js"],(function(e){"use strict";var t,i,r,n,s,o;return{setters:[function(e){t=e.r;i=e.e;r=e.h;n=e.H;s=e.i},function(e){o=e.b}],execute:function(){var a=":host{--side-width:100%;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}::slotted(ion-menu.menu-pane-visible){-ms-flex:0 1 auto;flex:0 1 auto;width:var(--side-width);min-width:var(--side-min-width);max-width:var(--side-max-width)}:host(.split-pane-visible) ::slotted(.split-pane-side),:host(.split-pane-visible) ::slotted(.split-pane-main){left:0;right:0;top:0;bottom:0;position:relative;-webkit-box-shadow:none !important;box-shadow:none !important;z-index:0}:host(.split-pane-visible) ::slotted(.split-pane-main){-ms-flex:1;flex:1}:host(.split-pane-visible) ::slotted(.split-pane-side:not(ion-menu)),:host(.split-pane-visible) ::slotted(ion-menu.split-pane-side.menu-enabled){display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}::slotted(.split-pane-side:not(ion-menu)){display:none}:host(.split-pane-visible) ::slotted(.split-pane-side){-ms-flex-order:-1;order:-1}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){-ms-flex-order:1;order:1}:host{--border:0.55px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-250, #c8c7cc)));--side-min-width:270px;--side-max-width:28%}:host(.split-pane-visible) ::slotted(.split-pane-side){border-left:0;border-right:var(--border);border-top:0;border-bottom:0;min-width:var(--side-min-width);max-width:var(--side-max-width)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.split-pane-visible) ::slotted(.split-pane-side){border-left:unset;border-right:unset;-webkit-border-start:0;border-inline-start:0;-webkit-border-end:var(--border);border-inline-end:var(--border)}}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){border-left:var(--border);border-right:0;border-top:0;border-bottom:0;min-width:var(--side-min-width);max-width:var(--side-max-width)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){border-left:unset;border-right:unset;-webkit-border-start:var(--border);border-inline-start:var(--border);-webkit-border-end:0;border-inline-end:0}}";var l=":host{--side-width:100%;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;contain:strict}::slotted(ion-menu.menu-pane-visible){-ms-flex:0 1 auto;flex:0 1 auto;width:var(--side-width);min-width:var(--side-min-width);max-width:var(--side-max-width)}:host(.split-pane-visible) ::slotted(.split-pane-side),:host(.split-pane-visible) ::slotted(.split-pane-main){left:0;right:0;top:0;bottom:0;position:relative;-webkit-box-shadow:none !important;box-shadow:none !important;z-index:0}:host(.split-pane-visible) ::slotted(.split-pane-main){-ms-flex:1;flex:1}:host(.split-pane-visible) ::slotted(.split-pane-side:not(ion-menu)),:host(.split-pane-visible) ::slotted(ion-menu.split-pane-side.menu-enabled){display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0}::slotted(.split-pane-side:not(ion-menu)){display:none}:host(.split-pane-visible) ::slotted(.split-pane-side){-ms-flex-order:-1;order:-1}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){-ms-flex-order:1;order:1}:host{--border:1px solid var(--ion-item-border-color, var(--ion-border-color, var(--ion-color-step-150, rgba(0, 0, 0, 0.13))));--side-min-width:270px;--side-max-width:28%}:host(.split-pane-visible) ::slotted(.split-pane-side){border-left:0;border-right:var(--border);border-top:0;border-bottom:0;min-width:var(--side-min-width);max-width:var(--side-max-width)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.split-pane-visible) ::slotted(.split-pane-side){border-left:unset;border-right:unset;-webkit-border-start:0;border-inline-start:0;-webkit-border-end:var(--border);border-inline-end:var(--border)}}:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){border-left:var(--border);border-right:0;border-top:0;border-bottom:0;min-width:var(--side-min-width);max-width:var(--side-max-width)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.split-pane-visible) ::slotted(.split-pane-side[side=end]){border-left:unset;border-right:unset;-webkit-border-start:var(--border);border-inline-start:var(--border);-webkit-border-end:0;border-inline-end:0}}";var d="split-pane-main";var p="split-pane-side";var b={xs:"(min-width: 0px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",never:""};var h=e("ion_split_pane",function(){function e(e){t(this,e);this.ionSplitPaneVisible=i(this,"ionSplitPaneVisible",7);this.visible=false;this.disabled=false;this.when=b["lg"]}e.prototype.visibleChanged=function(e){var t={visible:e,isPane:this.isPane.bind(this)};this.ionSplitPaneVisible.emit(t)};e.prototype.connectedCallback=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){switch(e.label){case 0:if(!(typeof customElements!=="undefined"))return[3,2];return[4,customElements.whenDefined("ion-split-pane")];case 1:e.sent();e.label=2;case 2:this.styleChildren();this.updateState();return[2]}}))}))};e.prototype.disconnectedCallback=function(){if(this.rmL){this.rmL();this.rmL=undefined}};e.prototype.updateState=function(){var e=this;if(this.rmL){this.rmL();this.rmL=undefined}if(this.disabled){this.visible=false;return}var t=this.when;if(typeof t==="boolean"){this.visible=t;return}var i=b[t]||t;if(i.length===0){this.visible=false;return}if(window.matchMedia){var r=function(t){e.visible=t.matches};var n=window.matchMedia(i);n.addListener(r);this.rmL=function(){return n.removeListener(r)};this.visible=n.matches}};e.prototype.isPane=function(e){if(!this.visible){return false}return e.parentElement===this.el&&e.classList.contains(p)};e.prototype.styleChildren=function(){var e=this.contentId;var t=this.el.children;var i=this.el.childElementCount;var r=false;for(var n=0;n<i;n++){var s=t[n];var o=e!==undefined&&s.id===e;if(o){if(r){console.warn("split pane cannot have more than one main node");return}r=true}u(s,o)}if(!r){console.warn("split pane does not have a specified main node")}};e.prototype.render=function(){var e;var t=o(this);return r(n,{class:(e={},e[t]=true,e["split-pane-".concat(t)]=true,e["split-pane-visible"]=this.visible,e)},r("slot",null))};Object.defineProperty(e.prototype,"el",{get:function(){return s(this)},enumerable:false,configurable:true});Object.defineProperty(e,"watchers",{get:function(){return{visible:["visibleChanged"],disabled:["updateState"],when:["updateState"]}},enumerable:false,configurable:true});return e}());var u=function(e,t){var i;var r;if(t){i=d;r=p}else{i=p;r=d}var n=e.classList;n.add(i);n.remove(r)};h.style={ios:a,md:l}}}}));