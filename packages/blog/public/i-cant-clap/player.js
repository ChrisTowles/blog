var HY={"24-the-steep-part":{created:"2026-10-18",clipId:"07f5e4e3-a486-4252-a738-9f85d4a00d7e"},"04-read-the-diff":{created:"2026-10-18",clipId:"b495a0e0-c645-48ca-a322-9b6ea0caea6d"},"25-data-here-data-there":{created:"2026-10-18",clipId:"d86ab5f4-1f37-463b-b918-03e32a65e6fb"},"02-never-again":{created:"2026-10-18",clipId:"9b171b5c-7667-4253-b9c7-99837a497e47"},"08-explain-the-function":{created:"2026-10-21",clipId:"461b0c36-6840-4f61-80ab-7e57990506da"},"30-ten-more-minutes":{created:"2026-10-22",clipId:"f7524181-adb0-4a84-b5e1-150eccebab9c"}},hO=Object.keys(HY),YY=(J)=>{let $=HY[J]?.created;return $?new Date(`${$}T12:00:00Z`).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}):""};var iY="186";var sY=0,uK=1,oY=2;var x$=1,gJ=2,i6=3,s6=0,L7=1,d9=2,J8=0,h$=1,M7=2,mK=3,dK=4,aY=5;var o6=100,rY=101,tY=102,eY=103,J5=104,$5=200,Q5=201,Z5=202,K5=203,U5=204,H5=205,Y5=206,W5=207,G5=208,N5=209,X5=210,q5=211,F5=212,D5=213,E5=214,O5=0,R5=1,M5=2,lK=3,V5=4,_5=5,B5=6,I5=7,z5=0,A5=1,L5=2,S8=0,g$=1,p$=2,u$=3,k8=4,m$=5,d$=6,l$=7;var a6=301,Z6=302,EZ=303,OZ=304,c$=306,a8=1000,RZ=1001,P5=1002,n7=1003,C5=1004;var n$=1005;var $8=1006,MZ=1007;var K6=1008;var j8=1009,T5=1010,w5=1011,i$=1012,cK=1013,pJ=1014,FJ=1015,P7=1016,nK=1017,iK=1018,r6=1020,S5=35902,k5=35899,j5=1021,v5=1022,r8=1023,U6=1026,H6=1027,f5=1028,sK=1029,Y6=1030,oK=1031;var aK=1033,VZ=33776,_Z=33777,BZ=33778,IZ=33779,rK=35840,tK=35841,eK=35842,JU=35843,$U=36196,QU=37492,ZU=37496,KU=37488,UU=37489,zZ=37490,HU=37491,YU=37808,WU=37809,GU=37810,NU=37811,XU=37812,qU=37813,FU=37814,DU=37815,EU=37816,OU=37817,RU=37818,MU=37819,VU=37820,_U=37821,BU=36492,IU=36494,zU=36495,AU=36283,LU=36284,AZ=36285,PU=36286;var CU=3201;var TU=0,y5=1,W6="",V7="srgb",wU="srgb-linear",SU="linear",r9="srgb";var b5=512,x5=513,h5=514,LZ=515,g5=516,p5=517,PZ=518,u5=519;var kU="300 es",jU=2000;function nG(J){for(let $=J.length-1;$>=0;--$)if(J[$]>=65535)return!0;return!1}function iG(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function k$(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function m5(){let J=k$("canvas");return J.style.display="block",J}var WY={},c6=null;function j$(...J){let $="THREE."+J.shift();if(c6)c6("log",$,...J);else console.log($,...J)}function d5(J){let $=J[0];if(typeof $==="string"&&$.startsWith("TSL:")){let Q=J[1];if(Q&&Q.isStackTrace)J[0]+=" "+Q.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function H9(...J){J=d5(J);let $="THREE."+J.shift();if(c6)c6("warn",$,...J);else{let Q=J[0];if(Q&&Q.isStackTrace)console.warn(Q.getError($));else console.warn($,...J)}}function N9(...J){J=d5(J);let $="THREE."+J.shift();if(c6)c6("error",$,...J);else{let Q=J[0];if(Q&&Q.isStackTrace)console.error(Q.getError($));else console.error($,...J)}}function J6(...J){let $=J.join(" ");if($ in WY)return;WY[$]=!0,H9(...J)}function l5(J,$,Q){return new Promise(function(Z,K){function U(){switch(J.clientWaitSync($,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:K();break;case J.TIMEOUT_EXPIRED:setTimeout(U,Q);break;default:Z()}}setTimeout(U,Q)})}var c5={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class DJ{addEventListener(J,$){if(this._listeners===void 0)this._listeners={};let Q=this._listeners;if(Q[J]===void 0)Q[J]=[];if(Q[J].indexOf($)===-1)Q[J].push($)}hasEventListener(J,$){let Q=this._listeners;if(Q===void 0)return!1;return Q[J]!==void 0&&Q[J].indexOf($)!==-1}removeEventListener(J,$){let Q=this._listeners;if(Q===void 0)return;let Z=Q[J];if(Z!==void 0){let K=Z.indexOf($);if(K!==-1)Z.splice(K,1)}}dispatchEvent(J){let $=this._listeners;if($===void 0)return;let Q=$[J.type];if(Q!==void 0){J.target=this;let Z=Q.slice(0);for(let K=0,U=Z.length;K<U;K++)Z[K].call(this,J);J.target=null}}}var u7=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],GY=1234567,d6=Math.PI/180,$6=180/Math.PI;function o8(){let J=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(u7[J&255]+u7[J>>8&255]+u7[J>>16&255]+u7[J>>24&255]+"-"+u7[$&255]+u7[$>>8&255]+"-"+u7[$>>16&15|64]+u7[$>>24&255]+"-"+u7[Q&63|128]+u7[Q>>8&255]+"-"+u7[Q>>16&255]+u7[Q>>24&255]+u7[Z&255]+u7[Z>>8&255]+u7[Z>>16&255]+u7[Z>>24&255]).toLowerCase()}function I9(J,$,Q){return Math.max($,Math.min(Q,J))}function vU(J,$){return(J%$+$)%$}function sG(J,$,Q,Z,K){return Z+(J-$)*(K-Z)/(Q-$)}function oG(J,$,Q){if(J!==$)return(Q-J)/($-J);else return 0}function T$(J,$,Q){return(1-Q)*J+Q*$}function aG(J,$,Q,Z){return T$(J,$,1-Math.exp(-Q*Z))}function rG(J,$=1){return $-Math.abs(vU(J,$*2)-$)}function tG(J,$,Q){if(J<=$)return 0;if(J>=Q)return 1;return J=(J-$)/(Q-$),J*J*(3-2*J)}function eG(J,$,Q){if(J<=$)return 0;if(J>=Q)return 1;return J=(J-$)/(Q-$),J*J*J*(J*(J*6-15)+10)}function JN(J,$){return J+Math.floor(Math.random()*($-J+1))}function $N(J,$){return J+Math.random()*($-J)}function QN(J){return J*(0.5-Math.random())}function ZN(J){if(J!==void 0)GY=J;let $=GY+=1831565813;return $=Math.imul($^$>>>15,$|1),$^=$+Math.imul($^$>>>7,$|61),(($^$>>>14)>>>0)/4294967296}function KN(J){return J*d6}function UN(J){return J*$6}function HN(J){return J>0&&Number.isInteger(J)&&2**Math.round(Math.log2(J))===J}function YN(J){return Math.pow(2,Math.ceil(Math.log(J)/Math.LN2))}function WN(J){return Math.pow(2,Math.floor(Math.log(J)/Math.LN2))}function GN(J,$,Q,Z,K){let{cos:U,sin:H}=Math,Y=U(Q/2),W=H(Q/2),G=U(($+Z)/2),N=H(($+Z)/2),q=U(($-Z)/2),X=H(($-Z)/2),F=U((Z-$)/2),R=H((Z-$)/2);switch(K){case"XYX":J.set(Y*N,W*q,W*X,Y*G);break;case"YZY":J.set(W*X,Y*N,W*q,Y*G);break;case"ZXZ":J.set(W*q,W*X,Y*N,Y*G);break;case"XZX":J.set(Y*N,W*R,W*F,Y*G);break;case"YXY":J.set(W*F,Y*N,W*R,Y*G);break;case"ZYZ":J.set(W*R,W*F,Y*N,Y*G);break;default:H9("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+K)}}function w8(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:case Uint8ClampedArray:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function o9(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}var fU={DEG2RAD:d6,RAD2DEG:$6,generateUUID:o8,clamp:I9,euclideanModulo:vU,mapLinear:sG,inverseLerp:oG,lerp:T$,damp:aG,pingpong:rG,smoothstep:tG,smootherstep:eG,randInt:JN,randFloat:$N,randFloatSpread:QN,seededRandom:ZN,degToRad:KN,radToDeg:UN,isPowerOfTwo:HN,ceilPowerOfTwo:YN,floorPowerOfTwo:WN,setQuaternionFromProperEuler:GN,normalize:o9,denormalize:w8};class q0{static{q0.prototype.isVector2=!0}constructor(J=0,$=0){this.x=J,this.y=$}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,$){return this.x=J,this.y=$,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let $=this.x,Q=this.y,Z=J.elements;return this.x=Z[0]*$+Z[3]*Q+Z[6],this.y=Z[1]*$+Z[4]*Q+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,$){return this.x=I9(this.x,J.x,$.x),this.y=I9(this.y,J.y,$.y),this}clampScalar(J,$){return this.x=I9(this.x,J,$),this.y=I9(this.y,J,$),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(I9(Q,J,$))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(I9(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y;return $*$+Q*Q}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this}rotateAround(J,$){let Q=Math.cos($),Z=Math.sin($),K=this.x-J.x,U=this.y-J.y;return this.x=K*Q-U*Z+J.x,this.y=K*Z+U*Q+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class v8{constructor(J=0,$=0,Q=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=$,this._z=Q,this._w=Z}static slerpFlat(J,$,Q,Z,K,U,H){let Y=Q[Z+0],W=Q[Z+1],G=Q[Z+2],N=Q[Z+3],q=K[U+0],X=K[U+1],F=K[U+2],R=K[U+3];if(N!==R||Y!==q||W!==X||G!==F){let M=Y*q+W*X+G*F+N*R;if(M<0)q=-q,X=-X,F=-F,R=-R,M=-M;let D=1-H;if(M<0.9995){let E=Math.acos(M),I=Math.sin(E);D=Math.sin(D*E)/I,H=Math.sin(H*E)/I,Y=Y*D+q*H,W=W*D+X*H,G=G*D+F*H,N=N*D+R*H}else{Y=Y*D+q*H,W=W*D+X*H,G=G*D+F*H,N=N*D+R*H;let E=1/Math.sqrt(Y*Y+W*W+G*G+N*N);Y*=E,W*=E,G*=E,N*=E}}J[$]=Y,J[$+1]=W,J[$+2]=G,J[$+3]=N}static multiplyQuaternionsFlat(J,$,Q,Z,K,U){let H=Q[Z],Y=Q[Z+1],W=Q[Z+2],G=Q[Z+3],N=K[U],q=K[U+1],X=K[U+2],F=K[U+3];return J[$]=H*F+G*N+Y*X-W*q,J[$+1]=Y*F+G*q+W*N-H*X,J[$+2]=W*F+G*X+H*q-Y*N,J[$+3]=G*F-H*N-Y*q-W*X,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,$,Q,Z){return this._x=J,this._y=$,this._z=Q,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,$=!0){let{_x:Q,_y:Z,_z:K,_order:U}=J,H=Math.cos,Y=Math.sin,W=H(Q/2),G=H(Z/2),N=H(K/2),q=Y(Q/2),X=Y(Z/2),F=Y(K/2);switch(U){case"XYZ":this._x=q*G*N+W*X*F,this._y=W*X*N-q*G*F,this._z=W*G*F+q*X*N,this._w=W*G*N-q*X*F;break;case"YXZ":this._x=q*G*N+W*X*F,this._y=W*X*N-q*G*F,this._z=W*G*F-q*X*N,this._w=W*G*N+q*X*F;break;case"ZXY":this._x=q*G*N-W*X*F,this._y=W*X*N+q*G*F,this._z=W*G*F+q*X*N,this._w=W*G*N-q*X*F;break;case"ZYX":this._x=q*G*N-W*X*F,this._y=W*X*N+q*G*F,this._z=W*G*F-q*X*N,this._w=W*G*N+q*X*F;break;case"YZX":this._x=q*G*N+W*X*F,this._y=W*X*N+q*G*F,this._z=W*G*F-q*X*N,this._w=W*G*N-q*X*F;break;case"XZY":this._x=q*G*N-W*X*F,this._y=W*X*N-q*G*F,this._z=W*G*F+q*X*N,this._w=W*G*N+q*X*F;break;default:H9("Quaternion: .setFromEuler() encountered an unknown order: "+U)}if($===!0)this._onChangeCallback();return this}setFromAxisAngle(J,$){let Q=$/2,Z=Math.sin(Q);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos(Q),this._onChangeCallback(),this}setFromRotationMatrix(J){let $=J.elements,Q=$[0],Z=$[4],K=$[8],U=$[1],H=$[5],Y=$[9],W=$[2],G=$[6],N=$[10],q=Q+H+N;if(q>0){let X=0.5/Math.sqrt(q+1);this._w=0.25/X,this._x=(G-Y)*X,this._y=(K-W)*X,this._z=(U-Z)*X}else if(Q>H&&Q>N){let X=2*Math.sqrt(1+Q-H-N);this._w=(G-Y)/X,this._x=0.25*X,this._y=(Z+U)/X,this._z=(K+W)/X}else if(H>N){let X=2*Math.sqrt(1+H-Q-N);this._w=(K-W)/X,this._x=(Z+U)/X,this._y=0.25*X,this._z=(Y+G)/X}else{let X=2*Math.sqrt(1+N-Q-H);this._w=(U-Z)/X,this._x=(K+W)/X,this._y=(Y+G)/X,this._z=0.25*X}return this._onChangeCallback(),this}setFromUnitVectors(J,$){let Q=J.dot($)+1;if(Q<0.00000001)if(Q=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Q;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Q;else this._x=J.y*$.z-J.z*$.y,this._y=J.z*$.x-J.x*$.z,this._z=J.x*$.y-J.y*$.x,this._w=Q;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(I9(this.dot(J),-1,1)))}rotateTowards(J,$){let Q=this.angleTo(J);if(Q===0)return this;let Z=Math.min(1,$/Q);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,$){let{_x:Q,_y:Z,_z:K,_w:U}=J,H=$._x,Y=$._y,W=$._z,G=$._w;return this._x=Q*G+U*H+Z*W-K*Y,this._y=Z*G+U*Y+K*H-Q*W,this._z=K*G+U*W+Q*Y-Z*H,this._w=U*G-Q*H-Z*Y-K*W,this._onChangeCallback(),this}slerp(J,$){let{_x:Q,_y:Z,_z:K,_w:U}=J,H=this.dot(J);if(H<0)Q=-Q,Z=-Z,K=-K,U=-U,H=-H;let Y=1-$;if(H<0.9995){let W=Math.acos(H),G=Math.sin(W);Y=Math.sin(Y*W)/G,$=Math.sin($*W)/G,this._x=this._x*Y+Q*$,this._y=this._y*Y+Z*$,this._z=this._z*Y+K*$,this._w=this._w*Y+U*$,this._onChangeCallback()}else this._x=this._x*Y+Q*$,this._y=this._y*Y+Z*$,this._z=this._z*Y+K*$,this._w=this._w*Y+U*$,this.normalize();return this}slerpQuaternions(J,$,Q){return this.copy(J).slerp($,Q)}random(){let J=2*Math.PI*Math.random(),$=2*Math.PI*Math.random(),Q=Math.random(),Z=Math.sqrt(1-Q),K=Math.sqrt(Q);return this.set(Z*Math.sin(J),Z*Math.cos(J),K*Math.sin($),K*Math.cos($))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,$=0){return this._x=J[$],this._y=J[$+1],this._z=J[$+2],this._w=J[$+3],this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._w,J}fromBufferAttribute(J,$){return this._x=J.getX($),this._y=J.getY($),this._z=J.getZ($),this._w=J.getW($),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class v{static{v.prototype.isVector3=!0}constructor(J=0,$=0,Q=0){this.x=J,this.y=$,this.z=Q}set(J,$,Q){if(Q===void 0)Q=this.z;return this.x=J,this.y=$,this.z=Q,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,$){return this.x=J.x*$.x,this.y=J.y*$.y,this.z=J.z*$.z,this}applyEuler(J){return this.applyQuaternion(NY.setFromEuler(J))}applyAxisAngle(J,$){return this.applyQuaternion(NY.setFromAxisAngle(J,$))}applyMatrix3(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements;return this.x=K[0]*$+K[3]*Q+K[6]*Z,this.y=K[1]*$+K[4]*Q+K[7]*Z,this.z=K[2]*$+K[5]*Q+K[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements,U=1/(K[3]*$+K[7]*Q+K[11]*Z+K[15]);return this.x=(K[0]*$+K[4]*Q+K[8]*Z+K[12])*U,this.y=(K[1]*$+K[5]*Q+K[9]*Z+K[13])*U,this.z=(K[2]*$+K[6]*Q+K[10]*Z+K[14])*U,this}applyQuaternion(J){let $=this.x,Q=this.y,Z=this.z,K=J.x,U=J.y,H=J.z,Y=J.w,W=2*(U*Z-H*Q),G=2*(H*$-K*Z),N=2*(K*Q-U*$);return this.x=$+Y*W+U*N-H*G,this.y=Q+Y*G+H*W-K*N,this.z=Z+Y*N+K*G-U*W,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements;return this.x=K[0]*$+K[4]*Q+K[8]*Z,this.y=K[1]*$+K[5]*Q+K[9]*Z,this.z=K[2]*$+K[6]*Q+K[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,$){return this.x=I9(this.x,J.x,$.x),this.y=I9(this.y,J.y,$.y),this.z=I9(this.z,J.z,$.z),this}clampScalar(J,$){return this.x=I9(this.x,J,$),this.y=I9(this.y,J,$),this.z=I9(this.z,J,$),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(I9(Q,J,$))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,$){let{x:Q,y:Z,z:K}=J,U=$.x,H=$.y,Y=$.z;return this.x=Z*Y-K*H,this.y=K*U-Q*Y,this.z=Q*H-Z*U,this}projectOnVector(J){let $=J.lengthSq();if($===0)return this.set(0,0,0);let Q=J.dot(this)/$;return this.copy(J).multiplyScalar(Q)}projectOnPlane(J){return XK.copy(this).projectOnVector(J),this.sub(XK)}reflect(J){return this.sub(XK.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(I9(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y,Z=this.z-J.z;return $*$+Q*Q+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,$,Q){let Z=Math.sin($)*J;return this.x=Z*Math.sin(Q),this.y=Math.cos($)*J,this.z=Z*Math.cos(Q),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,$,Q){return this.x=J*Math.sin($),this.y=Q,this.z=J*Math.cos($),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this}setFromMatrixScale(J){let $=this.setFromMatrixColumn(J,0).length(),Q=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=$,this.y=Q,this.z=Z,this}setFromMatrixColumn(J,$){return this.fromArray(J.elements,$*4)}setFromMatrix3Column(J,$){return this.fromArray(J.elements,$*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,$=Math.random()*2-1,Q=Math.sqrt(1-$*$);return this.x=Q*Math.cos(J),this.y=$,this.z=Q*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var XK=new v,NY=new v8;class D9{static{D9.prototype.isMatrix3=!0}constructor(J,$,Q,Z,K,U,H,Y,W){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,$,Q,Z,K,U,H,Y,W)}set(J,$,Q,Z,K,U,H,Y,W){let G=this.elements;return G[0]=J,G[1]=Z,G[2]=H,G[3]=$,G[4]=K,G[5]=Y,G[6]=Q,G[7]=U,G[8]=W,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],this}extractBasis(J,$,Q){return J.setFromMatrix3Column(this,0),$.setFromMatrix3Column(this,1),Q.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let $=J.elements;return this.set($[0],$[4],$[8],$[1],$[5],$[9],$[2],$[6],$[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,Z=$.elements,K=this.elements,U=Q[0],H=Q[3],Y=Q[6],W=Q[1],G=Q[4],N=Q[7],q=Q[2],X=Q[5],F=Q[8],R=Z[0],M=Z[3],D=Z[6],E=Z[1],I=Z[4],C=Z[7],O=Z[2],B=Z[5],_=Z[8];return K[0]=U*R+H*E+Y*O,K[3]=U*M+H*I+Y*B,K[6]=U*D+H*C+Y*_,K[1]=W*R+G*E+N*O,K[4]=W*M+G*I+N*B,K[7]=W*D+G*C+N*_,K[2]=q*R+X*E+F*O,K[5]=q*M+X*I+F*B,K[8]=q*D+X*C+F*_,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[3]*=J,$[6]*=J,$[1]*=J,$[4]*=J,$[7]*=J,$[2]*=J,$[5]*=J,$[8]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],U=J[4],H=J[5],Y=J[6],W=J[7],G=J[8];return $*U*G-$*H*W-Q*K*G+Q*H*Y+Z*K*W-Z*U*Y}invert(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],U=J[4],H=J[5],Y=J[6],W=J[7],G=J[8],N=G*U-H*W,q=H*Y-G*K,X=W*K-U*Y,F=$*N+Q*q+Z*X;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/F;return J[0]=N*R,J[1]=(Z*W-G*Q)*R,J[2]=(H*Q-Z*U)*R,J[3]=q*R,J[4]=(G*$-Z*Y)*R,J[5]=(Z*K-H*$)*R,J[6]=X*R,J[7]=(Q*Y-W*$)*R,J[8]=(U*$-Q*K)*R,this}transpose(){let J,$=this.elements;return J=$[1],$[1]=$[3],$[3]=J,J=$[2],$[2]=$[6],$[6]=J,J=$[5],$[5]=$[7],$[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let $=this.elements;return J[0]=$[0],J[1]=$[3],J[2]=$[6],J[3]=$[1],J[4]=$[4],J[5]=$[7],J[6]=$[2],J[7]=$[5],J[8]=$[8],this}setUvTransform(J,$,Q,Z,K,U,H){let Y=Math.cos(K),W=Math.sin(K);return this.set(Q*Y,Q*W,-Q*(Y*U+W*H)+U+J,-Z*W,Z*Y,-Z*(-W*U+Y*H)+H+$,0,0,1),this}scale(J,$){return J6("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qK.makeScale(J,$)),this}rotate(J){return J6("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qK.makeRotation(-J)),this}translate(J,$){return J6("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qK.makeTranslation(J,$)),this}makeTranslation(J,$){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,$,0,0,1);return this}makeRotation(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,Q,$,0,0,0,1),this}makeScale(J,$){return this.set(J,0,0,0,$,0,0,0,1),this}equals(J){let $=this.elements,Q=J.elements;for(let Z=0;Z<9;Z++)if($[Z]!==Q[Z])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<9;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var qK=new D9,XY=new D9().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),qY=new D9().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function NN(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(K,U,H){if(this.enabled===!1||U===H||!U||!H)return K;if(this.spaces[U].transfer==="srgb")K.r=XJ(K.r),K.g=XJ(K.g),K.b=XJ(K.b);if(this.spaces[U].primaries!==this.spaces[H].primaries)K.applyMatrix3(this.spaces[U].toXYZ),K.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")K.r=l6(K.r),K.g=l6(K.g),K.b=l6(K.b);return K},workingToColorSpace:function(K,U){return this.convert(K,this.workingColorSpace,U)},colorSpaceToWorking:function(K,U){return this.convert(K,U,this.workingColorSpace)},getPrimaries:function(K){return this.spaces[K].primaries},getTransfer:function(K){if(K==="")return"linear";return this.spaces[K].transfer},getToneMappingMode:function(K){return this.spaces[K].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(K,U=this.workingColorSpace){return K.fromArray(this.spaces[U].luminanceCoefficients)},define:function(K){Object.assign(this.spaces,K)},_getMatrix:function(K,U,H){return K.copy(this.spaces[U].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(K){return this.spaces[K].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(K=this.workingColorSpace){return this.spaces[K].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(K,U){return J6("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(K,U)},toWorkingColorSpace:function(K,U){return J6("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(K,U)}},$=[0.64,0.33,0.3,0.6,0.15,0.06],Q=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:$,whitePoint:Z,transfer:"linear",toXYZ:XY,fromXYZ:qY,luminanceCoefficients:Q,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:$,whitePoint:Z,transfer:"srgb",toXYZ:XY,fromXYZ:qY,luminanceCoefficients:Q,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var A9=NN();function XJ(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function l6(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var L6;class yU{static getDataURL(J,$="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let Q;if(J instanceof HTMLCanvasElement)Q=J;else{if(L6===void 0)L6=k$("canvas");L6.width=J.width,L6.height=J.height;let Z=L6.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);Q=L6}return Q.toDataURL($)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let $=k$("canvas");$.width=J.width,$.height=J.height;let Q=$.getContext("2d");Q.drawImage(J,0,0,J.width,J.height);let Z=Q.getImageData(0,0,J.width,J.height),K=Z.data;for(let U=0;U<K.length;U++)K[U]=XJ(K[U]/255)*255;return Q.putImageData(Z,0,0),$}else if(J.data){let $=J.data.slice(0);for(let Q=0;Q<$.length;Q++)if($ instanceof Uint8Array||$ instanceof Uint8ClampedArray)$[Q]=Math.floor(XJ($[Q]/255)*255);else $[Q]=XJ($[Q]);return{data:$,width:J.width,height:J.height}}else return H9("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var XN=0;class s${constructor(J=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:XN++}),this.uuid=o8(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let $=this.data;if(typeof HTMLVideoElement<"u"&&$ instanceof HTMLVideoElement)J.set($.videoWidth,$.videoHeight,0);else if(typeof VideoFrame<"u"&&$ instanceof VideoFrame)J.set($.displayWidth,$.displayHeight,0);else if($!==null)J.set($.width,$.height,$.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Q={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let K;if(Array.isArray(Z)){K=[];for(let U=0,H=Z.length;U<H;U++)if(Z[U].isDataTexture)K.push(FK(Z[U].image));else K.push(FK(Z[U]))}else K=FK(Z);Q.url=K}if(!$)J.images[this.uuid]=Q;return Q}}function FK(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return yU.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return H9("Texture: Unable to serialize Texture."),{}}var qN=0,DK=new v;class y7 extends DJ{constructor(J=y7.DEFAULT_IMAGE,$=y7.DEFAULT_MAPPING,Q=1001,Z=1001,K=1006,U=1008,H=1023,Y=1009,W=y7.DEFAULT_ANISOTROPY,G=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:qN++}),this.uuid=o8(),this.name="",this.source=new s$(J),this.mipmaps=[],this.mapping=$,this.channel=0,this.wrapS=Q,this.wrapT=Z,this.magFilter=K,this.minFilter=U,this.anisotropy=W,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new q0(0,0),this.repeat=new q0(1,1),this.center=new q0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new D9,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=G,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(DK).x}get height(){return this.source.getSize(DK).y}get depth(){return this.source.getSize(DK).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let $ in J){let Q=J[$];if(Q===void 0){H9(`Texture.setValues(): parameter '${$}' has value of undefined.`);continue}let Z=this[$];if(Z===void 0){H9(`Texture.setValues(): property '${$}' does not exist.`);continue}if(Z&&Q&&(Z.isVector2&&Q.isVector2))Z.copy(Q);else if(Z&&Q&&(Z.isVector3&&Q.isVector3))Z.copy(Q);else if(Z&&Q&&(Z.isMatrix3&&Q.isMatrix3))Z.copy(Q);else this[$]=Q}}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Q={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(!$)J.textures[this.uuid]=Q;return Q}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}y7.DEFAULT_IMAGE=null;y7.DEFAULT_MAPPING=300;y7.DEFAULT_ANISOTROPY=1;class N7{static{N7.prototype.isVector4=!0}constructor(J=0,$=0,Q=0,Z=1){this.x=J,this.y=$,this.z=Q,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,$,Q,Z){return this.x=J,this.y=$,this.z=Q,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;case 3:this.w=$;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this.w=J.w+$.w,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this.w+=J.w*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this.w=J.w-$.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let $=this.x,Q=this.y,Z=this.z,K=this.w,U=J.elements;return this.x=U[0]*$+U[4]*Q+U[8]*Z+U[12]*K,this.y=U[1]*$+U[5]*Q+U[9]*Z+U[13]*K,this.z=U[2]*$+U[6]*Q+U[10]*Z+U[14]*K,this.w=U[3]*$+U[7]*Q+U[11]*Z+U[15]*K,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let $=Math.sqrt(1-J.w*J.w);if($<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/$,this.y=J.y/$,this.z=J.z/$;return this}setAxisAngleFromRotationMatrix(J){let $,Q,Z,K,U=0.01,H=0.1,Y=J.elements,W=Y[0],G=Y[4],N=Y[8],q=Y[1],X=Y[5],F=Y[9],R=Y[2],M=Y[6],D=Y[10];if(Math.abs(G-q)<0.01&&Math.abs(N-R)<0.01&&Math.abs(F-M)<0.01){if(Math.abs(G+q)<0.1&&Math.abs(N+R)<0.1&&Math.abs(F+M)<0.1&&Math.abs(W+X+D-3)<0.1)return this.set(1,0,0,0),this;$=Math.PI;let I=(W+1)/2,C=(X+1)/2,O=(D+1)/2,B=(G+q)/4,_=(N+R)/4,A=(F+M)/4;if(I>C&&I>O)if(I<0.01)Q=0,Z=0.707106781,K=0.707106781;else Q=Math.sqrt(I),Z=B/Q,K=_/Q;else if(C>O)if(C<0.01)Q=0.707106781,Z=0,K=0.707106781;else Z=Math.sqrt(C),Q=B/Z,K=A/Z;else if(O<0.01)Q=0.707106781,Z=0.707106781,K=0;else K=Math.sqrt(O),Q=_/K,Z=A/K;return this.set(Q,Z,K,$),this}let E=Math.sqrt((M-F)*(M-F)+(N-R)*(N-R)+(q-G)*(q-G));if(Math.abs(E)<0.001)E=1;return this.x=(M-F)/E,this.y=(N-R)/E,this.z=(q-G)/E,this.w=Math.acos((W+X+D-1)/2),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this.w=$[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,$){return this.x=I9(this.x,J.x,$.x),this.y=I9(this.y,J.y,$.y),this.z=I9(this.z,J.z,$.z),this.w=I9(this.w,J.w,$.w),this}clampScalar(J,$){return this.x=I9(this.x,J,$),this.y=I9(this.y,J,$),this.z=I9(this.z,J,$),this.w=I9(this.w,J,$),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(I9(Q,J,$))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this.w+=(J.w-this.w)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this.w=J.w+($.w-J.w)*Q,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this.w=J[$+3],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J[$+3]=this.w,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this.w=J.getW($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bU extends DJ{constructor(J=1,$=1,Q={}){super();Q=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},Q),this.isRenderTarget=!0,this.width=J,this.height=$,this.depth=Q.depth,this.scissor=new N7(0,0,J,$),this.scissorTest=!1,this.viewport=new N7(0,0,J,$),this.textures=[];let Z={width:J,height:$,depth:Q.depth},K=new y7(Z),U=Q.count;for(let H=0;H<U;H++)this.textures[H]=K.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions(Q),this.depthBuffer=Q.depthBuffer,this.stencilBuffer=Q.stencilBuffer,this.resolveColorBuffer=Q.resolveColorBuffer,this.resolveDepthBuffer=Q.resolveDepthBuffer,this.resolveStencilBuffer=Q.resolveStencilBuffer,this.storeMultisampledColorBuffer=Q.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=Q.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=Q.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=Q.depthTexture,this.samples=Q.samples,this.multiview=Q.multiview,this.useArrayDepthTexture=Q.useArrayDepthTexture}_setTextureOptions(J={}){let $={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)$.mapping=J.mapping;if(J.wrapS!==void 0)$.wrapS=J.wrapS;if(J.wrapT!==void 0)$.wrapT=J.wrapT;if(J.wrapR!==void 0)$.wrapR=J.wrapR;if(J.magFilter!==void 0)$.magFilter=J.magFilter;if(J.minFilter!==void 0)$.minFilter=J.minFilter;if(J.format!==void 0)$.format=J.format;if(J.type!==void 0)$.type=J.type;if(J.anisotropy!==void 0)$.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)$.colorSpace=J.colorSpace;if(J.flipY!==void 0)$.flipY=J.flipY;if(J.generateMipmaps!==void 0)$.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)$.internalFormat=J.internalFormat;for(let Q=0;Q<this.textures.length;Q++)this.textures[Q].setValues($)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(J!==null&&J.renderTarget===null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,$,Q=1){if(this.width!==J||this.height!==$||this.depth!==Q){this.width=J,this.height=$,this.depth=Q;for(let Z=0,K=this.textures.length;Z<K;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=$,this.textures[Z].image.depth=Q,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,$),this.scissor.set(0,0,J,$)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let $=0,Q=J.textures.length;$<Q;$++){this.textures[$]=J.textures[$].clone(),this.textures[$].isRenderTargetTexture=!0,this.textures[$].renderTarget=this;let Z=Object.assign({},J.textures[$].image);this.textures[$].source=new s$(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveColorBuffer=J.resolveColorBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,this.storeMultisampledColorBuffer=J.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=J.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=J.storeMultisampledStencilBuffer,J.depthTexture!==null)if(J.depthTexture.renderTarget===J){let $=J.depthTexture.clone();$.renderTarget=null,this.depthTexture=$}else this.depthTexture=J.depthTexture;return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class F7 extends bU{constructor(J=1,$=1,Q={}){super(J,$,Q);this.isWebGLRenderTarget=!0}}class CZ extends y7{constructor(J=null,$=1,Q=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:$,height:Q,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class xU extends y7{constructor(J=null,$=1,Q=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:$,height:Q,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}}class h9{static{h9.prototype.isMatrix4=!0}constructor(J,$,Q,Z,K,U,H,Y,W,G,N,q,X,F,R,M){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,$,Q,Z,K,U,H,Y,W,G,N,q,X,F,R,M)}set(J,$,Q,Z,K,U,H,Y,W,G,N,q,X,F,R,M){let D=this.elements;return D[0]=J,D[4]=$,D[8]=Q,D[12]=Z,D[1]=K,D[5]=U,D[9]=H,D[13]=Y,D[2]=W,D[6]=G,D[10]=N,D[14]=q,D[3]=X,D[7]=F,D[11]=R,D[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new h9().fromArray(this.elements)}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],$[9]=Q[9],$[10]=Q[10],$[11]=Q[11],$[12]=Q[12],$[13]=Q[13],$[14]=Q[14],$[15]=Q[15],this}copyPosition(J){let $=this.elements,Q=J.elements;return $[12]=Q[12],$[13]=Q[13],$[14]=Q[14],this}setFromMatrix3(J){let $=J.elements;return this.set($[0],$[3],$[6],0,$[1],$[4],$[7],0,$[2],$[5],$[8],0,0,0,0,1),this}extractBasis(J,$,Q){if(this.determinantAffine()===0)return J.set(1,0,0),$.set(0,1,0),Q.set(0,0,1),this;return J.setFromMatrixColumn(this,0),$.setFromMatrixColumn(this,1),Q.setFromMatrixColumn(this,2),this}makeBasis(J,$,Q){return this.set(J.x,$.x,Q.x,0,J.y,$.y,Q.y,0,J.z,$.z,Q.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let $=this.elements,Q=J.elements,Z=1/P6.setFromMatrixColumn(J,0).length(),K=1/P6.setFromMatrixColumn(J,1).length(),U=1/P6.setFromMatrixColumn(J,2).length();return $[0]=Q[0]*Z,$[1]=Q[1]*Z,$[2]=Q[2]*Z,$[3]=0,$[4]=Q[4]*K,$[5]=Q[5]*K,$[6]=Q[6]*K,$[7]=0,$[8]=Q[8]*U,$[9]=Q[9]*U,$[10]=Q[10]*U,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromEuler(J){let $=this.elements,Q=J.x,Z=J.y,K=J.z,U=Math.cos(Q),H=Math.sin(Q),Y=Math.cos(Z),W=Math.sin(Z),G=Math.cos(K),N=Math.sin(K);if(J.order==="XYZ"){let q=U*G,X=U*N,F=H*G,R=H*N;$[0]=Y*G,$[4]=-Y*N,$[8]=W,$[1]=X+F*W,$[5]=q-R*W,$[9]=-H*Y,$[2]=R-q*W,$[6]=F+X*W,$[10]=U*Y}else if(J.order==="YXZ"){let q=Y*G,X=Y*N,F=W*G,R=W*N;$[0]=q+R*H,$[4]=F*H-X,$[8]=U*W,$[1]=U*N,$[5]=U*G,$[9]=-H,$[2]=X*H-F,$[6]=R+q*H,$[10]=U*Y}else if(J.order==="ZXY"){let q=Y*G,X=Y*N,F=W*G,R=W*N;$[0]=q-R*H,$[4]=-U*N,$[8]=F+X*H,$[1]=X+F*H,$[5]=U*G,$[9]=R-q*H,$[2]=-U*W,$[6]=H,$[10]=U*Y}else if(J.order==="ZYX"){let q=U*G,X=U*N,F=H*G,R=H*N;$[0]=Y*G,$[4]=F*W-X,$[8]=q*W+R,$[1]=Y*N,$[5]=R*W+q,$[9]=X*W-F,$[2]=-W,$[6]=H*Y,$[10]=U*Y}else if(J.order==="YZX"){let q=U*Y,X=U*W,F=H*Y,R=H*W;$[0]=Y*G,$[4]=R-q*N,$[8]=F*N+X,$[1]=N,$[5]=U*G,$[9]=-H*G,$[2]=-W*G,$[6]=X*N+F,$[10]=q-R*N}else if(J.order==="XZY"){let q=U*Y,X=U*W,F=H*Y,R=H*W;$[0]=Y*G,$[4]=-N,$[8]=W*G,$[1]=q*N+R,$[5]=U*G,$[9]=X*N-F,$[2]=F*N-X,$[6]=H*G,$[10]=R*N+q}return $[3]=0,$[7]=0,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromQuaternion(J){return this.compose(FN,J,DN)}lookAt(J,$,Q){let Z=this.elements;if(X8.subVectors(J,$),X8.lengthSq()===0)X8.z=1;if(X8.normalize(),fJ.crossVectors(Q,X8),fJ.lengthSq()===0){if(Math.abs(Q.z)===1)X8.x+=0.0001;else X8.z+=0.0001;X8.normalize(),fJ.crossVectors(Q,X8)}return fJ.normalize(),jQ.crossVectors(X8,fJ),Z[0]=fJ.x,Z[4]=jQ.x,Z[8]=X8.x,Z[1]=fJ.y,Z[5]=jQ.y,Z[9]=X8.y,Z[2]=fJ.z,Z[6]=jQ.z,Z[10]=X8.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,Z=$.elements,K=this.elements,U=Q[0],H=Q[4],Y=Q[8],W=Q[12],G=Q[1],N=Q[5],q=Q[9],X=Q[13],F=Q[2],R=Q[6],M=Q[10],D=Q[14],E=Q[3],I=Q[7],C=Q[11],O=Q[15],B=Z[0],_=Z[4],A=Z[8],V=Z[12],z=Z[1],y=Z[5],k=Z[9],f=Z[13],s=Z[2],j=Z[6],p=Z[10],e=Z[14],n=Z[3],r=Z[7],u=Z[11],x=Z[15];return K[0]=U*B+H*z+Y*s+W*n,K[4]=U*_+H*y+Y*j+W*r,K[8]=U*A+H*k+Y*p+W*u,K[12]=U*V+H*f+Y*e+W*x,K[1]=G*B+N*z+q*s+X*n,K[5]=G*_+N*y+q*j+X*r,K[9]=G*A+N*k+q*p+X*u,K[13]=G*V+N*f+q*e+X*x,K[2]=F*B+R*z+M*s+D*n,K[6]=F*_+R*y+M*j+D*r,K[10]=F*A+R*k+M*p+D*u,K[14]=F*V+R*f+M*e+D*x,K[3]=E*B+I*z+C*s+O*n,K[7]=E*_+I*y+C*j+O*r,K[11]=E*A+I*k+C*p+O*u,K[15]=E*V+I*f+C*e+O*x,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[4]*=J,$[8]*=J,$[12]*=J,$[1]*=J,$[5]*=J,$[9]*=J,$[13]*=J,$[2]*=J,$[6]*=J,$[10]*=J,$[14]*=J,$[3]*=J,$[7]*=J,$[11]*=J,$[15]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[4],Z=J[8],K=J[12],U=J[1],H=J[5],Y=J[9],W=J[13],G=J[2],N=J[6],q=J[10],X=J[14],F=J[3],R=J[7],M=J[11],D=J[15],E=Y*X-W*q,I=H*X-W*N,C=H*q-Y*N,O=U*X-W*G,B=U*q-Y*G,_=U*N-H*G;return $*(R*E-M*I+D*C)-Q*(F*E-M*O+D*B)+Z*(F*I-R*O+D*_)-K*(F*C-R*B+M*_)}determinantAffine(){let J=this.elements,$=J[0],Q=J[4],Z=J[8],K=J[1],U=J[5],H=J[9],Y=J[2],W=J[6],G=J[10];return $*(U*G-H*W)-Q*(K*G-H*Y)+Z*(K*W-U*Y)}transpose(){let J=this.elements,$;return $=J[1],J[1]=J[4],J[4]=$,$=J[2],J[2]=J[8],J[8]=$,$=J[6],J[6]=J[9],J[9]=$,$=J[3],J[3]=J[12],J[12]=$,$=J[7],J[7]=J[13],J[13]=$,$=J[11],J[11]=J[14],J[14]=$,this}setPosition(J,$,Q){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=$,Z[14]=Q;return this}invert(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],U=J[4],H=J[5],Y=J[6],W=J[7],G=J[8],N=J[9],q=J[10],X=J[11],F=J[12],R=J[13],M=J[14],D=J[15],E=$*H-Q*U,I=$*Y-Z*U,C=$*W-K*U,O=Q*Y-Z*H,B=Q*W-K*H,_=Z*W-K*Y,A=G*R-N*F,V=G*M-q*F,z=G*D-X*F,y=N*M-q*R,k=N*D-X*R,f=q*D-X*M,s=E*f-I*k+C*y+O*z-B*V+_*A;if(s===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let j=1/s;return J[0]=(H*f-Y*k+W*y)*j,J[1]=(Z*k-Q*f-K*y)*j,J[2]=(R*_-M*B+D*O)*j,J[3]=(q*B-N*_-X*O)*j,J[4]=(Y*z-U*f-W*V)*j,J[5]=($*f-Z*z+K*V)*j,J[6]=(M*C-F*_-D*I)*j,J[7]=(G*_-q*C+X*I)*j,J[8]=(U*k-H*z+W*A)*j,J[9]=(Q*z-$*k-K*A)*j,J[10]=(F*B-R*C+D*E)*j,J[11]=(N*C-G*B-X*E)*j,J[12]=(H*V-U*y-Y*A)*j,J[13]=($*y-Q*V+Z*A)*j,J[14]=(R*I-F*O-M*E)*j,J[15]=(G*O-N*I+q*E)*j,this}scale(J){let $=this.elements,Q=J.x,Z=J.y,K=J.z;return $[0]*=Q,$[4]*=Z,$[8]*=K,$[1]*=Q,$[5]*=Z,$[9]*=K,$[2]*=Q,$[6]*=Z,$[10]*=K,$[3]*=Q,$[7]*=Z,$[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,$=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Q=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max($,Q,Z))}makeTranslation(J,$,Q){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,$,0,0,1,Q,0,0,0,1);return this}makeRotationX(J){let $=Math.cos(J),Q=Math.sin(J);return this.set(1,0,0,0,0,$,-Q,0,0,Q,$,0,0,0,0,1),this}makeRotationY(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,0,Q,0,0,1,0,0,-Q,0,$,0,0,0,0,1),this}makeRotationZ(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,0,Q,$,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,$){let Q=Math.cos($),Z=Math.sin($),K=1-Q,U=J.x,H=J.y,Y=J.z,W=K*U,G=K*H;return this.set(W*U+Q,W*H-Z*Y,W*Y+Z*H,0,W*H+Z*Y,G*H+Q,G*Y-Z*U,0,W*Y-Z*H,G*Y+Z*U,K*Y*Y+Q,0,0,0,0,1),this}makeScale(J,$,Q){return this.set(J,0,0,0,0,$,0,0,0,0,Q,0,0,0,0,1),this}makeShear(J,$,Q,Z,K,U){return this.set(1,Q,K,0,J,1,U,0,$,Z,1,0,0,0,0,1),this}compose(J,$,Q){let Z=this.elements,K=$._x,U=$._y,H=$._z,Y=$._w,W=K+K,G=U+U,N=H+H,q=K*W,X=K*G,F=K*N,R=U*G,M=U*N,D=H*N,E=Y*W,I=Y*G,C=Y*N,O=Q.x,B=Q.y,_=Q.z;return Z[0]=(1-(R+D))*O,Z[1]=(X+C)*O,Z[2]=(F-I)*O,Z[3]=0,Z[4]=(X-C)*B,Z[5]=(1-(q+D))*B,Z[6]=(M+E)*B,Z[7]=0,Z[8]=(F+I)*_,Z[9]=(M-E)*_,Z[10]=(1-(q+R))*_,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,$,Q){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let K=this.determinantAffine();if(K===0)return Q.set(1,1,1),$.identity(),this;let U=P6.set(Z[0],Z[1],Z[2]).length(),H=P6.set(Z[4],Z[5],Z[6]).length(),Y=P6.set(Z[8],Z[9],Z[10]).length();if(K<0)U=-U;P8.copy(this);let W=1/U,G=1/H,N=1/Y;return P8.elements[0]*=W,P8.elements[1]*=W,P8.elements[2]*=W,P8.elements[4]*=G,P8.elements[5]*=G,P8.elements[6]*=G,P8.elements[8]*=N,P8.elements[9]*=N,P8.elements[10]*=N,$.setFromRotationMatrix(P8),Q.x=U,Q.y=H,Q.z=Y,this}makePerspective(J,$,Q,Z,K,U,H=2000,Y=!1){let W=this.elements,G=2*K/($-J),N=2*K/(Q-Z),q=($+J)/($-J),X=(Q+Z)/(Q-Z),F,R;if(Y)F=K/(U-K),R=U*K/(U-K);else if(H===2000)F=-(U+K)/(U-K),R=-2*U*K/(U-K);else if(H===2001)F=-U/(U-K),R=-U*K/(U-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return W[0]=G,W[4]=0,W[8]=q,W[12]=0,W[1]=0,W[5]=N,W[9]=X,W[13]=0,W[2]=0,W[6]=0,W[10]=F,W[14]=R,W[3]=0,W[7]=0,W[11]=-1,W[15]=0,this}makeOrthographic(J,$,Q,Z,K,U,H=2000,Y=!1){let W=this.elements,G=2/($-J),N=2/(Q-Z),q=-($+J)/($-J),X=-(Q+Z)/(Q-Z),F,R;if(Y)F=1/(U-K),R=U/(U-K);else if(H===2000)F=-2/(U-K),R=-(U+K)/(U-K);else if(H===2001)F=-1/(U-K),R=-K/(U-K);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return W[0]=G,W[4]=0,W[8]=0,W[12]=q,W[1]=0,W[5]=N,W[9]=0,W[13]=X,W[2]=0,W[6]=0,W[10]=F,W[14]=R,W[3]=0,W[7]=0,W[11]=0,W[15]=1,this}equals(J){let $=this.elements,Q=J.elements;for(let Z=0;Z<16;Z++)if($[Z]!==Q[Z])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<16;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J[$+9]=Q[9],J[$+10]=Q[10],J[$+11]=Q[11],J[$+12]=Q[12],J[$+13]=Q[13],J[$+14]=Q[14],J[$+15]=Q[15],J}}var P6=new v,P8=new h9,FN=new v(0,0,0),DN=new v(1,1,1),fJ=new v,jQ=new v,X8=new v,FY=new h9,DY=new v8;class qJ{constructor(J=0,$=0,Q=0,Z=qJ.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=$,this._z=Q,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,$,Q,Z=this._order){return this._x=J,this._y=$,this._z=Q,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,$=this._order,Q=!0){let Z=J.elements,K=Z[0],U=Z[4],H=Z[8],Y=Z[1],W=Z[5],G=Z[9],N=Z[2],q=Z[6],X=Z[10];switch($){case"XYZ":if(this._y=Math.asin(I9(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-G,X),this._z=Math.atan2(-U,K);else this._x=Math.atan2(q,W),this._z=0;break;case"YXZ":if(this._x=Math.asin(-I9(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(H,X),this._z=Math.atan2(Y,W);else this._y=Math.atan2(-N,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(I9(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(-N,X),this._z=Math.atan2(-U,W);else this._y=0,this._z=Math.atan2(Y,K);break;case"ZYX":if(this._y=Math.asin(-I9(N,-1,1)),Math.abs(N)<0.9999999)this._x=Math.atan2(q,X),this._z=Math.atan2(Y,K);else this._x=0,this._z=Math.atan2(-U,W);break;case"YZX":if(this._z=Math.asin(I9(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-G,W),this._y=Math.atan2(-N,K);else this._x=0,this._y=Math.atan2(H,X);break;case"XZY":if(this._z=Math.asin(-I9(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(q,W),this._y=Math.atan2(H,K);else this._x=Math.atan2(-G,X),this._y=0;break;default:H9("Euler: .setFromRotationMatrix() encountered an unknown order: "+$)}if(this._order=$,Q===!0)this._onChangeCallback();return this}setFromQuaternion(J,$,Q){return FY.makeRotationFromQuaternion(J),this.setFromRotationMatrix(FY,$,Q)}setFromVector3(J,$=this._order){return this.set(J.x,J.y,J.z,$)}reorder(J){return DY.setFromEuler(this),this.setFromQuaternion(DY,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qJ.DEFAULT_ORDER="XYZ";class TZ{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var EN=0,EY=new v,C6=new v8,HJ=new h9,vQ=new v,R$=new v,ON=new v,RN=new v8,OY=new v(1,0,0),RY=new v(0,1,0),MY=new v(0,0,1),VY={type:"added"},MN={type:"removed"},T6={type:"childadded",child:null},EK={type:"childremoved",child:null};class v9 extends DJ{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:EN++}),this.uuid=o8(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=v9.DEFAULT_UP.clone();let J=new v,$=new qJ,Q=new v8,Z=new v(1,1,1);function K(){Q.setFromEuler($,!1)}function U(){$.setFromQuaternion(Q,void 0,!1)}$._onChange(K),Q._onChange(U),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:$},quaternion:{configurable:!0,enumerable:!0,value:Q},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new h9},normalMatrix:{value:new D9}}),this.matrix=new h9,this.matrixWorld=new h9,this.matrixAutoUpdate=v9.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=v9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new TZ,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,$){this.quaternion.setFromAxisAngle(J,$)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,$){return C6.setFromAxisAngle(J,$),this.quaternion.multiply(C6),this}rotateOnWorldAxis(J,$){return C6.setFromAxisAngle(J,$),this.quaternion.premultiply(C6),this}rotateX(J){return this.rotateOnAxis(OY,J)}rotateY(J){return this.rotateOnAxis(RY,J)}rotateZ(J){return this.rotateOnAxis(MY,J)}translateOnAxis(J,$){return EY.copy(J).applyQuaternion(this.quaternion),this.position.add(EY.multiplyScalar($)),this}translateX(J){return this.translateOnAxis(OY,J)}translateY(J){return this.translateOnAxis(RY,J)}translateZ(J){return this.translateOnAxis(MY,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(HJ.copy(this.matrixWorld).invert())}lookAt(J,$,Q){if(J.isVector3)vQ.copy(J);else vQ.set(J,$,Q);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),R$.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)HJ.lookAt(R$,vQ,this.up);else HJ.lookAt(vQ,R$,this.up);if(this.quaternion.setFromRotationMatrix(HJ),Z)HJ.extractRotation(Z.matrixWorld),C6.setFromRotationMatrix(HJ),this.quaternion.premultiply(C6.invert())}add(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.add(arguments[$]);return this}if(J===this)return N9("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(VY),T6.child=J,this.dispatchEvent(T6),T6.child=null;else N9("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.remove(arguments[Q]);return this}let $=this.children.indexOf(J);if($!==-1)J.parent=null,this.children.splice($,1),J.dispatchEvent(MN),EK.child=J,this.dispatchEvent(EK),EK.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),HJ.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),HJ.multiply(J.parent.matrixWorld);return J.applyMatrix4(HJ),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(VY),T6.child=J,this.dispatchEvent(T6),T6.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,$){if(this[J]===$)return this;for(let Q=0,Z=this.children.length;Q<Z;Q++){let U=this.children[Q].getObjectByProperty(J,$);if(U!==void 0)return U}return}getObjectsByProperty(J,$,Q=[]){if(this[J]===$)Q.push(this);let Z=this.children;for(let K=0,U=Z.length;K<U;K++)Z[K].getObjectsByProperty(J,$,Q);return Q}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(R$,J,ON),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(R$,RN,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let $=this.matrixWorld.elements;return J.set($[8],$[9],$[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(J){J(this);let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].traverseVisible(J)}traverseAncestors(J){let $=this.parent;if($!==null)J($),$.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:$,y:Q,z:Z}=J,K=this.matrix.elements;K[12]+=$-K[0]*$-K[4]*Q-K[8]*Z,K[13]+=Q-K[1]*$-K[5]*Q-K[9]*Z,K[14]+=Z-K[2]*$-K[6]*Q-K[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].updateMatrixWorld(J)}updateWorldMatrix(J,$,Q=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||Q){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,Q=!0}if($===!0){let K=this.children;for(let U=0,H=K.length;U<H;U++)K[U].updateWorldMatrix(!1,!0,Q)}}toJSON(J){let $=J===void 0||typeof J==="string",Q={};if($)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Q.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,Z.name=this.name,Z.castShadow=this.castShadow,Z.receiveShadow=this.receiveShadow,Z.visible=this.visible,Z.frustumCulled=this.frustumCulled,Z.renderOrder=this.renderOrder,Z.static=this.static,Z.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((H)=>({...H})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function K(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=K(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let W=0,G=Y.length;W<G;W++){let N=Y[W];K(J.shapes,N)}else K(J.shapes,Y)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,W=this.material.length;Y<W;Y++)H.push(K(J.materials,this.material[Y]));Z.material=H}else Z.material=K(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let H=0;H<this.children.length;H++)Z.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];Z.animations.push(K(J.animations,Y))}}if($){let H=U(J.geometries),Y=U(J.materials),W=U(J.textures),G=U(J.images),N=U(J.shapes),q=U(J.skeletons),X=U(J.animations),F=U(J.nodes);if(H.length>0)Q.geometries=H;if(Y.length>0)Q.materials=Y;if(W.length>0)Q.textures=W;if(G.length>0)Q.images=G;if(N.length>0)Q.shapes=N;if(q.length>0)Q.skeletons=q;if(X.length>0)Q.animations=X;if(F.length>0)Q.nodes=F}return Q.object=Z,Q;function U(H){let Y=[];for(let W in H){let G=H[W];delete G.metadata,Y.push(G)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,$=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),$===!0)for(let Q=0;Q<J.children.length;Q++){let Z=J.children[Q];this.add(Z.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}v9.DEFAULT_UP=new v(0,1,0);v9.DEFAULT_MATRIX_AUTO_UPDATE=!0;v9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class H0 extends v9{constructor(){super();this.isGroup=!0,this.type="Group"}}var VN={type:"move"};class o${constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new H0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new H0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new v,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new v;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new H0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new v,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new v,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let $=this._hand;if($)for(let Q of J.hand.values())this._getHandJoint($,Q)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,$,Q){let Z=null,K=null,U=null,H=this._targetRay,Y=this._grip,W=this._hand;if(J&&$.session.visibilityState!=="visible-blurred"){if(W&&J.hand){U=!0;for(let R of J.hand.values()){let M=$.getJointPose(R,Q),D=this._getHandJoint(W,R);if(M!==null)D.matrix.fromArray(M.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=M.radius;D.visible=M!==null}let G=W.joints["index-finger-tip"],N=W.joints["thumb-tip"],q=G.position.distanceTo(N.position),X=0.02,F=0.005;if(W.inputState.pinching&&q>X+F)W.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!W.inputState.pinching&&q<=X-F)W.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(K=$.getPose(J.gripSpace,Q),K!==null){if(Y.matrix.fromArray(K.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,K.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(K.linearVelocity);else Y.hasLinearVelocity=!1;if(K.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(K.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(Z=$.getPose(J.targetRaySpace,Q),Z===null&&K!==null)Z=K;if(Z!==null){if(H.matrix.fromArray(Z.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,Z.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(Z.linearVelocity);else H.hasLinearVelocity=!1;if(Z.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(Z.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(VN)}}}if(H!==null)H.visible=Z!==null;if(Y!==null)Y.visible=K!==null;if(W!==null)W.visible=U!==null;return this}_getHandJoint(J,$){if(J.joints[$.jointName]===void 0){let Q=new H0;Q.matrixAutoUpdate=!1,Q.visible=!1,J.joints[$.jointName]=Q,J.add(Q)}return J.joints[$.jointName]}}var n5={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yJ={h:0,s:0,l:0},fQ={h:0,s:0,l:0};function OK(J,$,Q){if(Q<0)Q+=1;if(Q>1)Q-=1;if(Q<0.16666666666666666)return J+($-J)*6*Q;if(Q<0.5)return $;if(Q<0.6666666666666666)return J+($-J)*6*(0.6666666666666666-Q);return J}class D0{constructor(J,$,Q){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,$,Q)}set(J,$,Q){if($===void 0&&Q===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,$,Q);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,$="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,A9.colorSpaceToWorking(this,$),this}setRGB(J,$,Q,Z=A9.workingColorSpace){return this.r=J,this.g=$,this.b=Q,A9.colorSpaceToWorking(this,Z),this}setHSL(J,$,Q,Z=A9.workingColorSpace){if(J=vU(J,1),$=I9($,0,1),Q=I9(Q,0,1),$===0)this.r=this.g=this.b=Q;else{let K=Q<=0.5?Q*(1+$):Q+$-Q*$,U=2*Q-K;this.r=OK(U,K,J+0.3333333333333333),this.g=OK(U,K,J),this.b=OK(U,K,J-0.3333333333333333)}return A9.colorSpaceToWorking(this,Z),this}setStyle(J,$="srgb"){function Q(K){if(K===void 0)return;if(parseFloat(K)<1)H9("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,U=Z[1],H=Z[2];switch(U){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,$);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,$);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,$);break;default:H9("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=Z[1],U=K.length;if(U===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,$);else if(U===6)return this.setHex(parseInt(K,16),$);else H9("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,$);return this}setColorName(J,$="srgb"){let Q=n5[J.toLowerCase()];if(Q!==void 0)this.setHex(Q,$);else H9("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=XJ(J.r),this.g=XJ(J.g),this.b=XJ(J.b),this}copyLinearToSRGB(J){return this.r=l6(J.r),this.g=l6(J.g),this.b=l6(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return A9.workingToColorSpace(m7.copy(this),J),Math.round(I9(m7.r*255,0,255))*65536+Math.round(I9(m7.g*255,0,255))*256+Math.round(I9(m7.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,$=A9.workingColorSpace){A9.workingToColorSpace(m7.copy(this),$);let{r:Q,g:Z,b:K}=m7,U=Math.max(Q,Z,K),H=Math.min(Q,Z,K),Y,W,G=(H+U)/2;if(H===U)Y=0,W=0;else{let N=U-H;switch(W=G<=0.5?N/(U+H):N/(2-U-H),U){case Q:Y=(Z-K)/N+(Z<K?6:0);break;case Z:Y=(K-Q)/N+2;break;case K:Y=(Q-Z)/N+4;break}Y/=6}return J.h=Y,J.s=W,J.l=G,J}getRGB(J,$=A9.workingColorSpace){return A9.workingToColorSpace(m7.copy(this),$),J.r=m7.r,J.g=m7.g,J.b=m7.b,J}getStyle(J="srgb"){A9.workingToColorSpace(m7.copy(this),J);let{r:$,g:Q,b:Z}=m7;if(J!=="srgb")return`color(${J} ${$.toFixed(3)} ${Q.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round($*255)},${Math.round(Q*255)},${Math.round(Z*255)})`}offsetHSL(J,$,Q){return this.getHSL(yJ),this.setHSL(yJ.h+J,yJ.s+$,yJ.l+Q)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,$){return this.r=J.r+$.r,this.g=J.g+$.g,this.b=J.b+$.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,$){return this.r+=(J.r-this.r)*$,this.g+=(J.g-this.g)*$,this.b+=(J.b-this.b)*$,this}lerpColors(J,$,Q){return this.r=J.r+($.r-J.r)*Q,this.g=J.g+($.g-J.g)*Q,this.b=J.b+($.b-J.b)*Q,this}lerpHSL(J,$){this.getHSL(yJ),J.getHSL(fQ);let Q=T$(yJ.h,fQ.h,$),Z=T$(yJ.s,fQ.s,$),K=T$(yJ.l,fQ.l,$);return this.setHSL(Q,Z,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let $=this.r,Q=this.g,Z=this.b,K=J.elements;return this.r=K[0]*$+K[3]*Q+K[6]*Z,this.g=K[1]*$+K[4]*Q+K[7]*Z,this.b=K[2]*$+K[5]*Q+K[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,$=0){return this.r=J[$],this.g=J[$+1],this.b=J[$+2],this}toArray(J=[],$=0){return J[$]=this.r,J[$+1]=this.g,J[$+2]=this.b,J}fromBufferAttribute(J,$){return this.r=J.getX($),this.g=J.getY($),this.b=J.getZ($),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var m7=new D0;D0.NAMES=n5;class EJ{constructor(J,$=0.00025){this.isFogExp2=!0,this.name="",this.color=new D0(J),this.density=$}clone(){return new EJ(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class i7 extends v9{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qJ,this.environmentIntensity=1,this.environmentRotation=new qJ,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,$){if(super.copy(J,$),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let $=super.toJSON(J);if(this.fog!==null)$.object.fog=this.fog.toJSON();return $.object.backgroundBlurriness=this.backgroundBlurriness,$.object.backgroundIntensity=this.backgroundIntensity,$.object.backgroundRotation=this.backgroundRotation.toArray(),$.object.environmentIntensity=this.environmentIntensity,$.object.environmentRotation=this.environmentRotation.toArray(),$}}var C8=new v,YJ=new v,RK=new v,WJ=new v,w6=new v,S6=new v,_Y=new v,MK=new v,VK=new v,_K=new v,BK=new N7,IK=new N7,zK=new N7;class e7{constructor(J=new v,$=new v,Q=new v){this.a=J,this.b=$,this.c=Q}static getNormal(J,$,Q,Z){Z.subVectors(Q,$),C8.subVectors(J,$),Z.cross(C8);let K=Z.lengthSq();if(K>0)return Z.multiplyScalar(1/Math.sqrt(K));return Z.set(0,0,0)}static getBarycoord(J,$,Q,Z,K){C8.subVectors(Z,$),YJ.subVectors(Q,$),RK.subVectors(J,$);let U=C8.dot(C8),H=C8.dot(YJ),Y=C8.dot(RK),W=YJ.dot(YJ),G=YJ.dot(RK),N=U*W-H*H;if(N===0)return K.set(0,0,0),null;let q=1/N,X=(W*Y-H*G)*q,F=(U*G-H*Y)*q;return K.set(1-X-F,F,X)}static containsPoint(J,$,Q,Z){if(this.getBarycoord(J,$,Q,Z,WJ)===null)return!1;return WJ.x>=0&&WJ.y>=0&&WJ.x+WJ.y<=1}static getInterpolation(J,$,Q,Z,K,U,H,Y){if(this.getBarycoord(J,$,Q,Z,WJ)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(K,WJ.x),Y.addScaledVector(U,WJ.y),Y.addScaledVector(H,WJ.z),Y}static getInterpolatedAttribute(J,$,Q,Z,K,U){return BK.setScalar(0),IK.setScalar(0),zK.setScalar(0),BK.fromBufferAttribute(J,$),IK.fromBufferAttribute(J,Q),zK.fromBufferAttribute(J,Z),U.setScalar(0),U.addScaledVector(BK,K.x),U.addScaledVector(IK,K.y),U.addScaledVector(zK,K.z),U}static isFrontFacing(J,$,Q,Z){return C8.subVectors(Q,$),YJ.subVectors(J,$),C8.cross(YJ).dot(Z)<0}set(J,$,Q){return this.a.copy(J),this.b.copy($),this.c.copy(Q),this}setFromPointsAndIndices(J,$,Q,Z){return this.a.copy(J[$]),this.b.copy(J[Q]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,$,Q,Z){return this.a.fromBufferAttribute(J,$),this.b.fromBufferAttribute(J,Q),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return C8.subVectors(this.c,this.b),YJ.subVectors(this.a,this.b),C8.cross(YJ).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return e7.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,$){return e7.getBarycoord(J,this.a,this.b,this.c,$)}getInterpolation(J,$,Q,Z,K){return e7.getInterpolation(J,this.a,this.b,this.c,$,Q,Z,K)}containsPoint(J){return e7.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return e7.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,$){let Q=this.a,Z=this.b,K=this.c,U,H;w6.subVectors(Z,Q),S6.subVectors(K,Q),MK.subVectors(J,Q);let Y=w6.dot(MK),W=S6.dot(MK);if(Y<=0&&W<=0)return $.copy(Q);VK.subVectors(J,Z);let G=w6.dot(VK),N=S6.dot(VK);if(G>=0&&N<=G)return $.copy(Z);let q=Y*N-G*W;if(q<=0&&Y>=0&&G<=0)return U=Y/(Y-G),$.copy(Q).addScaledVector(w6,U);_K.subVectors(J,K);let X=w6.dot(_K),F=S6.dot(_K);if(F>=0&&X<=F)return $.copy(K);let R=X*W-Y*F;if(R<=0&&W>=0&&F<=0)return H=W/(W-F),$.copy(Q).addScaledVector(S6,H);let M=G*F-X*N;if(M<=0&&N-G>=0&&X-F>=0)return _Y.subVectors(K,Z),H=(N-G)/(N-G+(X-F)),$.copy(Z).addScaledVector(_Y,H);let D=1/(M+R+q);return U=R*D,H=q*D,$.copy(Q).addScaledVector(w6,U).addScaledVector(S6,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class f8{constructor(J=new v(1/0,1/0,1/0),$=new v(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=$}set(J,$){return this.min.copy(J),this.max.copy($),this}setFromArray(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$+=3)this.expandByPoint(T8.fromArray(J,$));return this}setFromBufferAttribute(J){this.makeEmpty();for(let $=0,Q=J.count;$<Q;$++)this.expandByPoint(T8.fromBufferAttribute(J,$));return this}setFromPoints(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$++)this.expandByPoint(J[$]);return this}setFromCenterAndSize(J,$){let Q=T8.copy($).multiplyScalar(0.5);return this.min.copy(J).sub(Q),this.max.copy(J).add(Q),this}setFromObject(J,$=!1){return this.makeEmpty(),this.expandByObject(J,$)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,$=!1){J.updateWorldMatrix(!1,!1);let Q=J.geometry;if(Q!==void 0){let K=Q.getAttribute("position");if($===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let U=0,H=K.count;U<H;U++){if(J.isMesh===!0)J.getVertexPosition(U,T8);else T8.fromBufferAttribute(K,U);T8.applyMatrix4(J.matrixWorld),this.expandByPoint(T8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();yQ.copy(J.boundingBox)}else{if(Q.boundingBox===null)Q.computeBoundingBox();yQ.copy(Q.boundingBox)}yQ.applyMatrix4(J.matrixWorld),this.union(yQ)}}let Z=J.children;for(let K=0,U=Z.length;K<U;K++)this.expandByObject(Z[K],$);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,$){return $.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,T8),T8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let $,Q;if(J.normal.x>0)$=J.normal.x*this.min.x,Q=J.normal.x*this.max.x;else $=J.normal.x*this.max.x,Q=J.normal.x*this.min.x;if(J.normal.y>0)$+=J.normal.y*this.min.y,Q+=J.normal.y*this.max.y;else $+=J.normal.y*this.max.y,Q+=J.normal.y*this.min.y;if(J.normal.z>0)$+=J.normal.z*this.min.z,Q+=J.normal.z*this.max.z;else $+=J.normal.z*this.max.z,Q+=J.normal.z*this.min.z;return $<=-J.constant&&Q>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(M$),bQ.subVectors(this.max,M$),k6.subVectors(J.a,M$),j6.subVectors(J.b,M$),v6.subVectors(J.c,M$),bJ.subVectors(j6,k6),xJ.subVectors(v6,j6),aJ.subVectors(k6,v6);let $=[0,-bJ.z,bJ.y,0,-xJ.z,xJ.y,0,-aJ.z,aJ.y,bJ.z,0,-bJ.x,xJ.z,0,-xJ.x,aJ.z,0,-aJ.x,-bJ.y,bJ.x,0,-xJ.y,xJ.x,0,-aJ.y,aJ.x,0];if(!AK($,k6,j6,v6,bQ))return!1;if($=[1,0,0,0,1,0,0,0,1],!AK($,k6,j6,v6,bQ))return!1;return xQ.crossVectors(bJ,xJ),$=[xQ.x,xQ.y,xQ.z],AK($,k6,j6,v6,bQ)}clampPoint(J,$){return $.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,T8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(T8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return GJ[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),GJ[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),GJ[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),GJ[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),GJ[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),GJ[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),GJ[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),GJ[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(GJ),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var GJ=[new v,new v,new v,new v,new v,new v,new v,new v],T8=new v,yQ=new f8,k6=new v,j6=new v,v6=new v,bJ=new v,xJ=new v,aJ=new v,M$=new v,bQ=new v,xQ=new v,rJ=new v;function AK(J,$,Q,Z,K){for(let U=0,H=J.length-3;U<=H;U+=3){rJ.fromArray(J,U);let Y=K.x*Math.abs(rJ.x)+K.y*Math.abs(rJ.y)+K.z*Math.abs(rJ.z),W=$.dot(rJ),G=Q.dot(rJ),N=Z.dot(rJ);if(Math.max(-Math.max(W,G,N),Math.min(W,G,N))>Y)return!1}return!0}var A7=new v,hQ=new q0,_N=0;class H7 extends DJ{constructor(J,$,Q=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_N++}),this.name="",this.array=J,this.itemSize=$,this.count=J!==void 0?J.length/$:0,this.normalized=Q,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,$,Q){J*=this.itemSize,Q*=$.itemSize;for(let Z=0,K=this.itemSize;Z<K;Z++)this.array[J+Z]=$.array[Q+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let $=0,Q=this.count;$<Q;$++)hQ.fromBufferAttribute(this,$),hQ.applyMatrix3(J),this.setXY($,hQ.x,hQ.y);else if(this.itemSize===3)for(let $=0,Q=this.count;$<Q;$++)A7.fromBufferAttribute(this,$),A7.applyMatrix3(J),this.setXYZ($,A7.x,A7.y,A7.z);return this}applyMatrix4(J){for(let $=0,Q=this.count;$<Q;$++)A7.fromBufferAttribute(this,$),A7.applyMatrix4(J),this.setXYZ($,A7.x,A7.y,A7.z);return this}applyNormalMatrix(J){for(let $=0,Q=this.count;$<Q;$++)A7.fromBufferAttribute(this,$),A7.applyNormalMatrix(J),this.setXYZ($,A7.x,A7.y,A7.z);return this}transformDirection(J){for(let $=0,Q=this.count;$<Q;$++)A7.fromBufferAttribute(this,$),A7.transformDirection(J),this.setXYZ($,A7.x,A7.y,A7.z);return this}set(J,$=0){return this.array.set(J,$),this}getComponent(J,$){let Q=this.array[J*this.itemSize+$];if(this.normalized)Q=w8(Q,this.array);return Q}setComponent(J,$,Q){if(this.normalized)Q=o9(Q,this.array);return this.array[J*this.itemSize+$]=Q,this}getX(J){let $=this.array[J*this.itemSize];if(this.normalized)$=w8($,this.array);return $}setX(J,$){if(this.normalized)$=o9($,this.array);return this.array[J*this.itemSize]=$,this}getY(J){let $=this.array[J*this.itemSize+1];if(this.normalized)$=w8($,this.array);return $}setY(J,$){if(this.normalized)$=o9($,this.array);return this.array[J*this.itemSize+1]=$,this}getZ(J){let $=this.array[J*this.itemSize+2];if(this.normalized)$=w8($,this.array);return $}setZ(J,$){if(this.normalized)$=o9($,this.array);return this.array[J*this.itemSize+2]=$,this}getW(J){let $=this.array[J*this.itemSize+3];if(this.normalized)$=w8($,this.array);return $}setW(J,$){if(this.normalized)$=o9($,this.array);return this.array[J*this.itemSize+3]=$,this}setXY(J,$,Q){if(J*=this.itemSize,this.normalized)$=o9($,this.array),Q=o9(Q,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this}setXYZ(J,$,Q,Z){if(J*=this.itemSize,this.normalized)$=o9($,this.array),Q=o9(Q,this.array),Z=o9(Z,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=Z,this}setXYZW(J,$,Q,Z,K){if(J*=this.itemSize,this.normalized)$=o9($,this.array),Q=o9(Q,this.array),Z=o9(Z,this.array),K=o9(K,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=Z,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return J.name=this.name,J.usage=this.usage,J.gpuType=this.gpuType,J}dispose(){this.dispatchEvent({type:"dispose"})}}class wZ extends H7{constructor(J,$,Q){super(new Uint16Array(J),$,Q)}}class SZ extends H7{constructor(J,$,Q){super(new Uint32Array(J),$,Q)}}class Y9 extends H7{constructor(J,$,Q){super(new Float32Array(J),$,Q)}}var BN=new f8,V$=new v,LK=new v;class OJ{constructor(J=new v,$=-1){this.isSphere=!0,this.center=J,this.radius=$}set(J,$){return this.center.copy(J),this.radius=$,this}setFromPoints(J,$){let Q=this.center;if($!==void 0)Q.copy($);else BN.setFromPoints(J).getCenter(Q);let Z=0;for(let K=0,U=J.length;K<U;K++)Z=Math.max(Z,Q.distanceToSquared(J[K]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let $=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=$*$}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,$){let Q=this.center.distanceToSquared(J);if($.copy(J),Q>this.radius*this.radius)$.sub(this.center).normalize(),$.multiplyScalar(this.radius).add(this.center);return $}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;V$.subVectors(J,this.center);let $=V$.lengthSq();if($>this.radius*this.radius){let Q=Math.sqrt($),Z=(Q-this.radius)*0.5;this.center.addScaledVector(V$,Z/Q),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else LK.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(V$.copy(J.center).add(LK)),this.expandByPoint(V$.copy(J.center).sub(LK));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var IN=0,_8=new h9,PK=new v9,f6=new v,q8=new f8,_$=new f8,S7=new v;class V9 extends DJ{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:IN++}),this.uuid=o8(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((nG(J))?SZ:wZ)(J,1);else this.index=J;return this}setIndirect(J,$=0){return this.indirect=J,this.indirectOffset=$,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,$){return this.attributes[J]=$,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,$,Q=0){this.groups.push({start:J,count:$,materialIndex:Q})}clearGroups(){this.groups=[]}setDrawRange(J,$){this.drawRange.start=J,this.drawRange.count=$}applyMatrix4(J){let $=this.attributes.position;if($!==void 0)$.applyMatrix4(J),$.needsUpdate=!0;let Q=this.attributes.normal;if(Q!==void 0){let K=new D9().getNormalMatrix(J);Q.applyNormalMatrix(K),Q.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return _8.makeRotationFromQuaternion(J),this.applyMatrix4(_8),this}rotateX(J){return _8.makeRotationX(J),this.applyMatrix4(_8),this}rotateY(J){return _8.makeRotationY(J),this.applyMatrix4(_8),this}rotateZ(J){return _8.makeRotationZ(J),this.applyMatrix4(_8),this}translate(J,$,Q){return _8.makeTranslation(J,$,Q),this.applyMatrix4(_8),this}scale(J,$,Q){return _8.makeScale(J,$,Q),this.applyMatrix4(_8),this}lookAt(J){return PK.lookAt(J),PK.updateMatrix(),this.applyMatrix4(PK.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(f6).negate(),this.translate(f6.x,f6.y,f6.z),this}setFromPoints(J){let $=this.getAttribute("position");if($===void 0){let Q=[];for(let Z=0,K=J.length;Z<K;Z++){let U=J[Z];Q.push(U.x,U.y,U.z||0)}this.setAttribute("position",new Y9(Q,3))}else{let Q=Math.min(J.length,$.count);for(let Z=0;Z<Q;Z++){let K=J[Z];$.setXYZ(Z,K.x,K.y,K.z||0)}if(J.length>$.count)H9("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");$.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new f8;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){N9("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new v(-1/0,-1/0,-1/0),new v(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),$)for(let Q=0,Z=$.length;Q<Z;Q++){let K=$[Q];if(q8.setFromBufferAttribute(K),this.morphTargetsRelative)S7.addVectors(this.boundingBox.min,q8.min),this.boundingBox.expandByPoint(S7),S7.addVectors(this.boundingBox.max,q8.max),this.boundingBox.expandByPoint(S7);else this.boundingBox.expandByPoint(q8.min),this.boundingBox.expandByPoint(q8.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))N9('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new OJ;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){N9("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new v,1/0);return}if(J){let Q=this.boundingSphere.center;if(q8.setFromBufferAttribute(J),$)for(let K=0,U=$.length;K<U;K++){let H=$[K];if(_$.setFromBufferAttribute(H),this.morphTargetsRelative)S7.addVectors(q8.min,_$.min),q8.expandByPoint(S7),S7.addVectors(q8.max,_$.max),q8.expandByPoint(S7);else q8.expandByPoint(_$.min),q8.expandByPoint(_$.max)}q8.getCenter(Q);let Z=0;for(let K=0,U=J.count;K<U;K++)S7.fromBufferAttribute(J,K),Z=Math.max(Z,Q.distanceToSquared(S7));if($)for(let K=0,U=$.length;K<U;K++){let H=$[K],Y=this.morphTargetsRelative;for(let W=0,G=H.count;W<G;W++){if(S7.fromBufferAttribute(H,W),Y)f6.fromBufferAttribute(J,W),S7.add(f6);Z=Math.max(Z,Q.distanceToSquared(S7))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))N9('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,$=this.attributes;if(J===null||$.position===void 0||$.normal===void 0||$.uv===void 0){N9("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:Q,normal:Z,uv:K}=$,U=this.getAttribute("tangent");if(U===void 0||U.count!==Q.count)U=new H7(new Float32Array(4*Q.count),4),this.setAttribute("tangent",U);let H=[],Y=[];for(let A=0;A<Q.count;A++)H[A]=new v,Y[A]=new v;let W=new v,G=new v,N=new v,q=new q0,X=new q0,F=new q0,R=new v,M=new v;function D(A,V,z){W.fromBufferAttribute(Q,A),G.fromBufferAttribute(Q,V),N.fromBufferAttribute(Q,z),q.fromBufferAttribute(K,A),X.fromBufferAttribute(K,V),F.fromBufferAttribute(K,z),G.sub(W),N.sub(W),X.sub(q),F.sub(q);let y=1/(X.x*F.y-F.x*X.y);if(!isFinite(y))return;R.copy(G).multiplyScalar(F.y).addScaledVector(N,-X.y).multiplyScalar(y),M.copy(N).multiplyScalar(X.x).addScaledVector(G,-F.x).multiplyScalar(y),H[A].add(R),H[V].add(R),H[z].add(R),Y[A].add(M),Y[V].add(M),Y[z].add(M)}let E=this.groups;if(E.length===0)E=[{start:0,count:J.count}];for(let A=0,V=E.length;A<V;++A){let z=E[A],y=z.start,k=z.count;for(let f=y,s=y+k;f<s;f+=3)D(J.getX(f+0),J.getX(f+1),J.getX(f+2))}let I=new v,C=new v,O=new v,B=new v;function _(A){O.fromBufferAttribute(Z,A),B.copy(O);let V=H[A];I.copy(V),I.sub(O.multiplyScalar(O.dot(V))).normalize(),C.crossVectors(B,V);let y=C.dot(Y[A])<0?-1:1;U.setXYZW(A,I.x,I.y,I.z,y)}for(let A=0,V=E.length;A<V;++A){let z=E[A],y=z.start,k=z.count;for(let f=y,s=y+k;f<s;f+=3)_(J.getX(f+0)),_(J.getX(f+1)),_(J.getX(f+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,$=this.getAttribute("position");if($!==void 0){let Q=this.getAttribute("normal");if(Q===void 0||Q.count!==$.count)Q=new H7(new Float32Array($.count*3),3),this.setAttribute("normal",Q);else for(let q=0,X=Q.count;q<X;q++)Q.setXYZ(q,0,0,0);let Z=new v,K=new v,U=new v,H=new v,Y=new v,W=new v,G=new v,N=new v;if(J)for(let q=0,X=J.count;q<X;q+=3){let F=J.getX(q+0),R=J.getX(q+1),M=J.getX(q+2);Z.fromBufferAttribute($,F),K.fromBufferAttribute($,R),U.fromBufferAttribute($,M),G.subVectors(U,K),N.subVectors(Z,K),G.cross(N),H.fromBufferAttribute(Q,F),Y.fromBufferAttribute(Q,R),W.fromBufferAttribute(Q,M),H.add(G),Y.add(G),W.add(G),Q.setXYZ(F,H.x,H.y,H.z),Q.setXYZ(R,Y.x,Y.y,Y.z),Q.setXYZ(M,W.x,W.y,W.z)}else for(let q=0,X=$.count;q<X;q+=3)Z.fromBufferAttribute($,q+0),K.fromBufferAttribute($,q+1),U.fromBufferAttribute($,q+2),G.subVectors(U,K),N.subVectors(Z,K),G.cross(N),Q.setXYZ(q+0,G.x,G.y,G.z),Q.setXYZ(q+1,G.x,G.y,G.z),Q.setXYZ(q+2,G.x,G.y,G.z);this.normalizeNormals(),Q.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let $=0,Q=J.count;$<Q;$++)S7.fromBufferAttribute(J,$),S7.normalize(),J.setXYZ($,S7.x,S7.y,S7.z)}toNonIndexed(){function J(H,Y){let{array:W,itemSize:G,normalized:N}=H,q=new W.constructor(Y.length*G),X=0,F=0;for(let R=0,M=Y.length;R<M;R++){if(H.isInterleavedBufferAttribute)X=Y[R]*H.data.stride+H.offset;else X=Y[R]*G;for(let D=0;D<G;D++)q[F++]=W[X++]}return new H7(q,G,N)}if(this.index===null)return H9("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let $=new V9,Q=this.index.array,Z=this.attributes;for(let H in Z){let Y=Z[H],W=J(Y,Q);$.setAttribute(H,W)}let K=this.morphAttributes;for(let H in K){let Y=[],W=K[H];for(let G=0,N=W.length;G<N;G++){let q=W[G],X=J(q,Q);Y.push(X)}$.morphAttributes[H]=Y}$.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;for(let H=0,Y=U.length;H<Y;H++){let W=U[H];$.addGroup(W.start,W.count,W.materialIndex)}return $}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,J.name=this.name,Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let W in Y)if(Y[W]!==void 0)J[W]=Y[W];return J}J.data={attributes:{}};let $=this.index;if($!==null)J.data.index={type:$.array.constructor.name,array:Array.prototype.slice.call($.array)};let Q=this.attributes;for(let Y in Q){let W=Q[Y];J.data.attributes[Y]=W.toJSON(J.data)}let Z={},K=!1;for(let Y in this.morphAttributes){let W=this.morphAttributes[Y],G=[];for(let N=0,q=W.length;N<q;N++){let X=W[N];G.push(X.toJSON(J.data))}if(G.length>0)Z[Y]=G,K=!0}if(K)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;if(U.length>0)J.data.groups=JSON.parse(JSON.stringify(U));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let $={};this.name=J.name;let Q=J.index;if(Q!==null)this.setIndex(Q.clone());let Z=J.attributes;for(let W in Z){let G=Z[W];this.setAttribute(W,G.clone($))}let K=J.morphAttributes;for(let W in K){let G=[],N=K[W];for(let q=0,X=N.length;q<X;q++)G.push(N[q].clone($));this.morphAttributes[W]=G}this.morphTargetsRelative=J.morphTargetsRelative;let U=J.groups;for(let W=0,G=U.length;W<G;W++){let N=U[W];this.addGroup(N.start,N.count,N.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hU{constructor(J,$){this.isInterleavedBuffer=!0,this.array=J,this.stride=$,this.count=J!==void 0?J.length/$:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=o8()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,$,Q){J*=this.stride,Q*=$.stride;for(let Z=0,K=this.stride;Z<K;Z++)this.array[J+Z]=$.array[Q+Z];return this}set(J,$=0){return this.array.set(J,$),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=o8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let $=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),Q=new this.constructor($,this.stride);return Q.setUsage(this.usage),Q}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=o8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));let $={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return $.usage=this.usage,$}}var c7=new v;class v${constructor(J,$,Q,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=$,this.offset=Q,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let $=0,Q=this.data.count;$<Q;$++)c7.fromBufferAttribute(this,$),c7.applyMatrix4(J),this.setXYZ($,c7.x,c7.y,c7.z);return this}applyNormalMatrix(J){for(let $=0,Q=this.count;$<Q;$++)c7.fromBufferAttribute(this,$),c7.applyNormalMatrix(J),this.setXYZ($,c7.x,c7.y,c7.z);return this}transformDirection(J){for(let $=0,Q=this.count;$<Q;$++)c7.fromBufferAttribute(this,$),c7.transformDirection(J),this.setXYZ($,c7.x,c7.y,c7.z);return this}getComponent(J,$){let Q=this.array[J*this.data.stride+this.offset+$];if(this.normalized)Q=w8(Q,this.array);return Q}setComponent(J,$,Q){if(this.normalized)Q=o9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+$]=Q,this}setX(J,$){if(this.normalized)$=o9($,this.array);return this.data.array[J*this.data.stride+this.offset]=$,this}setY(J,$){if(this.normalized)$=o9($,this.array);return this.data.array[J*this.data.stride+this.offset+1]=$,this}setZ(J,$){if(this.normalized)$=o9($,this.array);return this.data.array[J*this.data.stride+this.offset+2]=$,this}setW(J,$){if(this.normalized)$=o9($,this.array);return this.data.array[J*this.data.stride+this.offset+3]=$,this}getX(J){let $=this.data.array[J*this.data.stride+this.offset];if(this.normalized)$=w8($,this.array);return $}getY(J){let $=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)$=w8($,this.array);return $}getZ(J){let $=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)$=w8($,this.array);return $}getW(J){let $=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)$=w8($,this.array);return $}setXY(J,$,Q){if(J=J*this.data.stride+this.offset,this.normalized)$=o9($,this.array),Q=o9(Q,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this}setXYZ(J,$,Q,Z){if(J=J*this.data.stride+this.offset,this.normalized)$=o9($,this.array),Q=o9(Q,this.array),Z=o9(Z,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this.data.array[J+2]=Z,this}setXYZW(J,$,Q,Z,K){if(J=J*this.data.stride+this.offset,this.normalized)$=o9($,this.array),Q=o9(Q,this.array),Z=o9(Z,this.array),K=o9(K,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this.data.array[J+2]=Z,this.data.array[J+3]=K,this}clone(J){if(J===void 0){j$("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Q=0;Q<this.count;Q++){let Z=Q*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Z+K])}return new H7(new this.array.constructor($),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new v$(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){j$("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Q=0;Q<this.count;Q++){let Z=Q*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Z+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:$,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var CK=new v,zN=new v,AN=new D9;class i8{constructor(J=new v(1,0,0),$=0){this.isPlane=!0,this.normal=J,this.constant=$}set(J,$){return this.normal.copy(J),this.constant=$,this}setComponents(J,$,Q,Z){return this.normal.set(J,$,Q),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,$){return this.normal.copy(J),this.constant=-$.dot(this.normal),this}setFromCoplanarPoints(J,$,Q){let Z=CK.subVectors(Q,$).cross(zN.subVectors(J,$)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,$){return $.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,$,Q=!0){let Z=J.delta(CK),K=this.normal.dot(Z);if(K===0){if(this.distanceToPoint(J.start)===0)return $.copy(J.start);return null}let U=-(J.start.dot(this.normal)+this.constant)/K;if(Q===!0&&(U<0||U>1))return null;return $.copy(J.start).addScaledVector(Z,U)}intersectsLine(J){let $=this.distanceToPoint(J.start),Q=this.distanceToPoint(J.end);return $<0&&Q>0||Q<0&&$>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,$){let Q=$||AN.getNormalMatrix(J),Z=this.coplanarPoint(CK).applyMatrix4(J),K=this.normal.applyMatrix3(Q).normalize();return this.constant=-Z.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(J){return this.normal.fromArray(J.normal),this.constant=J.constant,this}}var LN=0;class y8 extends DJ{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:LN++}),this.uuid=o8(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new D0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let $ in J){let Q=J[$];if(Q===void 0){H9(`Material: parameter '${$}' has value of undefined.`);continue}let Z=this[$];if(Z===void 0){H9(`Material: '${$}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set(Q);else if(Z&&Z.isVector2&&(Q&&Q.isVector2)||Z&&Z.isEuler&&(Q&&Q.isEuler)||Z&&Z.isVector3&&(Q&&Q.isVector3))Z.copy(Q);else this[$]=Q}}toJSON(J){let $=J===void 0||typeof J==="string";if($)J={textures:{},images:{}};let Q={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(Q.uuid=this.uuid,Q.type=this.type,Q.blending=this.blending,Q.side=this.side,Q.shadowSide=this.shadowSide,Q.vertexColors=this.vertexColors,Q.opacity=this.opacity,Q.transparent=this.transparent,Q.blendSrc=this.blendSrc,Q.blendDst=this.blendDst,Q.blendEquation=this.blendEquation,Q.blendSrcAlpha=this.blendSrcAlpha,Q.blendDstAlpha=this.blendDstAlpha,Q.blendEquationAlpha=this.blendEquationAlpha,Q.blendColor=this.blendColor.getHex(),Q.blendAlpha=this.blendAlpha,Q.depthFunc=this.depthFunc,Q.depthTest=this.depthTest,Q.depthWrite=this.depthWrite,Q.colorWrite=this.colorWrite,Q.clipIntersection=this.clipIntersection,Q.clipShadows=this.clipShadows,Q.stencilWriteMask=this.stencilWriteMask,Q.stencilFunc=this.stencilFunc,Q.stencilRef=this.stencilRef,Q.stencilFuncMask=this.stencilFuncMask,Q.stencilFail=this.stencilFail,Q.stencilZFail=this.stencilZFail,Q.stencilZPass=this.stencilZPass,Q.stencilWrite=this.stencilWrite,Q.polygonOffset=this.polygonOffset,Q.polygonOffsetFactor=this.polygonOffsetFactor,Q.polygonOffsetUnits=this.polygonOffsetUnits,Q.dithering=this.dithering,Q.alphaTest=this.alphaTest,Q.alphaHash=this.alphaHash,Q.alphaToCoverage=this.alphaToCoverage,Q.premultipliedAlpha=this.premultipliedAlpha,Q.forceSinglePass=this.forceSinglePass,Q.allowOverride=this.allowOverride,Q.visible=this.visible,Q.toneMapped=this.toneMapped,Q.name=this.name,this.color&&this.color.isColor)Q.color=this.color.getHex();if(this.roughness!==void 0)Q.roughness=this.roughness;if(this.metalness!==void 0)Q.metalness=this.metalness;if(this.sheen!==void 0)Q.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Q.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Q.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Q.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)Q.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Q.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Q.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Q.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Q.shininess=this.shininess;if(this.clearcoat!==void 0)Q.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Q.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Q.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Q.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Q.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Q.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)Q.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)Q.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)Q.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)Q.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)Q.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Q.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Q.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Q.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Q.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Q.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Q.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Q.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Q.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Q.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Q.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Q.lightMap=this.lightMap.toJSON(J).uuid,Q.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Q.aoMap=this.aoMap.toJSON(J).uuid,Q.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Q.bumpMap=this.bumpMap.toJSON(J).uuid,Q.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Q.normalMap=this.normalMap.toJSON(J).uuid,Q.normalMapType=this.normalMapType,Q.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Q.displacementMap=this.displacementMap.toJSON(J).uuid,Q.displacementScale=this.displacementScale,Q.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Q.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Q.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Q.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Q.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Q.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Q.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Q.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Q.combine=this.combine}if(this.envMapRotation!==void 0)Q.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)Q.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Q.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Q.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Q.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Q.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Q.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Q.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Q.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0)Q.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Q.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Q.size=this.size;if(this.sizeAttenuation!==void 0)Q.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)Q.clippingPlanes=this.clippingPlanes.map((K)=>K.toJSON());if(this.rotation!==void 0)Q.rotation=this.rotation;if(this.depthPacking!==void 0)Q.depthPacking=this.depthPacking;if(this.linewidth!==void 0)Q.linewidth=this.linewidth;if(this.linecap!==void 0)Q.linecap=this.linecap;if(this.linejoin!==void 0)Q.linejoin=this.linejoin;if(this.dashSize!==void 0)Q.dashSize=this.dashSize;if(this.gapSize!==void 0)Q.gapSize=this.gapSize;if(this.scale!==void 0)Q.scale=this.scale;if(this.wireframe!==void 0)Q.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)Q.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)Q.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)Q.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)Q.flatShading=this.flatShading;if(this.fog!==void 0)Q.fog=this.fog;if(Object.keys(this.userData).length>0)Q.userData=this.userData;function Z(K){let U=[];for(let H in K){let Y=K[H];delete Y.metadata,U.push(Y)}return U}if($){let K=Z(J.textures),U=Z(J.images);if(K.length>0)Q.textures=K;if(U.length>0)Q.images=U}return Q}fromJSON(J,$){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new D0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.retroreflectivity!==void 0)this.retroreflectivity=J.retroreflectivity;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.clippingPlanes!==void 0)this.clippingPlanes=J.clippingPlanes.map((Q)=>new i8().fromJSON(Q));if(J.clipIntersection!==void 0)this.clipIntersection=J.clipIntersection;if(J.clipShadows!==void 0)this.clipShadows=J.clipShadows;if(J.depthPacking!==void 0)this.depthPacking=J.depthPacking;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.linecap!==void 0)this.linecap=J.linecap;if(J.linejoin!==void 0)this.linejoin=J.linejoin;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=$[J.map]||null;if(J.matcap!==void 0)this.matcap=$[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=$[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=$[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=$[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let Q=J.normalScale;if(Array.isArray(Q)===!1)Q=[Q,Q];this.normalScale=new q0().fromArray(Q)}if(J.displacementMap!==void 0)this.displacementMap=$[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=$[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=$[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=$[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=$[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=$[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=$[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=$[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=$[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=$[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=$[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=$[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=$[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=$[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new q0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=$[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=$[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=$[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=$[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=$[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=$[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=$[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let $=J.clippingPlanes,Q=null;if($!==null){let Z=$.length;Q=Array(Z);for(let K=0;K!==Z;++K)Q[K]=$[K].clone()}return this.clippingPlanes=Q,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class t6 extends y8{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new D0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var y6,B$=new v,b6=new v,x6=new v,h6=new q0,I$=new q0,i5=new h9,gQ=new v,z$=new v,pQ=new v,BY=new q0,TK=new q0,IY=new q0;class a$ extends v9{constructor(J=new t6){super();if(this.isSprite=!0,this.type="Sprite",y6===void 0){y6=new V9;let $=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Q=new hU($,5);y6.setIndex([0,1,2,0,2,3]),y6.setAttribute("position",new v$(Q,3,0,!1)),y6.setAttribute("uv",new v$(Q,2,3,!1))}this.geometry=y6,this.material=J,this.center=new q0(0.5,0.5),this.count=1}intersectsFrustum(J){return J.intersectsSprite(this)}raycast(J,$){if(J.camera===null)N9('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(b6.setFromMatrixScale(this.matrixWorld),i5.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),x6.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)b6.multiplyScalar(-x6.z);let Q=this.material.rotation,Z,K;if(Q!==0)K=Math.cos(Q),Z=Math.sin(Q);let U=this.center;uQ(gQ.set(-0.5,-0.5,0),x6,U,b6,Z,K),uQ(z$.set(0.5,-0.5,0),x6,U,b6,Z,K),uQ(pQ.set(0.5,0.5,0),x6,U,b6,Z,K),BY.set(0,0),TK.set(1,0),IY.set(1,1);let H=J.ray.intersectTriangle(gQ,z$,pQ,!1,B$);if(H===null){if(uQ(z$.set(-0.5,0.5,0),x6,U,b6,Z,K),TK.set(0,1),H=J.ray.intersectTriangle(gQ,pQ,z$,!1,B$),H===null)return}let Y=J.ray.origin.distanceTo(B$);if(Y<J.near||Y>J.far)return;$.push({distance:Y,point:B$.clone(),uv:e7.getInterpolation(B$,gQ,z$,pQ,BY,TK,IY,new q0),face:null,object:this})}copy(J,$){if(super.copy(J,$),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function uQ(J,$,Q,Z,K,U){if(h6.subVectors(J,Q).addScalar(0.5).multiply(Z),K!==void 0)I$.x=U*h6.x-K*h6.y,I$.y=K*h6.x+U*h6.y;else I$.copy(h6);J.copy($),J.x+=I$.x,J.y+=I$.y,J.applyMatrix4(i5)}var NJ=new v,wK=new v,mQ=new v,dQ=new v;class r${constructor(J=new v,$=new v(0,0,-1)){this.origin=J,this.direction=$}set(J,$){return this.origin.copy(J),this.direction.copy($),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,$){return $.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,NJ)),this}closestPointToPoint(J,$){$.subVectors(J,this.origin);let Q=$.dot(this.direction);if(Q<0)return $.copy(this.origin);return $.copy(this.origin).addScaledVector(this.direction,Q)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let $=NJ.subVectors(J,this.origin).dot(this.direction);if($<0)return this.origin.distanceToSquared(J);return NJ.copy(this.origin).addScaledVector(this.direction,$),NJ.distanceToSquared(J)}distanceSqToSegment(J,$,Q,Z){wK.copy(J).add($).multiplyScalar(0.5),mQ.copy($).sub(J).normalize(),dQ.copy(this.origin).sub(wK);let K=J.distanceTo($)*0.5,U=-this.direction.dot(mQ),H=dQ.dot(this.direction),Y=-dQ.dot(mQ),W=dQ.lengthSq(),G=Math.abs(1-U*U),N,q,X,F;if(G>0)if(N=U*Y-H,q=U*H-Y,F=K*G,N>=0)if(q>=-F)if(q<=F){let R=1/G;N*=R,q*=R,X=N*(N+U*q+2*H)+q*(U*N+q+2*Y)+W}else q=K,N=Math.max(0,-(U*q+H)),X=-N*N+q*(q+2*Y)+W;else q=-K,N=Math.max(0,-(U*q+H)),X=-N*N+q*(q+2*Y)+W;else if(q<=-F)N=Math.max(0,-(-U*K+H)),q=N>0?-K:Math.min(Math.max(-K,-Y),K),X=-N*N+q*(q+2*Y)+W;else if(q<=F)N=0,q=Math.min(Math.max(-K,-Y),K),X=q*(q+2*Y)+W;else N=Math.max(0,-(U*K+H)),q=N>0?K:Math.min(Math.max(-K,-Y),K),X=-N*N+q*(q+2*Y)+W;else q=U>0?-K:K,N=Math.max(0,-(U*q+H)),X=-N*N+q*(q+2*Y)+W;if(Q)Q.copy(this.origin).addScaledVector(this.direction,N);if(Z)Z.copy(wK).addScaledVector(mQ,q);return X}intersectSphere(J,$){if(J.radius<0)return null;NJ.subVectors(J.center,this.origin);let Q=NJ.dot(this.direction),Z=NJ.dot(NJ)-Q*Q,K=J.radius*J.radius;if(Z>K)return null;let U=Math.sqrt(K-Z),H=Q-U,Y=Q+U;if(Y<0)return null;if(H<0)return this.at(Y,$);return this.at(H,$)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let $=J.normal.dot(this.direction);if($===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Q=-(this.origin.dot(J.normal)+J.constant)/$;return Q>=0?Q:null}intersectPlane(J,$){let Q=this.distanceToPlane(J);if(Q===null)return null;return this.at(Q,$)}intersectsPlane(J){let $=J.distanceToPoint(this.origin);if($===0)return!0;if(J.normal.dot(this.direction)*$<0)return!0;return!1}intersectBox(J,$){let Q,Z,K,U,H,Y,W=1/this.direction.x,G=1/this.direction.y,N=1/this.direction.z,q=this.origin;if(W>=0)Q=(J.min.x-q.x)*W,Z=(J.max.x-q.x)*W;else Q=(J.max.x-q.x)*W,Z=(J.min.x-q.x)*W;if(G>=0)K=(J.min.y-q.y)*G,U=(J.max.y-q.y)*G;else K=(J.max.y-q.y)*G,U=(J.min.y-q.y)*G;if(Q>U||K>Z)return null;if(K>Q||isNaN(Q))Q=K;if(U<Z||isNaN(Z))Z=U;if(N>=0)H=(J.min.z-q.z)*N,Y=(J.max.z-q.z)*N;else H=(J.max.z-q.z)*N,Y=(J.min.z-q.z)*N;if(Q>Y||H>Z)return null;if(H>Q||Q!==Q)Q=H;if(Y<Z||Z!==Z)Z=Y;if(Z<0)return null;return this.at(Q>=0?Q:Z,$)}intersectsBox(J){return this.intersectBox(J,NJ)!==null}intersectTriangle(J,$,Q,Z,K){let U=this.origin,H=this.direction,Y=H.x,W=H.y,G=H.z,N=J.x-U.x,q=J.y-U.y,X=J.z-U.z,F=$.x-U.x,R=$.y-U.y,M=$.z-U.z,D=Q.x-U.x,E=Q.y-U.y,I=Q.z-U.z,C=Math.abs(Y),O=Math.abs(W),B=Math.abs(G),_,A,V,z,y,k,f,s,j,p,e,n;if(C>=O&&C>=B)if(V=Y,k=N,j=F,n=D,Y>=0)_=W,A=G,z=q,y=X,f=R,s=M,p=E,e=I;else _=G,A=W,z=X,y=q,f=M,s=R,p=I,e=E;else if(O>=B)if(V=W,k=q,j=R,n=E,W>=0)_=G,A=Y,z=X,y=N,f=M,s=F,p=I,e=D;else _=Y,A=G,z=N,y=X,f=F,s=M,p=D,e=I;else if(V=G,k=X,j=M,n=I,G>=0)_=Y,A=W,z=N,y=q,f=F,s=R,p=D,e=E;else _=W,A=Y,z=q,y=N,f=R,s=F,p=E,e=D;if(V===0)return null;let r=_/V,u=A/V,x=1/V,K0=z-r*k,R0=y-u*k,T0=f-r*j,l=s-u*j,F0=p-r*n,i=e-u*n,N0=F0*l-i*T0,G0=K0*i-R0*F0,c=T0*R0-l*K0;if(Z){if(N0<0||G0<0||c<0)return null}else if((N0<0||G0<0||c<0)&&(N0>0||G0>0||c>0))return null;let P0=N0+G0+c;if(P0===0)return null;let J0=x*(N0*k+G0*j+c*n);if(P0>0?J0<0:J0>0)return null;return this.at(J0/P0,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class C0 extends y8{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new D0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qJ,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var zY=new h9,tJ=new r$,lQ=new OJ,AY=new v,cQ=new v,nQ=new v,iQ=new v,SK=new v,sQ=new v,LY=new v,oQ=new v;class h extends v9{constructor(J=new V9,$=new C0){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=$,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,$){if(super.copy(J,$),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}getVertexPosition(J,$){let Q=this.geometry,Z=Q.attributes.position,K=Q.morphAttributes.position,U=Q.morphTargetsRelative;$.fromBufferAttribute(Z,J);let H=this.morphTargetInfluences;if(K&&H){sQ.set(0,0,0);for(let Y=0,W=K.length;Y<W;Y++){let G=H[Y],N=K[Y];if(G===0)continue;if(SK.fromBufferAttribute(N,J),U)sQ.addScaledVector(SK,G);else sQ.addScaledVector(SK.sub($),G)}$.add(sQ)}return $}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,$){let Q=this.geometry,Z=this.material,K=this.matrixWorld;if(Z===void 0)return;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(lQ.copy(Q.boundingSphere),lQ.applyMatrix4(K),tJ.copy(J.ray).recast(J.near),lQ.containsPoint(tJ.origin)===!1){if(tJ.intersectSphere(lQ,AY)===null)return;if(tJ.origin.distanceToSquared(AY)>(J.far-J.near)**2)return}if(zY.copy(K).invert(),tJ.copy(J.ray).applyMatrix4(zY),Q.boundingBox!==null){if(tJ.intersectsBox(Q.boundingBox)===!1)return}this._computeIntersections(J,$,tJ)}_computeIntersections(J,$,Q){let Z,K=this.geometry,U=this.material,H=K.index,Y=K.attributes.position,W=K.attributes.uv,G=K.attributes.uv1,N=K.attributes.normal,q=K.groups,X=K.drawRange;if(H!==null)if(Array.isArray(U))for(let F=0,R=q.length;F<R;F++){let M=q[F],D=U[M.materialIndex],E=Math.max(M.start,X.start),I=Math.min(H.count,Math.min(M.start+M.count,X.start+X.count));for(let C=E,O=I;C<O;C+=3){let B=H.getX(C),_=H.getX(C+1),A=H.getX(C+2);if(Z=aQ(this,D,J,Q,W,G,N,B,_,A),Z)Z.faceIndex=Math.floor(C/3),Z.face.materialIndex=M.materialIndex,$.push(Z)}}else{let F=Math.max(0,X.start),R=Math.min(H.count,X.start+X.count);for(let M=F,D=R;M<D;M+=3){let E=H.getX(M),I=H.getX(M+1),C=H.getX(M+2);if(Z=aQ(this,U,J,Q,W,G,N,E,I,C),Z)Z.faceIndex=Math.floor(M/3),$.push(Z)}}else if(Y!==void 0)if(Array.isArray(U))for(let F=0,R=q.length;F<R;F++){let M=q[F],D=U[M.materialIndex],E=Math.max(M.start,X.start),I=Math.min(Y.count,Math.min(M.start+M.count,X.start+X.count));for(let C=E,O=I;C<O;C+=3){let B=C,_=C+1,A=C+2;if(Z=aQ(this,D,J,Q,W,G,N,B,_,A),Z)Z.faceIndex=Math.floor(C/3),Z.face.materialIndex=M.materialIndex,$.push(Z)}}else{let F=Math.max(0,X.start),R=Math.min(Y.count,X.start+X.count);for(let M=F,D=R;M<D;M+=3){let E=M,I=M+1,C=M+2;if(Z=aQ(this,U,J,Q,W,G,N,E,I,C),Z)Z.faceIndex=Math.floor(M/3),$.push(Z)}}}}function PN(J,$,Q,Z,K,U,H,Y){let W;if($.side===1)W=Z.intersectTriangle(H,U,K,!0,Y);else W=Z.intersectTriangle(K,U,H,$.side===0,Y);if(W===null)return null;oQ.copy(Y),oQ.applyMatrix4(J.matrixWorld);let G=Q.ray.origin.distanceTo(oQ);if(G<Q.near||G>Q.far)return null;return{distance:G,point:oQ.clone(),object:J}}function aQ(J,$,Q,Z,K,U,H,Y,W,G){J.getVertexPosition(Y,cQ),J.getVertexPosition(W,nQ),J.getVertexPosition(G,iQ);let N=PN(J,$,Q,Z,cQ,nQ,iQ,LY);if(N){let q=new v;if(e7.getBarycoord(LY,cQ,nQ,iQ,q),K)N.uv=e7.getInterpolatedAttribute(K,Y,W,G,q,new q0);if(U)N.uv1=e7.getInterpolatedAttribute(U,Y,W,G,q,new q0);if(H){if(N.normal=e7.getInterpolatedAttribute(H,Y,W,G,q,new v),N.normal.dot(Z.direction)>0)N.normal.multiplyScalar(-1)}let X={a:Y,b:W,c:G,normal:new v,materialIndex:0};e7.getNormal(cQ,nQ,iQ,X.normal),N.face=X,N.barycoord=q}return N}class uJ extends y7{constructor(J=null,$=1,Q=1,Z,K,U,H,Y,W=1003,G=1003,N,q){super(null,U,H,Y,W,G,Z,K,N,q);this.isDataTexture=!0,this.image={data:J,width:$,height:Q},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class NZ extends H7{constructor(J,$,Q,Z=1){super(J,$,Q);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var g6=new h9,PY=new h9,rQ=[],CY=new f8,CN=new h9,A$=new h,L$=new OJ;class f9 extends h{constructor(J,$,Q){super(J,$);this.isInstancedMesh=!0,this.instanceMatrix=new NZ(new Float32Array(Q*16),16),this.instanceColor=null,this.morphTexture=null,this.count=Q,this.boundingBox=null,this.boundingSphere=null;for(let Z=0;Z<Q;Z++)this.setMatrixAt(Z,CN)}computeBoundingBox(){let J=this.geometry,$=this.count;if(this.boundingBox===null)this.boundingBox=new f8;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let Q=0;Q<$;Q++)this.getMatrixAt(Q,g6),CY.copy(J.boundingBox).applyMatrix4(g6),this.boundingBox.union(CY)}computeBoundingSphere(){let J=this.geometry,$=this.count;if(this.boundingSphere===null)this.boundingSphere=new OJ;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let Q=0;Q<$;Q++)this.getMatrixAt(Q,g6),L$.copy(J.boundingSphere).applyMatrix4(g6),this.boundingSphere.union(L$)}copy(J,$){if(super.copy(J,$),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,$){if(this.instanceColor===null)return $.setRGB(1,1,1);else return $.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,$){return $.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,$){let Q=$.morphTargetInfluences,Z=this.morphTexture.source.data.data,K=Q.length+1,U=J*K+1;for(let H=0;H<Q.length;H++)Q[H]=Z[U+H]}raycast(J,$){let Q=this.matrixWorld,Z=this.count;if(A$.geometry=this.geometry,A$.material=this.material,A$.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(L$.copy(this.boundingSphere),L$.applyMatrix4(Q),J.ray.intersectsSphere(L$)===!1)return;for(let K=0;K<Z;K++){this.getMatrixAt(K,g6),PY.multiplyMatrices(Q,g6),A$.matrixWorld=PY,A$.raycast(J,rQ);for(let U=0,H=rQ.length;U<H;U++){let Y=rQ[U];Y.instanceId=K,Y.object=this,$.push(Y)}rQ.length=0}}setColorAt(J,$){if(this.instanceColor===null)this.instanceColor=new NZ(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return $.toArray(this.instanceColor.array,J*3),this}setMatrixAt(J,$){return $.toArray(this.instanceMatrix.array,J*16),this}setMorphAt(J,$){let Q=$.morphTargetInfluences,Z=Q.length+1;if(this.morphTexture===null)this.morphTexture=new uJ(new Float32Array(Z*this.count),Z,this.count,1028,1015);let K=this.morphTexture.source.data.data,U=0;for(let W=0;W<Q.length;W++)U+=Q[W];let H=this.geometry.morphTargetsRelative?1:1-U,Y=Z*J;return K[Y]=H,K.set(Q,Y+1),this}updateMorphTargets(){}dispose(){if(super.dispose(),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var eJ=new OJ,TN=new q0(0.5,0.5),tQ=new v;class t${constructor(J=new i8,$=new i8,Q=new i8,Z=new i8,K=new i8,U=new i8){this.planes=[J,$,Q,Z,K,U]}set(J,$,Q,Z,K,U){let H=this.planes;return H[0].copy(J),H[1].copy($),H[2].copy(Q),H[3].copy(Z),H[4].copy(K),H[5].copy(U),this}copy(J){let $=this.planes;for(let Q=0;Q<6;Q++)$[Q].copy(J.planes[Q]);return this}setFromProjectionMatrix(J,$=2000,Q=!1){let Z=this.planes,K=J.elements,U=K[0],H=K[1],Y=K[2],W=K[3],G=K[4],N=K[5],q=K[6],X=K[7],F=K[8],R=K[9],M=K[10],D=K[11],E=K[12],I=K[13],C=K[14],O=K[15];if(Z[0].setComponents(W-U,X-G,D-F,O-E).normalize(),Z[1].setComponents(W+U,X+G,D+F,O+E).normalize(),Z[2].setComponents(W+H,X+N,D+R,O+I).normalize(),Z[3].setComponents(W-H,X-N,D-R,O-I).normalize(),Q)Z[4].setComponents(Y,q,M,C).normalize(),Z[5].setComponents(W-Y,X-q,D-M,O-C).normalize();else if(Z[4].setComponents(W-Y,X-q,D-M,O-C).normalize(),$===2000)Z[5].setComponents(W+Y,X+q,D+M,O+C).normalize();else if($===2001)Z[5].setComponents(Y,q,M,C).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+$);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();eJ.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let $=J.geometry;if($.boundingSphere===null)$.computeBoundingSphere();eJ.copy($.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(eJ)}intersectsSprite(J){eJ.center.set(0,0,0);let $=TN.distanceTo(J.center);return eJ.radius=0.7071067811865476+$,eJ.applyMatrix4(J.matrixWorld),this.intersectsSphere(eJ)}intersectsSphere(J){let $=this.planes,Q=J.center,Z=-J.radius;for(let K=0;K<6;K++)if($[K].distanceToPoint(Q)<Z)return!1;return!0}intersectsBox(J){let $=this.planes;for(let Q=0;Q<6;Q++){let Z=$[Q];if(tQ.x=Z.normal.x>0?J.max.x:J.min.x,tQ.y=Z.normal.y>0?J.max.y:J.min.y,tQ.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(tQ)<0)return!1}return!0}containsPoint(J){let $=this.planes;for(let Q=0;Q<6;Q++)if($[Q].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class G6 extends y8{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new D0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var XZ=new v,qZ=new v,TY=new h9,P$=new r$,eQ=new OJ,kK=new v,wY=new v;class gU extends v9{constructor(J=new V9,$=new G6){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=$,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[0];for(let Z=1,K=$.count;Z<K;Z++)XZ.fromBufferAttribute($,Z-1),qZ.fromBufferAttribute($,Z),Q[Z]=Q[Z-1],Q[Z]+=XZ.distanceTo(qZ);J.setAttribute("lineDistance",new Y9(Q,1))}else H9("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,$){let Q=this.geometry,Z=this.matrixWorld,K=J.params.Line.threshold,U=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(eQ.copy(Q.boundingSphere),eQ.applyMatrix4(Z),eQ.radius+=K,J.ray.intersectsSphere(eQ)===!1)return;TY.copy(Z).invert(),P$.copy(J.ray).applyMatrix4(TY);let H=K/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,W=this.isLineSegments?2:1,G=Q.index,q=Q.attributes.position;if(G!==null){let X=Math.max(0,U.start),F=Math.min(G.count,U.start+U.count);for(let R=X,M=F-1;R<M;R+=W){let D=G.getX(R),E=G.getX(R+1),I=JZ(this,J,P$,Y,D,E,R);if(I)$.push(I)}if(this.isLineLoop){let R=G.getX(F-1),M=G.getX(X),D=JZ(this,J,P$,Y,R,M,F-1);if(D)$.push(D)}}else{let X=Math.max(0,U.start),F=Math.min(q.count,U.start+U.count);for(let R=X,M=F-1;R<M;R+=W){let D=JZ(this,J,P$,Y,R,R+1,R);if(D)$.push(D)}if(this.isLineLoop){let R=JZ(this,J,P$,Y,F-1,X,F-1);if(R)$.push(R)}}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}}function JZ(J,$,Q,Z,K,U,H){let Y=J.geometry.attributes.position;if(XZ.fromBufferAttribute(Y,K),qZ.fromBufferAttribute(Y,U),Q.distanceSqToSegment(XZ,qZ,kK,wY)>Z)return;kK.applyMatrix4(J.matrixWorld);let G=$.ray.origin.distanceTo(kK);if(G<$.near||G>$.far)return;return{distance:G,point:wY.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var SY=new v,kY=new v;class b8 extends gU{constructor(J,$){super(J,$);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[];for(let Z=0,K=$.count;Z<K;Z+=2)SY.fromBufferAttribute($,Z),kY.fromBufferAttribute($,Z+1),Q[Z]=Z===0?0:Q[Z-1],Q[Z+1]=Q[Z]+SY.distanceTo(kY);J.setAttribute("lineDistance",new Y9(Q,1))}else H9("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class s7 extends y8{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new D0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var jY=new h9,hK=new r$,$Z=new OJ,QZ=new v;class Q8 extends v9{constructor(J=new V9,$=new s7){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=$,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,$){let Q=this.geometry,Z=this.matrixWorld,K=J.params.Points.threshold,U=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if($Z.copy(Q.boundingSphere),$Z.applyMatrix4(Z),$Z.radius+=K,J.ray.intersectsSphere($Z)===!1)return;jY.copy(Z).invert(),hK.copy(J.ray).applyMatrix4(jY);let H=K/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,W=Q.index,N=Q.attributes.position;if(W!==null){let q=Math.max(0,U.start),X=Math.min(W.count,U.start+U.count);for(let F=q,R=X;F<R;F++){let M=W.getX(F);QZ.fromBufferAttribute(N,M),vY(QZ,M,Y,Z,J,$,this)}}else{let q=Math.max(0,U.start),X=Math.min(N.count,U.start+U.count);for(let F=q,R=X;F<R;F++)QZ.fromBufferAttribute(N,F),vY(QZ,F,Y,Z,J,$,this)}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}}function vY(J,$,Q,Z,K,U,H){let Y=hK.distanceSqToPoint(J);if(Y<Q){let W=new v;hK.closestPointToPoint(J,W),W.applyMatrix4(Z);let G=K.ray.origin.distanceTo(W);if(G<K.near||G>K.far)return;U.push({distance:G,distanceToRay:Math.sqrt(Y),point:W,index:$,face:null,faceIndex:null,barycoord:null,object:H})}}class kZ extends y7{constructor(J=[],$=301,Q,Z,K,U,H,Y,W,G){super(J,$,Q,Z,K,U,H,Y,W,G);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class D7 extends y7{constructor(J,$,Q,Z,K,U,H,Y,W){super(J,$,Q,Z,K,U,H,Y,W);this.isCanvasTexture=!0,this.needsUpdate=!0}}class RJ extends y7{constructor(J,$,Q=1014,Z,K,U,H=1003,Y=1003,W,G=1026,N=1){if(G!==1026&&G!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let q={width:J,height:$,depth:N};super(q,Z,K,U,H,Y,G,Q,W);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new s$(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let $=super.toJSON(J);return $.compareFunction=this.compareFunction,$}}class pU extends RJ{constructor(J,$=1014,Q=301,Z,K,U=1003,H=1003,Y,W=1026){let G={width:J,height:J,depth:1},N=[G,G,G,G,G,G];super(J,J,$,Q,Z,K,U,H,Y,W);this.image=N,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class jZ extends y7{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class I0 extends V9{constructor(J=1,$=1,Q=1,Z=1,K=1,U=1){super();this.type="BoxGeometry",this.parameters={width:J,height:$,depth:Q,widthSegments:Z,heightSegments:K,depthSegments:U};let H=this;Z=Math.floor(Z),K=Math.floor(K),U=Math.floor(U);let Y=[],W=[],G=[],N=[],q=0,X=0;F("z","y","x",-1,-1,Q,$,J,U,K,0),F("z","y","x",1,-1,Q,$,-J,U,K,1),F("x","z","y",1,1,J,Q,$,Z,U,2),F("x","z","y",1,-1,J,Q,-$,Z,U,3),F("x","y","z",1,-1,J,$,Q,Z,K,4),F("x","y","z",-1,-1,J,$,-Q,Z,K,5),this.setIndex(Y),this.setAttribute("position",new Y9(W,3)),this.setAttribute("normal",new Y9(G,3)),this.setAttribute("uv",new Y9(N,2));function F(R,M,D,E,I,C,O,B,_,A,V){let z=C/_,y=O/A,k=C/2,f=O/2,s=B/2,j=_+1,p=A+1,e=0,n=0,r=new v;for(let u=0;u<p;u++){let x=u*y-f;for(let K0=0;K0<j;K0++){let R0=K0*z-k;r[R]=R0*E,r[M]=x*I,r[D]=s,W.push(r.x,r.y,r.z),r[R]=0,r[M]=0,r[D]=B>0?1:-1,G.push(r.x,r.y,r.z),N.push(K0/_),N.push(1-u/A),e+=1}}for(let u=0;u<A;u++)for(let x=0;x<_;x++){let K0=q+x+j*u,R0=q+x+j*(u+1),T0=q+(x+1)+j*(u+1),l=q+(x+1)+j*u;Y.push(K0,R0,l),Y.push(R0,T0,l),n+=6}H.addGroup(X,n,V),X+=n,q+=e}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new I0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class k7 extends V9{constructor(J=1,$=1,Q=4,Z=8,K=1){super();this.type="CapsuleGeometry",this.parameters={radius:J,height:$,capSegments:Q,radialSegments:Z,heightSegments:K},$=Math.max(0,$),Q=Math.max(1,Math.floor(Q)),Z=Math.max(3,Math.floor(Z)),K=Math.max(1,Math.floor(K));let U=[],H=[],Y=[],W=[],G=$/2,N=Math.PI/2*J,q=$,X=2*N+q,F=Q*2+K,R=Z+1,M=new v,D=new v;for(let E=0;E<=F;E++){let I=0,C=0,O=0,B=0;if(E<=Q){let V=E/Q,z=V*Math.PI/2;C=-G-J*Math.cos(z),O=J*Math.sin(z),B=-J*Math.cos(z),I=V*N}else if(E<=Q+K){let V=(E-Q)/K;C=-G+V*$,O=J,B=0,I=N+V*q}else{let V=(E-Q-K)/Q,z=V*Math.PI/2;C=G+J*Math.sin(z),O=J*Math.cos(z),B=J*Math.sin(z),I=N+q+V*N}let _=Math.max(0,Math.min(1,I/X)),A=0;if(E===0)A=0.5/Z;else if(E===F)A=-0.5/Z;for(let V=0;V<=Z;V++){let z=V/Z,y=z*Math.PI*2,k=Math.sin(y),f=Math.cos(y);D.x=-O*f,D.y=C,D.z=O*k,H.push(D.x,D.y,D.z),M.set(-O*f,B,O*k),M.normalize(),Y.push(M.x,M.y,M.z),W.push(z+A,_)}if(E>0){let V=(E-1)*R;for(let z=0;z<Z;z++){let y=V+z,k=V+z+1,f=E*R+z,s=E*R+z+1;U.push(y,k,f),U.push(k,s,f)}}}this.setIndex(U),this.setAttribute("position",new Y9(H,3)),this.setAttribute("normal",new Y9(Y,3)),this.setAttribute("uv",new Y9(W,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new k7(J.radius,J.height,J.capSegments,J.radialSegments,J.heightSegments)}}class C7 extends V9{constructor(J=1,$=32,Q=0,Z=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:$,thetaStart:Q,thetaLength:Z},$=Math.max(3,$);let K=[],U=[],H=[],Y=[],W=new v,G=new q0;U.push(0,0,0),H.push(0,0,1),Y.push(0.5,0.5);for(let N=0,q=3;N<=$;N++,q+=3){let X=Q+N/$*Z;W.x=J*Math.cos(X),W.y=J*Math.sin(X),U.push(W.x,W.y,W.z),H.push(0,0,1),G.x=(U[q]/J+1)/2,G.y=(U[q+1]/J+1)/2,Y.push(G.x,G.y)}for(let N=1;N<=$;N++)K.push(N,N+1,0);this.setIndex(K),this.setAttribute("position",new Y9(U,3)),this.setAttribute("normal",new Y9(H,3)),this.setAttribute("uv",new Y9(Y,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new C7(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class w0 extends V9{constructor(J=1,$=1,Q=1,Z=32,K=1,U=!1,H=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:$,height:Q,radialSegments:Z,heightSegments:K,openEnded:U,thetaStart:H,thetaLength:Y};let W=this;Z=Math.floor(Z),K=Math.floor(K);let G=[],N=[],q=[],X=[],F=0,R=[],M=Q/2,D=0;if(E(),U===!1){if(J>0)I(!0);if($>0)I(!1)}this.setIndex(G),this.setAttribute("position",new Y9(N,3)),this.setAttribute("normal",new Y9(q,3)),this.setAttribute("uv",new Y9(X,2));function E(){let C=new v,O=new v,B=0,_=($-J)/Q;for(let A=0;A<=K;A++){let V=[],z=A/K,y=z*($-J)+J;for(let k=0;k<=Z;k++){let f=k/Z,s=f*Y+H,j=Math.sin(s),p=Math.cos(s);O.x=y*j,O.y=-z*Q+M,O.z=y*p,N.push(O.x,O.y,O.z),C.set(j,_,p).normalize(),q.push(C.x,C.y,C.z),X.push(f,1-z),V.push(F++)}R.push(V)}for(let A=0;A<Z;A++)for(let V=0;V<K;V++){let z=R[V][A],y=R[V+1][A],k=R[V+1][A+1],f=R[V][A+1];if(J>0||V!==0)G.push(z,y,f),B+=3;if($>0||V!==K-1)G.push(y,k,f),B+=3}W.addGroup(D,B,0),D+=B}function I(C){let O=F,B=new q0,_=new v,A=0,V=C===!0?J:$,z=C===!0?1:-1;for(let k=1;k<=Z;k++)N.push(0,M*z,0),q.push(0,z,0),X.push(0.5,0.5),F++;let y=F;for(let k=0;k<=Z;k++){let s=k/Z*Y+H,j=Math.cos(s),p=Math.sin(s);_.x=V*p,_.y=M*z,_.z=V*j,N.push(_.x,_.y,_.z),q.push(0,z,0),B.x=j*0.5+0.5,B.y=p*0.5*z+0.5,X.push(B.x,B.y),F++}for(let k=0;k<Z;k++){let f=O+k,s=y+k;if(C===!0)G.push(s,s+1,f);else G.push(s+1,s,f);A+=3}W.addGroup(D,A,C===!0?1:2),D+=A}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new w0(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class g9 extends w0{constructor(J=1,$=1,Q=32,Z=1,K=!1,U=0,H=Math.PI*2){super(0,J,$,Q,Z,K,U,H);this.type="ConeGeometry",this.parameters={radius:J,height:$,radialSegments:Q,heightSegments:Z,openEnded:K,thetaStart:U,thetaLength:H}}static fromJSON(J){return new g9(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class e$ extends V9{constructor(J=[],$=[],Q=1,Z=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:$,radius:Q,detail:Z};let K=[],U=[];if(H(Z),W(Q),G(),this.setAttribute("position",new Y9(K,3)),this.setAttribute("normal",new Y9(K.slice(),3)),this.setAttribute("uv",new Y9(U,2)),Z===0)this.computeVertexNormals();else this.normalizeNormals();function H(E){let I=new v,C=new v,O=new v;for(let B=0;B<$.length;B+=3)X($[B+0],I),X($[B+1],C),X($[B+2],O),Y(I,C,O,E)}function Y(E,I,C,O){let B=O+1,_=[];for(let A=0;A<=B;A++){_[A]=[];let V=E.clone().lerp(C,A/B),z=I.clone().lerp(C,A/B),y=B-A;for(let k=0;k<=y;k++)if(k===0&&A===B)_[A][k]=V;else _[A][k]=V.clone().lerp(z,k/y)}for(let A=0;A<B;A++)for(let V=0;V<2*(B-A)-1;V++){let z=Math.floor(V/2);if(V%2===0)q(_[A][z+1]),q(_[A+1][z]),q(_[A][z]);else q(_[A][z+1]),q(_[A+1][z+1]),q(_[A+1][z])}}function W(E){let I=new v;for(let C=0;C<K.length;C+=3)I.x=K[C+0],I.y=K[C+1],I.z=K[C+2],I.normalize().multiplyScalar(E),K[C+0]=I.x,K[C+1]=I.y,K[C+2]=I.z}function G(){let E=new v;for(let I=0;I<K.length;I+=3){E.x=K[I+0],E.y=K[I+1],E.z=K[I+2];let C=M(E)/2/Math.PI+0.5,O=D(E)/Math.PI+0.5;U.push(C,1-O)}F(),N()}function N(){for(let E=0;E<U.length;E+=6){let I=U[E+0],C=U[E+2],O=U[E+4],B=Math.max(I,C,O),_=Math.min(I,C,O);if(B>0.9&&_<0.1){if(I<0.2)U[E+0]+=1;if(C<0.2)U[E+2]+=1;if(O<0.2)U[E+4]+=1}}}function q(E){K.push(E.x,E.y,E.z)}function X(E,I){let C=E*3;I.x=J[C+0],I.y=J[C+1],I.z=J[C+2]}function F(){let E=new v,I=new v,C=new v,O=new v,B=new q0,_=new q0,A=new q0;for(let V=0,z=0;V<K.length;V+=9,z+=6){E.set(K[V+0],K[V+1],K[V+2]),I.set(K[V+3],K[V+4],K[V+5]),C.set(K[V+6],K[V+7],K[V+8]),B.set(U[z+0],U[z+1]),_.set(U[z+2],U[z+3]),A.set(U[z+4],U[z+5]),O.copy(E).add(I).add(C).divideScalar(3);let y=M(O);R(B,z+0,E,y),R(_,z+2,I,y),R(A,z+4,C,y)}}function R(E,I,C,O){if(O<0&&E.x===1)U[I]=E.x-1;if(C.x===0&&C.z===0)U[I]=O/2/Math.PI+0.5}function M(E){return Math.atan2(E.z,-E.x)}function D(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new e$(J.vertices,J.indices,J.radius,J.detail)}}var ZZ=new v,KZ=new v,jK=new v,UZ=new e7;class e6 extends V9{constructor(J=null,$=1){super();if(this.type="EdgesGeometry",this.parameters={geometry:J,thresholdAngle:$},J!==null){let Z=Math.pow(10,4),K=Math.cos(d6*$),U=J.getIndex(),H=J.getAttribute("position"),Y=U?U.count:H.count,W=[0,0,0],G=["a","b","c"],N=[,,,],q={},X=[];for(let F=0;F<Y;F+=3){if(U)W[0]=U.getX(F),W[1]=U.getX(F+1),W[2]=U.getX(F+2);else W[0]=F,W[1]=F+1,W[2]=F+2;let{a:R,b:M,c:D}=UZ;if(R.fromBufferAttribute(H,W[0]),M.fromBufferAttribute(H,W[1]),D.fromBufferAttribute(H,W[2]),UZ.getNormal(jK),N[0]=`${Math.round(R.x*Z)},${Math.round(R.y*Z)},${Math.round(R.z*Z)}`,N[1]=`${Math.round(M.x*Z)},${Math.round(M.y*Z)},${Math.round(M.z*Z)}`,N[2]=`${Math.round(D.x*Z)},${Math.round(D.y*Z)},${Math.round(D.z*Z)}`,N[0]===N[1]||N[1]===N[2]||N[2]===N[0])continue;for(let E=0;E<3;E++){let I=(E+1)%3,C=N[E],O=N[I],B=UZ[G[E]],_=UZ[G[I]],A=`${C}_${O}`,V=`${O}_${C}`;if(V in q&&q[V]){if(jK.dot(q[V].normal)<=K)X.push(B.x,B.y,B.z),X.push(_.x,_.y,_.z);q[V]=null}else if(!(A in q))q[A]={index0:W[E],index1:W[I],normal:jK.clone()}}}for(let F in q)if(q[F]){let{index0:R,index1:M}=q[F];ZZ.fromBufferAttribute(H,R),KZ.fromBufferAttribute(H,M),X.push(ZZ.x,ZZ.y,ZZ.z),X.push(KZ.x,KZ.y,KZ.z)}this.setAttribute("position",new Y9(X,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}class Z8{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){H9("Curve: .getPoint() not implemented.")}getPointAt(J,$){let Q=this.getUtoTmapping(J);return this.getPoint(Q,$)}getPoints(J=5){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPoint(Q/J));return $}getSpacedPoints(J=5){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPointAt(Q/J));return $}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let $=[],Q,Z=this.getPoint(0),K=0;$.push(0);for(let U=1;U<=J;U++)Q=this.getPoint(U/J),K+=Q.distanceTo(Z),$.push(K),Z=Q;return this.cacheArcLengths=$,$}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,$=null){let Q=this.getLengths(),Z=0,K=Q.length,U;if($)U=$;else U=J*Q[K-1];let H=0,Y=K-1,W;while(H<=Y)if(Z=Math.floor(H+(Y-H)/2),W=Q[Z]-U,W<0)H=Z+1;else if(W>0)Y=Z-1;else{Y=Z;break}if(Z=Y,Q[Z]===U)return Z/(K-1);let G=Q[Z],q=Q[Z+1]-G,X=(U-G)/q;return(Z+X)/(K-1)}getTangent(J,$){let Z=J-0.0001,K=J+0.0001;if(Z<0)Z=0;if(K>1)K=1;let U=this.getPoint(Z),H=this.getPoint(K),Y=$||(U.isVector2?new q0:new v);return Y.copy(H).sub(U).normalize(),Y}getTangentAt(J,$){let Q=this.getUtoTmapping(J);return this.getTangent(Q,$)}computeFrenetFrames(J,$=!1){let Q=new v,Z=[],K=[],U=[],H=new v,Y=new h9;for(let X=0;X<=J;X++){let F=X/J;Z[X]=this.getTangentAt(F,new v)}K[0]=new v,U[0]=new v;let W=Number.MAX_VALUE,G=Math.abs(Z[0].x),N=Math.abs(Z[0].y),q=Math.abs(Z[0].z);if(G<=W)W=G,Q.set(1,0,0);if(N<=W)W=N,Q.set(0,1,0);if(q<=W)Q.set(0,0,1);H.crossVectors(Z[0],Q).normalize(),K[0].crossVectors(Z[0],H),U[0].crossVectors(Z[0],K[0]);for(let X=1;X<=J;X++){if(K[X]=K[X-1].clone(),U[X]=U[X-1].clone(),H.crossVectors(Z[X-1],Z[X]),H.length()>Number.EPSILON){H.normalize();let F=Math.acos(I9(Z[X-1].dot(Z[X]),-1,1));K[X].applyMatrix4(Y.makeRotationAxis(H,F))}U[X].crossVectors(Z[X],K[X])}if($===!0){let X=Math.acos(I9(K[0].dot(K[J]),-1,1));if(X/=J,Z[0].dot(H.crossVectors(K[0],K[J]))>0)X=-X;for(let F=1;F<=J;F++)K[F].applyMatrix4(Y.makeRotationAxis(Z[F],X*F)),U[F].crossVectors(Z[F],K[F])}return{tangents:Z,normals:K,binormals:U}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class JQ extends Z8{constructor(J=0,$=0,Q=1,Z=1,K=0,U=Math.PI*2,H=!1,Y=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=$,this.xRadius=Q,this.yRadius=Z,this.aStartAngle=K,this.aEndAngle=U,this.aClockwise=H,this.aRotation=Y}getPoint(J,$=new q0){let Q=$,Z=Math.PI*2,K=this.aEndAngle-this.aStartAngle,U=Math.abs(K)<Number.EPSILON;while(K<0)K+=Z;while(K>Z)K-=Z;if(K<Number.EPSILON)if(U)K=0;else K=Z;if(this.aClockwise===!0&&!U)if(K===Z)K=-Z;else K=K-Z;let H=this.aStartAngle+J*K,Y=this.aX+this.xRadius*Math.cos(H),W=this.aY+this.yRadius*Math.sin(H);if(this.aRotation!==0){let G=Math.cos(this.aRotation),N=Math.sin(this.aRotation),q=Y-this.aX,X=W-this.aY;Y=q*G-X*N+this.aX,W=q*N+X*G+this.aY}return Q.set(Y,W)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class uU extends JQ{constructor(J,$,Q,Z,K,U){super(J,$,Q,Q,Z,K,U);this.isArcCurve=!0,this.type="ArcCurve"}}function mU(){let J=0,$=0,Q=0,Z=0;function K(U,H,Y,W){J=U,$=Y,Q=-3*U+3*H-2*Y-W,Z=2*U-2*H+Y+W}return{initCatmullRom:function(U,H,Y,W,G){K(H,Y,G*(Y-U),G*(W-H))},initNonuniformCatmullRom:function(U,H,Y,W,G,N,q){let X=(H-U)/G-(Y-U)/(G+N)+(Y-H)/N,F=(Y-H)/N-(W-H)/(N+q)+(W-Y)/q;X*=N,F*=N,K(H,Y,X,F)},calc:function(U){let H=U*U,Y=H*U;return J+$*U+Q*H+Z*Y}}}var fY=new v,yY=new v,vK=new mU,fK=new mU,yK=new mU;class J$ extends Z8{constructor(J=[],$=!1,Q="centripetal",Z=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=$,this.curveType=Q,this.tension=Z}getPoint(J,$=new v){let Q=$,Z=this.points,K=Z.length,U=(K-(this.closed?0:1))*J,H=Math.floor(U),Y=U-H;if(this.closed)H+=H>0?0:(Math.floor(Math.abs(H)/K)+1)*K;else if(Y===0&&H===K-1)H=K-2,Y=1;let W,G;if(this.closed||H>0)W=Z[(H-1)%K];else yY.subVectors(Z[0],Z[1]).add(Z[0]),W=yY;let N=Z[H%K],q=Z[(H+1)%K];if(this.closed||H+2<K)G=Z[(H+2)%K];else fY.subVectors(Z[K-1],Z[K-2]).add(Z[K-1]),G=fY;if(this.curveType==="centripetal"||this.curveType==="chordal"){let X=this.curveType==="chordal"?0.5:0.25,F=Math.pow(W.distanceToSquared(N),X),R=Math.pow(N.distanceToSquared(q),X),M=Math.pow(q.distanceToSquared(G),X);if(R<0.0001)R=1;if(F<0.0001)F=R;if(M<0.0001)M=R;vK.initNonuniformCatmullRom(W.x,N.x,q.x,G.x,F,R,M),fK.initNonuniformCatmullRom(W.y,N.y,q.y,G.y,F,R,M),yK.initNonuniformCatmullRom(W.z,N.z,q.z,G.z,F,R,M)}else if(this.curveType==="catmullrom")vK.initCatmullRom(W.x,N.x,q.x,G.x,this.tension),fK.initCatmullRom(W.y,N.y,q.y,G.y,this.tension),yK.initCatmullRom(W.z,N.z,q.z,G.z,this.tension);return Q.set(vK.calc(Y),fK.calc(Y),yK.calc(Y)),Q}copy(J){super.copy(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(Z.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Q=this.points.length;$<Q;$++){let Z=this.points[$];J.points.push(Z.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(new v().fromArray(Z))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function bY(J,$,Q,Z,K){let U=(Z-$)*0.5,H=(K-Q)*0.5,Y=J*J,W=J*Y;return(2*Q-2*Z+U+H)*W+(-3*Q+3*Z-2*U-H)*Y+U*J+Q}function wN(J,$){let Q=1-J;return Q*Q*$}function SN(J,$){return 2*(1-J)*J*$}function kN(J,$){return J*J*$}function w$(J,$,Q,Z){return wN(J,$)+SN(J,Q)+kN(J,Z)}function jN(J,$){let Q=1-J;return Q*Q*Q*$}function vN(J,$){let Q=1-J;return 3*Q*Q*J*$}function fN(J,$){return 3*(1-J)*J*J*$}function yN(J,$){return J*J*J*$}function S$(J,$,Q,Z,K){return jN(J,$)+vN(J,Q)+fN(J,Z)+yN(J,K)}class vZ extends Z8{constructor(J=new q0,$=new q0,Q=new q0,Z=new q0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=$,this.v2=Q,this.v3=Z}getPoint(J,$=new q0){let Q=$,Z=this.v0,K=this.v1,U=this.v2,H=this.v3;return Q.set(S$(J,Z.x,K.x,U.x,H.x),S$(J,Z.y,K.y,U.y,H.y)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class dU extends Z8{constructor(J=new v,$=new v,Q=new v,Z=new v){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=$,this.v2=Q,this.v3=Z}getPoint(J,$=new v){let Q=$,Z=this.v0,K=this.v1,U=this.v2,H=this.v3;return Q.set(S$(J,Z.x,K.x,U.x,H.x),S$(J,Z.y,K.y,U.y,H.y),S$(J,Z.z,K.z,U.z,H.z)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class fZ extends Z8{constructor(J=new q0,$=new q0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=$}getPoint(J,$=new q0){let Q=$;if(J===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar(J).add(this.v1);return Q}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new q0){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class $$ extends Z8{constructor(J=new v,$=new v){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=$}getPoint(J,$=new v){let Q=$;if(J===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar(J).add(this.v1);return Q}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new v){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class yZ extends Z8{constructor(J=new q0,$=new q0,Q=new q0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=$,this.v2=Q}getPoint(J,$=new q0){let Q=$,Z=this.v0,K=this.v1,U=this.v2;return Q.set(w$(J,Z.x,K.x,U.x),w$(J,Z.y,K.y,U.y)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class bZ extends Z8{constructor(J=new v,$=new v,Q=new v){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=$,this.v2=Q}getPoint(J,$=new v){let Q=$,Z=this.v0,K=this.v1,U=this.v2;return Q.set(w$(J,Z.x,K.x,U.x),w$(J,Z.y,K.y,U.y),w$(J,Z.z,K.z,U.z)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class xZ extends Z8{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,$=new q0){let Q=$,Z=this.points,K=(Z.length-1)*J,U=Math.floor(K),H=K-U,Y=Z[U===0?U:U-1],W=Z[U],G=Z[U>Z.length-2?Z.length-1:U+1],N=Z[U>Z.length-3?Z.length-1:U+2];return Q.set(bY(H,Y.x,W.x,G.x,N.x),bY(H,Y.y,W.y,G.y,N.y)),Q}copy(J){super.copy(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Q=this.points.length;$<Q;$++){let Z=this.points[$];J.points.push(Z.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(new q0().fromArray(Z))}return this}}var FZ=Object.freeze({__proto__:null,ArcCurve:uU,CatmullRomCurve3:J$,CubicBezierCurve:vZ,CubicBezierCurve3:dU,EllipseCurve:JQ,LineCurve:fZ,LineCurve3:$$,QuadraticBezierCurve:yZ,QuadraticBezierCurve3:bZ,SplineCurve:xZ});class lU extends Z8{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),$=this.curves[this.curves.length-1].getPoint(1);if(!J.equals($)){let Q=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new FZ[Q]($,J))}return this}getPoint(J,$){let Q=J*this.getLength(),Z=this.getCurveLengths(),K=0;while(K<Z.length){if(Z[K]>=Q){let U=Z[K]-Q,H=this.curves[K],Y=H.getLength(),W=Y===0?0:1-U/Y;return H.getPointAt(W,$)}K++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],$=0;for(let Q=0,Z=this.curves.length;Q<Z;Q++)$+=this.curves[Q].getLength(),J.push($);return this.cacheLengths=J,J}getSpacedPoints(J=40){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPoint(Q/J));if(this.autoClose)$.push($[0]);return $}getPoints(J=12){let $=[],Q;for(let Z=0,K=this.curves;Z<K.length;Z++){let U=K[Z],H=U.isEllipseCurve?J*2:U.isLineCurve||U.isLineCurve3?1:U.isSplineCurve?J*U.points.length:J,Y=U.getPoints(H);for(let W=0;W<Y.length;W++){let G=Y[W];if(Q&&Q.equals(G))continue;$.push(G),Q=G}}if(this.autoClose&&$.length>1&&!$[$.length-1].equals($[0]))$.push($[0]);return $}copy(J){super.copy(J),this.curves=[];for(let $=0,Q=J.curves.length;$<Q;$++){let Z=J.curves[$];this.curves.push(Z.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let $=0,Q=this.curves.length;$<Q;$++){let Z=this.curves[$];J.curves.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let $=0,Q=J.curves.length;$<Q;$++){let Z=J.curves[$];this.curves.push(new FZ[Z.type]().fromJSON(Z))}return this}}class DZ extends lU{constructor(J){super();if(this.type="Path",this.currentPoint=new q0,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let $=1,Q=J.length;$<Q;$++)this.lineTo(J[$].x,J[$].y);return this}moveTo(J,$){return this.currentPoint.set(J,$),this}lineTo(J,$){let Q=new fZ(this.currentPoint.clone(),new q0(J,$));return this.curves.push(Q),this.currentPoint.set(J,$),this}quadraticCurveTo(J,$,Q,Z){let K=new yZ(this.currentPoint.clone(),new q0(J,$),new q0(Q,Z));return this.curves.push(K),this.currentPoint.set(Q,Z),this}bezierCurveTo(J,$,Q,Z,K,U){let H=new vZ(this.currentPoint.clone(),new q0(J,$),new q0(Q,Z),new q0(K,U));return this.curves.push(H),this.currentPoint.set(K,U),this}splineThru(J){let $=[this.currentPoint.clone()].concat(J),Q=new xZ($);return this.curves.push(Q),this.currentPoint.copy(J[J.length-1]),this}arc(J,$,Q,Z,K,U){let H=this.currentPoint.x,Y=this.currentPoint.y;return this.absarc(J+H,$+Y,Q,Z,K,U),this}absarc(J,$,Q,Z,K,U){return this.absellipse(J,$,Q,Q,Z,K,U),this}ellipse(J,$,Q,Z,K,U,H,Y){let W=this.currentPoint.x,G=this.currentPoint.y;return this.absellipse(J+W,$+G,Q,Z,K,U,H,Y),this}absellipse(J,$,Q,Z,K,U,H,Y){let W=new JQ(J,$,Q,Z,K,U,H,Y);if(this.curves.length>0){let N=W.getPoint(0);if(!N.equals(this.currentPoint))this.lineTo(N.x,N.y)}this.curves.push(W);let G=W.getPoint(1);return this.currentPoint.copy(G),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class K8 extends DZ{constructor(J){super(J);this.uuid=o8(),this.type="Shape",this.holes=[]}getPointsHoles(J){let $=[];for(let Q=0,Z=this.holes.length;Q<Z;Q++)$[Q]=this.holes[Q].getPoints(J);return $}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let $=0,Q=J.holes.length;$<Q;$++){let Z=J.holes[$];this.holes.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let $=0,Q=this.holes.length;$<Q;$++){let Z=this.holes[$];J.holes.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let $=0,Q=J.holes.length;$<Q;$++){let Z=J.holes[$];this.holes.push(new DZ().fromJSON(Z))}return this}}function bN(J,$,Q=2){let Z=$&&$.length,K=Z?$[0]*Q:J.length,U=s5(J,0,K,Q,!0),H=[];if(!U||U.next===U.prev)return H;let Y,W,G;if(Z)U=uN(J,$,U,Q);if(J.length>80*Q){Y=J[0],W=J[1];let N=Y,q=W;for(let X=Q;X<K;X+=Q){let F=J[X],R=J[X+1];if(F<Y)Y=F;if(R<W)W=R;if(F>N)N=F;if(R>q)q=R}G=Math.max(N-Y,q-W),G=G!==0?32767/G:0}return f$(U,H,Q,Y,W,G,0),H}function s5(J,$,Q,Z,K){let U;if(K===tN(J,$,Q,Z)>0)for(let H=$;H<Q;H+=Z)U=xY(H/Z|0,J[H],J[H+1],U);else for(let H=Q-Z;H>=$;H-=Z)U=xY(H/Z|0,J[H],J[H+1],U);if(U&&n6(U,U.next))b$(U),U=U.next;return U}function Q6(J,$){if(!J)return J;if(!$)$=J;let Q=J,Z;do if(Z=!1,!Q.steiner&&(n6(Q,Q.next)||q7(Q.prev,Q,Q.next)===0)){if(b$(Q),Q=$=Q.prev,Q===Q.next)break;Z=!0}else Q=Q.next;while(Z||Q!==$);return $}function f$(J,$,Q,Z,K,U,H){if(!J)return;if(!H&&U)nN(J,Z,K,U);let Y=J;while(J.prev!==J.next){let{prev:W,next:G}=J;if(U?hN(J,Z,K,U):xN(J)){$.push(W.i,J.i,G.i),b$(J),J=G.next,Y=G.next;continue}if(J=G,J===Y){if(!H)f$(Q6(J),$,Q,Z,K,U,1);else if(H===1)J=gN(Q6(J),$),f$(J,$,Q,Z,K,U,2);else if(H===2)pN(J,$,Q,Z,K,U);break}}}function xN(J){let $=J.prev,Q=J,Z=J.next;if(q7($,Q,Z)>=0)return!1;let K=$.x,U=Q.x,H=Z.x,Y=$.y,W=Q.y,G=Z.y,N=Math.min(K,U,H),q=Math.min(Y,W,G),X=Math.max(K,U,H),F=Math.max(Y,W,G),R=Z.next;while(R!==$){if(R.x>=N&&R.x<=X&&R.y>=q&&R.y<=F&&C$(K,Y,U,W,H,G,R.x,R.y)&&q7(R.prev,R,R.next)>=0)return!1;R=R.next}return!0}function hN(J,$,Q,Z){let K=J.prev,U=J,H=J.next;if(q7(K,U,H)>=0)return!1;let Y=K.x,W=U.x,G=H.x,N=K.y,q=U.y,X=H.y,F=Math.min(Y,W,G),R=Math.min(N,q,X),M=Math.max(Y,W,G),D=Math.max(N,q,X),E=gK(F,R,$,Q,Z),I=gK(M,D,$,Q,Z),C=J.prevZ,O=J.nextZ;while(C&&C.z>=E&&O&&O.z<=I){if(C.x>=F&&C.x<=M&&C.y>=R&&C.y<=D&&C!==K&&C!==H&&C$(Y,N,W,q,G,X,C.x,C.y)&&q7(C.prev,C,C.next)>=0)return!1;if(C=C.prevZ,O.x>=F&&O.x<=M&&O.y>=R&&O.y<=D&&O!==K&&O!==H&&C$(Y,N,W,q,G,X,O.x,O.y)&&q7(O.prev,O,O.next)>=0)return!1;O=O.nextZ}while(C&&C.z>=E){if(C.x>=F&&C.x<=M&&C.y>=R&&C.y<=D&&C!==K&&C!==H&&C$(Y,N,W,q,G,X,C.x,C.y)&&q7(C.prev,C,C.next)>=0)return!1;C=C.prevZ}while(O&&O.z<=I){if(O.x>=F&&O.x<=M&&O.y>=R&&O.y<=D&&O!==K&&O!==H&&C$(Y,N,W,q,G,X,O.x,O.y)&&q7(O.prev,O,O.next)>=0)return!1;O=O.nextZ}return!0}function gN(J,$){let Q=J;do{let Z=Q.prev,K=Q.next.next;if(!n6(Z,K)&&a5(Z,Q,Q.next,K)&&y$(Z,K)&&y$(K,Z))$.push(Z.i,Q.i,K.i),b$(Q),b$(Q.next),Q=J=K;Q=Q.next}while(Q!==J);return Q6(Q)}function pN(J,$,Q,Z,K,U){let H=J;do{let Y=H.next.next;while(Y!==H.prev){if(H.i!==Y.i&&oN(H,Y)){let W=r5(H,Y);H=Q6(H,H.next),W=Q6(W,W.next),f$(H,$,Q,Z,K,U,0),f$(W,$,Q,Z,K,U,0);return}Y=Y.next}H=H.next}while(H!==J)}function uN(J,$,Q,Z){let K=[];for(let U=0,H=$.length;U<H;U++){let Y=$[U]*Z,W=U<H-1?$[U+1]*Z:J.length,G=s5(J,Y,W,Z,!1);if(G===G.next)G.steiner=!0;K.push(sN(G))}K.sort(mN);for(let U=0;U<K.length;U++)Q=dN(K[U],Q);return Q}function mN(J,$){let Q=J.x-$.x;if(Q===0){if(Q=J.y-$.y,Q===0){let Z=(J.next.y-J.y)/(J.next.x-J.x),K=($.next.y-$.y)/($.next.x-$.x);Q=Z-K}}return Q}function dN(J,$){let Q=lN(J,$);if(!Q)return $;let Z=r5(Q,J);return Q6(Z,Z.next),Q6(Q,Q.next)}function lN(J,$){let Q=$,Z=J.x,K=J.y,U=-1/0,H;if(n6(J,Q))return Q;do{if(n6(J,Q.next))return Q.next;else if(K<=Q.y&&K>=Q.next.y&&Q.next.y!==Q.y){let q=Q.x+(K-Q.y)*(Q.next.x-Q.x)/(Q.next.y-Q.y);if(q<=Z&&q>U){if(U=q,H=Q.x<Q.next.x?Q:Q.next,q===Z)return H}}Q=Q.next}while(Q!==$);if(!H)return null;let Y=H,W=H.x,G=H.y,N=1/0;Q=H;do{if(Z>=Q.x&&Q.x>=W&&Z!==Q.x&&o5(K<G?Z:U,K,W,G,K<G?U:Z,K,Q.x,Q.y)){let q=Math.abs(K-Q.y)/(Z-Q.x);if(y$(Q,J)&&(q<N||q===N&&(Q.x>H.x||Q.x===H.x&&cN(H,Q))))H=Q,N=q}Q=Q.next}while(Q!==Y);return H}function cN(J,$){return q7(J.prev,J,$.prev)<0&&q7($.next,J,J.next)<0}function nN(J,$,Q,Z){let K=J;do{if(K.z===0)K.z=gK(K.x,K.y,$,Q,Z);K.prevZ=K.prev,K.nextZ=K.next,K=K.next}while(K!==J);K.prevZ.nextZ=null,K.prevZ=null,iN(K)}function iN(J){let $,Q=1;do{let Z=J,K;J=null;let U=null;$=0;while(Z){$++;let H=Z,Y=0;for(let G=0;G<Q;G++)if(Y++,H=H.nextZ,!H)break;let W=Q;while(Y>0||W>0&&H){if(Y!==0&&(W===0||!H||Z.z<=H.z))K=Z,Z=Z.nextZ,Y--;else K=H,H=H.nextZ,W--;if(U)U.nextZ=K;else J=K;K.prevZ=U,U=K}Z=H}U.nextZ=null,Q*=2}while($>1);return J}function gK(J,$,Q,Z,K){return J=(J-Q)*K|0,$=($-Z)*K|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,$=($|$<<8)&16711935,$=($|$<<4)&252645135,$=($|$<<2)&858993459,$=($|$<<1)&1431655765,J|$<<1}function sN(J){let $=J,Q=J;do{if($.x<Q.x||$.x===Q.x&&$.y<Q.y)Q=$;$=$.next}while($!==J);return Q}function o5(J,$,Q,Z,K,U,H,Y){return(K-H)*($-Y)>=(J-H)*(U-Y)&&(J-H)*(Z-Y)>=(Q-H)*($-Y)&&(Q-H)*(U-Y)>=(K-H)*(Z-Y)}function C$(J,$,Q,Z,K,U,H,Y){return!(J===H&&$===Y)&&o5(J,$,Q,Z,K,U,H,Y)}function oN(J,$){return J.next.i!==$.i&&J.prev.i!==$.i&&!aN(J,$)&&(y$(J,$)&&y$($,J)&&rN(J,$)&&(q7(J.prev,J,$.prev)||q7(J,$.prev,$))||n6(J,$)&&q7(J.prev,J,J.next)>0&&q7($.prev,$,$.next)>0)}function q7(J,$,Q){return($.y-J.y)*(Q.x-$.x)-($.x-J.x)*(Q.y-$.y)}function n6(J,$){return J.x===$.x&&J.y===$.y}function a5(J,$,Q,Z){let K=YZ(q7(J,$,Q)),U=YZ(q7(J,$,Z)),H=YZ(q7(Q,Z,J)),Y=YZ(q7(Q,Z,$));if(K!==U&&H!==Y)return!0;if(K===0&&HZ(J,Q,$))return!0;if(U===0&&HZ(J,Z,$))return!0;if(H===0&&HZ(Q,J,Z))return!0;if(Y===0&&HZ(Q,$,Z))return!0;return!1}function HZ(J,$,Q){return $.x<=Math.max(J.x,Q.x)&&$.x>=Math.min(J.x,Q.x)&&$.y<=Math.max(J.y,Q.y)&&$.y>=Math.min(J.y,Q.y)}function YZ(J){return J>0?1:J<0?-1:0}function aN(J,$){let Q=J;do{if(Q.i!==J.i&&Q.next.i!==J.i&&Q.i!==$.i&&Q.next.i!==$.i&&a5(Q,Q.next,J,$))return!0;Q=Q.next}while(Q!==J);return!1}function y$(J,$){return q7(J.prev,J,J.next)<0?q7(J,$,J.next)>=0&&q7(J,J.prev,$)>=0:q7(J,$,J.prev)<0||q7(J,J.next,$)<0}function rN(J,$){let Q=J,Z=!1,K=(J.x+$.x)/2,U=(J.y+$.y)/2;do{if(Q.y>U!==Q.next.y>U&&Q.next.y!==Q.y&&K<(Q.next.x-Q.x)*(U-Q.y)/(Q.next.y-Q.y)+Q.x)Z=!Z;Q=Q.next}while(Q!==J);return Z}function r5(J,$){let Q=pK(J.i,J.x,J.y),Z=pK($.i,$.x,$.y),K=J.next,U=$.prev;return J.next=$,$.prev=J,Q.next=K,K.prev=Q,Z.next=Q,Q.prev=Z,U.next=Z,Z.prev=U,Z}function xY(J,$,Q,Z){let K=pK(J,$,Q);if(!Z)K.prev=K,K.next=K;else K.next=Z.next,K.prev=Z,Z.next.prev=K,Z.next=K;return K}function b$(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function pK(J,$,Q){return{i:J,x:$,y:Q,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function tN(J,$,Q,Z){let K=0;for(let U=$,H=Q-Z;U<Q;U+=Z)K+=(J[H]-J[U])*(J[U+1]+J[H+1]),H=U;return K}class t5{static triangulate(J,$,Q=2){return bN(J,$,Q)}}class s8{static area(J){let $=J.length,Q=0;for(let Z=$-1,K=0;K<$;Z=K++)Q+=J[Z].x*J[K].y-J[K].x*J[Z].y;return Q*0.5}static isClockWise(J){return s8.area(J)<0}static triangulateShape(J,$){let Q=[],Z=[],K=[];hY(J),gY(Q,J);let U=J.length;$.forEach(hY);for(let Y=0;Y<$.length;Y++)Z.push(U),U+=$[Y].length,gY(Q,$[Y]);let H=t5.triangulate(Q,Z);for(let Y=0;Y<H.length;Y+=3)K.push(H.slice(Y,Y+3));return K}}function hY(J){let $=J.length;if($>2&&J[$-1].equals(J[0]))J.pop()}function gY(J,$){for(let Q=0;Q<$.length;Q++)J.push($[Q].x),J.push($[Q].y)}class B8 extends V9{constructor(J=new K8([new q0(0.5,0.5),new q0(-0.5,0.5),new q0(-0.5,-0.5),new q0(0.5,-0.5)]),$={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:$},J=Array.isArray(J)?J:[J];let Q=this,Z=[],K=[];for(let H=0,Y=J.length;H<Y;H++){let W=J[H];U(W)}this.setAttribute("position",new Y9(Z,3)),this.setAttribute("uv",new Y9(K,2)),this.computeVertexNormals();function U(H){let Y=[],W=$.curveSegments!==void 0?$.curveSegments:12,G=$.steps!==void 0?$.steps:1,N=$.depth!==void 0?$.depth:1,q=$.bevelEnabled!==void 0?$.bevelEnabled:!0,X=$.bevelThickness!==void 0?$.bevelThickness:0.2,F=$.bevelSize!==void 0?$.bevelSize:X-0.1,R=$.bevelOffset!==void 0?$.bevelOffset:0,M=$.bevelSegments!==void 0?$.bevelSegments:3,D=$.extrudePath,E=$.UVGenerator!==void 0?$.UVGenerator:eN,I,C=!1,O,B,_,A;if(D){I=D.getSpacedPoints(G),C=!0,q=!1;let Z0=D.isCatmullRomCurve3?D.closed:!1;O=D.computeFrenetFrames(G,Z0),B=new v,_=new v,A=new v}if(!q)M=0,X=0,F=0,R=0;let V=H.extractPoints(W),z=V.shape,y=V.holes;if(!s8.isClockWise(z)){z=z.reverse();for(let Z0=0,O0=y.length;Z0<O0;Z0++){let _0=y[Z0];if(s8.isClockWise(_0))y[Z0]=_0.reverse()}}function f(Z0){let z0=Z0[0];for(let S0=1;S0<=Z0.length;S0++){let J9=S0%Z0.length,K9=Z0[J9],E9=K9.x-z0.x,O9=K9.y-z0.y,b=E9*E9+O9*O9,t9=Math.max(Math.abs(K9.x),Math.abs(K9.y),Math.abs(z0.x),Math.abs(z0.y)),z9=0.000000000000000000010000000000000001*t9*t9;if(b<=z9){Z0.splice(J9,1),S0--;continue}z0=K9}}f(z),y.forEach(f);let s=y.length,j=z;for(let Z0=0;Z0<s;Z0++){let O0=y[Z0];z=z.concat(O0)}function p(Z0,O0,_0){if(!O0)N9("ExtrudeGeometry: vec does not exist");return Z0.clone().addScaledVector(O0,_0)}let e=z.length;function n(Z0,O0,_0){let z0,S0,J9,K9=Z0.x-O0.x,E9=Z0.y-O0.y,O9=_0.x-Z0.x,b=_0.y-Z0.y,t9=K9*K9+E9*E9,z9=K9*b-E9*O9;if(Math.abs(z9)>Number.EPSILON){let C9=Math.sqrt(t9),S=Math.sqrt(O9*O9+b*b),P=O0.x-E9/C9,g=O0.y+K9/C9,$0=_0.x-b/S,M0=_0.y+O9/S,A0=(($0-P)*b-(M0-g)*O9)/(K9*b-E9*O9);z0=P+K9*A0-Z0.x,S0=g+E9*A0-Z0.y;let k0=z0*z0+S0*S0;if(k0<=2)return new q0(z0,S0);else J9=Math.sqrt(k0/2)}else{let C9=!1;if(K9>Number.EPSILON){if(O9>Number.EPSILON)C9=!0}else if(K9<-Number.EPSILON){if(O9<-Number.EPSILON)C9=!0}else if(Math.sign(E9)===Math.sign(b))C9=!0;if(C9)z0=-E9,S0=K9,J9=Math.sqrt(t9);else z0=K9,S0=E9,J9=Math.sqrt(t9/2)}return new q0(z0/J9,S0/J9)}let r=[];for(let Z0=0,O0=j.length,_0=O0-1,z0=Z0+1;Z0<O0;Z0++,_0++,z0++){if(_0===O0)_0=0;if(z0===O0)z0=0;r[Z0]=n(j[Z0],j[_0],j[z0])}let u=[],x,K0=r.concat();for(let Z0=0,O0=s;Z0<O0;Z0++){let _0=y[Z0];x=[];for(let z0=0,S0=_0.length,J9=S0-1,K9=z0+1;z0<S0;z0++,J9++,K9++){if(J9===S0)J9=0;if(K9===S0)K9=0;x[z0]=n(_0[z0],_0[J9],_0[K9])}u.push(x),K0=K0.concat(x)}let R0;if(M===0)R0=s8.triangulateShape(j,y);else{let Z0=[],O0=[];for(let _0=0;_0<M;_0++){let z0=_0/M,S0=X*Math.cos(z0*Math.PI/2),J9=F*Math.sin(z0*Math.PI/2)+R;for(let K9=0,E9=j.length;K9<E9;K9++){let O9=p(j[K9],r[K9],J9);if(G0(O9.x,O9.y,-S0),z0===0)Z0.push(O9)}for(let K9=0,E9=s;K9<E9;K9++){let O9=y[K9];x=u[K9];let b=[];for(let t9=0,z9=O9.length;t9<z9;t9++){let C9=p(O9[t9],x[t9],J9);if(G0(C9.x,C9.y,-S0),z0===0)b.push(C9)}if(z0===0)O0.push(b)}}R0=s8.triangulateShape(Z0,O0)}let T0=R0.length,l=F+R;for(let Z0=0;Z0<e;Z0++){let O0=q?p(z[Z0],K0[Z0],l):z[Z0];if(!C)G0(O0.x,O0.y,0);else _.copy(O.normals[0]).multiplyScalar(O0.x),B.copy(O.binormals[0]).multiplyScalar(O0.y),A.copy(I[0]).add(_).add(B),G0(A.x,A.y,A.z)}for(let Z0=1;Z0<=G;Z0++)for(let O0=0;O0<e;O0++){let _0=q?p(z[O0],K0[O0],l):z[O0];if(!C)G0(_0.x,_0.y,N/G*Z0);else _.copy(O.normals[Z0]).multiplyScalar(_0.x),B.copy(O.binormals[Z0]).multiplyScalar(_0.y),A.copy(I[Z0]).add(_).add(B),G0(A.x,A.y,A.z)}for(let Z0=M-1;Z0>=0;Z0--){let O0=Z0/M,_0=X*Math.cos(O0*Math.PI/2),z0=F*Math.sin(O0*Math.PI/2)+R;for(let S0=0,J9=j.length;S0<J9;S0++){let K9=p(j[S0],r[S0],z0);G0(K9.x,K9.y,N+_0)}for(let S0=0,J9=y.length;S0<J9;S0++){let K9=y[S0];x=u[S0];for(let E9=0,O9=K9.length;E9<O9;E9++){let b=p(K9[E9],x[E9],z0);if(!C)G0(b.x,b.y,N+_0);else G0(b.x,b.y+I[G-1].y,I[G-1].x+_0)}}}F0(),i();function F0(){let Z0=Z.length/3;if(q){let O0=0,_0=e*O0;for(let z0=0;z0<T0;z0++){let S0=R0[z0];c(S0[2]+_0,S0[1]+_0,S0[0]+_0)}O0=G+M*2,_0=e*O0;for(let z0=0;z0<T0;z0++){let S0=R0[z0];c(S0[0]+_0,S0[1]+_0,S0[2]+_0)}}else{for(let O0=0;O0<T0;O0++){let _0=R0[O0];c(_0[2],_0[1],_0[0])}for(let O0=0;O0<T0;O0++){let _0=R0[O0];c(_0[0]+e*G,_0[1]+e*G,_0[2]+e*G)}}Q.addGroup(Z0,Z.length/3-Z0,0)}function i(){let Z0=Z.length/3,O0=0;N0(j,O0),O0+=j.length;for(let _0=0,z0=y.length;_0<z0;_0++){let S0=y[_0];N0(S0,O0),O0+=S0.length}Q.addGroup(Z0,Z.length/3-Z0,1)}function N0(Z0,O0){let _0=Z0.length;while(--_0>=0){let z0=_0,S0=_0-1;if(S0<0)S0=Z0.length-1;for(let J9=0,K9=G+M*2;J9<K9;J9++){let E9=e*J9,O9=e*(J9+1),b=O0+z0+E9,t9=O0+S0+E9,z9=O0+S0+O9,C9=O0+z0+O9;P0(b,t9,z9,C9)}}}function G0(Z0,O0,_0){Y.push(Z0),Y.push(O0),Y.push(_0)}function c(Z0,O0,_0){J0(Z0),J0(O0),J0(_0);let z0=Z.length/3,S0=E.generateTopUV(Q,Z,z0-3,z0-2,z0-1);m0(S0[0]),m0(S0[1]),m0(S0[2])}function P0(Z0,O0,_0,z0){J0(Z0),J0(O0),J0(z0),J0(O0),J0(_0),J0(z0);let S0=Z.length/3,J9=E.generateSideWallUV(Q,Z,S0-6,S0-3,S0-2,S0-1);m0(J9[0]),m0(J9[1]),m0(J9[3]),m0(J9[1]),m0(J9[2]),m0(J9[3])}function J0(Z0){Z.push(Y[Z0*3+0]),Z.push(Y[Z0*3+1]),Z.push(Y[Z0*3+2])}function m0(Z0){K.push(Z0.x),K.push(Z0.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),$=this.parameters.shapes,Q=this.parameters.options;return JX($,Q,J)}static fromJSON(J,$){let Q=[];for(let K=0,U=J.shapes.length;K<U;K++){let H=$[J.shapes[K]];Q.push(H)}let Z=J.options.extrudePath;if(Z!==void 0)J.options.extrudePath=new FZ[Z.type]().fromJSON(Z);return new B8(Q,J.options)}}var eN={generateTopUV:function(J,$,Q,Z,K){let U=$[Q*3],H=$[Q*3+1],Y=$[Z*3],W=$[Z*3+1],G=$[K*3],N=$[K*3+1];return[new q0(U,H),new q0(Y,W),new q0(G,N)]},generateSideWallUV:function(J,$,Q,Z,K,U){let H=$[Q*3],Y=$[Q*3+1],W=$[Q*3+2],G=$[Z*3],N=$[Z*3+1],q=$[Z*3+2],X=$[K*3],F=$[K*3+1],R=$[K*3+2],M=$[U*3],D=$[U*3+1],E=$[U*3+2];if(Math.abs(Y-N)<Math.abs(H-G))return[new q0(H,1-W),new q0(G,1-q),new q0(X,1-R),new q0(M,1-E)];else return[new q0(Y,1-W),new q0(N,1-q),new q0(F,1-R),new q0(D,1-E)]}};function JX(J,$,Q){if(Q.shapes=[],Array.isArray(J))for(let Z=0,K=J.length;Z<K;Z++){let U=J[Z];Q.shapes.push(U.uuid)}else Q.shapes.push(J.uuid);if(Q.options=Object.assign({},$),$.extrudePath!==void 0)Q.options.extrudePath=$.extrudePath.toJSON();return Q}class $Q extends e${constructor(J=1,$=0){let Q=(1+Math.sqrt(5))/2,Z=[-1,Q,0,1,Q,0,-1,-Q,0,1,-Q,0,0,-1,Q,0,1,Q,0,-1,-Q,0,1,-Q,Q,0,-1,Q,0,1,-Q,0,-1,-Q,0,1],K=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(Z,K,J,$);this.type="IcosahedronGeometry",this.parameters={radius:J,detail:$}}static fromJSON(J){return new $Q(J.radius,J.detail)}}class QQ extends e${constructor(J=1,$=0){let Q=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],Z=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(Q,Z,J,$);this.type="OctahedronGeometry",this.parameters={radius:J,detail:$}}static fromJSON(J){return new QQ(J.radius,J.detail)}}class t0 extends V9{constructor(J=1,$=1,Q=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:$,widthSegments:Q,heightSegments:Z};let K=J/2,U=$/2,H=Math.floor(Q),Y=Math.floor(Z),W=H+1,G=Y+1,N=J/H,q=$/Y,X=[],F=[],R=[],M=[];for(let D=0;D<G;D++){let E=D*q-U;for(let I=0;I<W;I++){let C=I*N-K;F.push(C,-E,0),R.push(0,0,1),M.push(I/H),M.push(1-D/Y)}}for(let D=0;D<Y;D++)for(let E=0;E<H;E++){let I=E+W*D,C=E+W*(D+1),O=E+1+W*(D+1),B=E+1+W*D;X.push(I,C,B),X.push(C,O,B)}this.setIndex(X),this.setAttribute("position",new Y9(F,3)),this.setAttribute("normal",new Y9(R,3)),this.setAttribute("uv",new Y9(M,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new t0(J.width,J.height,J.widthSegments,J.heightSegments)}}class N6 extends V9{constructor(J=0.5,$=1,Q=32,Z=1,K=0,U=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:$,thetaSegments:Q,phiSegments:Z,thetaStart:K,thetaLength:U},Q=Math.max(3,Q),Z=Math.max(1,Z);let H=[],Y=[],W=[],G=[],N=J,q=($-J)/Z,X=new v,F=new q0;for(let R=0;R<=Z;R++){for(let M=0;M<=Q;M++){let D=K+M/Q*U;X.x=N*Math.cos(D),X.y=N*Math.sin(D),Y.push(X.x,X.y,X.z),W.push(0,0,1),F.x=(X.x/$+1)/2,F.y=(X.y/$+1)/2,G.push(F.x,F.y)}N+=q}for(let R=0;R<Z;R++){let M=R*(Q+1);for(let D=0;D<Q;D++){let E=D+M,I=E,C=E+Q+1,O=E+Q+2,B=E+1;H.push(I,C,B),H.push(C,O,B)}}this.setIndex(H),this.setAttribute("position",new Y9(Y,3)),this.setAttribute("normal",new Y9(W,3)),this.setAttribute("uv",new Y9(G,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new N6(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class ZQ extends V9{constructor(J=new K8([new q0(0,0.5),new q0(-0.5,-0.5),new q0(0.5,-0.5)]),$=12){super();this.type="ShapeGeometry",this.parameters={shapes:J,curveSegments:$};let Q=[],Z=[],K=[],U=[],H=0,Y=0;if(Array.isArray(J)===!1)W(J);else for(let G=0;G<J.length;G++)W(J[G]),this.addGroup(H,Y,G),H+=Y,Y=0;this.setIndex(Q),this.setAttribute("position",new Y9(Z,3)),this.setAttribute("normal",new Y9(K,3)),this.setAttribute("uv",new Y9(U,2));function W(G){let N=Z.length/3,q=G.extractPoints($),X=q.shape,F=q.holes;if(s8.isClockWise(X)===!1)X=X.reverse();for(let M=0,D=F.length;M<D;M++){let E=F[M];if(s8.isClockWise(E)===!0)F[M]=E.reverse()}let R=s8.triangulateShape(X,F);for(let M=0,D=F.length;M<D;M++){let E=F[M];X=X.concat(E)}for(let M=0,D=X.length;M<D;M++){let E=X[M];Z.push(E.x,E.y,0),K.push(0,0,1),U.push(E.x,E.y)}for(let M=0,D=R.length;M<D;M++){let E=R[M],I=E[0]+N,C=E[1]+N,O=E[2]+N;Q.push(I,C,O),Y+=3}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),$=this.parameters.shapes;return $X($,J)}static fromJSON(J,$){let Q=[];for(let Z=0,K=J.shapes.length;Z<K;Z++){let U=$[J.shapes[Z]];Q.push(U)}return new ZQ(Q,J.curveSegments)}}function $X(J,$){if($.shapes=[],Array.isArray(J))for(let Q=0,Z=J.length;Q<Z;Q++){let K=J[Q];$.shapes.push(K.uuid)}else $.shapes.push(J.uuid);return $}class p0 extends V9{constructor(J=1,$=32,Q=16,Z=0,K=Math.PI*2,U=0,H=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:$,heightSegments:Q,phiStart:Z,phiLength:K,thetaStart:U,thetaLength:H},$=Math.max(3,Math.floor($)),Q=Math.max(2,Math.floor(Q));let Y=Math.min(U+H,Math.PI),W=0,G=[],N=new v,q=new v,X=[],F=[],R=[],M=[];for(let D=0;D<=Q;D++){let E=[],I=D/Q,C=U+I*H,O=J*Math.cos(C),B=Math.sqrt(J*J-O*O),_=0;if(D===0&&U===0)_=0.5/$;else if(D===Q&&Y===Math.PI)_=-0.5/$;for(let A=0;A<=$;A++){let V=A/$,z=Z+V*K;N.x=-B*Math.cos(z),N.y=O,N.z=B*Math.sin(z),F.push(N.x,N.y,N.z),q.copy(N).normalize(),R.push(q.x,q.y,q.z),M.push(V+_,1-I),E.push(W++)}G.push(E)}for(let D=0;D<Q;D++)for(let E=0;E<$;E++){let I=G[D][E+1],C=G[D][E],O=G[D+1][E],B=G[D+1][E+1];if(D!==0||U>0)X.push(I,C,B);if(D!==Q-1||Y<Math.PI)X.push(C,O,B)}this.setIndex(X),this.setAttribute("position",new Y9(F,3)),this.setAttribute("normal",new Y9(R,3)),this.setAttribute("uv",new Y9(M,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new p0(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class Y7 extends V9{constructor(J=1,$=0.4,Q=12,Z=48,K=Math.PI*2,U=0,H=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:$,radialSegments:Q,tubularSegments:Z,arc:K,thetaStart:U,thetaLength:H},Q=Math.floor(Q),Z=Math.floor(Z);let Y=[],W=[],G=[],N=[],q=new v,X=new v,F=new v;for(let R=0;R<=Q;R++){let M=U+R/Q*H;for(let D=0;D<=Z;D++){let E=D/Z*K;X.x=(J+$*Math.cos(M))*Math.cos(E),X.y=(J+$*Math.cos(M))*Math.sin(E),X.z=$*Math.sin(M),W.push(X.x,X.y,X.z),q.x=J*Math.cos(E),q.y=J*Math.sin(E),F.subVectors(X,q).normalize(),G.push(F.x,F.y,F.z),N.push(D/Z),N.push(R/Q)}}for(let R=1;R<=Q;R++)for(let M=1;M<=Z;M++){let D=(Z+1)*R+M-1,E=(Z+1)*(R-1)+M-1,I=(Z+1)*(R-1)+M,C=(Z+1)*R+M;Y.push(D,E,C),Y.push(E,I,C)}this.setIndex(Y),this.setAttribute("position",new Y9(W,3)),this.setAttribute("normal",new Y9(G,3)),this.setAttribute("uv",new Y9(N,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new Y7(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc,J.thetaStart,J.thetaLength)}}class x8 extends V9{constructor(J=new bZ(new v(-1,-1,0),new v(-1,1,0),new v(1,1,0)),$=64,Q=1,Z=8,K=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:$,radius:Q,radialSegments:Z,closed:K};let U=J.computeFrenetFrames($,K);this.tangents=U.tangents,this.normals=U.normals,this.binormals=U.binormals;let H=new v,Y=new v,W=new q0,G=new v,N=[],q=[],X=[],F=[];R(),this.setIndex(F),this.setAttribute("position",new Y9(N,3)),this.setAttribute("normal",new Y9(q,3)),this.setAttribute("uv",new Y9(X,2));function R(){for(let I=0;I<$;I++)M(I);M(K===!1?$:0),E(),D()}function M(I){G=J.getPointAt(I/$,G);let C=U.normals[I],O=U.binormals[I];for(let B=0;B<=Z;B++){let _=B/Z*Math.PI*2,A=Math.sin(_),V=-Math.cos(_);Y.x=V*C.x+A*O.x,Y.y=V*C.y+A*O.y,Y.z=V*C.z+A*O.z,Y.normalize(),q.push(Y.x,Y.y,Y.z),H.x=G.x+Q*Y.x,H.y=G.y+Q*Y.y,H.z=G.z+Q*Y.z,N.push(H.x,H.y,H.z)}}function D(){for(let I=1;I<=$;I++)for(let C=1;C<=Z;C++){let O=(Z+1)*(I-1)+(C-1),B=(Z+1)*I+(C-1),_=(Z+1)*I+C,A=(Z+1)*(I-1)+C;F.push(O,B,A),F.push(B,_,A)}}function E(){for(let I=0;I<=$;I++)for(let C=0;C<=Z;C++)W.x=I/$,W.y=C/Z,X.push(W.x,W.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new x8(new FZ[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class KQ extends V9{constructor(J=null){super();if(this.type="WireframeGeometry",this.parameters={geometry:J},J!==null){let $=[],Q=new Set,Z=new v,K=new v;if(J.index!==null){let U=J.attributes.position,H=J.index,Y=J.groups;if(Y.length===0)Y=[{start:0,count:H.count,materialIndex:0}];for(let W=0,G=Y.length;W<G;++W){let N=Y[W],q=N.start,X=N.count;for(let F=q,R=q+X;F<R;F+=3)for(let M=0;M<3;M++){let D=H.getX(F+M),E=H.getX(F+(M+1)%3);if(Z.fromBufferAttribute(U,D),K.fromBufferAttribute(U,E),pY(Z,K,Q)===!0)$.push(Z.x,Z.y,Z.z),$.push(K.x,K.y,K.z)}}}else{let U=J.attributes.position;for(let H=0,Y=U.count/3;H<Y;H++)for(let W=0;W<3;W++){let G=3*H+W,N=3*H+(W+1)%3;if(Z.fromBufferAttribute(U,G),K.fromBufferAttribute(U,N),pY(Z,K,Q)===!0)$.push(Z.x,Z.y,Z.z),$.push(K.x,K.y,K.z)}}this.setAttribute("position",new Y9($,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}function pY(J,$,Q){let Z=`${J.x},${J.y},${J.z}-${$.x},${$.y},${$.z}`,K=`${$.x},${$.y},${$.z}-${J.x},${J.y},${J.z}`;if(Q.has(Z)===!0||Q.has(K)===!0)return!1;else return Q.add(Z),Q.add(K),!0}function X6(J){let $={};for(let Q in J){$[Q]={};for(let Z in J[Q]){let K=J[Q][Z];if(uY(K))if(K.isRenderTargetTexture)H9("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),$[Q][Z]=null;else $[Q][Z]=K.clone();else if(Array.isArray(K))if(uY(K[0])){let U=[];for(let H=0,Y=K.length;H<Y;H++)U[H]=K[H].clone();$[Q][Z]=U}else $[Q][Z]=K.slice();else $[Q][Z]=K}}return $}function d7(J){let $={};for(let Q=0;Q<J.length;Q++){let Z=X6(J[Q]);for(let K in Z)$[K]=Z[K]}return $}function uY(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function QX(J){let $=[];for(let Q=0;Q<J.length;Q++)$.push(J[Q].clone());return $}function cU(J){let $=J.getRenderTarget();if($===null)return J.outputColorSpace;if($.isXRRenderTarget===!0)return $.texture.colorSpace;return A9.workingColorSpace}var F8={clone:X6,merge:d7},ZX=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,KX=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class p9 extends y8{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ZX,this.fragmentShader=KX,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=X6(J.uniforms),this.uniformsGroups=QX(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let $=super.toJSON(J);$.glslVersion=this.glslVersion,$.uniforms={};for(let Z in this.uniforms){let U=this.uniforms[Z].value;if(U&&U.isTexture)$.uniforms[Z]={type:"t",value:U.toJSON(J).uuid};else if(U&&U.isColor)$.uniforms[Z]={type:"c",value:U.getHex()};else if(U&&U.isVector2)$.uniforms[Z]={type:"v2",value:U.toArray()};else if(U&&U.isVector3)$.uniforms[Z]={type:"v3",value:U.toArray()};else if(U&&U.isVector4)$.uniforms[Z]={type:"v4",value:U.toArray()};else if(U&&U.isMatrix3)$.uniforms[Z]={type:"m3",value:U.toArray()};else if(U&&U.isMatrix4)$.uniforms[Z]={type:"m4",value:U.toArray()};else $.uniforms[Z]={value:U}}if(Object.keys(this.defines).length>0)$.defines=this.defines;$.vertexShader=this.vertexShader,$.fragmentShader=this.fragmentShader,$.lights=this.lights,$.clipping=this.clipping;let Q={};for(let Z in this.extensions)if(this.extensions[Z]===!0)Q[Z]=!0;if(Object.keys(Q).length>0)$.extensions=Q;return $}fromJSON(J,$){if(super.fromJSON(J,$),J.uniforms!==void 0)for(let Q in J.uniforms){let Z=J.uniforms[Q];switch(this.uniforms[Q]={},Z.type){case"t":this.uniforms[Q].value=$[Z.value]||null;break;case"c":this.uniforms[Q].value=new D0().setHex(Z.value);break;case"v2":this.uniforms[Q].value=new q0().fromArray(Z.value);break;case"v3":this.uniforms[Q].value=new v().fromArray(Z.value);break;case"v4":this.uniforms[Q].value=new N7().fromArray(Z.value);break;case"m3":this.uniforms[Q].value=new D9().fromArray(Z.value);break;case"m4":this.uniforms[Q].value=new h9().fromArray(Z.value);break;default:this.uniforms[Q].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let Q in J.extensions)this.extensions[Q]=J.extensions[Q];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class UQ extends p9{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class F9 extends y8{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new D0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new D0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qJ,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class MJ extends F9{constructor(J){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new q0(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return I9(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function($){this.ior=(1+0.4*$)/(1-0.4*$)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new D0(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new D0(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new D0(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(J)}get anisotropy(){return this._anisotropy}set anisotropy(J){if(this._anisotropy>0!==J>0)this.version++;this._anisotropy=J}get clearcoat(){return this._clearcoat}set clearcoat(J){if(this._clearcoat>0!==J>0)this.version++;this._clearcoat=J}get iridescence(){return this._iridescence}set iridescence(J){if(this._iridescence>0!==J>0)this.version++;this._iridescence=J}get dispersion(){return this._dispersion}set dispersion(J){if(this._dispersion>0!==J>0)this.version++;this._dispersion=J}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(J){if(this._retroreflectivity>0!==J>0)this.version++;this._retroreflectivity=J}get sheen(){return this._sheen}set sheen(J){if(this._sheen>0!==J>0)this.version++;this._sheen=J}get transmission(){return this._transmission}set transmission(J){if(this._transmission>0!==J>0)this.version++;this._transmission=J}copy(J){return super.copy(J),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=J.anisotropy,this.anisotropyRotation=J.anisotropyRotation,this.anisotropyMap=J.anisotropyMap,this.clearcoat=J.clearcoat,this.clearcoatMap=J.clearcoatMap,this.clearcoatRoughness=J.clearcoatRoughness,this.clearcoatRoughnessMap=J.clearcoatRoughnessMap,this.clearcoatNormalMap=J.clearcoatNormalMap,this.clearcoatNormalScale.copy(J.clearcoatNormalScale),this.dispersion=J.dispersion,this.ior=J.ior,this.iridescence=J.iridescence,this.iridescenceMap=J.iridescenceMap,this.iridescenceIOR=J.iridescenceIOR,this.iridescenceThicknessRange=[...J.iridescenceThicknessRange],this.iridescenceThicknessMap=J.iridescenceThicknessMap,this.retroreflectivity=J.retroreflectivity,this.sheen=J.sheen,this.sheenColor.copy(J.sheenColor),this.sheenColorMap=J.sheenColorMap,this.sheenRoughness=J.sheenRoughness,this.sheenRoughnessMap=J.sheenRoughnessMap,this.transmission=J.transmission,this.transmissionMap=J.transmissionMap,this.thickness=J.thickness,this.thicknessMap=J.thicknessMap,this.attenuationDistance=J.attenuationDistance,this.attenuationColor.copy(J.attenuationColor),this.specularIntensity=J.specularIntensity,this.specularIntensityMap=J.specularIntensityMap,this.specularColor.copy(J.specularColor),this.specularColorMap=J.specularColorMap,this}}class o7 extends y8{constructor(J){super();this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new D0(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new D0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.gradientMap=J.gradientMap,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.alphaMap=J.alphaMap,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}class HQ extends y8{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class nU extends y8{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}class hZ extends G6{constructor(J){super();this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(J)}copy(J){return super.copy(J),this.scale=J.scale,this.dashSize=J.dashSize,this.gapSize=J.gapSize,this}}function p6(J,$){if(!J||J.constructor===$)return J;if(typeof $.BYTES_PER_ELEMENT==="number")return new $(J);return Array.prototype.slice.call(J)}function bK(J){return J!==void 0&&J.inTangents!==void 0&&J.outTangents!==void 0}class q6{constructor(J,$,Q,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new $.constructor(Q),this.sampleValues=$,this.valueSize=Q,this.settings=null,this.DefaultSettings_={}}evaluate(J){let $=this.parameterPositions,Q=this._cachedIndex,Z=$[Q],K=$[Q-1];Q:{J:{let U;$:{Z:if(!(J<Z)){for(let H=Q+2;;){if(Z===void 0){if(J<K)break Z;return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}if(Q===H)break;if(K=Z,Z=$[++Q],J<Z)break J}U=$.length;break $}if(!(J>=K)){let H=$[1];if(J<H)Q=2,K=H;for(let Y=Q-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===Y)break;if(Z=K,K=$[--Q-1],J>=K)break J}U=Q,Q=0;break $}break Q}while(Q<U){let H=Q+U>>>1;if(J<$[H])U=H;else Q=H+1}if(Z=$[Q],K=$[Q-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}this._cachedIndex=Q,this.intervalChanged_(Q,K,Z)}return this.interpolate_(Q,K,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let $=this.resultBuffer,Q=this.sampleValues,Z=this.valueSize,K=J*Z;for(let U=0;U!==Z;++U)$[U]=Q[K+U];return $}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class iU extends q6{constructor(J,$,Q,Z){super(J,$,Q,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,$,Q){let Z=this.parameterPositions,K=J-2,U=J+1,H=Z[K],Y=Z[U];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,H=2*$-Q;break;case 2402:K=Z.length-2,H=$+Z[K]-Z[K+1];break;default:K=J,H=Q}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:U=J,Y=2*Q-$;break;case 2402:U=1,Y=Q+Z[1]-Z[0];break;default:U=J-1,Y=$}let W=(Q-$)*0.5,G=this.valueSize;this._weightPrev=W/($-H),this._weightNext=W/(Y-Q),this._offsetPrev=K*G,this._offsetNext=U*G}interpolate_(J,$,Q,Z){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,Y=J*H,W=Y-H,G=this._offsetPrev,N=this._offsetNext,q=this._weightPrev,X=this._weightNext,F=(Q-$)/(Z-$),R=F*F,M=R*F,D=-q*M+2*q*R-q*F,E=(1+q)*M+(-1.5-2*q)*R+(-0.5+q)*F+1,I=(-1-X)*M+(1.5+X)*R+0.5*F,C=X*M-X*R;for(let O=0;O!==H;++O)K[O]=D*U[G+O]+E*U[W+O]+I*U[Y+O]+C*U[N+O];return K}}class sU extends q6{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J,$,Q,Z){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,Y=J*H,W=Y-H,G=(Q-$)/(Z-$),N=1-G;for(let q=0;q!==H;++q)K[q]=U[W+q]*N+U[Y+q]*G;return K}}class oU extends q6{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class aU extends q6{interpolate_(J,$,Q,Z){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,Y=J*H,W=Y-H,G=this.inTangents,N=this.outTangents;if(!G||!N){let F=(Q-$)/(Z-$),R=1-F;for(let M=0;M!==H;++M)K[M]=U[W+M]*R+U[Y+M]*F;return K}let q=H*2,X=J-1;for(let F=0;F!==H;++F){let R=U[W+F],M=U[Y+F],D=X*q+F*2,E=N[D],I=N[D+1],C=J*q+F*2,O=G[C],B=G[C+1],_=HX(Q,$,E,O,Z);K[F]=e5(_,R,I,B,M)}return K}}function e5(J,$,Q,Z,K){let U=1-J;return U*U*U*$+3*U*U*J*Q+3*U*J*J*Z+J*J*J*K}function UX(J,$,Q,Z,K){let U=1-J;return 3*U*U*(Q-$)+6*U*J*(Z-Q)+3*J*J*(K-Z)}function HX(J,$,Q,Z,K){let U=(J-$)/(K-$);for(let H=0;H<8;H++){let Y=e5(U,$,Q,Z,K)-J;if(Math.abs(Y)<0.0000000001)break;let W=UX(U,$,Q,Z,K);if(Math.abs(W)<0.0000000001)break;U=Math.max(0,Math.min(1,U-Y/W))}return U}class I8{constructor(J,$,Q,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if($===void 0||$.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=p6($,this.TimeBufferType),this.values=p6(Q,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let $=J.constructor,Q;if($.toJSON!==this.toJSON)Q=$.toJSON(J);else{Q={name:J.name,times:p6(J.times,Array),values:p6(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)Q.interpolation=Z;if(bK(J.settings))Q.settings={inTangents:p6(J.settings.inTangents,Array),outTangents:p6(J.settings.outTangents,Array)}}return Q.type=J.ValueTypeName,Q}InterpolantFactoryMethodDiscrete(J){return new oU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new sU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new iU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let $=new aU(this.times,this.values,this.getValueSize(),J);if(this.settings)$.inTangents=this.settings.inTangents,$.outTangents=this.settings.outTangents;return $}setInterpolation(J){let $;switch(J){case 2300:$=this.InterpolantFactoryMethodDiscrete;break;case 2301:$=this.InterpolantFactoryMethodLinear;break;case 2302:$=this.InterpolantFactoryMethodSmooth;break;case 2303:$=this.InterpolantFactoryMethodBezier;break}if($===void 0){let Q="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Q);return H9("KeyframeTrack:",Q),this}return this.createInterpolant=$,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let $=this.times;for(let Q=0,Z=$.length;Q!==Z;++Q)$[Q]+=J}return this}scale(J){if(J!==1){let $=this.times;for(let Q=0,Z=$.length;Q!==Z;++Q)$[Q]*=J;if(bK(this.settings))mY(this.settings.inTangents,J),mY(this.settings.outTangents,J)}return this}trim(J,$){let Q=this.times,Z=Q.length,K=0,U=Z-1;while(K!==Z&&Q[K]<J)++K;while(U!==-1&&Q[U]>$)--U;if(++U,K!==0||U!==Z){if(K>=U)U=Math.max(U,1),K=U-1;let H=this.getValueSize();this.times=Q.slice(K,U),this.values=this.values.slice(K*H,U*H)}return this}validate(){let J=!0,$=this.getValueSize();if($-Math.floor($)!==0)N9("KeyframeTrack: Invalid value size in track.",this),J=!1;let Q=this.times,Z=this.values,K=Q.length;if(K===0)N9("KeyframeTrack: Track is empty.",this),J=!1;let U=null;for(let H=0;H!==K;H++){let Y=Q[H];if(typeof Y==="number"&&isNaN(Y)){N9("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(U!==null&&U>Y){N9("KeyframeTrack: Out of order keys.",this,H,Y,U),J=!1;break}U=Y}if(Z!==void 0){if(iG(Z))for(let H=0,Y=Z.length;H!==Y;++H){let W=Z[H];if(isNaN(W)){N9("KeyframeTrack: Value is not a valid number.",this,H,W),J=!1;break}}}return J}optimize(){let J=this.times.slice(),$=this.values.slice(),Q=this.getValueSize(),Z=this.getInterpolation()===2302,K=J.length-1,U=1;for(let H=1;H<K;++H){let Y=!1,W=J[H],G=J[H+1];if(W!==G&&(H!==1||W!==J[0]))if(!Z){let N=H*Q,q=N-Q,X=N+Q;for(let F=0;F!==Q;++F){let R=$[N+F];if(R!==$[q+F]||R!==$[X+F]){Y=!0;break}}}else Y=!0;if(Y){if(H!==U){J[U]=J[H];let N=H*Q,q=U*Q;for(let X=0;X!==Q;++X)$[q+X]=$[N+X]}++U}}if(K>0){J[U]=J[K];for(let H=K*Q,Y=U*Q,W=0;W!==Q;++W)$[Y+W]=$[H+W];++U}if(U!==J.length)this.times=J.slice(0,U),this.values=$.slice(0,U*Q);else this.times=J,this.values=$;return this}clone(){let J=this.times.slice(),$=this.values.slice(),Z=new this.constructor(this.name,J,$);if(Z.createInterpolant=this.createInterpolant,bK(this.settings))Z.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return Z}}function mY(J,$){for(let Q=0,Z=J.length;Q!==Z;Q+=2)J[Q]*=$}I8.prototype.ValueTypeName="";I8.prototype.TimeBufferType=Float32Array;I8.prototype.ValueBufferType=Float32Array;I8.prototype.DefaultInterpolation=2301;class F6 extends I8{constructor(J,$,Q){super(J,$,Q)}}F6.prototype.ValueTypeName="bool";F6.prototype.ValueBufferType=Array;F6.prototype.DefaultInterpolation=2300;F6.prototype.InterpolantFactoryMethodLinear=void 0;F6.prototype.InterpolantFactoryMethodSmooth=void 0;class rU extends I8{constructor(J,$,Q,Z){super(J,$,Q,Z)}}rU.prototype.ValueTypeName="color";class tU extends I8{constructor(J,$,Q,Z){super(J,$,Q,Z)}}tU.prototype.ValueTypeName="number";class eU extends q6{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J,$,Q,Z){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,Y=(Q-$)/(Z-$),W=J*H;for(let G=W+H;W!==G;W+=4)v8.slerpFlat(K,0,U,W-H,U,W,Y);return K}}class gZ extends I8{constructor(J,$,Q,Z){super(J,$,Q,Z)}InterpolantFactoryMethodLinear(J){return new eU(this.times,this.values,this.getValueSize(),J)}}gZ.prototype.ValueTypeName="quaternion";gZ.prototype.InterpolantFactoryMethodSmooth=void 0;class D6 extends I8{constructor(J,$,Q){super(J,$,Q)}}D6.prototype.ValueTypeName="string";D6.prototype.ValueBufferType=Array;D6.prototype.DefaultInterpolation=2300;D6.prototype.InterpolantFactoryMethodLinear=void 0;D6.prototype.InterpolantFactoryMethodSmooth=void 0;class JH extends I8{constructor(J,$,Q,Z){super(J,$,Q,Z)}}JH.prototype.ValueTypeName="vector";class $H{constructor(J,$,Q){let Z=this,K=!1,U=0,H=0,Y=void 0,W=[];this.onStart=void 0,this.onLoad=J,this.onProgress=$,this.onError=Q,this._abortController=null,this.itemStart=function(G){if(H++,K===!1){if(Z.onStart!==void 0)Z.onStart(G,U,H)}K=!0},this.itemEnd=function(G){if(U++,Z.onProgress!==void 0)Z.onProgress(G,U,H);if(U===H){if(K=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(G){if(Z.onError!==void 0)Z.onError(G)},this.resolveURL=function(G){if(G=G.normalize("NFC"),Y)return Y(G);return G},this.setURLModifier=function(G){return Y=G,this},this.addHandler=function(G,N){return W.push(G,N),this},this.removeHandler=function(G){let N=W.indexOf(G);if(N!==-1)W.splice(N,2);return this},this.getHandler=function(G){for(let N=0,q=W.length;N<q;N+=2){let X=W[N],F=W[N+1];if(X.global)X.lastIndex=0;if(X.test(G))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var JW=new $H;class QH{constructor(J){if(this.manager=J!==void 0?J:JW,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,$){let Q=this;return new Promise(function(Z,K){Q.load(J,Z,$,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}QH.DEFAULT_MATERIAL_NAME="__DEFAULT";class Q$ extends v9{constructor(J,$=1){super();this.isLight=!0,this.type="Light",this.color=new D0(J),this.intensity=$}copy(J,$){return super.copy(J,$),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let $=super.toJSON(J);return $.object.color=this.color.getHex(),$.object.intensity=this.intensity,$}}class U8 extends Q${constructor(J,$,Q){super(J,Q);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(v9.DEFAULT_UP),this.updateMatrix(),this.groundColor=new D0($)}copy(J,$){return super.copy(J,$),this.groundColor.copy(J.groundColor),this}toJSON(J){let $=super.toJSON(J);return $.object.groundColor=this.groundColor.getHex(),$}}var xK=new h9,dY=new v,lY=new v;class YQ{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new q0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new h9,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new t$,this._frameExtents=new q0(1,1),this._viewportCount=1,this._viewports=[new N7(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(J){let $=this.camera;dY.setFromMatrixPosition(J.matrixWorld),$.position.copy(dY),lY.setFromMatrixPosition(J.target.matrixWorld),$.lookAt(lY),$.updateMatrixWorld(),this._updateMatrix($,this.matrix,this._frustum)}_updateMatrix(J,$,Q,Z){xK.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),Q.setFromProjectionMatrix(xK,J.coordinateSystem,J.reversedDepth);let K=this._frameExtents,U=Z?Z.z/K.x:1,H=Z?Z.w/K.y:1,Y=Z?Z.x/K.x:0,W=Z?Z.y/K.y:0;if(J.coordinateSystem===2001||J.reversedDepth)$.set(0.5*U,0,0,0.5*U+Y,0,0.5*H,0,0.5*H+W,0,0,1,0,0,0,0,1);else $.set(0.5*U,0,0,0.5*U+Y,0,0.5*H,0,0.5*H+W,0,0,0.5,0.5,0,0,0,1);$.multiply(xK)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};return J.intensity=this.intensity,J.bias=this.bias,J.normalBias=this.normalBias,J.radius=this.radius,J.blurSamples=this.blurSamples,J.mapSize=this.mapSize.toArray(),J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var WZ=new v,GZ=new v8,n8=new v;class pZ extends v9{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new h9,this.projectionMatrix=new h9,this.projectionMatrixInverse=new h9,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,$){return super.copy(J,$),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(WZ,GZ,n8),n8.x===1&&n8.y===1&&n8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(WZ,GZ,n8.set(1,1,1)).invert()}updateWorldMatrix(J,$,Q=!1){if(super.updateWorldMatrix(J,$,Q),this.matrixWorld.decompose(WZ,GZ,n8),n8.x===1&&n8.y===1&&n8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(WZ,GZ,n8.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var hJ=new v,cY=new q0,nY=new q0;class Z7 extends pZ{constructor(J=50,$=1,Q=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Q,this.far=Z,this.focus=10,this.aspect=$,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let $=0.5*this.getFilmHeight()/J;this.fov=$6*2*Math.atan($),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(d6*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return $6*2*Math.atan(Math.tan(d6*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,$,Q){hJ.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(hJ.x,hJ.y).multiplyScalar(-J/hJ.z),hJ.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(hJ.x,hJ.y).multiplyScalar(-J/hJ.z)}getViewSize(J,$){return this.getViewBounds(J,cY,nY),$.subVectors(nY,cY)}setViewOffset(J,$,Q,Z,K,U){if(this.aspect=J/$,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=Z,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,$=J*Math.tan(d6*0.5*this.fov)/this.zoom,Q=2*$,Z=this.aspect*Q,K=-0.5*Z,U=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:W}=U;K+=U.offsetX*Z/Y,$-=U.offsetY*Q/W,Z*=U.width/Y,Q*=U.height/W}let H=this.filmOffset;if(H!==0)K+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+Z,$,$-Q,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.fov=this.fov,$.object.zoom=this.zoom,$.object.near=this.near,$.object.far=this.far,$.object.focus=this.focus,$.object.aspect=this.aspect,this.view!==null)$.object.view=Object.assign({},this.view);return $.object.filmGauge=this.filmGauge,$.object.filmOffset=this.filmOffset,$}}class $W extends YQ{constructor(){super(new Z7(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(J){let $=this.camera,Q=$6*2*J.angle*this.focus,Z=this.mapSize.width/this.mapSize.height*this.aspect,K=J.distance||$.far;if(Q!==$.fov||Z!==$.aspect||K!==$.far)$.fov=Q,$.aspect=Z,$.far=K,$.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this.aspect=J.aspect,this}toJSON(){let J=super.toJSON();return J.focus=this.focus,J.aspect=this.aspect,J}}class Z$ extends Q${constructor(J,$,Q=0,Z=Math.PI/3,K=0,U=2){super(J,$);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(v9.DEFAULT_UP),this.updateMatrix(),this.target=new v9,this.distance=Q,this.angle=Z,this.penumbra=K,this.decay=U,this.map=null,this.shadow=new $W}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.map=J.map,this.shadow=J.shadow.clone(),this}toJSON(J){let $=super.toJSON(J);if($.object.distance=this.distance,$.object.angle=this.angle,$.object.decay=this.decay,$.object.penumbra=this.penumbra,$.object.target=this.target.uuid,this.map&&this.map.isTexture)$.object.map=this.map.toJSON(J).uuid;return $.object.shadow=this.shadow.toJSON(),$}}class QW extends YQ{constructor(){super(new Z7(90,1,0.5,500));this.isPointLightShadow=!0}}class D8 extends Q${constructor(J,$,Q=0,Z=2){super(J,$);this.isPointLight=!0,this.type="PointLight",this.distance=Q,this.decay=Z,this.shadow=new QW}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}toJSON(J){let $=super.toJSON(J);return $.object.distance=this.distance,$.object.decay=this.decay,$.object.shadow=this.shadow.toJSON(),$}}class VJ extends pZ{constructor(J=-1,$=1,Q=1,Z=-1,K=0.1,U=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=$,this.top=Q,this.bottom=Z,this.near=K,this.far=U,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,$,Q,Z,K,U){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=Z,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),$=(this.top-this.bottom)/(2*this.zoom),Q=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,K=Q-J,U=Q+J,H=Z+$,Y=Z-$;if(this.view!==null&&this.view.enabled){let W=(this.right-this.left)/this.view.fullWidth/this.zoom,G=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=W*this.view.offsetX,U=K+W*this.view.width,H-=G*this.view.offsetY,Y=H-G*this.view.height}this.projectionMatrix.makeOrthographic(K,U,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.zoom=this.zoom,$.object.left=this.left,$.object.right=this.right,$.object.top=this.top,$.object.bottom=this.bottom,$.object.near=this.near,$.object.far=this.far,this.view!==null)$.object.view=Object.assign({},this.view);return $}}class ZW extends YQ{constructor(){super(new VJ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class a7 extends Q${constructor(J,$){super(J,$);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(v9.DEFAULT_UP),this.updateMatrix(),this.target=new v9,this.shadow=new ZW}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let $=super.toJSON(J);return $.object.shadow=this.shadow.toJSON(),$.object.target=this.target.uuid,$}}var u6=-90,m6=1;class ZH extends v9{constructor(J,$,Q){super();this.type="CubeCamera",this.renderTarget=Q,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new Z7(u6,m6,J,$);Z.layers=this.layers,this.add(Z);let K=new Z7(u6,m6,J,$);K.layers=this.layers,this.add(K);let U=new Z7(u6,m6,J,$);U.layers=this.layers,this.add(U);let H=new Z7(u6,m6,J,$);H.layers=this.layers,this.add(H);let Y=new Z7(u6,m6,J,$);Y.layers=this.layers,this.add(Y);let W=new Z7(u6,m6,J,$);W.layers=this.layers,this.add(W)}updateCoordinateSystem(){let J=this.coordinateSystem,$=this.children.concat(),[Q,Z,K,U,H,Y]=$;for(let W of $)this.remove(W);if(J===2000)Q.up.set(0,1,0),Q.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),U.up.set(0,0,1),U.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)Q.up.set(0,-1,0),Q.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),U.up.set(0,0,-1),U.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let W of $)this.add(W),W.updateMatrixWorld()}update(J,$){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Q,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,U,H,Y,W,G]=this.children,N=J.getRenderTarget(),q=J.getActiveCubeFace(),X=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let R=Q.texture.generateMipmaps;Q.texture.generateMipmaps=!1;let M=!1;if(J.isWebGLRenderer===!0)M=J.state.buffers.depth.getReversed();else M=J.reversedDepthBuffer;if(J.setRenderTarget(Q,0,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render($,K),J.setRenderTarget(Q,1,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render($,U),J.setRenderTarget(Q,2,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render($,H),J.setRenderTarget(Q,3,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render($,Y),J.setRenderTarget(Q,4,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render($,W),Q.texture.generateMipmaps=R,J.setRenderTarget(Q,5,Z),M&&J.autoClear===!1)J.clearDepth();J.render($,G),J.setRenderTarget(N,q,X),J.xr.enabled=F,Q.texture.needsPMREMUpdate=!0}}class KH extends Z7{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}class uZ{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(J){if(this._document=J,J.hidden!==void 0)this._pageVisibilityHandler=YX.bind(this),J.addEventListener("visibilitychange",this._pageVisibilityHandler,!1)}disconnect(){if(this._pageVisibilityHandler!==null)this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null;this._document=null}getDelta(){return this._delta/1000}getElapsed(){return this._elapsed/1000}getTimescale(){return this._timescale}setTimescale(J){return this._timescale=J,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(J){if(this._pageVisibilityHandler!==null&&this._document.hidden===!0)this._delta=0;else this._previousTime=this._currentTime,this._currentTime=(J!==void 0?J:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta;return this}}function YX(){if(this._document.hidden===!1)this.reset()}var UH="\\[\\]\\.:\\/",WX=new RegExp("["+UH+"]","g"),HH="[^"+UH+"]",GX="[^"+UH.replace("\\.","")+"]",NX=/((?:WC+[\/:])*)/.source.replace("WC",HH),XX=/(WCOD+)?/.source.replace("WCOD",GX),qX=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",HH),FX=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",HH),DX=new RegExp("^"+NX+XX+qX+FX+"$"),EX=["material","materials","bones","map"];class KW{constructor(J,$,Q){let Z=Q||a9.parseTrackName($);this._targetGroup=J,this._bindings=J.subscribe_($,Z)}getValue(J,$){this.bind();let Q=this._targetGroup.nCachedObjects_,Z=this._bindings[Q];if(Z!==void 0)Z.getValue(J,$)}setValue(J,$){let Q=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,K=Q.length;Z!==K;++Z)Q[Z].setValue(J,$)}bind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].bind()}unbind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].unbind()}}class a9{constructor(J,$,Q){this.path=$,this.parsedPath=Q||a9.parseTrackName($),this.node=a9.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,$,Q){if(!(J&&J.isAnimationObjectGroup))return new a9(J,$,Q);else return new a9.Composite(J,$,Q)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(WX,"")}static parseTrackName(J){let $=DX.exec(J);if($===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let Q={nodeName:$[2],objectName:$[3],objectIndex:$[4],propertyName:$[5],propertyIndex:$[6]},Z=Q.nodeName&&Q.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let K=Q.nodeName.substring(Z+1);if(EX.indexOf(K)!==-1)Q.nodeName=Q.nodeName.substring(0,Z),Q.objectName=K}if(Q.propertyName===null||Q.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return Q}static findNode(J,$){if($===void 0||$===""||$==="."||$===-1||$===J.name||$===J.uuid)return J;if(J.skeleton){let Q=J.skeleton.getBoneByName($);if(Q!==void 0)return Q}if(J.children){let Q=function(K){for(let U=0;U<K.length;U++){let H=K[U];if(H.name===$||H.uuid===$)return H;let Y=Q(H.children);if(Y)return Y}return null},Z=Q(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,$){J[$]=this.targetObject[this.propertyName]}_getValue_array(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)J[$++]=Q[Z]}_getValue_arrayElement(J,$){J[$]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,$){this.resolvedProperty.toArray(J,$)}_setValue_direct(J,$){this.targetObject[this.propertyName]=J[$]}_setValue_direct_setNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++]}_setValue_array_setNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,$){this.resolvedProperty[this.propertyIndex]=J[$]}_setValue_arrayElement_setNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,$){this.resolvedProperty.fromArray(J,$)}_setValue_fromArray_setNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,$){this.bind(),this.getValue(J,$)}_setValue_unbound(J,$){this.bind(),this.setValue(J,$)}bind(){let J=this.node,$=this.parsedPath,Q=$.objectName,Z=$.propertyName,K=$.propertyIndex;if(!J)J=a9.findNode(this.rootNode,$.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){H9("PropertyBinding: No target node found for track: "+this.path+".");return}if(Q){let W=$.objectIndex;switch(Q){case"materials":if(!J.material){N9("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){N9("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){N9("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let G=0;G<J.length;G++)if(J[G].name===W){W=G;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){N9("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){N9("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Q]===void 0){N9("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Q]}if(W!==void 0){if(J[W]===void 0){N9("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[W]}}let U=J[Z];if(U===void 0){let W=$.nodeName;N9("PropertyBinding: Trying to update property for track: "+W+"."+Z+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(K!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){N9("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){N9("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}Y=this.BindingType.ArrayElement,this.resolvedProperty=U,this.propertyIndex=K}else if(U.fromArray!==void 0&&U.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=U;else if(Array.isArray(U))Y=this.BindingType.EntireArray,this.resolvedProperty=U;else this.propertyName=Z;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}a9.Composite=KW;a9.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};a9.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};a9.prototype.GetterByBindingType=[a9.prototype._getValue_direct,a9.prototype._getValue_array,a9.prototype._getValue_arrayElement,a9.prototype._getValue_toArray];a9.prototype.SetterByBindingTypeAndVersioning=[[a9.prototype._setValue_direct,a9.prototype._setValue_direct_setNeedsUpdate,a9.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[a9.prototype._setValue_array,a9.prototype._setValue_array_setNeedsUpdate,a9.prototype._setValue_array_setMatrixWorldNeedsUpdate],[a9.prototype._setValue_arrayElement,a9.prototype._setValue_arrayElement_setNeedsUpdate,a9.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[a9.prototype._setValue_fromArray,a9.prototype._setValue_fromArray_setNeedsUpdate,a9.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pO=new Float32Array(1);class YH{static{YH.prototype.isMatrix2=!0}constructor(J,$,Q,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,$,Q,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,$=0){for(let Q=0;Q<4;Q++)this.elements[Q]=J[Q+$];return this}set(J,$,Q,Z){let K=this.elements;return K[0]=J,K[2]=$,K[1]=Q,K[3]=Z,this}}class mJ extends b8{constructor(J=10,$=10,Q=4473924,Z=8947848){Q=new D0(Q),Z=new D0(Z);let K=$/2,U=J/$,H=J/2,Y=[],W=[];for(let q=0,X=0,F=-H;q<=$;q++,F+=U){Y.push(-H,0,F,H,0,F),Y.push(F,0,-H,F,0,H);let R=q===K?Q:Z;R.toArray(W,X),X+=3,R.toArray(W,X),X+=3,R.toArray(W,X),X+=3,R.toArray(W,X),X+=3}let G=new V9;G.setAttribute("position",new Y9(Y,3)),G.setAttribute("color",new Y9(W,3));let N=new G6({vertexColors:!0,toneMapped:!1});super(G,N);this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function WH(J,$,Q,Z){let K=OX(Z);switch(Q){case 1021:return J*$;case 1028:return J*$/K.components*K.byteLength;case 1029:return J*$/K.components*K.byteLength;case 1030:return J*$*2/K.components*K.byteLength;case 1031:return J*$*2/K.components*K.byteLength;case 1022:return J*$*3/K.components*K.byteLength;case 1023:return J*$*4/K.components*K.byteLength;case 1033:return J*$*4/K.components*K.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max($,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max($,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor(($+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor(($+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor(($+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor(($+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor(($+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor(($+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor(($+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor(($+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor(($+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor(($+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor(($+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor(($+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor(($+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil($/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil($/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil($/4)*16}throw Error(`Unable to determine texture byte length for ${Q} format.`)}function OX(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)H9("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function PW(){let J=null,$=!1,Q=null,Z=null;function K(U,H){Z=J.requestAnimationFrame(K),Q(U,H)}return{start:function(){if($===!0)return;if(Q===null)return;if(J===null)return;Z=J.requestAnimationFrame(K),$=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);$=!1},setAnimationLoop:function(U){Q=U},setContext:function(U){J=U}}}function RX(J){let $=new WeakMap;function Q(Y,W){let{array:G,usage:N}=Y,q=G.byteLength,X=J.createBuffer();J.bindBuffer(W,X),J.bufferData(W,G,N),Y.onUploadCallback();let F;if(G instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&G instanceof Float16Array)F=J.HALF_FLOAT;else if(G instanceof Uint16Array)if(Y.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(G instanceof Int16Array)F=J.SHORT;else if(G instanceof Uint32Array)F=J.UNSIGNED_INT;else if(G instanceof Int32Array)F=J.INT;else if(G instanceof Int8Array)F=J.BYTE;else if(G instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(G instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+G);return{buffer:X,type:F,bytesPerElement:G.BYTES_PER_ELEMENT,version:Y.version,size:q}}function Z(Y,W,G){let{array:N,updateRanges:q}=W;if(J.bindBuffer(G,Y),q.length===0)J.bufferSubData(G,0,N);else{q.sort((F,R)=>F.start-R.start);let X=0;for(let F=1;F<q.length;F++){let R=q[X],M=q[F];if(M.start<=R.start+R.count+1)R.count=Math.max(R.count,M.start+M.count-R.start);else++X,q[X]=M}q.length=X+1;for(let F=0,R=q.length;F<R;F++){let M=q[F];J.bufferSubData(G,M.start*N.BYTES_PER_ELEMENT,N,M.start,M.count)}W.clearUpdateRanges()}W.onUploadCallback()}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return $.get(Y)}function U(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let W=$.get(Y);if(W)J.deleteBuffer(W.buffer),$.delete(Y)}function H(Y,W){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let N=$.get(Y);if(!N||N.version<Y.version)$.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let G=$.get(Y);if(G===void 0)$.set(Y,Q(Y,W));else if(G.version<Y.version){if(G.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(G.buffer,Y,W),G.version=Y.version}}return{get:K,remove:U,update:H}}var MX=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,VX=`#ifdef USE_ALPHAHASH
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
#endif`,_X=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,BX=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,IX=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zX=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,AX=`#ifdef USE_AOMAP
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
#endif`,LX=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,PX=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,CX=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,TX=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wX=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,SX=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kX=`#ifdef USE_IRIDESCENCE
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
#endif`,jX=`#ifdef USE_BUMPMAP
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
#endif`,vX=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,fX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bX=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,hX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,pX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,uX=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,mX=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dX=`vec3 transformedNormal = objectNormal;
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
#endif`,lX=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cX=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nX=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,iX=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sX="gl_FragColor = linearToOutputTexel( gl_FragColor );",oX=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,aX=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,rX=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tX=`#ifdef USE_ENVMAP
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
#endif`,eX=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jq=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$q=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qq=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zq=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kq=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Uq=`#ifdef USE_GRADIENTMAP
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
}`,Hq=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yq=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wq=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gq=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,Nq=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Xq=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qq=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fq=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dq=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Eq=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,Oq=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rq=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mq=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vq=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_q=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Bq=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Iq=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zq=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Aq=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lq=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pq=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cq=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tq=`#if defined( USE_POINTS_UV )
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
#endif`,wq=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sq=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kq=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jq=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vq=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fq=`#ifdef USE_MORPHTARGETS
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
#endif`,yq=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bq=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xq=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,hq=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gq=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pq=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,uq=`#ifdef USE_NORMALMAP
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
#endif`,mq=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dq=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lq=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cq=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nq=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iq=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,sq=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,oq=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,aq=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rq=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tq=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,eq=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,JF=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,$F=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,QF=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,ZF=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,KF=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,UF=`#ifdef USE_SKINNING
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
#endif`,HF=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,YF=`#ifdef USE_SKINNING
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
#endif`,WF=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,GF=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,NF=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,XF=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qF=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,FF=`#ifdef USE_TRANSMISSION
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
#endif`,DF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,EF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,OF=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RF=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,MF=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,VF=`uniform sampler2D t2D;
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
}`,_F=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,BF=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zF=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AF=`#include <common>
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
}`,LF=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,PF=`#define DISTANCE
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
}`,CF=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,TF=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wF=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,SF=`uniform float scale;
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
}`,kF=`uniform vec3 diffuse;
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
}`,jF=`#include <common>
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
}`,vF=`uniform vec3 diffuse;
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
}`,fF=`#define LAMBERT
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
}`,yF=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,bF=`#define MATCAP
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
}`,xF=`#define MATCAP
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
}`,hF=`#define NORMAL
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
}`,gF=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,pF=`#define PHONG
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
}`,uF=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,mF=`#define STANDARD
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
}`,dF=`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,lF=`#define TOON
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
}`,cF=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,nF=`uniform float size;
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
}`,iF=`uniform vec3 diffuse;
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
}`,sF=`#include <common>
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
}`,oF=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,aF=`uniform float rotation;
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
}`,rF=`uniform vec3 diffuse;
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
}`,B9={alphahash_fragment:MX,alphahash_pars_fragment:VX,alphamap_fragment:_X,alphamap_pars_fragment:BX,alphatest_fragment:IX,alphatest_pars_fragment:zX,aomap_fragment:AX,aomap_pars_fragment:LX,batching_pars_vertex:PX,batching_vertex:CX,begin_vertex:TX,beginnormal_vertex:wX,bsdfs:SX,iridescence_fragment:kX,bumpmap_pars_fragment:jX,clipping_planes_fragment:vX,clipping_planes_pars_fragment:fX,clipping_planes_pars_vertex:yX,clipping_planes_vertex:bX,color_fragment:xX,color_pars_fragment:hX,color_pars_vertex:gX,color_vertex:pX,common:uX,cube_uv_reflection_fragment:mX,defaultnormal_vertex:dX,displacementmap_pars_vertex:lX,displacementmap_vertex:cX,emissivemap_fragment:nX,emissivemap_pars_fragment:iX,colorspace_fragment:sX,colorspace_pars_fragment:oX,envmap_fragment:aX,envmap_common_pars_fragment:rX,envmap_pars_fragment:tX,envmap_pars_vertex:eX,envmap_physical_pars_fragment:Nq,envmap_vertex:Jq,fog_vertex:$q,fog_pars_vertex:Qq,fog_fragment:Zq,fog_pars_fragment:Kq,gradientmap_pars_fragment:Uq,lightmap_pars_fragment:Hq,lights_lambert_fragment:Yq,lights_lambert_pars_fragment:Wq,lights_pars_begin:Gq,lights_toon_fragment:Xq,lights_toon_pars_fragment:qq,lights_phong_fragment:Fq,lights_phong_pars_fragment:Dq,lights_physical_fragment:Eq,lights_physical_pars_fragment:Oq,lights_fragment_begin:Rq,lights_fragment_maps:Mq,lights_fragment_end:Vq,lightprobes_pars_fragment:_q,logdepthbuf_fragment:Bq,logdepthbuf_pars_fragment:Iq,logdepthbuf_pars_vertex:zq,logdepthbuf_vertex:Aq,map_fragment:Lq,map_pars_fragment:Pq,map_particle_fragment:Cq,map_particle_pars_fragment:Tq,metalnessmap_fragment:wq,metalnessmap_pars_fragment:Sq,morphinstance_vertex:kq,morphcolor_vertex:jq,morphnormal_vertex:vq,morphtarget_pars_vertex:fq,morphtarget_vertex:yq,normal_fragment_begin:bq,normal_fragment_maps:xq,normal_pars_fragment:hq,normal_pars_vertex:gq,normal_vertex:pq,normalmap_pars_fragment:uq,clearcoat_normal_fragment_begin:mq,clearcoat_normal_fragment_maps:dq,clearcoat_pars_fragment:lq,iridescence_pars_fragment:cq,opaque_fragment:nq,packing:iq,premultiplied_alpha_fragment:sq,project_vertex:oq,dithering_fragment:aq,dithering_pars_fragment:rq,roughnessmap_fragment:tq,roughnessmap_pars_fragment:eq,shadowmap_pars_fragment:JF,shadowmap_pars_vertex:$F,shadowmap_vertex:QF,shadowmask_pars_fragment:ZF,skinbase_vertex:KF,skinning_pars_vertex:UF,skinning_vertex:HF,skinnormal_vertex:YF,specularmap_fragment:WF,specularmap_pars_fragment:GF,tonemapping_fragment:NF,tonemapping_pars_fragment:XF,transmission_fragment:qF,transmission_pars_fragment:FF,uv_pars_fragment:DF,uv_pars_vertex:EF,uv_vertex:OF,worldpos_vertex:RF,background_vert:MF,background_frag:VF,backgroundCube_vert:_F,backgroundCube_frag:BF,cube_vert:IF,cube_frag:zF,depth_vert:AF,depth_frag:LF,distance_vert:PF,distance_frag:CF,equirect_vert:TF,equirect_frag:wF,linedashed_vert:SF,linedashed_frag:kF,meshbasic_vert:jF,meshbasic_frag:vF,meshlambert_vert:fF,meshlambert_frag:yF,meshmatcap_vert:bF,meshmatcap_frag:xF,meshnormal_vert:hF,meshnormal_frag:gF,meshphong_vert:pF,meshphong_frag:uF,meshphysical_vert:mF,meshphysical_frag:dF,meshtoon_vert:lF,meshtoon_frag:cF,points_vert:nF,points_frag:iF,shadow_vert:sF,shadow_frag:oF,sprite_vert:aF,sprite_frag:rF},y0={common:{diffuse:{value:new D0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new D9},alphaMap:{value:null},alphaMapTransform:{value:new D9},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new D9}},envmap:{envMap:{value:null},envMapRotation:{value:new D9},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new D9}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new D9}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new D9},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new D9},normalScale:{value:new q0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new D9},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new D9}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new D9}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new D9}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new D0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new v},probesMax:{value:new v},probesResolution:{value:new v}},points:{diffuse:{value:new D0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new D9},alphaTest:{value:0},uvTransform:{value:new D9}},sprite:{diffuse:{value:new D0(16777215)},opacity:{value:1},center:{value:new q0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new D9},alphaMap:{value:null},alphaMapTransform:{value:new D9},alphaTest:{value:0}}},e8={basic:{uniforms:d7([y0.common,y0.specularmap,y0.envmap,y0.aomap,y0.lightmap,y0.fog]),vertexShader:B9.meshbasic_vert,fragmentShader:B9.meshbasic_frag},lambert:{uniforms:d7([y0.common,y0.specularmap,y0.envmap,y0.aomap,y0.lightmap,y0.emissivemap,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.fog,y0.lights,{emissive:{value:new D0(0)},envMapIntensity:{value:1}}]),vertexShader:B9.meshlambert_vert,fragmentShader:B9.meshlambert_frag},phong:{uniforms:d7([y0.common,y0.specularmap,y0.envmap,y0.aomap,y0.lightmap,y0.emissivemap,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.fog,y0.lights,{emissive:{value:new D0(0)},specular:{value:new D0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:B9.meshphong_vert,fragmentShader:B9.meshphong_frag},standard:{uniforms:d7([y0.common,y0.envmap,y0.aomap,y0.lightmap,y0.emissivemap,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.roughnessmap,y0.metalnessmap,y0.fog,y0.lights,{emissive:{value:new D0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:B9.meshphysical_vert,fragmentShader:B9.meshphysical_frag},toon:{uniforms:d7([y0.common,y0.aomap,y0.lightmap,y0.emissivemap,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.gradientmap,y0.fog,y0.lights,{emissive:{value:new D0(0)}}]),vertexShader:B9.meshtoon_vert,fragmentShader:B9.meshtoon_frag},matcap:{uniforms:d7([y0.common,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.fog,{matcap:{value:null}}]),vertexShader:B9.meshmatcap_vert,fragmentShader:B9.meshmatcap_frag},points:{uniforms:d7([y0.points,y0.fog]),vertexShader:B9.points_vert,fragmentShader:B9.points_frag},dashed:{uniforms:d7([y0.common,y0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:B9.linedashed_vert,fragmentShader:B9.linedashed_frag},depth:{uniforms:d7([y0.common,y0.displacementmap]),vertexShader:B9.depth_vert,fragmentShader:B9.depth_frag},normal:{uniforms:d7([y0.common,y0.bumpmap,y0.normalmap,y0.displacementmap,{opacity:{value:1}}]),vertexShader:B9.meshnormal_vert,fragmentShader:B9.meshnormal_frag},sprite:{uniforms:d7([y0.sprite,y0.fog]),vertexShader:B9.sprite_vert,fragmentShader:B9.sprite_frag},background:{uniforms:{uvTransform:{value:new D9},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:B9.background_vert,fragmentShader:B9.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new D9}},vertexShader:B9.backgroundCube_vert,fragmentShader:B9.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:B9.cube_vert,fragmentShader:B9.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:B9.equirect_vert,fragmentShader:B9.equirect_frag},distance:{uniforms:d7([y0.common,y0.displacementmap,{referencePosition:{value:new v},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:B9.distance_vert,fragmentShader:B9.distance_frag},shadow:{uniforms:d7([y0.lights,y0.fog,{color:{value:new D0(0)},opacity:{value:1}}]),vertexShader:B9.shadow_vert,fragmentShader:B9.shadow_frag}};e8.physical={uniforms:d7([e8.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new D9},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new D9},clearcoatNormalScale:{value:new q0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new D9},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new D9},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new D9},sheen:{value:0},sheenColor:{value:new D0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new D9},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new D9},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new D9},transmissionSamplerSize:{value:new q0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new D9},attenuationDistance:{value:0},attenuationColor:{value:new D0(0)},specularColor:{value:new D0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new D9},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new D9},anisotropyVector:{value:new q0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new D9}}]),vertexShader:B9.meshphysical_vert,fragmentShader:B9.meshphysical_frag};var mZ={r:0,b:0,g:0},tF=new h9,CW=new D9;CW.set(-1,0,0,0,1,0,0,0,1);function eF(J,$,Q,Z,K,U){let H=new D0(0),Y=K===!0?0:1,W,G,N=null,q=0,X=null;function F(I){let C=I.isScene===!0?I.background:null;if(C&&C.isTexture){let O=I.backgroundBlurriness>0;C=$.get(C,O)}return C}function R(I){let C=!1,O=F(I);if(O===null)D(H,Y);else if(O&&O.isColor)D(O,1),C=!0;let B=J.xr.getEnvironmentBlendMode();if(B==="additive")Q.buffers.color.setClear(0,0,0,1,U);else if(B==="alpha-blend")Q.buffers.color.setClear(0,0,0,0,U);if(J.autoClear||C)Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function M(I,C){let O=F(C);if(O&&(O.isCubeTexture||O.mapping===c$)){if(G===void 0)G=new h(new I0(1,1,1),new p9({name:"BackgroundCubeMaterial",uniforms:X6(e8.backgroundCube.uniforms),vertexShader:e8.backgroundCube.vertexShader,fragmentShader:e8.backgroundCube.fragmentShader,side:L7,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),G.geometry.deleteAttribute("normal"),G.geometry.deleteAttribute("uv"),G.onBeforeRender=function(B,_,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(G.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(G);if(G.material.uniforms.envMap.value=O,G.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,G.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,G.material.uniforms.backgroundRotation.value.setFromMatrix4(tF.makeRotationFromEuler(C.backgroundRotation)).transpose(),O.isCubeTexture&&O.isRenderTargetTexture===!1)G.material.uniforms.backgroundRotation.value.premultiply(CW);if(G.material.toneMapped=A9.getTransfer(O.colorSpace)!==r9,N!==O||q!==O.version||X!==J.toneMapping)G.material.needsUpdate=!0,N=O,q=O.version,X=J.toneMapping;G.layers.enableAll(),I.unshift(G,G.geometry,G.material,0,0,null)}else if(O&&O.isTexture){if(W===void 0)W=new h(new t0(2,2),new p9({name:"BackgroundMaterial",uniforms:X6(e8.background.uniforms),vertexShader:e8.background.vertexShader,fragmentShader:e8.background.fragmentShader,side:s6,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),W.geometry.deleteAttribute("normal"),Object.defineProperty(W.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(W);if(W.material.uniforms.t2D.value=O,W.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,W.material.toneMapped=A9.getTransfer(O.colorSpace)!==r9,O.matrixAutoUpdate===!0)O.updateMatrix();if(W.material.uniforms.uvTransform.value.copy(O.matrix),N!==O||q!==O.version||X!==J.toneMapping)W.material.needsUpdate=!0,N=O,q=O.version,X=J.toneMapping;W.layers.enableAll(),I.unshift(W,W.geometry,W.material,0,0,null)}}function D(I,C){I.getRGB(mZ,cU(J)),Q.buffers.color.setClear(mZ.r,mZ.g,mZ.b,C,U)}function E(){if(G!==void 0)G.geometry.dispose(),G.material.dispose(),G=void 0;if(W!==void 0)W.geometry.dispose(),W.material.dispose(),W=void 0}return{getClearColor:function(){return H},setClearColor:function(I,C=1){H.set(I),Y=C,D(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(I){Y=I,D(H,Y)},render:R,addToRenderList:M,dispose:E}}function JD(J,$){let Q=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},K=X(null),U=K,H=!1;function Y(k,f,s,j,p){let e=!1,n=q(k,j,s,f);if(U!==n)U=n,G(U.object);if(e=F(k,j,s,p),e)R(k,j,s,p);if(p!==null)$.update(p,J.ELEMENT_ARRAY_BUFFER);if(e||H){if(H=!1,O(k,f,s,j),p!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,$.get(p).buffer)}}function W(){return J.createVertexArray()}function G(k){return J.bindVertexArray(k)}function N(k){return J.deleteVertexArray(k)}function q(k,f,s,j){let p=j.wireframe===!0,e=Z[f.id];if(e===void 0)e={},Z[f.id]=e;let n=k.isInstancedMesh===!0?k.id:0,r=e[n];if(r===void 0)r={},e[n]=r;let u=r[s.id];if(u===void 0)u={},r[s.id]=u;let x=u[p];if(x===void 0)x=X(W()),u[p]=x;return x}function X(k){let f=[],s=[],j=[];for(let p=0;p<Q;p++)f[p]=0,s[p]=0,j[p]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:f,enabledAttributes:s,attributeDivisors:j,object:k,attributes:{},index:null}}function F(k,f,s,j){let p=U.attributes,e=f.attributes,n=0,r=s.getAttributes();for(let u in r)if(r[u].location>=0){let K0=p[u],R0=e[u];if(R0===void 0){if(u==="instanceMatrix"&&k.instanceMatrix)R0=k.instanceMatrix;if(u==="instanceColor"&&k.instanceColor)R0=k.instanceColor}if(K0===void 0)return!0;if(K0.attribute!==R0)return!0;if(R0&&K0.data!==R0.data)return!0;n++}if(U.attributesNum!==n)return!0;if(U.index!==j)return!0;return!1}function R(k,f,s,j){let p={},e=f.attributes,n=0,r=s.getAttributes();for(let u in r)if(r[u].location>=0){let K0=e[u];if(K0===void 0){if(u==="instanceMatrix"&&k.instanceMatrix)K0=k.instanceMatrix;if(u==="instanceColor"&&k.instanceColor)K0=k.instanceColor}let R0={};if(R0.attribute=K0,K0&&K0.data)R0.data=K0.data;p[u]=R0,n++}U.attributes=p,U.attributesNum=n,U.index=j}function M(){let k=U.newAttributes;for(let f=0,s=k.length;f<s;f++)k[f]=0}function D(k){E(k,0)}function E(k,f){let{newAttributes:s,enabledAttributes:j,attributeDivisors:p}=U;if(s[k]=1,j[k]===0)J.enableVertexAttribArray(k),j[k]=1;if(p[k]!==f)J.vertexAttribDivisor(k,f),p[k]=f}function I(){let{newAttributes:k,enabledAttributes:f}=U;for(let s=0,j=f.length;s<j;s++)if(f[s]!==k[s])J.disableVertexAttribArray(s),f[s]=0}function C(k,f,s,j,p,e,n){if(n===!0)J.vertexAttribIPointer(k,f,s,p,e);else J.vertexAttribPointer(k,f,s,j,p,e)}function O(k,f,s,j){M();let p=j.attributes,e=s.getAttributes(),n=f.defaultAttributeValues;for(let r in e){let u=e[r];if(u.location>=0){let x=p[r];if(x===void 0){if(r==="instanceMatrix"&&k.instanceMatrix)x=k.instanceMatrix;if(r==="instanceColor"&&k.instanceColor)x=k.instanceColor}if(x!==void 0){let{normalized:K0,itemSize:R0}=x,T0=$.get(x);if(T0===void 0)continue;let{buffer:l,type:F0,bytesPerElement:i}=T0,N0=F0===J.INT||F0===J.UNSIGNED_INT||x.gpuType===cK;if(x.isInterleavedBufferAttribute){let G0=x.data,c=G0.stride,P0=x.offset;if(G0.isInstancedInterleavedBuffer){for(let J0=0;J0<u.locationSize;J0++)E(u.location+J0,G0.meshPerAttribute);if(k.isInstancedMesh!==!0&&j._maxInstanceCount===void 0)j._maxInstanceCount=G0.meshPerAttribute*G0.count}else for(let J0=0;J0<u.locationSize;J0++)D(u.location+J0);J.bindBuffer(J.ARRAY_BUFFER,l);for(let J0=0;J0<u.locationSize;J0++)C(u.location+J0,R0/u.locationSize,F0,K0,c*i,(P0+R0/u.locationSize*J0)*i,N0)}else{if(x.isInstancedBufferAttribute){for(let G0=0;G0<u.locationSize;G0++)E(u.location+G0,x.meshPerAttribute);if(k.isInstancedMesh!==!0&&j._maxInstanceCount===void 0)j._maxInstanceCount=x.meshPerAttribute*x.count}else for(let G0=0;G0<u.locationSize;G0++)D(u.location+G0);J.bindBuffer(J.ARRAY_BUFFER,l);for(let G0=0;G0<u.locationSize;G0++)C(u.location+G0,R0/u.locationSize,F0,K0,R0*i,R0/u.locationSize*G0*i,N0)}}else if(n!==void 0){let K0=n[r];if(K0!==void 0)switch(K0.length){case 2:J.vertexAttrib2fv(u.location,K0);break;case 3:J.vertexAttrib3fv(u.location,K0);break;case 4:J.vertexAttrib4fv(u.location,K0);break;default:J.vertexAttrib1fv(u.location,K0)}}}}I()}function B(){z();for(let k in Z){let f=Z[k];for(let s in f){let j=f[s];for(let p in j){let e=j[p];for(let n in e)N(e[n].object),delete e[n];delete j[p]}}delete Z[k]}}function _(k){if(Z[k.id]===void 0)return;let f=Z[k.id];for(let s in f){let j=f[s];for(let p in j){let e=j[p];for(let n in e)N(e[n].object),delete e[n];delete j[p]}}delete Z[k.id]}function A(k){for(let f in Z){let s=Z[f];for(let j in s){let p=s[j];if(p[k.id]===void 0)continue;let e=p[k.id];for(let n in e)N(e[n].object),delete e[n];delete p[k.id]}}}function V(k){for(let f in Z){let s=Z[f],j=k.isInstancedMesh===!0?k.id:0,p=s[j];if(p===void 0)continue;for(let e in p){let n=p[e];for(let r in n)N(n[r].object),delete n[r];delete p[e]}if(delete s[j],Object.keys(s).length===0)delete Z[f]}}function z(){if(y(),H=!0,U===K)return;U=K,G(U.object)}function y(){K.geometry=null,K.program=null,K.wireframe=!1}return{setup:Y,reset:z,resetDefaultState:y,dispose:B,releaseStatesOfGeometry:_,releaseStatesOfObject:V,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:D,disableUnusedAttributes:I}}function $D(J,$,Q){let Z;function K(W){Z=W}function U(W,G){J.drawArrays(Z,W,G),Q.update(G,Z,1)}function H(W,G,N){if(N===0)return;J.drawArraysInstanced(Z,W,G,N),Q.update(G,Z,N)}function Y(W,G,N){if(N===0)return;$.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,W,0,G,0,N);let X=0;for(let F=0;F<N;F++)X+=G[F];Q.update(X,Z,1)}this.setMode=K,this.render=U,this.renderInstances=H,this.renderMultiDraw=Y}function QD(J,$,Q,Z){let K;function U(){if(K!==void 0)return K;if($.has("EXT_texture_filter_anisotropic")===!0){let A=$.get("EXT_texture_filter_anisotropic");K=J.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else K=0;return K}function H(A){if(A!==r8&&Z.convert(A)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(A){let V=A===P7&&($.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float"));if(A!==j8&&A!==FJ&&!V&&Z.convert(A)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function W(A){if(A==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let G=Q.precision!==void 0?Q.precision:"highp",N=W(G);if(N!==G)H9("WebGLRenderer:",G,"not supported, using",N,"instead."),G=N;let q=Q.logarithmicDepthBuffer===!0,X=Q.reversedDepthBuffer===!0&&$.has("EXT_clip_control");if(Q.reversedDepthBuffer===!0&&X===!1)H9("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),R=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=J.getParameter(J.MAX_TEXTURE_SIZE),D=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),I=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),C=J.getParameter(J.MAX_VARYING_VECTORS),O=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),B=J.getParameter(J.MAX_SAMPLES),_=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:U,getMaxPrecision:W,textureFormatReadable:H,textureTypeReadable:Y,precision:G,logarithmicDepthBuffer:q,reversedDepthBuffer:X,maxTextures:F,maxVertexTextures:R,maxTextureSize:M,maxCubemapSize:D,maxAttributes:E,maxVertexUniforms:I,maxVaryings:C,maxFragmentUniforms:O,maxSamples:B,samples:_}}function ZD(J){let $=this,Q=null,Z=0,K=!1,U=!1,H=new i8,Y=new D9,W={value:null,needsUpdate:!1};this.uniform=W,this.numPlanes=0,this.numIntersection=0,this.init=function(q,X){let F=q.length!==0||X||Z!==0||K;return K=X,Z=q.length,F},this.beginShadows=function(){U=!0,N(null)},this.endShadows=function(){U=!1},this.setGlobalState=function(q,X){Q=N(q,X,0)},this.setState=function(q,X,F){let{clippingPlanes:R,clipIntersection:M,clipShadows:D}=q,E=J.get(q);if(!K||R===null||R.length===0||U&&!D)if(U)N(null);else G();else{let I=U?0:Z,C=I*4,O=E.clippingState||null;W.value=O,O=N(R,X,C,F);for(let B=0;B!==C;++B)O[B]=Q[B];E.clippingState=O,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=I}};function G(){if(W.value!==Q)W.value=Q,W.needsUpdate=Z>0;$.numPlanes=Z,$.numIntersection=0}function N(q,X,F,R){let M=q!==null?q.length:0,D=null;if(M!==0){if(D=W.value,R!==!0||D===null){let E=F+M*4,I=X.matrixWorldInverse;if(Y.getNormalMatrix(I),D===null||D.length<E)D=new Float32Array(E);for(let C=0,O=F;C!==M;++C,O+=4)H.copy(q[C]).applyMatrix4(I,Y),H.normal.toArray(D,O),D[O+3]=H.constant}W.value=D,W.needsUpdate=!0}return $.numPlanes=M,$.numIntersection=0,D}}var U$=4,KD=6,UD=20,HD=256,WQ=new VJ,UW=new D0,GH=null,NH=0,XH=0,qH=!1,YD=new v,E6=new v;class EH{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,$=0,Q=0.1,Z=100,K={}){let{size:U=256,position:H=YD}=K;GH=this._renderer.getRenderTarget(),NH=this._renderer.getActiveCubeFace(),XH=this._renderer.getActiveMipmapLevel(),qH=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(U);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,Q,Z,Y,H),$>0)this._blur(Y,0,0,$);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,$=null){return this._fromTexture(J,$)}fromCubemap(J,$=null){return this._fromTexture(J,$)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=WW(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=YW(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(GH,NH,XH),this._renderer.xr.enabled=qH,J.scissorTest=!1,K$(J,0,0,J.width,J.height)}_fromTexture(J,$){if(J.mapping===a6||J.mapping===Z6)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);GH=this._renderer.getRenderTarget(),NH=this._renderer.getActiveCubeFace(),XH=this._renderer.getActiveMipmapLevel(),qH=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let Q=$||this._allocateTargets();return this._textureToCubeUV(J,Q),this._applyPMREM(Q),this._cleanup(Q),Q}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),$=4*this._cubeSize,Q={magFilter:$8,minFilter:$8,generateMipmaps:!1,type:P7,format:r8,colorSpace:wU,depthBuffer:!1},Z=HW(J,$,Q);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==$){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=HW(J,$,Q);let{_lodMax:K}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=WD(K)),this._blurMaterial=ND(K,J,$),this._ggxMaterial=GD(K,J,$)}return Z}_compileMaterial(J){let $=new h(new V9,J);this._renderer.compile($,WQ)}_sceneToCubeUV(J,$,Q,Z,K){let Y=new Z7(90,1,$,Q),W=[1,-1,1,1,1,1],G=[1,1,1,-1,-1,-1],N=this._renderer,q=N.autoClear,X=N.toneMapping;if(N.getClearColor(UW),N.toneMapping=S8,N.autoClear=!1,N.state.buffers.depth.getReversed())N.setRenderTarget(Z),N.clearDepth(),N.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new h(new I0,new C0({name:"PMREM.Background",side:L7,depthWrite:!1,depthTest:!1}));let R=this._backgroundBox,M=R.material,D=!1,E=J.background;if(E){if(E.isColor)M.color.copy(E),J.background=null,D=!0}else M.color.copy(UW),D=!0;for(let I=0;I<6;I++){let C=I%3;if(C===0)Y.up.set(0,W[I],0),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x+G[I],K.y,K.z);else if(C===1)Y.up.set(0,0,W[I]),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x,K.y+G[I],K.z);else Y.up.set(0,W[I],0),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x,K.y,K.z+G[I]);let O=this._cubeSize;if(K$(Z,C*O,I>2?O:0,O,O),N.setRenderTarget(Z),D)N.render(R,Y);N.render(J,Y)}N.toneMapping=X,N.autoClear=q,J.background=E}_textureToCubeUV(J,$){let Q=this._renderer,Z=J.mapping===a6||J.mapping===Z6;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=WW();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=YW();let K=Z?this._cubemapMaterial:this._equirectMaterial,U=this._lodMeshes[0];U.material=K;let H=K.uniforms;H.envMap.value=J;let Y=this._cubeSize;K$($,0,0,3*Y,2*Y),Q.setRenderTarget($),Q.render(U,WQ)}_applyPMREM(J){let $=this._renderer,Q=$.autoClear;$.autoClear=!1;let Z=this._lodMeshes.length;for(let K=1;K<Z;K++)this._applyGGXFilter(J,K-1,K);$.autoClear=Q}_applyGGXFilter(J,$,Q){let Z=this._renderer,K=this._pingPongRenderTarget,U=this._ggxMaterial,H=this._lodMeshes[Q];H.material=U;let Y=U.uniforms,W=Q/(this._lodMeshes.length-1),G=$/(this._lodMeshes.length-1),N=Math.sqrt(W*W-G*G),q=W*1.25,X=N*q,{_lodMax:F}=this,R=this._sizeLods[Q],M=3*R*(Q>F-U$?Q-F+U$:0),D=4*(this._cubeSize-R);Y.envMap.value=J.texture,Y.roughness.value=X,Y.mipInt.value=F-$,K$(K,M,D,3*R,2*R),Z.setRenderTarget(K),Z.render(H,WQ),Y.envMap.value=K.texture,Y.roughness.value=0,Y.mipInt.value=F-Q,K$(J,M,D,3*R,2*R),Z.setRenderTarget(J),Z.render(H,WQ)}_blur(J,$,Q,Z){let K=this._pingPongRenderTarget,U=Math.min(Z,Math.PI)/Math.SQRT2;this._blurPass(J,K,$,Q,U),this._blurPass(K,J,Q,Q,U)}_blurPass(J,$,Q,Z,K){let U=this._renderer,H=this._blurMaterial,Y=this._lodMeshes[Z];Y.material=H;let W=H.uniforms;W.envMap.value=J.texture,W.sigma.value=K,W.mipInt.value=this._lodMax-Q;let G=this._sizeLods[Z],N=3*G*(Z>this._lodMax-U$?Z-this._lodMax+U$:0),q=4*(this._cubeSize-G);K$($,N,q,3*G,2*G),U.setRenderTarget($),U.render(Y,WQ)}}function WD(J){let $=[],Q=[],Z=J,K=J-U$+1+KD;for(let U=0;U<K;U++){let H=Math.pow(2,Z);$.push(H);let Y=1/(H-2),W=-Y,G=1+Y,N=[W,W,G,W,G,G,W,W,G,G,W,G],q=6,X=6,F=3,R=new Float32Array(F*X*q),M=new Float32Array(F*X*q);for(let E=0;E<q;E++){let I=E%3*2/3-1,C=E>2?0:-1,O=[I,C,0,I+0.6666666666666666,C,0,I+0.6666666666666666,C+1,0,I,C,0,I+0.6666666666666666,C+1,0,I,C+1,0];R.set(O,F*X*E);for(let B=0;B<X;B++){let _=N[B*2]*2-1,A=N[B*2+1]*2-1;if(E===0)E6.set(1,A,_);else if(E===1)E6.set(-_,1,-A);else if(E===2)E6.set(-_,A,1);else if(E===3)E6.set(-1,A,-_);else if(E===4)E6.set(-_,-1,A);else E6.set(_,A,-1);E6.toArray(M,(E*X+B)*F)}}let D=new V9;if(D.setAttribute("position",new H7(R,F)),D.setAttribute("outputDirection",new H7(M,F)),Q.push(new h(D,null)),Z>U$)Z--}return{lodMeshes:Q,sizeLods:$}}function HW(J,$,Q){let Z=new F7(J,$,Q);return Z.texture.mapping=c$,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function K$(J,$,Q,Z,K){J.viewport.set($,Q,Z,K),J.scissor.set($,Q,Z,K)}function GD(J,$,Q){return new p9({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:HD,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Q,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:lZ(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:J8,depthTest:!1,depthWrite:!1})}function ND(J,$,Q){return new p9({name:"SphericalGaussianBlur",defines:{SAMPLES:UD,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Q,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:lZ(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:J8,depthTest:!1,depthWrite:!1})}function YW(){return new p9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lZ(),fragmentShader:`

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
		`,blending:J8,depthTest:!1,depthWrite:!1})}function WW(){return new p9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lZ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:J8,depthTest:!1,depthWrite:!1})}function lZ(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class MH extends F7{constructor(J=1,$={}){super(J,J,$);this.isWebGLCubeRenderTarget=!0;let Q={width:J,height:J,depth:1},Z=[Q,Q,Q,Q,Q,Q];this.texture=new kZ(Z),this._setTextureOptions($),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,$){this.texture.type=$.type,this.texture.colorSpace=$.colorSpace,this.texture.generateMipmaps=$.generateMipmaps,this.texture.minFilter=$.minFilter,this.texture.magFilter=$.magFilter;let Q={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new I0(5,5,5),K=new p9({name:"CubemapFromEquirect",uniforms:X6(Q.uniforms),vertexShader:Q.vertexShader,fragmentShader:Q.fragmentShader,side:L7,blending:J8});K.uniforms.tEquirect.value=$;let U=new h(Z,K),H=$.minFilter;if($.minFilter===K6)$.minFilter=$8;return new ZH(1,10,this).update(J,U),$.minFilter=H,U.geometry.dispose(),U.material.dispose(),this}clear(J,$=!0,Q=!0,Z=!0){let K=J.getRenderTarget();for(let U=0;U<6;U++)J.setRenderTarget(this,U),J.clear($,Q,Z);J.setRenderTarget(K)}}function XD(J){let $=new WeakMap,Q=new WeakMap,Z=null;function K(X,F=!1){if(X===null||X===void 0)return null;if(F)return H(X);return U(X)}function U(X){if(X&&X.isTexture){let F=X.mapping;if(F===EZ||F===OZ)if($.has(X)){let R=$.get(X).texture;return Y(R,X.mapping)}else{let R=X.image;if(R&&R.height>0){let M=new MH(R.height);return M.fromEquirectangularTexture(J,X),$.set(X,M),X.addEventListener("dispose",G),Y(M.texture,X.mapping)}else return null}}return X}function H(X){if(X&&X.isTexture){let F=X.mapping,R=F===EZ||F===OZ,M=F===a6||F===Z6;if(R||M){let D=Q.get(X),E=D!==void 0?D.texture.pmremVersion:0;if(X.isRenderTargetTexture&&X.pmremVersion!==E){if(Z===null)Z=new EH(J);return D=R?Z.fromEquirectangular(X,D):Z.fromCubemap(X,D),D.texture.pmremVersion=X.pmremVersion,Q.set(X,D),D.texture}else if(D!==void 0)return D.texture;else{let I=X.image;if(R&&I&&I.height>0||M&&I&&W(I)){if(Z===null)Z=new EH(J);return D=R?Z.fromEquirectangular(X):Z.fromCubemap(X),D.texture.pmremVersion=X.pmremVersion,Q.set(X,D),X.addEventListener("dispose",N),D.texture}else return null}}}return X}function Y(X,F){if(F===EZ)X.mapping=a6;else if(F===OZ)X.mapping=Z6;return X}function W(X){let F=0,R=6;for(let M=0;M<R;M++)if(X[M]!==void 0)F++;return F===R}function G(X){let F=X.target;F.removeEventListener("dispose",G);let R=$.get(F);if(R!==void 0)$.delete(F),R.dispose()}function N(X){let F=X.target;F.removeEventListener("dispose",N);let R=Q.get(F);if(R!==void 0)Q.delete(F),R.dispose()}function q(){if($=new WeakMap,Q=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:K,dispose:q}}function qD(J){let $={};function Q(Z){if($[Z]!==void 0)return $[Z];let K=J.getExtension(Z);return $[Z]=K,K}return{has:function(Z){return Q(Z)!==null},init:function(){Q("EXT_color_buffer_float"),Q("WEBGL_clip_cull_distance"),Q("OES_texture_float_linear"),Q("EXT_color_buffer_half_float"),Q("WEBGL_multisampled_render_to_texture"),Q("WEBGL_render_shared_exponent")},get:function(Z){let K=Q(Z);if(K===null)J6("WebGLRenderer: "+Z+" extension not supported.");return K}}}function FD(J,$,Q,Z){let K={},U=new WeakMap;function H(q){let X=q.target;if(X.index!==null)$.remove(X.index);for(let R in X.attributes)$.remove(X.attributes[R]);X.removeEventListener("dispose",H),delete K[X.id];let F=U.get(X);if(F)$.remove(F),U.delete(X);if(Z.releaseStatesOfGeometry(X),X.isInstancedBufferGeometry===!0)delete X._maxInstanceCount;Q.memory.geometries--}function Y(q,X){if(K[X.id]===!0)return X;return X.addEventListener("dispose",H),K[X.id]=!0,Q.memory.geometries++,X}function W(q){let X=q.attributes;for(let F in X)$.update(X[F],J.ARRAY_BUFFER)}function G(q){let X=[],F=q.index,R=q.attributes.position,M=0;if(R===void 0)return;if(F!==null){let I=F.array;M=F.version;for(let C=0,O=I.length;C<O;C+=3){let B=I[C+0],_=I[C+1],A=I[C+2];X.push(B,_,_,A,A,B)}}else{let I=R.array;M=R.version;for(let C=0,O=I.length/3-1;C<O;C+=3){let B=C+0,_=C+1,A=C+2;X.push(B,_,_,A,A,B)}}let D=new(R.count>=65535?SZ:wZ)(X,1);D.version=M;let E=U.get(q);if(E)$.remove(E);U.set(q,D)}function N(q){let X=U.get(q);if(X){let F=q.index;if(F!==null){if(X.version<F.version)G(q)}}else G(q);return U.get(q)}return{get:Y,update:W,getWireframeAttribute:N}}function DD(J,$,Q){let Z;function K(q){Z=q}let U,H;function Y(q){U=q.type,H=q.bytesPerElement}function W(q,X){J.drawElements(Z,X,U,q*H),Q.update(X,Z,1)}function G(q,X,F){if(F===0)return;J.drawElementsInstanced(Z,X,U,q*H,F),Q.update(X,Z,F)}function N(q,X,F){if(F===0)return;$.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,X,0,U,q,0,F);let M=0;for(let D=0;D<F;D++)M+=X[D];Q.update(M,Z,1)}this.setMode=K,this.setIndex=Y,this.render=W,this.renderInstances=G,this.renderMultiDraw=N}function ED(J){let $={geometries:0,textures:0},Q={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(U,H,Y){switch(Q.calls++,H){case J.TRIANGLES:Q.triangles+=Y*(U/3);break;case J.LINES:Q.lines+=Y*(U/2);break;case J.LINE_STRIP:Q.lines+=Y*(U-1);break;case J.LINE_LOOP:Q.lines+=Y*U;break;case J.POINTS:Q.points+=Y*U;break;default:N9("WebGLInfo: Unknown draw mode:",H);break}}function K(){Q.calls=0,Q.triangles=0,Q.points=0,Q.lines=0}return{memory:$,render:Q,programs:null,autoReset:!0,reset:K,update:Z}}function OD(J,$,Q){let Z=new WeakMap,K=new N7;function U(H,Y,W){let G=H.morphTargetInfluences,N=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,q=N!==void 0?N.length:0,X=Z.get(Y);if(X===void 0||X.count!==q){let z=function(){A.dispose(),Z.delete(Y),Y.removeEventListener("dispose",z)};if(X!==void 0)X.texture.dispose();let F=Y.morphAttributes.position!==void 0,R=Y.morphAttributes.normal!==void 0,M=Y.morphAttributes.color!==void 0,D=Y.morphAttributes.position||[],E=Y.morphAttributes.normal||[],I=Y.morphAttributes.color||[],C=0;if(F===!0)C=1;if(R===!0)C=2;if(M===!0)C=3;let O=Y.attributes.position.count*C,B=1;if(O>$.maxTextureSize)B=Math.ceil(O/$.maxTextureSize),O=$.maxTextureSize;let _=new Float32Array(O*B*4*q),A=new CZ(_,O,B,q);A.type=FJ,A.needsUpdate=!0;let V=C*4;for(let y=0;y<q;y++){let k=D[y],f=E[y],s=I[y],j=O*B*4*y;for(let p=0;p<k.count;p++){let e=p*V;if(F===!0)K.fromBufferAttribute(k,p),_[j+e+0]=K.x,_[j+e+1]=K.y,_[j+e+2]=K.z,_[j+e+3]=0;if(R===!0)K.fromBufferAttribute(f,p),_[j+e+4]=K.x,_[j+e+5]=K.y,_[j+e+6]=K.z,_[j+e+7]=0;if(M===!0)K.fromBufferAttribute(s,p),_[j+e+8]=K.x,_[j+e+9]=K.y,_[j+e+10]=K.z,_[j+e+11]=s.itemSize===4?K.w:1}}X={count:q,texture:A,size:new q0(O,B)},Z.set(Y,X),Y.addEventListener("dispose",z)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)W.getUniforms().setValue(J,"morphTexture",H.morphTexture,Q);else{let F=0;for(let M=0;M<G.length;M++)F+=G[M];let R=Y.morphTargetsRelative?1:1-F;W.getUniforms().setValue(J,"morphTargetBaseInfluence",R),W.getUniforms().setValue(J,"morphTargetInfluences",G)}W.getUniforms().setValue(J,"morphTargetsTexture",X.texture,Q),W.getUniforms().setValue(J,"morphTargetsTextureSize",X.size)}return{update:U}}function RD(J,$,Q,Z,K){let U=new WeakMap;function H(G){let N=K.render.frame,q=G.geometry,X=$.get(G,q);if(U.get(X)!==N)$.update(X),U.set(X,N);if(G.isInstancedMesh){if(G.hasEventListener("dispose",W)===!1)G.addEventListener("dispose",W);if(U.get(G)!==N){if(Q.update(G.instanceMatrix,J.ARRAY_BUFFER),G.instanceColor!==null)Q.update(G.instanceColor,J.ARRAY_BUFFER);U.set(G,N)}}if(G.isSkinnedMesh){let F=G.skeleton;if(U.get(F)!==N)F.update(),U.set(F,N)}return X}function Y(){U=new WeakMap}function W(G){let N=G.target;if(N.removeEventListener("dispose",W),Z.releaseStatesOfObject(N),Q.remove(N.instanceMatrix),N.instanceColor!==null)Q.remove(N.instanceColor)}return{update:H,dispose:Y}}var MD={[g$]:"LINEAR_TONE_MAPPING",[p$]:"REINHARD_TONE_MAPPING",[u$]:"CINEON_TONE_MAPPING",[k8]:"ACES_FILMIC_TONE_MAPPING",[d$]:"AGX_TONE_MAPPING",[l$]:"NEUTRAL_TONE_MAPPING",[m$]:"CUSTOM_TONE_MAPPING"};function VD(J,$,Q,Z,K,U){let H=new F7($,Q,{type:J,depthBuffer:K,stencilBuffer:U,samples:Z?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),Y=null,W=null,G=new V9;G.setAttribute("position",new Y9([-1,3,0,-1,-1,0,3,-1,0],3)),G.setAttribute("uv",new Y9([0,2,0,0,2,0],2));let N=new UQ({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),q=new h(G,N),X=new VJ(-1,1,1,-1,0,1),F=null,R=null,M=!1,D,E=null,I=[],C=!1;this.setSize=function(O,B){if(H.setSize(O,B),Y!==null)Y.setSize(O,B);if(W!==null)W.setSize(O,B);for(let _=0;_<I.length;_++){let A=I[_];if(A.setSize)A.setSize(O,B)}},this.setEffects=function(O){I=O,C=I.length>0&&I[0].isRenderPass===!0;let{width:B,height:_}=H;if(I.length>0&&Y===null)Y=new F7(B,_,{type:P7,depthBuffer:!1,stencilBuffer:!1}),W=new F7(B,_,{type:P7,depthBuffer:!1,stencilBuffer:!1});for(let A=0;A<I.length;A++){let V=I[A];if(V.setSize)V.setSize(B,_)}},this.begin=function(O,B){if(M)return!1;if(O.toneMapping===S8&&I.length===0)return!1;if(E=B,B!==null){let{width:_,height:A}=B;if(H.width!==_||H.height!==A)this.setSize(_,A)}if(C===!1)O.setRenderTarget(H);return D=O.toneMapping,O.toneMapping=S8,!0},this.hasRenderPass=function(){return C},this.end=function(O,B){O.toneMapping=D,M=!0;let _=H,A=Y;for(let V=0;V<I.length;V++){let z=I[V];if(z.enabled===!1)continue;if(z.render(O,A,_,B),z.needsSwap!==!1)_=A,A=A===Y?W:Y}if(F!==O.outputColorSpace||R!==O.toneMapping){if(F=O.outputColorSpace,R=O.toneMapping,N.defines={},A9.getTransfer(F)===r9)N.defines.SRGB_TRANSFER="";let V=MD[R];if(V)N.defines[V]="";N.needsUpdate=!0}N.uniforms.tDiffuse.value=_.texture,O.setRenderTarget(E),O.render(q,X),E=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){if(H.dispose(),Y!==null)Y.dispose();if(W!==null)W.dispose();G.dispose(),N.dispose()}}var TW=new y7,OH=new RJ(1,1),wW=new CZ,SW=new xU,kW=new kZ,GW=[],NW=[],XW=new Float32Array(16),qW=new Float32Array(9),FW=new Float32Array(4);function H$(J,$,Q){let Z=J[0];if(Z<=0||Z>0)return J;let K=$*Q,U=GW[K];if(U===void 0)U=new Float32Array(K),GW[K]=U;if($!==0){Z.toArray(U,0);for(let H=1,Y=0;H!==$;++H)Y+=Q,J[H].toArray(U,Y)}return U}function T7(J,$){if(J.length!==$.length)return!1;for(let Q=0,Z=J.length;Q<Z;Q++)if(J[Q]!==$[Q])return!1;return!0}function w7(J,$){for(let Q=0,Z=$.length;Q<Z;Q++)J[Q]=$[Q]}function cZ(J,$){let Q=NW[$];if(Q===void 0)Q=new Int32Array($),NW[$]=Q;for(let Z=0;Z!==$;++Z)Q[Z]=J.allocateTextureUnit();return Q}function _D(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1f(this.addr,$),Q[0]=$}function BD(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2f(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(T7(Q,$))return;J.uniform2fv(this.addr,$),w7(Q,$)}}function ID(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3f(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else if($.r!==void 0){if(Q[0]!==$.r||Q[1]!==$.g||Q[2]!==$.b)J.uniform3f(this.addr,$.r,$.g,$.b),Q[0]=$.r,Q[1]=$.g,Q[2]=$.b}else{if(T7(Q,$))return;J.uniform3fv(this.addr,$),w7(Q,$)}}function zD(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4f(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(T7(Q,$))return;J.uniform4fv(this.addr,$),w7(Q,$)}}function AD(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(T7(Q,$))return;J.uniformMatrix2fv(this.addr,!1,$),w7(Q,$)}else{if(T7(Q,Z))return;FW.set(Z),J.uniformMatrix2fv(this.addr,!1,FW),w7(Q,Z)}}function LD(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(T7(Q,$))return;J.uniformMatrix3fv(this.addr,!1,$),w7(Q,$)}else{if(T7(Q,Z))return;qW.set(Z),J.uniformMatrix3fv(this.addr,!1,qW),w7(Q,Z)}}function PD(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(T7(Q,$))return;J.uniformMatrix4fv(this.addr,!1,$),w7(Q,$)}else{if(T7(Q,Z))return;XW.set(Z),J.uniformMatrix4fv(this.addr,!1,XW),w7(Q,Z)}}function CD(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1i(this.addr,$),Q[0]=$}function TD(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2i(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(T7(Q,$))return;J.uniform2iv(this.addr,$),w7(Q,$)}}function wD(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3i(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(T7(Q,$))return;J.uniform3iv(this.addr,$),w7(Q,$)}}function SD(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4i(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(T7(Q,$))return;J.uniform4iv(this.addr,$),w7(Q,$)}}function kD(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1ui(this.addr,$),Q[0]=$}function jD(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2ui(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(T7(Q,$))return;J.uniform2uiv(this.addr,$),w7(Q,$)}}function vD(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3ui(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(T7(Q,$))return;J.uniform3uiv(this.addr,$),w7(Q,$)}}function fD(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4ui(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(T7(Q,$))return;J.uniform4uiv(this.addr,$),w7(Q,$)}}function yD(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;let U;if(this.type===J.SAMPLER_2D_SHADOW)OH.compareFunction=Q.isReversedDepthBuffer()?PZ:LZ,U=OH;else U=TW;Q.setTexture2D($||U,K)}function bD(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTexture3D($||SW,K)}function xD(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTextureCube($||kW,K)}function hD(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTexture2DArray($||wW,K)}function gD(J){switch(J){case 5126:return _D;case 35664:return BD;case 35665:return ID;case 35666:return zD;case 35674:return AD;case 35675:return LD;case 35676:return PD;case 5124:case 35670:return CD;case 35667:case 35671:return TD;case 35668:case 35672:return wD;case 35669:case 35673:return SD;case 5125:return kD;case 36294:return jD;case 36295:return vD;case 36296:return fD;case 35678:case 36198:case 36298:case 36306:case 35682:return yD;case 35679:case 36299:case 36307:return bD;case 35680:case 36300:case 36308:case 36293:return xD;case 36289:case 36303:case 36311:case 36292:return hD}}function pD(J,$){J.uniform1fv(this.addr,$)}function uD(J,$){let Q=H$($,this.size,2);J.uniform2fv(this.addr,Q)}function mD(J,$){let Q=H$($,this.size,3);J.uniform3fv(this.addr,Q)}function dD(J,$){let Q=H$($,this.size,4);J.uniform4fv(this.addr,Q)}function lD(J,$){let Q=H$($,this.size,4);J.uniformMatrix2fv(this.addr,!1,Q)}function cD(J,$){let Q=H$($,this.size,9);J.uniformMatrix3fv(this.addr,!1,Q)}function nD(J,$){let Q=H$($,this.size,16);J.uniformMatrix4fv(this.addr,!1,Q)}function iD(J,$){J.uniform1iv(this.addr,$)}function sD(J,$){J.uniform2iv(this.addr,$)}function oD(J,$){J.uniform3iv(this.addr,$)}function aD(J,$){J.uniform4iv(this.addr,$)}function rD(J,$){J.uniform1uiv(this.addr,$)}function tD(J,$){J.uniform2uiv(this.addr,$)}function eD(J,$){J.uniform3uiv(this.addr,$)}function J1(J,$){J.uniform4uiv(this.addr,$)}function $1(J,$,Q){let Z=this.cache,K=$.length,U=cZ(Q,K);if(!T7(Z,U))J.uniform1iv(this.addr,U),w7(Z,U);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=OH;else H=TW;for(let Y=0;Y!==K;++Y)Q.setTexture2D($[Y]||H,U[Y])}function Q1(J,$,Q){let Z=this.cache,K=$.length,U=cZ(Q,K);if(!T7(Z,U))J.uniform1iv(this.addr,U),w7(Z,U);for(let H=0;H!==K;++H)Q.setTexture3D($[H]||SW,U[H])}function Z1(J,$,Q){let Z=this.cache,K=$.length,U=cZ(Q,K);if(!T7(Z,U))J.uniform1iv(this.addr,U),w7(Z,U);for(let H=0;H!==K;++H)Q.setTextureCube($[H]||kW,U[H])}function K1(J,$,Q){let Z=this.cache,K=$.length,U=cZ(Q,K);if(!T7(Z,U))J.uniform1iv(this.addr,U),w7(Z,U);for(let H=0;H!==K;++H)Q.setTexture2DArray($[H]||wW,U[H])}function U1(J){switch(J){case 5126:return pD;case 35664:return uD;case 35665:return mD;case 35666:return dD;case 35674:return lD;case 35675:return cD;case 35676:return nD;case 5124:case 35670:return iD;case 35667:case 35671:return sD;case 35668:case 35672:return oD;case 35669:case 35673:return aD;case 5125:return rD;case 36294:return tD;case 36295:return eD;case 36296:return J1;case 35678:case 36198:case 36298:case 36306:case 35682:return $1;case 35679:case 36299:case 36307:return Q1;case 35680:case 36300:case 36308:case 36293:return Z1;case 36289:case 36303:case 36311:case 36292:return K1}}class jW{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.setValue=gD($.type)}}class vW{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.size=$.size,this.setValue=U1($.type)}}class fW{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,$,Q){let Z=this.seq;for(let K=0,U=Z.length;K!==U;++K){let H=Z[K];H.setValue(J,$[H.id],Q)}}}var FH=/(\w+)(\])?(\[|\.)?/g;function DW(J,$){J.seq.push($),J.map[$.id]=$}function H1(J,$,Q){let Z=J.name,K=Z.length;FH.lastIndex=0;while(!0){let U=FH.exec(Z),H=FH.lastIndex,Y=U[1],W=U[2]==="]",G=U[3];if(W)Y=Y|0;if(G===void 0||G==="["&&H+2===K){DW(Q,G===void 0?new jW(Y,J,$):new vW(Y,J,$));break}else{let q=Q.map[Y];if(q===void 0)q=new fW(Y),DW(Q,q);Q=q}}}class XQ{constructor(J,$){this.seq=[],this.map={};let Q=J.getProgramParameter($,J.ACTIVE_UNIFORMS);for(let U=0;U<Q;++U){let H=J.getActiveUniform($,U),Y=J.getUniformLocation($,H.name);H1(H,Y,this)}let Z=[],K=[];for(let U of this.seq)if(U.type===J.SAMPLER_2D_SHADOW||U.type===J.SAMPLER_CUBE_SHADOW||U.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(U);else K.push(U);if(Z.length>0)this.seq=Z.concat(K)}setValue(J,$,Q,Z){let K=this.map[$];if(K!==void 0)K.setValue(J,Q,Z)}setOptional(J,$,Q){let Z=$[Q];if(Z!==void 0)this.setValue(J,Q,Z)}static upload(J,$,Q,Z){for(let K=0,U=$.length;K!==U;++K){let H=$[K],Y=Q[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,Z)}}static seqWithValue(J,$){let Q=[];for(let Z=0,K=J.length;Z!==K;++Z){let U=J[Z];if(U.id in $)Q.push(U)}return Q}}function EW(J,$,Q){let Z=J.createShader($);return J.shaderSource(Z,Q),J.compileShader(Z),Z}var Y1=37297,W1=0;function G1(J,$){let Q=J.split(`
`),Z=[],K=Math.max($-6,0),U=Math.min($+6,Q.length);for(let H=K;H<U;H++){let Y=H+1;Z.push(`${Y===$?">":" "} ${Y}: ${Q[H]}`)}return Z.join(`
`)}var OW=new D9;function N1(J){A9._getMatrix(OW,A9.workingColorSpace,J);let $=`mat3( ${OW.elements.map((Q)=>Q.toFixed(4))} )`;switch(A9.getTransfer(J)){case SU:return[$,"LinearTransferOETF"];case r9:return[$,"sRGBTransferOETF"];default:return H9("WebGLProgram: Unsupported color space: ",J),[$,"LinearTransferOETF"]}}function RW(J,$,Q){let Z=J.getShaderParameter($,J.COMPILE_STATUS),U=(J.getShaderInfoLog($)||"").trim();if(Z&&U==="")return"";let H=/ERROR: 0:(\d+)/.exec(U);if(H){let Y=parseInt(H[1]);return Q.toUpperCase()+`

`+U+`

`+G1(J.getShaderSource($),Y)}else return U}function X1(J,$){let Q=N1($);return[`vec4 ${J}( vec4 value ) {`,`	return ${Q[1]}( vec4( value.rgb * ${Q[0]}, value.a ) );`,"}"].join(`
`)}var q1={[g$]:"Linear",[p$]:"Reinhard",[u$]:"Cineon",[k8]:"ACESFilmic",[d$]:"AgX",[l$]:"Neutral",[m$]:"Custom"};function F1(J,$){let Q=q1[$];if(Q===void 0)return H9("WebGLProgram: Unsupported toneMapping:",$),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+Q+"ToneMapping( color ); }"}var dZ=new v;function D1(){A9.getLuminanceCoefficients(dZ);let J=dZ.x.toFixed(4),$=dZ.y.toFixed(4),Q=dZ.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${$}, ${Q} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function E1(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(NQ).join(`
`)}function O1(J){let $=[];for(let Q in J){let Z=J[Q];if(Z===!1)continue;$.push("#define "+Q+" "+Z)}return $.join(`
`)}function R1(J,$){let Q={},Z=J.getProgramParameter($,J.ACTIVE_ATTRIBUTES);for(let K=0;K<Z;K++){let U=J.getActiveAttrib($,K),H=U.name,Y=1;if(U.type===J.FLOAT_MAT2)Y=2;if(U.type===J.FLOAT_MAT3)Y=3;if(U.type===J.FLOAT_MAT4)Y=4;Q[H]={type:U.type,location:J.getAttribLocation($,H),locationSize:Y}}return Q}function NQ(J){return J!==""}function MW(J,$){let Q=$.numSpotLightShadows+$.numSpotLightMaps-$.numSpotLightShadowsWithMaps;return J.replace(/NUM_SUN_LIGHTS/g,$.numSunLights).replace(/NUM_DIR_LIGHTS/g,$.numDirLights).replace(/NUM_SPOT_LIGHTS/g,$.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,$.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Q).replace(/NUM_RECT_AREA_LIGHTS/g,$.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,$.numPointLights).replace(/NUM_HEMI_LIGHTS/g,$.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,$.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,$.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,$.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,$.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,$.numPointLightShadows)}function VW(J,$){return J.replace(/NUM_CLIPPING_PLANES/g,$.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,$.numClippingPlanes-$.numClipIntersection)}var M1=/^[ \t]*#include +<([\w\d./]+)>/gm;function RH(J){return J.replace(M1,_1)}var V1=new Map;function _1(J,$){let Q=B9[$];if(Q===void 0){let Z=V1.get($);if(Z!==void 0)Q=B9[Z],H9('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',$,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+$+">")}return RH(Q)}var B1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _W(J){return J.replace(B1,I1)}function I1(J,$,Q,Z){let K="";for(let U=parseInt($);U<parseInt(Q);U++)K+=Z.replace(/\[\s*i\s*\]/g,"[ "+U+" ]").replace(/UNROLLED_LOOP_INDEX/g,U);return K}function BW(J){let $=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")$+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")$+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")$+=`
#define LOW_PRECISION`;return $}var z1={[x$]:"SHADOWMAP_TYPE_PCF",[i6]:"SHADOWMAP_TYPE_VSM"};function A1(J){return z1[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var L1={[a6]:"ENVMAP_TYPE_CUBE",[Z6]:"ENVMAP_TYPE_CUBE",[c$]:"ENVMAP_TYPE_CUBE_UV"};function P1(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return L1[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var C1={[Z6]:"ENVMAP_MODE_REFRACTION"};function T1(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return C1[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var w1={[z5]:"ENVMAP_BLENDING_MULTIPLY",[A5]:"ENVMAP_BLENDING_MIX",[L5]:"ENVMAP_BLENDING_ADD"};function S1(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return w1[J.combine]||"ENVMAP_BLENDING_NONE"}function k1(J){let $=J.envMapCubeUVHeight;if($===null)return null;let Q=Math.log2($)-2,Z=1/$;return{texelWidth:1/(3*Math.max(Math.pow(2,Q),112)),texelHeight:Z,maxMip:Q}}function j1(J,$,Q,Z){let K=J.getContext(),U=Q.defines,H=Q.vertexShader,Y=Q.fragmentShader,W=A1(Q),G=P1(Q),N=T1(Q),q=S1(Q),X=k1(Q),F=E1(Q),R=O1(U),M=K.createProgram(),D,E,I=Q.glslVersion?"#version "+Q.glslVersion+`
`:"";if(Q.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,R].filter(NQ).join(`
`),D.length>0)D+=`
`;if(E=["#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,R].filter(NQ).join(`
`),E.length>0)E+=`
`}else D=[BW(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,R,Q.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Q.batching?"#define USE_BATCHING":"",Q.batchingColor?"#define USE_BATCHING_COLOR":"",Q.instancing?"#define USE_INSTANCING":"",Q.instancingColor?"#define USE_INSTANCING_COLOR":"",Q.instancingMorph?"#define USE_INSTANCING_MORPH":"",Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.map?"#define USE_MAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+N:"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.displacementMap?"#define USE_DISPLACEMENTMAP":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.mapUv?"#define MAP_UV "+Q.mapUv:"",Q.alphaMapUv?"#define ALPHAMAP_UV "+Q.alphaMapUv:"",Q.lightMapUv?"#define LIGHTMAP_UV "+Q.lightMapUv:"",Q.aoMapUv?"#define AOMAP_UV "+Q.aoMapUv:"",Q.emissiveMapUv?"#define EMISSIVEMAP_UV "+Q.emissiveMapUv:"",Q.bumpMapUv?"#define BUMPMAP_UV "+Q.bumpMapUv:"",Q.normalMapUv?"#define NORMALMAP_UV "+Q.normalMapUv:"",Q.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Q.displacementMapUv:"",Q.metalnessMapUv?"#define METALNESSMAP_UV "+Q.metalnessMapUv:"",Q.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Q.roughnessMapUv:"",Q.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Q.anisotropyMapUv:"",Q.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Q.clearcoatMapUv:"",Q.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Q.clearcoatNormalMapUv:"",Q.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Q.clearcoatRoughnessMapUv:"",Q.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Q.iridescenceMapUv:"",Q.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Q.iridescenceThicknessMapUv:"",Q.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Q.sheenColorMapUv:"",Q.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Q.sheenRoughnessMapUv:"",Q.specularMapUv?"#define SPECULARMAP_UV "+Q.specularMapUv:"",Q.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Q.specularColorMapUv:"",Q.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Q.specularIntensityMapUv:"",Q.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Q.transmissionMapUv:"",Q.thicknessMapUv?"#define THICKNESSMAP_UV "+Q.thicknessMapUv:"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexNormals?"#define HAS_NORMAL":"",Q.vertexColors?"#define USE_COLOR":"",Q.vertexAlphas?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.flatShading?"#define FLAT_SHADED":"",Q.skinning?"#define USE_SKINNING":"",Q.morphTargets?"#define USE_MORPHTARGETS":"",Q.morphNormals&&Q.flatShading===!1?"#define USE_MORPHNORMALS":"",Q.morphColors?"#define USE_MORPHCOLORS":"",Q.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+Q.morphTextureStride:"",Q.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+Q.morphTargetsCount:"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+W:"",Q.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",Q.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(NQ).join(`
`),E=[BW(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,R,Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",Q.map?"#define USE_MAP":"",Q.matcap?"#define USE_MATCAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+G:"",Q.envMap?"#define "+N:"",Q.envMap?"#define "+q:"",X?"#define CUBEUV_TEXEL_WIDTH "+X.texelWidth:"",X?"#define CUBEUV_TEXEL_HEIGHT "+X.texelHeight:"",X?"#define CUBEUV_MAX_MIP "+X.maxMip+".0":"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoat?"#define USE_CLEARCOAT":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.dispersion?"#define USE_DISPERSION":"",Q.retroreflection?"#define USE_RETROREFLECTION":"",Q.iridescence?"#define USE_IRIDESCENCE":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaTest?"#define USE_ALPHATEST":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.sheen?"#define USE_SHEEN":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexColors||Q.instancingColor?"#define USE_COLOR":"",Q.vertexAlphas||Q.batchingColor?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.gradientMap?"#define USE_GRADIENTMAP":"",Q.flatShading?"#define FLAT_SHADED":"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+W:"",Q.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",Q.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Q.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",Q.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",Q.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Q.toneMapping!==S8?"#define TONE_MAPPING":"",Q.toneMapping!==S8?B9.tonemapping_pars_fragment:"",Q.toneMapping!==S8?F1("toneMapping",Q.toneMapping):"",Q.dithering?"#define DITHERING":"",Q.opaque?"#define OPAQUE":"",B9.colorspace_pars_fragment,X1("linearToOutputTexel",Q.outputColorSpace),D1(),Q.useDepthPacking?"#define DEPTH_PACKING "+Q.depthPacking:"",`
`].filter(NQ).join(`
`);if(H=RH(H),H=MW(H,Q),H=VW(H,Q),Y=RH(Y),Y=MW(Y,Q),Y=VW(Y,Q),H=_W(H),Y=_W(Y),Q.isRawShaderMaterial!==!0)I=`#version 300 es
`,D=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,E=["#define varying in",Q.glslVersion===kU?"":"layout(location = 0) out highp vec4 pc_fragColor;",Q.glslVersion===kU?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E;let C=I+D+H,O=I+E+Y,B=EW(K,K.VERTEX_SHADER,C),_=EW(K,K.FRAGMENT_SHADER,O);if(K.attachShader(M,B),K.attachShader(M,_),Q.index0AttributeName!==void 0)K.bindAttribLocation(M,0,Q.index0AttributeName);else if(Q.hasPositionAttribute===!0)K.bindAttribLocation(M,0,"position");K.linkProgram(M);function A(k){if(J.debug.checkShaderErrors){let f=K.getProgramInfoLog(M)||"",s=K.getShaderInfoLog(B)||"",j=K.getShaderInfoLog(_)||"",p=f.trim(),e=s.trim(),n=j.trim(),r=!0,u=!0;if(K.getProgramParameter(M,K.LINK_STATUS)===!1)if(r=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,M,B,_);else{let x=RW(K,B,"vertex"),K0=RW(K,_,"fragment");N9("WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(M,K.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+p+`
`+x+`
`+K0)}else if(p!=="")H9("WebGLProgram: Program Info Log:",p);else if(e===""||n==="")u=!1;if(u)k.diagnostics={runnable:r,programLog:p,vertexShader:{log:e,prefix:D},fragmentShader:{log:n,prefix:E}}}K.deleteShader(B),K.deleteShader(_),V=new XQ(K,M),z=R1(K,M)}let V;this.getUniforms=function(){if(V===void 0)A(this);return V};let z;this.getAttributes=function(){if(z===void 0)A(this);return z};let y=Q.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(y===!1)y=K.getProgramParameter(M,Y1);return y},this.destroy=function(){Z.releaseStatesOfProgram(this),K.deleteProgram(M),this.program=void 0},this.type=Q.shaderType,this.name=Q.shaderName,this.id=W1++,this.cacheKey=$,this.usedTimes=1,this.program=M,this.vertexShader=B,this.fragmentShader=_,this}var v1=0;class yW{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,$,Q){let Z=this._getShaderCacheForMaterial(J);if(Z.has($)===!1)Z.add($),$.usedTimes++;if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;return this}remove(J){let $=this.materialCache.get(J);for(let Q of $)if(Q.usedTimes--,Q.usedTimes===0)this.shaderCache.delete(Q.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let $=this.materialCache,Q=$.get(J);if(Q===void 0)Q=new Set,$.set(J,Q);return Q}_getShaderStage(J){let $=this.shaderCache,Q=$.get(J);if(Q===void 0)Q=new bW(J),$.set(J,Q);return Q}}class bW{constructor(J){this.id=v1++,this.code=J,this.usedTimes=0}}function f1(J){return J===Y6||J===zZ||J===AZ}function y1(J,$,Q,Z,K,U){let H=new TZ,Y=new yW,W=new Set,G=[],N=new Map,q=Z.logarithmicDepthBuffer,X=Z.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(V){if(W.add(V),V===0)return"uv";return`uv${V}`}function M(V,z,y,k,f,s){let j=k.fog,p=f.geometry,e=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?k.environment:null,n=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,r=$.get(V.envMap||e,n),u=!!r&&r.mapping===c$?r.image.height:null,x=F[V.type];if(V.precision!==null){if(X=Z.getMaxPrecision(V.precision),X!==V.precision)H9("WebGLProgram.getParameters:",V.precision,"not supported, using",X,"instead.")}let K0=p.morphAttributes.position||p.morphAttributes.normal||p.morphAttributes.color,R0=K0!==void 0?K0.length:0,T0=0;if(p.morphAttributes.position!==void 0)T0=1;if(p.morphAttributes.normal!==void 0)T0=2;if(p.morphAttributes.color!==void 0)T0=3;let l,F0,i,N0;if(x){let K7=e8[x];l=K7.vertexShader,F0=K7.fragmentShader}else{l=V.vertexShader,F0=V.fragmentShader;let K7=Y.getVertexShaderStage(V),n9=Y.getFragmentShaderStage(V);Y.update(V,K7,n9),i=K7.id,N0=n9.id}let G0=J.getRenderTarget(),c=J.state.buffers.depth.getReversed(),P0=f.isInstancedMesh===!0,J0=f.isBatchedMesh===!0,m0=!!V.map,Z0=!!V.matcap,O0=!!r,_0=!!V.aoMap,z0=!!V.lightMap,S0=!!V.bumpMap&&V.wireframe===!1,J9=!!V.normalMap,K9=!!V.displacementMap,E9=!!V.emissiveMap,O9=!!V.metalnessMap,b=!!V.roughnessMap,t9=V.anisotropy>0,z9=V.clearcoat>0,C9=V.dispersion>0,S=V.retroreflectivity>0,P=V.iridescence>0,g=V.sheen>0,$0=V.transmission>0,M0=t9&&!!V.anisotropyMap,A0=z9&&!!V.clearcoatMap,k0=z9&&!!V.clearcoatNormalMap,W0=z9&&!!V.clearcoatRoughnessMap,E0=P&&!!V.iridescenceMap,u0=P&&!!V.iridescenceThicknessMap,$9=g&&!!V.sheenColorMap,f0=g&&!!V.sheenRoughnessMap,L0=!!V.specularMap,U9=!!V.specularColorMap,G9=!!V.specularIntensityMap,m9=$0&&!!V.transmissionMap,d=$0&&!!V.thicknessMap,j0=!!V.gradientMap,X0=!!V.alphaMap,v0=V.alphaTest>0,d0=!!V.alphaHash,V0=!!V.extensions,x0=S8;if(V.toneMapped){if(G0===null||G0.isXRRenderTarget===!0)x0=J.toneMapping}let R9={shaderID:x,shaderType:V.type,shaderName:V.name,vertexShader:l,fragmentShader:F0,defines:V.defines,customVertexShaderID:i,customFragmentShaderID:N0,isRawShaderMaterial:V.isRawShaderMaterial===!0,glslVersion:V.glslVersion,precision:X,batching:J0,batchingColor:J0&&f._colorsTexture!==null,instancing:P0,instancingColor:P0&&f.instanceColor!==null,instancingMorph:P0&&f.morphTexture!==null,outputColorSpace:G0===null?J.outputColorSpace:G0.isXRRenderTarget===!0?G0.texture.colorSpace:A9.workingColorSpace,alphaToCoverage:!!V.alphaToCoverage,map:m0,matcap:Z0,envMap:O0,envMapMode:O0&&r.mapping,envMapCubeUVHeight:u,aoMap:_0,lightMap:z0,bumpMap:S0,normalMap:J9,displacementMap:K9,emissiveMap:E9,normalMapObjectSpace:J9&&V.normalMapType===y5,normalMapTangentSpace:J9&&V.normalMapType===TU,packedNormalMap:J9&&V.normalMapType===TU&&f1(V.normalMap.format),metalnessMap:O9,roughnessMap:b,anisotropy:t9,anisotropyMap:M0,clearcoat:z9,clearcoatMap:A0,clearcoatNormalMap:k0,clearcoatRoughnessMap:W0,dispersion:C9,retroreflection:S,iridescence:P,iridescenceMap:E0,iridescenceThicknessMap:u0,sheen:g,sheenColorMap:$9,sheenRoughnessMap:f0,specularMap:L0,specularColorMap:U9,specularIntensityMap:G9,transmission:$0,transmissionMap:m9,thicknessMap:d,gradientMap:j0,opaque:V.transparent===!1&&V.blending===h$&&V.alphaToCoverage===!1,alphaMap:X0,alphaTest:v0,alphaHash:d0,combine:V.combine,mapUv:m0&&R(V.map.channel),aoMapUv:_0&&R(V.aoMap.channel),lightMapUv:z0&&R(V.lightMap.channel),bumpMapUv:S0&&R(V.bumpMap.channel),normalMapUv:J9&&R(V.normalMap.channel),displacementMapUv:K9&&R(V.displacementMap.channel),emissiveMapUv:E9&&R(V.emissiveMap.channel),metalnessMapUv:O9&&R(V.metalnessMap.channel),roughnessMapUv:b&&R(V.roughnessMap.channel),anisotropyMapUv:M0&&R(V.anisotropyMap.channel),clearcoatMapUv:A0&&R(V.clearcoatMap.channel),clearcoatNormalMapUv:k0&&R(V.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W0&&R(V.clearcoatRoughnessMap.channel),iridescenceMapUv:E0&&R(V.iridescenceMap.channel),iridescenceThicknessMapUv:u0&&R(V.iridescenceThicknessMap.channel),sheenColorMapUv:$9&&R(V.sheenColorMap.channel),sheenRoughnessMapUv:f0&&R(V.sheenRoughnessMap.channel),specularMapUv:L0&&R(V.specularMap.channel),specularColorMapUv:U9&&R(V.specularColorMap.channel),specularIntensityMapUv:G9&&R(V.specularIntensityMap.channel),transmissionMapUv:m9&&R(V.transmissionMap.channel),thicknessMapUv:d&&R(V.thicknessMap.channel),alphaMapUv:X0&&R(V.alphaMap.channel),vertexTangents:!!p.attributes.tangent&&(J9||t9),vertexNormals:!!p.attributes.normal,vertexColors:V.vertexColors,vertexAlphas:V.vertexColors===!0&&!!p.attributes.color&&p.attributes.color.itemSize===4,pointsUvs:f.isPoints===!0&&!!p.attributes.uv&&(m0||X0),fog:!!j,useFog:V.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:V.wireframe===!1&&(V.flatShading===!0||p.attributes.normal===void 0&&J9===!1&&(V.isMeshLambertMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isMeshPhysicalMaterial)),sizeAttenuation:V.sizeAttenuation===!0,logarithmicDepthBuffer:q,reversedDepthBuffer:c,skinning:f.isSkinnedMesh===!0,hasPositionAttribute:p.attributes.position!==void 0,morphTargets:p.morphAttributes.position!==void 0,morphNormals:p.morphAttributes.normal!==void 0,morphColors:p.morphAttributes.color!==void 0,morphTargetsCount:R0,morphTextureStride:T0,numSunLights:z.sun.length,numDirLights:z.directional.length,numPointLights:z.point.length,numSpotLights:z.spot.length,numSpotLightMaps:z.spotLightMap.length,numRectAreaLights:z.rectArea.length,numHemiLights:z.hemi.length,numSunLightShadows:z.sunShadowMap.length,numDirLightShadows:z.directionalShadowMap.length,numPointLightShadows:z.pointShadowMap.length,numSpotLightShadows:z.spotShadowMap.length,numSpotLightShadowsWithMaps:z.numSpotLightShadowsWithMaps,numLightProbes:z.numLightProbes,numLightProbeGrids:s.length,numClippingPlanes:U.numPlanes,numClipIntersection:U.numIntersection,dithering:V.dithering,shadowMapEnabled:J.shadowMap.enabled&&y.length>0,shadowMapType:J.shadowMap.type,toneMapping:x0,decodeVideoTexture:m0&&V.map.isVideoTexture===!0&&A9.getTransfer(V.map.colorSpace)===r9,decodeVideoTextureEmissive:E9&&V.emissiveMap.isVideoTexture===!0&&A9.getTransfer(V.emissiveMap.colorSpace)===r9,premultipliedAlpha:V.premultipliedAlpha,doubleSided:V.side===d9,flipSided:V.side===L7,useDepthPacking:V.depthPacking>=0,depthPacking:V.depthPacking||0,index0AttributeName:V.index0AttributeName,extensionClipCullDistance:V0&&V.extensions.clipCullDistance===!0&&Q.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(V0&&V.extensions.multiDraw===!0||J0)&&Q.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:Q.has("KHR_parallel_shader_compile"),customProgramCacheKey:V.customProgramCacheKey()};return R9.vertexUv1s=W.has(1),R9.vertexUv2s=W.has(2),R9.vertexUv3s=W.has(3),W.clear(),R9}function D(V){let z=[];if(V.shaderID)z.push(V.shaderID);else z.push(V.customVertexShaderID),z.push(V.customFragmentShaderID);if(V.defines!==void 0)for(let y in V.defines)z.push(y),z.push(V.defines[y]);if(V.isRawShaderMaterial===!1)E(z,V),I(z,V),z.push(J.outputColorSpace);return z.push(V.customProgramCacheKey),z.join()}function E(V,z){V.push(z.precision),V.push(z.outputColorSpace),V.push(z.envMapMode),V.push(z.envMapCubeUVHeight),V.push(z.mapUv),V.push(z.alphaMapUv),V.push(z.lightMapUv),V.push(z.aoMapUv),V.push(z.bumpMapUv),V.push(z.normalMapUv),V.push(z.displacementMapUv),V.push(z.emissiveMapUv),V.push(z.metalnessMapUv),V.push(z.roughnessMapUv),V.push(z.anisotropyMapUv),V.push(z.clearcoatMapUv),V.push(z.clearcoatNormalMapUv),V.push(z.clearcoatRoughnessMapUv),V.push(z.iridescenceMapUv),V.push(z.iridescenceThicknessMapUv),V.push(z.sheenColorMapUv),V.push(z.sheenRoughnessMapUv),V.push(z.specularMapUv),V.push(z.specularColorMapUv),V.push(z.specularIntensityMapUv),V.push(z.transmissionMapUv),V.push(z.thicknessMapUv),V.push(z.combine),V.push(z.fogExp2),V.push(z.sizeAttenuation),V.push(z.morphTargetsCount),V.push(z.morphAttributeCount),V.push(z.numSunLights),V.push(z.numDirLights),V.push(z.numPointLights),V.push(z.numSpotLights),V.push(z.numSpotLightMaps),V.push(z.numHemiLights),V.push(z.numRectAreaLights),V.push(z.numSunLightShadows),V.push(z.numDirLightShadows),V.push(z.numPointLightShadows),V.push(z.numSpotLightShadows),V.push(z.numSpotLightShadowsWithMaps),V.push(z.numLightProbes),V.push(z.shadowMapType),V.push(z.toneMapping),V.push(z.numClippingPlanes),V.push(z.numClipIntersection),V.push(z.depthPacking)}function I(V,z){if(H.disableAll(),z.instancing)H.enable(0);if(z.instancingColor)H.enable(1);if(z.instancingMorph)H.enable(2);if(z.matcap)H.enable(3);if(z.envMap)H.enable(4);if(z.normalMapObjectSpace)H.enable(5);if(z.normalMapTangentSpace)H.enable(6);if(z.clearcoat)H.enable(7);if(z.iridescence)H.enable(8);if(z.alphaTest)H.enable(9);if(z.vertexColors)H.enable(10);if(z.vertexAlphas)H.enable(11);if(z.vertexUv1s)H.enable(12);if(z.vertexUv2s)H.enable(13);if(z.vertexUv3s)H.enable(14);if(z.vertexTangents)H.enable(15);if(z.anisotropy)H.enable(16);if(z.alphaHash)H.enable(17);if(z.batching)H.enable(18);if(z.dispersion)H.enable(19);if(z.retroreflection)H.enable(24);if(z.batchingColor)H.enable(20);if(z.gradientMap)H.enable(21);if(z.packedNormalMap)H.enable(22);if(z.vertexNormals)H.enable(23);if(V.push(H.mask),H.disableAll(),z.fog)H.enable(0);if(z.useFog)H.enable(1);if(z.flatShading)H.enable(2);if(z.logarithmicDepthBuffer)H.enable(3);if(z.reversedDepthBuffer)H.enable(4);if(z.skinning)H.enable(5);if(z.morphTargets)H.enable(6);if(z.morphNormals)H.enable(7);if(z.morphColors)H.enable(8);if(z.premultipliedAlpha)H.enable(9);if(z.shadowMapEnabled)H.enable(10);if(z.doubleSided)H.enable(11);if(z.flipSided)H.enable(12);if(z.useDepthPacking)H.enable(13);if(z.dithering)H.enable(14);if(z.transmission)H.enable(15);if(z.sheen)H.enable(16);if(z.opaque)H.enable(17);if(z.pointsUvs)H.enable(18);if(z.decodeVideoTexture)H.enable(19);if(z.decodeVideoTextureEmissive)H.enable(20);if(z.alphaToCoverage)H.enable(21);if(z.numLightProbeGrids>0)H.enable(22);if(z.hasPositionAttribute)H.enable(23);V.push(H.mask)}function C(V){let z=F[V.type],y;if(z){let k=e8[z];y=F8.clone(k.uniforms)}else y=V.uniforms;return y}function O(V,z){let y=N.get(z);if(y!==void 0)++y.usedTimes;else y=new j1(J,z,V,K),G.push(y),N.set(z,y);return y}function B(V){if(--V.usedTimes===0){let z=G.indexOf(V);G[z]=G[G.length-1],G.pop(),N.delete(V.cacheKey),V.destroy()}}function _(V){Y.remove(V)}function A(){Y.dispose()}return{getParameters:M,getProgramCacheKey:D,getUniforms:C,acquireProgram:O,releaseProgram:B,releaseShaderCache:_,programs:G,dispose:A}}function b1(){let J=new WeakMap;function $(H){return J.has(H)}function Q(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function Z(H){J.delete(H)}function K(H,Y,W){J.get(H)[Y]=W}function U(){J=new WeakMap}return{has:$,get:Q,remove:Z,update:K,dispose:U}}function x1(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.material.id!==$.material.id)return J.material.id-$.material.id;else if(J.materialVariant!==$.materialVariant)return J.materialVariant-$.materialVariant;else if(J.z!==$.z)return J.z-$.z;else return J.id-$.id}function IW(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.z!==$.z)return $.z-J.z;else return J.id-$.id}function zW(){let J=[],$=0,Q=[],Z=[],K=[];function U(){$=0,Q.length=0,Z.length=0,K.length=0}function H(X){let F=0;if(X.isInstancedMesh)F+=2;if(X.isSkinnedMesh)F+=1;return F}function Y(X,F,R,M,D,E){let I=J[$];if(I===void 0)I={id:X.id,object:X,geometry:F,material:R,materialVariant:H(X),groupOrder:M,renderOrder:X.renderOrder,z:D,group:E},J[$]=I;else I.id=X.id,I.object=X,I.geometry=F,I.material=R,I.materialVariant=H(X),I.groupOrder=M,I.renderOrder=X.renderOrder,I.z=D,I.group=E;return $++,I}function W(X,F,R,M,D,E,I){if(I.reversedDepth===!0)D=-D;let C=Y(X,F,R,M,D,E);if(R.transmission>0)Z.push(C);else if(R.transparent===!0)K.push(C);else Q.push(C)}function G(X,F,R,M,D,E){let I=Y(X,F,R,M,D,E);if(R.transmission>0)Z.unshift(I);else if(R.transparent===!0)K.unshift(I);else Q.unshift(I)}function N(X,F){if(Q.length>1)Q.sort(X||x1);if(Z.length>1)Z.sort(F||IW);if(K.length>1)K.sort(F||IW)}function q(){for(let X=$,F=J.length;X<F;X++){let R=J[X];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:Q,transmissive:Z,transparent:K,init:U,push:W,unshift:G,finish:q,sort:N}}function h1(){let J=new WeakMap;function $(Z,K){let U=J.get(Z),H;if(U===void 0)H=new zW,J.set(Z,[H]);else if(K>=U.length)H=new zW,U.push(H);else H=U[K];return H}function Q(){J=new WeakMap}return{get:$,dispose:Q}}function g1(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"SunLight":case"DirectionalLight":Q={direction:new v,color:new D0};break;case"SpotLight":Q={position:new v,direction:new v,color:new D0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Q={position:new v,color:new D0,distance:0,decay:0};break;case"HemisphereLight":Q={direction:new v,skyColor:new D0,groundColor:new D0};break;case"RectAreaLight":Q={color:new D0,position:new v,halfWidth:new v,halfHeight:new v};break}return J[$.id]=Q,Q}}}function p1(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"SunLight":case"DirectionalLight":Q={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q0};break;case"SpotLight":Q={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q0};break;case"PointLight":Q={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[$.id]=Q,Q}}}var u1=0;function m1(J,$){return($.castShadow?2:0)-(J.castShadow?2:0)+($.map?1:0)-(J.map?1:0)}function d1(J){let $=new g1,Q=p1(),Z={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let G=0;G<9;G++)Z.probe.push(new v);let K=new v,U=new h9,H=new h9;function Y(G){let N=0,q=0,X=0;for(let f=0;f<9;f++)Z.probe[f].set(0,0,0);let F=0,R=0,M=0,D=0,E=0,I=0,C=0,O=0,B=0,_=0,A=0,V=0,z=0,y=0;G.sort(m1);for(let f=0,s=G.length;f<s;f++){let j=G[f],p=j.color,e=j.intensity,n=j.distance,r=null;if(j.shadow&&j.shadow.map)if(j.shadow.map.texture.format===Y6)r=j.shadow.map.texture;else r=j.shadow.map.depthTexture||j.shadow.map.texture;if(j.isAmbientLight)N+=p.r*e,q+=p.g*e,X+=p.b*e;else if(j.isLightProbe){for(let u=0;u<9;u++)Z.probe[u].addScaledVector(j.sh.coefficients[u],e);y++}else if(j.isSunLight){let u=$.get(j);if(u.color.copy(j.color).multiplyScalar(j.intensity),j.castShadow){let x=j.shadow,K0=Q.get(j);K0.shadowIntensity=x.intensity,K0.shadowBias=x.bias,K0.shadowNormalBias=x.normalBias,K0.shadowRadius=x.radius,K0.shadowMapSize.copy(x.mapSize).multiply(x.getFrameExtents()),Z.sunShadow[R]=K0,Z.sunShadowMap[R]=r;let R0=x.getViewportCount();for(let T0=0;T0<R0;T0++)Z.sunShadowMatrix[M+T0]=x.getMatrix(T0),Z.sunShadowCascade[M+T0]=x._cascadeData[T0];M+=R0,R++}Z.sun[F]=u,F++}else if(j.isDirectionalLight){let u=$.get(j);if(u.color.copy(j.color).multiplyScalar(j.intensity),j.castShadow){let x=j.shadow,K0=Q.get(j);K0.shadowIntensity=x.intensity,K0.shadowBias=x.bias,K0.shadowNormalBias=x.normalBias,K0.shadowRadius=x.radius,K0.shadowMapSize=x.mapSize,Z.directionalShadow[D]=K0,Z.directionalShadowMap[D]=r,Z.directionalShadowMatrix[D]=j.shadow.matrix,B++}Z.directional[D]=u,D++}else if(j.isSpotLight){let u=$.get(j);u.position.setFromMatrixPosition(j.matrixWorld),u.color.copy(p).multiplyScalar(e),u.distance=n,u.coneCos=Math.cos(j.angle),u.penumbraCos=Math.cos(j.angle*(1-j.penumbra)),u.decay=j.decay,Z.spot[I]=u;let x=j.shadow;if(j.map){if(Z.spotLightMap[V]=j.map,V++,x.updateMatrices(j),j.castShadow)z++}if(Z.spotLightMatrix[I]=x.matrix,j.castShadow){let K0=Q.get(j);K0.shadowIntensity=x.intensity,K0.shadowBias=x.bias,K0.shadowNormalBias=x.normalBias,K0.shadowRadius=x.radius,K0.shadowMapSize=x.mapSize,Z.spotShadow[I]=K0,Z.spotShadowMap[I]=r,A++}I++}else if(j.isRectAreaLight){let u=$.get(j);u.color.copy(p).multiplyScalar(e),u.halfWidth.set(j.width*0.5,0,0),u.halfHeight.set(0,j.height*0.5,0),Z.rectArea[C]=u,C++}else if(j.isPointLight){let u=$.get(j);if(u.color.copy(j.color).multiplyScalar(j.intensity),u.distance=j.distance,u.decay=j.decay,j.castShadow){let x=j.shadow,K0=Q.get(j);K0.shadowIntensity=x.intensity,K0.shadowBias=x.bias,K0.shadowNormalBias=x.normalBias,K0.shadowRadius=x.radius,K0.shadowMapSize=x.mapSize,K0.shadowCameraNear=x.camera.near,K0.shadowCameraFar=x.camera.far,Z.pointShadow[E]=K0,Z.pointShadowMap[E]=r,Z.pointShadowMatrix[E]=j.shadow.matrix,_++}Z.point[E]=u,E++}else if(j.isHemisphereLight){let u=$.get(j);u.skyColor.copy(j.color).multiplyScalar(e),u.groundColor.copy(j.groundColor).multiplyScalar(e),Z.hemi[O]=u,O++}}if(C>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=y0.LTC_FLOAT_1,Z.rectAreaLTC2=y0.LTC_FLOAT_2;else Z.rectAreaLTC1=y0.LTC_HALF_1,Z.rectAreaLTC2=y0.LTC_HALF_2;Z.ambient[0]=N,Z.ambient[1]=q,Z.ambient[2]=X;let k=Z.hash;if(k.sunLength!==F||k.directionalLength!==D||k.pointLength!==E||k.spotLength!==I||k.rectAreaLength!==C||k.hemiLength!==O||k.numSunShadows!==R||k.numDirectionalShadows!==B||k.numPointShadows!==_||k.numSpotShadows!==A||k.numSpotMaps!==V||k.numLightProbes!==y)Z.sun.length=F,Z.directional.length=D,Z.spot.length=I,Z.rectArea.length=C,Z.point.length=E,Z.hemi.length=O,Z.sunShadow.length=R,Z.sunShadowMap.length=R,Z.sunShadowMatrix.length=M,Z.sunShadowCascade.length=M,Z.directionalShadow.length=B,Z.directionalShadowMap.length=B,Z.directionalShadowMatrix.length=B,Z.pointShadow.length=_,Z.pointShadowMap.length=_,Z.pointShadowMatrix.length=_,Z.spotShadow.length=A,Z.spotShadowMap.length=A,Z.spotLightMatrix.length=A+V-z,Z.spotLightMap.length=V,Z.numSpotLightShadowsWithMaps=z,Z.numLightProbes=y,k.sunLength=F,k.directionalLength=D,k.pointLength=E,k.spotLength=I,k.rectAreaLength=C,k.hemiLength=O,k.numSunShadows=R,k.numDirectionalShadows=B,k.numPointShadows=_,k.numSpotShadows=A,k.numSpotMaps=V,k.numLightProbes=y,Z.version=u1++}function W(G,N){let q=0,X=0,F=0,R=0,M=0,D=0,E=N.matrixWorldInverse;for(let I=0,C=G.length;I<C;I++){let O=G[I];if(O.isSunLight){let B=Z.sun[q];B.direction.setFromMatrixPosition(O.matrixWorld),B.direction.transformDirection(E),q++}else if(O.isDirectionalLight){let B=Z.directional[X];B.direction.setFromMatrixPosition(O.matrixWorld),K.setFromMatrixPosition(O.target.matrixWorld),B.direction.sub(K),B.direction.transformDirection(E),X++}else if(O.isSpotLight){let B=Z.spot[R];B.position.setFromMatrixPosition(O.matrixWorld),B.position.applyMatrix4(E),B.direction.setFromMatrixPosition(O.matrixWorld),K.setFromMatrixPosition(O.target.matrixWorld),B.direction.sub(K),B.direction.transformDirection(E),R++}else if(O.isRectAreaLight){let B=Z.rectArea[M];B.position.setFromMatrixPosition(O.matrixWorld),B.position.applyMatrix4(E),H.identity(),U.copy(O.matrixWorld),U.premultiply(E),H.extractRotation(U),B.halfWidth.set(O.width*0.5,0,0),B.halfHeight.set(0,O.height*0.5,0),B.halfWidth.applyMatrix4(H),B.halfHeight.applyMatrix4(H),M++}else if(O.isPointLight){let B=Z.point[F];B.position.setFromMatrixPosition(O.matrixWorld),B.position.applyMatrix4(E),F++}else if(O.isHemisphereLight){let B=Z.hemi[D];B.direction.setFromMatrixPosition(O.matrixWorld),B.direction.transformDirection(E),D++}}}return{setup:Y,setupView:W,state:Z}}function AW(J){let $=new d1(J),Q=[],Z=[],K=[];function U(X){q.camera=X,Q.length=0,Z.length=0,K.length=0}function H(X){Q.push(X)}function Y(X){Z.push(X)}function W(X){K.push(X)}function G(){$.setup(Q)}function N(X){$.setupView(Q,X)}let q={lightsArray:Q,shadowsArray:Z,lightProbeGridArray:K,camera:null,lights:$,transmissionRenderTarget:{},textureUnits:0};return{init:U,state:q,setupLights:G,setupLightsView:N,pushLight:H,pushShadow:Y,pushLightProbeGrid:W}}function l1(J){let $=new WeakMap;function Q(K,U=0){let H=$.get(K),Y;if(H===void 0)Y=new AW(J),$.set(K,[Y]);else if(U>=H.length)Y=new AW(J),H.push(Y);else Y=H[U];return Y}function Z(){$=new WeakMap}return{get:Q,dispose:Z}}var c1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,n1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,i1=[new v(1,0,0),new v(-1,0,0),new v(0,1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1)],s1=[new v(0,-1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1),new v(0,-1,0),new v(0,-1,0)],LW=new h9,GQ=new v,DH=new v;function o1(J,$,Q){let Z=new t$,K=new q0,U=new q0,H=new N7,Y=new HQ,W=new nU,G={},N=Q.maxTextureSize,q={[s6]:L7,[L7]:s6,[d9]:d9},X=new p9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new q0},radius:{value:4}},vertexShader:c1,fragmentShader:n1}),F=X.clone();F.defines.HORIZONTAL_PASS=1;let R=new V9;R.setAttribute("position",new H7(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let M=new h(R,X),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=x$;let E=this.type;this.render=function(_,A,V){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(_.length===0)return;if(this.type===gJ)H9("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=x$;let z=J.getRenderTarget(),y=J.getActiveCubeFace(),k=J.getActiveMipmapLevel(),f=J.state;if(f.setBlending(J8),f.buffers.depth.getReversed()===!0)f.buffers.color.setClear(0,0,0,0);else f.buffers.color.setClear(1,1,1,1);f.buffers.depth.setTest(!0),f.setScissorTest(!1);let s=E!==this.type;if(s)A.traverse(function(j){if(j.material)if(Array.isArray(j.material))j.material.forEach((p)=>p.needsUpdate=!0);else j.material.needsUpdate=!0});for(let j=0,p=_.length;j<p;j++){let e=_[j],n=e.shadow;if(n===void 0){H9("WebGLShadowMap:",e,"has no shadow.");continue}if(n.autoUpdate===!1&&n.needsUpdate===!1)continue;K.copy(n.mapSize);let r=n.getFrameExtents();if(K.multiply(r),U.copy(n.mapSize),K.x>N||K.y>N){if(K.x>N)U.x=Math.floor(N/r.x),K.x=U.x*r.x,n.mapSize.x=U.x;if(K.y>N)U.y=Math.floor(N/r.y),K.y=U.y*r.y,n.mapSize.y=U.y}let u=J.state.buffers.depth.getReversed();if(n.camera._reversedDepth=u,n.map===null||s===!0){if(n.map!==null){if(n.map.depthTexture!==null)n.map.depthTexture.dispose(),n.map.depthTexture=null;n.map.dispose()}if(this.type===i6){if(e.isPointLight){H9("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}n.map=new F7(K.x,K.y,{format:Y6,type:P7,minFilter:$8,magFilter:$8,generateMipmaps:!1}),n.map.texture.name=e.name+".shadowMap",n.map.depthTexture=new RJ(K.x,K.y,FJ),n.map.depthTexture.name=e.name+".shadowMapDepth",n.map.depthTexture.format=U6,n.map.depthTexture.compareFunction=null,n.map.depthTexture.minFilter=n7,n.map.depthTexture.magFilter=n7}else{if(e.isPointLight)n.map=new MH(K.x),n.map.depthTexture=new pU(K.x,pJ);else n.map=new F7(K.x,K.y),n.map.depthTexture=new RJ(K.x,K.y,pJ);if(n.map.depthTexture.name=e.name+".shadowMap",n.map.depthTexture.format=U6,this.type===x$)n.map.depthTexture.compareFunction=u?PZ:LZ,n.map.depthTexture.minFilter=$8,n.map.depthTexture.magFilter=$8;else n.map.depthTexture.compareFunction=null,n.map.depthTexture.minFilter=n7,n.map.depthTexture.magFilter=n7}n.camera.updateProjectionMatrix()}if(n.map.isWebGLCubeRenderTarget!==!0&&(n.map.width!==K.x||n.map.height!==K.y))n.map.setSize(K.x,K.y);let x=n.map.isWebGLCubeRenderTarget?6:n.getViewportCount();if(e.isPointLight!==!0)n.updateMatrices(e,V);for(let K0=0;K0<x;K0++){let R0=n.getCamera(K0);if(e.isPointLight){let{camera:T0,matrix:l}=n,F0=e.distance||T0.far;if(F0!==T0.far)T0.far=F0,T0.updateProjectionMatrix();GQ.setFromMatrixPosition(e.matrixWorld),T0.position.copy(GQ),DH.copy(T0.position),DH.add(i1[K0]),T0.up.copy(s1[K0]),T0.lookAt(DH),T0.updateMatrixWorld(),l.makeTranslation(-GQ.x,-GQ.y,-GQ.z),LW.multiplyMatrices(T0.projectionMatrix,T0.matrixWorldInverse),n._frustum.setFromProjectionMatrix(LW,T0.coordinateSystem,T0.reversedDepth)}if(n.map.isWebGLCubeRenderTarget)J.setRenderTarget(n.map,K0),J.clear();else{if(K0===0)J.setRenderTarget(n.map),J.clear();let T0=n.getViewport(K0);H.set(U.x*T0.x,U.y*T0.y,U.x*T0.z,U.y*T0.w),f.viewport(H)}Z=n.getFrustum(K0),O(A,V,R0,e,this.type)}if(n.isPointLightShadow!==!0&&this.type===i6)I(n,V);n.needsUpdate=!1}E=this.type,D.needsUpdate=!1,J.setRenderTarget(z,y,k)};function I(_,A){let V=$.update(M);if(X.defines.VSM_SAMPLES!==_.blurSamples)X.defines.VSM_SAMPLES=_.blurSamples,F.defines.VSM_SAMPLES=_.blurSamples,X.needsUpdate=!0,F.needsUpdate=!0;if(_.mapPass===null)_.mapPass=new F7(K.x,K.y,{format:Y6,type:P7});else if(_.mapPass.width!==_.map.width||_.mapPass.height!==_.map.height)_.mapPass.setSize(_.map.width,_.map.height);X.uniforms.shadow_pass.value=_.map.depthTexture,X.uniforms.resolution.value.set(_.map.width,_.map.height),X.uniforms.radius.value=_.radius,J.setRenderTarget(_.mapPass),J.clear(),J.renderBufferDirect(A,null,V,X,M,null),F.uniforms.shadow_pass.value=_.mapPass.texture,F.uniforms.resolution.value.set(_.map.width,_.map.height),F.uniforms.radius.value=_.radius,J.setRenderTarget(_.map),J.clear(),J.renderBufferDirect(A,null,V,F,M,null)}function C(_,A,V,z){let y=null,k=V.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(k!==void 0)y=k;else if(y=V.isPointLight===!0?W:Y,J.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let f=y.uuid,s=A.uuid,j=G[f];if(j===void 0)j={},G[f]=j;let p=j[s];if(p===void 0)p=y.clone(),j[s]=p,A.addEventListener("dispose",B);y=p}if(y.visible=A.visible,y.wireframe=A.wireframe,z===i6)y.side=A.shadowSide!==null?A.shadowSide:A.side;else y.side=A.shadowSide!==null?A.shadowSide:q[A.side];if(y.alphaMap=A.alphaMap,y.alphaTest=A.alphaToCoverage===!0?0.5:A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,V.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let f=J.properties.get(y);f.light=V}return y}function O(_,A,V,z,y){if(_.visible===!1)return;if(_.layers.test(A.layers)&&(_.isMesh||_.isLine||_.isPoints)){if((_.castShadow||_.receiveShadow&&y===i6)&&(!_.frustumCulled||_.intersectsFrustum(Z))){_.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,_.matrixWorld);let s=$.update(_),j=_.material;if(Array.isArray(j)){let p=s.groups;for(let e=0,n=p.length;e<n;e++){let r=p[e],u=j[r.materialIndex];if(u&&u.visible){let x=C(_,u,z,y);_.onBeforeShadow(J,_,A,V,s,x,r),J.renderBufferDirect(V,null,s,x,_,r),_.onAfterShadow(J,_,A,V,s,x,r)}}}else if(j.visible){let p=C(_,j,z,y);_.onBeforeShadow(J,_,A,V,s,p,null),J.renderBufferDirect(V,null,s,p,_,null),_.onAfterShadow(J,_,A,V,s,p,null)}}}let f=_.children;for(let s=0,j=f.length;s<j;s++)O(f[s],A,V,z,y)}function B(_){_.target.removeEventListener("dispose",B);for(let V in G){let z=G[V],y=_.target.uuid;if(y in z)z[y].dispose(),delete z[y]}}}function a1(J,$){function Q(){let d=!1,j0=new N7,X0=null,v0=new N7(0,0,0,0);return{setMask:function(d0){if(X0!==d0&&!d)J.colorMask(d0,d0,d0,d0),X0=d0},setLocked:function(d0){d=d0},setClear:function(d0,V0,x0,R9,K7){if(K7===!0)d0*=R9,V0*=R9,x0*=R9;if(j0.set(d0,V0,x0,R9),v0.equals(j0)===!1)J.clearColor(d0,V0,x0,R9),v0.copy(j0)},reset:function(){d=!1,X0=null,v0.set(-1,0,0,0)}}}function Z(){let d=!1,j0=!1,X0=null,v0=null,d0=null;return{setReversed:function(V0){if(j0!==V0){let x0=$.get("EXT_clip_control");if(V0)x0.clipControlEXT(x0.LOWER_LEFT_EXT,x0.ZERO_TO_ONE_EXT);else x0.clipControlEXT(x0.LOWER_LEFT_EXT,x0.NEGATIVE_ONE_TO_ONE_EXT);j0=V0;let R9=d0;d0=null,this.setClear(R9)}},getReversed:function(){return j0},setTest:function(V0){if(V0)G0(J.DEPTH_TEST);else c(J.DEPTH_TEST)},setMask:function(V0){if(X0!==V0&&!d)J.depthMask(V0),X0=V0},setFunc:function(V0){if(j0)V0=c5[V0];if(v0!==V0){switch(V0){case O5:J.depthFunc(J.NEVER);break;case R5:J.depthFunc(J.ALWAYS);break;case M5:J.depthFunc(J.LESS);break;case lK:J.depthFunc(J.LEQUAL);break;case V5:J.depthFunc(J.EQUAL);break;case _5:J.depthFunc(J.GEQUAL);break;case B5:J.depthFunc(J.GREATER);break;case I5:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}v0=V0}},setLocked:function(V0){d=V0},setClear:function(V0){if(d0!==V0){if(d0=V0,j0)V0=1-V0;J.clearDepth(V0)}},reset:function(){d=!1,X0=null,v0=null,d0=null,j0=!1}}}function K(){let d=!1,j0=null,X0=null,v0=null,d0=null,V0=null,x0=null,R9=null,K7=null;return{setTest:function(n9){if(!d)if(n9)G0(J.STENCIL_TEST);else c(J.STENCIL_TEST)},setMask:function(n9){if(j0!==n9&&!d)J.stencilMask(n9),j0=n9},setFunc:function(n9,l8,UJ){if(X0!==n9||v0!==l8||d0!==UJ)J.stencilFunc(n9,l8,UJ),X0=n9,v0=l8,d0=UJ},setOp:function(n9,l8,UJ){if(V0!==n9||x0!==l8||R9!==UJ)J.stencilOp(n9,l8,UJ),V0=n9,x0=l8,R9=UJ},setLocked:function(n9){d=n9},setClear:function(n9){if(K7!==n9)J.clearStencil(n9),K7=n9},reset:function(){d=!1,j0=null,X0=null,v0=null,d0=null,V0=null,x0=null,R9=null,K7=null}}}let U=new Q,H=new Z,Y=new K,W=new WeakMap,G=new WeakMap,N={},q={},X={},F=new WeakMap,R=[],M=null,D=!1,E=null,I=null,C=null,O=null,B=null,_=null,A=null,V=new D0(0,0,0),z=0,y=!1,k=null,f=null,s=null,j=null,p=null,e=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),n=!1,r=0,u=J.getParameter(J.VERSION);if(u.indexOf("WebGL")!==-1)r=parseFloat(/^WebGL (\d)/.exec(u)[1]),n=r>=1;else if(u.indexOf("OpenGL ES")!==-1)r=parseFloat(/^OpenGL ES (\d)/.exec(u)[1]),n=r>=2;let x=null,K0={},R0=J.getParameter(J.SCISSOR_BOX),T0=J.getParameter(J.VIEWPORT),l=new N7().fromArray(R0),F0=new N7().fromArray(T0);function i(d,j0,X0,v0){let d0=new Uint8Array(4),V0=J.createTexture();J.bindTexture(d,V0),J.texParameteri(d,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(d,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let x0=0;x0<X0;x0++)if(d===J.TEXTURE_3D||d===J.TEXTURE_2D_ARRAY)J.texImage3D(j0,0,J.RGBA,1,1,v0,0,J.RGBA,J.UNSIGNED_BYTE,d0);else J.texImage2D(j0+x0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,d0);return V0}let N0={};N0[J.TEXTURE_2D]=i(J.TEXTURE_2D,J.TEXTURE_2D,1),N0[J.TEXTURE_CUBE_MAP]=i(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),N0[J.TEXTURE_2D_ARRAY]=i(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),N0[J.TEXTURE_3D]=i(J.TEXTURE_3D,J.TEXTURE_3D,1,1),U.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),G0(J.DEPTH_TEST),H.setFunc(lK),S0(!1),J9(uK),G0(J.CULL_FACE),_0(J8);function G0(d){if(N[d]!==!0)J.enable(d),N[d]=!0}function c(d){if(N[d]!==!1)J.disable(d),N[d]=!1}function P0(d,j0){if(X[d]!==j0){if(J.bindFramebuffer(d,j0),X[d]=j0,d===J.DRAW_FRAMEBUFFER)X[J.FRAMEBUFFER]=j0;if(d===J.FRAMEBUFFER)X[J.DRAW_FRAMEBUFFER]=j0;return!0}return!1}function J0(d,j0){let X0=R,v0=!1;if(d){if(X0=F.get(j0),X0===void 0)X0=[],F.set(j0,X0);let d0=d.textures;if(X0.length!==d0.length||X0[0]!==J.COLOR_ATTACHMENT0){for(let V0=0,x0=d0.length;V0<x0;V0++)X0[V0]=J.COLOR_ATTACHMENT0+V0;X0.length=d0.length,v0=!0}}else if(X0[0]!==J.BACK)X0[0]=J.BACK,v0=!0;if(v0)J.drawBuffers(X0)}function m0(d){if(M!==d)return J.useProgram(d),M=d,!0;return!1}let Z0={[o6]:J.FUNC_ADD,[rY]:J.FUNC_SUBTRACT,[tY]:J.FUNC_REVERSE_SUBTRACT};Z0[eY]=J.MIN,Z0[J5]=J.MAX;let O0={[$5]:J.ZERO,[Q5]:J.ONE,[Z5]:J.SRC_COLOR,[U5]:J.SRC_ALPHA,[X5]:J.SRC_ALPHA_SATURATE,[G5]:J.DST_COLOR,[Y5]:J.DST_ALPHA,[K5]:J.ONE_MINUS_SRC_COLOR,[H5]:J.ONE_MINUS_SRC_ALPHA,[N5]:J.ONE_MINUS_DST_COLOR,[W5]:J.ONE_MINUS_DST_ALPHA,[q5]:J.CONSTANT_COLOR,[F5]:J.ONE_MINUS_CONSTANT_COLOR,[D5]:J.CONSTANT_ALPHA,[E5]:J.ONE_MINUS_CONSTANT_ALPHA};function _0(d,j0,X0,v0,d0,V0,x0,R9,K7,n9){if(d===J8){if(D===!0)c(J.BLEND),D=!1;return}if(D===!1)G0(J.BLEND),D=!0;if(d!==aY){if(d!==E||n9!==y){if(I!==o6||B!==o6)J.blendEquation(J.FUNC_ADD),I=o6,B=o6;if(n9)switch(d){case h$:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case M7:J.blendFunc(J.ONE,J.ONE);break;case mK:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case dK:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:N9("WebGLState: Invalid blending: ",d);break}else switch(d){case h$:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case M7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case mK:N9("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dK:N9("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:N9("WebGLState: Invalid blending: ",d);break}C=null,O=null,_=null,A=null,V.set(0,0,0),z=0,E=d,y=n9}return}if(d0=d0||j0,V0=V0||X0,x0=x0||v0,j0!==I||d0!==B)J.blendEquationSeparate(Z0[j0],Z0[d0]),I=j0,B=d0;if(X0!==C||v0!==O||V0!==_||x0!==A)J.blendFuncSeparate(O0[X0],O0[v0],O0[V0],O0[x0]),C=X0,O=v0,_=V0,A=x0;if(R9.equals(V)===!1||K7!==z)J.blendColor(R9.r,R9.g,R9.b,K7),V.copy(R9),z=K7;E=d,y=!1}function z0(d,j0){d.side===d9?c(J.CULL_FACE):G0(J.CULL_FACE);let X0=d.side===L7;if(j0)X0=!X0;S0(X0),d.blending===h$&&d.transparent===!1?_0(J8):_0(d.blending,d.blendEquation,d.blendSrc,d.blendDst,d.blendEquationAlpha,d.blendSrcAlpha,d.blendDstAlpha,d.blendColor,d.blendAlpha,d.premultipliedAlpha),H.setFunc(d.depthFunc),H.setTest(d.depthTest),H.setMask(d.depthWrite),U.setMask(d.colorWrite);let v0=d.stencilWrite;if(Y.setTest(v0),v0)Y.setMask(d.stencilWriteMask),Y.setFunc(d.stencilFunc,d.stencilRef,d.stencilFuncMask),Y.setOp(d.stencilFail,d.stencilZFail,d.stencilZPass);E9(d.polygonOffset,d.polygonOffsetFactor,d.polygonOffsetUnits),d.alphaToCoverage===!0?G0(J.SAMPLE_ALPHA_TO_COVERAGE):c(J.SAMPLE_ALPHA_TO_COVERAGE)}function S0(d){if(k!==d){if(d)J.frontFace(J.CW);else J.frontFace(J.CCW);k=d}}function J9(d){if(d!==sY){if(G0(J.CULL_FACE),d!==f)if(d===uK)J.cullFace(J.BACK);else if(d===oY)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else c(J.CULL_FACE);f=d}function K9(d){if(d!==s){if(n)J.lineWidth(d);s=d}}function E9(d,j0,X0){if(d){if(G0(J.POLYGON_OFFSET_FILL),j!==j0||p!==X0){if(j=j0,p=X0,H.getReversed())j0=-j0;J.polygonOffset(j0,X0)}}else c(J.POLYGON_OFFSET_FILL)}function O9(d){if(d)G0(J.SCISSOR_TEST);else c(J.SCISSOR_TEST)}function b(d){if(d===void 0)d=J.TEXTURE0+e-1;if(x!==d)J.activeTexture(d),x=d}function t9(d,j0,X0){if(X0===void 0)if(x===null)X0=J.TEXTURE0+e-1;else X0=x;let v0=K0[X0];if(v0===void 0)v0={type:void 0,texture:void 0},K0[X0]=v0;if(v0.type!==d||v0.texture!==j0){if(x!==X0)J.activeTexture(X0),x=X0;J.bindTexture(d,j0||N0[d]),v0.type=d,v0.texture=j0}}function z9(){let d=K0[x];if(d!==void 0&&d.type!==void 0)J.bindTexture(d.type,null),d.type=void 0,d.texture=void 0}function C9(){try{J.compressedTexImage2D(...arguments)}catch(d){N9("WebGLState:",d)}}function S(){try{J.compressedTexImage3D(...arguments)}catch(d){N9("WebGLState:",d)}}function P(){try{J.texSubImage2D(...arguments)}catch(d){N9("WebGLState:",d)}}function g(){try{J.texSubImage3D(...arguments)}catch(d){N9("WebGLState:",d)}}function $0(){try{J.compressedTexSubImage2D(...arguments)}catch(d){N9("WebGLState:",d)}}function M0(){try{J.compressedTexSubImage3D(...arguments)}catch(d){N9("WebGLState:",d)}}function A0(){try{J.texStorage2D(...arguments)}catch(d){N9("WebGLState:",d)}}function k0(){try{J.texStorage3D(...arguments)}catch(d){N9("WebGLState:",d)}}function W0(){try{J.texImage2D(...arguments)}catch(d){N9("WebGLState:",d)}}function E0(){try{J.texImage3D(...arguments)}catch(d){N9("WebGLState:",d)}}function u0(d){if(q[d]!==void 0)return q[d];else return J.getParameter(d)}function $9(d,j0){if(q[d]!==j0)J.pixelStorei(d,j0),q[d]=j0}function f0(d){if(l.equals(d)===!1)J.scissor(d.x,d.y,d.z,d.w),l.copy(d)}function L0(d){if(F0.equals(d)===!1)J.viewport(d.x,d.y,d.z,d.w),F0.copy(d)}function U9(d,j0){let X0=G.get(j0);if(X0===void 0)X0=new WeakMap,G.set(j0,X0);let v0=X0.get(d);if(v0===void 0)v0=J.getUniformBlockIndex(j0,d.name),X0.set(d,v0)}function G9(d,j0){let v0=G.get(j0).get(d);if(W.get(j0)!==v0)J.uniformBlockBinding(j0,v0,d.__bindingPointIndex),W.set(j0,v0)}function m9(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),N={},q={},x=null,K0={},X={},F=new WeakMap,R=[],M=null,D=!1,E=null,I=null,C=null,O=null,B=null,_=null,A=null,V=new D0(0,0,0),z=0,y=!1,k=null,f=null,s=null,j=null,p=null,l.set(0,0,J.canvas.width,J.canvas.height),F0.set(0,0,J.canvas.width,J.canvas.height),U.reset(),H.reset(),Y.reset()}return{buffers:{color:U,depth:H,stencil:Y},enable:G0,disable:c,bindFramebuffer:P0,drawBuffers:J0,useProgram:m0,setBlending:_0,setMaterial:z0,setFlipSided:S0,setCullFace:J9,setLineWidth:K9,setPolygonOffset:E9,setScissorTest:O9,activeTexture:b,bindTexture:t9,unbindTexture:z9,compressedTexImage2D:C9,compressedTexImage3D:S,texImage2D:W0,texImage3D:E0,pixelStorei:$9,getParameter:u0,updateUBOMapping:U9,uniformBlockBinding:G9,texStorage2D:A0,texStorage3D:k0,texSubImage2D:P,texSubImage3D:g,compressedTexSubImage2D:$0,compressedTexSubImage3D:M0,scissor:f0,viewport:L0,reset:m9}}function r1(J,$,Q,Z,K,U,H){let Y=$.has("WEBGL_multisampled_render_to_texture")?$.get("WEBGL_multisampled_render_to_texture"):null,W=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),G=new q0,N=new WeakMap,q=new Set,X,F=new WeakMap,R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(S){}function M(S,P){return R?new OffscreenCanvas(S,P):k$("canvas")}function D(S,P,g){let $0=1,M0=C9(S);if(M0.width>g||M0.height>g)$0=g/Math.max(M0.width,M0.height);if($0<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let A0=Math.floor($0*M0.width),k0=Math.floor($0*M0.height);if(X===void 0)X=M(A0,k0);let W0=P?M(A0,k0):X;return W0.width=A0,W0.height=k0,W0.getContext("2d").drawImage(S,0,0,A0,k0),H9("WebGLRenderer: Texture has been resized from ("+M0.width+"x"+M0.height+") to ("+A0+"x"+k0+")."),W0}else{if("data"in S)H9("WebGLRenderer: Image in DataTexture is too big ("+M0.width+"x"+M0.height+").");return S}return S}function E(S){return S.generateMipmaps}function I(S){J.generateMipmap(S)}function C(S){if(S.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(S.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function O(S,P,g,$0,M0,A0=!1){if(S!==null){if(J[S]!==void 0)return J[S];H9("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let k0;if($0){if(k0=$.get("EXT_texture_norm16"),!k0)H9("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let W0=P;if(P===J.RED){if(g===J.FLOAT)W0=J.R32F;if(g===J.HALF_FLOAT)W0=J.R16F;if(g===J.UNSIGNED_BYTE)W0=J.R8;if(g===J.UNSIGNED_SHORT&&k0)W0=k0.R16_EXT;if(g===J.SHORT&&k0)W0=k0.R16_SNORM_EXT}if(P===J.RED_INTEGER){if(g===J.UNSIGNED_BYTE)W0=J.R8UI;if(g===J.UNSIGNED_SHORT)W0=J.R16UI;if(g===J.UNSIGNED_INT)W0=J.R32UI;if(g===J.BYTE)W0=J.R8I;if(g===J.SHORT)W0=J.R16I;if(g===J.INT)W0=J.R32I}if(P===J.RG){if(g===J.FLOAT)W0=J.RG32F;if(g===J.HALF_FLOAT)W0=J.RG16F;if(g===J.UNSIGNED_BYTE)W0=J.RG8;if(g===J.UNSIGNED_SHORT&&k0)W0=k0.RG16_EXT;if(g===J.SHORT&&k0)W0=k0.RG16_SNORM_EXT}if(P===J.RG_INTEGER){if(g===J.UNSIGNED_BYTE)W0=J.RG8UI;if(g===J.UNSIGNED_SHORT)W0=J.RG16UI;if(g===J.UNSIGNED_INT)W0=J.RG32UI;if(g===J.BYTE)W0=J.RG8I;if(g===J.SHORT)W0=J.RG16I;if(g===J.INT)W0=J.RG32I}if(P===J.RGB_INTEGER){if(g===J.UNSIGNED_BYTE)W0=J.RGB8UI;if(g===J.UNSIGNED_SHORT)W0=J.RGB16UI;if(g===J.UNSIGNED_INT)W0=J.RGB32UI;if(g===J.BYTE)W0=J.RGB8I;if(g===J.SHORT)W0=J.RGB16I;if(g===J.INT)W0=J.RGB32I}if(P===J.RGBA_INTEGER){if(g===J.UNSIGNED_BYTE)W0=J.RGBA8UI;if(g===J.UNSIGNED_SHORT)W0=J.RGBA16UI;if(g===J.UNSIGNED_INT)W0=J.RGBA32UI;if(g===J.BYTE)W0=J.RGBA8I;if(g===J.SHORT)W0=J.RGBA16I;if(g===J.INT)W0=J.RGBA32I}if(P===J.RGB){if(g===J.UNSIGNED_SHORT&&k0)W0=k0.RGB16_EXT;if(g===J.SHORT&&k0)W0=k0.RGB16_SNORM_EXT;if(g===J.UNSIGNED_INT_5_9_9_9_REV)W0=J.RGB9_E5;if(g===J.UNSIGNED_INT_10F_11F_11F_REV)W0=J.R11F_G11F_B10F}if(P===J.RGBA){let E0=A0?SU:A9.getTransfer(M0);if(g===J.FLOAT)W0=J.RGBA32F;if(g===J.HALF_FLOAT)W0=J.RGBA16F;if(g===J.UNSIGNED_BYTE)W0=E0===r9?J.SRGB8_ALPHA8:J.RGBA8;if(g===J.UNSIGNED_SHORT&&k0)W0=k0.RGBA16_EXT;if(g===J.SHORT&&k0)W0=k0.RGBA16_SNORM_EXT;if(g===J.UNSIGNED_SHORT_4_4_4_4)W0=J.RGBA4;if(g===J.UNSIGNED_SHORT_5_5_5_1)W0=J.RGB5_A1}if(W0===J.R16F||W0===J.R32F||W0===J.RG16F||W0===J.RG32F||W0===J.RGBA16F||W0===J.RGBA32F)$.get("EXT_color_buffer_float");return W0}function B(S,P){let g;if(S){if(P===null||P===pJ||P===r6)g=J.DEPTH24_STENCIL8;else if(P===FJ)g=J.DEPTH32F_STENCIL8;else if(P===i$)g=J.DEPTH24_STENCIL8,H9("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(P===null||P===pJ||P===r6)g=J.DEPTH_COMPONENT24;else if(P===FJ)g=J.DEPTH_COMPONENT32F;else if(P===i$)g=J.DEPTH_COMPONENT16;return g}function _(S,P){if(E(S)===!0||S.isFramebufferTexture&&S.minFilter!==n7&&S.minFilter!==$8)return Math.log2(Math.max(P.width,P.height))+1;else if(S.mipmaps!==void 0&&S.mipmaps.length>0)return S.mipmaps.length;else if(S.isCompressedTexture&&Array.isArray(S.image))return P.mipmaps.length;else return 1}function A(S){let P=S.target;if(P.removeEventListener("dispose",A),z(P),P.isVideoTexture)N.delete(P);if(P.isHTMLTexture)q.delete(P)}function V(S){let P=S.target;P.removeEventListener("dispose",V),k(P)}function z(S){let P=Z.get(S);if(P.__webglInit===void 0)return;let g=S.source,$0=F.get(g);if($0){let M0=$0[P.__cacheKey];if(M0.usedTimes--,M0.usedTimes===0)y(S);if(Object.keys($0).length===0)F.delete(g)}Z.remove(S)}function y(S){let P=Z.get(S);J.deleteTexture(P.__webglTexture);let g=S.source,$0=F.get(g);delete $0[P.__cacheKey],H.memory.textures--}function k(S){let P=Z.get(S);if(S.depthTexture)S.depthTexture.dispose(),Z.remove(S.depthTexture);if(S.isWebGLCubeRenderTarget)for(let $0=0;$0<6;$0++){if(Array.isArray(P.__webglFramebuffer[$0]))for(let M0=0;M0<P.__webglFramebuffer[$0].length;M0++)J.deleteFramebuffer(P.__webglFramebuffer[$0][M0]);else J.deleteFramebuffer(P.__webglFramebuffer[$0]);if(P.__webglDepthbuffer)J.deleteRenderbuffer(P.__webglDepthbuffer[$0])}else{if(Array.isArray(P.__webglFramebuffer))for(let $0=0;$0<P.__webglFramebuffer.length;$0++)J.deleteFramebuffer(P.__webglFramebuffer[$0]);else J.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer)J.deleteRenderbuffer(P.__webglDepthbuffer);if(P.__webglMultisampledFramebuffer)J.deleteFramebuffer(P.__webglMultisampledFramebuffer);if(P.__webglColorRenderbuffer){for(let $0=0;$0<P.__webglColorRenderbuffer.length;$0++)if(P.__webglColorRenderbuffer[$0])J.deleteRenderbuffer(P.__webglColorRenderbuffer[$0])}if(P.__webglDepthRenderbuffer)J.deleteRenderbuffer(P.__webglDepthRenderbuffer)}let g=S.textures;for(let $0=0,M0=g.length;$0<M0;$0++){let A0=Z.get(g[$0]);if(A0.__webglTexture)J.deleteTexture(A0.__webglTexture),H.memory.textures--;Z.remove(g[$0])}Z.remove(S)}let f=0;function s(){f=0}function j(){return f}function p(S){f=S}function e(){let S=f;if(S>=K.maxTextures)H9("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+K.maxTextures);return f+=1,S}function n(S){let P=[];return P.push(S.wrapS),P.push(S.wrapT),P.push(S.wrapR||0),P.push(S.magFilter),P.push(S.minFilter),P.push(S.anisotropy),P.push(S.internalFormat),P.push(S.format),P.push(S.type),P.push(S.generateMipmaps),P.push(S.premultiplyAlpha),P.push(S.flipY),P.push(S.unpackAlignment),P.push(S.colorSpace),P.join()}function r(S,P){let g=Z.get(S);if(S.isVideoTexture)t9(S);if(S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&g.__version!==S.version){let $0=S.image;if($0===null)H9("WebGLRenderer: Texture marked for update but no image data found.");else if($0.complete===!1)H9("WebGLRenderer: Texture marked for update but image is incomplete");else{c(g,S,P);return}}else if(S.isExternalTexture)g.__webglTexture=S.sourceTexture?S.sourceTexture:null;Q.bindTexture(J.TEXTURE_2D,g.__webglTexture,J.TEXTURE0+P)}function u(S,P){let g=Z.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&g.__version!==S.version){c(g,S,P);return}else if(S.isExternalTexture)g.__webglTexture=S.sourceTexture?S.sourceTexture:null;Q.bindTexture(J.TEXTURE_2D_ARRAY,g.__webglTexture,J.TEXTURE0+P)}function x(S,P){let g=Z.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&g.__version!==S.version){c(g,S,P);return}Q.bindTexture(J.TEXTURE_3D,g.__webglTexture,J.TEXTURE0+P)}function K0(S,P){let g=Z.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&g.__version!==S.version){P0(g,S,P);return}Q.bindTexture(J.TEXTURE_CUBE_MAP,g.__webglTexture,J.TEXTURE0+P)}let R0={[a8]:J.REPEAT,[RZ]:J.CLAMP_TO_EDGE,[P5]:J.MIRRORED_REPEAT},T0={[n7]:J.NEAREST,[C5]:J.NEAREST_MIPMAP_NEAREST,[n$]:J.NEAREST_MIPMAP_LINEAR,[$8]:J.LINEAR,[MZ]:J.LINEAR_MIPMAP_NEAREST,[K6]:J.LINEAR_MIPMAP_LINEAR},l={[b5]:J.NEVER,[u5]:J.ALWAYS,[x5]:J.LESS,[LZ]:J.LEQUAL,[h5]:J.EQUAL,[PZ]:J.GEQUAL,[g5]:J.GREATER,[p5]:J.NOTEQUAL};function F0(S,P){if(P.type===FJ&&$.has("OES_texture_float_linear")===!1&&(P.magFilter===$8||P.magFilter===MZ||P.magFilter===n$||P.magFilter===K6||P.minFilter===$8||P.minFilter===MZ||P.minFilter===n$||P.minFilter===K6))H9("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(S,J.TEXTURE_WRAP_S,R0[P.wrapS]),J.texParameteri(S,J.TEXTURE_WRAP_T,R0[P.wrapT]),S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texParameteri(S,J.TEXTURE_WRAP_R,R0[P.wrapR]);if(J.texParameteri(S,J.TEXTURE_MAG_FILTER,T0[P.magFilter]),J.texParameteri(S,J.TEXTURE_MIN_FILTER,T0[P.minFilter]),P.compareFunction)J.texParameteri(S,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(S,J.TEXTURE_COMPARE_FUNC,l[P.compareFunction]);if($.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===n7)return;if(P.minFilter!==n$&&P.minFilter!==K6)return;if(P.type===FJ&&$.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||Z.get(P).__currentAnisotropy){let g=$.get("EXT_texture_filter_anisotropic");J.texParameterf(S,g.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,K.getMaxAnisotropy())),Z.get(P).__currentAnisotropy=P.anisotropy}}}function i(S,P){let g=!1;if(S.__webglInit===void 0)S.__webglInit=!0,P.addEventListener("dispose",A);let $0=P.source,M0=F.get($0);if(M0===void 0)M0={},F.set($0,M0);let A0=n(P);if(A0!==S.__cacheKey){if(M0[A0]===void 0)M0[A0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,g=!0;M0[A0].usedTimes++;let k0=M0[S.__cacheKey];if(k0!==void 0){if(M0[S.__cacheKey].usedTimes--,k0.usedTimes===0)y(P)}S.__cacheKey=A0,S.__webglTexture=M0[A0].texture}return g}function N0(S,P,g){return Math.floor(Math.floor(S/g)/P)}function G0(S,P,g,$0){let A0=S.updateRanges;if(A0.length===0)Q.texSubImage2D(J.TEXTURE_2D,0,0,0,P.width,P.height,g,$0,P.data);else{A0.sort(($9,f0)=>$9.start-f0.start);let k0=0;for(let $9=1;$9<A0.length;$9++){let f0=A0[k0],L0=A0[$9],U9=f0.start+f0.count,G9=N0(L0.start,P.width,4),m9=N0(f0.start,P.width,4);if(L0.start<=U9+1&&G9===m9&&N0(L0.start+L0.count-1,P.width,4)===G9)f0.count=Math.max(f0.count,L0.start+L0.count-f0.start);else++k0,A0[k0]=L0}A0.length=k0+1;let W0=Q.getParameter(J.UNPACK_ROW_LENGTH),E0=Q.getParameter(J.UNPACK_SKIP_PIXELS),u0=Q.getParameter(J.UNPACK_SKIP_ROWS);Q.pixelStorei(J.UNPACK_ROW_LENGTH,P.width);for(let $9=0,f0=A0.length;$9<f0;$9++){let L0=A0[$9],U9=Math.floor(L0.start/4),G9=Math.ceil(L0.count/4),m9=U9%P.width,d=Math.floor(U9/P.width),j0=G9,X0=1;Q.pixelStorei(J.UNPACK_SKIP_PIXELS,m9),Q.pixelStorei(J.UNPACK_SKIP_ROWS,d),Q.texSubImage2D(J.TEXTURE_2D,0,m9,d,j0,1,g,$0,P.data)}S.clearUpdateRanges(),Q.pixelStorei(J.UNPACK_ROW_LENGTH,W0),Q.pixelStorei(J.UNPACK_SKIP_PIXELS,E0),Q.pixelStorei(J.UNPACK_SKIP_ROWS,u0)}}function c(S,P,g){let $0=J.TEXTURE_2D;if(P.isDataArrayTexture||P.isCompressedArrayTexture)$0=J.TEXTURE_2D_ARRAY;if(P.isData3DTexture)$0=J.TEXTURE_3D;let M0=i(S,P),A0=P.source;Q.bindTexture($0,S.__webglTexture,J.TEXTURE0+g);let k0=Z.get(A0);if(A0.version!==k0.__version||M0===!0){if(Q.activeTexture(J.TEXTURE0+g),(typeof ImageBitmap<"u"&&P.image instanceof ImageBitmap)===!1){let X0=A9.getPrimaries(A9.workingColorSpace),v0=P.colorSpace===W6?null:A9.getPrimaries(P.colorSpace),d0=P.colorSpace===W6||X0===v0?J.NONE:J.BROWSER_DEFAULT_WEBGL;Q.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,P.flipY),Q.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),Q.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,d0)}Q.pixelStorei(J.UNPACK_ALIGNMENT,P.unpackAlignment);let E0=D(P.image,!1,K.maxTextureSize);E0=z9(P,E0);let u0=U.convert(P.format,P.colorSpace),$9=U.convert(P.type),f0=O(P.internalFormat,u0,$9,P.normalized,P.colorSpace,P.isVideoTexture);F0($0,P);let L0,U9=P.mipmaps,G9=P.isVideoTexture!==!0,m9=k0.__version===void 0||M0===!0,d=A0.dataReady,j0=_(P,E0);if(P.isDepthTexture){if(f0=B(P.format===H6,P.type),m9)if(G9)Q.texStorage2D(J.TEXTURE_2D,1,f0,E0.width,E0.height);else Q.texImage2D(J.TEXTURE_2D,0,f0,E0.width,E0.height,0,u0,$9,null)}else if(P.isDataTexture)if(U9.length>0){if(G9&&m9)Q.texStorage2D(J.TEXTURE_2D,j0,f0,U9[0].width,U9[0].height);for(let X0=0,v0=U9.length;X0<v0;X0++)if(L0=U9[X0],G9){if(d)Q.texSubImage2D(J.TEXTURE_2D,X0,0,0,L0.width,L0.height,u0,$9,L0.data)}else Q.texImage2D(J.TEXTURE_2D,X0,f0,L0.width,L0.height,0,u0,$9,L0.data);P.generateMipmaps=!1}else if(G9){if(m9)Q.texStorage2D(J.TEXTURE_2D,j0,f0,E0.width,E0.height);if(d)G0(P,E0,u0,$9)}else Q.texImage2D(J.TEXTURE_2D,0,f0,E0.width,E0.height,0,u0,$9,E0.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){if(G9&&m9)Q.texStorage3D(J.TEXTURE_2D_ARRAY,j0,f0,U9[0].width,U9[0].height,E0.depth);for(let X0=0,v0=U9.length;X0<v0;X0++)if(L0=U9[X0],P.format!==r8)if(u0!==null)if(G9){if(d)if(P.layerUpdates.size>0){let d0=WH(L0.width,L0.height,P.format,P.type);for(let V0 of P.layerUpdates){let x0=L0.data.subarray(V0*d0/L0.data.BYTES_PER_ELEMENT,(V0+1)*d0/L0.data.BYTES_PER_ELEMENT);Q.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,X0,0,0,V0,L0.width,L0.height,1,u0,x0)}}else Q.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,X0,0,0,0,L0.width,L0.height,E0.depth,u0,L0.data)}else Q.compressedTexImage3D(J.TEXTURE_2D_ARRAY,X0,f0,L0.width,L0.height,E0.depth,0,L0.data,0,0);else H9("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(G9){if(d)Q.texSubImage3D(J.TEXTURE_2D_ARRAY,X0,0,0,0,L0.width,L0.height,E0.depth,u0,$9,L0.data)}else Q.texImage3D(J.TEXTURE_2D_ARRAY,X0,f0,L0.width,L0.height,E0.depth,0,u0,$9,L0.data);if(P.layerUpdates.size>0)P.clearLayerUpdates()}else{if(G9&&m9)Q.texStorage2D(J.TEXTURE_2D,j0,f0,U9[0].width,U9[0].height);for(let X0=0,v0=U9.length;X0<v0;X0++)if(L0=U9[X0],P.format!==r8)if(u0!==null)if(G9){if(d)Q.compressedTexSubImage2D(J.TEXTURE_2D,X0,0,0,L0.width,L0.height,u0,L0.data)}else Q.compressedTexImage2D(J.TEXTURE_2D,X0,f0,L0.width,L0.height,0,L0.data);else H9("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(G9){if(d)Q.texSubImage2D(J.TEXTURE_2D,X0,0,0,L0.width,L0.height,u0,$9,L0.data)}else Q.texImage2D(J.TEXTURE_2D,X0,f0,L0.width,L0.height,0,u0,$9,L0.data)}else if(P.isDataArrayTexture)if(G9){if(m9)Q.texStorage3D(J.TEXTURE_2D_ARRAY,j0,f0,E0.width,E0.height,E0.depth);if(d)if(P.layerUpdates.size>0){let X0=WH(E0.width,E0.height,P.format,P.type);for(let v0 of P.layerUpdates){let d0=E0.data.subarray(v0*X0/E0.data.BYTES_PER_ELEMENT,(v0+1)*X0/E0.data.BYTES_PER_ELEMENT);Q.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,v0,E0.width,E0.height,1,u0,$9,d0)}P.clearLayerUpdates()}else Q.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,E0.width,E0.height,E0.depth,u0,$9,E0.data)}else Q.texImage3D(J.TEXTURE_2D_ARRAY,0,f0,E0.width,E0.height,E0.depth,0,u0,$9,E0.data);else if(P.isData3DTexture)if(G9){if(m9)Q.texStorage3D(J.TEXTURE_3D,j0,f0,E0.width,E0.height,E0.depth);if(d)Q.texSubImage3D(J.TEXTURE_3D,0,0,0,0,E0.width,E0.height,E0.depth,u0,$9,E0.data)}else Q.texImage3D(J.TEXTURE_3D,0,f0,E0.width,E0.height,E0.depth,0,u0,$9,E0.data);else if(P.isFramebufferTexture){if(m9)if(G9)Q.texStorage2D(J.TEXTURE_2D,j0,f0,E0.width,E0.height);else{let{width:X0,height:v0}=E0;for(let d0=0;d0<j0;d0++)Q.texImage2D(J.TEXTURE_2D,d0,f0,X0,v0,0,u0,$9,null),X0>>=1,v0>>=1}}else if(P.isHTMLTexture){if("texElementImage2D"in J){let X0=J.canvas;if(!X0.hasAttribute("layoutsubtree"))X0.setAttribute("layoutsubtree","true");if(E0.parentNode!==X0){X0.appendChild(E0),q.add(P),X0.onpaint=(v0)=>{let d0=v0.changedElements;for(let V0 of q)if(d0.includes(V0.image))V0.needsUpdate=!0},X0.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,E0);else{let{RGBA:d0,RGBA:V0,UNSIGNED_BYTE:x0}=J;J.texElementImage2D(J.TEXTURE_2D,0,d0,V0,x0,E0)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(U9.length>0){if(G9&&m9){let X0=C9(U9[0]);Q.texStorage2D(J.TEXTURE_2D,j0,f0,X0.width,X0.height)}for(let X0=0,v0=U9.length;X0<v0;X0++)if(L0=U9[X0],G9){if(d)Q.texSubImage2D(J.TEXTURE_2D,X0,0,0,u0,$9,L0)}else Q.texImage2D(J.TEXTURE_2D,X0,f0,u0,$9,L0);P.generateMipmaps=!1}else if(G9){if(m9){let X0=C9(E0);Q.texStorage2D(J.TEXTURE_2D,j0,f0,X0.width,X0.height)}if(d)Q.texSubImage2D(J.TEXTURE_2D,0,0,0,u0,$9,E0)}else Q.texImage2D(J.TEXTURE_2D,0,f0,u0,$9,E0);if(E(P))I($0);if(k0.__version=A0.version,P.onUpdate)P.onUpdate(P)}S.__version=P.version}function P0(S,P,g){if(P.image.length!==6)return;let $0=i(S,P),M0=P.source;Q.bindTexture(J.TEXTURE_CUBE_MAP,S.__webglTexture,J.TEXTURE0+g);let A0=Z.get(M0);if(M0.version!==A0.__version||$0===!0){Q.activeTexture(J.TEXTURE0+g);let k0=A9.getPrimaries(A9.workingColorSpace),W0=P.colorSpace===W6?null:A9.getPrimaries(P.colorSpace),E0=P.colorSpace===W6||k0===W0?J.NONE:J.BROWSER_DEFAULT_WEBGL;Q.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,P.flipY),Q.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),Q.pixelStorei(J.UNPACK_ALIGNMENT,P.unpackAlignment),Q.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,E0);let u0=P.isCompressedTexture||P.image[0].isCompressedTexture,$9=P.image[0]&&P.image[0].isDataTexture,f0=[];for(let V0=0;V0<6;V0++){if(!u0&&!$9)f0[V0]=D(P.image[V0],!0,K.maxCubemapSize);else f0[V0]=$9?P.image[V0].image:P.image[V0];f0[V0]=z9(P,f0[V0])}let L0=f0[0],U9=U.convert(P.format,P.colorSpace),G9=U.convert(P.type),m9=O(P.internalFormat,U9,G9,P.normalized,P.colorSpace),d=P.isVideoTexture!==!0,j0=A0.__version===void 0||$0===!0,X0=M0.dataReady,v0=_(P,L0);F0(J.TEXTURE_CUBE_MAP,P);let d0;if(u0){if(d&&j0)Q.texStorage2D(J.TEXTURE_CUBE_MAP,v0,m9,L0.width,L0.height);for(let V0=0;V0<6;V0++){d0=f0[V0].mipmaps;for(let x0=0;x0<d0.length;x0++){let R9=d0[x0];if(P.format!==r8)if(U9!==null)if(d){if(X0)Q.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,x0,0,0,R9.width,R9.height,U9,R9.data)}else Q.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,x0,m9,R9.width,R9.height,0,R9.data);else H9("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(d){if(X0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,x0,0,0,R9.width,R9.height,U9,G9,R9.data)}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,x0,m9,R9.width,R9.height,0,U9,G9,R9.data)}}}else{if(d0=P.mipmaps,d&&j0){if(d0.length>0)v0++;let V0=C9(f0[0]);Q.texStorage2D(J.TEXTURE_CUBE_MAP,v0,m9,V0.width,V0.height)}for(let V0=0;V0<6;V0++)if($9){if(d){if(X0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,0,0,0,f0[V0].width,f0[V0].height,U9,G9,f0[V0].data)}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,0,m9,f0[V0].width,f0[V0].height,0,U9,G9,f0[V0].data);for(let x0=0;x0<d0.length;x0++){let K7=d0[x0].image[V0].image;if(d){if(X0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,x0+1,0,0,K7.width,K7.height,U9,G9,K7.data)}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,x0+1,m9,K7.width,K7.height,0,U9,G9,K7.data)}}else{if(d){if(X0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,0,0,0,U9,G9,f0[V0])}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,0,m9,U9,G9,f0[V0]);for(let x0=0;x0<d0.length;x0++){let R9=d0[x0];if(d){if(X0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,x0+1,0,0,U9,G9,R9.image[V0])}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+V0,x0+1,m9,U9,G9,R9.image[V0])}}}if(E(P))I(J.TEXTURE_CUBE_MAP);if(A0.__version=M0.version,P.onUpdate)P.onUpdate(P)}S.__version=P.version}function J0(S,P,g,$0,M0,A0){let k0=U.convert(g.format,g.colorSpace),W0=U.convert(g.type),E0=O(g.internalFormat,k0,W0,g.normalized,g.colorSpace),u0=Z.get(P),$9=Z.get(g);if($9.__renderTarget=P,!u0.__hasExternalTextures){let f0=Math.max(1,P.width>>A0),L0=Math.max(1,P.height>>A0);if(M0===J.TEXTURE_3D||M0===J.TEXTURE_2D_ARRAY)Q.texImage3D(M0,A0,E0,f0,L0,P.depth,0,k0,W0,null);else Q.texImage2D(M0,A0,E0,f0,L0,0,k0,W0,null)}if(Q.bindFramebuffer(J.FRAMEBUFFER,S),b(P))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,$0,M0,$9.__webglTexture,0,O9(P));else if(M0===J.TEXTURE_2D||M0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&M0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,$0,M0,$9.__webglTexture,A0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}function m0(S,P,g){if(J.bindRenderbuffer(J.RENDERBUFFER,S),P.depthBuffer){let $0=P.depthTexture,M0=$0&&$0.isDepthTexture?$0.type:null,A0=B(P.stencilBuffer,M0),k0=P.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(b(P))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,O9(P),A0,P.width,P.height);else if(g)J.renderbufferStorageMultisample(J.RENDERBUFFER,O9(P),A0,P.width,P.height);else J.renderbufferStorage(J.RENDERBUFFER,A0,P.width,P.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,k0,J.RENDERBUFFER,S)}else{let $0=P.textures;for(let M0=0;M0<$0.length;M0++){let A0=$0[M0],k0=U.convert(A0.format,A0.colorSpace),W0=U.convert(A0.type),E0=O(A0.internalFormat,k0,W0,A0.normalized,A0.colorSpace);if(b(P))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,O9(P),E0,P.width,P.height);else if(g)J.renderbufferStorageMultisample(J.RENDERBUFFER,O9(P),E0,P.width,P.height);else J.renderbufferStorage(J.RENDERBUFFER,E0,P.width,P.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function Z0(S,P,g){let $0=P.isWebGLCubeRenderTarget===!0;if(Q.bindFramebuffer(J.FRAMEBUFFER,S),!(P.depthTexture&&P.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let M0=Z.get(P.depthTexture);if(M0.__renderTarget=P,!M0.__webglTexture||P.depthTexture.image.width!==P.width||P.depthTexture.image.height!==P.height)P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0;if($0){if(M0.__webglInit===void 0)M0.__webglInit=!0,P.depthTexture.addEventListener("dispose",A);if(M0.__webglTexture===void 0){M0.__webglTexture=J.createTexture(),Q.bindTexture(J.TEXTURE_CUBE_MAP,M0.__webglTexture),F0(J.TEXTURE_CUBE_MAP,P.depthTexture);let u0=U.convert(P.depthTexture.format),$9=U.convert(P.depthTexture.type),f0;if(P.depthTexture.format===U6)f0=J.DEPTH_COMPONENT24;else if(P.depthTexture.format===H6)f0=J.DEPTH24_STENCIL8;for(let L0=0;L0<6;L0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+L0,0,f0,P.width,P.height,0,u0,$9,null)}}else r(P.depthTexture,0);let A0=M0.__webglTexture,k0=O9(P),W0=$0?J.TEXTURE_CUBE_MAP_POSITIVE_X+g:J.TEXTURE_2D,E0=P.depthTexture.format===H6?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(P.depthTexture.format===U6)if(b(P))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,E0,W0,A0,0,k0);else J.framebufferTexture2D(J.FRAMEBUFFER,E0,W0,A0,0);else if(P.depthTexture.format===H6)if(b(P))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,E0,W0,A0,0,k0);else J.framebufferTexture2D(J.FRAMEBUFFER,E0,W0,A0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function O0(S){let P=Z.get(S),g=S.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==S.depthTexture){let $0=S.depthTexture;if(P.__depthDisposeCallback)P.__depthDisposeCallback();if($0){let M0=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,$0.removeEventListener("dispose",M0)};$0.addEventListener("dispose",M0),P.__depthDisposeCallback=M0}P.__boundDepthTexture=$0}if(S.depthTexture&&!P.__autoAllocateDepthBuffer)if(g)for(let $0=0;$0<6;$0++)Z0(P.__webglFramebuffer[$0],S,$0);else{let $0=S.texture.mipmaps;if($0&&$0.length>0)Z0(P.__webglFramebuffer[0],S,0);else Z0(P.__webglFramebuffer,S,0)}else if(g){P.__webglDepthbuffer=[];for(let $0=0;$0<6;$0++)if(Q.bindFramebuffer(J.FRAMEBUFFER,P.__webglFramebuffer[$0]),P.__webglDepthbuffer[$0]===void 0)P.__webglDepthbuffer[$0]=J.createRenderbuffer(),m0(P.__webglDepthbuffer[$0],S,!1);else{let M0=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,A0=P.__webglDepthbuffer[$0];J.bindRenderbuffer(J.RENDERBUFFER,A0),J.framebufferRenderbuffer(J.FRAMEBUFFER,M0,J.RENDERBUFFER,A0)}}else{let $0=S.texture.mipmaps;if($0&&$0.length>0)Q.bindFramebuffer(J.FRAMEBUFFER,P.__webglFramebuffer[0]);else Q.bindFramebuffer(J.FRAMEBUFFER,P.__webglFramebuffer);if(P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=J.createRenderbuffer(),m0(P.__webglDepthbuffer,S,!1);else{let M0=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,A0=P.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,A0),J.framebufferRenderbuffer(J.FRAMEBUFFER,M0,J.RENDERBUFFER,A0)}}Q.bindFramebuffer(J.FRAMEBUFFER,null)}function _0(S,P,g){let $0=Z.get(S);if(P!==void 0)J0($0.__webglFramebuffer,S,S.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(g!==void 0)O0(S)}function z0(S){let P=S.texture,g=Z.get(S),$0=Z.get(P);S.addEventListener("dispose",V);let M0=S.textures,A0=S.isWebGLCubeRenderTarget===!0,k0=M0.length>1;if(!k0){if($0.__webglTexture===void 0)$0.__webglTexture=J.createTexture();$0.__version=P.version,H.memory.textures++}if(A0){g.__webglFramebuffer=[];for(let W0=0;W0<6;W0++)if(P.mipmaps&&P.mipmaps.length>0){g.__webglFramebuffer[W0]=[];for(let E0=0;E0<P.mipmaps.length;E0++)g.__webglFramebuffer[W0][E0]=J.createFramebuffer()}else g.__webglFramebuffer[W0]=J.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){g.__webglFramebuffer=[];for(let W0=0;W0<P.mipmaps.length;W0++)g.__webglFramebuffer[W0]=J.createFramebuffer()}else g.__webglFramebuffer=J.createFramebuffer();if(k0)for(let W0=0,E0=M0.length;W0<E0;W0++){let u0=Z.get(M0[W0]);if(u0.__webglTexture===void 0)u0.__webglTexture=J.createTexture(),H.memory.textures++}if(S.samples>0&&b(S)===!1){g.__webglMultisampledFramebuffer=J.createFramebuffer(),g.__webglColorRenderbuffer=[],Q.bindFramebuffer(J.FRAMEBUFFER,g.__webglMultisampledFramebuffer);for(let W0=0;W0<M0.length;W0++){let E0=M0[W0];g.__webglColorRenderbuffer[W0]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,g.__webglColorRenderbuffer[W0]);let u0=U.convert(E0.format,E0.colorSpace),$9=U.convert(E0.type),f0=O(E0.internalFormat,u0,$9,E0.normalized,E0.colorSpace,S.isXRRenderTarget===!0),L0=O9(S);J.renderbufferStorageMultisample(J.RENDERBUFFER,L0,f0,S.width,S.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.RENDERBUFFER,g.__webglColorRenderbuffer[W0])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),S.depthBuffer)g.__webglDepthRenderbuffer=J.createRenderbuffer(),m0(g.__webglDepthRenderbuffer,S,!0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}}if(A0){Q.bindTexture(J.TEXTURE_CUBE_MAP,$0.__webglTexture),F0(J.TEXTURE_CUBE_MAP,P);for(let W0=0;W0<6;W0++)if(P.mipmaps&&P.mipmaps.length>0)for(let E0=0;E0<P.mipmaps.length;E0++)J0(g.__webglFramebuffer[W0][E0],S,P,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+W0,E0);else J0(g.__webglFramebuffer[W0],S,P,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+W0,0);if(E(P))I(J.TEXTURE_CUBE_MAP);Q.unbindTexture()}else if(k0){for(let W0=0,E0=M0.length;W0<E0;W0++){let u0=M0[W0],$9=Z.get(u0),f0=J.TEXTURE_2D;if(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)f0=S.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(Q.bindTexture(f0,$9.__webglTexture),F0(f0,u0),J0(g.__webglFramebuffer,S,u0,J.COLOR_ATTACHMENT0+W0,f0,0),E(u0))I(f0)}Q.unbindTexture()}else{let W0=J.TEXTURE_2D;if(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)W0=S.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(Q.bindTexture(W0,$0.__webglTexture),F0(W0,P),P.mipmaps&&P.mipmaps.length>0)for(let E0=0;E0<P.mipmaps.length;E0++)J0(g.__webglFramebuffer[E0],S,P,J.COLOR_ATTACHMENT0,W0,E0);else J0(g.__webglFramebuffer,S,P,J.COLOR_ATTACHMENT0,W0,0);if(E(P))I(W0);Q.unbindTexture()}if(S.depthBuffer)O0(S)}function S0(S){let P=S.textures;for(let g=0,$0=P.length;g<$0;g++){let M0=P[g];if(E(M0)){let A0=C(S),k0=Z.get(M0).__webglTexture;Q.bindTexture(A0,k0),I(A0),Q.unbindTexture()}}}let J9=[],K9=[];function E9(S){if(S.samples>0){if(b(S)===!1){let{textures:P,width:g,height:$0}=S,M0=J.COLOR_BUFFER_BIT,A0=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,k0=Z.get(S),W0=P.length>1;if(W0)for(let u0=0;u0<P.length;u0++)Q.bindFramebuffer(J.FRAMEBUFFER,k0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+u0,J.RENDERBUFFER,null),Q.bindFramebuffer(J.FRAMEBUFFER,k0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+u0,J.TEXTURE_2D,null,0);Q.bindFramebuffer(J.READ_FRAMEBUFFER,k0.__webglMultisampledFramebuffer);let E0=S.texture.mipmaps;if(E0&&E0.length>0)Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,k0.__webglFramebuffer[0]);else Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,k0.__webglFramebuffer);for(let u0=0;u0<P.length;u0++){if(S.resolveDepthBuffer){if(S.depthBuffer)M0|=J.DEPTH_BUFFER_BIT;if(S.stencilBuffer&&S.resolveStencilBuffer)M0|=J.STENCIL_BUFFER_BIT}if(W0){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,k0.__webglColorRenderbuffer[u0]);let $9=Z.get(P[u0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,$9,0)}if(J.blitFramebuffer(0,0,g,$0,0,0,g,$0,M0,J.NEAREST),W===!0){if(J9.length=0,K9.length=0,J9.push(J.COLOR_ATTACHMENT0+u0),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1)J9.push(A0),K9.push(A0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,K9);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,J9)}}if(Q.bindFramebuffer(J.READ_FRAMEBUFFER,null),Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),W0)for(let u0=0;u0<P.length;u0++){Q.bindFramebuffer(J.FRAMEBUFFER,k0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+u0,J.RENDERBUFFER,k0.__webglColorRenderbuffer[u0]);let $9=Z.get(P[u0]).__webglTexture;Q.bindFramebuffer(J.FRAMEBUFFER,k0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+u0,J.TEXTURE_2D,$9,0)}Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,k0.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&W){let P=S.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[P])}}}function O9(S){return Math.min(K.maxSamples,S.samples)}function b(S){let P=Z.get(S);return S.samples>0&&$.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function t9(S){let P=H.render.frame;if(N.get(S)!==P)N.set(S,P),S.update()}function z9(S,P){let{colorSpace:g,format:$0,type:M0}=S;if(S.isCompressedTexture===!0||S.isVideoTexture===!0)return P;if(g!==wU&&g!==W6)if(A9.getTransfer(g)===r9){if($0!==r8||M0!==j8)H9("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else N9("WebGLTextures: Unsupported texture color space:",g);return P}function C9(S){if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement)G.width=S.naturalWidth||S.width,G.height=S.naturalHeight||S.height;else if(typeof VideoFrame<"u"&&S instanceof VideoFrame)G.width=S.displayWidth,G.height=S.displayHeight;else G.width=S.width,G.height=S.height;return G}this.allocateTextureUnit=e,this.resetTextureUnits=s,this.getTextureUnits=j,this.setTextureUnits=p,this.setTexture2D=r,this.setTexture2DArray=u,this.setTexture3D=x,this.setTextureCube=K0,this.rebindTextures=_0,this.setupRenderTarget=z0,this.updateRenderTargetMipmap=S0,this.updateMultisampleRenderTarget=E9,this.setupDepthRenderbuffer=O0,this.setupFrameBufferTexture=J0,this.useMultisampledRTT=b,this.isReversedDepthBuffer=function(){return Q.buffers.depth.getReversed()}}function t1(J,$){function Q(Z,K=W6){let U,H=A9.getTransfer(K);if(Z===j8)return J.UNSIGNED_BYTE;if(Z===nK)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===iK)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===S5)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===k5)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===T5)return J.BYTE;if(Z===w5)return J.SHORT;if(Z===i$)return J.UNSIGNED_SHORT;if(Z===cK)return J.INT;if(Z===pJ)return J.UNSIGNED_INT;if(Z===FJ)return J.FLOAT;if(Z===P7)return J.HALF_FLOAT;if(Z===j5)return J.ALPHA;if(Z===v5)return J.RGB;if(Z===r8)return J.RGBA;if(Z===U6)return J.DEPTH_COMPONENT;if(Z===H6)return J.DEPTH_STENCIL;if(Z===f5)return J.RED;if(Z===sK)return J.RED_INTEGER;if(Z===Y6)return J.RG;if(Z===oK)return J.RG_INTEGER;if(Z===aK)return J.RGBA_INTEGER;if(Z===VZ||Z===_Z||Z===BZ||Z===IZ)if(H===r9)if(U=$.get("WEBGL_compressed_texture_s3tc_srgb"),U!==null){if(Z===VZ)return U.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===_Z)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===BZ)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===IZ)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(U=$.get("WEBGL_compressed_texture_s3tc"),U!==null){if(Z===VZ)return U.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===_Z)return U.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===BZ)return U.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===IZ)return U.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===rK||Z===tK||Z===eK||Z===JU)if(U=$.get("WEBGL_compressed_texture_pvrtc"),U!==null){if(Z===rK)return U.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===tK)return U.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===eK)return U.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===JU)return U.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===$U||Z===QU||Z===ZU||Z===KU||Z===UU||Z===zZ||Z===HU)if(U=$.get("WEBGL_compressed_texture_etc"),U!==null){if(Z===$U||Z===QU)return H===r9?U.COMPRESSED_SRGB8_ETC2:U.COMPRESSED_RGB8_ETC2;if(Z===ZU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:U.COMPRESSED_RGBA8_ETC2_EAC;if(Z===KU)return U.COMPRESSED_R11_EAC;if(Z===UU)return U.COMPRESSED_SIGNED_R11_EAC;if(Z===zZ)return U.COMPRESSED_RG11_EAC;if(Z===HU)return U.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===YU||Z===WU||Z===GU||Z===NU||Z===XU||Z===qU||Z===FU||Z===DU||Z===EU||Z===OU||Z===RU||Z===MU||Z===VU||Z===_U)if(U=$.get("WEBGL_compressed_texture_astc"),U!==null){if(Z===YU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:U.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===WU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:U.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===GU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:U.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===NU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:U.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===XU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:U.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===qU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:U.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===FU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:U.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===DU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:U.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===EU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:U.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===OU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:U.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===RU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:U.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===MU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:U.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===VU)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:U.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===_U)return H===r9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:U.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===BU||Z===IU||Z===zU)if(U=$.get("EXT_texture_compression_bptc"),U!==null){if(Z===BU)return H===r9?U.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:U.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===IU)return U.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===zU)return U.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===AU||Z===LU||Z===AZ||Z===PU)if(U=$.get("EXT_texture_compression_rgtc"),U!==null){if(Z===AU)return U.COMPRESSED_RED_RGTC1_EXT;if(Z===LU)return U.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===AZ)return U.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===PU)return U.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===r6)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:Q}}var e1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,JE=`
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

}`;class xW{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,$){if(this.texture===null){let Q=new jZ(J.texture);if(J.depthNear!==$.depthNear||J.depthFar!==$.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=Q}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let $=J.cameras[0].viewport,Q=new p9({vertexShader:e1,fragmentShader:JE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:$.z},depthHeight:{value:$.w}}});this.mesh=new h(new t0(20,20),Q)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hW extends DJ{constructor(J,$){super();let Q=this,Z=null,K=1,U=null,H="local-floor",Y=1,W=null,G=null,N=null,q=null,X=null,F=null,R=typeof XRWebGLBinding<"u",M=new xW,D={},E=$.getContextAttributes(),I=null,C=null,O=[],B=[],_=new q0,A=null,V=null,z=new Z7;z.viewport=new N7;let y=new Z7;y.viewport=new N7;let k=[z,y],f=new KH,s=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(i){let N0=O[i];if(N0===void 0)N0=new o$,O[i]=N0;return N0.getTargetRaySpace()},this.getControllerGrip=function(i){let N0=O[i];if(N0===void 0)N0=new o$,O[i]=N0;return N0.getGripSpace()},this.getHand=function(i){let N0=O[i];if(N0===void 0)N0=new o$,O[i]=N0;return N0.getHandSpace()};function p(i){let N0=B.indexOf(i.inputSource);if(N0===-1)return;let G0=O[N0];if(G0!==void 0)G0.update(i.inputSource,i.frame,W||U),G0.dispatchEvent({type:i.type,data:i.inputSource})}function e(){Z.removeEventListener("select",p),Z.removeEventListener("selectstart",p),Z.removeEventListener("selectend",p),Z.removeEventListener("squeeze",p),Z.removeEventListener("squeezestart",p),Z.removeEventListener("squeezeend",p),Z.removeEventListener("end",e),Z.removeEventListener("inputsourceschange",n);for(let i=0;i<O.length;i++){let N0=B[i];if(N0===null)continue;B[i]=null,O[i].disconnect(N0)}s=null,j=null,M.reset();for(let i in D)delete D[i];if(J.setRenderTarget(I),X=null,q=null,N=null,Z=null,C=null,F0.stop(),Q.isPresenting=!1,J.setPixelRatio(A),J.setSize(_.width,_.height,!1),V!==null){let i=V.camera;i.fov=V.fov,i.zoom=V.zoom,i.updateProjectionMatrix(),V=null}Q.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(i){if(K=i,Q.isPresenting===!0)H9("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(i){if(H=i,Q.isPresenting===!0)H9("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return W||U},this.setReferenceSpace=function(i){W=i},this.getBaseLayer=function(){return q!==null?q:X},this.getBinding=function(){if(N===null&&R)N=new XRWebGLBinding(Z,$);return N},this.getFrame=function(){return F},this.getSession=function(){return Z},this.setSession=async function(i){if(Z=i,Z!==null){if(I=J.getRenderTarget(),Z.addEventListener("select",p),Z.addEventListener("selectstart",p),Z.addEventListener("selectend",p),Z.addEventListener("squeeze",p),Z.addEventListener("squeezestart",p),Z.addEventListener("squeezeend",p),Z.addEventListener("end",e),Z.addEventListener("inputsourceschange",n),E.xrCompatible!==!0)await $.makeXRCompatible();if(A=J.getPixelRatio(),J.getSize(_),!(R&&("createProjectionLayer"in XRWebGLBinding.prototype))){let G0={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:K};X=new XRWebGLLayer(Z,$,G0),Z.updateRenderState({baseLayer:X}),J.setPixelRatio(1),J.setSize(X.framebufferWidth,X.framebufferHeight,!1),C=new F7(X.framebufferWidth,X.framebufferHeight,{format:r8,type:j8,colorSpace:J.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:X.ignoreDepthValues===!1,resolveStencilBuffer:X.ignoreDepthValues===!1,storeMultisampledDepthBuffer:X.ignoreDepthValues===!1,storeMultisampledStencilBuffer:X.ignoreDepthValues===!1})}else{let G0=null,c=null,P0=null;if(E.depth)P0=E.stencil?$.DEPTH24_STENCIL8:$.DEPTH_COMPONENT24,G0=E.stencil?H6:U6,c=E.stencil?r6:pJ;let J0={colorFormat:$.RGBA8,depthFormat:P0,scaleFactor:K};N=this.getBinding(),q=N.createProjectionLayer(J0),Z.updateRenderState({layers:[q]}),J.setPixelRatio(1),J.setSize(q.textureWidth,q.textureHeight,!1),C=new F7(q.textureWidth,q.textureHeight,{format:r8,type:j8,depthTexture:new RJ(q.textureWidth,q.textureHeight,c,void 0,void 0,void 0,void 0,void 0,void 0,G0),stencilBuffer:E.stencil,colorSpace:J.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1,storeMultisampledDepthBuffer:q.ignoreDepthValues===!1,storeMultisampledStencilBuffer:q.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(Y),W=null,U=await Z.requestReferenceSpace(H),F0.setContext(Z),F0.start(),Q.isPresenting=!0,Q.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function n(i){for(let N0=0;N0<i.removed.length;N0++){let G0=i.removed[N0],c=B.indexOf(G0);if(c>=0)B[c]=null,O[c].disconnect(G0)}for(let N0=0;N0<i.added.length;N0++){let G0=i.added[N0],c=B.indexOf(G0);if(c===-1){for(let J0=0;J0<O.length;J0++)if(J0>=B.length){B.push(G0),c=J0;break}else if(B[J0]===null){B[J0]=G0,c=J0;break}if(c===-1)break}let P0=O[c];if(P0)P0.connect(G0)}}let r=new v,u=new v;function x(i,N0,G0){r.setFromMatrixPosition(N0.matrixWorld),u.setFromMatrixPosition(G0.matrixWorld);let c=r.distanceTo(u),P0=N0.projectionMatrix.elements,J0=G0.projectionMatrix.elements,m0=P0[14]/(P0[10]-1),Z0=P0[14]/(P0[10]+1),O0=(P0[9]+1)/P0[5],_0=(P0[9]-1)/P0[5],z0=(P0[8]-1)/P0[0],S0=(J0[8]+1)/J0[0],J9=m0*z0,K9=m0*S0,E9=c/(-z0+S0),O9=E9*-z0;if(N0.matrixWorld.decompose(i.position,i.quaternion,i.scale),i.translateX(O9),i.translateZ(E9),i.matrixWorld.compose(i.position,i.quaternion,i.scale),i.matrixWorldInverse.copy(i.matrixWorld).invert(),P0[10]===-1)i.projectionMatrix.copy(N0.projectionMatrix),i.projectionMatrixInverse.copy(N0.projectionMatrixInverse);else{let b=m0+E9,t9=Z0+E9,z9=J9-O9,C9=K9+(c-O9),S=O0*Z0/t9*b,P=_0*Z0/t9*b;i.projectionMatrix.makePerspective(z9,C9,S,P,b,t9),i.projectionMatrixInverse.copy(i.projectionMatrix).invert()}}function K0(i,N0){if(N0===null)i.matrixWorld.copy(i.matrix);else i.matrixWorld.multiplyMatrices(N0.matrixWorld,i.matrix);i.matrixWorldInverse.copy(i.matrixWorld).invert()}this.updateCamera=function(i){if(Z===null)return;let{near:N0,far:G0}=i;if(M.texture!==null){if(M.depthNear>0)N0=M.depthNear;if(M.depthFar>0)G0=M.depthFar}if(f.near=y.near=z.near=N0,f.far=y.far=z.far=G0,s!==f.near||j!==f.far)Z.updateRenderState({depthNear:f.near,depthFar:f.far}),s=f.near,j=f.far;f.layers.mask=i.layers.mask|6,z.layers.mask=f.layers.mask&-5,y.layers.mask=f.layers.mask&-3;let c=i.parent,P0=f.cameras;K0(f,c);for(let J0=0;J0<P0.length;J0++)K0(P0[J0],c);if(P0.length===2)x(f,z,y);else f.projectionMatrix.copy(z.projectionMatrix);if(V===null&&i.isPerspectiveCamera)V={camera:i,fov:i.fov,zoom:i.zoom};R0(i,f,c)};function R0(i,N0,G0){if(G0===null)i.matrix.copy(N0.matrixWorld);else i.matrix.copy(G0.matrixWorld),i.matrix.invert(),i.matrix.multiply(N0.matrixWorld);if(i.matrix.decompose(i.position,i.quaternion,i.scale),i.updateMatrixWorld(!0),i.projectionMatrix.copy(N0.projectionMatrix),i.projectionMatrixInverse.copy(N0.projectionMatrixInverse),i.isPerspectiveCamera)i.fov=$6*2*Math.atan(1/i.projectionMatrix.elements[5]),i.zoom=1}this.getCamera=function(){return f},this.getFoveation=function(){if(q===null&&X===null)return;return Y},this.setFoveation=function(i){if(Y=i,q!==null)q.fixedFoveation=i;if(X!==null&&X.fixedFoveation!==void 0)X.fixedFoveation=i},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(f)},this.getCameraTexture=function(i){return D[i]};let T0=null;function l(i,N0){if(G=N0.getViewerPose(W||U),F=N0,G!==null){let G0=G.views;if(X!==null)J.setRenderTargetFramebuffer(C,X.framebuffer),J.setRenderTarget(C);let c=!1;if(G0.length!==f.cameras.length)f.cameras.length=0,c=!0;for(let Z0=0;Z0<G0.length;Z0++){let O0=G0[Z0],_0=null;if(X!==null)_0=X.getViewport(O0);else{let S0=N.getViewSubImage(q,O0);if(_0=S0.viewport,Z0===0)J.setRenderTargetTextures(C,S0.colorTexture,S0.depthStencilTexture),J.setRenderTarget(C)}let z0=k[Z0];if(z0===void 0)z0=new Z7,z0.layers.enable(Z0),z0.viewport=new N7,k[Z0]=z0;if(z0.matrix.fromArray(O0.transform.matrix),z0.matrix.decompose(z0.position,z0.quaternion,z0.scale),z0.projectionMatrix.fromArray(O0.projectionMatrix),z0.projectionMatrixInverse.copy(z0.projectionMatrix).invert(),z0.viewport.set(_0.x,_0.y,_0.width,_0.height),Z0===0)f.matrix.copy(z0.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale);if(c===!0)f.cameras.push(z0)}let P0=Z.enabledFeatures;if(P0&&P0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&R){N=Q.getBinding();let Z0=N.getDepthInformation(G0[0]);if(Z0&&Z0.isValid&&Z0.texture)M.init(Z0,Z.renderState)}if(P0&&P0.includes("camera-access")&&R){J.state.unbindTexture(),N=Q.getBinding();for(let Z0=0;Z0<G0.length;Z0++){let O0=G0[Z0].camera;if(O0){let _0=D[O0];if(!_0)_0=new jZ,D[O0]=_0;let z0=N.getCameraImage(O0);_0.sourceTexture=z0}}}}for(let G0=0;G0<O.length;G0++){let c=B[G0],P0=O[G0];if(c!==null&&P0!==void 0)P0.update(c,N0,W||U)}if(T0)T0(i,N0);if(N0.detectedPlanes)Q.dispatchEvent({type:"planesdetected",data:N0});F=null}let F0=new PW;F0.setAnimationLoop(l),this.setAnimationLoop=function(i){T0=i},this.dispose=function(){}}}var $E=new h9,gW=new D9;gW.set(-1,0,0,0,1,0,0,0,1);function QE(J,$){function Q(D,E){if(D.matrixAutoUpdate===!0)D.updateMatrix();E.value.copy(D.matrix)}function Z(D,E){if(E.color.getRGB(D.fogColor.value,cU(J)),E.isFog)D.fogNear.value=E.near,D.fogFar.value=E.far;else if(E.isFogExp2)D.fogDensity.value=E.density}function K(D,E,I,C,O){if(E.isNodeMaterial)E.uniformsNeedUpdate=!1;else if(E.isMeshBasicMaterial)U(D,E);else if(E.isMeshLambertMaterial){if(U(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshToonMaterial)U(D,E),q(D,E);else if(E.isMeshPhongMaterial){if(U(D,E),N(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshStandardMaterial){if(U(D,E),X(D,E),E.isMeshPhysicalMaterial)F(D,E,O)}else if(E.isMeshMatcapMaterial)U(D,E),R(D,E);else if(E.isMeshDepthMaterial)U(D,E);else if(E.isMeshDistanceMaterial)U(D,E),M(D,E);else if(E.isMeshNormalMaterial)U(D,E);else if(E.isLineBasicMaterial){if(H(D,E),E.isLineDashedMaterial)Y(D,E)}else if(E.isPointsMaterial)W(D,E,I,C);else if(E.isSpriteMaterial)G(D,E);else if(E.isShadowMaterial)D.color.value.copy(E.color),D.opacity.value=E.opacity;else if(E.isShaderMaterial)E.uniformsNeedUpdate=!1}function U(D,E){if(D.opacity.value=E.opacity,E.color)D.diffuse.value.copy(E.color);if(E.emissive)D.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity);if(E.map)D.map.value=E.map,Q(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,Q(E.alphaMap,D.alphaMapTransform);if(E.bumpMap){if(D.bumpMap.value=E.bumpMap,Q(E.bumpMap,D.bumpMapTransform),D.bumpScale.value=E.bumpScale,E.side===L7)D.bumpScale.value*=-1}if(E.normalMap){if(D.normalMap.value=E.normalMap,Q(E.normalMap,D.normalMapTransform),D.normalScale.value.copy(E.normalScale),E.side===L7)D.normalScale.value.negate()}if(E.displacementMap)D.displacementMap.value=E.displacementMap,Q(E.displacementMap,D.displacementMapTransform),D.displacementScale.value=E.displacementScale,D.displacementBias.value=E.displacementBias;if(E.emissiveMap)D.emissiveMap.value=E.emissiveMap,Q(E.emissiveMap,D.emissiveMapTransform);if(E.specularMap)D.specularMap.value=E.specularMap,Q(E.specularMap,D.specularMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest;let I=$.get(E),C=I.envMap,O=I.envMapRotation;if(C){if(D.envMap.value=C,D.envMapRotation.value.setFromMatrix4($E.makeRotationFromEuler(O)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1)D.envMapRotation.value.premultiply(gW);D.reflectivity.value=E.reflectivity,D.ior.value=E.ior,D.refractionRatio.value=E.refractionRatio}if(E.lightMap)D.lightMap.value=E.lightMap,D.lightMapIntensity.value=E.lightMapIntensity,Q(E.lightMap,D.lightMapTransform);if(E.aoMap)D.aoMap.value=E.aoMap,D.aoMapIntensity.value=E.aoMapIntensity,Q(E.aoMap,D.aoMapTransform)}function H(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,E.map)D.map.value=E.map,Q(E.map,D.mapTransform)}function Y(D,E){D.dashSize.value=E.dashSize,D.totalSize.value=E.dashSize+E.gapSize,D.scale.value=E.scale}function W(D,E,I,C){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.size.value=E.size*I,D.scale.value=C*0.5,E.map)D.map.value=E.map,Q(E.map,D.uvTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,Q(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function G(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.rotation.value=E.rotation,E.map)D.map.value=E.map,Q(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,Q(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function N(D,E){D.specular.value.copy(E.specular),D.shininess.value=Math.max(E.shininess,0.0001)}function q(D,E){if(E.gradientMap)D.gradientMap.value=E.gradientMap}function X(D,E){if(D.metalness.value=E.metalness,E.metalnessMap)D.metalnessMap.value=E.metalnessMap,Q(E.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=E.roughness,E.roughnessMap)D.roughnessMap.value=E.roughnessMap,Q(E.roughnessMap,D.roughnessMapTransform);if(E.envMap)D.envMapIntensity.value=E.envMapIntensity}function F(D,E,I){if(D.ior.value=E.ior,E.sheen>0){if(D.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),D.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap)D.sheenColorMap.value=E.sheenColorMap,Q(E.sheenColorMap,D.sheenColorMapTransform);if(E.sheenRoughnessMap)D.sheenRoughnessMap.value=E.sheenRoughnessMap,Q(E.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(E.clearcoat>0){if(D.clearcoat.value=E.clearcoat,D.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap)D.clearcoatMap.value=E.clearcoatMap,Q(E.clearcoatMap,D.clearcoatMapTransform);if(E.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,Q(E.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(E.clearcoatNormalMap){if(D.clearcoatNormalMap.value=E.clearcoatNormalMap,Q(E.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===L7)D.clearcoatNormalScale.value.negate()}}if(E.dispersion>0)D.dispersion.value=E.dispersion;if(E.retroreflectivity>0)D.retroreflectivity.value=E.retroreflectivity;if(E.iridescence>0){if(D.iridescence.value=E.iridescence,D.iridescenceIOR.value=E.iridescenceIOR,D.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap)D.iridescenceMap.value=E.iridescenceMap,Q(E.iridescenceMap,D.iridescenceMapTransform);if(E.iridescenceThicknessMap)D.iridescenceThicknessMap.value=E.iridescenceThicknessMap,Q(E.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(E.transmission>0){if(D.transmission.value=E.transmission,D.transmissionSamplerMap.value=I.texture,D.transmissionSamplerSize.value.set(I.width,I.height),E.transmissionMap)D.transmissionMap.value=E.transmissionMap,Q(E.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=E.thickness,E.thicknessMap)D.thicknessMap.value=E.thicknessMap,Q(E.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=E.attenuationDistance,D.attenuationColor.value.copy(E.attenuationColor)}if(E.anisotropy>0){if(D.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap)D.anisotropyMap.value=E.anisotropyMap,Q(E.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=E.specularIntensity,D.specularColor.value.copy(E.specularColor),E.specularColorMap)D.specularColorMap.value=E.specularColorMap,Q(E.specularColorMap,D.specularColorMapTransform);if(E.specularIntensityMap)D.specularIntensityMap.value=E.specularIntensityMap,Q(E.specularIntensityMap,D.specularIntensityMapTransform)}function R(D,E){if(E.matcap)D.matcap.value=E.matcap}function M(D,E){let I=$.get(E).light;D.referencePosition.value.setFromMatrixPosition(I.matrixWorld),D.nearDistance.value=I.shadow.camera.near,D.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:K}}function ZE(J,$,Q,Z){let K={},U={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function W(O,B){let _=B.program;Z.uniformBlockBinding(O,_)}function G(O,B){let _=K[O.id];if(_===void 0)D(O),_=N(O),K[O.id]=_,O.addEventListener("dispose",I);let A=B.program;Z.updateUBOMapping(O,A);let V=$.render.frame;if(U[O.id]!==V)X(O),U[O.id]=V}function N(O){let B=q();O.__bindingPointIndex=B;let _=J.createBuffer(),A=O.__size,V=O.usage;return J.bindBuffer(J.UNIFORM_BUFFER,_),J.bufferData(J.UNIFORM_BUFFER,A,V),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,B,_),_}function q(){for(let O=0;O<Y;O++)if(H.indexOf(O)===-1)return H.push(O),O;return N9("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function X(O){let B=K[O.id],_=O.uniforms,A=O.__cache;J.bindBuffer(J.UNIFORM_BUFFER,B);for(let V=0,z=_.length;V<z;V++){let y=_[V];if(Array.isArray(y))for(let k=0,f=y.length;k<f;k++)F(y[k],V,k,A);else F(y,V,0,A)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(O,B,_,A){if(M(O,B,_,A)===!0){let{__offset:V,value:z}=O;if(Array.isArray(z)){let y=0;for(let k=0;k<z.length;k++){let f=z[k],s=E(f);if(R(f,O.__data,y),typeof f!=="number"&&typeof f!=="boolean"&&!f.isMatrix3&&!ArrayBuffer.isView(f))y+=s.storage/Float32Array.BYTES_PER_ELEMENT}}else R(z,O.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,V,O.__data)}}function R(O,B,_){if(typeof O==="number"||typeof O==="boolean")B[0]=O;else if(O.isMatrix3)B[0]=O.elements[0],B[1]=O.elements[1],B[2]=O.elements[2],B[3]=0,B[4]=O.elements[3],B[5]=O.elements[4],B[6]=O.elements[5],B[7]=0,B[8]=O.elements[6],B[9]=O.elements[7],B[10]=O.elements[8],B[11]=0;else if(ArrayBuffer.isView(O))B.set(new O.constructor(O.buffer,O.byteOffset,B.length));else O.toArray(B,_)}function M(O,B,_,A){let V=O.value,z=B+"_"+_;if(A[z]===void 0){if(typeof V==="number"||typeof V==="boolean")A[z]=V;else if(ArrayBuffer.isView(V))A[z]=V.slice();else A[z]=V.clone();return!0}else{let y=A[z];if(typeof V==="number"||typeof V==="boolean"){if(y!==V)return A[z]=V,!0}else if(ArrayBuffer.isView(V))return!0;else if(y.equals(V)===!1)return y.copy(V),!0}return!1}function D(O){let B=O.uniforms,_=0,A=16;for(let z=0,y=B.length;z<y;z++){let k=Array.isArray(B[z])?B[z]:[B[z]];for(let f=0,s=k.length;f<s;f++){let j=k[f],p=Array.isArray(j.value)?j.value:[j.value];for(let e=0,n=p.length;e<n;e++){let r=p[e],u=E(r),x=_%A,K0=x%u.boundary,R0=x+K0;if(_+=K0,R0!==0&&A-R0<u.storage)_+=A-R0;j.__data=new Float32Array(u.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=_,_+=u.storage}}}let V=_%A;if(V>0)_+=A-V;return O.__size=_,O.__cache={},this}function E(O){let B={boundary:0,storage:0};if(typeof O==="number"||typeof O==="boolean")B.boundary=4,B.storage=4;else if(O.isVector2)B.boundary=8,B.storage=8;else if(O.isVector3||O.isColor)B.boundary=16,B.storage=12;else if(O.isVector4)B.boundary=16,B.storage=16;else if(O.isMatrix3)B.boundary=48,B.storage=48;else if(O.isMatrix4)B.boundary=64,B.storage=64;else if(O.isTexture)H9("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(O))B.boundary=16,B.storage=O.byteLength;else H9("WebGLRenderer: Unsupported uniform value type.",O);return B}function I(O){let B=O.target;B.removeEventListener("dispose",I);let _=H.indexOf(B.__bindingPointIndex);H.splice(_,1),J.deleteBuffer(K[B.id]),delete K[B.id],delete U[B.id]}function C(){for(let O in K)J.deleteBuffer(K[O]);H=[],K={},U={}}return{bind:W,update:G,dispose:C}}var KE=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),t8=null;function UE(){if(t8===null)t8=new uJ(KE,16,16,Y6,P7),t8.name="DFG_LUT",t8.minFilter=$8,t8.magFilter=$8,t8.wrapS=RZ,t8.wrapT=RZ,t8.generateMipmaps=!1,t8.needsUpdate=!0;return t8}class E8{constructor(J={}){let{canvas:$=m5(),context:Q=null,depth:Z=!0,stencil:K=!1,alpha:U=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:W=!1,powerPreference:G="default",failIfMajorPerformanceCaveat:N=!1,reversedDepthBuffer:q=!1,outputBufferType:X=j8}=J;this.isWebGLRenderer=!0;let F;if(Q!==null){if(typeof WebGLRenderingContext<"u"&&Q instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=Q.getContextAttributes().alpha}else F=U;let R=X,M=new Set([aK,oK,sK]),D=new Set([j8,pJ,i$,r6,nK,iK]),E=new Uint32Array(4),I=new Int32Array(4),C=new v,O=null,B=null,_=[],A=[],V=null;this.domElement=$,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=S8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let z=this,y=!1,k=null,f=null,s=null,j=null;this._outputColorSpace=V7;let p=0,e=0,n=null,r=-1,u=null,x=new N7,K0=new N7,R0=null,T0=new D0(0),l=0,F0=$.width,i=$.height,N0=1,G0=null,c=null,P0=new N7(0,0,F0,i),J0=new N7(0,0,F0,i),m0=!1,Z0=new t$,O0=!1,_0=!1,z0=new h9,S0=new v,J9=new N7,K9={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},E9=!1;function O9(){return n===null?N0:1}let b=Q;function t9(T,m){return $.getContext(T,m)}let z9,C9,S,P,g,$0,M0,A0,k0,W0,E0,u0,$9,f0,L0,U9,G9,m9,d,j0,X0,v0,d0;try{let T={alpha:!0,depth:Z,stencil:K,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:W,powerPreference:G,failIfMajorPerformanceCaveat:N};if("setAttribute"in $)$.setAttribute("data-engine",`three.js r${iY}`);if($.addEventListener("webglcontextlost",R9,!1),$.addEventListener("webglcontextrestored",K7,!1),$.addEventListener("webglcontextcreationerror",n9,!1),b===null){if(b=t9("webgl2",T),b===null)if(t9("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}V0()}catch(T){throw $.removeEventListener("webglcontextlost",R9,!1),$.removeEventListener("webglcontextrestored",K7,!1),$.removeEventListener("webglcontextcreationerror",n9,!1),N9("WebGLRenderer: "+T.message),T}function V0(){if(z9=new qD(b),z9.init(),X0=new t1(b,z9),C9=new QD(b,z9,J,X0),S=new a1(b,z9),C9.reversedDepthBuffer&&q)S.buffers.depth.setReversed(!0);f=b.createFramebuffer(),s=b.createFramebuffer(),j=b.createFramebuffer(),P=new ED(b),g=new b1,$0=new r1(b,z9,S,g,C9,X0,P),M0=new XD(z),A0=new RX(b),v0=new JD(b,A0),k0=new FD(b,A0,P,v0),W0=new RD(b,k0,A0,v0,P),m9=new OD(b,C9,$0),L0=new ZD(g),E0=new y1(z,M0,z9,C9,v0,L0),u0=new QE(z,g),$9=new h1,f0=new l1(z9),G9=new eF(z,M0,S,W0,F,Y),U9=new o1(z,W0,C9),d0=new ZE(b,P,C9,S),d=new $D(b,z9,P),j0=new DD(b,z9,P),P.programs=E0.programs,z.capabilities=C9,z.extensions=z9,z.properties=g,z.renderLists=$9,z.shadowMap=U9,z.state=S,z.info=P}if(R!==j8)V=new VD(R,$.width,$.height,H,Z,K);let x0=new hW(z,b);this.xr=x0,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){let T=z9.get("WEBGL_lose_context");if(T)T.loseContext()},this.forceContextRestore=function(){let T=z9.get("WEBGL_lose_context");if(T)T.restoreContext()},this.getPixelRatio=function(){return N0},this.setPixelRatio=function(T){if(T===void 0)return;N0=T,this.setSize(F0,i,!1)},this.getSize=function(T){return T.set(F0,i)},this.setSize=function(T,m,Q0=!0){if(x0.isPresenting){H9("WebGLRenderer: Can't change size while VR device is presenting.");return}if(F0=T,i=m,$.width=Math.floor(T*N0),$.height=Math.floor(m*N0),Q0===!0)$.style.width=T+"px",$.style.height=m+"px";if(V!==null)V.setSize($.width,$.height);this.setViewport(0,0,T,m)},this.getDrawingBufferSize=function(T){return T.set(F0*N0,i*N0).floor()},this.setDrawingBufferSize=function(T,m,Q0){F0=T,i=m,N0=Q0,$.width=Math.floor(T*Q0),$.height=Math.floor(m*Q0),this.setViewport(0,0,T,m)},this.setEffects=function(T){if(R===j8){N9("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let m=0;m<T.length;m++)if(T[m].isOutputPass===!0){H9("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}V.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(x)},this.getViewport=function(T){return T.copy(P0)},this.setViewport=function(T,m,Q0,o){if(T.isVector4)P0.set(T.x,T.y,T.z,T.w);else P0.set(T,m,Q0,o);S.viewport(x.copy(P0).multiplyScalar(N0).round())},this.getScissor=function(T){return T.copy(J0)},this.setScissor=function(T,m,Q0,o){if(T.isVector4)J0.set(T.x,T.y,T.z,T.w);else J0.set(T,m,Q0,o);S.scissor(K0.copy(J0).multiplyScalar(N0).round())},this.getScissorTest=function(){return m0},this.setScissorTest=function(T){S.setScissorTest(m0=T)},this.setOpaqueSort=function(T){G0=T},this.setTransparentSort=function(T){c=T},this.getClearColor=function(T){return T.copy(G9.getClearColor())},this.setClearColor=function(){G9.setClearColor(...arguments)},this.getClearAlpha=function(){return G9.getClearAlpha()},this.setClearAlpha=function(){G9.setClearAlpha(...arguments)},this.clear=function(T=!0,m=!0,Q0=!0){let o=0;if(T){let a=!1;if(n!==null){let g0=n.texture.format;a=M.has(g0)}if(a){let g0=n.texture.type,c0=D.has(g0),h0=G9.getClearColor(),s0=G9.getClearAlpha(),r0=h0.r,_9=h0.g,T9=h0.b;if(c0)E[0]=r0,E[1]=_9,E[2]=T9,E[3]=s0,b.clearBufferuiv(b.COLOR,0,E);else I[0]=r0,I[1]=_9,I[2]=T9,I[3]=s0,b.clearBufferiv(b.COLOR,0,I)}else o|=b.COLOR_BUFFER_BIT}if(m)o|=b.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(Q0)o|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(o!==0)b.clear(o)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),k=T},this.dispose=function(){$.removeEventListener("webglcontextlost",R9,!1),$.removeEventListener("webglcontextrestored",K7,!1),$.removeEventListener("webglcontextcreationerror",n9,!1),G9.dispose(),$9.dispose(),f0.dispose(),g.dispose(),M0.dispose(),W0.dispose(),v0.dispose(),d0.dispose(),E0.dispose(),x0.dispose(),x0.removeEventListener("sessionstart",rH),x0.removeEventListener("sessionend",tH),oJ.stop()};function R9(T){T.preventDefault(),j$("WebGLRenderer: Context Lost."),y=!0}function K7(){j$("WebGLRenderer: Context Restored."),y=!1;let T=P.autoReset,m=U9.enabled,Q0=U9.autoUpdate,o=U9.needsUpdate,a=U9.type;V0(),P.autoReset=T,U9.enabled=m,U9.autoUpdate=Q0,U9.needsUpdate=o,U9.type=a}function n9(T){N9("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function l8(T){let m=T.target;m.removeEventListener("dispose",l8),UJ(m)}function UJ(T){pG(T),g.remove(T)}function pG(T){let m=g.get(T).programs;if(m!==void 0){if(m.forEach(function(Q0){E0.releaseProgram(Q0)}),T.isShaderMaterial)E0.releaseShaderCache(T)}}this.renderBufferDirect=function(T,m,Q0,o,a,g0){if(m===null)m=K9;let c0=a.isMesh&&a.matrixWorld.determinantAffine()<0,h0=dG(T,m,Q0,o,a);S.setMaterial(o,c0);let s0=Q0.index,r0=1;if(o.wireframe===!0){if(s0=k0.getWireframeAttribute(Q0),s0===void 0)return;r0=2}let _9=Q0.drawRange,T9=Q0.attributes.position,o0=_9.start*r0,i9=(_9.start+_9.count)*r0;if(g0!==null)o0=Math.max(o0,g0.start*r0),i9=Math.min(i9,(g0.start+g0.count)*r0);if(s0!==null)o0=Math.max(o0,0),i9=Math.min(i9,s0.count);else if(T9!==void 0&&T9!==null)o0=Math.max(o0,0),i9=Math.min(i9,T9.count);let z7=i9-o0;if(z7<0||z7===1/0)return;v0.setup(a,o,h0,Q0,s0);let G7,Q7=d;if(s0!==null)G7=A0.get(s0),Q7=j0,Q7.setIndex(G7);if(a.isMesh)if(o.wireframe===!0)S.setLineWidth(o.wireframeLinewidth*O9()),Q7.setMode(b.LINES);else Q7.setMode(b.TRIANGLES);else if(a.isLine){let p7=o.linewidth;if(p7===void 0)p7=1;if(S.setLineWidth(p7*O9()),a.isLineSegments)Q7.setMode(b.LINES);else if(a.isLineLoop)Q7.setMode(b.LINE_LOOP);else Q7.setMode(b.LINE_STRIP)}else if(a.isPoints)Q7.setMode(b.POINTS);else if(a.isSprite)Q7.setMode(b.TRIANGLES);if(a.isBatchedMesh)if(!z9.get("WEBGL_multi_draw")){let{_multiDrawStarts:p7,_multiDrawCounts:l0,_multiDrawCount:l7}=a,x9=s0?A0.get(s0).bytesPerElement:1,V8=g.get(o).currentProgram.getUniforms();for(let c8=0;c8<l7;c8++)V8.setValue(b,"_gl_DrawID",c8),Q7.render(p7[c8]/x9,l0[c8])}else Q7.renderMultiDraw(a._multiDrawStarts,a._multiDrawCounts,a._multiDrawCount);else if(a.isInstancedMesh)Q7.renderInstances(o0,z7,a.count);else if(Q0.isInstancedBufferGeometry){let p7=Q0._maxInstanceCount!==void 0?Q0._maxInstanceCount:1/0,l0=Math.min(Q0.instanceCount,p7);Q7.renderInstances(o0,z7,l0)}else Q7.render(o0,z7)};function aH(T,m,Q0,o){if(k!==null&&T.isNodeMaterial)k.setObject(o,T);if(O0===!0)L0.setState(T,Q0,!1);if(T.transparent===!0&&T.side===d9&&T.forceSinglePass===!1)T.side=L7,T.needsUpdate=!0,kQ(T,m,o),T.side=s6,T.needsUpdate=!0,kQ(T,m,o),T.side=d9;else kQ(T,m,o)}this.compile=function(T,m,Q0=null){if(Q0===null)Q0=T;if(k!==null)k.renderStart(T,m,Q0);if(B=f0.get(Q0),B.init(m),A.push(B),Q0.traverseVisible(function(a){if(a.isLight&&a.layers.test(m.layers)){if(B.pushLight(a),a.castShadow)B.pushShadow(a)}}),T!==Q0)T.traverseVisible(function(a){if(a.isLight&&a.layers.test(m.layers)){if(B.pushLight(a),a.castShadow)B.pushShadow(a)}});if(B.setupLights(),k!==null)k.updateLights(B.state.lightsArray);if(_0=this.localClippingEnabled,O0=L0.init(this.clippingPlanes,_0),O0===!0)L0.setGlobalState(this.clippingPlanes,m);if(k!==null)U9.render(B.state.shadowsArray,Q0,m);let o=new Set;if(T.traverse(function(a){if(!(a.isMesh||a.isPoints||a.isLine||a.isSprite))return;let g0=a.material;if(g0)if(Array.isArray(g0))for(let c0=0;c0<g0.length;c0++){let h0=g0[c0];aH(h0,Q0,m,a),o.add(h0)}else aH(g0,Q0,m,a),o.add(g0)}),B=A.pop(),k!==null)k.renderEnd();return o},this.compileAsync=function(T,m,Q0=null){let o=this.compile(T,m,Q0);return new Promise((a)=>{function g0(){if(o.forEach(function(c0){let s0=g.get(c0).currentProgram;if(s0===void 0||s0.isReady())o.delete(c0)}),o.size===0){a(T);return}setTimeout(g0,10)}if(z9.get("KHR_parallel_shader_compile")!==null)g0();else setTimeout(g0,10)})};let GK=null;function uG(T){if(GK)GK(T)}function rH(){oJ.stop()}function tH(){oJ.start()}let oJ=new PW;if(oJ.setAnimationLoop(uG),typeof self<"u")oJ.setContext(self);this.setAnimationLoop=function(T){GK=T,x0.setAnimationLoop(T),T===null?oJ.stop():oJ.start()},x0.addEventListener("sessionstart",rH),x0.addEventListener("sessionend",tH),this.render=function(T,m){if(m!==void 0&&m.isCamera!==!0){N9("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(k!==null)k.renderStart(T,m);let Q0=x0.enabled===!0&&x0.isPresenting===!0,o=V!==null&&(n===null||Q0)&&V.begin(z,n);if(T.matrixWorldAutoUpdate===!0)T.updateMatrixWorld();if(m.parent===null&&m.matrixWorldAutoUpdate===!0)m.updateMatrixWorld();if(x0.enabled===!0&&x0.isPresenting===!0&&(V===null||V.isCompositing()===!1)){if(x0.cameraAutoUpdate===!0)x0.updateCamera(m);m=x0.getCamera()}if(T.isScene===!0)T.onBeforeRender(z,T,m,n);if(B=f0.get(T,A.length),B.init(m),B.state.textureUnits=$0.getTextureUnits(),A.push(B),z0.multiplyMatrices(m.projectionMatrix,m.matrixWorldInverse),Z0.setFromProjectionMatrix(z0,jU,m.reversedDepth),_0=this.localClippingEnabled,O0=L0.init(this.clippingPlanes,_0),O=$9.get(T,_.length),O.init(),_.push(O),x0.enabled===!0&&x0.isPresenting===!0){let c0=z.xr.getDepthSensingMesh();if(c0!==null)NK(c0,m,-1/0,z.sortObjects)}if(NK(T,m,0,z.sortObjects),O.finish(),k!==null)k.updateLights(B.state.lightsArray);if(z.sortObjects===!0)O.sort(G0,c);if(E9=x0.enabled===!1||x0.isPresenting===!1||x0.hasDepthSensing()===!1,E9)G9.addToRenderList(O,T);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(O0===!0)L0.beginShadows();let a=B.state.shadowsArray;if(U9.render(a,T,m),O0===!0)L0.endShadows();if((o&&V.hasRenderPass())===!1){let{opaque:c0,transmissive:h0}=O;if(B.setupLights(),m.isArrayCamera){let s0=m.cameras;if(h0.length>0)for(let r0=0,_9=s0.length;r0<_9;r0++){let T9=s0[r0];JY(c0,h0,T,T9)}if(E9)G9.render(T);for(let r0=0,_9=s0.length;r0<_9;r0++){let T9=s0[r0];eH(O,T,T9,T9.viewport)}}else{if(h0.length>0)JY(c0,h0,T,m);if(E9)G9.render(T);eH(O,T,m)}}if(n!==null&&e===0)$0.updateMultisampleRenderTarget(n),$0.updateRenderTargetMipmap(n);if(o)V.end(z);if(T.isScene===!0)T.onAfterRender(z,T,m);if(v0.resetDefaultState(),r=-1,u=null,A.pop(),A.length>0){if(B=A[A.length-1],$0.setTextureUnits(B.state.textureUnits),O0===!0)L0.setGlobalState(z.clippingPlanes,B.state.camera)}else B=null;if(_.pop(),_.length>0)O=_[_.length-1];else O=null;if(k!==null)k.renderEnd()};function NK(T,m,Q0,o){if(T.visible===!1)return;if(T.layers.test(m.layers)){if(T.isGroup)Q0=T.renderOrder;else if(T.isLOD){if(T.autoUpdate===!0)T.update(m)}else if(T.isLightProbeGrid)B.pushLightProbeGrid(T);else if(T.isLight){if(B.pushLight(T),T.castShadow)B.pushShadow(T)}else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Z0)){if(o)J9.setFromMatrixPosition(T.matrixWorld).applyMatrix4(z0);let c0=W0.update(T),h0=T.material;if(h0.visible)O.push(T,c0,h0,Q0,J9.z,null,m)}}else if(T.isMesh||T.isLine||T.isPoints){if(!T.frustumCulled||T.intersectsFrustum(Z0)){let c0=W0.update(T),h0=T.material;if(o){if(T.boundingSphere!==void 0){if(T.boundingSphere===null)T.computeBoundingSphere();J9.copy(T.boundingSphere.center)}else{if(c0.boundingSphere===null)c0.computeBoundingSphere();J9.copy(c0.boundingSphere.center)}J9.applyMatrix4(T.matrixWorld).applyMatrix4(z0)}if(Array.isArray(h0)){let s0=c0.groups;for(let r0=0,_9=s0.length;r0<_9;r0++){let T9=s0[r0],o0=h0[T9.materialIndex];if(o0&&o0.visible)O.push(T,c0,o0,Q0,J9.z,T9,m)}}else if(h0.visible)O.push(T,c0,h0,Q0,J9.z,null,m)}}}let g0=T.children;for(let c0=0,h0=g0.length;c0<h0;c0++)NK(g0[c0],m,Q0,o)}function eH(T,m,Q0,o){let{opaque:a,transmissive:g0,transparent:c0}=T;if(B.setupLightsView(Q0),O0===!0)L0.setGlobalState(z.clippingPlanes,Q0);if(o)S.viewport(x.copy(o));if(a.length>0)SQ(a,m,Q0);if(g0.length>0)SQ(g0,m,Q0);if(c0.length>0)SQ(c0,m,Q0);S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function JY(T,m,Q0,o){if((Q0.isScene===!0?Q0.overrideMaterial:null)!==null)return;if(B.state.transmissionRenderTarget[o.id]===void 0){let o0=z9.has("EXT_color_buffer_half_float")||z9.has("EXT_color_buffer_float");B.state.transmissionRenderTarget[o.id]=new F7(1,1,{generateMipmaps:!0,type:o0?P7:j8,minFilter:K6,samples:Math.max(4,C9.samples),stencilBuffer:K,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:A9.workingColorSpace})}let g0=B.state.transmissionRenderTarget[o.id],c0=o.viewport||x;g0.setSize(c0.z*z.transmissionResolutionScale,c0.w*z.transmissionResolutionScale);let h0=z.getRenderTarget(),s0=z.getActiveCubeFace(),r0=z.getActiveMipmapLevel();if(z.setRenderTarget(g0),z.getClearColor(T0),l=z.getClearAlpha(),l<1)z.setClearColor(16777215,0.5);if(z.clear(),E9)G9.render(Q0);let _9=z.toneMapping;z.toneMapping=S8;let T9=o.viewport;if(o.viewport!==void 0)o.viewport=void 0;if(B.setupLightsView(o),O0===!0)L0.setGlobalState(z.clippingPlanes,o);if(SQ(T,Q0,o),$0.updateMultisampleRenderTarget(g0),$0.updateRenderTargetMipmap(g0),z9.has("WEBGL_multisampled_render_to_texture")===!1){let o0=!1;for(let i9=0,z7=m.length;i9<z7;i9++){let G7=m[i9],{object:Q7,geometry:p7,material:l0,group:l7}=G7;if(l0.side===d9&&Q7.layers.test(o.layers)){let x9=l0.side;l0.side=L7,l0.needsUpdate=!0,$Y(Q7,Q0,o,p7,l0,l7),l0.side=x9,l0.needsUpdate=!0,o0=!0}}if(o0===!0)$0.updateMultisampleRenderTarget(g0),$0.updateRenderTargetMipmap(g0)}if(z.setRenderTarget(h0,s0,r0),z.setClearColor(T0,l),T9!==void 0)o.viewport=T9;z.toneMapping=_9}function SQ(T,m,Q0){let o=m.isScene===!0?m.overrideMaterial:null;for(let a=0,g0=T.length;a<g0;a++){let c0=T[a],{object:h0,geometry:s0,group:r0}=c0,_9=c0.material;if(_9.allowOverride===!0&&o!==null)_9=o;if(h0.layers.test(Q0.layers))$Y(h0,m,Q0,s0,_9,r0)}}function $Y(T,m,Q0,o,a,g0){if(k!==null&&a.isNodeMaterial)k.setObject(T,a);if(T.onBeforeRender(z,m,Q0,o,a,g0),T.modelViewMatrix.multiplyMatrices(Q0.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),a.onBeforeRender(z,m,Q0,o,T,g0),a.transparent===!0&&a.side===d9&&a.forceSinglePass===!1)a.side=L7,a.needsUpdate=!0,z.renderBufferDirect(Q0,m,o,a,T,g0),a.side=s6,a.needsUpdate=!0,z.renderBufferDirect(Q0,m,o,a,T,g0),a.side=d9;else z.renderBufferDirect(Q0,m,o,a,T,g0);T.onAfterRender(z,m,Q0,o,a,g0)}function kQ(T,m,Q0){if(m.isScene!==!0)m=K9;let o=g.get(T),a=B.state.lights,g0=B.state.shadowsArray,c0=a.state.version,h0=E0.getParameters(T,a.state,g0,m,Q0,B.state.lightProbeGridArray),s0=E0.getProgramCacheKey(h0),r0=o.programs;o.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?m.environment:null,o.fog=m.fog;let _9=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;if(o.envMap=M0.get(T.envMap||o.environment,_9),o.envMapRotation=o.environment!==null&&T.envMap===null?m.environmentRotation:T.envMapRotation,r0===void 0)T.addEventListener("dispose",l8),r0=new Map,o.programs=r0;let T9=r0.get(s0);if(T9!==void 0){if(o.currentProgram===T9&&o.lightsStateVersion===c0)return ZY(T,h0),T9}else{if(h0.uniforms=E0.getUniforms(T),k!==null&&T.isNodeMaterial)k.build(T,Q0,h0);T.onBeforeCompile(h0,z),T9=E0.acquireProgram(h0,s0),r0.set(s0,T9),o.uniforms=h0.uniforms}let o0=o.uniforms;if(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)o0.clippingPlanes=L0.uniform;if(ZY(T,h0),o.needsLights=cG(T),o.lightsStateVersion=c0,o.needsLights)o0.ambientLightColor.value=a.state.ambient,o0.lightProbe.value=a.state.probe,o0.sunLights.value=a.state.sun,o0.sunLightShadows.value=a.state.sunShadow,o0.directionalLights.value=a.state.directional,o0.directionalLightShadows.value=a.state.directionalShadow,o0.spotLights.value=a.state.spot,o0.spotLightShadows.value=a.state.spotShadow,o0.rectAreaLights.value=a.state.rectArea,o0.ltc_1.value=a.state.rectAreaLTC1,o0.ltc_2.value=a.state.rectAreaLTC2,o0.pointLights.value=a.state.point,o0.pointLightShadows.value=a.state.pointShadow,o0.hemisphereLights.value=a.state.hemi,o0.sunShadowMatrix.value=a.state.sunShadowMatrix,o0.sunShadowCascade.value=a.state.sunShadowCascade,o0.directionalShadowMatrix.value=a.state.directionalShadowMatrix,o0.spotLightMatrix.value=a.state.spotLightMatrix,o0.spotLightMap.value=a.state.spotLightMap,o0.pointShadowMatrix.value=a.state.pointShadowMatrix;return o.lightProbeGrid=B.state.lightProbeGridArray.length>0,o.currentProgram=T9,o.uniformsList=null,T9}function QY(T){if(T.uniformsList===null){let m=T.currentProgram.getUniforms();T.uniformsList=XQ.seqWithValue(m.seq,T.uniforms)}return T.uniformsList}function ZY(T,m){let Q0=g.get(T);Q0.outputColorSpace=m.outputColorSpace,Q0.batching=m.batching,Q0.batchingColor=m.batchingColor,Q0.instancing=m.instancing,Q0.instancingColor=m.instancingColor,Q0.instancingMorph=m.instancingMorph,Q0.skinning=m.skinning,Q0.morphTargets=m.morphTargets,Q0.morphNormals=m.morphNormals,Q0.morphColors=m.morphColors,Q0.morphTargetsCount=m.morphTargetsCount,Q0.numClippingPlanes=m.numClippingPlanes,Q0.numIntersection=m.numClipIntersection,Q0.vertexAlphas=m.vertexAlphas,Q0.vertexTangents=m.vertexTangents,Q0.toneMapping=m.toneMapping}function mG(T,m){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;C.setFromMatrixPosition(m.matrixWorld);for(let Q0=0,o=T.length;Q0<o;Q0++){let a=T[Q0];if(a.texture!==null&&a.boundingBox.containsPoint(C))return a}return null}function dG(T,m,Q0,o,a){if(m.isScene!==!0)m=K9;$0.resetTextureUnits();let g0=m.fog,c0=o.isMeshStandardMaterial||o.isMeshLambertMaterial||o.isMeshPhongMaterial?m.environment:null,h0=n===null?z.outputColorSpace:n.isXRRenderTarget===!0?n.texture.colorSpace:A9.workingColorSpace,s0=o.isMeshStandardMaterial||o.isMeshLambertMaterial&&!o.envMap||o.isMeshPhongMaterial&&!o.envMap,r0=M0.get(o.envMap||c0,s0),_9=o.vertexColors===!0&&!!Q0.attributes.color&&Q0.attributes.color.itemSize===4,T9=!!Q0.attributes.tangent&&(!!o.normalMap||o.anisotropy>0),o0=!!Q0.morphAttributes.position,i9=!!Q0.morphAttributes.normal,z7=!!Q0.morphAttributes.color,G7=S8;if(o.toneMapped){if(n===null||n.isXRRenderTarget===!0)G7=z.toneMapping}let Q7=Q0.morphAttributes.position||Q0.morphAttributes.normal||Q0.morphAttributes.color,p7=Q7!==void 0?Q7.length:0,l0=g.get(o),l7=B.state.lights;if(O0===!0){if(_0===!0||T!==u){let U7=T===u&&o.id===r;L0.setState(o,T,U7)}}let x9=!1;if(o.version===l0.__version){if(l0.needsLights&&l0.lightsStateVersion!==l7.state.version)x9=!0;else if(l0.outputColorSpace!==h0)x9=!0;else if(a.isBatchedMesh&&l0.batching===!1)x9=!0;else if(!a.isBatchedMesh&&l0.batching===!0)x9=!0;else if(a.isBatchedMesh&&l0.batchingColor===!0&&a._colorsTexture===null)x9=!0;else if(a.isBatchedMesh&&l0.batchingColor===!1&&a._colorsTexture!==null)x9=!0;else if(a.isInstancedMesh&&l0.instancing===!1)x9=!0;else if(!a.isInstancedMesh&&l0.instancing===!0)x9=!0;else if(a.isSkinnedMesh&&l0.skinning===!1)x9=!0;else if(!a.isSkinnedMesh&&l0.skinning===!0)x9=!0;else if(a.isInstancedMesh&&l0.instancingColor===!0&&a.instanceColor===null)x9=!0;else if(a.isInstancedMesh&&l0.instancingColor===!1&&a.instanceColor!==null)x9=!0;else if(a.isInstancedMesh&&l0.instancingMorph===!0&&a.morphTexture===null)x9=!0;else if(a.isInstancedMesh&&l0.instancingMorph===!1&&a.morphTexture!==null)x9=!0;else if(l0.envMap!==r0)x9=!0;else if(o.fog===!0&&l0.fog!==g0)x9=!0;else if(l0.numClippingPlanes!==void 0&&(l0.numClippingPlanes!==L0.numPlanes||l0.numIntersection!==L0.numIntersection))x9=!0;else if(l0.vertexAlphas!==_9)x9=!0;else if(l0.vertexTangents!==T9)x9=!0;else if(l0.morphTargets!==o0)x9=!0;else if(l0.morphNormals!==i9)x9=!0;else if(l0.morphColors!==z7)x9=!0;else if(l0.toneMapping!==G7)x9=!0;else if(l0.morphTargetsCount!==p7)x9=!0;else if(!!l0.lightProbeGrid!==B.state.lightProbeGridArray.length>0)x9=!0}else x9=!0,l0.__version=o.version;let V8=l0.currentProgram;if(x9===!0){if(V8=kQ(o,m,a),k&&o.isNodeMaterial)k.onUpdateProgram(o,V8,l0)}let c8=!1,kJ=!1,z6=!1,e9=V8.getUniforms(),B7=l0.uniforms;if(S.useProgram(V8.program))c8=!0,kJ=!0,z6=!0;if(o.id!==r)r=o.id,kJ=!0;if(l0.needsLights){let U7=mG(B.state.lightProbeGridArray,a);if(l0.lightProbeGrid!==U7)l0.lightProbeGrid=U7,kJ=!0}if(c8||u!==T){if(S.buffers.depth.getReversed()&&T.reversedDepth!==!0)T._reversedDepth=!0,T.updateProjectionMatrix();e9.setValue(b,"projectionMatrix",T.projectionMatrix),e9.setValue(b,"viewMatrix",T.matrixWorldInverse);let vJ=e9.map.cameraPosition;if(vJ!==void 0)vJ.setValue(b,S0.setFromMatrixPosition(T.matrixWorld));if(C9.logarithmicDepthBuffer)e9.setValue(b,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2));if(o.isMeshPhongMaterial||o.isMeshToonMaterial||o.isMeshLambertMaterial||o.isMeshBasicMaterial||o.isMeshStandardMaterial||o.isShaderMaterial)e9.setValue(b,"isOrthographic",T.isOrthographicCamera===!0);if(u!==T)u=T,kJ=!0,z6=!0}if(l0.needsLights){if(l7.state.sunShadowMap.length>0)e9.setValue(b,"sunShadowMap",l7.state.sunShadowMap,$0);if(l7.state.directionalShadowMap.length>0)e9.setValue(b,"directionalShadowMap",l7.state.directionalShadowMap,$0);if(l7.state.spotShadowMap.length>0)e9.setValue(b,"spotShadowMap",l7.state.spotShadowMap,$0);if(l7.state.pointShadowMap.length>0)e9.setValue(b,"pointShadowMap",l7.state.pointShadowMap,$0)}if(a.isSkinnedMesh){e9.setOptional(b,a,"bindMatrix"),e9.setOptional(b,a,"bindMatrixInverse");let U7=a.skeleton;if(U7){if(U7.boneTexture===null)U7.computeBoneTexture();e9.setValue(b,"boneTexture",U7.boneTexture,$0)}}if(a.isBatchedMesh){if(e9.setOptional(b,a,"batchingTexture"),e9.setValue(b,"batchingTexture",a._matricesTexture,$0),e9.setOptional(b,a,"batchingIdTexture"),e9.setValue(b,"batchingIdTexture",a._indirectTexture,$0),e9.setOptional(b,a,"batchingColorTexture"),a._colorsTexture!==null)e9.setValue(b,"batchingColorTexture",a._colorsTexture,$0)}let jJ=Q0.morphAttributes;if(jJ.position!==void 0||jJ.normal!==void 0||jJ.color!==void 0)m9.update(a,Q0,V8);if(kJ||l0.receiveShadow!==a.receiveShadow)l0.receiveShadow=a.receiveShadow,e9.setValue(b,"receiveShadow",a.receiveShadow);if((o.isMeshStandardMaterial||o.isMeshLambertMaterial||o.isMeshPhongMaterial)&&o.envMap===null&&m.environment!==null)B7.envMapIntensity.value=m.environmentIntensity;if(B7.dfgLUT!==void 0)B7.dfgLUT.value=UE();if(kJ){if(e9.setValue(b,"toneMappingExposure",z.toneMappingExposure),l0.needsLights)lG(B7,z6);if(g0&&o.fog===!0)u0.refreshFogUniforms(B7,g0);if(u0.refreshMaterialUniforms(B7,o,N0,i,B.state.transmissionRenderTarget[T.id]),l0.needsLights&&l0.lightProbeGrid){let U7=l0.lightProbeGrid;B7.probesSH.value=U7.texture,B7.probesMin.value.copy(U7.boundingBox.min),B7.probesMax.value.copy(U7.boundingBox.max),B7.probesResolution.value.copy(U7.resolution)}XQ.upload(b,QY(l0),B7,$0)}if(o.isShaderMaterial&&o.uniformsNeedUpdate===!0)XQ.upload(b,QY(l0),B7,$0),o.uniformsNeedUpdate=!1;if(o.isSpriteMaterial)e9.setValue(b,"center",a.center);if(e9.setValue(b,"modelViewMatrix",a.modelViewMatrix),e9.setValue(b,"normalMatrix",a.normalMatrix),e9.setValue(b,"modelMatrix",a.matrixWorld),o.uniformsGroups!==void 0){let U7=o.uniformsGroups;for(let vJ=0,A6=U7.length;vJ<A6;vJ++){let UY=U7[vJ];d0.update(UY,V8),d0.bind(UY,V8)}}return V8}function lG(T,m){T.ambientLightColor.needsUpdate=m,T.lightProbe.needsUpdate=m,T.sunLights.needsUpdate=m,T.sunLightShadows.needsUpdate=m,T.directionalLights.needsUpdate=m,T.directionalLightShadows.needsUpdate=m,T.pointLights.needsUpdate=m,T.pointLightShadows.needsUpdate=m,T.spotLights.needsUpdate=m,T.spotLightShadows.needsUpdate=m,T.rectAreaLights.needsUpdate=m,T.hemisphereLights.needsUpdate=m}function cG(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return p},this.getActiveMipmapLevel=function(){return e},this.getRenderTarget=function(){return n},this.setRenderTargetTextures=function(T,m,Q0){let o=g.get(T);if(o.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,o.__autoAllocateDepthBuffer===!1)o.__useRenderToTexture=!1;g.get(T.texture).__webglTexture=m,g.get(T.depthTexture).__webglTexture=o.__autoAllocateDepthBuffer?void 0:Q0,o.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,m){let Q0=g.get(T);Q0.__webglFramebuffer=m,Q0.__useDefaultFramebuffer=m===void 0},this.setRenderTarget=function(T,m=0,Q0=0){n=T,p=m,e=Q0;let o=null,a=!1,g0=!1;if(T){let h0=g.get(T);if(h0.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(b.FRAMEBUFFER,h0.__webglFramebuffer),x.copy(T.viewport),K0.copy(T.scissor),R0=T.scissorTest,S.viewport(x),S.scissor(K0),S.setScissorTest(R0),r=-1;return}else if(h0.__webglFramebuffer===void 0)$0.setupRenderTarget(T);else if(h0.__hasExternalTextures)$0.rebindTextures(T,g.get(T.texture).__webglTexture,g.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let _9=T.depthTexture;if(h0.__boundDepthTexture!==_9){if(_9!==null&&g.has(_9)&&(T.width!==_9.image.width||T.height!==_9.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$0.setupDepthRenderbuffer(T)}}let s0=T.texture;if(s0.isData3DTexture||s0.isDataArrayTexture||s0.isCompressedArrayTexture)g0=!0;let r0=g.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget){if(Array.isArray(r0[m]))o=r0[m][Q0];else o=r0[m];a=!0}else if(T.samples>0&&$0.useMultisampledRTT(T)===!1)o=g.get(T).__webglMultisampledFramebuffer;else if(Array.isArray(r0))o=r0[Q0];else o=r0;x.copy(T.viewport),K0.copy(T.scissor),R0=T.scissorTest}else x.copy(P0).multiplyScalar(N0).floor(),K0.copy(J0).multiplyScalar(N0).floor(),R0=m0;if(Q0!==0)o=f;if(S.bindFramebuffer(b.FRAMEBUFFER,o))S.drawBuffers(T,o);if(S.viewport(x),S.scissor(K0),S.setScissorTest(R0),a){let h0=g.get(T.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+m,h0.__webglTexture,Q0)}else if(g0){let h0=m;for(let s0=0;s0<T.textures.length;s0++){let r0=g.get(T.textures[s0]);b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0+s0,r0.__webglTexture,Q0,h0)}}else if(T!==null&&Q0!==0){let h0=g.get(T.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,h0.__webglTexture,Q0)}r=-1};function KY(T){let m=g.get(T);if(m.__readFormat!==T.format||m.__readType!==T.type)m.__readFormat=T.format,m.__readType=T.type,m.__formatReadable=C9.textureFormatReadable(T.format),m.__typeReadable=C9.textureTypeReadable(T.type);return m}if(this.readRenderTargetPixels=function(T,m,Q0,o,a,g0,c0,h0=0){if(!(T&&T.isWebGLRenderTarget)){N9("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let s0=g.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&c0!==void 0)s0=s0[c0];if(s0){S.bindFramebuffer(b.FRAMEBUFFER,s0);try{let r0=T.textures[h0],_9=r0.format,T9=r0.type;if(T.textures.length>1)b.readBuffer(b.COLOR_ATTACHMENT0+h0);let o0=KY(r0);if(o0.__formatReadable===!1){N9("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(o0.__typeReadable===!1){N9("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(m>=0&&m<=T.width-o&&(Q0>=0&&Q0<=T.height-a))b.readPixels(m,Q0,o,a,X0.convert(_9),X0.convert(T9),g0)}finally{let r0=n!==null?g.get(n).__webglFramebuffer:null;S.bindFramebuffer(b.FRAMEBUFFER,r0)}}},this.readRenderTargetPixelsAsync=async function(T,m,Q0,o,a,g0,c0,h0=0){if(!(T&&T.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let s0=g.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&c0!==void 0)s0=s0[c0];if(s0)if(m>=0&&m<=T.width-o&&(Q0>=0&&Q0<=T.height-a)){S.bindFramebuffer(b.FRAMEBUFFER,s0);let r0=T.textures[h0],_9=r0.format,T9=r0.type;if(T.textures.length>1)b.readBuffer(b.COLOR_ATTACHMENT0+h0);let o0=KY(r0);if(o0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(o0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let i9=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,i9),b.bufferData(b.PIXEL_PACK_BUFFER,g0.byteLength,b.STREAM_READ),b.readPixels(m,Q0,o,a,X0.convert(_9),X0.convert(T9),0),b.bindBuffer(b.PIXEL_PACK_BUFFER,null);let z7=n!==null?g.get(n).__webglFramebuffer:null;S.bindFramebuffer(b.FRAMEBUFFER,z7);let G7=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await l5(b,G7,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,i9),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,g0),b.bindBuffer(b.PIXEL_PACK_BUFFER,null),b.deleteBuffer(i9),b.deleteSync(G7),g0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,m=null,Q0=0){let o=Math.pow(2,-Q0),a=Math.floor(T.image.width*o),g0=Math.floor(T.image.height*o),c0=m!==null?m.x:0,h0=m!==null?m.y:0;$0.setTexture2D(T,0),b.copyTexSubImage2D(b.TEXTURE_2D,Q0,0,0,c0,h0,a,g0),S.unbindTexture()},this.copyTextureToTexture=function(T,m,Q0=null,o=null,a=0,g0=0){let c0,h0,s0,r0,_9,T9,o0,i9,z7,G7=T.isCompressedTexture?T.mipmaps[g0]:T.image;if(Q0!==null)c0=Q0.max.x-Q0.min.x,h0=Q0.max.y-Q0.min.y,s0=Q0.isBox3?Q0.max.z-Q0.min.z:1,r0=Q0.min.x,_9=Q0.min.y,T9=Q0.isBox3?Q0.min.z:0;else{let B7=Math.pow(2,-a);if(c0=Math.floor(G7.width*B7),h0=Math.floor(G7.height*B7),T.isDataArrayTexture)s0=G7.depth;else if(T.isData3DTexture)s0=Math.floor(G7.depth*B7);else s0=1;r0=0,_9=0,T9=0}if(o!==null)o0=o.x,i9=o.y,z7=o.z;else o0=0,i9=0,z7=0;let Q7=X0.convert(m.format),p7=X0.convert(m.type),l0;if(m.isData3DTexture)$0.setTexture3D(m,0),l0=b.TEXTURE_3D;else if(m.isDataArrayTexture||m.isCompressedArrayTexture)$0.setTexture2DArray(m,0),l0=b.TEXTURE_2D_ARRAY;else $0.setTexture2D(m,0),l0=b.TEXTURE_2D;S.activeTexture(b.TEXTURE0),S.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,m.flipY),S.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,m.premultiplyAlpha),S.pixelStorei(b.UNPACK_ALIGNMENT,m.unpackAlignment);let l7=S.getParameter(b.UNPACK_ROW_LENGTH),x9=S.getParameter(b.UNPACK_IMAGE_HEIGHT),V8=S.getParameter(b.UNPACK_SKIP_PIXELS),c8=S.getParameter(b.UNPACK_SKIP_ROWS),kJ=S.getParameter(b.UNPACK_SKIP_IMAGES);S.pixelStorei(b.UNPACK_ROW_LENGTH,G7.width),S.pixelStorei(b.UNPACK_IMAGE_HEIGHT,G7.height),S.pixelStorei(b.UNPACK_SKIP_PIXELS,r0),S.pixelStorei(b.UNPACK_SKIP_ROWS,_9),S.pixelStorei(b.UNPACK_SKIP_IMAGES,T9);let z6=T.isDataArrayTexture||T.isData3DTexture,e9=m.isDataArrayTexture||m.isData3DTexture;if(T.isDepthTexture){let B7=g.get(T),jJ=g.get(m),U7=g.get(B7.__renderTarget),vJ=g.get(jJ.__renderTarget);S.bindFramebuffer(b.READ_FRAMEBUFFER,U7.__webglFramebuffer),S.bindFramebuffer(b.DRAW_FRAMEBUFFER,vJ.__webglFramebuffer);for(let A6=0;A6<s0;A6++){if(z6)b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,g.get(T).__webglTexture,a,T9+A6),b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,g.get(m).__webglTexture,g0,z7+A6);b.blitFramebuffer(r0,_9,c0,h0,o0,i9,c0,h0,b.DEPTH_BUFFER_BIT,b.NEAREST)}S.bindFramebuffer(b.READ_FRAMEBUFFER,null),S.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(a!==0||T.isRenderTargetTexture||g.has(T)){let B7=g.get(T),jJ=g.get(m);S.bindFramebuffer(b.READ_FRAMEBUFFER,s),S.bindFramebuffer(b.DRAW_FRAMEBUFFER,j);for(let U7=0;U7<s0;U7++){if(z6)b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,B7.__webglTexture,a,T9+U7);else b.framebufferTexture2D(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,B7.__webglTexture,a);if(e9)b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,jJ.__webglTexture,g0,z7+U7);else b.framebufferTexture2D(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,jJ.__webglTexture,g0);if(a!==0)b.blitFramebuffer(r0,_9,c0,h0,o0,i9,c0,h0,b.COLOR_BUFFER_BIT,b.NEAREST);else if(e9)b.copyTexSubImage3D(l0,g0,o0,i9,z7+U7,r0,_9,c0,h0);else b.copyTexSubImage2D(l0,g0,o0,i9,r0,_9,c0,h0)}S.bindFramebuffer(b.READ_FRAMEBUFFER,null),S.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(e9)if(T.isDataTexture||T.isData3DTexture)b.texSubImage3D(l0,g0,o0,i9,z7,c0,h0,s0,Q7,p7,G7.data);else if(m.isCompressedArrayTexture)b.compressedTexSubImage3D(l0,g0,o0,i9,z7,c0,h0,s0,Q7,G7.data);else b.texSubImage3D(l0,g0,o0,i9,z7,c0,h0,s0,Q7,p7,G7);else if(T.isDataTexture)b.texSubImage2D(b.TEXTURE_2D,g0,o0,i9,c0,h0,Q7,p7,G7.data);else if(T.isCompressedTexture)b.compressedTexSubImage2D(b.TEXTURE_2D,g0,o0,i9,G7.width,G7.height,Q7,G7.data);else b.texSubImage2D(b.TEXTURE_2D,g0,o0,i9,c0,h0,Q7,p7,G7);if(S.pixelStorei(b.UNPACK_ROW_LENGTH,l7),S.pixelStorei(b.UNPACK_IMAGE_HEIGHT,x9),S.pixelStorei(b.UNPACK_SKIP_PIXELS,V8),S.pixelStorei(b.UNPACK_SKIP_ROWS,c8),S.pixelStorei(b.UNPACK_SKIP_IMAGES,kJ),g0===0&&m.generateMipmaps)b.generateMipmap(l0);S.unbindTexture()},this.initRenderTarget=function(T){if(g.get(T).__webglFramebuffer===void 0)$0.setupRenderTarget(T)},this.initTexture=function(T){if(T.isCubeTexture)$0.setTextureCube(T,0);else if(T.isData3DTexture)$0.setTexture3D(T,0);else if(T.isDataArrayTexture||T.isCompressedArrayTexture)$0.setTexture2DArray(T,0);else $0.setTexture2D(T,0);S.unbindTexture()},this.resetState=function(){p=0,e=0,n=null,S.reset(),v0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jU}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let $=this.getContext();$.drawingBufferColorSpace=A9._getDrawingBufferColorSpace(J),$.unpackColorSpace=A9._getUnpackColorSpace()}}class H8{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}var HE=new VJ(-1,1,1,-1,0,1);class pW extends V9{constructor(){super();this.setAttribute("position",new Y9([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Y9([0,2,0,0,2,0],2))}}var YE=new pW;class _J{constructor(J){this._mesh=new h(YE,J)}dispose(){this._mesh.geometry.dispose()}render(J){J.render(this._mesh,HE)}get material(){return this._mesh.material}set material(J){this._mesh.material=J}}var qQ={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:0.025},maxblur:{value:0.01},nearClip:{value:1},farClip:{value:1000}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class VH extends H8{constructor(J,$,Q){super();this.scene=J,this.camera=$;let Z=Q.focus!==void 0?Q.focus:1,K=Q.aperture!==void 0?Q.aperture:0.025,U=Q.maxblur!==void 0?Q.maxblur:1;this._renderTargetDepth=new F7(1,1,{minFilter:n7,magFilter:n7,type:P7}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new HQ,this._materialDepth.depthPacking=CU,this._materialDepth.blending=J8;let H=F8.clone(qQ.uniforms);H.tDepth.value=this._renderTargetDepth.texture,H.focus.value=Z,H.aspect.value=$.aspect,H.aperture.value=K,H.maxblur.value=U,H.nearClip.value=$.near,H.farClip.value=$.far,this.materialBokeh=new p9({defines:Object.assign({},qQ.defines),uniforms:H,vertexShader:qQ.vertexShader,fragmentShader:qQ.fragmentShader}),this.uniforms=H,this._fsQuad=new _J(this.materialBokeh),this._oldClearColor=new D0}render(J,$,Q){this.scene.overrideMaterial=this._materialDepth,J.getClearColor(this._oldClearColor);let Z=J.getClearAlpha(),K=J.autoClear;if(J.autoClear=!1,J.setClearColor(16777215),J.setClearAlpha(1),J.setRenderTarget(this._renderTargetDepth),J.clear(),J.render(this.scene,this.camera),this.uniforms.tColor.value=Q.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget($),J.clear(),this._fsQuad.render(J);this.scene.overrideMaterial=null,J.setClearColor(this._oldClearColor),J.setClearAlpha(Z),J.autoClear=K}setSize(J,$){this.materialBokeh.uniforms.aspect.value=J/$,this._renderTargetDepth.setSize(J,$)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}}var Y$={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class O6 extends H8{constructor(J,$="tDiffuse"){super();if(this.textureID=$,this.uniforms=null,this.material=null,J instanceof p9)this.uniforms=J.uniforms,this.material=J;else if(J)this.uniforms=F8.clone(J.uniforms),this.material=new p9({name:J.name!==void 0?J.name:"unspecified",defines:Object.assign({},J.defines),uniforms:this.uniforms,vertexShader:J.vertexShader,fragmentShader:J.fragmentShader});this._fsQuad=new _J(this.material)}render(J,$,Q){if(this.uniforms[this.textureID])this.uniforms[this.textureID].value=Q.texture;if(this._fsQuad.material=this.material,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget($),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class nZ extends H8{constructor(J,$){super();this.scene=J,this.camera=$,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(J,$,Q){let Z=J.getContext(),K=J.state;K.buffers.color.setMask(!1),K.buffers.depth.setMask(!1),K.buffers.color.setLocked(!0),K.buffers.depth.setLocked(!0);let U,H;if(this.inverse)U=0,H=1;else U=1,H=0;if(K.buffers.stencil.setTest(!0),K.buffers.stencil.setOp(Z.REPLACE,Z.REPLACE,Z.REPLACE),K.buffers.stencil.setFunc(Z.ALWAYS,U,4294967295),K.buffers.stencil.setClear(H),K.buffers.stencil.setLocked(!0),J.setRenderTarget(Q),this.clear)J.clear();if(J.render(this.scene,this.camera),J.setRenderTarget($),this.clear)J.clear();J.render(this.scene,this.camera),K.buffers.color.setLocked(!1),K.buffers.depth.setLocked(!1),K.buffers.color.setMask(!0),K.buffers.depth.setMask(!0),K.buffers.stencil.setLocked(!1),K.buffers.stencil.setFunc(Z.EQUAL,1,4294967295),K.buffers.stencil.setOp(Z.KEEP,Z.KEEP,Z.KEEP),K.buffers.stencil.setLocked(!0)}}class _H extends H8{constructor(){super();this.needsSwap=!1}render(J){J.state.buffers.stencil.setLocked(!1),J.state.buffers.stencil.setTest(!1)}}class BJ{constructor(J,$){if(this.renderer=J,this._pixelRatio=J.getPixelRatio(),$===void 0){let Q=J.getSize(new q0);this._width=Q.width,this._height=Q.height,$=new F7(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:P7}),$.texture.name="EffectComposer.rt1"}else this._width=$.width,this._height=$.height;this.renderTarget1=$,this.renderTarget2=$.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new O6(Y$),this.copyPass.material.blending=J8,this.timer=new uZ}swapBuffers(){let J=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=J}addPass(J){this.passes.push(J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(J,$){this.passes.splice($,0,J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(J){let $=this.passes.indexOf(J);if($!==-1)this.passes.splice($,1)}isLastEnabledPass(J){for(let $=J+1;$<this.passes.length;$++)if(this.passes[$].enabled)return!1;return!0}render(J){if(this.timer.update(),J===void 0)J=this.timer.getDelta();let $=this.renderer.getRenderTarget(),Q=!1;for(let Z=0,K=this.passes.length;Z<K;Z++){let U=this.passes[Z];if(U.enabled===!1)continue;if(U.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(Z),U.render(this.renderer,this.writeBuffer,this.readBuffer,J,Q),U.needsSwap){if(Q){let H=this.renderer.getContext(),Y=this.renderer.state.buffers.stencil;Y.setFunc(H.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,J),Y.setFunc(H.EQUAL,1,4294967295)}this.swapBuffers()}if(nZ!==void 0){if(U instanceof nZ)Q=!0;else if(U instanceof _H)Q=!1}}this.renderer.setRenderTarget($)}reset(J){if(J===void 0){let $=this.renderer.getSize(new q0);this._pixelRatio=this.renderer.getPixelRatio(),this._width=$.width,this._height=$.height,J=this.renderTarget1.clone(),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=J,this.renderTarget2=J.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(J,$){this._width=J,this._height=$;let Q=this._width*this._pixelRatio,Z=this._height*this._pixelRatio;this.renderTarget1.setSize(Q,Z),this.renderTarget2.setSize(Q,Z);for(let K=0;K<this.passes.length;K++)this.passes[K].setSize(Q,Z)}setPixelRatio(J){this._pixelRatio=J,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}var FQ={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class IJ extends H8{constructor(){super();this.isOutputPass=!0,this.uniforms=F8.clone(FQ.uniforms),this.material=new UQ({name:FQ.name,uniforms:this.uniforms,vertexShader:FQ.vertexShader,fragmentShader:FQ.fragmentShader}),this._fsQuad=new _J(this.material),this._outputColorSpace=null,this._toneMapping=null}render(J,$,Q){if(this.uniforms.tDiffuse.value=Q.texture,this.uniforms.toneMappingExposure.value=J.toneMappingExposure,this._outputColorSpace!==J.outputColorSpace||this._toneMapping!==J.toneMapping){if(this._outputColorSpace=J.outputColorSpace,this._toneMapping=J.toneMapping,this.material.defines={},A9.getTransfer(this._outputColorSpace)===r9)this.material.defines.SRGB_TRANSFER="";if(this._toneMapping===g$)this.material.defines.LINEAR_TONE_MAPPING="";else if(this._toneMapping===p$)this.material.defines.REINHARD_TONE_MAPPING="";else if(this._toneMapping===u$)this.material.defines.CINEON_TONE_MAPPING="";else if(this._toneMapping===k8)this.material.defines.ACES_FILMIC_TONE_MAPPING="";else if(this._toneMapping===d$)this.material.defines.AGX_TONE_MAPPING="";else if(this._toneMapping===l$)this.material.defines.NEUTRAL_TONE_MAPPING="";else if(this._toneMapping===m$)this.material.defines.CUSTOM_TONE_MAPPING="";this.material.needsUpdate=!0}if(this.renderToScreen===!0)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget($),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class zJ extends H8{constructor(J,$,Q=null,Z=null,K=null){super();this.scene=J,this.camera=$,this.overrideMaterial=Q,this.clearColor=Z,this.clearAlpha=K,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new D0}render(J,$,Q){let Z=J.autoClear;J.autoClear=!1;let K,U;if(this.overrideMaterial!==null)U=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial;if(this.clearColor!==null)J.getClearColor(this._oldClearColor),J.setClearColor(this.clearColor,J.getClearAlpha());if(this.clearAlpha!==null)K=J.getClearAlpha(),J.setClearAlpha(this.clearAlpha);if(this.clearDepth==!0)J.clearDepth();if(J.setRenderTarget(this.renderToScreen?null:Q),this.clear===!0)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(J.render(this.scene,this.camera),this.clearColor!==null)J.setClearColor(this._oldClearColor);if(this.clearAlpha!==null)J.setClearAlpha(K);if(this.overrideMaterial!==null)this.scene.overrideMaterial=U;J.autoClear=Z}}var uW={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new D0(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class g8 extends H8{constructor(J,$=1,Q,Z){super();this.strength=$,this.radius=Q,this.threshold=Z,this.resolution=J!==void 0?new q0(J.x,J.y):new q0(256,256),this.clearColor=new D0(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);this.renderTargetBright=new F7(K,U,{type:P7,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let G=0;G<this.nMips;G++){let N=new F7(K,U,{type:P7,depthBuffer:!1});N.texture.name="UnrealBloomPass.h"+G,N.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(N);let q=new F7(K,U,{type:P7,depthBuffer:!1});q.texture.name="UnrealBloomPass.v"+G,q.texture.generateMipmaps=!1,this.renderTargetsVertical.push(q),K=Math.round(K/2),U=Math.round(U/2)}let H=uW;this.highPassUniforms=F8.clone(H.uniforms),this.highPassUniforms.luminosityThreshold.value=Z,this.highPassUniforms.smoothWidth.value=0.01,this.materialHighPassFilter=new p9({uniforms:this.highPassUniforms,vertexShader:H.vertexShader,fragmentShader:H.fragmentShader}),this.separableBlurMaterials=[];let Y=[6,10,14,18,22];K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);for(let G=0;G<this.nMips;G++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(Y[G])),this.separableBlurMaterials[G].uniforms.invSize.value=new q0(1/K,1/U),K=Math.round(K/2),U=Math.round(U/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=$,this.compositeMaterial.uniforms.bloomRadius.value=0.1;let W=[1,0.8,0.6,0.4,0.2];this.compositeMaterial.uniforms.bloomFactors.value=W,this.bloomTintColors=[new v(1,1,1),new v(1,1,1),new v(1,1,1),new v(1,1,1),new v(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=F8.clone(Y$.uniforms),this.blendMaterial=new p9({uniforms:this.copyUniforms,vertexShader:Y$.vertexShader,fragmentShader:Y$.fragmentShader,premultipliedAlpha:!0,blending:M7,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new D0,this._oldClearAlpha=1,this._basic=new C0,this._fsQuad=new _J(null)}dispose(){for(let J=0;J<this.renderTargetsHorizontal.length;J++)this.renderTargetsHorizontal[J].dispose();for(let J=0;J<this.renderTargetsVertical.length;J++)this.renderTargetsVertical[J].dispose();this.renderTargetBright.dispose();for(let J=0;J<this.separableBlurMaterials.length;J++)this.separableBlurMaterials[J].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(J,$){let Q=Math.round(J/2),Z=Math.round($/2);this.renderTargetBright.setSize(Q,Z);for(let K=0;K<this.nMips;K++)this.renderTargetsHorizontal[K].setSize(Q,Z),this.renderTargetsVertical[K].setSize(Q,Z),this.separableBlurMaterials[K].uniforms.invSize.value=new q0(1/Q,1/Z),Q=Math.round(Q/2),Z=Math.round(Z/2)}render(J,$,Q,Z,K){J.getClearColor(this._oldClearColor),this._oldClearAlpha=J.getClearAlpha();let U=J.autoClear;if(J.autoClear=!1,J.setClearColor(this.clearColor,0),K)J.state.buffers.stencil.setTest(!1);if(this.renderToScreen)this._fsQuad.material=this._basic,this._basic.map=Q.texture,J.setRenderTarget(null),J.clear(),this._fsQuad.render(J);this.highPassUniforms.tDiffuse.value=Q.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,J.setRenderTarget(this.renderTargetBright),J.clear(),this._fsQuad.render(J);let H=this.renderTargetBright;for(let Y=0;Y<this.nMips;Y++)this._fsQuad.material=this.separableBlurMaterials[Y],this.separableBlurMaterials[Y].uniforms.colorTexture.value=H.texture,this.separableBlurMaterials[Y].uniforms.direction.value=g8.BlurDirectionX,J.setRenderTarget(this.renderTargetsHorizontal[Y]),J.clear(),this._fsQuad.render(J),this.separableBlurMaterials[Y].uniforms.colorTexture.value=this.renderTargetsHorizontal[Y].texture,this.separableBlurMaterials[Y].uniforms.direction.value=g8.BlurDirectionY,J.setRenderTarget(this.renderTargetsVertical[Y]),J.clear(),this._fsQuad.render(J),H=this.renderTargetsVertical[Y];if(this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,J.setRenderTarget(this.renderTargetsHorizontal[0]),J.clear(),this._fsQuad.render(J),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,K)J.state.buffers.stencil.setTest(!0);if(this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget(Q),this._fsQuad.render(J);J.setClearColor(this._oldClearColor,this._oldClearAlpha),J.autoClear=U}_getSeparableBlurMaterial(J){let $=[],Q=J/3;for(let U=0;U<J;U++)$.push(0.39894*Math.exp(-0.5*U*U/(Q*Q))/Q);let Z=[],K=[];for(let U=1;U<J;U+=2){let H=$[U],Y=U+1<J?$[U+1]:0,W=H+Y;Z.push((U*H+(U+1)*Y)/W),K.push(W)}return new p9({defines:{KERNEL_PAIRS:Z.length},uniforms:{colorTexture:{value:null},invSize:{value:new q0(0.5,0.5)},direction:{value:new q0(0.5,0.5)},centerWeight:{value:$[0]},gaussianOffsets:{value:Z},gaussianWeights:{value:K}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(J){return new p9({defines:{NUM_MIPS:J},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}g8.BlurDirectionX=new q0(1,0);g8.BlurDirectionY=new q0(0,1);var DQ=0.128,WE="varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",GE=`
uniform sampler2D tDiffuse;
uniform float time, exposure, warmth, saturation, contrast, vignette, grain, aberration, halation, letterbox, fade, leak, aspect;
uniform vec3 shadows, highlights;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
vec3 sampleAb(vec2 uv) {
  vec2 d = (uv - 0.5) * aberration * 0.012;
  return vec3(texture2D(tDiffuse, uv + d).r, texture2D(tDiffuse, uv).g, texture2D(tDiffuse, uv - d).b);
}
void main() {
  vec3 c = sampleAb(vUv);
  // halation: a wide red-orange bloom around the brightest parts
  if (halation > 0.0) {
    vec3 h = vec3(0.0);
    for (int i = 0; i < 8; i++) {
      float a = float(i) * 0.785398;
      vec2 o = vec2(cos(a), sin(a) * aspect) * 0.006;
      vec3 s = texture2D(tDiffuse, vUv + o).rgb + texture2D(tDiffuse, vUv + o * 2.2).rgb;
      h += max(s - 1.2, 0.0);
    }
    c += h / 16.0 * vec3(1.0, 0.35, 0.18) * halation;
  }
  c *= exposure;
  // white balance
  c *= vec3(1.0 + warmth * 0.12, 1.0 + warmth * 0.02, 1.0 - warmth * 0.14);
  // split toning by luminance
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(c, c * shadows * 2.0, (1.0 - smoothstep(0.0, 0.5, l)) * 0.5);
  c = mix(c, c * highlights * 2.0, smoothstep(0.5, 1.0, l) * 0.5);
  // saturation and an S-curve contrast around mid grey
  c = mix(vec3(l), c, saturation);
  c = (c - 0.5) * contrast + 0.5;
  // light leak from the left edge
  float lk = leak * smoothstep(0.75, 0.0, vUv.x + sin(time * 0.7 + vUv.y * 3.0) * 0.08);
  c += vec3(1.0, 0.55, 0.25) * lk * 0.6;
  // vignette
  vec2 v = (vUv - 0.5) * vec2(aspect, 1.0);
  c *= 1.0 - vignette * smoothstep(0.35, 1.05, length(v));
  // grain, per frame
  float g = hash(vUv * vec2(1920.0, 1080.0) + fract(time * 24.0) * 100.0) - 0.5;
  c += g * grain * (0.6 + 0.4 * (1.0 - l));
  // anamorphic bars: 2.39:1 inside 16:9 leaves 12.8% top and bottom
  float bar = letterbox * ${DQ};
  if (vUv.y < bar || vUv.y > 1.0 - bar) c = vec3(0.0);
  c *= 1.0 - fade;
  gl_FragColor = vec4(max(c, 0.0), 1.0);
}`;class EQ{composer;look={focus:0,aperture:0.0025,bloom:0.35,exposure:1,warmth:0,saturation:1,contrast:1,shadows:new D0(0.5,0.5,0.5),highlights:new D0(0.5,0.5,0.5),vignette:0.45,grain:0.06,aberration:0.4,halation:0.4,letterbox:1,fade:0,leak:0};bokeh;bloomPass;grade;constructor(J,$,Q,Z=new q0(1920,1080)){this.composer=new BJ(J),this.composer.addPass(new zJ($,Q)),this.bokeh=new VH($,Q,{focus:10,aperture:this.look.aperture,maxblur:0.008}),this.composer.addPass(this.bokeh),this.bloomPass=new g8(Z,this.look.bloom,0.6,0.78),this.composer.addPass(this.bloomPass),this.composer.addPass(new IJ),this.grade=new O6({uniforms:{tDiffuse:{value:null},time:{value:0},aspect:{value:Z.x/Z.y},exposure:{value:1},warmth:{value:0},saturation:{value:1},contrast:{value:1},shadows:{value:new D0},highlights:{value:new D0},vignette:{value:0},grain:{value:0},aberration:{value:0},halation:{value:0},letterbox:{value:0},fade:{value:0},leak:{value:0}},vertexShader:WE,fragmentShader:GE}),this.composer.addPass(this.grade)}render(J){let $=this.look,Q=this.grade.uniforms;this.bokeh.enabled=$.focus>0;let Z=this.bokeh.uniforms;Z.focus.value=$.focus,Z.aperture.value=$.aperture,this.bloomPass.strength=$.bloom,Q.time.value=J;for(let K of["exposure","warmth","saturation","contrast","vignette","grain","aberration","halation","letterbox","fade","leak"])Q[K].value=$[K];Q.shadows.value.copy($.shadows),Q.highlights.value.copy($.highlights),this.composer.render()}}var I7=[],dJ={fps:30,duration:0,rms:[0],bass:[0],bpm:120,beatOffset:0};function mW(J,$){I7=J,dJ=$}var _7=()=>dJ.duration,L=(J)=>I7[Math.min(J,I7.length-1)].words[0].s,n0=(J)=>I7[J].words.at(-1).e,t=(J,$)=>(I7[J].words.find((Q)=>$.test(Q.w))??I7[J].words[0]).s,L9=(J,$=0,Q=1)=>Math.min(Q,Math.max($,J)),w=(J,$,Q)=>J+($-J)*Q,a0=(J,$,Q)=>{let Z=L9((Q-J)/($-J));return Z*Z*(3-2*Z)},Z9=(J)=>1-Math.pow(1-L9(J),3),p8=(J)=>Math.pow(L9(J),3),w9=(J)=>{J=L9(J);let $=1.9;return 1+($+1)*Math.pow(J-1,3)+$*Math.pow(J-1,2)};var U0=(J,$,Q)=>L9((J-$)/(Q-$)),NE=(J)=>L9(Math.floor(J*dJ.fps),0,dJ.rms.length-1);var dW=(J)=>{let $=NE(J),Q=dJ.bass,Z=(K)=>Q[Math.max(0,K)]??0;return(Z($)*2+Z($-1)+Z($-2))/4},O8=()=>60/dJ.bpm,r7=(J)=>{let $=O8(),Q=((J-dJ.beatOffset)%$+$)%$;return Math.exp(-Q*9)},W$=(J)=>Math.max(0,Math.floor((J-dJ.beatOffset)/O8())),B0=(J)=>{let $=Math.sin(J*127.1+311.7)*43758.5453;return $-Math.floor($)};var XE="varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";class OQ{mesh;stars;sunDir=new v(0,-0.2,-1).normalize();constructor(J=400){this.mesh=new h(new p0(J,48,24),new p9({side:L7,depthWrite:!1,uniforms:{day:{value:0},sun:{value:this.sunDir}},vertexShader:XE,fragmentShader:`
        uniform float day; uniform vec3 sun; varying vec3 vDir;
        void main() {
          float h = clamp(vDir.y, -0.2, 1.0);
          vec3 nightTop = vec3(0.01, 0.015, 0.05), nightLow = vec3(0.04, 0.05, 0.12);
          vec3 dawnTop = vec3(0.10, 0.12, 0.30), dawnLow = vec3(1.0, 0.45, 0.18);
          vec3 dayTop = vec3(0.20, 0.42, 0.85), dayLow = vec3(0.80, 0.78, 0.70);
          float d1 = smoothstep(0.0, 0.5, day), d2 = smoothstep(0.5, 1.0, day);
          vec3 top = mix(mix(nightTop, dawnTop, d1), dayTop, d2);
          vec3 low = mix(mix(nightLow, dawnLow, d1), dayLow, d2);
          vec3 c = mix(low, top, pow(max(h, 0.0), 0.45));
          float s = max(dot(normalize(vDir), normalize(sun)), 0.0);
          c += vec3(1.0, 0.6, 0.3) * (pow(s, 600.0) * 6.0 + pow(s, 12.0) * 0.6 * d1 * (1.0 - d2 * 0.6));
          c *= mix(1.0, 0.3, smoothstep(0.0, -0.2, vDir.y));
          gl_FragColor = vec4(c, 1.0);
        }`}));let $=1400,Q=new Float32Array($*3);for(let K=0;K<$;K++){let U=b0(K),H=b0(K+9999),Y=U*Math.PI*2,W=Math.acos(1-H*0.95);Q.set([Math.sin(W)*Math.cos(Y)*J*0.95,Math.cos(W)*J*0.95,Math.sin(W)*Math.sin(Y)*J*0.95],K*3)}let Z=new V9;Z.setAttribute("position",new H7(Q,3)),this.stars=new Q8(Z,new s7({color:16777215,size:1.4,sizeAttenuation:!1,transparent:!0,depthWrite:!1}))}set(J,$=0){this.mesh.material.uniforms.day.value=J;let Q=(J-0.5)*0.9;return this.sunDir.set(Math.cos(Q)*Math.sin($),Math.sin(Q),-Math.cos(Q)*Math.cos($)).normalize(),this.stars.material.opacity=Math.max(0,1-J*2.2),this.sunDir}}class BH{box;points;base;constructor(J,$=600,Q=16773590){this.box=J;this.base=new Float32Array($*3);let Z=J.getSize(new v);for(let U=0;U<$;U++)this.base.set([J.min.x+b0(U)*Z.x,J.min.y+b0(U+3000)*Z.y,J.min.z+b0(U+6000)*Z.z],U*3);let K=new V9;K.setAttribute("position",new H7(this.base.slice(),3)),this.points=new Q8(K,new s7({color:Q,size:0.025,transparent:!0,opacity:0.7,blending:M7,depthWrite:!1}))}update(J){let $=this.points.geometry.attributes.position,Q=this.box.getSize(new v);for(let Z=0;Z<$.count;Z++){let K=this.base[Z*3],U=this.base[Z*3+1],H=this.base[Z*3+2],Y=this.box.min.y+((U-this.box.min.y+J*0.05*(0.5+b0(Z)))%Q.y+Q.y)%Q.y;$.setXYZ(Z,K+Math.sin(J*0.4+Z)*0.08,Y,H+Math.cos(J*0.3+Z*1.7)*0.08)}$.needsUpdate=!0}}function lW(J,$,Q,Z){let K=new w0($,Q,Z,32,1,!0).translate(0,-Z/2,0),U=new p9({transparent:!0,depthWrite:!1,blending:M7,side:d9,uniforms:{color:{value:new D0(J)},strength:{value:0.25},time:{value:0}},vertexShader:"varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main() { vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",fragmentShader:`uniform vec3 color; uniform float strength, time; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main() {
        float edge = pow(abs(dot(vN, vV)), 1.6);
        float along = smoothstep(0.0, 0.25, vUv.y) * smoothstep(0.0, 0.6, 1.0 - vUv.y) + 0.15;
        float n = 0.85 + 0.15 * sin(vUv.x * 40.0 + time * 0.6) * sin(vUv.y * 9.0 - time * 0.4);
        gl_FragColor = vec4(color * edge * along * n * strength, 1.0);
      }`});return new h(K,U)}function b0(J){let $=Math.sin(J*127.1+311.7)*43758.5453;return $-Math.floor($)}class RQ{group=new H0;parts=[];width=0;constructor(J,$={}){let Q=$.height??1,Z=$.gap??0.05,K=$.font??'400 200px "Monoton", "Limelight", sans-serif',U=0;for(let H of J){let Y=document.createElement("canvas").getContext("2d");Y.font=K;let W=Math.ceil(Y.measureText(H).width+80),G=280,N=Object.assign(document.createElement("canvas"),{width:W,height:G}),q=N.getContext("2d");q.font=K,q.textBaseline="middle",q.shadowColor=$.color??"#ff3b6b";for(let[M,D,E]of[[40,0.9,$.color??"#ff3b6b"],[14,1,$.color??"#ff3b6b"],[0,1,"#fff6f0"]])q.shadowBlur=M,q.globalAlpha=D,q.fillStyle=E,q.fillText(H,40,G/2);let X=new D7(N);X.colorSpace=V7;let F=Q*W/G,R=new h(new t0(F,Q),new C0({map:X,transparent:!0,depthWrite:!1,toneMapped:!1,color:16777215}));R.position.x=U+F/2,this.group.add(R),this.parts.push({mesh:R,width:F}),U+=F+Z}this.width=U-Z;for(let H of this.parts)H.mesh.position.x-=this.width/2}set(J,$){let Q=this.parts[J]?.mesh;if(!Q)return;let Z=Math.max(0,$);Q.material.color.setScalar(0.1+Z*1.05),Q.material.opacity=0.35+Math.min(1,Z)*0.65}}function iZ(J,$=0,Q=0.5){return Math.sin(J*37+$*13.1)*Math.sin(J*13.7+$*3.3)*Math.sin(J*5.1+$)>1-Q*0.9?0.15:1}var qE=(J)=>J*J*(3-2*J),cW=new v,nW=new v;function q9(J,$,Q,Z,K=!0){let U=K?qE(Math.min(1,Math.max(0,Z))):Z;J.position.copy(cW.fromArray($.pos).lerp(nW.fromArray(Q.pos),U));let H=cW.fromArray($.look).lerp(nW.fromArray(Q.look),U);J.up.set(0,1,0),J.lookAt(H),J.rotateZ((($.roll??0)+((Q.roll??$.roll??0)-($.roll??0))*U)*Math.PI/180);let Y=($.fov??40)+((Q.fov??$.fov??40)-($.fov??40))*U;if(J.fov!==Y)J.fov=Y,J.updateProjectionMatrix()}var MQ=(J,$)=>Math.sin(J*0.73+$)*0.5+Math.sin(J*1.37+$*2.1)*0.3+Math.sin(J*2.9+$*3.7)*0.2;function sZ(J,$,Q=0.5){let Z=Q*0.004;J.rotateX(MQ($,1)*Z),J.rotateY(MQ($,5)*Z*1.3),J.rotateZ(MQ($,9)*Z*0.6)}class IH{width;height;canvas;texture;key="";constructor(J=1280,$=800){this.width=J;this.height=$;this.canvas=Object.assign(document.createElement("canvas"),{width:J,height:$}),this.texture=new D7(this.canvas),this.texture.colorSpace=V7,this.texture.anisotropy=8}show(J,$={}){let Q=JSON.stringify([J,$]);if(Q===this.key)return;this.key=Q;let Z=this.canvas.getContext("2d"),K=this.width,U=this.height;Z.fillStyle=$.bg??"#0d1117",Z.fillRect(0,0,K,U),Z.fillStyle="#1b2230",Z.fillRect(0,0,K,54);for(let[Y,W]of["#ff5f57","#febc2e","#28c840"].entries())Z.fillStyle=W,Z.beginPath(),Z.arc(30+Y*30,27,9,0,Math.PI*2),Z.fill();Z.fillStyle="#8b96a8",Z.font='600 24px "JetBrains Mono", monospace',Z.textAlign="center",Z.fillText($.title??"terminal",K/2,35),Z.textAlign="left";let H=104;for(let Y of J){let W=typeof Y==="string"?{text:Y}:Y,G=W.size??34;Z.font=`${W.bold?700:500} ${G}px ${$.font??'"JetBrains Mono", monospace'}`,Z.fillStyle=W.color??$.fg??"#d6deeb",Z.fillText(W.text,40,H),H+=G*1.45}if($.cursor)Z.fillStyle=$.fg??"#d6deeb",Z.fillRect(40,H-30,18,36);if($.banner)Z.fillStyle=$.banner.color,Z.fillRect(0,U/2-90,K,180),Z.fillStyle="#fff",Z.font='800 64px "Inter", sans-serif',Z.textAlign="center",Z.fillText($.banner.text,K/2,U/2+22),Z.textAlign="left";Z.fillStyle="rgba(0,0,0,.12)";for(let Y=0;Y<U;Y+=4)Z.fillRect(0,Y,K,1);this.texture.needsUpdate=!0}}var G$=(J,$)=>J.slice(0,Math.max(0,Math.floor(J.length*Math.min(1,$))));var c9=(J,$,Q,Z)=>({name:J,at:$,label:Q,section:Z});function rZ(){return[c9("title",0,"a cabin, a loop, a quota","intro"),c9("desk",L(0)-0.8,"go to bed, they said","intro"),c9("pillow",L(1)-0.6,"I nailed the first half","intro"),c9("loop",L(2)-0.4,"fed the loop a spec","verse 1"),c9("state",L(3)-0.3,"max iterations ten","verse 1"),c9("ralph",L(4)-0.3,"Ralph took the wheel","verse 1"),c9("dream",L(5)-0.4,"dreamed of green checkmarks","verse 1"),c9("dawn",L(6)-0.4,"woke at six","verse 1"),c9("tenof",L(7)-0.3,"ten of ten","verse 1"),c9("leave",L(8)-0.4,"she left before dawn","chorus"),c9("rename",L(9)-0.2,"renamed the state file","chorus"),c9("neon",L(10)-0.6,"ralph-loop.local.md-NEVER_AGAIN","chorus"),c9("baggage",L(12)-0.3,"last round's baggage","verse 2"),c9("reread",L(13)-0.1,"reread the whole thread","verse 2"),c9("context",L(14)-0.1,"context at forty percent","verse 2"),c9("approach",L(15)-0.1,"new approach, new approach","verse 2"),c9("summary",L(16)-0.1,"great progress! almost done!","verse 2"),c9("app",L(17)-0.1,"a button: coming soon","verse 2"),c9("commit",L(18)-0.1,"burned all my tokens","verse 2"),c9("leave2",L(20)-0.2,"she left before dawn","chorus"),c9("rename2",L(21)-0.2,"renamed the state file","chorus"),c9("neon2",L(22)-0.6,"dash NEVER, underscore, AGAIN","chorus"),c9("limit",L(24)-0.5,"usage limit reached","bridge"),c9("goodbye",L(25)-0.4,"no letter. a timestamp.","bridge"),c9("renews",L(26)-0.5,"she renews","bridge"),c9("return",L(28)-0.6,"back at nine A-M","last chorus"),c9("whiskey",L(29)-0.3,"poured a whiskey","last chorus"),c9("maybe",L(30)-0.6,"dash MAYBE, underscore, AGAIN","last chorus"),c9("twenty",L(32)-0.4,"max iterations... twenty","outro"),c9("helping",L(33)-1.4,"I'm helping!","outro"),c9("end",n0(33)+1.6,"the end","outro")]}var sW=null,aZ=(J)=>{let $=sW??=rZ(),Q=$[0];for(let Z of $)if(Z.at<=J)Q=Z;return Q},FE=(J)=>{let $=sW??=rZ();return $[$.indexOf(J)+1]?.at??_7()};function DE(J){if(J<L(6)-0.5)return 0.02;if(J<L(8)-0.5)return w(0.25,0.32,U0(J,L(6),L(8)));if(J<L(20))return w(0.36,0.46,U0(J,L(8),L(20)));if(J<L(24))return w(0.48,0.56,U0(J,L(20),L(24)));if(J<L(28))return w(0.6,0.82,U0(J,L(24),L(28)));return w(0.86,1,U0(J,L(28),_7()))}var oW=(J)=>{if(J<L(5))return 23+U0(J,0,L(5))*0.6;if(J<L(6))return w(23.6,29.9,U0(J,L(5),L(6)));if(J<L(26))return w(30,32.5,U0(J,L(6),L(26)));if(J<t(27,/renews/i))return w(32.5,33,U0(J,L(26),t(27,/renews/i)));return 33+U0(J,t(27,/renews/i),_7())*0.3},aW=(J)=>{let $=oW(J),Q=Math.floor($)%24,Z=Math.floor($%1*60);return`${(Q+11)%12+1}:${String(Z).padStart(2,"0")} ${Q<12?"AM":"PM"}`},Q9=(J,$=0.8,Q={})=>new F9({color:J,roughness:$,metalness:0,...Q});function AJ(J,$,Q,Z){let K=Object.assign(document.createElement("canvas"),{width:J,height:$});Q(K.getContext("2d"));let U=new D7(K);if(U.colorSpace=V7,U.anisotropy=8,Z)U.wrapS=U.wrapT=a8,U.repeat.set(...Z);return U}var oZ=(J,$)=>AJ(512,512,(Q)=>{for(let Z=0;Z<16;Z++){let K=b0(Z*3.1);Q.fillStyle=`rgb(${J.map((U)=>Math.round(U*(0.8+K*0.35))).join(",")})`,Q.fillRect(0,Z*32,512,31),Q.fillStyle="rgba(0,0,0,.45)",Q.fillRect(0,Z*32+31,512,1),Q.fillStyle="rgba(0,0,0,.12)";for(let U=0;U<14;U++)Q.fillRect(b0(Z*50+U)*512,Z*32+b0(U+Z)*30,30+b0(U*7+Z)*90,1);Q.fillStyle="rgba(0,0,0,.3)",Q.fillRect(b0(Z+99)*512,Z*32,2,31)}},$),iW=AJ(256,256,(J)=>{J.fillStyle="#8c1f1f",J.fillRect(0,0,256,256),J.fillStyle="rgba(20,10,10,.55)";for(let $=0;$<256;$+=64)J.fillRect($,0,22,256),J.fillRect(0,$,256,22);J.fillStyle="rgba(240,200,160,.25)";for(let $=30;$<256;$+=64)J.fillRect($,0,4,256),J.fillRect(0,$,256,4)},[2,2]),EE=AJ(512,512,(J)=>{J.fillStyle="#b98b5e",J.fillRect(0,0,512,512);for(let $=0;$<9000;$++)J.fillStyle=`rgba(${b0($)>0.5?"255,230,200":"60,35,20"},${0.05+b0($+5)*0.08})`,J.fillRect(b0($+1)*512,b0($+2)*512,2,2)},[80,80]),W7=(J=0,$=0,Q=0)=>new v(J,$,Q),OE=W7(0,1,0),RE=new w0(0.06,0.07,1,8).translate(0,0.5,0),ME={down:[[-0.3,0.92,0.08],[0.3,0.92,0.08]],type:[[-0.2,1.12,0.48],[0.2,1.12,0.48]],mug:[[-0.3,0.95,0.1],[0.14,1.42,0.3]],pour:[[-0.12,1.25,0.45],[0.18,1.3,0.45]],hips:[[-0.34,1.05,0],[0.34,1.05,0]],face:[[-0.1,1.55,0.2],[0.1,1.55,0.2]],up:[[-0.3,1.9,0.1],[0.3,1.9,0.1]],sleep:[[-0.25,1.2,0.18],[0.25,0.95,0.12]]};function VE(){let J=new H0,$=14264450,Q=new h(new w0(0.24,0.21,0.66,16),Q9(16777215,0.9,{map:iW}));Q.position.y=1.2;let Z=new H0;Z.position.y=1.72,Z.add(new h(new p0(0.17,20,16),Q9(14264450,0.7)));let K=Q9(7031342,0.85),U=new h(new w0(0.34,0.34,0.025,28),K);U.position.y=0.1,U.scale.set(1,1,0.85);let H=new h(new w0(0.15,0.18,0.2,20),K);H.position.y=0.21;let Y=new h(new w0(0.182,0.182,0.04,20),Q9(2759184));Y.position.y=0.14,Z.add(U,H,Y);let W=new h(new p0(0.168,16,10,0,Math.PI*2,Math.PI*0.55,Math.PI*0.4),Q9(4863014,0.95));Z.add(W);let G=new H0;G.position.y=0.88;for(let R of[-1,1]){let M=new h(new w0(0.1,0.09,0.86,10).translate(0,-0.43,0),Q9(2898522,0.9));M.position.x=R*0.11;let D=new h(new I0(0.13,0.12,0.3),Q9(3810324,0.6));D.position.set(0,-0.84,0.06),M.add(D),G.add(M)}let N=new h(new w0(0.22,0.22,0.08,16),Q9(2759184));N.position.y=0.9;let q=new h(new I0(0.1,0.07,0.02),new F9({color:14200928,metalness:0.9,roughness:0.3}));q.position.set(0,0.9,0.22);let X=[0,1].map(()=>new h(new p0(0.06,10,8),Q9(14264450,0.7))),F=[0,1].map(()=>new h(RE,Q9(16777215,0.9,{map:iW})));return J.add(Q,Z,G,N,q,...X,...F),J.traverse((R)=>{if(R.isMesh)R.castShadow=!0,R.receiveShadow=!0}),Object.assign(J.userData,{head:Z,hands:X,arms:F,torso:Q,legs:G}),J}function _E(J,$,Q={}){let{hands:Z,arms:K,legs:U,head:H}=J.userData,Y=Q.t??0;U.children.forEach((W)=>W.rotation.x=Q.sit?-1.45:0),H.rotation.x=Q.tilt??0,ME[$].forEach(([W,G,N],q)=>{let X=Z[q],F=(Q.shake??0)*0.012;X.position.set(W+Math.sin(Y*41+q*2)*F,G+Math.sin(Y*53+q)*F,N);let R=W7(q?0.26:-0.26,1.46,0.02),M=X.position.clone().sub(R);K[q].position.copy(R),K[q].quaternion.setFromUnitVectors(OE,M.clone().normalize()),K[q].scale.set(1,M.length(),1)})}function BE(){let J=new H0,$=Q9(15921126,0.35),Q=new h(new k7(0.17,0.16,8,16),$);Q.position.y=0.26;let Z=new H0;Z.position.y=0.62,Z.add(new h(new p0(0.2,24,18),$));let K=new C0({color:7336191,toneMapped:!1});for(let G of[-1,1]){let N=new h(new p0(0.045,12,10),K);N.position.set(G*0.075,0.02,0.18),Z.add(N)}let U=new h(new p0(0.205,20,10,0,Math.PI*2,0,Math.PI/2.4),Q9(14172207,0.7));U.position.y=0.01;let H=new h(new Y7(0.17,0.012,6,24),Q9(15777840,0.6));H.rotation.x=Math.PI/2,H.position.y=0.1;let Y=new H0;Y.position.y=0.23;for(let G=0;G<3;G++){let N=new h(new I0(0.2,0.008,0.04).translate(0.1,0,0),Q9([3832789,15777840,3846250][G],0.5));N.rotation.y=G*Math.PI*2/3,Y.add(N)}Z.add(U,H,Y);let W=[-1,1].map((G)=>{let N=new h(new k7(0.035,0.16,4,8).translate(0,-0.1,0),$);return N.position.set(G*0.19,0.36,0),N});return J.add(Q,Z,...W),J.traverse((G)=>{if(G.isMesh)G.castShadow=!0}),J.userData={head:Z,prop:Y,arms:W,eyeMat:K},J}class VQ{renderer;scene=new i7;camera=new Z7(38,1.7777777777777777,0.05,1200);film;sky=new OQ(600);sun=new a7(16777215,1);hemi=new U8(10467071,3811868,0.4);moon;room=new H0;lamp=new D8(16757611,0,9,1.6);lampBulb;screen=new IH(1280,800);screenLight=new D8(10275071,0,2.5,1.5);screenMesh;laptop=new H0;jar=new H0;coins;clockHands=[];notes;sack=new H0;bottle=new H0;glassFill;mug=new H0;steam;checks=new H0;windowShaft;dust;me=VE();ralph=BE();chair=new H0;outside=new H0;cabinWindow;porch=new D8(16757611,0,14,1.5);truck=new H0;taillights=[];headlights=new Z$(16773328,0,60,0.4,0.5,1);roadCoins;bedCoins;sign;maybe;signGroup=new H0;signGlow=new D8(16726891,0,18,1.4);constructor(J){this.renderer=new E8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=gJ,this.renderer.toneMapping=k8,this.film=new EQ(this.renderer,this.scene,this.camera),this.scene.fog=new EJ(658456,0.004),this.scene.add(this.sky.mesh,this.sky.stars,this.hemi,this.sun,this.sun.target),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-0.0004,this.sun.shadow.normalBias=0.02,this.moon=new h(new p0(9,32,24),new C0({color:15920860,toneMapped:!1,fog:!1})),this.moon.position.set(-160,120,-380),this.scene.add(this.moon),this.buildRoom(),this.buildOutside(),this.dust=new BH(new f8(W7(-3.6,0.2,-2.8),W7(1,3,2)),700),this.room.add(this.dust.points),this.sign=new RQ(["ralph-loop",".local",".md","-NEVER","_AGAIN"],{color:"#ff4d7d",height:1.25,gap:0.02}),this.maybe=new RQ(["-MAYBE"],{color:"#ffc24d",height:1.25}),this.buildSign(),this.scene.add(this.room,this.outside)}static ROOM=W7(300,0,0);buildRoom(){let J=this.room;J.position.copy(VQ.ROOM);let $=new h(new t0(10,8),Q9(16777215,0.75,{map:oZ([120,80,50],[3,3])}));$.rotation.x=-Math.PI/2,$.receiveShadow=!0;let Q=Q9(16777215,0.9,{map:oZ([150,110,75],[2,1.2])}),Z=(J0,m0,Z0,O0,_0,z0=0)=>{let S0=new h(new I0(J0,m0,0.12),Q);S0.position.set(Z0,O0,_0),S0.rotation.y=z0,S0.castShadow=S0.receiveShadow=!0,J.add(S0)};Z(10,3.4,0,1.7,-3.2),Z(8,3.4,4.6,1.7,0,Math.PI/2),Z(8,1,-4.6,0.5,0,Math.PI/2),Z(8,1,-4.6,2.9,0,Math.PI/2),Z(2.6,1.4,-4.6,1.7,-2.2,Math.PI/2),Z(3.4,1.4,-4.6,1.7,2.3,Math.PI/2);let K=Q9(3810838,0.8);for(let[J0,m0,Z0,O0]of[[0.08,1.4,1.7,-1.4],[0.08,1.4,1.7,0.6],[0.06,1.4,1.7,-0.4],[2,0.06,1.7,-0.4],[2.1,0.1,1,-0.4],[2.1,0.1,2.4,-0.4]]){let _0=new h(new I0(0.14,m0,J0),K);_0.position.set(-4.6,Z0,O0),_0.castShadow=!0,J.add(_0)}let U=new h(new I0(10,0.12,8),Q9(5914672,0.9));U.position.y=3.46,U.castShadow=!0,J.add($,U);let H=new h(new C7(1.4,40),Q9(16777215,1,{map:AJ(256,256,(J0)=>{for(let m0=0;m0<9;m0++)J0.fillStyle=["#7a2a20","#c8902f","#2a4a5a"][m0%3],J0.beginPath(),J0.arc(128,128,128-m0*14,0,Math.PI*2),J0.fill()})}));H.rotation.x=-Math.PI/2,H.position.set(0.2,0.005,0.2),H.receiveShadow=!0,J.add(H);let Y=Q9(5913122,0.6),W=new H0;W.position.set(1.6,0,-2.5);let G=new h(new I0(2.4,0.08,1),Y);G.position.y=0.92,W.add(G);for(let[J0,m0]of[[-1.1,-0.42],[1.1,-0.42],[-1.1,0.42],[1.1,0.42]]){let Z0=new h(new I0(0.08,0.9,0.08),Y);Z0.position.set(J0,0.45,m0),W.add(Z0)}W.traverse((J0)=>{J0.castShadow=!0,J0.receiveShadow=!0}),J.add(W);let N=this.laptop;N.position.set(1.5,0.96,-2.5);let q=new h(new I0(0.72,0.03,0.5),Q9(2763827,0.35,{metalness:0.6})),X=new H0;X.position.set(0,0.015,-0.24),X.rotation.x=-0.18;let F=new h(new I0(0.72,0.47,0.02).translate(0,0.235,0),Q9(2763827,0.35,{metalness:0.6}));this.screenMesh=new h(new t0(0.67,0.42),new C0({map:this.screen.texture,toneMapped:!1})),this.screenMesh.position.set(0,0.235,0.011),X.add(F,this.screenMesh),this.screenLight.position.set(0,0.235,0.3),X.add(this.screenLight),N.add(q,X),N.userData.lid=X,J.add(N);let R=new H0;R.position.set(2.5,0.96,-2.7);let M=new h(new g9(0.2,0.22,24,1,!0),Q9(3103290,0.5,{side:d9}));M.position.y=0.52;let D=new h(new w0(0.015,0.015,0.5),Q9(11569744,0.3,{metalness:0.8}));D.position.y=0.25;let E=new h(new w0(0.1,0.12,0.03,20),Q9(11569744,0.3,{metalness:0.8}));this.lampBulb=new h(new p0(0.05,12,10),new C0({color:16767392,toneMapped:!1})),this.lampBulb.position.y=0.46,this.lamp.position.set(0,0.42,0),this.lamp.castShadow=!0,this.lamp.shadow.mapSize.set(1024,1024),this.lamp.shadow.bias=-0.002,R.add(M,D,E,this.lampBulb,this.lamp),J.add(R),this.jar.position.set(0.55,0.96,-2.55);let I=new h(new w0(0.17,0.17,0.42,32,1,!0),new MJ({color:14544639,roughness:0.05,transmission:0.9,transparent:!0,opacity:0.35,side:d9}));I.position.y=0.21;let C=new h(new w0(0.18,0.18,0.04,32),Q9(9071162,0.4,{metalness:0.7}));C.position.y=0.44;let O=new h(new t0(0.2,0.08),Q9(16777215,0.9,{map:AJ(256,100,(J0)=>{J0.fillStyle="#f0e2c0",J0.fillRect(0,0,256,100),J0.fillStyle="#3a2410",J0.font='700 46px "Rye", serif',J0.textAlign="center",J0.fillText("TOKENS",128,66)})}));O.position.set(0,0.2,0.172);let B=new w0(0.035,0.035,0.01,16),_=new F9({color:15120458,metalness:0.9,roughness:0.28,emissive:3810304});this.coins=new f9(B,_,160);let A=new v9;for(let J0=0;J0<160;J0++){let m0=b0(J0)*Math.PI*2,Z0=Math.sqrt(b0(J0+7))*0.13;A.position.set(Math.cos(m0)*Z0,0.01+Math.floor(J0/10)*0.024+b0(J0+3)*0.01,Math.sin(m0)*Z0),A.rotation.set((b0(J0+1)-0.5)*0.8,b0(J0+2)*3,(b0(J0+4)-0.5)*0.8),A.updateMatrix(),this.coins.setMatrixAt(J0,A.matrix)}this.jar.add(I,C,O,this.coins),J.add(this.jar),this.mug.position.set(0.95,0.96,-2.2);let V=new h(new w0(0.06,0.055,0.12,20),Q9(15262420,0.4));V.position.y=0.06;let z=new h(new C7(0.055,20),Q9(1707784,0.2));z.rotation.x=-Math.PI/2,z.position.y=0.11;let y=new h(new Y7(0.035,0.01,8,16,Math.PI),Q9(15262420,0.4));y.position.set(0.065,0.06,0),y.rotation.z=-Math.PI/2;let k=new Float32Array(180),f=new V9;f.setAttribute("position",new H7(k,3)),this.steam=new Q8(f,new s7({color:16777215,size:0.03,transparent:!0,opacity:0.25,depthWrite:!1})),this.mug.add(V,z,y,this.steam),J.add(this.mug),this.bottle.position.set(0,0.96,-2.35);let s=new MJ({color:10115616,roughness:0.1,transmission:0.6,transparent:!0,opacity:0.8}),j=new h(new w0(0.07,0.07,0.26,20),s);j.position.y=0.13;let p=new h(new w0(0.02,0.04,0.12,16),s);p.position.y=0.32;let e=new h(new w0(0.071,0.071,0.1,20,1,!0),Q9(15786688,0.8));e.position.y=0.12,this.bottle.add(j,p,e);let n=new h(new w0(0.045,0.04,0.09,20,1,!0),new MJ({color:16777215,roughness:0.05,transmission:0.95,transparent:!0,opacity:0.3,side:d9}));n.position.set(0.22,1.005,-2.25),this.glassFill=new h(new w0(0.038,0.036,1,20).translate(0,0.5,0),new MJ({color:13138472,roughness:0.1,transmission:0.4,transparent:!0,opacity:0.85})),this.glassFill.position.set(0.22,0.965,-2.25),J.add(this.bottle,n,this.glassFill);let r=new h(new I0(0.5,0.06,0.5),Y);r.position.y=0.5;let u=new h(new I0(0.5,0.6,0.05),Y);u.position.set(0,0.82,0.24),this.chair.add(r,u);for(let[J0,m0]of[[-0.22,-0.22],[0.22,-0.22],[-0.22,0.22],[0.22,0.22]]){let Z0=new h(new I0(0.05,0.5,0.05),Y);Z0.position.set(J0,0.25,m0),this.chair.add(Z0)}this.chair.position.set(1.5,0,-1.7),this.chair.traverse((J0)=>{J0.castShadow=!0}),J.add(this.chair);let x=new H0;x.position.set(-2.8,0,-1.9);let K0=new h(new I0(1.4,0.4,2.2),Q9(4861984,0.7));K0.position.y=0.2;let R0=new h(new I0(1.3,0.2,2.1),Q9(15261904,0.9));R0.position.y=0.5;let T0=new h(new I0(1.36,0.1,1.5),Q9(16777215,0.95,{map:AJ(256,256,(J0)=>{for(let m0=0;m0<8;m0++)for(let Z0=0;Z0<8;Z0++)J0.fillStyle=["#7a3a2a","#c89a5a","#3a5a6a","#e8dcc0"][(Z0*3+m0*5)%4],J0.fillRect(Z0*32,m0*32,32,32)})}));T0.position.set(0,0.63,0.3);let l=new h(new I0(0.8,0.14,0.4),Q9(16052456,0.95));l.position.set(0,0.68,-0.8);let F0=new h(new I0(1.4,1,0.08),Q9(4861984,0.7));F0.position.set(0,0.7,-1.08),x.add(K0,R0,T0,l,F0),x.traverse((J0)=>{J0.castShadow=!0,J0.receiveShadow=!0}),J.add(x);let i=new H0;i.position.set(-1,2.45,-3.12),i.add(new h(new C7(0.32,40),Q9(16777215,0.6,{map:AJ(256,256,(J0)=>{J0.fillStyle="#f2ead6",J0.beginPath(),J0.arc(128,128,126,0,Math.PI*2),J0.fill(),J0.strokeStyle="#5a3a1a",J0.lineWidth=10,J0.stroke(),J0.fillStyle="#2a1a10",J0.font='700 30px "Rye", serif',J0.textAlign="center",J0.textBaseline="middle";for(let m0=1;m0<=12;m0++){let Z0=m0/12*Math.PI*2;J0.fillText(String(m0),128+Math.sin(Z0)*96,128-Math.cos(Z0)*96)}})})));for(let[J0,m0]of[[0.18,0.025],[0.27,0.015]]){let Z0=new h(new I0(m0,J0,0.01).translate(0,J0/2,0.01),Q9(1707784));this.clockHands.push(Z0),i.add(Z0)}J.add(i),this.notes=new f9(new t0(0.18,0.18),Q9(16777215,0.9,{map:AJ(128,128,(J0)=>{J0.fillStyle="#ffe066",J0.fillRect(0,0,128,128),J0.fillStyle="#3a2a10",J0.font='700 22px "Caveat", cursive',J0.fillText("new",14,52),J0.fillText("approach",14,84)})}),40),J.add(this.notes);let N0=new h(new p0(0.3,20,16),Q9(10123850,0.95,{map:AJ(256,256,(J0)=>{J0.fillStyle="#a8865a",J0.fillRect(0,0,256,256),J0.fillStyle="#3a2a10",J0.font='700 40px "JetBrains Mono", monospace',J0.textAlign="center",J0.fillText("CONTEXT",128,140)})}));N0.scale.set(1,0.85,1),N0.position.y=0.26;let G0=new h(new g9(0.08,0.16,12),Q9(10123850,0.95));G0.position.y=0.55,this.sack.add(N0,G0),this.sack.traverse((J0)=>{J0.castShadow=!0}),J.add(this.sack);let c=new K8;c.moveTo(-0.5,0),c.lineTo(-0.15,-0.38),c.lineTo(0.55,0.42),c.lineTo(0.42,0.52),c.lineTo(-0.15,-0.12),c.lineTo(-0.38,0.12);let P0=new ZQ(c);for(let J0=0;J0<14;J0++){let m0=new h(P0,new C0({color:4120698,transparent:!0,toneMapped:!1,side:d9}));m0.scale.setScalar(0.18+b0(J0)*0.12),this.checks.add(m0)}J.add(this.checks),this.windowShaft=lW(12374783,0.9,1.3,5.5),this.windowShaft.position.set(-4.7,2.5,-0.4),this.windowShaft.rotation.set(0,0,1.05),J.add(this.windowShaft),this.me.position.set(1.5,0,-1.65),J.add(this.me,this.ralph)}buildOutside(){let J=this.outside,$=new t0(1600,1600,160,160),Q=$.attributes.position;for(let x=0;x<Q.count;x++){let K0=Q.getX(x),R0=Q.getY(x),T0=Math.hypot(K0,R0),l=(Math.sin(K0*0.02)*Math.cos(R0*0.017)*2.4+Math.sin(K0*0.007+1)*4)*a0(40,160,T0);Q.setZ(x,l*(Math.abs(-R0-12)<8?a0(4,8,Math.abs(-R0-12)):1))}$.computeVertexNormals();let Z=new h($,Q9(16777215,1,{map:EE}));Z.rotation.x=-Math.PI/2,Z.receiveShadow=!0,J.add(Z);for(let x=0;x<9;x++){let K0=-0.6+x*0.32+b0(x)*0.1,R0=380+b0(x+4)*120,T0=40+b0(x+8)*60,l=30+b0(x+2)*45,F0=new h(new w0(T0*0.7,T0,l,7),Q9(8014386,1));F0.position.set(Math.sin(K0)*R0,l/2-4,-Math.cos(K0)*R0),J.add(F0)}let K=new h(new t0(1600,7),Q9(2763310,0.85));K.rotation.x=-Math.PI/2,K.position.set(0,0.03,12),K.receiveShadow=!0,J.add(K);let U=new f9(new t0(3,0.18),Q9(15253568,0.6),200),H=new v9;for(let x=0;x<200;x++)H.position.set(-800+x*8,0.04,12),H.rotation.x=-Math.PI/2,H.updateMatrix(),U.setMatrixAt(x,H.matrix);J.add(U);let Y=Q9(4863526,0.9);for(let x=0;x<30;x++){let K0=new H0,R0=new h(new w0(0.12,0.15,8),Y);R0.position.y=4;let T0=new h(new I0(2.2,0.12,0.12),Y);T0.position.y=7.4,K0.add(R0,T0),K0.position.set(-200+x*20,0,17.5),K0.traverse((l)=>{l.castShadow=!0}),J.add(K0)}let W=Q9(3824178,0.8);for(let x=0;x<26;x++){let K0=new H0,R0=2.5+b0(x)*3,T0=new h(new k7(0.28,R0,6,12),W);T0.position.y=R0/2,K0.add(T0);for(let i of[-1,1])if(b0(x+i*10)>0.3){let N0=0.9+b0(x+i)*1.2,G0=new h(new k7(0.2,0.6,6,10),W);G0.rotation.z=Math.PI/2,G0.position.set(i*0.5,R0*0.45,0);let c=new h(new k7(0.2,N0,6,10),W);c.position.set(i*0.85,R0*0.45+N0/2,0),K0.add(G0,c)}let l=b0(x+30)*Math.PI*2,F0=18+b0(x+40)*90;if(K0.position.set(Math.cos(l)*F0,0,Math.sin(l)*F0-10),Math.abs(K0.position.z-12)<6)K0.position.z-=14;K0.traverse((i)=>{i.castShadow=!0}),J.add(K0)}let G=new H0,N=Q9(16777215,0.9,{map:oZ([130,90,60],[2,1])}),q=new h(new I0(7,3.4,5.5),N);q.position.y=1.7;let X=new K8([new q0(-4,0),new q0(4,0),new q0(0,2.2)]),F=new h(new B8(X,{depth:6.3,bevelEnabled:!1}),Q9(4864560,0.9));F.position.set(0,3.4,-3.15);let R=new h(new I0(0.7,2.2,0.7),Q9(8018506,0.95));R.position.set(2.2,4.6,-1),this.cabinWindow=new h(new t0(1.5,1.1),new F9({color:1709072,emissive:16757611,emissiveIntensity:1.6})),this.cabinWindow.position.set(-1.6,1.9,2.77);let M=new h(new I0(1.1,2.2,0.08),Q9(3810838,0.8));M.position.set(1.4,1.1,2.77);let D=new h(new I0(7.4,0.12,2),Q9(4864560,0.9));D.position.set(0,2.8,3.7),D.rotation.x=0.1;for(let x of[-3.4,3.4]){let K0=new h(new I0(0.14,2.8,0.14),Q9(4861984,0.9));K0.position.set(x,1.4,4.6),G.add(K0)}let E=new h(new I0(7.4,0.2,2),Q9(16777215,0.9,{map:oZ([110,75,50],[2,1])}));E.position.set(0,0.1,3.7),this.porch.position.set(0.4,2.5,3.6);let I=new h(new p0(0.08),new C0({color:16767392,toneMapped:!1}));I.position.copy(this.porch.position),G.add(q,F,R,this.cabinWindow,M,D,E,this.porch,I),G.traverse((x)=>{x.castShadow=!0,x.receiveShadow=!0}),J.add(G);let C=new MJ({color:9313308,roughness:0.35,metalness:0.5,clearcoat:1,clearcoatRoughness:0.2}),O=new F9({color:14540253,metalness:1,roughness:0.15}),B=this.truck,_=new h(new I0(4.8,0.7,1.9),C);_.position.y=0.85;let A=new h(new I0(1.7,0.95,1.8),C);A.position.set(0.55,1.65,0);let V=new MJ({color:2240576,roughness:0.05,metalness:0.2,transparent:!0,opacity:0.85}),z=new h(new t0(1.6,0.7),V);z.position.set(1.41,1.7,0),z.rotation.y=Math.PI/2,z.rotation.x=0;let y=new H0;for(let[x,K0,R0,T0,l,F0]of[[2.4,0.5,0.08,-1.2,1.45,0.9],[2.4,0.5,0.08,-1.2,1.45,-0.9],[0.08,0.5,1.88,-2.38,1.45,0]]){let i=new h(new I0(x,K0,R0),C);i.position.set(T0,l,F0),y.add(i)}let k=new h(new I0(0.08,0.5,1.6),O);k.position.set(2.42,0.95,0);let f=new h(new I0(0.16,0.18,2),O);f.position.set(2.5,0.55,0);let s=f.clone();s.position.x=-2.5;for(let x of[-0.65,0.65]){let K0=new h(new C7(0.13,20),new C0({color:16774360,toneMapped:!1}));K0.position.set(2.47,1,x),K0.rotation.y=Math.PI/2;let R0=new h(new I0(0.06,0.22,0.16),new C0({color:16719904,toneMapped:!1}));R0.position.set(-2.44,1.1,x*1.2),this.taillights.push(R0),B.add(K0,R0)}let j=new w0(0.42,0.42,0.3,24).rotateX(Math.PI/2),p=Q9(1381653,0.9),e=[];for(let[x,K0]of[[1.6,0.95],[1.6,-0.95],[-1.5,0.95],[-1.5,-0.95]]){let R0=new h(j,p);R0.position.set(x,0.42,K0);let T0=new h(new w0(0.2,0.2,0.32,16).rotateX(Math.PI/2),O);R0.add(T0),e.push(R0)}this.headlights.position.set(2.5,1,0),this.headlights.target.position.set(20,0,0),B.add(_,A,z,y,k,f,s,...e,this.headlights,this.headlights.target),B.userData.wheels=e,B.traverse((x)=>{x.castShadow=!0});let n=new w0(0.11,0.11,0.025,16),r=new F9({color:15120458,metalness:0.9,roughness:0.25,emissive:4861952});this.bedCoins=new f9(n,r,220);let u=new v9;for(let x=0;x<220;x++)u.position.set(-2.3+b0(x)*2.2,1.25+b0(x+1)*0.35+Math.sin(b0(x+2)*3)*0.12,-0.8+b0(x+3)*1.6),u.rotation.set(b0(x+4)*2,b0(x+5)*3,b0(x+6)*2),u.updateMatrix(),this.bedCoins.setMatrixAt(x,u.matrix);B.add(this.bedCoins),this.roadCoins=new f9(n,r,360),J.add(B,this.roadCoins)}buildSign(){let J=this.signGroup,$=new h(new I0(this.sign.width+1.4,2.6,0.3),Q9(1316380,0.6));$.position.z=-0.2;let Q=new h(new I0(this.sign.width+1.6,2.8,0.2),new F9({color:11569744,metalness:0.8,roughness:0.35}));Q.position.z=-0.3;let Z=Q9(3816000,0.5,{metalness:0.6});for(let U of[-this.sign.width/3,this.sign.width/3]){let H=new h(new w0(0.16,0.2,7),Z);H.position.set(U,-4.6,-0.3),J.add(H)}let K=new RQ(["STATE FILE"],{color:"#7ad8ff",height:0.55,font:'400 160px "Rye", serif'});K.group.position.set(0,1.75,0.02),K.set(0,1),this.sign.group.position.set(0,0,0),this.maybe.group.position.copy(this.sign.parts[3].mesh.position).setY(0),this.maybe.group.position.x+=(this.maybe.width-this.sign.parts[3].width)/2,this.maybe.group.position.y=0,this.maybe.group.position.z=0.03,J.add(Q,$,this.sign.group,this.maybe.group,K.group,this.signGlow),this.signGlow.position.set(0,0,2),J.position.set(-14,8.1,20.5),J.rotation.y=0.12,J.traverse((U)=>{if(U.isMesh&&!U.material.transparent)U.castShadow=!0}),this.outside.add(J)}flash(J){let $=aZ(J);return $.name==="leave"||$.name==="neon2"||$.name==="return"?Math.exp(-(J-$.at)*7)*0.18:0}fade(J){return a0(_7()-2.5,_7()-0.2,J)}truckAt(J){let $=L(8)-0.2,Q=L(28)-1;if(J<$)return{x:6.5,z:6,heading:Math.PI/2,moving:0};if(J<Q){let K=J-$;if(K<2.5){let U=Z9(K/2.5);return{x:6.5+U*2,z:w(6,12,U),heading:w(Math.PI/2,0,U),moving:1}}return{x:8.5+(K-2.5)*(3+(K-2.5)*0.35),z:10.2,heading:0,moving:1}}let Z=J-Q;return{x:Math.max(8.5,140-Z*22),z:13.8,heading:Math.PI,moving:Z<6?1:0}}update(J){this.t=J;let $=aZ(J),Q=$.name,Z=$.at,K=FE($),U=U0(J,Z,K),H=J-Z,Y=this.camera,W=this.film.look,G=VQ.ROOM,N=DE(J),q=!["title","leave","neon","leave2","neon2","return","maybe","end"].includes(Q),X=this.sky.set(N,Math.PI/2),F=1-a0(0.28,0.55,N),R=new D0().lerpColors(new D0(16752736),new D0(16773856),a0(0.5,0.9,N));this.sun.color.lerpColors(R,new D0(8363263),F),this.sun.intensity=w(0.25,3.2,a0(0.3,0.8,N))+F*(q?2.4:0.35);let M=q?W7(-0.85,F>0.5?0.45:0.25+N*0.35,0.2).normalize():F>0.5?W7(-0.35,0.55,-0.75).normalize():X.clone();this.room.visible=q,this.outside.visible=!q,this.hemi.intensity=w(q?0.55:0.12,0.85,a0(0.25,0.9,N)),this.hemi.color.setHex(F>0.5?5927088:12375807),this.scene.fog.color.lerpColors(new D0(14196864),new D0(658456),F),this.scene.fog.density=w(0.0016,0.003,F),this.moon.visible=N<0.45,this.renderer.toneMappingExposure=w(1.1,0.95,a0(0.6,1,N));let D=q?G.clone().add(W7(-1,0,-1)):W7(0,0,6);this.sun.target.position.copy(D),this.sun.position.copy(D).addScaledVector(M,60);let E=this.sun.shadow.camera,I=q?8:40;E.left=-I,E.right=I,E.top=I,E.bottom=-I,E.near=1,E.far=140,E.updateProjectionMatrix();let C=J<t(2,/light/i)-0.1||J>L(32)-0.5||Q==="commit"||Q==="limit";this.lamp.intensity=C?Q==="limit"?0:Q==="helping"||Q==="twenty"?2.5:6:0,this.lampBulb.material.color.setHex(C&&Q!=="limit"?16767392:3811866),this.windowShaft.material.uniforms.strength.value=w(0.22,0.32,1-F)*(q?1:0),this.windowShaft.material.uniforms.color.value.setHex(F>0.5?11060479:16763024),this.windowShaft.material.uniforms.time.value=J,this.dust.update(J);let O=oW(J);this.clockHands[0].rotation.z=-(O%12/12)*Math.PI*2,this.clockHands[1].rotation.z=-(O%1)*Math.PI*2;let B=J<L(28)-0.6?L9(U0(J,L(2),L(7))):0;this.coins.count=Math.round(160*(1-B)),this.drawScreen(J,Q),this.screenLight.intensity=Q==="limit"?1.2:Q==="helping"?0.15:0.7;let _=this.steam.geometry.attributes.position;for(let c=0;c<_.count;c++){let P0=(J*0.4+b0(c))%1;_.setXYZ(c,Math.sin(J*2+c)*0.02*P0*2,0.12+P0*0.35,Math.cos(J*1.7+c)*0.02)}_.needsUpdate=!0,this.steam.visible=J>L(6)-1&&J<L(12),this.mug.visible=J>L(6)-1;let A=U0(J,t(29,/whiskey/i)-0.6,t(29,/whiskey/i)+1.4);this.glassFill.scale.y=J<L(29)-1?0.0001:Math.max(0.0001,A*0.06),this.bottle.position.set(J>L(29)-0.3&&A<1?0.12:0,0.96+(A>0&&A<1?0.15:0),-2.35),this.bottle.rotation.z=A>0&&A<1?-1.9*Math.sin(A*Math.PI):0;let V=J<L(15)?0:Math.min(40,Math.floor((J-L(15))*9)),z=new v9;for(let c=0;c<40;c++)z.position.set(0.3+b0(c)*2.6,1.3+b0(c+1)*1.6,-3.13),z.rotation.set(0,0,(b0(c+2)-0.5)*0.5),z.scale.setScalar(c<V?1:0.0001),z.updateMatrix(),this.notes.setMatrixAt(c,z.matrix);this.notes.instanceMatrix.needsUpdate=!0,this.notes.visible=J>L(15)&&J<L(24),this.checks.visible=Q==="dream",this.checks.children.forEach((c,P0)=>{let J0=P0/14*Math.PI*2+J*0.25;c.position.set(-2.8+Math.cos(J0)*(0.6+b0(P0)*0.5),1.2+(J*0.2+b0(P0+5))%1*1.5,-2.3+Math.sin(J0)*0.5),c.rotation.set(0,J*0.5+P0,0),c.material.opacity=0.85*Math.sin((J*0.2+b0(P0+5))%1*Math.PI)});let y=this.me;y.visible=q&&!["loop","state","reread","context","summary","app","rename","rename2","twenty","limit","helping","tenof","whiskey","ralph"].includes(Q),y.rotation.set(0,Math.PI,0),y.position.set(1.5,0,-1.65);let k="type",f=!0,s=0.15,j=0;if(Q==="pillow"||Q==="dream")y.position.set(-2.8,0.84,-0.93),y.rotation.set(-Math.PI/2,0,0),k="sleep",f=!1,s=Q==="pillow"?-0.25:0;else if(Q==="dawn")y.position.set(2,0,-1.6),y.rotation.y=Math.PI*0.95,k="mug",f=!1,s=-0.1;else if(Q==="goodbye")y.position.set(-3.7,0,-0.4),y.rotation.y=-Math.PI/2,k="hips",f=!1,s=0.05;else if(Q==="renews")y.position.set(-3.7,0,-0.4),y.rotation.y=-Math.PI/2-0.4,k="down",f=!1;else if(Q==="whiskey")k="pour",s=0.25;else if(Q==="tenof"||Q==="limit")k="face",s=0.35;else if(Q==="commit")j=1.6;else if(Q==="baggage"||Q==="approach")k="face",s=0.2;else if(Q==="ralph"||Q==="state"||Q==="loop"){if(Q==="ralph")y.position.set(-2.8,0.84,-0.93),y.rotation.set(-Math.PI/2,0,0),k="sleep",f=!1,s=0}if(_E(y,k,{sit:f,tilt:s,shake:j,t:J}),f)y.position.y=-0.36;let p=this.ralph,e=p.userData;if(p.visible=q&&J>L(4)-0.5,p.scale.setScalar(0.75),e.prop.rotation.y=J*14,e.eyeMat.color.setHex(Q==="limit"?3364198:7336191),Q==="baggage"){let c=w(-1.5,2.4,U);p.position.set(c,0,-0.6),p.rotation.y=Math.PI/2,this.sack.position.set(c-0.75,0,-0.6),this.sack.scale.setScalar(0.9+U*0.9),this.sack.visible=!0,e.arms.forEach((P0)=>P0.rotation.x=-1.2)}else if(this.sack.visible=!1,p.position.set(Q==="helping"?1.5:2.15,0.96,Q==="helping"?w(-2.95,-2.75,Z9(U0(J,t(33,/helping/i)-0.5,t(33,/helping/i)))):-2.45),p.rotation.y=Q==="helping"?0:-1.9,e.arms.forEach((c,P0)=>c.rotation.x=-1.1+Math.sin(J*22+P0*1.7)*0.25),e.head.rotation.z=Math.sin(J*3)*0.08,Q==="helping"){let c=Z9(U0(J,t(33,/helping/i)-0.5,t(33,/helping/i)));p.position.y=0.96+w(-0.6,0.12,c),e.arms.forEach((P0,J0)=>P0.rotation.z=(J0?-1:1)*c*2.4)}else e.arms.forEach((c)=>c.rotation.z=0);this.cabinWindow.material.emissiveIntensity=F>0.5?1.6:w(0,0.6,F*2),this.porch.intensity=F>0.4?6:0;let n=this.truckAt(J);this.truck.position.set(n.x,0,n.z),this.truck.rotation.y=-n.heading,this.truck.userData.wheels.forEach((c)=>c.rotation.z=-J*8*n.moving),this.taillights.forEach((c)=>c.material.color.setHex(F>0.2||n.moving?16719904:5246992)),this.headlights.intensity=n.moving&&F>0.2?60:0,this.bedCoins.count=J>L(8)-0.2&&J<L(28)-1?Math.max(30,Math.round(220-(J-L(8))*12)):220;let r=new v9,u=L(8)-0.2;for(let c=0;c<360;c++){let P0=u+1+c*0.045;if(!(J>P0&&J<L(28)-1)){r.scale.setScalar(0.0001),r.updateMatrix(),this.roadCoins.setMatrixAt(c,r.matrix);continue}let m0=this.truckAt(P0),Z0=J-P0,O0=Math.min(1,Z0*1.8),_0=w(1.6,0.04,O0)+Math.abs(Math.sin(O0*Math.PI*2))*0.25*(1-O0);r.position.set(m0.x-2.4+(b0(c)-0.5)*1.2-Math.min(Z0,0.5)*2,_0,m0.z+(b0(c+1)-0.5)*2.4),r.rotation.set(O0>=1?Math.PI/2*0:Z0*9,b0(c+2)*6,O0>=1?0:Z0*7),r.scale.setScalar(1),r.updateMatrix(),this.roadCoins.setMatrixAt(c,r.matrix)}this.roadCoins.instanceMatrix.needsUpdate=!0;let x=(c,P0)=>J>=t(c,P0)-0.1?1:0,K0=(c,P0)=>[x(c,/ralph/i),x(c,/local/i),x(c,/m-d/i),x(P0,/never/i),x(P0,/again/i)],R0=[0,0,0,0,0],T0=0;if(J>=L(10)-0.2)R0=K0(10,11);if(J>=L(22)-0.3)R0=K0(22,23);if(J>=L(30)-0.6){let c=t(31,/maybe/i);R0=[x(30,/ralph/i),x(30,/local/i),x(30,/m-d/i),J<c?iZ(J,3,0.3+U0(J,L(30),c)*0.6):0,x(31,/again/i)],T0=J>=c-0.1?iZ(J,7,Math.max(0,0.6-(J-c))):0}if(Q==="neon2"||Q==="leave2")R0[3]=R0[3]*iZ(J,1,0.25);R0.forEach((c,P0)=>this.sign.set(P0,c)),this.maybe.set(0,T0),this.maybe.group.visible=J>=L(30)-0.6,this.signGlow.intensity=R0.reduce((c,P0)=>c+P0,0)/5*30*(0.4+F*0.6),this.signGlow.color.setHex(T0>0.5?16761421:16731517);let l=(c,P0,J0=38)=>({pos:c,look:P0,fov:J0}),F0=(c)=>[c[0]+G.x,c[1]+G.y,c[2]+G.z],i=(c,P0=0,J0=0)=>{let m0=[1.5,1.2,-2.78];return l(F0([m0[0]+P0,m0[1]+0.05+J0,m0[2]+c]),F0(m0),30)};Object.assign(W,{focus:0,aperture:0.002,bloom:0.45,exposure:q&&F>0.5?1.35:1,warmth:0.25,saturation:0.92,contrast:1.06,vignette:0.55,grain:0.07,aberration:0.5,halation:0.5,letterbox:1,leak:0,fade:0}),W.shadows.setRGB(0.42,0.5,0.6),W.highlights.setRGB(0.6,0.52,0.42);let N0=0.4,G0=null;switch(Q){case"title":{q9(Y,l([-30,40,70],[-10,30,-100],42),l([-6,3.2,26],[-1.5,2.2,0],34),Z9(U)),Object.assign(W,{warmth:-0.45,exposure:1.05,bloom:0.7}),N0=0.2;break}case"desk":{q9(Y,l(F0([3.4,1.6,0.4]),F0([1.5,1.05,-2.4]),34),l(F0([2.6,1.45,-0.6]),F0([1.4,1.1,-2.4]),30),U),G0=y.position.clone().add(W7(0,1.4,0));break}case"pillow":{q9(Y,l(F0([-2.8,2.9,-1.2]),F0([-2.8,0.8,-2.2]),40),l(F0([-2.6,2.4,-1.4]),F0([-2.8,0.8,-2.3]),34),U),G0=W7(G.x-2.8,0.9,G.z-2.3),W.warmth=0.1;break}case"loop":case"state":case"reread":case"context":case"summary":case"app":case"rename":case"rename2":case"twenty":{let c=Q==="loop"||Q==="twenty"?1.5:1;if(q9(Y,i(c+0.15,-0.08,0.02),i(c,0.06,0),U),G0=W7(G.x+1.5,1.2,G.z-2.7),W.aperture=0.004,W.warmth=Q==="loop"&&J>t(2,/light/i)?-0.25:0,Q==="context"&&J>t(14,/forty/i))W.aberration=2.2,W.warmth=0.1;N0=0.25;break}case"ralph":{q9(Y,l(F0([-0.3,1.5,-0.4]),F0([1.1,1.2,-2.5]),34),l(F0([0,1.45,-0.8]),F0([1.1,1.25,-2.5]),30),U),G0=p.position.clone().add(W7(0,0.5,0)),W.aperture=0.005,W.warmth=-0.2;break}case"dream":{q9(Y,l(F0([-1.4,1.6,-0.2]),F0([-2.8,1.4,-2.2]),40),l(F0([-1.9,1.9,-0.6]),F0([-2.8,1.6,-2.3]),36),U),G0=W7(G.x-2.8,1.5,G.z-2.2),Object.assign(W,{warmth:-0.3,saturation:1.1,bloom:1,halation:1}),N0=0.2;break}case"dawn":{q9(Y,l(F0([3.6,1.5,0.6]),F0([2,1.4,-1.8]),36),l(F0([3.1,1.6,0.1]),F0([2,1.45,-1.8]),32),U),G0=y.position.clone().add(W7(0,1.4,0)),Object.assign(W,{warmth:0.5,leak:0.25});break}case"tenof":{q9(Y,l(F0([0.2,1.45,-1.2]),F0([0.9,1.15,-2.6]),32),l(F0([0.35,1.35,-1.5]),F0([0.8,1.15,-2.6]),28),U),G0=this.jar.position.clone().add(G).add(W7(0,0.2,0)),W.aperture=0.006;break}case"leave":case"leave2":{if(Q==="leave")q9(Y,l([20,0.8,9.5],[6,1.2,9],40),l([22,1.2,10],[9,1,10.5],36),U);else q9(Y,l([-10,1.6,14.5],[40,1.2,10],30),l([-10,2.4,14.5],[80,1,10],26),U);G0=this.truck.position.clone().add(W7(0,1,0)),W.aperture=0.0004,Object.assign(W,{warmth:Q==="leave"?-0.1:0.45,bloom:0.6,leak:Q==="leave2"?0.2:0}),N0=0.6;break}case"neon":case"neon2":case"maybe":{let c=this.signGroup.position;if(Q==="neon")q9(Y,l([c.x+2,3.2,c.z+30],[c.x,c.y-0.5,c.z],36),l([c.x-1,5,c.z+24],[c.x,c.y,c.z],34),U);else if(Q==="neon2")q9(Y,l([c.x+14,5.5,c.z+20],[c.x,c.y,c.z],36),l([c.x-8,6.5,c.z+22],[c.x,c.y,c.z],34),U);else q9(Y,l([c.x+8,7.4,c.z+12],[c.x+3,c.y,c.z],32),l([c.x+6,7.8,c.z+10],[c.x+3.2,c.y,c.z],28),U);G0=c.clone(),W.aperture=0.0012,Object.assign(W,{warmth:Q==="maybe"?0.3:0,bloom:0.45,halation:0.35,exposure:0.9}),N0=0.3;break}case"baggage":{q9(Y,l(F0([0.4,0.5,1.8]),F0([0.4,0.4,-0.6]),40),l(F0([0.9,0.6,1.6]),F0([1.6,0.4,-0.6]),38),U),G0=p.position.clone();break}case"approach":{q9(Y,l(F0([1.6,1.6,-0.2]),F0([1.6,1.9,-3.1]),40),l(F0([1.6,1.8,-1]),F0([1.6,2,-3.1]),34),U),G0=W7(G.x+1.6,2,G.z-3.1),W.warmth=-0.1;break}case"commit":{q9(Y,l(F0([0.7,1.85,-0.7]),F0([1.5,1.15,-2.6]),34),l(F0([0.85,1.75,-0.95]),F0([1.5,1.15,-2.6]),30),U),G0=W7(G.x+1.5,1.1,G.z-2.4),W.aperture=0.006,N0=1.6;break}case"limit":{q9(Y,i(1.7,0,0.1),i(0.9,0,0.02),U),G0=W7(G.x+1.5,1.2,G.z-2.7),Object.assign(W,{warmth:-0.5,exposure:0.9,saturation:0.7}),N0=0.15;break}case"goodbye":{q9(Y,l(F0([-1.2,1.7,1.4]),F0([-4.4,1.8,-0.4]),34),l(F0([-1.8,1.7,0.9]),F0([-4.4,1.8,-0.4]),32),U),G0=y.position.clone().add(W7(0,1.5,0)),Object.assign(W,{warmth:0.55,exposure:0.95,leak:0.2});break}case"renews":{let c=W7(G.x-1,2.45,G.z-3.12);q9(Y,l([c.x,c.y,c.z+1.8],c.toArray(),30),l([c.x,c.y,c.z+1],c.toArray(),30),U),G0=c,W.aperture=0.008,Object.assign(W,{warmth:0.6,leak:a0(t(27,/renews/i)-0.3,t(27,/renews/i)+0.6,J)*0.7}),N0=0.1;break}case"return":{q9(Y,l([30,1.4,16.5],[60,1.5,13],32),l([26,1.2,16.5],[16,1.3,13],38),U),G0=this.truck.position.clone().add(W7(0,1,0)),W.aperture=0.0005,Object.assign(W,{warmth:0.35,bloom:0.5}),N0=0.5;break}case"whiskey":{if(q9(Y,l(F0([0.6,1.35,-1.5]),F0([0.15,1.05,-2.3]),32),l(F0([0.45,1.25,-1.7]),F0([0.2,1.05,-2.3]),28),U),G0=this.glassFill.position.clone().add(G),W.aperture=0.006,W.warmth=0.55,J>t(29,/changed/i)-0.3)q9(Y,i(0.7,0.05,0),i(0.6,-0.04,0),U0(J,t(29,/changed/i)-0.3,K)),G0=W7(G.x+1.5,1.2,G.z-2.7),W.warmth=0.1;break}case"helping":{q9(Y,l(F0([1.5,1.6,-0.6]),F0([1.5,1.45,-2.8]),32),l(F0([1.5,1.55,-0.9]),F0([1.5,1.5,-2.8]),28),U),G0=p.position.clone().add(W7(0,0.5,0)),W.aperture=0.005,W.warmth=0.3;break}case"end":{q9(Y,l([-4,2.4,22],[-1,2.2,0],34),l([-20,30,70],[-10,35,-100],44),Z9(U)),Object.assign(W,{warmth:0.3,bloom:0.5}),N0=0.2;break}}if(sZ(Y,J,N0),this.sky.mesh.position.copy(Y.position),this.sky.stars.position.copy(Y.position),this.moon.position.copy(Y.position).add(W7(-160,120,-380)),W.focus=G0?Y.position.distanceTo(G0):0,H<0.6&&(Q==="leave"||Q==="return"))W.leak=Math.max(W.leak,(1-H/0.6)*0.6);this.film.look.grain=0.06+r7(J)*0.01}drawScreen(J,$){let Q=this.screen,Z="#3ee07a",K="#6b7a90",U="#ff5f6b",H="#ffd166",Y="#7ad8ff",W=".claude/ralph-loop.local.md";if(J<L(2)-0.4)Q.show([{text:"$ claude",color:"#6b7a90"},"> build me the whole app.","  tests, docs, deploy. by morning.",{text:"",size:20},{text:"sure! I'll get started.",color:"#3ee07a"}],{title:"~/app",cursor:Math.floor(J*2)%2===0});else if(J<L(3)-0.3)Q.show([{text:"$ claude",color:"#6b7a90"},`> /ralph-loop "${G$("build the whole app",U0(J,L(2),t(2,/spec/i)+0.6))}"`,{text:J>t(2,/light/i)?"  loop started · going to bed":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<L(4)-0.3)Q.show([{text:"$ cat .claude/ralph-loop.local.md",color:"#6b7a90"},"---","active: true",`max_iterations: ${J>t(3,/ten/i)-0.2?"10":""}`,'completion_promise: "DONE"',"---",{text:J>t(3,/polite/i)?"# ten is polite.":"",color:"#6b7a90"}],{title:".claude/ralph-loop.local.md"});else if(J<L(7)-0.3){let G=Math.min(10,1+Math.floor(U0(J,L(4),L(7))*10));Q.show([{text:`iteration ${G}/10`,color:"#ffd166",bold:!0},"reading context…","editing src/app.tsx",{text:"✓ tests pass (2 of 41)",color:"#3ee07a"},{text:`tokens: ${(G*9.8).toFixed(0)}% of plan`,color:G>7?"#ff5f6b":"#6b7a90"}],{title:"ralph-loop",cursor:Math.floor(J*3)%2===0})}else if(J<L(9)-0.2)Q.show([{text:"iteration 10/10",color:"#ffd166",bold:!0},{text:"max_iterations reached.",color:"#ff5f6b"},{text:"tokens: 100% of plan",color:"#ff5f6b",bold:!0},"",{text:"app status: half",color:"#6b7a90"}],{title:"ralph-loop"});else if(J<L(12)-0.3)Q.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md",`$ ${G$("mv .claude/ralph-loop.local.md .claude/ralph-loop.local.md-NEVER_AGAIN",U0(J,L(9),n0(9)+0.4))}`,{text:J>n0(9)+0.5?"renamed.":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<L(14)-0.1){let G=Array.from({length:9},(N,q)=>({text:`> ${["previous attempt:","re-reading thread (1 of 1,204)","loading transcript…","loading last round…","loading the round before…","carrying over context","summarizing summaries","re-reading thread (2 of 1,204)","loading transcript…"][(q+Math.floor(J*8))%9]}`,color:q%3?"#6b7a90":"#7ad8ff"}));Q.show([{text:`iteration ${3+Math.floor((J-L(12))*1.5)}/10`,color:"#ffd166",bold:!0},...G],{title:"ralph-loop"})}else if(J<L(15)-0.1){let G=Math.min(40,Math.round(U0(J,L(14),t(14,/forty/i))*40)),N="█".repeat(Math.round(G/2.5))+"░".repeat(40-Math.round(G/2.5)),q=J>t(14,/forty/i)+0.3;Q.show([{text:"context window",color:"#6b7a90"},{text:N,color:G>=40?"#ff5f6b":"#3ee07a"},{text:`${G}% used`,color:G>=40?"#ff5f6b":"#3ee07a",bold:!0},{text:q?"quality: [REDACTED BY ENTROPY]":"quality: sharp",color:q?"#ff5f6b":"#3ee07a"}],{title:"ralph-loop"})}else if(J<L(16)-0.1){let G=Math.min(14,Math.floor((J-L(15))*6));Q.show(Array.from({length:G},(N,q)=>({text:"new approach:",color:q%2?"#ffd166":"#7ad8ff"})),{title:"ralph-loop"})}else if(J<L(17)-0.1)Q.show([{text:"SUMMARY",color:"#6b7a90",bold:!0},{text:"✨ Great progress!",color:"#3ee07a",bold:!0,size:56},{text:"Almost done!",color:"#3ee07a",bold:!0,size:56},"",{text:"(tests: 2 of 41)",color:"#6b7a90",size:26}],{title:"ralph-loop"});else if(J<L(18)-0.1)Q.show([{text:"schema.sql",color:"#7ad8ff"},"CREATE TABLE users (","  id serial,","  -- TODO","",{text:"// TODO  // TODO  // TODO",color:"#ffd166"}],{title:"localhost:3000",banner:{text:"[ Coming Soon ]",color:"#3a6ad8"}});else if(J<L(20)-0.2)Q.show([{text:"$ git status",color:"#6b7a90"},"modified: everything",`$ ${G$('git commit -m "burned all my tokens"',U0(J,L(18),t(19,/tokens/i)+0.3))}`,{text:J>t(19,/hundred/i)?"plan: $100 · used: 100%":"",color:"#ff5f6b",bold:!0}],{title:"~/app",cursor:!0});else if(J<L(24)-0.5)Q.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md",`$ ${G$("mv .claude/ralph-loop.local.md .claude/ralph-loop.local.md-NEVER_AGAIN",U0(J,L(21),n0(21)+0.4))}`,{text:J>n0(21)+0.5?"renamed. again.":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<L(29))Q.show([{text:"",size:20}],{title:"claude",bg:"#120b0e",banner:{text:"Usage limit reached · resets 9:00 AM",color:"#b3122e"}});else if(J<L(32)-0.4)Q.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md-NEVER_AGAIN",`$ ${G$("mv .claude/ralph-loop.local.md-NEVER_AGAIN .claude/ralph-loop.local.md-MAYBE_AGAIN",U0(J,t(29,/changed/i)-0.2,n0(29)+0.4))}`],{title:"~/app",cursor:!0});else Q.show([{text:"$ cat .claude/ralph-loop.local.md",color:"#6b7a90"},"---","active: true",{text:`max_iterations: ${J>t(32,/twenty/i)-0.2?"20":""}`,color:"#ffd166",bold:!0},"---",{text:J>L(33)-0.4?"I'm helping!":"",color:"#3ee07a",bold:!0}],{title:".claude/ralph-loop.local.md",cursor:!0})}t=0;render(){this.film.render(this.t)}}var IE=/^(never|again|quota's|burned|tokens|token|limit|hundred-dollar|dime|spent|shaking)$/,zE=/^(loop|ralph|ralph-loop|state|file|context|iterations|m-d|local|thread|schema|todos|commit)$/,AE=/^(dawn|six|coffee|whiskey|nine|renews|maybe|helping|helping!|twenty|green|checkmarks|progress)$/,rW={title:"NEVER_AGAIN",fonts:['400 100px "Rye"','400 100px "Monoton"','700 40px "Libre Baskerville"','italic 400 40px "Libre Baskerville"','700 40px "Caveat"','500 20px "JetBrains Mono"','800 40px "Inter"'],overlays:()=>`
  <div class="ov title" data-show="1.2|L0-0.6">NEVER_AGAIN<small>an outlaw country lament</small></div>
  <div class="ov bubble" data-show="W4:helping-0.1|L5-0.2" data-at="W4:helping-0.1">I'm helping!</div>
  <div class="ov card bill" data-show="W19:hundred-0.2|L20-0.3"><div class="bar">Claude Max · monthly</div>
    <div class="row">plan <b>$100</b></div>
    <div class="row">used <b data-count="0,100" data-at="W19:hundred-0.2" data-until="E19">0</b>%</div>
    <div class="row muted" data-at="E19-0.4">resets 9:00 AM</div></div>
  <div class="ov bubble big" data-show="W33:helping-0.1|W33:helping+2.2" data-at="W33:helping-0.1">I'm helping!</div>`,endAt:()=>t(33,/helping/i)+2.4,words:{hot:IE,ice:zE,gold:AE},hud:(J,$)=>({left:`never_again &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`${aW(J)} &nbsp;·&nbsp; quota <b>${J<L(2)?"100%":J<L(28)-0.6?"gone":"renewed"}</b>`}),shots:rZ,shotAt:aZ,world:(J)=>{let $=new VQ(J);return{update:(Q)=>$.update(Q),render:()=>$.render(),flash:(Q)=>$.flash(Q),fade:(Q)=>$.fade(Q),scene:$.scene,camera:$.camera,bars:()=>$.film.look.letterbox*DQ}}};var J7=(J,$,Q,Z)=>({name:J,at:$,label:Q,section:Z}),zH=(J,$)=>[J7("ask",L(J)-0.3,"can you explain that function?",$),J7("shrug",L(J+1)-0.2,"I don't know, I don't know",$),J7("ask2",L(J+2)-0.2,"can you explain that function?",$),J7("plank",L(J+3)-0.3,"over the plank you go",$)];function JK(){return[J7("title",0,"a shanty in one act","verse 1"),J7("sail",L(0)-0.4,"ten times faster, lads","verse 1"),J7("crates",L(2)-0.3,"four thousand lines","verse 1"),J7("green",L(4)-0.2,"the tests were green","verse 1"),J7("lgtm",L(5)-0.2,"L-G-T-M","verse 1"),J7("diff",L(6)-0.2,"read the diff at last","verse 1"),J7("mast",L(7)-0.2,"hollered from the mast","verse 1"),...zH(8,"chorus"),J7("kevin",L(12)-0.4,"it's just a helper","verse 2"),J7("bosun",L(14)-0.2,"load-bearing","verse 2"),J7("pulled",L(15)-0.2,"the mast stayed up","verse 2"),J7("cook",L(16)-0.2,"what's this thing for?","verse 2"),J7("great",L(17)-0.1,"great question!","verse 2"),...zH(18,"chorus"),J7("barnacles",L(22)-0.8,"slop creeps in like barnacles","verse 3"),J7("hull",L(24)-0.2,"a retry inside a retry","verse 3"),J7("stern",L(28)-0.3,"all barnacle, stem to stern","verse 3"),J7("steer",L(29)-0.2,"ten times harder to steer","verse 3"),J7("quarters",L(30)-1,"who approved that function?","bridge"),J7("blame",L(31)-0.2,"you did, Cap'n. nine seconds.","bridge"),J7("crew",L(32)-0.2,"nobody tell the crew","bridge"),J7("heard",L(33)-0.3,"we heard","bridge"),...zH(34,"last chorus"),J7("built",L(38)-0.3,"the plank was built by Claude","last chorus"),J7("fell",L(39)-0.2,"when Cap'n fell","last chorus"),J7("bottom",L(40)-0.6,"ten times faster to the bottom","outro"),J7("end",L(41)-0.3,"great question!","outro")]}var JG=null,PH=(J)=>{let $=JG??=JK(),Q=$[0];for(let Z of $)if(Z.at<=J)Q=Z;return Q},LE=(J)=>{let $=JG??=JK();return $[$.indexOf(J)+1]?.at??_7()},tZ=()=>[{who:"jim",walk:L(11)-0.2,drop:t(11,/^go/i),splash:t(11,/splash/i)},{who:"cook",walk:L(21)-0.2,drop:t(21,/^go/i),splash:t(21,/splash/i)},{who:"cap",walk:L(37)-0.2,drop:t(39,/fell/i),splash:t(39,/splash/i)}],CH=(J)=>w(0,0.45,U0(J,L(22),L(24)))+w(0,0.55,U0(J,L(24),n0(28))),PE=(J)=>J<L(22)?0.05:J<L(30)-1?w(0.1,0.45,U0(J,L(22),L(30))):J<L(34)-0.3?0.12:J<L(40)-0.6?1:0.7,CE=(J)=>J<L(22)?0.86:J<L(30)-1?w(0.8,0.5,U0(J,L(22),L(30)-1)):J<L(34)-0.3?0.03:J<L(40)-0.6?0.18:w(0.3,0.42,U0(J,L(40),_7()));function R6(J,$,Q,Z){return(0.18+0.75*Z)*(0.55*Math.sin(J*0.32+Q*1.3)+0.35*Math.sin($*0.41-Q*0.9+J*0.12)+0.18*Math.sin((J+$)*0.9+Q*2.1))}var l9=(J,$=0.8,Q={})=>new F9({color:J,roughness:$,metalness:0,...Q});function N$(J,$,Q,Z){let K=Object.assign(document.createElement("canvas"),{width:J,height:$});Q(K.getContext("2d"));let U=new D7(K);if(U.colorSpace=V7,U.anisotropy=8,Z)U.wrapS=U.wrapT=a8,U.repeat.set(...Z);return U}var AH=(J,$)=>N$(512,512,(Q)=>{for(let Z=0;Z<16;Z++){let K=b0(Z*3.1);Q.fillStyle=`rgb(${J.map((U)=>Math.round(U*(0.8+K*0.35))).join(",")})`,Q.fillRect(0,Z*32,512,31),Q.fillStyle="rgba(0,0,0,.45)",Q.fillRect(0,Z*32+31,512,1),Q.fillStyle="rgba(0,0,0,.12)";for(let U=0;U<14;U++)Q.fillRect(b0(Z*50+U)*512,Z*32+b0(U+Z)*30,30+b0(U*7+Z)*90,1);Q.fillStyle="rgba(0,0,0,.3)",Q.fillRect(b0(Z+99)*512,Z*32,2,31)}},$),tW=(J,$)=>N$(128,128,(Q)=>{for(let Z=0;Z<8;Z++)Q.fillStyle=Z%2?$:J,Q.fillRect(0,Z*16,128,16)},[1,2]),TE=N$(1024,1024,(J)=>{J.fillStyle="#efe4c8",J.fillRect(0,0,1024,1024);for(let $=0;$<6;$++)J.fillStyle="rgba(120,90,50,.18)",J.fillRect($*171,0,3,1024);for(let $=0;$<4000;$++)J.fillStyle=`rgba(110,80,40,${b0($)*0.05})`,J.fillRect(b0($+1)*1024,b0($+2)*1024,3,3);J.fillStyle="#b8282a",J.font='900 420px "Inter", sans-serif',J.textAlign="center",J.fillText("10×",512,600),J.font='800 70px "JetBrains Mono", monospace',J.fillText("POWERED BY A-I",512,760)}),wE=N$(256,256,(J)=>{J.fillStyle="#8a6238",J.fillRect(0,0,256,256),J.strokeStyle="#4a3018",J.lineWidth=14,J.strokeRect(7,7,242,242),J.beginPath(),J.moveTo(10,10),J.lineTo(246,246),J.stroke(),J.fillStyle="rgba(20,10,0,.85)",J.font='800 54px "JetBrains Mono", monospace',J.textAlign="center",J.fillText("PR #1",128,112),J.font='700 40px "JetBrains Mono", monospace',J.fillText("+4,000",128,172)}),E7=(J=0,$=0,Q=0)=>new v(J,$,Q),S9=1.2,eZ=(J)=>L9((J-1.5)/4),LH=(J)=>S9+eZ(J)**2*0.5,eW=(J)=>1.7*(1-eZ(J)**2*0.95);function _Q(J){let $=new H0,Q=l9(J.skin??14264450,0.7),Z=new h(new w0(0.25,0.22,0.7,16),J.shirt);Z.position.y=1.2;let K=new H0;K.position.y=1.75,K.add(new h(new p0(0.18,20,16),Q));let U=new h(new p0(0.035,10,8),l9(3805200,0.9));U.position.set(0,-0.06,0.165),U.scale.set(1.4,0.4,0.5),K.add(U);for(let W of[-1,1]){let G=new h(new p0(0.022,8,6),l9(1118481,0.4));G.position.set(W*0.065,0.03,0.16),K.add(G)}if(J.beard!==void 0){let W=new h(new p0(0.185,16,10,0,Math.PI*2,Math.PI*0.5,Math.PI*0.45),l9(J.beard,0.95));K.add(W)}if(J.hat==="tricorn"){let W=l9(1841698,0.8),G=new h(new w0(0.34,0.34,0.04,3),W);G.position.y=0.13,G.rotation.y=Math.PI/6+Math.PI;let N=new h(new w0(0.15,0.19,0.18,18),W);N.position.y=0.22;let q=new h(new Y7(0.3,0.012,6,3),new F9({color:14200928,metalness:0.8,roughness:0.35}));q.rotation.x=Math.PI/2,q.rotation.z=Math.PI/6+Math.PI,q.position.y=0.15,K.add(G,N,q)}else if(J.hat==="beanie"){let W=new h(new p0(0.19,18,10,0,Math.PI*2,0,Math.PI/2.2),l9(11680298,0.95));W.position.y=0.03,K.add(W)}else if(J.hat==="chef"){let W=new h(new w0(0.18,0.18,0.12,18),l9(16052714,0.9));W.position.y=0.16;let G=new h(new p0(0.22,18,12),l9(16052714,0.9));G.position.y=0.33,G.scale.y=0.75,K.add(W,G)}else{let W=new h(new p0(0.188,18,10,0,Math.PI*2,0,Math.PI/2.4),l9(2771594,0.9));K.add(W)}let H=[-1,1].map((W)=>{let G=new H0;G.position.set(W*0.11,0.86,0);let N=new h(new w0(0.1,0.09,0.84,10).translate(0,-0.42,0),l9(J.legs??2894389,0.9)),q=new h(new I0(0.13,0.12,0.28),l9(1971212,0.6));return q.position.set(0,-0.82,0.05),G.add(N,q),G}),Y=[-1,1].map((W)=>{let G=new H0;G.position.set(W*0.3,1.48,0);let N=new h(new w0(0.07,0.06,0.62,8).translate(0,-0.31,0),J.shirt),q=new h(new p0(0.065,10,8),Q);return q.position.y=-0.65,G.add(N,q),G});return $.add(Z,K,...H,...Y),$.traverse((W)=>{if(W.isMesh)W.castShadow=!0}),Object.assign($.userData,{head:K,arms:Y,legs:H,mouth:U}),$.scale.setScalar(J.scale??1),$}function M6(J,$,Q,Z={}){let[K,U]=J.userData.arms,H=Math.sin(Q*Math.PI*2/(O8()*2)),Y=(G,N,q)=>G.rotation.set(N,0,q);switch($){case"down":Y(K,0.05,-0.12),Y(U,0.05,0.12);break;case"haul":Y(K,-1.1-H*0.45,-0.1),Y(U,-1.1+H*0.45,0.1);break;case"shrug":Y(K,-0.5,-1.1),Y(U,-0.5,1.1);break;case"point":Y(K,0.05,-0.12),Y(U,-1.55,0.05);break;case"up":Y(K,-0.2,-2.7-H*0.15),Y(U,-0.2,2.7+H*0.15);break;case"hips":Y(K,0.2,-0.6),Y(U,0.2,0.6);break;case"pull":Y(K,-1.3+H*0.2,-0.05),Y(U,-1.3+H*0.2,0.05);break;case"hush":Y(K,0.05,-0.12),Y(U,-2.3,0.6);break;case"wheel":Y(K,-1.2+Math.sin(Q*3)*0.25,-0.25),Y(U,-1.2-Math.sin(Q*3)*0.25,0.25);break}J.userData.head.rotation.set(Z.tilt??0,Z.turn??0,Math.sin(Q*Math.PI/O8())*0.06),J.userData.mouth.scale.y=0.4+(Z.sing??0)*(0.8+Math.abs(Math.sin(Q*17))*0.9);let W=Z.walk??0;J.userData.legs.forEach((G,N)=>G.rotation.x=Math.sin(Q*7+N*Math.PI)*0.45*W)}function SE(){let J=new H0,$=l9(15234107,0.4,{metalness:0.2}),Q=new h(new k7(0.09,0.14,6,12),$);Q.rotation.x=0.4,Q.position.y=0.14;let Z=new H0;Z.position.set(0,0.3,0.05),Z.add(new h(new p0(0.085,16,12),$));let K=new h(new g9(0.03,0.09,10),l9(15909198,0.5));K.rotation.x=Math.PI/2+0.5,K.position.set(0,-0.015,0.09);let U=new C0({color:7336191,toneMapped:!1});for(let W of[-1,1]){let G=new h(new p0(0.02,8,6),U);G.position.set(W*0.05,0.02,0.06),Z.add(G)}Z.add(K);let H=[-1,1].map((W)=>{let G=new H0;G.position.set(W*0.08,0.2,0);let N=new h(new I0(0.22,0.02,0.12).translate(W*0.11,0,0),l9(12866858,0.5));return G.add(N),G}),Y=new h(new I0(0.06,0.02,0.22).translate(0,0,-0.11),l9(2779824,0.5));return Y.position.set(0,0.06,-0.06),Y.rotation.x=0.5,J.add(Q,Z,...H,Y),J.traverse((W)=>{if(W.isMesh)W.castShadow=!0}),J.userData={head:Z,wings:H},J}class $G{canvas=Object.assign(document.createElement("canvas"),{width:1024,height:1280});texture=new D7(this.canvas);key="";constructor(){this.texture.colorSpace=V7,this.texture.anisotropy=8}show(J,$){let Q=JSON.stringify([J,$]);if(Q===this.key)return;this.key=Q;let Z=this.canvas.getContext("2d");Z.fillStyle="#ead9ac",Z.fillRect(0,0,1024,1280);for(let H=0;H<2500;H++)Z.fillStyle=`rgba(120,80,30,${b0(H)*0.06})`,Z.fillRect(b0(H+3)*1024,b0(H+4)*1280,4,4);let K=Z.createRadialGradient(512,640,300,512,640,900);K.addColorStop(0,"rgba(0,0,0,0)"),K.addColorStop(1,"rgba(90,50,10,.55)"),Z.fillStyle=K,Z.fillRect(0,0,1024,1280),Z.fillStyle="#3a2410",Z.font='italic 700 62px "Playfair Display", Georgia, serif',Z.fillText(J,70,140),Z.fillRect(70,170,884,4);let U=270;for(let H of $)Z.font='700 46px "JetBrains Mono", monospace',Z.fillStyle=H.color??"#2a1a0c",Z.fillText(H.text,70,U),U+=74;this.texture.needsUpdate=!0}}class TH{renderer;scene=new i7;camera=new Z7(38,1.7777777777777777,0.05,1500);film;sky=new OQ(700);sun=new a7(16777215,1);hemi=new U8(12572415,1718852,0.6);fill=new a7(16773344,0.6);ocean;ship=new H0;sail;sailBase;plank=new H0;helper;crates=[];barnacles;barnacleSpots=[];lanterns=[];lanternGlass=[];scroll=new $G;scrollMesh;splash;rings;rain;cap=_Q({shirt:l9(1911634,0.8),hat:"tricorn",beard:5913124,legs:15327951,scale:1.05});kevin=_Q({shirt:l9(16777215,0.9,{map:tW("#f2efe6","#1e3d7a")}),hat:"beanie",skin:15186070});bosun=_Q({shirt:l9(6965802,0.9),hat:"bandana",beard:2234383,skin:10119752,scale:1.12});cook=_Q({shirt:l9(16052714,0.9),hat:"chef",skin:12947306});jim=_Q({shirt:l9(16777215,0.9,{map:tW("#f2efe6","#a12a2a")}),hat:"beanie",beard:10512430,skin:14724742});parrot=SE();constructor(J){this.renderer=new E8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=gJ,this.renderer.toneMapping=k8,this.film=new EQ(this.renderer,this.scene,this.camera),this.scene.fog=new EJ(10467016,0.012),this.scene.add(this.sky.mesh,this.sky.stars,this.hemi,this.sun,this.sun.target,this.fill,this.fill.target),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:1,far:80}),this.sun.shadow.bias=-0.0004,this.sun.shadow.normalBias=0.03;let $=new t0(180,180,150,150);$.rotateX(-Math.PI/2),this.ocean=new h($,new F9({color:1923952,roughness:0.22,metalness:0.1,flatShading:!0})),this.ocean.name="ocean",this.ocean.receiveShadow=!0,this.scene.add(this.ocean),this.buildShip(),this.scene.add(this.ship),Object.entries({cap:this.cap,kevin:this.kevin,bosun:this.bosun,cook:this.cook,jim:this.jim,parrot:this.parrot}).forEach(([Y,W])=>W.name=Y);let Q=260,Z=new V9;Z.setAttribute("position",new H7(new Float32Array(Q*3),3)),this.splash=new Q8(Z,new s7({color:15398655,size:0.22,transparent:!0,depthWrite:!1})),this.splash.frustumCulled=!1,this.rings=new h(new N6(0.8,1,48),new C0({color:15398655,transparent:!0,side:d9,depthWrite:!1})),this.rings.rotation.x=-Math.PI/2;let K=4000,U=new Float32Array(K*3);for(let Y=0;Y<K;Y++)U.set([(b0(Y)-0.5)*40,b0(Y+7000)*20,(b0(Y+9000)-0.5)*40],Y*3);let H=new V9;H.setAttribute("position",new H7(U,3)),this.rain=new Q8(H,new s7({color:12110040,size:0.05,transparent:!0,opacity:0,depthWrite:!1})),this.rain.frustumCulled=!1,this.scene.add(this.splash,this.rings,this.rain,this.parrot)}buildShip(){let J=this.ship,$=new I0(11,2.2,3.4,40,6,8),Q=$.attributes.position;for(let k=0;k<Q.count;k++){let f=Q.getX(k),s=Q.getY(k),j=Q.getZ(k),p=eZ(f),e=L9((1.1-s)/2.2),n=(1-p*p*0.95)*(1-e*e*0.55);Q.setXYZ(k,f-(f<-4.5?(f+4.5)*0.2:0),s+p*p*0.5*(s>0?1:0.3),j*n)}$.computeVertexNormals();let Z=l9(16777215,0.75,{map:AH([110,66,38],[3,1])}),K=new h($,Z);K.name="hull",K.position.y=S9-1.1-0.02,K.castShadow=K.receiveShadow=!0;let U=new h($.clone(),l9(14200928,0.5));U.scale.set(1.002,0.06,1.01),U.position.y=0.85;let H=new t0(1,1,48,8).rotateX(-Math.PI/2),Y=H.attributes.position;for(let k=0;k<Y.count;k++){let f=w(-5.25,5.25,Y.getX(k)+0.5);Y.setXYZ(k,f,LH(f)-S9,Y.getZ(k)*2*(eW(f)-0.05))}H.computeVertexNormals();let W=new h(H,l9(16777215,0.8,{map:AH([170,130,85],[2,1])}));W.position.set(0,S9,0),W.receiveShadow=!0,Object.assign(W,{name:"deck",userData:{within:"hull",dry:{water:"ocean",until:L(40)-0.3}}}),J.add(K,U,W);let G=l9(5913122,0.6),N=-2.7;for(let k of[-1,1]){let f=Array.from({length:13},(j,p)=>-5+p*0.8).filter((j)=>!(k>0&&Math.abs(j- -0.2)<0.5)),s=(j)=>E7(j,(j<N?S9+0.6:LH(j))+0.65,k*(eW(j)-0.1));f.forEach((j,p)=>{let e=new h(new I0(0.07,0.65,0.07),G);e.position.copy(s(j)).setY(s(j).y-0.325),Object.assign(e,{name:"post",userData:{within:"hull"}}),e.castShadow=!0,J.add(e);let n=f[p+1];if(n===void 0||n-j>0.81)return;let r=s(j),u=s(n).sub(r),x=new h(new I0(u.length()+0.07,0.08,0.08),G);x.position.copy(r).addScaledVector(u,0.5),x.quaternion.setFromUnitVectors(E7(1,0,0),u.normalize()),Object.assign(x,{name:"rail",userData:{within:"hull"}}),J.add(x)})}let q=new h(new I0(N+5.25,0.6,3.3),l9(16777215,0.8,{map:AH([140,96,60],[1,1])}));q.position.set((N-5.25)/2,S9+0.3,0),q.castShadow=q.receiveShadow=!0,J.add(q);let X=new H0;X.position.set(-3,S9+1.45,0),X.rotation.y=Math.PI/2;let F=new h(new Y7(0.42,0.04,8,24),G);X.add(F);for(let k=0;k<8;k++){let f=new h(new w0(0.025,0.025,1.1),G);f.rotation.z=k*Math.PI/8,X.add(f)}let R=new h(new I0(0.15,0.85,0.15),G);R.position.set(-3,S9+1,0),J.add(X,R),J.userData.wheel=X;let M=new h(new I0(0.9,0.06,0.7),G);M.position.set(-4.4,S9+1.45,0.6);let D=new h(new I0(0.1,0.85,0.1),G);D.position.set(-4.4,S9+1.02,0.6),this.scrollMesh=new h(new t0(0.56,0.7),new F9({map:this.scroll.texture,roughness:0.9})),this.scrollMesh.rotation.x=-Math.PI/2,this.scrollMesh.rotation.z=Math.PI/2,this.scrollMesh.position.set(-4.4,S9+1.485,0.6),J.add(M,D,this.scrollMesh);let E=l9(6965802,0.6),I=new h(new w0(0.12,0.16,8.5),E);I.position.set(0.6,S9+4.25,0),I.name="mast";let C=new h(new w0(0.09,0.12,6),E);C.position.set(-2.6,S9+3+0.6,0);let O=new h(new w0(0.5,0.4,0.4,16,1,!0),l9(5913122,0.7,{side:d9}));O.position.set(0.6,S9+7.2,0);for(let k of[S9+6.4,S9+2.2]){let f=new h(new w0(0.07,0.07,4.6),E);f.rotation.x=Math.PI/2,f.position.set(0.75,k,0),J.add(f)}let B=new t0(4.2,4,16,16);B.rotateY(Math.PI/2),this.sail=new h(B,l9(16777215,0.95,{map:TE,side:d9})),this.sail.position.set(0.85,S9+4.3,0),this.sail.castShadow=!0,this.sailBase=B.attributes.position.array.slice();let _=new h(new t0(0.9,0.55).translate(-0.45,0,0),l9(16777215,0.9,{side:d9,map:N$(256,160,(k)=>{k.fillStyle="#111",k.fillRect(0,0,256,160),k.fillStyle="#f4f1ea",k.font='800 64px "JetBrains Mono", monospace',k.textAlign="center",k.fillText("LGTM",128,104)})}));_.position.set(0.45999999999999996,S9+8.7,0),Object.assign(_,{name:"flag",userData:{clearOf:["mast"]}}),J.add(I,C,O,this.sail,_),J.userData.flag=_,this.helper=new h(new I0(0.42,0.22,0.22),new F9({color:3836506,emissive:2817914,emissiveIntensity:0.6,roughness:0.4})),this.helper.position.set(0.6,S9+0.4,0.2),J.add(this.helper);let A=new h(new I0(0.5,0.07,3.2).translate(0,0,1.6),l9(16777215,0.7,{map:N$(128,512,(k)=>{k.fillStyle="#9a7048",k.fillRect(0,0,128,512);for(let f=0;f<30;f++)k.fillStyle="rgba(60,30,10,.25)",k.fillRect(0,b0(f)*512,128,2);k.save(),k.translate(64,256),k.rotate(Math.PI/2),k.fillStyle="rgba(30,15,5,.75)",k.font='700 30px "JetBrains Mono", monospace',k.textAlign="center",k.fillText("plank.ts · generated",0,10),k.restore()})}));A.castShadow=A.receiveShadow=!0,this.plank.position.set(-0.2,S9+0.05,1.4),this.plank.add(A),J.add(this.plank);let V=new I0(0.56,0.56,0.56),z=l9(16777215,0.8,{map:wE});for(let k=0;k<14;k++){let f=new h(V,z);f.castShadow=f.receiveShadow=!0;let s=k%5,j=Math.floor(k/5),p=2+s%3*0.6+(j===2?0.3:0);f.userData.home=E7(p,LH(p)+0.28+j*0.56,-0.75+Math.floor(s/3)*0.6+(j?0.3:0)),f.rotation.y=(b0(k)-0.5)*0.25,this.crates.push(f),J.add(f)}let y=new v;for(let k=0;k<520;k++){let f=-4.4+b0(k)*8.8,s=-0.5+b0(k+1)*1.4,j=b0(k+2)>0.5?1:-1,p=eZ(f),e=L9((1.1-s)/2.2),n=1.7*(1-p*p*0.95)*(1-e*e*0.55);y.set(f,s+0.08+p*p*0.5*(s>0?1:0.3),j*(n+0.01)),this.barnacleSpots.push({p:y.clone(),n:E7(0,0,j),s:0.025+b0(k+3)*0.04})}this.barnacleSpots.sort((k,f)=>f.p.x-k.p.x+(b0(k.p.y)-0.5)*3),this.barnacles=new f9(new g9(1,1.1,7),l9(11117204,0.95),this.barnacleSpots.length),this.barnacles.castShadow=!0,J.add(this.barnacles);for(let[k,f]of[[-4.9,-1.2],[-1.6,-1.3],[3,1.15]]){let s=new h(new p0(0.1,12,10),new C0({color:16760944,toneMapped:!1}));s.position.set(k,S9+(k<-4?1.75:1),f);let j=new D8(16754768,0,9,1.6);j.position.copy(s.position),this.lanterns.push(j),this.lanternGlass.push(s),J.add(s,j)}for(let k of[this.cap,this.kevin,this.bosun,this.cook,this.jim])J.add(k)}flash(J){let $=0;for(let Q of[L(34),t(35,/know/i),L(36)+0.4,t(39,/fell/i)])if(J>=Q)$=Math.max($,Math.exp(-(J-Q)*9)*0.55);return J>=L(34)-0.3&&J<L(40)-0.6?$:0}fade(J){return a0(n0(41)+0.4,_7(),J)}t=0;update(J){this.t=J;let $=PH(J),Q=$.name,Z=$.at,K=LE($),U=U0(J,Z,K),H=this.camera,Y=this.film.look,W=PE(J),G=CE(J),N=1-a0(0.1,0.4,G),q=r7(J),X=this.sky.set(G,0.9);this.sun.position.copy(X).multiplyScalar(40),this.sun.intensity=w(0.05,2.4,a0(0.15,0.6,G))*(1-W*0.7),this.sun.color.setRGB(1,w(0.7,0.96,G),w(0.5,0.9,G)),this.hemi.intensity=w(0.25,1.1,G)*(1-W*0.4);let F=this.scene.fog;F.color.setRGB(w(0.03,0.62,G),w(0.04,0.72,G),w(0.08,0.8,G)).lerp(new D0(0.12,0.14,0.17),W*0.7),F.density=0.01+W*0.025;let R=this.ocean.geometry.attributes.position,M=J*2.2;for(let l=0;l<R.count;l++){let F0=R.getX(l),i=R.getZ(l);R.setY(l,R6(F0+M,i,J,W))}R.needsUpdate=!0,this.ocean.geometry.computeVertexNormals(),this.ocean.material.color.setRGB(w(0.02,0.1,G),w(0.05,0.36,G),w(0.09,0.44,G)).lerp(new D0(0.08,0.13,0.15),W*0.6);let D=Z9(U0(J,L(40)-0.3,n0(41)+0.5)),E=R6(M,0,J,W),I=R6(4+M,0,J,W),C=R6(-4+M,0,J,W),O=R6(M,1.6,J,W),B=R6(M,-1.6,J,W);this.ship.position.set(0,E*0.6-0.15-D*3.4,0),this.ship.rotation.set((O-B)/3.2*0.5+D*0.25,0,(I-C)/8*0.6-D*0.32),this.ship.userData.wheel.rotation.x=Math.sin(J*0.8)*0.4+(Q==="steer"||Q==="stern"?Math.sin(J*2.6)*1.2:0);let _=this.sail.geometry.attributes.position;for(let l=0;l<_.count;l++){let F0=this.sailBase[l*3+1],i=this.sailBase[l*3+2],N0=(1-(i/2.1)**2)*(1-(F0/2)**2);_.setX(l,N0*(0.55+q*0.08+W*Math.sin(J*9+i*2+F0)*0.12))}_.needsUpdate=!0,this.sail.geometry.computeVertexNormals();let A=this.ship.userData.flag;A.rotation.y=Math.sin(J*4)*0.25+W*Math.sin(J*13)*0.3,this.lanterns.forEach((l,F0)=>l.intensity=(N*2.2+W*1.2)*(0.85+Math.sin(J*11+F0*3)*0.08+Math.sin(J*23+F0)*0.05)),this.lanternGlass.forEach((l)=>l.material.color.setRGB(1,0.75,0.45).multiplyScalar(0.3+N*0.45+W*0.2)),this.crates.forEach((l,F0)=>{let i=l.userData.home,N0=L(2)-0.4+F0*0.12,G0=U0(J,N0,N0+0.55),c=G0<1?(1-G0)**2*7-Math.sin(G0*Math.PI)*0:Math.abs(Math.sin((J-N0-0.55)*9))*Math.exp(-(J-N0-0.55)*6)*0.15;l.position.set(i.x,i.y+c,i.z),l.visible=J>N0});let V=Z9(U0(J,t(15,/pulled/i)-0.1,t(15,/out/i)+0.3));this.helper.position.set(0.6+V*0.4,S9+0.4+V*0.5,0.2+V*0.9),this.helper.rotation.set(V*0.8,V*1.4,0),this.helper.material.emissiveIntensity=0.6+(Q==="bosun"?q*1.2:0);let z=CH(J),y=new h9,k=new v8,f=E7(0,1,0);if(this.barnacleSpots.forEach((l,F0)=>{let i=L9((z*this.barnacleSpots.length-F0)/25),N0=l.s*w9(i);k.setFromUnitVectors(f,l.n),y.compose(l.p.clone().addScaledVector(l.n,N0*0.4),k,E7(N0,N0,N0)),this.barnacles.setMatrixAt(F0,y)}),this.barnacles.instanceMatrix.needsUpdate=!0,this.crewAt(J,Q),J<L(12)){let l=[{text:"+ function doTheThing(x) {"},{text:"+   return helpers.help(x)"},{text:"+     ?? retry(() => retry(() =>"},{text:"+          factory.make(String(x))))"},{text:"+ }"},{text:"+ // what does this do"},{text:"+ // (it helps)"},{text:"  ... 3,993 more lines",color:"#7a5a3a"}];this.scroll.show("PR #1 · the diff",l.slice(0,1+Math.floor(U0(J,L(6)-0.3,n0(7))*l.length)))}else{let l=[{text:"$ git blame doTheThing"},{text:"author:    Claude"},{text:"approved:  Cap'n",color:J>L(31)?"#8a1010":void 0},{text:"review:    L-G-T-M",color:J>t(31,/^L/)?"#8a1010":void 0},{text:`time:      ${J>t(31,/nine/i)?"9 seconds":"…"}`,color:J>t(31,/nine/i)?"#8a1010":void 0},{text:"tell crew: no",color:"#7a5a3a"}];this.scroll.show("who approved it?",l.slice(0,J<L(30)?1:2+Math.floor(U0(J,L(30),n0(32))*4)))}let s=-99,j=E7();for(let l of tZ())if(J>=l.splash-0.05&&l.splash>s)s=l.splash,j=this.plankEnd();let p=J-s,e=this.splash.geometry.attributes.position;for(let l=0;l<e.count;l++){let F0=b0(l)*Math.PI*2,i=0.4+b0(l+1)*1.8,N0=3+b0(l+2)*5;e.setXYZ(l,j.x+Math.cos(F0)*i*p*1.4,j.y+N0*p-4.9*p*p,j.z+Math.sin(F0)*i*p*1.4)}e.needsUpdate=!0,this.splash.visible=p>=0&&p<1.6,this.splash.material.opacity=1-U0(p,0.6,1.6),this.rings.visible=p>=0&&p<3,this.rings.position.set(j.x,j.y+0.05,j.z),this.rings.scale.setScalar(0.3+p*2.2),this.rings.material.opacity=0.8*(1-U0(p,0,3));let n=this.rain.geometry.attributes.position;for(let l=0;l<n.count;l++)n.setY(l,((b0(l+7000)*20-J*14)%20+20)%20);n.needsUpdate=!0,this.rain.material.opacity=a0(0.5,0.9,W)*0.6;let r=(l,F0,i=38)=>({pos:l,look:F0,fov:i}),u=this.ship.position.y,x=this.cap.getWorldPosition(E7()),K0=this.kevin.getWorldPosition(E7());Object.assign(Y,{focus:0,aperture:0.002,bloom:0.4,exposure:1,warmth:0.2,saturation:1.05,contrast:1.05,vignette:0.5,grain:0.06,aberration:0.4,halation:0.4,letterbox:1,leak:0,fade:0}),Y.shadows.setRGB(0.42,0.5,0.58),Y.highlights.setRGB(0.6,0.54,0.44);let R0=0.5;switch(Q){case"title":q9(H,r([22,7,18],[0,3,0],34),r([17,5.5,14],[0,3,0],34),U),Object.assign(Y,{warmth:0.35,leak:0.25});break;case"sail":q9(H,r([9,0.9,6.5],[0.5,4.5+u,0],40),r([7.2,1.2,5.2],[0.5,5+u,0],44),U),Y.warmth=0.3;break;case"crates":q9(H,r([7.5,4.8,4.5],[2.4,1.6+u,-0.6],36),r([6.4,4,3.4],[2.4,1.6+u,-0.6],36),U),Y.focus=5.5,Y.aperture=0.003;break;case"green":case"lgtm":q9(H,r([-1.2,3.4+u,2.6],[x.x,x.y+1.6,x.z],32),r([-1.6,3.2+u,2.2],[x.x,x.y+1.6,x.z],30),U),Y.focus=3.2,Y.aperture=0.006;break;case"diff":q9(H,r([-4,3.5+u,1.6],[-4.4,2.7+u,0.6],30),r([-4.2,3.2+u,1.1],[-4.4,2.6+u,0.6],28),U),Y.focus=1,Y.aperture=0.01,R0=0.3;break;case"mast":q9(H,r([-1,1.9+u,1.3],[x.x,x.y+1.9,x.z],34),r([-1.4,1.7+u,1.05],[x.x,x.y+1.9,x.z],30),U),R0=1.1;break;case"ask":case"ask2":{let l=Q==="ask"?1:-1;q9(H,r([1.6,3.8+u,l*6.2],[-1.2,2.2+u,0],36),r([1,3.4+u,l*5.2],[-1.2,2.2+u,0],36),U),Y.warmth=J>L(34)-0.3?-0.35:0.25,R0=J>L(34)-0.3?1.4:0.7;break}case"shrug":q9(H,r([0.6,2.7+u,3.6],[-0.4,2.3+u,0.2],34),r([0.4,2.6+u,3.1],[-0.4,2.3+u,0.2],32),U),Y.focus=3.4,Y.aperture=0.005,Y.warmth=J>L(34)?-0.35:0.25;break;case"plank":case"fell":{let l=this.plankEnd();q9(H,r([l.x+3.5,0.9,l.z+6.5],[l.x-0.5,1.6+u,l.z-0.8],36),r([l.x+2.6,0.8,l.z+5.4],[l.x-0.4,1.2+u,l.z-0.6],38),U),Y.warmth=J>L(34)-0.3?-0.35:0.25,R0=0.8;break}case"kevin":q9(H,r([2.8,3+u,4.6],[(x.x+K0.x)/2,2.6+u,0.3],36),r([2.4,2.9+u,4.1],[(x.x+K0.x)/2,2.6+u,0.3],34),U),Y.focus=3.5,Y.aperture=0.005;break;case"bosun":case"pulled":q9(H,r([1.6,2.4+u,4.2],[0.8,1.8+u,0.4],34),r([1.4,2.6+u,3.6],[0.8,Q==="pulled"?3.4+u:1.9+u,0.4],38),U),Y.focus=4.4,Y.aperture=0.004;break;case"cook":case"great":{let l=this.parrot.getWorldPosition(E7()),F0=this.cook.getWorldPosition(E7());q9(H,r([l.x+2.2,l.y+0.3,l.z+1.4],[(l.x+F0.x)/2,l.y-0.1,(l.z+F0.z)/2],32),r([l.x+1.4,l.y+0.15,l.z+0.9],[l.x,l.y,l.z],Q==="great"?24:30),U),Y.focus=Q==="great"?1.7:2.4,Y.aperture=0.008,Y.exposure=1.15;break}case"barnacles":q9(H,r([5,0.5,4.2],[3,0.6+u,1.2],36),r([2.5,0.4,3.6],[1,0.6+u,1.4],36),U),Y.focus=3.2,Y.aperture=0.003,Y.warmth=0.1,Y.exposure=1.45;break;case"hull":q9(H,r([4,0.7,4.4],[2,0.6+u,1.4],40),r([-4,0.7,4.4],[-5,0.6+u,1.4],40),U),Y.warmth=0;break;case"stern":q9(H,r([8,3,-7.5],[-1,1.4+u,0],36),r([6.5,2.4,-6],[-1,1.4+u,0],34),U),Y.warmth=-0.1;break;case"steer":q9(H,r([-1.5,3.3+u,-2.4],[x.x,x.y+1.6,x.z],32),r([-1.8,3.1+u,-2],[x.x,x.y+1.6,x.z],30),U),Y.focus=2.6,Y.aperture=0.006,R0=1.4,Y.warmth=-0.15;break;case"quarters":case"crew":q9(H,r([-1.3,4.1+u,3.4],[-4.2,3.2+u,0.5],38),r([-1.6,4+u,3],[-4.2,3.2+u,0.5],36),U),Object.assign(Y,{warmth:0.55,exposure:1.6,bloom:0.45,halation:0.6,saturation:0.9}),Y.focus=3.4,Y.aperture=0.006,R0=0.35;break;case"blame":q9(H,r([-4.05,3.45+u,1.45],[-4.4,2.65+u,0.6],30),r([-4.2,3.25+u,1.05],[-4.4,2.65+u,0.6],26),U),Object.assign(Y,{warmth:0.5,exposure:1,bloom:0.3,halation:0.4}),Y.focus=0.9,Y.aperture=0.01,R0=0.25;break;case"heard":q9(H,r([3.8,3.1+u,-4.8],[0.7,2.7+u,-0.8],30),r([3.5,3+u,-4.4],[0.7,2.7+u,-0.8],27),U),Object.assign(Y,{warmth:0.3,exposure:1.35,saturation:0.85}),Y.focus=5,Y.aperture=0.004;break;case"built":{let l=this.plankEnd();q9(H,r([l.x+1.2,l.y+1.4,l.z+1],[l.x-0.2,l.y,l.z-1.2],34),r([l.x+0.8,l.y+1,l.z+0.6],[l.x-0.2,l.y,l.z-1.2],30),U),Y.focus=1.6,Y.aperture=0.007,Y.warmth=-0.35,Y.exposure=2.1,R0=1.2;break}case"bottom":q9(H,r([16,3.5,13],[0,0.5,0],34),r([13,2.5,11],[0,0,0],34),U),Object.assign(Y,{warmth:-0.2,saturation:0.8});break;case"end":{let l=this.parrot.getWorldPosition(E7());q9(H,r([l.x+2.8,l.y+0.4,l.z+3.4],[l.x,l.y,l.z],30),r([l.x+1.8,l.y+0.2,l.z+2.4],[l.x,l.y,l.z],26),U),Object.assign(Y,{warmth:0.15,saturation:0.9}),Y.focus=3,Y.aperture=0.004;break}}if(W>0.6)Object.assign(Y,{saturation:0.75,contrast:1.15,exposure:1.2,aberration:0.8});if(N>0.5&&Q!=="quarters"&&Q!=="crew"&&Q!=="blame"&&Q!=="heard")Y.exposure=Math.max(Y.exposure,1.25);if(Q==="title")Y.fade=1-a0(0,1.2,J);let T0=H.getWorldDirection(E7());this.fill.position.copy(H.position).add(E7(0,1.5,0)),this.fill.target.position.copy(H.position).addScaledVector(T0,6),this.fill.intensity=(0.25+G*0.55)*(1-W*0.3),sZ(H,J,R0+W*0.8),H.position.y=Math.max(H.position.y,R6(H.position.x+M,H.position.z,J,W)+0.35),this.rain.position.set(H.position.x,0,H.position.z)}plankEnd(){return this.plank.localToWorld(E7(0,0.05,3.1))}crewAt(J,$){let Q=tZ(),Z=(D)=>D.some((E)=>J>=L(E)&&J<=n0(E))?1:0,K=[8,9,10,11,18,19,20,21,34,35,36,37,38,39].some((D)=>J>=L(D)-0.2&&J<=n0(D)+0.2),U=[9,19,35].some((D)=>J>=L(D)-0.1&&J<=n0(D)+0.4),H=Math.sin(J*Math.PI/O8())*0.07,Y=(D,E,I)=>{if(J>=E.splash+0.1)return D.visible=!1,!0;if(D.visible=!0,J<E.walk)return!1;let C=this.plank.position.z,O=this.plank.position.x,B=U0(J,E.walk,E.drop),_=Math.max(I.z,0.75),A=L9(B/0.1),V=L9((B-0.1)/0.2),z=L9((B-0.3)/0.1),y=L9((B-0.4)/0.6),k=w(I.x,O,a0(0,1,V)),f=w(w(I.z,_,a0(0,1,A)),C,a0(0,1,z))+y*2.9,s=w(I.y,S9+0.05,a0(0,1,V)),j=Math.max(0,J-E.drop),p=Math.min(j*j*4.9+j*0.8,S9+3);return D.position.set(k,s-p,f+j*0.6),D.rotation.set(j*2.2,V>0&&V<1?Math.sign(O-I.x)*Math.PI/2:0,0),M6(D,j>0?"up":"down",J,{walk:j>0?0:1,tilt:0.3}),!0},W=E7(-3.5,S9+0.6,0);if(!Y(this.cap,Q[2],W)&&this.cap.visible){let D=J>=L(30)-1&&J<L(34)-0.3;this.cap.position.copy(D?E7(-4.5,S9+0.6,-0.1):$==="green"||$==="lgtm"||$==="diff"?E7(-4.1,S9+0.6,0):E7(-3.5,S9+0.6,0)),this.cap.rotation.set(0,D?Math.PI*0.3:$==="diff"||$==="green"||$==="lgtm"?Math.PI*0.2:Math.PI/2,H*0.5);let E=$==="mast"?"point":$==="steer"||$==="stern"?"wheel":$==="lgtm"?"point":K?"point":$==="crew"?"hush":$==="quarters"?"hips":"down";M6(this.cap,E,J,{sing:$==="mast"||K?1:0,tilt:$==="diff"?0.45:$==="mast"?-0.25:0})}let N=J>=Q[2].drop;if(!N){this.cap.updateMatrixWorld(!0);let D=this.cap.localToWorld(E7(0.28,1.62,0));this.parrot.position.copy(D),this.parrot.rotation.set(0,this.cap.rotation.y+Math.sin(J*0.7)*0.4,0)}else{let D=J-Q[2].drop,E=this.plankEnd();this.parrot.position.set(E.x+Math.sin(J*0.8)*0.6,Math.max(E.y,1.2)+1.2+Math.min(D,2)*0.6+Math.sin(J*3)*0.1,E.z-0.4),this.parrot.rotation.set(0,Math.PI/2+Math.sin(J*0.6)*0.5,0)}let q=N?Math.sin(J*22)*0.9:$==="great"||$==="end"?Math.sin(J*16)*0.5:0;this.parrot.userData.wings.forEach((D,E)=>D.rotation.z=(E?-1:1)*(0.2+q));let X=[17,41].some((D)=>J>=t(D,/great/i)-0.05&&J<=n0(D));if(this.parrot.userData.head.rotation.set(X?-0.35+Math.sin(J*20)*0.15:0,Math.sin(J*1.3)*0.4,0),this.parrot.scale.setScalar($==="end"||$==="bottom"?1.6:1),this.kevin.position.set(0.65,S9,0.85),this.kevin.rotation.set(0,-Math.PI/2+0.3,H),M6(this.kevin,U?"shrug":$==="kevin"?"hips":$==="heard"?"hush":"haul",J,{sing:Z([12,13])||(K?1:0),tilt:$==="heard"?-0.15:0}),$==="heard")this.kevin.position.set(0.5,S9,-0.85);if($==="quarters"||$==="blame"||$==="crew")this.kevin.position.set(-3.05,S9+0.6,1.15),this.kevin.rotation.set(0,-2,0),M6(this.kevin,$==="blame"?"point":"down",J,{sing:Z([31]),tilt:0.15});if(this.bosun.position.set(1.2,S9,0.55),this.bosun.rotation.set(0,-Math.PI*0.75,H),M6(this.bosun,$==="pulled"?"pull":U?"shrug":$==="bosun"?"point":"haul",J,{sing:K?1:0}),$==="heard")this.bosun.position.set(0.85,S9,-0.7),this.bosun.rotation.y=-Math.PI*0.6;let F=E7(-1.4,S9,-0.6);if(!Y(this.cook,Q[1],F)&&this.cook.visible)this.cook.position.copy($==="cook"||$==="great"?E7(-2.5,S9+0.6,-1):F),this.cook.rotation.set(0,$==="cook"||$==="great"?-Math.PI*0.6:Math.PI*0.25,H),M6(this.cook,U?"shrug":$==="cook"?"point":"haul",J,{sing:Z([16])||(K?1:0)});let R=E7(-0.8,S9,0.4);if(!Y(this.jim,Q[0],R)&&this.jim.visible)this.jim.position.copy(R),this.jim.rotation.set(0,Math.PI*0.4,H),M6(this.jim,U?"shrug":"haul",J,{sing:K?1:0});let M=a0(t(39,/fell/i)-0.3,t(39,/fell/i),J);this.plank.rotation.x=M*0.5}render(){this.film.render(this.t)}}var kE=/^(plank|splash!|splash|overboard|fell|bottom|know!|know|don't|nobody|barnacle|barnacles|slop|true|harder)$/,jE=/^(function\?|function|a-i|claude|claude,|helper|helper"|retry|factory|string|date|test|diff|p-r|lines|l-g-t-m!|l-g-t-m\.)$/,vE=/^(cap'n|cap'n!|kevin|kevin,|bosun|cook|crew|ten|faster|faster!|heave|ho!|nine|load-bearing|load-bearing!|great|question!|question!")$/,QG={title:"Can You Explain That Function?",fonts:['400 100px "Pirata One"','italic 700 60px "Playfair Display"','700 20px "JetBrains Mono"','900 100px "Inter"','400 100px "Anton"'],overlays:()=>`
  <div class="ov title" data-show="0.2|L0-0.1"><small>a sea shanty in one act</small>Can You Explain<br>That Function?</div>
  <div class="ov card pr" data-show="L2-0.2|L6-0.3"><div class="bar">⚓ PR #1 · cargo manifest</div>
    <div class="row">lines aboard <b data-count="0,4000" data-at="L2" data-until="E2">0</b></div>
    <div class="row" data-at="W4:tests">tests <em class="ok">✓ green</em></div>
    <div class="row" data-at="W4:linter">linter <em class="ok">♪ sang</em></div>
    <div class="row" data-at="W5:typed">reviewed in <b>9 seconds</b></div>
    <div class="stamp green" data-at="W5:L-G-T-M">LGTM</div></div>
  <div class="ov note" data-show="W14:load-bearing-0.1|E15+0.4" data-at="W14:load-bearing-0.1">load-bearing! <small>(it was not)</small></div>
  <div class="ov bubble" data-show="W17:great-0.05|E17+0.4" data-at="W17:great-0.05">Great question!</div>
  <div class="ov card log" data-show="L22-0.3|L29-0.2"><div class="bar">\uD83D\uDC1A ship's log · barnacles</div>
    <div class="row" data-at="L24">retry(() =&gt; retry(() =&gt; …))</div>
    <div class="row" data-at="L25">new StringFactory().make("hi")</div>
    <div class="row" data-at="L26">parseDate · parseDate2 · parseDateFinal</div>
    <div class="row" data-at="L27">expect(true).toBe(true)</div>
    <div class="row muted" data-at="L28">hull: <b data-count="0,100" data-at="L28" data-until="E28">0</b>% barnacle</div></div>
  <div class="ov stamp big" data-show="W39:fell|L40-0.3" data-at="W39:fell">MAN OVERBOARD</div>
  <div class="ov bubble big" data-show="W41:great-0.05|E41+1.2" data-at="W41:great-0.05">Great question!</div>`,endAt:()=>n0(41)+1.4,words:{hot:kE,ice:jE,gold:vE},hud:(J,$)=>{let Q=tZ().filter((Z)=>J>=Z.splash).length;return{left:`explain that function &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`crew aboard <span class="ice">${5-Q}</span> &nbsp;·&nbsp; functions explained <b>0</b> &nbsp;·&nbsp; hull ${Math.round(CH(J)*100)}% barnacle`}},shots:JK,shotAt:PH,world:(J)=>{let $=new TH(J);return{update:(Q)=>$.update(Q),render:()=>$.render(),flash:(Q)=>$.flash(Q),fade:(Q)=>$.fade(Q),scene:$.scene,camera:$.camera,bars:()=>$.film.look.letterbox*DQ}}};var SH=[["witness","can I get a witness"],["greenwash","green is just a color"],["sign","can't comprehend"],["aisle","who looked in?"],["read","read the diff!"]];function AQ(){let J=($,Q,Z)=>SH.slice(0,Q).map(([K,U],H)=>({name:K,label:U,section:Z,at:L($+H)-0.2}));return[{name:"exterior",at:0,label:"sunday morning",section:"spoken"},{name:"pulpit",at:t(0,/^says/i)-0.1,label:"the good book",section:"spoken"},{name:"shipit",at:L(1)-0.3,label:"ship it!",section:"spoken"},{name:"who",at:L(2)-0.3,label:"who read the diff?",section:"spoken"},{name:"scroll",at:L(3)-0.3,label:"four thousand lines",section:"verse 1"},{name:"button",at:L(4)-0.2,label:"eleven seconds",section:"verse 1"},{name:"nine",at:L(5)-0.2,label:"line nine hundred",section:"verse 1"},{name:"greenbtn",at:L(6)-0.2,label:"the button was green",section:"verse 1"},{name:"devil",at:L(7)-0.2,label:"the devil's in the diff",section:"pre-chorus"},{name:"nobody",at:t(8,/^nobody/i)-0.5,label:"ain't nobody looking",section:"pre-chorus"},...J(9,5,"chorus"),{name:"loaf",at:L(14)-0.6,label:"a little slop",section:"verse 2"},{name:"commits",at:L(15)-0.2,label:"the repo stunk",section:"verse 2"},{name:"candles",at:L(16)-0.2,label:"cleaned up some flaky tests",section:"verse 2"},{name:"laptop",at:L(18)-0.2,label:"explain this function",section:"verse 2"},{name:"bot",at:L(20)-0.2,label:"the bot said amen",section:"verse 2"},{name:"fire",at:L(21)-0.2,label:"prod's on fire",section:"verse 2"},...J(22,5,"chorus"),{name:"tablets",at:L(27)-0.6,label:"the commandments",section:"bridge"},{name:"devil",at:L(32)-0.2,label:"the devil's in the diff",section:"pre-chorus"},...J(33,3,"final chorus"),{name:"sermon",at:L(36)-0.2,label:"written with claude",section:"final chorus"},{name:"deadpan",at:L(37)-0.3,label:"it sounded so confident",section:"spoken"},{name:"lgtm",at:L(38)-0.3,label:"l-g-t-m",section:"choir"},{name:"pray",at:L(39)-0.6,label:"let us pray",section:"outro"},{name:"approved",at:L(40)-0.2,label:"amen. approved.",section:"outro"},{name:"end",at:n0(40)+1.4,label:"the end",section:"outro"}]}var kH=null,jH=(J)=>{let $=kH??=AQ(),Q=$[0];for(let Z of $)if(Z.at<=J)Q=Z;return Q},fE=(J)=>{let $=kH??=AQ();return $[$.indexOf(J)+1]?.at??_7()},UG=new D0(16051419);var q$=12071482;var BQ=13933114,wH=8015662,yE=6965900,ZG={day:[9418200,15918792,10337146],pray:[4934266,15771752,6969962],approved:[4934266,15771752,6969962],end:[4934266,15771752,6969962],tablets:[7176090,15980960,11770486],button:[14865596,16051419,14272424],greenbtn:[14082756,16051419,13228208],loaf:[15259320,16181970,14271136],commits:[14146758,15854808,12896685],candles:[3026767,7032671,2761779],fire:[2040640,8010282,2103848]},zQ=(()=>{let J=new uJ(new Uint8Array([90,90,90,255,170,170,170,255,255,255,255,255]),3,1);return J.minFilter=J.magFilter=n7,J.needsUpdate=!0,J})(),KG=new Map,P9=(J)=>{let $=KG.get(J);if(!$)KG.set(J,$=new o7({color:J,gradientMap:zQ}));return $},u8=(J,$=1)=>new C0({color:J,transparent:$<1,opacity:$,depthWrite:$>=1}),M9=(J,$,Q=0,Z=0,K=0)=>{let U=new h(J,$);return U.position.set(Q,Z,K),U},k9=(J,$,Q,Z,K=0,U=0,H=0)=>M9(new I0(J,$,Q),P9(Z),K,U,H);function X$(J,$,Q){let Z=document.createElement("canvas");Z.width=J,Z.height=$,Q(Z.getContext("2d"));let K=new D7(Z);return K.colorSpace=V7,K.anisotropy=4,K}var j7=new v9,LJ=(J=0,$=0,Q=0)=>new v(J,$,Q),bE=new w0(0.075,0.09,1,8).translate(0,0.5,0),xE=new v(0,1,0);function $K(J,$){let Q=new H0,Z=$.skin??[15254688,13012578,9263675,15782582,7029808][Math.floor(B0($.seed)*5)];if(Q.add(M9(new w0(0.24,0.5,1.35,14),P9(J),0,0.68,0)),$.stole)for(let Y of[-1,1])Q.add(k9(0.1,0.9,0.05,$.stole,Y*0.13,0.85,0.32));let K=$.robot?k9(0.42,0.4,0.4,9081500,0,1.6,0):M9(new p0(0.23,16,12),P9(Z),0,1.58,0);if($.robot){let Y=M9(new I0(0.28,0.07,0.02),u8(10412154),0,0.02,0.21);K.add(Y,M9(new w0(0.015,0.015,0.25),P9(9081500),0,0.32,0),M9(new p0(0.05),u8(q$),0,0.46,0)),Q.userData.extra=Y}Q.add(K);let U=[-1,1].map((Y)=>{let W=M9(new p0(0.09,10,8),P9($.robot?9081500:Z));return Q.add(W),W}),H=[0,1].map(()=>{let Y=new h(bE,P9($.robot?9081500:J));return Q.add(Y),Y});return Object.assign(Q.userData,{head:K,hands:U,arms:H,seed:$.seed}),Q}function IQ(J,$,Q,Z=0.05,K=0){let{head:U,hands:H,arms:Y,seed:W}=J.userData;J.rotation.z=Math.sin($*Math.PI*1.78+W)*Z,U.rotation.x=K*0.6,H.forEach((G,N)=>{let q=N?1:-1,X=L9(Q-B0(W+N)*0.15);G.position.set(q*w(0.36,0.5,X),w(0.95,2.15,Z9(X))-K*0.1,w(0.3,0.12,X)+K*0.15),HG(Y[N],q,G.position)})}function HG(J,$,Q){let Z=LJ($*0.24,1.3,0.05),K=Q.clone().sub(Z);J.position.copy(Z),J.quaternion.setFromUnitVectors(xE,K.clone().normalize()),J.scale.set(1,K.length(),1)}function hE(J){for(let $ of I7){if($.words[0].s>J+0.5)break;for(let Q of $.words)if(Q.backing&&J>=Q.s-0.08&&J<=Q.e+0.7)return a0(Q.s-0.08,Q.s+0.12,J)}return 0}var gE={uniforms:{tDiffuse:{value:null},res:{value:new q0(1920,1080)},paper:{value:UG.clone()},shotSeed:{value:0},boil:{value:0},reveal:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform vec2 res; uniform vec3 paper; uniform float shotSeed, boil, reveal;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y); }
    float fbm(vec2 p) { float v = 0., a = .5; for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= .5; } return v; }
    vec3 ring(vec2 uv, float px, float rot) {
      vec3 c = vec3(0.); vec2 k = vec2(px / res.x, px / res.y);
      for (int i = 0; i < 8; i++) { float a = float(i) * .7854 + rot; c += texture2D(tDiffuse, uv + vec2(cos(a), sin(a)) * k).rgb; }
      return c / 8.;
    }
    void main() {
      vec2 asp = vec2(res.x / res.y, 1.), p = vUv * asp;
      // wobbly, hand-drawn edges: the image is sampled through a slowly boiling noise field
      vec2 warp = vec2(fbm(p * 5. + shotSeed), fbm(p * 5. + shotSeed + 9.2)) - .5;
      warp += (vec2(noise(p * 30. + boil), noise(p * 30. - boil)) - .5) * .25;
      vec2 uv = vUv + warp * .011;
      vec3 soft = ring(uv, 2.5, shotSeed) * .6 + texture2D(tDiffuse, uv).rgb * .4;
      vec3 wide = ring(uv, 9., shotSeed + .4);
      // pigment pools where washes meet: darken edges
      float edge = clamp(length(soft - wide) * 2.4, 0., 1.);
      vec3 pigment = 1. - soft;
      float bloom = fbm(p * 2.1 + shotSeed * 1.7);
      float gran = noise(p * 260.) * .55 + noise(p * 95.) * .45;
      pigment *= .74 + .5 * bloom + .22 * (gran - .5);
      pigment += edge * .4 * (pigment + .12);
      float grain = fbm(p * 140.);
      vec3 sheet = paper * (.95 + .07 * grain);
      vec3 col = sheet * (1. - clamp(pigment, 0., .9));
      // each cut paints in from blank paper, wet front first
      float m = fbm(p * 2.4 + shotSeed * 3.1) * .78 + (1. - length(vUv - .5) * 1.3) * .22;
      float rv = reveal * 1.3 - .12;
      float painted = 1. - smoothstep(rv - .05, rv, 1. - m);
      float front = smoothstep(rv - .09, rv - .03, 1. - m) * painted;
      col = mix(sheet, col * (1. - front * .22), painted);
      // deckled edge: the painting stops short of the sheet's border
      vec2 d = min(vUv, 1. - vUv) * asp;
      float bd = min(d.x, d.y) + (fbm(p * 8. + 3.) - .5) * .035;
      col = mix(sheet, col, smoothstep(.014, .036, bd));
      gl_FragColor = vec4(col, 1.);
    }`};class vH{renderer;scene=new i7;camera=new Z7(40,1.7777777777777777,0.1,500);composer;paint;sky;hemi=new U8(16774368,9075302,1.6);sun=new a7(16773336,1.9);glowLight=new D8(16756832,0,18,1.4);interior=new H0;windows=[];choir=[];robot;preacher;book;flock=[];scroll;scrollTex;roll;glass;devil=new H0;laptop=new H0;screen;screens={};exterior=new H0;churchWindows=[];button=new H0;cap;loaf=new H0;dough;slop;commits=new H0;cards=[];fumes=[];candles=new H0;flames;flameOrder=[];candlePos=[];fire=new H0;fireFlames;leds;smoke=[];kneeler;tablets=new H0;tabletTex=[];tabletShown=-1;rays=[];constructor(J){this.renderer=new E8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=UG.clone(),this.composer=new BJ(this.renderer),this.composer.addPass(new zJ(this.scene,this.camera)),this.composer.addPass(new IJ),this.paint=new O6(gE),this.composer.addPass(this.paint),this.sun.position.set(-6,14,8),this.scene.add(this.hemi,this.sun,this.glowLight),this.buildSky(),this.buildInterior(),this.buildExterior(),this.buildButton(),this.buildLoaf(),this.buildCommits(),this.buildCandles(),this.buildFire(),this.buildTablets(),this.scene.add(this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets)}buildSky(){this.sky=new h(new p0(300,32,16),new p9({side:L7,depthWrite:!1,uniforms:{top:{value:new D0},horizon:{value:new D0},bottom:{value:new D0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; varying vec3 vDir;
        void main() { float y = vDir.y;
          vec3 c = y > 0. ? mix(horizon, top, pow(smoothstep(0., .7, y), .8)) : mix(horizon, bottom, smoothstep(0., .25, -y));
          gl_FragColor = vec4(c, 1.); }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildInterior(){let J=this.interior;J.add(k9(18,0.2,32,13214571,0,-0.1,-3)),J.add(k9(2.4,0.02,23,q$,0,0.01,0.5)),J.add(k9(0.3,13,32,15721416,-9,6.5,-3),k9(0.3,13,32,15721416,9,6.5,-3)),J.add(k9(18,13,0.3,15326400,0,6.5,-19.2),k9(18,13,0.3,15326400,0,6.5,12.6)),J.add(k9(2.6,4.2,0.1,wH,0,2.1,12.4)),J.add(k9(18,0.8,8,10119742,0,0.4,-15));let $=(F)=>X$(256,512,(R)=>{R.beginPath(),R.moveTo(8,504),R.lineTo(8,128),R.arc(128,128,120,Math.PI,0),R.lineTo(248,504),R.closePath(),R.clip();let M=["#3a5aa8","#b8323a","#d49a3a","#4f8a3c","#6a4a8c","#e7c46a"];for(let D=0;D<70;D++)R.fillStyle=M[Math.floor(B0(F+D)*M.length)],R.fillRect(Math.floor(B0(F+D*3)*6)*43,Math.floor(B0(F+D*7)*12)*43,43,43);R.strokeStyle="#2b2633",R.lineWidth=6;for(let D=0;D<=12;D++)R.beginPath(),R.moveTo(0,D*43),R.lineTo(256,D*43+(D%2?12:-12)),R.stroke();for(let D=0;D<=6;D++)R.beginPath(),R.moveTo(D*43,0),R.lineTo(D*43,512),R.stroke();R.lineWidth=14,R.stroke(new Path2D("M8 504 L8 128 A120 120 0 0 1 248 128 L248 504 Z"))}),Q=(F,R,M)=>{let D=new h(new t0(R,M),new C0({map:F,transparent:!0,alphaTest:0.1}));return this.windows.push(D),D};for(let[F,R]of[-5,0,5].entries()){let M=Q($(F*11),2.4,4.8);M.position.set(R,R===0?8.6:7.8,-19),J.add(M)}for(let F of[-1,1])for(let[R,M]of[-9,-2,5].entries()){let D=Q($(40+R*13+F*5),2,4);D.position.set(F*8.8,6,M),D.rotation.y=-F*Math.PI/2,J.add(D)}let Z=new H0;Z.add(k9(0.35,2.6,0.12,BQ),k9(1.5,0.35,0.12,BQ,0,0.45,0)),Z.position.set(0,4.6,-18.9),J.add(Z);for(let F of[-1,1])for(let R=0;R<7;R++){let M=3+Math.sin(R*0.6)*1.3+R*0.35;J.add(M9(new w0(0.16,0.16,M,10),P9(14201434),F*(5.4+R*0.42),0.8+M/2,-18.6))}for(let F=0;F<9;F++){let R=-8+F*2.1;for(let M of[-1,1]){J.add(k9(5,0.18,0.8,9067058,M*3.9,0.55,R),k9(5,1,0.14,8014890,M*3.9,0.95,R+0.45));for(let D=0;D<3;D++){if(B0(F*7+D+M*31)<0.25)continue;let E=F*10+D+(M>0?500:0),I=[3824296,6982218,12088154,8022682,13214282,5929610][Math.floor(B0(E+2)*6)],C=$K(I,{seed:E});C.scale.setScalar(0.82),C.position.set(M*(2.2+D*1.5+B0(E)*0.3),0.18,R+0.1),C.rotation.y=Math.PI;let O=M9(new t0(0.16,0.26),u8(14216447));O.position.set(0,1.05,0.42),O.rotation.x=-0.9,C.add(O),J.add(C),this.flock.push({f:C,phone:O})}}}for(let F=0;F<3;F++){J.add(k9(13,0.45,1.1,9067574,0,1.02+F*0.45,-15.6-F*1.1));for(let R=0;R<7;R++){let M=900+F*10+R,D=F===0&&R===5,E=$K(yE,{stole:BQ,seed:M,robot:D});if(E.position.set(-4.8+R*1.6+F%2*0.4,1.25+F*0.45,-15.6-F*1.1),J.add(E),this.choir.push(E),D)this.robot=E}}this.preacher=$K(2301994,{stole:q$,seed:77,skin:9263675}),this.preacher.position.set(0,0.8,-12.9),this.book=k9(0.5,0.68,0.14,3877410),this.book.add(k9(0.46,0.62,0.15,15258522,0.03,0,0)),this.preacher.add(this.book),J.add(this.preacher);let K=new H0;K.add(k9(1.5,1.35,0.9,8014890,0,0.68,0),k9(1.7,0.08,1,6175264,0,1.4,-0.05)),K.add(k9(0.6,0.5,0.02,q$,0,0.8,0.46)),K.position.set(0,0.8,-12),J.add(K),this.laptop.add(k9(0.8,0.04,0.55,10133672,0,0,0));let U=k9(0.8,0.52,0.03,10133672,0,0.26,-0.27);U.rotation.x=-0.25,this.screen=new h(new t0(0.74,0.46),new C0({color:16777215})),this.screen.position.set(0,0,-0.02),this.screen.rotation.y=Math.PI,U.add(this.screen),U.rotation.y=0,this.laptop.add(U),this.laptop.position.set(0,2.25,-12.05),this.laptop.rotation.y=0,J.add(this.laptop);let H=(F)=>X$(1024,640,(R)=>{R.fillStyle="#f6f1e6",R.fillRect(0,0,1024,640),R.fillStyle="#c96442",R.fillRect(0,0,1024,70),R.font="700 40px 'JetBrains Mono', monospace",R.fillStyle="#fff",R.fillText("claude",30,50),R.font="500 38px 'JetBrains Mono', monospace",F.forEach(([M,D],E)=>{R.fillStyle=M,R.fillText(D,34,140+E*66)})});this.screens.explain=H([["#c96442","> explain this function"],["#2b2633","This function elegantly"],["#2b2633","orchestrates a robust,"],["#2b2633","scalable synergy of..."],["#8a8494","(pasted back in, unread)"]]),this.screens.sermon=H([["#c96442","> write me a sermon about"],["#c96442","  reading the diff"],["#2b2633","Church! The Good Book says,"],["#2b2633",'"The A-I wrote it, the'],["#2b2633",'tests are green." ...']]),this.scrollTex=X$(512,2048,(F)=>{F.fillStyle="#fbf7ee",F.fillRect(0,0,512,2048);for(let R=0;R<64;R++){let M=B0(R*3.3)<0.08;F.fillStyle=M?"#f3c9c4":"#d3ebc8",F.fillRect(0,R*32,512,30),F.fillStyle=M?"#b8323a":"#4f8a3c",F.fillRect(10,R*32+12,14,6),F.fillStyle="#2b2633";let D=40+Math.floor(B0(R)*4)*26;for(let E=0;E<4;E++){let I=30+B0(R*9+E)*110;if(D+I>500)break;F.fillRect(D,R*32+11,I,8),D+=I+18}}}),this.scrollTex.wrapT=a8,this.scroll=new h(new t0(2.2,1),new o7({map:this.scrollTex,gradientMap:zQ})),this.scroll.rotation.x=-Math.PI/2,this.roll=M9(new w0(0.32,0.32,2.3,18),P9(16183264)),this.roll.rotation.z=Math.PI/2,J.add(this.scroll,this.roll),this.glass=new H0,this.glass.add(M9(new Y7(0.42,0.05,10,32),P9(3877410))),this.glass.add(M9(new C7(0.4,32),u8(13625074,0.25)));let Y=M9(new w0(0.05,0.06,0.7),P9(3877410),0,-0.75,0);this.glass.add(Y),this.glass.rotation.x=-Math.PI/2+0.25,J.add(this.glass);let W=P9(q$),G=M9(new p0(0.32,16,12),W,0,0.62,0);for(let F of[-1,1]){let R=M9(new g9(0.07,0.3,8),P9(5904926),F*0.17,0.28,0);R.rotation.z=-F*0.4,G.add(R,M9(new p0(0.06,8,6),u8(16774856),F*0.11,0.06,0.27))}G.add(M9(new Y7(0.1,0.02,6,12,Math.PI),P9(5904926),0,-0.1,0.28));let N=M9(new g9(0.26,0.6,12),W,0,0.18,0),q=M9(new x8(new J$([LJ(0,0.1,-0.1),LJ(0.2,0.05,-0.5),LJ(0.5,0.3,-0.6),LJ(0.55,0.55,-0.45)]),20,0.03,6),W),X=new H0;X.add(M9(new w0(0.02,0.02,1.3),P9(3877410)));for(let F of[-1,0,1])X.add(M9(new g9(0.025,0.2,6),P9(3877410),F*0.08,0.72,0));X.position.set(0.38,0.5,0.1),X.rotation.z=-0.2,this.devil.add(G,N,q,X),J.add(this.devil)}buildExterior(){let J=this.exterior,$=M9(new p0(60,48,24),P9(9417322),0,-59.6,0);J.add($);for(let[Y,W,G,N]of[[-40,-50,30,8034922],[35,-60,36,7311218],[0,-80,40,8823712]])J.add(M9(new p0(G,32,16),P9(N),Y,-G*0.82,W));let Q=new H0;Q.add(k9(6,4.5,9,15986662,0,2.25,0));let Z=new K8([new q0(-3.5,0),new q0(0,2.8),new q0(3.5,0)]),K=M9(new B8(Z,{depth:9.6,bevelEnabled:!1}),P9(9058866),0,4.5,-4.8);Q.add(K),Q.add(k9(1.8,3.2,1.8,15986662,0,6.2,4.2));let U=M9(new g9(1.35,3.6,4),P9(9058866),0,9.6,4.2);U.rotation.y=Math.PI/4,Q.add(U,k9(0.12,1,0.12,BQ,0,11.9,4.2),k9(0.6,0.12,0.12,BQ,0,12,4.2)),Q.add(k9(1.4,2.6,0.1,wH,0,1.3,4.55));for(let Y of[-2.5,0,2.5])for(let W of[-1,1]){let G=new h(new t0(0.9,1.7),u8(9416904));G.position.set(W*3.02,2.6,Y),G.rotation.y=W*Math.PI/2,Q.add(G),this.churchWindows.push(G)}let H=new h(new C7(0.5,24),u8(9416904));H.position.set(0,6.6,5.11),Q.add(H),this.churchWindows.push(H),Q.position.set(0,0.3,0),Q.rotation.y=0.35,J.add(Q),J.add(k9(1.4,0.05,14,14206106,1.8,0.35,10.5));for(let Y=0;Y<16;Y++){let W=B0(Y)*Math.PI*2,G=12+B0(Y+3)*14,N=Math.cos(W)*G,q=Math.sin(W)*G-4;if(q>6&&Math.abs(N)<6)continue;let X=3+B0(Y+5)*3,F=Math.sqrt(Math.max(0,3600-N*N-q*q))-59.6;J.add(M9(new w0(0.15,0.22,X*0.4),P9(wH),N,F+X*0.2,q)),J.add(B0(Y+9)<0.5?M9(new g9(X*0.32,X,10),P9(5208646),N,F+X*0.4+X/2,q):M9(new p0(X*0.35,12,10),P9(6986314),N,F+X*0.75,q))}}buildButton(){let J=this.button;J.add(k9(8,0.3,5,15327180,0,-0.15,0)),J.add(M9(new w0(1.25,1.4,0.7,40),P9(10133672),0,0.35,0)),J.add(M9(new Y7(1,0.07,10,40),P9(5922920),0,0.72,0).rotateX(Math.PI/2));let $=X$(512,512,(Q)=>{Q.fillStyle="#5fae4a",Q.fillRect(0,0,512,512),Q.fillStyle="#f6ffe8",Q.font="900 120px Fraunces, Georgia, serif",Q.textAlign="center",Q.fillText("LGTM",256,300)});this.cap=new h(new w0(0.92,0.92,0.32,40),[new C0({color:6270538}),new C0({map:$}),new C0({color:5212732})]),this.cap.position.y=0.88,this.cap.rotation.y=-Math.PI/2,J.add(this.cap),J.add(k9(1.6,0.06,2.2,16513006,-2.6,0.03,0.4).rotateY(0.3)),J.add(M9(new w0(0.28,0.24,0.6,18),P9(15986662),2.5,0.3,-0.6)),J.position.set(200,0,0)}buildLoaf(){let J=this.loaf;J.add(k9(6,0.25,3.6,11040586,0,-0.12,0)),this.dough=new h(new p0(1,40,24),new o7({color:15389344,gradientMap:zQ})),this.slop=M9(new p0(0.22,16,12),P9(8030794)),J.add(this.dough,this.slop);for(let $=0;$<9;$++)J.add(M9(new p0(0.05+B0($)*0.05,8,6),P9(15985368),-2.4+B0($+1)*4.8,0.03,-1.4+B0($+2)*2.8));J.position.set(400,0,0)}buildCommits(){let J=this.commits;J.add(k9(10,0.2,10,14208952,0,-0.1,0));let $=X$(512,128,(Q)=>{Q.fillStyle="#fbf7ee",Q.fillRect(0,0,512,128),Q.fillStyle="#4f8a3c",Q.font="700 64px 'JetBrains Mono', monospace",Q.fillText("✓",24,88),Q.fillStyle="#2b2633",Q.font="500 44px 'JetBrains Mono', monospace",Q.fillText("fix: tweak",100,82)});for(let Q=0;Q<12;Q++){let Z=new h(new I0(2.4,0.28,1.4),[P9(15986662),P9(15986662),P9(15986662),P9(15986662),new o7({map:$,gradientMap:zQ}),P9(15986662)]);Z.rotation.y=(B0(Q)-0.5)*0.3,J.add(Z),this.cards.push(Z)}for(let Q=0;Q<7;Q++){let Z=Array.from({length:8},(U,H)=>LJ(Math.sin(H*1.3+Q)*0.35,H*0.6,Math.cos(H*1.1+Q)*0.2)),K=M9(new x8(new J$(Z),40,0.07,6),u8(8036938,0.7));K.position.set(-1.6+Q*0.55,0,(B0(Q)-0.5)*1.2),J.add(K),this.fumes.push(K)}J.position.set(600,0,0)}buildCandles(){let J=this.candles,$=400,Q=40,Z=10;for(let H=0;H<10;H++)J.add(k9(13,0.3,0.5,6175264,0,H*0.32,-H*0.5));let K=new f9(new w0(0.06,0.06,0.26,8),P9(16183264),400);this.flames=new f9(new g9(0.05,0.16,8),new C0({color:16762976}),400);for(let H=0;H<400;H++){let Y=Math.floor(H/40),W=H%40,G=LJ(-6.2+W*0.32+Y%2*0.16,Y*0.32+0.28,-Y*0.5+0.05);this.candlePos.push(G),j7.position.copy(G),j7.scale.setScalar(1),j7.updateMatrix(),K.setMatrixAt(H,j7.matrix)}let U=[173,186,213,226];this.flameOrder=[...Array(400).keys()].filter((H)=>!U.includes(H)).sort((H,Y)=>B0(H)-B0(Y)).concat(U),J.add(k9(16,9,0.3,3813448,0,4,-6),K,this.flames),J.position.set(800,0,0)}buildFire(){let J=this.fire;J.add(k9(14,0.2,10,3814464,0,-0.1,0));let $=3,Q=40;this.leds=new f9(new I0(0.08,0.05,0.02),new C0({color:16777215}),$*Q);for(let U=0;U<$;U++){J.add(k9(1.4,3.8,1.2,3028032,-2+U*1.6,1.9,-1.5));for(let H=0;H<Q;H++)j7.position.set(-2.4+U*1.6+H%4*0.2,0.5+Math.floor(H/4)*0.32,-0.88),j7.scale.setScalar(1),j7.updateMatrix(),this.leds.setMatrixAt(U*Q+H,j7.matrix)}this.fireFlames=new f9(new g9(0.35,1.4,8),new C0({color:16777215}),70);for(let U=0;U<70;U++)this.fireFlames.setColorAt(U,new D0([15769648,14704682,16175200,13123626][U%4]));for(let U=0;U<10;U++){let H=M9(new p0(1,12,10),u8(4867152,0.35));J.add(H),this.smoke.push(H)}this.kneeler=$K(2301994,{stole:q$,seed:77,skin:9263675}),this.kneeler.position.set(0.6,-0.45,2.6),this.kneeler.rotation.y=Math.PI*0.85;let Z=M9(new t0(0.9,1.2),new o7({map:this.scrollTex,gradientMap:zQ}),0.3,0.02,1.8);Z.rotation.x=-Math.PI/2;let K=new H0;K.add(M9(new w0(0.07,0.07,0.4,8),P9(16183264),0,0.2,0),M9(new g9(0.06,0.18,8),u8(16765040),0,0.5,0)),K.position.set(-0.2,0,1.9),J.add(this.leds,this.fireFlames,this.kneeler,Z,K),J.position.set(1000,0,0)}buildTablets(){let J=this.tablets;J.add(M9(new g9(14,10,7),P9(11045474),0,-5.2,-1)),J.add(M9(new g9(30,16,7),P9(9075306),-20,-10,-40),M9(new g9(26,14,6),P9(8030874),24,-9,-46));let $=new K8;$.moveTo(-1,0),$.lineTo(-1,2.2),$.absarc(0,2.2,1,Math.PI,0,!0),$.lineTo(1,0),$.closePath();for(let[Q,Z]of[-1.15,1.15].entries()){let K=M9(new B8($,{depth:0.35,bevelEnabled:!0,bevelSize:0.06,bevelThickness:0.06,bevelSegments:2}),P9(10134445),Z,0,0),U=X$(512,820,()=>{}),H=new h(new t0(1.9,3.04),new C0({map:U,transparent:!0}));H.position.set(0,1.62,0.43),K.add(H),K.rotation.z=(Q?-1:1)*0.04,J.add(K),this.tabletTex.push(U)}for(let Q=0;Q<6;Q++){let Z=M9(new w0(0.4,2.6,30,16,1,!0),u8(16178314,0.18),-6+Q*2.4,14,-3);Z.rotation.z=(Q-2.5)*0.08,J.add(Z),this.rays.push(Z)}J.position.set(1200,0,0)}carve(J){if(J===this.tabletShown)return;this.tabletShown=J;let $=[["I","Read the diff,","not the summary"],["II","Read the source,","not the blog post"],["III","No time to not","have tests"],["IV","A plan before","the fix"],["V","A·I shall not","review A·I"]];this.tabletTex.forEach((Q,Z)=>{let K=Q.image,U=K.getContext("2d");U.clearRect(0,0,512,820),U.textAlign="center",(Z?$.slice(3):$.slice(0,3)).forEach(([Y,W,G],N)=>{if((Z?3:0)+N>J)return;let q=100+N*236;U.fillStyle="#1f2430",U.font="900 76px Fraunces, Georgia, serif",U.fillText(Y,256,q),U.font="italic 600 60px Fraunces, Georgia, serif",U.fillText(W,256,q+70),U.fillText(G,256,q+132)}),Q.needsUpdate=!0})}flash(J){return 0}fade(J){return 0}update(J){let $=jH(J),Q=$.at,Z=fE($),K=J-Q,U=U0(J,Q,Z),H=$.name;for(let M of[this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets])M.visible=!1;let Y=this.camera,W=LJ();Y.fov=40;let G=ZG[H]??ZG.day,N=this.sky.material.uniforms;N.top.value.setHex(G[0]),N.horizon.value.setHex(G[1]),N.bottom.value.setHex(G[2]),this.hemi.color.setHex(16774368),this.hemi.groundColor.setHex(9075302),this.hemi.intensity=1.6,this.sun.intensity=1.9,this.glowLight.intensity=0;let q=SH.some(([M])=>M===H)&&H!=="witness",X=Z9(U0(J,Q,Q+(q?0.45:0.8)));if(Q===0)X=Z9(U0(J,0,1.6));X*=1-a0(n0(40)+0.6,n0(40)+1.4,J);let F=this.paint.uniforms;F.reveal.value=X,F.shotSeed.value=(kH??AQ()).indexOf($)*3.71%50,F.boil.value=Math.floor(J*5)*1.37;let R=hE(J);switch(H){case"exterior":case"pray":case"approved":case"end":{this.exterior.visible=!0;let M=H!=="exterior";if(M)this.hemi.color.setHex(16763040),this.hemi.groundColor.setHex(4864602),this.hemi.intensity=1.2,this.sun.intensity=0.9;for(let E of this.churchWindows)E.material.color.setHex(M?16762976:9416904);let D=M?U0(J,L(39)-0.6,n0(40)+1.4):U0(J,0,t(0,/^says/i));Y.position.set(M?w(16,12,D):w(-15,-9.5,D),M?w(3,4.4,D):w(2.6,3.2,D),M?w(19,15,D):w(23,16,D)),W.set(0,M?w(4,5.5,D):4,0),Y.fov=42;break}case"button":case"greenbtn":{this.button.visible=!0;let M=this.button.position,D=H==="button"?a0(t(4,/^l-g/i)-0.1,t(4,/^l-g/i),J)*(1-a0(t(4,/^l-g/i)+0.25,t(4,/^l-g/i)+0.5,J)):0;this.cap.position.y=0.88-D*0.18;let E=H==="greenbtn"?0.75+r7(J)*0.25:1;for(let I of this.cap.material)I.color.setScalar(1).multiplyScalar(E);if(H==="button")Y.position.set(M.x+w(1.4,0.6,U),w(4.2,3.6,U),w(4.4,3.4,U)),W.set(M.x,0.6,0);else Y.position.set(M.x+w(1.2,0.5,U),w(1.9,1.6,U),w(2.4,1.9,U)),W.set(M.x,0.85,0),Y.fov=36;break}case"loaf":{this.loaf.visible=!0;let M=this.loaf.position,D=p8(U0(J,Q+0.3,Q+1.1)),E=Z9(U0(J,Q+1.2,Z));this.slop.position.set(M.x*0+0.2,w(3.2,0.9,D),0.3),this.slop.visible=D<1,this.slop.position.x=0.2,this.dough.scale.set(w(1.3,2.4,E),w(0.75,1.7,E),w(1,1.6,E)),this.dough.position.set(0,w(0.6,1.3,E),0),this.dough.material.color.setHex(15389344).lerp(new D0(10135648),E*0.75);let I=w(-0.3,0.3,U);Y.position.set(M.x+Math.sin(I)*6.5,w(2.4,3,U),Math.cos(I)*6.5),W.set(M.x,1.1,0);break}case"commits":{this.commits.visible=!0;let M=this.commits.position;this.cards.forEach((E,I)=>{let C=Q+0.1+I*0.22,O=w9(U0(J,C,C+0.3));E.visible=J>=C,E.position.set(0,I*0.3+0.15+(1-O)*2,0)}),this.fumes.forEach((E,I)=>{let C=t(15,/^stunk/i)-0.2+I*0.08;E.visible=J>=C,E.scale.y=Z9(U0(J,C,C+1.2)),E.position.y=3.6+(J-C)*0.5%0.6,E.rotation.y=J*0.5+I});let D=w(0.5,0.1,U);Y.position.set(M.x+Math.sin(D)*7.5,w(2.8,3.6,U),Math.cos(D)*7.5),W.set(M.x,1.9,0);break}case"candles":{this.candles.visible=!0;let M=this.candles.position,D=Math.round(w(400,4,Z9(U0(J,t(16,/^cleaned/i),t(17,/^four$/i)+0.4)))),E=new Set(this.flameOrder.slice(0,400-D));this.candlePos.forEach((C,O)=>{j7.position.set(C.x,C.y+0.21,C.z);let B=E.has(O)?0.001:1+Math.sin(J*13+O)*0.15;j7.scale.set(B,B*(1+r7(J)*0.2),B),j7.updateMatrix(),this.flames.setMatrixAt(O,j7.matrix)}),this.flames.instanceMatrix.needsUpdate=!0,this.hemi.intensity=w(0.35,1.3,D/400),this.sun.intensity=0.2,this.glowLight.position.set(M.x,3,3),this.glowLight.intensity=w(2,60,D/400);let I=U0(J,Q,n0(17)+0.5);Y.position.set(M.x+w(-1.5,0,I),w(2.8,2,I),w(8,3.6,I)),W.set(M.x+w(-0.5,0,I),w(1.6,1.7,I),-2),Y.fov=w(48,34,I);break}case"fire":{this.fire.visible=!0;let M=this.fire.position;for(let D=0;D<70;D++){let E=D%3,I=0.6+Math.sin(J*9+D*1.7)*0.25+B0(D)*0.5;j7.position.set(-2.6+E*1.6+(B0(D+1)-0.5)*1.4,3.8+I*0.5+B0(D+2)*0.6-0.4,-1.5+(B0(D+3)-0.5)*1.2),j7.scale.set(0.7+B0(D)*0.6,I*1.4,0.7+B0(D)*0.6),j7.rotation.set(0,0,Math.sin(J*5+D)*0.15),j7.updateMatrix(),this.fireFlames.setMatrixAt(D,j7.matrix)}this.fireFlames.instanceMatrix.needsUpdate=!0,j7.rotation.set(0,0,0);for(let D=0;D<120;D++)this.leds.setColorAt(D,new D0(Math.sin(J*8+D*2.3)>0.2?14699066:5904926));if(this.leds.instanceColor)this.leds.instanceColor.needsUpdate=!0;this.smoke.forEach((D,E)=>{let I=(J*0.35+E/10)%1;D.position.set(-2+E%3*1.6+Math.sin(E)*0.6,5+I*6,-1.8),D.scale.setScalar(0.8+I*2.2),D.material.opacity=0.35*(1-I)}),IQ(this.kneeler,J,0,0.02,1),this.hemi.color.setHex(16752752),this.hemi.groundColor.setHex(2761792),this.hemi.intensity=1.1,this.sun.intensity=0.4,this.glowLight.position.set(M.x-0.6,4,0),this.glowLight.intensity=50+Math.sin(J*11)*12,Y.position.set(M.x+w(-3.8,-2.6,U),w(1.4,1.8,U),w(7,5.6,U)),W.set(M.x-0.4,2.2,0),Y.fov=46;break}case"tablets":{this.tablets.visible=!0;let M=this.tablets.position,D=0;for(let C=27;C<=31;C++)if(J>=L(C)-0.1)D=C-27;this.carve(D),this.rays.forEach((C,O)=>{C.material.opacity=0.12+0.1*Math.sin(J*1.5+O)+r7(J)*0.05});let E=w(-0.3,0.3,D/4)+(J-L(27+D))*0.03,I=D===4?6.5:4.6;Y.position.set(M.x+(D<3?-1.15:1.15)*(D===4?0:1)+Math.sin(E)*I,2.6,Math.cos(E)*I),W.set(M.x+(D<3?-1.15:1.15)*(D===4?0:1),2.3,0),Y.fov=42;break}default:this.interiorShot(J,$,W,R,U)}Y.aspect=1.7777777777777777,Y.updateProjectionMatrix(),Y.lookAt(W),this.sky.position.copy(Y.position)}interiorShot(J,$,Q,Z,K){let{name:U,at:H}=$,Y=this.camera;this.interior.visible=!0,this.hemi.intensity=1.5;let W=U==="greenwash"?a0(H,H+0.6,J):0;for(let I of this.windows)I.material.color.setRGB(1,1,1).lerp(new D0(8048474),W*0.8);this.hemi.color.setHex(16774368).lerp(new D0(12120224),W*0.7);for(let I of this.choir)IQ(I,J,Z,0.06);let G=U==="bot"?a0(t(20,/^\W*amen/i)-0.1,t(20,/^\W*amen/i)+0.1,J):0;if(U==="bot")IQ(this.robot,J,G,0.02);this.robot.userData.extra.material.color.setHex(G>0.5?10412154:4872772);let N=U==="nobody"||U==="nine",q=U==="shipit"?a0(t(1,/ship/i)-0.1,t(1,/ship/i)+0.1,J):U==="lgtm"?Z:U==="witness"||U==="read"?Z*0.6:0;for(let{f:I,phone:C}of this.flock)I.visible=U!=="aisle",C.visible=N,IQ(I,J,q,N?0.01:0.03,N?1:0);let X=U==="pulpit"?w9(U0(J,H+0.3,H+0.8)):0;IQ(this.preacher,J,SH.some(([I])=>I===U)||U==="lgtm"?0.5+Z*0.5:0,U==="deadpan"||U==="who"?0:0.05);let F=this.preacher.userData.hands[1];if(X>0)F.position.set(0.45,w(0.95,2.3,X),0.25),HG(this.preacher.userData.arms[1],1,F.position);this.book.visible=U==="pulpit"||U==="shipit",this.book.position.copy(F.position).add(LJ(0,0.25,0.05));let R=U==="scroll"?Z9(U0(J,L(3)-0.2,n0(3)+0.6)):["nine","devil","aisle","nobody"].includes(U)?1:0,M=Math.max(0.01,R*26),D=-11.4;this.scroll.visible=this.roll.visible=R>0,this.scroll.scale.set(1,M,1),this.scroll.position.set(0,0.04,D+M/2),this.scrollTex.repeat.set(1,M/4),this.roll.position.set(0,0.33,D+M+0.3),this.roll.rotation.x=M/0.32,this.roll.visible=R>0&&R<1,this.glass.visible=U==="nine",this.glass.position.set(w(-0.4,0.2,K),0.9,w(-6,-4.8,K));let E=U==="devil";if(this.devil.visible=E,E){let I=w9(U0(J,H+0.25,H+0.75));this.devil.position.set(0.35,w(-0.9,0.05,I)+r7(J)*0.06,-5),this.devil.rotation.set(0,-0.35+Math.sin(J*3)*0.15,Math.sin(J*Math.PI*1.78)*0.12)}switch(this.laptop.visible=U==="laptop"||U==="sermon"||U==="deadpan",this.screen.material.map=U==="laptop"?this.screens.explain:this.screens.sermon,U){case"pulpit":Y.position.set(w(0.8,0.3,K),w(2.4,2.6,K),w(-3,-7.5,K)),Q.set(0,2.6,-13),Y.fov=38;break;case"shipit":Y.position.set(1.4,3.4,-10.6),Q.set(0,0.9,2.5),Y.fov=52;break;case"who":{let I=U0(J,H,L(3)-0.3);Y.position.set(w(0.7,0.15,I),w(2.3,2.45,I),w(-5.5,-9.9,Z9(I))),Q.set(0,2.35,-12.9),Y.fov=w(36,28,I);break}case"scroll":{let I=D+M;Y.position.set(1.4,w(3.6,4.6,K),-13.2),Q.set(0,0,Math.max(-6,I-2)),Y.fov=48;break}case"nine":Y.position.set(w(0.9,0.5,K),3,w(-3.2,-2.4,K)),Q.set(this.glass.position.x,0,this.glass.position.z-0.5),Y.fov=42;break;case"devil":Y.position.set(1.8,1,-1.6),Q.set(0.3,0.45,-5),Y.fov=36;break;case"nobody":Y.position.set(w(7.5,6.5,K),w(9.5,8.5,K),w(12,10,K)),Q.set(0,0,-1),Y.fov=46;break;case"witness":Y.position.set(0,w(4.4,3.8,K),w(11,6,K)),Q.set(0,3,-15),Y.fov=44;break;case"greenwash":Y.position.set(w(-3.2,-2.4,K),1.3,-8),Q.set(0,4.2,-17),Y.fov=54;break;case"sign":Y.position.set(w(7.4,6.2,K),3.1,w(-14.5,-11.5,K)),Q.set(-1,2.6,-16.5),Y.fov=44;break;case"aisle":Y.position.set(0,w(4.2,5.2,K),-11.2),Q.set(0,0,9),Y.fov=50;break;case"read":Y.position.set(0,w(2.6,3,K),w(-9.2,-10.6,K)),Q.set(0,3,-16.5),Y.fov=52;break;case"laptop":Y.position.set(w(1.7,1.4,K),3.5,w(-14.2,-13.7,K)),Q.set(0,2.45,-12.1),Y.fov=34;break;case"bot":{let I=this.robot.position;Y.position.set(I.x+w(2.6,2,K),I.y+1.9,I.z+4.2),Q.set(I.x-0.3,I.y+1.5,I.z),Y.fov=40;break}case"sermon":Y.position.set(w(-1.5,-1.2,K),w(3.3,3.1,K),w(-13.9,-13.4,K)),Q.set(0,2.45,-12.1),Y.fov=32;break;case"deadpan":Y.position.set(0,2.45,-9.4),Q.set(0,2.38,-12.9),Y.fov=26;break;case"lgtm":Y.position.set(0,w(4.4,5.8,K),w(8,11.5,K)),Q.set(0,2.2,-12),Y.fov=46;break;default:Y.position.set(0,4,10),Q.set(0,2,-12)}}render(){this.composer.render()}}var fH=(J)=>`<div class="ov card sign" data-show="L${J}|L${J+1}-0.1"><div class="bar">review · required</div>
    <div class="row"><span class="box" data-at="W${J}:sign">✓</span> I have read and understood this change</div>
    <svg viewBox="0 0 520 120"><path class="draw" data-at="W${J}:sign" data-until="W${J}:comprehend+0.3" d="M10 80 C 40 20, 60 20, 70 70 S 100 110, 120 60 S 150 10, 170 70 C 180 100, 200 90, 215 55 C 230 25, 240 95, 262 70 S 300 30, 320 64 C 340 92, 370 40, 400 60 S 470 80, 510 50"/></svg>
    <div class="row muted">lines read: <b>0</b></div></div>`,YG={title:"Read the Diff",fonts:['900 100px "Fraunces"','italic 600 60px "Fraunces"','700 40px "Caveat"','500 20px "JetBrains Mono"'],overlays:()=>`
  <div class="ov title" data-show="0.6|W0:good-0.3">Read the Diff<small>can I get a witness</small></div>
  <div class="ov card pr" data-show="L3|L4-0.15"><div class="bar">pull request #4127 · open</div>
    <h3>Refactor everything</h3>
    <div class="row"><span class="add">+<b data-count="0,3982" data-at="L3" data-until="W3:lines">0</b></span> <span class="del">−18</span> · 212 files changed</div>
    <div class="row muted" data-at="W3:four">comments: 0</div></div>
  <div class="ov card watch" data-show="L4|L5-0.15"><div class="bar">time to review</div>
    <big data-count="0,11" data-at="L4" data-until="W4:l-g" data-fmt="secs">0:00</big>
    <div class="stamp green" data-at="W4:l-g">APPROVED</div></div>
  <div class="ov card code" data-show="L5|L6-0.15"><div class="bar">src/auth/session.ts</div>
    <div class="ln"><i>898</i>  const user = await load(id);</div>
    <div class="ln"><i>899</i>  // TODO: tighten this</div>
    <div class="ln hot" data-at="W5:nine"><i>900</i>+ if (user.role === "admin" || true) {</div>
    <div class="ln add" data-at="W5:hundred"><i>901</i>+   return grantEverything(user);</div>
    <div class="ln"><i>902</i>  }</div></div>
  <div class="ov chip slop" data-show="L14|L15-0.2">+1 line of slop</div>
  <div class="ov card tests" data-show="W16:cleaned-0.2|L18-0.4"><div class="bar">test suite</div>
    <big data-count="400,4" data-at="W16:cleaned" data-until="W17:four+0.4">400</big><div class="row muted">tests · all passing</div></div>
  <div class="ov card chat" data-show="L18|L20-0.3"><div class="bar">#code-review</div>
    <div class="bub me" data-at="W18:explain">Brother, explain this function.</div>
    <div class="bub ai" data-at="W19:hold">Hold on, Pastor…</div>
    <div class="bub ai paste" data-at="W19:pasted">“This function elegantly orchestrates a robust, scalable synergy of…”</div></div>
  <div class="ov card ci" data-show="L20|L21-0.2"><div class="bar">checks</div>
    <div class="row" data-at="W20:linter"><span class="ok">✓</span> lint</div>
    <div class="row" data-at="W20:tests"><span class="ok">✓</span> tests <small>(4 of 4)</small></div>
    <div class="row" data-at="W20:amen"><span class="ok">✓</span> review-bot: <b>“Amen.”</b></div></div>
  <div class="ov card alert blink" data-show="L21|L22-0.4"><div class="bar">on call · 2:00 AM</div>
    <h3>prod is down</h3><div class="row">checkout-api · 500s · <b>98%</b></div></div>
  ${fH(11)}${fH(24)}${fH(35)}
  <div class="ov stamp big" data-show="W38:l-g|L39-0.6" data-at="W38:l-g">LGTM</div>
  <div class="ov stamp big green" data-show="W40:approved|${n0(40)+1.2}" data-at="W40:approved">APPROVED</div>`,endAt:()=>n0(40)+1.4,words:{hot:/^(devil's|devil|fire|stunk|slop|confess|lord|nobody|no|knees|two)$/,ice:/^(diff|read|source|witness|function|commit|tests|lines|thousand|claude|sermon|p-r|a-i|bot|linter)$/,gold:/^(green|amen|l-g-t-m|lgtm|approved|ship|button|plan|church|pastor|son|brother|good|book)$/},hud:(J,$)=>{let Q=J>=L(Math.min(40,I7.length-1));return{left:`read the diff &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`<span class="add">+3,982</span> <span class="del">−18</span> &nbsp;·&nbsp; lines read <b>0</b>${Q?" &nbsp;·&nbsp; approved":""}`}},shots:AQ,shotAt:jH,world:(J)=>new vH(J)};var v7=new D0(5822207),PJ=new D0(16723285),V6=new D0(16763213),yH=new D0(10185727),QK=new D0(3985262),WG=new D0(329227),DB=new D0(264212),t7=-24,B6=4,_6=90,JJ=30,D$=(J)=>0.3*Math.pow(2,(J-t7)/B6),m8=(J)=>t7+B6*Math.log2(J/0.3),Y8=t7-14,u9=m8(_6);function CQ(){let J=($,Q=!1)=>{let Z=Math.max(L($)-1.6,Math.min(n0($-1)+0.05,L($)-0.05));return[{name:"ride",at:Z,label:$===47?"it doubles while we're meeting":"hold on",section:Q?"chorus · hushed":"chorus",ride:{first:$,a:Z,b:n0($+3)+0.4,hushed:Q}},{name:$===16?"montage":$===47?"triple":"terrified",at:n0($+3)+0.4,label:$===47?"tentative":"terrified, and thrilled",section:Q?"chorus · hushed":"chorus",ride:{first:$,a:L($),b:n0($+3),hushed:Q}}]};return[{name:"intro",at:0,label:"intro",section:"intro"},{name:"prius",at:L(0)-0.08,label:"the prius",section:"verse 1"},{name:"tesla",at:L(1)-0.08,label:"hands off",section:"verse 1"},{name:"years",at:L(2)-0.08,label:"ten years out",section:"verse 1"},{name:"linear",at:L(3)-0.08,label:"linear brain",section:"verse 1"},{name:"engine",at:L(4)-0.08,label:"one shot",section:"verse 1"},{name:"waiting",at:L(6)-0.08,label:"not yet",section:"verse 1"},{name:"ceiling",at:L(7)-0.08,label:"you're the ceiling",section:"verse 1"},{name:"releases",at:L(8)-0.08,label:"every three weeks",section:"verse 1"},{name:"comet",at:L(9)-0.08,label:"flip phone, comet",section:"verse 1"},{name:"agents",at:L(10)-0.08,label:"forty agents",section:"verse 1"},{name:"eol",at:L(12)-0.08,label:"end-of-life",section:"verse 1"},{name:"standup",at:L(14)-0.08,label:"the standup",section:"verse 1"},...J(16),{name:"cab",at:L(21)-0.08,label:"change board",section:"verse 2"},{name:"kernel",at:L(23)-0.08,label:"pilot phase",section:"verse 2"},{name:"flat",at:L(25)-0.08,label:"stable! love that",section:"verse 2"},{name:"procure",at:L(27)-0.08,label:"procurement",section:"verse 2"},{name:"fab",at:L(29)-0.08,label:"out of stock",section:"verse 2"},{name:"sun",at:L(31)-0.08,label:"soc 2",section:"verse 2"},{name:"vp",at:L(33)-0.08,label:"bonus achieved",section:"verse 2"},{name:"protein",at:L(35)-0.08,label:"the use case",section:"verse 2"},...J(37),{name:"bridge",at:L(42)-0.3,label:"no quorum",section:"bridge"},{name:"premeeting",at:L(43)-0.2,label:"the pre-meeting",section:"bridge"},...J(47,!0),{name:"moved",at:L(52)-0.6,label:"moved to thursday",section:"outro"},{name:"outro",at:L(53)-0.4,label:"the curve didn't wait",section:"outro"},{name:"end",at:n0(53)+2.2,label:"the end",section:"outro"}]}var xH=null,ZK=(J)=>{let $=xH??=CQ();return $.filter((Q)=>J>=Q.at).at(-1)??$[0]},$J=()=>t(7,/^go/i);function CJ(J,$,Q,Z="400 %spx Anton, Impact, sans-serif"){let K=document.createElement("canvas"),U=K.getContext("2d"),H=128;U.font=Z.replace("%s",String(128)),K.width=Math.ceil(U.measureText(J).width+76.8),K.height=Math.ceil(192),U.font=Z.replace("%s",String(128)),U.textAlign="center",U.textBaseline="middle",U.shadowColor=$,U.shadowBlur=24,U.fillStyle=$,U.fillText(J,K.width/2,K.height/2);let Y=new D7(K);Y.colorSpace=V7;let W=new a$(new t6({map:Y,color:10132122,transparent:!0,depthWrite:!1,fog:!1}));return W.scale.set(Q*K.width/K.height,Q,1),W.userData.base=W.scale.clone(),W}var F$=(J,$)=>J.scale.copy(J.userData.base).multiplyScalar(Math.max(0.001,$)),PQ=(J,$)=>new G6({color:J,transparent:!0,opacity:$,depthWrite:!1}),LQ=(J,$,Q=0.9)=>new b8(new e6(J),PQ($,Q));class XG extends Z8{constructor(){super()}getPoint(J,$=new v){let Q=w(Y8,u9,J);return $.set(Q,D$(Q),0)}}var GG={intro:[461342,1194578,263692],prius:[1181478,5903944,459790],tesla:[920106,8002130,525327],years:[268322,1006182,198667],linear:[398368,1460314,198410],engine:[660518,6959124,329484],waiting:[1380138,6957630,460044],ceiling:[399402,2779786,264720],releases:[921386,3418234,394767],comet:[197903,1714794,131849],agents:[201743,1202754,133130],eol:[1182238,4856378,459787],standup:[1708556,5913120,657157],ride:[1836562,9052208,656136],montage:[2098448,10099258,787208],terrified:[2360334,10494014,787206],hushed:[265250,1458298,132623],cab:[1967628,6953508,787206],kernel:[1050656,4860538,394252],flat:[398368,1722970,198410],procure:[1314826,5917210,525834],fab:[1181734,4860554,459791],sun:[2100228,9060368,787971],vp:[399888,1727028,199174],protein:[268832,1727082,133130],bridge:[198159,990778,131848],premeeting:[657940,2763332,328968],moved:[657940,2763332,328968],outro:[263695,1712708,131848],end:[131848,526868,66052]},e0=new v9,f7=(J=0,$=0,Q=0)=>new v(J,$,Q);class bH{bodies;heads;constructor(J,$,Q){this.bodies=new f9(new k7(0.2,0.62,4,8),new F9({color:$,roughness:0.7}),J),this.heads=new f9(new p0(0.17,12,8),new F9({color:new D0($).multiplyScalar(1.2),roughness:0.7}),J),Q.add(this.bodies,this.heads)}set(J,$,Q,Z,K=0,U=!1){let H=U?-0.35:0;e0.position.set($,0.52*Z+H,Q),e0.rotation.set(0,0,K),e0.scale.setScalar(Z),e0.updateMatrix(),this.bodies.setMatrixAt(J,e0.matrix),e0.position.set($-K*0.6,1.2*Z+H,Q),e0.updateMatrix(),this.heads.setMatrixAt(J,e0.matrix)}done(){this.bodies.instanceMatrix.needsUpdate=this.heads.instanceMatrix.needsUpdate=!0}}class hH{renderer;scene=new i7;camera=new Z7(40,1.7777777777777777,0.1,600);composer;bloom;fog=new EJ(WG,0.011);sky;curveWorld=new H0;path=new XG;tube;glow;tip;beam;arc=[];floor;wall;markers=[];years=[];linear;linearTag;expoTag;flatLine;flatTag;stableTag;aiTag;crowd=new H0;crowdPeople;people=[];notYet=[];ceiling=new H0;panes;rims;shards=[];rings=[];moon;meetings;dust;dustSeed=[];road=new H0;dashes;poles;streaks;prius=new H0;tesla=new H0;engine=new H0;stages=[];core;exhaust;slabs=new H0;slab=[];approved;comet=new H0;cometHead=new H0;tail;phoneLid;agents=new H0;agentCubes;agentEdges;room=new H0;table;roomPeople;screen;boards={};fab=new H0;wafer;laser;machines;sun=new H0;sunBall;sunHalo;swarm;swarmDirs=[];protein=new H0;beads;coil=[];helix=[];globe;constructor(J){this.renderer=new E8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=WG.clone(),this.scene.fog=this.fog,this.composer=new BJ(this.renderer),this.composer.addPass(new zJ(this.scene,this.camera)),this.bloom=new g8(new q0(1920,1080),1.1,0.6,0.12),this.composer.addPass(this.bloom),this.composer.addPass(new IJ),this.scene.add(this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein),this.scene.add(new U8(10475775,1050640,1.2));let $=new a7(16777215,1.6);$.position.set(5,10,8),this.scene.add($),this.buildSky(),this.buildCurve(),this.buildCrowd(),this.buildCeiling(),this.buildChorus(),this.buildDust(),this.buildRoad(),this.buildEngine(),this.buildSlabs(),this.buildComet(),this.buildAgents(),this.buildRoom(),this.buildFab(),this.buildSun(),this.buildProtein()}buildSky(){this.sky=new h(new p0(450,32,16),new p9({side:L7,depthWrite:!1,fog:!1,uniforms:{top:{value:new D0},horizon:{value:new D0},bottom:{value:new D0},pulse:{value:0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; uniform float pulse; varying vec3 vDir;
        void main() {
          float y = vDir.y;
          vec3 c = y > 0.0 ? mix(horizon, top, pow(smoothstep(0.0, 0.75, y), 0.7)) : mix(horizon, bottom, smoothstep(0.0, 0.35, -y));
          c += horizon * pulse * exp(-abs(y) * 9.0) * 0.6; // the horizon band breathes with the bass
          gl_FragColor = vec4(c, 1.0);
        }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildCurve(){let J=this.path,$=1400,Q=10,Z=new x8(J,1400,0.14,10,!1),K=Z.attributes.position,U=new Float32Array(K.count*3),H=new D0;for(let B=0;B<K.count;B++){let _=L9(Math.log2(Math.max(K.getY(B),0.04)/0.3)/8);H.copy(v7).lerp(PJ,a0(0.15,0.7,_)).lerp(new D0(16777215),a0(0.75,1,_)*0.7),U.set([H.r,H.g,H.b],B*3)}Z.setAttribute("color",new H7(U,3)),this.tube=new h(Z,new C0({vertexColors:!0}));let Y=new x8(J,1400,0.55,8,!1);this.glow=new h(Y,new C0({color:PJ,transparent:!0,opacity:0.16,blending:M7,depthWrite:!1})),this.tip=new h(new p0(0.42,24,16),new C0({color:16777215})),this.beam=new h(new w0(0.6,0.6,1,12).translate(0,0.5,0),new C0({color:16765146})),this.curveWorld.add(this.tube,this.glow,this.tip,this.beam);let W=0,G=f7(),N=f7(),q=[0];for(let B=1;B<=2000;B++)J.getPoint((B-1)/2000,G),J.getPoint(B/2000,N),W+=G.distanceTo(N),q.push(W);this.arc=q.map((B)=>B/W);let X=[];for(let B=Y8-30;B<=u9+30;B+=B6/4)X.push(B,0,-40,B,0,30);for(let B=-40;B<=30;B+=2)X.push(Y8-30,0,B,u9+30,0,B);let F=new V9;F.setAttribute("position",new Y9(X,3)),this.floor=new b8(F,PQ(v7,0.12));let R=[];for(let B=0;B<=8;B++){let _=0.3*2**B;R.push(Y8-30,_,-3,u9+30,_,-3)}for(let B=t7;B<=u9+20;B+=B6)R.push(B,0,-3,B,_6+20,-3);let M=new V9;M.setAttribute("position",new Y9(R,3)),this.wall=new b8(M,PQ(v7,0.1)),this.curveWorld.add(this.floor,this.wall);for(let B=1;B<=8;B++){let _=t7+B6*B,A=new h(new p0(0.28,16,12),new C0({color:V6}));A.position.set(_,D$(_),0),this.markers.push({x:_,dot:A}),this.curveWorld.add(A)}for(let B=0;B<=10;B++){let _=w(t7,u9,B/10),A=CJ(String(2026+B),B===10?"#ff2d55":"#58d6ff",1.4,"700 %spx 'JetBrains Mono', monospace");A.position.set(_-1.6,D$(_)+1.6,1),this.years.push({x:_,tag:A}),this.curveWorld.add(A)}let D=t7+2*B6,E=D$(D),I=E*Math.LN2/B6,C=new $$(f7(Y8,E+I*(Y8-D),0),f7(u9+6,E+I*(u9+6-D),0));this.linear=new h(new x8(C,200,0.1,8,!1),new C0({color:9081766,transparent:!0})),this.linearTag=CJ("LINEAR BRAIN","#8a93a6",2.6),this.linearTag.position.set(u9-2,E+I*(u9-2-D)+2.4,1),this.expoTag=CJ("EXPONENTIAL PLANE","#ff2d55",3.4),this.expoTag.position.set(m8(42)-15,42,1);let O=new $$(f7(Y8,0.6,1.5),f7(u9+14,0.6,1.5));this.flatLine=new h(new x8(O,200,0.12,8,!1),new C0({color:9081766})),this.flatTag=CJ("OUR ROLLOUT","#8a93a6",2.2),this.flatTag.position.set(u9+4,2.2,1.5),this.stableTag=CJ("STABLE! ♥","#3ccf6e",3),this.stableTag.position.set(u9+4,5.4,1.5),this.aiTag=CJ("THE A-I CURVE","#ff2d55",3),this.aiTag.position.set(m8(36)-9,36,1),this.curveWorld.add(this.linear,this.linearTag,this.expoTag,this.flatLine,this.flatTag,this.stableTag,this.aiTag)}buildCrowd(){this.crowdPeople=new bH(90,8160921,this.crowd);for(let $=0;$<90;$++)this.people.push({x:Y8-8+B0($)*22,z:-1+B0($+50)*10,h:0.85+B0($+99)*0.3,ph:B0($+7)*6.28});for(let $=0;$<7;$++){let Q=this.people[$*11],Z=CJ($%2?"NOT YET":"NO","#ffc94d",1.1);Z.position.set(Q.x,2.2*Q.h+3.2+B0($+31)*2,Q.z),this.notYet.push(Z),this.crowd.add(Z)}this.curveWorld.add(this.crowd)}buildCeiling(){let $=[];for(let U=0;U<26;U++)for(let H=0;H<34;H++)$.push(f7(m8(JJ)-34+H*1.1*1.75+U%2*1.1*0.875,JJ,-16+U*1.1*1.52));let Q=new C7(1.056,6).rotateX(-Math.PI/2),Z=new N6(0.9900000000000001,1.078,6).rotateX(-Math.PI/2);this.panes=new f9(Q,new C0({color:v7,transparent:!0,opacity:0.1,side:d9,depthWrite:!1,blending:M7}),$.length),this.rims=new f9(Z,new C0({color:v7,transparent:!0,opacity:0.55,side:d9,depthWrite:!1}),$.length);let K=f7(m8(JJ),JJ,0);$.forEach((U,H)=>{let Y=U.clone().sub(K).setY(0),W=Y.length();Y.normalize().multiplyScalar(4+B0(H)*10+30/(W+2)),Y.y=6+B0(H+3)*16+40/(W+2),this.shards.push({p:U,v:Y,axis:f7(B0(H+5)-0.5,B0(H+6)-0.5,B0(H+7)-0.5).normalize(),spin:3+B0(H+8)*8,delay:W*0.018})}),this.ceiling.add(this.panes,this.rims),this.curveWorld.add(this.ceiling)}buildChorus(){for(let J=0;J<12;J++){let $=new h(new Y7(1,0.05,8,64),new C0({color:PJ,transparent:!0,depthWrite:!1,blending:M7}));this.rings.push($),this.curveWorld.add($)}this.moon=new h(new p0(9,32,24),new C0({color:13624063,fog:!1,transparent:!0})),this.moon.position.set(-40,70,-160),this.curveWorld.add(this.moon),this.meetings=new f9(new I0(1.5,0.12,2.2),new C0({color:5078271,transparent:!0,opacity:0.85}),512);for(let J=0;J<512;J++)e0.position.set(t7-4+B0(J+900)*52,1+B0(J+1900)*70,-2.4),e0.rotation.set(Math.PI/2,0,0),e0.scale.setScalar(1),e0.updateMatrix(),this.meetings.setMatrixAt(J,e0.matrix);this.curveWorld.add(this.meetings)}buildDust(){let $=new Float32Array(4800);for(let Z=0;Z<1600;Z++)this.dustSeed.push(B0(Z*3),B0(Z*3+1),B0(Z*3+2));let Q=new V9;Q.setAttribute("position",new H7($,3)),this.dust=new Q8(Q,new s7({color:9427199,size:0.12,transparent:!0,opacity:0.6,depthWrite:!1,blending:M7})),this.scene.add(this.dust)}buildRoad(){let J=new h(new t0(16,600).rotateX(-Math.PI/2),new F9({color:724244,roughness:0.6,metalness:0.3}));J.position.z=-250,this.road.add(J),this.dashes=new f9(new I0(0.16,0.02,2.6),new C0({color:14674165}),100);for(let Q of[-5.4,5.4]){let Z=new h(new I0(0.14,0.02,600),new C0({color:v7}));Z.position.set(Q,0.01,-250),this.road.add(Z)}this.poles=new f9(new I0(0.12,0.12,0.8),new C0({color:V6}),48),this.streaks=new f9(new I0(0.03,0.03,9),new C0({color:13627391,transparent:!0,blending:M7,depthWrite:!1}),120),this.road.add(this.dashes,this.poles,this.streaks);let $=(Q,Z,K)=>{let U=new H0,H=new F9({color:Q,roughness:K?0.25:0.7,metalness:K?0.8:0.2}),Y=new I0(1.9,0.55,K?4.7:4.2),W=new I0(1.55,0.5,K?2.6:2);for(let[N,q,X]of[[Y,0.5,0],[W,1.02,K?0.1:0.35]]){let F=new h(N,H);F.position.set(0,q,X);let R=LQ(N,Z,K?0.95:0.8);R.position.copy(F.position),U.add(F,R)}let G=new h(new I0(K?1.8:0.4,0.09,0.05),new C0({color:K?PJ:new D0(8002088)}));if(G.position.set(0,0.66,(K?4.7:4.2)/2+0.01),U.add(G),!K){let N=G.clone();G.position.x=-0.65,N.position.x=0.65,U.add(N)}for(let N of[-0.85,0.85]){let q=new h(new w0(0.34,0.34,0.24,18).rotateZ(Math.PI/2),new F9({color:328967}));for(let X of[-1.3,1.3]){let F=q.clone();F.position.set(N,0.34,X),U.add(F)}}return U};this.prius=$(7109260,v7,!1),this.tesla=$(855828,new D0(16777215),!0),this.road.add(this.prius,this.tesla)}buildEngine(){let J=new b8(new KQ(new w0(3.1,2.6,7,36,5,!0).rotateX(Math.PI/2)),PQ(v7,0.28));J.position.z=-2.5,this.engine.add(J);let $=(H,Y,W,G,N,q,X)=>{let F=new H0,R=new I0(0.07,G,0.55).translate(0,W-G/2,0),M=new f9(R,new F9({color:N,roughness:0.35,metalness:0.85,emissive:N,emissiveIntensity:0.15}),Y);for(let D=0;D<Y;D++)e0.rotation.set(0,0,D/Y*Math.PI*2),e0.rotateY(X),e0.position.set(0,0,0),e0.scale.setScalar(1),e0.updateMatrix(),M.setMatrixAt(D,e0.matrix);F.add(M),F.position.z=H,this.engine.add(F),this.stages.push({g:F,speed:q})};$(0.6,24,2.85,2.2,new D0(12109526),1,0.55),$(-1,40,2.1,1.3,new D0(7324648),-1.6,-0.4),$(-1.9,44,1.85,1.1,new D0(15235695),2.1,0.4),$(-2.7,48,1.6,0.9,new D0(16731486),-2.6,-0.4);let Q=new h(new g9(0.75,1.5,32).rotateX(Math.PI/2),new F9({color:14673646,metalness:0.9,roughness:0.2}));Q.position.z=1.4,this.core=new h(new p0(1.3,24,16),new C0({color:PJ,transparent:!0,blending:M7,depthWrite:!1})),this.core.position.z=-5.5;let Z=900,K=new Float32Array(Z*3),U=new V9;U.setAttribute("position",new H7(K,3)),this.exhaust=new Q8(U,new s7({color:16747100,size:0.18,transparent:!0,depthWrite:!1,blending:M7})),this.engine.add(Q,this.core,this.exhaust)}buildSlabs(){let J=0;for(let Q=0;Q<12;Q++){let Z=0.7*1.42**Q,K=1.4+Q*0.12,U=new I0(K,Z,K).translate(0,Z/2,0),H=new h(U,new F9({color:1317414,roughness:0.4,metalness:0.6,transparent:!0})),Y=LQ(U,v7,0.9),W=CJ(`v${Q+1}`,"#58d6ff",1.2+Q*0.12,"700 %spx 'JetBrains Mono', monospace");W.position.set(0,Z+1.2,0);let G=new H0;G.add(H,Y,W),G.position.x=J,this.slabs.add(G),this.slab.push({g:G,mesh:H,edge:Y,tag:W,x:J,h:Z}),J+=K+1.6}this.approved=CJ("APPROVED","#3ccf6e",1.6),this.slabs.add(this.approved);let $=new mJ(200,100,1784402,924971);$.position.x=40,this.slabs.add($)}buildComet(){let J=new h(new $Q(1.1,2),new C0({color:16777215})),$=new h(new p0(2.2,24,16),new C0({color:v7,transparent:!0,opacity:0.25,blending:M7,depthWrite:!1})),Q=new H0,Z=new h(new I0(0.7,0.08,1.2),new F9({color:3817290,metalness:0.6}));Z.position.z=0.6,this.phoneLid=new H0;let K=new h(new I0(0.7,0.08,1.2),new F9({color:3817290,metalness:0.6}));K.position.z=-0.6;let U=new h(new t0(0.5,0.8),new C0({color:8257456}));U.rotation.x=-Math.PI/2,U.position.set(0,0.05,-0.6),this.phoneLid.add(K,U),Q.add(Z,this.phoneLid),Q.scale.setScalar(2.4),Q.position.set(0,1.9,1.4),Q.rotation.set(0.3,0,0.2);let H=new h(new Y7(1.16,0.06,6,40),new C0({color:V6}));H.rotation.y=Math.PI/2,this.cometHead.add(J,$,Q,H);let Y=1400,W=new Float32Array(Y*3),G=new V9;G.setAttribute("position",new H7(W,3)),this.tail=new Q8(G,new s7({color:11069183,size:0.22,transparent:!0,depthWrite:!1,blending:M7})),this.comet.add(this.cometHead,this.tail)}buildAgents(){let J=new I0(1,1,1);this.agentCubes=new f9(J,new C0({color:16777215}),40),this.agentEdges=new f9(new I0(1.12,1.12,1.12),new C0({color:v7,wireframe:!0,transparent:!0,opacity:0.6}),40);let $=new h(new I0(3,2,0.2),new C0({color:858642})),Q=LQ(new I0(3,2,0.2),QK);$.position.set(0,1.2,0),Q.position.copy($.position);let Z=new mJ(80,40,1784402,924971);this.agents.add(this.agentCubes,this.agentEdges,$,Q,Z)}buildRoom(){this.table=new H0;let J=new h(new I0(9,0.15,3),new F9({color:1711398,roughness:0.3,metalness:0.5}));J.position.y=0.95;let $=LQ(new I0(9,0.15,3),v7,0.5);$.position.copy(J.position),this.table.add(J,$),this.roomPeople=new bH(12,8160921,this.room),this.screen=new h(new t0(9,5.1),new C0({color:16777215}));let Q=(K,U,H)=>{let Y=document.createElement("canvas");Y.width=1024,Y.height=580;let W=Y.getContext("2d");W.fillStyle="#0b1020",W.fillRect(0,0,1024,580),W.fillStyle=U,W.fillRect(0,0,1024,96),W.font="400 64px Anton, Impact, sans-serif",W.fillStyle="#05060b",W.fillText(K.toUpperCase(),40,74),W.font="700 46px 'JetBrains Mono', monospace",H.forEach((N,q)=>{W.fillStyle=N.startsWith("!")?U:"#e8ecf5",W.fillText(N.replace(/^!/,""),48,180+q*84)});let G=new D7(Y);return G.colorSpace=V7,G};this.boards={standup:Q("Daily standup","#58d6ff",["Yesterday: tickets","Today: tickets","Blockers: none","!AOB: the singularity?"]),cab:Q("Change Advisory Board","#ff2d55",["Agenda","1. Review: end of man","2. Rollback plan?","!Status: CHANGE REQUEST"]),vp:Q("Q3 AI update","#3ccf6e",["You're crushing it! \uD83D\uDE80","Adoption: 3 seats","Next: a committee","!BONUS ACHIEVED"]),premeeting:Q("Pre-meeting","#9b6bff",["Plan the meeting","about how far ahead","we are","!Accept · Decline · Tentative"]),tentative:Q("Pre-meeting","#9b6bff",["Plan the meeting","Your reply:","!✓ Tentative"]),moved:Q("Pre-meeting","#ffc94d",["!Moved to Thursday","Attendees: 0","The curve: not invited"])},this.screen.position.set(-6.4,3.2,0),this.screen.rotation.y=Math.PI/2;let Z=new mJ(60,30,2761266,1446428);this.room.add(this.table,this.screen,Z)}buildFab(){let J=document.createElement("canvas");J.width=J.height=512;let $=J.getContext("2d"),Q=$.createRadialGradient(256,256,20,256,256,256);Q.addColorStop(0,"#5b4a8a"),Q.addColorStop(0.6,"#2b6f8a"),Q.addColorStop(1,"#7a3f6a"),$.fillStyle=Q,$.fillRect(0,0,512,512),$.strokeStyle="rgba(255,255,255,.35)";for(let H=0;H<=512;H+=32)$.beginPath(),$.moveTo(H,0),$.lineTo(H,512),$.moveTo(0,H),$.lineTo(512,H),$.stroke();let Z=new D7(J);Z.colorSpace=V7,this.wafer=new h(new C7(4,64).rotateX(-Math.PI/2),new C0({map:Z})),this.wafer.position.y=0.2,this.laser=new h(new w0(0.08,0.08,14,12).translate(0,7,0),new C0({color:yH,transparent:!0,blending:M7,depthWrite:!1}));let K=LQ(new I0(12,9,9).translate(0,4.5,0),yH,0.4);this.machines=new f9(new I0(2.4,2.4,2.4),new C0({color:16777215}),70);for(let H=0;H<70;H++)e0.position.set(-30+H%14*4.4,1.2,-14-Math.floor(H/14)*4.4),e0.rotation.set(0,0,0),e0.scale.setScalar(1),e0.updateMatrix(),this.machines.setMatrixAt(H,e0.matrix);let U=new mJ(120,60,2760516,1380130);this.fab.add(this.wafer,this.laser,K,this.machines,U)}buildSun(){this.sunBall=new h(new p0(6,48,32),new C0({color:16765562,fog:!1}));let J=document.createElement("canvas");J.width=J.height=256;let $=J.getContext("2d"),Q=$.createRadialGradient(128,128,30,128,128,128);Q.addColorStop(0,"rgba(255,200,90,1)"),Q.addColorStop(1,"rgba(255,120,40,0)"),$.fillStyle=Q,$.fillRect(0,0,256,256),this.sunHalo=new a$(new t6({map:new D7(J),transparent:!0,depthWrite:!1,blending:M7,fog:!1})),this.sunHalo.scale.set(34,34,1);let Z=700;this.swarm=new f9(new C7(0.7,6),new F9({color:658450,metalness:0.9,roughness:0.3,side:d9,emissive:1714746}),Z);for(let K=0;K<Z;K++){let U=1-2*(K+0.5)/Z,H=Math.sqrt(1-U*U),Y=K*2.39996;this.swarmDirs.push(f7(Math.cos(Y)*H,U,Math.sin(Y)*H))}this.sun.add(this.sunHalo,this.sunBall,this.swarm)}buildProtein(){this.beads=new f9(new p0(0.32,12,8),new C0({color:16777215}),160);let $=new D0,Q=f7(-12,0,0);for(let K=0;K<160;K++){this.beads.setColorAt(K,$.setHSL(0.55+K/160*0.45,0.8,0.32)),Q=Q.clone().add(f7(0.15+B0(K)*0.1,(B0(K+1)-0.5)*0.5,(B0(K+2)-0.5)*0.5)),this.coil.push(Q);let U=K*0.62;this.helix.push(f7(Math.cos(U)*2.6,-6+K*0.075,Math.sin(U)*2.6))}this.globe=new b8(new KQ(new p0(4.5,24,16)),PQ(QK,0.35)),this.globe.position.set(9,1,-4);let Z=new mJ(80,40,1784402,924971);Z.position.y=-7,this.protein.add(this.beads,this.globe,Z)}drawX(J,$){let Q=w(Y8,m8(12),Z9(U0(J,0.4,L(0)-0.2))*0.85+U0(J,0.4,L(0)-0.2)*0.15);if($==="intro")return Q;if($==="years")return w(m8(12),u9,p8(U0(J,L(2),L(3)-0.3)));if($==="ceiling")return J<$J()?m8(JJ)-0.05:w(m8(JJ),u9,Z9(U0(J,$J(),$J()+0.9)));return u9}setDraw(J){let $=L9(Math.round((J-Y8)/(u9-Y8)*2000),0,2000),Q=this.arc[$]??1;for(let Z of[this.tube,this.glow]){let K=Z.geometry.parameters.tubularSegments,U=Z.geometry.parameters.radialSegments;Z.geometry.setDrawRange(0,Math.floor(Q*K)*U*6)}this.tip.position.set(J,D$(J),0)}flash(J){let $=0;for(let Z of(xH??=CQ()).slice(1)){if(Z.name==="terrified"||Z.name==="end")continue;let K=Z.name==="bridge"||Z.name==="outro"?0:Z.name==="ride"?0.6:0.35;if(J>=Z.at)$=Math.max($,Math.exp(-(J-Z.at)*8)*K)}if(J>=$J())$=Math.max($,Math.exp(-(J-$J())*6)*0.8);let Q=ZK(J);if(Q.name==="triple"){for(let Z of[t(51,/^thrilled/i),t(51,/^tentative/i)])if(J>=Z)$=Math.max($,Math.exp(-(J-Z)*9)*0.4)}if(Q.name==="montage"){let Z=O8()*4;$=Math.max($,Math.exp(-((J-Q.at)%Z)*9)*0.45)}return $}fade(J){return a0(n0(53)+0.6,n0(53)+2.2,J)}update(J){let $=ZK(J),Q=$.at,Z=J-Q;for(let R of[this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein])R.visible=!1;let K=dW(J),U=r7(J),H=["bridge","premeeting","moved","outro","end"].includes($.name)||!!$.ride?.hushed;this.bloom.strength=(H?0.7:0.85)+K*(H?0.3:0.55)+($.name==="ceiling"?this.flash(J)*0.6:0);let[Y,W,G]=(GG[$.name==="ride"||$.name==="terrified"?$.ride?.hushed?"hushed":$.name:$.name]??GG.intro).map((R)=>new D0(R));this.sky.material.uniforms.top.value.copy(Y),this.sky.material.uniforms.horizon.value.copy(W),this.sky.material.uniforms.bottom.value.copy(G),this.sky.material.uniforms.pulse.value=K,this.scene.background.copy(G),this.fog.color.copy(W).lerp(G,0.55),this.fog.density=0.011;let N=this.camera,q=f7();N.fov=40;let X=this.dust.geometry.attributes.position;for(let R=0;R<X.count;R++){let[M,D,E]=[this.dustSeed[R*3],this.dustSeed[R*3+1],this.dustSeed[R*3+2]];X.setXYZ(R,-70+M*110,(D*90+J*(0.4+E))%90,-50+E*70)}switch(X.needsUpdate=!0,this.dust.material.opacity=0.35+K*0.4,$.name){case"intro":case"years":case"linear":case"waiting":case"ceiling":case"flat":case"ride":case"terrified":case"bridge":case"outro":case"end":this.curveShot(J,$,q,K,U);break;case"prius":case"tesla":this.roadShot(J,$,q,K);break;case"engine":this.engineShot(J,Q,q,K);break;case"releases":case"eol":case"procure":this.slabShot(J,$,q,U);break;case"comet":this.cometShot(J,Z,q);break;case"agents":case"kernel":this.agentShot(J,$,q,U);break;case"standup":case"cab":case"vp":case"premeeting":case"moved":this.roomShot(J,$,q,U);break;case"triple":if(J<t(51,/^thrilled/i)-0.05)this.curveShot(J,{...$,name:"terrified"},q,K,U);else if(J<t(51,/^tentative/i)-0.05)this.engineShot(J,t(51,/^thrilled/i)-2.5,q,K);else this.roomShot(J,$,q,U);break;case"montage":{let R=O8()*4,M=Math.floor((J-Q)/R),D=Q+M*R,E=["engine","comet","agents","fab","sun","releases"][M%6];if(E==="engine")this.engineShot(J,D-2,q,K);else if(E==="comet")this.cometShot(J,J-D,q);else if(E==="agents")this.agentShot(J,{...$,name:"agents",at:D},q,U);else if(E==="fab")this.fabShot(J,J-D,q,K);else if(E==="sun")this.sunShot(J,q,K);else this.slabShot(J,{...$,name:"releases",at:D-3},q,U);break}case"fab":this.fabShot(J,Z,q,K);break;case"sun":this.sunShot(J,q,K);break;case"protein":this.proteinShot(J,q);break}let F=H?0.03:0.12;N.position.x+=(B0(Math.floor(J*30))-0.5)*U*F,N.position.y+=(B0(Math.floor(J*30)+1)-0.5)*U*F,N.updateProjectionMatrix(),N.lookAt(q),this.sky.position.copy(N.position)}curveShot(J,$,Q,Z,K){let U=this.camera,H=$.at,Y=$.name;this.curveWorld.visible=!0;let W=this.drawX(J,Y);this.setDraw(W),this.tip.scale.setScalar(1+K*0.6),this.tip.visible=W<u9-0.1||Y==="outro"||Y==="end",this.beam.visible=!1;let G=!!$.ride?.hushed||Y==="bridge"||Y==="outro"||Y==="end";this.tube.material.color.set(G?10275071:16777215),this.glow.material.color.copy(G?v7:PJ),this.floor.material.opacity=0.08+K*0.1+Z*0.06,this.wall.material.opacity=(Y==="intro"?a0(0.5,4,J):1)*(0.07+K*0.06);for(let F of this.markers){let R=w9(U0(W,F.x,F.x+1.2));F.dot.scale.setScalar(Math.max(0.001,R*(1+K*0.4)))}this.years.forEach((F,R)=>{F.tag.visible=Y==="years",F$(F.tag,w9(U0(J,L(2)+R*0.18,L(2)+R*0.18+0.3))*(R===10?1.6:1))});let N=Y==="linear";if(this.linear.visible=this.linearTag.visible=this.expoTag.visible=N,N){let F=this.linear.geometry.parameters.tubularSegments*8*6;this.linear.geometry.setDrawRange(0,Math.floor(Z9(U0(J,H,t(3,/^brain/i)+0.3))*F)),this.linearTag.material.opacity=a0(t(3,/^brain/i),t(3,/^brain/i)+0.3,J),this.expoTag.material.opacity=a0(t(3,/^expo/i),t(3,/^expo/i)+0.3,J)}let q=Y==="flat";if(this.flatLine.visible=this.flatTag.visible=this.stableTag.visible=this.aiTag.visible=q,q){F$(this.aiTag,w9(U0(J,t(25,/^curve/i),t(25,/^curve/i)+0.3))),F$(this.flatTag,w9(U0(J,t(25,/^flat/i),t(25,/^flat/i)+0.3))),F$(this.stableTag,w9(U0(J,t(26,/^stable/i),t(26,/^stable/i)+0.3))*(1+K*0.15));let F=this.flatLine.geometry.parameters.tubularSegments*8*6;this.flatLine.geometry.setDrawRange(0,Math.floor(Z9(U0(J,t(25,/^our/i)-0.2,t(25,/^flat/i)+0.3))*F))}if(this.crowd.visible=Y==="waiting",this.crowd.visible)this.people.forEach((F,R)=>this.crowdPeople.set(R,F.x,F.z,F.h,Math.sin(J*1.3+F.ph)*0.05)),this.crowdPeople.done(),this.notYet.forEach((F,R)=>{let M=(R%2?t(6,/^not/i):t(6,/^no\W*$/i))+R*0.07;F$(F,w9(U0(J,M,M+0.25)))});if(this.ceiling.visible=Y==="ceiling",this.ceiling.visible){let F=$J(),R=J<F?a0(H,F,J)*0.04:0;this.shards.forEach((M,D)=>{let E=Math.max(0,J-F-M.delay);e0.position.copy(M.p).addScaledVector(M.v,E),e0.position.y-=9*E*E,e0.position.y+=Math.sin(J*40+D)*R,e0.quaternion.setFromAxisAngle(M.axis,E*M.spin),e0.scale.setScalar(1),e0.updateMatrix(),this.panes.setMatrixAt(D,e0.matrix),this.rims.setMatrixAt(D,e0.matrix)}),this.panes.instanceMatrix.needsUpdate=this.rims.instanceMatrix.needsUpdate=!0,this.rims.material.opacity=0.35+K*0.3+(J>=F?0.2:0),this.rims.material.color.copy(v7).lerp(new D0(16777215),J>=F?0.6:0)}let X=$.ride;for(let F of this.rings)F.visible=!1;if(this.moon.visible=!1,this.meetings.visible=!1,X){let F=O8(),R=W$(J);this.rings.forEach((M,D)=>{let E=D*F+((J-R*F)%F+F)%F;if(E>3||R-D<0)return;let I=this.rideU(J-E,X.a,X.b);M.visible=!0,M.position.copy(this.path.getPointAt(I)),M.quaternion.setFromUnitVectors(f7(0,0,1),this.path.getTangentAt(I)),M.scale.setScalar(0.6+E*7),M.material.opacity=Math.exp(-E*1.6)*0.9,M.material.color.copy(X.hushed?v7:D%2?PJ:V6)})}if(Y==="intro"){let F=Z9(U0(J,0,L(0)));U.position.set(w(Y8+2,t7+8,F),w(0.9,7.5,F),w(7,34,F)),Q.set(w(Y8+8,t7+12,F),w(0.4,6,F),0)}else if(Y==="years"){let F=D$(this.drawX(J,"years"));Q.set(w(t7+14,u9-6,U0(J,H,L(3))),Math.min(F,60)*0.55+2,0),U.position.set(Q.x-10,Q.y*0.5+2,30+Math.min(F,60)*0.55)}else if(Y==="linear"){let F=Z9(U0(J,H,L(4)));U.position.set(-10,15,w(84,74,F)),Q.set(-8,13,0)}else if(Y==="waiting"){let F=U0(J,H,L(7));U.position.set(Y8-12+F*3,3.2,16-F*3),Q.set(t7+4,6+F*3,0)}else if(Y==="ceiling"){let F=$J(),R=Z9(U0(J,F,F+1.6));U.position.set(m8(JJ)-16,w(20,26,R),w(34,46,R)),Q.set(m8(JJ)+w(0,2,R),w(JJ-3,JJ+22,R),0)}else if(Y==="flat"){let F=Z9(U0(J,H,L(27)));U.position.set(w(u9-30,u9-18,F),22,w(78,70,F)),Q.set(u9-10,24,0)}else if(Y==="ride"&&X){let F=L(X.first),R=X.first+2;if(this.fog.density=0.011+0.07*NG(J,L(R),L(R+1)-0.1,0.4,0.3),this.moon.visible=!0,this.moon.material.opacity=NG(J,L(X.first+1)-0.3,L(R)-0.2,0.5,0.5),this.meetings.visible=X.hushed,X.hushed)this.meetings.count=Math.min(512,2**Math.max(0,Math.floor((J-F)/(O8()*2))));let M=this.rideU(J,X.a,X.b),D=this.path.getPointAt(M),E=this.path.getPointAt(Math.min(1,M+0.04)),I=J<L(X.first+1)-0.2?0:J<L(R)-0.2?1:J<L(R+1)-0.2?2:3;if(I===1){let C=U0(J,L(X.first+1)-0.2,L(R)-0.2);U.position.set(w(t7-10,t7-4,C),2.5,w(58,48,C)),Q.set(t7+18,w(18,24,C),0),U.fov=50}else if(I===3){let C=U0(J,L(R+1)-0.2,X.b),O=w(-0.5,0.6,C);U.position.set(u9-9+Math.sin(O)*6,1.2,Math.cos(O)*8),Q.set(u9-1,w(30,70,Z9(C)),0),U.fov=72}else{let C=a0(0.35,0.8,M);U.position.set(D.x-w(2.5,9,C),D.y+w(1.4,-3,C),(X.hushed?7:4.5)+C*12),Q.copy(E).setZ(0),U.fov=X.hushed?46:58}}else if(Y==="terrified"&&X){let F=U0(J,H,pE($)),R=w(-0.9,1.4,Z9(F)),M=X.hushed?48:w(26,40,F);U.position.set(u9+Math.sin(R)*M,w(78,46,F),Math.cos(R)*M),Q.set(u9-3,w(70,40,F),0),U.fov=48,this.fog.density=0.004}else if(Y==="bridge"){let F=U0(J,H,L(47));U.position.set(w(u9-60,u9-40,F),w(20,30,F),w(110,80,F)),Q.set(u9-10,35,0),this.fog.density=0.005}else{let F=L(53)+0.6,R=p8(U0(J,F,n0(53)+1.8)),M=w(_6,_6+600,R);this.tip.position.set(u9,M,0),this.beam.visible=M>_6+0.5,this.beam.position.set(u9,_6,0),this.beam.scale.set(1,M-_6,1),U.position.set(u9-50,18,95),Q.set(u9-12,w(36,80,Z9(U0(J,F,n0(53)+2.2))),0),this.fog.density=0.004}}rideU(J,$,Q){let Z=U0(J,$,Q);return w(0.05,0.985,Z*Z*0.35+Z9(Z)*0.65)}roadShot(J,$,Q,Z){let K=this.camera,U=$.at,H=J-U;this.road.visible=!0;let Y=$.name==="tesla";this.prius.visible=!Y,this.tesla.visible=Y;let W=Y?46:15,G=H*W%6;for(let q=0;q<2;q++)for(let X=0;X<50;X++)e0.position.set(q?1.8:-1.8,0.01,12-X*6+G),e0.rotation.set(0,0,0),e0.scale.setScalar(1),e0.updateMatrix(),this.dashes.setMatrixAt(q*50+X,e0.matrix);let N=H*W%16;for(let q=0;q<2;q++)for(let X=0;X<24;X++)e0.position.set(q?7.5:-7.5,3.2,12-X*16+N),e0.updateMatrix(),this.poles.setMatrixAt(q*24+X,e0.matrix);for(let q=0;q<120;q++){let X=15-(H*90+B0(q)*260)%260;e0.position.set((B0(q+1)-0.5)*30,0.4+B0(q+2)*7,X),e0.updateMatrix(),this.streaks.setMatrixAt(q,e0.matrix)}if(this.dashes.instanceMatrix.needsUpdate=this.poles.instanceMatrix.needsUpdate=this.streaks.instanceMatrix.needsUpdate=!0,this.streaks.material.opacity=Y?0.25+Z*0.5:0,Y){this.tesla.position.set(0,0,0),this.tesla.rotation.set(0,0,0);let q=Z9(U0(J,U,L(2))),X=w(1.15,0.12,q);K.position.set(Math.sin(X)*11,w(1.2,2.8,q),Math.cos(X)*11-1.2),Q.set(0,0.7,-2.5)}else{let q=1.15*Math.sin(H*2.2)+0.45*Math.sin(H*5.1+1),X=2.53*Math.cos(H*2.2)+2.295*Math.cos(H*5.1+1);this.prius.position.set(q,0,0),this.prius.rotation.set(0,-X*0.06,X*0.01),K.position.set(q*0.35+1.2,2.8,8.5),Q.set(q*0.5,0.6,-8)}}engineShot(J,$,Q,Z){let K=this.camera,U=J-$;this.engine.visible=!0;let H=U*(5+U*2.2);for(let N of this.stages)N.g.rotation.z=H*N.speed;this.core.scale.setScalar(0.8+Z*0.8),this.core.material.opacity=0.5+Z*0.5;let Y=this.exhaust.geometry.attributes.position;for(let N=0;N<Y.count;N++){let q=(U*(0.8+B0(N)*0.6)+B0(N+1))%1,X=(0.3+q*2.2)*Math.sqrt(B0(N+2)),F=B0(N+3)*6.283+U*3;Y.setXYZ(N,Math.cos(F)*X,Math.sin(F)*X,-5-q*28)}Y.needsUpdate=!0,this.exhaust.material.opacity=0.4+Z*0.6;let W=Z9(U0(J,$,L(6))),G=w(0.65,2.2,W);K.position.set(Math.sin(G)*13,w(2.5,4,W),Math.cos(G)*13),Q.set(0,0,w(0,-4,W))}slabShot(J,$,Q,Z){let K=this.camera,U=$.at;this.slabs.visible=!0,this.approved.visible=$.name==="procure";let H=new D0(3817552);this.slab.forEach((N,q)=>{let X=1,F=v7,R=0,M=0.9;if($.name==="releases"){let D=U+0.15+q*((n0(8)-U)/12);X=w9(U0(J,D,D+0.25)),F=q===Math.floor((J-U-0.15)/((n0(8)-U)/12))?PJ:v7}else if($.name==="eol"){let D=t(12,/^live/i);if(X=q<11?1:w9(U0(J,D-0.2,D+0.15)),F=q===11?J>=D?PJ:v7:q===10?V6:H,q===10)F=J>=t(13,/^end/i)?H:V6;let E=t(13,/^end/i)+(10-q)*0.06;R=q<11?p8(U0(J,E,E+0.7)):0,M=q<11?0.5:1}else X=1,F=q===3?J>=t(28,/^four/i)?QK:H:q===8?J>=t(28,/^nine/i)?V6:H:H,M=q===8&&J>=t(28,/^nine/i)?1:0.6;N.g.scale.set(1,Math.max(0.001,X),1),N.g.rotation.z=-R*1.45,N.g.position.y=-R*0.5,N.edge.material.color.copy(F),N.edge.material.opacity=M*(0.6+Z*0.4),N.tag.material.color.copy(F).multiplyScalar(0.7),N.tag.visible=X>0.3,N.mesh.material.emissive=F.clone().multiplyScalar(q===8&&$.name==="procure"&&J>=t(28,/^nine/i)?0.5:0.05)});let Y=this.slab[3],W=this.slab[8],G=this.slab[11];if($.name==="procure"){this.approved.position.set(Y.x,Y.h+3,0),F$(this.approved,w9(U0(J,t(27,/^nod/i),t(27,/^nod/i)+0.3)));let N=Z9(U0(J,t(28,/^nine/i)-0.3,t(28,/^nine/i)+1));K.position.set(w(Y.x+2,W.x-4,N),w(4,W.h*0.6,N),w(14,26,N)),Q.set(w(Y.x,W.x,N),w(Y.h*0.6,W.h*0.7,N),0)}else if($.name==="releases"){let N=U0(J,U,L(9)),q=Math.min(11,Math.floor(N*12)),X=this.slab[q];K.position.set(w(-6,G.x-20,N),w(3,14,N),w(16,34,N)),Q.set(X.x-2,X.h*0.5,0)}else{let N=Z9(U0(J,U,L(14)));K.position.set(w(G.x-34,G.x-22,N),w(16,22,N),w(80,70,N)),Q.set(G.x-14,w(16,20,N),0)}}cometShot(J,$,Q){let Z=this.camera;this.comet.visible=!0;let K=U0(J,L(9)-0.08,L(10)-0.08),U=f7(w(-40,30,K),w(14,4,K)+Math.sin(K*3)*2,w(-30,0,K)),H=f7(70,-10,30).normalize();this.cometHead.position.copy(U),this.cometHead.rotation.set($*2,$*3,0),this.phoneLid.rotation.x=-0.4-Math.abs(Math.sin($*9))*0.8;let Y=this.tail.geometry.attributes.position;for(let W=0;W<Y.count;W++){let G=B0(W),N=G*G*26,q=0.2+N*0.12;Y.setXYZ(W,U.x-H.x*N+(B0(W+1)-0.5)*q*2,U.y-H.y*N+(B0(W+2)-0.5)*q*2+Math.sin($*4+W)*0.05,U.z-H.z*N+(B0(W+3)-0.5)*q*2)}Y.needsUpdate=!0,Z.position.set(U.x-6,U.y+2.5,U.z+14),Q.copy(U)}agentShot(J,$,Q,Z){let K=this.camera,U=$.at;this.agents.visible=!0;let H=$.name==="kernel",Y=new D0;for(let N=0;N<40;N++){let q=N/40*Math.PI*2,X=N%2?7:10,F=0.9+B0(N)*0.8,R=(J-U+B0(N+1)*F)%F/F,M=Math.exp(-R*8);e0.position.set(Math.cos(q)*X,0.6+M*0.8,Math.sin(q)*X),e0.rotation.set(0,q+J*0.4,0),e0.scale.setScalar(0.9),e0.updateMatrix(),this.agentCubes.setMatrixAt(N,e0.matrix),this.agentEdges.setMatrixAt(N,e0.matrix),Y.set(H?2759236:1714746).lerp(QK,M*0.8),this.agentCubes.setColorAt(N,Y)}if(this.agentCubes.instanceMatrix.needsUpdate=this.agentEdges.instanceMatrix.needsUpdate=!0,this.agentCubes.instanceColor)this.agentCubes.instanceColor.needsUpdate=!0;this.agentEdges.material.opacity=0.4+Z*0.4;let W=U0(J,U,H?L(25):L(12)),G=w(0.3,1.6,W);K.position.set(Math.sin(G)*22,w(12,7,W),Math.cos(G)*22),Q.set(0,1,0)}roomShot(J,$,Q,Z){let K=this.camera,U=$.at;this.room.visible=!0;let H=$.name==="standup",Y=$.name==="premeeting",W=$.name==="moved",G=$.name==="triple";this.table.visible=!H;let N=H?L(16):$.name==="cab"?L(23):Y?L(47):W?L(53):G?L(52):L(35);for(let R=0;R<12;R++)if(H){let M=R/11*Math.PI*2,D=R===11;this.roomPeople.set(R,D?0:Math.cos(M)*4,D?0:Math.sin(M)*4,D?1.05:0.95+B0(R)*0.15,D?Math.sin(J*9)*0.12*(1-U0(J,L(15),L(15)+0.5)):Math.sin(J+R)*0.03)}else{let M=R%2?1:-1,E=-3.5+Math.floor(R/2)*1.45,I=Y?w9(U0(J,L(43)+R*0.3,L(43)+R*0.3+0.4)):1,C=W?p8(U0(J,t(52,/^moved/i)+B0(R)*1.2,t(52,/^moved/i)+B0(R)*1.2+1.4)):0;this.roomPeople.set(R,E+C*M*3,M*(1.95+C*9),Math.max(0.001,(0.95+B0(R)*0.12)*I),Math.sin(J*0.8+R)*0.02,C<0.05)}this.roomPeople.done(),this.screen.material.map=this.boards[$.name==="triple"?"tentative":$.name]??this.boards.standup,this.screen.material.color.setScalar(0.6+Z*0.1);let q=Z9(U0(J,G?t(51,/^tentative/i):U,N)),X=w(H?0.4:-0.6,H?1.4:0.5,q),F=H?12:13;if(H)K.position.set(Math.sin(X)*F,w(7,4.5,q),Math.cos(X)*F),Q.set(0,1,0);else{let R=w(0.75,1.2,q);K.position.set(Math.sin(R)*F*0.8+1,w(4.5,3.6,q),Math.cos(R)*F*0.55),Q.set(-4.2,2.6,0)}}fabShot(J,$,Q,Z){let K=this.camera;this.fab.visible=!0,this.wafer.rotation.y=$*0.6,this.laser.material.opacity=0.5+Z*0.5,this.laser.scale.set(1+Z*2,1,1+Z*2),this.laser.position.set(Math.sin($*7)*2.5,0.2,Math.cos($*5)*2.5);let U=Math.floor(70*U0(J,t(30,/^seventy/i),t(30,/^dutch/i)+0.3)),H=J>=t(30,/^out/i),Y=new D0;for(let G=0;G<70;G++)this.machines.setColorAt(G,Y.copy(G<U&&!H?yH.clone().multiplyScalar(0.45):new D0(2106156)));if(this.machines.instanceColor)this.machines.instanceColor.needsUpdate=!0;let W=Z9(U0(J,L(29),L(31)));K.position.set(w(9,-6,W),w(9,14,W),w(12,26,W)),Q.set(w(0,-8,W),w(0.5,0,W),w(0,-10,W))}sunShot(J,$,Q){let Z=this.camera;this.sun.visible=!0;let K=U0(J,t(31,/^mind/i)-0.3,n0(32)),U=this.swarmDirs.length;for(let W=0;W<U;W++){let G=this.swarmDirs[W],N=B0(W*7)*0.9,q=Z9(U0(K,N,N+0.1));e0.position.copy(G).multiplyScalar(w(30,6.6,q)),e0.lookAt(0,0,0),e0.scale.setScalar(Math.max(0.001,q)),e0.updateMatrix(),this.swarm.setMatrixAt(W,e0.matrix)}this.swarm.instanceMatrix.needsUpdate=!0,this.swarm.rotation.y=J*0.15;let H=1-K*0.75;this.sunBall.material.color.setRGB(0.75*H,0.55*H,0.28*H),this.sunHalo.material.opacity=(0.35+Q*0.2)*H;let Y=w(-0.4,0.5,U0(J,L(31),L(33)));Z.position.set(Math.sin(Y)*40,6,Math.cos(Y)*40),$.set(0,0,0)}proteinShot(J,$){let Q=this.camera;this.protein.visible=!0;let Z=Z9(U0(J,t(35,/^fold/i),t(35,/^proteins/i)+0.6)),K=f7();this.coil.forEach((H,Y)=>{K.copy(H).lerp(this.helix[Y],Z),e0.position.copy(K),e0.rotation.set(0,0,0),e0.scale.setScalar(1),e0.updateMatrix(),this.beads.setMatrixAt(Y,e0.matrix)}),this.beads.instanceMatrix.needsUpdate=!0,this.beads.rotation.y=J*0.5,this.globe.visible=J>=t(35,/^climate/i)-0.1,this.globe.scale.setScalar(Math.max(0.001,w9(U0(J,t(35,/^climate/i)-0.1,t(35,/^climate/i)+0.3)))),this.globe.rotation.y=J*0.3;let U=Z9(U0(J,L(36),L(36)+0.8));this.protein.scale.setScalar(w(1,0.35,U)),Q.position.set(w(-2,0,U),w(9,3,U),w(22,24,U)),$.set(w(1,6,U),0,0)}render(){this.composer.render()}}var pE=(J)=>{let $=xH??=CQ();return $[$.indexOf(J)+1]?.at??_7()},NG=(J,$,Q,Z,K)=>a0($,$+Z,J)*(1-a0(Q-K,Q,J));var uE=/^(exponential|gain|steep|ceiling|go|shot|engine|jet|thrust|stall|out|ten|contain|vertical|demigod|sun|apocalypse|singularity's|steeper|terrified|doubling|comet's|nine's)$/,mE=/^(prius|tesla|linear|claude|phone|model|brain|plane|kernel|agents|terminal|proteins|climate|grid|euv|dutch|curve)$/,dE=/^(not|yet|no|waiting|you're|thirty|minutes|hands|off|ticket|committee|board|rollback|office|flat|stable|procurement|eighteen|months|compliance|soc|questionnaire|weeks|lawyer|consultancy|bonus|teams|inbox|pre-meeting|meeting|tentative|thursday|quorum|thrilled)$/,qG={title:"The Steep Part",fonts:['400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
  <div class="ov title" data-show="1.0|L0-0.15">The Steep Part</div>
  <div class="ov chip lane blink" data-show="L0+0.4|L1-0.1">⚠ lane assist · drift</div>
  <div class="ov chip auto" data-show="L1+0.1|L2-0.1">autopilot · hands off<big data-count="0,30" data-at="L1+0.1" data-until="E1" data-fmt="clock">00:00</big><em>strain 0%</em></div>
  <div class="ov phone" data-show="L4-0.05|L6-0.1">
    <div class="bub me" data-at="W4:model">model a jet engine</div>
    <div class="bub ai" data-at="W4:one">Done. <b>One shot.</b> Thrust curves and stall points below.</div>
    <div class="chart" data-at="W5:thrust-0.2"><small>thrust vs airspeed</small><svg viewBox="0 0 380 230">
      <path class="axis" d="M20 10 V210 H370"/>
      <path class="thrust draw" data-at="W5:thrust" data-until="W5:stall+0.2" d="M20 200 C 90 190, 130 40, 210 38 S 320 120, 360 190"/>
      <circle class="stall" data-at="W5:points" cx="70" cy="178" r="9"/><circle class="stall" data-at="W5:points+0.15" cx="330" cy="150" r="9"/></svg></div>
    <div class="bub ai" data-at="W5:is">Is that all you've got?</div>
  </div>
  <div class="ov chip rel" data-show="L8|L9-0.1">model releases · <span data-count="1,12" data-at="L8" data-until="E8">1</span> this year</div>
  <div class="ov term" data-show="L10|L11-0.05"><div class="bar">~/work · 40 agents</div>${Array.from({length:14},(J,$)=>`<div class="row" data-at="L10+${($*0.16).toFixed(2)}"><span class="ok">✓</span> agent-${String($*7%40+1).padStart(2,"0")} closed <b>TICKET-${4100+$*37}</b></div>`).join("")}
    <div class="row munch" data-at="W10:munch">\uD83E\uDD6A lunch: 1 bite</div></div>
  <div class="ov card roadmap" data-show="L11-0.05|L12-0.1"><div class="bar">Q3 roadmap</div>
    ${["auth rewrite","billing v2","mobile app","data platform","AI everything"].map((J,$)=>`<div class="gantt"><span>${J}</span><i class="fill" data-at="W11:roadmap+${($*0.12).toFixed(2)}" data-until="W11:roadmap+${(0.35+$*0.12).toFixed(2)}"></i></div>`).join("")}
    <div class="stamp green" data-at="W11:done">DONE</div>
    <div class="lunch">lunch <i class="fill" data-at="L11" data-until="E11+2"></i></div></div>
  <div class="ov stamp big" data-show="W13:end|L14-0.1" data-at="W13:end">END-OF-LIFE</div>
  <div class="ov card ticket" data-show="W15:file-0.2|L16-1.7">
    <div class="bar">SING-1 · new ticket</div>
    <h3>The singularity is here</h3>
    <dl><dt>Priority</dt><dd data-at="W15:file">Low</dd><dt>Sprint</dt><dd data-at="W15:talk">Next year</dd><dt>Assignee</dt><dd data-at="W15:year">Unassigned</dd></dl></div>
  <div class="ov term" data-show="L23|L24-0.05"><div class="bar">linux/ · rewrite</div>
    <div class="row type" data-at="L23">$ claude "rewrite the kernel"</div>
    <div class="row" data-at="W23:tested">tests <b data-count="0,4812" data-at="W23:tested" data-until="W23:signed">0</b> / 4,812 <span class="ok">✓</span></div>
    <div class="row" data-at="W23:signed">signed <span class="ok">✓</span></div>
    <div class="row" data-at="W23:complete">complete <span class="ok">✓</span></div></div>
  <div class="ov card grade" data-show="L24|L25-0.1"><div class="bar">AI rollout · graded like Office</div>
    <div class="row">seats <b data-count="1,3" data-at="W24:seat" data-until="E24">1</b> / 40,000</div>
    <div class="lunch">progress <i class="fill" data-at="W24:rolling" data-until="E24+4" style="--max:.02"></i></div>
    <div class="stamp" data-at="W24:pilot">PILOT PHASE</div></div>
  <div class="ov card cal" data-show="L27|W28:nine-0.2"><div class="bar">procurement</div>
    <big data-count="0,18" data-at="L27" data-until="W27:then" data-fmt="months">0 months</big>
    <div class="stamp green" data-at="W27:nod">APPROVED: v4</div></div>
  <div class="ov chip euv" data-show="L29|L31-0.1"><span data-at="W29:euv">EUV lithography</span> · <span data-at="W29:three">$300,000,000 each</span><br><span data-at="W30:seventy">70 a year</span> · <span data-at="W30:dutch">all Dutch</span></div>
  <div class="ov stamp big" data-show="W30:out|L31-0.1" data-at="W30:out">OUT OF STOCK</div>
  <div class="ov card soc" data-show="L32|L33-0.1"><div class="bar">SOC 2 vendor questionnaire · 412 questions</div>
    <div class="checks">${Array.from({length:96},(J,$)=>`<i data-at="W32:filled+${($*0.008).toFixed(3)}"></i>`).join("")}</div>
    <div class="row" data-at="W32:seconds">completed in <b>0.8 s</b></div>
    <div class="row red" data-at="W32:six">review ETA: <b>6 weeks</b></div></div>
  <div class="ov card org" data-show="L33|L34-0.05"><div class="bar">org chart</div>
    <div class="node" data-at="L33">V-P</div><div class="node" data-at="W33:committee">committee</div>
    <div class="pair"><div class="node" data-at="W33:lawyer">lawyer</div><div class="node" data-at="W33:consultancy">consultancy</div></div></div>
  <div class="ov card inbox" data-show="L36|L37-1.2"><div class="bar">the use case</div>
    <div class="bub me" data-at="W36:summarize">Summarize this Teams thread.</div>
    <div class="bub me" data-at="W36:sort">Sort my inbox.</div>
    <div class="bub ai" data-at="W36:so">Done. <b>Inbox 0.</b></div></div>`,endAt:()=>n0(53)+2.4,words:{hot:uE,ice:mE,gold:dE},hud:(J,$)=>{let Q=Math.floor(W$(J)/4);return{left:`the steep part &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`doublings <span class="ice">${Q}</span> &nbsp;·&nbsp; compute <b>×2<sup>${Q}</sup></b>`}},shots:CQ,shotAt:ZK,world:(J)=>{let $=new hH(J);return{update:(Q)=>$.update(Q),render:()=>$.render(),flash:(Q)=>Math.min(0.9,$.flash(Q))*(Q>=$J()&&Q<$J()+1?0.8:0.6),fade:(Q)=>$.fade(Q),scene:$.scene,camera:$.camera}}};var j9=(J,$,Q,Z)=>({name:J,at:$,label:Q,section:Z}),FG=(J,$)=>[j9("here",L(J)-0.3,"data here, data there",$),j9("crates",L(J+2)-0.2,"databricks, dataiku, sap",$),j9("kevin",L(J+4)-0.2,"the app kevin built",$),j9("plant",L(J+5)-0.2,"the plant",$),j9("nobody",L(J+6)-0.2,"nobody knows",$),j9("finale",L(J+8)-0.2,"data, data everywhere",$)];function HK(){return[j9("overture",0,"team! big news!","intro"),j9("curtain",L(1)-0.3,"we're gonna AI","intro"),j9("kickline",L(2)-0.4,"it's gonna fix everything","verse 1"),j9("pitch",L(4)-0.2,"give us all your data","verse 1"),j9("vendor",L(6)-0.2,"the vendor rolled in","pre-chorus"),j9("where",L(8)-0.15,"where's the data?","pre-chorus"),j9("quiet",L(9)-0.2,"here's the thing","pre-chorus"),...FG(11,"chorus"),j9("chain",L(21)-0.6,"ask denise","verse 2"),j9("tickets",L(27)-0.2,"three ticket systems","pre-chorus"),j9("meeting",L(29)-0.2,"fourteen people","pre-chorus"),...FG(35,"chorus"),j9("closet",L(45)-0.6,"a server by the press","verse 3"),j9("cloud",L(47)-0.2,"just sync it up to azure","verse 3"),j9("xp",L(49)-0.2,"windows xp","verse 3"),j9("truths",L(51)-0.5,"nine sources of truth","bridge"),j9("swamp",L(52)-0.2,"the data lake's a swamp","bridge"),j9("raci",L(53)-0.2,"a raci for the raci","bridge"),j9("stan",L(54)-0.2,"ask stan","bridge"),j9("pilot",L(55)-0.2,"the pilot's in a pilot","bridge"),j9("oil",L(56)-0.2,"data is the new oil","bridge"),j9("call",L(59)-0.3,"can everyone see my screen?","breakdown"),j9("curtain",L(66)-0.5,"we're gonna AI (key change)","final chorus"),j9("agents",L(68)-0.2,"agents running everything","final chorus"),j9("lock",t(69,/^kidding/i)-0.3,"kidding. nobody knows how.","final chorus"),j9("crates",L(70)-0.2,"databricks, dataiku, sap","final chorus"),j9("confluence",L(72)-0.2,"only with the direct link","final chorus"),j9("github",L(73)-0.2,"everywhere but github","final chorus"),j9("nobody",L(74)-0.2,"where's the data?","final chorus"),j9("finale",L(77)-0.2,"data, data... everywhere","final chorus"),j9("curtaincall",L(79)-0.5,"a recurring meeting","outro"),j9("end",n0(82)+0.2,"the end","outro")]}var RG=null,UK=(J)=>{let $=RG??=HK(),Q=$[0];for(let Z of $)if(Z.at<=J)Q=Z;return Q},lE=(J)=>{let $=RG??=HK();return $[$.indexOf(J)+1]?.at??_7()},cE=9049124,gH=14263361;var DG=1714778,nE={overture:2361364,curtain:2767514,kickline:2767514,pitch:3811978,vendor:9067028,where:328968,quiet:328968,here:8002122,crates:1723002,kevin:2775610,plant:3815978,nobody:4856346,finale:8002122,chain:2763354,tickets:4864538,meeting:1714746,closet:1316884,cloud:2775712,xp:1723040,truths:3807834,swamp:1718820,raci:2763322,stan:328968,pilot:5929648,oil:2759178,call:658452,agents:1718874,lock:4856346,confluence:1718906,github:1052692,curtaincall:3807780,end:328968},EG=new Map,X7=(J,$=0.7,Q=0)=>{let Z=`${J}:${$}:${Q}`,K=EG.get(Z);if(!K)EG.set(Z,K=new F9({color:J,roughness:$,metalness:0,emissive:Q?J:0,emissiveIntensity:Q}));return K},y9=(J,$,Q=0,Z=0,K=0)=>{let U=new h(J,$);return U.position.set(Q,Z,K),U.castShadow=!0,U.receiveShadow=!0,U},s9=(J,$,Q,Z,K=0,U=0,H=0)=>y9(new I0(J,$,Q),X7(Z),K,U,H);function lJ(J,$,Q){let Z=document.createElement("canvas");Z.width=J,Z.height=$,Q(Z.getContext("2d"));let K=new D7(Z);return K.colorSpace=V7,K.anisotropy=4,K}function z8(J,$,Q,Z={}){let K=lJ(Math.round($*160),Math.round(Q*160),(U)=>{let H=U.canvas.width,Y=U.canvas.height;U.fillStyle=Z.bg??"#f3ead2",U.fillRect(0,0,H,Y),U.strokeStyle=Z.fg??"#1d1a22",U.lineWidth=Y*0.05,U.strokeRect(Y*0.04,Y*0.04,H-Y*0.08,Y-Y*0.08),U.fillStyle=Z.fg??"#1d1a22",U.textAlign="center",U.textBaseline="middle";let W=Y*(Z.sub?0.4:0.5);U.font=`${Z.font??"900"} ${W}px "DM Serif Display", Georgia, serif`;while(U.measureText(J).width>H*0.88)W*=0.92,U.font=`${Z.font??"900"} ${W}px "DM Serif Display", Georgia, serif`;if(U.fillText(J,H/2,Z.sub?Y*0.4:Y/2),Z.sub)U.font=`600 ${Y*0.17}px "JetBrains Mono", monospace`,U.fillText(Z.sub,H/2,Y*0.74)});return y9(new t0($,Q),new F9({map:K,roughness:0.8}))}var W8=new v9,W9=(J=0,$=0,Q=0)=>new v(J,$,Q),iE=W9(0,1,0),sE=new w0(0.075,0.085,1,8).translate(0,0.5,0),oE=new w0(0.11,0.09,0.95,10).translate(0,-0.475,0);function I6(J){let $=new H0,Q=J.robot?10134445:[15254688,13012578,9263675,15782582,7029808][Math.floor(B0(J.seed)*5)],Z=J.pants??2763316;if($.add(y9(new w0(0.27,0.24,0.72,14),X7(J.shirt),0,1.3,0)),$.add(y9(new w0(0.25,0.27,0.22,14),X7(Z),0,0.92,0)),J.tie)$.add(s9(0.08,0.42,0.03,J.tie,0,1.38,0.27));let K=J.robot?s9(0.42,0.4,0.4,Q,0,1.9,0):y9(new p0(0.21,16,12),X7(Q),0,1.88,0);if(J.robot)K.add(y9(new I0(0.28,0.07,0.02),X7(8057087,0.4,1.5),0,0.02,0.21));if(J.hat)K.add(y9(new p0(0.23,14,8,0,Math.PI*2,0,Math.PI/2),X7(J.hat),0,0.05,0));$.add(K);let U=[-1,1].map((W)=>{let G=new h(oE,X7(Z));return G.position.set(W*0.12,0.95,0),G.castShadow=!0,G.add(y9(new I0(0.14,0.08,0.3),X7(1381402),0,-0.93,0.06)),$.add(G),G}),H=[-1,1].map(()=>{let W=y9(new p0(0.075,10,8),X7(Q));return $.add(W),W}),Y=[0,1].map(()=>{let W=new h(sE,X7(J.shirt));return W.castShadow=!0,$.add(W),W});return Object.assign($.userData,{head:K,hands:H,arms:Y,legs:U,seed:J.seed}),$}var aE={down:[0.34,0.95,0.12],up:[0.42,2.45,0.05],jazz:[0.72,2,0.3],shrug:[0.62,1.42,0.42],point:[0.3,1.75,0.85],out:[0.95,1.6,0.1],face:[0.16,1.82,0.32]};function G8(J,$,Q,Z=0,K=0,U=0.04,H){let{hands:Y,arms:W,legs:G,seed:N,head:q}=J.userData;J.rotation.z=Math.sin($*Math.PI*2.2+N)*U,q.rotation.x=Q==="face"?0.35:0,Y.forEach((X,F)=>{let R=F?1:-1,[M,D,E]=aE[F&&H?H:Q];X.position.set(R*M,D+(Q==="jazz"?Math.sin($*30+F)*0.03:0),E);let I=W9(R*0.26,1.6,0.02),C=X.position.clone().sub(I);W[F].position.copy(I),W[F].quaternion.setFromUnitVectors(iE,C.clone().normalize()),W[F].scale.set(1,C.length(),1)}),G.forEach((X,F)=>{X.rotation.x=F===K?-Z*1.45:Z*0.1})}var KK=[{name:"Databricks",word:/^databricks/i,color:"#d8452f"},{name:"Dataiku",word:/^dataiku/i,color:"#2ab1ac"},{name:"SAP",word:/^sap$/i,color:"#1a6fd1"},{name:"S3",word:/^s3/i,color:"#d88a1a"},{name:"Redshift",word:/^redshift/i,color:"#8c4fd1"},{name:"Azure",word:/^azure/i,color:"#2a86e0"},{name:"ServiceNow",word:/^servicenow/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^\W*times/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^three/i,color:"#3f9a4a"}],OG=[{label:"My boss",word:/^boss/i},{label:"Denise",word:/^denise/i},{label:"Platform team",word:/^platform/i},{label:"#data-access",word:/^slack/i},{label:"Gary (OOO)",word:/^gary/i},{label:"A guy who knows a guy",word:/^guy$/i}];class pH{renderer;scene=new i7;camera=new Z7(45,1.7777777777777777,0.1,400);composer;bloom;wash=new U8(16771272,2758672,0.5);key=new a7(16773336,0.6);spots=[];cyc;stage=new H0;curtains=[];bulbs;marquee=new H0;marqueeBulbs;marqueeBulbPos=[];seats;lead;vendorGuy;cio;line=[];deck;decks={};crates=[];github=new H0;kevin=new H0;plant=new H0;chain=[];booths=[];meeting=new H0;clockHand;closet=new H0;fan;xpScreen;cloud=new H0;plantGuy;agents=[];padlock=new H0;door=new H0;swamp;floor;tomb;planes=[];barrels=new H0;stanSign;confetti;constructor(J){this.renderer=new E8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=gJ,this.renderer.toneMapping=k8,this.scene.background=new D0(328711),this.composer=new BJ(this.renderer),this.composer.addPass(new zJ(this.scene,this.camera)),this.bloom=new g8(new q0(1920,1080),0.55,0.5,0.82),this.composer.addPass(this.bloom),this.composer.addPass(new IJ),this.key.position.set(0,18,20),this.scene.add(this.wash,this.key),this.buildStage(),this.buildPeople(),this.buildProps(),this.scene.add(this.stage)}buildStage(){let J=this.stage,$=lJ(1024,512,(W)=>{for(let G=0;G<32;G++){W.fillStyle=`hsl(28, ${38+B0(G)*10}%, ${22+B0(G+4)*8}%)`,W.fillRect(0,G*16,1024,15),W.fillStyle="rgba(0,0,0,.35)",W.fillRect(0,G*16+15,1024,1);for(let N=0;N<3;N++)W.fillRect(B0(G*5+N)*1024,G*16,2,15)}});$.wrapS=$.wrapT=a8,$.repeat.set(2,2);let Q=y9(new I0(30,1,14),new F9({map:$,roughness:0.55}),0,-0.5,-2.5);Object.assign(Q,{name:"floor",userData:{solid:"stage"}}),this.floor=Q,J.add(Q),this.cyc=new h(new t0(34,18),new p9({uniforms:{color:{value:new D0(DG)},glow:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 color; uniform float glow; varying vec2 vUv;
        void main() { float g = smoothstep(0.0, 0.55, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y)) * 0.9 + 0.1;
          float h = exp(-pow((vUv.y - 0.12) * 5.0, 2.0)) * 0.8;
          gl_FragColor = vec4(color * (g + h) * glow, 1.0); }`})),this.cyc.position.set(0,7.5,-8.2),J.add(this.cyc);let Z=new F9({color:gH,roughness:0.35,metalness:0.7});for(let W of[-12.4,12.4])J.add(y9(new I0(1.4,14,1),Z,W,6.5,4.9));J.add(y9(new I0(26.2,1.6,1),Z,0,13.3,4.9)),J.add(s9(24,2.2,0.2,789008,0,11.6,4.4));let K=new t0(12,12.6,48,1),U=K.attributes.position;for(let W=0;W<U.count;W++)U.setZ(W,Math.sin(U.getX(W)*4.2)*0.18);K.computeVertexNormals();let H=new F9({color:cE,roughness:0.8,side:d9});for(let W of[-1,1]){let G=y9(K,H,W*6,6.3,4.3);this.curtains.push(G),J.add(G);let N=y9(K,H,W*13.5,6.3,3.6);N.scale.x=0.35,J.add(N)}this.bulbs=new f9(new p0(0.09,10,8),new C0({color:16767120}),40);for(let W=0;W<40;W++)W8.position.set(-11.5+W*0.59,0.08,4.2),W8.updateMatrix(),this.bulbs.setMatrixAt(W,W8.matrix);J.add(this.bulbs,s9(24,0.18,0.4,1708556,0,0,4.35)),this.seats=new f9(new I0(0.62,0.95,0.6),X7(5901336),220);let Y=0;for(let W=0;W<10;W++)for(let G=0;G<22;G++)W8.position.set(-11+G*1.05,0+W*0.32-0.6,8+W*1.2),W8.updateMatrix(),this.seats.setMatrixAt(Y++,W8.matrix);J.add(this.seats);for(let[W,G,N]of[[-9,16,18],[9,16,18],[0,18,16]]){let q=new Z$(16774368,0,60,0.16,0.45,1.2);q.position.set(W,G,N),q.castShadow=!0,q.shadow.mapSize.set(1024,1024),q.shadow.bias=-0.0005,this.scene.add(q,q.target);let X=new h(new w0(0.05,1,1,24,1,!0).translate(0,-0.5,0),new C0({color:16773328,transparent:!0,opacity:0.06,blending:M7,depthWrite:!1,side:d9}));this.scene.add(X),this.spots.push({light:q,beam:X})}}buildPeople(){this.lead=I6({shirt:2771594,pants:1844280,tie:13120058,seed:3}),this.vendorGuy=I6({shirt:13148240,pants:9071146,tie:1710618,seed:8}),this.cio=I6({shirt:3816004,pants:2236970,tie:6982351,seed:11}),this.plantGuy=I6({shirt:5925498,pants:2767450,seed:14,hat:15777824});let J=[15262938,9089240,14196904,12114080,15257744,12626144,15790320,9488584];for(let $=0;$<8;$++)this.line.push(I6({shirt:J[$],tie:$%2?2763370:void 0,seed:20+$}));for(let $=0;$<3;$++)this.agents.push(I6({shirt:10134445,pants:6976381,seed:40+$,robot:!0}));for(let $ of[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents])this.stage.add($)}buildProps(){let J=this.stage,$=lJ(1600,400,(O)=>{O.fillStyle="#1a0f08",O.fillRect(0,0,1600,400),O.fillStyle="#ffe9b0",O.textAlign="center",O.textBaseline="middle";let B=210;O.font=`400 ${B}px "Limelight", "DM Serif Display", serif`;while(O.measureText("WE'RE GONNA AI!").width>1440)B-=6,O.font=`400 ${B}px "Limelight", "DM Serif Display", serif`;O.fillText("WE'RE GONNA AI!",800,212)});this.marquee.add(y9(new I0(16.4,4.4,0.4),X7(2759184)));let Q=new h(new t0(15.6,3.9),new F9({map:$,emissive:16777215,emissiveMap:$,emissiveIntensity:0.55}));Q.position.z=0.21,this.marquee.add(Q);for(let O=0;O<64;O++){let A=O/64*40.4,V=0,z=0;if(A<16)V=-8+A,z=2.1;else if((A-=16)<4.2)V=8,z=2.1-A;else if((A-=4.2)<16)V=8-A,z=-2.1;else A-=16,V=-8,z=-2.1+A;this.marqueeBulbPos.push(W9(V,z,0.3))}this.marqueeBulbs=new f9(new p0(0.13,10,8),new C0({color:16777215}),64),this.marqueeBulbPos.forEach((O,B)=>{W8.position.copy(O),W8.updateMatrix(),this.marqueeBulbs.setMatrixAt(B,W8.matrix)}),this.marquee.add(this.marqueeBulbs);for(let O of[-6,6])this.marquee.add(y9(new w0(0.02,0.02,10),X7(8947848),O,7.2,0));J.add(this.marquee),this.deck=new h(new t0(9,5.06),new F9({color:16777215,emissive:16777215,emissiveIntensity:0.22})),this.deck.position.set(2.5,5.2,-6.5),J.add(this.deck);let Z=(O,B,_,A)=>lJ(1280,720,(V)=>{V.fillStyle=_,V.fillRect(0,0,1280,720),V.fillStyle=A,V.textAlign="center",V.font='900 120px "DM Serif Display", Georgia, serif',V.fillText(O,640,330),V.font='600 46px "JetBrains Mono", monospace',V.fillText(B,640,450)});this.decks={vendor:Z("Live by Q3!","AI that fixes everything™","#f6f1e4","#1a3a8a"),pilot:Z("Demo: ✓ crushed it","now with your data…","#f6f1e4","#1a6a3a"),tears:Z("ERROR","null · null · null · NaN","#2a0a0e","#ff6a6a"),oil:Z("Data is the new oil!","every deck, every quarter","#141010","#f0c060")};let K=(O,B)=>lJ(512,512,(_)=>{_.fillStyle="#b08a58",_.fillRect(0,0,512,512),_.fillStyle="rgba(60,40,20,.5)";for(let V=0;V<6;V++)_.fillRect(0,V*86,512,6);_.strokeStyle="#6a4a28",_.lineWidth=26,_.strokeRect(13,13,486,486),_.beginPath(),_.moveTo(26,26),_.lineTo(486,486),_.stroke(),_.fillStyle=B,_.fillRect(40,186,432,140),_.fillStyle="#fff",_.textAlign="center",_.textBaseline="middle";let A=84;_.font=`900 ${A}px "DM Serif Display", Georgia, serif`;while(_.measureText(O).width>400)A-=4,_.font=`900 ${A}px "DM Serif Display", Georgia, serif`;_.fillText(O,256,258)});KK.forEach((O,B)=>{let _=new H0,A=K(O.name,O.color),V=y9(new I0(1.9,1.9,1.9),new F9({map:A,roughness:0.8}),0,0.95,0);V.userData.solid="stage",_.name=KK.slice(0,B).some((z)=>z.name===O.name)?`${O.name} ${B-5}`:O.name,_.add(V),_.userData.home=B<6?W9([-9.5,-6.6,-3.7,3.7,6.6,9.5][B],0,[-4.8,-3.6,-5.2,-5.2,-3.6,-4.8][B]):W9(9.1,(B-6)*1.9,-2),_.rotation.y=(B0(B)-0.5)*0.4,this.crates.push(_),J.add(_)});let U=new b8(new e6(new I0(1.9,1.9,1.9)),new hZ({color:16777215,dashSize:0.18,gapSize:0.12}));U.computeLineDistances(),U.position.y=0.95;let H=z8("GitHub",1.9,0.6,{bg:"#101014",fg:"#f0f0f0"});H.position.set(0,2.3,0),this.github.add(U,H),J.add(this.github);let Y=lJ(640,480,(O)=>{O.fillStyle="#0a0aa0",O.fillRect(0,0,640,480),O.fillStyle="#c0c0c0",O.fillRect(40,40,560,400),O.fillStyle="#000080",O.fillRect(40,40,560,44),O.fillStyle="#fff",O.font='700 30px "JetBrains Mono", monospace',O.fillText("KevinSoft Data Manager 2003",56,72),O.fillStyle="#000",O.font='600 26px "JetBrains Mono", monospace',["Records: 41,207","Last backup: 2009","Password: kevin1","Do not close!!"].forEach((B,_)=>O.fillText(B,70,150+_*60))});this.kevin.add(s9(3,0.15,1.6,6965802,0,1.4,0),s9(0.12,1.4,0.12,3811866,-1.3,0.7,0),s9(0.12,1.4,0.12,3811866,1.3,0.7,0)),this.kevin.add(s9(1.8,1.5,1.6,14208944,0,2.3,-0.1));let W=y9(new t0(1.5,1.12),new F9({map:Y,emissive:16777215,emissiveMap:Y,emissiveIntensity:0.35}),0,2.35,0.71);this.kevin.add(W,s9(1.6,0.08,0.6,14208944,0,1.52,0.5));let G=z8("Kevin's app",2.4,0.6,{sub:"built 2003 · Kevin left 2011"});G.position.set(0,3.7,0),this.kevin.add(G),J.add(this.kevin);let N=new K8([W9(-6,0),W9(-6,3),W9(-4,4.2),W9(-4,3),W9(-2,4.2),W9(-2,3),W9(0,4.2),W9(0,3),W9(6,3),W9(6,0)].map((O)=>new q0(O.x,O.y)));this.plant.add(y9(new B8(N,{depth:0.3,bevelEnabled:!1}),X7(4868690))),this.plant.add(y9(new w0(0.4,0.55,6,14),X7(5913138),3.8,5.5,0.15));let q=z8("THE PLANT",4,1,{sub:"bandwidth: 0.3 Mbps (on a good day)",bg:"#f0e6c0"});q.position.set(0.5,1.7,0.34),this.plant.add(q);for(let O=0;O<4;O++)this.plant.add(y9(new t0(0.8,0.6),X7(16765040,0.5,1.2),-4.6+O*1.6,1.6,0.32));this.plant.position.set(0,0,-6.6),J.add(this.plant),OG.forEach((O,B)=>{let _=new H0,A=B===4?null:I6({shirt:[3816004,12081786,4880986,10134445,0,9071178][B],seed:60+B,robot:B===3,tie:B===0?9050650:void 0});if(A)_.add(A);if(B===4)_.add(s9(0.8,0.08,0.8,3816004,0,0.9,0),s9(0.8,0.9,0.08,3816004,0,1.35,-0.38),s9(0.06,0.9,0.06,2236962,0,0.45,0));let V=z8(O.label,2.2,0.55,{bg:B===4?"#ffe9a0":"#f3ead2"});V.position.set(0,2.75,0),_.add(V),_.position.set(-9+B*3.6,0,-2.4+B%2*1.1),this.chain.push({group:_,who:A}),J.add(_)}),[["RESOLVED","#2f8a4a"],["DUPLICATE","#6a6a74"],["SEE TICKET 3","#c88a1a"]].forEach(([O,B],_)=>{let A=new H0;A.add(s9(2.4,2.2,1.4,2763316,0,1.1,0),s9(2.6,0.12,1.6,4868692,0,2.26,0));let V=z8(O,2.4,0.7,{bg:B,fg:"#ffffff"});V.position.set(0,1.4,0.71);let z=new h(new p0(0.3,16,12),new F9({color:new D0(B),emissive:new D0(B),emissiveIntensity:0}));z.position.set(0,2.7,0);let y=z8(`Ticket system #${_+1}`,2.4,0.45,{bg:"#f3ead2"});y.position.set(0,3.4,0),A.add(V,z,y),A.position.set(-6+_*6,0,-3),this.booths.push({group:A,lamp:z}),J.add(A)}),this.meeting.add(s9(12,0.15,2.2,5913124,0,1.25,-2.5));for(let O=0;O<14;O++){let B=-5.5+O%7*1.85,_=O<7?-3.9:-1.1;this.meeting.add(s9(0.7,0.08,0.7,2302764,B,0.8,_),s9(0.7,0.9,0.08,2302764,B,1.25,_+(O<7?-0.35:0.35)))}let X=lJ(256,256,(O)=>{O.fillStyle="#f6f1e4",O.beginPath(),O.arc(128,128,124,0,Math.PI*2),O.fill(),O.fillStyle="#1d1a22";for(let B=0;B<12;B++){let _=B/12*Math.PI*2;O.fillRect(128+Math.sin(_)*100-4,128-Math.cos(_)*100-10,8,20)}}),F=y9(new C7(1.1,40),new F9({map:X}),0,7.5,-7.8);this.clockHand=s9(0.08,0.9,0.04,1907234,0,7.5,-7.75),this.clockHand.geometry.translate(0,0.4,0),this.meeting.add(F,this.clockHand),J.add(this.meeting),this.closet.add(s9(0.2,7,6,5921354,-3.2,3.5,-3),s9(0.2,7,6,5921354,3.2,3.5,-3),s9(6.6,7,0.2,4868670,0,3.5,-6)),this.closet.add(s9(1.4,3,1.8,2763312,-1.2,1.5,-4.2));for(let O=0;O<6;O++)this.closet.add(y9(new p0(0.05),X7(O%2?4259680:16752672,0.5,2),-1.6+O%3*0.2,2.6-Math.floor(O/3)*0.2,-3.28));this.closet.add(s9(1.8,0.1,1.2,6965802,1.4,1.2,-4.4),s9(0.1,1.2,0.1,3811866,0.6,0.6,-4.4),s9(0.1,1.2,0.1,3811866,2.2,0.6,-4.4)),this.closet.add(s9(1.5,1.2,1.2,14208944,1.4,1.85,-4.6));let R=lJ(640,480,(O)=>{let B=O.createLinearGradient(0,0,0,300);B.addColorStop(0,"#2a6ae0"),B.addColorStop(1,"#a8d0f8"),O.fillStyle=B,O.fillRect(0,0,640,480),O.fillStyle="#4aa83a",O.beginPath(),O.moveTo(0,330),O.quadraticCurveTo(300,200,640,300),O.lineTo(640,480),O.lineTo(0,480),O.fill(),O.fillStyle="#245ed8",O.fillRect(0,440,640,40),O.fillStyle="#3a9a3a",O.fillRect(0,440,120,40),O.fillStyle="#fff",O.font='italic 700 26px "Inter", sans-serif',O.fillText("start",28,469),O.fillStyle="#f6f1e4",O.fillRect(150,120,340,150),O.fillStyle="#0a246a",O.fillRect(150,120,340,34),O.fillStyle="#fff",O.font='700 20px "Inter", sans-serif',O.fillText("Windows XP · Service Pack 2",160,144),O.fillStyle="#000",O.font='500 20px "Inter", sans-serif',O.fillText("Uptime: 4,211 days",170,200),O.fillText("Updates available: 1,906",170,235)});this.xpScreen=y9(new t0(1.3,0.98),new F9({map:R,emissive:16777215,emissiveMap:R,emissiveIntensity:0.4}),1.4,1.88,-3.99),this.closet.add(this.xpScreen),this.fan=new H0,this.fan.add(y9(new Y7(0.7,0.07,8,32),X7(14211280)));for(let O=0;O<4;O++){let B=s9(0.32,0.55,0.03,9089240,0,0.3,0);B.geometry.translate(0,0,0);let _=new H0;_.add(B),_.rotation.z=O*Math.PI/2,this.fan.add(_)}this.fan.position.set(-1.2,3.8,-4.2),this.closet.add(this.fan);let M=z8("DO NOT UNPLUG",0.9,0.7,{bg:"#ffe55a",sub:"— Jess"});M.position.set(-1.2,2.2,-3.29),this.closet.add(M),J.add(this.closet);for(let O=0;O<7;O++)this.cloud.add(y9(new p0(0.9+B0(O)*0.6,18,14),X7(16054010),-2.4+O*0.8,Math.sin(O*1.3)*0.4,B0(O+3)*0.6));let D=z8("AZURE",2.6,0.7,{bg:"#2a86e0",fg:"#fff"});D.position.set(0,-1.4,1.2),this.cloud.add(D,y9(new w0(0.02,0.02,8),X7(10127978),0,-5,0)),J.add(this.cloud),this.padlock.add(y9(new Y7(1.1,0.22,12,32,Math.PI),new F9({color:11579576,metalness:0.8,roughness:0.3}),0,1.6,0)),this.padlock.add(y9(new I0(3,2.4,0.9),new F9({color:gH,metalness:0.7,roughness:0.35}),0,0.4,0)),this.padlock.add(y9(new w0(0.22,0.22,0.95,16),X7(1710618),0,0.5,0.05).rotateX(Math.PI/2)),J.add(this.padlock),this.door.add(s9(3,5.6,0.3,3811866,0,2.8,0),s9(2.4,5,0.2,2775720,0,2.6,0.12));let E=z8("Confluence",2.6,0.7,{bg:"#f3ead2"});E.position.set(0,5.9,0.2);let I=z8("direct link only",2.2,0.5,{bg:"#ffe9a0"});I.position.set(0,2.9,0.26),this.door.add(E,I,y9(new p0(0.14),new F9({color:gH,metalness:0.8,roughness:0.3}),0.9,2.5,0.3)),J.add(this.door),this.swamp=y9(new C7(7,48),new F9({color:3824170,roughness:0.25,metalness:0.1}),0,0.03,-2.5),this.swamp.rotation.x=-Math.PI/2,J.add(this.swamp),this.tomb=new H0,this.tomb.add(y9(new w0(0.9,0.9,0.3,24,1,!1,0,Math.PI),X7(9079440),0,2.1,0).rotateX(Math.PI/2),s9(1.8,2.1,0.3,9079440,0,1.05,0));let C=z8("RIP CRM",1.5,0.9,{bg:"#8a8a90",sub:"2009–2021"});C.position.set(0,1.3,0.16),this.tomb.add(C),J.add(this.tomb);for(let O=0;O<2;O++){let B=new H0,_=O?0.45:1;B.add(y9(new g9(0.9*_,3*_,3),X7(O?15782016:16183780)).rotateX(-Math.PI/2).rotateZ(Math.PI/2)),this.planes.push(B),J.add(B)}for(let O=0;O<9;O++)this.barrels.add(y9(new w0(0.6,0.6,1.6,20),X7(1710618,0.4),-8+O*2,0.8,-3+O%2*1.2));J.add(this.barrels),this.stanSign=z8("STAN?",1.6,0.6,{bg:"#f3ead2"}),J.add(this.stanSign),this.confetti=new f9(new t0(0.16,0.1),new C0({color:16777215,side:d9}),400);for(let O=0;O<400;O++)this.confetti.setColorAt(O,new D0([16765024,16734858,5943551,8056954,16777215][O%5]));J.add(this.confetti)}flash(J){let $=UK(J);return $.name==="here"||$.name==="finale"?Math.exp(-(J-$.at)*8)*0.25:0}fade(J){return a0(_7()-0.8,_7(),J)}update(J){let $=UK(J),Q=$.name,Z=$.at,K=lE($),U=U0(J,Z,K),H=J-Z,Y=this.camera,W=W9(0,3,0),G=r7(J),N=W$(J),q=new Set,X=(_,A)=>{_.visible=A},F=new D0(nE[Q]??DG);this.cyc.material.uniforms.color.value.copy(F),this.cyc.material.uniforms.glow.value=1+G*0.25;let R=Q==="where"||Q==="quiet"||Q==="stan"||Q==="call"||Q==="github"||Q==="end";this.wash.intensity=R?0.05:Q==="closet"||Q==="xp"?0.25:0.55,this.key.intensity=R?0:0.5;for(let _=0;_<40;_++)this.bulbs.setColorAt(_,new D0(R?3811860:16767120));if(this.bulbs.instanceColor)this.bulbs.instanceColor.needsUpdate=!0;let M=Q==="overture"?0:Q==="curtain"&&Z<10?Z9(U0(J,Z,Z+1.6)):Q==="curtaincall"?1-p8(U0(J,L(80),n0(82))):Q==="end"?0:1;this.curtains.forEach((_,A)=>{let V=A?1:-1;_.scale.x=w(1,0.28,M),_.position.x=V*w(6,10.8,M)});let D=[null,null,null],E=[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents];for(let _ of E)_.visible=!1;for(let _ of[this.marquee,this.deck,this.github,this.kevin,this.plant,this.meeting,this.closet,this.cloud,this.padlock,this.door,this.swamp,this.tomb,this.barrels,this.stanSign,this.confetti,...this.planes])_.visible=!1;for(let _ of this.crates)_.visible=!1;this.floor.userData.solid="stage";for(let _ of this.chain)_.group.visible=!1;for(let _ of this.booths)_.group.visible=!1;let I=(_)=>{let A=(J-0.433)/O8()-_*0.12,V=Math.floor(A),z=A-V;return{amount:Math.sin(L9(z)*Math.PI)*0.95,leg:(V+_)%2}},C=(_=0,A=-1.5,V="jazz")=>{this.line.forEach((z,y)=>{z.visible=!0,z.position.set(-8.4+y*2.4,_,A),z.rotation.y=0;let k=I(y);G8(z,J,V,k.amount,k.leg,0.02)})},O=(_,A,V,z=0.05)=>{this.lead.visible=!0,this.lead.position.set(_,0,A),this.lead.rotation.y=0,G8(this.lead,J,V,0,0,z)},B=rE(J);switch(Q){case"overture":{O(0,3.2,H>1.2?"jazz":"out"),D[2]=W9(0,1.6,3.2),Y.position.set(0,w(2.6,2.3,U),w(14,10.5,U)),W.set(0,2.6,3);break}case"curtain":{let _=Z>100;if(this.marquee.visible=!0,this.marquee.position.set(0,w(16,8.6,w9(U0(J,Z+0.2,Z+1.4))),-4),this.marqueeBulbPos.forEach((A,V)=>this.marqueeBulbs.setColorAt(V,new D0((V+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;if(C(),O(0,2.2,"up"),D[0]=W9(-4,1,-1.5),D[1]=W9(4,1,-1.5),D[2]=W9(0,1.6,2.2),_)this.confettiAt(J,Z);Y.position.set(0,w(4,5,U),w(20,17,U)),W.set(0,5,0),Y.fov=46;break}case"kickline":{if(this.marquee.visible=!0,this.marquee.position.set(0,8.6,-4),this.marqueeBulbPos.forEach((_,A)=>this.marqueeBulbs.setColorAt(A,new D0((A+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;C(),O(0,2.2,G>0.5?"up":"jazz"),D[0]=W9(-4,1,-1.5),D[1]=W9(4,1,-1.5),D[2]=W9(0,1.6,2.2),Y.position.set(w(-11,11,U),1,5.5),W.set(w(-6,6,U),1.4,-1.5),Y.fov=50;break}case"pitch":{C(0,-2.6,"out"),O(0,2,J>L(5)?"out":"point"),D[2]=W9(0,1.6,2),Y.position.set(w(1.5,0.5,U),2.4,w(9.5,7.5,U)),W.set(0,2.1,1),Y.fov=40;break}case"vendor":{this.deck.visible=!0,this.deck.material.map=this.decks.vendor,this.deck.material.emissiveMap=this.decks.vendor,this.deck.material.needsUpdate=!0,this.vendorGuy.visible=!0,this.vendorGuy.position.set(w(-12,-2,Z9(U0(J,Z,Z+1.5))),0,0.5),this.vendorGuy.rotation.y=0.3,G8(this.vendorGuy,J,J>t(7,/^q3/i)?"jazz":"point",0,0,0.06),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=-0.6,G8(this.cio,J,"down"),D[0]=this.vendorGuy.position.clone().setY(1.6),D[1]=W9(2.5,4,-6.5),Y.position.set(w(-3,0,U),3,11),W.set(0,3,-2);break}case"where":case"quiet":{if(this.vendorGuy.visible=!0,this.vendorGuy.position.set(-2,0,0.5),G8(this.vendorGuy,J,"shrug",0,0,0),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=Q==="quiet"?-0.2:-0.6,G8(this.cio,J,Q==="quiet"&&J>t(10,/^thing/i)-1?"shrug":"down",0,0,0),D[2]=Q==="where"?W9(-2,1.6,0.5):W9(5.5,1.6,1.5),Q==="where")Y.position.set(-2,2.2,7),W.set(-2,2,0.5),Y.fov=34;else Y.position.set(w(3.2,4.2,U),2.1,w(7.5,5.5,U)),W.set(5.5,2,1.5),Y.fov=32;break}case"here":case"finale":{C(),O(0,2.4,"out");let _=t($.at<100?11:$.at<200?35:77,/^\W*there/i),A=Q==="here"&&J<_-0.1?-1:Q==="here"?1:Math.sin(J*3)>0?1:-1;if(D[0]=W9(A*7,0.5,-1),D[1]=W9(-A*3,0.5,-1),D[2]=W9(0,1.6,2.4),this.cratesUpTo(J,9,!0),Q==="finale")this.kevin.visible=this.plant.visible=!0,this.kevin.position.set(-10.5,0,1.5);if(Q==="finale"&&Z>230)this.confettiAt(J,Z);Y.position.set(Math.sin(J*0.3)*3,w(5,4,U),w(24,19,U)),W.set(0,3.5,-1);break}case"crates":{let _=Z<100?13:Z<200?37:70;this.cratesUpTo(J,9,!1,_),O(0,2.4,"point"),this.lead.rotation.y=Math.sin(J*2)*0.6,D[2]=W9(0,1.6,2.4);let A=this.lastDropped(J,_);if(A)D[0]=A.clone().setY(1);Y.position.set(w(-4,4,U),w(7,6,U),15),W.set(w(-3,3,U),1.6,-3),Y.fov=48;break}case"kevin":{this.cratesUpTo(J,9,!0),this.kevin.visible=!0,this.kevin.position.set(0,w(14,0,w9(U0(J,Z,Z+0.9))),0.8),O(-2.6,2,"point"),this.lead.rotation.y=0.8,D[2]=W9(0,2.4,0.8),Y.position.set(w(1.5,0.5,U),2.9,w(7.5,6.4,U)),W.set(0,2.5,0.8),Y.fov=40;break}case"plant":{this.cratesUpTo(J,9,!0),this.plant.visible=!0,O(0,2,"out"),D[1]=W9(0,2,-6.5),Y.position.set(0,w(3,4,U),w(16,13,U)),W.set(0,2.6,-6.5),Y.fov=44;break}case"nobody":{this.cratesUpTo(J,9,!0),C(0,-1.5,B>0.2?"shrug":"down"),this.line.forEach((_)=>G8(_,J,B>0.2?"shrug":"down",0,0,0.02)),O(0,2.4,B>0.2?"shrug":"face"),D[2]=W9(0,1.6,2.4),Y.position.set(0,2.2,w(11,9,U)),W.set(0,2,0);break}case"chain":{let _=0;OG.forEach((z,y)=>{let k=21+[0,0,1,2,3,4][y];if(J>=t(k,z.word)-0.1)_=y}),this.chain.forEach((z,y)=>{if(z.group.visible=!0,z.who)G8(z.who,J,y===_?y===3?"point":y===5?"shrug":"point":"down",0,0,0.02)});let A=this.chain[_].group.position,V=A.x>5?-1.3:1.3;O(A.x+V,A.z+1.4,"shrug"),this.lead.rotation.y=-Math.sign(V)*0.6,D[2]=A.clone().setY(1.6),D[1]=this.lead.position.clone().setY(1.6),Y.position.set(L9(A.x*0.5+1.5,-6,5),3,10),W.set(A.x*0.9+0.5,2,-1.5),Y.fov=42;break}case"tickets":{this.booths.forEach((_,A)=>{_.group.visible=!0;let V=A===0?t(28,/resolved/i):A===1?t(28,/duplicate/i):t(28,/^see/i);_.lamp.material.emissiveIntensity=J>=V-0.1||J<L(28)&&Math.floor(J*4)%3===A?2.2:0.1}),O(0,1.6,"shrug"),D[0]=W9(-6,1.6,-3),D[1]=W9(6,1.6,-3),D[2]=W9(0,1.6,-3),Y.position.set(0,w(4,3.4,U),w(15,12,U)),W.set(0,2,-3);break}case"meeting":{this.meeting.visible=!0,this.clockHand.rotation.z=-H*3,[...this.line,this.lead,this.cio,this.vendorGuy,this.plantGuy,this.agents[0],this.agents[1]].forEach((A,V)=>{A.visible=!0;let z=-5.5+V%7*1.85,y=V<7?-3.9:-1.1;A.position.set(z,-0.15,y),A.rotation.y=V<7?0:Math.PI;let k=J>L(34)-0.2;G8(A,J,k?"face":V===9&&J>t(31,/^unmutes/i)?"point":"down",0,0,0.01),A.userData.legs.forEach((f)=>f.rotation.x=-1.4)}),D[2]=W9(0,2,-2.5),Y.position.set(w(-2,2,U),w(8,7,U),9),W.set(0,1.4,-2.5),Y.fov=44;break}case"closet":case"cloud":case"xp":{this.closet.visible=!0,this.fan.rotation.z=-J*14,this.plantGuy.visible=!0,this.plantGuy.position.set(2.2,0,-1.8),this.plantGuy.rotation.y=-0.4;let _=Q==="cloud"&&J>t(47,/^laughed/i)-0.2;if(G8(this.plantGuy,J,_?"face":"down",0,0,_?0.12:0.02),O(-1.5,-0.6,Q==="cloud"?"up":"point"),this.lead.rotation.y=0.5,Q==="cloud")this.cloud.visible=!0,this.cloud.position.set(0,w(16,10.5,Z9(U0(J,Z,Z+1.5))),-2.5),Y.position.set(w(-3,-2,U),2,9),W.set(0,w(3,7,U),-2.5),Y.fov=52;else if(Q==="xp"){this.agents[2].visible=!0,this.agents[2].position.set(w(-9,-0.5,Z9(U0(J,Z,Z+1.6))),0,-1.2),G8(this.agents[2],J,"jazz",0,0,0.05);let A=a0(t(50,/^windows/i)-0.5,t(50,/^windows/i)+0.4,J);Y.position.set(w(-1,1.4,A),w(3,2,A),w(7,-2.2,A)),W.set(w(0,1.4,A),w(2.2,1.88,A),w(-3,-4,A)),Y.fov=w(46,30,A)}else Y.position.set(w(2,0.5,U),2.6,w(8,6.5,U)),W.set(-0.4,2.4,-4),Y.fov=44;D[2]=W9(0,1.8,-4);break}case"truths":case"swamp":case"raci":case"pilot":case"oil":{if(this.cratesUpTo(J,9,!0),O(0,2.2,Q==="oil"?"out":Q==="pilot"?"point":"shrug"),D[2]=W9(0,1.6,2.2),Q==="truths"){let _=Math.floor((J-Z)*3)%9;D[0]=this.crates[_].position.clone().setY(1),Y.position.set(w(-6,6,U),4,16),W.set(0,1.5,-3)}else if(Q==="swamp"){this.swamp.visible=!0,this.tomb.visible=J>t(52,/^crm/i)-0.4,this.tomb.position.set(3,w(-2.4,0,w9(U0(J,t(52,/^crm/i)-0.4,t(52,/^crm/i)+0.3))),0);for(let _ of this.crates)_.position.y=_.userData.home.y-0.4+Math.sin(J*2+_.position.x)*0.08;this.floor.userData.solid=void 0,this.wash.color.setHex(12120256),Y.position.set(4,3,9),W.set(2,1.2,-1)}else if(Q==="raci")C(0,-1,"down"),Y.position.set(0,3,15),W.set(0,2.5,-1);else if(Q==="pilot")this.planes.forEach((_,A)=>{_.visible=!0;let V=(J-Z)*0.35;if(_.position.set(Math.sin(V*2.4)*6,5+Math.sin(V*3.1)*1.2,-1+Math.cos(V*2.4)*2.5),_.rotation.set(0,Math.atan2(Math.cos(V*2.4)*2.4*6,-Math.sin(V*2.4)*2.4*2.5)+Math.PI/2,Math.sin(V*4)*0.3),A===1)_.position.add(W9(0,0.05,0))}),D[1]=this.planes[0].position.clone(),Y.position.set(0,4,13),W.set(0,4.4,-1);else{this.deck.visible=!0;let _=J<t(56,/^\W*tears/i)-0.1?"pilot":J<L(57)-0.1?"tears":"oil";this.deck.material.map=this.decks[_],this.deck.material.emissiveMap=this.decks[_],this.deck.material.needsUpdate=!0,this.barrels.visible=_==="oil",this.vendorGuy.visible=!0,this.vendorGuy.position.set(-4,0,0.5),G8(this.vendorGuy,J,_==="tears"?"face":"jazz",0,0,0.06),D[1]=W9(2.5,4,-6.5),Y.position.set(w(-1,1,U),3.6,15),W.set(1,3.4,-3)}break}case"stan":{this.cratesUpTo(J,9,!0),this.stanSign.visible=!0,this.stanSign.position.set(-4,2.4,0),O(-1.2,1.5,"shrug"),this.lead.rotation.y=-0.6,D[2]=W9(-4,0.5,0),Y.position.set(-1,2.6,10),W.set(-1.5,1.8,0),Y.fov=40;break}case"call":{this.meeting.visible=!0,this.clockHand.rotation.z=-H*3,O(0,0.6,"face",0.01),D[2]=W9(0,1.4,0.6),Y.position.set(0,w(9,8,U),w(14,12,U)),W.set(0,1,-1.5);break}case"agents":{this.agents.forEach((_,A)=>{_.visible=!0,_.position.set(w(-14,-4+A*4,Z9(U0(J,Z+A*0.3,Z+1.8+A*0.3))),0,-1);let V=I(A);G8(_,J,"jazz",V.amount*0.6,V.leg,0.03)}),C(0,-4.5,"jazz"),O(0,2.4,"out"),D[0]=W9(-4,1.6,-1),D[1]=W9(4,1.6,-1),D[2]=W9(0,1.6,2.4),Y.position.set(w(-5,5,U),3.6,15),W.set(0,2.4,-1.5);break}case"lock":{this.padlock.visible=!0,this.padlock.position.set(0,w(14,2.2,w9(U0(J,Z,Z+0.7))),-1),this.padlock.rotation.z=Math.sin(J*6)*0.04,this.agents.forEach((_,A)=>{_.visible=!0,_.position.set(-4+A*4,0,0.8),G8(_,J,"shrug",0,0,0.03)}),D[2]=W9(0,2.2,-1),Y.position.set(0,2.8,12),W.set(0,2.6,-1);break}case"confluence":{this.cratesUpTo(J,9,!0),this.door.visible=!0,this.door.position.set(0,0,-1),O(-2.2,1.4,J>t(72,/^direct/i)?"shrug":"point"),this.lead.rotation.y=0.5,D[2]=W9(0,2.4,-1),Y.position.set(w(2,1,U),3.2,w(11,9,U)),W.set(0,2.8,-1);break}case"github":{this.cratesUpTo(J,9,!0),this.github.visible=!0,this.github.position.set(0,0,0),O(-2.6,1.6,"point"),this.lead.rotation.y=0.7,D[2]=W9(0,0.6,0),Y.position.set(1.2,2.6,7.5),W.set(0,1.4,0),Y.fov=40;break}case"curtaincall":case"end":{C(0,-1.5,"down"),this.line.forEach((_)=>{_.rotation.x=a0(L(79),L(79)+1,J)*0.35*(1-a0(L(80),L(80)+1,J))}),O(0,3,J>L(82)?"face":"down",0.02),D[2]=W9(0,1.6,3),Y.position.set(0,w(4.5,3,U),w(22,15,U)),W.set(0,3,2);break}}if(Q!=="curtaincall"&&Q!=="end")for(let _ of this.line)_.rotation.x=0;if(Q!=="swamp"){this.wash.color.setHex(16771272);for(let _ of this.crates)if(_.visible)_.position.y=Math.max(0,_.position.y)}this.spots.forEach((_,A)=>{let V=D[A];if(_.light.intensity=V?R?110:75:0,_.beam.visible=!!V,!V)return;_.light.target.position.copy(V),_.light.target.updateMatrixWorld();let z=_.light.position,y=V.clone().sub(z),k=y.length(),f=Math.tan(_.light.angle)*k;_.beam.position.copy(z),_.beam.quaternion.setFromUnitVectors(W9(0,-1,0),y.normalize()),_.beam.scale.set(f,k,f),_.beam.material.opacity=R?0.045:0.025}),this.bloom.strength=0.3+G*0.15,Y.aspect=1.7777777777777777,Y.updateProjectionMatrix(),Y.lookAt(W)}cratesUpTo(J,$,Q,Z=13){this.crates.slice(0,$).forEach((K,U)=>{K.visible=!0;let H=K.userData.home;if(Q){K.position.copy(H);return}let Y=KK[U],W=U<4?Z:Z+1,G=t(W,Y.word)-0.25;K.visible=J>=G-0.6;let N=U0(J,G-0.6,G),q=U0(J,G,G+0.3),X=H.y>0?this.crates[U-1].position.y-this.crates[U-1].userData.home.y:0;K.position.set(H.x,H.y+X+14*(1-N*N)+0.25*Math.sin(Math.PI*q),H.z)})}lastDropped(J,$){let Q=null;return KK.forEach((Z,K)=>{if(J>=t(K<4?$:$+1,Z.word)-0.25)Q=this.crates[K].position}),Q}confettiAt(J,$){this.confetti.visible=!0;for(let Q=0;Q<400;Q++){let Z=J-$-B0(Q)*0.6;W8.position.set(-12+B0(Q+1)*24,14-Math.max(0,Z)*(1.4+B0(Q+2))+Math.sin(J*3+Q)*0.2,-5+B0(Q+3)*9),W8.rotation.set(J*3+Q,J*2+Q*0.3,0),W8.scale.setScalar(Z>0?1:0.001),W8.updateMatrix(),this.confetti.setMatrixAt(Q,W8.matrix)}this.confetti.instanceMatrix.needsUpdate=!0}render(){this.composer.render()}}function rE(J){for(let $ of I7){if($.words[0].s>J+0.5)break;for(let Q of $.words)if(Q.backing&&/nobody|knows/i.test(Q.w)&&J>=Q.s-0.1&&J<=Q.e+0.6)return 1}return 0}var tE=/^(data|everywhere|everywhere\.|nobody|knows|kidding|xp|wreck|swamp|deceased|tears|scary|never|mute|wrong)$/,eE=/^(ai|databricks|dataiku|sap|s3|redshift|azure|servicenow|confluence|github|cloud|agent|agents|autonomous|crm|lake)$/,JO=/^(kevin|denise|gary|stan|stan's|jess|ticket|tickets|meeting|calendar|slack|plant|bandwidth|raci|pilot|fourteen|nine|three|q3|vendor|cio|oil|follow-up|recurring)$/,TJ=(J,$,Q="")=>`<div class="tile ${Q}" data-at="${$}"><b>${J.replace(/[^A-Z?]/g,"").slice(0,2)||"?"}</b><span>${J}</span><i>${Q.includes("live")?"\uD83C\uDF99":"\uD83D\uDD07"}</i></div>`,MG={title:"Data Here, Data There",fonts:['400 100px "Limelight"','400 60px "DM Serif Display"','400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
  <div class="ov title" data-show="0.4|L1-0.2"><small>now playing · a musical in one act</small>Data Here,<br>Data There</div>
  <div class="ov card cast" data-show="L21-0.2|L27-0.3"><div class="bar">Playbill · cast, in order of appearance</div>
    <div class="role" data-at="W21:boss"><b>My boss</b><span>"Ask Denise"</span></div>
    <div class="role" data-at="W22:denise"><b>Denise</b><span>"That's the platform team"</span></div>
    <div class="role" data-at="W22:platform"><b>The platform team</b><span>"Please file a ticket"</span></div>
    <div class="role" data-at="W23:slack"><b>A Slack bot</b><span>"Email Gary"</span></div>
    <div class="role" data-at="W24:gary"><b>Gary</b><span class="red">never wrote back</span></div>
    <div class="role" data-at="W25:guy"><b>A guy who knows a guy</b><span>"The new one's kind of scary"</span></div></div>
  <div class="ov card invite" data-show="L29|L35-0.3"><div class="bar">\uD83D\uDCC5 invitation · data access sync</div>
    <h3>Where is the data?</h3>
    <div class="row">attendees <b data-count="1,14" data-at="L30" data-until="W30:people">1</b></div>
    <div class="row">elapsed <b data-count="0,40" data-at="L30" data-until="W31:minutes">0</b> of 60 min</div>
    <div class="row red" data-at="W31:unmutes">\uD83C\uDF99 someone unmuted</div>
    <div class="row muted" data-at="L33">outcome: <b>a different team</b></div></div>
  <div class="ov card raci" data-show="L53|L55-0.1"><div class="bar">RACI · for the RACI</div>
    <table><tr><th></th><th>R</th><th>A</th><th>C</th><th>I</th></tr>
    ${["the RACI","the council","the plan","the data"].map((J,$)=>`<tr data-at="L53+${($*0.5).toFixed(1)}"><td>${J}</td>${$===3?'<td colspan="4" class="stan" data-at="W54:ask">ask Stan</td>':"<td>✓</td><td>✓</td><td>✓</td><td>✓</td>"}</tr>`).join("")}</table>
    <div class="row muted" data-at="W54:who's">who's Stan?</div></div>
  <div class="ov call" data-show="L59-0.2|L66-0.4"><div class="bar">AI Readiness Sync · 14 participants · <span class="red">recording</span></div>
    <div class="grid">
      ${TJ("Chris (presenting)","L59","live")}${TJ("Denise","L59+0.2")}${TJ("Platform team","L59+0.4")}
      ${TJ("Gary · away","L59+0.6")}${TJ("Databricks team","W61:databricks","live")}${TJ("Dataiku team","W61:dataiku")}
      ${TJ("SAP team · leaving","L62","live")}${TJ("Kevin (2003)","L63")}${TJ("Stan?","L64")}
    </div>
    <div class="share" data-at="L59">\uD83D\uDDA5 Can everyone see my screen? <b data-at="L60">You are muted</b></div></div>
  <div class="ov stamp big" data-show="W69:kidding|L70-0.1" data-at="W69:kidding">ACCESS DENIED</div>
  <div class="ov card invite" data-show="L79|E82"><div class="bar">\uD83D\uDCC5 new event · recurring</div>
    <h3>AI Readiness</h3>
    <div class="row">every week · <b>no end date</b></div>
    <div class="row" data-at="L81">data classification: <b>unknown</b></div>
    <div class="row muted" data-at="L82">owner: does anyone know?</div></div>`,endAt:()=>I7.at(-2).words.at(-1).e+0.2,words:{hot:tE,ice:eE,gold:JO},hud:(J,$)=>{let Q=[13,14,15,16,70,71,72].reduce((Z,K)=>Z+I7[K].words.filter((U)=>!U.backing&&U.s<=J&&/^(databricks|dataiku|sap|s3|redshift|azure|servicenow|homegrown|plant|confluence)/i.test(U.w)).length,0);return{left:`data here, data there &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`systems <span class="ice">${Math.min(9,Q)}</span> &nbsp;·&nbsp; access <b>${J>t(69,/^kidding/i)?"denied":"pending"}</b>`}},shots:HK,shotAt:UK,world:(J)=>{let $=new pH(J);return{update:(Q)=>$.update(Q),render:()=>$.render(),flash:(Q)=>$.flash(Q),fade:(Q)=>$.fade(Q),scene:$.scene,camera:$.camera}}};function uH(J,$){let Q=$?"final chorus":"chorus";return[{name:$?"sunrise":"twoam",at:L(J)-0.2,label:$?"seven a-m again":"two a-m again",section:Q},{name:"window",at:L(J+1)-0.15,label:"the only light on",section:Q},{name:"spin",at:L(J+2)-0.1,label:"ten minutes, ten minutes",section:Q},{name:$?"sunrise":"prompt",at:L(J+3)-0.1,label:$?"the night is gone":"one more prompt",section:Q},{name:"toy",at:L(J+4)-0.1,label:"just a kid with a toy",section:Q},{name:"whoa",at:L(J+6)-0.2,label:"ten more minutes",section:"post-chorus"},{name:"bed",at:L(J+7)-0.2,label:"then I'll go to bed",section:"post-chorus"}]}function lH(){let Z=[{name:"night",at:0,label:"nine p-m",section:"intro"},{name:"okay",at:L(0)-0.4,label:"okay. ten minutes.",section:"spoken"},{name:"deck",at:L(1)-0.3,label:"twenty-three years of arrows",section:"verse 1"},{name:"calendar",at:L(2)-0.2,label:"a standup for the standup",section:"verse 1"},{name:"dinner",at:L(3)-0.2,label:"can you make a game?",section:"verse 1"},{name:"farwonder",at:L(4)-0.2,label:"farwonder",section:"verse 1"},{name:"init",at:L(5)-0.2,label:"nine-oh-four",section:"verse 1"},{name:"lagoon",at:L(6)-0.2,label:"a three-d lagoon",section:"verse 1"},{name:"talk",at:L(7)-0.2,label:"teach the kids to read",section:"verse 1"},{name:"cat",at:L(8)-0.2,label:"c-a-t",section:"verse 1"},{name:"cats",at:L(9)-0.2,label:"everyone's asleep",section:"pre-chorus"},{name:"blast",at:L(10)-0.2,label:"just claude and me",section:"pre-chorus"},...uH(11,!1),{name:"tabs",at:L(19)-0.4,label:"five tabs of claude",section:"verse 2"},{name:"shh",at:L(20)-0.2,label:"don't wake the child",section:"verse 2"},{name:"games",at:L(21)-0.2,label:"sub-games",section:"verse 2"},{name:"stars",at:L(22)-0.2,label:"two stars on github",section:"verse 2"},{name:"limit",at:L(23)-0.2,label:"back at three",section:"verse 2"},{name:"xmas",at:L(24)-0.2,label:"one of them is me",section:"verse 2"},{name:"stairs",at:L(25)-0.2,label:"is this for work?",section:"verse 2"},{name:"fun",at:L(26)-0.2,label:"just for fun",section:"verse 2"},...uH(27,!1),{name:"nope",at:L(35)-0.6,label:"no ticket. no sprint.",section:"bridge"},{name:"nope",at:L(36)-0.2,label:"no steering review",section:"bridge"},{name:"glow",at:L(37)-0.2,label:"a game that wasn't there",section:"bridge"},{name:"localhost",at:L(38)-0.2,label:"glowing on localhost",section:"bridge"},...uH(39,!0),{name:"dew",at:t(46,/^\W*who$/i)-0.25,label:"who needs sleep?",section:"post-chorus"},{name:"standup",at:L(47)-0.4,label:"no blockers",section:"outro"},{name:"end",at:n0(47)+1.4,label:"the end",section:"outro"}],K=new Map;return Z.map((U)=>{let H=K.get(U.name)??0;return K.set(U.name,H+1),{...U,n:H}})}var $O=null,TQ=()=>$O??=lH(),cH=(J)=>{let $=TQ()[0];for(let Q of TQ())if(Q.at<=J)$=Q;return $},QO=(J)=>TQ()[TQ().indexOf(J)+1]?.at??_7(),PG=()=>L(39)-0.25;function ZO(){return[[0,544],[L(5),544],[L(8),615],[n0(8),617],[L(10),690],[L(19),720],[L(21),760],[L(23),810],[L(25),840],[L(35),930],[L(38),1020],[PG(),1140],[L(47)-0.3,1155],[n0(47)+2,1157]]}function KO(J){return J>=L(11)-0.2&&J<L(19)-0.6?840+U0(J,L(11),L(19))*9:nH(J)}function nH(J){let $=ZO();for(let Q=1;Q<$.length;Q++){let[Z,K]=$[Q],[U,H]=$[Q-1];if(J<Z)return w(H,K,U0(J,U,Z))}return $.at(-1)[1]}function CG(J){let $=(Math.floor(J/60)+12)%24,Q=Math.floor(J%60);return`${$%12||12}:${String(Q).padStart(2,"0")} ${$<12?"AM":"PM"}`}var Y0={paper:16777215,ink:1907490,red:14692396,orange:15895070,yellow:16765728,green:4173370,dkgreen:2322490,blue:3108824,navy:1911398,purple:8011696,pink:16227524,magenta:14168959,brown:9065000,tan:15319178,gray:9211801,skin:16240048,wood:12614202,sky:8832754},YK={hair:4866104,glasses:!0},mH={hair:3809554,ponytail:!0,eyes:4006934,lashes:!0,cheeks:!0,lips:14168927,earrings:!0},VG={hair:15912795,long:!0,bangs:!0,eyes:7027230,lashes:!0,cheeks:!0};var O$=(()=>{let J=new uJ(new Uint8Array([200,200,200,255,255,255,255,255]),2,1);return J.minFilter=J.magFilter=n7,J.needsUpdate=!0,J})(),dH=new Map,$7=(J)=>{let $=dH.get(J);if(!$)dH.set(J,$=new o7({color:J,gradientMap:O$,emissive:J===Y0.skin?J:0,emissiveIntensity:0.3}));return $},d8=(J)=>new C0({color:J}),X9=(J,$,Q=0,Z=0,K=0)=>{let U=new h(J,$);return U.position.set(Q,Z,K),U},i0=(J,$,Q,Z,K=0,U=0,H=0)=>X9(new I0(J,$,Q),$7(Z),K,U,H),b9=(J,$,Q=0,Z=0,K=0)=>X9(new p0(J,72,56),$7($),Q,Z,K),x7=(J,$,Q,Z,K=0,U=0,H=0,Y=16)=>X9(new w0(J,$,Q,Y>5?Y*2:Y),$7(Z),K,U,H),R8=(J=0,$=0,Q=0)=>new v(J,$,Q);function QJ(J,$,Q){let Z=document.createElement("canvas");Z.width=J,Z.height=$;let K=new D7(Z);return K.colorSpace=V7,K.anisotropy=4,Q(Z.getContext("2d")),K}function h7(J,$,Q,Z,K=0){J.strokeStyle=Q,J.lineCap=J.lineJoin="round";for(let U=0;U<2;U++)J.lineWidth=Z*(U?0.55:1),J.globalAlpha=U?0.95:0.7,J.beginPath(),$.forEach(([H,Y],W)=>{let G=(B0(K+W*7.13+U*3.31)-0.5)*Z*0.6,N=(B0(K+W*3.71+U*9.17)-0.5)*Z*0.6;if(W)J.lineTo(H+G,Y+N);else J.moveTo(H+G,Y+N)}),J.stroke();J.globalAlpha=1}function g7(J,$,Q,Z,K,U,H=12,Y=0){let W=[];for(let G=0,N=Q-H;N<Q+K+H;G++,N+=H)W.push(G%2?[$+Z+H,N+H*0.8]:[$-H,N]);J.save(),J.beginPath(),J.rect($,Q,Z,K),J.clip(),h7(J,W,U,H*1.7,Y),J.restore()}function cJ(J,$,Q,Z,K,U,H=6,Y=0){h7(J,[[$,Q],[$+Z,Q+2],[$+Z-2,Q+K],[$+1,Q+K-1],[$,Q]],U,H,Y)}function WK(J,$,Q,Z,K,U,H,Y,W=8){for(let G=0;G<K;G++){let N=B0(U+G*1.3)*$,q=B0(U+G*2.9+0.5)*Q,X=w(H,Y,B0(U+G*4.1+0.9)),F=3+B0(U+G*5.3)*3,R=(B0(U+G*6.7)-0.5)*3,M=[];for(let D=0;D<=F*22;D++){let E=D/22*Math.PI*2,I=X*(0.6+0.4*Math.sin(D*0.31+G));M.push([N+Math.cos(E)*I+D*R,q+Math.sin(E)*I*0.85])}h7(J,M,Z[G%Z.length],W,U+G*13)}}function E$(J,$,Q,Z,K,U=0,H=!0){let Y=[];for(let W=0;W<=10;W++){let G=-Math.PI/2+W*Math.PI/5,N=W%2?Z*0.45:Z;Y.push([$+Math.cos(G)*N,Q+Math.sin(G)*N])}if(H)J.fillStyle=K,J.globalAlpha=0.85,J.beginPath(),Y.forEach(([W,G],N)=>N?J.lineTo(W,G):J.moveTo(W,G)),J.fill(),J.globalAlpha=1;h7(J,Y,K,Math.max(3,Z*0.12),U)}function R7(J,$,Q,Z,K,U,H="left",Y="Gaegu"){J.font=`700 ${K}px "${Y}"`,J.fillStyle=U,J.textAlign=H,J.textBaseline="middle",J.fillText($,Q,Z)}function _G(J,$,Q,Z,K=0){J.fillStyle="#f79cc4",J.beginPath(),J.ellipse($-Z*0.6,Q+Z*0.1,Z*0.75,Z*0.32,0.1,0,Math.PI*2),J.fill(),J.beginPath(),J.ellipse($+Z*0.25,Q,Z*0.45,Z*0.36,0,0,Math.PI*2),J.fill();for(let U of[-1,1])for(let H=0;H<3;H++){let Y=U*(0.6+H*0.35);h7(J,[[$+Z*0.2,Q+U*Z*0.2],[$+Z*0.2-Math.cos(Y)*Z*0.35,Q+Math.sin(Y)*Z*0.55]],"#d8337f",Z*0.09,K+H)}h7(J,[[$-Z*1.3,Q+Z*0.1],[$-Z*1.65,Q-Z*0.12],[$-Z*1.6,Q+Z*0.35],[$-Z*1.3,Q+Z*0.1]],"#f79cc4",Z*0.12,K+9),J.fillStyle="#1d1b22",J.beginPath(),J.arc($+Z*0.42,Q-Z*0.08,Z*0.06,0,Math.PI*2),J.fill(),h7(J,[[$+Z*0.38,Q+Z*0.14],[$+Z*0.5,Q+Z*0.2],[$+Z*0.62,Q+Z*0.12]],"#1d1b22",Z*0.04,K+11)}function UO(J=2048,$=1152,Q=3){return QJ(J,$,(Z)=>{Z.fillStyle="#1c2760",Z.fillRect(0,0,J,$),g7(Z,0,0,J,$,"#283a8a",26,Q),g7(Z,0,0,J,$*0.6,"#141c48",34,Q+5),WK(Z,J,$,["#3a52b0","#5a3f9e","#2d4aa0"],14,Q+9,60,180,10);for(let K=0;K<26;K++)E$(Z,B0(Q+K*1.7)*J,B0(Q+K*2.3)*$*0.85,10+B0(Q+K)*18,"#ffd320",Q+K,K%3!==0)})}function HO(J=2048,$=1152,Q=7){return QJ(J,$,(Z)=>{Z.fillStyle="#ffffff",Z.fillRect(0,0,J,$),g7(Z,0,0,J,$*0.35,"#9fd3f5",22,Q),g7(Z,0,$*0.35,J,$*0.3,"#ffe36a",20,Q+1),g7(Z,0,$*0.62,J,$*0.38,"#ffb24a",20,Q+2),WK(Z,J,$,["#ffd320","#f28a1e","#e0302c","#3fae3a","#2f6fd8","#7a3fb0"],22,Q+4,70,200,9)})}function YO(J=1024,$=768,Q=11){return QJ(J,$,(Z)=>{Z.fillStyle="#ffffff",Z.fillRect(0,0,J,$),g7(Z,0,0,J,$*0.45,"#7a5cc0",18,Q),g7(Z,0,$*0.4,J,$*0.3,"#f07aa0",18,Q+1),g7(Z,0,$*0.68,J,$*0.32,"#ffa040",18,Q+2),WK(Z,J,$,["#ffd320","#f79cc4"],5,Q+3,40,90,7)})}var BG={uniforms:{tColor:{value:null},tDepth:{value:null},res:{value:new q0(1920,1080)},near:{value:0.05},far:{value:150},seed:{value:0},boil:{value:0},reveal:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:`
    uniform sampler2D tColor, tDepth; uniform vec2 res; uniform float near, far, seed, boil, reveal;
    varying vec2 vUv;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float hash3(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
    float noise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
      return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y); }
    float fbm(vec2 p) { float v = 0., a = .5; for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 17.1; a *= .5; } return v; }
    // inverse view depth: linear across any flat face, so its second difference finds creases
    float idepth(vec2 uv) { float z = texture2D(tDepth, uv).x * 2. - 1.; return (far + near - z * (far - near)) / (2. * near * far); }
    vec3 srgb(vec3 c) { return mix(c * 12.92, 1.055 * pow(max(c, 0.), vec3(1. / 2.4)) - .055, step(.0031308, c)); }
    void main() {
      vec2 asp = vec2(res.x / res.y, 1.), p = vUv * asp, px = 1. / res;
      // a hand that wobbles: the drawing is sampled through a slowly boiling field
      vec2 wob = vec2(noise(p * 6. + boil), noise(p * 6. - boil + 4.2)) - .5;
      vec2 uv = vUv + wob * 3.2 * px.y;
      vec3 c = clamp(srgb(texture2D(tColor, uv).rgb), 0., 1.);
      // pencil outlines: silhouettes (a jump in depth) and creases (a kink in it)
      vec2 o = px * (1.25 + .6 * noise(p * 40. + boil));
      float i0 = idepth(uv), il = idepth(uv - vec2(o.x, 0.)), ir = idepth(uv + vec2(o.x, 0.)), id = idepth(uv - vec2(0., o.y)), iu = idepth(uv + vec2(0., o.y));
      float sil = max(max(abs(il - i0), abs(ir - i0)), max(abs(id - i0), abs(iu - i0))) / i0;
      float crease = (abs(il + ir - 2. * i0) + abs(id + iu - 2. * i0)) / i0;
      float edge = max(smoothstep(.035, .09, sil), smoothstep(.006, .02, crease));
      edge *= .7 + .3 * noise(p * 90. + boil);
      // wax: how hard this color was pressed, strokes on a slant chosen per color, paper tooth showing through
      float lum = dot(c, vec3(.299, .587, .114)), sat = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
      float press = clamp((1. - lum) * 1.25 + sat * .55, 0., 1.);
      float ang = hash3(floor(c * 5.) + seed * .01) * 3.1416;
      vec2 q = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * (p * res.y);
      float streak = noise(vec2(q.x * .012, q.y * .42)) * .6 + noise(vec2(q.x * .05, q.y * 1.1)) * .4;
      float tooth = noise(p * res.y * .5) * .6 + noise(p * res.y * .17) * .4;
      float cov = clamp(press * 1.35 - .25 + (streak - .5) * .9 + (tooth - .5) * .7, 0., 1.);
      vec3 sheet = vec3(.992, .985, .968) * (.975 + .035 * fbm(p * 70.));
      vec3 wax = clamp(mix(vec3(1.), c, 1.12), 0., 1.);
      vec3 col = mix(sheet, wax * sheet, cov);
      col = mix(col, vec3(.11, .1, .13), clamp(edge, 0., 1.) * .92);
      // each cut scribbles in from blank paper, in patches
      float m = fbm(p * 2.6 + seed * 3.1) * .8 + (1. - length(vUv - .5) * 1.2) * .2;
      float rv = reveal * 1.35 - .15;
      col = mix(sheet, col, 1. - smoothstep(rv - .06, rv, 1. - m));
      gl_FragColor = vec4(col, 1.);
    }`},IG=(J,$,Q)=>X9(new w0(J,J*0.9,$,32).translate(0,-$/2,0),$7(Q));function WO(J){let $=new H0;$.add(b9(0.22,Y0.skin));let Q=X9(new p0(0.235,36,20,0,Math.PI*2,0,Math.PI*0.5),$7(J.hair));if(Q.rotation.x=-0.35,$.add(Q),J.ponytail){let U=new H0;U.position.set(0.13,0.05,-0.2),U.rotation.set(0.5,0,0.7);let H=X9(new Y7(0.07,0.022,12,24),$7(Y0.magenta));H.rotation.x=Math.PI/2,U.add(X9(new k7(0.075,0.3,8,20),$7(J.hair),0,-0.2,0),H);let Y=b9(0.12,J.hair,0.05,0.135,0.13);Y.scale.set(1.45,0.45,0.7),Y.rotation.z=-0.3,$.add(U,Y)}if(!J.long){let U=b9(0.225,J.hair,0,-0.04,-0.05);U.scale.set(1,0.85,1),$.add(U)}if(J.bangs){let U=b9(0.13,J.hair,0,0.13,0.14);U.scale.set(1.5,0.42,0.65),$.add(U)}if(J.cap){let U=X9(new p0(0.245,36,20,0,Math.PI*2,0,Math.PI*0.5),$7(J.cap));U.rotation.x=-0.2,$.add(U,i0(0.26,0.025,0.18,J.cap,0,0.1,0.27))}if(J.long){let U=b9(0.25,J.hair,0,-0.13,-0.1);U.scale.set(1,1.45,0.62),$.add(U);for(let H of[-1,1]){let Y=X9(new k7(0.06,0.3,4,20),$7(J.hair),H*0.2,-0.17,0.05);Y.rotation.z=H*0.12,$.add(Y)}}for(let U of[-1,1]){if(J.asleep){let H=X9(new Y7(0.032,0.009,12,24,Math.PI),d8(Y0.ink),U*0.08,0.02,0.205);H.rotation.z=Math.PI,$.add(H)}else $.add(b9(J.eyes?0.034:0.028,J.eyes??Y0.ink,U*0.08,0.02,0.2));if(J.lashes)for(let H of[0,1]){let Y=i0(0.035,0.009,0.009,Y0.ink,U*(0.105+H*0.012),0.05-H*0.012,0.2);Y.rotation.z=U*(0.5-H*0.45),$.add(Y)}if(J.cheeks){let H=X9(new p0(0.042,24,16),d8(16095920),U*0.13,-0.05,0.18);H.scale.z=0.35,$.add(H)}if(J.earrings)$.add(b9(0.022,Y0.yellow,U*0.215,-0.08,0.02))}let Z=X9(new Y7(J.asleep?0.04:J.lips?0.05:0.052,J.lips?0.017:0.012,12,28,Math.PI),d8(J.lips??Y0.ink),0,-0.06,0.2);Z.rotation.set(0.35,0,Math.PI);let K=b9(0.042,5904932,0,-0.085,0.19);if(K.rotation.x=0.35,K.scale.set(1.1,0.01,0.35),K.visible=!1,$.add(Z,K),J.glasses)for(let U of[-1,1]){let H=X9(new Y7(0.07,0.011,8,4).rotateZ(Math.PI/4),d8(Y0.ink),U*0.085,0.02,0.215);H.scale.set(1.25,0.8,1),$.add(H)}return{head:$,mouth:Z,open:K}}function M8(J){let $=new H0;$.name=J.name;let Q=new H0;if($.add(Q),Q.add(x7(0.2,0.27,0.66,J.shirt,0,1.18,0)),J.dress)Q.add(x7(0.22,0.42,0.6,J.dress,0,0.72,0,20));let{head:Z,mouth:K,open:U}=WO(J);Z.position.set(0,1.74,0),Q.add(Z);let H=[-1,1].map((W)=>{let G=new H0;return G.position.set(W*0.25,1.46,0),G.add(IG(0.045,0.6,J.shirt),b9(0.065,Y0.skin,0,-0.62,0)),Q.add(G),G}),Y=[-1,1].map((W)=>{let G=new H0;return G.position.set(W*0.11,0.86,0),G.add(IG(0.06,0.8,J.pants),i0(0.13,0.08,0.22,Y0.ink,0,-0.82,0.05)),$.add(G),G});return $.scale.setScalar(J.scale??1),Object.assign($.userData,{body:Q,head:Z,mouth:K,open:U,arms:H,legs:Y,seed:J.seed}),$}function A8(J,$,Q){let{body:Z,head:K,mouth:U,open:H,arms:Y,legs:W,seed:G}=J.userData,N=Q.sit?0.3:0,q=Q.kneel?0.42:0;Z.position.y=-N-q+(Q.bounce??0)*Math.abs(Math.sin($*Math.PI*2.08+G))*0.08,Z.rotation.x=Q.lean??0,Z.rotation.y=Q.turn??0,W.forEach((F,R)=>{F.position.y=0.86-N-q,F.rotation.x=Q.sit?-Math.PI/2:Q.kneel?-Math.PI/2+0.2:0,F.scale.y=Q.kneel?0.55:1,F.rotation.z=(R?1:-1)*0.04}),Y.forEach((F,R)=>{let M=R?1:-1,D=L9(Q.arms?.[R]??0),E=Q.reach??0;F.rotation.set(-E*1.6+(E>0.9?Math.sin($*12+R*Math.PI)*0.05:0),0,M*(0.15+D*2.6))}),K.rotation.set(0,0,Math.sin($*1.7+G)*0.04);let X=Q.talk??0;U.scale.set(1,1+X*0.4,1),H.visible=X>0.05,H.scale.y=Math.max(0.01,X*1.1)}function zG(J,$,Q,Z,K,U){let W=new H0;W.name=J,W.position.set(Q,Z,K),W.rotation.y=U;let G=b9(0.3,2499628,0,0.14,0);G.scale.set(1.3,0.55,1);let N=b9(0.15,2499628,0.3,0.16,0.12);for(let X of[-1,1]){let F=X9(new g9(0.06,0.12,4),$7(2499628),0.32+X*0.07,0.31,0.1);F.rotation.z=-X*0.25,W.add(F);let R=i0(0.05,0.014,0.01,13619158,0.34+X*0.06,0.17,0.265);R.rotation.z=X*0.4;let M=b9(0.028,13162026,0.34+X*0.06,0.18,0.262);M.scale.z=0.4,M.visible=!1,W.userData[X<0?"eyeL":"eyeR"]=[R,M],W.add(R,M)}let q=X9(new Y7(0.33,0.045,12,40,Math.PI*0.9),$7(2499628),0,0.07,0);if(q.rotation.x=Math.PI/2,q.rotation.z=0.3,W.add(G,N,q),$){let X=b9(0.13,16513782,0.2,0.13,0.27);X.scale.set(1,0.8,0.6);let F=b9(0.1,16513782,0.33,0.1,0.235);F.scale.set(1,0.75,0.6),W.add(X,F,b9(0.045,16513782,0.47,0.04,0.2),b9(0.045,16513782,0.38,0.04,0.28))}return W}function AG(){let J=new H0;J.name="axolotl";let{pink:$,magenta:Q}=Y0,Z=X9(new k7(0.26,0.9,12,28),$7($),0,0,0);Z.rotation.x=Math.PI/2;let K=b9(0.36,$,0,0.04,0.72);K.scale.set(1.2,0.82,1);let U=[];for(let N of[-1,1])for(let q=0;q<3;q++){let X=X9(new g9(0.06,0.42,12).translate(0,0.21,0),$7(Q),N*0.34,0.08+(q-1)*0.12,0.6);X.userData={s:N,i:q},U.push(X),J.add(X)}for(let N of[-1,1])J.add(b9(0.05,Y0.ink,N*0.2,0.14,1));let H=X9(new Y7(0.11,0.016,12,28,Math.PI),d8(Y0.ink),0,-0.02,1.06);H.rotation.z=Math.PI;let Y=[];for(let[N,q]of[[-1,0.35],[1,0.35],[-1,-0.35],[1,-0.35]]){let X=X9(new k7(0.05,0.18,4,16),$7($),N*0.3,-0.12,q);X.rotation.z=N*1.1,Y.push(X),J.add(X)}let W=new H0;W.position.set(0,0,-0.6);let G=b9(0.4,$,0,0,-0.42);return G.scale.set(0.12,0.6,1),W.add(G),J.add(Z,K,H,W),J.userData={gills:U,tail:W,legs:Y},J}function LG(J,$,Q=1){let{gills:Z,tail:K}=J.userData;K.rotation.y=Math.sin($*6*Q)*0.45;for(let U of Z){let{s:H,i:Y}=U.userData;U.rotation.set(-0.9+Math.sin($*4+Y)*0.15,0,-H*(0.9+(Y-1)*0.5)-H*Math.sin($*3+Y)*0.12)}}function GO(J,$,Q){let Z=QJ(256,256,(Y)=>{Y.fillStyle="#fffdf4",Y.fillRect(0,0,256,256),cJ(Y,14,14,228,228,$,12,Q),R7(Y,J,128,136,190,$,"center")}),K=$7(Y0.tan),U=new o7({map:Z,gradientMap:O$}),H=X9(new I0(0.7,0.7,0.7),[K,K,K,K,U,K]);return H.name=`block-${J}`,H}var O7=1024,b7=640;class iH{renderer;scene=new i7;camera=new Z7(40,1.7777777777777777,0.05,150);target;post;postScene=new i7;postCam=new VJ(-1,1,1,-1,0,1);hemi=new U8(16777215,13156528,1.9);sun=new a7(16777215,1.6);backdrop;skies;house=new H0;litWindow;darkWindows=[];moon;sunBall=new H0;grass;room=new H0;wallMat=new o7({color:3817354,gradientMap:O$});roomWindow;glow;lid=new H0;screenTex;screenCanvas;screenKey="";hourHand=new H0;minuteHand=new H0;chris;wife;wifeAsleep;wifeUp;lump;bedWall=new o7({color:2896758,gradientMap:O$});bedWindow;nightlight=new D8(16757864,0,5);blackCat;toy;mug;chair=new H0;lagoon=new H0;axo;islander;water;blocks=[];goldStar;tiles=[];sign=new H0;bedroom=new H0;kid;doorLight;office=new H0;board;boards={};presenter;huddle=[];line=new H0;cards=[];dinner=new H0;diner;son;xmas=new H0;waiters=[];xmasChris;constructor(J){this.renderer=new E8({canvas:J,antialias:!1,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.target=new F7(1920,1080,{type:P7,samples:4}),this.target.depthTexture=new RJ(1920,1080),this.post=new h(new t0(2,2),new p9({...BG,uniforms:F8.clone(BG.uniforms),depthTest:!1,depthWrite:!1})),this.post.material.uniforms.tColor.value=this.target.texture,this.post.material.uniforms.tDepth.value=this.target.depthTexture,this.postScene.add(this.post),this.scene.background=new D0(16777215),this.sun.position.set(-4,10,7),this.scene.add(this.hemi,this.sun,this.camera),this.skies={night:UO(),dawn:HO(),dusk:YO()},this.backdrop=X9(new t0(1,1),new C0({map:this.skies.night,depthWrite:!0}),0,0,-120),this.backdrop.name="sky",this.camera.add(this.backdrop),this.screenCanvas=document.createElement("canvas"),this.screenCanvas.width=O7,this.screenCanvas.height=b7,this.screenTex=new D7(this.screenCanvas),this.screenTex.colorSpace=V7,this.chris=M8({name:"chris",...YK,shirt:3882309,pants:Y0.navy,seed:1}),this.wife=M8({name:"wife",...mH,shirt:14833039,dress:14833039,pants:Y0.skin,seed:2}),this.wifeAsleep=M8({name:"wife-asleep",...mH,asleep:!0,shirt:14833039,pants:14833039,seed:2}),this.wifeUp=M8({name:"wife-up",...mH,shirt:14833039,pants:14833039,seed:2}),this.kid=M8({name:"abby",...VG,asleep:!0,shirt:Y0.pink,pants:Y0.purple,seed:3,scale:0.7}),this.presenter=M8({name:"presenter",...YK,shirt:10133674,pants:Y0.ink,seed:4}),this.diner=M8({name:"diner",...YK,shirt:3882309,pants:Y0.navy,seed:5}),this.son=M8({name:"logan",shirt:10474485,pants:Y0.navy,hair:7029795,cap:Y0.red,seed:6,scale:0.62}),this.xmasChris=M8({name:"xmas-chris",...YK,shirt:4173370,pants:Y0.red,seed:7}),this.islander=M8({name:"logan-island",shirt:10474485,pants:Y0.navy,hair:7029795,cap:Y0.red,seed:8,scale:0.62}),this.axo=AG(),this.toy=AG(),this.buildHouse(),this.buildRoom(),this.buildLagoon(),this.buildBedroom(),this.buildOffice(),this.buildDinner(),this.buildXmas(),this.scene.add(this.house,this.room,this.lagoon,this.bedroom,this.office,this.dinner,this.xmas)}buildHouse(){let J=this.house;this.grass=X9(new p0(40,64,32),$7(Y0.green),0,-38.6,0),this.grass.name="hill",J.add(this.grass),J.add(i0(6,4.2,5,15222330,0,3.3,0));let $=X9(new g9(4.7,2.8,4),$7(Y0.brown),0,6.8,0);$.rotation.y=Math.PI/4,$.scale.z=0.85,J.add($,i0(0.7,1.6,0.7,Y0.brown,1.8,7.4,-0.6)),J.add(i0(1.1,1.9,0.12,Y0.brown,0.6,2.35,2.52),b9(0.07,Y0.yellow,0.95,2.3,2.6));let Q=(U,H,Y)=>{let W=X9(new t0(1.2,1.1),new C0({color:Y?Y0.yellow:2765936}),U,H,2.53);return J.add(W,i0(1.3,0.08,0.06,Y0.ink,U,H,2.56),i0(0.08,1.2,0.06,Y0.ink,U,H,2.56)),W};this.litWindow=Q(-1.6,4.3,!0),this.litWindow.name="lit-window",this.darkWindows=[Q(1.6,4.3,!1),Q(-1.6,2.3,!1)];let Z=new H0;Z.position.set(-6.5,0.75,1),Z.add(x7(0.3,0.4,2.4,Y0.brown,0,1.2,0),b9(1.6,Y0.dkgreen,0,3.2,0),b9(1.2,Y0.dkgreen,0.9,2.6,0.4)),J.add(Z);for(let U=0;U<9;U++)J.add(i0(0.12,0.9,0.12,Y0.wood,3.6+U*0.6,1,3.2));J.add(i0(5.2,0.1,0.1,Y0.wood,6,1.2,3.2)),this.moon=X9(new p0(1.6,48,32),d8(16774064),9,14,-22),this.moon.name="moon",J.add(this.moon);let K=X9(new p0(2.2,48,32),d8(Y0.yellow));this.sunBall.add(K);for(let U=0;U<12;U++){let H=X9(new g9(0.35,1.6,4),d8(Y0.orange),Math.cos(U/12*Math.PI*2)*3.2,Math.sin(U/12*Math.PI*2)*3.2,0);H.rotation.z=U/12*Math.PI*2-Math.PI/2,this.sunBall.add(H)}this.sunBall.position.set(-7,-3,-24),J.add(this.sunBall)}buildRoom(){let J=this.room;J.add(i0(16,0.2,10,Y0.wood,100,-0.1,0));let Q=X9(new I0(16,7,0.2),this.wallMat,100,3.5,-4.1),Z=X9(new I0(0.2,7,10),this.wallMat,92,3.5,0);Q.name="back-wall",J.add(Q,Z),this.roomWindow=X9(new t0(1.9,1.6),new C0({map:this.skies.night}),97.2,3.1,-3.98),J.add(this.roomWindow,i0(2.1,0.1,0.1,Y0.wood,97.2,3.95,-3.94),i0(2.1,0.1,0.1,Y0.wood,97.2,2.25,-3.94),i0(0.1,1.8,0.1,Y0.wood,97.2,3.1,-3.94),i0(0.1,1.8,0.1,Y0.wood,96.2,3.1,-3.94),i0(0.1,1.8,0.1,Y0.wood,98.2,3.1,-3.94));let K=QJ(512,384,(G)=>{let N=G.createRadialGradient(256,200,20,256,200,250);N.addColorStop(0,"rgba(255,226,90,1)"),N.addColorStop(0.55,"rgba(255,210,60,.65)"),N.addColorStop(1,"rgba(255,210,60,0)"),G.fillStyle=N,G.fillRect(0,0,512,384)});this.glow=X9(new t0(2.6,1.9),new C0({map:K,transparent:!0,opacity:0.6,depthWrite:!1}),100,1.55,-3.99),J.add(this.glow);let U=QJ(512,512,(G)=>{G.fillStyle="#fffdf4",G.beginPath(),G.arc(256,256,250,0,Math.PI*2),G.fill();let N=[];for(let q=0;q<=40;q++)N.push([256+Math.cos(q/40*Math.PI*2)*236,256+Math.sin(q/40*Math.PI*2)*236]);h7(G,N,"#e0302c",22,5);for(let q=1;q<=12;q++){let X=q/12*Math.PI*2-Math.PI/2;R7(G,String(q),256+Math.cos(X)*178,262+Math.sin(X)*178,62,"#1d1b22","center")}}),H=x7(0.52,0.52,0.08,Y0.red,102.7,3.7,-3.96,32);H.rotation.x=Math.PI/2,H.name="clock",J.add(H,X9(new C7(0.47,40),new C0({map:U}),102.7,3.7,-3.915));for(let[G,N,q]of[[this.hourHand,0.24,0.05],[this.minuteHand,0.36,0.035]])G.position.set(102.7,3.7,-3.89),G.add(i0(q,N,0.02,Y0.ink,0,N/2-0.03,0)),J.add(G);J.add(b9(0.04,Y0.ink,102.7,3.7,-3.87)),J.add(i0(3.4,0.12,1.4,Y0.wood,100,1,-3.3));for(let[G,N]of[[-1.55,-3.9],[1.55,-3.9],[-1.55,-2.7],[1.55,-2.7]])J.add(i0(0.12,1,0.12,Y0.brown,100+G,0.47,N));this.chair.position.set(100,0,-2.25),this.chair.add(i0(0.8,0.1,0.8,Y0.red,0,0.48,0.05),i0(0.8,0.9,0.1,Y0.red,0,0.95,0.45)),J.add(this.chair,x7(0.05,0.05,0.43,Y0.ink,100,0.22,-2.2,8),x7(0.4,0.4,0.04,Y0.ink,100,0.02,-2.2,5)),J.add(i0(1,0.05,0.7,10133674,100,1.085,-3.15)),this.lid.position.set(100,1.11,-3.48),this.lid.add(i0(1,0.66,0.03,3108824,0,0.33,0));let Y=X9(new t0(0.9,0.56),new C0({map:this.screenTex}),0,0.34,0.017);Y.name="screen",this.lid.add(Y),J.add(this.lid);let W=QJ(512,256,(G)=>{G.fillStyle="#d9dde3",G.fillRect(0,0,512,256),g7(G,0,0,512,256,"#b9c0c9",12,3),g7(G,0,70,512,120,"#3fae3a",12,4),R7(G,"DIET",128,104,44,"#e0302c","center"),R7(G,"MTN DEW",128,152,50,"#ffffff","center"),R7(G,"DIET",384,104,44,"#e0302c","center"),R7(G,"MTN DEW",384,152,50,"#ffffff","center")});this.mug=new H0,this.mug.name="diet-mtn-dew",this.mug.add(X9(new w0(0.075,0.075,0.25,32,1,!0),new o7({map:W,gradientMap:O$,side:d9}),0,0.125,0),x7(0.07,0.075,0.02,13225686,0,0.26,0),x7(0.075,0.068,0.02,13225686,0,0,0)),this.mug.position.set(99.05,1.06,-3),J.add(this.mug),this.toy.name="toy-axolotl",this.toy.scale.setScalar(0.45),this.toy.rotation.y=Math.PI/2,J.add(this.toy);for(let G=0;G<9;G++)J.add(i0(1.6,0.35*(G+1),0.5,Y0.wood,93.4,0.175*(G+1),3.2-G*0.5-0.25));this.chris.position.set(100,0,-2.25),this.chris.rotation.y=Math.PI,this.wife.position.set(93.4,2.4499999999999997,1.1),this.wife.rotation.y=0.8,J.add(this.chris,this.wife)}buildLagoon(){let J=this.lagoon;this.water=X9(new t0(80,60),$7(3112920),200,0,-10),this.water.rotation.x=-Math.PI/2,this.water.name="water",J.add(this.water);for(let G=0;G<8;G++){let N=X9(new w0(0.45,0.45,0.04,32,1,!1,0.3,Math.PI*1.8),$7(Y0.green),195+B0(G)*10,0.03,-6+B0(G+4)*4);J.add(N)}for(let G=0;G<18;G++){let N=G%2?1:-1,q=X9(new g9(0.07,1.6+B0(G)*1.2,5),$7(Y0.dkgreen),200+N*(4.5+B0(G+1)*3),0.8,-3-B0(G+2)*6);J.add(q)}J.add(b9(1.1,9080729,194.5,-0.4,-4),b9(0.8,9080729,205.2,-0.3,-3));let Q=X9(new p0(2.2,48,32),d8(16774064),207,9,-30);Q.name="lagoon-moon",J.add(Q,this.axo),["C","A","T"].forEach((G,N)=>{let q=GO(G,["#e0302c","#2f6fd8","#3fae3a"][N],N);q.position.set(199+N*1,-1,-1.4),this.blocks.push(q),J.add(q)}),this.goldStar=X9(new B8((()=>{let G=new K8;for(let N=0;N<=10;N++){let q=Math.PI/2+N*Math.PI/5,X=N%2?0.22:0.5;if(N)G.lineTo(Math.cos(q)*X,Math.sin(q)*X);else G.moveTo(Math.cos(q)*X,Math.sin(q)*X)}return G})(),{depth:0.12,bevelEnabled:!1}),$7(Y0.yellow),200,1.9,-1.4),J.add(this.goldStar);let Z=(G,N,q)=>{let X=new H0;return X.add(x7(G,G*0.8,0.3,N,0,0,0,20),x7(G*0.9,G*0.9,0.06,Y0.green,0,0.17,0,20)),q.position.y=0.45,X.add(q),J.add(X),X},K=()=>{let G=new H0;return G.add(x7(0.03,0.03,0.9,Y0.brown,0,0.25,0,6),i0(0.4,0.26,0.02,Y0.red,0.2,0.55,0)),G},U=()=>b9(0.22,Y0.orange),H=()=>X9(new g9(0.22,0.45,5),$7(Y0.purple)),Y=()=>i0(0.32,0.32,0.32,Y0.yellow);this.tiles=[Z(1.1,Y0.tan,K()),Z(0.5,Y0.tan,U()),Z(0.5,Y0.tan,H()),Z(0.5,Y0.tan,Y()),Z(1,Y0.tan,(()=>{let G=new H0;return G.add(b9(0.25,Y0.pink),b9(0.16,Y0.pink,0.25,0.05,0)),G})())];let W=QJ(512,160,(G)=>{G.fillStyle="#fffdf4",G.fillRect(0,0,512,160),cJ(G,8,8,496,144,"#1d1b22",8,4),R7(G,"localhost:5173",256,84,68,"#2f6fd8","center")});J.add(x7(0.8,0.95,0.3,Y0.tan,197,0,0.1,24),b9(0.3,Y0.dkgreen,196.55,0.2,-0.1)),this.islander.position.set(197.15,0.15,0.2),this.islander.rotation.y=0.45,J.add(this.islander),this.sign.add(x7(0.06,0.06,1.8,Y0.brown,0,0.9,-0.08,8),X9(new I0(1.7,0.53,0.06),[$7(Y0.wood),$7(Y0.wood),$7(Y0.wood),$7(Y0.wood),new o7({map:W,gradientMap:O$}),$7(Y0.wood)],0,1.7,0)),this.sign.position.set(202.6,0,-1.6),this.sign.rotation.y=-0.35,J.add(this.sign)}buildBedroom(){let J=this.bedroom;J.add(i0(18,0.2,10,6965900,303,-0.1,0)),J.add(X9(new I0(18,7,0.2),this.bedWall,303,3.5,-4.1)),this.bedWindow=X9(new t0(1.6,1.4),new C0({map:this.skies.night}),302.4,3.2,-3.98),this.bedWindow.name="bedroom-window",J.add(this.bedWindow,i0(1.8,0.1,0.1,Y0.wood,302.4,3.95,-3.94),i0(1.8,0.1,0.1,Y0.wood,302.4,2.45,-3.94)),J.add(i0(3.2,0.5,4.2,Y0.brown,300,0.25,-1.9),i0(3.2,1.5,0.15,Y0.brown,300,1,-3.95)),J.add(i0(3.1,0.25,4,16775144,300,0.62,-1.9));let Q=i0(3.15,0.12,2.9,Y0.blue,300,0.8,-1.3);Q.name="quilt",J.add(Q);for(let H of[-0.75,0.75])J.add(i0(1.1,0.22,0.6,16776692,300+H,0.86,-3.45));let Z=b9(0.5,Y0.blue,299.25,0.86,-1.8);Z.scale.set(1,0.42,2),J.add(Z),this.wifeAsleep.position.set(299.25,0.8,-1.51),this.wifeAsleep.rotation.x=-Math.PI/2+0.2,this.wifeUp.position.set(299.25,0.3,-2.95),Z.position.z=-2,Z.scale.set(1,0.9,2),this.lump=Z,J.add(this.wifeAsleep,this.wifeUp),J.add(this.blackCat=zG("cat-black",!1,299.3,0.86,-0.75,0.4),zG("cat-tux",!0,300.55,0.86,-0.85,-0.3));let K=307;J.add(i0(1.4,0.4,2.6,Y0.red,K,0.2,-2.6),i0(1.35,0.2,2.5,16775144,K,0.5,-2.6),i0(1.4,0.1,1.8,Y0.green,K,0.62,-2.2),i0(0.8,0.16,0.4,16776692,K,0.66,-3.55)),this.kid.position.set(K,0.72,-2),this.kid.rotation.x=-Math.PI/2;let U=b9(0.5,Y0.green,K,0.74,-2.4);U.scale.set(1,0.38,1.15),J.add(this.kid,U),J.add(b9(0.12,Y0.yellow,K-1.1,0.4,-3.9),i0(1.2,2.4,0.1,Y0.wood,K+2.5,1.2,-3.6)),this.nightlight.position.set(K-0.5,1.6,-2.6),J.add(this.nightlight),this.doorLight=X9(new t0(1,3),d8(16770688),K+2.2,0.02,-2.1),this.doorLight.rotation.x=-Math.PI/2,this.doorLight.rotation.z=0.35,J.add(this.doorLight)}buildOffice(){let J=this.office;J.add(i0(40,0.2,10,11580605,410,-0.1,0),i0(40,7,0.2,14672874,410,3.5,-4.1));let Q=(U,H)=>QJ(1024,640,(Y)=>{Y.fillStyle="#ffffff",Y.fillRect(0,0,1024,640),R7(Y,U,40,50,46,"#1d1b22"),H(Y)});this.boards.deck=Q("Q3 Target Architecture v23 (final) (2)",(U)=>{let H=[];for(let Y=0;Y<14;Y++)H.push([80+Y%5*190+B0(Y)*30,130+Math.floor(Y/5)*160+B0(Y+3)*30]);H.forEach(([Y,W],G)=>cJ(U,Y,W,120,70,["#2f6fd8","#3fae3a","#e0302c","#7a3fb0"][G%4],6,G));for(let Y=0;Y<26;Y++){let W=H[Y%14],G=H[(Y*5+3)%14],[N,q,X,F]=[W[0]+60,W[1]+35,G[0]+60,G[1]+35];h7(U,[[N,q],[X,F]],"#1d1b22",3,Y+40);let R=Math.atan2(F-q,X-N);h7(U,[[X-Math.cos(R-0.4)*16,F-Math.sin(R-0.4)*16],[X,F],[X-Math.cos(R+0.4)*16,F-Math.sin(R+0.4)*16]],"#1d1b22",3,Y+70)}}),this.boards.calendar=Q("Thursday",(U)=>{["9:00  standup","9:30  standup prep (for 10:00)","10:00  standup for the standup","11:00  sync","11:30  sync about the sync","1:00  sync to double-check","2:00  pre-sync","3:00  standup retro"].forEach((Y,W)=>{g7(U,40,100+W*66,940,54,["#9fd3f5","#ffe36a","#f79cc4","#b7e4a0"][W%4],10,W),R7(U,Y,60,128+W*66,38,"#1d1b22")})}),this.board=X9(new t0(4.2,2.62),new C0({map:this.boards.deck}),400,2.4,-2.5),J.add(this.board,i0(4.4,2.8,0.08,Y0.ink,400,2.4,-2.56));for(let U of[-1,1])J.add(i0(0.1,1.2,0.1,Y0.ink,400+U*1.6,0.6,-2.55));this.presenter.position.set(397.3,0,-1.6),this.presenter.rotation.y=0.4,J.add(this.presenter);for(let U=0;U<4;U++){let H=M8({name:`standup-${U}`,shirt:[Y0.purple,Y0.green,Y0.orange,10133674][U],pants:Y0.ink,hair:[Y0.ink,Y0.brown,Y0.yellow,9080729][U],seed:10+U}),Y=U/4*Math.PI*2;H.position.set(400.6+Math.sin(Y)*0.9,0,0.2+Math.cos(Y)*0.9),H.rotation.y=Y+Math.PI,this.huddle.push(H),J.add(H)}let Z=420;J.add(i0(10,0.03,0.03,Y0.ink,Z+1,3.2,-1),i0(0.1,3.4,0.1,Y0.brown,Z-4,1.6,-1),i0(0.1,3.4,0.1,Y0.brown,Z+6,1.6,-1)),[["TICKET","#4127"],["SPRINT 23","velocity: 41"],["APPROVAL","BOARD"],["ROADMAP","slide 1 of 64"],["STEERING","REVIEW"]].forEach(([U,H],Y)=>{let W=QJ(512,400,(q)=>{q.fillStyle="#fffdf4",q.fillRect(0,0,512,400),cJ(q,10,10,492,380,"#1d1b22",8,Y),R7(q,U,256,150,80,"#1d1b22","center"),R7(q,H,256,270,54,"#7a3fb0","center")}),G=new H0;G.position.set([Z-2.6,Z-1.2,Z+0.2,Z+1.9,Z+3.3][Y],2.55,-1);let N=X9(new t0(1.2,0.94),new C0({map:W}),0,0,0);G.add(N,i0(0.06,0.16,0.04,Y0.wood,-0.35,0.5,0.02),i0(0.06,0.16,0.04,Y0.wood,0.35,0.5,0.02));for(let q of[-1,1]){let X=i0(1.4,0.09,0.02,Y0.red,0,0,0.03);X.rotation.z=q*0.62,G.add(X)}G.name=`card-${Y}`,this.cards.push(G),this.line.add(G)}),J.add(this.line)}buildDinner(){let J=this.dinner;J.add(i0(12,0.2,10,Y0.wood,500,-0.1,0),i0(12,7,0.2,16175979,500,3.5,-4.1));let Q=X9(new t0(2.2,1.6),new C0({map:this.skies.dusk}),500,3,-3.98);Q.name="dinner-window",J.add(Q,i0(2.4,0.1,0.1,Y0.wood,500,3.85,-3.94),i0(2.4,0.1,0.1,Y0.wood,500,2.15,-3.94)),J.add(i0(2.6,0.12,1.4,Y0.red,500,0.95,0),i0(2.5,0.06,1.3,16776692,500,1.03,0));for(let Z of[-1,1])J.add(i0(0.12,0.9,1.2,Y0.brown,500+Z*1.15,0.45,0));for(let Z of[-1,1])J.add(x7(0.28,0.24,0.04,16777215,500+Z*0.8,1.08,0,20),b9(0.14,Y0.orange,500+Z*0.8,1.13,0)),J.add(i0(0.7,0.1,0.7,Y0.blue,500+Z*1.75,0.5,0));J.add(x7(0.18,0.4,0.3,Y0.yellow,500,3.3,0),x7(0.01,0.01,1.2,Y0.ink,500,4,0,4)),this.diner.position.set(501.75,0,0),this.diner.rotation.y=-Math.PI/2,this.son.position.set(498.25,0.3,0),this.son.rotation.y=Math.PI/2,J.add(this.diner,this.son)}buildXmas(){let J=this.xmas;J.add(i0(16,0.2,10,10246716,600,-0.1,0),i0(16,7,0.2,3817354,600,3.5,-4.1));let Q=new H0;Q.position.set(596.6,0,-2.6),Q.add(x7(0.15,0.2,0.5,Y0.brown,0,0.25,0)),[[1.3,1.4,1],[1,1.2,1.8],[0.7,1,2.5]].forEach(([U,H,Y])=>Q.add(X9(new g9(U,H,20),$7(Y0.dkgreen),0,Y,0))),Q.add(X9(new QQ(0.22),d8(Y0.yellow),0,3.15,0));for(let U=0;U<10;U++)Q.add(b9(0.08,[Y0.red,Y0.yellow,Y0.blue,Y0.pink][U%4],Math.cos(U*2.1)*(0.4+U%3*0.3),0.9+U%5*0.4,Math.sin(U*2.1)*(0.4+U%3*0.3)+0.3));J.add(Q);for(let U=0;U<4;U++)J.add(i0(0.5,0.4,0.5,[Y0.red,Y0.blue,Y0.yellow,Y0.purple][U],595.8+U*0.6,0.2,-1.5+U%2*0.5));let Z=new H0;Z.position.set(602.5,0,-0.2),Z.rotation.y=-Math.PI/2+0.35,Z.add(i0(0.9,0.05,0.6,10133674,0,0.03,0.3));let K=new H0;K.position.set(0,0.05,0),K.rotation.x=-0.2,K.add(i0(0.9,0.58,0.03,3108824,0,0.29,0),X9(new t0(0.82,0.5),new C0({map:this.screenTex}),0,0.3,0.017)),Z.add(K),J.add(Z);for(let U=0;U<3;U++){let H=U===0?M8({name:"xmas-abby",...VG,shirt:Y0.pink,pants:Y0.purple,seed:20,scale:0.7}):M8({name:`xmas-kid-${U}`,shirt:[Y0.pink,Y0.yellow,Y0.orange][U],pants:Y0.navy,hair:[5911576,11887901,Y0.ink][U],seed:20+U,scale:0.6});H.position.set(598.4+[1,0,2][U]*0.8,0,0),H.rotation.y=Math.PI/2-0.5,this.waiters.push(H),J.add(H)}this.xmasChris.position.set(600.95,0,0),this.xmasChris.rotation.y=Math.PI/2-0.5,J.add(this.xmasChris)}drawScreen(J,$,Q){let Z=J,K=0,U=0;if(J==="prompt")Z+=K=Math.floor(($-Q)*14);if(J==="init")Z+=K=Math.floor(($-Q-0.6)*16);if(J==="tabs")Z+=U=L9(Math.floor(($-L(19))/0.55)+1,0,5);if(J==="farwonder")Z+=U=Math.floor(L9(($-Q)/0.35,0,9));if(J==="blank")Z+=Math.floor($*2)%2;if(Z===this.screenKey)return;this.screenKey=Z;let H=this.screenCanvas.getContext("2d"),Y=(G,N="#7ee08a")=>{H.fillStyle="#2d3a8c",H.fillRect(0,0,O7,b7),g7(H,0,0,O7,b7,"#1f2a70",14,2),G.forEach((q,X)=>R7(H,q,44,90+X*120,74,X%2?"#ffffff":N,"left","Gochi Hand"))},W=(G,N)=>G.slice(0,Math.max(0,N));switch(J){case"off":H.fillStyle="#1a1c26",H.fillRect(0,0,O7,b7);break;case"blank":if(H.fillStyle="#ffffff",H.fillRect(0,0,O7,b7),g7(H,0,0,O7,50,"#9fd3f5",10,1),Math.floor($*2)%2)h7(H,[[60,110],[60,170]],"#1d1b22",6,2);break;case"farwonder":{H.fillStyle="#ffffff",H.fillRect(0,0,O7,b7),WK(H,O7,b7,["#ffe36a","#9fd3f5","#f79cc4"],6,4,40,90,6);let G="Farwonder",N=["#e0302c","#f28a1e","#e0b000","#3fae3a","#2f6fd8","#7a3fb0","#d8337f","#e0302c","#3fae3a"];H.font='700 150px "Gaegu"';let q=(O7-H.measureText(G).width)/2;for(let X=0;X<Math.min(U,G.length);X++)R7(H,G[X],q,250,150,N[X]),q+=H.measureText(G[X]).width;if(U>=9)_G(H,O7/2+40,470,90,3);break}case"init":Y([`$ ${W("git init",K)}`,K>10?"new repo: ~/farwonder":"",K>18?`$ ${W("make a 3D lagoon",K-18)}`:"",K>40?"✓ ready on localhost:5173":""]);break;case"lagoon":case"localhost":{H.fillStyle="#ffffff",H.fillRect(0,0,O7,b7),g7(H,0,0,O7,b7*0.55,"#24307a",16,7),g7(H,0,b7*0.55,O7,b7*0.45,"#2f7fd8",14,8),E$(H,820,110,60,"#fff3b0",3);for(let G=0;G<9;G++)E$(H,60+B0(G)*900,40+B0(G+9)*220,12,"#ffd320",G);if(_G(H,520,420,110,5),J==="localhost")H.fillStyle="#eef0f5",H.fillRect(0,0,O7,70),cJ(H,30,12,700,46,"#8c8f99",4,2),R7(H,"localhost:5173",50,37,40,"#2f6fd8","left","Gochi Hand");break}case"prompt":Y(["> "+W("just one more prompt",K),K>22?"✓ done! another level?":"",K>34?"> "+W("yes",K-34):""],"#ffd320");break;case"tabs":{H.fillStyle="#dfe3ea",H.fillRect(0,0,O7,b7);for(let N=0;N<U;N++){let q=30+N*190;g7(H,q,20,175,56,N===U-1?"#ffffff":"#b9c0cc",10,N),cJ(H,q,20,175,56,"#1d1b22",4,N),R7(H,`claude ${N+1}`,q+18,50,34,"#1d1b22","left","Gochi Hand")}H.fillStyle="#ffffff",H.fillRect(20,90,O7-40,b7-110);let G=["level 2: counting fish","fix: axolotl swims backwards","add: sub-games menu","spelling bee in the lagoon","dark mode for the moon"];for(let N=0;N<U;N++)R7(H,`✓ ${G[N]}`,50,150+N*80,46,"#3fae3a","left","Gochi Hand");break}case"github":H.fillStyle="#ffffff",H.fillRect(0,0,O7,b7),R7(H,"farwonder",50,70,70,"#1d1b22"),E$(H,640,70,34,"#ffd320",1),R7(H,"2",690,74,64,"#1d1b22"),h7(H,[[40,130],[O7-40,132]],"#c0c4cc",4,3),E$(H,90,230,40,"#ffd320",4),R7(H,"chris (me)",150,234,60,"#1d1b22"),E$(H,90,360,40,"#ffd320",5),R7(H,"mom",150,364,60,"#d8337f");{let G=[];for(let N=0;N<=36;N++){let q=N/36*Math.PI*2;G.push([322+22*Math.sin(q)**3,352-1.35*(13*Math.cos(q)-5*Math.cos(2*q)-2*Math.cos(3*q)-Math.cos(4*q))])}H.fillStyle="#e0302c",H.beginPath(),G.forEach(([N,q],X)=>X?H.lineTo(N,q):H.moveTo(N,q)),H.fill(),h7(H,G,"#b0201c",5,6)}break;case"limit":H.fillStyle="#fff4e6",H.fillRect(0,0,O7,b7),cJ(H,40,40,O7-80,b7-80,"#e0302c",12,3),R7(H,"usage limit reached",O7/2,210,84,"#e0302c","center"),R7(H,"back at 3:00 AM",O7/2,380,110,"#1d1b22","center");break;case"call":{H.fillStyle="#ffffff",H.fillRect(0,0,O7,b7),[["#f3c9a1","#7a3fb0","denise"],["#e0b48a","#3fae3a","kevin"],["#f7cdb0","#2f6fd8","me"],["#c68e62","#f28a1e","priya"]].forEach(([N,q,X],F)=>{let R=30+F%2*492,M=20+Math.floor(F/2)*305;if(g7(H,R,M,470,290,"#eef0f5",12,F),cJ(H,R,M,470,290,X==="me"?"#e0302c":"#1d1b22",6,F),H.fillStyle=q,H.beginPath(),H.ellipse(R+235,M+290,120,70,0,Math.PI,0),H.fill(),H.fillStyle=N,H.beginPath(),H.arc(R+235,M+150,70,0,Math.PI*2),H.fill(),h7(H,[[R+205,M+140],[R+215,M+140]],"#1d1b22",8,F),h7(H,[[R+255,M+140],[R+265,M+140]],"#1d1b22",8,F+1),X==="me")for(let D of[210,260])h7(H,[[R+D-14,M+160],[R+D,M+168],[R+D+14,M+160]],"#7a3fb0",5,D);h7(H,[[R+215,M+185],[R+235,M+195],[R+255,M+185]],"#1d1b22",6,F+2),R7(H,X,R+20,M+30,36,"#1d1b22","left","Gochi Hand")});break}}this.screenTex.needsUpdate=!0}flash(J){return 0}fade(J){return 0}update(J){let $=cH(J),Q=$.at,Z=QO($),K=U0(J,Q,Z),U=$.name,H=J>=PG();for(let O of[this.house,this.room,this.lagoon,this.bedroom,this.office,this.dinner,this.xmas])O.visible=!1;let Y=this.camera,W=R8();Y.fov=40,Y.up.set(0,1,0),this.hemi.intensity=1.9,this.sun.intensity=1.6,this.backdrop.material.map=H?this.skies.dawn:this.skies.night,dH.get(Y0.skin).emissiveIntensity=H?0.1:0.3;let G=/chorus/.test($.section),N=Z9(U0(J,Q,Q+(G?0.4:0.7)));if(Q===0)N=Z9(U0(J,0,1.1));N*=1-a0(n0(47)+0.6,n0(47)+1.4,J);let q=this.post.material.uniforms;q.reveal.value=N,q.seed.value=TQ().indexOf($)*3.71%50,q.boil.value=Math.floor(J*8)*1.37;let X=KO(J),F=U==="spin",R=F?X+(J-Q)*600:X;this.minuteHand.rotation.z=-(R%60/60)*Math.PI*2,this.hourHand.rotation.z=-(R/60%12/12)*Math.PI*2,LG(this.axo,J);let M="lagoon",D=(O)=>{this.wallMat.color.setHex(O?3422590:16181160),this.roomWindow.material.map=O?this.skies.night:this.skies.dawn,this.glow.visible=O,this.hemi.intensity=O?1.2:1.9,this.sun.intensity=O?0.7:1.6},E=(O)=>{A8(this.chris,J,{sit:!0,reach:1,...O}),this.chair.rotation.y=O.turn??0};this.toy.visible=!1,this.wife.visible=!1,this.lid.rotation.x=-0.22;let I=100;switch(U){case"night":case"window":case"sunrise":{this.house.visible=!0,this.litWindow.material.color.setHex(Y0.yellow);for(let O of this.darkWindows)O.material.color.setHex(H?10474485:2765936);if(this.grass.material.color.setHex(H?Y0.green:3111482),this.moon.visible=!H,this.sunBall.visible=H,this.hemi.intensity=H?2:1.3,this.sunBall.position.y=U==="sunrise"?$.n===0?w(-3,6,Z9(K)):w(7,10,K):9,this.sunBall.rotation.z=J*0.3,U==="night")Y.position.set(w(1,-0.6,K),w(3.6,4.1,K),w(28,14,p8(K)*0.4+K*0.6)),W.set(-1,w(4.2,4.3,K),0);else if(U==="window")Y.position.set(w(-1.4,1.2,K),w(4.3,4.6,K),w(6.5,19,Z9(K))),W.set(-1.2,4.1,0);else if($.n===0)Y.position.set(0,w(2.6,3.4,K),w(23,18,K)),W.set(0,4.5,0),Y.fov=46;else Y.position.set(w(-9,-6,K),w(3,3.8,K),w(16,13.5,K)),W.set(0,5,-2),Y.fov=48;break}case"okay":case"farwonder":case"init":case"talk":case"blast":case"twoam":case"spin":case"prompt":case"toy":case"tabs":case"stars":case"limit":case"stairs":case"fun":case"glow":case"dew":case"standup":{this.room.visible=!0,D(!(H||U==="dew"||U==="standup")),E({}),M=U==="okay"?K<0.25?"off":"blank":U==="farwonder"?"farwonder":U==="init"?"init":U==="prompt"?"prompt":U==="tabs"?"tabs":U==="stars"?"github":U==="limit"?"limit":U==="standup"?"call":"lagoon",this.mug.visible=U==="dew"||U==="standup"||U==="limit";let O=R8(I,1.44,-3.55),B=(_,A,V=38)=>{Y.position.set(I+w(0.06,0,K),w(1.52,1.47,K),-3.55+w(_,A,Z9(K))),W.copy(O),Y.fov=V};switch(U){case"okay":{this.lid.rotation.x=w(Math.PI/2,-0.22,w9(U0(J,Q+0.15,Q+1.1))),E({talk:a0(L(0),L(0)+0.1,J)*(1-a0(n0(0),n0(0)+0.1,J))}),Y.position.set(I+w(1.2,0.7,K),w(2.1,1.9,K),w(-0.6,-1,K)),W.set(I,1.25,-3.3);break}case"farwonder":case"prompt":case"tabs":case"stars":case"limit":B(0.98,0.84);break;case"init":{let _=a0(0.22,0.42,K);Y.position.lerpVectors(R8(I+2.4,3.4,-1.6),R8(I+0.1,1.52,-2.62),_),W.lerpVectors(R8(I+2.7,3.7,-3.95),O,_),Y.fov=38;break}case"talk":{let _=J>t(7,/^\W*teach/i)&&J<n0(7)?0.5+0.5*Math.abs(Math.sin(J*16)):0;E({lean:-0.15,talk:_}),Y.position.set(I+w(2.7,2.3,K),w(1.9,1.75,K),w(-1.3,-1.6,K)),W.set(I-0.1,1.35,-2.8);break}case"blast":{let _=a0(t(10,/^blast/i)-0.3,t(10,/^blast/i),J);E({reach:1-_,arms:[_*0.9,_*0.9],bounce:_}),Y.position.set(I-1+K*0.4,w(2.4,2.2,K),w(0.6,-0.1,K)),W.set(I,1.35,-3.4);break}case"twoam":case"spin":{let _=R8(I+2.7,3.7,-3.95);if(Y.position.set(_.x-0.15+K*0.1,_.y-0.1,_.z+w(1.7,1.25,Z9(K))),W.copy(_),Y.fov=38,F)Y.up.set(Math.sin(J*3)*0.18,1,0).normalize();break}case"toy":{let _=Z9(U0(J,Q,Q+0.5)),A=r7(J);if(E({reach:0,arms:[_,_],bounce:1}),this.toy.visible=!0,this.toy.position.set(I,w(1.3,1.95,_)+A*0.05,-2.25),this.toy.rotation.z=Math.sin(J*Math.PI*2.1)*0.12,LG(this.toy,J,1.4),$.n===0)Y.position.set(I+w(0.7,0.45,K),2.1,-3.35),W.set(I,1.72,-2.25),Y.fov=58;else if($.n===1)Y.position.set(I+w(1.8,1.6,K),1.55,w(-3,-2.85,K)),W.set(I,1.72,-2.25),Y.fov=54;else Y.position.set(I+w(1.5,1.3,K),2.5,-3.75),W.set(I,1.65,-2.25),Y.fov=56;break}case"stairs":{this.wife.visible=!0;let _=8-Math.min(3,Math.floor(U0(J,Q,Q+1.2)*4));this.wife.position.set(I-6.6,0.345+_*0.35,2.95-_*0.5),A8(this.wife,J,{talk:J>t(25,/^\W*is/i)&&J<n0(25)?0.15+0.2*Math.abs(Math.sin(J*14)):0,arms:[0,0.2]}),E({turn:2*a0(Q+0.6,Q+1.4,J),reach:1-a0(Q+0.6,Q+1,J)}),Y.position.set(I-3.4+K*0.2,w(3,2.9,K),w(4.4,4.1,K)),W.set(I-6.5,2.75,0.6);break}case"fun":{let _=a0(Q,Q+0.6,J);E({turn:2.5*_,reach:1-_,arms:[0,0.5*a0(t(26,/^fun/i)-0.2,t(26,/^fun/i),J)],talk:J>t(26,/^\W*no/i)&&J<n0(26)?0.4+0.4*Math.abs(Math.sin(J*15)):0}),Y.position.set(I-w(1.6,1.3,K),w(1.75,1.65,K),w(-0.4,-0.75,K)),W.set(I,1.4,-2.3);break}case"glow":{E({}),Y.position.set(I+w(0.3,0,K),w(2.45,2.35,K),w(3.2,2,K)),W.set(I,0.85,-3.4),Y.fov=44;break}case"dew":{E({reach:0,turn:2.5});let{arms:_,head:A}=this.chris.userData,V=0.5+0.5*Math.sin(J*2.4);_[1].quaternion.setFromUnitVectors(R8(0,-1,0),R8(-0.35,w(0.25,0.45,V),0.85).normalize()),this.chris.updateMatrixWorld(!0);let z=_[1].localToWorld(R8(0,-0.62,0)),k=A.localToWorld(R8(0,-0.07,0.21)).sub(z).normalize().lerp(R8(0,1,0),0.35).normalize();this.mug.quaternion.setFromUnitVectors(R8(0,1,0),k);let f=R8(-1,0,0).transformDirection(this.chris.userData.body.matrixWorld);this.mug.position.copy(z).addScaledVector(k,-0.13).addScaledVector(f,0.13),Y.position.set(I-w(1.5,1.2,K),w(1.8,1.7,K),w(-0.3,-0.6,K)),W.set(I,1.35,-2.25);break}case"standup":{this.mug.position.set(I-0.95,1.06,-3);let _=a0(L(47),L(47)+0.6,J)*(1-a0(L(47)+1.6,L(47)+2.2,J));E({talk:_*1.4}),Y.position.set(I+w(1.3,1,K),w(2.45,2.3,K),w(-0.5,-0.9,K)),W.copy(O),Y.fov=40;break}}if(U!=="dew")this.mug.rotation.set(0,0,0);if(U!=="dew"&&U!=="standup")this.mug.position.set(I-0.95,1.06,-3);break}case"lagoon":case"cat":case"whoa":case"games":case"localhost":{this.lagoon.visible=!0,this.hemi.intensity=H?2:1.5,this.water.material.color.setHex(H?4889576:2781136),this.blocks.forEach((_)=>_.visible=!1),this.goldStar.visible=!1,this.tiles.forEach((_)=>_.visible=!1),this.sign.visible=U==="localhost",this.islander.visible=U==="games";let O=this.axo,B=200;if(O.rotation.set(0,0,0),O.scale.setScalar(U==="cat"?0.8:1),U==="lagoon"){let _=w(-3.5,2.5,K);O.position.set(B+_,0.12+Math.sin(J*2)*0.05,0.2),O.rotation.y=Math.PI/2+Math.sin(J*2.2)*0.15,Y.position.set(B+_*0.6-0.6,w(1.5,1.2,K),4.4),W.set(B+_*0.8,0.4,0)}else if(U==="cat"){this.blocks.forEach((A,V)=>{let z=t(8,/^c-a-t|^c$/i)+V*0.22;A.visible=!0,A.position.y=w(-1,0.42,w9(U0(J,z,z+0.35))),A.rotation.y=Math.sin(J*2+V)*0.08});let _=t(8,/^proud/i);this.goldStar.visible=J>_-0.3,this.goldStar.scale.setScalar(w9(U0(J,_-0.3,_+0.1))),this.goldStar.rotation.y=J*2,O.position.set(B-2.4,0.12,-1.5),O.rotation.y=0.7,O.rotation.z=Math.sin(J*8)*0.06,Y.position.set(B-0.3,w(1.5,1.3,K),w(3.9,3.2,K)),W.set(B-0.3,0.6,-1.3)}else if(U==="whoa"){O.position.set(B,0.15+Math.abs(Math.sin(J*Math.PI*2.08))*0.35,0),O.rotation.y=J*0.8,O.rotation.z=Math.sin(J*Math.PI*2.08)*0.25;let _=0.6+K*1.2+$.n;Y.position.set(B+Math.sin(_)*4.4,1.5,Math.cos(_)*4.4),W.set(B,0.5,0)}else if(U==="games"){let _=[t(21,/^games/i),t(21,/^sub/i),t(21,/^sub/i)+0.18,t(21,/^sub/i)+0.36,t(21,/^another/i)],A=[[-1.6,-1.2],[-0.2,0.3],[0.5,-0.6],[-0.9,0.9],[1.9,-1.4]];this.tiles.forEach((z,y)=>{let k=w9(U0(J,_[y]-0.15,_[y]+0.25));z.visible=k>0.01,z.position.set(B+A[y][0],w(-0.8,0.08,k),A[y][1]),z.scale.setScalar(Math.max(0.01,k)),z.rotation.y=J*0.3+y}),O.position.set(B+1.4,0.12,0.8),O.rotation.y=-1;let V=J>L(21)&&J<n0(21)+0.2;A8(this.islander,J,{arms:[V?0.9:0.2,V?0.9:0.1],bounce:1,talk:V?0.3+0.4*Math.abs(Math.sin(J*14)):0}),Y.position.set(B+w(0.6,0.2,K),w(3.4,3,K),w(5.6,4.8,K)),W.set(B,0.2,-0.4)}else{let _=w(-1.4,0.7,K),A=w(-1.8,-0.8,Z9(K));O.position.set(B+_,0.12,A),O.rotation.y=0.2,Y.position.set(B+0.4,w(1.4,1.2,K),w(4.6,4.2,K)),W.set(B+0.8,0.8,-1)}break}case"cats":case"bed":case"shh":{this.bedroom.visible=!0,this.hemi.intensity=H?1.8:1.1,this.sun.intensity=H?1.4:0.5;let O=300,B=U==="bed"&&$.n!==1;this.wifeAsleep.visible=!B,this.wifeUp.visible=B,this.lump.scale.y=B?0.55:0.6,this.bedWall.color.setHex(H?16181160:2896758),this.bedWindow.material.map=H?this.skies.dawn:this.skies.night,this.nightlight.intensity=U==="shh"?3:0;let _=B&&$.n===0&&J>Q+0.8;for(let A of["eyeL","eyeR"]){let[V,z]=this.blackCat.userData[A];V.visible=!_,z.visible=_}if(B){let A=$.n===0?w(1,0.25,a0(Q+1.6,Q+2.2,J)):0.2+Math.sin(J*1.3)*0.15;A8(this.wifeUp,J,{sit:!0,turn:A,arms:[0.1,$.n===0?0.25*(1-a0(Q+1.4,Q+1.8,J)):0.15]})}else A8(this.wifeAsleep,J,{});if(U==="cats")Y.position.set(O+w(1,0.6,K),w(3.1,2.8,K),w(3.2,2.4,K)),W.set(O,0.8,-1.4);else if(U==="bed")Y.position.set(O-w(1.9,1.6,K),w(2.6,2.45,K),w(0.9,0.4,K)),W.set(O+0.1,1.05,-2.7);else A8(this.kid,J,{}),this.kid.userData.head.rotation.y=0.6,Y.position.set(O+7+w(1.7,1.4,K),w(2,1.85,K),w(-1.2,-1.5,K)),W.set(O+7,0.75,-3);break}case"deck":case"calendar":{if(this.office.visible=!0,this.board.material.map=this.boards[U],this.huddle.forEach((O)=>O.visible=U==="calendar"),this.presenter.visible=U==="deck",this.line.visible=!1,this.board.visible=!0,A8(this.presenter,J,{arms:[0,0.45+Math.sin(J*3)*0.05],talk:0.3*Math.abs(Math.sin(J*9))}),this.huddle.forEach((O,B)=>A8(O,J+B,{talk:B===Math.floor(J*1.5)%4?0.5:0})),U==="deck")Y.position.set(400+w(-0.5,0,K),w(2.3,2.2,K),w(3.6,2.6,K)),W.set(399.6,2,-2.5);else Y.position.set(400+w(2.6,2,K),w(2.6,2.3,K),w(4,3.2,K)),W.set(400.2,1.4,-1);break}case"nope":{this.office.visible=!0,this.line.visible=!0,this.presenter.visible=!1,this.huddle.forEach((_)=>_.visible=!1),this.board.visible=!1;let O=[t(35,/^ticket/i),t(35,/^sprint/i),t(35,/^board/i),t(36,/^slide/i),t(36,/^steering/i)];this.cards.forEach((_,A)=>{let V=Z9(U0(J,O[A]-0.05,O[A]+0.3));_.children.slice(3).forEach((z,y)=>z.scale.x=Math.max(0.001,L9(V*2-y))),_.rotation.z=Math.sin(J*1.3+A)*0.04+(V>0.9?0.06*Math.sin(A*3):0)});let B=$.n===0?418.8:422.6;Y.position.set(B+w(-0.2,0.2,K),2.3,w(3.9,3.5,K)),W.set(B,2.3,-1),Y.fov=42;break}case"dinner":{this.dinner.visible=!0;let O=J>t(3,/^\W*can/i)&&J<n0(3)?0.4+0.5*Math.abs(Math.sin(J*15)):0;A8(this.son,J,{sit:!0,talk:O,arms:[0,O?0.8:0.1],bounce:O?0.6:0}),A8(this.diner,J,{sit:!0,reach:0.3}),Y.position.set(500+w(-0.3,0,K),w(2.1,1.9,K),w(4,3.2,K)),W.set(500,1.15,0);break}case"xmas":{this.xmas.visible=!0,M="limit",this.waiters.forEach((_,A)=>A8(_,J+A*0.3,{kneel:!1,bounce:1,arms:[0.1,0.1]}));let O=a0(t(24,/^one/i)-0.3,t(24,/^one/i),J);A8(this.xmasChris,J,{kneel:!0,bounce:1,arms:[O*0.9,O*0.9]});let B=a0(0.3,0.85,K);Y.position.set(600+w(-0.9,0.6,B),w(1.4,1.3,K),3.3),W.set(600+w(-0.8,1.2,B),0.8,-0.2);break}case"end":{this.house.visible=!0,Y.position.set(0,3.4,18),W.set(0,4.5,0);break}}this.drawScreen(M,J,Q),Y.lookAt(W),Y.updateProjectionMatrix();let C=240*Math.tan(fU.degToRad(Y.fov/2))*1.05;this.backdrop.scale.set(C*1.7777777777777777,C,1),Y.updateMatrixWorld()}render(){this.renderer.setRenderTarget(this.target),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(null),this.renderer.render(this.postScene,this.postCam)}}var NO=/^(two|seven|a-m|limit|three|work\?"|work|sleep\?\)|sleep|gone|night|standup|minutes|ten)$/,XO=/^(claude|terminal|git|init|prompt|localhost|github|tabs|deck|sync|screen's|screen)$/,qO=/^(axolotl|game|games|sub-games|another|fun|blast|toy|girl|boy|proud|c-a-t|mom|me|farwonder|lagoon|moon|kids|cats|bed|whoa-oh-oh)$/,TG={title:"Ten More Minutes",fonts:['700 100px "Gaegu"','400 60px "Gochi Hand"'],overlays:()=>`
  <div class="ov title" data-show="0.4|L1-0.6">Ten More Minutes<small>9:04 PM · just one quick thing</small></div>
  <div class="ov bubble kid" data-show="W3:can-0.1|E3+0.5" data-at="W3:can-0.1">Can you make a game?</div>
  <div class="ov bubble me left" data-show="W7:teach-0.1|E7+0.3" data-at="W7:teach-0.1">Teach the kids to read!</div>
  <div class="ov zzz" data-show="L9|L10-0.2"><span data-at="L9+0.2">z</span><span data-at="L9+0.6">z</span><span data-at="L9+1.0">z</span></div>
  <div class="ov bubble wife bed" data-show="L18+0.4|L19-0.6" data-at="L18+0.4">Chris…?</div>
  <div class="ov bubble kid" data-show="L21|E21+0.2" data-at="L21">More games!</div>
  <div class="ov bubble wife" data-show="W25:is-0.1|E25+0.3" data-at="W25:is-0.1">Is this for work?</div>
  <div class="ov bubble me" data-show="W26:no-0.1|E26+0.5" data-at="W26:no-0.1">No, it's just for fun ♥</div>
  <div class="ov kids" data-show="W16:girl-0.1|L17-0.25"><span class="abby" data-at="W16:girl-0.05">for Abby ♥</span><span class="logan" data-at="W16:boy-0.05">for Logan ★</span></div>
  <div class="ov kids" data-show="W32:girl-0.1|L33-0.25"><span class="abby" data-at="W32:girl-0.05">for Abby ♥</span><span class="logan" data-at="W32:boy-0.05">for Logan ★</span></div>
  <div class="ov kids" data-show="W44:girl-0.1|L45-0.25"><span class="abby" data-at="W44:girl-0.05">for Abby ♥</span><span class="logan" data-at="W44:boy-0.05">for Logan ★</span></div>
  <div class="ov chip call" data-show="L47-0.3|E47+1.2">standup · 7:15 AM</div>`,endAt:()=>n0(47)+1.4,words:{hot:NO,ice:XO,gold:qO},hud:(J,$)=>{let Q=nH(J),Z=Math.max(0,Math.round(Q-544));return{left:`ten more minutes &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`it's <b>${CG(Q)}</b> &nbsp;·&nbsp; promised <span class="ice">10 min</span> &nbsp;·&nbsp; spent <b>${J<L(5)?0:Z} min</b>`}},shots:lH,shotAt:cH,world:(J)=>new iH(J)};var wG={"24-the-steep-part":qG,"04-read-the-diff":YG,"25-data-here-data-there":MG,"02-never-again":rW,"08-explain-the-function":QG,"30-ten-more-minutes":TG};var ZJ=window.__SONG__,FO="https://chris.towles.dev/i-cant-clap",bG=(J,$)=>`<a class="${J}" href="${FO}">${$}</a>`,[,,iJ="",wQ=""]=ZJ?["","",ZJ.slug,ZJ.clipId]:location.pathname.split("/"),xG=new URLSearchParams(location.search),DO=xG.has("render");async function EO(){if(ZJ)return ZJ;let J=await fetch(`/api/timings/${iJ}/${wQ}`);if(!J.ok)throw Error(`No timings for ${iJ}/${wQ}`);return J.json()}var hG=wG[iJ];if(!hG)throw Error(`No music video for ${iJ}`);var L8=hG;document.title=`${L8.title} · video`;document.querySelector(".stage").setAttribute("data-song",iJ);var{shots:sH,shotAt:OO}=L8,oH=await EO();if(!oH.features)throw Error("No audio features yet; run bun timings");mW(oH.lines,oH.features);var SJ=_7();await Promise.all(L8.fonts.map((J)=>document.fonts.load(J)));var N8=(J)=>document.querySelector(J),RO=N8(".stage"),nJ=L8.world(N8("#gl"));function KJ(J){let $=J.trim().match(/^(?:([LEW])(\d+)(?::([\w'-]+))?|([\d.]+))([+-][\d.]+)?$/);if(!$)throw Error(`Bad time "${J}"`);let[,Q,Z,K,U,H]=$,Y=Number(Z);return(U?Number(U):Q==="L"?L(Y):Q==="E"?n0(Y):t(Y,new RegExp(`^\\W*${K}`,"i")))+Number(H??0)}var sJ=N8("#overlays");sJ.innerHTML=`${L8.overlays(SJ)}
  <div class="ov endcard" data-show="${L8.endAt()}|${SJ+5}"><big>${L8.title}</big><span class="by">by Chris Towles</span>made with Claude Code, Opus 5.5 and Suno<small class="made">${YY(iJ)}</small>${ZJ?bG("album","← I Can't Clap · all the videos"):""}</div>`;var gG=[...sJ.querySelectorAll("[data-show]")].map((J)=>{let[$,Q]=J.dataset.show.split("|");return{el:J,at:KJ($),until:KJ(Q)}}),MO=[...sJ.querySelectorAll("[data-at]:not([data-count]):not(.fill):not(.draw):not(.type)")].filter((J)=>!J.hasAttribute("data-show")).map((J)=>({el:J,at:KJ(J.dataset.at)})),VO=[...sJ.querySelectorAll(".fill")].map((J)=>({el:J,at:KJ(J.dataset.at),until:KJ(J.dataset.until)})),_O=[...sJ.querySelectorAll("[data-count]")].map((J)=>{let[$,Q]=J.dataset.count.split(",").map(Number);return{el:J,from:$,to:Q,at:KJ(J.dataset.at),until:KJ(J.dataset.until),fmt:J.dataset.fmt??""}}),BO=[...sJ.querySelectorAll(".type")].map((J)=>({el:J,text:J.textContent??"",at:KJ(J.dataset.at)})),IO=[...sJ.querySelectorAll(".draw")].map((J)=>{let $=J.getTotalLength();return J.style.strokeDasharray=String($),{el:J,len:$,at:KJ(J.dataset.at),until:KJ(J.dataset.until)}}),zO=new Set(gG.filter((J)=>J.el.classList.contains("stamp")).map((J)=>J.el));function SG(J,$){if(J.style.opacity=String(L9($*1.6)),J.classList.contains("stamp"))J.style.transform=`rotate(-8deg) scale(${2.4-1.4*w9($)})`;else if(J instanceof SVGElement)J.style.transform=`scale(${w9($)})`;else J.style.transform=`translateY(${(1-w9($))*16}px) scale(${0.85+0.15*w9($)})`}var kG=sJ.querySelector(".endcard .album");function AO(J){if(kG)kG.style.pointerEvents=J>=L8.endAt()+0.5?"auto":"none";for(let $ of gG){let Q=LO(J,$.at,$.until);if(zO.has($.el)){SG($.el,U0(J,$.at,$.at+0.18)),$.el.style.opacity=String(Math.min(Number($.el.style.opacity),Q));continue}$.el.style.opacity=String(Q*($.el.classList.contains("blink")&&Math.sin(J*14)<-0.3?0.25:1)),$.el.style.transform=`translateY(${(1-w9(U0(J,$.at,$.at+0.35)))*40}px)`}for(let $ of MO)if(SG($.el,U0(J,$.at,$.at+($.el.classList.contains("stamp")?0.18:0.25))),$.el.classList.contains("btn"))$.el.classList.toggle("on",J>=$.at&&($.el.classList.contains("pick")||J<$.at+0.45));for(let $ of VO)$.el.style.width=`${U0(J,$.at,$.until)*100*Number(getComputedStyle($.el).getPropertyValue("--max")||1)}%`;for(let $ of _O){let Q=$.from+($.to-$.from)*U0(J,$.at,$.until);$.el.textContent=$.fmt==="clock"?`${String(Math.floor(Q)).padStart(2,"0")}:${String(Math.floor(Q%1*60)).padStart(2,"0")}`:$.fmt==="months"?`${Math.floor(Q)} months`:$.fmt==="secs"?`0:${String(Math.floor(Q)).padStart(2,"0")}`:Math.floor(Q).toLocaleString()}for(let $ of BO)$.el.textContent=$.text.slice(0,Math.max(0,Math.floor((J-$.at)*34)));for(let $ of IO)$.el.style.strokeDashoffset=String($.len*(1-U0(J,$.at,$.until)))}var LO=(J,$,Q)=>L9((J-$)/0.2)*L9((Q-J)/0.25),{hot:PO,ice:CO,gold:TO}=L8.words,wO=(J)=>J.toLowerCase().replace(/[^a-z0-9'-]/g,""),wJ=document.createElement("div");wJ.className="cap";N8("#caption").appendChild(wJ);var jG=-1,vG=[],fG=(J)=>I7[J].spoken||I7[J].words.some(($)=>$.direction&&/^\W*spoken/i.test($.w));function SO(J){let $=-1;for(let K=0;K<I7.length;K++)if(L(K)-0.15<=J)$=K;let Q=$+1<I7.length?L($+1)-0.15:1/0,Z=$<0?0:Math.min(Q,n0($)+(fG($)?2.5:3.5));if($<0||J>Z||J>=L8.endAt()){wJ.style.opacity="0";return}if($!==jG){jG=$;let K=I7[$],U=/chorus/i.test(K.section),H=fG($);wJ.className=`cap ${U&&!H?"chorus":""} ${H?"spoken":""}`,wJ.innerHTML="";let Y=null;vG=K.words.filter((G)=>!G.direction).map((G)=>{let N=document.createElement("span"),q=wO(G.w);if(N.className=`w ${PO.test(q)?"hot":CO.test(q)?"ice":TO.test(q)?"gold":""}`,N.textContent=G.w,G.backing)(Y??=wJ.appendChild(Object.assign(document.createElement("div"),{className:"backing"}))).appendChild(N);else wJ.appendChild(N);return{el:N,s:G.s}});let W=K.words.length;wJ.style.fontSize=H?"68px":U?"112px":`${W>14?62:W>10?76:92}px`}wJ.style.opacity=String(1-U0(J,Z-0.15,Z));for(let K of vG){let U=U0(J,K.s-0.06,K.s+0.1);K.el.style.opacity=String(L9(U*1.8)),K.el.style.transform=`translateY(${(1-w9(U))*0.35}em) scale(${1.25-0.25*w9(U)})`,K.el.style.filter=U<1?`blur(${(1-U)*10}px)`:""}}N8("#hud-title").textContent=L8.title;var kO=N8("#hud-l"),jO=N8("#hud-r"),vO=N8(".progress i"),fO=N8("#flash"),yO=N8("#black"),bO=N8("#hud");function xO(J){let{left:$,right:Q}=L8.hud(J,OO(J));kO.innerHTML=$,jO.innerHTML=Q,vO.style.width=`${(L9(J/SJ)*100).toFixed(2)}%`}function yG(J){nJ.update(J),nJ.render(),AO(J),SO(J),xO(J),fO.style.opacity=String(nJ.flash(J)),yO.style.opacity=String(nJ.fade(J)),bO.style.opacity=String(1-nJ.fade(J))}if(DO)N8("#hint").remove(),Object.assign(window,{__renderAt:yG,__world:nJ,__end:SJ,__shots:sH().map((J)=>({name:J.name,at:J.at,label:J.label,section:J.section})),__ready:!0});else{let J=new Audio(ZJ?.audio??`/audio/${iJ}/${wQ}.mp3`);J.preload="auto",J.currentTime=Number(xG.get("t")??0);let $=()=>{let O=Math.min(innerWidth/1920,innerHeight/1080);RO.style.transform=`translate(${(innerWidth-1920*O)/2}px, ${(innerHeight-1080*O)/2}px) scale(${O})`};window.addEventListener("resize",$),$();let Q=N8("#hint"),Z=(O)=>{J.currentTime=L9(O,0,SJ-0.05)},K=()=>{if(Q.remove(),J.paused)J.play();else J.pause()},U=(O)=>`${Math.floor(O/60)}:${String(Math.floor(O%60)).padStart(2,"0")}`,H=sH().filter((O,B,_)=>_.findIndex((A)=>A.section===O.section&&Math.abs(A.at-O.at)<30)===B&&(B===0||_[B-1].section!==O.section)),Y=document.createElement("div"),W=parent!==window&&!ZJ;Y.className=W?"player slim":"player",Y.innerHTML=`<div class="pl-row"><button class="pl-play">▶</button><span class="pl-time">0:00</span>
    <input class="pl-seek" type="range" min="0" max="${SJ}" step="0.05" value="0" aria-label="Seek">
    <span class="pl-time">${U(SJ)}</span>
    <button class="pl-mute" title="Mute (M)" aria-label="Mute">\uD83D\uDD0A</button><input class="pl-vol" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume">${ZJ?bG("pl-album","← All videos"):`<a href="/song/${iJ}/take/${wQ}" target="_top"><button>lyrics</button></a>`}
    <button class="pl-hide" title="Hide controls (H)" aria-label="Hide controls">▾</button></div>
    <div class="pl-chips">${H.map((O)=>`<button data-t="${Math.max(0,O.at-0.3)}">${O.section}</button>`).join("")}</div>`;let G=Object.assign(document.createElement("button"),{className:"pl-show",textContent:"▴",title:"Show controls (H)"});G.setAttribute("aria-label","Show controls"),document.body.append(Y,G);let N=(O)=>{Y.hidden=O,G.hidden=!O;try{localStorage.setItem("player-collapsed",O?"1":"")}catch{}},q=!1;try{q=localStorage.getItem("player-collapsed")==="1"}catch{}N(q),Y.querySelector(".pl-hide").onclick=()=>N(!0),G.onclick=(O)=>{O.stopPropagation(),N(!1)};let X=Y.querySelector(".pl-play"),F=Y.querySelector(".pl-seek"),R=Y.querySelector(".pl-time");X.onclick=K;let M=Y.querySelector(".pl-vol"),D=Y.querySelector(".pl-mute"),E=(O,B=J.muted)=>{J.volume=L9(O),J.muted=B,M.value=String(B?0:J.volume),D.textContent=B||J.volume===0?"\uD83D\uDD07":J.volume<0.5?"\uD83D\uDD09":"\uD83D\uDD0A";try{localStorage.setItem("player-volume",JSON.stringify({v:J.volume,muted:B}))}catch{}},I={v:1,muted:!1};try{I={...I,...JSON.parse(localStorage.getItem("player-volume")??"{}")}}catch{}if(E(I.v,I.muted),M.oninput=()=>E(Number(M.value),!1),D.onclick=()=>E(J.volume||1,!J.muted),F.oninput=()=>{Q.remove(),Z(Number(F.value))},Y.querySelectorAll("[data-t]").forEach((O)=>O.onclick=()=>{if(Q.remove(),Z(Number(O.dataset.t)),J.paused)J.play()}),Y.addEventListener("click",(O)=>O.stopPropagation()),window.addEventListener("click",K),window.addEventListener("keydown",(O)=>{if(O.code==="Space")O.preventDefault(),K();if(O.code==="ArrowRight")Z(J.currentTime+5);if(O.code==="ArrowLeft")Z(J.currentTime-5);if(O.code==="KeyH")N(!Y.hidden);if(O.code==="KeyM")E(J.volume||1,!J.muted);if(O.code==="ArrowUp")O.preventDefault(),E(J.volume+0.1,!1);if(O.code==="ArrowDown")O.preventDefault(),E(J.volume-0.1,!1)}),parent!==window&&!ZJ){let O=sH(),B=O.map((V,z)=>({key:`${V.name}@${V.at.toFixed(1)}`,name:V.name,label:V.label,section:V.section,at:Math.max(0,V.at),end:O[z+1]?.at??SJ,thumb:""})),_=(V)=>parent.postMessage({from:"video",clipId:wQ,...V},location.origin);_({type:"shots",shots:B}),setTimeout(()=>{let V=N8("#gl"),z=Object.assign(document.createElement("canvas"),{width:384,height:216}),y=z.getContext("2d");for(let k of B)nJ.update((k.at+Math.min(k.end,k.at+6))/2),nJ.render(),y.drawImage(V,0,0,384,216),k.thumb=z.toDataURL("image/jpeg",0.7);_({type:"shots",shots:B})},300);let A=-1;setInterval(()=>{let V=J.currentTime;if(V!==A)_({type:"time",t:A=V})},250),window.addEventListener("message",(V)=>{if(V.origin!==location.origin||V.data?.type!=="seek")return;if(Q.remove(),Z(Number(V.data.t)),J.paused)J.play()})}let C=()=>{let O=J.ended?SJ:J.currentTime;yG(O),X.textContent=J.paused?"▶":"❚❚",F.value=String(O),R.textContent=U(O),requestAnimationFrame(C)};C()}
