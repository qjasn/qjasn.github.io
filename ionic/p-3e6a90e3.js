/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import{c as e}from"./p-ebe7e343.js";const o=async(o,t,i,n,r,s)=>{var a;if(o)return o.attachViewToDom(t,i,r,n);if(!(s||"string"==typeof i||i instanceof HTMLElement))throw new Error("framework delegate is missing");const c="string"==typeof i?null===(a=t.ownerDocument)||void 0===a?void 0:a.createElement(i):i;return n&&n.forEach((e=>c.classList.add(e))),r&&Object.assign(c,r),t.appendChild(c),await new Promise((o=>e(c,o))),c},t=(e,o)=>{if(o){if(e)return e.removeViewFromDom(o.parentElement,o);o.remove()}return Promise.resolve()},i=()=>{let o,t;return{attachViewToDom:async(i,n,r={},s=[])=>{var a,c;if(o=i,n){const t="string"==typeof n?null===(a=o.ownerDocument)||void 0===a?void 0:a.createElement(n):n;s.forEach((e=>t.classList.add(e))),Object.assign(t,r),o.appendChild(t),await new Promise((o=>e(t,o)))}else if(o.children.length>0&&!o.children[0].classList.contains("ion-delegate-host")){const e=null===(c=o.ownerDocument)||void 0===c?void 0:c.createElement("div");e.classList.add("ion-delegate-host"),s.forEach((o=>e.classList.add(o))),e.append(...o.children),o.appendChild(e)}const m=document.querySelector("ion-app")||document.body;return t=document.createComment("ionic teleport"),o.parentNode.insertBefore(t,o),m.appendChild(o),o},removeViewFromDom:()=>(o&&t&&(t.parentNode.insertBefore(o,t),t.remove()),Promise.resolve())}};export{i as C,o as a,t as d}