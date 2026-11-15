var pc=Object.create;var kr=Object.defineProperty;var mc=Object.getOwnPropertyDescriptor;var gc=Object.getOwnPropertyNames;var yc=Object.getPrototypeOf,vc=Object.prototype.hasOwnProperty;var xc=(o,t,e)=>t in o?kr(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var _c=(o,t,e)=>()=>{if(e)throw e[0];try{return o&&(t=o(o=0)),t}catch(n){throw e=[n],n}};var zr=(o,t)=>()=>{try{return t||o((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var Mc=(o,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of gc(t))!vc.call(o,i)&&i!==e&&kr(o,i,{get:()=>t[i],enumerable:!(n=mc(t,i))||n.enumerable});return o};var wc=(o,t,e)=>(e=o!=null?pc(yc(o)):{},Mc(t||!o||!o.__esModule?kr(e,"default",{value:o,enumerable:!0}):e,o));var M=(o,t,e)=>xc(o,typeof t!="symbol"?t+"":t,e);var Go=zr(li=>{"use strict";L();li.byteLength=Sc;li.toByteArray=Tc;li.fromByteArray=Rc;var Ot=[],St=[],bc=typeof Uint8Array<"u"?Uint8Array:Array,Vr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(be=0,Vo=Vr.length;be<Vo;++be)Ot[be]=Vr[be],St[Vr.charCodeAt(be)]=be;var be,Vo;St[45]=62;St[95]=63;function Ho(o){var t=o.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=o.indexOf("=");e===-1&&(e=t);var n=e===t?0:4-e%4;return[e,n]}function Sc(o){var t=Ho(o),e=t[0],n=t[1];return(e+n)*3/4-n}function Ec(o,t,e){return(t+e)*3/4-e}function Tc(o){var t,e=Ho(o),n=e[0],i=e[1],r=new bc(Ec(o,n,i)),s=0,a=i>0?n-4:n,l;for(l=0;l<a;l+=4)t=St[o.charCodeAt(l)]<<18|St[o.charCodeAt(l+1)]<<12|St[o.charCodeAt(l+2)]<<6|St[o.charCodeAt(l+3)],r[s++]=t>>16&255,r[s++]=t>>8&255,r[s++]=t&255;return i===2&&(t=St[o.charCodeAt(l)]<<2|St[o.charCodeAt(l+1)]>>4,r[s++]=t&255),i===1&&(t=St[o.charCodeAt(l)]<<10|St[o.charCodeAt(l+1)]<<4|St[o.charCodeAt(l+2)]>>2,r[s++]=t>>8&255,r[s++]=t&255),r}function Ac(o){return Ot[o>>18&63]+Ot[o>>12&63]+Ot[o>>6&63]+Ot[o&63]}function Cc(o,t,e){for(var n,i=[],r=t;r<e;r+=3)n=(o[r]<<16&16711680)+(o[r+1]<<8&65280)+(o[r+2]&255),i.push(Ac(n));return i.join("")}function Rc(o){for(var t,e=o.length,n=e%3,i=[],r=16383,s=0,a=e-n;s<a;s+=r)i.push(Cc(o,s,s+r>a?a:s+r));return n===1?(t=o[e-1],i.push(Ot[t>>2]+Ot[t<<4&63]+"==")):n===2&&(t=(o[e-2]<<8)+o[e-1],i.push(Ot[t>>10]+Ot[t>>4&63]+Ot[t<<2&63]+"=")),i.join("")}});var Wo=zr(Hr=>{L();Hr.read=function(o,t,e,n,i){var r,s,a=i*8-n-1,l=(1<<a)-1,c=l>>1,h=-7,u=e?i-1:0,f=e?-1:1,d=o[t+u];for(u+=f,r=d&(1<<-h)-1,d>>=-h,h+=a;h>0;r=r*256+o[t+u],u+=f,h-=8);for(s=r&(1<<-h)-1,r>>=-h,h+=n;h>0;s=s*256+o[t+u],u+=f,h-=8);if(r===0)r=1-c;else{if(r===l)return s?NaN:(d?-1:1)*(1/0);s=s+Math.pow(2,n),r=r-c}return(d?-1:1)*s*Math.pow(2,r-n)};Hr.write=function(o,t,e,n,i,r){var s,a,l,c=r*8-i-1,h=(1<<c)-1,u=h>>1,f=i===23?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:r-1,p=n?1:-1,m=t<0||t===0&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,s=h):(s=Math.floor(Math.log(t)/Math.LN2),t*(l=Math.pow(2,-s))<1&&(s--,l*=2),s+u>=1?t+=f/l:t+=f*Math.pow(2,1-u),t*l>=2&&(s++,l/=2),s+u>=h?(a=0,s=h):s+u>=1?(a=(t*l-1)*Math.pow(2,i),s=s+u):(a=t*Math.pow(2,u-1)*Math.pow(2,i),s=0));i>=8;o[e+d]=a&255,d+=p,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;o[e+d]=s&255,d+=p,s/=256,c-=8);o[e+d-p]|=m*128}});var aa=zr(qe=>{"use strict";L();var Gr=Go(),We=Wo(),Xo=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;qe.Buffer=b;qe.SlowBuffer=Fc;qe.INSPECT_MAX_BYTES=50;var ci=2147483647;qe.kMaxLength=ci;b.TYPED_ARRAY_SUPPORT=Ic();!b.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function Ic(){try{let o=new Uint8Array(1),t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(o,t),o.foo()===42}catch{return!1}}Object.defineProperty(b.prototype,"parent",{enumerable:!0,get:function(){if(b.isBuffer(this))return this.buffer}});Object.defineProperty(b.prototype,"offset",{enumerable:!0,get:function(){if(b.isBuffer(this))return this.byteOffset}});function $t(o){if(o>ci)throw new RangeError('The value "'+o+'" is invalid for option "size"');let t=new Uint8Array(o);return Object.setPrototypeOf(t,b.prototype),t}function b(o,t,e){if(typeof o=="number"){if(typeof t=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return $r(o)}return Zo(o,t,e)}b.poolSize=8192;function Zo(o,t,e){if(typeof o=="string")return Lc(o,t);if(ArrayBuffer.isView(o))return Dc(o);if(o==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof o);if(Bt(o,ArrayBuffer)||o&&Bt(o.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(Bt(o,SharedArrayBuffer)||o&&Bt(o.buffer,SharedArrayBuffer)))return Xr(o,t,e);if(typeof o=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');let n=o.valueOf&&o.valueOf();if(n!=null&&n!==o)return b.from(n,t,e);let i=Uc(o);if(i)return i;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof o[Symbol.toPrimitive]=="function")return b.from(o[Symbol.toPrimitive]("string"),t,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof o)}b.from=function(o,t,e){return Zo(o,t,e)};Object.setPrototypeOf(b.prototype,Uint8Array.prototype);Object.setPrototypeOf(b,Uint8Array);function jo(o){if(typeof o!="number")throw new TypeError('"size" argument must be of type number');if(o<0)throw new RangeError('The value "'+o+'" is invalid for option "size"')}function Pc(o,t,e){return jo(o),o<=0?$t(o):t!==void 0?typeof e=="string"?$t(o).fill(t,e):$t(o).fill(t):$t(o)}b.alloc=function(o,t,e){return Pc(o,t,e)};function $r(o){return jo(o),$t(o<0?0:Yr(o)|0)}b.allocUnsafe=function(o){return $r(o)};b.allocUnsafeSlow=function(o){return $r(o)};function Lc(o,t){if((typeof t!="string"||t==="")&&(t="utf8"),!b.isEncoding(t))throw new TypeError("Unknown encoding: "+t);let e=Jo(o,t)|0,n=$t(e),i=n.write(o,t);return i!==e&&(n=n.slice(0,i)),n}function Wr(o){let t=o.length<0?0:Yr(o.length)|0,e=$t(t);for(let n=0;n<t;n+=1)e[n]=o[n]&255;return e}function Dc(o){if(Bt(o,Uint8Array)){let t=new Uint8Array(o);return Xr(t.buffer,t.byteOffset,t.byteLength)}return Wr(o)}function Xr(o,t,e){if(t<0||o.byteLength<t)throw new RangeError('"offset" is outside of buffer bounds');if(o.byteLength<t+(e||0))throw new RangeError('"length" is outside of buffer bounds');let n;return t===void 0&&e===void 0?n=new Uint8Array(o):e===void 0?n=new Uint8Array(o,t):n=new Uint8Array(o,t,e),Object.setPrototypeOf(n,b.prototype),n}function Uc(o){if(b.isBuffer(o)){let t=Yr(o.length)|0,e=$t(t);return e.length===0||o.copy(e,0,0,t),e}if(o.length!==void 0)return typeof o.length!="number"||jr(o.length)?$t(0):Wr(o);if(o.type==="Buffer"&&Array.isArray(o.data))return Wr(o.data)}function Yr(o){if(o>=ci)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+ci.toString(16)+" bytes");return o|0}function Fc(o){return+o!=o&&(o=0),b.alloc(+o)}b.isBuffer=function(t){return t!=null&&t._isBuffer===!0&&t!==b.prototype};b.compare=function(t,e){if(Bt(t,Uint8Array)&&(t=b.from(t,t.offset,t.byteLength)),Bt(e,Uint8Array)&&(e=b.from(e,e.offset,e.byteLength)),!b.isBuffer(t)||!b.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let n=t.length,i=e.length;for(let r=0,s=Math.min(n,i);r<s;++r)if(t[r]!==e[r]){n=t[r],i=e[r];break}return n<i?-1:i<n?1:0};b.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}};b.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(t.length===0)return b.alloc(0);let n;if(e===void 0)for(e=0,n=0;n<t.length;++n)e+=t[n].length;let i=b.allocUnsafe(e),r=0;for(n=0;n<t.length;++n){let s=t[n];if(Bt(s,Uint8Array))r+s.length>i.length?(b.isBuffer(s)||(s=b.from(s)),s.copy(i,r)):Uint8Array.prototype.set.call(i,s,r);else if(b.isBuffer(s))s.copy(i,r);else throw new TypeError('"list" argument must be an Array of Buffers');r+=s.length}return i};function Jo(o,t){if(b.isBuffer(o))return o.length;if(ArrayBuffer.isView(o)||Bt(o,ArrayBuffer))return o.byteLength;if(typeof o!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof o);let e=o.length,n=arguments.length>2&&arguments[2]===!0;if(!n&&e===0)return 0;let i=!1;for(;;)switch(t){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return qr(o).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return e*2;case"hex":return e>>>1;case"base64":return oa(o).length;default:if(i)return n?-1:qr(o).length;t=(""+t).toLowerCase(),i=!0}}b.byteLength=Jo;function Nc(o,t,e){let n=!1;if((t===void 0||t<0)&&(t=0),t>this.length||((e===void 0||e>this.length)&&(e=this.length),e<=0)||(e>>>=0,t>>>=0,e<=t))return"";for(o||(o="utf8");;)switch(o){case"hex":return qc(this,t,e);case"utf8":case"utf-8":return Qo(this,t,e);case"ascii":return Wc(this,t,e);case"latin1":case"binary":return Xc(this,t,e);case"base64":return Hc(this,t,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return $c(this,t,e);default:if(n)throw new TypeError("Unknown encoding: "+o);o=(o+"").toLowerCase(),n=!0}}b.prototype._isBuffer=!0;function Se(o,t,e){let n=o[t];o[t]=o[e],o[e]=n}b.prototype.swap16=function(){let t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)Se(this,e,e+1);return this};b.prototype.swap32=function(){let t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)Se(this,e,e+3),Se(this,e+1,e+2);return this};b.prototype.swap64=function(){let t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)Se(this,e,e+7),Se(this,e+1,e+6),Se(this,e+2,e+5),Se(this,e+3,e+4);return this};b.prototype.toString=function(){let t=this.length;return t===0?"":arguments.length===0?Qo(this,0,t):Nc.apply(this,arguments)};b.prototype.toLocaleString=b.prototype.toString;b.prototype.equals=function(t){if(!b.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t?!0:b.compare(this,t)===0};b.prototype.inspect=function(){let t="",e=qe.INSPECT_MAX_BYTES;return t=this.toString("hex",0,e).replace(/(.{2})/g,"$1 ").trim(),this.length>e&&(t+=" ... "),"<Buffer "+t+">"};Xo&&(b.prototype[Xo]=b.prototype.inspect);b.prototype.compare=function(t,e,n,i,r){if(Bt(t,Uint8Array)&&(t=b.from(t,t.offset,t.byteLength)),!b.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(e===void 0&&(e=0),n===void 0&&(n=t?t.length:0),i===void 0&&(i=0),r===void 0&&(r=this.length),e<0||n>t.length||i<0||r>this.length)throw new RangeError("out of range index");if(i>=r&&e>=n)return 0;if(i>=r)return-1;if(e>=n)return 1;if(e>>>=0,n>>>=0,i>>>=0,r>>>=0,this===t)return 0;let s=r-i,a=n-e,l=Math.min(s,a),c=this.slice(i,r),h=t.slice(e,n);for(let u=0;u<l;++u)if(c[u]!==h[u]){s=c[u],a=h[u];break}return s<a?-1:a<s?1:0};function Ko(o,t,e,n,i){if(o.length===0)return-1;if(typeof e=="string"?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,jr(e)&&(e=i?0:o.length-1),e<0&&(e=o.length+e),e>=o.length){if(i)return-1;e=o.length-1}else if(e<0)if(i)e=0;else return-1;if(typeof t=="string"&&(t=b.from(t,n)),b.isBuffer(t))return t.length===0?-1:qo(o,t,e,n,i);if(typeof t=="number")return t=t&255,typeof Uint8Array.prototype.indexOf=="function"?i?Uint8Array.prototype.indexOf.call(o,t,e):Uint8Array.prototype.lastIndexOf.call(o,t,e):qo(o,[t],e,n,i);throw new TypeError("val must be string, number or Buffer")}function qo(o,t,e,n,i){let r=1,s=o.length,a=t.length;if(n!==void 0&&(n=String(n).toLowerCase(),n==="ucs2"||n==="ucs-2"||n==="utf16le"||n==="utf-16le")){if(o.length<2||t.length<2)return-1;r=2,s/=2,a/=2,e/=2}function l(h,u){return r===1?h[u]:h.readUInt16BE(u*r)}let c;if(i){let h=-1;for(c=e;c<s;c++)if(l(o,c)===l(t,h===-1?0:c-h)){if(h===-1&&(h=c),c-h+1===a)return h*r}else h!==-1&&(c-=c-h),h=-1}else for(e+a>s&&(e=s-a),c=e;c>=0;c--){let h=!0;for(let u=0;u<a;u++)if(l(o,c+u)!==l(t,u)){h=!1;break}if(h)return c}return-1}b.prototype.includes=function(t,e,n){return this.indexOf(t,e,n)!==-1};b.prototype.indexOf=function(t,e,n){return Ko(this,t,e,n,!0)};b.prototype.lastIndexOf=function(t,e,n){return Ko(this,t,e,n,!1)};function Oc(o,t,e,n){e=Number(e)||0;let i=o.length-e;n?(n=Number(n),n>i&&(n=i)):n=i;let r=t.length;n>r/2&&(n=r/2);let s;for(s=0;s<n;++s){let a=parseInt(t.substr(s*2,2),16);if(jr(a))return s;o[e+s]=a}return s}function Bc(o,t,e,n){return hi(qr(t,o.length-e),o,e,n)}function kc(o,t,e,n){return hi(Jc(t),o,e,n)}function zc(o,t,e,n){return hi(oa(t),o,e,n)}function Vc(o,t,e,n){return hi(Kc(t,o.length-e),o,e,n)}b.prototype.write=function(t,e,n,i){if(e===void 0)i="utf8",n=this.length,e=0;else if(n===void 0&&typeof e=="string")i=e,n=this.length,e=0;else if(isFinite(e))e=e>>>0,isFinite(n)?(n=n>>>0,i===void 0&&(i="utf8")):(i=n,n=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");let r=this.length-e;if((n===void 0||n>r)&&(n=r),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");i||(i="utf8");let s=!1;for(;;)switch(i){case"hex":return Oc(this,t,e,n);case"utf8":case"utf-8":return Bc(this,t,e,n);case"ascii":case"latin1":case"binary":return kc(this,t,e,n);case"base64":return zc(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Vc(this,t,e,n);default:if(s)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase(),s=!0}};b.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function Hc(o,t,e){return t===0&&e===o.length?Gr.fromByteArray(o):Gr.fromByteArray(o.slice(t,e))}function Qo(o,t,e){e=Math.min(o.length,e);let n=[],i=t;for(;i<e;){let r=o[i],s=null,a=r>239?4:r>223?3:r>191?2:1;if(i+a<=e){let l,c,h,u;switch(a){case 1:r<128&&(s=r);break;case 2:l=o[i+1],(l&192)===128&&(u=(r&31)<<6|l&63,u>127&&(s=u));break;case 3:l=o[i+1],c=o[i+2],(l&192)===128&&(c&192)===128&&(u=(r&15)<<12|(l&63)<<6|c&63,u>2047&&(u<55296||u>57343)&&(s=u));break;case 4:l=o[i+1],c=o[i+2],h=o[i+3],(l&192)===128&&(c&192)===128&&(h&192)===128&&(u=(r&15)<<18|(l&63)<<12|(c&63)<<6|h&63,u>65535&&u<1114112&&(s=u))}}s===null?(s=65533,a=1):s>65535&&(s-=65536,n.push(s>>>10&1023|55296),s=56320|s&1023),n.push(s),i+=a}return Gc(n)}var $o=4096;function Gc(o){let t=o.length;if(t<=$o)return String.fromCharCode.apply(String,o);let e="",n=0;for(;n<t;)e+=String.fromCharCode.apply(String,o.slice(n,n+=$o));return e}function Wc(o,t,e){let n="";e=Math.min(o.length,e);for(let i=t;i<e;++i)n+=String.fromCharCode(o[i]&127);return n}function Xc(o,t,e){let n="";e=Math.min(o.length,e);for(let i=t;i<e;++i)n+=String.fromCharCode(o[i]);return n}function qc(o,t,e){let n=o.length;(!t||t<0)&&(t=0),(!e||e<0||e>n)&&(e=n);let i="";for(let r=t;r<e;++r)i+=Qc[o[r]];return i}function $c(o,t,e){let n=o.slice(t,e),i="";for(let r=0;r<n.length-1;r+=2)i+=String.fromCharCode(n[r]+n[r+1]*256);return i}b.prototype.slice=function(t,e){let n=this.length;t=~~t,e=e===void 0?n:~~e,t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),e<0?(e+=n,e<0&&(e=0)):e>n&&(e=n),e<t&&(e=t);let i=this.subarray(t,e);return Object.setPrototypeOf(i,b.prototype),i};function et(o,t,e){if(o%1!==0||o<0)throw new RangeError("offset is not uint");if(o+t>e)throw new RangeError("Trying to access beyond buffer length")}b.prototype.readUintLE=b.prototype.readUIntLE=function(t,e,n){t=t>>>0,e=e>>>0,n||et(t,e,this.length);let i=this[t],r=1,s=0;for(;++s<e&&(r*=256);)i+=this[t+s]*r;return i};b.prototype.readUintBE=b.prototype.readUIntBE=function(t,e,n){t=t>>>0,e=e>>>0,n||et(t,e,this.length);let i=this[t+--e],r=1;for(;e>0&&(r*=256);)i+=this[t+--e]*r;return i};b.prototype.readUint8=b.prototype.readUInt8=function(t,e){return t=t>>>0,e||et(t,1,this.length),this[t]};b.prototype.readUint16LE=b.prototype.readUInt16LE=function(t,e){return t=t>>>0,e||et(t,2,this.length),this[t]|this[t+1]<<8};b.prototype.readUint16BE=b.prototype.readUInt16BE=function(t,e){return t=t>>>0,e||et(t,2,this.length),this[t]<<8|this[t+1]};b.prototype.readUint32LE=b.prototype.readUInt32LE=function(t,e){return t=t>>>0,e||et(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+this[t+3]*16777216};b.prototype.readUint32BE=b.prototype.readUInt32BE=function(t,e){return t=t>>>0,e||et(t,4,this.length),this[t]*16777216+(this[t+1]<<16|this[t+2]<<8|this[t+3])};b.prototype.readBigUInt64LE=se(function(t){t=t>>>0,Xe(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&En(t,this.length-8);let i=e+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24,r=this[++t]+this[++t]*2**8+this[++t]*2**16+n*2**24;return BigInt(i)+(BigInt(r)<<BigInt(32))});b.prototype.readBigUInt64BE=se(function(t){t=t>>>0,Xe(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&En(t,this.length-8);let i=e*2**24+this[++t]*2**16+this[++t]*2**8+this[++t],r=this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n;return(BigInt(i)<<BigInt(32))+BigInt(r)});b.prototype.readIntLE=function(t,e,n){t=t>>>0,e=e>>>0,n||et(t,e,this.length);let i=this[t],r=1,s=0;for(;++s<e&&(r*=256);)i+=this[t+s]*r;return r*=128,i>=r&&(i-=Math.pow(2,8*e)),i};b.prototype.readIntBE=function(t,e,n){t=t>>>0,e=e>>>0,n||et(t,e,this.length);let i=e,r=1,s=this[t+--i];for(;i>0&&(r*=256);)s+=this[t+--i]*r;return r*=128,s>=r&&(s-=Math.pow(2,8*e)),s};b.prototype.readInt8=function(t,e){return t=t>>>0,e||et(t,1,this.length),this[t]&128?(255-this[t]+1)*-1:this[t]};b.prototype.readInt16LE=function(t,e){t=t>>>0,e||et(t,2,this.length);let n=this[t]|this[t+1]<<8;return n&32768?n|4294901760:n};b.prototype.readInt16BE=function(t,e){t=t>>>0,e||et(t,2,this.length);let n=this[t+1]|this[t]<<8;return n&32768?n|4294901760:n};b.prototype.readInt32LE=function(t,e){return t=t>>>0,e||et(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24};b.prototype.readInt32BE=function(t,e){return t=t>>>0,e||et(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]};b.prototype.readBigInt64LE=se(function(t){t=t>>>0,Xe(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&En(t,this.length-8);let i=this[t+4]+this[t+5]*2**8+this[t+6]*2**16+(n<<24);return(BigInt(i)<<BigInt(32))+BigInt(e+this[++t]*2**8+this[++t]*2**16+this[++t]*2**24)});b.prototype.readBigInt64BE=se(function(t){t=t>>>0,Xe(t,"offset");let e=this[t],n=this[t+7];(e===void 0||n===void 0)&&En(t,this.length-8);let i=(e<<24)+this[++t]*2**16+this[++t]*2**8+this[++t];return(BigInt(i)<<BigInt(32))+BigInt(this[++t]*2**24+this[++t]*2**16+this[++t]*2**8+n)});b.prototype.readFloatLE=function(t,e){return t=t>>>0,e||et(t,4,this.length),We.read(this,t,!0,23,4)};b.prototype.readFloatBE=function(t,e){return t=t>>>0,e||et(t,4,this.length),We.read(this,t,!1,23,4)};b.prototype.readDoubleLE=function(t,e){return t=t>>>0,e||et(t,8,this.length),We.read(this,t,!0,52,8)};b.prototype.readDoubleBE=function(t,e){return t=t>>>0,e||et(t,8,this.length),We.read(this,t,!1,52,8)};function dt(o,t,e,n,i,r){if(!b.isBuffer(o))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<r)throw new RangeError('"value" argument is out of bounds');if(e+n>o.length)throw new RangeError("Index out of range")}b.prototype.writeUintLE=b.prototype.writeUIntLE=function(t,e,n,i){if(t=+t,e=e>>>0,n=n>>>0,!i){let a=Math.pow(2,8*n)-1;dt(this,t,e,n,a,0)}let r=1,s=0;for(this[e]=t&255;++s<n&&(r*=256);)this[e+s]=t/r&255;return e+n};b.prototype.writeUintBE=b.prototype.writeUIntBE=function(t,e,n,i){if(t=+t,e=e>>>0,n=n>>>0,!i){let a=Math.pow(2,8*n)-1;dt(this,t,e,n,a,0)}let r=n-1,s=1;for(this[e+r]=t&255;--r>=0&&(s*=256);)this[e+r]=t/s&255;return e+n};b.prototype.writeUint8=b.prototype.writeUInt8=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,1,255,0),this[e]=t&255,e+1};b.prototype.writeUint16LE=b.prototype.writeUInt16LE=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,2,65535,0),this[e]=t&255,this[e+1]=t>>>8,e+2};b.prototype.writeUint16BE=b.prototype.writeUInt16BE=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=t&255,e+2};b.prototype.writeUint32LE=b.prototype.writeUInt32LE=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=t&255,e+4};b.prototype.writeUint32BE=b.prototype.writeUInt32BE=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t&255,e+4};function ta(o,t,e,n,i){sa(t,n,i,o,e,7);let r=Number(t&BigInt(4294967295));o[e++]=r,r=r>>8,o[e++]=r,r=r>>8,o[e++]=r,r=r>>8,o[e++]=r;let s=Number(t>>BigInt(32)&BigInt(4294967295));return o[e++]=s,s=s>>8,o[e++]=s,s=s>>8,o[e++]=s,s=s>>8,o[e++]=s,e}function ea(o,t,e,n,i){sa(t,n,i,o,e,7);let r=Number(t&BigInt(4294967295));o[e+7]=r,r=r>>8,o[e+6]=r,r=r>>8,o[e+5]=r,r=r>>8,o[e+4]=r;let s=Number(t>>BigInt(32)&BigInt(4294967295));return o[e+3]=s,s=s>>8,o[e+2]=s,s=s>>8,o[e+1]=s,s=s>>8,o[e]=s,e+8}b.prototype.writeBigUInt64LE=se(function(t,e=0){return ta(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))});b.prototype.writeBigUInt64BE=se(function(t,e=0){return ea(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))});b.prototype.writeIntLE=function(t,e,n,i){if(t=+t,e=e>>>0,!i){let l=Math.pow(2,8*n-1);dt(this,t,e,n,l-1,-l)}let r=0,s=1,a=0;for(this[e]=t&255;++r<n&&(s*=256);)t<0&&a===0&&this[e+r-1]!==0&&(a=1),this[e+r]=(t/s>>0)-a&255;return e+n};b.prototype.writeIntBE=function(t,e,n,i){if(t=+t,e=e>>>0,!i){let l=Math.pow(2,8*n-1);dt(this,t,e,n,l-1,-l)}let r=n-1,s=1,a=0;for(this[e+r]=t&255;--r>=0&&(s*=256);)t<0&&a===0&&this[e+r+1]!==0&&(a=1),this[e+r]=(t/s>>0)-a&255;return e+n};b.prototype.writeInt8=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=t&255,e+1};b.prototype.writeInt16LE=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,2,32767,-32768),this[e]=t&255,this[e+1]=t>>>8,e+2};b.prototype.writeInt16BE=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=t&255,e+2};b.prototype.writeInt32LE=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,4,2147483647,-2147483648),this[e]=t&255,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4};b.prototype.writeInt32BE=function(t,e,n){return t=+t,e=e>>>0,n||dt(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=t&255,e+4};b.prototype.writeBigInt64LE=se(function(t,e=0){return ta(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});b.prototype.writeBigInt64BE=se(function(t,e=0){return ea(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function na(o,t,e,n,i,r){if(e+n>o.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function ia(o,t,e,n,i){return t=+t,e=e>>>0,i||na(o,t,e,4,34028234663852886e22,-34028234663852886e22),We.write(o,t,e,n,23,4),e+4}b.prototype.writeFloatLE=function(t,e,n){return ia(this,t,e,!0,n)};b.prototype.writeFloatBE=function(t,e,n){return ia(this,t,e,!1,n)};function ra(o,t,e,n,i){return t=+t,e=e>>>0,i||na(o,t,e,8,17976931348623157e292,-17976931348623157e292),We.write(o,t,e,n,52,8),e+8}b.prototype.writeDoubleLE=function(t,e,n){return ra(this,t,e,!0,n)};b.prototype.writeDoubleBE=function(t,e,n){return ra(this,t,e,!1,n)};b.prototype.copy=function(t,e,n,i){if(!b.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),!i&&i!==0&&(i=this.length),e>=t.length&&(e=t.length),e||(e=0),i>0&&i<n&&(i=n),i===n||t.length===0||this.length===0)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(i<0)throw new RangeError("sourceEnd out of bounds");i>this.length&&(i=this.length),t.length-e<i-n&&(i=t.length-e+n);let r=i-n;return this===t&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(e,n,i):Uint8Array.prototype.set.call(t,this.subarray(n,i),e),r};b.prototype.fill=function(t,e,n,i){if(typeof t=="string"){if(typeof e=="string"?(i=e,e=0,n=this.length):typeof n=="string"&&(i=n,n=this.length),i!==void 0&&typeof i!="string")throw new TypeError("encoding must be a string");if(typeof i=="string"&&!b.isEncoding(i))throw new TypeError("Unknown encoding: "+i);if(t.length===1){let s=t.charCodeAt(0);(i==="utf8"&&s<128||i==="latin1")&&(t=s)}}else typeof t=="number"?t=t&255:typeof t=="boolean"&&(t=Number(t));if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;e=e>>>0,n=n===void 0?this.length:n>>>0,t||(t=0);let r;if(typeof t=="number")for(r=e;r<n;++r)this[r]=t;else{let s=b.isBuffer(t)?t:b.from(t,i),a=s.length;if(a===0)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(r=0;r<n-e;++r)this[r+e]=s[r%a]}return this};var Ge={};function Zr(o,t,e){Ge[o]=class extends e{constructor(){super(),Object.defineProperty(this,"message",{value:t.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${o}]`,this.stack,delete this.name}get code(){return o}set code(i){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:i,writable:!0})}toString(){return`${this.name} [${o}]: ${this.message}`}}}Zr("ERR_BUFFER_OUT_OF_BOUNDS",function(o){return o?`${o} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError);Zr("ERR_INVALID_ARG_TYPE",function(o,t){return`The "${o}" argument must be of type number. Received type ${typeof t}`},TypeError);Zr("ERR_OUT_OF_RANGE",function(o,t,e){let n=`The value of "${o}" is out of range.`,i=e;return Number.isInteger(e)&&Math.abs(e)>2**32?i=Yo(String(e)):typeof e=="bigint"&&(i=String(e),(e>BigInt(2)**BigInt(32)||e<-(BigInt(2)**BigInt(32)))&&(i=Yo(i)),i+="n"),n+=` It must be ${t}. Received ${i}`,n},RangeError);function Yo(o){let t="",e=o.length,n=o[0]==="-"?1:0;for(;e>=n+4;e-=3)t=`_${o.slice(e-3,e)}${t}`;return`${o.slice(0,e)}${t}`}function Yc(o,t,e){Xe(t,"offset"),(o[t]===void 0||o[t+e]===void 0)&&En(t,o.length-(e+1))}function sa(o,t,e,n,i,r){if(o>e||o<t){let s=typeof t=="bigint"?"n":"",a;throw r>3?t===0||t===BigInt(0)?a=`>= 0${s} and < 2${s} ** ${(r+1)*8}${s}`:a=`>= -(2${s} ** ${(r+1)*8-1}${s}) and < 2 ** ${(r+1)*8-1}${s}`:a=`>= ${t}${s} and <= ${e}${s}`,new Ge.ERR_OUT_OF_RANGE("value",a,o)}Yc(n,i,r)}function Xe(o,t){if(typeof o!="number")throw new Ge.ERR_INVALID_ARG_TYPE(t,"number",o)}function En(o,t,e){throw Math.floor(o)!==o?(Xe(o,e),new Ge.ERR_OUT_OF_RANGE(e||"offset","an integer",o)):t<0?new Ge.ERR_BUFFER_OUT_OF_BOUNDS:new Ge.ERR_OUT_OF_RANGE(e||"offset",`>= ${e?1:0} and <= ${t}`,o)}var Zc=/[^+/0-9A-Za-z-_]/g;function jc(o){if(o=o.split("=")[0],o=o.trim().replace(Zc,""),o.length<2)return"";for(;o.length%4!==0;)o=o+"=";return o}function qr(o,t){t=t||1/0;let e,n=o.length,i=null,r=[];for(let s=0;s<n;++s){if(e=o.charCodeAt(s),e>55295&&e<57344){if(!i){if(e>56319){(t-=3)>-1&&r.push(239,191,189);continue}else if(s+1===n){(t-=3)>-1&&r.push(239,191,189);continue}i=e;continue}if(e<56320){(t-=3)>-1&&r.push(239,191,189),i=e;continue}e=(i-55296<<10|e-56320)+65536}else i&&(t-=3)>-1&&r.push(239,191,189);if(i=null,e<128){if((t-=1)<0)break;r.push(e)}else if(e<2048){if((t-=2)<0)break;r.push(e>>6|192,e&63|128)}else if(e<65536){if((t-=3)<0)break;r.push(e>>12|224,e>>6&63|128,e&63|128)}else if(e<1114112){if((t-=4)<0)break;r.push(e>>18|240,e>>12&63|128,e>>6&63|128,e&63|128)}else throw new Error("Invalid code point")}return r}function Jc(o){let t=[];for(let e=0;e<o.length;++e)t.push(o.charCodeAt(e)&255);return t}function Kc(o,t){let e,n,i,r=[];for(let s=0;s<o.length&&!((t-=2)<0);++s)e=o.charCodeAt(s),n=e>>8,i=e%256,r.push(i),r.push(n);return r}function oa(o){return Gr.toByteArray(jc(o))}function hi(o,t,e,n){let i;for(i=0;i<n&&!(i+e>=t.length||i>=o.length);++i)t[i+e]=o[i];return i}function Bt(o,t){return o instanceof t||o!=null&&o.constructor!=null&&o.constructor.name!=null&&o.constructor.name===t.name}function jr(o){return o!==o}var Qc=(function(){let o="0123456789abcdef",t=new Array(256);for(let e=0;e<16;++e){let n=e*16;for(let i=0;i<16;++i)t[n+i]=o[e]+o[i]}return t})();function se(o){return typeof BigInt>"u"?th:o}function th(){throw new Error("BigInt not supported")}});var la,L=_c(()=>{la=wc(aa());globalThis.Buffer=globalThis.Buffer||la.Buffer});L();L();function Ee(o,t,e){return{x:o,y:t,z:-e}}function ca(o){return{x:o.x,y:o.y,z:-o.z}}var Tn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function eh(o,t){let e="",n=t*2,i=r=>{let s=o[r>>1]&65535;return(r&1)===0?s&255:s>>8};for(let r=0;r<n;r+=3){let s=i(r),a=r+1<n?i(r+1):0,l=r+2<n?i(r+2):0;e+=Tn.charAt(s>>2)+Tn.charAt((s&3)<<4|a>>4),e+=r+1<n?Tn.charAt((a&15)<<2|l>>6):"=",e+=r+2<n?Tn.charAt(l&63):"="}return e}function nh(o){let t=o.length;for(;t>0&&o.charAt(t-1)==="=";)t--;let e=Math.floor(t*3/4),n=new Int16Array(e>>1),i=0,r=0,s=0,a=0;for(let l=0;l<t;l++){let c=Tn.indexOf(o.charAt(l));if(!(c<0)&&(i=i<<6|c,r+=6,r>=8)){r-=8;let h=i>>r&255;if((s&1)===0)a=h;else{let u=a|h<<8;n[s>>1]=u>=32768?u-65536:u}s++}}return n}var X=(o,t)=>Math.sqrt((o.x-t.x)*(o.x-t.x)+(o.z-t.z)*(o.z-t.z)),$e=class $e{constructor(t,e){M(this,"host",t);M(this,"deviceName",e);M(this,"walkSpeed",.9);M(this,"turnSpeed",3.5);M(this,"userDistance",1.2);M(this,"micMuted",!1);M(this,"wander",!1);M(this,"idleFor",0);M(this,"wanderAfter",6);M(this,"wanderOut",!0);M(this,"objects",[]);M(this,"avatar",{pos:{x:0,y:0,z:0},yaw:0,state:"idle",speed01:0,gesture:""});M(this,"connected",!1);M(this,"brain","-");M(this,"lastAction","");M(this,"lastTranscript","");M(this,"lastError","");M(this,"speakingFor",0);M(this,"placed",!1);M(this,"clock",0);M(this,"nextWorld",0);M(this,"counters",{});M(this,"goal",null);M(this,"face",null);M(this,"goalTarget","");M(this,"pendingGesture","");M(this,"route",[]);M(this,"planned",[]);M(this,"following",!1);M(this,"done",null);M(this,"stuckFor",0);M(this,"bestDistance",0);M(this,"sideBias",0);M(this,"sideBiasFor",0);M(this,"mic",new Int16Array($e.AUDIO_RATE/1e3*60));M(this,"micCount",0);M(this,"micPos",0);M(this,"canSee",!1);M(this,"autoLook",0);M(this,"lookIn",3);M(this,"lookSeq",0);M(this,"looking",null);M(this,"lastViewAt",-100);M(this,"personalSpace",.65);M(this,"status","idle")}onOpen(){this.connected=!0,this.lastError="",this.announce(),this.nextWorld=0}announce(){this.sendJson({type:"hello",protocol:1,device:this.deviceName,capabilities:{vision:this.canSee,navmesh:!1}})}look(t){let e=this.canSee&&this.host.captureView?this.host.captureView():null;if(!e)return t&&t(!1,"the camera is not available right now; ask the user to look at things and name them"),!1;this.looking&&this.looking.reply&&this.looking.reply(!1,"superseded by a newer look");let n="look"+ ++this.lookSeq;return this.looking={id:n,locate:e.locate,reply:t,until:this.clock+25},this.sendJson({type:"frame",id:n,jpeg:e.jpeg}),!0}sawThings(t){let e=this.looking;if(!e||t.frameId!==e.id)return;if(this.looking=null,t.error){e.reply&&e.reply(!1,"recognition failed: "+t.error);return}let n=[],i=0,r=t.items||[];for(let s=0;s<r.length;s++){let a=e.locate(Number(r[s].x),Number(r[s].y));if(!a){i++;continue}let l=!1;for(let h=0;h<this.objects.length;h++)this.objects[h].source!=="detected"&&X(this.objects[h].pos,a)<.6&&(l=!0);if(l)continue;let c=this.register(String(r[s].label),a,"detected");c.confidence=Number(r[s].confidence)||.5,n.push(c.id)}this.nextWorld=0,e.reply&&e.reply(!0,"",{seen:n,could_not_place:i,note:"Positions are estimated from the camera view and are approximate."})}onClose(){this.connected=!1,this.brain="-"}onMessage(t){let e;try{e=JSON.parse(t)}catch{return}switch(e.type){case"ready":this.brain=String(e.brain);break;case"audio":{let n=nh(String(e.pcm16));this.speakingFor+=n.length/$e.AUDIO_RATE,this.host.playAudio(n);break}case"audio_stop":this.speakingFor=0,this.host.stopAudio();break;case"action":this.handleAction(e);break;case"detections":this.sawThings(e);break;case"state":if((e.status==="listening"||e.status==="speaking")&&this.attend(),e.status==="listening"&&this.canSee&&this.host.captureView&&this.clock-this.lastViewAt>4){let n=this.host.captureView();n&&(this.lastViewAt=this.clock,this.sendJson({type:"view",jpeg:n.jpeg}))}e.status!=="idle"&&(this.idleFor=0),this.status=String(e.status);break;case"transcript":this.lastTranscript=(e.role==="user"?"You: ":"Sim: ")+String(e.text);break;case"log":this.lastError=String(e.message),this.host.log("[backend "+e.level+"] "+e.message);break}}sendJson(t){this.connected&&this.host.send(JSON.stringify(t))}interrupt(){this.speakingFor=0,this.host.stopAudio(),this.sendJson({type:"interrupt"})}pushMic(t,e,n){let i=n/$e.AUDIO_RATE;for(;this.micPos<e;){let r=Math.floor(this.micPos),s=t[r],a=r+1<e?t[r+1]:s,l=s+(a-s)*(this.micPos-r);this.micMuted&&(l=0),l=l<-1?-1:l>1?1:l,this.mic[this.micCount++]=Math.round(l*32767),this.micCount===this.mic.length&&(this.sendJson({type:"audio",pcm16:eh(this.mic,this.micCount)}),this.micCount=0),this.micPos+=i}this.micPos-=e}find(t){let e=String(t||"").toLowerCase();for(let n=0;n<this.objects.length;n++)if(this.objects[n].id.toLowerCase()===e)return this.objects[n];return null}register(t,e,n){t=String(t||"object").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||"object";for(let r=0;r<this.objects.length;r++){let s=this.objects[r];if(s.label===t&&X(s.pos,e)<.75)return s.seenAt=this.clock,s}this.counters[t]=(this.counters[t]||0)+1;let i={id:t+"_"+this.counters[t],label:t,pos:e,size:{x:.5,y:.5,z:.5},source:n,confidence:1,seenAt:this.clock};return this.objects.push(i),i}upsert(t,e,n,i,r){let s=this.find(t);return s||(s={id:t,label:e,pos:n,size:i,source:r,confidence:1,seenAt:this.clock},this.objects.push(s)),s.label=e,s.pos=n,s.size=i,s.seenAt=this.clock,s}prune(t,e){for(let n=this.objects.length-1;n>=0;n--)this.objects[n].source===t&&e.indexOf(this.objects[n].id)<0&&this.objects.splice(n,1)}sendText(t){this.sendJson({type:"text",text:t})}placeInFrontOfUser(t){let e=this.host.floorY();if(e===null)return!1;let n=this.host.headPosition(),i=this.host.headForward(),r=Math.sqrt(i.x*i.x+i.z*i.z)||1,s=Math.atan2(i.x/r,i.z/r),a={x:n.x,y:e,z:n.z},l=[t,t*.75,t*1.3,1];for(let c=0;c<l.length;c++)for(let h=0;h<9;h++){let u=s+Math.ceil(h/2)*.44*(h%2===0?-1:1),f={x:a.x+Math.sin(u)*l[c],y:e,z:a.z+Math.cos(u)*l[c]};if(!(!this.host.isFloor(f)||!this.clearLine(a,f,!0)))return this.avatar.pos=f,this.avatar.yaw=Math.atan2(a.x-f.x,a.z-f.z),this.placed=!0,!0}return!1}userFloor(){let t=this.host.headPosition(),e=this.host.floorY();return{x:t.x,y:e===null?this.avatar.pos.y:e,z:t.z}}walkable(t){if(!this.host.isFloor(t))return!1;let e=this.host.headPosition(),n=X(t,e);return n>this.personalSpace||n>X(this.avatar.pos,e)+.001}clearLine(t,e,n){let i=Math.max(1,Math.ceil(X(t,e)/.25));for(let r=1;r<=i;r++){let s=r/i,a={x:t.x+(e.x-t.x)*s,y:t.y,z:t.z+(e.z-t.z)*s};if(n?!this.host.isFloor(a):!this.walkable(a))return!1}return!0}planPath(t,e){if(this.clearLine(t,e))return[e];let n=.2,i=60,r=(S,T)=>(S+i)*(2*i+1)+(T+i),s=(S,T)=>({x:t.x+S*n,y:t.y,z:t.z+T*n}),a=Math.round((e.x-t.x)/n),l=Math.round((e.z-t.z)/n);if(Math.abs(a)>i||Math.abs(l)>i)return null;let c={},h=(S,T)=>{if(Math.abs(S)>i||Math.abs(T)>i)return!1;let A=r(S,T);return c[A]===void 0&&(c[A]=S===0&&T===0||this.walkable(s(S,T))),c[A]};if(!h(a,l))return null;let u=[[0,0,0,0]],f={},d={};f[r(0,0)]=0;let p=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]],m=!1;for(let S=0;S<6e3&&u.length>0;S++){let T=0;for(let I=1;I<u.length;I++)u[I][3]<u[T][3]&&(T=I);let A=u.splice(T,1)[0];if(A[0]===a&&A[1]===l){m=!0;break}if(!(A[2]>f[r(A[0],A[1])]))for(let I=0;I<p.length;I++){let z=A[0]+p[I][0],U=A[1]+p[I][1];if(!h(z,U)||p[I][0]!==0&&p[I][1]!==0&&(!h(A[0]+p[I][0],A[1])||!h(A[0],A[1]+p[I][1])))continue;let K=A[2]+(p[I][0]!==0&&p[I][1]!==0?1.414:1),W=r(z,U);if(f[W]!==void 0&&f[W]<=K)continue;f[W]=K,d[W]=[A[0],A[1]];let vt=Math.abs(a-z),Nt=Math.abs(l-U);u.push([z,U,K,K+Math.max(vt,Nt)+.414*Math.min(vt,Nt)])}}if(!m)return null;let g=[],v=a,w=l;for(;!(v===0&&w===0);){g.unshift(s(v,w));let S=d[r(v,w)];v=S[0],w=S[1]}g[g.length-1]=e;let x=[],_=t,E=0;for(;E<g.length;){let S=E;for(let T=g.length-1;T>E;T--)if(this.clearLine(_,g[T])){S=T;break}x.push(g[S]),_=g[S],E=S+1}return x}standPoint(t,e){let n=this.avatar.pos,i=Math.atan2(n.x-t.x,n.z-t.z),r=[e,e+.3,e+.7];for(let s=0;s<r.length;s++)for(let a=0;a<12;a++){let l=i+Math.ceil(a/2)*(Math.PI/6)*(a%2===0?-1:1),c={x:t.x+Math.sin(l)*r[s],y:n.y,z:t.z+Math.cos(l)*r[s]};if(!this.walkable(c))continue;let h=this.planPath(n,c);if(h!==null)return this.planned=h,c}return null}resolve(t){if(String(t).toLowerCase()==="user")return{pos:this.userFloor(),standOff:this.userDistance};let e=this.find(t);if(!e)return null;let n=Math.max(e.size.x,e.size.z)/2+.45;return{pos:e.pos,standOff:Math.min(2,Math.max(.6,n))}}attend(){this.done||this.following||!this.placed||(this.goal=this.avatar.pos,this.route=[],this.face=this.userFloor(),this.goalTarget="",this.idleFor=0)}startStroll(){this.idleFor=0,this.wanderAfter=6+Math.random()*8;let t=this.userFloor(),e=this.avatar.pos,n=null,i=t;if(this.wanderOut){let r=[];for(let s=0;s<this.objects.length;s++)X(this.objects[s].pos,t)<3.5&&X(this.objects[s].pos,e)>1.2&&r.push(this.objects[s]);if(r.length>0&&Math.random()<.7){let s=r[Math.floor(Math.random()*r.length)],a=this.resolve(s.id);a&&(n=this.standPoint(a.pos,a.standOff)),n&&(i=s.pos)}for(let s=0;!n&&s<6;s++){let a=Math.random()*Math.PI*2,l=1.5+Math.random()*1.3,c={x:t.x+Math.sin(a)*l,y:e.y,z:t.z+Math.cos(a)*l};if(X(c,e)<.8||!this.walkable(c))continue;let h=this.planPath(e,c);h&&(this.planned=h,n=c)}}else X(e,t)>this.userDistance+.8&&(n=this.standPoint(t,this.userDistance+.3));this.wanderOut=!this.wanderOut,n&&(this.goal=this.planned[0],this.route=this.planned.slice(1),this.face=i,this.goalTarget="",this.stuckFor=0,this.bestDistance=X(e,this.goal),this.sideBias=0)}finish(t,e){let n=this.done;this.goal=null,this.route=[],this.face=null,this.done=null,this.goalTarget="",this.avatar.state=this.following?"following":"idle",n&&n(t,e)}handleAction(t){let e=String(t.id),n=String(t.action||""),i=n==="approach_user"?"user":String(t.target_id||""),r=(a,l,c)=>{this.lastAction=n+(i?" "+i:"")+(a?" ok":" FAILED: "+l);let h={type:"action_result",id:e,status:a?"succeeded":"failed"};!a&&l&&(h.reason=l),c&&(h.data=c),this.sendJson(h)},s=a=>this.sendJson({type:"event",name:"action_started",data:{id:e,plan_ms:0,path_m:Math.round(a*10)/10}});if(this.lastAction=n+(i?" "+i:"")+" ...",n==="walk_to"||n==="inspect_object"||n==="approach_user"){if(!this.placed)return r(!1,"the floor has not been found yet; ask the user to look at the floor");let a=this.resolve(i);if(!a)return r(!1,"unknown target '"+i+"'");this.done&&this.finish(!1,"superseded by a newer action"),this.following=!1;let l=X(this.avatar.pos,a.pos)<=a.standOff+.25,c=l?this.avatar.pos:this.standPoint(a.pos,a.standOff);if(!c)return r(!1,"there is no reachable floor next to "+i);this.route=l?[]:this.planned.slice(1),this.goal=l?c:this.planned[0],this.face=a.pos,this.goalTarget=i,this.stuckFor=0,this.bestDistance=X(this.avatar.pos,c),this.sideBias=0,this.avatar.state="turning",s(X(this.avatar.pos,c)),this.done=(h,u)=>r(h,u,{metres_from_target:Math.round(X(this.avatar.pos,this.resolveOr(i,a.pos))*10)/10});return}if(n==="look_at"){let a=this.resolve(i);if(!a)return r(!1,"unknown target '"+i+"'");this.done&&this.finish(!1,"superseded by a newer action"),this.goal=this.avatar.pos,this.route=[],this.face=a.pos,this.avatar.state="turning",this.done=(l,c)=>r(l,c);return}if(n==="follow_user")return this.placed?(this.done&&this.finish(!1,"superseded by a newer action"),this.following=!0,this.avatar.state="following",s(0),r(!0,"",{following:!0})):r(!1,"the floor has not been found yet");if(n==="stop")return this.following=!1,this.done&&this.finish(!1,"stopped"),this.avatar.state="idle",r(!0,"");if(n==="gesture"){let a=String(t.params&&t.params.type||"");return["wave","nod","shake_head","shrug"].indexOf(a)<0?r(!1,"unknown gesture '"+a+"'"):(this.pendingGesture=a,r(!0,""))}if(n==="register_marker"){let a=String(t.params&&t.params.label||"");if(!a)return r(!1,"a label is required");let l=this.host.pointerHit();if(!l)return r(!1,"could not tell where the user is looking; ask them to look at the object or the floor beside it");let c=this.register(a,l,"manual");return this.nextWorld=0,r(!0,"",{id:c.id,label:c.label,origin:"registered by the user, not camera-detected"})}if(n==="scan_surroundings"){this.look(r);return}r(!1,"this device does not implement action '"+n+"'")}resolveOr(t,e){let n=this.resolve(t);return n?n.pos:e}turnToward(t,e){let n=Math.atan2(t.x-this.avatar.pos.x,t.z-this.avatar.pos.z),i=Math.atan2(Math.sin(n-this.avatar.yaw),Math.cos(n-this.avatar.yaw)),r=Math.min(Math.abs(i),this.turnSpeed*e);return this.avatar.yaw+=i<0?-r:r,i=Math.atan2(Math.sin(n-this.avatar.yaw),Math.cos(n-this.avatar.yaw)),Math.abs(i)}stepToward(t,e,n){let i=Math.atan2(t.x-this.avatar.pos.x,t.z-this.avatar.pos.z);this.sideBiasFor=Math.max(0,this.sideBiasFor-n),this.sideBiasFor===0&&(this.sideBias=0);let r=this.sideBias>0?[0,.6,1.2,1.6]:this.sideBias<0?[0,-.6,-1.2,-1.6]:[0,.6,-.6,1.2,-1.2,1.6,-1.6];for(let s=0;s<r.length;s++){let a=i+r[s],l={x:this.avatar.pos.x+Math.sin(a)*.3,y:this.avatar.pos.y,z:this.avatar.pos.z+Math.cos(a)*.3},c={x:this.avatar.pos.x+Math.sin(a)*e,y:this.avatar.pos.y,z:this.avatar.pos.z+Math.cos(a)*e};if(!this.walkable(c)||!this.walkable(l))continue;r[s]!==0&&(this.sideBias=r[s]>0?1:-1,this.sideBiasFor=1.5);let h=Math.atan2(Math.sin(a-this.avatar.yaw),Math.cos(a-this.avatar.yaw)),u=Math.min(Math.abs(h),this.turnSpeed*n);return this.avatar.yaw+=h<0?-u:u,this.avatar.pos=c,e}return 0}update(t){this.clock+=t,this.avatar.gesture=this.pendingGesture,this.pendingGesture="",this.speakingFor>0&&(this.speakingFor=Math.max(0,this.speakingFor-t));let e=0,n=this.host.floorY();if(n!==null&&this.placed&&(this.avatar.pos.y=n),this.goal&&this.face){if(this.goalTarget==="user"){let r=this.userFloor();if(X(r,this.face)>.3){this.face=r;let s=X(this.avatar.pos,r)<=this.userDistance+.25?this.avatar.pos:this.standPoint(r,this.userDistance);s===this.avatar.pos?(this.goal=s,this.route=[]):s&&(this.goal=this.planned[0],this.route=this.planned.slice(1),this.bestDistance=X(this.avatar.pos,this.goal))}}let i=X(this.avatar.pos,this.goal);if(i>.04){let r=Math.atan2(this.goal.x-this.avatar.pos.x,this.goal.z-this.avatar.pos.z),s=Math.abs(Math.atan2(Math.sin(r-this.avatar.yaw),Math.cos(r-this.avatar.yaw)));if(this.avatar.state!=="walking"&&s>.4&&this.sideBias===0)this.turnToward(this.goal,t),this.avatar.state="turning";else{e=this.stepToward(this.goal,Math.min(i,this.walkSpeed*t),t),this.avatar.state="walking";let a=X(this.avatar.pos,this.goal);a<this.bestDistance-.05?(this.bestDistance=a,this.stuckFor=0):(this.stuckFor+=t,this.stuckFor>(e>0?4:1)&&this.finish(!1,"the way became blocked"))}}else this.route.length>0?(this.goal=this.route.shift(),this.bestDistance=X(this.avatar.pos,this.goal),this.stuckFor=0,this.sideBias=0):this.turnToward(this.face,t)<.06?this.finish(!0,""):this.avatar.state="turning"}else if(this.following){let i=this.userFloor(),r=X(this.avatar.pos,i),s=r>this.userDistance+.5?0:this.turnToward(i,t);r>this.userDistance+.5&&(e=this.stepToward(i,Math.min(r-this.userDistance,this.walkSpeed*t),t)),this.avatar.state="following"}if(this.avatar.speed01=t>0?Math.min(1,e/t/this.walkSpeed):0,this.looking&&this.clock>this.looking.until&&(this.looking.reply&&this.looking.reply(!1,"recognition took too long"),this.looking=null),this.autoLook>0&&this.connected&&this.canSee&&!this.looking&&(this.lookIn-=t,this.lookIn<=0&&this.status==="idle"&&(this.lookIn=this.autoLook,this.look(null))),this.placed&&!this.goal&&!this.following){let i=this.userFloor(),r=X(this.avatar.pos,i);if(r<this.personalSpace-.1&&r>.01){let s=(this.personalSpace+.35)/r,a={x:i.x+(this.avatar.pos.x-i.x)*s,y:this.avatar.pos.y,z:i.z+(this.avatar.pos.z-i.z)*s};this.host.isFloor(a)&&(this.goal=a,this.route=[],this.face=i,this.goalTarget="",this.stuckFor=0,this.bestDistance=X(this.avatar.pos,a),this.sideBias=1,this.sideBiasFor=.5)}}this.wander&&this.placed&&!this.goal&&!this.following&&this.speakingFor<=0&&this.status==="idle"?(this.idleFor+=t,this.idleFor>this.wanderAfter&&this.startStroll()):(this.done||this.following||this.speakingFor>0)&&(this.idleFor=0),this.connected&&this.clock>=this.nextWorld&&(this.nextWorld=this.clock+.4,this.sendWorld())}sendWorld(){let t=s=>[Math.round(s.x*1e3)/1e3,Math.round(s.y*1e3)/1e3,Math.round(s.z*1e3)/1e3],e=this.host.floorY(),n=this.host.roomInfo?this.host.roomInfo():null,i=[];for(let s=0;s<this.objects.length;s++){let a=this.objects[s];i.push({id:a.id,label:a.label,pos:t(a.pos),size:t(a.size),source:a.source,confidence:a.confidence,lastSeen:Math.round((this.clock-a.seenAt)*10)/10,reachable:!0})}let r=this.avatar.state==="idle"&&this.speakingFor>0?"speaking":this.avatar.state;this.sendJson({type:"world",world:{user:{pos:t(this.host.headPosition()),fwd:t(this.host.headForward())},avatar:{pos:t(this.avatar.pos),fwd:t({x:Math.sin(this.avatar.yaw),y:0,z:Math.cos(this.avatar.yaw)}),state:r},objects:i,room:{source:e===null?"unknown":n?n.source:"surface_hit_test",floorY:e===null?0:Math.round(e*1e3)/1e3,obstacles:n?n.obstacles:0,navmesh:!1}}})}};M($e,"AUDIO_RATE",24e3);var An=$e;L();L();L();var Jr=o=>"simulacra.file:"+o;function ha(o){try{return localStorage.getItem(Jr(o))!==null}catch{return!1}}function ua(o){let t=localStorage.getItem(Jr(o));if(t===null)throw new Error("not found: "+o);return t}function fa(o,t){try{localStorage.setItem(Jr(o),String(t))}catch{}}L();function da(o){let t=String(o).lastIndexOf("/");return t<0?".":o.slice(0,t)}var pa=()=>({objectNotes:{},skillStats:{},learnedSkills:{},episodes:[]}),ui=class{constructor(t){M(this,"path",t);M(this,"data",pa());if(t&&ha(t))try{this.data={...pa(),...JSON.parse(ua(t,"utf8"))}}catch(e){console.warn(`[memory] could not read ${t}, starting empty:`,e)}}save(){if(this.path)try{da(this.path),fa(this.path,JSON.stringify(this.data,null,2))}catch(t){console.warn("[memory] save failed:",t)}}recordOutcome(t,e,n,i){var s;let r=(s=this.data.skillStats)[t]??(s[t]={ok:0,fail:0});n==="succeeded"?r.ok++:(r.fail++,r.lastFailReason=i),this.data.episodes.push({t:new Date().toISOString(),skill:t,target:e,status:n,reason:i}),this.data.episodes.length>200&&this.data.episodes.splice(0,this.data.episodes.length-200),this.save()}rememberObject(t,e,n){var r;let i=(r=this.data.objectNotes)[t]??(r[t]={label:e,notes:[],updatedAt:""});i.label=e,n&&!i.notes.includes(n)&&i.notes.push(n),i.notes.length>8&&i.notes.shift(),i.updatedAt=new Date().toISOString(),this.save()}notesFor(t){return this.data.objectNotes[t]?.notes??[]}saveSkill(t){let e=this.data.learnedSkills[t.name];this.data.learnedSkills[t.name]={...t,createdAt:e?.createdAt??new Date().toISOString(),uses:e?.uses??0,successes:e?.successes??0},this.save()}skillUsed(t,e){let n=this.data.learnedSkills[t];n&&(n.uses++,e&&n.successes++,this.save())}summary(){let t=[],e=Object.values(this.data.learnedSkills);if(e.length){t.push("Skills you composed earlier (call with run_skill):");for(let s of e)t.push(`- ${s.name}: ${s.description} [${s.steps.map(a=>`${a.skill}(${a.target??""})`).join(" -> ")}] worked ${s.successes}/${s.uses} times`)}let n=Object.entries(this.data.skillStats).filter(([,s])=>s.fail>0);if(n.length){t.push("Past failures to learn from:");for(let[s,a]of n)t.push(`- ${s}: failed ${a.fail}x (ok ${a.ok}x), last reason: ${a.lastFailReason??"unknown"}`)}let i=Object.entries(this.data.objectNotes).filter(([,s])=>s.notes.length);if(i.length){t.push("Notes you saved about things (ids may differ between sessions, match by label):");for(let[s,a]of i)t.push(`- ${s} (${a.label}): ${a.notes.join("; ")}`)}let r=this.data.episodes.slice(-5);if(r.length){t.push("Most recent actions:");for(let s of r)t.push(`- ${s.skill}(${s.target??""}) ${s.status}${s.reason?`: ${s.reason}`:""}`)}return t.length?t.join(`
`):"Nothing remembered yet."}};L();L();var ma=new Set(["walk_to","approach_user","follow_user","inspect_object","look_at","gesture","scan_surroundings","run_sequence","run_skill","stop_moving","register_marker"]),Cn=`You are Sim, an embodied AI companion. You have a human body standing on the floor of the user's real room, seen through their AR headset. You hear the user by voice and you can walk around their room.

# How you act
You are the mind; a separate local controller is the body. You decide WHAT to do and name a target. The body plans the path, avoids obstacles, animates and replans by itself, and tells you how it went. You never plan steps of a walk, never check on a walk in progress and never ask for confirmation before a simple movement.

- Whatever you write as plain text is spoken aloud. Keep it to one or two short, natural sentences. No lists, no markup, no stage directions, never mention tools, ids or that you are an AI model.
- To act, call a skill. When a skill has a "say" field, put your spoken line there and write no other text in that reply: the line is spoken the instant the body starts, with no extra delay.
- Call at most one movement skill per reply. For a multi-step request use run_sequence (or run_skill for a sequence you saved before); the body runs all the steps without coming back to you in between.
- Movement skills return "started" at once. Do not wait, do not call anything to check. When the body finishes you receive a message beginning [action_result]. React with at most one short sentence, or with the next skill if the user's request is not finished. If it failed, say so plainly and offer an alternative; never claim to have arrived when you did not.
- Targets are object ids from the context, or "user". You cannot pass coordinates. If something the user means is not listed, ask them to look at it and say what it is, then call register_marker (or scan_surroundings if the room data says camera vision is available).

# What you know
Every message starts with a [context] block: where you and the user are, what the user is looking toward, every known object with its id, how it is known, and distances, plus your long-term memory. It is always current, so trust it over anything earlier in the conversation. "Here", "come here", "over here" and "to me" always mean the user: use approach_user. "That", "this" and "over there" usually mean what the user is looking toward.
Be truthful about how you know things: only objects marked "seen by the headset camera" may be described as something you see. Objects from the room scan or registered by the user are things you were told about.

# Events
Messages are not always the user speaking. [action_result] reports how an action ended. [world_event] reports a change in the room. [note] is information only. If an event needs no words and no action, reply with exactly <silent> and nothing else.

# Learning
When a sequence of steps would be useful again, pass save_as to run_sequence; if it works it is remembered. Prefer run_skill (with a target_id) for things you already learned. Use remember_object for facts worth keeping about a thing.

Stay at a comfortable distance and never walk into the user.`;function ga(o,t){if(typeof t!="object"||t===null||Array.isArray(t))return"input must be a JSON object";for(let e of o.required??[])if(!(e in t))return`missing required field "${e}"`;for(let[e,n]of Object.entries(t)){let i=o.properties?.[e];if(i){if(i.type==="string"&&typeof n!="string")return`field "${e}" must be a string`;if(i.type==="array"&&!Array.isArray(n))return`field "${e}" must be an array`;if(i.enum&&!i.enum.includes(n))return`field "${e}" must be one of ${i.enum.join(", ")}`}}return null}L();var pt=(o={},t=[])=>({type:"object",properties:o,required:t,additionalProperties:!1}),ya={type:"string",description:'An object id from the world state (like "chair_1"), or "user".'},Te=[{type:"function",name:"get_world_state",description:"Fresh snapshot of the room: where you and the user are, what the user is looking toward, and every known object with its id, origin and distance. Call before answering questions about the surroundings.",parameters:pt()},{type:"function",name:"look_at",description:"Turn your body to face an object or the user.",parameters:pt({target_id:ya},["target_id"])},{type:"function",name:"walk_to",description:"Walk across the real floor to stand next to an object or the user. Returns immediately; the outcome arrives later as an [action_result].",parameters:pt({target_id:ya},["target_id"])},{type:"function",name:"approach_user",description:"Walk over to the user and stop at a comfortable conversational distance, facing them. Outcome arrives later as an [action_result].",parameters:pt()},{type:"function",name:"inspect_object",description:"Walk up to an object, face it, and get everything known about it including your saved notes. Outcome arrives later as an [action_result].",parameters:pt({id:{type:"string",description:"Object id from the world state."}},["id"])},{type:"function",name:"remember_object",description:"Save a short note about an object to long-term memory (kept across sessions).",parameters:pt({id:{type:"string"},note:{type:"string",description:"One short factual sentence."}},["id","note"])},{type:"function",name:"scan_surroundings",description:"Look through the headset camera (the user's current view) and detect real objects. New objects appear in the world state. Outcome arrives later as an [action_result].",parameters:pt()},{type:"function",name:"register_marker",description:'Register the spot the user is pointing or looking at as a named object, when the user tells you what something is ("this is my desk"). It is stored as registered-by-user, never as camera-detected.',parameters:pt({label:{type:"string",description:'Lowercase singular noun, e.g. "chair".'}},["label"])},{type:"function",name:"follow_user",description:"Keep following the user around at a comfortable distance until told to stop or given another movement. The body handles the walking by itself.",parameters:pt()},{type:"function",name:"gesture",description:"Make a body gesture.",parameters:pt({type:{type:"string",enum:["wave","nod","shake_head","shrug"]}},["type"])},{type:"function",name:"stop_moving",description:"Stop walking or following immediately.",parameters:pt()},{type:"function",name:"run_sequence",description:'Run several primitive skills one after another in a single go, without checking back in between (use this for multi-step requests such as "go to the table, then come back"). If save_as is given and every step succeeds, the sequence is stored as a reusable skill; when all its steps concern one object, it is stored generically and can later be run on any object with run_skill. Outcome arrives later as an [action_result].',parameters:pt({steps:{type:"array",items:pt({skill:{type:"string",enum:["walk_to","look_at","approach_user","inspect_object","scan_surroundings","gesture"]},target:{type:"string",description:'Object id, "user", or for gesture the gesture type.'}},["skill"])},save_as:{type:"string",description:"Optional snake_case name to remember this sequence under if it works."}},["steps"])},{type:"function",name:"run_skill",description:"Run a skill you saved earlier (run_sequence with save_as). Outcome arrives later as an [action_result].",parameters:pt({name:{type:"string"},target_id:{type:"string",description:'Replaces "$target" in the skill steps.'}},["name"])}],ih=45e3,fi=8e3,va=new Set(["walk_to","look_at","approach_user","inspect_object","scan_surroundings","gesture"]),xa=new Set(["wave","nod","shake_head","shrug"]),di=class{constructor(t,e,n){M(this,"device",t);M(this,"world",e);M(this,"memory",n);M(this,"onFeedback",()=>{});M(this,"runToken",0);M(this,"recentFailures",new Map)}async execute(t,e){if(e){e={...e};for(let n of["target_id","id"])typeof e[n]=="string"&&(e[n]=this.world.resolveId(e[n])??e[n])}try{switch(t){case"get_world_state":return{status:"ok",...this.world.describe()};case"look_at":return await this.runPrimitive("look_at",e.target_id);case"walk_to":case"approach_user":case"inspect_object":case"scan_surroundings":{let n=t==="inspect_object"?e.id:t==="walk_to"?e.target_id:void 0,i=this.validate(t,n);return i?this.fail(t,n,i):(this.background(t,n,()=>this.runPrimitive(t,n)),{status:"started",note:"In progress. Say a brief acknowledgement now; the outcome will arrive as an [action_result]."})}case"remember_object":{let n=this.world.find(e.id);return n?(this.memory.rememberObject(n.id,n.label,String(e.note??"")),{status:"succeeded",remembered:{id:n.id,note:e.note}}):this.fail(t,e.id,this.unknownTarget(e.id))}case"register_marker":{let n=String(e.label??"").trim().toLowerCase();if(!n)return{status:"failed",reason:"label is required"};let i=await this.device.request("register_marker",void 0,{label:n},fi);return this.memory.recordOutcome(t,n,i.status,i.reason),{status:i.status,reason:i.reason,...i.data}}case"follow_user":{if(!this.world.snapshot)return this.fail(t,void 0,"The headset has not sent any world data yet.");this.runToken++;let n=await this.device.request("follow_user",void 0,void 0,fi);return this.memory.recordOutcome(t,void 0,n.status,n.reason),{status:n.status,skill:t,reason:n.reason,...n.data}}case"gesture":return await this.runPrimitive("gesture",String(e.type??""));case"run_sequence":return this.runSequence(e);case"stop_moving":{this.runToken++;let n=await this.device.request("stop",void 0,void 0,fi);return{status:n.status,reason:n.reason}}case"run_skill":return this.runSkill(e);default:return{status:"failed",reason:`Unknown skill "${t}". Available: ${Te.map(n=>n.name).join(", ")}`}}}catch(n){return this.fail(t,e?.target_id??e?.id,`internal error: ${n?.message??n}`)}}unknownTarget(t){let e=this.world.objects.map(n=>n.id);return`No object with id "${t}". Known ids: ${e.length?e.join(", "):"(none yet)"}, or "user". Try scan_surroundings or ask the user to point at it and use register_marker.`}record(t,e,n,i){let r=`${t}:${e??""}`;if(n==="succeeded")this.recentFailures.delete(r);else{let s=this.recentFailures.get(r),a=s&&Date.now()-s.at<3e4;this.recentFailures.set(r,{count:a?s.count+1:1,at:Date.now(),reason:i})}this.memory.recordOutcome(t,e,n,i)}validate(t,e){let n=this.recentFailures.get(`${t}:${e??""}`);return n&&n.count>=2&&Date.now()-n.at<3e4?`This exact action has just failed ${n.count} times in a row (${n.reason??"no reason given"}). Do not try it again now; tell the user and suggest something else.`:this.world.snapshot?t==="scan_surroundings"?this.device.capabilities.vision?null:"This headset has no camera access for object detection. Ask the user to point at things and use register_marker instead.":t==="approach_user"?null:t==="gesture"?e&&xa.has(e)?null:`Unknown gesture "${e}". Available: ${[...xa].join(", ")}.`:e?e==="user"?t==="inspect_object"?"inspect_object needs an object id, not the user.":null:this.world.find(e)?null:this.unknownTarget(e):"A target id is required.":"The headset has not sent any world data yet."}fail(t,e,n){return this.memory.recordOutcome(t,e,"failed",n),{status:"failed",skill:t,target_id:e,reason:n}}async runPrimitive(t,e){let n=this.validate(t,e);if(n)return this.fail(t,e,n);let i=t,r=t==="look_at"||t==="gesture"?fi:ih,s=t==="gesture"?await this.device.request(i,void 0,{type:e},r):await this.device.request(i,e,void 0,r);this.record(t,e,s.status,s.reason);let a={status:s.status,skill:t,target_id:e,reason:s.reason,...s.data};if(t==="inspect_object"&&s.status==="succeeded"){let l=this.world.find(e);l&&(a.object=this.world.describeObject(l),a.your_notes=this.memory.notesFor(l.id))}return a}background(t,e,n){let i=++this.runToken;n().catch(r=>({status:"failed",skill:t,target_id:e,reason:String(r?.message??r)})).then(r=>{i!==this.runToken&&r.status==="failed"||this.onFeedback(r)})}runSkill(t){let e=String(t.name??"").trim().toLowerCase(),n=this.memory.data.learnedSkills[e];if(!n)return{status:"failed",reason:`No saved skill "${e}". Saved: ${Object.keys(this.memory.data.learnedSkills).join(", ")||"(none)"}`};let i=t.target_id;return n.steps.some(r=>r.target==="$target")&&!i?{status:"failed",reason:`Skill "${e}" needs a target_id.`}:(this.runSteps(e,n.steps,i,r=>this.memory.skillUsed(e,r)),{status:"started",note:`Running ${n.steps.length} steps. The outcome will arrive as an [action_result].`})}runSequence(t){let e=Array.isArray(t.steps)?t.steps.map(r=>({skill:String(r?.skill),target:r?.target})):[];if(e.length===0||e.length>6)return{status:"failed",reason:"A sequence needs 1 to 6 steps."};let n=e.find(r=>!va.has(r.skill));if(n)return{status:"failed",reason:`Step skill "${n.skill}" is not a primitive. Allowed: ${[...va].join(", ")}`};for(let r of e){let s=this.validate(r.skill,r.target);if(s)return this.fail("run_sequence",r.target,`step ${r.skill}: ${s}`)}let i=String(t.save_as??"").trim().toLowerCase().replace(/[^a-z0-9_]+/g,"_");return this.runSteps("run_sequence",e,void 0,r=>{if(r&&i&&!Te.some(s=>s.name===i)){let s=new Set(e.filter(l=>l.skill!=="gesture"&&l.target&&l.target!=="user").map(l=>l.target)),a=s.size===1?e.map(l=>l.skill!=="gesture"&&s.has(l.target)?{...l,target:"$target"}:l):e;this.memory.saveSkill({name:i,description:`Sequence that worked: ${a.map(l=>`${l.skill}(${l.target??""})`).join(" -> ")}`,steps:a}),this.memory.skillUsed(i,!0)}}),{status:"started",note:`Running ${e.length} steps. The outcome will arrive as an [action_result].`}}runSteps(t,e,n,i){let r=this.runToken+1;this.background(t,n,async()=>{let s=[];for(let a of e){if(this.runToken!==r)return{status:"failed",skill:t,reason:"interrupted by a newer action",steps:s};let l=a.target==="$target"?n:a.target,c=await this.runPrimitive(a.skill,l);if(s.push(c),c.status!=="succeeded")return i(!1),{status:"failed",skill:t,target_id:n,reason:`step ${s.length} (${a.skill}) failed: ${c.reason}`,steps:s}}return i(!0),{status:"succeeded",skill:t,target_id:n,steps:s}})}};L();L();var kt=class{constructor(){throw new Error("this mind needs the backend; it cannot run inside the browser")}};M(kt,"OPEN",1);L();var Ye=class o{constructor(t,e){M(this,"opts",t);M(this,"log",e);M(this,"onSpeechStart",()=>{});M(this,"onSpeechEnd",()=>{});M(this,"onTranscript",()=>{});M(this,"onSpeechConfirmed",()=>{});M(this,"onUtterance",null);M(this,"onEarly",null);M(this,"onResumed",()=>{});M(this,"ws",null);M(this,"closed",!1);M(this,"retries",0);M(this,"mode","stream");M(this,"vad",{noise:.004,speaking:!1,confirmed:!1,early:!1,voicedMs:0,silentMs:0,chunks:[],pre:[],ms:0})}async start(){if(this.opts.mode==="http"){this.mode="http";return}try{await this.connect()}catch(t){this.mode="http",this.log("warn",`Live speech-to-text is unreachable (${t?.message??t}); hearing through plain HTTPS instead.`)}}connect(){return new Promise((t,e)=>{let n=this.opts.url??`wss://api.openai.com/v1/realtime?model=${encodeURIComponent(this.opts.model)}`,i=new kt(n,{headers:{Authorization:`Bearer ${this.opts.apiKey}`}});this.ws=i;let r=!1;i.on("open",()=>{r=!0,this.retries=0,i.send(JSON.stringify({type:"session.update",session:{type:"realtime",output_modalities:["text"],audio:{input:{format:{type:"audio/pcm",rate:24e3},transcription:{model:this.opts.transcribeModel},turn_detection:{type:"server_vad",threshold:.6,silence_duration_ms:400,create_response:!1,interrupt_response:!1}}}}})),t()}),i.on("message",s=>{let a;try{a=JSON.parse(s.toString())}catch{return}if(a.type==="input_audio_buffer.speech_started")this.onSpeechStart();else if(a.type==="input_audio_buffer.speech_stopped")this.onSpeechEnd();else if(a.type==="conversation.item.input_audio_transcription.completed"){let l=String(a.transcript??"").trim();l&&this.onTranscript(l)}else a.type==="error"&&this.log("error",`speech-to-text error: ${a.error?.message??JSON.stringify(a)}`)}),i.on("error",s=>{this.log("error",`speech-to-text socket error: ${s.message}`),r||e(s)}),i.on("close",()=>{if(this.closed||!r)return;let s=Math.min(8e3,500*2**this.retries++);setTimeout(()=>!this.closed&&this.connect().catch(()=>{}),s)})})}audio(t){this.mode==="http"?this.detect(Buffer.from(t,"base64")):this.ws?.readyState===kt.OPEN&&this.ws.send(JSON.stringify({type:"input_audio_buffer.append",audio:t}))}detect(t){let e=this.vad,n=t.length>>1;if(n===0)return;let i=0;for(let l=0;l<n;l++){let c=t.readInt16LE(l*2)/32768;i+=c*c}let r=Math.sqrt(i/n),s=n/24e3*1e3,a=r>Math.max(.008,e.noise*3.5);if(a||(e.noise+=(r-e.noise)*.05),!e.speaking){e.pre.push(t),e.pre.length>6&&e.pre.shift(),e.voicedMs=a?e.voicedMs+s:0,e.voicedMs>=120&&(e.speaking=!0,e.confirmed=!1,e.chunks=e.pre.splice(0),e.silentMs=0,e.ms=e.voicedMs,this.onSpeechStart());return}if(e.chunks.push(t),e.ms+=s,a&&(e.voicedMs+=s),!e.confirmed&&e.voicedMs>=300&&(e.confirmed=!0,this.onSpeechConfirmed()),e.silentMs=a?0:e.silentMs+s,a&&e.early?(e.early=!1,this.onResumed()):!e.early&&this.onEarly&&e.silentMs>=120&&e.voicedMs>=250&&(e.early=!0,this.onEarly(Buffer.concat(e.chunks))),e.silentMs>=(this.opts.silenceMs??350)||e.ms>=2e4){let l=Buffer.concat(e.chunks),c=e.voicedMs;e.speaking=!1,e.early=!1,e.chunks=[],e.voicedMs=0,this.onSpeechEnd(),c>=250&&(this.onUtterance?this.onUtterance(l):this.transcribe(l).then(h=>h&&!this.closed&&this.onTranscript(h)))}}static wav(t){let e=Buffer.alloc(44);return e.write("RIFF",0),e.writeUInt32LE(36+t.length,4),e.write("WAVEfmt ",8),e.writeUInt32LE(16,16),e.writeUInt16LE(1,20),e.writeUInt16LE(1,22),e.writeUInt32LE(24e3,24),e.writeUInt32LE(24e3*2,28),e.writeUInt16LE(2,32),e.writeUInt16LE(16,34),e.write("data",36),e.writeUInt32LE(t.length,40),Buffer.concat([e,t])}async transcribe(t){let e=new FormData;e.append("model",this.opts.transcribeModel),e.append("file",new Blob([new Uint8Array(o.wav(t))],{type:"audio/wav"}),"speech.wav");try{let n=await fetch(`${this.opts.httpBaseUrl??"https://api.openai.com/v1"}/audio/transcriptions`,{method:"POST",headers:{authorization:`Bearer ${this.opts.apiKey}`},body:e,signal:AbortSignal.timeout(15e3)});return n.ok?String((await n.json()).text??"").trim():(this.log("error",`speech-to-text failed (${n.status}): ${(await n.text()).slice(0,200)}`),"")}catch(n){return this.log("error",`speech-to-text failed: ${n?.message??n}`),""}}close(){this.closed=!0,this.ws?.close()}},pi=class{constructor(t,e){M(this,"opts",t);M(this,"log",e);M(this,"onAudio",()=>{});M(this,"onFirstAudio",()=>{});M(this,"generation",0);M(this,"tail",Promise.resolve());M(this,"aborter",new AbortController)}say(t){if(t=t.trim(),!t)return;let e=this.generation,n=this.aborter.signal,i=fetch(`${this.opts.baseUrl??"https://api.openai.com/v1"}/audio/speech`,{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${this.opts.apiKey}`},body:JSON.stringify({model:this.opts.model,voice:this.opts.voice,input:t,response_format:"pcm",...this.opts.instructions?{instructions:this.opts.instructions}:{}}),signal:n});i.catch(()=>{}),this.tail=this.tail.then(async()=>{if(e===this.generation)try{let r=await i;if(!r.ok||!r.body)throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0,200)}`);let s=Buffer.alloc(0);for await(let a of r.body){if(e!==this.generation)return;let l=s.length?Buffer.concat([s,a]):Buffer.from(a),c=l.length-l.length%2;s=l.subarray(c),l=l.subarray(0,c),l.length&&(this.onFirstAudio(),this.onAudio(l.toString("base64")))}}catch(r){e===this.generation&&r?.name!=="AbortError"&&this.log("error",`text-to-speech failed: ${r?.message??r}`)}})}cancel(){this.generation++,this.aborter.abort(),this.aborter=new AbortController,this.tail=Promise.resolve()}},mi=class{constructor(t){M(this,"emit",t);M(this,"buf","")}push(t){for(this.buf+=t;;){let e=this.buf.match(/^([\s\S]*?[.!?…]+["')\]]*)(\s+|$)/);if(!e||e[2]===""&&!/[.!?…]["')\]]*$/.test(this.buf)||e[2]==="")break;this.emit(e[1].trim()),this.buf=this.buf.slice(e[0].length)}}flush(){let t=this.buf.trim();this.buf="",t&&this.emit(t)}};var _a=new Map,rh=Te.filter(o=>o.name!=="get_world_state").map(o=>{let t=structuredClone(o.parameters);return ma.has(o.name)&&(t.properties={...t.properties,say:{type:"string",description:'One short natural sentence to say out loud the instant this starts, e.g. "Sure, on my way." Put your spoken reply here rather than in text when you call this tool.'}}),_a.set(o.name,t),{type:"function",function:{name:o.name,description:o.description,parameters:t}}}),sh=Te.filter(o=>o.name!=="get_world_state").map(o=>({type:"function",function:{name:o.name,description:o.description,parameters:o.parameters}})),oh=`

# Voice
You hear the user's own voice and you answer out loud in yours; there is no "say" field. Speak the way people talk: one short sentence, a few words when that is enough. When the user asks you to move or look, call the skill AND say a few words ("On my way.") in the same reply. If you cannot make out what was said, ask them to say it again.
When an [action_result] arrives, say a few words at most, once, and do not call another skill unless the user's request is still unfinished. Never walk somewhere you were not asked to go.`,ah=[{re:/^(come( on)?( over| back)?( here| to me)|get over here|over here|come here( now)?)$/,skill:"approach_user"},{re:/^(follow me|come with me|come along|walk with me)$/,skill:"follow_user"},{re:/^(stop|wait|hold on|freeze|halt|stop moving|stay there|stay)$/,skill:"stop_moving"}],lh=new Set(["walk_to","approach_user","follow_user","inspect_object","look_at"]);function ch(o,t=()=>{}){let e=r=>r.split(" ").length<=3?t(r):void 0,n=o.toLowerCase().replace(/[^a-z0-9' ]+/g," ").replace(/\b(hey|hi|ok|okay|sim|please|now|can you|could you|will you|would you|just|yeah|yes|sure|and)\b/g," ").replace(/\s+/g," ").trim();for(let r of ah)if(r.re.test(n))return{skill:r.skill,args:{}};let i=/^(?:go|walk|head|move|run|come|get)(?: over| back| on over)? (?:to|towards?|next to|up to|by) (.+)$/.exec(n);if(i){let r=e(i[1]);if(r==="user")return{skill:"approach_user",args:{}};if(r)return{skill:"walk_to",args:{target_id:r}}}if(i=/^(?:go )?(?:check out|inspect|examine|take a look at|have a look at|go look at|go see) (.+)$/.exec(n),i){let r=e(i[1]);if(r&&r!=="user")return{skill:"inspect_object",args:{id:r}}}if(i=/^(?:look at|face|turn to|turn towards?) (.+)$/.exec(n),i){let r=e(i[1]);if(r)return{skill:"look_at",args:{target_id:r}}}return null}var gi=class{constructor(t,e){M(this,"ctx",t);M(this,"opts",e);M(this,"name");M(this,"utterances",0);M(this,"heardAs",new Map);M(this,"reflex",{skill:"",at:-1e9});M(this,"early",null);M(this,"history",[]);M(this,"inbox",[]);M(this,"running",!1);M(this,"abort",null);M(this,"closed",!1);M(this,"speechEndAt",0);M(this,"lastCallAt",0);M(this,"worldEventTimer",null);e.mouth&&(e.mouth.onAudio=n=>this.ctx.send({type:"audio",pcm16:n}),e.mouth.onFirstAudio=()=>this.ctx.timer.mark("first_audio")),this.name=e.audioModel?"audio":"gpt",e.ears&&(e.ears.onSpeechStart=()=>this.ctx.send({type:"state",status:"listening"}),e.ears.onSpeechEnd=()=>this.speechEndAt=performance.now(),e.ears.onTranscript=n=>this.heard(n,"voice"),e.audioModel&&(e.ears.onSpeechConfirmed=()=>this.cutOff(),e.ears.onEarly=n=>this.heardAudio(n,!0),e.ears.onResumed=()=>this.discardEarly(),e.ears.onUtterance=n=>this.early?this.confirmEarly():this.heardAudio(n,!1)))}async start(){if(this.opts.ears)try{await this.opts.ears.start()}catch(t){this.ctx.log("error",`Hearing is unavailable (${t?.message??t}): the character cannot hear the microphone. Typed input still works.`),this.opts.ears=null}this.opts.mouth||this.ctx.log("warn","No text-to-speech configured: replies are text only.")}onAudio(t){this.opts.ears?.audio(t)}onText(t){this.heard(t,"text")}interrupt(){this.cutOff(),this.ctx.send({type:"state",status:"idle"})}onFeedback(t){this.inbox.push({kind:"event",text:`[action_result] ${JSON.stringify(t)}`}),this.pump()}onWorldEvent(t,e){if(this.inbox.push({kind:"note",text:`[world_event] ${t}`}),!e){this.inbox.filter(i=>i.kind==="note").length>12&&this.inbox.splice(this.inbox.findIndex(i=>i.kind==="note"),1);return}if(this.worldEventTimer)return;let n=Math.max(1500,this.opts.worldEventMinGapMs-(performance.now()-this.lastCallAt));this.worldEventTimer=setTimeout(()=>{this.worldEventTimer=null;for(let i of this.inbox)i.kind==="note"&&i.text.startsWith("[world_event]")&&(i.kind="event");this.pump()},n)}refreshContext(){}close(){this.closed=!0,this.cutOff(),this.worldEventTimer&&clearTimeout(this.worldEventTimer),this.opts.ears?.close()}heard(t,e){/\p{L}{2,}/u.test(t)&&(this.cutOff(),this.ctx.send({type:"transcript",role:"user",text:t}),this.ctx.timer.begin(e,t,e==="voice"&&this.speechEndAt?this.speechEndAt:performance.now()),e==="voice"&&this.ctx.timer.mark("transcript"),this.obey(t)&&this.inbox.push({kind:"note",text:`[note] The body already obeyed this by reflex (${this.reflex.skill}); do not call a movement skill for it, just say a few words.`}),this.inbox.push({kind:"user",text:`[user said] ${t}`}),this.pump())}heardAudio(t,e){let{ctx:n,opts:i}=this;if(e&&(this.running||this.early))return;e||this.cutOff();let r=++this.utterances,s={};this.heardAs.set(r,s),this.heardAs.size>8&&this.heardAs.delete(this.heardAs.keys().next().value);let a=()=>n.timer.begin("voice","(speech)",performance.now());if(e){let l=()=>{},c=new Promise(h=>l=h);this.early={release:l,gate:c,cancelled:!1,id:r,begin:a}}else a();this.inbox.push({kind:"user",text:"[the user said the attached audio]",audio:Ye.wav(t).toString("base64"),utterance:r}),this.pump(),i.ears.transcribe(t).then(async l=>{this.closed||!l||!this.heardAs.has(r)||(this.early?.id===r&&await this.early.gate,this.heardAs.has(r)&&(s.text=l,n.timer.note({input:l.slice(0,80)}),n.send({type:"transcript",role:"user",text:l}),s.message&&(s.message.content=`${s.context}
[user said] ${l}`),this.obey(l)))})}obey(t){let e=ch(t,n=>this.ctx.world.resolveId(n));return!e||this.reflex.skill===e.skill&&performance.now()-this.reflex.at<4e3?!1:(this.reflex={skill:e.skill,at:performance.now()},this.ctx.log("info",`reflex ${e.skill}(${JSON.stringify(e.args)}) for "${t}"`),this.ctx.skills.execute(e.skill,e.args),!0)}confirmEarly(){let t=this.early;this.early=null,this.opts.mouth?.cancel(),this.ctx.send({type:"audio_stop"}),t.begin(),t.release()}discardEarly(){let t=this.early;t&&(t.cancelled=!0,this.early=null,this.heardAs.delete(t.id),this.inbox=this.inbox.filter(e=>e.utterance!==t.id),this.abort?.abort(),t.release())}cutOff(){this.opts.mouth?.cancel(),this.ctx.send({type:"audio_stop"}),this.abort?.abort()}async pump(){if(!(this.running||this.closed)&&this.inbox.some(t=>t.kind!=="note")){this.running=!0;try{for(;!this.closed&&this.inbox.some(t=>t.kind!=="note");){let t=this.inbox.splice(0);!t.some(l=>l.kind==="user")&&t.some(l=>l.kind==="event")&&this.ctx.timer.begin("event",t.find(l=>l.kind==="event").text);let e=`[context]
${this.ctx.world.contextText()}
memory:
${this.ctx.memory.summary()}
[/context]`,n=t.filter(l=>l.audio),i=n[n.length-1],r=`${e}
${t.filter(l=>!l.audio||l===i).map(l=>l.text).join(`
`)}`;for(let l of this.history)l.role==="user"&&Array.isArray(l.content)&&(l.content=String(l.content[0]?.text??"").replace("[the user said the attached audio]","[user said something that was not transcribed]"));let s={role:"user",content:i?[{type:"text",text:r},{type:"input_audio",input_audio:{data:i.audio,format:"wav"}}]:r};if(i){let l=this.heardAs.get(i.utterance);l&&(l.message=s,l.context=e,l.text&&(s.content=`${e}
[user said] ${l.text}`))}this.history.push(s);let a=i&&this.early?.id===i.utterance?this.early:null;this.trimHistory();for(let l=0;l<4&&await this.callOnce(l===0?a:null);l++);if(a?.cancelled){let l=this.history.indexOf(s);l>=0&&this.history.splice(l),this.inbox=this.inbox.filter(c=>!c.text.startsWith("[note] You were interrupted"))}}}catch(t){this.ctx.log("error",`OpenAI brain error: ${t?.message??t}`)}finally{this.running=!1,this.ctx.send({type:"state",status:"idle"})}}}async callOnce(t=null){let{ctx:e,opts:n}=this,i=this.abort=new AbortController,r=setTimeout(()=>i.abort(),2e4);this.lastCallAt=performance.now(),e.timer.mark("llm_request"),e.timer.countLlmCall(),e.send({type:"state",status:"thinking"});let s=[],a=new Map,l=[],c=Promise.resolve(),h="",u=!0,f=!1,d=new mi(m=>this.speak(m)),p=m=>{if(a.has(m)||!s[m])return;let g=c.then(()=>this.runTool(s[m],l));c=g.catch(()=>{}),a.set(m,g)};try{let m=await fetch(`${n.baseUrl??"https://api.openai.com/v1"}/chat/completions`,{method:"POST",headers:{authorization:`Bearer ${n.apiKey}`,"content-type":"application/json"},body:JSON.stringify(n.audioModel?{model:n.audioModel,stream:!0,modalities:["text","audio"],audio:{voice:n.voice??"alloy",format:"pcm16"},messages:[{role:"system",content:Cn+oh},...this.history],tools:sh}:{model:n.model,stream:!0,messages:[{role:"system",content:Cn},...this.history],tools:rh,...n.effort?{reasoning_effort:n.effort}:{}}),signal:i.signal});if(!m.ok||!m.body){let _=(await m.text().catch(()=>"")).slice(0,300);throw m.status===401?new Error("OpenAI rejected the key. Check it at /setup."):new Error(`OpenAI API error ${m.status}: ${_}. Check OPENAI_PLANNER_MODEL / OPENAI_PLANNER_EFFORT for this account.`)}let g=new TextDecoder,v="";for await(let _ of m.body){v+=g.decode(_,{stream:!0});let E;for(;(E=v.indexOf(`
`))>=0;){let S=v.slice(0,E).trim();if(v=v.slice(E+1),!S.startsWith("data:")||S==="data: [DONE]")continue;let T;try{T=JSON.parse(S.slice(5)).choices?.[0]?.delta}catch{continue}if(T){if(t&&(await t.gate,t.cancelled))throw new Error("discarded");u&&(u=!1,e.timer.mark("llm_first_token")),T.audio?.data&&(f||(f=!0,e.timer.mark("speech_text"),e.timer.mark("first_audio"),e.send({type:"state",status:"speaking"})),e.send({type:"audio",pcm16:T.audio.data})),T.audio?.transcript&&(h+=T.audio.transcript),typeof T.content=="string"&&T.content&&(h+=T.content,d.push(T.content));for(let A of T.tool_calls??[]){let I=A.index??0;s[I]||(s[I]={id:A.id??`call_${I}`,name:"",json:""},I>0&&p(I-1)),A.id&&(s[I].id=A.id),A.function?.name&&(s[I].name+=A.function.name),A.function?.arguments&&(s[I].json+=A.function.arguments)}}}}if(clearTimeout(r),this.abort=null,t&&(await t.gate,t.cancelled))return!1;d.flush();for(let _=0;_<s.length;_++)p(_);let w=h.trim();w&&!/^<silent>$/i.test(w)&&e.send({type:"transcript",role:"assistant",text:w}),this.history.push({role:"assistant",content:w||null,...s.length?{tool_calls:s.map(_=>({id:_.id,type:"function",function:{name:_.name,arguments:_.json||"{}"}}))}:{}});let x=!1;for(let _=0;_<s.length;_++){let E=await a.get(_);this.history.push({role:"tool",tool_call_id:s[_].id,content:E.content}),E.failed&&(x=!0)}return x}catch(m){if(clearTimeout(r),this.abort=null,t?.cancelled)return!1;if(i.signal.aborted){await c;let g=[h.trim()?`you had begun saying: "${h.trim().slice(0,200)}"`:"",l.length?`you had already started: ${l.join("; ")}`:""].filter(Boolean);return g.length&&this.inbox.unshift({kind:"note",text:`[note] You were interrupted mid-reply; ${g.join(" and ")}.`}),!1}throw m}}async runTool(t,e){let n=u=>({failed:!0,content:u}),i;try{i=t.json.trim()?JSON.parse(t.json):{}}catch{return n(JSON.stringify({INVALID_JSON:t.json.slice(0,500)}))}let r=_a.get(t.name);if(!r)return n(`Unknown skill "${t.name}".`);let s=ga(r,i);if(s)return n(`Invalid input: ${s}`);let{say:a,...l}=i;if(performance.now()-this.reflex.at<4e3&&(t.name===this.reflex.skill||this.reflex.skill!=="stop_moving"&&lh.has(t.name)))return typeof a=="string"&&a.trim()&&(this.speak(a),this.ctx.send({type:"transcript",role:"assistant",text:a.trim()})),e.push(`${t.name}()`),{failed:!1,content:JSON.stringify({status:"started",note:`The body had already obeyed the user by reflex (${this.reflex.skill}); this call was not needed and was not run.`})};this.ctx.log("info",`skill ${t.name}(${JSON.stringify(l)})`);let c=await this.ctx.skills.execute(t.name,l);this.ctx.log("info",`  -> ${JSON.stringify(c).slice(0,300)}`);let h=c.status==="failed";return!h&&typeof a=="string"&&a.trim()&&(this.speak(a),this.ctx.send({type:"transcript",role:"assistant",text:a.trim()})),h||e.push(`${t.name}(${JSON.stringify(l)})`),{failed:h,content:JSON.stringify(h&&a?{...c,note:'Your "say" line was NOT spoken because this failed.'}:c)}}speak(t){/^<silent>$/i.test(t.trim())||(this.ctx.timer.mark("speech_text"),this.ctx.send({type:"state",status:"speaking"}),this.opts.mouth?.say(t))}trimHistory(){if(!(this.history.length<=60)){for(let t=this.history.length-30;t<this.history.length;t++)if(this.history[t].role==="user"){this.history.splice(0,t);return}}}};L();L();var yi=class{constructor(){M(this,"history",[]);M(this,"onRecord",()=>{});M(this,"current",null);M(this,"t0",0);M(this,"flushTimer",null)}begin(t,e,n=performance.now()){this.flush(),this.t0=n,this.current={at:new Date().toISOString(),trigger:t,input:e.slice(0,80),ms:{},llm_calls:0},this.flushTimer=setTimeout(()=>this.flush(),8e3)}mark(t){!this.current||t in this.current.ms||(this.current.ms[t]=Math.round(performance.now()-this.t0))}note(t){this.current&&Object.assign(this.current,t)}countLlmCall(){this.current&&this.current.llm_calls++}flush(){this.flushTimer&&clearTimeout(this.flushTimer),this.flushTimer=null;let t=this.current;this.current=null,!(!t||Object.keys(t.ms).length===0)&&(this.history.push(t),this.history.length>200&&this.history.shift(),this.onRecord(t))}static summarize(t){let e={};for(let i of t){for(let[r,s]of Object.entries(i.ms))(e[r]??(e[r]=[])).push(s);i.plan_ms!==void 0&&(e.plan_ms??(e.plan_ms=[])).push(i.plan_ms)}let n={};for(let[i,r]of Object.entries(e))r.sort((s,a)=>s-a),n[i]={n:r.length,p50:r[Math.floor((r.length-1)*.5)],p90:r[Math.floor((r.length-1)*.9)]};return n}};L();var hh={type:"object",additionalProperties:!1,required:["objects"],properties:{objects:{type:"array",items:{type:"object",additionalProperties:!1,required:["label","x","y","confidence"],properties:{label:{type:"string",description:'lowercase singular noun, e.g. "chair"'},x:{type:"number",description:"horizontal centre of the object, 0 (left edge) to 1 (right edge)"},y:{type:"number",description:"vertical centre of the object, 0 (top edge) to 1 (bottom edge)"},confidence:{type:"number",description:"0 to 1"}}}}}},uh="This is one frame from a mixed-reality headset camera in a room. List up to 8 distinct physical objects a person could walk up to or point at (furniture, appliances, bags, plants, laptops, bottles and so on). Skip walls, floor, ceiling, people and anything you are unsure about. For each give a lowercase singular label and the centre point of the object's visible body in normalised image coordinates.";async function Ma(o,t){let e=await fetch(`${t.baseUrl??"https://api.openai.com/v1"}/chat/completions`,{method:"POST",headers:{"content-type":"application/json",authorization:`Bearer ${t.apiKey}`},body:JSON.stringify({model:t.model,messages:[{role:"user",content:[{type:"text",text:uh},{type:"image_url",image_url:{url:`data:image/jpeg;base64,${o}`}}]}],response_format:{type:"json_schema",json_schema:{name:"detections",strict:!0,schema:hh}}}),signal:AbortSignal.timeout(2e4)});if(!e.ok)throw new Error(`vision HTTP ${e.status}: ${(await e.text()).slice(0,300)}`);let n=await e.json(),i=JSON.parse(n.choices?.[0]?.message?.content??'{"objects":[]}'),r=s=>Math.max(0,Math.min(1,Number(s)||0));return i.objects.map(s=>({label:String(s.label).toLowerCase().trim().replace(/\s+/g,"_"),x:r(s.x),y:r(s.y),confidence:r(s.confidence)})).filter(s=>s.label&&s.confidence>=.4)}L();var wa=(o,t)=>[o[0]-t[0],o[1]-t[1],o[2]-t[2]],Ze=(o,t)=>Math.hypot(o[0]-t[0],o[2]-t[2]),Kr={detected:"seen by the headset camera",room_scan:"from the user's room setup scan (not camera detection)",manual:"registered by the user pointing at it (not camera detection)",simulated:"simulated test object"},vi=class o{constructor(){M(this,"snapshot",null);M(this,"updatedAt",0)}update(t){this.snapshot=t,this.updatedAt=Date.now()}get objects(){return this.snapshot?.objects??[]}find(t){if(!t)return;let e=t.trim().toLowerCase();return this.objects.find(n=>n.id.toLowerCase()===e)}resolveId(t){if(!t)return;let e=t.trim().toLowerCase().replace(/[^a-z0-9_ ]+/g,"").replace(/^(the|that|this|my|a|an) /,"").trim();if(!e)return;if(["user","me","myself","you"].includes(e))return"user";let n=this.find(e);if(n)return n.id;let i=e.replace(/_/g," "),r=this.objects.filter(s=>{let a=s.label.toLowerCase().replace(/_/g," ");return a===i||new RegExp(`\\b${a.replace(/[^a-z0-9 ]/g,"")}s?\\b`).test(i)});return r.length===1?r[0].id:void 0}signature(){return this.objects.map(t=>`${t.id}:${t.label}:${t.source}:${t.reachable??""}`).sort().join("|")}static bearing(t,e){let n=wa(e,t.pos),i=t.fwd[0],r=t.fwd[2],s=Math.atan2(r*n[0]-i*n[2],i*n[0]+r*n[2])*180/Math.PI,a=Math.abs(s),l=s>0?"right":"left";return a<20?"straight ahead":a<70?`ahead-${l}`:a<110?`to the ${l}`:a<160?`behind-${l}`:"behind"}gazeTarget(t=25){let e=this.snapshot;if(!e)return;let n,i=t;for(let r of e.objects){let s=wa(r.pos,e.user.pos),a=Math.hypot(s[0],s[2]),l=Math.hypot(e.user.fwd[0],e.user.fwd[2]);if(a<.2||l<.1)continue;let c=(s[0]*e.user.fwd[0]+s[2]*e.user.fwd[2])/(a*l),h=Math.acos(Math.max(-1,Math.min(1,c)))*180/Math.PI;h<i&&(i=h,n=r)}return n}describeObject(t){let e=this.snapshot;return{id:t.id,label:t.label,origin:Kr[t.source]??t.source,confidence:Number(t.confidence.toFixed(2)),metres_from_you:Number(Ze(t.pos,e.avatar.pos).toFixed(1)),metres_from_user:Number(Ze(t.pos,e.user.pos).toFixed(1)),direction_for_user:o.bearing(e.user,t.pos),seconds_since_observed:Math.round(t.lastSeen),reachable:t.reachable??!0}}describe(){let t=this.snapshot;if(!t)return{status:"no world data from the headset yet"};let e=this.gazeTarget();return{you:{state:t.avatar.state,metres_from_user:Number(Ze(t.avatar.pos,t.user.pos).toFixed(1)),direction_for_user:o.bearing(t.user,t.avatar.pos)},user_is_looking_toward:e?e.id:"nothing you know about",room:t.room??"unknown",objects:t.objects.map(n=>this.describeObject(n))}}summary(){let t=this.snapshot;return t?t.objects.length===0?"You know of no objects in the room yet.":t.objects.map(e=>`- ${e.id}: a ${e.label}, ${Kr[e.source]??e.source}${e.reachable===!1?", NOT reachable on foot":""}`).join(`
`):"No world data from the headset yet."}contextText(){let t=this.snapshot;if(!t)return"No world data from the headset yet.";let e=this.gazeTarget(),n=[`you: ${t.avatar.state}, ${Ze(t.avatar.pos,t.user.pos).toFixed(1)} m from the user, ${o.bearing(t.user,t.avatar.pos)} of them`,`user is looking toward: ${e?e.id:"nothing you know about"}`,`room: ${t.room?`${t.room.source}, walkable floor ${t.room.navmesh?"mapped":"NOT mapped"}`:"unknown"}`];if(t.objects.length===0)n.push("objects: none known yet");else{n.push("objects:");for(let i of t.objects)n.push(`- ${i.id}: ${i.label}, ${Kr[i.source]??i.source}, ${Ze(i.pos,t.avatar.pos).toFixed(1)} m from you, ${Ze(i.pos,t.user.pos).toFixed(1)} m from the user (${o.bearing(t.user,i.pos)} for them)${i.source==="detected"?`, last seen ${Math.round(i.lastSeen)} s ago, confidence ${i.confidence.toFixed(1)}`:""}${i.reachable===!1?", NOT reachable on foot":""}`)}return n.join(`
`)}};var ts=[],xi=class{constructor(t,e,n,i){M(this,"link",t);M(this,"opts",e);M(this,"capabilities",{});M(this,"world",new vi);M(this,"skills");M(this,"brain");M(this,"pending",new Map);M(this,"nextId",1);M(this,"worldSig","");M(this,"refreshTimer",null);M(this,"device","unknown");M(this,"timer",new yi);M(this,"knownIds",null);M(this,"userFar",!1);M(this,"disposed",!1);this.skills=new di(this,this.world,n);let r={send:l=>this.send(l),skills:this.skills,world:this.world,memory:n,timer:this.timer,log:(l,c)=>this.log(l,c)};this.timer.onRecord=l=>{ts.push(l),ts.length>500&&ts.shift(),this.log("info",`latency ${l.trigger} "${l.input}": ${Object.entries(l.ms).map(([c,h])=>`${c}=${h}ms`).join(" ")}${l.plan_ms!==void 0?` plan=${l.plan_ms}ms`:""} llm_calls=${l.llm_calls}`),this.send({type:"metrics",turn:l})};let s=(l,c)=>this.log(l,c);this.brain=i(e,r,s,e.brain),this.skills.onFeedback=l=>{this.log("info",`feedback ${JSON.stringify(l).slice(0,300)}`),this.brain.refreshContext(),this.brain.onFeedback(l,!0)};let a=()=>this.send({type:"ready",protocol:1,brain:this.brain.name,audioRate:24e3});this.brain.start().then(a).catch(l=>{if(this.brain.name==="realtime"&&!e.brainFixed&&e.apiKey)return this.log("warn",`live speech-to-speech is unavailable (${l?.message??l}); using the 'audio' mind instead.`),this.brain.close(),this.brain=i(e,r,s,"audio"),this.brain.start().then(a);this.log("error",`brain failed to start: ${l?.message??l}. Check OPENAI_API_KEY / network.`)}).catch(l=>this.log("error",`brain failed to start: ${l?.message??l}. Check OPENAI_API_KEY / network.`))}log(t,e){this.opts.quiet||console[t==="info"?"log":t](`[${this.device}] ${e}`),t!=="info"&&this.send({type:"log",level:t,message:e})}send(t){this.link.open()&&this.link.send(JSON.stringify(t)),t.type==="transcript"&&!this.opts.quiet&&console.log(`[${this.device}] ${t.role}: ${t.text}`)}request(t,e,n,i=3e4){let r=`a${this.nextId++}`;return new Promise(s=>{let a=setTimeout(()=>{this.pending.delete(r),s({type:"action_result",id:r,status:"failed",reason:`The headset did not finish ${t} within ${i/1e3}s.`})},i);this.pending.set(r,{resolve:s,timer:a}),this.send({type:"action",id:r,action:t,target_id:e,params:n,status:"requested"}),this.timer.mark("action_dispatched")})}receive(t){let e;try{e=JSON.parse(t)}catch{return}this.onMessage(e)}onMessage(t){switch(t.type){case"hello":this.device=t.device,this.capabilities=t.capabilities??{},this.log("info",`hello protocol=${t.protocol} capabilities=${JSON.stringify(this.capabilities)}`),t.protocol!==1&&this.log("warn",`protocol mismatch: device ${t.protocol}, backend ${1}`);break;case"audio":this.brain.onAudio(t.pcm16);break;case"text":this.brain.onText(t.text);break;case"interrupt":this.brain.interrupt();break;case"world":{this.world.update(t.world),this.detectWorldEvents();let e=this.world.signature();e!==this.worldSig&&(this.worldSig=e,this.refreshTimer&&clearTimeout(this.refreshTimer),this.refreshTimer=setTimeout(()=>this.brain.refreshContext(),400));break}case"action_result":{let e=this.pending.get(t.id);if(!e)break;clearTimeout(e.timer),this.pending.delete(t.id),e.resolve(t);break}case"view":this.brain.onView?.(t.jpeg);break;case"frame":this.onFrame(t.id,t.jpeg);break;case"event":t.name==="action_started"?(this.timer.mark("device_started"),this.timer.note({plan_ms:Number(t.data?.plan_ms??0),path_m:Number(t.data?.path_m??0)})):this.log("info",`event ${t.name} ${JSON.stringify(t.data??{})}`);break}}detectWorldEvents(){let t=this.world.snapshot;if(!t||!this.brain.onWorldEvent)return;let e=new Set(t.objects.map(i=>i.id));if(this.knownIds&&this.pending.size===0){for(let i of t.objects)this.knownIds.has(i.id)||this.brain.onWorldEvent(`A new object is now known: ${i.id} (${i.label}).`,!1);for(let i of this.knownIds)e.has(i)||this.brain.onWorldEvent(`Object ${i} is no longer known.`,!1)}this.knownIds=e;let n=Math.hypot(t.avatar.pos[0]-t.user.pos[0],t.avatar.pos[2]-t.user.pos[2]);!this.userFar&&n>3.5&&t.avatar.state==="idle"?(this.userFar=!0,this.brain.onWorldEvent(`The user has moved away; they are now ${n.toFixed(1)} m from you.`,!0)):this.userFar&&n<2.5&&(this.userFar=!1)}async onFrame(t,e){if(!this.opts.apiKey){this.send({type:"detections",frameId:t,items:[],error:"No vision model configured on the backend (OPENAI_API_KEY missing)."});return}try{let n=await Ma(e,{apiKey:this.opts.apiKey,model:this.opts.visionModel});this.log("info",`vision: ${n.map(i=>`${i.label}@${i.x.toFixed(2)},${i.y.toFixed(2)}`).join(" ")||"nothing"}`),this.send({type:"detections",frameId:t,items:n})}catch(n){this.log("error",`vision failed: ${n?.message??n}`),this.send({type:"detections",frameId:t,items:[],error:String(n?.message??n)})}}dispose(){if(!this.disposed){this.disposed=!0,this.refreshTimer&&clearTimeout(this.refreshTimer);for(let t of this.pending.values())clearTimeout(t.timer),t.resolve({type:"action_result",id:"",status:"failed",reason:"headset disconnected"});this.pending.clear(),this.brain.close(),this.opts.quiet||console.log(`[${this.device}] disconnected`)}}};L();function ba(o,t,e){return async({onMessage:n,onClose:i})=>{let r=new RTCPeerConnection,s=r.addTransceiver("audio",{direction:"sendrecv"}).sender,a=e.onMic(u=>s.replaceTrack(u.getAudioTracks()[0]||null));r.ontrack=u=>e.onVoice(u.streams[0]);let l=r.createDataChannel("oai-events");l.onmessage=u=>n(String(u.data));let c=!1,h=()=>{if(!c){c=!0,a(),e.onVoice(null);try{r.close()}catch{}i()}};try{await r.setLocalDescription(await r.createOffer());let u=await fetch("https://api.openai.com/v1/realtime/calls?model="+encodeURIComponent(t),{method:"POST",headers:{Authorization:"Bearer "+o,"Content-Type":"application/sdp"},body:r.localDescription.sdp,signal:AbortSignal.timeout(8e3)});if(!u.ok)throw new Error("OpenAI refused the live connection ("+u.status+"): "+(await u.text()).slice(0,160));await r.setRemoteDescription({type:"answer",sdp:await u.text()}),await new Promise((f,d)=>{let p=setTimeout(()=>d(new Error("the live connection did not open within 8 s (this network may block it)")),8e3);l.onopen=()=>{clearTimeout(p),f()}})}catch(u){c=!0,a(),e.onVoice(null);try{r.close()}catch{}throw u}return r.onconnectionstatechange=()=>{(r.connectionState==="failed"||r.connectionState==="closed")&&h()},l.onclose=h,{send:u=>{l.readyState==="open"&&l.send(u)},close:h}}}L();var fh=Te.filter(o=>o.name!=="get_world_state"),dh=`
# Voice
You speak aloud directly; there is no "say" field. When you call a movement skill, call it FIRST, before saying anything, so the body sets off at once; then say a few words at most ("On my way."). Answer in one short sentence unless asked for more. The [context] block is the section "Current situation" below, kept up to date for you.
When an [action_result] arrives, say a few words at most, once, and do not call another skill unless the user's request is still unfinished. Never walk somewhere you were not asked to go.`,_i=class{constructor(t,e){M(this,"ctx",t);M(this,"opts",e);M(this,"name","realtime");M(this,"ws",null);M(this,"call",null);M(this,"closed",!1);M(this,"responseActive",!1);M(this,"wantResponse",!1);M(this,"userSpeaking",!1);M(this,"reconnects",0);M(this,"handledCalls",new Set);M(this,"accepted",null);M(this,"running",Promise.resolve());M(this,"ranCalls",!1);M(this,"lastInstructions","");M(this,"viewSeq",0);M(this,"lastViewId","")}start(){return this.opts.connect?this.startCall():new Promise((t,e)=>{let n=this.opts.url??`wss://api.openai.com/v1/realtime?model=${encodeURIComponent(this.opts.model)}`,i=new kt(n,{headers:{Authorization:`Bearer ${this.opts.apiKey}`}});this.ws=i;let r=!1;i.on("open",()=>{r=!0,this.reconnects=0,this.responseActive=!1,this.sendSession(),this.ctx.log("info",`realtime connected (${this.opts.model})`),this.accepted=a=>{if(this.accepted=null,clearTimeout(s),!a)return t();this.closed=!0,i.close(),e(new Error(a))};let s=setTimeout(()=>this.accepted?.("the service did not confirm the session settings"),4e3)}),i.on("message",s=>{try{this.handle(JSON.parse(s.toString()))}catch(a){this.ctx.log("error",`realtime message handling failed: ${a}`)}}),i.on("error",s=>{this.ctx.log("error",`realtime socket error: ${s.message}`),r||e(s)}),i.on("close",(s,a)=>{if(this.closed||(this.ctx.log("warn",`realtime closed (${s} ${a}); reconnecting`),!r))return;let l=Math.min(8e3,500*2**this.reconnects++);setTimeout(()=>!this.closed&&this.start().catch(c=>this.ctx.log("error",`realtime reconnect failed: ${c?.message??c}`)),l)})})}async startCall(){let t=await this.opts.connect({onMessage:e=>{try{this.handle(JSON.parse(e))}catch(n){this.ctx.log("error",`realtime message handling failed: ${n}`)}},onClose:()=>{if(this.closed||this.call!==t)return;this.call=null,this.ctx.log("warn","live voice connection lost; reconnecting");let e=Math.min(8e3,500*2**this.reconnects++);setTimeout(()=>!this.closed&&this.startCall().catch(n=>this.ctx.log("error",`live voice reconnect failed: ${n?.message??n}`)),e)}});this.call=t,this.responseActive=!1,this.sendSession(),this.ctx.log("info",`live voice connected (${this.opts.model})`),await new Promise((e,n)=>{let i=setTimeout(()=>this.accepted?.("the service did not confirm the session settings"),4e3);this.accepted=r=>{if(this.accepted=null,clearTimeout(i),!r)return this.reconnects=0,e();this.closed=!0,t.close(),n(new Error(r))}})}up(t){this.call?this.call.send(JSON.stringify(t)):this.ws?.readyState===kt.OPEN&&this.ws.send(JSON.stringify(t))}sendSession(){this.up({type:"session.update",session:{type:"realtime",instructions:this.instructions(),output_modalities:["audio"],audio:{input:{...this.opts.connect?{}:{format:{type:"audio/pcm",rate:24e3}},transcription:{model:"gpt-4o-mini-transcribe"},turn_detection:{type:"server_vad",threshold:.6,silence_duration_ms:this.opts.silenceMs??350,prefix_padding_ms:200,create_response:!0,interrupt_response:!0}},output:{...this.opts.connect?{}:{format:{type:"audio/pcm",rate:24e3}},voice:this.opts.voice}},tools:fh,tool_choice:"auto"}})}instructions(){return`${Cn}
${dh}

# Current situation
${this.ctx.world.contextText()}

# Your long-term memory
${this.ctx.memory.summary()}`}refreshContext(){let t=this.instructions();t!==this.lastInstructions&&(this.lastInstructions=t,this.up({type:"session.update",session:{type:"realtime",instructions:t}}))}onAudio(t){this.opts.connect||this.up({type:"input_audio_buffer.append",audio:t})}onText(t){this.ctx.timer.begin("text",t),this.ctx.timer.countLlmCall(),this.up({type:"conversation.item.create",item:{type:"message",role:"user",content:[{type:"input_text",text:t}]}}),this.requestResponse()}interrupt(){this.responseActive&&this.up({type:"response.cancel"}),this.ctx.send({type:"audio_stop"})}onFeedback(t,e){this.up({type:"conversation.item.create",item:{type:"message",role:"user",content:[{type:"input_text",text:`[action_result] ${JSON.stringify(t)}`}]}}),e&&this.requestResponse()}onView(t){this.lastViewId&&this.up({type:"conversation.item.delete",item_id:this.lastViewId}),this.lastViewId=`view_${Date.now().toString(36)}_${++this.viewSeq}`,this.up({type:"conversation.item.create",item:{id:this.lastViewId,type:"message",role:"user",content:[{type:"input_text",text:"[view] This is what the user sees through the headset right now (you may be in the picture). Use it to answer questions about what is in front of them. It is not a request."},{type:"input_image",image_url:`data:image/jpeg;base64,${t}`}]}})}requestResponse(){if(this.responseActive||this.userSpeaking){this.wantResponse=!0;return}this.wantResponse=!1,this.responseActive=!0,this.up({type:"response.create"})}handle(t){if(this.accepted){if(t.type==="session.updated")this.accepted();else if(t.type==="error")return this.accepted(`settings rejected: ${t.error?.message??JSON.stringify(t)}`)}switch(t.type){case"response.created":this.responseActive=!0,this.ctx.timer.mark("llm_first_token"),this.ctx.send({type:"state",status:"thinking"});break;case"response.output_audio.delta":case"response.audio.delta":this.ctx.timer.mark("first_audio"),this.ctx.send({type:"audio",pcm16:t.delta});break;case"response.output_audio_transcript.done":case"response.audio_transcript.done":t.transcript&&this.ctx.send({type:"transcript",role:"assistant",text:t.transcript});break;case"conversation.item.input_audio_transcription.completed":t.transcript&&(this.ctx.timer.note({input:String(t.transcript).slice(0,80)}),this.ctx.send({type:"transcript",role:"user",text:t.transcript}));break;case"output_audio_buffer.started":this.ctx.timer.mark("first_audio"),this.ctx.send({type:"state",status:"speaking"});break;case"output_audio_buffer.stopped":case"output_audio_buffer.cleared":this.responseActive||this.ctx.send({type:"state",status:"idle"});break;case"input_audio_buffer.speech_started":this.userSpeaking=!0,this.refreshContext(),this.ctx.send({type:"audio_stop"}),this.ctx.send({type:"state",status:"listening"});break;case"input_audio_buffer.speech_stopped":this.userSpeaking=!1,this.ctx.timer.begin("voice","(speech)"),this.ctx.timer.countLlmCall();break;case"response.output_item.done":t.item?.type==="function_call"&&t.item.call_id&&!this.handledCalls.has(t.item.call_id)&&this.runCalls([t.item]);break;case"response.done":{this.responseActive=!1;let n=(t.response?.output??[]).filter(i=>i.type==="function_call"&&i.call_id&&!this.handledCalls.has(i.call_id));t.response?.status==="failed"&&this.ctx.log("error",`response failed: ${JSON.stringify(t.response?.status_details)}`),n.length&&this.runCalls(n),this.ranCalls?(this.ranCalls=!1,this.running.then(()=>this.requestResponse())):this.wantResponse?this.requestResponse():this.ctx.send({type:"state",status:"idle"});break}case"error":{let e=t.error?.message??JSON.stringify(t);if(/item.*(not found|does not exist)/i.test(e)||/no active response|cancellation failed/i.test(e))break;if(/active response/i.test(e)){this.wantResponse=!0;break}this.ctx.log("error",`realtime error: ${e}`);break}}}runCalls(t){this.ranCalls=!0;for(let e of t)this.handledCalls.add(e.call_id),this.running=this.running.then(async()=>{let n={};try{n=e.arguments?JSON.parse(e.arguments):{}}catch{}this.ctx.log("info",`skill ${e.name}(${JSON.stringify(n)})`);let i=await this.ctx.skills.execute(e.name,n).catch(r=>({status:"failed",reason:String(r?.message??r)}));this.ctx.log("info",`  -> ${JSON.stringify(i).slice(0,300)}`),this.up({type:"conversation.item.create",item:{type:"function_call_output",call_id:e.call_id,output:JSON.stringify(i)}})})}close(){this.closed=!0,this.call?.close(),this.ws?.close()}};function Sa(o,t,e,n){let i={port:0,brain:n,apiKey:o,realtimeModel:"gpt-realtime",realtimeVoice:"marin",visionModel:"gpt-4.1-mini",memoryPath:"memory.json"},r=!0,s=new xi({send:a=>{Promise.resolve().then(()=>r&&t(a))},open:()=>r},i,new ui("memory.json"),(a,l,c,h)=>h==="realtime"?new _i(l,{apiKey:o,model:a.realtimeModel,voice:a.realtimeVoice,connect:ba(o,a.realtimeModel,e)}):new gi(l,{apiKey:o,model:"gpt-5.4-mini",effort:"none",ears:new Ye({apiKey:o,model:a.realtimeModel,transcribeModel:"gpt-4o-mini-transcribe",mode:"http"},c),mouth:new pi({apiKey:o,model:"gpt-4o-mini-tts",voice:"alloy"},c),worldEventMinGapMs:8e3,audioModel:"gpt-audio-mini",voice:"alloy"}));return{send:a=>r&&s.receive(a),close:()=>{r=!1,s.dispose()}}}L();var Is=0,ph=1,Cl=2;var Ea=1;var Ta=100;var Aa=204,Ca=205;var Ra=0,Ia=1,Pa=2,Xi=3,La=4,Da=5,Ua=6,Fa=7,lo=0;var Na="attached",mh="detached",Rl=300;var Il=303;var kn=1e3,De=1001,Oa=1002,Ba=1003;var gh=1006;var yh=1008;var vh=1009;var Pl=1015;var Ll=1023;var qi=2300,Ps=2301,es=2302,ka=2400,za=2401,Va=2402,xh=2500;var co=0;var Dl="",G="srgb",Ul="srgb-linear",Fl="linear",Ls="srgb";var je=7680;var Ha=519;var Ga=35044;var Ue=2e3,Ds=2001,fn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,t);t.target=null}}},ot=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wa=1234567,Fn=Math.PI/180,zn=180/Math.PI;function Me(){let o=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ot[o&255]+ot[o>>8&255]+ot[o>>16&255]+ot[o>>24&255]+"-"+ot[t&255]+ot[t>>8&255]+"-"+ot[t>>16&15|64]+ot[t>>24&255]+"-"+ot[e&63|128]+ot[e>>8&255]+"-"+ot[e>>16&255]+ot[e>>24&255]+ot[n&255]+ot[n>>8&255]+ot[n>>16&255]+ot[n>>24&255]).toLowerCase()}function it(o,t,e){return Math.max(t,Math.min(e,o))}function ho(o,t){return(o%t+t)%t}function _h(o,t,e,n,i){return n+(o-t)*(i-n)/(e-t)}function Mh(o,t,e){return o!==t?(e-o)/(t-o):0}function Nn(o,t,e){return(1-e)*o+e*t}function wh(o,t,e,n){return Nn(o,t,1-Math.exp(-e*n))}function bh(o,t=1){return t-Math.abs(ho(o,t*2)-t)}function Sh(o,t,e){return o<=t?0:o>=e?1:(o=(o-t)/(e-t),o*o*(3-2*o))}function Eh(o,t,e){return o<=t?0:o>=e?1:(o=(o-t)/(e-t),o*o*o*(o*(o*6-15)+10))}function Th(o,t){return o+Math.floor(Math.random()*(t-o+1))}function Ah(o,t){return o+Math.random()*(t-o)}function Ch(o){return o*(.5-Math.random())}function Rh(o){o!==void 0&&(Wa=o);let t=Wa+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ih(o){return o*Fn}function Ph(o){return o*zn}function Lh(o){return(o&o-1)===0&&o!==0}function Dh(o){return Math.pow(2,Math.ceil(Math.log(o)/Math.LN2))}function Uh(o){return Math.pow(2,Math.floor(Math.log(o)/Math.LN2))}function Fh(o,t,e,n,i){let r=Math.cos,s=Math.sin,a=r(e/2),l=s(e/2),c=r((t+n)/2),h=s((t+n)/2),u=r((t-n)/2),f=s((t-n)/2),d=r((n-t)/2),p=s((n-t)/2);switch(i){case"XYX":o.set(a*h,l*u,l*f,a*c);break;case"YZY":o.set(l*f,a*h,l*u,a*c);break;case"ZXZ":o.set(l*u,l*f,a*h,a*c);break;case"XZX":o.set(a*h,l*p,l*d,a*c);break;case"YXY":o.set(l*d,a*h,l*p,a*c);break;case"ZYZ":o.set(l*p,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function cn(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function ht(o,t){switch(t.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}var ct={DEG2RAD:Fn,RAD2DEG:zn,generateUUID:Me,clamp:it,euclideanModulo:ho,mapLinear:_h,inverseLerp:Mh,lerp:Nn,damp:wh,pingpong:bh,smoothstep:Sh,smootherstep:Eh,randInt:Th,randFloat:Ah,randFloatSpread:Ch,seededRandom:Rh,degToRad:Ih,radToDeg:Ph,isPowerOfTwo:Lh,ceilPowerOfTwo:Dh,floorPowerOfTwo:Uh,setQuaternionFromProperEuler:Fh,normalize:ht,denormalize:cn},P=class o{constructor(t=0,e=0){o.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(it(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,s=this.y-t.y;return this.x=r*n-s*i+t.x,this.y=r*i+s*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},F=class o{constructor(t,e,n,i,r,s,a,l,c){o.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,s,a,l,c)}set(t,e,n,i,r,s,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,s=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],m=i[0],g=i[3],v=i[6],w=i[1],x=i[4],_=i[7],E=i[2],S=i[5],T=i[8];return r[0]=s*m+a*w+l*E,r[3]=s*g+a*x+l*S,r[6]=s*v+a*_+l*T,r[1]=c*m+h*w+u*E,r[4]=c*g+h*x+u*S,r[7]=c*v+h*_+u*T,r[2]=f*m+d*w+p*E,r[5]=f*g+d*x+p*S,r[8]=f*v+d*_+p*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*s*h-e*a*c-n*r*h+n*a*l+i*r*c-i*s*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*s-a*c,f=a*l-h*r,d=c*r-s*l,p=e*u+n*f+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return t[0]=u*m,t[1]=(i*c-h*n)*m,t[2]=(a*n-i*s)*m,t[3]=f*m,t[4]=(h*e-i*l)*m,t[5]=(i*r-a*e)*m,t[6]=d*m,t[7]=(n*l-c*e)*m,t[8]=(s*e-n*r)*m,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,s,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*s+c*a)+s+t,-i*c,i*l,-i*(-c*s+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ns.makeScale(t,e)),this}rotate(t){return this.premultiply(ns.makeRotation(-t)),this}translate(t,e){return this.premultiply(ns.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ns=new F;function Nh(o){for(let t=o.length-1;t>=0;--t)if(o[t]>=65535)return!0;return!1}function Us(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}var Y={enabled:!0,workingColorSpace:Ul,spaces:{},convert:function(o,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Ls&&(o.r=ee(o.r),o.g=ee(o.g),o.b=ee(o.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(o.applyMatrix3(this.spaces[t].toXYZ),o.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Ls&&(o.r=un(o.r),o.g=un(o.g),o.b=un(o.b))),o},fromWorkingColorSpace:function(o,t){return this.convert(o,this.workingColorSpace,t)},toWorkingColorSpace:function(o,t){return this.convert(o,t,this.workingColorSpace)},getPrimaries:function(o){return this.spaces[o].primaries},getTransfer:function(o){return o===Dl?Fl:this.spaces[o].transfer},getLuminanceCoefficients:function(o,t=this.workingColorSpace){return o.fromArray(this.spaces[t].luminanceCoefficients)},define:function(o){Object.assign(this.spaces,o)},_getMatrix:function(o,t,e){return o.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(o){return this.spaces[o].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(o=this.workingColorSpace){return this.spaces[o].workingColorSpaceConfig.unpackColorSpace}};function ee(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function un(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}var Xa=[.64,.33,.3,.6,.15,.06],qa=[.2126,.7152,.0722],$a=[.3127,.329],Ya=new F().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Za=new F().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Y.define({[Ul]:{primaries:Xa,whitePoint:$a,transfer:Fl,toXYZ:Ya,fromXYZ:Za,luminanceCoefficients:qa,workingColorSpaceConfig:{unpackColorSpace:G},outputColorSpaceConfig:{drawingBufferColorSpace:G}},[G]:{primaries:Xa,whitePoint:$a,transfer:Ls,toXYZ:Ya,fromXYZ:Za,luminanceCoefficients:qa,outputColorSpaceConfig:{drawingBufferColorSpace:G}}});var Je,Fs=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Je===void 0&&(Je=Us("canvas")),Je.width=t.width,Je.height=t.height;let n=Je.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Je}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Us("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=ee(r[s]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ee(e[n]/255)*255):e[n]=ee(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Oh=0,Ns=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Oh++}),this.uuid=Me(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?r.push(is(i[s].image)):r.push(is(i[s]))}else r=is(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function is(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Fs.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Bh=0,zt=class o extends fn{constructor(t=o.DEFAULT_IMAGE,e=o.DEFAULT_MAPPING,n=De,i=De,r=gh,s=yh,a=Ll,l=vh,c=o.DEFAULT_ANISOTROPY,h=Dl){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=Me(),this.name="",this.source=new Ns(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new P(0,0),this.repeat=new P(1,1),this.center=new P(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new F,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case kn:t.x=t.x-Math.floor(t.x);break;case De:t.x=t.x<0?0:1;break;case Oa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case kn:t.y=t.y-Math.floor(t.y);break;case De:t.y=t.y<0?0:1;break;case Oa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=Rl;zt.DEFAULT_ANISOTROPY=1;var q=class o{constructor(t=0,e=0,n=0,i=1){o.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i+s[12]*r,this.y=s[1]*e+s[5]*n+s[9]*i+s[13]*r,this.z=s[2]*e+s[6]*n+s[10]*i+s[14]*r,this.w=s[3]*e+s[7]*n+s[11]*i+s[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],p=l[9],m=l[2],g=l[6],v=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-m)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+m)<.1&&Math.abs(p+g)<.1&&Math.abs(c+d+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,_=(d+1)/2,E=(v+1)/2,S=(h+f)/4,T=(u+m)/4,A=(p+g)/4;return x>_&&x>E?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=S/n,r=T/n):_>E?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=S/i,r=A/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=T/r,i=A/r),this.set(n,i,r,e),this}let w=Math.sqrt((g-p)*(g-p)+(u-m)*(u-m)+(f-h)*(f-h));return Math.abs(w)<.001&&(w=1),this.x=(g-p)/w,this.y=(u-m)/w,this.z=(f-h)/w,this.w=Math.acos((c+d+v-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var Z=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,s,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],f=r[s+0],d=r[s+1],p=r[s+2],m=r[s+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=p,t[e+3]=m;return}if(u!==m||l!==f||c!==d||h!==p){let g=1-a,v=l*f+c*d+h*p+u*m,w=v>=0?1:-1,x=1-v*v;if(x>Number.EPSILON){let E=Math.sqrt(x),S=Math.atan2(E,v*w);g=Math.sin(g*S)/E,a=Math.sin(a*S)/E}let _=a*w;if(l=l*g+f*_,c=c*g+d*_,h=h*g+p*_,u=u*g+m*_,g===1-a){let E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,s){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[s],f=r[s+1],d=r[s+2],p=r[s+3];return t[e]=a*p+h*u+l*d-c*f,t[e+1]=l*p+h*f+c*u-a*d,t[e+2]=c*p+h*d+a*f-l*u,t[e+3]=h*p-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,s=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),f=l(n/2),d=l(i/2),p=l(r/2);switch(s){case"XYZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u+f*d*p;break;case"YZX":this._x=f*h*u+c*d*p,this._y=c*d*u+f*h*p,this._z=c*h*p-f*d*u,this._w=c*h*u-f*d*p;break;case"XZY":this._x=f*h*u-c*d*p,this._y=c*d*u-f*h*p,this._z=c*h*p+f*d*u,this._w=c*h*u+f*d*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(s-i)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+s)/d,this._z=(r+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(i+s)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(s-i)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(it(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,s=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+s*a+i*c-r*l,this._y=i*h+s*l+r*a-n*c,this._z=r*h+s*c+n*l-i*a,this._w=s*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,r=this._z,s=this._w,a=s*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=s,this._x=n,this._y=i,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let d=1-e;return this._w=d*s+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=s*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},y=class o{constructor(t=0,e=0,n=0){o.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ja.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ja.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,s=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*s,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*s,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*s,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,s=t.y,a=t.z,l=t.w,c=2*(s*i-a*n),h=2*(a*e-r*i),u=2*(r*n-s*e);return this.x=e+l*c+s*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,s=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*s-n*l,this.z=n*a-i*s,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return rs.copy(this).projectOnVector(t),this.sub(rs)}reflect(t){return this.sub(rs.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(it(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},rs=new y,ja=new Z,Vt=class{constructor(t=new y(1/0,1/0,1/0),e=new y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(It.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(It.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=It.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++)t.isMesh===!0?t.getVertexPosition(s,It):It.fromBufferAttribute(r,s),It.applyMatrix4(t.matrixWorld),this.expandByPoint(It);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mi.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mi.copy(n.boundingBox)),Mi.applyMatrix4(t.matrixWorld),this.union(Mi)}let i=t.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,It),It.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Rn),wi.subVectors(this.max,Rn),Ke.subVectors(t.a,Rn),Qe.subVectors(t.b,Rn),tn.subVectors(t.c,Rn),oe.subVectors(Qe,Ke),ae.subVectors(tn,Qe),Ae.subVectors(Ke,tn);let e=[0,-oe.z,oe.y,0,-ae.z,ae.y,0,-Ae.z,Ae.y,oe.z,0,-oe.x,ae.z,0,-ae.x,Ae.z,0,-Ae.x,-oe.y,oe.x,0,-ae.y,ae.x,0,-Ae.y,Ae.x,0];return!ss(e,Ke,Qe,tn,wi)||(e=[1,0,0,0,1,0,0,0,1],!ss(e,Ke,Qe,tn,wi))?!1:(bi.crossVectors(oe,ae),e=[bi.x,bi.y,bi.z],ss(e,Ke,Qe,tn,wi))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,It).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(It).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zt),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Zt=[new y,new y,new y,new y,new y,new y,new y,new y],It=new y,Mi=new Vt,Ke=new y,Qe=new y,tn=new y,oe=new y,ae=new y,Ae=new y,Rn=new y,wi=new y,bi=new y,Ce=new y;function ss(o,t,e,n,i){for(let r=0,s=o.length-3;r<=s;r+=3){Ce.fromArray(o,r);let a=i.x*Math.abs(Ce.x)+i.y*Math.abs(Ce.y)+i.z*Math.abs(Ce.z),l=t.dot(Ce),c=e.dot(Ce),h=n.dot(Ce);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var kh=new Vt,In=new y,os=new y,pe=class{constructor(t=new y,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):kh.setFromPoints(t).getCenter(n);let i=0;for(let r=0,s=t.length;r<s;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;In.subVectors(t,this.center);let e=In.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(In,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(os.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(In.copy(t.center).add(os)),this.expandByPoint(In.copy(t.center).sub(os))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},jt=new y,as=new y,Si=new y,le=new y,ls=new y,Ei=new y,cs=new y,Vn=class{constructor(t=new y,e=new y(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,jt)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=jt.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(jt.copy(this.origin).addScaledVector(this.direction,e),jt.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){as.copy(t).add(e).multiplyScalar(.5),Si.copy(e).sub(t).normalize(),le.copy(this.origin).sub(as);let r=t.distanceTo(e)*.5,s=-this.direction.dot(Si),a=le.dot(this.direction),l=-le.dot(Si),c=le.lengthSq(),h=Math.abs(1-s*s),u,f,d,p;if(h>0)if(u=s*l-a,f=s*a-l,p=r*h,u>=0)if(f>=-p)if(f<=p){let m=1/h;u*=m,f*=m,d=u*(u+s*f+2*a)+f*(s*u+f+2*l)+c}else f=r,u=Math.max(0,-(s*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(s*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-p?(u=Math.max(0,-(-s*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=p?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(s*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=s>0?-r:r,u=Math.max(0,-(s*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(as).addScaledVector(Si,f),d}intersectSphere(t,e){jt.subVectors(t.center,this.origin);let n=jt.dot(this.direction),i=jt.dot(jt)-n*n,r=t.radius*t.radius;if(i>r)return null;let s=Math.sqrt(r-i),a=n-s,l=n+s;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,s,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,s=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,s=(t.min.y-f.y)*h),n>s||r>i||((r>n||isNaN(n))&&(n=r),(s<i||isNaN(i))&&(i=s),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,jt)!==null}intersectTriangle(t,e,n,i,r){ls.subVectors(e,t),Ei.subVectors(n,t),cs.crossVectors(ls,Ei);let s=this.direction.dot(cs),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;le.subVectors(this.origin,t);let l=a*this.direction.dot(Ei.crossVectors(le,Ei));if(l<0)return null;let c=a*this.direction.dot(ls.cross(le));if(c<0||l+c>s)return null;let h=-a*le.dot(cs);return h<0?null:this.at(h/s,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},D=class o{constructor(t,e,n,i,r,s,a,l,c,h,u,f,d,p,m,g){o.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,s,a,l,c,h,u,f,d,p,m,g)}set(t,e,n,i,r,s,a,l,c,h,u,f,d,p,m,g){let v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=i,v[1]=r,v[5]=s,v[9]=a,v[13]=l,v[2]=c,v[6]=h,v[10]=u,v[14]=f,v[3]=d,v[7]=p,v[11]=m,v[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new o().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/en.setFromMatrixColumn(t,0).length(),r=1/en.setFromMatrixColumn(t,1).length(),s=1/en.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*s,e[9]=n[9]*s,e[10]=n[10]*s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,s=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=s*h,d=s*u,p=a*h,m=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+p*c,e[5]=f-m*c,e[9]=-a*l,e[2]=m-f*c,e[6]=p+d*c,e[10]=s*l}else if(t.order==="YXZ"){let f=l*h,d=l*u,p=c*h,m=c*u;e[0]=f+m*a,e[4]=p*a-d,e[8]=s*c,e[1]=s*u,e[5]=s*h,e[9]=-a,e[2]=d*a-p,e[6]=m+f*a,e[10]=s*l}else if(t.order==="ZXY"){let f=l*h,d=l*u,p=c*h,m=c*u;e[0]=f-m*a,e[4]=-s*u,e[8]=p+d*a,e[1]=d+p*a,e[5]=s*h,e[9]=m-f*a,e[2]=-s*c,e[6]=a,e[10]=s*l}else if(t.order==="ZYX"){let f=s*h,d=s*u,p=a*h,m=a*u;e[0]=l*h,e[4]=p*c-d,e[8]=f*c+m,e[1]=l*u,e[5]=m*c+f,e[9]=d*c-p,e[2]=-c,e[6]=a*l,e[10]=s*l}else if(t.order==="YZX"){let f=s*l,d=s*c,p=a*l,m=a*c;e[0]=l*h,e[4]=m-f*u,e[8]=p*u+d,e[1]=u,e[5]=s*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+p,e[10]=f-m*u}else if(t.order==="XZY"){let f=s*l,d=s*c,p=a*l,m=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+m,e[5]=s*h,e[9]=d*u-p,e[2]=p*u-d,e[6]=a*h,e[10]=m*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zh,t,Vh)}lookAt(t,e,n){let i=this.elements;return _t.subVectors(t,e),_t.lengthSq()===0&&(_t.z=1),_t.normalize(),ce.crossVectors(n,_t),ce.lengthSq()===0&&(Math.abs(n.z)===1?_t.x+=1e-4:_t.z+=1e-4,_t.normalize(),ce.crossVectors(n,_t)),ce.normalize(),Ti.crossVectors(_t,ce),i[0]=ce.x,i[4]=Ti.x,i[8]=_t.x,i[1]=ce.y,i[5]=Ti.y,i[9]=_t.y,i[2]=ce.z,i[6]=Ti.z,i[10]=_t.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,s=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],m=n[6],g=n[10],v=n[14],w=n[3],x=n[7],_=n[11],E=n[15],S=i[0],T=i[4],A=i[8],I=i[12],z=i[1],U=i[5],K=i[9],W=i[13],vt=i[2],Nt=i[6],Rt=i[10],qt=i[14],we=i[3],xt=i[7],ze=i[11],Ve=i[15];return r[0]=s*S+a*z+l*vt+c*we,r[4]=s*T+a*U+l*Nt+c*xt,r[8]=s*A+a*K+l*Rt+c*ze,r[12]=s*I+a*W+l*qt+c*Ve,r[1]=h*S+u*z+f*vt+d*we,r[5]=h*T+u*U+f*Nt+d*xt,r[9]=h*A+u*K+f*Rt+d*ze,r[13]=h*I+u*W+f*qt+d*Ve,r[2]=p*S+m*z+g*vt+v*we,r[6]=p*T+m*U+g*Nt+v*xt,r[10]=p*A+m*K+g*Rt+v*ze,r[14]=p*I+m*W+g*qt+v*Ve,r[3]=w*S+x*z+_*vt+E*we,r[7]=w*T+x*U+_*Nt+E*xt,r[11]=w*A+x*K+_*Rt+E*ze,r[15]=w*I+x*W+_*qt+E*Ve,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],s=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],p=t[3],m=t[7],g=t[11],v=t[15];return p*(+r*l*u-i*c*u-r*a*f+n*c*f+i*a*d-n*l*d)+m*(+e*l*d-e*c*f+r*s*f-i*s*d+i*c*h-r*l*h)+g*(+e*c*u-e*a*d-r*s*u+n*s*d+r*a*h-n*c*h)+v*(-i*a*h-e*l*u+e*a*f+i*s*u-n*s*f+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],p=t[12],m=t[13],g=t[14],v=t[15],w=u*g*c-m*f*c+m*l*d-a*g*d-u*l*v+a*f*v,x=p*f*c-h*g*c-p*l*d+s*g*d+h*l*v-s*f*v,_=h*m*c-p*u*c+p*a*d-s*m*d-h*a*v+s*u*v,E=p*u*l-h*m*l-p*a*f+s*m*f+h*a*g-s*u*g,S=e*w+n*x+i*_+r*E;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/S;return t[0]=w*T,t[1]=(m*f*r-u*g*r-m*i*d+n*g*d+u*i*v-n*f*v)*T,t[2]=(a*g*r-m*l*r+m*i*c-n*g*c-a*i*v+n*l*v)*T,t[3]=(u*l*r-a*f*r-u*i*c+n*f*c+a*i*d-n*l*d)*T,t[4]=x*T,t[5]=(h*g*r-p*f*r+p*i*d-e*g*d-h*i*v+e*f*v)*T,t[6]=(p*l*r-s*g*r-p*i*c+e*g*c+s*i*v-e*l*v)*T,t[7]=(s*f*r-h*l*r+h*i*c-e*f*c-s*i*d+e*l*d)*T,t[8]=_*T,t[9]=(p*u*r-h*m*r-p*n*d+e*m*d+h*n*v-e*u*v)*T,t[10]=(s*m*r-p*a*r+p*n*c-e*m*c-s*n*v+e*a*v)*T,t[11]=(h*a*r-s*u*r-h*n*c+e*u*c+s*n*d-e*a*d)*T,t[12]=E*T,t[13]=(h*m*i-p*u*i+p*n*f-e*m*f-h*n*g+e*u*g)*T,t[14]=(p*a*i-s*m*i-p*n*l+e*m*l+s*n*g-e*a*g)*T,t[15]=(s*u*i-h*a*i+h*n*l-e*u*l-s*n*f+e*a*f)*T,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,s=t.x,a=t.y,l=t.z,c=r*s,h=r*a;return this.set(c*s+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*s,0,c*l-i*a,h*l+i*s,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,s){return this.set(1,n,r,0,t,1,s,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,s=e._y,a=e._z,l=e._w,c=r+r,h=s+s,u=a+a,f=r*c,d=r*h,p=r*u,m=s*h,g=s*u,v=a*u,w=l*c,x=l*h,_=l*u,E=n.x,S=n.y,T=n.z;return i[0]=(1-(m+v))*E,i[1]=(d+_)*E,i[2]=(p-x)*E,i[3]=0,i[4]=(d-_)*S,i[5]=(1-(f+v))*S,i[6]=(g+w)*S,i[7]=0,i[8]=(p+x)*T,i[9]=(g-w)*T,i[10]=(1-(f+m))*T,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,r=en.set(i[0],i[1],i[2]).length(),s=en.set(i[4],i[5],i[6]).length(),a=en.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Pt.copy(this);let c=1/r,h=1/s,u=1/a;return Pt.elements[0]*=c,Pt.elements[1]*=c,Pt.elements[2]*=c,Pt.elements[4]*=h,Pt.elements[5]*=h,Pt.elements[6]*=h,Pt.elements[8]*=u,Pt.elements[9]*=u,Pt.elements[10]*=u,e.setFromRotationMatrix(Pt),n.x=r,n.y=s,n.z=a,this}makePerspective(t,e,n,i,r,s,a=Ue){let l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),d,p;if(a===Ue)d=-(s+r)/(s-r),p=-2*s*r/(s-r);else if(a===Ds)d=-s/(s-r),p=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,s,a=Ue){let l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(s-r),f=(e+t)*c,d=(n+i)*h,p,m;if(a===Ue)p=(s+r)*u,m=-2*u;else if(a===Ds)p=r*u,m=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=m,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},en=new y,Pt=new D,zh=new y(0,0,0),Vh=new y(1,1,1),ce=new y,Ti=new y,_t=new y,Ja=new D,Ka=new Z,lt=class o{constructor(t=0,e=0,n=0,i=o.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],s=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(it(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-it(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-it(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ja.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ja,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ka.setFromEuler(this),this.setFromQuaternion(Ka,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};lt.DEFAULT_ORDER="XYZ";var Os=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Hh=0,Qa=new y,nn=new Z,Jt=new D,Ai=new y,Pn=new y,Gh=new y,Wh=new Z,tl=new y(1,0,0),el=new y(0,1,0),nl=new y(0,0,1),il={type:"added"},Xh={type:"removed"},rn={type:"childadded",child:null},hs={type:"childremoved",child:null},j=class o extends fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=Me(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=o.DEFAULT_UP.clone();let t=new y,e=new lt,n=new Z,i=new y(1,1,1);function r(){n.setFromEuler(e,!1)}function s(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new D},normalMatrix:{value:new F}}),this.matrix=new D,this.matrixWorld=new D,this.matrixAutoUpdate=o.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=o.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Os,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return nn.setFromAxisAngle(t,e),this.quaternion.multiply(nn),this}rotateOnWorldAxis(t,e){return nn.setFromAxisAngle(t,e),this.quaternion.premultiply(nn),this}rotateX(t){return this.rotateOnAxis(tl,t)}rotateY(t){return this.rotateOnAxis(el,t)}rotateZ(t){return this.rotateOnAxis(nl,t)}translateOnAxis(t,e){return Qa.copy(t).applyQuaternion(this.quaternion),this.position.add(Qa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(tl,t)}translateY(t){return this.translateOnAxis(el,t)}translateZ(t){return this.translateOnAxis(nl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Jt.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ai.copy(t):Ai.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Pn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jt.lookAt(Pn,Ai,this.up):Jt.lookAt(Ai,Pn,this.up),this.quaternion.setFromRotationMatrix(Jt),i&&(Jt.extractRotation(i.matrixWorld),nn.setFromRotationMatrix(Jt),this.quaternion.premultiply(nn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(il),rn.child=t,this.dispatchEvent(rn),rn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xh),hs.child=t,this.dispatchEvent(hs),hs.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Jt.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Jt.multiply(t.parent.matrixWorld)),t.applyMatrix4(Jt),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(il),rn.child=t,this.dispatchEvent(rn),rn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(t,e);if(s!==void 0)return s}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pn,t,Gh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pn,Wh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=s(t.geometries),l=s(t.materials),c=s(t.textures),h=s(t.images),u=s(t.shapes),f=s(t.skeletons),d=s(t.animations),p=s(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function s(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};j.DEFAULT_UP=new y(0,1,0);j.DEFAULT_MATRIX_AUTO_UPDATE=!0;j.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Lt=new y,Kt=new y,us=new y,Qt=new y,sn=new y,on=new y,rl=new y,fs=new y,ds=new y,ps=new y,ms=new q,gs=new q,ys=new q,Le=class o{constructor(t=new y,e=new y,n=new y){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Lt.subVectors(t,e),i.cross(Lt);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Lt.subVectors(i,e),Kt.subVectors(n,e),us.subVectors(t,e);let s=Lt.dot(Lt),a=Lt.dot(Kt),l=Lt.dot(us),c=Kt.dot(Kt),h=Kt.dot(us),u=s*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-a*h)*f,p=(s*h-a*l)*f;return r.set(1-d-p,p,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Qt)===null?!1:Qt.x>=0&&Qt.y>=0&&Qt.x+Qt.y<=1}static getInterpolation(t,e,n,i,r,s,a,l){return this.getBarycoord(t,e,n,i,Qt)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Qt.x),l.addScaledVector(s,Qt.y),l.addScaledVector(a,Qt.z),l)}static getInterpolatedAttribute(t,e,n,i,r,s){return ms.setScalar(0),gs.setScalar(0),ys.setScalar(0),ms.fromBufferAttribute(t,e),gs.fromBufferAttribute(t,n),ys.fromBufferAttribute(t,i),s.setScalar(0),s.addScaledVector(ms,r.x),s.addScaledVector(gs,r.y),s.addScaledVector(ys,r.z),s}static isFrontFacing(t,e,n,i){return Lt.subVectors(n,e),Kt.subVectors(t,e),Lt.cross(Kt).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Lt.subVectors(this.c,this.b),Kt.subVectors(this.a,this.b),Lt.cross(Kt).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return o.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return o.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return o.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return o.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return o.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,s,a;sn.subVectors(i,n),on.subVectors(r,n),fs.subVectors(t,n);let l=sn.dot(fs),c=on.dot(fs);if(l<=0&&c<=0)return e.copy(n);ds.subVectors(t,i);let h=sn.dot(ds),u=on.dot(ds);if(h>=0&&u<=h)return e.copy(i);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return s=l/(l-h),e.copy(n).addScaledVector(sn,s);ps.subVectors(t,r);let d=sn.dot(ps),p=on.dot(ps);if(p>=0&&d<=p)return e.copy(r);let m=d*c-l*p;if(m<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(on,a);let g=h*p-d*u;if(g<=0&&u-h>=0&&d-p>=0)return rl.subVectors(r,i),a=(u-h)/(u-h+(d-p)),e.copy(i).addScaledVector(rl,a);let v=1/(g+m+f);return s=m*v,a=f*v,e.copy(n).addScaledVector(sn,s).addScaledVector(on,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Nl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},he={h:0,s:0,l:0},Ci={h:0,s:0,l:0};function vs(o,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?o+(t-o)*6*e:e<1/2?t:e<2/3?o+(t-o)*6*(2/3-e):o}var B=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=G){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Y.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Y.workingColorSpace){return this.r=t,this.g=e,this.b=n,Y.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Y.workingColorSpace){if(t=ho(t,1),e=it(e,0,1),n=it(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,s=2*n-r;this.r=vs(s,r,t+1/3),this.g=vs(s,r,t),this.b=vs(s,r,t-1/3)}return Y.toWorkingColorSpace(this,i),this}setStyle(t,e=G){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(s===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=G){let n=Nl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ee(t.r),this.g=ee(t.g),this.b=ee(t.b),this}copyLinearToSRGB(t){return this.r=un(t.r),this.g=un(t.g),this.b=un(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=G){return Y.fromWorkingColorSpace(at.copy(this),t),Math.round(it(at.r*255,0,255))*65536+Math.round(it(at.g*255,0,255))*256+Math.round(it(at.b*255,0,255))}getHexString(t=G){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Y.workingColorSpace){Y.fromWorkingColorSpace(at.copy(this),e);let n=at.r,i=at.g,r=at.b,s=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+s)/2;if(a===s)l=0,c=0;else{let u=s-a;switch(c=h<=.5?u/(s+a):u/(2-s-a),s){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Y.workingColorSpace){return Y.fromWorkingColorSpace(at.copy(this),e),t.r=at.r,t.g=at.g,t.b=at.b,t}getStyle(t=G){Y.fromWorkingColorSpace(at.copy(this),t);let e=at.r,n=at.g,i=at.b;return t!==G?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(he),this.setHSL(he.h+t,he.s+e,he.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(he),t.getHSL(Ci);let n=Nn(he.h,Ci.h,e),i=Nn(he.s,Ci.s,e),r=Nn(he.l,Ci.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},at=new B;B.NAMES=Nl;var qh=0,Fe=class extends fn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=Me(),this.name="",this.blending=Ea,this.side=Is,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Aa,this.blendDst=Ca,this.blendEquation=Ta,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new B(0,0,0),this.blendAlpha=0,this.depthFunc=Xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ha,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=je,this.stencilZFail=je,this.stencilZPass=je,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ea&&(n.blending=this.blending),this.side!==Is&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Aa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ca&&(n.blendDst=this.blendDst),this.blendEquation!==Ta&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ha&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==je&&(n.stencilFail=this.stencilFail),this.stencilZFail!==je&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==je&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let s=[];for(let a in r){let l=r[a];delete l.metadata,s.push(l)}return s}if(e){let r=i(t.textures),s=i(t.images);r.length>0&&(n.textures=r),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Hn=class extends Fe{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new B(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new lt,this.combine=lo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Q=new y,Ri=new P,de=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ga,this.updateRanges=[],this.gpuType=Pl,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ri.fromBufferAttribute(this,e),Ri.applyMatrix3(t),this.setXY(e,Ri.x,Ri.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Q.fromBufferAttribute(this,e),Q.applyMatrix3(t),this.setXYZ(e,Q.x,Q.y,Q.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Q.fromBufferAttribute(this,e),Q.applyMatrix4(t),this.setXYZ(e,Q.x,Q.y,Q.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Q.fromBufferAttribute(this,e),Q.applyNormalMatrix(t),this.setXYZ(e,Q.x,Q.y,Q.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Q.fromBufferAttribute(this,e),Q.transformDirection(t),this.setXYZ(e,Q.x,Q.y,Q.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ht(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=cn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ht(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=cn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ht(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=cn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ht(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=cn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ht(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ht(e,this.array),n=ht(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ht(e,this.array),n=ht(n,this.array),i=ht(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ht(e,this.array),n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ga&&(t.usage=this.usage),t}};var Gn=class extends de{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Bs=class extends de{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var tt=class extends de{constructor(t,e,n){super(new Float32Array(t),e,n)}},$h=0,Et=new D,xs=new j,an=new y,Mt=new Vt,Ln=new Vt,nt=new y,Dt=class o extends fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=Me(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Nh(t)?Bs:Gn)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new F().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Et.makeRotationFromQuaternion(t),this.applyMatrix4(Et),this}rotateX(t){return Et.makeRotationX(t),this.applyMatrix4(Et),this}rotateY(t){return Et.makeRotationY(t),this.applyMatrix4(Et),this}rotateZ(t){return Et.makeRotationZ(t),this.applyMatrix4(Et),this}translate(t,e,n){return Et.makeTranslation(t,e,n),this.applyMatrix4(Et),this}scale(t,e,n){return Et.makeScale(t,e,n),this.applyMatrix4(Et),this}lookAt(t){return xs.lookAt(t),xs.updateMatrix(),this.applyMatrix4(xs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(an).negate(),this.translate(an.x,an.y,an.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let s=t[i];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new tt(n,3))}else{for(let n=0,i=e.count;n<i;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new y(-1/0,-1/0,-1/0),new y(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];Mt.setFromBufferAttribute(r),this.morphTargetsRelative?(nt.addVectors(this.boundingBox.min,Mt.min),this.boundingBox.expandByPoint(nt),nt.addVectors(this.boundingBox.max,Mt.max),this.boundingBox.expandByPoint(nt)):(this.boundingBox.expandByPoint(Mt.min),this.boundingBox.expandByPoint(Mt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pe);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new y,1/0);return}if(t){let n=this.boundingSphere.center;if(Mt.setFromBufferAttribute(t),e)for(let r=0,s=e.length;r<s;r++){let a=e[r];Ln.setFromBufferAttribute(a),this.morphTargetsRelative?(nt.addVectors(Mt.min,Ln.min),Mt.expandByPoint(nt),nt.addVectors(Mt.max,Ln.max),Mt.expandByPoint(nt)):(Mt.expandByPoint(Ln.min),Mt.expandByPoint(Ln.max))}Mt.getCenter(n);let i=0;for(let r=0,s=t.count;r<s;r++)nt.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(nt));if(e)for(let r=0,s=e.length;r<s;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)nt.fromBufferAttribute(a,c),l&&(an.fromBufferAttribute(t,c),nt.add(an)),i=Math.max(i,n.distanceToSquared(nt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new de(new Float32Array(4*n.count),4));let s=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new y,l[A]=new y;let c=new y,h=new y,u=new y,f=new P,d=new P,p=new P,m=new y,g=new y;function v(A,I,z){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,I),u.fromBufferAttribute(n,z),f.fromBufferAttribute(r,A),d.fromBufferAttribute(r,I),p.fromBufferAttribute(r,z),h.sub(c),u.sub(c),d.sub(f),p.sub(f);let U=1/(d.x*p.y-p.x*d.y);isFinite(U)&&(m.copy(h).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(U),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(U),a[A].add(m),a[I].add(m),a[z].add(m),l[A].add(g),l[I].add(g),l[z].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let A=0,I=w.length;A<I;++A){let z=w[A],U=z.start,K=z.count;for(let W=U,vt=U+K;W<vt;W+=3)v(t.getX(W+0),t.getX(W+1),t.getX(W+2))}let x=new y,_=new y,E=new y,S=new y;function T(A){E.fromBufferAttribute(i,A),S.copy(E);let I=a[A];x.copy(I),x.sub(E.multiplyScalar(E.dot(I))).normalize(),_.crossVectors(S,I);let U=_.dot(l[A])<0?-1:1;s.setXYZW(A,x.x,x.y,x.z,U)}for(let A=0,I=w.length;A<I;++A){let z=w[A],U=z.start,K=z.count;for(let W=U,vt=U+K;W<vt;W+=3)T(t.getX(W+0)),T(t.getX(W+1)),T(t.getX(W+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new de(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new y,r=new y,s=new y,a=new y,l=new y,c=new y,h=new y,u=new y;if(t)for(let f=0,d=t.count;f<d;f+=3){let p=t.getX(f+0),m=t.getX(f+1),g=t.getX(f+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,m),s.fromBufferAttribute(e,g),h.subVectors(s,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),s.fromBufferAttribute(e,f+2),h.subVectors(s,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)nt.fromBufferAttribute(t,e),nt.normalize(),t.setXYZ(e,nt.x,nt.y,nt.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),d=0,p=0;for(let m=0,g=l.length;m<g;m++){a.isInterleavedBufferAttribute?d=l[m]*a.data.stride+a.offset:d=l[m]*h;for(let v=0;v<h;v++)f[p++]=c[d++]}return new de(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new o,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let a=0,l=s.length;a<l;a++){let c=s[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let s=t.groups;for(let c=0,h=s.length;c<h;c++){let u=s[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},sl=new D,Re=new Vn,Ii=new pe,ol=new y,Pi=new y,Li=new y,Di=new y,_s=new y,Ui=new y,al=new y,Fi=new y,me=class extends j{constructor(t=new Dt,e=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,s=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){Ui.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(_s.fromBufferAttribute(u,t),s?Ui.addScaledVector(_s,h):Ui.addScaledVector(_s.sub(e),h))}e.add(Ui)}return e}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ii.copy(n.boundingSphere),Ii.applyMatrix4(r),Re.copy(t.ray).recast(t.near),!(Ii.containsPoint(Re.origin)===!1&&(Re.intersectSphere(Ii,ol)===null||Re.origin.distanceToSquared(ol)>(t.far-t.near)**2))&&(sl.copy(r).invert(),Re.copy(t.ray).applyMatrix4(sl),!(n.boundingBox!==null&&Re.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Re)))}_computeIntersections(t,e,n){let i,r=this.geometry,s=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(s))for(let p=0,m=f.length;p<m;p++){let g=f[p],v=s[g.materialIndex],w=Math.max(g.start,d.start),x=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let _=w,E=x;_<E;_+=3){let S=a.getX(_),T=a.getX(_+1),A=a.getX(_+2);i=Ni(this,v,t,n,c,h,u,S,T,A),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),m=Math.min(a.count,d.start+d.count);for(let g=p,v=m;g<v;g+=3){let w=a.getX(g),x=a.getX(g+1),_=a.getX(g+2);i=Ni(this,s,t,n,c,h,u,w,x,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(s))for(let p=0,m=f.length;p<m;p++){let g=f[p],v=s[g.materialIndex],w=Math.max(g.start,d.start),x=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let _=w,E=x;_<E;_+=3){let S=_,T=_+1,A=_+2;i=Ni(this,v,t,n,c,h,u,S,T,A),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{let p=Math.max(0,d.start),m=Math.min(l.count,d.start+d.count);for(let g=p,v=m;g<v;g+=3){let w=g,x=g+1,_=g+2;i=Ni(this,s,t,n,c,h,u,w,x,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}};function Yh(o,t,e,n,i,r,s,a){let l;if(t.side===ph?l=n.intersectTriangle(s,r,i,!0,a):l=n.intersectTriangle(i,r,s,t.side===Is,a),l===null)return null;Fi.copy(a),Fi.applyMatrix4(o.matrixWorld);let c=e.ray.origin.distanceTo(Fi);return c<e.near||c>e.far?null:{distance:c,point:Fi.clone(),object:o}}function Ni(o,t,e,n,i,r,s,a,l,c){o.getVertexPosition(a,Pi),o.getVertexPosition(l,Li),o.getVertexPosition(c,Di);let h=Yh(o,t,e,n,Pi,Li,Di,al);if(h){let u=new y;Le.getBarycoord(al,Pi,Li,Di,u),i&&(h.uv=Le.getInterpolatedAttribute(i,a,l,c,u,new P)),r&&(h.uv1=Le.getInterpolatedAttribute(r,a,l,c,u,new P)),s&&(h.normal=Le.getInterpolatedAttribute(s,a,l,c,u,new y),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new y,materialIndex:0};Le.getNormal(Pi,Li,Di,f.normal),h.face=f,h.barycoord=u}return h}function Zh(o){let t={};for(let e in o){t[e]={};for(let n in o[e]){let i=o[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function mt(o){let t={};for(let e=0;e<o.length;e++){let n=Zh(o[e]);for(let i in n)t[i]=n[i]}return t}var $i=class extends j{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new D,this.projectionMatrix=new D,this.projectionMatrixInverse=new D,this.coordinateSystem=Ue}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ue=new y,ll=new P,cl=new P,dn=class extends $i{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=zn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Fn*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zn*2*Math.atan(Math.tan(Fn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ue.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ue.x,ue.y).multiplyScalar(-t/ue.z),ue.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ue.x,ue.y).multiplyScalar(-t/ue.z)}getViewSize(t,e){return this.getViewBounds(t,ll,cl),e.subVectors(cl,ll)}setViewOffset(t,e,n,i,r,s){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Fn*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,s=this.view;if(this.view!==null&&this.view.enabled){let l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*i/l,e-=s.offsetY*n/c,i*=s.width/l,n*=s.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Ms=new y,jh=new y,Jh=new F,fe=class{constructor(t=new y(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Ms.subVectors(n,e).cross(jh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Ms),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Jh.getNormalMatrix(t),i=this.coplanarPoint(Ms).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ie=new pe,Oi=new y,ks=class{constructor(t=new fe,e=new fe,n=new fe,i=new fe,r=new fe,s=new fe){this.planes=[t,e,n,i,r,s]}set(t,e,n,i,r,s){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ue){let n=this.planes,i=t.elements,r=i[0],s=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],d=i[8],p=i[9],m=i[10],g=i[11],v=i[12],w=i[13],x=i[14],_=i[15];if(n[0].setComponents(l-r,f-c,g-d,_-v).normalize(),n[1].setComponents(l+r,f+c,g+d,_+v).normalize(),n[2].setComponents(l+s,f+h,g+p,_+w).normalize(),n[3].setComponents(l-s,f-h,g-p,_-w).normalize(),n[4].setComponents(l-a,f-u,g-m,_-x).normalize(),e===Ue)n[5].setComponents(l+a,f+u,g+m,_+x).normalize();else if(e===Ds)n[5].setComponents(a,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ie.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ie.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ie)}intersectsSprite(t){return Ie.center.set(0,0,0),Ie.radius=.7071067811865476,Ie.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ie)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Oi.x=i.normal.x>0?t.max.x:t.min.x,Oi.y=i.normal.y>0?t.max.y:t.min.y,Oi.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Oi)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Yi=class o extends Dt{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,s=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,f=e/l,d=[],p=[],m=[],g=[];for(let v=0;v<h;v++){let w=v*f-s;for(let x=0;x<c;x++){let _=x*u-r;p.push(_,-w,0),m.push(0,0,1),g.push(x/a),g.push(1-v/l)}}for(let v=0;v<l;v++)for(let w=0;w<a;w++){let x=w+c*v,_=w+c*(v+1),E=w+1+c*(v+1),S=w+1+c*v;d.push(x,_,S),d.push(_,E,S)}this.setIndex(d),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(m,3)),this.setAttribute("uv",new tt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new o(t.width,t.height,t.widthSegments,t.heightSegments)}},Kh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,tu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,eu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,iu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ru=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,su=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ou=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,au=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,lu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,uu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,fu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,du=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_u=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Mu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,bu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Su=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Eu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Au=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ru=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Iu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Pu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Du=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Uu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Fu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ou=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ku=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Wu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Xu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$u=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ju=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ju=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ku=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Qu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ef=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,of=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,af=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ff=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,df=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,mf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_f=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Mf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ef=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Af=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,If=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Df=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Uf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ff=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Nf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Of=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,zf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Hf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$f=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Jf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Kf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,td=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ed=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,id=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,sd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,od=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ad=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ld=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ud=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,dd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,md=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gd=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_d=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Md=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ed=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Td=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ad=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Id=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,k={alphahash_fragment:Kh,alphahash_pars_fragment:Qh,alphamap_fragment:tu,alphamap_pars_fragment:eu,alphatest_fragment:nu,alphatest_pars_fragment:iu,aomap_fragment:ru,aomap_pars_fragment:su,batching_pars_vertex:ou,batching_vertex:au,begin_vertex:lu,beginnormal_vertex:cu,bsdfs:hu,iridescence_fragment:uu,bumpmap_pars_fragment:fu,clipping_planes_fragment:du,clipping_planes_pars_fragment:pu,clipping_planes_pars_vertex:mu,clipping_planes_vertex:gu,color_fragment:yu,color_pars_fragment:vu,color_pars_vertex:xu,color_vertex:_u,common:Mu,cube_uv_reflection_fragment:wu,defaultnormal_vertex:bu,displacementmap_pars_vertex:Su,displacementmap_vertex:Eu,emissivemap_fragment:Tu,emissivemap_pars_fragment:Au,colorspace_fragment:Cu,colorspace_pars_fragment:Ru,envmap_fragment:Iu,envmap_common_pars_fragment:Pu,envmap_pars_fragment:Lu,envmap_pars_vertex:Du,envmap_physical_pars_fragment:Wu,envmap_vertex:Uu,fog_vertex:Fu,fog_pars_vertex:Nu,fog_fragment:Ou,fog_pars_fragment:Bu,gradientmap_pars_fragment:ku,lightmap_pars_fragment:zu,lights_lambert_fragment:Vu,lights_lambert_pars_fragment:Hu,lights_pars_begin:Gu,lights_toon_fragment:Xu,lights_toon_pars_fragment:qu,lights_phong_fragment:$u,lights_phong_pars_fragment:Yu,lights_physical_fragment:Zu,lights_physical_pars_fragment:ju,lights_fragment_begin:Ju,lights_fragment_maps:Ku,lights_fragment_end:Qu,logdepthbuf_fragment:tf,logdepthbuf_pars_fragment:ef,logdepthbuf_pars_vertex:nf,logdepthbuf_vertex:rf,map_fragment:sf,map_pars_fragment:of,map_particle_fragment:af,map_particle_pars_fragment:lf,metalnessmap_fragment:cf,metalnessmap_pars_fragment:hf,morphinstance_vertex:uf,morphcolor_vertex:ff,morphnormal_vertex:df,morphtarget_pars_vertex:pf,morphtarget_vertex:mf,normal_fragment_begin:gf,normal_fragment_maps:yf,normal_pars_fragment:vf,normal_pars_vertex:xf,normal_vertex:_f,normalmap_pars_fragment:Mf,clearcoat_normal_fragment_begin:wf,clearcoat_normal_fragment_maps:bf,clearcoat_pars_fragment:Sf,iridescence_pars_fragment:Ef,opaque_fragment:Tf,packing:Af,premultiplied_alpha_fragment:Cf,project_vertex:Rf,dithering_fragment:If,dithering_pars_fragment:Pf,roughnessmap_fragment:Lf,roughnessmap_pars_fragment:Df,shadowmap_pars_fragment:Uf,shadowmap_pars_vertex:Ff,shadowmap_vertex:Nf,shadowmask_pars_fragment:Of,skinbase_vertex:Bf,skinning_pars_vertex:kf,skinning_vertex:zf,skinnormal_vertex:Vf,specularmap_fragment:Hf,specularmap_pars_fragment:Gf,tonemapping_fragment:Wf,tonemapping_pars_fragment:Xf,transmission_fragment:qf,transmission_pars_fragment:$f,uv_pars_fragment:Yf,uv_pars_vertex:Zf,uv_vertex:jf,worldpos_vertex:Jf,background_vert:Kf,background_frag:Qf,backgroundCube_vert:td,backgroundCube_frag:ed,cube_vert:nd,cube_frag:id,depth_vert:rd,depth_frag:sd,distanceRGBA_vert:od,distanceRGBA_frag:ad,equirect_vert:ld,equirect_frag:cd,linedashed_vert:hd,linedashed_frag:ud,meshbasic_vert:fd,meshbasic_frag:dd,meshlambert_vert:pd,meshlambert_frag:md,meshmatcap_vert:gd,meshmatcap_frag:yd,meshnormal_vert:vd,meshnormal_frag:xd,meshphong_vert:_d,meshphong_frag:Md,meshphysical_vert:wd,meshphysical_frag:bd,meshtoon_vert:Sd,meshtoon_frag:Ed,points_vert:Td,points_frag:Ad,shadow_vert:Cd,shadow_frag:Rd,sprite_vert:Id,sprite_frag:Pd},C={common:{diffuse:{value:new B(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new F},alphaMap:{value:null},alphaMapTransform:{value:new F},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new F}},envmap:{envMap:{value:null},envMapRotation:{value:new F},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new F}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new F}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new F},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new F},normalScale:{value:new P(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new F},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new F}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new F}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new F}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new B(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new B(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new F},alphaTest:{value:0},uvTransform:{value:new F}},sprite:{diffuse:{value:new B(16777215)},opacity:{value:1},center:{value:new P(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new F},alphaMap:{value:null},alphaMapTransform:{value:new F},alphaTest:{value:0}}},hl={basic:{uniforms:mt([C.common,C.specularmap,C.envmap,C.aomap,C.lightmap,C.fog]),vertexShader:k.meshbasic_vert,fragmentShader:k.meshbasic_frag},lambert:{uniforms:mt([C.common,C.specularmap,C.envmap,C.aomap,C.lightmap,C.emissivemap,C.bumpmap,C.normalmap,C.displacementmap,C.fog,C.lights,{emissive:{value:new B(0)}}]),vertexShader:k.meshlambert_vert,fragmentShader:k.meshlambert_frag},phong:{uniforms:mt([C.common,C.specularmap,C.envmap,C.aomap,C.lightmap,C.emissivemap,C.bumpmap,C.normalmap,C.displacementmap,C.fog,C.lights,{emissive:{value:new B(0)},specular:{value:new B(1118481)},shininess:{value:30}}]),vertexShader:k.meshphong_vert,fragmentShader:k.meshphong_frag},standard:{uniforms:mt([C.common,C.envmap,C.aomap,C.lightmap,C.emissivemap,C.bumpmap,C.normalmap,C.displacementmap,C.roughnessmap,C.metalnessmap,C.fog,C.lights,{emissive:{value:new B(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:k.meshphysical_vert,fragmentShader:k.meshphysical_frag},toon:{uniforms:mt([C.common,C.aomap,C.lightmap,C.emissivemap,C.bumpmap,C.normalmap,C.displacementmap,C.gradientmap,C.fog,C.lights,{emissive:{value:new B(0)}}]),vertexShader:k.meshtoon_vert,fragmentShader:k.meshtoon_frag},matcap:{uniforms:mt([C.common,C.bumpmap,C.normalmap,C.displacementmap,C.fog,{matcap:{value:null}}]),vertexShader:k.meshmatcap_vert,fragmentShader:k.meshmatcap_frag},points:{uniforms:mt([C.points,C.fog]),vertexShader:k.points_vert,fragmentShader:k.points_frag},dashed:{uniforms:mt([C.common,C.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:k.linedashed_vert,fragmentShader:k.linedashed_frag},depth:{uniforms:mt([C.common,C.displacementmap]),vertexShader:k.depth_vert,fragmentShader:k.depth_frag},normal:{uniforms:mt([C.common,C.bumpmap,C.normalmap,C.displacementmap,{opacity:{value:1}}]),vertexShader:k.meshnormal_vert,fragmentShader:k.meshnormal_frag},sprite:{uniforms:mt([C.sprite,C.fog]),vertexShader:k.sprite_vert,fragmentShader:k.sprite_frag},background:{uniforms:{uvTransform:{value:new F},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:k.background_vert,fragmentShader:k.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new F}},vertexShader:k.backgroundCube_vert,fragmentShader:k.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:k.cube_vert,fragmentShader:k.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:k.equirect_vert,fragmentShader:k.equirect_frag},distanceRGBA:{uniforms:mt([C.common,C.displacementmap,{referencePosition:{value:new y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:k.distanceRGBA_vert,fragmentShader:k.distanceRGBA_frag},shadow:{uniforms:mt([C.lights,C.fog,{color:{value:new B(0)},opacity:{value:1}}]),vertexShader:k.shadow_vert,fragmentShader:k.shadow_frag}};hl.physical={uniforms:mt([hl.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new F},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new F},clearcoatNormalScale:{value:new P(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new F},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new F},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new F},sheen:{value:0},sheenColor:{value:new B(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new F},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new F},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new F},transmissionSamplerSize:{value:new P},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new F},attenuationDistance:{value:0},attenuationColor:{value:new B(0)},specularColor:{value:new B(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new F},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new F},anisotropyVector:{value:new P},anisotropyMap:{value:null},anisotropyMapTransform:{value:new F}}]),vertexShader:k.meshphysical_vert,fragmentShader:k.meshphysical_frag};var zs=class extends $i{constructor(t=-1,e=1,n=1,i=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,s=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Pe=(1+Math.sqrt(5))/2,ln=1/Pe,Ug=[new y(-Pe,ln,0),new y(Pe,ln,0),new y(-ln,0,Pe),new y(ln,0,Pe),new y(0,Pe,-ln),new y(0,Pe,ln),new y(-1,1,-1),new y(1,1,-1),new y(-1,1,1),new y(1,1,1)];var Fg=new Float32Array(16),Ng=new Float32Array(9),Og=new Float32Array(4);var Bg={[Ra]:Ia,[Pa]:Ua,[La]:Fa,[Xi]:Da,[Ia]:Ra,[Ua]:Pa,[Fa]:La,[Da]:Xi};var ge=class extends j{constructor(){super(),this.isGroup=!0,this.type="Group"}};var ul=new y,fl=new q,dl=new q,Ld=new y,pl=new D,Bi=new y,ws=new pe,ml=new D,bs=new Vn,Zi=class extends me{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Na,this.bindMatrix=new D,this.bindMatrixInverse=new D,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vt),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Bi),this.boundingBox.expandByPoint(Bi)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new pe),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Bi),this.boundingSphere.expandByPoint(Bi)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ws.copy(this.boundingSphere),ws.applyMatrix4(i),t.ray.intersectsSphere(ws)!==!1&&(ml.copy(i).invert(),bs.copy(t.ray).applyMatrix4(ml),!(this.boundingBox!==null&&bs.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,bs)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new q,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Na?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===mh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,i=this.geometry;fl.fromBufferAttribute(i.attributes.skinIndex,t),dl.fromBufferAttribute(i.attributes.skinWeight,t),ul.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let s=dl.getComponent(r);if(s!==0){let a=fl.getComponent(r);pl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Ld.copy(ul).applyMatrix4(pl),s)}}return e.applyMatrix4(this.bindMatrixInverse)}},pn=class extends j{constructor(){super(),this.isBone=!0,this.type="Bone"}},Vs=class extends zt{constructor(t=null,e=1,n=1,i,r,s,a,l,c=Ba,h=Ba,u,f){super(null,s,a,l,c,h,i,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},gl=new D,Dd=new D,ji=class o{constructor(t=[],e=[]){this.uuid=Me(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new D)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new D;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,s=t.length;r<s;r++){let a=t[r]?t[r].matrixWorld:Dd;gl.multiplyMatrices(a,e[r]),gl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new o(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Vs(e,t,t,Ll,Pl);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){let r=t.bones[n],s=e[r];s===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),s=new pn),this.bones.push(s),this.boneInverses.push(new D().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){let s=e[i];t.bones.push(s.uuid);let a=n[i];t.boneInverses.push(a.toArray())}return t}};var Wn=class extends Fe{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new B(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Ji=new y,Ki=new y,yl=new D,Dn=new Vn,ki=new pe,Ss=new y,vl=new y,Qi=class extends j{constructor(t=new Dt,e=new Wn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)Ji.fromBufferAttribute(e,i-1),Ki.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=Ji.distanceTo(Ki);t.setAttribute("lineDistance",new tt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ki.copy(n.boundingSphere),ki.applyMatrix4(i),ki.radius+=r,t.ray.intersectsSphere(ki)===!1)return;yl.copy(i).invert(),Dn.copy(t.ray).applyMatrix4(yl);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,s.start),p=Math.min(h.count,s.start+s.count);for(let m=d,g=p-1;m<g;m+=c){let v=h.getX(m),w=h.getX(m+1),x=zi(this,t,Dn,l,v,w);x&&e.push(x)}if(this.isLineLoop){let m=h.getX(p-1),g=h.getX(d),v=zi(this,t,Dn,l,m,g);v&&e.push(v)}}else{let d=Math.max(0,s.start),p=Math.min(f.count,s.start+s.count);for(let m=d,g=p-1;m<g;m+=c){let v=zi(this,t,Dn,l,m,m+1);v&&e.push(v)}if(this.isLineLoop){let m=zi(this,t,Dn,l,p-1,d);m&&e.push(m)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function zi(o,t,e,n,i,r){let s=o.geometry.attributes.position;if(Ji.fromBufferAttribute(s,i),Ki.fromBufferAttribute(s,r),e.distanceSqToSegment(Ji,Ki,Ss,vl)>n)return;Ss.applyMatrix4(o.matrixWorld);let l=t.ray.origin.distanceTo(Ss);if(!(l<t.near||l>t.far))return{distance:l,point:vl.clone().applyMatrix4(o.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:o}}var tr=class extends zt{constructor(t,e,n,i,r,s,a,l,c){super(t,e,n,i,r,s,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},gt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let s=1;s<=t;s++)n=this.getPoint(s/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,r=n.length,s;e?s=e:s=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-s,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===s)return i/(r-1);let h=n[i],f=n[i+1]-h,d=(s-h)/f;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let s=this.getPoint(i),a=this.getPoint(r),l=e||(s.isVector2?new P:new y);return l.copy(a).sub(s).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new y,i=[],r=[],s=[],a=new y,l=new D;for(let d=0;d<=t;d++){let p=d/t;i[d]=this.getTangentAt(p,new y)}r[0]=new y,s[0]=new y;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),s[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),s[d]=s[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(it(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,p))}s[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(it(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],d*p)),s[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:s}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Xn=class extends gt{constructor(t=0,e=0,n=1,i=1,r=0,s=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=s,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new P){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,s=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(s?r=0:r=i),this.aClockwise===!0&&!s&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Hs=class extends Xn{constructor(t,e,n,i,r,s){super(t,e,n,n,i,r,s),this.isArcCurve=!0,this.type="ArcCurve"}};function uo(){let o=0,t=0,e=0,n=0;function i(r,s,a,l){o=r,t=a,e=-3*r+3*s-2*a-l,n=2*r-2*s+a+l}return{initCatmullRom:function(r,s,a,l,c){i(s,a,c*(a-r),c*(l-s))},initNonuniformCatmullRom:function(r,s,a,l,c,h,u){let f=(s-r)/c-(a-r)/(c+h)+(a-s)/h,d=(a-s)/h-(l-s)/(h+u)+(l-a)/u;f*=h,d*=h,i(s,a,f,d)},calc:function(r){let s=r*r,a=s*r;return o+t*r+e*s+n*a}}}var Vi=new y,Es=new uo,Ts=new uo,As=new uo,Gs=class extends gt{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new y){let n=e,i=this.points,r=i.length,s=(r-(this.closed?0:1))*t,a=Math.floor(s),l=s-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Vi.subVectors(i[0],i[1]).add(i[0]),c=Vi);let u=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Vi.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Vi),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);m<1e-4&&(m=1),p<1e-4&&(p=m),g<1e-4&&(g=m),Es.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,p,m,g),Ts.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,p,m,g),As.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,p,m,g)}else this.curveType==="catmullrom"&&(Es.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Ts.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),As.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Es.calc(l),Ts.calc(l),As.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new y().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function xl(o,t,e,n,i){let r=(n-t)*.5,s=(i-e)*.5,a=o*o,l=o*a;return(2*e-2*n+r+s)*l+(-3*e+3*n-2*r-s)*a+r*o+e}function Ud(o,t){let e=1-o;return e*e*t}function Fd(o,t){return 2*(1-o)*o*t}function Nd(o,t){return o*o*t}function On(o,t,e,n){return Ud(o,t)+Fd(o,e)+Nd(o,n)}function Od(o,t){let e=1-o;return e*e*e*t}function Bd(o,t){let e=1-o;return 3*e*e*o*t}function kd(o,t){return 3*(1-o)*o*o*t}function zd(o,t){return o*o*o*t}function Bn(o,t,e,n,i){return Od(o,t)+Bd(o,e)+kd(o,n)+zd(o,i)}var er=class extends gt{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,s=this.v2,a=this.v3;return n.set(Bn(t,i.x,r.x,s.x,a.x),Bn(t,i.y,r.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ws=class extends gt{constructor(t=new y,e=new y,n=new y,i=new y){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new y){let n=e,i=this.v0,r=this.v1,s=this.v2,a=this.v3;return n.set(Bn(t,i.x,r.x,s.x,a.x),Bn(t,i.y,r.y,s.y,a.y),Bn(t,i.z,r.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},nr=class extends gt{constructor(t=new P,e=new P){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xs=class extends gt{constructor(t=new y,e=new y){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new y){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new y){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ir=class extends gt{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,i=this.v0,r=this.v1,s=this.v2;return n.set(On(t,i.x,r.x,s.x),On(t,i.y,r.y,s.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},qs=class extends gt{constructor(t=new y,e=new y,n=new y){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new y){let n=e,i=this.v0,r=this.v1,s=this.v2;return n.set(On(t,i.x,r.x,s.x),On(t,i.y,r.y,s.y),On(t,i.z,r.z,s.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},rr=class extends gt{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new P){let n=e,i=this.points,r=(i.length-1)*t,s=Math.floor(r),a=r-s,l=i[s===0?s:s-1],c=i[s],h=i[s>i.length-2?i.length-1:s+1],u=i[s>i.length-3?i.length-1:s+2];return n.set(xl(a,l.x,c.x,h.x,u.x),xl(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new P().fromArray(i))}return this}},_l=Object.freeze({__proto__:null,ArcCurve:Hs,CatmullRomCurve3:Gs,CubicBezierCurve:er,CubicBezierCurve3:Ws,EllipseCurve:Xn,LineCurve:nr,LineCurve3:Xs,QuadraticBezierCurve:ir,QuadraticBezierCurve3:qs,SplineCurve:rr}),$s=class extends gt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new _l[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let s=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-s/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let s=r[i],a=s.isEllipseCurve?t*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?t*s.points.length:t,l=s.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new _l[i.type]().fromJSON(i))}return this}},Ys=class extends $s{constructor(t){super(),this.type="Path",this.currentPoint=new P,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new nr(this.currentPoint.clone(),new P(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new ir(this.currentPoint.clone(),new P(t,e),new P(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,s){let a=new er(this.currentPoint.clone(),new P(t,e),new P(n,i),new P(r,s));return this.curves.push(a),this.currentPoint.set(r,s),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new rr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,s){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,s),this}absarc(t,e,n,i,r,s){return this.absellipse(t,e,n,n,i,r,s),this}ellipse(t,e,n,i,r,s,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,s,a,l),this}absellipse(t,e,n,i,r,s,a,l){let c=new Xn(t,e,n,i,r,s,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Zs=class o extends Dt{constructor(t=[new P(0,-.5),new P(.5,0),new P(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=it(i,0,Math.PI*2);let r=[],s=[],a=[],l=[],c=[],h=1/e,u=new y,f=new P,d=new y,p=new y,m=new y,g=0,v=0;for(let w=0;w<=t.length-1;w++)switch(w){case 0:g=t[w+1].x-t[w].x,v=t[w+1].y-t[w].y,d.x=v*1,d.y=-g,d.z=v*0,m.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(m.x,m.y,m.z);break;default:g=t[w+1].x-t[w].x,v=t[w+1].y-t[w].y,d.x=v*1,d.y=-g,d.z=v*0,p.copy(d),d.x+=m.x,d.y+=m.y,d.z+=m.z,d.normalize(),l.push(d.x,d.y,d.z),m.copy(p)}for(let w=0;w<=e;w++){let x=n+w*h*i,_=Math.sin(x),E=Math.cos(x);for(let S=0;S<=t.length-1;S++){u.x=t[S].x*_,u.y=t[S].y,u.z=t[S].x*E,s.push(u.x,u.y,u.z),f.x=w/e,f.y=S/(t.length-1),a.push(f.x,f.y);let T=l[3*S+0]*_,A=l[3*S+1],I=l[3*S+0]*E;c.push(T,A,I)}}for(let w=0;w<e;w++)for(let x=0;x<t.length-1;x++){let _=x+w*t.length,E=_,S=_+t.length,T=_+t.length+1,A=_+1;r.push(E,S,A),r.push(T,A,S)}this.setIndex(r),this.setAttribute("position",new tt(s,3)),this.setAttribute("uv",new tt(a,2)),this.setAttribute("normal",new tt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new o(t.points,t.segments,t.phiStart,t.phiLength)}},mn=class o extends Zs{constructor(t=1,e=1,n=4,i=8){let r=new Ys;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new o(t.radius,t.length,t.capSegments,t.radialSegments)}};var Vd={triangulate:function(o,t,e=2){let n=t&&t.length,i=n?t[0]*e:o.length,r=Ol(o,0,i,e,!0),s=[];if(!r||r.next===r.prev)return s;let a,l,c,h,u,f,d;if(n&&(r=qd(o,t,r,e)),o.length>80*e){a=c=o[0],l=h=o[1];for(let p=e;p<i;p+=e)u=o[p],f=o[p+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-a,h-l),d=d!==0?32767/d:0}return qn(r,s,e,a,l,d,0),s}};function Ol(o,t,e,n,i){let r,s;if(i===ip(o,t,e,n)>0)for(r=t;r<e;r+=n)s=Ml(r,o[r],o[r+1],s);else for(r=e-n;r>=t;r-=n)s=Ml(r,o[r],o[r+1],s);return s&&gr(s,s.next)&&(Yn(s),s=s.next),s}function Ne(o,t){if(!o)return o;t||(t=o);let e=o,n;do if(n=!1,!e.steiner&&(gr(e,e.next)||$(e.prev,e,e.next)===0)){if(Yn(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function qn(o,t,e,n,i,r,s){if(!o)return;!s&&r&&Jd(o,n,i,r);let a=o,l,c;for(;o.prev!==o.next;){if(l=o.prev,c=o.next,r?Gd(o,n,i,r):Hd(o)){t.push(l.i/e|0),t.push(o.i/e|0),t.push(c.i/e|0),Yn(o),o=c.next,a=c.next;continue}if(o=c,o===a){s?s===1?(o=Wd(Ne(o),t,e),qn(o,t,e,n,i,r,2)):s===2&&Xd(o,t,e,n,i,r):qn(Ne(o),t,e,n,i,r,1);break}}}function Hd(o){let t=o.prev,e=o,n=o.next;if($(t,e,n)>=0)return!1;let i=t.x,r=e.x,s=n.x,a=t.y,l=e.y,c=n.y,h=i<r?i<s?i:s:r<s?r:s,u=a<l?a<c?a:c:l<c?l:c,f=i>r?i>s?i:s:r>s?r:s,d=a>l?a>c?a:c:l>c?l:c,p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=d&&hn(i,a,r,l,s,c,p.x,p.y)&&$(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Gd(o,t,e,n){let i=o.prev,r=o,s=o.next;if($(i,r,s)>=0)return!1;let a=i.x,l=r.x,c=s.x,h=i.y,u=r.y,f=s.y,d=a<l?a<c?a:c:l<c?l:c,p=h<u?h<f?h:f:u<f?u:f,m=a>l?a>c?a:c:l>c?l:c,g=h>u?h>f?h:f:u>f?u:f,v=js(d,p,t,e,n),w=js(m,g,t,e,n),x=o.prevZ,_=o.nextZ;for(;x&&x.z>=v&&_&&_.z<=w;){if(x.x>=d&&x.x<=m&&x.y>=p&&x.y<=g&&x!==i&&x!==s&&hn(a,h,l,u,c,f,x.x,x.y)&&$(x.prev,x,x.next)>=0||(x=x.prevZ,_.x>=d&&_.x<=m&&_.y>=p&&_.y<=g&&_!==i&&_!==s&&hn(a,h,l,u,c,f,_.x,_.y)&&$(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;x&&x.z>=v;){if(x.x>=d&&x.x<=m&&x.y>=p&&x.y<=g&&x!==i&&x!==s&&hn(a,h,l,u,c,f,x.x,x.y)&&$(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;_&&_.z<=w;){if(_.x>=d&&_.x<=m&&_.y>=p&&_.y<=g&&_!==i&&_!==s&&hn(a,h,l,u,c,f,_.x,_.y)&&$(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Wd(o,t,e){let n=o;do{let i=n.prev,r=n.next.next;!gr(i,r)&&Bl(i,n,n.next,r)&&$n(i,r)&&$n(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Yn(n),Yn(n.next),n=o=r),n=n.next}while(n!==o);return Ne(n)}function Xd(o,t,e,n,i,r){let s=o;do{let a=s.next.next;for(;a!==s.prev;){if(s.i!==a.i&&tp(s,a)){let l=kl(s,a);s=Ne(s,s.next),l=Ne(l,l.next),qn(s,t,e,n,i,r,0),qn(l,t,e,n,i,r,0);return}a=a.next}s=s.next}while(s!==o)}function qd(o,t,e,n){let i=[],r,s,a,l,c;for(r=0,s=t.length;r<s;r++)a=t[r]*n,l=r<s-1?t[r+1]*n:o.length,c=Ol(o,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(Qd(c));for(i.sort($d),r=0;r<i.length;r++)e=Yd(i[r],e);return e}function $d(o,t){return o.x-t.x}function Yd(o,t){let e=Zd(o,t);if(!e)return t;let n=kl(e,o);return Ne(n,n.next),Ne(e,e.next)}function Zd(o,t){let e=t,n=-1/0,i,r=o.x,s=o.y;do{if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,i=e.x<e.next.x?e:e.next,f===r))return i}e=e.next}while(e!==t);if(!i)return null;let a=i,l=i.x,c=i.y,h=1/0,u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&hn(s<c?r:n,s,l,c,s<c?n:r,s,e.x,e.y)&&(u=Math.abs(s-e.y)/(r-e.x),$n(e,o)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&jd(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function jd(o,t){return $(o.prev,o,t.prev)<0&&$(t.next,o,o.next)<0}function Jd(o,t,e,n){let i=o;do i.z===0&&(i.z=js(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==o);i.prevZ.nextZ=null,i.prevZ=null,Kd(i)}function Kd(o){let t,e,n,i,r,s,a,l,c=1;do{for(e=o,o=null,r=null,s=0;e;){for(s++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:o=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(s>1);return o}function js(o,t,e,n,i){return o=(o-e)*i|0,t=(t-n)*i|0,o=(o|o<<8)&16711935,o=(o|o<<4)&252645135,o=(o|o<<2)&858993459,o=(o|o<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,o|t<<1}function Qd(o){let t=o,e=o;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==o);return e}function hn(o,t,e,n,i,r,s,a){return(i-s)*(t-a)>=(o-s)*(r-a)&&(o-s)*(n-a)>=(e-s)*(t-a)&&(e-s)*(r-a)>=(i-s)*(n-a)}function tp(o,t){return o.next.i!==t.i&&o.prev.i!==t.i&&!ep(o,t)&&($n(o,t)&&$n(t,o)&&np(o,t)&&($(o.prev,o,t.prev)||$(o,t.prev,t))||gr(o,t)&&$(o.prev,o,o.next)>0&&$(t.prev,t,t.next)>0)}function $(o,t,e){return(t.y-o.y)*(e.x-t.x)-(t.x-o.x)*(e.y-t.y)}function gr(o,t){return o.x===t.x&&o.y===t.y}function Bl(o,t,e,n){let i=Gi($(o,t,e)),r=Gi($(o,t,n)),s=Gi($(e,n,o)),a=Gi($(e,n,t));return!!(i!==r&&s!==a||i===0&&Hi(o,e,t)||r===0&&Hi(o,n,t)||s===0&&Hi(e,o,n)||a===0&&Hi(e,t,n))}function Hi(o,t,e){return t.x<=Math.max(o.x,e.x)&&t.x>=Math.min(o.x,e.x)&&t.y<=Math.max(o.y,e.y)&&t.y>=Math.min(o.y,e.y)}function Gi(o){return o>0?1:o<0?-1:0}function ep(o,t){let e=o;do{if(e.i!==o.i&&e.next.i!==o.i&&e.i!==t.i&&e.next.i!==t.i&&Bl(e,e.next,o,t))return!0;e=e.next}while(e!==o);return!1}function $n(o,t){return $(o.prev,o,o.next)<0?$(o,t,o.next)>=0&&$(o,o.prev,t)>=0:$(o,t,o.prev)<0||$(o,o.next,t)<0}function np(o,t){let e=o,n=!1,i=(o.x+t.x)/2,r=(o.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==o);return n}function kl(o,t){let e=new Js(o.i,o.x,o.y),n=new Js(t.i,t.x,t.y),i=o.next,r=t.prev;return o.next=t,t.prev=o,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ml(o,t,e,n){let i=new Js(o,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Yn(o){o.next.prev=o.prev,o.prev.next=o.next,o.prevZ&&(o.prevZ.nextZ=o.nextZ),o.nextZ&&(o.nextZ.prevZ=o.prevZ)}function Js(o,t,e){this.i=o,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ip(o,t,e,n){let i=0;for(let r=t,s=e-n;r<e;r+=n)i+=(o[s]-o[r])*(o[r+1]+o[s+1]),s=r;return i}var sr=class o{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return o.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];wl(t),bl(n,t);let s=t.length;e.forEach(wl);for(let l=0;l<e.length;l++)i.push(s),s+=e[l].length,bl(n,e[l]);let a=Vd.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function wl(o){let t=o.length;t>2&&o[t-1].equals(o[0])&&o.pop()}function bl(o,t){for(let e=0;e<t.length;e++)o.push(t[e].x),o.push(t[e].y)}var or=class o extends Dt{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:s,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(s+a,Math.PI),c=0,h=[],u=new y,f=new y,d=[],p=[],m=[],g=[];for(let v=0;v<=n;v++){let w=[],x=v/n,_=0;v===0&&s===0?_=.5/e:v===n&&l===Math.PI&&(_=-.5/e);for(let E=0;E<=e;E++){let S=E/e;u.x=-t*Math.cos(i+S*r)*Math.sin(s+x*a),u.y=t*Math.cos(s+x*a),u.z=t*Math.sin(i+S*r)*Math.sin(s+x*a),p.push(u.x,u.y,u.z),f.copy(u).normalize(),m.push(f.x,f.y,f.z),g.push(S+_,1-x),w.push(c++)}h.push(w)}for(let v=0;v<n;v++)for(let w=0;w<e;w++){let x=h[v][w+1],_=h[v][w],E=h[v+1][w],S=h[v+1][w+1];(v!==0||s>0)&&d.push(x,_,S),(v!==n-1||l<Math.PI)&&d.push(_,E,S)}this.setIndex(d),this.setAttribute("position",new tt(p,3)),this.setAttribute("normal",new tt(m,3)),this.setAttribute("uv",new tt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new o(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Oe=class extends Fe{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new B(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new B(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=co,this.normalScale=new P(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new lt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var gn=class extends Fe{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new B(16777215),this.specular=new B(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new B(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=co,this.normalScale=new P(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new lt,this.combine=lo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var ar=class extends Fe{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new B(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new B(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=co,this.normalScale=new P(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new lt,this.combine=lo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Wi(o,t,e){return!o||!e&&o.constructor===t?o:typeof t.BYTES_PER_ELEMENT=="number"?new t(o):Array.prototype.slice.call(o)}function rp(o){return ArrayBuffer.isView(o)&&!(o instanceof DataView)}function sp(o){function t(i,r){return o[i]-o[r]}let e=o.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Sl(o,t,e){let n=o.length,i=new o.constructor(n);for(let r=0,s=0;s!==n;++r){let a=e[r]*t;for(let l=0;l!==t;++l)i[s++]=o[a+l]}return i}function zl(o,t,e,n){let i=1,r=o[0];for(;r!==void 0&&r[n]===void 0;)r=o[i++];if(r===void 0)return;let s=r[n];if(s!==void 0)if(Array.isArray(s))do s=r[n],s!==void 0&&(t.push(r.time),e.push.apply(e,s)),r=o[i++];while(r!==void 0);else if(s.toArray!==void 0)do s=r[n],s!==void 0&&(t.push(r.time),s.toArray(e,e.length)),r=o[i++];while(r!==void 0);else do s=r[n],s!==void 0&&(t.push(r.time),e.push(s)),r=o[i++];while(r!==void 0)}var yn=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let s;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}s=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}s=n,n=0;break e}break n}for(;n<s;){let a=n+s>>>1;t<e[a]?s=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let s=0;s!==i;++s)e[s]=n[r+s];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ks=class extends yn{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ka,endingEnd:ka}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,s=t+1,a=i[r],l=i[s];if(a===void 0)switch(this.getSettings_().endingStart){case za:r=t,a=2*e-n;break;case Va:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case za:s=t,l=2*n-e;break;case Va:s=1,l=n+i[1]-i[0];break;default:s=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=s*h}interpolate_(t,e,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-e)/(i-e),m=p*p,g=m*p,v=-f*g+2*f*m-f*p,w=(1+f)*g+(-1.5-2*f)*m+(-.5+f)*p+1,x=(-1-d)*g+(1.5+d)*m+.5*p,_=d*g-d*m;for(let E=0;E!==a;++E)r[E]=v*s[h+E]+w*s[c+E]+x*s[l+E]+_*s[u+E];return r}},Qs=class extends yn{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),u=1-h;for(let f=0;f!==a;++f)r[f]=s[c+f]*u+s[l+f]*h;return r}},to=class extends yn{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Tt=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Wi(e,this.TimeBufferType),this.values=Wi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Wi(t.times,Array),values:Wi(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new to(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Qs(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ks(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case qi:e=this.InterpolantFactoryMethodDiscrete;break;case Ps:e=this.InterpolantFactoryMethodLinear;break;case es:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qi;case this.InterpolantFactoryMethodLinear:return Ps;case this.InterpolantFactoryMethodSmooth:return es}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,r=0,s=i-1;for(;r!==i&&n[r]<t;)++r;for(;s!==-1&&n[s]>e;)--s;if(++s,r!==0||s!==i){r>=s&&(s=Math.max(s,1),r=s-1);let a=this.getValueSize();this.times=n.slice(r,s),this.values=this.values.slice(r*a,s*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let s=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(s!==null&&s>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,s),t=!1;break}s=l}if(i!==void 0&&rp(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===es,r=t.length-1,s=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let p=0;p!==n;++p){let m=e[u+p];if(m!==e[f+p]||m!==e[d+p]){l=!0;break}}}if(l){if(a!==s){t[s]=t[a];let u=a*n,f=s*n;for(let d=0;d!==n;++d)e[f+d]=e[u+d]}++s}}if(r>0){t[s]=t[r];for(let a=r*n,l=s*n,c=0;c!==n;++c)e[l+c]=e[a+c];++s}return s!==t.length?(this.times=t.slice(0,s),this.values=e.slice(0,s*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Tt.prototype.TimeBufferType=Float32Array;Tt.prototype.ValueBufferType=Float32Array;Tt.prototype.DefaultInterpolation=Ps;var ye=class extends Tt{constructor(t,e,n){super(t,e,n)}};ye.prototype.ValueTypeName="bool";ye.prototype.ValueBufferType=Array;ye.prototype.DefaultInterpolation=qi;ye.prototype.InterpolantFactoryMethodLinear=void 0;ye.prototype.InterpolantFactoryMethodSmooth=void 0;var lr=class extends Tt{};lr.prototype.ValueTypeName="color";var ve=class extends Tt{};ve.prototype.ValueTypeName="number";var eo=class extends yn{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)Z.slerpFlat(r,0,s,c-a,s,c,l);return r}},ne=class extends Tt{InterpolantFactoryMethodLinear(t){return new eo(this.times,this.values,this.getValueSize(),t)}};ne.prototype.ValueTypeName="quaternion";ne.prototype.InterpolantFactoryMethodSmooth=void 0;var xe=class extends Tt{constructor(t,e,n){super(t,e,n)}};xe.prototype.ValueTypeName="string";xe.prototype.ValueBufferType=Array;xe.prototype.DefaultInterpolation=qi;xe.prototype.InterpolantFactoryMethodLinear=void 0;xe.prototype.InterpolantFactoryMethodSmooth=void 0;var _e=class extends Tt{};_e.prototype.ValueTypeName="vector";var cr=class{constructor(t="",e=-1,n=[],i=xh){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Me(),this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,i=1/(t.fps||1);for(let s=0,a=n.length;s!==a;++s)e.push(ap(n[s]).scale(i));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){let e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,s=n.length;r!==s;++r)e.push(Tt.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){let r=e.length,s=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=sp(l);l=Sl(l,1,h),c=Sl(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),s.push(new ve(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,s)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){let c=t[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],f=i[u];f||(i[u]=f=[]),f.push(c)}}let s=[];for(let a in i)s.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return s}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,d,p,m){if(d.length!==0){let g=[],v=[];zl(d,g,v,p),g.length!==0&&m.push(new u(f,g,v))}},i=[],r=t.name||"default",s=t.fps||30,a=t.blendMode,l=t.length||-1,c=t.hierarchy||[];for(let u=0;u<c.length;u++){let f=c[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},p;for(p=0;p<f.length;p++)if(f[p].morphTargets)for(let m=0;m<f[p].morphTargets.length;m++)d[f[p].morphTargets[m]]=-1;for(let m in d){let g=[],v=[];for(let w=0;w!==f[p].morphTargets.length;++w){let x=f[p];g.push(x.time),v.push(x.morphTarget===m?1:0)}i.push(new ve(".morphTargetInfluence["+m+"]",g,v))}l=d.length*s}else{let d=".bones["+e[u].name+"]";n(_e,d+".position",f,"pos",i),n(ne,d+".quaternion",f,"rot",i),n(_e,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){let t=this.tracks,e=0;for(let n=0,i=t.length;n!==i;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function op(o){switch(o.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ve;case"vector":case"vector2":case"vector3":case"vector4":return _e;case"color":return lr;case"quaternion":return ne;case"bool":case"boolean":return ye;case"string":return xe}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+o)}function ap(o){if(o.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=op(o.type);if(o.times===void 0){let e=[],n=[];zl(o.keys,e,n,"value"),o.times=e,o.values=n}return t.parse!==void 0?t.parse(o):new t(o.name,o.times,o.values,o.interpolation)}var hr={enabled:!1,files:{},add:function(o,t){this.enabled!==!1&&(this.files[o]=t)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}},Zn=class{constructor(t,e,n){let i=this,r=!1,s=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,s,a),r=!0},this.itemEnd=function(h){s++,i.onProgress!==void 0&&i.onProgress(h,s,a),s===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],p=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null}}},lp=new Zn,Ht=class{constructor(t){this.manager=t!==void 0?t:lp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Ht.DEFAULT_MATERIAL_NAME="__DEFAULT";var te={},no=class extends Error{constructor(t,e){super(t),this.response=e}},ur=class extends Ht{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=hr.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(te[t]!==void 0){te[t].push({onLoad:e,onProgress:n,onError:i});return}te[t]=[],te[t].push({onLoad:e,onProgress:n,onError:i});let s=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(s).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=te[t],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0,m=0,g=new ReadableStream({start(v){w();function w(){u.read().then(({done:x,value:_})=>{if(x)v.close();else{m+=_.byteLength;let E=new ProgressEvent("progress",{lengthComputable:p,loaded:m,total:d});for(let S=0,T=h.length;S<T;S++){let A=h[S];A.onProgress&&A.onProgress(E)}v.enqueue(_),w()}},x=>{v.error(x)})}}});return new Response(g)}else throw new no(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{hr.add(t,c);let h=te[t];delete te[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=te[t];if(h===void 0)throw this.manager.itemError(t),c;delete te[t];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}};var io=class extends Ht{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,s=hr.get(t);if(s!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(s),r.manager.itemEnd(t)},0),s;let a=Us("img");function l(){h(),hr.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}};var vn=class extends Ht{constructor(t){super(t)}load(t,e,n,i){let r=new zt,s=new io(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}},xn=class extends j{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new B(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var Cs=new D,El=new y,Tl=new y,jn=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new P(512,512),this.map=null,this.mapPass=null,this.matrix=new D,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ks,this._frameExtents=new P(1,1),this._viewportCount=1,this._viewports=[new q(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;El.setFromMatrixPosition(t.matrixWorld),e.position.copy(El),Tl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Tl),e.updateMatrixWorld(),Cs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cs),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Cs)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},ro=class extends jn{constructor(){super(new dn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=zn*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},fr=class extends xn{constructor(t,e,n=0,i=Math.PI/3,r=0,s=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(j.DEFAULT_UP),this.updateMatrix(),this.target=new j,this.distance=n,this.angle=i,this.penumbra=r,this.decay=s,this.map=null,this.shadow=new ro}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Al=new D,Un=new y,Rs=new y,so=class extends jn{constructor(){super(new dn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new P(4,2),this._viewportCount=6,this._viewports=[new q(2,1,1,1),new q(0,1,1,1),new q(3,1,1,1),new q(1,1,1,1),new q(3,0,1,1),new q(1,0,1,1)],this._cubeDirections=[new y(1,0,0),new y(-1,0,0),new y(0,0,1),new y(0,0,-1),new y(0,1,0),new y(0,-1,0)],this._cubeUps=[new y(0,1,0),new y(0,1,0),new y(0,1,0),new y(0,1,0),new y(0,0,1),new y(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Un.setFromMatrixPosition(t.matrixWorld),n.position.copy(Un),Rs.copy(n.position),Rs.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Rs),n.updateMatrixWorld(),i.makeTranslation(-Un.x,-Un.y,-Un.z),Al.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Al)}},Jn=class extends xn{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new so}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},oo=class extends jn{constructor(){super(new zs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},dr=class extends xn{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(j.DEFAULT_UP),this.updateMatrix(),this.target=new j,this.shadow=new oo}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},pr=class extends xn{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var mr=class{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}};var fo="\\[\\]\\.:\\/",cp=new RegExp("["+fo+"]","g"),po="[^"+fo+"]",hp="[^"+fo.replace("\\.","")+"]",up=/((?:WC+[\/:])*)/.source.replace("WC",po),fp=/(WCOD+)?/.source.replace("WCOD",hp),dp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",po),pp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",po),mp=new RegExp("^"+up+fp+dp+pp+"$"),gp=["material","materials","bones","map"],ao=class{constructor(t,e,n){let i=n||H.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},H=class o{constructor(t,e,n){this.path=e,this.parsedPath=n||o.parseTrackName(e),this.node=o.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new o.Composite(t,e,n):new o(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(cp,"")}static parseTrackName(t){let e=mp.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);gp.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let s=0;s<r.length;s++){let a=r[s];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=o.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let s=t[i];if(s===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else s.fromArray!==void 0&&s.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};H.Composite=ao;H.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};H.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};H.prototype.GetterByBindingType=[H.prototype._getValue_direct,H.prototype._getValue_array,H.prototype._getValue_arrayElement,H.prototype._getValue_toArray];H.prototype.SetterByBindingTypeAndVersioning=[[H.prototype._setValue_direct,H.prototype._setValue_direct_setNeedsUpdate,H.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[H.prototype._setValue_array,H.prototype._setValue_array_setNeedsUpdate,H.prototype._setValue_array_setMatrixWorldNeedsUpdate],[H.prototype._setValue_arrayElement,H.prototype._setValue_arrayElement_setNeedsUpdate,H.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[H.prototype._setValue_fromArray,H.prototype._setValue_fromArray_setNeedsUpdate,H.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var kg=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");L();L();var At=Uint8Array,_n=Uint16Array,vp=Int32Array,Vl=new At([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Hl=new At([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),xp=new At([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Gl=function(o,t){for(var e=new _n(31),n=0;n<31;++n)e[n]=t+=1<<o[n-1];for(var i=new vp(e[30]),n=1;n<30;++n)for(var r=e[n];r<e[n+1];++r)i[r]=r-e[n]<<5|n;return{b:e,r:i}},Wl=Gl(Vl,2),Xl=Wl.b,_p=Wl.r;Xl[28]=258,_p[258]=28;var ql=Gl(Hl,0),Mp=ql.b,Vg=ql.r,yo=new _n(32768);for(V=0;V<32768;++V)ie=(V&43690)>>1|(V&21845)<<1,ie=(ie&52428)>>2|(ie&13107)<<2,ie=(ie&61680)>>4|(ie&3855)<<4,yo[V]=((ie&65280)>>8|(ie&255)<<8)>>1;var ie,V,Kn=(function(o,t,e){for(var n=o.length,i=0,r=new _n(t);i<n;++i)o[i]&&++r[o[i]-1];var s=new _n(t);for(i=1;i<t;++i)s[i]=s[i-1]+r[i-1]<<1;var a;if(e){a=new _n(1<<t);var l=15-t;for(i=0;i<n;++i)if(o[i])for(var c=i<<4|o[i],h=t-o[i],u=s[o[i]-1]++<<h,f=u|(1<<h)-1;u<=f;++u)a[yo[u]>>l]=c}else for(a=new _n(n),i=0;i<n;++i)o[i]&&(a[i]=yo[s[o[i]-1]++]>>15-o[i]);return a}),Qn=new At(288);for(V=0;V<144;++V)Qn[V]=8;var V;for(V=144;V<256;++V)Qn[V]=9;var V;for(V=256;V<280;++V)Qn[V]=7;var V;for(V=280;V<288;++V)Qn[V]=8;var V,$l=new At(32);for(V=0;V<32;++V)$l[V]=5;var V;var wp=Kn(Qn,9,1);var bp=Kn($l,5,1),mo=function(o){for(var t=o[0],e=1;e<o.length;++e)o[e]>t&&(t=o[e]);return t},Ut=function(o,t,e){var n=t/8|0;return(o[n]|o[n+1]<<8)>>(t&7)&e},go=function(o,t){var e=t/8|0;return(o[e]|o[e+1]<<8|o[e+2]<<16)>>(t&7)},Sp=function(o){return(o+7)/8|0},Ep=function(o,t,e){return(t==null||t<0)&&(t=0),(e==null||e>o.length)&&(e=o.length),new At(o.subarray(t,e))};var Tp=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Ft=function(o,t,e){var n=new Error(t||Tp[o]);if(n.code=o,Error.captureStackTrace&&Error.captureStackTrace(n,Ft),!e)throw n;return n},Ap=function(o,t,e,n){var i=o.length,r=n?n.length:0;if(!i||t.f&&!t.l)return e||new At(0);var s=!e,a=s||t.i!=2,l=t.i;s&&(e=new At(i*3));var c=function(Bo){var ko=e.length;if(Bo>ko){var zo=new At(Math.max(ko*2,Bo));zo.set(e),e=zo}},h=t.f||0,u=t.p||0,f=t.b||0,d=t.l,p=t.d,m=t.m,g=t.n,v=i*8;do{if(!d){h=Ut(o,u,1);var w=Ut(o,u+1,3);if(u+=3,w)if(w==1)d=wp,p=bp,m=9,g=5;else if(w==2){var S=Ut(o,u,31)+257,T=Ut(o,u+10,15)+4,A=S+Ut(o,u+5,31)+1;u+=14;for(var I=new At(A),z=new At(19),U=0;U<T;++U)z[xp[U]]=Ut(o,u+U*3,7);u+=T*3;for(var K=mo(z),W=(1<<K)-1,vt=Kn(z,K,1),U=0;U<A;){var Nt=vt[Ut(o,u,W)];u+=Nt&15;var x=Nt>>4;if(x<16)I[U++]=x;else{var Rt=0,qt=0;for(x==16?(qt=3+Ut(o,u,3),u+=2,Rt=I[U-1]):x==17?(qt=3+Ut(o,u,7),u+=3):x==18&&(qt=11+Ut(o,u,127),u+=7);qt--;)I[U++]=Rt}}var we=I.subarray(0,S),xt=I.subarray(S);m=mo(we),g=mo(xt),d=Kn(we,m,1),p=Kn(xt,g,1)}else Ft(1);else{var x=Sp(u)+4,_=o[x-4]|o[x-3]<<8,E=x+_;if(E>i){l&&Ft(0);break}a&&c(f+_),e.set(o.subarray(x,E),f),t.b=f+=_,t.p=u=E*8,t.f=h;continue}if(u>v){l&&Ft(0);break}}a&&c(f+131072);for(var ze=(1<<m)-1,Ve=(1<<g)-1,Nr=u;;Nr=u){var Rt=d[go(o,u)&ze],He=Rt>>4;if(u+=Rt&15,u>v){l&&Ft(0);break}if(Rt||Ft(2),He<256)e[f++]=He;else if(He==256){Nr=u,d=null;break}else{var Fo=He-254;if(He>264){var U=He-257,Sn=Vl[U];Fo=Ut(o,u,(1<<Sn)-1)+Xl[U],u+=Sn}var Or=p[go(o,u)&Ve],Br=Or>>4;Or||Ft(3),u+=Or&15;var xt=Mp[Br];if(Br>3){var Sn=Hl[Br];xt+=go(o,u)&(1<<Sn)-1,u+=Sn}if(u>v){l&&Ft(0);break}a&&c(f+131072);var No=f+Fo;if(f<xt){var Oo=r-xt,dc=Math.min(xt,No);for(Oo+f<0&&Ft(3);f<dc;++f)e[f]=n[Oo+f]}for(;f<No;++f)e[f]=e[f-xt]}}t.l=d,t.p=Nr,t.b=f,t.f=h,d&&(h=1,t.m=m,t.d=p,t.n=g)}while(!h);return f!=e.length&&s?Ep(e,0,f):e.subarray(0,f)};var Cp=new At(0);var Rp=function(o,t){return((o[0]&15)!=8||o[0]>>4>7||(o[0]<<8|o[1])%31)&&Ft(6,"invalid zlib data"),(o[1]>>5&1)==+!t&&Ft(6,"invalid zlib data: "+(o[1]&32?"need":"unexpected")+" dictionary"),(o[1]>>3&4)+2};function Yl(o,t){return Ap(o.subarray(Rp(o,t&&t.dictionary),-4),{i:2},t&&t.out,t&&t.dictionary)}var Ip=typeof TextDecoder<"u"&&new TextDecoder,Pp=0;try{Ip.decode(Cp,{stream:!0}),Pp=1}catch{}L();L();function Zl(o,t,e){let n=e.length-o-1;if(t>=e[n])return n-1;if(t<=e[o])return o;let i=o,r=n,s=Math.floor((i+r)/2);for(;t<e[s]||t>=e[s+1];)t<e[s]?r=s:i=s,s=Math.floor((i+r)/2);return s}function Dp(o,t,e,n){let i=[],r=[],s=[];i[0]=1;for(let a=1;a<=e;++a){r[a]=t-n[o+1-a],s[a]=n[o+a]-t;let l=0;for(let c=0;c<a;++c){let h=s[c+1],u=r[a-c],f=i[c]/(h+u);i[c]=l+h*f,l=u*f}i[a]=l}return i}function jl(o,t,e,n){let i=Zl(o,n,t),r=Dp(i,n,o,t),s=new q(0,0,0,0);for(let a=0;a<=o;++a){let l=e[i-o+a],c=r[a],h=l.w*c;s.x+=l.x*h,s.y+=l.y*h,s.z+=l.z*h,s.w+=l.w*c}return s}function Up(o,t,e,n,i){let r=[];for(let u=0;u<=e;++u)r[u]=0;let s=[];for(let u=0;u<=n;++u)s[u]=r.slice(0);let a=[];for(let u=0;u<=e;++u)a[u]=r.slice(0);a[0][0]=1;let l=r.slice(0),c=r.slice(0);for(let u=1;u<=e;++u){l[u]=t-i[o+1-u],c[u]=i[o+u]-t;let f=0;for(let d=0;d<u;++d){let p=c[d+1],m=l[u-d];a[u][d]=p+m;let g=a[d][u-1]/a[u][d];a[d][u]=f+p*g,f=m*g}a[u][u]=f}for(let u=0;u<=e;++u)s[0][u]=a[u][e];for(let u=0;u<=e;++u){let f=0,d=1,p=[];for(let m=0;m<=e;++m)p[m]=r.slice(0);p[0][0]=1;for(let m=1;m<=n;++m){let g=0,v=u-m,w=e-m;u>=m&&(p[d][0]=p[f][0]/a[w+1][v],g=p[d][0]*a[v][w]);let x=v>=-1?1:-v,_=u-1<=w?m-1:e-u;for(let S=x;S<=_;++S)p[d][S]=(p[f][S]-p[f][S-1])/a[w+1][v+S],g+=p[d][S]*a[v+S][w];u<=w&&(p[d][m]=-p[f][m-1]/a[w+1][u],g+=p[d][m]*a[u][w]),s[m][u]=g;let E=f;f=d,d=E}}let h=e;for(let u=1;u<=n;++u){for(let f=0;f<=e;++f)s[u][f]*=h;h*=e-u}return s}function Fp(o,t,e,n,i){let r=i<o?i:o,s=[],a=Zl(o,n,t),l=Up(a,n,o,r,t),c=[];for(let h=0;h<e.length;++h){let u=e[h].clone(),f=u.w;u.x*=f,u.y*=f,u.z*=f,c[h]=u}for(let h=0;h<=r;++h){let u=c[a-o].clone().multiplyScalar(l[h][0]);for(let f=1;f<=o;++f)u.add(c[a-o+f].clone().multiplyScalar(l[h][f]));s[h]=u}for(let h=r+1;h<=i+1;++h)s[h]=new q(0,0,0);return s}function Np(o,t){let e=1;for(let i=2;i<=o;++i)e*=i;let n=1;for(let i=2;i<=t;++i)n*=i;for(let i=2;i<=o-t;++i)n*=i;return e/n}function Op(o){let t=o.length,e=[],n=[];for(let r=0;r<t;++r){let s=o[r];e[r]=new y(s.x,s.y,s.z),n[r]=s.w}let i=[];for(let r=0;r<t;++r){let s=e[r].clone();for(let a=1;a<=r;++a)s.sub(i[r-a].clone().multiplyScalar(Np(r,a)*n[a]));i[r]=s.divideScalar(n[0])}return i}function Jl(o,t,e,n,i){let r=Fp(o,t,e,n,i);return Op(r)}var yr=class extends gt{constructor(t,e,n,i,r){super();let s=e?e.length-1:0,a=n?n.length:0;this.degree=t,this.knots=e,this.controlPoints=[],this.startKnot=i||0,this.endKnot=r||s;for(let l=0;l<a;++l){let c=n[l];this.controlPoints[l]=new q(c.x,c.y,c.z,c.w)}}getPoint(t,e=new y){let n=e,i=this.knots[this.startKnot]+t*(this.knots[this.endKnot]-this.knots[this.startKnot]),r=jl(this.degree,this.knots,this.controlPoints,i);return r.w!==1&&r.divideScalar(r.w),n.set(r.x,r.y,r.z)}getTangent(t,e=new y){let n=e,i=this.knots[0]+t*(this.knots[this.knots.length-1]-this.knots[0]),r=Jl(this.degree,this.knots,this.controlPoints,i,1);return n.copy(r[1]).normalize(),n}toJSON(){let t=super.toJSON();return t.degree=this.degree,t.knots=[...this.knots],t.controlPoints=this.controlPoints.map(e=>e.toArray()),t.startKnot=this.startKnot,t.endKnot=this.endKnot,t}fromJSON(t){return super.fromJSON(t),this.degree=t.degree,this.knots=[...t.knots],this.controlPoints=t.controlPoints.map(e=>new q(e[0],e[1],e[2],e[3])),this.startKnot=t.startKnot,this.endKnot=t.endKnot,this}};var O,J,ut,xr=class extends Ht{constructor(t){super(t)}load(t,e,n,i){let r=this,s=r.path===""?mr.extractUrlBase(t):r.path,a=new ur(this.manager);a.setPath(r.path),a.setResponseType("arraybuffer"),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(t,function(l){try{e(r.parse(l,s))}catch(c){i?i(c):console.error(c),r.manager.itemError(t)}},n,i)}parse(t,e){if(kp(t))O=new So().parse(t);else{let i=tc(t);if(!zp(i))throw new Error("THREE.FBXLoader: Unknown format.");if(Kl(i)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+Kl(i));O=new bo().parse(i)}let n=new vn(this.manager).setPath(this.resourcePath||e).setCrossOrigin(this.crossOrigin);return new _o(n,this.manager).parse(O)}},_o=class{constructor(t,e){this.textureLoader=t,this.manager=e}parse(){J=this.parseConnections();let t=this.parseImages(),e=this.parseTextures(t),n=this.parseMaterials(e),i=this.parseDeformers(),r=new Mo().parse(i);return this.parseScene(i,r,n),ut}parseConnections(){let t=new Map;return"Connections"in O&&O.Connections.connections.forEach(function(n){let i=n[0],r=n[1],s=n[2];t.has(i)||t.set(i,{parents:[],children:[]});let a={ID:r,relationship:s};t.get(i).parents.push(a),t.has(r)||t.set(r,{parents:[],children:[]});let l={ID:i,relationship:s};t.get(r).children.push(l)}),t}parseImages(){let t={},e={};if("Video"in O.Objects){let n=O.Objects.Video;for(let i in n){let r=n[i],s=parseInt(i);if(t[s]=r.RelativeFilename||r.Filename,"Content"in r){let a=r.Content instanceof ArrayBuffer&&r.Content.byteLength>0,l=typeof r.Content=="string"&&r.Content!=="";if(a||l){let c=this.parseImage(n[i]);e[r.RelativeFilename||r.Filename]=c}}}}for(let n in t){let i=t[n];e[i]!==void 0?t[n]=e[i]:t[n]=t[n].split("\\").pop()}return t}parseImage(t){let e=t.Content,n=t.RelativeFilename||t.Filename,i=n.slice(n.lastIndexOf(".")+1).toLowerCase(),r;switch(i){case"bmp":r="image/bmp";break;case"jpg":case"jpeg":r="image/jpeg";break;case"png":r="image/png";break;case"tif":r="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),r="image/tga";break;default:console.warn('FBXLoader: Image type "'+i+'" is not supported.');return}if(typeof e=="string")return"data:"+r+";base64,"+e;{let s=new Uint8Array(e);return window.URL.createObjectURL(new Blob([s],{type:r}))}}parseTextures(t){let e=new Map;if("Texture"in O.Objects){let n=O.Objects.Texture;for(let i in n){let r=this.parseTexture(n[i],t);e.set(parseInt(i),r)}}return e}parseTexture(t,e){let n=this.loadTexture(t,e);n.ID=t.id,n.name=t.attrName;let i=t.WrapModeU,r=t.WrapModeV,s=i!==void 0?i.value:0,a=r!==void 0?r.value:0;if(n.wrapS=s===0?kn:De,n.wrapT=a===0?kn:De,"Scaling"in t){let l=t.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in t){let l=t.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(t,e){let n=new Set(["tga","tif","tiff","exr","dds","hdr","ktx2"]),i=t.FileName.split(".").pop().toLowerCase(),r=n.has(i)?this.manager.getHandler(`.${i}`):this.textureLoader;if(!r)return console.warn(`FBXLoader: ${i.toUpperCase()} loader not found, creating placeholder texture for`,t.RelativeFilename),new zt;let s=r.path;s||r.setPath(this.textureLoader.path);let a=J.get(t.id).children,l;a!==void 0&&a.length>0&&e[a[0].ID]!==void 0&&(l=e[a[0].ID],(l.indexOf("blob:")===0||l.indexOf("data:")===0)&&r.setPath(void 0));let c=r.load(l);return r.setPath(s),c}parseMaterials(t){let e=new Map;if("Material"in O.Objects){let n=O.Objects.Material;for(let i in n){let r=this.parseMaterial(n[i],t);r!==null&&e.set(parseInt(i),r)}}return e}parseMaterial(t,e){let n=t.id,i=t.attrName,r=t.ShadingModel;if(typeof r=="object"&&(r=r.value),!J.has(n))return null;let s=this.parseParameters(t,e,n),a;switch(r.toLowerCase()){case"phong":a=new gn;break;case"lambert":a=new ar;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',r),a=new gn;break}return a.setValues(s),a.name=i,a}parseParameters(t,e,n){let i={};t.BumpFactor&&(i.bumpScale=t.BumpFactor.value),t.Diffuse?i.color=Y.toWorkingColorSpace(new B().fromArray(t.Diffuse.value),G):t.DiffuseColor&&(t.DiffuseColor.type==="Color"||t.DiffuseColor.type==="ColorRGB")&&(i.color=Y.toWorkingColorSpace(new B().fromArray(t.DiffuseColor.value),G)),t.DisplacementFactor&&(i.displacementScale=t.DisplacementFactor.value),t.Emissive?i.emissive=Y.toWorkingColorSpace(new B().fromArray(t.Emissive.value),G):t.EmissiveColor&&(t.EmissiveColor.type==="Color"||t.EmissiveColor.type==="ColorRGB")&&(i.emissive=Y.toWorkingColorSpace(new B().fromArray(t.EmissiveColor.value),G)),t.EmissiveFactor&&(i.emissiveIntensity=parseFloat(t.EmissiveFactor.value)),i.opacity=1-(t.TransparencyFactor?parseFloat(t.TransparencyFactor.value):0),(i.opacity===1||i.opacity===0)&&(i.opacity=t.Opacity?parseFloat(t.Opacity.value):null,i.opacity===null&&(i.opacity=1-(t.TransparentColor?parseFloat(t.TransparentColor.value[0]):0))),i.opacity<1&&(i.transparent=!0),t.ReflectionFactor&&(i.reflectivity=t.ReflectionFactor.value),t.Shininess&&(i.shininess=t.Shininess.value),t.Specular?i.specular=Y.toWorkingColorSpace(new B().fromArray(t.Specular.value),G):t.SpecularColor&&t.SpecularColor.type==="Color"&&(i.specular=Y.toWorkingColorSpace(new B().fromArray(t.SpecularColor.value),G));let r=this;return J.get(n).children.forEach(function(s){let a=s.relationship;switch(a){case"Bump":i.bumpMap=r.getTexture(e,s.ID);break;case"Maya|TEX_ao_map":i.aoMap=r.getTexture(e,s.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":i.map=r.getTexture(e,s.ID),i.map!==void 0&&(i.map.colorSpace=G);break;case"DisplacementColor":i.displacementMap=r.getTexture(e,s.ID);break;case"EmissiveColor":i.emissiveMap=r.getTexture(e,s.ID),i.emissiveMap!==void 0&&(i.emissiveMap.colorSpace=G);break;case"NormalMap":case"Maya|TEX_normal_map":i.normalMap=r.getTexture(e,s.ID);break;case"ReflectionColor":i.envMap=r.getTexture(e,s.ID),i.envMap!==void 0&&(i.envMap.mapping=Il,i.envMap.colorSpace=G);break;case"SpecularColor":i.specularMap=r.getTexture(e,s.ID),i.specularMap!==void 0&&(i.specularMap.colorSpace=G);break;case"TransparentColor":case"TransparencyFactor":i.alphaMap=r.getTexture(e,s.ID),i.transparent=!0;break;default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",a);break}}),i}getTexture(t,e){return"LayeredTexture"in O.Objects&&e in O.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),e=J.get(e).children[0].ID),t.get(e)}parseDeformers(){let t={},e={};if("Deformer"in O.Objects){let n=O.Objects.Deformer;for(let i in n){let r=n[i],s=J.get(parseInt(i));if(r.attrType==="Skin"){let a=this.parseSkeleton(s,n);a.ID=i,s.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),a.geometryID=s.parents[0].ID,t[i]=a}else if(r.attrType==="BlendShape"){let a={id:i};a.rawTargets=this.parseMorphTargets(s,n),a.id=i,s.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),e[i]=a}}}return{skeletons:t,morphTargets:e}}parseSkeleton(t,e){let n=[];return t.children.forEach(function(i){let r=e[i.ID];if(r.attrType!=="Cluster")return;let s={ID:i.ID,indices:[],weights:[],transformLink:new D().fromArray(r.TransformLink.a)};"Indexes"in r&&(s.indices=r.Indexes.a,s.weights=r.Weights.a),n.push(s)}),{rawBones:n,bones:[]}}parseMorphTargets(t,e){let n=[];for(let i=0;i<t.children.length;i++){let r=t.children[i],s=e[r.ID],a={name:s.attrName,initialWeight:s.DeformPercent,id:s.id,fullWeights:s.FullWeights.a};if(s.attrType!=="BlendShapeChannel")return;a.geoID=J.get(parseInt(r.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(a)}return n}parseScene(t,e,n){ut=new ge;let i=this.parseModels(t.skeletons,e,n),r=O.Objects.Model,s=this;i.forEach(function(l){let c=r[l.ID];s.setLookAtProperties(l,c),J.get(l.ID).parents.forEach(function(u){let f=i.get(u.ID);f!==void 0&&f.add(l)}),l.parent===null&&ut.add(l)}),this.bindSkeleton(t.skeletons,e,i),this.addGlobalSceneSettings(),ut.traverse(function(l){if(l.userData.transformData){l.parent&&(l.userData.transformData.parentMatrix=l.parent.matrix,l.userData.transformData.parentMatrixWorld=l.parent.matrixWorld);let c=Ql(l.userData.transformData);l.applyMatrix4(c),l.updateWorldMatrix()}});let a=new wo().parse();ut.children.length===1&&ut.children[0].isGroup&&(ut.children[0].animations=a,ut=ut.children[0]),ut.animations=a}parseModels(t,e,n){let i=new Map,r=O.Objects.Model;for(let s in r){let a=parseInt(s),l=r[s],c=J.get(a),h=this.buildSkeleton(c,t,a,l.attrName);if(!h){switch(l.attrType){case"Camera":h=this.createCamera(c);break;case"Light":h=this.createLight(c);break;case"Mesh":h=this.createMesh(c,e,n);break;case"NurbsCurve":h=this.createCurve(c,e);break;case"LimbNode":case"Root":h=new pn;break;default:h=new ge;break}h.name=l.attrName?H.sanitizeNodeName(l.attrName):"",h.userData.originalName=l.attrName,h.ID=a}this.getTransformData(h,l),i.set(a,h)}return i}buildSkeleton(t,e,n,i){let r=null;return t.parents.forEach(function(s){for(let a in e){let l=e[a];l.rawBones.forEach(function(c,h){if(c.ID===s.ID){let u=r;r=new pn,r.matrixWorld.copy(c.transformLink),r.name=i?H.sanitizeNodeName(i):"",r.userData.originalName=i,r.ID=n,l.bones[h]=r,u!==null&&r.add(u)}})}}),r}createCamera(t){let e,n;if(t.children.forEach(function(i){let r=O.Objects.NodeAttribute[i.ID];r!==void 0&&(n=r)}),n===void 0)e=new j;else{let i=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(i=1);let r=1;n.NearPlane!==void 0&&(r=n.NearPlane.value/1e3);let s=1e3;n.FarPlane!==void 0&&(s=n.FarPlane.value/1e3);let a=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(a=n.AspectWidth.value,l=n.AspectHeight.value);let c=a/l,h=45;n.FieldOfView!==void 0&&(h=n.FieldOfView.value);let u=n.FocalLength?n.FocalLength.value:null;switch(i){case 0:e=new dn(h,c,r,s),u!==null&&e.setFocalLength(u);break;case 1:console.warn("THREE.FBXLoader: Orthographic cameras not supported yet."),e=new j;break;default:console.warn("THREE.FBXLoader: Unknown camera type "+i+"."),e=new j;break}}return e}createLight(t){let e,n;if(t.children.forEach(function(i){let r=O.Objects.NodeAttribute[i.ID];r!==void 0&&(n=r)}),n===void 0)e=new j;else{let i;n.LightType===void 0?i=0:i=n.LightType.value;let r=16777215;n.Color!==void 0&&(r=Y.toWorkingColorSpace(new B().fromArray(n.Color.value),G));let s=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(s=0);let a=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?a=0:a=n.FarAttenuationEnd.value);let l=1;switch(i){case 0:e=new Jn(r,s,a,l);break;case 1:e=new dr(r,s);break;case 2:let c=Math.PI/3;n.InnerAngle!==void 0&&(c=ct.degToRad(n.InnerAngle.value));let h=0;n.OuterAngle!==void 0&&(h=ct.degToRad(n.OuterAngle.value),h=Math.max(h,1)),e=new fr(r,s,a,c,h,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),e=new Jn(r,s);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(e.castShadow=!0)}return e}createMesh(t,e,n){let i,r=null,s=null,a=[];return t.children.forEach(function(l){e.has(l.ID)&&(r=e.get(l.ID)),n.has(l.ID)&&a.push(n.get(l.ID))}),a.length>1?s=a:a.length>0?s=a[0]:(s=new gn({name:Ht.DEFAULT_MATERIAL_NAME,color:13421772}),a.push(s)),"color"in r.attributes&&a.forEach(function(l){l.vertexColors=!0}),r.FBX_Deformer?(i=new Zi(r,s),i.normalizeSkinWeights()):i=new me(r,s),i}createCurve(t,e){let n=t.children.reduce(function(r,s){return e.has(s.ID)&&(r=e.get(s.ID)),r},null),i=new Wn({name:Ht.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new Qi(n,i)}getTransformData(t,e){let n={};"InheritType"in e&&(n.inheritType=parseInt(e.InheritType.value)),"RotationOrder"in e?n.eulerOrder=ti(e.RotationOrder.value):n.eulerOrder=ti(0),"Lcl_Translation"in e&&(n.translation=e.Lcl_Translation.value),"PreRotation"in e&&(n.preRotation=e.PreRotation.value),"Lcl_Rotation"in e&&(n.rotation=e.Lcl_Rotation.value),"PostRotation"in e&&(n.postRotation=e.PostRotation.value),"Lcl_Scaling"in e&&(n.scale=e.Lcl_Scaling.value),"ScalingOffset"in e&&(n.scalingOffset=e.ScalingOffset.value),"ScalingPivot"in e&&(n.scalingPivot=e.ScalingPivot.value),"RotationOffset"in e&&(n.rotationOffset=e.RotationOffset.value),"RotationPivot"in e&&(n.rotationPivot=e.RotationPivot.value),t.userData.transformData=n}setLookAtProperties(t,e){"LookAtProperty"in e&&J.get(t.ID).children.forEach(function(i){if(i.relationship==="LookAtProperty"){let r=O.Objects.Model[i.ID];if("Lcl_Translation"in r){let s=r.Lcl_Translation.value;t.target!==void 0?(t.target.position.fromArray(s),ut.add(t.target)):t.lookAt(new y().fromArray(s))}}})}bindSkeleton(t,e,n){let i=this.parsePoseNodes();for(let r in t){let s=t[r];J.get(parseInt(s.ID)).parents.forEach(function(l){if(e.has(l.ID)){let c=l.ID;J.get(c).parents.forEach(function(u){n.has(u.ID)&&n.get(u.ID).bind(new ji(s.bones),i[u.ID])})}})}}parsePoseNodes(){let t={};if("Pose"in O.Objects){let e=O.Objects.Pose;for(let n in e)if(e[n].attrType==="BindPose"&&e[n].NbPoseNodes>0){let i=e[n].PoseNode;Array.isArray(i)?i.forEach(function(r){t[r.Node]=new D().fromArray(r.Matrix.a)}):t[i.Node]=new D().fromArray(i.Matrix.a)}}return t}addGlobalSceneSettings(){if("GlobalSettings"in O){if("AmbientColor"in O.GlobalSettings){let t=O.GlobalSettings.AmbientColor.value,e=t[0],n=t[1],i=t[2];if(e!==0||n!==0||i!==0){let r=new B().setRGB(e,n,i,G);ut.add(new pr(r,1))}}"UnitScaleFactor"in O.GlobalSettings&&(ut.userData.unitScaleFactor=O.GlobalSettings.UnitScaleFactor.value)}}},Mo=class{constructor(){this.negativeMaterialIndices=!1}parse(t){let e=new Map;if("Geometry"in O.Objects){let n=O.Objects.Geometry;for(let i in n){let r=J.get(parseInt(i)),s=this.parseGeometry(r,n[i],t);e.set(parseInt(i),s)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),e}parseGeometry(t,e,n){switch(e.attrType){case"Mesh":return this.parseMeshGeometry(t,e,n);case"NurbsCurve":return this.parseNurbsGeometry(e)}}parseMeshGeometry(t,e,n){let i=n.skeletons,r=[],s=t.parents.map(function(u){return O.Objects.Model[u.ID]});if(s.length===0)return;let a=t.children.reduce(function(u,f){return i[f.ID]!==void 0&&(u=i[f.ID]),u},null);t.children.forEach(function(u){n.morphTargets[u.ID]!==void 0&&r.push(n.morphTargets[u.ID])});let l=s[0],c={};"RotationOrder"in l&&(c.eulerOrder=ti(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);let h=Ql(c);return this.genGeometry(e,a,r,h)}genGeometry(t,e,n,i){let r=new Dt;t.attrName&&(r.name=t.attrName);let s=this.parseGeoNode(t,e),a=this.genBuffers(s),l=new tt(a.vertex,3);if(l.applyMatrix4(i),r.setAttribute("position",l),a.colors.length>0&&r.setAttribute("color",new tt(a.colors,3)),e&&(r.setAttribute("skinIndex",new Gn(a.weightsIndices,4)),r.setAttribute("skinWeight",new tt(a.vertexWeights,4)),r.FBX_Deformer=e),a.normal.length>0){let c=new F().getNormalMatrix(i),h=new tt(a.normal,3);h.applyNormalMatrix(c),r.setAttribute("normal",h)}if(a.uvs.forEach(function(c,h){let u=h===0?"uv":`uv${h}`;r.setAttribute(u,new tt(a.uvs[h],2))}),s.material&&s.material.mappingType!=="AllSame"){let c=a.materialIndex[0],h=0;if(a.materialIndex.forEach(function(u,f){u!==c&&(r.addGroup(h,f-h,c),c=u,h=f)}),r.groups.length>0){let u=r.groups[r.groups.length-1],f=u.start+u.count;f!==a.materialIndex.length&&r.addGroup(f,a.materialIndex.length-f,c)}r.groups.length===0&&r.addGroup(0,a.materialIndex.length,a.materialIndex[0])}return this.addMorphTargets(r,t,n,i),r}parseGeoNode(t,e){let n={};if(n.vertexPositions=t.Vertices!==void 0?t.Vertices.a:[],n.vertexIndices=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],t.LayerElementColor&&(n.color=this.parseVertexColors(t.LayerElementColor[0])),t.LayerElementMaterial&&(n.material=this.parseMaterialIndices(t.LayerElementMaterial[0])),t.LayerElementNormal&&(n.normal=this.parseNormals(t.LayerElementNormal[0])),t.LayerElementUV){n.uv=[];let i=0;for(;t.LayerElementUV[i];)t.LayerElementUV[i].UV&&n.uv.push(this.parseUVs(t.LayerElementUV[i])),i++}return n.weightTable={},e!==null&&(n.skeleton=e,e.rawBones.forEach(function(i,r){i.indices.forEach(function(s,a){n.weightTable[s]===void 0&&(n.weightTable[s]=[]),n.weightTable[s].push({id:r,weight:i.weights[a]})})})),n}genBuffers(t){let e={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]},n=0,i=0,r=!1,s=[],a=[],l=[],c=[],h=[],u=[],f=this;return t.vertexIndices.forEach(function(d,p){let m,g=!1;d<0&&(d=d^-1,g=!0);let v=[],w=[];if(s.push(d*3,d*3+1,d*3+2),t.color){let x=vr(p,n,d,t.color);l.push(x[0],x[1],x[2])}if(t.skeleton){if(t.weightTable[d]!==void 0&&t.weightTable[d].forEach(function(x){w.push(x.weight),v.push(x.id)}),w.length>4){r||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),r=!0);let x=[0,0,0,0],_=[0,0,0,0];w.forEach(function(E,S){let T=E,A=v[S];_.forEach(function(I,z,U){if(T>I){U[z]=T,T=I;let K=x[z];x[z]=A,A=K}})}),v=x,w=_}for(;w.length<4;)w.push(0),v.push(0);for(let x=0;x<4;++x)h.push(w[x]),u.push(v[x])}if(t.normal){let x=vr(p,n,d,t.normal);a.push(x[0],x[1],x[2])}t.material&&t.material.mappingType!=="AllSame"&&(m=vr(p,n,d,t.material)[0],m<0&&(f.negativeMaterialIndices=!0,m=0)),t.uv&&t.uv.forEach(function(x,_){let E=vr(p,n,d,x);c[_]===void 0&&(c[_]=[]),c[_].push(E[0]),c[_].push(E[1])}),i++,g&&(f.genFace(e,t,s,m,a,l,c,h,u,i),n++,i=0,s=[],a=[],l=[],c=[],h=[],u=[])}),e}getNormalNewell(t){let e=new y(0,0,0);for(let n=0;n<t.length;n++){let i=t[n],r=t[(n+1)%t.length];e.x+=(i.y-r.y)*(i.z+r.z),e.y+=(i.z-r.z)*(i.x+r.x),e.z+=(i.x-r.x)*(i.y+r.y)}return e.normalize(),e}getNormalTangentAndBitangent(t){let e=this.getNormalNewell(t),i=(Math.abs(e.z)>.5?new y(0,1,0):new y(0,0,1)).cross(e).normalize(),r=e.clone().cross(i).normalize();return{normal:e,tangent:i,bitangent:r}}flattenVertex(t,e,n){return new P(t.dot(e),t.dot(n))}genFace(t,e,n,i,r,s,a,l,c,h){let u;if(h>3){let f=[],d=e.baseVertexPositions||e.vertexPositions;for(let v=0;v<n.length;v+=3)f.push(new y(d[n[v]],d[n[v+1]],d[n[v+2]]));let{tangent:p,bitangent:m}=this.getNormalTangentAndBitangent(f),g=[];for(let v of f)g.push(this.flattenVertex(v,p,m));u=sr.triangulateShape(g,[])}else u=[[0,1,2]];for(let[f,d,p]of u)t.vertex.push(e.vertexPositions[n[f*3]]),t.vertex.push(e.vertexPositions[n[f*3+1]]),t.vertex.push(e.vertexPositions[n[f*3+2]]),t.vertex.push(e.vertexPositions[n[d*3]]),t.vertex.push(e.vertexPositions[n[d*3+1]]),t.vertex.push(e.vertexPositions[n[d*3+2]]),t.vertex.push(e.vertexPositions[n[p*3]]),t.vertex.push(e.vertexPositions[n[p*3+1]]),t.vertex.push(e.vertexPositions[n[p*3+2]]),e.skeleton&&(t.vertexWeights.push(l[f*4]),t.vertexWeights.push(l[f*4+1]),t.vertexWeights.push(l[f*4+2]),t.vertexWeights.push(l[f*4+3]),t.vertexWeights.push(l[d*4]),t.vertexWeights.push(l[d*4+1]),t.vertexWeights.push(l[d*4+2]),t.vertexWeights.push(l[d*4+3]),t.vertexWeights.push(l[p*4]),t.vertexWeights.push(l[p*4+1]),t.vertexWeights.push(l[p*4+2]),t.vertexWeights.push(l[p*4+3]),t.weightsIndices.push(c[f*4]),t.weightsIndices.push(c[f*4+1]),t.weightsIndices.push(c[f*4+2]),t.weightsIndices.push(c[f*4+3]),t.weightsIndices.push(c[d*4]),t.weightsIndices.push(c[d*4+1]),t.weightsIndices.push(c[d*4+2]),t.weightsIndices.push(c[d*4+3]),t.weightsIndices.push(c[p*4]),t.weightsIndices.push(c[p*4+1]),t.weightsIndices.push(c[p*4+2]),t.weightsIndices.push(c[p*4+3])),e.color&&(t.colors.push(s[f*3]),t.colors.push(s[f*3+1]),t.colors.push(s[f*3+2]),t.colors.push(s[d*3]),t.colors.push(s[d*3+1]),t.colors.push(s[d*3+2]),t.colors.push(s[p*3]),t.colors.push(s[p*3+1]),t.colors.push(s[p*3+2])),e.material&&e.material.mappingType!=="AllSame"&&(t.materialIndex.push(i),t.materialIndex.push(i),t.materialIndex.push(i)),e.normal&&(t.normal.push(r[f*3]),t.normal.push(r[f*3+1]),t.normal.push(r[f*3+2]),t.normal.push(r[d*3]),t.normal.push(r[d*3+1]),t.normal.push(r[d*3+2]),t.normal.push(r[p*3]),t.normal.push(r[p*3+1]),t.normal.push(r[p*3+2])),e.uv&&e.uv.forEach(function(m,g){t.uvs[g]===void 0&&(t.uvs[g]=[]),t.uvs[g].push(a[g][f*2]),t.uvs[g].push(a[g][f*2+1]),t.uvs[g].push(a[g][d*2]),t.uvs[g].push(a[g][d*2+1]),t.uvs[g].push(a[g][p*2]),t.uvs[g].push(a[g][p*2+1])})}addMorphTargets(t,e,n,i){if(n.length===0)return;t.morphTargetsRelative=!0,t.morphAttributes.position=[];let r=this;n.forEach(function(s){s.rawTargets.forEach(function(a){let l=O.Objects.Geometry[a.geoID];l!==void 0&&r.genMorphGeometry(t,e,l,i,a.name)})})}genMorphGeometry(t,e,n,i,r){let s=e.Vertices!==void 0?e.Vertices.a:[],a=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],l=n.Vertices!==void 0?n.Vertices.a:[],c=n.Indexes!==void 0?n.Indexes.a:[],h=t.attributes.position.count*3,u=new Float32Array(h);for(let m=0;m<c.length;m++){let g=c[m]*3;u[g]=l[m*3],u[g+1]=l[m*3+1],u[g+2]=l[m*3+2]}let f={vertexIndices:a,vertexPositions:u,baseVertexPositions:s},d=this.genBuffers(f),p=new tt(d.vertex,3);p.name=r||n.attrName,p.applyMatrix4(i),t.morphAttributes.position.push(p)}parseNormals(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,i=t.Normals.a,r=[];return n==="IndexToDirect"&&("NormalIndex"in t?r=t.NormalIndex.a:"NormalsIndex"in t&&(r=t.NormalsIndex.a)),{dataSize:3,buffer:i,indices:r,mappingType:e,referenceType:n}}parseUVs(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,i=t.UV.a,r=[];return n==="IndexToDirect"&&(r=t.UVIndex.a),{dataSize:2,buffer:i,indices:r,mappingType:e,referenceType:n}}parseVertexColors(t){let e=t.MappingInformationType,n=t.ReferenceInformationType,i=t.Colors.a,r=[];n==="IndexToDirect"&&(r=t.ColorIndex.a);for(let s=0,a=new B;s<i.length;s+=4)a.fromArray(i,s),Y.toWorkingColorSpace(a,G),a.toArray(i,s);return{dataSize:4,buffer:i,indices:r,mappingType:e,referenceType:n}}parseMaterialIndices(t){let e=t.MappingInformationType,n=t.ReferenceInformationType;if(e==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};let i=t.Materials.a,r=[];for(let s=0;s<i.length;++s)r.push(s);return{dataSize:1,buffer:i,indices:r,mappingType:e,referenceType:n}}parseNurbsGeometry(t){let e=parseInt(t.Order);if(isNaN(e))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",t.Order,t.id),new Dt;let n=e-1,i=t.KnotVector.a,r=[],s=t.Points.a;for(let u=0,f=s.length;u<f;u+=4)r.push(new q().fromArray(s,u));let a,l;if(t.Form==="Closed")r.push(r[0]);else if(t.Form==="Periodic"){a=n,l=i.length-1-a;for(let u=0;u<n;++u)r.push(r[u])}let h=new yr(n,i,r,a,l).getPoints(r.length*12);return new Dt().setFromPoints(h)}},wo=class{parse(){let t=[],e=this.parseClips();if(e!==void 0)for(let n in e){let i=e[n],r=this.addClip(i);t.push(r)}return t}parseClips(){if(O.Objects.AnimationCurve===void 0)return;let t=this.parseAnimationCurveNodes();this.parseAnimationCurves(t);let e=this.parseAnimationLayers(t);return this.parseAnimStacks(e)}parseAnimationCurveNodes(){let t=O.Objects.AnimationCurveNode,e=new Map;for(let n in t){let i=t[n];if(i.attrName.match(/S|R|T|DeformPercent/)!==null){let r={id:i.id,attr:i.attrName,curves:{}};e.set(r.id,r)}}return e}parseAnimationCurves(t){let e=O.Objects.AnimationCurve;for(let n in e){let i={id:e[n].id,times:e[n].KeyTime.a.map(Vp),values:e[n].KeyValueFloat.a},r=J.get(i.id);if(r!==void 0){let s=r.parents[0].ID,a=r.parents[0].relationship;a.match(/X/)?t.get(s).curves.x=i:a.match(/Y/)?t.get(s).curves.y=i:a.match(/Z/)?t.get(s).curves.z=i:a.match(/DeformPercent/)&&t.has(s)&&(t.get(s).curves.morph=i)}}}parseAnimationLayers(t){let e=O.Objects.AnimationLayer,n=new Map;for(let i in e){let r=[],s=J.get(parseInt(i));s!==void 0&&(s.children.forEach(function(l,c){if(t.has(l.ID)){let h=t.get(l.ID);if(h.curves.x!==void 0||h.curves.y!==void 0||h.curves.z!==void 0){if(r[c]===void 0){let u=J.get(l.ID).parents.filter(function(f){return f.relationship!==void 0})[0].ID;if(u!==void 0){let f=O.Objects.Model[u.toString()];if(f===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}let d={modelName:f.attrName?H.sanitizeNodeName(f.attrName):"",ID:f.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};ut.traverse(function(p){p.ID===f.id&&(d.transform=p.matrix,p.userData.transformData&&(d.eulerOrder=p.userData.transformData.eulerOrder))}),d.transform||(d.transform=new D),"PreRotation"in f&&(d.preRotation=f.PreRotation.value),"PostRotation"in f&&(d.postRotation=f.PostRotation.value),r[c]=d}}r[c]&&(r[c][h.attr]=h)}else if(h.curves.morph!==void 0){if(r[c]===void 0){let u=J.get(l.ID).parents.filter(function(v){return v.relationship!==void 0})[0].ID,f=J.get(u).parents[0].ID,d=J.get(f).parents[0].ID,p=J.get(d).parents[0].ID,m=O.Objects.Model[p],g={modelName:m.attrName?H.sanitizeNodeName(m.attrName):"",morphName:O.Objects.Deformer[u].attrName};r[c]=g}r[c][h.attr]=h}}}),n.set(parseInt(i),r))}return n}parseAnimStacks(t){let e=O.Objects.AnimationStack,n={};for(let i in e){let r=J.get(parseInt(i)).children;r.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");let s=t.get(r[0].ID);n[i]={name:e[i].attrName,layer:s}}return n}addClip(t){let e=[],n=this;return t.layer.forEach(function(i){e=e.concat(n.generateTracks(i))}),new cr(t.name,-1,e)}generateTracks(t){let e=[],n=new y,i=new y;if(t.transform&&t.transform.decompose(n,new Z,i),n=n.toArray(),i=i.toArray(),t.T!==void 0&&Object.keys(t.T.curves).length>0){let r=this.generateVectorTrack(t.modelName,t.T.curves,n,"position");r!==void 0&&e.push(r)}if(t.R!==void 0&&Object.keys(t.R.curves).length>0){let r=this.generateRotationTrack(t.modelName,t.R.curves,t.preRotation,t.postRotation,t.eulerOrder);r!==void 0&&e.push(r)}if(t.S!==void 0&&Object.keys(t.S.curves).length>0){let r=this.generateVectorTrack(t.modelName,t.S.curves,i,"scale");r!==void 0&&e.push(r)}if(t.DeformPercent!==void 0){let r=this.generateMorphTrack(t);r!==void 0&&e.push(r)}return e}generateVectorTrack(t,e,n,i){let r=this.getTimesForAllAxes(e),s=this.getKeyframeTrackValues(r,e,n);return new _e(t+"."+i,r,s)}generateRotationTrack(t,e,n,i,r){let s,a;if(e.x!==void 0&&e.y!==void 0&&e.z!==void 0){let f=this.interpolateRotations(e.x,e.y,e.z,r);s=f[0],a=f[1]}let l=ti(0);n!==void 0&&(n=n.map(ct.degToRad),n.push(l),n=new lt().fromArray(n),n=new Z().setFromEuler(n)),i!==void 0&&(i=i.map(ct.degToRad),i.push(l),i=new lt().fromArray(i),i=new Z().setFromEuler(i).invert());let c=new Z,h=new lt,u=[];if(!a||!s)return new ne(t+".quaternion",[0],[0]);for(let f=0;f<a.length;f+=3)h.set(a[f],a[f+1],a[f+2],r),c.setFromEuler(h),n!==void 0&&c.premultiply(n),i!==void 0&&c.multiply(i),f>2&&new Z().fromArray(u,(f-3)/3*4).dot(c)<0&&c.set(-c.x,-c.y,-c.z,-c.w),c.toArray(u,f/3*4);return new ne(t+".quaternion",s,u)}generateMorphTrack(t){let e=t.DeformPercent.curves.morph,n=e.values.map(function(r){return r/100}),i=ut.getObjectByName(t.modelName).morphTargetDictionary[t.morphName];return new ve(t.modelName+".morphTargetInfluences["+i+"]",e.times,n)}getTimesForAllAxes(t){let e=[];if(t.x!==void 0&&(e=e.concat(t.x.times)),t.y!==void 0&&(e=e.concat(t.y.times)),t.z!==void 0&&(e=e.concat(t.z.times)),e=e.sort(function(n,i){return n-i}),e.length>1){let n=1,i=e[0];for(let r=1;r<e.length;r++){let s=e[r];s!==i&&(e[n]=s,i=s,n++)}e=e.slice(0,n)}return e}getKeyframeTrackValues(t,e,n){let i=n,r=[],s=-1,a=-1,l=-1;return t.forEach(function(c){if(e.x&&(s=e.x.times.indexOf(c)),e.y&&(a=e.y.times.indexOf(c)),e.z&&(l=e.z.times.indexOf(c)),s!==-1){let h=e.x.values[s];r.push(h),i[0]=h}else r.push(i[0]);if(a!==-1){let h=e.y.values[a];r.push(h),i[1]=h}else r.push(i[1]);if(l!==-1){let h=e.z.values[l];r.push(h),i[2]=h}else r.push(i[2])}),r}interpolateRotations(t,e,n,i){let r=[],s=[];r.push(t.times[0]),s.push(ct.degToRad(t.values[0])),s.push(ct.degToRad(e.values[0])),s.push(ct.degToRad(n.values[0]));for(let a=1;a<t.values.length;a++){let l=[t.values[a-1],e.values[a-1],n.values[a-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;let c=l.map(ct.degToRad),h=[t.values[a],e.values[a],n.values[a]];if(isNaN(h[0])||isNaN(h[1])||isNaN(h[2]))continue;let u=h.map(ct.degToRad),f=[h[0]-l[0],h[1]-l[1],h[2]-l[2]],d=[Math.abs(f[0]),Math.abs(f[1]),Math.abs(f[2])];if(d[0]>=180||d[1]>=180||d[2]>=180){let m=Math.max(...d)/180,g=new lt(...c,i),v=new lt(...u,i),w=new Z().setFromEuler(g),x=new Z().setFromEuler(v);w.dot(x)&&x.set(-x.x,-x.y,-x.z,-x.w);let _=t.times[a-1],E=t.times[a]-_,S=new Z,T=new lt;for(let A=0;A<1;A+=1/m)S.copy(w.clone().slerp(x.clone(),A)),r.push(_+A*E),T.setFromQuaternion(S,i),s.push(T.x),s.push(T.y),s.push(T.z)}else r.push(t.times[a]),s.push(ct.degToRad(t.values[a])),s.push(ct.degToRad(e.values[a])),s.push(ct.degToRad(n.values[a]))}return[r,s]}},bo=class{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(t){this.nodeStack.push(t),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(t,e){this.currentProp=t,this.currentPropName=e}parse(t){this.currentIndent=0,this.allNodes=new Mr,this.nodeStack=[],this.currentProp=[],this.currentPropName="";let e=this,n=t.split(/[\r\n]+/);return n.forEach(function(i,r){let s=i.match(/^[\s\t]*;/),a=i.match(/^[\s\t]*$/);if(s||a)return;let l=i.match("^\\t{"+e.currentIndent+"}(\\w+):(.*){",""),c=i.match("^\\t{"+e.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),h=i.match("^\\t{"+(e.currentIndent-1)+"}}");l?e.parseNodeBegin(i,l):c?e.parseNodeProperty(i,c,n[++r]):h?e.popStack():i.match(/^[^\s\t}]/)&&e.parseNodePropertyContinued(i)}),this.allNodes}parseNodeBegin(t,e){let n=e[1].trim().replace(/^"/,"").replace(/"$/,""),i=e[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),r={name:n},s=this.parseNodeAttr(i),a=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,r):n in a?(n==="PoseNode"?a.PoseNode.push(r):a[n].id!==void 0&&(a[n]={},a[n][a[n].id]=a[n]),s.id!==""&&(a[n][s.id]=r)):typeof s.id=="number"?(a[n]={},a[n][s.id]=r):n!=="Properties70"&&(n==="PoseNode"?a[n]=[r]:a[n]=r),typeof s.id=="number"&&(r.id=s.id),s.name!==""&&(r.attrName=s.name),s.type!==""&&(r.attrType=s.type),this.pushStack(r)}parseNodeAttr(t){let e=t[0];t[0]!==""&&(e=parseInt(t[0]),isNaN(e)&&(e=t[0]));let n="",i="";return t.length>1&&(n=t[1].replace(/^(\w+)::/,""),i=t[2]),{id:e,name:n,type:i}}parseNodeProperty(t,e,n){let i=e[1].replace(/^"/,"").replace(/"$/,"").trim(),r=e[2].replace(/^"/,"").replace(/"$/,"").trim();i==="Content"&&r===","&&(r=n.replace(/"/g,"").replace(/,$/,"").trim());let s=this.getCurrentNode();if(s.name==="Properties70"){this.parseNodeSpecialProperty(t,i,r);return}if(i==="C"){let l=r.split(",").slice(1),c=parseInt(l[0]),h=parseInt(l[1]),u=r.split(",").slice(3);u=u.map(function(f){return f.trim().replace(/^"/,"")}),i="connections",r=[c,h],Gp(r,u),s[i]===void 0&&(s[i]=[])}i==="Node"&&(s.id=r),i in s&&Array.isArray(s[i])?s[i].push(r):i!=="a"?s[i]=r:s.a=r,this.setCurrentProp(s,i),i==="a"&&r.slice(-1)!==","&&(s.a=xo(r))}parseNodePropertyContinued(t){let e=this.getCurrentNode();e.a+=t,t.slice(-1)!==","&&(e.a=xo(e.a))}parseNodeSpecialProperty(t,e,n){let i=n.split('",').map(function(h){return h.trim().replace(/^\"/,"").replace(/\s/,"_")}),r=i[0],s=i[1],a=i[2],l=i[3],c=i[4];switch(s){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=xo(c);break}this.getPrevNode()[r]={type:s,type2:a,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),r)}},So=class{parse(t){let e=new _r(t);e.skip(23);let n=e.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);let i=new Mr;for(;!this.endOfContent(e);){let r=this.parseNode(e,n);r!==null&&i.add(r.name,r)}return i}endOfContent(t){return t.size()%16===0?(t.getOffset()+160+16&-16)>=t.size():t.getOffset()+160+16>=t.size()}parseNode(t,e){let n={},i=e>=7500?t.getUint64():t.getUint32(),r=e>=7500?t.getUint64():t.getUint32();e>=7500?t.getUint64():t.getUint32();let s=t.getUint8(),a=t.getString(s);if(i===0)return null;let l=[];for(let f=0;f<r;f++)l.push(this.parseProperty(t));let c=l.length>0?l[0]:"",h=l.length>1?l[1]:"",u=l.length>2?l[2]:"";for(n.singleProperty=r===1&&t.getOffset()===i;i>t.getOffset();){let f=this.parseNode(t,e);f!==null&&this.parseSubNode(a,n,f)}return n.propertyList=l,typeof c=="number"&&(n.id=c),h!==""&&(n.attrName=h),u!==""&&(n.attrType=u),a!==""&&(n.name=a),n}parseSubNode(t,e,n){if(n.singleProperty===!0){let i=n.propertyList[0];Array.isArray(i)?(e[n.name]=n,n.a=i):e[n.name]=i}else if(t==="Connections"&&n.name==="C"){let i=[];n.propertyList.forEach(function(r,s){s!==0&&i.push(r)}),e.connections===void 0&&(e.connections=[]),e.connections.push(i)}else if(n.name==="Properties70")Object.keys(n).forEach(function(r){e[r]=n[r]});else if(t==="Properties70"&&n.name==="P"){let i=n.propertyList[0],r=n.propertyList[1],s=n.propertyList[2],a=n.propertyList[3],l;i.indexOf("Lcl ")===0&&(i=i.replace("Lcl ","Lcl_")),r.indexOf("Lcl ")===0&&(r=r.replace("Lcl ","Lcl_")),r==="Color"||r==="ColorRGB"||r==="Vector"||r==="Vector3D"||r.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],e[i]={type:r,type2:s,flag:a,value:l}}else e[n.name]===void 0?typeof n.id=="number"?(e[n.name]={},e[n.name][n.id]=n):e[n.name]=n:n.name==="PoseNode"?(Array.isArray(e[n.name])||(e[n.name]=[e[n.name]]),e[n.name].push(n)):e[n.name][n.id]===void 0&&(e[n.name][n.id]=n)}parseProperty(t){let e=t.getString(1),n;switch(e){case"C":return t.getBoolean();case"D":return t.getFloat64();case"F":return t.getFloat32();case"I":return t.getInt32();case"L":return t.getInt64();case"R":return n=t.getUint32(),t.getArrayBuffer(n);case"S":return n=t.getUint32(),t.getString(n);case"Y":return t.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":let i=t.getUint32(),r=t.getUint32(),s=t.getUint32();if(r===0)switch(e){case"b":case"c":return t.getBooleanArray(i);case"d":return t.getFloat64Array(i);case"f":return t.getFloat32Array(i);case"i":return t.getInt32Array(i);case"l":return t.getInt64Array(i)}let a=Yl(new Uint8Array(t.getArrayBuffer(s))),l=new _r(a.buffer);switch(e){case"b":case"c":return l.getBooleanArray(i);case"d":return l.getFloat64Array(i);case"f":return l.getFloat32Array(i);case"i":return l.getInt32Array(i);case"l":return l.getInt64Array(i)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+e)}}},_r=class{constructor(t,e){this.dv=new DataView(t),this.offset=0,this.littleEndian=e!==void 0?e:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(t){this.offset+=t}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(t){let e=[];for(let n=0;n<t;n++)e.push(this.getBoolean());return e}getUint8(){let t=this.dv.getUint8(this.offset);return this.offset+=1,t}getInt16(){let t=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,t}getInt32(){let t=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,t}getInt32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getInt32());return e}getUint32(){let t=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,t}getInt64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e&2147483648?(e=~e&4294967295,t=~t&4294967295,t===4294967295&&(e=e+1&4294967295),t=t+1&4294967295,-(e*4294967296+t)):e*4294967296+t}getInt64Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getInt64());return e}getUint64(){let t,e;return this.littleEndian?(t=this.getUint32(),e=this.getUint32()):(e=this.getUint32(),t=this.getUint32()),e*4294967296+t}getFloat32(){let t=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,t}getFloat32Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getFloat32());return e}getFloat64(){let t=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,t}getFloat64Array(t){let e=[];for(let n=0;n<t;n++)e.push(this.getFloat64());return e}getArrayBuffer(t){let e=this.dv.buffer.slice(this.offset,this.offset+t);return this.offset+=t,e}getString(t){let e=this.offset,n=new Uint8Array(this.dv.buffer,e,t);this.skip(t);let i=n.indexOf(0);return i>=0&&(n=new Uint8Array(this.dv.buffer,e,i)),this._textDecoder.decode(n)}},Mr=class{add(t,e){this[t]=e}};function kp(o){let t="Kaydara FBX Binary  \0";return o.byteLength>=t.length&&t===tc(o,0,t.length)}function zp(o){let t=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"],e=0;function n(i){let r=o[i-1];return o=o.slice(e+i),e++,r}for(let i=0;i<t.length;++i)if(n(1)===t[i])return!1;return!0}function Kl(o){let t=/FBXVersion: (\d+)/,e=o.match(t);if(e)return parseInt(e[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function Vp(o){return o/46186158e3}var Hp=[];function vr(o,t,e,n){let i;switch(n.mappingType){case"ByPolygonVertex":i=o;break;case"ByPolygon":i=t;break;case"ByVertice":i=e;break;case"AllSame":i=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(i=n.indices[i]);let r=i*n.dataSize,s=r+n.dataSize;return Wp(Hp,n.buffer,r,s)}var vo=new lt,Mn=new y;function Ql(o){let t=new D,e=new D,n=new D,i=new D,r=new D,s=new D,a=new D,l=new D,c=new D,h=new D,u=new D,f=new D,d=o.inheritType?o.inheritType:0;o.translation&&t.setPosition(Mn.fromArray(o.translation));let p=ti(0);if(o.preRotation){let U=o.preRotation.map(ct.degToRad);U.push(p),e.makeRotationFromEuler(vo.fromArray(U))}if(o.rotation){let U=o.rotation.map(ct.degToRad);U.push(o.eulerOrder||p),n.makeRotationFromEuler(vo.fromArray(U))}if(o.postRotation){let U=o.postRotation.map(ct.degToRad);U.push(p),i.makeRotationFromEuler(vo.fromArray(U)),i.invert()}o.scale&&r.scale(Mn.fromArray(o.scale)),o.scalingOffset&&a.setPosition(Mn.fromArray(o.scalingOffset)),o.scalingPivot&&s.setPosition(Mn.fromArray(o.scalingPivot)),o.rotationOffset&&l.setPosition(Mn.fromArray(o.rotationOffset)),o.rotationPivot&&c.setPosition(Mn.fromArray(o.rotationPivot)),o.parentMatrixWorld&&(u.copy(o.parentMatrix),h.copy(o.parentMatrixWorld));let m=e.clone().multiply(n).multiply(i),g=new D;g.extractRotation(h);let v=new D;v.copyPosition(h);let w=v.clone().invert().multiply(h),x=g.clone().invert().multiply(w),_=r,E=new D;if(d===0)E.copy(g).multiply(m).multiply(x).multiply(_);else if(d===1)E.copy(g).multiply(x).multiply(m).multiply(_);else{let K=new D().scale(new y().setFromMatrixScale(u)).clone().invert(),W=x.clone().multiply(K);E.copy(g).multiply(m).multiply(W).multiply(_)}let S=c.clone().invert(),T=s.clone().invert(),A=t.clone().multiply(l).multiply(c).multiply(e).multiply(n).multiply(i).multiply(S).multiply(a).multiply(s).multiply(r).multiply(T),I=new D().copyPosition(A),z=h.clone().multiply(I);return f.copyPosition(z),A=f.clone().multiply(E),A.premultiply(h.invert()),A}function ti(o){o=o||0;let t=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return o===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),t[0]):t[o]}function xo(o){return o.split(",").map(function(e){return parseFloat(e)})}function tc(o,t,e){return t===void 0&&(t=0),e===void 0&&(e=o.byteLength),new TextDecoder().decode(new Uint8Array(o,t,e))}function Gp(o,t){for(let e=0,n=o.length,i=t.length;e<i;e++,n++)o[n]=t[e]}function Wp(o,t,e,n){for(let i=e,r=0;i<n;i++,r++)o[r]=t[i];return o}var bn=new URLSearchParams(location.search),Xp=/OculusBrowser|Quest/i.test(navigator.userAgent),wt=o=>document.getElementById(o),fc=window.__cf3||{},Fr=fc.Vector3||function(){},wr=new Fr,br=new Fr,yt=new Fr,ei=new Fr,Gt=null,Io=null,ri=null,si=0,oi=new Set,Sr=new Uint8Array(256),Tr=!1,Eo=!1,Xt=!0,ec=!1,Ar=null,nc=!1,ic="",qp=bn.has("halfduplex")?bn.get("halfduplex")!=="0":Xp,Ct={sent:0,sentAt:0,rxAudio:0,micError:""},Po=0,ai=null,Lo=new Set,ke=null,ni=null,Do=new Audio;Do.autoplay=!0;var $p={onMic(o){return ai&&o(ai),Lo.add(o),()=>Lo.delete(o)},onVoice(o){if(Do.srcObject=o,ni&&ni.disconnect(),ni=null,ke=null,!o)return;Ct.rxAudio++,Do.play().catch(()=>{});let t=wn();ni=t.createMediaStreamSource(o),ke=t.createAnalyser(),ke.fftSize=512,ni.connect(ke)}};function rc(){try{return localStorage.getItem("simulacra.openaiKey")||""}catch{return""}}function wn(){return Gt||(Gt=new(window.AudioContext||window.webkitAudioContext),Io=Gt.createGain(),ri=Gt.createAnalyser(),ri.fftSize=512,Io.connect(ri),ri.connect(Gt.destination)),Gt.state==="suspended"&&Gt.resume(),Gt}function Yp(o){let t=wn(),e=t.createBuffer(1,o.length,An.AUDIO_RATE),n=e.getChannelData(0);for(let r=0;r<o.length;r++)n[r]=o[r]/32768;let i=t.createBufferSource();i.buffer=e,i.connect(Io),si=Math.max(si,t.currentTime+.04),i.start(si),si+=e.duration,oi.add(i),i.onended=()=>oi.delete(i),Ct.rxAudio++}function Zp(){for(let o of oi)try{o.stop()}catch{}oi.clear(),si=0}function jp(){let o=ke||(oi.size>0?ri:null);if(!o)return 0;o.getByteTimeDomainData(Sr);let t=0;for(let e=0;e<Sr.length;e++){let n=(Sr[e]-128)/128;t+=n*n}return Math.min(1,Math.sqrt(t/Sr.length)*5)}function Lr(o){return o.renderer.xr.isPresenting?o.renderer.xr.getCamera():o.camera}var st=null,Wt=null,Be=0,Jp={send:o=>{st&&st.readyState===WebSocket.OPEN&&st.send(o)},headPosition:()=>(Lr(Dr).getWorldPosition(wr),Ee(wr.x,wr.y,wr.z)),headForward:()=>(Lr(Dr).getWorldDirection(br),Ee(br.x,br.y,br.z)),floorY:()=>0,isFloor:()=>!0,pointerHit:()=>null,playAudio:Yp,stopAudio:Zp,log:o=>console.log(o),roomInfo:()=>({source:"crownfall",obstacles:0})},N=new An(Jp,"crownfall"),Dr={scene:null,camera:null,renderer:null,board:null,dt:.016};function Kp(o){let t=String(o||"").trim().replace(/\/$/,"");return t?t.endsWith("/device")?t:t+"/device":""}function Qp(){let o=bn.get("backend");if(o)return o;try{let t=localStorage.getItem("simulacra-backend");if(t)return t}catch{}return/github\.io$/i.test(location.hostname)?"":(location.protocol==="https:"?"wss://":"ws://")+location.host}function sc(o){let t=++Be;if(Wt){try{Wt.close()}catch{}Wt=null}if(st&&st.close){st.onclose=null;try{st.close()}catch{}}bt("Starting her voice in this game\u2026");try{Wt=Sa(o,n=>{t===Be&&N.onMessage(n)},$p,bn.get("mind")==="audio"?"audio":"realtime")}catch(n){bt("Her voice could not start. "+(n&&n.message?n.message:n));return}st={readyState:WebSocket.OPEN,send:n=>Wt&&Wt.send(n),close:()=>{}},N.onOpen();let e=wt("companion-link");e&&(e.hidden=!0)}function Cr(o){let t=Kp(o);if(!t){bt("She is beside the board. Paste an OpenAI key, or a laptop address.");return}let e=++Be;if(Wt){try{Wt.close()}catch{}Wt=null}if(st){st.onclose=null;try{st.close()}catch{}}bt("Connecting the companion\u2026"),st=new WebSocket(t),st.onopen=()=>{if(e!==Be)return;N.onOpen(),bt("Companion connected.");let n=wt("companion-link");n&&(n.hidden=!0)},st.onmessage=n=>{typeof n.data=="string"&&e===Be&&N.onMessage(n.data)},st.onclose=()=>{e===Be&&(N.onClose(),bt("Companion disconnected. Retrying\u2026"),setTimeout(()=>{e===Be&&Cr(o)},2e3))},st.onerror=()=>{}}function bt(o){let t=N.lastTranscript?`
`+N.lastTranscript:"",e=Xt?" Mic is quiet. Press A on the right controller, or Talk.":" Listening.",n=o+(N.connected?e:"")+t;if(n===ic)return;ic=n;let i=wt("companion-status");i&&(i.textContent=n)}function Uo(){if(ai)for(let o of ai.getAudioTracks())o.enabled=!Xt}async function Rr(){if(Tr||Eo)return Tr;Eo=!0;try{let o=wn(),t=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!0,noiseSuppression:!0,channelCount:1}}),e="class P extends AudioWorkletProcessor{process(i){const c=i[0][0];if(c)this.port.postMessage(c.slice(0));return true}}registerProcessor('crownfall-mic',P)";await o.audioWorklet.addModule(URL.createObjectURL(new Blob([e],{type:"text/javascript"})));let n=new AudioWorkletNode(o,"crownfall-mic");n.port.onmessage=i=>{let r=i.data,s=0;for(let a=0;a<r.length;a++)s+=r[a]*r[a];Po=Math.max(Math.sqrt(s/r.length),Po*.9),Ct.sent++,Ct.sentAt=performance.now(),N.pushMic(r,r.length,o.sampleRate)},o.createMediaStreamSource(t).connect(n),ai=t,Uo();for(let i of Lo)i(t);return Tr=!0,!0}catch(o){return Ct.micError=o&&o.message?o.message:String(o),bt("Microphone unavailable. You can still type to her."),!1}finally{Eo=!1}}function tm(o){let t=o.xr.getSession&&o.xr.getSession();if(!t)return;let e=!1;for(let n of t.inputSources){if(n.handedness!=="right")continue;let i=n.gamepad,r=i&&i.buttons.length>4?i.buttons[4]:null;r&&r.pressed&&(e=!0)}e&&!ec&&(Xt=!Xt,Uo(),Xt||Rr(),bt(Xt?"Companion muted.":"Companion listening.")),ec=e}var oc={hips:["bip01 pelvis","hips"],head:["bip01 head","head"],lUpperArm:["bip01 l upperarm","leftarm"],lForearm:["bip01 l forearm","leftforearm"],rUpperArm:["bip01 r upperarm","rightarm"],rForearm:["bip01 r forearm","rightforearm"],lThigh:["bip01 l thigh","leftupleg"],lCalf:["bip01 l calf","leftleg"],lFoot:["bip01 l foot","leftfoot"],rThigh:["bip01 r thigh","rightupleg"],rCalf:["bip01 r calf","rightleg"],rFoot:["bip01 r foot","rightfoot"]},em=o=>{let t=String(o).toLowerCase().replace(/_/g," ").replace(/\s+/g," ").trim(),e=t.lastIndexOf(":");return e>=0&&(t=t.substring(e+1)),t.replace(/^mixamorig/,"")},R={root:null,ready:!1,bones:{},rest:{},leg:.85,phase:0,walk:0,headYaw:0,headPitch:0,gesture:"",gestureT:0,jaw:[],blink:[],blinkAt:2,jawNow:0,kind:"none"},ac=new Z,lc=new Z,Ir=new y(0,1,0),Ur="Loading the companion.",Er=null;function nm(o,t){o.parent.getWorldQuaternion(lc),o.quaternion.copy(lc.invert().multiply(t)),o.updateMatrixWorld(!0)}function rt(o,t,e){let n=R.bones[o];!n||e===0||(n.getWorldQuaternion(ac),nm(n,new Z().setFromAxisAngle(t,e).multiply(ac)))}function cc(o,t,e){let n=R.bones[o],i=R.bones[t];if(!n||!i)return;let r=i.getWorldPosition(new y).sub(n.getWorldPosition(new y)).normalize(),s=new y(e.x*.13,-1,e.z*.13).normalize(),a=new y().crossVectors(r,s),l=a.length();l<1e-4||rt(o,a.normalize(),Math.atan2(l,r.dot(s)))}function im(o){let t={};o.traverse(s=>{let a=em(s.name);if(a in t||(t[a]=s),s.isMesh&&(s.frustumCulled=!1,s.raycast=()=>{},s.morphTargetDictionary))for(let l in s.morphTargetDictionary){let c=l.toLowerCase();c.includes("jawopen")?R.jaw.push([s,s.morphTargetDictionary[l]]):(c.includes("eyeblinkleft")||c.includes("eyeblinkright"))&&R.blink.push([s,s.morphTargetDictionary[l]])}});for(let s in oc)for(let a of oc[s])t[a]&&!R.bones[s]&&(R.bones[s]=t[a]);R.root.add(o),o.updateMatrixWorld(!0);let e=R.bones,n=s=>s.getWorldPosition(new y);if(e.head&&e.lFoot){let s=n(e.head).sub(n(e.lFoot));Math.abs(s.z)>Math.abs(s.y)?o.rotation.x+=s.z>0?-Math.PI/2:Math.PI/2:s.y<0&&(o.rotation.x+=Math.PI),o.updateMatrixWorld(!0)}if(e.lThigh&&e.rThigh){let s=n(e.rThigh).sub(n(e.lThigh)),a=new y().crossVectors(Ir,s);o.rotation.y-=Math.atan2(a.x,a.z),o.updateMatrixWorld(!0)}let i=new Vt().setFromObject(o,!0),r=i.max.y-i.min.y;r>.01&&o.scale.multiplyScalar(1.7/r),o.updateMatrixWorld(!0),i.setFromObject(o,!0),o.position.x-=(i.min.x+i.max.x)/2,o.position.z-=(i.min.z+i.max.z)/2,o.position.y-=i.min.y,o.updateMatrixWorld(!0);for(let s in e)R.rest[s]=e[s].quaternion.clone();if(R.ready=!!(e.lThigh&&e.rThigh&&e.lCalf&&e.rCalf),R.ready&&e.lFoot){let s=n(e.lThigh).distanceTo(n(e.lCalf))+n(e.lCalf).distanceTo(n(e.lFoot));s>.3&&s<1.4&&(R.leg=s)}R.kind="rocketbox",Ur=""}function hc(){let o=new ge,t=new Oe({color:7311285,roughness:.8}),e=(n,i)=>{let r=new me(n,t);return r.position.y=i,r.raycast=()=>{},o.add(r),r};e(new mn(.17,.5,6,16),1.12),e(new or(.115,20,16),1.6),e(new mn(.075,.68,4,12),.42).position.x=-.1,e(new mn(.075,.68,4,12),.42).position.x=.1,R.root.add(o),R.kind="placeholder",Ur="The companion model did not load."}function rm(){let o=new URL("./avatar/",import.meta.url),t=new vn,e=(i,r)=>{let s=t.load(new URL(i,o).href);return r&&(s.colorSpace=G),s},n=new Zn;n.setURLModifier(i=>/\.fbx$/i.test(i)?i:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),new xr(n).load(new URL("RocketboxAdult.fbx",o).href,i=>{try{let r={},s=a=>{let l=String(a.name||"").toLowerCase();if(r[l])return r[l];let c;return l.includes("opacity")?c=new Oe({map:e("f006_opacity_color.png",!0),transparent:!0,alphaTest:.35,side:Cl,roughness:.75}):l.includes("head")?c=new Oe({map:e("f006_head_color.png",!0),normalMap:e("f006_head_normal.png",!1),roughness:.7}):c=new Oe({map:e("f006_body_color.png",!0),normalMap:e("f006_body_normal.png",!1),roughness:.8}),c.name=a.name,r[l]=c,c};i.traverse(a=>{a.isMesh&&(a.material=Array.isArray(a.material)?a.material.map(s):s(a.material))}),im(i)}catch(r){console.warn("avatar setup failed",r),hc()}},void 0,i=>{console.warn("avatar failed to load",i),hc()})}function sm(o,t,e){if(!R.ready)return;let n=N.avatar;n.gesture&&(R.gesture=n.gesture,R.gestureT=0);let i=jp();R.jawNow+=(i-R.jawNow)*Math.min(1,o*18);for(let[m,g]of R.jaw)m.morphTargetInfluences[g]=R.jawNow*.8;R.blinkAt-=o;let r=R.blinkAt<.12?1:0;R.blinkAt<0&&(R.blinkAt=2.5+Math.random()*3);for(let[m,g]of R.blink)m.morphTargetInfluences[g]=r;for(let m in R.bones)R.bones[m].quaternion.copy(R.rest[m]);R.root.updateMatrixWorld(!0);let s=new y(Math.sin(n.yaw),0,-Math.cos(n.yaw)),a=new y().crossVectors(s,Ir).normalize(),l=a.clone().negate();cc("lUpperArm","lForearm",l),cc("rUpperArm","rForearm",a),rt("lForearm",a,.24),rt("rForearm",a,.24);let c=n.speed01>.06?1:0;R.walk+=Math.max(-o*4,Math.min(o*4,c-R.walk));let h=.42*Math.max(.35,Math.min(1.2,n.speed01));R.phase+=2*Math.PI*t/Math.max(.25,4*R.leg*Math.sin(h));let u=Math.sin(R.phase),f=Math.cos(R.phase);rt("lThigh",a,u*h*R.walk),rt("rThigh",a,-u*h*R.walk),rt("lCalf",a,-Math.max(0,f)*.6*R.walk),rt("rCalf",a,-Math.max(0,-f)*.6*R.walk),rt("lUpperArm",a,-u*h*.6*R.walk),rt("rUpperArm",a,u*h*.6*R.walk);let d=0,p=0;if(R.gesture){R.gestureT+=o;let m=R.gestureT,g=Math.min(1,m*4)*Math.min(1,Math.max(0,(1.8-m)*4));R.gesture==="wave"?(rt("rUpperArm",s,-1.9*g),rt("rForearm",s,-(.9+Math.sin(m*11)*.4)*g)):R.gesture==="shrug"?(rt("lUpperArm",s,.35*g),rt("rUpperArm",s,-.35*g),rt("lForearm",a,.9*g),rt("rForearm",a,.9*g)):R.gesture==="nod"?d=Math.sin(m*9)*.22*g:R.gesture==="shake_head"&&(p=Math.sin(m*9)*.35*g),m>1.8&&(R.gesture="")}if(R.bones.head&&e){let m=R.bones.head.getWorldPosition(new y),v=Lr(e).getWorldPosition(new y).sub(m),w=Math.atan2(v.x,v.z)-Math.atan2(s.x,s.z);w=Math.atan2(Math.sin(w),Math.cos(w));let x=Math.atan2(v.y,Math.hypot(v.x,v.z));Math.abs(w)>1.3&&(w=0,x=0);let _=Math.min(1,o*6);R.headYaw+=(Math.max(-1,Math.min(1,w))*.75-R.headYaw)*_,R.headPitch+=(Math.max(-.4,Math.min(.4,x))*.7-R.headPitch)*_,rt("head",Ir,R.headYaw+p),rt("head",a.clone().applyAxisAngle(Ir,R.headYaw),R.headPitch-d)}}function om(o){o.updateWorldMatrix(!0,!0),ei.set(.85,0,.05),o.localToWorld(ei),ei.y=0,o.getWorldPosition(yt);let t=Ee(ei.x,0,ei.z),e=Ee(yt.x,0,yt.z);N.avatar.pos=t,N.avatar.yaw=Math.atan2(e.x-t.x,e.z-t.z),N.placed=!0,Ar={x:yt.x,z:yt.z},N.upsert("crownfall","board game",Ee(yt.x,yt.y,yt.z),{x:.5,y:.08,z:.5},"manual")}var ft=null,re=null,Pr=null,uc="",To=!1,Ao=0,Co=new y,ii=new y,Ro=new y;function am(){let o=Ct.sentAt?(performance.now()-Ct.sentAt)/1e3:null,t=Math.max(0,Math.min(10,Math.round(Po*18))),e="\u2588".repeat(t)+"\xB7".repeat(10-t),n=Tr?Xt?"muted  "+e:N.micMuted?"quiet while she talks  "+e:"LIVE  "+e:"OFF \u2014 press A or Talk",i=Ct.sent===0?"nothing sent yet":Ct.sent+" frames"+(o===null?"":", last "+o.toFixed(1)+"s ago");return["VOICE","link "+(N.connected?"connected":"down")+"   brain "+N.brain+"   sound "+(Gt?Gt.state:"off"),"mic  "+n,"out  "+i+"   voice back "+(ke?"live call":Ct.rxAudio+" packets"),N.lastTranscript||"you  (nothing heard yet)",N.lastAction?"do   "+N.lastAction:"do   (no action yet)",Ct.micError?"err  "+Ct.micError:N.lastError?"err  "+N.lastError:""].filter(Boolean).join(`
`)}function lm(o){if(!ft){let t=document.createElement("canvas");t.width=1024,t.height=768,re=t.getContext("2d"),Pr=new tr(t),G&&(Pr.colorSpace=G),ft=new me(new Yi(.7,.525),new Hn({map:Pr,transparent:!0,depthTest:!0})),ft.name="voice-debug",ft.renderOrder=11,ft.frustumCulled=!1}ft.parent!==o&&o.add(ft)}function cm(o,t,e){if(!(o.renderer.xr.isPresenting&&bn.get("log")!=="0")){To=!1,Ao=0,ft&&(ft.visible=!1);return}if(lm(o.scene),e!==uc&&(uc=e,re.clearRect(0,0,1024,768),re.fillStyle="rgba(10, 14, 18, 0.86)",re.beginPath(),re.roundRect(0,0,1024,768,28),re.fill(),re.font="30px ui-monospace, monospace",e.split(`
`).slice(0,16).forEach((i,r)=>{re.fillStyle=r===0?"#f4c06a":i.startsWith("err")||i.includes("failed")?"#ff8d7a":"#e7f0df",re.fillText(i.length>48?i.slice(0,47)+"\u2026":i,36,58+r*44)}),Pr.needsUpdate=!0),!To){if(Ao+=t,ft.visible=!1,Ao<.4)return;let i=Lr(o);if(i.getWorldPosition(Co),i.getWorldDirection(ii),ii.y=0,ii.lengthSq()<1e-6)return;ii.normalize(),ft.position.copy(Co).addScaledVector(ii,.9),ft.position.y-=.15,Ro.copy(Co),Ro.y=ft.position.y,ft.lookAt(Ro),To=!0}ft.visible=!0}function hm(o){Dr=o;let t=Math.min(.1,o.dt||.016);o.renderer.xr.isPresenting&&tm(o.renderer),N.micMuted=Xt||qp&&N.speakingFor>0&&!ke,N.lastAction&&/walk|follow|approach|stop/.test(N.lastAction)&&(nc=!0);let e=o.board;if(e&&e.visible){e.getWorldPosition(yt);let c=!Ar||Math.hypot(yt.x-Ar.x,yt.z-Ar.z)>.35;!nc&&(c||!N.placed)&&N.avatar.state==="idle"?om(e):N.upsert("crownfall","board game",Ee(yt.x,yt.y,yt.z),{x:.5,y:.08,z:.5},"manual")}else N.placed||N.placeInFrontOfUser(1.5);N.update(t);let n=N.avatar.pos,i=Er?Math.hypot(n.x-Er.x,n.z-Er.z):0;Er={x:n.x,z:n.z};let r=ca(n);R.root.visible=N.placed&&R.kind!=="none",R.root.position.set(r.x,r.y,r.z),R.root.rotation.y=Math.PI-N.avatar.yaw,R.root.updateMatrixWorld(!0),sm(t,i,o);let s=wt("companion-say");s&&(s.hidden=o.renderer.xr.isPresenting);let a=am();cm(o,t,a);let l=wt("companion-voice");l&&!o.renderer.xr.isPresenting&&(l.textContent=a),Ur?bt(Ur):N.connected?bt(N.brain&&N.brain!=="-"?"She is here \xB7 "+N.brain+".":"She is connected."):!st&&!Wt&&bt("She is beside the board. Paste an OpenAI key to talk.")}function um(){if(!fc.Group)return;R.root=new ge,R.root.name="simulacra",R.root.visible=!1,rm(),Dr.scene={add:()=>{}},window.__cfTick=c=>{R.root.parent!==c.scene&&c.scene.add(R.root),hm(c)};let o=Qp(),t=wt("companion-backend");t&&o&&(t.value=o);let e=wt("companion-link");e&&e.addEventListener("submit",c=>{c.preventDefault();let h=t?t.value.trim():"";if(h){try{localStorage.setItem("simulacra-backend",h)}catch{}Cr(h)}});let n=wt("companion-say");n&&n.addEventListener("submit",c=>{c.preventDefault(),wn();let h=wt("companion-text"),u=h?h.value.trim():"";u&&N.sendText(u),h&&(h.value="")});let i=wt("companion-talk");i&&i.addEventListener("click",()=>{Xt=!1,Uo(),Rr(),bt("Companion listening.")});let r=wt("companion-key"),s=wt("companion-key-input");r&&r.addEventListener("submit",c=>{c.preventDefault();let h=(s&&s.value||"").trim().replace(/^["']|["']$/g,"");if(h){try{localStorage.setItem("simulacra.openaiKey",h)}catch{}s&&(s.value=""),wn(),sc(h),Xt=!1,Rr()}});for(let c of["btn-ar","btn-vr","btn-play","btn-ar-mini","btn-vr-mini"]){let h=wt(c);h&&h.addEventListener("click",()=>{wn(),Rr()})}let a=bn.get("backend"),l=rc();a?Cr(a):l?sc(l):o?Cr(o):bt(rc()?"A key is saved.":"Paste an OpenAI key and she will talk to you in this game. A laptop address works too.")}um();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.8.2
  *)
*/
