(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fl="170",Pi={ROTATE:0,DOLLY:1,PAN:2},Qi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Yp=0,Eh=1,jp=2,Bl=1,Wd=2,Mi=3,Ni=0,dn=1,Jt=2,is=0,Ks=1,Th=2,Ah=3,wh=4,qp=5,ys=100,Kp=101,Zp=102,Jp=103,Qp=104,em=200,tm=201,nm=202,im=203,wc=204,Rc=205,sm=206,rm=207,om=208,am=209,cm=210,lm=211,hm=212,um=213,dm=214,Cc=0,Pc=1,Lc=2,nr=3,Dc=4,Ic=5,Nc=6,Uc=7,Xd=0,fm=1,pm=2,ss=0,mm=1,gm=2,_m=3,$d=4,xm=5,vm=6,ym=7,Rh="attached",Mm="detached",Yd=300,ir=301,sr=302,Oc=303,Fc=304,xa=306,os=1e3,es=1001,ha=1002,fn=1003,jd=1004,kr=1005,zt=1006,Qo=1007,Ai=1008,Ui=1009,qd=1010,Kd=1011,$r=1012,kl=1013,Es=1014,qn=1015,ro=1016,zl=1017,Hl=1018,rr=1020,Zd=35902,Jd=1021,Qd=1022,Nn=1023,ef=1024,tf=1025,Zs=1026,or=1027,Vl=1028,Gl=1029,nf=1030,Wl=1031,Xl=1033,ea=33776,ta=33777,na=33778,ia=33779,Bc=35840,kc=35841,zc=35842,Hc=35843,Vc=36196,Gc=37492,Wc=37496,Xc=37808,$c=37809,Yc=37810,jc=37811,qc=37812,Kc=37813,Zc=37814,Jc=37815,Qc=37816,el=37817,tl=37818,nl=37819,il=37820,sl=37821,sa=36492,rl=36494,ol=36495,sf=36283,al=36284,cl=36285,ll=36286,Yr=2300,jr=2301,Fa=2302,Ch=2400,Ph=2401,Lh=2402,Sm=2500,bm=0,rf=1,hl=2,Em=3200,Tm=3201,of=0,Am=1,Ji="",Lt="srgb",mn="srgb-linear",va="linear",mt="srgb",Ls=7680,Dh=519,wm=512,Rm=513,Cm=514,af=515,Pm=516,Lm=517,Dm=518,Im=519,ul=35044,Nm=35048,Ih="300 es",wi=2e3,ua=2001;class Rs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nh=1234567;const Vr=Math.PI/180,ar=180/Math.PI;function Kn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function Zt(i,e,t){return Math.max(e,Math.min(t,i))}function $l(i,e){return(i%e+e)%e}function Um(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Om(i,e,t){return i!==e?(t-i)/(e-i):0}function Gr(i,e,t){return(1-t)*i+t*e}function Fm(i,e,t,n){return Gr(i,e,1-Math.exp(-t*n))}function Bm(i,e=1){return e-Math.abs($l(i,e*2)-e)}function km(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function zm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Hm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Vm(i,e){return i+Math.random()*(e-i)}function Gm(i){return i*(.5-Math.random())}function Wm(i){i!==void 0&&(Nh=i);let e=Nh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Xm(i){return i*Vr}function $m(i){return i*ar}function Ym(i){return(i&i-1)===0&&i!==0}function jm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function qm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Km(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Yn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function dt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Yl={DEG2RAD:Vr,RAD2DEG:ar,generateUUID:Kn,clamp:Zt,euclideanModulo:$l,mapLinear:Um,inverseLerp:Om,lerp:Gr,damp:Fm,pingpong:Bm,smoothstep:km,smootherstep:zm,randInt:Hm,randFloat:Vm,randFloatSpread:Gm,seededRandom:Wm,degToRad:Xm,radToDeg:$m,isPowerOfTwo:Ym,ceilPowerOfTwo:jm,floorPowerOfTwo:qm,setQuaternionFromProperEuler:Km,normalize:dt,denormalize:Yn};class Re{constructor(e=0,t=0){Re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,n,s,r,o,a,c,l){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],M=s[1],b=s[4],x=s[7],C=s[2],T=s[5],w=s[8];return r[0]=o*_+a*M+c*C,r[3]=o*m+a*b+c*T,r[6]=o*f+a*x+c*w,r[1]=l*_+h*M+u*C,r[4]=l*m+h*b+u*T,r[7]=l*f+h*x+u*w,r[2]=d*_+p*M+g*C,r[5]=d*m+p*b+g*T,r[8]=d*f+p*x+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=t*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ba.makeScale(e,t)),this}rotate(e){return this.premultiply(Ba.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ba.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ba=new He;function cf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Zm(){const i=qr("canvas");return i.style.display="block",i}const Uh={};function zr(i){i in Uh||(Uh[i]=!0,console.warn(i))}function Jm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Qm(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function eg(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ke={enabled:!0,workingColorSpace:mn,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===mt&&(i.r=Li(i.r),i.g=Li(i.g),i.b=Li(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===mt&&(i.r=Js(i.r),i.g=Js(i.g),i.b=Js(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ji?va:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Js(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Oh=[.64,.33,.3,.6,.15,.06],Fh=[.2126,.7152,.0722],Bh=[.3127,.329],kh=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zh=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ke.define({[mn]:{primaries:Oh,whitePoint:Bh,transfer:va,toXYZ:kh,fromXYZ:zh,luminanceCoefficients:Fh,workingColorSpaceConfig:{unpackColorSpace:Lt},outputColorSpaceConfig:{drawingBufferColorSpace:Lt}},[Lt]:{primaries:Oh,whitePoint:Bh,transfer:mt,toXYZ:kh,fromXYZ:zh,luminanceCoefficients:Fh,outputColorSpaceConfig:{drawingBufferColorSpace:Lt}}});let Ds;class tg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ds===void 0&&(Ds=qr("canvas")),Ds.width=e.width,Ds.height=e.height;const n=Ds.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ds}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Li(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Li(t[n]/255)*255):t[n]=Li(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ng=0;class lf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ng++}),this.uuid=Kn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ka(s[o].image)):r.push(ka(s[o]))}else r=ka(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ka(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?tg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ig=0;class Ht extends Rs{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,n=es,s=es,r=zt,o=Ai,a=Nn,c=Ui,l=Ht.DEFAULT_ANISOTROPY,h=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ig++}),this.uuid=Kn(),this.name="",this.source=new lf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case os:e.x=e.x-Math.floor(e.x);break;case es:e.x=e.x<0?0:1;break;case ha:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case os:e.y=e.y-Math.floor(e.y);break;case es:e.y=e.y<0?0:1;break;case ha:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=Yd;Ht.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,x=(p+1)/2,C=(f+1)/2,T=(h+d)/4,w=(u+_)/4,L=(g+m)/4;return b>x&&b>C?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=T/n,r=w/n):x>C?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=T/s,r=L/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=w/r,s=L/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sg extends Rs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ht(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new lf(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ts extends sg{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class hf extends Ht{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class rg extends Ht{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=es,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==p||h!==g){let m=1-a;const f=c*d+l*p+h*g+u*_,M=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const C=Math.sqrt(b),T=Math.atan2(C,f*M);m=Math.sin(m*T)/C,a=Math.sin(a*T)/C}const x=a*M;if(c=c*m+d*x,l=l*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-a*p,e[t+2]=l*g+h*p+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Zt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return za.copy(this).projectOnVector(e),this.sub(za)}reflect(e){return this.sub(za.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Zt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const za=new P,Hh=new Jn;class zi{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(zn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(zn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=zn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,zn):zn.fromBufferAttribute(r,o),zn.applyMatrix4(e.matrixWorld),this.expandByPoint(zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),xo.copy(n.boundingBox)),xo.applyMatrix4(e.matrixWorld),this.union(xo)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,zn),zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rr),vo.subVectors(this.max,Rr),Is.subVectors(e.a,Rr),Ns.subVectors(e.b,Rr),Us.subVectors(e.c,Rr),Gi.subVectors(Ns,Is),Wi.subVectors(Us,Ns),hs.subVectors(Is,Us);let t=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-hs.z,hs.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,hs.z,0,-hs.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-hs.y,hs.x,0];return!Ha(t,Is,Ns,Us,vo)||(t=[1,0,0,0,1,0,0,0,1],!Ha(t,Is,Ns,Us,vo))?!1:(yo.crossVectors(Gi,Wi),t=[yo.x,yo.y,yo.z],Ha(t,Is,Ns,Us,vo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(mi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const mi=[new P,new P,new P,new P,new P,new P,new P,new P],zn=new P,xo=new zi,Is=new P,Ns=new P,Us=new P,Gi=new P,Wi=new P,hs=new P,Rr=new P,vo=new P,yo=new P,us=new P;function Ha(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){us.fromArray(i,r);const a=s.x*Math.abs(us.x)+s.y*Math.abs(us.y)+s.z*Math.abs(us.z),c=e.dot(us),l=t.dot(us),h=n.dot(us);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const og=new zi,Cr=new P,Va=new P;class li{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):og.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cr.subVectors(e,this.center);const t=Cr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Cr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Va.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cr.copy(e.center).add(Va)),this.expandByPoint(Cr.copy(e.center).sub(Va))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const gi=new P,Ga=new P,Mo=new P,Xi=new P,Wa=new P,So=new P,Xa=new P;class mr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gi.copy(this.origin).addScaledVector(this.direction,t),gi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ga.copy(e).add(t).multiplyScalar(.5),Mo.copy(t).sub(e).normalize(),Xi.copy(this.origin).sub(Ga);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Mo),a=Xi.dot(this.direction),c=-Xi.dot(Mo),l=Xi.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ga).addScaledVector(Mo,d),p}intersectSphere(e,t){gi.subVectors(e.center,this.origin);const n=gi.dot(this.direction),s=gi.dot(gi)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,gi)!==null}intersectTriangle(e,t,n,s,r){Wa.subVectors(t,e),So.subVectors(n,e),Xa.crossVectors(Wa,So);let o=this.direction.dot(Xa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Xi.subVectors(this.origin,e);const c=a*this.direction.dot(So.crossVectors(Xi,So));if(c<0)return null;const l=a*this.direction.dot(Wa.cross(Xi));if(l<0||c+l>o)return null;const h=-a*Xi.dot(Xa);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fe{constructor(e,t,n,s,r,o,a,c,l,h,u,d,p,g,_,m){Fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,p,g,_,m)}set(e,t,n,s,r,o,a,c,l,h,u,d,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Fe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Os.setFromMatrixColumn(e,0).length(),r=1/Os.setFromMatrixColumn(e,1).length(),o=1/Os.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ag,e,cg)}lookAt(e,t,n){const s=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),$i.crossVectors(n,bn),$i.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),$i.crossVectors(n,bn)),$i.normalize(),bo.crossVectors(bn,$i),s[0]=$i.x,s[4]=bo.x,s[8]=bn.x,s[1]=$i.y,s[5]=bo.y,s[9]=bn.y,s[2]=$i.z,s[6]=bo.z,s[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],M=n[3],b=n[7],x=n[11],C=n[15],T=s[0],w=s[4],L=s[8],E=s[12],y=s[1],D=s[5],V=s[9],H=s[13],$=s[2],Z=s[6],X=s[10],Q=s[14],W=s[3],oe=s[7],de=s[11],Ee=s[15];return r[0]=o*T+a*y+c*$+l*W,r[4]=o*w+a*D+c*Z+l*oe,r[8]=o*L+a*V+c*X+l*de,r[12]=o*E+a*H+c*Q+l*Ee,r[1]=h*T+u*y+d*$+p*W,r[5]=h*w+u*D+d*Z+p*oe,r[9]=h*L+u*V+d*X+p*de,r[13]=h*E+u*H+d*Q+p*Ee,r[2]=g*T+_*y+m*$+f*W,r[6]=g*w+_*D+m*Z+f*oe,r[10]=g*L+_*V+m*X+f*de,r[14]=g*E+_*H+m*Q+f*Ee,r[3]=M*T+b*y+x*$+C*W,r[7]=M*w+b*D+x*Z+C*oe,r[11]=M*L+b*V+x*X+C*de,r[15]=M*E+b*H+x*Q+C*Ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*p-n*c*p)+_*(+t*c*p-t*l*d+r*o*d-s*o*p+s*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+f*(-s*a*h-t*c*u+t*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],M=u*m*l-_*d*l+_*c*p-a*m*p-u*c*f+a*d*f,b=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,x=h*_*l-g*u*l+g*a*p-o*_*p-h*a*f+o*u*f,C=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,T=t*M+n*b+s*x+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return e[0]=M*w,e[1]=(_*d*r-u*m*r-_*s*p+n*m*p+u*s*f-n*d*f)*w,e[2]=(a*m*r-_*c*r+_*s*l-n*m*l-a*s*f+n*c*f)*w,e[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*p-n*c*p)*w,e[4]=b*w,e[5]=(h*m*r-g*d*r+g*s*p-t*m*p-h*s*f+t*d*f)*w,e[6]=(g*c*r-o*m*r-g*s*l+t*m*l+o*s*f-t*c*f)*w,e[7]=(o*d*r-h*c*r+h*s*l-t*d*l-o*s*p+t*c*p)*w,e[8]=x*w,e[9]=(g*u*r-h*_*r-g*n*p+t*_*p+h*n*f-t*u*f)*w,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*f+t*a*f)*w,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*p-t*a*p)*w,e[12]=C*w,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*w,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*m-t*a*m)*w,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*d+t*a*d)*w,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,M=c*l,b=c*h,x=c*u,C=n.x,T=n.y,w=n.z;return s[0]=(1-(_+f))*C,s[1]=(p+x)*C,s[2]=(g-b)*C,s[3]=0,s[4]=(p-x)*T,s[5]=(1-(d+f))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+b)*w,s[9]=(m-M)*w,s[10]=(1-(d+_))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Os.set(s[0],s[1],s[2]).length();const o=Os.set(s[4],s[5],s[6]).length(),a=Os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Hn.copy(this);const l=1/r,h=1/o,u=1/a;return Hn.elements[0]*=l,Hn.elements[1]*=l,Hn.elements[2]*=l,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=u,Hn.elements[9]*=u,Hn.elements[10]*=u,t.setFromRotationMatrix(Hn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=wi){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let p,g;if(a===wi)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ua)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=wi){const c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),d=(t+e)*l,p=(n+s)*h;let g,_;if(a===wi)g=(o+r)*u,_=-2*u;else if(a===ua)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Os=new P,Hn=new Fe,ag=new P(0,0,0),cg=new P(1,1,1),$i=new P,bo=new P,bn=new P,Vh=new Fe,Gh=new Jn;class Qn{constructor(e=0,t=0,n=0,s=Qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gh.setFromEuler(this),this.setFromQuaternion(Gh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qn.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lg=0;const Wh=new P,Fs=new Jn,_i=new Fe,Eo=new P,Pr=new P,hg=new P,ug=new Jn,Xh=new P(1,0,0),$h=new P(0,1,0),Yh=new P(0,0,1),jh={type:"added"},dg={type:"removed"},Bs={type:"childadded",child:null},$a={type:"childremoved",child:null};class St extends Rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new P,t=new Qn,n=new Jn,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Fe},normalMatrix:{value:new He}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fs.setFromAxisAngle(e,t),this.quaternion.multiply(Fs),this}rotateOnWorldAxis(e,t){return Fs.setFromAxisAngle(e,t),this.quaternion.premultiply(Fs),this}rotateX(e){return this.rotateOnAxis(Xh,e)}rotateY(e){return this.rotateOnAxis($h,e)}rotateZ(e){return this.rotateOnAxis(Yh,e)}translateOnAxis(e,t){return Wh.copy(e).applyQuaternion(this.quaternion),this.position.add(Wh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xh,e)}translateY(e){return this.translateOnAxis($h,e)}translateZ(e){return this.translateOnAxis(Yh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Eo.copy(e):Eo.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(Pr,Eo,this.up):_i.lookAt(Eo,Pr,this.up),this.quaternion.setFromRotationMatrix(_i),s&&(_i.extractRotation(s.matrixWorld),Fs.setFromRotationMatrix(_i),this.quaternion.premultiply(Fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jh),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(dg),$a.child=e,this.dispatchEvent($a),$a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jh),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,e,hg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,ug,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}St.DEFAULT_UP=new P(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Vn=new P,xi=new P,Ya=new P,vi=new P,ks=new P,zs=new P,qh=new P,ja=new P,qa=new P,Ka=new P,Za=new at,Ja=new at,Qa=new at;class jn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Vn.subVectors(e,t),s.cross(Vn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Vn.subVectors(s,t),xi.subVectors(n,t),Ya.subVectors(e,t);const o=Vn.dot(Vn),a=Vn.dot(xi),c=Vn.dot(Ya),l=xi.dot(xi),h=xi.dot(Ya),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,vi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,vi.x),c.addScaledVector(o,vi.y),c.addScaledVector(a,vi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Za.setScalar(0),Ja.setScalar(0),Qa.setScalar(0),Za.fromBufferAttribute(e,t),Ja.fromBufferAttribute(e,n),Qa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Za,r.x),o.addScaledVector(Ja,r.y),o.addScaledVector(Qa,r.z),o}static isFrontFacing(e,t,n,s){return Vn.subVectors(n,t),xi.subVectors(e,t),Vn.cross(xi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),Vn.cross(xi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return jn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return jn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;ks.subVectors(s,n),zs.subVectors(r,n),ja.subVectors(e,n);const c=ks.dot(ja),l=zs.dot(ja);if(c<=0&&l<=0)return t.copy(n);qa.subVectors(e,s);const h=ks.dot(qa),u=zs.dot(qa);if(h>=0&&u<=h)return t.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(ks,o);Ka.subVectors(e,r);const p=ks.dot(Ka),g=zs.dot(Ka);if(g>=0&&p<=g)return t.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(zs,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return qh.subVectors(r,s),a=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(qh,a);const f=1/(m+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(ks,o).addScaledVector(zs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const uf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yi={h:0,s:0,l:0},To={h:0,s:0,l:0};function ec(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class De{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=$l(e,1),t=Zt(t,0,1),n=Zt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=ec(o,r,e+1/3),this.g=ec(o,r,e),this.b=ec(o,r,e-1/3)}return Ke.toWorkingColorSpace(this,s),this}setStyle(e,t=Lt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){const n=uf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}copyLinearToSRGB(e){return this.r=Js(e.r),this.g=Js(e.g),this.b=Js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return Ke.fromWorkingColorSpace(nn.copy(this),e),Math.round(Zt(nn.r*255,0,255))*65536+Math.round(Zt(nn.g*255,0,255))*256+Math.round(Zt(nn.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(nn.copy(this),t);const n=nn.r,s=nn.g,r=nn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=Lt){Ke.fromWorkingColorSpace(nn.copy(this),e);const t=nn.r,n=nn.g,s=nn.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Yi),this.setHSL(Yi.h+e,Yi.s+t,Yi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Yi),e.getHSL(To);const n=Gr(Yi.h,To.h,t),s=Gr(Yi.s,To.s,t),r=Gr(Yi.l,To.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new De;De.NAMES=uf;let fg=0;class oi extends Rs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=Kn(),this.name="",this.blending=Ks,this.side=Ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wc,this.blendDst=Rc,this.blendEquation=ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ls,this.stencilZFail=Ls,this.stencilZPass=Ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ks&&(n.blending=this.blending),this.side!==Ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wc&&(n.blendSrc=this.blendSrc),this.blendDst!==Rc&&(n.blendDst=this.blendDst),this.blendEquation!==ys&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==nr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ls&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ls&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ls&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class rt extends oi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Xd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ot=new P,Ao=new Re;class pn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ul,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ao.fromBufferAttribute(this,t),Ao.applyMatrix3(e),this.setXY(t,Ao.x,Ao.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix3(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yn(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yn(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yn(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ul&&(e.usage=this.usage),e}}class df extends pn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ff extends pn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Rt extends pn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let pg=0;const Dn=new Fe,tc=new St,Hs=new P,En=new zi,Lr=new zi,Xt=new P;class Qt extends Rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(cf(e)?ff:df)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,t,n){return Dn.makeTranslation(e,t,n),this.applyMatrix4(Dn),this}scale(e,t,n){return Dn.makeScale(e,t,n),this.applyMatrix4(Dn),this}lookAt(e){return tc.lookAt(e),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Rt(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];En.setFromBufferAttribute(r),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(En.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Lr.setFromBufferAttribute(a),this.morphTargetsRelative?(Xt.addVectors(En.min,Lr.min),En.expandByPoint(Xt),Xt.addVectors(En.max,Lr.max),En.expandByPoint(Xt)):(En.expandByPoint(Lr.min),En.expandByPoint(Lr.max))}En.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Xt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Xt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Xt.fromBufferAttribute(a,l),c&&(Hs.fromBufferAttribute(e,l),Xt.add(Hs)),s=Math.max(s,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new P,c[L]=new P;const l=new P,h=new P,u=new P,d=new Re,p=new Re,g=new Re,_=new P,m=new P;function f(L,E,y){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,L),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,y),h.sub(l),u.sub(l),p.sub(d),g.sub(d);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(D),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(D),a[L].add(_),a[E].add(_),a[y].add(_),c[L].add(m),c[E].add(m),c[y].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let L=0,E=M.length;L<E;++L){const y=M[L],D=y.start,V=y.count;for(let H=D,$=D+V;H<$;H+=3)f(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const b=new P,x=new P,C=new P,T=new P;function w(L){C.fromBufferAttribute(s,L),T.copy(C);const E=a[L];b.copy(E),b.sub(C.multiplyScalar(C.dot(E))).normalize(),x.crossVectors(T,E);const D=x.dot(c[L])<0?-1:1;o.setXYZW(L,b.x,b.y,b.z,D)}for(let L=0,E=M.length;L<E;++L){const y=M[L],D=y.start,V=y.count;for(let H=D,$=D+V;H<$;H+=3)w(e.getX(H+0)),w(e.getX(H+1)),w(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new pn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new P,r=new P,o=new P,a=new P,c=new P,l=new P,h=new P,u=new P;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new pn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Qt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kh=new Fe,ds=new mr,wo=new li,Zh=new P,Ro=new P,Co=new P,Po=new P,nc=new P,Lo=new P,Jh=new P,Do=new P;class ie extends St{constructor(e=new Qt,t=new rt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Lo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(nc.fromBufferAttribute(u,e),o?Lo.addScaledVector(nc,h):Lo.addScaledVector(nc.sub(t),h))}t.add(Lo)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wo.copy(n.boundingSphere),wo.applyMatrix4(r),ds.copy(e.ray).recast(e.near),!(wo.containsPoint(ds.origin)===!1&&(ds.intersectSphere(wo,Zh)===null||ds.origin.distanceToSquared(Zh)>(e.far-e.near)**2))&&(Kh.copy(r).invert(),ds.copy(e.ray).applyMatrix4(Kh),!(n.boundingBox!==null&&ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ds)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,C=b;x<C;x+=3){const T=a.getX(x),w=a.getX(x+1),L=a.getX(x+2);s=Io(this,f,e,n,l,h,u,T,w,L),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=a.getX(m),b=a.getX(m+1),x=a.getX(m+2);s=Io(this,o,e,n,l,h,u,M,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),b=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,C=b;x<C;x+=3){const T=x,w=x+1,L=x+2;s=Io(this,f,e,n,l,h,u,T,w,L),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const M=m,b=m+1,x=m+2;s=Io(this,o,e,n,l,h,u,M,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function mg(i,e,t,n,s,r,o,a){let c;if(e.side===dn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Ni,a),c===null)return null;Do.copy(a),Do.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Do);return l<t.near||l>t.far?null:{distance:l,point:Do.clone(),object:i}}function Io(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Ro),i.getVertexPosition(c,Co),i.getVertexPosition(l,Po);const h=mg(i,e,t,n,Ro,Co,Po,Jh);if(h){const u=new P;jn.getBarycoord(Jh,Ro,Co,Po,u),s&&(h.uv=jn.getInterpolatedAttribute(s,a,c,l,u,new Re)),r&&(h.uv1=jn.getInterpolatedAttribute(r,a,c,l,u,new Re)),o&&(h.normal=jn.getInterpolatedAttribute(o,a,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new P,materialIndex:0};jn.getNormal(Ro,Co,Po,d.normal),h.face=d,h.barycoord=u}return h}class At extends Qt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(u,2));function g(_,m,f,M,b,x,C,T,w,L,E){const y=x/w,D=C/L,V=x/2,H=C/2,$=T/2,Z=w+1,X=L+1;let Q=0,W=0;const oe=new P;for(let de=0;de<X;de++){const Ee=de*D-H;for(let Ye=0;Ye<Z;Ye++){const xt=Ye*y-V;oe[_]=xt*M,oe[m]=Ee*b,oe[f]=$,l.push(oe.x,oe.y,oe.z),oe[_]=0,oe[m]=0,oe[f]=T>0?1:-1,h.push(oe.x,oe.y,oe.z),u.push(Ye/w),u.push(1-de/L),Q+=1}}for(let de=0;de<L;de++)for(let Ee=0;Ee<w;Ee++){const Ye=d+Ee+Z*de,xt=d+Ee+Z*(de+1),j=d+(Ee+1)+Z*(de+1),ne=d+(Ee+1)+Z*de;c.push(Ye,xt,ne),c.push(xt,j,ne),W+=6}a.addGroup(p,W,E),p+=W,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new At(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function cr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function ln(i){const e={};for(let t=0;t<i.length;t++){const n=cr(i[t]);for(const s in n)e[s]=n[s]}return e}function gg(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function pf(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const _g={clone:cr,merge:ln};var xg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class as extends oi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=xg,this.fragmentShader=vg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=cr(e.uniforms),this.uniformsGroups=gg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class mf extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=wi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ji=new P,Qh=new Re,eu=new Re;class hn extends mf{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(Vr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,t){return this.getViewBounds(e,Qh,eu),t.subVectors(eu,Qh)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Vs=-90,Gs=1;class yg extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new hn(Vs,Gs,e,t);s.layers=this.layers,this.add(s);const r=new hn(Vs,Gs,e,t);r.layers=this.layers,this.add(r);const o=new hn(Vs,Gs,e,t);o.layers=this.layers,this.add(o);const a=new hn(Vs,Gs,e,t);a.layers=this.layers,this.add(a);const c=new hn(Vs,Gs,e,t);c.layers=this.layers,this.add(c);const l=new hn(Vs,Gs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===wi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ua)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class gf extends Ht{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:ir,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Mg extends Ts{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new gf(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new At(5,5,5),r=new as({name:"CubemapFromEquirect",uniforms:cr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:is});r.uniforms.tEquirect.value=t;const o=new ie(s,r),a=t.minFilter;return t.minFilter===Ai&&(t.minFilter=zt),new yg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const ic=new P,Sg=new P,bg=new He;class Zi{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ic.subVectors(n,t).cross(Sg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ic),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||bg.getNormalMatrix(e),s=this.coplanarPoint(ic).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fs=new li,No=new P;class ql{constructor(e=new Zi,t=new Zi,n=new Zi,s=new Zi,r=new Zi,o=new Zi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wi){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],M=s[13],b=s[14],x=s[15];if(n[0].setComponents(c-r,d-l,m-p,x-f).normalize(),n[1].setComponents(c+r,d+l,m+p,x+f).normalize(),n[2].setComponents(c+o,d+h,m+g,x+M).normalize(),n[3].setComponents(c-o,d-h,m-g,x-M).normalize(),n[4].setComponents(c-a,d-u,m-_,x-b).normalize(),t===wi)n[5].setComponents(c+a,d+u,m+_,x+b).normalize();else if(t===ua)n[5].setComponents(a,u,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fs)}intersectsSprite(e){return fs.center.set(0,0,0),fs.radius=.7071067811865476,fs.applyMatrix4(e.matrixWorld),this.intersectsSphere(fs)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(No.x=s.normal.x>0?e.max.x:e.min.x,No.y=s.normal.y>0?e.max.y:e.min.y,No.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(No)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function _f(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Eg(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class yn extends Qt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const M=f*d-o;for(let b=0;b<l;b++){const x=b*u-r;g.push(x,-M,0),_.push(0,0,1),m.push(b/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<a;M++){const b=M+l*f,x=M+l*(f+1),C=M+1+l*(f+1),T=M+1+l*f;p.push(b,x,T),p.push(x,C,T)}this.setIndex(p),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(_,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Tg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ag=`#ifdef USE_ALPHAHASH
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
#endif`,wg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lg=`#ifdef USE_AOMAP
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
#endif`,Dg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ig=`#ifdef USE_BATCHING
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
#endif`,Ng=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ug=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Og=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Bg=`#ifdef USE_IRIDESCENCE
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
#endif`,kg=`#ifdef USE_BUMPMAP
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
#endif`,zg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$g=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Yg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,jg=`#define PI 3.141592653589793
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
} // validated`,qg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Kg=`vec3 transformedNormal = objectNormal;
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
#endif`,Zg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,e_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,t_="gl_FragColor = linearToOutputTexel( gl_FragColor );",n_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,i_=`#ifdef USE_ENVMAP
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
#endif`,s_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,r_=`#ifdef USE_ENVMAP
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
#endif`,o_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,a_=`#ifdef USE_ENVMAP
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
#endif`,c_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,l_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,u_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,d_=`#ifdef USE_GRADIENTMAP
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
}`,f_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,p_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,m_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,g_=`uniform bool receiveShadow;
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
#endif`,__=`#ifdef USE_ENVMAP
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
#endif`,x_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,v_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,y_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,M_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,S_=`PhysicalMaterial material;
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
#endif`,b_=`struct PhysicalMaterial {
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
}`,E_=`
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
#endif`,T_=`#if defined( RE_IndirectDiffuse )
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
#endif`,A_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,R_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,C_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,L_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,D_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,I_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,N_=`#if defined( USE_POINTS_UV )
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
#endif`,U_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,O_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,F_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,B_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,k_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,z_=`#ifdef USE_MORPHTARGETS
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
#endif`,H_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,V_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,G_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,W_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Y_=`#ifdef USE_NORMALMAP
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
#endif`,j_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,q_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,K_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Z_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,J_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Q_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,e0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,t0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,n0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,i0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,s0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,r0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,o0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,a0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,c0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,l0=`float getShadowMask() {
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
}`,h0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,u0=`#ifdef USE_SKINNING
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
#endif`,d0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,f0=`#ifdef USE_SKINNING
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
#endif`,p0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,m0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,g0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,x0=`#ifdef USE_TRANSMISSION
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
#endif`,v0=`#ifdef USE_TRANSMISSION
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
#endif`,y0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,M0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const E0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,T0=`uniform sampler2D t2D;
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
}`,A0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,w0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P0=`#include <common>
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
}`,L0=`#if DEPTH_PACKING == 3200
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
}`,D0=`#define DISTANCE
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
}`,I0=`#define DISTANCE
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
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,U0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O0=`uniform float scale;
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
}`,F0=`uniform vec3 diffuse;
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
}`,B0=`#include <common>
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
}`,k0=`uniform vec3 diffuse;
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
}`,z0=`#define LAMBERT
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
}`,H0=`#define LAMBERT
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
}`,V0=`#define MATCAP
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
}`,G0=`#define MATCAP
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
}`,W0=`#define NORMAL
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
}`,X0=`#define NORMAL
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
}`,$0=`#define PHONG
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
}`,Y0=`#define PHONG
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
}`,j0=`#define STANDARD
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
}`,q0=`#define STANDARD
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
}`,K0=`#define TOON
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
}`,Z0=`#define TOON
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
}`,J0=`uniform float size;
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
}`,Q0=`uniform vec3 diffuse;
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
}`,ex=`#include <common>
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
}`,tx=`uniform vec3 color;
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
}`,nx=`uniform float rotation;
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
}`,ix=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Tg,alphahash_pars_fragment:Ag,alphamap_fragment:wg,alphamap_pars_fragment:Rg,alphatest_fragment:Cg,alphatest_pars_fragment:Pg,aomap_fragment:Lg,aomap_pars_fragment:Dg,batching_pars_vertex:Ig,batching_vertex:Ng,begin_vertex:Ug,beginnormal_vertex:Og,bsdfs:Fg,iridescence_fragment:Bg,bumpmap_pars_fragment:kg,clipping_planes_fragment:zg,clipping_planes_pars_fragment:Hg,clipping_planes_pars_vertex:Vg,clipping_planes_vertex:Gg,color_fragment:Wg,color_pars_fragment:Xg,color_pars_vertex:$g,color_vertex:Yg,common:jg,cube_uv_reflection_fragment:qg,defaultnormal_vertex:Kg,displacementmap_pars_vertex:Zg,displacementmap_vertex:Jg,emissivemap_fragment:Qg,emissivemap_pars_fragment:e_,colorspace_fragment:t_,colorspace_pars_fragment:n_,envmap_fragment:i_,envmap_common_pars_fragment:s_,envmap_pars_fragment:r_,envmap_pars_vertex:o_,envmap_physical_pars_fragment:__,envmap_vertex:a_,fog_vertex:c_,fog_pars_vertex:l_,fog_fragment:h_,fog_pars_fragment:u_,gradientmap_pars_fragment:d_,lightmap_pars_fragment:f_,lights_lambert_fragment:p_,lights_lambert_pars_fragment:m_,lights_pars_begin:g_,lights_toon_fragment:x_,lights_toon_pars_fragment:v_,lights_phong_fragment:y_,lights_phong_pars_fragment:M_,lights_physical_fragment:S_,lights_physical_pars_fragment:b_,lights_fragment_begin:E_,lights_fragment_maps:T_,lights_fragment_end:A_,logdepthbuf_fragment:w_,logdepthbuf_pars_fragment:R_,logdepthbuf_pars_vertex:C_,logdepthbuf_vertex:P_,map_fragment:L_,map_pars_fragment:D_,map_particle_fragment:I_,map_particle_pars_fragment:N_,metalnessmap_fragment:U_,metalnessmap_pars_fragment:O_,morphinstance_vertex:F_,morphcolor_vertex:B_,morphnormal_vertex:k_,morphtarget_pars_vertex:z_,morphtarget_vertex:H_,normal_fragment_begin:V_,normal_fragment_maps:G_,normal_pars_fragment:W_,normal_pars_vertex:X_,normal_vertex:$_,normalmap_pars_fragment:Y_,clearcoat_normal_fragment_begin:j_,clearcoat_normal_fragment_maps:q_,clearcoat_pars_fragment:K_,iridescence_pars_fragment:Z_,opaque_fragment:J_,packing:Q_,premultiplied_alpha_fragment:e0,project_vertex:t0,dithering_fragment:n0,dithering_pars_fragment:i0,roughnessmap_fragment:s0,roughnessmap_pars_fragment:r0,shadowmap_pars_fragment:o0,shadowmap_pars_vertex:a0,shadowmap_vertex:c0,shadowmask_pars_fragment:l0,skinbase_vertex:h0,skinning_pars_vertex:u0,skinning_vertex:d0,skinnormal_vertex:f0,specularmap_fragment:p0,specularmap_pars_fragment:m0,tonemapping_fragment:g0,tonemapping_pars_fragment:_0,transmission_fragment:x0,transmission_pars_fragment:v0,uv_pars_fragment:y0,uv_pars_vertex:M0,uv_vertex:S0,worldpos_vertex:b0,background_vert:E0,background_frag:T0,backgroundCube_vert:A0,backgroundCube_frag:w0,cube_vert:R0,cube_frag:C0,depth_vert:P0,depth_frag:L0,distanceRGBA_vert:D0,distanceRGBA_frag:I0,equirect_vert:N0,equirect_frag:U0,linedashed_vert:O0,linedashed_frag:F0,meshbasic_vert:B0,meshbasic_frag:k0,meshlambert_vert:z0,meshlambert_frag:H0,meshmatcap_vert:V0,meshmatcap_frag:G0,meshnormal_vert:W0,meshnormal_frag:X0,meshphong_vert:$0,meshphong_frag:Y0,meshphysical_vert:j0,meshphysical_frag:q0,meshtoon_vert:K0,meshtoon_frag:Z0,points_vert:J0,points_frag:Q0,shadow_vert:ex,shadow_frag:tx,sprite_vert:nx,sprite_frag:ix},se={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},ni={basic:{uniforms:ln([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:ln([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new De(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:ln([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:ln([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:ln([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new De(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:ln([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:ln([se.points,se.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:ln([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:ln([se.common,se.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:ln([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:ln([se.sprite,se.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:ln([se.common,se.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:ln([se.lights,se.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ni.physical={uniforms:ln([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Uo={r:0,b:0,g:0},ps=new Qn,sx=new Fe;function rx(i,e,t,n,s,r,o){const a=new De(0);let c=r===!0?0:1,l,h,u=null,d=0,p=null;function g(M){let b=M.isScene===!0?M.background:null;return b&&b.isTexture&&(b=(M.backgroundBlurriness>0?t:e).get(b)),b}function _(M){let b=!1;const x=g(M);x===null?f(a,c):x&&x.isColor&&(f(x,1),b=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,b){const x=g(b);x&&(x.isCubeTexture||x.mapping===xa)?(h===void 0&&(h=new ie(new At(1,1,1),new as({name:"BackgroundCubeMaterial",uniforms:cr(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,T,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ps.copy(b.backgroundRotation),ps.x*=-1,ps.y*=-1,ps.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(sx.makeRotationFromEuler(ps)),h.material.toneMapped=Ke.getTransfer(x.colorSpace)!==mt,(u!==x||d!==x.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ie(new yn(2,2),new as({name:"BackgroundMaterial",uniforms:cr(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Ni,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(x.colorSpace)!==mt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,p=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function f(M,b){M.getRGB(Uo,pf(i)),n.buffers.color.setClear(Uo.r,Uo.g,Uo.b,b,o)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),c=b,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,f(a,c)},render:_,addToRenderList:m}}function ox(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(y,D,V,H,$){let Z=!1;const X=u(H,V,D);r!==X&&(r=X,l(r.object)),Z=p(y,H,V,$),Z&&g(y,H,V,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,x(y,D,V,H),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,D,V){const H=V.wireframe===!0;let $=n[y.id];$===void 0&&($={},n[y.id]=$);let Z=$[D.id];Z===void 0&&(Z={},$[D.id]=Z);let X=Z[H];return X===void 0&&(X=d(c()),Z[H]=X),X}function d(y){const D=[],V=[],H=[];for(let $=0;$<t;$++)D[$]=0,V[$]=0,H[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:V,attributeDivisors:H,object:y,attributes:{},index:null}}function p(y,D,V,H){const $=r.attributes,Z=D.attributes;let X=0;const Q=V.getAttributes();for(const W in Q)if(Q[W].location>=0){const de=$[W];let Ee=Z[W];if(Ee===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(Ee=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(Ee=y.instanceColor)),de===void 0||de.attribute!==Ee||Ee&&de.data!==Ee.data)return!0;X++}return r.attributesNum!==X||r.index!==H}function g(y,D,V,H){const $={},Z=D.attributes;let X=0;const Q=V.getAttributes();for(const W in Q)if(Q[W].location>=0){let de=Z[W];de===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(de=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(de=y.instanceColor));const Ee={};Ee.attribute=de,de&&de.data&&(Ee.data=de.data),$[W]=Ee,X++}r.attributes=$,r.attributesNum=X,r.index=H}function _(){const y=r.newAttributes;for(let D=0,V=y.length;D<V;D++)y[D]=0}function m(y){f(y,0)}function f(y,D){const V=r.newAttributes,H=r.enabledAttributes,$=r.attributeDivisors;V[y]=1,H[y]===0&&(i.enableVertexAttribArray(y),H[y]=1),$[y]!==D&&(i.vertexAttribDivisor(y,D),$[y]=D)}function M(){const y=r.newAttributes,D=r.enabledAttributes;for(let V=0,H=D.length;V<H;V++)D[V]!==y[V]&&(i.disableVertexAttribArray(V),D[V]=0)}function b(y,D,V,H,$,Z,X){X===!0?i.vertexAttribIPointer(y,D,V,$,Z):i.vertexAttribPointer(y,D,V,H,$,Z)}function x(y,D,V,H){_();const $=H.attributes,Z=V.getAttributes(),X=D.defaultAttributeValues;for(const Q in Z){const W=Z[Q];if(W.location>=0){let oe=$[Q];if(oe===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(oe=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(oe=y.instanceColor)),oe!==void 0){const de=oe.normalized,Ee=oe.itemSize,Ye=e.get(oe);if(Ye===void 0)continue;const xt=Ye.buffer,j=Ye.type,ne=Ye.bytesPerElement,ve=j===i.INT||j===i.UNSIGNED_INT||oe.gpuType===kl;if(oe.isInterleavedBufferAttribute){const ae=oe.data,Pe=ae.stride,Be=oe.offset;if(ae.isInstancedInterleavedBuffer){for(let je=0;je<W.locationSize;je++)f(W.location+je,ae.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let je=0;je<W.locationSize;je++)m(W.location+je);i.bindBuffer(i.ARRAY_BUFFER,xt);for(let je=0;je<W.locationSize;je++)b(W.location+je,Ee/W.locationSize,j,de,Pe*ne,(Be+Ee/W.locationSize*je)*ne,ve)}else{if(oe.isInstancedBufferAttribute){for(let ae=0;ae<W.locationSize;ae++)f(W.location+ae,oe.meshPerAttribute);y.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let ae=0;ae<W.locationSize;ae++)m(W.location+ae);i.bindBuffer(i.ARRAY_BUFFER,xt);for(let ae=0;ae<W.locationSize;ae++)b(W.location+ae,Ee/W.locationSize,j,de,Ee*ne,Ee/W.locationSize*ae*ne,ve)}}else if(X!==void 0){const de=X[Q];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(W.location,de);break;case 3:i.vertexAttrib3fv(W.location,de);break;case 4:i.vertexAttrib4fv(W.location,de);break;default:i.vertexAttrib1fv(W.location,de)}}}}M()}function C(){L();for(const y in n){const D=n[y];for(const V in D){const H=D[V];for(const $ in H)h(H[$].object),delete H[$];delete D[V]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const V in D){const H=D[V];for(const $ in H)h(H[$].object),delete H[$];delete D[V]}delete n[y.id]}function w(y){for(const D in n){const V=n[D];if(V[y.id]===void 0)continue;const H=V[y.id];for(const $ in H)h(H[$].object),delete H[$];delete V[y.id]}}function L(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function ax(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function c(l,h,u,d){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function cx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Nn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const L=w===ro&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Ui&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==qn&&!L)}function c(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:C,maxSamples:T}}function lx(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new Zi,a=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,b=M*4;let x=f.clippingState||null;c.value=x,x=h(g,d,b,p);for(let C=0;C!==b;++C)x[C]=t[C];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,x=p;b!==_;++b,x+=4)o.copy(u[b]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function hx(i){let e=new WeakMap;function t(o,a){return a===Oc?o.mapping=ir:a===Fc&&(o.mapping=sr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Oc||a===Fc)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Mg(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Kl extends mf{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const js=4,tu=[.125,.215,.35,.446,.526,.582],Ms=20,sc=new Kl,nu=new De;let rc=null,oc=0,ac=0,cc=!1;const vs=(1+Math.sqrt(5))/2,Ws=1/vs,iu=[new P(-vs,Ws,0),new P(vs,Ws,0),new P(-Ws,0,vs),new P(Ws,0,vs),new P(0,vs,-Ws),new P(0,vs,Ws),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class su{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=au(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ou(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(rc,oc,ac),this._renderer.xr.enabled=cc,e.scissorTest=!1,Oo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ir||e.mapping===sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:ro,format:Nn,colorSpace:mn,depthBuffer:!1},s=ru(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ru(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ux(r)),this._blurMaterial=dx(r,e,t)}return s}_compileMaterial(e){const t=new ie(this._lodPlanes[0],e);this._renderer.compile(t,sc)}_sceneToCubeUV(e,t,n,s){const a=new hn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(nu),h.toneMapping=ss,h.autoClear=!1;const p=new rt({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),g=new ie(new At,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(nu),_=!0);for(let f=0;f<6;f++){const M=f%3;M===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):M===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const b=this._cubeSize;Oo(s,M*b,f>2?b:0,b,b),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ir||e.mapping===sr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=au()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ou());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ie(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Oo(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,sc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=iu[(s-r-1)%iu.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ie(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ms-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ms;m>Ms&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ms}`);const f=[];let M=0;for(let w=0;w<Ms;++w){const L=w/_,E=Math.exp(-L*L/2);f.push(E),w===0?M+=E:w<m&&(M+=2*E)}for(let w=0;w<f.length;w++)f[w]=f[w]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const x=this._sizeLods[s],C=3*x*(s>b-js?s-b+js:0),T=4*(this._cubeSize-x);Oo(t,C,T,3*x,2*x),c.setRenderTarget(t),c.render(u,sc)}}function ux(i){const e=[],t=[],n=[];let s=i;const r=i-js+1+tu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-js?c=tu[o-i+js-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,M=new Float32Array(_*g*p),b=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let T=0;T<p;T++){const w=T%3*2/3-1,L=T>2?0:-1,E=[w,L,0,w+2/3,L,0,w+2/3,L+1,0,w,L,0,w+2/3,L+1,0,w,L+1,0];M.set(E,_*g*T),b.set(d,m*g*T);const y=[T,T,T,T,T,T];x.set(y,f*g*T)}const C=new Qt;C.setAttribute("position",new pn(M,_)),C.setAttribute("uv",new pn(b,m)),C.setAttribute("faceIndex",new pn(x,f)),e.push(C),s>js&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ru(i,e,t){const n=new Ts(i,e,t);return n.texture.mapping=xa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Oo(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function dx(i,e,t){const n=new Float32Array(Ms),s=new P(0,1,0);return new as({name:"SphericalGaussianBlur",defines:{n:Ms,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Zl(),fragmentShader:`

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
		`,blending:is,depthTest:!1,depthWrite:!1})}function ou(){return new as({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zl(),fragmentShader:`

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
		`,blending:is,depthTest:!1,depthWrite:!1})}function au(){return new as({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:is,depthTest:!1,depthWrite:!1})}function Zl(){return`

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
	`}function fx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Oc||c===Fc,h=c===ir||c===sr;if(l||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new su(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new su(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function px(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&zr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function mx(i,e,t,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const M=p.array;_=p.version;for(let b=0,x=M.length;b<x;b+=3){const C=M[b+0],T=M[b+1],w=M[b+2];d.push(C,T,T,w,w,C)}}else if(g!==void 0){const M=g.array;_=g.version;for(let b=0,x=M.length/3-1;b<x;b+=3){const C=b+0,T=b+1,w=b+2;d.push(C,T,T,w,w,C)}}else return;const m=new(cf(d)?ff:df)(d,1);m.version=_;const f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function gx(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,p){i.drawElements(n,p,r,d*o),t.update(p,n,1)}function l(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*o,g),t.update(p,n,g))}function h(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function u(d,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,g);let f=0;for(let M=0;M<g;M++)f+=p[M]*_[M];t.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function _x(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function xx(i,e,t){const n=new WeakMap,s=new at;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let y=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var p=y;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let C=a.attributes.position.count*x,T=1;C>e.maxTextureSize&&(T=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const w=new Float32Array(C*T*4*u),L=new hf(w,C,T,u);L.type=qn,L.needsUpdate=!0;const E=x*4;for(let D=0;D<u;D++){const V=f[D],H=M[D],$=b[D],Z=C*T*4*D;for(let X=0;X<V.count;X++){const Q=X*E;g===!0&&(s.fromBufferAttribute(V,X),w[Z+Q+0]=s.x,w[Z+Q+1]=s.y,w[Z+Q+2]=s.z,w[Z+Q+3]=0),_===!0&&(s.fromBufferAttribute(H,X),w[Z+Q+4]=s.x,w[Z+Q+5]=s.y,w[Z+Q+6]=s.z,w[Z+Q+7]=0),m===!0&&(s.fromBufferAttribute($,X),w[Z+Q+8]=s.x,w[Z+Q+9]=s.y,w[Z+Q+10]=s.z,w[Z+Q+11]=$.itemSize===4?s.w:1)}}d={count:u,texture:L,size:new Re(C,T)},n.set(a,d),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function vx(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class xf extends Ht{constructor(e,t,n,s,r,o,a,c,l,h=Zs){if(h!==Zs&&h!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Zs&&(n=Es),n===void 0&&h===or&&(n=rr),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:fn,this.minFilter=c!==void 0?c:fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const vf=new Ht,cu=new xf(1,1),yf=new hf,Mf=new rg,Sf=new gf,lu=[],hu=[],uu=new Float32Array(16),du=new Float32Array(9),fu=new Float32Array(4);function gr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=lu[s];if(r===void 0&&(r=new Float32Array(s),lu[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Wt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ya(i,e){let t=hu[e];t===void 0&&(t=new Int32Array(e),hu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function yx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2fv(this.addr,e),Wt(t,e)}}function Sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;i.uniform3fv(this.addr,e),Wt(t,e)}}function bx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4fv(this.addr,e),Wt(t,e)}}function Ex(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,n))return;fu.set(n),i.uniformMatrix2fv(this.addr,!1,fu),Wt(t,n)}}function Tx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,n))return;du.set(n),i.uniformMatrix3fv(this.addr,!1,du),Wt(t,n)}}function Ax(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Gt(t,n))return;uu.set(n),i.uniformMatrix4fv(this.addr,!1,uu),Wt(t,n)}}function wx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Rx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2iv(this.addr,e),Wt(t,e)}}function Cx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3iv(this.addr,e),Wt(t,e)}}function Px(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4iv(this.addr,e),Wt(t,e)}}function Lx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Dx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;i.uniform2uiv(this.addr,e),Wt(t,e)}}function Ix(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;i.uniform3uiv(this.addr,e),Wt(t,e)}}function Nx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;i.uniform4uiv(this.addr,e),Wt(t,e)}}function Ux(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(cu.compareFunction=af,r=cu):r=vf,t.setTexture2D(e||r,s)}function Ox(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Mf,s)}function Fx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Sf,s)}function Bx(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||yf,s)}function kx(i){switch(i){case 5126:return yx;case 35664:return Mx;case 35665:return Sx;case 35666:return bx;case 35674:return Ex;case 35675:return Tx;case 35676:return Ax;case 5124:case 35670:return wx;case 35667:case 35671:return Rx;case 35668:case 35672:return Cx;case 35669:case 35673:return Px;case 5125:return Lx;case 36294:return Dx;case 36295:return Ix;case 36296:return Nx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ux;case 35679:case 36299:case 36307:return Ox;case 35680:case 36300:case 36308:case 36293:return Fx;case 36289:case 36303:case 36311:case 36292:return Bx}}function zx(i,e){i.uniform1fv(this.addr,e)}function Hx(i,e){const t=gr(e,this.size,2);i.uniform2fv(this.addr,t)}function Vx(i,e){const t=gr(e,this.size,3);i.uniform3fv(this.addr,t)}function Gx(i,e){const t=gr(e,this.size,4);i.uniform4fv(this.addr,t)}function Wx(i,e){const t=gr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Xx(i,e){const t=gr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function $x(i,e){const t=gr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Yx(i,e){i.uniform1iv(this.addr,e)}function jx(i,e){i.uniform2iv(this.addr,e)}function qx(i,e){i.uniform3iv(this.addr,e)}function Kx(i,e){i.uniform4iv(this.addr,e)}function Zx(i,e){i.uniform1uiv(this.addr,e)}function Jx(i,e){i.uniform2uiv(this.addr,e)}function Qx(i,e){i.uniform3uiv(this.addr,e)}function ev(i,e){i.uniform4uiv(this.addr,e)}function tv(i,e,t){const n=this.cache,s=e.length,r=ya(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||vf,r[o])}function nv(i,e,t){const n=this.cache,s=e.length,r=ya(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Mf,r[o])}function iv(i,e,t){const n=this.cache,s=e.length,r=ya(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Sf,r[o])}function sv(i,e,t){const n=this.cache,s=e.length,r=ya(t,s);Gt(n,r)||(i.uniform1iv(this.addr,r),Wt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||yf,r[o])}function rv(i){switch(i){case 5126:return zx;case 35664:return Hx;case 35665:return Vx;case 35666:return Gx;case 35674:return Wx;case 35675:return Xx;case 35676:return $x;case 5124:case 35670:return Yx;case 35667:case 35671:return jx;case 35668:case 35672:return qx;case 35669:case 35673:return Kx;case 5125:return Zx;case 36294:return Jx;case 36295:return Qx;case 36296:return ev;case 35678:case 36198:case 36298:case 36306:case 35682:return tv;case 35679:case 36299:case 36307:return nv;case 35680:case 36300:case 36308:case 36293:return iv;case 36289:case 36303:case 36311:case 36292:return sv}}class ov{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=kx(t.type)}}class av{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rv(t.type)}}class cv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const lc=/(\w+)(\])?(\[|\.)?/g;function pu(i,e){i.seq.push(e),i.map[e.id]=e}function lv(i,e,t){const n=i.name,s=n.length;for(lc.lastIndex=0;;){const r=lc.exec(n),o=lc.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){pu(t,l===void 0?new ov(a,i,e):new av(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new cv(a),pu(t,u)),t=u}}}class ra{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);lv(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function mu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const hv=37297;let uv=0;function dv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const gu=new He;function fv(i){Ke._getMatrix(gu,Ke.workingColorSpace,i);const e=`mat3( ${gu.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(i)){case va:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function _u(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+dv(i.getShaderSource(e),o)}else return s}function pv(i,e){const t=fv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function mv(i,e){let t;switch(e){case mm:t="Linear";break;case gm:t="Reinhard";break;case _m:t="Cineon";break;case $d:t="ACESFilmic";break;case vm:t="AgX";break;case ym:t="Neutral";break;case xm:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Fo=new P;function gv(){Ke.getLuminanceCoefficients(Fo);const i=Fo.x.toFixed(4),e=Fo.y.toFixed(4),t=Fo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _v(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hr).join(`
`)}function xv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function vv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Hr(i){return i!==""}function xu(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function dl(i){return i.replace(yv,Sv)}const Mv=new Map;function Sv(i,e){let t=Ge[e];if(t===void 0){const n=Mv.get(e);if(n!==void 0)t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return dl(t)}const bv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yu(i){return i.replace(bv,Ev)}function Ev(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Mu(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Tv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Wd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Mi&&(e="SHADOWMAP_TYPE_VSM"),e}function Av(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ir:case sr:e="ENVMAP_TYPE_CUBE";break;case xa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function wv(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case sr:e="ENVMAP_MODE_REFRACTION";break}return e}function Rv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Xd:e="ENVMAP_BLENDING_MULTIPLY";break;case fm:e="ENVMAP_BLENDING_MIX";break;case pm:e="ENVMAP_BLENDING_ADD";break}return e}function Cv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Pv(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=Tv(t),l=Av(t),h=wv(t),u=Rv(t),d=Cv(t),p=_v(t),g=xv(r),_=s.createProgram();let m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Hr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Hr).join(`
`),f.length>0&&(f+=`
`)):(m=[Mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hr).join(`
`),f=[Mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ss?"#define TONE_MAPPING":"",t.toneMapping!==ss?Ge.tonemapping_pars_fragment:"",t.toneMapping!==ss?mv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,pv("linearToOutputTexel",t.outputColorSpace),gv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hr).join(`
`)),o=dl(o),o=xu(o,t),o=vu(o,t),a=dl(a),a=xu(a,t),a=vu(a,t),o=yu(o),a=yu(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Ih?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ih?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=M+m+o,x=M+f+a,C=mu(s,s.VERTEX_SHADER,b),T=mu(s,s.FRAGMENT_SHADER,x);s.attachShader(_,C),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(D){if(i.debug.checkShaderErrors){const V=s.getProgramInfoLog(_).trim(),H=s.getShaderInfoLog(C).trim(),$=s.getShaderInfoLog(T).trim();let Z=!0,X=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,C,T);else{const Q=_u(s,C,"vertex"),W=_u(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+V+`
`+Q+`
`+W)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(H===""||$==="")&&(X=!1);X&&(D.diagnostics={runnable:Z,programLog:V,vertexShader:{log:H,prefix:m},fragmentShader:{log:$,prefix:f}})}s.deleteShader(C),s.deleteShader(T),L=new ra(s,_),E=vv(s,_)}let L;this.getUniforms=function(){return L===void 0&&w(this),L};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,hv)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=uv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=T,this}let Lv=0;class Dv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Iv(e),t.set(e,n)),n}}class Iv{constructor(e){this.id=Lv++,this.code=e,this.usedTimes=0}}function Nv(i,e,t,n,s,r,o){const a=new jl,c=new Dv,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,y,D,V,H){const $=V.fog,Z=H.geometry,X=E.isMeshStandardMaterial?V.environment:null,Q=(E.isMeshStandardMaterial?t:e).get(E.envMap||X),W=Q&&Q.mapping===xa?Q.image.height:null,oe=g[E.type];E.precision!==null&&(p=s.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const de=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Ee=de!==void 0?de.length:0;let Ye=0;Z.morphAttributes.position!==void 0&&(Ye=1),Z.morphAttributes.normal!==void 0&&(Ye=2),Z.morphAttributes.color!==void 0&&(Ye=3);let xt,j,ne,ve;if(oe){const ut=ni[oe];xt=ut.vertexShader,j=ut.fragmentShader}else xt=E.vertexShader,j=E.fragmentShader,c.update(E),ne=c.getVertexShaderID(E),ve=c.getFragmentShaderID(E);const ae=i.getRenderTarget(),Pe=i.state.buffers.depth.getReversed(),Be=H.isInstancedMesh===!0,je=H.isBatchedMesh===!0,Pt=!!E.map,nt=!!E.matcap,Nt=!!Q,O=!!E.aoMap,Pn=!!E.lightMap,Je=!!E.bumpMap,Qe=!!E.normalMap,we=!!E.displacementMap,bt=!!E.emissiveMap,Ae=!!E.metalnessMap,R=!!E.roughnessMap,v=E.anisotropy>0,B=E.clearcoat>0,q=E.dispersion>0,J=E.iridescence>0,Y=E.sheen>0,Me=E.transmission>0,ce=v&&!!E.anisotropyMap,fe=B&&!!E.clearcoatMap,it=B&&!!E.clearcoatNormalMap,ee=B&&!!E.clearcoatRoughnessMap,pe=J&&!!E.iridescenceMap,Ce=J&&!!E.iridescenceThicknessMap,Ie=Y&&!!E.sheenColorMap,me=Y&&!!E.sheenRoughnessMap,et=!!E.specularMap,Ve=!!E.specularColorMap,vt=!!E.specularIntensityMap,I=Me&&!!E.transmissionMap,re=Me&&!!E.thicknessMap,G=!!E.gradientMap,K=!!E.alphaMap,ue=E.alphaTest>0,le=!!E.alphaHash,ke=!!E.extensions;let Dt=ss;E.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Dt=i.toneMapping);const en={shaderID:oe,shaderType:E.type,shaderName:E.name,vertexShader:xt,fragmentShader:j,defines:E.defines,customVertexShaderID:ne,customFragmentShaderID:ve,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:je,batchingColor:je&&H._colorsTexture!==null,instancing:Be,instancingColor:Be&&H.instanceColor!==null,instancingMorph:Be&&H.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:mn,alphaToCoverage:!!E.alphaToCoverage,map:Pt,matcap:nt,envMap:Nt,envMapMode:Nt&&Q.mapping,envMapCubeUVHeight:W,aoMap:O,lightMap:Pn,bumpMap:Je,normalMap:Qe,displacementMap:d&&we,emissiveMap:bt,normalMapObjectSpace:Qe&&E.normalMapType===Am,normalMapTangentSpace:Qe&&E.normalMapType===of,metalnessMap:Ae,roughnessMap:R,anisotropy:v,anisotropyMap:ce,clearcoat:B,clearcoatMap:fe,clearcoatNormalMap:it,clearcoatRoughnessMap:ee,dispersion:q,iridescence:J,iridescenceMap:pe,iridescenceThicknessMap:Ce,sheen:Y,sheenColorMap:Ie,sheenRoughnessMap:me,specularMap:et,specularColorMap:Ve,specularIntensityMap:vt,transmission:Me,transmissionMap:I,thicknessMap:re,gradientMap:G,opaque:E.transparent===!1&&E.blending===Ks&&E.alphaToCoverage===!1,alphaMap:K,alphaTest:ue,alphaHash:le,combine:E.combine,mapUv:Pt&&_(E.map.channel),aoMapUv:O&&_(E.aoMap.channel),lightMapUv:Pn&&_(E.lightMap.channel),bumpMapUv:Je&&_(E.bumpMap.channel),normalMapUv:Qe&&_(E.normalMap.channel),displacementMapUv:we&&_(E.displacementMap.channel),emissiveMapUv:bt&&_(E.emissiveMap.channel),metalnessMapUv:Ae&&_(E.metalnessMap.channel),roughnessMapUv:R&&_(E.roughnessMap.channel),anisotropyMapUv:ce&&_(E.anisotropyMap.channel),clearcoatMapUv:fe&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:it&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:me&&_(E.sheenRoughnessMap.channel),specularMapUv:et&&_(E.specularMap.channel),specularColorMapUv:Ve&&_(E.specularColorMap.channel),specularIntensityMapUv:vt&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:re&&_(E.thicknessMap.channel),alphaMapUv:K&&_(E.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Qe||v),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Z.attributes.uv&&(Pt||K),fog:!!$,useFog:E.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Pe,skinning:H.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Ye,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Dt,decodeVideoTexture:Pt&&E.map.isVideoTexture===!0&&Ke.getTransfer(E.map.colorSpace)===mt,decodeVideoTextureEmissive:bt&&E.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(E.emissiveMap.colorSpace)===mt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Jt,flipSided:E.side===dn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:ke&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&E.extensions.multiDraw===!0||je)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return en.vertexUv1s=l.has(1),en.vertexUv2s=l.has(2),en.vertexUv3s=l.has(3),l.clear(),en}function f(E){const y=[];if(E.shaderID?y.push(E.shaderID):(y.push(E.customVertexShaderID),y.push(E.customFragmentShaderID)),E.defines!==void 0)for(const D in E.defines)y.push(D),y.push(E.defines[D]);return E.isRawShaderMaterial===!1&&(M(y,E),b(y,E),y.push(i.outputColorSpace)),y.push(E.customProgramCacheKey),y.join()}function M(E,y){E.push(y.precision),E.push(y.outputColorSpace),E.push(y.envMapMode),E.push(y.envMapCubeUVHeight),E.push(y.mapUv),E.push(y.alphaMapUv),E.push(y.lightMapUv),E.push(y.aoMapUv),E.push(y.bumpMapUv),E.push(y.normalMapUv),E.push(y.displacementMapUv),E.push(y.emissiveMapUv),E.push(y.metalnessMapUv),E.push(y.roughnessMapUv),E.push(y.anisotropyMapUv),E.push(y.clearcoatMapUv),E.push(y.clearcoatNormalMapUv),E.push(y.clearcoatRoughnessMapUv),E.push(y.iridescenceMapUv),E.push(y.iridescenceThicknessMapUv),E.push(y.sheenColorMapUv),E.push(y.sheenRoughnessMapUv),E.push(y.specularMapUv),E.push(y.specularColorMapUv),E.push(y.specularIntensityMapUv),E.push(y.transmissionMapUv),E.push(y.thicknessMapUv),E.push(y.combine),E.push(y.fogExp2),E.push(y.sizeAttenuation),E.push(y.morphTargetsCount),E.push(y.morphAttributeCount),E.push(y.numDirLights),E.push(y.numPointLights),E.push(y.numSpotLights),E.push(y.numSpotLightMaps),E.push(y.numHemiLights),E.push(y.numRectAreaLights),E.push(y.numDirLightShadows),E.push(y.numPointLightShadows),E.push(y.numSpotLightShadows),E.push(y.numSpotLightShadowsWithMaps),E.push(y.numLightProbes),E.push(y.shadowMapType),E.push(y.toneMapping),E.push(y.numClippingPlanes),E.push(y.numClipIntersection),E.push(y.depthPacking)}function b(E,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),E.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),E.push(a.mask)}function x(E){const y=g[E.type];let D;if(y){const V=ni[y];D=_g.clone(V.uniforms)}else D=E.uniforms;return D}function C(E,y){let D;for(let V=0,H=h.length;V<H;V++){const $=h[V];if($.cacheKey===y){D=$,++D.usedTimes;break}}return D===void 0&&(D=new Pv(i,y,E,r),h.push(D)),D}function T(E){if(--E.usedTimes===0){const y=h.indexOf(E);h[y]=h[h.length-1],h.pop(),E.destroy()}}function w(E){c.remove(E)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:C,releaseProgram:T,releaseShaderCache:w,programs:h,dispose:L}}function Uv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Ov(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Su(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,d,p,g,_,m){let f=i[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||Ov),n.length>1&&n.sort(d||Su),s.length>1&&s.sort(d||Su)}function h(){for(let u=e,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Fv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new bu,i.set(n,[o])):s>=r.length?(o=new bu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Bv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new De};break;case"SpotLight":t={position:new P,direction:new P,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function kv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let zv=0;function Hv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Vv(i){const e=new Bv,t=kv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const s=new P,r=new Fe,o=new Fe;function a(l){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,M=0,b=0,x=0,C=0,T=0,w=0;l.sort(Hv);for(let E=0,y=l.length;E<y;E++){const D=l[E],V=D.color,H=D.intensity,$=D.distance,Z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=V.r*H,u+=V.g*H,d+=V.b*H;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],H);w++}else if(D.isDirectionalLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Q=D.shadow,W=t.get(D);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.directionalShadow[p]=W,n.directionalShadowMap[p]=Z,n.directionalShadowMatrix[p]=D.shadow.matrix,M++}n.directional[p]=X,p++}else if(D.isSpotLight){const X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(V).multiplyScalar(H),X.distance=$,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[_]=X;const Q=D.shadow;if(D.map&&(n.spotLightMap[C]=D.map,C++,Q.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[_]=Q.matrix,D.castShadow){const W=t.get(D);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=Z,x++}_++}else if(D.isRectAreaLight){const X=e.get(D);X.color.copy(V).multiplyScalar(H),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=X,m++}else if(D.isPointLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){const Q=D.shadow,W=t.get(D);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=Z,n.pointShadowMatrix[g]=D.shadow.matrix,b++}n.point[g]=X,g++}else if(D.isHemisphereLight){const X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(H),X.groundColor.copy(D.groundColor).multiplyScalar(H),n.hemi[f]=X,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=se.LTC_FLOAT_1,n.rectAreaLTC2=se.LTC_FLOAT_2):(n.rectAreaLTC1=se.LTC_HALF_1,n.rectAreaLTC2=se.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==f||L.numDirectionalShadows!==M||L.numPointShadows!==b||L.numSpotShadows!==x||L.numSpotMaps!==C||L.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=w,L.directionalLength=p,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=f,L.numDirectionalShadows=M,L.numPointShadows=b,L.numSpotShadows=x,L.numSpotMaps=C,L.numLightProbes=w,n.version=zv++)}function c(l,h){let u=0,d=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,M=l.length;f<M;f++){const b=l[f];if(b.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(b.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function Eu(i){const e=new Vv(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Gv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Eu(i),e.set(s,[a])):r>=o.length?(a=new Eu(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Wv extends oi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Em,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xv extends oi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const $v=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yv=`uniform sampler2D shadow_pass;
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
}`;function jv(i,e,t){let n=new ql;const s=new Re,r=new Re,o=new at,a=new Wv({depthPacking:Tm}),c=new Xv,l={},h=t.maxTextureSize,u={[Ni]:dn,[dn]:Ni,[Jt]:Jt},d=new as({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:$v,fragmentShader:Yv}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Qt;g.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ie(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bl;let f=this.type;this.render=function(T,w,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const E=i.getRenderTarget(),y=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),V=i.state;V.setBlending(is),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const H=f!==Mi&&this.type===Mi,$=f===Mi&&this.type!==Mi;for(let Z=0,X=T.length;Z<X;Z++){const Q=T[Z],W=Q.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const oe=W.getFrameExtents();if(s.multiply(oe),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/oe.x),s.x=r.x*oe.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/oe.y),s.y=r.y*oe.y,W.mapSize.y=r.y)),W.map===null||H===!0||$===!0){const Ee=this.type!==Mi?{minFilter:fn,magFilter:fn}:{};W.map!==null&&W.map.dispose(),W.map=new Ts(s.x,s.y,Ee),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const de=W.getViewportCount();for(let Ee=0;Ee<de;Ee++){const Ye=W.getViewport(Ee);o.set(r.x*Ye.x,r.y*Ye.y,r.x*Ye.z,r.y*Ye.w),V.viewport(o),W.updateMatrices(Q,Ee),n=W.getFrustum(),x(w,L,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===Mi&&M(W,L),W.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,y,D)};function M(T,w){const L=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ts(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(w,null,L,d,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(w,null,L,p,_,null)}function b(T,w,L,E){let y=null;const D=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)y=D;else if(y=L.isPointLight===!0?c:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const V=y.uuid,H=w.uuid;let $=l[V];$===void 0&&($={},l[V]=$);let Z=$[H];Z===void 0&&(Z=y.clone(),$[H]=Z,w.addEventListener("dispose",C)),y=Z}if(y.visible=w.visible,y.wireframe=w.wireframe,E===Mi?y.side=w.shadowSide!==null?w.shadowSide:w.side:y.side=w.shadowSide!==null?w.shadowSide:u[w.side],y.alphaMap=w.alphaMap,y.alphaTest=w.alphaTest,y.map=w.map,y.clipShadows=w.clipShadows,y.clippingPlanes=w.clippingPlanes,y.clipIntersection=w.clipIntersection,y.displacementMap=w.displacementMap,y.displacementScale=w.displacementScale,y.displacementBias=w.displacementBias,y.wireframeLinewidth=w.wireframeLinewidth,y.linewidth=w.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const V=i.properties.get(y);V.light=L}return y}function x(T,w,L,E,y){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===Mi)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const H=e.update(T),$=T.material;if(Array.isArray($)){const Z=H.groups;for(let X=0,Q=Z.length;X<Q;X++){const W=Z[X],oe=$[W.materialIndex];if(oe&&oe.visible){const de=b(T,oe,E,y);T.onBeforeShadow(i,T,w,L,H,de,W),i.renderBufferDirect(L,null,H,de,T,W),T.onAfterShadow(i,T,w,L,H,de,W)}}}else if($.visible){const Z=b(T,$,E,y);T.onBeforeShadow(i,T,w,L,H,Z,null),i.renderBufferDirect(L,null,H,Z,T,null),T.onAfterShadow(i,T,w,L,H,Z,null)}}const V=T.children;for(let H=0,$=V.length;H<$;H++)x(V[H],w,L,E,y)}function C(T){T.target.removeEventListener("dispose",C);for(const L in l){const E=l[L],y=T.target.uuid;y in E&&(E[y].dispose(),delete E[y])}}}const qv={[Cc]:Pc,[Lc]:Nc,[Dc]:Uc,[nr]:Ic,[Pc]:Cc,[Nc]:Lc,[Uc]:Dc,[Ic]:nr};function Kv(i,e){function t(){let I=!1;const re=new at;let G=null;const K=new at(0,0,0,0);return{setMask:function(ue){G!==ue&&!I&&(i.colorMask(ue,ue,ue,ue),G=ue)},setLocked:function(ue){I=ue},setClear:function(ue,le,ke,Dt,en){en===!0&&(ue*=Dt,le*=Dt,ke*=Dt),re.set(ue,le,ke,Dt),K.equals(re)===!1&&(i.clearColor(ue,le,ke,Dt),K.copy(re))},reset:function(){I=!1,G=null,K.set(-1,0,0,0)}}}function n(){let I=!1,re=!1,G=null,K=null,ue=null;return{setReversed:function(le){if(re!==le){const ke=e.get("EXT_clip_control");re?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT);const Dt=ue;ue=null,this.setClear(Dt)}re=le},getReversed:function(){return re},setTest:function(le){le?ae(i.DEPTH_TEST):Pe(i.DEPTH_TEST)},setMask:function(le){G!==le&&!I&&(i.depthMask(le),G=le)},setFunc:function(le){if(re&&(le=qv[le]),K!==le){switch(le){case Cc:i.depthFunc(i.NEVER);break;case Pc:i.depthFunc(i.ALWAYS);break;case Lc:i.depthFunc(i.LESS);break;case nr:i.depthFunc(i.LEQUAL);break;case Dc:i.depthFunc(i.EQUAL);break;case Ic:i.depthFunc(i.GEQUAL);break;case Nc:i.depthFunc(i.GREATER);break;case Uc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}K=le}},setLocked:function(le){I=le},setClear:function(le){ue!==le&&(re&&(le=1-le),i.clearDepth(le),ue=le)},reset:function(){I=!1,G=null,K=null,ue=null,re=!1}}}function s(){let I=!1,re=null,G=null,K=null,ue=null,le=null,ke=null,Dt=null,en=null;return{setTest:function(ut){I||(ut?ae(i.STENCIL_TEST):Pe(i.STENCIL_TEST))},setMask:function(ut){re!==ut&&!I&&(i.stencilMask(ut),re=ut)},setFunc:function(ut,Bn,fi){(G!==ut||K!==Bn||ue!==fi)&&(i.stencilFunc(ut,Bn,fi),G=ut,K=Bn,ue=fi)},setOp:function(ut,Bn,fi){(le!==ut||ke!==Bn||Dt!==fi)&&(i.stencilOp(ut,Bn,fi),le=ut,ke=Bn,Dt=fi)},setLocked:function(ut){I=ut},setClear:function(ut){en!==ut&&(i.clearStencil(ut),en=ut)},reset:function(){I=!1,re=null,G=null,K=null,ue=null,le=null,ke=null,Dt=null,en=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,b=null,x=null,C=null,T=null,w=new De(0,0,0),L=0,E=!1,y=null,D=null,V=null,H=null,$=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Q=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),X=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),X=Q>=2);let oe=null,de={};const Ee=i.getParameter(i.SCISSOR_BOX),Ye=i.getParameter(i.VIEWPORT),xt=new at().fromArray(Ee),j=new at().fromArray(Ye);function ne(I,re,G,K){const ue=new Uint8Array(4),le=i.createTexture();i.bindTexture(I,le),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ke=0;ke<G;ke++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(re,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,ue):i.texImage2D(re+ke,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ue);return le}const ve={};ve[i.TEXTURE_2D]=ne(i.TEXTURE_2D,i.TEXTURE_2D,1),ve[i.TEXTURE_CUBE_MAP]=ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[i.TEXTURE_2D_ARRAY]=ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ve[i.TEXTURE_3D]=ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(i.DEPTH_TEST),o.setFunc(nr),Je(!1),Qe(Eh),ae(i.CULL_FACE),O(is);function ae(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Pe(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Be(I,re){return u[I]!==re?(i.bindFramebuffer(I,re),u[I]=re,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=re),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=re),!0):!1}function je(I,re){let G=p,K=!1;if(I){G=d.get(re),G===void 0&&(G=[],d.set(re,G));const ue=I.textures;if(G.length!==ue.length||G[0]!==i.COLOR_ATTACHMENT0){for(let le=0,ke=ue.length;le<ke;le++)G[le]=i.COLOR_ATTACHMENT0+le;G.length=ue.length,K=!0}}else G[0]!==i.BACK&&(G[0]=i.BACK,K=!0);K&&i.drawBuffers(G)}function Pt(I){return g!==I?(i.useProgram(I),g=I,!0):!1}const nt={[ys]:i.FUNC_ADD,[Kp]:i.FUNC_SUBTRACT,[Zp]:i.FUNC_REVERSE_SUBTRACT};nt[Jp]=i.MIN,nt[Qp]=i.MAX;const Nt={[em]:i.ZERO,[tm]:i.ONE,[nm]:i.SRC_COLOR,[wc]:i.SRC_ALPHA,[cm]:i.SRC_ALPHA_SATURATE,[om]:i.DST_COLOR,[sm]:i.DST_ALPHA,[im]:i.ONE_MINUS_SRC_COLOR,[Rc]:i.ONE_MINUS_SRC_ALPHA,[am]:i.ONE_MINUS_DST_COLOR,[rm]:i.ONE_MINUS_DST_ALPHA,[lm]:i.CONSTANT_COLOR,[hm]:i.ONE_MINUS_CONSTANT_COLOR,[um]:i.CONSTANT_ALPHA,[dm]:i.ONE_MINUS_CONSTANT_ALPHA};function O(I,re,G,K,ue,le,ke,Dt,en,ut){if(I===is){_===!0&&(Pe(i.BLEND),_=!1);return}if(_===!1&&(ae(i.BLEND),_=!0),I!==qp){if(I!==m||ut!==E){if((f!==ys||x!==ys)&&(i.blendEquation(i.FUNC_ADD),f=ys,x=ys),ut)switch(I){case Ks:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Th:i.blendFunc(i.ONE,i.ONE);break;case Ah:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ks:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Th:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ah:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}M=null,b=null,C=null,T=null,w.set(0,0,0),L=0,m=I,E=ut}return}ue=ue||re,le=le||G,ke=ke||K,(re!==f||ue!==x)&&(i.blendEquationSeparate(nt[re],nt[ue]),f=re,x=ue),(G!==M||K!==b||le!==C||ke!==T)&&(i.blendFuncSeparate(Nt[G],Nt[K],Nt[le],Nt[ke]),M=G,b=K,C=le,T=ke),(Dt.equals(w)===!1||en!==L)&&(i.blendColor(Dt.r,Dt.g,Dt.b,en),w.copy(Dt),L=en),m=I,E=!1}function Pn(I,re){I.side===Jt?Pe(i.CULL_FACE):ae(i.CULL_FACE);let G=I.side===dn;re&&(G=!G),Je(G),I.blending===Ks&&I.transparent===!1?O(is):O(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const K=I.stencilWrite;a.setTest(K),K&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),bt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):Pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Je(I){y!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),y=I)}function Qe(I){I!==Yp?(ae(i.CULL_FACE),I!==D&&(I===Eh?i.cullFace(i.BACK):I===jp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Pe(i.CULL_FACE),D=I}function we(I){I!==V&&(X&&i.lineWidth(I),V=I)}function bt(I,re,G){I?(ae(i.POLYGON_OFFSET_FILL),(H!==re||$!==G)&&(i.polygonOffset(re,G),H=re,$=G)):Pe(i.POLYGON_OFFSET_FILL)}function Ae(I){I?ae(i.SCISSOR_TEST):Pe(i.SCISSOR_TEST)}function R(I){I===void 0&&(I=i.TEXTURE0+Z-1),oe!==I&&(i.activeTexture(I),oe=I)}function v(I,re,G){G===void 0&&(oe===null?G=i.TEXTURE0+Z-1:G=oe);let K=de[G];K===void 0&&(K={type:void 0,texture:void 0},de[G]=K),(K.type!==I||K.texture!==re)&&(oe!==G&&(i.activeTexture(G),oe=G),i.bindTexture(I,re||ve[I]),K.type=I,K.texture=re)}function B(){const I=de[oe];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Y(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ce(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function fe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function it(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ee(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pe(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ce(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ie(I){xt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),xt.copy(I))}function me(I){j.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),j.copy(I))}function et(I,re){let G=l.get(re);G===void 0&&(G=new WeakMap,l.set(re,G));let K=G.get(I);K===void 0&&(K=i.getUniformBlockIndex(re,I.name),G.set(I,K))}function Ve(I,re){const K=l.get(re).get(I);c.get(re)!==K&&(i.uniformBlockBinding(re,K,I.__bindingPointIndex),c.set(re,K))}function vt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},oe=null,de={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,M=null,b=null,x=null,C=null,T=null,w=new De(0,0,0),L=0,E=!1,y=null,D=null,V=null,H=null,$=null,xt.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Pe,bindFramebuffer:Be,drawBuffers:je,useProgram:Pt,setBlending:O,setMaterial:Pn,setFlipSided:Je,setCullFace:Qe,setLineWidth:we,setPolygonOffset:bt,setScissorTest:Ae,activeTexture:R,bindTexture:v,unbindTexture:B,compressedTexImage2D:q,compressedTexImage3D:J,texImage2D:pe,texImage3D:Ce,updateUBOMapping:et,uniformBlockBinding:Ve,texStorage2D:it,texStorage3D:ee,texSubImage2D:Y,texSubImage3D:Me,compressedTexSubImage2D:ce,compressedTexSubImage3D:fe,scissor:Ie,viewport:me,reset:vt}}function Tu(i,e,t,n){const s=Zv(n);switch(t){case Jd:return i*e;case ef:return i*e;case tf:return i*e*2;case Vl:return i*e/s.components*s.byteLength;case Gl:return i*e/s.components*s.byteLength;case nf:return i*e*2/s.components*s.byteLength;case Wl:return i*e*2/s.components*s.byteLength;case Qd:return i*e*3/s.components*s.byteLength;case Nn:return i*e*4/s.components*s.byteLength;case Xl:return i*e*4/s.components*s.byteLength;case ea:case ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case na:case ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case kc:case Hc:return Math.max(i,16)*Math.max(e,8)/4;case Bc:case zc:return Math.max(i,8)*Math.max(e,8)/2;case Vc:case Gc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Wc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case $c:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Yc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case jc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case qc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Kc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Zc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Jc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Qc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case el:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case tl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case nl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case il:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case sl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case sa:case rl:case ol:return Math.ceil(i/4)*Math.ceil(e/4)*16;case sf:case al:return Math.ceil(i/4)*Math.ceil(e/4)*8;case cl:case ll:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Zv(i){switch(i){case Ui:case qd:return{byteLength:1,components:1};case $r:case Kd:case ro:return{byteLength:2,components:1};case zl:case Hl:return{byteLength:2,components:4};case Es:case kl:case qn:return{byteLength:4,components:1};case Zd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Jv(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Re,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,v){return p?new OffscreenCanvas(R,v):qr("canvas")}function _(R,v,B){let q=1;const J=Ae(R);if((J.width>B||J.height>B)&&(q=B/Math.max(J.width,J.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Y=Math.floor(q*J.width),Me=Math.floor(q*J.height);u===void 0&&(u=g(Y,Me));const ce=v?g(Y,Me):u;return ce.width=Y,ce.height=Me,ce.getContext("2d").drawImage(R,0,0,Y,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+Me+")."),ce}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function m(R){return R.generateMipmaps}function f(R){i.generateMipmap(R)}function M(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(R,v,B,q,J=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=v;if(v===i.RED&&(B===i.FLOAT&&(Y=i.R32F),B===i.HALF_FLOAT&&(Y=i.R16F),B===i.UNSIGNED_BYTE&&(Y=i.R8)),v===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.R8UI),B===i.UNSIGNED_SHORT&&(Y=i.R16UI),B===i.UNSIGNED_INT&&(Y=i.R32UI),B===i.BYTE&&(Y=i.R8I),B===i.SHORT&&(Y=i.R16I),B===i.INT&&(Y=i.R32I)),v===i.RG&&(B===i.FLOAT&&(Y=i.RG32F),B===i.HALF_FLOAT&&(Y=i.RG16F),B===i.UNSIGNED_BYTE&&(Y=i.RG8)),v===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RG8UI),B===i.UNSIGNED_SHORT&&(Y=i.RG16UI),B===i.UNSIGNED_INT&&(Y=i.RG32UI),B===i.BYTE&&(Y=i.RG8I),B===i.SHORT&&(Y=i.RG16I),B===i.INT&&(Y=i.RG32I)),v===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),B===i.UNSIGNED_INT&&(Y=i.RGB32UI),B===i.BYTE&&(Y=i.RGB8I),B===i.SHORT&&(Y=i.RGB16I),B===i.INT&&(Y=i.RGB32I)),v===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),B===i.UNSIGNED_INT&&(Y=i.RGBA32UI),B===i.BYTE&&(Y=i.RGBA8I),B===i.SHORT&&(Y=i.RGBA16I),B===i.INT&&(Y=i.RGBA32I)),v===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),v===i.RGBA){const Me=J?va:Ke.getTransfer(q);B===i.FLOAT&&(Y=i.RGBA32F),B===i.HALF_FLOAT&&(Y=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Y=Me===mt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function x(R,v){let B;return R?v===null||v===Es||v===rr?B=i.DEPTH24_STENCIL8:v===qn?B=i.DEPTH32F_STENCIL8:v===$r&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Es||v===rr?B=i.DEPTH_COMPONENT24:v===qn?B=i.DEPTH_COMPONENT32F:v===$r&&(B=i.DEPTH_COMPONENT16),B}function C(R,v){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==fn&&R.minFilter!==zt?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function T(R){const v=R.target;v.removeEventListener("dispose",T),L(v),v.isVideoTexture&&h.delete(v)}function w(R){const v=R.target;v.removeEventListener("dispose",w),y(v)}function L(R){const v=n.get(R);if(v.__webglInit===void 0)return;const B=R.source,q=d.get(B);if(q){const J=q[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&E(R),Object.keys(q).length===0&&d.delete(B)}n.remove(R)}function E(R){const v=n.get(R);i.deleteTexture(v.__webglTexture);const B=R.source,q=d.get(B);delete q[v.__cacheKey],o.memory.textures--}function y(R){const v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let J=0;J<v.__webglFramebuffer[q].length;J++)i.deleteFramebuffer(v.__webglFramebuffer[q][J]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=R.textures;for(let q=0,J=B.length;q<J;q++){const Y=n.get(B[q]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(B[q])}n.remove(R)}let D=0;function V(){D=0}function H(){const R=D;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),D+=1,R}function $(R){const v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function Z(R,v){const B=n.get(R);if(R.isVideoTexture&&we(R),R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){const q=R.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(B,R,v);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+v)}function X(R,v){const B=n.get(R);if(R.version>0&&B.__version!==R.version){j(B,R,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+v)}function Q(R,v){const B=n.get(R);if(R.version>0&&B.__version!==R.version){j(B,R,v);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+v)}function W(R,v){const B=n.get(R);if(R.version>0&&B.__version!==R.version){ne(B,R,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+v)}const oe={[os]:i.REPEAT,[es]:i.CLAMP_TO_EDGE,[ha]:i.MIRRORED_REPEAT},de={[fn]:i.NEAREST,[jd]:i.NEAREST_MIPMAP_NEAREST,[kr]:i.NEAREST_MIPMAP_LINEAR,[zt]:i.LINEAR,[Qo]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},Ee={[wm]:i.NEVER,[Im]:i.ALWAYS,[Rm]:i.LESS,[af]:i.LEQUAL,[Cm]:i.EQUAL,[Dm]:i.GEQUAL,[Pm]:i.GREATER,[Lm]:i.NOTEQUAL};function Ye(R,v){if(v.type===qn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===zt||v.magFilter===Qo||v.magFilter===kr||v.magFilter===Ai||v.minFilter===zt||v.minFilter===Qo||v.minFilter===kr||v.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,oe[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,oe[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,oe[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,de[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,de[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Ee[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===fn||v.minFilter!==kr&&v.minFilter!==Ai||v.type===qn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function xt(R,v){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",T));const q=v.source;let J=d.get(q);J===void 0&&(J={},d.set(q,J));const Y=$(v);if(Y!==R.__cacheKey){J[Y]===void 0&&(J[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),J[Y].usedTimes++;const Me=J[R.__cacheKey];Me!==void 0&&(J[R.__cacheKey].usedTimes--,Me.usedTimes===0&&E(v)),R.__cacheKey=Y,R.__webglTexture=J[Y].texture}return B}function j(R,v,B){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);const J=xt(R,v),Y=v.source;t.bindTexture(q,R.__webglTexture,i.TEXTURE0+B);const Me=n.get(Y);if(Y.version!==Me.__version||J===!0){t.activeTexture(i.TEXTURE0+B);const ce=Ke.getPrimaries(Ke.workingColorSpace),fe=v.colorSpace===Ji?null:Ke.getPrimaries(v.colorSpace),it=v.colorSpace===Ji||ce===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let ee=_(v.image,!1,s.maxTextureSize);ee=bt(v,ee);const pe=r.convert(v.format,v.colorSpace),Ce=r.convert(v.type);let Ie=b(v.internalFormat,pe,Ce,v.colorSpace,v.isVideoTexture);Ye(q,v);let me;const et=v.mipmaps,Ve=v.isVideoTexture!==!0,vt=Me.__version===void 0||J===!0,I=Y.dataReady,re=C(v,ee);if(v.isDepthTexture)Ie=x(v.format===or,v.type),vt&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,Ie,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Ie,ee.width,ee.height,0,pe,Ce,null));else if(v.isDataTexture)if(et.length>0){Ve&&vt&&t.texStorage2D(i.TEXTURE_2D,re,Ie,et[0].width,et[0].height);for(let G=0,K=et.length;G<K;G++)me=et[G],Ve?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,me.width,me.height,pe,Ce,me.data):t.texImage2D(i.TEXTURE_2D,G,Ie,me.width,me.height,0,pe,Ce,me.data);v.generateMipmaps=!1}else Ve?(vt&&t.texStorage2D(i.TEXTURE_2D,re,Ie,ee.width,ee.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee.width,ee.height,pe,Ce,ee.data)):t.texImage2D(i.TEXTURE_2D,0,Ie,ee.width,ee.height,0,pe,Ce,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ve&&vt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Ie,et[0].width,et[0].height,ee.depth);for(let G=0,K=et.length;G<K;G++)if(me=et[G],v.format!==Nn)if(pe!==null)if(Ve){if(I)if(v.layerUpdates.size>0){const ue=Tu(me.width,me.height,v.format,v.type);for(const le of v.layerUpdates){const ke=me.data.subarray(le*ue/me.data.BYTES_PER_ELEMENT,(le+1)*ue/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,le,me.width,me.height,1,pe,ke)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,me.width,me.height,ee.depth,pe,me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,G,Ie,me.width,me.height,ee.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,G,0,0,0,me.width,me.height,ee.depth,pe,Ce,me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,G,Ie,me.width,me.height,ee.depth,0,pe,Ce,me.data)}else{Ve&&vt&&t.texStorage2D(i.TEXTURE_2D,re,Ie,et[0].width,et[0].height);for(let G=0,K=et.length;G<K;G++)me=et[G],v.format!==Nn?pe!==null?Ve?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,G,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(i.TEXTURE_2D,G,Ie,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,me.width,me.height,pe,Ce,me.data):t.texImage2D(i.TEXTURE_2D,G,Ie,me.width,me.height,0,pe,Ce,me.data)}else if(v.isDataArrayTexture)if(Ve){if(vt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,Ie,ee.width,ee.height,ee.depth),I)if(v.layerUpdates.size>0){const G=Tu(ee.width,ee.height,v.format,v.type);for(const K of v.layerUpdates){const ue=ee.data.subarray(K*G/ee.data.BYTES_PER_ELEMENT,(K+1)*G/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,ee.width,ee.height,1,pe,Ce,ue)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,pe,Ce,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,ee.width,ee.height,ee.depth,0,pe,Ce,ee.data);else if(v.isData3DTexture)Ve?(vt&&t.texStorage3D(i.TEXTURE_3D,re,Ie,ee.width,ee.height,ee.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,pe,Ce,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,ee.width,ee.height,ee.depth,0,pe,Ce,ee.data);else if(v.isFramebufferTexture){if(vt)if(Ve)t.texStorage2D(i.TEXTURE_2D,re,Ie,ee.width,ee.height);else{let G=ee.width,K=ee.height;for(let ue=0;ue<re;ue++)t.texImage2D(i.TEXTURE_2D,ue,Ie,G,K,0,pe,Ce,null),G>>=1,K>>=1}}else if(et.length>0){if(Ve&&vt){const G=Ae(et[0]);t.texStorage2D(i.TEXTURE_2D,re,Ie,G.width,G.height)}for(let G=0,K=et.length;G<K;G++)me=et[G],Ve?I&&t.texSubImage2D(i.TEXTURE_2D,G,0,0,pe,Ce,me):t.texImage2D(i.TEXTURE_2D,G,Ie,pe,Ce,me);v.generateMipmaps=!1}else if(Ve){if(vt){const G=Ae(ee);t.texStorage2D(i.TEXTURE_2D,re,Ie,G.width,G.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Ce,ee)}else t.texImage2D(i.TEXTURE_2D,0,Ie,pe,Ce,ee);m(v)&&f(q),Me.__version=Y.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function ne(R,v,B){if(v.image.length!==6)return;const q=xt(R,v),J=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+B);const Y=n.get(J);if(J.version!==Y.__version||q===!0){t.activeTexture(i.TEXTURE0+B);const Me=Ke.getPrimaries(Ke.workingColorSpace),ce=v.colorSpace===Ji?null:Ke.getPrimaries(v.colorSpace),fe=v.colorSpace===Ji||Me===ce?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const it=v.isCompressedTexture||v.image[0].isCompressedTexture,ee=v.image[0]&&v.image[0].isDataTexture,pe=[];for(let K=0;K<6;K++)!it&&!ee?pe[K]=_(v.image[K],!0,s.maxCubemapSize):pe[K]=ee?v.image[K].image:v.image[K],pe[K]=bt(v,pe[K]);const Ce=pe[0],Ie=r.convert(v.format,v.colorSpace),me=r.convert(v.type),et=b(v.internalFormat,Ie,me,v.colorSpace),Ve=v.isVideoTexture!==!0,vt=Y.__version===void 0||q===!0,I=J.dataReady;let re=C(v,Ce);Ye(i.TEXTURE_CUBE_MAP,v);let G;if(it){Ve&&vt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,re,et,Ce.width,Ce.height);for(let K=0;K<6;K++){G=pe[K].mipmaps;for(let ue=0;ue<G.length;ue++){const le=G[ue];v.format!==Nn?Ie!==null?Ve?I&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue,0,0,le.width,le.height,Ie,le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue,et,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue,0,0,le.width,le.height,Ie,me,le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue,et,le.width,le.height,0,Ie,me,le.data)}}}else{if(G=v.mipmaps,Ve&&vt){G.length>0&&re++;const K=Ae(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,re,et,K.width,K.height)}for(let K=0;K<6;K++)if(ee){Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,pe[K].width,pe[K].height,Ie,me,pe[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,et,pe[K].width,pe[K].height,0,Ie,me,pe[K].data);for(let ue=0;ue<G.length;ue++){const ke=G[ue].image[K].image;Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue+1,0,0,ke.width,ke.height,Ie,me,ke.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue+1,et,ke.width,ke.height,0,Ie,me,ke.data)}}else{Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ie,me,pe[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,et,Ie,me,pe[K]);for(let ue=0;ue<G.length;ue++){const le=G[ue];Ve?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue+1,0,0,Ie,me,le.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ue+1,et,Ie,me,le.image[K])}}}m(v)&&f(i.TEXTURE_CUBE_MAP),Y.__version=J.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function ve(R,v,B,q,J,Y){const Me=r.convert(B.format,B.colorSpace),ce=r.convert(B.type),fe=b(B.internalFormat,Me,ce,B.colorSpace),it=n.get(v),ee=n.get(B);if(ee.__renderTarget=v,!it.__hasExternalTextures){const pe=Math.max(1,v.width>>Y),Ce=Math.max(1,v.height>>Y);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,Y,fe,pe,Ce,v.depth,0,Me,ce,null):t.texImage2D(J,Y,fe,pe,Ce,0,Me,ce,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Qe(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,J,ee.__webglTexture,0,Je(v)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,J,ee.__webglTexture,Y),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(R,v,B){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){const q=v.depthTexture,J=q&&q.isDepthTexture?q.type:null,Y=x(v.stencilBuffer,J),Me=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=Je(v);Qe(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce,Y,v.width,v.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,Y,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Y,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,R)}else{const q=v.textures;for(let J=0;J<q.length;J++){const Y=q[J],Me=r.convert(Y.format,Y.colorSpace),ce=r.convert(Y.type),fe=b(Y.internalFormat,Me,ce,Y.colorSpace),it=Je(v);B&&Qe(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,fe,v.width,v.height):Qe(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,fe,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,fe,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pe(R,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(v.depthTexture);q.__renderTarget=v,(!q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Z(v.depthTexture,0);const J=q.__webglTexture,Y=Je(v);if(v.depthTexture.format===Zs)Qe(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(v.depthTexture.format===or)Qe(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Be(R){const v=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){const q=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",J)};q.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=q}if(R.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Pe(v.__webglFramebuffer,R)}else if(B){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=i.createRenderbuffer(),ae(v.__webglDepthbuffer[q],R,!1);else{const J=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,Y)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),ae(v.__webglDepthbuffer,R,!1);else{const q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,J)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(R,v,B){const q=n.get(R);v!==void 0&&ve(q.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Be(R)}function Pt(R){const v=R.texture,B=n.get(R),q=n.get(v);R.addEventListener("dispose",w);const J=R.textures,Y=R.isWebGLCubeRenderTarget===!0,Me=J.length>1;if(Me||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,o.memory.textures++),Y){B.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[ce]=[];for(let fe=0;fe<v.mipmaps.length;fe++)B.__webglFramebuffer[ce][fe]=i.createFramebuffer()}else B.__webglFramebuffer[ce]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let ce=0;ce<v.mipmaps.length;ce++)B.__webglFramebuffer[ce]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Me)for(let ce=0,fe=J.length;ce<fe;ce++){const it=n.get(J[ce]);it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Qe(R)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ce=0;ce<J.length;ce++){const fe=J[ce];B.__webglColorRenderbuffer[ce]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ce]);const it=r.convert(fe.format,fe.colorSpace),ee=r.convert(fe.type),pe=b(fe.internalFormat,it,ee,fe.colorSpace,R.isXRRenderTarget===!0),Ce=Je(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ce,pe,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ce,i.RENDERBUFFER,B.__webglColorRenderbuffer[ce])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ae(B.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ye(i.TEXTURE_CUBE_MAP,v);for(let ce=0;ce<6;ce++)if(v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)ve(B.__webglFramebuffer[ce][fe],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,fe);else ve(B.__webglFramebuffer[ce],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(v)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ce=0,fe=J.length;ce<fe;ce++){const it=J[ce],ee=n.get(it);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture),Ye(i.TEXTURE_2D,it),ve(B.__webglFramebuffer,R,it,i.COLOR_ATTACHMENT0+ce,i.TEXTURE_2D,0),m(it)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let ce=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ce=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ce,q.__webglTexture),Ye(ce,v),v.mipmaps&&v.mipmaps.length>0)for(let fe=0;fe<v.mipmaps.length;fe++)ve(B.__webglFramebuffer[fe],R,v,i.COLOR_ATTACHMENT0,ce,fe);else ve(B.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,ce,0);m(v)&&f(ce),t.unbindTexture()}R.depthBuffer&&Be(R)}function nt(R){const v=R.textures;for(let B=0,q=v.length;B<q;B++){const J=v[B];if(m(J)){const Y=M(R),Me=n.get(J).__webglTexture;t.bindTexture(Y,Me),f(Y),t.unbindTexture()}}}const Nt=[],O=[];function Pn(R){if(R.samples>0){if(Qe(R)===!1){const v=R.textures,B=R.width,q=R.height;let J=i.COLOR_BUFFER_BIT;const Y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(R),ce=v.length>1;if(ce)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),ce){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[fe]);const it=n.get(v[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,it,0)}i.blitFramebuffer(0,0,B,q,0,0,B,q,J,i.NEAREST),c===!0&&(Nt.length=0,O.length=0,Nt.push(i.COLOR_ATTACHMENT0+fe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Nt.push(Y),O.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,O)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Nt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ce)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,Me.__webglColorRenderbuffer[fe]);const it=n.get(v[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,it,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Je(R){return Math.min(s.maxSamples,R.samples)}function Qe(R){const v=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function we(R){const v=o.render.frame;h.get(R)!==v&&(h.set(R,v),R.update())}function bt(R,v){const B=R.colorSpace,q=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==mn&&B!==Ji&&(Ke.getTransfer(B)===mt?(q!==Nn||J!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),v}function Ae(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=V,this.setTexture2D=Z,this.setTexture2DArray=X,this.setTexture3D=Q,this.setTextureCube=W,this.rebindTextures=je,this.setupRenderTarget=Pt,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Pn,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Qe}function Qv(i,e){function t(n,s=Ji){let r;const o=Ke.getTransfer(s);if(n===Ui)return i.UNSIGNED_BYTE;if(n===zl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Hl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Zd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qd)return i.BYTE;if(n===Kd)return i.SHORT;if(n===$r)return i.UNSIGNED_SHORT;if(n===kl)return i.INT;if(n===Es)return i.UNSIGNED_INT;if(n===qn)return i.FLOAT;if(n===ro)return i.HALF_FLOAT;if(n===Jd)return i.ALPHA;if(n===Qd)return i.RGB;if(n===Nn)return i.RGBA;if(n===ef)return i.LUMINANCE;if(n===tf)return i.LUMINANCE_ALPHA;if(n===Zs)return i.DEPTH_COMPONENT;if(n===or)return i.DEPTH_STENCIL;if(n===Vl)return i.RED;if(n===Gl)return i.RED_INTEGER;if(n===nf)return i.RG;if(n===Wl)return i.RG_INTEGER;if(n===Xl)return i.RGBA_INTEGER;if(n===ea||n===ta||n===na||n===ia)if(o===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ea)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ea)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bc||n===kc||n===zc||n===Hc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Bc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===kc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===zc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Hc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vc||n===Gc||n===Wc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Vc||n===Gc)return o===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wc)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xc||n===$c||n===Yc||n===jc||n===qc||n===Kc||n===Zc||n===Jc||n===Qc||n===el||n===tl||n===nl||n===il||n===sl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xc)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===$c)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Yc)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===jc)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qc)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Kc)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Zc)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Jc)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qc)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===el)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===tl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===il)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sl)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===sa||n===rl||n===ol)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===sa)return o===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ol)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sf||n===al||n===cl||n===ll)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===sa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===al)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===cl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class ey extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ze extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ty={type:"move"};class hc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ty)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const ny=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iy=`
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

}`;class sy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Ht,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new as({vertexShader:ny,fragmentShader:iy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ie(new yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ry extends Rs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null;const _=new sy,m=t.getContextAttributes();let f=null,M=null;const b=[],x=[],C=new Re;let T=null;const w=new hn;w.viewport=new at;const L=new hn;L.viewport=new at;const E=[w,L],y=new ey;let D=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=b[j];return ne===void 0&&(ne=new hc,b[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=b[j];return ne===void 0&&(ne=new hc,b[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=b[j];return ne===void 0&&(ne=new hc,b[j]=ne),ne.getHandSpace()};function H(j){const ne=x.indexOf(j.inputSource);if(ne===-1)return;const ve=b[ne];ve!==void 0&&(ve.update(j.inputSource,j.frame,l||o),ve.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",Z);for(let j=0;j<b.length;j++){const ne=x[j];ne!==null&&(x[j]=null,b[j].disconnect(ne))}D=null,V=null,_.reset(),e.setRenderTarget(f),p=null,d=null,u=null,s=null,M=null,xt.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",$),s.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(C),s.renderState.layers===void 0){const ne={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Ts(p.framebufferWidth,p.framebufferHeight,{format:Nn,type:Ui,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ne=null,ve=null,ae=null;m.depth&&(ae=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=m.stencil?or:Zs,ve=m.stencil?rr:Es);const Pe={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Pe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Ts(d.textureWidth,d.textureHeight,{format:Nn,type:Ui,depthTexture:new xf(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),xt.setContext(s),xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Z(j){for(let ne=0;ne<j.removed.length;ne++){const ve=j.removed[ne],ae=x.indexOf(ve);ae>=0&&(x[ae]=null,b[ae].disconnect(ve))}for(let ne=0;ne<j.added.length;ne++){const ve=j.added[ne];let ae=x.indexOf(ve);if(ae===-1){for(let Be=0;Be<b.length;Be++)if(Be>=x.length){x.push(ve),ae=Be;break}else if(x[Be]===null){x[Be]=ve,ae=Be;break}if(ae===-1)break}const Pe=b[ae];Pe&&Pe.connect(ve)}}const X=new P,Q=new P;function W(j,ne,ve){X.setFromMatrixPosition(ne.matrixWorld),Q.setFromMatrixPosition(ve.matrixWorld);const ae=X.distanceTo(Q),Pe=ne.projectionMatrix.elements,Be=ve.projectionMatrix.elements,je=Pe[14]/(Pe[10]-1),Pt=Pe[14]/(Pe[10]+1),nt=(Pe[9]+1)/Pe[5],Nt=(Pe[9]-1)/Pe[5],O=(Pe[8]-1)/Pe[0],Pn=(Be[8]+1)/Be[0],Je=je*O,Qe=je*Pn,we=ae/(-O+Pn),bt=we*-O;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(bt),j.translateZ(we),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Pe[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Ae=je+we,R=Pt+we,v=Je-bt,B=Qe+(ae-bt),q=nt*Pt/R*Ae,J=Nt*Pt/R*Ae;j.projectionMatrix.makePerspective(v,B,q,J,Ae,R),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function oe(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ne=j.near,ve=j.far;_.texture!==null&&(_.depthNear>0&&(ne=_.depthNear),_.depthFar>0&&(ve=_.depthFar)),y.near=L.near=w.near=ne,y.far=L.far=w.far=ve,(D!==y.near||V!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),D=y.near,V=y.far),w.layers.mask=j.layers.mask|2,L.layers.mask=j.layers.mask|4,y.layers.mask=w.layers.mask|L.layers.mask;const ae=j.parent,Pe=y.cameras;oe(y,ae);for(let Be=0;Be<Pe.length;Be++)oe(Pe[Be],ae);Pe.length===2?W(y,w,L):y.projectionMatrix.copy(w.projectionMatrix),de(j,y,ae)};function de(j,ne,ve){ve===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(ve.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ar*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let Ee=null;function Ye(j,ne){if(h=ne.getViewerPose(l||o),g=ne,h!==null){const ve=h.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let ae=!1;ve.length!==y.cameras.length&&(y.cameras.length=0,ae=!0);for(let Be=0;Be<ve.length;Be++){const je=ve[Be];let Pt=null;if(p!==null)Pt=p.getViewport(je);else{const Nt=u.getViewSubImage(d,je);Pt=Nt.viewport,Be===0&&(e.setRenderTargetTextures(M,Nt.colorTexture,d.ignoreDepthValues?void 0:Nt.depthStencilTexture),e.setRenderTarget(M))}let nt=E[Be];nt===void 0&&(nt=new hn,nt.layers.enable(Be),nt.viewport=new at,E[Be]=nt),nt.matrix.fromArray(je.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(je.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(Pt.x,Pt.y,Pt.width,Pt.height),Be===0&&(y.matrix.copy(nt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ae===!0&&y.cameras.push(nt)}const Pe=s.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")){const Be=u.getDepthInformation(ve[0]);Be&&Be.isValid&&Be.texture&&_.init(e,Be,s.renderState)}}for(let ve=0;ve<b.length;ve++){const ae=x[ve],Pe=b[ve];ae!==null&&Pe!==void 0&&Pe.update(ae,ne,l||o)}Ee&&Ee(j,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const xt=new _f;xt.setAnimationLoop(Ye),this.setAnimationLoop=function(j){Ee=j},this.dispose=function(){}}}const ms=new Qn,oy=new Fe;function ay(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,pf(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,b,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,M,b):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===dn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===dn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=e.get(f),b=M.envMap,x=M.envMapRotation;b&&(m.envMap.value=b,ms.copy(x),ms.x*=-1,ms.y*=-1,ms.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),m.envMapRotation.value.setFromMatrix4(oy.makeRotationFromEuler(ms)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,M,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===dn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function cy(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){const x=b.program;n.uniformBlockBinding(M,x)}function l(M,b){let x=s[M.id];x===void 0&&(g(M),x=h(M),s[M.id]=x,M.addEventListener("dispose",m));const C=b.program;n.updateUBOMapping(M,C);const T=e.render.frame;r[M.id]!==T&&(d(M),r[M.id]=T)}function h(M){const b=u();M.__bindingPointIndex=b;const x=i.createBuffer(),C=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,x),x}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const b=s[M.id],x=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let T=0,w=x.length;T<w;T++){const L=Array.isArray(x[T])?x[T]:[x[T]];for(let E=0,y=L.length;E<y;E++){const D=L[E];if(p(D,T,E,C)===!0){const V=D.__offset,H=Array.isArray(D.value)?D.value:[D.value];let $=0;for(let Z=0;Z<H.length;Z++){const X=H[Z],Q=_(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,V+$,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,$),$+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,b,x,C){const T=M.value,w=b+"_"+x;if(C[w]===void 0)return typeof T=="number"||typeof T=="boolean"?C[w]=T:C[w]=T.clone(),!0;{const L=C[w];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return C[w]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function g(M){const b=M.uniforms;let x=0;const C=16;for(let w=0,L=b.length;w<L;w++){const E=Array.isArray(b[w])?b[w]:[b[w]];for(let y=0,D=E.length;y<D;y++){const V=E[y],H=Array.isArray(V.value)?V.value:[V.value];for(let $=0,Z=H.length;$<Z;$++){const X=H[$],Q=_(X),W=x%C,oe=W%Q.boundary,de=W+oe;x+=oe,de!==0&&C-de<Q.storage&&(x+=C-de),V.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=x,x+=Q.storage}}}const T=x%C;return T>0&&(x+=C-T),M.__size=x,M.__cache={},this}function _(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function m(M){const b=M.target;b.removeEventListener("dispose",m);const x=o.indexOf(b.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}class ly{constructor(e={}){const{canvas:t=Zm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const M=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Lt,this.toneMapping=ss,this.toneMappingExposure=1;const x=this;let C=!1,T=0,w=0,L=null,E=-1,y=null;const D=new at,V=new at;let H=null;const $=new De(0);let Z=0,X=t.width,Q=t.height,W=1,oe=null,de=null;const Ee=new at(0,0,X,Q),Ye=new at(0,0,X,Q);let xt=!1;const j=new ql;let ne=!1,ve=!1;const ae=new Fe,Pe=new Fe,Be=new P,je=new at,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function Nt(){return L===null?W:1}let O=n;function Pn(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Fl}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",le,!1),O===null){const N="webgl2";if(O=Pn(N,S),O===null)throw Pn(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Je,Qe,we,bt,Ae,R,v,B,q,J,Y,Me,ce,fe,it,ee,pe,Ce,Ie,me,et,Ve,vt,I;function re(){Je=new px(O),Je.init(),Ve=new Qv(O,Je),Qe=new cx(O,Je,e,Ve),we=new Kv(O,Je),Qe.reverseDepthBuffer&&d&&we.buffers.depth.setReversed(!0),bt=new _x(O),Ae=new Uv,R=new Jv(O,Je,we,Ae,Qe,Ve,bt),v=new hx(x),B=new fx(x),q=new Eg(O),vt=new ox(O,q),J=new mx(O,q,bt,vt),Y=new vx(O,J,q,bt),Ie=new xx(O,Qe,R),ee=new lx(Ae),Me=new Nv(x,v,B,Je,Qe,vt,ee),ce=new ay(x,Ae),fe=new Fv,it=new Gv(Je),Ce=new rx(x,v,B,we,Y,p,c),pe=new jv(x,Y,Qe),I=new cy(O,bt,Qe,we),me=new ax(O,Je,bt),et=new gx(O,Je,bt),bt.programs=Me.programs,x.capabilities=Qe,x.extensions=Je,x.properties=Ae,x.renderLists=fe,x.shadowMap=pe,x.state=we,x.info=bt}re();const G=new ry(x,O);this.xr=G,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=Je.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Je.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(X,Q,!1))},this.getSize=function(S){return S.set(X,Q)},this.setSize=function(S,N,k=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=S,Q=N,t.width=Math.floor(S*W),t.height=Math.floor(N*W),k===!0&&(t.style.width=S+"px",t.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(X*W,Q*W).floor()},this.setDrawingBufferSize=function(S,N,k){X=S,Q=N,W=k,t.width=Math.floor(S*k),t.height=Math.floor(N*k),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(Ee)},this.setViewport=function(S,N,k,z){S.isVector4?Ee.set(S.x,S.y,S.z,S.w):Ee.set(S,N,k,z),we.viewport(D.copy(Ee).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(Ye)},this.setScissor=function(S,N,k,z){S.isVector4?Ye.set(S.x,S.y,S.z,S.w):Ye.set(S,N,k,z),we.scissor(V.copy(Ye).multiplyScalar(W).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(S){we.setScissorTest(xt=S)},this.setOpaqueSort=function(S){oe=S},this.setTransparentSort=function(S){de=S},this.getClearColor=function(S){return S.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor.apply(Ce,arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha.apply(Ce,arguments)},this.clear=function(S=!0,N=!0,k=!0){let z=0;if(S){let U=!1;if(L!==null){const te=L.texture.format;U=te===Xl||te===Wl||te===Gl}if(U){const te=L.texture.type,he=te===Ui||te===Es||te===$r||te===rr||te===zl||te===Hl,ge=Ce.getClearColor(),_e=Ce.getClearAlpha(),Ne=ge.r,ze=ge.g,xe=ge.b;he?(g[0]=Ne,g[1]=ze,g[2]=xe,g[3]=_e,O.clearBufferuiv(O.COLOR,0,g)):(_[0]=Ne,_[1]=ze,_[2]=xe,_[3]=_e,O.clearBufferiv(O.COLOR,0,_))}else z|=O.COLOR_BUFFER_BIT}N&&(z|=O.DEPTH_BUFFER_BIT),k&&(z|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",le,!1),fe.dispose(),it.dispose(),Ae.dispose(),v.dispose(),B.dispose(),Y.dispose(),vt.dispose(),I.dispose(),Me.dispose(),G.dispose(),G.removeEventListener("sessionstart",gh),G.removeEventListener("sessionend",_h),ls.stop()};function K(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const S=bt.autoReset,N=pe.enabled,k=pe.autoUpdate,z=pe.needsUpdate,U=pe.type;re(),bt.autoReset=S,pe.enabled=N,pe.autoUpdate=k,pe.needsUpdate=z,pe.type=U}function le(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ke(S){const N=S.target;N.removeEventListener("dispose",ke),Dt(N)}function Dt(S){en(S),Ae.remove(S)}function en(S){const N=Ae.get(S).programs;N!==void 0&&(N.forEach(function(k){Me.releaseProgram(k)}),S.isShaderMaterial&&Me.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,k,z,U,te){N===null&&(N=Pt);const he=U.isMesh&&U.matrixWorld.determinant()<0,ge=Wp(S,N,k,z,U);we.setMaterial(z,he);let _e=k.index,Ne=1;if(z.wireframe===!0){if(_e=J.getWireframeAttribute(k),_e===void 0)return;Ne=2}const ze=k.drawRange,xe=k.attributes.position;let ot=ze.start*Ne,yt=(ze.start+ze.count)*Ne;te!==null&&(ot=Math.max(ot,te.start*Ne),yt=Math.min(yt,(te.start+te.count)*Ne)),_e!==null?(ot=Math.max(ot,0),yt=Math.min(yt,_e.count)):xe!=null&&(ot=Math.max(ot,0),yt=Math.min(yt,xe.count));const Et=yt-ot;if(Et<0||Et===1/0)return;vt.setup(U,z,ge,k,_e);let _n,lt=me;if(_e!==null&&(_n=q.get(_e),lt=et,lt.setIndex(_n)),U.isMesh)z.wireframe===!0?(we.setLineWidth(z.wireframeLinewidth*Nt()),lt.setMode(O.LINES)):lt.setMode(O.TRIANGLES);else if(U.isLine){let Se=z.linewidth;Se===void 0&&(Se=1),we.setLineWidth(Se*Nt()),U.isLineSegments?lt.setMode(O.LINES):U.isLineLoop?lt.setMode(O.LINE_LOOP):lt.setMode(O.LINE_STRIP)}else U.isPoints?lt.setMode(O.POINTS):U.isSprite&&lt.setMode(O.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)lt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Je.get("WEBGL_multi_draw"))lt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Se=U._multiDrawStarts,pi=U._multiDrawCounts,ht=U._multiDrawCount,kn=_e?q.get(_e).bytesPerElement:1,Ps=Ae.get(z).currentProgram.getUniforms();for(let Sn=0;Sn<ht;Sn++)Ps.setValue(O,"_gl_DrawID",Sn),lt.render(Se[Sn]/kn,pi[Sn])}else if(U.isInstancedMesh)lt.renderInstances(ot,Et,U.count);else if(k.isInstancedBufferGeometry){const Se=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,pi=Math.min(k.instanceCount,Se);lt.renderInstances(ot,Et,pi)}else lt.render(ot,Et)};function ut(S,N,k){S.transparent===!0&&S.side===Jt&&S.forceSinglePass===!1?(S.side=dn,S.needsUpdate=!0,_o(S,N,k),S.side=Ni,S.needsUpdate=!0,_o(S,N,k),S.side=Jt):_o(S,N,k)}this.compile=function(S,N,k=null){k===null&&(k=S),f=it.get(k),f.init(N),b.push(f),k.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),S!==k&&S.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const z=new Set;return S.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const te=U.material;if(te)if(Array.isArray(te))for(let he=0;he<te.length;he++){const ge=te[he];ut(ge,k,U),z.add(ge)}else ut(te,k,U),z.add(te)}),b.pop(),f=null,z},this.compileAsync=function(S,N,k=null){const z=this.compile(S,N,k);return new Promise(U=>{function te(){if(z.forEach(function(he){Ae.get(he).currentProgram.isReady()&&z.delete(he)}),z.size===0){U(S);return}setTimeout(te,10)}Je.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Bn=null;function fi(S){Bn&&Bn(S)}function gh(){ls.stop()}function _h(){ls.start()}const ls=new _f;ls.setAnimationLoop(fi),typeof self<"u"&&ls.setContext(self),this.setAnimationLoop=function(S){Bn=S,G.setAnimationLoop(S),S===null?ls.stop():ls.start()},G.addEventListener("sessionstart",gh),G.addEventListener("sessionend",_h),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(N),N=G.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,N,L),f=it.get(S,b.length),f.init(N),b.push(f),Pe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),j.setFromProjectionMatrix(Pe),ve=this.localClippingEnabled,ne=ee.init(this.clippingPlanes,ve),m=fe.get(S,M.length),m.init(),M.push(m),G.enabled===!0&&G.isPresenting===!0){const te=x.xr.getDepthSensingMesh();te!==null&&Oa(te,N,-1/0,x.sortObjects)}Oa(S,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(oe,de),nt=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,nt&&Ce.addToRenderList(m,S),this.info.render.frame++,ne===!0&&ee.beginShadows();const k=f.state.shadowsArray;pe.render(k,S,N),ne===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,U=m.transmissive;if(f.setupLights(),N.isArrayCamera){const te=N.cameras;if(U.length>0)for(let he=0,ge=te.length;he<ge;he++){const _e=te[he];vh(z,U,S,_e)}nt&&Ce.render(S);for(let he=0,ge=te.length;he<ge;he++){const _e=te[he];xh(m,S,_e,_e.viewport)}}else U.length>0&&vh(z,U,S,N),nt&&Ce.render(S),xh(m,S,N);L!==null&&(R.updateMultisampleRenderTarget(L),R.updateRenderTargetMipmap(L)),S.isScene===!0&&S.onAfterRender(x,S,N),vt.resetDefaultState(),E=-1,y=null,b.pop(),b.length>0?(f=b[b.length-1],ne===!0&&ee.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Oa(S,N,k,z){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)k=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||j.intersectsSprite(S)){z&&je.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Pe);const he=Y.update(S),ge=S.material;ge.visible&&m.push(S,he,ge,k,je.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||j.intersectsObject(S))){const he=Y.update(S),ge=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),je.copy(S.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),je.copy(he.boundingSphere.center)),je.applyMatrix4(S.matrixWorld).applyMatrix4(Pe)),Array.isArray(ge)){const _e=he.groups;for(let Ne=0,ze=_e.length;Ne<ze;Ne++){const xe=_e[Ne],ot=ge[xe.materialIndex];ot&&ot.visible&&m.push(S,he,ot,k,je.z,xe)}}else ge.visible&&m.push(S,he,ge,k,je.z,null)}}const te=S.children;for(let he=0,ge=te.length;he<ge;he++)Oa(te[he],N,k,z)}function xh(S,N,k,z){const U=S.opaque,te=S.transmissive,he=S.transparent;f.setupLightsView(k),ne===!0&&ee.setGlobalState(x.clippingPlanes,k),z&&we.viewport(D.copy(z)),U.length>0&&go(U,N,k),te.length>0&&go(te,N,k),he.length>0&&go(he,N,k),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function vh(S,N,k,z){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[z.id]===void 0&&(f.state.transmissionRenderTarget[z.id]=new Ts(1,1,{generateMipmaps:!0,type:Je.has("EXT_color_buffer_half_float")||Je.has("EXT_color_buffer_float")?ro:Ui,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));const te=f.state.transmissionRenderTarget[z.id],he=z.viewport||D;te.setSize(he.z,he.w);const ge=x.getRenderTarget();x.setRenderTarget(te),x.getClearColor($),Z=x.getClearAlpha(),Z<1&&x.setClearColor(16777215,.5),x.clear(),nt&&Ce.render(k);const _e=x.toneMapping;x.toneMapping=ss;const Ne=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),f.setupLightsView(z),ne===!0&&ee.setGlobalState(x.clippingPlanes,z),go(S,k,z),R.updateMultisampleRenderTarget(te),R.updateRenderTargetMipmap(te),Je.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let xe=0,ot=N.length;xe<ot;xe++){const yt=N[xe],Et=yt.object,_n=yt.geometry,lt=yt.material,Se=yt.group;if(lt.side===Jt&&Et.layers.test(z.layers)){const pi=lt.side;lt.side=dn,lt.needsUpdate=!0,yh(Et,k,z,_n,lt,Se),lt.side=pi,lt.needsUpdate=!0,ze=!0}}ze===!0&&(R.updateMultisampleRenderTarget(te),R.updateRenderTargetMipmap(te))}x.setRenderTarget(ge),x.setClearColor($,Z),Ne!==void 0&&(z.viewport=Ne),x.toneMapping=_e}function go(S,N,k){const z=N.isScene===!0?N.overrideMaterial:null;for(let U=0,te=S.length;U<te;U++){const he=S[U],ge=he.object,_e=he.geometry,Ne=z===null?he.material:z,ze=he.group;ge.layers.test(k.layers)&&yh(ge,N,k,_e,Ne,ze)}}function yh(S,N,k,z,U,te){S.onBeforeRender(x,N,k,z,U,te),S.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),U.onBeforeRender(x,N,k,z,S,te),U.transparent===!0&&U.side===Jt&&U.forceSinglePass===!1?(U.side=dn,U.needsUpdate=!0,x.renderBufferDirect(k,N,z,U,S,te),U.side=Ni,U.needsUpdate=!0,x.renderBufferDirect(k,N,z,U,S,te),U.side=Jt):x.renderBufferDirect(k,N,z,U,S,te),S.onAfterRender(x,N,k,z,U,te)}function _o(S,N,k){N.isScene!==!0&&(N=Pt);const z=Ae.get(S),U=f.state.lights,te=f.state.shadowsArray,he=U.state.version,ge=Me.getParameters(S,U.state,te,N,k),_e=Me.getProgramCacheKey(ge);let Ne=z.programs;z.environment=S.isMeshStandardMaterial?N.environment:null,z.fog=N.fog,z.envMap=(S.isMeshStandardMaterial?B:v).get(S.envMap||z.environment),z.envMapRotation=z.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Ne===void 0&&(S.addEventListener("dispose",ke),Ne=new Map,z.programs=Ne);let ze=Ne.get(_e);if(ze!==void 0){if(z.currentProgram===ze&&z.lightsStateVersion===he)return Sh(S,ge),ze}else ge.uniforms=Me.getUniforms(S),S.onBeforeCompile(ge,x),ze=Me.acquireProgram(ge,_e),Ne.set(_e,ze),z.uniforms=ge.uniforms;const xe=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(xe.clippingPlanes=ee.uniform),Sh(S,ge),z.needsLights=$p(S),z.lightsStateVersion=he,z.needsLights&&(xe.ambientLightColor.value=U.state.ambient,xe.lightProbe.value=U.state.probe,xe.directionalLights.value=U.state.directional,xe.directionalLightShadows.value=U.state.directionalShadow,xe.spotLights.value=U.state.spot,xe.spotLightShadows.value=U.state.spotShadow,xe.rectAreaLights.value=U.state.rectArea,xe.ltc_1.value=U.state.rectAreaLTC1,xe.ltc_2.value=U.state.rectAreaLTC2,xe.pointLights.value=U.state.point,xe.pointLightShadows.value=U.state.pointShadow,xe.hemisphereLights.value=U.state.hemi,xe.directionalShadowMap.value=U.state.directionalShadowMap,xe.directionalShadowMatrix.value=U.state.directionalShadowMatrix,xe.spotShadowMap.value=U.state.spotShadowMap,xe.spotLightMatrix.value=U.state.spotLightMatrix,xe.spotLightMap.value=U.state.spotLightMap,xe.pointShadowMap.value=U.state.pointShadowMap,xe.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=ze,z.uniformsList=null,ze}function Mh(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=ra.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Sh(S,N){const k=Ae.get(S);k.outputColorSpace=N.outputColorSpace,k.batching=N.batching,k.batchingColor=N.batchingColor,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.instancingMorph=N.instancingMorph,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function Wp(S,N,k,z,U){N.isScene!==!0&&(N=Pt),R.resetTextureUnits();const te=N.fog,he=z.isMeshStandardMaterial?N.environment:null,ge=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:mn,_e=(z.isMeshStandardMaterial?B:v).get(z.envMap||he),Ne=z.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,ze=!!k.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),xe=!!k.morphAttributes.position,ot=!!k.morphAttributes.normal,yt=!!k.morphAttributes.color;let Et=ss;z.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Et=x.toneMapping);const _n=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,lt=_n!==void 0?_n.length:0,Se=Ae.get(z),pi=f.state.lights;if(ne===!0&&(ve===!0||S!==y)){const Ln=S===y&&z.id===E;ee.setState(z,S,Ln)}let ht=!1;z.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==pi.state.version||Se.outputColorSpace!==ge||U.isBatchedMesh&&Se.batching===!1||!U.isBatchedMesh&&Se.batching===!0||U.isBatchedMesh&&Se.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Se.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Se.instancing===!1||!U.isInstancedMesh&&Se.instancing===!0||U.isSkinnedMesh&&Se.skinning===!1||!U.isSkinnedMesh&&Se.skinning===!0||U.isInstancedMesh&&Se.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Se.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Se.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Se.instancingMorph===!1&&U.morphTexture!==null||Se.envMap!==_e||z.fog===!0&&Se.fog!==te||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==ee.numPlanes||Se.numIntersection!==ee.numIntersection)||Se.vertexAlphas!==Ne||Se.vertexTangents!==ze||Se.morphTargets!==xe||Se.morphNormals!==ot||Se.morphColors!==yt||Se.toneMapping!==Et||Se.morphTargetsCount!==lt)&&(ht=!0):(ht=!0,Se.__version=z.version);let kn=Se.currentProgram;ht===!0&&(kn=_o(z,N,U));let Ps=!1,Sn=!1,Ar=!1;const Tt=kn.getUniforms(),ei=Se.uniforms;if(we.useProgram(kn.program)&&(Ps=!0,Sn=!0,Ar=!0),z.id!==E&&(E=z.id,Sn=!0),Ps||y!==S){we.buffers.depth.getReversed()?(ae.copy(S.projectionMatrix),Qm(ae),eg(ae),Tt.setValue(O,"projectionMatrix",ae)):Tt.setValue(O,"projectionMatrix",S.projectionMatrix),Tt.setValue(O,"viewMatrix",S.matrixWorldInverse);const Hi=Tt.map.cameraPosition;Hi!==void 0&&Hi.setValue(O,Be.setFromMatrixPosition(S.matrixWorld)),Qe.logarithmicDepthBuffer&&Tt.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Tt.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,Sn=!0,Ar=!0)}if(U.isSkinnedMesh){Tt.setOptional(O,U,"bindMatrix"),Tt.setOptional(O,U,"bindMatrixInverse");const Ln=U.skeleton;Ln&&(Ln.boneTexture===null&&Ln.computeBoneTexture(),Tt.setValue(O,"boneTexture",Ln.boneTexture,R))}U.isBatchedMesh&&(Tt.setOptional(O,U,"batchingTexture"),Tt.setValue(O,"batchingTexture",U._matricesTexture,R),Tt.setOptional(O,U,"batchingIdTexture"),Tt.setValue(O,"batchingIdTexture",U._indirectTexture,R),Tt.setOptional(O,U,"batchingColorTexture"),U._colorsTexture!==null&&Tt.setValue(O,"batchingColorTexture",U._colorsTexture,R));const wr=k.morphAttributes;if((wr.position!==void 0||wr.normal!==void 0||wr.color!==void 0)&&Ie.update(U,k,kn),(Sn||Se.receiveShadow!==U.receiveShadow)&&(Se.receiveShadow=U.receiveShadow,Tt.setValue(O,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(ei.envMap.value=_e,ei.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&N.environment!==null&&(ei.envMapIntensity.value=N.environmentIntensity),Sn&&(Tt.setValue(O,"toneMappingExposure",x.toneMappingExposure),Se.needsLights&&Xp(ei,Ar),te&&z.fog===!0&&ce.refreshFogUniforms(ei,te),ce.refreshMaterialUniforms(ei,z,W,Q,f.state.transmissionRenderTarget[S.id]),ra.upload(O,Mh(Se),ei,R)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ra.upload(O,Mh(Se),ei,R),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Tt.setValue(O,"center",U.center),Tt.setValue(O,"modelViewMatrix",U.modelViewMatrix),Tt.setValue(O,"normalMatrix",U.normalMatrix),Tt.setValue(O,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Ln=z.uniformsGroups;for(let Hi=0,Vi=Ln.length;Hi<Vi;Hi++){const bh=Ln[Hi];I.update(bh,kn),I.bind(bh,kn)}}return kn}function Xp(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function $p(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(S,N,k){Ae.get(S.texture).__webglTexture=N,Ae.get(S.depthTexture).__webglTexture=k;const z=Ae.get(S);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=k===void 0,z.__autoAllocateDepthBuffer||Je.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,N){const k=Ae.get(S);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,k=0){L=S,T=N,w=k;let z=!0,U=null,te=!1,he=!1;if(S){const _e=Ae.get(S);if(_e.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(O.FRAMEBUFFER,null),z=!1;else if(_e.__webglFramebuffer===void 0)R.setupRenderTarget(S);else if(_e.__hasExternalTextures)R.rebindTextures(S,Ae.get(S.texture).__webglTexture,Ae.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const xe=S.depthTexture;if(_e.__boundDepthTexture!==xe){if(xe!==null&&Ae.has(xe)&&(S.width!==xe.image.width||S.height!==xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(S)}}const Ne=S.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(he=!0);const ze=Ae.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(ze[N])?U=ze[N][k]:U=ze[N],te=!0):S.samples>0&&R.useMultisampledRTT(S)===!1?U=Ae.get(S).__webglMultisampledFramebuffer:Array.isArray(ze)?U=ze[k]:U=ze,D.copy(S.viewport),V.copy(S.scissor),H=S.scissorTest}else D.copy(Ee).multiplyScalar(W).floor(),V.copy(Ye).multiplyScalar(W).floor(),H=xt;if(we.bindFramebuffer(O.FRAMEBUFFER,U)&&z&&we.drawBuffers(S,U),we.viewport(D),we.scissor(V),we.setScissorTest(H),te){const _e=Ae.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+N,_e.__webglTexture,k)}else if(he){const _e=Ae.get(S.texture),Ne=N||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,_e.__webglTexture,k||0,Ne)}E=-1},this.readRenderTargetPixels=function(S,N,k,z,U,te,he){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=Ae.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&he!==void 0&&(ge=ge[he]),ge){we.bindFramebuffer(O.FRAMEBUFFER,ge);try{const _e=S.texture,Ne=_e.format,ze=_e.type;if(!Qe.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Qe.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-z&&k>=0&&k<=S.height-U&&O.readPixels(N,k,z,U,Ve.convert(Ne),Ve.convert(ze),te)}finally{const _e=L!==null?Ae.get(L).__webglFramebuffer:null;we.bindFramebuffer(O.FRAMEBUFFER,_e)}}},this.readRenderTargetPixelsAsync=async function(S,N,k,z,U,te,he){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=Ae.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&he!==void 0&&(ge=ge[he]),ge){const _e=S.texture,Ne=_e.format,ze=_e.type;if(!Qe.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Qe.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=S.width-z&&k>=0&&k<=S.height-U){we.bindFramebuffer(O.FRAMEBUFFER,ge);const xe=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,xe),O.bufferData(O.PIXEL_PACK_BUFFER,te.byteLength,O.STREAM_READ),O.readPixels(N,k,z,U,Ve.convert(Ne),Ve.convert(ze),0);const ot=L!==null?Ae.get(L).__webglFramebuffer:null;we.bindFramebuffer(O.FRAMEBUFFER,ot);const yt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Jm(O,yt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,xe),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,te),O.deleteBuffer(xe),O.deleteSync(yt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,N=null,k=0){S.isTexture!==!0&&(zr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,S=arguments[1]);const z=Math.pow(2,-k),U=Math.floor(S.image.width*z),te=Math.floor(S.image.height*z),he=N!==null?N.x:0,ge=N!==null?N.y:0;R.setTexture2D(S,0),O.copyTexSubImage2D(O.TEXTURE_2D,k,0,0,he,ge,U,te),we.unbindTexture()},this.copyTextureToTexture=function(S,N,k=null,z=null,U=0){S.isTexture!==!0&&(zr("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,S=arguments[1],N=arguments[2],U=arguments[3]||0,k=null);let te,he,ge,_e,Ne,ze,xe,ot,yt;const Et=S.isCompressedTexture?S.mipmaps[U]:S.image;k!==null?(te=k.max.x-k.min.x,he=k.max.y-k.min.y,ge=k.isBox3?k.max.z-k.min.z:1,_e=k.min.x,Ne=k.min.y,ze=k.isBox3?k.min.z:0):(te=Et.width,he=Et.height,ge=Et.depth||1,_e=0,Ne=0,ze=0),z!==null?(xe=z.x,ot=z.y,yt=z.z):(xe=0,ot=0,yt=0);const _n=Ve.convert(N.format),lt=Ve.convert(N.type);let Se;N.isData3DTexture?(R.setTexture3D(N,0),Se=O.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(R.setTexture2DArray(N,0),Se=O.TEXTURE_2D_ARRAY):(R.setTexture2D(N,0),Se=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,N.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,N.unpackAlignment);const pi=O.getParameter(O.UNPACK_ROW_LENGTH),ht=O.getParameter(O.UNPACK_IMAGE_HEIGHT),kn=O.getParameter(O.UNPACK_SKIP_PIXELS),Ps=O.getParameter(O.UNPACK_SKIP_ROWS),Sn=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Et.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Et.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,_e),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ne),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ze);const Ar=S.isDataArrayTexture||S.isData3DTexture,Tt=N.isDataArrayTexture||N.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const ei=Ae.get(S),wr=Ae.get(N),Ln=Ae.get(ei.__renderTarget),Hi=Ae.get(wr.__renderTarget);we.bindFramebuffer(O.READ_FRAMEBUFFER,Ln.__webglFramebuffer),we.bindFramebuffer(O.DRAW_FRAMEBUFFER,Hi.__webglFramebuffer);for(let Vi=0;Vi<ge;Vi++)Ar&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ae.get(S).__webglTexture,U,ze+Vi),S.isDepthTexture?(Tt&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ae.get(N).__webglTexture,U,yt+Vi),O.blitFramebuffer(_e,Ne,te,he,xe,ot,te,he,O.DEPTH_BUFFER_BIT,O.NEAREST)):Tt?O.copyTexSubImage3D(Se,U,xe,ot,yt+Vi,_e,Ne,te,he):O.copyTexSubImage2D(Se,U,xe,ot,yt+Vi,_e,Ne,te,he);we.bindFramebuffer(O.READ_FRAMEBUFFER,null),we.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Tt?S.isDataTexture||S.isData3DTexture?O.texSubImage3D(Se,U,xe,ot,yt,te,he,ge,_n,lt,Et.data):N.isCompressedArrayTexture?O.compressedTexSubImage3D(Se,U,xe,ot,yt,te,he,ge,_n,Et.data):O.texSubImage3D(Se,U,xe,ot,yt,te,he,ge,_n,lt,Et):S.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,U,xe,ot,te,he,_n,lt,Et.data):S.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,U,xe,ot,Et.width,Et.height,_n,Et.data):O.texSubImage2D(O.TEXTURE_2D,U,xe,ot,te,he,_n,lt,Et);O.pixelStorei(O.UNPACK_ROW_LENGTH,pi),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ht),O.pixelStorei(O.UNPACK_SKIP_PIXELS,kn),O.pixelStorei(O.UNPACK_SKIP_ROWS,Ps),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Sn),U===0&&N.generateMipmaps&&O.generateMipmap(Se),we.unbindTexture()},this.copyTextureToTexture3D=function(S,N,k=null,z=null,U=0){return S.isTexture!==!0&&(zr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,z=arguments[1]||null,S=arguments[2],N=arguments[3],U=arguments[4]||0),zr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,k,z,U)},this.initRenderTarget=function(S){Ae.get(S).__webglFramebuffer===void 0&&R.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?R.setTextureCube(S,0):S.isData3DTexture?R.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?R.setTexture2DArray(S,0):R.setTexture2D(S,0),we.unbindTexture()},this.resetState=function(){T=0,w=0,L=null,we.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}}class Ma{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new De(e),this.near=t,this.far=n}clone(){return new Ma(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class hy extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class uy{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ul,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const cn=new P;class Jl{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyMatrix4(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.applyNormalMatrix(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cn.fromBufferAttribute(this,t),cn.transformDirection(e),this.setXYZ(t,cn.x,cn.y,cn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Yn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Yn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Yn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Yn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Yn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),s=dt(s,this.array),r=dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new pn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Jl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Au=new P,wu=new at,Ru=new at,dy=new P,Cu=new Fe,Bo=new P,uc=new li,Pu=new Fe,dc=new mr;class fy extends ie{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Rh,this.bindMatrix=new Fe,this.bindMatrixInverse=new Fe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new zi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Bo),this.boundingBox.expandByPoint(Bo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new li),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Bo),this.boundingSphere.expandByPoint(Bo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),uc.copy(this.boundingSphere),uc.applyMatrix4(s),e.ray.intersectsSphere(uc)!==!1&&(Pu.copy(s).invert(),dc.copy(e.ray).applyMatrix4(Pu),!(this.boundingBox!==null&&dc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,dc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Rh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Mm?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;wu.fromBufferAttribute(s.attributes.skinIndex,e),Ru.fromBufferAttribute(s.attributes.skinWeight,e),Au.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Ru.getComponent(r);if(o!==0){const a=wu.getComponent(r);Cu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(dy.copy(Au).applyMatrix4(Cu),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class bf extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ef extends Ht{constructor(e=null,t=1,n=1,s,r,o,a,c,l=fn,h=fn,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Lu=new Fe,py=new Fe;class Ql{constructor(e=[],t=[]){this.uuid=Kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Fe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Fe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:py;Lu.multiplyMatrices(a,t[r]),Lu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Ql(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Ef(t,e,e,Nn,qn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new bf),this.bones.push(o),this.boneInverses.push(new Fe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class fl extends pn{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Xs=new Fe,Du=new Fe,ko=[],Iu=new zi,my=new Fe,Dr=new ie,Ir=new li;class Tf extends ie{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new fl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,my)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Xs),Iu.copy(e.boundingBox).applyMatrix4(Xs),this.boundingBox.union(Iu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new li),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Xs),Ir.copy(e.boundingSphere).applyMatrix4(Xs),this.boundingSphere.union(Ir)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Dr.geometry=this.geometry,Dr.material=this.material,Dr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ir.copy(this.boundingSphere),Ir.applyMatrix4(n),e.ray.intersectsSphere(Ir)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Xs),Du.multiplyMatrices(n,Xs),Dr.matrixWorld=Du,Dr.raycast(e,ko);for(let o=0,a=ko.length;o<a;o++){const c=ko[o];c.instanceId=r,c.object=this,t.push(c)}ko.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new fl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ef(new Float32Array(s*this.count),s,this.count,Vl,qn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Sa extends oi{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const da=new P,fa=new P,Nu=new Fe,Nr=new mr,zo=new li,fc=new P,Uu=new P;class oo extends St{constructor(e=new Qt,t=new Sa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)da.fromBufferAttribute(t,s-1),fa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=da.distanceTo(fa);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(s),zo.radius+=r,e.ray.intersectsSphere(zo)===!1)return;Nu.copy(s).invert(),Nr.copy(e.ray).applyMatrix4(Nu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=h.getX(_),M=h.getX(_+1),b=Ho(this,e,Nr,c,f,M);b&&t.push(b)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),f=Ho(this,e,Nr,c,_,m);f&&t.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=Ho(this,e,Nr,c,_,_+1);f&&t.push(f)}if(this.isLineLoop){const _=Ho(this,e,Nr,c,g-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ho(i,e,t,n,s,r){const o=i.geometry.attributes.position;if(da.fromBufferAttribute(o,s),fa.fromBufferAttribute(o,r),t.distanceSqToSegment(da,fa,fc,Uu)>n)return;fc.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(fc);if(!(c<e.near||c>e.far))return{distance:c,point:Uu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Ou=new P,Fu=new P;class gy extends oo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Ou.fromBufferAttribute(t,s),Fu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ou.distanceTo(Fu);e.setAttribute("lineDistance",new Rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _y extends oo{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Af extends oi{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bu=new Fe,pl=new mr,Vo=new li,Go=new P;class xy extends St{constructor(e=new Qt,t=new Af){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vo.copy(n.boundingSphere),Vo.applyMatrix4(s),Vo.radius+=r,e.ray.intersectsSphere(Vo)===!1)return;Bu.copy(s).invert(),pl.copy(e.ray).applyMatrix4(Bu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=l.getX(g);Go.fromBufferAttribute(u,m),ku(Go,m,c,s,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)Go.fromBufferAttribute(u,g),ku(Go,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ku(i,e,t,n,s,r,o){const a=pl.distanceSqToPoint(i);if(a<t){const c=new P;pl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Cs extends Ht{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ao extends Qt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new P,h=new Re;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const p=n+u/t*s;l.x=e*Math.cos(p),l.y=e*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Rt(o,3)),this.setAttribute("normal",new Rt(a,3)),this.setAttribute("uv",new Rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Kt extends Qt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=n/2;let f=0;M(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Rt(u,3)),this.setAttribute("normal",new Rt(d,3)),this.setAttribute("uv",new Rt(p,2));function M(){const x=new P,C=new P;let T=0;const w=(t-e)/n;for(let L=0;L<=r;L++){const E=[],y=L/r,D=y*(t-e)+e;for(let V=0;V<=s;V++){const H=V/s,$=H*c+a,Z=Math.sin($),X=Math.cos($);C.x=D*Z,C.y=-y*n+m,C.z=D*X,u.push(C.x,C.y,C.z),x.set(Z,w,X).normalize(),d.push(x.x,x.y,x.z),p.push(H,1-y),E.push(g++)}_.push(E)}for(let L=0;L<s;L++)for(let E=0;E<r;E++){const y=_[E][L],D=_[E+1][L],V=_[E+1][L+1],H=_[E][L+1];(e>0||E!==0)&&(h.push(y,D,H),T+=3),(t>0||E!==r-1)&&(h.push(D,V,H),T+=3)}l.addGroup(f,T,0),f+=T}function b(x){const C=g,T=new Re,w=new P;let L=0;const E=x===!0?e:t,y=x===!0?1:-1;for(let V=1;V<=s;V++)u.push(0,m*y,0),d.push(0,y,0),p.push(.5,.5),g++;const D=g;for(let V=0;V<=s;V++){const $=V/s*c+a,Z=Math.cos($),X=Math.sin($);w.x=E*X,w.y=m*y,w.z=E*Z,u.push(w.x,w.y,w.z),d.push(0,y,0),T.x=Z*.5+.5,T.y=X*.5*y+.5,p.push(T.x,T.y),g++}for(let V=0;V<s;V++){const H=C+V,$=D+V;x===!0?h.push($,$+1,H):h.push($+1,$,H),L+=3}l.addGroup(f,L,x===!0?1:2),f+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _r extends Kt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new _r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class co extends Qt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const d=(t-e)/s,p=new P,g=new Re;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const f=r+m/n*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){const m=_*(n+1);for(let f=0;f<n;f++){const M=f+m,b=M,x=M+n+1,C=M+n+2,T=M+1;a.push(b,x,T),a.push(x,C,T)}}this.setIndex(a),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(l,3)),this.setAttribute("uv",new Rt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new co(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class jt extends Qt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new P,d=new P,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const M=[],b=f/n;let x=0;f===0&&o===0?x=.5/t:f===n&&c===Math.PI&&(x=-.5/t);for(let C=0;C<=t;C++){const T=C/t;u.x=-e*Math.cos(s+T*r)*Math.sin(o+b*a),u.y=e*Math.cos(o+b*a),u.z=e*Math.sin(s+T*r)*Math.sin(o+b*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(T+x,1-b),M.push(l++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){const b=h[f][M+1],x=h[f][M],C=h[f+1][M],T=h[f+1][M+1];(f!==0||o>0)&&p.push(b,x,T),(f!==n-1||c<Math.PI)&&p.push(x,C,T)}this.setIndex(p),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(_,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Kr extends Qt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new P,u=new P,d=new P;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,M=(s+1)*p+g;o.push(_,m,M),o.push(m,f,M)}this.setIndex(o),this.setAttribute("position",new Rt(a,3)),this.setAttribute("normal",new Rt(c,3)),this.setAttribute("uv",new Rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class tt extends oi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=of,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class hi extends tt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Zt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function Wo(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function vy(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function yy(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function zu(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function wf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class lo{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class My extends lo{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ch,endingEnd:Ch}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ph:r=e,a=2*t-n;break;case Lh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ph:o=e,c=2*n-t;break;case Lh:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,M=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,b=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let C=0;C!==a;++C)r[C]=f*o[h+C]+M*o[l+C]+b*o[c+C]+x*o[u+C];return r}}class Sy extends lo{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}}class by extends lo{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class ui{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Wo(t,this.TimeBufferType),this.values=Wo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Wo(e.times,Array),values:Wo(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new by(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Sy(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new My(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Yr:t=this.InterpolantFactoryMethodDiscrete;break;case jr:t=this.InterpolantFactoryMethodLinear;break;case Fa:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Yr;case this.InterpolantFactoryMethodLinear:return jr;case this.InterpolantFactoryMethodSmooth:return Fa}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&vy(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Fa,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{const u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}ui.prototype.TimeBufferType=Float32Array;ui.prototype.ValueBufferType=Float32Array;ui.prototype.DefaultInterpolation=jr;class xr extends ui{constructor(e,t,n){super(e,t,n)}}xr.prototype.ValueTypeName="bool";xr.prototype.ValueBufferType=Array;xr.prototype.DefaultInterpolation=Yr;xr.prototype.InterpolantFactoryMethodLinear=void 0;xr.prototype.InterpolantFactoryMethodSmooth=void 0;class Rf extends ui{}Rf.prototype.ValueTypeName="color";class lr extends ui{}lr.prototype.ValueTypeName="number";class Ey extends lo{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let h=l+a;l!==h;l+=4)Jn.slerpFlat(r,0,o,l-a,o,l,c);return r}}class hr extends ui{InterpolantFactoryMethodLinear(e){return new Ey(this.times,this.values,this.getValueSize(),e)}}hr.prototype.ValueTypeName="quaternion";hr.prototype.InterpolantFactoryMethodSmooth=void 0;class vr extends ui{constructor(e,t,n){super(e,t,n)}}vr.prototype.ValueTypeName="string";vr.prototype.ValueBufferType=Array;vr.prototype.DefaultInterpolation=Yr;vr.prototype.InterpolantFactoryMethodLinear=void 0;vr.prototype.InterpolantFactoryMethodSmooth=void 0;class ur extends ui{}ur.prototype.ValueTypeName="vector";class Ty{constructor(e="",t=-1,n=[],s=Sm){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Kn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(wy(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(ui.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=yy(c);c=zu(c,1,h),l=zu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new lr(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,g,_){if(p.length!==0){const m=[],f=[];wf(p,m,f,g),m.length!==0&&_.push(new u(d,m,f))}},s=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(const _ in p){const m=[],f=[];for(let M=0;M!==d[g].morphTargets.length;++M){const b=d[g];m.push(b.time),f.push(b.morphTarget===_?1:0)}s.push(new lr(".morphTargetInfluence["+_+"]",m,f))}c=p.length*o}else{const p=".bones["+t[u].name+"]";n(ur,p+".position",d,"pos",s),n(hr,p+".quaternion",d,"rot",s),n(ur,p+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Ay(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return lr;case"vector":case"vector2":case"vector3":case"vector4":return ur;case"color":return Rf;case"quaternion":return hr;case"bool":case"boolean":return xr;case"string":return vr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function wy(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Ay(i.type);if(i.times===void 0){const t=[],n=[];wf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const ts={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Ry{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const Cy=new Ry;class yr{constructor(e){this.manager=e!==void 0?e:Cy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}yr.DEFAULT_MATERIAL_NAME="__DEFAULT";const yi={};class Py extends Error{constructor(e,t){super(e),this.response=t}}class Cf extends yr{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ts.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(yi[e]!==void 0){yi[e].push({onLoad:t,onProgress:n,onError:s});return}yi[e]=[],yi[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=yi[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0;let _=0;const m=new ReadableStream({start(f){M();function M(){u.read().then(({done:b,value:x})=>{if(b)f.close();else{_+=x.byteLength;const C=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let T=0,w=h.length;T<w;T++){const L=h[T];L.onProgress&&L.onProgress(C)}f.enqueue(x),M()}},b=>{f.error(b)})}}});return new Response(m)}else throw new Py(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{ts.add(e,l);const h=yi[e];delete yi[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=yi[e];if(h===void 0)throw this.manager.itemError(e),l;delete yi[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Ly extends yr{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ts.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=qr("img");function c(){h(),ts.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Dy extends yr{constructor(e){super(e)}load(e,t,n,s){const r=new Ht,o=new Ly(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class ba extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Iy extends ba{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const pc=new Fe,Hu=new P,Vu=new P;class eh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Re(512,512),this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ql,this._frameExtents=new Re(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Hu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hu),Vu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vu),t.updateMatrixWorld(),pc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(pc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ny extends eh{constructor(){super(new hn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=ar*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Uy extends ba{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Ny}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Gu=new Fe,Ur=new P,mc=new P;class Oy extends eh{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Re(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ur.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ur),mc.copy(n.position),mc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(mc),n.updateMatrixWorld(),s.makeTranslation(-Ur.x,-Ur.y,-Ur.z),Gu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gu)}}class Pf extends ba{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Oy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Fy extends eh{constructor(){super(new Kl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lf extends ba{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new Fy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Wr{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class By extends yr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ts.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return ts.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),ts.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ts.add(e,c),r.manager.itemStart(e)}}class ky{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Wu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Wu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Wu(){return performance.now()}const th="\\[\\]\\.:\\/",zy=new RegExp("["+th+"]","g"),nh="[^"+th+"]",Hy="[^"+th.replace("\\.","")+"]",Vy=/((?:WC+[\/:])*)/.source.replace("WC",nh),Gy=/(WCOD+)?/.source.replace("WCOD",Hy),Wy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nh),Xy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nh),$y=new RegExp("^"+Vy+Gy+Wy+Xy+"$"),Yy=["material","materials","bones","map"];class jy{constructor(e,t,n){const s=n||ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ft{constructor(e,t,n){this.path=t,this.parsedPath=n||ft.parseTrackName(t),this.node=ft.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ft.Composite(e,t,n):new ft(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(zy,"")}static parseTrackName(e){const t=$y.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Yy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=ft.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ft.Composite=jy;ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ft.prototype.GetterByBindingType=[ft.prototype._getValue_direct,ft.prototype._getValue_array,ft.prototype._getValue_arrayElement,ft.prototype._getValue_toArray];ft.prototype.SetterByBindingTypeAndVersioning=[[ft.prototype._setValue_direct,ft.prototype._setValue_direct_setNeedsUpdate,ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_array,ft.prototype._setValue_array_setNeedsUpdate,ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_arrayElement,ft.prototype._setValue_arrayElement_setNeedsUpdate,ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_fromArray,ft.prototype._setValue_fromArray_setNeedsUpdate,ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Xu=new Fe;class qy{constructor(e,t,n=0,s=1/0){this.ray=new mr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new jl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Xu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xu),this}intersectObject(e,t=!0,n=[]){return ml(e,this,n,t),n.sort($u),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)ml(e[s],this,n,t);return n.sort($u),n}}function $u(i,e){return i.distance-e.distance}function ml(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)ml(r[o],e,t,!0)}}class Yu{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Zt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Ky extends Rs{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fl);const ju={type:"change"},ih={type:"start"},Df={type:"end"},Xo=new mr,qu=new Zi,Zy=Math.cos(70*Yl.DEG2RAD),Bt=new P,xn=2*Math.PI,gt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},gc=1e-6;class Jy extends Ky{constructor(e,t=null){super(e,t),this.state=gt.NONE,this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Pi.ROTATE,MIDDLE:Pi.DOLLY,RIGHT:Pi.PAN},this.touches={ONE:Qi.ROTATE,TWO:Qi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new Jn,this._lastTargetPosition=new P,this._quat=new Jn().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Yu,this._sphericalDelta=new Yu,this._scale=1,this._panOffset=new P,this._rotateStart=new Re,this._rotateEnd=new Re,this._rotateDelta=new Re,this._panStart=new Re,this._panEnd=new Re,this._panDelta=new Re,this._dollyStart=new Re,this._dollyEnd=new Re,this._dollyDelta=new Re,this._dollyDirection=new P,this._mouse=new Re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=eM.bind(this),this._onPointerDown=Qy.bind(this),this._onPointerUp=tM.bind(this),this._onContextMenu=cM.bind(this),this._onMouseWheel=sM.bind(this),this._onKeyDown=rM.bind(this),this._onTouchStart=oM.bind(this),this._onTouchMove=aM.bind(this),this._onMouseDown=nM.bind(this),this._onMouseMove=iM.bind(this),this._interceptControlDown=lM.bind(this),this._interceptControlUp=hM.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ju),this.update(),this.state=gt.NONE}update(e=null){const t=this.object.position;Bt.copy(t).sub(this.target),Bt.applyQuaternion(this._quat),this._spherical.setFromVector3(Bt),this.autoRotate&&this.state===gt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=xn:n>Math.PI&&(n-=xn),s<-Math.PI?s+=xn:s>Math.PI&&(s-=xn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Bt.setFromSpherical(this._spherical),Bt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Bt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Bt.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new P(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Bt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Xo.origin.copy(this.object.position),Xo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Xo.direction))<Zy?this.object.lookAt(this.target):(qu.setFromNormalAndCoplanarPoint(this.object.up,this.target),Xo.intersectPlane(qu,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>gc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>gc||this._lastTargetPosition.distanceToSquared(this.target)>gc?(this.dispatchEvent(ju),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?xn/60*this.autoRotateSpeed*e:xn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Bt.setFromMatrixColumn(t,0),Bt.multiplyScalar(-e),this._panOffset.add(Bt)}_panUp(e,t){this.screenSpacePanning===!0?Bt.setFromMatrixColumn(t,1):(Bt.setFromMatrixColumn(t,0),Bt.crossVectors(this.object.up,Bt)),Bt.multiplyScalar(e),this._panOffset.add(Bt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Bt.copy(s).sub(this.target);let r=Bt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/t.clientHeight),this._rotateUp(xn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(xn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-xn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(xn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-xn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(xn*this._rotateDelta.x/t.clientHeight),this._rotateUp(xn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Qy(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function eM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function tM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Df),this.state=gt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function nM(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Pi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=gt.DOLLY;break;case Pi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=gt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=gt.ROTATE}break;case Pi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=gt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=gt.PAN}break;default:this.state=gt.NONE}this.state!==gt.NONE&&this.dispatchEvent(ih)}function iM(i){switch(this.state){case gt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case gt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case gt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function sM(i){this.enabled===!1||this.enableZoom===!1||this.state!==gt.NONE||(i.preventDefault(),this.dispatchEvent(ih),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Df))}function rM(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function oM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Qi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=gt.TOUCH_ROTATE;break;case Qi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=gt.TOUCH_PAN;break;default:this.state=gt.NONE}break;case 2:switch(this.touches.TWO){case Qi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=gt.TOUCH_DOLLY_PAN;break;case Qi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=gt.TOUCH_DOLLY_ROTATE;break;default:this.state=gt.NONE}break;default:this.state=gt.NONE}this.state!==gt.NONE&&this.dispatchEvent(ih)}function aM(i){switch(this._trackPointer(i),this.state){case gt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case gt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case gt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case gt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=gt.NONE}}function cM(i){this.enabled!==!1&&i.preventDefault()}function lM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function hM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ku(i,e){if(e===bm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===hl||e===rf){let t=i.getIndex();if(t===null){const o=[],a=i.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);i.setIndex(o),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===hl)for(let o=1;o<=n;o++)s.push(t.getX(0)),s.push(t.getX(o)),s.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(s.push(t.getX(o)),s.push(t.getX(o+1)),s.push(t.getX(o+2))):(s.push(t.getX(o+2)),s.push(t.getX(o+1)),s.push(t.getX(o)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class If extends yr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new mM(t)}),this.register(function(t){return new gM(t)}),this.register(function(t){return new TM(t)}),this.register(function(t){return new AM(t)}),this.register(function(t){return new wM(t)}),this.register(function(t){return new xM(t)}),this.register(function(t){return new vM(t)}),this.register(function(t){return new yM(t)}),this.register(function(t){return new MM(t)}),this.register(function(t){return new pM(t)}),this.register(function(t){return new SM(t)}),this.register(function(t){return new _M(t)}),this.register(function(t){return new EM(t)}),this.register(function(t){return new bM(t)}),this.register(function(t){return new dM(t)}),this.register(function(t){return new RM(t)}),this.register(function(t){return new CM(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Wr.extractUrlBase(e);o=Wr.resolveURL(l,this.path)}else o=Wr.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Cf(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Nf){try{o[qe.KHR_BINARY_GLTF]=new PM(e)}catch(u){s&&s(u);return}r=JSON.parse(o[qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new GM(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case qe.KHR_MATERIALS_UNLIT:o[u]=new fM;break;case qe.KHR_DRACO_MESH_COMPRESSION:o[u]=new LM(r,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:o[u]=new DM;break;case qe.KHR_MESH_QUANTIZATION:o[u]=new IM;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function uM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class dM{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new De(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],mn);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Lf(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Pf(h),l.distance=u;break;case"spot":l=new Uy(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Si(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class fM{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return rt}extendParams(e,t,n){const s=[];e.color=new De(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],mn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Lt))}return Promise.all(s)}}class pM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class mM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Re(a,a)}return Promise.all(r)}}class gM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class _M{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class xM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=s.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],mn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Lt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class vM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class yM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(a[0],a[1],a[2],mn),Promise.all(r)}}class MM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class SM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(a[0],a[1],a[2],mn),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Lt)),Promise.all(r)}}class bM{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class EM{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:hi}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],o=s.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class TM{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class AM{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class wM{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class RM{constructor(e){this.name=qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,d,s.mode,s.filter),p})})}else return null}}class CM{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==In.TRIANGLES&&l.mode!==In.TRIANGLE_STRIP&&l.mode!==In.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(const g of u){const _=new Fe,m=new P,f=new Jn,M=new P(1,1,1),b=new Tf(g.geometry,g.material,d);for(let x=0;x<d;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,x),c.SCALE&&M.fromBufferAttribute(c.SCALE,x),b.setMatrixAt(x,_.compose(m,f,M));for(const x in c)if(x==="_COLOR_0"){const C=c[x];b.instanceColor=new fl(C.array,C.itemSize,C.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);St.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),p.push(b)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const Nf="glTF",Or=12,Zu={JSON:1313821514,BIN:5130562};class PM{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Or),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Nf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Or,r=new DataView(e,Or);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Zu.JSON){const l=new Uint8Array(e,Or+o,a);this.content=n.decode(l)}else if(c===Zu.BIN){const l=Or+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class LM{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=gl[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=gl[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],p=Qs[d.componentType];l[u]=p.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(p){for(const g in p.attributes){const _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(p)},a,l,mn,d)})})}}class DM{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class IM{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}}class Uf extends lo{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,d=u*u,p=d*u,g=e*l,_=g-l,m=-2*p+3*d,f=p-d,M=1-m,b=f-d+u;for(let x=0;x!==a;x++){const C=o[_+x+a],T=o[_+x+c]*h,w=o[g+x+a],L=o[g+x]*h;r[x]=M*C+b*T+m*w+f*L}return r}}const NM=new Jn;class UM extends Uf{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return NM.fromArray(r).normalize().toArray(r),r}}const In={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Qs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ju={9728:fn,9729:zt,9984:jd,9985:Qo,9986:kr,9987:Ai},Qu={33071:es,33648:ha,10497:os},_c={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},gl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},qi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},OM={CUBICSPLINE:void 0,LINEAR:jr,STEP:Yr},xc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function FM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new tt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ni})),i.DefaultMaterial}function gs(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Si(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function BM(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function kM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function zM(i){let e;const t=i.extensions&&i.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+vc(t.attributes):e=i.indices+":"+vc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+vc(i.targets[n]);return e}function vc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function _l(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function HM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const VM=new Fe;class GM{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new uM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Dy(this.options.manager):this.textureLoader=new By(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Cf(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return gs(r,a,s),Si(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Wr.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=_c[s.type],a=Qs[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new pn(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=_c[s.type],l=Qs[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(p&&p!==u){const f=Math.floor(d/p),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count;let b=t.cache.get(M);b||(_=new l(a,f*p,s.count*p/h),b=new uy(_,p/h),t.cache.add(M,b)),m=new Jl(b,c,d%p/h,g)}else a===null?_=new l(s.count*c):_=new l(a,d,s.count*c),m=new pn(_,c,g);if(s.sparse!==void 0){const f=_c.SCALAR,M=Qs[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,x=s.sparse.values.byteOffset||0,C=new M(o[1],b,s.sparse.count*f),T=new l(o[2],x,s.sparse.count*c);a!==null&&(m=new pn(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let w=0,L=C.length;w<L;w++){const E=C[w];if(m.setX(E,T[w*c]),c>=2&&m.setY(E,T[w*c+1]),c>=3&&m.setZ(E,T[w*c+2]),c>=4&&m.setW(E,T[w*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Ju[d.magFilter]||zt,h.minFilter=Ju[d.minFilter]||Ai,h.wrapS=Qu[d.wrapS]||os,h.wrapT=Qu[d.wrapT]||os,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==fn&&h.minFilter!==zt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Ht(_);m.needsUpdate=!0,d(m)}),t.load(Wr.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Si(u,o),u.userData.mimeType=o.mimeType||HM(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[qe.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Af,oi.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Sa,oi.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return tt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[qe.KHR_MATERIALS_UNLIT]){const u=s[qe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new De(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],mn),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Lt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Jt);const h=r.alphaMode||xc.OPAQUE;if(h===xc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===xc.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==rt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Re(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==rt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==rt){const u=r.emissiveFactor;a.emissive=new De().setRGB(u[0],u[1],u[2],mn)}return r.emissiveTexture!==void 0&&o!==rt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Lt)),Promise.all(l).then(function(){const u=new o(a);return r.name&&(u.name=r.name),Si(u,r),t.associations.set(u,{materials:e}),r.extensions&&gs(s,u,r),u})}createUniqueName(e){const t=ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return ed(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=zM(l),u=s[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=ed(new Qt,l,t),s[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?FM(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){const _=h[p],m=o[p];let f;const M=l[p];if(m.mode===In.TRIANGLES||m.mode===In.TRIANGLE_STRIP||m.mode===In.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new fy(_,M):new ie(_,M),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===In.TRIANGLE_STRIP?f.geometry=Ku(f.geometry,rf):m.mode===In.TRIANGLE_FAN&&(f.geometry=Ku(f.geometry,hl));else if(m.mode===In.LINES)f=new gy(_,M);else if(m.mode===In.LINE_STRIP)f=new oo(_,M);else if(m.mode===In.LINE_LOOP)f=new _y(_,M);else if(m.mode===In.POINTS)f=new xy(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&kM(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),Si(f,r),m.extensions&&gs(s,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&gs(s,u[0],r),u[0];const d=new Ze;r.extensions&&gs(s,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new hn(Yl.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Kl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Si(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new Fe;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Ql(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const p=s.channels[u],g=s.samplers[p.sampler],_=p.target,m=_.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",M)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],p=u[1],g=u[2],_=u[3],m=u[4],f=[];for(let M=0,b=d.length;M<b;M++){const x=d[M],C=p[M],T=g[M],w=_[M],L=m[M];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const E=n._createAnimationTracks(x,C,T,w,L);if(E)for(let y=0;y<E.length;y++)f.push(E[y])}return new Ty(r,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,VM)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new bf:l.length>1?h=new Ze:l.length===1?h=l[0]:h=new St,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Si(h,r),r.extensions&&gs(n,h,r),r.matrix!==void 0){const u=new Fe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Ze;n.name&&(r.name=s.createUniqueName(n.name)),Si(r,n),n.extensions&&gs(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);const l=h=>{const u=new Map;for(const[d,p]of s.associations)(d instanceof oi||d instanceof Ht)&&u.set(d,p);return h.traverse(d=>{const p=s.associations.get(d);p!=null&&u.set(d,p)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];qi[r.path]===qi.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(qi[r.path]){case qi.weights:l=lr;break;case qi.rotation:l=hr;break;case qi.position:case qi.scale:l=ur;break;default:switch(n.itemSize){case 1:l=lr;break;case 2:case 3:default:l=ur;break}break}const h=s.interpolation!==void 0?OM[s.interpolation]:jr,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){const g=new l(c[d]+"."+qi[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=_l(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof hr?UM:Uf;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function WM(i,e,t){const n=e.attributes,s=new zi;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),a.normalized){const h=_l(Qs[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new P,c=new P;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const _=_l(Qs[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new li;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function ed(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=gl[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return Ke.workingColorSpace!==mn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),Si(i,e),WM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?BM(i,e.targets,t):i})}const It={ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:.05,AxisTouchThreshold:.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function Of(i){const e=await fetch(i);if(e.ok)return e.json();throw new Error(e.statusText)}async function XM(i){if(!i)throw new Error("No basePath supplied");return await Of(`${i}/profilesList.json`)}async function $M(i,e,t=null,n=!0){if(!i)throw new Error("No xrInputSource supplied");if(!e)throw new Error("No basePath supplied");const s=await XM(e);let r;if(i.profiles.some(c=>{const l=s[c];return l&&(r={profileId:c,profilePath:`${e}/${l.path}`,deprecated:!!l.deprecated}),!!r}),!r){if(!t)throw new Error("No matching profile name found");const c=s[t];if(!c)throw new Error(`No matching profile name found and default profile "${t}" missing.`);r={profileId:t,profilePath:`${e}/${c.path}`,deprecated:!!c.deprecated}}const o=await Of(r.profilePath);let a;if(n){let c;if(i.handedness==="any"?c=o.layouts[Object.keys(o.layouts)[0]]:c=o.layouts[i.handedness],!c)throw new Error(`No matching handedness, ${i.handedness}, in profile ${r.profileId}`);c.assetPath&&(a=r.profilePath.replace("profile.json",c.assetPath))}return{profile:o,assetPath:a}}const YM={xAxis:0,yAxis:0,button:0,state:It.ComponentState.DEFAULT};function jM(i=0,e=0){let t=i,n=e;if(Math.sqrt(i*i+e*e)>1){const o=Math.atan2(e,i);t=Math.cos(o),n=Math.sin(o)}return{normalizedXAxis:t*.5+.5,normalizedYAxis:n*.5+.5}}class qM{constructor(e){this.componentProperty=e.componentProperty,this.states=e.states,this.valueNodeName=e.valueNodeName,this.valueNodeProperty=e.valueNodeProperty,this.valueNodeProperty===It.VisualResponseProperty.TRANSFORM&&(this.minNodeName=e.minNodeName,this.maxNodeName=e.maxNodeName),this.value=0,this.updateFromComponent(YM)}updateFromComponent({xAxis:e,yAxis:t,button:n,state:s}){const{normalizedXAxis:r,normalizedYAxis:o}=jM(e,t);switch(this.componentProperty){case It.ComponentProperty.X_AXIS:this.value=this.states.includes(s)?r:.5;break;case It.ComponentProperty.Y_AXIS:this.value=this.states.includes(s)?o:.5;break;case It.ComponentProperty.BUTTON:this.value=this.states.includes(s)?n:0;break;case It.ComponentProperty.STATE:this.valueNodeProperty===It.VisualResponseProperty.VISIBILITY?this.value=this.states.includes(s):this.value=this.states.includes(s)?1:0;break;default:throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`)}}}class KM{constructor(e,t){if(!e||!t||!t.visualResponses||!t.gamepadIndices||Object.keys(t.gamepadIndices).length===0)throw new Error("Invalid arguments supplied");this.id=e,this.type=t.type,this.rootNodeName=t.rootNodeName,this.touchPointNodeName=t.touchPointNodeName,this.visualResponses={},Object.keys(t.visualResponses).forEach(n=>{const s=new qM(t.visualResponses[n]);this.visualResponses[n]=s}),this.gamepadIndices=Object.assign({},t.gamepadIndices),this.values={state:It.ComponentState.DEFAULT,button:this.gamepadIndices.button!==void 0?0:void 0,xAxis:this.gamepadIndices.xAxis!==void 0?0:void 0,yAxis:this.gamepadIndices.yAxis!==void 0?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(e){if(this.values.state=It.ComponentState.DEFAULT,this.gamepadIndices.button!==void 0&&e.buttons.length>this.gamepadIndices.button){const t=e.buttons[this.gamepadIndices.button];this.values.button=t.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=this.values.button>1?1:this.values.button,t.pressed||this.values.button===1?this.values.state=It.ComponentState.PRESSED:(t.touched||this.values.button>It.ButtonTouchThreshold)&&(this.values.state=It.ComponentState.TOUCHED)}this.gamepadIndices.xAxis!==void 0&&e.axes.length>this.gamepadIndices.xAxis&&(this.values.xAxis=e.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=this.values.xAxis>1?1:this.values.xAxis,this.values.state===It.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>It.AxisTouchThreshold&&(this.values.state=It.ComponentState.TOUCHED)),this.gamepadIndices.yAxis!==void 0&&e.axes.length>this.gamepadIndices.yAxis&&(this.values.yAxis=e.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=this.values.yAxis>1?1:this.values.yAxis,this.values.state===It.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>It.AxisTouchThreshold&&(this.values.state=It.ComponentState.TOUCHED)),Object.values(this.visualResponses).forEach(t=>{t.updateFromComponent(this.values)})}}class ZM{constructor(e,t,n){if(!e)throw new Error("No xrInputSource supplied");if(!t)throw new Error("No profile supplied");this.xrInputSource=e,this.assetUrl=n,this.id=t.profileId,this.layoutDescription=t.layouts[e.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach(s=>{const r=this.layoutDescription.components[s];this.components[s]=new KM(s,r)}),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){const e=[];return Object.values(this.components).forEach(t=>{e.push(t.data)}),e}updateFromGamepad(){Object.values(this.components).forEach(e=>{e.updateFromGamepad(this.xrInputSource.gamepad)})}}const JM="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles",QM="generic-trigger";class eS extends St{constructor(){super(),this.motionController=null,this.envMap=null}setEnvironmentMap(e){return this.envMap==e?this:(this.envMap=e,this.traverse(t=>{t.isMesh&&(t.material.envMap=this.envMap,t.material.needsUpdate=!0)}),this)}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&(this.motionController.updateFromGamepad(),Object.values(this.motionController.components).forEach(t=>{Object.values(t.visualResponses).forEach(n=>{const{valueNode:s,minNode:r,maxNode:o,value:a,valueNodeProperty:c}=n;s&&(c===It.VisualResponseProperty.VISIBILITY?s.visible=a:c===It.VisualResponseProperty.TRANSFORM&&(s.quaternion.slerpQuaternions(r.quaternion,o.quaternion,a),s.position.lerpVectors(r.position,o.position,a)))})}))}}function tS(i,e){Object.values(i.components).forEach(t=>{const{type:n,touchPointNodeName:s,visualResponses:r}=t;if(n===It.ComponentType.TOUCHPAD)if(t.touchPointNode=e.getObjectByName(s),t.touchPointNode){const o=new jt(.001),a=new rt({color:255}),c=new ie(o,a);t.touchPointNode.add(c)}else console.warn(`Could not find touch dot, ${t.touchPointNodeName}, in touchpad component ${t.id}`);Object.values(r).forEach(o=>{const{valueNodeName:a,minNodeName:c,maxNodeName:l,valueNodeProperty:h}=o;if(h===It.VisualResponseProperty.TRANSFORM){if(o.minNode=e.getObjectByName(c),o.maxNode=e.getObjectByName(l),!o.minNode){console.warn(`Could not find ${c} in the model`);return}if(!o.maxNode){console.warn(`Could not find ${l} in the model`);return}}o.valueNode=e.getObjectByName(a),o.valueNode||console.warn(`Could not find ${a} in the model`)})})}function td(i,e){tS(i.motionController,e),i.envMap&&e.traverse(t=>{t.isMesh&&(t.material.envMap=i.envMap,t.material.needsUpdate=!0)}),i.add(e)}class nS{constructor(e=null,t=null){this.gltfLoader=e,this.path=JM,this._assetCache={},this.onLoad=t,this.gltfLoader||(this.gltfLoader=new If)}setPath(e){return this.path=e,this}createControllerModel(e){const t=new eS;let n=null;return e.addEventListener("connected",s=>{const r=s.data;r.targetRayMode!=="tracked-pointer"||!r.gamepad||r.hand||$M(r,this.path,QM).then(({profile:o,assetPath:a})=>{t.motionController=new ZM(r,o,a);const c=this._assetCache[t.motionController.assetUrl];if(c)n=c.scene.clone(),td(t,n),this.onLoad&&this.onLoad(n);else{if(!this.gltfLoader)throw new Error("GLTFLoader not set.");this.gltfLoader.setPath(""),this.gltfLoader.load(t.motionController.assetUrl,l=>{this._assetCache[t.motionController.assetUrl]=l,n=l.scene.clone(),td(t,n),this.onLoad&&this.onLoad(n)},null,()=>{throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`)})}}).catch(o=>{console.warn(o)})}),e.addEventListener("disconnected",()=>{t.motionController=null,t.remove(n),n=null}),t}}const nd=new Fe,id=new P;class sd{constructor(e,t,n,s,r){this.controller=t,this.handModel=e,this.envMap=null;let o;!r||!r.primitive||r.primitive==="sphere"?o=new jt(1,10,10):r.primitive==="box"&&(o=new At(1,1,1));const a=new tt;this.handMesh=new Tf(o,a,30),this.handMesh.frustumCulled=!1,this.handMesh.instanceMatrix.setUsage(Nm),this.handMesh.castShadow=!0,this.handMesh.receiveShadow=!0,this.handModel.add(this.handMesh),this.joints=["wrist","thumb-metacarpal","thumb-phalanx-proximal","thumb-phalanx-distal","thumb-tip","index-finger-metacarpal","index-finger-phalanx-proximal","index-finger-phalanx-intermediate","index-finger-phalanx-distal","index-finger-tip","middle-finger-metacarpal","middle-finger-phalanx-proximal","middle-finger-phalanx-intermediate","middle-finger-phalanx-distal","middle-finger-tip","ring-finger-metacarpal","ring-finger-phalanx-proximal","ring-finger-phalanx-intermediate","ring-finger-phalanx-distal","ring-finger-tip","pinky-finger-metacarpal","pinky-finger-phalanx-proximal","pinky-finger-phalanx-intermediate","pinky-finger-phalanx-distal","pinky-finger-tip"]}updateMesh(){const t=this.controller.joints;let n=0;for(let s=0;s<this.joints.length;s++){const r=t[this.joints[s]];r.visible&&(id.setScalar(r.jointRadius||.008),nd.compose(r.position,r.quaternion,id),this.handMesh.setMatrixAt(s,nd),n++)}this.handMesh.count=n,this.handMesh.instanceMatrix.needsUpdate=!0}}const iS="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/";class sS{constructor(e,t,n,s,r=null,o=null){this.controller=t,this.handModel=e,this.bones=[],r===null&&(r=new If,r.setPath(n||iS)),r.load(`${s}.glb`,a=>{const c=a.scene.children[0];this.handModel.add(c);const l=c.getObjectByProperty("type","SkinnedMesh");l.frustumCulled=!1,l.castShadow=!0,l.receiveShadow=!0,["wrist","thumb-metacarpal","thumb-phalanx-proximal","thumb-phalanx-distal","thumb-tip","index-finger-metacarpal","index-finger-phalanx-proximal","index-finger-phalanx-intermediate","index-finger-phalanx-distal","index-finger-tip","middle-finger-metacarpal","middle-finger-phalanx-proximal","middle-finger-phalanx-intermediate","middle-finger-phalanx-distal","middle-finger-tip","ring-finger-metacarpal","ring-finger-phalanx-proximal","ring-finger-phalanx-intermediate","ring-finger-phalanx-distal","ring-finger-tip","pinky-finger-metacarpal","pinky-finger-phalanx-proximal","pinky-finger-phalanx-intermediate","pinky-finger-phalanx-distal","pinky-finger-tip"].forEach(u=>{const d=c.getObjectByName(u);d!==void 0?d.jointName=u:console.warn(`Couldn't find ${u} in ${s} hand mesh`),this.bones.push(d)}),o&&o(c)})}updateMesh(){const e=this.controller.joints;for(let t=0;t<this.bones.length;t++){const n=this.bones[t];if(n){const s=e[n.jointName];if(s.visible){const r=s.position;n.position.copy(r),n.quaternion.copy(s.quaternion)}}}}}class rS extends St{constructor(e){super(),this.controller=e,this.motionController=null,this.envMap=null,this.mesh=null}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&this.motionController.updateMesh()}}class oS{constructor(e=null,t=null){this.gltfLoader=e,this.path=null,this.onLoad=t}setPath(e){return this.path=e,this}createHandModel(e,t){const n=new rS(e);return e.addEventListener("connected",s=>{const r=s.data;r.hand&&!n.motionController&&(n.xrInputSource=r,t===void 0||t==="spheres"?n.motionController=new sd(n,e,this.path,r.handedness,{primitive:"sphere"}):t==="boxes"?n.motionController=new sd(n,e,this.path,r.handedness,{primitive:"box"}):t==="mesh"&&(n.motionController=new sS(n,e,this.path,r.handedness,this.gltfLoader,this.onLoad))),e.visible=!0}),e.addEventListener("disconnected",()=>{e.visible=!1}),n}}const bi=.13,Mn=.49,aS=10,xl={DESERT:"desert"},Xe=["wood","brick","sheep","wheat","ore"],rd={wood:"wood",lumber:"wood",brick:"brick",clay:"brick",sheep:"sheep",wool:"sheep",wheat:"wheat",grain:"wheat",ore:"ore"};function Ei(i){if(i==null)return null;const e=String(i).trim().toLowerCase();return rd[e]?rd[e]:Xe.includes(e)?e:null}const st={wood:"Lumber",brick:"Brick",sheep:"Wool",wheat:"Grain",ore:"Ore",desert:"Desert"},wn={wood:"#3f8f4c",brick:"#c45b32",sheep:"#b5d86a",wheat:"#e6c24a",ore:"#9aa3b0",desert:"#e2c48a"},cS={wood:4,brick:3,sheep:4,wheat:4,ore:3,desert:1},lS=[2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12],Ff={2:1,3:2,4:3,5:4,6:5,8:5,9:4,10:3,11:2,12:1},pt={road:{wood:1,brick:1},settlement:{wood:1,brick:1,sheep:1,wheat:1},city:{wheat:3,ore:2},dev:{sheep:1,wheat:1,ore:1}};function Ri(i,e=" · "){return Object.entries(i).filter(([,t])=>t).map(([t,n])=>`${st[t]||t} ${n}`).join(e)}function hS(i,e){return Object.entries(e||{}).filter(([t,n])=>n&&(i[t]||0)<n).map(([t])=>st[t]||t)}function uS(i,e){const t=hS(i,e);return t.length?t.length===1?`Not enough ${t[0]}`:t.length===2?`Not enough ${t[0]} and ${t[1]}`:`Not enough ${t.slice(0,-1).join(", ")}, and ${t[t.length-1]}`:null}const ti={settlement:5,city:4,road:15},dS=19,Mt={KNIGHT:"knight",VP:"vp",ROAD:"roadBuilding",PLENTY:"yearOfPlenty",MONOPOLY:"monopoly"},fS=[...Array(14).fill(Mt.KNIGHT),...Array(5).fill(Mt.VP),...Array(2).fill(Mt.ROAD),...Array(2).fill(Mt.PLENTY),...Array(2).fill(Mt.MONOPOLY)],pS=["generic","generic","generic","generic","wood","brick","sheep","wheat","ore"],mS=[{id:0,name:"Red",color:"#b42318"},{id:1,name:"Blue",color:"#1f4e8c"},{id:2,name:"Orange",color:"#d46a1a"},{id:3,name:"White",color:"#efe7d6"}],F={SETUP_SETTLEMENT:"setupSettlement",SETUP_ROAD:"setupRoad",ROLL:"roll",MAIN:"main",DISCARD:"discard",ROBBER:"robber",STEAL:"steal",FREE_ROADS:"freeRoads",PLENTY:"plenty",MONOPOLY:"monopoly",GAME_OVER:"gameOver"},od=Math.sqrt(3);function Bf(i){let e=i>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function oa(i,e=Math.random){const t=[...i];for(let n=t.length-1;n>0;n--){const s=Math.floor(e()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}function ad(i){const e=[];for(let t=-i;t<=i;t++){const n=Math.max(-i,-t-i),s=Math.min(i,-t+i);for(let r=n;r<=s;r++)e.push({q:t,r})}return e}function Xr(i,e){return`${i},${e}`}function vl(i,e,t){return{x:t*(od*i+od/2*e),z:t*(1.5*e)}}function gS(i,e,t,n){const s=vl(i,e,n),r=Math.PI/180*(60*t-30);return{x:s.x+n*Math.cos(r),z:s.z+n*Math.sin(r)}}function _S(i,e){return`${Math.round(i*1e3)}_${Math.round(e*1e3)}`}function xS(i,e){return i<e?`${i}|${e}`:`${e}|${i}`}function vS(i,e){return[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]].map(([t,n])=>({q:i+t,r:e+n}))}function yl(i,e){return Object.entries(e).every(([t,n])=>(i[t]||0)>=n)}function $o(i,e){for(const[t,n]of Object.entries(e))i[t]-=n}function yS(i,e,t=1){i[e]=(i[e]||0)+t}function MS(i){const e=new Map(i.map(t=>[Xr(t.q,t.r),t]));for(const t of i)if(!(t.number!==6&&t.number!==8))for(const n of vS(t.q,t.r)){const s=e.get(Xr(n.q,n.r));if(s&&(s.number===6||s.number===8))return!0}return!1}function SS(i=Date.now()){const e=Bf(i>>>0),t=ad(2),n=ad(3).filter(f=>Math.max(Math.abs(f.q),Math.abs(f.r),Math.abs(f.q+f.r))===3);let s=null;for(let f=0;f<80;f++){const M=[];for(const[T,w]of Object.entries(cS))for(let L=0;L<w;L++)M.push(T);const b=oa(M,e),x=oa(lS,e);let C=0;if(s=t.map((T,w)=>{const L=b[w],E=L===xl.DESERT?null:x[C++],y=vl(T.q,T.r,bi);return{id:Xr(T.q,T.r),q:T.q,r:T.r,x:y.x,z:y.z,resource:L,number:E,isLand:!0}}),!MS(s))break}const r=n.map(f=>{const M=vl(f.q,f.r,bi);return{id:Xr(f.q,f.r),q:f.q,r:f.r,x:M.x,z:M.z,resource:"sea",number:null,isLand:!1}}),o=new Map;for(const f of[...s,...r])o.set(f.id,f);const a=new Map,c=new Map;function l(f,M,b){const x=gS(f,M,b,bi),C=_S(x.x,x.z);a.has(C)||a.set(C,{id:C,x:x.x,z:x.z,hexes:[],neighbors:new Set,edges:[],building:null,harbor:null});const T=a.get(C),w=Xr(f,M);return T.hexes.includes(w)||T.hexes.push(w),T}for(const f of o.values()){const M=[];for(let b=0;b<6;b++)M.push(l(f.q,f.r,b));for(let b=0;b<6;b++){const x=M[b],C=M[(b+1)%6];x.neighbors.add(C.id),C.neighbors.add(x.id);const T=xS(x.id,C.id);c.has(T)||c.set(T,{id:T,a:x.id,b:C.id,hexes:[],road:null,coastal:!1});const w=c.get(T);w.hexes.includes(f.id)||w.hexes.push(f.id),x.edges.includes(T)||x.edges.push(T),C.edges.includes(T)||C.edges.push(T)}}for(const f of a.values())f.neighbors=[...f.neighbors];for(const f of c.values()){const M=f.hexes.filter(x=>o.get(x).isLand).length,b=f.hexes.filter(x=>!o.get(x).isLand).length;f.touchesLand=M>0,f.coastal=M>0&&b>0}const h=[...c.values()].filter(f=>f.coastal);h.sort((f,M)=>{const b=a.get(f.a),x=a.get(M.a);return Math.atan2(b.z,b.x)-Math.atan2(x.z,x.x)});const u=[],d=new Set,p=oa(pS,e),g=Math.max(1,Math.floor(h.length/p.length));let _=0;for(let f=0;f<h.length&&_<p.length;f+=g){const M=h[f];if(d.has(M.a)||d.has(M.b))continue;const b=p[_++],x={id:`h${_}`,type:b,edge:M.id,vertices:[M.a,M.b]};u.push(x),a.get(M.a).harbor=b,a.get(M.b).harbor=b,d.add(M.a),d.add(M.b)}const m=s.find(f=>f.resource===xl.DESERT);return{seed:i,hexes:o,land:s,sea:r,vertices:a,edges:c,harbors:u,robberHex:m.id}}function bS(i){return Ff[i]||0}function Ci(i,e){const t=i.vertices.get(e);let n=0;const s=new Set;for(const r of t.hexes){const o=i.hexes.get(r);o.isLand&&(n+=bS(o.number),o.resource!==xl.DESERT&&s.add(o.resource))}return n+s.size*.35+(t.harbor?.8:0)}function cd(){return Object.fromEntries(Xe.map(i=>[i,0]))}function yc(i){return Xe.reduce((e,t)=>e+i[t],0)}class kf{constructor({playerCount:e=3,solo:t=!0,seed:n=Date.now()}={}){this.seed=n>>>0,this.rand=Bf(this.seed),this.board=SS(this.seed),this.playerCount=e,this.players=mS.slice(0,e).map((s,r)=>({...s,isAI:t?r!==0:!1,resources:cd(),roads:[],settlements:[],cities:[],devCards:[],knightsPlayed:0,lastSettlement:null})),this.bank=Object.fromEntries(Xe.map(s=>[s,dS])),this.devDeck=oa(fS,this.rand),this.current=0,this.setupIndex=0,this.phase=F.SETUP_SETTLEMENT,this.dice=[0,0],this.log=[],this.listeners=new Set,this.playedDevThisTurn=!1,this.freeRoads=0,this.discardQueue=[],this.stealCandidates=[],this.longestRoad={player:null,length:0},this.largestArmy={player:null,size:0},this.winner=null,this.lastAction=null,this.lastRoll=null,this.lastSteal=null,this.lastTrade=null,this.afterRobber=F.MAIN,this.note(`Island seed ${this.seed}. ${e} captains set sail.`)}on(e){return this.listeners.add(e),()=>this.listeners.delete(e)}emit(e=null){this.lastAction=e;for(const t of this.listeners)t(this,e)}note(e){this.log.push(e),this.log.length>80&&this.log.shift()}player(e=this.current){return this.players[e]}isHuman(e=this.current){return!this.player(e).isAI}setupOrder(){const e=this.playerCount,t=Array.from({length:e},(s,r)=>r),n=[...t].reverse();return[...t,...n]}setupPlayer(){return this.setupOrder()[this.setupIndex]}publicVP(e){let t=e.settlements.length+e.cities.length*2;return this.longestRoad.player===e.id&&(t+=2),this.largestArmy.player===e.id&&(t+=2),t}hiddenVP(e){return e.devCards.filter(t=>t.type===Mt.VP).length}totalVP(e){return this.publicVP(e)+this.hiddenVP(e)}scoreFacts(e){return{settlements:e.settlements.length,cities:e.cities.length,longestRoad:this.longestRoad.player===e.id,largestArmy:this.largestArmy.player===e.id,hiddenVP:this.hiddenVP(e),publicVP:this.publicVP(e),totalVP:this.totalVP(e)}}checkWin(e=this.current){const t=this.player(e);return this.totalVP(t)>=aS?(this.winner=t.id,this.phase=F.GAME_OVER,this.note(`${t.name} reaches ${this.totalVP(t)} victory points and claims the island!`),!0):!1}tradeRate(e,t){var o;const n=Ei(t);let s=4;if(!e||!n)return s;const r=[...e.settlements,...e.cities];for(const a of r){const c=(o=this.board.vertices.get(a))==null?void 0:o.harbor;c&&(c==="generic"&&(s=Math.min(s,3)),c===n&&(s=Math.min(s,2)))}return s}whyNotBankTrade(e,t,n){if(this.phase!==F.MAIN)return"Trade after you roll.";if(e!==this.current)return"Wait for your turn.";const s=Ei(t),r=Ei(n);if(!s)return"Pick a resource to give the bank.";if(!r)return"Pick a resource to take from the bank.";if(s===r)return"Give and get must be different.";const o=this.player(e),a=this.tradeRate(o,s);return(o.resources[s]||0)<a?`Need ${a} ${st[s]||s} for a ${a}:1 bank trade.`:(this.bank[r]||0)<1?`The bank is out of ${st[r]||r}.`:null}canBankTrade(e,t,n){return!this.whyNotBankTrade(e,t,n)}validSettlements(e,{setup:t=!1}={}){const n=this.player(e),s=[];if(!t&&n.settlements.length>=ti.settlement)return s;for(const r of this.board.vertices.values())r.building||!r.hexes.some(c=>this.board.hexes.get(c).isLand)||r.neighbors.some(c=>this.board.vertices.get(c).building)||!t&&!r.edges.some(l=>this.board.edges.get(l).road===e)||s.push(r.id);return s}validRoads(e,{setup:t=!1,free:n=!1}={}){const s=this.player(e),r=[];if(!n&&!t&&s.roads.length>=ti.road)return r;for(const o of this.board.edges.values()){if(o.road!=null||!o.touchesLand)continue;const a=this.board.vertices.get(o.a),c=this.board.vertices.get(o.b);if(t){const l=s.lastSettlement;if(o.a!==l&&o.b!==l)continue;r.push(o.id);continue}(this.roadConnects(a,e)||this.roadConnects(c,e))&&r.push(o.id)}return r}roadConnects(e,t){var n;return e.building&&e.building.player!==t?!1:((n=e.building)==null?void 0:n.player)===t?!0:e.edges.some(s=>this.board.edges.get(s).road===t)}validCities(e){const t=this.player(e);return t.cities.length>=ti.city?[]:t.settlements.filter(n=>{var s;return((s=this.board.vertices.get(n).building)==null?void 0:s.type)==="settlement"})}canAfford(e,t){return yl(this.player(e).resources,pt[t])}missingCostLabel(e,t){return uS(this.player(e).resources,pt[t])}whyNotSettlement(e,t=this.current){const n=this.phase===F.SETUP_SETTLEMENT,s=this.player(t);if(e==null){if(!n&&this.phase!==F.MAIN)return"Can't settle now";if(!n){const a=this.missingCostLabel(t,"settlement");if(a)return a}return!n&&s.settlements.length>=ti.settlement?"No settlements left":"Can't settle now"}if(this.validSettlements(t,{setup:n}).includes(e)){if(!n){const a=this.missingCostLabel(t,"settlement");if(a)return a}return"Can't settle here"}const r=this.board.vertices.get(e);return r?r.building?"Already occupied":r.hexes.some(a=>this.board.hexes.get(a).isLand)?r.neighbors.some(a=>this.board.vertices.get(a).building)?"Too close to another settlement":!n&&!r.edges.some(c=>this.board.edges.get(c).road===t)?"Need a road connection":!n&&s.settlements.length>=ti.settlement?"No settlements left":"Can't settle here":"Can't settle here":"Can't settle here"}whyNotRoad(e,t=this.current){const n=this.phase===F.SETUP_ROAD,s=this.phase===F.FREE_ROADS,r=this.player(t);if(e==null){if(!n&&!s&&this.phase!==F.MAIN)return"Can't build a road now";if(!n&&!s){const l=this.missingCostLabel(t,"road");if(l)return l}return!s&&!n&&r.roads.length>=ti.road?"No roads left":"Can't build a road now"}const o=this.board.edges.get(e);if(!o)return"Can't build here";if(o.road!=null)return"Already occupied";if(this.validRoads(t,{setup:n,free:s}).includes(e)){if(!n&&!s){const l=this.missingCostLabel(t,"road");if(l)return l}return"Can't build here"}if(!o.touchesLand)return"Can't build on water";const a=this.board.vertices.get(o.a),c=this.board.vertices.get(o.b);if(n){const l=r.lastSettlement;if(o.a!==l&&o.b!==l)return"Must touch your new settlement"}else if(!this.roadConnects(a,t)&&!this.roadConnects(c,t))return"Need a road connection";return!s&&!n&&r.roads.length>=ti.road?"No roads left":"Can't build here"}whyNotCity(e,t=this.current){var o;const n=this.player(t);if(e==null){if(this.phase!==F.MAIN)return"Can't build a city now";const a=this.missingCostLabel(t,"city");return a||(n.cities.length>=ti.city?"No cities left":this.validCities(t).length?"Can't build a city now":"Need a settlement here")}if(this.phase!==F.MAIN)return"Can't build a city now";if(n.cities.length>=ti.city)return"No cities left";const s=this.board.vertices.get(e);if(((o=s==null?void 0:s.building)==null?void 0:o.type)==="city")return"Already a city";if(!(s!=null&&s.building))return"Need a settlement here";if(s.building.player!==t)return"Already occupied";if(s.building.type!=="settlement")return"Need a settlement here";const r=this.missingCostLabel(t,"city");return r||"Can't build a city now"}whyNotDev(e=this.current){if(this.phase!==F.MAIN)return"Can't buy a card now";const t=this.missingCostLabel(e,"dev");return t||(this.devDeck.length?"Can't buy a card now":"No development cards left")}takeFromBank(e,t,n){const s=Math.min(t,this.bank[e]);return this.bank[e]-=s,yS(n.resources,e,s),s}returnToBank(e,t,n){const s=Math.min(n,e.resources[t]);e.resources[t]-=s,this.bank[t]+=s}placeSettlement(e,t=this.current){const n=this.phase===F.SETUP_SETTLEMENT;if(!this.validSettlements(t,{setup:n}).includes(e))return!1;const s=this.player(t);if(!n){if(!this.canAfford(t,"settlement"))return!1;$o(s.resources,pt.settlement);for(const[o,a]of Object.entries(pt.settlement))this.bank[o]+=a}const r=this.board.vertices.get(e);if(r.building={player:t,type:"settlement"},s.settlements.push(e),s.lastSettlement=e,this.note(`${s.name} founds a settlement.`),this.updateLongestRoad(),n){if(this.setupIndex>=this.playerCount)for(const o of r.hexes){const a=this.board.hexes.get(o);a.isLand&&a.resource!=="desert"&&this.takeFromBank(a.resource,1,s)}this.phase=F.SETUP_ROAD,this.current=t}else this.checkWin(t);return this.emit({type:"settlement",vertexId:e,playerId:t}),!0}placeRoad(e,t=this.current){const n=this.phase===F.SETUP_ROAD,s=this.phase===F.FREE_ROADS;if(!this.validRoads(t,{setup:n,free:s}).includes(e)||this.board.edges.get(e).road!=null)return!1;const r=this.player(t);if(!n&&!s){if(!this.canAfford(t,"road"))return!1;$o(r.resources,pt.road);for(const[o,a]of Object.entries(pt.road))this.bank[o]+=a}return this.board.edges.get(e).road=t,r.roads.push(e),this.note(`${r.name} builds a road.`),this.updateLongestRoad(),n?(this.setupIndex+=1,this.setupIndex>=this.playerCount*2?(this.current=0,this.phase=F.ROLL,this.note("The island is claimed. Red rolls first.")):(this.current=this.setupPlayer(),this.phase=F.SETUP_SETTLEMENT)):s?(this.freeRoads-=1,this.freeRoads<=0&&(this.phase=F.MAIN),this.checkWin(t)):this.checkWin(t),this.emit({type:"road",edgeId:e,playerId:t}),!0}placeCity(e,t=this.current){if(this.phase!==F.MAIN||!this.validCities(t).includes(e)||!this.canAfford(t,"city"))return!1;const n=this.player(t);$o(n.resources,pt.city);for(const[s,r]of Object.entries(pt.city))this.bank[s]+=r;return this.board.vertices.get(e).building.type="city",n.settlements=n.settlements.filter(s=>s!==e),n.cities.push(e),this.note(`${n.name} upgrades to a city.`),this.checkWin(t),this.emit({type:"city",vertexId:e,playerId:t}),!0}roll(){if(this.phase!==F.ROLL)return null;this.lastSteal=null,this.lastTrade=null;const e=1+Math.floor(this.rand()*6),t=1+Math.floor(this.rand()*6);this.dice=[e,t];const n=e+t;this.note(`${this.player().name} rolls ${e} + ${t} = ${n}.`);let s=[];return n===7?this.startRobber():(s=this.produce(n),this.phase=F.MAIN),this.lastRoll={dice:[e,t],production:s,seven:n===7,playerId:this.current},this.emit({type:"roll",dice:this.dice,production:s}),this.dice}produce(e){const t=this.players.map(()=>cd()),n=[];for(const r of this.board.land)if(!(r.number!==e||r.id===this.board.robberHex)&&Xe.includes(r.resource))for(const o of this.board.vertices.values()){if(!o.building||!o.hexes.includes(r.id))continue;const a=o.building.type==="city"?2:1;t[o.building.player][r.resource]+=a,n.push({hexId:r.id,vertexId:o.id,playerId:o.building.player,resource:r.resource,amount:a})}const s=[];for(const r of Xe){const o=t.reduce((a,c)=>a+c[r],0);if(o!==0){if(o>this.bank[r]){this.note(`The ${st[r]||r} supply is too scarce to pay everyone.`);continue}for(let a=0;a<this.players.length;a++)t[a][r]&&this.takeFromBank(r,t[a][r],this.players[a]);for(const a of n)a.resource===r&&s.push(a)}}return s}startRobber(){this.lastSteal=null,this.discardQueue=this.players.filter(e=>yc(e.resources)>=8).map(e=>({player:e.id,must:Math.floor(yc(e.resources)/2)})),this.discardQueue.length?(this.phase=F.DISCARD,this.afterRobber=F.MAIN,this.note("A seven! Hands of eight or more must discard half.")):(this.afterRobber=F.MAIN,this.phase=F.ROBBER,this.note(`${this.player().name} must move the robber.`))}discard(e,t){const n=this.discardQueue.find(o=>o.player===e);if(!n)return!1;const s=this.player(e);let r=0;for(const o of Xe)r+=t[o]||0;if(r!==n.must||!yl(s.resources,t))return!1;for(const o of Xe){const a=t[o]||0;a&&this.returnToBank(s,o,a)}return this.discardQueue=this.discardQueue.filter(o=>o.player!==e),this.note(`${s.name} discards ${r} cards.`),this.discardQueue.length||(this.phase=F.ROBBER),this.emit({type:"discard",playerId:e}),!0}moveRobber(e,t=this.current){if(this.phase!==F.ROBBER)return!1;this.lastSteal=null;const n=this.board.hexes.get(e);if(!(n!=null&&n.isLand)||e===this.board.robberHex)return!1;this.board.robberHex=e,this.note(`${this.player(t).name} moves the robber.`);const s=new Set;for(const r of this.board.vertices.values())if(r.building&&r.hexes.includes(e)&&r.building.player!==t){const o=this.player(r.building.player);yc(o.resources)>0&&s.add(o.id)}return this.stealCandidates=[...s],this.phase=this.stealCandidates.length?F.STEAL:this.afterRobber,this.stealCandidates.length||this.note("No neighbor to steal from."),this.emit({type:"robber",hexId:e}),!0}steal(e,t=this.current){if(this.phase!==F.STEAL||!this.stealCandidates.includes(e))return!1;const n=this.player(e),s=[];for(const o of Xe)for(let a=0;a<n.resources[o];a++)s.push(o);if(!s.length)return this.lastSteal=null,this.phase=this.afterRobber,this.emit({type:"steal",fromId:e,playerId:t,resource:null}),!0;const r=s[Math.floor(this.rand()*s.length)];return n.resources[r]-=1,this.player(t).resources[r]+=1,this.lastSteal={playerId:t,fromId:e,resource:r},this.note(`${this.player(t).name} steals ${st[r]||r} from ${n.name}.`),this.phase=this.afterRobber,this.emit({type:"steal",fromId:e,playerId:t,resource:r}),!0}bankTrade(e,t,n){const s=Ei(t),r=Ei(n);if(this.whyNotBankTrade(e,s,r))return!1;const o=this.player(e),a=this.tradeRate(o,s);return this.returnToBank(o,s,a),this.takeFromBank(r,1,o),this.lastTrade={playerId:e,give:s,get:r,rate:a},this.note(`Traded ${a} ${st[s]||s} for 1 ${st[r]||r}`),this.emit({type:"trade",give:s,get:r,rate:a,playerId:e}),!0}buyDev(e=this.current){if(this.phase!==F.MAIN||!this.devDeck.length||!this.canAfford(e,"dev"))return!1;const t=this.player(e);$o(t.resources,pt.dev);for(const[s,r]of Object.entries(pt.dev))this.bank[s]+=r;const n=this.devDeck.pop();return t.devCards.push({type:n,playable:!1,id:`${e}-${t.devCards.length}-${this.rand()}`}),this.note(`${t.name} buys a development card.`),this.checkWin(e),this.emit({type:"buyDev"}),!0}playableCards(e){const t=this.player(e);return this.playedDevThisTurn?[]:[F.ROLL,F.MAIN].includes(this.phase)?t.devCards.filter(n=>n.playable&&n.type!==Mt.VP):[]}playDev(e,t={}){const n=this.player(),s=n.devCards.find(r=>r.id===e);return!s||!this.playableCards(n.id).some(r=>r.id===e)?!1:(this.playedDevThisTurn=!0,n.devCards=n.devCards.filter(r=>r.id!==e),s.type===Mt.KNIGHT?(n.knightsPlayed+=1,this.updateArmy(),this.lastSteal=null,this.note(`${n.name} plays a knight.`),this.afterRobber=this.phase===F.ROLL?F.ROLL:F.MAIN,this.phase=F.ROBBER):s.type===Mt.ROAD?(this.freeRoads=Math.min(2,ti.road-n.roads.length),this.phase=this.freeRoads?F.FREE_ROADS:F.MAIN,this.note(`${n.name} plays Road Building.`)):s.type===Mt.PLENTY?(this.phase=F.PLENTY,this.note(`${n.name} plays Year of Plenty.`)):s.type===Mt.MONOPOLY&&(this.phase=F.MONOPOLY,this.note(`${n.name} plays Monopoly.`)),this.checkWin(n.id),this.emit({type:"dev",card:s}),!0)}yearOfPlenty(e,t,n=this.current){if(this.phase!==F.PLENTY)return!1;const s=this.player(n);return this.takeFromBank(e,1,s),this.takeFromBank(t,1,s),this.phase=F.MAIN,this.note(`${s.name} takes ${st[e]||e} and ${st[t]||t} from the bank.`),this.emit({type:"plenty"}),!0}monopoly(e,t=this.current){if(this.phase!==F.MONOPOLY)return!1;const n=this.player(t);let s=0;for(const r of this.players)r.id!==t&&(s+=r.resources[e],r.resources[e]=0);return n.resources[e]+=s,this.phase=F.MAIN,this.note(`${n.name} monopolizes ${st[e]||e} (${s} cards).`),this.emit({type:"monopoly"}),!0}endTurn(){if(this.phase!==F.MAIN)return!1;if(this.checkWin(this.current))return this.emit({type:"end"}),!0;const e=this.player();for(const t of e.devCards)t.playable=!0;return this.playedDevThisTurn=!1,this.lastTrade=null,this.current=(this.current+1)%this.playerCount,this.phase=F.ROLL,this.note(`${this.player().name}'s turn.`),this.emit({type:"end"}),!0}updateArmy(){let e=this.largestArmy;for(const t of this.players)t.knightsPlayed>=3&&t.knightsPlayed>e.size&&(e={player:t.id,size:t.knightsPlayed});e.player!==this.largestArmy.player&&e.player!=null&&this.note(`${this.player(e.player).name} claims Largest Army.`),this.largestArmy=e}roadLength(e){const t=[...this.board.edges.values()].filter(o=>o.road===e),n=new Map;for(const o of t){const a=c=>{const l=this.board.vertices.get(c).building;return l&&l.player!==e};a(o.a)||(n.has(o.a)||n.set(o.a,[]),n.get(o.a).push(o)),a(o.b)||(n.has(o.b)||n.set(o.b,[]),n.get(o.b).push(o))}let s=0;const r=t.map(o=>o.id);for(const o of r){const a=[{eid:o,from:null,path:new Set([o])}];for(;a.length;){const{eid:c,from:l,path:h}=a.pop();s=Math.max(s,h.size);const u=this.board.edges.get(c);for(const d of[u.a,u.b]){if(d===l)continue;const p=this.board.vertices.get(d).building;if(!(p&&p.player!==e))for(const g of this.board.vertices.get(d).edges){if(h.has(g)||this.board.edges.get(g).road!==e)continue;const _=new Set(h);_.add(g),this.board.edges.get(g).a===d?this.board.edges.get(g).b:this.board.edges.get(g).a,a.push({eid:g,from:d,path:_})}}}}return s}updateLongestRoad(){const e=this.players.map(n=>({id:n.id,n:this.roadLength(n.id)}));let t=this.longestRoad;for(const n of e)n.n>=5&&n.n>t.length&&(t={player:n.id,length:n.n});if(t.player!=null){const n=e.find(s=>s.id===t.player);if(!n||n.n<5){const s=e.filter(r=>r.n>=5).sort((r,o)=>o.n-r.n);t=s.length?{player:s[0].id,length:s[0].n}:{player:null,length:0}}else t.length=n.n}t.player!==this.longestRoad.player&&t.player!=null&&this.note(`${this.player(t.player).name} claims Longest Road.`),this.longestRoad=t}suggestSetupVertex(e){const t=this.validSettlements(e,{setup:!0});return t.sort((n,s)=>Ci(this.board,s)-Ci(this.board,n)),t[0]}}function ES(i){return Xe.reduce((e,t)=>e+i.resources[t],0)}function Ea(i,e){const t={};for(const[n,s]of Object.entries(e)){const r=s-(i[n]||0);r>0&&(t[n]=r)}return t}function ld(i){return Xe.map(e=>i.resources[e]).join(",")+`:${i.roads.length}:${i.settlements.length}:${i.cities.length}`}function zf(i){var t;const e=i.player();if(i.phase===F.GAME_OVER||i.phase!==F.DISCARD&&!e.isAI)return!1;if(i.phase===F.SETUP_SETTLEMENT)return i.placeSettlement(i.suggestSetupVertex(e.id),e.id);if(i.phase===F.SETUP_ROAD){const n=i.validRoads(e.id,{setup:!0}),s=n.map(r=>{const o=i.board.edges.get(r),a=o.a===e.lastSettlement?o.b:o.a;return{eid:r,s:Ci(i.board,a)}});return s.sort((r,o)=>o.s-r.s),i.placeRoad(((t=s[0])==null?void 0:t.eid)||n[0],e.id)}if(i.phase===F.DISCARD){const n=i.discardQueue.find(c=>i.player(c.player).isAI);if(!n)return!1;const s=i.player(n.player),r={wood:0,brick:0,sheep:0,wheat:0,ore:0},o=[];for(const c of Xe){const l=s.resources[c]|0;for(let h=0;h<l;h++)o.push(c)}o.sort((c,l)=>(s.resources[l]|0)-(s.resources[c]|0));let a=n.must;for(const c of o){if(a<=0)break;r[c]+=1,a-=1}return a>0?!1:i.discard(s.id,r)}if(i.phase===F.ROBBER)return i.moveRobber(PS(i,e.id),e.id);if(i.phase===F.STEAL){const n=i.stealCandidates.slice().sort((s,r)=>i.publicVP(i.player(r))-i.publicVP(i.player(s)))[0];return i.steal(n,e.id)}if(i.phase===F.FREE_ROADS){const n=i.validRoads(e.id,{free:!0});return n.length?i.placeRoad(Hf(i,e.id,n),e.id):(i.freeRoads=0,i.phase=F.MAIN,!0)}if(i.phase===F.PLENTY){const n=TS(i,e);return i.yearOfPlenty(n[0],n[1]||n[0],e.id)}if(i.phase===F.MONOPOLY){const n=Xe.slice().sort((s,r)=>Ml(i,e.id,r)-Ml(i,e.id,s))[0];return i.monopoly(n,e.id)}if(i.phase===F.ROLL){const n=e.devCards.find(r=>r.playable&&r.type===Mt.KNIGHT),s=Vf(i,e.id);return n&&(s||e.knightsPlayed===2)?(i.playDev(n.id),!0):!!i.roll()}if(i.phase===F.MAIN){for(let n=0;n<8;n++){const s=ld(e);if(wS(i,e),hd(i,e),i.phase!==F.MAIN)return!0;if(ld(e)===s)break}return AS(i,e),i.phase!==F.MAIN?!0:(hd(i,e),i.endTurn())}return!1}function Ml(i,e,t){return i.players.reduce((n,s)=>n+(s.id===e?0:s.resources[t]),0)}function TS(i,e){const t=[pt.city,pt.settlement,pt.dev,pt.road],n=Object.fromEntries(Xe.map(s=>[s,0]));for(const s of t)for(const[r,o]of Object.entries(Ea(e.resources,s)))n[r]+=o;return Xe.slice().sort((s,r)=>n[r]-n[s])}function hd(i,e){if(i.canAfford(e.id,"city")){const t=i.validCities(e.id).sort((n,s)=>Ci(i.board,s)-Ci(i.board,n));t[0]&&i.placeCity(t[0],e.id)}if(i.canAfford(e.id,"settlement")){const t=i.validSettlements(e.id).sort((n,s)=>Ci(i.board,s)-Ci(i.board,n));t[0]&&i.placeSettlement(t[0],e.id)}if(i.canAfford(e.id,"road")){const t=i.validRoads(e.id),n=i.validSettlements(e.id).length===0&&e.settlements.length<5;t.length&&(n||e.roads.length<3||i.roadLength(e.id)<5)&&i.placeRoad(Hf(i,e.id,t),e.id)}}function AS(i,e){const t=e.devCards.find(a=>a.playable&&a.type===Mt.KNIGHT);t&&(Vf(i,e.id)||e.knightsPlayed>=2)&&i.playDev(t.id);const n=e.devCards.find(a=>a.playable&&a.type===Mt.PLENTY);n&&Object.keys(Ea(e.resources,pt.settlement)).length&&i.playDev(n.id);const s=e.devCards.find(a=>a.playable&&a.type===Mt.MONOPOLY);s&&Xe.some(a=>Ml(i,e.id,a)>=3)&&i.playDev(s.id);const r=e.devCards.find(a=>a.playable&&a.type===Mt.ROAD);r&&i.validSettlements(e.id).length===0&&i.playDev(r.id);const o=e.settlements.length<5&&RS(e.resources,pt.settlement)<=2;i.canAfford(e.id,"dev")&&!o&&ES(e)>=6&&i.devDeck.length&&i.buyDev(e.id)}function wS(i,e){const t=[];e.cities.length<4&&e.settlements.length&&t.push(pt.city),e.settlements.length<5&&t.push(pt.settlement),t.push(pt.road,pt.dev);for(const n of t){if(yl(e.resources,n))continue;const s=Ea(e.resources,n);for(const r of Object.keys(s))for(const o of Xe){if(o===r)continue;const a=i.tradeRate(e,o);if(!((e.resources[o]||0)<a||i.bank[r]<1)&&!(e.resources[o]-a<(n[o]||0)))return i.bankTrade(e.id,o,r),!0}}return!1}function RS(i,e){return Object.values(Ea(i,e)).reduce((t,n)=>t+n,0)}function CS(i){const e=[];for(const t of i.board.vertices.values())t.building||t.hexes.some(n=>i.board.hexes.get(n).isLand)&&(t.neighbors.some(n=>i.board.vertices.get(n).building)||e.push(t));return e.sort((t,n)=>Ci(i.board,n.id)-Ci(i.board,t.id)),e}function Hf(i,e,t){const n=CS(i)[0];if(!n)return t[0];let s=t[0],r=1e9;for(const o of t){const a=i.board.edges.get(o),c=i.board.vertices.get(a.a),l=i.board.vertices.get(a.b),h=Math.min(Math.hypot(c.x-n.x,c.z-n.z),Math.hypot(l.x-n.x,l.z-n.z));h<r&&(r=h,s=o)}return s}function Vf(i,e){var n;const t=i.board.robberHex;for(const s of i.board.vertices.values())if(((n=s.building)==null?void 0:n.player)===e&&s.hexes.includes(t))return!0;return!1}function PS(i,e){let t=null,n=-999;for(const s of i.board.land){if(s.id===i.board.robberHex||s.resource==="desert")continue;let r=s.number?6-Math.abs(7-s.number):0,o=!1,a=!1;for(const c of i.board.vertices.values())if(!(!c.building||!c.hexes.includes(s.id)))if(c.building.player===e)o=!0;else{r+=2+i.publicVP(i.player(c.building.player));const l=Math.max(...i.players.map(h=>i.publicVP(h)));i.publicVP(i.player(c.building.player))===l&&(a=!0)}o&&(r-=8),a&&(r+=3),r>n&&(n=r,t=s.id)}return t||i.board.land.find(s=>s.id!==i.board.robberHex).id}function LS(i=typeof navigator<"u"?navigator.userAgent:""){var e;return typeof navigator<"u"&&((e=navigator.userAgentData)!=null&&e.mobile)?!0:/Quest|Oculus|OculusBrowser|Mobile VR|Android|Apple Vision|iPhone|iPad/i.test(i||"")}const vn=LS(),DS=typeof devicePixelRatio=="number"?devicePixelRatio:1,Te={headset:vn,antialias:!vn,pixelRatio:vn?1:Math.min(DS,2),framebufferScale:1,shadows:!vn,shadowSoft:!vn,shadowSize:vn?512:1024,xrShadows:!1,xrShadowSize:512,roomWood:512,floorWood:512,feltSize:vn?128:256,claySize:vn?256:512,numberSize:256,harborLabel:256,trayScale:vn?.5:1,helpW:512,helpH:vn?128:256,floatW:512,floatH:128,avatarLabelW:256,avatarLabelH:96,handleLabelW:256,handleLabelH:64,tableSegments:vn?16:24,rugSegments:vn?16:24,tokenSegments:12,harborDiscSegments:8,harborRingSegments:8,chipSegments:12,anisotropy:vn?1:4};function qt(i){return i&&(i.userData.shared=!0),i}function IS(i,{keepShared:e=!0}={}){i&&i.traverse(t=>{var s,r;t.geometry&&!(e&&((s=t.geometry.userData)!=null&&s.shared))&&t.geometry.dispose();const n=Array.isArray(t.material)?t.material:t.material?[t.material]:[];for(const o of n)if(o){for(const a of["map","alphaMap","aoMap","bumpMap","normalMap","emissiveMap"]){const c=o[a];c!=null&&c.dispose&&!(e&&((r=c.userData)!=null&&r.shared))&&c.dispose()}o.dispose()}})}function Sl(i,e){if(i)for(const t of[...i.children])IS(t,e),i.remove(t)}function NS(i,e,{enabled:t,size:n}){if(i.shadowMap.enabled=!!t,!e)return;e.castShadow=!!t;const s=Math.max(128,n||512);(e.shadow.mapSize.x!==s||e.shadow.mapSize.y!==s)&&(e.shadow.mapSize.set(s,s),e.shadow.map&&(e.shadow.map.dispose(),e.shadow.map=null))}function US(){return Te.shadowSoft?Wd:Bl}function Gf(i,e,t,n){const s=i.createImageData(e,t);for(let r=0;r<t;r++)for(let o=0;o<e;o++){const a=(r*e+o)*4,[c,l,h]=n(o,r);s.data[a]=c,s.data[a+1]=l,s.data[a+2]=h,s.data[a+3]=255}i.putImageData(s,0,0)}function bl(i,e){const t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)}function pa(i=512,e=512,t=[120,72,38]){const n=document.createElement("canvas");n.width=i,n.height=e;const s=n.getContext("2d");Gf(s,i,e,(o,a)=>{const c=Math.sin(o*.08+bl(o,a)*3)*18,l=Math.sin((o*.35+a*.02)*.2)*10,h=bl(o*.5,a*2)*22;return t.map(u=>Math.max(0,Math.min(255,u+c+l+h-20)))});const r=new Cs(n);return r.wrapS=r.wrapT=os,r.colorSpace=Lt,r.anisotropy=Te.anisotropy,qt(r)}function Wf(i=[22,70,92],e=Te.feltSize){const t=document.createElement("canvas");t.width=t.height=e;const n=t.getContext("2d");Gf(n,e,e,(r,o)=>{const a=(bl(r,o)-.5)*18;return i.map(c=>Math.max(0,Math.min(255,c+a)))});const s=new Cs(t);return s.wrapS=s.wrapT=os,s.colorSpace=Lt,s.anisotropy=Te.anisotropy,qt(s)}function sh(i){return i.generateMipmaps=!1,i.minFilter=zt,i.magFilter=zt,i.anisotropy=Te.anisotropy,i.colorSpace=Lt,i.needsUpdate=!0,i}function OS(i,e,t){const n=[];for(const s of String(e).split(`
`)){const r=s.split(/\s+/).filter(Boolean);if(!r.length){n.push("");continue}let o=r[0];for(let a=1;a<r.length;a++){const c=`${o} ${r[a]}`;i.measureText(c).width>t?(n.push(o),o=r[a]):o=c}n.push(o)}return n}function Xf(i,e,{fill:t="#f3e2c4",ink:n="#2a1c12",width:s,height:r,font:o=72,pad:a=40}={}){const c=s||i.canvas.width,l=r||i.canvas.height;i.setTransform(1,0,0,1,0,0),i.imageSmoothingEnabled=!0,i.imageSmoothingQuality="high",i.fillStyle=t,i.fillRect(0,0,c,l),i.fillStyle=n,i.textAlign="center",i.textBaseline="middle";const h=Math.max(32,c-a*2);let u=o;const d=g=>(i.font=`700 ${g}px Trebuchet MS, Segoe UI, sans-serif`,OS(i,e,h));let p=d(u);for(;u>28;){const g=p.some(m=>i.measureText(m).width>h),_=p.length*u*1.12>l-a;if(!g&&!_)break;u-=4,p=d(u)}p.forEach((g,_)=>{i.fillText(g,c/2,l/2+(_-(p.length-1)/2)*u*1.12)})}function Mr(i,{fill:e="#f3e2c4",ink:t="#2a1c12",size:n,width:s=512,height:r=256,font:o=72,pad:a=40}={}){const c=n||s,l=n||r,h=document.createElement("canvas");return h.width=c,h.height=l,Xf(h.getContext("2d"),i,{fill:e,ink:t,width:c,height:l,font:o,pad:a}),sh(new Cs(h))}function FS(i,e,t={}){var s;const n=i==null?void 0:i.image;return n!=null&&n.getContext?(Xf(n.getContext("2d"),e,{...t,width:n.width,height:n.height}),i.needsUpdate=!0,i):((s=i==null?void 0:i.dispose)==null||s.call(i),Mr(e,t))}const ud=new Map;function BS(i,e){const t=Te.numberSize,n=e||1,s=`${i}:${n}:${t}`,r=ud.get(s);if(r)return r;const o=document.createElement("canvas");o.width=o.height=t;const a=o.getContext("2d"),c=t/512;a.clearRect(0,0,t,t),a.fillStyle="#f4e6c6",a.beginPath(),a.arc(256*c,256*c,236*c,0,Math.PI*2),a.fill(),a.strokeStyle="#5b3418",a.lineWidth=14*c,a.stroke(),a.fillStyle=i===6||i===8?"#b42318":"#2a1c12",a.font=`700 ${Math.round(220*c)}px Trebuchet MS, Segoe UI, sans-serif`,a.textAlign="center",a.textBaseline="middle",a.fillText(String(i),256*c,236*c),a.fillStyle=i===6||i===8?"#b42318":"#4a3724";const l=(n-1)*28*c;for(let u=0;u<n;u++)a.beginPath(),a.arc(256*c-l/2+u*28*c,396*c,10*c,0,Math.PI*2),a.fill();const h=qt(sh(new Cs(o)));return ud.set(s,h),h}const dd=new Map;function kS(i){const e=dd.get(i);if(e)return e;const t=document.createElement("canvas");t.width=t.height=128;const n=t.getContext("2d");n.fillStyle="#f7f0e4",n.fillRect(0,0,128,128),n.strokeStyle="#5b3418",n.lineWidth=6,n.strokeRect(3,3,122,122),n.fillStyle="#2a1c12";const s={1:[[64,64]],2:[[36,36],[92,92]],3:[[36,36],[64,64],[92,92]],4:[[36,36],[92,36],[36,92],[92,92]],5:[[36,36],[92,36],[64,64],[36,92],[92,92]],6:[[36,36],[92,36],[36,64],[92,64],[36,92],[92,92]]};for(const[o,a]of s[i])n.beginPath(),n.arc(o,a,10,0,Math.PI*2),n.fill();const r=qt(sh(new Cs(t)));return dd.set(i,r),r}const fd=11,pd=6;function zS(i){const e=pa(Te.roomWood,Te.roomWood/2,[110,64,32]);e.repeat.set(2,2);const t=pa(Te.floorWood,Te.floorWood,[78,48,28]);t.repeat.set(8,8);const n=Wf([62,52,42]),s=new Ze;s.name="room",i.add(s);const r=new ie(new yn(10,10),new tt({map:t,roughness:.9}));r.rotation.x=-Math.PI/2,r.receiveShadow=!0,s.add(r);const o=3.2,a=7,c=.12,l=3.4,h=new tt({map:n,color:"#6d5a48",roughness:.95,depthWrite:!0,transparent:!1}),u=[[0,o/2,-l,0],[0,o/2,l,Math.PI],[-l,o/2,0,Math.PI/2],[l,o/2,0,-Math.PI/2]];for(const[T,w,L,E]of u){const y=new ie(new At(a,o,c),h);y.position.set(T,w,L),y.rotation.y=E,y.receiveShadow=!0,s.add(y)}const d=new ie(new At(a,c,a),h);d.name="ceiling",d.position.set(0,o+c/2,0),d.receiveShadow=!0,s.add(d);const p=new ie(new At(9.2,o+.5,9.2),new rt({color:"#1b140f",side:dn,depthWrite:!0,transparent:!1,fog:!1}));p.name="sky",p.position.y=o/2+.05,s.add(p);const g=new ie(new Kt(.95,.98,.08,Te.tableSegments),new tt({map:e,color:"#7a4a28",roughness:.65}));g.position.y=Mn-.04,g.castShadow=!0,g.receiveShadow=!0,i.add(g);const _=new ie(new Kt(.18,.2,Mn-.08,12),new tt({map:e,color:"#5a3218",roughness:.8}));_.position.y=(Mn-.08)/2,i.add(_);const m=new ie(new ao(1.35,Te.rugSegments),new tt({color:"#4a1f1a",roughness:1}));m.rotation.x=-Math.PI/2,m.position.y=.01,s.add(m);const f=new Iy("#f4ead8","#4a3424",1.05);s.add(f);const M=new Lf("#ffe6c0",1.7);M.position.set(2.4,4.2,1.6),M.castShadow=Te.shadows,M.shadow.mapSize.set(Te.shadowSize,Te.shadowSize),M.shadow.camera.near=.5,M.shadow.camera.far=12,M.shadow.camera.left=M.shadow.camera.bottom=-3,M.shadow.camera.right=M.shadow.camera.top=3,s.add(M);const b=new Pf("#ffcc88",fd,pd);b.name="boardLamp",b.position.set(0,2.1,0),i.add(b);function x(T=i.scale.x){const w=Math.max(1e-4,T);b.intensity=fd*w*w,b.distance=pd*w}x();const C=new ie(new Kr(.18,.015,6,12),new tt({color:"#c9a44a",metalness:.7,roughness:.3}));return C.rotation.x=Math.PI/2,C.position.y=2.05,s.add(C),{table:g,room:s,sun:M,lamp:b,syncBoardLight:x}}const Xn=.036,md="#efe0bc",HS="#f4d27a",VS="#fff6dc";function Yo(i,e,t=0){const n=Math.sin(i*12.9898+e*78.233+t*3.1)*43758.5453;return n-Math.floor(n)}function GS(i=1){const e=new Ze,t=new ie(new Kt(.005,.007,.018,5),new tt({color:"#5a3418",roughness:.9}));t.position.y=.009;const n=new ie(new _r(.02*i,.038*i,6),new tt({color:"#1f5a2c",roughness:.8}));return n.position.y=.026*i,e.add(t,n),e}function WS(){const i=new Ze,e=new ie(new jt(.016,8,6),new tt({color:"#f2f0e8",roughness:.95}));e.scale.set(1.3,.9,1),e.position.y=.016;const t=new ie(new jt(.008,6,6),new tt({color:"#2a1c12"}));return t.position.set(.018,.018,0),i.add(e,t),i}function XS(){const i=new tt({color:"#3d7a3a",roughness:.7}),e=new Ze,t=new ie(new Kt(.008,.01,.05,6),i);t.position.y=.025;const n=new ie(new Kt(.006,.006,.03,6),i);return n.rotation.z=Math.PI/2,n.position.set(.015,.03,0),e.add(t,n),e}class $S{constructor(e){this.group=new Ze,this.group.position.y=Mn,e.add(this.group),this.hexMeshes=new Map,this.tokenMeshes=new Map,this.vertexMarkers=new Map,this.edgeMarkers=new Map,this.hexMarkers=new Map,this.pieceLayer=new Ze,this.markerLayer=new Ze,this.group.add(this.pieceLayer,this.markerLayer),this.robber=null,this.hoverObj=null,this._flashTimer=0,this.felt=Wf([48,110,255]),this.wood=pa(Te.claySize,Te.claySize),this.clay=pa(Te.claySize,Te.claySize,[176,158,132]),this.seaGeo=qt(new Kt(bi*.98,bi*.98,.02,6)),this.landGeo=qt(new Kt(bi*.96,bi*.96,Xn,6)),this.tokenGeo=qt(new Kt(.038,.038,.004,Te.tokenSegments)),this.hexGlowGeo=qt(new Kt(bi*.9,bi*.9,.004,6)),this.harborDiscGeo=qt(new Kt(.018,.018,.004,Te.harborDiscSegments)),this.harborRingGeo=qt(new Kr(.024,.0036,6,Te.harborRingSegments)),this.harborHaloGeo=qt(new Kr(.03,.0022,6,Te.harborRingSegments)),this.pinGeo=qt(new jt(.018,8,6)),this.pinPickGeo=qt(new jt(.028,8,6)),this.harborTex=new Map}rebuild(e){this.restoreHover(this.hoverObj),this.hoverObj=null,Sl(this.group),this.pieceLayer=new Ze,this.markerLayer=new Ze,this.group.add(this.pieceLayer,this.markerLayer),this.hexMeshes.clear(),this.tokenMeshes.clear(),this.vertexMarkers.clear(),this.edgeMarkers.clear(),this.hexMarkers.clear();const t=new tt({map:this.felt,color:"#6aaee6",roughness:.96,metalness:0,emissive:"#1568d4",emissiveIntensity:.06});for(const s of e.sea){const r=new ie(this.seaGeo,t);r.rotation.y=Math.PI/3,r.position.set(s.x,.01,s.z),r.receiveShadow=!0,this.group.add(r)}for(const s of e.land){const r=Xn,o=new tt({map:this.clay,color:wn[s.resource],roughness:1,metalness:0,envMapIntensity:0}),a=new ie(this.landGeo,o);if(a.rotation.y=Math.PI/3,a.position.set(s.x,r/2,s.z),a.castShadow=!0,a.receiveShadow=!0,a.userData={kind:"hex",id:s.id},this.group.add(a),this.hexMeshes.set(s.id,a),this.decorate(s,r),s.number){const l=new ie(this.tokenGeo,new tt({map:BS(s.number,Ff[s.number]),roughness:.45}));l.position.set(s.x,r+.0022,s.z),l.renderOrder=2,l.userData={kind:"hex",id:s.id},this.group.add(l),this.tokenMeshes.set(s.id,l)}const c=new ie(this.hexGlowGeo,new rt({color:"#ffcc66",transparent:!0,opacity:0}));c.rotation.y=Math.PI/3,c.position.set(s.x,r+.01,s.z),c.userData={kind:"hex",id:s.id},this.markerLayer.add(c),this.hexMarkers.set(s.id,c)}const n=new rt({color:16761856,transparent:!0,opacity:.95,depthTest:!1,depthWrite:!1,toneMapped:!1});for(const s of e.vertices.values()){const r=new Ze,o=new ie(this.pinGeo,n.clone());o.position.y=.018;const a=new ie(this.pinPickGeo,new rt({color:16761856,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1}));a.position.y=.018,r.add(o,a),r.position.set(s.x,Xn,s.z),r.visible=!1,r.frustumCulled=!1,r.userData={kind:"vertex",id:s.id},r.traverse(c=>{c.frustumCulled=!1,c.renderOrder=30,c.userData=r.userData}),a.userData={...r.userData,pickOnly:!0},this.group.add(r),this.vertexMarkers.set(s.id,r)}for(const s of e.edges.values()){const r=e.vertices.get(s.a),o=e.vertices.get(s.b),a=Math.hypot(o.x-r.x,o.z-r.z),c=new ie(new At(.018,.014,Math.max(.036,a*.54)),new rt({color:"#9ee7ff",transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1}));c.position.set((r.x+o.x)/2,Xn+.01,(r.z+o.z)/2),c.rotation.y=Math.atan2(o.x-r.x,o.z-r.z),c.renderOrder=4,c.visible=!1,c.userData={kind:"edge",id:s.id,waterOnly:!s.touchesLand},this.markerLayer.add(c),this.edgeMarkers.set(s.id,c)}for(const s of e.harbors)this.addHarbor(e,s);this.robber=this.makeRobber(),this.group.add(this.robber),this.setRobber(e)}addHarbor(e,t){const n=(t.vertices||[]).map(x=>e.vertices.get(x)).filter(Boolean);if(!n.length){const x=e.edges.get(t.edge);if(x){const C=e.vertices.get(x.a),T=e.vertices.get(x.b);C&&n.push(C),T&&n.push(T)}}if(!n.length)return;const s=n.reduce((x,C)=>x+C.x,0)/n.length,r=n.reduce((x,C)=>x+C.z,0)/n.length,o=Math.hypot(s,r)||1,a=s/o,c=r/o,l=s+a*.1,h=r+c*.1,u=.078,d=new tt({map:this.wood,color:"#8a5a32"}),p=Mc(HS,.98,!0),g=Mc(VS,.9,!0),_=Mc(md,.7,!0),m=new ie(new At(.046,.008,.11),d);m.position.set((l+s)*.5,.021,(h+r)*.5),YS(m,l,.021,h,s,.021,r);const f=new ie(new At(.044,.005,.09),d);f.position.set(l,.028,h),f.lookAt(new P(s,.028,r));const M=new ie(new Kt(.004,.005,.055,8),d);M.position.set(l,.05,h);const b=new ie(new yn(.072,.072),new rt({map:this.harborLabel(t),depthWrite:!1,side:Jt}));b.position.set(l,u,h),b.lookAt(new P(s,.38,r)),b.renderOrder=8,this.group.add(m,f,M,b);for(const x of n){const C=a*.012,T=c*.012,w=Xn+.0016,L=new ie(this.harborDiscGeo,p);L.position.set(x.x+C,w,x.z+T),L.renderOrder=1;const E=new ie(this.harborRingGeo,g);E.rotation.x=Math.PI/2,E.position.set(x.x+C,w+6e-4,x.z+T),E.renderOrder=1;const y=new ie(this.harborHaloGeo,_);y.rotation.x=Math.PI/2,y.position.set(x.x+C,w+.001,x.z+T),y.renderOrder=1,this.group.add(L,E,y)}}harborLabel(e){const t=st[e.type]||e.type,n=e.type==="generic"?"3:1":`2:1
${t}`;let s=this.harborTex.get(n);return s||(s=qt(Mr(n,{width:Te.harborLabel,height:Te.harborLabel,font:110,fill:md})),this.harborTex.set(n,s),s)}decorate(e,t){const n=t,s=(r,o,a=.082,c=.104)=>{const l=r/o*Math.PI*2+Yo(e.q,e.r,r+11)*.28,h=a+Yo(e.q,e.r,r+4)*(c-a);return{x:e.x+Math.cos(l)*h,z:e.z+Math.sin(l)*h}};if(e.resource==="wood")for(let r=0;r<5;r++){const o=GS(.7+Yo(e.q,e.r,r)*.25),a=s(r,5,.084,.105);o.position.set(a.x,n,a.z),o.traverse(c=>{c.isMesh&&(c.castShadow=!0)}),this.group.add(o)}else if(e.resource==="sheep")for(let r=0;r<3;r++){const o=WS(),a=s(r,3,.082,.1);o.position.set(a.x,n,a.z),o.rotation.y=Yo(e.q,e.r,r+2)*Math.PI*2,this.group.add(o)}else if(e.resource==="wheat"){const r=new tt({color:"#c9a227",roughness:.8});for(let o=0;o<6;o++){const a=o<3?-1:1,c=o%3,l=new ie(new At(.028,.016,.008),r);l.position.set(e.x+a*.08,n+.008,e.z+(c-1)*.022),l.rotation.y=.15*a,this.group.add(l)}}else if(e.resource==="ore"){const r=new tt({color:"#8b909a",roughness:.7});for(let o=0;o<3;o++){const a=new ie(new _r(.02+o*.004,.028+o*.008,5),r),c=s(o,3,.084,.1);a.position.set(c.x,n+.012,c.z),a.castShadow=!0,this.group.add(a)}}else if(e.resource==="brick"){const r=new tt({color:"#9a4a2c",roughness:.9});for(let o=0;o<4;o++){const a=new ie(new At(.032,.012,.02),r),c=s(o,4,.082,.1);a.position.set(c.x,n+.008,c.z),a.rotation.y=o*.4,this.group.add(a)}}else if(e.resource==="desert"){const r=XS(),o=s(0,1,.08,.09);r.position.set(o.x,n,o.z),this.group.add(r)}}makeRobber(){const e=new Ze,t=new tt({color:"#1a1a1e",roughness:.45,metalness:.2}),n=new ie(new Kt(.016,.022,.05,8),t);n.position.y=.03;const s=new ie(new jt(.016,10,8),t);s.position.y=.062;const r=new ie(new Kt(.024,.024,.004,10),t);return r.position.y=.07,e.add(n,s,r),e.traverse(o=>{o.isMesh&&(o.castShadow=!0)}),e}setRobber(e){const t=e.hexes.get(e.robberHex),n=this.hexMeshes.get(t.id),s=n?n.position.y*2:.04;this.robber.position.set(t.x-.04,s,t.z+.02)}syncPieces(e){Sl(this.pieceLayer);for(const t of e.board.edges.values()){if(!t.road&&t.road!==0||t.road==null)continue;const n=e.players[t.road],s=e.board.vertices.get(t.a),r=e.board.vertices.get(t.b),o=Math.hypot(r.x-s.x,r.z-s.z),a=new ie(new At(.016,.012,o*.78),new tt({color:n.color,roughness:.5}));a.position.set((s.x+r.x)/2,Xn+.007,(s.z+r.z)/2),a.rotation.y=Math.atan2(r.x-s.x,r.z-s.z),a.castShadow=!0,this.pieceLayer.add(a)}for(const t of e.board.vertices.values()){if(!t.building)continue;const n=e.players[t.building.player];this.pieceLayer.add(t.building.type==="city"?qS(t,n.color):jS(t,n.color))}this.setRobber(e.board)}showVertices(e){this.restoreHover(this.hoverObj);const t=new Set(e);for(const[n,s]of this.vertexMarkers)s.visible=t.has(n),s.scale.setScalar(1);this.repaintHover()}pulseMarkers(e){const t=1+Math.sin(e*5)*.12;for(const n of this.vertexMarkers.values())n.visible&&n.scale.setScalar(n===this.hoverObj?t*1.2:t)}showEdges(e){this.restoreHover(this.hoverObj);const t=new Set(e),n=e.length>0;for(const[s,r]of this.edgeMarkers){const o=t.has(s);r.material.opacity=o?.8:0,r.visible=o||n&&r.userData.waterOnly}this.repaintHover()}showHexes(e){this.restoreHover(this.hoverObj);for(const[t,n]of this.hexMarkers)n.material.opacity=e.includes(t)?.45:0,n.visible=e.includes(t);this.repaintHover()}clearHighlights(){this.showVertices([]),this.showEdges([]),this.showHexes([])}setHover(e){const t=this.hoverTarget(e);t!==this.hoverObj&&(this.restoreHover(this.hoverObj),this.hoverObj=t,this.paintHover(t,!1))}flashPick(e){const t=this.hoverTarget(e)||this.hoverObj;t&&(t!==this.hoverObj&&(this.restoreHover(this.hoverObj),this.hoverObj=t),this.paintHover(t,!0),clearTimeout(this._flashTimer),this._flashTimer=setTimeout(()=>{this.hoverObj===t&&(this.restoreHover(t),this.paintHover(t,!1))},120))}hoverTarget(e){if(!e)return null;const{kind:t,id:n}=e.userData||{};if(t==="vertex"){const s=this.vertexMarkers.get(n);return s!=null&&s.visible?s:null}if(t==="edge"){const s=this.edgeMarkers.get(n);return s!=null&&s.visible&&s.material.opacity>0?s:null}if(t==="hex"){const s=this.hexMarkers.get(n);return s!=null&&s.visible&&s.material.opacity>0?s:null}return null}markerMats(e){const t=[];return e.traverse(n=>{var s;(s=n.userData)!=null&&s.pickOnly||n.material&&!t.includes(n.material)&&t.push(n.material)}),t}restoreHover(e){if(!e)return;const t=e.userData._hoverRest;if(t){for(const n of t)n.mat.color.setHex(n.color),n.mat.opacity=n.opacity;e.userData._hoverRest=null}}paintHover(e,t){if(!e)return;const n=this.markerMats(e);e.userData._hoverRest||(e.userData._hoverRest=n.map(r=>({mat:r,color:r.color.getHex(),opacity:r.opacity})));const s=e.userData.kind;for(const r of n)t?(r.color.set("#ffffff"),r.opacity=1):s==="vertex"?(r.color.set("#fff6c8"),r.opacity=1):s==="edge"?(r.color.set("#f4ffff"),r.opacity=1):(r.color.set("#ffe9a0"),r.opacity=.88)}repaintHover(){const e=this.hoverObj;if(e){if(!this.hoverTarget(e)){this.hoverObj=null;return}this.paintHover(e,!1)}}}function Mc(i,e=1,t=!1){return new rt({color:i,transparent:e<1,opacity:e,depthTest:t,depthWrite:!1,toneMapped:!1})}function YS(i,e,t,n,s,r,o){const a=s-e,c=r-t,l=o-n,h=Math.hypot(a,c,l)||1;i.quaternion.setFromUnitVectors(new P(0,0,1),new P(a/h,c/h,l/h))}function jS(i,e){const t=new Ze,n=new tt({color:e,roughness:.45}),s=new ie(new At(.032,.024,.028),n);s.position.y=Xn+.012;const r=new ie(new _r(.026,.022,4),new tt({color:"#3b2414",roughness:.7}));return r.position.y=Xn+.034,r.rotation.y=Math.PI/4,t.add(s,r),t.position.set(i.x,0,i.z),t.traverse(o=>{o.isMesh&&(o.castShadow=!0,o.renderOrder=3)}),t}function qS(i,e){const t=new Ze,n=new tt({color:e,roughness:.4}),s=new ie(new At(.04,.04,.036),n);s.position.y=Xn+.02;const r=new ie(new At(.018,.055,.018),n);r.position.set(.016,Xn+.03,.01);const o=new ie(new _r(.016,.02,4),new tt({color:"#3b2414"}));return o.position.set(.016,Xn+.068,.01),t.add(s,r,o),t.position.set(i.x,0,i.z),t.traverse(a=>{a.isMesh&&(a.castShadow=!0,a.renderOrder=3)}),t}const gd=new P;class KS{constructor(e,t){this.rig=t,this.group=new Ze,e.add(this.group),this.left=_d("#4db3ff","GRAB"),this.right=_d("#f0c14b","GRAB"),this.stuck=new Map,this.linkGeo=new Qt().setFromPoints([new P,new P(0,0,1)]),this.link=new oo(this.linkGeo,new Sa({color:16770736,transparent:!0,opacity:.7})),this.link.visible=!1,this.group.add(this.left,this.right,this.link),this.group.visible=!1,this._pulse=0}get move(){return this.left}get scale(){return this.right}pickables(){return this.group.visible?[this.left,this.right]:[]}setVisible(e){this.group.visible=e,e||this.stuck.clear()}stick(e,t){this.stuck.set(e,t)}unstick(e){this.stuck.delete(e)}isStuck(e){return this.stuck.has(e)}setHover(e){var n;const t=(n=e==null?void 0:e.userData)==null?void 0:n.handleRoot;for(const s of[this.left,this.right]){const r=t===s||this.stuck.has(s);s.userData.halo.material.opacity=r?.5:.2,s.userData.ball.material.color.set(r?"#ffffff":s.userData.baseColor)}}update(e,t,n){if(!this.group.visible)return;this._pulse+=e;const s=.72+Math.sin(this._pulse*2.4)*.1;this.left.userData.ball.material.opacity=s,this.right.userData.ball.material.opacity=s,this.rig.updateMatrixWorld();for(const[r,o]of[[this.left,[-.18,Mn-.05,1.08]],[this.right,[.18,Mn-.05,1.08]]]){const a=this.stuck.get(r);a&&n?n(a,r.position):a?a.getWorldPosition(r.position):ZS(r,this.rig,o[0],o[1],o[2]),r.userData.tag.lookAt(t.position)}if(this.stuck.size===2){const r=this.linkGeo.attributes.position;r.setXYZ(0,this.left.position.x,this.left.position.y,this.left.position.z),r.setXYZ(1,this.right.position.x,this.right.position.y,this.right.position.z),r.needsUpdate=!0,this.link.visible=!0}else this.link.visible=!1}}function ZS(i,e,t,n,s){gd.set(t,n,s).applyMatrix4(e.matrixWorld),i.position.copy(gd)}function _d(i,e){const t=new Ze,n=new ie(new jt(.03,12,10),new rt({color:i,transparent:!0,opacity:.88})),s=new ie(new jt(.046,10,8),new rt({color:i,transparent:!0,opacity:.22,depthWrite:!1})),r=new ie(new yn(.11,.04),new rt({map:Mr(e,{width:Te.handleLabelW,height:Te.handleLabelH,font:120,fill:"#1a120c",ink:"#f7efe0"}),transparent:!0}));r.position.y=.058;const o=new ie(new jt(.09,8,6),new rt({transparent:!0,opacity:0,depthWrite:!1}));t.add(n,s,r,o);const a={kind:"handle",handleRoot:t,ball:n,halo:s,tag:r,baseColor:i};return t.userData=a,t.traverse(c=>{c.isMesh&&(c.userData=a)}),t}const Sc=.82;class JS{constructor(e){this.group=new Ze,this.group.position.set(0,Mn+.045,Sc),e.add(this.group),this.dice=[xd(),xd()],this.dice[0].position.x=-.04,this.dice[1].position.x=.04,this.group.add(...this.dice),this.t=0,this.rolling=!1,this.target=[1,1],this.hovered=!1}pickables(){return this.dice}setHover(e){var n;const t=((n=e==null?void 0:e.userData)==null?void 0:n.kind)==="dice";if(t!==this.hovered){this.hovered=t;for(const s of this.dice){s.scale.setScalar(t?1.18:1);const r=Array.isArray(s.material)?s.material:[s.material];for(const o of r)o!=null&&o.emissive&&(o.emissive.set(t?"#ffe08a":"#000000"),o.emissiveIntensity=t?.45:0)}}}placeFor(e,t){if(e===0){this.group.position.set(0,Mn+.045,Sc),this.group.rotation.y=0;return}const n=e/Math.max(1,t)*Math.PI*2,s=Sc;this.group.position.set(Math.sin(n)*s,Mn+.045,Math.cos(n)*s),this.group.rotation.y=n}rollTo(e){this.target=e,this.rolling=!0,this.t=0}update(e){if(!this.rolling)return;this.t+=e;const t=18;for(const n of this.dice)n.rotation.x+=e*t,n.rotation.y+=e*t*.7;this.t>.7&&(this.rolling=!1,this.dice[0].rotation.set(...vd(this.target[0])),this.dice[1].rotation.set(...vd(this.target[1])))}}function xd(){const i=[1,6,2,5,3,4].map(t=>new tt({map:kS(t),roughness:.4})),e=new ie(new At(.038,.038,.038),i);return e.castShadow=!0,e.userData={kind:"dice",action:"roll"},e}function vd(i){switch(i){case 1:return[0,0,0];case 6:return[Math.PI,0,0];case 2:return[0,0,Math.PI/2];case 5:return[0,0,-Math.PI/2];case 3:return[0,-Math.PI/2,0];case 4:return[0,Math.PI/2,0];default:return[0,0,0]}}const jo=.82,qo=.5,$s=1024,Fr=624;class QS{constructor(e){this.group=new Ze,this.group.position.set(0,Mn+.78,-.95),this.group.rotation.x=-.12,e.add(this.group),this.canvas=document.createElement("canvas"),this.texScale=Te.trayScale,this.canvas.width=Math.round($s*this.texScale),this.canvas.height=Math.round(Fr*this.texScale),this.ctx=this.canvas.getContext("2d"),this.tex=new Cs(this.canvas),this.tex.colorSpace=Lt,this.tex.minFilter=zt,this.tex.magFilter=zt,this.tex.generateMipmaps=!1;const t=new ie(new yn(jo+.028,qo+.028),new rt({color:13214794,toneMapped:!1}));t.position.z=-.003,this.panel=new ie(new yn(jo,qo),new rt({map:this.tex,toneMapped:!1})),this.hits=new Ze,this.hitMat=new rt({transparent:!0,opacity:0,depthWrite:!1,side:Jt}),this.group.add(t,this.panel,this.hits),this.buttons=[],this.buttonDefs=[],this.screen="actions",this.hand=Object.fromEntries(Xe.map(n=>[n,0])),this.status="",this.headline="",this.headlineColor="",this.scoreRows=[],this._scoreKey="",this.hoverAction=null,this.pressAction=null,this._pressTimer=0,this.draw()}pxToLocal(e,t,n,s){const r=((e+n/2)/$s-.5)*jo,o=(.5-(t+s/2)/Fr)*qo;return{x:r,y:o,w:n/$s*jo,h:s/Fr*qo}}buttonLayout(e){const n=$s-72,s=16;if(this.screen==="settings"||this.screen==="pointerTilt"||this.screen==="restartConfirm"||this.screen==="steal"||this.screen==="win"||this.screen==="cards"||this.screen==="title"||this.screen==="scores"){const m=Math.max(e.length,1),f=this.screen==="settings"||this.screen==="pointerTilt",M=this.screen==="win",b=this.screen==="scores",x=f?84:M?268:b?488:160,C=Fr-24,T=this.screen==="steal"?18:M?20:f?10:14,w=this.screen==="steal"?110:M?124:f?82:104,L=Math.min(w,Math.max(52,Math.floor((C-x-(m-1)*T)/m))),E=e.map((y,D)=>({def:y,px:36,py:x+D*(L+T),pw:n,ph:L}));return this.withScoreStrip(E)}if(this.screen==="trade"||this.screen==="discard"||this.screen==="plenty"||this.screen==="monopoly"){const m=e.filter(T=>String(T.action).startsWith("give:")),f=e.filter(T=>String(T.action).startsWith("get:")),M=e.filter(T=>/^(discard|plenty|mono):/.test(String(T.action))),b=e.filter(T=>{const w=String(T.action);return!w.startsWith("give:")&&!w.startsWith("get:")&&!/^(discard|plenty|mono):/.test(w)}),x=[],C=(T,w,L)=>{if(!T.length)return;const E=T.length,y=(n-s*(E-1))/E;T.forEach((D,V)=>{x.push({def:D,px:36+V*(y+s),py:w,pw:y,ph:L})})};if(this.screen==="trade")C(m,262,68),C(f,360,68),C(b,450,84);else{const T=this.screen==="discard"?90:110;C(M,248,T),C(b,248+T+20,88)}return this.withScoreStrip(x)}const o=e.filter(m=>m.action!=="end"&&m.action!=="settings"&&m.action!=="scores"),a=e.find(m=>m.action==="end"),c=e.find(m=>m.action==="settings"),l=e.find(m=>m.action==="scores"),h=3,u=(n-s*(h-1))/h,d=96,p=248,g=[];o.forEach((m,f)=>{const M=f%h,b=Math.floor(f/h);g.push({def:m,px:36+M*(u+s),py:p+b*(d+s),pw:u,ph:d})});const _=p+2*(d+s)+8;if(a&&c&&l){const f=n-s*2-352;g.push({def:a,px:36,py:_,pw:f,ph:92}),g.push({def:l,px:36+f+s,py:_,pw:176,ph:92}),g.push({def:c,px:36+f+s+176+s,py:_,pw:176,ph:92})}else a&&c?(g.push({def:a,px:36,py:_,pw:n-s-280,ph:92}),g.push({def:c,px:36+n-280,py:_,pw:280,ph:92})):a?g.push({def:a,px:36,py:_,pw:n,ph:92}):c&&g.push({def:c,px:36,py:_,pw:n,ph:92});return this.withScoreStrip(g)}scoreStripSlot(){var e;return!((e=this.scoreRows)!=null&&e.length)||this.screen==="scores"||this.screen==="win"||this.screen==="title"||this.screen==="settings"||this.screen==="pointerTilt"||this.screen==="restartConfirm"?null:{def:{label:"Scores",action:"scores",strip:!0},px:300,py:8,pw:$s-336,ph:56}}withScoreStrip(e){const t=this.scoreStripSlot();return t&&e.push(t),e}setButtons(e,t="actions"){this.screen=t,this.buttonDefs=e;const n=this.buttonLayout(e);for(;this.hits.children.length>n.length;){const s=this.hits.children[this.hits.children.length-1];s.geometry.dispose(),this.hits.remove(s)}this.buttons=[];for(let s=0;s<n.length;s++){const r=n[s],o=this.pxToLocal(r.px,r.py,r.pw,r.ph);let a=this.hits.children[s];if(!a)a=new ie(new yn(o.w,o.h),this.hitMat),this.hits.add(a);else{const c=a.geometry;Math.abs(c.parameters.width-o.w)<1e-6&&Math.abs(c.parameters.height-o.h)<1e-6||(c.dispose(),a.geometry=new yn(o.w,o.h))}a.position.set(o.x,o.y,.004),a.userData={kind:"tray",action:r.def.action,disabled:!!r.def.disabled},this.buttons.push({mesh:a,def:r.def})}this.draw()}setHover(e){var n;const t=((n=e==null?void 0:e.userData)==null?void 0:n.kind)==="tray"?e.userData.action:null;t!==this.hoverAction&&(this.hoverAction=t,this.draw())}setPressed(e){const t=e||null;t!==this.pressAction&&(this.pressAction=t,this.draw())}flashPress(e){e&&(clearTimeout(this._pressTimer),this.pressAction=e,this.draw(),this._pressTimer=setTimeout(()=>{this.pressAction===e&&(this.pressAction=null,this.draw())},140))}setVisible(e){this.group.visible=!!e,e||(this.hoverAction=null,this.pressAction=null)}pickables(){return this.group.visible?this.buttons.map(e=>e.mesh):[]}buttonWorldPos(e,t){const n=this.buttons.find(r=>r.def.action===e);return((n==null?void 0:n.mesh)||this.panel).getWorldPosition(t)}stealFloatWorldPos(e){return this.group.updateMatrixWorld(!0),e.set(0,-.47,.02),this.group.localToWorld(e)}setStatus(e){const t=String(e||"");t!==this.status&&(this.status=t,this.draw())}setHeadline(e,t){const n=String(e||""),s=String(t||"");n===this.headline&&s===this.headlineColor||(this.headline=n,this.headlineColor=s,this.draw())}setResources(e){this.hand={...e},this.draw()}setScores(e){const t=Array.isArray(e)?e:[],n=JSON.stringify(t);n!==this._scoreKey&&(this._scoreKey=n,this.scoreRows=t,this.draw())}draw(){const e=this.ctx,t=$s,n=Fr;e.setTransform(this.texScale,0,0,this.texScale,0,0),e.clearRect(0,0,t,n),_s(e,0,0,t,n,36,"#1a120c"),e.fillStyle="#f3e2c4",e.font="700 28px Trebuchet MS, Segoe UI, sans-serif",e.textAlign="left",e.textBaseline="middle";const s={settings:"Settings",pointerTilt:"Pointer tilt",restartConfirm:"Restart game?",steal:"Steal a card",trade:"Bank trade",discard:"Discard",plenty:"Year of Plenty",monopoly:"Monopoly",cards:"Dev cards",win:"Game over",title:"Settlers of Catan",scores:"Scores"};e.fillText(s[this.screen]||"Actions",36,40);const r=this.screen==="settings"||this.screen==="pointerTilt"||this.screen==="win"||this.screen==="title"||this.screen==="scores",o=r||this.screen==="steal"||this.screen==="cards"||this.screen==="restartConfirm"||this.screen==="title";if(this.screen==="win"){const a=this.headline||"Wins!";e.textAlign="center",e.textBaseline="middle",e.fillStyle=this.headlineColor||"#f3e2c4";let c=78;for(;c>28&&(e.font=`800 ${c}px Trebuchet MS, Segoe UI, sans-serif`,!(e.measureText(a).width<=t-72));)c-=2;e.strokeStyle="#0c0806",e.lineWidth=Math.max(8,Math.round(c*.12)),e.strokeText(a,t/2,168),e.fillText(a,t/2,168)}if(this.screen==="scores"?this.drawScoreBreakdown(e,t):this.drawScoreStrip(e),!r){const a=String(this.status||"Sit down to begin").split(`
`).map(c=>c.trim()).filter(Boolean);if(_s(e,36,64,t-72,72,16,"#2a1c12"),e.fillStyle="#ffe08a",e.textAlign="center",a.length>=2?(Ss(e,a[0],t/2,86,t-120,28),Ss(e,a.slice(1).join(" · "),t/2,114,t-120,24)):(e.font="700 32px Trebuchet MS, Segoe UI, sans-serif",Ss(e,a[0],t/2,100,t-120,32)),!o){const l=t-72,h=14,u=(l-h*4)/5;e.textAlign="center",Xe.forEach((d,p)=>{const g=36+p*(u+h),_=d==="wood"||d==="brick"||d==="ore";_s(e,g,152,u,80,14,wn[d]),e.fillStyle=_?"#f7efe0":"#1a120c",e.font="700 34px Trebuchet MS, Segoe UI, sans-serif",e.fillText(String(this.hand[d]??0),g+u/2,178),e.font="700 20px Trebuchet MS, Segoe UI, sans-serif",e.fillText(st[d],g+u/2,210)})}}this.screen==="trade"&&(e.fillStyle="#ffe08a",e.textAlign="left",e.textBaseline="middle",e.font="700 18px Trebuchet MS, Segoe UI, sans-serif",e.fillText("Give to bank",36,250),e.fillText("Get from bank",36,348)),e.textAlign="center",e.textBaseline="middle";for(const a of this.buttonLayout(this.buttonDefs)){if(a.def.strip)continue;const c=this.hoverAction===a.def.action,l=this.pressAction===a.def.action&&!a.def.disabled,h=c&&!l,u=String(a.def.action),d=u==="end",p=u==="settings"||u==="pointerTilt"||u==="scores",g=u==="settingsBack"||u==="pointerTiltBack"||u==="restartBack"||u==="cardsBack"||u==="tradeCancel"||u==="mainMenu"||u==="scoresBack",_=u==="restart"||u==="restartAsk"||u==="titleStart",m=u==="passthrough"||u==="handles"||u==="pointer"||u==="pointerLines",f=u.startsWith("steal:"),M=a.def.color&&(f||/^(give|get|discard|plenty|mono):/.test(u)),b=!!a.def.selected,x=u==="tradeGo"||u==="discardGo"||_;let C="#f3e2c4",T="#2a1c12";a.def.disabled?(C=h?"#6e665c":"#5c5348",T="#d0c4b2"):M?(C=l?"#2a1c12":h||b?"#fff8dc":a.def.color,T=l?"#f7efe0":h||b?"#1a120c":yd(a.def.color)):d||x||m&&a.def.on?(C=l?"#1f6a2c":h?"#4ec45f":"#2f8a3c",T="#f7fff4"):m?(C=l?"#3f382f":h?"#7a6c5a":"#5c5348",T="#f3e2c4"):p?C=l?"#a68630":h?"#e8c86a":"#c9a44a":C=l?"#c4ad82":h?"#fff8dc":"#f3e2c4",_s(e,a.px,a.py,a.pw,a.ph,18,C),l?(e.strokeStyle="#3a1f0c",e.lineWidth=6,e.stroke()):(h||f||b)&&(e.strokeStyle=a.def.disabled?"#a09070":"#ffe08a",e.lineWidth=a.def.disabled?4:f&&!h&&!b?6:8,e.stroke()),e.fillStyle=T;const w=d||g||_||m||f||x||this.screen==="cards"||this.screen==="win"||this.screen==="pointerTilt"||this.screen==="restartConfirm"||this.screen==="title";nb(e,a,w)}this.tex.needsUpdate=!0}drawScoreStrip(e){const t=this.scoreStripSlot(),n=this.scoreRows;if(!t||!n.length)return;const s=n.length,r=8,o=(t.pw-r*(s-1))/s;n.forEach((a,c)=>{const l=t.px+c*(o+r),h=this.hoverAction==="scores"&&this.pressAction!=="scores";_s(e,l,t.py,o,t.ph,12,a.color),h&&(e.strokeStyle="#ffe08a",e.lineWidth=4,e.stroke()),e.fillStyle=yd(a.color);const u=`${a.longestRoad?" R":""}${a.largestArmy?" A":""}`,d=a.isYou&&a.hiddenVP?`+${a.hiddenVP}`:"";Ss(e,`${a.name} ${a.publicVP}${d}${u}`,l+o/2,t.py+t.ph/2,o-8,22)})}drawScoreBreakdown(e,t){const n=this.scoreRows;if(!n.length)return;const s=72,o=Math.min(98,Math.floor((472-s)/n.length));n.forEach((a,c)=>{const l=s+c*o,h=o-8;_s(e,36,l,t-72,h,14,"#2a1c12"),e.fillStyle=a.color,_s(e,48,l+12,18,18,6,a.color),e.fillStyle="#f3e2c4",e.textAlign="left",e.textBaseline="middle";const u=`${a.longestRoad?"  R":""}${a.largestArmy?"  A":""}`;e.font="800 26px Trebuchet MS, Segoe UI, sans-serif",e.fillText(`${a.name}${a.isYou?" · You":""}  ${a.shownVP} VP${u}`,78,l+24),e.fillStyle="#ffe08a",Ss(e,eb(a),t/2,l+h*.68,t-120,22)})}}function _s(i,e,t,n,s,r,o){const a=Math.min(r,n/2,s/2);i.beginPath(),i.moveTo(e+a,t),i.arcTo(e+n,t,e+n,t+s,a),i.arcTo(e+n,t+s,e,t+s,a),i.arcTo(e,t+s,e,t,a),i.arcTo(e,t,e+n,t,a),i.closePath(),i.fillStyle=o,i.fill()}function eb(i){const e=i.settlements,t=i.cities,n=[`${e} settlement${e===1?"":"s"}`,`${t} cit${t===1?"y":"ies"}`];return i.longestRoad&&n.push("Longest Road +2"),i.largestArmy&&n.push("Largest Army +2"),i.isYou&&i.hiddenVP&&n.push(`You: ${i.hiddenVP} VP card${i.hiddenVP>1?"s":""}`),n.join(" · ")}function yd(i){const e=String(i||"").replace("#","");if(e.length<6)return"#f7efe0";const t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),s=parseInt(e.slice(4,6),16);return(t*299+n*587+s*114)/1e3>160?"#1a120c":"#f7efe0"}function Ss(i,e,t,n,s,r){let o=r;for(i.textAlign="center",i.textBaseline="middle";o>14&&(i.font=`700 ${o}px Trebuchet MS, Segoe UI, sans-serif`,!(i.measureText(e).width<=s));)o-=2;i.fillText(e,t,n)}function tb(i,e,t,n,s=13){let r=n;for(;r>=s;){i.font=`700 ${r}px Trebuchet MS, Segoe UI, sans-serif`;let o=!0;const a=[];let c="";for(const l of e){if(i.measureText(l).width>t){o=!1;break}const h=c?`${c} · ${l}`:l;i.measureText(h).width<=t?c=h:(c&&a.push(c),c=l)}if(o)return c&&a.push(c),{lines:a,size:r};r-=1}return i.font=`700 ${s}px Trebuchet MS, Segoe UI, sans-serif`,{lines:[e.join(" · ")],size:s}}function nb(i,e,t){const n=String(e.def.label||""),s=String(e.def.detail||"").trim(),r=e.px+e.pw/2,o=e.py+e.ph/2,a=e.pw-28;if(i.textAlign="center",i.textBaseline="middle",!s){Ss(i,n,r,o,a,t?40:30);return}const c=s.split(" · ").map(g=>g.trim()).filter(Boolean),l=tb(i,c,a,Math.min(18,Math.max(14,Math.floor(e.ph*.2)))),h=Math.min(t?32:26,Math.max(18,Math.floor(e.ph*.3))),u=4,d=h+u+l.lines.length*(l.size+2);let p=o-d/2+h/2;Ss(i,n,r,p,a,h),p+=h/2+u+l.size/2,i.font=`700 ${l.size}px Trebuchet MS, Segoe UI, sans-serif`;for(const g of l.lines)i.fillText(g,r,p),p+=l.size+2}class ib{constructor(e){this.opts={width:Te.helpW,height:Te.helpH,font:Te.headset?48:72,pad:Te.headset?16:28,fill:"#1a120c",ink:"#ffe08a"},this.tex=Mr(" ",this.opts),this._text="",this.mesh=new ie(new yn(.3,.065),new rt({map:this.tex,depthTest:!1,depthWrite:!1,transparent:!0,toneMapped:!1})),this.mesh.position.set(0,-.22,-.52),this.mesh.renderOrder=20,this.mesh.frustumCulled=!1,this.mesh.visible=!1,e.add(this.mesh)}attach(e){!e||this.mesh.parent===e||e.add(this.mesh)}set(e){const t=String(e||"").trim();this.mesh.visible=!!t,!(!t||t===this._text)&&(this._text=t,this.tex=FS(this.tex,t,this.opts),this.mesh.material.map=this.tex,this.mesh.material.needsUpdate=!0)}}const sb=1.22;function $f(i,e,t=sb){const n=i/Math.max(1,e)*Math.PI*2;return{x:Math.sin(n)*t,z:Math.cos(n)*t,yaw:n}}const rb=-2.85,ob=Math.PI*2*.9;class ab{constructor(e){this.group=new Ze,e.add(this.group),this.figures=[],this.t=0,this.currentId=null,this.stealIds=null,this.hoverId=null,this.celebratingId=null}rebuild(e){Sl(this.group),this.figures=[],this.celebratingId=null;const t=e.length;e.forEach((n,s)=>{if(!n.isAI)return;const r=$f(s,t),o=cb(n);o.position.set(r.x,0,r.z),o.rotation.y=r.yaw,this.group.add(o),this.figures.push({id:n.id,group:o,body:o.userData.body,leftArm:o.userData.leftArm,rightArm:o.userData.rightArm,glow:o.userData.glow,hit:o.userData.hit})}),this.applyHighlights()}setCelebrating(e){e!==this.celebratingId&&(this.celebratingId=e??null,this.celebratingId==null&&this.resetDancePose())}resetDancePose(){for(const e of this.figures)e.body&&(e.body.rotation.y=0),El(e.leftArm),El(e.rightArm)}setCurrent(e){this.currentId=e,this.stealIds||this.applyHighlights()}setStealTargets(e){this.stealIds=e!=null&&e.length?[...e]:null,this.applyHighlights()}setHover(e){var n;const t=((n=e==null?void 0:e.userData)==null?void 0:n.kind)==="avatar"?e.userData.id:null;t!==this.hoverId&&(this.hoverId=t,this.applyHighlights())}pickables(){if(!this.stealIds)return[];const e=new Set(this.stealIds);return this.figures.filter(t=>e.has(t.id)).map(t=>t.hit||t.group)}applyHighlights(){const e=this.stealIds?new Set(this.stealIds):null;for(const t of this.figures){const n=e?e.has(t.id):t.id===this.currentId;t.glow.visible=n,t.group.userData.active=n;const s=e&&this.hoverId===t.id&&n;t.glow.scale.setScalar(s?1.55:e&&n?1.28:1)}}update(e,t){this.t+=e;const n=!!this.stealIds;for(const s of this.figures){if(this.celebratingId!=null&&s.id===this.celebratingId)s.group.position.y=Math.abs(Math.sin(this.t*7))*.035,s.body&&(s.body.rotation.y+=e*ob),Md(s.leftArm,this.t,-1),Md(s.rightArm,this.t,1);else{const o=Math.sin(this.t*1.6+s.id)*.008;s.group.position.y=o}if(s.group.userData.active){const o=n?.55+Math.sin(this.t*5.5)*.28:.35+Math.sin(this.t*4)*.12;s.glow.material.opacity=this.hoverId===s.id?Math.min(1,o+.25):o}t&&s.group.userData.tag.lookAt(t.position)}}}function El(i){i&&(i.rotation.x=i.userData.restX,i.rotation.z=i.userData.restZ)}function Md(i,e,t){i&&(i.rotation.x=rb+Math.sin(e*9+t)*.12,i.rotation.z=t*(.55+Math.sin(e*6)*.08))}function cb(i){const e=new Ze,t=new tt({color:i.color,roughness:.7}),n=new tt({color:"#e0b089",roughness:.65}),s=new tt({color:"#3b2418",roughness:.85}),r=new tt({color:"#6a4024",roughness:.8}),o=new ie(new At(.24,.05,.24),r);o.position.y=.4;const a=new ie(new At(.24,.34,.05),r);a.position.set(0,.58,.11);const c=(T,w)=>{const L=new ie(new At(.04,.4,.04),r);return L.position.set(T,.2,w),L},l=new Ze,h=new ie(new At(.18,.1,.16),t);h.position.y=.48;const u=new ie(new At(.17,.26,.12),t);u.position.set(0,.68,-.01);const d=new ie(new jt(.072,10,8),n);d.position.set(0,.9,0);const p=T=>{const w=new ie(new jt(.012,8,6),s);return w.position.set(T*.025,.91,-.058),w},g=new ie(new jt(.076,8,6),new tt({color:lb(i.color),roughness:.9}));g.scale.set(1,.55,1),g.position.set(0,.94,0);const _=T=>{const w=new Ze;w.position.set(T*.115,.78,-.01);const L=new ie(new At(.05,.16,.05),t);L.position.set(0,-.08,0);const E=new ie(new jt(.028,8,6),n);return E.position.set(0,-.18,-.02),w.add(L,E),w.userData.restX=.22,w.userData.restZ=T*.35,El(w),w},m=_(-1),f=_(1),M=new ie(new co(.16,.22,16),new rt({color:i.color,transparent:!0,opacity:.4,side:Jt}));M.rotation.x=-Math.PI/2,M.position.y=.02,M.visible=!1;const b=new ie(new yn(.22,.06),new rt({map:Mr(i.name,{width:Te.avatarLabelW,height:Te.avatarLabelH,font:110,fill:"#1a120c",ink:"#f7efe0"}),transparent:!0}));b.position.set(0,1.08,0);const x=new ie(new Kt(.18,.18,1.12,8),new rt({transparent:!0,opacity:0,depthWrite:!1}));x.position.y=.56,e.add(o,a,c(-.08,.08),c(.08,.08),c(-.08,-.08),c(.08,-.08)),l.add(h,u,d,g,p(-1),p(1),m,f),e.add(l,M,b,x);const C={glow:M,tag:b,hit:x,body:l,leftArm:m,rightArm:f,active:!1,kind:"avatar",id:i.id};return e.userData=C,e.traverse(T=>{T.userData={...T.userData,kind:"avatar",id:i.id},T.isMesh&&(T.castShadow=!0)}),M.castShadow=!1,b.castShadow=!1,x.castShadow=!1,e}function lb(i,e){const t=new De(i);return t.offsetHSL(0,0,-.45),`#${t.getHexString()}`}const hb=.048,ub=.74,Sd=.92,db=.055,fb=qt(new ao(.026,Te.chipSegments)),pb=qt(new co(.024,.031,Te.chipSegments)),mb={wood:"L",brick:"B",sheep:"W",wheat:"G",ore:"O"},gb={wood:"#f4efe4",brick:"#f7efe6",sheep:"#243018",wheat:"#3a2a10",ore:"#1c1a18"};class _b{constructor(e){this.group=new Ze,e.add(this.group),this.flights=[],this.maps=new Map}play(e,{board:t,players:n,playerCount:s}){if(this.clear(),!(e!=null&&e.length))return 0;const r=new Map;let o=0;for(const a of e){const c=t.hexes.get(a.hexId),l=t.vertices.get(a.vertexId),h=n[a.playerId];if(!c||!h)continue;const u=a.amount||1;for(let d=0;d<u;d++){const p=r.get(a.hexId)||0;r.set(a.hexId,p+1),this.spawn({hex:c,vert:l,player:h,playerCount:s,resource:a.resource,slot:p,delay:ub+o*db}),o+=1}}return this.timeLeft()}timeLeft(){return this.flights.length?Math.max(0,...this.flights.map(e=>e.wait+Sd-e.t)):0}spawn({hex:e,vert:t,player:n,playerCount:s,resource:r,slot:o,delay:a}){const c=xb(e,t,o),l=vb(n,s),h=yb(r,n.color,this.letterMap(r));h.position.copy(c),h.visible=!1,this.group.add(h),this.flights.push({mesh:h,from:c,to:l,wait:a,t:0,spin:(o%2?1:-1)*(1.8+o*.15),arc:.16+o%3*.03})}letterMap(e){let t=this.maps.get(e);return t||(t=qt(Mb(e)),this.maps.set(e,t),t)}update(e,t){for(let n=this.flights.length-1;n>=0;n--){const s=this.flights[n];if(s.wait-=e,s.wait>0)continue;s.t+=e;const r=Math.min(1,s.t/Sd),o=1-(1-r)**3;s.mesh.visible=!0,s.mesh.position.lerpVectors(s.from,s.to,o),s.mesh.position.y+=Math.sin(r*Math.PI)*s.arc;const a=r<.12?.7+r*2.5:r>.82?1-(r-.82)*2.2:1;s.mesh.scale.setScalar(Math.max(.15,a)),s.mesh.rotation.z=r*s.spin,t&&s.mesh.lookAt(t.position);const c=r>.78?1-(r-.78)/.22:1;for(const l of s.mesh.userData.fadeMats)l.opacity=c;r>=1&&(this.disposeFlight(s),this.flights.splice(n,1))}}disposeFlight(e){this.group.remove(e.mesh);for(const t of e.mesh.userData.fadeMats)t.dispose()}clear(){for(const e of this.flights)this.disposeFlight(e);this.flights=[]}}function xb(i,e,t){const n=new P(i.x,Mn+hb,i.z);if(e){const s=e.x-i.x,r=e.z-i.z,o=Math.hypot(s,r)||1;n.x+=s/o*.042,n.z+=r/o*.042;const a=-r/o,c=s/o,l=(t-(t>0?.5:0))*.028;n.x+=a*l,n.z+=c*l}else{const s=t*1.2;n.x+=Math.cos(s)*.03,n.z+=Math.sin(s)*.03}return n}function vb(i,e){const t=!!i.isAI,n=$f(i.id,e,t?1.12:.9);return new P(n.x,t?.74:Mn+.11,n.z)}function yb(i,e,t){const n=new Ze,s=new ie(fb,new rt({map:t,transparent:!0,depthWrite:!1,side:Jt,toneMapped:!1})),r=new ie(pb,new rt({color:e,transparent:!0,depthWrite:!1,side:Jt,toneMapped:!1}));return s.renderOrder=40,r.renderOrder=41,n.add(r,s),n.frustumCulled=!1,s.frustumCulled=!1,r.frustumCulled=!1,n.userData.fadeMats=[s.material,r.material],n}function Mb(i){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d");t.clearRect(0,0,128,128),t.beginPath(),t.arc(64,64,58,0,Math.PI*2),t.fillStyle=wn[i],t.fill(),t.lineWidth=6,t.strokeStyle="#f3ead6",t.stroke(),t.fillStyle=gb[i]||"#2a1c12",t.font="700 62px Trebuchet MS, Segoe UI, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(mb[i]||"?",64,68);const n=new Cs(e);return n.colorSpace=Lt,n.generateMipmaps=!1,n.minFilter=zt,n.magFilter=zt,n}const Ko=1.7,Sb=5.2,bb=.055,Eb=.07,bd=.18,Tb=.85,Ab=6,wb={width:Te.floatW,height:Te.floatH,font:Te.headset?64:92,pad:24,fill:"#1a120c",ink:"#ffe08a"};class Rb{constructor(e){this.group=new Ze,e.add(this.group),this.items=[],this._cam=new P}spawn(e,t,n=Ko){const s=String(e||"").trim();if(!s||!t)return;this.items.length>=Ab&&this.disposeItem(this.items.shift());const r=Mr(s,wb),o=Math.min(.46,.11+s.length*.011),a=new ie(new yn(o,o*.25),new rt({map:r,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1,side:Jt}));a.renderOrder=50,a.frustumCulled=!1,this.group.updateMatrixWorld(!0);const c=t.clone();this.group.worldToLocal(c),c.y+=bb,a.position.copy(c),a.scale.setScalar(.72),this.group.add(a),this.items.push({mesh:a,tex:r,t:0,y0:c.y,life:Math.max(Ko,Number(n)||Ko)})}update(e,t){if(this.items.length){t&&t.getWorldPosition(this._cam);for(let n=this.items.length-1;n>=0;n--){const s=this.items[n];s.t+=e;const r=s.life||Ko,o=Math.min(1,s.t/r),a=Math.min(1,s.t/bd),c=Math.max(bd+.35,r-Tb),l=s.t>c?1-(s.t-c)/Math.max(.05,r-c):1;s.mesh.material.opacity=Math.max(0,a*l),s.mesh.position.y=s.y0+Eb*(1-(1-o)**2);const h=s.t<.22?.72+Math.min(1,s.t/.22)*.28:1;s.mesh.scale.setScalar(h),t&&s.mesh.lookAt(this._cam),o>=1&&(this.disposeItem(s),this.items.splice(n,1))}}}disposeItem(e){this.group.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose(),e.tex.dispose()}clear(){for(const e of this.items)this.disposeItem(e);this.items=[]}}const Le=i=>document.getElementById(i);function Cb(i){switch(i.phase){case F.SETUP_SETTLEMENT:return"Place a settlement (distance rule applies).";case F.SETUP_ROAD:return"Place a road touching that settlement.";case F.ROLL:return"Roll the dice — or play a knight first.";case F.MAIN:return"Build, trade, play a card, or end your turn. Trade and Dev are on the panel.";case F.DISCARD:return`${Tl(i)}. Tap resources on the panel, then confirm.`;case F.ROBBER:return"Move the robber onto a land hex.";case F.STEAL:return"Choose a player to steal from — click their name or figure.";case F.FREE_ROADS:return`Place ${i.freeRoads} free road${i.freeRoads>1?"s":""}.`;case F.PLENTY:return"Take any two resources from the bank — use the panel buttons.";case F.MONOPOLY:return"Name a resource on the panel. Everyone else must give you theirs.";case F.GAME_OVER:return`${i.player(i.winner).name} Wins!`;default:return""}}function Yf(i){const e=i.lastTrade;if(!e)return null;const t=st[e.give]||e.give,n=st[e.get]||e.get;return`Traded ${e.rate} ${t} for 1 ${n}`}function Sr(i){const e=i.lastSteal;if(!(e!=null&&e.resource))return null;const t=i.player(e.playerId),n=i.player(e.fromId);if(!t||!n)return null;const s=st[e.resource]||e.resource,r=Rn(i);return t.id===r.id?`You stole ${s} from ${n.name}`:n.id===r.id?`${t.name} stole ${s} from you`:`${t.name} stole ${s} from ${n.name}`}function ho(i){const e=i.lastRoll;if(!(e!=null&&e.dice))return null;const[t,n]=e.dice,s=t+n,r=`${t} + ${n} = ${s}`,o=Sr(i);if(e.seven||s===7){const u=o||"Robber — discard if 8+ cards";return{diceLine:r,gainsLine:u,seven:!0,banner:`${r} · ${u}`}}const a=Rn(i),c=Object.fromEntries(Xe.map(u=>[u,0]));for(const u of e.production||[])u.playerId===a.id&&(c[u.resource]=(c[u.resource]||0)+(u.amount||1));const l=Xe.filter(u=>c[u]>0).map(u=>`${c[u]} ${st[u]}`),h=l.length?`You gained ${l.join(", ")}`:"No resources";return{diceLine:r,gainsLine:h,seven:!1,banner:`${r} · ${h}`}}function Pb(i){const e=ho(i),t=Sr(i),n=Yf(i);if(i.phase===F.DISCARD){const h=`${Tl(i)}
Tap resources on the panel`;return e?`${e.diceLine} · ${h}`:h}const s=i.player().name,r={[F.SETUP_SETTLEMENT]:"Place a settlement",[F.SETUP_ROAD]:"Place a road",[F.ROLL]:"Roll the dice",[F.MAIN]:"Build, trade, or end turn",[F.DISCARD]:Tl(i),[F.ROBBER]:"Move the robber",[F.STEAL]:"Click a neighbor to steal",[F.FREE_ROADS]:`Place ${i.freeRoads} free road${i.freeRoads>1?"s":""}`,[F.PLENTY]:"Pick two resources on the panel",[F.MONOPOLY]:"Name a resource on the panel",[F.GAME_OVER]:i.winner!=null?`${i.player(i.winner).name} wins`:"Game over"}[i.phase]||String(i.phase),o=i.phase===F.MAIN&&i.isHuman()?`
Point at END TURN or squeeze grip`:i.phase===F.STEAL&&i.isHuman()?`
Click a neighbor`:i.phase===F.GAME_OVER?`
Play Again or Main Menu`:"",a=`${s} · ${r}${o}`;return n&&i.phase===F.MAIN?e&&!e.seven?`${e.banner}
${n}`:`${n}
${a}`:t&&i.phase!==F.STEAL&&i.phase!==F.ROBBER?e!=null&&e.seven?`${e.diceLine} · ${t}
${a}`:e?`${e.banner}
${t}`:`${t}
${a}`:e?e.seven?`${e.diceLine} · ${a}`:`${e.banner}
${a}`:a}function Lb(i,e){const t=i.player();Le("turn-banner").textContent=`${t.name}'s turn`,Le("turn-banner").style.color=t.color;const n=Cb(i);Le("phase-label").textContent=n;const s=ho(i),r=Sr(i),o=r?s?`${s.diceLine} · ${r}`:r:s?s.banner:n,a=Le("table-help");a&&(a.textContent=o,a.classList.toggle("hidden",!o));const c=Le("roll-result");c&&(c.textContent=r?o:s?s.banner:"",c.classList.toggle("hidden",!c.textContent));const l=Rn(i),h=Ta(i),u=Le("score-strip");u&&(u.innerHTML=h.map(C=>`<button type="button" class="score-chip ${C.id===i.current?"active":""}" data-scores="1" style="--chip:${C.color};color:${np(C.color)}">
        <i class="swatch" style="background:${C.color}"></i>
        <span class="score-name">${C.name}</span>
        <span class="score-vp">${C.publicVP}${C.isYou&&C.hiddenVP?`+${C.hiddenVP}`:""}</span>
        ${C.longestRoad?'<span class="award" title="Longest Road +2">R</span>':""}
        ${C.largestArmy?'<span class="award" title="Largest Army +2">A</span>':""}
      </button>`).join(""));const d=i.phase===F.STEAL&&i.isHuman(),p=new Set(i.stealCandidates);Le("players-panel").innerHTML=h.map(C=>{const T=i.player(C.id),w=Xe.reduce((y,D)=>y+T.resources[D],0),L=T.roads.length,E=d&&p.has(T.id);return`<article class="player-card ${T.id===i.current?"active":""} ${E?"steal-target":""}" ${E?`data-steal="${T.id}"`:""}>
        <div class="player-head">
          <span><i class="swatch" style="background:${T.color}"></i>${T.name}${T.isAI?" · AI":""}${C.isYou?" · You":""}${E?" · steal":""}</span>
          <span>${C.shownVP} VP${C.longestRoad?'<span class="award" title="Longest Road +2">R</span>':""}${C.largestArmy?'<span class="award" title="Largest Army +2">A</span>':""}</span>
        </div>
        <div class="player-break">${jf(C)}</div>
        <div class="player-meta">${w} cards · ${L} roads · ${T.knightsPlayed} knights</div>
        ${C.isYou?`<div class="player-res">${Xe.map(y=>`${st[y]} ${T.resources[y]}`).join(" · ")}</div>`:""}
      </article>`}).join(""),Le("resource-bar").innerHTML=Xe.map(C=>`<div class="resource-chip" style="border-color:${wn[C]};--chip:${wn[C]}">
      <div class="n">${l.resources[C]}</div>
      <div class="k">${st[C]}</div>
    </div>`).join("");const g=l,_=!g.isAI&&g.id===i.current,m=g.devCards.filter(C=>C.type!==Mt.VP).map(C=>{const T={[Mt.KNIGHT]:"Knight",[Mt.ROAD]:"Road Building",[Mt.PLENTY]:"Year of Plenty",[Mt.MONOPOLY]:"Monopoly"},w=i.playableCards(g.id).some(L=>L.id===C.id);return`<button data-dev="${C.id}" ${w&&_?"":"disabled"}>${T[C.type]}${C.playable?"":" (hold)"}</button>`}),f=g.devCards.filter(C=>C.type===Mt.VP).length;f&&m.push(`<button disabled>${f} VP card${f>1?"s":""}</button>`),Le("dev-bar").innerHTML=m.join("")||"<button disabled>No development cards</button>";const M=(C,T,w,L)=>`<button type="button" data-act="${C}" class="${e===C?"primary":""} ${w?"":"is-disabled"}" ${w?"":'aria-disabled="true"'}>${L?`<span class="act-name">${T}</span><span class="act-cost">${L}</span>`:T}</button>`,b=i.phase===F.MAIN&&_,x=i.phase===F.FREE_ROADS&&_;Le("action-bar").innerHTML=[M("roll","Roll dice",i.phase===F.ROLL&&_),M("road","Road",b&&i.canAfford(g.id,"road")||x,x?"Free":Ri(pt.road)),M("settlement","Settlement",b&&i.canAfford(g.id,"settlement"),Ri(pt.settlement)),M("city","City",b&&i.canAfford(g.id,"city"),Ri(pt.city)),M("dev","Dev",b&&i.canAfford(g.id,"dev")&&i.devDeck.length,Ri(pt.dev)),M("trade","Bank",b,"4:1"),M("end","End turn",b)].join(""),Le("log").innerHTML=[...i.log].slice(-12).reverse().map(C=>`<li>${C}</li>`).join("")}function Tl(i){const e=i.discardQueue.map(t=>i.player(t.player).name);return e.length?`${e.join(", ")} must discard half`:"Discard half your cards"}function Ta(i){if(!i)return[];const e=Rn(i);return i.players.map(t=>{const n=i.scoreFacts(t),s=t.id===e.id;return{id:t.id,name:t.name,color:t.color,isYou:s,settlements:n.settlements,cities:n.cities,longestRoad:n.longestRoad,largestArmy:n.largestArmy,hiddenVP:s?n.hiddenVP:0,publicVP:n.publicVP,shownVP:s?n.totalVP:n.publicVP}})}function jf(i){const e=i.settlements,t=i.cities,n=[`${e} settlement${e===1?"":"s"}`,`${t} cit${t===1?"y":"ies"}`];return i.longestRoad&&n.push("Longest Road +2"),i.largestArmy&&n.push("Largest Army +2"),i.isYou&&i.hiddenVP&&n.push(`You: ${i.hiddenVP} VP card${i.hiddenVP>1?"s":""}`),n.join(" · ")}function Rn(i){if(i.players.some(t=>!t.isAI)===!1)return i.player();const e=i.players.filter(t=>!t.isAI);return e.length===1?e[0]:i.player()}function Db(i){var e,t,n,s;Le("action-bar").addEventListener("click",r=>{const o=r.target.closest("button[data-act]");o&&(o.getAttribute("aria-disabled")==="true"?i("failBuild",o.dataset.act):i(o.dataset.act))}),Le("dev-bar").addEventListener("click",r=>{const o=r.target.closest("button[data-dev]");o&&i("playDev",o.dataset.dev)}),Le("players-panel").addEventListener("click",r=>{const o=r.target.closest("[data-steal]");o&&i("steal",Number(o.dataset.steal))}),(e=Le("score-strip"))==null||e.addEventListener("click",r=>{r.target.closest("[data-scores]")&&i("scores")}),(t=Le("scores-btn"))==null||t.addEventListener("click",()=>i("scores")),(n=Le("settings-btn"))==null||n.addEventListener("click",()=>i("settings")),(s=Le("title-settings-btn"))==null||s.addEventListener("click",()=>i("settings"))}const Ib=2200,qf=5200;function Un(i,e=Ib,t=null){const n=Le("toast");n.textContent=i,n.classList.toggle("toast-low",!!(t!=null&&t.low)),n.classList.remove("hidden"),clearTimeout(Un._t),Un._t=setTimeout(()=>n.classList.add("hidden"),e)}const Al=12;function Nb(i){if(!i||i.classList.contains("hidden"))return null;const e=i.getBoundingClientRect();return e.width<1||e.height<1?null:e}function Ub(i,e,t=Al){return i.left<e.right+t&&i.right+t>e.left&&i.top<e.bottom+t&&i.bottom+t>e.top}function Kf(){const i=Le("modal"),e=Le("modal-body");if(!i||!e||i.classList.contains("hidden")||!i.classList.contains("scores-modal"))return;e.style.top="",e.style.maxHeight="";const t=[document.querySelector(".top-actions"),Le("score-strip"),Le("turn-banner"),Le("table-help"),Le("phase-label"),Le("roll-result")].map(Nb).filter(Boolean);let n=Math.max(72,...t.map(r=>r.bottom+Al));e.style.top=`${Math.round(n)}px`,e.style.maxHeight=`${Math.max(160,Math.round(window.innerHeight-n-16))}px`;const s=e.getBoundingClientRect();for(const r of t)Ub(s,r)&&(n=Math.max(n,r.bottom+Al));e.style.top=`${Math.round(n)}px`,e.style.maxHeight=`${Math.max(160,Math.round(window.innerHeight-n-16))}px`}function wl(){wl._bound||(wl._bound=!0,window.addEventListener("resize",Kf))}function Ct(){const i=Le("modal");i.classList.add("hidden"),i.classList.remove("scores-modal");const e=Le("modal-body");e&&(e.style.top="",e.style.maxHeight="")}function di(i,e={}){const t=Le("modal"),n=Le("modal-body");n.innerHTML=i,n.style.top="",n.style.maxHeight="",t.classList.toggle("scores-modal",e.variant==="scores"),t.classList.remove("hidden"),e.variant==="scores"&&(wl(),requestAnimationFrame(Kf))}function Zf(i,e=""){return`<div class="picker" id="${i}">${Xe.map(t=>`<button type="button" data-res="${t}" style="border-color:${wn[t]}">${st[t]}</button>`).join("")}</div>${e}`}function Jf(i,e){const t=i.discardQueue.filter(a=>!i.player(a.player).isAI);if(!t.length)return!1;const n=t[0],s=i.player(n.player),r=Object.fromEntries(Xe.map(a=>[a,0])),o=()=>{const a=Xe.reduce((c,l)=>c+r[l],0);di(`<h2>${s.name}, discard ${n.must}</h2>
      <p>Selected ${a} / ${n.must}. You can also tap resources on the table panel.</p>
      ${Xe.map(c=>`<button data-r="${c}">${st[c]} ${r[c]}/${s.resources[c]}</button>`).join(" ")}
      <p><button id="discard-go" class="primary" ${a===n.must?"":"disabled"}>Discard</button></p>`),Le("modal-body").onclick=c=>{const l=c.target.dataset.r;l&&r[l]<s.resources[l]&&a<n.must&&(r[l]+=1,o()),c.target.id==="discard-go"&&a===n.must&&(Ct(),e(s.id,r))}};return o(),!0}function Qf(i,e){const t=i.stealCandidates.map(n=>{const s=i.player(n);return`<button type="button" class="steal-pick" data-steal="${n}" style="--steal:${s.color}">
        <i class="swatch" style="background:${s.color}"></i>${s.name}
      </button>`}).join("");di(`<h2>Steal a card</h2>
    <p>Choose a neighbor. You can also click their figure at the table.</p>
    <div class="picker steal-picker">${t}</div>`),Le("modal-body").onclick=n=>{var r;const s=(r=n.target.closest("button[data-steal]"))==null?void 0:r.dataset.steal;s!=null&&(Ct(),e(Number(s)))}}function Ob(i,e){let t=null,n=null;const s=Rn(i),r=()=>{var h,u;const o=t?i.tradeRate(s,t):4,a=t&&n&&i.canBankTrade(s.id,t,n),c=t&&n?i.whyNotBankTrade(s.id,t,n):null,l=t?`Bank ${o}:1 — give ${o} ${st[t]} for 1 of another.`:"Bank 4:1 (3:1 or 2:1 with a matching port). Give extras, take one.";di(`<h2>Bank trade</h2>
      <p>${l} In VR, use the panel buttons.</p>
      <p>Give to the bank</p>
      <div class="picker" id="give-p">${Xe.map(d=>{const p=i.tradeRate(s,d),g=(s.resources[d]||0)<p;return`<button type="button" data-res="${d}" ${g?"disabled":""} style="border-color:${wn[d]}">${st[d]} ${p}:1</button>`}).join("")}</div>
      <p>Get from the bank</p>
      <div class="picker" id="get-p">${Xe.map(d=>{const p=d===t||(i.bank[d]||0)<1;return`<button type="button" data-res="${d}" ${p?"disabled":""} style="border-color:${wn[d]}">${st[d]}</button>`}).join("")}</div>
      ${c?`<p class="trade-why">${c}</p>`:""}
      <button id="trade-go" class="primary" ${a?"":"disabled"}>${t?`Bank ${o}:1`:"Bank 4:1"}</button>
      <button id="trade-cancel">Cancel</button>`),t&&((h=Le("give-p").querySelector(`[data-res="${t}"]`))==null||h.classList.add("selected")),n&&((u=Le("get-p").querySelector(`[data-res="${n}"]`))==null||u.classList.add("selected")),Le("give-p").onclick=d=>{var g;const p=Ei((g=d.target.closest("[data-res]"))==null?void 0:g.dataset.res);!p||(s.resources[p]||0)<i.tradeRate(s,p)||(t=p,n===t&&(n=null),r())},Le("get-p").onclick=d=>{var g;const p=Ei((g=d.target.closest("[data-res]"))==null?void 0:g.dataset.res);!p||p===t||(i.bank[p]||0)<1||(n=p,r())},Le("trade-go").onclick=()=>{a&&(Ct(),e(t,n))},Le("trade-cancel").onclick=()=>{Ct(),e(null,null)}};r()}function ep(i){const e=[],t=()=>{di(`<h2>Year of Plenty</h2><p>Pick two resources (${e.length}/2) — use the panel in VR.</p>
      ${Zf("pl")}
      <p>${e.map(n=>st[n]).join(", ")}</p>`),Le("pl").onclick=n=>{const s=n.target.dataset.res;s&&(e.push(s),e.length>=2?(Ct(),i(e[0],e[1])):t())}};t()}function tp(i){di(`<h2>Monopoly</h2><p>Name a resource on the panel or below.</p>${Zf("mo")}`),Le("mo").onclick=e=>{const t=e.target.dataset.res;t&&(Ct(),i(t))}}function np(i){const e=String(i||"").replace("#","");if(e.length<6)return"#f7efe0";const t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),s=parseInt(e.slice(4,6),16);return(t*299+n*587+s*114)/1e3>160?"#1a120c":"#f7efe0"}function Fb(i,e){const t=Ta(i);di(`<h2>Scores</h2>
    <p class="score-note">Public totals are settlements, cities, Longest Road, and Largest Army. Victory-point cards stay private except on your row.</p>
    ${t.map(n=>`<article class="score-break">
        <div class="player-head">
          <span><i class="swatch" style="background:${n.color}"></i>${n.name}${n.isYou?" · You":""}</span>
          <span>${n.shownVP} VP${n.longestRoad?'<span class="award" title="Longest Road +2">R</span>':""}${n.largestArmy?'<span class="award" title="Largest Army +2">A</span>':""}</span>
        </div>
        <div class="player-break">${jf(n)}</div>
      </article>`).join("")}
    <button id="scores-back" class="primary" type="button">Back</button>`,{variant:"scores"}),Le("scores-back").onclick=()=>{Ct(),e==null||e()}}function ip(i,{onPlayAgain:e,onMainMenu:t}={}){const n=i.player(i.winner),s=np(n.color);di(`<h2 class="win-title" style="background:${n.color};color:${s}">${n.name} Wins!</h2>
    <p>${i.totalVP(n)} victory points. The island is theirs.</p>
    <div class="win-actions">
      <button id="again" class="primary">Play Again</button>
      <button id="win-menu" type="button">Main Menu</button>
    </div>`),Le("again").onclick=()=>{Ct(),e==null||e()},Le("win-menu").onclick=()=>{Ct(),t==null||t()}}function Bb(i,e){const t=n=>n?"primary":"";di(`<h2>Settings</h2>
    <div class="settings-stack">
      <button type="button" class="${t(i.gaze)}" data-act="pointer">${i.gaze?"Pointer: Face":"Pointer: Hand"}</button>
      <button type="button" data-act="pointerTilt">Pointer tilt · ${i.tiltLabel}</button>
      <button type="button" class="${t(i.lines)}" data-act="pointerLines">${i.lines?"Pointer lines ON":"Pointer lines OFF"}</button>
      <button type="button" class="${t(i.antialias)}" data-act="antialias">${i.antialias?"Antialias ON":"Antialias OFF"}</button>
      <button type="button" class="${t(i.passthrough)}" data-act="passthrough">${i.passthrough?"Passthrough ON":"Passthrough OFF"}</button>
      <button type="button" class="${t(i.handles)}" data-act="handles">${i.handles?"Handles ON":"Handles OFF"}</button>
      ${i.canRestart?'<button type="button" data-act="restartAsk">Restart game</button>':""}
      <button type="button" id="settings-back" class="primary" data-act="settingsBack">Back</button>
    </div>`),Le("modal-body").onclick=n=>{var r;const s=(r=n.target.closest("[data-act]"))==null?void 0:r.dataset.act;s&&e(s)}}function kb(i,e){di(`<h2>Pointer tilt</h2>
    <p>Nudge the XR aim ray up or down.</p>
    <div class="settings-stack">
      <button type="button" data-act="pointerTiltUp">▲ Up</button>
      <button type="button" disabled>${i.tiltLabel}</button>
      <button type="button" data-act="pointerTiltDown">▼ Down</button>
      <button type="button" id="tilt-back" class="primary" data-act="pointerTiltBack">Back</button>
    </div>`),Le("modal-body").onclick=t=>{var s;const n=(s=t.target.closest("[data-act]"))==null?void 0:s.dataset.act;n&&e(n)}}function sp(i){di(`<h2>Restart game?</h2>
    <p>This starts a new island (same player count and mode).</p>
    <button id="restart-go" class="primary">Restart</button>
    <button id="restart-back">Back</button>`),Le("restart-go").onclick=()=>{Ct(),i(!0)},Le("restart-back").onclick=()=>{Ct(),i(!1)}}let Br;function rp(){return Br||(Br=new(window.AudioContext||window.webkitAudioContext)),Br.state==="suspended"&&Br.resume(),Br}function xs(i,e=.12,t="sine",n=.06){const s=rp(),r=s.createOscillator(),o=s.createGain();r.type=t,r.frequency.value=i,o.gain.value=n,o.gain.exponentialRampToValueAtTime(1e-4,s.currentTime+e),r.connect(o).connect(s.destination),r.start(),r.stop(s.currentTime+e)}const We={unlock:()=>rp(),dice:()=>{xs(180,.05,"square",.04),setTimeout(()=>xs(140,.08,"triangle",.05),80),setTimeout(()=>xs(90,.12,"sawtooth",.03),160)},place:()=>xs(220,.1,"triangle",.05),click:()=>xs(520,.05,"square",.03),win:()=>{[262,330,392,523].forEach((i,e)=>setTimeout(()=>xs(i,.28,"sine",.07),e*140))},bad:()=>xs(90,.16,"sawtooth",.04)};let sn=Te.antialias;try{const i=localStorage.getItem("catan-antialias");i==="1"?sn=!0:i==="0"&&(sn=!1)}catch{}Te.antialias=sn;const ma={antialias:sn};function zb(){const i=e=>{if(!(e!=null&&e.getContextAttributes)||e.getContextAttributes.__catanAa)return;const t=e.getContextAttributes;e.getContextAttributes=function(){const s=t.call(this);return s&&(Object.assign(ma,s,{antialias:sn}),ma)},e.getContextAttributes.__catanAa=!0};i(WebGLRenderingContext.prototype),typeof WebGL2RenderingContext<"u"&&i(WebGL2RenderingContext.prototype)}zb();const br=document.getElementById("scene"),be=new ly({canvas:br,antialias:sn,alpha:!0});be.setPixelRatio(Te.pixelRatio);be.setSize(innerWidth,innerHeight);be.setClearColor(1774607,1);be.shadowMap.enabled=Te.shadows;be.shadowMap.type=US();be.xr.enabled=!0;be.xr.setFramebufferScaleFactor(Te.framebufferScale);be.outputColorSpace=Lt;be.toneMapping=$d;be.toneMappingExposure=1.05;const Fn=new hy,ct=new Ze;ct.name="stage";const Aa=-1.32,Hb=.4,Rl=.5,bc=.05,Ed=90;ct.position.set(0,0,Aa);Fn.add(ct);const kt=new hn(60,innerWidth/innerHeight,.05,30);kt.position.set(0,1.17,.62);Fn.add(kt);const gn=new Jy(kt,br);gn.target.set(0,.57,Aa);gn.enableDamping=!0;gn.enablePan=!0;gn.screenSpacePanning=!0;gn.panSpeed=1.25;gn.maxPolarAngle=Math.PI*.48;gn.minDistance=.6;gn.maxDistance=3.2;gn.mouseButtons.LEFT=Pi.PAN;gn.mouseButtons.MIDDLE=Pi.DOLLY;gn.mouseButtons.RIGHT=Pi.ROTATE;gn.touches.ONE=Qi.PAN;gn.touches.TWO=Qi.DOLLY_ROTATE;gn.listenToKeyEvents(window);br.addEventListener("contextmenu",i=>i.preventDefault());const op=new De("#1b140f");Fn.background=op;Fn.fog=new Ma("#1b140f",6,12);const rh=zS(ct);la(!1);const $e=new $S(ct);$e.rebuild(new kf({seed:2026}).board);const ai=new JS(ct),Ue=new QS(ct),ii=new ib(kt),dr=UE(),Ti=OE(),rs=new ab(ct),uo=new _b(ct),fo=new Rb(ct),on=new KS(Fn,ct),Oi=new P,Cl=new Jn,Td=new Qn,Zo=new P,si=new P,ri=new P,Ad=new P,wd=new P(0,1,0),Ki=new P,$n=new P,Tn=new P,Rd=new P,Jo=new P,un=new Map;let Gn=null,Zr=!1,Jr=null,Cd="local-floor",er=!1,tr=0,Qr=!1;const Ec={select:!1,selectstart:!1,selectend:!1},Vb=320;let ap=0,ga=null;const cp=4,Pl=["local-floor","bounded-floor","hand-tracking","transient-pointer","unbounded"],wa=4,Gb=.003,Pd=.004,Ld=new ky,$t=new qy,eo=new Re;let An="controller";try{const i=localStorage.getItem("catan-pointer-mode");(i==="gaze"||i==="controller")&&(An=i)}catch{}const _a=2,Dd=20;let Zn=0;try{const i=localStorage.getItem("catan-pointer-tilt");i!=null&&(Zn=up(i))}catch{}let ci=!0;try{const i=localStorage.getItem("catan-pointer-lines");i==="0"?ci=!1:i==="1"&&(ci=!0)}catch{}const oh=NE();Ii();let A=null;Bi();let fr=null,Ft=!1,Oe=!1,bs=3,pr=!0,Wn=!1,As=!0,ye="actions",Yt=null,rn=null,an=Fi(),ws="",On=[];const lp=new Set(["settings","settingsBack","passthrough","handles","restart","restartAsk","restartBack","pointer","pointerLines","antialias","pointerTilt","pointerTiltUp","pointerTiltDown","pointerTiltBack"]),Wb=new Set(["road","settlement","city","dev","cards"]),hp=new P,Xb={[Mt.KNIGHT]:"Knight",[Mt.ROAD]:"Road Building",[Mt.PLENTY]:"Year of Plenty",[Mt.MONOPOLY]:"Monopoly"};function Fi(){return Object.fromEntries(Xe.map(i=>[i,0]))}function up(i){const e=Math.round(Number(i)/_a)*_a;return Number.isFinite(e)?Math.max(-Dd,Math.min(Dd,e)):0}function Ra(){return Zn>0?`+${Zn}°`:`${Zn}°`}function Id(i){Zn=up(i);try{localStorage.setItem("catan-pointer-tilt",String(Zn))}catch{}}function Vt(){return be.xr.isPresenting}function Bi(){const i=Vt();Ue.setVisible(i),i||(ii.mesh.visible=!1),document.documentElement.classList.toggle("xr-presenting",i),$b()}function $b(){const i=document.getElementById("hud"),e=document.getElementById("start-screen");!i||!e||(A?(i.classList.remove("hidden"),e.classList.add("hidden"),e.hidden=!0,e.setAttribute("inert","")):(i.classList.add("hidden"),e.classList.remove("hidden"),e.hidden=!1,e.removeAttribute("inert")))}function Ys(i,e){return typeof i!="string"||!i.startsWith(e)?null:i.slice(e.length)}function to(){const i=document.getElementById("player-count");if(i)for(const t of i.children)t.classList.toggle("active",Number(t.dataset.count)===bs);const e=document.getElementById("play-mode");if(e)for(const t of e.children)t.classList.toggle("active",t.dataset.mode==="solo"===pr)}document.getElementById("player-count").addEventListener("click",i=>{const e=i.target.closest("button[data-count]");e&&(bs=Number(e.dataset.count),to(),A||_t())});document.getElementById("play-mode").addEventListener("click",i=>{const e=i.target.closest("button[data-mode]");e&&(pr=e.dataset.mode==="solo",to(),A||_t())});document.getElementById("start-btn").addEventListener("click",()=>{We.unlock(),cs()});document.getElementById("new-game-btn").addEventListener("click",()=>{dp({fromHud:!0})});document.getElementById("vr-btn").addEventListener("click",JE);window.addEventListener("resize",tT);br.addEventListener("pointermove",i=>{if(eo.x=i.clientX/innerWidth*2-1,eo.y=-(i.clientY/innerHeight)*2+1,ns&&Ue.pressAction){const e=i.clientX-ns.x,t=i.clientY-ns.y;e*e+t*t>=256&&Ue.setPressed(null)}});let ns=null;br.addEventListener("pointerdown",i=>{var t;if(We.unlock(),ns={x:i.clientX,y:i.clientY},be.xr.isPresenting)return;$t.setFromCamera(eo,kt);const e=Ia($t.intersectObjects(Da(),!0));((t=e==null?void 0:e.userData)==null?void 0:t.kind)==="tray"&&!e.userData.disabled&&Ue.setPressed(e.userData.action)});br.addEventListener("pointerup",i=>{if(!ns||be.xr.isPresenting)return;const e=i.clientX-ns.x,t=i.clientY-ns.y;ns=null,e*e+t*t<256?TE():Ue.setPressed(null)});function no(i,e){if(i==="scores"){pp();return}if(i==="settings"){aE();return}if(i==="failBuild"){if(!A)return;const t=e==="roll"?xp():e==="end"?"Finish your turn from the panel when it is Main.":e==="trade"?"Bank trades are on your turn after rolling.":yp(e);qs(t,{userData:{kind:"tray",action:e}});return}if(!(!A||Ft)){if(i==="steal"){Tr(e);return}if(i==="dev"){const t=Rn(A).id;if(!A.buyDev(t)){qs(A.whyNotDev(t),{userData:{kind:"tray",action:"dev"}});return}We.click(),Ut();return}if(We.click(),i==="roll"){const t=A.roll();t&&(ai.placeFor(A.current,A.playerCount),ai.rollTo(t),We.dice(),Gp()),Ut();return}if(i==="end"){A.endTurn(),Ut();return}if(i==="trade"){lE();return}if(i==="playDev"){A.playDev(e),Ut();return}fr=i,ki()}}Db(no);let io=null;var Hd;(Hd=document.getElementById("spot-layer"))==null||Hd.addEventListener("pointerover",i=>{const e=i.target.closest("[data-vertex]");io=(e==null?void 0:e.dataset.vertex)??null});var Vd;(Vd=document.getElementById("spot-layer"))==null||Vd.addEventListener("pointerout",i=>{const e=i.target.closest("[data-vertex]");e&&io===e.dataset.vertex&&(io=null)});var Gd;(Gd=document.getElementById("spot-layer"))==null||Gd.addEventListener("click",i=>{const e=i.target.closest("[data-vertex]");e&&hh({userData:{kind:"vertex",id:e.dataset.vertex}})});be.setAnimationLoop(()=>{var t,n,s,r,o,a;const i=Ld.getDelta();be.xr.isPresenting||gn.update(),ai.update(i);const e=be.xr.isPresenting&&((n=(t=be.xr).getCamera)==null?void 0:n.call(t))||kt;if(uo.update(i,e),fo.update(i,e),$e.pulseMarkers(Ld.elapsedTime),rs.update(i,be.xr.isPresenting&&((r=(s=be.xr).getCamera)==null?void 0:r.call(s))||kt),be.xr.isPresenting){const c=((a=(o=be.xr).getCamera)==null?void 0:a.call(o))||kt;ii.attach(c),kd(c),vE(),zp(),on.update(i,c,Di)}else ii.mesh.visible=!1,kd(kt);IE(),yE(),rh.syncBoardLight(ct.scale.x),be.render(Fn,kt)});Bi();Hp();function cs(){Ct(),A=new kf({playerCount:bs,solo:pr}),Ft=!1,fr=null,Oe=!1,ye="actions",Yt=null,rn=null,an=Fi(),ws="",On=[],Ue.setHeadline(""),Ue.setScores(Ta(A)),$e.rebuild(A.board),$e.syncPieces(A),rs.rebuild(A.players),uo.clear(),fo.clear(),ai.placeFor(A.current,A.playerCount),Bi(),ki(),Ut()}function ah(){Ct(),A=null,Ft=!1,fr=null,Oe=!1,ye="actions",Yt=null,rn=null,an=Fi(),ws="",On=[],uo.clear(),fo.clear(),Ue.setHeadline(""),Ue.setScores([]),rs.setCelebrating(null),Ue.setResources(Fi()),Bi(),to(),_t(),wt()}function Yb(){return!!A&&A.phase!==F.GAME_OVER}function dp({fromHud:i=!1}={}){if(i&&!Yb()){cs();return}if(Vt()){ye="restartConfirm",_t(),wt(),We.click();return}const e=ye==="settings"||ye==="pointerTilt"||ye==="restartConfirm";ye="restartConfirm",Oe=!0,sp(t=>{if(Oe=!1,t){cs();return}if(e){ye="settings",so();return}ye="actions"})}function Nd(){return!A||Ft||Oe&&A.phase!==F.STEAL?!1:A.phase===F.DISCARD?A.discardQueue.some(i=>!A.player(i.player).isAI):A.isHuman()}function Ca(){return A?A.phase===F.SETUP_SETTLEMENT?"settlement":A.phase===F.SETUP_ROAD||A.phase===F.FREE_ROADS?"road":A.phase===F.ROBBER?"robber":fr:null}function ki(){if(!A)return;$e.syncPieces(A),Lb(A,Ca()),_E();const i=Er();Ue.setResources((i?A.player(i.player):Rn(A)).resources),Ue.setScores(Ta(A)),_t(),ye==="scores"&&Oe&&!Vt()&&ch(),wt(),rs.setCurrent(A.current),rs.setStealTargets(A.phase===F.STEAL&&A.isHuman()?A.stealCandidates:null),rs.setCelebrating(A.phase===F.GAME_OVER?A.winner:null),ai.placeFor(A.current,A.playerCount)}function Ud(){if(!A)return[{label:"Settings",action:"settings"}];const i=A.isHuman()&&!Ft,e=i&&A.playableCards(A.current).length>0,t=A.phase===F.FREE_ROADS;return[{label:"Roll",action:"roll",disabled:!(i&&A.phase===F.ROLL)},{label:"Road",detail:t?"Free":Ri(pt.road),action:"road",disabled:!(i&&(A.phase===F.MAIN&&A.canAfford(A.current,"road")||t))},{label:"Settle",detail:Ri(pt.settlement),action:"settlement",disabled:!(i&&A.phase===F.MAIN)},{label:"City",detail:Ri(pt.city),action:"city",disabled:!(i&&A.phase===F.MAIN)},{label:"Dev",detail:Ri(pt.dev),action:"cards",disabled:!(i&&A.phase===F.MAIN||e)},{label:"Bank",detail:"4:1",action:"trade",disabled:!(i&&A.phase===F.MAIN)},{label:"End Turn",action:"end",disabled:!(i&&A.phase===F.MAIN)},{label:"Scores",action:"scores"},{label:"Settings",action:"settings"}]}function jb(){return A.stealCandidates.map(i=>{const e=A.player(i);return{label:e.name,action:`steal:${i}`,color:e.color}})}function Od(){return[{label:An==="gaze"?"Pointer: Face":"Pointer: Hand",action:"pointer",on:An==="gaze"},{label:"Pointer tilt",detail:Ra(),action:"pointerTilt"},{label:ci?"Pointer lines ON":"Pointer lines OFF",action:"pointerLines",on:ci},{label:sn?"Antialias ON":"Antialias OFF",action:"antialias",on:sn},{label:Wn?"Passthrough ON":"Passthrough OFF",action:"passthrough",on:Wn},{label:As?"Handles ON":"Handles OFF",action:"handles",on:As},...A?[{label:"Restart game",action:"restartAsk"}]:[],{label:"Back",action:"settingsBack"}]}function Fd(){return[{label:"▲ Up",action:"pointerTiltUp"},{label:Ra(),action:"pointerTiltValue",disabled:!0},{label:"▼ Down",action:"pointerTiltDown"},{label:"Back",action:"pointerTiltBack"}]}function qb(){return[{label:"Restart",action:"restart"},{label:"Back",action:"restartBack"}]}function Kb(){const i=A.isHuman()&&!Ft,e=A.playableCards(A.current);return[{label:"Buy card",detail:Ri(pt.dev),action:"dev",disabled:!(i&&A.phase===F.MAIN&&A.canAfford(A.current,"dev")&&A.devDeck.length)},...e.map(t=>({label:Xb[t.type]||t.type,action:`playDev:${t.id}`})),{label:"Back",action:"cardsBack"}]}function Zb(){const i=Rn(A);return[...Xe.map(e=>{const t=A.tradeRate(i,e);return{label:st[e],detail:`Give ${t}:1`,action:`give:${e}`,color:wn[e],selected:Yt===e,disabled:(i.resources[e]||0)<t}}),...Xe.map(e=>({label:st[e],detail:"Get",action:`get:${e}`,color:wn[e],selected:rn===e,disabled:e===Yt||(A.bank[e]||0)<1})),{label:Yt?`Bank ${A.tradeRate(i,Yt)}:1`:"Bank 4:1",action:"tradeGo",disabled:!A.canBankTrade(i.id,Yt,rn)},{label:"Cancel",action:"tradeCancel"}]}function Jb(){const i=Pa();if(!i)return[{label:"Waiting",action:"discardGo",disabled:!0}];const e=A.player(i.player),t=Xe.reduce((n,s)=>n+(an[s]||0),0);return[...Xe.map(n=>({label:`${st[n]} ${an[n]}/${e.resources[n]}`,action:`discard:${n}`,color:wn[n],disabled:!e.resources[n]||an[n]>=e.resources[n]||t>=i.must})),{label:t===i.must?"Discard":`Discard ${t}/${i.must}`,action:"discardGo",disabled:t!==i.must},{label:"Clear",action:"discardClear",disabled:t===0}]}function Qb(){return Xe.map(i=>({label:st[i],action:`plenty:${i}`,color:wn[i],selected:On.includes(i)}))}function eE(){return Xe.map(i=>({label:st[i],action:`mono:${i}`,color:wn[i]}))}function tE(){return[{label:"Back",action:"scoresBack"}]}function nE(){return[{label:"Play Again",action:"restart"},{label:"Main Menu",action:"mainMenu"}]}function iE(){return[{label:`Players: ${bs}`,action:"titlePlayers"},{label:pr?"You vs AI":"Hotseat",action:"titleMode"},{label:"Begin the voyage",action:"titleStart"},{label:"Settings",action:"settings"}]}function fp(){if((A==null?void 0:A.phase)!==F.GAME_OVER||A.winner==null){Ue.setHeadline("");return}const i=A.player(A.winner);Ue.setHeadline(`${i.name} Wins!`,i.color)}function Er(){return A&&A.discardQueue.find(i=>!A.player(i.player).isAI)||null}function Pa(){const i=Er(),e=i?`${i.player}:${i.must}`:"";return e!==ws&&(ws=e,an=Fi()),i}function sE(){if(ye==="restartConfirm")return"This starts a new island (same player count and mode).";if(ye==="scores"&&A)return"Public VP hides opponents’ victory-point cards.";if(ye==="trade"&&A){const e=Rn(A);if(!Yt)return`${e.name} · Bank 4:1 — pick what to give, then Grain or another to get`;const t=A.tradeRate(e,Yt),n=`${t} ${st[Yt]}`;return rn?`${e.name} · Bank ${t}:1 · ${n} → 1 ${st[rn]}`:`${e.name} · Give ${n} to the bank — pick what to get`}if(ye==="cards"&&A)return`${A.player().name} · Play a card or buy one`;const i=(A==null?void 0:A.phase)===F.DISCARD?Er():null;if(i){const e=Xe.reduce((r,o)=>r+(an[o]||0),0),t=A.player(i.player),n=ho(A),s=`${t.name} · discard ${e} / ${i.must} on the panel`;return n?`${n.diceLine}
${s}`:s}if((A==null?void 0:A.phase)===F.PLENTY&&A.isHuman()){const e=On.map(t=>st[t]).join(", ");return e?`${A.player().name} · Picked ${e} (${On.length}/2)`:`${A.player().name} · Pick two resources on the panel`}return(A==null?void 0:A.phase)===F.MONOPOLY&&A.isHuman()?`${A.player().name} · Name a resource on the panel`:A?Pb(A):""}function wt(){const i=Cn();if(!A){Ue.setStatus(""),Vt()&&i?ii.set("Point with your view, pinch to select."):Vt()||(ii.mesh.visible=!1);return}const e=sE(),t=ho(A),n=Sr(A),s=Yf(A),r=n?t?`${t.diceLine} · ${n}`:n:s?t?`${t.banner} · ${s}`:s:t==null?void 0:t.banner;if(Ue.setStatus(e),!Vt()){ii.mesh.visible=!1;return}i?ii.set(r||"Point with your view, pinch to select."):ii.set(r||e)}function _t(){if(!A){if(ye==="settings"){Ue.setButtons(Od(),"settings");return}if(ye==="pointerTilt"){Ue.setButtons(Fd(),"pointerTilt");return}if(Vt()){Ue.setButtons(iE(),"title");return}Ue.setButtons(Ud(),"actions");return}if(A.phase!==F.MAIN&&ye==="trade"&&(ye="actions"),![F.MAIN,F.ROLL].includes(A.phase)&&ye==="cards"&&(ye="actions"),La()&&ye==="scores"&&(ye="actions"),A.phase===F.STEAL&&A.isHuman()){Ue.setButtons(jb(),"steal");return}if(A.phase===F.DISCARD&&Er()){Ue.setButtons(Jb(),"discard");return}if(A.phase===F.PLENTY&&A.isHuman()){Ue.setButtons(Qb(),"plenty");return}if(A.phase===F.MONOPOLY&&A.isHuman()){Ue.setButtons(eE(),"monopoly");return}if(A.phase===F.GAME_OVER){fp(),Ue.setButtons(nE(),"win");return}if(ye==="settings"){Ue.setButtons(Od(),"settings");return}if(ye==="pointerTilt"){Ue.setButtons(Fd(),"pointerTilt");return}if(ye==="restartConfirm"){Ue.setButtons(qb(),"restartConfirm");return}if(ye==="scores"){Ue.setButtons(tE(),"scores");return}if(ye==="trade"){Ue.setButtons(Zb(),"trade");return}if(ye==="cards"){Ue.setButtons(Kb(),"cards");return}Ue.setButtons(Ud(),"actions")}function Ll(i){if(i==="settings")ye="settings";else if(i==="settingsBack")ye="actions";else if(i==="pointerTilt")ye="pointerTilt";else if(i==="pointerTiltBack")ye="settings";else if(i==="pointerTiltUp")Id(Zn+_a);else if(i==="pointerTiltDown")Id(Zn-_a);else if(i==="restartAsk")if(Vt())ye="restartConfirm";else{dp();return}else if(i==="restartBack")ye="settings";else if(i==="passthrough")ca(!Wn);else if(i==="pointer")BE(An==="gaze"?"controller":"gaze");else if(i==="pointerLines")kE(!ci);else if(i==="antialias")zE(!sn);else if(i==="handles")As=!As,VE();else if(i==="restart"){We.click(),cs();return}if(i==="settingsBack"&&!Vt()){Oe=!1,Ct(),_t(),wt(),We.click();return}_t(),wt(),We.click(),so()}function La(){return!A||A.phase===F.GAME_OVER?!0:A.isHuman()?A.phase===F.STEAL||A.phase===F.DISCARD||A.phase===F.PLENTY||A.phase===F.MONOPOLY:!1}function rE(){return A?La():!1}function oE(){return{gaze:An==="gaze",tiltLabel:Ra(),lines:ci,antialias:sn,passthrough:Wn,handles:As,canRestart:!!A}}function so(){if(!Vt()){if(ye==="settings"){Oe=!0,Bb(oE(),i=>Ll(i));return}ye==="pointerTilt"&&(Oe=!0,kb({tiltLabel:Ra()},i=>Ll(i)))}}function aE(){if(!rE()){if(Vt()){ye="settings",Oe=!1,Ct(),_t(),wt(),We.click();return}ye="settings",so(),We.click()}}function ch(){Fb(A,()=>{Oe=!1,ye==="scores"&&(ye="actions"),_t(),wt()})}function pp(){if(!(!A||La())){if(Vt()){ye="scores",Oe=!1,Ct(),_t(),wt(),We.click();return}ye="scores",Oe=!0,ch(),We.click()}}function cE(){ye==="scores"&&(ye="actions"),Oe=!1,Ct(),_t(),wt(),We.click()}function lE(){ye="trade",Yt=null,rn=null,Oe=!0,_t(),wt(),!Vt()&&Ob(A,(i,e)=>{if(Oe=!1,ye="actions",Yt=rn=null,!i||!e){ki();return}if(!A.bankTrade(Rn(A).id,i,e)){Un(A.whyNotBankTrade(Rn(A).id,i,e)||"Cannot make that trade."),ki();return}Ut()})}function hE(){Yt=rn=null,ye="actions",Oe=!1,Ct(),_t(),wt(),We.click()}function uE(){if(!(Ft||!Yt||!rn)){if(!A.bankTrade(Rn(A).id,Yt,rn)){Un(A.whyNotBankTrade(Rn(A).id,Yt,rn)||"Cannot make that trade.");return}Yt=rn=null,ye="actions",Oe=!1,Ct(),We.click(),Ut()}}function dE(i){if(Ft)return;const e=Pa();if(!e)return;const t=A.player(e.player),n=Xe.reduce((s,r)=>s+(an[r]||0),0);an[i]>=t.resources[i]||n>=e.must||(an[i]+=1,_t(),wt(),Ue.setResources(t.resources),We.click())}function fE(){if(Ft)return;const i=Pa();!i||Xe.reduce((t,n)=>t+(an[n]||0),0)!==i.must||A.discard(i.player,{...an})&&(an=Fi(),ws="",Oe=!1,Ct(),We.click(),Ut())}function pE(i){if(!(Ft||!A||A.phase!==F.PLENTY||!A.isHuman())){if(On.push(i),On.length>=2){const[e,t]=On;if(On=[],!A.yearOfPlenty(e,t))return;Oe=!1,Ct(),We.click(),Ut();return}_t(),wt(),We.click()}}function mE(i){Ft||!A||A.phase!==F.MONOPOLY||!A.isHuman()||A.monopoly(i)&&(Oe=!1,Ct(),We.click(),Ut())}function gE(i){if(i==="mainMenu")return We.click(),ah(),!0;if(i==="titleStart")return We.unlock(),We.click(),cs(),!0;if(i==="titlePlayers")return bs=bs>=4?2:bs+1,to(),_t(),We.click(),!0;if(i==="titleMode")return pr=!pr,to(),_t(),We.click(),!0;if(lp.has(i))return Ll(i),!0;if(i==="scores")return pp(),!0;if(i==="scoresBack")return cE(),!0;if(i==="cards")return ye="cards",_t(),wt(),We.click(),!0;if(i==="cardsBack")return ye="actions",_t(),wt(),We.click(),!0;if(i==="tradeCancel")return hE(),!0;if(i==="tradeGo")return uE(),!0;const e=Ei(Ys(i,"give:"));if(e)return Ft||(Yt=e,rn===e&&(rn=null),_t(),wt(),We.click()),!0;const t=Ei(Ys(i,"get:"));if(t)return Ft||(rn=t,_t(),wt(),We.click()),!0;const n=Ys(i,"discard:");if(n)return dE(n),!0;if(i==="discardGo")return fE(),!0;if(i==="discardClear")return Ft||(an=Fi(),_t(),wt(),We.click()),!0;const s=Ys(i,"plenty:");if(s)return pE(s),!0;const r=Ys(i,"mono:");if(r)return mE(r),!0;const o=Ys(i,"playDev:");if(o!=null)return ye="actions",no("playDev",o),!0;const a=SE(i);return a!=null?(Tr(a),!0):!1}function _E(){if(!A||!A.isHuman()){$e.clearHighlights();return}const i=A.current,e=Ca();if(e==="settlement"){const t=A.phase===F.SETUP_SETTLEMENT;$e.showVertices(A.validSettlements(i,{setup:t})),$e.showEdges([]),$e.showHexes([])}else if(e==="city")$e.showVertices(A.validCities(i)),$e.showEdges([]),$e.showHexes([]);else if(e==="road")$e.showVertices([]),$e.showEdges(A.validRoads(i,{setup:A.phase===F.SETUP_ROAD,free:A.phase===F.FREE_ROADS})),$e.showHexes([]);else if(e==="robber")$e.showVertices([]),$e.showEdges([]),$e.showHexes(A.board.land.filter(t=>t.id!==A.board.robberHex).map(t=>t.id));else if(A.phase===F.MAIN){const t=[];A.canAfford(i,"settlement")&&t.push(...A.validSettlements(i)),A.canAfford(i,"city")&&t.push(...A.validCities(i)),$e.showVertices(t),$e.showEdges(A.canAfford(i,"road")?A.validRoads(i):[]),$e.showHexes([])}else $e.clearHighlights()}function lh(i){return Cl.setFromRotationMatrix(i.matrixWorld),Td.setFromQuaternion(Cl,"YXZ"),Td.y}function Di(i,e=Oi){var n;const t=(n=i.joints)==null?void 0:n["index-finger-tip"];return t?t.getWorldPosition(e):i.getWorldPosition(e),e}function xE(i,e=.16){Di(i,Oi);let t=null,n=e;for(const s of[on.left,on.right]){if(on.isStuck(s))continue;const r=Oi.distanceTo(s.position);r<n&&(n=r,t=s)}return t}function mp(i){var t,n,s;if(un.has(i))return!0;let e=xE(i);if(!e){const r=new P().setFromMatrixPosition(i.matrixWorld),o=new P(0,0,-1).transformDirection(i.matrixWorld);$t.set(r,o),e=(s=(n=(t=$t.intersectObjects(on.pickables(),!0)[0])==null?void 0:t.object)==null?void 0:n.userData)==null?void 0:s.handleRoot,e&&on.isStuck(e)&&(e=null)}return e?(Di(i,Oi),un.set(i,{handle:e,offset:ct.position.clone().sub(Oi),yaw0:lh(i),stageYaw0:ct.rotation.y}),on.stick(e,i),Gn=un.size===2?gp():null,We.click(),!0):!1}function gp(){const[i,e]=un.keys();return Di(i,si),Di(e,ri),{startDist:Math.max(.08,si.distanceTo(ri)),startScale:ct.scale.x,startYaw:Math.atan2(ri.x-si.x,ri.z-si.z),startStageYaw:ct.rotation.y,startMid:si.clone().add(ri).multiplyScalar(.5),startPos:ct.position.clone()}}function _p(i){const e=un.get(i);if(e&&on.unstick(e.handle),un.delete(i),Gn=null,un.size===1){const[t,n]=un.entries().next().value;Di(t,Oi),n.offset=ct.position.clone().sub(Oi),n.yaw0=lh(t),n.stageYaw0=ct.rotation.y}}function vE(){if(un.size===2){Gn||(Gn=gp());const[i,e]=un.keys();Di(i,si),Di(e,ri);const t=Math.max(.08,si.distanceTo(ri)),s=Math.atan2(ri.x-si.x,ri.z-si.z)-Gn.startYaw,r=Math.min(2.4,Math.max(.45,Gn.startScale*(t/Gn.startDist))),o=r/Gn.startScale;ct.scale.setScalar(r),ct.rotation.y=Gn.startStageYaw+s,Ad.copy(si).add(ri).multiplyScalar(.5),Zo.copy(Gn.startPos).sub(Gn.startMid).multiplyScalar(o).applyAxisAngle(wd,s),ct.position.copy(Ad).add(Zo);return}for(const[i,e]of un){Di(i,Oi);const t=lh(i)-e.yaw0;Zo.copy(e.offset).applyAxisAngle(wd,t),ct.position.copy(Oi).add(Zo),ct.rotation.y=e.stageYaw0+t}}function yE(){const i=document.getElementById("spot-layer");if(!i)return;const e=be.xr.isPresenting;for(const o of $e.vertexMarkers.values())for(const a of o.children)a.visible=o.visible&&(e||o===$e.hoverObj);if(!A||e){i.childElementCount&&i.replaceChildren();return}const t=[];for(const[o,a]of $e.vertexMarkers)a.visible&&t.push([o,a]);i.childElementCount!==t.length&&i.replaceChildren(...t.map(([o])=>{const a=document.createElement("button");return a.type="button",a.className="spot",a.dataset.vertex=o,a.setAttribute("aria-label","Place here"),a}));const n=innerWidth,s=innerHeight,r=i.children;for(let o=0;o<t.length;o++){const[a,c]=t[o];c.getWorldPosition(Ki),Ki.project(kt);const l=r[o];l.dataset.vertex!==a&&(l.dataset.vertex=a);const h=Ki.z>-1&&Ki.z<1&&Math.abs(Ki.x)<=1.2&&Math.abs(Ki.y)<=1.2;l.style.display=h?"block":"none",l.style.transform=`translate(${Ki.x*.5*n+n*.5-9}px, ${-Ki.y*.5*s+s*.5-9}px)`}}function ME(){return!!(A&&!Ft&&A.isHuman()&&A.phase===F.ROLL)}function xp(){return!A||Ft||!A.isHuman()||A.phase===F.SETUP_SETTLEMENT||A.phase===F.SETUP_ROAD?"Not your roll":"Already rolled"}function Da(){const i=[...on.pickables(),...rs.pickables(),...ai.pickables()];Vt()&&i.push(...Ue.pickables());for(const e of $e.vertexMarkers.values())e.visible&&i.push(e);for(const e of $e.edgeMarkers.values())e.visible&&i.push(e);for(const e of $e.hexMarkers.values())e.visible&&e.material.opacity>0&&i.push(e);if(A&&Ca()==="robber"){for(const e of $e.hexMeshes.values())i.push(e);for(const e of $e.tokenMeshes.values())i.push(e)}return i}function SE(i){return typeof i!="string"||!i.startsWith("steal:")?null:Number(i.slice(6))}function vp(){const i=Sr(A);i&&(Un(i,qf,{low:!0}),Vt()&&fo.spawn(i,Ue.stealFloatWorldPos(hp),Sb))}function Tr(i){return!A||Ft||A.phase!==F.STEAL||!A.isHuman()||!A.steal(Number(i))?!1:(Ct(),Oe=!1,We.click(),vp(),Ut(),!0)}function hh(i){if(!i)return;const e=i.userData;if(e.kind==="dice"||e.kind==="tray"&&e.action==="roll"){ME()?(e.kind==="tray"&&Ue.flashPress("roll"),no("roll")):qs(xp(),i);return}if(e.kind==="tray"){if(e.disabled&&!lp.has(e.action)){A&&Nd()&&Wb.has(e.action)&&(Ue.flashPress(e.action),qs(yp(e.action),i));return}if(Ue.flashPress(e.action),gE(e.action)||!A||e.disabled)return;no(e.action);return}if(e.kind==="avatar"){Tr(e.id);return}if(A&&Nd()){if(e.kind==="vertex"){const t=Ca();if(!(t==="city"?A.placeCity(e.id):t==="settlement"?A.placeSettlement(e.id):A.placeCity(e.id)||A.placeSettlement(e.id))){qs(bE(e.id,t),i);return}$e.flashPick(i),We.place(),fr=null,Ut()}else if(e.kind==="edge"){if(!A.placeRoad(e.id)){qs(A.whyNotRoad(e.id),i);return}$e.flashPick(i),We.place(),fr=null,Ut()}else if(e.kind==="hex"){if(!A.moveRobber(e.id))return;$e.flashPick(i),We.place(),A.phase!==F.STEAL&&Un("No neighbor to steal from.",qf),Ut()}}}function yp(i){return i==="road"?A.whyNotRoad():i==="settlement"?A.whyNotSettlement():i==="city"?A.whyNotCity():i==="dev"||i==="cards"?A.whyNotDev():"Can't build"}function bE(i,e){var n;if(e==="city")return A.whyNotCity(i);if(e==="settlement")return A.whyNotSettlement(i);const t=A.board.vertices.get(i);return((n=t==null?void 0:t.building)==null?void 0:n.player)===A.current&&t.building.type==="settlement"?A.whyNotCity(i):A.whyNotSettlement(i)}function EE(i,e){const t=(i==null?void 0:i.userData)||{};if(t.kind==="vertex"){const n=$e.vertexMarkers.get(t.id);if(n)return n.getWorldPosition(e)}if(t.kind==="edge"){const n=$e.edgeMarkers.get(t.id);if(n)return n.getWorldPosition(e)}if(t.kind==="hex"){const n=$e.hexMarkers.get(t.id)||$e.hexMeshes.get(t.id);if(n)return n.getWorldPosition(e)}return t.kind==="dice"?(i!=null&&i.isObject3D?i:ai.group).getWorldPosition(e):t.kind==="tray"||t.action?Ue.buttonWorldPos(t.action,e):i!=null&&i.isObject3D?i.getWorldPosition(e):Ue.group.getWorldPosition(e)}function qs(i,e){const t=String(i||"").trim();t&&(We.bad(),Vt()?fo.spawn(t,EE(e,hp)):Un(t))}function Ia(i){var r;if(!i.length)return null;if(((r=i[0].object.userData)==null?void 0:r.kind)==="dice")return i[0].object;const e=i.find(o=>{var a;return((a=o.object.userData)==null?void 0:a.kind)==="tray"});if(e)return e.object;const t=i.find(o=>{var a;return((a=o.object.userData)==null?void 0:a.kind)==="avatar"});if(t)return t.object;const n=i.find(o=>{var a;return(a=o.object.userData)==null?void 0:a.handleRoot});if(n)return n.object;const s=i.find(o=>{var a;return((a=o.object.userData)==null?void 0:a.kind)==="vertex"});return s?s.object:i[0].object}function TE(){$t.setFromCamera(eo,kt),hh(Ia($t.intersectObjects(Da(),!0)))}function aa(i,e){return $t.set(i,e),Ia($t.intersectObjects(Da(),!0))}function uh(){var e,t;const i=(t=(e=be.xr).getSession)==null?void 0:t.call(e);return i?[...i.inputSources]:[]}function Na(i){const e=i==null?void 0:i.targetRayMode;return e==="transient-pointer"||e==="gaze"}function po(i){const e=i==null?void 0:i.targetRayMode;return e==="tracked-pointer"||e==="transient-pointer"}function mo(i){var t;if(!i)return!1;const e=(t=i.userData)==null?void 0:t.inputSource;return!e||po(e)}function Mp(){if(Zr)return!0;const i=navigator.userAgent||"";if(/visionOS|Apple Vision/i.test(i))return!0;const e=/Safari/.test(i)&&!/Chrome|Chromium|Android|Edg|Firefox|OPR/.test(i);return!!(navigator.xr&&e&&/Macintosh|Apple Vision|iPad|iPhone/.test(i))}function Ua(){return uh().some(i=>i.targetRayMode==="tracked-pointer")}function AE(i){var n,s;if(!i||i.targetRayMode!=="tracked-pointer")return!1;if((i.profiles||[]).some(r=>/oculus|meta|quest/i.test(r)))return!0;const t=i.gamepad;return!!(t&&(t.mapping==="xr-standard"||(n=t.axes)!=null&&n.length||(s=t.buttons)!=null&&s.length))}function Sp(){return uh().some(AE)}function Cn(){return be.xr.isPresenting?An==="gaze"?!0:!(Sp()||Ua()&&!Mp()):!1}function wE(i){var e,t;return(i==null?void 0:i.frame)||((t=(e=be.xr).getFrame)==null?void 0:t.call(e))||null}function dh(i){return(i==null?void 0:i.inputSource)||(i==null?void 0:i.data)||null}function fh(i,e){var n,s;const t=((s=(n=be.xr).getCamera)==null?void 0:s.call(n))||kt;t.updateMatrixWorld(),t.getWorldPosition(i),t.getWorldDirection(e),Zn&&(Rd.setFromMatrixColumn(t.matrixWorld,0).normalize(),e.applyAxisAngle(Rd,Yl.degToRad(Zn)).normalize())}function bp(i,e,t){var s;i.setFromMatrixPosition(t.matrixWorld);const n=(s=t.joints)==null?void 0:s["index-finger-tip"];n&&n.getWorldPosition(i),e.set(0,0,-1).transformDirection(t.matrixWorld)}function Ep(i,e,t,n){var c,l;const s=(l=(c=be.xr).getReferenceSpace)==null?void 0:l.call(c);if(!n||!(t!=null&&t.targetRaySpace)||!s)return!1;let r=null;try{r=n.getPose(t.targetRaySpace,s)}catch{return!1}if(!r)return!1;const{position:o,orientation:a}=r.transform;return i.set(o.x,o.y,o.z),e.set(0,0,-1).applyQuaternion(Cl.set(a.x,a.y,a.z,a.w)),e.normalize(),!0}function Tp(i,e,t,n){if(Cn())return fh(i,e),!0;const s=dh(t);return po(s)&&Ep(i,e,s,wE(t))?!0:n&&mo(n)?(bp(i,e,n),!0):!1}function Ap(i,e){if(!Tp($n,Tn,i,e))return Cn()?ga:null;const t=aa($n,Tn);return t||(Cn()?ga:null)}function ph(i,e){if(!Ec[i]){Ec[i]=!0;try{e()}finally{queueMicrotask(()=>{Ec[i]=!1})}}}function wp(i){return!!(Cn()||An==="gaze"||Na(i)||!Ua())}function Rp(i){const e=performance.now()-ap;return e<80?!0:wp(i)?e<Vb:!1}function Cp(){ap=performance.now()}function RE(i,e){return!(!e||Na(i)||!Ua()&&(Zr||Mp()))}function Pp(i,e){const t=dh(i);return!Cn()&&!po(t)&&!mo(e)||Rp(t)||e&&un.has(e)&&!Na(t)?!1:(Cp(),hh(Ap(i,e)),!0)}function Dl(i,e){ph("selectstart",()=>{var s;const t=dh(i);if(!Cn()&&!po(t)&&!mo(e)||RE(t,e)&&(mp(e),un.has(e)))return;const n=Ap(i,e);((s=n==null?void 0:n.userData)==null?void 0:s.kind)==="tray"&&!n.userData.disabled&&Ue.setPressed(n.userData.action),wp(t)&&Pp(i,e)})}function Il(i,e){ph("select",()=>{Pp(i,e)})}function Nl(i){ph("selectend",()=>{i&&_p(i),Ue.setPressed(null)})}function Lp(i){Dl(i,null)}function Dp(i){Il(i,null)}function Ip(){Nl(null)}function Ul(i){var n,s;const e=(i==null?void 0:i.target)||((s=(n=be.xr).getSession)==null?void 0:s.call(n));if(!e)return;for(const r of e.inputSources)Na(r)&&(Zr=!0);const t=Math.max(cp,e.inputSources.length);for(let r=0;r<t;r++)be.xr.getController(r);Ii()}function CE(i){!i||Jr===i||(Ol(),i.addEventListener("select",Dp),i.addEventListener("selectstart",Lp),i.addEventListener("selectend",Ip),i.addEventListener("inputsourceschange",Ul),Jr=i,Ul({target:i}))}function Ol(){const i=Jr;i&&(i.removeEventListener("select",Dp),i.removeEventListener("selectstart",Lp),i.removeEventListener("selectend",Ip),i.removeEventListener("inputsourceschange",Ul),Jr=null)}function PE(){const i=[ct];return on.group.visible&&i.push(on.group),i}function LE(i){var t,n,s;if(!i||i.isLine||i.isPoints||i.isSprite||(t=i.userData)!=null&&t.pointerLaser)return!0;const e=i.material;if(e&&(Array.isArray(e)?e:[e]).every(o=>o&&o.transparent&&o.opacity<.02)||(n=i.userData)!=null&&n.gazeHitDot)return!0;for(let r=i;r;r=r.parent)if(r===dr||r===Ti||r===ii.mesh||(s=r.userData)!=null&&s.pointerLaser)return!0;return!1}function Np(i,e){const t=-Math.min(wa,Math.max(.02,e)),n=i.geometry.attributes.position;n.getZ(1)!==t&&(n.setZ(1,t),n.needsUpdate=!0,i.geometry.computeBoundingSphere())}function mh(i,e,t=wa){const n=$t.near,s=$t.far;$t.near=0,$t.far=t,$t.set(i,e);const r=$t.intersectObjects(PE(),!0);$t.near=n,$t.far=s;for(const o of r)if(!LE(o.object))return o;return null}function Up(i,e){const t=mh(i,e);return t?Math.max(.02,t.distance-Gb):wa}function DE(){if(ci)for(const i of oh){const e=i.userData.laser;e&&($n.setFromMatrixPosition(i.matrixWorld),Tn.set(0,0,-1).transformDirection(i.matrixWorld).normalize(),Np(e,Up($n,Tn)))}}function Bd(i,e){var t,n,s;return((t=i==null?void 0:i.userData)==null?void 0:t.kind)==="tray"||((n=i==null?void 0:i.userData)==null?void 0:n.kind)==="dice"||(s=i==null?void 0:i.userData)!=null&&s.handleRoot?{obj:i,done:!0}:i&&!e?{obj:i,done:!1}:{obj:e,done:!1}}function IE(){var e,t;let i=null;if(be.xr.isPresenting){if(DE(),Cn())fh($n,Tn),i=aa($n,Tn);else{const n=((t=(e=be.xr).getFrame)==null?void 0:t.call(e))||null;for(const s of uh()){if(!po(s)||!Ep($n,Tn,s,n))continue;const r=Bd(aa($n,Tn),i);if(i=r.obj,r.done)break}if(!i)for(const s of oh){if(!s.visible||!mo(s))continue;bp($n,Tn,s);const r=Bd(aa($n,Tn),i);if(i=r.obj,r.done)break}}ga=i}else $t.setFromCamera(eo,kt),i=Ia($t.intersectObjects(Da(),!0)),io&&(i={userData:{kind:"vertex",id:io}});FE(),Ue.setHover(i),on.setHover(i),rs.setHover(i),$e.setHover(i),ai.setHover(i)}function NE(){const i=new nS,e=new oS;e.setPath("https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles");const t=new Sa({color:16770736}),n=[];for(let s=0;s<cp;s++){const r=be.xr.getController(s),o=new Qt().setFromPoints([new P(0,0,0),new P(0,0,-wa)]),a=new oo(o,t);if(a.userData.pointerLaser=!0,r.userData.laser=a,r.add(a),r.addEventListener("selectstart",c=>{Dl(c,r)}),r.addEventListener("selectend",()=>{Nl(r)}),r.addEventListener("select",c=>{Il(c,r)}),r.addEventListener("squeezestart",()=>{mp(r)||(A==null?void 0:A.phase)===F.MAIN&&A.isHuman()&&!Ft&&no("end")}),r.addEventListener("squeezeend",()=>{_p(r)}),Fn.add(r),s<2){const c=be.xr.getControllerGrip(s);c.add(i.createControllerModel(c)),Fn.add(c);const l=be.xr.getHand(s);l.add(e.createHandModel(l,"mesh")),l.addEventListener("pinchstart",()=>{var d,p,g;const u={inputSource:((d=l.userData)==null?void 0:d.inputSource)||null,frame:(g=(p=be.xr).getFrame)==null?void 0:g.call(p)};Dl(u,l),Il(u,l)}),l.addEventListener("pinchend",()=>Nl(l)),Fn.add(l)}n.push(r)}return n}function UE(){const i=new Ze,e=new ie(new co(.0055,.0088,16),new rt({color:16769162,side:Jt,depthTest:!1,depthWrite:!1,toneMapped:!1})),t=new ie(new ao(.0032,8),new rt({color:16775388,depthTest:!1,depthWrite:!1,toneMapped:!1}));return e.renderOrder=26,t.renderOrder=27,i.add(e,t),i.position.set(0,0,-.5),i.renderOrder=25,i.frustumCulled=!1,i.visible=!1,kt.add(i),i}function OE(){const i=new Ze;i.userData.gazeHitDot=!0;const e=new ie(new jt(.005,8,6),new rt({color:16775388,toneMapped:!1,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})),t=new ie(new jt(.009,8,6),new rt({color:16769162,toneMapped:!1,depthWrite:!1,transparent:!0,opacity:.9,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));return e.renderOrder=29,t.renderOrder=28,e.frustumCulled=!1,t.frustumCulled=!1,i.add(t,e),i.frustumCulled=!1,i.visible=!1,Fn.add(i),i}function Op(i){return i?(Ti.position.copy(i.point),i.normal&&i.normal.lengthSq()>1e-8?(Jo.copy(i.normal).normalize(),Jo.dot(Tn)>0&&Jo.negate(),Ti.position.addScaledVector(Jo,Pd)):Ti.position.addScaledVector(Tn,-Pd),Ti.visible=!0,!0):(Ti.visible=!1,!1)}function FE(){if(!be.xr.isPresenting||!Cn()){Ti.visible=!1;return}Op(mh($n,Tn))}function kd(i){if(!i||dr.parent===i){Ii();return}i.add(dr),Ii()}function BE(i){An=i==="gaze"?"gaze":"controller";try{localStorage.setItem("catan-pointer-mode",An)}catch{}Ii(),(Cn()||An==="gaze")&&(Un("Point with your view, pinch to select."),be.xr.isPresenting&&ii.set("Point with your view, pinch to select."))}function Ii(){const i=Cn();dr&&(dr.visible=!1),(!be.xr.isPresenting||!i)&&(Ti.visible=!1);for(const e of oh){const t=e.userData.laser;t&&(t.visible=ci&&An!=="gaze"&&!i&&!!e.visible&&mo(e))}}function kE(i){ci=!!i;try{localStorage.setItem("catan-pointer-lines",ci?"1":"0")}catch{}Ii()}function zE(i){sn=!!i,Te.antialias=sn,ma.antialias=sn;try{localStorage.setItem("catan-antialias",sn?"1":"0")}catch{}HE()}function HE(){try{const i=be.getRenderTarget();i&&"samples"in i&&(i.samples=sn?4:0)}catch{}}function ca(i){Wn=!!i,rh.room.visible=!Wn,Fn.background=Wn?null:op,Fn.fog=Wn?null:new Ma("#1b140f",6,12),be.setClearColor(Wn?0:1774607,Wn?0:1),be.setClearAlpha(Wn?0:1)}function la(i){be.xr.setFramebufferScaleFactor(Te.framebufferScale),ma.antialias=sn,NS(be,rh.sun,{enabled:i?Te.xrShadows:Te.shadows,size:i?Te.xrShadowSize:Te.shadowSize})}function VE(){on.setVisible(As&&be.xr.isPresenting)}function Fp(){ct.position.set(0,0,Aa)}function GE(){er=!0,tr=0,Qr=!1}function WE(){return ct.position.y+Mn*Math.max(1e-4,ct.scale.y)}function Bp(i){const e=Math.min(Rl,Math.max(.35,Hb));return Math.max(i-e,i-Rl)}function kp(i){const e=Math.max(1e-4,ct.scale.y),t=Bp(i);ct.position.set(0,t-Mn*e,Aa)}function XE(i){const e=i-Rl,t=WE();return t+1e-4>=e?!1:(ct.position.y+=Bp(i)-t,!0)}function $E(){var t,n,s,r;const i=(n=(t=be.xr).getFrame)==null?void 0:n.call(t),e=(r=(s=be.xr).getReferenceSpace)==null?void 0:r.call(s);if(i&&e)try{const o=i.getViewerPose(e);if(o){const a=o.transform.position;return{x:a.x,y:a.y,z:a.z}}}catch{}return null}function YE(i){if(!i||!Number.isFinite(i.y))return!1;const e=Math.abs(i.x),t=Math.abs(i.y),n=Math.abs(i.z);return!(e<bc&&t<bc&&n<bc)}function jE(i){var t,n;if(i&&Number.isFinite(i.y))return i.y;const e=(n=(t=be.xr).getCamera)==null?void 0:n.call(t);return e!=null&&e.position&&Number.isFinite(e.position.y)?e.position.y:0}function zp(){if(!be.xr.isPresenting||Qr)return;if(un.size){Qr=!0,er=!1;return}tr++;const i=$E(),e=YE(i);if(!e&&tr<Ed)return;const t=jE(i);er?(kp(t),(e||tr>=Ed)&&(er=!1)):XE(t)}async function qE(i){const e=["local-floor","bounded-floor","local"];for(const t of e)try{return await i.requestReferenceSpace(t),Cd=t,be.xr.setReferenceSpaceType(t),t}catch{}return Cd="local",be.xr.setReferenceSpaceType("local"),"local"}be.xr.addEventListener("sessionstart",()=>{GE(),Bi(),_t(),wt()});be.xr.addEventListener("sessionend",()=>{er=!1,tr=0,Qr=!1,ga=null,Fp(),Bi()});function KE(){if(Bi(),!Vt()){if(ye==="settings"||ye==="pointerTilt"){so();return}if(ye==="restartConfirm"){Oe=!0,sp(i=>{if(Oe=!1,i){cs();return}ye="settings",so()});return}if(ye==="scores"&&A&&!La()){Oe=!0,ch();return}if((A==null?void 0:A.phase)===F.GAME_OVER){Oe=!0,ip(A,{onPlayAgain:()=>cs(),onMainMenu:()=>ah()});return}ZE()}}function ZE(){if(!(!A||Vt())){if(A.phase===F.DISCARD&&Er()){Oe=!0,Jf(A,(e,t)=>{Oe=!1,an=Fi(),ws="",A.discard(e,t),Ut()})||(Oe=!1);return}if(A.phase===F.STEAL&&A.isHuman()){Oe=!0,Qf(A,i=>{Tr(i)});return}if(A.phase===F.PLENTY&&A.isHuman()){Oe=!0,ep((i,e)=>{Oe=!1,On=[],A.yearOfPlenty(i,e),Ut()});return}A.phase===F.MONOPOLY&&A.isHuman()&&(Oe=!0,tp(i=>{Oe=!1,A.monopoly(i),Ut()}))}}async function zd(i,e){const t={requiredFeatures:["local-floor"],optionalFeatures:[...Pl,"dom-overlay","hit-test","plane-detection"],domOverlay:{root:e}},n={optionalFeatures:[...Pl]};try{return await navigator.xr.requestSession(i,t)}catch{return navigator.xr.requestSession(i,n)}}async function JE(){var n,s,r,o;if(We.unlock(),!navigator.xr){Un("WebXR is not available in this browser.");return}const i=document.getElementById("overlay-root")||document.getElementById("hud"),e=await((s=(n=navigator.xr).isSessionSupported)==null?void 0:s.call(n,"immersive-ar")),t=await((o=(r=navigator.xr).isSessionSupported)==null?void 0:o.call(r,"immersive-vr"));try{let a=null,c=!1;if(e)try{a=await zd("immersive-ar",i),c=!0}catch{a=null}if(!a&&t&&(a=await zd("immersive-vr",i)),!a){Un("This browser has no AR or VR session.");return}await qE(a),la(!0),ca(c),on.setVisible(As),document.documentElement.classList.add("xr-presenting"),Ct(),CE(a),await be.xr.setSession(a),Bi(),_t(),wt(),Ii(),(Cn()||An==="gaze")&&Un("Point with your view, pinch to select."),a.addEventListener("end",()=>{Ol(),Zr=!1,un.clear(),er=!1,tr=0,Qr=!1,Fp(),on.setVisible(!1),la(!1),ca(!1),document.documentElement.classList.remove("xr-presenting"),Ii(),KE(),Hp()})}catch{Ol(),Zr=!1,Un("Could not start a mixed-reality session."),on.setVisible(!1),la(!1),ca(!1),document.documentElement.classList.remove("xr-presenting"),Ii(),Bi()}}async function Hp(){var n,s,r,o;const i=document.getElementById("vr-btn"),e=navigator.xr&&await((s=(n=navigator.xr).isSessionSupported)==null?void 0:s.call(n,"immersive-ar")),t=navigator.xr&&await((o=(r=navigator.xr).isSessionSupported)==null?void 0:o.call(r,"immersive-vr"));e?(i.textContent="Enter MR",i.disabled=!1):t?(i.textContent="Enter VR",i.disabled=!1):(i.textContent="MR unavailable",i.disabled=!0)}function QE(){return!A||A.phase===F.GAME_OVER?!1:A.phase===F.DISCARD?A.discardQueue.some(i=>A.player(i.player).isAI):A.player().isAI}async function Ut(){const i=A;ki();try{await eT()}finally{if(A!==i)return;ki(),Vp()}}function Tc(){if(!A||A.phase!==F.DISCARD)return;let i=0;for(;A.discardQueue.some(e=>A.player(e.player).isAI)&&i++<8&&zf(A););}async function eT(){var e,t;const i=A;if(i){Ft=!0;try{Tc();let n=0,s=null;for(;QE()&&n++<80;){if(await Ac(i.phase===F.MAIN||i.phase===F.ROLL?700:220),A!==i)return;const r=zf(i),o=i.lastAction;if((o==null?void 0:o.type)==="roll"&&o!==s){s=o,ai.placeFor(i.current,i.playerCount),ai.rollTo(i.dice),We.dice(),(e=o.production)!=null&&e.length&&Gp(o.production),Tc(),ki();const a=(t=o.production)!=null&&t.length?Math.min(4500,Math.max(750,Math.ceil(uo.timeLeft()*1e3))):650;if(await Ac(a),A!==i)return}else if(Tc(),ki(),(o==null?void 0:o.type)==="steal"&&i.lastSteal&&(vp(),await Ac(1800),A!==i))return;if(!r)break}}finally{A===i&&(Ft=!1)}}}function Vp(){if(!A)return;const i=Vt();if(A.phase===F.GAME_OVER){We.win(),Oe=!0,fp(),i||ip(A,{onPlayAgain:()=>cs(),onMainMenu:()=>ah()}),_t(),wt();return}if(A.phase===F.DISCARD&&Er()){Oe=!0,Pa(),i||Jf(A,(t,n)=>{Oe=!1,an=Fi(),ws="",A.discard(t,n),Ut()})||(Oe=!1),_t(),wt();return}if(A.phase===F.STEAL&&A.isHuman()){Oe=!0,i||Qf(A,e=>{Tr(e)});return}if(A.phase===F.PLENTY&&A.isHuman()){Oe=!0,On=[],i||ep((e,t)=>{Oe=!1,On=[],A.yearOfPlenty(e,t),Ut()}),_t(),wt();return}A.phase===F.MONOPOLY&&A.isHuman()&&(Oe=!0,i||tp(e=>{Oe=!1,A.monopoly(e),Ut()}),_t(),wt())}function tT(){kt.aspect=innerWidth/innerHeight,kt.updateProjectionMatrix(),be.setSize(innerWidth,innerHeight)}function Gp(i){var t;const e=i??(((t=A==null?void 0:A.lastAction)==null?void 0:t.type)==="roll"?A.lastAction.production:null);!A||!(e!=null&&e.length)||uo.play(e,{board:A.board,players:A.players,playerCount:A.playerCount})}function Ac(i){return new Promise(e=>setTimeout(e,i))}window.__catan={get game(){return A},get tray(){return Ue},get trayScreen(){return ye},get pointerMode(){return An},get pointerPitchDeg(){return Zn},get gazeReticle(){return dr},get gazeHitDot(){return Ti},fillGazeRay:fh,firstWorldHit:mh,placeGazeHitDot:Op,get xrOptionalFeatures(){return Pl},get xrSessionBound(){return Jr},get quality(){return Te},fillPickRay:Tp,isDuplicateXRSelect:Rp,markXRSelectHandled:Cp,applyStageTableSnap:kp,maybeSnapStageToTable:zp,pointerLaserHitDistance:Up,setLaserLength:Np,useHeadHover:Cn,hasPersistentPointer:Ua,hasTrackedController:Sp,afterAction:Ut,refresh:ki,presentModals:Vp,trySteal:Tr,formatRollResult:ho,formatStealResult:Sr};
