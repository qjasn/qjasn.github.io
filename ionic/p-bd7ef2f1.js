/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const o=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],t=t=>{let e=[],n=!0;const s=t?t.shadowRoot:document,c=t||document.body,u=o=>{e.forEach((o=>o.classList.remove("ion-focused"))),o.forEach((o=>o.classList.add("ion-focused"))),e=o},r=()=>{n=!1,u([])},d=t=>{n=o.includes(t.key),n||u([])},f=o=>{if(n&&void 0!==o.composedPath){const t=o.composedPath().filter((o=>!!o.classList&&o.classList.contains("ion-focusable")));u(t)}},i=()=>{s.activeElement===c&&u([])};return s.addEventListener("keydown",d),s.addEventListener("focusin",f),s.addEventListener("focusout",i),s.addEventListener("touchstart",r),s.addEventListener("mousedown",r),{destroy:()=>{s.removeEventListener("keydown",d),s.removeEventListener("focusin",f),s.removeEventListener("focusout",i),s.removeEventListener("touchstart",r),s.removeEventListener("mousedown",r)},setFocus:u}};export{t as startFocusVisible}