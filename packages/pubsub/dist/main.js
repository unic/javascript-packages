!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var u=t[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,u=!1,o=void 0;try{for(var i,f=e[Symbol.iterator]();!(n=(i=f.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){u=!0,o=e}finally{try{!n&&f.return&&f.return()}finally{if(u)throw o}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(){var e=-1,t={},r=function(e){return"number"==typeof e&&Object.entries(t).forEach(function(r){for(var u=n(r,2),o=u[0],i=u[1],f=0;f<i.queue.length;f+=1)if(i.queue[f].uid===e)return i.queue.splice(f,1),i.queue.length||delete t[o],e;return!0}),"string"==typeof e?(delete t[e],e):-1};return{on:function(r,n){var u=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return e+=1,t[r]||(t[r]={queue:[]}),t[r].queue.push({uid:e,listener:n,once:u}),e},off:r,trigger:function(e){for(var n=arguments.length,u=Array(n>1?n-1:0),o=1;o<n;o++)u[o-1]=arguments[o];t[e]&&t[e].queue.length&&t[e].queue.slice(0).forEach(function(e){e.listener.apply(e,u),e.once&&r(e.uid)})}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,u=r(0),o=(n=u)&&n.__esModule?n:{default:n};console.log(o.default);var i=void 0;t.default={getInstance:function(){return i||(i=(0,o.default)()),i}}}])});