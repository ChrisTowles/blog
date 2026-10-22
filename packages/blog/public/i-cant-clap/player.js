var GW={"24-the-steep-part":"2026-10-18","04-read-the-diff":"2026-10-18","25-data-here-data-there":"2026-10-18","08-explain-the-function":"2026-10-21"},f1=Object.keys(GW),XW=(J)=>{let Q=GW[J];return Q?new Date(`${Q}T12:00:00Z`).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}):""};var U7=[],$J={fps:30,duration:0,rms:[0],bass:[0],bpm:120,beatOffset:0};function NW(J,Q){U7=J,$J=Q}var w7=()=>$J.duration,v=(J)=>U7[Math.min(J,U7.length-1)].words[0].s,W9=(J)=>U7[J].words.at(-1).e,N0=(J,Q)=>(U7[J].words.find(($)=>Q.test($.w))??U7[J].words[0]).s,k9=(J,Q=0,$=1)=>Math.min($,Math.max(Q,J)),j=(J,Q,$)=>J+(Q-J)*$,_9=(J,Q,$)=>{let Z=k9(($-J)/(Q-J));return Z*Z*(3-2*Z)},G9=(J)=>1-Math.pow(1-k9(J),3),P8=(J)=>Math.pow(k9(J),3),T9=(J)=>{J=k9(J);let Q=1.9;return 1+(Q+1)*Math.pow(J-1,3)+Q*Math.pow(J-1,2)};var X0=(J,Q,$)=>k9((J-Q)/($-Q)),k5=(J)=>k9(Math.floor(J*$J.fps),0,$J.rms.length-1);var qW=(J)=>{let Q=k5(J),$=$J.bass,Z=(K)=>$[Math.max(0,K)]??0;return(Z(Q)*2+Z(Q-1)+Z(Q-2))/4},g7=()=>60/$J.bpm,r7=(J)=>{let Q=g7(),$=((J-$J.beatOffset)%Q+Q)%Q;return Math.exp(-$*9)},eJ=(J)=>Math.max(0,Math.floor((J-$J.beatOffset)/g7())),M0=(J)=>{let Q=Math.sin(J*127.1+311.7)*43758.5453;return Q-Math.floor(Q)};var rW="186";var tW=0,tZ=1,eW=2;var GQ=1,_6=2,I6=3,L6=0,X7=1,r9=2,S7=0,XQ=1,N7=2,eZ=3,JK=4,JH=5;var C6=100,QH=101,$H=102,ZH=103,KH=104,UH=200,WH=201,HH=202,YH=203,GH=204,XH=205,NH=206,qH=207,FH=208,DH=209,EH=210,RH=211,OH=212,MH=213,VH=214,BH=0,_H=1,IH=2,QK=3,LH=4,CH=5,zH=6,AH=7,PH=0,wH=1,TH=2,Q8=0,NQ=1,qQ=2,FQ=3,b8=4,DQ=5,EQ=6,RQ=7;var z6=301,CJ=302,j$=303,v$=304,OQ=306,YJ=1000,y$=1001,SH=1002,d7=1003,kH=1004;var MQ=1005;var k7=1006,f$=1007;var zJ=1008;var $8=1009,jH=1010,vH=1011,VQ=1012,$K=1013,GJ=1014,h8=1015,E7=1016,ZK=1017,KK=1018,A6=1020,yH=35902,fH=35899,bH=1021,hH=1022,M8=1023,AJ=1026,PJ=1027,xH=1028,UK=1029,wJ=1030,WK=1031;var HK=1033,b$=33776,h$=33777,x$=33778,g$=33779,YK=35840,GK=35841,XK=35842,NK=35843,qK=36196,FK=37492,DK=37496,EK=37488,RK=37489,p$=37490,OK=37491,MK=37808,VK=37809,BK=37810,_K=37811,IK=37812,LK=37813,CK=37814,zK=37815,AK=37816,PK=37817,wK=37818,TK=37819,SK=37820,kK=37821,jK=36492,vK=36494,yK=36495,fK=36283,bK=36284,m$=36285,hK=36286;var xK=3201;var gK=0,gH=1,TJ="",u7="srgb",pK="srgb-linear",mK="linear",g9="srgb";var pH=512,mH=513,dH=514,d$=515,uH=516,lH=517,u$=518,cH=519;var dK="300 es",uK=2000;function j5(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function v5(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function $Q(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function nH(){let J=$Q("canvas");return J.style.display="block",J}var FW={},V6=null;function ZQ(...J){let Q="THREE."+J.shift();if(V6)V6("log",Q,...J);else console.log(Q,...J)}function sH(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function o0(...J){J=sH(J);let Q="THREE."+J.shift();if(V6)V6("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function e0(...J){J=sH(J);let Q="THREE."+J.shift();if(V6)V6("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function IJ(...J){let Q=J.join(" ");if(Q in FW)return;FW[Q]=!0,o0(...J)}function iH(J,Q,$){return new Promise(function(Z,K){function U(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:K();break;case J.TIMEOUT_EXPIRED:setTimeout(U,$);break;default:Z()}}setTimeout(U,$)})}var oH={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class x8{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let K=Z.indexOf(Q);if(K!==-1)Z.splice(K,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let K=0,U=Z.length;K<U;K++)Z[K].call(this,J);J.target=null}}}var _7=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var A$=Math.PI/180,KQ=180/Math.PI;function v8(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(_7[J&255]+_7[J>>8&255]+_7[J>>16&255]+_7[J>>24&255]+"-"+_7[Q&255]+_7[Q>>8&255]+"-"+_7[Q>>16&15|64]+_7[Q>>24&255]+"-"+_7[$&63|128]+_7[$>>8&255]+"-"+_7[$>>16&255]+_7[$>>24&255]+_7[Z&255]+_7[Z>>8&255]+_7[Z>>16&255]+_7[Z>>24&255]).toLowerCase()}function M9(J,Q,$){return Math.max(Q,Math.min($,J))}function y5(J,Q){return(J%Q+Q)%Q}function _Z(J,Q,$){return(1-$)*J+$*Q}function O8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:case Uint8ClampedArray:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function u9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class Z0{static{Z0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=M9(this.x,J.x,Q.x),this.y=M9(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=M9(this.x,J,Q),this.y=M9(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(M9($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(M9($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),K=this.x-J.x,U=this.y-J.y;return this.x=K*$-U*Z+J.x,this.y=K*Z+U*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Z8{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,K,U,W){let H=$[Z+0],Y=$[Z+1],G=$[Z+2],N=$[Z+3],D=K[U+0],X=K[U+1],F=K[U+2],O=K[U+3];if(N!==O||H!==D||Y!==X||G!==F){let V=H*D+Y*X+G*F+N*O;if(V<0)D=-D,X=-X,F=-F,O=-O,V=-V;let q=1-W;if(V<0.9995){let E=Math.acos(V),L=Math.sin(E);q=Math.sin(q*E)/L,W=Math.sin(W*E)/L,H=H*q+D*W,Y=Y*q+X*W,G=G*q+F*W,N=N*q+O*W}else{H=H*q+D*W,Y=Y*q+X*W,G=G*q+F*W,N=N*q+O*W;let E=1/Math.sqrt(H*H+Y*Y+G*G+N*N);H*=E,Y*=E,G*=E,N*=E}}J[Q]=H,J[Q+1]=Y,J[Q+2]=G,J[Q+3]=N}static multiplyQuaternionsFlat(J,Q,$,Z,K,U){let W=$[Z],H=$[Z+1],Y=$[Z+2],G=$[Z+3],N=K[U],D=K[U+1],X=K[U+2],F=K[U+3];return J[Q]=W*F+G*N+H*X-Y*D,J[Q+1]=H*F+G*D+Y*N-W*X,J[Q+2]=Y*F+G*X+W*D-H*N,J[Q+3]=G*F-W*N-H*D-Y*X,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:K,_order:U}=J,W=Math.cos,H=Math.sin,Y=W($/2),G=W(Z/2),N=W(K/2),D=H($/2),X=H(Z/2),F=H(K/2);switch(U){case"XYZ":this._x=D*G*N+Y*X*F,this._y=Y*X*N-D*G*F,this._z=Y*G*F+D*X*N,this._w=Y*G*N-D*X*F;break;case"YXZ":this._x=D*G*N+Y*X*F,this._y=Y*X*N-D*G*F,this._z=Y*G*F-D*X*N,this._w=Y*G*N+D*X*F;break;case"ZXY":this._x=D*G*N-Y*X*F,this._y=Y*X*N+D*G*F,this._z=Y*G*F+D*X*N,this._w=Y*G*N-D*X*F;break;case"ZYX":this._x=D*G*N-Y*X*F,this._y=Y*X*N+D*G*F,this._z=Y*G*F-D*X*N,this._w=Y*G*N+D*X*F;break;case"YZX":this._x=D*G*N+Y*X*F,this._y=Y*X*N+D*G*F,this._z=Y*G*F-D*X*N,this._w=Y*G*N-D*X*F;break;case"XZY":this._x=D*G*N-Y*X*F,this._y=Y*X*N-D*G*F,this._z=Y*G*F+D*X*N,this._w=Y*G*N+D*X*F;break;default:o0("Quaternion: .setFromEuler() encountered an unknown order: "+U)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],K=Q[8],U=Q[1],W=Q[5],H=Q[9],Y=Q[2],G=Q[6],N=Q[10],D=$+W+N;if(D>0){let X=0.5/Math.sqrt(D+1);this._w=0.25/X,this._x=(G-H)*X,this._y=(K-Y)*X,this._z=(U-Z)*X}else if($>W&&$>N){let X=2*Math.sqrt(1+$-W-N);this._w=(G-H)/X,this._x=0.25*X,this._y=(Z+U)/X,this._z=(K+Y)/X}else if(W>N){let X=2*Math.sqrt(1+W-$-N);this._w=(K-Y)/X,this._x=(Z+U)/X,this._y=0.25*X,this._z=(H+G)/X}else{let X=2*Math.sqrt(1+N-$-W);this._w=(U-Z)/X,this._x=(K+Y)/X,this._y=(H+G)/X,this._z=0.25*X}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(M9(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:K,_w:U}=J,W=Q._x,H=Q._y,Y=Q._z,G=Q._w;return this._x=$*G+U*W+Z*Y-K*H,this._y=Z*G+U*H+K*W-$*Y,this._z=K*G+U*Y+$*H-Z*W,this._w=U*G-$*W-Z*H-K*Y,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:K,_w:U}=J,W=this.dot(J);if(W<0)$=-$,Z=-Z,K=-K,U=-U,W=-W;let H=1-Q;if(W<0.9995){let Y=Math.acos(W),G=Math.sin(Y);H=Math.sin(H*Y)/G,Q=Math.sin(Q*Y)/G,this._x=this._x*H+$*Q,this._y=this._y*H+Z*Q,this._z=this._z*H+K*Q,this._w=this._w*H+U*Q,this._onChangeCallback()}else this._x=this._x*H+$*Q,this._y=this._y*H+Z*Q,this._z=this._z*H+K*Q,this._w=this._w*H+U*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),K=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),K*Math.sin(Q),K*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{static{T.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(DW.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(DW.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements;return this.x=K[0]*Q+K[3]*$+K[6]*Z,this.y=K[1]*Q+K[4]*$+K[7]*Z,this.z=K[2]*Q+K[5]*$+K[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements,U=1/(K[3]*Q+K[7]*$+K[11]*Z+K[15]);return this.x=(K[0]*Q+K[4]*$+K[8]*Z+K[12])*U,this.y=(K[1]*Q+K[5]*$+K[9]*Z+K[13])*U,this.z=(K[2]*Q+K[6]*$+K[10]*Z+K[14])*U,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,K=J.x,U=J.y,W=J.z,H=J.w,Y=2*(U*Z-W*$),G=2*(W*Q-K*Z),N=2*(K*$-U*Q);return this.x=Q+H*Y+U*N-W*G,this.y=$+H*G+W*Y-K*N,this.z=Z+H*N+K*G-U*Y,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z,this.y=K[1]*Q+K[5]*$+K[9]*Z,this.z=K[2]*Q+K[6]*$+K[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=M9(this.x,J.x,Q.x),this.y=M9(this.y,J.y,Q.y),this.z=M9(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=M9(this.x,J,Q),this.y=M9(this.y,J,Q),this.z=M9(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(M9($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:K}=J,U=Q.x,W=Q.y,H=Q.z;return this.x=Z*H-K*W,this.y=K*U-$*H,this.z=$*W-Z*U,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return IZ.copy(this).projectOnVector(J),this.sub(IZ)}reflect(J){return this.sub(IZ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(M9($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var IZ=new T,DW=new Z8;class $9{static{$9.prototype.isMatrix3=!0}constructor(J,Q,$,Z,K,U,W,H,Y){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,K,U,W,H,Y)}set(J,Q,$,Z,K,U,W,H,Y){let G=this.elements;return G[0]=J,G[1]=Z,G[2]=W,G[3]=Q,G[4]=K,G[5]=H,G[6]=$,G[7]=U,G[8]=Y,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,K=this.elements,U=$[0],W=$[3],H=$[6],Y=$[1],G=$[4],N=$[7],D=$[2],X=$[5],F=$[8],O=Z[0],V=Z[3],q=Z[6],E=Z[1],L=Z[4],A=Z[7],R=Z[2],_=Z[5],B=Z[8];return K[0]=U*O+W*E+H*R,K[3]=U*V+W*L+H*_,K[6]=U*q+W*A+H*B,K[1]=Y*O+G*E+N*R,K[4]=Y*V+G*L+N*_,K[7]=Y*q+G*A+N*B,K[2]=D*O+X*E+F*R,K[5]=D*V+X*L+F*_,K[8]=D*q+X*A+F*B,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],U=J[4],W=J[5],H=J[6],Y=J[7],G=J[8];return Q*U*G-Q*W*Y-$*K*G+$*W*H+Z*K*Y-Z*U*H}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],U=J[4],W=J[5],H=J[6],Y=J[7],G=J[8],N=G*U-W*Y,D=W*H-G*K,X=Y*K-U*H,F=Q*N+$*D+Z*X;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let O=1/F;return J[0]=N*O,J[1]=(Z*Y-G*$)*O,J[2]=(W*$-Z*U)*O,J[3]=D*O,J[4]=(G*Q-Z*H)*O,J[5]=(Z*K-W*Q)*O,J[6]=X*O,J[7]=($*H-Y*Q)*O,J[8]=(U*Q-$*K)*O,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,K,U,W){let H=Math.cos(K),Y=Math.sin(K);return this.set($*H,$*Y,-$*(H*U+Y*W)+U+J,-Z*Y,Z*H,-Z*(-Y*U+H*W)+W+Q,0,0,1),this}scale(J,Q){return IJ("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(LZ.makeScale(J,Q)),this}rotate(J){return IJ("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(LZ.makeRotation(-J)),this}translate(J,Q){return IJ("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(LZ.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var LZ=new $9,EW=new $9().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),RW=new $9().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function f5(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(K,U,W){if(this.enabled===!1||U===W||!U||!W)return K;if(this.spaces[U].transfer==="srgb")K.r=y8(K.r),K.g=y8(K.g),K.b=y8(K.b);if(this.spaces[U].primaries!==this.spaces[W].primaries)K.applyMatrix3(this.spaces[U].toXYZ),K.applyMatrix3(this.spaces[W].fromXYZ);if(this.spaces[W].transfer==="srgb")K.r=M6(K.r),K.g=M6(K.g),K.b=M6(K.b);return K},workingToColorSpace:function(K,U){return this.convert(K,this.workingColorSpace,U)},colorSpaceToWorking:function(K,U){return this.convert(K,U,this.workingColorSpace)},getPrimaries:function(K){return this.spaces[K].primaries},getTransfer:function(K){if(K==="")return"linear";return this.spaces[K].transfer},getToneMappingMode:function(K){return this.spaces[K].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(K,U=this.workingColorSpace){return K.fromArray(this.spaces[U].luminanceCoefficients)},define:function(K){Object.assign(this.spaces,K)},_getMatrix:function(K,U,W){return K.copy(this.spaces[U].toXYZ).multiply(this.spaces[W].fromXYZ)},_getDrawingBufferColorSpace:function(K){return this.spaces[K].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(K=this.workingColorSpace){return this.spaces[K].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(K,U){return IJ("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(K,U)},toWorkingColorSpace:function(K,U){return IJ("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(K,U)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:EW,fromXYZ:RW,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:EW,fromXYZ:RW,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var q9=f5();function y8(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function M6(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var J6;class lK{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(J6===void 0)J6=$Q("canvas");J6.width=J.width,J6.height=J.height;let Z=J6.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=J6}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=$Q("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),K=Z.data;for(let U=0;U<K.length;U++)K[U]=y8(K[U]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(y8(Q[$]/255)*255);else Q[$]=y8(Q[$]);return{data:Q,width:J.width,height:J.height}}else return o0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var b5=0;class BQ{constructor(J=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:b5++}),this.uuid=v8(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let K;if(Array.isArray(Z)){K=[];for(let U=0,W=Z.length;U<W;U++)if(Z[U].isDataTexture)K.push(CZ(Z[U].image));else K.push(CZ(Z[U]))}else K=CZ(Z);$.url=K}if(!Q)J.images[this.uuid]=$;return $}}function CZ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return lK.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return o0("Texture: Unable to serialize Texture."),{}}var h5=0,zZ=new T;class V7 extends x8{constructor(J=V7.DEFAULT_IMAGE,Q=V7.DEFAULT_MAPPING,$=1001,Z=1001,K=1006,U=1008,W=1023,H=1009,Y=V7.DEFAULT_ANISOTROPY,G=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:h5++}),this.uuid=v8(),this.name="",this.source=new BQ(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=K,this.minFilter=U,this.anisotropy=Y,this.format=W,this.internalFormat=null,this.type=H,this.offset=new Z0(0,0),this.repeat=new Z0(1,1),this.center=new Z0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $9,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=G,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(zZ).x}get height(){return this.source.getSize(zZ).y}get depth(){return this.source.getSize(zZ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){o0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){o0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}V7.DEFAULT_IMAGE=null;V7.DEFAULT_MAPPING=300;V7.DEFAULT_ANISOTROPY=1;class a9{static{a9.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,K=this.w,U=J.elements;return this.x=U[0]*Q+U[4]*$+U[8]*Z+U[12]*K,this.y=U[1]*Q+U[5]*$+U[9]*Z+U[13]*K,this.z=U[2]*Q+U[6]*$+U[10]*Z+U[14]*K,this.w=U[3]*Q+U[7]*$+U[11]*Z+U[15]*K,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,K,U=0.01,W=0.1,H=J.elements,Y=H[0],G=H[4],N=H[8],D=H[1],X=H[5],F=H[9],O=H[2],V=H[6],q=H[10];if(Math.abs(G-D)<0.01&&Math.abs(N-O)<0.01&&Math.abs(F-V)<0.01){if(Math.abs(G+D)<0.1&&Math.abs(N+O)<0.1&&Math.abs(F+V)<0.1&&Math.abs(Y+X+q-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let L=(Y+1)/2,A=(X+1)/2,R=(q+1)/2,_=(G+D)/4,B=(N+O)/4,z=(F+V)/4;if(L>A&&L>R)if(L<0.01)$=0,Z=0.707106781,K=0.707106781;else $=Math.sqrt(L),Z=_/$,K=B/$;else if(A>R)if(A<0.01)$=0.707106781,Z=0,K=0.707106781;else Z=Math.sqrt(A),$=_/Z,K=z/Z;else if(R<0.01)$=0.707106781,Z=0.707106781,K=0;else K=Math.sqrt(R),$=B/K,Z=z/K;return this.set($,Z,K,Q),this}let E=Math.sqrt((V-F)*(V-F)+(N-O)*(N-O)+(D-G)*(D-G));if(Math.abs(E)<0.001)E=1;return this.x=(V-F)/E,this.y=(N-O)/E,this.z=(D-G)/E,this.w=Math.acos((Y+X+q-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=M9(this.x,J.x,Q.x),this.y=M9(this.y,J.y,Q.y),this.z=M9(this.z,J.z,Q.z),this.w=M9(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=M9(this.x,J,Q),this.y=M9(this.y,J,Q),this.z=M9(this.z,J,Q),this.w=M9(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(M9($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cK extends x8{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new a9(0,0,J,Q),this.scissorTest=!1,this.viewport=new a9(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},K=new V7(Z),U=$.count;for(let W=0;W<U;W++)this.textures[W]=K.clone(),this.textures[W].isRenderTargetTexture=!0,this.textures[W].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveColorBuffer=$.resolveColorBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this.storeMultisampledColorBuffer=$.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=$.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=$.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(J!==null&&J.renderTarget===null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,K=this.textures.length;Z<K;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new BQ(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveColorBuffer=J.resolveColorBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,this.storeMultisampledColorBuffer=J.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=J.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=J.storeMultisampledStencilBuffer,J.depthTexture!==null)if(J.depthTexture.renderTarget===J){let Q=J.depthTexture.clone();Q.renderTarget=null,this.depthTexture=Q}else this.depthTexture=J.depthTexture;return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class W7 extends cK{constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class l$ extends V7{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class nK extends V7{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}}class z9{static{z9.prototype.isMatrix4=!0}constructor(J,Q,$,Z,K,U,W,H,Y,G,N,D,X,F,O,V){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,K,U,W,H,Y,G,N,D,X,F,O,V)}set(J,Q,$,Z,K,U,W,H,Y,G,N,D,X,F,O,V){let q=this.elements;return q[0]=J,q[4]=Q,q[8]=$,q[12]=Z,q[1]=K,q[5]=U,q[9]=W,q[13]=H,q[2]=Y,q[6]=G,q[10]=N,q[14]=D,q[3]=X,q[7]=F,q[11]=O,q[15]=V,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new z9().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/Q6.setFromMatrixColumn(J,0).length(),K=1/Q6.setFromMatrixColumn(J,1).length(),U=1/Q6.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*K,Q[5]=$[5]*K,Q[6]=$[6]*K,Q[7]=0,Q[8]=$[8]*U,Q[9]=$[9]*U,Q[10]=$[10]*U,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,K=J.z,U=Math.cos($),W=Math.sin($),H=Math.cos(Z),Y=Math.sin(Z),G=Math.cos(K),N=Math.sin(K);if(J.order==="XYZ"){let D=U*G,X=U*N,F=W*G,O=W*N;Q[0]=H*G,Q[4]=-H*N,Q[8]=Y,Q[1]=X+F*Y,Q[5]=D-O*Y,Q[9]=-W*H,Q[2]=O-D*Y,Q[6]=F+X*Y,Q[10]=U*H}else if(J.order==="YXZ"){let D=H*G,X=H*N,F=Y*G,O=Y*N;Q[0]=D+O*W,Q[4]=F*W-X,Q[8]=U*Y,Q[1]=U*N,Q[5]=U*G,Q[9]=-W,Q[2]=X*W-F,Q[6]=O+D*W,Q[10]=U*H}else if(J.order==="ZXY"){let D=H*G,X=H*N,F=Y*G,O=Y*N;Q[0]=D-O*W,Q[4]=-U*N,Q[8]=F+X*W,Q[1]=X+F*W,Q[5]=U*G,Q[9]=O-D*W,Q[2]=-U*Y,Q[6]=W,Q[10]=U*H}else if(J.order==="ZYX"){let D=U*G,X=U*N,F=W*G,O=W*N;Q[0]=H*G,Q[4]=F*Y-X,Q[8]=D*Y+O,Q[1]=H*N,Q[5]=O*Y+D,Q[9]=X*Y-F,Q[2]=-Y,Q[6]=W*H,Q[10]=U*H}else if(J.order==="YZX"){let D=U*H,X=U*Y,F=W*H,O=W*Y;Q[0]=H*G,Q[4]=O-D*N,Q[8]=F*N+X,Q[1]=N,Q[5]=U*G,Q[9]=-W*G,Q[2]=-Y*G,Q[6]=X*N+F,Q[10]=D-O*N}else if(J.order==="XZY"){let D=U*H,X=U*Y,F=W*H,O=W*Y;Q[0]=H*G,Q[4]=-N,Q[8]=Y*G,Q[1]=D*N+O,Q[5]=U*G,Q[9]=X*N-F,Q[2]=F*N-X,Q[6]=W*G,Q[10]=O*N+D}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(x5,J,g5)}lookAt(J,Q,$){let Z=this.elements;if(p7.subVectors(J,Q),p7.lengthSq()===0)p7.z=1;if(p7.normalize(),ZJ.crossVectors($,p7),ZJ.lengthSq()===0){if(Math.abs($.z)===1)p7.x+=0.0001;else p7.z+=0.0001;p7.normalize(),ZJ.crossVectors($,p7)}return ZJ.normalize(),iQ.crossVectors(p7,ZJ),Z[0]=ZJ.x,Z[4]=iQ.x,Z[8]=p7.x,Z[1]=ZJ.y,Z[5]=iQ.y,Z[9]=p7.y,Z[2]=ZJ.z,Z[6]=iQ.z,Z[10]=p7.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,K=this.elements,U=$[0],W=$[4],H=$[8],Y=$[12],G=$[1],N=$[5],D=$[9],X=$[13],F=$[2],O=$[6],V=$[10],q=$[14],E=$[3],L=$[7],A=$[11],R=$[15],_=Z[0],B=Z[4],z=Z[8],M=Z[12],I=Z[1],f=Z[5],S=Z[9],h=Z[13],a=Z[2],k=Z[6],m=Z[10],e=Z[14],l=Z[3],i=Z[7],p=Z[11],o=Z[15];return K[0]=U*_+W*I+H*a+Y*l,K[4]=U*B+W*f+H*k+Y*i,K[8]=U*z+W*S+H*m+Y*p,K[12]=U*M+W*h+H*e+Y*o,K[1]=G*_+N*I+D*a+X*l,K[5]=G*B+N*f+D*k+X*i,K[9]=G*z+N*S+D*m+X*p,K[13]=G*M+N*h+D*e+X*o,K[2]=F*_+O*I+V*a+q*l,K[6]=F*B+O*f+V*k+q*i,K[10]=F*z+O*S+V*m+q*p,K[14]=F*M+O*h+V*e+q*o,K[3]=E*_+L*I+A*a+R*l,K[7]=E*B+L*f+A*k+R*i,K[11]=E*z+L*S+A*m+R*p,K[15]=E*M+L*h+A*e+R*o,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],K=J[12],U=J[1],W=J[5],H=J[9],Y=J[13],G=J[2],N=J[6],D=J[10],X=J[14],F=J[3],O=J[7],V=J[11],q=J[15],E=H*X-Y*D,L=W*X-Y*N,A=W*D-H*N,R=U*X-Y*G,_=U*D-H*G,B=U*N-W*G;return Q*(O*E-V*L+q*A)-$*(F*E-V*R+q*_)+Z*(F*L-O*R+q*B)-K*(F*A-O*_+V*B)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],K=J[1],U=J[5],W=J[9],H=J[2],Y=J[6],G=J[10];return Q*(U*G-W*Y)-$*(K*G-W*H)+Z*(K*Y-U*H)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],U=J[4],W=J[5],H=J[6],Y=J[7],G=J[8],N=J[9],D=J[10],X=J[11],F=J[12],O=J[13],V=J[14],q=J[15],E=Q*W-$*U,L=Q*H-Z*U,A=Q*Y-K*U,R=$*H-Z*W,_=$*Y-K*W,B=Z*Y-K*H,z=G*O-N*F,M=G*V-D*F,I=G*q-X*F,f=N*V-D*O,S=N*q-X*O,h=D*q-X*V,a=E*h-L*S+A*f+R*I-_*M+B*z;if(a===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/a;return J[0]=(W*h-H*S+Y*f)*k,J[1]=(Z*S-$*h-K*f)*k,J[2]=(O*B-V*_+q*R)*k,J[3]=(D*_-N*B-X*R)*k,J[4]=(H*I-U*h-Y*M)*k,J[5]=(Q*h-Z*I+K*M)*k,J[6]=(V*A-F*B-q*L)*k,J[7]=(G*B-D*A+X*L)*k,J[8]=(U*S-W*I+Y*z)*k,J[9]=($*I-Q*S-K*z)*k,J[10]=(F*_-O*A+q*E)*k,J[11]=(N*A-G*_-X*E)*k,J[12]=(W*M-U*f-H*z)*k,J[13]=(Q*f-$*M+Z*z)*k,J[14]=(O*L-F*R-V*E)*k,J[15]=(G*R-N*L+D*E)*k,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,K=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=K,Q[1]*=$,Q[5]*=Z,Q[9]*=K,Q[2]*=$,Q[6]*=Z,Q[10]*=K,Q[3]*=$,Q[7]*=Z,Q[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),K=1-$,U=J.x,W=J.y,H=J.z,Y=K*U,G=K*W;return this.set(Y*U+$,Y*W-Z*H,Y*H+Z*W,0,Y*W+Z*H,G*W+$,G*H-Z*U,0,Y*H-Z*W,G*H+Z*U,K*H*H+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,K,U){return this.set(1,$,K,0,J,1,U,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,K=Q._x,U=Q._y,W=Q._z,H=Q._w,Y=K+K,G=U+U,N=W+W,D=K*Y,X=K*G,F=K*N,O=U*G,V=U*N,q=W*N,E=H*Y,L=H*G,A=H*N,R=$.x,_=$.y,B=$.z;return Z[0]=(1-(O+q))*R,Z[1]=(X+A)*R,Z[2]=(F-L)*R,Z[3]=0,Z[4]=(X-A)*_,Z[5]=(1-(D+q))*_,Z[6]=(V+E)*_,Z[7]=0,Z[8]=(F+L)*B,Z[9]=(V-E)*B,Z[10]=(1-(D+O))*B,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let K=this.determinantAffine();if(K===0)return $.set(1,1,1),Q.identity(),this;let U=Q6.set(Z[0],Z[1],Z[2]).length(),W=Q6.set(Z[4],Z[5],Z[6]).length(),H=Q6.set(Z[8],Z[9],Z[10]).length();if(K<0)U=-U;t7.copy(this);let Y=1/U,G=1/W,N=1/H;return t7.elements[0]*=Y,t7.elements[1]*=Y,t7.elements[2]*=Y,t7.elements[4]*=G,t7.elements[5]*=G,t7.elements[6]*=G,t7.elements[8]*=N,t7.elements[9]*=N,t7.elements[10]*=N,Q.setFromRotationMatrix(t7),$.x=U,$.y=W,$.z=H,this}makePerspective(J,Q,$,Z,K,U,W=2000,H=!1){let Y=this.elements,G=2*K/(Q-J),N=2*K/($-Z),D=(Q+J)/(Q-J),X=($+Z)/($-Z),F,O;if(H)F=K/(U-K),O=U*K/(U-K);else if(W===2000)F=-(U+K)/(U-K),O=-2*U*K/(U-K);else if(W===2001)F=-U/(U-K),O=-U*K/(U-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+W);return Y[0]=G,Y[4]=0,Y[8]=D,Y[12]=0,Y[1]=0,Y[5]=N,Y[9]=X,Y[13]=0,Y[2]=0,Y[6]=0,Y[10]=F,Y[14]=O,Y[3]=0,Y[7]=0,Y[11]=-1,Y[15]=0,this}makeOrthographic(J,Q,$,Z,K,U,W=2000,H=!1){let Y=this.elements,G=2/(Q-J),N=2/($-Z),D=-(Q+J)/(Q-J),X=-($+Z)/($-Z),F,O;if(H)F=1/(U-K),O=U/(U-K);else if(W===2000)F=-2/(U-K),O=-(U+K)/(U-K);else if(W===2001)F=-1/(U-K),O=-K/(U-K);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+W);return Y[0]=G,Y[4]=0,Y[8]=0,Y[12]=D,Y[1]=0,Y[5]=N,Y[9]=0,Y[13]=X,Y[2]=0,Y[6]=0,Y[10]=F,Y[14]=O,Y[3]=0,Y[7]=0,Y[11]=0,Y[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var Q6=new T,t7=new z9,x5=new T(0,0,0),g5=new T(1,1,1),ZJ=new T,iQ=new T,p7=new T,OW=new z9,MW=new Z8;class f8{constructor(J=0,Q=0,$=0,Z=f8.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,K=Z[0],U=Z[4],W=Z[8],H=Z[1],Y=Z[5],G=Z[9],N=Z[2],D=Z[6],X=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(M9(W,-1,1)),Math.abs(W)<0.9999999)this._x=Math.atan2(-G,X),this._z=Math.atan2(-U,K);else this._x=Math.atan2(D,Y),this._z=0;break;case"YXZ":if(this._x=Math.asin(-M9(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(W,X),this._z=Math.atan2(H,Y);else this._y=Math.atan2(-N,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(M9(D,-1,1)),Math.abs(D)<0.9999999)this._y=Math.atan2(-N,X),this._z=Math.atan2(-U,Y);else this._y=0,this._z=Math.atan2(H,K);break;case"ZYX":if(this._y=Math.asin(-M9(N,-1,1)),Math.abs(N)<0.9999999)this._x=Math.atan2(D,X),this._z=Math.atan2(H,K);else this._x=0,this._z=Math.atan2(-U,Y);break;case"YZX":if(this._z=Math.asin(M9(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-G,Y),this._y=Math.atan2(-N,K);else this._x=0,this._y=Math.atan2(W,X);break;case"XZY":if(this._z=Math.asin(-M9(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(D,Y),this._y=Math.atan2(W,K);else this._x=Math.atan2(-G,X),this._y=0;break;default:o0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return OW.makeRotationFromQuaternion(J),this.setFromRotationMatrix(OW,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return MW.setFromEuler(this),this.setFromQuaternion(MW,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}f8.DEFAULT_ORDER="XYZ";class c${constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var p5=0,VW=new T,$6=new Z8,w8=new z9,oQ=new T,u6=new T,m5=new T,d5=new Z8,BW=new T(1,0,0),_W=new T(0,1,0),IW=new T(0,0,1),LW={type:"added"},u5={type:"removed"},Z6={type:"childadded",child:null},AZ={type:"childremoved",child:null};class x9 extends x8{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:p5++}),this.uuid=v8(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=x9.DEFAULT_UP.clone();let J=new T,Q=new f8,$=new Z8,Z=new T(1,1,1);function K(){$.setFromEuler(Q,!1)}function U(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(K),$._onChange(U),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new z9},normalMatrix:{value:new $9}}),this.matrix=new z9,this.matrixWorld=new z9,this.matrixAutoUpdate=x9.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=x9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new c$,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return $6.setFromAxisAngle(J,Q),this.quaternion.multiply($6),this}rotateOnWorldAxis(J,Q){return $6.setFromAxisAngle(J,Q),this.quaternion.premultiply($6),this}rotateX(J){return this.rotateOnAxis(BW,J)}rotateY(J){return this.rotateOnAxis(_W,J)}rotateZ(J){return this.rotateOnAxis(IW,J)}translateOnAxis(J,Q){return VW.copy(J).applyQuaternion(this.quaternion),this.position.add(VW.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(BW,J)}translateY(J){return this.translateOnAxis(_W,J)}translateZ(J){return this.translateOnAxis(IW,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(w8.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)oQ.copy(J);else oQ.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),u6.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)w8.lookAt(u6,oQ,this.up);else w8.lookAt(oQ,u6,this.up);if(this.quaternion.setFromRotationMatrix(w8),Z)w8.extractRotation(Z.matrixWorld),$6.setFromRotationMatrix(w8),this.quaternion.premultiply($6.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return e0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(LW),Z6.child=J,this.dispatchEvent(Z6),Z6.child=null;else e0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(u5),AZ.child=J,this.dispatchEvent(AZ),AZ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),w8.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),w8.multiply(J.parent.matrixWorld);return J.applyMatrix4(w8),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(LW),Z6.child=J,this.dispatchEvent(Z6),Z6.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let U=this.children[$].getObjectByProperty(J,Q);if(U!==void 0)return U}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let K=0,U=Z.length;K<U;K++)Z[K].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(u6,J,m5),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(u6,d5,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,K=this.matrix.elements;K[12]+=Q-K[0]*Q-K[4]*$-K[8]*Z,K[13]+=$-K[1]*Q-K[5]*$-K[9]*Z,K[14]+=Z-K[2]*Q-K[6]*$-K[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let K=this.children;for(let U=0,W=K.length;U<W;U++)K[U].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,Z.name=this.name,Z.castShadow=this.castShadow,Z.receiveShadow=this.receiveShadow,Z.visible=this.visible,Z.frustumCulled=this.frustumCulled,Z.renderOrder=this.renderOrder,Z.static=this.static,Z.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((W)=>({...W,boundingBox:W.boundingBox?W.boundingBox.toJSON():void 0,boundingSphere:W.boundingSphere?W.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((W)=>({...W})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function K(W,H){if(W[H.uuid]===void 0)W[H.uuid]=H.toJSON(J);return H.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=K(J.geometries,this.geometry);let W=this.geometry.parameters;if(W!==void 0&&W.shapes!==void 0){let H=W.shapes;if(Array.isArray(H))for(let Y=0,G=H.length;Y<G;Y++){let N=H[Y];K(J.shapes,N)}else K(J.shapes,H)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let W=[];for(let H=0,Y=this.material.length;H<Y;H++)W.push(K(J.materials,this.material[H]));Z.material=W}else Z.material=K(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let W=0;W<this.children.length;W++)Z.children.push(this.children[W].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let W=0;W<this.animations.length;W++){let H=this.animations[W];Z.animations.push(K(J.animations,H))}}if(Q){let W=U(J.geometries),H=U(J.materials),Y=U(J.textures),G=U(J.images),N=U(J.shapes),D=U(J.skeletons),X=U(J.animations),F=U(J.nodes);if(W.length>0)$.geometries=W;if(H.length>0)$.materials=H;if(Y.length>0)$.textures=Y;if(G.length>0)$.images=G;if(N.length>0)$.shapes=N;if(D.length>0)$.skeletons=D;if(X.length>0)$.animations=X;if(F.length>0)$.nodes=F}return $.object=Z,$;function U(W){let H=[];for(let Y in W){let G=W[Y];delete G.metadata,H.push(G)}return H}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}x9.DEFAULT_UP=new T(0,1,0);x9.DEFAULT_MATRIX_AUTO_UPDATE=!0;x9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _0 extends x9{constructor(){super();this.isGroup=!0,this.type="Group"}}var l5={type:"move"};class _Q{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new _0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new _0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new _0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,K=null,U=null,W=this._targetRay,H=this._grip,Y=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(Y&&J.hand){U=!0;for(let O of J.hand.values()){let V=Q.getJointPose(O,$),q=this._getHandJoint(Y,O);if(V!==null)q.matrix.fromArray(V.transform.matrix),q.matrix.decompose(q.position,q.rotation,q.scale),q.matrixWorldNeedsUpdate=!0,q.jointRadius=V.radius;q.visible=V!==null}let G=Y.joints["index-finger-tip"],N=Y.joints["thumb-tip"],D=G.position.distanceTo(N.position),X=0.02,F=0.005;if(Y.inputState.pinching&&D>X+F)Y.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!Y.inputState.pinching&&D<=X-F)Y.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(H!==null&&J.gripSpace){if(K=Q.getPose(J.gripSpace,$),K!==null){if(H.matrix.fromArray(K.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,K.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(K.linearVelocity);else H.hasLinearVelocity=!1;if(K.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(K.angularVelocity);else H.hasAngularVelocity=!1;if(H.eventsEnabled)H.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(W!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&K!==null)Z=K;if(Z!==null){if(W.matrix.fromArray(Z.transform.matrix),W.matrix.decompose(W.position,W.rotation,W.scale),W.matrixWorldNeedsUpdate=!0,Z.linearVelocity)W.hasLinearVelocity=!0,W.linearVelocity.copy(Z.linearVelocity);else W.hasLinearVelocity=!1;if(Z.angularVelocity)W.hasAngularVelocity=!0,W.angularVelocity.copy(Z.angularVelocity);else W.hasAngularVelocity=!1;this.dispatchEvent(l5)}}}if(W!==null)W.visible=Z!==null;if(H!==null)H.visible=K!==null;if(Y!==null)Y.visible=U!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new _0;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var aH={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},KJ={h:0,s:0,l:0},aQ={h:0,s:0,l:0};function PZ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class U0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,q9.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=q9.workingColorSpace){return this.r=J,this.g=Q,this.b=$,q9.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=q9.workingColorSpace){if(J=y5(J,1),Q=M9(Q,0,1),$=M9($,0,1),Q===0)this.r=this.g=this.b=$;else{let K=$<=0.5?$*(1+Q):$+Q-$*Q,U=2*$-K;this.r=PZ(U,K,J+0.3333333333333333),this.g=PZ(U,K,J),this.b=PZ(U,K,J-0.3333333333333333)}return q9.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(K){if(K===void 0)return;if(parseFloat(K)<1)o0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,U=Z[1],W=Z[2];switch(U){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(W))return $(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,Q);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(W))return $(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,Q);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(W))return $(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,Q);break;default:o0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=Z[1],U=K.length;if(U===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,Q);else if(U===6)return this.setHex(parseInt(K,16),Q);else o0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=aH[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else o0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=y8(J.r),this.g=y8(J.g),this.b=y8(J.b),this}copyLinearToSRGB(J){return this.r=M6(J.r),this.g=M6(J.g),this.b=M6(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return q9.workingToColorSpace(I7.copy(this),J),Math.round(M9(I7.r*255,0,255))*65536+Math.round(M9(I7.g*255,0,255))*256+Math.round(M9(I7.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=q9.workingColorSpace){q9.workingToColorSpace(I7.copy(this),Q);let{r:$,g:Z,b:K}=I7,U=Math.max($,Z,K),W=Math.min($,Z,K),H,Y,G=(W+U)/2;if(W===U)H=0,Y=0;else{let N=U-W;switch(Y=G<=0.5?N/(U+W):N/(2-U-W),U){case $:H=(Z-K)/N+(Z<K?6:0);break;case Z:H=(K-$)/N+2;break;case K:H=($-Z)/N+4;break}H/=6}return J.h=H,J.s=Y,J.l=G,J}getRGB(J,Q=q9.workingColorSpace){return q9.workingToColorSpace(I7.copy(this),Q),J.r=I7.r,J.g=I7.g,J.b=I7.b,J}getStyle(J="srgb"){q9.workingToColorSpace(I7.copy(this),J);let{r:Q,g:$,b:Z}=I7;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(KJ),this.setHSL(KJ.h+J,KJ.s+Q,KJ.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(KJ),J.getHSL(aQ);let $=_Z(KJ.h,aQ.h,Q),Z=_Z(KJ.s,aQ.s,Q),K=_Z(KJ.l,aQ.l,Q);return this.setHSL($,Z,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,K=J.elements;return this.r=K[0]*Q+K[3]*$+K[6]*Z,this.g=K[1]*Q+K[4]*$+K[7]*Z,this.b=K[2]*Q+K[5]*$+K[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var I7=new U0;U0.NAMES=aH;class SJ{constructor(J,Q=0.00025){this.isFogExp2=!0,this.name="",this.color=new U0(J),this.density=Q}clone(){return new SJ(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class V8 extends x9{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new f8,this.environmentIntensity=1,this.environmentRotation=new f8,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();return Q.object.backgroundBlurriness=this.backgroundBlurriness,Q.object.backgroundIntensity=this.backgroundIntensity,Q.object.backgroundRotation=this.backgroundRotation.toArray(),Q.object.environmentIntensity=this.environmentIntensity,Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var e7=new T,T8=new T,wZ=new T,S8=new T,K6=new T,U6=new T,CW=new T,TZ=new T,SZ=new T,kZ=new T,jZ=new a9,vZ=new a9,yZ=new a9;class T7{constructor(J=new T,Q=new T,$=new T){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),e7.subVectors(J,Q),Z.cross(e7);let K=Z.lengthSq();if(K>0)return Z.multiplyScalar(1/Math.sqrt(K));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,K){e7.subVectors(Z,Q),T8.subVectors($,Q),wZ.subVectors(J,Q);let U=e7.dot(e7),W=e7.dot(T8),H=e7.dot(wZ),Y=T8.dot(T8),G=T8.dot(wZ),N=U*Y-W*W;if(N===0)return K.set(0,0,0),null;let D=1/N,X=(Y*H-W*G)*D,F=(U*G-W*H)*D;return K.set(1-X-F,F,X)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,S8)===null)return!1;return S8.x>=0&&S8.y>=0&&S8.x+S8.y<=1}static getInterpolation(J,Q,$,Z,K,U,W,H){if(this.getBarycoord(J,Q,$,Z,S8)===null){if(H.x=0,H.y=0,"z"in H)H.z=0;if("w"in H)H.w=0;return null}return H.setScalar(0),H.addScaledVector(K,S8.x),H.addScaledVector(U,S8.y),H.addScaledVector(W,S8.z),H}static getInterpolatedAttribute(J,Q,$,Z,K,U){return jZ.setScalar(0),vZ.setScalar(0),yZ.setScalar(0),jZ.fromBufferAttribute(J,Q),vZ.fromBufferAttribute(J,$),yZ.fromBufferAttribute(J,Z),U.setScalar(0),U.addScaledVector(jZ,K.x),U.addScaledVector(vZ,K.y),U.addScaledVector(yZ,K.z),U}static isFrontFacing(J,Q,$,Z){return e7.subVectors($,Q),T8.subVectors(J,Q),e7.cross(T8).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return e7.subVectors(this.c,this.b),T8.subVectors(this.a,this.b),e7.cross(T8).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return T7.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return T7.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,K){return T7.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,K)}containsPoint(J){return T7.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return T7.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,K=this.c,U,W;K6.subVectors(Z,$),U6.subVectors(K,$),TZ.subVectors(J,$);let H=K6.dot(TZ),Y=U6.dot(TZ);if(H<=0&&Y<=0)return Q.copy($);SZ.subVectors(J,Z);let G=K6.dot(SZ),N=U6.dot(SZ);if(G>=0&&N<=G)return Q.copy(Z);let D=H*N-G*Y;if(D<=0&&H>=0&&G<=0)return U=H/(H-G),Q.copy($).addScaledVector(K6,U);kZ.subVectors(J,K);let X=K6.dot(kZ),F=U6.dot(kZ);if(F>=0&&X<=F)return Q.copy(K);let O=X*Y-H*F;if(O<=0&&Y>=0&&F<=0)return W=Y/(Y-F),Q.copy($).addScaledVector(U6,W);let V=G*F-X*N;if(V<=0&&N-G>=0&&X-F>=0)return CW.subVectors(K,Z),W=(N-G)/(N-G+(X-F)),Q.copy(Z).addScaledVector(CW,W);let q=1/(V+O+D);return U=O*q,W=D*q,Q.copy($).addScaledVector(K6,U).addScaledVector(U6,W)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class g8{constructor(J=new T(1/0,1/0,1/0),Q=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(J8.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(J8.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=J8.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let K=$.getAttribute("position");if(Q===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let U=0,W=K.count;U<W;U++){if(J.isMesh===!0)J.getVertexPosition(U,J8);else J8.fromBufferAttribute(K,U);J8.applyMatrix4(J.matrixWorld),this.expandByPoint(J8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();rQ.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();rQ.copy($.boundingBox)}rQ.applyMatrix4(J.matrixWorld),this.union(rQ)}}let Z=J.children;for(let K=0,U=Z.length;K<U;K++)this.expandByObject(Z[K],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,J8),J8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(l6),tQ.subVectors(this.max,l6),W6.subVectors(J.a,l6),H6.subVectors(J.b,l6),Y6.subVectors(J.c,l6),UJ.subVectors(H6,W6),WJ.subVectors(Y6,H6),OJ.subVectors(W6,Y6);let Q=[0,-UJ.z,UJ.y,0,-WJ.z,WJ.y,0,-OJ.z,OJ.y,UJ.z,0,-UJ.x,WJ.z,0,-WJ.x,OJ.z,0,-OJ.x,-UJ.y,UJ.x,0,-WJ.y,WJ.x,0,-OJ.y,OJ.x,0];if(!fZ(Q,W6,H6,Y6,tQ))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!fZ(Q,W6,H6,Y6,tQ))return!1;return eQ.crossVectors(UJ,WJ),Q=[eQ.x,eQ.y,eQ.z],fZ(Q,W6,H6,Y6,tQ)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,J8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(J8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return k8[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),k8[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),k8[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),k8[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),k8[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),k8[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),k8[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),k8[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(k8),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var k8=[new T,new T,new T,new T,new T,new T,new T,new T],J8=new T,rQ=new g8,W6=new T,H6=new T,Y6=new T,UJ=new T,WJ=new T,OJ=new T,l6=new T,tQ=new T,eQ=new T,MJ=new T;function fZ(J,Q,$,Z,K){for(let U=0,W=J.length-3;U<=W;U+=3){MJ.fromArray(J,U);let H=K.x*Math.abs(MJ.x)+K.y*Math.abs(MJ.y)+K.z*Math.abs(MJ.z),Y=Q.dot(MJ),G=$.dot(MJ),N=Z.dot(MJ);if(Math.max(-Math.max(Y,G,N),Math.min(Y,G,N))>H)return!1}return!0}var G7=new T,J$=new Z0,c5=0;class Q7 extends x8{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:c5++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,K=this.itemSize;Z<K;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)J$.fromBufferAttribute(this,Q),J$.applyMatrix3(J),this.setXY(Q,J$.x,J$.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)G7.fromBufferAttribute(this,Q),G7.applyMatrix3(J),this.setXYZ(Q,G7.x,G7.y,G7.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)G7.fromBufferAttribute(this,Q),G7.applyMatrix4(J),this.setXYZ(Q,G7.x,G7.y,G7.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)G7.fromBufferAttribute(this,Q),G7.applyNormalMatrix(J),this.setXYZ(Q,G7.x,G7.y,G7.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)G7.fromBufferAttribute(this,Q),G7.transformDirection(J),this.setXYZ(Q,G7.x,G7.y,G7.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=O8($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=u9($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=O8(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=u9(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=O8(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=u9(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=O8(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=u9(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=O8(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=u9(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=u9(Q,this.array),$=u9($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=u9(Q,this.array),$=u9($,this.array),Z=u9(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,K){if(J*=this.itemSize,this.normalized)Q=u9(Q,this.array),$=u9($,this.array),Z=u9(Z,this.array),K=u9(K,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return J.name=this.name,J.usage=this.usage,J.gpuType=this.gpuType,J}dispose(){this.dispatchEvent({type:"dispose"})}}class n$ extends Q7{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class s$ extends Q7{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class J9 extends Q7{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var n5=new g8,c6=new T,bZ=new T;class p8{constructor(J=new T,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else n5.setFromPoints(J).getCenter($);let Z=0;for(let K=0,U=J.length;K<U;K++)Z=Math.max(Z,$.distanceToSquared(J[K]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;c6.subVectors(J,this.center);let Q=c6.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(c6,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else bZ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(c6.copy(J.center).add(bZ)),this.expandByPoint(c6.copy(J.center).sub(bZ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var s5=0,n7=new z9,hZ=new x9,G6=new T,m7=new g8,n6=new g8,D7=new T;class F9 extends x8{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:s5++}),this.uuid=v8(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((j5(J))?s$:n$)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let K=new $9().getNormalMatrix(J);$.applyNormalMatrix(K),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return n7.makeRotationFromQuaternion(J),this.applyMatrix4(n7),this}rotateX(J){return n7.makeRotationX(J),this.applyMatrix4(n7),this}rotateY(J){return n7.makeRotationY(J),this.applyMatrix4(n7),this}rotateZ(J){return n7.makeRotationZ(J),this.applyMatrix4(n7),this}translate(J,Q,$){return n7.makeTranslation(J,Q,$),this.applyMatrix4(n7),this}scale(J,Q,$){return n7.makeScale(J,Q,$),this.applyMatrix4(n7),this}lookAt(J){return hZ.lookAt(J),hZ.updateMatrix(),this.applyMatrix4(hZ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(G6).negate(),this.translate(G6.x,G6.y,G6.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,K=J.length;Z<K;Z++){let U=J[Z];$.push(U.x,U.y,U.z||0)}this.setAttribute("position",new J9($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let K=J[Z];Q.setXYZ(Z,K.x,K.y,K.z||0)}if(J.length>Q.count)o0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new g8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){e0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let K=Q[$];if(m7.setFromBufferAttribute(K),this.morphTargetsRelative)D7.addVectors(this.boundingBox.min,m7.min),this.boundingBox.expandByPoint(D7),D7.addVectors(this.boundingBox.max,m7.max),this.boundingBox.expandByPoint(D7);else this.boundingBox.expandByPoint(m7.min),this.boundingBox.expandByPoint(m7.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))e0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new p8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){e0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(J){let $=this.boundingSphere.center;if(m7.setFromBufferAttribute(J),Q)for(let K=0,U=Q.length;K<U;K++){let W=Q[K];if(n6.setFromBufferAttribute(W),this.morphTargetsRelative)D7.addVectors(m7.min,n6.min),m7.expandByPoint(D7),D7.addVectors(m7.max,n6.max),m7.expandByPoint(D7);else m7.expandByPoint(n6.min),m7.expandByPoint(n6.max)}m7.getCenter($);let Z=0;for(let K=0,U=J.count;K<U;K++)D7.fromBufferAttribute(J,K),Z=Math.max(Z,$.distanceToSquared(D7));if(Q)for(let K=0,U=Q.length;K<U;K++){let W=Q[K],H=this.morphTargetsRelative;for(let Y=0,G=W.count;Y<G;Y++){if(D7.fromBufferAttribute(W,Y),H)G6.fromBufferAttribute(J,Y),D7.add(G6);Z=Math.max(Z,$.distanceToSquared(D7))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))e0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){e0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:K}=Q,U=this.getAttribute("tangent");if(U===void 0||U.count!==$.count)U=new Q7(new Float32Array(4*$.count),4),this.setAttribute("tangent",U);let W=[],H=[];for(let z=0;z<$.count;z++)W[z]=new T,H[z]=new T;let Y=new T,G=new T,N=new T,D=new Z0,X=new Z0,F=new Z0,O=new T,V=new T;function q(z,M,I){Y.fromBufferAttribute($,z),G.fromBufferAttribute($,M),N.fromBufferAttribute($,I),D.fromBufferAttribute(K,z),X.fromBufferAttribute(K,M),F.fromBufferAttribute(K,I),G.sub(Y),N.sub(Y),X.sub(D),F.sub(D);let f=1/(X.x*F.y-F.x*X.y);if(!isFinite(f))return;O.copy(G).multiplyScalar(F.y).addScaledVector(N,-X.y).multiplyScalar(f),V.copy(N).multiplyScalar(X.x).addScaledVector(G,-F.x).multiplyScalar(f),W[z].add(O),W[M].add(O),W[I].add(O),H[z].add(V),H[M].add(V),H[I].add(V)}let E=this.groups;if(E.length===0)E=[{start:0,count:J.count}];for(let z=0,M=E.length;z<M;++z){let I=E[z],f=I.start,S=I.count;for(let h=f,a=f+S;h<a;h+=3)q(J.getX(h+0),J.getX(h+1),J.getX(h+2))}let L=new T,A=new T,R=new T,_=new T;function B(z){R.fromBufferAttribute(Z,z),_.copy(R);let M=W[z];L.copy(M),L.sub(R.multiplyScalar(R.dot(M))).normalize(),A.crossVectors(_,M);let f=A.dot(H[z])<0?-1:1;U.setXYZW(z,L.x,L.y,L.z,f)}for(let z=0,M=E.length;z<M;++z){let I=E[z],f=I.start,S=I.count;for(let h=f,a=f+S;h<a;h+=3)B(J.getX(h+0)),B(J.getX(h+1)),B(J.getX(h+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new Q7(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let D=0,X=$.count;D<X;D++)$.setXYZ(D,0,0,0);let Z=new T,K=new T,U=new T,W=new T,H=new T,Y=new T,G=new T,N=new T;if(J)for(let D=0,X=J.count;D<X;D+=3){let F=J.getX(D+0),O=J.getX(D+1),V=J.getX(D+2);Z.fromBufferAttribute(Q,F),K.fromBufferAttribute(Q,O),U.fromBufferAttribute(Q,V),G.subVectors(U,K),N.subVectors(Z,K),G.cross(N),W.fromBufferAttribute($,F),H.fromBufferAttribute($,O),Y.fromBufferAttribute($,V),W.add(G),H.add(G),Y.add(G),$.setXYZ(F,W.x,W.y,W.z),$.setXYZ(O,H.x,H.y,H.z),$.setXYZ(V,Y.x,Y.y,Y.z)}else for(let D=0,X=Q.count;D<X;D+=3)Z.fromBufferAttribute(Q,D+0),K.fromBufferAttribute(Q,D+1),U.fromBufferAttribute(Q,D+2),G.subVectors(U,K),N.subVectors(Z,K),G.cross(N),$.setXYZ(D+0,G.x,G.y,G.z),$.setXYZ(D+1,G.x,G.y,G.z),$.setXYZ(D+2,G.x,G.y,G.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)D7.fromBufferAttribute(J,Q),D7.normalize(),J.setXYZ(Q,D7.x,D7.y,D7.z)}toNonIndexed(){function J(W,H){let{array:Y,itemSize:G,normalized:N}=W,D=new Y.constructor(H.length*G),X=0,F=0;for(let O=0,V=H.length;O<V;O++){if(W.isInterleavedBufferAttribute)X=H[O]*W.data.stride+W.offset;else X=H[O]*G;for(let q=0;q<G;q++)D[F++]=Y[X++]}return new Q7(D,G,N)}if(this.index===null)return o0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new F9,$=this.index.array,Z=this.attributes;for(let W in Z){let H=Z[W],Y=J(H,$);Q.setAttribute(W,Y)}let K=this.morphAttributes;for(let W in K){let H=[],Y=K[W];for(let G=0,N=Y.length;G<N;G++){let D=Y[G],X=J(D,$);H.push(X)}Q.morphAttributes[W]=H}Q.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;for(let W=0,H=U.length;W<H;W++){let Y=U[W];Q.addGroup(Y.start,Y.count,Y.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,J.name=this.name,Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let H=this.parameters;for(let Y in H)if(H[Y]!==void 0)J[Y]=H[Y];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let H in $){let Y=$[H];J.data.attributes[H]=Y.toJSON(J.data)}let Z={},K=!1;for(let H in this.morphAttributes){let Y=this.morphAttributes[H],G=[];for(let N=0,D=Y.length;N<D;N++){let X=Y[N];G.push(X.toJSON(J.data))}if(G.length>0)Z[H]=G,K=!0}if(K)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;if(U.length>0)J.data.groups=JSON.parse(JSON.stringify(U));let W=this.boundingSphere;if(W!==null)J.data.boundingSphere=W.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let Y in Z){let G=Z[Y];this.setAttribute(Y,G.clone(Q))}let K=J.morphAttributes;for(let Y in K){let G=[],N=K[Y];for(let D=0,X=N.length;D<X;D++)G.push(N[D].clone(Q));this.morphAttributes[Y]=G}this.morphTargetsRelative=J.morphTargetsRelative;let U=J.groups;for(let Y=0,G=U.length;Y<G;Y++){let N=U[Y];this.addGroup(N.start,N.count,N.materialIndex)}let W=J.boundingBox;if(W!==null)this.boundingBox=W.clone();let H=J.boundingSphere;if(H!==null)this.boundingSphere=H.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sK{constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=v8()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,$){J*=this.stride,$*=Q.stride;for(let Z=0,K=this.stride;Z<K;Z++)this.array[J+Z]=Q.array[$+Z];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=v8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),$=new this.constructor(Q,this.stride);return $.setUsage(this.usage),$}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=v8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));let Q={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return Q.usage=this.usage,Q}}var A7=new T;class UQ{constructor(J,Q,$,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=$,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,$=this.data.count;Q<$;Q++)A7.fromBufferAttribute(this,Q),A7.applyMatrix4(J),this.setXYZ(Q,A7.x,A7.y,A7.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)A7.fromBufferAttribute(this,Q),A7.applyNormalMatrix(J),this.setXYZ(Q,A7.x,A7.y,A7.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)A7.fromBufferAttribute(this,Q),A7.transformDirection(J),this.setXYZ(Q,A7.x,A7.y,A7.z);return this}getComponent(J,Q){let $=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)$=O8($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=u9($,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=$,this}setX(J,Q){if(this.normalized)Q=u9(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=u9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=u9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=u9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=O8(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=O8(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=O8(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=O8(Q,this.array);return Q}setXY(J,Q,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=u9(Q,this.array),$=u9($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=u9(Q,this.array),$=u9($,this.array),Z=u9(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this}setXYZW(J,Q,$,Z,K){if(J=J*this.data.stride+this.offset,this.normalized)Q=u9(Q,this.array),$=u9($,this.array),Z=u9(Z,this.array),K=u9(K,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this.data.array[J+3]=K,this}clone(J){if(J===void 0){ZQ("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[Z+K])}return new Q7(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new UQ(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){ZQ("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[Z+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var xZ=new T,i5=new T,o5=new $9;class R8{constructor(J=new T(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=xZ.subVectors($,Q).cross(i5.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(xZ),K=this.normal.dot(Z);if(K===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let U=-(J.start.dot(this.normal)+this.constant)/K;if($===!0&&(U<0||U>1))return null;return Q.copy(J.start).addScaledVector(Z,U)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||o5.getNormalMatrix(J),Z=this.coplanarPoint(xZ).applyMatrix4(J),K=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(J){return this.normal.fromArray(J.normal),this.constant=J.constant,this}}var a5=0;class K8 extends x8{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:a5++}),this.uuid=v8(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new U0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){o0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){o0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector2&&($&&$.isVector2)||Z&&Z.isEuler&&($&&$.isEuler)||Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,$.blending=this.blending,$.side=this.side,$.shadowSide=this.shadowSide,$.vertexColors=this.vertexColors,$.opacity=this.opacity,$.transparent=this.transparent,$.blendSrc=this.blendSrc,$.blendDst=this.blendDst,$.blendEquation=this.blendEquation,$.blendSrcAlpha=this.blendSrcAlpha,$.blendDstAlpha=this.blendDstAlpha,$.blendEquationAlpha=this.blendEquationAlpha,$.blendColor=this.blendColor.getHex(),$.blendAlpha=this.blendAlpha,$.depthFunc=this.depthFunc,$.depthTest=this.depthTest,$.depthWrite=this.depthWrite,$.colorWrite=this.colorWrite,$.clipIntersection=this.clipIntersection,$.clipShadows=this.clipShadows,$.stencilWriteMask=this.stencilWriteMask,$.stencilFunc=this.stencilFunc,$.stencilRef=this.stencilRef,$.stencilFuncMask=this.stencilFuncMask,$.stencilFail=this.stencilFail,$.stencilZFail=this.stencilZFail,$.stencilZPass=this.stencilZPass,$.stencilWrite=this.stencilWrite,$.polygonOffset=this.polygonOffset,$.polygonOffsetFactor=this.polygonOffsetFactor,$.polygonOffsetUnits=this.polygonOffsetUnits,$.dithering=this.dithering,$.alphaTest=this.alphaTest,$.alphaHash=this.alphaHash,$.alphaToCoverage=this.alphaToCoverage,$.premultipliedAlpha=this.premultipliedAlpha,$.forceSinglePass=this.forceSinglePass,$.allowOverride=this.allowOverride,$.visible=this.visible,$.toneMapped=this.toneMapped,$.name=this.name,this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)$.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)$.clippingPlanes=this.clippingPlanes.map((K)=>K.toJSON());if(this.rotation!==void 0)$.rotation=this.rotation;if(this.depthPacking!==void 0)$.depthPacking=this.depthPacking;if(this.linewidth!==void 0)$.linewidth=this.linewidth;if(this.linecap!==void 0)$.linecap=this.linecap;if(this.linejoin!==void 0)$.linejoin=this.linejoin;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.wireframe!==void 0)$.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)$.flatShading=this.flatShading;if(this.fog!==void 0)$.fog=this.fog;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(K){let U=[];for(let W in K){let H=K[W];delete H.metadata,U.push(H)}return U}if(Q){let K=Z(J.textures),U=Z(J.images);if(K.length>0)$.textures=K;if(U.length>0)$.images=U}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new U0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.retroreflectivity!==void 0)this.retroreflectivity=J.retroreflectivity;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.clippingPlanes!==void 0)this.clippingPlanes=J.clippingPlanes.map(($)=>new R8().fromJSON($));if(J.clipIntersection!==void 0)this.clipIntersection=J.clipIntersection;if(J.clipShadows!==void 0)this.clipShadows=J.clipShadows;if(J.depthPacking!==void 0)this.depthPacking=J.depthPacking;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.linecap!==void 0)this.linecap=J.linecap;if(J.linejoin!==void 0)this.linejoin=J.linejoin;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new Z0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new Z0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let K=0;K!==Z;++K)$[K]=Q[K].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class P6 extends K8{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new U0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var X6,s6=new T,N6=new T,q6=new T,F6=new Z0,i6=new Z0,rH=new z9,Q$=new T,o6=new T,$$=new T,zW=new Z0,gZ=new Z0,AW=new Z0;class IQ extends x9{constructor(J=new P6){super();if(this.isSprite=!0,this.type="Sprite",X6===void 0){X6=new F9;let Q=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),$=new sK(Q,5);X6.setIndex([0,1,2,0,2,3]),X6.setAttribute("position",new UQ($,3,0,!1)),X6.setAttribute("uv",new UQ($,2,3,!1))}this.geometry=X6,this.material=J,this.center=new Z0(0.5,0.5),this.count=1}intersectsFrustum(J){return J.intersectsSprite(this)}raycast(J,Q){if(J.camera===null)e0('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(N6.setFromMatrixScale(this.matrixWorld),rH.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),q6.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)N6.multiplyScalar(-q6.z);let $=this.material.rotation,Z,K;if($!==0)K=Math.cos($),Z=Math.sin($);let U=this.center;Z$(Q$.set(-0.5,-0.5,0),q6,U,N6,Z,K),Z$(o6.set(0.5,-0.5,0),q6,U,N6,Z,K),Z$($$.set(0.5,0.5,0),q6,U,N6,Z,K),zW.set(0,0),gZ.set(1,0),AW.set(1,1);let W=J.ray.intersectTriangle(Q$,o6,$$,!1,s6);if(W===null){if(Z$(o6.set(-0.5,0.5,0),q6,U,N6,Z,K),gZ.set(0,1),W=J.ray.intersectTriangle(Q$,$$,o6,!1,s6),W===null)return}let H=J.ray.origin.distanceTo(s6);if(H<J.near||H>J.far)return;Q.push({distance:H,point:s6.clone(),uv:T7.getInterpolation(s6,Q$,o6,$$,zW,gZ,AW,new Z0),face:null,object:this})}copy(J,Q){if(super.copy(J,Q),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function Z$(J,Q,$,Z,K,U){if(F6.subVectors(J,$).addScalar(0.5).multiply(Z),K!==void 0)i6.x=U*F6.x-K*F6.y,i6.y=K*F6.x+U*F6.y;else i6.copy(F6);J.copy(Q),J.x+=i6.x,J.y+=i6.y,J.applyMatrix4(rH)}var j8=new T,pZ=new T,K$=new T,U$=new T;class LQ{constructor(J=new T,Q=new T(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,j8)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=j8.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return j8.copy(this.origin).addScaledVector(this.direction,Q),j8.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){pZ.copy(J).add(Q).multiplyScalar(0.5),K$.copy(Q).sub(J).normalize(),U$.copy(this.origin).sub(pZ);let K=J.distanceTo(Q)*0.5,U=-this.direction.dot(K$),W=U$.dot(this.direction),H=-U$.dot(K$),Y=U$.lengthSq(),G=Math.abs(1-U*U),N,D,X,F;if(G>0)if(N=U*H-W,D=U*W-H,F=K*G,N>=0)if(D>=-F)if(D<=F){let O=1/G;N*=O,D*=O,X=N*(N+U*D+2*W)+D*(U*N+D+2*H)+Y}else D=K,N=Math.max(0,-(U*D+W)),X=-N*N+D*(D+2*H)+Y;else D=-K,N=Math.max(0,-(U*D+W)),X=-N*N+D*(D+2*H)+Y;else if(D<=-F)N=Math.max(0,-(-U*K+W)),D=N>0?-K:Math.min(Math.max(-K,-H),K),X=-N*N+D*(D+2*H)+Y;else if(D<=F)N=0,D=Math.min(Math.max(-K,-H),K),X=D*(D+2*H)+Y;else N=Math.max(0,-(U*K+W)),D=N>0?K:Math.min(Math.max(-K,-H),K),X=-N*N+D*(D+2*H)+Y;else D=U>0?-K:K,N=Math.max(0,-(U*D+W)),X=-N*N+D*(D+2*H)+Y;if($)$.copy(this.origin).addScaledVector(this.direction,N);if(Z)Z.copy(pZ).addScaledVector(K$,D);return X}intersectSphere(J,Q){if(J.radius<0)return null;j8.subVectors(J.center,this.origin);let $=j8.dot(this.direction),Z=j8.dot(j8)-$*$,K=J.radius*J.radius;if(Z>K)return null;let U=Math.sqrt(K-Z),W=$-U,H=$+U;if(H<0)return null;if(W<0)return this.at(H,Q);return this.at(W,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,K,U,W,H,Y=1/this.direction.x,G=1/this.direction.y,N=1/this.direction.z,D=this.origin;if(Y>=0)$=(J.min.x-D.x)*Y,Z=(J.max.x-D.x)*Y;else $=(J.max.x-D.x)*Y,Z=(J.min.x-D.x)*Y;if(G>=0)K=(J.min.y-D.y)*G,U=(J.max.y-D.y)*G;else K=(J.max.y-D.y)*G,U=(J.min.y-D.y)*G;if($>U||K>Z)return null;if(K>$||isNaN($))$=K;if(U<Z||isNaN(Z))Z=U;if(N>=0)W=(J.min.z-D.z)*N,H=(J.max.z-D.z)*N;else W=(J.max.z-D.z)*N,H=(J.min.z-D.z)*N;if($>H||W>Z)return null;if(W>$||$!==$)$=W;if(H<Z||Z!==Z)Z=H;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,j8)!==null}intersectTriangle(J,Q,$,Z,K){let U=this.origin,W=this.direction,H=W.x,Y=W.y,G=W.z,N=J.x-U.x,D=J.y-U.y,X=J.z-U.z,F=Q.x-U.x,O=Q.y-U.y,V=Q.z-U.z,q=$.x-U.x,E=$.y-U.y,L=$.z-U.z,A=Math.abs(H),R=Math.abs(Y),_=Math.abs(G),B,z,M,I,f,S,h,a,k,m,e,l;if(A>=R&&A>=_)if(M=H,S=N,k=F,l=q,H>=0)B=Y,z=G,I=D,f=X,h=O,a=V,m=E,e=L;else B=G,z=Y,I=X,f=D,h=V,a=O,m=L,e=E;else if(R>=_)if(M=Y,S=D,k=O,l=E,Y>=0)B=G,z=H,I=X,f=N,h=V,a=F,m=L,e=q;else B=H,z=G,I=N,f=X,h=F,a=V,m=q,e=L;else if(M=G,S=X,k=V,l=L,G>=0)B=H,z=Y,I=N,f=D,h=F,a=O,m=q,e=E;else B=Y,z=H,I=D,f=N,h=O,a=F,m=E,e=q;if(M===0)return null;let i=B/M,p=z/M,o=1/M,H0=I-i*S,S0=f-p*S,x0=h-i*k,t=a-p*k,h0=m-i*l,n=e-p*l,W0=h0*t-n*x0,F0=H0*n-S0*h0,g0=x0*S0-t*H0;if(Z){if(W0<0||F0<0||g0<0)return null}else if((W0<0||F0<0||g0<0)&&(W0>0||F0>0||g0>0))return null;let r0=W0+F0+g0;if(r0===0)return null;let y0=o*(W0*S+F0*k+g0*l);if(r0>0?y0<0:y0>0)return null;return this.at(y0/r0,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class l0 extends K8{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new U0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new f8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var PW=new z9,VJ=new LQ,W$=new p8,wW=new T,H$=new T,Y$=new T,G$=new T,mZ=new T,X$=new T,TW=new T,N$=new T;class $0 extends x9{constructor(J=new F9,Q=new l0){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let W=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[W]=K}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,K=$.morphAttributes.position,U=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let W=this.morphTargetInfluences;if(K&&W){X$.set(0,0,0);for(let H=0,Y=K.length;H<Y;H++){let G=W[H],N=K[H];if(G===0)continue;if(mZ.fromBufferAttribute(N,J),U)X$.addScaledVector(mZ,G);else X$.addScaledVector(mZ.sub(Q),G)}Q.add(X$)}return Q}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.material,K=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(W$.copy($.boundingSphere),W$.applyMatrix4(K),VJ.copy(J.ray).recast(J.near),W$.containsPoint(VJ.origin)===!1){if(VJ.intersectSphere(W$,wW)===null)return;if(VJ.origin.distanceToSquared(wW)>(J.far-J.near)**2)return}if(PW.copy(K).invert(),VJ.copy(J.ray).applyMatrix4(PW),$.boundingBox!==null){if(VJ.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,VJ)}_computeIntersections(J,Q,$){let Z,K=this.geometry,U=this.material,W=K.index,H=K.attributes.position,Y=K.attributes.uv,G=K.attributes.uv1,N=K.attributes.normal,D=K.groups,X=K.drawRange;if(W!==null)if(Array.isArray(U))for(let F=0,O=D.length;F<O;F++){let V=D[F],q=U[V.materialIndex],E=Math.max(V.start,X.start),L=Math.min(W.count,Math.min(V.start+V.count,X.start+X.count));for(let A=E,R=L;A<R;A+=3){let _=W.getX(A),B=W.getX(A+1),z=W.getX(A+2);if(Z=q$(this,q,J,$,Y,G,N,_,B,z),Z)Z.faceIndex=Math.floor(A/3),Z.face.materialIndex=V.materialIndex,Q.push(Z)}}else{let F=Math.max(0,X.start),O=Math.min(W.count,X.start+X.count);for(let V=F,q=O;V<q;V+=3){let E=W.getX(V),L=W.getX(V+1),A=W.getX(V+2);if(Z=q$(this,U,J,$,Y,G,N,E,L,A),Z)Z.faceIndex=Math.floor(V/3),Q.push(Z)}}else if(H!==void 0)if(Array.isArray(U))for(let F=0,O=D.length;F<O;F++){let V=D[F],q=U[V.materialIndex],E=Math.max(V.start,X.start),L=Math.min(H.count,Math.min(V.start+V.count,X.start+X.count));for(let A=E,R=L;A<R;A+=3){let _=A,B=A+1,z=A+2;if(Z=q$(this,q,J,$,Y,G,N,_,B,z),Z)Z.faceIndex=Math.floor(A/3),Z.face.materialIndex=V.materialIndex,Q.push(Z)}}else{let F=Math.max(0,X.start),O=Math.min(H.count,X.start+X.count);for(let V=F,q=O;V<q;V+=3){let E=V,L=V+1,A=V+2;if(Z=q$(this,U,J,$,Y,G,N,E,L,A),Z)Z.faceIndex=Math.floor(V/3),Q.push(Z)}}}}function r5(J,Q,$,Z,K,U,W,H){let Y;if(Q.side===1)Y=Z.intersectTriangle(W,U,K,!0,H);else Y=Z.intersectTriangle(K,U,W,Q.side===0,H);if(Y===null)return null;N$.copy(H),N$.applyMatrix4(J.matrixWorld);let G=$.ray.origin.distanceTo(N$);if(G<$.near||G>$.far)return null;return{distance:G,point:N$.clone(),object:J}}function q$(J,Q,$,Z,K,U,W,H,Y,G){J.getVertexPosition(H,H$),J.getVertexPosition(Y,Y$),J.getVertexPosition(G,G$);let N=r5(J,Q,$,Z,H$,Y$,G$,TW);if(N){let D=new T;if(T7.getBarycoord(TW,H$,Y$,G$,D),K)N.uv=T7.getInterpolatedAttribute(K,H,Y,G,D,new Z0);if(U)N.uv1=T7.getInterpolatedAttribute(U,H,Y,G,D,new Z0);if(W){if(N.normal=T7.getInterpolatedAttribute(W,H,Y,G,D,new T),N.normal.dot(Z.direction)>0)N.normal.multiplyScalar(-1)}let X={a:H,b:Y,c:G,normal:new T,materialIndex:0};T7.getNormal(H$,Y$,G$,X.normal),N.face=X,N.barycoord=D}return N}class w6 extends V7{constructor(J=null,Q=1,$=1,Z,K,U,W,H,Y=1003,G=1003,N,D){super(null,U,W,H,Y,G,Z,K,N,D);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class P$ extends Q7{constructor(J,Q,$,Z=1){super(J,Q,$);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var D6=new z9,SW=new z9,F$=[],kW=new g8,t5=new z9,a6=new $0,r6=new p8;class p9 extends $0{constructor(J,Q,$){super(J,Q);this.isInstancedMesh=!0,this.instanceMatrix=new P$(new Float32Array($*16),16),this.instanceColor=null,this.morphTexture=null,this.count=$,this.boundingBox=null,this.boundingSphere=null;for(let Z=0;Z<$;Z++)this.setMatrixAt(Z,t5)}computeBoundingBox(){let J=this.geometry,Q=this.count;if(this.boundingBox===null)this.boundingBox=new g8;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,D6),kW.copy(J.boundingBox).applyMatrix4(D6),this.boundingBox.union(kW)}computeBoundingSphere(){let J=this.geometry,Q=this.count;if(this.boundingSphere===null)this.boundingSphere=new p8;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,D6),r6.copy(J.boundingSphere).applyMatrix4(D6),this.boundingSphere.union(r6)}copy(J,Q){if(super.copy(J,Q),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,Q){if(this.instanceColor===null)return Q.setRGB(1,1,1);else return Q.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,Q){return Q.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=this.morphTexture.source.data.data,K=$.length+1,U=J*K+1;for(let W=0;W<$.length;W++)$[W]=Z[U+W]}raycast(J,Q){let $=this.matrixWorld,Z=this.count;if(a6.geometry=this.geometry,a6.material=this.material,a6.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(r6.copy(this.boundingSphere),r6.applyMatrix4($),J.ray.intersectsSphere(r6)===!1)return;for(let K=0;K<Z;K++){this.getMatrixAt(K,D6),SW.multiplyMatrices($,D6),a6.matrixWorld=SW,a6.raycast(J,F$);for(let U=0,W=F$.length;U<W;U++){let H=F$[U];H.instanceId=K,H.object=this,Q.push(H)}F$.length=0}}setColorAt(J,Q){if(this.instanceColor===null)this.instanceColor=new P$(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return Q.toArray(this.instanceColor.array,J*3),this}setMatrixAt(J,Q){return Q.toArray(this.instanceMatrix.array,J*16),this}setMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=$.length+1;if(this.morphTexture===null)this.morphTexture=new w6(new Float32Array(Z*this.count),Z,this.count,1028,1015);let K=this.morphTexture.source.data.data,U=0;for(let Y=0;Y<$.length;Y++)U+=$[Y];let W=this.geometry.morphTargetsRelative?1:1-U,H=Z*J;return K[H]=W,K.set($,H+1),this}updateMorphTargets(){}dispose(){if(super.dispose(),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var BJ=new p8,e5=new Z0(0.5,0.5),D$=new T;class CQ{constructor(J=new R8,Q=new R8,$=new R8,Z=new R8,K=new R8,U=new R8){this.planes=[J,Q,$,Z,K,U]}set(J,Q,$,Z,K,U){let W=this.planes;return W[0].copy(J),W[1].copy(Q),W[2].copy($),W[3].copy(Z),W[4].copy(K),W[5].copy(U),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,K=J.elements,U=K[0],W=K[1],H=K[2],Y=K[3],G=K[4],N=K[5],D=K[6],X=K[7],F=K[8],O=K[9],V=K[10],q=K[11],E=K[12],L=K[13],A=K[14],R=K[15];if(Z[0].setComponents(Y-U,X-G,q-F,R-E).normalize(),Z[1].setComponents(Y+U,X+G,q+F,R+E).normalize(),Z[2].setComponents(Y+W,X+N,q+O,R+L).normalize(),Z[3].setComponents(Y-W,X-N,q-O,R-L).normalize(),$)Z[4].setComponents(H,D,V,A).normalize(),Z[5].setComponents(Y-H,X-D,q-V,R-A).normalize();else if(Z[4].setComponents(Y-H,X-D,q-V,R-A).normalize(),Q===2000)Z[5].setComponents(Y+H,X+D,q+V,R+A).normalize();else if(Q===2001)Z[5].setComponents(H,D,V,A).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();BJ.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();BJ.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(BJ)}intersectsSprite(J){BJ.center.set(0,0,0);let Q=e5.distanceTo(J.center);return BJ.radius=0.7071067811865476+Q,BJ.applyMatrix4(J.matrixWorld),this.intersectsSphere(BJ)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let K=0;K<6;K++)if(Q[K].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(D$.x=Z.normal.x>0?J.max.x:J.min.x,D$.y=Z.normal.y>0?J.max.y:J.min.y,D$.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(D$)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class kJ extends K8{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new U0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var w$=new T,T$=new T,jW=new z9,t6=new LQ,E$=new p8,dZ=new T,vW=new T;class iK extends x9{constructor(J=new F9,Q=new kJ){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let Z=1,K=Q.count;Z<K;Z++)w$.fromBufferAttribute(Q,Z-1),T$.fromBufferAttribute(Q,Z),$[Z]=$[Z-1],$[Z]+=w$.distanceTo(T$);J.setAttribute("lineDistance",new J9($,1))}else o0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,K=J.params.Line.threshold,U=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(E$.copy($.boundingSphere),E$.applyMatrix4(Z),E$.radius+=K,J.ray.intersectsSphere(E$)===!1)return;jW.copy(Z).invert(),t6.copy(J.ray).applyMatrix4(jW);let W=K/((this.scale.x+this.scale.y+this.scale.z)/3),H=W*W,Y=this.isLineSegments?2:1,G=$.index,D=$.attributes.position;if(G!==null){let X=Math.max(0,U.start),F=Math.min(G.count,U.start+U.count);for(let O=X,V=F-1;O<V;O+=Y){let q=G.getX(O),E=G.getX(O+1),L=R$(this,J,t6,H,q,E,O);if(L)Q.push(L)}if(this.isLineLoop){let O=G.getX(F-1),V=G.getX(X),q=R$(this,J,t6,H,O,V,F-1);if(q)Q.push(q)}}else{let X=Math.max(0,U.start),F=Math.min(D.count,U.start+U.count);for(let O=X,V=F-1;O<V;O+=Y){let q=R$(this,J,t6,H,O,O+1,O);if(q)Q.push(q)}if(this.isLineLoop){let O=R$(this,J,t6,H,F-1,X,F-1);if(O)Q.push(O)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let W=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[W]=K}}}}}function R$(J,Q,$,Z,K,U,W){let H=J.geometry.attributes.position;if(w$.fromBufferAttribute(H,K),T$.fromBufferAttribute(H,U),$.distanceSqToSegment(w$,T$,dZ,vW)>Z)return;dZ.applyMatrix4(J.matrixWorld);let G=Q.ray.origin.distanceTo(dZ);if(G<Q.near||G>Q.far)return;return{distance:G,point:vW.clone().applyMatrix4(J.matrixWorld),index:W,face:null,faceIndex:null,barycoord:null,object:J}}var yW=new T,fW=new T;class U8 extends iK{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let Z=0,K=Q.count;Z<K;Z+=2)yW.fromBufferAttribute(Q,Z),fW.fromBufferAttribute(Q,Z+1),$[Z]=Z===0?0:$[Z-1],$[Z+1]=$[Z]+yW.distanceTo(fW);J.setAttribute("lineDistance",new J9($,1))}else o0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class s7 extends K8{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new U0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var bW=new z9,oZ=new LQ,O$=new p8,M$=new T;class W8 extends x9{constructor(J=new F9,Q=new s7){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,K=J.params.Points.threshold,U=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(O$.copy($.boundingSphere),O$.applyMatrix4(Z),O$.radius+=K,J.ray.intersectsSphere(O$)===!1)return;bW.copy(Z).invert(),oZ.copy(J.ray).applyMatrix4(bW);let W=K/((this.scale.x+this.scale.y+this.scale.z)/3),H=W*W,Y=$.index,N=$.attributes.position;if(Y!==null){let D=Math.max(0,U.start),X=Math.min(Y.count,U.start+U.count);for(let F=D,O=X;F<O;F++){let V=Y.getX(F);M$.fromBufferAttribute(N,V),hW(M$,V,H,Z,J,Q,this)}}else{let D=Math.max(0,U.start),X=Math.min(N.count,U.start+U.count);for(let F=D,O=X;F<O;F++)M$.fromBufferAttribute(N,F),hW(M$,F,H,Z,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let W=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[W]=K}}}}}function hW(J,Q,$,Z,K,U,W){let H=oZ.distanceSqToPoint(J);if(H<$){let Y=new T;oZ.closestPointToPoint(J,Y),Y.applyMatrix4(Z);let G=K.ray.origin.distanceTo(Y);if(G<K.near||G>K.far)return;U.push({distance:G,distanceToRay:Math.sqrt(H),point:Y,index:Q,face:null,faceIndex:null,barycoord:null,object:W})}}class i$ extends V7{constructor(J=[],Q=301,$,Z,K,U,W,H,Y,G){super(J,Q,$,Z,K,U,W,H,Y,G);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class j7 extends V7{constructor(J,Q,$,Z,K,U,W,H,Y){super(J,Q,$,Z,K,U,W,H,Y);this.isCanvasTexture=!0,this.needsUpdate=!0}}class jJ extends V7{constructor(J,Q,$=1014,Z,K,U,W=1003,H=1003,Y,G=1026,N=1){if(G!==1026&&G!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let D={width:J,height:Q,depth:N};super(D,Z,K,U,W,H,G,$,Y);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new BQ(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);return Q.compareFunction=this.compareFunction,Q}}class oK extends jJ{constructor(J,Q=1014,$=301,Z,K,U=1003,W=1003,H,Y=1026){let G={width:J,height:J,depth:1},N=[G,G,G,G,G,G];super(J,J,Q,$,Z,K,U,W,H,Y);this.image=N,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class o$ extends V7{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class c0 extends F9{constructor(J=1,Q=1,$=1,Z=1,K=1,U=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:K,depthSegments:U};let W=this;Z=Math.floor(Z),K=Math.floor(K),U=Math.floor(U);let H=[],Y=[],G=[],N=[],D=0,X=0;F("z","y","x",-1,-1,$,Q,J,U,K,0),F("z","y","x",1,-1,$,Q,-J,U,K,1),F("x","z","y",1,1,J,$,Q,Z,U,2),F("x","z","y",1,-1,J,$,-Q,Z,U,3),F("x","y","z",1,-1,J,Q,$,Z,K,4),F("x","y","z",-1,-1,J,Q,-$,Z,K,5),this.setIndex(H),this.setAttribute("position",new J9(Y,3)),this.setAttribute("normal",new J9(G,3)),this.setAttribute("uv",new J9(N,2));function F(O,V,q,E,L,A,R,_,B,z,M){let I=A/B,f=R/z,S=A/2,h=R/2,a=_/2,k=B+1,m=z+1,e=0,l=0,i=new T;for(let p=0;p<m;p++){let o=p*f-h;for(let H0=0;H0<k;H0++){let S0=H0*I-S;i[O]=S0*E,i[V]=o*L,i[q]=a,Y.push(i.x,i.y,i.z),i[O]=0,i[V]=0,i[q]=_>0?1:-1,G.push(i.x,i.y,i.z),N.push(H0/B),N.push(1-p/z),e+=1}}for(let p=0;p<z;p++)for(let o=0;o<B;o++){let H0=D+o+k*p,S0=D+o+k*(p+1),x0=D+(o+1)+k*(p+1),t=D+(o+1)+k*p;H.push(H0,S0,t),H.push(S0,x0,t),l+=6}W.addGroup(X,l,M),X+=l,D+=e}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new c0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class vJ extends F9{constructor(J=1,Q=1,$=4,Z=8,K=1){super();this.type="CapsuleGeometry",this.parameters={radius:J,height:Q,capSegments:$,radialSegments:Z,heightSegments:K},Q=Math.max(0,Q),$=Math.max(1,Math.floor($)),Z=Math.max(3,Math.floor(Z)),K=Math.max(1,Math.floor(K));let U=[],W=[],H=[],Y=[],G=Q/2,N=Math.PI/2*J,D=Q,X=2*N+D,F=$*2+K,O=Z+1,V=new T,q=new T;for(let E=0;E<=F;E++){let L=0,A=0,R=0,_=0;if(E<=$){let M=E/$,I=M*Math.PI/2;A=-G-J*Math.cos(I),R=J*Math.sin(I),_=-J*Math.cos(I),L=M*N}else if(E<=$+K){let M=(E-$)/K;A=-G+M*Q,R=J,_=0,L=N+M*D}else{let M=(E-$-K)/$,I=M*Math.PI/2;A=G+J*Math.sin(I),R=J*Math.cos(I),_=J*Math.sin(I),L=N+D+M*N}let B=Math.max(0,Math.min(1,L/X)),z=0;if(E===0)z=0.5/Z;else if(E===F)z=-0.5/Z;for(let M=0;M<=Z;M++){let I=M/Z,f=I*Math.PI*2,S=Math.sin(f),h=Math.cos(f);q.x=-R*h,q.y=A,q.z=R*S,W.push(q.x,q.y,q.z),V.set(-R*h,_,R*S),V.normalize(),H.push(V.x,V.y,V.z),Y.push(I+z,B)}if(E>0){let M=(E-1)*O;for(let I=0;I<Z;I++){let f=M+I,S=M+I+1,h=E*O+I,a=E*O+I+1;U.push(f,S,h),U.push(S,a,h)}}}this.setIndex(U),this.setAttribute("position",new J9(W,3)),this.setAttribute("normal",new J9(H,3)),this.setAttribute("uv",new J9(Y,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new vJ(J.radius,J.height,J.capSegments,J.radialSegments,J.heightSegments)}}class l7 extends F9{constructor(J=1,Q=32,$=0,Z=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:Q,thetaStart:$,thetaLength:Z},Q=Math.max(3,Q);let K=[],U=[],W=[],H=[],Y=new T,G=new Z0;U.push(0,0,0),W.push(0,0,1),H.push(0.5,0.5);for(let N=0,D=3;N<=Q;N++,D+=3){let X=$+N/Q*Z;Y.x=J*Math.cos(X),Y.y=J*Math.sin(X),U.push(Y.x,Y.y,Y.z),W.push(0,0,1),G.x=(U[D]/J+1)/2,G.y=(U[D+1]/J+1)/2,H.push(G.x,G.y)}for(let N=1;N<=Q;N++)K.push(N,N+1,0);this.setIndex(K),this.setAttribute("position",new J9(U,3)),this.setAttribute("normal",new J9(W,3)),this.setAttribute("uv",new J9(H,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new l7(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class Q9 extends F9{constructor(J=1,Q=1,$=1,Z=32,K=1,U=!1,W=0,H=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:Z,heightSegments:K,openEnded:U,thetaStart:W,thetaLength:H};let Y=this;Z=Math.floor(Z),K=Math.floor(K);let G=[],N=[],D=[],X=[],F=0,O=[],V=$/2,q=0;if(E(),U===!1){if(J>0)L(!0);if(Q>0)L(!1)}this.setIndex(G),this.setAttribute("position",new J9(N,3)),this.setAttribute("normal",new J9(D,3)),this.setAttribute("uv",new J9(X,2));function E(){let A=new T,R=new T,_=0,B=(Q-J)/$;for(let z=0;z<=K;z++){let M=[],I=z/K,f=I*(Q-J)+J;for(let S=0;S<=Z;S++){let h=S/Z,a=h*H+W,k=Math.sin(a),m=Math.cos(a);R.x=f*k,R.y=-I*$+V,R.z=f*m,N.push(R.x,R.y,R.z),A.set(k,B,m).normalize(),D.push(A.x,A.y,A.z),X.push(h,1-I),M.push(F++)}O.push(M)}for(let z=0;z<Z;z++)for(let M=0;M<K;M++){let I=O[M][z],f=O[M+1][z],S=O[M+1][z+1],h=O[M][z+1];if(J>0||M!==0)G.push(I,f,h),_+=3;if(Q>0||M!==K-1)G.push(f,S,h),_+=3}Y.addGroup(q,_,0),q+=_}function L(A){let R=F,_=new Z0,B=new T,z=0,M=A===!0?J:Q,I=A===!0?1:-1;for(let S=1;S<=Z;S++)N.push(0,V*I,0),D.push(0,I,0),X.push(0.5,0.5),F++;let f=F;for(let S=0;S<=Z;S++){let a=S/Z*H+W,k=Math.cos(a),m=Math.sin(a);B.x=M*m,B.y=V*I,B.z=M*k,N.push(B.x,B.y,B.z),D.push(0,I,0),_.x=k*0.5+0.5,_.y=m*0.5*I+0.5,X.push(_.x,_.y),F++}for(let S=0;S<Z;S++){let h=R+S,a=f+S;if(A===!0)G.push(a,a+1,h);else G.push(a+1,a,h);z+=3}Y.addGroup(q,z,A===!0?1:2),q+=z}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new Q9(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class Z7 extends Q9{constructor(J=1,Q=1,$=32,Z=1,K=!1,U=0,W=Math.PI*2){super(0,J,Q,$,Z,K,U,W);this.type="ConeGeometry",this.parameters={radius:J,height:Q,radialSegments:$,heightSegments:Z,openEnded:K,thetaStart:U,thetaLength:W}}static fromJSON(J){return new Z7(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class a$ extends F9{constructor(J=[],Q=[],$=1,Z=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:Q,radius:$,detail:Z};let K=[],U=[];if(W(Z),Y($),G(),this.setAttribute("position",new J9(K,3)),this.setAttribute("normal",new J9(K.slice(),3)),this.setAttribute("uv",new J9(U,2)),Z===0)this.computeVertexNormals();else this.normalizeNormals();function W(E){let L=new T,A=new T,R=new T;for(let _=0;_<Q.length;_+=3)X(Q[_+0],L),X(Q[_+1],A),X(Q[_+2],R),H(L,A,R,E)}function H(E,L,A,R){let _=R+1,B=[];for(let z=0;z<=_;z++){B[z]=[];let M=E.clone().lerp(A,z/_),I=L.clone().lerp(A,z/_),f=_-z;for(let S=0;S<=f;S++)if(S===0&&z===_)B[z][S]=M;else B[z][S]=M.clone().lerp(I,S/f)}for(let z=0;z<_;z++)for(let M=0;M<2*(_-z)-1;M++){let I=Math.floor(M/2);if(M%2===0)D(B[z][I+1]),D(B[z+1][I]),D(B[z][I]);else D(B[z][I+1]),D(B[z+1][I+1]),D(B[z+1][I])}}function Y(E){let L=new T;for(let A=0;A<K.length;A+=3)L.x=K[A+0],L.y=K[A+1],L.z=K[A+2],L.normalize().multiplyScalar(E),K[A+0]=L.x,K[A+1]=L.y,K[A+2]=L.z}function G(){let E=new T;for(let L=0;L<K.length;L+=3){E.x=K[L+0],E.y=K[L+1],E.z=K[L+2];let A=V(E)/2/Math.PI+0.5,R=q(E)/Math.PI+0.5;U.push(A,1-R)}F(),N()}function N(){for(let E=0;E<U.length;E+=6){let L=U[E+0],A=U[E+2],R=U[E+4],_=Math.max(L,A,R),B=Math.min(L,A,R);if(_>0.9&&B<0.1){if(L<0.2)U[E+0]+=1;if(A<0.2)U[E+2]+=1;if(R<0.2)U[E+4]+=1}}}function D(E){K.push(E.x,E.y,E.z)}function X(E,L){let A=E*3;L.x=J[A+0],L.y=J[A+1],L.z=J[A+2]}function F(){let E=new T,L=new T,A=new T,R=new T,_=new Z0,B=new Z0,z=new Z0;for(let M=0,I=0;M<K.length;M+=9,I+=6){E.set(K[M+0],K[M+1],K[M+2]),L.set(K[M+3],K[M+4],K[M+5]),A.set(K[M+6],K[M+7],K[M+8]),_.set(U[I+0],U[I+1]),B.set(U[I+2],U[I+3]),z.set(U[I+4],U[I+5]),R.copy(E).add(L).add(A).divideScalar(3);let f=V(R);O(_,I+0,E,f),O(B,I+2,L,f),O(z,I+4,A,f)}}function O(E,L,A,R){if(R<0&&E.x===1)U[L]=E.x-1;if(A.x===0&&A.z===0)U[L]=R/2/Math.PI+0.5}function V(E){return Math.atan2(E.z,-E.x)}function q(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new a$(J.vertices,J.indices,J.radius,J.detail)}}var V$=new T,B$=new T,uZ=new T,_$=new T7;class T6 extends F9{constructor(J=null,Q=1){super();if(this.type="EdgesGeometry",this.parameters={geometry:J,thresholdAngle:Q},J!==null){let Z=Math.pow(10,4),K=Math.cos(A$*Q),U=J.getIndex(),W=J.getAttribute("position"),H=U?U.count:W.count,Y=[0,0,0],G=["a","b","c"],N=[,,,],D={},X=[];for(let F=0;F<H;F+=3){if(U)Y[0]=U.getX(F),Y[1]=U.getX(F+1),Y[2]=U.getX(F+2);else Y[0]=F,Y[1]=F+1,Y[2]=F+2;let{a:O,b:V,c:q}=_$;if(O.fromBufferAttribute(W,Y[0]),V.fromBufferAttribute(W,Y[1]),q.fromBufferAttribute(W,Y[2]),_$.getNormal(uZ),N[0]=`${Math.round(O.x*Z)},${Math.round(O.y*Z)},${Math.round(O.z*Z)}`,N[1]=`${Math.round(V.x*Z)},${Math.round(V.y*Z)},${Math.round(V.z*Z)}`,N[2]=`${Math.round(q.x*Z)},${Math.round(q.y*Z)},${Math.round(q.z*Z)}`,N[0]===N[1]||N[1]===N[2]||N[2]===N[0])continue;for(let E=0;E<3;E++){let L=(E+1)%3,A=N[E],R=N[L],_=_$[G[E]],B=_$[G[L]],z=`${A}_${R}`,M=`${R}_${A}`;if(M in D&&D[M]){if(uZ.dot(D[M].normal)<=K)X.push(_.x,_.y,_.z),X.push(B.x,B.y,B.z);D[M]=null}else if(!(z in D))D[z]={index0:Y[E],index1:Y[L],normal:uZ.clone()}}}for(let F in D)if(D[F]){let{index0:O,index1:V}=D[F];V$.fromBufferAttribute(W,O),B$.fromBufferAttribute(W,V),X.push(V$.x,V$.y,V$.z),X.push(B$.x,B$.y,B$.z)}this.setAttribute("position",new J9(X,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}class v7{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){o0("Curve: .getPoint() not implemented.")}getPointAt(J,Q){let $=this.getUtoTmapping(J);return this.getPoint($,Q)}getPoints(J=5){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPoint($/J));return Q}getSpacedPoints(J=5){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPointAt($/J));return Q}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let Q=[],$,Z=this.getPoint(0),K=0;Q.push(0);for(let U=1;U<=J;U++)$=this.getPoint(U/J),K+=$.distanceTo(Z),Q.push(K),Z=$;return this.cacheArcLengths=Q,Q}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,Q=null){let $=this.getLengths(),Z=0,K=$.length,U;if(Q)U=Q;else U=J*$[K-1];let W=0,H=K-1,Y;while(W<=H)if(Z=Math.floor(W+(H-W)/2),Y=$[Z]-U,Y<0)W=Z+1;else if(Y>0)H=Z-1;else{H=Z;break}if(Z=H,$[Z]===U)return Z/(K-1);let G=$[Z],D=$[Z+1]-G,X=(U-G)/D;return(Z+X)/(K-1)}getTangent(J,Q){let Z=J-0.0001,K=J+0.0001;if(Z<0)Z=0;if(K>1)K=1;let U=this.getPoint(Z),W=this.getPoint(K),H=Q||(U.isVector2?new Z0:new T);return H.copy(W).sub(U).normalize(),H}getTangentAt(J,Q){let $=this.getUtoTmapping(J);return this.getTangent($,Q)}computeFrenetFrames(J,Q=!1){let $=new T,Z=[],K=[],U=[],W=new T,H=new z9;for(let X=0;X<=J;X++){let F=X/J;Z[X]=this.getTangentAt(F,new T)}K[0]=new T,U[0]=new T;let Y=Number.MAX_VALUE,G=Math.abs(Z[0].x),N=Math.abs(Z[0].y),D=Math.abs(Z[0].z);if(G<=Y)Y=G,$.set(1,0,0);if(N<=Y)Y=N,$.set(0,1,0);if(D<=Y)$.set(0,0,1);W.crossVectors(Z[0],$).normalize(),K[0].crossVectors(Z[0],W),U[0].crossVectors(Z[0],K[0]);for(let X=1;X<=J;X++){if(K[X]=K[X-1].clone(),U[X]=U[X-1].clone(),W.crossVectors(Z[X-1],Z[X]),W.length()>Number.EPSILON){W.normalize();let F=Math.acos(M9(Z[X-1].dot(Z[X]),-1,1));K[X].applyMatrix4(H.makeRotationAxis(W,F))}U[X].crossVectors(Z[X],K[X])}if(Q===!0){let X=Math.acos(M9(K[0].dot(K[J]),-1,1));if(X/=J,Z[0].dot(W.crossVectors(K[0],K[J]))>0)X=-X;for(let F=1;F<=J;F++)K[F].applyMatrix4(H.makeRotationAxis(Z[F],X*F)),U[F].crossVectors(Z[F],K[F])}return{tangents:Z,normals:K,binormals:U}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class zQ extends v7{constructor(J=0,Q=0,$=1,Z=1,K=0,U=Math.PI*2,W=!1,H=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=Q,this.xRadius=$,this.yRadius=Z,this.aStartAngle=K,this.aEndAngle=U,this.aClockwise=W,this.aRotation=H}getPoint(J,Q=new Z0){let $=Q,Z=Math.PI*2,K=this.aEndAngle-this.aStartAngle,U=Math.abs(K)<Number.EPSILON;while(K<0)K+=Z;while(K>Z)K-=Z;if(K<Number.EPSILON)if(U)K=0;else K=Z;if(this.aClockwise===!0&&!U)if(K===Z)K=-Z;else K=K-Z;let W=this.aStartAngle+J*K,H=this.aX+this.xRadius*Math.cos(W),Y=this.aY+this.yRadius*Math.sin(W);if(this.aRotation!==0){let G=Math.cos(this.aRotation),N=Math.sin(this.aRotation),D=H-this.aX,X=Y-this.aY;H=D*G-X*N+this.aX,Y=D*N+X*G+this.aY}return $.set(H,Y)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class aK extends zQ{constructor(J,Q,$,Z,K,U){super(J,Q,$,$,Z,K,U);this.isArcCurve=!0,this.type="ArcCurve"}}function rK(){let J=0,Q=0,$=0,Z=0;function K(U,W,H,Y){J=U,Q=H,$=-3*U+3*W-2*H-Y,Z=2*U-2*W+H+Y}return{initCatmullRom:function(U,W,H,Y,G){K(W,H,G*(H-U),G*(Y-W))},initNonuniformCatmullRom:function(U,W,H,Y,G,N,D){let X=(W-U)/G-(H-U)/(G+N)+(H-W)/N,F=(H-W)/N-(Y-W)/(N+D)+(Y-H)/D;X*=N,F*=N,K(W,H,X,F)},calc:function(U){let W=U*U,H=W*U;return J+Q*U+$*W+Z*H}}}var xW=new T,gW=new T,lZ=new rK,cZ=new rK,nZ=new rK;class S6 extends v7{constructor(J=[],Q=!1,$="centripetal",Z=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=Q,this.curveType=$,this.tension=Z}getPoint(J,Q=new T){let $=Q,Z=this.points,K=Z.length,U=(K-(this.closed?0:1))*J,W=Math.floor(U),H=U-W;if(this.closed)W+=W>0?0:(Math.floor(Math.abs(W)/K)+1)*K;else if(H===0&&W===K-1)W=K-2,H=1;let Y,G;if(this.closed||W>0)Y=Z[(W-1)%K];else gW.subVectors(Z[0],Z[1]).add(Z[0]),Y=gW;let N=Z[W%K],D=Z[(W+1)%K];if(this.closed||W+2<K)G=Z[(W+2)%K];else xW.subVectors(Z[K-1],Z[K-2]).add(Z[K-1]),G=xW;if(this.curveType==="centripetal"||this.curveType==="chordal"){let X=this.curveType==="chordal"?0.5:0.25,F=Math.pow(Y.distanceToSquared(N),X),O=Math.pow(N.distanceToSquared(D),X),V=Math.pow(D.distanceToSquared(G),X);if(O<0.0001)O=1;if(F<0.0001)F=O;if(V<0.0001)V=O;lZ.initNonuniformCatmullRom(Y.x,N.x,D.x,G.x,F,O,V),cZ.initNonuniformCatmullRom(Y.y,N.y,D.y,G.y,F,O,V),nZ.initNonuniformCatmullRom(Y.z,N.z,D.z,G.z,F,O,V)}else if(this.curveType==="catmullrom")lZ.initCatmullRom(Y.x,N.x,D.x,G.x,this.tension),cZ.initCatmullRom(Y.y,N.y,D.y,G.y,this.tension),nZ.initCatmullRom(Y.z,N.z,D.z,G.z,this.tension);return $.set(lZ.calc(H),cZ.calc(H),nZ.calc(H)),$}copy(J){super.copy(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(Z.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,$=this.points.length;Q<$;Q++){let Z=this.points[Q];J.points.push(Z.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(new T().fromArray(Z))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function pW(J,Q,$,Z,K){let U=(Z-Q)*0.5,W=(K-$)*0.5,H=J*J,Y=J*H;return(2*$-2*Z+U+W)*Y+(-3*$+3*Z-2*U-W)*H+U*J+$}function JG(J,Q){let $=1-J;return $*$*Q}function QG(J,Q){return 2*(1-J)*J*Q}function $G(J,Q){return J*J*Q}function JQ(J,Q,$,Z){return JG(J,Q)+QG(J,$)+$G(J,Z)}function ZG(J,Q){let $=1-J;return $*$*$*Q}function KG(J,Q){let $=1-J;return 3*$*$*J*Q}function UG(J,Q){return 3*(1-J)*J*J*Q}function WG(J,Q){return J*J*J*Q}function QQ(J,Q,$,Z,K){return ZG(J,Q)+KG(J,$)+UG(J,Z)+WG(J,K)}class r$ extends v7{constructor(J=new Z0,Q=new Z0,$=new Z0,Z=new Z0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=Q,this.v2=$,this.v3=Z}getPoint(J,Q=new Z0){let $=Q,Z=this.v0,K=this.v1,U=this.v2,W=this.v3;return $.set(QQ(J,Z.x,K.x,U.x,W.x),QQ(J,Z.y,K.y,U.y,W.y)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class tK extends v7{constructor(J=new T,Q=new T,$=new T,Z=new T){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=Q,this.v2=$,this.v3=Z}getPoint(J,Q=new T){let $=Q,Z=this.v0,K=this.v1,U=this.v2,W=this.v3;return $.set(QQ(J,Z.x,K.x,U.x,W.x),QQ(J,Z.y,K.y,U.y,W.y),QQ(J,Z.z,K.z,U.z,W.z)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class t$ extends v7{constructor(J=new Z0,Q=new Z0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=Q}getPoint(J,Q=new Z0){let $=Q;if(J===1)$.copy(this.v2);else $.copy(this.v2).sub(this.v1),$.multiplyScalar(J).add(this.v1);return $}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new Z0){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class k6 extends v7{constructor(J=new T,Q=new T){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=Q}getPoint(J,Q=new T){let $=Q;if(J===1)$.copy(this.v2);else $.copy(this.v2).sub(this.v1),$.multiplyScalar(J).add(this.v1);return $}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new T){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class e$ extends v7{constructor(J=new Z0,Q=new Z0,$=new Z0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=Q,this.v2=$}getPoint(J,Q=new Z0){let $=Q,Z=this.v0,K=this.v1,U=this.v2;return $.set(JQ(J,Z.x,K.x,U.x),JQ(J,Z.y,K.y,U.y)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class JZ extends v7{constructor(J=new T,Q=new T,$=new T){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=Q,this.v2=$}getPoint(J,Q=new T){let $=Q,Z=this.v0,K=this.v1,U=this.v2;return $.set(JQ(J,Z.x,K.x,U.x),JQ(J,Z.y,K.y,U.y),JQ(J,Z.z,K.z,U.z)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class QZ extends v7{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,Q=new Z0){let $=Q,Z=this.points,K=(Z.length-1)*J,U=Math.floor(K),W=K-U,H=Z[U===0?U:U-1],Y=Z[U],G=Z[U>Z.length-2?Z.length-1:U+1],N=Z[U>Z.length-3?Z.length-1:U+2];return $.set(pW(W,H.x,Y.x,G.x,N.x),pW(W,H.y,Y.y,G.y,N.y)),$}copy(J){super.copy(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,$=this.points.length;Q<$;Q++){let Z=this.points[Q];J.points.push(Z.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(new Z0().fromArray(Z))}return this}}var S$=Object.freeze({__proto__:null,ArcCurve:aK,CatmullRomCurve3:S6,CubicBezierCurve:r$,CubicBezierCurve3:tK,EllipseCurve:zQ,LineCurve:t$,LineCurve3:k6,QuadraticBezierCurve:e$,QuadraticBezierCurve3:JZ,SplineCurve:QZ});class eK extends v7{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),Q=this.curves[this.curves.length-1].getPoint(1);if(!J.equals(Q)){let $=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new S$[$](Q,J))}return this}getPoint(J,Q){let $=J*this.getLength(),Z=this.getCurveLengths(),K=0;while(K<Z.length){if(Z[K]>=$){let U=Z[K]-$,W=this.curves[K],H=W.getLength(),Y=H===0?0:1-U/H;return W.getPointAt(Y,Q)}K++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],Q=0;for(let $=0,Z=this.curves.length;$<Z;$++)Q+=this.curves[$].getLength(),J.push(Q);return this.cacheLengths=J,J}getSpacedPoints(J=40){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPoint($/J));if(this.autoClose)Q.push(Q[0]);return Q}getPoints(J=12){let Q=[],$;for(let Z=0,K=this.curves;Z<K.length;Z++){let U=K[Z],W=U.isEllipseCurve?J*2:U.isLineCurve||U.isLineCurve3?1:U.isSplineCurve?J*U.points.length:J,H=U.getPoints(W);for(let Y=0;Y<H.length;Y++){let G=H[Y];if($&&$.equals(G))continue;Q.push(G),$=G}}if(this.autoClose&&Q.length>1&&!Q[Q.length-1].equals(Q[0]))Q.push(Q[0]);return Q}copy(J){super.copy(J),this.curves=[];for(let Q=0,$=J.curves.length;Q<$;Q++){let Z=J.curves[Q];this.curves.push(Z.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let Q=0,$=this.curves.length;Q<$;Q++){let Z=this.curves[Q];J.curves.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let Q=0,$=J.curves.length;Q<$;Q++){let Z=J.curves[Q];this.curves.push(new S$[Z.type]().fromJSON(Z))}return this}}class k$ extends eK{constructor(J){super();if(this.type="Path",this.currentPoint=new Z0,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let Q=1,$=J.length;Q<$;Q++)this.lineTo(J[Q].x,J[Q].y);return this}moveTo(J,Q){return this.currentPoint.set(J,Q),this}lineTo(J,Q){let $=new t$(this.currentPoint.clone(),new Z0(J,Q));return this.curves.push($),this.currentPoint.set(J,Q),this}quadraticCurveTo(J,Q,$,Z){let K=new e$(this.currentPoint.clone(),new Z0(J,Q),new Z0($,Z));return this.curves.push(K),this.currentPoint.set($,Z),this}bezierCurveTo(J,Q,$,Z,K,U){let W=new r$(this.currentPoint.clone(),new Z0(J,Q),new Z0($,Z),new Z0(K,U));return this.curves.push(W),this.currentPoint.set(K,U),this}splineThru(J){let Q=[this.currentPoint.clone()].concat(J),$=new QZ(Q);return this.curves.push($),this.currentPoint.copy(J[J.length-1]),this}arc(J,Q,$,Z,K,U){let W=this.currentPoint.x,H=this.currentPoint.y;return this.absarc(J+W,Q+H,$,Z,K,U),this}absarc(J,Q,$,Z,K,U){return this.absellipse(J,Q,$,$,Z,K,U),this}ellipse(J,Q,$,Z,K,U,W,H){let Y=this.currentPoint.x,G=this.currentPoint.y;return this.absellipse(J+Y,Q+G,$,Z,K,U,W,H),this}absellipse(J,Q,$,Z,K,U,W,H){let Y=new zQ(J,Q,$,Z,K,U,W,H);if(this.curves.length>0){let N=Y.getPoint(0);if(!N.equals(this.currentPoint))this.lineTo(N.x,N.y)}this.curves.push(Y);let G=Y.getPoint(1);return this.currentPoint.copy(G),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class XJ extends k${constructor(J){super(J);this.uuid=v8(),this.type="Shape",this.holes=[]}getPointsHoles(J){let Q=[];for(let $=0,Z=this.holes.length;$<Z;$++)Q[$]=this.holes[$].getPoints(J);return Q}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let Q=0,$=J.holes.length;Q<$;Q++){let Z=J.holes[Q];this.holes.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let Q=0,$=this.holes.length;Q<$;Q++){let Z=this.holes[Q];J.holes.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let Q=0,$=J.holes.length;Q<$;Q++){let Z=J.holes[Q];this.holes.push(new k$().fromJSON(Z))}return this}}function HG(J,Q,$=2){let Z=Q&&Q.length,K=Z?Q[0]*$:J.length,U=tH(J,0,K,$,!0),W=[];if(!U||U.next===U.prev)return W;let H,Y,G;if(Z)U=qG(J,Q,U,$);if(J.length>80*$){H=J[0],Y=J[1];let N=H,D=Y;for(let X=$;X<K;X+=$){let F=J[X],O=J[X+1];if(F<H)H=F;if(O<Y)Y=O;if(F>N)N=F;if(O>D)D=O}G=Math.max(N-H,D-Y),G=G!==0?32767/G:0}return WQ(U,W,$,H,Y,G,0),W}function tH(J,Q,$,Z,K){let U;if(K===LG(J,Q,$,Z)>0)for(let W=Q;W<$;W+=Z)U=mW(W/Z|0,J[W],J[W+1],U);else for(let W=$-Z;W>=Q;W-=Z)U=mW(W/Z|0,J[W],J[W+1],U);if(U&&B6(U,U.next))YQ(U),U=U.next;return U}function LJ(J,Q){if(!J)return J;if(!Q)Q=J;let $=J,Z;do if(Z=!1,!$.steiner&&(B6($,$.next)||J7($.prev,$,$.next)===0)){if(YQ($),$=Q=$.prev,$===$.next)break;Z=!0}else $=$.next;while(Z||$!==Q);return Q}function WQ(J,Q,$,Z,K,U,W){if(!J)return;if(!W&&U)OG(J,Z,K,U);let H=J;while(J.prev!==J.next){let{prev:Y,next:G}=J;if(U?GG(J,Z,K,U):YG(J)){Q.push(Y.i,J.i,G.i),YQ(J),J=G.next,H=G.next;continue}if(J=G,J===H){if(!W)WQ(LJ(J),Q,$,Z,K,U,1);else if(W===1)J=XG(LJ(J),Q),WQ(J,Q,$,Z,K,U,2);else if(W===2)NG(J,Q,$,Z,K,U);break}}}function YG(J){let Q=J.prev,$=J,Z=J.next;if(J7(Q,$,Z)>=0)return!1;let K=Q.x,U=$.x,W=Z.x,H=Q.y,Y=$.y,G=Z.y,N=Math.min(K,U,W),D=Math.min(H,Y,G),X=Math.max(K,U,W),F=Math.max(H,Y,G),O=Z.next;while(O!==Q){if(O.x>=N&&O.x<=X&&O.y>=D&&O.y<=F&&e6(K,H,U,Y,W,G,O.x,O.y)&&J7(O.prev,O,O.next)>=0)return!1;O=O.next}return!0}function GG(J,Q,$,Z){let K=J.prev,U=J,W=J.next;if(J7(K,U,W)>=0)return!1;let H=K.x,Y=U.x,G=W.x,N=K.y,D=U.y,X=W.y,F=Math.min(H,Y,G),O=Math.min(N,D,X),V=Math.max(H,Y,G),q=Math.max(N,D,X),E=aZ(F,O,Q,$,Z),L=aZ(V,q,Q,$,Z),A=J.prevZ,R=J.nextZ;while(A&&A.z>=E&&R&&R.z<=L){if(A.x>=F&&A.x<=V&&A.y>=O&&A.y<=q&&A!==K&&A!==W&&e6(H,N,Y,D,G,X,A.x,A.y)&&J7(A.prev,A,A.next)>=0)return!1;if(A=A.prevZ,R.x>=F&&R.x<=V&&R.y>=O&&R.y<=q&&R!==K&&R!==W&&e6(H,N,Y,D,G,X,R.x,R.y)&&J7(R.prev,R,R.next)>=0)return!1;R=R.nextZ}while(A&&A.z>=E){if(A.x>=F&&A.x<=V&&A.y>=O&&A.y<=q&&A!==K&&A!==W&&e6(H,N,Y,D,G,X,A.x,A.y)&&J7(A.prev,A,A.next)>=0)return!1;A=A.prevZ}while(R&&R.z<=L){if(R.x>=F&&R.x<=V&&R.y>=O&&R.y<=q&&R!==K&&R!==W&&e6(H,N,Y,D,G,X,R.x,R.y)&&J7(R.prev,R,R.next)>=0)return!1;R=R.nextZ}return!0}function XG(J,Q){let $=J;do{let Z=$.prev,K=$.next.next;if(!B6(Z,K)&&JY(Z,$,$.next,K)&&HQ(Z,K)&&HQ(K,Z))Q.push(Z.i,$.i,K.i),YQ($),YQ($.next),$=J=K;$=$.next}while($!==J);return LJ($)}function NG(J,Q,$,Z,K,U){let W=J;do{let H=W.next.next;while(H!==W.prev){if(W.i!==H.i&&BG(W,H)){let Y=QY(W,H);W=LJ(W,W.next),Y=LJ(Y,Y.next),WQ(W,Q,$,Z,K,U,0),WQ(Y,Q,$,Z,K,U,0);return}H=H.next}W=W.next}while(W!==J)}function qG(J,Q,$,Z){let K=[];for(let U=0,W=Q.length;U<W;U++){let H=Q[U]*Z,Y=U<W-1?Q[U+1]*Z:J.length,G=tH(J,H,Y,Z,!1);if(G===G.next)G.steiner=!0;K.push(VG(G))}K.sort(FG);for(let U=0;U<K.length;U++)$=DG(K[U],$);return $}function FG(J,Q){let $=J.x-Q.x;if($===0){if($=J.y-Q.y,$===0){let Z=(J.next.y-J.y)/(J.next.x-J.x),K=(Q.next.y-Q.y)/(Q.next.x-Q.x);$=Z-K}}return $}function DG(J,Q){let $=EG(J,Q);if(!$)return Q;let Z=QY($,J);return LJ(Z,Z.next),LJ($,$.next)}function EG(J,Q){let $=Q,Z=J.x,K=J.y,U=-1/0,W;if(B6(J,$))return $;do{if(B6(J,$.next))return $.next;else if(K<=$.y&&K>=$.next.y&&$.next.y!==$.y){let D=$.x+(K-$.y)*($.next.x-$.x)/($.next.y-$.y);if(D<=Z&&D>U){if(U=D,W=$.x<$.next.x?$:$.next,D===Z)return W}}$=$.next}while($!==Q);if(!W)return null;let H=W,Y=W.x,G=W.y,N=1/0;$=W;do{if(Z>=$.x&&$.x>=Y&&Z!==$.x&&eH(K<G?Z:U,K,Y,G,K<G?U:Z,K,$.x,$.y)){let D=Math.abs(K-$.y)/(Z-$.x);if(HQ($,J)&&(D<N||D===N&&($.x>W.x||$.x===W.x&&RG(W,$))))W=$,N=D}$=$.next}while($!==H);return W}function RG(J,Q){return J7(J.prev,J,Q.prev)<0&&J7(Q.next,J,J.next)<0}function OG(J,Q,$,Z){let K=J;do{if(K.z===0)K.z=aZ(K.x,K.y,Q,$,Z);K.prevZ=K.prev,K.nextZ=K.next,K=K.next}while(K!==J);K.prevZ.nextZ=null,K.prevZ=null,MG(K)}function MG(J){let Q,$=1;do{let Z=J,K;J=null;let U=null;Q=0;while(Z){Q++;let W=Z,H=0;for(let G=0;G<$;G++)if(H++,W=W.nextZ,!W)break;let Y=$;while(H>0||Y>0&&W){if(H!==0&&(Y===0||!W||Z.z<=W.z))K=Z,Z=Z.nextZ,H--;else K=W,W=W.nextZ,Y--;if(U)U.nextZ=K;else J=K;K.prevZ=U,U=K}Z=W}U.nextZ=null,$*=2}while(Q>1);return J}function aZ(J,Q,$,Z,K){return J=(J-$)*K|0,Q=(Q-Z)*K|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,Q=(Q|Q<<8)&16711935,Q=(Q|Q<<4)&252645135,Q=(Q|Q<<2)&858993459,Q=(Q|Q<<1)&1431655765,J|Q<<1}function VG(J){let Q=J,$=J;do{if(Q.x<$.x||Q.x===$.x&&Q.y<$.y)$=Q;Q=Q.next}while(Q!==J);return $}function eH(J,Q,$,Z,K,U,W,H){return(K-W)*(Q-H)>=(J-W)*(U-H)&&(J-W)*(Z-H)>=($-W)*(Q-H)&&($-W)*(U-H)>=(K-W)*(Z-H)}function e6(J,Q,$,Z,K,U,W,H){return!(J===W&&Q===H)&&eH(J,Q,$,Z,K,U,W,H)}function BG(J,Q){return J.next.i!==Q.i&&J.prev.i!==Q.i&&!_G(J,Q)&&(HQ(J,Q)&&HQ(Q,J)&&IG(J,Q)&&(J7(J.prev,J,Q.prev)||J7(J,Q.prev,Q))||B6(J,Q)&&J7(J.prev,J,J.next)>0&&J7(Q.prev,Q,Q.next)>0)}function J7(J,Q,$){return(Q.y-J.y)*($.x-Q.x)-(Q.x-J.x)*($.y-Q.y)}function B6(J,Q){return J.x===Q.x&&J.y===Q.y}function JY(J,Q,$,Z){let K=L$(J7(J,Q,$)),U=L$(J7(J,Q,Z)),W=L$(J7($,Z,J)),H=L$(J7($,Z,Q));if(K!==U&&W!==H)return!0;if(K===0&&I$(J,$,Q))return!0;if(U===0&&I$(J,Z,Q))return!0;if(W===0&&I$($,J,Z))return!0;if(H===0&&I$($,Q,Z))return!0;return!1}function I$(J,Q,$){return Q.x<=Math.max(J.x,$.x)&&Q.x>=Math.min(J.x,$.x)&&Q.y<=Math.max(J.y,$.y)&&Q.y>=Math.min(J.y,$.y)}function L$(J){return J>0?1:J<0?-1:0}function _G(J,Q){let $=J;do{if($.i!==J.i&&$.next.i!==J.i&&$.i!==Q.i&&$.next.i!==Q.i&&JY($,$.next,J,Q))return!0;$=$.next}while($!==J);return!1}function HQ(J,Q){return J7(J.prev,J,J.next)<0?J7(J,Q,J.next)>=0&&J7(J,J.prev,Q)>=0:J7(J,Q,J.prev)<0||J7(J,J.next,Q)<0}function IG(J,Q){let $=J,Z=!1,K=(J.x+Q.x)/2,U=(J.y+Q.y)/2;do{if($.y>U!==$.next.y>U&&$.next.y!==$.y&&K<($.next.x-$.x)*(U-$.y)/($.next.y-$.y)+$.x)Z=!Z;$=$.next}while($!==J);return Z}function QY(J,Q){let $=rZ(J.i,J.x,J.y),Z=rZ(Q.i,Q.x,Q.y),K=J.next,U=Q.prev;return J.next=Q,Q.prev=J,$.next=K,K.prev=$,Z.next=$,$.prev=Z,U.next=Z,Z.prev=U,Z}function mW(J,Q,$,Z){let K=rZ(J,Q,$);if(!Z)K.prev=K,K.next=K;else K.next=Z.next,K.prev=Z,Z.next.prev=K,Z.next=K;return K}function YQ(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function rZ(J,Q,$){return{i:J,x:Q,y:$,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function LG(J,Q,$,Z){let K=0;for(let U=Q,W=$-Z;U<$;U+=Z)K+=(J[W]-J[U])*(J[U+1]+J[W+1]),W=U;return K}class $Y{static triangulate(J,Q,$=2){return HG(J,Q,$)}}class _J{static area(J){let Q=J.length,$=0;for(let Z=Q-1,K=0;K<Q;Z=K++)$+=J[Z].x*J[K].y-J[K].x*J[Z].y;return $*0.5}static isClockWise(J){return _J.area(J)<0}static triangulateShape(J,Q){let $=[],Z=[],K=[];dW(J),uW($,J);let U=J.length;Q.forEach(dW);for(let H=0;H<Q.length;H++)Z.push(U),U+=Q[H].length,uW($,Q[H]);let W=$Y.triangulate($,Z);for(let H=0;H<W.length;H+=3)K.push(W.slice(H,H+3));return K}}function dW(J){let Q=J.length;if(Q>2&&J[Q-1].equals(J[0]))J.pop()}function uW(J,Q){for(let $=0;$<Q.length;$++)J.push(Q[$].x),J.push(Q[$].y)}class NJ extends F9{constructor(J=new XJ([new Z0(0.5,0.5),new Z0(-0.5,0.5),new Z0(-0.5,-0.5),new Z0(0.5,-0.5)]),Q={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:Q},J=Array.isArray(J)?J:[J];let $=this,Z=[],K=[];for(let W=0,H=J.length;W<H;W++){let Y=J[W];U(Y)}this.setAttribute("position",new J9(Z,3)),this.setAttribute("uv",new J9(K,2)),this.computeVertexNormals();function U(W){let H=[],Y=Q.curveSegments!==void 0?Q.curveSegments:12,G=Q.steps!==void 0?Q.steps:1,N=Q.depth!==void 0?Q.depth:1,D=Q.bevelEnabled!==void 0?Q.bevelEnabled:!0,X=Q.bevelThickness!==void 0?Q.bevelThickness:0.2,F=Q.bevelSize!==void 0?Q.bevelSize:X-0.1,O=Q.bevelOffset!==void 0?Q.bevelOffset:0,V=Q.bevelSegments!==void 0?Q.bevelSegments:3,q=Q.extrudePath,E=Q.UVGenerator!==void 0?Q.UVGenerator:CG,L,A=!1,R,_,B,z;if(q){L=q.getSpacedPoints(G),A=!0,D=!1;let K0=q.isCatmullRomCurve3?q.closed:!1;R=q.computeFrenetFrames(G,K0),_=new T,B=new T,z=new T}if(!D)V=0,X=0,F=0,O=0;let M=W.extractPoints(Y),I=M.shape,f=M.holes;if(!_J.isClockWise(I)){I=I.reverse();for(let K0=0,q0=f.length;K0<q0;K0++){let D0=f[K0];if(_J.isClockWise(D0))f[K0]=D0.reverse()}}function h(K0){let E0=K0[0];for(let P0=1;P0<=K0.length;P0++){let d0=P0%K0.length,n0=K0[d0],Z9=n0.x-E0.x,K9=n0.y-E0.y,y=Z9*Z9+K9*K9,m9=Math.max(Math.abs(n0.x),Math.abs(n0.y),Math.abs(E0.x),Math.abs(E0.y)),N9=0.000000000000000000010000000000000001*m9*m9;if(y<=N9){K0.splice(d0,1),P0--;continue}E0=n0}}h(I),f.forEach(h);let a=f.length,k=I;for(let K0=0;K0<a;K0++){let q0=f[K0];I=I.concat(q0)}function m(K0,q0,D0){if(!q0)e0("ExtrudeGeometry: vec does not exist");return K0.clone().addScaledVector(q0,D0)}let e=I.length;function l(K0,q0,D0){let E0,P0,d0,n0=K0.x-q0.x,Z9=K0.y-q0.y,K9=D0.x-K0.x,y=D0.y-K0.y,m9=n0*n0+Z9*Z9,N9=n0*y-Z9*K9;if(Math.abs(N9)>Number.EPSILON){let R9=Math.sqrt(m9),w=Math.sqrt(K9*K9+y*y),C=q0.x-Z9/R9,b=q0.y+n0/R9,c=D0.x-y/w,Y0=D0.y+K9/w,R0=((c-C)*y-(Y0-b)*K9)/(n0*y-Z9*K9);E0=C+n0*R0-K0.x,P0=b+Z9*R0-K0.y;let V0=E0*E0+P0*P0;if(V0<=2)return new Z0(E0,P0);else d0=Math.sqrt(V0/2)}else{let R9=!1;if(n0>Number.EPSILON){if(K9>Number.EPSILON)R9=!0}else if(n0<-Number.EPSILON){if(K9<-Number.EPSILON)R9=!0}else if(Math.sign(Z9)===Math.sign(y))R9=!0;if(R9)E0=-Z9,P0=n0,d0=Math.sqrt(m9);else E0=n0,P0=Z9,d0=Math.sqrt(m9/2)}return new Z0(E0/d0,P0/d0)}let i=[];for(let K0=0,q0=k.length,D0=q0-1,E0=K0+1;K0<q0;K0++,D0++,E0++){if(D0===q0)D0=0;if(E0===q0)E0=0;i[K0]=l(k[K0],k[D0],k[E0])}let p=[],o,H0=i.concat();for(let K0=0,q0=a;K0<q0;K0++){let D0=f[K0];o=[];for(let E0=0,P0=D0.length,d0=P0-1,n0=E0+1;E0<P0;E0++,d0++,n0++){if(d0===P0)d0=0;if(n0===P0)n0=0;o[E0]=l(D0[E0],D0[d0],D0[n0])}p.push(o),H0=H0.concat(o)}let S0;if(V===0)S0=_J.triangulateShape(k,f);else{let K0=[],q0=[];for(let D0=0;D0<V;D0++){let E0=D0/V,P0=X*Math.cos(E0*Math.PI/2),d0=F*Math.sin(E0*Math.PI/2)+O;for(let n0=0,Z9=k.length;n0<Z9;n0++){let K9=m(k[n0],i[n0],d0);if(F0(K9.x,K9.y,-P0),E0===0)K0.push(K9)}for(let n0=0,Z9=a;n0<Z9;n0++){let K9=f[n0];o=p[n0];let y=[];for(let m9=0,N9=K9.length;m9<N9;m9++){let R9=m(K9[m9],o[m9],d0);if(F0(R9.x,R9.y,-P0),E0===0)y.push(R9)}if(E0===0)q0.push(y)}}S0=_J.triangulateShape(K0,q0)}let x0=S0.length,t=F+O;for(let K0=0;K0<e;K0++){let q0=D?m(I[K0],H0[K0],t):I[K0];if(!A)F0(q0.x,q0.y,0);else B.copy(R.normals[0]).multiplyScalar(q0.x),_.copy(R.binormals[0]).multiplyScalar(q0.y),z.copy(L[0]).add(B).add(_),F0(z.x,z.y,z.z)}for(let K0=1;K0<=G;K0++)for(let q0=0;q0<e;q0++){let D0=D?m(I[q0],H0[q0],t):I[q0];if(!A)F0(D0.x,D0.y,N/G*K0);else B.copy(R.normals[K0]).multiplyScalar(D0.x),_.copy(R.binormals[K0]).multiplyScalar(D0.y),z.copy(L[K0]).add(B).add(_),F0(z.x,z.y,z.z)}for(let K0=V-1;K0>=0;K0--){let q0=K0/V,D0=X*Math.cos(q0*Math.PI/2),E0=F*Math.sin(q0*Math.PI/2)+O;for(let P0=0,d0=k.length;P0<d0;P0++){let n0=m(k[P0],i[P0],E0);F0(n0.x,n0.y,N+D0)}for(let P0=0,d0=f.length;P0<d0;P0++){let n0=f[P0];o=p[P0];for(let Z9=0,K9=n0.length;Z9<K9;Z9++){let y=m(n0[Z9],o[Z9],E0);if(!A)F0(y.x,y.y,N+D0);else F0(y.x,y.y+L[G-1].y,L[G-1].x+D0)}}}h0(),n();function h0(){let K0=Z.length/3;if(D){let q0=0,D0=e*q0;for(let E0=0;E0<x0;E0++){let P0=S0[E0];g0(P0[2]+D0,P0[1]+D0,P0[0]+D0)}q0=G+V*2,D0=e*q0;for(let E0=0;E0<x0;E0++){let P0=S0[E0];g0(P0[0]+D0,P0[1]+D0,P0[2]+D0)}}else{for(let q0=0;q0<x0;q0++){let D0=S0[q0];g0(D0[2],D0[1],D0[0])}for(let q0=0;q0<x0;q0++){let D0=S0[q0];g0(D0[0]+e*G,D0[1]+e*G,D0[2]+e*G)}}$.addGroup(K0,Z.length/3-K0,0)}function n(){let K0=Z.length/3,q0=0;W0(k,q0),q0+=k.length;for(let D0=0,E0=f.length;D0<E0;D0++){let P0=f[D0];W0(P0,q0),q0+=P0.length}$.addGroup(K0,Z.length/3-K0,1)}function W0(K0,q0){let D0=K0.length;while(--D0>=0){let E0=D0,P0=D0-1;if(P0<0)P0=K0.length-1;for(let d0=0,n0=G+V*2;d0<n0;d0++){let Z9=e*d0,K9=e*(d0+1),y=q0+E0+Z9,m9=q0+P0+Z9,N9=q0+P0+K9,R9=q0+E0+K9;r0(y,m9,N9,R9)}}}function F0(K0,q0,D0){H.push(K0),H.push(q0),H.push(D0)}function g0(K0,q0,D0){y0(K0),y0(q0),y0(D0);let E0=Z.length/3,P0=E.generateTopUV($,Z,E0-3,E0-2,E0-1);b9(P0[0]),b9(P0[1]),b9(P0[2])}function r0(K0,q0,D0,E0){y0(K0),y0(q0),y0(E0),y0(q0),y0(D0),y0(E0);let P0=Z.length/3,d0=E.generateSideWallUV($,Z,P0-6,P0-3,P0-2,P0-1);b9(d0[0]),b9(d0[1]),b9(d0[3]),b9(d0[1]),b9(d0[2]),b9(d0[3])}function y0(K0){Z.push(H[K0*3+0]),Z.push(H[K0*3+1]),Z.push(H[K0*3+2])}function b9(K0){K.push(K0.x),K.push(K0.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),Q=this.parameters.shapes,$=this.parameters.options;return zG(Q,$,J)}static fromJSON(J,Q){let $=[];for(let K=0,U=J.shapes.length;K<U;K++){let W=Q[J.shapes[K]];$.push(W)}let Z=J.options.extrudePath;if(Z!==void 0)J.options.extrudePath=new S$[Z.type]().fromJSON(Z);return new NJ($,J.options)}}var CG={generateTopUV:function(J,Q,$,Z,K){let U=Q[$*3],W=Q[$*3+1],H=Q[Z*3],Y=Q[Z*3+1],G=Q[K*3],N=Q[K*3+1];return[new Z0(U,W),new Z0(H,Y),new Z0(G,N)]},generateSideWallUV:function(J,Q,$,Z,K,U){let W=Q[$*3],H=Q[$*3+1],Y=Q[$*3+2],G=Q[Z*3],N=Q[Z*3+1],D=Q[Z*3+2],X=Q[K*3],F=Q[K*3+1],O=Q[K*3+2],V=Q[U*3],q=Q[U*3+1],E=Q[U*3+2];if(Math.abs(H-N)<Math.abs(W-G))return[new Z0(W,1-Y),new Z0(G,1-D),new Z0(X,1-O),new Z0(V,1-E)];else return[new Z0(H,1-Y),new Z0(N,1-D),new Z0(F,1-O),new Z0(q,1-E)]}};function zG(J,Q,$){if($.shapes=[],Array.isArray(J))for(let Z=0,K=J.length;Z<K;Z++){let U=J[Z];$.shapes.push(U.uuid)}else $.shapes.push(J.uuid);if($.options=Object.assign({},Q),Q.extrudePath!==void 0)$.options.extrudePath=Q.extrudePath.toJSON();return $}class AQ extends a${constructor(J=1,Q=0){let $=(1+Math.sqrt(5))/2,Z=[-1,$,0,1,$,0,-1,-$,0,1,-$,0,0,-1,$,0,1,$,0,-1,-$,0,1,-$,$,0,-1,$,0,1,-$,0,-1,-$,0,1],K=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(Z,K,J,Q);this.type="IcosahedronGeometry",this.parameters={radius:J,detail:Q}}static fromJSON(J){return new AQ(J.radius,J.detail)}}class A9 extends F9{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let K=J/2,U=Q/2,W=Math.floor($),H=Math.floor(Z),Y=W+1,G=H+1,N=J/W,D=Q/H,X=[],F=[],O=[],V=[];for(let q=0;q<G;q++){let E=q*D-U;for(let L=0;L<Y;L++){let A=L*N-K;F.push(A,-E,0),O.push(0,0,1),V.push(L/W),V.push(1-q/H)}}for(let q=0;q<H;q++)for(let E=0;E<W;E++){let L=E+Y*q,A=E+Y*(q+1),R=E+1+Y*(q+1),_=E+1+Y*q;X.push(L,A,_),X.push(A,R,_)}this.setIndex(X),this.setAttribute("position",new J9(F,3)),this.setAttribute("normal",new J9(O,3)),this.setAttribute("uv",new J9(V,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new A9(J.width,J.height,J.widthSegments,J.heightSegments)}}class yJ extends F9{constructor(J=0.5,Q=1,$=32,Z=1,K=0,U=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:Q,thetaSegments:$,phiSegments:Z,thetaStart:K,thetaLength:U},$=Math.max(3,$),Z=Math.max(1,Z);let W=[],H=[],Y=[],G=[],N=J,D=(Q-J)/Z,X=new T,F=new Z0;for(let O=0;O<=Z;O++){for(let V=0;V<=$;V++){let q=K+V/$*U;X.x=N*Math.cos(q),X.y=N*Math.sin(q),H.push(X.x,X.y,X.z),Y.push(0,0,1),F.x=(X.x/Q+1)/2,F.y=(X.y/Q+1)/2,G.push(F.x,F.y)}N+=D}for(let O=0;O<Z;O++){let V=O*($+1);for(let q=0;q<$;q++){let E=q+V,L=E,A=E+$+1,R=E+$+2,_=E+1;W.push(L,A,_),W.push(A,R,_)}}this.setIndex(W),this.setAttribute("position",new J9(H,3)),this.setAttribute("normal",new J9(Y,3)),this.setAttribute("uv",new J9(G,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new yJ(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class a0 extends F9{constructor(J=1,Q=32,$=16,Z=0,K=Math.PI*2,U=0,W=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:Q,heightSegments:$,phiStart:Z,phiLength:K,thetaStart:U,thetaLength:W},Q=Math.max(3,Math.floor(Q)),$=Math.max(2,Math.floor($));let H=Math.min(U+W,Math.PI),Y=0,G=[],N=new T,D=new T,X=[],F=[],O=[],V=[];for(let q=0;q<=$;q++){let E=[],L=q/$,A=U+L*W,R=J*Math.cos(A),_=Math.sqrt(J*J-R*R),B=0;if(q===0&&U===0)B=0.5/Q;else if(q===$&&H===Math.PI)B=-0.5/Q;for(let z=0;z<=Q;z++){let M=z/Q,I=Z+M*K;N.x=-_*Math.cos(I),N.y=R,N.z=_*Math.sin(I),F.push(N.x,N.y,N.z),D.copy(N).normalize(),O.push(D.x,D.y,D.z),V.push(M+B,1-L),E.push(Y++)}G.push(E)}for(let q=0;q<$;q++)for(let E=0;E<Q;E++){let L=G[q][E+1],A=G[q][E],R=G[q+1][E],_=G[q+1][E+1];if(q!==0||U>0)X.push(L,A,_);if(q!==$-1||H<Math.PI)X.push(A,R,_)}this.setIndex(X),this.setAttribute("position",new J9(F,3)),this.setAttribute("normal",new J9(O,3)),this.setAttribute("uv",new J9(V,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new a0(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class L7 extends F9{constructor(J=1,Q=0.4,$=12,Z=48,K=Math.PI*2,U=0,W=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:Q,radialSegments:$,tubularSegments:Z,arc:K,thetaStart:U,thetaLength:W},$=Math.floor($),Z=Math.floor(Z);let H=[],Y=[],G=[],N=[],D=new T,X=new T,F=new T;for(let O=0;O<=$;O++){let V=U+O/$*W;for(let q=0;q<=Z;q++){let E=q/Z*K;X.x=(J+Q*Math.cos(V))*Math.cos(E),X.y=(J+Q*Math.cos(V))*Math.sin(E),X.z=Q*Math.sin(V),Y.push(X.x,X.y,X.z),D.x=J*Math.cos(E),D.y=J*Math.sin(E),F.subVectors(X,D).normalize(),G.push(F.x,F.y,F.z),N.push(q/Z),N.push(O/$)}}for(let O=1;O<=$;O++)for(let V=1;V<=Z;V++){let q=(Z+1)*O+V-1,E=(Z+1)*(O-1)+V-1,L=(Z+1)*(O-1)+V,A=(Z+1)*O+V;H.push(q,E,A),H.push(E,L,A)}this.setIndex(H),this.setAttribute("position",new J9(Y,3)),this.setAttribute("normal",new J9(G,3)),this.setAttribute("uv",new J9(N,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new L7(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc,J.thetaStart,J.thetaLength)}}class H8 extends F9{constructor(J=new JZ(new T(-1,-1,0),new T(-1,1,0),new T(1,1,0)),Q=64,$=1,Z=8,K=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:Q,radius:$,radialSegments:Z,closed:K};let U=J.computeFrenetFrames(Q,K);this.tangents=U.tangents,this.normals=U.normals,this.binormals=U.binormals;let W=new T,H=new T,Y=new Z0,G=new T,N=[],D=[],X=[],F=[];O(),this.setIndex(F),this.setAttribute("position",new J9(N,3)),this.setAttribute("normal",new J9(D,3)),this.setAttribute("uv",new J9(X,2));function O(){for(let L=0;L<Q;L++)V(L);V(K===!1?Q:0),E(),q()}function V(L){G=J.getPointAt(L/Q,G);let A=U.normals[L],R=U.binormals[L];for(let _=0;_<=Z;_++){let B=_/Z*Math.PI*2,z=Math.sin(B),M=-Math.cos(B);H.x=M*A.x+z*R.x,H.y=M*A.y+z*R.y,H.z=M*A.z+z*R.z,H.normalize(),D.push(H.x,H.y,H.z),W.x=G.x+$*H.x,W.y=G.y+$*H.y,W.z=G.z+$*H.z,N.push(W.x,W.y,W.z)}}function q(){for(let L=1;L<=Q;L++)for(let A=1;A<=Z;A++){let R=(Z+1)*(L-1)+(A-1),_=(Z+1)*L+(A-1),B=(Z+1)*L+A,z=(Z+1)*(L-1)+A;F.push(R,_,z),F.push(_,B,z)}}function E(){for(let L=0;L<=Q;L++)for(let A=0;A<=Z;A++)Y.x=L/Q,Y.y=A/Z,X.push(Y.x,Y.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new H8(new S$[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class PQ extends F9{constructor(J=null){super();if(this.type="WireframeGeometry",this.parameters={geometry:J},J!==null){let Q=[],$=new Set,Z=new T,K=new T;if(J.index!==null){let U=J.attributes.position,W=J.index,H=J.groups;if(H.length===0)H=[{start:0,count:W.count,materialIndex:0}];for(let Y=0,G=H.length;Y<G;++Y){let N=H[Y],D=N.start,X=N.count;for(let F=D,O=D+X;F<O;F+=3)for(let V=0;V<3;V++){let q=W.getX(F+V),E=W.getX(F+(V+1)%3);if(Z.fromBufferAttribute(U,q),K.fromBufferAttribute(U,E),lW(Z,K,$)===!0)Q.push(Z.x,Z.y,Z.z),Q.push(K.x,K.y,K.z)}}}else{let U=J.attributes.position;for(let W=0,H=U.count/3;W<H;W++)for(let Y=0;Y<3;Y++){let G=3*W+Y,N=3*W+(Y+1)%3;if(Z.fromBufferAttribute(U,G),K.fromBufferAttribute(U,N),lW(Z,K,$)===!0)Q.push(Z.x,Z.y,Z.z),Q.push(K.x,K.y,K.z)}}this.setAttribute("position",new J9(Q,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}function lW(J,Q,$){let Z=`${J.x},${J.y},${J.z}-${Q.x},${Q.y},${Q.z}`,K=`${Q.x},${Q.y},${Q.z}-${J.x},${J.y},${J.z}`;if($.has(Z)===!0||$.has(K)===!0)return!1;else return $.add(Z),$.add(K),!0}function fJ(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let K=J[$][Z];if(cW(K))if(K.isRenderTargetTexture)o0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=K.clone();else if(Array.isArray(K))if(cW(K[0])){let U=[];for(let W=0,H=K.length;W<H;W++)U[W]=K[W].clone();Q[$][Z]=U}else Q[$][Z]=K.slice();else Q[$][Z]=K}}return Q}function C7(J){let Q={};for(let $=0;$<J.length;$++){let Z=fJ(J[$]);for(let K in Z)Q[K]=Z[K]}return Q}function cW(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function AG(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function JU(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return q9.workingColorSpace}var Y8={clone:fJ,merge:C7},PG=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wG=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class y9 extends K8{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=PG,this.fragmentShader=wG,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=fJ(J.uniforms),this.uniformsGroups=AG(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let U=this.uniforms[Z].value;if(U&&U.isTexture)Q.uniforms[Z]={type:"t",value:U.toJSON(J).uuid};else if(U&&U.isColor)Q.uniforms[Z]={type:"c",value:U.getHex()};else if(U&&U.isVector2)Q.uniforms[Z]={type:"v2",value:U.toArray()};else if(U&&U.isVector3)Q.uniforms[Z]={type:"v3",value:U.toArray()};else if(U&&U.isVector4)Q.uniforms[Z]={type:"v4",value:U.toArray()};else if(U&&U.isMatrix3)Q.uniforms[Z]={type:"m3",value:U.toArray()};else if(U&&U.isMatrix4)Q.uniforms[Z]={type:"m4",value:U.toArray()};else Q.uniforms[Z]={value:U}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let Z=J.uniforms[$];switch(this.uniforms[$]={},Z.type){case"t":this.uniforms[$].value=Q[Z.value]||null;break;case"c":this.uniforms[$].value=new U0().setHex(Z.value);break;case"v2":this.uniforms[$].value=new Z0().fromArray(Z.value);break;case"v3":this.uniforms[$].value=new T().fromArray(Z.value);break;case"v4":this.uniforms[$].value=new a9().fromArray(Z.value);break;case"m3":this.uniforms[$].value=new $9().fromArray(Z.value);break;case"m4":this.uniforms[$].value=new z9().fromArray(Z.value);break;default:this.uniforms[$].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class wQ extends y9{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class D9 extends K8{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new U0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new U0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Z0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new f8,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class qJ extends K8{constructor(J){super();this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new U0(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new U0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Z0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.gradientMap=J.gradientMap,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.alphaMap=J.alphaMap,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}class TQ extends K8{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class QU extends K8{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}class $Z extends kJ{constructor(J){super();this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(J)}copy(J){return super.copy(J),this.scale=J.scale,this.dashSize=J.dashSize,this.gapSize=J.gapSize,this}}function E6(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}function sZ(J){return J!==void 0&&J.inTangents!==void 0&&J.outTangents!==void 0}class bJ{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],K=Q[$-1];$:{J:{let U;Q:{Z:if(!(J<Z)){for(let W=$+2;;){if(Z===void 0){if(J<K)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===W)break;if(K=Z,Z=Q[++$],J<Z)break J}U=Q.length;break Q}if(!(J>=K)){let W=Q[1];if(J<W)$=2,K=W;for(let H=$-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===H)break;if(Z=K,K=Q[--$-1],J>=K)break J}U=$,$=0;break Q}break $}while($<U){let W=$+U>>>1;if(J<Q[W])U=W;else $=W+1}if(Z=Q[$],K=Q[$-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,K,Z)}return this.interpolate_($,K,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,K=J*Z;for(let U=0;U!==Z;++U)Q[U]=$[K+U];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class $U extends bJ{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,K=J-2,U=J+1,W=Z[K],H=Z[U];if(W===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,W=2*Q-$;break;case 2402:K=Z.length-2,W=Q+Z[K]-Z[K+1];break;default:K=J,W=$}if(H===void 0)switch(this.getSettings_().endingEnd){case 2401:U=J,H=2*$-Q;break;case 2402:U=1,H=$+Z[1]-Z[0];break;default:U=J-1,H=Q}let Y=($-Q)*0.5,G=this.valueSize;this._weightPrev=Y/(Q-W),this._weightNext=Y/(H-$),this._offsetPrev=K*G,this._offsetNext=U*G}interpolate_(J,Q,$,Z){let K=this.resultBuffer,U=this.sampleValues,W=this.valueSize,H=J*W,Y=H-W,G=this._offsetPrev,N=this._offsetNext,D=this._weightPrev,X=this._weightNext,F=($-Q)/(Z-Q),O=F*F,V=O*F,q=-D*V+2*D*O-D*F,E=(1+D)*V+(-1.5-2*D)*O+(-0.5+D)*F+1,L=(-1-X)*V+(1.5+X)*O+0.5*F,A=X*V-X*O;for(let R=0;R!==W;++R)K[R]=q*U[G+R]+E*U[Y+R]+L*U[H+R]+A*U[N+R];return K}}class ZU extends bJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let K=this.resultBuffer,U=this.sampleValues,W=this.valueSize,H=J*W,Y=H-W,G=($-Q)/(Z-Q),N=1-G;for(let D=0;D!==W;++D)K[D]=U[Y+D]*N+U[H+D]*G;return K}}class KU extends bJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class UU extends bJ{interpolate_(J,Q,$,Z){let K=this.resultBuffer,U=this.sampleValues,W=this.valueSize,H=J*W,Y=H-W,G=this.inTangents,N=this.outTangents;if(!G||!N){let F=($-Q)/(Z-Q),O=1-F;for(let V=0;V!==W;++V)K[V]=U[Y+V]*O+U[H+V]*F;return K}let D=W*2,X=J-1;for(let F=0;F!==W;++F){let O=U[Y+F],V=U[H+F],q=X*D+F*2,E=N[q],L=N[q+1],A=J*D+F*2,R=G[A],_=G[A+1],B=SG($,Q,E,R,Z);K[F]=ZY(B,O,L,_,V)}return K}}function ZY(J,Q,$,Z,K){let U=1-J;return U*U*U*Q+3*U*U*J*$+3*U*J*J*Z+J*J*J*K}function TG(J,Q,$,Z,K){let U=1-J;return 3*U*U*($-Q)+6*U*J*(Z-$)+3*J*J*(K-Z)}function SG(J,Q,$,Z,K){let U=(J-Q)/(K-Q);for(let W=0;W<8;W++){let H=ZY(U,Q,$,Z,K)-J;if(Math.abs(H)<0.0000000001)break;let Y=TG(U,Q,$,Z,K);if(Math.abs(Y)<0.0000000001)break;U=Math.max(0,Math.min(1,U-H/Y))}return U}class i7{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=E6(Q,this.TimeBufferType),this.values=E6($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:E6(J.times,Array),values:E6(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z;if(sZ(J.settings))$.settings={inTangents:E6(J.settings.inTangents,Array),outTangents:E6(J.settings.outTangents,Array)}}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new KU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new ZU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new $U(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new UU(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return o0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J;if(sZ(this.settings))nW(this.settings.inTangents,J),nW(this.settings.outTangents,J)}return this}trim(J,Q){let $=this.times,Z=$.length,K=0,U=Z-1;while(K!==Z&&$[K]<J)++K;while(U!==-1&&$[U]>Q)--U;if(++U,K!==0||U!==Z){if(K>=U)U=Math.max(U,1),K=U-1;let W=this.getValueSize();this.times=$.slice(K,U),this.values=this.values.slice(K*W,U*W)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)e0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,K=$.length;if(K===0)e0("KeyframeTrack: Track is empty.",this),J=!1;let U=null;for(let W=0;W!==K;W++){let H=$[W];if(typeof H==="number"&&isNaN(H)){e0("KeyframeTrack: Time is not a valid number.",this,W,H),J=!1;break}if(U!==null&&U>H){e0("KeyframeTrack: Out of order keys.",this,W,H,U),J=!1;break}U=H}if(Z!==void 0){if(v5(Z))for(let W=0,H=Z.length;W!==H;++W){let Y=Z[W];if(isNaN(Y)){e0("KeyframeTrack: Value is not a valid number.",this,W,Y),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,K=J.length-1,U=1;for(let W=1;W<K;++W){let H=!1,Y=J[W],G=J[W+1];if(Y!==G&&(W!==1||Y!==J[0]))if(!Z){let N=W*$,D=N-$,X=N+$;for(let F=0;F!==$;++F){let O=Q[N+F];if(O!==Q[D+F]||O!==Q[X+F]){H=!0;break}}}else H=!0;if(H){if(W!==U){J[U]=J[W];let N=W*$,D=U*$;for(let X=0;X!==$;++X)Q[D+X]=Q[N+X]}++U}}if(K>0){J[U]=J[K];for(let W=K*$,H=U*$,Y=0;Y!==$;++Y)Q[H+Y]=Q[W+Y];++U}if(U!==J.length)this.times=J.slice(0,U),this.values=Q.slice(0,U*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);if(Z.createInterpolant=this.createInterpolant,sZ(this.settings))Z.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return Z}}function nW(J,Q){for(let $=0,Z=J.length;$!==Z;$+=2)J[$]*=Q}i7.prototype.ValueTypeName="";i7.prototype.TimeBufferType=Float32Array;i7.prototype.ValueBufferType=Float32Array;i7.prototype.DefaultInterpolation=2301;class hJ extends i7{constructor(J,Q,$){super(J,Q,$)}}hJ.prototype.ValueTypeName="bool";hJ.prototype.ValueBufferType=Array;hJ.prototype.DefaultInterpolation=2300;hJ.prototype.InterpolantFactoryMethodLinear=void 0;hJ.prototype.InterpolantFactoryMethodSmooth=void 0;class WU extends i7{constructor(J,Q,$,Z){super(J,Q,$,Z)}}WU.prototype.ValueTypeName="color";class HU extends i7{constructor(J,Q,$,Z){super(J,Q,$,Z)}}HU.prototype.ValueTypeName="number";class YU extends bJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let K=this.resultBuffer,U=this.sampleValues,W=this.valueSize,H=($-Q)/(Z-Q),Y=J*W;for(let G=Y+W;Y!==G;Y+=4)Z8.slerpFlat(K,0,U,Y-W,U,Y,H);return K}}class ZZ extends i7{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new YU(this.times,this.values,this.getValueSize(),J)}}ZZ.prototype.ValueTypeName="quaternion";ZZ.prototype.InterpolantFactoryMethodSmooth=void 0;class xJ extends i7{constructor(J,Q,$){super(J,Q,$)}}xJ.prototype.ValueTypeName="string";xJ.prototype.ValueBufferType=Array;xJ.prototype.DefaultInterpolation=2300;xJ.prototype.InterpolantFactoryMethodLinear=void 0;xJ.prototype.InterpolantFactoryMethodSmooth=void 0;class GU extends i7{constructor(J,Q,$,Z){super(J,Q,$,Z)}}GU.prototype.ValueTypeName="vector";class XU{constructor(J,Q,$){let Z=this,K=!1,U=0,W=0,H=void 0,Y=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(G){if(W++,K===!1){if(Z.onStart!==void 0)Z.onStart(G,U,W)}K=!0},this.itemEnd=function(G){if(U++,Z.onProgress!==void 0)Z.onProgress(G,U,W);if(U===W){if(K=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(G){if(Z.onError!==void 0)Z.onError(G)},this.resolveURL=function(G){if(G=G.normalize("NFC"),H)return H(G);return G},this.setURLModifier=function(G){return H=G,this},this.addHandler=function(G,N){return Y.push(G,N),this},this.removeHandler=function(G){let N=Y.indexOf(G);if(N!==-1)Y.splice(N,2);return this},this.getHandler=function(G){for(let N=0,D=Y.length;N<D;N+=2){let X=Y[N],F=Y[N+1];if(X.global)X.lastIndex=0;if(X.test(G))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var KY=new XU;class NU{constructor(J){if(this.manager=J!==void 0?J:KY,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,K){$.load(J,Z,Q,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}NU.DEFAULT_MATERIAL_NAME="__DEFAULT";class j6 extends x9{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new U0(J),this.intensity=Q}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class B8 extends j6{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(x9.DEFAULT_UP),this.updateMatrix(),this.groundColor=new U0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var iZ=new z9,sW=new T,iW=new T;class SQ{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Z0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new z9,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new CQ,this._frameExtents=new Z0(1,1),this._viewportCount=1,this._viewports=[new a9(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera;sW.setFromMatrixPosition(J.matrixWorld),Q.position.copy(sW),iW.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(iW),Q.updateMatrixWorld(),this._updateMatrix(Q,this.matrix,this._frustum)}_updateMatrix(J,Q,$,Z){iZ.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),$.setFromProjectionMatrix(iZ,J.coordinateSystem,J.reversedDepth);let K=this._frameExtents,U=Z?Z.z/K.x:1,W=Z?Z.w/K.y:1,H=Z?Z.x/K.x:0,Y=Z?Z.y/K.y:0;if(J.coordinateSystem===2001||J.reversedDepth)Q.set(0.5*U,0,0,0.5*U+H,0,0.5*W,0,0.5*W+Y,0,0,1,0,0,0,0,1);else Q.set(0.5*U,0,0,0.5*U+H,0,0.5*W,0,0.5*W+Y,0,0,0.5,0.5,0,0,0,1);Q.multiply(iZ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};return J.intensity=this.intensity,J.bias=this.bias,J.normalBias=this.normalBias,J.radius=this.radius,J.blurSamples=this.blurSamples,J.mapSize=this.mapSize.toArray(),J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var C$=new T,z$=new Z8,E8=new T;class KZ extends x9{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new z9,this.projectionMatrix=new z9,this.projectionMatrixInverse=new z9,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(C$,z$,E8),E8.x===1&&E8.y===1&&E8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(C$,z$,E8.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(C$,z$,E8),E8.x===1&&E8.y===1&&E8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(C$,z$,E8.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var HJ=new T,oW=new Z0,aW=new Z0;class e9 extends KZ{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=KQ*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(A$*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return KQ*2*Math.atan(Math.tan(A$*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){HJ.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(HJ.x,HJ.y).multiplyScalar(-J/HJ.z),HJ.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(HJ.x,HJ.y).multiplyScalar(-J/HJ.z)}getViewSize(J,Q){return this.getViewBounds(J,oW,aW),Q.subVectors(aW,oW)}setViewOffset(J,Q,$,Z,K,U){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(A$*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,K=-0.5*Z,U=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:H,fullHeight:Y}=U;K+=U.offsetX*Z/H,Q-=U.offsetY*$/Y,Z*=U.width/H,$*=U.height/Y}let W=this.filmOffset;if(W!==0)K+=J*W/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class UY extends SQ{constructor(){super(new e9(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(J){let Q=this.camera,$=KQ*2*J.angle*this.focus,Z=this.mapSize.width/this.mapSize.height*this.aspect,K=J.distance||Q.far;if($!==Q.fov||Z!==Q.aspect||K!==Q.far)Q.fov=$,Q.aspect=Z,Q.far=K,Q.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this.aspect=J.aspect,this}toJSON(){let J=super.toJSON();return J.focus=this.focus,J.aspect=this.aspect,J}}class UZ extends j6{constructor(J,Q,$=0,Z=Math.PI/3,K=0,U=2){super(J,Q);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(x9.DEFAULT_UP),this.updateMatrix(),this.target=new x9,this.distance=$,this.angle=Z,this.penumbra=K,this.decay=U,this.map=null,this.shadow=new UY}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.map=J.map,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);if(Q.object.distance=this.distance,Q.object.angle=this.angle,Q.object.decay=this.decay,Q.object.penumbra=this.penumbra,Q.object.target=this.target.uuid,this.map&&this.map.isTexture)Q.object.map=this.map.toJSON(J).uuid;return Q.object.shadow=this.shadow.toJSON(),Q}}class WY extends SQ{constructor(){super(new e9(90,1,0.5,500));this.isPointLightShadow=!0}}class v6 extends j6{constructor(J,Q,$=0,Z=2){super(J,Q);this.isPointLight=!0,this.type="PointLight",this.distance=$,this.decay=Z,this.shadow=new WY}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.distance=this.distance,Q.object.decay=this.decay,Q.object.shadow=this.shadow.toJSON(),Q}}class gJ extends KZ{constructor(J=-1,Q=1,$=1,Z=-1,K=0.1,U=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=K,this.far=U,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,K,U){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,K=$-J,U=$+J,W=Z+Q,H=Z-Q;if(this.view!==null&&this.view.enabled){let Y=(this.right-this.left)/this.view.fullWidth/this.zoom,G=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=Y*this.view.offsetX,U=K+Y*this.view.width,W-=G*this.view.offsetY,H=W-G*this.view.height}this.projectionMatrix.makeOrthographic(K,U,W,H,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class HY extends SQ{constructor(){super(new gJ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class G8 extends j6{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(x9.DEFAULT_UP),this.updateMatrix(),this.target=new x9,this.shadow=new HY}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}var R6=-90,O6=1;class qU extends x9{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new e9(R6,O6,J,Q);Z.layers=this.layers,this.add(Z);let K=new e9(R6,O6,J,Q);K.layers=this.layers,this.add(K);let U=new e9(R6,O6,J,Q);U.layers=this.layers,this.add(U);let W=new e9(R6,O6,J,Q);W.layers=this.layers,this.add(W);let H=new e9(R6,O6,J,Q);H.layers=this.layers,this.add(H);let Y=new e9(R6,O6,J,Q);Y.layers=this.layers,this.add(Y)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,K,U,W,H]=Q;for(let Y of Q)this.remove(Y);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),U.up.set(0,0,1),U.lookAt(0,-1,0),W.up.set(0,1,0),W.lookAt(0,0,1),H.up.set(0,1,0),H.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),U.up.set(0,0,-1),U.lookAt(0,-1,0),W.up.set(0,-1,0),W.lookAt(0,0,1),H.up.set(0,-1,0),H.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let Y of Q)this.add(Y),Y.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,U,W,H,Y,G]=this.children,N=J.getRenderTarget(),D=J.getActiveCubeFace(),X=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let O=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let V=!1;if(J.isWebGLRenderer===!0)V=J.state.buffers.depth.getReversed();else V=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,1,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,U),J.setRenderTarget($,2,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,3,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,4,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),$.texture.generateMipmaps=O,J.setRenderTarget($,5,Z),V&&J.autoClear===!1)J.clearDepth();J.render(Q,G),J.setRenderTarget(N,D,X),J.xr.enabled=F,$.texture.needsPMREMUpdate=!0}}class FU extends e9{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}class WZ{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(J){if(this._document=J,J.hidden!==void 0)this._pageVisibilityHandler=kG.bind(this),J.addEventListener("visibilitychange",this._pageVisibilityHandler,!1)}disconnect(){if(this._pageVisibilityHandler!==null)this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null;this._document=null}getDelta(){return this._delta/1000}getElapsed(){return this._elapsed/1000}getTimescale(){return this._timescale}setTimescale(J){return this._timescale=J,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(J){if(this._pageVisibilityHandler!==null&&this._document.hidden===!0)this._delta=0;else this._previousTime=this._currentTime,this._currentTime=(J!==void 0?J:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta;return this}}function kG(){if(this._document.hidden===!1)this.reset()}var DU="\\[\\]\\.:\\/",jG=new RegExp("["+DU+"]","g"),EU="[^"+DU+"]",vG="[^"+DU.replace("\\.","")+"]",yG=/((?:WC+[\/:])*)/.source.replace("WC",EU),fG=/(WCOD+)?/.source.replace("WCOD",vG),bG=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",EU),hG=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",EU),xG=new RegExp("^"+yG+fG+bG+hG+"$"),gG=["material","materials","bones","map"];class YY{constructor(J,Q,$){let Z=$||h9.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,K=$.length;Z!==K;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class h9{constructor(J,Q,$){this.path=Q,this.parsedPath=$||h9.parseTrackName(Q),this.node=h9.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new h9(J,Q,$);else return new h9.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(jG,"")}static parseTrackName(J){let Q=xG.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let K=$.nodeName.substring(Z+1);if(gG.indexOf(K)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=K}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(K){for(let U=0;U<K.length;U++){let W=K[U];if(W.name===Q||W.uuid===Q)return W;let H=$(W.children);if(H)return H}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,K=Q.propertyIndex;if(!J)J=h9.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){o0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let Y=Q.objectIndex;switch($){case"materials":if(!J.material){e0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){e0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){e0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let G=0;G<J.length;G++)if(J[G].name===Y){Y=G;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){e0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){e0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){e0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(Y!==void 0){if(J[Y]===void 0){e0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[Y]}}let U=J[Z];if(U===void 0){let Y=Q.nodeName;e0("PropertyBinding: Trying to update property for track: "+Y+"."+Z+" but it wasn't found.",J);return}let W=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)W=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)W=this.Versioning.MatrixWorldNeedsUpdate;let H=this.BindingType.Direct;if(K!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){e0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){e0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}H=this.BindingType.ArrayElement,this.resolvedProperty=U,this.propertyIndex=K}else if(U.fromArray!==void 0&&U.toArray!==void 0)H=this.BindingType.HasFromToArray,this.resolvedProperty=U;else if(Array.isArray(U))H=this.BindingType.EntireArray,this.resolvedProperty=U;else this.propertyName=Z;this.getValue=this.GetterByBindingType[H],this.setValue=this.SetterByBindingTypeAndVersioning[H][W]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}h9.Composite=YY;h9.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};h9.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};h9.prototype.GetterByBindingType=[h9.prototype._getValue_direct,h9.prototype._getValue_array,h9.prototype._getValue_arrayElement,h9.prototype._getValue_toArray];h9.prototype.SetterByBindingTypeAndVersioning=[[h9.prototype._setValue_direct,h9.prototype._setValue_direct_setNeedsUpdate,h9.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[h9.prototype._setValue_array,h9.prototype._setValue_array_setNeedsUpdate,h9.prototype._setValue_array_setMatrixWorldNeedsUpdate],[h9.prototype._setValue_arrayElement,h9.prototype._setValue_arrayElement_setNeedsUpdate,h9.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[h9.prototype._setValue_fromArray,h9.prototype._setValue_fromArray_setNeedsUpdate,h9.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var x1=new Float32Array(1);class RU{static{RU.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let K=this.elements;return K[0]=J,K[2]=Q,K[1]=$,K[3]=Z,this}}class FJ extends U8{constructor(J=10,Q=10,$=4473924,Z=8947848){$=new U0($),Z=new U0(Z);let K=Q/2,U=J/Q,W=J/2,H=[],Y=[];for(let D=0,X=0,F=-W;D<=Q;D++,F+=U){H.push(-W,0,F,W,0,F),H.push(F,0,-W,F,0,W);let O=D===K?$:Z;O.toArray(Y,X),X+=3,O.toArray(Y,X),X+=3,O.toArray(Y,X),X+=3,O.toArray(Y,X),X+=3}let G=new F9;G.setAttribute("position",new J9(H,3)),G.setAttribute("color",new J9(Y,3));let N=new kJ({vertexColors:!0,toneMapped:!1});super(G,N);this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function OU(J,Q,$,Z){let K=pG(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/K.components*K.byteLength;case 1029:return J*Q/K.components*K.byteLength;case 1030:return J*Q*2/K.components*K.byteLength;case 1031:return J*Q*2/K.components*K.byteLength;case 1022:return J*Q*3/K.components*K.byteLength;case 1023:return J*Q*4/K.components*K.byteLength;case 1033:return J*Q*4/K.components*K.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function pG(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)o0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function SY(){let J=null,Q=!1,$=null,Z=null;function K(U,W){Z=J.requestAnimationFrame(K),$(U,W)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(K),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(U){$=U},setContext:function(U){J=U}}}function mG(J){let Q=new WeakMap;function $(H,Y){let{array:G,usage:N}=H,D=G.byteLength,X=J.createBuffer();J.bindBuffer(Y,X),J.bufferData(Y,G,N),H.onUploadCallback();let F;if(G instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&G instanceof Float16Array)F=J.HALF_FLOAT;else if(G instanceof Uint16Array)if(H.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(G instanceof Int16Array)F=J.SHORT;else if(G instanceof Uint32Array)F=J.UNSIGNED_INT;else if(G instanceof Int32Array)F=J.INT;else if(G instanceof Int8Array)F=J.BYTE;else if(G instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(G instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+G);return{buffer:X,type:F,bytesPerElement:G.BYTES_PER_ELEMENT,version:H.version,size:D}}function Z(H,Y,G){let{array:N,updateRanges:D}=Y;if(J.bindBuffer(G,H),D.length===0)J.bufferSubData(G,0,N);else{D.sort((F,O)=>F.start-O.start);let X=0;for(let F=1;F<D.length;F++){let O=D[X],V=D[F];if(V.start<=O.start+O.count+1)O.count=Math.max(O.count,V.start+V.count-O.start);else++X,D[X]=V}D.length=X+1;for(let F=0,O=D.length;F<O;F++){let V=D[F];J.bufferSubData(G,V.start*N.BYTES_PER_ELEMENT,N,V.start,V.count)}Y.clearUpdateRanges()}Y.onUploadCallback()}function K(H){if(H.isInterleavedBufferAttribute)H=H.data;return Q.get(H)}function U(H){if(H.isInterleavedBufferAttribute)H=H.data;let Y=Q.get(H);if(Y)J.deleteBuffer(Y.buffer),Q.delete(H)}function W(H,Y){if(H.isInterleavedBufferAttribute)H=H.data;if(H.isGLBufferAttribute){let N=Q.get(H);if(!N||N.version<H.version)Q.set(H,{buffer:H.buffer,type:H.type,bytesPerElement:H.elementSize,version:H.version});return}let G=Q.get(H);if(G===void 0)Q.set(H,$(H,Y));else if(G.version<H.version){if(G.size!==H.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(G.buffer,H,Y),G.version=H.version}}return{get:K,remove:U,update:W}}var dG=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uG=`#ifdef USE_ALPHAHASH
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
#endif`,lG=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cG=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nG=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sG=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,iG=`#ifdef USE_AOMAP
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
#endif`,oG=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,aG=`#ifdef USE_BATCHING
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
#endif`,rG=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tG=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eG=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,JX=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,QX=`#ifdef USE_IRIDESCENCE
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
#endif`,$X=`#ifdef USE_BUMPMAP
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
#endif`,ZX=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,KX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,UX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,WX=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,HX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,YX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,GX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,XX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,NX=`#define PI 3.141592653589793
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
} // validated`,qX=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,FX=`vec3 transformedNormal = objectNormal;
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
#endif`,DX=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,EX=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,RX=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,OX=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,MX="gl_FragColor = linearToOutputTexel( gl_FragColor );",VX=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,BX=`#ifdef USE_ENVMAP
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
#endif`,_X=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,IX=`#ifdef USE_ENVMAP
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
#endif`,LX=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,CX=`#ifdef USE_ENVMAP
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
#endif`,zX=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,AX=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,PX=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wX=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,TX=`#ifdef USE_GRADIENTMAP
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
}`,SX=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kX=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jX=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vX=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,yX=`#ifdef USE_ENVMAP
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
#endif`,fX=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bX=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hX=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xX=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gX=`PhysicalMaterial material;
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
#endif`,pX=`uniform sampler2D dfgLUT;
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
}`,mX=`
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
#endif`,dX=`#if defined( RE_IndirectDiffuse )
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
#endif`,uX=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lX=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,cX=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nX=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iX=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,oX=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,aX=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rX=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tX=`#if defined( USE_POINTS_UV )
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
#endif`,eX=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,JN=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,QN=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$N=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ZN=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KN=`#ifdef USE_MORPHTARGETS
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
#endif`,UN=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,WN=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,HN=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,YN=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,GN=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XN=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,NN=`#ifdef USE_NORMALMAP
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
#endif`,qN=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,FN=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,DN=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,EN=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,RN=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ON=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,MN=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,VN=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,BN=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_N=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,IN=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,LN=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,CN=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zN=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,AN=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,PN=`float getShadowMask() {
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
}`,wN=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,TN=`#ifdef USE_SKINNING
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
#endif`,SN=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kN=`#ifdef USE_SKINNING
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
#endif`,jN=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vN=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yN=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fN=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bN=`#ifdef USE_TRANSMISSION
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
#endif`,hN=`#ifdef USE_TRANSMISSION
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
#endif`,xN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pN=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mN=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,dN=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uN=`uniform sampler2D t2D;
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
}`,lN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cN=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sN=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iN=`#include <common>
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
}`,oN=`#if DEPTH_PACKING == 3200
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
}`,aN=`#define DISTANCE
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
}`,rN=`#define DISTANCE
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
}`,tN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,eN=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jq=`uniform float scale;
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
}`,Qq=`uniform vec3 diffuse;
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
}`,$q=`#include <common>
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
}`,Zq=`uniform vec3 diffuse;
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
}`,Kq=`#define LAMBERT
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
}`,Uq=`#define LAMBERT
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
}`,Wq=`#define MATCAP
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
}`,Hq=`#define MATCAP
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
}`,Yq=`#define NORMAL
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
}`,Gq=`#define NORMAL
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
}`,Xq=`#define PHONG
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
}`,Nq=`#define PHONG
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
}`,qq=`#define STANDARD
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
}`,Fq=`#define STANDARD
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
}`,Dq=`#define TOON
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
}`,Eq=`#define TOON
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
}`,Rq=`uniform float size;
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
}`,Oq=`uniform vec3 diffuse;
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
}`,Mq=`#include <common>
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
}`,Vq=`uniform vec3 color;
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
}`,Bq=`uniform float rotation;
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
}`,_q=`uniform vec3 diffuse;
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
}`,X9={alphahash_fragment:dG,alphahash_pars_fragment:uG,alphamap_fragment:lG,alphamap_pars_fragment:cG,alphatest_fragment:nG,alphatest_pars_fragment:sG,aomap_fragment:iG,aomap_pars_fragment:oG,batching_pars_vertex:aG,batching_vertex:rG,begin_vertex:tG,beginnormal_vertex:eG,bsdfs:JX,iridescence_fragment:QX,bumpmap_pars_fragment:$X,clipping_planes_fragment:ZX,clipping_planes_pars_fragment:KX,clipping_planes_pars_vertex:UX,clipping_planes_vertex:WX,color_fragment:HX,color_pars_fragment:YX,color_pars_vertex:GX,color_vertex:XX,common:NX,cube_uv_reflection_fragment:qX,defaultnormal_vertex:FX,displacementmap_pars_vertex:DX,displacementmap_vertex:EX,emissivemap_fragment:RX,emissivemap_pars_fragment:OX,colorspace_fragment:MX,colorspace_pars_fragment:VX,envmap_fragment:BX,envmap_common_pars_fragment:_X,envmap_pars_fragment:IX,envmap_pars_vertex:LX,envmap_physical_pars_fragment:yX,envmap_vertex:CX,fog_vertex:zX,fog_pars_vertex:AX,fog_fragment:PX,fog_pars_fragment:wX,gradientmap_pars_fragment:TX,lightmap_pars_fragment:SX,lights_lambert_fragment:kX,lights_lambert_pars_fragment:jX,lights_pars_begin:vX,lights_toon_fragment:fX,lights_toon_pars_fragment:bX,lights_phong_fragment:hX,lights_phong_pars_fragment:xX,lights_physical_fragment:gX,lights_physical_pars_fragment:pX,lights_fragment_begin:mX,lights_fragment_maps:dX,lights_fragment_end:uX,lightprobes_pars_fragment:lX,logdepthbuf_fragment:cX,logdepthbuf_pars_fragment:nX,logdepthbuf_pars_vertex:sX,logdepthbuf_vertex:iX,map_fragment:oX,map_pars_fragment:aX,map_particle_fragment:rX,map_particle_pars_fragment:tX,metalnessmap_fragment:eX,metalnessmap_pars_fragment:JN,morphinstance_vertex:QN,morphcolor_vertex:$N,morphnormal_vertex:ZN,morphtarget_pars_vertex:KN,morphtarget_vertex:UN,normal_fragment_begin:WN,normal_fragment_maps:HN,normal_pars_fragment:YN,normal_pars_vertex:GN,normal_vertex:XN,normalmap_pars_fragment:NN,clearcoat_normal_fragment_begin:qN,clearcoat_normal_fragment_maps:FN,clearcoat_pars_fragment:DN,iridescence_pars_fragment:EN,opaque_fragment:RN,packing:ON,premultiplied_alpha_fragment:MN,project_vertex:VN,dithering_fragment:BN,dithering_pars_fragment:_N,roughnessmap_fragment:IN,roughnessmap_pars_fragment:LN,shadowmap_pars_fragment:CN,shadowmap_pars_vertex:zN,shadowmap_vertex:AN,shadowmask_pars_fragment:PN,skinbase_vertex:wN,skinning_pars_vertex:TN,skinning_vertex:SN,skinnormal_vertex:kN,specularmap_fragment:jN,specularmap_pars_fragment:vN,tonemapping_fragment:yN,tonemapping_pars_fragment:fN,transmission_fragment:bN,transmission_pars_fragment:hN,uv_pars_fragment:xN,uv_pars_vertex:gN,uv_vertex:pN,worldpos_vertex:mN,background_vert:dN,background_frag:uN,backgroundCube_vert:lN,backgroundCube_frag:cN,cube_vert:nN,cube_frag:sN,depth_vert:iN,depth_frag:oN,distance_vert:aN,distance_frag:rN,equirect_vert:tN,equirect_frag:eN,linedashed_vert:Jq,linedashed_frag:Qq,meshbasic_vert:$q,meshbasic_frag:Zq,meshlambert_vert:Kq,meshlambert_frag:Uq,meshmatcap_vert:Wq,meshmatcap_frag:Hq,meshnormal_vert:Yq,meshnormal_frag:Gq,meshphong_vert:Xq,meshphong_frag:Nq,meshphysical_vert:qq,meshphysical_frag:Fq,meshtoon_vert:Dq,meshtoon_frag:Eq,points_vert:Rq,points_frag:Oq,shadow_vert:Mq,shadow_frag:Vq,sprite_vert:Bq,sprite_frag:_q},C0={common:{diffuse:{value:new U0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $9},alphaMap:{value:null},alphaMapTransform:{value:new $9},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $9}},envmap:{envMap:{value:null},envMapRotation:{value:new $9},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $9}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $9}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $9},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $9},normalScale:{value:new Z0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $9},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $9}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $9}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $9}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new U0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new T},probesMax:{value:new T},probesResolution:{value:new T}},points:{diffuse:{value:new U0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $9},alphaTest:{value:0},uvTransform:{value:new $9}},sprite:{diffuse:{value:new U0(16777215)},opacity:{value:1},center:{value:new Z0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $9},alphaMap:{value:null},alphaMapTransform:{value:new $9},alphaTest:{value:0}}},I8={basic:{uniforms:C7([C0.common,C0.specularmap,C0.envmap,C0.aomap,C0.lightmap,C0.fog]),vertexShader:X9.meshbasic_vert,fragmentShader:X9.meshbasic_frag},lambert:{uniforms:C7([C0.common,C0.specularmap,C0.envmap,C0.aomap,C0.lightmap,C0.emissivemap,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.fog,C0.lights,{emissive:{value:new U0(0)},envMapIntensity:{value:1}}]),vertexShader:X9.meshlambert_vert,fragmentShader:X9.meshlambert_frag},phong:{uniforms:C7([C0.common,C0.specularmap,C0.envmap,C0.aomap,C0.lightmap,C0.emissivemap,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.fog,C0.lights,{emissive:{value:new U0(0)},specular:{value:new U0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X9.meshphong_vert,fragmentShader:X9.meshphong_frag},standard:{uniforms:C7([C0.common,C0.envmap,C0.aomap,C0.lightmap,C0.emissivemap,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.roughnessmap,C0.metalnessmap,C0.fog,C0.lights,{emissive:{value:new U0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X9.meshphysical_vert,fragmentShader:X9.meshphysical_frag},toon:{uniforms:C7([C0.common,C0.aomap,C0.lightmap,C0.emissivemap,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.gradientmap,C0.fog,C0.lights,{emissive:{value:new U0(0)}}]),vertexShader:X9.meshtoon_vert,fragmentShader:X9.meshtoon_frag},matcap:{uniforms:C7([C0.common,C0.bumpmap,C0.normalmap,C0.displacementmap,C0.fog,{matcap:{value:null}}]),vertexShader:X9.meshmatcap_vert,fragmentShader:X9.meshmatcap_frag},points:{uniforms:C7([C0.points,C0.fog]),vertexShader:X9.points_vert,fragmentShader:X9.points_frag},dashed:{uniforms:C7([C0.common,C0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X9.linedashed_vert,fragmentShader:X9.linedashed_frag},depth:{uniforms:C7([C0.common,C0.displacementmap]),vertexShader:X9.depth_vert,fragmentShader:X9.depth_frag},normal:{uniforms:C7([C0.common,C0.bumpmap,C0.normalmap,C0.displacementmap,{opacity:{value:1}}]),vertexShader:X9.meshnormal_vert,fragmentShader:X9.meshnormal_frag},sprite:{uniforms:C7([C0.sprite,C0.fog]),vertexShader:X9.sprite_vert,fragmentShader:X9.sprite_frag},background:{uniforms:{uvTransform:{value:new $9},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X9.background_vert,fragmentShader:X9.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $9}},vertexShader:X9.backgroundCube_vert,fragmentShader:X9.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X9.cube_vert,fragmentShader:X9.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X9.equirect_vert,fragmentShader:X9.equirect_frag},distance:{uniforms:C7([C0.common,C0.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:X9.distance_vert,fragmentShader:X9.distance_frag},shadow:{uniforms:C7([C0.lights,C0.fog,{color:{value:new U0(0)},opacity:{value:1}}]),vertexShader:X9.shadow_vert,fragmentShader:X9.shadow_frag}};I8.physical={uniforms:C7([I8.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $9},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $9},clearcoatNormalScale:{value:new Z0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $9},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $9},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $9},sheen:{value:0},sheenColor:{value:new U0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $9},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $9},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $9},transmissionSamplerSize:{value:new Z0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $9},attenuationDistance:{value:0},attenuationColor:{value:new U0(0)},specularColor:{value:new U0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $9},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $9},anisotropyVector:{value:new Z0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $9}}]),vertexShader:X9.meshphysical_vert,fragmentShader:X9.meshphysical_frag};var HZ={r:0,b:0,g:0},Iq=new z9,kY=new $9;kY.set(-1,0,0,0,1,0,0,0,1);function Lq(J,Q,$,Z,K,U){let W=new U0(0),H=K===!0?0:1,Y,G,N=null,D=0,X=null;function F(L){let A=L.isScene===!0?L.background:null;if(A&&A.isTexture){let R=L.backgroundBlurriness>0;A=Q.get(A,R)}return A}function O(L){let A=!1,R=F(L);if(R===null)q(W,H);else if(R&&R.isColor)q(R,1),A=!0;let _=J.xr.getEnvironmentBlendMode();if(_==="additive")$.buffers.color.setClear(0,0,0,1,U);else if(_==="alpha-blend")$.buffers.color.setClear(0,0,0,0,U);if(J.autoClear||A)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function V(L,A){let R=F(A);if(R&&(R.isCubeTexture||R.mapping===OQ)){if(G===void 0)G=new $0(new c0(1,1,1),new y9({name:"BackgroundCubeMaterial",uniforms:fJ(I8.backgroundCube.uniforms),vertexShader:I8.backgroundCube.vertexShader,fragmentShader:I8.backgroundCube.fragmentShader,side:X7,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),G.geometry.deleteAttribute("normal"),G.geometry.deleteAttribute("uv"),G.onBeforeRender=function(_,B,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(G.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(G);if(G.material.uniforms.envMap.value=R,G.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,G.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,G.material.uniforms.backgroundRotation.value.setFromMatrix4(Iq.makeRotationFromEuler(A.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1)G.material.uniforms.backgroundRotation.value.premultiply(kY);if(G.material.toneMapped=q9.getTransfer(R.colorSpace)!==g9,N!==R||D!==R.version||X!==J.toneMapping)G.material.needsUpdate=!0,N=R,D=R.version,X=J.toneMapping;G.layers.enableAll(),L.unshift(G,G.geometry,G.material,0,0,null)}else if(R&&R.isTexture){if(Y===void 0)Y=new $0(new A9(2,2),new y9({name:"BackgroundMaterial",uniforms:fJ(I8.background.uniforms),vertexShader:I8.background.vertexShader,fragmentShader:I8.background.fragmentShader,side:L6,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),Y.geometry.deleteAttribute("normal"),Object.defineProperty(Y.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(Y);if(Y.material.uniforms.t2D.value=R,Y.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,Y.material.toneMapped=q9.getTransfer(R.colorSpace)!==g9,R.matrixAutoUpdate===!0)R.updateMatrix();if(Y.material.uniforms.uvTransform.value.copy(R.matrix),N!==R||D!==R.version||X!==J.toneMapping)Y.material.needsUpdate=!0,N=R,D=R.version,X=J.toneMapping;Y.layers.enableAll(),L.unshift(Y,Y.geometry,Y.material,0,0,null)}}function q(L,A){L.getRGB(HZ,JU(J)),$.buffers.color.setClear(HZ.r,HZ.g,HZ.b,A,U)}function E(){if(G!==void 0)G.geometry.dispose(),G.material.dispose(),G=void 0;if(Y!==void 0)Y.geometry.dispose(),Y.material.dispose(),Y=void 0}return{getClearColor:function(){return W},setClearColor:function(L,A=1){W.set(L),H=A,q(W,H)},getClearAlpha:function(){return H},setClearAlpha:function(L){H=L,q(W,H)},render:O,addToRenderList:V,dispose:E}}function Cq(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},K=X(null),U=K,W=!1;function H(S,h,a,k,m){let e=!1,l=D(S,k,a,h);if(U!==l)U=l,G(U.object);if(e=F(S,k,a,m),e)O(S,k,a,m);if(m!==null)Q.update(m,J.ELEMENT_ARRAY_BUFFER);if(e||W){if(W=!1,R(S,h,a,k),m!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(m).buffer)}}function Y(){return J.createVertexArray()}function G(S){return J.bindVertexArray(S)}function N(S){return J.deleteVertexArray(S)}function D(S,h,a,k){let m=k.wireframe===!0,e=Z[h.id];if(e===void 0)e={},Z[h.id]=e;let l=S.isInstancedMesh===!0?S.id:0,i=e[l];if(i===void 0)i={},e[l]=i;let p=i[a.id];if(p===void 0)p={},i[a.id]=p;let o=p[m];if(o===void 0)o=X(Y()),p[m]=o;return o}function X(S){let h=[],a=[],k=[];for(let m=0;m<$;m++)h[m]=0,a[m]=0,k[m]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:h,enabledAttributes:a,attributeDivisors:k,object:S,attributes:{},index:null}}function F(S,h,a,k){let m=U.attributes,e=h.attributes,l=0,i=a.getAttributes();for(let p in i)if(i[p].location>=0){let H0=m[p],S0=e[p];if(S0===void 0){if(p==="instanceMatrix"&&S.instanceMatrix)S0=S.instanceMatrix;if(p==="instanceColor"&&S.instanceColor)S0=S.instanceColor}if(H0===void 0)return!0;if(H0.attribute!==S0)return!0;if(S0&&H0.data!==S0.data)return!0;l++}if(U.attributesNum!==l)return!0;if(U.index!==k)return!0;return!1}function O(S,h,a,k){let m={},e=h.attributes,l=0,i=a.getAttributes();for(let p in i)if(i[p].location>=0){let H0=e[p];if(H0===void 0){if(p==="instanceMatrix"&&S.instanceMatrix)H0=S.instanceMatrix;if(p==="instanceColor"&&S.instanceColor)H0=S.instanceColor}let S0={};if(S0.attribute=H0,H0&&H0.data)S0.data=H0.data;m[p]=S0,l++}U.attributes=m,U.attributesNum=l,U.index=k}function V(){let S=U.newAttributes;for(let h=0,a=S.length;h<a;h++)S[h]=0}function q(S){E(S,0)}function E(S,h){let{newAttributes:a,enabledAttributes:k,attributeDivisors:m}=U;if(a[S]=1,k[S]===0)J.enableVertexAttribArray(S),k[S]=1;if(m[S]!==h)J.vertexAttribDivisor(S,h),m[S]=h}function L(){let{newAttributes:S,enabledAttributes:h}=U;for(let a=0,k=h.length;a<k;a++)if(h[a]!==S[a])J.disableVertexAttribArray(a),h[a]=0}function A(S,h,a,k,m,e,l){if(l===!0)J.vertexAttribIPointer(S,h,a,m,e);else J.vertexAttribPointer(S,h,a,k,m,e)}function R(S,h,a,k){V();let m=k.attributes,e=a.getAttributes(),l=h.defaultAttributeValues;for(let i in e){let p=e[i];if(p.location>=0){let o=m[i];if(o===void 0){if(i==="instanceMatrix"&&S.instanceMatrix)o=S.instanceMatrix;if(i==="instanceColor"&&S.instanceColor)o=S.instanceColor}if(o!==void 0){let{normalized:H0,itemSize:S0}=o,x0=Q.get(o);if(x0===void 0)continue;let{buffer:t,type:h0,bytesPerElement:n}=x0,W0=h0===J.INT||h0===J.UNSIGNED_INT||o.gpuType===$K;if(o.isInterleavedBufferAttribute){let F0=o.data,g0=F0.stride,r0=o.offset;if(F0.isInstancedInterleavedBuffer){for(let y0=0;y0<p.locationSize;y0++)E(p.location+y0,F0.meshPerAttribute);if(S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0)k._maxInstanceCount=F0.meshPerAttribute*F0.count}else for(let y0=0;y0<p.locationSize;y0++)q(p.location+y0);J.bindBuffer(J.ARRAY_BUFFER,t);for(let y0=0;y0<p.locationSize;y0++)A(p.location+y0,S0/p.locationSize,h0,H0,g0*n,(r0+S0/p.locationSize*y0)*n,W0)}else{if(o.isInstancedBufferAttribute){for(let F0=0;F0<p.locationSize;F0++)E(p.location+F0,o.meshPerAttribute);if(S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0)k._maxInstanceCount=o.meshPerAttribute*o.count}else for(let F0=0;F0<p.locationSize;F0++)q(p.location+F0);J.bindBuffer(J.ARRAY_BUFFER,t);for(let F0=0;F0<p.locationSize;F0++)A(p.location+F0,S0/p.locationSize,h0,H0,S0*n,S0/p.locationSize*F0*n,W0)}}else if(l!==void 0){let H0=l[i];if(H0!==void 0)switch(H0.length){case 2:J.vertexAttrib2fv(p.location,H0);break;case 3:J.vertexAttrib3fv(p.location,H0);break;case 4:J.vertexAttrib4fv(p.location,H0);break;default:J.vertexAttrib1fv(p.location,H0)}}}}L()}function _(){I();for(let S in Z){let h=Z[S];for(let a in h){let k=h[a];for(let m in k){let e=k[m];for(let l in e)N(e[l].object),delete e[l];delete k[m]}}delete Z[S]}}function B(S){if(Z[S.id]===void 0)return;let h=Z[S.id];for(let a in h){let k=h[a];for(let m in k){let e=k[m];for(let l in e)N(e[l].object),delete e[l];delete k[m]}}delete Z[S.id]}function z(S){for(let h in Z){let a=Z[h];for(let k in a){let m=a[k];if(m[S.id]===void 0)continue;let e=m[S.id];for(let l in e)N(e[l].object),delete e[l];delete m[S.id]}}}function M(S){for(let h in Z){let a=Z[h],k=S.isInstancedMesh===!0?S.id:0,m=a[k];if(m===void 0)continue;for(let e in m){let l=m[e];for(let i in l)N(l[i].object),delete l[i];delete m[e]}if(delete a[k],Object.keys(a).length===0)delete Z[h]}}function I(){if(f(),W=!0,U===K)return;U=K,G(U.object)}function f(){K.geometry=null,K.program=null,K.wireframe=!1}return{setup:H,reset:I,resetDefaultState:f,dispose:_,releaseStatesOfGeometry:B,releaseStatesOfObject:M,releaseStatesOfProgram:z,initAttributes:V,enableAttribute:q,disableUnusedAttributes:L}}function zq(J,Q,$){let Z;function K(Y){Z=Y}function U(Y,G){J.drawArrays(Z,Y,G),$.update(G,Z,1)}function W(Y,G,N){if(N===0)return;J.drawArraysInstanced(Z,Y,G,N),$.update(G,Z,N)}function H(Y,G,N){if(N===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,Y,0,G,0,N);let X=0;for(let F=0;F<N;F++)X+=G[F];$.update(X,Z,1)}this.setMode=K,this.render=U,this.renderInstances=W,this.renderMultiDraw=H}function Aq(J,Q,$,Z){let K;function U(){if(K!==void 0)return K;if(Q.has("EXT_texture_filter_anisotropic")===!0){let z=Q.get("EXT_texture_filter_anisotropic");K=J.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else K=0;return K}function W(z){if(z!==M8&&Z.convert(z)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function H(z){let M=z===E7&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(z!==$8&&z!==h8&&!M&&Z.convert(z)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function Y(z){if(z==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";z="mediump"}if(z==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let G=$.precision!==void 0?$.precision:"highp",N=Y(G);if(N!==G)o0("WebGLRenderer:",G,"not supported, using",N,"instead."),G=N;let D=$.logarithmicDepthBuffer===!0,X=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&X===!1)o0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),O=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),V=J.getParameter(J.MAX_TEXTURE_SIZE),q=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),L=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),A=J.getParameter(J.MAX_VARYING_VECTORS),R=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),_=J.getParameter(J.MAX_SAMPLES),B=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:U,getMaxPrecision:Y,textureFormatReadable:W,textureTypeReadable:H,precision:G,logarithmicDepthBuffer:D,reversedDepthBuffer:X,maxTextures:F,maxVertexTextures:O,maxTextureSize:V,maxCubemapSize:q,maxAttributes:E,maxVertexUniforms:L,maxVaryings:A,maxFragmentUniforms:R,maxSamples:_,samples:B}}function Pq(J){let Q=this,$=null,Z=0,K=!1,U=!1,W=new R8,H=new $9,Y={value:null,needsUpdate:!1};this.uniform=Y,this.numPlanes=0,this.numIntersection=0,this.init=function(D,X){let F=D.length!==0||X||Z!==0||K;return K=X,Z=D.length,F},this.beginShadows=function(){U=!0,N(null)},this.endShadows=function(){U=!1},this.setGlobalState=function(D,X){$=N(D,X,0)},this.setState=function(D,X,F){let{clippingPlanes:O,clipIntersection:V,clipShadows:q}=D,E=J.get(D);if(!K||O===null||O.length===0||U&&!q)if(U)N(null);else G();else{let L=U?0:Z,A=L*4,R=E.clippingState||null;Y.value=R,R=N(O,X,A,F);for(let _=0;_!==A;++_)R[_]=$[_];E.clippingState=R,this.numIntersection=V?this.numPlanes:0,this.numPlanes+=L}};function G(){if(Y.value!==$)Y.value=$,Y.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function N(D,X,F,O){let V=D!==null?D.length:0,q=null;if(V!==0){if(q=Y.value,O!==!0||q===null){let E=F+V*4,L=X.matrixWorldInverse;if(H.getNormalMatrix(L),q===null||q.length<E)q=new Float32Array(E);for(let A=0,R=F;A!==V;++A,R+=4)W.copy(D[A]).applyMatrix4(L,H),W.normal.toArray(q,R),q[R+3]=W.constant}Y.value=q,Y.needsUpdate=!0}return Q.numPlanes=V,Q.numIntersection=0,q}}var f6=4,wq=6,Tq=20,Sq=256,kQ=new gJ,GY=new U0,MU=null,VU=0,BU=0,_U=!1,kq=new T,pJ=new T;class CU{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,K={}){let{size:U=256,position:W=kq}=K;MU=this._renderer.getRenderTarget(),VU=this._renderer.getActiveCubeFace(),BU=this._renderer.getActiveMipmapLevel(),_U=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(U);let H=this._allocateTargets();if(H.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,H,W),Q>0)this._blur(H,0,0,Q);return this._applyPMREM(H),this._cleanup(H),H}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=qY(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=NY(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(MU,VU,BU),this._renderer.xr.enabled=_U,J.scissorTest=!1,y6(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===z6||J.mapping===CJ)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);MU=this._renderer.getRenderTarget(),VU=this._renderer.getActiveCubeFace(),BU=this._renderer.getActiveMipmapLevel(),_U=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:k7,minFilter:k7,generateMipmaps:!1,type:E7,format:M8,colorSpace:pK,depthBuffer:!1},Z=XY(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=XY(J,Q,$);let{_lodMax:K}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=jq(K)),this._blurMaterial=yq(K,J,Q),this._ggxMaterial=vq(K,J,Q)}return Z}_compileMaterial(J){let Q=new $0(new F9,J);this._renderer.compile(Q,kQ)}_sceneToCubeUV(J,Q,$,Z,K){let H=new e9(90,1,Q,$),Y=[1,-1,1,1,1,1],G=[1,1,1,-1,-1,-1],N=this._renderer,D=N.autoClear,X=N.toneMapping;if(N.getClearColor(GY),N.toneMapping=Q8,N.autoClear=!1,N.state.buffers.depth.getReversed())N.setRenderTarget(Z),N.clearDepth(),N.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new $0(new c0,new l0({name:"PMREM.Background",side:X7,depthWrite:!1,depthTest:!1}));let O=this._backgroundBox,V=O.material,q=!1,E=J.background;if(E){if(E.isColor)V.color.copy(E),J.background=null,q=!0}else V.color.copy(GY),q=!0;for(let L=0;L<6;L++){let A=L%3;if(A===0)H.up.set(0,Y[L],0),H.position.set(K.x,K.y,K.z),H.lookAt(K.x+G[L],K.y,K.z);else if(A===1)H.up.set(0,0,Y[L]),H.position.set(K.x,K.y,K.z),H.lookAt(K.x,K.y+G[L],K.z);else H.up.set(0,Y[L],0),H.position.set(K.x,K.y,K.z),H.lookAt(K.x,K.y,K.z+G[L]);let R=this._cubeSize;if(y6(Z,A*R,L>2?R:0,R,R),N.setRenderTarget(Z),q)N.render(O,H);N.render(J,H)}N.toneMapping=X,N.autoClear=D,J.background=E}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===z6||J.mapping===CJ;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=qY();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=NY();let K=Z?this._cubemapMaterial:this._equirectMaterial,U=this._lodMeshes[0];U.material=K;let W=K.uniforms;W.envMap.value=J;let H=this._cubeSize;y6(Q,0,0,3*H,2*H),$.setRenderTarget(Q),$.render(U,kQ)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let K=1;K<Z;K++)this._applyGGXFilter(J,K-1,K);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,K=this._pingPongRenderTarget,U=this._ggxMaterial,W=this._lodMeshes[$];W.material=U;let H=U.uniforms,Y=$/(this._lodMeshes.length-1),G=Q/(this._lodMeshes.length-1),N=Math.sqrt(Y*Y-G*G),D=Y*1.25,X=N*D,{_lodMax:F}=this,O=this._sizeLods[$],V=3*O*($>F-f6?$-F+f6:0),q=4*(this._cubeSize-O);H.envMap.value=J.texture,H.roughness.value=X,H.mipInt.value=F-Q,y6(K,V,q,3*O,2*O),Z.setRenderTarget(K),Z.render(W,kQ),H.envMap.value=K.texture,H.roughness.value=0,H.mipInt.value=F-$,y6(J,V,q,3*O,2*O),Z.setRenderTarget(J),Z.render(W,kQ)}_blur(J,Q,$,Z){let K=this._pingPongRenderTarget,U=Math.min(Z,Math.PI)/Math.SQRT2;this._blurPass(J,K,Q,$,U),this._blurPass(K,J,$,$,U)}_blurPass(J,Q,$,Z,K){let U=this._renderer,W=this._blurMaterial,H=this._lodMeshes[Z];H.material=W;let Y=W.uniforms;Y.envMap.value=J.texture,Y.sigma.value=K,Y.mipInt.value=this._lodMax-$;let G=this._sizeLods[Z],N=3*G*(Z>this._lodMax-f6?Z-this._lodMax+f6:0),D=4*(this._cubeSize-G);y6(Q,N,D,3*G,2*G),U.setRenderTarget(Q),U.render(H,kQ)}}function jq(J){let Q=[],$=[],Z=J,K=J-f6+1+wq;for(let U=0;U<K;U++){let W=Math.pow(2,Z);Q.push(W);let H=1/(W-2),Y=-H,G=1+H,N=[Y,Y,G,Y,G,G,Y,Y,G,G,Y,G],D=6,X=6,F=3,O=new Float32Array(F*X*D),V=new Float32Array(F*X*D);for(let E=0;E<D;E++){let L=E%3*2/3-1,A=E>2?0:-1,R=[L,A,0,L+0.6666666666666666,A,0,L+0.6666666666666666,A+1,0,L,A,0,L+0.6666666666666666,A+1,0,L,A+1,0];O.set(R,F*X*E);for(let _=0;_<X;_++){let B=N[_*2]*2-1,z=N[_*2+1]*2-1;if(E===0)pJ.set(1,z,B);else if(E===1)pJ.set(-B,1,-z);else if(E===2)pJ.set(-B,z,1);else if(E===3)pJ.set(-1,z,-B);else if(E===4)pJ.set(-B,-1,z);else pJ.set(B,z,-1);pJ.toArray(V,(E*X+_)*F)}}let q=new F9;if(q.setAttribute("position",new Q7(O,F)),q.setAttribute("outputDirection",new Q7(V,F)),$.push(new $0(q,null)),Z>f6)Z--}return{lodMeshes:$,sizeLods:Q}}function XY(J,Q,$){let Z=new W7(J,Q,$);return Z.texture.mapping=OQ,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function y6(J,Q,$,Z,K){J.viewport.set(Q,$,Z,K),J.scissor.set(Q,$,Z,K)}function vq(J,Q,$){return new y9({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Sq,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:GZ(),fragmentShader:`

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
		`,blending:S7,depthTest:!1,depthWrite:!1})}function yq(J,Q,$){return new y9({name:"SphericalGaussianBlur",defines:{SAMPLES:Tq,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:GZ(),fragmentShader:`

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
		`,blending:S7,depthTest:!1,depthWrite:!1})}function NY(){return new y9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:GZ(),fragmentShader:`

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
		`,blending:S7,depthTest:!1,depthWrite:!1})}function qY(){return new y9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:GZ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:S7,depthTest:!1,depthWrite:!1})}function GZ(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class PU extends W7{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new i$(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new c0(5,5,5),K=new y9({name:"CubemapFromEquirect",uniforms:fJ($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:X7,blending:S7});K.uniforms.tEquirect.value=Q;let U=new $0(Z,K),W=Q.minFilter;if(Q.minFilter===zJ)Q.minFilter=k7;return new qU(1,10,this).update(J,U),Q.minFilter=W,U.geometry.dispose(),U.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let K=J.getRenderTarget();for(let U=0;U<6;U++)J.setRenderTarget(this,U),J.clear(Q,$,Z);J.setRenderTarget(K)}}function fq(J){let Q=new WeakMap,$=new WeakMap,Z=null;function K(X,F=!1){if(X===null||X===void 0)return null;if(F)return W(X);return U(X)}function U(X){if(X&&X.isTexture){let F=X.mapping;if(F===j$||F===v$)if(Q.has(X)){let O=Q.get(X).texture;return H(O,X.mapping)}else{let O=X.image;if(O&&O.height>0){let V=new PU(O.height);return V.fromEquirectangularTexture(J,X),Q.set(X,V),X.addEventListener("dispose",G),H(V.texture,X.mapping)}else return null}}return X}function W(X){if(X&&X.isTexture){let F=X.mapping,O=F===j$||F===v$,V=F===z6||F===CJ;if(O||V){let q=$.get(X),E=q!==void 0?q.texture.pmremVersion:0;if(X.isRenderTargetTexture&&X.pmremVersion!==E){if(Z===null)Z=new CU(J);return q=O?Z.fromEquirectangular(X,q):Z.fromCubemap(X,q),q.texture.pmremVersion=X.pmremVersion,$.set(X,q),q.texture}else if(q!==void 0)return q.texture;else{let L=X.image;if(O&&L&&L.height>0||V&&L&&Y(L)){if(Z===null)Z=new CU(J);return q=O?Z.fromEquirectangular(X):Z.fromCubemap(X),q.texture.pmremVersion=X.pmremVersion,$.set(X,q),X.addEventListener("dispose",N),q.texture}else return null}}}return X}function H(X,F){if(F===j$)X.mapping=z6;else if(F===v$)X.mapping=CJ;return X}function Y(X){let F=0,O=6;for(let V=0;V<O;V++)if(X[V]!==void 0)F++;return F===O}function G(X){let F=X.target;F.removeEventListener("dispose",G);let O=Q.get(F);if(O!==void 0)Q.delete(F),O.dispose()}function N(X){let F=X.target;F.removeEventListener("dispose",N);let O=$.get(F);if(O!==void 0)$.delete(F),O.dispose()}function D(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:K,dispose:D}}function bq(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let K=J.getExtension(Z);return Q[Z]=K,K}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let K=$(Z);if(K===null)IJ("WebGLRenderer: "+Z+" extension not supported.");return K}}}function hq(J,Q,$,Z){let K={},U=new WeakMap;function W(D){let X=D.target;if(X.index!==null)Q.remove(X.index);for(let O in X.attributes)Q.remove(X.attributes[O]);X.removeEventListener("dispose",W),delete K[X.id];let F=U.get(X);if(F)Q.remove(F),U.delete(X);if(Z.releaseStatesOfGeometry(X),X.isInstancedBufferGeometry===!0)delete X._maxInstanceCount;$.memory.geometries--}function H(D,X){if(K[X.id]===!0)return X;return X.addEventListener("dispose",W),K[X.id]=!0,$.memory.geometries++,X}function Y(D){let X=D.attributes;for(let F in X)Q.update(X[F],J.ARRAY_BUFFER)}function G(D){let X=[],F=D.index,O=D.attributes.position,V=0;if(O===void 0)return;if(F!==null){let L=F.array;V=F.version;for(let A=0,R=L.length;A<R;A+=3){let _=L[A+0],B=L[A+1],z=L[A+2];X.push(_,B,B,z,z,_)}}else{let L=O.array;V=O.version;for(let A=0,R=L.length/3-1;A<R;A+=3){let _=A+0,B=A+1,z=A+2;X.push(_,B,B,z,z,_)}}let q=new(O.count>=65535?s$:n$)(X,1);q.version=V;let E=U.get(D);if(E)Q.remove(E);U.set(D,q)}function N(D){let X=U.get(D);if(X){let F=D.index;if(F!==null){if(X.version<F.version)G(D)}}else G(D);return U.get(D)}return{get:H,update:Y,getWireframeAttribute:N}}function xq(J,Q,$){let Z;function K(D){Z=D}let U,W;function H(D){U=D.type,W=D.bytesPerElement}function Y(D,X){J.drawElements(Z,X,U,D*W),$.update(X,Z,1)}function G(D,X,F){if(F===0)return;J.drawElementsInstanced(Z,X,U,D*W,F),$.update(X,Z,F)}function N(D,X,F){if(F===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,X,0,U,D,0,F);let V=0;for(let q=0;q<F;q++)V+=X[q];$.update(V,Z,1)}this.setMode=K,this.setIndex=H,this.render=Y,this.renderInstances=G,this.renderMultiDraw=N}function gq(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(U,W,H){switch($.calls++,W){case J.TRIANGLES:$.triangles+=H*(U/3);break;case J.LINES:$.lines+=H*(U/2);break;case J.LINE_STRIP:$.lines+=H*(U-1);break;case J.LINE_LOOP:$.lines+=H*U;break;case J.POINTS:$.points+=H*U;break;default:e0("WebGLInfo: Unknown draw mode:",W);break}}function K(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:K,update:Z}}function pq(J,Q,$){let Z=new WeakMap,K=new a9;function U(W,H,Y){let G=W.morphTargetInfluences,N=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,D=N!==void 0?N.length:0,X=Z.get(H);if(X===void 0||X.count!==D){let I=function(){z.dispose(),Z.delete(H),H.removeEventListener("dispose",I)};if(X!==void 0)X.texture.dispose();let F=H.morphAttributes.position!==void 0,O=H.morphAttributes.normal!==void 0,V=H.morphAttributes.color!==void 0,q=H.morphAttributes.position||[],E=H.morphAttributes.normal||[],L=H.morphAttributes.color||[],A=0;if(F===!0)A=1;if(O===!0)A=2;if(V===!0)A=3;let R=H.attributes.position.count*A,_=1;if(R>Q.maxTextureSize)_=Math.ceil(R/Q.maxTextureSize),R=Q.maxTextureSize;let B=new Float32Array(R*_*4*D),z=new l$(B,R,_,D);z.type=h8,z.needsUpdate=!0;let M=A*4;for(let f=0;f<D;f++){let S=q[f],h=E[f],a=L[f],k=R*_*4*f;for(let m=0;m<S.count;m++){let e=m*M;if(F===!0)K.fromBufferAttribute(S,m),B[k+e+0]=K.x,B[k+e+1]=K.y,B[k+e+2]=K.z,B[k+e+3]=0;if(O===!0)K.fromBufferAttribute(h,m),B[k+e+4]=K.x,B[k+e+5]=K.y,B[k+e+6]=K.z,B[k+e+7]=0;if(V===!0)K.fromBufferAttribute(a,m),B[k+e+8]=K.x,B[k+e+9]=K.y,B[k+e+10]=K.z,B[k+e+11]=a.itemSize===4?K.w:1}}X={count:D,texture:z,size:new Z0(R,_)},Z.set(H,X),H.addEventListener("dispose",I)}if(W.isInstancedMesh===!0&&W.morphTexture!==null)Y.getUniforms().setValue(J,"morphTexture",W.morphTexture,$);else{let F=0;for(let V=0;V<G.length;V++)F+=G[V];let O=H.morphTargetsRelative?1:1-F;Y.getUniforms().setValue(J,"morphTargetBaseInfluence",O),Y.getUniforms().setValue(J,"morphTargetInfluences",G)}Y.getUniforms().setValue(J,"morphTargetsTexture",X.texture,$),Y.getUniforms().setValue(J,"morphTargetsTextureSize",X.size)}return{update:U}}function mq(J,Q,$,Z,K){let U=new WeakMap;function W(G){let N=K.render.frame,D=G.geometry,X=Q.get(G,D);if(U.get(X)!==N)Q.update(X),U.set(X,N);if(G.isInstancedMesh){if(G.hasEventListener("dispose",Y)===!1)G.addEventListener("dispose",Y);if(U.get(G)!==N){if($.update(G.instanceMatrix,J.ARRAY_BUFFER),G.instanceColor!==null)$.update(G.instanceColor,J.ARRAY_BUFFER);U.set(G,N)}}if(G.isSkinnedMesh){let F=G.skeleton;if(U.get(F)!==N)F.update(),U.set(F,N)}return X}function H(){U=new WeakMap}function Y(G){let N=G.target;if(N.removeEventListener("dispose",Y),Z.releaseStatesOfObject(N),$.remove(N.instanceMatrix),N.instanceColor!==null)$.remove(N.instanceColor)}return{update:W,dispose:H}}var dq={[NQ]:"LINEAR_TONE_MAPPING",[qQ]:"REINHARD_TONE_MAPPING",[FQ]:"CINEON_TONE_MAPPING",[b8]:"ACES_FILMIC_TONE_MAPPING",[EQ]:"AGX_TONE_MAPPING",[RQ]:"NEUTRAL_TONE_MAPPING",[DQ]:"CUSTOM_TONE_MAPPING"};function uq(J,Q,$,Z,K,U){let W=new W7(Q,$,{type:J,depthBuffer:K,stencilBuffer:U,samples:Z?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),H=null,Y=null,G=new F9;G.setAttribute("position",new J9([-1,3,0,-1,-1,0,3,-1,0],3)),G.setAttribute("uv",new J9([0,2,0,0,2,0],2));let N=new wQ({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),D=new $0(G,N),X=new gJ(-1,1,1,-1,0,1),F=null,O=null,V=!1,q,E=null,L=[],A=!1;this.setSize=function(R,_){if(W.setSize(R,_),H!==null)H.setSize(R,_);if(Y!==null)Y.setSize(R,_);for(let B=0;B<L.length;B++){let z=L[B];if(z.setSize)z.setSize(R,_)}},this.setEffects=function(R){L=R,A=L.length>0&&L[0].isRenderPass===!0;let{width:_,height:B}=W;if(L.length>0&&H===null)H=new W7(_,B,{type:E7,depthBuffer:!1,stencilBuffer:!1}),Y=new W7(_,B,{type:E7,depthBuffer:!1,stencilBuffer:!1});for(let z=0;z<L.length;z++){let M=L[z];if(M.setSize)M.setSize(_,B)}},this.begin=function(R,_){if(V)return!1;if(R.toneMapping===Q8&&L.length===0)return!1;if(E=_,_!==null){let{width:B,height:z}=_;if(W.width!==B||W.height!==z)this.setSize(B,z)}if(A===!1)R.setRenderTarget(W);return q=R.toneMapping,R.toneMapping=Q8,!0},this.hasRenderPass=function(){return A},this.end=function(R,_){R.toneMapping=q,V=!0;let B=W,z=H;for(let M=0;M<L.length;M++){let I=L[M];if(I.enabled===!1)continue;if(I.render(R,z,B,_),I.needsSwap!==!1)B=z,z=z===H?Y:H}if(F!==R.outputColorSpace||O!==R.toneMapping){if(F=R.outputColorSpace,O=R.toneMapping,N.defines={},q9.getTransfer(F)===g9)N.defines.SRGB_TRANSFER="";let M=dq[O];if(M)N.defines[M]="";N.needsUpdate=!0}N.uniforms.tDiffuse.value=B.texture,R.setRenderTarget(E),R.render(D,X),E=null,V=!1},this.isCompositing=function(){return V},this.dispose=function(){if(W.dispose(),H!==null)H.dispose();if(Y!==null)Y.dispose();G.dispose(),N.dispose()}}var jY=new V7,zU=new jJ(1,1),vY=new l$,yY=new nK,fY=new i$,FY=[],DY=[],EY=new Float32Array(16),RY=new Float32Array(9),OY=new Float32Array(4);function b6(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let K=Q*$,U=FY[K];if(U===void 0)U=new Float32Array(K),FY[K]=U;if(Q!==0){Z.toArray(U,0);for(let W=1,H=0;W!==Q;++W)H+=$,J[W].toArray(U,H)}return U}function q7(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function F7(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function XZ(J,Q){let $=DY[Q];if($===void 0)$=new Int32Array(Q),DY[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function lq(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function cq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q7($,Q))return;J.uniform2fv(this.addr,Q),F7($,Q)}}function nq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(q7($,Q))return;J.uniform3fv(this.addr,Q),F7($,Q)}}function sq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q7($,Q))return;J.uniform4fv(this.addr,Q),F7($,Q)}}function iq(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(q7($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),F7($,Q)}else{if(q7($,Z))return;OY.set(Z),J.uniformMatrix2fv(this.addr,!1,OY),F7($,Z)}}function oq(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(q7($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),F7($,Q)}else{if(q7($,Z))return;RY.set(Z),J.uniformMatrix3fv(this.addr,!1,RY),F7($,Z)}}function aq(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(q7($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),F7($,Q)}else{if(q7($,Z))return;EY.set(Z),J.uniformMatrix4fv(this.addr,!1,EY),F7($,Z)}}function rq(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function tq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q7($,Q))return;J.uniform2iv(this.addr,Q),F7($,Q)}}function eq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q7($,Q))return;J.uniform3iv(this.addr,Q),F7($,Q)}}function JF(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q7($,Q))return;J.uniform4iv(this.addr,Q),F7($,Q)}}function QF(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function $F(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q7($,Q))return;J.uniform2uiv(this.addr,Q),F7($,Q)}}function ZF(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q7($,Q))return;J.uniform3uiv(this.addr,Q),F7($,Q)}}function KF(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q7($,Q))return;J.uniform4uiv(this.addr,Q),F7($,Q)}}function UF(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;let U;if(this.type===J.SAMPLER_2D_SHADOW)zU.compareFunction=$.isReversedDepthBuffer()?u$:d$,U=zU;else U=jY;$.setTexture2D(Q||U,K)}function WF(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTexture3D(Q||yY,K)}function HF(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTextureCube(Q||fY,K)}function YF(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTexture2DArray(Q||vY,K)}function GF(J){switch(J){case 5126:return lq;case 35664:return cq;case 35665:return nq;case 35666:return sq;case 35674:return iq;case 35675:return oq;case 35676:return aq;case 5124:case 35670:return rq;case 35667:case 35671:return tq;case 35668:case 35672:return eq;case 35669:case 35673:return JF;case 5125:return QF;case 36294:return $F;case 36295:return ZF;case 36296:return KF;case 35678:case 36198:case 36298:case 36306:case 35682:return UF;case 35679:case 36299:case 36307:return WF;case 35680:case 36300:case 36308:case 36293:return HF;case 36289:case 36303:case 36311:case 36292:return YF}}function XF(J,Q){J.uniform1fv(this.addr,Q)}function NF(J,Q){let $=b6(Q,this.size,2);J.uniform2fv(this.addr,$)}function qF(J,Q){let $=b6(Q,this.size,3);J.uniform3fv(this.addr,$)}function FF(J,Q){let $=b6(Q,this.size,4);J.uniform4fv(this.addr,$)}function DF(J,Q){let $=b6(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function EF(J,Q){let $=b6(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function RF(J,Q){let $=b6(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function OF(J,Q){J.uniform1iv(this.addr,Q)}function MF(J,Q){J.uniform2iv(this.addr,Q)}function VF(J,Q){J.uniform3iv(this.addr,Q)}function BF(J,Q){J.uniform4iv(this.addr,Q)}function _F(J,Q){J.uniform1uiv(this.addr,Q)}function IF(J,Q){J.uniform2uiv(this.addr,Q)}function LF(J,Q){J.uniform3uiv(this.addr,Q)}function CF(J,Q){J.uniform4uiv(this.addr,Q)}function zF(J,Q,$){let Z=this.cache,K=Q.length,U=XZ($,K);if(!q7(Z,U))J.uniform1iv(this.addr,U),F7(Z,U);let W;if(this.type===J.SAMPLER_2D_SHADOW)W=zU;else W=jY;for(let H=0;H!==K;++H)$.setTexture2D(Q[H]||W,U[H])}function AF(J,Q,$){let Z=this.cache,K=Q.length,U=XZ($,K);if(!q7(Z,U))J.uniform1iv(this.addr,U),F7(Z,U);for(let W=0;W!==K;++W)$.setTexture3D(Q[W]||yY,U[W])}function PF(J,Q,$){let Z=this.cache,K=Q.length,U=XZ($,K);if(!q7(Z,U))J.uniform1iv(this.addr,U),F7(Z,U);for(let W=0;W!==K;++W)$.setTextureCube(Q[W]||fY,U[W])}function wF(J,Q,$){let Z=this.cache,K=Q.length,U=XZ($,K);if(!q7(Z,U))J.uniform1iv(this.addr,U),F7(Z,U);for(let W=0;W!==K;++W)$.setTexture2DArray(Q[W]||vY,U[W])}function TF(J){switch(J){case 5126:return XF;case 35664:return NF;case 35665:return qF;case 35666:return FF;case 35674:return DF;case 35675:return EF;case 35676:return RF;case 5124:case 35670:return OF;case 35667:case 35671:return MF;case 35668:case 35672:return VF;case 35669:case 35673:return BF;case 5125:return _F;case 36294:return IF;case 36295:return LF;case 36296:return CF;case 35678:case 36198:case 36298:case 36306:case 35682:return zF;case 35679:case 36299:case 36307:return AF;case 35680:case 36300:case 36308:case 36293:return PF;case 36289:case 36303:case 36311:case 36292:return wF}}class bY{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=GF(Q.type)}}class hY{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=TF(Q.type)}}class xY{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let K=0,U=Z.length;K!==U;++K){let W=Z[K];W.setValue(J,Q[W.id],$)}}}var IU=/(\w+)(\])?(\[|\.)?/g;function MY(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function SF(J,Q,$){let Z=J.name,K=Z.length;IU.lastIndex=0;while(!0){let U=IU.exec(Z),W=IU.lastIndex,H=U[1],Y=U[2]==="]",G=U[3];if(Y)H=H|0;if(G===void 0||G==="["&&W+2===K){MY($,G===void 0?new bY(H,J,Q):new hY(H,J,Q));break}else{let D=$.map[H];if(D===void 0)D=new xY(H),MY($,D);$=D}}}class yQ{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let U=0;U<$;++U){let W=J.getActiveUniform(Q,U),H=J.getUniformLocation(Q,W.name);SF(W,H,this)}let Z=[],K=[];for(let U of this.seq)if(U.type===J.SAMPLER_2D_SHADOW||U.type===J.SAMPLER_CUBE_SHADOW||U.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(U);else K.push(U);if(Z.length>0)this.seq=Z.concat(K)}setValue(J,Q,$,Z){let K=this.map[Q];if(K!==void 0)K.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let K=0,U=Q.length;K!==U;++K){let W=Q[K],H=$[W.id];if(H.needsUpdate!==!1)W.setValue(J,H.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,K=J.length;Z!==K;++Z){let U=J[Z];if(U.id in Q)$.push(U)}return $}}function VY(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var kF=37297,jF=0;function vF(J,Q){let $=J.split(`
`),Z=[],K=Math.max(Q-6,0),U=Math.min(Q+6,$.length);for(let W=K;W<U;W++){let H=W+1;Z.push(`${H===Q?">":" "} ${H}: ${$[W]}`)}return Z.join(`
`)}var BY=new $9;function yF(J){q9._getMatrix(BY,q9.workingColorSpace,J);let Q=`mat3( ${BY.elements.map(($)=>$.toFixed(4))} )`;switch(q9.getTransfer(J)){case mK:return[Q,"LinearTransferOETF"];case g9:return[Q,"sRGBTransferOETF"];default:return o0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function _Y(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),U=(J.getShaderInfoLog(Q)||"").trim();if(Z&&U==="")return"";let W=/ERROR: 0:(\d+)/.exec(U);if(W){let H=parseInt(W[1]);return $.toUpperCase()+`

`+U+`

`+vF(J.getShaderSource(Q),H)}else return U}function fF(J,Q){let $=yF(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var bF={[NQ]:"Linear",[qQ]:"Reinhard",[FQ]:"Cineon",[b8]:"ACESFilmic",[EQ]:"AgX",[RQ]:"Neutral",[DQ]:"Custom"};function hF(J,Q){let $=bF[Q];if($===void 0)return o0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var YZ=new T;function xF(){q9.getLuminanceCoefficients(YZ);let J=YZ.x.toFixed(4),Q=YZ.y.toFixed(4),$=YZ.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function gF(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vQ).join(`
`)}function pF(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function mF(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let K=0;K<Z;K++){let U=J.getActiveAttrib(Q,K),W=U.name,H=1;if(U.type===J.FLOAT_MAT2)H=2;if(U.type===J.FLOAT_MAT3)H=3;if(U.type===J.FLOAT_MAT4)H=4;$[W]={type:U.type,location:J.getAttribLocation(Q,W),locationSize:H}}return $}function vQ(J){return J!==""}function IY(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_SUN_LIGHTS/g,Q.numSunLights).replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,Q.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function LY(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var dF=/^[ \t]*#include +<([\w\d./]+)>/gm;function AU(J){return J.replace(dF,lF)}var uF=new Map;function lF(J,Q){let $=X9[Q];if($===void 0){let Z=uF.get(Q);if(Z!==void 0)$=X9[Z],o0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return AU($)}var cF=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function CY(J){return J.replace(cF,nF)}function nF(J,Q,$,Z){let K="";for(let U=parseInt(Q);U<parseInt($);U++)K+=Z.replace(/\[\s*i\s*\]/g,"[ "+U+" ]").replace(/UNROLLED_LOOP_INDEX/g,U);return K}function zY(J){let Q=`precision ${J.precision} float;
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
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}var sF={[GQ]:"SHADOWMAP_TYPE_PCF",[I6]:"SHADOWMAP_TYPE_VSM"};function iF(J){return sF[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var oF={[z6]:"ENVMAP_TYPE_CUBE",[CJ]:"ENVMAP_TYPE_CUBE",[OQ]:"ENVMAP_TYPE_CUBE_UV"};function aF(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return oF[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var rF={[CJ]:"ENVMAP_MODE_REFRACTION"};function tF(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return rF[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var eF={[PH]:"ENVMAP_BLENDING_MULTIPLY",[wH]:"ENVMAP_BLENDING_MIX",[TH]:"ENVMAP_BLENDING_ADD"};function JD(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return eF[J.combine]||"ENVMAP_BLENDING_NONE"}function QD(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function $D(J,Q,$,Z){let K=J.getContext(),U=$.defines,W=$.vertexShader,H=$.fragmentShader,Y=iF($),G=aF($),N=tF($),D=JD($),X=QD($),F=gF($),O=pF(U),V=K.createProgram(),q,E,L=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(q=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O].filter(vQ).join(`
`),q.length>0)q+=`
`;if(E=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O].filter(vQ).join(`
`),E.length>0)E+=`
`}else q=[zY($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+N:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+Y:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(vQ).join(`
`),E=[zY($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+G:"",$.envMap?"#define "+N:"",$.envMap?"#define "+D:"",X?"#define CUBEUV_TEXEL_WIDTH "+X.texelWidth:"",X?"#define CUBEUV_TEXEL_HEIGHT "+X.texelHeight:"",X?"#define CUBEUV_MAX_MIP "+X.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.retroreflection?"#define USE_RETROREFLECTION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+Y:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==Q8?"#define TONE_MAPPING":"",$.toneMapping!==Q8?X9.tonemapping_pars_fragment:"",$.toneMapping!==Q8?hF("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",X9.colorspace_pars_fragment,fF("linearToOutputTexel",$.outputColorSpace),xF(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(vQ).join(`
`);if(W=AU(W),W=IY(W,$),W=LY(W,$),H=AU(H),H=IY(H,$),H=LY(H,$),W=CY(W),H=CY(H),$.isRawShaderMaterial!==!0)L=`#version 300 es
`,q=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+q,E=["#define varying in",$.glslVersion===dK?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===dK?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E;let A=L+q+W,R=L+E+H,_=VY(K,K.VERTEX_SHADER,A),B=VY(K,K.FRAGMENT_SHADER,R);if(K.attachShader(V,_),K.attachShader(V,B),$.index0AttributeName!==void 0)K.bindAttribLocation(V,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)K.bindAttribLocation(V,0,"position");K.linkProgram(V);function z(S){if(J.debug.checkShaderErrors){let h=K.getProgramInfoLog(V)||"",a=K.getShaderInfoLog(_)||"",k=K.getShaderInfoLog(B)||"",m=h.trim(),e=a.trim(),l=k.trim(),i=!0,p=!0;if(K.getProgramParameter(V,K.LINK_STATUS)===!1)if(i=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,V,_,B);else{let o=_Y(K,_,"vertex"),H0=_Y(K,B,"fragment");e0("WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(V,K.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+m+`
`+o+`
`+H0)}else if(m!=="")o0("WebGLProgram: Program Info Log:",m);else if(e===""||l==="")p=!1;if(p)S.diagnostics={runnable:i,programLog:m,vertexShader:{log:e,prefix:q},fragmentShader:{log:l,prefix:E}}}K.deleteShader(_),K.deleteShader(B),M=new yQ(K,V),I=mF(K,V)}let M;this.getUniforms=function(){if(M===void 0)z(this);return M};let I;this.getAttributes=function(){if(I===void 0)z(this);return I};let f=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(f===!1)f=K.getProgramParameter(V,kF);return f},this.destroy=function(){Z.releaseStatesOfProgram(this),K.deleteProgram(V),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=jF++,this.cacheKey=Q,this.usedTimes=1,this.program=V,this.vertexShader=_,this.fragmentShader=B,this}var ZD=0;class gY{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let Z=this._getShaderCacheForMaterial(J);if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;if(Z.has($)===!1)Z.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new pY(J),Q.set(J,$);return $}}class pY{constructor(J){this.id=ZD++,this.code=J,this.usedTimes=0}}function KD(J){return J===wJ||J===p$||J===m$}function UD(J,Q,$,Z,K,U){let W=new c$,H=new gY,Y=new Set,G=[],N=new Map,D=Z.logarithmicDepthBuffer,X=Z.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function O(M){if(Y.add(M),M===0)return"uv";return`uv${M}`}function V(M,I,f,S,h,a){let k=S.fog,m=h.geometry,e=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?S.environment:null,l=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,i=Q.get(M.envMap||e,l),p=!!i&&i.mapping===OQ?i.image.height:null,o=F[M.type];if(M.precision!==null){if(X=Z.getMaxPrecision(M.precision),X!==M.precision)o0("WebGLProgram.getParameters:",M.precision,"not supported, using",X,"instead.")}let H0=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,S0=H0!==void 0?H0.length:0,x0=0;if(m.morphAttributes.position!==void 0)x0=1;if(m.morphAttributes.normal!==void 0)x0=2;if(m.morphAttributes.color!==void 0)x0=3;let t,h0,n,W0;if(o){let s9=I8[o];t=s9.vertexShader,h0=s9.fragmentShader}else{t=M.vertexShader,h0=M.fragmentShader;let s9=H.getVertexShaderStage(M),j9=H.getFragmentShaderStage(M);H.update(M,s9,j9),n=s9.id,W0=j9.id}let F0=J.getRenderTarget(),g0=J.state.buffers.depth.getReversed(),r0=h.isInstancedMesh===!0,y0=h.isBatchedMesh===!0,b9=!!M.map,K0=!!M.matcap,q0=!!i,D0=!!M.aoMap,E0=!!M.lightMap,P0=!!M.bumpMap&&M.wireframe===!1,d0=!!M.normalMap,n0=!!M.displacementMap,Z9=!!M.emissiveMap,K9=!!M.metalnessMap,y=!!M.roughnessMap,m9=M.anisotropy>0,N9=M.clearcoat>0,R9=M.dispersion>0,w=M.retroreflectivity>0,C=M.iridescence>0,b=M.sheen>0,c=M.transmission>0,Y0=m9&&!!M.anisotropyMap,R0=N9&&!!M.clearcoatMap,V0=N9&&!!M.clearcoatNormalMap,r=N9&&!!M.clearcoatRoughnessMap,Q0=C&&!!M.iridescenceMap,T0=C&&!!M.iridescenceThicknessMap,u0=b&&!!M.sheenColorMap,L0=b&&!!M.sheenRoughnessMap,O0=!!M.specularMap,s0=!!M.specularColorMap,t0=!!M.specularIntensityMap,w9=c&&!!M.transmissionMap,g=c&&!!M.thicknessMap,B0=!!M.gradientMap,J0=!!M.alphaMap,I0=M.alphaTest>0,k0=!!M.alphaHash,G0=!!M.extensions,z0=Q8;if(M.toneMapped){if(F0===null||F0.isXRRenderTarget===!0)z0=J.toneMapping}let U9={shaderID:o,shaderType:M.type,shaderName:M.name,vertexShader:t,fragmentShader:h0,defines:M.defines,customVertexShaderID:n,customFragmentShaderID:W0,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:X,batching:y0,batchingColor:y0&&h._colorsTexture!==null,instancing:r0,instancingColor:r0&&h.instanceColor!==null,instancingMorph:r0&&h.morphTexture!==null,outputColorSpace:F0===null?J.outputColorSpace:F0.isXRRenderTarget===!0?F0.texture.colorSpace:q9.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:b9,matcap:K0,envMap:q0,envMapMode:q0&&i.mapping,envMapCubeUVHeight:p,aoMap:D0,lightMap:E0,bumpMap:P0,normalMap:d0,displacementMap:n0,emissiveMap:Z9,normalMapObjectSpace:d0&&M.normalMapType===gH,normalMapTangentSpace:d0&&M.normalMapType===gK,packedNormalMap:d0&&M.normalMapType===gK&&KD(M.normalMap.format),metalnessMap:K9,roughnessMap:y,anisotropy:m9,anisotropyMap:Y0,clearcoat:N9,clearcoatMap:R0,clearcoatNormalMap:V0,clearcoatRoughnessMap:r,dispersion:R9,retroreflection:w,iridescence:C,iridescenceMap:Q0,iridescenceThicknessMap:T0,sheen:b,sheenColorMap:u0,sheenRoughnessMap:L0,specularMap:O0,specularColorMap:s0,specularIntensityMap:t0,transmission:c,transmissionMap:w9,thicknessMap:g,gradientMap:B0,opaque:M.transparent===!1&&M.blending===XQ&&M.alphaToCoverage===!1,alphaMap:J0,alphaTest:I0,alphaHash:k0,combine:M.combine,mapUv:b9&&O(M.map.channel),aoMapUv:D0&&O(M.aoMap.channel),lightMapUv:E0&&O(M.lightMap.channel),bumpMapUv:P0&&O(M.bumpMap.channel),normalMapUv:d0&&O(M.normalMap.channel),displacementMapUv:n0&&O(M.displacementMap.channel),emissiveMapUv:Z9&&O(M.emissiveMap.channel),metalnessMapUv:K9&&O(M.metalnessMap.channel),roughnessMapUv:y&&O(M.roughnessMap.channel),anisotropyMapUv:Y0&&O(M.anisotropyMap.channel),clearcoatMapUv:R0&&O(M.clearcoatMap.channel),clearcoatNormalMapUv:V0&&O(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:r&&O(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Q0&&O(M.iridescenceMap.channel),iridescenceThicknessMapUv:T0&&O(M.iridescenceThicknessMap.channel),sheenColorMapUv:u0&&O(M.sheenColorMap.channel),sheenRoughnessMapUv:L0&&O(M.sheenRoughnessMap.channel),specularMapUv:O0&&O(M.specularMap.channel),specularColorMapUv:s0&&O(M.specularColorMap.channel),specularIntensityMapUv:t0&&O(M.specularIntensityMap.channel),transmissionMapUv:w9&&O(M.transmissionMap.channel),thicknessMapUv:g&&O(M.thicknessMap.channel),alphaMapUv:J0&&O(M.alphaMap.channel),vertexTangents:!!m.attributes.tangent&&(d0||m9),vertexNormals:!!m.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!m.attributes.color&&m.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!m.attributes.uv&&(b9||J0),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||m.attributes.normal===void 0&&d0===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:D,reversedDepthBuffer:g0,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:m.attributes.position!==void 0,morphTargets:m.morphAttributes.position!==void 0,morphNormals:m.morphAttributes.normal!==void 0,morphColors:m.morphAttributes.color!==void 0,morphTargetsCount:S0,morphTextureStride:x0,numSunLights:I.sun.length,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numSunLightShadows:I.sunShadowMap.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:a.length,numClippingPlanes:U.numPlanes,numClipIntersection:U.numIntersection,dithering:M.dithering,shadowMapEnabled:J.shadowMap.enabled&&f.length>0,shadowMapType:J.shadowMap.type,toneMapping:z0,decodeVideoTexture:b9&&M.map.isVideoTexture===!0&&q9.getTransfer(M.map.colorSpace)===g9,decodeVideoTextureEmissive:Z9&&M.emissiveMap.isVideoTexture===!0&&q9.getTransfer(M.emissiveMap.colorSpace)===g9,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===r9,flipSided:M.side===X7,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:G0&&M.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(G0&&M.extensions.multiDraw===!0||y0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return U9.vertexUv1s=Y.has(1),U9.vertexUv2s=Y.has(2),U9.vertexUv3s=Y.has(3),Y.clear(),U9}function q(M){let I=[];if(M.shaderID)I.push(M.shaderID);else I.push(M.customVertexShaderID),I.push(M.customFragmentShaderID);if(M.defines!==void 0)for(let f in M.defines)I.push(f),I.push(M.defines[f]);if(M.isRawShaderMaterial===!1)E(I,M),L(I,M),I.push(J.outputColorSpace);return I.push(M.customProgramCacheKey),I.join()}function E(M,I){M.push(I.precision),M.push(I.outputColorSpace),M.push(I.envMapMode),M.push(I.envMapCubeUVHeight),M.push(I.mapUv),M.push(I.alphaMapUv),M.push(I.lightMapUv),M.push(I.aoMapUv),M.push(I.bumpMapUv),M.push(I.normalMapUv),M.push(I.displacementMapUv),M.push(I.emissiveMapUv),M.push(I.metalnessMapUv),M.push(I.roughnessMapUv),M.push(I.anisotropyMapUv),M.push(I.clearcoatMapUv),M.push(I.clearcoatNormalMapUv),M.push(I.clearcoatRoughnessMapUv),M.push(I.iridescenceMapUv),M.push(I.iridescenceThicknessMapUv),M.push(I.sheenColorMapUv),M.push(I.sheenRoughnessMapUv),M.push(I.specularMapUv),M.push(I.specularColorMapUv),M.push(I.specularIntensityMapUv),M.push(I.transmissionMapUv),M.push(I.thicknessMapUv),M.push(I.combine),M.push(I.fogExp2),M.push(I.sizeAttenuation),M.push(I.morphTargetsCount),M.push(I.morphAttributeCount),M.push(I.numSunLights),M.push(I.numDirLights),M.push(I.numPointLights),M.push(I.numSpotLights),M.push(I.numSpotLightMaps),M.push(I.numHemiLights),M.push(I.numRectAreaLights),M.push(I.numSunLightShadows),M.push(I.numDirLightShadows),M.push(I.numPointLightShadows),M.push(I.numSpotLightShadows),M.push(I.numSpotLightShadowsWithMaps),M.push(I.numLightProbes),M.push(I.shadowMapType),M.push(I.toneMapping),M.push(I.numClippingPlanes),M.push(I.numClipIntersection),M.push(I.depthPacking)}function L(M,I){if(W.disableAll(),I.instancing)W.enable(0);if(I.instancingColor)W.enable(1);if(I.instancingMorph)W.enable(2);if(I.matcap)W.enable(3);if(I.envMap)W.enable(4);if(I.normalMapObjectSpace)W.enable(5);if(I.normalMapTangentSpace)W.enable(6);if(I.clearcoat)W.enable(7);if(I.iridescence)W.enable(8);if(I.alphaTest)W.enable(9);if(I.vertexColors)W.enable(10);if(I.vertexAlphas)W.enable(11);if(I.vertexUv1s)W.enable(12);if(I.vertexUv2s)W.enable(13);if(I.vertexUv3s)W.enable(14);if(I.vertexTangents)W.enable(15);if(I.anisotropy)W.enable(16);if(I.alphaHash)W.enable(17);if(I.batching)W.enable(18);if(I.dispersion)W.enable(19);if(I.retroreflection)W.enable(24);if(I.batchingColor)W.enable(20);if(I.gradientMap)W.enable(21);if(I.packedNormalMap)W.enable(22);if(I.vertexNormals)W.enable(23);if(M.push(W.mask),W.disableAll(),I.fog)W.enable(0);if(I.useFog)W.enable(1);if(I.flatShading)W.enable(2);if(I.logarithmicDepthBuffer)W.enable(3);if(I.reversedDepthBuffer)W.enable(4);if(I.skinning)W.enable(5);if(I.morphTargets)W.enable(6);if(I.morphNormals)W.enable(7);if(I.morphColors)W.enable(8);if(I.premultipliedAlpha)W.enable(9);if(I.shadowMapEnabled)W.enable(10);if(I.doubleSided)W.enable(11);if(I.flipSided)W.enable(12);if(I.useDepthPacking)W.enable(13);if(I.dithering)W.enable(14);if(I.transmission)W.enable(15);if(I.sheen)W.enable(16);if(I.opaque)W.enable(17);if(I.pointsUvs)W.enable(18);if(I.decodeVideoTexture)W.enable(19);if(I.decodeVideoTextureEmissive)W.enable(20);if(I.alphaToCoverage)W.enable(21);if(I.numLightProbeGrids>0)W.enable(22);if(I.hasPositionAttribute)W.enable(23);M.push(W.mask)}function A(M){let I=F[M.type],f;if(I){let S=I8[I];f=Y8.clone(S.uniforms)}else f=M.uniforms;return f}function R(M,I){let f=N.get(I);if(f!==void 0)++f.usedTimes;else f=new $D(J,I,M,K),G.push(f),N.set(I,f);return f}function _(M){if(--M.usedTimes===0){let I=G.indexOf(M);G[I]=G[G.length-1],G.pop(),N.delete(M.cacheKey),M.destroy()}}function B(M){H.remove(M)}function z(){H.dispose()}return{getParameters:V,getProgramCacheKey:q,getUniforms:A,acquireProgram:R,releaseProgram:_,releaseShaderCache:B,programs:G,dispose:z}}function WD(){let J=new WeakMap;function Q(W){return J.has(W)}function $(W){let H=J.get(W);if(H===void 0)H={},J.set(W,H);return H}function Z(W){J.delete(W)}function K(W,H,Y){J.get(W)[H]=Y}function U(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:K,dispose:U}}function HD(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function AY(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function PY(){let J=[],Q=0,$=[],Z=[],K=[];function U(){Q=0,$.length=0,Z.length=0,K.length=0}function W(X){let F=0;if(X.isInstancedMesh)F+=2;if(X.isSkinnedMesh)F+=1;return F}function H(X,F,O,V,q,E){let L=J[Q];if(L===void 0)L={id:X.id,object:X,geometry:F,material:O,materialVariant:W(X),groupOrder:V,renderOrder:X.renderOrder,z:q,group:E},J[Q]=L;else L.id=X.id,L.object=X,L.geometry=F,L.material=O,L.materialVariant=W(X),L.groupOrder=V,L.renderOrder=X.renderOrder,L.z=q,L.group=E;return Q++,L}function Y(X,F,O,V,q,E,L){if(L.reversedDepth===!0)q=-q;let A=H(X,F,O,V,q,E);if(O.transmission>0)Z.push(A);else if(O.transparent===!0)K.push(A);else $.push(A)}function G(X,F,O,V,q,E){let L=H(X,F,O,V,q,E);if(O.transmission>0)Z.unshift(L);else if(O.transparent===!0)K.unshift(L);else $.unshift(L)}function N(X,F){if($.length>1)$.sort(X||HD);if(Z.length>1)Z.sort(F||AY);if(K.length>1)K.sort(F||AY)}function D(){for(let X=Q,F=J.length;X<F;X++){let O=J[X];if(O.id===null)break;O.id=null,O.object=null,O.geometry=null,O.material=null,O.group=null}}return{opaque:$,transmissive:Z,transparent:K,init:U,push:Y,unshift:G,finish:D,sort:N}}function YD(){let J=new WeakMap;function Q(Z,K){let U=J.get(Z),W;if(U===void 0)W=new PY,J.set(Z,[W]);else if(K>=U.length)W=new PY,U.push(W);else W=U[K];return W}function $(){J=new WeakMap}return{get:Q,dispose:$}}function GD(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={direction:new T,color:new U0};break;case"SpotLight":$={position:new T,direction:new T,color:new U0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new T,color:new U0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new T,skyColor:new U0,groundColor:new U0};break;case"RectAreaLight":$={color:new U0,position:new T,halfWidth:new T,halfHeight:new T};break}return J[Q.id]=$,$}}}function XD(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var ND=0;function qD(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function FD(J){let Q=new GD,$=XD(),Z={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let G=0;G<9;G++)Z.probe.push(new T);let K=new T,U=new z9,W=new z9;function H(G){let N=0,D=0,X=0;for(let h=0;h<9;h++)Z.probe[h].set(0,0,0);let F=0,O=0,V=0,q=0,E=0,L=0,A=0,R=0,_=0,B=0,z=0,M=0,I=0,f=0;G.sort(qD);for(let h=0,a=G.length;h<a;h++){let k=G[h],m=k.color,e=k.intensity,l=k.distance,i=null;if(k.shadow&&k.shadow.map)if(k.shadow.map.texture.format===wJ)i=k.shadow.map.texture;else i=k.shadow.map.depthTexture||k.shadow.map.texture;if(k.isAmbientLight)N+=m.r*e,D+=m.g*e,X+=m.b*e;else if(k.isLightProbe){for(let p=0;p<9;p++)Z.probe[p].addScaledVector(k.sh.coefficients[p],e);f++}else if(k.isSunLight){let p=Q.get(k);if(p.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){let o=k.shadow,H0=$.get(k);H0.shadowIntensity=o.intensity,H0.shadowBias=o.bias,H0.shadowNormalBias=o.normalBias,H0.shadowRadius=o.radius,H0.shadowMapSize.copy(o.mapSize).multiply(o.getFrameExtents()),Z.sunShadow[O]=H0,Z.sunShadowMap[O]=i;let S0=o.getViewportCount();for(let x0=0;x0<S0;x0++)Z.sunShadowMatrix[V+x0]=o.getMatrix(x0),Z.sunShadowCascade[V+x0]=o._cascadeData[x0];V+=S0,O++}Z.sun[F]=p,F++}else if(k.isDirectionalLight){let p=Q.get(k);if(p.color.copy(k.color).multiplyScalar(k.intensity),k.castShadow){let o=k.shadow,H0=$.get(k);H0.shadowIntensity=o.intensity,H0.shadowBias=o.bias,H0.shadowNormalBias=o.normalBias,H0.shadowRadius=o.radius,H0.shadowMapSize=o.mapSize,Z.directionalShadow[q]=H0,Z.directionalShadowMap[q]=i,Z.directionalShadowMatrix[q]=k.shadow.matrix,_++}Z.directional[q]=p,q++}else if(k.isSpotLight){let p=Q.get(k);p.position.setFromMatrixPosition(k.matrixWorld),p.color.copy(m).multiplyScalar(e),p.distance=l,p.coneCos=Math.cos(k.angle),p.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),p.decay=k.decay,Z.spot[L]=p;let o=k.shadow;if(k.map){if(Z.spotLightMap[M]=k.map,M++,o.updateMatrices(k),k.castShadow)I++}if(Z.spotLightMatrix[L]=o.matrix,k.castShadow){let H0=$.get(k);H0.shadowIntensity=o.intensity,H0.shadowBias=o.bias,H0.shadowNormalBias=o.normalBias,H0.shadowRadius=o.radius,H0.shadowMapSize=o.mapSize,Z.spotShadow[L]=H0,Z.spotShadowMap[L]=i,z++}L++}else if(k.isRectAreaLight){let p=Q.get(k);p.color.copy(m).multiplyScalar(e),p.halfWidth.set(k.width*0.5,0,0),p.halfHeight.set(0,k.height*0.5,0),Z.rectArea[A]=p,A++}else if(k.isPointLight){let p=Q.get(k);if(p.color.copy(k.color).multiplyScalar(k.intensity),p.distance=k.distance,p.decay=k.decay,k.castShadow){let o=k.shadow,H0=$.get(k);H0.shadowIntensity=o.intensity,H0.shadowBias=o.bias,H0.shadowNormalBias=o.normalBias,H0.shadowRadius=o.radius,H0.shadowMapSize=o.mapSize,H0.shadowCameraNear=o.camera.near,H0.shadowCameraFar=o.camera.far,Z.pointShadow[E]=H0,Z.pointShadowMap[E]=i,Z.pointShadowMatrix[E]=k.shadow.matrix,B++}Z.point[E]=p,E++}else if(k.isHemisphereLight){let p=Q.get(k);p.skyColor.copy(k.color).multiplyScalar(e),p.groundColor.copy(k.groundColor).multiplyScalar(e),Z.hemi[R]=p,R++}}if(A>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=C0.LTC_FLOAT_1,Z.rectAreaLTC2=C0.LTC_FLOAT_2;else Z.rectAreaLTC1=C0.LTC_HALF_1,Z.rectAreaLTC2=C0.LTC_HALF_2;Z.ambient[0]=N,Z.ambient[1]=D,Z.ambient[2]=X;let S=Z.hash;if(S.sunLength!==F||S.directionalLength!==q||S.pointLength!==E||S.spotLength!==L||S.rectAreaLength!==A||S.hemiLength!==R||S.numSunShadows!==O||S.numDirectionalShadows!==_||S.numPointShadows!==B||S.numSpotShadows!==z||S.numSpotMaps!==M||S.numLightProbes!==f)Z.sun.length=F,Z.directional.length=q,Z.spot.length=L,Z.rectArea.length=A,Z.point.length=E,Z.hemi.length=R,Z.sunShadow.length=O,Z.sunShadowMap.length=O,Z.sunShadowMatrix.length=V,Z.sunShadowCascade.length=V,Z.directionalShadow.length=_,Z.directionalShadowMap.length=_,Z.directionalShadowMatrix.length=_,Z.pointShadow.length=B,Z.pointShadowMap.length=B,Z.pointShadowMatrix.length=B,Z.spotShadow.length=z,Z.spotShadowMap.length=z,Z.spotLightMatrix.length=z+M-I,Z.spotLightMap.length=M,Z.numSpotLightShadowsWithMaps=I,Z.numLightProbes=f,S.sunLength=F,S.directionalLength=q,S.pointLength=E,S.spotLength=L,S.rectAreaLength=A,S.hemiLength=R,S.numSunShadows=O,S.numDirectionalShadows=_,S.numPointShadows=B,S.numSpotShadows=z,S.numSpotMaps=M,S.numLightProbes=f,Z.version=ND++}function Y(G,N){let D=0,X=0,F=0,O=0,V=0,q=0,E=N.matrixWorldInverse;for(let L=0,A=G.length;L<A;L++){let R=G[L];if(R.isSunLight){let _=Z.sun[D];_.direction.setFromMatrixPosition(R.matrixWorld),_.direction.transformDirection(E),D++}else if(R.isDirectionalLight){let _=Z.directional[X];_.direction.setFromMatrixPosition(R.matrixWorld),K.setFromMatrixPosition(R.target.matrixWorld),_.direction.sub(K),_.direction.transformDirection(E),X++}else if(R.isSpotLight){let _=Z.spot[O];_.position.setFromMatrixPosition(R.matrixWorld),_.position.applyMatrix4(E),_.direction.setFromMatrixPosition(R.matrixWorld),K.setFromMatrixPosition(R.target.matrixWorld),_.direction.sub(K),_.direction.transformDirection(E),O++}else if(R.isRectAreaLight){let _=Z.rectArea[V];_.position.setFromMatrixPosition(R.matrixWorld),_.position.applyMatrix4(E),W.identity(),U.copy(R.matrixWorld),U.premultiply(E),W.extractRotation(U),_.halfWidth.set(R.width*0.5,0,0),_.halfHeight.set(0,R.height*0.5,0),_.halfWidth.applyMatrix4(W),_.halfHeight.applyMatrix4(W),V++}else if(R.isPointLight){let _=Z.point[F];_.position.setFromMatrixPosition(R.matrixWorld),_.position.applyMatrix4(E),F++}else if(R.isHemisphereLight){let _=Z.hemi[q];_.direction.setFromMatrixPosition(R.matrixWorld),_.direction.transformDirection(E),q++}}}return{setup:H,setupView:Y,state:Z}}function wY(J){let Q=new FD(J),$=[],Z=[],K=[];function U(X){D.camera=X,$.length=0,Z.length=0,K.length=0}function W(X){$.push(X)}function H(X){Z.push(X)}function Y(X){K.push(X)}function G(){Q.setup($)}function N(X){Q.setupView($,X)}let D={lightsArray:$,shadowsArray:Z,lightProbeGridArray:K,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:U,state:D,setupLights:G,setupLightsView:N,pushLight:W,pushShadow:H,pushLightProbeGrid:Y}}function DD(J){let Q=new WeakMap;function $(K,U=0){let W=Q.get(K),H;if(W===void 0)H=new wY(J),Q.set(K,[H]);else if(U>=W.length)H=new wY(J),W.push(H);else H=W[U];return H}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var ED=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,RD=`uniform sampler2D shadow_pass;
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
}`,OD=[new T(1,0,0),new T(-1,0,0),new T(0,1,0),new T(0,-1,0),new T(0,0,1),new T(0,0,-1)],MD=[new T(0,-1,0),new T(0,-1,0),new T(0,0,1),new T(0,0,-1),new T(0,-1,0),new T(0,-1,0)],TY=new z9,jQ=new T,LU=new T;function VD(J,Q,$){let Z=new CQ,K=new Z0,U=new Z0,W=new a9,H=new TQ,Y=new QU,G={},N=$.maxTextureSize,D={[L6]:X7,[X7]:L6,[r9]:r9},X=new y9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Z0},radius:{value:4}},vertexShader:ED,fragmentShader:RD}),F=X.clone();F.defines.HORIZONTAL_PASS=1;let O=new F9;O.setAttribute("position",new Q7(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let V=new $0(O,X),q=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=GQ;let E=this.type;this.render=function(B,z,M){if(q.enabled===!1)return;if(q.autoUpdate===!1&&q.needsUpdate===!1)return;if(B.length===0)return;if(this.type===_6)o0("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=GQ;let I=J.getRenderTarget(),f=J.getActiveCubeFace(),S=J.getActiveMipmapLevel(),h=J.state;if(h.setBlending(S7),h.buffers.depth.getReversed()===!0)h.buffers.color.setClear(0,0,0,0);else h.buffers.color.setClear(1,1,1,1);h.buffers.depth.setTest(!0),h.setScissorTest(!1);let a=E!==this.type;if(a)z.traverse(function(k){if(k.material)if(Array.isArray(k.material))k.material.forEach((m)=>m.needsUpdate=!0);else k.material.needsUpdate=!0});for(let k=0,m=B.length;k<m;k++){let e=B[k],l=e.shadow;if(l===void 0){o0("WebGLShadowMap:",e,"has no shadow.");continue}if(l.autoUpdate===!1&&l.needsUpdate===!1)continue;K.copy(l.mapSize);let i=l.getFrameExtents();if(K.multiply(i),U.copy(l.mapSize),K.x>N||K.y>N){if(K.x>N)U.x=Math.floor(N/i.x),K.x=U.x*i.x,l.mapSize.x=U.x;if(K.y>N)U.y=Math.floor(N/i.y),K.y=U.y*i.y,l.mapSize.y=U.y}let p=J.state.buffers.depth.getReversed();if(l.camera._reversedDepth=p,l.map===null||a===!0){if(l.map!==null){if(l.map.depthTexture!==null)l.map.depthTexture.dispose(),l.map.depthTexture=null;l.map.dispose()}if(this.type===I6){if(e.isPointLight){o0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}l.map=new W7(K.x,K.y,{format:wJ,type:E7,minFilter:k7,magFilter:k7,generateMipmaps:!1}),l.map.texture.name=e.name+".shadowMap",l.map.depthTexture=new jJ(K.x,K.y,h8),l.map.depthTexture.name=e.name+".shadowMapDepth",l.map.depthTexture.format=AJ,l.map.depthTexture.compareFunction=null,l.map.depthTexture.minFilter=d7,l.map.depthTexture.magFilter=d7}else{if(e.isPointLight)l.map=new PU(K.x),l.map.depthTexture=new oK(K.x,GJ);else l.map=new W7(K.x,K.y),l.map.depthTexture=new jJ(K.x,K.y,GJ);if(l.map.depthTexture.name=e.name+".shadowMap",l.map.depthTexture.format=AJ,this.type===GQ)l.map.depthTexture.compareFunction=p?u$:d$,l.map.depthTexture.minFilter=k7,l.map.depthTexture.magFilter=k7;else l.map.depthTexture.compareFunction=null,l.map.depthTexture.minFilter=d7,l.map.depthTexture.magFilter=d7}l.camera.updateProjectionMatrix()}if(l.map.isWebGLCubeRenderTarget!==!0&&(l.map.width!==K.x||l.map.height!==K.y))l.map.setSize(K.x,K.y);let o=l.map.isWebGLCubeRenderTarget?6:l.getViewportCount();if(e.isPointLight!==!0)l.updateMatrices(e,M);for(let H0=0;H0<o;H0++){let S0=l.getCamera(H0);if(e.isPointLight){let{camera:x0,matrix:t}=l,h0=e.distance||x0.far;if(h0!==x0.far)x0.far=h0,x0.updateProjectionMatrix();jQ.setFromMatrixPosition(e.matrixWorld),x0.position.copy(jQ),LU.copy(x0.position),LU.add(OD[H0]),x0.up.copy(MD[H0]),x0.lookAt(LU),x0.updateMatrixWorld(),t.makeTranslation(-jQ.x,-jQ.y,-jQ.z),TY.multiplyMatrices(x0.projectionMatrix,x0.matrixWorldInverse),l._frustum.setFromProjectionMatrix(TY,x0.coordinateSystem,x0.reversedDepth)}if(l.map.isWebGLCubeRenderTarget)J.setRenderTarget(l.map,H0),J.clear();else{if(H0===0)J.setRenderTarget(l.map),J.clear();let x0=l.getViewport(H0);W.set(U.x*x0.x,U.y*x0.y,U.x*x0.z,U.y*x0.w),h.viewport(W)}Z=l.getFrustum(H0),R(z,M,S0,e,this.type)}if(l.isPointLightShadow!==!0&&this.type===I6)L(l,M);l.needsUpdate=!1}E=this.type,q.needsUpdate=!1,J.setRenderTarget(I,f,S)};function L(B,z){let M=Q.update(V);if(X.defines.VSM_SAMPLES!==B.blurSamples)X.defines.VSM_SAMPLES=B.blurSamples,F.defines.VSM_SAMPLES=B.blurSamples,X.needsUpdate=!0,F.needsUpdate=!0;if(B.mapPass===null)B.mapPass=new W7(K.x,K.y,{format:wJ,type:E7});else if(B.mapPass.width!==B.map.width||B.mapPass.height!==B.map.height)B.mapPass.setSize(B.map.width,B.map.height);X.uniforms.shadow_pass.value=B.map.depthTexture,X.uniforms.resolution.value.set(B.map.width,B.map.height),X.uniforms.radius.value=B.radius,J.setRenderTarget(B.mapPass),J.clear(),J.renderBufferDirect(z,null,M,X,V,null),F.uniforms.shadow_pass.value=B.mapPass.texture,F.uniforms.resolution.value.set(B.map.width,B.map.height),F.uniforms.radius.value=B.radius,J.setRenderTarget(B.map),J.clear(),J.renderBufferDirect(z,null,M,F,V,null)}function A(B,z,M,I){let f=null,S=M.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(S!==void 0)f=S;else if(f=M.isPointLight===!0?Y:H,J.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){let h=f.uuid,a=z.uuid,k=G[h];if(k===void 0)k={},G[h]=k;let m=k[a];if(m===void 0)m=f.clone(),k[a]=m,z.addEventListener("dispose",_);f=m}if(f.visible=z.visible,f.wireframe=z.wireframe,I===I6)f.side=z.shadowSide!==null?z.shadowSide:z.side;else f.side=z.shadowSide!==null?z.shadowSide:D[z.side];if(f.alphaMap=z.alphaMap,f.alphaTest=z.alphaToCoverage===!0?0.5:z.alphaTest,f.map=z.map,f.clipShadows=z.clipShadows,f.clippingPlanes=z.clippingPlanes,f.clipIntersection=z.clipIntersection,f.displacementMap=z.displacementMap,f.displacementScale=z.displacementScale,f.displacementBias=z.displacementBias,f.wireframeLinewidth=z.wireframeLinewidth,f.linewidth=z.linewidth,M.isPointLight===!0&&f.isMeshDistanceMaterial===!0){let h=J.properties.get(f);h.light=M}return f}function R(B,z,M,I,f){if(B.visible===!1)return;if(B.layers.test(z.layers)&&(B.isMesh||B.isLine||B.isPoints)){if((B.castShadow||B.receiveShadow&&f===I6)&&(!B.frustumCulled||B.intersectsFrustum(Z))){B.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,B.matrixWorld);let a=Q.update(B),k=B.material;if(Array.isArray(k)){let m=a.groups;for(let e=0,l=m.length;e<l;e++){let i=m[e],p=k[i.materialIndex];if(p&&p.visible){let o=A(B,p,I,f);B.onBeforeShadow(J,B,z,M,a,o,i),J.renderBufferDirect(M,null,a,o,B,i),B.onAfterShadow(J,B,z,M,a,o,i)}}}else if(k.visible){let m=A(B,k,I,f);B.onBeforeShadow(J,B,z,M,a,m,null),J.renderBufferDirect(M,null,a,m,B,null),B.onAfterShadow(J,B,z,M,a,m,null)}}}let h=B.children;for(let a=0,k=h.length;a<k;a++)R(h[a],z,M,I,f)}function _(B){B.target.removeEventListener("dispose",_);for(let M in G){let I=G[M],f=B.target.uuid;if(f in I)I[f].dispose(),delete I[f]}}}function BD(J,Q){function $(){let g=!1,B0=new a9,J0=null,I0=new a9(0,0,0,0);return{setMask:function(k0){if(J0!==k0&&!g)J.colorMask(k0,k0,k0,k0),J0=k0},setLocked:function(k0){g=k0},setClear:function(k0,G0,z0,U9,s9){if(s9===!0)k0*=U9,G0*=U9,z0*=U9;if(B0.set(k0,G0,z0,U9),I0.equals(B0)===!1)J.clearColor(k0,G0,z0,U9),I0.copy(B0)},reset:function(){g=!1,J0=null,I0.set(-1,0,0,0)}}}function Z(){let g=!1,B0=!1,J0=null,I0=null,k0=null;return{setReversed:function(G0){if(B0!==G0){let z0=Q.get("EXT_clip_control");if(G0)z0.clipControlEXT(z0.LOWER_LEFT_EXT,z0.ZERO_TO_ONE_EXT);else z0.clipControlEXT(z0.LOWER_LEFT_EXT,z0.NEGATIVE_ONE_TO_ONE_EXT);B0=G0;let U9=k0;k0=null,this.setClear(U9)}},getReversed:function(){return B0},setTest:function(G0){if(G0)F0(J.DEPTH_TEST);else g0(J.DEPTH_TEST)},setMask:function(G0){if(J0!==G0&&!g)J.depthMask(G0),J0=G0},setFunc:function(G0){if(B0)G0=oH[G0];if(I0!==G0){switch(G0){case BH:J.depthFunc(J.NEVER);break;case _H:J.depthFunc(J.ALWAYS);break;case IH:J.depthFunc(J.LESS);break;case QK:J.depthFunc(J.LEQUAL);break;case LH:J.depthFunc(J.EQUAL);break;case CH:J.depthFunc(J.GEQUAL);break;case zH:J.depthFunc(J.GREATER);break;case AH:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}I0=G0}},setLocked:function(G0){g=G0},setClear:function(G0){if(k0!==G0){if(k0=G0,B0)G0=1-G0;J.clearDepth(G0)}},reset:function(){g=!1,J0=null,I0=null,k0=null,B0=!1}}}function K(){let g=!1,B0=null,J0=null,I0=null,k0=null,G0=null,z0=null,U9=null,s9=null;return{setTest:function(j9){if(!g)if(j9)F0(J.STENCIL_TEST);else g0(J.STENCIL_TEST)},setMask:function(j9){if(B0!==j9&&!g)J.stencilMask(j9),B0=j9},setFunc:function(j9,F8,A8){if(J0!==j9||I0!==F8||k0!==A8)J.stencilFunc(j9,F8,A8),J0=j9,I0=F8,k0=A8},setOp:function(j9,F8,A8){if(G0!==j9||z0!==F8||U9!==A8)J.stencilOp(j9,F8,A8),G0=j9,z0=F8,U9=A8},setLocked:function(j9){g=j9},setClear:function(j9){if(s9!==j9)J.clearStencil(j9),s9=j9},reset:function(){g=!1,B0=null,J0=null,I0=null,k0=null,G0=null,z0=null,U9=null,s9=null}}}let U=new $,W=new Z,H=new K,Y=new WeakMap,G=new WeakMap,N={},D={},X={},F=new WeakMap,O=[],V=null,q=!1,E=null,L=null,A=null,R=null,_=null,B=null,z=null,M=new U0(0,0,0),I=0,f=!1,S=null,h=null,a=null,k=null,m=null,e=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),l=!1,i=0,p=J.getParameter(J.VERSION);if(p.indexOf("WebGL")!==-1)i=parseFloat(/^WebGL (\d)/.exec(p)[1]),l=i>=1;else if(p.indexOf("OpenGL ES")!==-1)i=parseFloat(/^OpenGL ES (\d)/.exec(p)[1]),l=i>=2;let o=null,H0={},S0=J.getParameter(J.SCISSOR_BOX),x0=J.getParameter(J.VIEWPORT),t=new a9().fromArray(S0),h0=new a9().fromArray(x0);function n(g,B0,J0,I0){let k0=new Uint8Array(4),G0=J.createTexture();J.bindTexture(g,G0),J.texParameteri(g,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(g,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let z0=0;z0<J0;z0++)if(g===J.TEXTURE_3D||g===J.TEXTURE_2D_ARRAY)J.texImage3D(B0,0,J.RGBA,1,1,I0,0,J.RGBA,J.UNSIGNED_BYTE,k0);else J.texImage2D(B0+z0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,k0);return G0}let W0={};W0[J.TEXTURE_2D]=n(J.TEXTURE_2D,J.TEXTURE_2D,1),W0[J.TEXTURE_CUBE_MAP]=n(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),W0[J.TEXTURE_2D_ARRAY]=n(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),W0[J.TEXTURE_3D]=n(J.TEXTURE_3D,J.TEXTURE_3D,1,1),U.setClear(0,0,0,1),W.setClear(1),H.setClear(0),F0(J.DEPTH_TEST),W.setFunc(QK),P0(!1),d0(tZ),F0(J.CULL_FACE),D0(S7);function F0(g){if(N[g]!==!0)J.enable(g),N[g]=!0}function g0(g){if(N[g]!==!1)J.disable(g),N[g]=!1}function r0(g,B0){if(X[g]!==B0){if(J.bindFramebuffer(g,B0),X[g]=B0,g===J.DRAW_FRAMEBUFFER)X[J.FRAMEBUFFER]=B0;if(g===J.FRAMEBUFFER)X[J.DRAW_FRAMEBUFFER]=B0;return!0}return!1}function y0(g,B0){let J0=O,I0=!1;if(g){if(J0=F.get(B0),J0===void 0)J0=[],F.set(B0,J0);let k0=g.textures;if(J0.length!==k0.length||J0[0]!==J.COLOR_ATTACHMENT0){for(let G0=0,z0=k0.length;G0<z0;G0++)J0[G0]=J.COLOR_ATTACHMENT0+G0;J0.length=k0.length,I0=!0}}else if(J0[0]!==J.BACK)J0[0]=J.BACK,I0=!0;if(I0)J.drawBuffers(J0)}function b9(g){if(V!==g)return J.useProgram(g),V=g,!0;return!1}let K0={[C6]:J.FUNC_ADD,[QH]:J.FUNC_SUBTRACT,[$H]:J.FUNC_REVERSE_SUBTRACT};K0[ZH]=J.MIN,K0[KH]=J.MAX;let q0={[UH]:J.ZERO,[WH]:J.ONE,[HH]:J.SRC_COLOR,[GH]:J.SRC_ALPHA,[EH]:J.SRC_ALPHA_SATURATE,[FH]:J.DST_COLOR,[NH]:J.DST_ALPHA,[YH]:J.ONE_MINUS_SRC_COLOR,[XH]:J.ONE_MINUS_SRC_ALPHA,[DH]:J.ONE_MINUS_DST_COLOR,[qH]:J.ONE_MINUS_DST_ALPHA,[RH]:J.CONSTANT_COLOR,[OH]:J.ONE_MINUS_CONSTANT_COLOR,[MH]:J.CONSTANT_ALPHA,[VH]:J.ONE_MINUS_CONSTANT_ALPHA};function D0(g,B0,J0,I0,k0,G0,z0,U9,s9,j9){if(g===S7){if(q===!0)g0(J.BLEND),q=!1;return}if(q===!1)F0(J.BLEND),q=!0;if(g!==JH){if(g!==E||j9!==f){if(L!==C6||_!==C6)J.blendEquation(J.FUNC_ADD),L=C6,_=C6;if(j9)switch(g){case XQ:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case N7:J.blendFunc(J.ONE,J.ONE);break;case eZ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case JK:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:e0("WebGLState: Invalid blending: ",g);break}else switch(g){case XQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case N7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case eZ:e0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case JK:e0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:e0("WebGLState: Invalid blending: ",g);break}A=null,R=null,B=null,z=null,M.set(0,0,0),I=0,E=g,f=j9}return}if(k0=k0||B0,G0=G0||J0,z0=z0||I0,B0!==L||k0!==_)J.blendEquationSeparate(K0[B0],K0[k0]),L=B0,_=k0;if(J0!==A||I0!==R||G0!==B||z0!==z)J.blendFuncSeparate(q0[J0],q0[I0],q0[G0],q0[z0]),A=J0,R=I0,B=G0,z=z0;if(U9.equals(M)===!1||s9!==I)J.blendColor(U9.r,U9.g,U9.b,s9),M.copy(U9),I=s9;E=g,f=!1}function E0(g,B0){g.side===r9?g0(J.CULL_FACE):F0(J.CULL_FACE);let J0=g.side===X7;if(B0)J0=!J0;P0(J0),g.blending===XQ&&g.transparent===!1?D0(S7):D0(g.blending,g.blendEquation,g.blendSrc,g.blendDst,g.blendEquationAlpha,g.blendSrcAlpha,g.blendDstAlpha,g.blendColor,g.blendAlpha,g.premultipliedAlpha),W.setFunc(g.depthFunc),W.setTest(g.depthTest),W.setMask(g.depthWrite),U.setMask(g.colorWrite);let I0=g.stencilWrite;if(H.setTest(I0),I0)H.setMask(g.stencilWriteMask),H.setFunc(g.stencilFunc,g.stencilRef,g.stencilFuncMask),H.setOp(g.stencilFail,g.stencilZFail,g.stencilZPass);Z9(g.polygonOffset,g.polygonOffsetFactor,g.polygonOffsetUnits),g.alphaToCoverage===!0?F0(J.SAMPLE_ALPHA_TO_COVERAGE):g0(J.SAMPLE_ALPHA_TO_COVERAGE)}function P0(g){if(S!==g){if(g)J.frontFace(J.CW);else J.frontFace(J.CCW);S=g}}function d0(g){if(g!==tW){if(F0(J.CULL_FACE),g!==h)if(g===tZ)J.cullFace(J.BACK);else if(g===eW)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else g0(J.CULL_FACE);h=g}function n0(g){if(g!==a){if(l)J.lineWidth(g);a=g}}function Z9(g,B0,J0){if(g){if(F0(J.POLYGON_OFFSET_FILL),k!==B0||m!==J0){if(k=B0,m=J0,W.getReversed())B0=-B0;J.polygonOffset(B0,J0)}}else g0(J.POLYGON_OFFSET_FILL)}function K9(g){if(g)F0(J.SCISSOR_TEST);else g0(J.SCISSOR_TEST)}function y(g){if(g===void 0)g=J.TEXTURE0+e-1;if(o!==g)J.activeTexture(g),o=g}function m9(g,B0,J0){if(J0===void 0)if(o===null)J0=J.TEXTURE0+e-1;else J0=o;let I0=H0[J0];if(I0===void 0)I0={type:void 0,texture:void 0},H0[J0]=I0;if(I0.type!==g||I0.texture!==B0){if(o!==J0)J.activeTexture(J0),o=J0;J.bindTexture(g,B0||W0[g]),I0.type=g,I0.texture=B0}}function N9(){let g=H0[o];if(g!==void 0&&g.type!==void 0)J.bindTexture(g.type,null),g.type=void 0,g.texture=void 0}function R9(){try{J.compressedTexImage2D(...arguments)}catch(g){e0("WebGLState:",g)}}function w(){try{J.compressedTexImage3D(...arguments)}catch(g){e0("WebGLState:",g)}}function C(){try{J.texSubImage2D(...arguments)}catch(g){e0("WebGLState:",g)}}function b(){try{J.texSubImage3D(...arguments)}catch(g){e0("WebGLState:",g)}}function c(){try{J.compressedTexSubImage2D(...arguments)}catch(g){e0("WebGLState:",g)}}function Y0(){try{J.compressedTexSubImage3D(...arguments)}catch(g){e0("WebGLState:",g)}}function R0(){try{J.texStorage2D(...arguments)}catch(g){e0("WebGLState:",g)}}function V0(){try{J.texStorage3D(...arguments)}catch(g){e0("WebGLState:",g)}}function r(){try{J.texImage2D(...arguments)}catch(g){e0("WebGLState:",g)}}function Q0(){try{J.texImage3D(...arguments)}catch(g){e0("WebGLState:",g)}}function T0(g){if(D[g]!==void 0)return D[g];else return J.getParameter(g)}function u0(g,B0){if(D[g]!==B0)J.pixelStorei(g,B0),D[g]=B0}function L0(g){if(t.equals(g)===!1)J.scissor(g.x,g.y,g.z,g.w),t.copy(g)}function O0(g){if(h0.equals(g)===!1)J.viewport(g.x,g.y,g.z,g.w),h0.copy(g)}function s0(g,B0){let J0=G.get(B0);if(J0===void 0)J0=new WeakMap,G.set(B0,J0);let I0=J0.get(g);if(I0===void 0)I0=J.getUniformBlockIndex(B0,g.name),J0.set(g,I0)}function t0(g,B0){let I0=G.get(B0).get(g);if(Y.get(B0)!==I0)J.uniformBlockBinding(B0,I0,g.__bindingPointIndex),Y.set(B0,I0)}function w9(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),W.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),N={},D={},o=null,H0={},X={},F=new WeakMap,O=[],V=null,q=!1,E=null,L=null,A=null,R=null,_=null,B=null,z=null,M=new U0(0,0,0),I=0,f=!1,S=null,h=null,a=null,k=null,m=null,t.set(0,0,J.canvas.width,J.canvas.height),h0.set(0,0,J.canvas.width,J.canvas.height),U.reset(),W.reset(),H.reset()}return{buffers:{color:U,depth:W,stencil:H},enable:F0,disable:g0,bindFramebuffer:r0,drawBuffers:y0,useProgram:b9,setBlending:D0,setMaterial:E0,setFlipSided:P0,setCullFace:d0,setLineWidth:n0,setPolygonOffset:Z9,setScissorTest:K9,activeTexture:y,bindTexture:m9,unbindTexture:N9,compressedTexImage2D:R9,compressedTexImage3D:w,texImage2D:r,texImage3D:Q0,pixelStorei:u0,getParameter:T0,updateUBOMapping:s0,uniformBlockBinding:t0,texStorage2D:R0,texStorage3D:V0,texSubImage2D:C,texSubImage3D:b,compressedTexSubImage2D:c,compressedTexSubImage3D:Y0,scissor:L0,viewport:O0,reset:w9}}function _D(J,Q,$,Z,K,U,W){let H=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,Y=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),G=new Z0,N=new WeakMap,D=new Set,X,F=new WeakMap,O=!1;try{O=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(w){}function V(w,C){return O?new OffscreenCanvas(w,C):$Q("canvas")}function q(w,C,b){let c=1,Y0=R9(w);if(Y0.width>b||Y0.height>b)c=b/Math.max(Y0.width,Y0.height);if(c<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let R0=Math.floor(c*Y0.width),V0=Math.floor(c*Y0.height);if(X===void 0)X=V(R0,V0);let r=C?V(R0,V0):X;return r.width=R0,r.height=V0,r.getContext("2d").drawImage(w,0,0,R0,V0),o0("WebGLRenderer: Texture has been resized from ("+Y0.width+"x"+Y0.height+") to ("+R0+"x"+V0+")."),r}else{if("data"in w)o0("WebGLRenderer: Image in DataTexture is too big ("+Y0.width+"x"+Y0.height+").");return w}return w}function E(w){return w.generateMipmaps}function L(w){J.generateMipmap(w)}function A(w){if(w.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(w.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function R(w,C,b,c,Y0,R0=!1){if(w!==null){if(J[w]!==void 0)return J[w];o0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let V0;if(c){if(V0=Q.get("EXT_texture_norm16"),!V0)o0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let r=C;if(C===J.RED){if(b===J.FLOAT)r=J.R32F;if(b===J.HALF_FLOAT)r=J.R16F;if(b===J.UNSIGNED_BYTE)r=J.R8;if(b===J.UNSIGNED_SHORT&&V0)r=V0.R16_EXT;if(b===J.SHORT&&V0)r=V0.R16_SNORM_EXT}if(C===J.RED_INTEGER){if(b===J.UNSIGNED_BYTE)r=J.R8UI;if(b===J.UNSIGNED_SHORT)r=J.R16UI;if(b===J.UNSIGNED_INT)r=J.R32UI;if(b===J.BYTE)r=J.R8I;if(b===J.SHORT)r=J.R16I;if(b===J.INT)r=J.R32I}if(C===J.RG){if(b===J.FLOAT)r=J.RG32F;if(b===J.HALF_FLOAT)r=J.RG16F;if(b===J.UNSIGNED_BYTE)r=J.RG8;if(b===J.UNSIGNED_SHORT&&V0)r=V0.RG16_EXT;if(b===J.SHORT&&V0)r=V0.RG16_SNORM_EXT}if(C===J.RG_INTEGER){if(b===J.UNSIGNED_BYTE)r=J.RG8UI;if(b===J.UNSIGNED_SHORT)r=J.RG16UI;if(b===J.UNSIGNED_INT)r=J.RG32UI;if(b===J.BYTE)r=J.RG8I;if(b===J.SHORT)r=J.RG16I;if(b===J.INT)r=J.RG32I}if(C===J.RGB_INTEGER){if(b===J.UNSIGNED_BYTE)r=J.RGB8UI;if(b===J.UNSIGNED_SHORT)r=J.RGB16UI;if(b===J.UNSIGNED_INT)r=J.RGB32UI;if(b===J.BYTE)r=J.RGB8I;if(b===J.SHORT)r=J.RGB16I;if(b===J.INT)r=J.RGB32I}if(C===J.RGBA_INTEGER){if(b===J.UNSIGNED_BYTE)r=J.RGBA8UI;if(b===J.UNSIGNED_SHORT)r=J.RGBA16UI;if(b===J.UNSIGNED_INT)r=J.RGBA32UI;if(b===J.BYTE)r=J.RGBA8I;if(b===J.SHORT)r=J.RGBA16I;if(b===J.INT)r=J.RGBA32I}if(C===J.RGB){if(b===J.UNSIGNED_SHORT&&V0)r=V0.RGB16_EXT;if(b===J.SHORT&&V0)r=V0.RGB16_SNORM_EXT;if(b===J.UNSIGNED_INT_5_9_9_9_REV)r=J.RGB9_E5;if(b===J.UNSIGNED_INT_10F_11F_11F_REV)r=J.R11F_G11F_B10F}if(C===J.RGBA){let Q0=R0?mK:q9.getTransfer(Y0);if(b===J.FLOAT)r=J.RGBA32F;if(b===J.HALF_FLOAT)r=J.RGBA16F;if(b===J.UNSIGNED_BYTE)r=Q0===g9?J.SRGB8_ALPHA8:J.RGBA8;if(b===J.UNSIGNED_SHORT&&V0)r=V0.RGBA16_EXT;if(b===J.SHORT&&V0)r=V0.RGBA16_SNORM_EXT;if(b===J.UNSIGNED_SHORT_4_4_4_4)r=J.RGBA4;if(b===J.UNSIGNED_SHORT_5_5_5_1)r=J.RGB5_A1}if(r===J.R16F||r===J.R32F||r===J.RG16F||r===J.RG32F||r===J.RGBA16F||r===J.RGBA32F)Q.get("EXT_color_buffer_float");return r}function _(w,C){let b;if(w){if(C===null||C===GJ||C===A6)b=J.DEPTH24_STENCIL8;else if(C===h8)b=J.DEPTH32F_STENCIL8;else if(C===VQ)b=J.DEPTH24_STENCIL8,o0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(C===null||C===GJ||C===A6)b=J.DEPTH_COMPONENT24;else if(C===h8)b=J.DEPTH_COMPONENT32F;else if(C===VQ)b=J.DEPTH_COMPONENT16;return b}function B(w,C){if(E(w)===!0||w.isFramebufferTexture&&w.minFilter!==d7&&w.minFilter!==k7)return Math.log2(Math.max(C.width,C.height))+1;else if(w.mipmaps!==void 0&&w.mipmaps.length>0)return w.mipmaps.length;else if(w.isCompressedTexture&&Array.isArray(w.image))return C.mipmaps.length;else return 1}function z(w){let C=w.target;if(C.removeEventListener("dispose",z),I(C),C.isVideoTexture)N.delete(C);if(C.isHTMLTexture)D.delete(C)}function M(w){let C=w.target;C.removeEventListener("dispose",M),S(C)}function I(w){let C=Z.get(w);if(C.__webglInit===void 0)return;let b=w.source,c=F.get(b);if(c){let Y0=c[C.__cacheKey];if(Y0.usedTimes--,Y0.usedTimes===0)f(w);if(Object.keys(c).length===0)F.delete(b)}Z.remove(w)}function f(w){let C=Z.get(w);J.deleteTexture(C.__webglTexture);let b=w.source,c=F.get(b);delete c[C.__cacheKey],W.memory.textures--}function S(w){let C=Z.get(w);if(w.depthTexture)w.depthTexture.dispose(),Z.remove(w.depthTexture);if(w.isWebGLCubeRenderTarget)for(let c=0;c<6;c++){if(Array.isArray(C.__webglFramebuffer[c]))for(let Y0=0;Y0<C.__webglFramebuffer[c].length;Y0++)J.deleteFramebuffer(C.__webglFramebuffer[c][Y0]);else J.deleteFramebuffer(C.__webglFramebuffer[c]);if(C.__webglDepthbuffer)J.deleteRenderbuffer(C.__webglDepthbuffer[c])}else{if(Array.isArray(C.__webglFramebuffer))for(let c=0;c<C.__webglFramebuffer.length;c++)J.deleteFramebuffer(C.__webglFramebuffer[c]);else J.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer)J.deleteRenderbuffer(C.__webglDepthbuffer);if(C.__webglMultisampledFramebuffer)J.deleteFramebuffer(C.__webglMultisampledFramebuffer);if(C.__webglColorRenderbuffer){for(let c=0;c<C.__webglColorRenderbuffer.length;c++)if(C.__webglColorRenderbuffer[c])J.deleteRenderbuffer(C.__webglColorRenderbuffer[c])}if(C.__webglDepthRenderbuffer)J.deleteRenderbuffer(C.__webglDepthRenderbuffer)}let b=w.textures;for(let c=0,Y0=b.length;c<Y0;c++){let R0=Z.get(b[c]);if(R0.__webglTexture)J.deleteTexture(R0.__webglTexture),W.memory.textures--;Z.remove(b[c])}Z.remove(w)}let h=0;function a(){h=0}function k(){return h}function m(w){h=w}function e(){let w=h;if(w>=K.maxTextures)o0("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+K.maxTextures);return h+=1,w}function l(w){let C=[];return C.push(w.wrapS),C.push(w.wrapT),C.push(w.wrapR||0),C.push(w.magFilter),C.push(w.minFilter),C.push(w.anisotropy),C.push(w.internalFormat),C.push(w.format),C.push(w.type),C.push(w.generateMipmaps),C.push(w.premultiplyAlpha),C.push(w.flipY),C.push(w.unpackAlignment),C.push(w.colorSpace),C.join()}function i(w,C){let b=Z.get(w);if(w.isVideoTexture)m9(w);if(w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&b.__version!==w.version){let c=w.image;if(c===null)o0("WebGLRenderer: Texture marked for update but no image data found.");else if(c.complete===!1)o0("WebGLRenderer: Texture marked for update but image is incomplete");else{g0(b,w,C);return}}else if(w.isExternalTexture)b.__webglTexture=w.sourceTexture?w.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,b.__webglTexture,J.TEXTURE0+C)}function p(w,C){let b=Z.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&b.__version!==w.version){g0(b,w,C);return}else if(w.isExternalTexture)b.__webglTexture=w.sourceTexture?w.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,b.__webglTexture,J.TEXTURE0+C)}function o(w,C){let b=Z.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&b.__version!==w.version){g0(b,w,C);return}$.bindTexture(J.TEXTURE_3D,b.__webglTexture,J.TEXTURE0+C)}function H0(w,C){let b=Z.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&b.__version!==w.version){r0(b,w,C);return}$.bindTexture(J.TEXTURE_CUBE_MAP,b.__webglTexture,J.TEXTURE0+C)}let S0={[YJ]:J.REPEAT,[y$]:J.CLAMP_TO_EDGE,[SH]:J.MIRRORED_REPEAT},x0={[d7]:J.NEAREST,[kH]:J.NEAREST_MIPMAP_NEAREST,[MQ]:J.NEAREST_MIPMAP_LINEAR,[k7]:J.LINEAR,[f$]:J.LINEAR_MIPMAP_NEAREST,[zJ]:J.LINEAR_MIPMAP_LINEAR},t={[pH]:J.NEVER,[cH]:J.ALWAYS,[mH]:J.LESS,[d$]:J.LEQUAL,[dH]:J.EQUAL,[u$]:J.GEQUAL,[uH]:J.GREATER,[lH]:J.NOTEQUAL};function h0(w,C){if(C.type===h8&&Q.has("OES_texture_float_linear")===!1&&(C.magFilter===k7||C.magFilter===f$||C.magFilter===MQ||C.magFilter===zJ||C.minFilter===k7||C.minFilter===f$||C.minFilter===MQ||C.minFilter===zJ))o0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(w,J.TEXTURE_WRAP_S,S0[C.wrapS]),J.texParameteri(w,J.TEXTURE_WRAP_T,S0[C.wrapT]),w===J.TEXTURE_3D||w===J.TEXTURE_2D_ARRAY)J.texParameteri(w,J.TEXTURE_WRAP_R,S0[C.wrapR]);if(J.texParameteri(w,J.TEXTURE_MAG_FILTER,x0[C.magFilter]),J.texParameteri(w,J.TEXTURE_MIN_FILTER,x0[C.minFilter]),C.compareFunction)J.texParameteri(w,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(w,J.TEXTURE_COMPARE_FUNC,t[C.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===d7)return;if(C.minFilter!==MQ&&C.minFilter!==zJ)return;if(C.type===h8&&Q.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||Z.get(C).__currentAnisotropy){let b=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(w,b.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,K.getMaxAnisotropy())),Z.get(C).__currentAnisotropy=C.anisotropy}}}function n(w,C){let b=!1;if(w.__webglInit===void 0)w.__webglInit=!0,C.addEventListener("dispose",z);let c=C.source,Y0=F.get(c);if(Y0===void 0)Y0={},F.set(c,Y0);let R0=l(C);if(R0!==w.__cacheKey){if(Y0[R0]===void 0)Y0[R0]={texture:J.createTexture(),usedTimes:0},W.memory.textures++,b=!0;Y0[R0].usedTimes++;let V0=Y0[w.__cacheKey];if(V0!==void 0){if(Y0[w.__cacheKey].usedTimes--,V0.usedTimes===0)f(C)}w.__cacheKey=R0,w.__webglTexture=Y0[R0].texture}return b}function W0(w,C,b){return Math.floor(Math.floor(w/b)/C)}function F0(w,C,b,c){let R0=w.updateRanges;if(R0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,C.width,C.height,b,c,C.data);else{R0.sort((u0,L0)=>u0.start-L0.start);let V0=0;for(let u0=1;u0<R0.length;u0++){let L0=R0[V0],O0=R0[u0],s0=L0.start+L0.count,t0=W0(O0.start,C.width,4),w9=W0(L0.start,C.width,4);if(O0.start<=s0+1&&t0===w9&&W0(O0.start+O0.count-1,C.width,4)===t0)L0.count=Math.max(L0.count,O0.start+O0.count-L0.start);else++V0,R0[V0]=O0}R0.length=V0+1;let r=$.getParameter(J.UNPACK_ROW_LENGTH),Q0=$.getParameter(J.UNPACK_SKIP_PIXELS),T0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,C.width);for(let u0=0,L0=R0.length;u0<L0;u0++){let O0=R0[u0],s0=Math.floor(O0.start/4),t0=Math.ceil(O0.count/4),w9=s0%C.width,g=Math.floor(s0/C.width),B0=t0,J0=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,w9),$.pixelStorei(J.UNPACK_SKIP_ROWS,g),$.texSubImage2D(J.TEXTURE_2D,0,w9,g,B0,1,b,c,C.data)}w.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,r),$.pixelStorei(J.UNPACK_SKIP_PIXELS,Q0),$.pixelStorei(J.UNPACK_SKIP_ROWS,T0)}}function g0(w,C,b){let c=J.TEXTURE_2D;if(C.isDataArrayTexture||C.isCompressedArrayTexture)c=J.TEXTURE_2D_ARRAY;if(C.isData3DTexture)c=J.TEXTURE_3D;let Y0=n(w,C),R0=C.source;$.bindTexture(c,w.__webglTexture,J.TEXTURE0+b);let V0=Z.get(R0);if(R0.version!==V0.__version||Y0===!0){if($.activeTexture(J.TEXTURE0+b),(typeof ImageBitmap<"u"&&C.image instanceof ImageBitmap)===!1){let J0=q9.getPrimaries(q9.workingColorSpace),I0=C.colorSpace===TJ?null:q9.getPrimaries(C.colorSpace),k0=C.colorSpace===TJ||J0===I0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,C.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,k0)}$.pixelStorei(J.UNPACK_ALIGNMENT,C.unpackAlignment);let Q0=q(C.image,!1,K.maxTextureSize);Q0=N9(C,Q0);let T0=U.convert(C.format,C.colorSpace),u0=U.convert(C.type),L0=R(C.internalFormat,T0,u0,C.normalized,C.colorSpace,C.isVideoTexture);h0(c,C);let O0,s0=C.mipmaps,t0=C.isVideoTexture!==!0,w9=V0.__version===void 0||Y0===!0,g=R0.dataReady,B0=B(C,Q0);if(C.isDepthTexture){if(L0=_(C.format===PJ,C.type),w9)if(t0)$.texStorage2D(J.TEXTURE_2D,1,L0,Q0.width,Q0.height);else $.texImage2D(J.TEXTURE_2D,0,L0,Q0.width,Q0.height,0,T0,u0,null)}else if(C.isDataTexture)if(s0.length>0){if(t0&&w9)$.texStorage2D(J.TEXTURE_2D,B0,L0,s0[0].width,s0[0].height);for(let J0=0,I0=s0.length;J0<I0;J0++)if(O0=s0[J0],t0){if(g)$.texSubImage2D(J.TEXTURE_2D,J0,0,0,O0.width,O0.height,T0,u0,O0.data)}else $.texImage2D(J.TEXTURE_2D,J0,L0,O0.width,O0.height,0,T0,u0,O0.data);C.generateMipmaps=!1}else if(t0){if(w9)$.texStorage2D(J.TEXTURE_2D,B0,L0,Q0.width,Q0.height);if(g)F0(C,Q0,T0,u0)}else $.texImage2D(J.TEXTURE_2D,0,L0,Q0.width,Q0.height,0,T0,u0,Q0.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){if(t0&&w9)$.texStorage3D(J.TEXTURE_2D_ARRAY,B0,L0,s0[0].width,s0[0].height,Q0.depth);for(let J0=0,I0=s0.length;J0<I0;J0++)if(O0=s0[J0],C.format!==M8)if(T0!==null)if(t0){if(g)if(C.layerUpdates.size>0){let k0=OU(O0.width,O0.height,C.format,C.type);for(let G0 of C.layerUpdates){let z0=O0.data.subarray(G0*k0/O0.data.BYTES_PER_ELEMENT,(G0+1)*k0/O0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,J0,0,0,G0,O0.width,O0.height,1,T0,z0)}}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,J0,0,0,0,O0.width,O0.height,Q0.depth,T0,O0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,J0,L0,O0.width,O0.height,Q0.depth,0,O0.data,0,0);else o0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(t0){if(g)$.texSubImage3D(J.TEXTURE_2D_ARRAY,J0,0,0,0,O0.width,O0.height,Q0.depth,T0,u0,O0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,J0,L0,O0.width,O0.height,Q0.depth,0,T0,u0,O0.data);if(C.layerUpdates.size>0)C.clearLayerUpdates()}else{if(t0&&w9)$.texStorage2D(J.TEXTURE_2D,B0,L0,s0[0].width,s0[0].height);for(let J0=0,I0=s0.length;J0<I0;J0++)if(O0=s0[J0],C.format!==M8)if(T0!==null)if(t0){if(g)$.compressedTexSubImage2D(J.TEXTURE_2D,J0,0,0,O0.width,O0.height,T0,O0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,J0,L0,O0.width,O0.height,0,O0.data);else o0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(t0){if(g)$.texSubImage2D(J.TEXTURE_2D,J0,0,0,O0.width,O0.height,T0,u0,O0.data)}else $.texImage2D(J.TEXTURE_2D,J0,L0,O0.width,O0.height,0,T0,u0,O0.data)}else if(C.isDataArrayTexture)if(t0){if(w9)$.texStorage3D(J.TEXTURE_2D_ARRAY,B0,L0,Q0.width,Q0.height,Q0.depth);if(g)if(C.layerUpdates.size>0){let J0=OU(Q0.width,Q0.height,C.format,C.type);for(let I0 of C.layerUpdates){let k0=Q0.data.subarray(I0*J0/Q0.data.BYTES_PER_ELEMENT,(I0+1)*J0/Q0.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,I0,Q0.width,Q0.height,1,T0,u0,k0)}C.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,Q0.width,Q0.height,Q0.depth,T0,u0,Q0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,L0,Q0.width,Q0.height,Q0.depth,0,T0,u0,Q0.data);else if(C.isData3DTexture)if(t0){if(w9)$.texStorage3D(J.TEXTURE_3D,B0,L0,Q0.width,Q0.height,Q0.depth);if(g)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,Q0.width,Q0.height,Q0.depth,T0,u0,Q0.data)}else $.texImage3D(J.TEXTURE_3D,0,L0,Q0.width,Q0.height,Q0.depth,0,T0,u0,Q0.data);else if(C.isFramebufferTexture){if(w9)if(t0)$.texStorage2D(J.TEXTURE_2D,B0,L0,Q0.width,Q0.height);else{let{width:J0,height:I0}=Q0;for(let k0=0;k0<B0;k0++)$.texImage2D(J.TEXTURE_2D,k0,L0,J0,I0,0,T0,u0,null),J0>>=1,I0>>=1}}else if(C.isHTMLTexture){if("texElementImage2D"in J){let J0=J.canvas;if(!J0.hasAttribute("layoutsubtree"))J0.setAttribute("layoutsubtree","true");if(Q0.parentNode!==J0){J0.appendChild(Q0),D.add(C),J0.onpaint=(I0)=>{let k0=I0.changedElements;for(let G0 of D)if(k0.includes(G0.image))G0.needsUpdate=!0},J0.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,Q0);else{let{RGBA:k0,RGBA:G0,UNSIGNED_BYTE:z0}=J;J.texElementImage2D(J.TEXTURE_2D,0,k0,G0,z0,Q0)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(s0.length>0){if(t0&&w9){let J0=R9(s0[0]);$.texStorage2D(J.TEXTURE_2D,B0,L0,J0.width,J0.height)}for(let J0=0,I0=s0.length;J0<I0;J0++)if(O0=s0[J0],t0){if(g)$.texSubImage2D(J.TEXTURE_2D,J0,0,0,T0,u0,O0)}else $.texImage2D(J.TEXTURE_2D,J0,L0,T0,u0,O0);C.generateMipmaps=!1}else if(t0){if(w9){let J0=R9(Q0);$.texStorage2D(J.TEXTURE_2D,B0,L0,J0.width,J0.height)}if(g)$.texSubImage2D(J.TEXTURE_2D,0,0,0,T0,u0,Q0)}else $.texImage2D(J.TEXTURE_2D,0,L0,T0,u0,Q0);if(E(C))L(c);if(V0.__version=R0.version,C.onUpdate)C.onUpdate(C)}w.__version=C.version}function r0(w,C,b){if(C.image.length!==6)return;let c=n(w,C),Y0=C.source;$.bindTexture(J.TEXTURE_CUBE_MAP,w.__webglTexture,J.TEXTURE0+b);let R0=Z.get(Y0);if(Y0.version!==R0.__version||c===!0){$.activeTexture(J.TEXTURE0+b);let V0=q9.getPrimaries(q9.workingColorSpace),r=C.colorSpace===TJ?null:q9.getPrimaries(C.colorSpace),Q0=C.colorSpace===TJ||V0===r?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,C.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,C.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q0);let T0=C.isCompressedTexture||C.image[0].isCompressedTexture,u0=C.image[0]&&C.image[0].isDataTexture,L0=[];for(let G0=0;G0<6;G0++){if(!T0&&!u0)L0[G0]=q(C.image[G0],!0,K.maxCubemapSize);else L0[G0]=u0?C.image[G0].image:C.image[G0];L0[G0]=N9(C,L0[G0])}let O0=L0[0],s0=U.convert(C.format,C.colorSpace),t0=U.convert(C.type),w9=R(C.internalFormat,s0,t0,C.normalized,C.colorSpace),g=C.isVideoTexture!==!0,B0=R0.__version===void 0||c===!0,J0=Y0.dataReady,I0=B(C,O0);h0(J.TEXTURE_CUBE_MAP,C);let k0;if(T0){if(g&&B0)$.texStorage2D(J.TEXTURE_CUBE_MAP,I0,w9,O0.width,O0.height);for(let G0=0;G0<6;G0++){k0=L0[G0].mipmaps;for(let z0=0;z0<k0.length;z0++){let U9=k0[z0];if(C.format!==M8)if(s0!==null)if(g){if(J0)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,z0,0,0,U9.width,U9.height,s0,U9.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,z0,w9,U9.width,U9.height,0,U9.data);else o0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(g){if(J0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,z0,0,0,U9.width,U9.height,s0,t0,U9.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,z0,w9,U9.width,U9.height,0,s0,t0,U9.data)}}}else{if(k0=C.mipmaps,g&&B0){if(k0.length>0)I0++;let G0=R9(L0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,I0,w9,G0.width,G0.height)}for(let G0=0;G0<6;G0++)if(u0){if(g){if(J0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0,0,0,L0[G0].width,L0[G0].height,s0,t0,L0[G0].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0,w9,L0[G0].width,L0[G0].height,0,s0,t0,L0[G0].data);for(let z0=0;z0<k0.length;z0++){let s9=k0[z0].image[G0].image;if(g){if(J0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,z0+1,0,0,s9.width,s9.height,s0,t0,s9.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,z0+1,w9,s9.width,s9.height,0,s0,t0,s9.data)}}else{if(g){if(J0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0,0,0,s0,t0,L0[G0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,0,w9,s0,t0,L0[G0]);for(let z0=0;z0<k0.length;z0++){let U9=k0[z0];if(g){if(J0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,z0+1,0,0,s0,t0,U9.image[G0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+G0,z0+1,w9,s0,t0,U9.image[G0])}}}if(E(C))L(J.TEXTURE_CUBE_MAP);if(R0.__version=Y0.version,C.onUpdate)C.onUpdate(C)}w.__version=C.version}function y0(w,C,b,c,Y0,R0){let V0=U.convert(b.format,b.colorSpace),r=U.convert(b.type),Q0=R(b.internalFormat,V0,r,b.normalized,b.colorSpace),T0=Z.get(C),u0=Z.get(b);if(u0.__renderTarget=C,!T0.__hasExternalTextures){let L0=Math.max(1,C.width>>R0),O0=Math.max(1,C.height>>R0);if(Y0===J.TEXTURE_3D||Y0===J.TEXTURE_2D_ARRAY)$.texImage3D(Y0,R0,Q0,L0,O0,C.depth,0,V0,r,null);else $.texImage2D(Y0,R0,Q0,L0,O0,0,V0,r,null)}if($.bindFramebuffer(J.FRAMEBUFFER,w),y(C))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,c,Y0,u0.__webglTexture,0,K9(C));else if(Y0===J.TEXTURE_2D||Y0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&Y0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,c,Y0,u0.__webglTexture,R0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function b9(w,C,b){if(J.bindRenderbuffer(J.RENDERBUFFER,w),C.depthBuffer){let c=C.depthTexture,Y0=c&&c.isDepthTexture?c.type:null,R0=_(C.stencilBuffer,Y0),V0=C.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(y(C))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,K9(C),R0,C.width,C.height);else if(b)J.renderbufferStorageMultisample(J.RENDERBUFFER,K9(C),R0,C.width,C.height);else J.renderbufferStorage(J.RENDERBUFFER,R0,C.width,C.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,V0,J.RENDERBUFFER,w)}else{let c=C.textures;for(let Y0=0;Y0<c.length;Y0++){let R0=c[Y0],V0=U.convert(R0.format,R0.colorSpace),r=U.convert(R0.type),Q0=R(R0.internalFormat,V0,r,R0.normalized,R0.colorSpace);if(y(C))H.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,K9(C),Q0,C.width,C.height);else if(b)J.renderbufferStorageMultisample(J.RENDERBUFFER,K9(C),Q0,C.width,C.height);else J.renderbufferStorage(J.RENDERBUFFER,Q0,C.width,C.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function K0(w,C,b){let c=C.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,w),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Y0=Z.get(C.depthTexture);if(Y0.__renderTarget=C,!Y0.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0;if(c){if(Y0.__webglInit===void 0)Y0.__webglInit=!0,C.depthTexture.addEventListener("dispose",z);if(Y0.__webglTexture===void 0){Y0.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,Y0.__webglTexture),h0(J.TEXTURE_CUBE_MAP,C.depthTexture);let T0=U.convert(C.depthTexture.format),u0=U.convert(C.depthTexture.type),L0;if(C.depthTexture.format===AJ)L0=J.DEPTH_COMPONENT24;else if(C.depthTexture.format===PJ)L0=J.DEPTH24_STENCIL8;for(let O0=0;O0<6;O0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+O0,0,L0,C.width,C.height,0,T0,u0,null)}}else i(C.depthTexture,0);let R0=Y0.__webglTexture,V0=K9(C),r=c?J.TEXTURE_CUBE_MAP_POSITIVE_X+b:J.TEXTURE_2D,Q0=C.depthTexture.format===PJ?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(C.depthTexture.format===AJ)if(y(C))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,Q0,r,R0,0,V0);else J.framebufferTexture2D(J.FRAMEBUFFER,Q0,r,R0,0);else if(C.depthTexture.format===PJ)if(y(C))H.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,Q0,r,R0,0,V0);else J.framebufferTexture2D(J.FRAMEBUFFER,Q0,r,R0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function q0(w){let C=Z.get(w),b=w.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==w.depthTexture){let c=w.depthTexture;if(C.__depthDisposeCallback)C.__depthDisposeCallback();if(c){let Y0=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,c.removeEventListener("dispose",Y0)};c.addEventListener("dispose",Y0),C.__depthDisposeCallback=Y0}C.__boundDepthTexture=c}if(w.depthTexture&&!C.__autoAllocateDepthBuffer)if(b)for(let c=0;c<6;c++)K0(C.__webglFramebuffer[c],w,c);else{let c=w.texture.mipmaps;if(c&&c.length>0)K0(C.__webglFramebuffer[0],w,0);else K0(C.__webglFramebuffer,w,0)}else if(b){C.__webglDepthbuffer=[];for(let c=0;c<6;c++)if($.bindFramebuffer(J.FRAMEBUFFER,C.__webglFramebuffer[c]),C.__webglDepthbuffer[c]===void 0)C.__webglDepthbuffer[c]=J.createRenderbuffer(),b9(C.__webglDepthbuffer[c],w,!1);else{let Y0=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,R0=C.__webglDepthbuffer[c];J.bindRenderbuffer(J.RENDERBUFFER,R0),J.framebufferRenderbuffer(J.FRAMEBUFFER,Y0,J.RENDERBUFFER,R0)}}else{let c=w.texture.mipmaps;if(c&&c.length>0)$.bindFramebuffer(J.FRAMEBUFFER,C.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,C.__webglFramebuffer);if(C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=J.createRenderbuffer(),b9(C.__webglDepthbuffer,w,!1);else{let Y0=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,R0=C.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,R0),J.framebufferRenderbuffer(J.FRAMEBUFFER,Y0,J.RENDERBUFFER,R0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function D0(w,C,b){let c=Z.get(w);if(C!==void 0)y0(c.__webglFramebuffer,w,w.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(b!==void 0)q0(w)}function E0(w){let C=w.texture,b=Z.get(w),c=Z.get(C);w.addEventListener("dispose",M);let Y0=w.textures,R0=w.isWebGLCubeRenderTarget===!0,V0=Y0.length>1;if(!V0){if(c.__webglTexture===void 0)c.__webglTexture=J.createTexture();c.__version=C.version,W.memory.textures++}if(R0){b.__webglFramebuffer=[];for(let r=0;r<6;r++)if(C.mipmaps&&C.mipmaps.length>0){b.__webglFramebuffer[r]=[];for(let Q0=0;Q0<C.mipmaps.length;Q0++)b.__webglFramebuffer[r][Q0]=J.createFramebuffer()}else b.__webglFramebuffer[r]=J.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){b.__webglFramebuffer=[];for(let r=0;r<C.mipmaps.length;r++)b.__webglFramebuffer[r]=J.createFramebuffer()}else b.__webglFramebuffer=J.createFramebuffer();if(V0)for(let r=0,Q0=Y0.length;r<Q0;r++){let T0=Z.get(Y0[r]);if(T0.__webglTexture===void 0)T0.__webglTexture=J.createTexture(),W.memory.textures++}if(w.samples>0&&y(w)===!1){b.__webglMultisampledFramebuffer=J.createFramebuffer(),b.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,b.__webglMultisampledFramebuffer);for(let r=0;r<Y0.length;r++){let Q0=Y0[r];b.__webglColorRenderbuffer[r]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,b.__webglColorRenderbuffer[r]);let T0=U.convert(Q0.format,Q0.colorSpace),u0=U.convert(Q0.type),L0=R(Q0.internalFormat,T0,u0,Q0.normalized,Q0.colorSpace,w.isXRRenderTarget===!0),O0=K9(w);J.renderbufferStorageMultisample(J.RENDERBUFFER,O0,L0,w.width,w.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+r,J.RENDERBUFFER,b.__webglColorRenderbuffer[r])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),w.depthBuffer)b.__webglDepthRenderbuffer=J.createRenderbuffer(),b9(b.__webglDepthRenderbuffer,w,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(R0){$.bindTexture(J.TEXTURE_CUBE_MAP,c.__webglTexture),h0(J.TEXTURE_CUBE_MAP,C);for(let r=0;r<6;r++)if(C.mipmaps&&C.mipmaps.length>0)for(let Q0=0;Q0<C.mipmaps.length;Q0++)y0(b.__webglFramebuffer[r][Q0],w,C,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+r,Q0);else y0(b.__webglFramebuffer[r],w,C,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);if(E(C))L(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(V0){for(let r=0,Q0=Y0.length;r<Q0;r++){let T0=Y0[r],u0=Z.get(T0),L0=J.TEXTURE_2D;if(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)L0=w.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(L0,u0.__webglTexture),h0(L0,T0),y0(b.__webglFramebuffer,w,T0,J.COLOR_ATTACHMENT0+r,L0,0),E(T0))L(L0)}$.unbindTexture()}else{let r=J.TEXTURE_2D;if(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)r=w.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(r,c.__webglTexture),h0(r,C),C.mipmaps&&C.mipmaps.length>0)for(let Q0=0;Q0<C.mipmaps.length;Q0++)y0(b.__webglFramebuffer[Q0],w,C,J.COLOR_ATTACHMENT0,r,Q0);else y0(b.__webglFramebuffer,w,C,J.COLOR_ATTACHMENT0,r,0);if(E(C))L(r);$.unbindTexture()}if(w.depthBuffer)q0(w)}function P0(w){let C=w.textures;for(let b=0,c=C.length;b<c;b++){let Y0=C[b];if(E(Y0)){let R0=A(w),V0=Z.get(Y0).__webglTexture;$.bindTexture(R0,V0),L(R0),$.unbindTexture()}}}let d0=[],n0=[];function Z9(w){if(w.samples>0){if(y(w)===!1){let{textures:C,width:b,height:c}=w,Y0=J.COLOR_BUFFER_BIT,R0=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,V0=Z.get(w),r=C.length>1;if(r)for(let T0=0;T0<C.length;T0++)$.bindFramebuffer(J.FRAMEBUFFER,V0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,V0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,V0.__webglMultisampledFramebuffer);let Q0=w.texture.mipmaps;if(Q0&&Q0.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,V0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,V0.__webglFramebuffer);for(let T0=0;T0<C.length;T0++){if(w.resolveDepthBuffer){if(w.depthBuffer)Y0|=J.DEPTH_BUFFER_BIT;if(w.stencilBuffer&&w.resolveStencilBuffer)Y0|=J.STENCIL_BUFFER_BIT}if(r){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,V0.__webglColorRenderbuffer[T0]);let u0=Z.get(C[T0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,u0,0)}if(J.blitFramebuffer(0,0,b,c,0,0,b,c,Y0,J.NEAREST),Y===!0){if(d0.length=0,n0.length=0,d0.push(J.COLOR_ATTACHMENT0+T0),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1)d0.push(R0),n0.push(R0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,n0);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,d0)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),r)for(let T0=0;T0<C.length;T0++){$.bindFramebuffer(J.FRAMEBUFFER,V0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.RENDERBUFFER,V0.__webglColorRenderbuffer[T0]);let u0=Z.get(C[T0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,V0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+T0,J.TEXTURE_2D,u0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,V0.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&Y){let C=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[C])}}}function K9(w){return Math.min(K.maxSamples,w.samples)}function y(w){let C=Z.get(w);return w.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function m9(w){let C=W.render.frame;if(N.get(w)!==C)N.set(w,C),w.update()}function N9(w,C){let{colorSpace:b,format:c,type:Y0}=w;if(w.isCompressedTexture===!0||w.isVideoTexture===!0)return C;if(b!==pK&&b!==TJ)if(q9.getTransfer(b)===g9){if(c!==M8||Y0!==$8)o0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else e0("WebGLTextures: Unsupported texture color space:",b);return C}function R9(w){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement)G.width=w.naturalWidth||w.width,G.height=w.naturalHeight||w.height;else if(typeof VideoFrame<"u"&&w instanceof VideoFrame)G.width=w.displayWidth,G.height=w.displayHeight;else G.width=w.width,G.height=w.height;return G}this.allocateTextureUnit=e,this.resetTextureUnits=a,this.getTextureUnits=k,this.setTextureUnits=m,this.setTexture2D=i,this.setTexture2DArray=p,this.setTexture3D=o,this.setTextureCube=H0,this.rebindTextures=D0,this.setupRenderTarget=E0,this.updateRenderTargetMipmap=P0,this.updateMultisampleRenderTarget=Z9,this.setupDepthRenderbuffer=q0,this.setupFrameBufferTexture=y0,this.useMultisampledRTT=y,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function ID(J,Q){function $(Z,K=TJ){let U,W=q9.getTransfer(K);if(Z===$8)return J.UNSIGNED_BYTE;if(Z===ZK)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===KK)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===yH)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===fH)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===jH)return J.BYTE;if(Z===vH)return J.SHORT;if(Z===VQ)return J.UNSIGNED_SHORT;if(Z===$K)return J.INT;if(Z===GJ)return J.UNSIGNED_INT;if(Z===h8)return J.FLOAT;if(Z===E7)return J.HALF_FLOAT;if(Z===bH)return J.ALPHA;if(Z===hH)return J.RGB;if(Z===M8)return J.RGBA;if(Z===AJ)return J.DEPTH_COMPONENT;if(Z===PJ)return J.DEPTH_STENCIL;if(Z===xH)return J.RED;if(Z===UK)return J.RED_INTEGER;if(Z===wJ)return J.RG;if(Z===WK)return J.RG_INTEGER;if(Z===HK)return J.RGBA_INTEGER;if(Z===b$||Z===h$||Z===x$||Z===g$)if(W===g9)if(U=Q.get("WEBGL_compressed_texture_s3tc_srgb"),U!==null){if(Z===b$)return U.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===h$)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===x$)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===g$)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(U=Q.get("WEBGL_compressed_texture_s3tc"),U!==null){if(Z===b$)return U.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===h$)return U.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===x$)return U.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===g$)return U.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===YK||Z===GK||Z===XK||Z===NK)if(U=Q.get("WEBGL_compressed_texture_pvrtc"),U!==null){if(Z===YK)return U.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===GK)return U.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===XK)return U.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===NK)return U.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===qK||Z===FK||Z===DK||Z===EK||Z===RK||Z===p$||Z===OK)if(U=Q.get("WEBGL_compressed_texture_etc"),U!==null){if(Z===qK||Z===FK)return W===g9?U.COMPRESSED_SRGB8_ETC2:U.COMPRESSED_RGB8_ETC2;if(Z===DK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:U.COMPRESSED_RGBA8_ETC2_EAC;if(Z===EK)return U.COMPRESSED_R11_EAC;if(Z===RK)return U.COMPRESSED_SIGNED_R11_EAC;if(Z===p$)return U.COMPRESSED_RG11_EAC;if(Z===OK)return U.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===MK||Z===VK||Z===BK||Z===_K||Z===IK||Z===LK||Z===CK||Z===zK||Z===AK||Z===PK||Z===wK||Z===TK||Z===SK||Z===kK)if(U=Q.get("WEBGL_compressed_texture_astc"),U!==null){if(Z===MK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:U.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===VK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:U.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===BK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:U.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===_K)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:U.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===IK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:U.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===LK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:U.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===CK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:U.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===zK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:U.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===AK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:U.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===PK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:U.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===wK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:U.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===TK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:U.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===SK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:U.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===kK)return W===g9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:U.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===jK||Z===vK||Z===yK)if(U=Q.get("EXT_texture_compression_bptc"),U!==null){if(Z===jK)return W===g9?U.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:U.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===vK)return U.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===yK)return U.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===fK||Z===bK||Z===m$||Z===hK)if(U=Q.get("EXT_texture_compression_rgtc"),U!==null){if(Z===fK)return U.COMPRESSED_RED_RGTC1_EXT;if(Z===bK)return U.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===m$)return U.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===hK)return U.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===A6)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var LD=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,CD=`
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

}`;class mY{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new o$(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new y9({vertexShader:LD,fragmentShader:CD,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new $0(new A9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dY extends x8{constructor(J,Q){super();let $=this,Z=null,K=1,U=null,W="local-floor",H=1,Y=null,G=null,N=null,D=null,X=null,F=null,O=typeof XRWebGLBinding<"u",V=new mY,q={},E=Q.getContextAttributes(),L=null,A=null,R=[],_=[],B=new Z0,z=null,M=null,I=new e9;I.viewport=new a9;let f=new e9;f.viewport=new a9;let S=[I,f],h=new FU,a=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(n){let W0=R[n];if(W0===void 0)W0=new _Q,R[n]=W0;return W0.getTargetRaySpace()},this.getControllerGrip=function(n){let W0=R[n];if(W0===void 0)W0=new _Q,R[n]=W0;return W0.getGripSpace()},this.getHand=function(n){let W0=R[n];if(W0===void 0)W0=new _Q,R[n]=W0;return W0.getHandSpace()};function m(n){let W0=_.indexOf(n.inputSource);if(W0===-1)return;let F0=R[W0];if(F0!==void 0)F0.update(n.inputSource,n.frame,Y||U),F0.dispatchEvent({type:n.type,data:n.inputSource})}function e(){Z.removeEventListener("select",m),Z.removeEventListener("selectstart",m),Z.removeEventListener("selectend",m),Z.removeEventListener("squeeze",m),Z.removeEventListener("squeezestart",m),Z.removeEventListener("squeezeend",m),Z.removeEventListener("end",e),Z.removeEventListener("inputsourceschange",l);for(let n=0;n<R.length;n++){let W0=_[n];if(W0===null)continue;_[n]=null,R[n].disconnect(W0)}a=null,k=null,V.reset();for(let n in q)delete q[n];if(J.setRenderTarget(L),X=null,D=null,N=null,Z=null,A=null,h0.stop(),$.isPresenting=!1,J.setPixelRatio(z),J.setSize(B.width,B.height,!1),M!==null){let n=M.camera;n.fov=M.fov,n.zoom=M.zoom,n.updateProjectionMatrix(),M=null}$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(n){if(K=n,$.isPresenting===!0)o0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(n){if(W=n,$.isPresenting===!0)o0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return Y||U},this.setReferenceSpace=function(n){Y=n},this.getBaseLayer=function(){return D!==null?D:X},this.getBinding=function(){if(N===null&&O)N=new XRWebGLBinding(Z,Q);return N},this.getFrame=function(){return F},this.getSession=function(){return Z},this.setSession=async function(n){if(Z=n,Z!==null){if(L=J.getRenderTarget(),Z.addEventListener("select",m),Z.addEventListener("selectstart",m),Z.addEventListener("selectend",m),Z.addEventListener("squeeze",m),Z.addEventListener("squeezestart",m),Z.addEventListener("squeezeend",m),Z.addEventListener("end",e),Z.addEventListener("inputsourceschange",l),E.xrCompatible!==!0)await Q.makeXRCompatible();if(z=J.getPixelRatio(),J.getSize(B),!(O&&("createProjectionLayer"in XRWebGLBinding.prototype))){let F0={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:K};X=new XRWebGLLayer(Z,Q,F0),Z.updateRenderState({baseLayer:X}),J.setPixelRatio(1),J.setSize(X.framebufferWidth,X.framebufferHeight,!1),A=new W7(X.framebufferWidth,X.framebufferHeight,{format:M8,type:$8,colorSpace:J.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:X.ignoreDepthValues===!1,resolveStencilBuffer:X.ignoreDepthValues===!1,storeMultisampledDepthBuffer:X.ignoreDepthValues===!1,storeMultisampledStencilBuffer:X.ignoreDepthValues===!1})}else{let F0=null,g0=null,r0=null;if(E.depth)r0=E.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,F0=E.stencil?PJ:AJ,g0=E.stencil?A6:GJ;let y0={colorFormat:Q.RGBA8,depthFormat:r0,scaleFactor:K};N=this.getBinding(),D=N.createProjectionLayer(y0),Z.updateRenderState({layers:[D]}),J.setPixelRatio(1),J.setSize(D.textureWidth,D.textureHeight,!1),A=new W7(D.textureWidth,D.textureHeight,{format:M8,type:$8,depthTexture:new jJ(D.textureWidth,D.textureHeight,g0,void 0,void 0,void 0,void 0,void 0,void 0,F0),stencilBuffer:E.stencil,colorSpace:J.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:D.ignoreDepthValues===!1,resolveStencilBuffer:D.ignoreDepthValues===!1,storeMultisampledDepthBuffer:D.ignoreDepthValues===!1,storeMultisampledStencilBuffer:D.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(H),Y=null,U=await Z.requestReferenceSpace(W),h0.setContext(Z),h0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return V.getDepthTexture()};function l(n){for(let W0=0;W0<n.removed.length;W0++){let F0=n.removed[W0],g0=_.indexOf(F0);if(g0>=0)_[g0]=null,R[g0].disconnect(F0)}for(let W0=0;W0<n.added.length;W0++){let F0=n.added[W0],g0=_.indexOf(F0);if(g0===-1){for(let y0=0;y0<R.length;y0++)if(y0>=_.length){_.push(F0),g0=y0;break}else if(_[y0]===null){_[y0]=F0,g0=y0;break}if(g0===-1)break}let r0=R[g0];if(r0)r0.connect(F0)}}let i=new T,p=new T;function o(n,W0,F0){i.setFromMatrixPosition(W0.matrixWorld),p.setFromMatrixPosition(F0.matrixWorld);let g0=i.distanceTo(p),r0=W0.projectionMatrix.elements,y0=F0.projectionMatrix.elements,b9=r0[14]/(r0[10]-1),K0=r0[14]/(r0[10]+1),q0=(r0[9]+1)/r0[5],D0=(r0[9]-1)/r0[5],E0=(r0[8]-1)/r0[0],P0=(y0[8]+1)/y0[0],d0=b9*E0,n0=b9*P0,Z9=g0/(-E0+P0),K9=Z9*-E0;if(W0.matrixWorld.decompose(n.position,n.quaternion,n.scale),n.translateX(K9),n.translateZ(Z9),n.matrixWorld.compose(n.position,n.quaternion,n.scale),n.matrixWorldInverse.copy(n.matrixWorld).invert(),r0[10]===-1)n.projectionMatrix.copy(W0.projectionMatrix),n.projectionMatrixInverse.copy(W0.projectionMatrixInverse);else{let y=b9+Z9,m9=K0+Z9,N9=d0-K9,R9=n0+(g0-K9),w=q0*K0/m9*y,C=D0*K0/m9*y;n.projectionMatrix.makePerspective(N9,R9,w,C,y,m9),n.projectionMatrixInverse.copy(n.projectionMatrix).invert()}}function H0(n,W0){if(W0===null)n.matrixWorld.copy(n.matrix);else n.matrixWorld.multiplyMatrices(W0.matrixWorld,n.matrix);n.matrixWorldInverse.copy(n.matrixWorld).invert()}this.updateCamera=function(n){if(Z===null)return;let{near:W0,far:F0}=n;if(V.texture!==null){if(V.depthNear>0)W0=V.depthNear;if(V.depthFar>0)F0=V.depthFar}if(h.near=f.near=I.near=W0,h.far=f.far=I.far=F0,a!==h.near||k!==h.far)Z.updateRenderState({depthNear:h.near,depthFar:h.far}),a=h.near,k=h.far;h.layers.mask=n.layers.mask|6,I.layers.mask=h.layers.mask&-5,f.layers.mask=h.layers.mask&-3;let g0=n.parent,r0=h.cameras;H0(h,g0);for(let y0=0;y0<r0.length;y0++)H0(r0[y0],g0);if(r0.length===2)o(h,I,f);else h.projectionMatrix.copy(I.projectionMatrix);if(M===null&&n.isPerspectiveCamera)M={camera:n,fov:n.fov,zoom:n.zoom};S0(n,h,g0)};function S0(n,W0,F0){if(F0===null)n.matrix.copy(W0.matrixWorld);else n.matrix.copy(F0.matrixWorld),n.matrix.invert(),n.matrix.multiply(W0.matrixWorld);if(n.matrix.decompose(n.position,n.quaternion,n.scale),n.updateMatrixWorld(!0),n.projectionMatrix.copy(W0.projectionMatrix),n.projectionMatrixInverse.copy(W0.projectionMatrixInverse),n.isPerspectiveCamera)n.fov=KQ*2*Math.atan(1/n.projectionMatrix.elements[5]),n.zoom=1}this.getCamera=function(){return h},this.getFoveation=function(){if(D===null&&X===null)return;return H},this.setFoveation=function(n){if(H=n,D!==null)D.fixedFoveation=n;if(X!==null&&X.fixedFoveation!==void 0)X.fixedFoveation=n},this.hasDepthSensing=function(){return V.texture!==null},this.getDepthSensingMesh=function(){return V.getMesh(h)},this.getCameraTexture=function(n){return q[n]};let x0=null;function t(n,W0){if(G=W0.getViewerPose(Y||U),F=W0,G!==null){let F0=G.views;if(X!==null)J.setRenderTargetFramebuffer(A,X.framebuffer),J.setRenderTarget(A);let g0=!1;if(F0.length!==h.cameras.length)h.cameras.length=0,g0=!0;for(let K0=0;K0<F0.length;K0++){let q0=F0[K0],D0=null;if(X!==null)D0=X.getViewport(q0);else{let P0=N.getViewSubImage(D,q0);if(D0=P0.viewport,K0===0)J.setRenderTargetTextures(A,P0.colorTexture,P0.depthStencilTexture),J.setRenderTarget(A)}let E0=S[K0];if(E0===void 0)E0=new e9,E0.layers.enable(K0),E0.viewport=new a9,S[K0]=E0;if(E0.matrix.fromArray(q0.transform.matrix),E0.matrix.decompose(E0.position,E0.quaternion,E0.scale),E0.projectionMatrix.fromArray(q0.projectionMatrix),E0.projectionMatrixInverse.copy(E0.projectionMatrix).invert(),E0.viewport.set(D0.x,D0.y,D0.width,D0.height),K0===0)h.matrix.copy(E0.matrix),h.matrix.decompose(h.position,h.quaternion,h.scale);if(g0===!0)h.cameras.push(E0)}let r0=Z.enabledFeatures;if(r0&&r0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&O){N=$.getBinding();let K0=N.getDepthInformation(F0[0]);if(K0&&K0.isValid&&K0.texture)V.init(K0,Z.renderState)}if(r0&&r0.includes("camera-access")&&O){J.state.unbindTexture(),N=$.getBinding();for(let K0=0;K0<F0.length;K0++){let q0=F0[K0].camera;if(q0){let D0=q[q0];if(!D0)D0=new o$,q[q0]=D0;let E0=N.getCameraImage(q0);D0.sourceTexture=E0}}}}for(let F0=0;F0<R.length;F0++){let g0=_[F0],r0=R[F0];if(g0!==null&&r0!==void 0)r0.update(g0,W0,Y||U)}if(x0)x0(n,W0);if(W0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:W0});F=null}let h0=new SY;h0.setAnimationLoop(t),this.setAnimationLoop=function(n){x0=n},this.dispose=function(){}}}var zD=new z9,uY=new $9;uY.set(-1,0,0,0,1,0,0,0,1);function AD(J,Q){function $(q,E){if(q.matrixAutoUpdate===!0)q.updateMatrix();E.value.copy(q.matrix)}function Z(q,E){if(E.color.getRGB(q.fogColor.value,JU(J)),E.isFog)q.fogNear.value=E.near,q.fogFar.value=E.far;else if(E.isFogExp2)q.fogDensity.value=E.density}function K(q,E,L,A,R){if(E.isNodeMaterial)E.uniformsNeedUpdate=!1;else if(E.isMeshBasicMaterial)U(q,E);else if(E.isMeshLambertMaterial){if(U(q,E),E.envMap)q.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshToonMaterial)U(q,E),D(q,E);else if(E.isMeshPhongMaterial){if(U(q,E),N(q,E),E.envMap)q.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshStandardMaterial){if(U(q,E),X(q,E),E.isMeshPhysicalMaterial)F(q,E,R)}else if(E.isMeshMatcapMaterial)U(q,E),O(q,E);else if(E.isMeshDepthMaterial)U(q,E);else if(E.isMeshDistanceMaterial)U(q,E),V(q,E);else if(E.isMeshNormalMaterial)U(q,E);else if(E.isLineBasicMaterial){if(W(q,E),E.isLineDashedMaterial)H(q,E)}else if(E.isPointsMaterial)Y(q,E,L,A);else if(E.isSpriteMaterial)G(q,E);else if(E.isShadowMaterial)q.color.value.copy(E.color),q.opacity.value=E.opacity;else if(E.isShaderMaterial)E.uniformsNeedUpdate=!1}function U(q,E){if(q.opacity.value=E.opacity,E.color)q.diffuse.value.copy(E.color);if(E.emissive)q.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity);if(E.map)q.map.value=E.map,$(E.map,q.mapTransform);if(E.alphaMap)q.alphaMap.value=E.alphaMap,$(E.alphaMap,q.alphaMapTransform);if(E.bumpMap){if(q.bumpMap.value=E.bumpMap,$(E.bumpMap,q.bumpMapTransform),q.bumpScale.value=E.bumpScale,E.side===X7)q.bumpScale.value*=-1}if(E.normalMap){if(q.normalMap.value=E.normalMap,$(E.normalMap,q.normalMapTransform),q.normalScale.value.copy(E.normalScale),E.side===X7)q.normalScale.value.negate()}if(E.displacementMap)q.displacementMap.value=E.displacementMap,$(E.displacementMap,q.displacementMapTransform),q.displacementScale.value=E.displacementScale,q.displacementBias.value=E.displacementBias;if(E.emissiveMap)q.emissiveMap.value=E.emissiveMap,$(E.emissiveMap,q.emissiveMapTransform);if(E.specularMap)q.specularMap.value=E.specularMap,$(E.specularMap,q.specularMapTransform);if(E.alphaTest>0)q.alphaTest.value=E.alphaTest;let L=Q.get(E),A=L.envMap,R=L.envMapRotation;if(A){if(q.envMap.value=A,q.envMapRotation.value.setFromMatrix4(zD.makeRotationFromEuler(R)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1)q.envMapRotation.value.premultiply(uY);q.reflectivity.value=E.reflectivity,q.ior.value=E.ior,q.refractionRatio.value=E.refractionRatio}if(E.lightMap)q.lightMap.value=E.lightMap,q.lightMapIntensity.value=E.lightMapIntensity,$(E.lightMap,q.lightMapTransform);if(E.aoMap)q.aoMap.value=E.aoMap,q.aoMapIntensity.value=E.aoMapIntensity,$(E.aoMap,q.aoMapTransform)}function W(q,E){if(q.diffuse.value.copy(E.color),q.opacity.value=E.opacity,E.map)q.map.value=E.map,$(E.map,q.mapTransform)}function H(q,E){q.dashSize.value=E.dashSize,q.totalSize.value=E.dashSize+E.gapSize,q.scale.value=E.scale}function Y(q,E,L,A){if(q.diffuse.value.copy(E.color),q.opacity.value=E.opacity,q.size.value=E.size*L,q.scale.value=A*0.5,E.map)q.map.value=E.map,$(E.map,q.uvTransform);if(E.alphaMap)q.alphaMap.value=E.alphaMap,$(E.alphaMap,q.alphaMapTransform);if(E.alphaTest>0)q.alphaTest.value=E.alphaTest}function G(q,E){if(q.diffuse.value.copy(E.color),q.opacity.value=E.opacity,q.rotation.value=E.rotation,E.map)q.map.value=E.map,$(E.map,q.mapTransform);if(E.alphaMap)q.alphaMap.value=E.alphaMap,$(E.alphaMap,q.alphaMapTransform);if(E.alphaTest>0)q.alphaTest.value=E.alphaTest}function N(q,E){q.specular.value.copy(E.specular),q.shininess.value=Math.max(E.shininess,0.0001)}function D(q,E){if(E.gradientMap)q.gradientMap.value=E.gradientMap}function X(q,E){if(q.metalness.value=E.metalness,E.metalnessMap)q.metalnessMap.value=E.metalnessMap,$(E.metalnessMap,q.metalnessMapTransform);if(q.roughness.value=E.roughness,E.roughnessMap)q.roughnessMap.value=E.roughnessMap,$(E.roughnessMap,q.roughnessMapTransform);if(E.envMap)q.envMapIntensity.value=E.envMapIntensity}function F(q,E,L){if(q.ior.value=E.ior,E.sheen>0){if(q.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),q.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap)q.sheenColorMap.value=E.sheenColorMap,$(E.sheenColorMap,q.sheenColorMapTransform);if(E.sheenRoughnessMap)q.sheenRoughnessMap.value=E.sheenRoughnessMap,$(E.sheenRoughnessMap,q.sheenRoughnessMapTransform)}if(E.clearcoat>0){if(q.clearcoat.value=E.clearcoat,q.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap)q.clearcoatMap.value=E.clearcoatMap,$(E.clearcoatMap,q.clearcoatMapTransform);if(E.clearcoatRoughnessMap)q.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,$(E.clearcoatRoughnessMap,q.clearcoatRoughnessMapTransform);if(E.clearcoatNormalMap){if(q.clearcoatNormalMap.value=E.clearcoatNormalMap,$(E.clearcoatNormalMap,q.clearcoatNormalMapTransform),q.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===X7)q.clearcoatNormalScale.value.negate()}}if(E.dispersion>0)q.dispersion.value=E.dispersion;if(E.retroreflectivity>0)q.retroreflectivity.value=E.retroreflectivity;if(E.iridescence>0){if(q.iridescence.value=E.iridescence,q.iridescenceIOR.value=E.iridescenceIOR,q.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],q.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap)q.iridescenceMap.value=E.iridescenceMap,$(E.iridescenceMap,q.iridescenceMapTransform);if(E.iridescenceThicknessMap)q.iridescenceThicknessMap.value=E.iridescenceThicknessMap,$(E.iridescenceThicknessMap,q.iridescenceThicknessMapTransform)}if(E.transmission>0){if(q.transmission.value=E.transmission,q.transmissionSamplerMap.value=L.texture,q.transmissionSamplerSize.value.set(L.width,L.height),E.transmissionMap)q.transmissionMap.value=E.transmissionMap,$(E.transmissionMap,q.transmissionMapTransform);if(q.thickness.value=E.thickness,E.thicknessMap)q.thicknessMap.value=E.thicknessMap,$(E.thicknessMap,q.thicknessMapTransform);q.attenuationDistance.value=E.attenuationDistance,q.attenuationColor.value.copy(E.attenuationColor)}if(E.anisotropy>0){if(q.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap)q.anisotropyMap.value=E.anisotropyMap,$(E.anisotropyMap,q.anisotropyMapTransform)}if(q.specularIntensity.value=E.specularIntensity,q.specularColor.value.copy(E.specularColor),E.specularColorMap)q.specularColorMap.value=E.specularColorMap,$(E.specularColorMap,q.specularColorMapTransform);if(E.specularIntensityMap)q.specularIntensityMap.value=E.specularIntensityMap,$(E.specularIntensityMap,q.specularIntensityMapTransform)}function O(q,E){if(E.matcap)q.matcap.value=E.matcap}function V(q,E){let L=Q.get(E).light;q.referencePosition.value.setFromMatrixPosition(L.matrixWorld),q.nearDistance.value=L.shadow.camera.near,q.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:K}}function PD(J,Q,$,Z){let K={},U={},W=[],H=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function Y(R,_){let B=_.program;Z.uniformBlockBinding(R,B)}function G(R,_){let B=K[R.id];if(B===void 0)q(R),B=N(R),K[R.id]=B,R.addEventListener("dispose",L);let z=_.program;Z.updateUBOMapping(R,z);let M=Q.render.frame;if(U[R.id]!==M)X(R),U[R.id]=M}function N(R){let _=D();R.__bindingPointIndex=_;let B=J.createBuffer(),z=R.__size,M=R.usage;return J.bindBuffer(J.UNIFORM_BUFFER,B),J.bufferData(J.UNIFORM_BUFFER,z,M),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,_,B),B}function D(){for(let R=0;R<H;R++)if(W.indexOf(R)===-1)return W.push(R),R;return e0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function X(R){let _=K[R.id],B=R.uniforms,z=R.__cache;J.bindBuffer(J.UNIFORM_BUFFER,_);for(let M=0,I=B.length;M<I;M++){let f=B[M];if(Array.isArray(f))for(let S=0,h=f.length;S<h;S++)F(f[S],M,S,z);else F(f,M,0,z)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(R,_,B,z){if(V(R,_,B,z)===!0){let{__offset:M,value:I}=R;if(Array.isArray(I)){let f=0;for(let S=0;S<I.length;S++){let h=I[S],a=E(h);if(O(h,R.__data,f),typeof h!=="number"&&typeof h!=="boolean"&&!h.isMatrix3&&!ArrayBuffer.isView(h))f+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else O(I,R.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,M,R.__data)}}function O(R,_,B){if(typeof R==="number"||typeof R==="boolean")_[0]=R;else if(R.isMatrix3)_[0]=R.elements[0],_[1]=R.elements[1],_[2]=R.elements[2],_[3]=0,_[4]=R.elements[3],_[5]=R.elements[4],_[6]=R.elements[5],_[7]=0,_[8]=R.elements[6],_[9]=R.elements[7],_[10]=R.elements[8],_[11]=0;else if(ArrayBuffer.isView(R))_.set(new R.constructor(R.buffer,R.byteOffset,_.length));else R.toArray(_,B)}function V(R,_,B,z){let M=R.value,I=_+"_"+B;if(z[I]===void 0){if(typeof M==="number"||typeof M==="boolean")z[I]=M;else if(ArrayBuffer.isView(M))z[I]=M.slice();else z[I]=M.clone();return!0}else{let f=z[I];if(typeof M==="number"||typeof M==="boolean"){if(f!==M)return z[I]=M,!0}else if(ArrayBuffer.isView(M))return!0;else if(f.equals(M)===!1)return f.copy(M),!0}return!1}function q(R){let _=R.uniforms,B=0,z=16;for(let I=0,f=_.length;I<f;I++){let S=Array.isArray(_[I])?_[I]:[_[I]];for(let h=0,a=S.length;h<a;h++){let k=S[h],m=Array.isArray(k.value)?k.value:[k.value];for(let e=0,l=m.length;e<l;e++){let i=m[e],p=E(i),o=B%z,H0=o%p.boundary,S0=o+H0;if(B+=H0,S0!==0&&z-S0<p.storage)B+=z-S0;k.__data=new Float32Array(p.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=B,B+=p.storage}}}let M=B%z;if(M>0)B+=z-M;return R.__size=B,R.__cache={},this}function E(R){let _={boundary:0,storage:0};if(typeof R==="number"||typeof R==="boolean")_.boundary=4,_.storage=4;else if(R.isVector2)_.boundary=8,_.storage=8;else if(R.isVector3||R.isColor)_.boundary=16,_.storage=12;else if(R.isVector4)_.boundary=16,_.storage=16;else if(R.isMatrix3)_.boundary=48,_.storage=48;else if(R.isMatrix4)_.boundary=64,_.storage=64;else if(R.isTexture)o0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(R))_.boundary=16,_.storage=R.byteLength;else o0("WebGLRenderer: Unsupported uniform value type.",R);return _}function L(R){let _=R.target;_.removeEventListener("dispose",L);let B=W.indexOf(_.__bindingPointIndex);W.splice(B,1),J.deleteBuffer(K[_.id]),delete K[_.id],delete U[_.id]}function A(){for(let R in K)J.deleteBuffer(K[R]);W=[],K={},U={}}return{bind:Y,update:G,dispose:A}}var wD=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),_8=null;function TD(){if(_8===null)_8=new w6(wD,16,16,wJ,E7),_8.name="DFG_LUT",_8.minFilter=k7,_8.magFilter=k7,_8.wrapS=y$,_8.wrapT=y$,_8.generateMipmaps=!1,_8.needsUpdate=!0;return _8}class m8{constructor(J={}){let{canvas:Q=nH(),context:$=null,depth:Z=!0,stencil:K=!1,alpha:U=!1,antialias:W=!1,premultipliedAlpha:H=!0,preserveDrawingBuffer:Y=!1,powerPreference:G="default",failIfMajorPerformanceCaveat:N=!1,reversedDepthBuffer:D=!1,outputBufferType:X=$8}=J;this.isWebGLRenderer=!0;let F;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=$.getContextAttributes().alpha}else F=U;let O=X,V=new Set([HK,WK,UK]),q=new Set([$8,GJ,VQ,A6,ZK,KK]),E=new Uint32Array(4),L=new Int32Array(4),A=new T,R=null,_=null,B=[],z=[],M=null;this.domElement=Q,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Q8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,f=!1,S=null,h=null,a=null,k=null;this._outputColorSpace=u7;let m=0,e=0,l=null,i=-1,p=null,o=new a9,H0=new a9,S0=null,x0=new U0(0),t=0,h0=Q.width,n=Q.height,W0=1,F0=null,g0=null,r0=new a9(0,0,h0,n),y0=new a9(0,0,h0,n),b9=!1,K0=new CQ,q0=!1,D0=!1,E0=new z9,P0=new T,d0=new a9,n0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Z9=!1;function K9(){return l===null?W0:1}let y=$;function m9(P,x){return Q.getContext(P,x)}let N9,R9,w,C,b,c,Y0,R0,V0,r,Q0,T0,u0,L0,O0,s0,t0,w9,g,B0,J0,I0,k0;try{let P={alpha:!0,depth:Z,stencil:K,antialias:W,premultipliedAlpha:H,preserveDrawingBuffer:Y,powerPreference:G,failIfMajorPerformanceCaveat:N};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${rW}`);if(Q.addEventListener("webglcontextlost",U9,!1),Q.addEventListener("webglcontextrestored",s9,!1),Q.addEventListener("webglcontextcreationerror",j9,!1),y===null){if(y=m9("webgl2",P),y===null)if(m9("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}G0()}catch(P){throw Q.removeEventListener("webglcontextlost",U9,!1),Q.removeEventListener("webglcontextrestored",s9,!1),Q.removeEventListener("webglcontextcreationerror",j9,!1),e0("WebGLRenderer: "+P.message),P}function G0(){if(N9=new bq(y),N9.init(),J0=new ID(y,N9),R9=new Aq(y,N9,J,J0),w=new BD(y,N9),R9.reversedDepthBuffer&&D)w.buffers.depth.setReversed(!0);h=y.createFramebuffer(),a=y.createFramebuffer(),k=y.createFramebuffer(),C=new gq(y),b=new WD,c=new _D(y,N9,w,b,R9,J0,C),Y0=new fq(I),R0=new mG(y),I0=new Cq(y,R0),V0=new hq(y,R0,C,I0),r=new mq(y,V0,R0,I0,C),w9=new pq(y,R9,c),O0=new Pq(b),Q0=new UD(I,Y0,N9,R9,I0,O0),T0=new AD(I,b),u0=new YD,L0=new DD(N9),t0=new Lq(I,Y0,w,r,F,H),s0=new VD(I,r,R9),k0=new PD(y,C,R9,w),g=new zq(y,N9,C),B0=new xq(y,N9,C),C.programs=Q0.programs,I.capabilities=R9,I.extensions=N9,I.properties=b,I.renderLists=u0,I.shadowMap=s0,I.state=w,I.info=C}if(O!==$8)M=new uq(O,Q.width,Q.height,W,Z,K);let z0=new dY(I,y);this.xr=z0,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){let P=N9.get("WEBGL_lose_context");if(P)P.loseContext()},this.forceContextRestore=function(){let P=N9.get("WEBGL_lose_context");if(P)P.restoreContext()},this.getPixelRatio=function(){return W0},this.setPixelRatio=function(P){if(P===void 0)return;W0=P,this.setSize(h0,n,!1)},this.getSize=function(P){return P.set(h0,n)},this.setSize=function(P,x,s=!0){if(z0.isPresenting){o0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(h0=P,n=x,Q.width=Math.floor(P*W0),Q.height=Math.floor(x*W0),s===!0)Q.style.width=P+"px",Q.style.height=x+"px";if(M!==null)M.setSize(Q.width,Q.height);this.setViewport(0,0,P,x)},this.getDrawingBufferSize=function(P){return P.set(h0*W0,n*W0).floor()},this.setDrawingBufferSize=function(P,x,s){h0=P,n=x,W0=s,Q.width=Math.floor(P*s),Q.height=Math.floor(x*s),this.setViewport(0,0,P,x)},this.setEffects=function(P){if(O===$8){e0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(P){for(let x=0;x<P.length;x++)if(P[x].isOutputPass===!0){o0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(P||[])},this.getCurrentViewport=function(P){return P.copy(o)},this.getViewport=function(P){return P.copy(r0)},this.setViewport=function(P,x,s,d){if(P.isVector4)r0.set(P.x,P.y,P.z,P.w);else r0.set(P,x,s,d);w.viewport(o.copy(r0).multiplyScalar(W0).round())},this.getScissor=function(P){return P.copy(y0)},this.setScissor=function(P,x,s,d){if(P.isVector4)y0.set(P.x,P.y,P.z,P.w);else y0.set(P,x,s,d);w.scissor(H0.copy(y0).multiplyScalar(W0).round())},this.getScissorTest=function(){return b9},this.setScissorTest=function(P){w.setScissorTest(b9=P)},this.setOpaqueSort=function(P){F0=P},this.setTransparentSort=function(P){g0=P},this.getClearColor=function(P){return P.copy(t0.getClearColor())},this.setClearColor=function(){t0.setClearColor(...arguments)},this.getClearAlpha=function(){return t0.getClearAlpha()},this.setClearAlpha=function(){t0.setClearAlpha(...arguments)},this.clear=function(P=!0,x=!0,s=!0){let d=0;if(P){let u=!1;if(l!==null){let w0=l.texture.format;u=V.has(w0)}if(u){let w0=l.texture.type,v0=q.has(w0),A0=t0.getClearColor(),f0=t0.getClearAlpha(),p0=A0.r,Y9=A0.g,O9=A0.b;if(v0)E[0]=p0,E[1]=Y9,E[2]=O9,E[3]=f0,y.clearBufferuiv(y.COLOR,0,E);else L[0]=p0,L[1]=Y9,L[2]=O9,L[3]=f0,y.clearBufferiv(y.COLOR,0,L)}else d|=y.COLOR_BUFFER_BIT}if(x)d|=y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(s)d|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(d!==0)y.clear(d)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(P){P.setRenderer(this),S=P},this.dispose=function(){Q.removeEventListener("webglcontextlost",U9,!1),Q.removeEventListener("webglcontextrestored",s9,!1),Q.removeEventListener("webglcontextcreationerror",j9,!1),t0.dispose(),u0.dispose(),L0.dispose(),b.dispose(),Y0.dispose(),r.dispose(),I0.dispose(),k0.dispose(),Q0.dispose(),z0.dispose(),z0.removeEventListener("sessionstart",JW),z0.removeEventListener("sessionend",QW),RJ.stop()};function U9(P){P.preventDefault(),ZQ("WebGLRenderer: Context Lost."),f=!0}function s9(){ZQ("WebGLRenderer: Context Restored."),f=!1;let P=C.autoReset,x=s0.enabled,s=s0.autoUpdate,d=s0.needsUpdate,u=s0.type;G0(),C.autoReset=P,s0.enabled=x,s0.autoUpdate=s,s0.needsUpdate=d,s0.type=u}function j9(P){e0("WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function F8(P){let x=P.target;x.removeEventListener("dispose",F8),A8(x)}function A8(P){z5(P),b.remove(P)}function z5(P){let x=b.get(P).programs;if(x!==void 0){if(x.forEach(function(s){Q0.releaseProgram(s)}),P.isShaderMaterial)Q0.releaseShaderCache(P)}}this.renderBufferDirect=function(P,x,s,d,u,w0){if(x===null)x=n0;let v0=u.isMesh&&u.matrixWorld.determinantAffine()<0,A0=w5(P,x,s,d,u);w.setMaterial(d,v0);let f0=s.index,p0=1;if(d.wireframe===!0){if(f0=V0.getWireframeAttribute(s),f0===void 0)return;p0=2}let Y9=s.drawRange,O9=s.attributes.position,b0=Y9.start*p0,v9=(Y9.start+Y9.count)*p0;if(w0!==null)b0=Math.max(b0,w0.start*p0),v9=Math.min(v9,(w0.start+w0.count)*p0);if(f0!==null)b0=Math.max(b0,0),v9=Math.min(v9,f0.count);else if(O9!==void 0&&O9!==null)b0=Math.max(b0,0),v9=Math.min(v9,O9.count);let Y7=v9-b0;if(Y7<0||Y7===1/0)return;I0.setup(u,d,A0,s,f0);let o9,n9=g;if(f0!==null)o9=R0.get(f0),n9=B0,n9.setIndex(o9);if(u.isMesh)if(d.wireframe===!0)w.setLineWidth(d.wireframeLinewidth*K9()),n9.setMode(y.LINES);else n9.setMode(y.TRIANGLES);else if(u.isLine){let B7=d.linewidth;if(B7===void 0)B7=1;if(w.setLineWidth(B7*K9()),u.isLineSegments)n9.setMode(y.LINES);else if(u.isLineLoop)n9.setMode(y.LINE_LOOP);else n9.setMode(y.LINE_STRIP)}else if(u.isPoints)n9.setMode(y.POINTS);else if(u.isSprite)n9.setMode(y.TRIANGLES);if(u.isBatchedMesh)if(!N9.get("WEBGL_multi_draw")){let{_multiDrawStarts:B7,_multiDrawCounts:j0,_multiDrawCount:z7}=u,C9=f0?R0.get(f0).bytesPerElement:1,c7=b.get(d).currentProgram.getUniforms();for(let D8=0;D8<z7;D8++)c7.setValue(y,"_gl_DrawID",D8),n9.render(B7[D8]/C9,j0[D8])}else n9.renderMultiDraw(u._multiDrawStarts,u._multiDrawCounts,u._multiDrawCount);else if(u.isInstancedMesh)n9.renderInstances(b0,Y7,u.count);else if(s.isInstancedBufferGeometry){let B7=s._maxInstanceCount!==void 0?s._maxInstanceCount:1/0,j0=Math.min(s.instanceCount,B7);n9.renderInstances(b0,Y7,j0)}else n9.render(b0,Y7)};function eU(P,x,s,d){if(S!==null&&P.isNodeMaterial)S.setObject(d,P);if(q0===!0)O0.setState(P,s,!1);if(P.transparent===!0&&P.side===r9&&P.forceSinglePass===!1)P.side=X7,P.needsUpdate=!0,sQ(P,x,d),P.side=L6,P.needsUpdate=!0,sQ(P,x,d),P.side=r9;else sQ(P,x,d)}this.compile=function(P,x,s=null){if(s===null)s=P;if(S!==null)S.renderStart(P,x,s);if(_=L0.get(s),_.init(x),z.push(_),s.traverseVisible(function(u){if(u.isLight&&u.layers.test(x.layers)){if(_.pushLight(u),u.castShadow)_.pushShadow(u)}}),P!==s)P.traverseVisible(function(u){if(u.isLight&&u.layers.test(x.layers)){if(_.pushLight(u),u.castShadow)_.pushShadow(u)}});if(_.setupLights(),S!==null)S.updateLights(_.state.lightsArray);if(D0=this.localClippingEnabled,q0=O0.init(this.clippingPlanes,D0),q0===!0)O0.setGlobalState(this.clippingPlanes,x);if(S!==null)s0.render(_.state.shadowsArray,s,x);let d=new Set;if(P.traverse(function(u){if(!(u.isMesh||u.isPoints||u.isLine||u.isSprite))return;let w0=u.material;if(w0)if(Array.isArray(w0))for(let v0=0;v0<w0.length;v0++){let A0=w0[v0];eU(A0,s,x,u),d.add(A0)}else eU(w0,s,x,u),d.add(w0)}),_=z.pop(),S!==null)S.renderEnd();return d},this.compileAsync=function(P,x,s=null){let d=this.compile(P,x,s);return new Promise((u)=>{function w0(){if(d.forEach(function(v0){let f0=b.get(v0).currentProgram;if(f0===void 0||f0.isReady())d.delete(v0)}),d.size===0){u(P);return}setTimeout(w0,10)}if(N9.get("KHR_parallel_shader_compile")!==null)w0();else setTimeout(w0,10)})};let VZ=null;function A5(P){if(VZ)VZ(P)}function JW(){RJ.stop()}function QW(){RJ.start()}let RJ=new SY;if(RJ.setAnimationLoop(A5),typeof self<"u")RJ.setContext(self);this.setAnimationLoop=function(P){VZ=P,z0.setAnimationLoop(P),P===null?RJ.stop():RJ.start()},z0.addEventListener("sessionstart",JW),z0.addEventListener("sessionend",QW),this.render=function(P,x){if(x!==void 0&&x.isCamera!==!0){e0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(f===!0)return;if(S!==null)S.renderStart(P,x);let s=z0.enabled===!0&&z0.isPresenting===!0,d=M!==null&&(l===null||s)&&M.begin(I,l);if(P.matrixWorldAutoUpdate===!0)P.updateMatrixWorld();if(x.parent===null&&x.matrixWorldAutoUpdate===!0)x.updateMatrixWorld();if(z0.enabled===!0&&z0.isPresenting===!0&&(M===null||M.isCompositing()===!1)){if(z0.cameraAutoUpdate===!0)z0.updateCamera(x);x=z0.getCamera()}if(P.isScene===!0)P.onBeforeRender(I,P,x,l);if(_=L0.get(P,z.length),_.init(x),_.state.textureUnits=c.getTextureUnits(),z.push(_),E0.multiplyMatrices(x.projectionMatrix,x.matrixWorldInverse),K0.setFromProjectionMatrix(E0,uK,x.reversedDepth),D0=this.localClippingEnabled,q0=O0.init(this.clippingPlanes,D0),R=u0.get(P,B.length),R.init(),B.push(R),z0.enabled===!0&&z0.isPresenting===!0){let v0=I.xr.getDepthSensingMesh();if(v0!==null)BZ(v0,x,-1/0,I.sortObjects)}if(BZ(P,x,0,I.sortObjects),R.finish(),S!==null)S.updateLights(_.state.lightsArray);if(I.sortObjects===!0)R.sort(F0,g0);if(Z9=z0.enabled===!1||z0.isPresenting===!1||z0.hasDepthSensing()===!1,Z9)t0.addToRenderList(R,P);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(q0===!0)O0.beginShadows();let u=_.state.shadowsArray;if(s0.render(u,P,x),q0===!0)O0.endShadows();if((d&&M.hasRenderPass())===!1){let{opaque:v0,transmissive:A0}=R;if(_.setupLights(),x.isArrayCamera){let f0=x.cameras;if(A0.length>0)for(let p0=0,Y9=f0.length;p0<Y9;p0++){let O9=f0[p0];ZW(v0,A0,P,O9)}if(Z9)t0.render(P);for(let p0=0,Y9=f0.length;p0<Y9;p0++){let O9=f0[p0];$W(R,P,O9,O9.viewport)}}else{if(A0.length>0)ZW(v0,A0,P,x);if(Z9)t0.render(P);$W(R,P,x)}}if(l!==null&&e===0)c.updateMultisampleRenderTarget(l),c.updateRenderTargetMipmap(l);if(d)M.end(I);if(P.isScene===!0)P.onAfterRender(I,P,x);if(I0.resetDefaultState(),i=-1,p=null,z.pop(),z.length>0){if(_=z[z.length-1],c.setTextureUnits(_.state.textureUnits),q0===!0)O0.setGlobalState(I.clippingPlanes,_.state.camera)}else _=null;if(B.pop(),B.length>0)R=B[B.length-1];else R=null;if(S!==null)S.renderEnd()};function BZ(P,x,s,d){if(P.visible===!1)return;if(P.layers.test(x.layers)){if(P.isGroup)s=P.renderOrder;else if(P.isLOD){if(P.autoUpdate===!0)P.update(x)}else if(P.isLightProbeGrid)_.pushLightProbeGrid(P);else if(P.isLight){if(_.pushLight(P),P.castShadow)_.pushShadow(P)}else if(P.isSprite){if(!P.frustumCulled||P.intersectsFrustum(K0)){if(d)d0.setFromMatrixPosition(P.matrixWorld).applyMatrix4(E0);let v0=r.update(P),A0=P.material;if(A0.visible)R.push(P,v0,A0,s,d0.z,null,x)}}else if(P.isMesh||P.isLine||P.isPoints){if(!P.frustumCulled||P.intersectsFrustum(K0)){let v0=r.update(P),A0=P.material;if(d){if(P.boundingSphere!==void 0){if(P.boundingSphere===null)P.computeBoundingSphere();d0.copy(P.boundingSphere.center)}else{if(v0.boundingSphere===null)v0.computeBoundingSphere();d0.copy(v0.boundingSphere.center)}d0.applyMatrix4(P.matrixWorld).applyMatrix4(E0)}if(Array.isArray(A0)){let f0=v0.groups;for(let p0=0,Y9=f0.length;p0<Y9;p0++){let O9=f0[p0],b0=A0[O9.materialIndex];if(b0&&b0.visible)R.push(P,v0,b0,s,d0.z,O9,x)}}else if(A0.visible)R.push(P,v0,A0,s,d0.z,null,x)}}}let w0=P.children;for(let v0=0,A0=w0.length;v0<A0;v0++)BZ(w0[v0],x,s,d)}function $W(P,x,s,d){let{opaque:u,transmissive:w0,transparent:v0}=P;if(_.setupLightsView(s),q0===!0)O0.setGlobalState(I.clippingPlanes,s);if(d)w.viewport(o.copy(d));if(u.length>0)nQ(u,x,s);if(w0.length>0)nQ(w0,x,s);if(v0.length>0)nQ(v0,x,s);w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function ZW(P,x,s,d){if((s.isScene===!0?s.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget[d.id]===void 0){let b0=N9.has("EXT_color_buffer_half_float")||N9.has("EXT_color_buffer_float");_.state.transmissionRenderTarget[d.id]=new W7(1,1,{generateMipmaps:!0,type:b0?E7:$8,minFilter:zJ,samples:Math.max(4,R9.samples),stencilBuffer:K,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:q9.workingColorSpace})}let w0=_.state.transmissionRenderTarget[d.id],v0=d.viewport||o;w0.setSize(v0.z*I.transmissionResolutionScale,v0.w*I.transmissionResolutionScale);let A0=I.getRenderTarget(),f0=I.getActiveCubeFace(),p0=I.getActiveMipmapLevel();if(I.setRenderTarget(w0),I.getClearColor(x0),t=I.getClearAlpha(),t<1)I.setClearColor(16777215,0.5);if(I.clear(),Z9)t0.render(s);let Y9=I.toneMapping;I.toneMapping=Q8;let O9=d.viewport;if(d.viewport!==void 0)d.viewport=void 0;if(_.setupLightsView(d),q0===!0)O0.setGlobalState(I.clippingPlanes,d);if(nQ(P,s,d),c.updateMultisampleRenderTarget(w0),c.updateRenderTargetMipmap(w0),N9.has("WEBGL_multisampled_render_to_texture")===!1){let b0=!1;for(let v9=0,Y7=x.length;v9<Y7;v9++){let o9=x[v9],{object:n9,geometry:B7,material:j0,group:z7}=o9;if(j0.side===r9&&n9.layers.test(d.layers)){let C9=j0.side;j0.side=X7,j0.needsUpdate=!0,KW(n9,s,d,B7,j0,z7),j0.side=C9,j0.needsUpdate=!0,b0=!0}}if(b0===!0)c.updateMultisampleRenderTarget(w0),c.updateRenderTargetMipmap(w0)}if(I.setRenderTarget(A0,f0,p0),I.setClearColor(x0,t),O9!==void 0)d.viewport=O9;I.toneMapping=Y9}function nQ(P,x,s){let d=x.isScene===!0?x.overrideMaterial:null;for(let u=0,w0=P.length;u<w0;u++){let v0=P[u],{object:A0,geometry:f0,group:p0}=v0,Y9=v0.material;if(Y9.allowOverride===!0&&d!==null)Y9=d;if(A0.layers.test(s.layers))KW(A0,x,s,f0,Y9,p0)}}function KW(P,x,s,d,u,w0){if(S!==null&&u.isNodeMaterial)S.setObject(P,u);if(P.onBeforeRender(I,x,s,d,u,w0),P.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),u.onBeforeRender(I,x,s,d,P,w0),u.transparent===!0&&u.side===r9&&u.forceSinglePass===!1)u.side=X7,u.needsUpdate=!0,I.renderBufferDirect(s,x,d,u,P,w0),u.side=L6,u.needsUpdate=!0,I.renderBufferDirect(s,x,d,u,P,w0),u.side=r9;else I.renderBufferDirect(s,x,d,u,P,w0);P.onAfterRender(I,x,s,d,u,w0)}function sQ(P,x,s){if(x.isScene!==!0)x=n0;let d=b.get(P),u=_.state.lights,w0=_.state.shadowsArray,v0=u.state.version,A0=Q0.getParameters(P,u.state,w0,x,s,_.state.lightProbeGridArray),f0=Q0.getProgramCacheKey(A0),p0=d.programs;d.environment=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?x.environment:null,d.fog=x.fog;let Y9=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap;if(d.envMap=Y0.get(P.envMap||d.environment,Y9),d.envMapRotation=d.environment!==null&&P.envMap===null?x.environmentRotation:P.envMapRotation,p0===void 0)P.addEventListener("dispose",F8),p0=new Map,d.programs=p0;let O9=p0.get(f0);if(O9!==void 0){if(d.currentProgram===O9&&d.lightsStateVersion===v0)return WW(P,A0),O9}else{if(A0.uniforms=Q0.getUniforms(P),S!==null&&P.isNodeMaterial)S.build(P,s,A0);P.onBeforeCompile(A0,I),O9=Q0.acquireProgram(A0,f0),p0.set(f0,O9),d.uniforms=A0.uniforms}let b0=d.uniforms;if(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)b0.clippingPlanes=O0.uniform;if(WW(P,A0),d.needsLights=S5(P),d.lightsStateVersion=v0,d.needsLights)b0.ambientLightColor.value=u.state.ambient,b0.lightProbe.value=u.state.probe,b0.sunLights.value=u.state.sun,b0.sunLightShadows.value=u.state.sunShadow,b0.directionalLights.value=u.state.directional,b0.directionalLightShadows.value=u.state.directionalShadow,b0.spotLights.value=u.state.spot,b0.spotLightShadows.value=u.state.spotShadow,b0.rectAreaLights.value=u.state.rectArea,b0.ltc_1.value=u.state.rectAreaLTC1,b0.ltc_2.value=u.state.rectAreaLTC2,b0.pointLights.value=u.state.point,b0.pointLightShadows.value=u.state.pointShadow,b0.hemisphereLights.value=u.state.hemi,b0.sunShadowMatrix.value=u.state.sunShadowMatrix,b0.sunShadowCascade.value=u.state.sunShadowCascade,b0.directionalShadowMatrix.value=u.state.directionalShadowMatrix,b0.spotLightMatrix.value=u.state.spotLightMatrix,b0.spotLightMap.value=u.state.spotLightMap,b0.pointShadowMatrix.value=u.state.pointShadowMatrix;return d.lightProbeGrid=_.state.lightProbeGridArray.length>0,d.currentProgram=O9,d.uniformsList=null,O9}function UW(P){if(P.uniformsList===null){let x=P.currentProgram.getUniforms();P.uniformsList=yQ.seqWithValue(x.seq,P.uniforms)}return P.uniformsList}function WW(P,x){let s=b.get(P);s.outputColorSpace=x.outputColorSpace,s.batching=x.batching,s.batchingColor=x.batchingColor,s.instancing=x.instancing,s.instancingColor=x.instancingColor,s.instancingMorph=x.instancingMorph,s.skinning=x.skinning,s.morphTargets=x.morphTargets,s.morphNormals=x.morphNormals,s.morphColors=x.morphColors,s.morphTargetsCount=x.morphTargetsCount,s.numClippingPlanes=x.numClippingPlanes,s.numIntersection=x.numClipIntersection,s.vertexAlphas=x.vertexAlphas,s.vertexTangents=x.vertexTangents,s.toneMapping=x.toneMapping}function P5(P,x){if(P.length===0)return null;if(P.length===1)return P[0].texture!==null?P[0]:null;A.setFromMatrixPosition(x.matrixWorld);for(let s=0,d=P.length;s<d;s++){let u=P[s];if(u.texture!==null&&u.boundingBox.containsPoint(A))return u}return null}function w5(P,x,s,d,u){if(x.isScene!==!0)x=n0;c.resetTextureUnits();let w0=x.fog,v0=d.isMeshStandardMaterial||d.isMeshLambertMaterial||d.isMeshPhongMaterial?x.environment:null,A0=l===null?I.outputColorSpace:l.isXRRenderTarget===!0?l.texture.colorSpace:q9.workingColorSpace,f0=d.isMeshStandardMaterial||d.isMeshLambertMaterial&&!d.envMap||d.isMeshPhongMaterial&&!d.envMap,p0=Y0.get(d.envMap||v0,f0),Y9=d.vertexColors===!0&&!!s.attributes.color&&s.attributes.color.itemSize===4,O9=!!s.attributes.tangent&&(!!d.normalMap||d.anisotropy>0),b0=!!s.morphAttributes.position,v9=!!s.morphAttributes.normal,Y7=!!s.morphAttributes.color,o9=Q8;if(d.toneMapped){if(l===null||l.isXRRenderTarget===!0)o9=I.toneMapping}let n9=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,B7=n9!==void 0?n9.length:0,j0=b.get(d),z7=_.state.lights;if(q0===!0){if(D0===!0||P!==p){let i9=P===p&&d.id===i;O0.setState(d,P,i9)}}let C9=!1;if(d.version===j0.__version){if(j0.needsLights&&j0.lightsStateVersion!==z7.state.version)C9=!0;else if(j0.outputColorSpace!==A0)C9=!0;else if(u.isBatchedMesh&&j0.batching===!1)C9=!0;else if(!u.isBatchedMesh&&j0.batching===!0)C9=!0;else if(u.isBatchedMesh&&j0.batchingColor===!0&&u._colorsTexture===null)C9=!0;else if(u.isBatchedMesh&&j0.batchingColor===!1&&u._colorsTexture!==null)C9=!0;else if(u.isInstancedMesh&&j0.instancing===!1)C9=!0;else if(!u.isInstancedMesh&&j0.instancing===!0)C9=!0;else if(u.isSkinnedMesh&&j0.skinning===!1)C9=!0;else if(!u.isSkinnedMesh&&j0.skinning===!0)C9=!0;else if(u.isInstancedMesh&&j0.instancingColor===!0&&u.instanceColor===null)C9=!0;else if(u.isInstancedMesh&&j0.instancingColor===!1&&u.instanceColor!==null)C9=!0;else if(u.isInstancedMesh&&j0.instancingMorph===!0&&u.morphTexture===null)C9=!0;else if(u.isInstancedMesh&&j0.instancingMorph===!1&&u.morphTexture!==null)C9=!0;else if(j0.envMap!==p0)C9=!0;else if(d.fog===!0&&j0.fog!==w0)C9=!0;else if(j0.numClippingPlanes!==void 0&&(j0.numClippingPlanes!==O0.numPlanes||j0.numIntersection!==O0.numIntersection))C9=!0;else if(j0.vertexAlphas!==Y9)C9=!0;else if(j0.vertexTangents!==O9)C9=!0;else if(j0.morphTargets!==b0)C9=!0;else if(j0.morphNormals!==v9)C9=!0;else if(j0.morphColors!==Y7)C9=!0;else if(j0.toneMapping!==o9)C9=!0;else if(j0.morphTargetsCount!==B7)C9=!0;else if(!!j0.lightProbeGrid!==_.state.lightProbeGridArray.length>0)C9=!0}else C9=!0,j0.__version=d.version;let c7=j0.currentProgram;if(C9===!0){if(c7=sQ(d,x,u),S&&d.isNodeMaterial)S.onUpdateProgram(d,c7,j0)}let D8=!1,e8=!1,rJ=!1,d9=c7.getUniforms(),K7=j0.uniforms;if(w.useProgram(c7.program))D8=!0,e8=!0,rJ=!0;if(d.id!==i)i=d.id,e8=!0;if(j0.needsLights){let i9=P5(_.state.lightProbeGridArray,u);if(j0.lightProbeGrid!==i9)j0.lightProbeGrid=i9,e8=!0}if(D8||p!==P){if(w.buffers.depth.getReversed()&&P.reversedDepth!==!0)P._reversedDepth=!0,P.updateProjectionMatrix();d9.setValue(y,"projectionMatrix",P.projectionMatrix),d9.setValue(y,"viewMatrix",P.matrixWorldInverse);let QJ=d9.map.cameraPosition;if(QJ!==void 0)QJ.setValue(y,P0.setFromMatrixPosition(P.matrixWorld));if(R9.logarithmicDepthBuffer)d9.setValue(y,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2));if(d.isMeshPhongMaterial||d.isMeshToonMaterial||d.isMeshLambertMaterial||d.isMeshBasicMaterial||d.isMeshStandardMaterial||d.isShaderMaterial)d9.setValue(y,"isOrthographic",P.isOrthographicCamera===!0);if(p!==P)p=P,e8=!0,rJ=!0}if(j0.needsLights){if(z7.state.sunShadowMap.length>0)d9.setValue(y,"sunShadowMap",z7.state.sunShadowMap,c);if(z7.state.directionalShadowMap.length>0)d9.setValue(y,"directionalShadowMap",z7.state.directionalShadowMap,c);if(z7.state.spotShadowMap.length>0)d9.setValue(y,"spotShadowMap",z7.state.spotShadowMap,c);if(z7.state.pointShadowMap.length>0)d9.setValue(y,"pointShadowMap",z7.state.pointShadowMap,c)}if(u.isSkinnedMesh){d9.setOptional(y,u,"bindMatrix"),d9.setOptional(y,u,"bindMatrixInverse");let i9=u.skeleton;if(i9){if(i9.boneTexture===null)i9.computeBoneTexture();d9.setValue(y,"boneTexture",i9.boneTexture,c)}}if(u.isBatchedMesh){if(d9.setOptional(y,u,"batchingTexture"),d9.setValue(y,"batchingTexture",u._matricesTexture,c),d9.setOptional(y,u,"batchingIdTexture"),d9.setValue(y,"batchingIdTexture",u._indirectTexture,c),d9.setOptional(y,u,"batchingColorTexture"),u._colorsTexture!==null)d9.setValue(y,"batchingColorTexture",u._colorsTexture,c)}let JJ=s.morphAttributes;if(JJ.position!==void 0||JJ.normal!==void 0||JJ.color!==void 0)w9.update(u,s,c7);if(e8||j0.receiveShadow!==u.receiveShadow)j0.receiveShadow=u.receiveShadow,d9.setValue(y,"receiveShadow",u.receiveShadow);if((d.isMeshStandardMaterial||d.isMeshLambertMaterial||d.isMeshPhongMaterial)&&d.envMap===null&&x.environment!==null)K7.envMapIntensity.value=x.environmentIntensity;if(K7.dfgLUT!==void 0)K7.dfgLUT.value=TD();if(e8){if(d9.setValue(y,"toneMappingExposure",I.toneMappingExposure),j0.needsLights)T5(K7,rJ);if(w0&&d.fog===!0)T0.refreshFogUniforms(K7,w0);if(T0.refreshMaterialUniforms(K7,d,W0,n,_.state.transmissionRenderTarget[P.id]),j0.needsLights&&j0.lightProbeGrid){let i9=j0.lightProbeGrid;K7.probesSH.value=i9.texture,K7.probesMin.value.copy(i9.boundingBox.min),K7.probesMax.value.copy(i9.boundingBox.max),K7.probesResolution.value.copy(i9.resolution)}yQ.upload(y,UW(j0),K7,c)}if(d.isShaderMaterial&&d.uniformsNeedUpdate===!0)yQ.upload(y,UW(j0),K7,c),d.uniformsNeedUpdate=!1;if(d.isSpriteMaterial)d9.setValue(y,"center",u.center);if(d9.setValue(y,"modelViewMatrix",u.modelViewMatrix),d9.setValue(y,"normalMatrix",u.normalMatrix),d9.setValue(y,"modelMatrix",u.matrixWorld),d.uniformsGroups!==void 0){let i9=d.uniformsGroups;for(let QJ=0,tJ=i9.length;QJ<tJ;QJ++){let YW=i9[QJ];k0.update(YW,c7),k0.bind(YW,c7)}}return c7}function T5(P,x){P.ambientLightColor.needsUpdate=x,P.lightProbe.needsUpdate=x,P.sunLights.needsUpdate=x,P.sunLightShadows.needsUpdate=x,P.directionalLights.needsUpdate=x,P.directionalLightShadows.needsUpdate=x,P.pointLights.needsUpdate=x,P.pointLightShadows.needsUpdate=x,P.spotLights.needsUpdate=x,P.spotLightShadows.needsUpdate=x,P.rectAreaLights.needsUpdate=x,P.hemisphereLights.needsUpdate=x}function S5(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return m},this.getActiveMipmapLevel=function(){return e},this.getRenderTarget=function(){return l},this.setRenderTargetTextures=function(P,x,s){let d=b.get(P);if(d.__autoAllocateDepthBuffer=P.resolveDepthBuffer===!1,d.__autoAllocateDepthBuffer===!1)d.__useRenderToTexture=!1;b.get(P.texture).__webglTexture=x,b.get(P.depthTexture).__webglTexture=d.__autoAllocateDepthBuffer?void 0:s,d.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(P,x){let s=b.get(P);s.__webglFramebuffer=x,s.__useDefaultFramebuffer=x===void 0},this.setRenderTarget=function(P,x=0,s=0){l=P,m=x,e=s;let d=null,u=!1,w0=!1;if(P){let A0=b.get(P);if(A0.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(y.FRAMEBUFFER,A0.__webglFramebuffer),o.copy(P.viewport),H0.copy(P.scissor),S0=P.scissorTest,w.viewport(o),w.scissor(H0),w.setScissorTest(S0),i=-1;return}else if(A0.__webglFramebuffer===void 0)c.setupRenderTarget(P);else if(A0.__hasExternalTextures)c.rebindTextures(P,b.get(P.texture).__webglTexture,b.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){let Y9=P.depthTexture;if(A0.__boundDepthTexture!==Y9){if(Y9!==null&&b.has(Y9)&&(P.width!==Y9.image.width||P.height!==Y9.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");c.setupDepthRenderbuffer(P)}}let f0=P.texture;if(f0.isData3DTexture||f0.isDataArrayTexture||f0.isCompressedArrayTexture)w0=!0;let p0=b.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget){if(Array.isArray(p0[x]))d=p0[x][s];else d=p0[x];u=!0}else if(P.samples>0&&c.useMultisampledRTT(P)===!1)d=b.get(P).__webglMultisampledFramebuffer;else if(Array.isArray(p0))d=p0[s];else d=p0;o.copy(P.viewport),H0.copy(P.scissor),S0=P.scissorTest}else o.copy(r0).multiplyScalar(W0).floor(),H0.copy(y0).multiplyScalar(W0).floor(),S0=b9;if(s!==0)d=h;if(w.bindFramebuffer(y.FRAMEBUFFER,d))w.drawBuffers(P,d);if(w.viewport(o),w.scissor(H0),w.setScissorTest(S0),u){let A0=b.get(P.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+x,A0.__webglTexture,s)}else if(w0){let A0=x;for(let f0=0;f0<P.textures.length;f0++){let p0=b.get(P.textures[f0]);y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0+f0,p0.__webglTexture,s,A0)}}else if(P!==null&&s!==0){let A0=b.get(P.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,A0.__webglTexture,s)}i=-1};function HW(P){let x=b.get(P);if(x.__readFormat!==P.format||x.__readType!==P.type)x.__readFormat=P.format,x.__readType=P.type,x.__formatReadable=R9.textureFormatReadable(P.format),x.__typeReadable=R9.textureTypeReadable(P.type);return x}if(this.readRenderTargetPixels=function(P,x,s,d,u,w0,v0,A0=0){if(!(P&&P.isWebGLRenderTarget)){e0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let f0=b.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&v0!==void 0)f0=f0[v0];if(f0){w.bindFramebuffer(y.FRAMEBUFFER,f0);try{let p0=P.textures[A0],Y9=p0.format,O9=p0.type;if(P.textures.length>1)y.readBuffer(y.COLOR_ATTACHMENT0+A0);let b0=HW(p0);if(b0.__formatReadable===!1){e0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(b0.__typeReadable===!1){e0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(x>=0&&x<=P.width-d&&(s>=0&&s<=P.height-u))y.readPixels(x,s,d,u,J0.convert(Y9),J0.convert(O9),w0)}finally{let p0=l!==null?b.get(l).__webglFramebuffer:null;w.bindFramebuffer(y.FRAMEBUFFER,p0)}}},this.readRenderTargetPixelsAsync=async function(P,x,s,d,u,w0,v0,A0=0){if(!(P&&P.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let f0=b.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&v0!==void 0)f0=f0[v0];if(f0)if(x>=0&&x<=P.width-d&&(s>=0&&s<=P.height-u)){w.bindFramebuffer(y.FRAMEBUFFER,f0);let p0=P.textures[A0],Y9=p0.format,O9=p0.type;if(P.textures.length>1)y.readBuffer(y.COLOR_ATTACHMENT0+A0);let b0=HW(p0);if(b0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(b0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let v9=y.createBuffer();y.bindBuffer(y.PIXEL_PACK_BUFFER,v9),y.bufferData(y.PIXEL_PACK_BUFFER,w0.byteLength,y.STREAM_READ),y.readPixels(x,s,d,u,J0.convert(Y9),J0.convert(O9),0),y.bindBuffer(y.PIXEL_PACK_BUFFER,null);let Y7=l!==null?b.get(l).__webglFramebuffer:null;w.bindFramebuffer(y.FRAMEBUFFER,Y7);let o9=y.fenceSync(y.SYNC_GPU_COMMANDS_COMPLETE,0);return y.flush(),await iH(y,o9,4),y.bindBuffer(y.PIXEL_PACK_BUFFER,v9),y.getBufferSubData(y.PIXEL_PACK_BUFFER,0,w0),y.bindBuffer(y.PIXEL_PACK_BUFFER,null),y.deleteBuffer(v9),y.deleteSync(o9),w0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(P,x=null,s=0){let d=Math.pow(2,-s),u=Math.floor(P.image.width*d),w0=Math.floor(P.image.height*d),v0=x!==null?x.x:0,A0=x!==null?x.y:0;c.setTexture2D(P,0),y.copyTexSubImage2D(y.TEXTURE_2D,s,0,0,v0,A0,u,w0),w.unbindTexture()},this.copyTextureToTexture=function(P,x,s=null,d=null,u=0,w0=0){let v0,A0,f0,p0,Y9,O9,b0,v9,Y7,o9=P.isCompressedTexture?P.mipmaps[w0]:P.image;if(s!==null)v0=s.max.x-s.min.x,A0=s.max.y-s.min.y,f0=s.isBox3?s.max.z-s.min.z:1,p0=s.min.x,Y9=s.min.y,O9=s.isBox3?s.min.z:0;else{let K7=Math.pow(2,-u);if(v0=Math.floor(o9.width*K7),A0=Math.floor(o9.height*K7),P.isDataArrayTexture)f0=o9.depth;else if(P.isData3DTexture)f0=Math.floor(o9.depth*K7);else f0=1;p0=0,Y9=0,O9=0}if(d!==null)b0=d.x,v9=d.y,Y7=d.z;else b0=0,v9=0,Y7=0;let n9=J0.convert(x.format),B7=J0.convert(x.type),j0;if(x.isData3DTexture)c.setTexture3D(x,0),j0=y.TEXTURE_3D;else if(x.isDataArrayTexture||x.isCompressedArrayTexture)c.setTexture2DArray(x,0),j0=y.TEXTURE_2D_ARRAY;else c.setTexture2D(x,0),j0=y.TEXTURE_2D;w.activeTexture(y.TEXTURE0),w.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,x.flipY),w.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),w.pixelStorei(y.UNPACK_ALIGNMENT,x.unpackAlignment);let z7=w.getParameter(y.UNPACK_ROW_LENGTH),C9=w.getParameter(y.UNPACK_IMAGE_HEIGHT),c7=w.getParameter(y.UNPACK_SKIP_PIXELS),D8=w.getParameter(y.UNPACK_SKIP_ROWS),e8=w.getParameter(y.UNPACK_SKIP_IMAGES);w.pixelStorei(y.UNPACK_ROW_LENGTH,o9.width),w.pixelStorei(y.UNPACK_IMAGE_HEIGHT,o9.height),w.pixelStorei(y.UNPACK_SKIP_PIXELS,p0),w.pixelStorei(y.UNPACK_SKIP_ROWS,Y9),w.pixelStorei(y.UNPACK_SKIP_IMAGES,O9);let rJ=P.isDataArrayTexture||P.isData3DTexture,d9=x.isDataArrayTexture||x.isData3DTexture;if(P.isDepthTexture){let K7=b.get(P),JJ=b.get(x),i9=b.get(K7.__renderTarget),QJ=b.get(JJ.__renderTarget);w.bindFramebuffer(y.READ_FRAMEBUFFER,i9.__webglFramebuffer),w.bindFramebuffer(y.DRAW_FRAMEBUFFER,QJ.__webglFramebuffer);for(let tJ=0;tJ<f0;tJ++){if(rJ)y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,b.get(P).__webglTexture,u,O9+tJ),y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,b.get(x).__webglTexture,w0,Y7+tJ);y.blitFramebuffer(p0,Y9,v0,A0,b0,v9,v0,A0,y.DEPTH_BUFFER_BIT,y.NEAREST)}w.bindFramebuffer(y.READ_FRAMEBUFFER,null),w.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else if(u!==0||P.isRenderTargetTexture||b.has(P)){let K7=b.get(P),JJ=b.get(x);w.bindFramebuffer(y.READ_FRAMEBUFFER,a),w.bindFramebuffer(y.DRAW_FRAMEBUFFER,k);for(let i9=0;i9<f0;i9++){if(rJ)y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,K7.__webglTexture,u,O9+i9);else y.framebufferTexture2D(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,K7.__webglTexture,u);if(d9)y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,JJ.__webglTexture,w0,Y7+i9);else y.framebufferTexture2D(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,JJ.__webglTexture,w0);if(u!==0)y.blitFramebuffer(p0,Y9,v0,A0,b0,v9,v0,A0,y.COLOR_BUFFER_BIT,y.NEAREST);else if(d9)y.copyTexSubImage3D(j0,w0,b0,v9,Y7+i9,p0,Y9,v0,A0);else y.copyTexSubImage2D(j0,w0,b0,v9,p0,Y9,v0,A0)}w.bindFramebuffer(y.READ_FRAMEBUFFER,null),w.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else if(d9)if(P.isDataTexture||P.isData3DTexture)y.texSubImage3D(j0,w0,b0,v9,Y7,v0,A0,f0,n9,B7,o9.data);else if(x.isCompressedArrayTexture)y.compressedTexSubImage3D(j0,w0,b0,v9,Y7,v0,A0,f0,n9,o9.data);else y.texSubImage3D(j0,w0,b0,v9,Y7,v0,A0,f0,n9,B7,o9);else if(P.isDataTexture)y.texSubImage2D(y.TEXTURE_2D,w0,b0,v9,v0,A0,n9,B7,o9.data);else if(P.isCompressedTexture)y.compressedTexSubImage2D(y.TEXTURE_2D,w0,b0,v9,o9.width,o9.height,n9,o9.data);else y.texSubImage2D(y.TEXTURE_2D,w0,b0,v9,v0,A0,n9,B7,o9);if(w.pixelStorei(y.UNPACK_ROW_LENGTH,z7),w.pixelStorei(y.UNPACK_IMAGE_HEIGHT,C9),w.pixelStorei(y.UNPACK_SKIP_PIXELS,c7),w.pixelStorei(y.UNPACK_SKIP_ROWS,D8),w.pixelStorei(y.UNPACK_SKIP_IMAGES,e8),w0===0&&x.generateMipmaps)y.generateMipmap(j0);w.unbindTexture()},this.initRenderTarget=function(P){if(b.get(P).__webglFramebuffer===void 0)c.setupRenderTarget(P)},this.initTexture=function(P){if(P.isCubeTexture)c.setTextureCube(P,0);else if(P.isData3DTexture)c.setTexture3D(P,0);else if(P.isDataArrayTexture||P.isCompressedArrayTexture)c.setTexture2DArray(P,0);else c.setTexture2D(P,0);w.unbindTexture()},this.resetState=function(){m=0,e=0,l=null,w.reset(),I0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return uK}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=q9._getDrawingBufferColorSpace(J),Q.unpackColorSpace=q9._getUnpackColorSpace()}}var SD="varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";class wU{mesh;stars;sunDir=new T(0,-0.2,-1).normalize();constructor(J=400){this.mesh=new $0(new a0(J,48,24),new y9({side:X7,depthWrite:!1,uniforms:{day:{value:0},sun:{value:this.sunDir}},vertexShader:SD,fragmentShader:`
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
        }`}));let Q=1400,$=new Float32Array(Q*3);for(let K=0;K<Q;K++){let U=l9(K),W=l9(K+9999),H=U*Math.PI*2,Y=Math.acos(1-W*0.95);$.set([Math.sin(Y)*Math.cos(H)*J*0.95,Math.cos(Y)*J*0.95,Math.sin(Y)*Math.sin(H)*J*0.95],K*3)}let Z=new F9;Z.setAttribute("position",new Q7($,3)),this.stars=new W8(Z,new s7({color:16777215,size:1.4,sizeAttenuation:!1,transparent:!0,depthWrite:!1}))}set(J,Q=0){this.mesh.material.uniforms.day.value=J;let $=(J-0.5)*0.9;return this.sunDir.set(Math.cos($)*Math.sin(Q),Math.sin($),-Math.cos($)*Math.cos(Q)).normalize(),this.stars.material.opacity=Math.max(0,1-J*2.2),this.sunDir}}function l9(J){let Q=Math.sin(J*127.1+311.7)*43758.5453;return Q-Math.floor(Q)}class y7{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}var kD=new gJ(-1,1,1,-1,0,1);class lY extends F9{constructor(){super();this.setAttribute("position",new J9([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new J9([0,2,0,0,2,0],2))}}var jD=new lY;class d8{constructor(J){this._mesh=new $0(jD,J)}dispose(){this._mesh.geometry.dispose()}render(J){J.render(this._mesh,kD)}get material(){return this._mesh.material}set material(J){this._mesh.material=J}}var fQ={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:0.025},maxblur:{value:0.01},nearClip:{value:1},farClip:{value:1000}},vertexShader:`

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

		}`};class TU extends y7{constructor(J,Q,$){super();this.scene=J,this.camera=Q;let Z=$.focus!==void 0?$.focus:1,K=$.aperture!==void 0?$.aperture:0.025,U=$.maxblur!==void 0?$.maxblur:1;this._renderTargetDepth=new W7(1,1,{minFilter:d7,magFilter:d7,type:E7}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new TQ,this._materialDepth.depthPacking=xK,this._materialDepth.blending=S7;let W=Y8.clone(fQ.uniforms);W.tDepth.value=this._renderTargetDepth.texture,W.focus.value=Z,W.aspect.value=Q.aspect,W.aperture.value=K,W.maxblur.value=U,W.nearClip.value=Q.near,W.farClip.value=Q.far,this.materialBokeh=new y9({defines:Object.assign({},fQ.defines),uniforms:W,vertexShader:fQ.vertexShader,fragmentShader:fQ.fragmentShader}),this.uniforms=W,this._fsQuad=new d8(this.materialBokeh),this._oldClearColor=new U0}render(J,Q,$){this.scene.overrideMaterial=this._materialDepth,J.getClearColor(this._oldClearColor);let Z=J.getClearAlpha(),K=J.autoClear;if(J.autoClear=!1,J.setClearColor(16777215),J.setClearAlpha(1),J.setRenderTarget(this._renderTargetDepth),J.clear(),J.render(this.scene,this.camera),this.uniforms.tColor.value=$.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget(Q),J.clear(),this._fsQuad.render(J);this.scene.overrideMaterial=null,J.setClearColor(this._oldClearColor),J.setClearAlpha(Z),J.autoClear=K}setSize(J,Q){this.materialBokeh.uniforms.aspect.value=J/Q,this._renderTargetDepth.setSize(J,Q)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}}var h6={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class dJ extends y7{constructor(J,Q="tDiffuse"){super();if(this.textureID=Q,this.uniforms=null,this.material=null,J instanceof y9)this.uniforms=J.uniforms,this.material=J;else if(J)this.uniforms=Y8.clone(J.uniforms),this.material=new y9({name:J.name!==void 0?J.name:"unspecified",defines:Object.assign({},J.defines),uniforms:this.uniforms,vertexShader:J.vertexShader,fragmentShader:J.fragmentShader});this._fsQuad=new d8(this.material)}render(J,Q,$){if(this.uniforms[this.textureID])this.uniforms[this.textureID].value=$.texture;if(this._fsQuad.material=this.material,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget(Q),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class NZ extends y7{constructor(J,Q){super();this.scene=J,this.camera=Q,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(J,Q,$){let Z=J.getContext(),K=J.state;K.buffers.color.setMask(!1),K.buffers.depth.setMask(!1),K.buffers.color.setLocked(!0),K.buffers.depth.setLocked(!0);let U,W;if(this.inverse)U=0,W=1;else U=1,W=0;if(K.buffers.stencil.setTest(!0),K.buffers.stencil.setOp(Z.REPLACE,Z.REPLACE,Z.REPLACE),K.buffers.stencil.setFunc(Z.ALWAYS,U,4294967295),K.buffers.stencil.setClear(W),K.buffers.stencil.setLocked(!0),J.setRenderTarget($),this.clear)J.clear();if(J.render(this.scene,this.camera),J.setRenderTarget(Q),this.clear)J.clear();J.render(this.scene,this.camera),K.buffers.color.setLocked(!1),K.buffers.depth.setLocked(!1),K.buffers.color.setMask(!0),K.buffers.depth.setMask(!0),K.buffers.stencil.setLocked(!1),K.buffers.stencil.setFunc(Z.EQUAL,1,4294967295),K.buffers.stencil.setOp(Z.KEEP,Z.KEEP,Z.KEEP),K.buffers.stencil.setLocked(!0)}}class SU extends y7{constructor(){super();this.needsSwap=!1}render(J){J.state.buffers.stencil.setLocked(!1),J.state.buffers.stencil.setTest(!1)}}class u8{constructor(J,Q){if(this.renderer=J,this._pixelRatio=J.getPixelRatio(),Q===void 0){let $=J.getSize(new Z0);this._width=$.width,this._height=$.height,Q=new W7(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:E7}),Q.texture.name="EffectComposer.rt1"}else this._width=Q.width,this._height=Q.height;this.renderTarget1=Q,this.renderTarget2=Q.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new dJ(h6),this.copyPass.material.blending=S7,this.timer=new WZ}swapBuffers(){let J=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=J}addPass(J){this.passes.push(J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(J,Q){this.passes.splice(Q,0,J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(J){let Q=this.passes.indexOf(J);if(Q!==-1)this.passes.splice(Q,1)}isLastEnabledPass(J){for(let Q=J+1;Q<this.passes.length;Q++)if(this.passes[Q].enabled)return!1;return!0}render(J){if(this.timer.update(),J===void 0)J=this.timer.getDelta();let Q=this.renderer.getRenderTarget(),$=!1;for(let Z=0,K=this.passes.length;Z<K;Z++){let U=this.passes[Z];if(U.enabled===!1)continue;if(U.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(Z),U.render(this.renderer,this.writeBuffer,this.readBuffer,J,$),U.needsSwap){if($){let W=this.renderer.getContext(),H=this.renderer.state.buffers.stencil;H.setFunc(W.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,J),H.setFunc(W.EQUAL,1,4294967295)}this.swapBuffers()}if(NZ!==void 0){if(U instanceof NZ)$=!0;else if(U instanceof SU)$=!1}}this.renderer.setRenderTarget(Q)}reset(J){if(J===void 0){let Q=this.renderer.getSize(new Z0);this._pixelRatio=this.renderer.getPixelRatio(),this._width=Q.width,this._height=Q.height,J=this.renderTarget1.clone(),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=J,this.renderTarget2=J.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(J,Q){this._width=J,this._height=Q;let $=this._width*this._pixelRatio,Z=this._height*this._pixelRatio;this.renderTarget1.setSize($,Z),this.renderTarget2.setSize($,Z);for(let K=0;K<this.passes.length;K++)this.passes[K].setSize($,Z)}setPixelRatio(J){this._pixelRatio=J,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}var bQ={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class l8 extends y7{constructor(){super();this.isOutputPass=!0,this.uniforms=Y8.clone(bQ.uniforms),this.material=new wQ({name:bQ.name,uniforms:this.uniforms,vertexShader:bQ.vertexShader,fragmentShader:bQ.fragmentShader}),this._fsQuad=new d8(this.material),this._outputColorSpace=null,this._toneMapping=null}render(J,Q,$){if(this.uniforms.tDiffuse.value=$.texture,this.uniforms.toneMappingExposure.value=J.toneMappingExposure,this._outputColorSpace!==J.outputColorSpace||this._toneMapping!==J.toneMapping){if(this._outputColorSpace=J.outputColorSpace,this._toneMapping=J.toneMapping,this.material.defines={},q9.getTransfer(this._outputColorSpace)===g9)this.material.defines.SRGB_TRANSFER="";if(this._toneMapping===NQ)this.material.defines.LINEAR_TONE_MAPPING="";else if(this._toneMapping===qQ)this.material.defines.REINHARD_TONE_MAPPING="";else if(this._toneMapping===FQ)this.material.defines.CINEON_TONE_MAPPING="";else if(this._toneMapping===b8)this.material.defines.ACES_FILMIC_TONE_MAPPING="";else if(this._toneMapping===EQ)this.material.defines.AGX_TONE_MAPPING="";else if(this._toneMapping===RQ)this.material.defines.NEUTRAL_TONE_MAPPING="";else if(this._toneMapping===DQ)this.material.defines.CUSTOM_TONE_MAPPING="";this.material.needsUpdate=!0}if(this.renderToScreen===!0)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget(Q),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class c8 extends y7{constructor(J,Q,$=null,Z=null,K=null){super();this.scene=J,this.camera=Q,this.overrideMaterial=$,this.clearColor=Z,this.clearAlpha=K,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new U0}render(J,Q,$){let Z=J.autoClear;J.autoClear=!1;let K,U;if(this.overrideMaterial!==null)U=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial;if(this.clearColor!==null)J.getClearColor(this._oldClearColor),J.setClearColor(this.clearColor,J.getClearAlpha());if(this.clearAlpha!==null)K=J.getClearAlpha(),J.setClearAlpha(this.clearAlpha);if(this.clearDepth==!0)J.clearDepth();if(J.setRenderTarget(this.renderToScreen?null:$),this.clear===!0)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(J.render(this.scene,this.camera),this.clearColor!==null)J.setClearColor(this._oldClearColor);if(this.clearAlpha!==null)J.setClearAlpha(K);if(this.overrideMaterial!==null)this.scene.overrideMaterial=U;J.autoClear=Z}}var cY={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new U0(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class X8 extends y7{constructor(J,Q=1,$,Z){super();this.strength=Q,this.radius=$,this.threshold=Z,this.resolution=J!==void 0?new Z0(J.x,J.y):new Z0(256,256),this.clearColor=new U0(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);this.renderTargetBright=new W7(K,U,{type:E7,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let G=0;G<this.nMips;G++){let N=new W7(K,U,{type:E7,depthBuffer:!1});N.texture.name="UnrealBloomPass.h"+G,N.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(N);let D=new W7(K,U,{type:E7,depthBuffer:!1});D.texture.name="UnrealBloomPass.v"+G,D.texture.generateMipmaps=!1,this.renderTargetsVertical.push(D),K=Math.round(K/2),U=Math.round(U/2)}let W=cY;this.highPassUniforms=Y8.clone(W.uniforms),this.highPassUniforms.luminosityThreshold.value=Z,this.highPassUniforms.smoothWidth.value=0.01,this.materialHighPassFilter=new y9({uniforms:this.highPassUniforms,vertexShader:W.vertexShader,fragmentShader:W.fragmentShader}),this.separableBlurMaterials=[];let H=[6,10,14,18,22];K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);for(let G=0;G<this.nMips;G++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(H[G])),this.separableBlurMaterials[G].uniforms.invSize.value=new Z0(1/K,1/U),K=Math.round(K/2),U=Math.round(U/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=Q,this.compositeMaterial.uniforms.bloomRadius.value=0.1;let Y=[1,0.8,0.6,0.4,0.2];this.compositeMaterial.uniforms.bloomFactors.value=Y,this.bloomTintColors=[new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1),new T(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Y8.clone(h6.uniforms),this.blendMaterial=new y9({uniforms:this.copyUniforms,vertexShader:h6.vertexShader,fragmentShader:h6.fragmentShader,premultipliedAlpha:!0,blending:N7,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new U0,this._oldClearAlpha=1,this._basic=new l0,this._fsQuad=new d8(null)}dispose(){for(let J=0;J<this.renderTargetsHorizontal.length;J++)this.renderTargetsHorizontal[J].dispose();for(let J=0;J<this.renderTargetsVertical.length;J++)this.renderTargetsVertical[J].dispose();this.renderTargetBright.dispose();for(let J=0;J<this.separableBlurMaterials.length;J++)this.separableBlurMaterials[J].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(J,Q){let $=Math.round(J/2),Z=Math.round(Q/2);this.renderTargetBright.setSize($,Z);for(let K=0;K<this.nMips;K++)this.renderTargetsHorizontal[K].setSize($,Z),this.renderTargetsVertical[K].setSize($,Z),this.separableBlurMaterials[K].uniforms.invSize.value=new Z0(1/$,1/Z),$=Math.round($/2),Z=Math.round(Z/2)}render(J,Q,$,Z,K){J.getClearColor(this._oldClearColor),this._oldClearAlpha=J.getClearAlpha();let U=J.autoClear;if(J.autoClear=!1,J.setClearColor(this.clearColor,0),K)J.state.buffers.stencil.setTest(!1);if(this.renderToScreen)this._fsQuad.material=this._basic,this._basic.map=$.texture,J.setRenderTarget(null),J.clear(),this._fsQuad.render(J);this.highPassUniforms.tDiffuse.value=$.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,J.setRenderTarget(this.renderTargetBright),J.clear(),this._fsQuad.render(J);let W=this.renderTargetBright;for(let H=0;H<this.nMips;H++)this._fsQuad.material=this.separableBlurMaterials[H],this.separableBlurMaterials[H].uniforms.colorTexture.value=W.texture,this.separableBlurMaterials[H].uniforms.direction.value=X8.BlurDirectionX,J.setRenderTarget(this.renderTargetsHorizontal[H]),J.clear(),this._fsQuad.render(J),this.separableBlurMaterials[H].uniforms.colorTexture.value=this.renderTargetsHorizontal[H].texture,this.separableBlurMaterials[H].uniforms.direction.value=X8.BlurDirectionY,J.setRenderTarget(this.renderTargetsVertical[H]),J.clear(),this._fsQuad.render(J),W=this.renderTargetsVertical[H];if(this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,J.setRenderTarget(this.renderTargetsHorizontal[0]),J.clear(),this._fsQuad.render(J),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,K)J.state.buffers.stencil.setTest(!0);if(this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget($),this._fsQuad.render(J);J.setClearColor(this._oldClearColor,this._oldClearAlpha),J.autoClear=U}_getSeparableBlurMaterial(J){let Q=[],$=J/3;for(let U=0;U<J;U++)Q.push(0.39894*Math.exp(-0.5*U*U/($*$))/$);let Z=[],K=[];for(let U=1;U<J;U+=2){let W=Q[U],H=U+1<J?Q[U+1]:0,Y=W+H;Z.push((U*W+(U+1)*H)/Y),K.push(Y)}return new y9({defines:{KERNEL_PAIRS:Z.length},uniforms:{colorTexture:{value:null},invSize:{value:new Z0(0.5,0.5)},direction:{value:new Z0(0.5,0.5)},centerWeight:{value:Q[0]},gaussianOffsets:{value:Z},gaussianWeights:{value:K}},vertexShader:`

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

				}`})}_getCompositeMaterial(J){return new y9({defines:{NUM_MIPS:J},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}X8.BlurDirectionX=new Z0(1,0);X8.BlurDirectionY=new Z0(0,1);var vD="varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",yD=`
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
  float bar = letterbox * 0.128;
  if (vUv.y < bar || vUv.y > 1.0 - bar) c = vec3(0.0);
  c *= 1.0 - fade;
  gl_FragColor = vec4(max(c, 0.0), 1.0);
}`;class kU{composer;look={focus:0,aperture:0.0025,bloom:0.35,exposure:1,warmth:0,saturation:1,contrast:1,shadows:new U0(0.5,0.5,0.5),highlights:new U0(0.5,0.5,0.5),vignette:0.45,grain:0.06,aberration:0.4,halation:0.4,letterbox:1,fade:0,leak:0};bokeh;bloomPass;grade;constructor(J,Q,$,Z=new Z0(1920,1080)){this.composer=new u8(J),this.composer.addPass(new c8(Q,$)),this.bokeh=new TU(Q,$,{focus:10,aperture:this.look.aperture,maxblur:0.008}),this.composer.addPass(this.bokeh),this.bloomPass=new X8(Z,this.look.bloom,0.6,0.78),this.composer.addPass(this.bloomPass),this.composer.addPass(new l8),this.grade=new dJ({uniforms:{tDiffuse:{value:null},time:{value:0},aspect:{value:Z.x/Z.y},exposure:{value:1},warmth:{value:0},saturation:{value:1},contrast:{value:1},shadows:{value:new U0},highlights:{value:new U0},vignette:{value:0},grain:{value:0},aberration:{value:0},halation:{value:0},letterbox:{value:0},fade:{value:0},leak:{value:0}},vertexShader:vD,fragmentShader:yD}),this.composer.addPass(this.grade)}render(J){let Q=this.look,$=this.grade.uniforms;this.bokeh.enabled=Q.focus>0;let Z=this.bokeh.uniforms;Z.focus.value=Q.focus,Z.aperture.value=Q.aperture,this.bloomPass.strength=Q.bloom,$.time.value=J;for(let K of["exposure","warmth","saturation","contrast","vignette","grain","aberration","halation","letterbox","fade","leak"])$[K].value=Q[K];$.shadows.value.copy(Q.shadows),$.highlights.value.copy(Q.highlights),this.composer.render()}}var fD=(J)=>J*J*(3-2*J),nY=new T,sY=new T;function $7(J,Q,$,Z,K=!0){let U=K?fD(Math.min(1,Math.max(0,Z))):Z;J.position.copy(nY.fromArray(Q.pos).lerp(sY.fromArray($.pos),U));let W=nY.fromArray(Q.look).lerp(sY.fromArray($.look),U);J.up.set(0,1,0),J.lookAt(W),J.rotateZ(((Q.roll??0)+(($.roll??Q.roll??0)-(Q.roll??0))*U)*Math.PI/180);let H=(Q.fov??40)+(($.fov??Q.fov??40)-(Q.fov??40))*U;if(J.fov!==H)J.fov=H,J.updateProjectionMatrix()}var jU=(J,Q)=>Math.sin(J*0.73+Q)*0.5+Math.sin(J*1.37+Q*2.1)*0.3+Math.sin(J*2.9+Q*3.7)*0.2;function iY(J,Q,$=0.5){let Z=$*0.004;J.rotateX(jU(Q,1)*Z),J.rotateY(jU(Q,5)*Z*1.3),J.rotateZ(jU(Q,9)*Z*0.6)}var c9=(J,Q,$,Z)=>({name:J,at:Q,label:$,section:Z}),vU=(J,Q)=>[c9("ask",v(J)-0.3,"can you explain that function?",Q),c9("shrug",v(J+1)-0.2,"I don't know, I don't know",Q),c9("ask2",v(J+2)-0.2,"can you explain that function?",Q),c9("plank",v(J+3)-0.3,"over the plank you go",Q)];function FZ(){return[c9("title",0,"a shanty in one act","verse 1"),c9("sail",v(0)-0.4,"ten times faster, lads","verse 1"),c9("crates",v(2)-0.3,"four thousand lines","verse 1"),c9("green",v(4)-0.2,"the tests were green","verse 1"),c9("lgtm",v(5)-0.2,"L-G-T-M","verse 1"),c9("diff",v(6)-0.2,"read the diff at last","verse 1"),c9("mast",v(7)-0.2,"hollered from the mast","verse 1"),...vU(8,"chorus"),c9("kevin",v(12)-0.4,"it's just a helper","verse 2"),c9("bosun",v(14)-0.2,"load-bearing","verse 2"),c9("pulled",v(15)-0.2,"the mast stayed up","verse 2"),c9("cook",v(16)-0.2,"what's this thing for?","verse 2"),c9("great",v(17)-0.1,"great question!","verse 2"),...vU(18,"chorus"),c9("barnacles",v(22)-0.8,"slop creeps in like barnacles","verse 3"),c9("hull",v(24)-0.2,"a retry inside a retry","verse 3"),c9("stern",v(28)-0.3,"all barnacle, stem to stern","verse 3"),c9("steer",v(29)-0.2,"ten times harder to steer","verse 3"),c9("quarters",v(30)-1,"who approved that function?","bridge"),c9("blame",v(31)-0.2,"you did, Cap'n. nine seconds.","bridge"),c9("crew",v(32)-0.2,"nobody tell the crew","bridge"),c9("heard",v(33)-0.3,"we heard","bridge"),...vU(34,"last chorus"),c9("built",v(38)-0.3,"the plank was built by Claude","last chorus"),c9("fell",v(39)-0.2,"when Cap'n fell","last chorus"),c9("bottom",v(40)-0.6,"ten times faster to the bottom","outro"),c9("end",v(41)-0.3,"great question!","outro")]}var aY=null,fU=(J)=>{let Q=aY??=FZ(),$=Q[0];for(let Z of Q)if(Z.at<=J)$=Z;return $},bD=(J)=>{let Q=aY??=FZ();return Q[Q.indexOf(J)+1]?.at??w7()},qZ=()=>[{who:"jim",walk:v(11)-0.2,drop:N0(11,/^go/i),splash:N0(11,/splash/i)},{who:"cook",walk:v(21)-0.2,drop:N0(21,/^go/i),splash:N0(21,/splash/i)},{who:"cap",walk:v(37)-0.2,drop:N0(39,/fell/i),splash:N0(39,/splash/i)}],bU=(J)=>j(0,0.45,X0(J,v(22),v(24)))+j(0,0.55,X0(J,v(24),W9(28))),hD=(J)=>J<v(22)?0.05:J<v(30)-1?j(0.1,0.45,X0(J,v(22),v(30))):J<v(34)-0.3?0.12:J<v(40)-0.6?1:0.7,xD=(J)=>J<v(22)?0.86:J<v(30)-1?j(0.8,0.5,X0(J,v(22),v(30)-1)):J<v(34)-0.3?0.03:J<v(40)-0.6?0.18:j(0.3,0.42,X0(J,v(40),w7()));function uJ(J,Q,$,Z){return(0.18+0.75*Z)*(0.55*Math.sin(J*0.32+$*1.3)+0.35*Math.sin(Q*0.41-$*0.9+J*0.12)+0.18*Math.sin((J+Q)*0.9+$*2.1))}var S9=(J,Q=0.8,$={})=>new D9({color:J,roughness:Q,metalness:0,...$});function x6(J,Q,$,Z){let K=Object.assign(document.createElement("canvas"),{width:J,height:Q});$(K.getContext("2d"));let U=new j7(K);if(U.colorSpace=u7,U.anisotropy=8,Z)U.wrapS=U.wrapT=YJ,U.repeat.set(...Z);return U}var yU=(J,Q)=>x6(512,512,($)=>{for(let Z=0;Z<16;Z++){let K=l9(Z*3.1);$.fillStyle=`rgb(${J.map((U)=>Math.round(U*(0.8+K*0.35))).join(",")})`,$.fillRect(0,Z*32,512,31),$.fillStyle="rgba(0,0,0,.45)",$.fillRect(0,Z*32+31,512,1),$.fillStyle="rgba(0,0,0,.12)";for(let U=0;U<14;U++)$.fillRect(l9(Z*50+U)*512,Z*32+l9(U+Z)*30,30+l9(U*7+Z)*90,1);$.fillStyle="rgba(0,0,0,.3)",$.fillRect(l9(Z+99)*512,Z*32,2,31)}},Q),oY=(J,Q)=>x6(128,128,($)=>{for(let Z=0;Z<8;Z++)$.fillStyle=Z%2?Q:J,$.fillRect(0,Z*16,128,16)},[1,2]),gD=x6(1024,1024,(J)=>{J.fillStyle="#efe4c8",J.fillRect(0,0,1024,1024);for(let Q=0;Q<6;Q++)J.fillStyle="rgba(120,90,50,.18)",J.fillRect(Q*171,0,3,1024);for(let Q=0;Q<4000;Q++)J.fillStyle=`rgba(110,80,40,${l9(Q)*0.05})`,J.fillRect(l9(Q+1)*1024,l9(Q+2)*1024,3,3);J.fillStyle="#b8282a",J.font='900 420px "Inter", sans-serif',J.textAlign="center",J.fillText("10×",512,600),J.font='800 70px "JetBrains Mono", monospace',J.fillText("POWERED BY A-I",512,760)}),pD=x6(256,256,(J)=>{J.fillStyle="#8a6238",J.fillRect(0,0,256,256),J.strokeStyle="#4a3018",J.lineWidth=14,J.strokeRect(7,7,242,242),J.beginPath(),J.moveTo(10,10),J.lineTo(246,246),J.stroke(),J.fillStyle="rgba(20,10,0,.85)",J.font='800 54px "JetBrains Mono", monospace',J.textAlign="center",J.fillText("PR #1",128,112),J.font='700 40px "JetBrains Mono", monospace',J.fillText("+4,000",128,172)}),H7=(J=0,Q=0,$=0)=>new T(J,Q,$),I9=1.2;function hQ(J){let Q=new _0,$=S9(J.skin??14264450,0.7),Z=new $0(new Q9(0.25,0.22,0.7,16),J.shirt);Z.position.y=1.2;let K=new _0;K.position.y=1.75,K.add(new $0(new a0(0.18,20,16),$));let U=new $0(new a0(0.035,10,8),S9(3805200,0.9));U.position.set(0,-0.06,0.165),U.scale.set(1.4,0.4,0.5),K.add(U);for(let Y of[-1,1]){let G=new $0(new a0(0.022,8,6),S9(1118481,0.4));G.position.set(Y*0.065,0.03,0.16),K.add(G)}if(J.beard!==void 0){let Y=new $0(new a0(0.185,16,10,0,Math.PI*2,Math.PI*0.5,Math.PI*0.45),S9(J.beard,0.95));K.add(Y)}if(J.hat==="tricorn"){let Y=S9(1841698,0.8),G=new $0(new Q9(0.34,0.34,0.04,3),Y);G.position.y=0.13,G.rotation.y=Math.PI/6+Math.PI;let N=new $0(new Q9(0.15,0.19,0.18,18),Y);N.position.y=0.22;let D=new $0(new L7(0.3,0.012,6,3),new D9({color:14200928,metalness:0.8,roughness:0.35}));D.rotation.x=Math.PI/2,D.rotation.z=Math.PI/6+Math.PI,D.position.y=0.15,K.add(G,N,D)}else if(J.hat==="beanie"){let Y=new $0(new a0(0.19,18,10,0,Math.PI*2,0,Math.PI/2.2),S9(11680298,0.95));Y.position.y=0.03,K.add(Y)}else if(J.hat==="chef"){let Y=new $0(new Q9(0.18,0.18,0.12,18),S9(16052714,0.9));Y.position.y=0.16;let G=new $0(new a0(0.22,18,12),S9(16052714,0.9));G.position.y=0.33,G.scale.y=0.75,K.add(Y,G)}else{let Y=new $0(new a0(0.188,18,10,0,Math.PI*2,0,Math.PI/2.4),S9(2771594,0.9));K.add(Y)}let W=[-1,1].map((Y)=>{let G=new _0;G.position.set(Y*0.11,0.86,0);let N=new $0(new Q9(0.1,0.09,0.84,10).translate(0,-0.42,0),S9(J.legs??2894389,0.9)),D=new $0(new c0(0.13,0.12,0.28),S9(1971212,0.6));return D.position.set(0,-0.82,0.05),G.add(N,D),G}),H=[-1,1].map((Y)=>{let G=new _0;G.position.set(Y*0.3,1.48,0);let N=new $0(new Q9(0.07,0.06,0.62,8).translate(0,-0.31,0),J.shirt),D=new $0(new a0(0.065,10,8),$);return D.position.y=-0.65,G.add(N,D),G});return Q.add(Z,K,...W,...H),Q.traverse((Y)=>{if(Y.isMesh)Y.castShadow=!0}),Object.assign(Q.userData,{head:K,arms:H,legs:W,mouth:U}),Q.scale.setScalar(J.scale??1),Q}function lJ(J,Q,$,Z={}){let[K,U]=J.userData.arms,W=Math.sin($*Math.PI*2/(g7()*2)),H=(G,N,D)=>G.rotation.set(N,0,D);switch(Q){case"down":H(K,0.05,-0.12),H(U,0.05,0.12);break;case"haul":H(K,-1.1-W*0.45,-0.1),H(U,-1.1+W*0.45,0.1);break;case"shrug":H(K,-0.5,-1.1),H(U,-0.5,1.1);break;case"point":H(K,0.05,-0.12),H(U,-1.55,0.05);break;case"up":H(K,-0.2,-2.7-W*0.15),H(U,-0.2,2.7+W*0.15);break;case"hips":H(K,0.2,-0.6),H(U,0.2,0.6);break;case"pull":H(K,-1.3+W*0.2,-0.05),H(U,-1.3+W*0.2,0.05);break;case"hush":H(K,0.05,-0.12),H(U,-2.3,0.6);break;case"wheel":H(K,-1.2+Math.sin($*3)*0.25,-0.25),H(U,-1.2-Math.sin($*3)*0.25,0.25);break}J.userData.head.rotation.set(Z.tilt??0,Z.turn??0,Math.sin($*Math.PI/g7())*0.06),J.userData.mouth.scale.y=0.4+(Z.sing??0)*(0.8+Math.abs(Math.sin($*17))*0.9);let Y=Z.walk??0;J.userData.legs.forEach((G,N)=>G.rotation.x=Math.sin($*7+N*Math.PI)*0.45*Y)}function mD(){let J=new _0,Q=S9(15234107,0.4,{metalness:0.2}),$=new $0(new vJ(0.09,0.14,6,12),Q);$.rotation.x=0.4,$.position.y=0.14;let Z=new _0;Z.position.set(0,0.3,0.05),Z.add(new $0(new a0(0.085,16,12),Q));let K=new $0(new Z7(0.03,0.09,10),S9(15909198,0.5));K.rotation.x=Math.PI/2+0.5,K.position.set(0,-0.015,0.09);let U=new l0({color:7336191,toneMapped:!1});for(let Y of[-1,1]){let G=new $0(new a0(0.02,8,6),U);G.position.set(Y*0.05,0.02,0.06),Z.add(G)}Z.add(K);let W=[-1,1].map((Y)=>{let G=new _0;G.position.set(Y*0.08,0.2,0);let N=new $0(new c0(0.22,0.02,0.12).translate(Y*0.11,0,0),S9(12866858,0.5));return G.add(N),G}),H=new $0(new c0(0.06,0.02,0.22).translate(0,0,-0.11),S9(2779824,0.5));return H.position.set(0,0.06,-0.06),H.rotation.x=0.5,J.add($,Z,...W,H),J.traverse((Y)=>{if(Y.isMesh)Y.castShadow=!0}),J.userData={head:Z,wings:W},J}class rY{canvas=Object.assign(document.createElement("canvas"),{width:1024,height:1280});texture=new j7(this.canvas);key="";constructor(){this.texture.colorSpace=u7,this.texture.anisotropy=8}show(J,Q){let $=JSON.stringify([J,Q]);if($===this.key)return;this.key=$;let Z=this.canvas.getContext("2d");Z.fillStyle="#ead9ac",Z.fillRect(0,0,1024,1280);for(let W=0;W<2500;W++)Z.fillStyle=`rgba(120,80,30,${l9(W)*0.06})`,Z.fillRect(l9(W+3)*1024,l9(W+4)*1280,4,4);let K=Z.createRadialGradient(512,640,300,512,640,900);K.addColorStop(0,"rgba(0,0,0,0)"),K.addColorStop(1,"rgba(90,50,10,.55)"),Z.fillStyle=K,Z.fillRect(0,0,1024,1280),Z.fillStyle="#3a2410",Z.font='italic 700 62px "Playfair Display", Georgia, serif',Z.fillText(J,70,140),Z.fillRect(70,170,884,4);let U=270;for(let W of Q)Z.font='700 46px "JetBrains Mono", monospace',Z.fillStyle=W.color??"#2a1a0c",Z.fillText(W.text,70,U),U+=74;this.texture.needsUpdate=!0}}class hU{renderer;scene=new V8;camera=new e9(38,1.7777777777777777,0.05,1500);film;sky=new wU(700);sun=new G8(16777215,1);hemi=new B8(12572415,1718852,0.6);fill=new G8(16773344,0.6);ocean;ship=new _0;sail;sailBase;plank=new _0;helper;crates=[];barnacles;barnacleSpots=[];lanterns=[];lanternGlass=[];scroll=new rY;scrollMesh;splash;rings;rain;cap=hQ({shirt:S9(1911634,0.8),hat:"tricorn",beard:5913124,legs:15327951,scale:1.05});kevin=hQ({shirt:S9(16777215,0.9,{map:oY("#f2efe6","#1e3d7a")}),hat:"beanie",skin:15186070});bosun=hQ({shirt:S9(6965802,0.9),hat:"bandana",beard:2234383,skin:10119752,scale:1.12});cook=hQ({shirt:S9(16052714,0.9),hat:"chef",skin:12947306});jim=hQ({shirt:S9(16777215,0.9,{map:oY("#f2efe6","#a12a2a")}),hat:"beanie",beard:10512430,skin:14724742});parrot=mD();constructor(J){this.renderer=new m8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=_6,this.renderer.toneMapping=b8,this.film=new kU(this.renderer,this.scene,this.camera),this.scene.fog=new SJ(10467016,0.012),this.scene.add(this.sky.mesh,this.sky.stars,this.hemi,this.sun,this.sun.target,this.fill,this.fill.target),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:1,far:80}),this.sun.shadow.bias=-0.0004,this.sun.shadow.normalBias=0.03;let Q=new A9(180,180,150,150);Q.rotateX(-Math.PI/2),this.ocean=new $0(Q,new D9({color:1923952,roughness:0.22,metalness:0.1,flatShading:!0})),this.ocean.receiveShadow=!0,this.scene.add(this.ocean),this.buildShip(),this.scene.add(this.ship);let $=260,Z=new F9;Z.setAttribute("position",new Q7(new Float32Array($*3),3)),this.splash=new W8(Z,new s7({color:15398655,size:0.22,transparent:!0,depthWrite:!1})),this.splash.frustumCulled=!1,this.rings=new $0(new yJ(0.8,1,48),new l0({color:15398655,transparent:!0,side:r9,depthWrite:!1})),this.rings.rotation.x=-Math.PI/2;let K=4000,U=new Float32Array(K*3);for(let H=0;H<K;H++)U.set([(l9(H)-0.5)*40,l9(H+7000)*20,(l9(H+9000)-0.5)*40],H*3);let W=new F9;W.setAttribute("position",new Q7(U,3)),this.rain=new W8(W,new s7({color:12110040,size:0.05,transparent:!0,opacity:0,depthWrite:!1})),this.rain.frustumCulled=!1,this.scene.add(this.splash,this.rings,this.rain,this.parrot)}buildShip(){let J=this.ship,Q=new c0(11,2.2,3.4,40,6,8),$=Q.attributes.position;for(let M=0;M<$.count;M++){let I=$.getX(M),f=$.getY(M),S=$.getZ(M),h=k9((I-1.5)/4),a=k9((1.1-f)/2.2),k=(1-h*h*0.95)*(1-a*a*0.55);$.setXYZ(M,I-(I<-4.5?(I+4.5)*0.2:0),f+h*h*0.5*(f>0?1:0.3),S*k)}Q.computeVertexNormals();let Z=S9(16777215,0.75,{map:yU([110,66,38],[3,1])}),K=new $0(Q,Z);K.position.y=0.1,K.castShadow=K.receiveShadow=!0;let U=new $0(Q.clone(),S9(14200928,0.5));U.scale.set(1.002,0.06,1.01),U.position.y=0.85;let W=new $0(new A9(9.6,2.9),S9(16777215,0.8,{map:yU([170,130,85],[2,1])}));W.rotation.x=-Math.PI/2,W.position.set(-0.5,I9,0),W.receiveShadow=!0,J.add(K,U,W);let H=S9(5913122,0.6);for(let M of[-1.45,1.45]){for(let[I,f]of M>0?[[-5.1,-1],[0.6,3.9]]:[[-5.1,3.9]]){let S=new $0(new c0(f-I,0.08,0.08),H);S.position.set((I+f)/2,I9+0.65,M),J.add(S)}for(let I=-5;I<=3.6;I+=0.8){if(M>0&&Math.abs(I- -0.2)<0.5)continue;let f=new $0(new c0(0.07,0.65,0.07),H);f.position.set(I,I9+0.32,M),f.castShadow=!0,J.add(f)}}let Y=new $0(new c0(2.6,0.6,3),S9(16777215,0.8,{map:yU([140,96,60],[1,1])}));Y.position.set(-4,I9+0.3,0),Y.castShadow=Y.receiveShadow=!0,J.add(Y);let G=new _0;G.position.set(-3,I9+1.45,0),G.rotation.y=Math.PI/2;let N=new $0(new L7(0.42,0.04,8,24),H);G.add(N);for(let M=0;M<8;M++){let I=new $0(new Q9(0.025,0.025,1.1),H);I.rotation.z=M*Math.PI/8,G.add(I)}let D=new $0(new c0(0.15,0.85,0.15),H);D.position.set(-3,I9+1,0),J.add(G,D),J.userData.wheel=G;let X=new $0(new c0(0.9,0.06,0.7),H);X.position.set(-4.4,I9+1.45,0.6);let F=new $0(new c0(0.1,0.85,0.1),H);F.position.set(-4.4,I9+1.02,0.6),this.scrollMesh=new $0(new A9(0.56,0.7),new D9({map:this.scroll.texture,roughness:0.9})),this.scrollMesh.rotation.x=-Math.PI/2,this.scrollMesh.rotation.z=Math.PI/2,this.scrollMesh.position.set(-4.4,I9+1.485,0.6),J.add(X,F,this.scrollMesh);let O=S9(6965802,0.6),V=new $0(new Q9(0.12,0.16,8.5),O);V.position.set(0.6,I9+4.25,0);let q=new $0(new Q9(0.09,0.12,6),O);q.position.set(-2.6,I9+3+0.6,0);let E=new $0(new Q9(0.5,0.4,0.4,16,1,!0),S9(5913122,0.7,{side:r9}));E.position.set(0.6,I9+7.2,0);for(let M of[I9+6.4,I9+2.2]){let I=new $0(new Q9(0.07,0.07,4.6),O);I.rotation.x=Math.PI/2,I.position.set(0.75,M,0),J.add(I)}let L=new A9(4.2,4,16,16);L.rotateY(Math.PI/2),this.sail=new $0(L,S9(16777215,0.95,{map:gD,side:r9})),this.sail.position.set(0.85,I9+4.3,0),this.sail.castShadow=!0,this.sailBase=L.attributes.position.array.slice();let A=new $0(new A9(0.9,0.55),S9(16777215,0.9,{side:r9,map:x6(256,160,(M)=>{M.fillStyle="#111",M.fillRect(0,0,256,160),M.fillStyle="#f4f1ea",M.font='800 64px "JetBrains Mono", monospace',M.textAlign="center",M.fillText("LGTM",128,104)})}));A.position.set(0.15,I9+8.7,0),J.add(V,q,E,this.sail,A),J.userData.flag=A,this.helper=new $0(new c0(0.42,0.22,0.22),new D9({color:3836506,emissive:2817914,emissiveIntensity:0.6,roughness:0.4})),this.helper.position.set(0.6,I9+0.4,0.2),J.add(this.helper);let R=new $0(new c0(0.5,0.07,3.2).translate(0,0,1.6),S9(16777215,0.7,{map:x6(128,512,(M)=>{M.fillStyle="#9a7048",M.fillRect(0,0,128,512);for(let I=0;I<30;I++)M.fillStyle="rgba(60,30,10,.25)",M.fillRect(0,l9(I)*512,128,2);M.save(),M.translate(64,256),M.rotate(Math.PI/2),M.fillStyle="rgba(30,15,5,.75)",M.font='700 30px "JetBrains Mono", monospace',M.textAlign="center",M.fillText("plank.ts · generated",0,10),M.restore()})}));R.castShadow=R.receiveShadow=!0,this.plank.position.set(-0.2,I9+0.05,1.4),this.plank.add(R),J.add(this.plank);let _=new c0(0.62,0.62,0.62),B=S9(16777215,0.8,{map:pD});for(let M=0;M<14;M++){let I=new $0(_,B);I.castShadow=I.receiveShadow=!0;let f=M%5,S=Math.floor(M/5);I.userData.home=H7(2+f%3*0.66+(S===2?0.33:0),I9+0.31+S*0.62,-0.95+Math.floor(f/3)*0.66+(S?0.33:0)),I.rotation.y=(l9(M)-0.5)*0.25,this.crates.push(I),J.add(I)}let z=new T;for(let M=0;M<520;M++){let I=-4.4+l9(M)*8.8,f=-0.5+l9(M+1)*1.4,S=l9(M+2)>0.5?1:-1,h=k9((I-1.5)/4),a=k9((1.1-f)/2.2),k=1.7*(1-h*h*0.95)*(1-a*a*0.55);z.set(I,f+0.1+h*h*0.5*(f>0?1:0.3),S*(k+0.01)),this.barnacleSpots.push({p:z.clone(),n:H7(0,0,S),s:0.025+l9(M+3)*0.04})}this.barnacleSpots.sort((M,I)=>I.p.x-M.p.x+(l9(M.p.y)-0.5)*3),this.barnacles=new p9(new Z7(1,1.1,7),S9(11117204,0.95),this.barnacleSpots.length),this.barnacles.castShadow=!0,J.add(this.barnacles);for(let[M,I]of[[-4.9,-1.2],[-1.6,-1.3],[3.6,1.3]]){let f=new $0(new a0(0.1,12,10),new l0({color:16760944,toneMapped:!1}));f.position.set(M,I9+(M<-4?1.75:1),I);let S=new v6(16754768,0,9,1.6);S.position.copy(f.position),this.lanterns.push(S),this.lanternGlass.push(f),J.add(f,S)}for(let M of[this.cap,this.kevin,this.bosun,this.cook,this.jim])J.add(M)}flash(J){let Q=0;for(let $ of[v(34),N0(35,/know/i),v(36)+0.4,N0(39,/fell/i)])if(J>=$)Q=Math.max(Q,Math.exp(-(J-$)*9)*0.55);return J>=v(34)-0.3&&J<v(40)-0.6?Q:0}fade(J){return _9(W9(41)+0.4,w7(),J)}t=0;update(J){this.t=J;let Q=fU(J),$=Q.name,Z=Q.at,K=bD(Q),U=X0(J,Z,K),W=this.camera,H=this.film.look,Y=hD(J),G=xD(J),N=1-_9(0.1,0.4,G),D=r7(J),X=this.sky.set(G,0.9);this.sun.position.copy(X).multiplyScalar(40),this.sun.intensity=j(0.05,2.4,_9(0.15,0.6,G))*(1-Y*0.7),this.sun.color.setRGB(1,j(0.7,0.96,G),j(0.5,0.9,G)),this.hemi.intensity=j(0.25,1.1,G)*(1-Y*0.4);let F=this.scene.fog;F.color.setRGB(j(0.03,0.62,G),j(0.04,0.72,G),j(0.08,0.8,G)).lerp(new U0(0.12,0.14,0.17),Y*0.7),F.density=0.01+Y*0.025;let O=this.ocean.geometry.attributes.position,V=J*2.2;for(let t=0;t<O.count;t++){let h0=O.getX(t),n=O.getZ(t);O.setY(t,uJ(h0+V,n,J,Y))}O.needsUpdate=!0,this.ocean.geometry.computeVertexNormals(),this.ocean.material.color.setRGB(j(0.02,0.1,G),j(0.05,0.36,G),j(0.09,0.44,G)).lerp(new U0(0.08,0.13,0.15),Y*0.6);let q=G9(X0(J,v(40)-0.3,W9(41)+0.5)),E=uJ(V,0,J,Y),L=uJ(4+V,0,J,Y),A=uJ(-4+V,0,J,Y),R=uJ(V,1.6,J,Y),_=uJ(V,-1.6,J,Y);this.ship.position.set(0,E*0.6-0.15-q*3.4,0),this.ship.rotation.set((R-_)/3.2*0.5+q*0.25,0,(L-A)/8*0.6-q*0.32),this.ship.userData.wheel.rotation.x=Math.sin(J*0.8)*0.4+($==="steer"||$==="stern"?Math.sin(J*2.6)*1.2:0);let B=this.sail.geometry.attributes.position;for(let t=0;t<B.count;t++){let h0=this.sailBase[t*3+1],n=this.sailBase[t*3+2],W0=(1-(n/2.1)**2)*(1-(h0/2)**2);B.setX(t,W0*(0.55+D*0.08+Y*Math.sin(J*9+n*2+h0)*0.12))}B.needsUpdate=!0,this.sail.geometry.computeVertexNormals();let z=this.ship.userData.flag;z.rotation.y=Math.sin(J*4)*0.25+Y*Math.sin(J*13)*0.3,this.lanterns.forEach((t,h0)=>t.intensity=(N*2.2+Y*1.2)*(0.85+Math.sin(J*11+h0*3)*0.08+Math.sin(J*23+h0)*0.05)),this.lanternGlass.forEach((t)=>t.material.color.setRGB(1,0.75,0.45).multiplyScalar(0.3+N*0.45+Y*0.2)),this.crates.forEach((t,h0)=>{let n=t.userData.home,W0=v(2)-0.4+h0*0.12,F0=X0(J,W0,W0+0.55),g0=F0<1?(1-F0)**2*7-Math.sin(F0*Math.PI)*0:Math.abs(Math.sin((J-W0-0.55)*9))*Math.exp(-(J-W0-0.55)*6)*0.15;t.position.set(n.x,n.y+g0,n.z),t.visible=J>W0});let M=G9(X0(J,N0(15,/pulled/i)-0.1,N0(15,/out/i)+0.3));this.helper.position.set(0.6+M*0.4,I9+0.4+M*0.5,0.2+M*0.9),this.helper.rotation.set(M*0.8,M*1.4,0),this.helper.material.emissiveIntensity=0.6+($==="bosun"?D*1.2:0);let I=bU(J),f=new z9,S=new Z8,h=H7(0,1,0);if(this.barnacleSpots.forEach((t,h0)=>{let n=k9((I*this.barnacleSpots.length-h0)/25),W0=t.s*T9(n);S.setFromUnitVectors(h,t.n),f.compose(t.p.clone().addScaledVector(t.n,W0*0.4),S,H7(W0,W0,W0)),this.barnacles.setMatrixAt(h0,f)}),this.barnacles.instanceMatrix.needsUpdate=!0,this.crewAt(J,$),J<v(12)){let t=[{text:"+ function doTheThing(x) {"},{text:"+   return helpers.help(x)"},{text:"+     ?? retry(() => retry(() =>"},{text:"+          factory.make(String(x))))"},{text:"+ }"},{text:"+ // what does this do"},{text:"+ // (it helps)"},{text:"  ... 3,993 more lines",color:"#7a5a3a"}];this.scroll.show("PR #1 · the diff",t.slice(0,1+Math.floor(X0(J,v(6)-0.3,W9(7))*t.length)))}else{let t=[{text:"$ git blame doTheThing"},{text:"author:    Claude"},{text:"approved:  Cap'n",color:J>v(31)?"#8a1010":void 0},{text:"review:    L-G-T-M",color:J>N0(31,/^L/)?"#8a1010":void 0},{text:`time:      ${J>N0(31,/nine/i)?"9 seconds":"…"}`,color:J>N0(31,/nine/i)?"#8a1010":void 0},{text:"tell crew: no",color:"#7a5a3a"}];this.scroll.show("who approved it?",t.slice(0,J<v(30)?1:2+Math.floor(X0(J,v(30),W9(32))*4)))}let a=-99,k=H7();for(let t of qZ())if(J>=t.splash-0.05&&t.splash>a)a=t.splash,k=this.plankEnd();let m=J-a,e=this.splash.geometry.attributes.position;for(let t=0;t<e.count;t++){let h0=l9(t)*Math.PI*2,n=0.4+l9(t+1)*1.8,W0=3+l9(t+2)*5;e.setXYZ(t,k.x+Math.cos(h0)*n*m*1.4,k.y+W0*m-4.9*m*m,k.z+Math.sin(h0)*n*m*1.4)}e.needsUpdate=!0,this.splash.visible=m>=0&&m<1.6,this.splash.material.opacity=1-X0(m,0.6,1.6),this.rings.visible=m>=0&&m<3,this.rings.position.set(k.x,k.y+0.05,k.z),this.rings.scale.setScalar(0.3+m*2.2),this.rings.material.opacity=0.8*(1-X0(m,0,3));let l=this.rain.geometry.attributes.position;for(let t=0;t<l.count;t++)l.setY(t,((l9(t+7000)*20-J*14)%20+20)%20);l.needsUpdate=!0,this.rain.material.opacity=_9(0.5,0.9,Y)*0.6;let i=(t,h0,n=38)=>({pos:t,look:h0,fov:n}),p=this.ship.position.y,o=this.cap.getWorldPosition(H7()),H0=this.kevin.getWorldPosition(H7());Object.assign(H,{focus:0,aperture:0.002,bloom:0.4,exposure:1,warmth:0.2,saturation:1.05,contrast:1.05,vignette:0.5,grain:0.06,aberration:0.4,halation:0.4,letterbox:1,leak:0,fade:0}),H.shadows.setRGB(0.42,0.5,0.58),H.highlights.setRGB(0.6,0.54,0.44);let S0=0.5;switch($){case"title":$7(W,i([22,7,18],[0,3,0],34),i([17,5.5,14],[0,3,0],34),U),Object.assign(H,{warmth:0.35,leak:0.25});break;case"sail":$7(W,i([9,0.9,6.5],[0.5,4.5+p,0],40),i([7.2,1.2,5.2],[0.5,5+p,0],44),U),H.warmth=0.3;break;case"crates":$7(W,i([7.5,4.8,4.5],[2.4,1.6+p,-0.6],36),i([6.4,4,3.4],[2.4,1.6+p,-0.6],36),U),H.focus=5.5,H.aperture=0.003;break;case"green":case"lgtm":$7(W,i([-1.2,3.4+p,2.6],[o.x,o.y+1.6,o.z],32),i([-1.6,3.2+p,2.2],[o.x,o.y+1.6,o.z],30),U),H.focus=3.2,H.aperture=0.006;break;case"diff":$7(W,i([-4,3.5+p,1.6],[-4.4,2.7+p,0.6],30),i([-4.2,3.2+p,1.1],[-4.4,2.6+p,0.6],28),U),H.focus=1,H.aperture=0.01,S0=0.3;break;case"mast":$7(W,i([-1,1.9+p,1.6],[o.x,o.y+1.9,o.z],34),i([-1.4,1.7+p,1.3],[o.x,o.y+1.9,o.z],30),U),S0=1.1;break;case"ask":case"ask2":{let t=$==="ask"?1:-1;$7(W,i([1.6,3.8+p,t*6.2],[-1.2,2.2+p,0],36),i([1,3.4+p,t*5.2],[-1.2,2.2+p,0],36),U),H.warmth=J>v(34)-0.3?-0.35:0.25,S0=J>v(34)-0.3?1.4:0.7;break}case"shrug":$7(W,i([0.6,2.7+p,3.6],[-0.4,2.3+p,0.2],34),i([0.4,2.6+p,3.1],[-0.4,2.3+p,0.2],32),U),H.focus=3.4,H.aperture=0.005,H.warmth=J>v(34)?-0.35:0.25;break;case"plank":case"fell":{let t=this.plankEnd();$7(W,i([t.x+3.5,0.9,t.z+6.5],[t.x-0.5,1.6+p,t.z-0.8],36),i([t.x+2.6,0.8,t.z+5.4],[t.x-0.4,1.2+p,t.z-0.6],38),U),H.warmth=J>v(34)-0.3?-0.35:0.25,S0=0.8;break}case"kevin":$7(W,i([2.8,3+p,4.6],[(o.x+H0.x)/2,2.6+p,0.3],36),i([2.4,2.9+p,4.1],[(o.x+H0.x)/2,2.6+p,0.3],34),U),H.focus=3.5,H.aperture=0.005;break;case"bosun":case"pulled":$7(W,i([1.6,2.4+p,4.2],[0.8,1.8+p,0.4],34),i([1.4,2.6+p,3.6],[0.8,$==="pulled"?3.4+p:1.9+p,0.4],38),U),H.focus=4.4,H.aperture=0.004;break;case"cook":case"great":{let t=this.parrot.getWorldPosition(H7()),h0=this.cook.getWorldPosition(H7());$7(W,i([t.x+2.2,t.y+0.3,t.z+1.4],[(t.x+h0.x)/2,t.y-0.1,(t.z+h0.z)/2],32),i([t.x+1.4,t.y+0.15,t.z+0.9],[t.x,t.y,t.z],$==="great"?24:30),U),H.focus=$==="great"?1.7:2.4,H.aperture=0.008,H.exposure=1.15;break}case"barnacles":$7(W,i([5,0.5,4.2],[3,0.6+p,1.2],36),i([2.5,0.4,3.6],[1,0.6+p,1.4],36),U),H.focus=3.2,H.aperture=0.003,H.warmth=0.1,H.exposure=1.45;break;case"hull":$7(W,i([4,0.7,4.4],[2,0.6+p,1.4],40),i([-4,0.7,4.4],[-5,0.6+p,1.4],40),U),H.warmth=0;break;case"stern":$7(W,i([8,3,-7.5],[-1,1.4+p,0],36),i([6.5,2.4,-6],[-1,1.4+p,0],34),U),H.warmth=-0.1;break;case"steer":$7(W,i([-1.5,3.3+p,-2.4],[o.x,o.y+1.6,o.z],32),i([-1.8,3.1+p,-2],[o.x,o.y+1.6,o.z],30),U),H.focus=2.6,H.aperture=0.006,S0=1.4,H.warmth=-0.15;break;case"quarters":case"crew":$7(W,i([-1.3,4.1+p,3.4],[-4.2,3.2+p,0.5],38),i([-1.6,4+p,3],[-4.2,3.2+p,0.5],36),U),Object.assign(H,{warmth:0.55,exposure:1.6,bloom:0.45,halation:0.6,saturation:0.9}),H.focus=3.4,H.aperture=0.006,S0=0.35;break;case"blame":$7(W,i([-4.05,3.45+p,1.45],[-4.4,2.65+p,0.6],30),i([-4.2,3.25+p,1.05],[-4.4,2.65+p,0.6],26),U),Object.assign(H,{warmth:0.5,exposure:1,bloom:0.3,halation:0.4}),H.focus=0.9,H.aperture=0.01,S0=0.25;break;case"heard":$7(W,i([3.8,3.1+p,-4.8],[0.7,2.7+p,-0.8],30),i([3.5,3+p,-4.4],[0.7,2.7+p,-0.8],27),U),Object.assign(H,{warmth:0.3,exposure:1.35,saturation:0.85}),H.focus=5,H.aperture=0.004;break;case"built":{let t=this.plankEnd();$7(W,i([t.x+1.2,t.y+1.4,t.z+1],[t.x-0.2,t.y,t.z-1.2],34),i([t.x+0.8,t.y+1,t.z+0.6],[t.x-0.2,t.y,t.z-1.2],30),U),H.focus=1.6,H.aperture=0.007,H.warmth=-0.35,H.exposure=2.1,S0=1.2;break}case"bottom":$7(W,i([16,3.5,13],[0,0.5,0],34),i([13,2.5,11],[0,0,0],34),U),Object.assign(H,{warmth:-0.2,saturation:0.8});break;case"end":{let t=this.parrot.getWorldPosition(H7());$7(W,i([t.x+2.8,t.y+0.4,t.z+3.4],[t.x,t.y,t.z],30),i([t.x+1.8,t.y+0.2,t.z+2.4],[t.x,t.y,t.z],26),U),Object.assign(H,{warmth:0.15,saturation:0.9}),H.focus=3,H.aperture=0.004;break}}if(Y>0.6)Object.assign(H,{saturation:0.75,contrast:1.15,exposure:1.2,aberration:0.8});if(N>0.5&&$!=="quarters"&&$!=="crew"&&$!=="blame"&&$!=="heard")H.exposure=Math.max(H.exposure,1.25);if($==="title")H.fade=1-_9(0,1.2,J);let x0=W.getWorldDirection(H7());this.fill.position.copy(W.position).add(H7(0,1.5,0)),this.fill.target.position.copy(W.position).addScaledVector(x0,6),this.fill.intensity=(0.25+G*0.55)*(1-Y*0.3),iY(W,J,S0+Y*0.8),W.position.y=Math.max(W.position.y,uJ(W.position.x+V,W.position.z,J,Y)+0.35),this.rain.position.set(W.position.x,0,W.position.z)}plankEnd(){return this.plank.localToWorld(H7(0,0.05,3.1))}crewAt(J,Q){let $=qZ(),Z=(q)=>q.some((E)=>J>=v(E)&&J<=W9(E))?1:0,K=[8,9,10,11,18,19,20,21,34,35,36,37,38,39].some((q)=>J>=v(q)-0.2&&J<=W9(q)+0.2),U=[9,19,35].some((q)=>J>=v(q)-0.1&&J<=W9(q)+0.4),W=Math.sin(J*Math.PI/g7())*0.07,H=(q,E,L)=>{if(J>=E.splash+0.1)return q.visible=!1,!0;if(q.visible=!0,J<E.walk)return!1;let A=this.plank.position.z,R=this.plank.position.x,_=X0(J,E.walk,E.drop),B=Math.max(L.z,0.75),z=k9(_/0.1),M=k9((_-0.1)/0.2),I=k9((_-0.3)/0.1),f=k9((_-0.4)/0.6),S=j(L.x,R,_9(0,1,M)),h=j(j(L.z,B,_9(0,1,z)),A,_9(0,1,I))+f*2.9,a=j(L.y,I9+0.05,_9(0,1,M)),k=Math.max(0,J-E.drop),m=Math.min(k*k*4.9+k*0.8,I9+3);return q.position.set(S,a-m,h+k*0.6),q.rotation.set(k*2.2,M>0&&M<1?Math.sign(R-L.x)*Math.PI/2:0,0),lJ(q,k>0?"up":"down",J,{walk:k>0?0:1,tilt:0.3}),!0},Y=H7(-3.5,I9+0.6,0);if(!H(this.cap,$[2],Y)&&this.cap.visible){let q=J>=v(30)-1&&J<v(34)-0.3;this.cap.position.copy(q?H7(-4.5,I9+0.6,-0.1):Q==="green"||Q==="lgtm"||Q==="diff"?H7(-4.1,I9+0.6,0):H7(-3.5,I9+0.6,0)),this.cap.rotation.set(0,q?Math.PI*0.3:Q==="diff"||Q==="green"||Q==="lgtm"?Math.PI*0.2:Math.PI/2,W*0.5);let E=Q==="mast"?"point":Q==="steer"||Q==="stern"?"wheel":Q==="lgtm"?"point":K?"point":Q==="crew"?"hush":Q==="quarters"?"hips":"down";lJ(this.cap,E,J,{sing:Q==="mast"||K?1:0,tilt:Q==="diff"?0.45:Q==="mast"?-0.25:0})}let N=J>=$[2].drop;if(!N){this.cap.updateMatrixWorld(!0);let q=this.cap.localToWorld(H7(0.28,1.62,0));this.parrot.position.copy(q),this.parrot.rotation.set(0,this.cap.rotation.y+Math.sin(J*0.7)*0.4,0)}else{let q=J-$[2].drop,E=this.plankEnd();this.parrot.position.set(E.x+Math.sin(J*0.8)*0.6,Math.max(E.y,1.2)+1.2+Math.min(q,2)*0.6+Math.sin(J*3)*0.1,E.z-0.4),this.parrot.rotation.set(0,Math.PI/2+Math.sin(J*0.6)*0.5,0)}let D=N?Math.sin(J*22)*0.9:Q==="great"||Q==="end"?Math.sin(J*16)*0.5:0;this.parrot.userData.wings.forEach((q,E)=>q.rotation.z=(E?-1:1)*(0.2+D));let X=[17,41].some((q)=>J>=N0(q,/great/i)-0.05&&J<=W9(q));if(this.parrot.userData.head.rotation.set(X?-0.35+Math.sin(J*20)*0.15:0,Math.sin(J*1.3)*0.4,0),this.parrot.scale.setScalar(Q==="end"||Q==="bottom"?1.6:1),this.kevin.position.set(0.65,I9,0.85),this.kevin.rotation.set(0,-Math.PI/2+0.3,W),lJ(this.kevin,U?"shrug":Q==="kevin"?"hips":Q==="heard"?"hush":"haul",J,{sing:Z([12,13])||(K?1:0),tilt:Q==="heard"?-0.15:0}),Q==="heard")this.kevin.position.set(0.5,I9,-0.85);if(Q==="quarters"||Q==="blame"||Q==="crew")this.kevin.position.set(-4,I9+0.6,1.3),this.kevin.rotation.set(0,-2.8,0),lJ(this.kevin,Q==="blame"?"point":"down",J,{sing:Z([31]),tilt:0.15});if(this.bosun.position.set(1.2,I9,0.55),this.bosun.rotation.set(0,-Math.PI*0.75,W),lJ(this.bosun,Q==="pulled"?"pull":U?"shrug":Q==="bosun"?"point":"haul",J,{sing:K?1:0}),Q==="heard")this.bosun.position.set(0.85,I9,-0.7),this.bosun.rotation.y=-Math.PI*0.6;let F=H7(-1.4,I9,-0.6);if(!H(this.cook,$[1],F)&&this.cook.visible)this.cook.position.copy(Q==="cook"||Q==="great"?H7(-2.5,I9+0.6,-1):F),this.cook.rotation.set(0,Q==="cook"||Q==="great"?-Math.PI*0.6:Math.PI*0.25,W),lJ(this.cook,U?"shrug":Q==="cook"?"point":"haul",J,{sing:Z([16])||(K?1:0)});let O=H7(-0.8,I9,0.4);if(!H(this.jim,$[0],O)&&this.jim.visible)this.jim.position.copy(O),this.jim.rotation.set(0,Math.PI*0.4,W),lJ(this.jim,U?"shrug":"haul",J,{sing:K?1:0});let V=_9(N0(39,/fell/i)-0.3,N0(39,/fell/i),J);this.plank.rotation.x=V*0.5}render(){this.film.render(this.t)}}var dD=/^(plank|splash!|splash|overboard|fell|bottom|know!|know|don't|nobody|barnacle|barnacles|slop|true|harder)$/,uD=/^(function\?|function|a-i|claude|claude,|helper|helper"|retry|factory|string|date|test|diff|p-r|lines|l-g-t-m!|l-g-t-m\.)$/,lD=/^(cap'n|cap'n!|kevin|kevin,|bosun|cook|crew|ten|faster|faster!|heave|ho!|nine|load-bearing|load-bearing!|great|question!|question!")$/,tY={title:"Can You Explain That Function?",fonts:['400 100px "Pirata One"','italic 700 60px "Playfair Display"','700 20px "JetBrains Mono"','900 100px "Inter"','400 100px "Anton"'],overlays:()=>`
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
  <div class="ov bubble big" data-show="W41:great-0.05|E41+1.2" data-at="W41:great-0.05">Great question!</div>`,endAt:()=>W9(41)+1.4,words:{hot:dD,ice:uD,gold:lD},hide:/^(whispered)$/,hud:(J,Q)=>{let $=qZ().filter((Z)=>J>=Z.splash).length;return{left:`explain that function &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`crew aboard <span class="ice">${5-$}</span> &nbsp;·&nbsp; functions explained <b>0</b> &nbsp;·&nbsp; hull ${Math.round(bU(J)*100)}% barnacle`}},shots:FZ,shotAt:fU,world:(J)=>{let Q=new hU(J);return{update:($)=>Q.update($),render:()=>Q.render(),flash:($)=>Q.flash($),fade:($)=>Q.fade($)}}};var gU=[["witness","can I get a witness"],["greenwash","green is just a color"],["sign","can't comprehend"],["aisle","who looked in?"],["read","read the diff!"]];function mQ(){let J=(Q,$,Z)=>gU.slice(0,$).map(([K,U],W)=>({name:K,label:U,section:Z,at:v(Q+W)-0.2}));return[{name:"exterior",at:0,label:"sunday morning",section:"spoken"},{name:"pulpit",at:N0(0,/^says/i)-0.1,label:"the good book",section:"spoken"},{name:"shipit",at:v(1)-0.3,label:"ship it!",section:"spoken"},{name:"who",at:v(2)-0.3,label:"who read the diff?",section:"spoken"},{name:"scroll",at:v(3)-0.3,label:"four thousand lines",section:"verse 1"},{name:"button",at:v(4)-0.2,label:"eleven seconds",section:"verse 1"},{name:"nine",at:v(5)-0.2,label:"line nine hundred",section:"verse 1"},{name:"greenbtn",at:v(6)-0.2,label:"the button was green",section:"verse 1"},{name:"devil",at:v(7)-0.2,label:"the devil's in the diff",section:"pre-chorus"},{name:"nobody",at:N0(8,/^nobody/i)-0.5,label:"ain't nobody looking",section:"pre-chorus"},...J(9,5,"chorus"),{name:"loaf",at:v(14)-0.6,label:"a little slop",section:"verse 2"},{name:"commits",at:v(15)-0.2,label:"the repo stunk",section:"verse 2"},{name:"candles",at:v(16)-0.2,label:"cleaned up some flaky tests",section:"verse 2"},{name:"laptop",at:v(18)-0.2,label:"explain this function",section:"verse 2"},{name:"bot",at:v(20)-0.2,label:"the bot said amen",section:"verse 2"},{name:"fire",at:v(21)-0.2,label:"prod's on fire",section:"verse 2"},...J(22,5,"chorus"),{name:"tablets",at:v(27)-0.6,label:"the commandments",section:"bridge"},{name:"devil",at:v(32)-0.2,label:"the devil's in the diff",section:"pre-chorus"},...J(33,3,"final chorus"),{name:"sermon",at:v(36)-0.2,label:"written with claude",section:"final chorus"},{name:"deadpan",at:v(37)-0.3,label:"it sounded so confident",section:"spoken"},{name:"lgtm",at:v(38)-0.3,label:"l-g-t-m",section:"choir"},{name:"pray",at:v(39)-0.6,label:"let us pray",section:"outro"},{name:"approved",at:v(40)-0.2,label:"amen. approved.",section:"outro"},{name:"end",at:W9(40)+1.4,label:"the end",section:"outro"}]}var pU=null,mU=(J)=>{let Q=pU??=mQ(),$=Q[0];for(let Z of Q)if(Z.at<=J)$=Z;return $},cD=(J)=>{let Q=pU??=mQ();return Q[Q.indexOf(J)+1]?.at??w7()},Q5=new U0(16051419);var p6=12071482;var xQ=13933114,xU=8015662,nD=6965900,eY={day:[9418200,15918792,10337146],pray:[4934266,15771752,6969962],approved:[4934266,15771752,6969962],end:[4934266,15771752,6969962],tablets:[7176090,15980960,11770486],button:[14865596,16051419,14272424],greenbtn:[14082756,16051419,13228208],loaf:[15259320,16181970,14271136],commits:[14146758,15854808,12896685],candles:[3026767,7032671,2761779],fire:[2040640,8010282,2103848]},pQ=(()=>{let J=new w6(new Uint8Array([90,90,90,255,170,170,170,255,255,255,255,255]),3,1);return J.minFilter=J.magFilter=d7,J.needsUpdate=!0,J})(),J5=new Map,E9=(J)=>{let Q=J5.get(J);if(!Q)J5.set(J,Q=new qJ({color:J,gradientMap:pQ}));return Q},N8=(J,Q=1)=>new l0({color:J,transparent:Q<1,opacity:Q,depthWrite:Q>=1}),H9=(J,Q,$=0,Z=0,K=0)=>{let U=new $0(J,Q);return U.position.set($,Z,K),U},V9=(J,Q,$,Z,K=0,U=0,W=0)=>H9(new c0(J,Q,$),E9(Z),K,U,W);function g6(J,Q,$){let Z=document.createElement("canvas");Z.width=J,Z.height=Q,$(Z.getContext("2d"));let K=new j7(Z);return K.colorSpace=u7,K.anisotropy=4,K}var R7=new x9,n8=(J=0,Q=0,$=0)=>new T(J,Q,$),sD=new Q9(0.075,0.09,1,8).translate(0,0.5,0),iD=new T(0,1,0);function DZ(J,Q){let $=new _0,Z=Q.skin??[15254688,13012578,9263675,15782582,7029808][Math.floor(M0(Q.seed)*5)];if($.add(H9(new Q9(0.24,0.5,1.35,14),E9(J),0,0.68,0)),Q.stole)for(let H of[-1,1])$.add(V9(0.1,0.9,0.05,Q.stole,H*0.13,0.85,0.32));let K=Q.robot?V9(0.42,0.4,0.4,9081500,0,1.6,0):H9(new a0(0.23,16,12),E9(Z),0,1.58,0);if(Q.robot){let H=H9(new c0(0.28,0.07,0.02),N8(10412154),0,0.02,0.21);K.add(H,H9(new Q9(0.015,0.015,0.25),E9(9081500),0,0.32,0),H9(new a0(0.05),N8(p6),0,0.46,0)),$.userData.extra=H}$.add(K);let U=[-1,1].map((H)=>{let Y=H9(new a0(0.09,10,8),E9(Q.robot?9081500:Z));return $.add(Y),Y}),W=[0,1].map(()=>{let H=new $0(sD,E9(Q.robot?9081500:J));return $.add(H),H});return Object.assign($.userData,{head:K,hands:U,arms:W,seed:Q.seed}),$}function gQ(J,Q,$,Z=0.05,K=0){let{head:U,hands:W,arms:H,seed:Y}=J.userData;J.rotation.z=Math.sin(Q*Math.PI*1.78+Y)*Z,U.rotation.x=K*0.6,W.forEach((G,N)=>{let D=N?1:-1,X=k9($-M0(Y+N)*0.15);G.position.set(D*j(0.36,0.5,X),j(0.95,2.15,G9(X))-K*0.1,j(0.3,0.12,X)+K*0.15),$5(H[N],D,G.position)})}function $5(J,Q,$){let Z=n8(Q*0.24,1.3,0.05),K=$.clone().sub(Z);J.position.copy(Z),J.quaternion.setFromUnitVectors(iD,K.clone().normalize()),J.scale.set(1,K.length(),1)}function oD(J){for(let Q of U7){if(Q.words[0].s>J+0.5)break;for(let $ of Q.words)if($.backing&&J>=$.s-0.08&&J<=$.e+0.7)return _9($.s-0.08,$.s+0.12,J)}return 0}var aD={uniforms:{tDiffuse:{value:null},res:{value:new Z0(1920,1080)},paper:{value:Q5.clone()},shotSeed:{value:0},boil:{value:0},reveal:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
    }`};class dU{renderer;scene=new V8;camera=new e9(40,1.7777777777777777,0.1,500);composer;paint;sky;hemi=new B8(16774368,9075302,1.6);sun=new G8(16773336,1.9);glowLight=new v6(16756832,0,18,1.4);interior=new _0;windows=[];choir=[];robot;preacher;book;flock=[];scroll;scrollTex;roll;glass;devil=new _0;laptop=new _0;screen;screens={};exterior=new _0;churchWindows=[];button=new _0;cap;loaf=new _0;dough;slop;commits=new _0;cards=[];fumes=[];candles=new _0;flames;flameOrder=[];candlePos=[];fire=new _0;fireFlames;leds;smoke=[];kneeler;tablets=new _0;tabletTex=[];tabletShown=-1;rays=[];constructor(J){this.renderer=new m8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=Q5.clone(),this.composer=new u8(this.renderer),this.composer.addPass(new c8(this.scene,this.camera)),this.composer.addPass(new l8),this.paint=new dJ(aD),this.composer.addPass(this.paint),this.sun.position.set(-6,14,8),this.scene.add(this.hemi,this.sun,this.glowLight),this.buildSky(),this.buildInterior(),this.buildExterior(),this.buildButton(),this.buildLoaf(),this.buildCommits(),this.buildCandles(),this.buildFire(),this.buildTablets(),this.scene.add(this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets)}buildSky(){this.sky=new $0(new a0(300,32,16),new y9({side:X7,depthWrite:!1,uniforms:{top:{value:new U0},horizon:{value:new U0},bottom:{value:new U0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; varying vec3 vDir;
        void main() { float y = vDir.y;
          vec3 c = y > 0. ? mix(horizon, top, pow(smoothstep(0., .7, y), .8)) : mix(horizon, bottom, smoothstep(0., .25, -y));
          gl_FragColor = vec4(c, 1.); }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildInterior(){let J=this.interior;J.add(V9(18,0.2,32,13214571,0,-0.1,-3)),J.add(V9(2.4,0.02,23,p6,0,0.01,0.5)),J.add(V9(0.3,13,32,15721416,-9,6.5,-3),V9(0.3,13,32,15721416,9,6.5,-3)),J.add(V9(18,13,0.3,15326400,0,6.5,-19.2),V9(18,13,0.3,15326400,0,6.5,12.6)),J.add(V9(2.6,4.2,0.1,xU,0,2.1,12.4)),J.add(V9(18,0.8,8,10119742,0,0.4,-15));let Q=(F)=>g6(256,512,(O)=>{O.beginPath(),O.moveTo(8,504),O.lineTo(8,128),O.arc(128,128,120,Math.PI,0),O.lineTo(248,504),O.closePath(),O.clip();let V=["#3a5aa8","#b8323a","#d49a3a","#4f8a3c","#6a4a8c","#e7c46a"];for(let q=0;q<70;q++)O.fillStyle=V[Math.floor(M0(F+q)*V.length)],O.fillRect(Math.floor(M0(F+q*3)*6)*43,Math.floor(M0(F+q*7)*12)*43,43,43);O.strokeStyle="#2b2633",O.lineWidth=6;for(let q=0;q<=12;q++)O.beginPath(),O.moveTo(0,q*43),O.lineTo(256,q*43+(q%2?12:-12)),O.stroke();for(let q=0;q<=6;q++)O.beginPath(),O.moveTo(q*43,0),O.lineTo(q*43,512),O.stroke();O.lineWidth=14,O.stroke(new Path2D("M8 504 L8 128 A120 120 0 0 1 248 128 L248 504 Z"))}),$=(F,O,V)=>{let q=new $0(new A9(O,V),new l0({map:F,transparent:!0,alphaTest:0.1}));return this.windows.push(q),q};for(let[F,O]of[-5,0,5].entries()){let V=$(Q(F*11),2.4,4.8);V.position.set(O,O===0?8.6:7.8,-19),J.add(V)}for(let F of[-1,1])for(let[O,V]of[-9,-2,5].entries()){let q=$(Q(40+O*13+F*5),2,4);q.position.set(F*8.8,6,V),q.rotation.y=-F*Math.PI/2,J.add(q)}let Z=new _0;Z.add(V9(0.35,2.6,0.12,xQ),V9(1.5,0.35,0.12,xQ,0,0.45,0)),Z.position.set(0,4.6,-18.9),J.add(Z);for(let F of[-1,1])for(let O=0;O<7;O++){let V=3+Math.sin(O*0.6)*1.3+O*0.35;J.add(H9(new Q9(0.16,0.16,V,10),E9(14201434),F*(5.4+O*0.42),0.8+V/2,-18.6))}for(let F=0;F<9;F++){let O=-8+F*2.1;for(let V of[-1,1]){J.add(V9(5,0.18,0.8,9067058,V*3.9,0.55,O),V9(5,1,0.14,8014890,V*3.9,0.95,O+0.45));for(let q=0;q<3;q++){if(M0(F*7+q+V*31)<0.25)continue;let E=F*10+q+(V>0?500:0),L=[3824296,6982218,12088154,8022682,13214282,5929610][Math.floor(M0(E+2)*6)],A=DZ(L,{seed:E});A.scale.setScalar(0.82),A.position.set(V*(2.2+q*1.5+M0(E)*0.3),0.18,O+0.1),A.rotation.y=Math.PI;let R=H9(new A9(0.16,0.26),N8(14216447));R.position.set(0,1.05,0.42),R.rotation.x=-0.9,A.add(R),J.add(A),this.flock.push({f:A,phone:R})}}}for(let F=0;F<3;F++){J.add(V9(13,0.45,1.1,9067574,0,1.02+F*0.45,-15.6-F*1.1));for(let O=0;O<7;O++){let V=900+F*10+O,q=F===0&&O===5,E=DZ(nD,{stole:xQ,seed:V,robot:q});if(E.position.set(-4.8+O*1.6+F%2*0.4,1.25+F*0.45,-15.6-F*1.1),J.add(E),this.choir.push(E),q)this.robot=E}}this.preacher=DZ(2301994,{stole:p6,seed:77,skin:9263675}),this.preacher.position.set(0,0.8,-12.9),this.book=V9(0.5,0.68,0.14,3877410),this.book.add(V9(0.46,0.62,0.15,15258522,0.03,0,0)),this.preacher.add(this.book),J.add(this.preacher);let K=new _0;K.add(V9(1.5,1.35,0.9,8014890,0,0.68,0),V9(1.7,0.08,1,6175264,0,1.4,-0.05)),K.add(V9(0.6,0.5,0.02,p6,0,0.8,0.46)),K.position.set(0,0.8,-12),J.add(K),this.laptop.add(V9(0.8,0.04,0.55,10133672,0,0,0));let U=V9(0.8,0.52,0.03,10133672,0,0.26,-0.27);U.rotation.x=-0.25,this.screen=new $0(new A9(0.74,0.46),new l0({color:16777215})),this.screen.position.set(0,0,-0.02),this.screen.rotation.y=Math.PI,U.add(this.screen),U.rotation.y=0,this.laptop.add(U),this.laptop.position.set(0,2.25,-12.05),this.laptop.rotation.y=0,J.add(this.laptop);let W=(F)=>g6(1024,640,(O)=>{O.fillStyle="#f6f1e6",O.fillRect(0,0,1024,640),O.fillStyle="#c96442",O.fillRect(0,0,1024,70),O.font="700 40px 'JetBrains Mono', monospace",O.fillStyle="#fff",O.fillText("claude",30,50),O.font="500 38px 'JetBrains Mono', monospace",F.forEach(([V,q],E)=>{O.fillStyle=V,O.fillText(q,34,140+E*66)})});this.screens.explain=W([["#c96442","> explain this function"],["#2b2633","This function elegantly"],["#2b2633","orchestrates a robust,"],["#2b2633","scalable synergy of..."],["#8a8494","(pasted back in, unread)"]]),this.screens.sermon=W([["#c96442","> write me a sermon about"],["#c96442","  reading the diff"],["#2b2633","Church! The Good Book says,"],["#2b2633",'"The A-I wrote it, the'],["#2b2633",'tests are green." ...']]),this.scrollTex=g6(512,2048,(F)=>{F.fillStyle="#fbf7ee",F.fillRect(0,0,512,2048);for(let O=0;O<64;O++){let V=M0(O*3.3)<0.08;F.fillStyle=V?"#f3c9c4":"#d3ebc8",F.fillRect(0,O*32,512,30),F.fillStyle=V?"#b8323a":"#4f8a3c",F.fillRect(10,O*32+12,14,6),F.fillStyle="#2b2633";let q=40+Math.floor(M0(O)*4)*26;for(let E=0;E<4;E++){let L=30+M0(O*9+E)*110;if(q+L>500)break;F.fillRect(q,O*32+11,L,8),q+=L+18}}}),this.scrollTex.wrapT=YJ,this.scroll=new $0(new A9(2.2,1),new qJ({map:this.scrollTex,gradientMap:pQ})),this.scroll.rotation.x=-Math.PI/2,this.roll=H9(new Q9(0.32,0.32,2.3,18),E9(16183264)),this.roll.rotation.z=Math.PI/2,J.add(this.scroll,this.roll),this.glass=new _0,this.glass.add(H9(new L7(0.42,0.05,10,32),E9(3877410))),this.glass.add(H9(new l7(0.4,32),N8(13625074,0.25)));let H=H9(new Q9(0.05,0.06,0.7),E9(3877410),0,-0.75,0);this.glass.add(H),this.glass.rotation.x=-Math.PI/2+0.25,J.add(this.glass);let Y=E9(p6),G=H9(new a0(0.32,16,12),Y,0,0.62,0);for(let F of[-1,1]){let O=H9(new Z7(0.07,0.3,8),E9(5904926),F*0.17,0.28,0);O.rotation.z=-F*0.4,G.add(O,H9(new a0(0.06,8,6),N8(16774856),F*0.11,0.06,0.27))}G.add(H9(new L7(0.1,0.02,6,12,Math.PI),E9(5904926),0,-0.1,0.28));let N=H9(new Z7(0.26,0.6,12),Y,0,0.18,0),D=H9(new H8(new S6([n8(0,0.1,-0.1),n8(0.2,0.05,-0.5),n8(0.5,0.3,-0.6),n8(0.55,0.55,-0.45)]),20,0.03,6),Y),X=new _0;X.add(H9(new Q9(0.02,0.02,1.3),E9(3877410)));for(let F of[-1,0,1])X.add(H9(new Z7(0.025,0.2,6),E9(3877410),F*0.08,0.72,0));X.position.set(0.38,0.5,0.1),X.rotation.z=-0.2,this.devil.add(G,N,D,X),J.add(this.devil)}buildExterior(){let J=this.exterior,Q=H9(new a0(60,48,24),E9(9417322),0,-59.6,0);J.add(Q);for(let[H,Y,G,N]of[[-40,-50,30,8034922],[35,-60,36,7311218],[0,-80,40,8823712]])J.add(H9(new a0(G,32,16),E9(N),H,-G*0.82,Y));let $=new _0;$.add(V9(6,4.5,9,15986662,0,2.25,0));let Z=new XJ([new Z0(-3.5,0),new Z0(0,2.8),new Z0(3.5,0)]),K=H9(new NJ(Z,{depth:9.6,bevelEnabled:!1}),E9(9058866),0,4.5,-4.8);$.add(K),$.add(V9(1.8,3.2,1.8,15986662,0,6.2,4.2));let U=H9(new Z7(1.35,3.6,4),E9(9058866),0,9.6,4.2);U.rotation.y=Math.PI/4,$.add(U,V9(0.12,1,0.12,xQ,0,11.9,4.2),V9(0.6,0.12,0.12,xQ,0,12,4.2)),$.add(V9(1.4,2.6,0.1,xU,0,1.3,4.55));for(let H of[-2.5,0,2.5])for(let Y of[-1,1]){let G=new $0(new A9(0.9,1.7),N8(9416904));G.position.set(Y*3.02,2.6,H),G.rotation.y=Y*Math.PI/2,$.add(G),this.churchWindows.push(G)}let W=new $0(new l7(0.5,24),N8(9416904));W.position.set(0,6.6,5.11),$.add(W),this.churchWindows.push(W),$.position.set(0,0.3,0),$.rotation.y=0.35,J.add($),J.add(V9(1.4,0.05,14,14206106,1.8,0.35,10.5));for(let H=0;H<16;H++){let Y=M0(H)*Math.PI*2,G=12+M0(H+3)*14,N=Math.cos(Y)*G,D=Math.sin(Y)*G-4;if(D>6&&Math.abs(N)<6)continue;let X=3+M0(H+5)*3,F=Math.sqrt(Math.max(0,3600-N*N-D*D))-59.6;J.add(H9(new Q9(0.15,0.22,X*0.4),E9(xU),N,F+X*0.2,D)),J.add(M0(H+9)<0.5?H9(new Z7(X*0.32,X,10),E9(5208646),N,F+X*0.4+X/2,D):H9(new a0(X*0.35,12,10),E9(6986314),N,F+X*0.75,D))}}buildButton(){let J=this.button;J.add(V9(8,0.3,5,15327180,0,-0.15,0)),J.add(H9(new Q9(1.25,1.4,0.7,40),E9(10133672),0,0.35,0)),J.add(H9(new L7(1,0.07,10,40),E9(5922920),0,0.72,0).rotateX(Math.PI/2));let Q=g6(512,512,($)=>{$.fillStyle="#5fae4a",$.fillRect(0,0,512,512),$.fillStyle="#f6ffe8",$.font="900 120px Fraunces, Georgia, serif",$.textAlign="center",$.fillText("LGTM",256,300)});this.cap=new $0(new Q9(0.92,0.92,0.32,40),[new l0({color:6270538}),new l0({map:Q}),new l0({color:5212732})]),this.cap.position.y=0.88,this.cap.rotation.y=-Math.PI/2,J.add(this.cap),J.add(V9(1.6,0.06,2.2,16513006,-2.6,0.03,0.4).rotateY(0.3)),J.add(H9(new Q9(0.28,0.24,0.6,18),E9(15986662),2.5,0.3,-0.6)),J.position.set(200,0,0)}buildLoaf(){let J=this.loaf;J.add(V9(6,0.25,3.6,11040586,0,-0.12,0)),this.dough=new $0(new a0(1,40,24),new qJ({color:15389344,gradientMap:pQ})),this.slop=H9(new a0(0.22,16,12),E9(8030794)),J.add(this.dough,this.slop);for(let Q=0;Q<9;Q++)J.add(H9(new a0(0.05+M0(Q)*0.05,8,6),E9(15985368),-2.4+M0(Q+1)*4.8,0.03,-1.4+M0(Q+2)*2.8));J.position.set(400,0,0)}buildCommits(){let J=this.commits;J.add(V9(10,0.2,10,14208952,0,-0.1,0));let Q=g6(512,128,($)=>{$.fillStyle="#fbf7ee",$.fillRect(0,0,512,128),$.fillStyle="#4f8a3c",$.font="700 64px 'JetBrains Mono', monospace",$.fillText("✓",24,88),$.fillStyle="#2b2633",$.font="500 44px 'JetBrains Mono', monospace",$.fillText("fix: tweak",100,82)});for(let $=0;$<12;$++){let Z=new $0(new c0(2.4,0.28,1.4),[E9(15986662),E9(15986662),E9(15986662),E9(15986662),new qJ({map:Q,gradientMap:pQ}),E9(15986662)]);Z.rotation.y=(M0($)-0.5)*0.3,J.add(Z),this.cards.push(Z)}for(let $=0;$<7;$++){let Z=Array.from({length:8},(U,W)=>n8(Math.sin(W*1.3+$)*0.35,W*0.6,Math.cos(W*1.1+$)*0.2)),K=H9(new H8(new S6(Z),40,0.07,6),N8(8036938,0.7));K.position.set(-1.6+$*0.55,0,(M0($)-0.5)*1.2),J.add(K),this.fumes.push(K)}J.position.set(600,0,0)}buildCandles(){let J=this.candles,Q=400,$=40,Z=10;for(let W=0;W<10;W++)J.add(V9(13,0.3,0.5,6175264,0,W*0.32,-W*0.5));let K=new p9(new Q9(0.06,0.06,0.26,8),E9(16183264),400);this.flames=new p9(new Z7(0.05,0.16,8),new l0({color:16762976}),400);for(let W=0;W<400;W++){let H=Math.floor(W/40),Y=W%40,G=n8(-6.2+Y*0.32+H%2*0.16,H*0.32+0.28,-H*0.5+0.05);this.candlePos.push(G),R7.position.copy(G),R7.scale.setScalar(1),R7.updateMatrix(),K.setMatrixAt(W,R7.matrix)}let U=[173,186,213,226];this.flameOrder=[...Array(400).keys()].filter((W)=>!U.includes(W)).sort((W,H)=>M0(W)-M0(H)).concat(U),J.add(V9(16,9,0.3,3813448,0,4,-6),K,this.flames),J.position.set(800,0,0)}buildFire(){let J=this.fire;J.add(V9(14,0.2,10,3814464,0,-0.1,0));let Q=3,$=40;this.leds=new p9(new c0(0.08,0.05,0.02),new l0({color:16777215}),Q*$);for(let U=0;U<Q;U++){J.add(V9(1.4,3.8,1.2,3028032,-2+U*1.6,1.9,-1.5));for(let W=0;W<$;W++)R7.position.set(-2.4+U*1.6+W%4*0.2,0.5+Math.floor(W/4)*0.32,-0.88),R7.scale.setScalar(1),R7.updateMatrix(),this.leds.setMatrixAt(U*$+W,R7.matrix)}this.fireFlames=new p9(new Z7(0.35,1.4,8),new l0({color:16777215}),70);for(let U=0;U<70;U++)this.fireFlames.setColorAt(U,new U0([15769648,14704682,16175200,13123626][U%4]));for(let U=0;U<10;U++){let W=H9(new a0(1,12,10),N8(4867152,0.35));J.add(W),this.smoke.push(W)}this.kneeler=DZ(2301994,{stole:p6,seed:77,skin:9263675}),this.kneeler.position.set(0.6,-0.45,2.6),this.kneeler.rotation.y=Math.PI*0.85;let Z=H9(new A9(0.9,1.2),new qJ({map:this.scrollTex,gradientMap:pQ}),0.3,0.02,1.8);Z.rotation.x=-Math.PI/2;let K=new _0;K.add(H9(new Q9(0.07,0.07,0.4,8),E9(16183264),0,0.2,0),H9(new Z7(0.06,0.18,8),N8(16765040),0,0.5,0)),K.position.set(-0.2,0,1.9),J.add(this.leds,this.fireFlames,this.kneeler,Z,K),J.position.set(1000,0,0)}buildTablets(){let J=this.tablets;J.add(H9(new Z7(14,10,7),E9(11045474),0,-5.2,-1)),J.add(H9(new Z7(30,16,7),E9(9075306),-20,-10,-40),H9(new Z7(26,14,6),E9(8030874),24,-9,-46));let Q=new XJ;Q.moveTo(-1,0),Q.lineTo(-1,2.2),Q.absarc(0,2.2,1,Math.PI,0,!0),Q.lineTo(1,0),Q.closePath();for(let[$,Z]of[-1.15,1.15].entries()){let K=H9(new NJ(Q,{depth:0.35,bevelEnabled:!0,bevelSize:0.06,bevelThickness:0.06,bevelSegments:2}),E9(10134445),Z,0,0),U=g6(512,820,()=>{}),W=new $0(new A9(1.9,3.04),new l0({map:U,transparent:!0}));W.position.set(0,1.62,0.43),K.add(W),K.rotation.z=($?-1:1)*0.04,J.add(K),this.tabletTex.push(U)}for(let $=0;$<6;$++){let Z=H9(new Q9(0.4,2.6,30,16,1,!0),N8(16178314,0.18),-6+$*2.4,14,-3);Z.rotation.z=($-2.5)*0.08,J.add(Z),this.rays.push(Z)}J.position.set(1200,0,0)}carve(J){if(J===this.tabletShown)return;this.tabletShown=J;let Q=[["I","Read the diff,","not the summary"],["II","Read the source,","not the blog post"],["III","No time to not","have tests"],["IV","A plan before","the fix"],["V","A·I shall not","review A·I"]];this.tabletTex.forEach(($,Z)=>{let K=$.image,U=K.getContext("2d");U.clearRect(0,0,512,820),U.textAlign="center",(Z?Q.slice(3):Q.slice(0,3)).forEach(([H,Y,G],N)=>{if((Z?3:0)+N>J)return;let D=100+N*236;U.fillStyle="#1f2430",U.font="900 76px Fraunces, Georgia, serif",U.fillText(H,256,D),U.font="italic 600 60px Fraunces, Georgia, serif",U.fillText(Y,256,D+70),U.fillText(G,256,D+132)}),$.needsUpdate=!0})}flash(J){return 0}fade(J){return 0}update(J){let Q=mU(J),$=Q.at,Z=cD(Q),K=J-$,U=X0(J,$,Z),W=Q.name;for(let V of[this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets])V.visible=!1;let H=this.camera,Y=n8();H.fov=40;let G=eY[W]??eY.day,N=this.sky.material.uniforms;N.top.value.setHex(G[0]),N.horizon.value.setHex(G[1]),N.bottom.value.setHex(G[2]),this.hemi.color.setHex(16774368),this.hemi.groundColor.setHex(9075302),this.hemi.intensity=1.6,this.sun.intensity=1.9,this.glowLight.intensity=0;let D=gU.some(([V])=>V===W)&&W!=="witness",X=G9(X0(J,$,$+(D?0.45:0.8)));if($===0)X=G9(X0(J,0,1.6));X*=1-_9(W9(40)+0.6,W9(40)+1.4,J);let F=this.paint.uniforms;F.reveal.value=X,F.shotSeed.value=(pU??mQ()).indexOf(Q)*3.71%50,F.boil.value=Math.floor(J*5)*1.37;let O=oD(J);switch(W){case"exterior":case"pray":case"approved":case"end":{this.exterior.visible=!0;let V=W!=="exterior";if(V)this.hemi.color.setHex(16763040),this.hemi.groundColor.setHex(4864602),this.hemi.intensity=1.2,this.sun.intensity=0.9;for(let E of this.churchWindows)E.material.color.setHex(V?16762976:9416904);let q=V?X0(J,v(39)-0.6,W9(40)+1.4):X0(J,0,N0(0,/^says/i));H.position.set(V?j(16,12,q):j(-15,-9.5,q),V?j(3,4.4,q):j(2.6,3.2,q),V?j(19,15,q):j(23,16,q)),Y.set(0,V?j(4,5.5,q):4,0),H.fov=42;break}case"button":case"greenbtn":{this.button.visible=!0;let V=this.button.position,q=W==="button"?_9(N0(4,/^l-g/i)-0.1,N0(4,/^l-g/i),J)*(1-_9(N0(4,/^l-g/i)+0.25,N0(4,/^l-g/i)+0.5,J)):0;this.cap.position.y=0.88-q*0.18;let E=W==="greenbtn"?0.75+r7(J)*0.25:1;for(let L of this.cap.material)L.color.setScalar(1).multiplyScalar(E);if(W==="button")H.position.set(V.x+j(1.4,0.6,U),j(4.2,3.6,U),j(4.4,3.4,U)),Y.set(V.x,0.6,0);else H.position.set(V.x+j(1.2,0.5,U),j(1.9,1.6,U),j(2.4,1.9,U)),Y.set(V.x,0.85,0),H.fov=36;break}case"loaf":{this.loaf.visible=!0;let V=this.loaf.position,q=P8(X0(J,$+0.3,$+1.1)),E=G9(X0(J,$+1.2,Z));this.slop.position.set(V.x*0+0.2,j(3.2,0.9,q),0.3),this.slop.visible=q<1,this.slop.position.x=0.2,this.dough.scale.set(j(1.3,2.4,E),j(0.75,1.7,E),j(1,1.6,E)),this.dough.position.set(0,j(0.6,1.3,E),0),this.dough.material.color.setHex(15389344).lerp(new U0(10135648),E*0.75);let L=j(-0.3,0.3,U);H.position.set(V.x+Math.sin(L)*6.5,j(2.4,3,U),Math.cos(L)*6.5),Y.set(V.x,1.1,0);break}case"commits":{this.commits.visible=!0;let V=this.commits.position;this.cards.forEach((E,L)=>{let A=$+0.1+L*0.22,R=T9(X0(J,A,A+0.3));E.visible=J>=A,E.position.set(0,L*0.3+0.15+(1-R)*2,0)}),this.fumes.forEach((E,L)=>{let A=N0(15,/^stunk/i)-0.2+L*0.08;E.visible=J>=A,E.scale.y=G9(X0(J,A,A+1.2)),E.position.y=3.6+(J-A)*0.5%0.6,E.rotation.y=J*0.5+L});let q=j(0.5,0.1,U);H.position.set(V.x+Math.sin(q)*7.5,j(2.8,3.6,U),Math.cos(q)*7.5),Y.set(V.x,1.9,0);break}case"candles":{this.candles.visible=!0;let V=this.candles.position,q=Math.round(j(400,4,G9(X0(J,N0(16,/^cleaned/i),N0(17,/^four$/i)+0.4)))),E=new Set(this.flameOrder.slice(0,400-q));this.candlePos.forEach((A,R)=>{R7.position.set(A.x,A.y+0.21,A.z);let _=E.has(R)?0.001:1+Math.sin(J*13+R)*0.15;R7.scale.set(_,_*(1+r7(J)*0.2),_),R7.updateMatrix(),this.flames.setMatrixAt(R,R7.matrix)}),this.flames.instanceMatrix.needsUpdate=!0,this.hemi.intensity=j(0.35,1.3,q/400),this.sun.intensity=0.2,this.glowLight.position.set(V.x,3,3),this.glowLight.intensity=j(2,60,q/400);let L=X0(J,$,W9(17)+0.5);H.position.set(V.x+j(-1.5,0,L),j(2.8,2,L),j(8,3.6,L)),Y.set(V.x+j(-0.5,0,L),j(1.6,1.7,L),-2),H.fov=j(48,34,L);break}case"fire":{this.fire.visible=!0;let V=this.fire.position;for(let q=0;q<70;q++){let E=q%3,L=0.6+Math.sin(J*9+q*1.7)*0.25+M0(q)*0.5;R7.position.set(-2.6+E*1.6+(M0(q+1)-0.5)*1.4,3.8+L*0.5+M0(q+2)*0.6-0.4,-1.5+(M0(q+3)-0.5)*1.2),R7.scale.set(0.7+M0(q)*0.6,L*1.4,0.7+M0(q)*0.6),R7.rotation.set(0,0,Math.sin(J*5+q)*0.15),R7.updateMatrix(),this.fireFlames.setMatrixAt(q,R7.matrix)}this.fireFlames.instanceMatrix.needsUpdate=!0,R7.rotation.set(0,0,0);for(let q=0;q<120;q++)this.leds.setColorAt(q,new U0(Math.sin(J*8+q*2.3)>0.2?14699066:5904926));if(this.leds.instanceColor)this.leds.instanceColor.needsUpdate=!0;this.smoke.forEach((q,E)=>{let L=(J*0.35+E/10)%1;q.position.set(-2+E%3*1.6+Math.sin(E)*0.6,5+L*6,-1.8),q.scale.setScalar(0.8+L*2.2),q.material.opacity=0.35*(1-L)}),gQ(this.kneeler,J,0,0.02,1),this.hemi.color.setHex(16752752),this.hemi.groundColor.setHex(2761792),this.hemi.intensity=1.1,this.sun.intensity=0.4,this.glowLight.position.set(V.x-0.6,4,0),this.glowLight.intensity=50+Math.sin(J*11)*12,H.position.set(V.x+j(-3.8,-2.6,U),j(1.4,1.8,U),j(7,5.6,U)),Y.set(V.x-0.4,2.2,0),H.fov=46;break}case"tablets":{this.tablets.visible=!0;let V=this.tablets.position,q=0;for(let A=27;A<=31;A++)if(J>=v(A)-0.1)q=A-27;this.carve(q),this.rays.forEach((A,R)=>{A.material.opacity=0.12+0.1*Math.sin(J*1.5+R)+r7(J)*0.05});let E=j(-0.3,0.3,q/4)+(J-v(27+q))*0.03,L=q===4?6.5:4.6;H.position.set(V.x+(q<3?-1.15:1.15)*(q===4?0:1)+Math.sin(E)*L,2.6,Math.cos(E)*L),Y.set(V.x+(q<3?-1.15:1.15)*(q===4?0:1),2.3,0),H.fov=42;break}default:this.interiorShot(J,Q,Y,O,U)}H.aspect=1.7777777777777777,H.updateProjectionMatrix(),H.lookAt(Y),this.sky.position.copy(H.position)}interiorShot(J,Q,$,Z,K){let{name:U,at:W}=Q,H=this.camera;this.interior.visible=!0,this.hemi.intensity=1.5;let Y=U==="greenwash"?_9(W,W+0.6,J):0;for(let L of this.windows)L.material.color.setRGB(1,1,1).lerp(new U0(8048474),Y*0.8);this.hemi.color.setHex(16774368).lerp(new U0(12120224),Y*0.7);for(let L of this.choir)gQ(L,J,Z,0.06);let G=U==="bot"?_9(N0(20,/^\W*amen/i)-0.1,N0(20,/^\W*amen/i)+0.1,J):0;if(U==="bot")gQ(this.robot,J,G,0.02);this.robot.userData.extra.material.color.setHex(G>0.5?10412154:4872772);let N=U==="nobody"||U==="nine",D=U==="shipit"?_9(N0(1,/ship/i)-0.1,N0(1,/ship/i)+0.1,J):U==="lgtm"?Z:U==="witness"||U==="read"?Z*0.6:0;for(let{f:L,phone:A}of this.flock)L.visible=U!=="aisle",A.visible=N,gQ(L,J,D,N?0.01:0.03,N?1:0);let X=U==="pulpit"?T9(X0(J,W+0.3,W+0.8)):0;gQ(this.preacher,J,gU.some(([L])=>L===U)||U==="lgtm"?0.5+Z*0.5:0,U==="deadpan"||U==="who"?0:0.05);let F=this.preacher.userData.hands[1];if(X>0)F.position.set(0.45,j(0.95,2.3,X),0.25),$5(this.preacher.userData.arms[1],1,F.position);this.book.visible=U==="pulpit"||U==="shipit",this.book.position.copy(F.position).add(n8(0,0.25,0.05));let O=U==="scroll"?G9(X0(J,v(3)-0.2,W9(3)+0.6)):["nine","devil","aisle","nobody"].includes(U)?1:0,V=Math.max(0.01,O*26),q=-11.4;this.scroll.visible=this.roll.visible=O>0,this.scroll.scale.set(1,V,1),this.scroll.position.set(0,0.04,q+V/2),this.scrollTex.repeat.set(1,V/4),this.roll.position.set(0,0.33,q+V+0.3),this.roll.rotation.x=V/0.32,this.roll.visible=O>0&&O<1,this.glass.visible=U==="nine",this.glass.position.set(j(-0.4,0.2,K),0.9,j(-6,-4.8,K));let E=U==="devil";if(this.devil.visible=E,E){let L=T9(X0(J,W+0.25,W+0.75));this.devil.position.set(0.35,j(-0.9,0.05,L)+r7(J)*0.06,-5),this.devil.rotation.set(0,-0.35+Math.sin(J*3)*0.15,Math.sin(J*Math.PI*1.78)*0.12)}switch(this.laptop.visible=U==="laptop"||U==="sermon"||U==="deadpan",this.screen.material.map=U==="laptop"?this.screens.explain:this.screens.sermon,U){case"pulpit":H.position.set(j(0.8,0.3,K),j(2.4,2.6,K),j(-3,-7.5,K)),$.set(0,2.6,-13),H.fov=38;break;case"shipit":H.position.set(1.4,3.4,-10.6),$.set(0,0.9,2.5),H.fov=52;break;case"who":{let L=X0(J,W,v(3)-0.3);H.position.set(j(0.7,0.15,L),j(2.3,2.45,L),j(-5.5,-9.9,G9(L))),$.set(0,2.35,-12.9),H.fov=j(36,28,L);break}case"scroll":{let L=q+V;H.position.set(1.4,j(3.6,4.6,K),-13.2),$.set(0,0,Math.max(-6,L-2)),H.fov=48;break}case"nine":H.position.set(j(0.9,0.5,K),3,j(-3.2,-2.4,K)),$.set(this.glass.position.x,0,this.glass.position.z-0.5),H.fov=42;break;case"devil":H.position.set(1.8,1,-1.6),$.set(0.3,0.45,-5),H.fov=36;break;case"nobody":H.position.set(j(7.5,6.5,K),j(9.5,8.5,K),j(12,10,K)),$.set(0,0,-1),H.fov=46;break;case"witness":H.position.set(0,j(4.4,3.8,K),j(11,6,K)),$.set(0,3,-15),H.fov=44;break;case"greenwash":H.position.set(j(-3.2,-2.4,K),1.3,-8),$.set(0,4.2,-17),H.fov=54;break;case"sign":H.position.set(j(7.4,6.2,K),3.1,j(-14.5,-11.5,K)),$.set(-1,2.6,-16.5),H.fov=44;break;case"aisle":H.position.set(0,j(4.2,5.2,K),-11.2),$.set(0,0,9),H.fov=50;break;case"read":H.position.set(0,j(2.6,3,K),j(-9.2,-10.6,K)),$.set(0,3,-16.5),H.fov=52;break;case"laptop":H.position.set(j(1.7,1.4,K),3.5,j(-14.2,-13.7,K)),$.set(0,2.45,-12.1),H.fov=34;break;case"bot":{let L=this.robot.position;H.position.set(L.x+j(2.6,2,K),L.y+1.9,L.z+4.2),$.set(L.x-0.3,L.y+1.5,L.z),H.fov=40;break}case"sermon":H.position.set(j(-1.5,-1.2,K),j(3.3,3.1,K),j(-13.9,-13.4,K)),$.set(0,2.45,-12.1),H.fov=32;break;case"deadpan":H.position.set(0,2.45,-9.4),$.set(0,2.38,-12.9),H.fov=26;break;case"lgtm":H.position.set(0,j(4.4,5.8,K),j(8,11.5,K)),$.set(0,2.2,-12),H.fov=46;break;default:H.position.set(0,4,10),$.set(0,2,-12)}}render(){this.composer.render()}}var uU=(J)=>`<div class="ov card sign" data-show="L${J}|L${J+1}-0.1"><div class="bar">review · required</div>
    <div class="row"><span class="box" data-at="W${J}:sign">✓</span> I have read and understood this change</div>
    <svg viewBox="0 0 520 120"><path class="draw" data-at="W${J}:sign" data-until="W${J}:comprehend+0.3" d="M10 80 C 40 20, 60 20, 70 70 S 100 110, 120 60 S 150 10, 170 70 C 180 100, 200 90, 215 55 C 230 25, 240 95, 262 70 S 300 30, 320 64 C 340 92, 370 40, 400 60 S 470 80, 510 50"/></svg>
    <div class="row muted">lines read: <b>0</b></div></div>`,Z5={title:"Read the Diff",fonts:['900 100px "Fraunces"','italic 600 60px "Fraunces"','700 40px "Caveat"','500 20px "JetBrains Mono"'],overlays:()=>`
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
  ${uU(11)}${uU(24)}${uU(35)}
  <div class="ov stamp big" data-show="W38:l-g|L39-0.6" data-at="W38:l-g">LGTM</div>
  <div class="ov stamp big green" data-show="W40:approved|${W9(40)+1.2}" data-at="W40:approved">APPROVED</div>`,endAt:()=>W9(40)+1.4,words:{hot:/^(devil's|devil|fire|stunk|slop|confess|lord|nobody|no|knees|two)$/,ice:/^(diff|read|source|witness|function|commit|tests|lines|thousand|claude|sermon|p-r|a-i|bot|linter)$/,gold:/^(green|amen|l-g-t-m|lgtm|approved|ship|button|plan|church|pastor|son|brother|good|book)$/},hud:(J,Q)=>{let $=J>=v(Math.min(40,U7.length-1));return{left:`read the diff &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`<span class="add">+3,982</span> <span class="del">−18</span> &nbsp;·&nbsp; lines read <b>0</b>${$?" &nbsp;·&nbsp; approved":""}`}},shots:mQ,shotAt:mU,world:(J)=>new dU(J)};var O7=new U0(5822207),s8=new U0(16723285),cJ=new U0(16763213),lU=new U0(10185727),EZ=new U0(3985262),K5=new U0(329227),QV=new U0(264212),P7=-24,sJ=4,nJ=90,L8=30,d6=(J)=>0.3*Math.pow(2,(J-P7)/sJ),q8=(J)=>P7+sJ*Math.log2(J/0.3),f7=P7-14,P9=q8(nJ);function lQ(){let J=(Q,$=!1)=>{let Z=Math.max(v(Q)-1.6,Math.min(W9(Q-1)+0.05,v(Q)-0.05));return[{name:"ride",at:Z,label:Q===47?"it doubles while we're meeting":"hold on",section:$?"chorus · hushed":"chorus",ride:{first:Q,a:Z,b:W9(Q+3)+0.4,hushed:$}},{name:Q===16?"montage":Q===47?"triple":"terrified",at:W9(Q+3)+0.4,label:Q===47?"tentative":"terrified, and thrilled",section:$?"chorus · hushed":"chorus",ride:{first:Q,a:v(Q),b:W9(Q+3),hushed:$}}]};return[{name:"intro",at:0,label:"intro",section:"intro"},{name:"prius",at:v(0)-0.08,label:"the prius",section:"verse 1"},{name:"tesla",at:v(1)-0.08,label:"hands off",section:"verse 1"},{name:"years",at:v(2)-0.08,label:"ten years out",section:"verse 1"},{name:"linear",at:v(3)-0.08,label:"linear brain",section:"verse 1"},{name:"engine",at:v(4)-0.08,label:"one shot",section:"verse 1"},{name:"waiting",at:v(6)-0.08,label:"not yet",section:"verse 1"},{name:"ceiling",at:v(7)-0.08,label:"you're the ceiling",section:"verse 1"},{name:"releases",at:v(8)-0.08,label:"every three weeks",section:"verse 1"},{name:"comet",at:v(9)-0.08,label:"flip phone, comet",section:"verse 1"},{name:"agents",at:v(10)-0.08,label:"forty agents",section:"verse 1"},{name:"eol",at:v(12)-0.08,label:"end-of-life",section:"verse 1"},{name:"standup",at:v(14)-0.08,label:"the standup",section:"verse 1"},...J(16),{name:"cab",at:v(21)-0.08,label:"change board",section:"verse 2"},{name:"kernel",at:v(23)-0.08,label:"pilot phase",section:"verse 2"},{name:"flat",at:v(25)-0.08,label:"stable! love that",section:"verse 2"},{name:"procure",at:v(27)-0.08,label:"procurement",section:"verse 2"},{name:"fab",at:v(29)-0.08,label:"out of stock",section:"verse 2"},{name:"sun",at:v(31)-0.08,label:"soc 2",section:"verse 2"},{name:"vp",at:v(33)-0.08,label:"bonus achieved",section:"verse 2"},{name:"protein",at:v(35)-0.08,label:"the use case",section:"verse 2"},...J(37),{name:"bridge",at:v(42)-0.3,label:"no quorum",section:"bridge"},{name:"premeeting",at:v(43)-0.2,label:"the pre-meeting",section:"bridge"},...J(47,!0),{name:"moved",at:v(52)-0.6,label:"moved to thursday",section:"outro"},{name:"outro",at:v(53)-0.4,label:"the curve didn't wait",section:"outro"},{name:"end",at:W9(53)+2.2,label:"the end",section:"outro"}]}var nU=null,RZ=(J)=>{let Q=nU??=lQ();return Q.filter(($)=>J>=$.at).at(-1)??Q[0]},C8=()=>N0(7,/^go/i);function i8(J,Q,$,Z="400 %spx Anton, Impact, sans-serif"){let K=document.createElement("canvas"),U=K.getContext("2d"),W=128;U.font=Z.replace("%s",String(128)),K.width=Math.ceil(U.measureText(J).width+76.8),K.height=Math.ceil(192),U.font=Z.replace("%s",String(128)),U.textAlign="center",U.textBaseline="middle",U.shadowColor=Q,U.shadowBlur=24,U.fillStyle=Q,U.fillText(J,K.width/2,K.height/2);let H=new j7(K);H.colorSpace=u7;let Y=new IQ(new P6({map:H,color:10132122,transparent:!0,depthWrite:!1,fog:!1}));return Y.scale.set($*K.width/K.height,$,1),Y.userData.base=Y.scale.clone(),Y}var m6=(J,Q)=>J.scale.copy(J.userData.base).multiplyScalar(Math.max(0.001,Q)),uQ=(J,Q)=>new kJ({color:J,transparent:!0,opacity:Q,depthWrite:!1}),dQ=(J,Q,$=0.9)=>new U8(new T6(J),uQ(Q,$));class H5 extends v7{constructor(){super()}getPoint(J,Q=new T){let $=j(f7,P9,J);return Q.set($,d6($),0)}}var U5={intro:[461342,1194578,263692],prius:[1181478,5903944,459790],tesla:[920106,8002130,525327],years:[268322,1006182,198667],linear:[398368,1460314,198410],engine:[660518,6959124,329484],waiting:[1380138,6957630,460044],ceiling:[399402,2779786,264720],releases:[921386,3418234,394767],comet:[197903,1714794,131849],agents:[201743,1202754,133130],eol:[1182238,4856378,459787],standup:[1708556,5913120,657157],ride:[1836562,9052208,656136],montage:[2098448,10099258,787208],terrified:[2360334,10494014,787206],hushed:[265250,1458298,132623],cab:[1967628,6953508,787206],kernel:[1050656,4860538,394252],flat:[398368,1722970,198410],procure:[1314826,5917210,525834],fab:[1181734,4860554,459791],sun:[2100228,9060368,787971],vp:[399888,1727028,199174],protein:[268832,1727082,133130],bridge:[198159,990778,131848],premeeting:[657940,2763332,328968],moved:[657940,2763332,328968],outro:[263695,1712708,131848],end:[131848,526868,66052]},m0=new x9,M7=(J=0,Q=0,$=0)=>new T(J,Q,$);class cU{bodies;heads;constructor(J,Q,$){this.bodies=new p9(new vJ(0.2,0.62,4,8),new D9({color:Q,roughness:0.7}),J),this.heads=new p9(new a0(0.17,12,8),new D9({color:new U0(Q).multiplyScalar(1.2),roughness:0.7}),J),$.add(this.bodies,this.heads)}set(J,Q,$,Z,K=0,U=!1){let W=U?-0.35:0;m0.position.set(Q,0.52*Z+W,$),m0.rotation.set(0,0,K),m0.scale.setScalar(Z),m0.updateMatrix(),this.bodies.setMatrixAt(J,m0.matrix),m0.position.set(Q-K*0.6,1.2*Z+W,$),m0.updateMatrix(),this.heads.setMatrixAt(J,m0.matrix)}done(){this.bodies.instanceMatrix.needsUpdate=this.heads.instanceMatrix.needsUpdate=!0}}class sU{renderer;scene=new V8;camera=new e9(40,1.7777777777777777,0.1,600);composer;bloom;fog=new SJ(K5,0.011);sky;curveWorld=new _0;path=new H5;tube;glow;tip;beam;arc=[];floor;wall;markers=[];years=[];linear;linearTag;expoTag;flatLine;flatTag;stableTag;aiTag;crowd=new _0;crowdPeople;people=[];notYet=[];ceiling=new _0;panes;rims;shards=[];rings=[];moon;meetings;dust;dustSeed=[];road=new _0;dashes;poles;streaks;prius=new _0;tesla=new _0;engine=new _0;stages=[];core;exhaust;slabs=new _0;slab=[];approved;comet=new _0;cometHead=new _0;tail;phoneLid;agents=new _0;agentCubes;agentEdges;room=new _0;table;roomPeople;screen;boards={};fab=new _0;wafer;laser;machines;sun=new _0;sunBall;sunHalo;swarm;swarmDirs=[];protein=new _0;beads;coil=[];helix=[];globe;constructor(J){this.renderer=new m8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=K5.clone(),this.scene.fog=this.fog,this.composer=new u8(this.renderer),this.composer.addPass(new c8(this.scene,this.camera)),this.bloom=new X8(new Z0(1920,1080),1.1,0.6,0.12),this.composer.addPass(this.bloom),this.composer.addPass(new l8),this.scene.add(this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein),this.scene.add(new B8(10475775,1050640,1.2));let Q=new G8(16777215,1.6);Q.position.set(5,10,8),this.scene.add(Q),this.buildSky(),this.buildCurve(),this.buildCrowd(),this.buildCeiling(),this.buildChorus(),this.buildDust(),this.buildRoad(),this.buildEngine(),this.buildSlabs(),this.buildComet(),this.buildAgents(),this.buildRoom(),this.buildFab(),this.buildSun(),this.buildProtein()}buildSky(){this.sky=new $0(new a0(450,32,16),new y9({side:X7,depthWrite:!1,fog:!1,uniforms:{top:{value:new U0},horizon:{value:new U0},bottom:{value:new U0},pulse:{value:0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; uniform float pulse; varying vec3 vDir;
        void main() {
          float y = vDir.y;
          vec3 c = y > 0.0 ? mix(horizon, top, pow(smoothstep(0.0, 0.75, y), 0.7)) : mix(horizon, bottom, smoothstep(0.0, 0.35, -y));
          c += horizon * pulse * exp(-abs(y) * 9.0) * 0.6; // the horizon band breathes with the bass
          gl_FragColor = vec4(c, 1.0);
        }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildCurve(){let J=this.path,Q=1400,$=10,Z=new H8(J,1400,0.14,10,!1),K=Z.attributes.position,U=new Float32Array(K.count*3),W=new U0;for(let _=0;_<K.count;_++){let B=k9(Math.log2(Math.max(K.getY(_),0.04)/0.3)/8);W.copy(O7).lerp(s8,_9(0.15,0.7,B)).lerp(new U0(16777215),_9(0.75,1,B)*0.7),U.set([W.r,W.g,W.b],_*3)}Z.setAttribute("color",new Q7(U,3)),this.tube=new $0(Z,new l0({vertexColors:!0}));let H=new H8(J,1400,0.55,8,!1);this.glow=new $0(H,new l0({color:s8,transparent:!0,opacity:0.16,blending:N7,depthWrite:!1})),this.tip=new $0(new a0(0.42,24,16),new l0({color:16777215})),this.beam=new $0(new Q9(0.6,0.6,1,12).translate(0,0.5,0),new l0({color:16765146})),this.curveWorld.add(this.tube,this.glow,this.tip,this.beam);let Y=0,G=M7(),N=M7(),D=[0];for(let _=1;_<=2000;_++)J.getPoint((_-1)/2000,G),J.getPoint(_/2000,N),Y+=G.distanceTo(N),D.push(Y);this.arc=D.map((_)=>_/Y);let X=[];for(let _=f7-30;_<=P9+30;_+=sJ/4)X.push(_,0,-40,_,0,30);for(let _=-40;_<=30;_+=2)X.push(f7-30,0,_,P9+30,0,_);let F=new F9;F.setAttribute("position",new J9(X,3)),this.floor=new U8(F,uQ(O7,0.12));let O=[];for(let _=0;_<=8;_++){let B=0.3*2**_;O.push(f7-30,B,-3,P9+30,B,-3)}for(let _=P7;_<=P9+20;_+=sJ)O.push(_,0,-3,_,nJ+20,-3);let V=new F9;V.setAttribute("position",new J9(O,3)),this.wall=new U8(V,uQ(O7,0.1)),this.curveWorld.add(this.floor,this.wall);for(let _=1;_<=8;_++){let B=P7+sJ*_,z=new $0(new a0(0.28,16,12),new l0({color:cJ}));z.position.set(B,d6(B),0),this.markers.push({x:B,dot:z}),this.curveWorld.add(z)}for(let _=0;_<=10;_++){let B=j(P7,P9,_/10),z=i8(String(2026+_),_===10?"#ff2d55":"#58d6ff",1.4,"700 %spx 'JetBrains Mono', monospace");z.position.set(B-1.6,d6(B)+1.6,1),this.years.push({x:B,tag:z}),this.curveWorld.add(z)}let q=P7+2*sJ,E=d6(q),L=E*Math.LN2/sJ,A=new k6(M7(f7,E+L*(f7-q),0),M7(P9+6,E+L*(P9+6-q),0));this.linear=new $0(new H8(A,200,0.1,8,!1),new l0({color:9081766,transparent:!0})),this.linearTag=i8("LINEAR BRAIN","#8a93a6",2.6),this.linearTag.position.set(P9-2,E+L*(P9-2-q)+2.4,1),this.expoTag=i8("EXPONENTIAL PLANE","#ff2d55",3.4),this.expoTag.position.set(q8(42)-15,42,1);let R=new k6(M7(f7,0.6,1.5),M7(P9+14,0.6,1.5));this.flatLine=new $0(new H8(R,200,0.12,8,!1),new l0({color:9081766})),this.flatTag=i8("OUR ROLLOUT","#8a93a6",2.2),this.flatTag.position.set(P9+4,2.2,1.5),this.stableTag=i8("STABLE! ♥","#3ccf6e",3),this.stableTag.position.set(P9+4,5.4,1.5),this.aiTag=i8("THE A-I CURVE","#ff2d55",3),this.aiTag.position.set(q8(36)-9,36,1),this.curveWorld.add(this.linear,this.linearTag,this.expoTag,this.flatLine,this.flatTag,this.stableTag,this.aiTag)}buildCrowd(){this.crowdPeople=new cU(90,8160921,this.crowd);for(let Q=0;Q<90;Q++)this.people.push({x:f7-8+M0(Q)*22,z:-1+M0(Q+50)*10,h:0.85+M0(Q+99)*0.3,ph:M0(Q+7)*6.28});for(let Q=0;Q<7;Q++){let $=this.people[Q*11],Z=i8(Q%2?"NOT YET":"NO","#ffc94d",1.1);Z.position.set($.x,2.2*$.h+3.2+M0(Q+31)*2,$.z),this.notYet.push(Z),this.crowd.add(Z)}this.curveWorld.add(this.crowd)}buildCeiling(){let Q=[];for(let U=0;U<26;U++)for(let W=0;W<34;W++)Q.push(M7(q8(L8)-34+W*1.1*1.75+U%2*1.1*0.875,L8,-16+U*1.1*1.52));let $=new l7(1.056,6).rotateX(-Math.PI/2),Z=new yJ(0.9900000000000001,1.078,6).rotateX(-Math.PI/2);this.panes=new p9($,new l0({color:O7,transparent:!0,opacity:0.1,side:r9,depthWrite:!1,blending:N7}),Q.length),this.rims=new p9(Z,new l0({color:O7,transparent:!0,opacity:0.55,side:r9,depthWrite:!1}),Q.length);let K=M7(q8(L8),L8,0);Q.forEach((U,W)=>{let H=U.clone().sub(K).setY(0),Y=H.length();H.normalize().multiplyScalar(4+M0(W)*10+30/(Y+2)),H.y=6+M0(W+3)*16+40/(Y+2),this.shards.push({p:U,v:H,axis:M7(M0(W+5)-0.5,M0(W+6)-0.5,M0(W+7)-0.5).normalize(),spin:3+M0(W+8)*8,delay:Y*0.018})}),this.ceiling.add(this.panes,this.rims),this.curveWorld.add(this.ceiling)}buildChorus(){for(let J=0;J<12;J++){let Q=new $0(new L7(1,0.05,8,64),new l0({color:s8,transparent:!0,depthWrite:!1,blending:N7}));this.rings.push(Q),this.curveWorld.add(Q)}this.moon=new $0(new a0(9,32,24),new l0({color:13624063,fog:!1,transparent:!0})),this.moon.position.set(-40,70,-160),this.curveWorld.add(this.moon),this.meetings=new p9(new c0(1.5,0.12,2.2),new l0({color:5078271,transparent:!0,opacity:0.85}),512);for(let J=0;J<512;J++)m0.position.set(P7-4+M0(J+900)*52,1+M0(J+1900)*70,-2.4),m0.rotation.set(Math.PI/2,0,0),m0.scale.setScalar(1),m0.updateMatrix(),this.meetings.setMatrixAt(J,m0.matrix);this.curveWorld.add(this.meetings)}buildDust(){let Q=new Float32Array(4800);for(let Z=0;Z<1600;Z++)this.dustSeed.push(M0(Z*3),M0(Z*3+1),M0(Z*3+2));let $=new F9;$.setAttribute("position",new Q7(Q,3)),this.dust=new W8($,new s7({color:9427199,size:0.12,transparent:!0,opacity:0.6,depthWrite:!1,blending:N7})),this.scene.add(this.dust)}buildRoad(){let J=new $0(new A9(16,600).rotateX(-Math.PI/2),new D9({color:724244,roughness:0.6,metalness:0.3}));J.position.z=-250,this.road.add(J),this.dashes=new p9(new c0(0.16,0.02,2.6),new l0({color:14674165}),100);for(let $ of[-5.4,5.4]){let Z=new $0(new c0(0.14,0.02,600),new l0({color:O7}));Z.position.set($,0.01,-250),this.road.add(Z)}this.poles=new p9(new c0(0.12,0.12,0.8),new l0({color:cJ}),48),this.streaks=new p9(new c0(0.03,0.03,9),new l0({color:13627391,transparent:!0,blending:N7,depthWrite:!1}),120),this.road.add(this.dashes,this.poles,this.streaks);let Q=($,Z,K)=>{let U=new _0,W=new D9({color:$,roughness:K?0.25:0.7,metalness:K?0.8:0.2}),H=new c0(1.9,0.55,K?4.7:4.2),Y=new c0(1.55,0.5,K?2.6:2);for(let[N,D,X]of[[H,0.5,0],[Y,1.02,K?0.1:0.35]]){let F=new $0(N,W);F.position.set(0,D,X);let O=dQ(N,Z,K?0.95:0.8);O.position.copy(F.position),U.add(F,O)}let G=new $0(new c0(K?1.8:0.4,0.09,0.05),new l0({color:K?s8:new U0(8002088)}));if(G.position.set(0,0.66,(K?4.7:4.2)/2+0.01),U.add(G),!K){let N=G.clone();G.position.x=-0.65,N.position.x=0.65,U.add(N)}for(let N of[-0.85,0.85]){let D=new $0(new Q9(0.34,0.34,0.24,18).rotateZ(Math.PI/2),new D9({color:328967}));for(let X of[-1.3,1.3]){let F=D.clone();F.position.set(N,0.34,X),U.add(F)}}return U};this.prius=Q(7109260,O7,!1),this.tesla=Q(855828,new U0(16777215),!0),this.road.add(this.prius,this.tesla)}buildEngine(){let J=new U8(new PQ(new Q9(3.1,2.6,7,36,5,!0).rotateX(Math.PI/2)),uQ(O7,0.28));J.position.z=-2.5,this.engine.add(J);let Q=(W,H,Y,G,N,D,X)=>{let F=new _0,O=new c0(0.07,G,0.55).translate(0,Y-G/2,0),V=new p9(O,new D9({color:N,roughness:0.35,metalness:0.85,emissive:N,emissiveIntensity:0.15}),H);for(let q=0;q<H;q++)m0.rotation.set(0,0,q/H*Math.PI*2),m0.rotateY(X),m0.position.set(0,0,0),m0.scale.setScalar(1),m0.updateMatrix(),V.setMatrixAt(q,m0.matrix);F.add(V),F.position.z=W,this.engine.add(F),this.stages.push({g:F,speed:D})};Q(0.6,24,2.85,2.2,new U0(12109526),1,0.55),Q(-1,40,2.1,1.3,new U0(7324648),-1.6,-0.4),Q(-1.9,44,1.85,1.1,new U0(15235695),2.1,0.4),Q(-2.7,48,1.6,0.9,new U0(16731486),-2.6,-0.4);let $=new $0(new Z7(0.75,1.5,32).rotateX(Math.PI/2),new D9({color:14673646,metalness:0.9,roughness:0.2}));$.position.z=1.4,this.core=new $0(new a0(1.3,24,16),new l0({color:s8,transparent:!0,blending:N7,depthWrite:!1})),this.core.position.z=-5.5;let Z=900,K=new Float32Array(Z*3),U=new F9;U.setAttribute("position",new Q7(K,3)),this.exhaust=new W8(U,new s7({color:16747100,size:0.18,transparent:!0,depthWrite:!1,blending:N7})),this.engine.add($,this.core,this.exhaust)}buildSlabs(){let J=0;for(let $=0;$<12;$++){let Z=0.7*1.42**$,K=1.4+$*0.12,U=new c0(K,Z,K).translate(0,Z/2,0),W=new $0(U,new D9({color:1317414,roughness:0.4,metalness:0.6,transparent:!0})),H=dQ(U,O7,0.9),Y=i8(`v${$+1}`,"#58d6ff",1.2+$*0.12,"700 %spx 'JetBrains Mono', monospace");Y.position.set(0,Z+1.2,0);let G=new _0;G.add(W,H,Y),G.position.x=J,this.slabs.add(G),this.slab.push({g:G,mesh:W,edge:H,tag:Y,x:J,h:Z}),J+=K+1.6}this.approved=i8("APPROVED","#3ccf6e",1.6),this.slabs.add(this.approved);let Q=new FJ(200,100,1784402,924971);Q.position.x=40,this.slabs.add(Q)}buildComet(){let J=new $0(new AQ(1.1,2),new l0({color:16777215})),Q=new $0(new a0(2.2,24,16),new l0({color:O7,transparent:!0,opacity:0.25,blending:N7,depthWrite:!1})),$=new _0,Z=new $0(new c0(0.7,0.08,1.2),new D9({color:3817290,metalness:0.6}));Z.position.z=0.6,this.phoneLid=new _0;let K=new $0(new c0(0.7,0.08,1.2),new D9({color:3817290,metalness:0.6}));K.position.z=-0.6;let U=new $0(new A9(0.5,0.8),new l0({color:8257456}));U.rotation.x=-Math.PI/2,U.position.set(0,0.05,-0.6),this.phoneLid.add(K,U),$.add(Z,this.phoneLid),$.scale.setScalar(2.4),$.position.set(0,1.9,1.4),$.rotation.set(0.3,0,0.2);let W=new $0(new L7(1.16,0.06,6,40),new l0({color:cJ}));W.rotation.y=Math.PI/2,this.cometHead.add(J,Q,$,W);let H=1400,Y=new Float32Array(H*3),G=new F9;G.setAttribute("position",new Q7(Y,3)),this.tail=new W8(G,new s7({color:11069183,size:0.22,transparent:!0,depthWrite:!1,blending:N7})),this.comet.add(this.cometHead,this.tail)}buildAgents(){let J=new c0(1,1,1);this.agentCubes=new p9(J,new l0({color:16777215}),40),this.agentEdges=new p9(new c0(1.12,1.12,1.12),new l0({color:O7,wireframe:!0,transparent:!0,opacity:0.6}),40);let Q=new $0(new c0(3,2,0.2),new l0({color:858642})),$=dQ(new c0(3,2,0.2),EZ);Q.position.set(0,1.2,0),$.position.copy(Q.position);let Z=new FJ(80,40,1784402,924971);this.agents.add(this.agentCubes,this.agentEdges,Q,$,Z)}buildRoom(){this.table=new _0;let J=new $0(new c0(9,0.15,3),new D9({color:1711398,roughness:0.3,metalness:0.5}));J.position.y=0.95;let Q=dQ(new c0(9,0.15,3),O7,0.5);Q.position.copy(J.position),this.table.add(J,Q),this.roomPeople=new cU(12,8160921,this.room),this.screen=new $0(new A9(9,5.1),new l0({color:16777215}));let $=(K,U,W)=>{let H=document.createElement("canvas");H.width=1024,H.height=580;let Y=H.getContext("2d");Y.fillStyle="#0b1020",Y.fillRect(0,0,1024,580),Y.fillStyle=U,Y.fillRect(0,0,1024,96),Y.font="400 64px Anton, Impact, sans-serif",Y.fillStyle="#05060b",Y.fillText(K.toUpperCase(),40,74),Y.font="700 46px 'JetBrains Mono', monospace",W.forEach((N,D)=>{Y.fillStyle=N.startsWith("!")?U:"#e8ecf5",Y.fillText(N.replace(/^!/,""),48,180+D*84)});let G=new j7(H);return G.colorSpace=u7,G};this.boards={standup:$("Daily standup","#58d6ff",["Yesterday: tickets","Today: tickets","Blockers: none","!AOB: the singularity?"]),cab:$("Change Advisory Board","#ff2d55",["Agenda","1. Review: end of man","2. Rollback plan?","!Status: CHANGE REQUEST"]),vp:$("Q3 AI update","#3ccf6e",["You're crushing it! \uD83D\uDE80","Adoption: 3 seats","Next: a committee","!BONUS ACHIEVED"]),premeeting:$("Pre-meeting","#9b6bff",["Plan the meeting","about how far ahead","we are","!Accept · Decline · Tentative"]),tentative:$("Pre-meeting","#9b6bff",["Plan the meeting","Your reply:","!✓ Tentative"]),moved:$("Pre-meeting","#ffc94d",["!Moved to Thursday","Attendees: 0","The curve: not invited"])},this.screen.position.set(-6.4,3.2,0),this.screen.rotation.y=Math.PI/2;let Z=new FJ(60,30,2761266,1446428);this.room.add(this.table,this.screen,Z)}buildFab(){let J=document.createElement("canvas");J.width=J.height=512;let Q=J.getContext("2d"),$=Q.createRadialGradient(256,256,20,256,256,256);$.addColorStop(0,"#5b4a8a"),$.addColorStop(0.6,"#2b6f8a"),$.addColorStop(1,"#7a3f6a"),Q.fillStyle=$,Q.fillRect(0,0,512,512),Q.strokeStyle="rgba(255,255,255,.35)";for(let W=0;W<=512;W+=32)Q.beginPath(),Q.moveTo(W,0),Q.lineTo(W,512),Q.moveTo(0,W),Q.lineTo(512,W),Q.stroke();let Z=new j7(J);Z.colorSpace=u7,this.wafer=new $0(new l7(4,64).rotateX(-Math.PI/2),new l0({map:Z})),this.wafer.position.y=0.2,this.laser=new $0(new Q9(0.08,0.08,14,12).translate(0,7,0),new l0({color:lU,transparent:!0,blending:N7,depthWrite:!1}));let K=dQ(new c0(12,9,9).translate(0,4.5,0),lU,0.4);this.machines=new p9(new c0(2.4,2.4,2.4),new l0({color:16777215}),70);for(let W=0;W<70;W++)m0.position.set(-30+W%14*4.4,1.2,-14-Math.floor(W/14)*4.4),m0.rotation.set(0,0,0),m0.scale.setScalar(1),m0.updateMatrix(),this.machines.setMatrixAt(W,m0.matrix);let U=new FJ(120,60,2760516,1380130);this.fab.add(this.wafer,this.laser,K,this.machines,U)}buildSun(){this.sunBall=new $0(new a0(6,48,32),new l0({color:16765562,fog:!1}));let J=document.createElement("canvas");J.width=J.height=256;let Q=J.getContext("2d"),$=Q.createRadialGradient(128,128,30,128,128,128);$.addColorStop(0,"rgba(255,200,90,1)"),$.addColorStop(1,"rgba(255,120,40,0)"),Q.fillStyle=$,Q.fillRect(0,0,256,256),this.sunHalo=new IQ(new P6({map:new j7(J),transparent:!0,depthWrite:!1,blending:N7,fog:!1})),this.sunHalo.scale.set(34,34,1);let Z=700;this.swarm=new p9(new l7(0.7,6),new D9({color:658450,metalness:0.9,roughness:0.3,side:r9,emissive:1714746}),Z);for(let K=0;K<Z;K++){let U=1-2*(K+0.5)/Z,W=Math.sqrt(1-U*U),H=K*2.39996;this.swarmDirs.push(M7(Math.cos(H)*W,U,Math.sin(H)*W))}this.sun.add(this.sunHalo,this.sunBall,this.swarm)}buildProtein(){this.beads=new p9(new a0(0.32,12,8),new l0({color:16777215}),160);let Q=new U0,$=M7(-12,0,0);for(let K=0;K<160;K++){this.beads.setColorAt(K,Q.setHSL(0.55+K/160*0.45,0.8,0.32)),$=$.clone().add(M7(0.15+M0(K)*0.1,(M0(K+1)-0.5)*0.5,(M0(K+2)-0.5)*0.5)),this.coil.push($);let U=K*0.62;this.helix.push(M7(Math.cos(U)*2.6,-6+K*0.075,Math.sin(U)*2.6))}this.globe=new U8(new PQ(new a0(4.5,24,16)),uQ(EZ,0.35)),this.globe.position.set(9,1,-4);let Z=new FJ(80,40,1784402,924971);Z.position.y=-7,this.protein.add(this.beads,this.globe,Z)}drawX(J,Q){let $=j(f7,q8(12),G9(X0(J,0.4,v(0)-0.2))*0.85+X0(J,0.4,v(0)-0.2)*0.15);if(Q==="intro")return $;if(Q==="years")return j(q8(12),P9,P8(X0(J,v(2),v(3)-0.3)));if(Q==="ceiling")return J<C8()?q8(L8)-0.05:j(q8(L8),P9,G9(X0(J,C8(),C8()+0.9)));return P9}setDraw(J){let Q=k9(Math.round((J-f7)/(P9-f7)*2000),0,2000),$=this.arc[Q]??1;for(let Z of[this.tube,this.glow]){let K=Z.geometry.parameters.tubularSegments,U=Z.geometry.parameters.radialSegments;Z.geometry.setDrawRange(0,Math.floor($*K)*U*6)}this.tip.position.set(J,d6(J),0)}flash(J){let Q=0;for(let Z of(nU??=lQ()).slice(1)){if(Z.name==="terrified"||Z.name==="end")continue;let K=Z.name==="bridge"||Z.name==="outro"?0:Z.name==="ride"?0.6:0.35;if(J>=Z.at)Q=Math.max(Q,Math.exp(-(J-Z.at)*8)*K)}if(J>=C8())Q=Math.max(Q,Math.exp(-(J-C8())*6)*0.8);let $=RZ(J);if($.name==="triple"){for(let Z of[N0(51,/^thrilled/i),N0(51,/^tentative/i)])if(J>=Z)Q=Math.max(Q,Math.exp(-(J-Z)*9)*0.4)}if($.name==="montage"){let Z=g7()*4;Q=Math.max(Q,Math.exp(-((J-$.at)%Z)*9)*0.45)}return Q}fade(J){return _9(W9(53)+0.6,W9(53)+2.2,J)}update(J){let Q=RZ(J),$=Q.at,Z=J-$;for(let O of[this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein])O.visible=!1;let K=qW(J),U=r7(J),W=["bridge","premeeting","moved","outro","end"].includes(Q.name)||!!Q.ride?.hushed;this.bloom.strength=(W?0.7:0.85)+K*(W?0.3:0.55)+(Q.name==="ceiling"?this.flash(J)*0.6:0);let[H,Y,G]=(U5[Q.name==="ride"||Q.name==="terrified"?Q.ride?.hushed?"hushed":Q.name:Q.name]??U5.intro).map((O)=>new U0(O));this.sky.material.uniforms.top.value.copy(H),this.sky.material.uniforms.horizon.value.copy(Y),this.sky.material.uniforms.bottom.value.copy(G),this.sky.material.uniforms.pulse.value=K,this.scene.background.copy(G),this.fog.color.copy(Y).lerp(G,0.55),this.fog.density=0.011;let N=this.camera,D=M7();N.fov=40;let X=this.dust.geometry.attributes.position;for(let O=0;O<X.count;O++){let[V,q,E]=[this.dustSeed[O*3],this.dustSeed[O*3+1],this.dustSeed[O*3+2]];X.setXYZ(O,-70+V*110,(q*90+J*(0.4+E))%90,-50+E*70)}switch(X.needsUpdate=!0,this.dust.material.opacity=0.35+K*0.4,Q.name){case"intro":case"years":case"linear":case"waiting":case"ceiling":case"flat":case"ride":case"terrified":case"bridge":case"outro":case"end":this.curveShot(J,Q,D,K,U);break;case"prius":case"tesla":this.roadShot(J,Q,D,K);break;case"engine":this.engineShot(J,$,D,K);break;case"releases":case"eol":case"procure":this.slabShot(J,Q,D,U);break;case"comet":this.cometShot(J,Z,D);break;case"agents":case"kernel":this.agentShot(J,Q,D,U);break;case"standup":case"cab":case"vp":case"premeeting":case"moved":this.roomShot(J,Q,D,U);break;case"triple":if(J<N0(51,/^thrilled/i)-0.05)this.curveShot(J,{...Q,name:"terrified"},D,K,U);else if(J<N0(51,/^tentative/i)-0.05)this.engineShot(J,N0(51,/^thrilled/i)-2.5,D,K);else this.roomShot(J,Q,D,U);break;case"montage":{let O=g7()*4,V=Math.floor((J-$)/O),q=$+V*O,E=["engine","comet","agents","fab","sun","releases"][V%6];if(E==="engine")this.engineShot(J,q-2,D,K);else if(E==="comet")this.cometShot(J,J-q,D);else if(E==="agents")this.agentShot(J,{...Q,name:"agents",at:q},D,U);else if(E==="fab")this.fabShot(J,J-q,D,K);else if(E==="sun")this.sunShot(J,D,K);else this.slabShot(J,{...Q,name:"releases",at:q-3},D,U);break}case"fab":this.fabShot(J,Z,D,K);break;case"sun":this.sunShot(J,D,K);break;case"protein":this.proteinShot(J,D);break}let F=W?0.03:0.12;N.position.x+=(M0(Math.floor(J*30))-0.5)*U*F,N.position.y+=(M0(Math.floor(J*30)+1)-0.5)*U*F,N.updateProjectionMatrix(),N.lookAt(D),this.sky.position.copy(N.position)}curveShot(J,Q,$,Z,K){let U=this.camera,W=Q.at,H=Q.name;this.curveWorld.visible=!0;let Y=this.drawX(J,H);this.setDraw(Y),this.tip.scale.setScalar(1+K*0.6),this.tip.visible=Y<P9-0.1||H==="outro"||H==="end",this.beam.visible=!1;let G=!!Q.ride?.hushed||H==="bridge"||H==="outro"||H==="end";this.tube.material.color.set(G?10275071:16777215),this.glow.material.color.copy(G?O7:s8),this.floor.material.opacity=0.08+K*0.1+Z*0.06,this.wall.material.opacity=(H==="intro"?_9(0.5,4,J):1)*(0.07+K*0.06);for(let F of this.markers){let O=T9(X0(Y,F.x,F.x+1.2));F.dot.scale.setScalar(Math.max(0.001,O*(1+K*0.4)))}this.years.forEach((F,O)=>{F.tag.visible=H==="years",m6(F.tag,T9(X0(J,v(2)+O*0.18,v(2)+O*0.18+0.3))*(O===10?1.6:1))});let N=H==="linear";if(this.linear.visible=this.linearTag.visible=this.expoTag.visible=N,N){let F=this.linear.geometry.parameters.tubularSegments*8*6;this.linear.geometry.setDrawRange(0,Math.floor(G9(X0(J,W,N0(3,/^brain/i)+0.3))*F)),this.linearTag.material.opacity=_9(N0(3,/^brain/i),N0(3,/^brain/i)+0.3,J),this.expoTag.material.opacity=_9(N0(3,/^expo/i),N0(3,/^expo/i)+0.3,J)}let D=H==="flat";if(this.flatLine.visible=this.flatTag.visible=this.stableTag.visible=this.aiTag.visible=D,D){m6(this.aiTag,T9(X0(J,N0(25,/^curve/i),N0(25,/^curve/i)+0.3))),m6(this.flatTag,T9(X0(J,N0(25,/^flat/i),N0(25,/^flat/i)+0.3))),m6(this.stableTag,T9(X0(J,N0(26,/^stable/i),N0(26,/^stable/i)+0.3))*(1+K*0.15));let F=this.flatLine.geometry.parameters.tubularSegments*8*6;this.flatLine.geometry.setDrawRange(0,Math.floor(G9(X0(J,N0(25,/^our/i)-0.2,N0(25,/^flat/i)+0.3))*F))}if(this.crowd.visible=H==="waiting",this.crowd.visible)this.people.forEach((F,O)=>this.crowdPeople.set(O,F.x,F.z,F.h,Math.sin(J*1.3+F.ph)*0.05)),this.crowdPeople.done(),this.notYet.forEach((F,O)=>{let V=(O%2?N0(6,/^not/i):N0(6,/^no\W*$/i))+O*0.07;m6(F,T9(X0(J,V,V+0.25)))});if(this.ceiling.visible=H==="ceiling",this.ceiling.visible){let F=C8(),O=J<F?_9(W,F,J)*0.04:0;this.shards.forEach((V,q)=>{let E=Math.max(0,J-F-V.delay);m0.position.copy(V.p).addScaledVector(V.v,E),m0.position.y-=9*E*E,m0.position.y+=Math.sin(J*40+q)*O,m0.quaternion.setFromAxisAngle(V.axis,E*V.spin),m0.scale.setScalar(1),m0.updateMatrix(),this.panes.setMatrixAt(q,m0.matrix),this.rims.setMatrixAt(q,m0.matrix)}),this.panes.instanceMatrix.needsUpdate=this.rims.instanceMatrix.needsUpdate=!0,this.rims.material.opacity=0.35+K*0.3+(J>=F?0.2:0),this.rims.material.color.copy(O7).lerp(new U0(16777215),J>=F?0.6:0)}let X=Q.ride;for(let F of this.rings)F.visible=!1;if(this.moon.visible=!1,this.meetings.visible=!1,X){let F=g7(),O=eJ(J);this.rings.forEach((V,q)=>{let E=q*F+((J-O*F)%F+F)%F;if(E>3||O-q<0)return;let L=this.rideU(J-E,X.a,X.b);V.visible=!0,V.position.copy(this.path.getPointAt(L)),V.quaternion.setFromUnitVectors(M7(0,0,1),this.path.getTangentAt(L)),V.scale.setScalar(0.6+E*7),V.material.opacity=Math.exp(-E*1.6)*0.9,V.material.color.copy(X.hushed?O7:q%2?s8:cJ)})}if(H==="intro"){let F=G9(X0(J,0,v(0)));U.position.set(j(f7+2,P7+8,F),j(0.9,7.5,F),j(7,34,F)),$.set(j(f7+8,P7+12,F),j(0.4,6,F),0)}else if(H==="years"){let F=d6(this.drawX(J,"years"));$.set(j(P7+14,P9-6,X0(J,W,v(3))),Math.min(F,60)*0.55+2,0),U.position.set($.x-10,$.y*0.5+2,30+Math.min(F,60)*0.55)}else if(H==="linear"){let F=G9(X0(J,W,v(4)));U.position.set(-10,15,j(84,74,F)),$.set(-8,13,0)}else if(H==="waiting"){let F=X0(J,W,v(7));U.position.set(f7-12+F*3,3.2,16-F*3),$.set(P7+4,6+F*3,0)}else if(H==="ceiling"){let F=C8(),O=G9(X0(J,F,F+1.6));U.position.set(q8(L8)-16,j(20,26,O),j(34,46,O)),$.set(q8(L8)+j(0,2,O),j(L8-3,L8+22,O),0)}else if(H==="flat"){let F=G9(X0(J,W,v(27)));U.position.set(j(P9-30,P9-18,F),22,j(78,70,F)),$.set(P9-10,24,0)}else if(H==="ride"&&X){let F=v(X.first),O=X.first+2;if(this.fog.density=0.011+0.07*W5(J,v(O),v(O+1)-0.1,0.4,0.3),this.moon.visible=!0,this.moon.material.opacity=W5(J,v(X.first+1)-0.3,v(O)-0.2,0.5,0.5),this.meetings.visible=X.hushed,X.hushed)this.meetings.count=Math.min(512,2**Math.max(0,Math.floor((J-F)/(g7()*2))));let V=this.rideU(J,X.a,X.b),q=this.path.getPointAt(V),E=this.path.getPointAt(Math.min(1,V+0.04)),L=J<v(X.first+1)-0.2?0:J<v(O)-0.2?1:J<v(O+1)-0.2?2:3;if(L===1){let A=X0(J,v(X.first+1)-0.2,v(O)-0.2);U.position.set(j(P7-10,P7-4,A),2.5,j(58,48,A)),$.set(P7+18,j(18,24,A),0),U.fov=50}else if(L===3){let A=X0(J,v(O+1)-0.2,X.b),R=j(-0.5,0.6,A);U.position.set(P9-9+Math.sin(R)*6,1.2,Math.cos(R)*8),$.set(P9-1,j(30,70,G9(A)),0),U.fov=72}else{let A=_9(0.35,0.8,V);U.position.set(q.x-j(2.5,9,A),q.y+j(1.4,-3,A),(X.hushed?7:4.5)+A*12),$.copy(E).setZ(0),U.fov=X.hushed?46:58}}else if(H==="terrified"&&X){let F=X0(J,W,rD(Q)),O=j(-0.9,1.4,G9(F)),V=X.hushed?48:j(26,40,F);U.position.set(P9+Math.sin(O)*V,j(78,46,F),Math.cos(O)*V),$.set(P9-3,j(70,40,F),0),U.fov=48,this.fog.density=0.004}else if(H==="bridge"){let F=X0(J,W,v(47));U.position.set(j(P9-60,P9-40,F),j(20,30,F),j(110,80,F)),$.set(P9-10,35,0),this.fog.density=0.005}else{let F=v(53)+0.6,O=P8(X0(J,F,W9(53)+1.8)),V=j(nJ,nJ+600,O);this.tip.position.set(P9,V,0),this.beam.visible=V>nJ+0.5,this.beam.position.set(P9,nJ,0),this.beam.scale.set(1,V-nJ,1),U.position.set(P9-50,18,95),$.set(P9-12,j(36,80,G9(X0(J,F,W9(53)+2.2))),0),this.fog.density=0.004}}rideU(J,Q,$){let Z=X0(J,Q,$);return j(0.05,0.985,Z*Z*0.35+G9(Z)*0.65)}roadShot(J,Q,$,Z){let K=this.camera,U=Q.at,W=J-U;this.road.visible=!0;let H=Q.name==="tesla";this.prius.visible=!H,this.tesla.visible=H;let Y=H?46:15,G=W*Y%6;for(let D=0;D<2;D++)for(let X=0;X<50;X++)m0.position.set(D?1.8:-1.8,0.01,12-X*6+G),m0.rotation.set(0,0,0),m0.scale.setScalar(1),m0.updateMatrix(),this.dashes.setMatrixAt(D*50+X,m0.matrix);let N=W*Y%16;for(let D=0;D<2;D++)for(let X=0;X<24;X++)m0.position.set(D?7.5:-7.5,3.2,12-X*16+N),m0.updateMatrix(),this.poles.setMatrixAt(D*24+X,m0.matrix);for(let D=0;D<120;D++){let X=15-(W*90+M0(D)*260)%260;m0.position.set((M0(D+1)-0.5)*30,0.4+M0(D+2)*7,X),m0.updateMatrix(),this.streaks.setMatrixAt(D,m0.matrix)}if(this.dashes.instanceMatrix.needsUpdate=this.poles.instanceMatrix.needsUpdate=this.streaks.instanceMatrix.needsUpdate=!0,this.streaks.material.opacity=H?0.25+Z*0.5:0,H){this.tesla.position.set(0,0,0),this.tesla.rotation.set(0,0,0);let D=G9(X0(J,U,v(2))),X=j(1.15,0.12,D);K.position.set(Math.sin(X)*11,j(1.2,2.8,D),Math.cos(X)*11-1.2),$.set(0,0.7,-2.5)}else{let D=1.15*Math.sin(W*2.2)+0.45*Math.sin(W*5.1+1),X=2.53*Math.cos(W*2.2)+2.295*Math.cos(W*5.1+1);this.prius.position.set(D,0,0),this.prius.rotation.set(0,-X*0.06,X*0.01),K.position.set(D*0.35+1.2,2.8,8.5),$.set(D*0.5,0.6,-8)}}engineShot(J,Q,$,Z){let K=this.camera,U=J-Q;this.engine.visible=!0;let W=U*(5+U*2.2);for(let N of this.stages)N.g.rotation.z=W*N.speed;this.core.scale.setScalar(0.8+Z*0.8),this.core.material.opacity=0.5+Z*0.5;let H=this.exhaust.geometry.attributes.position;for(let N=0;N<H.count;N++){let D=(U*(0.8+M0(N)*0.6)+M0(N+1))%1,X=(0.3+D*2.2)*Math.sqrt(M0(N+2)),F=M0(N+3)*6.283+U*3;H.setXYZ(N,Math.cos(F)*X,Math.sin(F)*X,-5-D*28)}H.needsUpdate=!0,this.exhaust.material.opacity=0.4+Z*0.6;let Y=G9(X0(J,Q,v(6))),G=j(0.65,2.2,Y);K.position.set(Math.sin(G)*13,j(2.5,4,Y),Math.cos(G)*13),$.set(0,0,j(0,-4,Y))}slabShot(J,Q,$,Z){let K=this.camera,U=Q.at;this.slabs.visible=!0,this.approved.visible=Q.name==="procure";let W=new U0(3817552);this.slab.forEach((N,D)=>{let X=1,F=O7,O=0,V=0.9;if(Q.name==="releases"){let q=U+0.15+D*((W9(8)-U)/12);X=T9(X0(J,q,q+0.25)),F=D===Math.floor((J-U-0.15)/((W9(8)-U)/12))?s8:O7}else if(Q.name==="eol"){let q=N0(12,/^live/i);if(X=D<11?1:T9(X0(J,q-0.2,q+0.15)),F=D===11?J>=q?s8:O7:D===10?cJ:W,D===10)F=J>=N0(13,/^end/i)?W:cJ;let E=N0(13,/^end/i)+(10-D)*0.06;O=D<11?P8(X0(J,E,E+0.7)):0,V=D<11?0.5:1}else X=1,F=D===3?J>=N0(28,/^four/i)?EZ:W:D===8?J>=N0(28,/^nine/i)?cJ:W:W,V=D===8&&J>=N0(28,/^nine/i)?1:0.6;N.g.scale.set(1,Math.max(0.001,X),1),N.g.rotation.z=-O*1.45,N.g.position.y=-O*0.5,N.edge.material.color.copy(F),N.edge.material.opacity=V*(0.6+Z*0.4),N.tag.material.color.copy(F).multiplyScalar(0.7),N.tag.visible=X>0.3,N.mesh.material.emissive=F.clone().multiplyScalar(D===8&&Q.name==="procure"&&J>=N0(28,/^nine/i)?0.5:0.05)});let H=this.slab[3],Y=this.slab[8],G=this.slab[11];if(Q.name==="procure"){this.approved.position.set(H.x,H.h+3,0),m6(this.approved,T9(X0(J,N0(27,/^nod/i),N0(27,/^nod/i)+0.3)));let N=G9(X0(J,N0(28,/^nine/i)-0.3,N0(28,/^nine/i)+1));K.position.set(j(H.x+2,Y.x-4,N),j(4,Y.h*0.6,N),j(14,26,N)),$.set(j(H.x,Y.x,N),j(H.h*0.6,Y.h*0.7,N),0)}else if(Q.name==="releases"){let N=X0(J,U,v(9)),D=Math.min(11,Math.floor(N*12)),X=this.slab[D];K.position.set(j(-6,G.x-20,N),j(3,14,N),j(16,34,N)),$.set(X.x-2,X.h*0.5,0)}else{let N=G9(X0(J,U,v(14)));K.position.set(j(G.x-34,G.x-22,N),j(16,22,N),j(80,70,N)),$.set(G.x-14,j(16,20,N),0)}}cometShot(J,Q,$){let Z=this.camera;this.comet.visible=!0;let K=X0(J,v(9)-0.08,v(10)-0.08),U=M7(j(-40,30,K),j(14,4,K)+Math.sin(K*3)*2,j(-30,0,K)),W=M7(70,-10,30).normalize();this.cometHead.position.copy(U),this.cometHead.rotation.set(Q*2,Q*3,0),this.phoneLid.rotation.x=-0.4-Math.abs(Math.sin(Q*9))*0.8;let H=this.tail.geometry.attributes.position;for(let Y=0;Y<H.count;Y++){let G=M0(Y),N=G*G*26,D=0.2+N*0.12;H.setXYZ(Y,U.x-W.x*N+(M0(Y+1)-0.5)*D*2,U.y-W.y*N+(M0(Y+2)-0.5)*D*2+Math.sin(Q*4+Y)*0.05,U.z-W.z*N+(M0(Y+3)-0.5)*D*2)}H.needsUpdate=!0,Z.position.set(U.x-6,U.y+2.5,U.z+14),$.copy(U)}agentShot(J,Q,$,Z){let K=this.camera,U=Q.at;this.agents.visible=!0;let W=Q.name==="kernel",H=new U0;for(let N=0;N<40;N++){let D=N/40*Math.PI*2,X=N%2?7:10,F=0.9+M0(N)*0.8,O=(J-U+M0(N+1)*F)%F/F,V=Math.exp(-O*8);m0.position.set(Math.cos(D)*X,0.6+V*0.8,Math.sin(D)*X),m0.rotation.set(0,D+J*0.4,0),m0.scale.setScalar(0.9),m0.updateMatrix(),this.agentCubes.setMatrixAt(N,m0.matrix),this.agentEdges.setMatrixAt(N,m0.matrix),H.set(W?2759236:1714746).lerp(EZ,V*0.8),this.agentCubes.setColorAt(N,H)}if(this.agentCubes.instanceMatrix.needsUpdate=this.agentEdges.instanceMatrix.needsUpdate=!0,this.agentCubes.instanceColor)this.agentCubes.instanceColor.needsUpdate=!0;this.agentEdges.material.opacity=0.4+Z*0.4;let Y=X0(J,U,W?v(25):v(12)),G=j(0.3,1.6,Y);K.position.set(Math.sin(G)*22,j(12,7,Y),Math.cos(G)*22),$.set(0,1,0)}roomShot(J,Q,$,Z){let K=this.camera,U=Q.at;this.room.visible=!0;let W=Q.name==="standup",H=Q.name==="premeeting",Y=Q.name==="moved",G=Q.name==="triple";this.table.visible=!W;let N=W?v(16):Q.name==="cab"?v(23):H?v(47):Y?v(53):G?v(52):v(35);for(let O=0;O<12;O++)if(W){let V=O/11*Math.PI*2,q=O===11;this.roomPeople.set(O,q?0:Math.cos(V)*4,q?0:Math.sin(V)*4,q?1.05:0.95+M0(O)*0.15,q?Math.sin(J*9)*0.12*(1-X0(J,v(15),v(15)+0.5)):Math.sin(J+O)*0.03)}else{let V=O%2?1:-1,E=-3.5+Math.floor(O/2)*1.45,L=H?T9(X0(J,v(43)+O*0.3,v(43)+O*0.3+0.4)):1,A=Y?P8(X0(J,N0(52,/^moved/i)+M0(O)*1.2,N0(52,/^moved/i)+M0(O)*1.2+1.4)):0;this.roomPeople.set(O,E+A*V*3,V*(1.95+A*9),Math.max(0.001,(0.95+M0(O)*0.12)*L),Math.sin(J*0.8+O)*0.02,A<0.05)}this.roomPeople.done(),this.screen.material.map=this.boards[Q.name==="triple"?"tentative":Q.name]??this.boards.standup,this.screen.material.color.setScalar(0.6+Z*0.1);let D=G9(X0(J,G?N0(51,/^tentative/i):U,N)),X=j(W?0.4:-0.6,W?1.4:0.5,D),F=W?12:13;if(W)K.position.set(Math.sin(X)*F,j(7,4.5,D),Math.cos(X)*F),$.set(0,1,0);else{let O=j(0.75,1.2,D);K.position.set(Math.sin(O)*F*0.8+1,j(4.5,3.6,D),Math.cos(O)*F*0.55),$.set(-4.2,2.6,0)}}fabShot(J,Q,$,Z){let K=this.camera;this.fab.visible=!0,this.wafer.rotation.y=Q*0.6,this.laser.material.opacity=0.5+Z*0.5,this.laser.scale.set(1+Z*2,1,1+Z*2),this.laser.position.set(Math.sin(Q*7)*2.5,0.2,Math.cos(Q*5)*2.5);let U=Math.floor(70*X0(J,N0(30,/^seventy/i),N0(30,/^dutch/i)+0.3)),W=J>=N0(30,/^out/i),H=new U0;for(let G=0;G<70;G++)this.machines.setColorAt(G,H.copy(G<U&&!W?lU.clone().multiplyScalar(0.45):new U0(2106156)));if(this.machines.instanceColor)this.machines.instanceColor.needsUpdate=!0;let Y=G9(X0(J,v(29),v(31)));K.position.set(j(9,-6,Y),j(9,14,Y),j(12,26,Y)),$.set(j(0,-8,Y),j(0.5,0,Y),j(0,-10,Y))}sunShot(J,Q,$){let Z=this.camera;this.sun.visible=!0;let K=X0(J,N0(31,/^mind/i)-0.3,W9(32)),U=this.swarmDirs.length;for(let Y=0;Y<U;Y++){let G=this.swarmDirs[Y],N=M0(Y*7)*0.9,D=G9(X0(K,N,N+0.1));m0.position.copy(G).multiplyScalar(j(30,6.6,D)),m0.lookAt(0,0,0),m0.scale.setScalar(Math.max(0.001,D)),m0.updateMatrix(),this.swarm.setMatrixAt(Y,m0.matrix)}this.swarm.instanceMatrix.needsUpdate=!0,this.swarm.rotation.y=J*0.15;let W=1-K*0.75;this.sunBall.material.color.setRGB(0.75*W,0.55*W,0.28*W),this.sunHalo.material.opacity=(0.35+$*0.2)*W;let H=j(-0.4,0.5,X0(J,v(31),v(33)));Z.position.set(Math.sin(H)*40,6,Math.cos(H)*40),Q.set(0,0,0)}proteinShot(J,Q){let $=this.camera;this.protein.visible=!0;let Z=G9(X0(J,N0(35,/^fold/i),N0(35,/^proteins/i)+0.6)),K=M7();this.coil.forEach((W,H)=>{K.copy(W).lerp(this.helix[H],Z),m0.position.copy(K),m0.rotation.set(0,0,0),m0.scale.setScalar(1),m0.updateMatrix(),this.beads.setMatrixAt(H,m0.matrix)}),this.beads.instanceMatrix.needsUpdate=!0,this.beads.rotation.y=J*0.5,this.globe.visible=J>=N0(35,/^climate/i)-0.1,this.globe.scale.setScalar(Math.max(0.001,T9(X0(J,N0(35,/^climate/i)-0.1,N0(35,/^climate/i)+0.3)))),this.globe.rotation.y=J*0.3;let U=G9(X0(J,v(36),v(36)+0.8));this.protein.scale.setScalar(j(1,0.35,U)),$.position.set(j(-2,0,U),j(9,3,U),j(22,24,U)),Q.set(j(1,6,U),0,0)}render(){this.composer.render()}}var rD=(J)=>{let Q=nU??=lQ();return Q[Q.indexOf(J)+1]?.at??w7()},W5=(J,Q,$,Z,K)=>_9(Q,Q+Z,J)*(1-_9($-K,$,J));var tD=/^(exponential|gain|steep|ceiling|go|shot|engine|jet|thrust|stall|out|ten|contain|vertical|demigod|sun|apocalypse|singularity's|steeper|terrified|doubling|comet's|nine's)$/,eD=/^(prius|tesla|linear|claude|phone|model|brain|plane|kernel|agents|terminal|proteins|climate|grid|euv|dutch|curve)$/,J1=/^(not|yet|no|waiting|you're|thirty|minutes|hands|off|ticket|committee|board|rollback|office|flat|stable|procurement|eighteen|months|compliance|soc|questionnaire|weeks|lawyer|consultancy|bonus|teams|inbox|pre-meeting|meeting|tentative|thursday|quorum|thrilled)$/,Y5={title:"The Steep Part",fonts:['400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
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
  <div class="ov term" data-show="L10|L11-0.05"><div class="bar">~/work · 40 agents</div>${Array.from({length:14},(J,Q)=>`<div class="row" data-at="L10+${(Q*0.16).toFixed(2)}"><span class="ok">✓</span> agent-${String(Q*7%40+1).padStart(2,"0")} closed <b>TICKET-${4100+Q*37}</b></div>`).join("")}
    <div class="row munch" data-at="W10:munch">\uD83E\uDD6A lunch: 1 bite</div></div>
  <div class="ov card roadmap" data-show="L11-0.05|L12-0.1"><div class="bar">Q3 roadmap</div>
    ${["auth rewrite","billing v2","mobile app","data platform","AI everything"].map((J,Q)=>`<div class="gantt"><span>${J}</span><i class="fill" data-at="W11:roadmap+${(Q*0.12).toFixed(2)}" data-until="W11:roadmap+${(0.35+Q*0.12).toFixed(2)}"></i></div>`).join("")}
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
    <div class="checks">${Array.from({length:96},(J,Q)=>`<i data-at="W32:filled+${(Q*0.008).toFixed(3)}"></i>`).join("")}</div>
    <div class="row" data-at="W32:seconds">completed in <b>0.8 s</b></div>
    <div class="row red" data-at="W32:six">review ETA: <b>6 weeks</b></div></div>
  <div class="ov card org" data-show="L33|L34-0.05"><div class="bar">org chart</div>
    <div class="node" data-at="L33">V-P</div><div class="node" data-at="W33:committee">committee</div>
    <div class="pair"><div class="node" data-at="W33:lawyer">lawyer</div><div class="node" data-at="W33:consultancy">consultancy</div></div></div>
  <div class="ov card inbox" data-show="L36|L37-1.2"><div class="bar">the use case</div>
    <div class="bub me" data-at="W36:summarize">Summarize this Teams thread.</div>
    <div class="bub me" data-at="W36:sort">Sort my inbox.</div>
    <div class="bub ai" data-at="W36:so">Done. <b>Inbox 0.</b></div></div>`,endAt:()=>W9(53)+2.4,words:{hot:tD,ice:eD,gold:J1},hud:(J,Q)=>{let $=Math.floor(eJ(J)/4);return{left:`the steep part &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`doublings <span class="ice">${$}</span> &nbsp;·&nbsp; compute <b>×2<sup>${$}</sup></b>`}},shots:lQ,shotAt:RZ,world:(J)=>{let Q=new sU(J);return{update:($)=>Q.update($),render:()=>Q.render(),flash:($)=>Math.min(0.9,Q.flash($))*($>=C8()&&$<C8()+1?0.8:0.6),fade:($)=>Q.fade($)}}};var B9=(J,Q,$,Z)=>({name:J,at:Q,label:$,section:Z}),G5=(J,Q)=>[B9("here",v(J)-0.3,"data here, data there",Q),B9("crates",v(J+2)-0.2,"databricks, dataiku, sap",Q),B9("kevin",v(J+4)-0.2,"the app kevin built",Q),B9("plant",v(J+5)-0.2,"the plant",Q),B9("nobody",v(J+6)-0.2,"nobody knows",Q),B9("finale",v(J+8)-0.2,"data, data everywhere",Q)];function MZ(){return[B9("overture",0,"team! big news!","intro"),B9("curtain",v(1)-0.3,"we're gonna AI","intro"),B9("kickline",v(2)-0.4,"it's gonna fix everything","verse 1"),B9("pitch",v(4)-0.2,"give us all your data","verse 1"),B9("vendor",v(6)-0.2,"the vendor rolled in","pre-chorus"),B9("where",v(8)-0.15,"where's the data?","pre-chorus"),B9("quiet",v(9)-0.2,"here's the thing","pre-chorus"),...G5(11,"chorus"),B9("chain",v(21)-0.6,"ask denise","verse 2"),B9("tickets",v(27)-0.2,"three ticket systems","pre-chorus"),B9("meeting",v(29)-0.2,"fourteen people","pre-chorus"),...G5(35,"chorus"),B9("closet",v(45)-0.6,"a server by the press","verse 3"),B9("cloud",v(47)-0.2,"just sync it up to azure","verse 3"),B9("xp",v(49)-0.2,"windows xp","verse 3"),B9("truths",v(51)-0.5,"nine sources of truth","bridge"),B9("swamp",v(52)-0.2,"the data lake's a swamp","bridge"),B9("raci",v(53)-0.2,"a raci for the raci","bridge"),B9("stan",v(54)-0.2,"ask stan","bridge"),B9("pilot",v(55)-0.2,"the pilot's in a pilot","bridge"),B9("oil",v(56)-0.2,"data is the new oil","bridge"),B9("call",v(59)-0.3,"can everyone see my screen?","breakdown"),B9("curtain",v(66)-0.5,"we're gonna AI (key change)","final chorus"),B9("agents",v(68)-0.2,"agents running everything","final chorus"),B9("lock",N0(69,/^kidding/i)-0.3,"kidding. nobody knows how.","final chorus"),B9("crates",v(70)-0.2,"databricks, dataiku, sap","final chorus"),B9("confluence",v(72)-0.2,"only with the direct link","final chorus"),B9("github",v(73)-0.2,"everywhere but github","final chorus"),B9("nobody",v(74)-0.2,"where's the data?","final chorus"),B9("finale",v(77)-0.2,"data, data... everywhere","final chorus"),B9("curtaincall",v(79)-0.5,"a recurring meeting","outro"),B9("end",W9(82)+0.2,"the end","outro")]}var F5=null,OZ=(J)=>{let Q=F5??=MZ(),$=Q[0];for(let Z of Q)if(Z.at<=J)$=Z;return $},Q1=(J)=>{let Q=F5??=MZ();return Q[Q.indexOf(J)+1]?.at??w7()},$1=9049124,iU=14263361;var X5=1714778,Z1={overture:2361364,curtain:2767514,kickline:2767514,pitch:3811978,vendor:9067028,where:328968,quiet:328968,here:8002122,crates:1723002,kevin:2775610,plant:3815978,nobody:4856346,finale:8002122,chain:2763354,tickets:4864538,meeting:1714746,closet:1316884,cloud:2775712,xp:1723040,truths:3807834,swamp:1718820,raci:2763322,stan:328968,pilot:5929648,oil:2759178,call:658452,agents:1718874,lock:4856346,confluence:1718906,github:1052692,curtaincall:3807780,end:328968},N5=new Map,t9=(J,Q=0.7,$=0)=>{let Z=`${J}:${Q}:${$}`,K=N5.get(Z);if(!K)N5.set(Z,K=new D9({color:J,roughness:Q,metalness:0,emissive:$?J:0,emissiveIntensity:$}));return K},L9=(J,Q,$=0,Z=0,K=0)=>{let U=new $0(J,Q);return U.position.set($,Z,K),U.castShadow=!0,U.receiveShadow=!0,U},f9=(J,Q,$,Z,K=0,U=0,W=0)=>L9(new c0(J,Q,$),t9(Z),K,U,W);function DJ(J,Q,$){let Z=document.createElement("canvas");Z.width=J,Z.height=Q,$(Z.getContext("2d"));let K=new j7(Z);return K.colorSpace=u7,K.anisotropy=4,K}function o7(J,Q,$,Z={}){let K=DJ(Math.round(Q*160),Math.round($*160),(U)=>{let W=U.canvas.width,H=U.canvas.height;U.fillStyle=Z.bg??"#f3ead2",U.fillRect(0,0,W,H),U.strokeStyle=Z.fg??"#1d1a22",U.lineWidth=H*0.05,U.strokeRect(H*0.04,H*0.04,W-H*0.08,H-H*0.08),U.fillStyle=Z.fg??"#1d1a22",U.textAlign="center",U.textBaseline="middle";let Y=H*(Z.sub?0.4:0.5);U.font=`${Z.font??"900"} ${Y}px "DM Serif Display", Georgia, serif`;while(U.measureText(J).width>W*0.88)Y*=0.92,U.font=`${Z.font??"900"} ${Y}px "DM Serif Display", Georgia, serif`;if(U.fillText(J,W/2,Z.sub?H*0.4:H/2),Z.sub)U.font=`600 ${H*0.17}px "JetBrains Mono", monospace`,U.fillText(Z.sub,W/2,H*0.74)});return L9(new A9(Q,$),new D9({map:K,roughness:0.8}))}var b7=new x9,i0=(J=0,Q=0,$=0)=>new T(J,Q,$),K1=i0(0,1,0),U1=new Q9(0.075,0.085,1,8).translate(0,0.5,0),W1=new Q9(0.11,0.09,0.95,10).translate(0,-0.475,0);function iJ(J){let Q=new _0,$=J.robot?10134445:[15254688,13012578,9263675,15782582,7029808][Math.floor(M0(J.seed)*5)],Z=J.pants??2763316;if(Q.add(L9(new Q9(0.27,0.24,0.72,14),t9(J.shirt),0,1.3,0)),Q.add(L9(new Q9(0.25,0.27,0.22,14),t9(Z),0,0.92,0)),J.tie)Q.add(f9(0.08,0.42,0.03,J.tie,0,1.38,0.27));let K=J.robot?f9(0.42,0.4,0.4,$,0,1.9,0):L9(new a0(0.21,16,12),t9($),0,1.88,0);if(J.robot)K.add(L9(new c0(0.28,0.07,0.02),t9(8057087,0.4,1.5),0,0.02,0.21));if(J.hat)K.add(L9(new a0(0.23,14,8,0,Math.PI*2,0,Math.PI/2),t9(J.hat),0,0.05,0));Q.add(K);let U=[-1,1].map((Y)=>{let G=new $0(W1,t9(Z));return G.position.set(Y*0.12,0.95,0),G.castShadow=!0,G.add(L9(new c0(0.14,0.08,0.3),t9(1381402),0,-0.93,0.06)),Q.add(G),G}),W=[-1,1].map(()=>{let Y=L9(new a0(0.075,10,8),t9($));return Q.add(Y),Y}),H=[0,1].map(()=>{let Y=new $0(U1,t9(J.shirt));return Y.castShadow=!0,Q.add(Y),Y});return Object.assign(Q.userData,{head:K,hands:W,arms:H,legs:U,seed:J.seed}),Q}var H1={down:[0.34,0.95,0.12],up:[0.42,2.45,0.05],jazz:[0.72,2,0.3],shrug:[0.62,1.42,0.42],point:[0.3,1.75,0.85],out:[0.95,1.6,0.1],face:[0.16,1.82,0.32]};function h7(J,Q,$,Z=0,K=0,U=0.04,W){let{hands:H,arms:Y,legs:G,seed:N,head:D}=J.userData;J.rotation.z=Math.sin(Q*Math.PI*2.2+N)*U,D.rotation.x=$==="face"?0.35:0,H.forEach((X,F)=>{let O=F?1:-1,[V,q,E]=H1[F&&W?W:$];X.position.set(O*V,q+($==="jazz"?Math.sin(Q*30+F)*0.03:0),E);let L=i0(O*0.26,1.6,0.02),A=X.position.clone().sub(L);Y[F].position.copy(L),Y[F].quaternion.setFromUnitVectors(K1,A.clone().normalize()),Y[F].scale.set(1,A.length(),1)}),G.forEach((X,F)=>{X.rotation.x=F===K?-Z*1.45:Z*0.1})}var oU=[{name:"Databricks",word:/^databricks/i,color:"#d8452f"},{name:"Dataiku",word:/^dataiku/i,color:"#2ab1ac"},{name:"SAP",word:/^sap$/i,color:"#1a6fd1"},{name:"S3",word:/^s3/i,color:"#d88a1a"},{name:"Redshift",word:/^redshift/i,color:"#8c4fd1"},{name:"Azure",word:/^azure/i,color:"#2a86e0"},{name:"ServiceNow",word:/^servicenow/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^\W*times/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^three/i,color:"#3f9a4a"}],q5=[{label:"My boss",word:/^boss/i},{label:"Denise",word:/^denise/i},{label:"Platform team",word:/^platform/i},{label:"#data-access",word:/^slack/i},{label:"Gary (OOO)",word:/^gary/i},{label:"A guy who knows a guy",word:/^guy$/i}];class aU{renderer;scene=new V8;camera=new e9(45,1.7777777777777777,0.1,400);composer;bloom;wash=new B8(16771272,2758672,0.5);key=new G8(16773336,0.6);spots=[];cyc;stage=new _0;curtains=[];bulbs;marquee=new _0;marqueeBulbs;marqueeBulbPos=[];seats;lead;vendorGuy;cio;line=[];deck;decks={};crates=[];github=new _0;kevin=new _0;plant=new _0;chain=[];booths=[];meeting=new _0;clockHand;closet=new _0;fan;xpScreen;cloud=new _0;plantGuy;agents=[];padlock=new _0;door=new _0;swamp;tomb;planes=[];barrels=new _0;stanSign;confetti;constructor(J){this.renderer=new m8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=_6,this.renderer.toneMapping=b8,this.scene.background=new U0(328711),this.composer=new u8(this.renderer),this.composer.addPass(new c8(this.scene,this.camera)),this.bloom=new X8(new Z0(1920,1080),0.55,0.5,0.82),this.composer.addPass(this.bloom),this.composer.addPass(new l8),this.key.position.set(0,18,20),this.scene.add(this.wash,this.key),this.buildStage(),this.buildPeople(),this.buildProps(),this.scene.add(this.stage)}buildStage(){let J=this.stage,Q=DJ(1024,512,(Y)=>{for(let G=0;G<32;G++){Y.fillStyle=`hsl(28, ${38+M0(G)*10}%, ${22+M0(G+4)*8}%)`,Y.fillRect(0,G*16,1024,15),Y.fillStyle="rgba(0,0,0,.35)",Y.fillRect(0,G*16+15,1024,1);for(let N=0;N<3;N++)Y.fillRect(M0(G*5+N)*1024,G*16,2,15)}});Q.wrapS=Q.wrapT=YJ,Q.repeat.set(2,2);let $=L9(new c0(30,1,14),new D9({map:Q,roughness:0.55}),0,-0.5,-2.5);J.add($),this.cyc=new $0(new A9(34,18),new y9({uniforms:{color:{value:new U0(X5)},glow:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 color; uniform float glow; varying vec2 vUv;
        void main() { float g = smoothstep(0.0, 0.55, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y)) * 0.9 + 0.1;
          float h = exp(-pow((vUv.y - 0.12) * 5.0, 2.0)) * 0.8;
          gl_FragColor = vec4(color * (g + h) * glow, 1.0); }`})),this.cyc.position.set(0,7.5,-8.2),J.add(this.cyc);let Z=new D9({color:iU,roughness:0.35,metalness:0.7});for(let Y of[-12.4,12.4])J.add(L9(new c0(1.4,14,1),Z,Y,6.5,4.9));J.add(L9(new c0(26.2,1.6,1),Z,0,13.3,4.9)),J.add(f9(24,2.2,0.2,789008,0,11.6,4.4));let K=new A9(12,12.6,48,1),U=K.attributes.position;for(let Y=0;Y<U.count;Y++)U.setZ(Y,Math.sin(U.getX(Y)*4.2)*0.18);K.computeVertexNormals();let W=new D9({color:$1,roughness:0.8,side:r9});for(let Y of[-1,1]){let G=L9(K,W,Y*6,6.3,4.3);this.curtains.push(G),J.add(G);let N=L9(K,W,Y*13.5,6.3,3.6);N.scale.x=0.35,J.add(N)}this.bulbs=new p9(new a0(0.09,10,8),new l0({color:16767120}),40);for(let Y=0;Y<40;Y++)b7.position.set(-11.5+Y*0.59,0.08,4.2),b7.updateMatrix(),this.bulbs.setMatrixAt(Y,b7.matrix);J.add(this.bulbs,f9(24,0.18,0.4,1708556,0,0,4.35)),this.seats=new p9(new c0(0.62,0.95,0.6),t9(5901336),220);let H=0;for(let Y=0;Y<10;Y++)for(let G=0;G<22;G++)b7.position.set(-11+G*1.05,0+Y*0.32-0.6,8+Y*1.2),b7.updateMatrix(),this.seats.setMatrixAt(H++,b7.matrix);J.add(this.seats);for(let[Y,G,N]of[[-9,16,18],[9,16,18],[0,18,16]]){let D=new UZ(16774368,0,60,0.16,0.45,1.2);D.position.set(Y,G,N),D.castShadow=!0,D.shadow.mapSize.set(1024,1024),D.shadow.bias=-0.0005,this.scene.add(D,D.target);let X=new $0(new Q9(0.05,1,1,24,1,!0).translate(0,-0.5,0),new l0({color:16773328,transparent:!0,opacity:0.06,blending:N7,depthWrite:!1,side:r9}));this.scene.add(X),this.spots.push({light:D,beam:X})}}buildPeople(){this.lead=iJ({shirt:2771594,pants:1844280,tie:13120058,seed:3}),this.vendorGuy=iJ({shirt:13148240,pants:9071146,tie:1710618,seed:8}),this.cio=iJ({shirt:3816004,pants:2236970,tie:6982351,seed:11}),this.plantGuy=iJ({shirt:5925498,pants:2767450,seed:14,hat:15777824});let J=[15262938,9089240,14196904,12114080,15257744,12626144,15790320,9488584];for(let Q=0;Q<8;Q++)this.line.push(iJ({shirt:J[Q],tie:Q%2?2763370:void 0,seed:20+Q}));for(let Q=0;Q<3;Q++)this.agents.push(iJ({shirt:10134445,pants:6976381,seed:40+Q,robot:!0}));for(let Q of[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents])this.stage.add(Q)}buildProps(){let J=this.stage,Q=DJ(1600,400,(R)=>{R.fillStyle="#1a0f08",R.fillRect(0,0,1600,400),R.fillStyle="#ffe9b0",R.textAlign="center",R.textBaseline="middle";let _=210;R.font=`400 ${_}px "Limelight", "DM Serif Display", serif`;while(R.measureText("WE'RE GONNA AI!").width>1440)_-=6,R.font=`400 ${_}px "Limelight", "DM Serif Display", serif`;R.fillText("WE'RE GONNA AI!",800,212)});this.marquee.add(L9(new c0(16.4,4.4,0.4),t9(2759184)));let $=new $0(new A9(15.6,3.9),new D9({map:Q,emissive:16777215,emissiveMap:Q,emissiveIntensity:0.55}));$.position.z=0.21,this.marquee.add($);for(let R=0;R<64;R++){let z=R/64*40.4,M=0,I=0;if(z<16)M=-8+z,I=2.1;else if((z-=16)<4.2)M=8,I=2.1-z;else if((z-=4.2)<16)M=8-z,I=-2.1;else z-=16,M=-8,I=-2.1+z;this.marqueeBulbPos.push(i0(M,I,0.3))}this.marqueeBulbs=new p9(new a0(0.13,10,8),new l0({color:16777215}),64),this.marqueeBulbPos.forEach((R,_)=>{b7.position.copy(R),b7.updateMatrix(),this.marqueeBulbs.setMatrixAt(_,b7.matrix)}),this.marquee.add(this.marqueeBulbs);for(let R of[-6,6])this.marquee.add(L9(new Q9(0.02,0.02,10),t9(8947848),R,7.2,0));J.add(this.marquee),this.deck=new $0(new A9(9,5.06),new D9({color:16777215,emissive:16777215,emissiveIntensity:0.22})),this.deck.position.set(2.5,5.2,-6.5),J.add(this.deck);let Z=(R,_,B,z)=>DJ(1280,720,(M)=>{M.fillStyle=B,M.fillRect(0,0,1280,720),M.fillStyle=z,M.textAlign="center",M.font='900 120px "DM Serif Display", Georgia, serif',M.fillText(R,640,330),M.font='600 46px "JetBrains Mono", monospace',M.fillText(_,640,450)});this.decks={vendor:Z("Live by Q3!","AI that fixes everything™","#f6f1e4","#1a3a8a"),pilot:Z("Demo: ✓ crushed it","now with your data…","#f6f1e4","#1a6a3a"),tears:Z("ERROR","null · null · null · NaN","#2a0a0e","#ff6a6a"),oil:Z("Data is the new oil!","every deck, every quarter","#141010","#f0c060")};let K=(R,_)=>DJ(512,512,(B)=>{B.fillStyle="#b08a58",B.fillRect(0,0,512,512),B.fillStyle="rgba(60,40,20,.5)";for(let M=0;M<6;M++)B.fillRect(0,M*86,512,6);B.strokeStyle="#6a4a28",B.lineWidth=26,B.strokeRect(13,13,486,486),B.beginPath(),B.moveTo(26,26),B.lineTo(486,486),B.stroke(),B.fillStyle=_,B.fillRect(40,186,432,140),B.fillStyle="#fff",B.textAlign="center",B.textBaseline="middle";let z=84;B.font=`900 ${z}px "DM Serif Display", Georgia, serif`;while(B.measureText(R).width>400)z-=4,B.font=`900 ${z}px "DM Serif Display", Georgia, serif`;B.fillText(R,256,258)});oU.forEach((R,_)=>{let B=new _0,z=K(R.name,R.color);if(B.add(L9(new c0(1.9,1.9,1.9),new D9({map:z,roughness:0.8}),0,0.95,0)),B.userData.home=_<6?i0(-9.2+_*2.6+(_>2?2.6:0)-1.3,0,-4.5+_%2*1.2):i0(8.6,(_-6)*1.9,-2.6),_<6)B.userData.home=i0([-9.5,-6.6,-3.7,3.7,6.6,9.5][_],0,[-4.8,-3.6,-5.2,-5.2,-3.6,-4.8][_]);B.rotation.y=(M0(_)-0.5)*0.4,this.crates.push(B),J.add(B)});let U=new U8(new T6(new c0(1.9,1.9,1.9)),new $Z({color:16777215,dashSize:0.18,gapSize:0.12}));U.computeLineDistances(),U.position.y=0.95;let W=o7("GitHub",1.9,0.6,{bg:"#101014",fg:"#f0f0f0"});W.position.set(0,2.3,0),this.github.add(U,W),J.add(this.github);let H=DJ(640,480,(R)=>{R.fillStyle="#0a0aa0",R.fillRect(0,0,640,480),R.fillStyle="#c0c0c0",R.fillRect(40,40,560,400),R.fillStyle="#000080",R.fillRect(40,40,560,44),R.fillStyle="#fff",R.font='700 30px "JetBrains Mono", monospace',R.fillText("KevinSoft Data Manager 2003",56,72),R.fillStyle="#000",R.font='600 26px "JetBrains Mono", monospace',["Records: 41,207","Last backup: 2009","Password: kevin1","Do not close!!"].forEach((_,B)=>R.fillText(_,70,150+B*60))});this.kevin.add(f9(3,0.15,1.6,6965802,0,1.4,0),f9(0.12,1.4,0.12,3811866,-1.3,0.7,0),f9(0.12,1.4,0.12,3811866,1.3,0.7,0)),this.kevin.add(f9(1.8,1.5,1.6,14208944,0,2.3,-0.1));let Y=L9(new A9(1.5,1.12),new D9({map:H,emissive:16777215,emissiveMap:H,emissiveIntensity:0.35}),0,2.35,0.71);this.kevin.add(Y,f9(1.6,0.08,0.6,14208944,0,1.52,0.5));let G=o7("Kevin's app",2.4,0.6,{sub:"built 2003 · Kevin left 2011"});G.position.set(0,3.7,0),this.kevin.add(G),J.add(this.kevin);let N=new XJ([i0(-6,0),i0(-6,3),i0(-4,4.2),i0(-4,3),i0(-2,4.2),i0(-2,3),i0(0,4.2),i0(0,3),i0(6,3),i0(6,0)].map((R)=>new Z0(R.x,R.y)));this.plant.add(L9(new NJ(N,{depth:0.3,bevelEnabled:!1}),t9(4868690))),this.plant.add(L9(new Q9(0.4,0.55,6,14),t9(5913138),3.8,5.5,0.15));let D=o7("THE PLANT",4,1,{sub:"bandwidth: 0.3 Mbps (on a good day)",bg:"#f0e6c0"});D.position.set(0.5,1.7,0.34),this.plant.add(D);for(let R=0;R<4;R++)this.plant.add(L9(new A9(0.8,0.6),t9(16765040,0.5,1.2),-4.6+R*1.6,1.6,0.32));this.plant.position.set(0,0,-6.6),J.add(this.plant),q5.forEach((R,_)=>{let B=new _0,z=_===4?null:iJ({shirt:[3816004,12081786,4880986,10134445,0,9071178][_],seed:60+_,robot:_===3,tie:_===0?9050650:void 0});if(z)B.add(z);if(_===4)B.add(f9(0.8,0.08,0.8,3816004,0,0.9,0),f9(0.8,0.9,0.08,3816004,0,1.35,-0.38),f9(0.06,0.9,0.06,2236962,0,0.45,0));let M=o7(R.label,2.2,0.55,{bg:_===4?"#ffe9a0":"#f3ead2"});M.position.set(0,2.75,0),B.add(M),B.position.set(-9+_*3.6,0,-2.4+_%2*1.1),this.chain.push({group:B,who:z}),J.add(B)}),[["RESOLVED","#2f8a4a"],["DUPLICATE","#6a6a74"],["SEE TICKET 3","#c88a1a"]].forEach(([R,_],B)=>{let z=new _0;z.add(f9(2.4,2.2,1.4,2763316,0,1.1,0),f9(2.6,0.12,1.6,4868692,0,2.26,0));let M=o7(R,2.4,0.7,{bg:_,fg:"#ffffff"});M.position.set(0,1.4,0.71);let I=new $0(new a0(0.3,16,12),new D9({color:new U0(_),emissive:new U0(_),emissiveIntensity:0}));I.position.set(0,2.7,0);let f=o7(`Ticket system #${B+1}`,2.4,0.45,{bg:"#f3ead2"});f.position.set(0,3.4,0),z.add(M,I,f),z.position.set(-6+B*6,0,-3),this.booths.push({group:z,lamp:I}),J.add(z)}),this.meeting.add(f9(12,0.15,2.2,5913124,0,1.25,-2.5));for(let R=0;R<14;R++){let _=-5.5+R%7*1.85,B=R<7?-3.9:-1.1;this.meeting.add(f9(0.7,0.08,0.7,2302764,_,0.8,B),f9(0.7,0.9,0.08,2302764,_,1.25,B+(R<7?-0.35:0.35)))}let X=DJ(256,256,(R)=>{R.fillStyle="#f6f1e4",R.beginPath(),R.arc(128,128,124,0,Math.PI*2),R.fill(),R.fillStyle="#1d1a22";for(let _=0;_<12;_++){let B=_/12*Math.PI*2;R.fillRect(128+Math.sin(B)*100-4,128-Math.cos(B)*100-10,8,20)}}),F=L9(new l7(1.1,40),new D9({map:X}),0,7.5,-7.8);this.clockHand=f9(0.08,0.9,0.04,1907234,0,7.5,-7.75),this.clockHand.geometry.translate(0,0.4,0),this.meeting.add(F,this.clockHand),J.add(this.meeting),this.closet.add(f9(0.2,7,6,5921354,-3.2,3.5,-3),f9(0.2,7,6,5921354,3.2,3.5,-3),f9(6.6,7,0.2,4868670,0,3.5,-6)),this.closet.add(f9(1.4,3,1.8,2763312,-1.2,1.5,-4.2));for(let R=0;R<6;R++)this.closet.add(L9(new a0(0.05),t9(R%2?4259680:16752672,0.5,2),-1.6+R%3*0.2,2.6-Math.floor(R/3)*0.2,-3.28));this.closet.add(f9(1.8,0.1,1.2,6965802,1.4,1.2,-4.4),f9(0.1,1.2,0.1,3811866,0.6,0.6,-4.4),f9(0.1,1.2,0.1,3811866,2.2,0.6,-4.4)),this.closet.add(f9(1.5,1.2,1.2,14208944,1.4,1.85,-4.6));let O=DJ(640,480,(R)=>{let _=R.createLinearGradient(0,0,0,300);_.addColorStop(0,"#2a6ae0"),_.addColorStop(1,"#a8d0f8"),R.fillStyle=_,R.fillRect(0,0,640,480),R.fillStyle="#4aa83a",R.beginPath(),R.moveTo(0,330),R.quadraticCurveTo(300,200,640,300),R.lineTo(640,480),R.lineTo(0,480),R.fill(),R.fillStyle="#245ed8",R.fillRect(0,440,640,40),R.fillStyle="#3a9a3a",R.fillRect(0,440,120,40),R.fillStyle="#fff",R.font='italic 700 26px "Inter", sans-serif',R.fillText("start",28,469),R.fillStyle="#f6f1e4",R.fillRect(150,120,340,150),R.fillStyle="#0a246a",R.fillRect(150,120,340,34),R.fillStyle="#fff",R.font='700 20px "Inter", sans-serif',R.fillText("Windows XP · Service Pack 2",160,144),R.fillStyle="#000",R.font='500 20px "Inter", sans-serif',R.fillText("Uptime: 4,211 days",170,200),R.fillText("Updates available: 1,906",170,235)});this.xpScreen=L9(new A9(1.3,0.98),new D9({map:O,emissive:16777215,emissiveMap:O,emissiveIntensity:0.4}),1.4,1.88,-3.99),this.closet.add(this.xpScreen),this.fan=new _0,this.fan.add(L9(new L7(0.7,0.07,8,32),t9(14211280)));for(let R=0;R<4;R++){let _=f9(0.32,0.55,0.03,9089240,0,0.3,0);_.geometry.translate(0,0,0);let B=new _0;B.add(_),B.rotation.z=R*Math.PI/2,this.fan.add(B)}this.fan.position.set(-1.2,3.8,-4.2),this.closet.add(this.fan);let V=o7("DO NOT UNPLUG",0.9,0.7,{bg:"#ffe55a",sub:"— Jess"});V.position.set(-1.2,2.2,-3.29),this.closet.add(V),J.add(this.closet);for(let R=0;R<7;R++)this.cloud.add(L9(new a0(0.9+M0(R)*0.6,18,14),t9(16054010),-2.4+R*0.8,Math.sin(R*1.3)*0.4,M0(R+3)*0.6));let q=o7("AZURE",2.6,0.7,{bg:"#2a86e0",fg:"#fff"});q.position.set(0,-1.4,1.2),this.cloud.add(q,L9(new Q9(0.02,0.02,8),t9(10127978),0,-5,0)),J.add(this.cloud),this.padlock.add(L9(new L7(1.1,0.22,12,32,Math.PI),new D9({color:11579576,metalness:0.8,roughness:0.3}),0,1.6,0)),this.padlock.add(L9(new c0(3,2.4,0.9),new D9({color:iU,metalness:0.7,roughness:0.35}),0,0.4,0)),this.padlock.add(L9(new Q9(0.22,0.22,0.95,16),t9(1710618),0,0.5,0.05).rotateX(Math.PI/2)),J.add(this.padlock),this.door.add(f9(3,5.6,0.3,3811866,0,2.8,0),f9(2.4,5,0.2,2775720,0,2.6,0.12));let E=o7("Confluence",2.6,0.7,{bg:"#f3ead2"});E.position.set(0,5.9,0.2);let L=o7("direct link only",2.2,0.5,{bg:"#ffe9a0"});L.position.set(0,2.9,0.26),this.door.add(E,L,L9(new a0(0.14),new D9({color:iU,metalness:0.8,roughness:0.3}),0.9,2.5,0.3)),J.add(this.door),this.swamp=L9(new l7(7,48),new D9({color:3824170,roughness:0.25,metalness:0.1}),0,0.03,-2.5),this.swamp.rotation.x=-Math.PI/2,J.add(this.swamp),this.tomb=new _0,this.tomb.add(L9(new Q9(0.9,0.9,0.3,24,1,!1,0,Math.PI),t9(9079440),0,2.1,0).rotateX(Math.PI/2),f9(1.8,2.1,0.3,9079440,0,1.05,0));let A=o7("RIP CRM",1.5,0.9,{bg:"#8a8a90",sub:"2009–2021"});A.position.set(0,1.3,0.16),this.tomb.add(A),J.add(this.tomb);for(let R=0;R<2;R++){let _=new _0,B=R?0.45:1;_.add(L9(new Z7(0.9*B,3*B,3),t9(R?15782016:16183780)).rotateX(-Math.PI/2).rotateZ(Math.PI/2)),this.planes.push(_),J.add(_)}for(let R=0;R<9;R++)this.barrels.add(L9(new Q9(0.6,0.6,1.6,20),t9(1710618,0.4),-8+R*2,0.8,-3+R%2*1.2));J.add(this.barrels),this.stanSign=o7("STAN?",1.6,0.6,{bg:"#f3ead2"}),J.add(this.stanSign),this.confetti=new p9(new A9(0.16,0.1),new l0({color:16777215,side:r9}),400);for(let R=0;R<400;R++)this.confetti.setColorAt(R,new U0([16765024,16734858,5943551,8056954,16777215][R%5]));J.add(this.confetti)}flash(J){let Q=OZ(J);return Q.name==="here"||Q.name==="finale"?Math.exp(-(J-Q.at)*8)*0.25:0}fade(J){return _9(w7()-0.8,w7(),J)}update(J){let Q=OZ(J),$=Q.name,Z=Q.at,K=Q1(Q),U=X0(J,Z,K),W=J-Z,H=this.camera,Y=i0(0,3,0),G=r7(J),N=eJ(J),D=new Set,X=(B,z)=>{B.visible=z},F=new U0(Z1[$]??X5);this.cyc.material.uniforms.color.value.copy(F),this.cyc.material.uniforms.glow.value=1+G*0.25;let O=$==="where"||$==="quiet"||$==="stan"||$==="call"||$==="github"||$==="end";this.wash.intensity=O?0.05:$==="closet"||$==="xp"?0.25:0.55,this.key.intensity=O?0:0.5;for(let B=0;B<40;B++)this.bulbs.setColorAt(B,new U0(O?3811860:16767120));if(this.bulbs.instanceColor)this.bulbs.instanceColor.needsUpdate=!0;let V=$==="overture"?0:$==="curtain"&&Z<10?G9(X0(J,Z,Z+1.6)):$==="curtaincall"?1-P8(X0(J,v(80),W9(82))):$==="end"?0:1;this.curtains.forEach((B,z)=>{let M=z?1:-1;B.scale.x=j(1,0.28,V),B.position.x=M*j(6,10.8,V)});let q=[null,null,null],E=[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents];for(let B of E)B.visible=!1;for(let B of[this.marquee,this.deck,this.github,this.kevin,this.plant,this.meeting,this.closet,this.cloud,this.padlock,this.door,this.swamp,this.tomb,this.barrels,this.stanSign,this.confetti,...this.planes])B.visible=!1;for(let B of this.crates)B.visible=!1;for(let B of this.chain)B.group.visible=!1;for(let B of this.booths)B.group.visible=!1;let L=(B)=>{let z=(J-0.433)/g7()-B*0.12,M=Math.floor(z),I=z-M;return{amount:Math.sin(k9(I)*Math.PI)*0.95,leg:(M+B)%2}},A=(B=0,z=-1.5,M="jazz")=>{this.line.forEach((I,f)=>{I.visible=!0,I.position.set(-8.4+f*2.4,B,z),I.rotation.y=0;let S=L(f);h7(I,J,M,S.amount,S.leg,0.02)})},R=(B,z,M,I=0.05)=>{this.lead.visible=!0,this.lead.position.set(B,0,z),this.lead.rotation.y=0,h7(this.lead,J,M,0,0,I)},_=Y1(J);switch($){case"overture":{R(0,3.2,W>1.2?"jazz":"out"),q[2]=i0(0,1.6,3.2),H.position.set(0,j(2.6,2.3,U),j(14,10.5,U)),Y.set(0,2.6,3);break}case"curtain":{let B=Z>100;if(this.marquee.visible=!0,this.marquee.position.set(0,j(16,8.6,T9(X0(J,Z+0.2,Z+1.4))),-4),this.marqueeBulbPos.forEach((z,M)=>this.marqueeBulbs.setColorAt(M,new U0((M+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;if(A(),R(0,2.2,"up"),q[0]=i0(-4,1,-1.5),q[1]=i0(4,1,-1.5),q[2]=i0(0,1.6,2.2),B)this.confettiAt(J,Z);H.position.set(0,j(4,5,U),j(20,17,U)),Y.set(0,5,0),H.fov=46;break}case"kickline":{if(this.marquee.visible=!0,this.marquee.position.set(0,8.6,-4),this.marqueeBulbPos.forEach((B,z)=>this.marqueeBulbs.setColorAt(z,new U0((z+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;A(),R(0,2.2,G>0.5?"up":"jazz"),q[0]=i0(-4,1,-1.5),q[1]=i0(4,1,-1.5),q[2]=i0(0,1.6,2.2),H.position.set(j(-11,11,U),1,5.5),Y.set(j(-6,6,U),1.4,-1.5),H.fov=50;break}case"pitch":{A(0,-2.6,"out"),R(0,2,J>v(5)?"out":"point"),q[2]=i0(0,1.6,2),H.position.set(j(1.5,0.5,U),2.4,j(9.5,7.5,U)),Y.set(0,2.1,1),H.fov=40;break}case"vendor":{this.deck.visible=!0,this.deck.material.map=this.decks.vendor,this.deck.material.emissiveMap=this.decks.vendor,this.deck.material.needsUpdate=!0,this.vendorGuy.visible=!0,this.vendorGuy.position.set(j(-12,-2,G9(X0(J,Z,Z+1.5))),0,0.5),this.vendorGuy.rotation.y=0.3,h7(this.vendorGuy,J,J>N0(7,/^q3/i)?"jazz":"point",0,0,0.06),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=-0.6,h7(this.cio,J,"down"),q[0]=this.vendorGuy.position.clone().setY(1.6),q[1]=i0(2.5,4,-6.5),H.position.set(j(-3,0,U),3,11),Y.set(0,3,-2);break}case"where":case"quiet":{if(this.vendorGuy.visible=!0,this.vendorGuy.position.set(-2,0,0.5),h7(this.vendorGuy,J,"shrug",0,0,0),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=$==="quiet"?-0.2:-0.6,h7(this.cio,J,$==="quiet"&&J>N0(10,/^thing/i)-1?"shrug":"down",0,0,0),q[2]=$==="where"?i0(-2,1.6,0.5):i0(5.5,1.6,1.5),$==="where")H.position.set(-2,2.2,7),Y.set(-2,2,0.5),H.fov=34;else H.position.set(j(3.2,4.2,U),2.1,j(7.5,5.5,U)),Y.set(5.5,2,1.5),H.fov=32;break}case"here":case"finale":{A(),R(0,2.4,"out");let B=N0(Q.at<100?11:Q.at<200?35:77,/^\W*there/i),z=$==="here"&&J<B-0.1?-1:$==="here"?1:Math.sin(J*3)>0?1:-1;if(q[0]=i0(z*7,0.5,-1),q[1]=i0(-z*3,0.5,-1),q[2]=i0(0,1.6,2.4),this.cratesUpTo(J,9,!0),$==="finale")this.kevin.visible=this.plant.visible=!0,this.kevin.position.set(-10.5,0,1.5);if($==="finale"&&Z>230)this.confettiAt(J,Z);H.position.set(Math.sin(J*0.3)*3,j(5,4,U),j(24,19,U)),Y.set(0,3.5,-1);break}case"crates":{let B=Z<100?13:Z<200?37:70;this.cratesUpTo(J,9,!1,B),R(0,2.4,"point"),this.lead.rotation.y=Math.sin(J*2)*0.6,q[2]=i0(0,1.6,2.4);let z=this.lastDropped(J,B);if(z)q[0]=z.clone().setY(1);H.position.set(j(-4,4,U),j(7,6,U),15),Y.set(j(-3,3,U),1.6,-3),H.fov=48;break}case"kevin":{this.cratesUpTo(J,9,!0),this.kevin.visible=!0,this.kevin.position.set(0,j(14,0,T9(X0(J,Z,Z+0.9))),0.8),R(-2.6,2,"point"),this.lead.rotation.y=0.8,q[2]=i0(0,2.4,0.8),H.position.set(j(1.5,0.5,U),2.9,j(7.5,6.4,U)),Y.set(0,2.5,0.8),H.fov=40;break}case"plant":{this.cratesUpTo(J,9,!0),this.plant.visible=!0,R(0,2,"out"),q[1]=i0(0,2,-6.5),H.position.set(0,j(3,4,U),j(16,13,U)),Y.set(0,2.6,-6.5),H.fov=44;break}case"nobody":{this.cratesUpTo(J,9,!0),A(0,-1.5,_>0.2?"shrug":"down"),this.line.forEach((B)=>h7(B,J,_>0.2?"shrug":"down",0,0,0.02)),R(0,2.4,_>0.2?"shrug":"face"),q[2]=i0(0,1.6,2.4),H.position.set(0,2.2,j(11,9,U)),Y.set(0,2,0);break}case"chain":{let B=0;q5.forEach((M,I)=>{let f=21+[0,0,1,2,3,4][I];if(J>=N0(f,M.word)-0.1)B=I}),this.chain.forEach((M,I)=>{if(M.group.visible=!0,M.who)h7(M.who,J,I===B?I===3?"point":I===5?"shrug":"point":"down",0,0,0.02)});let z=this.chain[B].group.position;R(j(this.lead.position.x||-11,z.x+1.3,0.5),z.z+1.4,"shrug"),this.lead.position.x=z.x+1.3,this.lead.rotation.y=-0.6,q[2]=z.clone().setY(1.6),q[1]=this.lead.position.clone().setY(1.6),H.position.set(z.x*0.8+2,3,10),Y.set(z.x*0.9+0.5,2,-1.5),H.fov=42;break}case"tickets":{this.booths.forEach((B,z)=>{B.group.visible=!0;let M=z===0?N0(28,/resolved/i):z===1?N0(28,/duplicate/i):N0(28,/^see/i);B.lamp.material.emissiveIntensity=J>=M-0.1||J<v(28)&&Math.floor(J*4)%3===z?2.2:0.1}),R(0,1.6,"shrug"),q[0]=i0(-6,1.6,-3),q[1]=i0(6,1.6,-3),q[2]=i0(0,1.6,-3),H.position.set(0,j(4,3.4,U),j(15,12,U)),Y.set(0,2,-3);break}case"meeting":{this.meeting.visible=!0,this.clockHand.rotation.z=-W*3,[...this.line,this.lead,this.cio,this.vendorGuy,this.plantGuy,this.agents[0],this.agents[1]].forEach((z,M)=>{z.visible=!0;let I=-5.5+M%7*1.85,f=M<7?-3.9:-1.1;z.position.set(I,-0.15,f),z.rotation.y=M<7?0:Math.PI;let S=J>v(34)-0.2;h7(z,J,S?"face":M===9&&J>N0(31,/^unmutes/i)?"point":"down",0,0,0.01),z.userData.legs.forEach((h)=>h.rotation.x=-1.4)}),q[2]=i0(0,2,-2.5),H.position.set(j(-2,2,U),j(8,7,U),9),Y.set(0,1.4,-2.5),H.fov=44;break}case"closet":case"cloud":case"xp":{this.closet.visible=!0,this.fan.rotation.z=-J*14,this.plantGuy.visible=!0,this.plantGuy.position.set(2.2,0,-1.8),this.plantGuy.rotation.y=-0.4;let B=$==="cloud"&&J>N0(47,/^laughed/i)-0.2;if(h7(this.plantGuy,J,B?"face":"down",0,0,B?0.12:0.02),R(-1.5,-0.6,$==="cloud"?"up":"point"),this.lead.rotation.y=0.5,$==="cloud")this.cloud.visible=!0,this.cloud.position.set(0,j(16,10.5,G9(X0(J,Z,Z+1.5))),-2.5),H.position.set(j(-3,-2,U),2,9),Y.set(0,j(3,7,U),-2.5),H.fov=52;else if($==="xp"){this.agents[2].visible=!0,this.agents[2].position.set(j(-9,-0.5,G9(X0(J,Z,Z+1.6))),0,-1.2),h7(this.agents[2],J,"jazz",0,0,0.05);let z=_9(N0(50,/^windows/i)-0.5,N0(50,/^windows/i)+0.4,J);H.position.set(j(-1,1.4,z),j(3,2,z),j(7,-2.2,z)),Y.set(j(0,1.4,z),j(2.2,1.88,z),j(-3,-4,z)),H.fov=j(46,30,z)}else H.position.set(j(2,0.5,U),2.6,j(8,6.5,U)),Y.set(-0.4,2.4,-4),H.fov=44;q[2]=i0(0,1.8,-4);break}case"truths":case"swamp":case"raci":case"pilot":case"oil":{if(this.cratesUpTo(J,9,!0),R(0,2.2,$==="oil"?"out":$==="pilot"?"point":"shrug"),q[2]=i0(0,1.6,2.2),$==="truths"){let B=Math.floor((J-Z)*3)%9;q[0]=this.crates[B].position.clone().setY(1),H.position.set(j(-6,6,U),4,16),Y.set(0,1.5,-3)}else if($==="swamp"){this.swamp.visible=!0,this.tomb.visible=J>N0(52,/^crm/i)-0.4,this.tomb.position.set(3,j(-2.4,0,T9(X0(J,N0(52,/^crm/i)-0.4,N0(52,/^crm/i)+0.3))),0);for(let B of this.crates)B.position.y=-0.4+Math.sin(J*2+B.position.x)*0.08;this.wash.color.setHex(12120256),H.position.set(4,3,9),Y.set(2,1.2,-1)}else if($==="raci")A(0,-1,"down"),H.position.set(0,3,15),Y.set(0,2.5,-1);else if($==="pilot")this.planes.forEach((B,z)=>{B.visible=!0;let M=(J-Z)*0.35;if(B.position.set(Math.sin(M*2.4)*6,5+Math.sin(M*3.1)*1.2,-1+Math.cos(M*2.4)*2.5),B.rotation.set(0,Math.atan2(Math.cos(M*2.4)*2.4*6,-Math.sin(M*2.4)*2.4*2.5)+Math.PI/2,Math.sin(M*4)*0.3),z===1)B.position.add(i0(0,0.05,0))}),q[1]=this.planes[0].position.clone(),H.position.set(0,4,13),Y.set(0,4.4,-1);else{this.deck.visible=!0;let B=J<N0(56,/^\W*tears/i)-0.1?"pilot":J<v(57)-0.1?"tears":"oil";this.deck.material.map=this.decks[B],this.deck.material.emissiveMap=this.decks[B],this.deck.material.needsUpdate=!0,this.barrels.visible=B==="oil",this.vendorGuy.visible=!0,this.vendorGuy.position.set(-4,0,0.5),h7(this.vendorGuy,J,B==="tears"?"face":"jazz",0,0,0.06),q[1]=i0(2.5,4,-6.5),H.position.set(j(-1,1,U),3.6,15),Y.set(1,3.4,-3)}break}case"stan":{this.cratesUpTo(J,9,!0),this.stanSign.visible=!0,this.stanSign.position.set(-4,2.4,0),R(-1.2,1.5,"shrug"),this.lead.rotation.y=-0.6,q[2]=i0(-4,0.5,0),H.position.set(-1,2.6,10),Y.set(-1.5,1.8,0),H.fov=40;break}case"call":{this.meeting.visible=!0,this.clockHand.rotation.z=-W*3,R(0,0.6,"face",0.01),q[2]=i0(0,1.4,0.6),H.position.set(0,j(9,8,U),j(14,12,U)),Y.set(0,1,-1.5);break}case"agents":{this.agents.forEach((B,z)=>{B.visible=!0,B.position.set(j(-14,-4+z*4,G9(X0(J,Z+z*0.3,Z+1.8+z*0.3))),0,-1);let M=L(z);h7(B,J,"jazz",M.amount*0.6,M.leg,0.03)}),A(0,-4.5,"jazz"),R(0,2.4,"out"),q[0]=i0(-4,1.6,-1),q[1]=i0(4,1.6,-1),q[2]=i0(0,1.6,2.4),H.position.set(j(-5,5,U),3.6,15),Y.set(0,2.4,-1.5);break}case"lock":{this.padlock.visible=!0,this.padlock.position.set(0,j(14,2.2,T9(X0(J,Z,Z+0.7))),-1),this.padlock.rotation.z=Math.sin(J*6)*0.04,this.agents.forEach((B,z)=>{B.visible=!0,B.position.set(-4+z*4,0,0.8),h7(B,J,"shrug",0,0,0.03)}),q[2]=i0(0,2.2,-1),H.position.set(0,2.8,12),Y.set(0,2.6,-1);break}case"confluence":{this.cratesUpTo(J,9,!0),this.door.visible=!0,this.door.position.set(0,0,-1),R(-2.2,1.4,J>N0(72,/^direct/i)?"shrug":"point"),this.lead.rotation.y=0.5,q[2]=i0(0,2.4,-1),H.position.set(j(2,1,U),3.2,j(11,9,U)),Y.set(0,2.8,-1);break}case"github":{this.cratesUpTo(J,9,!0),this.github.visible=!0,this.github.position.set(0,0,0),R(-2.6,1.6,"point"),this.lead.rotation.y=0.7,q[2]=i0(0,0.6,0),H.position.set(1.2,2.6,7.5),Y.set(0,1.4,0),H.fov=40;break}case"curtaincall":case"end":{A(0,-1.5,"down"),this.line.forEach((B)=>{B.rotation.x=_9(v(79),v(79)+1,J)*0.35*(1-_9(v(80),v(80)+1,J))}),R(0,3,J>v(82)?"face":"down",0.02),q[2]=i0(0,1.6,3),H.position.set(0,j(4.5,3,U),j(22,15,U)),Y.set(0,3,2);break}}if($!=="curtaincall"&&$!=="end")for(let B of this.line)B.rotation.x=0;if($!=="swamp"){this.wash.color.setHex(16771272);for(let B of this.crates)if(B.visible)B.position.y=Math.max(0,B.position.y)}this.spots.forEach((B,z)=>{let M=q[z];if(B.light.intensity=M?O?110:75:0,B.beam.visible=!!M,!M)return;B.light.target.position.copy(M),B.light.target.updateMatrixWorld();let I=B.light.position,f=M.clone().sub(I),S=f.length(),h=Math.tan(B.light.angle)*S;B.beam.position.copy(I),B.beam.quaternion.setFromUnitVectors(i0(0,-1,0),f.normalize()),B.beam.scale.set(h,S,h),B.beam.material.opacity=O?0.045:0.025}),this.bloom.strength=0.3+G*0.15,H.aspect=1.7777777777777777,H.updateProjectionMatrix(),H.lookAt(Y)}cratesUpTo(J,Q,$,Z=13){this.crates.slice(0,Q).forEach((K,U)=>{K.visible=!0;let W=K.userData.home;if($){K.position.copy(W);return}let H=oU[U],Y=U<4?Z:Z+1,G=N0(Y,H.word)-0.25;K.visible=J>=G-0.6,K.position.set(W.x,W.y+j(14,0,T9(X0(J,G-0.6,G))),W.z)})}lastDropped(J,Q){let $=null;return oU.forEach((Z,K)=>{if(J>=N0(K<4?Q:Q+1,Z.word)-0.25)$=this.crates[K].position}),$}confettiAt(J,Q){this.confetti.visible=!0;for(let $=0;$<400;$++){let Z=J-Q-M0($)*0.6;b7.position.set(-12+M0($+1)*24,14-Math.max(0,Z)*(1.4+M0($+2))+Math.sin(J*3+$)*0.2,-5+M0($+3)*9),b7.rotation.set(J*3+$,J*2+$*0.3,0),b7.scale.setScalar(Z>0?1:0.001),b7.updateMatrix(),this.confetti.setMatrixAt($,b7.matrix)}this.confetti.instanceMatrix.needsUpdate=!0}render(){this.composer.render()}}function Y1(J){for(let Q of U7){if(Q.words[0].s>J+0.5)break;for(let $ of Q.words)if($.backing&&/nobody|knows/i.test($.w)&&J>=$.s-0.1&&J<=$.e+0.6)return 1}return 0}var G1=/^(data|everywhere|everywhere\.|nobody|knows|kidding|xp|wreck|swamp|deceased|tears|scary|never|mute|wrong)$/,X1=/^(ai|databricks|dataiku|sap|s3|redshift|azure|servicenow|confluence|github|cloud|agent|agents|autonomous|crm|lake)$/,N1=/^(kevin|denise|gary|stan|stan's|jess|ticket|tickets|meeting|calendar|slack|plant|bandwidth|raci|pilot|fourteen|nine|three|q3|vendor|cio|oil|follow-up|recurring)$/,o8=(J,Q,$="")=>`<div class="tile ${$}" data-at="${Q}"><b>${J.replace(/[^A-Z?]/g,"").slice(0,2)||"?"}</b><span>${J}</span><i>${$.includes("live")?"\uD83C\uDF99":"\uD83D\uDD07"}</i></div>`,D5={title:"Data Here, Data There",fonts:['400 100px "Limelight"','400 60px "DM Serif Display"','400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
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
    ${["the RACI","the council","the plan","the data"].map((J,Q)=>`<tr data-at="L53+${(Q*0.5).toFixed(1)}"><td>${J}</td>${Q===3?'<td colspan="4" class="stan" data-at="W54:ask">ask Stan</td>':"<td>✓</td><td>✓</td><td>✓</td><td>✓</td>"}</tr>`).join("")}</table>
    <div class="row muted" data-at="W54:who's">who's Stan?</div></div>
  <div class="ov call" data-show="L59-0.2|L66-0.4"><div class="bar">AI Readiness Sync · 14 participants · <span class="red">recording</span></div>
    <div class="grid">
      ${o8("Chris (presenting)","L59","live")}${o8("Denise","L59+0.2")}${o8("Platform team","L59+0.4")}
      ${o8("Gary · away","L59+0.6")}${o8("Databricks team","W61:databricks","live")}${o8("Dataiku team","W61:dataiku")}
      ${o8("SAP team · leaving","L62","live")}${o8("Kevin (2003)","L63")}${o8("Stan?","L64")}
    </div>
    <div class="share" data-at="L59">\uD83D\uDDA5 Can everyone see my screen? <b data-at="L60">You are muted</b></div></div>
  <div class="ov stamp big" data-show="W69:kidding|L70-0.1" data-at="W69:kidding">ACCESS DENIED</div>
  <div class="ov card invite" data-show="L79|E82"><div class="bar">\uD83D\uDCC5 new event · recurring</div>
    <h3>AI Readiness</h3>
    <div class="row">every week · <b>no end date</b></div>
    <div class="row" data-at="L81">data classification: <b>unknown</b></div>
    <div class="row muted" data-at="L82">owner: does anyone know?</div></div>`,endAt:()=>U7.at(-2).words.at(-1).e+0.2,words:{hot:G1,ice:X1,gold:N1},hide:/^(spoken|sobbing|sob|ensemble|whispering|quietly|way|too|excited)$/,hud:(J,Q)=>{let $=[13,14,15,16,70,71,72].reduce((Z,K)=>Z+U7[K].words.filter((U)=>!U.backing&&U.s<=J&&/^(databricks|dataiku|sap|s3|redshift|azure|servicenow|homegrown|plant|confluence)/i.test(U.w)).length,0);return{left:`data here, data there &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`systems <span class="ice">${Math.min(9,$)}</span> &nbsp;·&nbsp; access <b>${J>N0(69,/^kidding/i)?"denied":"pending"}</b>`}},shots:MZ,shotAt:OZ,world:(J)=>{let Q=new aU(J);return{update:($)=>Q.update($),render:()=>Q.render(),flash:($)=>Q.flash($),fade:($)=>Q.fade($)}}};var E5={"24-the-steep-part":Y5,"04-read-the-diff":Z5,"25-data-here-data-there":D5,"08-explain-the-function":tY};var t8=window.__SONG__,[,,EJ="",cQ=""]=t8?["","",t8.slug,t8.clipId]:location.pathname.split("/"),I5=new URLSearchParams(location.search),q1=I5.has("render");async function F1(){if(t8)return t8;let J=await fetch(`/api/timings/${EJ}/${cQ}`);if(!J.ok)throw Error(`No timings for ${EJ}/${cQ}`);return J.json()}var L5=E5[EJ];if(!L5)throw Error(`No music video for ${EJ}`);var a7=L5;document.title=`${a7.title} · video`;document.querySelector(".stage").setAttribute("data-song",EJ);var{shots:rU,shotAt:D1}=a7,tU=await F1();if(!tU.features)throw Error("No audio features yet; run bun timings");NW(tU.lines,tU.features);var r8=w7();await Promise.all(a7.fonts.map((J)=>document.fonts.load(J)));var x7=(J)=>document.querySelector(J),E1=x7(".stage"),oJ=a7.world(x7("#gl"));function z8(J){let Q=J.trim().match(/^(?:([LEW])(\d+)(?::([\w'-]+))?|([\d.]+))([+-][\d.]+)?$/);if(!Q)throw Error(`Bad time "${J}"`);let[,$,Z,K,U,W]=Q,H=Number(Z);return(U?Number(U):$==="L"?v(H):$==="E"?W9(H):N0(H,new RegExp(`^\\W*${K}`,"i")))+Number(W??0)}var aJ=x7("#overlays");aJ.innerHTML=`${a7.overlays(r8)}
  <div class="ov endcard" data-show="${a7.endAt()}|${r8+5}"><big>${a7.title}</big><span class="by">by Chris Towles</span>made with Claude Code and Opus 5.5<small class="made">${XW(EJ)}</small></div>`;var C5=[...aJ.querySelectorAll("[data-show]")].map((J)=>{let[Q,$]=J.dataset.show.split("|");return{el:J,at:z8(Q),until:z8($)}}),R1=[...aJ.querySelectorAll("[data-at]:not([data-count]):not(.fill):not(.draw):not(.type)")].filter((J)=>!J.hasAttribute("data-show")).map((J)=>({el:J,at:z8(J.dataset.at)})),O1=[...aJ.querySelectorAll(".fill")].map((J)=>({el:J,at:z8(J.dataset.at),until:z8(J.dataset.until)})),M1=[...aJ.querySelectorAll("[data-count]")].map((J)=>{let[Q,$]=J.dataset.count.split(",").map(Number);return{el:J,from:Q,to:$,at:z8(J.dataset.at),until:z8(J.dataset.until),fmt:J.dataset.fmt??""}}),V1=[...aJ.querySelectorAll(".type")].map((J)=>({el:J,text:J.textContent??"",at:z8(J.dataset.at)})),B1=[...aJ.querySelectorAll(".draw")].map((J)=>{let Q=J.getTotalLength();return J.style.strokeDasharray=String(Q),{el:J,len:Q,at:z8(J.dataset.at),until:z8(J.dataset.until)}}),_1=new Set(C5.filter((J)=>J.el.classList.contains("stamp")).map((J)=>J.el));function R5(J,Q){if(J.style.opacity=String(k9(Q*1.6)),J.classList.contains("stamp"))J.style.transform=`rotate(-8deg) scale(${2.4-1.4*T9(Q)})`;else if(J instanceof SVGElement)J.style.transform=`scale(${T9(Q)})`;else J.style.transform=`translateY(${(1-T9(Q))*16}px) scale(${0.85+0.15*T9(Q)})`}function I1(J){for(let Q of C5){let $=L1(J,Q.at,Q.until);if(_1.has(Q.el)){R5(Q.el,X0(J,Q.at,Q.at+0.18)),Q.el.style.opacity=String(Math.min(Number(Q.el.style.opacity),$));continue}Q.el.style.opacity=String($*(Q.el.classList.contains("blink")&&Math.sin(J*14)<-0.3?0.25:1)),Q.el.style.transform=`translateY(${(1-T9(X0(J,Q.at,Q.at+0.35)))*40}px)`}for(let Q of R1)if(R5(Q.el,X0(J,Q.at,Q.at+(Q.el.classList.contains("stamp")?0.18:0.25))),Q.el.classList.contains("btn"))Q.el.classList.toggle("on",J>=Q.at&&(Q.el.classList.contains("pick")||J<Q.at+0.45));for(let Q of O1)Q.el.style.width=`${X0(J,Q.at,Q.until)*100*Number(getComputedStyle(Q.el).getPropertyValue("--max")||1)}%`;for(let Q of M1){let $=Q.from+(Q.to-Q.from)*X0(J,Q.at,Q.until);Q.el.textContent=Q.fmt==="clock"?`${String(Math.floor($)).padStart(2,"0")}:${String(Math.floor($%1*60)).padStart(2,"0")}`:Q.fmt==="months"?`${Math.floor($)} months`:Q.fmt==="secs"?`0:${String(Math.floor($)).padStart(2,"0")}`:Math.floor($).toLocaleString()}for(let Q of V1)Q.el.textContent=Q.text.slice(0,Math.max(0,Math.floor((J-Q.at)*34)));for(let Q of B1)Q.el.style.strokeDashoffset=String(Q.len*(1-X0(J,Q.at,Q.until)))}var L1=(J,Q,$)=>k9((J-Q)/0.2)*k9(($-J)/0.25),{hot:C1,ice:z1,gold:A1}=a7.words,O5=(J)=>J.toLowerCase().replace(/[^a-z0-9'-]/g,""),a8=document.createElement("div");a8.className="cap";x7("#caption").appendChild(a8);var M5=-1,V5=[],B5=(J)=>U7[J].spoken||U7[J].words.some((Q)=>Q.backing&&/^\W*spoken/i.test(Q.w));function P1(J){let Q=-1;for(let K=0;K<U7.length;K++)if(v(K)-0.15<=J)Q=K;let $=Q+1<U7.length?v(Q+1)-0.15:1/0,Z=Q<0?0:Math.min($,W9(Q)+(B5(Q)?2.5:3.5));if(Q<0||J>Z||J>=a7.endAt()){a8.style.opacity="0";return}if(Q!==M5){M5=Q;let K=U7[Q],U=/chorus/i.test(K.section),W=B5(Q);a8.className=`cap ${U&&!W?"chorus":""} ${W?"spoken":""}`,a8.innerHTML="";let H=null;V5=K.words.filter((G)=>!(G.backing&&a7.hide?.test(O5(G.w)))).map((G)=>{let N=document.createElement("span"),D=O5(G.w);if(N.className=`w ${C1.test(D)?"hot":z1.test(D)?"ice":A1.test(D)?"gold":""}`,N.textContent=G.w,G.backing)(H??=a8.appendChild(Object.assign(document.createElement("div"),{className:"backing"}))).appendChild(N);else a8.appendChild(N);return{el:N,s:G.s}});let Y=K.words.length;a8.style.fontSize=W?"68px":U?"112px":`${Y>14?62:Y>10?76:92}px`}a8.style.opacity=String(1-X0(J,Z-0.15,Z));for(let K of V5){let U=X0(J,K.s-0.06,K.s+0.1);K.el.style.opacity=String(k9(U*1.8)),K.el.style.transform=`translateY(${(1-T9(U))*0.35}em) scale(${1.25-0.25*T9(U)})`,K.el.style.filter=U<1?`blur(${(1-U)*10}px)`:""}}x7("#hud-title").textContent=a7.title;var w1=x7("#hud-l"),T1=x7("#hud-r"),S1=x7(".progress i"),k1=x7("#flash"),j1=x7("#black"),v1=x7("#hud");function y1(J){let{left:Q,right:$}=a7.hud(J,D1(J));w1.innerHTML=Q,T1.innerHTML=$,S1.style.width=`${(k9(J/r8)*100).toFixed(2)}%`}function _5(J){oJ.update(J),oJ.render(),I1(J),P1(J),y1(J),k1.style.opacity=String(oJ.flash(J)),j1.style.opacity=String(oJ.fade(J)),v1.style.opacity=String(1-oJ.fade(J))}if(q1)x7("#hint").remove(),Object.assign(window,{__renderAt:_5,__end:r8,__shots:rU().map((J)=>({name:J.name,at:J.at,label:J.label,section:J.section})),__ready:!0});else{let J=new Audio(t8?.audio??`/audio/${EJ}/${cQ}.mp3`);J.preload="auto",J.currentTime=Number(I5.get("t")??0);let Q=()=>{let R=Math.min(innerWidth/1920,innerHeight/1080);E1.style.transform=`translate(${(innerWidth-1920*R)/2}px, ${(innerHeight-1080*R)/2}px) scale(${R})`};window.addEventListener("resize",Q),Q();let $=x7("#hint"),Z=(R)=>{J.currentTime=k9(R,0,r8-0.05)},K=()=>{if($.remove(),J.paused)J.play();else J.pause()},U=(R)=>`${Math.floor(R/60)}:${String(Math.floor(R%60)).padStart(2,"0")}`,W=rU().filter((R,_,B)=>B.findIndex((z)=>z.section===R.section&&Math.abs(z.at-R.at)<30)===_&&(_===0||B[_-1].section!==R.section)),H=document.createElement("div"),Y=parent!==window&&!t8;H.className=Y?"player slim":"player",H.innerHTML=`<div class="pl-row"><button class="pl-play">▶</button><span class="pl-time">0:00</span>
    <input class="pl-seek" type="range" min="0" max="${r8}" step="0.05" value="0" aria-label="Seek">
    <span class="pl-time">${U(r8)}</span>
    <button class="pl-mute" title="Mute (M)" aria-label="Mute">\uD83D\uDD0A</button><input class="pl-vol" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume">${t8?"":`<a href="/song/${EJ}/take/${cQ}" target="_top"><button>lyrics</button></a>`}
    <button class="pl-hide" title="Hide controls (H)" aria-label="Hide controls">▾</button></div>
    <div class="pl-chips">${W.map((R)=>`<button data-t="${Math.max(0,R.at-0.3)}">${R.section}</button>`).join("")}</div>`;let G=Object.assign(document.createElement("button"),{className:"pl-show",textContent:"▴",title:"Show controls (H)"});G.setAttribute("aria-label","Show controls"),document.body.append(H,G);let N=(R)=>{H.hidden=R,G.hidden=!R;try{localStorage.setItem("player-collapsed",R?"1":"")}catch{}},D=!1;try{D=localStorage.getItem("player-collapsed")==="1"}catch{}N(D),H.querySelector(".pl-hide").onclick=()=>N(!0),G.onclick=(R)=>{R.stopPropagation(),N(!1)};let X=H.querySelector(".pl-play"),F=H.querySelector(".pl-seek"),O=H.querySelector(".pl-time");X.onclick=K;let V=H.querySelector(".pl-vol"),q=H.querySelector(".pl-mute"),E=(R,_=J.muted)=>{J.volume=k9(R),J.muted=_,V.value=String(_?0:J.volume),q.textContent=_||J.volume===0?"\uD83D\uDD07":J.volume<0.5?"\uD83D\uDD09":"\uD83D\uDD0A";try{localStorage.setItem("player-volume",JSON.stringify({v:J.volume,muted:_}))}catch{}},L={v:1,muted:!1};try{L={...L,...JSON.parse(localStorage.getItem("player-volume")??"{}")}}catch{}if(E(L.v,L.muted),V.oninput=()=>E(Number(V.value),!1),q.onclick=()=>E(J.volume||1,!J.muted),F.oninput=()=>{$.remove(),Z(Number(F.value))},H.querySelectorAll("[data-t]").forEach((R)=>R.onclick=()=>{if($.remove(),Z(Number(R.dataset.t)),J.paused)J.play()}),H.addEventListener("click",(R)=>R.stopPropagation()),window.addEventListener("click",K),window.addEventListener("keydown",(R)=>{if(R.code==="Space")R.preventDefault(),K();if(R.code==="ArrowRight")Z(J.currentTime+5);if(R.code==="ArrowLeft")Z(J.currentTime-5);if(R.code==="KeyH")N(!H.hidden);if(R.code==="KeyM")E(J.volume||1,!J.muted);if(R.code==="ArrowUp")R.preventDefault(),E(J.volume+0.1,!1);if(R.code==="ArrowDown")R.preventDefault(),E(J.volume-0.1,!1)}),parent!==window&&!t8){let R=rU(),_=R.map((M,I)=>({key:`${M.name}@${M.at.toFixed(1)}`,name:M.name,label:M.label,section:M.section,at:Math.max(0,M.at),end:R[I+1]?.at??r8,thumb:""})),B=(M)=>parent.postMessage({from:"video",clipId:cQ,...M},location.origin);B({type:"shots",shots:_}),setTimeout(()=>{let M=x7("#gl"),I=Object.assign(document.createElement("canvas"),{width:384,height:216}),f=I.getContext("2d");for(let S of _)oJ.update((S.at+Math.min(S.end,S.at+6))/2),oJ.render(),f.drawImage(M,0,0,384,216),S.thumb=I.toDataURL("image/jpeg",0.7);B({type:"shots",shots:_})},300);let z=-1;setInterval(()=>{let M=J.currentTime;if(M!==z)B({type:"time",t:z=M})},250),window.addEventListener("message",(M)=>{if(M.origin!==location.origin||M.data?.type!=="seek")return;if($.remove(),Z(Number(M.data.t)),J.paused)J.play()})}let A=()=>{let R=J.ended?r8:J.currentTime;_5(R),X.textContent=J.paused?"▶":"❚❚",F.value=String(R),O.textContent=U(R),requestAnimationFrame(A)};A()}
