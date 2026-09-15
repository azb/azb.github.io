const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index.esm-EA0joZX4.js","./index.esm-B_VX5gmd.js","./index.esm-BkVG1D2g.js","./index.esm-DqN5KfZ1.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nh="170",Oi={ROTATE:0,DOLLY:1,PAN:2},os={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Om=0,Jh=1,Fm=2,ih=1,Lf=2,wi=3,zi=0,mn=1,tn=2,hs=0,rr=1,Qh=2,eu=3,tu=4,Bm=5,Rs=100,km=101,Hm=102,zm=103,Vm=104,Gm=200,Wm=201,Xm=202,$m=203,Wc=204,Xc=205,Ym=206,jm=207,qm=208,Km=209,Zm=210,Jm=211,Qm=212,eg=213,tg=214,$c=0,Yc=1,jc=2,lr=3,qc=4,Kc=5,Zc=6,Jc=7,Df=0,ng=1,ig=2,us=0,sg=1,rg=2,og=3,If=4,ag=5,cg=6,lg=7,nu="attached",hg="detached",Nf=300,hr=301,ur=302,Qc=303,el=304,Da=306,ds=1e3,as=1001,Ma=1002,gn=1003,Uf=1004,jr=1005,Gt=1006,ua=1007,Di=1008,Vi=1009,Of=1010,Ff=1011,io=1012,sh=1013,Ls=1014,ei=1015,mo=1016,rh=1017,oh=1018,dr=1020,Bf=35902,kf=1021,Hf=1022,kn=1023,zf=1024,Vf=1025,or=1026,fr=1027,ah=1028,ch=1029,Gf=1030,lh=1031,hh=1033,da=33776,fa=33777,pa=33778,ma=33779,tl=35840,nl=35841,il=35842,sl=35843,rl=36196,ol=37492,al=37496,cl=37808,ll=37809,hl=37810,ul=37811,dl=37812,fl=37813,pl=37814,ml=37815,gl=37816,_l=37817,yl=37818,xl=37819,vl=37820,Ml=37821,ga=36492,bl=36494,Sl=36495,Wf=36283,El=36284,Tl=36285,Al=36286,so=2300,ro=2301,Ja=2302,iu=2400,su=2401,ru=2402,ug=2500,dg=0,Xf=1,wl=2,fg=3200,pg=3201,$f=0,mg=1,rs="",Dt="srgb",yn="srgb-linear",Ia="linear",_t="srgb",Fs=7680,ou=519,gg=512,_g=513,yg=514,Yf=515,xg=516,vg=517,Mg=518,bg=519,Rl=35044,Sg=35048,au="300 es",Ii=2e3,ba=2001;class Ns{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let cu=1234567;const Zr=Math.PI/180,pr=180/Math.PI;function ti(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[t&63|128]+on[t>>8&255]+"-"+on[t>>16&255]+on[t>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function en(i,e,t){return Math.max(e,Math.min(t,i))}function uh(i,e){return(i%e+e)%e}function Eg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Tg(i,e,t){return i!==e?(t-i)/(e-i):0}function Jr(i,e,t){return(1-t)*i+t*e}function Ag(i,e,t,n){return Jr(i,e,1-Math.exp(-t*n))}function wg(i,e=1){return e-Math.abs(uh(i,e*2)-e)}function Rg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Cg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Pg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Lg(i,e){return i+Math.random()*(e-i)}function Dg(i){return i*(.5-Math.random())}function Ig(i){i!==void 0&&(cu=i);let e=cu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ng(i){return i*Zr}function Ug(i){return i*pr}function Og(i){return(i&i-1)===0&&i!==0}function Fg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Bg(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function kg(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Jn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ft(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const dh={DEG2RAD:Zr,RAD2DEG:pr,generateUUID:ti,clamp:en,euclideanModulo:uh,mapLinear:Eg,inverseLerp:Tg,lerp:Jr,damp:Ag,pingpong:wg,smoothstep:Rg,smootherstep:Cg,randInt:Pg,randFloat:Lg,randFloatSpread:Dg,seededRandom:Ig,degToRad:Ng,radToDeg:Ug,isPowerOfTwo:Og,ceilPowerOfTwo:Fg,floorPowerOfTwo:Bg,setQuaternionFromProperEuler:kg,normalize:ft,denormalize:Jn};class Ce{constructor(e=0,t=0){Ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(en(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,n,s,r,o,a,c,l){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],b=s[1],S=s[4],x=s[7],P=s[2],A=s[5],C=s[8];return r[0]=o*_+a*b+c*P,r[3]=o*m+a*S+c*A,r[6]=o*f+a*x+c*C,r[1]=l*_+h*b+u*P,r[4]=l*m+h*S+u*A,r[7]=l*f+h*x+u*C,r[2]=d*_+p*b+g*P,r[5]=d*m+p*S+g*A,r[8]=d*f+p*x+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=t*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Qa.makeScale(e,t)),this}rotate(e){return this.premultiply(Qa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qa=new Ge;function jf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function oo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hg(){const i=oo("canvas");return i.style.display="block",i}const lu={};function qr(i){i in lu||(lu[i]=!0,console.warn(i))}function zg(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Vg(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Gg(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ze={enabled:!0,workingColorSpace:yn,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===_t&&(i.r=Fi(i.r),i.g=Fi(i.g),i.b=Fi(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===_t&&(i.r=ar(i.r),i.g=ar(i.g),i.b=ar(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===rs?Ia:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Fi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ar(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const hu=[.64,.33,.3,.6,.15,.06],uu=[.2126,.7152,.0722],du=[.3127,.329],fu=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pu=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ze.define({[yn]:{primaries:hu,whitePoint:du,transfer:Ia,toXYZ:fu,fromXYZ:pu,luminanceCoefficients:uu,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:hu,whitePoint:du,transfer:_t,toXYZ:fu,fromXYZ:pu,luminanceCoefficients:uu,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}});let Bs;class Wg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Bs===void 0&&(Bs=oo("canvas")),Bs.width=e.width,Bs.height=e.height;const n=Bs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Bs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=oo("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Fi(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Fi(t[n]/255)*255):t[n]=Fi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xg=0;class qf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xg++}),this.uuid=ti(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ec(s[o].image)):r.push(ec(s[o]))}else r=ec(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ec(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Wg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $g=0;class Xt extends Ns{constructor(e=Xt.DEFAULT_IMAGE,t=Xt.DEFAULT_MAPPING,n=as,s=as,r=Gt,o=Di,a=kn,c=Vi,l=Xt.DEFAULT_ANISOTROPY,h=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$g++}),this.uuid=ti(),this.name="",this.source=new qf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ds:e.x=e.x-Math.floor(e.x);break;case as:e.x=e.x<0?0:1;break;case Ma:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ds:e.y=e.y-Math.floor(e.y);break;case as:e.y=e.y<0?0:1;break;case Ma:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=Nf;Xt.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,t=0,n=0,s=1){ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,x=(p+1)/2,P=(f+1)/2,A=(h+d)/4,C=(u+_)/4,w=(g+m)/4;return S>x&&S>P?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=A/n,r=C/n):x>P?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=A/s,r=w/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=C/r,s=w/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yg extends Ns{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Xt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new qf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ds extends Yg{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Kf extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=as,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jg extends Xt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=as,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ii{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==p||h!==g){let m=1-a;const f=c*d+l*p+h*g+u*_,b=f>=0?1:-1,S=1-f*f;if(S>Number.EPSILON){const P=Math.sqrt(S),A=Math.atan2(P,f*b);m=Math.sin(m*A)/P,a=Math.sin(a*A)/P}const x=a*b;if(c=c*m+d*x,l=l*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-a){const P=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=P,l*=P,h*=P,u*=P}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-a*p,e[t+2]=l*g+h*p+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(en(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return tc.copy(this).projectOnVector(e),this.sub(tc)}reflect(e){return this.sub(tc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(en(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const tc=new D,mu=new ii;class $i{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Xn):Xn.fromBufferAttribute(r,o),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Po.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Po.copy(n.boundingBox)),Po.applyMatrix4(e.matrixWorld),this.union(Po)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fr),Lo.subVectors(this.max,Fr),ks.subVectors(e.a,Fr),Hs.subVectors(e.b,Fr),zs.subVectors(e.c,Fr),qi.subVectors(Hs,ks),Ki.subVectors(zs,Hs),ys.subVectors(ks,zs);let t=[0,-qi.z,qi.y,0,-Ki.z,Ki.y,0,-ys.z,ys.y,qi.z,0,-qi.x,Ki.z,0,-Ki.x,ys.z,0,-ys.x,-qi.y,qi.x,0,-Ki.y,Ki.x,0,-ys.y,ys.x,0];return!nc(t,ks,Hs,zs,Lo)||(t=[1,0,0,0,1,0,0,0,1],!nc(t,ks,Hs,zs,Lo))?!1:(Do.crossVectors(qi,Ki),t=[Do.x,Do.y,Do.z],nc(t,ks,Hs,zs,Lo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Mi=[new D,new D,new D,new D,new D,new D,new D,new D],Xn=new D,Po=new $i,ks=new D,Hs=new D,zs=new D,qi=new D,Ki=new D,ys=new D,Fr=new D,Lo=new D,Do=new D,xs=new D;function nc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){xs.fromArray(i,r);const a=s.x*Math.abs(xs.x)+s.y*Math.abs(xs.y)+s.z*Math.abs(xs.z),c=e.dot(xs),l=t.dot(xs),h=n.dot(xs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const qg=new $i,Br=new D,ic=new D;class mi{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):qg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Br.subVectors(e,this.center);const t=Br.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Br,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ic.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Br.copy(e.center).add(ic)),this.expandByPoint(Br.copy(e.center).sub(ic))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const bi=new D,sc=new D,Io=new D,Zi=new D,rc=new D,No=new D,oc=new D;class Er{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,t),bi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){sc.copy(e).add(t).multiplyScalar(.5),Io.copy(t).sub(e).normalize(),Zi.copy(this.origin).sub(sc);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Io),a=Zi.dot(this.direction),c=-Zi.dot(Io),l=Zi.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(sc).addScaledVector(Io,d),p}intersectSphere(e,t){bi.subVectors(e.center,this.origin);const n=bi.dot(this.direction),s=bi.dot(bi)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,t,n,s,r){rc.subVectors(t,e),No.subVectors(n,e),oc.crossVectors(rc,No);let o=this.direction.dot(oc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zi.subVectors(this.origin,e);const c=a*this.direction.dot(No.crossVectors(Zi,No));if(c<0)return null;const l=a*this.direction.dot(rc.cross(Zi));if(l<0||c+l>o)return null;const h=-a*Zi.dot(oc);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ke{constructor(e,t,n,s,r,o,a,c,l,h,u,d,p,g,_,m){ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,p,g,_,m)}set(e,t,n,s,r,o,a,c,l,h,u,d,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ke().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Vs.setFromMatrixColumn(e,0).length(),r=1/Vs.setFromMatrixColumn(e,1).length(),o=1/Vs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kg,e,Zg)}lookAt(e,t,n){const s=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Ji.crossVectors(n,wn),Ji.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Ji.crossVectors(n,wn)),Ji.normalize(),Uo.crossVectors(wn,Ji),s[0]=Ji.x,s[4]=Uo.x,s[8]=wn.x,s[1]=Ji.y,s[5]=Uo.y,s[9]=wn.y,s[2]=Ji.z,s[6]=Uo.z,s[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],b=n[3],S=n[7],x=n[11],P=n[15],A=s[0],C=s[4],w=s[8],v=s[12],y=s[1],L=s[5],B=s[9],H=s[13],W=s[2],Z=s[6],$=s[10],te=s[14],X=s[3],oe=s[7],de=s[11],Te=s[15];return r[0]=o*A+a*y+c*W+l*X,r[4]=o*C+a*L+c*Z+l*oe,r[8]=o*w+a*B+c*$+l*de,r[12]=o*v+a*H+c*te+l*Te,r[1]=h*A+u*y+d*W+p*X,r[5]=h*C+u*L+d*Z+p*oe,r[9]=h*w+u*B+d*$+p*de,r[13]=h*v+u*H+d*te+p*Te,r[2]=g*A+_*y+m*W+f*X,r[6]=g*C+_*L+m*Z+f*oe,r[10]=g*w+_*B+m*$+f*de,r[14]=g*v+_*H+m*te+f*Te,r[3]=b*A+S*y+x*W+P*X,r[7]=b*C+S*L+x*Z+P*oe,r[11]=b*w+S*B+x*$+P*de,r[15]=b*v+S*H+x*te+P*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*p-n*c*p)+_*(+t*c*p-t*l*d+r*o*d-s*o*p+s*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+f*(-s*a*h-t*c*u+t*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],b=u*m*l-_*d*l+_*c*p-a*m*p-u*c*f+a*d*f,S=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,x=h*_*l-g*u*l+g*a*p-o*_*p-h*a*f+o*u*f,P=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,A=t*b+n*S+s*x+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=b*C,e[1]=(_*d*r-u*m*r-_*s*p+n*m*p+u*s*f-n*d*f)*C,e[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*f+n*c*f)*C,e[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*p-n*c*p)*C,e[4]=S*C,e[5]=(h*m*r-g*d*r+g*s*p-t*m*p-h*s*f+t*d*f)*C,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*f-t*c*f)*C,e[7]=(o*d*r-h*c*r+h*s*l-t*d*l-o*s*p+t*c*p)*C,e[8]=x*C,e[9]=(g*u*r-h*_*r-g*n*p+t*_*p+h*n*f-t*u*f)*C,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*f+t*a*f)*C,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*C,e[12]=P*C,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*C,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*m-t*a*m)*C,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*d+t*a*d)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,b=c*l,S=c*h,x=c*u,P=n.x,A=n.y,C=n.z;return s[0]=(1-(_+f))*P,s[1]=(p+x)*P,s[2]=(g-S)*P,s[3]=0,s[4]=(p-x)*A,s[5]=(1-(d+f))*A,s[6]=(m+b)*A,s[7]=0,s[8]=(g+S)*C,s[9]=(m-b)*C,s[10]=(1-(d+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Vs.set(s[0],s[1],s[2]).length();const o=Vs.set(s[4],s[5],s[6]).length(),a=Vs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],$n.copy(this);const l=1/r,h=1/o,u=1/a;return $n.elements[0]*=l,$n.elements[1]*=l,$n.elements[2]*=l,$n.elements[4]*=h,$n.elements[5]*=h,$n.elements[6]*=h,$n.elements[8]*=u,$n.elements[9]*=u,$n.elements[10]*=u,t.setFromRotationMatrix($n),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Ii){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let p,g;if(a===Ii)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ba)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Ii){const c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),d=(t+e)*l,p=(n+s)*h;let g,_;if(a===Ii)g=(o+r)*u,_=-2*u;else if(a===ba)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Vs=new D,$n=new ke,Kg=new D(0,0,0),Zg=new D(1,1,1),Ji=new D,Uo=new D,wn=new D,gu=new ke,_u=new ii;class si{constructor(e=0,t=0,n=0,s=si.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(en(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-en(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(en(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-en(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(en(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-en(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return gu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _u.setFromEuler(this),this.setFromQuaternion(_u,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}si.DEFAULT_ORDER="XYZ";class fh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jg=0;const yu=new D,Gs=new ii,Si=new ke,Oo=new D,kr=new D,Qg=new D,e_=new ii,xu=new D(1,0,0),vu=new D(0,1,0),Mu=new D(0,0,1),bu={type:"added"},t_={type:"removed"},Ws={type:"childadded",child:null},ac={type:"childremoved",child:null};class St extends Ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new D,t=new si,n=new ii,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ke},normalMatrix:{value:new Ge}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.multiply(Gs),this}rotateOnWorldAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.premultiply(Gs),this}rotateX(e){return this.rotateOnAxis(xu,e)}rotateY(e){return this.rotateOnAxis(vu,e)}rotateZ(e){return this.rotateOnAxis(Mu,e)}translateOnAxis(e,t){return yu.copy(e).applyQuaternion(this.quaternion),this.position.add(yu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xu,e)}translateY(e){return this.translateOnAxis(vu,e)}translateZ(e){return this.translateOnAxis(Mu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Oo.copy(e):Oo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(kr,Oo,this.up):Si.lookAt(Oo,kr,this.up),this.quaternion.setFromRotationMatrix(Si),s&&(Si.extractRotation(s.matrixWorld),Gs.setFromRotationMatrix(Si),this.quaternion.premultiply(Gs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bu),Ws.child=e,this.dispatchEvent(Ws),Ws.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(t_),ac.child=e,this.dispatchEvent(ac),ac.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bu),Ws.child=e,this.dispatchEvent(Ws),Ws.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,e,Qg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,e_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}St.DEFAULT_UP=new D(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Yn=new D,Ei=new D,cc=new D,Ti=new D,Xs=new D,$s=new D,Su=new D,lc=new D,hc=new D,uc=new D,dc=new ct,fc=new ct,pc=new ct;class Qn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Yn.subVectors(e,t),s.cross(Yn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Yn.subVectors(s,t),Ei.subVectors(n,t),cc.subVectors(e,t);const o=Yn.dot(Yn),a=Yn.dot(Ei),c=Yn.dot(cc),l=Ei.dot(Ei),h=Ei.dot(cc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ti.x),c.addScaledVector(o,Ti.y),c.addScaledVector(a,Ti.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return dc.setScalar(0),fc.setScalar(0),pc.setScalar(0),dc.fromBufferAttribute(e,t),fc.fromBufferAttribute(e,n),pc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(dc,r.x),o.addScaledVector(fc,r.y),o.addScaledVector(pc,r.z),o}static isFrontFacing(e,t,n,s){return Yn.subVectors(n,t),Ei.subVectors(e,t),Yn.cross(Ei).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Yn.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Qn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Xs.subVectors(s,n),$s.subVectors(r,n),lc.subVectors(e,n);const c=Xs.dot(lc),l=$s.dot(lc);if(c<=0&&l<=0)return t.copy(n);hc.subVectors(e,s);const h=Xs.dot(hc),u=$s.dot(hc);if(h>=0&&u<=h)return t.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Xs,o);uc.subVectors(e,r);const p=Xs.dot(uc),g=$s.dot(uc);if(g>=0&&p<=g)return t.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector($s,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Su.subVectors(r,s),a=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(Su,a);const f=1/(m+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(Xs,o).addScaledVector($s,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Zf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qi={h:0,s:0,l:0},Fo={h:0,s:0,l:0};function mc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=uh(e,1),t=en(t,0,1),n=en(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=mc(o,r,e+1/3),this.g=mc(o,r,e),this.b=mc(o,r,e-1/3)}return Ze.toWorkingColorSpace(this,s),this}setStyle(e,t=Dt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){const n=Zf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=ar(e.r),this.g=ar(e.g),this.b=ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return Ze.fromWorkingColorSpace(an.copy(this),e),Math.round(en(an.r*255,0,255))*65536+Math.round(en(an.g*255,0,255))*256+Math.round(en(an.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(an.copy(this),t);const n=an.r,s=an.g,r=an.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Dt){Ze.fromWorkingColorSpace(an.copy(this),e);const t=an.r,n=an.g,s=an.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Qi),this.setHSL(Qi.h+e,Qi.s+t,Qi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Qi),e.getHSL(Fo);const n=Jr(Qi.h,Fo.h,t),s=Jr(Qi.s,Fo.s,t),r=Jr(Qi.l,Fo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new Ie;Ie.NAMES=Zf;let n_=0;class di extends Ns{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:n_++}),this.uuid=ti(),this.name="",this.blending=rr,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wc,this.blendDst=Xc,this.blendEquation=Rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ou,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fs,this.stencilZFail=Fs,this.stencilZPass=Fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(n.blending=this.blending),this.side!==zi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wc&&(n.blendSrc=this.blendSrc),this.blendDst!==Xc&&(n.blendDst=this.blendDst),this.blendEquation!==Rs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==lr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ou&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ot extends di{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.combine=Df,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bt=new D,Bo=new Ce;class _n{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rl,this.updateRanges=[],this.gpuType=ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Bo.fromBufferAttribute(this,t),Bo.applyMatrix3(e),this.setXY(t,Bo.x,Bo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rl&&(e.usage=this.usage),e}}class Jf extends _n{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Qf extends _n{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ct extends _n{constructor(e,t,n){super(new Float32Array(e),t,n)}}let i_=0;const Fn=new ke,gc=new St,Ys=new D,Rn=new $i,Hr=new $i,qt=new D;class sn extends Ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:i_++}),this.uuid=ti(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jf(e)?Qf:Jf)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ge().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Fn.makeRotationFromQuaternion(e),this.applyMatrix4(Fn),this}rotateX(e){return Fn.makeRotationX(e),this.applyMatrix4(Fn),this}rotateY(e){return Fn.makeRotationY(e),this.applyMatrix4(Fn),this}rotateZ(e){return Fn.makeRotationZ(e),this.applyMatrix4(Fn),this}translate(e,t,n){return Fn.makeTranslation(e,t,n),this.applyMatrix4(Fn),this}scale(e,t,n){return Fn.makeScale(e,t,n),this.applyMatrix4(Fn),this}lookAt(e){return gc.lookAt(e),gc.updateMatrix(),this.applyMatrix4(gc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ct(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Rn.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Rn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Hr.setFromBufferAttribute(a),this.morphTargetsRelative?(qt.addVectors(Rn.min,Hr.min),Rn.expandByPoint(qt),qt.addVectors(Rn.max,Hr.max),Rn.expandByPoint(qt)):(Rn.expandByPoint(Hr.min),Rn.expandByPoint(Hr.max))}Rn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)qt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(qt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)qt.fromBufferAttribute(a,l),c&&(Ys.fromBufferAttribute(e,l),qt.add(Ys)),s=Math.max(s,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _n(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let w=0;w<n.count;w++)a[w]=new D,c[w]=new D;const l=new D,h=new D,u=new D,d=new Ce,p=new Ce,g=new Ce,_=new D,m=new D;function f(w,v,y){l.fromBufferAttribute(n,w),h.fromBufferAttribute(n,v),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,w),p.fromBufferAttribute(r,v),g.fromBufferAttribute(r,y),h.sub(l),u.sub(l),p.sub(d),g.sub(d);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(L),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),a[w].add(_),a[v].add(_),a[y].add(_),c[w].add(m),c[v].add(m),c[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let w=0,v=b.length;w<v;++w){const y=b[w],L=y.start,B=y.count;for(let H=L,W=L+B;H<W;H+=3)f(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const S=new D,x=new D,P=new D,A=new D;function C(w){P.fromBufferAttribute(s,w),A.copy(P);const v=a[w];S.copy(v),S.sub(P.multiplyScalar(P.dot(v))).normalize(),x.crossVectors(A,v);const L=x.dot(c[w])<0?-1:1;o.setXYZW(w,S.x,S.y,S.z,L)}for(let w=0,v=b.length;w<v;++w){const y=b[w],L=y.start,B=y.count;for(let H=L,W=L+B;H<W;H+=3)C(e.getX(H+0)),C(e.getX(H+1)),C(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new _n(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new D,r=new D,o=new D,a=new D,c=new D,l=new D,h=new D,u=new D;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new _n(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new sn,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Eu=new ke,vs=new Er,ko=new mi,Tu=new D,Ho=new D,zo=new D,Vo=new D,_c=new D,Go=new D,Au=new D,Wo=new D;class ie extends St{constructor(e=new sn,t=new ot){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Go.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(_c.fromBufferAttribute(u,e),o?Go.addScaledVector(_c,h):Go.addScaledVector(_c.sub(t),h))}t.add(Go)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ko.copy(n.boundingSphere),ko.applyMatrix4(r),vs.copy(e.ray).recast(e.near),!(ko.containsPoint(vs.origin)===!1&&(vs.intersectSphere(ko,Tu)===null||vs.origin.distanceToSquared(Tu)>(e.far-e.near)**2))&&(Eu.copy(r).invert(),vs.copy(e.ray).applyMatrix4(Eu),!(n.boundingBox!==null&&vs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,vs)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=b,P=S;x<P;x+=3){const A=a.getX(x),C=a.getX(x+1),w=a.getX(x+2);s=Xo(this,f,e,n,l,h,u,A,C,w),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const b=a.getX(m),S=a.getX(m+1),x=a.getX(m+2);s=Xo(this,o,e,n,l,h,u,b,S,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=b,P=S;x<P;x+=3){const A=x,C=x+1,w=x+2;s=Xo(this,f,e,n,l,h,u,A,C,w),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const b=m,S=m+1,x=m+2;s=Xo(this,o,e,n,l,h,u,b,S,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function s_(i,e,t,n,s,r,o,a){let c;if(e.side===mn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===zi,a),c===null)return null;Wo.copy(a),Wo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Wo);return l<t.near||l>t.far?null:{distance:l,point:Wo.clone(),object:i}}function Xo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Ho),i.getVertexPosition(c,zo),i.getVertexPosition(l,Vo);const h=s_(i,e,t,n,Ho,zo,Vo,Au);if(h){const u=new D;Qn.getBarycoord(Au,Ho,zo,Vo,u),s&&(h.uv=Qn.getInterpolatedAttribute(s,a,c,l,u,new Ce)),r&&(h.uv1=Qn.getInterpolatedAttribute(r,a,c,l,u,new Ce)),o&&(h.normal=Qn.getInterpolatedAttribute(o,a,c,l,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new D,materialIndex:0};Qn.getNormal(Ho,zo,Vo,d.normal),h.face=d,h.barycoord=u}return h}class wt extends sn{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ct(l,3)),this.setAttribute("normal",new Ct(h,3)),this.setAttribute("uv",new Ct(u,2));function g(_,m,f,b,S,x,P,A,C,w,v){const y=x/C,L=P/w,B=x/2,H=P/2,W=A/2,Z=C+1,$=w+1;let te=0,X=0;const oe=new D;for(let de=0;de<$;de++){const Te=de*L-H;for(let je=0;je<Z;je++){const xt=je*y-B;oe[_]=xt*b,oe[m]=Te*S,oe[f]=W,l.push(oe.x,oe.y,oe.z),oe[_]=0,oe[m]=0,oe[f]=A>0?1:-1,h.push(oe.x,oe.y,oe.z),u.push(je/C),u.push(1-de/w),te+=1}}for(let de=0;de<w;de++)for(let Te=0;Te<C;Te++){const je=d+Te+Z*de,xt=d+Te+Z*(de+1),j=d+(Te+1)+Z*(de+1),ne=d+(Te+1)+Z*de;c.push(je,xt,ne),c.push(xt,j,ne),X+=6}a.addGroup(p,X,v),p+=X,d+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function mr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function dn(i){const e={};for(let t=0;t<i.length;t++){const n=mr(i[t]);for(const s in n)e[s]=n[s]}return e}function r_(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function ep(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const o_={clone:mr,merge:dn};var a_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,c_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fs extends di{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=a_,this.fragmentShader=c_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mr(e.uniforms),this.uniformsGroups=r_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class tp extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=Ii}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const es=new D,wu=new Ce,Ru=new Ce;class fn extends tp{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=pr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pr*2*Math.atan(Math.tan(Zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){es.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(es.x,es.y).multiplyScalar(-e/es.z),es.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(es.x,es.y).multiplyScalar(-e/es.z)}getViewSize(e,t){return this.getViewBounds(e,wu,Ru),t.subVectors(Ru,wu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const js=-90,qs=1;class l_ extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new fn(js,qs,e,t);s.layers=this.layers,this.add(s);const r=new fn(js,qs,e,t);r.layers=this.layers,this.add(r);const o=new fn(js,qs,e,t);o.layers=this.layers,this.add(o);const a=new fn(js,qs,e,t);a.layers=this.layers,this.add(a);const c=new fn(js,qs,e,t);c.layers=this.layers,this.add(c);const l=new fn(js,qs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Ii)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ba)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class np extends Xt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:hr,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class h_ extends Ds{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new np(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Gt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new wt(5,5,5),r=new fs({name:"CubemapFromEquirect",uniforms:mr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:mn,blending:hs});r.uniforms.tEquirect.value=t;const o=new ie(s,r),a=t.minFilter;return t.minFilter===Di&&(t.minFilter=Gt),new l_(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const yc=new D,u_=new D,d_=new Ge;class ss{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=yc.subVectors(n,t).cross(u_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(yc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||d_.getNormalMatrix(e),s=this.coplanarPoint(yc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ms=new mi,$o=new D;class ph{constructor(e=new ss,t=new ss,n=new ss,s=new ss,r=new ss,o=new ss){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ii){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],b=s[13],S=s[14],x=s[15];if(n[0].setComponents(c-r,d-l,m-p,x-f).normalize(),n[1].setComponents(c+r,d+l,m+p,x+f).normalize(),n[2].setComponents(c+o,d+h,m+g,x+b).normalize(),n[3].setComponents(c-o,d-h,m-g,x-b).normalize(),n[4].setComponents(c-a,d-u,m-_,x-S).normalize(),t===Ii)n[5].setComponents(c+a,d+u,m+_,x+S).normalize();else if(t===ba)n[5].setComponents(a,u,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ms.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ms)}intersectsSprite(e){return Ms.center.set(0,0,0),Ms.radius=.7071067811865476,Ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ms)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if($o.x=s.normal.x>0?e.max.x:e.min.x,$o.y=s.normal.y>0?e.max.y:e.min.y,$o.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint($o)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ip(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function f_(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class bn extends sn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const b=f*d-o;for(let S=0;S<l;S++){const x=S*u-r;g.push(x,-b,0),_.push(0,0,1),m.push(S/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let b=0;b<a;b++){const S=b+l*f,x=b+l*(f+1),P=b+1+l*(f+1),A=b+1+l*f;p.push(S,x,A),p.push(x,P,A)}this.setIndex(p),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(_,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bn(e.width,e.height,e.widthSegments,e.heightSegments)}}var p_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,m_=`#ifdef USE_ALPHAHASH
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
#endif`,g_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,__=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,y_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,x_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,v_=`#ifdef USE_AOMAP
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
#endif`,M_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,b_=`#ifdef USE_BATCHING
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
#endif`,S_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,E_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,T_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,A_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,w_=`#ifdef USE_IRIDESCENCE
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
#endif`,R_=`#ifdef USE_BUMPMAP
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
#endif`,C_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,P_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,L_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,D_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,I_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,N_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,U_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,O_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,F_=`#define PI 3.141592653589793
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
} // validated`,B_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,k_=`vec3 transformedNormal = objectNormal;
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
#endif`,H_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,z_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,V_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,G_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,W_="gl_FragColor = linearToOutputTexel( gl_FragColor );",X_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$_=`#ifdef USE_ENVMAP
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
#endif`,Y_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,j_=`#ifdef USE_ENVMAP
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
#endif`,q_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,K_=`#ifdef USE_ENVMAP
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
#endif`,Z_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,J_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Q_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,e0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,t0=`#ifdef USE_GRADIENTMAP
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
}`,n0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,i0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,s0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,r0=`uniform bool receiveShadow;
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
#endif`,o0=`#ifdef USE_ENVMAP
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
#endif`,a0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,l0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,h0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,u0=`PhysicalMaterial material;
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
#endif`,d0=`struct PhysicalMaterial {
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
}`,f0=`
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
#endif`,p0=`#if defined( RE_IndirectDiffuse )
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
#endif`,m0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,g0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,y0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,v0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,M0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,b0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,S0=`#if defined( USE_POINTS_UV )
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
#endif`,E0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,T0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,A0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,w0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,C0=`#ifdef USE_MORPHTARGETS
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
#endif`,P0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,D0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,I0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,O0=`#ifdef USE_NORMALMAP
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
#endif`,F0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,B0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,k0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,z0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,V0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,G0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,W0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,X0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Y0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,j0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,q0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,K0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Z0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,J0=`float getShadowMask() {
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
}`,Q0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ey=`#ifdef USE_SKINNING
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
#endif`,ty=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ny=`#ifdef USE_SKINNING
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
#endif`,iy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ry=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,oy=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ay=`#ifdef USE_TRANSMISSION
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
#endif`,cy=`#ifdef USE_TRANSMISSION
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
#endif`,ly=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,py=`uniform sampler2D t2D;
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
}`,my=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_y=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xy=`#include <common>
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
}`,vy=`#if DEPTH_PACKING == 3200
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
}`,My=`#define DISTANCE
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
}`,by=`#define DISTANCE
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
}`,Sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ey=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ty=`uniform float scale;
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
}`,Ay=`uniform vec3 diffuse;
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
}`,wy=`#include <common>
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
}`,Ry=`uniform vec3 diffuse;
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
}`,Cy=`#define LAMBERT
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
}`,Py=`#define LAMBERT
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
}`,Ly=`#define MATCAP
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
}`,Dy=`#define MATCAP
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
}`,Iy=`#define NORMAL
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
}`,Ny=`#define NORMAL
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
}`,Uy=`#define PHONG
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
}`,Oy=`#define PHONG
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
}`,Fy=`#define STANDARD
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
}`,By=`#define STANDARD
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
}`,ky=`#define TOON
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
}`,Hy=`#define TOON
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
}`,zy=`uniform float size;
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
}`,Vy=`uniform vec3 diffuse;
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
}`,Gy=`#include <common>
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
}`,Wy=`uniform vec3 color;
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
}`,Xy=`uniform float rotation;
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
}`,$y=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:p_,alphahash_pars_fragment:m_,alphamap_fragment:g_,alphamap_pars_fragment:__,alphatest_fragment:y_,alphatest_pars_fragment:x_,aomap_fragment:v_,aomap_pars_fragment:M_,batching_pars_vertex:b_,batching_vertex:S_,begin_vertex:E_,beginnormal_vertex:T_,bsdfs:A_,iridescence_fragment:w_,bumpmap_pars_fragment:R_,clipping_planes_fragment:C_,clipping_planes_pars_fragment:P_,clipping_planes_pars_vertex:L_,clipping_planes_vertex:D_,color_fragment:I_,color_pars_fragment:N_,color_pars_vertex:U_,color_vertex:O_,common:F_,cube_uv_reflection_fragment:B_,defaultnormal_vertex:k_,displacementmap_pars_vertex:H_,displacementmap_vertex:z_,emissivemap_fragment:V_,emissivemap_pars_fragment:G_,colorspace_fragment:W_,colorspace_pars_fragment:X_,envmap_fragment:$_,envmap_common_pars_fragment:Y_,envmap_pars_fragment:j_,envmap_pars_vertex:q_,envmap_physical_pars_fragment:o0,envmap_vertex:K_,fog_vertex:Z_,fog_pars_vertex:J_,fog_fragment:Q_,fog_pars_fragment:e0,gradientmap_pars_fragment:t0,lightmap_pars_fragment:n0,lights_lambert_fragment:i0,lights_lambert_pars_fragment:s0,lights_pars_begin:r0,lights_toon_fragment:a0,lights_toon_pars_fragment:c0,lights_phong_fragment:l0,lights_phong_pars_fragment:h0,lights_physical_fragment:u0,lights_physical_pars_fragment:d0,lights_fragment_begin:f0,lights_fragment_maps:p0,lights_fragment_end:m0,logdepthbuf_fragment:g0,logdepthbuf_pars_fragment:_0,logdepthbuf_pars_vertex:y0,logdepthbuf_vertex:x0,map_fragment:v0,map_pars_fragment:M0,map_particle_fragment:b0,map_particle_pars_fragment:S0,metalnessmap_fragment:E0,metalnessmap_pars_fragment:T0,morphinstance_vertex:A0,morphcolor_vertex:w0,morphnormal_vertex:R0,morphtarget_pars_vertex:C0,morphtarget_vertex:P0,normal_fragment_begin:L0,normal_fragment_maps:D0,normal_pars_fragment:I0,normal_pars_vertex:N0,normal_vertex:U0,normalmap_pars_fragment:O0,clearcoat_normal_fragment_begin:F0,clearcoat_normal_fragment_maps:B0,clearcoat_pars_fragment:k0,iridescence_pars_fragment:H0,opaque_fragment:z0,packing:V0,premultiplied_alpha_fragment:G0,project_vertex:W0,dithering_fragment:X0,dithering_pars_fragment:$0,roughnessmap_fragment:Y0,roughnessmap_pars_fragment:j0,shadowmap_pars_fragment:q0,shadowmap_pars_vertex:K0,shadowmap_vertex:Z0,shadowmask_pars_fragment:J0,skinbase_vertex:Q0,skinning_pars_vertex:ey,skinning_vertex:ty,skinnormal_vertex:ny,specularmap_fragment:iy,specularmap_pars_fragment:sy,tonemapping_fragment:ry,tonemapping_pars_fragment:oy,transmission_fragment:ay,transmission_pars_fragment:cy,uv_pars_fragment:ly,uv_pars_vertex:hy,uv_vertex:uy,worldpos_vertex:dy,background_vert:fy,background_frag:py,backgroundCube_vert:my,backgroundCube_frag:gy,cube_vert:_y,cube_frag:yy,depth_vert:xy,depth_frag:vy,distanceRGBA_vert:My,distanceRGBA_frag:by,equirect_vert:Sy,equirect_frag:Ey,linedashed_vert:Ty,linedashed_frag:Ay,meshbasic_vert:wy,meshbasic_frag:Ry,meshlambert_vert:Cy,meshlambert_frag:Py,meshmatcap_vert:Ly,meshmatcap_frag:Dy,meshnormal_vert:Iy,meshnormal_frag:Ny,meshphong_vert:Uy,meshphong_frag:Oy,meshphysical_vert:Fy,meshphysical_frag:By,meshtoon_vert:ky,meshtoon_frag:Hy,points_vert:zy,points_frag:Vy,shadow_vert:Gy,shadow_frag:Wy,sprite_vert:Xy,sprite_frag:$y},se={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},ci={basic:{uniforms:dn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:dn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:dn([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:dn([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:dn([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:dn([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:dn([se.points,se.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:dn([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:dn([se.common,se.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:dn([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:dn([se.sprite,se.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:dn([se.common,se.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:dn([se.lights,se.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};ci.physical={uniforms:dn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Yo={r:0,b:0,g:0},bs=new si,Yy=new ke;function jy(i,e,t,n,s,r,o){const a=new Ie(0);let c=r===!0?0:1,l,h,u=null,d=0,p=null;function g(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?t:e).get(S)),S}function _(b){let S=!1;const x=g(b);x===null?f(a,c):x&&x.isColor&&(f(x,1),S=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,S){const x=g(S);x&&(x.isCubeTexture||x.mapping===Da)?(h===void 0&&(h=new ie(new wt(1,1,1),new fs({name:"BackgroundCubeMaterial",uniforms:mr(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),bs.copy(S.backgroundRotation),bs.x*=-1,bs.y*=-1,bs.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Yy.makeRotationFromEuler(bs)),h.material.toneMapped=Ze.getTransfer(x.colorSpace)!==_t,(u!==x||d!==x.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ie(new bn(2,2),new fs({name:"BackgroundMaterial",uniforms:mr(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(x.colorSpace)!==_t,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,p=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function f(b,S){b.getRGB(Yo,ep(i)),n.buffers.color.setClear(Yo.r,Yo.g,Yo.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),c=S,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,f(a,c)},render:_,addToRenderList:m}}function qy(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(y,L,B,H,W){let Z=!1;const $=u(H,B,L);r!==$&&(r=$,l(r.object)),Z=p(y,H,B,W),Z&&g(y,H,B,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(y,L,B,H),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,L,B){const H=B.wireframe===!0;let W=n[y.id];W===void 0&&(W={},n[y.id]=W);let Z=W[L.id];Z===void 0&&(Z={},W[L.id]=Z);let $=Z[H];return $===void 0&&($=d(c()),Z[H]=$),$}function d(y){const L=[],B=[],H=[];for(let W=0;W<t;W++)L[W]=0,B[W]=0,H[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:H,object:y,attributes:{},index:null}}function p(y,L,B,H){const W=r.attributes,Z=L.attributes;let $=0;const te=B.getAttributes();for(const X in te)if(te[X].location>=0){const de=W[X];let Te=Z[X];if(Te===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(Te=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(Te=y.instanceColor)),de===void 0||de.attribute!==Te||Te&&de.data!==Te.data)return!0;$++}return r.attributesNum!==$||r.index!==H}function g(y,L,B,H){const W={},Z=L.attributes;let $=0;const te=B.getAttributes();for(const X in te)if(te[X].location>=0){let de=Z[X];de===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(de=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(de=y.instanceColor));const Te={};Te.attribute=de,de&&de.data&&(Te.data=de.data),W[X]=Te,$++}r.attributes=W,r.attributesNum=$,r.index=H}function _(){const y=r.newAttributes;for(let L=0,B=y.length;L<B;L++)y[L]=0}function m(y){f(y,0)}function f(y,L){const B=r.newAttributes,H=r.enabledAttributes,W=r.attributeDivisors;B[y]=1,H[y]===0&&(i.enableVertexAttribArray(y),H[y]=1),W[y]!==L&&(i.vertexAttribDivisor(y,L),W[y]=L)}function b(){const y=r.newAttributes,L=r.enabledAttributes;for(let B=0,H=L.length;B<H;B++)L[B]!==y[B]&&(i.disableVertexAttribArray(B),L[B]=0)}function S(y,L,B,H,W,Z,$){$===!0?i.vertexAttribIPointer(y,L,B,W,Z):i.vertexAttribPointer(y,L,B,H,W,Z)}function x(y,L,B,H){_();const W=H.attributes,Z=B.getAttributes(),$=L.defaultAttributeValues;for(const te in Z){const X=Z[te];if(X.location>=0){let oe=W[te];if(oe===void 0&&(te==="instanceMatrix"&&y.instanceMatrix&&(oe=y.instanceMatrix),te==="instanceColor"&&y.instanceColor&&(oe=y.instanceColor)),oe!==void 0){const de=oe.normalized,Te=oe.itemSize,je=e.get(oe);if(je===void 0)continue;const xt=je.buffer,j=je.type,ne=je.bytesPerElement,Me=j===i.INT||j===i.UNSIGNED_INT||oe.gpuType===sh;if(oe.isInterleavedBufferAttribute){const ae=oe.data,Le=ae.stride,He=oe.offset;if(ae.isInstancedInterleavedBuffer){for(let qe=0;qe<X.locationSize;qe++)f(X.location+qe,ae.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let qe=0;qe<X.locationSize;qe++)m(X.location+qe);i.bindBuffer(i.ARRAY_BUFFER,xt);for(let qe=0;qe<X.locationSize;qe++)S(X.location+qe,Te/X.locationSize,j,de,Le*ne,(He+Te/X.locationSize*qe)*ne,Me)}else{if(oe.isInstancedBufferAttribute){for(let ae=0;ae<X.locationSize;ae++)f(X.location+ae,oe.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ae=0;ae<X.locationSize;ae++)m(X.location+ae);i.bindBuffer(i.ARRAY_BUFFER,xt);for(let ae=0;ae<X.locationSize;ae++)S(X.location+ae,Te/X.locationSize,j,de,Te*ne,Te/X.locationSize*ae*ne,Me)}}else if($!==void 0){const de=$[te];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(X.location,de);break;case 3:i.vertexAttrib3fv(X.location,de);break;case 4:i.vertexAttrib4fv(X.location,de);break;default:i.vertexAttrib1fv(X.location,de)}}}}b()}function P(){w();for(const y in n){const L=n[y];for(const B in L){const H=L[B];for(const W in H)h(H[W].object),delete H[W];delete L[B]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const L=n[y.id];for(const B in L){const H=L[B];for(const W in H)h(H[W].object),delete H[W];delete L[B]}delete n[y.id]}function C(y){for(const L in n){const B=n[L];if(B[y.id]===void 0)continue;const H=B[y.id];for(const W in H)h(H[W].object),delete H[W];delete B[y.id]}}function w(){v(),o=!0,r!==s&&(r=s,l(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:v,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function Ky(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function c(l,h,u,d){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Zy(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==kn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const w=C===mo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Vi&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==ei&&!w)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:P,maxSamples:A}}function Jy(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new ss,a=new Ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const b=r?0:n,S=b*4;let x=f.clippingState||null;c.value=x,x=h(g,d,S,p);for(let P=0;P!==S;++P)x[P]=t[P];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,x=p;S!==_;++S,x+=4)o.copy(u[S]).applyMatrix4(b,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Qy(i){let e=new WeakMap;function t(o,a){return a===Qc?o.mapping=hr:a===el&&(o.mapping=ur),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Qc||a===el)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new h_(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class mh extends tp{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const nr=4,Cu=[.125,.215,.35,.446,.526,.582],Cs=20,xc=new mh,Pu=new Ie;let vc=null,Mc=0,bc=0,Sc=!1;const ws=(1+Math.sqrt(5))/2,Ks=1/ws,Lu=[new D(-ws,Ks,0),new D(ws,Ks,0),new D(-Ks,0,ws),new D(Ks,0,ws),new D(0,ws,-Ks),new D(0,ws,Ks),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class Du{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){vc=this._renderer.getRenderTarget(),Mc=this._renderer.getActiveCubeFace(),bc=this._renderer.getActiveMipmapLevel(),Sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vc,Mc,bc),this._renderer.xr.enabled=Sc,e.scissorTest=!1,jo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===hr||e.mapping===ur?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vc=this._renderer.getRenderTarget(),Mc=this._renderer.getActiveCubeFace(),bc=this._renderer.getActiveMipmapLevel(),Sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:mo,format:kn,colorSpace:yn,depthBuffer:!1},s=Iu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Iu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ex(r)),this._blurMaterial=tx(r,e,t)}return s}_compileMaterial(e){const t=new ie(this._lodPlanes[0],e);this._renderer.compile(t,xc)}_sceneToCubeUV(e,t,n,s){const a=new fn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Pu),h.toneMapping=us,h.autoClear=!1;const p=new ot({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1}),g=new ie(new wt,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Pu),_=!0);for(let f=0;f<6;f++){const b=f%3;b===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):b===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const S=this._cubeSize;jo(s,b*S,f>2?S:0,S,S),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===hr||e.mapping===ur;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ie(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;jo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,xc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Lu[(s-r-1)%Lu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ie(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Cs-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Cs;m>Cs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Cs}`);const f=[];let b=0;for(let C=0;C<Cs;++C){const w=C/_,v=Math.exp(-w*w/2);f.push(v),C===0?b+=v:C<m&&(b+=2*v)}for(let C=0;C<f.length;C++)f[C]=f[C]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;const x=this._sizeLods[s],P=3*x*(s>S-nr?s-S+nr:0),A=4*(this._cubeSize-x);jo(t,P,A,3*x,2*x),c.setRenderTarget(t),c.render(u,xc)}}function ex(i){const e=[],t=[],n=[];let s=i;const r=i-nr+1+Cu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-nr?c=Cu[o-i+nr-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,b=new Float32Array(_*g*p),S=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let A=0;A<p;A++){const C=A%3*2/3-1,w=A>2?0:-1,v=[C,w,0,C+2/3,w,0,C+2/3,w+1,0,C,w,0,C+2/3,w+1,0,C,w+1,0];b.set(v,_*g*A),S.set(d,m*g*A);const y=[A,A,A,A,A,A];x.set(y,f*g*A)}const P=new sn;P.setAttribute("position",new _n(b,_)),P.setAttribute("uv",new _n(S,m)),P.setAttribute("faceIndex",new _n(x,f)),e.push(P),s>nr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Iu(i,e,t){const n=new Ds(i,e,t);return n.texture.mapping=Da,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function tx(i,e,t){const n=new Float32Array(Cs),s=new D(0,1,0);return new fs({name:"SphericalGaussianBlur",defines:{n:Cs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:gh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:hs,depthTest:!1,depthWrite:!1})}function Nu(){return new fs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hs,depthTest:!1,depthWrite:!1})}function Uu(){return new fs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hs,depthTest:!1,depthWrite:!1})}function gh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function nx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Qc||c===el,h=c===hr||c===ur;if(l||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Du(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new Du(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function ix(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&qr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function sx(i,e,t,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let S=0,x=b.length;S<x;S+=3){const P=b[S+0],A=b[S+1],C=b[S+2];d.push(P,A,A,C,C,P)}}else if(g!==void 0){const b=g.array;_=g.version;for(let S=0,x=b.length/3-1;S<x;S+=3){const P=S+0,A=S+1,C=S+2;d.push(P,A,A,C,C,P)}}else return;const m=new(jf(d)?Qf:Jf)(d,1);m.version=_;const f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function rx(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){i.drawElements(n,p,r,d*o),t.update(p,n,1)}function l(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*o,g),t.update(p,n,g))}function h(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function u(d,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,g);let f=0;for(let b=0;b<g;b++)f+=p[b]*_[b];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ox(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function ax(i,e,t){const n=new WeakMap,s=new ct;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let v=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let S=0;p===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let x=a.attributes.position.count*S,P=1;x>e.maxTextureSize&&(P=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const A=new Float32Array(x*P*4*u),C=new Kf(A,x,P,u);C.type=ei,C.needsUpdate=!0;const w=S*4;for(let y=0;y<u;y++){const L=m[y],B=f[y],H=b[y],W=x*P*4*y;for(let Z=0;Z<L.count;Z++){const $=Z*w;p===!0&&(s.fromBufferAttribute(L,Z),A[W+$+0]=s.x,A[W+$+1]=s.y,A[W+$+2]=s.z,A[W+$+3]=0),g===!0&&(s.fromBufferAttribute(B,Z),A[W+$+4]=s.x,A[W+$+5]=s.y,A[W+$+6]=s.z,A[W+$+7]=0),_===!0&&(s.fromBufferAttribute(H,Z),A[W+$+8]=s.x,A[W+$+9]=s.y,A[W+$+10]=s.z,A[W+$+11]=H.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new Ce(x,P)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function cx(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class sp extends Xt{constructor(e,t,n,s,r,o,a,c,l,h=or){if(h!==or&&h!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===or&&(n=Ls),n===void 0&&h===fr&&(n=dr),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:gn,this.minFilter=c!==void 0?c:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const rp=new Xt,Ou=new sp(1,1),op=new Kf,ap=new jg,cp=new np,Fu=[],Bu=[],ku=new Float32Array(16),Hu=new Float32Array(9),zu=new Float32Array(4);function Tr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Fu[s];if(r===void 0&&(r=new Float32Array(s),Fu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Yt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function jt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Na(i,e){let t=Bu[e];t===void 0&&(t=new Int32Array(e),Bu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function lx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function hx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;i.uniform2fv(this.addr,e),jt(t,e)}}function ux(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;i.uniform3fv(this.addr,e),jt(t,e)}}function dx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;i.uniform4fv(this.addr,e),jt(t,e)}}function fx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),jt(t,e)}else{if(Yt(t,n))return;zu.set(n),i.uniformMatrix2fv(this.addr,!1,zu),jt(t,n)}}function px(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),jt(t,e)}else{if(Yt(t,n))return;Hu.set(n),i.uniformMatrix3fv(this.addr,!1,Hu),jt(t,n)}}function mx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Yt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),jt(t,e)}else{if(Yt(t,n))return;ku.set(n),i.uniformMatrix4fv(this.addr,!1,ku),jt(t,n)}}function gx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function _x(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;i.uniform2iv(this.addr,e),jt(t,e)}}function yx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;i.uniform3iv(this.addr,e),jt(t,e)}}function xx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;i.uniform4iv(this.addr,e),jt(t,e)}}function vx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;i.uniform2uiv(this.addr,e),jt(t,e)}}function bx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;i.uniform3uiv(this.addr,e),jt(t,e)}}function Sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;i.uniform4uiv(this.addr,e),jt(t,e)}}function Ex(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ou.compareFunction=Yf,r=Ou):r=rp,t.setTexture2D(e||r,s)}function Tx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ap,s)}function Ax(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||cp,s)}function wx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||op,s)}function Rx(i){switch(i){case 5126:return lx;case 35664:return hx;case 35665:return ux;case 35666:return dx;case 35674:return fx;case 35675:return px;case 35676:return mx;case 5124:case 35670:return gx;case 35667:case 35671:return _x;case 35668:case 35672:return yx;case 35669:case 35673:return xx;case 5125:return vx;case 36294:return Mx;case 36295:return bx;case 36296:return Sx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ex;case 35679:case 36299:case 36307:return Tx;case 35680:case 36300:case 36308:case 36293:return Ax;case 36289:case 36303:case 36311:case 36292:return wx}}function Cx(i,e){i.uniform1fv(this.addr,e)}function Px(i,e){const t=Tr(e,this.size,2);i.uniform2fv(this.addr,t)}function Lx(i,e){const t=Tr(e,this.size,3);i.uniform3fv(this.addr,t)}function Dx(i,e){const t=Tr(e,this.size,4);i.uniform4fv(this.addr,t)}function Ix(i,e){const t=Tr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Nx(i,e){const t=Tr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ux(i,e){const t=Tr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ox(i,e){i.uniform1iv(this.addr,e)}function Fx(i,e){i.uniform2iv(this.addr,e)}function Bx(i,e){i.uniform3iv(this.addr,e)}function kx(i,e){i.uniform4iv(this.addr,e)}function Hx(i,e){i.uniform1uiv(this.addr,e)}function zx(i,e){i.uniform2uiv(this.addr,e)}function Vx(i,e){i.uniform3uiv(this.addr,e)}function Gx(i,e){i.uniform4uiv(this.addr,e)}function Wx(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);Yt(n,r)||(i.uniform1iv(this.addr,r),jt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||rp,r[o])}function Xx(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);Yt(n,r)||(i.uniform1iv(this.addr,r),jt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||ap,r[o])}function $x(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);Yt(n,r)||(i.uniform1iv(this.addr,r),jt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||cp,r[o])}function Yx(i,e,t){const n=this.cache,s=e.length,r=Na(t,s);Yt(n,r)||(i.uniform1iv(this.addr,r),jt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||op,r[o])}function jx(i){switch(i){case 5126:return Cx;case 35664:return Px;case 35665:return Lx;case 35666:return Dx;case 35674:return Ix;case 35675:return Nx;case 35676:return Ux;case 5124:case 35670:return Ox;case 35667:case 35671:return Fx;case 35668:case 35672:return Bx;case 35669:case 35673:return kx;case 5125:return Hx;case 36294:return zx;case 36295:return Vx;case 36296:return Gx;case 35678:case 36198:case 36298:case 36306:case 35682:return Wx;case 35679:case 36299:case 36307:return Xx;case 35680:case 36300:case 36308:case 36293:return $x;case 36289:case 36303:case 36311:case 36292:return Yx}}class qx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Rx(t.type)}}class Kx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jx(t.type)}}class Zx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Ec=/(\w+)(\])?(\[|\.)?/g;function Vu(i,e){i.seq.push(e),i.map[e.id]=e}function Jx(i,e,t){const n=i.name,s=n.length;for(Ec.lastIndex=0;;){const r=Ec.exec(n),o=Ec.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Vu(t,l===void 0?new qx(a,i,e):new Kx(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Zx(a),Vu(t,u)),t=u}}}class _a{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Jx(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Gu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Qx=37297;let ev=0;function tv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Wu=new Ge;function nv(i){Ze._getMatrix(Wu,Ze.workingColorSpace,i);const e=`mat3( ${Wu.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case Ia:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Xu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+tv(i.getShaderSource(e),o)}else return s}function iv(i,e){const t=nv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function sv(i,e){let t;switch(e){case sg:t="Linear";break;case rg:t="Reinhard";break;case og:t="Cineon";break;case If:t="ACESFilmic";break;case cg:t="AgX";break;case lg:t="Neutral";break;case ag:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const qo=new D;function rv(){Ze.getLuminanceCoefficients(qo);const i=qo.x.toFixed(4),e=qo.y.toFixed(4),t=qo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ov(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Kr).join(`
`)}function av(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function cv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Kr(i){return i!==""}function $u(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const lv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(i){return i.replace(lv,uv)}const hv=new Map;function uv(i,e){let t=Xe[e];if(t===void 0){const n=hv.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Cl(t)}const dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ju(i){return i.replace(dv,fv)}function fv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function qu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function pv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ih?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Lf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wi&&(e="SHADOWMAP_TYPE_VSM"),e}function mv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case hr:case ur:e="ENVMAP_TYPE_CUBE";break;case Da:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ur:e="ENVMAP_MODE_REFRACTION";break}return e}function _v(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Df:e="ENVMAP_BLENDING_MULTIPLY";break;case ng:e="ENVMAP_BLENDING_MIX";break;case ig:e="ENVMAP_BLENDING_ADD";break}return e}function yv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function xv(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=pv(t),l=mv(t),h=gv(t),u=_v(t),d=yv(t),p=ov(t),g=av(r),_=s.createProgram();let m,f,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kr).join(`
`),f.length>0&&(f+=`
`)):(m=[qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Kr).join(`
`),f=[qu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==us?"#define TONE_MAPPING":"",t.toneMapping!==us?Xe.tonemapping_pars_fragment:"",t.toneMapping!==us?sv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,iv("linearToOutputTexel",t.outputColorSpace),rv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Kr).join(`
`)),o=Cl(o),o=$u(o,t),o=Yu(o,t),a=Cl(a),a=$u(a,t),a=Yu(a,t),o=ju(o),a=ju(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===au?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===au?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=b+m+o,x=b+f+a,P=Gu(s,s.VERTEX_SHADER,S),A=Gu(s,s.FRAGMENT_SHADER,x);s.attachShader(_,P),s.attachShader(_,A),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(L){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(_).trim(),H=s.getShaderInfoLog(P).trim(),W=s.getShaderInfoLog(A).trim();let Z=!0,$=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,P,A);else{const te=Xu(s,P,"vertex"),X=Xu(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+B+`
`+te+`
`+X)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(H===""||W==="")&&($=!1);$&&(L.diagnostics={runnable:Z,programLog:B,vertexShader:{log:H,prefix:m},fragmentShader:{log:W,prefix:f}})}s.deleteShader(P),s.deleteShader(A),w=new _a(s,_),v=cv(s,_)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let v;this.getAttributes=function(){return v===void 0&&C(this),v};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,Qx)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ev++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=A,this}let vv=0;class Mv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new bv(e),t.set(e,n)),n}}class bv{constructor(e){this.id=vv++,this.code=e,this.usedTimes=0}}function Sv(i,e,t,n,s,r,o){const a=new fh,c=new Mv,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,y,L,B,H){const W=B.fog,Z=H.geometry,$=v.isMeshStandardMaterial?B.environment:null,te=(v.isMeshStandardMaterial?t:e).get(v.envMap||$),X=te&&te.mapping===Da?te.image.height:null,oe=g[v.type];v.precision!==null&&(p=s.getMaxPrecision(v.precision),p!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const de=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Te=de!==void 0?de.length:0;let je=0;Z.morphAttributes.position!==void 0&&(je=1),Z.morphAttributes.normal!==void 0&&(je=2),Z.morphAttributes.color!==void 0&&(je=3);let xt,j,ne,Me;if(oe){const dt=ci[oe];xt=dt.vertexShader,j=dt.fragmentShader}else xt=v.vertexShader,j=v.fragmentShader,c.update(v),ne=c.getVertexShaderID(v),Me=c.getFragmentShaderID(v);const ae=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),He=H.isInstancedMesh===!0,qe=H.isBatchedMesh===!0,Lt=!!v.map,it=!!v.matcap,Ft=!!te,O=!!v.aoMap,Un=!!v.lightMap,Qe=!!v.bumpMap,et=!!v.normalMap,Re=!!v.displacementMap,Et=!!v.emissiveMap,we=!!v.metalnessMap,R=!!v.roughnessMap,M=v.anisotropy>0,k=v.clearcoat>0,q=v.dispersion>0,J=v.iridescence>0,Y=v.sheen>0,Se=v.transmission>0,ce=M&&!!v.anisotropyMap,fe=k&&!!v.clearcoatMap,st=k&&!!v.clearcoatNormalMap,Q=k&&!!v.clearcoatRoughnessMap,me=J&&!!v.iridescenceMap,Pe=J&&!!v.iridescenceThicknessMap,Ne=Y&&!!v.sheenColorMap,ge=Y&&!!v.sheenRoughnessMap,tt=!!v.specularMap,We=!!v.specularColorMap,vt=!!v.specularIntensityMap,I=Se&&!!v.transmissionMap,re=Se&&!!v.thicknessMap,G=!!v.gradientMap,K=!!v.alphaMap,ue=v.alphaTest>0,le=!!v.alphaHash,ze=!!v.extensions;let Nt=us;v.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Nt=i.toneMapping);const rn={shaderID:oe,shaderType:v.type,shaderName:v.name,vertexShader:xt,fragmentShader:j,defines:v.defines,customVertexShaderID:ne,customFragmentShaderID:Me,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,batching:qe,batchingColor:qe&&H._colorsTexture!==null,instancing:He,instancingColor:He&&H.instanceColor!==null,instancingMorph:He&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:yn,alphaToCoverage:!!v.alphaToCoverage,map:Lt,matcap:it,envMap:Ft,envMapMode:Ft&&te.mapping,envMapCubeUVHeight:X,aoMap:O,lightMap:Un,bumpMap:Qe,normalMap:et,displacementMap:d&&Re,emissiveMap:Et,normalMapObjectSpace:et&&v.normalMapType===mg,normalMapTangentSpace:et&&v.normalMapType===$f,metalnessMap:we,roughnessMap:R,anisotropy:M,anisotropyMap:ce,clearcoat:k,clearcoatMap:fe,clearcoatNormalMap:st,clearcoatRoughnessMap:Q,dispersion:q,iridescence:J,iridescenceMap:me,iridescenceThicknessMap:Pe,sheen:Y,sheenColorMap:Ne,sheenRoughnessMap:ge,specularMap:tt,specularColorMap:We,specularIntensityMap:vt,transmission:Se,transmissionMap:I,thicknessMap:re,gradientMap:G,opaque:v.transparent===!1&&v.blending===rr&&v.alphaToCoverage===!1,alphaMap:K,alphaTest:ue,alphaHash:le,combine:v.combine,mapUv:Lt&&_(v.map.channel),aoMapUv:O&&_(v.aoMap.channel),lightMapUv:Un&&_(v.lightMap.channel),bumpMapUv:Qe&&_(v.bumpMap.channel),normalMapUv:et&&_(v.normalMap.channel),displacementMapUv:Re&&_(v.displacementMap.channel),emissiveMapUv:Et&&_(v.emissiveMap.channel),metalnessMapUv:we&&_(v.metalnessMap.channel),roughnessMapUv:R&&_(v.roughnessMap.channel),anisotropyMapUv:ce&&_(v.anisotropyMap.channel),clearcoatMapUv:fe&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:st&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Pe&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:ge&&_(v.sheenRoughnessMap.channel),specularMapUv:tt&&_(v.specularMap.channel),specularColorMapUv:We&&_(v.specularColorMap.channel),specularIntensityMapUv:vt&&_(v.specularIntensityMap.channel),transmissionMapUv:I&&_(v.transmissionMap.channel),thicknessMapUv:re&&_(v.thicknessMap.channel),alphaMapUv:K&&_(v.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(et||M),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Z.attributes.uv&&(Lt||K),fog:!!W,useFog:v.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Le,skinning:H.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:je,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Lt&&v.map.isVideoTexture===!0&&Ze.getTransfer(v.map.colorSpace)===_t,decodeVideoTextureEmissive:Et&&v.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(v.emissiveMap.colorSpace)===_t,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===tn,flipSided:v.side===mn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ze&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&v.extensions.multiDraw===!0||qe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return rn.vertexUv1s=l.has(1),rn.vertexUv2s=l.has(2),rn.vertexUv3s=l.has(3),l.clear(),rn}function f(v){const y=[];if(v.shaderID?y.push(v.shaderID):(y.push(v.customVertexShaderID),y.push(v.customFragmentShaderID)),v.defines!==void 0)for(const L in v.defines)y.push(L),y.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(b(y,v),S(y,v),y.push(i.outputColorSpace)),y.push(v.customProgramCacheKey),y.join()}function b(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)}function S(v,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),v.push(a.mask)}function x(v){const y=g[v.type];let L;if(y){const B=ci[y];L=o_.clone(B.uniforms)}else L=v.uniforms;return L}function P(v,y){let L;for(let B=0,H=h.length;B<H;B++){const W=h[B];if(W.cacheKey===y){L=W,++L.usedTimes;break}}return L===void 0&&(L=new xv(i,y,v,r),h.push(L)),L}function A(v){if(--v.usedTimes===0){const y=h.indexOf(v);h[y]=h[h.length-1],h.pop(),v.destroy()}}function C(v){c.remove(v)}function w(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:P,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:w}}function Ev(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Tv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Ku(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Zu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,p,g,_,m){let f=i[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||Tv),n.length>1&&n.sort(d||Ku),s.length>1&&s.sort(d||Ku)}function h(){for(let u=e,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Av(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new Zu,i.set(n,[o])):s>=r.length?(o=new Zu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function wv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ie};break;case"SpotLight":t={position:new D,direction:new D,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function Rv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Cv=0;function Pv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Lv(i){const e=new wv,t=Rv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const s=new D,r=new ke,o=new ke;function a(l){let h=0,u=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,b=0,S=0,x=0,P=0,A=0,C=0;l.sort(Pv);for(let v=0,y=l.length;v<y;v++){const L=l[v],B=L.color,H=L.intensity,W=L.distance,Z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=B.r*H,u+=B.g*H,d+=B.b*H;else if(L.isLightProbe){for(let $=0;$<9;$++)n.probe[$].addScaledVector(L.sh.coefficients[$],H);C++}else if(L.isDirectionalLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const te=L.shadow,X=t.get(L);X.shadowIntensity=te.intensity,X.shadowBias=te.bias,X.shadowNormalBias=te.normalBias,X.shadowRadius=te.radius,X.shadowMapSize=te.mapSize,n.directionalShadow[p]=X,n.directionalShadowMap[p]=Z,n.directionalShadowMatrix[p]=L.shadow.matrix,b++}n.directional[p]=$,p++}else if(L.isSpotLight){const $=e.get(L);$.position.setFromMatrixPosition(L.matrixWorld),$.color.copy(B).multiplyScalar(H),$.distance=W,$.coneCos=Math.cos(L.angle),$.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),$.decay=L.decay,n.spot[_]=$;const te=L.shadow;if(L.map&&(n.spotLightMap[P]=L.map,P++,te.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[_]=te.matrix,L.castShadow){const X=t.get(L);X.shadowIntensity=te.intensity,X.shadowBias=te.bias,X.shadowNormalBias=te.normalBias,X.shadowRadius=te.radius,X.shadowMapSize=te.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=Z,x++}_++}else if(L.isRectAreaLight){const $=e.get(L);$.color.copy(B).multiplyScalar(H),$.halfWidth.set(L.width*.5,0,0),$.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=$,m++}else if(L.isPointLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity),$.distance=L.distance,$.decay=L.decay,L.castShadow){const te=L.shadow,X=t.get(L);X.shadowIntensity=te.intensity,X.shadowBias=te.bias,X.shadowNormalBias=te.normalBias,X.shadowRadius=te.radius,X.shadowMapSize=te.mapSize,X.shadowCameraNear=te.camera.near,X.shadowCameraFar=te.camera.far,n.pointShadow[g]=X,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=L.shadow.matrix,S++}n.point[g]=$,g++}else if(L.isHemisphereLight){const $=e.get(L);$.skyColor.copy(L.color).multiplyScalar(H),$.groundColor.copy(L.groundColor).multiplyScalar(H),n.hemi[f]=$,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const w=n.hash;(w.directionalLength!==p||w.pointLength!==g||w.spotLength!==_||w.rectAreaLength!==m||w.hemiLength!==f||w.numDirectionalShadows!==b||w.numPointShadows!==S||w.numSpotShadows!==x||w.numSpotMaps!==P||w.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+P-A,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=C,w.directionalLength=p,w.pointLength=g,w.spotLength=_,w.rectAreaLength=m,w.hemiLength=f,w.numDirectionalShadows=b,w.numPointShadows=S,w.numSpotShadows=x,w.numSpotMaps=P,w.numLightProbes=C,n.version=Cv++)}function c(l,h){let u=0,d=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,b=l.length;f<b;f++){const S=l[f];if(S.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(S.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Ju(i){const e=new Lv(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Dv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Ju(i),e.set(s,[a])):r>=o.length?(a=new Ju(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Iv extends di{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=fg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Nv extends di{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Uv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ov=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Fv(i,e,t){let n=new ph;const s=new Ce,r=new Ce,o=new ct,a=new Iv({depthPacking:pg}),c=new Nv,l={},h=t.maxTextureSize,u={[zi]:mn,[mn]:zi,[tn]:tn},d=new fs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:Uv,fragmentShader:Ov}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new sn;g.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ie(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ih;let f=this.type;this.render=function(A,C,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const v=i.getRenderTarget(),y=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),B=i.state;B.setBlending(hs),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const H=f!==wi&&this.type===wi,W=f===wi&&this.type!==wi;for(let Z=0,$=A.length;Z<$;Z++){const te=A[Z],X=te.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const oe=X.getFrameExtents();if(s.multiply(oe),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,X.mapSize.y=r.y)),X.map===null||H===!0||W===!0){const Te=this.type!==wi?{minFilter:gn,magFilter:gn}:{};X.map!==null&&X.map.dispose(),X.map=new Ds(s.x,s.y,Te),X.map.texture.name=te.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const de=X.getViewportCount();for(let Te=0;Te<de;Te++){const je=X.getViewport(Te);o.set(r.x*je.x,r.y*je.y,r.x*je.z,r.y*je.w),B.viewport(o),X.updateMatrices(te,Te),n=X.getFrustum(),x(C,w,X.camera,te,this.type)}X.isPointLightShadow!==!0&&this.type===wi&&b(X,w),X.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(v,y,L)};function b(A,C){const w=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ds(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(C,null,w,d,_,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(C,null,w,p,_,null)}function S(A,C,w,v){let y=null;const L=w.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)y=L;else if(y=w.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const B=y.uuid,H=C.uuid;let W=l[B];W===void 0&&(W={},l[B]=W);let Z=W[H];Z===void 0&&(Z=y.clone(),W[H]=Z,C.addEventListener("dispose",P)),y=Z}if(y.visible=C.visible,y.wireframe=C.wireframe,v===wi?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:u[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,w.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=i.properties.get(y);B.light=w}return y}function x(A,C,w,v,y){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===wi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,A.matrixWorld);const H=e.update(A),W=A.material;if(Array.isArray(W)){const Z=H.groups;for(let $=0,te=Z.length;$<te;$++){const X=Z[$],oe=W[X.materialIndex];if(oe&&oe.visible){const de=S(A,oe,v,y);A.onBeforeShadow(i,A,C,w,H,de,X),i.renderBufferDirect(w,null,H,de,A,X),A.onAfterShadow(i,A,C,w,H,de,X)}}}else if(W.visible){const Z=S(A,W,v,y);A.onBeforeShadow(i,A,C,w,H,Z,null),i.renderBufferDirect(w,null,H,Z,A,null),A.onAfterShadow(i,A,C,w,H,Z,null)}}const B=A.children;for(let H=0,W=B.length;H<W;H++)x(B[H],C,w,v,y)}function P(A){A.target.removeEventListener("dispose",P);for(const w in l){const v=l[w],y=A.target.uuid;y in v&&(v[y].dispose(),delete v[y])}}}const Bv={[$c]:Yc,[jc]:Zc,[qc]:Jc,[lr]:Kc,[Yc]:$c,[Zc]:jc,[Jc]:qc,[Kc]:lr};function kv(i,e){function t(){let I=!1;const re=new ct;let G=null;const K=new ct(0,0,0,0);return{setMask:function(ue){G!==ue&&!I&&(i.colorMask(ue,ue,ue,ue),G=ue)},setLocked:function(ue){I=ue},setClear:function(ue,le,ze,Nt,rn){rn===!0&&(ue*=Nt,le*=Nt,ze*=Nt),re.set(ue,le,ze,Nt),K.equals(re)===!1&&(i.clearColor(ue,le,ze,Nt),K.copy(re))},reset:function(){I=!1,G=null,K.set(-1,0,0,0)}}}function n(){let I=!1,re=!1,G=null,K=null,ue=null;return{setReversed:function(le){if(re!==le){const ze=e.get("EXT_clip_control");re?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT);const Nt=ue;ue=null,this.setClear(Nt)}re=le},getReversed:function(){return re},setTest:function(le){le?ae(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(le){G!==le&&!I&&(i.depthMask(le),G=le)},setFunc:function(le){if(re&&(le=Bv[le]),K!==le){switch(le){case $c:i.depthFunc(i.NEVER);break;case Yc:i.depthFunc(i.ALWAYS);break;case jc:i.depthFunc(i.LESS);break;case lr:i.depthFunc(i.LEQUAL);break;case qc:i.depthFunc(i.EQUAL);break;case Kc:i.depthFunc(i.GEQUAL);break;case Zc:i.depthFunc(i.GREATER);break;case Jc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=le}},setLocked:function(le){I=le},setClear:function(le){ue!==le&&(re&&(le=1-le),i.clearDepth(le),ue=le)},reset:function(){I=!1,G=null,K=null,ue=null,re=!1}}}function s(){let I=!1,re=null,G=null,K=null,ue=null,le=null,ze=null,Nt=null,rn=null;return{setTest:function(dt){I||(dt?ae(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(dt){re!==dt&&!I&&(i.stencilMask(dt),re=dt)},setFunc:function(dt,Gn,xi){(G!==dt||K!==Gn||ue!==xi)&&(i.stencilFunc(dt,Gn,xi),G=dt,K=Gn,ue=xi)},setOp:function(dt,Gn,xi){(le!==dt||ze!==Gn||Nt!==xi)&&(i.stencilOp(dt,Gn,xi),le=dt,ze=Gn,Nt=xi)},setLocked:function(dt){I=dt},setClear:function(dt){rn!==dt&&(i.clearStencil(dt),rn=dt)},reset:function(){I=!1,re=null,G=null,K=null,ue=null,le=null,ze=null,Nt=null,rn=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,b=null,S=null,x=null,P=null,A=null,C=new Ie(0,0,0),w=0,v=!1,y=null,L=null,B=null,H=null,W=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,te=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(X)[1]),$=te>=1):X.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),$=te>=2);let oe=null,de={};const Te=i.getParameter(i.SCISSOR_BOX),je=i.getParameter(i.VIEWPORT),xt=new ct().fromArray(Te),j=new ct().fromArray(je);function ne(I,re,G,K){const ue=new Uint8Array(4),le=i.createTexture();i.bindTexture(I,le),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ze=0;ze<G;ze++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(re+ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return le}const Me={};Me[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),Me[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Me[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(i.DEPTH_TEST),o.setFunc(lr),Qe(!1),et(Jh),ae(i.CULL_FACE),O(hs);function ae(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Le(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function He(I,re){return u[I]!==re?(i.bindFramebuffer(I,re),u[I]=re,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=re),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=re),!0):!1}function qe(I,re){let G=p,K=!1;if(I){G=d.get(re),G===void 0&&(G=[],d.set(re,G));const ue=I.textures;if(G.length!==ue.length||G[0]!==i.COLOR_ATTACHMENT0){for(let le=0,ze=ue.length;le<ze;le++)G[le]=i.COLOR_ATTACHMENT0+le;G.length=ue.length,K=!0}}else G[0]!==i.BACK&&(G[0]=i.BACK,K=!0);K&&i.drawBuffers(G)}function Lt(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const it={[Rs]:i.FUNC_ADD,[km]:i.FUNC_SUBTRACT,[Hm]:i.FUNC_REVERSE_SUBTRACT};it[zm]=i.MIN,it[Vm]=i.MAX;const Ft={[Gm]:i.ZERO,[Wm]:i.ONE,[Xm]:i.SRC_COLOR,[Wc]:i.SRC_ALPHA,[Zm]:i.SRC_ALPHA_SATURATE,[qm]:i.DST_COLOR,[Ym]:i.DST_ALPHA,[$m]:i.ONE_MINUS_SRC_COLOR,[Xc]:i.ONE_MINUS_SRC_ALPHA,[Km]:i.ONE_MINUS_DST_COLOR,[jm]:i.ONE_MINUS_DST_ALPHA,[Jm]:i.CONSTANT_COLOR,[Qm]:i.ONE_MINUS_CONSTANT_COLOR,[eg]:i.CONSTANT_ALPHA,[tg]:i.ONE_MINUS_CONSTANT_ALPHA};function O(I,re,G,K,ue,le,ze,Nt,rn,dt){if(I===hs){_===!0&&(Le(i.BLEND),_=!1);return}if(_===!1&&(ae(i.BLEND),_=!0),I!==Bm){if(I!==m||dt!==v){if((f!==Rs||x!==Rs)&&(i.blendEquation(i.FUNC_ADD),f=Rs,x=Rs),dt)switch(I){case rr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qh:i.blendFunc(i.ONE,i.ONE);break;case eu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case tu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case rr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qh:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case eu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case tu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}b=null,S=null,P=null,A=null,C.set(0,0,0),w=0,m=I,v=dt}return}ue=ue||re,le=le||G,ze=ze||K,(re!==f||ue!==x)&&(i.blendEquationSeparate(it[re],it[ue]),f=re,x=ue),(G!==b||K!==S||le!==P||ze!==A)&&(i.blendFuncSeparate(Ft[G],Ft[K],Ft[le],Ft[ze]),b=G,S=K,P=le,A=ze),(Nt.equals(C)===!1||rn!==w)&&(i.blendColor(Nt.r,Nt.g,Nt.b,rn),C.copy(Nt),w=rn),m=I,v=!1}function Un(I,re){I.side===tn?Le(i.CULL_FACE):ae(i.CULL_FACE);let G=I.side===mn;re&&(G=!G),Qe(G),I.blending===rr&&I.transparent===!1?O(hs):O(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const K=I.stencilWrite;a.setTest(K),K&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Et(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function Qe(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function et(I){I!==Om?(ae(i.CULL_FACE),I!==L&&(I===Jh?i.cullFace(i.BACK):I===Fm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),L=I}function Re(I){I!==B&&($&&i.lineWidth(I),B=I)}function Et(I,re,G){I?(ae(i.POLYGON_OFFSET_FILL),(H!==re||W!==G)&&(i.polygonOffset(re,G),H=re,W=G)):Le(i.POLYGON_OFFSET_FILL)}function we(I){I?ae(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function R(I){I===void 0&&(I=i.TEXTURE0+Z-1),oe!==I&&(i.activeTexture(I),oe=I)}function M(I,re,G){G===void 0&&(oe===null?G=i.TEXTURE0+Z-1:G=oe);let K=de[G];K===void 0&&(K={type:void 0,texture:void 0},de[G]=K),(K.type!==I||K.texture!==re)&&(oe!==G&&(i.activeTexture(G),oe=G),i.bindTexture(I,re||Me[I]),K.type=I,K.texture=re)}function k(){const I=de[oe];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Se(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ce(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function fe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function st(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pe(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ne(I){xt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),xt.copy(I))}function ge(I){j.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),j.copy(I))}function tt(I,re){let G=l.get(re);G===void 0&&(G=new WeakMap,l.set(re,G));let K=G.get(I);K===void 0&&(K=i.getUniformBlockIndex(re,I.name),G.set(I,K))}function We(I,re){const K=l.get(re).get(I);c.get(re)!==K&&(i.uniformBlockBinding(re,K,I.__bindingPointIndex),c.set(re,K))}function vt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},oe=null,de={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,b=null,S=null,x=null,P=null,A=null,C=new Ie(0,0,0),w=0,v=!1,y=null,L=null,B=null,H=null,W=null,xt.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Le,bindFramebuffer:He,drawBuffers:qe,useProgram:Lt,setBlending:O,setMaterial:Un,setFlipSided:Qe,setCullFace:et,setLineWidth:Re,setPolygonOffset:Et,setScissorTest:we,activeTexture:R,bindTexture:M,unbindTexture:k,compressedTexImage2D:q,compressedTexImage3D:J,texImage2D:me,texImage3D:Pe,updateUBOMapping:tt,uniformBlockBinding:We,texStorage2D:st,texStorage3D:Q,texSubImage2D:Y,texSubImage3D:Se,compressedTexSubImage2D:ce,compressedTexSubImage3D:fe,scissor:Ne,viewport:ge,reset:vt}}function Qu(i,e,t,n){const s=Hv(n);switch(t){case kf:return i*e;case zf:return i*e;case Vf:return i*e*2;case ah:return i*e/s.components*s.byteLength;case ch:return i*e/s.components*s.byteLength;case Gf:return i*e*2/s.components*s.byteLength;case lh:return i*e*2/s.components*s.byteLength;case Hf:return i*e*3/s.components*s.byteLength;case kn:return i*e*4/s.components*s.byteLength;case hh:return i*e*4/s.components*s.byteLength;case da:case fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case pa:case ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case nl:case sl:return Math.max(i,16)*Math.max(e,8)/4;case tl:case il:return Math.max(i,8)*Math.max(e,8)/2;case rl:case ol:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case al:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ll:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ul:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case dl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case fl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case gl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _l:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case yl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case vl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ml:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ga:case bl:case Sl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Wf:case El:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Tl:case Al:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hv(i){switch(i){case Vi:case Of:return{byteLength:1,components:1};case io:case Ff:case mo:return{byteLength:2,components:1};case rh:case oh:return{byteLength:2,components:4};case Ls:case sh:case ei:return{byteLength:4,components:1};case Bf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function zv(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ce,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,M){return p?new OffscreenCanvas(R,M):oo("canvas")}function _(R,M,k){let q=1;const J=we(R);if((J.width>k||J.height>k)&&(q=k/Math.max(J.width,J.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Y=Math.floor(q*J.width),Se=Math.floor(q*J.height);u===void 0&&(u=g(Y,Se));const ce=M?g(Y,Se):u;return ce.width=Y,ce.height=Se,ce.getContext("2d").drawImage(R,0,0,Y,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+Se+")."),ce}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function m(R){return R.generateMipmaps}function f(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(R,M,k,q,J=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=M;if(M===i.RED&&(k===i.FLOAT&&(Y=i.R32F),k===i.HALF_FLOAT&&(Y=i.R16F),k===i.UNSIGNED_BYTE&&(Y=i.R8)),M===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Y=i.R8UI),k===i.UNSIGNED_SHORT&&(Y=i.R16UI),k===i.UNSIGNED_INT&&(Y=i.R32UI),k===i.BYTE&&(Y=i.R8I),k===i.SHORT&&(Y=i.R16I),k===i.INT&&(Y=i.R32I)),M===i.RG&&(k===i.FLOAT&&(Y=i.RG32F),k===i.HALF_FLOAT&&(Y=i.RG16F),k===i.UNSIGNED_BYTE&&(Y=i.RG8)),M===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Y=i.RG8UI),k===i.UNSIGNED_SHORT&&(Y=i.RG16UI),k===i.UNSIGNED_INT&&(Y=i.RG32UI),k===i.BYTE&&(Y=i.RG8I),k===i.SHORT&&(Y=i.RG16I),k===i.INT&&(Y=i.RG32I)),M===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),k===i.UNSIGNED_INT&&(Y=i.RGB32UI),k===i.BYTE&&(Y=i.RGB8I),k===i.SHORT&&(Y=i.RGB16I),k===i.INT&&(Y=i.RGB32I)),M===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),k===i.UNSIGNED_INT&&(Y=i.RGBA32UI),k===i.BYTE&&(Y=i.RGBA8I),k===i.SHORT&&(Y=i.RGBA16I),k===i.INT&&(Y=i.RGBA32I)),M===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),M===i.RGBA){const Se=J?Ia:Ze.getTransfer(q);k===i.FLOAT&&(Y=i.RGBA32F),k===i.HALF_FLOAT&&(Y=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Y=Se===_t?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function x(R,M){let k;return R?M===null||M===Ls||M===dr?k=i.DEPTH24_STENCIL8:M===ei?k=i.DEPTH32F_STENCIL8:M===io&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ls||M===dr?k=i.DEPTH_COMPONENT24:M===ei?k=i.DEPTH_COMPONENT32F:M===io&&(k=i.DEPTH_COMPONENT16),k}function P(R,M){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==gn&&R.minFilter!==Gt?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function A(R){const M=R.target;M.removeEventListener("dispose",A),w(M),M.isVideoTexture&&h.delete(M)}function C(R){const M=R.target;M.removeEventListener("dispose",C),y(M)}function w(R){const M=n.get(R);if(M.__webglInit===void 0)return;const k=R.source,q=d.get(k);if(q){const J=q[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&v(R),Object.keys(q).length===0&&d.delete(k)}n.remove(R)}function v(R){const M=n.get(R);i.deleteTexture(M.__webglTexture);const k=R.source,q=d.get(k);delete q[M.__cacheKey],o.memory.textures--}function y(R){const M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let J=0;J<M.__webglFramebuffer[q].length;J++)i.deleteFramebuffer(M.__webglFramebuffer[q][J]);else i.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)i.deleteFramebuffer(M.__webglFramebuffer[q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=R.textures;for(let q=0,J=k.length;q<J;q++){const Y=n.get(k[q]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(k[q])}n.remove(R)}let L=0;function B(){L=0}function H(){const R=L;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),L+=1,R}function W(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function Z(R,M){const k=n.get(R);if(R.isVideoTexture&&Re(R),R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){const q=R.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(k,R,M);return}}t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+M)}function $(R,M){const k=n.get(R);if(R.version>0&&k.__version!==R.version){j(k,R,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+M)}function te(R,M){const k=n.get(R);if(R.version>0&&k.__version!==R.version){j(k,R,M);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+M)}function X(R,M){const k=n.get(R);if(R.version>0&&k.__version!==R.version){ne(k,R,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+M)}const oe={[ds]:i.REPEAT,[as]:i.CLAMP_TO_EDGE,[Ma]:i.MIRRORED_REPEAT},de={[gn]:i.NEAREST,[Uf]:i.NEAREST_MIPMAP_NEAREST,[jr]:i.NEAREST_MIPMAP_LINEAR,[Gt]:i.LINEAR,[ua]:i.LINEAR_MIPMAP_NEAREST,[Di]:i.LINEAR_MIPMAP_LINEAR},Te={[gg]:i.NEVER,[bg]:i.ALWAYS,[_g]:i.LESS,[Yf]:i.LEQUAL,[yg]:i.EQUAL,[Mg]:i.GEQUAL,[xg]:i.GREATER,[vg]:i.NOTEQUAL};function je(R,M){if(M.type===ei&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Gt||M.magFilter===ua||M.magFilter===jr||M.magFilter===Di||M.minFilter===Gt||M.minFilter===ua||M.minFilter===jr||M.minFilter===Di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,oe[M.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,oe[M.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,oe[M.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,de[M.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,de[M.minFilter]),M.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Te[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===gn||M.minFilter!==jr&&M.minFilter!==Di||M.type===ei&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function xt(R,M){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",A));const q=M.source;let J=d.get(q);J===void 0&&(J={},d.set(q,J));const Y=W(M);if(Y!==R.__cacheKey){J[Y]===void 0&&(J[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),J[Y].usedTimes++;const Se=J[R.__cacheKey];Se!==void 0&&(J[R.__cacheKey].usedTimes--,Se.usedTimes===0&&v(M)),R.__cacheKey=Y,R.__webglTexture=J[Y].texture}return k}function j(R,M,k){let q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=i.TEXTURE_3D);const J=xt(R,M),Y=M.source;t.bindTexture(q,R.__webglTexture,i.TEXTURE0+k);const Se=n.get(Y);if(Y.version!==Se.__version||J===!0){t.activeTexture(i.TEXTURE0+k);const ce=Ze.getPrimaries(Ze.workingColorSpace),fe=M.colorSpace===rs?null:Ze.getPrimaries(M.colorSpace),st=M.colorSpace===rs||ce===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,st);let Q=_(M.image,!1,s.maxTextureSize);Q=Et(M,Q);const me=r.convert(M.format,M.colorSpace),Pe=r.convert(M.type);let Ne=S(M.internalFormat,me,Pe,M.colorSpace,M.isVideoTexture);je(q,M);let ge;const tt=M.mipmaps,We=M.isVideoTexture!==!0,vt=Se.__version===void 0||J===!0,I=Y.dataReady,re=P(M,Q);if(M.isDepthTexture)Ne=x(M.format===fr,M.type),vt&&(We?t.texStorage2D(i.TEXTURE_2D,1,Ne,Q.width,Q.height):t.texImage2D(i.TEXTURE_2D,0,Ne,Q.width,Q.height,0,me,Pe,null));else if(M.isDataTexture)if(tt.length>0){We&&vt&&t.texStorage2D(i.TEXTURE_2D,re,Ne,tt[0].width,tt[0].height);for(let G=0,K=tt.length;G<K;G++)ge=tt[G],We?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,ge.width,ge.height,me,Pe,ge.data):t.texImage2D(i.TEXTURE_2D,G,Ne,ge.width,ge.height,0,me,Pe,ge.data);M.generateMipmaps=!1}else We?(vt&&t.texStorage2D(i.TEXTURE_2D,re,Ne,Q.width,Q.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,me,Pe,Q.data)):t.texImage2D(i.TEXTURE_2D,0,Ne,Q.width,Q.height,0,me,Pe,Q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){We&&vt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Ne,tt[0].width,tt[0].height,Q.depth);for(let G=0,K=tt.length;G<K;G++)if(ge=tt[G],M.format!==kn)if(me!==null)if(We){if(I)if(M.layerUpdates.size>0){const ue=Qu(ge.width,ge.height,M.format,M.type);for(const le of M.layerUpdates){const ze=ge.data.subarray(le*ue/ge.data.BYTES_PER_ELEMENT,(le+1)*ue/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,le,ge.width,ge.height,1,me,ze)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,ge.width,ge.height,Q.depth,me,ge.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,G,Ne,ge.width,ge.height,Q.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,ge.width,ge.height,Q.depth,me,Pe,ge.data):t.texImage3D(i.TEXTURE_2D_ARRAY,G,Ne,ge.width,ge.height,Q.depth,0,me,Pe,ge.data)}else{We&&vt&&t.texStorage2D(i.TEXTURE_2D,re,Ne,tt[0].width,tt[0].height);for(let G=0,K=tt.length;G<K;G++)ge=tt[G],M.format!==kn?me!==null?We?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,G,0,0,ge.width,ge.height,me,ge.data):t.compressedTexImage2D(i.TEXTURE_2D,G,Ne,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,ge.width,ge.height,me,Pe,ge.data):t.texImage2D(i.TEXTURE_2D,G,Ne,ge.width,ge.height,0,me,Pe,ge.data)}else if(M.isDataArrayTexture)if(We){if(vt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Ne,Q.width,Q.height,Q.depth),I)if(M.layerUpdates.size>0){const G=Qu(Q.width,Q.height,M.format,M.type);for(const K of M.layerUpdates){const ue=Q.data.subarray(K*G/Q.data.BYTES_PER_ELEMENT,(K+1)*G/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,Q.width,Q.height,1,me,Pe,ue)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,me,Pe,Q.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ne,Q.width,Q.height,Q.depth,0,me,Pe,Q.data);else if(M.isData3DTexture)We?(vt&&t.texStorage3D(i.TEXTURE_3D,re,Ne,Q.width,Q.height,Q.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,me,Pe,Q.data)):t.texImage3D(i.TEXTURE_3D,0,Ne,Q.width,Q.height,Q.depth,0,me,Pe,Q.data);else if(M.isFramebufferTexture){if(vt)if(We)t.texStorage2D(i.TEXTURE_2D,re,Ne,Q.width,Q.height);else{let G=Q.width,K=Q.height;for(let ue=0;ue<re;ue++)t.texImage2D(i.TEXTURE_2D,ue,Ne,G,K,0,me,Pe,null),G>>=1,K>>=1}}else if(tt.length>0){if(We&&vt){const G=we(tt[0]);t.texStorage2D(i.TEXTURE_2D,re,Ne,G.width,G.height)}for(let G=0,K=tt.length;G<K;G++)ge=tt[G],We?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,me,Pe,ge):t.texImage2D(i.TEXTURE_2D,G,Ne,me,Pe,ge);M.generateMipmaps=!1}else if(We){if(vt){const G=we(Q);t.texStorage2D(i.TEXTURE_2D,re,Ne,G.width,G.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,Pe,Q)}else t.texImage2D(i.TEXTURE_2D,0,Ne,me,Pe,Q);m(M)&&f(q),Se.__version=Y.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function ne(R,M,k){if(M.image.length!==6)return;const q=xt(R,M),J=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+k);const Y=n.get(J);if(J.version!==Y.__version||q===!0){t.activeTexture(i.TEXTURE0+k);const Se=Ze.getPrimaries(Ze.workingColorSpace),ce=M.colorSpace===rs?null:Ze.getPrimaries(M.colorSpace),fe=M.colorSpace===rs||Se===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const st=M.isCompressedTexture||M.image[0].isCompressedTexture,Q=M.image[0]&&M.image[0].isDataTexture,me=[];for(let K=0;K<6;K++)!st&&!Q?me[K]=_(M.image[K],!0,s.maxCubemapSize):me[K]=Q?M.image[K].image:M.image[K],me[K]=Et(M,me[K]);const Pe=me[0],Ne=r.convert(M.format,M.colorSpace),ge=r.convert(M.type),tt=S(M.internalFormat,Ne,ge,M.colorSpace),We=M.isVideoTexture!==!0,vt=Y.__version===void 0||q===!0,I=J.dataReady;let re=P(M,Pe);je(i.TEXTURE_CUBE_MAP,M);let G;if(st){We&&vt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,re,tt,Pe.width,Pe.height);for(let K=0;K<6;K++){G=me[K].mipmaps;for(let ue=0;ue<G.length;ue++){const le=G[ue];M.format!==kn?Ne!==null?We?I&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue,0,0,le.width,le.height,Ne,le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue,tt,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue,0,0,le.width,le.height,Ne,ge,le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue,tt,le.width,le.height,0,Ne,ge,le.data)}}}else{if(G=M.mipmaps,We&&vt){G.length>0&&re++;const K=we(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,re,tt,K.width,K.height)}for(let K=0;K<6;K++)if(Q){We?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,me[K].width,me[K].height,Ne,ge,me[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,tt,me[K].width,me[K].height,0,Ne,ge,me[K].data);for(let ue=0;ue<G.length;ue++){const ze=G[ue].image[K].image;We?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue+1,0,0,ze.width,ze.height,Ne,ge,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue+1,tt,ze.width,ze.height,0,Ne,ge,ze.data)}}else{We?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ne,ge,me[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,tt,Ne,ge,me[K]);for(let ue=0;ue<G.length;ue++){const le=G[ue];We?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue+1,0,0,Ne,ge,le.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue+1,tt,Ne,ge,le.image[K])}}}m(M)&&f(i.TEXTURE_CUBE_MAP),Y.__version=J.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function Me(R,M,k,q,J,Y){const Se=r.convert(k.format,k.colorSpace),ce=r.convert(k.type),fe=S(k.internalFormat,Se,ce,k.colorSpace),st=n.get(M),Q=n.get(k);if(Q.__renderTarget=M,!st.__hasExternalTextures){const me=Math.max(1,M.width>>Y),Pe=Math.max(1,M.height>>Y);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,Y,fe,me,Pe,M.depth,0,Se,ce,null):t.texImage2D(J,Y,fe,me,Pe,0,Se,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),et(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,J,Q.__webglTexture,0,Qe(M)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,J,Q.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(R,M,k){if(i.bindRenderbuffer(i.RENDERBUFFER,R),M.depthBuffer){const q=M.depthTexture,J=q&&q.isDepthTexture?q.type:null,Y=x(M.stencilBuffer,J),Se=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=Qe(M);et(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,Y,M.width,M.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,Y,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Y,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Se,i.RENDERBUFFER,R)}else{const q=M.textures;for(let J=0;J<q.length;J++){const Y=q[J],Se=r.convert(Y.format,Y.colorSpace),ce=r.convert(Y.type),fe=S(Y.internalFormat,Se,ce,Y.colorSpace),st=Qe(M);k&&et(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,st,fe,M.width,M.height):et(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st,fe,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,fe,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(M.depthTexture);q.__renderTarget=M,(!q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Z(M.depthTexture,0);const J=q.__webglTexture,Y=Qe(M);if(M.depthTexture.format===or)et(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(M.depthTexture.format===fr)et(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function He(R){const M=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const q=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){const J=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",J)};q.addEventListener("dispose",J),M.__depthDisposeCallback=J}M.__boundDepthTexture=q}if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Le(M.__webglFramebuffer,R)}else if(k){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=i.createRenderbuffer(),ae(M.__webglDepthbuffer[q],R,!1);else{const J=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=M.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ae(M.__webglDepthbuffer,R,!1);else{const q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,J)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(R,M,k){const q=n.get(R);M!==void 0&&Me(q.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&He(R)}function Lt(R){const M=R.texture,k=n.get(R),q=n.get(M);R.addEventListener("dispose",C);const J=R.textures,Y=R.isWebGLCubeRenderTarget===!0,Se=J.length>1;if(Se||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=M.version,o.memory.textures++),Y){k.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[ce]=[];for(let fe=0;fe<M.mipmaps.length;fe++)k.__webglFramebuffer[ce][fe]=i.createFramebuffer()}else k.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let ce=0;ce<M.mipmaps.length;ce++)k.__webglFramebuffer[ce]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Se)for(let ce=0,fe=J.length;ce<fe;ce++){const st=n.get(J[ce]);st.__webglTexture===void 0&&(st.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&et(R)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ce=0;ce<J.length;ce++){const fe=J[ce];k.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[ce]);const st=r.convert(fe.format,fe.colorSpace),Q=r.convert(fe.type),me=S(fe.internalFormat,st,Q,fe.colorSpace,R.isXRRenderTarget===!0),Pe=Qe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,me,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,k.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),je(i.TEXTURE_CUBE_MAP,M);for(let ce=0;ce<6;ce++)if(M.mipmaps&&M.mipmaps.length>0)for(let fe=0;fe<M.mipmaps.length;fe++)Me(k.__webglFramebuffer[ce][fe],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,fe);else Me(k.__webglFramebuffer[ce],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(M)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ce=0,fe=J.length;ce<fe;ce++){const st=J[ce],Q=n.get(st);t.bindTexture(i.TEXTURE_2D,Q.__webglTexture),je(i.TEXTURE_2D,st),Me(k.__webglFramebuffer,R,st,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,0),m(st)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ce=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,q.__webglTexture),je(ce,M),M.mipmaps&&M.mipmaps.length>0)for(let fe=0;fe<M.mipmaps.length;fe++)Me(k.__webglFramebuffer[fe],R,M,i.COLOR_ATTACHMENT0,ce,fe);else Me(k.__webglFramebuffer,R,M,i.COLOR_ATTACHMENT0,ce,0);m(M)&&f(ce),t.unbindTexture()}R.depthBuffer&&He(R)}function it(R){const M=R.textures;for(let k=0,q=M.length;k<q;k++){const J=M[k];if(m(J)){const Y=b(R),Se=n.get(J).__webglTexture;t.bindTexture(Y,Se),f(Y),t.unbindTexture()}}}const Ft=[],O=[];function Un(R){if(R.samples>0){if(et(R)===!1){const M=R.textures,k=R.width,q=R.height;let J=i.COLOR_BUFFER_BIT;const Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(R),ce=M.length>1;if(ce)for(let fe=0;fe<M.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let fe=0;fe<M.length;fe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[fe]);const st=n.get(M[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,st,0)}i.blitFramebuffer(0,0,k,q,0,0,k,q,J,i.NEAREST),c===!0&&(Ft.length=0,O.length=0,Ft.push(i.COLOR_ATTACHMENT0+fe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ft.push(Y),O.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ft))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let fe=0;fe<M.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,Se.__webglColorRenderbuffer[fe]);const st=n.get(M[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,st,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const M=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Qe(R){return Math.min(s.maxSamples,R.samples)}function et(R){const M=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Re(R){const M=o.render.frame;h.get(R)!==M&&(h.set(R,M),R.update())}function Et(R,M){const k=R.colorSpace,q=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==yn&&k!==rs&&(Ze.getTransfer(k)===_t?(q!==kn||J!==Vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),M}function we(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=B,this.setTexture2D=Z,this.setTexture2DArray=$,this.setTexture3D=te,this.setTextureCube=X,this.rebindTextures=qe,this.setupRenderTarget=Lt,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Un,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=et}function Vv(i,e){function t(n,s=rs){let r;const o=Ze.getTransfer(s);if(n===Vi)return i.UNSIGNED_BYTE;if(n===rh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===oh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Bf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Of)return i.BYTE;if(n===Ff)return i.SHORT;if(n===io)return i.UNSIGNED_SHORT;if(n===sh)return i.INT;if(n===Ls)return i.UNSIGNED_INT;if(n===ei)return i.FLOAT;if(n===mo)return i.HALF_FLOAT;if(n===kf)return i.ALPHA;if(n===Hf)return i.RGB;if(n===kn)return i.RGBA;if(n===zf)return i.LUMINANCE;if(n===Vf)return i.LUMINANCE_ALPHA;if(n===or)return i.DEPTH_COMPONENT;if(n===fr)return i.DEPTH_STENCIL;if(n===ah)return i.RED;if(n===ch)return i.RED_INTEGER;if(n===Gf)return i.RG;if(n===lh)return i.RG_INTEGER;if(n===hh)return i.RGBA_INTEGER;if(n===da||n===fa||n===pa||n===ma)if(o===_t)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===da)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===da)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ma)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===tl||n===nl||n===il||n===sl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===tl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===nl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===il)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===rl||n===ol||n===al)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===rl||n===ol)return o===_t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===al)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===cl||n===ll||n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===yl||n===xl||n===vl||n===Ml)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===cl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ll)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ul)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ml)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_l)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ml)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ga||n===bl||n===Sl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ga)return o===_t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wf||n===El||n===Tl||n===Al)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ga)return r.COMPRESSED_RED_RGTC1_EXT;if(n===El)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Al)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===dr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Gv extends fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Je extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wv={type:"move"};class Tc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Je,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Je,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Je,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Wv)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Je;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Xv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$v=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Yv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Xt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new fs({vertexShader:Xv,fragmentShader:$v,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ie(new bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jv extends Ns{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null;const _=new Yv,m=t.getContextAttributes();let f=null,b=null;const S=[],x=[],P=new Ce;let A=null;const C=new fn;C.viewport=new ct;const w=new fn;w.viewport=new ct;const v=[C,w],y=new Gv;let L=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=S[j];return ne===void 0&&(ne=new Tc,S[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=S[j];return ne===void 0&&(ne=new Tc,S[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=S[j];return ne===void 0&&(ne=new Tc,S[j]=ne),ne.getHandSpace()};function H(j){const ne=x.indexOf(j.inputSource);if(ne===-1)return;const Me=S[ne];Me!==void 0&&(Me.update(j.inputSource,j.frame,l||o),Me.dispatchEvent({type:j.type,data:j.inputSource}))}function W(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Z);for(let j=0;j<S.length;j++){const ne=x[j];ne!==null&&(x[j]=null,S[j].disconnect(ne))}L=null,B=null,_.reset(),e.setRenderTarget(f),p=null,d=null,u=null,s=null,b=null,xt.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(P),s.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Ds(p.framebufferWidth,p.framebufferHeight,{format:kn,type:Vi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,Me=null,ae=null;m.depth&&(ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?fr:or,Me=m.stencil?dr:Ls);const Le={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Le),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Ds(d.textureWidth,d.textureHeight,{format:kn,type:Vi,depthTexture:new sp(d.textureWidth,d.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),xt.setContext(s),xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z(j){for(let ne=0;ne<j.removed.length;ne++){const Me=j.removed[ne],ae=x.indexOf(Me);ae>=0&&(x[ae]=null,S[ae].disconnect(Me))}for(let ne=0;ne<j.added.length;ne++){const Me=j.added[ne];let ae=x.indexOf(Me);if(ae===-1){for(let He=0;He<S.length;He++)if(He>=x.length){x.push(Me),ae=He;break}else if(x[He]===null){x[He]=Me,ae=He;break}if(ae===-1)break}const Le=S[ae];Le&&Le.connect(Me)}}const $=new D,te=new D;function X(j,ne,Me){$.setFromMatrixPosition(ne.matrixWorld),te.setFromMatrixPosition(Me.matrixWorld);const ae=$.distanceTo(te),Le=ne.projectionMatrix.elements,He=Me.projectionMatrix.elements,qe=Le[14]/(Le[10]-1),Lt=Le[14]/(Le[10]+1),it=(Le[9]+1)/Le[5],Ft=(Le[9]-1)/Le[5],O=(Le[8]-1)/Le[0],Un=(He[8]+1)/He[0],Qe=qe*O,et=qe*Un,Re=ae/(-O+Un),Et=Re*-O;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Et),j.translateZ(Re),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Le[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const we=qe+Re,R=Lt+Re,M=Qe-Et,k=et+(ae-Et),q=it*Lt/R*we,J=Ft*Lt/R*we;j.projectionMatrix.makePerspective(M,k,q,J,we,R),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function oe(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ne=j.near,Me=j.far;_.texture!==null&&(_.depthNear>0&&(ne=_.depthNear),_.depthFar>0&&(Me=_.depthFar)),y.near=w.near=C.near=ne,y.far=w.far=C.far=Me,(L!==y.near||B!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),L=y.near,B=y.far),C.layers.mask=j.layers.mask|2,w.layers.mask=j.layers.mask|4,y.layers.mask=C.layers.mask|w.layers.mask;const ae=j.parent,Le=y.cameras;oe(y,ae);for(let He=0;He<Le.length;He++)oe(Le[He],ae);Le.length===2?X(y,C,w):y.projectionMatrix.copy(C.projectionMatrix),de(j,y,ae)};function de(j,ne,Me){Me===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(Me.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=pr*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let Te=null;function je(j,ne){if(h=ne.getViewerPose(l||o),g=ne,h!==null){const Me=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let ae=!1;Me.length!==y.cameras.length&&(y.cameras.length=0,ae=!0);for(let He=0;He<Me.length;He++){const qe=Me[He];let Lt=null;if(p!==null)Lt=p.getViewport(qe);else{const Ft=u.getViewSubImage(d,qe);Lt=Ft.viewport,He===0&&(e.setRenderTargetTextures(b,Ft.colorTexture,d.ignoreDepthValues?void 0:Ft.depthStencilTexture),e.setRenderTarget(b))}let it=v[He];it===void 0&&(it=new fn,it.layers.enable(He),it.viewport=new ct,v[He]=it),it.matrix.fromArray(qe.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(qe.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(Lt.x,Lt.y,Lt.width,Lt.height),He===0&&(y.matrix.copy(it.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ae===!0&&y.cameras.push(it)}const Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")){const He=u.getDepthInformation(Me[0]);He&&He.isValid&&He.texture&&_.init(e,He,s.renderState)}}for(let Me=0;Me<S.length;Me++){const ae=x[Me],Le=S[Me];ae!==null&&Le!==void 0&&Le.update(ae,ne,l||o)}Te&&Te(j,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const xt=new ip;xt.setAnimationLoop(je),this.setAnimationLoop=function(j){Te=j},this.dispose=function(){}}}const Ss=new si,qv=new ke;function Kv(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,ep(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,b,S,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,b,S):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===mn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===mn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const b=e.get(f),S=b.envMap,x=b.envMapRotation;S&&(m.envMap.value=S,Ss.copy(x),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),m.envMapRotation.value.setFromMatrix4(qv.makeRotationFromEuler(Ss)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,b,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=S*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===mn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const b=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Zv(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,S){const x=S.program;n.uniformBlockBinding(b,x)}function l(b,S){let x=s[b.id];x===void 0&&(g(b),x=h(b),s[b.id]=x,b.addEventListener("dispose",m));const P=S.program;n.updateUBOMapping(b,P);const A=e.render.frame;r[b.id]!==A&&(d(b),r[b.id]=A)}function h(b){const S=u();b.__bindingPointIndex=S;const x=i.createBuffer(),P=b.__size,A=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,P,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,x),x}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const S=s[b.id],x=b.uniforms,P=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let A=0,C=x.length;A<C;A++){const w=Array.isArray(x[A])?x[A]:[x[A]];for(let v=0,y=w.length;v<y;v++){const L=w[v];if(p(L,A,v,P)===!0){const B=L.__offset,H=Array.isArray(L.value)?L.value:[L.value];let W=0;for(let Z=0;Z<H.length;Z++){const $=H[Z],te=_($);typeof $=="number"||typeof $=="boolean"?(L.__data[0]=$,i.bufferSubData(i.UNIFORM_BUFFER,B+W,L.__data)):$.isMatrix3?(L.__data[0]=$.elements[0],L.__data[1]=$.elements[1],L.__data[2]=$.elements[2],L.__data[3]=0,L.__data[4]=$.elements[3],L.__data[5]=$.elements[4],L.__data[6]=$.elements[5],L.__data[7]=0,L.__data[8]=$.elements[6],L.__data[9]=$.elements[7],L.__data[10]=$.elements[8],L.__data[11]=0):($.toArray(L.__data,W),W+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,S,x,P){const A=b.value,C=S+"_"+x;if(P[C]===void 0)return typeof A=="number"||typeof A=="boolean"?P[C]=A:P[C]=A.clone(),!0;{const w=P[C];if(typeof A=="number"||typeof A=="boolean"){if(w!==A)return P[C]=A,!0}else if(w.equals(A)===!1)return w.copy(A),!0}return!1}function g(b){const S=b.uniforms;let x=0;const P=16;for(let C=0,w=S.length;C<w;C++){const v=Array.isArray(S[C])?S[C]:[S[C]];for(let y=0,L=v.length;y<L;y++){const B=v[y],H=Array.isArray(B.value)?B.value:[B.value];for(let W=0,Z=H.length;W<Z;W++){const $=H[W],te=_($),X=x%P,oe=X%te.boundary,de=X+oe;x+=oe,de!==0&&P-de<te.storage&&(x+=P-de),B.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=te.storage}}}const A=x%P;return A>0&&(x+=P-A),b.__size=x,b.__cache={},this}function _(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const x=o.indexOf(S.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function f(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}class Jv{constructor(e={}){const{canvas:t=Hg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const b=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Dt,this.toneMapping=us,this.toneMappingExposure=1;const x=this;let P=!1,A=0,C=0,w=null,v=-1,y=null;const L=new ct,B=new ct;let H=null;const W=new Ie(0);let Z=0,$=t.width,te=t.height,X=1,oe=null,de=null;const Te=new ct(0,0,$,te),je=new ct(0,0,$,te);let xt=!1;const j=new ph;let ne=!1,Me=!1;const ae=new ke,Le=new ke,He=new D,qe=new ct,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let it=!1;function Ft(){return w===null?X:1}let O=n;function Un(E,N){return t.getContext(E,N)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${nh}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",le,!1),O===null){const N="webgl2";if(O=Un(N,E),O===null)throw Un(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Qe,et,Re,Et,we,R,M,k,q,J,Y,Se,ce,fe,st,Q,me,Pe,Ne,ge,tt,We,vt,I;function re(){Qe=new ix(O),Qe.init(),We=new Vv(O,Qe),et=new Zy(O,Qe,e,We),Re=new kv(O,Qe),et.reverseDepthBuffer&&d&&Re.buffers.depth.setReversed(!0),Et=new ox(O),we=new Ev,R=new zv(O,Qe,Re,we,et,We,Et),M=new Qy(x),k=new nx(x),q=new f_(O),vt=new qy(O,q),J=new sx(O,q,Et,vt),Y=new cx(O,J,q,Et),Ne=new ax(O,et,R),Q=new Jy(we),Se=new Sv(x,M,k,Qe,et,vt,Q),ce=new Kv(x,we),fe=new Av,st=new Dv(Qe),Pe=new jy(x,M,k,Re,Y,p,c),me=new Fv(x,Y,et),I=new Zv(O,Et,et,Re),ge=new Ky(O,Qe,Et),tt=new rx(O,Qe,Et),Et.programs=Se.programs,x.capabilities=et,x.extensions=Qe,x.properties=we,x.renderLists=fe,x.shadowMap=me,x.state=Re,x.info=Et}re();const G=new jv(x,O);this.xr=G,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=Qe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Qe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(E){E!==void 0&&(X=E,this.setSize($,te,!1))},this.getSize=function(E){return E.set($,te)},this.setSize=function(E,N,z=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=E,te=N,t.width=Math.floor(E*X),t.height=Math.floor(N*X),z===!0&&(t.style.width=E+"px",t.style.height=N+"px"),this.setViewport(0,0,E,N)},this.getDrawingBufferSize=function(E){return E.set($*X,te*X).floor()},this.setDrawingBufferSize=function(E,N,z){$=E,te=N,X=z,t.width=Math.floor(E*z),t.height=Math.floor(N*z),this.setViewport(0,0,E,N)},this.getCurrentViewport=function(E){return E.copy(L)},this.getViewport=function(E){return E.copy(Te)},this.setViewport=function(E,N,z,V){E.isVector4?Te.set(E.x,E.y,E.z,E.w):Te.set(E,N,z,V),Re.viewport(L.copy(Te).multiplyScalar(X).round())},this.getScissor=function(E){return E.copy(je)},this.setScissor=function(E,N,z,V){E.isVector4?je.set(E.x,E.y,E.z,E.w):je.set(E,N,z,V),Re.scissor(B.copy(je).multiplyScalar(X).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(E){Re.setScissorTest(xt=E)},this.setOpaqueSort=function(E){oe=E},this.setTransparentSort=function(E){de=E},this.getClearColor=function(E){return E.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor.apply(Pe,arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha.apply(Pe,arguments)},this.clear=function(E=!0,N=!0,z=!0){let V=0;if(E){let U=!1;if(w!==null){const ee=w.texture.format;U=ee===hh||ee===lh||ee===ch}if(U){const ee=w.texture.type,he=ee===Vi||ee===Ls||ee===io||ee===dr||ee===rh||ee===oh,ye=Pe.getClearColor(),xe=Pe.getClearAlpha(),Ue=ye.r,Ve=ye.g,ve=ye.b;he?(g[0]=Ue,g[1]=Ve,g[2]=ve,g[3]=xe,O.clearBufferuiv(O.COLOR,0,g)):(_[0]=Ue,_[1]=Ve,_[2]=ve,_[3]=xe,O.clearBufferiv(O.COLOR,0,_))}else V|=O.COLOR_BUFFER_BIT}N&&(V|=O.DEPTH_BUFFER_BIT),z&&(V|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",le,!1),fe.dispose(),st.dispose(),we.dispose(),M.dispose(),k.dispose(),Y.dispose(),vt.dispose(),I.dispose(),Se.dispose(),G.dispose(),G.removeEventListener("sessionstart",Wh),G.removeEventListener("sessionend",Xh),_s.stop()};function K(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const E=Et.autoReset,N=me.enabled,z=me.autoUpdate,V=me.needsUpdate,U=me.type;re(),Et.autoReset=E,me.enabled=N,me.autoUpdate=z,me.needsUpdate=V,me.type=U}function le(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ze(E){const N=E.target;N.removeEventListener("dispose",ze),Nt(N)}function Nt(E){rn(E),we.remove(E)}function rn(E){const N=we.get(E).programs;N!==void 0&&(N.forEach(function(z){Se.releaseProgram(z)}),E.isShaderMaterial&&Se.releaseShaderCache(E))}this.renderBufferDirect=function(E,N,z,V,U,ee){N===null&&(N=Lt);const he=U.isMesh&&U.matrixWorld.determinant()<0,ye=Im(E,N,z,V,U);Re.setMaterial(V,he);let xe=z.index,Ue=1;if(V.wireframe===!0){if(xe=J.getWireframeAttribute(z),xe===void 0)return;Ue=2}const Ve=z.drawRange,ve=z.attributes.position;let at=Ve.start*Ue,Mt=(Ve.start+Ve.count)*Ue;ee!==null&&(at=Math.max(at,ee.start*Ue),Mt=Math.min(Mt,(ee.start+ee.count)*Ue)),xe!==null?(at=Math.max(at,0),Mt=Math.min(Mt,xe.count)):ve!=null&&(at=Math.max(at,0),Mt=Math.min(Mt,ve.count));const Tt=Mt-at;if(Tt<0||Tt===1/0)return;vt.setup(U,V,ye,z,xe);let xn,ht=ge;if(xe!==null&&(xn=q.get(xe),ht=tt,ht.setIndex(xn)),U.isMesh)V.wireframe===!0?(Re.setLineWidth(V.wireframeLinewidth*Ft()),ht.setMode(O.LINES)):ht.setMode(O.TRIANGLES);else if(U.isLine){let Ee=V.linewidth;Ee===void 0&&(Ee=1),Re.setLineWidth(Ee*Ft()),U.isLineSegments?ht.setMode(O.LINES):U.isLineLoop?ht.setMode(O.LINE_LOOP):ht.setMode(O.LINE_STRIP)}else U.isPoints?ht.setMode(O.POINTS):U.isSprite&&ht.setMode(O.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)ht.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Qe.get("WEBGL_multi_draw"))ht.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ee=U._multiDrawStarts,vi=U._multiDrawCounts,ut=U._multiDrawCount,Wn=xe?q.get(xe).bytesPerElement:1,Os=we.get(V).currentProgram.getUniforms();for(let An=0;An<ut;An++)Os.setValue(O,"_gl_DrawID",An),ht.render(Ee[An]/Wn,vi[An])}else if(U.isInstancedMesh)ht.renderInstances(at,Tt,U.count);else if(z.isInstancedBufferGeometry){const Ee=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,vi=Math.min(z.instanceCount,Ee);ht.renderInstances(at,Tt,vi)}else ht.render(at,Tt)};function dt(E,N,z){E.transparent===!0&&E.side===tn&&E.forceSinglePass===!1?(E.side=mn,E.needsUpdate=!0,Co(E,N,z),E.side=zi,E.needsUpdate=!0,Co(E,N,z),E.side=tn):Co(E,N,z)}this.compile=function(E,N,z=null){z===null&&(z=E),f=st.get(z),f.init(N),S.push(f),z.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),E!==z&&E.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const V=new Set;return E.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ee=U.material;if(ee)if(Array.isArray(ee))for(let he=0;he<ee.length;he++){const ye=ee[he];dt(ye,z,U),V.add(ye)}else dt(ee,z,U),V.add(ee)}),S.pop(),f=null,V},this.compileAsync=function(E,N,z=null){const V=this.compile(E,N,z);return new Promise(U=>{function ee(){if(V.forEach(function(he){we.get(he).currentProgram.isReady()&&V.delete(he)}),V.size===0){U(E);return}setTimeout(ee,10)}Qe.get("KHR_parallel_shader_compile")!==null?ee():setTimeout(ee,10)})};let Gn=null;function xi(E){Gn&&Gn(E)}function Wh(){_s.stop()}function Xh(){_s.start()}const _s=new ip;_s.setAnimationLoop(xi),typeof self<"u"&&_s.setContext(self),this.setAnimationLoop=function(E){Gn=E,G.setAnimationLoop(E),E===null?_s.stop():_s.start()},G.addEventListener("sessionstart",Wh),G.addEventListener("sessionend",Xh),this.render=function(E,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(N),N=G.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,N,w),f=st.get(E,S.length),f.init(N),S.push(f),Le.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),j.setFromProjectionMatrix(Le),Me=this.localClippingEnabled,ne=Q.init(this.clippingPlanes,Me),m=fe.get(E,b.length),m.init(),b.push(m),G.enabled===!0&&G.isPresenting===!0){const ee=x.xr.getDepthSensingMesh();ee!==null&&Za(ee,N,-1/0,x.sortObjects)}Za(E,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(oe,de),it=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,it&&Pe.addToRenderList(m,E),this.info.render.frame++,ne===!0&&Q.beginShadows();const z=f.state.shadowsArray;me.render(z,E,N),ne===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=m.opaque,U=m.transmissive;if(f.setupLights(),N.isArrayCamera){const ee=N.cameras;if(U.length>0)for(let he=0,ye=ee.length;he<ye;he++){const xe=ee[he];Yh(V,U,E,xe)}it&&Pe.render(E);for(let he=0,ye=ee.length;he<ye;he++){const xe=ee[he];$h(m,E,xe,xe.viewport)}}else U.length>0&&Yh(V,U,E,N),it&&Pe.render(E),$h(m,E,N);w!==null&&(R.updateMultisampleRenderTarget(w),R.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(x,E,N),vt.resetDefaultState(),v=-1,y=null,S.pop(),S.length>0?(f=S[S.length-1],ne===!0&&Q.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Za(E,N,z,V){if(E.visible===!1)return;if(E.layers.test(N.layers)){if(E.isGroup)z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(N);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||j.intersectsSprite(E)){V&&qe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Le);const he=Y.update(E),ye=E.material;ye.visible&&m.push(E,he,ye,z,qe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||j.intersectsObject(E))){const he=Y.update(E),ye=E.material;if(V&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),qe.copy(E.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),qe.copy(he.boundingSphere.center)),qe.applyMatrix4(E.matrixWorld).applyMatrix4(Le)),Array.isArray(ye)){const xe=he.groups;for(let Ue=0,Ve=xe.length;Ue<Ve;Ue++){const ve=xe[Ue],at=ye[ve.materialIndex];at&&at.visible&&m.push(E,he,at,z,qe.z,ve)}}else ye.visible&&m.push(E,he,ye,z,qe.z,null)}}const ee=E.children;for(let he=0,ye=ee.length;he<ye;he++)Za(ee[he],N,z,V)}function $h(E,N,z,V){const U=E.opaque,ee=E.transmissive,he=E.transparent;f.setupLightsView(z),ne===!0&&Q.setGlobalState(x.clippingPlanes,z),V&&Re.viewport(L.copy(V)),U.length>0&&Ro(U,N,z),ee.length>0&&Ro(ee,N,z),he.length>0&&Ro(he,N,z),Re.buffers.depth.setTest(!0),Re.buffers.depth.setMask(!0),Re.buffers.color.setMask(!0),Re.setPolygonOffset(!1)}function Yh(E,N,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[V.id]===void 0&&(f.state.transmissionRenderTarget[V.id]=new Ds(1,1,{generateMipmaps:!0,type:Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float")?mo:Vi,minFilter:Di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));const ee=f.state.transmissionRenderTarget[V.id],he=V.viewport||L;ee.setSize(he.z,he.w);const ye=x.getRenderTarget();x.setRenderTarget(ee),x.getClearColor(W),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),it&&Pe.render(z);const xe=x.toneMapping;x.toneMapping=us;const Ue=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),f.setupLightsView(V),ne===!0&&Q.setGlobalState(x.clippingPlanes,V),Ro(E,z,V),R.updateMultisampleRenderTarget(ee),R.updateRenderTargetMipmap(ee),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let ve=0,at=N.length;ve<at;ve++){const Mt=N[ve],Tt=Mt.object,xn=Mt.geometry,ht=Mt.material,Ee=Mt.group;if(ht.side===tn&&Tt.layers.test(V.layers)){const vi=ht.side;ht.side=mn,ht.needsUpdate=!0,jh(Tt,z,V,xn,ht,Ee),ht.side=vi,ht.needsUpdate=!0,Ve=!0}}Ve===!0&&(R.updateMultisampleRenderTarget(ee),R.updateRenderTargetMipmap(ee))}x.setRenderTarget(ye),x.setClearColor(W,Z),Ue!==void 0&&(V.viewport=Ue),x.toneMapping=xe}function Ro(E,N,z){const V=N.isScene===!0?N.overrideMaterial:null;for(let U=0,ee=E.length;U<ee;U++){const he=E[U],ye=he.object,xe=he.geometry,Ue=V===null?he.material:V,Ve=he.group;ye.layers.test(z.layers)&&jh(ye,N,z,xe,Ue,Ve)}}function jh(E,N,z,V,U,ee){E.onBeforeRender(x,N,z,V,U,ee),E.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),U.onBeforeRender(x,N,z,V,E,ee),U.transparent===!0&&U.side===tn&&U.forceSinglePass===!1?(U.side=mn,U.needsUpdate=!0,x.renderBufferDirect(z,N,V,U,E,ee),U.side=zi,U.needsUpdate=!0,x.renderBufferDirect(z,N,V,U,E,ee),U.side=tn):x.renderBufferDirect(z,N,V,U,E,ee),E.onAfterRender(x,N,z,V,U,ee)}function Co(E,N,z){N.isScene!==!0&&(N=Lt);const V=we.get(E),U=f.state.lights,ee=f.state.shadowsArray,he=U.state.version,ye=Se.getParameters(E,U.state,ee,N,z),xe=Se.getProgramCacheKey(ye);let Ue=V.programs;V.environment=E.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(E.isMeshStandardMaterial?k:M).get(E.envMap||V.environment),V.envMapRotation=V.environment!==null&&E.envMap===null?N.environmentRotation:E.envMapRotation,Ue===void 0&&(E.addEventListener("dispose",ze),Ue=new Map,V.programs=Ue);let Ve=Ue.get(xe);if(Ve!==void 0){if(V.currentProgram===Ve&&V.lightsStateVersion===he)return Kh(E,ye),Ve}else ye.uniforms=Se.getUniforms(E),E.onBeforeCompile(ye,x),Ve=Se.acquireProgram(ye,xe),Ue.set(xe,Ve),V.uniforms=ye.uniforms;const ve=V.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(ve.clippingPlanes=Q.uniform),Kh(E,ye),V.needsLights=Um(E),V.lightsStateVersion=he,V.needsLights&&(ve.ambientLightColor.value=U.state.ambient,ve.lightProbe.value=U.state.probe,ve.directionalLights.value=U.state.directional,ve.directionalLightShadows.value=U.state.directionalShadow,ve.spotLights.value=U.state.spot,ve.spotLightShadows.value=U.state.spotShadow,ve.rectAreaLights.value=U.state.rectArea,ve.ltc_1.value=U.state.rectAreaLTC1,ve.ltc_2.value=U.state.rectAreaLTC2,ve.pointLights.value=U.state.point,ve.pointLightShadows.value=U.state.pointShadow,ve.hemisphereLights.value=U.state.hemi,ve.directionalShadowMap.value=U.state.directionalShadowMap,ve.directionalShadowMatrix.value=U.state.directionalShadowMatrix,ve.spotShadowMap.value=U.state.spotShadowMap,ve.spotLightMatrix.value=U.state.spotLightMatrix,ve.spotLightMap.value=U.state.spotLightMap,ve.pointShadowMap.value=U.state.pointShadowMap,ve.pointShadowMatrix.value=U.state.pointShadowMatrix),V.currentProgram=Ve,V.uniformsList=null,Ve}function qh(E){if(E.uniformsList===null){const N=E.currentProgram.getUniforms();E.uniformsList=_a.seqWithValue(N.seq,E.uniforms)}return E.uniformsList}function Kh(E,N){const z=we.get(E);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function Im(E,N,z,V,U){N.isScene!==!0&&(N=Lt),R.resetTextureUnits();const ee=N.fog,he=V.isMeshStandardMaterial?N.environment:null,ye=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:yn,xe=(V.isMeshStandardMaterial?k:M).get(V.envMap||he),Ue=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ve=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),ve=!!z.morphAttributes.position,at=!!z.morphAttributes.normal,Mt=!!z.morphAttributes.color;let Tt=us;V.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Tt=x.toneMapping);const xn=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ht=xn!==void 0?xn.length:0,Ee=we.get(V),vi=f.state.lights;if(ne===!0&&(Me===!0||E!==y)){const On=E===y&&V.id===v;Q.setState(V,E,On)}let ut=!1;V.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==vi.state.version||Ee.outputColorSpace!==ye||U.isBatchedMesh&&Ee.batching===!1||!U.isBatchedMesh&&Ee.batching===!0||U.isBatchedMesh&&Ee.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ee.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ee.instancing===!1||!U.isInstancedMesh&&Ee.instancing===!0||U.isSkinnedMesh&&Ee.skinning===!1||!U.isSkinnedMesh&&Ee.skinning===!0||U.isInstancedMesh&&Ee.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ee.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ee.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ee.instancingMorph===!1&&U.morphTexture!==null||Ee.envMap!==xe||V.fog===!0&&Ee.fog!==ee||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Q.numPlanes||Ee.numIntersection!==Q.numIntersection)||Ee.vertexAlphas!==Ue||Ee.vertexTangents!==Ve||Ee.morphTargets!==ve||Ee.morphNormals!==at||Ee.morphColors!==Mt||Ee.toneMapping!==Tt||Ee.morphTargetsCount!==ht)&&(ut=!0):(ut=!0,Ee.__version=V.version);let Wn=Ee.currentProgram;ut===!0&&(Wn=Co(V,N,U));let Os=!1,An=!1,Ur=!1;const At=Wn.getUniforms(),ri=Ee.uniforms;if(Re.useProgram(Wn.program)&&(Os=!0,An=!0,Ur=!0),V.id!==v&&(v=V.id,An=!0),Os||y!==E){Re.buffers.depth.getReversed()?(ae.copy(E.projectionMatrix),Vg(ae),Gg(ae),At.setValue(O,"projectionMatrix",ae)):At.setValue(O,"projectionMatrix",E.projectionMatrix),At.setValue(O,"viewMatrix",E.matrixWorldInverse);const Yi=At.map.cameraPosition;Yi!==void 0&&Yi.setValue(O,He.setFromMatrixPosition(E.matrixWorld)),et.logarithmicDepthBuffer&&At.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&At.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,An=!0,Ur=!0)}if(U.isSkinnedMesh){At.setOptional(O,U,"bindMatrix"),At.setOptional(O,U,"bindMatrixInverse");const On=U.skeleton;On&&(On.boneTexture===null&&On.computeBoneTexture(),At.setValue(O,"boneTexture",On.boneTexture,R))}U.isBatchedMesh&&(At.setOptional(O,U,"batchingTexture"),At.setValue(O,"batchingTexture",U._matricesTexture,R),At.setOptional(O,U,"batchingIdTexture"),At.setValue(O,"batchingIdTexture",U._indirectTexture,R),At.setOptional(O,U,"batchingColorTexture"),U._colorsTexture!==null&&At.setValue(O,"batchingColorTexture",U._colorsTexture,R));const Or=z.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0)&&Ne.update(U,z,Wn),(An||Ee.receiveShadow!==U.receiveShadow)&&(Ee.receiveShadow=U.receiveShadow,At.setValue(O,"receiveShadow",U.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(ri.envMap.value=xe,ri.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(ri.envMapIntensity.value=N.environmentIntensity),An&&(At.setValue(O,"toneMappingExposure",x.toneMappingExposure),Ee.needsLights&&Nm(ri,Ur),ee&&V.fog===!0&&ce.refreshFogUniforms(ri,ee),ce.refreshMaterialUniforms(ri,V,X,te,f.state.transmissionRenderTarget[E.id]),_a.upload(O,qh(Ee),ri,R)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(_a.upload(O,qh(Ee),ri,R),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&At.setValue(O,"center",U.center),At.setValue(O,"modelViewMatrix",U.modelViewMatrix),At.setValue(O,"normalMatrix",U.normalMatrix),At.setValue(O,"modelMatrix",U.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const On=V.uniformsGroups;for(let Yi=0,ji=On.length;Yi<ji;Yi++){const Zh=On[Yi];I.update(Zh,Wn),I.bind(Zh,Wn)}}return Wn}function Nm(E,N){E.ambientLightColor.needsUpdate=N,E.lightProbe.needsUpdate=N,E.directionalLights.needsUpdate=N,E.directionalLightShadows.needsUpdate=N,E.pointLights.needsUpdate=N,E.pointLightShadows.needsUpdate=N,E.spotLights.needsUpdate=N,E.spotLightShadows.needsUpdate=N,E.rectAreaLights.needsUpdate=N,E.hemisphereLights.needsUpdate=N}function Um(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,N,z){we.get(E.texture).__webglTexture=N,we.get(E.depthTexture).__webglTexture=z;const V=we.get(E);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=z===void 0,V.__autoAllocateDepthBuffer||Qe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,N){const z=we.get(E);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(E,N=0,z=0){w=E,A=N,C=z;let V=!0,U=null,ee=!1,he=!1;if(E){const xe=we.get(E);if(xe.__useDefaultFramebuffer!==void 0)Re.bindFramebuffer(O.FRAMEBUFFER,null),V=!1;else if(xe.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(xe.__hasExternalTextures)R.rebindTextures(E,we.get(E.texture).__webglTexture,we.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const ve=E.depthTexture;if(xe.__boundDepthTexture!==ve){if(ve!==null&&we.has(ve)&&(E.width!==ve.image.width||E.height!==ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const Ue=E.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(he=!0);const Ve=we.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ve[N])?U=Ve[N][z]:U=Ve[N],ee=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?U=we.get(E).__webglMultisampledFramebuffer:Array.isArray(Ve)?U=Ve[z]:U=Ve,L.copy(E.viewport),B.copy(E.scissor),H=E.scissorTest}else L.copy(Te).multiplyScalar(X).floor(),B.copy(je).multiplyScalar(X).floor(),H=xt;if(Re.bindFramebuffer(O.FRAMEBUFFER,U)&&V&&Re.drawBuffers(E,U),Re.viewport(L),Re.scissor(B),Re.setScissorTest(H),ee){const xe=we.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+N,xe.__webglTexture,z)}else if(he){const xe=we.get(E.texture),Ue=N||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,xe.__webglTexture,z||0,Ue)}v=-1},this.readRenderTargetPixels=function(E,N,z,V,U,ee,he){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ye=we.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&he!==void 0&&(ye=ye[he]),ye){Re.bindFramebuffer(O.FRAMEBUFFER,ye);try{const xe=E.texture,Ue=xe.format,Ve=xe.type;if(!et.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!et.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=E.width-V&&z>=0&&z<=E.height-U&&O.readPixels(N,z,V,U,We.convert(Ue),We.convert(Ve),ee)}finally{const xe=w!==null?we.get(w).__webglFramebuffer:null;Re.bindFramebuffer(O.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=async function(E,N,z,V,U,ee,he){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=we.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&he!==void 0&&(ye=ye[he]),ye){const xe=E.texture,Ue=xe.format,Ve=xe.type;if(!et.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!et.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=E.width-V&&z>=0&&z<=E.height-U){Re.bindFramebuffer(O.FRAMEBUFFER,ye);const ve=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ve),O.bufferData(O.PIXEL_PACK_BUFFER,ee.byteLength,O.STREAM_READ),O.readPixels(N,z,V,U,We.convert(Ue),We.convert(Ve),0);const at=w!==null?we.get(w).__webglFramebuffer:null;Re.bindFramebuffer(O.FRAMEBUFFER,at);const Mt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await zg(O,Mt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,ve),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ee),O.deleteBuffer(ve),O.deleteSync(Mt),ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,N=null,z=0){E.isTexture!==!0&&(qr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,E=arguments[1]);const V=Math.pow(2,-z),U=Math.floor(E.image.width*V),ee=Math.floor(E.image.height*V),he=N!==null?N.x:0,ye=N!==null?N.y:0;R.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,z,0,0,he,ye,U,ee),Re.unbindTexture()},this.copyTextureToTexture=function(E,N,z=null,V=null,U=0){E.isTexture!==!0&&(qr("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,E=arguments[1],N=arguments[2],U=arguments[3]||0,z=null);let ee,he,ye,xe,Ue,Ve,ve,at,Mt;const Tt=E.isCompressedTexture?E.mipmaps[U]:E.image;z!==null?(ee=z.max.x-z.min.x,he=z.max.y-z.min.y,ye=z.isBox3?z.max.z-z.min.z:1,xe=z.min.x,Ue=z.min.y,Ve=z.isBox3?z.min.z:0):(ee=Tt.width,he=Tt.height,ye=Tt.depth||1,xe=0,Ue=0,Ve=0),V!==null?(ve=V.x,at=V.y,Mt=V.z):(ve=0,at=0,Mt=0);const xn=We.convert(N.format),ht=We.convert(N.type);let Ee;N.isData3DTexture?(R.setTexture3D(N,0),Ee=O.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(R.setTexture2DArray(N,0),Ee=O.TEXTURE_2D_ARRAY):(R.setTexture2D(N,0),Ee=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,N.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,N.unpackAlignment);const vi=O.getParameter(O.UNPACK_ROW_LENGTH),ut=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Wn=O.getParameter(O.UNPACK_SKIP_PIXELS),Os=O.getParameter(O.UNPACK_SKIP_ROWS),An=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Tt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Tt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,xe),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ue),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ve);const Ur=E.isDataArrayTexture||E.isData3DTexture,At=N.isDataArrayTexture||N.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const ri=we.get(E),Or=we.get(N),On=we.get(ri.__renderTarget),Yi=we.get(Or.__renderTarget);Re.bindFramebuffer(O.READ_FRAMEBUFFER,On.__webglFramebuffer),Re.bindFramebuffer(O.DRAW_FRAMEBUFFER,Yi.__webglFramebuffer);for(let ji=0;ji<ye;ji++)Ur&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,we.get(E).__webglTexture,U,Ve+ji),E.isDepthTexture?(At&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,we.get(N).__webglTexture,U,Mt+ji),O.blitFramebuffer(xe,Ue,ee,he,ve,at,ee,he,O.DEPTH_BUFFER_BIT,O.NEAREST)):At?O.copyTexSubImage3D(Ee,U,ve,at,Mt+ji,xe,Ue,ee,he):O.copyTexSubImage2D(Ee,U,ve,at,Mt+ji,xe,Ue,ee,he);Re.bindFramebuffer(O.READ_FRAMEBUFFER,null),Re.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else At?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(Ee,U,ve,at,Mt,ee,he,ye,xn,ht,Tt.data):N.isCompressedArrayTexture?O.compressedTexSubImage3D(Ee,U,ve,at,Mt,ee,he,ye,xn,Tt.data):O.texSubImage3D(Ee,U,ve,at,Mt,ee,he,ye,xn,ht,Tt):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,U,ve,at,ee,he,xn,ht,Tt.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,U,ve,at,Tt.width,Tt.height,xn,Tt.data):O.texSubImage2D(O.TEXTURE_2D,U,ve,at,ee,he,xn,ht,Tt);O.pixelStorei(O.UNPACK_ROW_LENGTH,vi),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ut),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Wn),O.pixelStorei(O.UNPACK_SKIP_ROWS,Os),O.pixelStorei(O.UNPACK_SKIP_IMAGES,An),U===0&&N.generateMipmaps&&O.generateMipmap(Ee),Re.unbindTexture()},this.copyTextureToTexture3D=function(E,N,z=null,V=null,U=0){return E.isTexture!==!0&&(qr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,V=arguments[1]||null,E=arguments[2],N=arguments[3],U=arguments[4]||0),qr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,N,z,V,U)},this.initRenderTarget=function(E){we.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),Re.unbindTexture()},this.resetState=function(){A=0,C=0,w=null,Re.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}class Ua{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ie(e),this.near=t,this.far=n}clone(){return new Ua(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Qv extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new si,this.environmentIntensity=1,this.environmentRotation=new si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class eM{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rl,this.updateRanges=[],this.version=0,this.uuid=ti()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ti()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ti()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const un=new D;class _h{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ft(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),n=ft(n,this.array),s=ft(s,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new _n(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new _h(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ed=new D,td=new ct,nd=new ct,tM=new D,id=new ke,Ko=new D,Ac=new mi,sd=new ke,wc=new Er;class nM extends ie{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=nu,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new $i),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ko),this.boundingBox.expandByPoint(Ko)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new mi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ko),this.boundingSphere.expandByPoint(Ko)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ac.copy(this.boundingSphere),Ac.applyMatrix4(s),e.ray.intersectsSphere(Ac)!==!1&&(sd.copy(s).invert(),wc.copy(e.ray).applyMatrix4(sd),!(this.boundingBox!==null&&wc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,wc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ct,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===nu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===hg?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;td.fromBufferAttribute(s.attributes.skinIndex,e),nd.fromBufferAttribute(s.attributes.skinWeight,e),ed.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=nd.getComponent(r);if(o!==0){const a=td.getComponent(r);id.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(tM.copy(ed).applyMatrix4(id),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class lp extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class hp extends Xt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=gn,h=gn,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rd=new ke,iM=new ke;class yh{constructor(e=[],t=[]){this.uuid=ti(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:iM;rd.multiplyMatrices(a,t[r]),rd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new yh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new hp(t,e,e,kn,ei);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new lp),this.bones.push(o),this.boneInverses.push(new ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class Pl extends _n{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zs=new ke,od=new ke,Zo=[],ad=new $i,sM=new ke,zr=new ie,Vr=new mi;class up extends ie{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,sM)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $i),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zs),ad.copy(e.boundingBox).applyMatrix4(Zs),this.boundingBox.union(ad)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zs),Vr.copy(e.boundingSphere).applyMatrix4(Zs),this.boundingSphere.union(Vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(zr.geometry=this.geometry,zr.material=this.material,zr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vr.copy(this.boundingSphere),Vr.applyMatrix4(n),e.ray.intersectsSphere(Vr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Zs),od.multiplyMatrices(n,Zs),zr.matrixWorld=od,zr.raycast(e,Zo);for(let o=0,a=Zo.length;o<a;o++){const c=Zo[o];c.instanceId=r,c.object=this,t.push(c)}Zo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Pl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new hp(new Float32Array(s*this.count),s,this.count,ah,ei));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Oa extends di{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Sa=new D,Ea=new D,cd=new ke,Gr=new Er,Jo=new mi,Rc=new D,ld=new D;class go extends St{constructor(e=new sn,t=new Oa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Sa.fromBufferAttribute(t,s-1),Ea.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Sa.distanceTo(Ea);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jo.copy(n.boundingSphere),Jo.applyMatrix4(s),Jo.radius+=r,e.ray.intersectsSphere(Jo)===!1)return;cd.copy(s).invert(),Gr.copy(e.ray).applyMatrix4(cd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=h.getX(_),b=h.getX(_+1),S=Qo(this,e,Gr,c,f,b);S&&t.push(S)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),f=Qo(this,e,Gr,c,_,m);f&&t.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=Qo(this,e,Gr,c,_,_+1);f&&t.push(f)}if(this.isLineLoop){const _=Qo(this,e,Gr,c,g-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Qo(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(Sa.fromBufferAttribute(o,s),Ea.fromBufferAttribute(o,r),t.distanceSqToSegment(Sa,Ea,Rc,ld)>n)return;Rc.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Rc);if(!(c<e.near||c>e.far))return{distance:c,point:ld.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const hd=new D,ud=new D;class rM extends go{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)hd.fromBufferAttribute(t,s),ud.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+hd.distanceTo(ud);e.setAttribute("lineDistance",new Ct(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class oM extends go{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class dp extends di{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const dd=new ke,Ll=new Er,ea=new mi,ta=new D;class aM extends St{constructor(e=new sn,t=new dp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ea.copy(n.boundingSphere),ea.applyMatrix4(s),ea.radius+=r,e.ray.intersectsSphere(ea)===!1)return;dd.copy(s).invert(),Ll.copy(e.ray).applyMatrix4(dd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=l.getX(g);ta.fromBufferAttribute(u,m),fd(ta,m,c,s,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)ta.fromBufferAttribute(u,g),fd(ta,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function fd(i,e,t,n,s,r,o){const a=Ll.distanceSqToPoint(i);if(a<t){const c=new D;Ll.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Us extends Xt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _o extends sn{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new D,h=new Ce;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const p=n+u/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Ct(o,3)),this.setAttribute("normal",new Ct(a,3)),this.setAttribute("uv",new Ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _o(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Qt extends sn{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=n/2;let f=0;b(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new Ct(u,3)),this.setAttribute("normal",new Ct(d,3)),this.setAttribute("uv",new Ct(p,2));function b(){const x=new D,P=new D;let A=0;const C=(t-e)/n;for(let w=0;w<=r;w++){const v=[],y=w/r,L=y*(t-e)+e;for(let B=0;B<=s;B++){const H=B/s,W=H*c+a,Z=Math.sin(W),$=Math.cos(W);P.x=L*Z,P.y=-y*n+m,P.z=L*$,u.push(P.x,P.y,P.z),x.set(Z,C,$).normalize(),d.push(x.x,x.y,x.z),p.push(H,1-y),v.push(g++)}_.push(v)}for(let w=0;w<s;w++)for(let v=0;v<r;v++){const y=_[v][w],L=_[v+1][w],B=_[v+1][w+1],H=_[v][w+1];(e>0||v!==0)&&(h.push(y,L,H),A+=3),(t>0||v!==r-1)&&(h.push(L,B,H),A+=3)}l.addGroup(f,A,0),f+=A}function S(x){const P=g,A=new Ce,C=new D;let w=0;const v=x===!0?e:t,y=x===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*y,0),d.push(0,y,0),p.push(.5,.5),g++;const L=g;for(let B=0;B<=s;B++){const W=B/s*c+a,Z=Math.cos(W),$=Math.sin(W);C.x=v*$,C.y=m*y,C.z=v*Z,u.push(C.x,C.y,C.z),d.push(0,y,0),A.x=Z*.5+.5,A.y=$*.5*y+.5,p.push(A.x,A.y),g++}for(let B=0;B<s;B++){const H=P+B,W=L+B;x===!0?h.push(W,W+1,H):h.push(W+1,W,H),w+=3}l.addGroup(f,w,x===!0?1:2),f+=w}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ar extends Qt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ar(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yo extends sn{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const d=(t-e)/s,p=new D,g=new Ce;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const f=r+m/n*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){const m=_*(n+1);for(let f=0;f<n;f++){const b=f+m,S=b,x=b+n+1,P=b+n+2,A=b+1;a.push(S,x,A),a.push(x,P,A)}}this.setIndex(a),this.setAttribute("position",new Ct(c,3)),this.setAttribute("normal",new Ct(l,3)),this.setAttribute("uv",new Ct(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Zt extends sn{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new D,d=new D,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const b=[],S=f/n;let x=0;f===0&&o===0?x=.5/t:f===n&&c===Math.PI&&(x=-.5/t);for(let P=0;P<=t;P++){const A=P/t;u.x=-e*Math.cos(s+A*r)*Math.sin(o+S*a),u.y=e*Math.cos(o+S*a),u.z=e*Math.sin(s+A*r)*Math.sin(o+S*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(A+x,1-S),b.push(l++)}h.push(b)}for(let f=0;f<n;f++)for(let b=0;b<t;b++){const S=h[f][b+1],x=h[f][b],P=h[f+1][b],A=h[f+1][b+1];(f!==0||o>0)&&p.push(S,x,A),(f!==n-1||c<Math.PI)&&p.push(x,P,A)}this.setIndex(p),this.setAttribute("position",new Ct(g,3)),this.setAttribute("normal",new Ct(_,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ao extends sn{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new D,u=new D,d=new D;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,b=(s+1)*p+g;o.push(_,m,b),o.push(m,f,b)}this.setIndex(o),this.setAttribute("position",new Ct(a,3)),this.setAttribute("normal",new Ct(c,3)),this.setAttribute("uv",new Ct(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class nt extends di{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$f,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new si,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gi extends nt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return en(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function na(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function cM(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function lM(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function pd(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function fp(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class xo{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class hM extends xo{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:iu,endingEnd:iu}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case su:r=e,a=2*t-n;break;case ru:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case su:o=e,c=2*n-t;break;case ru:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,b=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,S=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let P=0;P!==a;++P)r[P]=f*o[h+P]+b*o[l+P]+S*o[c+P]+x*o[u+P];return r}}class uM extends xo{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}}class dM extends xo{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class _i{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=na(t,this.TimeBufferType),this.values=na(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:na(e.times,Array),values:na(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new dM(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new uM(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new hM(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case so:t=this.InterpolantFactoryMethodDiscrete;break;case ro:t=this.InterpolantFactoryMethodLinear;break;case Ja:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return so;case this.InterpolantFactoryMethodLinear:return ro;case this.InterpolantFactoryMethodSmooth:return Ja}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&cM(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ja,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{const u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}_i.prototype.TimeBufferType=Float32Array;_i.prototype.ValueBufferType=Float32Array;_i.prototype.DefaultInterpolation=ro;class wr extends _i{constructor(e,t,n){super(e,t,n)}}wr.prototype.ValueTypeName="bool";wr.prototype.ValueBufferType=Array;wr.prototype.DefaultInterpolation=so;wr.prototype.InterpolantFactoryMethodLinear=void 0;wr.prototype.InterpolantFactoryMethodSmooth=void 0;class pp extends _i{}pp.prototype.ValueTypeName="color";class gr extends _i{}gr.prototype.ValueTypeName="number";class fM extends xo{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let h=l+a;l!==h;l+=4)ii.slerpFlat(r,0,o,l-a,o,l,c);return r}}class _r extends _i{InterpolantFactoryMethodLinear(e){return new fM(this.times,this.values,this.getValueSize(),e)}}_r.prototype.ValueTypeName="quaternion";_r.prototype.InterpolantFactoryMethodSmooth=void 0;class Rr extends _i{constructor(e,t,n){super(e,t,n)}}Rr.prototype.ValueTypeName="string";Rr.prototype.ValueBufferType=Array;Rr.prototype.DefaultInterpolation=so;Rr.prototype.InterpolantFactoryMethodLinear=void 0;Rr.prototype.InterpolantFactoryMethodSmooth=void 0;class yr extends _i{}yr.prototype.ValueTypeName="vector";class pM{constructor(e="",t=-1,n=[],s=ug){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=ti(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(gM(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(_i.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=lM(c);c=pd(c,1,h),l=pd(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new gr(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,g,_){if(p.length!==0){const m=[],f=[];fp(p,m,f,g),m.length!==0&&_.push(new u(d,m,f))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(const _ in p){const m=[],f=[];for(let b=0;b!==d[g].morphTargets.length;++b){const S=d[g];m.push(S.time),f.push(S.morphTarget===_?1:0)}s.push(new gr(".morphTargetInfluence["+_+"]",m,f))}c=p.length*o}else{const p=".bones["+t[u].name+"]";n(yr,p+".position",d,"pos",s),n(_r,p+".quaternion",d,"rot",s),n(yr,p+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function mM(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return gr;case"vector":case"vector2":case"vector3":case"vector4":return yr;case"color":return pp;case"quaternion":return _r;case"bool":case"boolean":return wr;case"string":return Rr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function gM(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=mM(i.type);if(i.times===void 0){const t=[],n=[];fp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const cs={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class _M{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const yM=new _M;class Cr{constructor(e){this.manager=e!==void 0?e:yM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Cr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ai={};class xM extends Error{constructor(e,t){super(e),this.response=t}}class mp extends Cr{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=cs.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ai[e]!==void 0){Ai[e].push({onLoad:t,onProgress:n,onError:s});return}Ai[e]=[],Ai[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Ai[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0;let _=0;const m=new ReadableStream({start(f){b();function b(){u.read().then(({done:S,value:x})=>{if(S)f.close();else{_+=x.byteLength;const P=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let A=0,C=h.length;A<C;A++){const w=h[A];w.onProgress&&w.onProgress(P)}f.enqueue(x),b()}},S=>{f.error(S)})}}});return new Response(m)}else throw new xM(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{cs.add(e,l);const h=Ai[e];delete Ai[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=Ai[e];if(h===void 0)throw this.manager.itemError(e),l;delete Ai[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class vM extends Cr{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=cs.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=oo("img");function c(){h(),cs.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class MM extends Cr{constructor(e){super(e)}load(e,t,n,s){const r=new Xt,o=new vM(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Fa extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class bM extends Fa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ie(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Cc=new ke,md=new D,gd=new D;class xh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ph,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;md.setFromMatrixPosition(e.matrixWorld),t.position.copy(md),gd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(gd),t.updateMatrixWorld(),Cc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Cc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class SM extends xh{constructor(){super(new fn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=pr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class EM extends Fa{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new SM}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const _d=new ke,Wr=new D,Pc=new D;class TM extends xh{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ce(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Wr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Wr),Pc.copy(n.position),Pc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Pc),n.updateMatrixWorld(),s.makeTranslation(-Wr.x,-Wr.y,-Wr.z),_d.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_d)}}class gp extends Fa{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new TM}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class AM extends xh{constructor(){super(new mh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _p extends Fa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new AM}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Qr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class wM extends Cr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=cs.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return cs.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),cs.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});cs.add(e,c),r.manager.itemStart(e)}}class RM{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=yd();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function yd(){return performance.now()}const vh="\\[\\]\\.:\\/",CM=new RegExp("["+vh+"]","g"),Mh="[^"+vh+"]",PM="[^"+vh.replace("\\.","")+"]",LM=/((?:WC+[\/:])*)/.source.replace("WC",Mh),DM=/(WCOD+)?/.source.replace("WCOD",PM),IM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mh),NM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mh),UM=new RegExp("^"+LM+DM+IM+NM+"$"),OM=["material","materials","bones","map"];class FM{constructor(e,t,n){const s=n||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class pt{constructor(e,t,n){this.path=t,this.parsedPath=n||pt.parseTrackName(t),this.node=pt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new pt.Composite(e,t,n):new pt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(CM,"")}static parseTrackName(e){const t=UM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);OM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=pt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}pt.Composite=FM;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const xd=new ke;class BM{constructor(e,t,n=0,s=1/0){this.ray=new Er(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new fh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return xd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xd),this}intersectObject(e,t=!0,n=[]){return Dl(e,this,n,t),n.sort(vd),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Dl(e[s],this,n,t);return n.sort(vd),n}}function vd(i,e){return i.distance-e.distance}function Dl(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Dl(r[o],e,t,!0)}}class Md{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(en(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class kM extends Ns{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nh);const bd={type:"change"},bh={type:"start"},yp={type:"end"},ia=new Er,Sd=new ss,HM=Math.cos(70*dh.DEG2RAD),Ht=new D,vn=2*Math.PI,yt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lc=1e-6;class zM extends kM{constructor(e,t=null){super(e,t),this.state=yt.NONE,this.enabled=!0,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Oi.ROTATE,MIDDLE:Oi.DOLLY,RIGHT:Oi.PAN},this.touches={ONE:os.ROTATE,TWO:os.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new ii,this._lastTargetPosition=new D,this._quat=new ii().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Md,this._sphericalDelta=new Md,this._scale=1,this._panOffset=new D,this._rotateStart=new Ce,this._rotateEnd=new Ce,this._rotateDelta=new Ce,this._panStart=new Ce,this._panEnd=new Ce,this._panDelta=new Ce,this._dollyStart=new Ce,this._dollyEnd=new Ce,this._dollyDelta=new Ce,this._dollyDirection=new D,this._mouse=new Ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=GM.bind(this),this._onPointerDown=VM.bind(this),this._onPointerUp=WM.bind(this),this._onContextMenu=ZM.bind(this),this._onMouseWheel=YM.bind(this),this._onKeyDown=jM.bind(this),this._onTouchStart=qM.bind(this),this._onTouchMove=KM.bind(this),this._onMouseDown=XM.bind(this),this._onMouseMove=$M.bind(this),this._interceptControlDown=JM.bind(this),this._interceptControlUp=QM.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(bd),this.update(),this.state=yt.NONE}update(e=null){const t=this.object.position;Ht.copy(t).sub(this.target),Ht.applyQuaternion(this._quat),this._spherical.setFromVector3(Ht),this.autoRotate&&this.state===yt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=vn:n>Math.PI&&(n-=vn),s<-Math.PI?s+=vn:s>Math.PI&&(s-=vn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ht.setFromSpherical(this._spherical),Ht.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ht),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ht.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new D(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new D(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Ht.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ia.origin.copy(this.object.position),ia.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ia.direction))<HM?this.object.lookAt(this.target):(Sd.setFromNormalAndCoplanarPoint(this.object.up,this.target),ia.intersectPlane(Sd,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Lc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lc||this._lastTargetPosition.distanceToSquared(this.target)>Lc?(this.dispatchEvent(bd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?vn/60*this.autoRotateSpeed*e:vn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ht.setFromMatrixColumn(t,0),Ht.multiplyScalar(-e),this._panOffset.add(Ht)}_panUp(e,t){this.screenSpacePanning===!0?Ht.setFromMatrixColumn(t,1):(Ht.setFromMatrixColumn(t,0),Ht.crossVectors(this.object.up,Ht)),Ht.multiplyScalar(e),this._panOffset.add(Ht)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ht.copy(s).sub(this.target);let r=Ht.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(vn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-vn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(vn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-vn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ce,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function VM(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function GM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function WM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(yp),this.state=yt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function XM(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Oi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=yt.DOLLY;break;case Oi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=yt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=yt.ROTATE}break;case Oi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=yt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=yt.PAN}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent(bh)}function $M(i){switch(this.state){case yt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case yt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case yt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function YM(i){this.enabled===!1||this.enableZoom===!1||this.state!==yt.NONE||(i.preventDefault(),this.dispatchEvent(bh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(yp))}function jM(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function qM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case os.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=yt.TOUCH_ROTATE;break;case os.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=yt.TOUCH_PAN;break;default:this.state=yt.NONE}break;case 2:switch(this.touches.TWO){case os.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=yt.TOUCH_DOLLY_PAN;break;case os.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=yt.TOUCH_DOLLY_ROTATE;break;default:this.state=yt.NONE}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent(bh)}function KM(i){switch(this._trackPointer(i),this.state){case yt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case yt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case yt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case yt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=yt.NONE}}function ZM(i){this.enabled!==!1&&i.preventDefault()}function JM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function QM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ed(i,e){if(e===dg)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===wl||e===Xf){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===wl)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class xp extends Cr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new sb(t)}),this.register(function(t){return new rb(t)}),this.register(function(t){return new pb(t)}),this.register(function(t){return new mb(t)}),this.register(function(t){return new gb(t)}),this.register(function(t){return new ab(t)}),this.register(function(t){return new cb(t)}),this.register(function(t){return new lb(t)}),this.register(function(t){return new hb(t)}),this.register(function(t){return new ib(t)}),this.register(function(t){return new ub(t)}),this.register(function(t){return new ob(t)}),this.register(function(t){return new fb(t)}),this.register(function(t){return new db(t)}),this.register(function(t){return new tb(t)}),this.register(function(t){return new _b(t)}),this.register(function(t){return new yb(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Qr.extractUrlBase(e);o=Qr.resolveURL(l,this.path)}else o=Qr.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new mp(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===vp){try{o[Ke.KHR_BINARY_GLTF]=new xb(e)}catch(u){s&&s(u);return}r=JSON.parse(o[Ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Db(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Ke.KHR_MATERIALS_UNLIT:o[u]=new nb;break;case Ke.KHR_DRACO_MESH_COMPRESSION:o[u]=new vb(r,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:o[u]=new Mb;break;case Ke.KHR_MESH_QUANTIZATION:o[u]=new bb;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function eb(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class tb{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new Ie(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],yn);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new _p(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new gp(h),l.distance=u;break;case"spot":l=new EM(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Ri(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class nb{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return ot}extendParams(e,t,n){const s=[];e.color=new Ie(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],yn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Dt))}return Promise.all(s)}}class ib{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class sb{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ce(a,a)}return Promise.all(r)}}class rb{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class ob{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class ab{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],yn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Dt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class cb{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class lb{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(a[0],a[1],a[2],yn),Promise.all(r)}}class hb{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class ub{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(a[0],a[1],a[2],yn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Dt)),Promise.all(r)}}class db{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class fb{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:gi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class pb{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class mb{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class gb{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class _b{constructor(e){this.name=Ke.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,d,s.mode,s.filter),p})})}else return null}}class yb{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==Bn.TRIANGLES&&l.mode!==Bn.TRIANGLE_STRIP&&l.mode!==Bn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(const g of u){const _=new ke,m=new D,f=new ii,b=new D(1,1,1),S=new up(g.geometry,g.material,d);for(let x=0;x<d;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,x),c.SCALE&&b.fromBufferAttribute(c.SCALE,x),S.setMatrixAt(x,_.compose(m,f,b));for(const x in c)if(x==="_COLOR_0"){const P=c[x];S.instanceColor=new Pl(P.array,P.itemSize,P.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);St.prototype.copy.call(S,g),this.parser.assignFinalMaterial(S),p.push(S)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const vp="glTF",Xr=12,Td={JSON:1313821514,BIN:5130562};class xb{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Xr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==vp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Xr,r=new DataView(e,Xr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Td.JSON){const l=new Uint8Array(e,Xr+o,a);this.content=n.decode(l)}else if(c===Td.BIN){const l=Xr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class vb{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=Il[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Il[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],p=cr[d.componentType];l[u]=p.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(p){for(const g in p.attributes){const _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(p)},a,l,yn,d)})})}}class Mb{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class bb{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}}class Mp extends xo{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,d=u*u,p=d*u,g=e*l,_=g-l,m=-2*p+3*d,f=p-d,b=1-m,S=f-d+u;for(let x=0;x!==a;x++){const P=o[_+x+a],A=o[_+x+c]*h,C=o[g+x+a],w=o[g+x]*h;r[x]=b*P+S*A+m*C+f*w}return r}}const Sb=new ii;class Eb extends Mp{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return Sb.fromArray(r).normalize().toArray(r),r}}const Bn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},cr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ad={9728:gn,9729:Gt,9984:Uf,9985:ua,9986:jr,9987:Di},wd={33071:as,33648:Ma,10497:ds},Dc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Il={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ts={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Tb={CUBICSPLINE:void 0,LINEAR:ro,STEP:so},Ic={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ab(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new nt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:zi})),i.DefaultMaterial}function Es(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ri(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function wb(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Rb(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Cb(i){let e;const t=i.extensions&&i.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Nc(t.attributes):e=i.indices+":"+Nc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Nc(i.targets[n]);return e}function Nc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Nl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Pb(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Lb=new ke;class Db{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new eb,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new MM(this.options.manager):this.textureLoader=new wM(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new mp(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Es(r,a,s),Ri(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Qr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=Dc[s.type],a=cr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new _n(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Dc[s.type],l=cr[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(p&&p!==u){const f=Math.floor(d/p),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count;let S=t.cache.get(b);S||(_=new l(a,f*p,s.count*p/h),S=new eM(_,p/h),t.cache.add(b,S)),m=new _h(S,c,d%p/h,g)}else a===null?_=new l(s.count*c):_=new l(a,d,s.count*c),m=new _n(_,c,g);if(s.sparse!==void 0){const f=Dc.SCALAR,b=cr[s.sparse.indices.componentType],S=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,P=new b(o[1],S,s.sparse.count*f),A=new l(o[2],x,s.sparse.count*c);a!==null&&(m=new _n(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,w=P.length;C<w;C++){const v=P[C];if(m.setX(v,A[C*c]),c>=2&&m.setY(v,A[C*c+1]),c>=3&&m.setZ(v,A[C*c+2]),c>=4&&m.setW(v,A[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Ad[d.magFilter]||Gt,h.minFilter=Ad[d.minFilter]||Di,h.wrapS=wd[d.wrapS]||ds,h.wrapT=wd[d.wrapT]||ds,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==gn&&h.minFilter!==Gt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Xt(_);m.needsUpdate=!0,d(m)}),t.load(Qr.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Ri(u,o),u.userData.mimeType=o.mimeType||Pb(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Ke.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new dp,di.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Oa,di.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return nt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[Ke.KHR_MATERIALS_UNLIT]){const u=s[Ke.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new Ie(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],yn),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Dt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=tn);const h=r.alphaMode||Ic.OPAQUE;if(h===Ic.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Ic.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==ot&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ce(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==ot&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==ot){const u=r.emissiveFactor;a.emissive=new Ie().setRGB(u[0],u[1],u[2],yn)}return r.emissiveTexture!==void 0&&o!==ot&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Dt)),Promise.all(l).then(function(){const u=new o(a);return r.name&&(u.name=r.name),Ri(u,r),t.associations.set(u,{materials:e}),r.extensions&&Es(s,u,r),u})}createUniqueName(e){const t=pt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Rd(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=Cb(l),u=s[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Rd(new sn,l,t),s[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?Ab(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){const _=h[p],m=o[p];let f;const b=l[p];if(m.mode===Bn.TRIANGLES||m.mode===Bn.TRIANGLE_STRIP||m.mode===Bn.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new nM(_,b):new ie(_,b),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===Bn.TRIANGLE_STRIP?f.geometry=Ed(f.geometry,Xf):m.mode===Bn.TRIANGLE_FAN&&(f.geometry=Ed(f.geometry,wl));else if(m.mode===Bn.LINES)f=new rM(_,b);else if(m.mode===Bn.LINE_STRIP)f=new go(_,b);else if(m.mode===Bn.LINE_LOOP)f=new oM(_,b);else if(m.mode===Bn.POINTS)f=new aM(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&Rb(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),Ri(f,r),m.extensions&&Es(s,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&Es(s,u[0],r),u[0];const d=new Je;r.extensions&&Es(s,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new fn(dh.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new mh(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ri(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new ke;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new yh(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const p=s.channels[u],g=s.samplers[p.sampler],_=p.target,m=_.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,b=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",b)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],p=u[1],g=u[2],_=u[3],m=u[4],f=[];for(let b=0,S=d.length;b<S;b++){const x=d[b],P=p[b],A=g[b],C=_[b],w=m[b];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const v=n._createAnimationTracks(x,P,A,C,w);if(v)for(let y=0;y<v.length;y++)f.push(v[y])}return new pM(r,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,Lb)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new lp:l.length>1?h=new Je:l.length===1?h=l[0]:h=new St,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Ri(h,r),r.extensions&&Es(n,h,r),r.matrix!==void 0){const u=new ke;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Je;n.name&&(r.name=s.createUniqueName(n.name)),Ri(r,n),n.extensions&&Es(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);const l=h=>{const u=new Map;for(const[d,p]of s.associations)(d instanceof di||d instanceof Xt)&&u.set(d,p);return h.traverse(d=>{const p=s.associations.get(d);p!=null&&u.set(d,p)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];ts[r.path]===ts.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(ts[r.path]){case ts.weights:l=gr;break;case ts.rotation:l=_r;break;case ts.position:case ts.scale:l=yr;break;default:switch(n.itemSize){case 1:l=gr;break;case 2:case 3:default:l=yr;break}break}const h=s.interpolation!==void 0?Tb[s.interpolation]:ro,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){const g=new l(c[d]+"."+ts[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Nl(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof _r?Eb:Mp;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ib(i,e,t){const n=e.attributes,s=new $i;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new D(c[0],c[1],c[2]),new D(l[0],l[1],l[2])),a.normalized){const h=Nl(cr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new D,c=new D;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const _=Nl(cr[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new mi;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Rd(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=Il[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return Ze.workingColorSpace!==yn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),Ri(i,e),Ib(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?wb(i,e.targets,t):i})}const Ut={ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:.05,AxisTouchThreshold:.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function bp(i){const e=await fetch(i);if(e.ok)return e.json();throw new Error(e.statusText)}async function Nb(i){if(!i)throw new Error("No basePath supplied");return await bp(`${i}/profilesList.json`)}async function Ub(i,e,t=null,n=!0){if(!i)throw new Error("No xrInputSource supplied");if(!e)throw new Error("No basePath supplied");const s=await Nb(e);let r;if(i.profiles.some(c=>{const l=s[c];return l&&(r={profileId:c,profilePath:`${e}/${l.path}`,deprecated:!!l.deprecated}),!!r}),!r){if(!t)throw new Error("No matching profile name found");const c=s[t];if(!c)throw new Error(`No matching profile name found and default profile "${t}" missing.`);r={profileId:t,profilePath:`${e}/${c.path}`,deprecated:!!c.deprecated}}const o=await bp(r.profilePath);let a;if(n){let c;if(i.handedness==="any"?c=o.layouts[Object.keys(o.layouts)[0]]:c=o.layouts[i.handedness],!c)throw new Error(`No matching handedness, ${i.handedness}, in profile ${r.profileId}`);c.assetPath&&(a=r.profilePath.replace("profile.json",c.assetPath))}return{profile:o,assetPath:a}}const Ob={xAxis:0,yAxis:0,button:0,state:Ut.ComponentState.DEFAULT};function Fb(i=0,e=0){let t=i,n=e;if(Math.sqrt(i*i+e*e)>1){const o=Math.atan2(e,i);t=Math.cos(o),n=Math.sin(o)}return{normalizedXAxis:t*.5+.5,normalizedYAxis:n*.5+.5}}class Bb{constructor(e){this.componentProperty=e.componentProperty,this.states=e.states,this.valueNodeName=e.valueNodeName,this.valueNodeProperty=e.valueNodeProperty,this.valueNodeProperty===Ut.VisualResponseProperty.TRANSFORM&&(this.minNodeName=e.minNodeName,this.maxNodeName=e.maxNodeName),this.value=0,this.updateFromComponent(Ob)}updateFromComponent({xAxis:e,yAxis:t,button:n,state:s}){const{normalizedXAxis:r,normalizedYAxis:o}=Fb(e,t);switch(this.componentProperty){case Ut.ComponentProperty.X_AXIS:this.value=this.states.includes(s)?r:.5;break;case Ut.ComponentProperty.Y_AXIS:this.value=this.states.includes(s)?o:.5;break;case Ut.ComponentProperty.BUTTON:this.value=this.states.includes(s)?n:0;break;case Ut.ComponentProperty.STATE:this.valueNodeProperty===Ut.VisualResponseProperty.VISIBILITY?this.value=this.states.includes(s):this.value=this.states.includes(s)?1:0;break;default:throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`)}}}class kb{constructor(e,t){if(!e||!t||!t.visualResponses||!t.gamepadIndices||Object.keys(t.gamepadIndices).length===0)throw new Error("Invalid arguments supplied");this.id=e,this.type=t.type,this.rootNodeName=t.rootNodeName,this.touchPointNodeName=t.touchPointNodeName,this.visualResponses={},Object.keys(t.visualResponses).forEach(n=>{const s=new Bb(t.visualResponses[n]);this.visualResponses[n]=s}),this.gamepadIndices=Object.assign({},t.gamepadIndices),this.values={state:Ut.ComponentState.DEFAULT,button:this.gamepadIndices.button!==void 0?0:void 0,xAxis:this.gamepadIndices.xAxis!==void 0?0:void 0,yAxis:this.gamepadIndices.yAxis!==void 0?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(e){if(this.values.state=Ut.ComponentState.DEFAULT,this.gamepadIndices.button!==void 0&&e.buttons.length>this.gamepadIndices.button){const t=e.buttons[this.gamepadIndices.button];this.values.button=t.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=this.values.button>1?1:this.values.button,t.pressed||this.values.button===1?this.values.state=Ut.ComponentState.PRESSED:(t.touched||this.values.button>Ut.ButtonTouchThreshold)&&(this.values.state=Ut.ComponentState.TOUCHED)}this.gamepadIndices.xAxis!==void 0&&e.axes.length>this.gamepadIndices.xAxis&&(this.values.xAxis=e.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=this.values.xAxis>1?1:this.values.xAxis,this.values.state===Ut.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>Ut.AxisTouchThreshold&&(this.values.state=Ut.ComponentState.TOUCHED)),this.gamepadIndices.yAxis!==void 0&&e.axes.length>this.gamepadIndices.yAxis&&(this.values.yAxis=e.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=this.values.yAxis>1?1:this.values.yAxis,this.values.state===Ut.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>Ut.AxisTouchThreshold&&(this.values.state=Ut.ComponentState.TOUCHED)),Object.values(this.visualResponses).forEach(t=>{t.updateFromComponent(this.values)})}}class Hb{constructor(e,t,n){if(!e)throw new Error("No xrInputSource supplied");if(!t)throw new Error("No profile supplied");this.xrInputSource=e,this.assetUrl=n,this.id=t.profileId,this.layoutDescription=t.layouts[e.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach(s=>{const r=this.layoutDescription.components[s];this.components[s]=new kb(s,r)}),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){const e=[];return Object.values(this.components).forEach(t=>{e.push(t.data)}),e}updateFromGamepad(){Object.values(this.components).forEach(e=>{e.updateFromGamepad(this.xrInputSource.gamepad)})}}const zb="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles",Vb="generic-trigger";class Gb extends St{constructor(){super(),this.motionController=null,this.envMap=null}setEnvironmentMap(e){return this.envMap==e?this:(this.envMap=e,this.traverse(t=>{t.isMesh&&(t.material.envMap=this.envMap,t.material.needsUpdate=!0)}),this)}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&(this.motionController.updateFromGamepad(),Object.values(this.motionController.components).forEach(t=>{Object.values(t.visualResponses).forEach(n=>{const{valueNode:s,minNode:r,maxNode:o,value:a,valueNodeProperty:c}=n;s&&(c===Ut.VisualResponseProperty.VISIBILITY?s.visible=a:c===Ut.VisualResponseProperty.TRANSFORM&&(s.quaternion.slerpQuaternions(r.quaternion,o.quaternion,a),s.position.lerpVectors(r.position,o.position,a)))})}))}}function Wb(i,e){Object.values(i.components).forEach(t=>{const{type:n,touchPointNodeName:s,visualResponses:r}=t;if(n===Ut.ComponentType.TOUCHPAD)if(t.touchPointNode=e.getObjectByName(s),t.touchPointNode){const o=new Zt(.001),a=new ot({color:255}),c=new ie(o,a);t.touchPointNode.add(c)}else console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);Object.values(r).forEach(o=>{const{valueNodeName:a,minNodeName:c,maxNodeName:l,valueNodeProperty:h}=o;if(h===Ut.VisualResponseProperty.TRANSFORM){if(o.minNode=e.getObjectByName(c),o.maxNode=e.getObjectByName(l),!o.minNode){console.warn(`Could not find ${c} in the model`);return}if(!o.maxNode){console.warn(`Could not find ${l} in the model`);return}}o.valueNode=e.getObjectByName(a),o.valueNode||console.warn(`Could not find ${a} in the model`)})})}function Cd(i,e){Wb(i.motionController,e),i.envMap&&e.traverse(t=>{t.isMesh&&(t.material.envMap=i.envMap,t.material.needsUpdate=!0)}),i.add(e)}class Xb{constructor(e=null,t=null){this.gltfLoader=e,this.path=zb,this._assetCache={},this.onLoad=t,this.gltfLoader||(this.gltfLoader=new xp)}setPath(e){return this.path=e,this}createControllerModel(e){const t=new Gb;let n=null;return e.addEventListener("connected",s=>{const r=s.data;r.targetRayMode!=="tracked-pointer"||!r.gamepad||r.hand||Ub(r,this.path,Vb).then(({profile:o,assetPath:a})=>{t.motionController=new Hb(r,o,a);const c=this._assetCache[t.motionController.assetUrl];if(c)n=c.scene.clone(),Cd(t,n),this.onLoad&&this.onLoad(n);else{if(!this.gltfLoader)throw new Error("GLTFLoader not set.");this.gltfLoader.setPath(""),this.gltfLoader.load(t.motionController.assetUrl,l=>{this._assetCache[t.motionController.assetUrl]=l,n=l.scene.clone(),Cd(t,n),this.onLoad&&this.onLoad(n)},null,()=>{throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`)})}}).catch(o=>{console.warn(o)})}),e.addEventListener("disconnected",()=>{t.motionController=null,t.remove(n),n=null}),t}}const Pd=new ke,Ld=new D;class Dd{constructor(e,t,n,s,r){this.controller=t,this.handModel=e,this.envMap=null;let o;!r||!r.primitive||r.primitive==="sphere"?o=new Zt(1,10,10):r.primitive==="box"&&(o=new wt(1,1,1));const a=new nt;this.handMesh=new up(o,a,30),this.handMesh.frustumCulled=!1,this.handMesh.instanceMatrix.setUsage(Sg),this.handMesh.castShadow=!0,this.handMesh.receiveShadow=!0,this.handModel.add(this.handMesh),this.joints=["wrist","thumb-metacarpal","thumb-phalanx-proximal","thumb-phalanx-distal","thumb-tip","index-finger-metacarpal","index-finger-phalanx-proximal","index-finger-phalanx-intermediate","index-finger-phalanx-distal","index-finger-tip","middle-finger-metacarpal","middle-finger-phalanx-proximal","middle-finger-phalanx-intermediate","middle-finger-phalanx-distal","middle-finger-tip","ring-finger-metacarpal","ring-finger-phalanx-proximal","ring-finger-phalanx-intermediate","ring-finger-phalanx-distal","ring-finger-tip","pinky-finger-metacarpal","pinky-finger-phalanx-proximal","pinky-finger-phalanx-intermediate","pinky-finger-phalanx-distal","pinky-finger-tip"]}updateMesh(){const t=this.controller.joints;let n=0;for(let s=0;s<this.joints.length;s++){const r=t[this.joints[s]];r.visible&&(Ld.setScalar(r.jointRadius||.008),Pd.compose(r.position,r.quaternion,Ld),this.handMesh.setMatrixAt(s,Pd),n++)}this.handMesh.count=n,this.handMesh.instanceMatrix.needsUpdate=!0}}const $b="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";class Yb{constructor(e,t,n,s,r=null,o=null){this.controller=t,this.handModel=e,this.bones=[],r===null&&(r=new xp,r.setPath(n||$b)),r.load(`${s}.glb`,a=>{const c=a.scene.children[0];this.handModel.add(c);const l=c.getObjectByProperty("type","SkinnedMesh");l.frustumCulled=!1,l.castShadow=!0,l.receiveShadow=!0,["wrist","thumb-metacarpal","thumb-phalanx-proximal","thumb-phalanx-distal","thumb-tip","index-finger-metacarpal","index-finger-phalanx-proximal","index-finger-phalanx-intermediate","index-finger-phalanx-distal","index-finger-tip","middle-finger-metacarpal","middle-finger-phalanx-proximal","middle-finger-phalanx-intermediate","middle-finger-phalanx-distal","middle-finger-tip","ring-finger-metacarpal","ring-finger-phalanx-proximal","ring-finger-phalanx-intermediate","ring-finger-phalanx-distal","ring-finger-tip","pinky-finger-metacarpal","pinky-finger-phalanx-proximal","pinky-finger-phalanx-intermediate","pinky-finger-phalanx-distal","pinky-finger-tip"].forEach(u=>{const d=c.getObjectByName(u);d!==void 0?d.jointName=u:console.warn(`Couldn't find ${u} in ${s} hand mesh`),this.bones.push(d)}),o&&o(c)})}updateMesh(){const e=this.controller.joints;for(let t=0;t<this.bones.length;t++){const n=this.bones[t];if(n){const s=e[n.jointName];if(s.visible){const r=s.position;n.position.copy(r),n.quaternion.copy(s.quaternion)}}}}}class jb extends St{constructor(e){super(),this.controller=e,this.motionController=null,this.envMap=null,this.mesh=null}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&this.motionController.updateMesh()}}class qb{constructor(e=null,t=null){this.gltfLoader=e,this.path=null,this.onLoad=t}setPath(e){return this.path=e,this}createHandModel(e,t){const n=new jb(e);return e.addEventListener("connected",s=>{const r=s.data;r.hand&&!n.motionController&&(n.xrInputSource=r,t===void 0||t==="spheres"?n.motionController=new Dd(n,e,this.path,r.handedness,{primitive:"sphere"}):t==="boxes"?n.motionController=new Dd(n,e,this.path,r.handedness,{primitive:"box"}):t==="mesh"&&(n.motionController=new Yb(n,e,this.path,r.handedness,this.gltfLoader,this.onLoad))),e.visible=!0}),e.addEventListener("disconnected",()=>{e.visible=!1}),n}}const Ci=.13,En=.49,Kb=10,Ul={DESERT:"desert"},$e=["wood","brick","sheep","wheat","ore"],Id={wood:"wood",lumber:"wood",brick:"brick",clay:"brick",sheep:"sheep",wool:"sheep",wheat:"wheat",grain:"wheat",ore:"ore"};function Pi(i){if(i==null)return null;const e=String(i).trim().toLowerCase();return Id[e]?Id[e]:$e.includes(e)?e:null}const rt={wood:"Lumber",brick:"Brick",sheep:"Wool",wheat:"Grain",ore:"Ore",desert:"Desert"},Ln={wood:"#3f8f4c",brick:"#c45b32",sheep:"#b5d86a",wheat:"#e6c24a",ore:"#9aa3b0",desert:"#e2c48a"},Zb={wood:4,brick:3,sheep:4,wheat:4,ore:3,desert:1},Jb=[2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12],Sp={2:1,3:2,4:3,5:4,6:5,8:5,9:4,10:3,11:2,12:1},mt={road:{wood:1,brick:1},settlement:{wood:1,brick:1,sheep:1,wheat:1},city:{wheat:3,ore:2},dev:{sheep:1,wheat:1,ore:1}};function Ni(i,e=" · "){return Object.entries(i).filter(([,t])=>t).map(([t,n])=>`${rt[t]||t} ${n}`).join(e)}function Qb(i,e){return Object.entries(e||{}).filter(([t,n])=>n&&(i[t]||0)<n).map(([t])=>rt[t]||t)}function eS(i,e){const t=Qb(i,e);return t.length?t.length===1?`Not enough ${t[0]}`:t.length===2?`Not enough ${t[0]} and ${t[1]}`:`Not enough ${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`:null}const oi={settlement:5,city:4,road:15},tS=19,bt={KNIGHT:"knight",VP:"vp",ROAD:"roadBuilding",PLENTY:"yearOfPlenty",MONOPOLY:"monopoly"},nS=[...Array(14).fill(bt.KNIGHT),...Array(5).fill(bt.VP),...Array(2).fill(bt.ROAD),...Array(2).fill(bt.PLENTY),...Array(2).fill(bt.MONOPOLY)],iS=["generic","generic","generic","generic","wood","brick","sheep","wheat","ore"],sS=[{id:0,name:"Red",color:"#b42318"},{id:1,name:"Blue",color:"#1f4e8c"},{id:2,name:"Orange",color:"#d46a1a"},{id:3,name:"White",color:"#efe7d6"}],F={SETUP_SETTLEMENT:"setupSettlement",SETUP_ROAD:"setupRoad",ROLL:"roll",MAIN:"main",DISCARD:"discard",ROBBER:"robber",STEAL:"steal",FREE_ROADS:"freeRoads",PLENTY:"plenty",MONOPOLY:"monopoly",GAME_OVER:"gameOver"},Nd=Math.sqrt(3);function Ep(i){let e=i>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function ya(i,e=Math.random){const t=[...i];for(let n=t.length-1;n>0;n--){const s=Math.floor(e()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}function Ud(i){const e=[];for(let t=-i;t<=i;t++){const n=Math.max(-i,-t-i),s=Math.min(i,-t+i);for(let r=n;r<=s;r++)e.push({q:t,r})}return e}function eo(i,e){return`${i},${e}`}function Ol(i,e,t){return{x:t*(Nd*i+Nd/2*e),z:t*(1.5*e)}}function rS(i,e,t,n){const s=Ol(i,e,n),r=Math.PI/180*(60*t-30);return{x:s.x+n*Math.cos(r),z:s.z+n*Math.sin(r)}}function oS(i,e){return`${Math.round(i*1e3)}_${Math.round(e*1e3)}`}function aS(i,e){return i<e?`${i}|${e}`:`${e}|${i}`}function cS(i,e){return[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]].map(([t,n])=>({q:i+t,r:e+n}))}function Fl(i,e){return Object.entries(e).every(([t,n])=>(i[t]||0)>=n)}function sa(i,e){for(const[t,n]of Object.entries(e))i[t]-=n}function lS(i,e,t=1){i[e]=(i[e]||0)+t}function hS(i){const e=new Map(i.map(t=>[eo(t.q,t.r),t]));for(const t of i)if(!(t.number!==6&&t.number!==8))for(const n of cS(t.q,t.r)){const s=e.get(eo(n.q,n.r));if(s&&(s.number===6||s.number===8))return!0}return!1}function uS(i=Date.now()){const e=Ep(i>>>0),t=Ud(2),n=Ud(3).filter(f=>Math.max(Math.abs(f.q),Math.abs(f.r),Math.abs(f.q+f.r))===3);let s=null;for(let f=0;f<80;f++){const b=[];for(const[A,C]of Object.entries(Zb))for(let w=0;w<C;w++)b.push(A);const S=ya(b,e),x=ya(Jb,e);let P=0;if(s=t.map((A,C)=>{const w=S[C],v=w===Ul.DESERT?null:x[P++],y=Ol(A.q,A.r,Ci);return{id:eo(A.q,A.r),q:A.q,r:A.r,x:y.x,z:y.z,resource:w,number:v,isLand:!0}}),!hS(s))break}const r=n.map(f=>{const b=Ol(f.q,f.r,Ci);return{id:eo(f.q,f.r),q:f.q,r:f.r,x:b.x,z:b.z,resource:"sea",number:null,isLand:!1}}),o=new Map;for(const f of[...s,...r])o.set(f.id,f);const a=new Map,c=new Map;function l(f,b,S){const x=rS(f,b,S,Ci),P=oS(x.x,x.z);a.has(P)||a.set(P,{id:P,x:x.x,z:x.z,hexes:[],neighbors:new Set,edges:[],building:null,harbor:null});const A=a.get(P),C=eo(f,b);return A.hexes.includes(C)||A.hexes.push(C),A}for(const f of o.values()){const b=[];for(let S=0;S<6;S++)b.push(l(f.q,f.r,S));for(let S=0;S<6;S++){const x=b[S],P=b[(S+1)%6];x.neighbors.add(P.id),P.neighbors.add(x.id);const A=aS(x.id,P.id);c.has(A)||c.set(A,{id:A,a:x.id,b:P.id,hexes:[],road:null,coastal:!1});const C=c.get(A);C.hexes.includes(f.id)||C.hexes.push(f.id),x.edges.includes(A)||x.edges.push(A),P.edges.includes(A)||P.edges.push(A)}}for(const f of a.values())f.neighbors=[...f.neighbors];for(const f of c.values()){const b=f.hexes.filter(x=>o.get(x).isLand).length,S=f.hexes.filter(x=>!o.get(x).isLand).length;f.touchesLand=b>0,f.coastal=b>0&&S>0}const h=[...c.values()].filter(f=>f.coastal);h.sort((f,b)=>{const S=a.get(f.a),x=a.get(b.a);return Math.atan2(S.z,S.x)-Math.atan2(x.z,x.x)});const u=[],d=new Set,p=ya(iS,e),g=Math.max(1,Math.floor(h.length/p.length));let _=0;for(let f=0;f<h.length&&_<p.length;f+=g){const b=h[f];if(d.has(b.a)||d.has(b.b))continue;const S=p[_++],x={id:`h${_}`,type:S,edge:b.id,vertices:[b.a,b.b]};u.push(x),a.get(b.a).harbor=S,a.get(b.b).harbor=S,d.add(b.a),d.add(b.b)}const m=s.find(f=>f.resource===Ul.DESERT);return{seed:i,hexes:o,land:s,sea:r,vertices:a,edges:c,harbors:u,robberHex:m.id}}function dS(i){return Sp[i]||0}function Ui(i,e){const t=i.vertices.get(e);let n=0;const s=new Set;for(const r of t.hexes){const o=i.hexes.get(r);o.isLand&&(n+=dS(o.number),o.resource!==Ul.DESERT&&s.add(o.resource))}return n+s.size*.35+(t.harbor?.8:0)}function Od(){return Object.fromEntries($e.map(i=>[i,0]))}function Uc(i){return $e.reduce((e,t)=>e+i[t],0)}class xr{constructor({playerCount:e=3,solo:t=!0,seed:n=Date.now()}={}){this.seed=n>>>0,this.rand=Ep(this.seed),this.board=uS(this.seed),this.playerCount=e,this.players=sS.slice(0,e).map((s,r)=>({...s,isAI:t?r!==0:!1,resources:Od(),roads:[],settlements:[],cities:[],devCards:[],knightsPlayed:0,lastSettlement:null})),this.bank=Object.fromEntries($e.map(s=>[s,tS])),this.devDeck=ya(nS,this.rand),this.current=0,this.setupIndex=0,this.phase=F.SETUP_SETTLEMENT,this.dice=[0,0],this.log=[],this.listeners=new Set,this.playedDevThisTurn=!1,this.freeRoads=0,this.discardQueue=[],this.stealCandidates=[],this.longestRoad={player:null,length:0},this.largestArmy={player:null,size:0},this.winner=null,this.lastAction=null,this.lastRoll=null,this.lastSteal=null,this.lastTrade=null,this.afterRobber=F.MAIN,this.note(`Island seed ${this.seed}. ${e} captains set sail.`)}on(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(e=null){this.lastAction=e;for(const t of this.listeners)t(this,e)}note(e){this.log.push(e),this.log.length>80&&this.log.shift()}player(e=this.current){return this.players[e]}isHuman(e=this.current){return!this.player(e).isAI}setupOrder(){const e=this.playerCount,t=Array.from({length:e},(s,r)=>r),n=[...t].reverse();return[...t,...n]}setupPlayer(){return this.setupOrder()[this.setupIndex]}publicVP(e){let t=e.settlements.length+e.cities.length*2;return this.longestRoad.player===e.id&&(t+=2),this.largestArmy.player===e.id&&(t+=2),t}hiddenVP(e){return e.devCards.filter(t=>t.type===bt.VP).length}totalVP(e){return this.publicVP(e)+this.hiddenVP(e)}scoreFacts(e){return{settlements:e.settlements.length,cities:e.cities.length,longestRoad:this.longestRoad.player===e.id,largestArmy:this.largestArmy.player===e.id,hiddenVP:this.hiddenVP(e),publicVP:this.publicVP(e),totalVP:this.totalVP(e)}}checkWin(e=this.current){const t=this.player(e);return this.totalVP(t)>=Kb?(this.winner=t.id,this.phase=F.GAME_OVER,this.note(`${t.name} reaches ${this.totalVP(t)} victory points and claims the island!`),!0):!1}tradeRate(e,t){var o;const n=Pi(t);let s=4;if(!e||!n)return s;const r=[...e.settlements,...e.cities];for(const a of r){const c=(o=this.board.vertices.get(a))==null?void 0:o.harbor;c&&(c==="generic"&&(s=Math.min(s,3)),c===n&&(s=Math.min(s,2)))}return s}whyNotBankTrade(e,t,n){if(this.phase!==F.MAIN)return"Trade after you roll.";if(e!==this.current)return"Wait for your turn.";const s=Pi(t),r=Pi(n);if(!s)return"Pick a resource to give the bank.";if(!r)return"Pick a resource to take from the bank.";if(s===r)return"Give and get must be different.";const o=this.player(e),a=this.tradeRate(o,s);return(o.resources[s]||0)<a?`Need ${a} ${rt[s]||s} for a ${a}:1 bank trade.`:(this.bank[r]||0)<1?`The bank is out of ${rt[r]||r}.`:null}canBankTrade(e,t,n){return!this.whyNotBankTrade(e,t,n)}validSettlements(e,{setup:t=!1}={}){const n=this.player(e),s=[];if(!t&&n.settlements.length>=oi.settlement)return s;for(const r of this.board.vertices.values())r.building||!r.hexes.some(c=>this.board.hexes.get(c).isLand)||r.neighbors.some(c=>this.board.vertices.get(c).building)||!t&&!r.edges.some(l=>this.board.edges.get(l).road===e)||s.push(r.id);return s}validRoads(e,{setup:t=!1,free:n=!1}={}){const s=this.player(e),r=[];if(!n&&!t&&s.roads.length>=oi.road)return r;for(const o of this.board.edges.values()){if(o.road!=null||!o.touchesLand)continue;const a=this.board.vertices.get(o.a),c=this.board.vertices.get(o.b);if(t){const l=s.lastSettlement;if(o.a!==l&&o.b!==l)continue;r.push(o.id);continue}(this.roadConnects(a,e)||this.roadConnects(c,e))&&r.push(o.id)}return r}roadConnects(e,t){var n;return e.building&&e.building.player!==t?!1:((n=e.building)==null?void 0:n.player)===t?!0:e.edges.some(s=>this.board.edges.get(s).road===t)}validCities(e){const t=this.player(e);return t.cities.length>=oi.city?[]:t.settlements.filter(n=>{var s;return((s=this.board.vertices.get(n).building)==null?void 0:s.type)==="settlement"})}canAfford(e,t){return Fl(this.player(e).resources,mt[t])}missingCostLabel(e,t){return eS(this.player(e).resources,mt[t])}whyNotSettlement(e,t=this.current){const n=this.phase===F.SETUP_SETTLEMENT,s=this.player(t);if(e==null){if(!n&&this.phase!==F.MAIN)return"Can't settle now";if(!n){const a=this.missingCostLabel(t,"settlement");if(a)return a}return!n&&s.settlements.length>=oi.settlement?"No settlements left":"Can't settle now"}if(this.validSettlements(t,{setup:n}).includes(e)){if(!n){const a=this.missingCostLabel(t,"settlement");if(a)return a}return"Can't settle here"}const r=this.board.vertices.get(e);return r?r.building?"Already occupied":r.hexes.some(a=>this.board.hexes.get(a).isLand)?r.neighbors.some(a=>this.board.vertices.get(a).building)?"Too close to another settlement":!n&&!r.edges.some(c=>this.board.edges.get(c).road===t)?"Need a road connection":!n&&s.settlements.length>=oi.settlement?"No settlements left":"Can't settle here":"Can't settle here":"Can't settle here"}whyNotRoad(e,t=this.current){const n=this.phase===F.SETUP_ROAD,s=this.phase===F.FREE_ROADS,r=this.player(t);if(e==null){if(!n&&!s&&this.phase!==F.MAIN)return"Can't build a road now";if(!n&&!s){const l=this.missingCostLabel(t,"road");if(l)return l}return!s&&!n&&r.roads.length>=oi.road?"No roads left":"Can't build a road now"}const o=this.board.edges.get(e);if(!o)return"Can't build here";if(o.road!=null)return"Already occupied";if(this.validRoads(t,{setup:n,free:s}).includes(e)){if(!n&&!s){const l=this.missingCostLabel(t,"road");if(l)return l}return"Can't build here"}if(!o.touchesLand)return"Can't build on water";const a=this.board.vertices.get(o.a),c=this.board.vertices.get(o.b);if(n){const l=r.lastSettlement;if(o.a!==l&&o.b!==l)return"Must touch your new settlement"}else if(!this.roadConnects(a,t)&&!this.roadConnects(c,t))return"Need a road connection";return!s&&!n&&r.roads.length>=oi.road?"No roads left":"Can't build here"}whyNotCity(e,t=this.current){var o;const n=this.player(t);if(e==null){if(this.phase!==F.MAIN)return"Can't build a city now";const a=this.missingCostLabel(t,"city");return a||(n.cities.length>=oi.city?"No cities left":this.validCities(t).length?"Can't build a city now":"Need a settlement here")}if(this.phase!==F.MAIN)return"Can't build a city now";if(n.cities.length>=oi.city)return"No cities left";const s=this.board.vertices.get(e);if(((o=s==null?void 0:s.building)==null?void 0:o.type)==="city")return"Already a city";if(!(s!=null&&s.building))return"Need a settlement here";if(s.building.player!==t)return"Already occupied";if(s.building.type!=="settlement")return"Need a settlement here";const r=this.missingCostLabel(t,"city");return r||"Can't build a city now"}whyNotDev(e=this.current){if(this.phase!==F.MAIN)return"Can't buy a card now";const t=this.missingCostLabel(e,"dev");return t||(this.devDeck.length?"Can't buy a card now":"No development cards left")}takeFromBank(e,t,n){const s=Math.min(t,this.bank[e]);return this.bank[e]-=s,lS(n.resources,e,s),s}returnToBank(e,t,n){const s=Math.min(n,e.resources[t]);e.resources[t]-=s,this.bank[t]+=s}placeSettlement(e,t=this.current){const n=this.phase===F.SETUP_SETTLEMENT;if(!this.validSettlements(t,{setup:n}).includes(e))return!1;const s=this.player(t);if(!n){if(!this.canAfford(t,"settlement"))return!1;sa(s.resources,mt.settlement);for(const[o,a]of Object.entries(mt.settlement))this.bank[o]+=a}const r=this.board.vertices.get(e);if(r.building={player:t,type:"settlement"},s.settlements.push(e),s.lastSettlement=e,this.note(`${s.name} founds a settlement.`),this.updateLongestRoad(),n){if(this.setupIndex>=this.playerCount)for(const o of r.hexes){const a=this.board.hexes.get(o);a.isLand&&a.resource!=="desert"&&this.takeFromBank(a.resource,1,s)}this.phase=F.SETUP_ROAD,this.current=t}else this.checkWin(t);return this.emit({type:"settlement",vertexId:e,playerId:t}),!0}placeRoad(e,t=this.current){const n=this.phase===F.SETUP_ROAD,s=this.phase===F.FREE_ROADS;if(!this.validRoads(t,{setup:n,free:s}).includes(e)||this.board.edges.get(e).road!=null)return!1;const r=this.player(t);if(!n&&!s){if(!this.canAfford(t,"road"))return!1;sa(r.resources,mt.road);for(const[o,a]of Object.entries(mt.road))this.bank[o]+=a}return this.board.edges.get(e).road=t,r.roads.push(e),this.note(`${r.name} builds a road.`),this.updateLongestRoad(),n?(this.setupIndex+=1,this.setupIndex>=this.playerCount*2?(this.current=0,this.phase=F.ROLL,this.note("The island is claimed. Red rolls first.")):(this.current=this.setupPlayer(),this.phase=F.SETUP_SETTLEMENT)):s?(this.freeRoads-=1,this.freeRoads<=0&&(this.phase=F.MAIN),this.checkWin(t)):this.checkWin(t),this.emit({type:"road",edgeId:e,playerId:t}),!0}placeCity(e,t=this.current){if(this.phase!==F.MAIN||!this.validCities(t).includes(e)||!this.canAfford(t,"city"))return!1;const n=this.player(t);sa(n.resources,mt.city);for(const[s,r]of Object.entries(mt.city))this.bank[s]+=r;return this.board.vertices.get(e).building.type="city",n.settlements=n.settlements.filter(s=>s!==e),n.cities.push(e),this.note(`${n.name} upgrades to a city.`),this.checkWin(t),this.emit({type:"city",vertexId:e,playerId:t}),!0}roll(){if(this.phase!==F.ROLL)return null;this.lastSteal=null,this.lastTrade=null;const e=1+Math.floor(this.rand()*6),t=1+Math.floor(this.rand()*6);this.dice=[e,t];const n=e+t;this.note(`${this.player().name} rolls ${e} + ${t} = ${n}.`);let s=[];return n===7?this.startRobber():(s=this.produce(n),this.phase=F.MAIN),this.lastRoll={dice:[e,t],production:s,seven:n===7,playerId:this.current},this.emit({type:"roll",dice:this.dice,production:s}),this.dice}produce(e){const t=this.players.map(()=>Od()),n=[];for(const r of this.board.land)if(!(r.number!==e||r.id===this.board.robberHex)&&$e.includes(r.resource))for(const o of this.board.vertices.values()){if(!o.building||!o.hexes.includes(r.id))continue;const a=o.building.type==="city"?2:1;t[o.building.player][r.resource]+=a,n.push({hexId:r.id,vertexId:o.id,playerId:o.building.player,resource:r.resource,amount:a})}const s=[];for(const r of $e){const o=t.reduce((a,c)=>a+c[r],0);if(o!==0){if(o>this.bank[r]){this.note(`The ${rt[r]||r} supply is too scarce to pay everyone.`);continue}for(let a=0;a<this.players.length;a++)t[a][r]&&this.takeFromBank(r,t[a][r],this.players[a]);for(const a of n)a.resource===r&&s.push(a)}}return s}startRobber(){this.lastSteal=null,this.discardQueue=this.players.filter(e=>Uc(e.resources)>=8).map(e=>({player:e.id,must:Math.floor(Uc(e.resources)/2)})),this.discardQueue.length?(this.phase=F.DISCARD,this.afterRobber=F.MAIN,this.note("A seven! Hands of eight or more must discard half.")):(this.afterRobber=F.MAIN,this.phase=F.ROBBER,this.note(`${this.player().name} must move the robber.`))}discard(e,t){const n=this.discardQueue.find(o=>o.player===e);if(!n)return!1;const s=this.player(e);let r=0;for(const o of $e)r+=t[o]||0;if(r!==n.must||!Fl(s.resources,t))return!1;for(const o of $e){const a=t[o]||0;a&&this.returnToBank(s,o,a)}return this.discardQueue=this.discardQueue.filter(o=>o.player!==e),this.note(`${s.name} discards ${r} cards.`),this.discardQueue.length||(this.phase=F.ROBBER),this.emit({type:"discard",playerId:e}),!0}moveRobber(e,t=this.current){if(this.phase!==F.ROBBER)return!1;this.lastSteal=null;const n=this.board.hexes.get(e);if(!(n!=null&&n.isLand)||e===this.board.robberHex)return!1;this.board.robberHex=e,this.note(`${this.player(t).name} moves the robber.`);const s=new Set;for(const r of this.board.vertices.values())if(r.building&&r.hexes.includes(e)&&r.building.player!==t){const o=this.player(r.building.player);Uc(o.resources)>0&&s.add(o.id)}return this.stealCandidates=[...s],this.phase=this.stealCandidates.length?F.STEAL:this.afterRobber,this.stealCandidates.length||this.note("No neighbor to steal from."),this.emit({type:"robber",hexId:e}),!0}steal(e,t=this.current){if(this.phase!==F.STEAL||!this.stealCandidates.includes(e))return!1;const n=this.player(e),s=[];for(const o of $e)for(let a=0;a<n.resources[o];a++)s.push(o);if(!s.length)return this.lastSteal=null,this.phase=this.afterRobber,this.emit({type:"steal",fromId:e,playerId:t,resource:null}),!0;const r=s[Math.floor(this.rand()*s.length)];return n.resources[r]-=1,this.player(t).resources[r]+=1,this.lastSteal={playerId:t,fromId:e,resource:r},this.note(`${this.player(t).name} steals ${rt[r]||r} from ${n.name}.`),this.phase=this.afterRobber,this.emit({type:"steal",fromId:e,playerId:t,resource:r}),!0}bankTrade(e,t,n){const s=Pi(t),r=Pi(n);if(this.whyNotBankTrade(e,s,r))return!1;const o=this.player(e),a=this.tradeRate(o,s);return this.returnToBank(o,s,a),this.takeFromBank(r,1,o),this.lastTrade={playerId:e,give:s,get:r,rate:a},this.note(`Traded ${a} ${rt[s]||s} for 1 ${rt[r]||r}`),this.emit({type:"trade",give:s,get:r,rate:a,playerId:e}),!0}buyDev(e=this.current){if(this.phase!==F.MAIN||!this.devDeck.length||!this.canAfford(e,"dev"))return!1;const t=this.player(e);sa(t.resources,mt.dev);for(const[s,r]of Object.entries(mt.dev))this.bank[s]+=r;const n=this.devDeck.pop();return t.devCards.push({type:n,playable:!1,id:`${e}-${t.devCards.length}-${this.rand()}`}),this.note(`${t.name} buys a development card.`),this.checkWin(e),this.emit({type:"buyDev"}),!0}playableCards(e){const t=this.player(e);return this.playedDevThisTurn?[]:[F.ROLL,F.MAIN].includes(this.phase)?t.devCards.filter(n=>n.playable&&n.type!==bt.VP):[]}playDev(e,t={}){const n=this.player(),s=n.devCards.find(r=>r.id===e);return!s||!this.playableCards(n.id).some(r=>r.id===e)?!1:(this.playedDevThisTurn=!0,n.devCards=n.devCards.filter(r=>r.id!==e),s.type===bt.KNIGHT?(n.knightsPlayed+=1,this.updateArmy(),this.lastSteal=null,this.note(`${n.name} plays a knight.`),this.afterRobber=this.phase===F.ROLL?F.ROLL:F.MAIN,this.phase=F.ROBBER):s.type===bt.ROAD?(this.freeRoads=Math.min(2,oi.road-n.roads.length),this.phase=this.freeRoads?F.FREE_ROADS:F.MAIN,this.note(`${n.name} plays Road Building.`)):s.type===bt.PLENTY?(this.phase=F.PLENTY,this.note(`${n.name} plays Year of Plenty.`)):s.type===bt.MONOPOLY&&(this.phase=F.MONOPOLY,this.note(`${n.name} plays Monopoly.`)),this.checkWin(n.id),this.emit({type:"dev",card:s}),!0)}yearOfPlenty(e,t,n=this.current){if(this.phase!==F.PLENTY)return!1;const s=this.player(n);return this.takeFromBank(e,1,s),this.takeFromBank(t,1,s),this.phase=F.MAIN,this.note(`${s.name} takes ${rt[e]||e} and ${rt[t]||t} from the bank.`),this.emit({type:"plenty"}),!0}monopoly(e,t=this.current){if(this.phase!==F.MONOPOLY)return!1;const n=this.player(t);let s=0;for(const r of this.players)r.id!==t&&(s+=r.resources[e],r.resources[e]=0);return n.resources[e]+=s,this.phase=F.MAIN,this.note(`${n.name} monopolizes ${rt[e]||e} (${s} cards).`),this.emit({type:"monopoly"}),!0}endTurn(){if(this.phase!==F.MAIN)return!1;if(this.checkWin(this.current))return this.emit({type:"end"}),!0;const e=this.player();for(const t of e.devCards)t.playable=!0;return this.playedDevThisTurn=!1,this.lastTrade=null,this.current=(this.current+1)%this.playerCount,this.phase=F.ROLL,this.note(`${this.player().name}'s turn.`),this.emit({type:"end"}),!0}updateArmy(){let e=this.largestArmy;for(const t of this.players)t.knightsPlayed>=3&&t.knightsPlayed>e.size&&(e={player:t.id,size:t.knightsPlayed});e.player!==this.largestArmy.player&&e.player!=null&&this.note(`${this.player(e.player).name} claims Largest Army.`),this.largestArmy=e}roadLength(e){const t=[...this.board.edges.values()].filter(o=>o.road===e),n=new Map;for(const o of t){const a=c=>{const l=this.board.vertices.get(c).building;return l&&l.player!==e};a(o.a)||(n.has(o.a)||n.set(o.a,[]),n.get(o.a).push(o)),a(o.b)||(n.has(o.b)||n.set(o.b,[]),n.get(o.b).push(o))}let s=0;const r=t.map(o=>o.id);for(const o of r){const a=[{eid:o,from:null,path:new Set([o])}];for(;a.length;){const{eid:c,from:l,path:h}=a.pop();s=Math.max(s,h.size);const u=this.board.edges.get(c);for(const d of[u.a,u.b]){if(d===l)continue;const p=this.board.vertices.get(d).building;if(!(p&&p.player!==e))for(const g of this.board.vertices.get(d).edges){if(h.has(g)||this.board.edges.get(g).road!==e)continue;const _=new Set(h);_.add(g),this.board.edges.get(g).a===d?this.board.edges.get(g).b:this.board.edges.get(g).a,a.push({eid:g,from:d,path:_})}}}}return s}updateLongestRoad(){const e=this.players.map(n=>({id:n.id,n:this.roadLength(n.id)}));let t=this.longestRoad;for(const n of e)n.n>=5&&n.n>t.length&&(t={player:n.id,length:n.n});if(t.player!=null){const n=e.find(s=>s.id===t.player);if(!n||n.n<5){const s=e.filter(r=>r.n>=5).sort((r,o)=>o.n-r.n);t=s.length?{player:s[0].id,length:s[0].n}:{player:null,length:0}}else t.length=n.n}t.player!==this.longestRoad.player&&t.player!=null&&this.note(`${this.player(t.player).name} claims Longest Road.`),this.longestRoad=t}suggestSetupVertex(e){const t=this.validSettlements(e,{setup:!0});return t.sort((n,s)=>Ui(this.board,s)-Ui(this.board,n)),t[0]}toSnapshot(){const e=[];for(const n of this.board.vertices.values())n.building&&e.push({id:n.id,...n.building});const t=[];for(const n of this.board.edges.values())n.road!=null&&t.push({id:n.id,player:n.road});return{seed:this.seed,playerCount:this.playerCount,players:this.players.map(n=>({id:n.id,name:n.name,color:n.color,isAI:!!n.isAI,resources:{...n.resources},roads:[...n.roads],settlements:[...n.settlements],cities:[...n.cities],devCards:n.devCards.map(s=>({...s})),knightsPlayed:n.knightsPlayed,lastSettlement:n.lastSettlement})),bank:{...this.bank},devDeck:[...this.devDeck],current:this.current,setupIndex:this.setupIndex,phase:this.phase,dice:[...this.dice],log:[...this.log],playedDevThisTurn:this.playedDevThisTurn,freeRoads:this.freeRoads,discardQueue:this.discardQueue.map(n=>({...n})),stealCandidates:[...this.stealCandidates],longestRoad:{...this.longestRoad},largestArmy:{...this.largestArmy},winner:this.winner,lastAction:this.lastAction,lastRoll:this.lastRoll,lastSteal:this.lastSteal,lastTrade:this.lastTrade,afterRobber:this.afterRobber,robberHex:this.board.robberHex,buildings:e,roads:t}}applySnapshot(e){if(!e)return this;if(this.seed!==e.seed||this.playerCount!==e.playerCount){const t=xr.fromSnapshot(e);this.seed=t.seed,this.rand=t.rand,this.board=t.board,this.playerCount=t.playerCount}return Fd(this,e),this}static fromSnapshot(e){const t=new xr({playerCount:e.playerCount,solo:!1,seed:e.seed});return Fd(t,e),t}}function Fd(i,e){i.players=e.players.map(t=>({...t,resources:{...t.resources},roads:[...t.roads],settlements:[...t.settlements],cities:[...t.cities],devCards:(t.devCards||[]).map(n=>({...n}))})),i.bank={...e.bank},i.devDeck=[...e.devDeck||[]],i.current=e.current,i.setupIndex=e.setupIndex,i.phase=e.phase,i.dice=[...e.dice||[0,0]],i.log=[...e.log||[]],i.playedDevThisTurn=!!e.playedDevThisTurn,i.freeRoads=e.freeRoads||0,i.discardQueue=(e.discardQueue||[]).map(t=>({...t})),i.stealCandidates=[...e.stealCandidates||[]],i.longestRoad={...e.longestRoad},i.largestArmy={...e.largestArmy},i.winner=e.winner??null,i.lastAction=e.lastAction??null,i.lastRoll=e.lastRoll??null,i.lastSteal=e.lastSteal??null,i.lastTrade=e.lastTrade??null,i.afterRobber=e.afterRobber||F.MAIN;for(const t of i.board.vertices.values())t.building=null;for(const t of i.board.edges.values())t.road=null;for(const t of e.buildings||[]){const n=i.board.vertices.get(t.id);n&&(n.building={player:t.player,type:t.type})}for(const t of e.roads||[]){const n=i.board.edges.get(t.id);n&&(n.road=t.player)}e.robberHex&&(i.board.robberHex=e.robberHex)}function fS(i){return $e.reduce((e,t)=>e+i.resources[t],0)}function Ba(i,e){const t={};for(const[n,s]of Object.entries(e)){const r=s-(i[n]||0);r>0&&(t[n]=r)}return t}function Bd(i){return $e.map(e=>i.resources[e]).join(",")+`:${i.roads.length}:${i.settlements.length}:${i.cities.length}`}function Tp(i){var t;const e=i.player();if(i.phase===F.GAME_OVER||i.phase!==F.DISCARD&&!e.isAI)return!1;if(i.phase===F.SETUP_SETTLEMENT)return i.placeSettlement(i.suggestSetupVertex(e.id),e.id);if(i.phase===F.SETUP_ROAD){const n=i.validRoads(e.id,{setup:!0}),s=n.map(r=>{const o=i.board.edges.get(r),a=o.a===e.lastSettlement?o.b:o.a;return{eid:r,s:Ui(i.board,a)}});return s.sort((r,o)=>o.s-r.s),i.placeRoad(((t=s[0])==null?void 0:t.eid)||n[0],e.id)}if(i.phase===F.DISCARD){const n=i.discardQueue.find(c=>i.player(c.player).isAI);if(!n)return!1;const s=i.player(n.player),r={wood:0,brick:0,sheep:0,wheat:0,ore:0},o=[];for(const c of $e){const l=s.resources[c]|0;for(let h=0;h<l;h++)o.push(c)}o.sort((c,l)=>(s.resources[l]|0)-(s.resources[c]|0));let a=n.must;for(const c of o){if(a<=0)break;r[c]+=1,a-=1}return a>0?!1:i.discard(s.id,r)}if(i.phase===F.ROBBER)return i.moveRobber(xS(i,e.id),e.id);if(i.phase===F.STEAL){const n=i.stealCandidates.slice().sort((s,r)=>i.publicVP(i.player(r))-i.publicVP(i.player(s)))[0];return i.steal(n,e.id)}if(i.phase===F.FREE_ROADS){const n=i.validRoads(e.id,{free:!0});return n.length?i.placeRoad(Ap(i,e.id,n),e.id):(i.freeRoads=0,i.phase=F.MAIN,!0)}if(i.phase===F.PLENTY){const n=pS(i,e);return i.yearOfPlenty(n[0],n[1]||n[0],e.id)}if(i.phase===F.MONOPOLY){const n=$e.slice().sort((s,r)=>Bl(i,e.id,r)-Bl(i,e.id,s))[0];return i.monopoly(n,e.id)}if(i.phase===F.ROLL){const n=e.devCards.find(r=>r.playable&&r.type===bt.KNIGHT),s=wp(i,e.id);return n&&(s||e.knightsPlayed===2)?(i.playDev(n.id),!0):!!i.roll()}if(i.phase===F.MAIN){for(let n=0;n<8;n++){const s=Bd(e);if(gS(i,e),kd(i,e),i.phase!==F.MAIN)return!0;if(Bd(e)===s)break}return mS(i,e),i.phase!==F.MAIN?!0:(kd(i,e),i.endTurn())}return!1}function Bl(i,e,t){return i.players.reduce((n,s)=>n+(s.id===e?0:s.resources[t]),0)}function pS(i,e){const t=[mt.city,mt.settlement,mt.dev,mt.road],n=Object.fromEntries($e.map(s=>[s,0]));for(const s of t)for(const[r,o]of Object.entries(Ba(e.resources,s)))n[r]+=o;return $e.slice().sort((s,r)=>n[r]-n[s])}function kd(i,e){if(i.canAfford(e.id,"city")){const t=i.validCities(e.id).sort((n,s)=>Ui(i.board,s)-Ui(i.board,n));t[0]&&i.placeCity(t[0],e.id)}if(i.canAfford(e.id,"settlement")){const t=i.validSettlements(e.id).sort((n,s)=>Ui(i.board,s)-Ui(i.board,n));t[0]&&i.placeSettlement(t[0],e.id)}if(i.canAfford(e.id,"road")){const t=i.validRoads(e.id),n=i.validSettlements(e.id).length===0&&e.settlements.length<5;t.length&&(n||e.roads.length<3||i.roadLength(e.id)<5)&&i.placeRoad(Ap(i,e.id,t),e.id)}}function mS(i,e){const t=e.devCards.find(a=>a.playable&&a.type===bt.KNIGHT);t&&(wp(i,e.id)||e.knightsPlayed>=2)&&i.playDev(t.id);const n=e.devCards.find(a=>a.playable&&a.type===bt.PLENTY);n&&Object.keys(Ba(e.resources,mt.settlement)).length&&i.playDev(n.id);const s=e.devCards.find(a=>a.playable&&a.type===bt.MONOPOLY);s&&$e.some(a=>Bl(i,e.id,a)>=3)&&i.playDev(s.id);const r=e.devCards.find(a=>a.playable&&a.type===bt.ROAD);r&&i.validSettlements(e.id).length===0&&i.playDev(r.id);const o=e.settlements.length<5&&_S(e.resources,mt.settlement)<=2;i.canAfford(e.id,"dev")&&!o&&fS(e)>=6&&i.devDeck.length&&i.buyDev(e.id)}function gS(i,e){const t=[];e.cities.length<4&&e.settlements.length&&t.push(mt.city),e.settlements.length<5&&t.push(mt.settlement),t.push(mt.road,mt.dev);for(const n of t){if(Fl(e.resources,n))continue;const s=Ba(e.resources,n);for(const r of Object.keys(s))for(const o of $e){if(o===r)continue;const a=i.tradeRate(e,o);if(!((e.resources[o]||0)<a||i.bank[r]<1)&&!(e.resources[o]-a<(n[o]||0)))return i.bankTrade(e.id,o,r),!0}}return!1}function _S(i,e){return Object.values(Ba(i,e)).reduce((t,n)=>t+n,0)}function yS(i){const e=[];for(const t of i.board.vertices.values())t.building||t.hexes.some(n=>i.board.hexes.get(n).isLand)&&(t.neighbors.some(n=>i.board.vertices.get(n).building)||e.push(t));return e.sort((t,n)=>Ui(i.board,n.id)-Ui(i.board,t.id)),e}function Ap(i,e,t){const n=yS(i)[0];if(!n)return t[0];let s=t[0],r=1e9;for(const o of t){const a=i.board.edges.get(o),c=i.board.vertices.get(a.a),l=i.board.vertices.get(a.b),h=Math.min(Math.hypot(c.x-n.x,c.z-n.z),Math.hypot(l.x-n.x,l.z-n.z));h<r&&(r=h,s=o)}return s}function wp(i,e){var n;const t=i.board.robberHex;for(const s of i.board.vertices.values())if(((n=s.building)==null?void 0:n.player)===e&&s.hexes.includes(t))return!0;return!1}function xS(i,e){let t=null,n=-999;for(const s of i.board.land){if(s.id===i.board.robberHex||s.resource==="desert")continue;let r=s.number?6-Math.abs(7-s.number):0,o=!1,a=!1;for(const c of i.board.vertices.values())if(!(!c.building||!c.hexes.includes(s.id)))if(c.building.player===e)o=!0;else{r+=2+i.publicVP(i.player(c.building.player));const l=Math.max(...i.players.map(h=>i.publicVP(h)));i.publicVP(i.player(c.building.player))===l&&(a=!0)}o&&(r-=8),a&&(r+=3),r>n&&(n=r,t=s.id)}return t||i.board.land.find(s=>s.id!==i.board.robberHex).id}function vS(i=typeof navigator<"u"?navigator.userAgent:""){var e;return typeof navigator<"u"&&((e=navigator.userAgentData)!=null&&e.mobile)?!0:/Quest|Oculus|OculusBrowser|Mobile VR|Android|Apple Vision|iPhone|iPad/i.test(i||"")}const Mn=vS(),MS=typeof devicePixelRatio=="number"?devicePixelRatio:1,Ae={headset:Mn,antialias:!Mn,pixelRatio:Mn?1:Math.min(MS,2),framebufferScale:1,shadows:!Mn,shadowSoft:!Mn,shadowSize:Mn?512:1024,xrShadows:!1,xrShadowSize:512,roomWood:512,floorWood:512,feltSize:Mn?128:256,claySize:Mn?256:512,numberSize:256,harborLabel:256,trayScale:Mn?.5:1,helpW:512,helpH:Mn?128:256,floatW:512,floatH:128,avatarLabelW:256,avatarLabelH:96,handleLabelW:256,handleLabelH:64,tableSegments:Mn?16:24,rugSegments:Mn?16:24,tokenSegments:12,harborDiscSegments:8,harborRingSegments:8,chipSegments:12,anisotropy:Mn?1:4};function Jt(i){return i&&(i.userData.shared=!0),i}function bS(i,{keepShared:e=!0}={}){i&&i.traverse(t=>{var s,r;t.geometry&&!(e&&((s=t.geometry.userData)!=null&&s.shared))&&t.geometry.dispose();const n=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(const o of n)if(o){for(const a of["map","alphaMap","aoMap","bumpMap","normalMap","emissiveMap"]){const c=o[a];c!=null&&c.dispose&&!(e&&((r=c.userData)!=null&&r.shared))&&c.dispose()}o.dispose()}})}function kl(i,e){if(i)for(const t of[...i.children])bS(t,e),i.remove(t)}function SS(i,e,{enabled:t,size:n}){if(i.shadowMap.enabled=!!t,!e)return;e.castShadow=!!t;const s=Math.max(128,n||512);(e.shadow.mapSize.x!==s||e.shadow.mapSize.y!==s)&&(e.shadow.mapSize.set(s,s),e.shadow.map&&(e.shadow.map.dispose(),e.shadow.map=null))}function ES(){return Ae.shadowSoft?Lf:ih}function Rp(i,e,t,n){const s=i.createImageData(e,t);for(let r=0;r<t;r++)for(let o=0;o<e;o++){const a=(r*e+o)*4,[c,l,h]=n(o,r);s.data[a]=c,s.data[a+1]=l,s.data[a+2]=h,s.data[a+3]=255}i.putImageData(s,0,0)}function Hl(i,e){const t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function Ta(i=512,e=512,t=[120,72,38]){const n=document.createElement("canvas");n.width=i,n.height=e;const s=n.getContext("2d");Rp(s,i,e,(o,a)=>{const c=Math.sin(o*.08+Hl(o,a)*3)*18,l=Math.sin((o*.35+a*.02)*.2)*10,h=Hl(o*.5,a*2)*22;return t.map(u=>Math.max(0,Math.min(255,u+c+l+h-20)))});const r=new Us(n);return r.wrapS=r.wrapT=ds,r.colorSpace=Dt,r.anisotropy=Ae.anisotropy,Jt(r)}function Cp(i=[22,70,92],e=Ae.feltSize){const t=document.createElement("canvas");t.width=t.height=e;const n=t.getContext("2d");Rp(n,e,e,(r,o)=>{const a=(Hl(r,o)-.5)*18;return i.map(c=>Math.max(0,Math.min(255,c+a)))});const s=new Us(t);return s.wrapS=s.wrapT=ds,s.colorSpace=Dt,s.anisotropy=Ae.anisotropy,Jt(s)}function Sh(i){return i.generateMipmaps=!1,i.minFilter=Gt,i.magFilter=Gt,i.anisotropy=Ae.anisotropy,i.colorSpace=Dt,i.needsUpdate=!0,i}function TS(i,e,t){const n=[];for(const s of String(e).split(`
`)){const r=s.split(/\s+/).filter(Boolean);if(!r.length){n.push("");continue}let o=r[0];for(let a=1;a<r.length;a++){const c=`${o} ${r[a]}`;i.measureText(c).width>t?(n.push(o),o=r[a]):o=c}n.push(o)}return n}function Pp(i,e,{fill:t="#f3e2c4",ink:n="#2a1c12",width:s,height:r,font:o=72,pad:a=40}={}){const c=s||i.canvas.width,l=r||i.canvas.height;i.setTransform(1,0,0,1,0,0),i.imageSmoothingEnabled=!0,i.imageSmoothingQuality="high",i.fillStyle=t,i.fillRect(0,0,c,l),i.fillStyle=n,i.textAlign="center",i.textBaseline="middle";const h=Math.max(32,c-a*2);let u=o;const d=g=>(i.font=`700 ${g}px Trebuchet MS, Segoe UI, sans-serif`,TS(i,e,h));let p=d(u);for(;u>28;){const g=p.some(m=>i.measureText(m).width>h),_=p.length*u*1.12>l-a;if(!g&&!_)break;u-=4,p=d(u)}p.forEach((g,_)=>{i.fillText(g,c/2,l/2+(_-(p.length-1)/2)*u*1.12)})}function Pr(i,{fill:e="#f3e2c4",ink:t="#2a1c12",size:n,width:s=512,height:r=256,font:o=72,pad:a=40}={}){const c=n||s,l=n||r,h=document.createElement("canvas");return h.width=c,h.height=l,Pp(h.getContext("2d"),i,{fill:e,ink:t,width:c,height:l,font:o,pad:a}),Sh(new Us(h))}function AS(i,e,t={}){var s;const n=i==null?void 0:i.image;return n!=null&&n.getContext?(Pp(n.getContext("2d"),e,{...t,width:n.width,height:n.height}),i.needsUpdate=!0,i):((s=i==null?void 0:i.dispose)==null||s.call(i),Pr(e,t))}const Hd=new Map;function wS(i,e){const t=Ae.numberSize,n=e||1,s=`${i}:${n}:${t}`,r=Hd.get(s);if(r)return r;const o=document.createElement("canvas");o.width=o.height=t;const a=o.getContext("2d"),c=t/512;a.clearRect(0,0,t,t),a.fillStyle="#f4e6c6",a.beginPath(),a.arc(256*c,256*c,236*c,0,Math.PI*2),a.fill(),a.strokeStyle="#5b3418",a.lineWidth=14*c,a.stroke(),a.fillStyle=i===6||i===8?"#b42318":"#2a1c12",a.font=`700 ${Math.round(220*c)}px Trebuchet MS, Segoe UI, sans-serif`,a.textAlign="center",a.textBaseline="middle",a.fillText(String(i),256*c,236*c),a.fillStyle=i===6||i===8?"#b42318":"#4a3724";const l=(n-1)*28*c;for(let u=0;u<n;u++)a.beginPath(),a.arc(256*c-l/2+u*28*c,396*c,10*c,0,Math.PI*2),a.fill();const h=Jt(Sh(new Us(o)));return Hd.set(s,h),h}const zd=new Map;function RS(i){const e=zd.get(i);if(e)return e;const t=document.createElement("canvas");t.width=t.height=128;const n=t.getContext("2d");n.fillStyle="#f7f0e4",n.fillRect(0,0,128,128),n.strokeStyle="#5b3418",n.lineWidth=6,n.strokeRect(3,3,122,122),n.fillStyle="#2a1c12";const s={1:[[64,64]],2:[[36,36],[92,92]],3:[[36,36],[64,64],[92,92]],4:[[36,36],[92,36],[36,92],[92,92]],5:[[36,36],[92,36],[64,64],[36,92],[92,92]],6:[[36,36],[92,36],[36,64],[92,64],[36,92],[92,92]]};for(const[o,a]of s[i])n.beginPath(),n.arc(o,a,10,0,Math.PI*2),n.fill();const r=Jt(Sh(new Us(t)));return zd.set(i,r),r}const Vd=11,Gd=6;function CS(i){const e=Ta(Ae.roomWood,Ae.roomWood/2,[110,64,32]);e.repeat.set(2,2);const t=Ta(Ae.floorWood,Ae.floorWood,[78,48,28]);t.repeat.set(8,8);const n=Cp([62,52,42]),s=new Je;s.name="room",i.add(s);const r=new ie(new bn(10,10),new nt({map:t,roughness:.9}));r.rotation.x=-Math.PI/2,r.receiveShadow=!0,s.add(r);const o=3.2,a=7,c=.12,l=3.4,h=new nt({map:n,color:"#6d5a48",roughness:.95,depthWrite:!0,transparent:!1}),u=[[0,o/2,-l,0],[0,o/2,l,Math.PI],[-l,o/2,0,Math.PI/2],[l,o/2,0,-Math.PI/2]];for(const[A,C,w,v]of u){const y=new ie(new wt(a,o,c),h);y.position.set(A,C,w),y.rotation.y=v,y.receiveShadow=!0,s.add(y)}const d=new ie(new wt(a,c,a),h);d.name="ceiling",d.position.set(0,o+c/2,0),d.receiveShadow=!0,s.add(d);const p=new ie(new wt(9.2,o+.5,9.2),new ot({color:"#1b140f",side:mn,depthWrite:!0,transparent:!1,fog:!1}));p.name="sky",p.position.y=o/2+.05,s.add(p);const g=new ie(new Qt(.95,.98,.08,Ae.tableSegments),new nt({map:e,color:"#7a4a28",roughness:.65}));g.position.y=En-.04,g.castShadow=!0,g.receiveShadow=!0,i.add(g);const _=new ie(new Qt(.18,.2,En-.08,12),new nt({map:e,color:"#5a3218",roughness:.8}));_.position.y=(En-.08)/2,i.add(_);const m=new ie(new _o(1.35,Ae.rugSegments),new nt({color:"#4a1f1a",roughness:1}));m.rotation.x=-Math.PI/2,m.position.y=.01,s.add(m);const f=new bM("#f4ead8","#4a3424",1.05);s.add(f);const b=new _p("#ffe6c0",1.7);b.position.set(2.4,4.2,1.6),b.castShadow=Ae.shadows,b.shadow.mapSize.set(Ae.shadowSize,Ae.shadowSize),b.shadow.camera.near=.5,b.shadow.camera.far=12,b.shadow.camera.left=b.shadow.camera.bottom=-3,b.shadow.camera.right=b.shadow.camera.top=3,s.add(b);const S=new gp("#ffcc88",Vd,Gd);S.name="boardLamp",S.position.set(0,2.1,0),i.add(S);function x(A=i.scale.x){const C=Math.max(1e-4,A);S.intensity=Vd*C*C,S.distance=Gd*C}x();const P=new ie(new ao(.18,.015,6,12),new nt({color:"#c9a44a",metalness:.7,roughness:.3}));return P.rotation.x=Math.PI/2,P.position.y=2.05,s.add(P),{table:g,room:s,sun:b,lamp:S,syncBoardLight:x}}const Kn=.036,Wd="#efe0bc",PS="#f4d27a",LS="#fff6dc";function ra(i,e,t=0){const n=Math.sin(i*12.9898+e*78.233+t*3.1)*43758.5453;return n-Math.floor(n)}function DS(i=1){const e=new Je,t=new ie(new Qt(.005,.007,.018,5),new nt({color:"#5a3418",roughness:.9}));t.position.y=.009;const n=new ie(new Ar(.02*i,.038*i,6),new nt({color:"#1f5a2c",roughness:.8}));return n.position.y=.026*i,e.add(t,n),e}function IS(){const i=new Je,e=new ie(new Zt(.016,8,6),new nt({color:"#f2f0e8",roughness:.95}));e.scale.set(1.3,.9,1),e.position.y=.016;const t=new ie(new Zt(.008,6,6),new nt({color:"#2a1c12"}));return t.position.set(.018,.018,0),i.add(e,t),i}function NS(){const i=new nt({color:"#3d7a3a",roughness:.7}),e=new Je,t=new ie(new Qt(.008,.01,.05,6),i);t.position.y=.025;const n=new ie(new Qt(.006,.006,.03,6),i);return n.rotation.z=Math.PI/2,n.position.set(.015,.03,0),e.add(t,n),e}class US{constructor(e){this.group=new Je,this.group.position.y=En,e.add(this.group),this.hexMeshes=new Map,this.tokenMeshes=new Map,this.vertexMarkers=new Map,this.edgeMarkers=new Map,this.hexMarkers=new Map,this.pieceLayer=new Je,this.markerLayer=new Je,this.group.add(this.pieceLayer,this.markerLayer),this.robber=null,this.hoverObj=null,this._flashTimer=0,this.felt=Cp([48,110,255]),this.wood=Ta(Ae.claySize,Ae.claySize),this.clay=Ta(Ae.claySize,Ae.claySize,[176,158,132]),this.seaGeo=Jt(new Qt(Ci*.98,Ci*.98,.02,6)),this.landGeo=Jt(new Qt(Ci*.96,Ci*.96,Kn,6)),this.tokenGeo=Jt(new Qt(.038,.038,.004,Ae.tokenSegments)),this.hexGlowGeo=Jt(new Qt(Ci*.9,Ci*.9,.004,6)),this.harborDiscGeo=Jt(new Qt(.018,.018,.004,Ae.harborDiscSegments)),this.harborRingGeo=Jt(new ao(.024,.0036,6,Ae.harborRingSegments)),this.harborHaloGeo=Jt(new ao(.03,.0022,6,Ae.harborRingSegments)),this.pinGeo=Jt(new Zt(.018,8,6)),this.pinPickGeo=Jt(new Zt(.028,8,6)),this.harborTex=new Map}rebuild(e){this.restoreHover(this.hoverObj),this.hoverObj=null,kl(this.group),this.pieceLayer=new Je,this.markerLayer=new Je,this.group.add(this.pieceLayer,this.markerLayer),this.hexMeshes.clear(),this.tokenMeshes.clear(),this.vertexMarkers.clear(),this.edgeMarkers.clear(),this.hexMarkers.clear();const t=new nt({map:this.felt,color:"#6aaee6",roughness:.96,metalness:0,emissive:"#1568d4",emissiveIntensity:.06});for(const s of e.sea){const r=new ie(this.seaGeo,t);r.rotation.y=Math.PI/3,r.position.set(s.x,.01,s.z),r.receiveShadow=!0,this.group.add(r)}for(const s of e.land){const r=Kn,o=new nt({map:this.clay,color:Ln[s.resource],roughness:1,metalness:0,envMapIntensity:0}),a=new ie(this.landGeo,o);if(a.rotation.y=Math.PI/3,a.position.set(s.x,r/2,s.z),a.castShadow=!0,a.receiveShadow=!0,a.userData={kind:"hex",id:s.id},this.group.add(a),this.hexMeshes.set(s.id,a),this.decorate(s,r),s.number){const l=new ie(this.tokenGeo,new nt({map:wS(s.number,Sp[s.number]),roughness:.45}));l.position.set(s.x,r+.0022,s.z),l.renderOrder=2,l.userData={kind:"hex",id:s.id},this.group.add(l),this.tokenMeshes.set(s.id,l)}const c=new ie(this.hexGlowGeo,new ot({color:"#ffcc66",transparent:!0,opacity:0}));c.rotation.y=Math.PI/3,c.position.set(s.x,r+.01,s.z),c.userData={kind:"hex",id:s.id},this.markerLayer.add(c),this.hexMarkers.set(s.id,c)}const n=new ot({color:16761856,transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1,toneMapped:!1});for(const s of e.vertices.values()){const r=new Je,o=new ie(this.pinGeo,n.clone());o.position.y=.018;const a=new ie(this.pinPickGeo,new ot({color:16761856,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1}));a.position.y=.018,r.add(o,a),r.position.set(s.x,Kn,s.z),r.visible=!1,r.frustumCulled=!1,r.userData={kind:"vertex",id:s.id},r.traverse(c=>{c.frustumCulled=!1,c.renderOrder=30,c.userData=r.userData}),a.userData={...r.userData,pickOnly:!0},this.group.add(r),this.vertexMarkers.set(s.id,r)}for(const s of e.edges.values()){const r=e.vertices.get(s.a),o=e.vertices.get(s.b),a=Math.hypot(o.x-r.x,o.z-r.z),c=new ie(new wt(.018,.014,Math.max(.036,a*.54)),new ot({color:"#9ee7ff",transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1}));c.position.set((r.x+o.x)/2,Kn+.01,(r.z+o.z)/2),c.rotation.y=Math.atan2(o.x-r.x,o.z-r.z),c.renderOrder=4,c.visible=!1,c.userData={kind:"edge",id:s.id,waterOnly:!s.touchesLand},this.markerLayer.add(c),this.edgeMarkers.set(s.id,c)}for(const s of e.harbors)this.addHarbor(e,s);this.robber=this.makeRobber(),this.group.add(this.robber),this.setRobber(e)}addHarbor(e,t){const n=(t.vertices||[]).map(x=>e.vertices.get(x)).filter(Boolean);if(!n.length){const x=e.edges.get(t.edge);if(x){const P=e.vertices.get(x.a),A=e.vertices.get(x.b);P&&n.push(P),A&&n.push(A)}}if(!n.length)return;const s=n.reduce((x,P)=>x+P.x,0)/n.length,r=n.reduce((x,P)=>x+P.z,0)/n.length,o=Math.hypot(s,r)||1,a=s/o,c=r/o,l=s+a*.1,h=r+c*.1,u=.078,d=new nt({map:this.wood,color:"#8a5a32"}),p=Oc(PS,.98,!0),g=Oc(LS,.9,!0),_=Oc(Wd,.7,!0),m=new ie(new wt(.046,.008,.11),d);m.position.set((l+s)*.5,.021,(h+r)*.5),OS(m,l,.021,h,s,.021,r);const f=new ie(new wt(.044,.005,.09),d);f.position.set(l,.028,h),f.lookAt(new D(s,.028,r));const b=new ie(new Qt(.004,.005,.055,8),d);b.position.set(l,.05,h);const S=new ie(new bn(.072,.072),new ot({map:this.harborLabel(t),depthWrite:!1,side:tn}));S.position.set(l,u,h),S.lookAt(new D(s,.38,r)),S.renderOrder=8,this.group.add(m,f,b,S);for(const x of n){const P=a*.012,A=c*.012,C=Kn+.0016,w=new ie(this.harborDiscGeo,p);w.position.set(x.x+P,C,x.z+A),w.renderOrder=1;const v=new ie(this.harborRingGeo,g);v.rotation.x=Math.PI/2,v.position.set(x.x+P,C+6e-4,x.z+A),v.renderOrder=1;const y=new ie(this.harborHaloGeo,_);y.rotation.x=Math.PI/2,y.position.set(x.x+P,C+.001,x.z+A),y.renderOrder=1,this.group.add(w,v,y)}}harborLabel(e){const t=rt[e.type]||e.type,n=e.type==="generic"?"3:1":`2:1
${t}`;let s=this.harborTex.get(n);return s||(s=Jt(Pr(n,{width:Ae.harborLabel,height:Ae.harborLabel,font:110,fill:Wd})),this.harborTex.set(n,s),s)}decorate(e,t){const n=t,s=(r,o,a=.082,c=.104)=>{const l=r/o*Math.PI*2+ra(e.q,e.r,r+11)*.28,h=a+ra(e.q,e.r,r+4)*(c-a);return{x:e.x+Math.cos(l)*h,z:e.z+Math.sin(l)*h}};if(e.resource==="wood")for(let r=0;r<5;r++){const o=DS(.7+ra(e.q,e.r,r)*.25),a=s(r,5,.084,.105);o.position.set(a.x,n,a.z),o.traverse(c=>{c.isMesh&&(c.castShadow=!0)}),this.group.add(o)}else if(e.resource==="sheep")for(let r=0;r<3;r++){const o=IS(),a=s(r,3,.082,.1);o.position.set(a.x,n,a.z),o.rotation.y=ra(e.q,e.r,r+2)*Math.PI*2,this.group.add(o)}else if(e.resource==="wheat"){const r=new nt({color:"#c9a227",roughness:.8});for(let o=0;o<6;o++){const a=o<3?-1:1,c=o%3,l=new ie(new wt(.028,.016,.008),r);l.position.set(e.x+a*.08,n+.008,e.z+(c-1)*.022),l.rotation.y=.15*a,this.group.add(l)}}else if(e.resource==="ore"){const r=new nt({color:"#8b909a",roughness:.7});for(let o=0;o<3;o++){const a=new ie(new Ar(.02+o*.004,.028+o*.008,5),r),c=s(o,3,.084,.1);a.position.set(c.x,n+.012,c.z),a.castShadow=!0,this.group.add(a)}}else if(e.resource==="brick"){const r=new nt({color:"#9a4a2c",roughness:.9});for(let o=0;o<4;o++){const a=new ie(new wt(.032,.012,.02),r),c=s(o,4,.082,.1);a.position.set(c.x,n+.008,c.z),a.rotation.y=o*.4,this.group.add(a)}}else if(e.resource==="desert"){const r=NS(),o=s(0,1,.08,.09);r.position.set(o.x,n,o.z),this.group.add(r)}}makeRobber(){const e=new Je,t=new nt({color:"#1a1a1e",roughness:.45,metalness:.2}),n=new ie(new Qt(.016,.022,.05,8),t);n.position.y=.03;const s=new ie(new Zt(.016,10,8),t);s.position.y=.062;const r=new ie(new Qt(.024,.024,.004,10),t);return r.position.y=.07,e.add(n,s,r),e.traverse(o=>{o.isMesh&&(o.castShadow=!0)}),e}setRobber(e){const t=e.hexes.get(e.robberHex),n=this.hexMeshes.get(t.id),s=n?n.position.y*2:.04;this.robber.position.set(t.x-.04,s,t.z+.02)}syncPieces(e){kl(this.pieceLayer);for(const t of e.board.edges.values()){if(!t.road&&t.road!==0||t.road==null)continue;const n=e.players[t.road],s=e.board.vertices.get(t.a),r=e.board.vertices.get(t.b),o=Math.hypot(r.x-s.x,r.z-s.z),a=new ie(new wt(.016,.012,o*.78),new nt({color:n.color,roughness:.5}));a.position.set((s.x+r.x)/2,Kn+.007,(s.z+r.z)/2),a.rotation.y=Math.atan2(r.x-s.x,r.z-s.z),a.castShadow=!0,this.pieceLayer.add(a)}for(const t of e.board.vertices.values()){if(!t.building)continue;const n=e.players[t.building.player];this.pieceLayer.add(t.building.type==="city"?BS(t,n.color):FS(t,n.color))}this.setRobber(e.board)}showVertices(e){this.restoreHover(this.hoverObj);const t=new Set(e);for(const[n,s]of this.vertexMarkers)s.visible=t.has(n),s.scale.setScalar(1);this.repaintHover()}pulseMarkers(e){const t=1+Math.sin(e*5)*.12;for(const n of this.vertexMarkers.values())n.visible&&n.scale.setScalar(n===this.hoverObj?t*1.2:t)}showEdges(e){this.restoreHover(this.hoverObj);const t=new Set(e),n=e.length>0;for(const[s,r]of this.edgeMarkers){const o=t.has(s);r.material.opacity=o?.8:0,r.visible=o||n&&r.userData.waterOnly}this.repaintHover()}showHexes(e){this.restoreHover(this.hoverObj);for(const[t,n]of this.hexMarkers)n.material.opacity=e.includes(t)?.45:0,n.visible=e.includes(t);this.repaintHover()}clearHighlights(){this.showVertices([]),this.showEdges([]),this.showHexes([])}setHover(e){const t=this.hoverTarget(e);t!==this.hoverObj&&(this.restoreHover(this.hoverObj),this.hoverObj=t,this.paintHover(t,!1))}flashPick(e){const t=this.hoverTarget(e)||this.hoverObj;t&&(t!==this.hoverObj&&(this.restoreHover(this.hoverObj),this.hoverObj=t),this.paintHover(t,!0),clearTimeout(this._flashTimer),this._flashTimer=setTimeout(()=>{this.hoverObj===t&&(this.restoreHover(t),this.paintHover(t,!1))},120))}hoverTarget(e){if(!e)return null;const{kind:t,id:n}=e.userData||{};if(t==="vertex"){const s=this.vertexMarkers.get(n);return s!=null&&s.visible?s:null}if(t==="edge"){const s=this.edgeMarkers.get(n);return s!=null&&s.visible&&s.material.opacity>0?s:null}if(t==="hex"){const s=this.hexMarkers.get(n);return s!=null&&s.visible&&s.material.opacity>0?s:null}return null}markerMats(e){const t=[];return e.traverse(n=>{var s;(s=n.userData)!=null&&s.pickOnly||n.material&&!t.includes(n.material)&&t.push(n.material)}),t}restoreHover(e){if(!e)return;const t=e.userData._hoverRest;if(t){for(const n of t)n.mat.color.setHex(n.color),n.mat.opacity=n.opacity;e.userData._hoverRest=null}}paintHover(e,t){if(!e)return;const n=this.markerMats(e);e.userData._hoverRest||(e.userData._hoverRest=n.map(r=>({mat:r,color:r.color.getHex(),opacity:r.opacity})));const s=e.userData.kind;for(const r of n)t?(r.color.set("#ffffff"),r.opacity=1):s==="vertex"?(r.color.set("#fff6c8"),r.opacity=1):s==="edge"?(r.color.set("#f4ffff"),r.opacity=1):(r.color.set("#ffe9a0"),r.opacity=.88)}repaintHover(){const e=this.hoverObj;if(e){if(!this.hoverTarget(e)){this.hoverObj=null;return}this.paintHover(e,!1)}}}function Oc(i,e=1,t=!1){return new ot({color:i,transparent:e<1,opacity:e,depthTest:t,depthWrite:!1,toneMapped:!1})}function OS(i,e,t,n,s,r,o){const a=s-e,c=r-t,l=o-n,h=Math.hypot(a,c,l)||1;i.quaternion.setFromUnitVectors(new D(0,0,1),new D(a/h,c/h,l/h))}function FS(i,e){const t=new Je,n=new nt({color:e,roughness:.45}),s=new ie(new wt(.032,.024,.028),n);s.position.y=Kn+.012;const r=new ie(new Ar(.026,.022,4),new nt({color:"#3b2414",roughness:.7}));return r.position.y=Kn+.034,r.rotation.y=Math.PI/4,t.add(s,r),t.position.set(i.x,0,i.z),t.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.renderOrder=3)}),t}function BS(i,e){const t=new Je,n=new nt({color:e,roughness:.4}),s=new ie(new wt(.04,.04,.036),n);s.position.y=Kn+.02;const r=new ie(new wt(.018,.055,.018),n);r.position.set(.016,Kn+.03,.01);const o=new ie(new Ar(.016,.02,4),new nt({color:"#3b2414"}));return o.position.set(.016,Kn+.068,.01),t.add(s,r,o),t.position.set(i.x,0,i.z),t.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.renderOrder=3)}),t}const Xd=new D;class kS{constructor(e,t){this.rig=t,this.group=new Je,e.add(this.group),this.left=$d("#4db3ff","GRAB"),this.right=$d("#f0c14b","GRAB"),this.stuck=new Map,this.linkGeo=new sn().setFromPoints([new D,new D(0,0,1)]),this.link=new go(this.linkGeo,new Oa({color:16770736,transparent:!0,opacity:.7})),this.link.visible=!1,this.group.add(this.left,this.right,this.link),this.group.visible=!1,this._pulse=0}get move(){return this.left}get scale(){return this.right}pickables(){return this.group.visible?[this.left,this.right]:[]}setVisible(e){this.group.visible=e,e||this.stuck.clear()}stick(e,t){this.stuck.set(e,t)}unstick(e){this.stuck.delete(e)}isStuck(e){return this.stuck.has(e)}setHover(e){var n;const t=(n=e==null?void 0:e.userData)==null?void 0:n.handleRoot;for(const s of[this.left,this.right]){const r=t===s||this.stuck.has(s);s.userData.halo.material.opacity=r?.5:.2,s.userData.ball.material.color.set(r?"#ffffff":s.userData.baseColor)}}update(e,t,n){if(!this.group.visible)return;this._pulse+=e;const s=.72+Math.sin(this._pulse*2.4)*.1;this.left.userData.ball.material.opacity=s,this.right.userData.ball.material.opacity=s,this.rig.updateMatrixWorld();for(const[r,o]of[[this.left,[-.18,En-.05,1.08]],[this.right,[.18,En-.05,1.08]]]){const a=this.stuck.get(r);a&&n?n(a,r.position):a?a.getWorldPosition(r.position):HS(r,this.rig,o[0],o[1],o[2]),r.userData.tag.lookAt(t.position)}if(this.stuck.size===2){const r=this.linkGeo.attributes.position;r.setXYZ(0,this.left.position.x,this.left.position.y,this.left.position.z),r.setXYZ(1,this.right.position.x,this.right.position.y,this.right.position.z),r.needsUpdate=!0,this.link.visible=!0}else this.link.visible=!1}}function HS(i,e,t,n,s){Xd.set(t,n,s).applyMatrix4(e.matrixWorld),i.position.copy(Xd)}function $d(i,e){const t=new Je,n=new ie(new Zt(.03,12,10),new ot({color:i,transparent:!0,opacity:.88})),s=new ie(new Zt(.046,10,8),new ot({color:i,transparent:!0,opacity:.22,depthWrite:!1})),r=new ie(new bn(.11,.04),new ot({map:Pr(e,{width:Ae.handleLabelW,height:Ae.handleLabelH,font:120,fill:"#1a120c",ink:"#f7efe0"}),transparent:!0}));r.position.y=.058;const o=new ie(new Zt(.09,8,6),new ot({transparent:!0,opacity:0,depthWrite:!1}));t.add(n,s,r,o);const a={kind:"handle",handleRoot:t,ball:n,halo:s,tag:r,baseColor:i};return t.userData=a,t.traverse(c=>{c.isMesh&&(c.userData=a)}),t}const Fc=.82;class zS{constructor(e){this.group=new Je,this.group.position.set(0,En+.045,Fc),e.add(this.group),this.dice=[Yd(),Yd()],this.dice[0].position.x=-.04,this.dice[1].position.x=.04,this.group.add(...this.dice),this.t=0,this.rolling=!1,this.target=[1,1],this.hovered=!1}pickables(){return this.dice}setHover(e){var n;const t=((n=e==null?void 0:e.userData)==null?void 0:n.kind)==="dice";if(t!==this.hovered){this.hovered=t;for(const s of this.dice){s.scale.setScalar(t?1.18:1);const r=Array.isArray(s.material)?s.material:[s.material];for(const o of r)o!=null&&o.emissive&&(o.emissive.set(t?"#ffe08a":"#000000"),o.emissiveIntensity=t?.45:0)}}}placeFor(e,t){if(e===0){this.group.position.set(0,En+.045,Fc),this.group.rotation.y=0;return}const n=e/Math.max(1,t)*Math.PI*2,s=Fc;this.group.position.set(Math.sin(n)*s,En+.045,Math.cos(n)*s),this.group.rotation.y=n}rollTo(e){this.target=e,this.rolling=!0,this.t=0}update(e){if(!this.rolling)return;this.t+=e;const t=18;for(const n of this.dice)n.rotation.x+=e*t,n.rotation.y+=e*t*.7;this.t>.7&&(this.rolling=!1,this.dice[0].rotation.set(...jd(this.target[0])),this.dice[1].rotation.set(...jd(this.target[1])))}}function Yd(){const i=[1,6,2,5,3,4].map(t=>new nt({map:RS(t),roughness:.4})),e=new ie(new wt(.038,.038,.038),i);return e.castShadow=!0,e.userData={kind:"dice",action:"roll"},e}function jd(i){switch(i){case 1:return[0,0,0];case 6:return[Math.PI,0,0];case 2:return[0,0,Math.PI/2];case 5:return[0,0,-Math.PI/2];case 3:return[0,-Math.PI/2,0];case 4:return[0,Math.PI/2,0];default:return[0,0,0]}}const oa=.82,aa=.5,Js=1024,$r=624;class VS{constructor(e){this.group=new Je,this.group.position.set(0,En+.78,-.95),this.group.rotation.x=-.12,e.add(this.group),this.canvas=document.createElement("canvas"),this.texScale=Ae.trayScale,this.canvas.width=Math.round(Js*this.texScale),this.canvas.height=Math.round($r*this.texScale),this.ctx=this.canvas.getContext("2d"),this.tex=new Us(this.canvas),this.tex.colorSpace=Dt,this.tex.minFilter=Gt,this.tex.magFilter=Gt,this.tex.generateMipmaps=!1;const t=new ie(new bn(oa+.028,aa+.028),new ot({color:13214794,toneMapped:!1}));t.position.z=-.003,this.panel=new ie(new bn(oa,aa),new ot({map:this.tex,toneMapped:!1})),this.hits=new Je,this.hitMat=new ot({transparent:!0,opacity:0,depthWrite:!1,side:tn}),this.group.add(t,this.panel,this.hits),this.buttons=[],this.buttonDefs=[],this.screen="actions",this.hand=Object.fromEntries($e.map(n=>[n,0])),this.status="",this.headline="",this.headlineColor="",this.scoreRows=[],this._scoreKey="",this.hoverAction=null,this.pressAction=null,this._pressTimer=0,this.draw()}pxToLocal(e,t,n,s){const r=((e+n/2)/Js-.5)*oa,o=(.5-(t+s/2)/$r)*aa;return{x:r,y:o,w:n/Js*oa,h:s/$r*aa}}buttonLayout(e){const n=Js-72,s=16;if(this.screen==="settings"||this.screen==="pointerTilt"||this.screen==="restartConfirm"||this.screen==="steal"||this.screen==="win"||this.screen==="cards"||this.screen==="title"||this.screen==="scores"){const m=Math.max(e.length,1),f=this.screen==="settings"||this.screen==="pointerTilt",b=this.screen==="win",S=this.screen==="scores",x=f?84:b?268:S?488:160,P=$r-24,A=this.screen==="steal"?18:b?20:f?10:14,C=this.screen==="steal"?110:b?124:f?82:104,w=Math.min(C,Math.max(52,Math.floor((P-x-(m-1)*A)/m))),v=e.map((y,L)=>({def:y,px:36,py:x+L*(w+A),pw:n,ph:w}));return this.withScoreStrip(v)}if(this.screen==="trade"||this.screen==="discard"||this.screen==="plenty"||this.screen==="monopoly"){const m=e.filter(A=>String(A.action).startsWith("give:")),f=e.filter(A=>String(A.action).startsWith("get:")),b=e.filter(A=>/^(discard|plenty|mono):/.test(String(A.action))),S=e.filter(A=>{const C=String(A.action);return!C.startsWith("give:")&&!C.startsWith("get:")&&!/^(discard|plenty|mono):/.test(C)}),x=[],P=(A,C,w)=>{if(!A.length)return;const v=A.length,y=(n-s*(v-1))/v;A.forEach((L,B)=>{x.push({def:L,px:36+B*(y+s),py:C,pw:y,ph:w})})};if(this.screen==="trade")P(m,262,68),P(f,360,68),P(S,450,84);else{const A=this.screen==="discard"?90:110;P(b,248,A),P(S,248+A+20,88)}return this.withScoreStrip(x)}const o=e.filter(m=>m.action!=="end"&&m.action!=="settings"&&m.action!=="scores"),a=e.find(m=>m.action==="end"),c=e.find(m=>m.action==="settings"),l=e.find(m=>m.action==="scores"),h=3,u=(n-s*(h-1))/h,d=96,p=248,g=[];o.forEach((m,f)=>{const b=f%h,S=Math.floor(f/h);g.push({def:m,px:36+b*(u+s),py:p+S*(d+s),pw:u,ph:d})});const _=p+2*(d+s)+8;if(a&&c&&l){const f=n-s*2-352;g.push({def:a,px:36,py:_,pw:f,ph:92}),g.push({def:l,px:36+f+s,py:_,pw:176,ph:92}),g.push({def:c,px:36+f+s+176+s,py:_,pw:176,ph:92})}else a&&c?(g.push({def:a,px:36,py:_,pw:n-s-280,ph:92}),g.push({def:c,px:36+n-280,py:_,pw:280,ph:92})):a?g.push({def:a,px:36,py:_,pw:n,ph:92}):c&&g.push({def:c,px:36,py:_,pw:n,ph:92});return this.withScoreStrip(g)}scoreStripSlot(){var e;return!((e=this.scoreRows)!=null&&e.length)||this.screen==="scores"||this.screen==="win"||this.screen==="title"||this.screen==="settings"||this.screen==="pointerTilt"||this.screen==="restartConfirm"?null:{def:{label:"Scores",action:"scores",strip:!0},px:300,py:8,pw:Js-336,ph:56}}withScoreStrip(e){const t=this.scoreStripSlot();return t&&e.push(t),e}setButtons(e,t="actions"){this.screen=t,this.buttonDefs=e;const n=this.buttonLayout(e);for(;this.hits.children.length>n.length;){const s=this.hits.children[this.hits.children.length-1];s.geometry.dispose(),this.hits.remove(s)}this.buttons=[];for(let s=0;s<n.length;s++){const r=n[s],o=this.pxToLocal(r.px,r.py,r.pw,r.ph);let a=this.hits.children[s];if(!a)a=new ie(new bn(o.w,o.h),this.hitMat),this.hits.add(a);else{const c=a.geometry;Math.abs(c.parameters.width-o.w)<1e-6&&Math.abs(c.parameters.height-o.h)<1e-6||(c.dispose(),a.geometry=new bn(o.w,o.h))}a.position.set(o.x,o.y,.004),a.userData={kind:"tray",action:r.def.action,disabled:!!r.def.disabled},this.buttons.push({mesh:a,def:r.def})}this.draw()}setHover(e){var n;const t=((n=e==null?void 0:e.userData)==null?void 0:n.kind)==="tray"?e.userData.action:null;t!==this.hoverAction&&(this.hoverAction=t,this.draw())}setPressed(e){const t=e||null;t!==this.pressAction&&(this.pressAction=t,this.draw())}flashPress(e){e&&(clearTimeout(this._pressTimer),this.pressAction=e,this.draw(),this._pressTimer=setTimeout(()=>{this.pressAction===e&&(this.pressAction=null,this.draw())},140))}setVisible(e){this.group.visible=!!e,e||(this.hoverAction=null,this.pressAction=null)}pickables(){return this.group.visible?this.buttons.map(e=>e.mesh):[]}buttonWorldPos(e,t){const n=this.buttons.find(r=>r.def.action===e);return((n==null?void 0:n.mesh)||this.panel).getWorldPosition(t)}stealFloatWorldPos(e){return this.group.updateMatrixWorld(!0),e.set(0,-.47,.02),this.group.localToWorld(e)}setStatus(e){const t=String(e||"");t!==this.status&&(this.status=t,this.draw())}setHeadline(e,t){const n=String(e||""),s=String(t||"");n===this.headline&&s===this.headlineColor||(this.headline=n,this.headlineColor=s,this.draw())}setResources(e){this.hand={...e},this.draw()}setScores(e){const t=Array.isArray(e)?e:[],n=JSON.stringify(t);n!==this._scoreKey&&(this._scoreKey=n,this.scoreRows=t,this.draw())}draw(){const e=this.ctx,t=Js,n=$r;e.setTransform(this.texScale,0,0,this.texScale,0,0),e.clearRect(0,0,t,n),Ts(e,0,0,t,n,36,"#1a120c"),e.fillStyle="#f3e2c4",e.font="700 28px Trebuchet MS, Segoe UI, sans-serif",e.textAlign="left",e.textBaseline="middle";const s={settings:"Settings",pointerTilt:"Pointer tilt",restartConfirm:"Restart game?",steal:"Steal a card",trade:"Bank trade",discard:"Discard",plenty:"Year of Plenty",monopoly:"Monopoly",cards:"Dev cards",win:"Game over",title:"Settlers of Catan",scores:"Scores"};e.fillText(s[this.screen]||"Actions",36,40);const r=this.screen==="settings"||this.screen==="pointerTilt"||this.screen==="win"||this.screen==="title"||this.screen==="scores",o=r||this.screen==="steal"||this.screen==="cards"||this.screen==="restartConfirm"||this.screen==="title";if(this.screen==="win"){const a=this.headline||"Wins!";e.textAlign="center",e.textBaseline="middle",e.fillStyle=this.headlineColor||"#f3e2c4";let c=78;for(;c>28&&(e.font=`800 ${c}px Trebuchet MS, Segoe UI, sans-serif`,!(e.measureText(a).width<=t-72));)c-=2;e.strokeStyle="#0c0806",e.lineWidth=Math.max(8,Math.round(c*.12)),e.strokeText(a,t/2,168),e.fillText(a,t/2,168)}if(this.screen==="scores"?this.drawScoreBreakdown(e,t):this.drawScoreStrip(e),!r){const a=String(this.status||"Sit down to begin").split(`
`).map(c=>c.trim()).filter(Boolean);if(Ts(e,36,64,t-72,72,16,"#2a1c12"),e.fillStyle="#ffe08a",e.textAlign="center",a.length>=2?(Ps(e,a[0],t/2,86,t-120,28),Ps(e,a.slice(1).join(" · "),t/2,114,t-120,24)):(e.font="700 32px Trebuchet MS, Segoe UI, sans-serif",Ps(e,a[0],t/2,100,t-120,32)),!o){const l=t-72,h=14,u=(l-h*4)/5;e.textAlign="center",$e.forEach((d,p)=>{const g=36+p*(u+h),_=d==="wood"||d==="brick"||d==="ore";Ts(e,g,152,u,80,14,Ln[d]),e.fillStyle=_?"#f7efe0":"#1a120c",e.font="700 34px Trebuchet MS, Segoe UI, sans-serif",e.fillText(String(this.hand[d]??0),g+u/2,178),e.font="700 20px Trebuchet MS, Segoe UI, sans-serif",e.fillText(rt[d],g+u/2,210)})}}this.screen==="trade"&&(e.fillStyle="#ffe08a",e.textAlign="left",e.textBaseline="middle",e.font="700 18px Trebuchet MS, Segoe UI, sans-serif",e.fillText("Give to bank",36,250),e.fillText("Get from bank",36,348)),e.textAlign="center",e.textBaseline="middle";for(const a of this.buttonLayout(this.buttonDefs)){if(a.def.strip)continue;const c=this.hoverAction===a.def.action,l=this.pressAction===a.def.action&&!a.def.disabled,h=c&&!l,u=String(a.def.action),d=u==="end",p=u==="settings"||u==="pointerTilt"||u==="scores",g=u==="settingsBack"||u==="pointerTiltBack"||u==="restartBack"||u==="cardsBack"||u==="tradeCancel"||u==="mainMenu"||u==="scoresBack",_=u==="restart"||u==="restartAsk"||u==="titleStart",m=u==="passthrough"||u==="handles"||u==="pointer"||u==="pointerLines",f=u.startsWith("steal:"),b=a.def.color&&(f||/^(give|get|discard|plenty|mono):/.test(u)),S=!!a.def.selected,x=u==="tradeGo"||u==="discardGo"||_;let P="#f3e2c4",A="#2a1c12";a.def.disabled?(P=h?"#6e665c":"#5c5348",A="#d0c4b2"):b?(P=l?"#2a1c12":h||S?"#fff8dc":a.def.color,A=l?"#f7efe0":h||S?"#1a120c":qd(a.def.color)):d||x||m&&a.def.on?(P=l?"#1f6a2c":h?"#4ec45f":"#2f8a3c",A="#f7fff4"):m?(P=l?"#3f382f":h?"#7a6c5a":"#5c5348",A="#f3e2c4"):p?P=l?"#a68630":h?"#e8c86a":"#c9a44a":P=l?"#c4ad82":h?"#fff8dc":"#f3e2c4",Ts(e,a.px,a.py,a.pw,a.ph,18,P),l?(e.strokeStyle="#3a1f0c",e.lineWidth=6,e.stroke()):(h||f||S)&&(e.strokeStyle=a.def.disabled?"#a09070":"#ffe08a",e.lineWidth=a.def.disabled?4:f&&!h&&!S?6:8,e.stroke()),e.fillStyle=A;const C=d||g||_||m||f||x||this.screen==="cards"||this.screen==="win"||this.screen==="pointerTilt"||this.screen==="restartConfirm"||this.screen==="title";XS(e,a,C)}this.tex.needsUpdate=!0}drawScoreStrip(e){const t=this.scoreStripSlot(),n=this.scoreRows;if(!t||!n.length)return;const s=n.length,r=8,o=(t.pw-r*(s-1))/s;n.forEach((a,c)=>{const l=t.px+c*(o+r),h=this.hoverAction==="scores"&&this.pressAction!=="scores";Ts(e,l,t.py,o,t.ph,12,a.color),h&&(e.strokeStyle="#ffe08a",e.lineWidth=4,e.stroke()),e.fillStyle=qd(a.color);const u=`${a.longestRoad?" R":""}${a.largestArmy?" A":""}`,d=a.isYou&&a.hiddenVP?`+${a.hiddenVP}`:"";Ps(e,`${a.name} ${a.publicVP}${d}${u}`,l+o/2,t.py+t.ph/2,o-8,22)})}drawScoreBreakdown(e,t){const n=this.scoreRows;if(!n.length)return;const s=72,o=Math.min(98,Math.floor((472-s)/n.length));n.forEach((a,c)=>{const l=s+c*o,h=o-8;Ts(e,36,l,t-72,h,14,"#2a1c12"),e.fillStyle=a.color,Ts(e,48,l+12,18,18,6,a.color),e.fillStyle="#f3e2c4",e.textAlign="left",e.textBaseline="middle";const u=`${a.longestRoad?"  R":""}${a.largestArmy?"  A":""}`;e.font="800 26px Trebuchet MS, Segoe UI, sans-serif",e.fillText(`${a.name}${a.isYou?" · You":""}  ${a.shownVP} VP${u}`,78,l+24),e.fillStyle="#ffe08a",Ps(e,GS(a),t/2,l+h*.68,t-120,22)})}}function Ts(i,e,t,n,s,r,o){const a=Math.min(r,n/2,s/2);i.beginPath(),i.moveTo(e+a,t),i.arcTo(e+n,t,e+n,t+s,a),i.arcTo(e+n,t+s,e,t+s,a),i.arcTo(e,t+s,e,t,a),i.arcTo(e,t,e+n,t,a),i.closePath(),i.fillStyle=o,i.fill()}function GS(i){const e=i.settlements,t=i.cities,n=[`${e} settlement${e===1?"":"s"}`,`${t} cit${t===1?"y":"ies"}`];return i.longestRoad&&n.push("Longest Road +2"),i.largestArmy&&n.push("Largest Army +2"),i.isYou&&i.hiddenVP&&n.push(`You: ${i.hiddenVP} VP card${i.hiddenVP>1?"s":""}`),n.join(" · ")}function qd(i){const e=String(i||"").replace("#","");if(e.length<6)return"#f7efe0";const t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),s=parseInt(e.slice(4,6),16);return(t*299+n*587+s*114)/1e3>160?"#1a120c":"#f7efe0"}function Ps(i,e,t,n,s,r){let o=r;for(i.textAlign="center",i.textBaseline="middle";o>14&&(i.font=`700 ${o}px Trebuchet MS, Segoe UI, sans-serif`,!(i.measureText(e).width<=s));)o-=2;i.fillText(e,t,n)}function WS(i,e,t,n,s=13){let r=n;for(;r>=s;){i.font=`700 ${r}px Trebuchet MS, Segoe UI, sans-serif`;let o=!0;const a=[];let c="";for(const l of e){if(i.measureText(l).width>t){o=!1;break}const h=c?`${c} · ${l}`:l;i.measureText(h).width<=t?c=h:(c&&a.push(c),c=l)}if(o)return c&&a.push(c),{lines:a,size:r};r-=1}return i.font=`700 ${s}px Trebuchet MS, Segoe UI, sans-serif`,{lines:[e.join(" · ")],size:s}}function XS(i,e,t){const n=String(e.def.label||""),s=String(e.def.detail||"").trim(),r=e.px+e.pw/2,o=e.py+e.ph/2,a=e.pw-28;if(i.textAlign="center",i.textBaseline="middle",!s){Ps(i,n,r,o,a,t?40:30);return}const c=s.split(" · ").map(g=>g.trim()).filter(Boolean),l=WS(i,c,a,Math.min(18,Math.max(14,Math.floor(e.ph*.2)))),h=Math.min(t?32:26,Math.max(18,Math.floor(e.ph*.3))),u=4,d=h+u+l.lines.length*(l.size+2);let p=o-d/2+h/2;Ps(i,n,r,p,a,h),p+=h/2+u+l.size/2,i.font=`700 ${l.size}px Trebuchet MS, Segoe UI, sans-serif`;for(const g of l.lines)i.fillText(g,r,p),p+=l.size+2}class $S{constructor(e){this.opts={width:Ae.helpW,height:Ae.helpH,font:Ae.headset?48:72,pad:Ae.headset?16:28,fill:"#1a120c",ink:"#ffe08a"},this.tex=Pr(" ",this.opts),this._text="",this.mesh=new ie(new bn(.3,.065),new ot({map:this.tex,depthTest:!1,depthWrite:!1,transparent:!0,toneMapped:!1})),this.mesh.position.set(0,-.22,-.52),this.mesh.renderOrder=20,this.mesh.frustumCulled=!1,this.mesh.visible=!1,e.add(this.mesh)}attach(e){!e||this.mesh.parent===e||e.add(this.mesh)}set(e){const t=String(e||"").trim();this.mesh.visible=!!t,!(!t||t===this._text)&&(this._text=t,this.tex=AS(this.tex,t,this.opts),this.mesh.material.map=this.tex,this.mesh.material.needsUpdate=!0)}}const YS=1.22;function Lp(i,e,t=YS){const n=i/Math.max(1,e)*Math.PI*2;return{x:Math.sin(n)*t,z:Math.cos(n)*t,yaw:n}}const jS=-2.85,qS=Math.PI*2*.9;class KS{constructor(e){this.group=new Je,e.add(this.group),this.figures=[],this.t=0,this.currentId=null,this.stealIds=null,this.hoverId=null,this.celebratingId=null}rebuild(e){kl(this.group),this.figures=[],this.celebratingId=null;const t=e.length;e.forEach((n,s)=>{if(!n.isAI)return;const r=Lp(s,t),o=ZS(n);o.position.set(r.x,0,r.z),o.rotation.y=r.yaw,this.group.add(o),this.figures.push({id:n.id,group:o,body:o.userData.body,leftArm:o.userData.leftArm,rightArm:o.userData.rightArm,glow:o.userData.glow,hit:o.userData.hit})}),this.applyHighlights()}setCelebrating(e){e!==this.celebratingId&&(this.celebratingId=e??null,this.celebratingId==null&&this.resetDancePose())}resetDancePose(){for(const e of this.figures)e.body&&(e.body.rotation.y=0),zl(e.leftArm),zl(e.rightArm)}setCurrent(e){this.currentId=e,this.stealIds||this.applyHighlights()}setStealTargets(e){this.stealIds=e!=null&&e.length?[...e]:null,this.applyHighlights()}setHover(e){var n;const t=((n=e==null?void 0:e.userData)==null?void 0:n.kind)==="avatar"?e.userData.id:null;t!==this.hoverId&&(this.hoverId=t,this.applyHighlights())}pickables(){if(!this.stealIds)return[];const e=new Set(this.stealIds);return this.figures.filter(t=>e.has(t.id)).map(t=>t.hit||t.group)}applyHighlights(){const e=this.stealIds?new Set(this.stealIds):null;for(const t of this.figures){const n=e?e.has(t.id):t.id===this.currentId;t.glow.visible=n,t.group.userData.active=n;const s=e&&this.hoverId===t.id&&n;t.glow.scale.setScalar(s?1.55:e&&n?1.28:1)}}update(e,t){this.t+=e;const n=!!this.stealIds;for(const s of this.figures){if(this.celebratingId!=null&&s.id===this.celebratingId)s.group.position.y=Math.abs(Math.sin(this.t*7))*.035,s.body&&(s.body.rotation.y+=e*qS),Kd(s.leftArm,this.t,-1),Kd(s.rightArm,this.t,1);else{const o=Math.sin(this.t*1.6+s.id)*.008;s.group.position.y=o}if(s.group.userData.active){const o=n?.55+Math.sin(this.t*5.5)*.28:.35+Math.sin(this.t*4)*.12;s.glow.material.opacity=this.hoverId===s.id?Math.min(1,o+.25):o}t&&s.group.userData.tag.lookAt(t.position)}}}function zl(i){i&&(i.rotation.x=i.userData.restX,i.rotation.z=i.userData.restZ)}function Kd(i,e,t){i&&(i.rotation.x=jS+Math.sin(e*9+t)*.12,i.rotation.z=t*(.55+Math.sin(e*6)*.08))}function ZS(i){const e=new Je,t=new nt({color:i.color,roughness:.7}),n=new nt({color:"#e0b089",roughness:.65}),s=new nt({color:"#3b2418",roughness:.85}),r=new nt({color:"#6a4024",roughness:.8}),o=new ie(new wt(.24,.05,.24),r);o.position.y=.4;const a=new ie(new wt(.24,.34,.05),r);a.position.set(0,.58,.11);const c=(A,C)=>{const w=new ie(new wt(.04,.4,.04),r);return w.position.set(A,.2,C),w},l=new Je,h=new ie(new wt(.18,.1,.16),t);h.position.y=.48;const u=new ie(new wt(.17,.26,.12),t);u.position.set(0,.68,-.01);const d=new ie(new Zt(.072,10,8),n);d.position.set(0,.9,0);const p=A=>{const C=new ie(new Zt(.012,8,6),s);return C.position.set(A*.025,.91,-.058),C},g=new ie(new Zt(.076,8,6),new nt({color:JS(i.color),roughness:.9}));g.scale.set(1,.55,1),g.position.set(0,.94,0);const _=A=>{const C=new Je;C.position.set(A*.115,.78,-.01);const w=new ie(new wt(.05,.16,.05),t);w.position.set(0,-.08,0);const v=new ie(new Zt(.028,8,6),n);return v.position.set(0,-.18,-.02),C.add(w,v),C.userData.restX=.22,C.userData.restZ=A*.35,zl(C),C},m=_(-1),f=_(1),b=new ie(new yo(.16,.22,16),new ot({color:i.color,transparent:!0,opacity:.4,side:tn}));b.rotation.x=-Math.PI/2,b.position.y=.02,b.visible=!1;const S=new ie(new bn(.22,.06),new ot({map:Pr(i.name,{width:Ae.avatarLabelW,height:Ae.avatarLabelH,font:110,fill:"#1a120c",ink:"#f7efe0"}),transparent:!0}));S.position.set(0,1.08,0);const x=new ie(new Qt(.18,.18,1.12,8),new ot({transparent:!0,opacity:0,depthWrite:!1}));x.position.y=.56,e.add(o,a,c(-.08,.08),c(.08,.08),c(-.08,-.08),c(.08,-.08)),l.add(h,u,d,g,p(-1),p(1),m,f),e.add(l,b,S,x);const P={glow:b,tag:S,hit:x,body:l,leftArm:m,rightArm:f,active:!1,kind:"avatar",id:i.id};return e.userData=P,e.traverse(A=>{A.userData={...A.userData,kind:"avatar",id:i.id},A.isMesh&&(A.castShadow=!0)}),b.castShadow=!1,S.castShadow=!1,x.castShadow=!1,e}function JS(i,e){const t=new Ie(i);return t.offsetHSL(0,0,-.45),`#${t.getHexString()}`}const QS=.048,eE=.74,Zd=.92,tE=.055,nE=Jt(new _o(.026,Ae.chipSegments)),iE=Jt(new yo(.024,.031,Ae.chipSegments)),sE={wood:"L",brick:"B",sheep:"W",wheat:"G",ore:"O"},rE={wood:"#f4efe4",brick:"#f7efe6",sheep:"#243018",wheat:"#3a2a10",ore:"#1c1a18"};class oE{constructor(e){this.group=new Je,e.add(this.group),this.flights=[],this.maps=new Map}play(e,{board:t,players:n,playerCount:s}){if(this.clear(),!(e!=null&&e.length))return 0;const r=new Map;let o=0;for(const a of e){const c=t.hexes.get(a.hexId),l=t.vertices.get(a.vertexId),h=n[a.playerId];if(!c||!h)continue;const u=a.amount||1;for(let d=0;d<u;d++){const p=r.get(a.hexId)||0;r.set(a.hexId,p+1),this.spawn({hex:c,vert:l,player:h,playerCount:s,resource:a.resource,slot:p,delay:eE+o*tE}),o+=1}}return this.timeLeft()}timeLeft(){return this.flights.length?Math.max(0,...this.flights.map(e=>e.wait+Zd-e.t)):0}spawn({hex:e,vert:t,player:n,playerCount:s,resource:r,slot:o,delay:a}){const c=aE(e,t,o),l=cE(n,s),h=lE(r,n.color,this.letterMap(r));h.position.copy(c),h.visible=!1,this.group.add(h),this.flights.push({mesh:h,from:c,to:l,wait:a,t:0,spin:(o%2?1:-1)*(1.8+o*.15),arc:.16+o%3*.03})}letterMap(e){let t=this.maps.get(e);return t||(t=Jt(hE(e)),this.maps.set(e,t),t)}update(e,t){for(let n=this.flights.length-1;n>=0;n--){const s=this.flights[n];if(s.wait-=e,s.wait>0)continue;s.t+=e;const r=Math.min(1,s.t/Zd),o=1-(1-r)**3;s.mesh.visible=!0,s.mesh.position.lerpVectors(s.from,s.to,o),s.mesh.position.y+=Math.sin(r*Math.PI)*s.arc;const a=r<.12?.7+r*2.5:r>.82?1-(r-.82)*2.2:1;s.mesh.scale.setScalar(Math.max(.15,a)),s.mesh.rotation.z=r*s.spin,t&&s.mesh.lookAt(t.position);const c=r>.78?1-(r-.78)/.22:1;for(const l of s.mesh.userData.fadeMats)l.opacity=c;r>=1&&(this.disposeFlight(s),this.flights.splice(n,1))}}disposeFlight(e){this.group.remove(e.mesh);for(const t of e.mesh.userData.fadeMats)t.dispose()}clear(){for(const e of this.flights)this.disposeFlight(e);this.flights=[]}}function aE(i,e,t){const n=new D(i.x,En+QS,i.z);if(e){const s=e.x-i.x,r=e.z-i.z,o=Math.hypot(s,r)||1;n.x+=s/o*.042,n.z+=r/o*.042;const a=-r/o,c=s/o,l=(t-(t>0?.5:0))*.028;n.x+=a*l,n.z+=c*l}else{const s=t*1.2;n.x+=Math.cos(s)*.03,n.z+=Math.sin(s)*.03}return n}function cE(i,e){const t=!!i.isAI,n=Lp(i.id,e,t?1.12:.9);return new D(n.x,t?.74:En+.11,n.z)}function lE(i,e,t){const n=new Je,s=new ie(nE,new ot({map:t,transparent:!0,depthWrite:!1,side:tn,toneMapped:!1})),r=new ie(iE,new ot({color:e,transparent:!0,depthWrite:!1,side:tn,toneMapped:!1}));return s.renderOrder=40,r.renderOrder=41,n.add(r,s),n.frustumCulled=!1,s.frustumCulled=!1,r.frustumCulled=!1,n.userData.fadeMats=[s.material,r.material],n}function hE(i){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d");t.clearRect(0,0,128,128),t.beginPath(),t.arc(64,64,58,0,Math.PI*2),t.fillStyle=Ln[i],t.fill(),t.lineWidth=6,t.strokeStyle="#f3ead6",t.stroke(),t.fillStyle=rE[i]||"#2a1c12",t.font="700 62px Trebuchet MS, Segoe UI, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(sE[i]||"?",64,68);const n=new Us(e);return n.colorSpace=Dt,n.generateMipmaps=!1,n.minFilter=Gt,n.magFilter=Gt,n}const ca=1.7,uE=5.2,dE=.055,fE=.07,Jd=.18,pE=.85,mE=6,gE={width:Ae.floatW,height:Ae.floatH,font:Ae.headset?64:92,pad:24,fill:"#1a120c",ink:"#ffe08a"};class _E{constructor(e){this.group=new Je,e.add(this.group),this.items=[],this._cam=new D}spawn(e,t,n=ca){const s=String(e||"").trim();if(!s||!t)return;this.items.length>=mE&&this.disposeItem(this.items.shift());const r=Pr(s,gE),o=Math.min(.46,.11+s.length*.011),a=new ie(new bn(o,o*.25),new ot({map:r,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1,side:tn}));a.renderOrder=50,a.frustumCulled=!1,this.group.updateMatrixWorld(!0);const c=t.clone();this.group.worldToLocal(c),c.y+=dE,a.position.copy(c),a.scale.setScalar(.72),this.group.add(a),this.items.push({mesh:a,tex:r,t:0,y0:c.y,life:Math.max(ca,Number(n)||ca)})}update(e,t){if(this.items.length){t&&t.getWorldPosition(this._cam);for(let n=this.items.length-1;n>=0;n--){const s=this.items[n];s.t+=e;const r=s.life||ca,o=Math.min(1,s.t/r),a=Math.min(1,s.t/Jd),c=Math.max(Jd+.35,r-pE),l=s.t>c?1-(s.t-c)/Math.max(.05,r-c):1;s.mesh.material.opacity=Math.max(0,a*l),s.mesh.position.y=s.y0+fE*(1-(1-o)**2);const h=s.t<.22?.72+Math.min(1,s.t/.22)*.28:1;s.mesh.scale.setScalar(h),t&&s.mesh.lookAt(this._cam),o>=1&&(this.disposeItem(s),this.items.splice(n,1))}}}disposeItem(e){this.group.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose(),e.tex.dispose()}clear(){for(const e of this.items)this.disposeItem(e);this.items=[]}}const De=i=>document.getElementById(i);function yE(i){switch(i.phase){case F.SETUP_SETTLEMENT:return"Place a settlement (distance rule applies).";case F.SETUP_ROAD:return"Place a road touching that settlement.";case F.ROLL:return"Roll the dice — or play a knight first.";case F.MAIN:return"Build, trade, play a card, or end your turn. Trade and Dev are on the panel.";case F.DISCARD:return`${Vl(i)}. Tap resources on the panel, then confirm.`;case F.ROBBER:return"Move the robber onto a land hex.";case F.STEAL:return"Choose a player to steal from — click their name or figure.";case F.FREE_ROADS:return`Place ${i.freeRoads} free road${i.freeRoads>1?"s":""}.`;case F.PLENTY:return"Take any two resources from the bank — use the panel buttons.";case F.MONOPOLY:return"Name a resource on the panel. Everyone else must give you theirs.";case F.GAME_OVER:return`${i.player(i.winner).name} Wins!`;default:return""}}function Dp(i){const e=i.lastTrade;if(!e)return null;const t=rt[e.give]||e.give,n=rt[e.get]||e.get;return`Traded ${e.rate} ${t} for 1 ${n}`}function Lr(i){const e=i.lastSteal;if(!(e!=null&&e.resource))return null;const t=i.player(e.playerId),n=i.player(e.fromId);if(!t||!n)return null;const s=rt[e.resource]||e.resource,r=Dn(i);return t.id===r.id?`You stole ${s} from ${n.name}`:n.id===r.id?`${t.name} stole ${s} from you`:`${t.name} stole ${s} from ${n.name}`}function vo(i){const e=i.lastRoll;if(!(e!=null&&e.dice))return null;const[t,n]=e.dice,s=t+n,r=`${t} + ${n} = ${s}`,o=Lr(i);if(e.seven||s===7){const u=o||"Robber — discard if 8+ cards";return{diceLine:r,gainsLine:u,seven:!0,banner:`${r} · ${u}`}}const a=Dn(i),c=Object.fromEntries($e.map(u=>[u,0]));for(const u of e.production||[])u.playerId===a.id&&(c[u.resource]=(c[u.resource]||0)+(u.amount||1));const l=$e.filter(u=>c[u]>0).map(u=>`${c[u]} ${rt[u]}`),h=l.length?`You gained ${l.join(", ")}`:"No resources";return{diceLine:r,gainsLine:h,seven:!1,banner:`${r} · ${h}`}}function xE(i){const e=vo(i),t=Lr(i),n=Dp(i);if(i.phase===F.DISCARD){const h=`${Vl(i)}
Tap resources on the panel`;return e?`${e.diceLine} · ${h}`:h}const s=i.player().name,r={[F.SETUP_SETTLEMENT]:"Place a settlement",[F.SETUP_ROAD]:"Place a road",[F.ROLL]:"Roll the dice",[F.MAIN]:"Build, trade, or end turn",[F.DISCARD]:Vl(i),[F.ROBBER]:"Move the robber",[F.STEAL]:"Click a neighbor to steal",[F.FREE_ROADS]:`Place ${i.freeRoads} free road${i.freeRoads>1?"s":""}`,[F.PLENTY]:"Pick two resources on the panel",[F.MONOPOLY]:"Name a resource on the panel",[F.GAME_OVER]:i.winner!=null?`${i.player(i.winner).name} wins`:"Game over"}[i.phase]||String(i.phase),o=i.phase===F.MAIN&&i.isHuman()?`
Point at END TURN or squeeze grip`:i.phase===F.STEAL&&i.isHuman()?`
Click a neighbor`:i.phase===F.GAME_OVER?`
Play Again or Main Menu`:"",a=`${s} · ${r}${o}`;return n&&i.phase===F.MAIN?e&&!e.seven?`${e.banner}
${n}`:`${n}
${a}`:t&&i.phase!==F.STEAL&&i.phase!==F.ROBBER?e!=null&&e.seven?`${e.diceLine} · ${t}
${a}`:e?`${e.banner}
${t}`:`${t}
${a}`:e?e.seven?`${e.diceLine} · ${a}`:`${e.banner}
${a}`:a}function vE(i,e){const t=i.player();De("turn-banner").textContent=`${t.name}'s turn`,De("turn-banner").style.color=t.color;const n=yE(i);De("phase-label").textContent=n;const s=vo(i),r=Lr(i),o=r?s?`${s.diceLine} · ${r}`:r:s?s.banner:n,a=De("table-help");a&&(a.textContent=o,a.classList.toggle("hidden",!o));const c=De("roll-result");c&&(c.textContent=r?o:s?s.banner:"",c.classList.toggle("hidden",!c.textContent));const l=Dn(i),h=ka(i),u=De("score-strip");u&&(u.innerHTML=h.map(P=>`<button type="button" class="score-chip ${P.id===i.current?"active":""}" data-scores="1" style="--chip:${P.color};color:${zp(P.color)}">
        <i class="swatch" style="background:${P.color}"></i>
        <span class="score-name">${P.name}</span>
        <span class="score-vp">${P.publicVP}${P.isYou&&P.hiddenVP?`+${P.hiddenVP}`:""}</span>
        ${P.longestRoad?'<span class="award" title="Longest Road +2">R</span>':""}
        ${P.largestArmy?'<span class="award" title="Largest Army +2">A</span>':""}
      </button>`).join(""));const d=i.phase===F.STEAL&&i.isHuman(),p=new Set(i.stealCandidates);De("players-panel").innerHTML=h.map(P=>{const A=i.player(P.id),C=$e.reduce((y,L)=>y+A.resources[L],0),w=A.roads.length,v=d&&p.has(A.id);return`<article class="player-card ${A.id===i.current?"active":""} ${v?"steal-target":""}" ${v?`data-steal="${A.id}"`:""}>
        <div class="player-head">
          <span><i class="swatch" style="background:${A.color}"></i>${A.name}${A.isAI?" · AI":""}${P.isYou?" · You":""}${v?" · steal":""}</span>
          <span>${P.shownVP} VP${P.longestRoad?'<span class="award" title="Longest Road +2">R</span>':""}${P.largestArmy?'<span class="award" title="Largest Army +2">A</span>':""}</span>
        </div>
        <div class="player-break">${Ip(P)}</div>
        <div class="player-meta">${C} cards · ${w} roads · ${A.knightsPlayed} knights</div>
        ${P.isYou?`<div class="player-res">${$e.map(y=>`${rt[y]} ${A.resources[y]}`).join(" · ")}</div>`:""}
      </article>`}).join(""),De("resource-bar").innerHTML=$e.map(P=>`<div class="resource-chip" style="border-color:${Ln[P]};--chip:${Ln[P]}">
      <div class="n">${l.resources[P]}</div>
      <div class="k">${rt[P]}</div>
    </div>`).join("");const g=l,_=!g.isAI&&g.id===i.current,m=g.devCards.filter(P=>P.type!==bt.VP).map(P=>{const A={[bt.KNIGHT]:"Knight",[bt.ROAD]:"Road Building",[bt.PLENTY]:"Year of Plenty",[bt.MONOPOLY]:"Monopoly"},C=i.playableCards(g.id).some(w=>w.id===P.id);return`<button data-dev="${P.id}" ${C&&_?"":"disabled"}>${A[P.type]}${P.playable?"":" (hold)"}</button>`}),f=g.devCards.filter(P=>P.type===bt.VP).length;f&&m.push(`<button disabled>${f} VP card${f>1?"s":""}</button>`),De("dev-bar").innerHTML=m.join("")||"<button disabled>No development cards</button>";const b=(P,A,C,w)=>`<button type="button" data-act="${P}" class="${e===P?"primary":""} ${C?"":"is-disabled"}" ${C?"":'aria-disabled="true"'}>${w?`<span class="act-name">${A}</span><span class="act-cost">${w}</span>`:A}</button>`,S=i.phase===F.MAIN&&_,x=i.phase===F.FREE_ROADS&&_;De("action-bar").innerHTML=[b("roll","Roll dice",i.phase===F.ROLL&&_),b("road","Road",S&&i.canAfford(g.id,"road")||x,x?"Free":Ni(mt.road)),b("settlement","Settlement",S&&i.canAfford(g.id,"settlement"),Ni(mt.settlement)),b("city","City",S&&i.canAfford(g.id,"city"),Ni(mt.city)),b("dev","Dev",S&&i.canAfford(g.id,"dev")&&i.devDeck.length,Ni(mt.dev)),b("trade","Bank",S,"4:1"),b("end","End turn",S)].join(""),De("log").innerHTML=[...i.log].slice(-12).reverse().map(P=>`<li>${P}</li>`).join("")}function Vl(i){const e=i.discardQueue.map(t=>i.player(t.player).name);return e.length?`${e.join(", ")} must discard half`:"Discard half your cards"}function ka(i){if(!i)return[];const e=Dn(i);return i.players.map(t=>{const n=i.scoreFacts(t),s=t.id===e.id;return{id:t.id,name:t.name,color:t.color,isYou:s,settlements:n.settlements,cities:n.cities,longestRoad:n.longestRoad,largestArmy:n.largestArmy,hiddenVP:s?n.hiddenVP:0,publicVP:n.publicVP,shownVP:s?n.totalVP:n.publicVP}})}function Ip(i){const e=i.settlements,t=i.cities,n=[`${e} settlement${e===1?"":"s"}`,`${t} cit${t===1?"y":"ies"}`];return i.longestRoad&&n.push("Longest Road +2"),i.largestArmy&&n.push("Largest Army +2"),i.isYou&&i.hiddenVP&&n.push(`You: ${i.hiddenVP} VP card${i.hiddenVP>1?"s":""}`),n.join(" · ")}function Dn(i){if(i.viewSeat!=null&&i.players[i.viewSeat])return i.player(i.viewSeat);if(i.players.some(t=>!t.isAI)===!1)return i.player();const e=i.players.filter(t=>!t.isAI);return e.length===1?e[0]:i.player()}function ME(i){var e,t,n,s;De("action-bar").addEventListener("click",r=>{const o=r.target.closest("button[data-act]");o&&(o.getAttribute("aria-disabled")==="true"?i("failBuild",o.dataset.act):i(o.dataset.act))}),De("dev-bar").addEventListener("click",r=>{const o=r.target.closest("button[data-dev]");o&&i("playDev",o.dataset.dev)}),De("players-panel").addEventListener("click",r=>{const o=r.target.closest("[data-steal]");o&&i("steal",Number(o.dataset.steal))}),(e=De("score-strip"))==null||e.addEventListener("click",r=>{r.target.closest("[data-scores]")&&i("scores")}),(t=De("scores-btn"))==null||t.addEventListener("click",()=>i("scores")),(n=De("settings-btn"))==null||n.addEventListener("click",()=>i("settings")),(s=De("title-settings-btn"))==null||s.addEventListener("click",()=>i("settings"))}const bE=2200,Np=5200;function pn(i,e=bE,t=null){const n=De("toast");n.textContent=i,n.classList.toggle("toast-low",!!(t!=null&&t.low)),n.classList.remove("hidden"),clearTimeout(pn._t),pn._t=setTimeout(()=>n.classList.add("hidden"),e)}const Gl=12;function SE(i){if(!i||i.classList.contains("hidden"))return null;const e=i.getBoundingClientRect();return e.width<1||e.height<1?null:e}function EE(i,e,t=Gl){return i.left<e.right+t&&i.right+t>e.left&&i.top<e.bottom+t&&i.bottom+t>e.top}function Up(){const i=De("modal"),e=De("modal-body");if(!i||!e||i.classList.contains("hidden")||!i.classList.contains("scores-modal"))return;e.style.top="",e.style.maxHeight="";const t=[document.querySelector(".top-actions"),De("score-strip"),De("turn-banner"),De("table-help"),De("phase-label"),De("roll-result")].map(SE).filter(Boolean);let n=Math.max(72,...t.map(r=>r.bottom+Gl));e.style.top=`${Math.round(n)}px`,e.style.maxHeight=`${Math.max(160,Math.round(window.innerHeight-n-16))}px`;const s=e.getBoundingClientRect();for(const r of t)EE(s,r)&&(n=Math.max(n,r.bottom+Gl));e.style.top=`${Math.round(n)}px`,e.style.maxHeight=`${Math.max(160,Math.round(window.innerHeight-n-16))}px`}function Wl(){Wl._bound||(Wl._bound=!0,window.addEventListener("resize",Up))}function Pt(){const i=De("modal");i.classList.add("hidden"),i.classList.remove("scores-modal");const e=De("modal-body");e&&(e.style.top="",e.style.maxHeight="")}function yi(i,e={}){const t=De("modal"),n=De("modal-body");n.innerHTML=i,n.style.top="",n.style.maxHeight="",t.classList.toggle("scores-modal",e.variant==="scores"),t.classList.remove("hidden"),e.variant==="scores"&&(Wl(),requestAnimationFrame(Up))}function Op(i,e=""){return`<div class="picker" id="${i}">${$e.map(t=>`<button type="button" data-res="${t}" style="border-color:${Ln[t]}">${rt[t]}</button>`).join("")}</div>${e}`}function Fp(i,e){const t=i.discardQueue.filter(a=>i.viewSeat!=null?a.player===i.viewSeat:!i.player(a.player).isAI);if(!t.length)return!1;const n=t[0],s=i.player(n.player),r=Object.fromEntries($e.map(a=>[a,0])),o=()=>{const a=$e.reduce((c,l)=>c+r[l],0);yi(`<h2>${s.name}, discard ${n.must}</h2>
      <p>Selected ${a} / ${n.must}. You can also tap resources on the table panel.</p>
      ${$e.map(c=>`<button data-r="${c}">${rt[c]} ${r[c]}/${s.resources[c]}</button>`).join(" ")}
      <p><button id="discard-go" class="primary" ${a===n.must?"":"disabled"}>Discard</button></p>`),De("modal-body").onclick=c=>{const l=c.target.dataset.r;l&&r[l]<s.resources[l]&&a<n.must&&(r[l]+=1,o()),c.target.id==="discard-go"&&a===n.must&&(Pt(),e(s.id,r))}};return o(),!0}function Bp(i,e){const t=i.stealCandidates.map(n=>{const s=i.player(n);return`<button type="button" class="steal-pick" data-steal="${n}" style="--steal:${s.color}">
        <i class="swatch" style="background:${s.color}"></i>${s.name}
      </button>`}).join("");yi(`<h2>Steal a card</h2>
    <p>Choose a neighbor. You can also click their figure at the table.</p>
    <div class="picker steal-picker">${t}</div>`),De("modal-body").onclick=n=>{var r;const s=(r=n.target.closest("button[data-steal]"))==null?void 0:r.dataset.steal;s!=null&&(Pt(),e(Number(s)))}}function TE(i,e){let t=null,n=null;const s=Dn(i),r=()=>{var h,u;const o=t?i.tradeRate(s,t):4,a=t&&n&&i.canBankTrade(s.id,t,n),c=t&&n?i.whyNotBankTrade(s.id,t,n):null,l=t?`Bank ${o}:1 — give ${o} ${rt[t]} for 1 of another.`:"Bank 4:1 (3:1 or 2:1 with a matching port). Give extras, take one.";yi(`<h2>Bank trade</h2>
      <p>${l} In VR, use the panel buttons.</p>
      <p>Give to the bank</p>
      <div class="picker" id="give-p">${$e.map(d=>{const p=i.tradeRate(s,d),g=(s.resources[d]||0)<p;return`<button type="button" data-res="${d}" ${g?"disabled":""} style="border-color:${Ln[d]}">${rt[d]} ${p}:1</button>`}).join("")}</div>
      <p>Get from the bank</p>
      <div class="picker" id="get-p">${$e.map(d=>{const p=d===t||(i.bank[d]||0)<1;return`<button type="button" data-res="${d}" ${p?"disabled":""} style="border-color:${Ln[d]}">${rt[d]}</button>`}).join("")}</div>
      ${c?`<p class="trade-why">${c}</p>`:""}
      <button id="trade-go" class="primary" ${a?"":"disabled"}>${t?`Bank ${o}:1`:"Bank 4:1"}</button>
      <button id="trade-cancel">Cancel</button>`),t&&((h=De("give-p").querySelector(`[data-res="${t}"]`))==null||h.classList.add("selected")),n&&((u=De("get-p").querySelector(`[data-res="${n}"]`))==null||u.classList.add("selected")),De("give-p").onclick=d=>{var g;const p=Pi((g=d.target.closest("[data-res]"))==null?void 0:g.dataset.res);!p||(s.resources[p]||0)<i.tradeRate(s,p)||(t=p,n===t&&(n=null),r())},De("get-p").onclick=d=>{var g;const p=Pi((g=d.target.closest("[data-res]"))==null?void 0:g.dataset.res);!p||p===t||(i.bank[p]||0)<1||(n=p,r())},De("trade-go").onclick=()=>{a&&(Pt(),e(t,n))},De("trade-cancel").onclick=()=>{Pt(),e(null,null)}};r()}function kp(i){const e=[],t=()=>{yi(`<h2>Year of Plenty</h2><p>Pick two resources (${e.length}/2) — use the panel in VR.</p>
      ${Op("pl")}
      <p>${e.map(n=>rt[n]).join(", ")}</p>`),De("pl").onclick=n=>{const s=n.target.dataset.res;s&&(e.push(s),e.length>=2?(Pt(),i(e[0],e[1])):t())}};t()}function Hp(i){yi(`<h2>Monopoly</h2><p>Name a resource on the panel or below.</p>${Op("mo")}`),De("mo").onclick=e=>{const t=e.target.dataset.res;t&&(Pt(),i(t))}}function zp(i){const e=String(i||"").replace("#","");if(e.length<6)return"#f7efe0";const t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),s=parseInt(e.slice(4,6),16);return(t*299+n*587+s*114)/1e3>160?"#1a120c":"#f7efe0"}function AE(i,e){const t=ka(i);yi(`<h2>Scores</h2>
    <p class="score-note">Public totals are settlements, cities, Longest Road, and Largest Army. Victory-point cards stay private except on your row.</p>
    ${t.map(n=>`<article class="score-break">
        <div class="player-head">
          <span><i class="swatch" style="background:${n.color}"></i>${n.name}${n.isYou?" · You":""}</span>
          <span>${n.shownVP} VP${n.longestRoad?'<span class="award" title="Longest Road +2">R</span>':""}${n.largestArmy?'<span class="award" title="Largest Army +2">A</span>':""}</span>
        </div>
        <div class="player-break">${Ip(n)}</div>
      </article>`).join("")}
    <button id="scores-back" class="primary" type="button">Back</button>`,{variant:"scores"}),De("scores-back").onclick=()=>{Pt(),e==null||e()}}function Vp(i,{onPlayAgain:e,onMainMenu:t}={}){const n=i.player(i.winner),s=zp(n.color);yi(`<h2 class="win-title" style="background:${n.color};color:${s}">${n.name} Wins!</h2>
    <p>${i.totalVP(n)} victory points. The island is theirs.</p>
    <div class="win-actions">
      <button id="again" class="primary">Play Again</button>
      <button id="win-menu" type="button">Main Menu</button>
    </div>`),De("again").onclick=()=>{Pt(),e==null||e()},De("win-menu").onclick=()=>{Pt(),t==null||t()}}function wE(i,e){const t=n=>n?"primary":"";yi(`<h2>Settings</h2>
    <div class="settings-stack">
      <button type="button" class="${t(i.gaze)}" data-act="pointer">${i.gaze?"Pointer: Face":"Pointer: Hand"}</button>
      <button type="button" data-act="pointerTilt">Pointer tilt · ${i.tiltLabel}</button>
      <button type="button" class="${t(i.lines)}" data-act="pointerLines">${i.lines?"Pointer lines ON":"Pointer lines OFF"}</button>
      <button type="button" class="${t(i.antialias)}" data-act="antialias">${i.antialias?"Antialias ON":"Antialias OFF"}</button>
      <button type="button" class="${t(i.passthrough)}" data-act="passthrough">${i.passthrough?"Passthrough ON":"Passthrough OFF"}</button>
      <button type="button" class="${t(i.handles)}" data-act="handles">${i.handles?"Handles ON":"Handles OFF"}</button>
      ${i.canRestart?'<button type="button" data-act="restartAsk">Restart game</button>':""}
      <button type="button" id="settings-back" class="primary" data-act="settingsBack">Back</button>
    </div>`),De("modal-body").onclick=n=>{var r;const s=(r=n.target.closest("[data-act]"))==null?void 0:r.dataset.act;s&&e(s)}}function RE(i,e){yi(`<h2>Pointer tilt</h2>
    <p>Nudge the XR aim ray up or down.</p>
    <div class="settings-stack">
      <button type="button" data-act="pointerTiltUp">▲ Up</button>
      <button type="button" disabled>${i.tiltLabel}</button>
      <button type="button" data-act="pointerTiltDown">▼ Down</button>
      <button type="button" id="tilt-back" class="primary" data-act="pointerTiltBack">Back</button>
    </div>`),De("modal-body").onclick=t=>{var s;const n=(s=t.target.closest("[data-act]"))==null?void 0:s.dataset.act;n&&e(n)}}function Gp(i){yi(`<h2>Restart game?</h2>
    <p>This starts a new island (same player count and mode).</p>
    <button id="restart-go" class="primary">Restart</button>
    <button id="restart-back">Back</button>`),De("restart-go").onclick=()=>{Pt(),i(!0)},De("restart-back").onclick=()=>{Pt(),i(!1)}}let Yr;function Wp(){return Yr||(Yr=new(window.AudioContext||window.webkitAudioContext)),Yr.state==="suspended"&&Yr.resume(),Yr}function As(i,e=.12,t="sine",n=.06){const s=Wp(),r=s.createOscillator(),o=s.createGain();r.type=t,r.frequency.value=i,o.gain.value=n,o.gain.exponentialRampToValueAtTime(1e-4,s.currentTime+e),r.connect(o).connect(s.destination),r.start(),r.stop(s.currentTime+e)}const Fe={unlock:()=>Wp(),dice:()=>{As(180,.05,"square",.04),setTimeout(()=>As(140,.08,"triangle",.05),80),setTimeout(()=>As(90,.12,"sawtooth",.03),160)},place:()=>As(220,.1,"triangle",.05),click:()=>As(520,.05,"square",.03),win:()=>{[262,330,392,523].forEach((i,e)=>setTimeout(()=>As(i,.28,"sine",.07),e*140))},bad:()=>As(90,.16,"sawtooth",.04)},CE="modulepreload",PE=function(i,e){return new URL(i,e).href},Qd={},Bc=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let o=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const a=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));s=o(t.map(h=>{if(h=PE(h,n),h in Qd)return;Qd[h]=!0;const u=h.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(!!n)for(let _=a.length-1;_>=0;_--){const m=a[_];if(m.href===h&&(!u||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${d}`))return;const g=document.createElement("link");if(g.rel=u?"stylesheet":CE,u||(g.as="script"),g.crossOrigin="",g.href=h,l&&g.setAttribute("nonce",l),document.head.appendChild(g),u)return new Promise((_,m)=>{g.addEventListener("load",_),g.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},LE={apiKey:"AIzaSyD9wx0VS7oZLUqB4v5-XEBHGVHom4f7dZM",authDomain:"nametagsxr.firebaseapp.com",projectId:"nametagsxr",storageBucket:"nametagsxr.firebasestorage.app",messagingSenderId:"1044217406309",appId:"1:1044217406309:web:ca475c4e8441752ca0f78c",measurementId:"G-R13NNSLFQ0"};let Xl,ir,Aa,er,xa,$l;async function DE(){Xl||([Xl,ir,Aa]=await Promise.all([Bc(()=>import("./index.esm-EA0joZX4.js"),__vite__mapDeps([0,1]),import.meta.url),Bc(()=>import("./index.esm-BkVG1D2g.js"),__vite__mapDeps([2,1]),import.meta.url),Bc(()=>import("./index.esm-DqN5KfZ1.js"),__vite__mapDeps([3,1]),import.meta.url)]))}function IE(){const{initializeApp:i,getApps:e,getApp:t}=Xl;er=e().length?t():i(LE);try{xa=ir.initializeAuth(er,{persistence:ir.inMemoryPersistence})}catch{xa=ir.getAuth(er)}return $l=Aa.getFirestore(er),{app:er,auth:xa,db:$l,fs:Aa,authApi:ir}}function ns(){return{app:er,auth:xa,db:$l,fs:Aa,authApi:ir}}function Eh(i){const e=i&&i.code||"",t=i&&i.message||"";return e==="auth/configuration-not-found"||/CONFIGURATION_NOT_FOUND/i.test(t)?"Firebase Authentication is not set up. In Firebase Console open Authentication → Get started, then enable Anonymous under Sign-in method.":e==="auth/operation-not-allowed"||e==="auth/admin-restricted-operation"?"Anonymous sign-in is disabled. In Firebase Console go to Authentication → Sign-in method → Anonymous → Enable.":e==="auth/unauthorized-domain"?"This site is not allowed. Add azb.github.io and localhost under Authentication → Settings → Authorized domains.":e==="permission-denied"?"Firestore blocked the write. Deploy NameTagsXR/firebase.rules (rooms/* and rooms/*/players/*).":t||"Firebase connection failed."}const ef="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";function tf(){let i="";const e=new Uint32Array(4);crypto.getRandomValues(e);for(let t=0;t<4;t++)i+=ef[e[t]%ef.length];return i}function NE(i){return String(i||"").trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6)}const UE={iceCandidatePoolSize:8,iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun.cloudflare.com:3478"}]};function OE({uid:i,onMessage:e,onOpen:t,onClose:n,publishSignal:s}){const r=new Map,o={},a={},c={};let l=null;function h(w){return w.iceGatheringState==="complete"?Promise.resolve():new Promise(v=>{const y=setTimeout(v,3e3),L=()=>{w.iceGatheringState==="complete"&&(w.removeEventListener("icegatheringstatechange",L),clearTimeout(y),v())};w.addEventListener("icegatheringstatechange",L)})}function u(){clearTimeout(l),l=setTimeout(()=>s==null?void 0:s().catch(()=>{}),180)}function d(w,v){const y=r.get(w);y&&(y.channel=v,v.onmessage=L=>{let B;try{B=JSON.parse(typeof L.data=="string"?L.data:new TextDecoder().decode(L.data))}catch{return}e==null||e(w,B)},v.onopen=()=>{delete o[w],delete a[w],delete c[w],s==null||s().catch(()=>{}),t==null||t(w)},v.onclose=()=>n==null?void 0:n(w))}function p(w){var y;const v=r.get(w);if(v){try{(y=v.channel)==null||y.close()}catch{}try{v.pc.close()}catch{}r.delete(w),delete o[w],delete a[w],delete c[w]}}function g(w){if(!i||w===i||r.has(w)||typeof RTCPeerConnection!="function")return;const v=i<w,y=new RTCPeerConnection(UE),L={pc:y,channel:null,offerer:v,appliedRemote:"",seenIce:new Set,pendingIce:[]};r.set(w,L);try{d(w,y.createDataChannel("game",{negotiated:!0,id:1,ordered:!0}))}catch{v?d(w,y.createDataChannel("game")):y.ondatachannel=B=>d(w,B.channel)}y.onicecandidate=B=>{if(!B.candidate){if(y.localDescription){const H={type:y.localDescription.type,sdp:y.localDescription.sdp};v?o[w]=H:a[w]=H}u();return}c[w]||(c[w]=[]),!(c[w].length>=24)&&(c[w].push({candidate:B.candidate.candidate,sdpMid:B.candidate.sdpMid==null?null:B.candidate.sdpMid,sdpMLineIndex:B.candidate.sdpMLineIndex==null?0:B.candidate.sdpMLineIndex}),u())},y.onconnectionstatechange=()=>{y.connectionState==="failed"&&(p(w),setTimeout(()=>g(w),1200))},v&&(async()=>{await y.setLocalDescription(await y.createOffer()),o[w]={type:y.localDescription.type,sdp:y.localDescription.sdp},await(s==null?void 0:s()),await h(y),o[w]={type:y.localDescription.type,sdp:y.localDescription.sdp},await(s==null?void 0:s())})().catch(B=>console.warn("RTC offer failed",B))}async function _(w){if(!(!w||!w.pc.remoteDescription))for(;w.pendingIce.length;){const v=w.pendingIce.shift();try{await w.pc.addIceCandidate(v)}catch{}}}async function m(w,v){const y=r.get(w);if(!y)return;const L=v.ice&&v.ice[i];if(Array.isArray(L)){for(const B of L)if(!(!(B!=null&&B.candidate)||y.seenIce.has(B.candidate))){if(y.seenIce.add(B.candidate),!y.pc.remoteDescription){y.pendingIce.push(B);continue}try{await y.pc.addIceCandidate(B)}catch{}}}}async function f(w,v){const y=r.get(w);if(!y)return;const L=y.pc,B=v.offers&&v.offers[i],H=v.answers&&v.answers[i];try{B&&!y.offerer&&y.appliedRemote!==B.sdp&&!y.busy&&(y.busy=!0,await L.setRemoteDescription(B),y.appliedRemote=B.sdp,await _(y),await L.setLocalDescription(await L.createAnswer()),a[w]={type:L.localDescription.type,sdp:L.localDescription.sdp},await(s==null?void 0:s()),await h(L),a[w]={type:L.localDescription.type,sdp:L.localDescription.sdp},await(s==null?void 0:s()),y.busy=!1),H&&y.offerer&&y.appliedRemote!==H.sdp&&L.signalingState==="have-local-offer"&&(await L.setRemoteDescription(H),y.appliedRemote=H.sdp,await _(y)),await m(w,v)}catch(W){y.busy=!1,console.warn("RTC signal failed",W)}}function b(w){var y;const v=JSON.stringify(w);for(const L of r.values())if(((y=L.channel)==null?void 0:y.readyState)==="open")try{L.channel.send(v)}catch{}}function S(w,v){var L;const y=r.get(w);if(((L=y==null?void 0:y.channel)==null?void 0:L.readyState)!=="open")return!1;try{return y.channel.send(JSON.stringify(v)),!0}catch{return!1}}function x(){var v;let w=0;for(const y of r.values())((v=y.channel)==null?void 0:v.readyState)==="open"&&w++;return w}function P(w){const v=new Set;for(const y of w)y.id!==i&&(v.add(y.id),g(y.id),f(y.id,y.data));for(const y of[...r.keys()])v.has(y)||p(y)}function A(){for(const w of[...r.keys()])p(w);for(const w of Object.keys(o))delete o[w];for(const w of Object.keys(a))delete a[w];for(const w of Object.keys(c))delete c[w]}function C(){return{offers:o,answers:a,ice:c}}return{peers:r,ensurePeer:g,closePeer:p,closeAll:A,syncPresence:P,broadcast:b,sendTo:S,openCount:x,signalBlob:C,handleSignal:f}}function FE(i,e,t){if(!i||!e)return!1;const n=e.k;return n==="roll"?!!i.roll():n==="end"?!!i.endTurn():n==="settlement"?!!i.placeSettlement(e.id,t):n==="city"?!!i.placeCity(e.id,t):n==="road"?!!i.placeRoad(e.id,t):n==="robber"?!!i.moveRobber(e.id,t):n==="steal"?!!i.steal(Number(e.from),t):n==="trade"?!!i.bankTrade(t,e.give,e.get):n==="dev"?!!i.buyDev(t):n==="playDev"?!!i.playDev(e.id):n==="discard"?!!i.discard(t,e.give):n==="plenty"?!!i.yearOfPlenty(e.a,e.b,t):n==="mono"?!!i.monopoly(e.r,t):!1}function BE(i,e,t){return!i||t==null?!1:e.k==="discard"?i.phase==="discard"&&i.discardQueue.some(n=>n.player===t):i.phase==="discard"?!1:i.current===t}const nf=2e4,kE=45e3;class HE{constructor(){this.active=!1,this.isHost=!1,this.uid=null,this.roomId=null,this.seat=null,this.hostUid=null,this.status="idle",this.roster=[],this.room=null,this.handlers={},this._unsubRoom=null,this._unsubPlayers=null,this._pruneTimer=null,this._rtc=null,this._seq=0,this._lastPresence=0}on(e){this.handlers={...this.handlers,...e}}async ensureAuth(){await DE();const{auth:e,authApi:t}=IE(),n=await t.signInAnonymously(e);return this.uid=n.user.uid,this.uid}async createRoom(){var s;await this.ensureAuth();const{db:e,fs:t}=ns();let n=tf();for(let r=0;r<8;r++){const o=t.doc(e,"rooms",n),a=await t.getDoc(o);if(!a.exists()||((s=a.data())==null?void 0:s.app)!=="settlers"||zE(a.data()))return this.roomId=n,this.isHost=!0,this.hostUid=this.uid,await t.setDoc(o,{app:"settlers",host:this.uid,status:"lobby",playerCount:1,updatedAt:t.serverTimestamp(),lastJoiner:this.uid}),await this._enterRoom(),n;n=tf()}throw new Error("Could not allocate a room code. Try again.")}async joinRoom(e){var c;const t=NE(e);if(t.length<4)throw new Error("Enter a 4-character room code.");await this.ensureAuth();const{db:n,fs:s}=ns(),r=s.doc(n,"rooms",t),o=await s.getDoc(r);if(!o.exists()||((c=o.data())==null?void 0:c.app)!=="settlers")throw new Error("No Settlers table with that code.");const a=o.data();if(a.status==="playing")throw new Error("That table already started.");return this.roomId=t,this.isHost=a.host===this.uid,this.hostUid=a.host,await s.setDoc(r,{updatedAt:s.serverTimestamp(),lastJoiner:this.uid},{merge:!0}),await this._enterRoom(),t}async _enterRoom(){var n,s;this.active=!0,this.status="lobby";const{db:e,fs:t}=ns();this._rtc=OE({uid:this.uid,onMessage:(r,o)=>this._onRtc(r,o),onOpen:r=>{var o,a,c;(a=(o=this.handlers).onLink)==null||a.call(o),this.isHost&&this.handlers.getGame&&((c=this.room)==null?void 0:c.status)==="playing"&&this.broadcastState(this.handlers.getGame())},publishSignal:()=>this.publishPresence(!0)}),this._unsubRoom=t.onSnapshot(t.doc(e,"rooms",this.roomId),r=>{var o,a;this.room={id:r.id,...r.data()},this.hostUid=this.room.host,this.isHost=this.room.host===this.uid,this.status=this.room.status||"lobby",(a=(o=this.handlers).onRoom)==null||a.call(o,this.room)}),this._unsubPlayers=t.onSnapshot(t.collection(e,"rooms",this.roomId,"players"),r=>{const o=[];r.forEach(a=>o.push({id:a.id,data:a.data()})),this._applyPlayers(o),this._pruneStale(r)}),this._pruneTimer=setInterval(()=>this._pruneStale(),nf),await this.publishPresence(!0),(s=(n=this.handlers).onRoster)==null||s.call(n,this.roster)}_applyPlayers(e){var r,o,a;const t=Date.now(),n=e.filter(c=>!sf(c.data,t));n.sort((c,l)=>c.id===this.hostUid?-1:l.id===this.hostUid?1:c.id.localeCompare(l.id)),this.roster=n.map((c,l)=>({uid:c.id,name:c.data.name||"Player",seat:c.data.seat??l,host:c.id===this.hostUid,presenting:!!c.data.presenting}));const s=this.roster.find(c=>c.uid===this.uid);s&&s.seat!=null&&(this.seat=s.seat),(r=this._rtc)==null||r.syncPresence(n),(a=(o=this.handlers).onRoster)==null||a.call(o,this.roster)}_pruneStale(e){const{db:t,fs:n}=ns();if(!t||!this.roomId)return;const s=[];e&&e.forEach(r=>{r.id!==this.uid&&sf(r.data())&&s.push(r.id)});for(const r of s)n.deleteDoc(n.doc(t,"rooms",this.roomId,"players",r)).catch(()=>{})}async publishPresence(e=!1){var o,a,c,l,h;if(!this.active||!this.uid||!this.roomId)return;const t=performance.now();if(!e&&t-this._lastPresence<nf)return;this._lastPresence=t;const{db:n,fs:s}=ns(),r=((o=this._rtc)==null?void 0:o.signalBlob())||{};await s.setDoc(s.doc(n,"rooms",this.roomId,"players",this.uid),{name:((c=(a=this.handlers).playerName)==null?void 0:c.call(a))||"Player",host:this.isHost,seat:this.seat,presenting:!!((h=(l=this.handlers).presenting)!=null&&h.call(l)),updatedAt:s.serverTimestamp(),...r},{merge:!0})}async startTable(e){if(!this.isHost)throw new Error("Only the host can start.");const t=Math.max(2,Math.min(4,e||this.roster.length));if(this.roster.length<2)throw new Error("Need at least two players.");const n={};this.roster.slice(0,t).forEach((o,a)=>{n[o.uid]=a}),this.seat=n[this.uid]??0;const{db:s,fs:r}=ns();await r.setDoc(r.doc(s,"rooms",this.roomId),{status:"playing",playerCount:t,seats:n,updatedAt:r.serverTimestamp()},{merge:!0}),await this.publishPresence(!0)}async setPlayingSeed(e){if(!this.isHost)return;const{db:t,fs:n}=ns();await n.setDoc(n.doc(t,"rooms",this.roomId),{seed:e,updatedAt:n.serverTimestamp()},{merge:!0})}broadcastState(e){var t;!this.isHost||!e||(this._seq+=1,(t=this._rtc)==null||t.broadcast({type:"state",seq:this._seq,snap:e.toSnapshot()}))}sendAction(e){var s,r,o,a;if(this.isHost)return!1;const t=this.hostUid;if(!t||!this._rtc)return(r=(s=this.handlers).onNeedLink)==null||r.call(s),!1;const n=this._rtc.sendTo(t,{type:"act",action:e,seat:this.seat});return n||(a=(o=this.handlers).onNeedLink)==null||a.call(o),n}requestRestart(){return this.isHost?!0:(this.sendAction({k:"restart"}),!1)}_onRtc(e,t){var n,s,r,o,a,c,l,h,u,d;if(t!=null&&t.type){if(t.type==="state"&&t.snap&&!this.isHost){(s=(n=this.handlers).onState)==null||s.call(n,t.snap,t.seq);return}if(t.type==="act"&&this.isHost){if(((r=t.action)==null?void 0:r.k)==="restart")return;const p=((o=this.roster.find(_=>_.uid===e))==null?void 0:o.seat)??t.seat,g=(c=(a=this.handlers).getGame)==null?void 0:c.call(a);if(!g||!BE(g,t.action,p))return;FE(g,t.action,p)&&((h=(l=this.handlers).onHostApplied)==null||h.call(l))}t.type==="pose"&&((d=(u=this.handlers).onPose)==null||d.call(u,e,t))}}broadcastPose(e){var t;(t=this._rtc)==null||t.broadcast({type:"pose",...e})}async leave(){var n;const{db:e,fs:t}=ns();this._unsubRoom&&(this._unsubRoom(),this._unsubRoom=null),this._unsubPlayers&&(this._unsubPlayers(),this._unsubPlayers=null),this._pruneTimer&&(clearInterval(this._pruneTimer),this._pruneTimer=null),(n=this._rtc)==null||n.closeAll(),this._rtc=null,this.uid&&this.roomId&&e&&t.deleteDoc(t.doc(e,"rooms",this.roomId,"players",this.uid)).catch(()=>{}),this.active=!1,this.isHost=!1,this.roomId=null,this.seat=null,this.roster=[],this.room=null,this.status="idle"}}function sf(i,e=Date.now()){var n,s,r;const t=((s=(n=i==null?void 0:i.updatedAt)==null?void 0:n.toMillis)==null?void 0:s.call(n))??((r=i==null?void 0:i.updatedAt)!=null&&r.seconds?i.updatedAt.seconds*1e3:0);return t>0&&e-t>kE}function zE(i){var t,n,s;const e=((n=(t=i==null?void 0:i.updatedAt)==null?void 0:t.toMillis)==null?void 0:n.call(t))??((s=i==null?void 0:i.updatedAt)!=null&&s.seconds?i.updatedAt.seconds*1e3:0);return e>0&&Date.now()-e>600*1e3}let Tn=Ae.antialias;try{const i=localStorage.getItem("catan-antialias");i==="1"?Tn=!0:i==="0"&&(Tn=!1)}catch{}Ae.antialias=Tn;const ai={antialias:Tn};function Mo(i){return i&&(ai.alpha=i.alpha,ai.depth=i.depth,ai.stencil=i.stencil,ai.premultipliedAlpha=i.premultipliedAlpha,ai.preserveDrawingBuffer=i.preserveDrawingBuffer,ai.powerPreference=i.powerPreference,ai.failIfMajorPerformanceCaveat=i.failIfMajorPerformanceCaveat),ai.antialias=Tn,ai.xrCompatible=!1,ai}function VE(){const i=e=>{if(!(e!=null&&e.getContextAttributes)||e.getContextAttributes.__catanAa)return;const t=e.getContextAttributes;e.getContextAttributes=function(){const s=t.call(this);return s&&Mo(s)},e.getContextAttributes.__catanAa=!0};i(WebGLRenderingContext.prototype),typeof WebGL2RenderingContext<"u"&&i(WebGL2RenderingContext.prototype)}VE();const Dr=document.getElementById("scene"),_e=new Jv({canvas:Dr,antialias:Tn,alpha:!0});_e.setPixelRatio(Ae.pixelRatio);_e.setSize(innerWidth,innerHeight);_e.setClearColor(1774607,1);_e.shadowMap.enabled=Ae.shadows;_e.shadowMap.type=ES();_e.xr.enabled=!0;_e.xr.setFramebufferScaleFactor(Ae.framebufferScale);_e.outputColorSpace=Dt;_e.toneMapping=If;_e.toneMappingExposure=1.05;const zn=new Qv,lt=new Je;lt.name="stage";const Ha=-1.32,GE=.4,Yl=.5,kc=.05,rf=90;lt.position.set(0,0,Ha);zn.add(lt);const zt=new fn(60,innerWidth/innerHeight,.05,30);zt.position.set(0,1.17,.62);zn.add(zt);const Nn=new zM(zt,Dr);Nn.target.set(0,.57,Ha);Nn.enableDamping=!0;Nn.enablePan=!1;Nn.maxPolarAngle=Math.PI*.48;Nn.minDistance=.6;Nn.maxDistance=3.2;Nn.mouseButtons.LEFT=Oi.ROTATE;Nn.mouseButtons.MIDDLE=Oi.DOLLY;Nn.mouseButtons.RIGHT=Oi.ROTATE;Nn.touches.ONE=os.ROTATE;Nn.touches.TWO=os.DOLLY_ROTATE;Nn.listenToKeyEvents(window);Dr.addEventListener("contextmenu",i=>i.preventDefault());const Xp=new Ie("#1b140f");zn.background=Xp;zn.fog=new Ua("#1b140f",6,12);const Th=CS(lt);zh(!1);const Ye=new US(lt);Ye.rebuild(new xr({seed:2026}).board);const Vn=new zS(lt),Oe=new VS(lt),li=new $S(zt),vr=kT(),Li=HT(),Bi=new KS(lt),bo=new oE(lt),So=new _E(lt),ln=new kS(zn,lt),Gi=new D,jl=new ii,of=new si,la=new D,hi=new D,ui=new D,af=new D,cf=new D(0,1,0),is=new D,Zn=new D,Cn=new D,lf=new D,ha=new D,cn=new Map;let jn=null,za=!1,co=null,hf="local-floor",to=!1,no=0,wa=!1;const Hc={select:!1,selectstart:!1,selectend:!1},WE=320;let $p=0,Ra=null;const Yp=4,ql=["local-floor","bounded-floor","hand-tracking","transient-pointer","unbounded"],Va=4,XE=.003,uf=.004,df=new RM,Kt=new BM,lo=new Ce;let Pn="controller";try{const i=localStorage.getItem("catan-pointer-mode");(i==="gaze"||i==="controller")&&(Pn=i)}catch{}const Ca=2,ff=20;let ni=0;try{const i=localStorage.getItem("catan-pointer-tilt");i!=null&&(ni=Kp(i))}catch{}let fi=!0;try{const i=localStorage.getItem("catan-pointer-lines");i==="0"?fi=!1:i==="1"&&(fi=!0)}catch{}const Ah=BT();ms();let T=null;gs();let Mr=null,kt=!1,Be=!1,ki=3,Sn="solo",Ga=!0;const pe=new HE;pe.on({playerName:()=>{const i=["Red","Blue","Orange","White"],e=pe.roster.findIndex(t=>t.uid===pe.uid);return e>=0?i[e]:pe.isHost?"Red":"Player"},presenting:()=>_e.xr.isPresenting,getGame:()=>T,onRoster:()=>Sr(),onRoom:i=>{i!=null&&i.seats&&i.seats[pe.uid]!=null&&(pe.seat=i.seats[pe.uid],T&&(T.viewSeat=pe.seat)),Sr()},onState:i=>qE(i),onHostApplied:()=>{T&&pe.isHost&&(pe.broadcastState(T),Ot())},onLink:()=>{pe.isHost&&T&&pe.broadcastState(T)},onNeedLink:()=>pn("Still linking to the host…")});let qn=!1,ps=!0,be="actions",Vt=null,nn=null,hn=Wi(),Is="",Hn=[];const jp=new Set(["settings","settingsBack","passthrough","handles","restart","restartAsk","restartBack","pointer","pointerLines","antialias","pointerTilt","pointerTiltUp","pointerTiltDown","pointerTiltBack"]),$E=new Set(["road","settlement","city","dev","cards"]),qp=new D,YE={[bt.KNIGHT]:"Knight",[bt.ROAD]:"Road Building",[bt.PLENTY]:"Year of Plenty",[bt.MONOPOLY]:"Monopoly"};function Wi(){return Object.fromEntries($e.map(i=>[i,0]))}function Kp(i){const e=Math.round(Number(i)/Ca)*Ca;return Number.isFinite(e)?Math.max(-ff,Math.min(ff,e)):0}function Wa(){return ni>0?`+${ni}°`:`${ni}°`}function pf(i){ni=Kp(i);try{localStorage.setItem("catan-pointer-tilt",String(ni))}catch{}}function $t(){return _e.xr.isPresenting}function gs(){const i=$t();Oe.setVisible(i),i||(li.mesh.visible=!1),document.documentElement.classList.toggle("xr-presenting",i),jE()}function jE(){const i=document.getElementById("hud"),e=document.getElementById("start-screen");!i||!e||(T?(i.classList.remove("hidden"),e.classList.add("hidden"),e.hidden=!0,e.setAttribute("inert","")):(i.classList.add("hidden"),e.classList.remove("hidden"),e.hidden=!1,e.removeAttribute("inert")))}function Qs(i,e){return typeof i!="string"||!i.startsWith(e)?null:i.slice(e.length)}function br(){const i=document.getElementById("player-count");if(i)for(const s of i.children)s.classList.toggle("active",Number(s.dataset.count)===ki);const e=document.getElementById("play-mode");if(e)for(const s of e.children)s.classList.toggle("active",s.dataset.mode===Sn);const t=document.getElementById("mp-panel"),n=document.getElementById("start-btn");t==null||t.classList.toggle("hidden",Sn!=="mp"),n&&(n.classList.toggle("hidden",Sn==="mp"),n.textContent="Begin the voyage"),Sr()}document.getElementById("player-count").addEventListener("click",i=>{const e=i.target.closest("button[data-count]");e&&(ki=Number(e.dataset.count),br(),T||gt())});document.getElementById("play-mode").addEventListener("click",i=>{const e=i.target.closest("button[data-mode]");e&&(Sn=e.dataset.mode,Ga=Sn==="solo",br(),T||gt())});var Sf;(Sf=document.getElementById("mp-create"))==null||Sf.addEventListener("click",()=>Zp());var Ef;(Ef=document.getElementById("mp-join"))==null||Ef.addEventListener("click",()=>Jp());var Tf;(Tf=document.getElementById("mp-begin"))==null||Tf.addEventListener("click",()=>Qp());var Af;(Af=document.getElementById("mp-leave"))==null||Af.addEventListener("click",()=>wh());var wf;(wf=document.getElementById("mp-join-code"))==null||wf.addEventListener("keydown",i=>{i.key==="Enter"&&Jp()});document.getElementById("start-btn").addEventListener("click",()=>{Fe.unlock(),Xi()});window.addEventListener("beforeunload",()=>{pe.active&&pe.leave()});document.getElementById("new-game-btn").addEventListener("click",()=>{tm({fromHud:!0})});po();window.addEventListener("resize",Dm);Dr.addEventListener("pointermove",i=>{if(lo.x=i.clientX/innerWidth*2-1,lo.y=-(i.clientY/innerHeight)*2+1,ls&&Oe.pressAction){const e=i.clientX-ls.x,t=i.clientY-ls.y;e*e+t*t>=256&&Oe.setPressed(null)}});let ls=null;Dr.addEventListener("pointerdown",i=>{var t;if(Fe.unlock(),ls={x:i.clientX,y:i.clientY},_e.xr.isPresenting)return;Kt.setFromCamera(lo,zt);const e=ja(Kt.intersectObjects(To(),!0));((t=e==null?void 0:e.userData)==null?void 0:t.kind)==="tray"&&!e.userData.disabled&&Oe.setPressed(e.userData.action)});Dr.addEventListener("pointerup",i=>{if(!ls||_e.xr.isPresenting)return;const e=i.clientX-ls.x,t=i.clientY-ls.y;ls=null,e*e+t*t<256?PT():Oe.setPressed(null)});function ho(i,e){if(i==="scores"){sm();return}if(i==="settings"){hT();return}if(i==="failBuild"){if(!T)return;const t=e==="roll"?am():e==="end"?"Finish your turn from the panel when it is Main.":e==="trade"?"Bank trades are on your turn after rolling.":cm(e);sr(t,{userData:{kind:"tray",action:e}});return}if(!(!T||kt)){if(i==="steal"){Nr(e);return}if(i==="dev"){const t=Dn(T).id,n=Wt({k:"dev"},()=>T.buyDev(t));if(n===!1){sr(T.whyNotDev(t),{userData:{kind:"tray",action:"dev"}});return}Fe.click(),n!=="sent"&&Ot();return}if(Fe.click(),i==="roll"){Wt({k:"roll"},()=>{const n=T.roll();return n&&(Vn.placeFor(T.current,T.playerCount),Vn.rollTo(n),Fe.dice(),Gh()),!!n})!=="sent"&&Ot();return}if(i==="end"){Wt({k:"end"},()=>T.endTurn())!=="sent"&&Ot();return}if(i==="trade"){dT();return}if(i==="playDev"){Wt({k:"playDev",id:e},()=>T.playDev(e))!=="sent"&&Ot();return}Mr=i,pi()}}ME(ho);let uo=null;var Rf;(Rf=document.getElementById("spot-layer"))==null||Rf.addEventListener("pointerover",i=>{const e=i.target.closest("[data-vertex]");uo=(e==null?void 0:e.dataset.vertex)??null});var Cf;(Cf=document.getElementById("spot-layer"))==null||Cf.addEventListener("pointerout",i=>{const e=i.target.closest("[data-vertex]");e&&uo===e.dataset.vertex&&(uo=null)});var Pf;(Pf=document.getElementById("spot-layer"))==null||Pf.addEventListener("click",i=>{const e=i.target.closest("[data-vertex]");e&&Nh({userData:{kind:"vertex",id:e.dataset.vertex}})});_e.setAnimationLoop(()=>{var t,n,s,r,o,a;const i=df.getDelta();_e.xr.isPresenting||Nn.update(),Vn.update(i);const e=_e.xr.isPresenting&&((n=(t=_e.xr).getCamera)==null?void 0:n.call(t))||zt;if(bo.update(i,e),So.update(i,e),Ye.pulseMarkers(df.elapsedTime),Bi.update(i,_e.xr.isPresenting&&((r=(s=_e.xr).getCamera)==null?void 0:r.call(s))||zt),_e.xr.isPresenting){const c=((a=(o=_e.xr).getCamera)==null?void 0:a.call(o))||zt;li.attach(c),vf(c),ET(),Cm(),ln.update(i,c,Hi)}else li.mesh.visible=!1,vf(zt);FT(),TT(),Th.syncBoardLight(lt.scale.x),pe.active&&pe.publishPresence(),_e.render(zn,zt)});gs();br();La();function Sr(){var o,a;const i=document.getElementById("mp-lobby"),e=document.getElementById("mp-status"),t=document.getElementById("mp-code"),n=document.getElementById("mp-roster"),s=document.getElementById("mp-begin");if(!i)return;const r=pe.active&&Sn==="mp";if(i.classList.toggle("hidden",!r),t&&(t.textContent=pe.roomId||"————"),n){const c=["Red","Blue","Orange","White"];n.innerHTML=pe.roster.map((l,h)=>`<li>${c[h]||`Seat ${h+1}`}${l.host?" · host":""}${l.uid===pe.uid?" · you":""}</li>`).join("")}e&&(pe.active?((o=pe.room)==null?void 0:o.status)==="playing"?e.textContent=pe.isHost?"Table started. Waiting for peers…":"Joined. Waiting for the host to sync the island…":e.textContent=pe.isHost?`Share code ${pe.roomId}. Start when 2–4 people are here.`:`In ${pe.roomId}. Waiting for the host to start.`:e.textContent="Host a table or join with a code. Firebase only joins; the game syncs over WebRTC."),s&&(s.disabled=!pe.isHost||pe.roster.length<2||((a=pe.room)==null?void 0:a.status)==="playing",s.textContent=pe.isHost?"Start table":"Waiting for host"),T||gt()}async function Zp(){const i=document.getElementById("mp-status");try{i&&(i.textContent="Creating room…"),await pe.createRoom(),Sr()}catch(e){i&&(i.textContent=Eh(e))}}async function Jp(){const i=document.getElementById("mp-status"),e=document.getElementById("mp-join-code");try{i&&(i.textContent="Joining…"),await pe.joinRoom(e==null?void 0:e.value),Sr()}catch(t){i&&(i.textContent=Eh(t))}}async function Qp(){const i=document.getElementById("mp-status");try{await pe.startTable(Math.max(2,Math.min(4,pe.roster.length))),Xi()}catch(e){i&&(i.textContent=Eh(e))}}async function wh(){await pe.leave(),Sr()}function qE(i){var s,r,o;const e=T!=null&&T.lastRoll?`${T.lastRoll.playerId}:${(s=T.lastRoll.dice)==null?void 0:s.join(",")}`:"",t=T==null?void 0:T.lastSteal;!T||T.seed!==i.seed||T.playerCount!==i.playerCount?(T=xr.fromSnapshot(i),Ye.rebuild(T.board),Bi.rebuild(T.players),gs()):T.applySnapshot(i),T.viewSeat=pe.seat,ki=T.playerCount,Ga=!1;const n=T.lastRoll?`${T.lastRoll.playerId}:${(r=T.lastRoll.dice)==null?void 0:r.join(",")}`:"";pi(),((o=T.lastAction)==null?void 0:o.type)==="roll"&&n&&n!==e&&(Vn.placeFor(T.current,T.playerCount),Vn.rollTo(T.dice),Fe.dice(),Gh()),T.lastSteal&&T.lastSteal!==t&&Ih(),Vh()}function em(){pe.active&&pe.isHost&&T&&pe.broadcastState(T)}function Wt(i,e){if(pe.active&&!pe.isHost)return pe.sendAction(i),"sent";const t=e();return t&&em(),t}function Xi(){if(Pt(),pe.active&&!pe.isHost){pn("Only the host can start a new island.");return}const i=pe.active?Math.max(2,Math.min(4,pe.roster.length||ki)):ki;if(T=new xr({playerCount:i,solo:pe.active?!1:Ga}),pe.active){for(const e of T.players)e.isAI=!1;T.viewSeat=pe.seat??0,pe.setPlayingSeed(T.seed)}else T.viewSeat=null;kt=!1,Mr=null,Be=!1,be="actions",Vt=null,nn=null,hn=Wi(),Is="",Hn=[],Oe.setHeadline(""),Oe.setScores(ka(T)),Ye.rebuild(T.board),Ye.syncPieces(T),Bi.rebuild(T.players),bo.clear(),So.clear(),Vn.placeFor(T.current,T.playerCount),gs(),pi(),em(),Ot()}function Rh(){Pt(),pe.active&&wh(),T=null,kt=!1,Mr=null,Be=!1,be="actions",Vt=null,nn=null,hn=Wi(),Is="",Hn=[],bo.clear(),So.clear(),Oe.setHeadline(""),Oe.setScores([]),Bi.setCelebrating(null),Oe.setResources(Wi()),gs(),br(),gt(),Rt()}function KE(){return!!T&&T.phase!==F.GAME_OVER}function tm({fromHud:i=!1}={}){if(pe.active&&!pe.isHost){pn("Only the host can start a new island.");return}if(i&&!KE()){Xi();return}if($t()){be="restartConfirm",gt(),Rt(),Fe.click();return}const e=be==="settings"||be==="pointerTilt"||be==="restartConfirm";be="restartConfirm",Be=!0,Gp(t=>{if(Be=!1,t){Xi();return}if(e){be="settings",fo();return}be="actions"})}function nm(){return(T==null?void 0:T.viewSeat)!=null?T.viewSeat:pe.active&&pe.seat!=null?pe.seat:null}function It(){if(!T)return!1;const i=nm();return pe.active?i==null?!1:T.phase===F.DISCARD?T.discardQueue.some(e=>e.player===i):T.current===i:T.phase===F.DISCARD?T.discardQueue.some(e=>!T.player(e.player).isAI):T.isHuman()}function mf(){return!T||kt||Be&&T.phase!==F.STEAL&&T.phase!==F.DISCARD?!1:It()}function Xa(){return T?T.phase===F.SETUP_SETTLEMENT?"settlement":T.phase===F.SETUP_ROAD||T.phase===F.FREE_ROADS?"road":T.phase===F.ROBBER?"robber":Mr:null}function pi(){if(!T)return;Ye.syncPieces(T),vE(T,Xa()),vT();const i=Ir();Oe.setResources((i?T.player(i.player):Dn(T)).resources),Oe.setScores(ka(T)),gt(),be==="scores"&&Be&&!$t()&&Ch(),Rt(),Bi.setCurrent(T.current),Bi.setStealTargets(T.phase===F.STEAL&&It()?T.stealCandidates:null),Bi.setCelebrating(T.phase===F.GAME_OVER?T.winner:null),Vn.placeFor(T.current,T.playerCount)}function gf(){if(!T)return[{label:"Settings",action:"settings"}];const i=It()&&!kt,e=i&&T.playableCards(T.current).length>0,t=T.phase===F.FREE_ROADS;return[{label:"Roll",action:"roll",disabled:!(i&&T.phase===F.ROLL)},{label:"Road",detail:t?"Free":Ni(mt.road),action:"road",disabled:!(i&&(T.phase===F.MAIN&&T.canAfford(T.current,"road")||t))},{label:"Settle",detail:Ni(mt.settlement),action:"settlement",disabled:!(i&&T.phase===F.MAIN)},{label:"City",detail:Ni(mt.city),action:"city",disabled:!(i&&T.phase===F.MAIN)},{label:"Dev",detail:Ni(mt.dev),action:"cards",disabled:!(i&&T.phase===F.MAIN||e)},{label:"Bank",detail:"4:1",action:"trade",disabled:!(i&&T.phase===F.MAIN)},{label:"End Turn",action:"end",disabled:!(i&&T.phase===F.MAIN)},{label:"Scores",action:"scores"},{label:"Settings",action:"settings"}]}function ZE(){return T.stealCandidates.map(i=>{const e=T.player(i);return{label:e.name,action:`steal:${i}`,color:e.color}})}function _f(){return[{label:Pn==="gaze"?"Pointer: Face":"Pointer: Hand",action:"pointer",on:Pn==="gaze"},{label:"Pointer tilt",detail:Wa(),action:"pointerTilt"},{label:fi?"Pointer lines ON":"Pointer lines OFF",action:"pointerLines",on:fi},{label:Tn?"Antialias ON":"Antialias OFF",action:"antialias",on:Tn},{label:qn?"Passthrough ON":"Passthrough OFF",action:"passthrough",on:qn},{label:ps?"Handles ON":"Handles OFF",action:"handles",on:ps},...T?[{label:"Restart game",action:"restartAsk"}]:[],{label:"Back",action:"settingsBack"}]}function yf(){return[{label:"▲ Up",action:"pointerTiltUp"},{label:Wa(),action:"pointerTiltValue",disabled:!0},{label:"▼ Down",action:"pointerTiltDown"},{label:"Back",action:"pointerTiltBack"}]}function JE(){return[{label:"Restart",action:"restart"},{label:"Back",action:"restartBack"}]}function QE(){const i=It()&&!kt,e=T.playableCards(T.current);return[{label:"Buy card",detail:Ni(mt.dev),action:"dev",disabled:!(i&&T.phase===F.MAIN&&T.canAfford(T.current,"dev")&&T.devDeck.length)},...e.map(t=>({label:YE[t.type]||t.type,action:`playDev:${t.id}`})),{label:"Back",action:"cardsBack"}]}function eT(){const i=Dn(T);return[...$e.map(e=>{const t=T.tradeRate(i,e);return{label:rt[e],detail:`Give ${t}:1`,action:`give:${e}`,color:Ln[e],selected:Vt===e,disabled:(i.resources[e]||0)<t}}),...$e.map(e=>({label:rt[e],detail:"Get",action:`get:${e}`,color:Ln[e],selected:nn===e,disabled:e===Vt||(T.bank[e]||0)<1})),{label:Vt?`Bank ${T.tradeRate(i,Vt)}:1`:"Bank 4:1",action:"tradeGo",disabled:!T.canBankTrade(i.id,Vt,nn)},{label:"Cancel",action:"tradeCancel"}]}function tT(){const i=$a();if(!i)return[{label:"Waiting",action:"discardGo",disabled:!0}];const e=T.player(i.player),t=$e.reduce((n,s)=>n+(hn[s]||0),0);return[...$e.map(n=>({label:`${rt[n]} ${hn[n]}/${e.resources[n]}`,action:`discard:${n}`,color:Ln[n],disabled:!e.resources[n]||hn[n]>=e.resources[n]||t>=i.must})),{label:t===i.must?"Discard":`Discard ${t}/${i.must}`,action:"discardGo",disabled:t!==i.must},{label:"Clear",action:"discardClear",disabled:t===0}]}function nT(){return $e.map(i=>({label:rt[i],action:`plenty:${i}`,color:Ln[i],selected:Hn.includes(i)}))}function iT(){return $e.map(i=>({label:rt[i],action:`mono:${i}`,color:Ln[i]}))}function sT(){return[{label:"Back",action:"scoresBack"}]}function rT(){return[{label:"Play Again",action:"restart"},{label:"Main Menu",action:"mainMenu"}]}function oT(){const i=Sn==="mp"?"Multiplayer":Sn==="hotseat"?"Hotseat":"You vs AI",e=[{label:`Players: ${ki}`,action:"titlePlayers",disabled:Sn==="mp"},{label:i,action:"titleMode"}];return Sn==="mp"?pe.active?(e.push({label:`Code ${pe.roomId||"----"}`,action:"titleCode",disabled:!0}),pe.isHost?e.push({label:pe.roster.length<2?"Need 2 players":"Start table",action:"titleBegin",disabled:pe.roster.length<2}):e.push({label:"Waiting for host",action:"titleBegin",disabled:!0}),e.push({label:"Leave room",action:"titleLeave"})):e.push({label:"Host table",action:"titleHost"}):e.push({label:"Begin the voyage",action:"titleStart"}),e.push({label:"Settings",action:"settings"}),e}function im(){if((T==null?void 0:T.phase)!==F.GAME_OVER||T.winner==null){Oe.setHeadline("");return}const i=T.player(T.winner);Oe.setHeadline(`${i.name} Wins!`,i.color)}function Ir(){if(!T)return null;const i=nm();return i!=null&&pe.active?T.discardQueue.find(e=>e.player===i)||null:T.discardQueue.find(e=>!T.player(e.player).isAI)||null}function $a(){const i=Ir(),e=i?`${i.player}:${i.must}`:"";return e!==Is&&(Is=e,hn=Wi()),i}function aT(){if(be==="restartConfirm")return"This starts a new island (same player count and mode).";if(be==="scores"&&T)return"Public VP hides opponents’ victory-point cards.";if(be==="trade"&&T){const e=Dn(T);if(!Vt)return`${e.name} · Bank 4:1 — pick what to give, then Grain or another to get`;const t=T.tradeRate(e,Vt),n=`${t} ${rt[Vt]}`;return nn?`${e.name} · Bank ${t}:1 · ${n} → 1 ${rt[nn]}`:`${e.name} · Give ${n} to the bank — pick what to get`}if(be==="cards"&&T)return`${T.player().name} · Play a card or buy one`;const i=(T==null?void 0:T.phase)===F.DISCARD?Ir():null;if(i){const e=$e.reduce((r,o)=>r+(hn[o]||0),0),t=T.player(i.player),n=vo(T),s=`${t.name} · discard ${e} / ${i.must} on the panel`;return n?`${n.diceLine}
${s}`:s}if((T==null?void 0:T.phase)===F.PLENTY&&It()){const e=Hn.map(t=>rt[t]).join(", ");return e?`${T.player().name} · Picked ${e} (${Hn.length}/2)`:`${T.player().name} · Pick two resources on the panel`}return(T==null?void 0:T.phase)===F.MONOPOLY&&It()?`${T.player().name} · Name a resource on the panel`:T?xE(T):""}function Rt(){const i=In();if(!T){Oe.setStatus(""),$t()&&i?li.set("Point with your view, pinch to select."):$t()||(li.mesh.visible=!1);return}const e=aT(),t=vo(T),n=Lr(T),s=Dp(T),r=n?t?`${t.diceLine} · ${n}`:n:s?t?`${t.banner} · ${s}`:s:t==null?void 0:t.banner;if(Oe.setStatus(e),!$t()){li.mesh.visible=!1;return}i?li.set(r||"Point with your view, pinch to select."):li.set(r||e)}function gt(){if(!T){if(be==="settings"){Oe.setButtons(_f(),"settings");return}if(be==="pointerTilt"){Oe.setButtons(yf(),"pointerTilt");return}if($t()){Oe.setButtons(oT(),"title");return}Oe.setButtons(gf(),"actions");return}if(T.phase!==F.MAIN&&be==="trade"&&(be="actions"),![F.MAIN,F.ROLL].includes(T.phase)&&be==="cards"&&(be="actions"),Ya()&&be==="scores"&&(be="actions"),T.phase===F.STEAL&&It()){Oe.setButtons(ZE(),"steal");return}if(T.phase===F.DISCARD&&Ir()){Oe.setButtons(tT(),"discard");return}if(T.phase===F.PLENTY&&It()){Oe.setButtons(nT(),"plenty");return}if(T.phase===F.MONOPOLY&&It()){Oe.setButtons(iT(),"monopoly");return}if(T.phase===F.GAME_OVER){im(),Oe.setButtons(rT(),"win");return}if(be==="settings"){Oe.setButtons(_f(),"settings");return}if(be==="pointerTilt"){Oe.setButtons(yf(),"pointerTilt");return}if(be==="restartConfirm"){Oe.setButtons(JE(),"restartConfirm");return}if(be==="scores"){Oe.setButtons(sT(),"scores");return}if(be==="trade"){Oe.setButtons(eT(),"trade");return}if(be==="cards"){Oe.setButtons(QE(),"cards");return}Oe.setButtons(gf(),"actions")}function Kl(i){if(i==="settings")be="settings";else if(i==="settingsBack")be="actions";else if(i==="pointerTilt")be="pointerTilt";else if(i==="pointerTiltBack")be="settings";else if(i==="pointerTiltUp")pf(ni+Ca);else if(i==="pointerTiltDown")pf(ni-Ca);else if(i==="restartAsk")if($t())be="restartConfirm";else{tm();return}else if(i==="restartBack")be="settings";else if(i==="passthrough")Hh(!qn);else if(i==="pointer")VT(Pn==="gaze"?"controller":"gaze");else if(i==="pointerLines")GT(!fi);else if(i==="antialias")WT(!Tn);else if(i==="handles")ps=!ps,$T();else if(i==="restart"){Fe.click(),Xi();return}if(i==="settingsBack"&&!$t()){Be=!1,Pt(),gt(),Rt(),Fe.click();return}gt(),Rt(),Fe.click(),fo()}function Ya(){return!T||T.phase===F.GAME_OVER?!0:It()?T.phase===F.STEAL||T.phase===F.DISCARD||T.phase===F.PLENTY||T.phase===F.MONOPOLY:!1}function cT(){return T?Ya():!1}function lT(){return{gaze:Pn==="gaze",tiltLabel:Wa(),lines:fi,antialias:Tn,passthrough:qn,handles:ps,canRestart:!!T}}function fo(){if(!$t()){if(be==="settings"){Be=!0,wE(lT(),i=>Kl(i));return}be==="pointerTilt"&&(Be=!0,RE({tiltLabel:Wa()},i=>Kl(i)))}}function hT(){if(!cT()){if($t()){be="settings",Be=!1,Pt(),gt(),Rt(),Fe.click();return}be="settings",fo(),Fe.click()}}function Ch(){AE(T,()=>{Be=!1,be==="scores"&&(be="actions"),gt(),Rt()})}function sm(){if(!(!T||Ya())){if($t()){be="scores",Be=!1,Pt(),gt(),Rt(),Fe.click();return}be="scores",Be=!0,Ch(),Fe.click()}}function uT(){be==="scores"&&(be="actions"),Be=!1,Pt(),gt(),Rt(),Fe.click()}function dT(){be="trade",Vt=null,nn=null,Be=!0,gt(),Rt(),!$t()&&TE(T,(i,e)=>{if(Be=!1,be="actions",Vt=nn=null,!i||!e){pi();return}const t=Wt({k:"trade",give:i,get:e},()=>T.bankTrade(Dn(T).id,i,e));if(t===!1){pn(T.whyNotBankTrade(Dn(T).id,i,e)||"Cannot make that trade."),pi();return}t!=="sent"&&Ot()})}function fT(){Vt=nn=null,be="actions",Be=!1,Pt(),gt(),Rt(),Fe.click()}function pT(){if(kt||!Vt||!nn)return;const i=Wt({k:"trade",give:Vt,get:nn},()=>T.bankTrade(Dn(T).id,Vt,nn));if(i===!1){pn(T.whyNotBankTrade(Dn(T).id,Vt,nn)||"Cannot make that trade.");return}Vt=nn=null,be="actions",Be=!1,Pt(),Fe.click(),i!=="sent"&&Ot()}function mT(i){if(kt)return;const e=$a();if(!e)return;const t=T.player(e.player),n=$e.reduce((s,r)=>s+(hn[r]||0),0);hn[i]>=t.resources[i]||n>=e.must||(hn[i]+=1,gt(),Rt(),Oe.setResources(t.resources),Fe.click())}function gT(){if(kt)return;const i=$a();if(!i||$e.reduce((s,r)=>s+(hn[r]||0),0)!==i.must)return;const t={...hn},n=Wt({k:"discard",give:t},()=>T.discard(i.player,t));n&&(hn=Wi(),Is="",Be=!1,Pt(),Fe.click(),n!=="sent"&&Ot())}function _T(i){if(!(kt||!T||T.phase!==F.PLENTY||!It())){if(Hn.push(i),Hn.length>=2){const[e,t]=Hn;Hn=[];const n=Wt({k:"plenty",a:e,b:t},()=>T.yearOfPlenty(e,t));if(!n)return;Be=!1,Pt(),Fe.click(),n!=="sent"&&Ot();return}gt(),Rt(),Fe.click()}}function yT(i){if(kt||!T||T.phase!==F.MONOPOLY||!It())return;const e=Wt({k:"mono",r:i},()=>T.monopoly(i));e&&(Be=!1,Pt(),Fe.click(),e!=="sent"&&Ot())}function xT(i){if(i==="mainMenu")return Fe.click(),Rh(),!0;if(i==="titleStart")return Fe.unlock(),Fe.click(),Xi(),!0;if(i==="titleHost")return Fe.unlock(),Zp(),!0;if(i==="titleBegin")return Fe.unlock(),Qp(),!0;if(i==="titleLeave")return wh(),!0;if(i==="titlePlayers")return ki=ki>=4?2:ki+1,br(),gt(),Fe.click(),!0;if(i==="titleMode")return Sn=Sn==="solo"?"hotseat":Sn==="hotseat"?"mp":"solo",Ga=Sn==="solo",br(),gt(),Fe.click(),!0;if(jp.has(i))return Kl(i),!0;if(i==="scores")return sm(),!0;if(i==="scoresBack")return uT(),!0;if(i==="cards")return be="cards",gt(),Rt(),Fe.click(),!0;if(i==="cardsBack")return be="actions",gt(),Rt(),Fe.click(),!0;if(i==="tradeCancel")return fT(),!0;if(i==="tradeGo")return pT(),!0;const e=Pi(Qs(i,"give:"));if(e)return kt||(Vt=e,nn===e&&(nn=null),gt(),Rt(),Fe.click()),!0;const t=Pi(Qs(i,"get:"));if(t)return kt||(nn=t,gt(),Rt(),Fe.click()),!0;const n=Qs(i,"discard:");if(n)return mT(n),!0;if(i==="discardGo")return gT(),!0;if(i==="discardClear")return kt||(hn=Wi(),gt(),Rt(),Fe.click()),!0;const s=Qs(i,"plenty:");if(s)return _T(s),!0;const r=Qs(i,"mono:");if(r)return yT(r),!0;const o=Qs(i,"playDev:");if(o!=null)return be="actions",ho("playDev",o),!0;const a=wT(i);return a!=null?(Nr(a),!0):!1}function vT(){if(!T||!It()){Ye.clearHighlights();return}const i=T.current,e=Xa();if(e==="settlement"){const t=T.phase===F.SETUP_SETTLEMENT;Ye.showVertices(T.validSettlements(i,{setup:t})),Ye.showEdges([]),Ye.showHexes([])}else if(e==="city")Ye.showVertices(T.validCities(i)),Ye.showEdges([]),Ye.showHexes([]);else if(e==="road")Ye.showVertices([]),Ye.showEdges(T.validRoads(i,{setup:T.phase===F.SETUP_ROAD,free:T.phase===F.FREE_ROADS})),Ye.showHexes([]);else if(e==="robber")Ye.showVertices([]),Ye.showEdges([]),Ye.showHexes(T.board.land.filter(t=>t.id!==T.board.robberHex).map(t=>t.id));else if(T.phase===F.MAIN){const t=[];T.canAfford(i,"settlement")&&t.push(...T.validSettlements(i)),T.canAfford(i,"city")&&t.push(...T.validCities(i)),Ye.showVertices(t),Ye.showEdges(T.canAfford(i,"road")?T.validRoads(i):[]),Ye.showHexes([])}else Ye.clearHighlights()}function Ph(i){return jl.setFromRotationMatrix(i.matrixWorld),of.setFromQuaternion(jl,"YXZ"),of.y}function Hi(i,e=Gi){var n;const t=(n=i.joints)==null?void 0:n["index-finger-tip"];return t?t.getWorldPosition(e):i.getWorldPosition(e),e}function Eo(){return ps&&ln.group.visible}const MT=.09;function bT(i,e=MT){if(!Eo())return null;Hi(i,Gi);let t=null,n=e;for(const s of[ln.left,ln.right]){if(ln.isStuck(s))continue;const r=Gi.distanceTo(s.position);r<n&&(n=r,t=s)}return t}function ST(i){var s;if(!Eo()||!i)return null;const e=new D().setFromMatrixPosition(i.matrixWorld),t=new D(0,0,-1).transformDirection(i.matrixWorld);Kt.set(e,t);const n=Kt.intersectObjects(To(),!0);for(const r of n){if(Sm(r.object))continue;const o=(s=r.object.userData)==null?void 0:s.handleRoot;return o?ln.isStuck(o)?null:o:null}return null}function rm(i){if(!i||!Eo())return!1;if(cn.has(i))return!0;const e=bT(i)||ST(i);return e?(Hi(i,Gi),cn.set(i,{handle:e,offset:lt.position.clone().sub(Gi),yaw0:Ph(i),stageYaw0:lt.rotation.y}),ln.stick(e,i),jn=cn.size===2?om():null,Fe.click(),!0):!1}function om(){const[i,e]=cn.keys();return Hi(i,hi),Hi(e,ui),{startDist:Math.max(.08,hi.distanceTo(ui)),startScale:lt.scale.x,startYaw:Math.atan2(ui.x-hi.x,ui.z-hi.z),startStageYaw:lt.rotation.y,startMid:hi.clone().add(ui).multiplyScalar(.5),startPos:lt.position.clone()}}function Lh(i){const e=cn.get(i);if(e&&ln.unstick(e.handle),cn.delete(i),jn=null,cn.size===1){const[t,n]=cn.entries().next().value;Hi(t,Gi),n.offset=lt.position.clone().sub(Gi),n.yaw0=Ph(t),n.stageYaw0=lt.rotation.y}}function Dh(){for(const i of[...cn.keys()])Lh(i)}function ET(){if(!Eo()){cn.size&&Dh();return}if(cn.size===2){jn||(jn=om());const[i,e]=cn.keys();Hi(i,hi),Hi(e,ui);const t=Math.max(.08,hi.distanceTo(ui)),s=Math.atan2(ui.x-hi.x,ui.z-hi.z)-jn.startYaw,r=Math.min(2.4,Math.max(.45,jn.startScale*(t/jn.startDist))),o=r/jn.startScale;lt.scale.setScalar(r),lt.rotation.y=jn.startStageYaw+s,af.copy(hi).add(ui).multiplyScalar(.5),la.copy(jn.startPos).sub(jn.startMid).multiplyScalar(o).applyAxisAngle(cf,s),lt.position.copy(af).add(la);return}for(const[i,e]of cn){Hi(i,Gi);const t=Ph(i)-e.yaw0;la.copy(e.offset).applyAxisAngle(cf,t),lt.position.copy(Gi).add(la),lt.rotation.y=e.stageYaw0+t}}function TT(){const i=document.getElementById("spot-layer");if(!i)return;const e=_e.xr.isPresenting;for(const o of Ye.vertexMarkers.values())for(const a of o.children)a.visible=o.visible&&(e||o===Ye.hoverObj);if(!T||e){i.childElementCount&&i.replaceChildren();return}const t=[];for(const[o,a]of Ye.vertexMarkers)a.visible&&t.push([o,a]);i.childElementCount!==t.length&&i.replaceChildren(...t.map(([o])=>{const a=document.createElement("button");return a.type="button",a.className="spot",a.dataset.vertex=o,a.setAttribute("aria-label","Place here"),a}));const n=innerWidth,s=innerHeight,r=i.children;for(let o=0;o<t.length;o++){const[a,c]=t[o];c.getWorldPosition(is),is.project(zt);const l=r[o];l.dataset.vertex!==a&&(l.dataset.vertex=a);const h=is.z>-1&&is.z<1&&Math.abs(is.x)<=1.2&&Math.abs(is.y)<=1.2;l.style.display=h?"block":"none",l.style.transform=`translate(${is.x*.5*n+n*.5-9}px, ${-is.y*.5*s+s*.5-9}px)`}}function AT(){return!!(T&&!kt&&It()&&T.phase===F.ROLL)}function am(){return!T||kt||!It()||T.phase===F.SETUP_SETTLEMENT||T.phase===F.SETUP_ROAD?"Not your roll":"Already rolled"}function To(){const i=[...ln.pickables(),...Bi.pickables(),...Vn.pickables()];$t()&&i.push(...Oe.pickables());for(const e of Ye.vertexMarkers.values())e.visible&&i.push(e);for(const e of Ye.edgeMarkers.values())e.visible&&i.push(e);for(const e of Ye.hexMarkers.values())e.visible&&e.material.opacity>0&&i.push(e);if(T&&Xa()==="robber"){for(const e of Ye.hexMeshes.values())i.push(e);for(const e of Ye.tokenMeshes.values())i.push(e)}return i}function wT(i){return typeof i!="string"||!i.startsWith("steal:")?null:Number(i.slice(6))}function Ih(){const i=Lr(T);i&&(pn(i,Np,{low:!0}),$t()&&So.spawn(i,Oe.stealFloatWorldPos(qp),uE))}function Nr(i){if(!T||kt||T.phase!==F.STEAL||!It())return!1;const e=Wt({k:"steal",from:Number(i)},()=>T.steal(Number(i)));return e?(Pt(),Be=!1,Fe.click(),e!=="sent"&&(Ih(),Ot()),!0):!1}function Nh(i){if(!i)return;const e=i.userData;if(e.kind==="dice"||e.kind==="tray"&&e.action==="roll"){AT()?(e.kind==="tray"&&Oe.flashPress("roll"),ho("roll")):sr(am(),i);return}if(e.kind==="tray"){if(e.disabled&&!jp.has(e.action)){T&&mf()&&$E.has(e.action)&&(Oe.flashPress(e.action),sr(cm(e.action),i));return}if(Oe.flashPress(e.action),xT(e.action)||!T||e.disabled)return;ho(e.action);return}if(e.kind==="avatar"){Nr(e.id);return}if(T&&mf()){if(e.kind==="vertex"){const t=Xa(),s=Wt({k:t==="city"?"city":"settlement",id:e.id},()=>t==="city"?T.placeCity(e.id):t==="settlement"?T.placeSettlement(e.id):T.placeCity(e.id)||T.placeSettlement(e.id));if(!s){sr(RT(e.id,t),i);return}Ye.flashPick(i),Fe.place(),Mr=null,s!=="sent"&&Ot()}else if(e.kind==="edge"){const t=Wt({k:"road",id:e.id},()=>T.placeRoad(e.id));if(!t){sr(T.whyNotRoad(e.id),i);return}Ye.flashPick(i),Fe.place(),Mr=null,t!=="sent"&&Ot()}else if(e.kind==="hex"){const t=Wt({k:"robber",id:e.id},()=>T.moveRobber(e.id));if(!t)return;Ye.flashPick(i),Fe.place(),t!=="sent"&&T.phase!==F.STEAL&&pn("No neighbor to steal from.",Np),t!=="sent"&&Ot()}}}function cm(i){return i==="road"?T.whyNotRoad():i==="settlement"?T.whyNotSettlement():i==="city"?T.whyNotCity():i==="dev"||i==="cards"?T.whyNotDev():"Can't build"}function RT(i,e){var n;if(e==="city")return T.whyNotCity(i);if(e==="settlement")return T.whyNotSettlement(i);const t=T.board.vertices.get(i);return((n=t==null?void 0:t.building)==null?void 0:n.player)===T.current&&t.building.type==="settlement"?T.whyNotCity(i):T.whyNotSettlement(i)}function CT(i,e){const t=(i==null?void 0:i.userData)||{};if(t.kind==="vertex"){const n=Ye.vertexMarkers.get(t.id);if(n)return n.getWorldPosition(e)}if(t.kind==="edge"){const n=Ye.edgeMarkers.get(t.id);if(n)return n.getWorldPosition(e)}if(t.kind==="hex"){const n=Ye.hexMarkers.get(t.id)||Ye.hexMeshes.get(t.id);if(n)return n.getWorldPosition(e)}return t.kind==="dice"?(i!=null&&i.isObject3D?i:Vn.group).getWorldPosition(e):t.kind==="tray"||t.action?Oe.buttonWorldPos(t.action,e):i!=null&&i.isObject3D?i.getWorldPosition(e):Oe.group.getWorldPosition(e)}function sr(i,e){const t=String(i||"").trim();t&&(Fe.bad(),$t()?So.spawn(t,CT(e,qp)):pn(t))}function ja(i){var r;if(!i.length)return null;if(((r=i[0].object.userData)==null?void 0:r.kind)==="dice")return i[0].object;const e=i.find(o=>{var a;return((a=o.object.userData)==null?void 0:a.kind)==="tray"});if(e)return e.object;const t=i.find(o=>{var a;return((a=o.object.userData)==null?void 0:a.kind)==="avatar"});if(t)return t.object;const n=i.find(o=>{var a;return(a=o.object.userData)==null?void 0:a.handleRoot});if(n)return n.object;const s=i.find(o=>{var a;return((a=o.object.userData)==null?void 0:a.kind)==="vertex"});return s?s.object:i[0].object}function PT(){Kt.setFromCamera(lo,zt),Nh(ja(Kt.intersectObjects(To(),!0)))}function va(i,e){return Kt.set(i,e),ja(Kt.intersectObjects(To(),!0))}function Uh(){var e,t;const i=(t=(e=_e.xr).getSession)==null?void 0:t.call(e);return i?[...i.inputSources]:[]}function qa(i){const e=i==null?void 0:i.targetRayMode;return e==="transient-pointer"||e==="gaze"}function Ao(i){const e=i==null?void 0:i.targetRayMode;return e==="tracked-pointer"||e==="transient-pointer"}function wo(i){var t;if(!i)return!1;const e=(t=i.userData)==null?void 0:t.inputSource;return!e||Ao(e)}function lm(){if(za)return!0;const i=navigator.userAgent||"";if(/visionOS|Apple Vision/i.test(i))return!0;const e=/Safari/.test(i)&&!/Chrome|Chromium|Android|Edg|Firefox|OPR/.test(i);return!!(navigator.xr&&e&&/Macintosh|Apple Vision|iPad|iPhone/.test(i))}function Ka(){return Uh().some(i=>i.targetRayMode==="tracked-pointer")}function LT(i){var n,s;if(!i||i.targetRayMode!=="tracked-pointer")return!1;if((i.profiles||[]).some(r=>/oculus|meta|quest/i.test(r)))return!0;const t=i.gamepad;return!!(t&&(t.mapping==="xr-standard"||(n=t.axes)!=null&&n.length||(s=t.buttons)!=null&&s.length))}function hm(){return Uh().some(LT)}function In(){return _e.xr.isPresenting?Pn==="gaze"?!0:!(hm()||Ka()&&!lm()):!1}function DT(i){var e,t;return(i==null?void 0:i.frame)||((t=(e=_e.xr).getFrame)==null?void 0:t.call(e))||null}function Oh(i){return(i==null?void 0:i.inputSource)||(i==null?void 0:i.data)||null}function Fh(i,e){var n,s;const t=((s=(n=_e.xr).getCamera)==null?void 0:s.call(n))||zt;t.updateMatrixWorld(),t.getWorldPosition(i),t.getWorldDirection(e),ni&&(lf.setFromMatrixColumn(t.matrixWorld,0).normalize(),e.applyAxisAngle(lf,dh.degToRad(ni)).normalize())}function um(i,e,t){var s;i.setFromMatrixPosition(t.matrixWorld);const n=(s=t.joints)==null?void 0:s["index-finger-tip"];n&&n.getWorldPosition(i),e.set(0,0,-1).transformDirection(t.matrixWorld)}function dm(i,e,t,n){var c,l;const s=(l=(c=_e.xr).getReferenceSpace)==null?void 0:l.call(c);if(!n||!(t!=null&&t.targetRaySpace)||!s)return!1;let r=null;try{r=n.getPose(t.targetRaySpace,s)}catch{return!1}if(!r)return!1;const{position:o,orientation:a}=r.transform;return i.set(o.x,o.y,o.z),e.set(0,0,-1).applyQuaternion(jl.set(a.x,a.y,a.z,a.w)),e.normalize(),!0}function fm(i,e,t,n){if(In())return Fh(i,e),!0;const s=Oh(t);return Ao(s)&&dm(i,e,s,DT(t))?!0:n&&wo(n)?(um(i,e,n),!0):!1}function pm(i,e){if(!fm(Zn,Cn,i,e))return In()?Ra:null;const t=va(Zn,Cn);return t||(In()?Ra:null)}function Bh(i,e){if(!Hc[i]){Hc[i]=!0;try{e()}finally{queueMicrotask(()=>{Hc[i]=!1})}}}function mm(i){return!!(In()||Pn==="gaze"||qa(i)||!Ka())}function gm(i){const e=performance.now()-$p;return e<80?!0:mm(i)?e<WE:!1}function _m(){$p=performance.now()}function IT(i,e){return!(!e||!Eo()||qa(i)||!Ka()&&(za||lm()))}function ym(i,e){const t=Oh(i);return!In()&&!Ao(t)&&!wo(e)||gm(t)||e&&cn.has(e)&&!qa(t)?!1:(_m(),Nh(pm(i,e)),!0)}function Zl(i,e){Bh("selectstart",()=>{var s;const t=Oh(i);if(!In()&&!Ao(t)&&!wo(e)||IT(t,e)&&(rm(e),cn.has(e)))return;const n=pm(i,e);((s=n==null?void 0:n.userData)==null?void 0:s.kind)==="tray"&&!n.userData.disabled&&Oe.setPressed(n.userData.action),mm(t)&&ym(i,e)})}function Jl(i,e){Bh("select",()=>{ym(i,e)})}function Ql(i){Bh("selectend",()=>{i&&Lh(i),Oe.setPressed(null)})}function xm(i){Zl(i,null)}function vm(i){Jl(i,null)}function Mm(){Ql(null)}function eh(i){var n,s;const e=(i==null?void 0:i.target)||((s=(n=_e.xr).getSession)==null?void 0:s.call(n));if(!e)return;for(const r of e.inputSources)qa(r)&&(za=!0);const t=Math.max(Yp,e.inputSources.length);for(let r=0;r<t;r++)_e.xr.getController(r);ms()}function NT(i){!i||co===i||(bm(),i.addEventListener("select",vm),i.addEventListener("selectstart",xm),i.addEventListener("selectend",Mm),i.addEventListener("inputsourceschange",eh),co=i,eh({target:i}))}function bm(){const i=co;i&&(i.removeEventListener("select",vm),i.removeEventListener("selectstart",xm),i.removeEventListener("selectend",Mm),i.removeEventListener("inputsourceschange",eh),co=null)}function UT(){const i=[lt];return ln.group.visible&&i.push(ln.group),i}function Sm(i){var t,n,s;if(!i||i.isLine||i.isPoints||i.isSprite||(t=i.userData)!=null&&t.pointerLaser)return!0;const e=i.material;if(e&&(Array.isArray(e)?e:[e]).every(o=>o&&o.transparent&&o.opacity<.02)||(n=i.userData)!=null&&n.gazeHitDot)return!0;for(let r=i;r;r=r.parent)if(r===vr||r===Li||r===li.mesh||(s=r.userData)!=null&&s.pointerLaser)return!0;return!1}function Em(i,e){const t=-Math.min(Va,Math.max(.02,e)),n=i.geometry.attributes.position;n.getZ(1)!==t&&(n.setZ(1,t),n.needsUpdate=!0,i.geometry.computeBoundingSphere())}function kh(i,e,t=Va){const n=Kt.near,s=Kt.far;Kt.near=0,Kt.far=t,Kt.set(i,e);const r=Kt.intersectObjects(UT(),!0);Kt.near=n,Kt.far=s;for(const o of r)if(!Sm(o.object))return o;return null}function Tm(i,e){const t=kh(i,e);return t?Math.max(.02,t.distance-XE):Va}function OT(){if(fi)for(const i of Ah){const e=i.userData.laser;e&&(Zn.setFromMatrixPosition(i.matrixWorld),Cn.set(0,0,-1).transformDirection(i.matrixWorld).normalize(),Em(e,Tm(Zn,Cn)))}}function xf(i,e){var t,n,s;return((t=i==null?void 0:i.userData)==null?void 0:t.kind)==="tray"||((n=i==null?void 0:i.userData)==null?void 0:n.kind)==="dice"||(s=i==null?void 0:i.userData)!=null&&s.handleRoot?{obj:i,done:!0}:i&&!e?{obj:i,done:!1}:{obj:e,done:!1}}function FT(){var e,t;let i=null;if(_e.xr.isPresenting){if(OT(),In())Fh(Zn,Cn),i=va(Zn,Cn);else{const n=((t=(e=_e.xr).getFrame)==null?void 0:t.call(e))||null;for(const s of Uh()){if(!Ao(s)||!dm(Zn,Cn,s,n))continue;const r=xf(va(Zn,Cn),i);if(i=r.obj,r.done)break}if(!i)for(const s of Ah){if(!s.visible||!wo(s))continue;um(Zn,Cn,s);const r=xf(va(Zn,Cn),i);if(i=r.obj,r.done)break}}Ra=i}else Kt.setFromCamera(lo,zt),i=ja(Kt.intersectObjects(To(),!0)),uo&&(i={userData:{kind:"vertex",id:uo}});zT(),Oe.setHover(i),ln.setHover(i),Bi.setHover(i),Ye.setHover(i),Vn.setHover(i)}function BT(){const i=new Xb,e=new qb;e.setPath("https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles");const t=new Oa({color:16770736}),n=[];for(let s=0;s<Yp;s++){const r=_e.xr.getController(s),o=new sn().setFromPoints([new D(0,0,0),new D(0,0,-Va)]),a=new go(o,t);if(a.userData.pointerLaser=!0,r.userData.laser=a,r.add(a),r.addEventListener("selectstart",c=>{Zl(c,r)}),r.addEventListener("selectend",()=>{Ql(r)}),r.addEventListener("select",c=>{Jl(c,r)}),r.addEventListener("squeezestart",()=>{rm(r)||(T==null?void 0:T.phase)===F.MAIN&&It()&&!kt&&ho("end")}),r.addEventListener("squeezeend",()=>{Lh(r)}),zn.add(r),s<2){const c=_e.xr.getControllerGrip(s);c.add(i.createControllerModel(c)),zn.add(c);const l=_e.xr.getHand(s);l.add(e.createHandModel(l,"mesh")),l.addEventListener("pinchstart",()=>{var d,p,g;const u={inputSource:((d=l.userData)==null?void 0:d.inputSource)||null,frame:(g=(p=_e.xr).getFrame)==null?void 0:g.call(p)};Zl(u,l),Jl(u,l)}),l.addEventListener("pinchend",()=>Ql(l)),zn.add(l)}n.push(r)}return n}function kT(){const i=new Je,e=new ie(new yo(.0055,.0088,16),new ot({color:16769162,side:tn,depthTest:!1,depthWrite:!1,toneMapped:!1})),t=new ie(new _o(.0032,8),new ot({color:16775388,depthTest:!1,depthWrite:!1,toneMapped:!1}));return e.renderOrder=26,t.renderOrder=27,i.add(e,t),i.position.set(0,0,-.5),i.renderOrder=25,i.frustumCulled=!1,i.visible=!1,zt.add(i),i}function HT(){const i=new Je;i.userData.gazeHitDot=!0;const e=new ie(new Zt(.005,8,6),new ot({color:16775388,toneMapped:!1,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),t=new ie(new Zt(.009,8,6),new ot({color:16769162,toneMapped:!1,depthWrite:!1,transparent:!0,opacity:.9,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));return e.renderOrder=29,t.renderOrder=28,e.frustumCulled=!1,t.frustumCulled=!1,i.add(t,e),i.frustumCulled=!1,i.visible=!1,zn.add(i),i}function Am(i){return i?(Li.position.copy(i.point),i.normal&&i.normal.lengthSq()>1e-8?(ha.copy(i.normal).normalize(),ha.dot(Cn)>0&&ha.negate(),Li.position.addScaledVector(ha,uf)):Li.position.addScaledVector(Cn,-uf),Li.visible=!0,!0):(Li.visible=!1,!1)}function zT(){if(!_e.xr.isPresenting||!In()){Li.visible=!1;return}Am(kh(Zn,Cn))}function vf(i){if(!i||vr.parent===i){ms();return}i.add(vr),ms()}function VT(i){Pn=i==="gaze"?"gaze":"controller";try{localStorage.setItem("catan-pointer-mode",Pn)}catch{}ms(),(In()||Pn==="gaze")&&(pn("Point with your view, pinch to select."),_e.xr.isPresenting&&li.set("Point with your view, pinch to select."))}function ms(){const i=In();vr&&(vr.visible=!1),(!_e.xr.isPresenting||!i)&&(Li.visible=!1);for(const e of Ah){const t=e.userData.laser;t&&(t.visible=fi&&Pn!=="gaze"&&!i&&!!e.visible&&wo(e))}}function GT(i){fi=!!i;try{localStorage.setItem("catan-pointer-lines",fi?"1":"0")}catch{}ms()}function WT(i){Tn=!!i,Ae.antialias=Tn,Mo();try{localStorage.setItem("catan-antialias",Tn?"1":"0")}catch{}XT()}function XT(){try{const i=_e.getRenderTarget();i&&"samples"in i&&(i.samples=Tn?4:0)}catch{}}function Hh(i){qn=!!i,Th.room.visible=!qn,zn.background=qn?null:Xp,zn.fog=qn?null:new Ua("#1b140f",6,12),_e.setClearColor(qn?0:1774607,qn?0:1),_e.setClearAlpha(qn?0:1)}function zh(i){_e.xr.setFramebufferScaleFactor(Ae.framebufferScale),Mo(),SS(_e,Th.sun,{enabled:i?Ae.xrShadows:Ae.shadows,size:i?Ae.xrShadowSize:Ae.shadowSize})}function $T(){ln.setVisible(ps&&_e.xr.isPresenting),ln.group.visible||Dh()}function YT(){lt.position.set(0,0,Ha)}function jT(){to=!0,no=0,wa=!1}function qT(){return lt.position.y+En*Math.max(1e-4,lt.scale.y)}function wm(i){const e=Math.min(Yl,Math.max(.35,GE));return Math.max(i-e,i-Yl)}function Rm(i){const e=Math.max(1e-4,lt.scale.y),t=wm(i);lt.position.set(0,t-En*e,Ha)}function KT(i){const e=i-Yl,t=qT();return t+1e-4>=e?!1:(lt.position.y+=wm(i)-t,!0)}function ZT(){var t,n,s,r;const i=(n=(t=_e.xr).getFrame)==null?void 0:n.call(t),e=(r=(s=_e.xr).getReferenceSpace)==null?void 0:r.call(s);if(i&&e)try{const o=i.getViewerPose(e);if(o){const a=o.transform.position;return{x:a.x,y:a.y,z:a.z}}}catch{}return null}function JT(i){if(!i||!Number.isFinite(i.y))return!1;const e=Math.abs(i.x),t=Math.abs(i.y),n=Math.abs(i.z);return!(e<kc&&t<kc&&n<kc)}function QT(i){var t,n;if(i&&Number.isFinite(i.y))return i.y;const e=(n=(t=_e.xr).getCamera)==null?void 0:n.call(t);return e!=null&&e.position&&Number.isFinite(e.position.y)?e.position.y:0}function Cm(){if(!_e.xr.isPresenting||wa)return;if(cn.size){wa=!0,to=!1;return}no++;const i=ZT(),e=JT(i);if(!e&&no<rf)return;const t=QT(i);to?(Rm(t),(e||no>=rf)&&(to=!1)):KT(t)}async function eA(i){const e=["local-floor","bounded-floor","local"];for(const t of e)try{return await i.requestReferenceSpace(t),hf=t,_e.xr.setReferenceSpaceType(t),t}catch{}return hf="local",_e.xr.setReferenceSpaceType("local"),"local"}_e.xr.addEventListener("sessionstart",()=>{Pa=!0,jT(),gs(),gt(),Rt()});_e.xr.addEventListener("sessionend",()=>{th()});function tA(){if(gs(),!$t()){if(be==="settings"||be==="pointerTilt"){fo();return}if(be==="restartConfirm"){Be=!0,Gp(i=>{if(Be=!1,i){Xi();return}be="settings",fo()});return}if(be==="scores"&&T&&!Ya()){Be=!0,Ch();return}if((T==null?void 0:T.phase)===F.GAME_OVER){Be=!0,Vp(T,{onPlayAgain:()=>Xi(),onMainMenu:()=>Rh()});return}nA()}}function nA(){if(!(!T||$t())){if(T.phase===F.DISCARD&&Ir()){Be=!0,Fp(T,(e,t)=>{Be=!1,hn=Wi(),Is="";const n=Wt({k:"discard",give:t},()=>T.discard(e,t));n&&n!=="sent"&&Ot()})||(Be=!1);return}if(T.phase===F.STEAL&&It()){Be=!0,Bp(T,i=>{Nr(i)});return}if(T.phase===F.PLENTY&&It()){Be=!0,kp((i,e)=>{Be=!1,Hn=[];const t=Wt({k:"plenty",a:i,b:e},()=>T.yearOfPlenty(i,e));t&&t!=="sent"&&Ot()});return}T.phase===F.MONOPOLY&&It()&&(Be=!0,Hp(i=>{Be=!1;const e=Wt({k:"mono",r:i},()=>T.monopoly(i));e&&e!=="sent"&&Ot()}))}}let tr=0,zc=!1,Pa=!1;function Pm(i){return!i||i.ended===!0}function Lm(){var e,t;Mo();const i=(t=(e=_e.xr).getSession)==null?void 0:t.call(e);Pm(i)&&(_e.xr.isPresenting=!1)}function iA(){try{_e.setPixelRatio(Ae.pixelRatio),_e.setSize(innerWidth,innerHeight,!1)}catch{}Dm()}function po(){const i=document.getElementById("vr-btn");i&&(i.disabled=!1,i.removeAttribute("disabled"),i.removeEventListener("click",bf),i.addEventListener("click",bf))}function th(){if(!zc){if(!Pa&&!document.documentElement.classList.contains("xr-presenting")&&!_e.xr.isPresenting){po(),La();return}zc=!0,Pa=!1,tr+=1;try{bm(),za=!1,Dh(),to=!1,no=0,wa=!1,Ra=null,YT(),Lm(),ln.setVisible(!1),zh(!1),Hh(!1),document.documentElement.classList.remove("xr-presenting"),iA(),ms(),tA(),po(),La()}finally{zc=!1}}}async function Mf(i,e){const t={requiredFeatures:["local-floor"],optionalFeatures:[...ql,"dom-overlay","hit-test","plane-detection"],domOverlay:{root:e}},n={optionalFeatures:[...ql]};try{return await navigator.xr.requestSession(i,t)}catch{return await navigator.xr.requestSession(i,n)}}async function bf(){var s,r,o,a,c,l,h,u;if(Fe.unlock(),!navigator.xr){pn("WebXR is not available in this browser.");return}if(Lm(),_e.xr.isPresenting&&!Pm((r=(s=_e.xr).getSession)==null?void 0:r.call(s)))return;const i=++tr,e=document.getElementById("overlay-root")||document.getElementById("hud"),t=await((a=(o=navigator.xr).isSessionSupported)==null?void 0:a.call(o,"immersive-ar")),n=await((l=(c=navigator.xr).isSessionSupported)==null?void 0:l.call(c,"immersive-vr"));if(i===tr)try{let d=null,p=!1;if(t)try{d=await Mf("immersive-ar",e),p=!0}catch{d=null}if(i!==tr){(h=d==null?void 0:d.end)==null||h.call(d).catch(()=>{});return}if(!d&&n&&(d=await Mf("immersive-vr",e)),i!==tr){(u=d==null?void 0:d.end)==null||u.call(d).catch(()=>{});return}if(!d){pn("This browser has no AR or VR session."),po(),La();return}if(d.addEventListener("end",th),await eA(d),zh(!0),Hh(p),ln.setVisible(ps),document.documentElement.classList.add("xr-presenting"),Pa=!0,Pt(),NT(d),Mo(),await _e.xr.setSession(d),i!==tr){d.end().catch(()=>{});return}gs(),gt(),Rt(),ms(),(In()||Pn==="gaze")&&pn("Point with your view, pinch to select.")}catch{th(),pn("Could not start a mixed-reality session.")}}async function La(){var n,s,r,o;const i=document.getElementById("vr-btn");if(!i)return;po();const e=navigator.xr&&await((s=(n=navigator.xr).isSessionSupported)==null?void 0:s.call(n,"immersive-ar")),t=navigator.xr&&await((o=(r=navigator.xr).isSessionSupported)==null?void 0:o.call(r,"immersive-vr"));e?(i.textContent="Enter MR",i.disabled=!1):t?(i.textContent="Enter VR",i.disabled=!1):(i.textContent="MR unavailable",i.disabled=!0)}function sA(){return pe.active||!T||T.phase===F.GAME_OVER?!1:T.phase===F.DISCARD?T.discardQueue.some(i=>T.player(i.player).isAI):T.player().isAI}async function Ot(){const i=T;pi();try{await rA()}finally{if(T!==i)return;pi(),Vh()}}function Vc(){if(!T||T.phase!==F.DISCARD)return;let i=0;for(;T.discardQueue.some(e=>T.player(e.player).isAI)&&i++<8&&Tp(T););}async function rA(){var e,t;const i=T;if(i){kt=!0;try{Vc();let n=0,s=null;for(;sA()&&n++<80;){if(await Gc(i.phase===F.MAIN||i.phase===F.ROLL?700:220),T!==i)return;const r=Tp(i),o=i.lastAction;if((o==null?void 0:o.type)==="roll"&&o!==s){s=o,Vn.placeFor(i.current,i.playerCount),Vn.rollTo(i.dice),Fe.dice(),(e=o.production)!=null&&e.length&&Gh(o.production),Vc(),pi();const a=(t=o.production)!=null&&t.length?Math.min(4500,Math.max(750,Math.ceil(bo.timeLeft()*1e3))):650;if(await Gc(a),T!==i)return}else if(Vc(),pi(),(o==null?void 0:o.type)==="steal"&&i.lastSteal&&(Ih(),await Gc(1800),T!==i))return;if(!r)break}}finally{T===i&&(kt=!1)}}}function Vh(){if(!T)return;const i=$t();if(T.phase===F.GAME_OVER){Fe.win(),Be=!0,im(),i||Vp(T,{onPlayAgain:()=>Xi(),onMainMenu:()=>Rh()}),gt(),Rt();return}if(T.phase===F.DISCARD&&Ir()){Be=!0,$a(),i||Fp(T,(t,n)=>{Be=!1,hn=Wi(),Is="";const s=Wt({k:"discard",give:n},()=>T.discard(t,n));s&&s!=="sent"&&Ot()})||(Be=!1),gt(),Rt();return}if(T.phase===F.STEAL&&It()){Be=!0,i||Bp(T,e=>{Nr(e)});return}if(T.phase===F.PLENTY&&It()){Be=!0,Hn=[],i||kp((e,t)=>{Be=!1,Hn=[];const n=Wt({k:"plenty",a:e,b:t},()=>T.yearOfPlenty(e,t));n&&n!=="sent"&&Ot()}),gt(),Rt();return}T.phase===F.MONOPOLY&&It()&&(Be=!0,i||Hp(e=>{Be=!1;const t=Wt({k:"mono",r:e},()=>T.monopoly(e));t&&t!=="sent"&&Ot()}),gt(),Rt())}function Dm(){zt.aspect=innerWidth/innerHeight,zt.updateProjectionMatrix(),_e.setSize(innerWidth,innerHeight)}function Gh(i){var t;const e=i??(((t=T==null?void 0:T.lastAction)==null?void 0:t.type)==="roll"?T.lastAction.production:null);!T||!(e!=null&&e.length)||bo.play(e,{board:T.board,players:T.players,playerCount:T.playerCount})}function Gc(i){return new Promise(e=>setTimeout(e,i))}window.__catan={get game(){return T},get tray(){return Oe},get trayScreen(){return be},get pointerMode(){return Pn},get pointerPitchDeg(){return ni},get gazeReticle(){return vr},get gazeHitDot(){return Li},fillGazeRay:Fh,firstWorldHit:kh,placeGazeHitDot:Am,get xrOptionalFeatures(){return ql},get xrSessionBound(){return co},get quality(){return Ae},fillPickRay:fm,isDuplicateXRSelect:gm,markXRSelectHandled:_m,applyStageTableSnap:Rm,maybeSnapStageToTable:Cm,pointerLaserHitDistance:Tm,setLaserLength:Em,useHeadHover:In,hasPersistentPointer:Ka,hasTrackedController:hm,afterAction:Ot,refresh:pi,presentModals:Vh,trySteal:Nr,formatRollResult:vo,formatStealResult:Lr};
