!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.logger=t():e.logger=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var o={};return t.m=e,t.c=o,t.d=function(e,o,r){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,o){var r,n,f;!function(o,u){n=[t],r=u,void 0!==(f="function"==typeof r?r.apply(t,n):r)&&(e.exports=f)}(0,function(e){"use strict";function t(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(e){return{log:function(){if(window.localStorage&&window.localStorage.debug){for(var o=arguments.length,r=Array(o),n=0;n<o;n++)r[n]=arguments[n];if("string"==typeof e&&e.length>0){var f;(f=console).log.apply(f,[e+" →"].concat(t(r)))}else{var u;(u=console).log.apply(u,t(r))}}}}}})}])});