!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){var n,o;void 0===(o="function"==typeof(n=function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function(){var e=-1,t={},r=function(e){return"number"==typeof e&&Object.entries(t).forEach(function(r){for(var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,o=!1,u=void 0;try{for(var i,f=e[Symbol.iterator]();!(n=(i=f.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,u=e}finally{try{!n&&f.return&&f.return()}finally{if(o)throw u}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}(r,2),o=n[0],u=n[1],i=0;i<u.queue.length;i+=1)if(u.queue[i].uid===e)return u.queue.splice(i,1),u.queue.length||delete t[o],e;return!0}),"string"==typeof e?(delete t[e],e):-1};return{on:function(r,n){var o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return e+=1,t[r]||(t[r]={queue:[]}),t[r].queue.push({uid:e,listener:n,once:o}),e},off:r,trigger:function(e){for(var n=arguments.length,o=Array(n>1?n-1:0),u=1;u<n;u++)o[u-1]=arguments[u];t[e]&&t[e].queue.length&&t[e].queue.slice(0).forEach(function(e){e.listener.apply(e,o),e.once&&r(e.uid)})}}}})?n.apply(t,[t]):n)||(e.exports=o)}])});