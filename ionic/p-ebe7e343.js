/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const a=(a,i=0)=>new Promise((r=>{e(a,i,r)})),e=(a,e=0,i)=>{let r,t;const n={passive:!0},o=()=>{r&&r()},l=e=>{void 0!==e&&a!==e.target||(o(),i(e))};return a&&(a.addEventListener("webkitTransitionEnd",l,n),a.addEventListener("transitionend",l,n),t=setTimeout(l,e+500),r=()=>{t&&(clearTimeout(t),t=void 0),a.removeEventListener("webkitTransitionEnd",l,n),a.removeEventListener("transitionend",l,n)}),o},i=(a,e)=>{a.componentOnReady?a.componentOnReady().then((a=>e(a))):u((()=>e(a)))},r=(a,e=[])=>{const i={};return e.forEach((e=>{a.hasAttribute(e)&&(null!==a.getAttribute(e)&&(i[e]=a.getAttribute(e)),a.removeAttribute(e))})),i},t=["role","aria-activedescendant","aria-atomic","aria-autocomplete","aria-braillelabel","aria-brailleroledescription","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colindextext","aria-colspan","aria-controls","aria-current","aria-describedby","aria-description","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowindextext","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext"],n=(a,e)=>{let i=t;return e&&e.length>0&&(i=i.filter((a=>!e.includes(a)))),r(a,i)},o=(a,e,i,r)=>{var t;if("undefined"!=typeof window){const n=window,o=null===(t=null==n?void 0:n.Ionic)||void 0===t?void 0:t.config;if(o){const t=o.get("_ael");if(t)return t(a,e,i,r);if(o._ael)return o._ael(a,e,i,r)}}return a.addEventListener(e,i,r)},l=(a,e,i,r)=>{var t;if("undefined"!=typeof window){const n=window,o=null===(t=null==n?void 0:n.Ionic)||void 0===t?void 0:t.config;if(o){const t=o.get("_rel");if(t)return t(a,e,i,r);if(o._rel)return o._rel(a,e,i,r)}}return a.removeEventListener(e,i,r)},s=(a,e=a)=>a.shadowRoot||e,u=a=>"function"==typeof __zone_symbol__requestAnimationFrame?__zone_symbol__requestAnimationFrame(a):"function"==typeof requestAnimationFrame?requestAnimationFrame(a):setTimeout(a),d=a=>!!a.shadowRoot&&!!a.attachShadow,c=a=>{const e=a.closest("ion-item");return e?e.querySelector("ion-label"):null},f=a=>{if(a.focus(),a.classList.contains("ion-focusable")){const e=a.closest("ion-app");e&&e.setFocus([a])}},m=(a,e)=>{let i;const r=a.getAttribute("aria-labelledby"),t=a.id;let n=null!==r&&""!==r.trim()?r:e+"-lbl",o=null!==r&&""!==r.trim()?document.getElementById(r):c(a);return o?(null===r&&(o.id=n),i=o.textContent,o.setAttribute("aria-hidden","true")):""!==t.trim()&&(o=document.querySelector(`label[for="${t}"]`),o&&(""!==o.id?n=o.id:o.id=n=`${t}-lbl`,i=o.textContent)),{label:o,labelId:n,labelText:i}},b=(a,e,i,r,t)=>{if(a||d(e)){let a=e.querySelector("input.aux-input");a||(a=e.ownerDocument.createElement("input"),a.type="hidden",a.classList.add("aux-input"),e.appendChild(a)),a.disabled=t,a.name=i,a.value=r||""}},p=(a,e,i)=>Math.max(a,Math.min(e,i)),v=(a,e)=>{if(!a){const a="ASSERT: "+e;throw console.error(a),new Error(a)}},w=a=>a.timeStamp||Date.now(),x=a=>{if(a){const e=a.changedTouches;if(e&&e.length>0){const a=e[0];return{x:a.clientX,y:a.clientY}}if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY}}return{x:0,y:0}},y=a=>{const e="rtl"===document.dir;switch(a){case"start":return e;case"end":return!e;default:throw new Error(`"${a}" is not a valid value for [side]. Use "start" or "end" instead.`)}},h=(a,e)=>{const i=a._original||a;return{_original:a,emit:_(i.emit.bind(i),e)}},_=(a,e=0)=>{let i;return(...r)=>{clearTimeout(i),i=setTimeout(a,e,...r)}},T=(a,e)=>{if(null!=a||(a={}),null!=e||(e={}),a===e)return!0;const i=Object.keys(a);if(i.length!==Object.keys(e).length)return!1;for(const r of i){if(!(r in e))return!1;if(a[r]!==e[r])return!1}return!0};export{o as a,l as b,i as c,m as d,b as e,f,s as g,h,n as i,r as j,c as k,p as l,d as m,v as n,y as o,x as p,_ as q,u as r,T as s,a as t,w as u}