var GY={"24-the-steep-part":"2026-10-18","04-read-the-diff":"2026-10-18","25-data-here-data-there":"2026-10-18","02-never-again":"2026-10-18"},m1=Object.keys(GY),NY=(J)=>{let Q=GY[J];return Q?new Date(`${Q}T12:00:00Z`).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}):""};var Y7=[],GJ={fps:30,duration:0,rms:[0],bass:[0],bpm:120,beatOffset:0};function XY(J,Q){Y7=J,GJ=Q}var I7=()=>GJ.duration,T=(J)=>Y7[Math.min(J,Y7.length-1)].words[0].s,R9=(J)=>Y7[J].words.at(-1).e,H0=(J,Q)=>(Y7[J].words.find(($)=>Q.test($.w))??Y7[J].words[0]).s,$7=(J,Q=0,$=1)=>Math.min($,Math.max(Q,J)),j=(J,Q,$)=>J+(Q-J)*$,P9=(J,Q,$)=>{let Z=$7(($-J)/(Q-J));return Z*Z*(3-2*Z)},G9=(J)=>1-Math.pow(1-$7(J),3),T8=(J)=>Math.pow($7(J),3),h9=(J)=>{J=$7(J);let Q=1.9;return 1+(Q+1)*Math.pow(J-1,3)+Q*Math.pow(J-1,2)};var G0=(J,Q,$)=>$7((J-Q)/($-Q)),v5=(J)=>$7(Math.floor(J*GJ.fps),0,GJ.rms.length-1);var DY=(J)=>{let Q=v5(J),$=GJ.bass,Z=(K)=>$[Math.max(0,K)]??0;return(Z(Q)*2+Z(Q-1)+Z(Q-2))/4},S8=()=>60/GJ.bpm,a7=(J)=>{let Q=S8(),$=((J-GJ.beatOffset)%Q+Q)%Q;return Math.exp(-$*9)},tJ=(J)=>Math.max(0,Math.floor((J-GJ.beatOffset)/S8())),z0=(J)=>{let Q=Math.sin(J*127.1+311.7)*43758.5453;return Q-Math.floor(Q)};var rY="186";var tY=0,$K=1,eY=2;var HQ=1,_6=2,B6=3,I6=0,N7=1,o9=2,j7=0,GQ=1,Z7=2,ZK=3,KK=4,JW=5;var C6=100,QW=101,$W=102,ZW=103,KW=104,UW=200,YW=201,WW=202,HW=203,GW=204,NW=205,XW=206,DW=207,qW=208,FW=209,EW=210,OW=211,RW=212,MW=213,VW=214,_W=0,BW=1,IW=2,UK=3,CW=4,zW=5,AW=6,LW=7,PW=0,wW=1,TW=2,J8=0,NQ=1,XQ=2,DQ=3,g8=4,qQ=5,FQ=6,EQ=7;var z6=301,wJ=302,f$=303,b$=304,OQ=306,EJ=1000,h$=1001,SW=1002,u7=1003,kW=1004;var RQ=1005;var v7=1006,x$=1007;var TJ=1008;var Q8=1009,jW=1010,vW=1011,MQ=1012,YK=1013,OJ=1014,p8=1015,F7=1016,WK=1017,HK=1018,A6=1020,yW=35902,fW=35899,bW=1021,hW=1022,M8=1023,SJ=1026,kJ=1027,xW=1028,GK=1029,jJ=1030,NK=1031;var XK=1033,g$=33776,p$=33777,m$=33778,u$=33779,DK=35840,qK=35841,FK=35842,EK=35843,OK=36196,RK=37492,MK=37496,VK=37488,_K=37489,d$=37490,BK=37491,IK=37808,CK=37809,zK=37810,AK=37811,LK=37812,PK=37813,wK=37814,TK=37815,SK=37816,kK=37817,jK=37818,vK=37819,yK=37820,fK=37821,bK=36492,hK=36494,xK=36495,gK=36283,pK=36284,l$=36285,mK=36286;var uK=3201;var dK=0,gW=1,vJ="",A7="srgb",lK="srgb-linear",cK="linear",p9="srgb";var pW=512,mW=513,uW=514,c$=515,dW=516,lW=517,n$=518,cW=519;var nK="300 es",sK=2000;function y5(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function f5(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function QQ(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function nW(){let J=QQ("canvas");return J.style.display="block",J}var qY={},M6=null;function $Q(...J){let Q="THREE."+J.shift();if(M6)M6("log",Q,...J);else console.log(Q,...J)}function sW(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function e0(...J){J=sW(J);let Q="THREE."+J.shift();if(M6)M6("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function Z9(...J){J=sW(J);let Q="THREE."+J.shift();if(M6)M6("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function LJ(...J){let Q=J.join(" ");if(Q in qY)return;qY[Q]=!0,e0(...J)}function iW(J,Q,$){return new Promise(function(Z,K){function U(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:K();break;case J.TIMEOUT_EXPIRED:setTimeout(U,$);break;default:Z()}}setTimeout(U,$)})}var oW={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class m8{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let K=Z.indexOf(Q);if(K!==-1)Z.splice(K,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let K=0,U=Z.length;K<U;K++)Z[K].call(this,J);J.target=null}}}var C7=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var T$=Math.PI/180,ZQ=180/Math.PI;function b8(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(C7[J&255]+C7[J>>8&255]+C7[J>>16&255]+C7[J>>24&255]+"-"+C7[Q&255]+C7[Q>>8&255]+"-"+C7[Q>>16&15|64]+C7[Q>>24&255]+"-"+C7[$&63|128]+C7[$>>8&255]+"-"+C7[$>>16&255]+C7[$>>24&255]+C7[Z&255]+C7[Z>>8&255]+C7[Z>>16&255]+C7[Z>>24&255]).toLowerCase()}function V9(J,Q,$){return Math.max(Q,Math.min($,J))}function b5(J,Q){return(J%Q+Q)%Q}function AZ(J,Q,$){return(1-$)*J+$*Q}function O8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:case Uint8ClampedArray:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function d9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class U0{static{U0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=V9(this.x,J.x,Q.x),this.y=V9(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=V9(this.x,J,Q),this.y=V9(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(V9($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(V9($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),K=this.x-J.x,U=this.y-J.y;return this.x=K*$-U*Z+J.x,this.y=K*Z+U*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class u8{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,K,U,Y){let W=$[Z+0],H=$[Z+1],G=$[Z+2],X=$[Z+3],F=K[U+0],N=K[U+1],q=K[U+2],O=K[U+3];if(X!==O||W!==F||H!==N||G!==q){let M=W*F+H*N+G*q+X*O;if(M<0)F=-F,N=-N,q=-q,O=-O,M=-M;let D=1-Y;if(M<0.9995){let E=Math.acos(M),I=Math.sin(E);D=Math.sin(D*E)/I,Y=Math.sin(Y*E)/I,W=W*D+F*Y,H=H*D+N*Y,G=G*D+q*Y,X=X*D+O*Y}else{W=W*D+F*Y,H=H*D+N*Y,G=G*D+q*Y,X=X*D+O*Y;let E=1/Math.sqrt(W*W+H*H+G*G+X*X);W*=E,H*=E,G*=E,X*=E}}J[Q]=W,J[Q+1]=H,J[Q+2]=G,J[Q+3]=X}static multiplyQuaternionsFlat(J,Q,$,Z,K,U){let Y=$[Z],W=$[Z+1],H=$[Z+2],G=$[Z+3],X=K[U],F=K[U+1],N=K[U+2],q=K[U+3];return J[Q]=Y*q+G*X+W*N-H*F,J[Q+1]=W*q+G*F+H*X-Y*N,J[Q+2]=H*q+G*N+Y*F-W*X,J[Q+3]=G*q-Y*X-W*F-H*N,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:K,_order:U}=J,Y=Math.cos,W=Math.sin,H=Y($/2),G=Y(Z/2),X=Y(K/2),F=W($/2),N=W(Z/2),q=W(K/2);switch(U){case"XYZ":this._x=F*G*X+H*N*q,this._y=H*N*X-F*G*q,this._z=H*G*q+F*N*X,this._w=H*G*X-F*N*q;break;case"YXZ":this._x=F*G*X+H*N*q,this._y=H*N*X-F*G*q,this._z=H*G*q-F*N*X,this._w=H*G*X+F*N*q;break;case"ZXY":this._x=F*G*X-H*N*q,this._y=H*N*X+F*G*q,this._z=H*G*q+F*N*X,this._w=H*G*X-F*N*q;break;case"ZYX":this._x=F*G*X-H*N*q,this._y=H*N*X+F*G*q,this._z=H*G*q-F*N*X,this._w=H*G*X+F*N*q;break;case"YZX":this._x=F*G*X+H*N*q,this._y=H*N*X+F*G*q,this._z=H*G*q-F*N*X,this._w=H*G*X-F*N*q;break;case"XZY":this._x=F*G*X-H*N*q,this._y=H*N*X-F*G*q,this._z=H*G*q+F*N*X,this._w=H*G*X+F*N*q;break;default:e0("Quaternion: .setFromEuler() encountered an unknown order: "+U)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],K=Q[8],U=Q[1],Y=Q[5],W=Q[9],H=Q[2],G=Q[6],X=Q[10],F=$+Y+X;if(F>0){let N=0.5/Math.sqrt(F+1);this._w=0.25/N,this._x=(G-W)*N,this._y=(K-H)*N,this._z=(U-Z)*N}else if($>Y&&$>X){let N=2*Math.sqrt(1+$-Y-X);this._w=(G-W)/N,this._x=0.25*N,this._y=(Z+U)/N,this._z=(K+H)/N}else if(Y>X){let N=2*Math.sqrt(1+Y-$-X);this._w=(K-H)/N,this._x=(Z+U)/N,this._y=0.25*N,this._z=(W+G)/N}else{let N=2*Math.sqrt(1+X-$-Y);this._w=(U-Z)/N,this._x=(K+H)/N,this._y=(W+G)/N,this._z=0.25*N}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(V9(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:K,_w:U}=J,Y=Q._x,W=Q._y,H=Q._z,G=Q._w;return this._x=$*G+U*Y+Z*H-K*W,this._y=Z*G+U*W+K*Y-$*H,this._z=K*G+U*H+$*W-Z*Y,this._w=U*G-$*Y-Z*W-K*H,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:K,_w:U}=J,Y=this.dot(J);if(Y<0)$=-$,Z=-Z,K=-K,U=-U,Y=-Y;let W=1-Q;if(Y<0.9995){let H=Math.acos(Y),G=Math.sin(H);W=Math.sin(W*H)/G,Q=Math.sin(Q*H)/G,this._x=this._x*W+$*Q,this._y=this._y*W+Z*Q,this._z=this._z*W+K*Q,this._w=this._w*W+U*Q,this._onChangeCallback()}else this._x=this._x*W+$*Q,this._y=this._y*W+Z*Q,this._z=this._z*W+K*Q,this._w=this._w*W+U*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),K=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),K*Math.sin(Q),K*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class S{static{S.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(FY.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(FY.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements;return this.x=K[0]*Q+K[3]*$+K[6]*Z,this.y=K[1]*Q+K[4]*$+K[7]*Z,this.z=K[2]*Q+K[5]*$+K[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements,U=1/(K[3]*Q+K[7]*$+K[11]*Z+K[15]);return this.x=(K[0]*Q+K[4]*$+K[8]*Z+K[12])*U,this.y=(K[1]*Q+K[5]*$+K[9]*Z+K[13])*U,this.z=(K[2]*Q+K[6]*$+K[10]*Z+K[14])*U,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,K=J.x,U=J.y,Y=J.z,W=J.w,H=2*(U*Z-Y*$),G=2*(Y*Q-K*Z),X=2*(K*$-U*Q);return this.x=Q+W*H+U*X-Y*G,this.y=$+W*G+Y*H-K*X,this.z=Z+W*X+K*G-U*H,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z,this.y=K[1]*Q+K[5]*$+K[9]*Z,this.z=K[2]*Q+K[6]*$+K[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=V9(this.x,J.x,Q.x),this.y=V9(this.y,J.y,Q.y),this.z=V9(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=V9(this.x,J,Q),this.y=V9(this.y,J,Q),this.z=V9(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(V9($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:K}=J,U=Q.x,Y=Q.y,W=Q.z;return this.x=Z*W-K*Y,this.y=K*U-$*W,this.z=$*Y-Z*U,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return LZ.copy(this).projectOnVector(J),this.sub(LZ)}reflect(J){return this.sub(LZ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(V9($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var LZ=new S,FY=new u8;class U9{static{U9.prototype.isMatrix3=!0}constructor(J,Q,$,Z,K,U,Y,W,H){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,K,U,Y,W,H)}set(J,Q,$,Z,K,U,Y,W,H){let G=this.elements;return G[0]=J,G[1]=Z,G[2]=Y,G[3]=Q,G[4]=K,G[5]=W,G[6]=$,G[7]=U,G[8]=H,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,K=this.elements,U=$[0],Y=$[3],W=$[6],H=$[1],G=$[4],X=$[7],F=$[2],N=$[5],q=$[8],O=Z[0],M=Z[3],D=Z[6],E=Z[1],I=Z[4],L=Z[7],R=Z[2],B=Z[5],_=Z[8];return K[0]=U*O+Y*E+W*R,K[3]=U*M+Y*I+W*B,K[6]=U*D+Y*L+W*_,K[1]=H*O+G*E+X*R,K[4]=H*M+G*I+X*B,K[7]=H*D+G*L+X*_,K[2]=F*O+N*E+q*R,K[5]=F*M+N*I+q*B,K[8]=F*D+N*L+q*_,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],U=J[4],Y=J[5],W=J[6],H=J[7],G=J[8];return Q*U*G-Q*Y*H-$*K*G+$*Y*W+Z*K*H-Z*U*W}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],U=J[4],Y=J[5],W=J[6],H=J[7],G=J[8],X=G*U-Y*H,F=Y*W-G*K,N=H*K-U*W,q=Q*X+$*F+Z*N;if(q===0)return this.set(0,0,0,0,0,0,0,0,0);let O=1/q;return J[0]=X*O,J[1]=(Z*H-G*$)*O,J[2]=(Y*$-Z*U)*O,J[3]=F*O,J[4]=(G*Q-Z*W)*O,J[5]=(Z*K-Y*Q)*O,J[6]=N*O,J[7]=($*W-H*Q)*O,J[8]=(U*Q-$*K)*O,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,K,U,Y){let W=Math.cos(K),H=Math.sin(K);return this.set($*W,$*H,-$*(W*U+H*Y)+U+J,-Z*H,Z*W,-Z*(-H*U+W*Y)+Y+Q,0,0,1),this}scale(J,Q){return LJ("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(PZ.makeScale(J,Q)),this}rotate(J){return LJ("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(PZ.makeRotation(-J)),this}translate(J,Q){return LJ("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(PZ.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var PZ=new U9,EY=new U9().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),OY=new U9().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function h5(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(K,U,Y){if(this.enabled===!1||U===Y||!U||!Y)return K;if(this.spaces[U].transfer==="srgb")K.r=h8(K.r),K.g=h8(K.g),K.b=h8(K.b);if(this.spaces[U].primaries!==this.spaces[Y].primaries)K.applyMatrix3(this.spaces[U].toXYZ),K.applyMatrix3(this.spaces[Y].fromXYZ);if(this.spaces[Y].transfer==="srgb")K.r=R6(K.r),K.g=R6(K.g),K.b=R6(K.b);return K},workingToColorSpace:function(K,U){return this.convert(K,this.workingColorSpace,U)},colorSpaceToWorking:function(K,U){return this.convert(K,U,this.workingColorSpace)},getPrimaries:function(K){return this.spaces[K].primaries},getTransfer:function(K){if(K==="")return"linear";return this.spaces[K].transfer},getToneMappingMode:function(K){return this.spaces[K].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(K,U=this.workingColorSpace){return K.fromArray(this.spaces[U].luminanceCoefficients)},define:function(K){Object.assign(this.spaces,K)},_getMatrix:function(K,U,Y){return K.copy(this.spaces[U].toXYZ).multiply(this.spaces[Y].fromXYZ)},_getDrawingBufferColorSpace:function(K){return this.spaces[K].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(K=this.workingColorSpace){return this.spaces[K].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(K,U){return LJ("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(K,U)},toWorkingColorSpace:function(K,U){return LJ("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(K,U)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:EY,fromXYZ:OY,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:EY,fromXYZ:OY,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var M9=h5();function h8(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function R6(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var eJ;class iK{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(eJ===void 0)eJ=QQ("canvas");eJ.width=J.width,eJ.height=J.height;let Z=eJ.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=eJ}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=QQ("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),K=Z.data;for(let U=0;U<K.length;U++)K[U]=h8(K[U]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(h8(Q[$]/255)*255);else Q[$]=h8(Q[$]);return{data:Q,width:J.width,height:J.height}}else return e0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var x5=0;class VQ{constructor(J=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:x5++}),this.uuid=b8(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let K;if(Array.isArray(Z)){K=[];for(let U=0,Y=Z.length;U<Y;U++)if(Z[U].isDataTexture)K.push(wZ(Z[U].image));else K.push(wZ(Z[U]))}else K=wZ(Z);$.url=K}if(!Q)J.images[this.uuid]=$;return $}}function wZ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return iK.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return e0("Texture: Unable to serialize Texture."),{}}var g5=0,TZ=new S;class V7 extends m8{constructor(J=V7.DEFAULT_IMAGE,Q=V7.DEFAULT_MAPPING,$=1001,Z=1001,K=1006,U=1008,Y=1023,W=1009,H=V7.DEFAULT_ANISOTROPY,G=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:g5++}),this.uuid=b8(),this.name="",this.source=new VQ(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=K,this.minFilter=U,this.anisotropy=H,this.format=Y,this.internalFormat=null,this.type=W,this.offset=new U0(0,0),this.repeat=new U0(1,1),this.center=new U0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new U9,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=G,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(TZ).x}get height(){return this.source.getSize(TZ).y}get depth(){return this.source.getSize(TZ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){e0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){e0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}V7.DEFAULT_IMAGE=null;V7.DEFAULT_MAPPING=300;V7.DEFAULT_ANISOTROPY=1;class r9{static{r9.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,K=this.w,U=J.elements;return this.x=U[0]*Q+U[4]*$+U[8]*Z+U[12]*K,this.y=U[1]*Q+U[5]*$+U[9]*Z+U[13]*K,this.z=U[2]*Q+U[6]*$+U[10]*Z+U[14]*K,this.w=U[3]*Q+U[7]*$+U[11]*Z+U[15]*K,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,K,U=0.01,Y=0.1,W=J.elements,H=W[0],G=W[4],X=W[8],F=W[1],N=W[5],q=W[9],O=W[2],M=W[6],D=W[10];if(Math.abs(G-F)<0.01&&Math.abs(X-O)<0.01&&Math.abs(q-M)<0.01){if(Math.abs(G+F)<0.1&&Math.abs(X+O)<0.1&&Math.abs(q+M)<0.1&&Math.abs(H+N+D-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let I=(H+1)/2,L=(N+1)/2,R=(D+1)/2,B=(G+F)/4,_=(X+O)/4,z=(q+M)/4;if(I>L&&I>R)if(I<0.01)$=0,Z=0.707106781,K=0.707106781;else $=Math.sqrt(I),Z=B/$,K=_/$;else if(L>R)if(L<0.01)$=0.707106781,Z=0,K=0.707106781;else Z=Math.sqrt(L),$=B/Z,K=z/Z;else if(R<0.01)$=0.707106781,Z=0.707106781,K=0;else K=Math.sqrt(R),$=_/K,Z=z/K;return this.set($,Z,K,Q),this}let E=Math.sqrt((M-q)*(M-q)+(X-O)*(X-O)+(F-G)*(F-G));if(Math.abs(E)<0.001)E=1;return this.x=(M-q)/E,this.y=(X-O)/E,this.z=(F-G)/E,this.w=Math.acos((H+N+D-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=V9(this.x,J.x,Q.x),this.y=V9(this.y,J.y,Q.y),this.z=V9(this.z,J.z,Q.z),this.w=V9(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=V9(this.x,J,Q),this.y=V9(this.y,J,Q),this.z=V9(this.z,J,Q),this.w=V9(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(V9($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class oK extends m8{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new r9(0,0,J,Q),this.scissorTest=!1,this.viewport=new r9(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},K=new V7(Z),U=$.count;for(let Y=0;Y<U;Y++)this.textures[Y]=K.clone(),this.textures[Y].isRenderTargetTexture=!0,this.textures[Y].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveColorBuffer=$.resolveColorBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this.storeMultisampledColorBuffer=$.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=$.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=$.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(J!==null&&J.renderTarget===null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,K=this.textures.length;Z<K;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new VQ(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveColorBuffer=J.resolveColorBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,this.storeMultisampledColorBuffer=J.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=J.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=J.storeMultisampledStencilBuffer,J.depthTexture!==null)if(J.depthTexture.renderTarget===J){let Q=J.depthTexture.clone();Q.renderTarget=null,this.depthTexture=Q}else this.depthTexture=J.depthTexture;return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class W7 extends oK{constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class s$ extends V7{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class aK extends V7{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}}class j9{static{j9.prototype.isMatrix4=!0}constructor(J,Q,$,Z,K,U,Y,W,H,G,X,F,N,q,O,M){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,K,U,Y,W,H,G,X,F,N,q,O,M)}set(J,Q,$,Z,K,U,Y,W,H,G,X,F,N,q,O,M){let D=this.elements;return D[0]=J,D[4]=Q,D[8]=$,D[12]=Z,D[1]=K,D[5]=U,D[9]=Y,D[13]=W,D[2]=H,D[6]=G,D[10]=X,D[14]=F,D[3]=N,D[7]=q,D[11]=O,D[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new j9().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/J6.setFromMatrixColumn(J,0).length(),K=1/J6.setFromMatrixColumn(J,1).length(),U=1/J6.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*K,Q[5]=$[5]*K,Q[6]=$[6]*K,Q[7]=0,Q[8]=$[8]*U,Q[9]=$[9]*U,Q[10]=$[10]*U,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,K=J.z,U=Math.cos($),Y=Math.sin($),W=Math.cos(Z),H=Math.sin(Z),G=Math.cos(K),X=Math.sin(K);if(J.order==="XYZ"){let F=U*G,N=U*X,q=Y*G,O=Y*X;Q[0]=W*G,Q[4]=-W*X,Q[8]=H,Q[1]=N+q*H,Q[5]=F-O*H,Q[9]=-Y*W,Q[2]=O-F*H,Q[6]=q+N*H,Q[10]=U*W}else if(J.order==="YXZ"){let F=W*G,N=W*X,q=H*G,O=H*X;Q[0]=F+O*Y,Q[4]=q*Y-N,Q[8]=U*H,Q[1]=U*X,Q[5]=U*G,Q[9]=-Y,Q[2]=N*Y-q,Q[6]=O+F*Y,Q[10]=U*W}else if(J.order==="ZXY"){let F=W*G,N=W*X,q=H*G,O=H*X;Q[0]=F-O*Y,Q[4]=-U*X,Q[8]=q+N*Y,Q[1]=N+q*Y,Q[5]=U*G,Q[9]=O-F*Y,Q[2]=-U*H,Q[6]=Y,Q[10]=U*W}else if(J.order==="ZYX"){let F=U*G,N=U*X,q=Y*G,O=Y*X;Q[0]=W*G,Q[4]=q*H-N,Q[8]=F*H+O,Q[1]=W*X,Q[5]=O*H+F,Q[9]=N*H-q,Q[2]=-H,Q[6]=Y*W,Q[10]=U*W}else if(J.order==="YZX"){let F=U*W,N=U*H,q=Y*W,O=Y*H;Q[0]=W*G,Q[4]=O-F*X,Q[8]=q*X+N,Q[1]=X,Q[5]=U*G,Q[9]=-Y*G,Q[2]=-H*G,Q[6]=N*X+q,Q[10]=F-O*X}else if(J.order==="XZY"){let F=U*W,N=U*H,q=Y*W,O=Y*H;Q[0]=W*G,Q[4]=-X,Q[8]=H*G,Q[1]=F*X+O,Q[5]=U*G,Q[9]=N*X-q,Q[2]=q*X-N,Q[6]=Y*G,Q[10]=O*X+F}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(p5,J,m5)}lookAt(J,Q,$){let Z=this.elements;if(p7.subVectors(J,Q),p7.lengthSq()===0)p7.z=1;if(p7.normalize(),NJ.crossVectors($,p7),NJ.lengthSq()===0){if(Math.abs($.z)===1)p7.x+=0.0001;else p7.z+=0.0001;p7.normalize(),NJ.crossVectors($,p7)}return NJ.normalize(),rQ.crossVectors(p7,NJ),Z[0]=NJ.x,Z[4]=rQ.x,Z[8]=p7.x,Z[1]=NJ.y,Z[5]=rQ.y,Z[9]=p7.y,Z[2]=NJ.z,Z[6]=rQ.z,Z[10]=p7.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,K=this.elements,U=$[0],Y=$[4],W=$[8],H=$[12],G=$[1],X=$[5],F=$[9],N=$[13],q=$[2],O=$[6],M=$[10],D=$[14],E=$[3],I=$[7],L=$[11],R=$[15],B=Z[0],_=Z[4],z=Z[8],V=Z[12],C=Z[1],f=Z[5],k=Z[9],b=Z[13],e=Z[2],v=Z[6],u=Z[10],Q0=Z[14],l=Z[3],D0=Z[7],t=Z[11],p=Z[15];return K[0]=U*B+Y*C+W*e+H*l,K[4]=U*_+Y*f+W*v+H*D0,K[8]=U*z+Y*k+W*u+H*t,K[12]=U*V+Y*b+W*Q0+H*p,K[1]=G*B+X*C+F*e+N*l,K[5]=G*_+X*f+F*v+N*D0,K[9]=G*z+X*k+F*u+N*t,K[13]=G*V+X*b+F*Q0+N*p,K[2]=q*B+O*C+M*e+D*l,K[6]=q*_+O*f+M*v+D*D0,K[10]=q*z+O*k+M*u+D*t,K[14]=q*V+O*b+M*Q0+D*p,K[3]=E*B+I*C+L*e+R*l,K[7]=E*_+I*f+L*v+R*D0,K[11]=E*z+I*k+L*u+R*t,K[15]=E*V+I*b+L*Q0+R*p,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],K=J[12],U=J[1],Y=J[5],W=J[9],H=J[13],G=J[2],X=J[6],F=J[10],N=J[14],q=J[3],O=J[7],M=J[11],D=J[15],E=W*N-H*F,I=Y*N-H*X,L=Y*F-W*X,R=U*N-H*G,B=U*F-W*G,_=U*X-Y*G;return Q*(O*E-M*I+D*L)-$*(q*E-M*R+D*B)+Z*(q*I-O*R+D*_)-K*(q*L-O*B+M*_)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],K=J[1],U=J[5],Y=J[9],W=J[2],H=J[6],G=J[10];return Q*(U*G-Y*H)-$*(K*G-Y*W)+Z*(K*H-U*W)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],K=J[3],U=J[4],Y=J[5],W=J[6],H=J[7],G=J[8],X=J[9],F=J[10],N=J[11],q=J[12],O=J[13],M=J[14],D=J[15],E=Q*Y-$*U,I=Q*W-Z*U,L=Q*H-K*U,R=$*W-Z*Y,B=$*H-K*Y,_=Z*H-K*W,z=G*O-X*q,V=G*M-F*q,C=G*D-N*q,f=X*M-F*O,k=X*D-N*O,b=F*D-N*M,e=E*b-I*k+L*f+R*C-B*V+_*z;if(e===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let v=1/e;return J[0]=(Y*b-W*k+H*f)*v,J[1]=(Z*k-$*b-K*f)*v,J[2]=(O*_-M*B+D*R)*v,J[3]=(F*B-X*_-N*R)*v,J[4]=(W*C-U*b-H*V)*v,J[5]=(Q*b-Z*C+K*V)*v,J[6]=(M*L-q*_-D*I)*v,J[7]=(G*_-F*L+N*I)*v,J[8]=(U*k-Y*C+H*z)*v,J[9]=($*C-Q*k-K*z)*v,J[10]=(q*B-O*L+D*E)*v,J[11]=(X*L-G*B-N*E)*v,J[12]=(Y*V-U*f-W*z)*v,J[13]=(Q*f-$*V+Z*z)*v,J[14]=(O*I-q*R-M*E)*v,J[15]=(G*R-X*I+F*E)*v,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,K=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=K,Q[1]*=$,Q[5]*=Z,Q[9]*=K,Q[2]*=$,Q[6]*=Z,Q[10]*=K,Q[3]*=$,Q[7]*=Z,Q[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),K=1-$,U=J.x,Y=J.y,W=J.z,H=K*U,G=K*Y;return this.set(H*U+$,H*Y-Z*W,H*W+Z*Y,0,H*Y+Z*W,G*Y+$,G*W-Z*U,0,H*W-Z*Y,G*W+Z*U,K*W*W+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,K,U){return this.set(1,$,K,0,J,1,U,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,K=Q._x,U=Q._y,Y=Q._z,W=Q._w,H=K+K,G=U+U,X=Y+Y,F=K*H,N=K*G,q=K*X,O=U*G,M=U*X,D=Y*X,E=W*H,I=W*G,L=W*X,R=$.x,B=$.y,_=$.z;return Z[0]=(1-(O+D))*R,Z[1]=(N+L)*R,Z[2]=(q-I)*R,Z[3]=0,Z[4]=(N-L)*B,Z[5]=(1-(F+D))*B,Z[6]=(M+E)*B,Z[7]=0,Z[8]=(q+I)*_,Z[9]=(M-E)*_,Z[10]=(1-(F+O))*_,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let K=this.determinantAffine();if(K===0)return $.set(1,1,1),Q.identity(),this;let U=J6.set(Z[0],Z[1],Z[2]).length(),Y=J6.set(Z[4],Z[5],Z[6]).length(),W=J6.set(Z[8],Z[9],Z[10]).length();if(K<0)U=-U;r7.copy(this);let H=1/U,G=1/Y,X=1/W;return r7.elements[0]*=H,r7.elements[1]*=H,r7.elements[2]*=H,r7.elements[4]*=G,r7.elements[5]*=G,r7.elements[6]*=G,r7.elements[8]*=X,r7.elements[9]*=X,r7.elements[10]*=X,Q.setFromRotationMatrix(r7),$.x=U,$.y=Y,$.z=W,this}makePerspective(J,Q,$,Z,K,U,Y=2000,W=!1){let H=this.elements,G=2*K/(Q-J),X=2*K/($-Z),F=(Q+J)/(Q-J),N=($+Z)/($-Z),q,O;if(W)q=K/(U-K),O=U*K/(U-K);else if(Y===2000)q=-(U+K)/(U-K),O=-2*U*K/(U-K);else if(Y===2001)q=-U/(U-K),O=-U*K/(U-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+Y);return H[0]=G,H[4]=0,H[8]=F,H[12]=0,H[1]=0,H[5]=X,H[9]=N,H[13]=0,H[2]=0,H[6]=0,H[10]=q,H[14]=O,H[3]=0,H[7]=0,H[11]=-1,H[15]=0,this}makeOrthographic(J,Q,$,Z,K,U,Y=2000,W=!1){let H=this.elements,G=2/(Q-J),X=2/($-Z),F=-(Q+J)/(Q-J),N=-($+Z)/($-Z),q,O;if(W)q=1/(U-K),O=U/(U-K);else if(Y===2000)q=-2/(U-K),O=-(U+K)/(U-K);else if(Y===2001)q=-1/(U-K),O=-K/(U-K);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+Y);return H[0]=G,H[4]=0,H[8]=0,H[12]=F,H[1]=0,H[5]=X,H[9]=0,H[13]=N,H[2]=0,H[6]=0,H[10]=q,H[14]=O,H[3]=0,H[7]=0,H[11]=0,H[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var J6=new S,r7=new j9,p5=new S(0,0,0),m5=new S(1,1,1),NJ=new S,rQ=new S,p7=new S,RY=new j9,MY=new u8;class x8{constructor(J=0,Q=0,$=0,Z=x8.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,K=Z[0],U=Z[4],Y=Z[8],W=Z[1],H=Z[5],G=Z[9],X=Z[2],F=Z[6],N=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(V9(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-G,N),this._z=Math.atan2(-U,K);else this._x=Math.atan2(F,H),this._z=0;break;case"YXZ":if(this._x=Math.asin(-V9(G,-1,1)),Math.abs(G)<0.9999999)this._y=Math.atan2(Y,N),this._z=Math.atan2(W,H);else this._y=Math.atan2(-X,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(V9(F,-1,1)),Math.abs(F)<0.9999999)this._y=Math.atan2(-X,N),this._z=Math.atan2(-U,H);else this._y=0,this._z=Math.atan2(W,K);break;case"ZYX":if(this._y=Math.asin(-V9(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(F,N),this._z=Math.atan2(W,K);else this._x=0,this._z=Math.atan2(-U,H);break;case"YZX":if(this._z=Math.asin(V9(W,-1,1)),Math.abs(W)<0.9999999)this._x=Math.atan2(-G,H),this._y=Math.atan2(-X,K);else this._x=0,this._y=Math.atan2(Y,N);break;case"XZY":if(this._z=Math.asin(-V9(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(F,H),this._y=Math.atan2(Y,K);else this._x=Math.atan2(-G,N),this._y=0;break;default:e0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return RY.makeRotationFromQuaternion(J),this.setFromRotationMatrix(RY,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return MY.setFromEuler(this),this.setFromQuaternion(MY,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}x8.DEFAULT_ORDER="XYZ";class i${constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var u5=0,VY=new S,Q6=new u8,k8=new j9,tQ=new S,u6=new S,d5=new S,l5=new u8,_Y=new S(1,0,0),BY=new S(0,1,0),IY=new S(0,0,1),CY={type:"added"},c5={type:"removed"},$6={type:"childadded",child:null},SZ={type:"childremoved",child:null};class A9 extends m8{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:u5++}),this.uuid=b8(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=A9.DEFAULT_UP.clone();let J=new S,Q=new x8,$=new u8,Z=new S(1,1,1);function K(){$.setFromEuler(Q,!1)}function U(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(K),$._onChange(U),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new j9},normalMatrix:{value:new U9}}),this.matrix=new j9,this.matrixWorld=new j9,this.matrixAutoUpdate=A9.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=A9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new i$,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return Q6.setFromAxisAngle(J,Q),this.quaternion.multiply(Q6),this}rotateOnWorldAxis(J,Q){return Q6.setFromAxisAngle(J,Q),this.quaternion.premultiply(Q6),this}rotateX(J){return this.rotateOnAxis(_Y,J)}rotateY(J){return this.rotateOnAxis(BY,J)}rotateZ(J){return this.rotateOnAxis(IY,J)}translateOnAxis(J,Q){return VY.copy(J).applyQuaternion(this.quaternion),this.position.add(VY.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(_Y,J)}translateY(J){return this.translateOnAxis(BY,J)}translateZ(J){return this.translateOnAxis(IY,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(k8.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)tQ.copy(J);else tQ.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),u6.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)k8.lookAt(u6,tQ,this.up);else k8.lookAt(tQ,u6,this.up);if(this.quaternion.setFromRotationMatrix(k8),Z)k8.extractRotation(Z.matrixWorld),Q6.setFromRotationMatrix(k8),this.quaternion.premultiply(Q6.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return Z9("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(CY),$6.child=J,this.dispatchEvent($6),$6.child=null;else Z9("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(c5),SZ.child=J,this.dispatchEvent(SZ),SZ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),k8.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),k8.multiply(J.parent.matrixWorld);return J.applyMatrix4(k8),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(CY),$6.child=J,this.dispatchEvent($6),$6.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let U=this.children[$].getObjectByProperty(J,Q);if(U!==void 0)return U}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let K=0,U=Z.length;K<U;K++)Z[K].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(u6,J,d5),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(u6,l5,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,K=this.matrix.elements;K[12]+=Q-K[0]*Q-K[4]*$-K[8]*Z,K[13]+=$-K[1]*Q-K[5]*$-K[9]*Z,K[14]+=Z-K[2]*Q-K[6]*$-K[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let K=this.children;for(let U=0,Y=K.length;U<Y;U++)K[U].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,Z.name=this.name,Z.castShadow=this.castShadow,Z.receiveShadow=this.receiveShadow,Z.visible=this.visible,Z.frustumCulled=this.frustumCulled,Z.renderOrder=this.renderOrder,Z.static=this.static,Z.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((Y)=>({...Y,boundingBox:Y.boundingBox?Y.boundingBox.toJSON():void 0,boundingSphere:Y.boundingSphere?Y.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((Y)=>({...Y})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function K(Y,W){if(Y[W.uuid]===void 0)Y[W.uuid]=W.toJSON(J);return W.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=K(J.geometries,this.geometry);let Y=this.geometry.parameters;if(Y!==void 0&&Y.shapes!==void 0){let W=Y.shapes;if(Array.isArray(W))for(let H=0,G=W.length;H<G;H++){let X=W[H];K(J.shapes,X)}else K(J.shapes,W)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let Y=[];for(let W=0,H=this.material.length;W<H;W++)Y.push(K(J.materials,this.material[W]));Z.material=Y}else Z.material=K(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let Y=0;Y<this.children.length;Y++)Z.children.push(this.children[Y].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let Y=0;Y<this.animations.length;Y++){let W=this.animations[Y];Z.animations.push(K(J.animations,W))}}if(Q){let Y=U(J.geometries),W=U(J.materials),H=U(J.textures),G=U(J.images),X=U(J.shapes),F=U(J.skeletons),N=U(J.animations),q=U(J.nodes);if(Y.length>0)$.geometries=Y;if(W.length>0)$.materials=W;if(H.length>0)$.textures=H;if(G.length>0)$.images=G;if(X.length>0)$.shapes=X;if(F.length>0)$.skeletons=F;if(N.length>0)$.animations=N;if(q.length>0)$.nodes=q}return $.object=Z,$;function U(Y){let W=[];for(let H in Y){let G=Y[H];delete G.metadata,W.push(G)}return W}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}A9.DEFAULT_UP=new S(0,1,0);A9.DEFAULT_MATRIX_AUTO_UPDATE=!0;A9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class R0 extends A9{constructor(){super();this.isGroup=!0,this.type="Group"}}var n5={type:"move"};class _Q{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new R0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new R0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new S,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new S;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new R0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new S,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new S,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,K=null,U=null,Y=this._targetRay,W=this._grip,H=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(H&&J.hand){U=!0;for(let O of J.hand.values()){let M=Q.getJointPose(O,$),D=this._getHandJoint(H,O);if(M!==null)D.matrix.fromArray(M.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=M.radius;D.visible=M!==null}let G=H.joints["index-finger-tip"],X=H.joints["thumb-tip"],F=G.position.distanceTo(X.position),N=0.02,q=0.005;if(H.inputState.pinching&&F>N+q)H.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!H.inputState.pinching&&F<=N-q)H.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(W!==null&&J.gripSpace){if(K=Q.getPose(J.gripSpace,$),K!==null){if(W.matrix.fromArray(K.transform.matrix),W.matrix.decompose(W.position,W.rotation,W.scale),W.matrixWorldNeedsUpdate=!0,K.linearVelocity)W.hasLinearVelocity=!0,W.linearVelocity.copy(K.linearVelocity);else W.hasLinearVelocity=!1;if(K.angularVelocity)W.hasAngularVelocity=!0,W.angularVelocity.copy(K.angularVelocity);else W.hasAngularVelocity=!1;if(W.eventsEnabled)W.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(Y!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&K!==null)Z=K;if(Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;this.dispatchEvent(n5)}}}if(Y!==null)Y.visible=Z!==null;if(W!==null)W.visible=K!==null;if(H!==null)H.visible=U!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new R0;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var aW={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},XJ={h:0,s:0,l:0},eQ={h:0,s:0,l:0};function kZ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class W0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,M9.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=M9.workingColorSpace){return this.r=J,this.g=Q,this.b=$,M9.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=M9.workingColorSpace){if(J=b5(J,1),Q=V9(Q,0,1),$=V9($,0,1),Q===0)this.r=this.g=this.b=$;else{let K=$<=0.5?$*(1+Q):$+Q-$*Q,U=2*$-K;this.r=kZ(U,K,J+0.3333333333333333),this.g=kZ(U,K,J),this.b=kZ(U,K,J-0.3333333333333333)}return M9.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(K){if(K===void 0)return;if(parseFloat(K)<1)e0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,U=Z[1],Y=Z[2];switch(U){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,Q);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,Q);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Y))return $(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,Q);break;default:e0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=Z[1],U=K.length;if(U===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,Q);else if(U===6)return this.setHex(parseInt(K,16),Q);else e0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=aW[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else e0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=h8(J.r),this.g=h8(J.g),this.b=h8(J.b),this}copyLinearToSRGB(J){return this.r=R6(J.r),this.g=R6(J.g),this.b=R6(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return M9.workingToColorSpace(z7.copy(this),J),Math.round(V9(z7.r*255,0,255))*65536+Math.round(V9(z7.g*255,0,255))*256+Math.round(V9(z7.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=M9.workingColorSpace){M9.workingToColorSpace(z7.copy(this),Q);let{r:$,g:Z,b:K}=z7,U=Math.max($,Z,K),Y=Math.min($,Z,K),W,H,G=(Y+U)/2;if(Y===U)W=0,H=0;else{let X=U-Y;switch(H=G<=0.5?X/(U+Y):X/(2-U-Y),U){case $:W=(Z-K)/X+(Z<K?6:0);break;case Z:W=(K-$)/X+2;break;case K:W=($-Z)/X+4;break}W/=6}return J.h=W,J.s=H,J.l=G,J}getRGB(J,Q=M9.workingColorSpace){return M9.workingToColorSpace(z7.copy(this),Q),J.r=z7.r,J.g=z7.g,J.b=z7.b,J}getStyle(J="srgb"){M9.workingToColorSpace(z7.copy(this),J);let{r:Q,g:$,b:Z}=z7;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(XJ),this.setHSL(XJ.h+J,XJ.s+Q,XJ.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(XJ),J.getHSL(eQ);let $=AZ(XJ.h,eQ.h,Q),Z=AZ(XJ.s,eQ.s,Q),K=AZ(XJ.l,eQ.l,Q);return this.setHSL($,Z,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,K=J.elements;return this.r=K[0]*Q+K[3]*$+K[6]*Z,this.g=K[1]*Q+K[4]*$+K[7]*Z,this.b=K[2]*Q+K[5]*$+K[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var z7=new W0;W0.NAMES=aW;class yJ{constructor(J,Q=0.00025){this.isFogExp2=!0,this.name="",this.color=new W0(J),this.density=Q}clone(){return new yJ(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class V8 extends A9{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new x8,this.environmentIntensity=1,this.environmentRotation=new x8,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();return Q.object.backgroundBlurriness=this.backgroundBlurriness,Q.object.backgroundIntensity=this.backgroundIntensity,Q.object.backgroundRotation=this.backgroundRotation.toArray(),Q.object.environmentIntensity=this.environmentIntensity,Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var t7=new S,j8=new S,jZ=new S,v8=new S,Z6=new S,K6=new S,zY=new S,vZ=new S,yZ=new S,fZ=new S,bZ=new r9,hZ=new r9,xZ=new r9;class k7{constructor(J=new S,Q=new S,$=new S){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),t7.subVectors(J,Q),Z.cross(t7);let K=Z.lengthSq();if(K>0)return Z.multiplyScalar(1/Math.sqrt(K));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,K){t7.subVectors(Z,Q),j8.subVectors($,Q),jZ.subVectors(J,Q);let U=t7.dot(t7),Y=t7.dot(j8),W=t7.dot(jZ),H=j8.dot(j8),G=j8.dot(jZ),X=U*H-Y*Y;if(X===0)return K.set(0,0,0),null;let F=1/X,N=(H*W-Y*G)*F,q=(U*G-Y*W)*F;return K.set(1-N-q,q,N)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,v8)===null)return!1;return v8.x>=0&&v8.y>=0&&v8.x+v8.y<=1}static getInterpolation(J,Q,$,Z,K,U,Y,W){if(this.getBarycoord(J,Q,$,Z,v8)===null){if(W.x=0,W.y=0,"z"in W)W.z=0;if("w"in W)W.w=0;return null}return W.setScalar(0),W.addScaledVector(K,v8.x),W.addScaledVector(U,v8.y),W.addScaledVector(Y,v8.z),W}static getInterpolatedAttribute(J,Q,$,Z,K,U){return bZ.setScalar(0),hZ.setScalar(0),xZ.setScalar(0),bZ.fromBufferAttribute(J,Q),hZ.fromBufferAttribute(J,$),xZ.fromBufferAttribute(J,Z),U.setScalar(0),U.addScaledVector(bZ,K.x),U.addScaledVector(hZ,K.y),U.addScaledVector(xZ,K.z),U}static isFrontFacing(J,Q,$,Z){return t7.subVectors($,Q),j8.subVectors(J,Q),t7.cross(j8).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return t7.subVectors(this.c,this.b),j8.subVectors(this.a,this.b),t7.cross(j8).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return k7.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return k7.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,K){return k7.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,K)}containsPoint(J){return k7.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return k7.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,K=this.c,U,Y;Z6.subVectors(Z,$),K6.subVectors(K,$),vZ.subVectors(J,$);let W=Z6.dot(vZ),H=K6.dot(vZ);if(W<=0&&H<=0)return Q.copy($);yZ.subVectors(J,Z);let G=Z6.dot(yZ),X=K6.dot(yZ);if(G>=0&&X<=G)return Q.copy(Z);let F=W*X-G*H;if(F<=0&&W>=0&&G<=0)return U=W/(W-G),Q.copy($).addScaledVector(Z6,U);fZ.subVectors(J,K);let N=Z6.dot(fZ),q=K6.dot(fZ);if(q>=0&&N<=q)return Q.copy(K);let O=N*H-W*q;if(O<=0&&H>=0&&q<=0)return Y=H/(H-q),Q.copy($).addScaledVector(K6,Y);let M=G*q-N*X;if(M<=0&&X-G>=0&&N-q>=0)return zY.subVectors(K,Z),Y=(X-G)/(X-G+(N-q)),Q.copy(Z).addScaledVector(zY,Y);let D=1/(M+O+F);return U=O*D,Y=F*D,Q.copy($).addScaledVector(Z6,U).addScaledVector(K6,Y)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class $8{constructor(J=new S(1/0,1/0,1/0),Q=new S(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(e7.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(e7.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=e7.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let K=$.getAttribute("position");if(Q===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let U=0,Y=K.count;U<Y;U++){if(J.isMesh===!0)J.getVertexPosition(U,e7);else e7.fromBufferAttribute(K,U);e7.applyMatrix4(J.matrixWorld),this.expandByPoint(e7)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();J$.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();J$.copy($.boundingBox)}J$.applyMatrix4(J.matrixWorld),this.union(J$)}}let Z=J.children;for(let K=0,U=Z.length;K<U;K++)this.expandByObject(Z[K],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,e7),e7.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(d6),Q$.subVectors(this.max,d6),U6.subVectors(J.a,d6),Y6.subVectors(J.b,d6),W6.subVectors(J.c,d6),DJ.subVectors(Y6,U6),qJ.subVectors(W6,Y6),IJ.subVectors(U6,W6);let Q=[0,-DJ.z,DJ.y,0,-qJ.z,qJ.y,0,-IJ.z,IJ.y,DJ.z,0,-DJ.x,qJ.z,0,-qJ.x,IJ.z,0,-IJ.x,-DJ.y,DJ.x,0,-qJ.y,qJ.x,0,-IJ.y,IJ.x,0];if(!gZ(Q,U6,Y6,W6,Q$))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!gZ(Q,U6,Y6,W6,Q$))return!1;return $$.crossVectors(DJ,qJ),Q=[$$.x,$$.y,$$.z],gZ(Q,U6,Y6,W6,Q$)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,e7).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(e7).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return y8[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),y8[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),y8[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),y8[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),y8[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),y8[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),y8[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),y8[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(y8),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var y8=[new S,new S,new S,new S,new S,new S,new S,new S],e7=new S,J$=new $8,U6=new S,Y6=new S,W6=new S,DJ=new S,qJ=new S,IJ=new S,d6=new S,Q$=new S,$$=new S,CJ=new S;function gZ(J,Q,$,Z,K){for(let U=0,Y=J.length-3;U<=Y;U+=3){CJ.fromArray(J,U);let W=K.x*Math.abs(CJ.x)+K.y*Math.abs(CJ.y)+K.z*Math.abs(CJ.z),H=Q.dot(CJ),G=$.dot(CJ),X=Z.dot(CJ);if(Math.max(-Math.max(H,G,X),Math.min(H,G,X))>W)return!1}return!0}var G7=new S,Z$=new U0,s5=0;class Q7 extends m8{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:s5++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,K=this.itemSize;Z<K;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)Z$.fromBufferAttribute(this,Q),Z$.applyMatrix3(J),this.setXY(Q,Z$.x,Z$.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)G7.fromBufferAttribute(this,Q),G7.applyMatrix3(J),this.setXYZ(Q,G7.x,G7.y,G7.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)G7.fromBufferAttribute(this,Q),G7.applyMatrix4(J),this.setXYZ(Q,G7.x,G7.y,G7.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)G7.fromBufferAttribute(this,Q),G7.applyNormalMatrix(J),this.setXYZ(Q,G7.x,G7.y,G7.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)G7.fromBufferAttribute(this,Q),G7.transformDirection(J),this.setXYZ(Q,G7.x,G7.y,G7.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=O8($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=d9($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=O8(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=d9(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=O8(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=d9(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=O8(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=d9(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=O8(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=d9(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=d9(Q,this.array),$=d9($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=d9(Q,this.array),$=d9($,this.array),Z=d9(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,K){if(J*=this.itemSize,this.normalized)Q=d9(Q,this.array),$=d9($,this.array),Z=d9(Z,this.array),K=d9(K,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return J.name=this.name,J.usage=this.usage,J.gpuType=this.gpuType,J}dispose(){this.dispatchEvent({type:"dispose"})}}class o$ extends Q7{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class a$ extends Q7{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class J9 extends Q7{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var i5=new $8,l6=new S,pZ=new S;class d8{constructor(J=new S,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else i5.setFromPoints(J).getCenter($);let Z=0;for(let K=0,U=J.length;K<U;K++)Z=Math.max(Z,$.distanceToSquared(J[K]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;l6.subVectors(J,this.center);let Q=l6.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(l6,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else pZ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(l6.copy(J.center).add(pZ)),this.expandByPoint(l6.copy(J.center).sub(pZ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var o5=0,l7=new j9,mZ=new A9,H6=new S,m7=new $8,c6=new $8,q7=new S;class F9 extends m8{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:o5++}),this.uuid=b8(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((y5(J))?a$:o$)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let K=new U9().getNormalMatrix(J);$.applyNormalMatrix(K),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return l7.makeRotationFromQuaternion(J),this.applyMatrix4(l7),this}rotateX(J){return l7.makeRotationX(J),this.applyMatrix4(l7),this}rotateY(J){return l7.makeRotationY(J),this.applyMatrix4(l7),this}rotateZ(J){return l7.makeRotationZ(J),this.applyMatrix4(l7),this}translate(J,Q,$){return l7.makeTranslation(J,Q,$),this.applyMatrix4(l7),this}scale(J,Q,$){return l7.makeScale(J,Q,$),this.applyMatrix4(l7),this}lookAt(J){return mZ.lookAt(J),mZ.updateMatrix(),this.applyMatrix4(mZ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(H6).negate(),this.translate(H6.x,H6.y,H6.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,K=J.length;Z<K;Z++){let U=J[Z];$.push(U.x,U.y,U.z||0)}this.setAttribute("position",new J9($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let K=J[Z];Q.setXYZ(Z,K.x,K.y,K.z||0)}if(J.length>Q.count)e0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new $8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){Z9("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new S(-1/0,-1/0,-1/0),new S(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let K=Q[$];if(m7.setFromBufferAttribute(K),this.morphTargetsRelative)q7.addVectors(this.boundingBox.min,m7.min),this.boundingBox.expandByPoint(q7),q7.addVectors(this.boundingBox.max,m7.max),this.boundingBox.expandByPoint(q7);else this.boundingBox.expandByPoint(m7.min),this.boundingBox.expandByPoint(m7.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))Z9('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new d8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){Z9("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new S,1/0);return}if(J){let $=this.boundingSphere.center;if(m7.setFromBufferAttribute(J),Q)for(let K=0,U=Q.length;K<U;K++){let Y=Q[K];if(c6.setFromBufferAttribute(Y),this.morphTargetsRelative)q7.addVectors(m7.min,c6.min),m7.expandByPoint(q7),q7.addVectors(m7.max,c6.max),m7.expandByPoint(q7);else m7.expandByPoint(c6.min),m7.expandByPoint(c6.max)}m7.getCenter($);let Z=0;for(let K=0,U=J.count;K<U;K++)q7.fromBufferAttribute(J,K),Z=Math.max(Z,$.distanceToSquared(q7));if(Q)for(let K=0,U=Q.length;K<U;K++){let Y=Q[K],W=this.morphTargetsRelative;for(let H=0,G=Y.count;H<G;H++){if(q7.fromBufferAttribute(Y,H),W)H6.fromBufferAttribute(J,H),q7.add(H6);Z=Math.max(Z,$.distanceToSquared(q7))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))Z9('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){Z9("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:K}=Q,U=this.getAttribute("tangent");if(U===void 0||U.count!==$.count)U=new Q7(new Float32Array(4*$.count),4),this.setAttribute("tangent",U);let Y=[],W=[];for(let z=0;z<$.count;z++)Y[z]=new S,W[z]=new S;let H=new S,G=new S,X=new S,F=new U0,N=new U0,q=new U0,O=new S,M=new S;function D(z,V,C){H.fromBufferAttribute($,z),G.fromBufferAttribute($,V),X.fromBufferAttribute($,C),F.fromBufferAttribute(K,z),N.fromBufferAttribute(K,V),q.fromBufferAttribute(K,C),G.sub(H),X.sub(H),N.sub(F),q.sub(F);let f=1/(N.x*q.y-q.x*N.y);if(!isFinite(f))return;O.copy(G).multiplyScalar(q.y).addScaledVector(X,-N.y).multiplyScalar(f),M.copy(X).multiplyScalar(N.x).addScaledVector(G,-q.x).multiplyScalar(f),Y[z].add(O),Y[V].add(O),Y[C].add(O),W[z].add(M),W[V].add(M),W[C].add(M)}let E=this.groups;if(E.length===0)E=[{start:0,count:J.count}];for(let z=0,V=E.length;z<V;++z){let C=E[z],f=C.start,k=C.count;for(let b=f,e=f+k;b<e;b+=3)D(J.getX(b+0),J.getX(b+1),J.getX(b+2))}let I=new S,L=new S,R=new S,B=new S;function _(z){R.fromBufferAttribute(Z,z),B.copy(R);let V=Y[z];I.copy(V),I.sub(R.multiplyScalar(R.dot(V))).normalize(),L.crossVectors(B,V);let f=L.dot(W[z])<0?-1:1;U.setXYZW(z,I.x,I.y,I.z,f)}for(let z=0,V=E.length;z<V;++z){let C=E[z],f=C.start,k=C.count;for(let b=f,e=f+k;b<e;b+=3)_(J.getX(b+0)),_(J.getX(b+1)),_(J.getX(b+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new Q7(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let F=0,N=$.count;F<N;F++)$.setXYZ(F,0,0,0);let Z=new S,K=new S,U=new S,Y=new S,W=new S,H=new S,G=new S,X=new S;if(J)for(let F=0,N=J.count;F<N;F+=3){let q=J.getX(F+0),O=J.getX(F+1),M=J.getX(F+2);Z.fromBufferAttribute(Q,q),K.fromBufferAttribute(Q,O),U.fromBufferAttribute(Q,M),G.subVectors(U,K),X.subVectors(Z,K),G.cross(X),Y.fromBufferAttribute($,q),W.fromBufferAttribute($,O),H.fromBufferAttribute($,M),Y.add(G),W.add(G),H.add(G),$.setXYZ(q,Y.x,Y.y,Y.z),$.setXYZ(O,W.x,W.y,W.z),$.setXYZ(M,H.x,H.y,H.z)}else for(let F=0,N=Q.count;F<N;F+=3)Z.fromBufferAttribute(Q,F+0),K.fromBufferAttribute(Q,F+1),U.fromBufferAttribute(Q,F+2),G.subVectors(U,K),X.subVectors(Z,K),G.cross(X),$.setXYZ(F+0,G.x,G.y,G.z),$.setXYZ(F+1,G.x,G.y,G.z),$.setXYZ(F+2,G.x,G.y,G.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)q7.fromBufferAttribute(J,Q),q7.normalize(),J.setXYZ(Q,q7.x,q7.y,q7.z)}toNonIndexed(){function J(Y,W){let{array:H,itemSize:G,normalized:X}=Y,F=new H.constructor(W.length*G),N=0,q=0;for(let O=0,M=W.length;O<M;O++){if(Y.isInterleavedBufferAttribute)N=W[O]*Y.data.stride+Y.offset;else N=W[O]*G;for(let D=0;D<G;D++)F[q++]=H[N++]}return new Q7(F,G,X)}if(this.index===null)return e0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new F9,$=this.index.array,Z=this.attributes;for(let Y in Z){let W=Z[Y],H=J(W,$);Q.setAttribute(Y,H)}let K=this.morphAttributes;for(let Y in K){let W=[],H=K[Y];for(let G=0,X=H.length;G<X;G++){let F=H[G],N=J(F,$);W.push(N)}Q.morphAttributes[Y]=W}Q.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;for(let Y=0,W=U.length;Y<W;Y++){let H=U[Y];Q.addGroup(H.start,H.count,H.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,J.name=this.name,Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let W=this.parameters;for(let H in W)if(W[H]!==void 0)J[H]=W[H];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let W in $){let H=$[W];J.data.attributes[W]=H.toJSON(J.data)}let Z={},K=!1;for(let W in this.morphAttributes){let H=this.morphAttributes[W],G=[];for(let X=0,F=H.length;X<F;X++){let N=H[X];G.push(N.toJSON(J.data))}if(G.length>0)Z[W]=G,K=!0}if(K)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;if(U.length>0)J.data.groups=JSON.parse(JSON.stringify(U));let Y=this.boundingSphere;if(Y!==null)J.data.boundingSphere=Y.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let H in Z){let G=Z[H];this.setAttribute(H,G.clone(Q))}let K=J.morphAttributes;for(let H in K){let G=[],X=K[H];for(let F=0,N=X.length;F<N;F++)G.push(X[F].clone(Q));this.morphAttributes[H]=G}this.morphTargetsRelative=J.morphTargetsRelative;let U=J.groups;for(let H=0,G=U.length;H<G;H++){let X=U[H];this.addGroup(X.start,X.count,X.materialIndex)}let Y=J.boundingBox;if(Y!==null)this.boundingBox=Y.clone();let W=J.boundingSphere;if(W!==null)this.boundingSphere=W.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rK{constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=b8()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,$){J*=this.stride,$*=Q.stride;for(let Z=0,K=this.stride;Z<K;Z++)this.array[J+Z]=Q.array[$+Z];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=b8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),$=new this.constructor(Q,this.stride);return $.setUsage(this.usage),$}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=b8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));let Q={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return Q.usage=this.usage,Q}}var T7=new S;class KQ{constructor(J,Q,$,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=$,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,$=this.data.count;Q<$;Q++)T7.fromBufferAttribute(this,Q),T7.applyMatrix4(J),this.setXYZ(Q,T7.x,T7.y,T7.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)T7.fromBufferAttribute(this,Q),T7.applyNormalMatrix(J),this.setXYZ(Q,T7.x,T7.y,T7.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)T7.fromBufferAttribute(this,Q),T7.transformDirection(J),this.setXYZ(Q,T7.x,T7.y,T7.z);return this}getComponent(J,Q){let $=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)$=O8($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=d9($,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=$,this}setX(J,Q){if(this.normalized)Q=d9(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=d9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=d9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=d9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=O8(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=O8(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=O8(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=O8(Q,this.array);return Q}setXY(J,Q,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=d9(Q,this.array),$=d9($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=d9(Q,this.array),$=d9($,this.array),Z=d9(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this}setXYZW(J,Q,$,Z,K){if(J=J*this.data.stride+this.offset,this.normalized)Q=d9(Q,this.array),$=d9($,this.array),Z=d9(Z,this.array),K=d9(K,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=$,this.data.array[J+2]=Z,this.data.array[J+3]=K,this}clone(J){if(J===void 0){$Q("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[Z+K])}return new Q7(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new KQ(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){$Q("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let $=0;$<this.count;$++){let Z=$*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[Z+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var uZ=new S,a5=new S,r5=new U9;class E8{constructor(J=new S(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=uZ.subVectors($,Q).cross(a5.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(uZ),K=this.normal.dot(Z);if(K===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let U=-(J.start.dot(this.normal)+this.constant)/K;if($===!0&&(U<0||U>1))return null;return Q.copy(J.start).addScaledVector(Z,U)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||r5.getNormalMatrix(J),Z=this.coplanarPoint(uZ).applyMatrix4(J),K=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(J){return this.normal.fromArray(J.normal),this.constant=J.constant,this}}var t5=0;class Z8 extends m8{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:t5++}),this.uuid=b8(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){e0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){e0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector2&&($&&$.isVector2)||Z&&Z.isEuler&&($&&$.isEuler)||Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,$.blending=this.blending,$.side=this.side,$.shadowSide=this.shadowSide,$.vertexColors=this.vertexColors,$.opacity=this.opacity,$.transparent=this.transparent,$.blendSrc=this.blendSrc,$.blendDst=this.blendDst,$.blendEquation=this.blendEquation,$.blendSrcAlpha=this.blendSrcAlpha,$.blendDstAlpha=this.blendDstAlpha,$.blendEquationAlpha=this.blendEquationAlpha,$.blendColor=this.blendColor.getHex(),$.blendAlpha=this.blendAlpha,$.depthFunc=this.depthFunc,$.depthTest=this.depthTest,$.depthWrite=this.depthWrite,$.colorWrite=this.colorWrite,$.clipIntersection=this.clipIntersection,$.clipShadows=this.clipShadows,$.stencilWriteMask=this.stencilWriteMask,$.stencilFunc=this.stencilFunc,$.stencilRef=this.stencilRef,$.stencilFuncMask=this.stencilFuncMask,$.stencilFail=this.stencilFail,$.stencilZFail=this.stencilZFail,$.stencilZPass=this.stencilZPass,$.stencilWrite=this.stencilWrite,$.polygonOffset=this.polygonOffset,$.polygonOffsetFactor=this.polygonOffsetFactor,$.polygonOffsetUnits=this.polygonOffsetUnits,$.dithering=this.dithering,$.alphaTest=this.alphaTest,$.alphaHash=this.alphaHash,$.alphaToCoverage=this.alphaToCoverage,$.premultipliedAlpha=this.premultipliedAlpha,$.forceSinglePass=this.forceSinglePass,$.allowOverride=this.allowOverride,$.visible=this.visible,$.toneMapped=this.toneMapped,$.name=this.name,this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)$.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)$.clippingPlanes=this.clippingPlanes.map((K)=>K.toJSON());if(this.rotation!==void 0)$.rotation=this.rotation;if(this.depthPacking!==void 0)$.depthPacking=this.depthPacking;if(this.linewidth!==void 0)$.linewidth=this.linewidth;if(this.linecap!==void 0)$.linecap=this.linecap;if(this.linejoin!==void 0)$.linejoin=this.linejoin;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.wireframe!==void 0)$.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)$.flatShading=this.flatShading;if(this.fog!==void 0)$.fog=this.fog;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(K){let U=[];for(let Y in K){let W=K[Y];delete W.metadata,U.push(W)}return U}if(Q){let K=Z(J.textures),U=Z(J.images);if(K.length>0)$.textures=K;if(U.length>0)$.images=U}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new W0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.retroreflectivity!==void 0)this.retroreflectivity=J.retroreflectivity;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.clippingPlanes!==void 0)this.clippingPlanes=J.clippingPlanes.map(($)=>new E8().fromJSON($));if(J.clipIntersection!==void 0)this.clipIntersection=J.clipIntersection;if(J.clipShadows!==void 0)this.clipShadows=J.clipShadows;if(J.depthPacking!==void 0)this.depthPacking=J.depthPacking;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.linecap!==void 0)this.linecap=J.linecap;if(J.linejoin!==void 0)this.linejoin=J.linejoin;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new U0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new U0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let K=0;K!==Z;++K)$[K]=Q[K].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class L6 extends Z8{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new W0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var G6,n6=new S,N6=new S,X6=new S,D6=new U0,s6=new U0,rW=new j9,K$=new S,i6=new S,U$=new S,AY=new U0,dZ=new U0,LY=new U0;class BQ extends A9{constructor(J=new L6){super();if(this.isSprite=!0,this.type="Sprite",G6===void 0){G6=new F9;let Q=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),$=new rK(Q,5);G6.setIndex([0,1,2,0,2,3]),G6.setAttribute("position",new KQ($,3,0,!1)),G6.setAttribute("uv",new KQ($,2,3,!1))}this.geometry=G6,this.material=J,this.center=new U0(0.5,0.5),this.count=1}intersectsFrustum(J){return J.intersectsSprite(this)}raycast(J,Q){if(J.camera===null)Z9('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(N6.setFromMatrixScale(this.matrixWorld),rW.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),X6.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)N6.multiplyScalar(-X6.z);let $=this.material.rotation,Z,K;if($!==0)K=Math.cos($),Z=Math.sin($);let U=this.center;Y$(K$.set(-0.5,-0.5,0),X6,U,N6,Z,K),Y$(i6.set(0.5,-0.5,0),X6,U,N6,Z,K),Y$(U$.set(0.5,0.5,0),X6,U,N6,Z,K),AY.set(0,0),dZ.set(1,0),LY.set(1,1);let Y=J.ray.intersectTriangle(K$,i6,U$,!1,n6);if(Y===null){if(Y$(i6.set(-0.5,0.5,0),X6,U,N6,Z,K),dZ.set(0,1),Y=J.ray.intersectTriangle(K$,U$,i6,!1,n6),Y===null)return}let W=J.ray.origin.distanceTo(n6);if(W<J.near||W>J.far)return;Q.push({distance:W,point:n6.clone(),uv:k7.getInterpolation(n6,K$,i6,U$,AY,dZ,LY,new U0),face:null,object:this})}copy(J,Q){if(super.copy(J,Q),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function Y$(J,Q,$,Z,K,U){if(D6.subVectors(J,$).addScalar(0.5).multiply(Z),K!==void 0)s6.x=U*D6.x-K*D6.y,s6.y=K*D6.x+U*D6.y;else s6.copy(D6);J.copy(Q),J.x+=s6.x,J.y+=s6.y,J.applyMatrix4(rW)}var f8=new S,lZ=new S,W$=new S,H$=new S;class IQ{constructor(J=new S,Q=new S(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,f8)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=f8.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return f8.copy(this.origin).addScaledVector(this.direction,Q),f8.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){lZ.copy(J).add(Q).multiplyScalar(0.5),W$.copy(Q).sub(J).normalize(),H$.copy(this.origin).sub(lZ);let K=J.distanceTo(Q)*0.5,U=-this.direction.dot(W$),Y=H$.dot(this.direction),W=-H$.dot(W$),H=H$.lengthSq(),G=Math.abs(1-U*U),X,F,N,q;if(G>0)if(X=U*W-Y,F=U*Y-W,q=K*G,X>=0)if(F>=-q)if(F<=q){let O=1/G;X*=O,F*=O,N=X*(X+U*F+2*Y)+F*(U*X+F+2*W)+H}else F=K,X=Math.max(0,-(U*F+Y)),N=-X*X+F*(F+2*W)+H;else F=-K,X=Math.max(0,-(U*F+Y)),N=-X*X+F*(F+2*W)+H;else if(F<=-q)X=Math.max(0,-(-U*K+Y)),F=X>0?-K:Math.min(Math.max(-K,-W),K),N=-X*X+F*(F+2*W)+H;else if(F<=q)X=0,F=Math.min(Math.max(-K,-W),K),N=F*(F+2*W)+H;else X=Math.max(0,-(U*K+Y)),F=X>0?K:Math.min(Math.max(-K,-W),K),N=-X*X+F*(F+2*W)+H;else F=U>0?-K:K,X=Math.max(0,-(U*F+Y)),N=-X*X+F*(F+2*W)+H;if($)$.copy(this.origin).addScaledVector(this.direction,X);if(Z)Z.copy(lZ).addScaledVector(W$,F);return N}intersectSphere(J,Q){if(J.radius<0)return null;f8.subVectors(J.center,this.origin);let $=f8.dot(this.direction),Z=f8.dot(f8)-$*$,K=J.radius*J.radius;if(Z>K)return null;let U=Math.sqrt(K-Z),Y=$-U,W=$+U;if(W<0)return null;if(Y<0)return this.at(W,Q);return this.at(Y,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,K,U,Y,W,H=1/this.direction.x,G=1/this.direction.y,X=1/this.direction.z,F=this.origin;if(H>=0)$=(J.min.x-F.x)*H,Z=(J.max.x-F.x)*H;else $=(J.max.x-F.x)*H,Z=(J.min.x-F.x)*H;if(G>=0)K=(J.min.y-F.y)*G,U=(J.max.y-F.y)*G;else K=(J.max.y-F.y)*G,U=(J.min.y-F.y)*G;if($>U||K>Z)return null;if(K>$||isNaN($))$=K;if(U<Z||isNaN(Z))Z=U;if(X>=0)Y=(J.min.z-F.z)*X,W=(J.max.z-F.z)*X;else Y=(J.max.z-F.z)*X,W=(J.min.z-F.z)*X;if($>W||Y>Z)return null;if(Y>$||$!==$)$=Y;if(W<Z||Z!==Z)Z=W;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,f8)!==null}intersectTriangle(J,Q,$,Z,K){let U=this.origin,Y=this.direction,W=Y.x,H=Y.y,G=Y.z,X=J.x-U.x,F=J.y-U.y,N=J.z-U.z,q=Q.x-U.x,O=Q.y-U.y,M=Q.z-U.z,D=$.x-U.x,E=$.y-U.y,I=$.z-U.z,L=Math.abs(W),R=Math.abs(H),B=Math.abs(G),_,z,V,C,f,k,b,e,v,u,Q0,l;if(L>=R&&L>=B)if(V=W,k=X,v=q,l=D,W>=0)_=H,z=G,C=F,f=N,b=O,e=M,u=E,Q0=I;else _=G,z=H,C=N,f=F,b=M,e=O,u=I,Q0=E;else if(R>=B)if(V=H,k=F,v=O,l=E,H>=0)_=G,z=W,C=N,f=X,b=M,e=q,u=I,Q0=D;else _=W,z=G,C=X,f=N,b=q,e=M,u=D,Q0=I;else if(V=G,k=N,v=M,l=I,G>=0)_=W,z=H,C=X,f=F,b=q,e=O,u=D,Q0=E;else _=H,z=W,C=F,f=X,b=O,e=q,u=E,Q0=D;if(V===0)return null;let D0=_/V,t=z/V,p=1/V,J0=C-D0*k,M0=f-t*k,A0=b-D0*v,_0=e-t*v,E0=u-D0*l,i=Q0-t*l,N0=E0*_0-i*A0,K0=J0*i-M0*E0,m=A0*M0-_0*J0;if(Z){if(N0<0||K0<0||m<0)return null}else if((N0<0||K0<0||m<0)&&(N0>0||K0>0||m>0))return null;let C0=N0+K0+m;if(C0===0)return null;let s=p*(N0*k+K0*v+m*l);if(C0>0?s<0:s>0)return null;return this.at(s/C0,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class m0 extends Z8{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new W0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new x8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var PY=new j9,zJ=new IQ,G$=new d8,wY=new S,N$=new S,X$=new S,D$=new S,cZ=new S,q$=new S,TY=new S,F$=new S;class d extends A9{constructor(J=new F9,Q=new m0){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let Y=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=K}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,K=$.morphAttributes.position,U=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let Y=this.morphTargetInfluences;if(K&&Y){q$.set(0,0,0);for(let W=0,H=K.length;W<H;W++){let G=Y[W],X=K[W];if(G===0)continue;if(cZ.fromBufferAttribute(X,J),U)q$.addScaledVector(cZ,G);else q$.addScaledVector(cZ.sub(Q),G)}Q.add(q$)}return Q}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.material,K=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(G$.copy($.boundingSphere),G$.applyMatrix4(K),zJ.copy(J.ray).recast(J.near),G$.containsPoint(zJ.origin)===!1){if(zJ.intersectSphere(G$,wY)===null)return;if(zJ.origin.distanceToSquared(wY)>(J.far-J.near)**2)return}if(PY.copy(K).invert(),zJ.copy(J.ray).applyMatrix4(PY),$.boundingBox!==null){if(zJ.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,zJ)}_computeIntersections(J,Q,$){let Z,K=this.geometry,U=this.material,Y=K.index,W=K.attributes.position,H=K.attributes.uv,G=K.attributes.uv1,X=K.attributes.normal,F=K.groups,N=K.drawRange;if(Y!==null)if(Array.isArray(U))for(let q=0,O=F.length;q<O;q++){let M=F[q],D=U[M.materialIndex],E=Math.max(M.start,N.start),I=Math.min(Y.count,Math.min(M.start+M.count,N.start+N.count));for(let L=E,R=I;L<R;L+=3){let B=Y.getX(L),_=Y.getX(L+1),z=Y.getX(L+2);if(Z=E$(this,D,J,$,H,G,X,B,_,z),Z)Z.faceIndex=Math.floor(L/3),Z.face.materialIndex=M.materialIndex,Q.push(Z)}}else{let q=Math.max(0,N.start),O=Math.min(Y.count,N.start+N.count);for(let M=q,D=O;M<D;M+=3){let E=Y.getX(M),I=Y.getX(M+1),L=Y.getX(M+2);if(Z=E$(this,U,J,$,H,G,X,E,I,L),Z)Z.faceIndex=Math.floor(M/3),Q.push(Z)}}else if(W!==void 0)if(Array.isArray(U))for(let q=0,O=F.length;q<O;q++){let M=F[q],D=U[M.materialIndex],E=Math.max(M.start,N.start),I=Math.min(W.count,Math.min(M.start+M.count,N.start+N.count));for(let L=E,R=I;L<R;L+=3){let B=L,_=L+1,z=L+2;if(Z=E$(this,D,J,$,H,G,X,B,_,z),Z)Z.faceIndex=Math.floor(L/3),Z.face.materialIndex=M.materialIndex,Q.push(Z)}}else{let q=Math.max(0,N.start),O=Math.min(W.count,N.start+N.count);for(let M=q,D=O;M<D;M+=3){let E=M,I=M+1,L=M+2;if(Z=E$(this,U,J,$,H,G,X,E,I,L),Z)Z.faceIndex=Math.floor(M/3),Q.push(Z)}}}}function e5(J,Q,$,Z,K,U,Y,W){let H;if(Q.side===1)H=Z.intersectTriangle(Y,U,K,!0,W);else H=Z.intersectTriangle(K,U,Y,Q.side===0,W);if(H===null)return null;F$.copy(W),F$.applyMatrix4(J.matrixWorld);let G=$.ray.origin.distanceTo(F$);if(G<$.near||G>$.far)return null;return{distance:G,point:F$.clone(),object:J}}function E$(J,Q,$,Z,K,U,Y,W,H,G){J.getVertexPosition(W,N$),J.getVertexPosition(H,X$),J.getVertexPosition(G,D$);let X=e5(J,Q,$,Z,N$,X$,D$,TY);if(X){let F=new S;if(k7.getBarycoord(TY,N$,X$,D$,F),K)X.uv=k7.getInterpolatedAttribute(K,W,H,G,F,new U0);if(U)X.uv1=k7.getInterpolatedAttribute(U,W,H,G,F,new U0);if(Y){if(X.normal=k7.getInterpolatedAttribute(Y,W,H,G,F,new S),X.normal.dot(Z.direction)>0)X.normal.multiplyScalar(-1)}let N={a:W,b:H,c:G,normal:new S,materialIndex:0};k7.getNormal(N$,X$,D$,N.normal),X.face=N,X.barycoord=F}return X}class P6 extends V7{constructor(J=null,Q=1,$=1,Z,K,U,Y,W,H=1003,G=1003,X,F){super(null,U,Y,W,H,G,Z,K,X,F);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class S$ extends Q7{constructor(J,Q,$,Z=1){super(J,Q,$);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var q6=new j9,SY=new j9,O$=[],kY=new $8,JG=new j9,o6=new d,a6=new d8;class T9 extends d{constructor(J,Q,$){super(J,Q);this.isInstancedMesh=!0,this.instanceMatrix=new S$(new Float32Array($*16),16),this.instanceColor=null,this.morphTexture=null,this.count=$,this.boundingBox=null,this.boundingSphere=null;for(let Z=0;Z<$;Z++)this.setMatrixAt(Z,JG)}computeBoundingBox(){let J=this.geometry,Q=this.count;if(this.boundingBox===null)this.boundingBox=new $8;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,q6),kY.copy(J.boundingBox).applyMatrix4(q6),this.boundingBox.union(kY)}computeBoundingSphere(){let J=this.geometry,Q=this.count;if(this.boundingSphere===null)this.boundingSphere=new d8;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let $=0;$<Q;$++)this.getMatrixAt($,q6),a6.copy(J.boundingSphere).applyMatrix4(q6),this.boundingSphere.union(a6)}copy(J,Q){if(super.copy(J,Q),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,Q){if(this.instanceColor===null)return Q.setRGB(1,1,1);else return Q.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,Q){return Q.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=this.morphTexture.source.data.data,K=$.length+1,U=J*K+1;for(let Y=0;Y<$.length;Y++)$[Y]=Z[U+Y]}raycast(J,Q){let $=this.matrixWorld,Z=this.count;if(o6.geometry=this.geometry,o6.material=this.material,o6.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(a6.copy(this.boundingSphere),a6.applyMatrix4($),J.ray.intersectsSphere(a6)===!1)return;for(let K=0;K<Z;K++){this.getMatrixAt(K,q6),SY.multiplyMatrices($,q6),o6.matrixWorld=SY,o6.raycast(J,O$);for(let U=0,Y=O$.length;U<Y;U++){let W=O$[U];W.instanceId=K,W.object=this,Q.push(W)}O$.length=0}}setColorAt(J,Q){if(this.instanceColor===null)this.instanceColor=new S$(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return Q.toArray(this.instanceColor.array,J*3),this}setMatrixAt(J,Q){return Q.toArray(this.instanceMatrix.array,J*16),this}setMorphAt(J,Q){let $=Q.morphTargetInfluences,Z=$.length+1;if(this.morphTexture===null)this.morphTexture=new P6(new Float32Array(Z*this.count),Z,this.count,1028,1015);let K=this.morphTexture.source.data.data,U=0;for(let H=0;H<$.length;H++)U+=$[H];let Y=this.geometry.morphTargetsRelative?1:1-U,W=Z*J;return K[W]=Y,K.set($,W+1),this}updateMorphTargets(){}dispose(){if(super.dispose(),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var AJ=new d8,QG=new U0(0.5,0.5),R$=new S;class CQ{constructor(J=new E8,Q=new E8,$=new E8,Z=new E8,K=new E8,U=new E8){this.planes=[J,Q,$,Z,K,U]}set(J,Q,$,Z,K,U){let Y=this.planes;return Y[0].copy(J),Y[1].copy(Q),Y[2].copy($),Y[3].copy(Z),Y[4].copy(K),Y[5].copy(U),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,K=J.elements,U=K[0],Y=K[1],W=K[2],H=K[3],G=K[4],X=K[5],F=K[6],N=K[7],q=K[8],O=K[9],M=K[10],D=K[11],E=K[12],I=K[13],L=K[14],R=K[15];if(Z[0].setComponents(H-U,N-G,D-q,R-E).normalize(),Z[1].setComponents(H+U,N+G,D+q,R+E).normalize(),Z[2].setComponents(H+Y,N+X,D+O,R+I).normalize(),Z[3].setComponents(H-Y,N-X,D-O,R-I).normalize(),$)Z[4].setComponents(W,F,M,L).normalize(),Z[5].setComponents(H-W,N-F,D-M,R-L).normalize();else if(Z[4].setComponents(H-W,N-F,D-M,R-L).normalize(),Q===2000)Z[5].setComponents(H+W,N+F,D+M,R+L).normalize();else if(Q===2001)Z[5].setComponents(W,F,M,L).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();AJ.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();AJ.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(AJ)}intersectsSprite(J){AJ.center.set(0,0,0);let Q=QG.distanceTo(J.center);return AJ.radius=0.7071067811865476+Q,AJ.applyMatrix4(J.matrixWorld),this.intersectsSphere(AJ)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let K=0;K<6;K++)if(Q[K].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(R$.x=Z.normal.x>0?J.max.x:J.min.x,R$.y=Z.normal.y>0?J.max.y:J.min.y,R$.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(R$)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fJ extends Z8{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new W0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var k$=new S,j$=new S,jY=new j9,r6=new IQ,M$=new d8,nZ=new S,vY=new S;class tK extends A9{constructor(J=new F9,Q=new fJ){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let Z=1,K=Q.count;Z<K;Z++)k$.fromBufferAttribute(Q,Z-1),j$.fromBufferAttribute(Q,Z),$[Z]=$[Z-1],$[Z]+=k$.distanceTo(j$);J.setAttribute("lineDistance",new J9($,1))}else e0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,K=J.params.Line.threshold,U=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(M$.copy($.boundingSphere),M$.applyMatrix4(Z),M$.radius+=K,J.ray.intersectsSphere(M$)===!1)return;jY.copy(Z).invert(),r6.copy(J.ray).applyMatrix4(jY);let Y=K/((this.scale.x+this.scale.y+this.scale.z)/3),W=Y*Y,H=this.isLineSegments?2:1,G=$.index,F=$.attributes.position;if(G!==null){let N=Math.max(0,U.start),q=Math.min(G.count,U.start+U.count);for(let O=N,M=q-1;O<M;O+=H){let D=G.getX(O),E=G.getX(O+1),I=V$(this,J,r6,W,D,E,O);if(I)Q.push(I)}if(this.isLineLoop){let O=G.getX(q-1),M=G.getX(N),D=V$(this,J,r6,W,O,M,q-1);if(D)Q.push(D)}}else{let N=Math.max(0,U.start),q=Math.min(F.count,U.start+U.count);for(let O=N,M=q-1;O<M;O+=H){let D=V$(this,J,r6,W,O,O+1,O);if(D)Q.push(D)}if(this.isLineLoop){let O=V$(this,J,r6,W,q-1,N,q-1);if(O)Q.push(O)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let Y=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=K}}}}}function V$(J,Q,$,Z,K,U,Y){let W=J.geometry.attributes.position;if(k$.fromBufferAttribute(W,K),j$.fromBufferAttribute(W,U),$.distanceSqToSegment(k$,j$,nZ,vY)>Z)return;nZ.applyMatrix4(J.matrixWorld);let G=Q.ray.origin.distanceTo(nZ);if(G<Q.near||G>Q.far)return;return{distance:G,point:vY.clone().applyMatrix4(J.matrixWorld),index:Y,face:null,faceIndex:null,barycoord:null,object:J}}var yY=new S,fY=new S;class K8 extends tK{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let Z=0,K=Q.count;Z<K;Z+=2)yY.fromBufferAttribute(Q,Z),fY.fromBufferAttribute(Q,Z+1),$[Z]=Z===0?0:$[Z-1],$[Z+1]=$[Z]+yY.distanceTo(fY);J.setAttribute("lineDistance",new J9($,1))}else e0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class c7 extends Z8{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new W0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var bY=new j9,eZ=new IQ,_$=new d8,B$=new S;class U8 extends A9{constructor(J=new F9,Q=new c7){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,K=J.params.Points.threshold,U=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(_$.copy($.boundingSphere),_$.applyMatrix4(Z),_$.radius+=K,J.ray.intersectsSphere(_$)===!1)return;bY.copy(Z).invert(),eZ.copy(J.ray).applyMatrix4(bY);let Y=K/((this.scale.x+this.scale.y+this.scale.z)/3),W=Y*Y,H=$.index,X=$.attributes.position;if(H!==null){let F=Math.max(0,U.start),N=Math.min(H.count,U.start+U.count);for(let q=F,O=N;q<O;q++){let M=H.getX(q);B$.fromBufferAttribute(X,M),hY(B$,M,W,Z,J,Q,this)}}else{let F=Math.max(0,U.start),N=Math.min(X.count,U.start+U.count);for(let q=F,O=N;q<O;q++)B$.fromBufferAttribute(X,q),hY(B$,q,W,Z,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let Y=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Y]=K}}}}}function hY(J,Q,$,Z,K,U,Y){let W=eZ.distanceSqToPoint(J);if(W<$){let H=new S;eZ.closestPointToPoint(J,H),H.applyMatrix4(Z);let G=K.ray.origin.distanceTo(H);if(G<K.near||G>K.far)return;U.push({distance:G,distanceToRay:Math.sqrt(W),point:H,index:Q,face:null,faceIndex:null,barycoord:null,object:Y})}}class r$ extends V7{constructor(J=[],Q=301,$,Z,K,U,Y,W,H,G){super(J,Q,$,Z,K,U,Y,W,H,G);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class _7 extends V7{constructor(J,Q,$,Z,K,U,Y,W,H){super(J,Q,$,Z,K,U,Y,W,H);this.isCanvasTexture=!0,this.needsUpdate=!0}}class bJ extends V7{constructor(J,Q,$=1014,Z,K,U,Y=1003,W=1003,H,G=1026,X=1){if(G!==1026&&G!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let F={width:J,height:Q,depth:X};super(F,Z,K,U,Y,W,G,$,H);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new VQ(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);return Q.compareFunction=this.compareFunction,Q}}class eK extends bJ{constructor(J,Q=1014,$=301,Z,K,U=1003,Y=1003,W,H=1026){let G={width:J,height:J,depth:1},X=[G,G,G,G,G,G];super(J,J,Q,$,Z,K,U,Y,W,H);this.image=X,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class t$ extends V7{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class P0 extends F9{constructor(J=1,Q=1,$=1,Z=1,K=1,U=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:K,depthSegments:U};let Y=this;Z=Math.floor(Z),K=Math.floor(K),U=Math.floor(U);let W=[],H=[],G=[],X=[],F=0,N=0;q("z","y","x",-1,-1,$,Q,J,U,K,0),q("z","y","x",1,-1,$,Q,-J,U,K,1),q("x","z","y",1,1,J,$,Q,Z,U,2),q("x","z","y",1,-1,J,$,-Q,Z,U,3),q("x","y","z",1,-1,J,Q,$,Z,K,4),q("x","y","z",-1,-1,J,Q,-$,Z,K,5),this.setIndex(W),this.setAttribute("position",new J9(H,3)),this.setAttribute("normal",new J9(G,3)),this.setAttribute("uv",new J9(X,2));function q(O,M,D,E,I,L,R,B,_,z,V){let C=L/_,f=R/z,k=L/2,b=R/2,e=B/2,v=_+1,u=z+1,Q0=0,l=0,D0=new S;for(let t=0;t<u;t++){let p=t*f-b;for(let J0=0;J0<v;J0++){let M0=J0*C-k;D0[O]=M0*E,D0[M]=p*I,D0[D]=e,H.push(D0.x,D0.y,D0.z),D0[O]=0,D0[M]=0,D0[D]=B>0?1:-1,G.push(D0.x,D0.y,D0.z),X.push(J0/_),X.push(1-t/z),Q0+=1}}for(let t=0;t<z;t++)for(let p=0;p<_;p++){let J0=F+p+v*t,M0=F+p+v*(t+1),A0=F+(p+1)+v*(t+1),_0=F+(p+1)+v*t;W.push(J0,M0,_0),W.push(M0,A0,_0),l+=6}Y.addGroup(N,l,V),N+=l,F+=Q0}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new P0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class Y8 extends F9{constructor(J=1,Q=1,$=4,Z=8,K=1){super();this.type="CapsuleGeometry",this.parameters={radius:J,height:Q,capSegments:$,radialSegments:Z,heightSegments:K},Q=Math.max(0,Q),$=Math.max(1,Math.floor($)),Z=Math.max(3,Math.floor(Z)),K=Math.max(1,Math.floor(K));let U=[],Y=[],W=[],H=[],G=Q/2,X=Math.PI/2*J,F=Q,N=2*X+F,q=$*2+K,O=Z+1,M=new S,D=new S;for(let E=0;E<=q;E++){let I=0,L=0,R=0,B=0;if(E<=$){let V=E/$,C=V*Math.PI/2;L=-G-J*Math.cos(C),R=J*Math.sin(C),B=-J*Math.cos(C),I=V*X}else if(E<=$+K){let V=(E-$)/K;L=-G+V*Q,R=J,B=0,I=X+V*F}else{let V=(E-$-K)/$,C=V*Math.PI/2;L=G+J*Math.sin(C),R=J*Math.cos(C),B=J*Math.sin(C),I=X+F+V*X}let _=Math.max(0,Math.min(1,I/N)),z=0;if(E===0)z=0.5/Z;else if(E===q)z=-0.5/Z;for(let V=0;V<=Z;V++){let C=V/Z,f=C*Math.PI*2,k=Math.sin(f),b=Math.cos(f);D.x=-R*b,D.y=L,D.z=R*k,Y.push(D.x,D.y,D.z),M.set(-R*b,B,R*k),M.normalize(),W.push(M.x,M.y,M.z),H.push(C+z,_)}if(E>0){let V=(E-1)*O;for(let C=0;C<Z;C++){let f=V+C,k=V+C+1,b=E*O+C,e=E*O+C+1;U.push(f,k,b),U.push(k,e,b)}}}this.setIndex(U),this.setAttribute("position",new J9(Y,3)),this.setAttribute("normal",new J9(W,3)),this.setAttribute("uv",new J9(H,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new Y8(J.radius,J.height,J.capSegments,J.radialSegments,J.heightSegments)}}class E7 extends F9{constructor(J=1,Q=32,$=0,Z=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:Q,thetaStart:$,thetaLength:Z},Q=Math.max(3,Q);let K=[],U=[],Y=[],W=[],H=new S,G=new U0;U.push(0,0,0),Y.push(0,0,1),W.push(0.5,0.5);for(let X=0,F=3;X<=Q;X++,F+=3){let N=$+X/Q*Z;H.x=J*Math.cos(N),H.y=J*Math.sin(N),U.push(H.x,H.y,H.z),Y.push(0,0,1),G.x=(U[F]/J+1)/2,G.y=(U[F+1]/J+1)/2,W.push(G.x,G.y)}for(let X=1;X<=Q;X++)K.push(X,X+1,0);this.setIndex(K),this.setAttribute("position",new J9(U,3)),this.setAttribute("normal",new J9(Y,3)),this.setAttribute("uv",new J9(W,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new E7(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class u0 extends F9{constructor(J=1,Q=1,$=1,Z=32,K=1,U=!1,Y=0,W=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:$,radialSegments:Z,heightSegments:K,openEnded:U,thetaStart:Y,thetaLength:W};let H=this;Z=Math.floor(Z),K=Math.floor(K);let G=[],X=[],F=[],N=[],q=0,O=[],M=$/2,D=0;if(E(),U===!1){if(J>0)I(!0);if(Q>0)I(!1)}this.setIndex(G),this.setAttribute("position",new J9(X,3)),this.setAttribute("normal",new J9(F,3)),this.setAttribute("uv",new J9(N,2));function E(){let L=new S,R=new S,B=0,_=(Q-J)/$;for(let z=0;z<=K;z++){let V=[],C=z/K,f=C*(Q-J)+J;for(let k=0;k<=Z;k++){let b=k/Z,e=b*W+Y,v=Math.sin(e),u=Math.cos(e);R.x=f*v,R.y=-C*$+M,R.z=f*u,X.push(R.x,R.y,R.z),L.set(v,_,u).normalize(),F.push(L.x,L.y,L.z),N.push(b,1-C),V.push(q++)}O.push(V)}for(let z=0;z<Z;z++)for(let V=0;V<K;V++){let C=O[V][z],f=O[V+1][z],k=O[V+1][z+1],b=O[V][z+1];if(J>0||V!==0)G.push(C,f,b),B+=3;if(Q>0||V!==K-1)G.push(f,k,b),B+=3}H.addGroup(D,B,0),D+=B}function I(L){let R=q,B=new U0,_=new S,z=0,V=L===!0?J:Q,C=L===!0?1:-1;for(let k=1;k<=Z;k++)X.push(0,M*C,0),F.push(0,C,0),N.push(0.5,0.5),q++;let f=q;for(let k=0;k<=Z;k++){let e=k/Z*W+Y,v=Math.cos(e),u=Math.sin(e);_.x=V*u,_.y=M*C,_.z=V*v,X.push(_.x,_.y,_.z),F.push(0,C,0),B.x=v*0.5+0.5,B.y=u*0.5*C+0.5,N.push(B.x,B.y),q++}for(let k=0;k<Z;k++){let b=R+k,e=f+k;if(L===!0)G.push(e,e+1,b);else G.push(e+1,e,b);z+=3}H.addGroup(D,z,L===!0?1:2),D+=z}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new u0(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class K7 extends u0{constructor(J=1,Q=1,$=32,Z=1,K=!1,U=0,Y=Math.PI*2){super(0,J,Q,$,Z,K,U,Y);this.type="ConeGeometry",this.parameters={radius:J,height:Q,radialSegments:$,heightSegments:Z,openEnded:K,thetaStart:U,thetaLength:Y}}static fromJSON(J){return new K7(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class e$ extends F9{constructor(J=[],Q=[],$=1,Z=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:Q,radius:$,detail:Z};let K=[],U=[];if(Y(Z),H($),G(),this.setAttribute("position",new J9(K,3)),this.setAttribute("normal",new J9(K.slice(),3)),this.setAttribute("uv",new J9(U,2)),Z===0)this.computeVertexNormals();else this.normalizeNormals();function Y(E){let I=new S,L=new S,R=new S;for(let B=0;B<Q.length;B+=3)N(Q[B+0],I),N(Q[B+1],L),N(Q[B+2],R),W(I,L,R,E)}function W(E,I,L,R){let B=R+1,_=[];for(let z=0;z<=B;z++){_[z]=[];let V=E.clone().lerp(L,z/B),C=I.clone().lerp(L,z/B),f=B-z;for(let k=0;k<=f;k++)if(k===0&&z===B)_[z][k]=V;else _[z][k]=V.clone().lerp(C,k/f)}for(let z=0;z<B;z++)for(let V=0;V<2*(B-z)-1;V++){let C=Math.floor(V/2);if(V%2===0)F(_[z][C+1]),F(_[z+1][C]),F(_[z][C]);else F(_[z][C+1]),F(_[z+1][C+1]),F(_[z+1][C])}}function H(E){let I=new S;for(let L=0;L<K.length;L+=3)I.x=K[L+0],I.y=K[L+1],I.z=K[L+2],I.normalize().multiplyScalar(E),K[L+0]=I.x,K[L+1]=I.y,K[L+2]=I.z}function G(){let E=new S;for(let I=0;I<K.length;I+=3){E.x=K[I+0],E.y=K[I+1],E.z=K[I+2];let L=M(E)/2/Math.PI+0.5,R=D(E)/Math.PI+0.5;U.push(L,1-R)}q(),X()}function X(){for(let E=0;E<U.length;E+=6){let I=U[E+0],L=U[E+2],R=U[E+4],B=Math.max(I,L,R),_=Math.min(I,L,R);if(B>0.9&&_<0.1){if(I<0.2)U[E+0]+=1;if(L<0.2)U[E+2]+=1;if(R<0.2)U[E+4]+=1}}}function F(E){K.push(E.x,E.y,E.z)}function N(E,I){let L=E*3;I.x=J[L+0],I.y=J[L+1],I.z=J[L+2]}function q(){let E=new S,I=new S,L=new S,R=new S,B=new U0,_=new U0,z=new U0;for(let V=0,C=0;V<K.length;V+=9,C+=6){E.set(K[V+0],K[V+1],K[V+2]),I.set(K[V+3],K[V+4],K[V+5]),L.set(K[V+6],K[V+7],K[V+8]),B.set(U[C+0],U[C+1]),_.set(U[C+2],U[C+3]),z.set(U[C+4],U[C+5]),R.copy(E).add(I).add(L).divideScalar(3);let f=M(R);O(B,C+0,E,f),O(_,C+2,I,f),O(z,C+4,L,f)}}function O(E,I,L,R){if(R<0&&E.x===1)U[I]=E.x-1;if(L.x===0&&L.z===0)U[I]=R/2/Math.PI+0.5}function M(E){return Math.atan2(E.z,-E.x)}function D(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new e$(J.vertices,J.indices,J.radius,J.detail)}}var I$=new S,C$=new S,sZ=new S,z$=new k7;class w6 extends F9{constructor(J=null,Q=1){super();if(this.type="EdgesGeometry",this.parameters={geometry:J,thresholdAngle:Q},J!==null){let Z=Math.pow(10,4),K=Math.cos(T$*Q),U=J.getIndex(),Y=J.getAttribute("position"),W=U?U.count:Y.count,H=[0,0,0],G=["a","b","c"],X=[,,,],F={},N=[];for(let q=0;q<W;q+=3){if(U)H[0]=U.getX(q),H[1]=U.getX(q+1),H[2]=U.getX(q+2);else H[0]=q,H[1]=q+1,H[2]=q+2;let{a:O,b:M,c:D}=z$;if(O.fromBufferAttribute(Y,H[0]),M.fromBufferAttribute(Y,H[1]),D.fromBufferAttribute(Y,H[2]),z$.getNormal(sZ),X[0]=`${Math.round(O.x*Z)},${Math.round(O.y*Z)},${Math.round(O.z*Z)}`,X[1]=`${Math.round(M.x*Z)},${Math.round(M.y*Z)},${Math.round(M.z*Z)}`,X[2]=`${Math.round(D.x*Z)},${Math.round(D.y*Z)},${Math.round(D.z*Z)}`,X[0]===X[1]||X[1]===X[2]||X[2]===X[0])continue;for(let E=0;E<3;E++){let I=(E+1)%3,L=X[E],R=X[I],B=z$[G[E]],_=z$[G[I]],z=`${L}_${R}`,V=`${R}_${L}`;if(V in F&&F[V]){if(sZ.dot(F[V].normal)<=K)N.push(B.x,B.y,B.z),N.push(_.x,_.y,_.z);F[V]=null}else if(!(z in F))F[z]={index0:H[E],index1:H[I],normal:sZ.clone()}}}for(let q in F)if(F[q]){let{index0:O,index1:M}=F[q];I$.fromBufferAttribute(Y,O),C$.fromBufferAttribute(Y,M),N.push(I$.x,I$.y,I$.z),N.push(C$.x,C$.y,C$.z)}this.setAttribute("position",new J9(N,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}class y7{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){e0("Curve: .getPoint() not implemented.")}getPointAt(J,Q){let $=this.getUtoTmapping(J);return this.getPoint($,Q)}getPoints(J=5){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPoint($/J));return Q}getSpacedPoints(J=5){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPointAt($/J));return Q}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let Q=[],$,Z=this.getPoint(0),K=0;Q.push(0);for(let U=1;U<=J;U++)$=this.getPoint(U/J),K+=$.distanceTo(Z),Q.push(K),Z=$;return this.cacheArcLengths=Q,Q}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,Q=null){let $=this.getLengths(),Z=0,K=$.length,U;if(Q)U=Q;else U=J*$[K-1];let Y=0,W=K-1,H;while(Y<=W)if(Z=Math.floor(Y+(W-Y)/2),H=$[Z]-U,H<0)Y=Z+1;else if(H>0)W=Z-1;else{W=Z;break}if(Z=W,$[Z]===U)return Z/(K-1);let G=$[Z],F=$[Z+1]-G,N=(U-G)/F;return(Z+N)/(K-1)}getTangent(J,Q){let Z=J-0.0001,K=J+0.0001;if(Z<0)Z=0;if(K>1)K=1;let U=this.getPoint(Z),Y=this.getPoint(K),W=Q||(U.isVector2?new U0:new S);return W.copy(Y).sub(U).normalize(),W}getTangentAt(J,Q){let $=this.getUtoTmapping(J);return this.getTangent($,Q)}computeFrenetFrames(J,Q=!1){let $=new S,Z=[],K=[],U=[],Y=new S,W=new j9;for(let N=0;N<=J;N++){let q=N/J;Z[N]=this.getTangentAt(q,new S)}K[0]=new S,U[0]=new S;let H=Number.MAX_VALUE,G=Math.abs(Z[0].x),X=Math.abs(Z[0].y),F=Math.abs(Z[0].z);if(G<=H)H=G,$.set(1,0,0);if(X<=H)H=X,$.set(0,1,0);if(F<=H)$.set(0,0,1);Y.crossVectors(Z[0],$).normalize(),K[0].crossVectors(Z[0],Y),U[0].crossVectors(Z[0],K[0]);for(let N=1;N<=J;N++){if(K[N]=K[N-1].clone(),U[N]=U[N-1].clone(),Y.crossVectors(Z[N-1],Z[N]),Y.length()>Number.EPSILON){Y.normalize();let q=Math.acos(V9(Z[N-1].dot(Z[N]),-1,1));K[N].applyMatrix4(W.makeRotationAxis(Y,q))}U[N].crossVectors(Z[N],K[N])}if(Q===!0){let N=Math.acos(V9(K[0].dot(K[J]),-1,1));if(N/=J,Z[0].dot(Y.crossVectors(K[0],K[J]))>0)N=-N;for(let q=1;q<=J;q++)K[q].applyMatrix4(W.makeRotationAxis(Z[q],N*q)),U[q].crossVectors(Z[q],K[q])}return{tangents:Z,normals:K,binormals:U}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class zQ extends y7{constructor(J=0,Q=0,$=1,Z=1,K=0,U=Math.PI*2,Y=!1,W=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=Q,this.xRadius=$,this.yRadius=Z,this.aStartAngle=K,this.aEndAngle=U,this.aClockwise=Y,this.aRotation=W}getPoint(J,Q=new U0){let $=Q,Z=Math.PI*2,K=this.aEndAngle-this.aStartAngle,U=Math.abs(K)<Number.EPSILON;while(K<0)K+=Z;while(K>Z)K-=Z;if(K<Number.EPSILON)if(U)K=0;else K=Z;if(this.aClockwise===!0&&!U)if(K===Z)K=-Z;else K=K-Z;let Y=this.aStartAngle+J*K,W=this.aX+this.xRadius*Math.cos(Y),H=this.aY+this.yRadius*Math.sin(Y);if(this.aRotation!==0){let G=Math.cos(this.aRotation),X=Math.sin(this.aRotation),F=W-this.aX,N=H-this.aY;W=F*G-N*X+this.aX,H=F*X+N*G+this.aY}return $.set(W,H)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class JU extends zQ{constructor(J,Q,$,Z,K,U){super(J,Q,$,$,Z,K,U);this.isArcCurve=!0,this.type="ArcCurve"}}function QU(){let J=0,Q=0,$=0,Z=0;function K(U,Y,W,H){J=U,Q=W,$=-3*U+3*Y-2*W-H,Z=2*U-2*Y+W+H}return{initCatmullRom:function(U,Y,W,H,G){K(Y,W,G*(W-U),G*(H-Y))},initNonuniformCatmullRom:function(U,Y,W,H,G,X,F){let N=(Y-U)/G-(W-U)/(G+X)+(W-Y)/X,q=(W-Y)/X-(H-Y)/(X+F)+(H-W)/F;N*=X,q*=X,K(Y,W,N,q)},calc:function(U){let Y=U*U,W=Y*U;return J+Q*U+$*Y+Z*W}}}var xY=new S,gY=new S,iZ=new QU,oZ=new QU,aZ=new QU;class T6 extends y7{constructor(J=[],Q=!1,$="centripetal",Z=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=Q,this.curveType=$,this.tension=Z}getPoint(J,Q=new S){let $=Q,Z=this.points,K=Z.length,U=(K-(this.closed?0:1))*J,Y=Math.floor(U),W=U-Y;if(this.closed)Y+=Y>0?0:(Math.floor(Math.abs(Y)/K)+1)*K;else if(W===0&&Y===K-1)Y=K-2,W=1;let H,G;if(this.closed||Y>0)H=Z[(Y-1)%K];else gY.subVectors(Z[0],Z[1]).add(Z[0]),H=gY;let X=Z[Y%K],F=Z[(Y+1)%K];if(this.closed||Y+2<K)G=Z[(Y+2)%K];else xY.subVectors(Z[K-1],Z[K-2]).add(Z[K-1]),G=xY;if(this.curveType==="centripetal"||this.curveType==="chordal"){let N=this.curveType==="chordal"?0.5:0.25,q=Math.pow(H.distanceToSquared(X),N),O=Math.pow(X.distanceToSquared(F),N),M=Math.pow(F.distanceToSquared(G),N);if(O<0.0001)O=1;if(q<0.0001)q=O;if(M<0.0001)M=O;iZ.initNonuniformCatmullRom(H.x,X.x,F.x,G.x,q,O,M),oZ.initNonuniformCatmullRom(H.y,X.y,F.y,G.y,q,O,M),aZ.initNonuniformCatmullRom(H.z,X.z,F.z,G.z,q,O,M)}else if(this.curveType==="catmullrom")iZ.initCatmullRom(H.x,X.x,F.x,G.x,this.tension),oZ.initCatmullRom(H.y,X.y,F.y,G.y,this.tension),aZ.initCatmullRom(H.z,X.z,F.z,G.z,this.tension);return $.set(iZ.calc(W),oZ.calc(W),aZ.calc(W)),$}copy(J){super.copy(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(Z.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,$=this.points.length;Q<$;Q++){let Z=this.points[Q];J.points.push(Z.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(new S().fromArray(Z))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function pY(J,Q,$,Z,K){let U=(Z-Q)*0.5,Y=(K-$)*0.5,W=J*J,H=J*W;return(2*$-2*Z+U+Y)*H+(-3*$+3*Z-2*U-Y)*W+U*J+$}function $G(J,Q){let $=1-J;return $*$*Q}function ZG(J,Q){return 2*(1-J)*J*Q}function KG(J,Q){return J*J*Q}function e6(J,Q,$,Z){return $G(J,Q)+ZG(J,$)+KG(J,Z)}function UG(J,Q){let $=1-J;return $*$*$*Q}function YG(J,Q){let $=1-J;return 3*$*$*J*Q}function WG(J,Q){return 3*(1-J)*J*J*Q}function HG(J,Q){return J*J*J*Q}function JQ(J,Q,$,Z,K){return UG(J,Q)+YG(J,$)+WG(J,Z)+HG(J,K)}class JZ extends y7{constructor(J=new U0,Q=new U0,$=new U0,Z=new U0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=Q,this.v2=$,this.v3=Z}getPoint(J,Q=new U0){let $=Q,Z=this.v0,K=this.v1,U=this.v2,Y=this.v3;return $.set(JQ(J,Z.x,K.x,U.x,Y.x),JQ(J,Z.y,K.y,U.y,Y.y)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class $U extends y7{constructor(J=new S,Q=new S,$=new S,Z=new S){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=Q,this.v2=$,this.v3=Z}getPoint(J,Q=new S){let $=Q,Z=this.v0,K=this.v1,U=this.v2,Y=this.v3;return $.set(JQ(J,Z.x,K.x,U.x,Y.x),JQ(J,Z.y,K.y,U.y,Y.y),JQ(J,Z.z,K.z,U.z,Y.z)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class QZ extends y7{constructor(J=new U0,Q=new U0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=Q}getPoint(J,Q=new U0){let $=Q;if(J===1)$.copy(this.v2);else $.copy(this.v2).sub(this.v1),$.multiplyScalar(J).add(this.v1);return $}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new U0){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class S6 extends y7{constructor(J=new S,Q=new S){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=Q}getPoint(J,Q=new S){let $=Q;if(J===1)$.copy(this.v2);else $.copy(this.v2).sub(this.v1),$.multiplyScalar(J).add(this.v1);return $}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new S){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class $Z extends y7{constructor(J=new U0,Q=new U0,$=new U0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=Q,this.v2=$}getPoint(J,Q=new U0){let $=Q,Z=this.v0,K=this.v1,U=this.v2;return $.set(e6(J,Z.x,K.x,U.x),e6(J,Z.y,K.y,U.y)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class ZZ extends y7{constructor(J=new S,Q=new S,$=new S){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=Q,this.v2=$}getPoint(J,Q=new S){let $=Q,Z=this.v0,K=this.v1,U=this.v2;return $.set(e6(J,Z.x,K.x,U.x),e6(J,Z.y,K.y,U.y),e6(J,Z.z,K.z,U.z)),$}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class KZ extends y7{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,Q=new U0){let $=Q,Z=this.points,K=(Z.length-1)*J,U=Math.floor(K),Y=K-U,W=Z[U===0?U:U-1],H=Z[U],G=Z[U>Z.length-2?Z.length-1:U+1],X=Z[U>Z.length-3?Z.length-1:U+2];return $.set(pY(Y,W.x,H.x,G.x,X.x),pY(Y,W.y,H.y,G.y,X.y)),$}copy(J){super.copy(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,$=this.points.length;Q<$;Q++){let Z=this.points[Q];J.points.push(Z.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,$=J.points.length;Q<$;Q++){let Z=J.points[Q];this.points.push(new U0().fromArray(Z))}return this}}var v$=Object.freeze({__proto__:null,ArcCurve:JU,CatmullRomCurve3:T6,CubicBezierCurve:JZ,CubicBezierCurve3:$U,EllipseCurve:zQ,LineCurve:QZ,LineCurve3:S6,QuadraticBezierCurve:$Z,QuadraticBezierCurve3:ZZ,SplineCurve:KZ});class ZU extends y7{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),Q=this.curves[this.curves.length-1].getPoint(1);if(!J.equals(Q)){let $=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new v$[$](Q,J))}return this}getPoint(J,Q){let $=J*this.getLength(),Z=this.getCurveLengths(),K=0;while(K<Z.length){if(Z[K]>=$){let U=Z[K]-$,Y=this.curves[K],W=Y.getLength(),H=W===0?0:1-U/W;return Y.getPointAt(H,Q)}K++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],Q=0;for(let $=0,Z=this.curves.length;$<Z;$++)Q+=this.curves[$].getLength(),J.push(Q);return this.cacheLengths=J,J}getSpacedPoints(J=40){let Q=[];for(let $=0;$<=J;$++)Q.push(this.getPoint($/J));if(this.autoClose)Q.push(Q[0]);return Q}getPoints(J=12){let Q=[],$;for(let Z=0,K=this.curves;Z<K.length;Z++){let U=K[Z],Y=U.isEllipseCurve?J*2:U.isLineCurve||U.isLineCurve3?1:U.isSplineCurve?J*U.points.length:J,W=U.getPoints(Y);for(let H=0;H<W.length;H++){let G=W[H];if($&&$.equals(G))continue;Q.push(G),$=G}}if(this.autoClose&&Q.length>1&&!Q[Q.length-1].equals(Q[0]))Q.push(Q[0]);return Q}copy(J){super.copy(J),this.curves=[];for(let Q=0,$=J.curves.length;Q<$;Q++){let Z=J.curves[Q];this.curves.push(Z.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let Q=0,$=this.curves.length;Q<$;Q++){let Z=this.curves[Q];J.curves.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let Q=0,$=J.curves.length;Q<$;Q++){let Z=J.curves[Q];this.curves.push(new v$[Z.type]().fromJSON(Z))}return this}}class y$ extends ZU{constructor(J){super();if(this.type="Path",this.currentPoint=new U0,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let Q=1,$=J.length;Q<$;Q++)this.lineTo(J[Q].x,J[Q].y);return this}moveTo(J,Q){return this.currentPoint.set(J,Q),this}lineTo(J,Q){let $=new QZ(this.currentPoint.clone(),new U0(J,Q));return this.curves.push($),this.currentPoint.set(J,Q),this}quadraticCurveTo(J,Q,$,Z){let K=new $Z(this.currentPoint.clone(),new U0(J,Q),new U0($,Z));return this.curves.push(K),this.currentPoint.set($,Z),this}bezierCurveTo(J,Q,$,Z,K,U){let Y=new JZ(this.currentPoint.clone(),new U0(J,Q),new U0($,Z),new U0(K,U));return this.curves.push(Y),this.currentPoint.set(K,U),this}splineThru(J){let Q=[this.currentPoint.clone()].concat(J),$=new KZ(Q);return this.curves.push($),this.currentPoint.copy(J[J.length-1]),this}arc(J,Q,$,Z,K,U){let Y=this.currentPoint.x,W=this.currentPoint.y;return this.absarc(J+Y,Q+W,$,Z,K,U),this}absarc(J,Q,$,Z,K,U){return this.absellipse(J,Q,$,$,Z,K,U),this}ellipse(J,Q,$,Z,K,U,Y,W){let H=this.currentPoint.x,G=this.currentPoint.y;return this.absellipse(J+H,Q+G,$,Z,K,U,Y,W),this}absellipse(J,Q,$,Z,K,U,Y,W){let H=new zQ(J,Q,$,Z,K,U,Y,W);if(this.curves.length>0){let X=H.getPoint(0);if(!X.equals(this.currentPoint))this.lineTo(X.x,X.y)}this.curves.push(H);let G=H.getPoint(1);return this.currentPoint.copy(G),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class n7 extends y${constructor(J){super(J);this.uuid=b8(),this.type="Shape",this.holes=[]}getPointsHoles(J){let Q=[];for(let $=0,Z=this.holes.length;$<Z;$++)Q[$]=this.holes[$].getPoints(J);return Q}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let Q=0,$=J.holes.length;Q<$;Q++){let Z=J.holes[Q];this.holes.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let Q=0,$=this.holes.length;Q<$;Q++){let Z=this.holes[Q];J.holes.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let Q=0,$=J.holes.length;Q<$;Q++){let Z=J.holes[Q];this.holes.push(new y$().fromJSON(Z))}return this}}function GG(J,Q,$=2){let Z=Q&&Q.length,K=Z?Q[0]*$:J.length,U=tW(J,0,K,$,!0),Y=[];if(!U||U.next===U.prev)return Y;let W,H,G;if(Z)U=FG(J,Q,U,$);if(J.length>80*$){W=J[0],H=J[1];let X=W,F=H;for(let N=$;N<K;N+=$){let q=J[N],O=J[N+1];if(q<W)W=q;if(O<H)H=O;if(q>X)X=q;if(O>F)F=O}G=Math.max(X-W,F-H),G=G!==0?32767/G:0}return UQ(U,Y,$,W,H,G,0),Y}function tW(J,Q,$,Z,K){let U;if(K===AG(J,Q,$,Z)>0)for(let Y=Q;Y<$;Y+=Z)U=mY(Y/Z|0,J[Y],J[Y+1],U);else for(let Y=$-Z;Y>=Q;Y-=Z)U=mY(Y/Z|0,J[Y],J[Y+1],U);if(U&&V6(U,U.next))WQ(U),U=U.next;return U}function PJ(J,Q){if(!J)return J;if(!Q)Q=J;let $=J,Z;do if(Z=!1,!$.steiner&&(V6($,$.next)||J7($.prev,$,$.next)===0)){if(WQ($),$=Q=$.prev,$===$.next)break;Z=!0}else $=$.next;while(Z||$!==Q);return Q}function UQ(J,Q,$,Z,K,U,Y){if(!J)return;if(!Y&&U)VG(J,Z,K,U);let W=J;while(J.prev!==J.next){let{prev:H,next:G}=J;if(U?XG(J,Z,K,U):NG(J)){Q.push(H.i,J.i,G.i),WQ(J),J=G.next,W=G.next;continue}if(J=G,J===W){if(!Y)UQ(PJ(J),Q,$,Z,K,U,1);else if(Y===1)J=DG(PJ(J),Q),UQ(J,Q,$,Z,K,U,2);else if(Y===2)qG(J,Q,$,Z,K,U);break}}}function NG(J){let Q=J.prev,$=J,Z=J.next;if(J7(Q,$,Z)>=0)return!1;let K=Q.x,U=$.x,Y=Z.x,W=Q.y,H=$.y,G=Z.y,X=Math.min(K,U,Y),F=Math.min(W,H,G),N=Math.max(K,U,Y),q=Math.max(W,H,G),O=Z.next;while(O!==Q){if(O.x>=X&&O.x<=N&&O.y>=F&&O.y<=q&&t6(K,W,U,H,Y,G,O.x,O.y)&&J7(O.prev,O,O.next)>=0)return!1;O=O.next}return!0}function XG(J,Q,$,Z){let K=J.prev,U=J,Y=J.next;if(J7(K,U,Y)>=0)return!1;let W=K.x,H=U.x,G=Y.x,X=K.y,F=U.y,N=Y.y,q=Math.min(W,H,G),O=Math.min(X,F,N),M=Math.max(W,H,G),D=Math.max(X,F,N),E=JK(q,O,Q,$,Z),I=JK(M,D,Q,$,Z),L=J.prevZ,R=J.nextZ;while(L&&L.z>=E&&R&&R.z<=I){if(L.x>=q&&L.x<=M&&L.y>=O&&L.y<=D&&L!==K&&L!==Y&&t6(W,X,H,F,G,N,L.x,L.y)&&J7(L.prev,L,L.next)>=0)return!1;if(L=L.prevZ,R.x>=q&&R.x<=M&&R.y>=O&&R.y<=D&&R!==K&&R!==Y&&t6(W,X,H,F,G,N,R.x,R.y)&&J7(R.prev,R,R.next)>=0)return!1;R=R.nextZ}while(L&&L.z>=E){if(L.x>=q&&L.x<=M&&L.y>=O&&L.y<=D&&L!==K&&L!==Y&&t6(W,X,H,F,G,N,L.x,L.y)&&J7(L.prev,L,L.next)>=0)return!1;L=L.prevZ}while(R&&R.z<=I){if(R.x>=q&&R.x<=M&&R.y>=O&&R.y<=D&&R!==K&&R!==Y&&t6(W,X,H,F,G,N,R.x,R.y)&&J7(R.prev,R,R.next)>=0)return!1;R=R.nextZ}return!0}function DG(J,Q){let $=J;do{let Z=$.prev,K=$.next.next;if(!V6(Z,K)&&JH(Z,$,$.next,K)&&YQ(Z,K)&&YQ(K,Z))Q.push(Z.i,$.i,K.i),WQ($),WQ($.next),$=J=K;$=$.next}while($!==J);return PJ($)}function qG(J,Q,$,Z,K,U){let Y=J;do{let W=Y.next.next;while(W!==Y.prev){if(Y.i!==W.i&&IG(Y,W)){let H=QH(Y,W);Y=PJ(Y,Y.next),H=PJ(H,H.next),UQ(Y,Q,$,Z,K,U,0),UQ(H,Q,$,Z,K,U,0);return}W=W.next}Y=Y.next}while(Y!==J)}function FG(J,Q,$,Z){let K=[];for(let U=0,Y=Q.length;U<Y;U++){let W=Q[U]*Z,H=U<Y-1?Q[U+1]*Z:J.length,G=tW(J,W,H,Z,!1);if(G===G.next)G.steiner=!0;K.push(BG(G))}K.sort(EG);for(let U=0;U<K.length;U++)$=OG(K[U],$);return $}function EG(J,Q){let $=J.x-Q.x;if($===0){if($=J.y-Q.y,$===0){let Z=(J.next.y-J.y)/(J.next.x-J.x),K=(Q.next.y-Q.y)/(Q.next.x-Q.x);$=Z-K}}return $}function OG(J,Q){let $=RG(J,Q);if(!$)return Q;let Z=QH($,J);return PJ(Z,Z.next),PJ($,$.next)}function RG(J,Q){let $=Q,Z=J.x,K=J.y,U=-1/0,Y;if(V6(J,$))return $;do{if(V6(J,$.next))return $.next;else if(K<=$.y&&K>=$.next.y&&$.next.y!==$.y){let F=$.x+(K-$.y)*($.next.x-$.x)/($.next.y-$.y);if(F<=Z&&F>U){if(U=F,Y=$.x<$.next.x?$:$.next,F===Z)return Y}}$=$.next}while($!==Q);if(!Y)return null;let W=Y,H=Y.x,G=Y.y,X=1/0;$=Y;do{if(Z>=$.x&&$.x>=H&&Z!==$.x&&eW(K<G?Z:U,K,H,G,K<G?U:Z,K,$.x,$.y)){let F=Math.abs(K-$.y)/(Z-$.x);if(YQ($,J)&&(F<X||F===X&&($.x>Y.x||$.x===Y.x&&MG(Y,$))))Y=$,X=F}$=$.next}while($!==W);return Y}function MG(J,Q){return J7(J.prev,J,Q.prev)<0&&J7(Q.next,J,J.next)<0}function VG(J,Q,$,Z){let K=J;do{if(K.z===0)K.z=JK(K.x,K.y,Q,$,Z);K.prevZ=K.prev,K.nextZ=K.next,K=K.next}while(K!==J);K.prevZ.nextZ=null,K.prevZ=null,_G(K)}function _G(J){let Q,$=1;do{let Z=J,K;J=null;let U=null;Q=0;while(Z){Q++;let Y=Z,W=0;for(let G=0;G<$;G++)if(W++,Y=Y.nextZ,!Y)break;let H=$;while(W>0||H>0&&Y){if(W!==0&&(H===0||!Y||Z.z<=Y.z))K=Z,Z=Z.nextZ,W--;else K=Y,Y=Y.nextZ,H--;if(U)U.nextZ=K;else J=K;K.prevZ=U,U=K}Z=Y}U.nextZ=null,$*=2}while(Q>1);return J}function JK(J,Q,$,Z,K){return J=(J-$)*K|0,Q=(Q-Z)*K|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,Q=(Q|Q<<8)&16711935,Q=(Q|Q<<4)&252645135,Q=(Q|Q<<2)&858993459,Q=(Q|Q<<1)&1431655765,J|Q<<1}function BG(J){let Q=J,$=J;do{if(Q.x<$.x||Q.x===$.x&&Q.y<$.y)$=Q;Q=Q.next}while(Q!==J);return $}function eW(J,Q,$,Z,K,U,Y,W){return(K-Y)*(Q-W)>=(J-Y)*(U-W)&&(J-Y)*(Z-W)>=($-Y)*(Q-W)&&($-Y)*(U-W)>=(K-Y)*(Z-W)}function t6(J,Q,$,Z,K,U,Y,W){return!(J===Y&&Q===W)&&eW(J,Q,$,Z,K,U,Y,W)}function IG(J,Q){return J.next.i!==Q.i&&J.prev.i!==Q.i&&!CG(J,Q)&&(YQ(J,Q)&&YQ(Q,J)&&zG(J,Q)&&(J7(J.prev,J,Q.prev)||J7(J,Q.prev,Q))||V6(J,Q)&&J7(J.prev,J,J.next)>0&&J7(Q.prev,Q,Q.next)>0)}function J7(J,Q,$){return(Q.y-J.y)*($.x-Q.x)-(Q.x-J.x)*($.y-Q.y)}function V6(J,Q){return J.x===Q.x&&J.y===Q.y}function JH(J,Q,$,Z){let K=L$(J7(J,Q,$)),U=L$(J7(J,Q,Z)),Y=L$(J7($,Z,J)),W=L$(J7($,Z,Q));if(K!==U&&Y!==W)return!0;if(K===0&&A$(J,$,Q))return!0;if(U===0&&A$(J,Z,Q))return!0;if(Y===0&&A$($,J,Z))return!0;if(W===0&&A$($,Q,Z))return!0;return!1}function A$(J,Q,$){return Q.x<=Math.max(J.x,$.x)&&Q.x>=Math.min(J.x,$.x)&&Q.y<=Math.max(J.y,$.y)&&Q.y>=Math.min(J.y,$.y)}function L$(J){return J>0?1:J<0?-1:0}function CG(J,Q){let $=J;do{if($.i!==J.i&&$.next.i!==J.i&&$.i!==Q.i&&$.next.i!==Q.i&&JH($,$.next,J,Q))return!0;$=$.next}while($!==J);return!1}function YQ(J,Q){return J7(J.prev,J,J.next)<0?J7(J,Q,J.next)>=0&&J7(J,J.prev,Q)>=0:J7(J,Q,J.prev)<0||J7(J,J.next,Q)<0}function zG(J,Q){let $=J,Z=!1,K=(J.x+Q.x)/2,U=(J.y+Q.y)/2;do{if($.y>U!==$.next.y>U&&$.next.y!==$.y&&K<($.next.x-$.x)*(U-$.y)/($.next.y-$.y)+$.x)Z=!Z;$=$.next}while($!==J);return Z}function QH(J,Q){let $=QK(J.i,J.x,J.y),Z=QK(Q.i,Q.x,Q.y),K=J.next,U=Q.prev;return J.next=Q,Q.prev=J,$.next=K,K.prev=$,Z.next=$,$.prev=Z,U.next=Z,Z.prev=U,Z}function mY(J,Q,$,Z){let K=QK(J,Q,$);if(!Z)K.prev=K,K.next=K;else K.next=Z.next,K.prev=Z,Z.next.prev=K,Z.next=K;return K}function WQ(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function QK(J,Q,$){return{i:J,x:Q,y:$,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function AG(J,Q,$,Z){let K=0;for(let U=Q,Y=$-Z;U<$;U+=Z)K+=(J[Y]-J[U])*(J[U+1]+J[Y+1]),Y=U;return K}class $H{static triangulate(J,Q,$=2){return GG(J,Q,$)}}class R8{static area(J){let Q=J.length,$=0;for(let Z=Q-1,K=0;K<Q;Z=K++)$+=J[Z].x*J[K].y-J[K].x*J[Z].y;return $*0.5}static isClockWise(J){return R8.area(J)<0}static triangulateShape(J,Q){let $=[],Z=[],K=[];uY(J),dY($,J);let U=J.length;Q.forEach(uY);for(let W=0;W<Q.length;W++)Z.push(U),U+=Q[W].length,dY($,Q[W]);let Y=$H.triangulate($,Z);for(let W=0;W<Y.length;W+=3)K.push(Y.slice(W,W+3));return K}}function uY(J){let Q=J.length;if(Q>2&&J[Q-1].equals(J[0]))J.pop()}function dY(J,Q){for(let $=0;$<Q.length;$++)J.push(Q[$].x),J.push(Q[$].y)}class _8 extends F9{constructor(J=new n7([new U0(0.5,0.5),new U0(-0.5,0.5),new U0(-0.5,-0.5),new U0(0.5,-0.5)]),Q={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:Q},J=Array.isArray(J)?J:[J];let $=this,Z=[],K=[];for(let Y=0,W=J.length;Y<W;Y++){let H=J[Y];U(H)}this.setAttribute("position",new J9(Z,3)),this.setAttribute("uv",new J9(K,2)),this.computeVertexNormals();function U(Y){let W=[],H=Q.curveSegments!==void 0?Q.curveSegments:12,G=Q.steps!==void 0?Q.steps:1,X=Q.depth!==void 0?Q.depth:1,F=Q.bevelEnabled!==void 0?Q.bevelEnabled:!0,N=Q.bevelThickness!==void 0?Q.bevelThickness:0.2,q=Q.bevelSize!==void 0?Q.bevelSize:N-0.1,O=Q.bevelOffset!==void 0?Q.bevelOffset:0,M=Q.bevelSegments!==void 0?Q.bevelSegments:3,D=Q.extrudePath,E=Q.UVGenerator!==void 0?Q.UVGenerator:LG,I,L=!1,R,B,_,z;if(D){I=D.getSpacedPoints(G),L=!0,F=!1;let r=D.isCatmullRomCurve3?D.closed:!1;R=D.computeFrenetFrames(G,r),B=new S,_=new S,z=new S}if(!F)M=0,N=0,q=0,O=0;let V=Y.extractPoints(H),C=V.shape,f=V.holes;if(!R8.isClockWise(C)){C=C.reverse();for(let r=0,X0=f.length;r<X0;r++){let O0=f[r];if(R8.isClockWise(O0))f[r]=O0.reverse()}}function b(r){let V0=r[0];for(let L0=1;L0<=r.length;L0++){let s0=L0%r.length,a0=r[s0],Y9=a0.x-V0.x,W9=a0.y-V0.y,y=Y9*Y9+W9*W9,m9=Math.max(Math.abs(a0.x),Math.abs(a0.y),Math.abs(V0.x),Math.abs(V0.y)),O9=0.000000000000000000010000000000000001*m9*m9;if(y<=O9){r.splice(s0,1),L0--;continue}V0=a0}}b(C),f.forEach(b);let e=f.length,v=C;for(let r=0;r<e;r++){let X0=f[r];C=C.concat(X0)}function u(r,X0,O0){if(!X0)Z9("ExtrudeGeometry: vec does not exist");return r.clone().addScaledVector(X0,O0)}let Q0=C.length;function l(r,X0,O0){let V0,L0,s0,a0=r.x-X0.x,Y9=r.y-X0.y,W9=O0.x-r.x,y=O0.y-r.y,m9=a0*a0+Y9*Y9,O9=a0*y-Y9*W9;if(Math.abs(O9)>Number.EPSILON){let B9=Math.sqrt(m9),w=Math.sqrt(W9*W9+y*y),A=X0.x-Y9/B9,h=X0.y+a0/B9,o=O0.x-y/w,q0=O0.y+W9/w,B0=((o-A)*y-(q0-h)*W9)/(a0*y-Y9*W9);V0=A+a0*B0-r.x,L0=h+Y9*B0-r.y;let w0=V0*V0+L0*L0;if(w0<=2)return new U0(V0,L0);else s0=Math.sqrt(w0/2)}else{let B9=!1;if(a0>Number.EPSILON){if(W9>Number.EPSILON)B9=!0}else if(a0<-Number.EPSILON){if(W9<-Number.EPSILON)B9=!0}else if(Math.sign(Y9)===Math.sign(y))B9=!0;if(B9)V0=-Y9,L0=a0,s0=Math.sqrt(m9);else V0=a0,L0=Y9,s0=Math.sqrt(m9/2)}return new U0(V0/s0,L0/s0)}let D0=[];for(let r=0,X0=v.length,O0=X0-1,V0=r+1;r<X0;r++,O0++,V0++){if(O0===X0)O0=0;if(V0===X0)V0=0;D0[r]=l(v[r],v[O0],v[V0])}let t=[],p,J0=D0.concat();for(let r=0,X0=e;r<X0;r++){let O0=f[r];p=[];for(let V0=0,L0=O0.length,s0=L0-1,a0=V0+1;V0<L0;V0++,s0++,a0++){if(s0===L0)s0=0;if(a0===L0)a0=0;p[V0]=l(O0[V0],O0[s0],O0[a0])}t.push(p),J0=J0.concat(p)}let M0;if(M===0)M0=R8.triangulateShape(v,f);else{let r=[],X0=[];for(let O0=0;O0<M;O0++){let V0=O0/M,L0=N*Math.cos(V0*Math.PI/2),s0=q*Math.sin(V0*Math.PI/2)+O;for(let a0=0,Y9=v.length;a0<Y9;a0++){let W9=u(v[a0],D0[a0],s0);if(K0(W9.x,W9.y,-L0),V0===0)r.push(W9)}for(let a0=0,Y9=e;a0<Y9;a0++){let W9=f[a0];p=t[a0];let y=[];for(let m9=0,O9=W9.length;m9<O9;m9++){let B9=u(W9[m9],p[m9],s0);if(K0(B9.x,B9.y,-L0),V0===0)y.push(B9)}if(V0===0)X0.push(y)}}M0=R8.triangulateShape(r,X0)}let A0=M0.length,_0=q+O;for(let r=0;r<Q0;r++){let X0=F?u(C[r],J0[r],_0):C[r];if(!L)K0(X0.x,X0.y,0);else _.copy(R.normals[0]).multiplyScalar(X0.x),B.copy(R.binormals[0]).multiplyScalar(X0.y),z.copy(I[0]).add(_).add(B),K0(z.x,z.y,z.z)}for(let r=1;r<=G;r++)for(let X0=0;X0<Q0;X0++){let O0=F?u(C[X0],J0[X0],_0):C[X0];if(!L)K0(O0.x,O0.y,X/G*r);else _.copy(R.normals[r]).multiplyScalar(O0.x),B.copy(R.binormals[r]).multiplyScalar(O0.y),z.copy(I[r]).add(_).add(B),K0(z.x,z.y,z.z)}for(let r=M-1;r>=0;r--){let X0=r/M,O0=N*Math.cos(X0*Math.PI/2),V0=q*Math.sin(X0*Math.PI/2)+O;for(let L0=0,s0=v.length;L0<s0;L0++){let a0=u(v[L0],D0[L0],V0);K0(a0.x,a0.y,X+O0)}for(let L0=0,s0=f.length;L0<s0;L0++){let a0=f[L0];p=t[L0];for(let Y9=0,W9=a0.length;Y9<W9;Y9++){let y=u(a0[Y9],p[Y9],V0);if(!L)K0(y.x,y.y,X+O0);else K0(y.x,y.y+I[G-1].y,I[G-1].x+O0)}}}E0(),i();function E0(){let r=Z.length/3;if(F){let X0=0,O0=Q0*X0;for(let V0=0;V0<A0;V0++){let L0=M0[V0];m(L0[2]+O0,L0[1]+O0,L0[0]+O0)}X0=G+M*2,O0=Q0*X0;for(let V0=0;V0<A0;V0++){let L0=M0[V0];m(L0[0]+O0,L0[1]+O0,L0[2]+O0)}}else{for(let X0=0;X0<A0;X0++){let O0=M0[X0];m(O0[2],O0[1],O0[0])}for(let X0=0;X0<A0;X0++){let O0=M0[X0];m(O0[0]+Q0*G,O0[1]+Q0*G,O0[2]+Q0*G)}}$.addGroup(r,Z.length/3-r,0)}function i(){let r=Z.length/3,X0=0;N0(v,X0),X0+=v.length;for(let O0=0,V0=f.length;O0<V0;O0++){let L0=f[O0];N0(L0,X0),X0+=L0.length}$.addGroup(r,Z.length/3-r,1)}function N0(r,X0){let O0=r.length;while(--O0>=0){let V0=O0,L0=O0-1;if(L0<0)L0=r.length-1;for(let s0=0,a0=G+M*2;s0<a0;s0++){let Y9=Q0*s0,W9=Q0*(s0+1),y=X0+V0+Y9,m9=X0+L0+Y9,O9=X0+L0+W9,B9=X0+V0+W9;C0(y,m9,O9,B9)}}}function K0(r,X0,O0){W.push(r),W.push(X0),W.push(O0)}function m(r,X0,O0){s(r),s(X0),s(O0);let V0=Z.length/3,L0=E.generateTopUV($,Z,V0-3,V0-2,V0-1);h0(L0[0]),h0(L0[1]),h0(L0[2])}function C0(r,X0,O0,V0){s(r),s(X0),s(V0),s(X0),s(O0),s(V0);let L0=Z.length/3,s0=E.generateSideWallUV($,Z,L0-6,L0-3,L0-2,L0-1);h0(s0[0]),h0(s0[1]),h0(s0[3]),h0(s0[1]),h0(s0[2]),h0(s0[3])}function s(r){Z.push(W[r*3+0]),Z.push(W[r*3+1]),Z.push(W[r*3+2])}function h0(r){K.push(r.x),K.push(r.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),Q=this.parameters.shapes,$=this.parameters.options;return PG(Q,$,J)}static fromJSON(J,Q){let $=[];for(let K=0,U=J.shapes.length;K<U;K++){let Y=Q[J.shapes[K]];$.push(Y)}let Z=J.options.extrudePath;if(Z!==void 0)J.options.extrudePath=new v$[Z.type]().fromJSON(Z);return new _8($,J.options)}}var LG={generateTopUV:function(J,Q,$,Z,K){let U=Q[$*3],Y=Q[$*3+1],W=Q[Z*3],H=Q[Z*3+1],G=Q[K*3],X=Q[K*3+1];return[new U0(U,Y),new U0(W,H),new U0(G,X)]},generateSideWallUV:function(J,Q,$,Z,K,U){let Y=Q[$*3],W=Q[$*3+1],H=Q[$*3+2],G=Q[Z*3],X=Q[Z*3+1],F=Q[Z*3+2],N=Q[K*3],q=Q[K*3+1],O=Q[K*3+2],M=Q[U*3],D=Q[U*3+1],E=Q[U*3+2];if(Math.abs(W-X)<Math.abs(Y-G))return[new U0(Y,1-H),new U0(G,1-F),new U0(N,1-O),new U0(M,1-E)];else return[new U0(W,1-H),new U0(X,1-F),new U0(q,1-O),new U0(D,1-E)]}};function PG(J,Q,$){if($.shapes=[],Array.isArray(J))for(let Z=0,K=J.length;Z<K;Z++){let U=J[Z];$.shapes.push(U.uuid)}else $.shapes.push(J.uuid);if($.options=Object.assign({},Q),Q.extrudePath!==void 0)$.options.extrudePath=Q.extrudePath.toJSON();return $}class AQ extends e${constructor(J=1,Q=0){let $=(1+Math.sqrt(5))/2,Z=[-1,$,0,1,$,0,-1,-$,0,1,-$,0,0,-1,$,0,1,$,0,-1,-$,0,1,-$,$,0,-1,$,0,1,-$,0,-1,-$,0,1],K=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(Z,K,J,Q);this.type="IcosahedronGeometry",this.parameters={radius:J,detail:Q}}static fromJSON(J){return new AQ(J.radius,J.detail)}}class E9 extends F9{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let K=J/2,U=Q/2,Y=Math.floor($),W=Math.floor(Z),H=Y+1,G=W+1,X=J/Y,F=Q/W,N=[],q=[],O=[],M=[];for(let D=0;D<G;D++){let E=D*F-U;for(let I=0;I<H;I++){let L=I*X-K;q.push(L,-E,0),O.push(0,0,1),M.push(I/Y),M.push(1-D/W)}}for(let D=0;D<W;D++)for(let E=0;E<Y;E++){let I=E+H*D,L=E+H*(D+1),R=E+1+H*(D+1),B=E+1+H*D;N.push(I,L,B),N.push(L,R,B)}this.setIndex(N),this.setAttribute("position",new J9(q,3)),this.setAttribute("normal",new J9(O,3)),this.setAttribute("uv",new J9(M,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new E9(J.width,J.height,J.widthSegments,J.heightSegments)}}class LQ extends F9{constructor(J=0.5,Q=1,$=32,Z=1,K=0,U=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:Q,thetaSegments:$,phiSegments:Z,thetaStart:K,thetaLength:U},$=Math.max(3,$),Z=Math.max(1,Z);let Y=[],W=[],H=[],G=[],X=J,F=(Q-J)/Z,N=new S,q=new U0;for(let O=0;O<=Z;O++){for(let M=0;M<=$;M++){let D=K+M/$*U;N.x=X*Math.cos(D),N.y=X*Math.sin(D),W.push(N.x,N.y,N.z),H.push(0,0,1),q.x=(N.x/Q+1)/2,q.y=(N.y/Q+1)/2,G.push(q.x,q.y)}X+=F}for(let O=0;O<Z;O++){let M=O*($+1);for(let D=0;D<$;D++){let E=D+M,I=E,L=E+$+1,R=E+$+2,B=E+1;Y.push(I,L,B),Y.push(L,R,B)}}this.setIndex(Y),this.setAttribute("position",new J9(W,3)),this.setAttribute("normal",new J9(H,3)),this.setAttribute("uv",new J9(G,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new LQ(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class PQ extends F9{constructor(J=new n7([new U0(0,0.5),new U0(-0.5,-0.5),new U0(0.5,-0.5)]),Q=12){super();this.type="ShapeGeometry",this.parameters={shapes:J,curveSegments:Q};let $=[],Z=[],K=[],U=[],Y=0,W=0;if(Array.isArray(J)===!1)H(J);else for(let G=0;G<J.length;G++)H(J[G]),this.addGroup(Y,W,G),Y+=W,W=0;this.setIndex($),this.setAttribute("position",new J9(Z,3)),this.setAttribute("normal",new J9(K,3)),this.setAttribute("uv",new J9(U,2));function H(G){let X=Z.length/3,F=G.extractPoints(Q),N=F.shape,q=F.holes;if(R8.isClockWise(N)===!1)N=N.reverse();for(let M=0,D=q.length;M<D;M++){let E=q[M];if(R8.isClockWise(E)===!0)q[M]=E.reverse()}let O=R8.triangulateShape(N,q);for(let M=0,D=q.length;M<D;M++){let E=q[M];N=N.concat(E)}for(let M=0,D=N.length;M<D;M++){let E=N[M];Z.push(E.x,E.y,0),K.push(0,0,1),U.push(E.x,E.y)}for(let M=0,D=O.length;M<D;M++){let E=O[M],I=E[0]+X,L=E[1]+X,R=E[2]+X;$.push(I,L,R),W+=3}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),Q=this.parameters.shapes;return wG(Q,J)}static fromJSON(J,Q){let $=[];for(let Z=0,K=J.shapes.length;Z<K;Z++){let U=Q[J.shapes[Z]];$.push(U)}return new PQ($,J.curveSegments)}}function wG(J,Q){if(Q.shapes=[],Array.isArray(J))for(let $=0,Z=J.length;$<Z;$++){let K=J[$];Q.shapes.push(K.uuid)}else Q.shapes.push(J.uuid);return Q}class $9 extends F9{constructor(J=1,Q=32,$=16,Z=0,K=Math.PI*2,U=0,Y=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:Q,heightSegments:$,phiStart:Z,phiLength:K,thetaStart:U,thetaLength:Y},Q=Math.max(3,Math.floor(Q)),$=Math.max(2,Math.floor($));let W=Math.min(U+Y,Math.PI),H=0,G=[],X=new S,F=new S,N=[],q=[],O=[],M=[];for(let D=0;D<=$;D++){let E=[],I=D/$,L=U+I*Y,R=J*Math.cos(L),B=Math.sqrt(J*J-R*R),_=0;if(D===0&&U===0)_=0.5/Q;else if(D===$&&W===Math.PI)_=-0.5/Q;for(let z=0;z<=Q;z++){let V=z/Q,C=Z+V*K;X.x=-B*Math.cos(C),X.y=R,X.z=B*Math.sin(C),q.push(X.x,X.y,X.z),F.copy(X).normalize(),O.push(F.x,F.y,F.z),M.push(V+_,1-I),E.push(H++)}G.push(E)}for(let D=0;D<$;D++)for(let E=0;E<Q;E++){let I=G[D][E+1],L=G[D][E],R=G[D+1][E],B=G[D+1][E+1];if(D!==0||U>0)N.push(I,L,B);if(D!==$-1||W<Math.PI)N.push(L,R,B)}this.setIndex(N),this.setAttribute("position",new J9(q,3)),this.setAttribute("normal",new J9(O,3)),this.setAttribute("uv",new J9(M,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new $9(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class L7 extends F9{constructor(J=1,Q=0.4,$=12,Z=48,K=Math.PI*2,U=0,Y=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:Q,radialSegments:$,tubularSegments:Z,arc:K,thetaStart:U,thetaLength:Y},$=Math.floor($),Z=Math.floor(Z);let W=[],H=[],G=[],X=[],F=new S,N=new S,q=new S;for(let O=0;O<=$;O++){let M=U+O/$*Y;for(let D=0;D<=Z;D++){let E=D/Z*K;N.x=(J+Q*Math.cos(M))*Math.cos(E),N.y=(J+Q*Math.cos(M))*Math.sin(E),N.z=Q*Math.sin(M),H.push(N.x,N.y,N.z),F.x=J*Math.cos(E),F.y=J*Math.sin(E),q.subVectors(N,F).normalize(),G.push(q.x,q.y,q.z),X.push(D/Z),X.push(O/$)}}for(let O=1;O<=$;O++)for(let M=1;M<=Z;M++){let D=(Z+1)*O+M-1,E=(Z+1)*(O-1)+M-1,I=(Z+1)*(O-1)+M,L=(Z+1)*O+M;W.push(D,E,L),W.push(E,I,L)}this.setIndex(W),this.setAttribute("position",new J9(H,3)),this.setAttribute("normal",new J9(G,3)),this.setAttribute("uv",new J9(X,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new L7(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc,J.thetaStart,J.thetaLength)}}class W8 extends F9{constructor(J=new ZZ(new S(-1,-1,0),new S(-1,1,0),new S(1,1,0)),Q=64,$=1,Z=8,K=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:Q,radius:$,radialSegments:Z,closed:K};let U=J.computeFrenetFrames(Q,K);this.tangents=U.tangents,this.normals=U.normals,this.binormals=U.binormals;let Y=new S,W=new S,H=new U0,G=new S,X=[],F=[],N=[],q=[];O(),this.setIndex(q),this.setAttribute("position",new J9(X,3)),this.setAttribute("normal",new J9(F,3)),this.setAttribute("uv",new J9(N,2));function O(){for(let I=0;I<Q;I++)M(I);M(K===!1?Q:0),E(),D()}function M(I){G=J.getPointAt(I/Q,G);let L=U.normals[I],R=U.binormals[I];for(let B=0;B<=Z;B++){let _=B/Z*Math.PI*2,z=Math.sin(_),V=-Math.cos(_);W.x=V*L.x+z*R.x,W.y=V*L.y+z*R.y,W.z=V*L.z+z*R.z,W.normalize(),F.push(W.x,W.y,W.z),Y.x=G.x+$*W.x,Y.y=G.y+$*W.y,Y.z=G.z+$*W.z,X.push(Y.x,Y.y,Y.z)}}function D(){for(let I=1;I<=Q;I++)for(let L=1;L<=Z;L++){let R=(Z+1)*(I-1)+(L-1),B=(Z+1)*I+(L-1),_=(Z+1)*I+L,z=(Z+1)*(I-1)+L;q.push(R,B,z),q.push(B,_,z)}}function E(){for(let I=0;I<=Q;I++)for(let L=0;L<=Z;L++)H.x=I/Q,H.y=L/Z,N.push(H.x,H.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new W8(new v$[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class wQ extends F9{constructor(J=null){super();if(this.type="WireframeGeometry",this.parameters={geometry:J},J!==null){let Q=[],$=new Set,Z=new S,K=new S;if(J.index!==null){let U=J.attributes.position,Y=J.index,W=J.groups;if(W.length===0)W=[{start:0,count:Y.count,materialIndex:0}];for(let H=0,G=W.length;H<G;++H){let X=W[H],F=X.start,N=X.count;for(let q=F,O=F+N;q<O;q+=3)for(let M=0;M<3;M++){let D=Y.getX(q+M),E=Y.getX(q+(M+1)%3);if(Z.fromBufferAttribute(U,D),K.fromBufferAttribute(U,E),lY(Z,K,$)===!0)Q.push(Z.x,Z.y,Z.z),Q.push(K.x,K.y,K.z)}}}else{let U=J.attributes.position;for(let Y=0,W=U.count/3;Y<W;Y++)for(let H=0;H<3;H++){let G=3*Y+H,X=3*Y+(H+1)%3;if(Z.fromBufferAttribute(U,G),K.fromBufferAttribute(U,X),lY(Z,K,$)===!0)Q.push(Z.x,Z.y,Z.z),Q.push(K.x,K.y,K.z)}}this.setAttribute("position",new J9(Q,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}function lY(J,Q,$){let Z=`${J.x},${J.y},${J.z}-${Q.x},${Q.y},${Q.z}`,K=`${Q.x},${Q.y},${Q.z}-${J.x},${J.y},${J.z}`;if($.has(Z)===!0||$.has(K)===!0)return!1;else return $.add(Z),$.add(K),!0}function hJ(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let K=J[$][Z];if(cY(K))if(K.isRenderTargetTexture)e0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=K.clone();else if(Array.isArray(K))if(cY(K[0])){let U=[];for(let Y=0,W=K.length;Y<W;Y++)U[Y]=K[Y].clone();Q[$][Z]=U}else Q[$][Z]=K.slice();else Q[$][Z]=K}}return Q}function P7(J){let Q={};for(let $=0;$<J.length;$++){let Z=hJ(J[$]);for(let K in Z)Q[K]=Z[K]}return Q}function cY(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function TG(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function KU(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return M9.workingColorSpace}var H8={clone:hJ,merge:P7},SG=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kG=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class v9 extends Z8{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=SG,this.fragmentShader=kG,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=hJ(J.uniforms),this.uniformsGroups=TG(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let U=this.uniforms[Z].value;if(U&&U.isTexture)Q.uniforms[Z]={type:"t",value:U.toJSON(J).uuid};else if(U&&U.isColor)Q.uniforms[Z]={type:"c",value:U.getHex()};else if(U&&U.isVector2)Q.uniforms[Z]={type:"v2",value:U.toArray()};else if(U&&U.isVector3)Q.uniforms[Z]={type:"v3",value:U.toArray()};else if(U&&U.isVector4)Q.uniforms[Z]={type:"v4",value:U.toArray()};else if(U&&U.isMatrix3)Q.uniforms[Z]={type:"m3",value:U.toArray()};else if(U&&U.isMatrix4)Q.uniforms[Z]={type:"m4",value:U.toArray()};else Q.uniforms[Z]={value:U}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let Z=J.uniforms[$];switch(this.uniforms[$]={},Z.type){case"t":this.uniforms[$].value=Q[Z.value]||null;break;case"c":this.uniforms[$].value=new W0().setHex(Z.value);break;case"v2":this.uniforms[$].value=new U0().fromArray(Z.value);break;case"v3":this.uniforms[$].value=new S().fromArray(Z.value);break;case"v4":this.uniforms[$].value=new r9().fromArray(Z.value);break;case"m3":this.uniforms[$].value=new U9().fromArray(Z.value);break;case"m4":this.uniforms[$].value=new j9().fromArray(Z.value);break;default:this.uniforms[$].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class TQ extends v9{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class X9 extends Z8{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new W0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new x8,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class l8 extends X9{constructor(J){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new U0(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return V9(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(Q){this.ior=(1+0.4*Q)/(1-0.4*Q)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new W0(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new W0(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new W0(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(J)}get anisotropy(){return this._anisotropy}set anisotropy(J){if(this._anisotropy>0!==J>0)this.version++;this._anisotropy=J}get clearcoat(){return this._clearcoat}set clearcoat(J){if(this._clearcoat>0!==J>0)this.version++;this._clearcoat=J}get iridescence(){return this._iridescence}set iridescence(J){if(this._iridescence>0!==J>0)this.version++;this._iridescence=J}get dispersion(){return this._dispersion}set dispersion(J){if(this._dispersion>0!==J>0)this.version++;this._dispersion=J}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(J){if(this._retroreflectivity>0!==J>0)this.version++;this._retroreflectivity=J}get sheen(){return this._sheen}set sheen(J){if(this._sheen>0!==J>0)this.version++;this._sheen=J}get transmission(){return this._transmission}set transmission(J){if(this._transmission>0!==J>0)this.version++;this._transmission=J}copy(J){return super.copy(J),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=J.anisotropy,this.anisotropyRotation=J.anisotropyRotation,this.anisotropyMap=J.anisotropyMap,this.clearcoat=J.clearcoat,this.clearcoatMap=J.clearcoatMap,this.clearcoatRoughness=J.clearcoatRoughness,this.clearcoatRoughnessMap=J.clearcoatRoughnessMap,this.clearcoatNormalMap=J.clearcoatNormalMap,this.clearcoatNormalScale.copy(J.clearcoatNormalScale),this.dispersion=J.dispersion,this.ior=J.ior,this.iridescence=J.iridescence,this.iridescenceMap=J.iridescenceMap,this.iridescenceIOR=J.iridescenceIOR,this.iridescenceThicknessRange=[...J.iridescenceThicknessRange],this.iridescenceThicknessMap=J.iridescenceThicknessMap,this.retroreflectivity=J.retroreflectivity,this.sheen=J.sheen,this.sheenColor.copy(J.sheenColor),this.sheenColorMap=J.sheenColorMap,this.sheenRoughness=J.sheenRoughness,this.sheenRoughnessMap=J.sheenRoughnessMap,this.transmission=J.transmission,this.transmissionMap=J.transmissionMap,this.thickness=J.thickness,this.thicknessMap=J.thicknessMap,this.attenuationDistance=J.attenuationDistance,this.attenuationColor.copy(J.attenuationColor),this.specularIntensity=J.specularIntensity,this.specularIntensityMap=J.specularIntensityMap,this.specularColor.copy(J.specularColor),this.specularColorMap=J.specularColorMap,this}}class RJ extends Z8{constructor(J){super();this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new W0(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new U0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.gradientMap=J.gradientMap,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.alphaMap=J.alphaMap,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}class SQ extends Z8{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class UU extends Z8{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}class UZ extends fJ{constructor(J){super();this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(J)}copy(J){return super.copy(J),this.scale=J.scale,this.dashSize=J.dashSize,this.gapSize=J.gapSize,this}}function F6(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}function rZ(J){return J!==void 0&&J.inTangents!==void 0&&J.outTangents!==void 0}class xJ{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],K=Q[$-1];$:{J:{let U;Q:{Z:if(!(J<Z)){for(let Y=$+2;;){if(Z===void 0){if(J<K)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===Y)break;if(K=Z,Z=Q[++$],J<Z)break J}U=Q.length;break Q}if(!(J>=K)){let Y=Q[1];if(J<Y)$=2,K=Y;for(let W=$-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===W)break;if(Z=K,K=Q[--$-1],J>=K)break J}U=$,$=0;break Q}break $}while($<U){let Y=$+U>>>1;if(J<Q[Y])U=Y;else $=Y+1}if(Z=Q[$],K=Q[$-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,K,Z)}return this.interpolate_($,K,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,K=J*Z;for(let U=0;U!==Z;++U)Q[U]=$[K+U];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class YU extends xJ{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,K=J-2,U=J+1,Y=Z[K],W=Z[U];if(Y===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,Y=2*Q-$;break;case 2402:K=Z.length-2,Y=Q+Z[K]-Z[K+1];break;default:K=J,Y=$}if(W===void 0)switch(this.getSettings_().endingEnd){case 2401:U=J,W=2*$-Q;break;case 2402:U=1,W=$+Z[1]-Z[0];break;default:U=J-1,W=Q}let H=($-Q)*0.5,G=this.valueSize;this._weightPrev=H/(Q-Y),this._weightNext=H/(W-$),this._offsetPrev=K*G,this._offsetNext=U*G}interpolate_(J,Q,$,Z){let K=this.resultBuffer,U=this.sampleValues,Y=this.valueSize,W=J*Y,H=W-Y,G=this._offsetPrev,X=this._offsetNext,F=this._weightPrev,N=this._weightNext,q=($-Q)/(Z-Q),O=q*q,M=O*q,D=-F*M+2*F*O-F*q,E=(1+F)*M+(-1.5-2*F)*O+(-0.5+F)*q+1,I=(-1-N)*M+(1.5+N)*O+0.5*q,L=N*M-N*O;for(let R=0;R!==Y;++R)K[R]=D*U[G+R]+E*U[H+R]+I*U[W+R]+L*U[X+R];return K}}class WU extends xJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let K=this.resultBuffer,U=this.sampleValues,Y=this.valueSize,W=J*Y,H=W-Y,G=($-Q)/(Z-Q),X=1-G;for(let F=0;F!==Y;++F)K[F]=U[H+F]*X+U[W+F]*G;return K}}class HU extends xJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class GU extends xJ{interpolate_(J,Q,$,Z){let K=this.resultBuffer,U=this.sampleValues,Y=this.valueSize,W=J*Y,H=W-Y,G=this.inTangents,X=this.outTangents;if(!G||!X){let q=($-Q)/(Z-Q),O=1-q;for(let M=0;M!==Y;++M)K[M]=U[H+M]*O+U[W+M]*q;return K}let F=Y*2,N=J-1;for(let q=0;q!==Y;++q){let O=U[H+q],M=U[W+q],D=N*F+q*2,E=X[D],I=X[D+1],L=J*F+q*2,R=G[L],B=G[L+1],_=vG($,Q,E,R,Z);K[q]=ZH(_,O,I,B,M)}return K}}function ZH(J,Q,$,Z,K){let U=1-J;return U*U*U*Q+3*U*U*J*$+3*U*J*J*Z+J*J*J*K}function jG(J,Q,$,Z,K){let U=1-J;return 3*U*U*($-Q)+6*U*J*(Z-$)+3*J*J*(K-Z)}function vG(J,Q,$,Z,K){let U=(J-Q)/(K-Q);for(let Y=0;Y<8;Y++){let W=ZH(U,Q,$,Z,K)-J;if(Math.abs(W)<0.0000000001)break;let H=jG(U,Q,$,Z,K);if(Math.abs(H)<0.0000000001)break;U=Math.max(0,Math.min(1,U-W/H))}return U}class s7{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=F6(Q,this.TimeBufferType),this.values=F6($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:F6(J.times,Array),values:F6(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z;if(rZ(J.settings))$.settings={inTangents:F6(J.settings.inTangents,Array),outTangents:F6(J.settings.outTangents,Array)}}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new HU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new WU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new YU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new GU(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return e0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J;if(rZ(this.settings))nY(this.settings.inTangents,J),nY(this.settings.outTangents,J)}return this}trim(J,Q){let $=this.times,Z=$.length,K=0,U=Z-1;while(K!==Z&&$[K]<J)++K;while(U!==-1&&$[U]>Q)--U;if(++U,K!==0||U!==Z){if(K>=U)U=Math.max(U,1),K=U-1;let Y=this.getValueSize();this.times=$.slice(K,U),this.values=this.values.slice(K*Y,U*Y)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)Z9("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,K=$.length;if(K===0)Z9("KeyframeTrack: Track is empty.",this),J=!1;let U=null;for(let Y=0;Y!==K;Y++){let W=$[Y];if(typeof W==="number"&&isNaN(W)){Z9("KeyframeTrack: Time is not a valid number.",this,Y,W),J=!1;break}if(U!==null&&U>W){Z9("KeyframeTrack: Out of order keys.",this,Y,W,U),J=!1;break}U=W}if(Z!==void 0){if(f5(Z))for(let Y=0,W=Z.length;Y!==W;++Y){let H=Z[Y];if(isNaN(H)){Z9("KeyframeTrack: Value is not a valid number.",this,Y,H),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,K=J.length-1,U=1;for(let Y=1;Y<K;++Y){let W=!1,H=J[Y],G=J[Y+1];if(H!==G&&(Y!==1||H!==J[0]))if(!Z){let X=Y*$,F=X-$,N=X+$;for(let q=0;q!==$;++q){let O=Q[X+q];if(O!==Q[F+q]||O!==Q[N+q]){W=!0;break}}}else W=!0;if(W){if(Y!==U){J[U]=J[Y];let X=Y*$,F=U*$;for(let N=0;N!==$;++N)Q[F+N]=Q[X+N]}++U}}if(K>0){J[U]=J[K];for(let Y=K*$,W=U*$,H=0;H!==$;++H)Q[W+H]=Q[Y+H];++U}if(U!==J.length)this.times=J.slice(0,U),this.values=Q.slice(0,U*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);if(Z.createInterpolant=this.createInterpolant,rZ(this.settings))Z.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return Z}}function nY(J,Q){for(let $=0,Z=J.length;$!==Z;$+=2)J[$]*=Q}s7.prototype.ValueTypeName="";s7.prototype.TimeBufferType=Float32Array;s7.prototype.ValueBufferType=Float32Array;s7.prototype.DefaultInterpolation=2301;class gJ extends s7{constructor(J,Q,$){super(J,Q,$)}}gJ.prototype.ValueTypeName="bool";gJ.prototype.ValueBufferType=Array;gJ.prototype.DefaultInterpolation=2300;gJ.prototype.InterpolantFactoryMethodLinear=void 0;gJ.prototype.InterpolantFactoryMethodSmooth=void 0;class NU extends s7{constructor(J,Q,$,Z){super(J,Q,$,Z)}}NU.prototype.ValueTypeName="color";class XU extends s7{constructor(J,Q,$,Z){super(J,Q,$,Z)}}XU.prototype.ValueTypeName="number";class DU extends xJ{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let K=this.resultBuffer,U=this.sampleValues,Y=this.valueSize,W=($-Q)/(Z-Q),H=J*Y;for(let G=H+Y;H!==G;H+=4)u8.slerpFlat(K,0,U,H-Y,U,H,W);return K}}class YZ extends s7{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new DU(this.times,this.values,this.getValueSize(),J)}}YZ.prototype.ValueTypeName="quaternion";YZ.prototype.InterpolantFactoryMethodSmooth=void 0;class pJ extends s7{constructor(J,Q,$){super(J,Q,$)}}pJ.prototype.ValueTypeName="string";pJ.prototype.ValueBufferType=Array;pJ.prototype.DefaultInterpolation=2300;pJ.prototype.InterpolantFactoryMethodLinear=void 0;pJ.prototype.InterpolantFactoryMethodSmooth=void 0;class qU extends s7{constructor(J,Q,$,Z){super(J,Q,$,Z)}}qU.prototype.ValueTypeName="vector";class FU{constructor(J,Q,$){let Z=this,K=!1,U=0,Y=0,W=void 0,H=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(G){if(Y++,K===!1){if(Z.onStart!==void 0)Z.onStart(G,U,Y)}K=!0},this.itemEnd=function(G){if(U++,Z.onProgress!==void 0)Z.onProgress(G,U,Y);if(U===Y){if(K=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(G){if(Z.onError!==void 0)Z.onError(G)},this.resolveURL=function(G){if(G=G.normalize("NFC"),W)return W(G);return G},this.setURLModifier=function(G){return W=G,this},this.addHandler=function(G,X){return H.push(G,X),this},this.removeHandler=function(G){let X=H.indexOf(G);if(X!==-1)H.splice(X,2);return this},this.getHandler=function(G){for(let X=0,F=H.length;X<F;X+=2){let N=H[X],q=H[X+1];if(N.global)N.lastIndex=0;if(N.test(G))return q}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var KH=new FU;class EU{constructor(J){if(this.manager=J!==void 0?J:KH,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,K){$.load(J,Z,Q,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}EU.DEFAULT_MATERIAL_NAME="__DEFAULT";class k6 extends A9{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new W0(J),this.intensity=Q}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class B8 extends k6{constructor(J,Q,$){super(J,$);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(A9.DEFAULT_UP),this.updateMatrix(),this.groundColor=new W0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var tZ=new j9,sY=new S,iY=new S;class kQ{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new U0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new j9,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new CQ,this._frameExtents=new U0(1,1),this._viewportCount=1,this._viewports=[new r9(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera;sY.setFromMatrixPosition(J.matrixWorld),Q.position.copy(sY),iY.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(iY),Q.updateMatrixWorld(),this._updateMatrix(Q,this.matrix,this._frustum)}_updateMatrix(J,Q,$,Z){tZ.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),$.setFromProjectionMatrix(tZ,J.coordinateSystem,J.reversedDepth);let K=this._frameExtents,U=Z?Z.z/K.x:1,Y=Z?Z.w/K.y:1,W=Z?Z.x/K.x:0,H=Z?Z.y/K.y:0;if(J.coordinateSystem===2001||J.reversedDepth)Q.set(0.5*U,0,0,0.5*U+W,0,0.5*Y,0,0.5*Y+H,0,0,1,0,0,0,0,1);else Q.set(0.5*U,0,0,0.5*U+W,0,0.5*Y,0,0.5*Y+H,0,0,0.5,0.5,0,0,0,1);Q.multiply(tZ)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};return J.intensity=this.intensity,J.bias=this.bias,J.normalBias=this.normalBias,J.radius=this.radius,J.blurSamples=this.blurSamples,J.mapSize=this.mapSize.toArray(),J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var P$=new S,w$=new u8,F8=new S;class WZ extends A9{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new j9,this.projectionMatrix=new j9,this.projectionMatrixInverse=new j9,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(P$,w$,F8),F8.x===1&&F8.y===1&&F8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(P$,w$,F8.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(P$,w$,F8),F8.x===1&&F8.y===1&&F8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(P$,w$,F8.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var FJ=new S,oY=new U0,aY=new U0;class e9 extends WZ{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=ZQ*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(T$*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return ZQ*2*Math.atan(Math.tan(T$*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){FJ.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(FJ.x,FJ.y).multiplyScalar(-J/FJ.z),FJ.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(FJ.x,FJ.y).multiplyScalar(-J/FJ.z)}getViewSize(J,Q){return this.getViewBounds(J,oY,aY),Q.subVectors(aY,oY)}setViewOffset(J,Q,$,Z,K,U){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(T$*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,K=-0.5*Z,U=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:W,fullHeight:H}=U;K+=U.offsetX*Z/W,Q-=U.offsetY*$/H,Z*=U.width/W,$*=U.height/H}let Y=this.filmOffset;if(Y!==0)K+=J*Y/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class UH extends kQ{constructor(){super(new e9(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(J){let Q=this.camera,$=ZQ*2*J.angle*this.focus,Z=this.mapSize.width/this.mapSize.height*this.aspect,K=J.distance||Q.far;if($!==Q.fov||Z!==Q.aspect||K!==Q.far)Q.fov=$,Q.aspect=Z,Q.far=K,Q.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this.aspect=J.aspect,this}toJSON(){let J=super.toJSON();return J.focus=this.focus,J.aspect=this.aspect,J}}class j6 extends k6{constructor(J,Q,$=0,Z=Math.PI/3,K=0,U=2){super(J,Q);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(A9.DEFAULT_UP),this.updateMatrix(),this.target=new A9,this.distance=$,this.angle=Z,this.penumbra=K,this.decay=U,this.map=null,this.shadow=new UH}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.map=J.map,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);if(Q.object.distance=this.distance,Q.object.angle=this.angle,Q.object.decay=this.decay,Q.object.penumbra=this.penumbra,Q.object.target=this.target.uuid,this.map&&this.map.isTexture)Q.object.map=this.map.toJSON(J).uuid;return Q.object.shadow=this.shadow.toJSON(),Q}}class YH extends kQ{constructor(){super(new e9(90,1,0.5,500));this.isPointLightShadow=!0}}class c8 extends k6{constructor(J,Q,$=0,Z=2){super(J,Q);this.isPointLight=!0,this.type="PointLight",this.distance=$,this.decay=Z,this.shadow=new YH}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.distance=this.distance,Q.object.decay=this.decay,Q.object.shadow=this.shadow.toJSON(),Q}}class mJ extends WZ{constructor(J=-1,Q=1,$=1,Z=-1,K=0.1,U=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=K,this.far=U,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,K,U){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,K=$-J,U=$+J,Y=Z+Q,W=Z-Q;if(this.view!==null&&this.view.enabled){let H=(this.right-this.left)/this.view.fullWidth/this.zoom,G=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=H*this.view.offsetX,U=K+H*this.view.width,Y-=G*this.view.offsetY,W=Y-G*this.view.height}this.projectionMatrix.makeOrthographic(K,U,Y,W,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class WH extends kQ{constructor(){super(new mJ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class I8 extends k6{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(A9.DEFAULT_UP),this.updateMatrix(),this.target=new A9,this.shadow=new WH}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}var E6=-90,O6=1;class OU extends A9{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new e9(E6,O6,J,Q);Z.layers=this.layers,this.add(Z);let K=new e9(E6,O6,J,Q);K.layers=this.layers,this.add(K);let U=new e9(E6,O6,J,Q);U.layers=this.layers,this.add(U);let Y=new e9(E6,O6,J,Q);Y.layers=this.layers,this.add(Y);let W=new e9(E6,O6,J,Q);W.layers=this.layers,this.add(W);let H=new e9(E6,O6,J,Q);H.layers=this.layers,this.add(H)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,K,U,Y,W]=Q;for(let H of Q)this.remove(H);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),U.up.set(0,0,1),U.lookAt(0,-1,0),Y.up.set(0,1,0),Y.lookAt(0,0,1),W.up.set(0,1,0),W.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),U.up.set(0,0,-1),U.lookAt(0,-1,0),Y.up.set(0,-1,0),Y.lookAt(0,0,1),W.up.set(0,-1,0),W.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let H of Q)this.add(H),H.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,U,Y,W,H,G]=this.children,X=J.getRenderTarget(),F=J.getActiveCubeFace(),N=J.getActiveMipmapLevel(),q=J.xr.enabled;J.xr.enabled=!1;let O=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let M=!1;if(J.isWebGLRenderer===!0)M=J.state.buffers.depth.getReversed();else M=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,1,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render(Q,U),J.setRenderTarget($,2,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,3,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,4,Z),M&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),$.texture.generateMipmaps=O,J.setRenderTarget($,5,Z),M&&J.autoClear===!1)J.clearDepth();J.render(Q,G),J.setRenderTarget(X,F,N),J.xr.enabled=q,$.texture.needsPMREMUpdate=!0}}class RU extends e9{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}class HZ{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(J){if(this._document=J,J.hidden!==void 0)this._pageVisibilityHandler=yG.bind(this),J.addEventListener("visibilitychange",this._pageVisibilityHandler,!1)}disconnect(){if(this._pageVisibilityHandler!==null)this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null;this._document=null}getDelta(){return this._delta/1000}getElapsed(){return this._elapsed/1000}getTimescale(){return this._timescale}setTimescale(J){return this._timescale=J,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(J){if(this._pageVisibilityHandler!==null&&this._document.hidden===!0)this._delta=0;else this._previousTime=this._currentTime,this._currentTime=(J!==void 0?J:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta;return this}}function yG(){if(this._document.hidden===!1)this.reset()}var MU="\\[\\]\\.:\\/",fG=new RegExp("["+MU+"]","g"),VU="[^"+MU+"]",bG="[^"+MU.replace("\\.","")+"]",hG=/((?:WC+[\/:])*)/.source.replace("WC",VU),xG=/(WCOD+)?/.source.replace("WCOD",bG),gG=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",VU),pG=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",VU),mG=new RegExp("^"+hG+xG+gG+pG+"$"),uG=["material","materials","bones","map"];class HH{constructor(J,Q,$){let Z=$||g9.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,K=$.length;Z!==K;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class g9{constructor(J,Q,$){this.path=Q,this.parsedPath=$||g9.parseTrackName(Q),this.node=g9.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new g9(J,Q,$);else return new g9.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(fG,"")}static parseTrackName(J){let Q=mG.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let K=$.nodeName.substring(Z+1);if(uG.indexOf(K)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=K}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(K){for(let U=0;U<K.length;U++){let Y=K[U];if(Y.name===Q||Y.uuid===Q)return Y;let W=$(Y.children);if(W)return W}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,K=$.length;Z!==K;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,K=Q.propertyIndex;if(!J)J=g9.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){e0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let H=Q.objectIndex;switch($){case"materials":if(!J.material){Z9("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){Z9("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){Z9("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let G=0;G<J.length;G++)if(J[G].name===H){H=G;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){Z9("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){Z9("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){Z9("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(H!==void 0){if(J[H]===void 0){Z9("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[H]}}let U=J[Z];if(U===void 0){let H=Q.nodeName;Z9("PropertyBinding: Trying to update property for track: "+H+"."+Z+" but it wasn't found.",J);return}let Y=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)Y=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)Y=this.Versioning.MatrixWorldNeedsUpdate;let W=this.BindingType.Direct;if(K!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){Z9("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){Z9("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}W=this.BindingType.ArrayElement,this.resolvedProperty=U,this.propertyIndex=K}else if(U.fromArray!==void 0&&U.toArray!==void 0)W=this.BindingType.HasFromToArray,this.resolvedProperty=U;else if(Array.isArray(U))W=this.BindingType.EntireArray,this.resolvedProperty=U;else this.propertyName=Z;this.getValue=this.GetterByBindingType[W],this.setValue=this.SetterByBindingTypeAndVersioning[W][Y]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}g9.Composite=HH;g9.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};g9.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};g9.prototype.GetterByBindingType=[g9.prototype._getValue_direct,g9.prototype._getValue_array,g9.prototype._getValue_arrayElement,g9.prototype._getValue_toArray];g9.prototype.SetterByBindingTypeAndVersioning=[[g9.prototype._setValue_direct,g9.prototype._setValue_direct_setNeedsUpdate,g9.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[g9.prototype._setValue_array,g9.prototype._setValue_array_setNeedsUpdate,g9.prototype._setValue_array_setMatrixWorldNeedsUpdate],[g9.prototype._setValue_arrayElement,g9.prototype._setValue_arrayElement_setNeedsUpdate,g9.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[g9.prototype._setValue_fromArray,g9.prototype._setValue_fromArray_setNeedsUpdate,g9.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var l1=new Float32Array(1);class _U{static{_U.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let K=this.elements;return K[0]=J,K[2]=Q,K[1]=$,K[3]=Z,this}}class MJ extends K8{constructor(J=10,Q=10,$=4473924,Z=8947848){$=new W0($),Z=new W0(Z);let K=Q/2,U=J/Q,Y=J/2,W=[],H=[];for(let F=0,N=0,q=-Y;F<=Q;F++,q+=U){W.push(-Y,0,q,Y,0,q),W.push(q,0,-Y,q,0,Y);let O=F===K?$:Z;O.toArray(H,N),N+=3,O.toArray(H,N),N+=3,O.toArray(H,N),N+=3,O.toArray(H,N),N+=3}let G=new F9;G.setAttribute("position",new J9(W,3)),G.setAttribute("color",new J9(H,3));let X=new fJ({vertexColors:!0,toneMapped:!1});super(G,X);this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function BU(J,Q,$,Z){let K=dG(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/K.components*K.byteLength;case 1029:return J*Q/K.components*K.byteLength;case 1030:return J*Q*2/K.components*K.byteLength;case 1031:return J*Q*2/K.components*K.byteLength;case 1022:return J*Q*3/K.components*K.byteLength;case 1023:return J*Q*4/K.components*K.byteLength;case 1033:return J*Q*4/K.components*K.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function dG(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)e0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function SH(){let J=null,Q=!1,$=null,Z=null;function K(U,Y){Z=J.requestAnimationFrame(K),$(U,Y)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(K),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(U){$=U},setContext:function(U){J=U}}}function lG(J){let Q=new WeakMap;function $(W,H){let{array:G,usage:X}=W,F=G.byteLength,N=J.createBuffer();J.bindBuffer(H,N),J.bufferData(H,G,X),W.onUploadCallback();let q;if(G instanceof Float32Array)q=J.FLOAT;else if(typeof Float16Array<"u"&&G instanceof Float16Array)q=J.HALF_FLOAT;else if(G instanceof Uint16Array)if(W.isFloat16BufferAttribute)q=J.HALF_FLOAT;else q=J.UNSIGNED_SHORT;else if(G instanceof Int16Array)q=J.SHORT;else if(G instanceof Uint32Array)q=J.UNSIGNED_INT;else if(G instanceof Int32Array)q=J.INT;else if(G instanceof Int8Array)q=J.BYTE;else if(G instanceof Uint8Array)q=J.UNSIGNED_BYTE;else if(G instanceof Uint8ClampedArray)q=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+G);return{buffer:N,type:q,bytesPerElement:G.BYTES_PER_ELEMENT,version:W.version,size:F}}function Z(W,H,G){let{array:X,updateRanges:F}=H;if(J.bindBuffer(G,W),F.length===0)J.bufferSubData(G,0,X);else{F.sort((q,O)=>q.start-O.start);let N=0;for(let q=1;q<F.length;q++){let O=F[N],M=F[q];if(M.start<=O.start+O.count+1)O.count=Math.max(O.count,M.start+M.count-O.start);else++N,F[N]=M}F.length=N+1;for(let q=0,O=F.length;q<O;q++){let M=F[q];J.bufferSubData(G,M.start*X.BYTES_PER_ELEMENT,X,M.start,M.count)}H.clearUpdateRanges()}H.onUploadCallback()}function K(W){if(W.isInterleavedBufferAttribute)W=W.data;return Q.get(W)}function U(W){if(W.isInterleavedBufferAttribute)W=W.data;let H=Q.get(W);if(H)J.deleteBuffer(H.buffer),Q.delete(W)}function Y(W,H){if(W.isInterleavedBufferAttribute)W=W.data;if(W.isGLBufferAttribute){let X=Q.get(W);if(!X||X.version<W.version)Q.set(W,{buffer:W.buffer,type:W.type,bytesPerElement:W.elementSize,version:W.version});return}let G=Q.get(W);if(G===void 0)Q.set(W,$(W,H));else if(G.version<W.version){if(G.size!==W.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(G.buffer,W,H),G.version=W.version}}return{get:K,remove:U,update:Y}}var cG=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nG=`#ifdef USE_ALPHAHASH
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
#endif`,sG=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,iG=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oG=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,aG=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rG=`#ifdef USE_AOMAP
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
#endif`,tG=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,eG=`#ifdef USE_BATCHING
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
#endif`,JN=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,QN=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$N=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ZN=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,KN=`#ifdef USE_IRIDESCENCE
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
#endif`,UN=`#ifdef USE_BUMPMAP
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
#endif`,YN=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,WN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,HN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,GN=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,NN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,XN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,DN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,qN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,FN=`#define PI 3.141592653589793
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
} // validated`,EN=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ON=`vec3 transformedNormal = objectNormal;
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
#endif`,RN=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,MN=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,VN=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_N=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,BN="gl_FragColor = linearToOutputTexel( gl_FragColor );",IN=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,CN=`#ifdef USE_ENVMAP
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
#endif`,zN=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,AN=`#ifdef USE_ENVMAP
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
#endif`,LN=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,PN=`#ifdef USE_ENVMAP
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
#endif`,wN=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,TN=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,SN=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kN=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jN=`#ifdef USE_GRADIENTMAP
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
}`,vN=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yN=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fN=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bN=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,hN=`#ifdef USE_ENVMAP
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
#endif`,xN=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gN=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pN=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mN=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uN=`PhysicalMaterial material;
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
#endif`,dN=`uniform sampler2D dfgLUT;
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
}`,lN=`
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
#endif`,cN=`#if defined( RE_IndirectDiffuse )
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
#endif`,nN=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sN=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,iN=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,oN=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aN=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rN=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tN=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,eN=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,JX=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,QX=`#if defined( USE_POINTS_UV )
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
#endif`,$X=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ZX=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,KX=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,UX=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,YX=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,WX=`#ifdef USE_MORPHTARGETS
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
#endif`,HX=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,GX=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,NX=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,XX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qX=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,FX=`#ifdef USE_NORMALMAP
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
#endif`,EX=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,OX=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,RX=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,MX=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,VX=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_X=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,BX=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,IX=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,CX=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zX=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,AX=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,LX=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,PX=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wX=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,TX=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,SX=`float getShadowMask() {
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
}`,kX=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jX=`#ifdef USE_SKINNING
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
#endif`,vX=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yX=`#ifdef USE_SKINNING
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
#endif`,fX=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,bX=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hX=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xX=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gX=`#ifdef USE_TRANSMISSION
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
#endif`,pX=`#ifdef USE_TRANSMISSION
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
#endif`,mX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lX=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,cX=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nX=`uniform sampler2D t2D;
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
}`,sX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iX=`#ifdef ENVMAP_TYPE_CUBE
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
}`,oX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aX=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rX=`#include <common>
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
}`,tX=`#if DEPTH_PACKING == 3200
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
}`,eX=`#define DISTANCE
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
}`,JD=`#define DISTANCE
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
}`,QD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$D=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZD=`uniform float scale;
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
}`,KD=`uniform vec3 diffuse;
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
}`,UD=`#include <common>
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
}`,YD=`uniform vec3 diffuse;
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
}`,WD=`#define LAMBERT
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
}`,HD=`#define LAMBERT
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
}`,GD=`#define MATCAP
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
}`,ND=`#define MATCAP
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
}`,XD=`#define NORMAL
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
}`,DD=`#define NORMAL
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
}`,qD=`#define PHONG
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
}`,FD=`#define PHONG
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
}`,ED=`#define STANDARD
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
}`,OD=`#define STANDARD
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
}`,RD=`#define TOON
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
}`,MD=`#define TOON
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
}`,VD=`uniform float size;
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
}`,_D=`uniform vec3 diffuse;
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
}`,BD=`#include <common>
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
}`,ID=`uniform vec3 color;
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
}`,CD=`uniform float rotation;
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
}`,zD=`uniform vec3 diffuse;
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
}`,q9={alphahash_fragment:cG,alphahash_pars_fragment:nG,alphamap_fragment:sG,alphamap_pars_fragment:iG,alphatest_fragment:oG,alphatest_pars_fragment:aG,aomap_fragment:rG,aomap_pars_fragment:tG,batching_pars_vertex:eG,batching_vertex:JN,begin_vertex:QN,beginnormal_vertex:$N,bsdfs:ZN,iridescence_fragment:KN,bumpmap_pars_fragment:UN,clipping_planes_fragment:YN,clipping_planes_pars_fragment:WN,clipping_planes_pars_vertex:HN,clipping_planes_vertex:GN,color_fragment:NN,color_pars_fragment:XN,color_pars_vertex:DN,color_vertex:qN,common:FN,cube_uv_reflection_fragment:EN,defaultnormal_vertex:ON,displacementmap_pars_vertex:RN,displacementmap_vertex:MN,emissivemap_fragment:VN,emissivemap_pars_fragment:_N,colorspace_fragment:BN,colorspace_pars_fragment:IN,envmap_fragment:CN,envmap_common_pars_fragment:zN,envmap_pars_fragment:AN,envmap_pars_vertex:LN,envmap_physical_pars_fragment:hN,envmap_vertex:PN,fog_vertex:wN,fog_pars_vertex:TN,fog_fragment:SN,fog_pars_fragment:kN,gradientmap_pars_fragment:jN,lightmap_pars_fragment:vN,lights_lambert_fragment:yN,lights_lambert_pars_fragment:fN,lights_pars_begin:bN,lights_toon_fragment:xN,lights_toon_pars_fragment:gN,lights_phong_fragment:pN,lights_phong_pars_fragment:mN,lights_physical_fragment:uN,lights_physical_pars_fragment:dN,lights_fragment_begin:lN,lights_fragment_maps:cN,lights_fragment_end:nN,lightprobes_pars_fragment:sN,logdepthbuf_fragment:iN,logdepthbuf_pars_fragment:oN,logdepthbuf_pars_vertex:aN,logdepthbuf_vertex:rN,map_fragment:tN,map_pars_fragment:eN,map_particle_fragment:JX,map_particle_pars_fragment:QX,metalnessmap_fragment:$X,metalnessmap_pars_fragment:ZX,morphinstance_vertex:KX,morphcolor_vertex:UX,morphnormal_vertex:YX,morphtarget_pars_vertex:WX,morphtarget_vertex:HX,normal_fragment_begin:GX,normal_fragment_maps:NX,normal_pars_fragment:XX,normal_pars_vertex:DX,normal_vertex:qX,normalmap_pars_fragment:FX,clearcoat_normal_fragment_begin:EX,clearcoat_normal_fragment_maps:OX,clearcoat_pars_fragment:RX,iridescence_pars_fragment:MX,opaque_fragment:VX,packing:_X,premultiplied_alpha_fragment:BX,project_vertex:IX,dithering_fragment:CX,dithering_pars_fragment:zX,roughnessmap_fragment:AX,roughnessmap_pars_fragment:LX,shadowmap_pars_fragment:PX,shadowmap_pars_vertex:wX,shadowmap_vertex:TX,shadowmask_pars_fragment:SX,skinbase_vertex:kX,skinning_pars_vertex:jX,skinning_vertex:vX,skinnormal_vertex:yX,specularmap_fragment:fX,specularmap_pars_fragment:bX,tonemapping_fragment:hX,tonemapping_pars_fragment:xX,transmission_fragment:gX,transmission_pars_fragment:pX,uv_pars_fragment:mX,uv_pars_vertex:uX,uv_vertex:dX,worldpos_vertex:lX,background_vert:cX,background_frag:nX,backgroundCube_vert:sX,backgroundCube_frag:iX,cube_vert:oX,cube_frag:aX,depth_vert:rX,depth_frag:tX,distance_vert:eX,distance_frag:JD,equirect_vert:QD,equirect_frag:$D,linedashed_vert:ZD,linedashed_frag:KD,meshbasic_vert:UD,meshbasic_frag:YD,meshlambert_vert:WD,meshlambert_frag:HD,meshmatcap_vert:GD,meshmatcap_frag:ND,meshnormal_vert:XD,meshnormal_frag:DD,meshphong_vert:qD,meshphong_frag:FD,meshphysical_vert:ED,meshphysical_frag:OD,meshtoon_vert:RD,meshtoon_frag:MD,points_vert:VD,points_frag:_D,shadow_vert:BD,shadow_frag:ID,sprite_vert:CD,sprite_frag:zD},j0={common:{diffuse:{value:new W0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new U9},alphaMap:{value:null},alphaMapTransform:{value:new U9},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new U9}},envmap:{envMap:{value:null},envMapRotation:{value:new U9},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new U9}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new U9}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new U9},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new U9},normalScale:{value:new U0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new U9},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new U9}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new U9}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new U9}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new W0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new S},probesMax:{value:new S},probesResolution:{value:new S}},points:{diffuse:{value:new W0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new U9},alphaTest:{value:0},uvTransform:{value:new U9}},sprite:{diffuse:{value:new W0(16777215)},opacity:{value:1},center:{value:new U0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new U9},alphaMap:{value:null},alphaMapTransform:{value:new U9},alphaTest:{value:0}}},z8={basic:{uniforms:P7([j0.common,j0.specularmap,j0.envmap,j0.aomap,j0.lightmap,j0.fog]),vertexShader:q9.meshbasic_vert,fragmentShader:q9.meshbasic_frag},lambert:{uniforms:P7([j0.common,j0.specularmap,j0.envmap,j0.aomap,j0.lightmap,j0.emissivemap,j0.bumpmap,j0.normalmap,j0.displacementmap,j0.fog,j0.lights,{emissive:{value:new W0(0)},envMapIntensity:{value:1}}]),vertexShader:q9.meshlambert_vert,fragmentShader:q9.meshlambert_frag},phong:{uniforms:P7([j0.common,j0.specularmap,j0.envmap,j0.aomap,j0.lightmap,j0.emissivemap,j0.bumpmap,j0.normalmap,j0.displacementmap,j0.fog,j0.lights,{emissive:{value:new W0(0)},specular:{value:new W0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:q9.meshphong_vert,fragmentShader:q9.meshphong_frag},standard:{uniforms:P7([j0.common,j0.envmap,j0.aomap,j0.lightmap,j0.emissivemap,j0.bumpmap,j0.normalmap,j0.displacementmap,j0.roughnessmap,j0.metalnessmap,j0.fog,j0.lights,{emissive:{value:new W0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:q9.meshphysical_vert,fragmentShader:q9.meshphysical_frag},toon:{uniforms:P7([j0.common,j0.aomap,j0.lightmap,j0.emissivemap,j0.bumpmap,j0.normalmap,j0.displacementmap,j0.gradientmap,j0.fog,j0.lights,{emissive:{value:new W0(0)}}]),vertexShader:q9.meshtoon_vert,fragmentShader:q9.meshtoon_frag},matcap:{uniforms:P7([j0.common,j0.bumpmap,j0.normalmap,j0.displacementmap,j0.fog,{matcap:{value:null}}]),vertexShader:q9.meshmatcap_vert,fragmentShader:q9.meshmatcap_frag},points:{uniforms:P7([j0.points,j0.fog]),vertexShader:q9.points_vert,fragmentShader:q9.points_frag},dashed:{uniforms:P7([j0.common,j0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:q9.linedashed_vert,fragmentShader:q9.linedashed_frag},depth:{uniforms:P7([j0.common,j0.displacementmap]),vertexShader:q9.depth_vert,fragmentShader:q9.depth_frag},normal:{uniforms:P7([j0.common,j0.bumpmap,j0.normalmap,j0.displacementmap,{opacity:{value:1}}]),vertexShader:q9.meshnormal_vert,fragmentShader:q9.meshnormal_frag},sprite:{uniforms:P7([j0.sprite,j0.fog]),vertexShader:q9.sprite_vert,fragmentShader:q9.sprite_frag},background:{uniforms:{uvTransform:{value:new U9},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:q9.background_vert,fragmentShader:q9.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new U9}},vertexShader:q9.backgroundCube_vert,fragmentShader:q9.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:q9.cube_vert,fragmentShader:q9.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:q9.equirect_vert,fragmentShader:q9.equirect_frag},distance:{uniforms:P7([j0.common,j0.displacementmap,{referencePosition:{value:new S},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:q9.distance_vert,fragmentShader:q9.distance_frag},shadow:{uniforms:P7([j0.lights,j0.fog,{color:{value:new W0(0)},opacity:{value:1}}]),vertexShader:q9.shadow_vert,fragmentShader:q9.shadow_frag}};z8.physical={uniforms:P7([z8.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new U9},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new U9},clearcoatNormalScale:{value:new U0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new U9},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new U9},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new U9},sheen:{value:0},sheenColor:{value:new W0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new U9},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new U9},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new U9},transmissionSamplerSize:{value:new U0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new U9},attenuationDistance:{value:0},attenuationColor:{value:new W0(0)},specularColor:{value:new W0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new U9},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new U9},anisotropyVector:{value:new U0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new U9}}]),vertexShader:q9.meshphysical_vert,fragmentShader:q9.meshphysical_frag};var GZ={r:0,b:0,g:0},AD=new j9,kH=new U9;kH.set(-1,0,0,0,1,0,0,0,1);function LD(J,Q,$,Z,K,U){let Y=new W0(0),W=K===!0?0:1,H,G,X=null,F=0,N=null;function q(I){let L=I.isScene===!0?I.background:null;if(L&&L.isTexture){let R=I.backgroundBlurriness>0;L=Q.get(L,R)}return L}function O(I){let L=!1,R=q(I);if(R===null)D(Y,W);else if(R&&R.isColor)D(R,1),L=!0;let B=J.xr.getEnvironmentBlendMode();if(B==="additive")$.buffers.color.setClear(0,0,0,1,U);else if(B==="alpha-blend")$.buffers.color.setClear(0,0,0,0,U);if(J.autoClear||L)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function M(I,L){let R=q(L);if(R&&(R.isCubeTexture||R.mapping===OQ)){if(G===void 0)G=new d(new P0(1,1,1),new v9({name:"BackgroundCubeMaterial",uniforms:hJ(z8.backgroundCube.uniforms),vertexShader:z8.backgroundCube.vertexShader,fragmentShader:z8.backgroundCube.fragmentShader,side:N7,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),G.geometry.deleteAttribute("normal"),G.geometry.deleteAttribute("uv"),G.onBeforeRender=function(B,_,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(G.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(G);if(G.material.uniforms.envMap.value=R,G.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,G.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,G.material.uniforms.backgroundRotation.value.setFromMatrix4(AD.makeRotationFromEuler(L.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1)G.material.uniforms.backgroundRotation.value.premultiply(kH);if(G.material.toneMapped=M9.getTransfer(R.colorSpace)!==p9,X!==R||F!==R.version||N!==J.toneMapping)G.material.needsUpdate=!0,X=R,F=R.version,N=J.toneMapping;G.layers.enableAll(),I.unshift(G,G.geometry,G.material,0,0,null)}else if(R&&R.isTexture){if(H===void 0)H=new d(new E9(2,2),new v9({name:"BackgroundMaterial",uniforms:hJ(z8.background.uniforms),vertexShader:z8.background.vertexShader,fragmentShader:z8.background.fragmentShader,side:I6,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),H.geometry.deleteAttribute("normal"),Object.defineProperty(H.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(H);if(H.material.uniforms.t2D.value=R,H.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,H.material.toneMapped=M9.getTransfer(R.colorSpace)!==p9,R.matrixAutoUpdate===!0)R.updateMatrix();if(H.material.uniforms.uvTransform.value.copy(R.matrix),X!==R||F!==R.version||N!==J.toneMapping)H.material.needsUpdate=!0,X=R,F=R.version,N=J.toneMapping;H.layers.enableAll(),I.unshift(H,H.geometry,H.material,0,0,null)}}function D(I,L){I.getRGB(GZ,KU(J)),$.buffers.color.setClear(GZ.r,GZ.g,GZ.b,L,U)}function E(){if(G!==void 0)G.geometry.dispose(),G.material.dispose(),G=void 0;if(H!==void 0)H.geometry.dispose(),H.material.dispose(),H=void 0}return{getClearColor:function(){return Y},setClearColor:function(I,L=1){Y.set(I),W=L,D(Y,W)},getClearAlpha:function(){return W},setClearAlpha:function(I){W=I,D(Y,W)},render:O,addToRenderList:M,dispose:E}}function PD(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},K=N(null),U=K,Y=!1;function W(k,b,e,v,u){let Q0=!1,l=F(k,v,e,b);if(U!==l)U=l,G(U.object);if(Q0=q(k,v,e,u),Q0)O(k,v,e,u);if(u!==null)Q.update(u,J.ELEMENT_ARRAY_BUFFER);if(Q0||Y){if(Y=!1,R(k,b,e,v),u!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(u).buffer)}}function H(){return J.createVertexArray()}function G(k){return J.bindVertexArray(k)}function X(k){return J.deleteVertexArray(k)}function F(k,b,e,v){let u=v.wireframe===!0,Q0=Z[b.id];if(Q0===void 0)Q0={},Z[b.id]=Q0;let l=k.isInstancedMesh===!0?k.id:0,D0=Q0[l];if(D0===void 0)D0={},Q0[l]=D0;let t=D0[e.id];if(t===void 0)t={},D0[e.id]=t;let p=t[u];if(p===void 0)p=N(H()),t[u]=p;return p}function N(k){let b=[],e=[],v=[];for(let u=0;u<$;u++)b[u]=0,e[u]=0,v[u]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:e,attributeDivisors:v,object:k,attributes:{},index:null}}function q(k,b,e,v){let u=U.attributes,Q0=b.attributes,l=0,D0=e.getAttributes();for(let t in D0)if(D0[t].location>=0){let J0=u[t],M0=Q0[t];if(M0===void 0){if(t==="instanceMatrix"&&k.instanceMatrix)M0=k.instanceMatrix;if(t==="instanceColor"&&k.instanceColor)M0=k.instanceColor}if(J0===void 0)return!0;if(J0.attribute!==M0)return!0;if(M0&&J0.data!==M0.data)return!0;l++}if(U.attributesNum!==l)return!0;if(U.index!==v)return!0;return!1}function O(k,b,e,v){let u={},Q0=b.attributes,l=0,D0=e.getAttributes();for(let t in D0)if(D0[t].location>=0){let J0=Q0[t];if(J0===void 0){if(t==="instanceMatrix"&&k.instanceMatrix)J0=k.instanceMatrix;if(t==="instanceColor"&&k.instanceColor)J0=k.instanceColor}let M0={};if(M0.attribute=J0,J0&&J0.data)M0.data=J0.data;u[t]=M0,l++}U.attributes=u,U.attributesNum=l,U.index=v}function M(){let k=U.newAttributes;for(let b=0,e=k.length;b<e;b++)k[b]=0}function D(k){E(k,0)}function E(k,b){let{newAttributes:e,enabledAttributes:v,attributeDivisors:u}=U;if(e[k]=1,v[k]===0)J.enableVertexAttribArray(k),v[k]=1;if(u[k]!==b)J.vertexAttribDivisor(k,b),u[k]=b}function I(){let{newAttributes:k,enabledAttributes:b}=U;for(let e=0,v=b.length;e<v;e++)if(b[e]!==k[e])J.disableVertexAttribArray(e),b[e]=0}function L(k,b,e,v,u,Q0,l){if(l===!0)J.vertexAttribIPointer(k,b,e,u,Q0);else J.vertexAttribPointer(k,b,e,v,u,Q0)}function R(k,b,e,v){M();let u=v.attributes,Q0=e.getAttributes(),l=b.defaultAttributeValues;for(let D0 in Q0){let t=Q0[D0];if(t.location>=0){let p=u[D0];if(p===void 0){if(D0==="instanceMatrix"&&k.instanceMatrix)p=k.instanceMatrix;if(D0==="instanceColor"&&k.instanceColor)p=k.instanceColor}if(p!==void 0){let{normalized:J0,itemSize:M0}=p,A0=Q.get(p);if(A0===void 0)continue;let{buffer:_0,type:E0,bytesPerElement:i}=A0,N0=E0===J.INT||E0===J.UNSIGNED_INT||p.gpuType===YK;if(p.isInterleavedBufferAttribute){let K0=p.data,m=K0.stride,C0=p.offset;if(K0.isInstancedInterleavedBuffer){for(let s=0;s<t.locationSize;s++)E(t.location+s,K0.meshPerAttribute);if(k.isInstancedMesh!==!0&&v._maxInstanceCount===void 0)v._maxInstanceCount=K0.meshPerAttribute*K0.count}else for(let s=0;s<t.locationSize;s++)D(t.location+s);J.bindBuffer(J.ARRAY_BUFFER,_0);for(let s=0;s<t.locationSize;s++)L(t.location+s,M0/t.locationSize,E0,J0,m*i,(C0+M0/t.locationSize*s)*i,N0)}else{if(p.isInstancedBufferAttribute){for(let K0=0;K0<t.locationSize;K0++)E(t.location+K0,p.meshPerAttribute);if(k.isInstancedMesh!==!0&&v._maxInstanceCount===void 0)v._maxInstanceCount=p.meshPerAttribute*p.count}else for(let K0=0;K0<t.locationSize;K0++)D(t.location+K0);J.bindBuffer(J.ARRAY_BUFFER,_0);for(let K0=0;K0<t.locationSize;K0++)L(t.location+K0,M0/t.locationSize,E0,J0,M0*i,M0/t.locationSize*K0*i,N0)}}else if(l!==void 0){let J0=l[D0];if(J0!==void 0)switch(J0.length){case 2:J.vertexAttrib2fv(t.location,J0);break;case 3:J.vertexAttrib3fv(t.location,J0);break;case 4:J.vertexAttrib4fv(t.location,J0);break;default:J.vertexAttrib1fv(t.location,J0)}}}}I()}function B(){C();for(let k in Z){let b=Z[k];for(let e in b){let v=b[e];for(let u in v){let Q0=v[u];for(let l in Q0)X(Q0[l].object),delete Q0[l];delete v[u]}}delete Z[k]}}function _(k){if(Z[k.id]===void 0)return;let b=Z[k.id];for(let e in b){let v=b[e];for(let u in v){let Q0=v[u];for(let l in Q0)X(Q0[l].object),delete Q0[l];delete v[u]}}delete Z[k.id]}function z(k){for(let b in Z){let e=Z[b];for(let v in e){let u=e[v];if(u[k.id]===void 0)continue;let Q0=u[k.id];for(let l in Q0)X(Q0[l].object),delete Q0[l];delete u[k.id]}}}function V(k){for(let b in Z){let e=Z[b],v=k.isInstancedMesh===!0?k.id:0,u=e[v];if(u===void 0)continue;for(let Q0 in u){let l=u[Q0];for(let D0 in l)X(l[D0].object),delete l[D0];delete u[Q0]}if(delete e[v],Object.keys(e).length===0)delete Z[b]}}function C(){if(f(),Y=!0,U===K)return;U=K,G(U.object)}function f(){K.geometry=null,K.program=null,K.wireframe=!1}return{setup:W,reset:C,resetDefaultState:f,dispose:B,releaseStatesOfGeometry:_,releaseStatesOfObject:V,releaseStatesOfProgram:z,initAttributes:M,enableAttribute:D,disableUnusedAttributes:I}}function wD(J,Q,$){let Z;function K(H){Z=H}function U(H,G){J.drawArrays(Z,H,G),$.update(G,Z,1)}function Y(H,G,X){if(X===0)return;J.drawArraysInstanced(Z,H,G,X),$.update(G,Z,X)}function W(H,G,X){if(X===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,H,0,G,0,X);let N=0;for(let q=0;q<X;q++)N+=G[q];$.update(N,Z,1)}this.setMode=K,this.render=U,this.renderInstances=Y,this.renderMultiDraw=W}function TD(J,Q,$,Z){let K;function U(){if(K!==void 0)return K;if(Q.has("EXT_texture_filter_anisotropic")===!0){let z=Q.get("EXT_texture_filter_anisotropic");K=J.getParameter(z.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else K=0;return K}function Y(z){if(z!==M8&&Z.convert(z)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function W(z){let V=z===F7&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(z!==Q8&&z!==p8&&!V&&Z.convert(z)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function H(z){if(z==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";z="mediump"}if(z==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let G=$.precision!==void 0?$.precision:"highp",X=H(G);if(X!==G)e0("WebGLRenderer:",G,"not supported, using",X,"instead."),G=X;let F=$.logarithmicDepthBuffer===!0,N=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&N===!1)e0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let q=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),O=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=J.getParameter(J.MAX_TEXTURE_SIZE),D=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),I=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),L=J.getParameter(J.MAX_VARYING_VECTORS),R=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),B=J.getParameter(J.MAX_SAMPLES),_=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:U,getMaxPrecision:H,textureFormatReadable:Y,textureTypeReadable:W,precision:G,logarithmicDepthBuffer:F,reversedDepthBuffer:N,maxTextures:q,maxVertexTextures:O,maxTextureSize:M,maxCubemapSize:D,maxAttributes:E,maxVertexUniforms:I,maxVaryings:L,maxFragmentUniforms:R,maxSamples:B,samples:_}}function SD(J){let Q=this,$=null,Z=0,K=!1,U=!1,Y=new E8,W=new U9,H={value:null,needsUpdate:!1};this.uniform=H,this.numPlanes=0,this.numIntersection=0,this.init=function(F,N){let q=F.length!==0||N||Z!==0||K;return K=N,Z=F.length,q},this.beginShadows=function(){U=!0,X(null)},this.endShadows=function(){U=!1},this.setGlobalState=function(F,N){$=X(F,N,0)},this.setState=function(F,N,q){let{clippingPlanes:O,clipIntersection:M,clipShadows:D}=F,E=J.get(F);if(!K||O===null||O.length===0||U&&!D)if(U)X(null);else G();else{let I=U?0:Z,L=I*4,R=E.clippingState||null;H.value=R,R=X(O,N,L,q);for(let B=0;B!==L;++B)R[B]=$[B];E.clippingState=R,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=I}};function G(){if(H.value!==$)H.value=$,H.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function X(F,N,q,O){let M=F!==null?F.length:0,D=null;if(M!==0){if(D=H.value,O!==!0||D===null){let E=q+M*4,I=N.matrixWorldInverse;if(W.getNormalMatrix(I),D===null||D.length<E)D=new Float32Array(E);for(let L=0,R=q;L!==M;++L,R+=4)Y.copy(F[L]).applyMatrix4(I,W),Y.normal.toArray(D,R),D[R+3]=Y.constant}H.value=D,H.needsUpdate=!0}return Q.numPlanes=M,Q.numIntersection=0,D}}var y6=4,kD=6,jD=20,vD=256,jQ=new mJ,GH=new W0,IU=null,CU=0,zU=0,AU=!1,yD=new S,uJ=new S;class wU{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,K={}){let{size:U=256,position:Y=yD}=K;IU=this._renderer.getRenderTarget(),CU=this._renderer.getActiveCubeFace(),zU=this._renderer.getActiveMipmapLevel(),AU=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(U);let W=this._allocateTargets();if(W.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,W,Y),Q>0)this._blur(W,0,0,Q);return this._applyPMREM(W),this._cleanup(W),W}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=DH(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=XH(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(IU,CU,zU),this._renderer.xr.enabled=AU,J.scissorTest=!1,v6(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===z6||J.mapping===wJ)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);IU=this._renderer.getRenderTarget(),CU=this._renderer.getActiveCubeFace(),zU=this._renderer.getActiveMipmapLevel(),AU=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:v7,minFilter:v7,generateMipmaps:!1,type:F7,format:M8,colorSpace:lK,depthBuffer:!1},Z=NH(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=NH(J,Q,$);let{_lodMax:K}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=fD(K)),this._blurMaterial=hD(K,J,Q),this._ggxMaterial=bD(K,J,Q)}return Z}_compileMaterial(J){let Q=new d(new F9,J);this._renderer.compile(Q,jQ)}_sceneToCubeUV(J,Q,$,Z,K){let W=new e9(90,1,Q,$),H=[1,-1,1,1,1,1],G=[1,1,1,-1,-1,-1],X=this._renderer,F=X.autoClear,N=X.toneMapping;if(X.getClearColor(GH),X.toneMapping=J8,X.autoClear=!1,X.state.buffers.depth.getReversed())X.setRenderTarget(Z),X.clearDepth(),X.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new d(new P0,new m0({name:"PMREM.Background",side:N7,depthWrite:!1,depthTest:!1}));let O=this._backgroundBox,M=O.material,D=!1,E=J.background;if(E){if(E.isColor)M.color.copy(E),J.background=null,D=!0}else M.color.copy(GH),D=!0;for(let I=0;I<6;I++){let L=I%3;if(L===0)W.up.set(0,H[I],0),W.position.set(K.x,K.y,K.z),W.lookAt(K.x+G[I],K.y,K.z);else if(L===1)W.up.set(0,0,H[I]),W.position.set(K.x,K.y,K.z),W.lookAt(K.x,K.y+G[I],K.z);else W.up.set(0,H[I],0),W.position.set(K.x,K.y,K.z),W.lookAt(K.x,K.y,K.z+G[I]);let R=this._cubeSize;if(v6(Z,L*R,I>2?R:0,R,R),X.setRenderTarget(Z),D)X.render(O,W);X.render(J,W)}X.toneMapping=N,X.autoClear=F,J.background=E}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===z6||J.mapping===wJ;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=DH();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=XH();let K=Z?this._cubemapMaterial:this._equirectMaterial,U=this._lodMeshes[0];U.material=K;let Y=K.uniforms;Y.envMap.value=J;let W=this._cubeSize;v6(Q,0,0,3*W,2*W),$.setRenderTarget(Q),$.render(U,jQ)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let K=1;K<Z;K++)this._applyGGXFilter(J,K-1,K);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,K=this._pingPongRenderTarget,U=this._ggxMaterial,Y=this._lodMeshes[$];Y.material=U;let W=U.uniforms,H=$/(this._lodMeshes.length-1),G=Q/(this._lodMeshes.length-1),X=Math.sqrt(H*H-G*G),F=H*1.25,N=X*F,{_lodMax:q}=this,O=this._sizeLods[$],M=3*O*($>q-y6?$-q+y6:0),D=4*(this._cubeSize-O);W.envMap.value=J.texture,W.roughness.value=N,W.mipInt.value=q-Q,v6(K,M,D,3*O,2*O),Z.setRenderTarget(K),Z.render(Y,jQ),W.envMap.value=K.texture,W.roughness.value=0,W.mipInt.value=q-$,v6(J,M,D,3*O,2*O),Z.setRenderTarget(J),Z.render(Y,jQ)}_blur(J,Q,$,Z){let K=this._pingPongRenderTarget,U=Math.min(Z,Math.PI)/Math.SQRT2;this._blurPass(J,K,Q,$,U),this._blurPass(K,J,$,$,U)}_blurPass(J,Q,$,Z,K){let U=this._renderer,Y=this._blurMaterial,W=this._lodMeshes[Z];W.material=Y;let H=Y.uniforms;H.envMap.value=J.texture,H.sigma.value=K,H.mipInt.value=this._lodMax-$;let G=this._sizeLods[Z],X=3*G*(Z>this._lodMax-y6?Z-this._lodMax+y6:0),F=4*(this._cubeSize-G);v6(Q,X,F,3*G,2*G),U.setRenderTarget(Q),U.render(W,jQ)}}function fD(J){let Q=[],$=[],Z=J,K=J-y6+1+kD;for(let U=0;U<K;U++){let Y=Math.pow(2,Z);Q.push(Y);let W=1/(Y-2),H=-W,G=1+W,X=[H,H,G,H,G,G,H,H,G,G,H,G],F=6,N=6,q=3,O=new Float32Array(q*N*F),M=new Float32Array(q*N*F);for(let E=0;E<F;E++){let I=E%3*2/3-1,L=E>2?0:-1,R=[I,L,0,I+0.6666666666666666,L,0,I+0.6666666666666666,L+1,0,I,L,0,I+0.6666666666666666,L+1,0,I,L+1,0];O.set(R,q*N*E);for(let B=0;B<N;B++){let _=X[B*2]*2-1,z=X[B*2+1]*2-1;if(E===0)uJ.set(1,z,_);else if(E===1)uJ.set(-_,1,-z);else if(E===2)uJ.set(-_,z,1);else if(E===3)uJ.set(-1,z,-_);else if(E===4)uJ.set(-_,-1,z);else uJ.set(_,z,-1);uJ.toArray(M,(E*N+B)*q)}}let D=new F9;if(D.setAttribute("position",new Q7(O,q)),D.setAttribute("outputDirection",new Q7(M,q)),$.push(new d(D,null)),Z>y6)Z--}return{lodMeshes:$,sizeLods:Q}}function NH(J,Q,$){let Z=new W7(J,Q,$);return Z.texture.mapping=OQ,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function v6(J,Q,$,Z,K){J.viewport.set(Q,$,Z,K),J.scissor.set(Q,$,Z,K)}function bD(J,Q,$){return new v9({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:vD,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:XZ(),fragmentShader:`

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
		`,blending:j7,depthTest:!1,depthWrite:!1})}function hD(J,Q,$){return new v9({name:"SphericalGaussianBlur",defines:{SAMPLES:jD,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:XZ(),fragmentShader:`

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
		`,blending:j7,depthTest:!1,depthWrite:!1})}function XH(){return new v9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:XZ(),fragmentShader:`

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
		`,blending:j7,depthTest:!1,depthWrite:!1})}function DH(){return new v9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:XZ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:j7,depthTest:!1,depthWrite:!1})}function XZ(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class kU extends W7{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new r$(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new P0(5,5,5),K=new v9({name:"CubemapFromEquirect",uniforms:hJ($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:N7,blending:j7});K.uniforms.tEquirect.value=Q;let U=new d(Z,K),Y=Q.minFilter;if(Q.minFilter===TJ)Q.minFilter=v7;return new OU(1,10,this).update(J,U),Q.minFilter=Y,U.geometry.dispose(),U.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let K=J.getRenderTarget();for(let U=0;U<6;U++)J.setRenderTarget(this,U),J.clear(Q,$,Z);J.setRenderTarget(K)}}function xD(J){let Q=new WeakMap,$=new WeakMap,Z=null;function K(N,q=!1){if(N===null||N===void 0)return null;if(q)return Y(N);return U(N)}function U(N){if(N&&N.isTexture){let q=N.mapping;if(q===f$||q===b$)if(Q.has(N)){let O=Q.get(N).texture;return W(O,N.mapping)}else{let O=N.image;if(O&&O.height>0){let M=new kU(O.height);return M.fromEquirectangularTexture(J,N),Q.set(N,M),N.addEventListener("dispose",G),W(M.texture,N.mapping)}else return null}}return N}function Y(N){if(N&&N.isTexture){let q=N.mapping,O=q===f$||q===b$,M=q===z6||q===wJ;if(O||M){let D=$.get(N),E=D!==void 0?D.texture.pmremVersion:0;if(N.isRenderTargetTexture&&N.pmremVersion!==E){if(Z===null)Z=new wU(J);return D=O?Z.fromEquirectangular(N,D):Z.fromCubemap(N,D),D.texture.pmremVersion=N.pmremVersion,$.set(N,D),D.texture}else if(D!==void 0)return D.texture;else{let I=N.image;if(O&&I&&I.height>0||M&&I&&H(I)){if(Z===null)Z=new wU(J);return D=O?Z.fromEquirectangular(N):Z.fromCubemap(N),D.texture.pmremVersion=N.pmremVersion,$.set(N,D),N.addEventListener("dispose",X),D.texture}else return null}}}return N}function W(N,q){if(q===f$)N.mapping=z6;else if(q===b$)N.mapping=wJ;return N}function H(N){let q=0,O=6;for(let M=0;M<O;M++)if(N[M]!==void 0)q++;return q===O}function G(N){let q=N.target;q.removeEventListener("dispose",G);let O=Q.get(q);if(O!==void 0)Q.delete(q),O.dispose()}function X(N){let q=N.target;q.removeEventListener("dispose",X);let O=$.get(q);if(O!==void 0)$.delete(q),O.dispose()}function F(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:K,dispose:F}}function gD(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let K=J.getExtension(Z);return Q[Z]=K,K}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let K=$(Z);if(K===null)LJ("WebGLRenderer: "+Z+" extension not supported.");return K}}}function pD(J,Q,$,Z){let K={},U=new WeakMap;function Y(F){let N=F.target;if(N.index!==null)Q.remove(N.index);for(let O in N.attributes)Q.remove(N.attributes[O]);N.removeEventListener("dispose",Y),delete K[N.id];let q=U.get(N);if(q)Q.remove(q),U.delete(N);if(Z.releaseStatesOfGeometry(N),N.isInstancedBufferGeometry===!0)delete N._maxInstanceCount;$.memory.geometries--}function W(F,N){if(K[N.id]===!0)return N;return N.addEventListener("dispose",Y),K[N.id]=!0,$.memory.geometries++,N}function H(F){let N=F.attributes;for(let q in N)Q.update(N[q],J.ARRAY_BUFFER)}function G(F){let N=[],q=F.index,O=F.attributes.position,M=0;if(O===void 0)return;if(q!==null){let I=q.array;M=q.version;for(let L=0,R=I.length;L<R;L+=3){let B=I[L+0],_=I[L+1],z=I[L+2];N.push(B,_,_,z,z,B)}}else{let I=O.array;M=O.version;for(let L=0,R=I.length/3-1;L<R;L+=3){let B=L+0,_=L+1,z=L+2;N.push(B,_,_,z,z,B)}}let D=new(O.count>=65535?a$:o$)(N,1);D.version=M;let E=U.get(F);if(E)Q.remove(E);U.set(F,D)}function X(F){let N=U.get(F);if(N){let q=F.index;if(q!==null){if(N.version<q.version)G(F)}}else G(F);return U.get(F)}return{get:W,update:H,getWireframeAttribute:X}}function mD(J,Q,$){let Z;function K(F){Z=F}let U,Y;function W(F){U=F.type,Y=F.bytesPerElement}function H(F,N){J.drawElements(Z,N,U,F*Y),$.update(N,Z,1)}function G(F,N,q){if(q===0)return;J.drawElementsInstanced(Z,N,U,F*Y,q),$.update(N,Z,q)}function X(F,N,q){if(q===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,N,0,U,F,0,q);let M=0;for(let D=0;D<q;D++)M+=N[D];$.update(M,Z,1)}this.setMode=K,this.setIndex=W,this.render=H,this.renderInstances=G,this.renderMultiDraw=X}function uD(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(U,Y,W){switch($.calls++,Y){case J.TRIANGLES:$.triangles+=W*(U/3);break;case J.LINES:$.lines+=W*(U/2);break;case J.LINE_STRIP:$.lines+=W*(U-1);break;case J.LINE_LOOP:$.lines+=W*U;break;case J.POINTS:$.points+=W*U;break;default:Z9("WebGLInfo: Unknown draw mode:",Y);break}}function K(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:K,update:Z}}function dD(J,Q,$){let Z=new WeakMap,K=new r9;function U(Y,W,H){let G=Y.morphTargetInfluences,X=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,F=X!==void 0?X.length:0,N=Z.get(W);if(N===void 0||N.count!==F){let C=function(){z.dispose(),Z.delete(W),W.removeEventListener("dispose",C)};if(N!==void 0)N.texture.dispose();let q=W.morphAttributes.position!==void 0,O=W.morphAttributes.normal!==void 0,M=W.morphAttributes.color!==void 0,D=W.morphAttributes.position||[],E=W.morphAttributes.normal||[],I=W.morphAttributes.color||[],L=0;if(q===!0)L=1;if(O===!0)L=2;if(M===!0)L=3;let R=W.attributes.position.count*L,B=1;if(R>Q.maxTextureSize)B=Math.ceil(R/Q.maxTextureSize),R=Q.maxTextureSize;let _=new Float32Array(R*B*4*F),z=new s$(_,R,B,F);z.type=p8,z.needsUpdate=!0;let V=L*4;for(let f=0;f<F;f++){let k=D[f],b=E[f],e=I[f],v=R*B*4*f;for(let u=0;u<k.count;u++){let Q0=u*V;if(q===!0)K.fromBufferAttribute(k,u),_[v+Q0+0]=K.x,_[v+Q0+1]=K.y,_[v+Q0+2]=K.z,_[v+Q0+3]=0;if(O===!0)K.fromBufferAttribute(b,u),_[v+Q0+4]=K.x,_[v+Q0+5]=K.y,_[v+Q0+6]=K.z,_[v+Q0+7]=0;if(M===!0)K.fromBufferAttribute(e,u),_[v+Q0+8]=K.x,_[v+Q0+9]=K.y,_[v+Q0+10]=K.z,_[v+Q0+11]=e.itemSize===4?K.w:1}}N={count:F,texture:z,size:new U0(R,B)},Z.set(W,N),W.addEventListener("dispose",C)}if(Y.isInstancedMesh===!0&&Y.morphTexture!==null)H.getUniforms().setValue(J,"morphTexture",Y.morphTexture,$);else{let q=0;for(let M=0;M<G.length;M++)q+=G[M];let O=W.morphTargetsRelative?1:1-q;H.getUniforms().setValue(J,"morphTargetBaseInfluence",O),H.getUniforms().setValue(J,"morphTargetInfluences",G)}H.getUniforms().setValue(J,"morphTargetsTexture",N.texture,$),H.getUniforms().setValue(J,"morphTargetsTextureSize",N.size)}return{update:U}}function lD(J,Q,$,Z,K){let U=new WeakMap;function Y(G){let X=K.render.frame,F=G.geometry,N=Q.get(G,F);if(U.get(N)!==X)Q.update(N),U.set(N,X);if(G.isInstancedMesh){if(G.hasEventListener("dispose",H)===!1)G.addEventListener("dispose",H);if(U.get(G)!==X){if($.update(G.instanceMatrix,J.ARRAY_BUFFER),G.instanceColor!==null)$.update(G.instanceColor,J.ARRAY_BUFFER);U.set(G,X)}}if(G.isSkinnedMesh){let q=G.skeleton;if(U.get(q)!==X)q.update(),U.set(q,X)}return N}function W(){U=new WeakMap}function H(G){let X=G.target;if(X.removeEventListener("dispose",H),Z.releaseStatesOfObject(X),$.remove(X.instanceMatrix),X.instanceColor!==null)$.remove(X.instanceColor)}return{update:Y,dispose:W}}var cD={[NQ]:"LINEAR_TONE_MAPPING",[XQ]:"REINHARD_TONE_MAPPING",[DQ]:"CINEON_TONE_MAPPING",[g8]:"ACES_FILMIC_TONE_MAPPING",[FQ]:"AGX_TONE_MAPPING",[EQ]:"NEUTRAL_TONE_MAPPING",[qQ]:"CUSTOM_TONE_MAPPING"};function nD(J,Q,$,Z,K,U){let Y=new W7(Q,$,{type:J,depthBuffer:K,stencilBuffer:U,samples:Z?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),W=null,H=null,G=new F9;G.setAttribute("position",new J9([-1,3,0,-1,-1,0,3,-1,0],3)),G.setAttribute("uv",new J9([0,2,0,0,2,0],2));let X=new TQ({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),F=new d(G,X),N=new mJ(-1,1,1,-1,0,1),q=null,O=null,M=!1,D,E=null,I=[],L=!1;this.setSize=function(R,B){if(Y.setSize(R,B),W!==null)W.setSize(R,B);if(H!==null)H.setSize(R,B);for(let _=0;_<I.length;_++){let z=I[_];if(z.setSize)z.setSize(R,B)}},this.setEffects=function(R){I=R,L=I.length>0&&I[0].isRenderPass===!0;let{width:B,height:_}=Y;if(I.length>0&&W===null)W=new W7(B,_,{type:F7,depthBuffer:!1,stencilBuffer:!1}),H=new W7(B,_,{type:F7,depthBuffer:!1,stencilBuffer:!1});for(let z=0;z<I.length;z++){let V=I[z];if(V.setSize)V.setSize(B,_)}},this.begin=function(R,B){if(M)return!1;if(R.toneMapping===J8&&I.length===0)return!1;if(E=B,B!==null){let{width:_,height:z}=B;if(Y.width!==_||Y.height!==z)this.setSize(_,z)}if(L===!1)R.setRenderTarget(Y);return D=R.toneMapping,R.toneMapping=J8,!0},this.hasRenderPass=function(){return L},this.end=function(R,B){R.toneMapping=D,M=!0;let _=Y,z=W;for(let V=0;V<I.length;V++){let C=I[V];if(C.enabled===!1)continue;if(C.render(R,z,_,B),C.needsSwap!==!1)_=z,z=z===W?H:W}if(q!==R.outputColorSpace||O!==R.toneMapping){if(q=R.outputColorSpace,O=R.toneMapping,X.defines={},M9.getTransfer(q)===p9)X.defines.SRGB_TRANSFER="";let V=cD[O];if(V)X.defines[V]="";X.needsUpdate=!0}X.uniforms.tDiffuse.value=_.texture,R.setRenderTarget(E),R.render(F,N),E=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){if(Y.dispose(),W!==null)W.dispose();if(H!==null)H.dispose();G.dispose(),X.dispose()}}var jH=new V7,TU=new bJ(1,1),vH=new s$,yH=new aK,fH=new r$,qH=[],FH=[],EH=new Float32Array(16),OH=new Float32Array(9),RH=new Float32Array(4);function f6(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let K=Q*$,U=qH[K];if(U===void 0)U=new Float32Array(K),qH[K]=U;if(Q!==0){Z.toArray(U,0);for(let Y=1,W=0;Y!==Q;++Y)W+=$,J[Y].toArray(U,W)}return U}function X7(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function D7(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function DZ(J,Q){let $=FH[Q];if($===void 0)$=new Int32Array(Q),FH[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function sD(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function iD(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(X7($,Q))return;J.uniform2fv(this.addr,Q),D7($,Q)}}function oD(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(X7($,Q))return;J.uniform3fv(this.addr,Q),D7($,Q)}}function aD(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(X7($,Q))return;J.uniform4fv(this.addr,Q),D7($,Q)}}function rD(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(X7($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),D7($,Q)}else{if(X7($,Z))return;RH.set(Z),J.uniformMatrix2fv(this.addr,!1,RH),D7($,Z)}}function tD(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(X7($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),D7($,Q)}else{if(X7($,Z))return;OH.set(Z),J.uniformMatrix3fv(this.addr,!1,OH),D7($,Z)}}function eD(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(X7($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),D7($,Q)}else{if(X7($,Z))return;EH.set(Z),J.uniformMatrix4fv(this.addr,!1,EH),D7($,Z)}}function Jq(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function Qq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(X7($,Q))return;J.uniform2iv(this.addr,Q),D7($,Q)}}function $q(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(X7($,Q))return;J.uniform3iv(this.addr,Q),D7($,Q)}}function Zq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(X7($,Q))return;J.uniform4iv(this.addr,Q),D7($,Q)}}function Kq(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function Uq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(X7($,Q))return;J.uniform2uiv(this.addr,Q),D7($,Q)}}function Yq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(X7($,Q))return;J.uniform3uiv(this.addr,Q),D7($,Q)}}function Wq(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(X7($,Q))return;J.uniform4uiv(this.addr,Q),D7($,Q)}}function Hq(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;let U;if(this.type===J.SAMPLER_2D_SHADOW)TU.compareFunction=$.isReversedDepthBuffer()?n$:c$,U=TU;else U=jH;$.setTexture2D(Q||U,K)}function Gq(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTexture3D(Q||yH,K)}function Nq(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTextureCube(Q||fH,K)}function Xq(J,Q,$){let Z=this.cache,K=$.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;$.setTexture2DArray(Q||vH,K)}function Dq(J){switch(J){case 5126:return sD;case 35664:return iD;case 35665:return oD;case 35666:return aD;case 35674:return rD;case 35675:return tD;case 35676:return eD;case 5124:case 35670:return Jq;case 35667:case 35671:return Qq;case 35668:case 35672:return $q;case 35669:case 35673:return Zq;case 5125:return Kq;case 36294:return Uq;case 36295:return Yq;case 36296:return Wq;case 35678:case 36198:case 36298:case 36306:case 35682:return Hq;case 35679:case 36299:case 36307:return Gq;case 35680:case 36300:case 36308:case 36293:return Nq;case 36289:case 36303:case 36311:case 36292:return Xq}}function qq(J,Q){J.uniform1fv(this.addr,Q)}function Fq(J,Q){let $=f6(Q,this.size,2);J.uniform2fv(this.addr,$)}function Eq(J,Q){let $=f6(Q,this.size,3);J.uniform3fv(this.addr,$)}function Oq(J,Q){let $=f6(Q,this.size,4);J.uniform4fv(this.addr,$)}function Rq(J,Q){let $=f6(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function Mq(J,Q){let $=f6(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function Vq(J,Q){let $=f6(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function _q(J,Q){J.uniform1iv(this.addr,Q)}function Bq(J,Q){J.uniform2iv(this.addr,Q)}function Iq(J,Q){J.uniform3iv(this.addr,Q)}function Cq(J,Q){J.uniform4iv(this.addr,Q)}function zq(J,Q){J.uniform1uiv(this.addr,Q)}function Aq(J,Q){J.uniform2uiv(this.addr,Q)}function Lq(J,Q){J.uniform3uiv(this.addr,Q)}function Pq(J,Q){J.uniform4uiv(this.addr,Q)}function wq(J,Q,$){let Z=this.cache,K=Q.length,U=DZ($,K);if(!X7(Z,U))J.uniform1iv(this.addr,U),D7(Z,U);let Y;if(this.type===J.SAMPLER_2D_SHADOW)Y=TU;else Y=jH;for(let W=0;W!==K;++W)$.setTexture2D(Q[W]||Y,U[W])}function Tq(J,Q,$){let Z=this.cache,K=Q.length,U=DZ($,K);if(!X7(Z,U))J.uniform1iv(this.addr,U),D7(Z,U);for(let Y=0;Y!==K;++Y)$.setTexture3D(Q[Y]||yH,U[Y])}function Sq(J,Q,$){let Z=this.cache,K=Q.length,U=DZ($,K);if(!X7(Z,U))J.uniform1iv(this.addr,U),D7(Z,U);for(let Y=0;Y!==K;++Y)$.setTextureCube(Q[Y]||fH,U[Y])}function kq(J,Q,$){let Z=this.cache,K=Q.length,U=DZ($,K);if(!X7(Z,U))J.uniform1iv(this.addr,U),D7(Z,U);for(let Y=0;Y!==K;++Y)$.setTexture2DArray(Q[Y]||vH,U[Y])}function jq(J){switch(J){case 5126:return qq;case 35664:return Fq;case 35665:return Eq;case 35666:return Oq;case 35674:return Rq;case 35675:return Mq;case 35676:return Vq;case 5124:case 35670:return _q;case 35667:case 35671:return Bq;case 35668:case 35672:return Iq;case 35669:case 35673:return Cq;case 5125:return zq;case 36294:return Aq;case 36295:return Lq;case 36296:return Pq;case 35678:case 36198:case 36298:case 36306:case 35682:return wq;case 35679:case 36299:case 36307:return Tq;case 35680:case 36300:case 36308:case 36293:return Sq;case 36289:case 36303:case 36311:case 36292:return kq}}class bH{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=Dq(Q.type)}}class hH{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=jq(Q.type)}}class xH{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let K=0,U=Z.length;K!==U;++K){let Y=Z[K];Y.setValue(J,Q[Y.id],$)}}}var LU=/(\w+)(\])?(\[|\.)?/g;function MH(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function vq(J,Q,$){let Z=J.name,K=Z.length;LU.lastIndex=0;while(!0){let U=LU.exec(Z),Y=LU.lastIndex,W=U[1],H=U[2]==="]",G=U[3];if(H)W=W|0;if(G===void 0||G==="["&&Y+2===K){MH($,G===void 0?new bH(W,J,Q):new hH(W,J,Q));break}else{let F=$.map[W];if(F===void 0)F=new xH(W),MH($,F);$=F}}}class fQ{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let U=0;U<$;++U){let Y=J.getActiveUniform(Q,U),W=J.getUniformLocation(Q,Y.name);vq(Y,W,this)}let Z=[],K=[];for(let U of this.seq)if(U.type===J.SAMPLER_2D_SHADOW||U.type===J.SAMPLER_CUBE_SHADOW||U.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(U);else K.push(U);if(Z.length>0)this.seq=Z.concat(K)}setValue(J,Q,$,Z){let K=this.map[Q];if(K!==void 0)K.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let K=0,U=Q.length;K!==U;++K){let Y=Q[K],W=$[Y.id];if(W.needsUpdate!==!1)Y.setValue(J,W.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,K=J.length;Z!==K;++Z){let U=J[Z];if(U.id in Q)$.push(U)}return $}}function VH(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var yq=37297,fq=0;function bq(J,Q){let $=J.split(`
`),Z=[],K=Math.max(Q-6,0),U=Math.min(Q+6,$.length);for(let Y=K;Y<U;Y++){let W=Y+1;Z.push(`${W===Q?">":" "} ${W}: ${$[Y]}`)}return Z.join(`
`)}var _H=new U9;function hq(J){M9._getMatrix(_H,M9.workingColorSpace,J);let Q=`mat3( ${_H.elements.map(($)=>$.toFixed(4))} )`;switch(M9.getTransfer(J)){case cK:return[Q,"LinearTransferOETF"];case p9:return[Q,"sRGBTransferOETF"];default:return e0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function BH(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),U=(J.getShaderInfoLog(Q)||"").trim();if(Z&&U==="")return"";let Y=/ERROR: 0:(\d+)/.exec(U);if(Y){let W=parseInt(Y[1]);return $.toUpperCase()+`

`+U+`

`+bq(J.getShaderSource(Q),W)}else return U}function xq(J,Q){let $=hq(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var gq={[NQ]:"Linear",[XQ]:"Reinhard",[DQ]:"Cineon",[g8]:"ACESFilmic",[FQ]:"AgX",[EQ]:"Neutral",[qQ]:"Custom"};function pq(J,Q){let $=gq[Q];if($===void 0)return e0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var NZ=new S;function mq(){M9.getLuminanceCoefficients(NZ);let J=NZ.x.toFixed(4),Q=NZ.y.toFixed(4),$=NZ.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function uq(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yQ).join(`
`)}function dq(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function lq(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let K=0;K<Z;K++){let U=J.getActiveAttrib(Q,K),Y=U.name,W=1;if(U.type===J.FLOAT_MAT2)W=2;if(U.type===J.FLOAT_MAT3)W=3;if(U.type===J.FLOAT_MAT4)W=4;$[Y]={type:U.type,location:J.getAttribLocation(Q,Y),locationSize:W}}return $}function yQ(J){return J!==""}function IH(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_SUN_LIGHTS/g,Q.numSunLights).replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,Q.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function CH(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var cq=/^[ \t]*#include +<([\w\d./]+)>/gm;function SU(J){return J.replace(cq,sq)}var nq=new Map;function sq(J,Q){let $=q9[Q];if($===void 0){let Z=nq.get(Q);if(Z!==void 0)$=q9[Z],e0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return SU($)}var iq=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zH(J){return J.replace(iq,oq)}function oq(J,Q,$,Z){let K="";for(let U=parseInt(Q);U<parseInt($);U++)K+=Z.replace(/\[\s*i\s*\]/g,"[ "+U+" ]").replace(/UNROLLED_LOOP_INDEX/g,U);return K}function AH(J){let Q=`precision ${J.precision} float;
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
#define LOW_PRECISION`;return Q}var aq={[HQ]:"SHADOWMAP_TYPE_PCF",[B6]:"SHADOWMAP_TYPE_VSM"};function rq(J){return aq[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var tq={[z6]:"ENVMAP_TYPE_CUBE",[wJ]:"ENVMAP_TYPE_CUBE",[OQ]:"ENVMAP_TYPE_CUBE_UV"};function eq(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return tq[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var JF={[wJ]:"ENVMAP_MODE_REFRACTION"};function QF(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return JF[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var $F={[PW]:"ENVMAP_BLENDING_MULTIPLY",[wW]:"ENVMAP_BLENDING_MIX",[TW]:"ENVMAP_BLENDING_ADD"};function ZF(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return $F[J.combine]||"ENVMAP_BLENDING_NONE"}function KF(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function UF(J,Q,$,Z){let K=J.getContext(),U=$.defines,Y=$.vertexShader,W=$.fragmentShader,H=rq($),G=eq($),X=QF($),F=ZF($),N=KF($),q=uq($),O=dq(U),M=K.createProgram(),D,E,I=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O].filter(yQ).join(`
`),D.length>0)D+=`
`;if(E=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O].filter(yQ).join(`
`),E.length>0)E+=`
`}else D=[AH($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+X:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+H:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(yQ).join(`
`),E=[AH($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+G:"",$.envMap?"#define "+X:"",$.envMap?"#define "+F:"",N?"#define CUBEUV_TEXEL_WIDTH "+N.texelWidth:"",N?"#define CUBEUV_TEXEL_HEIGHT "+N.texelHeight:"",N?"#define CUBEUV_MAX_MIP "+N.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.retroreflection?"#define USE_RETROREFLECTION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+H:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==J8?"#define TONE_MAPPING":"",$.toneMapping!==J8?q9.tonemapping_pars_fragment:"",$.toneMapping!==J8?pq("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",q9.colorspace_pars_fragment,xq("linearToOutputTexel",$.outputColorSpace),mq(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(yQ).join(`
`);if(Y=SU(Y),Y=IH(Y,$),Y=CH(Y,$),W=SU(W),W=IH(W,$),W=CH(W,$),Y=zH(Y),W=zH(W),$.isRawShaderMaterial!==!0)I=`#version 300 es
`,D=[q,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,E=["#define varying in",$.glslVersion===nK?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===nK?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E;let L=I+D+Y,R=I+E+W,B=VH(K,K.VERTEX_SHADER,L),_=VH(K,K.FRAGMENT_SHADER,R);if(K.attachShader(M,B),K.attachShader(M,_),$.index0AttributeName!==void 0)K.bindAttribLocation(M,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)K.bindAttribLocation(M,0,"position");K.linkProgram(M);function z(k){if(J.debug.checkShaderErrors){let b=K.getProgramInfoLog(M)||"",e=K.getShaderInfoLog(B)||"",v=K.getShaderInfoLog(_)||"",u=b.trim(),Q0=e.trim(),l=v.trim(),D0=!0,t=!0;if(K.getProgramParameter(M,K.LINK_STATUS)===!1)if(D0=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,M,B,_);else{let p=BH(K,B,"vertex"),J0=BH(K,_,"fragment");Z9("WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(M,K.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+u+`
`+p+`
`+J0)}else if(u!=="")e0("WebGLProgram: Program Info Log:",u);else if(Q0===""||l==="")t=!1;if(t)k.diagnostics={runnable:D0,programLog:u,vertexShader:{log:Q0,prefix:D},fragmentShader:{log:l,prefix:E}}}K.deleteShader(B),K.deleteShader(_),V=new fQ(K,M),C=lq(K,M)}let V;this.getUniforms=function(){if(V===void 0)z(this);return V};let C;this.getAttributes=function(){if(C===void 0)z(this);return C};let f=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(f===!1)f=K.getProgramParameter(M,yq);return f},this.destroy=function(){Z.releaseStatesOfProgram(this),K.deleteProgram(M),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=fq++,this.cacheKey=Q,this.usedTimes=1,this.program=M,this.vertexShader=B,this.fragmentShader=_,this}var YF=0;class gH{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let Z=this._getShaderCacheForMaterial(J);if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;if(Z.has($)===!1)Z.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new pH(J),Q.set(J,$);return $}}class pH{constructor(J){this.id=YF++,this.code=J,this.usedTimes=0}}function WF(J){return J===jJ||J===d$||J===l$}function HF(J,Q,$,Z,K,U){let Y=new i$,W=new gH,H=new Set,G=[],X=new Map,F=Z.logarithmicDepthBuffer,N=Z.precision,q={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function O(V){if(H.add(V),V===0)return"uv";return`uv${V}`}function M(V,C,f,k,b,e){let v=k.fog,u=b.geometry,Q0=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?k.environment:null,l=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,D0=Q.get(V.envMap||Q0,l),t=!!D0&&D0.mapping===OQ?D0.image.height:null,p=q[V.type];if(V.precision!==null){if(N=Z.getMaxPrecision(V.precision),N!==V.precision)e0("WebGLProgram.getParameters:",V.precision,"not supported, using",N,"instead.")}let J0=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,M0=J0!==void 0?J0.length:0,A0=0;if(u.morphAttributes.position!==void 0)A0=1;if(u.morphAttributes.normal!==void 0)A0=2;if(u.morphAttributes.color!==void 0)A0=3;let _0,E0,i,N0;if(p){let c9=z8[p];_0=c9.vertexShader,E0=c9.fragmentShader}else{_0=V.vertexShader,E0=V.fragmentShader;let c9=W.getVertexShaderStage(V),f9=W.getFragmentShaderStage(V);W.update(V,c9,f9),i=c9.id,N0=f9.id}let K0=J.getRenderTarget(),m=J.state.buffers.depth.getReversed(),C0=b.isInstancedMesh===!0,s=b.isBatchedMesh===!0,h0=!!V.map,r=!!V.matcap,X0=!!D0,O0=!!V.aoMap,V0=!!V.lightMap,L0=!!V.bumpMap&&V.wireframe===!1,s0=!!V.normalMap,a0=!!V.displacementMap,Y9=!!V.emissiveMap,W9=!!V.metalnessMap,y=!!V.roughnessMap,m9=V.anisotropy>0,O9=V.clearcoat>0,B9=V.dispersion>0,w=V.retroreflectivity>0,A=V.iridescence>0,h=V.sheen>0,o=V.transmission>0,q0=m9&&!!V.anisotropyMap,B0=O9&&!!V.clearcoatMap,w0=O9&&!!V.clearcoatNormalMap,$0=O9&&!!V.clearcoatRoughnessMap,Y0=A&&!!V.iridescenceMap,b0=A&&!!V.iridescenceThicknessMap,i0=h&&!!V.sheenColorMap,k0=h&&!!V.sheenRoughnessMap,I0=!!V.specularMap,r0=!!V.specularColorMap,Q9=!!V.specularIntensityMap,k9=o&&!!V.transmissionMap,g=o&&!!V.thicknessMap,T0=!!V.gradientMap,Z0=!!V.alphaMap,S0=V.alphaTest>0,x0=!!V.alphaHash,F0=!!V.extensions,v0=J8;if(V.toneMapped){if(K0===null||K0.isXRRenderTarget===!0)v0=J.toneMapping}let H9={shaderID:p,shaderType:V.type,shaderName:V.name,vertexShader:_0,fragmentShader:E0,defines:V.defines,customVertexShaderID:i,customFragmentShaderID:N0,isRawShaderMaterial:V.isRawShaderMaterial===!0,glslVersion:V.glslVersion,precision:N,batching:s,batchingColor:s&&b._colorsTexture!==null,instancing:C0,instancingColor:C0&&b.instanceColor!==null,instancingMorph:C0&&b.morphTexture!==null,outputColorSpace:K0===null?J.outputColorSpace:K0.isXRRenderTarget===!0?K0.texture.colorSpace:M9.workingColorSpace,alphaToCoverage:!!V.alphaToCoverage,map:h0,matcap:r,envMap:X0,envMapMode:X0&&D0.mapping,envMapCubeUVHeight:t,aoMap:O0,lightMap:V0,bumpMap:L0,normalMap:s0,displacementMap:a0,emissiveMap:Y9,normalMapObjectSpace:s0&&V.normalMapType===gW,normalMapTangentSpace:s0&&V.normalMapType===dK,packedNormalMap:s0&&V.normalMapType===dK&&WF(V.normalMap.format),metalnessMap:W9,roughnessMap:y,anisotropy:m9,anisotropyMap:q0,clearcoat:O9,clearcoatMap:B0,clearcoatNormalMap:w0,clearcoatRoughnessMap:$0,dispersion:B9,retroreflection:w,iridescence:A,iridescenceMap:Y0,iridescenceThicknessMap:b0,sheen:h,sheenColorMap:i0,sheenRoughnessMap:k0,specularMap:I0,specularColorMap:r0,specularIntensityMap:Q9,transmission:o,transmissionMap:k9,thicknessMap:g,gradientMap:T0,opaque:V.transparent===!1&&V.blending===GQ&&V.alphaToCoverage===!1,alphaMap:Z0,alphaTest:S0,alphaHash:x0,combine:V.combine,mapUv:h0&&O(V.map.channel),aoMapUv:O0&&O(V.aoMap.channel),lightMapUv:V0&&O(V.lightMap.channel),bumpMapUv:L0&&O(V.bumpMap.channel),normalMapUv:s0&&O(V.normalMap.channel),displacementMapUv:a0&&O(V.displacementMap.channel),emissiveMapUv:Y9&&O(V.emissiveMap.channel),metalnessMapUv:W9&&O(V.metalnessMap.channel),roughnessMapUv:y&&O(V.roughnessMap.channel),anisotropyMapUv:q0&&O(V.anisotropyMap.channel),clearcoatMapUv:B0&&O(V.clearcoatMap.channel),clearcoatNormalMapUv:w0&&O(V.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$0&&O(V.clearcoatRoughnessMap.channel),iridescenceMapUv:Y0&&O(V.iridescenceMap.channel),iridescenceThicknessMapUv:b0&&O(V.iridescenceThicknessMap.channel),sheenColorMapUv:i0&&O(V.sheenColorMap.channel),sheenRoughnessMapUv:k0&&O(V.sheenRoughnessMap.channel),specularMapUv:I0&&O(V.specularMap.channel),specularColorMapUv:r0&&O(V.specularColorMap.channel),specularIntensityMapUv:Q9&&O(V.specularIntensityMap.channel),transmissionMapUv:k9&&O(V.transmissionMap.channel),thicknessMapUv:g&&O(V.thicknessMap.channel),alphaMapUv:Z0&&O(V.alphaMap.channel),vertexTangents:!!u.attributes.tangent&&(s0||m9),vertexNormals:!!u.attributes.normal,vertexColors:V.vertexColors,vertexAlphas:V.vertexColors===!0&&!!u.attributes.color&&u.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!u.attributes.uv&&(h0||Z0),fog:!!v,useFog:V.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:V.wireframe===!1&&(V.flatShading===!0||u.attributes.normal===void 0&&s0===!1&&(V.isMeshLambertMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isMeshPhysicalMaterial)),sizeAttenuation:V.sizeAttenuation===!0,logarithmicDepthBuffer:F,reversedDepthBuffer:m,skinning:b.isSkinnedMesh===!0,hasPositionAttribute:u.attributes.position!==void 0,morphTargets:u.morphAttributes.position!==void 0,morphNormals:u.morphAttributes.normal!==void 0,morphColors:u.morphAttributes.color!==void 0,morphTargetsCount:M0,morphTextureStride:A0,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:e.length,numClippingPlanes:U.numPlanes,numClipIntersection:U.numIntersection,dithering:V.dithering,shadowMapEnabled:J.shadowMap.enabled&&f.length>0,shadowMapType:J.shadowMap.type,toneMapping:v0,decodeVideoTexture:h0&&V.map.isVideoTexture===!0&&M9.getTransfer(V.map.colorSpace)===p9,decodeVideoTextureEmissive:Y9&&V.emissiveMap.isVideoTexture===!0&&M9.getTransfer(V.emissiveMap.colorSpace)===p9,premultipliedAlpha:V.premultipliedAlpha,doubleSided:V.side===o9,flipSided:V.side===N7,useDepthPacking:V.depthPacking>=0,depthPacking:V.depthPacking||0,index0AttributeName:V.index0AttributeName,extensionClipCullDistance:F0&&V.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(F0&&V.extensions.multiDraw===!0||s)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:V.customProgramCacheKey()};return H9.vertexUv1s=H.has(1),H9.vertexUv2s=H.has(2),H9.vertexUv3s=H.has(3),H.clear(),H9}function D(V){let C=[];if(V.shaderID)C.push(V.shaderID);else C.push(V.customVertexShaderID),C.push(V.customFragmentShaderID);if(V.defines!==void 0)for(let f in V.defines)C.push(f),C.push(V.defines[f]);if(V.isRawShaderMaterial===!1)E(C,V),I(C,V),C.push(J.outputColorSpace);return C.push(V.customProgramCacheKey),C.join()}function E(V,C){V.push(C.precision),V.push(C.outputColorSpace),V.push(C.envMapMode),V.push(C.envMapCubeUVHeight),V.push(C.mapUv),V.push(C.alphaMapUv),V.push(C.lightMapUv),V.push(C.aoMapUv),V.push(C.bumpMapUv),V.push(C.normalMapUv),V.push(C.displacementMapUv),V.push(C.emissiveMapUv),V.push(C.metalnessMapUv),V.push(C.roughnessMapUv),V.push(C.anisotropyMapUv),V.push(C.clearcoatMapUv),V.push(C.clearcoatNormalMapUv),V.push(C.clearcoatRoughnessMapUv),V.push(C.iridescenceMapUv),V.push(C.iridescenceThicknessMapUv),V.push(C.sheenColorMapUv),V.push(C.sheenRoughnessMapUv),V.push(C.specularMapUv),V.push(C.specularColorMapUv),V.push(C.specularIntensityMapUv),V.push(C.transmissionMapUv),V.push(C.thicknessMapUv),V.push(C.combine),V.push(C.fogExp2),V.push(C.sizeAttenuation),V.push(C.morphTargetsCount),V.push(C.morphAttributeCount),V.push(C.numSunLights),V.push(C.numDirLights),V.push(C.numPointLights),V.push(C.numSpotLights),V.push(C.numSpotLightMaps),V.push(C.numHemiLights),V.push(C.numRectAreaLights),V.push(C.numSunLightShadows),V.push(C.numDirLightShadows),V.push(C.numPointLightShadows),V.push(C.numSpotLightShadows),V.push(C.numSpotLightShadowsWithMaps),V.push(C.numLightProbes),V.push(C.shadowMapType),V.push(C.toneMapping),V.push(C.numClippingPlanes),V.push(C.numClipIntersection),V.push(C.depthPacking)}function I(V,C){if(Y.disableAll(),C.instancing)Y.enable(0);if(C.instancingColor)Y.enable(1);if(C.instancingMorph)Y.enable(2);if(C.matcap)Y.enable(3);if(C.envMap)Y.enable(4);if(C.normalMapObjectSpace)Y.enable(5);if(C.normalMapTangentSpace)Y.enable(6);if(C.clearcoat)Y.enable(7);if(C.iridescence)Y.enable(8);if(C.alphaTest)Y.enable(9);if(C.vertexColors)Y.enable(10);if(C.vertexAlphas)Y.enable(11);if(C.vertexUv1s)Y.enable(12);if(C.vertexUv2s)Y.enable(13);if(C.vertexUv3s)Y.enable(14);if(C.vertexTangents)Y.enable(15);if(C.anisotropy)Y.enable(16);if(C.alphaHash)Y.enable(17);if(C.batching)Y.enable(18);if(C.dispersion)Y.enable(19);if(C.retroreflection)Y.enable(24);if(C.batchingColor)Y.enable(20);if(C.gradientMap)Y.enable(21);if(C.packedNormalMap)Y.enable(22);if(C.vertexNormals)Y.enable(23);if(V.push(Y.mask),Y.disableAll(),C.fog)Y.enable(0);if(C.useFog)Y.enable(1);if(C.flatShading)Y.enable(2);if(C.logarithmicDepthBuffer)Y.enable(3);if(C.reversedDepthBuffer)Y.enable(4);if(C.skinning)Y.enable(5);if(C.morphTargets)Y.enable(6);if(C.morphNormals)Y.enable(7);if(C.morphColors)Y.enable(8);if(C.premultipliedAlpha)Y.enable(9);if(C.shadowMapEnabled)Y.enable(10);if(C.doubleSided)Y.enable(11);if(C.flipSided)Y.enable(12);if(C.useDepthPacking)Y.enable(13);if(C.dithering)Y.enable(14);if(C.transmission)Y.enable(15);if(C.sheen)Y.enable(16);if(C.opaque)Y.enable(17);if(C.pointsUvs)Y.enable(18);if(C.decodeVideoTexture)Y.enable(19);if(C.decodeVideoTextureEmissive)Y.enable(20);if(C.alphaToCoverage)Y.enable(21);if(C.numLightProbeGrids>0)Y.enable(22);if(C.hasPositionAttribute)Y.enable(23);V.push(Y.mask)}function L(V){let C=q[V.type],f;if(C){let k=z8[C];f=H8.clone(k.uniforms)}else f=V.uniforms;return f}function R(V,C){let f=X.get(C);if(f!==void 0)++f.usedTimes;else f=new UF(J,C,V,K),G.push(f),X.set(C,f);return f}function B(V){if(--V.usedTimes===0){let C=G.indexOf(V);G[C]=G[G.length-1],G.pop(),X.delete(V.cacheKey),V.destroy()}}function _(V){W.remove(V)}function z(){W.dispose()}return{getParameters:M,getProgramCacheKey:D,getUniforms:L,acquireProgram:R,releaseProgram:B,releaseShaderCache:_,programs:G,dispose:z}}function GF(){let J=new WeakMap;function Q(Y){return J.has(Y)}function $(Y){let W=J.get(Y);if(W===void 0)W={},J.set(Y,W);return W}function Z(Y){J.delete(Y)}function K(Y,W,H){J.get(Y)[W]=H}function U(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:K,dispose:U}}function NF(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function LH(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function PH(){let J=[],Q=0,$=[],Z=[],K=[];function U(){Q=0,$.length=0,Z.length=0,K.length=0}function Y(N){let q=0;if(N.isInstancedMesh)q+=2;if(N.isSkinnedMesh)q+=1;return q}function W(N,q,O,M,D,E){let I=J[Q];if(I===void 0)I={id:N.id,object:N,geometry:q,material:O,materialVariant:Y(N),groupOrder:M,renderOrder:N.renderOrder,z:D,group:E},J[Q]=I;else I.id=N.id,I.object=N,I.geometry=q,I.material=O,I.materialVariant=Y(N),I.groupOrder=M,I.renderOrder=N.renderOrder,I.z=D,I.group=E;return Q++,I}function H(N,q,O,M,D,E,I){if(I.reversedDepth===!0)D=-D;let L=W(N,q,O,M,D,E);if(O.transmission>0)Z.push(L);else if(O.transparent===!0)K.push(L);else $.push(L)}function G(N,q,O,M,D,E){let I=W(N,q,O,M,D,E);if(O.transmission>0)Z.unshift(I);else if(O.transparent===!0)K.unshift(I);else $.unshift(I)}function X(N,q){if($.length>1)$.sort(N||NF);if(Z.length>1)Z.sort(q||LH);if(K.length>1)K.sort(q||LH)}function F(){for(let N=Q,q=J.length;N<q;N++){let O=J[N];if(O.id===null)break;O.id=null,O.object=null,O.geometry=null,O.material=null,O.group=null}}return{opaque:$,transmissive:Z,transparent:K,init:U,push:H,unshift:G,finish:F,sort:X}}function XF(){let J=new WeakMap;function Q(Z,K){let U=J.get(Z),Y;if(U===void 0)Y=new PH,J.set(Z,[Y]);else if(K>=U.length)Y=new PH,U.push(Y);else Y=U[K];return Y}function $(){J=new WeakMap}return{get:Q,dispose:$}}function DF(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={direction:new S,color:new W0};break;case"SpotLight":$={position:new S,direction:new S,color:new W0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new S,color:new W0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new S,skyColor:new W0,groundColor:new W0};break;case"RectAreaLight":$={color:new W0,position:new S,halfWidth:new S,halfHeight:new S};break}return J[Q.id]=$,$}}}function qF(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"SunLight":case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var FF=0;function EF(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function OF(J){let Q=new DF,$=qF(),Z={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let G=0;G<9;G++)Z.probe.push(new S);let K=new S,U=new j9,Y=new j9;function W(G){let X=0,F=0,N=0;for(let b=0;b<9;b++)Z.probe[b].set(0,0,0);let q=0,O=0,M=0,D=0,E=0,I=0,L=0,R=0,B=0,_=0,z=0,V=0,C=0,f=0;G.sort(EF);for(let b=0,e=G.length;b<e;b++){let v=G[b],u=v.color,Q0=v.intensity,l=v.distance,D0=null;if(v.shadow&&v.shadow.map)if(v.shadow.map.texture.format===jJ)D0=v.shadow.map.texture;else D0=v.shadow.map.depthTexture||v.shadow.map.texture;if(v.isAmbientLight)X+=u.r*Q0,F+=u.g*Q0,N+=u.b*Q0;else if(v.isLightProbe){for(let t=0;t<9;t++)Z.probe[t].addScaledVector(v.sh.coefficients[t],Q0);f++}else if(v.isSunLight){let t=Q.get(v);if(t.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){let p=v.shadow,J0=$.get(v);J0.shadowIntensity=p.intensity,J0.shadowBias=p.bias,J0.shadowNormalBias=p.normalBias,J0.shadowRadius=p.radius,J0.shadowMapSize.copy(p.mapSize).multiply(p.getFrameExtents()),Z.sunShadow[O]=J0,Z.sunShadowMap[O]=D0;let M0=p.getViewportCount();for(let A0=0;A0<M0;A0++)Z.sunShadowMatrix[M+A0]=p.getMatrix(A0),Z.sunShadowCascade[M+A0]=p._cascadeData[A0];M+=M0,O++}Z.sun[q]=t,q++}else if(v.isDirectionalLight){let t=Q.get(v);if(t.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){let p=v.shadow,J0=$.get(v);J0.shadowIntensity=p.intensity,J0.shadowBias=p.bias,J0.shadowNormalBias=p.normalBias,J0.shadowRadius=p.radius,J0.shadowMapSize=p.mapSize,Z.directionalShadow[D]=J0,Z.directionalShadowMap[D]=D0,Z.directionalShadowMatrix[D]=v.shadow.matrix,B++}Z.directional[D]=t,D++}else if(v.isSpotLight){let t=Q.get(v);t.position.setFromMatrixPosition(v.matrixWorld),t.color.copy(u).multiplyScalar(Q0),t.distance=l,t.coneCos=Math.cos(v.angle),t.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),t.decay=v.decay,Z.spot[I]=t;let p=v.shadow;if(v.map){if(Z.spotLightMap[V]=v.map,V++,p.updateMatrices(v),v.castShadow)C++}if(Z.spotLightMatrix[I]=p.matrix,v.castShadow){let J0=$.get(v);J0.shadowIntensity=p.intensity,J0.shadowBias=p.bias,J0.shadowNormalBias=p.normalBias,J0.shadowRadius=p.radius,J0.shadowMapSize=p.mapSize,Z.spotShadow[I]=J0,Z.spotShadowMap[I]=D0,z++}I++}else if(v.isRectAreaLight){let t=Q.get(v);t.color.copy(u).multiplyScalar(Q0),t.halfWidth.set(v.width*0.5,0,0),t.halfHeight.set(0,v.height*0.5,0),Z.rectArea[L]=t,L++}else if(v.isPointLight){let t=Q.get(v);if(t.color.copy(v.color).multiplyScalar(v.intensity),t.distance=v.distance,t.decay=v.decay,v.castShadow){let p=v.shadow,J0=$.get(v);J0.shadowIntensity=p.intensity,J0.shadowBias=p.bias,J0.shadowNormalBias=p.normalBias,J0.shadowRadius=p.radius,J0.shadowMapSize=p.mapSize,J0.shadowCameraNear=p.camera.near,J0.shadowCameraFar=p.camera.far,Z.pointShadow[E]=J0,Z.pointShadowMap[E]=D0,Z.pointShadowMatrix[E]=v.shadow.matrix,_++}Z.point[E]=t,E++}else if(v.isHemisphereLight){let t=Q.get(v);t.skyColor.copy(v.color).multiplyScalar(Q0),t.groundColor.copy(v.groundColor).multiplyScalar(Q0),Z.hemi[R]=t,R++}}if(L>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=j0.LTC_FLOAT_1,Z.rectAreaLTC2=j0.LTC_FLOAT_2;else Z.rectAreaLTC1=j0.LTC_HALF_1,Z.rectAreaLTC2=j0.LTC_HALF_2;Z.ambient[0]=X,Z.ambient[1]=F,Z.ambient[2]=N;let k=Z.hash;if(k.sunLength!==q||k.directionalLength!==D||k.pointLength!==E||k.spotLength!==I||k.rectAreaLength!==L||k.hemiLength!==R||k.numSunShadows!==O||k.numDirectionalShadows!==B||k.numPointShadows!==_||k.numSpotShadows!==z||k.numSpotMaps!==V||k.numLightProbes!==f)Z.sun.length=q,Z.directional.length=D,Z.spot.length=I,Z.rectArea.length=L,Z.point.length=E,Z.hemi.length=R,Z.sunShadow.length=O,Z.sunShadowMap.length=O,Z.sunShadowMatrix.length=M,Z.sunShadowCascade.length=M,Z.directionalShadow.length=B,Z.directionalShadowMap.length=B,Z.directionalShadowMatrix.length=B,Z.pointShadow.length=_,Z.pointShadowMap.length=_,Z.pointShadowMatrix.length=_,Z.spotShadow.length=z,Z.spotShadowMap.length=z,Z.spotLightMatrix.length=z+V-C,Z.spotLightMap.length=V,Z.numSpotLightShadowsWithMaps=C,Z.numLightProbes=f,k.sunLength=q,k.directionalLength=D,k.pointLength=E,k.spotLength=I,k.rectAreaLength=L,k.hemiLength=R,k.numSunShadows=O,k.numDirectionalShadows=B,k.numPointShadows=_,k.numSpotShadows=z,k.numSpotMaps=V,k.numLightProbes=f,Z.version=FF++}function H(G,X){let F=0,N=0,q=0,O=0,M=0,D=0,E=X.matrixWorldInverse;for(let I=0,L=G.length;I<L;I++){let R=G[I];if(R.isSunLight){let B=Z.sun[F];B.direction.setFromMatrixPosition(R.matrixWorld),B.direction.transformDirection(E),F++}else if(R.isDirectionalLight){let B=Z.directional[N];B.direction.setFromMatrixPosition(R.matrixWorld),K.setFromMatrixPosition(R.target.matrixWorld),B.direction.sub(K),B.direction.transformDirection(E),N++}else if(R.isSpotLight){let B=Z.spot[O];B.position.setFromMatrixPosition(R.matrixWorld),B.position.applyMatrix4(E),B.direction.setFromMatrixPosition(R.matrixWorld),K.setFromMatrixPosition(R.target.matrixWorld),B.direction.sub(K),B.direction.transformDirection(E),O++}else if(R.isRectAreaLight){let B=Z.rectArea[M];B.position.setFromMatrixPosition(R.matrixWorld),B.position.applyMatrix4(E),Y.identity(),U.copy(R.matrixWorld),U.premultiply(E),Y.extractRotation(U),B.halfWidth.set(R.width*0.5,0,0),B.halfHeight.set(0,R.height*0.5,0),B.halfWidth.applyMatrix4(Y),B.halfHeight.applyMatrix4(Y),M++}else if(R.isPointLight){let B=Z.point[q];B.position.setFromMatrixPosition(R.matrixWorld),B.position.applyMatrix4(E),q++}else if(R.isHemisphereLight){let B=Z.hemi[D];B.direction.setFromMatrixPosition(R.matrixWorld),B.direction.transformDirection(E),D++}}}return{setup:W,setupView:H,state:Z}}function wH(J){let Q=new OF(J),$=[],Z=[],K=[];function U(N){F.camera=N,$.length=0,Z.length=0,K.length=0}function Y(N){$.push(N)}function W(N){Z.push(N)}function H(N){K.push(N)}function G(){Q.setup($)}function X(N){Q.setupView($,N)}let F={lightsArray:$,shadowsArray:Z,lightProbeGridArray:K,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:U,state:F,setupLights:G,setupLightsView:X,pushLight:Y,pushShadow:W,pushLightProbeGrid:H}}function RF(J){let Q=new WeakMap;function $(K,U=0){let Y=Q.get(K),W;if(Y===void 0)W=new wH(J),Q.set(K,[W]);else if(U>=Y.length)W=new wH(J),Y.push(W);else W=Y[U];return W}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var MF=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,VF=`uniform sampler2D shadow_pass;
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
}`,_F=[new S(1,0,0),new S(-1,0,0),new S(0,1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1)],BF=[new S(0,-1,0),new S(0,-1,0),new S(0,0,1),new S(0,0,-1),new S(0,-1,0),new S(0,-1,0)],TH=new j9,vQ=new S,PU=new S;function IF(J,Q,$){let Z=new CQ,K=new U0,U=new U0,Y=new r9,W=new SQ,H=new UU,G={},X=$.maxTextureSize,F={[I6]:N7,[N7]:I6,[o9]:o9},N=new v9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U0},radius:{value:4}},vertexShader:MF,fragmentShader:VF}),q=N.clone();q.defines.HORIZONTAL_PASS=1;let O=new F9;O.setAttribute("position",new Q7(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let M=new d(O,N),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=HQ;let E=this.type;this.render=function(_,z,V){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(_.length===0)return;if(this.type===_6)e0("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=HQ;let C=J.getRenderTarget(),f=J.getActiveCubeFace(),k=J.getActiveMipmapLevel(),b=J.state;if(b.setBlending(j7),b.buffers.depth.getReversed()===!0)b.buffers.color.setClear(0,0,0,0);else b.buffers.color.setClear(1,1,1,1);b.buffers.depth.setTest(!0),b.setScissorTest(!1);let e=E!==this.type;if(e)z.traverse(function(v){if(v.material)if(Array.isArray(v.material))v.material.forEach((u)=>u.needsUpdate=!0);else v.material.needsUpdate=!0});for(let v=0,u=_.length;v<u;v++){let Q0=_[v],l=Q0.shadow;if(l===void 0){e0("WebGLShadowMap:",Q0,"has no shadow.");continue}if(l.autoUpdate===!1&&l.needsUpdate===!1)continue;K.copy(l.mapSize);let D0=l.getFrameExtents();if(K.multiply(D0),U.copy(l.mapSize),K.x>X||K.y>X){if(K.x>X)U.x=Math.floor(X/D0.x),K.x=U.x*D0.x,l.mapSize.x=U.x;if(K.y>X)U.y=Math.floor(X/D0.y),K.y=U.y*D0.y,l.mapSize.y=U.y}let t=J.state.buffers.depth.getReversed();if(l.camera._reversedDepth=t,l.map===null||e===!0){if(l.map!==null){if(l.map.depthTexture!==null)l.map.depthTexture.dispose(),l.map.depthTexture=null;l.map.dispose()}if(this.type===B6){if(Q0.isPointLight){e0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}l.map=new W7(K.x,K.y,{format:jJ,type:F7,minFilter:v7,magFilter:v7,generateMipmaps:!1}),l.map.texture.name=Q0.name+".shadowMap",l.map.depthTexture=new bJ(K.x,K.y,p8),l.map.depthTexture.name=Q0.name+".shadowMapDepth",l.map.depthTexture.format=SJ,l.map.depthTexture.compareFunction=null,l.map.depthTexture.minFilter=u7,l.map.depthTexture.magFilter=u7}else{if(Q0.isPointLight)l.map=new kU(K.x),l.map.depthTexture=new eK(K.x,OJ);else l.map=new W7(K.x,K.y),l.map.depthTexture=new bJ(K.x,K.y,OJ);if(l.map.depthTexture.name=Q0.name+".shadowMap",l.map.depthTexture.format=SJ,this.type===HQ)l.map.depthTexture.compareFunction=t?n$:c$,l.map.depthTexture.minFilter=v7,l.map.depthTexture.magFilter=v7;else l.map.depthTexture.compareFunction=null,l.map.depthTexture.minFilter=u7,l.map.depthTexture.magFilter=u7}l.camera.updateProjectionMatrix()}if(l.map.isWebGLCubeRenderTarget!==!0&&(l.map.width!==K.x||l.map.height!==K.y))l.map.setSize(K.x,K.y);let p=l.map.isWebGLCubeRenderTarget?6:l.getViewportCount();if(Q0.isPointLight!==!0)l.updateMatrices(Q0,V);for(let J0=0;J0<p;J0++){let M0=l.getCamera(J0);if(Q0.isPointLight){let{camera:A0,matrix:_0}=l,E0=Q0.distance||A0.far;if(E0!==A0.far)A0.far=E0,A0.updateProjectionMatrix();vQ.setFromMatrixPosition(Q0.matrixWorld),A0.position.copy(vQ),PU.copy(A0.position),PU.add(_F[J0]),A0.up.copy(BF[J0]),A0.lookAt(PU),A0.updateMatrixWorld(),_0.makeTranslation(-vQ.x,-vQ.y,-vQ.z),TH.multiplyMatrices(A0.projectionMatrix,A0.matrixWorldInverse),l._frustum.setFromProjectionMatrix(TH,A0.coordinateSystem,A0.reversedDepth)}if(l.map.isWebGLCubeRenderTarget)J.setRenderTarget(l.map,J0),J.clear();else{if(J0===0)J.setRenderTarget(l.map),J.clear();let A0=l.getViewport(J0);Y.set(U.x*A0.x,U.y*A0.y,U.x*A0.z,U.y*A0.w),b.viewport(Y)}Z=l.getFrustum(J0),R(z,V,M0,Q0,this.type)}if(l.isPointLightShadow!==!0&&this.type===B6)I(l,V);l.needsUpdate=!1}E=this.type,D.needsUpdate=!1,J.setRenderTarget(C,f,k)};function I(_,z){let V=Q.update(M);if(N.defines.VSM_SAMPLES!==_.blurSamples)N.defines.VSM_SAMPLES=_.blurSamples,q.defines.VSM_SAMPLES=_.blurSamples,N.needsUpdate=!0,q.needsUpdate=!0;if(_.mapPass===null)_.mapPass=new W7(K.x,K.y,{format:jJ,type:F7});else if(_.mapPass.width!==_.map.width||_.mapPass.height!==_.map.height)_.mapPass.setSize(_.map.width,_.map.height);N.uniforms.shadow_pass.value=_.map.depthTexture,N.uniforms.resolution.value.set(_.map.width,_.map.height),N.uniforms.radius.value=_.radius,J.setRenderTarget(_.mapPass),J.clear(),J.renderBufferDirect(z,null,V,N,M,null),q.uniforms.shadow_pass.value=_.mapPass.texture,q.uniforms.resolution.value.set(_.map.width,_.map.height),q.uniforms.radius.value=_.radius,J.setRenderTarget(_.map),J.clear(),J.renderBufferDirect(z,null,V,q,M,null)}function L(_,z,V,C){let f=null,k=V.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(k!==void 0)f=k;else if(f=V.isPointLight===!0?H:W,J.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0||z.alphaToCoverage===!0){let b=f.uuid,e=z.uuid,v=G[b];if(v===void 0)v={},G[b]=v;let u=v[e];if(u===void 0)u=f.clone(),v[e]=u,z.addEventListener("dispose",B);f=u}if(f.visible=z.visible,f.wireframe=z.wireframe,C===B6)f.side=z.shadowSide!==null?z.shadowSide:z.side;else f.side=z.shadowSide!==null?z.shadowSide:F[z.side];if(f.alphaMap=z.alphaMap,f.alphaTest=z.alphaToCoverage===!0?0.5:z.alphaTest,f.map=z.map,f.clipShadows=z.clipShadows,f.clippingPlanes=z.clippingPlanes,f.clipIntersection=z.clipIntersection,f.displacementMap=z.displacementMap,f.displacementScale=z.displacementScale,f.displacementBias=z.displacementBias,f.wireframeLinewidth=z.wireframeLinewidth,f.linewidth=z.linewidth,V.isPointLight===!0&&f.isMeshDistanceMaterial===!0){let b=J.properties.get(f);b.light=V}return f}function R(_,z,V,C,f){if(_.visible===!1)return;if(_.layers.test(z.layers)&&(_.isMesh||_.isLine||_.isPoints)){if((_.castShadow||_.receiveShadow&&f===B6)&&(!_.frustumCulled||_.intersectsFrustum(Z))){_.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,_.matrixWorld);let e=Q.update(_),v=_.material;if(Array.isArray(v)){let u=e.groups;for(let Q0=0,l=u.length;Q0<l;Q0++){let D0=u[Q0],t=v[D0.materialIndex];if(t&&t.visible){let p=L(_,t,C,f);_.onBeforeShadow(J,_,z,V,e,p,D0),J.renderBufferDirect(V,null,e,p,_,D0),_.onAfterShadow(J,_,z,V,e,p,D0)}}}else if(v.visible){let u=L(_,v,C,f);_.onBeforeShadow(J,_,z,V,e,u,null),J.renderBufferDirect(V,null,e,u,_,null),_.onAfterShadow(J,_,z,V,e,u,null)}}}let b=_.children;for(let e=0,v=b.length;e<v;e++)R(b[e],z,V,C,f)}function B(_){_.target.removeEventListener("dispose",B);for(let V in G){let C=G[V],f=_.target.uuid;if(f in C)C[f].dispose(),delete C[f]}}}function CF(J,Q){function $(){let g=!1,T0=new r9,Z0=null,S0=new r9(0,0,0,0);return{setMask:function(x0){if(Z0!==x0&&!g)J.colorMask(x0,x0,x0,x0),Z0=x0},setLocked:function(x0){g=x0},setClear:function(x0,F0,v0,H9,c9){if(c9===!0)x0*=H9,F0*=H9,v0*=H9;if(T0.set(x0,F0,v0,H9),S0.equals(T0)===!1)J.clearColor(x0,F0,v0,H9),S0.copy(T0)},reset:function(){g=!1,Z0=null,S0.set(-1,0,0,0)}}}function Z(){let g=!1,T0=!1,Z0=null,S0=null,x0=null;return{setReversed:function(F0){if(T0!==F0){let v0=Q.get("EXT_clip_control");if(F0)v0.clipControlEXT(v0.LOWER_LEFT_EXT,v0.ZERO_TO_ONE_EXT);else v0.clipControlEXT(v0.LOWER_LEFT_EXT,v0.NEGATIVE_ONE_TO_ONE_EXT);T0=F0;let H9=x0;x0=null,this.setClear(H9)}},getReversed:function(){return T0},setTest:function(F0){if(F0)K0(J.DEPTH_TEST);else m(J.DEPTH_TEST)},setMask:function(F0){if(Z0!==F0&&!g)J.depthMask(F0),Z0=F0},setFunc:function(F0){if(T0)F0=oW[F0];if(S0!==F0){switch(F0){case _W:J.depthFunc(J.NEVER);break;case BW:J.depthFunc(J.ALWAYS);break;case IW:J.depthFunc(J.LESS);break;case UK:J.depthFunc(J.LEQUAL);break;case CW:J.depthFunc(J.EQUAL);break;case zW:J.depthFunc(J.GEQUAL);break;case AW:J.depthFunc(J.GREATER);break;case LW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}S0=F0}},setLocked:function(F0){g=F0},setClear:function(F0){if(x0!==F0){if(x0=F0,T0)F0=1-F0;J.clearDepth(F0)}},reset:function(){g=!1,Z0=null,S0=null,x0=null,T0=!1}}}function K(){let g=!1,T0=null,Z0=null,S0=null,x0=null,F0=null,v0=null,H9=null,c9=null;return{setTest:function(f9){if(!g)if(f9)K0(J.STENCIL_TEST);else m(J.STENCIL_TEST)},setMask:function(f9){if(T0!==f9&&!g)J.stencilMask(f9),T0=f9},setFunc:function(f9,D8,w8){if(Z0!==f9||S0!==D8||x0!==w8)J.stencilFunc(f9,D8,w8),Z0=f9,S0=D8,x0=w8},setOp:function(f9,D8,w8){if(F0!==f9||v0!==D8||H9!==w8)J.stencilOp(f9,D8,w8),F0=f9,v0=D8,H9=w8},setLocked:function(f9){g=f9},setClear:function(f9){if(c9!==f9)J.clearStencil(f9),c9=f9},reset:function(){g=!1,T0=null,Z0=null,S0=null,x0=null,F0=null,v0=null,H9=null,c9=null}}}let U=new $,Y=new Z,W=new K,H=new WeakMap,G=new WeakMap,X={},F={},N={},q=new WeakMap,O=[],M=null,D=!1,E=null,I=null,L=null,R=null,B=null,_=null,z=null,V=new W0(0,0,0),C=0,f=!1,k=null,b=null,e=null,v=null,u=null,Q0=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),l=!1,D0=0,t=J.getParameter(J.VERSION);if(t.indexOf("WebGL")!==-1)D0=parseFloat(/^WebGL (\d)/.exec(t)[1]),l=D0>=1;else if(t.indexOf("OpenGL ES")!==-1)D0=parseFloat(/^OpenGL ES (\d)/.exec(t)[1]),l=D0>=2;let p=null,J0={},M0=J.getParameter(J.SCISSOR_BOX),A0=J.getParameter(J.VIEWPORT),_0=new r9().fromArray(M0),E0=new r9().fromArray(A0);function i(g,T0,Z0,S0){let x0=new Uint8Array(4),F0=J.createTexture();J.bindTexture(g,F0),J.texParameteri(g,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(g,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let v0=0;v0<Z0;v0++)if(g===J.TEXTURE_3D||g===J.TEXTURE_2D_ARRAY)J.texImage3D(T0,0,J.RGBA,1,1,S0,0,J.RGBA,J.UNSIGNED_BYTE,x0);else J.texImage2D(T0+v0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,x0);return F0}let N0={};N0[J.TEXTURE_2D]=i(J.TEXTURE_2D,J.TEXTURE_2D,1),N0[J.TEXTURE_CUBE_MAP]=i(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),N0[J.TEXTURE_2D_ARRAY]=i(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),N0[J.TEXTURE_3D]=i(J.TEXTURE_3D,J.TEXTURE_3D,1,1),U.setClear(0,0,0,1),Y.setClear(1),W.setClear(0),K0(J.DEPTH_TEST),Y.setFunc(UK),L0(!1),s0($K),K0(J.CULL_FACE),O0(j7);function K0(g){if(X[g]!==!0)J.enable(g),X[g]=!0}function m(g){if(X[g]!==!1)J.disable(g),X[g]=!1}function C0(g,T0){if(N[g]!==T0){if(J.bindFramebuffer(g,T0),N[g]=T0,g===J.DRAW_FRAMEBUFFER)N[J.FRAMEBUFFER]=T0;if(g===J.FRAMEBUFFER)N[J.DRAW_FRAMEBUFFER]=T0;return!0}return!1}function s(g,T0){let Z0=O,S0=!1;if(g){if(Z0=q.get(T0),Z0===void 0)Z0=[],q.set(T0,Z0);let x0=g.textures;if(Z0.length!==x0.length||Z0[0]!==J.COLOR_ATTACHMENT0){for(let F0=0,v0=x0.length;F0<v0;F0++)Z0[F0]=J.COLOR_ATTACHMENT0+F0;Z0.length=x0.length,S0=!0}}else if(Z0[0]!==J.BACK)Z0[0]=J.BACK,S0=!0;if(S0)J.drawBuffers(Z0)}function h0(g){if(M!==g)return J.useProgram(g),M=g,!0;return!1}let r={[C6]:J.FUNC_ADD,[QW]:J.FUNC_SUBTRACT,[$W]:J.FUNC_REVERSE_SUBTRACT};r[ZW]=J.MIN,r[KW]=J.MAX;let X0={[UW]:J.ZERO,[YW]:J.ONE,[WW]:J.SRC_COLOR,[GW]:J.SRC_ALPHA,[EW]:J.SRC_ALPHA_SATURATE,[qW]:J.DST_COLOR,[XW]:J.DST_ALPHA,[HW]:J.ONE_MINUS_SRC_COLOR,[NW]:J.ONE_MINUS_SRC_ALPHA,[FW]:J.ONE_MINUS_DST_COLOR,[DW]:J.ONE_MINUS_DST_ALPHA,[OW]:J.CONSTANT_COLOR,[RW]:J.ONE_MINUS_CONSTANT_COLOR,[MW]:J.CONSTANT_ALPHA,[VW]:J.ONE_MINUS_CONSTANT_ALPHA};function O0(g,T0,Z0,S0,x0,F0,v0,H9,c9,f9){if(g===j7){if(D===!0)m(J.BLEND),D=!1;return}if(D===!1)K0(J.BLEND),D=!0;if(g!==JW){if(g!==E||f9!==f){if(I!==C6||B!==C6)J.blendEquation(J.FUNC_ADD),I=C6,B=C6;if(f9)switch(g){case GQ:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case Z7:J.blendFunc(J.ONE,J.ONE);break;case ZK:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case KK:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:Z9("WebGLState: Invalid blending: ",g);break}else switch(g){case GQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case Z7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case ZK:Z9("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case KK:Z9("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Z9("WebGLState: Invalid blending: ",g);break}L=null,R=null,_=null,z=null,V.set(0,0,0),C=0,E=g,f=f9}return}if(x0=x0||T0,F0=F0||Z0,v0=v0||S0,T0!==I||x0!==B)J.blendEquationSeparate(r[T0],r[x0]),I=T0,B=x0;if(Z0!==L||S0!==R||F0!==_||v0!==z)J.blendFuncSeparate(X0[Z0],X0[S0],X0[F0],X0[v0]),L=Z0,R=S0,_=F0,z=v0;if(H9.equals(V)===!1||c9!==C)J.blendColor(H9.r,H9.g,H9.b,c9),V.copy(H9),C=c9;E=g,f=!1}function V0(g,T0){g.side===o9?m(J.CULL_FACE):K0(J.CULL_FACE);let Z0=g.side===N7;if(T0)Z0=!Z0;L0(Z0),g.blending===GQ&&g.transparent===!1?O0(j7):O0(g.blending,g.blendEquation,g.blendSrc,g.blendDst,g.blendEquationAlpha,g.blendSrcAlpha,g.blendDstAlpha,g.blendColor,g.blendAlpha,g.premultipliedAlpha),Y.setFunc(g.depthFunc),Y.setTest(g.depthTest),Y.setMask(g.depthWrite),U.setMask(g.colorWrite);let S0=g.stencilWrite;if(W.setTest(S0),S0)W.setMask(g.stencilWriteMask),W.setFunc(g.stencilFunc,g.stencilRef,g.stencilFuncMask),W.setOp(g.stencilFail,g.stencilZFail,g.stencilZPass);Y9(g.polygonOffset,g.polygonOffsetFactor,g.polygonOffsetUnits),g.alphaToCoverage===!0?K0(J.SAMPLE_ALPHA_TO_COVERAGE):m(J.SAMPLE_ALPHA_TO_COVERAGE)}function L0(g){if(k!==g){if(g)J.frontFace(J.CW);else J.frontFace(J.CCW);k=g}}function s0(g){if(g!==tY){if(K0(J.CULL_FACE),g!==b)if(g===$K)J.cullFace(J.BACK);else if(g===eY)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else m(J.CULL_FACE);b=g}function a0(g){if(g!==e){if(l)J.lineWidth(g);e=g}}function Y9(g,T0,Z0){if(g){if(K0(J.POLYGON_OFFSET_FILL),v!==T0||u!==Z0){if(v=T0,u=Z0,Y.getReversed())T0=-T0;J.polygonOffset(T0,Z0)}}else m(J.POLYGON_OFFSET_FILL)}function W9(g){if(g)K0(J.SCISSOR_TEST);else m(J.SCISSOR_TEST)}function y(g){if(g===void 0)g=J.TEXTURE0+Q0-1;if(p!==g)J.activeTexture(g),p=g}function m9(g,T0,Z0){if(Z0===void 0)if(p===null)Z0=J.TEXTURE0+Q0-1;else Z0=p;let S0=J0[Z0];if(S0===void 0)S0={type:void 0,texture:void 0},J0[Z0]=S0;if(S0.type!==g||S0.texture!==T0){if(p!==Z0)J.activeTexture(Z0),p=Z0;J.bindTexture(g,T0||N0[g]),S0.type=g,S0.texture=T0}}function O9(){let g=J0[p];if(g!==void 0&&g.type!==void 0)J.bindTexture(g.type,null),g.type=void 0,g.texture=void 0}function B9(){try{J.compressedTexImage2D(...arguments)}catch(g){Z9("WebGLState:",g)}}function w(){try{J.compressedTexImage3D(...arguments)}catch(g){Z9("WebGLState:",g)}}function A(){try{J.texSubImage2D(...arguments)}catch(g){Z9("WebGLState:",g)}}function h(){try{J.texSubImage3D(...arguments)}catch(g){Z9("WebGLState:",g)}}function o(){try{J.compressedTexSubImage2D(...arguments)}catch(g){Z9("WebGLState:",g)}}function q0(){try{J.compressedTexSubImage3D(...arguments)}catch(g){Z9("WebGLState:",g)}}function B0(){try{J.texStorage2D(...arguments)}catch(g){Z9("WebGLState:",g)}}function w0(){try{J.texStorage3D(...arguments)}catch(g){Z9("WebGLState:",g)}}function $0(){try{J.texImage2D(...arguments)}catch(g){Z9("WebGLState:",g)}}function Y0(){try{J.texImage3D(...arguments)}catch(g){Z9("WebGLState:",g)}}function b0(g){if(F[g]!==void 0)return F[g];else return J.getParameter(g)}function i0(g,T0){if(F[g]!==T0)J.pixelStorei(g,T0),F[g]=T0}function k0(g){if(_0.equals(g)===!1)J.scissor(g.x,g.y,g.z,g.w),_0.copy(g)}function I0(g){if(E0.equals(g)===!1)J.viewport(g.x,g.y,g.z,g.w),E0.copy(g)}function r0(g,T0){let Z0=G.get(T0);if(Z0===void 0)Z0=new WeakMap,G.set(T0,Z0);let S0=Z0.get(g);if(S0===void 0)S0=J.getUniformBlockIndex(T0,g.name),Z0.set(g,S0)}function Q9(g,T0){let S0=G.get(T0).get(g);if(H.get(T0)!==S0)J.uniformBlockBinding(T0,S0,g.__bindingPointIndex),H.set(T0,S0)}function k9(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),Y.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),X={},F={},p=null,J0={},N={},q=new WeakMap,O=[],M=null,D=!1,E=null,I=null,L=null,R=null,B=null,_=null,z=null,V=new W0(0,0,0),C=0,f=!1,k=null,b=null,e=null,v=null,u=null,_0.set(0,0,J.canvas.width,J.canvas.height),E0.set(0,0,J.canvas.width,J.canvas.height),U.reset(),Y.reset(),W.reset()}return{buffers:{color:U,depth:Y,stencil:W},enable:K0,disable:m,bindFramebuffer:C0,drawBuffers:s,useProgram:h0,setBlending:O0,setMaterial:V0,setFlipSided:L0,setCullFace:s0,setLineWidth:a0,setPolygonOffset:Y9,setScissorTest:W9,activeTexture:y,bindTexture:m9,unbindTexture:O9,compressedTexImage2D:B9,compressedTexImage3D:w,texImage2D:$0,texImage3D:Y0,pixelStorei:i0,getParameter:b0,updateUBOMapping:r0,uniformBlockBinding:Q9,texStorage2D:B0,texStorage3D:w0,texSubImage2D:A,texSubImage3D:h,compressedTexSubImage2D:o,compressedTexSubImage3D:q0,scissor:k0,viewport:I0,reset:k9}}function zF(J,Q,$,Z,K,U,Y){let W=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,H=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),G=new U0,X=new WeakMap,F=new Set,N,q=new WeakMap,O=!1;try{O=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(w){}function M(w,A){return O?new OffscreenCanvas(w,A):QQ("canvas")}function D(w,A,h){let o=1,q0=B9(w);if(q0.width>h||q0.height>h)o=h/Math.max(q0.width,q0.height);if(o<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let B0=Math.floor(o*q0.width),w0=Math.floor(o*q0.height);if(N===void 0)N=M(B0,w0);let $0=A?M(B0,w0):N;return $0.width=B0,$0.height=w0,$0.getContext("2d").drawImage(w,0,0,B0,w0),e0("WebGLRenderer: Texture has been resized from ("+q0.width+"x"+q0.height+") to ("+B0+"x"+w0+")."),$0}else{if("data"in w)e0("WebGLRenderer: Image in DataTexture is too big ("+q0.width+"x"+q0.height+").");return w}return w}function E(w){return w.generateMipmaps}function I(w){J.generateMipmap(w)}function L(w){if(w.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(w.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function R(w,A,h,o,q0,B0=!1){if(w!==null){if(J[w]!==void 0)return J[w];e0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let w0;if(o){if(w0=Q.get("EXT_texture_norm16"),!w0)e0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let $0=A;if(A===J.RED){if(h===J.FLOAT)$0=J.R32F;if(h===J.HALF_FLOAT)$0=J.R16F;if(h===J.UNSIGNED_BYTE)$0=J.R8;if(h===J.UNSIGNED_SHORT&&w0)$0=w0.R16_EXT;if(h===J.SHORT&&w0)$0=w0.R16_SNORM_EXT}if(A===J.RED_INTEGER){if(h===J.UNSIGNED_BYTE)$0=J.R8UI;if(h===J.UNSIGNED_SHORT)$0=J.R16UI;if(h===J.UNSIGNED_INT)$0=J.R32UI;if(h===J.BYTE)$0=J.R8I;if(h===J.SHORT)$0=J.R16I;if(h===J.INT)$0=J.R32I}if(A===J.RG){if(h===J.FLOAT)$0=J.RG32F;if(h===J.HALF_FLOAT)$0=J.RG16F;if(h===J.UNSIGNED_BYTE)$0=J.RG8;if(h===J.UNSIGNED_SHORT&&w0)$0=w0.RG16_EXT;if(h===J.SHORT&&w0)$0=w0.RG16_SNORM_EXT}if(A===J.RG_INTEGER){if(h===J.UNSIGNED_BYTE)$0=J.RG8UI;if(h===J.UNSIGNED_SHORT)$0=J.RG16UI;if(h===J.UNSIGNED_INT)$0=J.RG32UI;if(h===J.BYTE)$0=J.RG8I;if(h===J.SHORT)$0=J.RG16I;if(h===J.INT)$0=J.RG32I}if(A===J.RGB_INTEGER){if(h===J.UNSIGNED_BYTE)$0=J.RGB8UI;if(h===J.UNSIGNED_SHORT)$0=J.RGB16UI;if(h===J.UNSIGNED_INT)$0=J.RGB32UI;if(h===J.BYTE)$0=J.RGB8I;if(h===J.SHORT)$0=J.RGB16I;if(h===J.INT)$0=J.RGB32I}if(A===J.RGBA_INTEGER){if(h===J.UNSIGNED_BYTE)$0=J.RGBA8UI;if(h===J.UNSIGNED_SHORT)$0=J.RGBA16UI;if(h===J.UNSIGNED_INT)$0=J.RGBA32UI;if(h===J.BYTE)$0=J.RGBA8I;if(h===J.SHORT)$0=J.RGBA16I;if(h===J.INT)$0=J.RGBA32I}if(A===J.RGB){if(h===J.UNSIGNED_SHORT&&w0)$0=w0.RGB16_EXT;if(h===J.SHORT&&w0)$0=w0.RGB16_SNORM_EXT;if(h===J.UNSIGNED_INT_5_9_9_9_REV)$0=J.RGB9_E5;if(h===J.UNSIGNED_INT_10F_11F_11F_REV)$0=J.R11F_G11F_B10F}if(A===J.RGBA){let Y0=B0?cK:M9.getTransfer(q0);if(h===J.FLOAT)$0=J.RGBA32F;if(h===J.HALF_FLOAT)$0=J.RGBA16F;if(h===J.UNSIGNED_BYTE)$0=Y0===p9?J.SRGB8_ALPHA8:J.RGBA8;if(h===J.UNSIGNED_SHORT&&w0)$0=w0.RGBA16_EXT;if(h===J.SHORT&&w0)$0=w0.RGBA16_SNORM_EXT;if(h===J.UNSIGNED_SHORT_4_4_4_4)$0=J.RGBA4;if(h===J.UNSIGNED_SHORT_5_5_5_1)$0=J.RGB5_A1}if($0===J.R16F||$0===J.R32F||$0===J.RG16F||$0===J.RG32F||$0===J.RGBA16F||$0===J.RGBA32F)Q.get("EXT_color_buffer_float");return $0}function B(w,A){let h;if(w){if(A===null||A===OJ||A===A6)h=J.DEPTH24_STENCIL8;else if(A===p8)h=J.DEPTH32F_STENCIL8;else if(A===MQ)h=J.DEPTH24_STENCIL8,e0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(A===null||A===OJ||A===A6)h=J.DEPTH_COMPONENT24;else if(A===p8)h=J.DEPTH_COMPONENT32F;else if(A===MQ)h=J.DEPTH_COMPONENT16;return h}function _(w,A){if(E(w)===!0||w.isFramebufferTexture&&w.minFilter!==u7&&w.minFilter!==v7)return Math.log2(Math.max(A.width,A.height))+1;else if(w.mipmaps!==void 0&&w.mipmaps.length>0)return w.mipmaps.length;else if(w.isCompressedTexture&&Array.isArray(w.image))return A.mipmaps.length;else return 1}function z(w){let A=w.target;if(A.removeEventListener("dispose",z),C(A),A.isVideoTexture)X.delete(A);if(A.isHTMLTexture)F.delete(A)}function V(w){let A=w.target;A.removeEventListener("dispose",V),k(A)}function C(w){let A=Z.get(w);if(A.__webglInit===void 0)return;let h=w.source,o=q.get(h);if(o){let q0=o[A.__cacheKey];if(q0.usedTimes--,q0.usedTimes===0)f(w);if(Object.keys(o).length===0)q.delete(h)}Z.remove(w)}function f(w){let A=Z.get(w);J.deleteTexture(A.__webglTexture);let h=w.source,o=q.get(h);delete o[A.__cacheKey],Y.memory.textures--}function k(w){let A=Z.get(w);if(w.depthTexture)w.depthTexture.dispose(),Z.remove(w.depthTexture);if(w.isWebGLCubeRenderTarget)for(let o=0;o<6;o++){if(Array.isArray(A.__webglFramebuffer[o]))for(let q0=0;q0<A.__webglFramebuffer[o].length;q0++)J.deleteFramebuffer(A.__webglFramebuffer[o][q0]);else J.deleteFramebuffer(A.__webglFramebuffer[o]);if(A.__webglDepthbuffer)J.deleteRenderbuffer(A.__webglDepthbuffer[o])}else{if(Array.isArray(A.__webglFramebuffer))for(let o=0;o<A.__webglFramebuffer.length;o++)J.deleteFramebuffer(A.__webglFramebuffer[o]);else J.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer)J.deleteRenderbuffer(A.__webglDepthbuffer);if(A.__webglMultisampledFramebuffer)J.deleteFramebuffer(A.__webglMultisampledFramebuffer);if(A.__webglColorRenderbuffer){for(let o=0;o<A.__webglColorRenderbuffer.length;o++)if(A.__webglColorRenderbuffer[o])J.deleteRenderbuffer(A.__webglColorRenderbuffer[o])}if(A.__webglDepthRenderbuffer)J.deleteRenderbuffer(A.__webglDepthRenderbuffer)}let h=w.textures;for(let o=0,q0=h.length;o<q0;o++){let B0=Z.get(h[o]);if(B0.__webglTexture)J.deleteTexture(B0.__webglTexture),Y.memory.textures--;Z.remove(h[o])}Z.remove(w)}let b=0;function e(){b=0}function v(){return b}function u(w){b=w}function Q0(){let w=b;if(w>=K.maxTextures)e0("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+K.maxTextures);return b+=1,w}function l(w){let A=[];return A.push(w.wrapS),A.push(w.wrapT),A.push(w.wrapR||0),A.push(w.magFilter),A.push(w.minFilter),A.push(w.anisotropy),A.push(w.internalFormat),A.push(w.format),A.push(w.type),A.push(w.generateMipmaps),A.push(w.premultiplyAlpha),A.push(w.flipY),A.push(w.unpackAlignment),A.push(w.colorSpace),A.join()}function D0(w,A){let h=Z.get(w);if(w.isVideoTexture)m9(w);if(w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&h.__version!==w.version){let o=w.image;if(o===null)e0("WebGLRenderer: Texture marked for update but no image data found.");else if(o.complete===!1)e0("WebGLRenderer: Texture marked for update but image is incomplete");else{m(h,w,A);return}}else if(w.isExternalTexture)h.__webglTexture=w.sourceTexture?w.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,h.__webglTexture,J.TEXTURE0+A)}function t(w,A){let h=Z.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&h.__version!==w.version){m(h,w,A);return}else if(w.isExternalTexture)h.__webglTexture=w.sourceTexture?w.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,h.__webglTexture,J.TEXTURE0+A)}function p(w,A){let h=Z.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&h.__version!==w.version){m(h,w,A);return}$.bindTexture(J.TEXTURE_3D,h.__webglTexture,J.TEXTURE0+A)}function J0(w,A){let h=Z.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&h.__version!==w.version){C0(h,w,A);return}$.bindTexture(J.TEXTURE_CUBE_MAP,h.__webglTexture,J.TEXTURE0+A)}let M0={[EJ]:J.REPEAT,[h$]:J.CLAMP_TO_EDGE,[SW]:J.MIRRORED_REPEAT},A0={[u7]:J.NEAREST,[kW]:J.NEAREST_MIPMAP_NEAREST,[RQ]:J.NEAREST_MIPMAP_LINEAR,[v7]:J.LINEAR,[x$]:J.LINEAR_MIPMAP_NEAREST,[TJ]:J.LINEAR_MIPMAP_LINEAR},_0={[pW]:J.NEVER,[cW]:J.ALWAYS,[mW]:J.LESS,[c$]:J.LEQUAL,[uW]:J.EQUAL,[n$]:J.GEQUAL,[dW]:J.GREATER,[lW]:J.NOTEQUAL};function E0(w,A){if(A.type===p8&&Q.has("OES_texture_float_linear")===!1&&(A.magFilter===v7||A.magFilter===x$||A.magFilter===RQ||A.magFilter===TJ||A.minFilter===v7||A.minFilter===x$||A.minFilter===RQ||A.minFilter===TJ))e0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(w,J.TEXTURE_WRAP_S,M0[A.wrapS]),J.texParameteri(w,J.TEXTURE_WRAP_T,M0[A.wrapT]),w===J.TEXTURE_3D||w===J.TEXTURE_2D_ARRAY)J.texParameteri(w,J.TEXTURE_WRAP_R,M0[A.wrapR]);if(J.texParameteri(w,J.TEXTURE_MAG_FILTER,A0[A.magFilter]),J.texParameteri(w,J.TEXTURE_MIN_FILTER,A0[A.minFilter]),A.compareFunction)J.texParameteri(w,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(w,J.TEXTURE_COMPARE_FUNC,_0[A.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===u7)return;if(A.minFilter!==RQ&&A.minFilter!==TJ)return;if(A.type===p8&&Q.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||Z.get(A).__currentAnisotropy){let h=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(w,h.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,K.getMaxAnisotropy())),Z.get(A).__currentAnisotropy=A.anisotropy}}}function i(w,A){let h=!1;if(w.__webglInit===void 0)w.__webglInit=!0,A.addEventListener("dispose",z);let o=A.source,q0=q.get(o);if(q0===void 0)q0={},q.set(o,q0);let B0=l(A);if(B0!==w.__cacheKey){if(q0[B0]===void 0)q0[B0]={texture:J.createTexture(),usedTimes:0},Y.memory.textures++,h=!0;q0[B0].usedTimes++;let w0=q0[w.__cacheKey];if(w0!==void 0){if(q0[w.__cacheKey].usedTimes--,w0.usedTimes===0)f(A)}w.__cacheKey=B0,w.__webglTexture=q0[B0].texture}return h}function N0(w,A,h){return Math.floor(Math.floor(w/h)/A)}function K0(w,A,h,o){let B0=w.updateRanges;if(B0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,A.width,A.height,h,o,A.data);else{B0.sort((i0,k0)=>i0.start-k0.start);let w0=0;for(let i0=1;i0<B0.length;i0++){let k0=B0[w0],I0=B0[i0],r0=k0.start+k0.count,Q9=N0(I0.start,A.width,4),k9=N0(k0.start,A.width,4);if(I0.start<=r0+1&&Q9===k9&&N0(I0.start+I0.count-1,A.width,4)===Q9)k0.count=Math.max(k0.count,I0.start+I0.count-k0.start);else++w0,B0[w0]=I0}B0.length=w0+1;let $0=$.getParameter(J.UNPACK_ROW_LENGTH),Y0=$.getParameter(J.UNPACK_SKIP_PIXELS),b0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,A.width);for(let i0=0,k0=B0.length;i0<k0;i0++){let I0=B0[i0],r0=Math.floor(I0.start/4),Q9=Math.ceil(I0.count/4),k9=r0%A.width,g=Math.floor(r0/A.width),T0=Q9,Z0=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,k9),$.pixelStorei(J.UNPACK_SKIP_ROWS,g),$.texSubImage2D(J.TEXTURE_2D,0,k9,g,T0,1,h,o,A.data)}w.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,$0),$.pixelStorei(J.UNPACK_SKIP_PIXELS,Y0),$.pixelStorei(J.UNPACK_SKIP_ROWS,b0)}}function m(w,A,h){let o=J.TEXTURE_2D;if(A.isDataArrayTexture||A.isCompressedArrayTexture)o=J.TEXTURE_2D_ARRAY;if(A.isData3DTexture)o=J.TEXTURE_3D;let q0=i(w,A),B0=A.source;$.bindTexture(o,w.__webglTexture,J.TEXTURE0+h);let w0=Z.get(B0);if(B0.version!==w0.__version||q0===!0){if($.activeTexture(J.TEXTURE0+h),(typeof ImageBitmap<"u"&&A.image instanceof ImageBitmap)===!1){let Z0=M9.getPrimaries(M9.workingColorSpace),S0=A.colorSpace===vJ?null:M9.getPrimaries(A.colorSpace),x0=A.colorSpace===vJ||Z0===S0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,A.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,x0)}$.pixelStorei(J.UNPACK_ALIGNMENT,A.unpackAlignment);let Y0=D(A.image,!1,K.maxTextureSize);Y0=O9(A,Y0);let b0=U.convert(A.format,A.colorSpace),i0=U.convert(A.type),k0=R(A.internalFormat,b0,i0,A.normalized,A.colorSpace,A.isVideoTexture);E0(o,A);let I0,r0=A.mipmaps,Q9=A.isVideoTexture!==!0,k9=w0.__version===void 0||q0===!0,g=B0.dataReady,T0=_(A,Y0);if(A.isDepthTexture){if(k0=B(A.format===kJ,A.type),k9)if(Q9)$.texStorage2D(J.TEXTURE_2D,1,k0,Y0.width,Y0.height);else $.texImage2D(J.TEXTURE_2D,0,k0,Y0.width,Y0.height,0,b0,i0,null)}else if(A.isDataTexture)if(r0.length>0){if(Q9&&k9)$.texStorage2D(J.TEXTURE_2D,T0,k0,r0[0].width,r0[0].height);for(let Z0=0,S0=r0.length;Z0<S0;Z0++)if(I0=r0[Z0],Q9){if(g)$.texSubImage2D(J.TEXTURE_2D,Z0,0,0,I0.width,I0.height,b0,i0,I0.data)}else $.texImage2D(J.TEXTURE_2D,Z0,k0,I0.width,I0.height,0,b0,i0,I0.data);A.generateMipmaps=!1}else if(Q9){if(k9)$.texStorage2D(J.TEXTURE_2D,T0,k0,Y0.width,Y0.height);if(g)K0(A,Y0,b0,i0)}else $.texImage2D(J.TEXTURE_2D,0,k0,Y0.width,Y0.height,0,b0,i0,Y0.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){if(Q9&&k9)$.texStorage3D(J.TEXTURE_2D_ARRAY,T0,k0,r0[0].width,r0[0].height,Y0.depth);for(let Z0=0,S0=r0.length;Z0<S0;Z0++)if(I0=r0[Z0],A.format!==M8)if(b0!==null)if(Q9){if(g)if(A.layerUpdates.size>0){let x0=BU(I0.width,I0.height,A.format,A.type);for(let F0 of A.layerUpdates){let v0=I0.data.subarray(F0*x0/I0.data.BYTES_PER_ELEMENT,(F0+1)*x0/I0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,Z0,0,0,F0,I0.width,I0.height,1,b0,v0)}}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,Z0,0,0,0,I0.width,I0.height,Y0.depth,b0,I0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,Z0,k0,I0.width,I0.height,Y0.depth,0,I0.data,0,0);else e0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Q9){if(g)$.texSubImage3D(J.TEXTURE_2D_ARRAY,Z0,0,0,0,I0.width,I0.height,Y0.depth,b0,i0,I0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,Z0,k0,I0.width,I0.height,Y0.depth,0,b0,i0,I0.data);if(A.layerUpdates.size>0)A.clearLayerUpdates()}else{if(Q9&&k9)$.texStorage2D(J.TEXTURE_2D,T0,k0,r0[0].width,r0[0].height);for(let Z0=0,S0=r0.length;Z0<S0;Z0++)if(I0=r0[Z0],A.format!==M8)if(b0!==null)if(Q9){if(g)$.compressedTexSubImage2D(J.TEXTURE_2D,Z0,0,0,I0.width,I0.height,b0,I0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,Z0,k0,I0.width,I0.height,0,I0.data);else e0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Q9){if(g)$.texSubImage2D(J.TEXTURE_2D,Z0,0,0,I0.width,I0.height,b0,i0,I0.data)}else $.texImage2D(J.TEXTURE_2D,Z0,k0,I0.width,I0.height,0,b0,i0,I0.data)}else if(A.isDataArrayTexture)if(Q9){if(k9)$.texStorage3D(J.TEXTURE_2D_ARRAY,T0,k0,Y0.width,Y0.height,Y0.depth);if(g)if(A.layerUpdates.size>0){let Z0=BU(Y0.width,Y0.height,A.format,A.type);for(let S0 of A.layerUpdates){let x0=Y0.data.subarray(S0*Z0/Y0.data.BYTES_PER_ELEMENT,(S0+1)*Z0/Y0.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,S0,Y0.width,Y0.height,1,b0,i0,x0)}A.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,Y0.width,Y0.height,Y0.depth,b0,i0,Y0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,k0,Y0.width,Y0.height,Y0.depth,0,b0,i0,Y0.data);else if(A.isData3DTexture)if(Q9){if(k9)$.texStorage3D(J.TEXTURE_3D,T0,k0,Y0.width,Y0.height,Y0.depth);if(g)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,Y0.width,Y0.height,Y0.depth,b0,i0,Y0.data)}else $.texImage3D(J.TEXTURE_3D,0,k0,Y0.width,Y0.height,Y0.depth,0,b0,i0,Y0.data);else if(A.isFramebufferTexture){if(k9)if(Q9)$.texStorage2D(J.TEXTURE_2D,T0,k0,Y0.width,Y0.height);else{let{width:Z0,height:S0}=Y0;for(let x0=0;x0<T0;x0++)$.texImage2D(J.TEXTURE_2D,x0,k0,Z0,S0,0,b0,i0,null),Z0>>=1,S0>>=1}}else if(A.isHTMLTexture){if("texElementImage2D"in J){let Z0=J.canvas;if(!Z0.hasAttribute("layoutsubtree"))Z0.setAttribute("layoutsubtree","true");if(Y0.parentNode!==Z0){Z0.appendChild(Y0),F.add(A),Z0.onpaint=(S0)=>{let x0=S0.changedElements;for(let F0 of F)if(x0.includes(F0.image))F0.needsUpdate=!0},Z0.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,Y0);else{let{RGBA:x0,RGBA:F0,UNSIGNED_BYTE:v0}=J;J.texElementImage2D(J.TEXTURE_2D,0,x0,F0,v0,Y0)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(r0.length>0){if(Q9&&k9){let Z0=B9(r0[0]);$.texStorage2D(J.TEXTURE_2D,T0,k0,Z0.width,Z0.height)}for(let Z0=0,S0=r0.length;Z0<S0;Z0++)if(I0=r0[Z0],Q9){if(g)$.texSubImage2D(J.TEXTURE_2D,Z0,0,0,b0,i0,I0)}else $.texImage2D(J.TEXTURE_2D,Z0,k0,b0,i0,I0);A.generateMipmaps=!1}else if(Q9){if(k9){let Z0=B9(Y0);$.texStorage2D(J.TEXTURE_2D,T0,k0,Z0.width,Z0.height)}if(g)$.texSubImage2D(J.TEXTURE_2D,0,0,0,b0,i0,Y0)}else $.texImage2D(J.TEXTURE_2D,0,k0,b0,i0,Y0);if(E(A))I(o);if(w0.__version=B0.version,A.onUpdate)A.onUpdate(A)}w.__version=A.version}function C0(w,A,h){if(A.image.length!==6)return;let o=i(w,A),q0=A.source;$.bindTexture(J.TEXTURE_CUBE_MAP,w.__webglTexture,J.TEXTURE0+h);let B0=Z.get(q0);if(q0.version!==B0.__version||o===!0){$.activeTexture(J.TEXTURE0+h);let w0=M9.getPrimaries(M9.workingColorSpace),$0=A.colorSpace===vJ?null:M9.getPrimaries(A.colorSpace),Y0=A.colorSpace===vJ||w0===$0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,A.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,A.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y0);let b0=A.isCompressedTexture||A.image[0].isCompressedTexture,i0=A.image[0]&&A.image[0].isDataTexture,k0=[];for(let F0=0;F0<6;F0++){if(!b0&&!i0)k0[F0]=D(A.image[F0],!0,K.maxCubemapSize);else k0[F0]=i0?A.image[F0].image:A.image[F0];k0[F0]=O9(A,k0[F0])}let I0=k0[0],r0=U.convert(A.format,A.colorSpace),Q9=U.convert(A.type),k9=R(A.internalFormat,r0,Q9,A.normalized,A.colorSpace),g=A.isVideoTexture!==!0,T0=B0.__version===void 0||o===!0,Z0=q0.dataReady,S0=_(A,I0);E0(J.TEXTURE_CUBE_MAP,A);let x0;if(b0){if(g&&T0)$.texStorage2D(J.TEXTURE_CUBE_MAP,S0,k9,I0.width,I0.height);for(let F0=0;F0<6;F0++){x0=k0[F0].mipmaps;for(let v0=0;v0<x0.length;v0++){let H9=x0[v0];if(A.format!==M8)if(r0!==null)if(g){if(Z0)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,v0,0,0,H9.width,H9.height,r0,H9.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,v0,k9,H9.width,H9.height,0,H9.data);else e0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(g){if(Z0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,v0,0,0,H9.width,H9.height,r0,Q9,H9.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,v0,k9,H9.width,H9.height,0,r0,Q9,H9.data)}}}else{if(x0=A.mipmaps,g&&T0){if(x0.length>0)S0++;let F0=B9(k0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,S0,k9,F0.width,F0.height)}for(let F0=0;F0<6;F0++)if(i0){if(g){if(Z0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,0,0,0,k0[F0].width,k0[F0].height,r0,Q9,k0[F0].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,0,k9,k0[F0].width,k0[F0].height,0,r0,Q9,k0[F0].data);for(let v0=0;v0<x0.length;v0++){let c9=x0[v0].image[F0].image;if(g){if(Z0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,v0+1,0,0,c9.width,c9.height,r0,Q9,c9.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,v0+1,k9,c9.width,c9.height,0,r0,Q9,c9.data)}}else{if(g){if(Z0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,0,0,0,r0,Q9,k0[F0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,0,k9,r0,Q9,k0[F0]);for(let v0=0;v0<x0.length;v0++){let H9=x0[v0];if(g){if(Z0)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,v0+1,0,0,r0,Q9,H9.image[F0])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+F0,v0+1,k9,r0,Q9,H9.image[F0])}}}if(E(A))I(J.TEXTURE_CUBE_MAP);if(B0.__version=q0.version,A.onUpdate)A.onUpdate(A)}w.__version=A.version}function s(w,A,h,o,q0,B0){let w0=U.convert(h.format,h.colorSpace),$0=U.convert(h.type),Y0=R(h.internalFormat,w0,$0,h.normalized,h.colorSpace),b0=Z.get(A),i0=Z.get(h);if(i0.__renderTarget=A,!b0.__hasExternalTextures){let k0=Math.max(1,A.width>>B0),I0=Math.max(1,A.height>>B0);if(q0===J.TEXTURE_3D||q0===J.TEXTURE_2D_ARRAY)$.texImage3D(q0,B0,Y0,k0,I0,A.depth,0,w0,$0,null);else $.texImage2D(q0,B0,Y0,k0,I0,0,w0,$0,null)}if($.bindFramebuffer(J.FRAMEBUFFER,w),y(A))W.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,q0,i0.__webglTexture,0,W9(A));else if(q0===J.TEXTURE_2D||q0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&q0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,o,q0,i0.__webglTexture,B0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function h0(w,A,h){if(J.bindRenderbuffer(J.RENDERBUFFER,w),A.depthBuffer){let o=A.depthTexture,q0=o&&o.isDepthTexture?o.type:null,B0=B(A.stencilBuffer,q0),w0=A.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(y(A))W.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,W9(A),B0,A.width,A.height);else if(h)J.renderbufferStorageMultisample(J.RENDERBUFFER,W9(A),B0,A.width,A.height);else J.renderbufferStorage(J.RENDERBUFFER,B0,A.width,A.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,w0,J.RENDERBUFFER,w)}else{let o=A.textures;for(let q0=0;q0<o.length;q0++){let B0=o[q0],w0=U.convert(B0.format,B0.colorSpace),$0=U.convert(B0.type),Y0=R(B0.internalFormat,w0,$0,B0.normalized,B0.colorSpace);if(y(A))W.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,W9(A),Y0,A.width,A.height);else if(h)J.renderbufferStorageMultisample(J.RENDERBUFFER,W9(A),Y0,A.width,A.height);else J.renderbufferStorage(J.RENDERBUFFER,Y0,A.width,A.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function r(w,A,h){let o=A.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,w),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q0=Z.get(A.depthTexture);if(q0.__renderTarget=A,!q0.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0;if(o){if(q0.__webglInit===void 0)q0.__webglInit=!0,A.depthTexture.addEventListener("dispose",z);if(q0.__webglTexture===void 0){q0.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,q0.__webglTexture),E0(J.TEXTURE_CUBE_MAP,A.depthTexture);let b0=U.convert(A.depthTexture.format),i0=U.convert(A.depthTexture.type),k0;if(A.depthTexture.format===SJ)k0=J.DEPTH_COMPONENT24;else if(A.depthTexture.format===kJ)k0=J.DEPTH24_STENCIL8;for(let I0=0;I0<6;I0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,0,k0,A.width,A.height,0,b0,i0,null)}}else D0(A.depthTexture,0);let B0=q0.__webglTexture,w0=W9(A),$0=o?J.TEXTURE_CUBE_MAP_POSITIVE_X+h:J.TEXTURE_2D,Y0=A.depthTexture.format===kJ?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(A.depthTexture.format===SJ)if(y(A))W.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,Y0,$0,B0,0,w0);else J.framebufferTexture2D(J.FRAMEBUFFER,Y0,$0,B0,0);else if(A.depthTexture.format===kJ)if(y(A))W.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,Y0,$0,B0,0,w0);else J.framebufferTexture2D(J.FRAMEBUFFER,Y0,$0,B0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function X0(w){let A=Z.get(w),h=w.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==w.depthTexture){let o=w.depthTexture;if(A.__depthDisposeCallback)A.__depthDisposeCallback();if(o){let q0=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,o.removeEventListener("dispose",q0)};o.addEventListener("dispose",q0),A.__depthDisposeCallback=q0}A.__boundDepthTexture=o}if(w.depthTexture&&!A.__autoAllocateDepthBuffer)if(h)for(let o=0;o<6;o++)r(A.__webglFramebuffer[o],w,o);else{let o=w.texture.mipmaps;if(o&&o.length>0)r(A.__webglFramebuffer[0],w,0);else r(A.__webglFramebuffer,w,0)}else if(h){A.__webglDepthbuffer=[];for(let o=0;o<6;o++)if($.bindFramebuffer(J.FRAMEBUFFER,A.__webglFramebuffer[o]),A.__webglDepthbuffer[o]===void 0)A.__webglDepthbuffer[o]=J.createRenderbuffer(),h0(A.__webglDepthbuffer[o],w,!1);else{let q0=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,B0=A.__webglDepthbuffer[o];J.bindRenderbuffer(J.RENDERBUFFER,B0),J.framebufferRenderbuffer(J.FRAMEBUFFER,q0,J.RENDERBUFFER,B0)}}else{let o=w.texture.mipmaps;if(o&&o.length>0)$.bindFramebuffer(J.FRAMEBUFFER,A.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,A.__webglFramebuffer);if(A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=J.createRenderbuffer(),h0(A.__webglDepthbuffer,w,!1);else{let q0=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,B0=A.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,B0),J.framebufferRenderbuffer(J.FRAMEBUFFER,q0,J.RENDERBUFFER,B0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function O0(w,A,h){let o=Z.get(w);if(A!==void 0)s(o.__webglFramebuffer,w,w.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(h!==void 0)X0(w)}function V0(w){let A=w.texture,h=Z.get(w),o=Z.get(A);w.addEventListener("dispose",V);let q0=w.textures,B0=w.isWebGLCubeRenderTarget===!0,w0=q0.length>1;if(!w0){if(o.__webglTexture===void 0)o.__webglTexture=J.createTexture();o.__version=A.version,Y.memory.textures++}if(B0){h.__webglFramebuffer=[];for(let $0=0;$0<6;$0++)if(A.mipmaps&&A.mipmaps.length>0){h.__webglFramebuffer[$0]=[];for(let Y0=0;Y0<A.mipmaps.length;Y0++)h.__webglFramebuffer[$0][Y0]=J.createFramebuffer()}else h.__webglFramebuffer[$0]=J.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){h.__webglFramebuffer=[];for(let $0=0;$0<A.mipmaps.length;$0++)h.__webglFramebuffer[$0]=J.createFramebuffer()}else h.__webglFramebuffer=J.createFramebuffer();if(w0)for(let $0=0,Y0=q0.length;$0<Y0;$0++){let b0=Z.get(q0[$0]);if(b0.__webglTexture===void 0)b0.__webglTexture=J.createTexture(),Y.memory.textures++}if(w.samples>0&&y(w)===!1){h.__webglMultisampledFramebuffer=J.createFramebuffer(),h.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,h.__webglMultisampledFramebuffer);for(let $0=0;$0<q0.length;$0++){let Y0=q0[$0];h.__webglColorRenderbuffer[$0]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,h.__webglColorRenderbuffer[$0]);let b0=U.convert(Y0.format,Y0.colorSpace),i0=U.convert(Y0.type),k0=R(Y0.internalFormat,b0,i0,Y0.normalized,Y0.colorSpace,w.isXRRenderTarget===!0),I0=W9(w);J.renderbufferStorageMultisample(J.RENDERBUFFER,I0,k0,w.width,w.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+$0,J.RENDERBUFFER,h.__webglColorRenderbuffer[$0])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),w.depthBuffer)h.__webglDepthRenderbuffer=J.createRenderbuffer(),h0(h.__webglDepthRenderbuffer,w,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(B0){$.bindTexture(J.TEXTURE_CUBE_MAP,o.__webglTexture),E0(J.TEXTURE_CUBE_MAP,A);for(let $0=0;$0<6;$0++)if(A.mipmaps&&A.mipmaps.length>0)for(let Y0=0;Y0<A.mipmaps.length;Y0++)s(h.__webglFramebuffer[$0][Y0],w,A,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+$0,Y0);else s(h.__webglFramebuffer[$0],w,A,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+$0,0);if(E(A))I(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(w0){for(let $0=0,Y0=q0.length;$0<Y0;$0++){let b0=q0[$0],i0=Z.get(b0),k0=J.TEXTURE_2D;if(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)k0=w.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(k0,i0.__webglTexture),E0(k0,b0),s(h.__webglFramebuffer,w,b0,J.COLOR_ATTACHMENT0+$0,k0,0),E(b0))I(k0)}$.unbindTexture()}else{let $0=J.TEXTURE_2D;if(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)$0=w.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture($0,o.__webglTexture),E0($0,A),A.mipmaps&&A.mipmaps.length>0)for(let Y0=0;Y0<A.mipmaps.length;Y0++)s(h.__webglFramebuffer[Y0],w,A,J.COLOR_ATTACHMENT0,$0,Y0);else s(h.__webglFramebuffer,w,A,J.COLOR_ATTACHMENT0,$0,0);if(E(A))I($0);$.unbindTexture()}if(w.depthBuffer)X0(w)}function L0(w){let A=w.textures;for(let h=0,o=A.length;h<o;h++){let q0=A[h];if(E(q0)){let B0=L(w),w0=Z.get(q0).__webglTexture;$.bindTexture(B0,w0),I(B0),$.unbindTexture()}}}let s0=[],a0=[];function Y9(w){if(w.samples>0){if(y(w)===!1){let{textures:A,width:h,height:o}=w,q0=J.COLOR_BUFFER_BIT,B0=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,w0=Z.get(w),$0=A.length>1;if($0)for(let b0=0;b0<A.length;b0++)$.bindFramebuffer(J.FRAMEBUFFER,w0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+b0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,w0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+b0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,w0.__webglMultisampledFramebuffer);let Y0=w.texture.mipmaps;if(Y0&&Y0.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,w0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,w0.__webglFramebuffer);for(let b0=0;b0<A.length;b0++){if(w.resolveDepthBuffer){if(w.depthBuffer)q0|=J.DEPTH_BUFFER_BIT;if(w.stencilBuffer&&w.resolveStencilBuffer)q0|=J.STENCIL_BUFFER_BIT}if($0){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,w0.__webglColorRenderbuffer[b0]);let i0=Z.get(A[b0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,i0,0)}if(J.blitFramebuffer(0,0,h,o,0,0,h,o,q0,J.NEAREST),H===!0){if(s0.length=0,a0.length=0,s0.push(J.COLOR_ATTACHMENT0+b0),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1)s0.push(B0),a0.push(B0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,a0);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,s0)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),$0)for(let b0=0;b0<A.length;b0++){$.bindFramebuffer(J.FRAMEBUFFER,w0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+b0,J.RENDERBUFFER,w0.__webglColorRenderbuffer[b0]);let i0=Z.get(A[b0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,w0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+b0,J.TEXTURE_2D,i0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,w0.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&H){let A=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[A])}}}function W9(w){return Math.min(K.maxSamples,w.samples)}function y(w){let A=Z.get(w);return w.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function m9(w){let A=Y.render.frame;if(X.get(w)!==A)X.set(w,A),w.update()}function O9(w,A){let{colorSpace:h,format:o,type:q0}=w;if(w.isCompressedTexture===!0||w.isVideoTexture===!0)return A;if(h!==lK&&h!==vJ)if(M9.getTransfer(h)===p9){if(o!==M8||q0!==Q8)e0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else Z9("WebGLTextures: Unsupported texture color space:",h);return A}function B9(w){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement)G.width=w.naturalWidth||w.width,G.height=w.naturalHeight||w.height;else if(typeof VideoFrame<"u"&&w instanceof VideoFrame)G.width=w.displayWidth,G.height=w.displayHeight;else G.width=w.width,G.height=w.height;return G}this.allocateTextureUnit=Q0,this.resetTextureUnits=e,this.getTextureUnits=v,this.setTextureUnits=u,this.setTexture2D=D0,this.setTexture2DArray=t,this.setTexture3D=p,this.setTextureCube=J0,this.rebindTextures=O0,this.setupRenderTarget=V0,this.updateRenderTargetMipmap=L0,this.updateMultisampleRenderTarget=Y9,this.setupDepthRenderbuffer=X0,this.setupFrameBufferTexture=s,this.useMultisampledRTT=y,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function AF(J,Q){function $(Z,K=vJ){let U,Y=M9.getTransfer(K);if(Z===Q8)return J.UNSIGNED_BYTE;if(Z===WK)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===HK)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===yW)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===fW)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===jW)return J.BYTE;if(Z===vW)return J.SHORT;if(Z===MQ)return J.UNSIGNED_SHORT;if(Z===YK)return J.INT;if(Z===OJ)return J.UNSIGNED_INT;if(Z===p8)return J.FLOAT;if(Z===F7)return J.HALF_FLOAT;if(Z===bW)return J.ALPHA;if(Z===hW)return J.RGB;if(Z===M8)return J.RGBA;if(Z===SJ)return J.DEPTH_COMPONENT;if(Z===kJ)return J.DEPTH_STENCIL;if(Z===xW)return J.RED;if(Z===GK)return J.RED_INTEGER;if(Z===jJ)return J.RG;if(Z===NK)return J.RG_INTEGER;if(Z===XK)return J.RGBA_INTEGER;if(Z===g$||Z===p$||Z===m$||Z===u$)if(Y===p9)if(U=Q.get("WEBGL_compressed_texture_s3tc_srgb"),U!==null){if(Z===g$)return U.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===p$)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===m$)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===u$)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(U=Q.get("WEBGL_compressed_texture_s3tc"),U!==null){if(Z===g$)return U.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===p$)return U.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===m$)return U.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===u$)return U.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===DK||Z===qK||Z===FK||Z===EK)if(U=Q.get("WEBGL_compressed_texture_pvrtc"),U!==null){if(Z===DK)return U.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===qK)return U.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===FK)return U.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===EK)return U.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===OK||Z===RK||Z===MK||Z===VK||Z===_K||Z===d$||Z===BK)if(U=Q.get("WEBGL_compressed_texture_etc"),U!==null){if(Z===OK||Z===RK)return Y===p9?U.COMPRESSED_SRGB8_ETC2:U.COMPRESSED_RGB8_ETC2;if(Z===MK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:U.COMPRESSED_RGBA8_ETC2_EAC;if(Z===VK)return U.COMPRESSED_R11_EAC;if(Z===_K)return U.COMPRESSED_SIGNED_R11_EAC;if(Z===d$)return U.COMPRESSED_RG11_EAC;if(Z===BK)return U.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===IK||Z===CK||Z===zK||Z===AK||Z===LK||Z===PK||Z===wK||Z===TK||Z===SK||Z===kK||Z===jK||Z===vK||Z===yK||Z===fK)if(U=Q.get("WEBGL_compressed_texture_astc"),U!==null){if(Z===IK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:U.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===CK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:U.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===zK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:U.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===AK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:U.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===LK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:U.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===PK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:U.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===wK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:U.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===TK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:U.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===SK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:U.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===kK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:U.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===jK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:U.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===vK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:U.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===yK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:U.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===fK)return Y===p9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:U.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===bK||Z===hK||Z===xK)if(U=Q.get("EXT_texture_compression_bptc"),U!==null){if(Z===bK)return Y===p9?U.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:U.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===hK)return U.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===xK)return U.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===gK||Z===pK||Z===l$||Z===mK)if(U=Q.get("EXT_texture_compression_rgtc"),U!==null){if(Z===gK)return U.COMPRESSED_RED_RGTC1_EXT;if(Z===pK)return U.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===l$)return U.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===mK)return U.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===A6)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var LF=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,PF=`
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

}`;class mH{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new t$(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new v9({vertexShader:LF,fragmentShader:PF,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new d(new E9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uH extends m8{constructor(J,Q){super();let $=this,Z=null,K=1,U=null,Y="local-floor",W=1,H=null,G=null,X=null,F=null,N=null,q=null,O=typeof XRWebGLBinding<"u",M=new mH,D={},E=Q.getContextAttributes(),I=null,L=null,R=[],B=[],_=new U0,z=null,V=null,C=new e9;C.viewport=new r9;let f=new e9;f.viewport=new r9;let k=[C,f],b=new RU,e=null,v=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(i){let N0=R[i];if(N0===void 0)N0=new _Q,R[i]=N0;return N0.getTargetRaySpace()},this.getControllerGrip=function(i){let N0=R[i];if(N0===void 0)N0=new _Q,R[i]=N0;return N0.getGripSpace()},this.getHand=function(i){let N0=R[i];if(N0===void 0)N0=new _Q,R[i]=N0;return N0.getHandSpace()};function u(i){let N0=B.indexOf(i.inputSource);if(N0===-1)return;let K0=R[N0];if(K0!==void 0)K0.update(i.inputSource,i.frame,H||U),K0.dispatchEvent({type:i.type,data:i.inputSource})}function Q0(){Z.removeEventListener("select",u),Z.removeEventListener("selectstart",u),Z.removeEventListener("selectend",u),Z.removeEventListener("squeeze",u),Z.removeEventListener("squeezestart",u),Z.removeEventListener("squeezeend",u),Z.removeEventListener("end",Q0),Z.removeEventListener("inputsourceschange",l);for(let i=0;i<R.length;i++){let N0=B[i];if(N0===null)continue;B[i]=null,R[i].disconnect(N0)}e=null,v=null,M.reset();for(let i in D)delete D[i];if(J.setRenderTarget(I),N=null,F=null,X=null,Z=null,L=null,E0.stop(),$.isPresenting=!1,J.setPixelRatio(z),J.setSize(_.width,_.height,!1),V!==null){let i=V.camera;i.fov=V.fov,i.zoom=V.zoom,i.updateProjectionMatrix(),V=null}$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(i){if(K=i,$.isPresenting===!0)e0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(i){if(Y=i,$.isPresenting===!0)e0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return H||U},this.setReferenceSpace=function(i){H=i},this.getBaseLayer=function(){return F!==null?F:N},this.getBinding=function(){if(X===null&&O)X=new XRWebGLBinding(Z,Q);return X},this.getFrame=function(){return q},this.getSession=function(){return Z},this.setSession=async function(i){if(Z=i,Z!==null){if(I=J.getRenderTarget(),Z.addEventListener("select",u),Z.addEventListener("selectstart",u),Z.addEventListener("selectend",u),Z.addEventListener("squeeze",u),Z.addEventListener("squeezestart",u),Z.addEventListener("squeezeend",u),Z.addEventListener("end",Q0),Z.addEventListener("inputsourceschange",l),E.xrCompatible!==!0)await Q.makeXRCompatible();if(z=J.getPixelRatio(),J.getSize(_),!(O&&("createProjectionLayer"in XRWebGLBinding.prototype))){let K0={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:K};N=new XRWebGLLayer(Z,Q,K0),Z.updateRenderState({baseLayer:N}),J.setPixelRatio(1),J.setSize(N.framebufferWidth,N.framebufferHeight,!1),L=new W7(N.framebufferWidth,N.framebufferHeight,{format:M8,type:Q8,colorSpace:J.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:N.ignoreDepthValues===!1,resolveStencilBuffer:N.ignoreDepthValues===!1,storeMultisampledDepthBuffer:N.ignoreDepthValues===!1,storeMultisampledStencilBuffer:N.ignoreDepthValues===!1})}else{let K0=null,m=null,C0=null;if(E.depth)C0=E.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,K0=E.stencil?kJ:SJ,m=E.stencil?A6:OJ;let s={colorFormat:Q.RGBA8,depthFormat:C0,scaleFactor:K};X=this.getBinding(),F=X.createProjectionLayer(s),Z.updateRenderState({layers:[F]}),J.setPixelRatio(1),J.setSize(F.textureWidth,F.textureHeight,!1),L=new W7(F.textureWidth,F.textureHeight,{format:M8,type:Q8,depthTexture:new bJ(F.textureWidth,F.textureHeight,m,void 0,void 0,void 0,void 0,void 0,void 0,K0),stencilBuffer:E.stencil,colorSpace:J.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:F.ignoreDepthValues===!1,resolveStencilBuffer:F.ignoreDepthValues===!1,storeMultisampledDepthBuffer:F.ignoreDepthValues===!1,storeMultisampledStencilBuffer:F.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(W),H=null,U=await Z.requestReferenceSpace(Y),E0.setContext(Z),E0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function l(i){for(let N0=0;N0<i.removed.length;N0++){let K0=i.removed[N0],m=B.indexOf(K0);if(m>=0)B[m]=null,R[m].disconnect(K0)}for(let N0=0;N0<i.added.length;N0++){let K0=i.added[N0],m=B.indexOf(K0);if(m===-1){for(let s=0;s<R.length;s++)if(s>=B.length){B.push(K0),m=s;break}else if(B[s]===null){B[s]=K0,m=s;break}if(m===-1)break}let C0=R[m];if(C0)C0.connect(K0)}}let D0=new S,t=new S;function p(i,N0,K0){D0.setFromMatrixPosition(N0.matrixWorld),t.setFromMatrixPosition(K0.matrixWorld);let m=D0.distanceTo(t),C0=N0.projectionMatrix.elements,s=K0.projectionMatrix.elements,h0=C0[14]/(C0[10]-1),r=C0[14]/(C0[10]+1),X0=(C0[9]+1)/C0[5],O0=(C0[9]-1)/C0[5],V0=(C0[8]-1)/C0[0],L0=(s[8]+1)/s[0],s0=h0*V0,a0=h0*L0,Y9=m/(-V0+L0),W9=Y9*-V0;if(N0.matrixWorld.decompose(i.position,i.quaternion,i.scale),i.translateX(W9),i.translateZ(Y9),i.matrixWorld.compose(i.position,i.quaternion,i.scale),i.matrixWorldInverse.copy(i.matrixWorld).invert(),C0[10]===-1)i.projectionMatrix.copy(N0.projectionMatrix),i.projectionMatrixInverse.copy(N0.projectionMatrixInverse);else{let y=h0+Y9,m9=r+Y9,O9=s0-W9,B9=a0+(m-W9),w=X0*r/m9*y,A=O0*r/m9*y;i.projectionMatrix.makePerspective(O9,B9,w,A,y,m9),i.projectionMatrixInverse.copy(i.projectionMatrix).invert()}}function J0(i,N0){if(N0===null)i.matrixWorld.copy(i.matrix);else i.matrixWorld.multiplyMatrices(N0.matrixWorld,i.matrix);i.matrixWorldInverse.copy(i.matrixWorld).invert()}this.updateCamera=function(i){if(Z===null)return;let{near:N0,far:K0}=i;if(M.texture!==null){if(M.depthNear>0)N0=M.depthNear;if(M.depthFar>0)K0=M.depthFar}if(b.near=f.near=C.near=N0,b.far=f.far=C.far=K0,e!==b.near||v!==b.far)Z.updateRenderState({depthNear:b.near,depthFar:b.far}),e=b.near,v=b.far;b.layers.mask=i.layers.mask|6,C.layers.mask=b.layers.mask&-5,f.layers.mask=b.layers.mask&-3;let m=i.parent,C0=b.cameras;J0(b,m);for(let s=0;s<C0.length;s++)J0(C0[s],m);if(C0.length===2)p(b,C,f);else b.projectionMatrix.copy(C.projectionMatrix);if(V===null&&i.isPerspectiveCamera)V={camera:i,fov:i.fov,zoom:i.zoom};M0(i,b,m)};function M0(i,N0,K0){if(K0===null)i.matrix.copy(N0.matrixWorld);else i.matrix.copy(K0.matrixWorld),i.matrix.invert(),i.matrix.multiply(N0.matrixWorld);if(i.matrix.decompose(i.position,i.quaternion,i.scale),i.updateMatrixWorld(!0),i.projectionMatrix.copy(N0.projectionMatrix),i.projectionMatrixInverse.copy(N0.projectionMatrixInverse),i.isPerspectiveCamera)i.fov=ZQ*2*Math.atan(1/i.projectionMatrix.elements[5]),i.zoom=1}this.getCamera=function(){return b},this.getFoveation=function(){if(F===null&&N===null)return;return W},this.setFoveation=function(i){if(W=i,F!==null)F.fixedFoveation=i;if(N!==null&&N.fixedFoveation!==void 0)N.fixedFoveation=i},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(b)},this.getCameraTexture=function(i){return D[i]};let A0=null;function _0(i,N0){if(G=N0.getViewerPose(H||U),q=N0,G!==null){let K0=G.views;if(N!==null)J.setRenderTargetFramebuffer(L,N.framebuffer),J.setRenderTarget(L);let m=!1;if(K0.length!==b.cameras.length)b.cameras.length=0,m=!0;for(let r=0;r<K0.length;r++){let X0=K0[r],O0=null;if(N!==null)O0=N.getViewport(X0);else{let L0=X.getViewSubImage(F,X0);if(O0=L0.viewport,r===0)J.setRenderTargetTextures(L,L0.colorTexture,L0.depthStencilTexture),J.setRenderTarget(L)}let V0=k[r];if(V0===void 0)V0=new e9,V0.layers.enable(r),V0.viewport=new r9,k[r]=V0;if(V0.matrix.fromArray(X0.transform.matrix),V0.matrix.decompose(V0.position,V0.quaternion,V0.scale),V0.projectionMatrix.fromArray(X0.projectionMatrix),V0.projectionMatrixInverse.copy(V0.projectionMatrix).invert(),V0.viewport.set(O0.x,O0.y,O0.width,O0.height),r===0)b.matrix.copy(V0.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale);if(m===!0)b.cameras.push(V0)}let C0=Z.enabledFeatures;if(C0&&C0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&O){X=$.getBinding();let r=X.getDepthInformation(K0[0]);if(r&&r.isValid&&r.texture)M.init(r,Z.renderState)}if(C0&&C0.includes("camera-access")&&O){J.state.unbindTexture(),X=$.getBinding();for(let r=0;r<K0.length;r++){let X0=K0[r].camera;if(X0){let O0=D[X0];if(!O0)O0=new t$,D[X0]=O0;let V0=X.getCameraImage(X0);O0.sourceTexture=V0}}}}for(let K0=0;K0<R.length;K0++){let m=B[K0],C0=R[K0];if(m!==null&&C0!==void 0)C0.update(m,N0,H||U)}if(A0)A0(i,N0);if(N0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:N0});q=null}let E0=new SH;E0.setAnimationLoop(_0),this.setAnimationLoop=function(i){A0=i},this.dispose=function(){}}}var wF=new j9,dH=new U9;dH.set(-1,0,0,0,1,0,0,0,1);function TF(J,Q){function $(D,E){if(D.matrixAutoUpdate===!0)D.updateMatrix();E.value.copy(D.matrix)}function Z(D,E){if(E.color.getRGB(D.fogColor.value,KU(J)),E.isFog)D.fogNear.value=E.near,D.fogFar.value=E.far;else if(E.isFogExp2)D.fogDensity.value=E.density}function K(D,E,I,L,R){if(E.isNodeMaterial)E.uniformsNeedUpdate=!1;else if(E.isMeshBasicMaterial)U(D,E);else if(E.isMeshLambertMaterial){if(U(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshToonMaterial)U(D,E),F(D,E);else if(E.isMeshPhongMaterial){if(U(D,E),X(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshStandardMaterial){if(U(D,E),N(D,E),E.isMeshPhysicalMaterial)q(D,E,R)}else if(E.isMeshMatcapMaterial)U(D,E),O(D,E);else if(E.isMeshDepthMaterial)U(D,E);else if(E.isMeshDistanceMaterial)U(D,E),M(D,E);else if(E.isMeshNormalMaterial)U(D,E);else if(E.isLineBasicMaterial){if(Y(D,E),E.isLineDashedMaterial)W(D,E)}else if(E.isPointsMaterial)H(D,E,I,L);else if(E.isSpriteMaterial)G(D,E);else if(E.isShadowMaterial)D.color.value.copy(E.color),D.opacity.value=E.opacity;else if(E.isShaderMaterial)E.uniformsNeedUpdate=!1}function U(D,E){if(D.opacity.value=E.opacity,E.color)D.diffuse.value.copy(E.color);if(E.emissive)D.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity);if(E.map)D.map.value=E.map,$(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,$(E.alphaMap,D.alphaMapTransform);if(E.bumpMap){if(D.bumpMap.value=E.bumpMap,$(E.bumpMap,D.bumpMapTransform),D.bumpScale.value=E.bumpScale,E.side===N7)D.bumpScale.value*=-1}if(E.normalMap){if(D.normalMap.value=E.normalMap,$(E.normalMap,D.normalMapTransform),D.normalScale.value.copy(E.normalScale),E.side===N7)D.normalScale.value.negate()}if(E.displacementMap)D.displacementMap.value=E.displacementMap,$(E.displacementMap,D.displacementMapTransform),D.displacementScale.value=E.displacementScale,D.displacementBias.value=E.displacementBias;if(E.emissiveMap)D.emissiveMap.value=E.emissiveMap,$(E.emissiveMap,D.emissiveMapTransform);if(E.specularMap)D.specularMap.value=E.specularMap,$(E.specularMap,D.specularMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest;let I=Q.get(E),L=I.envMap,R=I.envMapRotation;if(L){if(D.envMap.value=L,D.envMapRotation.value.setFromMatrix4(wF.makeRotationFromEuler(R)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1)D.envMapRotation.value.premultiply(dH);D.reflectivity.value=E.reflectivity,D.ior.value=E.ior,D.refractionRatio.value=E.refractionRatio}if(E.lightMap)D.lightMap.value=E.lightMap,D.lightMapIntensity.value=E.lightMapIntensity,$(E.lightMap,D.lightMapTransform);if(E.aoMap)D.aoMap.value=E.aoMap,D.aoMapIntensity.value=E.aoMapIntensity,$(E.aoMap,D.aoMapTransform)}function Y(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,E.map)D.map.value=E.map,$(E.map,D.mapTransform)}function W(D,E){D.dashSize.value=E.dashSize,D.totalSize.value=E.dashSize+E.gapSize,D.scale.value=E.scale}function H(D,E,I,L){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.size.value=E.size*I,D.scale.value=L*0.5,E.map)D.map.value=E.map,$(E.map,D.uvTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,$(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function G(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.rotation.value=E.rotation,E.map)D.map.value=E.map,$(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,$(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function X(D,E){D.specular.value.copy(E.specular),D.shininess.value=Math.max(E.shininess,0.0001)}function F(D,E){if(E.gradientMap)D.gradientMap.value=E.gradientMap}function N(D,E){if(D.metalness.value=E.metalness,E.metalnessMap)D.metalnessMap.value=E.metalnessMap,$(E.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=E.roughness,E.roughnessMap)D.roughnessMap.value=E.roughnessMap,$(E.roughnessMap,D.roughnessMapTransform);if(E.envMap)D.envMapIntensity.value=E.envMapIntensity}function q(D,E,I){if(D.ior.value=E.ior,E.sheen>0){if(D.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),D.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap)D.sheenColorMap.value=E.sheenColorMap,$(E.sheenColorMap,D.sheenColorMapTransform);if(E.sheenRoughnessMap)D.sheenRoughnessMap.value=E.sheenRoughnessMap,$(E.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(E.clearcoat>0){if(D.clearcoat.value=E.clearcoat,D.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap)D.clearcoatMap.value=E.clearcoatMap,$(E.clearcoatMap,D.clearcoatMapTransform);if(E.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,$(E.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(E.clearcoatNormalMap){if(D.clearcoatNormalMap.value=E.clearcoatNormalMap,$(E.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===N7)D.clearcoatNormalScale.value.negate()}}if(E.dispersion>0)D.dispersion.value=E.dispersion;if(E.retroreflectivity>0)D.retroreflectivity.value=E.retroreflectivity;if(E.iridescence>0){if(D.iridescence.value=E.iridescence,D.iridescenceIOR.value=E.iridescenceIOR,D.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap)D.iridescenceMap.value=E.iridescenceMap,$(E.iridescenceMap,D.iridescenceMapTransform);if(E.iridescenceThicknessMap)D.iridescenceThicknessMap.value=E.iridescenceThicknessMap,$(E.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(E.transmission>0){if(D.transmission.value=E.transmission,D.transmissionSamplerMap.value=I.texture,D.transmissionSamplerSize.value.set(I.width,I.height),E.transmissionMap)D.transmissionMap.value=E.transmissionMap,$(E.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=E.thickness,E.thicknessMap)D.thicknessMap.value=E.thicknessMap,$(E.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=E.attenuationDistance,D.attenuationColor.value.copy(E.attenuationColor)}if(E.anisotropy>0){if(D.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap)D.anisotropyMap.value=E.anisotropyMap,$(E.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=E.specularIntensity,D.specularColor.value.copy(E.specularColor),E.specularColorMap)D.specularColorMap.value=E.specularColorMap,$(E.specularColorMap,D.specularColorMapTransform);if(E.specularIntensityMap)D.specularIntensityMap.value=E.specularIntensityMap,$(E.specularIntensityMap,D.specularIntensityMapTransform)}function O(D,E){if(E.matcap)D.matcap.value=E.matcap}function M(D,E){let I=Q.get(E).light;D.referencePosition.value.setFromMatrixPosition(I.matrixWorld),D.nearDistance.value=I.shadow.camera.near,D.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:K}}function SF(J,Q,$,Z){let K={},U={},Y=[],W=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function H(R,B){let _=B.program;Z.uniformBlockBinding(R,_)}function G(R,B){let _=K[R.id];if(_===void 0)D(R),_=X(R),K[R.id]=_,R.addEventListener("dispose",I);let z=B.program;Z.updateUBOMapping(R,z);let V=Q.render.frame;if(U[R.id]!==V)N(R),U[R.id]=V}function X(R){let B=F();R.__bindingPointIndex=B;let _=J.createBuffer(),z=R.__size,V=R.usage;return J.bindBuffer(J.UNIFORM_BUFFER,_),J.bufferData(J.UNIFORM_BUFFER,z,V),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,B,_),_}function F(){for(let R=0;R<W;R++)if(Y.indexOf(R)===-1)return Y.push(R),R;return Z9("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function N(R){let B=K[R.id],_=R.uniforms,z=R.__cache;J.bindBuffer(J.UNIFORM_BUFFER,B);for(let V=0,C=_.length;V<C;V++){let f=_[V];if(Array.isArray(f))for(let k=0,b=f.length;k<b;k++)q(f[k],V,k,z);else q(f,V,0,z)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function q(R,B,_,z){if(M(R,B,_,z)===!0){let{__offset:V,value:C}=R;if(Array.isArray(C)){let f=0;for(let k=0;k<C.length;k++){let b=C[k],e=E(b);if(O(b,R.__data,f),typeof b!=="number"&&typeof b!=="boolean"&&!b.isMatrix3&&!ArrayBuffer.isView(b))f+=e.storage/Float32Array.BYTES_PER_ELEMENT}}else O(C,R.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,V,R.__data)}}function O(R,B,_){if(typeof R==="number"||typeof R==="boolean")B[0]=R;else if(R.isMatrix3)B[0]=R.elements[0],B[1]=R.elements[1],B[2]=R.elements[2],B[3]=0,B[4]=R.elements[3],B[5]=R.elements[4],B[6]=R.elements[5],B[7]=0,B[8]=R.elements[6],B[9]=R.elements[7],B[10]=R.elements[8],B[11]=0;else if(ArrayBuffer.isView(R))B.set(new R.constructor(R.buffer,R.byteOffset,B.length));else R.toArray(B,_)}function M(R,B,_,z){let V=R.value,C=B+"_"+_;if(z[C]===void 0){if(typeof V==="number"||typeof V==="boolean")z[C]=V;else if(ArrayBuffer.isView(V))z[C]=V.slice();else z[C]=V.clone();return!0}else{let f=z[C];if(typeof V==="number"||typeof V==="boolean"){if(f!==V)return z[C]=V,!0}else if(ArrayBuffer.isView(V))return!0;else if(f.equals(V)===!1)return f.copy(V),!0}return!1}function D(R){let B=R.uniforms,_=0,z=16;for(let C=0,f=B.length;C<f;C++){let k=Array.isArray(B[C])?B[C]:[B[C]];for(let b=0,e=k.length;b<e;b++){let v=k[b],u=Array.isArray(v.value)?v.value:[v.value];for(let Q0=0,l=u.length;Q0<l;Q0++){let D0=u[Q0],t=E(D0),p=_%z,J0=p%t.boundary,M0=p+J0;if(_+=J0,M0!==0&&z-M0<t.storage)_+=z-M0;v.__data=new Float32Array(t.storage/Float32Array.BYTES_PER_ELEMENT),v.__offset=_,_+=t.storage}}}let V=_%z;if(V>0)_+=z-V;return R.__size=_,R.__cache={},this}function E(R){let B={boundary:0,storage:0};if(typeof R==="number"||typeof R==="boolean")B.boundary=4,B.storage=4;else if(R.isVector2)B.boundary=8,B.storage=8;else if(R.isVector3||R.isColor)B.boundary=16,B.storage=12;else if(R.isVector4)B.boundary=16,B.storage=16;else if(R.isMatrix3)B.boundary=48,B.storage=48;else if(R.isMatrix4)B.boundary=64,B.storage=64;else if(R.isTexture)e0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(R))B.boundary=16,B.storage=R.byteLength;else e0("WebGLRenderer: Unsupported uniform value type.",R);return B}function I(R){let B=R.target;B.removeEventListener("dispose",I);let _=Y.indexOf(B.__bindingPointIndex);Y.splice(_,1),J.deleteBuffer(K[B.id]),delete K[B.id],delete U[B.id]}function L(){for(let R in K)J.deleteBuffer(K[R]);Y=[],K={},U={}}return{bind:H,update:G,dispose:L}}var kF=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),C8=null;function jF(){if(C8===null)C8=new P6(kF,16,16,jJ,F7),C8.name="DFG_LUT",C8.minFilter=v7,C8.magFilter=v7,C8.wrapS=h$,C8.wrapT=h$,C8.generateMipmaps=!1,C8.needsUpdate=!0;return C8}class n8{constructor(J={}){let{canvas:Q=nW(),context:$=null,depth:Z=!0,stencil:K=!1,alpha:U=!1,antialias:Y=!1,premultipliedAlpha:W=!0,preserveDrawingBuffer:H=!1,powerPreference:G="default",failIfMajorPerformanceCaveat:X=!1,reversedDepthBuffer:F=!1,outputBufferType:N=Q8}=J;this.isWebGLRenderer=!0;let q;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");q=$.getContextAttributes().alpha}else q=U;let O=N,M=new Set([XK,NK,GK]),D=new Set([Q8,OJ,MQ,A6,WK,HK]),E=new Uint32Array(4),I=new Int32Array(4),L=new S,R=null,B=null,_=[],z=[],V=null;this.domElement=Q,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=J8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,f=!1,k=null,b=null,e=null,v=null;this._outputColorSpace=A7;let u=0,Q0=0,l=null,D0=-1,t=null,p=new r9,J0=new r9,M0=null,A0=new W0(0),_0=0,E0=Q.width,i=Q.height,N0=1,K0=null,m=null,C0=new r9(0,0,E0,i),s=new r9(0,0,E0,i),h0=!1,r=new CQ,X0=!1,O0=!1,V0=new j9,L0=new S,s0=new r9,a0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Y9=!1;function W9(){return l===null?N0:1}let y=$;function m9(P,x){return Q.getContext(P,x)}let O9,B9,w,A,h,o,q0,B0,w0,$0,Y0,b0,i0,k0,I0,r0,Q9,k9,g,T0,Z0,S0,x0;try{let P={alpha:!0,depth:Z,stencil:K,antialias:Y,premultipliedAlpha:W,preserveDrawingBuffer:H,powerPreference:G,failIfMajorPerformanceCaveat:X};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${rY}`);if(Q.addEventListener("webglcontextlost",H9,!1),Q.addEventListener("webglcontextrestored",c9,!1),Q.addEventListener("webglcontextcreationerror",f9,!1),y===null){if(y=m9("webgl2",P),y===null)if(m9("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}F0()}catch(P){throw Q.removeEventListener("webglcontextlost",H9,!1),Q.removeEventListener("webglcontextrestored",c9,!1),Q.removeEventListener("webglcontextcreationerror",f9,!1),Z9("WebGLRenderer: "+P.message),P}function F0(){if(O9=new gD(y),O9.init(),Z0=new AF(y,O9),B9=new TD(y,O9,J,Z0),w=new CF(y,O9),B9.reversedDepthBuffer&&F)w.buffers.depth.setReversed(!0);b=y.createFramebuffer(),e=y.createFramebuffer(),v=y.createFramebuffer(),A=new uD(y),h=new GF,o=new zF(y,O9,w,h,B9,Z0,A),q0=new xD(C),B0=new lG(y),S0=new PD(y,B0),w0=new pD(y,B0,A,S0),$0=new lD(y,w0,B0,S0,A),k9=new dD(y,B9,o),I0=new SD(h),Y0=new HF(C,q0,O9,B9,S0,I0),b0=new TF(C,h),i0=new XF,k0=new RF(O9),Q9=new LD(C,q0,w,$0,q,W),r0=new IF(C,$0,B9),x0=new SF(y,A,B9,w),g=new wD(y,O9,A),T0=new mD(y,O9,A),A.programs=Y0.programs,C.capabilities=B9,C.extensions=O9,C.properties=h,C.renderLists=i0,C.shadowMap=r0,C.state=w,C.info=A}if(O!==Q8)V=new nD(O,Q.width,Q.height,Y,Z,K);let v0=new uH(C,y);this.xr=v0,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){let P=O9.get("WEBGL_lose_context");if(P)P.loseContext()},this.forceContextRestore=function(){let P=O9.get("WEBGL_lose_context");if(P)P.restoreContext()},this.getPixelRatio=function(){return N0},this.setPixelRatio=function(P){if(P===void 0)return;N0=P,this.setSize(E0,i,!1)},this.getSize=function(P){return P.set(E0,i)},this.setSize=function(P,x,a=!0){if(v0.isPresenting){e0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(E0=P,i=x,Q.width=Math.floor(P*N0),Q.height=Math.floor(x*N0),a===!0)Q.style.width=P+"px",Q.style.height=x+"px";if(V!==null)V.setSize(Q.width,Q.height);this.setViewport(0,0,P,x)},this.getDrawingBufferSize=function(P){return P.set(E0*N0,i*N0).floor()},this.setDrawingBufferSize=function(P,x,a){E0=P,i=x,N0=a,Q.width=Math.floor(P*a),Q.height=Math.floor(x*a),this.setViewport(0,0,P,x)},this.setEffects=function(P){if(O===Q8){Z9("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(P){for(let x=0;x<P.length;x++)if(P[x].isOutputPass===!0){e0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}V.setEffects(P||[])},this.getCurrentViewport=function(P){return P.copy(p)},this.getViewport=function(P){return P.copy(C0)},this.setViewport=function(P,x,a,c){if(P.isVector4)C0.set(P.x,P.y,P.z,P.w);else C0.set(P,x,a,c);w.viewport(p.copy(C0).multiplyScalar(N0).round())},this.getScissor=function(P){return P.copy(s)},this.setScissor=function(P,x,a,c){if(P.isVector4)s.set(P.x,P.y,P.z,P.w);else s.set(P,x,a,c);w.scissor(J0.copy(s).multiplyScalar(N0).round())},this.getScissorTest=function(){return h0},this.setScissorTest=function(P){w.setScissorTest(h0=P)},this.setOpaqueSort=function(P){K0=P},this.setTransparentSort=function(P){m=P},this.getClearColor=function(P){return P.copy(Q9.getClearColor())},this.setClearColor=function(){Q9.setClearColor(...arguments)},this.getClearAlpha=function(){return Q9.getClearAlpha()},this.setClearAlpha=function(){Q9.setClearAlpha(...arguments)},this.clear=function(P=!0,x=!0,a=!0){let c=0;if(P){let n=!1;if(l!==null){let f0=l.texture.format;n=M.has(f0)}if(n){let f0=l.texture.type,p0=D.has(f0),y0=Q9.getClearColor(),d0=Q9.getClearAlpha(),c0=y0.r,D9=y0.g,I9=y0.b;if(p0)E[0]=c0,E[1]=D9,E[2]=I9,E[3]=d0,y.clearBufferuiv(y.COLOR,0,E);else I[0]=c0,I[1]=D9,I[2]=I9,I[3]=d0,y.clearBufferiv(y.COLOR,0,I)}else c|=y.COLOR_BUFFER_BIT}if(x)c|=y.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(a)c|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(c!==0)y.clear(c)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(P){P.setRenderer(this),k=P},this.dispose=function(){Q.removeEventListener("webglcontextlost",H9,!1),Q.removeEventListener("webglcontextrestored",c9,!1),Q.removeEventListener("webglcontextcreationerror",f9,!1),Q9.dispose(),i0.dispose(),k0.dispose(),h.dispose(),q0.dispose(),$0.dispose(),S0.dispose(),x0.dispose(),Y0.dispose(),v0.dispose(),v0.removeEventListener("sessionstart",JY),v0.removeEventListener("sessionend",QY),BJ.stop()};function H9(P){P.preventDefault(),$Q("WebGLRenderer: Context Lost."),f=!0}function c9(){$Q("WebGLRenderer: Context Restored."),f=!1;let P=A.autoReset,x=r0.enabled,a=r0.autoUpdate,c=r0.needsUpdate,n=r0.type;F0(),A.autoReset=P,r0.enabled=x,r0.autoUpdate=a,r0.needsUpdate=c,r0.type=n}function f9(P){Z9("WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function D8(P){let x=P.target;x.removeEventListener("dispose",D8),w8(x)}function w8(P){P5(P),h.remove(P)}function P5(P){let x=h.get(P).programs;if(x!==void 0){if(x.forEach(function(a){Y0.releaseProgram(a)}),P.isShaderMaterial)Y0.releaseShaderCache(P)}}this.renderBufferDirect=function(P,x,a,c,n,f0){if(x===null)x=a0;let p0=n.isMesh&&n.matrixWorld.determinantAffine()<0,y0=S5(P,x,a,c,n);w.setMaterial(c,p0);let d0=a.index,c0=1;if(c.wireframe===!0){if(d0=w0.getWireframeAttribute(a),d0===void 0)return;c0=2}let D9=a.drawRange,I9=a.attributes.position,l0=D9.start*c0,b9=(D9.start+D9.count)*c0;if(f0!==null)l0=Math.max(l0,f0.start*c0),b9=Math.min(b9,(f0.start+f0.count)*c0);if(d0!==null)l0=Math.max(l0,0),b9=Math.min(b9,d0.count);else if(I9!==void 0&&I9!==null)l0=Math.max(l0,0),b9=Math.min(b9,I9.count);let H7=b9-l0;if(H7<0||H7===1/0)return;S0.setup(n,c,y0,a,d0);let i9,l9=g;if(d0!==null)i9=B0.get(d0),l9=T0,l9.setIndex(i9);if(n.isMesh)if(c.wireframe===!0)w.setLineWidth(c.wireframeLinewidth*W9()),l9.setMode(y.LINES);else l9.setMode(y.TRIANGLES);else if(n.isLine){let B7=c.linewidth;if(B7===void 0)B7=1;if(w.setLineWidth(B7*W9()),n.isLineSegments)l9.setMode(y.LINES);else if(n.isLineLoop)l9.setMode(y.LINE_LOOP);else l9.setMode(y.LINE_STRIP)}else if(n.isPoints)l9.setMode(y.POINTS);else if(n.isSprite)l9.setMode(y.TRIANGLES);if(n.isBatchedMesh)if(!O9.get("WEBGL_multi_draw")){let{_multiDrawStarts:B7,_multiDrawCounts:g0,_multiDrawCount:w7}=n,w9=d0?B0.get(d0).bytesPerElement:1,d7=h.get(c).currentProgram.getUniforms();for(let q8=0;q8<w7;q8++)d7.setValue(y,"_gl_DrawID",q8),l9.render(B7[q8]/w9,g0[q8])}else l9.renderMultiDraw(n._multiDrawStarts,n._multiDrawCounts,n._multiDrawCount);else if(n.isInstancedMesh)l9.renderInstances(l0,H7,n.count);else if(a.isInstancedBufferGeometry){let B7=a._maxInstanceCount!==void 0?a._maxInstanceCount:1/0,g0=Math.min(a.instanceCount,B7);l9.renderInstances(l0,H7,g0)}else l9.render(l0,H7)};function eU(P,x,a,c){if(k!==null&&P.isNodeMaterial)k.setObject(c,P);if(X0===!0)I0.setState(P,a,!1);if(P.transparent===!0&&P.side===o9&&P.forceSinglePass===!1)P.side=N7,P.needsUpdate=!0,aQ(P,x,c),P.side=I6,P.needsUpdate=!0,aQ(P,x,c),P.side=o9;else aQ(P,x,c)}this.compile=function(P,x,a=null){if(a===null)a=P;if(k!==null)k.renderStart(P,x,a);if(B=k0.get(a),B.init(x),z.push(B),a.traverseVisible(function(n){if(n.isLight&&n.layers.test(x.layers)){if(B.pushLight(n),n.castShadow)B.pushShadow(n)}}),P!==a)P.traverseVisible(function(n){if(n.isLight&&n.layers.test(x.layers)){if(B.pushLight(n),n.castShadow)B.pushShadow(n)}});if(B.setupLights(),k!==null)k.updateLights(B.state.lightsArray);if(O0=this.localClippingEnabled,X0=I0.init(this.clippingPlanes,O0),X0===!0)I0.setGlobalState(this.clippingPlanes,x);if(k!==null)r0.render(B.state.shadowsArray,a,x);let c=new Set;if(P.traverse(function(n){if(!(n.isMesh||n.isPoints||n.isLine||n.isSprite))return;let f0=n.material;if(f0)if(Array.isArray(f0))for(let p0=0;p0<f0.length;p0++){let y0=f0[p0];eU(y0,a,x,n),c.add(y0)}else eU(f0,a,x,n),c.add(f0)}),B=z.pop(),k!==null)k.renderEnd();return c},this.compileAsync=function(P,x,a=null){let c=this.compile(P,x,a);return new Promise((n)=>{function f0(){if(c.forEach(function(p0){let d0=h.get(p0).currentProgram;if(d0===void 0||d0.isReady())c.delete(p0)}),c.size===0){n(P);return}setTimeout(f0,10)}if(O9.get("KHR_parallel_shader_compile")!==null)f0();else setTimeout(f0,10)})};let CZ=null;function w5(P){if(CZ)CZ(P)}function JY(){BJ.stop()}function QY(){BJ.start()}let BJ=new SH;if(BJ.setAnimationLoop(w5),typeof self<"u")BJ.setContext(self);this.setAnimationLoop=function(P){CZ=P,v0.setAnimationLoop(P),P===null?BJ.stop():BJ.start()},v0.addEventListener("sessionstart",JY),v0.addEventListener("sessionend",QY),this.render=function(P,x){if(x!==void 0&&x.isCamera!==!0){Z9("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(f===!0)return;if(k!==null)k.renderStart(P,x);let a=v0.enabled===!0&&v0.isPresenting===!0,c=V!==null&&(l===null||a)&&V.begin(C,l);if(P.matrixWorldAutoUpdate===!0)P.updateMatrixWorld();if(x.parent===null&&x.matrixWorldAutoUpdate===!0)x.updateMatrixWorld();if(v0.enabled===!0&&v0.isPresenting===!0&&(V===null||V.isCompositing()===!1)){if(v0.cameraAutoUpdate===!0)v0.updateCamera(x);x=v0.getCamera()}if(P.isScene===!0)P.onBeforeRender(C,P,x,l);if(B=k0.get(P,z.length),B.init(x),B.state.textureUnits=o.getTextureUnits(),z.push(B),V0.multiplyMatrices(x.projectionMatrix,x.matrixWorldInverse),r.setFromProjectionMatrix(V0,sK,x.reversedDepth),O0=this.localClippingEnabled,X0=I0.init(this.clippingPlanes,O0),R=i0.get(P,_.length),R.init(),_.push(R),v0.enabled===!0&&v0.isPresenting===!0){let p0=C.xr.getDepthSensingMesh();if(p0!==null)zZ(p0,x,-1/0,C.sortObjects)}if(zZ(P,x,0,C.sortObjects),R.finish(),k!==null)k.updateLights(B.state.lightsArray);if(C.sortObjects===!0)R.sort(K0,m);if(Y9=v0.enabled===!1||v0.isPresenting===!1||v0.hasDepthSensing()===!1,Y9)Q9.addToRenderList(R,P);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(X0===!0)I0.beginShadows();let n=B.state.shadowsArray;if(r0.render(n,P,x),X0===!0)I0.endShadows();if((c&&V.hasRenderPass())===!1){let{opaque:p0,transmissive:y0}=R;if(B.setupLights(),x.isArrayCamera){let d0=x.cameras;if(y0.length>0)for(let c0=0,D9=d0.length;c0<D9;c0++){let I9=d0[c0];ZY(p0,y0,P,I9)}if(Y9)Q9.render(P);for(let c0=0,D9=d0.length;c0<D9;c0++){let I9=d0[c0];$Y(R,P,I9,I9.viewport)}}else{if(y0.length>0)ZY(p0,y0,P,x);if(Y9)Q9.render(P);$Y(R,P,x)}}if(l!==null&&Q0===0)o.updateMultisampleRenderTarget(l),o.updateRenderTargetMipmap(l);if(c)V.end(C);if(P.isScene===!0)P.onAfterRender(C,P,x);if(S0.resetDefaultState(),D0=-1,t=null,z.pop(),z.length>0){if(B=z[z.length-1],o.setTextureUnits(B.state.textureUnits),X0===!0)I0.setGlobalState(C.clippingPlanes,B.state.camera)}else B=null;if(_.pop(),_.length>0)R=_[_.length-1];else R=null;if(k!==null)k.renderEnd()};function zZ(P,x,a,c){if(P.visible===!1)return;if(P.layers.test(x.layers)){if(P.isGroup)a=P.renderOrder;else if(P.isLOD){if(P.autoUpdate===!0)P.update(x)}else if(P.isLightProbeGrid)B.pushLightProbeGrid(P);else if(P.isLight){if(B.pushLight(P),P.castShadow)B.pushShadow(P)}else if(P.isSprite){if(!P.frustumCulled||P.intersectsFrustum(r)){if(c)s0.setFromMatrixPosition(P.matrixWorld).applyMatrix4(V0);let p0=$0.update(P),y0=P.material;if(y0.visible)R.push(P,p0,y0,a,s0.z,null,x)}}else if(P.isMesh||P.isLine||P.isPoints){if(!P.frustumCulled||P.intersectsFrustum(r)){let p0=$0.update(P),y0=P.material;if(c){if(P.boundingSphere!==void 0){if(P.boundingSphere===null)P.computeBoundingSphere();s0.copy(P.boundingSphere.center)}else{if(p0.boundingSphere===null)p0.computeBoundingSphere();s0.copy(p0.boundingSphere.center)}s0.applyMatrix4(P.matrixWorld).applyMatrix4(V0)}if(Array.isArray(y0)){let d0=p0.groups;for(let c0=0,D9=d0.length;c0<D9;c0++){let I9=d0[c0],l0=y0[I9.materialIndex];if(l0&&l0.visible)R.push(P,p0,l0,a,s0.z,I9,x)}}else if(y0.visible)R.push(P,p0,y0,a,s0.z,null,x)}}}let f0=P.children;for(let p0=0,y0=f0.length;p0<y0;p0++)zZ(f0[p0],x,a,c)}function $Y(P,x,a,c){let{opaque:n,transmissive:f0,transparent:p0}=P;if(B.setupLightsView(a),X0===!0)I0.setGlobalState(C.clippingPlanes,a);if(c)w.viewport(p.copy(c));if(n.length>0)oQ(n,x,a);if(f0.length>0)oQ(f0,x,a);if(p0.length>0)oQ(p0,x,a);w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function ZY(P,x,a,c){if((a.isScene===!0?a.overrideMaterial:null)!==null)return;if(B.state.transmissionRenderTarget[c.id]===void 0){let l0=O9.has("EXT_color_buffer_half_float")||O9.has("EXT_color_buffer_float");B.state.transmissionRenderTarget[c.id]=new W7(1,1,{generateMipmaps:!0,type:l0?F7:Q8,minFilter:TJ,samples:Math.max(4,B9.samples),stencilBuffer:K,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:M9.workingColorSpace})}let f0=B.state.transmissionRenderTarget[c.id],p0=c.viewport||p;f0.setSize(p0.z*C.transmissionResolutionScale,p0.w*C.transmissionResolutionScale);let y0=C.getRenderTarget(),d0=C.getActiveCubeFace(),c0=C.getActiveMipmapLevel();if(C.setRenderTarget(f0),C.getClearColor(A0),_0=C.getClearAlpha(),_0<1)C.setClearColor(16777215,0.5);if(C.clear(),Y9)Q9.render(a);let D9=C.toneMapping;C.toneMapping=J8;let I9=c.viewport;if(c.viewport!==void 0)c.viewport=void 0;if(B.setupLightsView(c),X0===!0)I0.setGlobalState(C.clippingPlanes,c);if(oQ(P,a,c),o.updateMultisampleRenderTarget(f0),o.updateRenderTargetMipmap(f0),O9.has("WEBGL_multisampled_render_to_texture")===!1){let l0=!1;for(let b9=0,H7=x.length;b9<H7;b9++){let i9=x[b9],{object:l9,geometry:B7,material:g0,group:w7}=i9;if(g0.side===o9&&l9.layers.test(c.layers)){let w9=g0.side;g0.side=N7,g0.needsUpdate=!0,KY(l9,a,c,B7,g0,w7),g0.side=w9,g0.needsUpdate=!0,l0=!0}}if(l0===!0)o.updateMultisampleRenderTarget(f0),o.updateRenderTargetMipmap(f0)}if(C.setRenderTarget(y0,d0,c0),C.setClearColor(A0,_0),I9!==void 0)c.viewport=I9;C.toneMapping=D9}function oQ(P,x,a){let c=x.isScene===!0?x.overrideMaterial:null;for(let n=0,f0=P.length;n<f0;n++){let p0=P[n],{object:y0,geometry:d0,group:c0}=p0,D9=p0.material;if(D9.allowOverride===!0&&c!==null)D9=c;if(y0.layers.test(a.layers))KY(y0,x,a,d0,D9,c0)}}function KY(P,x,a,c,n,f0){if(k!==null&&n.isNodeMaterial)k.setObject(P,n);if(P.onBeforeRender(C,x,a,c,n,f0),P.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),n.onBeforeRender(C,x,a,c,P,f0),n.transparent===!0&&n.side===o9&&n.forceSinglePass===!1)n.side=N7,n.needsUpdate=!0,C.renderBufferDirect(a,x,c,n,P,f0),n.side=I6,n.needsUpdate=!0,C.renderBufferDirect(a,x,c,n,P,f0),n.side=o9;else C.renderBufferDirect(a,x,c,n,P,f0);P.onAfterRender(C,x,a,c,n,f0)}function aQ(P,x,a){if(x.isScene!==!0)x=a0;let c=h.get(P),n=B.state.lights,f0=B.state.shadowsArray,p0=n.state.version,y0=Y0.getParameters(P,n.state,f0,x,a,B.state.lightProbeGridArray),d0=Y0.getProgramCacheKey(y0),c0=c.programs;c.environment=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?x.environment:null,c.fog=x.fog;let D9=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap;if(c.envMap=q0.get(P.envMap||c.environment,D9),c.envMapRotation=c.environment!==null&&P.envMap===null?x.environmentRotation:P.envMapRotation,c0===void 0)P.addEventListener("dispose",D8),c0=new Map,c.programs=c0;let I9=c0.get(d0);if(I9!==void 0){if(c.currentProgram===I9&&c.lightsStateVersion===p0)return YY(P,y0),I9}else{if(y0.uniforms=Y0.getUniforms(P),k!==null&&P.isNodeMaterial)k.build(P,a,y0);P.onBeforeCompile(y0,C),I9=Y0.acquireProgram(y0,d0),c0.set(d0,I9),c.uniforms=y0.uniforms}let l0=c.uniforms;if(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)l0.clippingPlanes=I0.uniform;if(YY(P,y0),c.needsLights=j5(P),c.lightsStateVersion=p0,c.needsLights)l0.ambientLightColor.value=n.state.ambient,l0.lightProbe.value=n.state.probe,l0.sunLights.value=n.state.sun,l0.sunLightShadows.value=n.state.sunShadow,l0.directionalLights.value=n.state.directional,l0.directionalLightShadows.value=n.state.directionalShadow,l0.spotLights.value=n.state.spot,l0.spotLightShadows.value=n.state.spotShadow,l0.rectAreaLights.value=n.state.rectArea,l0.ltc_1.value=n.state.rectAreaLTC1,l0.ltc_2.value=n.state.rectAreaLTC2,l0.pointLights.value=n.state.point,l0.pointLightShadows.value=n.state.pointShadow,l0.hemisphereLights.value=n.state.hemi,l0.sunShadowMatrix.value=n.state.sunShadowMatrix,l0.sunShadowCascade.value=n.state.sunShadowCascade,l0.directionalShadowMatrix.value=n.state.directionalShadowMatrix,l0.spotLightMatrix.value=n.state.spotLightMatrix,l0.spotLightMap.value=n.state.spotLightMap,l0.pointShadowMatrix.value=n.state.pointShadowMatrix;return c.lightProbeGrid=B.state.lightProbeGridArray.length>0,c.currentProgram=I9,c.uniformsList=null,I9}function UY(P){if(P.uniformsList===null){let x=P.currentProgram.getUniforms();P.uniformsList=fQ.seqWithValue(x.seq,P.uniforms)}return P.uniformsList}function YY(P,x){let a=h.get(P);a.outputColorSpace=x.outputColorSpace,a.batching=x.batching,a.batchingColor=x.batchingColor,a.instancing=x.instancing,a.instancingColor=x.instancingColor,a.instancingMorph=x.instancingMorph,a.skinning=x.skinning,a.morphTargets=x.morphTargets,a.morphNormals=x.morphNormals,a.morphColors=x.morphColors,a.morphTargetsCount=x.morphTargetsCount,a.numClippingPlanes=x.numClippingPlanes,a.numIntersection=x.numClipIntersection,a.vertexAlphas=x.vertexAlphas,a.vertexTangents=x.vertexTangents,a.toneMapping=x.toneMapping}function T5(P,x){if(P.length===0)return null;if(P.length===1)return P[0].texture!==null?P[0]:null;L.setFromMatrixPosition(x.matrixWorld);for(let a=0,c=P.length;a<c;a++){let n=P[a];if(n.texture!==null&&n.boundingBox.containsPoint(L))return n}return null}function S5(P,x,a,c,n){if(x.isScene!==!0)x=a0;o.resetTextureUnits();let f0=x.fog,p0=c.isMeshStandardMaterial||c.isMeshLambertMaterial||c.isMeshPhongMaterial?x.environment:null,y0=l===null?C.outputColorSpace:l.isXRRenderTarget===!0?l.texture.colorSpace:M9.workingColorSpace,d0=c.isMeshStandardMaterial||c.isMeshLambertMaterial&&!c.envMap||c.isMeshPhongMaterial&&!c.envMap,c0=q0.get(c.envMap||p0,d0),D9=c.vertexColors===!0&&!!a.attributes.color&&a.attributes.color.itemSize===4,I9=!!a.attributes.tangent&&(!!c.normalMap||c.anisotropy>0),l0=!!a.morphAttributes.position,b9=!!a.morphAttributes.normal,H7=!!a.morphAttributes.color,i9=J8;if(c.toneMapped){if(l===null||l.isXRRenderTarget===!0)i9=C.toneMapping}let l9=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,B7=l9!==void 0?l9.length:0,g0=h.get(c),w7=B.state.lights;if(X0===!0){if(O0===!0||P!==t){let n9=P===t&&c.id===D0;I0.setState(c,P,n9)}}let w9=!1;if(c.version===g0.__version){if(g0.needsLights&&g0.lightsStateVersion!==w7.state.version)w9=!0;else if(g0.outputColorSpace!==y0)w9=!0;else if(n.isBatchedMesh&&g0.batching===!1)w9=!0;else if(!n.isBatchedMesh&&g0.batching===!0)w9=!0;else if(n.isBatchedMesh&&g0.batchingColor===!0&&n._colorsTexture===null)w9=!0;else if(n.isBatchedMesh&&g0.batchingColor===!1&&n._colorsTexture!==null)w9=!0;else if(n.isInstancedMesh&&g0.instancing===!1)w9=!0;else if(!n.isInstancedMesh&&g0.instancing===!0)w9=!0;else if(n.isSkinnedMesh&&g0.skinning===!1)w9=!0;else if(!n.isSkinnedMesh&&g0.skinning===!0)w9=!0;else if(n.isInstancedMesh&&g0.instancingColor===!0&&n.instanceColor===null)w9=!0;else if(n.isInstancedMesh&&g0.instancingColor===!1&&n.instanceColor!==null)w9=!0;else if(n.isInstancedMesh&&g0.instancingMorph===!0&&n.morphTexture===null)w9=!0;else if(n.isInstancedMesh&&g0.instancingMorph===!1&&n.morphTexture!==null)w9=!0;else if(g0.envMap!==c0)w9=!0;else if(c.fog===!0&&g0.fog!==f0)w9=!0;else if(g0.numClippingPlanes!==void 0&&(g0.numClippingPlanes!==I0.numPlanes||g0.numIntersection!==I0.numIntersection))w9=!0;else if(g0.vertexAlphas!==D9)w9=!0;else if(g0.vertexTangents!==I9)w9=!0;else if(g0.morphTargets!==l0)w9=!0;else if(g0.morphNormals!==b9)w9=!0;else if(g0.morphColors!==H7)w9=!0;else if(g0.toneMapping!==i9)w9=!0;else if(g0.morphTargetsCount!==B7)w9=!0;else if(!!g0.lightProbeGrid!==B.state.lightProbeGridArray.length>0)w9=!0}else w9=!0,g0.__version=c.version;let d7=g0.currentProgram;if(w9===!0){if(d7=aQ(c,x,n),k&&c.isNodeMaterial)k.onUpdateProgram(c,d7,g0)}let q8=!1,YJ=!1,aJ=!1,u9=d7.getUniforms(),U7=g0.uniforms;if(w.useProgram(d7.program))q8=!0,YJ=!0,aJ=!0;if(c.id!==D0)D0=c.id,YJ=!0;if(g0.needsLights){let n9=T5(B.state.lightProbeGridArray,n);if(g0.lightProbeGrid!==n9)g0.lightProbeGrid=n9,YJ=!0}if(q8||t!==P){if(w.buffers.depth.getReversed()&&P.reversedDepth!==!0)P._reversedDepth=!0,P.updateProjectionMatrix();u9.setValue(y,"projectionMatrix",P.projectionMatrix),u9.setValue(y,"viewMatrix",P.matrixWorldInverse);let HJ=u9.map.cameraPosition;if(HJ!==void 0)HJ.setValue(y,L0.setFromMatrixPosition(P.matrixWorld));if(B9.logarithmicDepthBuffer)u9.setValue(y,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2));if(c.isMeshPhongMaterial||c.isMeshToonMaterial||c.isMeshLambertMaterial||c.isMeshBasicMaterial||c.isMeshStandardMaterial||c.isShaderMaterial)u9.setValue(y,"isOrthographic",P.isOrthographicCamera===!0);if(t!==P)t=P,YJ=!0,aJ=!0}if(g0.needsLights){if(w7.state.sunShadowMap.length>0)u9.setValue(y,"sunShadowMap",w7.state.sunShadowMap,o);if(w7.state.directionalShadowMap.length>0)u9.setValue(y,"directionalShadowMap",w7.state.directionalShadowMap,o);if(w7.state.spotShadowMap.length>0)u9.setValue(y,"spotShadowMap",w7.state.spotShadowMap,o);if(w7.state.pointShadowMap.length>0)u9.setValue(y,"pointShadowMap",w7.state.pointShadowMap,o)}if(n.isSkinnedMesh){u9.setOptional(y,n,"bindMatrix"),u9.setOptional(y,n,"bindMatrixInverse");let n9=n.skeleton;if(n9){if(n9.boneTexture===null)n9.computeBoneTexture();u9.setValue(y,"boneTexture",n9.boneTexture,o)}}if(n.isBatchedMesh){if(u9.setOptional(y,n,"batchingTexture"),u9.setValue(y,"batchingTexture",n._matricesTexture,o),u9.setOptional(y,n,"batchingIdTexture"),u9.setValue(y,"batchingIdTexture",n._indirectTexture,o),u9.setOptional(y,n,"batchingColorTexture"),n._colorsTexture!==null)u9.setValue(y,"batchingColorTexture",n._colorsTexture,o)}let WJ=a.morphAttributes;if(WJ.position!==void 0||WJ.normal!==void 0||WJ.color!==void 0)k9.update(n,a,d7);if(YJ||g0.receiveShadow!==n.receiveShadow)g0.receiveShadow=n.receiveShadow,u9.setValue(y,"receiveShadow",n.receiveShadow);if((c.isMeshStandardMaterial||c.isMeshLambertMaterial||c.isMeshPhongMaterial)&&c.envMap===null&&x.environment!==null)U7.envMapIntensity.value=x.environmentIntensity;if(U7.dfgLUT!==void 0)U7.dfgLUT.value=jF();if(YJ){if(u9.setValue(y,"toneMappingExposure",C.toneMappingExposure),g0.needsLights)k5(U7,aJ);if(f0&&c.fog===!0)b0.refreshFogUniforms(U7,f0);if(b0.refreshMaterialUniforms(U7,c,N0,i,B.state.transmissionRenderTarget[P.id]),g0.needsLights&&g0.lightProbeGrid){let n9=g0.lightProbeGrid;U7.probesSH.value=n9.texture,U7.probesMin.value.copy(n9.boundingBox.min),U7.probesMax.value.copy(n9.boundingBox.max),U7.probesResolution.value.copy(n9.resolution)}fQ.upload(y,UY(g0),U7,o)}if(c.isShaderMaterial&&c.uniformsNeedUpdate===!0)fQ.upload(y,UY(g0),U7,o),c.uniformsNeedUpdate=!1;if(c.isSpriteMaterial)u9.setValue(y,"center",n.center);if(u9.setValue(y,"modelViewMatrix",n.modelViewMatrix),u9.setValue(y,"normalMatrix",n.normalMatrix),u9.setValue(y,"modelMatrix",n.matrixWorld),c.uniformsGroups!==void 0){let n9=c.uniformsGroups;for(let HJ=0,rJ=n9.length;HJ<rJ;HJ++){let HY=n9[HJ];x0.update(HY,d7),x0.bind(HY,d7)}}return d7}function k5(P,x){P.ambientLightColor.needsUpdate=x,P.lightProbe.needsUpdate=x,P.sunLights.needsUpdate=x,P.sunLightShadows.needsUpdate=x,P.directionalLights.needsUpdate=x,P.directionalLightShadows.needsUpdate=x,P.pointLights.needsUpdate=x,P.pointLightShadows.needsUpdate=x,P.spotLights.needsUpdate=x,P.spotLightShadows.needsUpdate=x,P.rectAreaLights.needsUpdate=x,P.hemisphereLights.needsUpdate=x}function j5(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return u},this.getActiveMipmapLevel=function(){return Q0},this.getRenderTarget=function(){return l},this.setRenderTargetTextures=function(P,x,a){let c=h.get(P);if(c.__autoAllocateDepthBuffer=P.resolveDepthBuffer===!1,c.__autoAllocateDepthBuffer===!1)c.__useRenderToTexture=!1;h.get(P.texture).__webglTexture=x,h.get(P.depthTexture).__webglTexture=c.__autoAllocateDepthBuffer?void 0:a,c.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(P,x){let a=h.get(P);a.__webglFramebuffer=x,a.__useDefaultFramebuffer=x===void 0},this.setRenderTarget=function(P,x=0,a=0){l=P,u=x,Q0=a;let c=null,n=!1,f0=!1;if(P){let y0=h.get(P);if(y0.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(y.FRAMEBUFFER,y0.__webglFramebuffer),p.copy(P.viewport),J0.copy(P.scissor),M0=P.scissorTest,w.viewport(p),w.scissor(J0),w.setScissorTest(M0),D0=-1;return}else if(y0.__webglFramebuffer===void 0)o.setupRenderTarget(P);else if(y0.__hasExternalTextures)o.rebindTextures(P,h.get(P.texture).__webglTexture,h.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){let D9=P.depthTexture;if(y0.__boundDepthTexture!==D9){if(D9!==null&&h.has(D9)&&(P.width!==D9.image.width||P.height!==D9.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");o.setupDepthRenderbuffer(P)}}let d0=P.texture;if(d0.isData3DTexture||d0.isDataArrayTexture||d0.isCompressedArrayTexture)f0=!0;let c0=h.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget){if(Array.isArray(c0[x]))c=c0[x][a];else c=c0[x];n=!0}else if(P.samples>0&&o.useMultisampledRTT(P)===!1)c=h.get(P).__webglMultisampledFramebuffer;else if(Array.isArray(c0))c=c0[a];else c=c0;p.copy(P.viewport),J0.copy(P.scissor),M0=P.scissorTest}else p.copy(C0).multiplyScalar(N0).floor(),J0.copy(s).multiplyScalar(N0).floor(),M0=h0;if(a!==0)c=b;if(w.bindFramebuffer(y.FRAMEBUFFER,c))w.drawBuffers(P,c);if(w.viewport(p),w.scissor(J0),w.setScissorTest(M0),n){let y0=h.get(P.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+x,y0.__webglTexture,a)}else if(f0){let y0=x;for(let d0=0;d0<P.textures.length;d0++){let c0=h.get(P.textures[d0]);y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0+d0,c0.__webglTexture,a,y0)}}else if(P!==null&&a!==0){let y0=h.get(P.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,y0.__webglTexture,a)}D0=-1};function WY(P){let x=h.get(P);if(x.__readFormat!==P.format||x.__readType!==P.type)x.__readFormat=P.format,x.__readType=P.type,x.__formatReadable=B9.textureFormatReadable(P.format),x.__typeReadable=B9.textureTypeReadable(P.type);return x}if(this.readRenderTargetPixels=function(P,x,a,c,n,f0,p0,y0=0){if(!(P&&P.isWebGLRenderTarget)){Z9("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let d0=h.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&p0!==void 0)d0=d0[p0];if(d0){w.bindFramebuffer(y.FRAMEBUFFER,d0);try{let c0=P.textures[y0],D9=c0.format,I9=c0.type;if(P.textures.length>1)y.readBuffer(y.COLOR_ATTACHMENT0+y0);let l0=WY(c0);if(l0.__formatReadable===!1){Z9("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(l0.__typeReadable===!1){Z9("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(x>=0&&x<=P.width-c&&(a>=0&&a<=P.height-n))y.readPixels(x,a,c,n,Z0.convert(D9),Z0.convert(I9),f0)}finally{let c0=l!==null?h.get(l).__webglFramebuffer:null;w.bindFramebuffer(y.FRAMEBUFFER,c0)}}},this.readRenderTargetPixelsAsync=async function(P,x,a,c,n,f0,p0,y0=0){if(!(P&&P.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let d0=h.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&p0!==void 0)d0=d0[p0];if(d0)if(x>=0&&x<=P.width-c&&(a>=0&&a<=P.height-n)){w.bindFramebuffer(y.FRAMEBUFFER,d0);let c0=P.textures[y0],D9=c0.format,I9=c0.type;if(P.textures.length>1)y.readBuffer(y.COLOR_ATTACHMENT0+y0);let l0=WY(c0);if(l0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(l0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let b9=y.createBuffer();y.bindBuffer(y.PIXEL_PACK_BUFFER,b9),y.bufferData(y.PIXEL_PACK_BUFFER,f0.byteLength,y.STREAM_READ),y.readPixels(x,a,c,n,Z0.convert(D9),Z0.convert(I9),0),y.bindBuffer(y.PIXEL_PACK_BUFFER,null);let H7=l!==null?h.get(l).__webglFramebuffer:null;w.bindFramebuffer(y.FRAMEBUFFER,H7);let i9=y.fenceSync(y.SYNC_GPU_COMMANDS_COMPLETE,0);return y.flush(),await iW(y,i9,4),y.bindBuffer(y.PIXEL_PACK_BUFFER,b9),y.getBufferSubData(y.PIXEL_PACK_BUFFER,0,f0),y.bindBuffer(y.PIXEL_PACK_BUFFER,null),y.deleteBuffer(b9),y.deleteSync(i9),f0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(P,x=null,a=0){let c=Math.pow(2,-a),n=Math.floor(P.image.width*c),f0=Math.floor(P.image.height*c),p0=x!==null?x.x:0,y0=x!==null?x.y:0;o.setTexture2D(P,0),y.copyTexSubImage2D(y.TEXTURE_2D,a,0,0,p0,y0,n,f0),w.unbindTexture()},this.copyTextureToTexture=function(P,x,a=null,c=null,n=0,f0=0){let p0,y0,d0,c0,D9,I9,l0,b9,H7,i9=P.isCompressedTexture?P.mipmaps[f0]:P.image;if(a!==null)p0=a.max.x-a.min.x,y0=a.max.y-a.min.y,d0=a.isBox3?a.max.z-a.min.z:1,c0=a.min.x,D9=a.min.y,I9=a.isBox3?a.min.z:0;else{let U7=Math.pow(2,-n);if(p0=Math.floor(i9.width*U7),y0=Math.floor(i9.height*U7),P.isDataArrayTexture)d0=i9.depth;else if(P.isData3DTexture)d0=Math.floor(i9.depth*U7);else d0=1;c0=0,D9=0,I9=0}if(c!==null)l0=c.x,b9=c.y,H7=c.z;else l0=0,b9=0,H7=0;let l9=Z0.convert(x.format),B7=Z0.convert(x.type),g0;if(x.isData3DTexture)o.setTexture3D(x,0),g0=y.TEXTURE_3D;else if(x.isDataArrayTexture||x.isCompressedArrayTexture)o.setTexture2DArray(x,0),g0=y.TEXTURE_2D_ARRAY;else o.setTexture2D(x,0),g0=y.TEXTURE_2D;w.activeTexture(y.TEXTURE0),w.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,x.flipY),w.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),w.pixelStorei(y.UNPACK_ALIGNMENT,x.unpackAlignment);let w7=w.getParameter(y.UNPACK_ROW_LENGTH),w9=w.getParameter(y.UNPACK_IMAGE_HEIGHT),d7=w.getParameter(y.UNPACK_SKIP_PIXELS),q8=w.getParameter(y.UNPACK_SKIP_ROWS),YJ=w.getParameter(y.UNPACK_SKIP_IMAGES);w.pixelStorei(y.UNPACK_ROW_LENGTH,i9.width),w.pixelStorei(y.UNPACK_IMAGE_HEIGHT,i9.height),w.pixelStorei(y.UNPACK_SKIP_PIXELS,c0),w.pixelStorei(y.UNPACK_SKIP_ROWS,D9),w.pixelStorei(y.UNPACK_SKIP_IMAGES,I9);let aJ=P.isDataArrayTexture||P.isData3DTexture,u9=x.isDataArrayTexture||x.isData3DTexture;if(P.isDepthTexture){let U7=h.get(P),WJ=h.get(x),n9=h.get(U7.__renderTarget),HJ=h.get(WJ.__renderTarget);w.bindFramebuffer(y.READ_FRAMEBUFFER,n9.__webglFramebuffer),w.bindFramebuffer(y.DRAW_FRAMEBUFFER,HJ.__webglFramebuffer);for(let rJ=0;rJ<d0;rJ++){if(aJ)y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,h.get(P).__webglTexture,n,I9+rJ),y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,h.get(x).__webglTexture,f0,H7+rJ);y.blitFramebuffer(c0,D9,p0,y0,l0,b9,p0,y0,y.DEPTH_BUFFER_BIT,y.NEAREST)}w.bindFramebuffer(y.READ_FRAMEBUFFER,null),w.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else if(n!==0||P.isRenderTargetTexture||h.has(P)){let U7=h.get(P),WJ=h.get(x);w.bindFramebuffer(y.READ_FRAMEBUFFER,e),w.bindFramebuffer(y.DRAW_FRAMEBUFFER,v);for(let n9=0;n9<d0;n9++){if(aJ)y.framebufferTextureLayer(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,U7.__webglTexture,n,I9+n9);else y.framebufferTexture2D(y.READ_FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,U7.__webglTexture,n);if(u9)y.framebufferTextureLayer(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,WJ.__webglTexture,f0,H7+n9);else y.framebufferTexture2D(y.DRAW_FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_2D,WJ.__webglTexture,f0);if(n!==0)y.blitFramebuffer(c0,D9,p0,y0,l0,b9,p0,y0,y.COLOR_BUFFER_BIT,y.NEAREST);else if(u9)y.copyTexSubImage3D(g0,f0,l0,b9,H7+n9,c0,D9,p0,y0);else y.copyTexSubImage2D(g0,f0,l0,b9,c0,D9,p0,y0)}w.bindFramebuffer(y.READ_FRAMEBUFFER,null),w.bindFramebuffer(y.DRAW_FRAMEBUFFER,null)}else if(u9)if(P.isDataTexture||P.isData3DTexture)y.texSubImage3D(g0,f0,l0,b9,H7,p0,y0,d0,l9,B7,i9.data);else if(x.isCompressedArrayTexture)y.compressedTexSubImage3D(g0,f0,l0,b9,H7,p0,y0,d0,l9,i9.data);else y.texSubImage3D(g0,f0,l0,b9,H7,p0,y0,d0,l9,B7,i9);else if(P.isDataTexture)y.texSubImage2D(y.TEXTURE_2D,f0,l0,b9,p0,y0,l9,B7,i9.data);else if(P.isCompressedTexture)y.compressedTexSubImage2D(y.TEXTURE_2D,f0,l0,b9,i9.width,i9.height,l9,i9.data);else y.texSubImage2D(y.TEXTURE_2D,f0,l0,b9,p0,y0,l9,B7,i9);if(w.pixelStorei(y.UNPACK_ROW_LENGTH,w7),w.pixelStorei(y.UNPACK_IMAGE_HEIGHT,w9),w.pixelStorei(y.UNPACK_SKIP_PIXELS,d7),w.pixelStorei(y.UNPACK_SKIP_ROWS,q8),w.pixelStorei(y.UNPACK_SKIP_IMAGES,YJ),f0===0&&x.generateMipmaps)y.generateMipmap(g0);w.unbindTexture()},this.initRenderTarget=function(P){if(h.get(P).__webglFramebuffer===void 0)o.setupRenderTarget(P)},this.initTexture=function(P){if(P.isCubeTexture)o.setTextureCube(P,0);else if(P.isData3DTexture)o.setTexture3D(P,0);else if(P.isDataArrayTexture||P.isCompressedArrayTexture)o.setTexture2DArray(P,0);else o.setTexture2D(P,0);w.unbindTexture()},this.resetState=function(){u=0,Q0=0,l=null,w.reset(),S0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return sK}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=M9._getDrawingBufferColorSpace(J),Q.unpackColorSpace=M9._getUnpackColorSpace()}}var vF="varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";class jU{mesh;stars;sunDir=new S(0,-0.2,-1).normalize();constructor(J=400){this.mesh=new d(new $9(J,48,24),new v9({side:N7,depthWrite:!1,uniforms:{day:{value:0},sun:{value:this.sunDir}},vertexShader:vF,fragmentShader:`
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
        }`}));let Q=1400,$=new Float32Array(Q*3);for(let K=0;K<Q;K++){let U=K9(K),Y=K9(K+9999),W=U*Math.PI*2,H=Math.acos(1-Y*0.95);$.set([Math.sin(H)*Math.cos(W)*J*0.95,Math.cos(H)*J*0.95,Math.sin(H)*Math.sin(W)*J*0.95],K*3)}let Z=new F9;Z.setAttribute("position",new Q7($,3)),this.stars=new U8(Z,new c7({color:16777215,size:1.4,sizeAttenuation:!1,transparent:!0,depthWrite:!1}))}set(J,Q=0){this.mesh.material.uniforms.day.value=J;let $=(J-0.5)*0.9;return this.sunDir.set(Math.cos($)*Math.sin(Q),Math.sin($),-Math.cos($)*Math.cos(Q)).normalize(),this.stars.material.opacity=Math.max(0,1-J*2.2),this.sunDir}}class vU{box;points;base;constructor(J,Q=600,$=16773590){this.box=J;this.base=new Float32Array(Q*3);let Z=J.getSize(new S);for(let U=0;U<Q;U++)this.base.set([J.min.x+K9(U)*Z.x,J.min.y+K9(U+3000)*Z.y,J.min.z+K9(U+6000)*Z.z],U*3);let K=new F9;K.setAttribute("position",new Q7(this.base.slice(),3)),this.points=new U8(K,new c7({color:$,size:0.025,transparent:!0,opacity:0.7,blending:Z7,depthWrite:!1}))}update(J){let Q=this.points.geometry.attributes.position,$=this.box.getSize(new S);for(let Z=0;Z<Q.count;Z++){let K=this.base[Z*3],U=this.base[Z*3+1],Y=this.base[Z*3+2],W=this.box.min.y+((U-this.box.min.y+J*0.05*(0.5+K9(Z)))%$.y+$.y)%$.y;Q.setXYZ(Z,K+Math.sin(J*0.4+Z)*0.08,W,Y+Math.cos(J*0.3+Z*1.7)*0.08)}Q.needsUpdate=!0}}function lH(J,Q,$,Z){let K=new u0(Q,$,Z,32,1,!0).translate(0,-Z/2,0),U=new v9({transparent:!0,depthWrite:!1,blending:Z7,side:o9,uniforms:{color:{value:new W0(J)},strength:{value:0.25},time:{value:0}},vertexShader:"varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main() { vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",fragmentShader:`uniform vec3 color; uniform float strength, time; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main() {
        float edge = pow(abs(dot(vN, vV)), 1.6);
        float along = smoothstep(0.0, 0.25, vUv.y) * smoothstep(0.0, 0.6, 1.0 - vUv.y) + 0.15;
        float n = 0.85 + 0.15 * sin(vUv.x * 40.0 + time * 0.6) * sin(vUv.y * 9.0 - time * 0.4);
        gl_FragColor = vec4(color * edge * along * n * strength, 1.0);
      }`});return new d(K,U)}function K9(J){let Q=Math.sin(J*127.1+311.7)*43758.5453;return Q-Math.floor(Q)}class f7{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}var yF=new mJ(-1,1,1,-1,0,1);class cH extends F9{constructor(){super();this.setAttribute("position",new J9([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new J9([0,2,0,0,2,0],2))}}var fF=new cH;class i8{constructor(J){this._mesh=new d(fF,J)}dispose(){this._mesh.geometry.dispose()}render(J){J.render(this._mesh,yF)}get material(){return this._mesh.material}set material(J){this._mesh.material=J}}var bQ={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:0.025},maxblur:{value:0.01},nearClip:{value:1},farClip:{value:1000}},vertexShader:`

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

		}`};class yU extends f7{constructor(J,Q,$){super();this.scene=J,this.camera=Q;let Z=$.focus!==void 0?$.focus:1,K=$.aperture!==void 0?$.aperture:0.025,U=$.maxblur!==void 0?$.maxblur:1;this._renderTargetDepth=new W7(1,1,{minFilter:u7,magFilter:u7,type:F7}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new SQ,this._materialDepth.depthPacking=uK,this._materialDepth.blending=j7;let Y=H8.clone(bQ.uniforms);Y.tDepth.value=this._renderTargetDepth.texture,Y.focus.value=Z,Y.aspect.value=Q.aspect,Y.aperture.value=K,Y.maxblur.value=U,Y.nearClip.value=Q.near,Y.farClip.value=Q.far,this.materialBokeh=new v9({defines:Object.assign({},bQ.defines),uniforms:Y,vertexShader:bQ.vertexShader,fragmentShader:bQ.fragmentShader}),this.uniforms=Y,this._fsQuad=new i8(this.materialBokeh),this._oldClearColor=new W0}render(J,Q,$){this.scene.overrideMaterial=this._materialDepth,J.getClearColor(this._oldClearColor);let Z=J.getClearAlpha(),K=J.autoClear;if(J.autoClear=!1,J.setClearColor(16777215),J.setClearAlpha(1),J.setRenderTarget(this._renderTargetDepth),J.clear(),J.render(this.scene,this.camera),this.uniforms.tColor.value=$.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget(Q),J.clear(),this._fsQuad.render(J);this.scene.overrideMaterial=null,J.setClearColor(this._oldClearColor),J.setClearAlpha(Z),J.autoClear=K}setSize(J,Q){this.materialBokeh.uniforms.aspect.value=J/Q,this._renderTargetDepth.setSize(J,Q)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}}var b6={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class dJ extends f7{constructor(J,Q="tDiffuse"){super();if(this.textureID=Q,this.uniforms=null,this.material=null,J instanceof v9)this.uniforms=J.uniforms,this.material=J;else if(J)this.uniforms=H8.clone(J.uniforms),this.material=new v9({name:J.name!==void 0?J.name:"unspecified",defines:Object.assign({},J.defines),uniforms:this.uniforms,vertexShader:J.vertexShader,fragmentShader:J.fragmentShader});this._fsQuad=new i8(this.material)}render(J,Q,$){if(this.uniforms[this.textureID])this.uniforms[this.textureID].value=$.texture;if(this._fsQuad.material=this.material,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget(Q),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class qZ extends f7{constructor(J,Q){super();this.scene=J,this.camera=Q,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(J,Q,$){let Z=J.getContext(),K=J.state;K.buffers.color.setMask(!1),K.buffers.depth.setMask(!1),K.buffers.color.setLocked(!0),K.buffers.depth.setLocked(!0);let U,Y;if(this.inverse)U=0,Y=1;else U=1,Y=0;if(K.buffers.stencil.setTest(!0),K.buffers.stencil.setOp(Z.REPLACE,Z.REPLACE,Z.REPLACE),K.buffers.stencil.setFunc(Z.ALWAYS,U,4294967295),K.buffers.stencil.setClear(Y),K.buffers.stencil.setLocked(!0),J.setRenderTarget($),this.clear)J.clear();if(J.render(this.scene,this.camera),J.setRenderTarget(Q),this.clear)J.clear();J.render(this.scene,this.camera),K.buffers.color.setLocked(!1),K.buffers.depth.setLocked(!1),K.buffers.color.setMask(!0),K.buffers.depth.setMask(!0),K.buffers.stencil.setLocked(!1),K.buffers.stencil.setFunc(Z.EQUAL,1,4294967295),K.buffers.stencil.setOp(Z.KEEP,Z.KEEP,Z.KEEP),K.buffers.stencil.setLocked(!0)}}class fU extends f7{constructor(){super();this.needsSwap=!1}render(J){J.state.buffers.stencil.setLocked(!1),J.state.buffers.stencil.setTest(!1)}}class o8{constructor(J,Q){if(this.renderer=J,this._pixelRatio=J.getPixelRatio(),Q===void 0){let $=J.getSize(new U0);this._width=$.width,this._height=$.height,Q=new W7(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:F7}),Q.texture.name="EffectComposer.rt1"}else this._width=Q.width,this._height=Q.height;this.renderTarget1=Q,this.renderTarget2=Q.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new dJ(b6),this.copyPass.material.blending=j7,this.timer=new HZ}swapBuffers(){let J=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=J}addPass(J){this.passes.push(J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(J,Q){this.passes.splice(Q,0,J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(J){let Q=this.passes.indexOf(J);if(Q!==-1)this.passes.splice(Q,1)}isLastEnabledPass(J){for(let Q=J+1;Q<this.passes.length;Q++)if(this.passes[Q].enabled)return!1;return!0}render(J){if(this.timer.update(),J===void 0)J=this.timer.getDelta();let Q=this.renderer.getRenderTarget(),$=!1;for(let Z=0,K=this.passes.length;Z<K;Z++){let U=this.passes[Z];if(U.enabled===!1)continue;if(U.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(Z),U.render(this.renderer,this.writeBuffer,this.readBuffer,J,$),U.needsSwap){if($){let Y=this.renderer.getContext(),W=this.renderer.state.buffers.stencil;W.setFunc(Y.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,J),W.setFunc(Y.EQUAL,1,4294967295)}this.swapBuffers()}if(qZ!==void 0){if(U instanceof qZ)$=!0;else if(U instanceof fU)$=!1}}this.renderer.setRenderTarget(Q)}reset(J){if(J===void 0){let Q=this.renderer.getSize(new U0);this._pixelRatio=this.renderer.getPixelRatio(),this._width=Q.width,this._height=Q.height,J=this.renderTarget1.clone(),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=J,this.renderTarget2=J.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(J,Q){this._width=J,this._height=Q;let $=this._width*this._pixelRatio,Z=this._height*this._pixelRatio;this.renderTarget1.setSize($,Z),this.renderTarget2.setSize($,Z);for(let K=0;K<this.passes.length;K++)this.passes[K].setSize($,Z)}setPixelRatio(J){this._pixelRatio=J,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}var hQ={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class a8 extends f7{constructor(){super();this.isOutputPass=!0,this.uniforms=H8.clone(hQ.uniforms),this.material=new TQ({name:hQ.name,uniforms:this.uniforms,vertexShader:hQ.vertexShader,fragmentShader:hQ.fragmentShader}),this._fsQuad=new i8(this.material),this._outputColorSpace=null,this._toneMapping=null}render(J,Q,$){if(this.uniforms.tDiffuse.value=$.texture,this.uniforms.toneMappingExposure.value=J.toneMappingExposure,this._outputColorSpace!==J.outputColorSpace||this._toneMapping!==J.toneMapping){if(this._outputColorSpace=J.outputColorSpace,this._toneMapping=J.toneMapping,this.material.defines={},M9.getTransfer(this._outputColorSpace)===p9)this.material.defines.SRGB_TRANSFER="";if(this._toneMapping===NQ)this.material.defines.LINEAR_TONE_MAPPING="";else if(this._toneMapping===XQ)this.material.defines.REINHARD_TONE_MAPPING="";else if(this._toneMapping===DQ)this.material.defines.CINEON_TONE_MAPPING="";else if(this._toneMapping===g8)this.material.defines.ACES_FILMIC_TONE_MAPPING="";else if(this._toneMapping===FQ)this.material.defines.AGX_TONE_MAPPING="";else if(this._toneMapping===EQ)this.material.defines.NEUTRAL_TONE_MAPPING="";else if(this._toneMapping===qQ)this.material.defines.CUSTOM_TONE_MAPPING="";this.material.needsUpdate=!0}if(this.renderToScreen===!0)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget(Q),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class r8 extends f7{constructor(J,Q,$=null,Z=null,K=null){super();this.scene=J,this.camera=Q,this.overrideMaterial=$,this.clearColor=Z,this.clearAlpha=K,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new W0}render(J,Q,$){let Z=J.autoClear;J.autoClear=!1;let K,U;if(this.overrideMaterial!==null)U=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial;if(this.clearColor!==null)J.getClearColor(this._oldClearColor),J.setClearColor(this.clearColor,J.getClearAlpha());if(this.clearAlpha!==null)K=J.getClearAlpha(),J.setClearAlpha(this.clearAlpha);if(this.clearDepth==!0)J.clearDepth();if(J.setRenderTarget(this.renderToScreen?null:$),this.clear===!0)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(J.render(this.scene,this.camera),this.clearColor!==null)J.setClearColor(this._oldClearColor);if(this.clearAlpha!==null)J.setClearAlpha(K);if(this.overrideMaterial!==null)this.scene.overrideMaterial=U;J.autoClear=Z}}var nH={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new W0(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class G8 extends f7{constructor(J,Q=1,$,Z){super();this.strength=Q,this.radius=$,this.threshold=Z,this.resolution=J!==void 0?new U0(J.x,J.y):new U0(256,256),this.clearColor=new W0(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);this.renderTargetBright=new W7(K,U,{type:F7,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let G=0;G<this.nMips;G++){let X=new W7(K,U,{type:F7,depthBuffer:!1});X.texture.name="UnrealBloomPass.h"+G,X.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(X);let F=new W7(K,U,{type:F7,depthBuffer:!1});F.texture.name="UnrealBloomPass.v"+G,F.texture.generateMipmaps=!1,this.renderTargetsVertical.push(F),K=Math.round(K/2),U=Math.round(U/2)}let Y=nH;this.highPassUniforms=H8.clone(Y.uniforms),this.highPassUniforms.luminosityThreshold.value=Z,this.highPassUniforms.smoothWidth.value=0.01,this.materialHighPassFilter=new v9({uniforms:this.highPassUniforms,vertexShader:Y.vertexShader,fragmentShader:Y.fragmentShader}),this.separableBlurMaterials=[];let W=[6,10,14,18,22];K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);for(let G=0;G<this.nMips;G++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(W[G])),this.separableBlurMaterials[G].uniforms.invSize.value=new U0(1/K,1/U),K=Math.round(K/2),U=Math.round(U/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=Q,this.compositeMaterial.uniforms.bloomRadius.value=0.1;let H=[1,0.8,0.6,0.4,0.2];this.compositeMaterial.uniforms.bloomFactors.value=H,this.bloomTintColors=[new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1),new S(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=H8.clone(b6.uniforms),this.blendMaterial=new v9({uniforms:this.copyUniforms,vertexShader:b6.vertexShader,fragmentShader:b6.fragmentShader,premultipliedAlpha:!0,blending:Z7,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new W0,this._oldClearAlpha=1,this._basic=new m0,this._fsQuad=new i8(null)}dispose(){for(let J=0;J<this.renderTargetsHorizontal.length;J++)this.renderTargetsHorizontal[J].dispose();for(let J=0;J<this.renderTargetsVertical.length;J++)this.renderTargetsVertical[J].dispose();this.renderTargetBright.dispose();for(let J=0;J<this.separableBlurMaterials.length;J++)this.separableBlurMaterials[J].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(J,Q){let $=Math.round(J/2),Z=Math.round(Q/2);this.renderTargetBright.setSize($,Z);for(let K=0;K<this.nMips;K++)this.renderTargetsHorizontal[K].setSize($,Z),this.renderTargetsVertical[K].setSize($,Z),this.separableBlurMaterials[K].uniforms.invSize.value=new U0(1/$,1/Z),$=Math.round($/2),Z=Math.round(Z/2)}render(J,Q,$,Z,K){J.getClearColor(this._oldClearColor),this._oldClearAlpha=J.getClearAlpha();let U=J.autoClear;if(J.autoClear=!1,J.setClearColor(this.clearColor,0),K)J.state.buffers.stencil.setTest(!1);if(this.renderToScreen)this._fsQuad.material=this._basic,this._basic.map=$.texture,J.setRenderTarget(null),J.clear(),this._fsQuad.render(J);this.highPassUniforms.tDiffuse.value=$.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,J.setRenderTarget(this.renderTargetBright),J.clear(),this._fsQuad.render(J);let Y=this.renderTargetBright;for(let W=0;W<this.nMips;W++)this._fsQuad.material=this.separableBlurMaterials[W],this.separableBlurMaterials[W].uniforms.colorTexture.value=Y.texture,this.separableBlurMaterials[W].uniforms.direction.value=G8.BlurDirectionX,J.setRenderTarget(this.renderTargetsHorizontal[W]),J.clear(),this._fsQuad.render(J),this.separableBlurMaterials[W].uniforms.colorTexture.value=this.renderTargetsHorizontal[W].texture,this.separableBlurMaterials[W].uniforms.direction.value=G8.BlurDirectionY,J.setRenderTarget(this.renderTargetsVertical[W]),J.clear(),this._fsQuad.render(J),Y=this.renderTargetsVertical[W];if(this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,J.setRenderTarget(this.renderTargetsHorizontal[0]),J.clear(),this._fsQuad.render(J),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,K)J.state.buffers.stencil.setTest(!0);if(this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget($),this._fsQuad.render(J);J.setClearColor(this._oldClearColor,this._oldClearAlpha),J.autoClear=U}_getSeparableBlurMaterial(J){let Q=[],$=J/3;for(let U=0;U<J;U++)Q.push(0.39894*Math.exp(-0.5*U*U/($*$))/$);let Z=[],K=[];for(let U=1;U<J;U+=2){let Y=Q[U],W=U+1<J?Q[U+1]:0,H=Y+W;Z.push((U*Y+(U+1)*W)/H),K.push(H)}return new v9({defines:{KERNEL_PAIRS:Z.length},uniforms:{colorTexture:{value:null},invSize:{value:new U0(0.5,0.5)},direction:{value:new U0(0.5,0.5)},centerWeight:{value:Q[0]},gaussianOffsets:{value:Z},gaussianWeights:{value:K}},vertexShader:`

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

				}`})}_getCompositeMaterial(J){return new v9({defines:{NUM_MIPS:J},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}G8.BlurDirectionX=new U0(1,0);G8.BlurDirectionY=new U0(0,1);var bF="varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",hF=`
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
}`;class bU{composer;look={focus:0,aperture:0.0025,bloom:0.35,exposure:1,warmth:0,saturation:1,contrast:1,shadows:new W0(0.5,0.5,0.5),highlights:new W0(0.5,0.5,0.5),vignette:0.45,grain:0.06,aberration:0.4,halation:0.4,letterbox:1,fade:0,leak:0};bokeh;bloomPass;grade;constructor(J,Q,$,Z=new U0(1920,1080)){this.composer=new o8(J),this.composer.addPass(new r8(Q,$)),this.bokeh=new yU(Q,$,{focus:10,aperture:this.look.aperture,maxblur:0.008}),this.composer.addPass(this.bokeh),this.bloomPass=new G8(Z,this.look.bloom,0.6,0.78),this.composer.addPass(this.bloomPass),this.composer.addPass(new a8),this.grade=new dJ({uniforms:{tDiffuse:{value:null},time:{value:0},aspect:{value:Z.x/Z.y},exposure:{value:1},warmth:{value:0},saturation:{value:1},contrast:{value:1},shadows:{value:new W0},highlights:{value:new W0},vignette:{value:0},grain:{value:0},aberration:{value:0},halation:{value:0},letterbox:{value:0},fade:{value:0},leak:{value:0}},vertexShader:bF,fragmentShader:hF}),this.composer.addPass(this.grade)}render(J){let Q=this.look,$=this.grade.uniforms;this.bokeh.enabled=Q.focus>0;let Z=this.bokeh.uniforms;Z.focus.value=Q.focus,Z.aperture.value=Q.aperture,this.bloomPass.strength=Q.bloom,$.time.value=J;for(let K of["exposure","warmth","saturation","contrast","vignette","grain","aberration","halation","letterbox","fade","leak"])$[K].value=Q[K];$.shadows.value.copy(Q.shadows),$.highlights.value.copy(Q.highlights),this.composer.render()}}class xQ{group=new R0;parts=[];width=0;constructor(J,Q={}){let $=Q.height??1,Z=Q.gap??0.05,K=Q.font??'400 200px "Monoton", "Limelight", sans-serif',U=0;for(let Y of J){let W=document.createElement("canvas").getContext("2d");W.font=K;let H=Math.ceil(W.measureText(Y).width+80),G=280,X=Object.assign(document.createElement("canvas"),{width:H,height:G}),F=X.getContext("2d");F.font=K,F.textBaseline="middle",F.shadowColor=Q.color??"#ff3b6b";for(let[M,D,E]of[[40,0.9,Q.color??"#ff3b6b"],[14,1,Q.color??"#ff3b6b"],[0,1,"#fff6f0"]])F.shadowBlur=M,F.globalAlpha=D,F.fillStyle=E,F.fillText(Y,40,G/2);let N=new _7(X);N.colorSpace=A7;let q=$*H/G,O=new d(new E9(q,$),new m0({map:N,transparent:!0,depthWrite:!1,toneMapped:!1,color:16777215}));O.position.x=U+q/2,this.group.add(O),this.parts.push({mesh:O,width:q}),U+=q+Z}this.width=U-Z;for(let Y of this.parts)Y.mesh.position.x-=this.width/2}set(J,Q){let $=this.parts[J]?.mesh;if(!$)return;let Z=Math.max(0,Q);$.material.color.setScalar(0.1+Z*1.05),$.material.opacity=0.35+Math.min(1,Z)*0.65}}function FZ(J,Q=0,$=0.5){return Math.sin(J*37+Q*13.1)*Math.sin(J*13.7+Q*3.3)*Math.sin(J*5.1+Q)>1-$*0.9?0.15:1}var xF=(J)=>J*J*(3-2*J),sH=new S,iH=new S;function a9(J,Q,$,Z,K=!0){let U=K?xF(Math.min(1,Math.max(0,Z))):Z;J.position.copy(sH.fromArray(Q.pos).lerp(iH.fromArray($.pos),U));let Y=sH.fromArray(Q.look).lerp(iH.fromArray($.look),U);J.up.set(0,1,0),J.lookAt(Y),J.rotateZ(((Q.roll??0)+(($.roll??Q.roll??0)-(Q.roll??0))*U)*Math.PI/180);let W=(Q.fov??40)+(($.fov??Q.fov??40)-(Q.fov??40))*U;if(J.fov!==W)J.fov=W,J.updateProjectionMatrix()}var gQ=(J,Q)=>Math.sin(J*0.73+Q)*0.5+Math.sin(J*1.37+Q*2.1)*0.3+Math.sin(J*2.9+Q*3.7)*0.2;function oH(J,Q,$=0.5){let Z=$*0.004;J.rotateX(gQ(Q,1)*Z),J.rotateY(gQ(Q,5)*Z*1.3),J.rotateZ(gQ(Q,9)*Z*0.6)}class hU{width;height;canvas;texture;key="";constructor(J=1280,Q=800){this.width=J;this.height=Q;this.canvas=Object.assign(document.createElement("canvas"),{width:J,height:Q}),this.texture=new _7(this.canvas),this.texture.colorSpace=A7,this.texture.anisotropy=8}show(J,Q={}){let $=JSON.stringify([J,Q]);if($===this.key)return;this.key=$;let Z=this.canvas.getContext("2d"),K=this.width,U=this.height;Z.fillStyle=Q.bg??"#0d1117",Z.fillRect(0,0,K,U),Z.fillStyle="#1b2230",Z.fillRect(0,0,K,54);for(let[W,H]of["#ff5f57","#febc2e","#28c840"].entries())Z.fillStyle=H,Z.beginPath(),Z.arc(30+W*30,27,9,0,Math.PI*2),Z.fill();Z.fillStyle="#8b96a8",Z.font='600 24px "JetBrains Mono", monospace',Z.textAlign="center",Z.fillText(Q.title??"terminal",K/2,35),Z.textAlign="left";let Y=104;for(let W of J){let H=typeof W==="string"?{text:W}:W,G=H.size??34;Z.font=`${H.bold?700:500} ${G}px ${Q.font??'"JetBrains Mono", monospace'}`,Z.fillStyle=H.color??Q.fg??"#d6deeb",Z.fillText(H.text,40,Y),Y+=G*1.45}if(Q.cursor)Z.fillStyle=Q.fg??"#d6deeb",Z.fillRect(40,Y-30,18,36);if(Q.banner)Z.fillStyle=Q.banner.color,Z.fillRect(0,U/2-90,K,180),Z.fillStyle="#fff",Z.font='800 64px "Inter", sans-serif',Z.textAlign="center",Z.fillText(Q.banner.text,K/2,U/2+22),Z.textAlign="left";Z.fillStyle="rgba(0,0,0,.12)";for(let W=0;W<U;W+=4)Z.fillRect(0,W,K,1);this.texture.needsUpdate=!0}}var h6=(J,Q)=>J.slice(0,Math.max(0,Math.floor(J.length*Math.min(1,Q))));var y9=(J,Q,$,Z)=>({name:J,at:Q,label:$,section:Z});function RZ(){return[y9("title",0,"a cabin, a loop, a quota","intro"),y9("desk",T(0)-0.8,"go to bed, they said","intro"),y9("pillow",T(1)-0.6,"I nailed the first half","intro"),y9("loop",T(2)-0.4,"fed the loop a spec","verse 1"),y9("state",T(3)-0.3,"max iterations ten","verse 1"),y9("ralph",T(4)-0.3,"Ralph took the wheel","verse 1"),y9("dream",T(5)-0.4,"dreamed of green checkmarks","verse 1"),y9("dawn",T(6)-0.4,"woke at six","verse 1"),y9("tenof",T(7)-0.3,"ten of ten","verse 1"),y9("leave",T(8)-0.4,"she left before dawn","chorus"),y9("rename",T(9)-0.2,"renamed the state file","chorus"),y9("neon",T(10)-0.6,"ralph-loop.local.md-NEVER_AGAIN","chorus"),y9("baggage",T(12)-0.3,"last round's baggage","verse 2"),y9("reread",T(13)-0.1,"reread the whole thread","verse 2"),y9("context",T(14)-0.1,"context at forty percent","verse 2"),y9("approach",T(15)-0.1,"new approach, new approach","verse 2"),y9("summary",T(16)-0.1,"great progress! almost done!","verse 2"),y9("app",T(17)-0.1,"a button: coming soon","verse 2"),y9("commit",T(18)-0.1,"burned all my tokens","verse 2"),y9("leave2",T(20)-0.2,"she left before dawn","chorus"),y9("rename2",T(21)-0.2,"renamed the state file","chorus"),y9("neon2",T(22)-0.6,"dash NEVER, underscore, AGAIN","chorus"),y9("limit",T(24)-0.5,"usage limit reached","bridge"),y9("goodbye",T(25)-0.4,"no letter. a timestamp.","bridge"),y9("renews",T(26)-0.5,"she renews","bridge"),y9("return",T(28)-0.6,"back at nine A-M","last chorus"),y9("whiskey",T(29)-0.3,"poured a whiskey","last chorus"),y9("maybe",T(30)-0.6,"dash MAYBE, underscore, AGAIN","last chorus"),y9("twenty",T(32)-0.4,"max iterations... twenty","outro"),y9("helping",T(33)-1.4,"I'm helping!","outro"),y9("end",R9(33)+1.6,"the end","outro")]}var rH=null,OZ=(J)=>{let Q=rH??=RZ(),$=Q[0];for(let Z of Q)if(Z.at<=J)$=Z;return $},gF=(J)=>{let Q=rH??=RZ();return Q[Q.indexOf(J)+1]?.at??I7()};function pF(J){if(J<T(6)-0.5)return 0.02;if(J<T(8)-0.5)return j(0.25,0.32,G0(J,T(6),T(8)));if(J<T(20))return j(0.36,0.46,G0(J,T(8),T(20)));if(J<T(24))return j(0.48,0.56,G0(J,T(20),T(24)));if(J<T(28))return j(0.6,0.82,G0(J,T(24),T(28)));return j(0.86,1,G0(J,T(28),I7()))}var tH=(J)=>{if(J<T(5))return 23+G0(J,0,T(5))*0.6;if(J<T(6))return j(23.6,29.9,G0(J,T(5),T(6)));if(J<T(26))return j(30,32.5,G0(J,T(6),T(26)));if(J<H0(27,/renews/i))return j(32.5,33,G0(J,T(26),H0(27,/renews/i)));return 33+G0(J,H0(27,/renews/i),I7())*0.3},eH=(J)=>{let Q=tH(J),$=Math.floor(Q)%24,Z=Math.floor(Q%1*60);return`${($+11)%12+1}:${String(Z).padStart(2,"0")} ${$<12?"AM":"PM"}`},o0=(J,Q=0.8,$={})=>new X9({color:J,roughness:Q,metalness:0,...$});function t8(J,Q,$,Z){let K=Object.assign(document.createElement("canvas"),{width:J,height:Q});$(K.getContext("2d"));let U=new _7(K);if(U.colorSpace=A7,U.anisotropy=8,Z)U.wrapS=U.wrapT=EJ,U.repeat.set(...Z);return U}var EZ=(J,Q)=>t8(512,512,($)=>{for(let Z=0;Z<16;Z++){let K=K9(Z*3.1);$.fillStyle=`rgb(${J.map((U)=>Math.round(U*(0.8+K*0.35))).join(",")})`,$.fillRect(0,Z*32,512,31),$.fillStyle="rgba(0,0,0,.45)",$.fillRect(0,Z*32+31,512,1),$.fillStyle="rgba(0,0,0,.12)";for(let U=0;U<14;U++)$.fillRect(K9(Z*50+U)*512,Z*32+K9(U+Z)*30,30+K9(U*7+Z)*90,1);$.fillStyle="rgba(0,0,0,.3)",$.fillRect(K9(Z+99)*512,Z*32,2,31)}},Q),aH=t8(256,256,(J)=>{J.fillStyle="#8c1f1f",J.fillRect(0,0,256,256),J.fillStyle="rgba(20,10,10,.55)";for(let Q=0;Q<256;Q+=64)J.fillRect(Q,0,22,256),J.fillRect(0,Q,256,22);J.fillStyle="rgba(240,200,160,.25)";for(let Q=30;Q<256;Q+=64)J.fillRect(Q,0,4,256),J.fillRect(0,Q,256,4)},[2,2]),mF=t8(512,512,(J)=>{J.fillStyle="#b98b5e",J.fillRect(0,0,512,512);for(let Q=0;Q<9000;Q++)J.fillStyle=`rgba(${K9(Q)>0.5?"255,230,200":"60,35,20"},${0.05+K9(Q+5)*0.08})`,J.fillRect(K9(Q+1)*512,K9(Q+2)*512,2,2)},[80,80]),s9=(J=0,Q=0,$=0)=>new S(J,Q,$),uF=s9(0,1,0),dF=new u0(0.06,0.07,1,8).translate(0,0.5,0),lF={down:[[-0.3,0.92,0.08],[0.3,0.92,0.08]],type:[[-0.2,1.12,0.48],[0.2,1.12,0.48]],mug:[[-0.3,0.95,0.1],[0.14,1.42,0.3]],pour:[[-0.12,1.25,0.45],[0.18,1.3,0.45]],hips:[[-0.34,1.05,0],[0.34,1.05,0]],face:[[-0.1,1.55,0.2],[0.1,1.55,0.2]],up:[[-0.3,1.9,0.1],[0.3,1.9,0.1]],sleep:[[-0.25,1.2,0.18],[0.25,0.95,0.12]]};function cF(){let J=new R0,Q=14264450,$=new d(new u0(0.24,0.21,0.66,16),o0(16777215,0.9,{map:aH}));$.position.y=1.2;let Z=new R0;Z.position.y=1.72,Z.add(new d(new $9(0.17,20,16),o0(14264450,0.7)));let K=o0(7031342,0.85),U=new d(new u0(0.34,0.34,0.025,28),K);U.position.y=0.1,U.scale.set(1,1,0.85);let Y=new d(new u0(0.15,0.18,0.2,20),K);Y.position.y=0.21;let W=new d(new u0(0.182,0.182,0.04,20),o0(2759184));W.position.y=0.14,Z.add(U,Y,W);let H=new d(new $9(0.168,16,10,0,Math.PI*2,Math.PI*0.55,Math.PI*0.4),o0(4863014,0.95));Z.add(H);let G=new R0;G.position.y=0.88;for(let O of[-1,1]){let M=new d(new u0(0.1,0.09,0.86,10).translate(0,-0.43,0),o0(2898522,0.9));M.position.x=O*0.11;let D=new d(new P0(0.13,0.12,0.3),o0(3810324,0.6));D.position.set(0,-0.84,0.06),M.add(D),G.add(M)}let X=new d(new u0(0.22,0.22,0.08,16),o0(2759184));X.position.y=0.9;let F=new d(new P0(0.1,0.07,0.02),new X9({color:14200928,metalness:0.9,roughness:0.3}));F.position.set(0,0.9,0.22);let N=[0,1].map(()=>new d(new $9(0.06,10,8),o0(14264450,0.7))),q=[0,1].map(()=>new d(dF,o0(16777215,0.9,{map:aH})));return J.add($,Z,G,X,F,...N,...q),J.traverse((O)=>{if(O.isMesh)O.castShadow=!0,O.receiveShadow=!0}),Object.assign(J.userData,{head:Z,hands:N,arms:q,torso:$,legs:G}),J}function nF(J,Q,$={}){let{hands:Z,arms:K,legs:U,head:Y}=J.userData,W=$.t??0;U.children.forEach((H)=>H.rotation.x=$.sit?-1.45:0),Y.rotation.x=$.tilt??0,lF[Q].forEach(([H,G,X],F)=>{let N=Z[F],q=($.shake??0)*0.012;N.position.set(H+Math.sin(W*41+F*2)*q,G+Math.sin(W*53+F)*q,X);let O=s9(F?0.26:-0.26,1.46,0.02),M=N.position.clone().sub(O);K[F].position.copy(O),K[F].quaternion.setFromUnitVectors(uF,M.clone().normalize()),K[F].scale.set(1,M.length(),1)})}function sF(){let J=new R0,Q=o0(15921126,0.35),$=new d(new Y8(0.17,0.16,8,16),Q);$.position.y=0.26;let Z=new R0;Z.position.y=0.62,Z.add(new d(new $9(0.2,24,18),Q));let K=new m0({color:7336191,toneMapped:!1});for(let G of[-1,1]){let X=new d(new $9(0.045,12,10),K);X.position.set(G*0.075,0.02,0.18),Z.add(X)}let U=new d(new $9(0.205,20,10,0,Math.PI*2,0,Math.PI/2.4),o0(14172207,0.7));U.position.y=0.01;let Y=new d(new L7(0.17,0.012,6,24),o0(15777840,0.6));Y.rotation.x=Math.PI/2,Y.position.y=0.1;let W=new R0;W.position.y=0.23;for(let G=0;G<3;G++){let X=new d(new P0(0.2,0.008,0.04).translate(0.1,0,0),o0([3832789,15777840,3846250][G],0.5));X.rotation.y=G*Math.PI*2/3,W.add(X)}Z.add(U,Y,W);let H=[-1,1].map((G)=>{let X=new d(new Y8(0.035,0.16,4,8).translate(0,-0.1,0),Q);return X.position.set(G*0.19,0.36,0),X});return J.add($,Z,...H),J.traverse((G)=>{if(G.isMesh)G.castShadow=!0}),J.userData={head:Z,prop:W,arms:H,eyeMat:K},J}class pQ{renderer;scene=new V8;camera=new e9(38,1.7777777777777777,0.05,1200);film;sky=new jU(600);sun=new I8(16777215,1);hemi=new B8(10467071,3811868,0.4);moon;room=new R0;lamp=new c8(16757611,0,9,1.6);lampBulb;screen=new hU(1280,800);screenLight=new c8(10275071,0,2.5,1.5);screenMesh;laptop=new R0;jar=new R0;coins;clockHands=[];notes;sack=new R0;bottle=new R0;glassFill;mug=new R0;steam;checks=new R0;windowShaft;dust;me=cF();ralph=sF();chair=new R0;outside=new R0;cabinWindow;porch=new c8(16757611,0,14,1.5);truck=new R0;taillights=[];headlights=new j6(16773328,0,60,0.4,0.5,1);roadCoins;bedCoins;sign;maybe;signGroup=new R0;signGlow=new c8(16726891,0,18,1.4);constructor(J){this.renderer=new n8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=_6,this.renderer.toneMapping=g8,this.film=new bU(this.renderer,this.scene,this.camera),this.scene.fog=new yJ(658456,0.004),this.scene.add(this.sky.mesh,this.sky.stars,this.hemi,this.sun,this.sun.target),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-0.0004,this.sun.shadow.normalBias=0.02,this.moon=new d(new $9(9,32,24),new m0({color:15920860,toneMapped:!1,fog:!1})),this.moon.position.set(-160,120,-380),this.scene.add(this.moon),this.buildRoom(),this.buildOutside(),this.dust=new vU(new $8(s9(-3.6,0.2,-2.8),s9(1,3,2)),700),this.room.add(this.dust.points),this.sign=new xQ(["ralph-loop",".local",".md","-NEVER","_AGAIN"],{color:"#ff4d7d",height:1.25,gap:0.02}),this.maybe=new xQ(["-MAYBE"],{color:"#ffc24d",height:1.25}),this.buildSign(),this.scene.add(this.room,this.outside)}static ROOM=s9(300,0,0);buildRoom(){let J=this.room;J.position.copy(pQ.ROOM);let Q=new d(new E9(10,8),o0(16777215,0.75,{map:EZ([120,80,50],[3,3])}));Q.rotation.x=-Math.PI/2,Q.receiveShadow=!0;let $=o0(16777215,0.9,{map:EZ([150,110,75],[2,1.2])}),Z=(s,h0,r,X0,O0,V0=0)=>{let L0=new d(new P0(s,h0,0.12),$);L0.position.set(r,X0,O0),L0.rotation.y=V0,L0.castShadow=L0.receiveShadow=!0,J.add(L0)};Z(10,3.4,0,1.7,-3.2),Z(8,3.4,4.6,1.7,0,Math.PI/2),Z(8,1,-4.6,0.5,0,Math.PI/2),Z(8,1,-4.6,2.9,0,Math.PI/2),Z(2.6,1.4,-4.6,1.7,-2.2,Math.PI/2),Z(3.4,1.4,-4.6,1.7,2.3,Math.PI/2);let K=o0(3810838,0.8);for(let[s,h0,r,X0]of[[0.08,1.4,1.7,-1.4],[0.08,1.4,1.7,0.6],[0.06,1.4,1.7,-0.4],[2,0.06,1.7,-0.4],[2.1,0.1,1,-0.4],[2.1,0.1,2.4,-0.4]]){let O0=new d(new P0(0.14,h0,s),K);O0.position.set(-4.6,r,X0),O0.castShadow=!0,J.add(O0)}let U=new d(new P0(10,0.12,8),o0(5914672,0.9));U.position.y=3.46,U.castShadow=!0,J.add(Q,U);let Y=new d(new E7(1.4,40),o0(16777215,1,{map:t8(256,256,(s)=>{for(let h0=0;h0<9;h0++)s.fillStyle=["#7a2a20","#c8902f","#2a4a5a"][h0%3],s.beginPath(),s.arc(128,128,128-h0*14,0,Math.PI*2),s.fill()})}));Y.rotation.x=-Math.PI/2,Y.position.set(0.2,0.005,0.2),Y.receiveShadow=!0,J.add(Y);let W=o0(5913122,0.6),H=new R0;H.position.set(1.6,0,-2.5);let G=new d(new P0(2.4,0.08,1),W);G.position.y=0.92,H.add(G);for(let[s,h0]of[[-1.1,-0.42],[1.1,-0.42],[-1.1,0.42],[1.1,0.42]]){let r=new d(new P0(0.08,0.9,0.08),W);r.position.set(s,0.45,h0),H.add(r)}H.traverse((s)=>{s.castShadow=!0,s.receiveShadow=!0}),J.add(H);let X=this.laptop;X.position.set(1.5,0.96,-2.5);let F=new d(new P0(0.72,0.03,0.5),o0(2763827,0.35,{metalness:0.6})),N=new R0;N.position.set(0,0.015,-0.24),N.rotation.x=-0.18;let q=new d(new P0(0.72,0.47,0.02).translate(0,0.235,0),o0(2763827,0.35,{metalness:0.6}));this.screenMesh=new d(new E9(0.67,0.42),new m0({map:this.screen.texture,toneMapped:!1})),this.screenMesh.position.set(0,0.235,0.011),N.add(q,this.screenMesh),this.screenLight.position.set(0,0.235,0.3),N.add(this.screenLight),X.add(F,N),X.userData.lid=N,J.add(X);let O=new R0;O.position.set(2.5,0.96,-2.7);let M=new d(new K7(0.2,0.22,24,1,!0),o0(3103290,0.5,{side:o9}));M.position.y=0.52;let D=new d(new u0(0.015,0.015,0.5),o0(11569744,0.3,{metalness:0.8}));D.position.y=0.25;let E=new d(new u0(0.1,0.12,0.03,20),o0(11569744,0.3,{metalness:0.8}));this.lampBulb=new d(new $9(0.05,12,10),new m0({color:16767392,toneMapped:!1})),this.lampBulb.position.y=0.46,this.lamp.position.set(0,0.42,0),this.lamp.castShadow=!0,this.lamp.shadow.mapSize.set(1024,1024),this.lamp.shadow.bias=-0.002,O.add(M,D,E,this.lampBulb,this.lamp),J.add(O),this.jar.position.set(0.55,0.96,-2.55);let I=new d(new u0(0.17,0.17,0.42,32,1,!0),new l8({color:14544639,roughness:0.05,transmission:0.9,transparent:!0,opacity:0.35,side:o9}));I.position.y=0.21;let L=new d(new u0(0.18,0.18,0.04,32),o0(9071162,0.4,{metalness:0.7}));L.position.y=0.44;let R=new d(new E9(0.2,0.08),o0(16777215,0.9,{map:t8(256,100,(s)=>{s.fillStyle="#f0e2c0",s.fillRect(0,0,256,100),s.fillStyle="#3a2410",s.font='700 46px "Rye", serif',s.textAlign="center",s.fillText("TOKENS",128,66)})}));R.position.set(0,0.2,0.172);let B=new u0(0.035,0.035,0.01,16),_=new X9({color:15120458,metalness:0.9,roughness:0.28,emissive:3810304});this.coins=new T9(B,_,160);let z=new A9;for(let s=0;s<160;s++){let h0=K9(s)*Math.PI*2,r=Math.sqrt(K9(s+7))*0.13;z.position.set(Math.cos(h0)*r,0.01+Math.floor(s/10)*0.024+K9(s+3)*0.01,Math.sin(h0)*r),z.rotation.set((K9(s+1)-0.5)*0.8,K9(s+2)*3,(K9(s+4)-0.5)*0.8),z.updateMatrix(),this.coins.setMatrixAt(s,z.matrix)}this.jar.add(I,L,R,this.coins),J.add(this.jar),this.mug.position.set(0.95,0.96,-2.2);let V=new d(new u0(0.06,0.055,0.12,20),o0(15262420,0.4));V.position.y=0.06;let C=new d(new E7(0.055,20),o0(1707784,0.2));C.rotation.x=-Math.PI/2,C.position.y=0.11;let f=new d(new L7(0.035,0.01,8,16,Math.PI),o0(15262420,0.4));f.position.set(0.065,0.06,0),f.rotation.z=-Math.PI/2;let k=new Float32Array(180),b=new F9;b.setAttribute("position",new Q7(k,3)),this.steam=new U8(b,new c7({color:16777215,size:0.03,transparent:!0,opacity:0.25,depthWrite:!1})),this.mug.add(V,C,f,this.steam),J.add(this.mug),this.bottle.position.set(0,0.96,-2.35);let e=new l8({color:10115616,roughness:0.1,transmission:0.6,transparent:!0,opacity:0.8}),v=new d(new u0(0.07,0.07,0.26,20),e);v.position.y=0.13;let u=new d(new u0(0.02,0.04,0.12,16),e);u.position.y=0.32;let Q0=new d(new u0(0.071,0.071,0.1,20,1,!0),o0(15786688,0.8));Q0.position.y=0.12,this.bottle.add(v,u,Q0);let l=new d(new u0(0.045,0.04,0.09,20,1,!0),new l8({color:16777215,roughness:0.05,transmission:0.95,transparent:!0,opacity:0.3,side:o9}));l.position.set(0.22,1.005,-2.25),this.glassFill=new d(new u0(0.038,0.036,1,20).translate(0,0.5,0),new l8({color:13138472,roughness:0.1,transmission:0.4,transparent:!0,opacity:0.85})),this.glassFill.position.set(0.22,0.965,-2.25),J.add(this.bottle,l,this.glassFill);let D0=new d(new P0(0.5,0.06,0.5),W);D0.position.y=0.5;let t=new d(new P0(0.5,0.6,0.05),W);t.position.set(0,0.82,0.24),this.chair.add(D0,t);for(let[s,h0]of[[-0.22,-0.22],[0.22,-0.22],[-0.22,0.22],[0.22,0.22]]){let r=new d(new P0(0.05,0.5,0.05),W);r.position.set(s,0.25,h0),this.chair.add(r)}this.chair.position.set(1.5,0,-1.7),this.chair.traverse((s)=>{s.castShadow=!0}),J.add(this.chair);let p=new R0;p.position.set(-2.8,0,-1.9);let J0=new d(new P0(1.4,0.4,2.2),o0(4861984,0.7));J0.position.y=0.2;let M0=new d(new P0(1.3,0.2,2.1),o0(15261904,0.9));M0.position.y=0.5;let A0=new d(new P0(1.36,0.1,1.5),o0(16777215,0.95,{map:t8(256,256,(s)=>{for(let h0=0;h0<8;h0++)for(let r=0;r<8;r++)s.fillStyle=["#7a3a2a","#c89a5a","#3a5a6a","#e8dcc0"][(r*3+h0*5)%4],s.fillRect(r*32,h0*32,32,32)})}));A0.position.set(0,0.63,0.3);let _0=new d(new P0(0.8,0.14,0.4),o0(16052456,0.95));_0.position.set(0,0.68,-0.8);let E0=new d(new P0(1.4,1,0.08),o0(4861984,0.7));E0.position.set(0,0.7,-1.08),p.add(J0,M0,A0,_0,E0),p.traverse((s)=>{s.castShadow=!0,s.receiveShadow=!0}),J.add(p);let i=new R0;i.position.set(-1,2.45,-3.12),i.add(new d(new E7(0.32,40),o0(16777215,0.6,{map:t8(256,256,(s)=>{s.fillStyle="#f2ead6",s.beginPath(),s.arc(128,128,126,0,Math.PI*2),s.fill(),s.strokeStyle="#5a3a1a",s.lineWidth=10,s.stroke(),s.fillStyle="#2a1a10",s.font='700 30px "Rye", serif',s.textAlign="center",s.textBaseline="middle";for(let h0=1;h0<=12;h0++){let r=h0/12*Math.PI*2;s.fillText(String(h0),128+Math.sin(r)*96,128-Math.cos(r)*96)}})})));for(let[s,h0]of[[0.18,0.025],[0.27,0.015]]){let r=new d(new P0(h0,s,0.01).translate(0,s/2,0.01),o0(1707784));this.clockHands.push(r),i.add(r)}J.add(i),this.notes=new T9(new E9(0.18,0.18),o0(16777215,0.9,{map:t8(128,128,(s)=>{s.fillStyle="#ffe066",s.fillRect(0,0,128,128),s.fillStyle="#3a2a10",s.font='700 22px "Caveat", cursive',s.fillText("new",14,52),s.fillText("approach",14,84)})}),40),J.add(this.notes);let N0=new d(new $9(0.3,20,16),o0(10123850,0.95,{map:t8(256,256,(s)=>{s.fillStyle="#a8865a",s.fillRect(0,0,256,256),s.fillStyle="#3a2a10",s.font='700 40px "JetBrains Mono", monospace',s.textAlign="center",s.fillText("CONTEXT",128,140)})}));N0.scale.set(1,0.85,1),N0.position.y=0.26;let K0=new d(new K7(0.08,0.16,12),o0(10123850,0.95));K0.position.y=0.55,this.sack.add(N0,K0),this.sack.traverse((s)=>{s.castShadow=!0}),J.add(this.sack);let m=new n7;m.moveTo(-0.5,0),m.lineTo(-0.15,-0.38),m.lineTo(0.55,0.42),m.lineTo(0.42,0.52),m.lineTo(-0.15,-0.12),m.lineTo(-0.38,0.12);let C0=new PQ(m);for(let s=0;s<14;s++){let h0=new d(C0,new m0({color:4120698,transparent:!0,toneMapped:!1,side:o9}));h0.scale.setScalar(0.18+K9(s)*0.12),this.checks.add(h0)}J.add(this.checks),this.windowShaft=lH(12374783,0.9,1.3,5.5),this.windowShaft.position.set(-4.7,2.5,-0.4),this.windowShaft.rotation.set(0,0,1.05),J.add(this.windowShaft),this.me.position.set(1.5,0,-1.65),J.add(this.me,this.ralph)}buildOutside(){let J=this.outside,Q=new E9(1600,1600,160,160),$=Q.attributes.position;for(let p=0;p<$.count;p++){let J0=$.getX(p),M0=$.getY(p),A0=Math.hypot(J0,M0),_0=(Math.sin(J0*0.02)*Math.cos(M0*0.017)*2.4+Math.sin(J0*0.007+1)*4)*P9(40,160,A0);$.setZ(p,_0*(Math.abs(-M0-12)<8?P9(4,8,Math.abs(-M0-12)):1))}Q.computeVertexNormals();let Z=new d(Q,o0(16777215,1,{map:mF}));Z.rotation.x=-Math.PI/2,Z.receiveShadow=!0,J.add(Z);for(let p=0;p<9;p++){let J0=-0.6+p*0.32+K9(p)*0.1,M0=380+K9(p+4)*120,A0=40+K9(p+8)*60,_0=30+K9(p+2)*45,E0=new d(new u0(A0*0.7,A0,_0,7),o0(8014386,1));E0.position.set(Math.sin(J0)*M0,_0/2-4,-Math.cos(J0)*M0),J.add(E0)}let K=new d(new E9(1600,7),o0(2763310,0.85));K.rotation.x=-Math.PI/2,K.position.set(0,0.03,12),K.receiveShadow=!0,J.add(K);let U=new T9(new E9(3,0.18),o0(15253568,0.6),200),Y=new A9;for(let p=0;p<200;p++)Y.position.set(-800+p*8,0.04,12),Y.rotation.x=-Math.PI/2,Y.updateMatrix(),U.setMatrixAt(p,Y.matrix);J.add(U);let W=o0(4863526,0.9);for(let p=0;p<30;p++){let J0=new R0,M0=new d(new u0(0.12,0.15,8),W);M0.position.y=4;let A0=new d(new P0(2.2,0.12,0.12),W);A0.position.y=7.4,J0.add(M0,A0),J0.position.set(-200+p*20,0,17.5),J0.traverse((_0)=>{_0.castShadow=!0}),J.add(J0)}let H=o0(3824178,0.8);for(let p=0;p<26;p++){let J0=new R0,M0=2.5+K9(p)*3,A0=new d(new Y8(0.28,M0,6,12),H);A0.position.y=M0/2,J0.add(A0);for(let i of[-1,1])if(K9(p+i*10)>0.3){let N0=0.9+K9(p+i)*1.2,K0=new d(new Y8(0.2,0.6,6,10),H);K0.rotation.z=Math.PI/2,K0.position.set(i*0.5,M0*0.45,0);let m=new d(new Y8(0.2,N0,6,10),H);m.position.set(i*0.85,M0*0.45+N0/2,0),J0.add(K0,m)}let _0=K9(p+30)*Math.PI*2,E0=18+K9(p+40)*90;if(J0.position.set(Math.cos(_0)*E0,0,Math.sin(_0)*E0-10),Math.abs(J0.position.z-12)<6)J0.position.z-=14;J0.traverse((i)=>{i.castShadow=!0}),J.add(J0)}let G=new R0,X=o0(16777215,0.9,{map:EZ([130,90,60],[2,1])}),F=new d(new P0(7,3.4,5.5),X);F.position.y=1.7;let N=new n7([new U0(-4,0),new U0(4,0),new U0(0,2.2)]),q=new d(new _8(N,{depth:6.3,bevelEnabled:!1}),o0(4864560,0.9));q.position.set(0,3.4,-3.15);let O=new d(new P0(0.7,2.2,0.7),o0(8018506,0.95));O.position.set(2.2,4.6,-1),this.cabinWindow=new d(new E9(1.5,1.1),new X9({color:1709072,emissive:16757611,emissiveIntensity:1.6})),this.cabinWindow.position.set(-1.6,1.9,2.77);let M=new d(new P0(1.1,2.2,0.08),o0(3810838,0.8));M.position.set(1.4,1.1,2.77);let D=new d(new P0(7.4,0.12,2),o0(4864560,0.9));D.position.set(0,2.8,3.7),D.rotation.x=0.1;for(let p of[-3.4,3.4]){let J0=new d(new P0(0.14,2.8,0.14),o0(4861984,0.9));J0.position.set(p,1.4,4.6),G.add(J0)}let E=new d(new P0(7.4,0.2,2),o0(16777215,0.9,{map:EZ([110,75,50],[2,1])}));E.position.set(0,0.1,3.7),this.porch.position.set(0.4,2.5,3.6);let I=new d(new $9(0.08),new m0({color:16767392,toneMapped:!1}));I.position.copy(this.porch.position),G.add(F,q,O,this.cabinWindow,M,D,E,this.porch,I),G.traverse((p)=>{p.castShadow=!0,p.receiveShadow=!0}),J.add(G);let L=new l8({color:9313308,roughness:0.35,metalness:0.5,clearcoat:1,clearcoatRoughness:0.2}),R=new X9({color:14540253,metalness:1,roughness:0.15}),B=this.truck,_=new d(new P0(4.8,0.7,1.9),L);_.position.y=0.85;let z=new d(new P0(1.7,0.95,1.8),L);z.position.set(0.55,1.65,0);let V=new l8({color:2240576,roughness:0.05,metalness:0.2,transparent:!0,opacity:0.85}),C=new d(new E9(1.6,0.7),V);C.position.set(1.41,1.7,0),C.rotation.y=Math.PI/2,C.rotation.x=0;let f=new R0;for(let[p,J0,M0,A0,_0,E0]of[[2.4,0.5,0.08,-1.2,1.45,0.9],[2.4,0.5,0.08,-1.2,1.45,-0.9],[0.08,0.5,1.88,-2.38,1.45,0]]){let i=new d(new P0(p,J0,M0),L);i.position.set(A0,_0,E0),f.add(i)}let k=new d(new P0(0.08,0.5,1.6),R);k.position.set(2.42,0.95,0);let b=new d(new P0(0.16,0.18,2),R);b.position.set(2.5,0.55,0);let e=b.clone();e.position.x=-2.5;for(let p of[-0.65,0.65]){let J0=new d(new E7(0.13,20),new m0({color:16774360,toneMapped:!1}));J0.position.set(2.47,1,p),J0.rotation.y=Math.PI/2;let M0=new d(new P0(0.06,0.22,0.16),new m0({color:16719904,toneMapped:!1}));M0.position.set(-2.44,1.1,p*1.2),this.taillights.push(M0),B.add(J0,M0)}let v=new u0(0.42,0.42,0.3,24).rotateX(Math.PI/2),u=o0(1381653,0.9),Q0=[];for(let[p,J0]of[[1.6,0.95],[1.6,-0.95],[-1.5,0.95],[-1.5,-0.95]]){let M0=new d(v,u);M0.position.set(p,0.42,J0);let A0=new d(new u0(0.2,0.2,0.32,16).rotateX(Math.PI/2),R);M0.add(A0),Q0.push(M0)}this.headlights.position.set(2.5,1,0),this.headlights.target.position.set(20,0,0),B.add(_,z,C,f,k,b,e,...Q0,this.headlights,this.headlights.target),B.userData.wheels=Q0,B.traverse((p)=>{p.castShadow=!0});let l=new u0(0.11,0.11,0.025,16),D0=new X9({color:15120458,metalness:0.9,roughness:0.25,emissive:4861952});this.bedCoins=new T9(l,D0,220);let t=new A9;for(let p=0;p<220;p++)t.position.set(-2.3+K9(p)*2.2,1.25+K9(p+1)*0.35+Math.sin(K9(p+2)*3)*0.12,-0.8+K9(p+3)*1.6),t.rotation.set(K9(p+4)*2,K9(p+5)*3,K9(p+6)*2),t.updateMatrix(),this.bedCoins.setMatrixAt(p,t.matrix);B.add(this.bedCoins),this.roadCoins=new T9(l,D0,360),J.add(B,this.roadCoins)}buildSign(){let J=this.signGroup,Q=new d(new P0(this.sign.width+1.4,2.6,0.3),o0(1316380,0.6));Q.position.z=-0.2;let $=new d(new P0(this.sign.width+1.6,2.8,0.2),new X9({color:11569744,metalness:0.8,roughness:0.35}));$.position.z=-0.3;let Z=o0(3816000,0.5,{metalness:0.6});for(let U of[-this.sign.width/3,this.sign.width/3]){let Y=new d(new u0(0.16,0.2,7),Z);Y.position.set(U,-4.6,-0.3),J.add(Y)}let K=new xQ(["STATE FILE"],{color:"#7ad8ff",height:0.55,font:'400 160px "Rye", serif'});K.group.position.set(0,1.75,0.02),K.set(0,1),this.sign.group.position.set(0,0,0),this.maybe.group.position.copy(this.sign.parts[3].mesh.position).setY(0),this.maybe.group.position.x+=(this.maybe.width-this.sign.parts[3].width)/2,this.maybe.group.position.y=0,this.maybe.group.position.z=0.03,J.add($,Q,this.sign.group,this.maybe.group,K.group,this.signGlow),this.signGlow.position.set(0,0,2),J.position.set(-14,8.1,20.5),J.rotation.y=0.12,J.traverse((U)=>{if(U.isMesh&&!U.material.transparent)U.castShadow=!0}),this.outside.add(J)}flash(J){let Q=OZ(J);return Q.name==="leave"||Q.name==="neon2"||Q.name==="return"?Math.exp(-(J-Q.at)*7)*0.18:0}fade(J){return P9(I7()-2.5,I7()-0.2,J)}truckAt(J){let Q=T(8)-0.2,$=T(28)-1;if(J<Q)return{x:6.5,z:6,heading:Math.PI/2,moving:0};if(J<$){let K=J-Q;if(K<2.5){let U=G9(K/2.5);return{x:6.5+U*2,z:j(6,12,U),heading:j(Math.PI/2,0,U),moving:1}}return{x:8.5+(K-2.5)*(3+(K-2.5)*0.35),z:10.2,heading:0,moving:1}}let Z=J-$;return{x:Math.max(8.5,140-Z*22),z:13.8,heading:Math.PI,moving:Z<6?1:0}}update(J){this.t=J;let Q=OZ(J),$=Q.name,Z=Q.at,K=gF(Q),U=G0(J,Z,K),Y=J-Z,W=this.camera,H=this.film.look,G=pQ.ROOM,X=pF(J),F=!["title","leave","neon","leave2","neon2","return","maybe","end"].includes($),N=this.sky.set(X,Math.PI/2),q=1-P9(0.28,0.55,X),O=new W0().lerpColors(new W0(16752736),new W0(16773856),P9(0.5,0.9,X));this.sun.color.lerpColors(O,new W0(8363263),q),this.sun.intensity=j(0.25,3.2,P9(0.3,0.8,X))+q*(F?2.4:0.35);let M=F?s9(-0.85,q>0.5?0.45:0.25+X*0.35,0.2).normalize():q>0.5?s9(-0.35,0.55,-0.75).normalize():N.clone();this.room.visible=F,this.outside.visible=!F,this.hemi.intensity=j(F?0.55:0.12,0.85,P9(0.25,0.9,X)),this.hemi.color.setHex(q>0.5?5927088:12375807),this.scene.fog.color.lerpColors(new W0(14196864),new W0(658456),q),this.scene.fog.density=j(0.0016,0.003,q),this.moon.visible=X<0.45,this.renderer.toneMappingExposure=j(1.1,0.95,P9(0.6,1,X));let D=F?G.clone().add(s9(-1,0,-1)):s9(0,0,6);this.sun.target.position.copy(D),this.sun.position.copy(D).addScaledVector(M,60);let E=this.sun.shadow.camera,I=F?8:40;E.left=-I,E.right=I,E.top=I,E.bottom=-I,E.near=1,E.far=140,E.updateProjectionMatrix();let L=J<H0(2,/light/i)-0.1||J>T(32)-0.5||$==="commit"||$==="limit";this.lamp.intensity=L?$==="limit"?0:$==="helping"||$==="twenty"?2.5:6:0,this.lampBulb.material.color.setHex(L&&$!=="limit"?16767392:3811866),this.windowShaft.material.uniforms.strength.value=j(0.22,0.32,1-q)*(F?1:0),this.windowShaft.material.uniforms.color.value.setHex(q>0.5?11060479:16763024),this.windowShaft.material.uniforms.time.value=J,this.dust.update(J);let R=tH(J);this.clockHands[0].rotation.z=-(R%12/12)*Math.PI*2,this.clockHands[1].rotation.z=-(R%1)*Math.PI*2;let B=J<T(28)-0.6?$7(G0(J,T(2),T(7))):0;this.coins.count=Math.round(160*(1-B)),this.drawScreen(J,$),this.screenLight.intensity=$==="limit"?1.2:$==="helping"?0.15:0.7;let _=this.steam.geometry.attributes.position;for(let m=0;m<_.count;m++){let C0=(J*0.4+K9(m))%1;_.setXYZ(m,Math.sin(J*2+m)*0.02*C0*2,0.12+C0*0.35,Math.cos(J*1.7+m)*0.02)}_.needsUpdate=!0,this.steam.visible=J>T(6)-1&&J<T(12),this.mug.visible=J>T(6)-1;let z=G0(J,H0(29,/whiskey/i)-0.6,H0(29,/whiskey/i)+1.4);this.glassFill.scale.y=J<T(29)-1?0.0001:Math.max(0.0001,z*0.06),this.bottle.position.set(J>T(29)-0.3&&z<1?0.12:0,0.96+(z>0&&z<1?0.15:0),-2.35),this.bottle.rotation.z=z>0&&z<1?-1.9*Math.sin(z*Math.PI):0;let V=J<T(15)?0:Math.min(40,Math.floor((J-T(15))*9)),C=new A9;for(let m=0;m<40;m++)C.position.set(0.3+K9(m)*2.6,1.3+K9(m+1)*1.6,-3.13),C.rotation.set(0,0,(K9(m+2)-0.5)*0.5),C.scale.setScalar(m<V?1:0.0001),C.updateMatrix(),this.notes.setMatrixAt(m,C.matrix);this.notes.instanceMatrix.needsUpdate=!0,this.notes.visible=J>T(15)&&J<T(24),this.checks.visible=$==="dream",this.checks.children.forEach((m,C0)=>{let s=C0/14*Math.PI*2+J*0.25;m.position.set(-2.8+Math.cos(s)*(0.6+K9(C0)*0.5),1.2+(J*0.2+K9(C0+5))%1*1.5,-2.3+Math.sin(s)*0.5),m.rotation.set(0,J*0.5+C0,0),m.material.opacity=0.85*Math.sin((J*0.2+K9(C0+5))%1*Math.PI)});let f=this.me;f.visible=F&&!["loop","state","reread","context","summary","app","rename","rename2","twenty","limit","helping","tenof","whiskey","ralph"].includes($),f.rotation.set(0,Math.PI,0),f.position.set(1.5,0,-1.65);let k="type",b=!0,e=0.15,v=0;if($==="pillow"||$==="dream")f.position.set(-2.8,0.84,-0.93),f.rotation.set(-Math.PI/2,0,0),k="sleep",b=!1,e=$==="pillow"?-0.25:0;else if($==="dawn")f.position.set(2,0,-1.6),f.rotation.y=Math.PI*0.95,k="mug",b=!1,e=-0.1;else if($==="goodbye")f.position.set(-3.7,0,-0.4),f.rotation.y=-Math.PI/2,k="hips",b=!1,e=0.05;else if($==="renews")f.position.set(-3.7,0,-0.4),f.rotation.y=-Math.PI/2-0.4,k="down",b=!1;else if($==="whiskey")k="pour",e=0.25;else if($==="tenof"||$==="limit")k="face",e=0.35;else if($==="commit")v=1.6;else if($==="baggage"||$==="approach")k="face",e=0.2;else if($==="ralph"||$==="state"||$==="loop"){if($==="ralph")f.position.set(-2.8,0.84,-0.93),f.rotation.set(-Math.PI/2,0,0),k="sleep",b=!1,e=0}if(nF(f,k,{sit:b,tilt:e,shake:v,t:J}),b)f.position.y=-0.36;let u=this.ralph,Q0=u.userData;if(u.visible=F&&J>T(4)-0.5,u.scale.setScalar(0.75),Q0.prop.rotation.y=J*14,Q0.eyeMat.color.setHex($==="limit"?3364198:7336191),$==="baggage"){let m=j(-1.5,2.4,U);u.position.set(m,0,-0.6),u.rotation.y=Math.PI/2,this.sack.position.set(m-0.75,0,-0.6),this.sack.scale.setScalar(0.9+U*0.9),this.sack.visible=!0,Q0.arms.forEach((C0)=>C0.rotation.x=-1.2)}else if(this.sack.visible=!1,u.position.set($==="helping"?1.5:2.15,0.96,$==="helping"?j(-2.95,-2.75,G9(G0(J,H0(33,/helping/i)-0.5,H0(33,/helping/i)))):-2.45),u.rotation.y=$==="helping"?0:-1.9,Q0.arms.forEach((m,C0)=>m.rotation.x=-1.1+Math.sin(J*22+C0*1.7)*0.25),Q0.head.rotation.z=Math.sin(J*3)*0.08,$==="helping"){let m=G9(G0(J,H0(33,/helping/i)-0.5,H0(33,/helping/i)));u.position.y=0.96+j(-0.6,0.12,m),Q0.arms.forEach((C0,s)=>C0.rotation.z=(s?-1:1)*m*2.4)}else Q0.arms.forEach((m)=>m.rotation.z=0);this.cabinWindow.material.emissiveIntensity=q>0.5?1.6:j(0,0.6,q*2),this.porch.intensity=q>0.4?6:0;let l=this.truckAt(J);this.truck.position.set(l.x,0,l.z),this.truck.rotation.y=-l.heading,this.truck.userData.wheels.forEach((m)=>m.rotation.z=-J*8*l.moving),this.taillights.forEach((m)=>m.material.color.setHex(q>0.2||l.moving?16719904:5246992)),this.headlights.intensity=l.moving&&q>0.2?60:0,this.bedCoins.count=J>T(8)-0.2&&J<T(28)-1?Math.max(30,Math.round(220-(J-T(8))*12)):220;let D0=new A9,t=T(8)-0.2;for(let m=0;m<360;m++){let C0=t+1+m*0.045;if(!(J>C0&&J<T(28)-1)){D0.scale.setScalar(0.0001),D0.updateMatrix(),this.roadCoins.setMatrixAt(m,D0.matrix);continue}let h0=this.truckAt(C0),r=J-C0,X0=Math.min(1,r*1.8),O0=j(1.6,0.04,X0)+Math.abs(Math.sin(X0*Math.PI*2))*0.25*(1-X0);D0.position.set(h0.x-2.4+(K9(m)-0.5)*1.2-Math.min(r,0.5)*2,O0,h0.z+(K9(m+1)-0.5)*2.4),D0.rotation.set(X0>=1?Math.PI/2*0:r*9,K9(m+2)*6,X0>=1?0:r*7),D0.scale.setScalar(1),D0.updateMatrix(),this.roadCoins.setMatrixAt(m,D0.matrix)}this.roadCoins.instanceMatrix.needsUpdate=!0;let p=(m,C0)=>J>=H0(m,C0)-0.1?1:0,J0=(m,C0)=>[p(m,/ralph/i),p(m,/local/i),p(m,/m-d/i),p(C0,/never/i),p(C0,/again/i)],M0=[0,0,0,0,0],A0=0;if(J>=T(10)-0.2)M0=J0(10,11);if(J>=T(22)-0.3)M0=J0(22,23);if(J>=T(30)-0.6){let m=H0(31,/maybe/i);M0=[p(30,/ralph/i),p(30,/local/i),p(30,/m-d/i),J<m?FZ(J,3,0.3+G0(J,T(30),m)*0.6):0,p(31,/again/i)],A0=J>=m-0.1?FZ(J,7,Math.max(0,0.6-(J-m))):0}if($==="neon2"||$==="leave2")M0[3]=M0[3]*FZ(J,1,0.25);M0.forEach((m,C0)=>this.sign.set(C0,m)),this.maybe.set(0,A0),this.maybe.group.visible=J>=T(30)-0.6,this.signGlow.intensity=M0.reduce((m,C0)=>m+C0,0)/5*30*(0.4+q*0.6),this.signGlow.color.setHex(A0>0.5?16761421:16731517);let _0=(m,C0,s=38)=>({pos:m,look:C0,fov:s}),E0=(m)=>[m[0]+G.x,m[1]+G.y,m[2]+G.z],i=(m,C0=0,s=0)=>{let h0=[1.5,1.2,-2.78];return _0(E0([h0[0]+C0,h0[1]+0.05+s,h0[2]+m]),E0(h0),30)};Object.assign(H,{focus:0,aperture:0.002,bloom:0.45,exposure:F&&q>0.5?1.35:1,warmth:0.25,saturation:0.92,contrast:1.06,vignette:0.55,grain:0.07,aberration:0.5,halation:0.5,letterbox:1,leak:0,fade:0}),H.shadows.setRGB(0.42,0.5,0.6),H.highlights.setRGB(0.6,0.52,0.42);let N0=0.4,K0=null;switch($){case"title":{a9(W,_0([-30,40,70],[-10,30,-100],42),_0([-6,3.2,26],[-1.5,2.2,0],34),G9(U)),Object.assign(H,{warmth:-0.45,exposure:1.05,bloom:0.7}),N0=0.2;break}case"desk":{a9(W,_0(E0([3.4,1.6,0.4]),E0([1.5,1.05,-2.4]),34),_0(E0([2.6,1.45,-0.6]),E0([1.4,1.1,-2.4]),30),U),K0=f.position.clone().add(s9(0,1.4,0));break}case"pillow":{a9(W,_0(E0([-2.8,2.9,-1.2]),E0([-2.8,0.8,-2.2]),40),_0(E0([-2.6,2.4,-1.4]),E0([-2.8,0.8,-2.3]),34),U),K0=s9(G.x-2.8,0.9,G.z-2.3),H.warmth=0.1;break}case"loop":case"state":case"reread":case"context":case"summary":case"app":case"rename":case"rename2":case"twenty":{let m=$==="loop"||$==="twenty"?1.5:1;if(a9(W,i(m+0.15,-0.08,0.02),i(m,0.06,0),U),K0=s9(G.x+1.5,1.2,G.z-2.7),H.aperture=0.004,H.warmth=$==="loop"&&J>H0(2,/light/i)?-0.25:0,$==="context"&&J>H0(14,/forty/i))H.aberration=2.2,H.warmth=0.1;N0=0.25;break}case"ralph":{a9(W,_0(E0([-0.3,1.5,-0.4]),E0([1.1,1.2,-2.5]),34),_0(E0([0,1.45,-0.8]),E0([1.1,1.25,-2.5]),30),U),K0=u.position.clone().add(s9(0,0.5,0)),H.aperture=0.005,H.warmth=-0.2;break}case"dream":{a9(W,_0(E0([-1.4,1.6,-0.2]),E0([-2.8,1.4,-2.2]),40),_0(E0([-1.9,1.9,-0.6]),E0([-2.8,1.6,-2.3]),36),U),K0=s9(G.x-2.8,1.5,G.z-2.2),Object.assign(H,{warmth:-0.3,saturation:1.1,bloom:1,halation:1}),N0=0.2;break}case"dawn":{a9(W,_0(E0([3.6,1.5,0.6]),E0([2,1.4,-1.8]),36),_0(E0([3.1,1.6,0.1]),E0([2,1.45,-1.8]),32),U),K0=f.position.clone().add(s9(0,1.4,0)),Object.assign(H,{warmth:0.5,leak:0.25});break}case"tenof":{a9(W,_0(E0([0.2,1.45,-1.2]),E0([0.9,1.15,-2.6]),32),_0(E0([0.35,1.35,-1.5]),E0([0.8,1.15,-2.6]),28),U),K0=this.jar.position.clone().add(G).add(s9(0,0.2,0)),H.aperture=0.006;break}case"leave":case"leave2":{if($==="leave")a9(W,_0([20,0.8,9.5],[6,1.2,9],40),_0([22,1.2,10],[9,1,10.5],36),U);else a9(W,_0([-10,1.6,14.5],[40,1.2,10],30),_0([-10,2.4,14.5],[80,1,10],26),U);K0=this.truck.position.clone().add(s9(0,1,0)),H.aperture=0.0004,Object.assign(H,{warmth:$==="leave"?-0.1:0.45,bloom:0.6,leak:$==="leave2"?0.2:0}),N0=0.6;break}case"neon":case"neon2":case"maybe":{let m=this.signGroup.position;if($==="neon")a9(W,_0([m.x+2,3.2,m.z+30],[m.x,m.y-0.5,m.z],36),_0([m.x-1,5,m.z+24],[m.x,m.y,m.z],34),U);else if($==="neon2")a9(W,_0([m.x+14,5.5,m.z+20],[m.x,m.y,m.z],36),_0([m.x-8,6.5,m.z+22],[m.x,m.y,m.z],34),U);else a9(W,_0([m.x+8,7.4,m.z+12],[m.x+3,m.y,m.z],32),_0([m.x+6,7.8,m.z+10],[m.x+3.2,m.y,m.z],28),U);K0=m.clone(),H.aperture=0.0012,Object.assign(H,{warmth:$==="maybe"?0.3:0,bloom:0.45,halation:0.35,exposure:0.9}),N0=0.3;break}case"baggage":{a9(W,_0(E0([0.4,0.5,1.8]),E0([0.4,0.4,-0.6]),40),_0(E0([0.9,0.6,1.6]),E0([1.6,0.4,-0.6]),38),U),K0=u.position.clone();break}case"approach":{a9(W,_0(E0([1.6,1.6,-0.2]),E0([1.6,1.9,-3.1]),40),_0(E0([1.6,1.8,-1]),E0([1.6,2,-3.1]),34),U),K0=s9(G.x+1.6,2,G.z-3.1),H.warmth=-0.1;break}case"commit":{a9(W,_0(E0([0.7,1.85,-0.7]),E0([1.5,1.15,-2.6]),34),_0(E0([0.85,1.75,-0.95]),E0([1.5,1.15,-2.6]),30),U),K0=s9(G.x+1.5,1.1,G.z-2.4),H.aperture=0.006,N0=1.6;break}case"limit":{a9(W,i(1.7,0,0.1),i(0.9,0,0.02),U),K0=s9(G.x+1.5,1.2,G.z-2.7),Object.assign(H,{warmth:-0.5,exposure:0.9,saturation:0.7}),N0=0.15;break}case"goodbye":{a9(W,_0(E0([-1.2,1.7,1.4]),E0([-4.4,1.8,-0.4]),34),_0(E0([-1.8,1.7,0.9]),E0([-4.4,1.8,-0.4]),32),U),K0=f.position.clone().add(s9(0,1.5,0)),Object.assign(H,{warmth:0.55,exposure:0.95,leak:0.2});break}case"renews":{let m=s9(G.x-1,2.45,G.z-3.12);a9(W,_0([m.x,m.y,m.z+1.8],m.toArray(),30),_0([m.x,m.y,m.z+1],m.toArray(),30),U),K0=m,H.aperture=0.008,Object.assign(H,{warmth:0.6,leak:P9(H0(27,/renews/i)-0.3,H0(27,/renews/i)+0.6,J)*0.7}),N0=0.1;break}case"return":{a9(W,_0([30,1.4,16.5],[60,1.5,13],32),_0([26,1.2,16.5],[16,1.3,13],38),U),K0=this.truck.position.clone().add(s9(0,1,0)),H.aperture=0.0005,Object.assign(H,{warmth:0.35,bloom:0.5}),N0=0.5;break}case"whiskey":{if(a9(W,_0(E0([0.6,1.35,-1.5]),E0([0.15,1.05,-2.3]),32),_0(E0([0.45,1.25,-1.7]),E0([0.2,1.05,-2.3]),28),U),K0=this.glassFill.position.clone().add(G),H.aperture=0.006,H.warmth=0.55,J>H0(29,/changed/i)-0.3)a9(W,i(0.7,0.05,0),i(0.6,-0.04,0),G0(J,H0(29,/changed/i)-0.3,K)),K0=s9(G.x+1.5,1.2,G.z-2.7),H.warmth=0.1;break}case"helping":{a9(W,_0(E0([1.5,1.6,-0.6]),E0([1.5,1.45,-2.8]),32),_0(E0([1.5,1.55,-0.9]),E0([1.5,1.5,-2.8]),28),U),K0=u.position.clone().add(s9(0,0.5,0)),H.aperture=0.005,H.warmth=0.3;break}case"end":{a9(W,_0([-4,2.4,22],[-1,2.2,0],34),_0([-20,30,70],[-10,35,-100],44),G9(U)),Object.assign(H,{warmth:0.3,bloom:0.5}),N0=0.2;break}}if(oH(W,J,N0),this.sky.mesh.position.copy(W.position),this.sky.stars.position.copy(W.position),this.moon.position.copy(W.position).add(s9(-160,120,-380)),H.focus=K0?W.position.distanceTo(K0):0,Y<0.6&&($==="leave"||$==="return"))H.leak=Math.max(H.leak,(1-Y/0.6)*0.6);this.film.look.grain=0.06+a7(J)*0.01}drawScreen(J,Q){let $=this.screen,Z="#3ee07a",K="#6b7a90",U="#ff5f6b",Y="#ffd166",W="#7ad8ff",H=".claude/ralph-loop.local.md";if(J<T(2)-0.4)$.show([{text:"$ claude",color:"#6b7a90"},"> build me the whole app.","  tests, docs, deploy. by morning.",{text:"",size:20},{text:"sure! I'll get started.",color:"#3ee07a"}],{title:"~/app",cursor:Math.floor(J*2)%2===0});else if(J<T(3)-0.3)$.show([{text:"$ claude",color:"#6b7a90"},`> /ralph-loop "${h6("build the whole app",G0(J,T(2),H0(2,/spec/i)+0.6))}"`,{text:J>H0(2,/light/i)?"  loop started · going to bed":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<T(4)-0.3)$.show([{text:"$ cat .claude/ralph-loop.local.md",color:"#6b7a90"},"---","active: true",`max_iterations: ${J>H0(3,/ten/i)-0.2?"10":""}`,'completion_promise: "DONE"',"---",{text:J>H0(3,/polite/i)?"# ten is polite.":"",color:"#6b7a90"}],{title:".claude/ralph-loop.local.md"});else if(J<T(7)-0.3){let G=Math.min(10,1+Math.floor(G0(J,T(4),T(7))*10));$.show([{text:`iteration ${G}/10`,color:"#ffd166",bold:!0},"reading context…","editing src/app.tsx",{text:"✓ tests pass (2 of 41)",color:"#3ee07a"},{text:`tokens: ${(G*9.8).toFixed(0)}% of plan`,color:G>7?"#ff5f6b":"#6b7a90"}],{title:"ralph-loop",cursor:Math.floor(J*3)%2===0})}else if(J<T(9)-0.2)$.show([{text:"iteration 10/10",color:"#ffd166",bold:!0},{text:"max_iterations reached.",color:"#ff5f6b"},{text:"tokens: 100% of plan",color:"#ff5f6b",bold:!0},"",{text:"app status: half",color:"#6b7a90"}],{title:"ralph-loop"});else if(J<T(12)-0.3)$.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md",`$ ${h6("mv .claude/ralph-loop.local.md .claude/ralph-loop.local.md-NEVER_AGAIN",G0(J,T(9),R9(9)+0.4))}`,{text:J>R9(9)+0.5?"renamed.":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<T(14)-0.1){let G=Array.from({length:9},(X,F)=>({text:`> ${["previous attempt:","re-reading thread (1 of 1,204)","loading transcript…","loading last round…","loading the round before…","carrying over context","summarizing summaries","re-reading thread (2 of 1,204)","loading transcript…"][(F+Math.floor(J*8))%9]}`,color:F%3?"#6b7a90":"#7ad8ff"}));$.show([{text:`iteration ${3+Math.floor((J-T(12))*1.5)}/10`,color:"#ffd166",bold:!0},...G],{title:"ralph-loop"})}else if(J<T(15)-0.1){let G=Math.min(40,Math.round(G0(J,T(14),H0(14,/forty/i))*40)),X="█".repeat(Math.round(G/2.5))+"░".repeat(40-Math.round(G/2.5)),F=J>H0(14,/forty/i)+0.3;$.show([{text:"context window",color:"#6b7a90"},{text:X,color:G>=40?"#ff5f6b":"#3ee07a"},{text:`${G}% used`,color:G>=40?"#ff5f6b":"#3ee07a",bold:!0},{text:F?"quality: [REDACTED BY ENTROPY]":"quality: sharp",color:F?"#ff5f6b":"#3ee07a"}],{title:"ralph-loop"})}else if(J<T(16)-0.1){let G=Math.min(14,Math.floor((J-T(15))*6));$.show(Array.from({length:G},(X,F)=>({text:"new approach:",color:F%2?"#ffd166":"#7ad8ff"})),{title:"ralph-loop"})}else if(J<T(17)-0.1)$.show([{text:"SUMMARY",color:"#6b7a90",bold:!0},{text:"✨ Great progress!",color:"#3ee07a",bold:!0,size:56},{text:"Almost done!",color:"#3ee07a",bold:!0,size:56},"",{text:"(tests: 2 of 41)",color:"#6b7a90",size:26}],{title:"ralph-loop"});else if(J<T(18)-0.1)$.show([{text:"schema.sql",color:"#7ad8ff"},"CREATE TABLE users (","  id serial,","  -- TODO","",{text:"// TODO  // TODO  // TODO",color:"#ffd166"}],{title:"localhost:3000",banner:{text:"[ Coming Soon ]",color:"#3a6ad8"}});else if(J<T(20)-0.2)$.show([{text:"$ git status",color:"#6b7a90"},"modified: everything",`$ ${h6('git commit -m "burned all my tokens"',G0(J,T(18),H0(19,/tokens/i)+0.3))}`,{text:J>H0(19,/hundred/i)?"plan: $100 · used: 100%":"",color:"#ff5f6b",bold:!0}],{title:"~/app",cursor:!0});else if(J<T(24)-0.5)$.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md",`$ ${h6("mv .claude/ralph-loop.local.md .claude/ralph-loop.local.md-NEVER_AGAIN",G0(J,T(21),R9(21)+0.4))}`,{text:J>R9(21)+0.5?"renamed. again.":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<T(29))$.show([{text:"",size:20}],{title:"claude",bg:"#120b0e",banner:{text:"Usage limit reached · resets 9:00 AM",color:"#b3122e"}});else if(J<T(32)-0.4)$.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md-NEVER_AGAIN",`$ ${h6("mv .claude/ralph-loop.local.md-NEVER_AGAIN .claude/ralph-loop.local.md-MAYBE_AGAIN",G0(J,H0(29,/changed/i)-0.2,R9(29)+0.4))}`],{title:"~/app",cursor:!0});else $.show([{text:"$ cat .claude/ralph-loop.local.md",color:"#6b7a90"},"---","active: true",{text:`max_iterations: ${J>H0(32,/twenty/i)-0.2?"20":""}`,color:"#ffd166",bold:!0},"---",{text:J>T(33)-0.4?"I'm helping!":"",color:"#3ee07a",bold:!0}],{title:".claude/ralph-loop.local.md",cursor:!0})}t=0;render(){this.film.render(this.t)}}var iF=/^(never|again|quota's|burned|tokens|token|limit|hundred-dollar|dime|spent|shaking)$/,oF=/^(loop|ralph|ralph-loop|state|file|context|iterations|m-d|local|thread|schema|todos|commit)$/,aF=/^(dawn|six|coffee|whiskey|nine|renews|maybe|helping|helping!|twenty|green|checkmarks|progress)$/,J5={title:"NEVER_AGAIN",fonts:['400 100px "Rye"','400 100px "Monoton"','700 40px "Libre Baskerville"','italic 400 40px "Libre Baskerville"','700 40px "Caveat"','500 20px "JetBrains Mono"','800 40px "Inter"'],overlays:()=>`
  <div class="ov title" data-show="1.2|L0-0.6">NEVER_AGAIN<small>an outlaw country lament</small></div>
  <div class="ov bubble" data-show="W4:helping-0.1|L5-0.2" data-at="W4:helping-0.1">I'm helping!</div>
  <div class="ov card bill" data-show="W19:hundred-0.2|L20-0.3"><div class="bar">Claude Max · monthly</div>
    <div class="row">plan <b>$100</b></div>
    <div class="row">used <b data-count="0,100" data-at="W19:hundred-0.2" data-until="E19">0</b>%</div>
    <div class="row muted" data-at="E19-0.4">resets 9:00 AM</div></div>
  <div class="ov bubble big" data-show="W33:helping-0.1|W33:helping+2.2" data-at="W33:helping-0.1">I'm helping!</div>`,endAt:()=>H0(33,/helping/i)+2.4,words:{hot:iF,ice:oF,gold:aF},hide:/^(spoken|sob)$/,hud:(J,Q)=>({left:`never_again &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`${eH(J)} &nbsp;·&nbsp; quota <b>${J<T(2)?"100%":J<T(28)-0.6?"gone":"renewed"}</b>`}),shots:RZ,shotAt:OZ,world:(J)=>{let Q=new pQ(J);return{update:($)=>Q.update($),render:()=>Q.render(),flash:($)=>Q.flash($),fade:($)=>Q.fade($)}}};var gU=[["witness","can I get a witness"],["greenwash","green is just a color"],["sign","can't comprehend"],["aisle","who looked in?"],["read","read the diff!"]];function lQ(){let J=(Q,$,Z)=>gU.slice(0,$).map(([K,U],Y)=>({name:K,label:U,section:Z,at:T(Q+Y)-0.2}));return[{name:"exterior",at:0,label:"sunday morning",section:"spoken"},{name:"pulpit",at:H0(0,/^says/i)-0.1,label:"the good book",section:"spoken"},{name:"shipit",at:T(1)-0.3,label:"ship it!",section:"spoken"},{name:"who",at:T(2)-0.3,label:"who read the diff?",section:"spoken"},{name:"scroll",at:T(3)-0.3,label:"four thousand lines",section:"verse 1"},{name:"button",at:T(4)-0.2,label:"eleven seconds",section:"verse 1"},{name:"nine",at:T(5)-0.2,label:"line nine hundred",section:"verse 1"},{name:"greenbtn",at:T(6)-0.2,label:"the button was green",section:"verse 1"},{name:"devil",at:T(7)-0.2,label:"the devil's in the diff",section:"pre-chorus"},{name:"nobody",at:H0(8,/^nobody/i)-0.5,label:"ain't nobody looking",section:"pre-chorus"},...J(9,5,"chorus"),{name:"loaf",at:T(14)-0.6,label:"a little slop",section:"verse 2"},{name:"commits",at:T(15)-0.2,label:"the repo stunk",section:"verse 2"},{name:"candles",at:T(16)-0.2,label:"cleaned up some flaky tests",section:"verse 2"},{name:"laptop",at:T(18)-0.2,label:"explain this function",section:"verse 2"},{name:"bot",at:T(20)-0.2,label:"the bot said amen",section:"verse 2"},{name:"fire",at:T(21)-0.2,label:"prod's on fire",section:"verse 2"},...J(22,5,"chorus"),{name:"tablets",at:T(27)-0.6,label:"the commandments",section:"bridge"},{name:"devil",at:T(32)-0.2,label:"the devil's in the diff",section:"pre-chorus"},...J(33,3,"final chorus"),{name:"sermon",at:T(36)-0.2,label:"written with claude",section:"final chorus"},{name:"deadpan",at:T(37)-0.3,label:"it sounded so confident",section:"spoken"},{name:"lgtm",at:T(38)-0.3,label:"l-g-t-m",section:"choir"},{name:"pray",at:T(39)-0.6,label:"let us pray",section:"outro"},{name:"approved",at:T(40)-0.2,label:"amen. approved.",section:"outro"},{name:"end",at:R9(40)+1.4,label:"the end",section:"outro"}]}var pU=null,mU=(J)=>{let Q=pU??=lQ(),$=Q[0];for(let Z of Q)if(Z.at<=J)$=Z;return $},rF=(J)=>{let Q=pU??=lQ();return Q[Q.indexOf(J)+1]?.at??I7()},Z5=new W0(16051419);var g6=12071482;var mQ=13933114,xU=8015662,tF=6965900,Q5={day:[9418200,15918792,10337146],pray:[4934266,15771752,6969962],approved:[4934266,15771752,6969962],end:[4934266,15771752,6969962],tablets:[7176090,15980960,11770486],button:[14865596,16051419,14272424],greenbtn:[14082756,16051419,13228208],loaf:[15259320,16181970,14271136],commits:[14146758,15854808,12896685],candles:[3026767,7032671,2761779],fire:[2040640,8010282,2103848]},dQ=(()=>{let J=new P6(new Uint8Array([90,90,90,255,170,170,170,255,255,255,255,255]),3,1);return J.minFilter=J.magFilter=u7,J.needsUpdate=!0,J})(),$5=new Map,_9=(J)=>{let Q=$5.get(J);if(!Q)$5.set(J,Q=new RJ({color:J,gradientMap:dQ}));return Q},N8=(J,Q=1)=>new m0({color:J,transparent:Q<1,opacity:Q,depthWrite:Q>=1}),N9=(J,Q,$=0,Z=0,K=0)=>{let U=new d(J,Q);return U.position.set($,Z,K),U},C9=(J,Q,$,Z,K=0,U=0,Y=0)=>N9(new P0(J,Q,$),_9(Z),K,U,Y);function x6(J,Q,$){let Z=document.createElement("canvas");Z.width=J,Z.height=Q,$(Z.getContext("2d"));let K=new _7(Z);return K.colorSpace=A7,K.anisotropy=4,K}var O7=new A9,e8=(J=0,Q=0,$=0)=>new S(J,Q,$),eF=new u0(0.075,0.09,1,8).translate(0,0.5,0),J1=new S(0,1,0);function MZ(J,Q){let $=new R0,Z=Q.skin??[15254688,13012578,9263675,15782582,7029808][Math.floor(z0(Q.seed)*5)];if($.add(N9(new u0(0.24,0.5,1.35,14),_9(J),0,0.68,0)),Q.stole)for(let W of[-1,1])$.add(C9(0.1,0.9,0.05,Q.stole,W*0.13,0.85,0.32));let K=Q.robot?C9(0.42,0.4,0.4,9081500,0,1.6,0):N9(new $9(0.23,16,12),_9(Z),0,1.58,0);if(Q.robot){let W=N9(new P0(0.28,0.07,0.02),N8(10412154),0,0.02,0.21);K.add(W,N9(new u0(0.015,0.015,0.25),_9(9081500),0,0.32,0),N9(new $9(0.05),N8(g6),0,0.46,0)),$.userData.extra=W}$.add(K);let U=[-1,1].map((W)=>{let H=N9(new $9(0.09,10,8),_9(Q.robot?9081500:Z));return $.add(H),H}),Y=[0,1].map(()=>{let W=new d(eF,_9(Q.robot?9081500:J));return $.add(W),W});return Object.assign($.userData,{head:K,hands:U,arms:Y,seed:Q.seed}),$}function uQ(J,Q,$,Z=0.05,K=0){let{head:U,hands:Y,arms:W,seed:H}=J.userData;J.rotation.z=Math.sin(Q*Math.PI*1.78+H)*Z,U.rotation.x=K*0.6,Y.forEach((G,X)=>{let F=X?1:-1,N=$7($-z0(H+X)*0.15);G.position.set(F*j(0.36,0.5,N),j(0.95,2.15,G9(N))-K*0.1,j(0.3,0.12,N)+K*0.15),K5(W[X],F,G.position)})}function K5(J,Q,$){let Z=e8(Q*0.24,1.3,0.05),K=$.clone().sub(Z);J.position.copy(Z),J.quaternion.setFromUnitVectors(J1,K.clone().normalize()),J.scale.set(1,K.length(),1)}function Q1(J){for(let Q of Y7){if(Q.words[0].s>J+0.5)break;for(let $ of Q.words)if($.backing&&J>=$.s-0.08&&J<=$.e+0.7)return P9($.s-0.08,$.s+0.12,J)}return 0}var $1={uniforms:{tDiffuse:{value:null},res:{value:new U0(1920,1080)},paper:{value:Z5.clone()},shotSeed:{value:0},boil:{value:0},reveal:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
    }`};class uU{renderer;scene=new V8;camera=new e9(40,1.7777777777777777,0.1,500);composer;paint;sky;hemi=new B8(16774368,9075302,1.6);sun=new I8(16773336,1.9);glowLight=new c8(16756832,0,18,1.4);interior=new R0;windows=[];choir=[];robot;preacher;book;flock=[];scroll;scrollTex;roll;glass;devil=new R0;laptop=new R0;screen;screens={};exterior=new R0;churchWindows=[];button=new R0;cap;loaf=new R0;dough;slop;commits=new R0;cards=[];fumes=[];candles=new R0;flames;flameOrder=[];candlePos=[];fire=new R0;fireFlames;leds;smoke=[];kneeler;tablets=new R0;tabletTex=[];tabletShown=-1;rays=[];constructor(J){this.renderer=new n8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=Z5.clone(),this.composer=new o8(this.renderer),this.composer.addPass(new r8(this.scene,this.camera)),this.composer.addPass(new a8),this.paint=new dJ($1),this.composer.addPass(this.paint),this.sun.position.set(-6,14,8),this.scene.add(this.hemi,this.sun,this.glowLight),this.buildSky(),this.buildInterior(),this.buildExterior(),this.buildButton(),this.buildLoaf(),this.buildCommits(),this.buildCandles(),this.buildFire(),this.buildTablets(),this.scene.add(this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets)}buildSky(){this.sky=new d(new $9(300,32,16),new v9({side:N7,depthWrite:!1,uniforms:{top:{value:new W0},horizon:{value:new W0},bottom:{value:new W0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; varying vec3 vDir;
        void main() { float y = vDir.y;
          vec3 c = y > 0. ? mix(horizon, top, pow(smoothstep(0., .7, y), .8)) : mix(horizon, bottom, smoothstep(0., .25, -y));
          gl_FragColor = vec4(c, 1.); }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildInterior(){let J=this.interior;J.add(C9(18,0.2,32,13214571,0,-0.1,-3)),J.add(C9(2.4,0.02,23,g6,0,0.01,0.5)),J.add(C9(0.3,13,32,15721416,-9,6.5,-3),C9(0.3,13,32,15721416,9,6.5,-3)),J.add(C9(18,13,0.3,15326400,0,6.5,-19.2),C9(18,13,0.3,15326400,0,6.5,12.6)),J.add(C9(2.6,4.2,0.1,xU,0,2.1,12.4)),J.add(C9(18,0.8,8,10119742,0,0.4,-15));let Q=(q)=>x6(256,512,(O)=>{O.beginPath(),O.moveTo(8,504),O.lineTo(8,128),O.arc(128,128,120,Math.PI,0),O.lineTo(248,504),O.closePath(),O.clip();let M=["#3a5aa8","#b8323a","#d49a3a","#4f8a3c","#6a4a8c","#e7c46a"];for(let D=0;D<70;D++)O.fillStyle=M[Math.floor(z0(q+D)*M.length)],O.fillRect(Math.floor(z0(q+D*3)*6)*43,Math.floor(z0(q+D*7)*12)*43,43,43);O.strokeStyle="#2b2633",O.lineWidth=6;for(let D=0;D<=12;D++)O.beginPath(),O.moveTo(0,D*43),O.lineTo(256,D*43+(D%2?12:-12)),O.stroke();for(let D=0;D<=6;D++)O.beginPath(),O.moveTo(D*43,0),O.lineTo(D*43,512),O.stroke();O.lineWidth=14,O.stroke(new Path2D("M8 504 L8 128 A120 120 0 0 1 248 128 L248 504 Z"))}),$=(q,O,M)=>{let D=new d(new E9(O,M),new m0({map:q,transparent:!0,alphaTest:0.1}));return this.windows.push(D),D};for(let[q,O]of[-5,0,5].entries()){let M=$(Q(q*11),2.4,4.8);M.position.set(O,O===0?8.6:7.8,-19),J.add(M)}for(let q of[-1,1])for(let[O,M]of[-9,-2,5].entries()){let D=$(Q(40+O*13+q*5),2,4);D.position.set(q*8.8,6,M),D.rotation.y=-q*Math.PI/2,J.add(D)}let Z=new R0;Z.add(C9(0.35,2.6,0.12,mQ),C9(1.5,0.35,0.12,mQ,0,0.45,0)),Z.position.set(0,4.6,-18.9),J.add(Z);for(let q of[-1,1])for(let O=0;O<7;O++){let M=3+Math.sin(O*0.6)*1.3+O*0.35;J.add(N9(new u0(0.16,0.16,M,10),_9(14201434),q*(5.4+O*0.42),0.8+M/2,-18.6))}for(let q=0;q<9;q++){let O=-8+q*2.1;for(let M of[-1,1]){J.add(C9(5,0.18,0.8,9067058,M*3.9,0.55,O),C9(5,1,0.14,8014890,M*3.9,0.95,O+0.45));for(let D=0;D<3;D++){if(z0(q*7+D+M*31)<0.25)continue;let E=q*10+D+(M>0?500:0),I=[3824296,6982218,12088154,8022682,13214282,5929610][Math.floor(z0(E+2)*6)],L=MZ(I,{seed:E});L.scale.setScalar(0.82),L.position.set(M*(2.2+D*1.5+z0(E)*0.3),0.18,O+0.1),L.rotation.y=Math.PI;let R=N9(new E9(0.16,0.26),N8(14216447));R.position.set(0,1.05,0.42),R.rotation.x=-0.9,L.add(R),J.add(L),this.flock.push({f:L,phone:R})}}}for(let q=0;q<3;q++){J.add(C9(13,0.45,1.1,9067574,0,1.02+q*0.45,-15.6-q*1.1));for(let O=0;O<7;O++){let M=900+q*10+O,D=q===0&&O===5,E=MZ(tF,{stole:mQ,seed:M,robot:D});if(E.position.set(-4.8+O*1.6+q%2*0.4,1.25+q*0.45,-15.6-q*1.1),J.add(E),this.choir.push(E),D)this.robot=E}}this.preacher=MZ(2301994,{stole:g6,seed:77,skin:9263675}),this.preacher.position.set(0,0.8,-12.9),this.book=C9(0.5,0.68,0.14,3877410),this.book.add(C9(0.46,0.62,0.15,15258522,0.03,0,0)),this.preacher.add(this.book),J.add(this.preacher);let K=new R0;K.add(C9(1.5,1.35,0.9,8014890,0,0.68,0),C9(1.7,0.08,1,6175264,0,1.4,-0.05)),K.add(C9(0.6,0.5,0.02,g6,0,0.8,0.46)),K.position.set(0,0.8,-12),J.add(K),this.laptop.add(C9(0.8,0.04,0.55,10133672,0,0,0));let U=C9(0.8,0.52,0.03,10133672,0,0.26,-0.27);U.rotation.x=-0.25,this.screen=new d(new E9(0.74,0.46),new m0({color:16777215})),this.screen.position.set(0,0,-0.02),this.screen.rotation.y=Math.PI,U.add(this.screen),U.rotation.y=0,this.laptop.add(U),this.laptop.position.set(0,2.25,-12.05),this.laptop.rotation.y=0,J.add(this.laptop);let Y=(q)=>x6(1024,640,(O)=>{O.fillStyle="#f6f1e6",O.fillRect(0,0,1024,640),O.fillStyle="#c96442",O.fillRect(0,0,1024,70),O.font="700 40px 'JetBrains Mono', monospace",O.fillStyle="#fff",O.fillText("claude",30,50),O.font="500 38px 'JetBrains Mono', monospace",q.forEach(([M,D],E)=>{O.fillStyle=M,O.fillText(D,34,140+E*66)})});this.screens.explain=Y([["#c96442","> explain this function"],["#2b2633","This function elegantly"],["#2b2633","orchestrates a robust,"],["#2b2633","scalable synergy of..."],["#8a8494","(pasted back in, unread)"]]),this.screens.sermon=Y([["#c96442","> write me a sermon about"],["#c96442","  reading the diff"],["#2b2633","Church! The Good Book says,"],["#2b2633",'"The A-I wrote it, the'],["#2b2633",'tests are green." ...']]),this.scrollTex=x6(512,2048,(q)=>{q.fillStyle="#fbf7ee",q.fillRect(0,0,512,2048);for(let O=0;O<64;O++){let M=z0(O*3.3)<0.08;q.fillStyle=M?"#f3c9c4":"#d3ebc8",q.fillRect(0,O*32,512,30),q.fillStyle=M?"#b8323a":"#4f8a3c",q.fillRect(10,O*32+12,14,6),q.fillStyle="#2b2633";let D=40+Math.floor(z0(O)*4)*26;for(let E=0;E<4;E++){let I=30+z0(O*9+E)*110;if(D+I>500)break;q.fillRect(D,O*32+11,I,8),D+=I+18}}}),this.scrollTex.wrapT=EJ,this.scroll=new d(new E9(2.2,1),new RJ({map:this.scrollTex,gradientMap:dQ})),this.scroll.rotation.x=-Math.PI/2,this.roll=N9(new u0(0.32,0.32,2.3,18),_9(16183264)),this.roll.rotation.z=Math.PI/2,J.add(this.scroll,this.roll),this.glass=new R0,this.glass.add(N9(new L7(0.42,0.05,10,32),_9(3877410))),this.glass.add(N9(new E7(0.4,32),N8(13625074,0.25)));let W=N9(new u0(0.05,0.06,0.7),_9(3877410),0,-0.75,0);this.glass.add(W),this.glass.rotation.x=-Math.PI/2+0.25,J.add(this.glass);let H=_9(g6),G=N9(new $9(0.32,16,12),H,0,0.62,0);for(let q of[-1,1]){let O=N9(new K7(0.07,0.3,8),_9(5904926),q*0.17,0.28,0);O.rotation.z=-q*0.4,G.add(O,N9(new $9(0.06,8,6),N8(16774856),q*0.11,0.06,0.27))}G.add(N9(new L7(0.1,0.02,6,12,Math.PI),_9(5904926),0,-0.1,0.28));let X=N9(new K7(0.26,0.6,12),H,0,0.18,0),F=N9(new W8(new T6([e8(0,0.1,-0.1),e8(0.2,0.05,-0.5),e8(0.5,0.3,-0.6),e8(0.55,0.55,-0.45)]),20,0.03,6),H),N=new R0;N.add(N9(new u0(0.02,0.02,1.3),_9(3877410)));for(let q of[-1,0,1])N.add(N9(new K7(0.025,0.2,6),_9(3877410),q*0.08,0.72,0));N.position.set(0.38,0.5,0.1),N.rotation.z=-0.2,this.devil.add(G,X,F,N),J.add(this.devil)}buildExterior(){let J=this.exterior,Q=N9(new $9(60,48,24),_9(9417322),0,-59.6,0);J.add(Q);for(let[W,H,G,X]of[[-40,-50,30,8034922],[35,-60,36,7311218],[0,-80,40,8823712]])J.add(N9(new $9(G,32,16),_9(X),W,-G*0.82,H));let $=new R0;$.add(C9(6,4.5,9,15986662,0,2.25,0));let Z=new n7([new U0(-3.5,0),new U0(0,2.8),new U0(3.5,0)]),K=N9(new _8(Z,{depth:9.6,bevelEnabled:!1}),_9(9058866),0,4.5,-4.8);$.add(K),$.add(C9(1.8,3.2,1.8,15986662,0,6.2,4.2));let U=N9(new K7(1.35,3.6,4),_9(9058866),0,9.6,4.2);U.rotation.y=Math.PI/4,$.add(U,C9(0.12,1,0.12,mQ,0,11.9,4.2),C9(0.6,0.12,0.12,mQ,0,12,4.2)),$.add(C9(1.4,2.6,0.1,xU,0,1.3,4.55));for(let W of[-2.5,0,2.5])for(let H of[-1,1]){let G=new d(new E9(0.9,1.7),N8(9416904));G.position.set(H*3.02,2.6,W),G.rotation.y=H*Math.PI/2,$.add(G),this.churchWindows.push(G)}let Y=new d(new E7(0.5,24),N8(9416904));Y.position.set(0,6.6,5.11),$.add(Y),this.churchWindows.push(Y),$.position.set(0,0.3,0),$.rotation.y=0.35,J.add($),J.add(C9(1.4,0.05,14,14206106,1.8,0.35,10.5));for(let W=0;W<16;W++){let H=z0(W)*Math.PI*2,G=12+z0(W+3)*14,X=Math.cos(H)*G,F=Math.sin(H)*G-4;if(F>6&&Math.abs(X)<6)continue;let N=3+z0(W+5)*3,q=Math.sqrt(Math.max(0,3600-X*X-F*F))-59.6;J.add(N9(new u0(0.15,0.22,N*0.4),_9(xU),X,q+N*0.2,F)),J.add(z0(W+9)<0.5?N9(new K7(N*0.32,N,10),_9(5208646),X,q+N*0.4+N/2,F):N9(new $9(N*0.35,12,10),_9(6986314),X,q+N*0.75,F))}}buildButton(){let J=this.button;J.add(C9(8,0.3,5,15327180,0,-0.15,0)),J.add(N9(new u0(1.25,1.4,0.7,40),_9(10133672),0,0.35,0)),J.add(N9(new L7(1,0.07,10,40),_9(5922920),0,0.72,0).rotateX(Math.PI/2));let Q=x6(512,512,($)=>{$.fillStyle="#5fae4a",$.fillRect(0,0,512,512),$.fillStyle="#f6ffe8",$.font="900 120px Fraunces, Georgia, serif",$.textAlign="center",$.fillText("LGTM",256,300)});this.cap=new d(new u0(0.92,0.92,0.32,40),[new m0({color:6270538}),new m0({map:Q}),new m0({color:5212732})]),this.cap.position.y=0.88,this.cap.rotation.y=-Math.PI/2,J.add(this.cap),J.add(C9(1.6,0.06,2.2,16513006,-2.6,0.03,0.4).rotateY(0.3)),J.add(N9(new u0(0.28,0.24,0.6,18),_9(15986662),2.5,0.3,-0.6)),J.position.set(200,0,0)}buildLoaf(){let J=this.loaf;J.add(C9(6,0.25,3.6,11040586,0,-0.12,0)),this.dough=new d(new $9(1,40,24),new RJ({color:15389344,gradientMap:dQ})),this.slop=N9(new $9(0.22,16,12),_9(8030794)),J.add(this.dough,this.slop);for(let Q=0;Q<9;Q++)J.add(N9(new $9(0.05+z0(Q)*0.05,8,6),_9(15985368),-2.4+z0(Q+1)*4.8,0.03,-1.4+z0(Q+2)*2.8));J.position.set(400,0,0)}buildCommits(){let J=this.commits;J.add(C9(10,0.2,10,14208952,0,-0.1,0));let Q=x6(512,128,($)=>{$.fillStyle="#fbf7ee",$.fillRect(0,0,512,128),$.fillStyle="#4f8a3c",$.font="700 64px 'JetBrains Mono', monospace",$.fillText("✓",24,88),$.fillStyle="#2b2633",$.font="500 44px 'JetBrains Mono', monospace",$.fillText("fix: tweak",100,82)});for(let $=0;$<12;$++){let Z=new d(new P0(2.4,0.28,1.4),[_9(15986662),_9(15986662),_9(15986662),_9(15986662),new RJ({map:Q,gradientMap:dQ}),_9(15986662)]);Z.rotation.y=(z0($)-0.5)*0.3,J.add(Z),this.cards.push(Z)}for(let $=0;$<7;$++){let Z=Array.from({length:8},(U,Y)=>e8(Math.sin(Y*1.3+$)*0.35,Y*0.6,Math.cos(Y*1.1+$)*0.2)),K=N9(new W8(new T6(Z),40,0.07,6),N8(8036938,0.7));K.position.set(-1.6+$*0.55,0,(z0($)-0.5)*1.2),J.add(K),this.fumes.push(K)}J.position.set(600,0,0)}buildCandles(){let J=this.candles,Q=400,$=40,Z=10;for(let Y=0;Y<10;Y++)J.add(C9(13,0.3,0.5,6175264,0,Y*0.32,-Y*0.5));let K=new T9(new u0(0.06,0.06,0.26,8),_9(16183264),400);this.flames=new T9(new K7(0.05,0.16,8),new m0({color:16762976}),400);for(let Y=0;Y<400;Y++){let W=Math.floor(Y/40),H=Y%40,G=e8(-6.2+H*0.32+W%2*0.16,W*0.32+0.28,-W*0.5+0.05);this.candlePos.push(G),O7.position.copy(G),O7.scale.setScalar(1),O7.updateMatrix(),K.setMatrixAt(Y,O7.matrix)}let U=[173,186,213,226];this.flameOrder=[...Array(400).keys()].filter((Y)=>!U.includes(Y)).sort((Y,W)=>z0(Y)-z0(W)).concat(U),J.add(C9(16,9,0.3,3813448,0,4,-6),K,this.flames),J.position.set(800,0,0)}buildFire(){let J=this.fire;J.add(C9(14,0.2,10,3814464,0,-0.1,0));let Q=3,$=40;this.leds=new T9(new P0(0.08,0.05,0.02),new m0({color:16777215}),Q*$);for(let U=0;U<Q;U++){J.add(C9(1.4,3.8,1.2,3028032,-2+U*1.6,1.9,-1.5));for(let Y=0;Y<$;Y++)O7.position.set(-2.4+U*1.6+Y%4*0.2,0.5+Math.floor(Y/4)*0.32,-0.88),O7.scale.setScalar(1),O7.updateMatrix(),this.leds.setMatrixAt(U*$+Y,O7.matrix)}this.fireFlames=new T9(new K7(0.35,1.4,8),new m0({color:16777215}),70);for(let U=0;U<70;U++)this.fireFlames.setColorAt(U,new W0([15769648,14704682,16175200,13123626][U%4]));for(let U=0;U<10;U++){let Y=N9(new $9(1,12,10),N8(4867152,0.35));J.add(Y),this.smoke.push(Y)}this.kneeler=MZ(2301994,{stole:g6,seed:77,skin:9263675}),this.kneeler.position.set(0.6,-0.45,2.6),this.kneeler.rotation.y=Math.PI*0.85;let Z=N9(new E9(0.9,1.2),new RJ({map:this.scrollTex,gradientMap:dQ}),0.3,0.02,1.8);Z.rotation.x=-Math.PI/2;let K=new R0;K.add(N9(new u0(0.07,0.07,0.4,8),_9(16183264),0,0.2,0),N9(new K7(0.06,0.18,8),N8(16765040),0,0.5,0)),K.position.set(-0.2,0,1.9),J.add(this.leds,this.fireFlames,this.kneeler,Z,K),J.position.set(1000,0,0)}buildTablets(){let J=this.tablets;J.add(N9(new K7(14,10,7),_9(11045474),0,-5.2,-1)),J.add(N9(new K7(30,16,7),_9(9075306),-20,-10,-40),N9(new K7(26,14,6),_9(8030874),24,-9,-46));let Q=new n7;Q.moveTo(-1,0),Q.lineTo(-1,2.2),Q.absarc(0,2.2,1,Math.PI,0,!0),Q.lineTo(1,0),Q.closePath();for(let[$,Z]of[-1.15,1.15].entries()){let K=N9(new _8(Q,{depth:0.35,bevelEnabled:!0,bevelSize:0.06,bevelThickness:0.06,bevelSegments:2}),_9(10134445),Z,0,0),U=x6(512,820,()=>{}),Y=new d(new E9(1.9,3.04),new m0({map:U,transparent:!0}));Y.position.set(0,1.62,0.43),K.add(Y),K.rotation.z=($?-1:1)*0.04,J.add(K),this.tabletTex.push(U)}for(let $=0;$<6;$++){let Z=N9(new u0(0.4,2.6,30,16,1,!0),N8(16178314,0.18),-6+$*2.4,14,-3);Z.rotation.z=($-2.5)*0.08,J.add(Z),this.rays.push(Z)}J.position.set(1200,0,0)}carve(J){if(J===this.tabletShown)return;this.tabletShown=J;let Q=[["I","Read the diff,","not the summary"],["II","Read the source,","not the blog post"],["III","No time to not","have tests"],["IV","A plan before","the fix"],["V","A·I shall not","review A·I"]];this.tabletTex.forEach(($,Z)=>{let K=$.image,U=K.getContext("2d");U.clearRect(0,0,512,820),U.textAlign="center",(Z?Q.slice(3):Q.slice(0,3)).forEach(([W,H,G],X)=>{if((Z?3:0)+X>J)return;let F=100+X*236;U.fillStyle="#1f2430",U.font="900 76px Fraunces, Georgia, serif",U.fillText(W,256,F),U.font="italic 600 60px Fraunces, Georgia, serif",U.fillText(H,256,F+70),U.fillText(G,256,F+132)}),$.needsUpdate=!0})}flash(J){return 0}fade(J){return 0}update(J){let Q=mU(J),$=Q.at,Z=rF(Q),K=J-$,U=G0(J,$,Z),Y=Q.name;for(let M of[this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets])M.visible=!1;let W=this.camera,H=e8();W.fov=40;let G=Q5[Y]??Q5.day,X=this.sky.material.uniforms;X.top.value.setHex(G[0]),X.horizon.value.setHex(G[1]),X.bottom.value.setHex(G[2]),this.hemi.color.setHex(16774368),this.hemi.groundColor.setHex(9075302),this.hemi.intensity=1.6,this.sun.intensity=1.9,this.glowLight.intensity=0;let F=gU.some(([M])=>M===Y)&&Y!=="witness",N=G9(G0(J,$,$+(F?0.45:0.8)));if($===0)N=G9(G0(J,0,1.6));N*=1-P9(R9(40)+0.6,R9(40)+1.4,J);let q=this.paint.uniforms;q.reveal.value=N,q.shotSeed.value=(pU??lQ()).indexOf(Q)*3.71%50,q.boil.value=Math.floor(J*5)*1.37;let O=Q1(J);switch(Y){case"exterior":case"pray":case"approved":case"end":{this.exterior.visible=!0;let M=Y!=="exterior";if(M)this.hemi.color.setHex(16763040),this.hemi.groundColor.setHex(4864602),this.hemi.intensity=1.2,this.sun.intensity=0.9;for(let E of this.churchWindows)E.material.color.setHex(M?16762976:9416904);let D=M?G0(J,T(39)-0.6,R9(40)+1.4):G0(J,0,H0(0,/^says/i));W.position.set(M?j(16,12,D):j(-15,-9.5,D),M?j(3,4.4,D):j(2.6,3.2,D),M?j(19,15,D):j(23,16,D)),H.set(0,M?j(4,5.5,D):4,0),W.fov=42;break}case"button":case"greenbtn":{this.button.visible=!0;let M=this.button.position,D=Y==="button"?P9(H0(4,/^l-g/i)-0.1,H0(4,/^l-g/i),J)*(1-P9(H0(4,/^l-g/i)+0.25,H0(4,/^l-g/i)+0.5,J)):0;this.cap.position.y=0.88-D*0.18;let E=Y==="greenbtn"?0.75+a7(J)*0.25:1;for(let I of this.cap.material)I.color.setScalar(1).multiplyScalar(E);if(Y==="button")W.position.set(M.x+j(1.4,0.6,U),j(4.2,3.6,U),j(4.4,3.4,U)),H.set(M.x,0.6,0);else W.position.set(M.x+j(1.2,0.5,U),j(1.9,1.6,U),j(2.4,1.9,U)),H.set(M.x,0.85,0),W.fov=36;break}case"loaf":{this.loaf.visible=!0;let M=this.loaf.position,D=T8(G0(J,$+0.3,$+1.1)),E=G9(G0(J,$+1.2,Z));this.slop.position.set(M.x*0+0.2,j(3.2,0.9,D),0.3),this.slop.visible=D<1,this.slop.position.x=0.2,this.dough.scale.set(j(1.3,2.4,E),j(0.75,1.7,E),j(1,1.6,E)),this.dough.position.set(0,j(0.6,1.3,E),0),this.dough.material.color.setHex(15389344).lerp(new W0(10135648),E*0.75);let I=j(-0.3,0.3,U);W.position.set(M.x+Math.sin(I)*6.5,j(2.4,3,U),Math.cos(I)*6.5),H.set(M.x,1.1,0);break}case"commits":{this.commits.visible=!0;let M=this.commits.position;this.cards.forEach((E,I)=>{let L=$+0.1+I*0.22,R=h9(G0(J,L,L+0.3));E.visible=J>=L,E.position.set(0,I*0.3+0.15+(1-R)*2,0)}),this.fumes.forEach((E,I)=>{let L=H0(15,/^stunk/i)-0.2+I*0.08;E.visible=J>=L,E.scale.y=G9(G0(J,L,L+1.2)),E.position.y=3.6+(J-L)*0.5%0.6,E.rotation.y=J*0.5+I});let D=j(0.5,0.1,U);W.position.set(M.x+Math.sin(D)*7.5,j(2.8,3.6,U),Math.cos(D)*7.5),H.set(M.x,1.9,0);break}case"candles":{this.candles.visible=!0;let M=this.candles.position,D=Math.round(j(400,4,G9(G0(J,H0(16,/^cleaned/i),H0(17,/^four$/i)+0.4)))),E=new Set(this.flameOrder.slice(0,400-D));this.candlePos.forEach((L,R)=>{O7.position.set(L.x,L.y+0.21,L.z);let B=E.has(R)?0.001:1+Math.sin(J*13+R)*0.15;O7.scale.set(B,B*(1+a7(J)*0.2),B),O7.updateMatrix(),this.flames.setMatrixAt(R,O7.matrix)}),this.flames.instanceMatrix.needsUpdate=!0,this.hemi.intensity=j(0.35,1.3,D/400),this.sun.intensity=0.2,this.glowLight.position.set(M.x,3,3),this.glowLight.intensity=j(2,60,D/400);let I=G0(J,$,R9(17)+0.5);W.position.set(M.x+j(-1.5,0,I),j(2.8,2,I),j(8,3.6,I)),H.set(M.x+j(-0.5,0,I),j(1.6,1.7,I),-2),W.fov=j(48,34,I);break}case"fire":{this.fire.visible=!0;let M=this.fire.position;for(let D=0;D<70;D++){let E=D%3,I=0.6+Math.sin(J*9+D*1.7)*0.25+z0(D)*0.5;O7.position.set(-2.6+E*1.6+(z0(D+1)-0.5)*1.4,3.8+I*0.5+z0(D+2)*0.6-0.4,-1.5+(z0(D+3)-0.5)*1.2),O7.scale.set(0.7+z0(D)*0.6,I*1.4,0.7+z0(D)*0.6),O7.rotation.set(0,0,Math.sin(J*5+D)*0.15),O7.updateMatrix(),this.fireFlames.setMatrixAt(D,O7.matrix)}this.fireFlames.instanceMatrix.needsUpdate=!0,O7.rotation.set(0,0,0);for(let D=0;D<120;D++)this.leds.setColorAt(D,new W0(Math.sin(J*8+D*2.3)>0.2?14699066:5904926));if(this.leds.instanceColor)this.leds.instanceColor.needsUpdate=!0;this.smoke.forEach((D,E)=>{let I=(J*0.35+E/10)%1;D.position.set(-2+E%3*1.6+Math.sin(E)*0.6,5+I*6,-1.8),D.scale.setScalar(0.8+I*2.2),D.material.opacity=0.35*(1-I)}),uQ(this.kneeler,J,0,0.02,1),this.hemi.color.setHex(16752752),this.hemi.groundColor.setHex(2761792),this.hemi.intensity=1.1,this.sun.intensity=0.4,this.glowLight.position.set(M.x-0.6,4,0),this.glowLight.intensity=50+Math.sin(J*11)*12,W.position.set(M.x+j(-3.8,-2.6,U),j(1.4,1.8,U),j(7,5.6,U)),H.set(M.x-0.4,2.2,0),W.fov=46;break}case"tablets":{this.tablets.visible=!0;let M=this.tablets.position,D=0;for(let L=27;L<=31;L++)if(J>=T(L)-0.1)D=L-27;this.carve(D),this.rays.forEach((L,R)=>{L.material.opacity=0.12+0.1*Math.sin(J*1.5+R)+a7(J)*0.05});let E=j(-0.3,0.3,D/4)+(J-T(27+D))*0.03,I=D===4?6.5:4.6;W.position.set(M.x+(D<3?-1.15:1.15)*(D===4?0:1)+Math.sin(E)*I,2.6,Math.cos(E)*I),H.set(M.x+(D<3?-1.15:1.15)*(D===4?0:1),2.3,0),W.fov=42;break}default:this.interiorShot(J,Q,H,O,U)}W.aspect=1.7777777777777777,W.updateProjectionMatrix(),W.lookAt(H),this.sky.position.copy(W.position)}interiorShot(J,Q,$,Z,K){let{name:U,at:Y}=Q,W=this.camera;this.interior.visible=!0,this.hemi.intensity=1.5;let H=U==="greenwash"?P9(Y,Y+0.6,J):0;for(let I of this.windows)I.material.color.setRGB(1,1,1).lerp(new W0(8048474),H*0.8);this.hemi.color.setHex(16774368).lerp(new W0(12120224),H*0.7);for(let I of this.choir)uQ(I,J,Z,0.06);let G=U==="bot"?P9(H0(20,/^\W*amen/i)-0.1,H0(20,/^\W*amen/i)+0.1,J):0;if(U==="bot")uQ(this.robot,J,G,0.02);this.robot.userData.extra.material.color.setHex(G>0.5?10412154:4872772);let X=U==="nobody"||U==="nine",F=U==="shipit"?P9(H0(1,/ship/i)-0.1,H0(1,/ship/i)+0.1,J):U==="lgtm"?Z:U==="witness"||U==="read"?Z*0.6:0;for(let{f:I,phone:L}of this.flock)I.visible=U!=="aisle",L.visible=X,uQ(I,J,F,X?0.01:0.03,X?1:0);let N=U==="pulpit"?h9(G0(J,Y+0.3,Y+0.8)):0;uQ(this.preacher,J,gU.some(([I])=>I===U)||U==="lgtm"?0.5+Z*0.5:0,U==="deadpan"||U==="who"?0:0.05);let q=this.preacher.userData.hands[1];if(N>0)q.position.set(0.45,j(0.95,2.3,N),0.25),K5(this.preacher.userData.arms[1],1,q.position);this.book.visible=U==="pulpit"||U==="shipit",this.book.position.copy(q.position).add(e8(0,0.25,0.05));let O=U==="scroll"?G9(G0(J,T(3)-0.2,R9(3)+0.6)):["nine","devil","aisle","nobody"].includes(U)?1:0,M=Math.max(0.01,O*26),D=-11.4;this.scroll.visible=this.roll.visible=O>0,this.scroll.scale.set(1,M,1),this.scroll.position.set(0,0.04,D+M/2),this.scrollTex.repeat.set(1,M/4),this.roll.position.set(0,0.33,D+M+0.3),this.roll.rotation.x=M/0.32,this.roll.visible=O>0&&O<1,this.glass.visible=U==="nine",this.glass.position.set(j(-0.4,0.2,K),0.9,j(-6,-4.8,K));let E=U==="devil";if(this.devil.visible=E,E){let I=h9(G0(J,Y+0.25,Y+0.75));this.devil.position.set(0.35,j(-0.9,0.05,I)+a7(J)*0.06,-5),this.devil.rotation.set(0,-0.35+Math.sin(J*3)*0.15,Math.sin(J*Math.PI*1.78)*0.12)}switch(this.laptop.visible=U==="laptop"||U==="sermon"||U==="deadpan",this.screen.material.map=U==="laptop"?this.screens.explain:this.screens.sermon,U){case"pulpit":W.position.set(j(0.8,0.3,K),j(2.4,2.6,K),j(-3,-7.5,K)),$.set(0,2.6,-13),W.fov=38;break;case"shipit":W.position.set(1.4,3.4,-10.6),$.set(0,0.9,2.5),W.fov=52;break;case"who":{let I=G0(J,Y,T(3)-0.3);W.position.set(j(0.7,0.15,I),j(2.3,2.45,I),j(-5.5,-9.9,G9(I))),$.set(0,2.35,-12.9),W.fov=j(36,28,I);break}case"scroll":{let I=D+M;W.position.set(1.4,j(3.6,4.6,K),-13.2),$.set(0,0,Math.max(-6,I-2)),W.fov=48;break}case"nine":W.position.set(j(0.9,0.5,K),3,j(-3.2,-2.4,K)),$.set(this.glass.position.x,0,this.glass.position.z-0.5),W.fov=42;break;case"devil":W.position.set(1.8,1,-1.6),$.set(0.3,0.45,-5),W.fov=36;break;case"nobody":W.position.set(j(7.5,6.5,K),j(9.5,8.5,K),j(12,10,K)),$.set(0,0,-1),W.fov=46;break;case"witness":W.position.set(0,j(4.4,3.8,K),j(11,6,K)),$.set(0,3,-15),W.fov=44;break;case"greenwash":W.position.set(j(-3.2,-2.4,K),1.3,-8),$.set(0,4.2,-17),W.fov=54;break;case"sign":W.position.set(j(7.4,6.2,K),3.1,j(-14.5,-11.5,K)),$.set(-1,2.6,-16.5),W.fov=44;break;case"aisle":W.position.set(0,j(4.2,5.2,K),-11.2),$.set(0,0,9),W.fov=50;break;case"read":W.position.set(0,j(2.6,3,K),j(-9.2,-10.6,K)),$.set(0,3,-16.5),W.fov=52;break;case"laptop":W.position.set(j(1.7,1.4,K),3.5,j(-14.2,-13.7,K)),$.set(0,2.45,-12.1),W.fov=34;break;case"bot":{let I=this.robot.position;W.position.set(I.x+j(2.6,2,K),I.y+1.9,I.z+4.2),$.set(I.x-0.3,I.y+1.5,I.z),W.fov=40;break}case"sermon":W.position.set(j(-1.5,-1.2,K),j(3.3,3.1,K),j(-13.9,-13.4,K)),$.set(0,2.45,-12.1),W.fov=32;break;case"deadpan":W.position.set(0,2.45,-9.4),$.set(0,2.38,-12.9),W.fov=26;break;case"lgtm":W.position.set(0,j(4.4,5.8,K),j(8,11.5,K)),$.set(0,2.2,-12),W.fov=46;break;default:W.position.set(0,4,10),$.set(0,2,-12)}}render(){this.composer.render()}}var dU=(J)=>`<div class="ov card sign" data-show="L${J}|L${J+1}-0.1"><div class="bar">review · required</div>
    <div class="row"><span class="box" data-at="W${J}:sign">✓</span> I have read and understood this change</div>
    <svg viewBox="0 0 520 120"><path class="draw" data-at="W${J}:sign" data-until="W${J}:comprehend+0.3" d="M10 80 C 40 20, 60 20, 70 70 S 100 110, 120 60 S 150 10, 170 70 C 180 100, 200 90, 215 55 C 230 25, 240 95, 262 70 S 300 30, 320 64 C 340 92, 370 40, 400 60 S 470 80, 510 50"/></svg>
    <div class="row muted">lines read: <b>0</b></div></div>`,U5={title:"Read the Diff",fonts:['900 100px "Fraunces"','italic 600 60px "Fraunces"','700 40px "Caveat"','500 20px "JetBrains Mono"'],overlays:()=>`
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
  ${dU(11)}${dU(24)}${dU(35)}
  <div class="ov stamp big" data-show="W38:l-g|L39-0.6" data-at="W38:l-g">LGTM</div>
  <div class="ov stamp big green" data-show="W40:approved|${R9(40)+1.2}" data-at="W40:approved">APPROVED</div>`,endAt:()=>R9(40)+1.4,words:{hot:/^(devil's|devil|fire|stunk|slop|confess|lord|nobody|no|knees|two)$/,ice:/^(diff|read|source|witness|function|commit|tests|lines|thousand|claude|sermon|p-r|a-i|bot|linter)$/,gold:/^(green|amen|l-g-t-m|lgtm|approved|ship|button|plan|church|pastor|son|brother|good|book)$/},hud:(J,Q)=>{let $=J>=T(Math.min(40,Y7.length-1));return{left:`read the diff &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`<span class="add">+3,982</span> <span class="del">−18</span> &nbsp;·&nbsp; lines read <b>0</b>${$?" &nbsp;·&nbsp; approved":""}`}},shots:lQ,shotAt:mU,world:(J)=>new uU(J)};var R7=new W0(5822207),JJ=new W0(16723285),lJ=new W0(16763213),lU=new W0(10185727),VZ=new W0(3985262),Y5=new W0(329227),WV=new W0(264212),S7=-24,nJ=4,cJ=90,A8=30,m6=(J)=>0.3*Math.pow(2,(J-S7)/nJ),X8=(J)=>S7+nJ*Math.log2(J/0.3),b7=S7-14,S9=X8(cJ);function sQ(){let J=(Q,$=!1)=>{let Z=Math.max(T(Q)-1.6,Math.min(R9(Q-1)+0.05,T(Q)-0.05));return[{name:"ride",at:Z,label:Q===47?"it doubles while we're meeting":"hold on",section:$?"chorus · hushed":"chorus",ride:{first:Q,a:Z,b:R9(Q+3)+0.4,hushed:$}},{name:Q===16?"montage":Q===47?"triple":"terrified",at:R9(Q+3)+0.4,label:Q===47?"tentative":"terrified, and thrilled",section:$?"chorus · hushed":"chorus",ride:{first:Q,a:T(Q),b:R9(Q+3),hushed:$}}]};return[{name:"intro",at:0,label:"intro",section:"intro"},{name:"prius",at:T(0)-0.08,label:"the prius",section:"verse 1"},{name:"tesla",at:T(1)-0.08,label:"hands off",section:"verse 1"},{name:"years",at:T(2)-0.08,label:"ten years out",section:"verse 1"},{name:"linear",at:T(3)-0.08,label:"linear brain",section:"verse 1"},{name:"engine",at:T(4)-0.08,label:"one shot",section:"verse 1"},{name:"waiting",at:T(6)-0.08,label:"not yet",section:"verse 1"},{name:"ceiling",at:T(7)-0.08,label:"you're the ceiling",section:"verse 1"},{name:"releases",at:T(8)-0.08,label:"every three weeks",section:"verse 1"},{name:"comet",at:T(9)-0.08,label:"flip phone, comet",section:"verse 1"},{name:"agents",at:T(10)-0.08,label:"forty agents",section:"verse 1"},{name:"eol",at:T(12)-0.08,label:"end-of-life",section:"verse 1"},{name:"standup",at:T(14)-0.08,label:"the standup",section:"verse 1"},...J(16),{name:"cab",at:T(21)-0.08,label:"change board",section:"verse 2"},{name:"kernel",at:T(23)-0.08,label:"pilot phase",section:"verse 2"},{name:"flat",at:T(25)-0.08,label:"stable! love that",section:"verse 2"},{name:"procure",at:T(27)-0.08,label:"procurement",section:"verse 2"},{name:"fab",at:T(29)-0.08,label:"out of stock",section:"verse 2"},{name:"sun",at:T(31)-0.08,label:"soc 2",section:"verse 2"},{name:"vp",at:T(33)-0.08,label:"bonus achieved",section:"verse 2"},{name:"protein",at:T(35)-0.08,label:"the use case",section:"verse 2"},...J(37),{name:"bridge",at:T(42)-0.3,label:"no quorum",section:"bridge"},{name:"premeeting",at:T(43)-0.2,label:"the pre-meeting",section:"bridge"},...J(47,!0),{name:"moved",at:T(52)-0.6,label:"moved to thursday",section:"outro"},{name:"outro",at:T(53)-0.4,label:"the curve didn't wait",section:"outro"},{name:"end",at:R9(53)+2.2,label:"the end",section:"outro"}]}var nU=null,_Z=(J)=>{let Q=nU??=sQ();return Q.filter(($)=>J>=$.at).at(-1)??Q[0]},L8=()=>H0(7,/^go/i);function QJ(J,Q,$,Z="400 %spx Anton, Impact, sans-serif"){let K=document.createElement("canvas"),U=K.getContext("2d"),Y=128;U.font=Z.replace("%s",String(128)),K.width=Math.ceil(U.measureText(J).width+76.8),K.height=Math.ceil(192),U.font=Z.replace("%s",String(128)),U.textAlign="center",U.textBaseline="middle",U.shadowColor=Q,U.shadowBlur=24,U.fillStyle=Q,U.fillText(J,K.width/2,K.height/2);let W=new _7(K);W.colorSpace=A7;let H=new BQ(new L6({map:W,color:10132122,transparent:!0,depthWrite:!1,fog:!1}));return H.scale.set($*K.width/K.height,$,1),H.userData.base=H.scale.clone(),H}var p6=(J,Q)=>J.scale.copy(J.userData.base).multiplyScalar(Math.max(0.001,Q)),nQ=(J,Q)=>new fJ({color:J,transparent:!0,opacity:Q,depthWrite:!1}),cQ=(J,Q,$=0.9)=>new K8(new w6(J),nQ(Q,$));class G5 extends y7{constructor(){super()}getPoint(J,Q=new S){let $=j(b7,S9,J);return Q.set($,m6($),0)}}var W5={intro:[461342,1194578,263692],prius:[1181478,5903944,459790],tesla:[920106,8002130,525327],years:[268322,1006182,198667],linear:[398368,1460314,198410],engine:[660518,6959124,329484],waiting:[1380138,6957630,460044],ceiling:[399402,2779786,264720],releases:[921386,3418234,394767],comet:[197903,1714794,131849],agents:[201743,1202754,133130],eol:[1182238,4856378,459787],standup:[1708556,5913120,657157],ride:[1836562,9052208,656136],montage:[2098448,10099258,787208],terrified:[2360334,10494014,787206],hushed:[265250,1458298,132623],cab:[1967628,6953508,787206],kernel:[1050656,4860538,394252],flat:[398368,1722970,198410],procure:[1314826,5917210,525834],fab:[1181734,4860554,459791],sun:[2100228,9060368,787971],vp:[399888,1727028,199174],protein:[268832,1727082,133130],bridge:[198159,990778,131848],premeeting:[657940,2763332,328968],moved:[657940,2763332,328968],outro:[263695,1712708,131848],end:[131848,526868,66052]},n0=new A9,M7=(J=0,Q=0,$=0)=>new S(J,Q,$);class cU{bodies;heads;constructor(J,Q,$){this.bodies=new T9(new Y8(0.2,0.62,4,8),new X9({color:Q,roughness:0.7}),J),this.heads=new T9(new $9(0.17,12,8),new X9({color:new W0(Q).multiplyScalar(1.2),roughness:0.7}),J),$.add(this.bodies,this.heads)}set(J,Q,$,Z,K=0,U=!1){let Y=U?-0.35:0;n0.position.set(Q,0.52*Z+Y,$),n0.rotation.set(0,0,K),n0.scale.setScalar(Z),n0.updateMatrix(),this.bodies.setMatrixAt(J,n0.matrix),n0.position.set(Q-K*0.6,1.2*Z+Y,$),n0.updateMatrix(),this.heads.setMatrixAt(J,n0.matrix)}done(){this.bodies.instanceMatrix.needsUpdate=this.heads.instanceMatrix.needsUpdate=!0}}class sU{renderer;scene=new V8;camera=new e9(40,1.7777777777777777,0.1,600);composer;bloom;fog=new yJ(Y5,0.011);sky;curveWorld=new R0;path=new G5;tube;glow;tip;beam;arc=[];floor;wall;markers=[];years=[];linear;linearTag;expoTag;flatLine;flatTag;stableTag;aiTag;crowd=new R0;crowdPeople;people=[];notYet=[];ceiling=new R0;panes;rims;shards=[];rings=[];moon;meetings;dust;dustSeed=[];road=new R0;dashes;poles;streaks;prius=new R0;tesla=new R0;engine=new R0;stages=[];core;exhaust;slabs=new R0;slab=[];approved;comet=new R0;cometHead=new R0;tail;phoneLid;agents=new R0;agentCubes;agentEdges;room=new R0;table;roomPeople;screen;boards={};fab=new R0;wafer;laser;machines;sun=new R0;sunBall;sunHalo;swarm;swarmDirs=[];protein=new R0;beads;coil=[];helix=[];globe;constructor(J){this.renderer=new n8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=Y5.clone(),this.scene.fog=this.fog,this.composer=new o8(this.renderer),this.composer.addPass(new r8(this.scene,this.camera)),this.bloom=new G8(new U0(1920,1080),1.1,0.6,0.12),this.composer.addPass(this.bloom),this.composer.addPass(new a8),this.scene.add(this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein),this.scene.add(new B8(10475775,1050640,1.2));let Q=new I8(16777215,1.6);Q.position.set(5,10,8),this.scene.add(Q),this.buildSky(),this.buildCurve(),this.buildCrowd(),this.buildCeiling(),this.buildChorus(),this.buildDust(),this.buildRoad(),this.buildEngine(),this.buildSlabs(),this.buildComet(),this.buildAgents(),this.buildRoom(),this.buildFab(),this.buildSun(),this.buildProtein()}buildSky(){this.sky=new d(new $9(450,32,16),new v9({side:N7,depthWrite:!1,fog:!1,uniforms:{top:{value:new W0},horizon:{value:new W0},bottom:{value:new W0},pulse:{value:0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; uniform float pulse; varying vec3 vDir;
        void main() {
          float y = vDir.y;
          vec3 c = y > 0.0 ? mix(horizon, top, pow(smoothstep(0.0, 0.75, y), 0.7)) : mix(horizon, bottom, smoothstep(0.0, 0.35, -y));
          c += horizon * pulse * exp(-abs(y) * 9.0) * 0.6; // the horizon band breathes with the bass
          gl_FragColor = vec4(c, 1.0);
        }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildCurve(){let J=this.path,Q=1400,$=10,Z=new W8(J,1400,0.14,10,!1),K=Z.attributes.position,U=new Float32Array(K.count*3),Y=new W0;for(let B=0;B<K.count;B++){let _=$7(Math.log2(Math.max(K.getY(B),0.04)/0.3)/8);Y.copy(R7).lerp(JJ,P9(0.15,0.7,_)).lerp(new W0(16777215),P9(0.75,1,_)*0.7),U.set([Y.r,Y.g,Y.b],B*3)}Z.setAttribute("color",new Q7(U,3)),this.tube=new d(Z,new m0({vertexColors:!0}));let W=new W8(J,1400,0.55,8,!1);this.glow=new d(W,new m0({color:JJ,transparent:!0,opacity:0.16,blending:Z7,depthWrite:!1})),this.tip=new d(new $9(0.42,24,16),new m0({color:16777215})),this.beam=new d(new u0(0.6,0.6,1,12).translate(0,0.5,0),new m0({color:16765146})),this.curveWorld.add(this.tube,this.glow,this.tip,this.beam);let H=0,G=M7(),X=M7(),F=[0];for(let B=1;B<=2000;B++)J.getPoint((B-1)/2000,G),J.getPoint(B/2000,X),H+=G.distanceTo(X),F.push(H);this.arc=F.map((B)=>B/H);let N=[];for(let B=b7-30;B<=S9+30;B+=nJ/4)N.push(B,0,-40,B,0,30);for(let B=-40;B<=30;B+=2)N.push(b7-30,0,B,S9+30,0,B);let q=new F9;q.setAttribute("position",new J9(N,3)),this.floor=new K8(q,nQ(R7,0.12));let O=[];for(let B=0;B<=8;B++){let _=0.3*2**B;O.push(b7-30,_,-3,S9+30,_,-3)}for(let B=S7;B<=S9+20;B+=nJ)O.push(B,0,-3,B,cJ+20,-3);let M=new F9;M.setAttribute("position",new J9(O,3)),this.wall=new K8(M,nQ(R7,0.1)),this.curveWorld.add(this.floor,this.wall);for(let B=1;B<=8;B++){let _=S7+nJ*B,z=new d(new $9(0.28,16,12),new m0({color:lJ}));z.position.set(_,m6(_),0),this.markers.push({x:_,dot:z}),this.curveWorld.add(z)}for(let B=0;B<=10;B++){let _=j(S7,S9,B/10),z=QJ(String(2026+B),B===10?"#ff2d55":"#58d6ff",1.4,"700 %spx 'JetBrains Mono', monospace");z.position.set(_-1.6,m6(_)+1.6,1),this.years.push({x:_,tag:z}),this.curveWorld.add(z)}let D=S7+2*nJ,E=m6(D),I=E*Math.LN2/nJ,L=new S6(M7(b7,E+I*(b7-D),0),M7(S9+6,E+I*(S9+6-D),0));this.linear=new d(new W8(L,200,0.1,8,!1),new m0({color:9081766,transparent:!0})),this.linearTag=QJ("LINEAR BRAIN","#8a93a6",2.6),this.linearTag.position.set(S9-2,E+I*(S9-2-D)+2.4,1),this.expoTag=QJ("EXPONENTIAL PLANE","#ff2d55",3.4),this.expoTag.position.set(X8(42)-15,42,1);let R=new S6(M7(b7,0.6,1.5),M7(S9+14,0.6,1.5));this.flatLine=new d(new W8(R,200,0.12,8,!1),new m0({color:9081766})),this.flatTag=QJ("OUR ROLLOUT","#8a93a6",2.2),this.flatTag.position.set(S9+4,2.2,1.5),this.stableTag=QJ("STABLE! ♥","#3ccf6e",3),this.stableTag.position.set(S9+4,5.4,1.5),this.aiTag=QJ("THE A-I CURVE","#ff2d55",3),this.aiTag.position.set(X8(36)-9,36,1),this.curveWorld.add(this.linear,this.linearTag,this.expoTag,this.flatLine,this.flatTag,this.stableTag,this.aiTag)}buildCrowd(){this.crowdPeople=new cU(90,8160921,this.crowd);for(let Q=0;Q<90;Q++)this.people.push({x:b7-8+z0(Q)*22,z:-1+z0(Q+50)*10,h:0.85+z0(Q+99)*0.3,ph:z0(Q+7)*6.28});for(let Q=0;Q<7;Q++){let $=this.people[Q*11],Z=QJ(Q%2?"NOT YET":"NO","#ffc94d",1.1);Z.position.set($.x,2.2*$.h+3.2+z0(Q+31)*2,$.z),this.notYet.push(Z),this.crowd.add(Z)}this.curveWorld.add(this.crowd)}buildCeiling(){let Q=[];for(let U=0;U<26;U++)for(let Y=0;Y<34;Y++)Q.push(M7(X8(A8)-34+Y*1.1*1.75+U%2*1.1*0.875,A8,-16+U*1.1*1.52));let $=new E7(1.056,6).rotateX(-Math.PI/2),Z=new LQ(0.9900000000000001,1.078,6).rotateX(-Math.PI/2);this.panes=new T9($,new m0({color:R7,transparent:!0,opacity:0.1,side:o9,depthWrite:!1,blending:Z7}),Q.length),this.rims=new T9(Z,new m0({color:R7,transparent:!0,opacity:0.55,side:o9,depthWrite:!1}),Q.length);let K=M7(X8(A8),A8,0);Q.forEach((U,Y)=>{let W=U.clone().sub(K).setY(0),H=W.length();W.normalize().multiplyScalar(4+z0(Y)*10+30/(H+2)),W.y=6+z0(Y+3)*16+40/(H+2),this.shards.push({p:U,v:W,axis:M7(z0(Y+5)-0.5,z0(Y+6)-0.5,z0(Y+7)-0.5).normalize(),spin:3+z0(Y+8)*8,delay:H*0.018})}),this.ceiling.add(this.panes,this.rims),this.curveWorld.add(this.ceiling)}buildChorus(){for(let J=0;J<12;J++){let Q=new d(new L7(1,0.05,8,64),new m0({color:JJ,transparent:!0,depthWrite:!1,blending:Z7}));this.rings.push(Q),this.curveWorld.add(Q)}this.moon=new d(new $9(9,32,24),new m0({color:13624063,fog:!1,transparent:!0})),this.moon.position.set(-40,70,-160),this.curveWorld.add(this.moon),this.meetings=new T9(new P0(1.5,0.12,2.2),new m0({color:5078271,transparent:!0,opacity:0.85}),512);for(let J=0;J<512;J++)n0.position.set(S7-4+z0(J+900)*52,1+z0(J+1900)*70,-2.4),n0.rotation.set(Math.PI/2,0,0),n0.scale.setScalar(1),n0.updateMatrix(),this.meetings.setMatrixAt(J,n0.matrix);this.curveWorld.add(this.meetings)}buildDust(){let Q=new Float32Array(4800);for(let Z=0;Z<1600;Z++)this.dustSeed.push(z0(Z*3),z0(Z*3+1),z0(Z*3+2));let $=new F9;$.setAttribute("position",new Q7(Q,3)),this.dust=new U8($,new c7({color:9427199,size:0.12,transparent:!0,opacity:0.6,depthWrite:!1,blending:Z7})),this.scene.add(this.dust)}buildRoad(){let J=new d(new E9(16,600).rotateX(-Math.PI/2),new X9({color:724244,roughness:0.6,metalness:0.3}));J.position.z=-250,this.road.add(J),this.dashes=new T9(new P0(0.16,0.02,2.6),new m0({color:14674165}),100);for(let $ of[-5.4,5.4]){let Z=new d(new P0(0.14,0.02,600),new m0({color:R7}));Z.position.set($,0.01,-250),this.road.add(Z)}this.poles=new T9(new P0(0.12,0.12,0.8),new m0({color:lJ}),48),this.streaks=new T9(new P0(0.03,0.03,9),new m0({color:13627391,transparent:!0,blending:Z7,depthWrite:!1}),120),this.road.add(this.dashes,this.poles,this.streaks);let Q=($,Z,K)=>{let U=new R0,Y=new X9({color:$,roughness:K?0.25:0.7,metalness:K?0.8:0.2}),W=new P0(1.9,0.55,K?4.7:4.2),H=new P0(1.55,0.5,K?2.6:2);for(let[X,F,N]of[[W,0.5,0],[H,1.02,K?0.1:0.35]]){let q=new d(X,Y);q.position.set(0,F,N);let O=cQ(X,Z,K?0.95:0.8);O.position.copy(q.position),U.add(q,O)}let G=new d(new P0(K?1.8:0.4,0.09,0.05),new m0({color:K?JJ:new W0(8002088)}));if(G.position.set(0,0.66,(K?4.7:4.2)/2+0.01),U.add(G),!K){let X=G.clone();G.position.x=-0.65,X.position.x=0.65,U.add(X)}for(let X of[-0.85,0.85]){let F=new d(new u0(0.34,0.34,0.24,18).rotateZ(Math.PI/2),new X9({color:328967}));for(let N of[-1.3,1.3]){let q=F.clone();q.position.set(X,0.34,N),U.add(q)}}return U};this.prius=Q(7109260,R7,!1),this.tesla=Q(855828,new W0(16777215),!0),this.road.add(this.prius,this.tesla)}buildEngine(){let J=new K8(new wQ(new u0(3.1,2.6,7,36,5,!0).rotateX(Math.PI/2)),nQ(R7,0.28));J.position.z=-2.5,this.engine.add(J);let Q=(Y,W,H,G,X,F,N)=>{let q=new R0,O=new P0(0.07,G,0.55).translate(0,H-G/2,0),M=new T9(O,new X9({color:X,roughness:0.35,metalness:0.85,emissive:X,emissiveIntensity:0.15}),W);for(let D=0;D<W;D++)n0.rotation.set(0,0,D/W*Math.PI*2),n0.rotateY(N),n0.position.set(0,0,0),n0.scale.setScalar(1),n0.updateMatrix(),M.setMatrixAt(D,n0.matrix);q.add(M),q.position.z=Y,this.engine.add(q),this.stages.push({g:q,speed:F})};Q(0.6,24,2.85,2.2,new W0(12109526),1,0.55),Q(-1,40,2.1,1.3,new W0(7324648),-1.6,-0.4),Q(-1.9,44,1.85,1.1,new W0(15235695),2.1,0.4),Q(-2.7,48,1.6,0.9,new W0(16731486),-2.6,-0.4);let $=new d(new K7(0.75,1.5,32).rotateX(Math.PI/2),new X9({color:14673646,metalness:0.9,roughness:0.2}));$.position.z=1.4,this.core=new d(new $9(1.3,24,16),new m0({color:JJ,transparent:!0,blending:Z7,depthWrite:!1})),this.core.position.z=-5.5;let Z=900,K=new Float32Array(Z*3),U=new F9;U.setAttribute("position",new Q7(K,3)),this.exhaust=new U8(U,new c7({color:16747100,size:0.18,transparent:!0,depthWrite:!1,blending:Z7})),this.engine.add($,this.core,this.exhaust)}buildSlabs(){let J=0;for(let $=0;$<12;$++){let Z=0.7*1.42**$,K=1.4+$*0.12,U=new P0(K,Z,K).translate(0,Z/2,0),Y=new d(U,new X9({color:1317414,roughness:0.4,metalness:0.6,transparent:!0})),W=cQ(U,R7,0.9),H=QJ(`v${$+1}`,"#58d6ff",1.2+$*0.12,"700 %spx 'JetBrains Mono', monospace");H.position.set(0,Z+1.2,0);let G=new R0;G.add(Y,W,H),G.position.x=J,this.slabs.add(G),this.slab.push({g:G,mesh:Y,edge:W,tag:H,x:J,h:Z}),J+=K+1.6}this.approved=QJ("APPROVED","#3ccf6e",1.6),this.slabs.add(this.approved);let Q=new MJ(200,100,1784402,924971);Q.position.x=40,this.slabs.add(Q)}buildComet(){let J=new d(new AQ(1.1,2),new m0({color:16777215})),Q=new d(new $9(2.2,24,16),new m0({color:R7,transparent:!0,opacity:0.25,blending:Z7,depthWrite:!1})),$=new R0,Z=new d(new P0(0.7,0.08,1.2),new X9({color:3817290,metalness:0.6}));Z.position.z=0.6,this.phoneLid=new R0;let K=new d(new P0(0.7,0.08,1.2),new X9({color:3817290,metalness:0.6}));K.position.z=-0.6;let U=new d(new E9(0.5,0.8),new m0({color:8257456}));U.rotation.x=-Math.PI/2,U.position.set(0,0.05,-0.6),this.phoneLid.add(K,U),$.add(Z,this.phoneLid),$.scale.setScalar(2.4),$.position.set(0,1.9,1.4),$.rotation.set(0.3,0,0.2);let Y=new d(new L7(1.16,0.06,6,40),new m0({color:lJ}));Y.rotation.y=Math.PI/2,this.cometHead.add(J,Q,$,Y);let W=1400,H=new Float32Array(W*3),G=new F9;G.setAttribute("position",new Q7(H,3)),this.tail=new U8(G,new c7({color:11069183,size:0.22,transparent:!0,depthWrite:!1,blending:Z7})),this.comet.add(this.cometHead,this.tail)}buildAgents(){let J=new P0(1,1,1);this.agentCubes=new T9(J,new m0({color:16777215}),40),this.agentEdges=new T9(new P0(1.12,1.12,1.12),new m0({color:R7,wireframe:!0,transparent:!0,opacity:0.6}),40);let Q=new d(new P0(3,2,0.2),new m0({color:858642})),$=cQ(new P0(3,2,0.2),VZ);Q.position.set(0,1.2,0),$.position.copy(Q.position);let Z=new MJ(80,40,1784402,924971);this.agents.add(this.agentCubes,this.agentEdges,Q,$,Z)}buildRoom(){this.table=new R0;let J=new d(new P0(9,0.15,3),new X9({color:1711398,roughness:0.3,metalness:0.5}));J.position.y=0.95;let Q=cQ(new P0(9,0.15,3),R7,0.5);Q.position.copy(J.position),this.table.add(J,Q),this.roomPeople=new cU(12,8160921,this.room),this.screen=new d(new E9(9,5.1),new m0({color:16777215}));let $=(K,U,Y)=>{let W=document.createElement("canvas");W.width=1024,W.height=580;let H=W.getContext("2d");H.fillStyle="#0b1020",H.fillRect(0,0,1024,580),H.fillStyle=U,H.fillRect(0,0,1024,96),H.font="400 64px Anton, Impact, sans-serif",H.fillStyle="#05060b",H.fillText(K.toUpperCase(),40,74),H.font="700 46px 'JetBrains Mono', monospace",Y.forEach((X,F)=>{H.fillStyle=X.startsWith("!")?U:"#e8ecf5",H.fillText(X.replace(/^!/,""),48,180+F*84)});let G=new _7(W);return G.colorSpace=A7,G};this.boards={standup:$("Daily standup","#58d6ff",["Yesterday: tickets","Today: tickets","Blockers: none","!AOB: the singularity?"]),cab:$("Change Advisory Board","#ff2d55",["Agenda","1. Review: end of man","2. Rollback plan?","!Status: CHANGE REQUEST"]),vp:$("Q3 AI update","#3ccf6e",["You're crushing it! \uD83D\uDE80","Adoption: 3 seats","Next: a committee","!BONUS ACHIEVED"]),premeeting:$("Pre-meeting","#9b6bff",["Plan the meeting","about how far ahead","we are","!Accept · Decline · Tentative"]),tentative:$("Pre-meeting","#9b6bff",["Plan the meeting","Your reply:","!✓ Tentative"]),moved:$("Pre-meeting","#ffc94d",["!Moved to Thursday","Attendees: 0","The curve: not invited"])},this.screen.position.set(-6.4,3.2,0),this.screen.rotation.y=Math.PI/2;let Z=new MJ(60,30,2761266,1446428);this.room.add(this.table,this.screen,Z)}buildFab(){let J=document.createElement("canvas");J.width=J.height=512;let Q=J.getContext("2d"),$=Q.createRadialGradient(256,256,20,256,256,256);$.addColorStop(0,"#5b4a8a"),$.addColorStop(0.6,"#2b6f8a"),$.addColorStop(1,"#7a3f6a"),Q.fillStyle=$,Q.fillRect(0,0,512,512),Q.strokeStyle="rgba(255,255,255,.35)";for(let Y=0;Y<=512;Y+=32)Q.beginPath(),Q.moveTo(Y,0),Q.lineTo(Y,512),Q.moveTo(0,Y),Q.lineTo(512,Y),Q.stroke();let Z=new _7(J);Z.colorSpace=A7,this.wafer=new d(new E7(4,64).rotateX(-Math.PI/2),new m0({map:Z})),this.wafer.position.y=0.2,this.laser=new d(new u0(0.08,0.08,14,12).translate(0,7,0),new m0({color:lU,transparent:!0,blending:Z7,depthWrite:!1}));let K=cQ(new P0(12,9,9).translate(0,4.5,0),lU,0.4);this.machines=new T9(new P0(2.4,2.4,2.4),new m0({color:16777215}),70);for(let Y=0;Y<70;Y++)n0.position.set(-30+Y%14*4.4,1.2,-14-Math.floor(Y/14)*4.4),n0.rotation.set(0,0,0),n0.scale.setScalar(1),n0.updateMatrix(),this.machines.setMatrixAt(Y,n0.matrix);let U=new MJ(120,60,2760516,1380130);this.fab.add(this.wafer,this.laser,K,this.machines,U)}buildSun(){this.sunBall=new d(new $9(6,48,32),new m0({color:16765562,fog:!1}));let J=document.createElement("canvas");J.width=J.height=256;let Q=J.getContext("2d"),$=Q.createRadialGradient(128,128,30,128,128,128);$.addColorStop(0,"rgba(255,200,90,1)"),$.addColorStop(1,"rgba(255,120,40,0)"),Q.fillStyle=$,Q.fillRect(0,0,256,256),this.sunHalo=new BQ(new L6({map:new _7(J),transparent:!0,depthWrite:!1,blending:Z7,fog:!1})),this.sunHalo.scale.set(34,34,1);let Z=700;this.swarm=new T9(new E7(0.7,6),new X9({color:658450,metalness:0.9,roughness:0.3,side:o9,emissive:1714746}),Z);for(let K=0;K<Z;K++){let U=1-2*(K+0.5)/Z,Y=Math.sqrt(1-U*U),W=K*2.39996;this.swarmDirs.push(M7(Math.cos(W)*Y,U,Math.sin(W)*Y))}this.sun.add(this.sunHalo,this.sunBall,this.swarm)}buildProtein(){this.beads=new T9(new $9(0.32,12,8),new m0({color:16777215}),160);let Q=new W0,$=M7(-12,0,0);for(let K=0;K<160;K++){this.beads.setColorAt(K,Q.setHSL(0.55+K/160*0.45,0.8,0.32)),$=$.clone().add(M7(0.15+z0(K)*0.1,(z0(K+1)-0.5)*0.5,(z0(K+2)-0.5)*0.5)),this.coil.push($);let U=K*0.62;this.helix.push(M7(Math.cos(U)*2.6,-6+K*0.075,Math.sin(U)*2.6))}this.globe=new K8(new wQ(new $9(4.5,24,16)),nQ(VZ,0.35)),this.globe.position.set(9,1,-4);let Z=new MJ(80,40,1784402,924971);Z.position.y=-7,this.protein.add(this.beads,this.globe,Z)}drawX(J,Q){let $=j(b7,X8(12),G9(G0(J,0.4,T(0)-0.2))*0.85+G0(J,0.4,T(0)-0.2)*0.15);if(Q==="intro")return $;if(Q==="years")return j(X8(12),S9,T8(G0(J,T(2),T(3)-0.3)));if(Q==="ceiling")return J<L8()?X8(A8)-0.05:j(X8(A8),S9,G9(G0(J,L8(),L8()+0.9)));return S9}setDraw(J){let Q=$7(Math.round((J-b7)/(S9-b7)*2000),0,2000),$=this.arc[Q]??1;for(let Z of[this.tube,this.glow]){let K=Z.geometry.parameters.tubularSegments,U=Z.geometry.parameters.radialSegments;Z.geometry.setDrawRange(0,Math.floor($*K)*U*6)}this.tip.position.set(J,m6(J),0)}flash(J){let Q=0;for(let Z of(nU??=sQ()).slice(1)){if(Z.name==="terrified"||Z.name==="end")continue;let K=Z.name==="bridge"||Z.name==="outro"?0:Z.name==="ride"?0.6:0.35;if(J>=Z.at)Q=Math.max(Q,Math.exp(-(J-Z.at)*8)*K)}if(J>=L8())Q=Math.max(Q,Math.exp(-(J-L8())*6)*0.8);let $=_Z(J);if($.name==="triple"){for(let Z of[H0(51,/^thrilled/i),H0(51,/^tentative/i)])if(J>=Z)Q=Math.max(Q,Math.exp(-(J-Z)*9)*0.4)}if($.name==="montage"){let Z=S8()*4;Q=Math.max(Q,Math.exp(-((J-$.at)%Z)*9)*0.45)}return Q}fade(J){return P9(R9(53)+0.6,R9(53)+2.2,J)}update(J){let Q=_Z(J),$=Q.at,Z=J-$;for(let O of[this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein])O.visible=!1;let K=DY(J),U=a7(J),Y=["bridge","premeeting","moved","outro","end"].includes(Q.name)||!!Q.ride?.hushed;this.bloom.strength=(Y?0.7:0.85)+K*(Y?0.3:0.55)+(Q.name==="ceiling"?this.flash(J)*0.6:0);let[W,H,G]=(W5[Q.name==="ride"||Q.name==="terrified"?Q.ride?.hushed?"hushed":Q.name:Q.name]??W5.intro).map((O)=>new W0(O));this.sky.material.uniforms.top.value.copy(W),this.sky.material.uniforms.horizon.value.copy(H),this.sky.material.uniforms.bottom.value.copy(G),this.sky.material.uniforms.pulse.value=K,this.scene.background.copy(G),this.fog.color.copy(H).lerp(G,0.55),this.fog.density=0.011;let X=this.camera,F=M7();X.fov=40;let N=this.dust.geometry.attributes.position;for(let O=0;O<N.count;O++){let[M,D,E]=[this.dustSeed[O*3],this.dustSeed[O*3+1],this.dustSeed[O*3+2]];N.setXYZ(O,-70+M*110,(D*90+J*(0.4+E))%90,-50+E*70)}switch(N.needsUpdate=!0,this.dust.material.opacity=0.35+K*0.4,Q.name){case"intro":case"years":case"linear":case"waiting":case"ceiling":case"flat":case"ride":case"terrified":case"bridge":case"outro":case"end":this.curveShot(J,Q,F,K,U);break;case"prius":case"tesla":this.roadShot(J,Q,F,K);break;case"engine":this.engineShot(J,$,F,K);break;case"releases":case"eol":case"procure":this.slabShot(J,Q,F,U);break;case"comet":this.cometShot(J,Z,F);break;case"agents":case"kernel":this.agentShot(J,Q,F,U);break;case"standup":case"cab":case"vp":case"premeeting":case"moved":this.roomShot(J,Q,F,U);break;case"triple":if(J<H0(51,/^thrilled/i)-0.05)this.curveShot(J,{...Q,name:"terrified"},F,K,U);else if(J<H0(51,/^tentative/i)-0.05)this.engineShot(J,H0(51,/^thrilled/i)-2.5,F,K);else this.roomShot(J,Q,F,U);break;case"montage":{let O=S8()*4,M=Math.floor((J-$)/O),D=$+M*O,E=["engine","comet","agents","fab","sun","releases"][M%6];if(E==="engine")this.engineShot(J,D-2,F,K);else if(E==="comet")this.cometShot(J,J-D,F);else if(E==="agents")this.agentShot(J,{...Q,name:"agents",at:D},F,U);else if(E==="fab")this.fabShot(J,J-D,F,K);else if(E==="sun")this.sunShot(J,F,K);else this.slabShot(J,{...Q,name:"releases",at:D-3},F,U);break}case"fab":this.fabShot(J,Z,F,K);break;case"sun":this.sunShot(J,F,K);break;case"protein":this.proteinShot(J,F);break}let q=Y?0.03:0.12;X.position.x+=(z0(Math.floor(J*30))-0.5)*U*q,X.position.y+=(z0(Math.floor(J*30)+1)-0.5)*U*q,X.updateProjectionMatrix(),X.lookAt(F),this.sky.position.copy(X.position)}curveShot(J,Q,$,Z,K){let U=this.camera,Y=Q.at,W=Q.name;this.curveWorld.visible=!0;let H=this.drawX(J,W);this.setDraw(H),this.tip.scale.setScalar(1+K*0.6),this.tip.visible=H<S9-0.1||W==="outro"||W==="end",this.beam.visible=!1;let G=!!Q.ride?.hushed||W==="bridge"||W==="outro"||W==="end";this.tube.material.color.set(G?10275071:16777215),this.glow.material.color.copy(G?R7:JJ),this.floor.material.opacity=0.08+K*0.1+Z*0.06,this.wall.material.opacity=(W==="intro"?P9(0.5,4,J):1)*(0.07+K*0.06);for(let q of this.markers){let O=h9(G0(H,q.x,q.x+1.2));q.dot.scale.setScalar(Math.max(0.001,O*(1+K*0.4)))}this.years.forEach((q,O)=>{q.tag.visible=W==="years",p6(q.tag,h9(G0(J,T(2)+O*0.18,T(2)+O*0.18+0.3))*(O===10?1.6:1))});let X=W==="linear";if(this.linear.visible=this.linearTag.visible=this.expoTag.visible=X,X){let q=this.linear.geometry.parameters.tubularSegments*8*6;this.linear.geometry.setDrawRange(0,Math.floor(G9(G0(J,Y,H0(3,/^brain/i)+0.3))*q)),this.linearTag.material.opacity=P9(H0(3,/^brain/i),H0(3,/^brain/i)+0.3,J),this.expoTag.material.opacity=P9(H0(3,/^expo/i),H0(3,/^expo/i)+0.3,J)}let F=W==="flat";if(this.flatLine.visible=this.flatTag.visible=this.stableTag.visible=this.aiTag.visible=F,F){p6(this.aiTag,h9(G0(J,H0(25,/^curve/i),H0(25,/^curve/i)+0.3))),p6(this.flatTag,h9(G0(J,H0(25,/^flat/i),H0(25,/^flat/i)+0.3))),p6(this.stableTag,h9(G0(J,H0(26,/^stable/i),H0(26,/^stable/i)+0.3))*(1+K*0.15));let q=this.flatLine.geometry.parameters.tubularSegments*8*6;this.flatLine.geometry.setDrawRange(0,Math.floor(G9(G0(J,H0(25,/^our/i)-0.2,H0(25,/^flat/i)+0.3))*q))}if(this.crowd.visible=W==="waiting",this.crowd.visible)this.people.forEach((q,O)=>this.crowdPeople.set(O,q.x,q.z,q.h,Math.sin(J*1.3+q.ph)*0.05)),this.crowdPeople.done(),this.notYet.forEach((q,O)=>{let M=(O%2?H0(6,/^not/i):H0(6,/^no\W*$/i))+O*0.07;p6(q,h9(G0(J,M,M+0.25)))});if(this.ceiling.visible=W==="ceiling",this.ceiling.visible){let q=L8(),O=J<q?P9(Y,q,J)*0.04:0;this.shards.forEach((M,D)=>{let E=Math.max(0,J-q-M.delay);n0.position.copy(M.p).addScaledVector(M.v,E),n0.position.y-=9*E*E,n0.position.y+=Math.sin(J*40+D)*O,n0.quaternion.setFromAxisAngle(M.axis,E*M.spin),n0.scale.setScalar(1),n0.updateMatrix(),this.panes.setMatrixAt(D,n0.matrix),this.rims.setMatrixAt(D,n0.matrix)}),this.panes.instanceMatrix.needsUpdate=this.rims.instanceMatrix.needsUpdate=!0,this.rims.material.opacity=0.35+K*0.3+(J>=q?0.2:0),this.rims.material.color.copy(R7).lerp(new W0(16777215),J>=q?0.6:0)}let N=Q.ride;for(let q of this.rings)q.visible=!1;if(this.moon.visible=!1,this.meetings.visible=!1,N){let q=S8(),O=tJ(J);this.rings.forEach((M,D)=>{let E=D*q+((J-O*q)%q+q)%q;if(E>3||O-D<0)return;let I=this.rideU(J-E,N.a,N.b);M.visible=!0,M.position.copy(this.path.getPointAt(I)),M.quaternion.setFromUnitVectors(M7(0,0,1),this.path.getTangentAt(I)),M.scale.setScalar(0.6+E*7),M.material.opacity=Math.exp(-E*1.6)*0.9,M.material.color.copy(N.hushed?R7:D%2?JJ:lJ)})}if(W==="intro"){let q=G9(G0(J,0,T(0)));U.position.set(j(b7+2,S7+8,q),j(0.9,7.5,q),j(7,34,q)),$.set(j(b7+8,S7+12,q),j(0.4,6,q),0)}else if(W==="years"){let q=m6(this.drawX(J,"years"));$.set(j(S7+14,S9-6,G0(J,Y,T(3))),Math.min(q,60)*0.55+2,0),U.position.set($.x-10,$.y*0.5+2,30+Math.min(q,60)*0.55)}else if(W==="linear"){let q=G9(G0(J,Y,T(4)));U.position.set(-10,15,j(84,74,q)),$.set(-8,13,0)}else if(W==="waiting"){let q=G0(J,Y,T(7));U.position.set(b7-12+q*3,3.2,16-q*3),$.set(S7+4,6+q*3,0)}else if(W==="ceiling"){let q=L8(),O=G9(G0(J,q,q+1.6));U.position.set(X8(A8)-16,j(20,26,O),j(34,46,O)),$.set(X8(A8)+j(0,2,O),j(A8-3,A8+22,O),0)}else if(W==="flat"){let q=G9(G0(J,Y,T(27)));U.position.set(j(S9-30,S9-18,q),22,j(78,70,q)),$.set(S9-10,24,0)}else if(W==="ride"&&N){let q=T(N.first),O=N.first+2;if(this.fog.density=0.011+0.07*H5(J,T(O),T(O+1)-0.1,0.4,0.3),this.moon.visible=!0,this.moon.material.opacity=H5(J,T(N.first+1)-0.3,T(O)-0.2,0.5,0.5),this.meetings.visible=N.hushed,N.hushed)this.meetings.count=Math.min(512,2**Math.max(0,Math.floor((J-q)/(S8()*2))));let M=this.rideU(J,N.a,N.b),D=this.path.getPointAt(M),E=this.path.getPointAt(Math.min(1,M+0.04)),I=J<T(N.first+1)-0.2?0:J<T(O)-0.2?1:J<T(O+1)-0.2?2:3;if(I===1){let L=G0(J,T(N.first+1)-0.2,T(O)-0.2);U.position.set(j(S7-10,S7-4,L),2.5,j(58,48,L)),$.set(S7+18,j(18,24,L),0),U.fov=50}else if(I===3){let L=G0(J,T(O+1)-0.2,N.b),R=j(-0.5,0.6,L);U.position.set(S9-9+Math.sin(R)*6,1.2,Math.cos(R)*8),$.set(S9-1,j(30,70,G9(L)),0),U.fov=72}else{let L=P9(0.35,0.8,M);U.position.set(D.x-j(2.5,9,L),D.y+j(1.4,-3,L),(N.hushed?7:4.5)+L*12),$.copy(E).setZ(0),U.fov=N.hushed?46:58}}else if(W==="terrified"&&N){let q=G0(J,Y,Z1(Q)),O=j(-0.9,1.4,G9(q)),M=N.hushed?48:j(26,40,q);U.position.set(S9+Math.sin(O)*M,j(78,46,q),Math.cos(O)*M),$.set(S9-3,j(70,40,q),0),U.fov=48,this.fog.density=0.004}else if(W==="bridge"){let q=G0(J,Y,T(47));U.position.set(j(S9-60,S9-40,q),j(20,30,q),j(110,80,q)),$.set(S9-10,35,0),this.fog.density=0.005}else{let q=T(53)+0.6,O=T8(G0(J,q,R9(53)+1.8)),M=j(cJ,cJ+600,O);this.tip.position.set(S9,M,0),this.beam.visible=M>cJ+0.5,this.beam.position.set(S9,cJ,0),this.beam.scale.set(1,M-cJ,1),U.position.set(S9-50,18,95),$.set(S9-12,j(36,80,G9(G0(J,q,R9(53)+2.2))),0),this.fog.density=0.004}}rideU(J,Q,$){let Z=G0(J,Q,$);return j(0.05,0.985,Z*Z*0.35+G9(Z)*0.65)}roadShot(J,Q,$,Z){let K=this.camera,U=Q.at,Y=J-U;this.road.visible=!0;let W=Q.name==="tesla";this.prius.visible=!W,this.tesla.visible=W;let H=W?46:15,G=Y*H%6;for(let F=0;F<2;F++)for(let N=0;N<50;N++)n0.position.set(F?1.8:-1.8,0.01,12-N*6+G),n0.rotation.set(0,0,0),n0.scale.setScalar(1),n0.updateMatrix(),this.dashes.setMatrixAt(F*50+N,n0.matrix);let X=Y*H%16;for(let F=0;F<2;F++)for(let N=0;N<24;N++)n0.position.set(F?7.5:-7.5,3.2,12-N*16+X),n0.updateMatrix(),this.poles.setMatrixAt(F*24+N,n0.matrix);for(let F=0;F<120;F++){let N=15-(Y*90+z0(F)*260)%260;n0.position.set((z0(F+1)-0.5)*30,0.4+z0(F+2)*7,N),n0.updateMatrix(),this.streaks.setMatrixAt(F,n0.matrix)}if(this.dashes.instanceMatrix.needsUpdate=this.poles.instanceMatrix.needsUpdate=this.streaks.instanceMatrix.needsUpdate=!0,this.streaks.material.opacity=W?0.25+Z*0.5:0,W){this.tesla.position.set(0,0,0),this.tesla.rotation.set(0,0,0);let F=G9(G0(J,U,T(2))),N=j(1.15,0.12,F);K.position.set(Math.sin(N)*11,j(1.2,2.8,F),Math.cos(N)*11-1.2),$.set(0,0.7,-2.5)}else{let F=1.15*Math.sin(Y*2.2)+0.45*Math.sin(Y*5.1+1),N=2.53*Math.cos(Y*2.2)+2.295*Math.cos(Y*5.1+1);this.prius.position.set(F,0,0),this.prius.rotation.set(0,-N*0.06,N*0.01),K.position.set(F*0.35+1.2,2.8,8.5),$.set(F*0.5,0.6,-8)}}engineShot(J,Q,$,Z){let K=this.camera,U=J-Q;this.engine.visible=!0;let Y=U*(5+U*2.2);for(let X of this.stages)X.g.rotation.z=Y*X.speed;this.core.scale.setScalar(0.8+Z*0.8),this.core.material.opacity=0.5+Z*0.5;let W=this.exhaust.geometry.attributes.position;for(let X=0;X<W.count;X++){let F=(U*(0.8+z0(X)*0.6)+z0(X+1))%1,N=(0.3+F*2.2)*Math.sqrt(z0(X+2)),q=z0(X+3)*6.283+U*3;W.setXYZ(X,Math.cos(q)*N,Math.sin(q)*N,-5-F*28)}W.needsUpdate=!0,this.exhaust.material.opacity=0.4+Z*0.6;let H=G9(G0(J,Q,T(6))),G=j(0.65,2.2,H);K.position.set(Math.sin(G)*13,j(2.5,4,H),Math.cos(G)*13),$.set(0,0,j(0,-4,H))}slabShot(J,Q,$,Z){let K=this.camera,U=Q.at;this.slabs.visible=!0,this.approved.visible=Q.name==="procure";let Y=new W0(3817552);this.slab.forEach((X,F)=>{let N=1,q=R7,O=0,M=0.9;if(Q.name==="releases"){let D=U+0.15+F*((R9(8)-U)/12);N=h9(G0(J,D,D+0.25)),q=F===Math.floor((J-U-0.15)/((R9(8)-U)/12))?JJ:R7}else if(Q.name==="eol"){let D=H0(12,/^live/i);if(N=F<11?1:h9(G0(J,D-0.2,D+0.15)),q=F===11?J>=D?JJ:R7:F===10?lJ:Y,F===10)q=J>=H0(13,/^end/i)?Y:lJ;let E=H0(13,/^end/i)+(10-F)*0.06;O=F<11?T8(G0(J,E,E+0.7)):0,M=F<11?0.5:1}else N=1,q=F===3?J>=H0(28,/^four/i)?VZ:Y:F===8?J>=H0(28,/^nine/i)?lJ:Y:Y,M=F===8&&J>=H0(28,/^nine/i)?1:0.6;X.g.scale.set(1,Math.max(0.001,N),1),X.g.rotation.z=-O*1.45,X.g.position.y=-O*0.5,X.edge.material.color.copy(q),X.edge.material.opacity=M*(0.6+Z*0.4),X.tag.material.color.copy(q).multiplyScalar(0.7),X.tag.visible=N>0.3,X.mesh.material.emissive=q.clone().multiplyScalar(F===8&&Q.name==="procure"&&J>=H0(28,/^nine/i)?0.5:0.05)});let W=this.slab[3],H=this.slab[8],G=this.slab[11];if(Q.name==="procure"){this.approved.position.set(W.x,W.h+3,0),p6(this.approved,h9(G0(J,H0(27,/^nod/i),H0(27,/^nod/i)+0.3)));let X=G9(G0(J,H0(28,/^nine/i)-0.3,H0(28,/^nine/i)+1));K.position.set(j(W.x+2,H.x-4,X),j(4,H.h*0.6,X),j(14,26,X)),$.set(j(W.x,H.x,X),j(W.h*0.6,H.h*0.7,X),0)}else if(Q.name==="releases"){let X=G0(J,U,T(9)),F=Math.min(11,Math.floor(X*12)),N=this.slab[F];K.position.set(j(-6,G.x-20,X),j(3,14,X),j(16,34,X)),$.set(N.x-2,N.h*0.5,0)}else{let X=G9(G0(J,U,T(14)));K.position.set(j(G.x-34,G.x-22,X),j(16,22,X),j(80,70,X)),$.set(G.x-14,j(16,20,X),0)}}cometShot(J,Q,$){let Z=this.camera;this.comet.visible=!0;let K=G0(J,T(9)-0.08,T(10)-0.08),U=M7(j(-40,30,K),j(14,4,K)+Math.sin(K*3)*2,j(-30,0,K)),Y=M7(70,-10,30).normalize();this.cometHead.position.copy(U),this.cometHead.rotation.set(Q*2,Q*3,0),this.phoneLid.rotation.x=-0.4-Math.abs(Math.sin(Q*9))*0.8;let W=this.tail.geometry.attributes.position;for(let H=0;H<W.count;H++){let G=z0(H),X=G*G*26,F=0.2+X*0.12;W.setXYZ(H,U.x-Y.x*X+(z0(H+1)-0.5)*F*2,U.y-Y.y*X+(z0(H+2)-0.5)*F*2+Math.sin(Q*4+H)*0.05,U.z-Y.z*X+(z0(H+3)-0.5)*F*2)}W.needsUpdate=!0,Z.position.set(U.x-6,U.y+2.5,U.z+14),$.copy(U)}agentShot(J,Q,$,Z){let K=this.camera,U=Q.at;this.agents.visible=!0;let Y=Q.name==="kernel",W=new W0;for(let X=0;X<40;X++){let F=X/40*Math.PI*2,N=X%2?7:10,q=0.9+z0(X)*0.8,O=(J-U+z0(X+1)*q)%q/q,M=Math.exp(-O*8);n0.position.set(Math.cos(F)*N,0.6+M*0.8,Math.sin(F)*N),n0.rotation.set(0,F+J*0.4,0),n0.scale.setScalar(0.9),n0.updateMatrix(),this.agentCubes.setMatrixAt(X,n0.matrix),this.agentEdges.setMatrixAt(X,n0.matrix),W.set(Y?2759236:1714746).lerp(VZ,M*0.8),this.agentCubes.setColorAt(X,W)}if(this.agentCubes.instanceMatrix.needsUpdate=this.agentEdges.instanceMatrix.needsUpdate=!0,this.agentCubes.instanceColor)this.agentCubes.instanceColor.needsUpdate=!0;this.agentEdges.material.opacity=0.4+Z*0.4;let H=G0(J,U,Y?T(25):T(12)),G=j(0.3,1.6,H);K.position.set(Math.sin(G)*22,j(12,7,H),Math.cos(G)*22),$.set(0,1,0)}roomShot(J,Q,$,Z){let K=this.camera,U=Q.at;this.room.visible=!0;let Y=Q.name==="standup",W=Q.name==="premeeting",H=Q.name==="moved",G=Q.name==="triple";this.table.visible=!Y;let X=Y?T(16):Q.name==="cab"?T(23):W?T(47):H?T(53):G?T(52):T(35);for(let O=0;O<12;O++)if(Y){let M=O/11*Math.PI*2,D=O===11;this.roomPeople.set(O,D?0:Math.cos(M)*4,D?0:Math.sin(M)*4,D?1.05:0.95+z0(O)*0.15,D?Math.sin(J*9)*0.12*(1-G0(J,T(15),T(15)+0.5)):Math.sin(J+O)*0.03)}else{let M=O%2?1:-1,E=-3.5+Math.floor(O/2)*1.45,I=W?h9(G0(J,T(43)+O*0.3,T(43)+O*0.3+0.4)):1,L=H?T8(G0(J,H0(52,/^moved/i)+z0(O)*1.2,H0(52,/^moved/i)+z0(O)*1.2+1.4)):0;this.roomPeople.set(O,E+L*M*3,M*(1.95+L*9),Math.max(0.001,(0.95+z0(O)*0.12)*I),Math.sin(J*0.8+O)*0.02,L<0.05)}this.roomPeople.done(),this.screen.material.map=this.boards[Q.name==="triple"?"tentative":Q.name]??this.boards.standup,this.screen.material.color.setScalar(0.6+Z*0.1);let F=G9(G0(J,G?H0(51,/^tentative/i):U,X)),N=j(Y?0.4:-0.6,Y?1.4:0.5,F),q=Y?12:13;if(Y)K.position.set(Math.sin(N)*q,j(7,4.5,F),Math.cos(N)*q),$.set(0,1,0);else{let O=j(0.75,1.2,F);K.position.set(Math.sin(O)*q*0.8+1,j(4.5,3.6,F),Math.cos(O)*q*0.55),$.set(-4.2,2.6,0)}}fabShot(J,Q,$,Z){let K=this.camera;this.fab.visible=!0,this.wafer.rotation.y=Q*0.6,this.laser.material.opacity=0.5+Z*0.5,this.laser.scale.set(1+Z*2,1,1+Z*2),this.laser.position.set(Math.sin(Q*7)*2.5,0.2,Math.cos(Q*5)*2.5);let U=Math.floor(70*G0(J,H0(30,/^seventy/i),H0(30,/^dutch/i)+0.3)),Y=J>=H0(30,/^out/i),W=new W0;for(let G=0;G<70;G++)this.machines.setColorAt(G,W.copy(G<U&&!Y?lU.clone().multiplyScalar(0.45):new W0(2106156)));if(this.machines.instanceColor)this.machines.instanceColor.needsUpdate=!0;let H=G9(G0(J,T(29),T(31)));K.position.set(j(9,-6,H),j(9,14,H),j(12,26,H)),$.set(j(0,-8,H),j(0.5,0,H),j(0,-10,H))}sunShot(J,Q,$){let Z=this.camera;this.sun.visible=!0;let K=G0(J,H0(31,/^mind/i)-0.3,R9(32)),U=this.swarmDirs.length;for(let H=0;H<U;H++){let G=this.swarmDirs[H],X=z0(H*7)*0.9,F=G9(G0(K,X,X+0.1));n0.position.copy(G).multiplyScalar(j(30,6.6,F)),n0.lookAt(0,0,0),n0.scale.setScalar(Math.max(0.001,F)),n0.updateMatrix(),this.swarm.setMatrixAt(H,n0.matrix)}this.swarm.instanceMatrix.needsUpdate=!0,this.swarm.rotation.y=J*0.15;let Y=1-K*0.75;this.sunBall.material.color.setRGB(0.75*Y,0.55*Y,0.28*Y),this.sunHalo.material.opacity=(0.35+$*0.2)*Y;let W=j(-0.4,0.5,G0(J,T(31),T(33)));Z.position.set(Math.sin(W)*40,6,Math.cos(W)*40),Q.set(0,0,0)}proteinShot(J,Q){let $=this.camera;this.protein.visible=!0;let Z=G9(G0(J,H0(35,/^fold/i),H0(35,/^proteins/i)+0.6)),K=M7();this.coil.forEach((Y,W)=>{K.copy(Y).lerp(this.helix[W],Z),n0.position.copy(K),n0.rotation.set(0,0,0),n0.scale.setScalar(1),n0.updateMatrix(),this.beads.setMatrixAt(W,n0.matrix)}),this.beads.instanceMatrix.needsUpdate=!0,this.beads.rotation.y=J*0.5,this.globe.visible=J>=H0(35,/^climate/i)-0.1,this.globe.scale.setScalar(Math.max(0.001,h9(G0(J,H0(35,/^climate/i)-0.1,H0(35,/^climate/i)+0.3)))),this.globe.rotation.y=J*0.3;let U=G9(G0(J,T(36),T(36)+0.8));this.protein.scale.setScalar(j(1,0.35,U)),$.position.set(j(-2,0,U),j(9,3,U),j(22,24,U)),Q.set(j(1,6,U),0,0)}render(){this.composer.render()}}var Z1=(J)=>{let Q=nU??=sQ();return Q[Q.indexOf(J)+1]?.at??I7()},H5=(J,Q,$,Z,K)=>P9(Q,Q+Z,J)*(1-P9($-K,$,J));var K1=/^(exponential|gain|steep|ceiling|go|shot|engine|jet|thrust|stall|out|ten|contain|vertical|demigod|sun|apocalypse|singularity's|steeper|terrified|doubling|comet's|nine's)$/,U1=/^(prius|tesla|linear|claude|phone|model|brain|plane|kernel|agents|terminal|proteins|climate|grid|euv|dutch|curve)$/,Y1=/^(not|yet|no|waiting|you're|thirty|minutes|hands|off|ticket|committee|board|rollback|office|flat|stable|procurement|eighteen|months|compliance|soc|questionnaire|weeks|lawyer|consultancy|bonus|teams|inbox|pre-meeting|meeting|tentative|thursday|quorum|thrilled)$/,N5={title:"The Steep Part",fonts:['400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
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
    <div class="bub ai" data-at="W36:so">Done. <b>Inbox 0.</b></div></div>`,endAt:()=>R9(53)+2.4,words:{hot:K1,ice:U1,gold:Y1},hud:(J,Q)=>{let $=Math.floor(tJ(J)/4);return{left:`the steep part &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`doublings <span class="ice">${$}</span> &nbsp;·&nbsp; compute <b>×2<sup>${$}</sup></b>`}},shots:sQ,shotAt:_Z,world:(J)=>{let Q=new sU(J);return{update:($)=>Q.update($),render:()=>Q.render(),flash:($)=>Math.min(0.9,Q.flash($))*($>=L8()&&$<L8()+1?0.8:0.6),fade:($)=>Q.fade($)}}};var z9=(J,Q,$,Z)=>({name:J,at:Q,label:$,section:Z}),X5=(J,Q)=>[z9("here",T(J)-0.3,"data here, data there",Q),z9("crates",T(J+2)-0.2,"databricks, dataiku, sap",Q),z9("kevin",T(J+4)-0.2,"the app kevin built",Q),z9("plant",T(J+5)-0.2,"the plant",Q),z9("nobody",T(J+6)-0.2,"nobody knows",Q),z9("finale",T(J+8)-0.2,"data, data everywhere",Q)];function IZ(){return[z9("overture",0,"team! big news!","intro"),z9("curtain",T(1)-0.3,"we're gonna AI","intro"),z9("kickline",T(2)-0.4,"it's gonna fix everything","verse 1"),z9("pitch",T(4)-0.2,"give us all your data","verse 1"),z9("vendor",T(6)-0.2,"the vendor rolled in","pre-chorus"),z9("where",T(8)-0.15,"where's the data?","pre-chorus"),z9("quiet",T(9)-0.2,"here's the thing","pre-chorus"),...X5(11,"chorus"),z9("chain",T(21)-0.6,"ask denise","verse 2"),z9("tickets",T(27)-0.2,"three ticket systems","pre-chorus"),z9("meeting",T(29)-0.2,"fourteen people","pre-chorus"),...X5(35,"chorus"),z9("closet",T(45)-0.6,"a server by the press","verse 3"),z9("cloud",T(47)-0.2,"just sync it up to azure","verse 3"),z9("xp",T(49)-0.2,"windows xp","verse 3"),z9("truths",T(51)-0.5,"nine sources of truth","bridge"),z9("swamp",T(52)-0.2,"the data lake's a swamp","bridge"),z9("raci",T(53)-0.2,"a raci for the raci","bridge"),z9("stan",T(54)-0.2,"ask stan","bridge"),z9("pilot",T(55)-0.2,"the pilot's in a pilot","bridge"),z9("oil",T(56)-0.2,"data is the new oil","bridge"),z9("call",T(59)-0.3,"can everyone see my screen?","breakdown"),z9("curtain",T(66)-0.5,"we're gonna AI (key change)","final chorus"),z9("agents",T(68)-0.2,"agents running everything","final chorus"),z9("lock",H0(69,/^kidding/i)-0.3,"kidding. nobody knows how.","final chorus"),z9("crates",T(70)-0.2,"databricks, dataiku, sap","final chorus"),z9("confluence",T(72)-0.2,"only with the direct link","final chorus"),z9("github",T(73)-0.2,"everywhere but github","final chorus"),z9("nobody",T(74)-0.2,"where's the data?","final chorus"),z9("finale",T(77)-0.2,"data, data... everywhere","final chorus"),z9("curtaincall",T(79)-0.5,"a recurring meeting","outro"),z9("end",R9(82)+0.2,"the end","outro")]}var E5=null,BZ=(J)=>{let Q=E5??=IZ(),$=Q[0];for(let Z of Q)if(Z.at<=J)$=Z;return $},W1=(J)=>{let Q=E5??=IZ();return Q[Q.indexOf(J)+1]?.at??I7()},H1=9049124,iU=14263361;var D5=1714778,G1={overture:2361364,curtain:2767514,kickline:2767514,pitch:3811978,vendor:9067028,where:328968,quiet:328968,here:8002122,crates:1723002,kevin:2775610,plant:3815978,nobody:4856346,finale:8002122,chain:2763354,tickets:4864538,meeting:1714746,closet:1316884,cloud:2775712,xp:1723040,truths:3807834,swamp:1718820,raci:2763322,stan:328968,pilot:5929648,oil:2759178,call:658452,agents:1718874,lock:4856346,confluence:1718906,github:1052692,curtaincall:3807780,end:328968},q5=new Map,t9=(J,Q=0.7,$=0)=>{let Z=`${J}:${Q}:${$}`,K=q5.get(Z);if(!K)q5.set(Z,K=new X9({color:J,roughness:Q,metalness:0,emissive:$?J:0,emissiveIntensity:$}));return K},L9=(J,Q,$=0,Z=0,K=0)=>{let U=new d(J,Q);return U.position.set($,Z,K),U.castShadow=!0,U.receiveShadow=!0,U},x9=(J,Q,$,Z,K=0,U=0,Y=0)=>L9(new P0(J,Q,$),t9(Z),K,U,Y);function VJ(J,Q,$){let Z=document.createElement("canvas");Z.width=J,Z.height=Q,$(Z.getContext("2d"));let K=new _7(Z);return K.colorSpace=A7,K.anisotropy=4,K}function i7(J,Q,$,Z={}){let K=VJ(Math.round(Q*160),Math.round($*160),(U)=>{let Y=U.canvas.width,W=U.canvas.height;U.fillStyle=Z.bg??"#f3ead2",U.fillRect(0,0,Y,W),U.strokeStyle=Z.fg??"#1d1a22",U.lineWidth=W*0.05,U.strokeRect(W*0.04,W*0.04,Y-W*0.08,W-W*0.08),U.fillStyle=Z.fg??"#1d1a22",U.textAlign="center",U.textBaseline="middle";let H=W*(Z.sub?0.4:0.5);U.font=`${Z.font??"900"} ${H}px "DM Serif Display", Georgia, serif`;while(U.measureText(J).width>Y*0.88)H*=0.92,U.font=`${Z.font??"900"} ${H}px "DM Serif Display", Georgia, serif`;if(U.fillText(J,Y/2,Z.sub?W*0.4:W/2),Z.sub)U.font=`600 ${W*0.17}px "JetBrains Mono", monospace`,U.fillText(Z.sub,Y/2,W*0.74)});return L9(new E9(Q,$),new X9({map:K,roughness:0.8}))}var h7=new A9,t0=(J=0,Q=0,$=0)=>new S(J,Q,$),N1=t0(0,1,0),X1=new u0(0.075,0.085,1,8).translate(0,0.5,0),D1=new u0(0.11,0.09,0.95,10).translate(0,-0.475,0);function sJ(J){let Q=new R0,$=J.robot?10134445:[15254688,13012578,9263675,15782582,7029808][Math.floor(z0(J.seed)*5)],Z=J.pants??2763316;if(Q.add(L9(new u0(0.27,0.24,0.72,14),t9(J.shirt),0,1.3,0)),Q.add(L9(new u0(0.25,0.27,0.22,14),t9(Z),0,0.92,0)),J.tie)Q.add(x9(0.08,0.42,0.03,J.tie,0,1.38,0.27));let K=J.robot?x9(0.42,0.4,0.4,$,0,1.9,0):L9(new $9(0.21,16,12),t9($),0,1.88,0);if(J.robot)K.add(L9(new P0(0.28,0.07,0.02),t9(8057087,0.4,1.5),0,0.02,0.21));if(J.hat)K.add(L9(new $9(0.23,14,8,0,Math.PI*2,0,Math.PI/2),t9(J.hat),0,0.05,0));Q.add(K);let U=[-1,1].map((H)=>{let G=new d(D1,t9(Z));return G.position.set(H*0.12,0.95,0),G.castShadow=!0,G.add(L9(new P0(0.14,0.08,0.3),t9(1381402),0,-0.93,0.06)),Q.add(G),G}),Y=[-1,1].map(()=>{let H=L9(new $9(0.075,10,8),t9($));return Q.add(H),H}),W=[0,1].map(()=>{let H=new d(X1,t9(J.shirt));return H.castShadow=!0,Q.add(H),H});return Object.assign(Q.userData,{head:K,hands:Y,arms:W,legs:U,seed:J.seed}),Q}var q1={down:[0.34,0.95,0.12],up:[0.42,2.45,0.05],jazz:[0.72,2,0.3],shrug:[0.62,1.42,0.42],point:[0.3,1.75,0.85],out:[0.95,1.6,0.1],face:[0.16,1.82,0.32]};function x7(J,Q,$,Z=0,K=0,U=0.04,Y){let{hands:W,arms:H,legs:G,seed:X,head:F}=J.userData;J.rotation.z=Math.sin(Q*Math.PI*2.2+X)*U,F.rotation.x=$==="face"?0.35:0,W.forEach((N,q)=>{let O=q?1:-1,[M,D,E]=q1[q&&Y?Y:$];N.position.set(O*M,D+($==="jazz"?Math.sin(Q*30+q)*0.03:0),E);let I=t0(O*0.26,1.6,0.02),L=N.position.clone().sub(I);H[q].position.copy(I),H[q].quaternion.setFromUnitVectors(N1,L.clone().normalize()),H[q].scale.set(1,L.length(),1)}),G.forEach((N,q)=>{N.rotation.x=q===K?-Z*1.45:Z*0.1})}var oU=[{name:"Databricks",word:/^databricks/i,color:"#d8452f"},{name:"Dataiku",word:/^dataiku/i,color:"#2ab1ac"},{name:"SAP",word:/^sap$/i,color:"#1a6fd1"},{name:"S3",word:/^s3/i,color:"#d88a1a"},{name:"Redshift",word:/^redshift/i,color:"#8c4fd1"},{name:"Azure",word:/^azure/i,color:"#2a86e0"},{name:"ServiceNow",word:/^servicenow/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^\W*times/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^three/i,color:"#3f9a4a"}],F5=[{label:"My boss",word:/^boss/i},{label:"Denise",word:/^denise/i},{label:"Platform team",word:/^platform/i},{label:"#data-access",word:/^slack/i},{label:"Gary (OOO)",word:/^gary/i},{label:"A guy who knows a guy",word:/^guy$/i}];class aU{renderer;scene=new V8;camera=new e9(45,1.7777777777777777,0.1,400);composer;bloom;wash=new B8(16771272,2758672,0.5);key=new I8(16773336,0.6);spots=[];cyc;stage=new R0;curtains=[];bulbs;marquee=new R0;marqueeBulbs;marqueeBulbPos=[];seats;lead;vendorGuy;cio;line=[];deck;decks={};crates=[];github=new R0;kevin=new R0;plant=new R0;chain=[];booths=[];meeting=new R0;clockHand;closet=new R0;fan;xpScreen;cloud=new R0;plantGuy;agents=[];padlock=new R0;door=new R0;swamp;tomb;planes=[];barrels=new R0;stanSign;confetti;constructor(J){this.renderer=new n8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=_6,this.renderer.toneMapping=g8,this.scene.background=new W0(328711),this.composer=new o8(this.renderer),this.composer.addPass(new r8(this.scene,this.camera)),this.bloom=new G8(new U0(1920,1080),0.55,0.5,0.82),this.composer.addPass(this.bloom),this.composer.addPass(new a8),this.key.position.set(0,18,20),this.scene.add(this.wash,this.key),this.buildStage(),this.buildPeople(),this.buildProps(),this.scene.add(this.stage)}buildStage(){let J=this.stage,Q=VJ(1024,512,(H)=>{for(let G=0;G<32;G++){H.fillStyle=`hsl(28, ${38+z0(G)*10}%, ${22+z0(G+4)*8}%)`,H.fillRect(0,G*16,1024,15),H.fillStyle="rgba(0,0,0,.35)",H.fillRect(0,G*16+15,1024,1);for(let X=0;X<3;X++)H.fillRect(z0(G*5+X)*1024,G*16,2,15)}});Q.wrapS=Q.wrapT=EJ,Q.repeat.set(2,2);let $=L9(new P0(30,1,14),new X9({map:Q,roughness:0.55}),0,-0.5,-2.5);J.add($),this.cyc=new d(new E9(34,18),new v9({uniforms:{color:{value:new W0(D5)},glow:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 color; uniform float glow; varying vec2 vUv;
        void main() { float g = smoothstep(0.0, 0.55, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y)) * 0.9 + 0.1;
          float h = exp(-pow((vUv.y - 0.12) * 5.0, 2.0)) * 0.8;
          gl_FragColor = vec4(color * (g + h) * glow, 1.0); }`})),this.cyc.position.set(0,7.5,-8.2),J.add(this.cyc);let Z=new X9({color:iU,roughness:0.35,metalness:0.7});for(let H of[-12.4,12.4])J.add(L9(new P0(1.4,14,1),Z,H,6.5,4.9));J.add(L9(new P0(26.2,1.6,1),Z,0,13.3,4.9)),J.add(x9(24,2.2,0.2,789008,0,11.6,4.4));let K=new E9(12,12.6,48,1),U=K.attributes.position;for(let H=0;H<U.count;H++)U.setZ(H,Math.sin(U.getX(H)*4.2)*0.18);K.computeVertexNormals();let Y=new X9({color:H1,roughness:0.8,side:o9});for(let H of[-1,1]){let G=L9(K,Y,H*6,6.3,4.3);this.curtains.push(G),J.add(G);let X=L9(K,Y,H*13.5,6.3,3.6);X.scale.x=0.35,J.add(X)}this.bulbs=new T9(new $9(0.09,10,8),new m0({color:16767120}),40);for(let H=0;H<40;H++)h7.position.set(-11.5+H*0.59,0.08,4.2),h7.updateMatrix(),this.bulbs.setMatrixAt(H,h7.matrix);J.add(this.bulbs,x9(24,0.18,0.4,1708556,0,0,4.35)),this.seats=new T9(new P0(0.62,0.95,0.6),t9(5901336),220);let W=0;for(let H=0;H<10;H++)for(let G=0;G<22;G++)h7.position.set(-11+G*1.05,0+H*0.32-0.6,8+H*1.2),h7.updateMatrix(),this.seats.setMatrixAt(W++,h7.matrix);J.add(this.seats);for(let[H,G,X]of[[-9,16,18],[9,16,18],[0,18,16]]){let F=new j6(16774368,0,60,0.16,0.45,1.2);F.position.set(H,G,X),F.castShadow=!0,F.shadow.mapSize.set(1024,1024),F.shadow.bias=-0.0005,this.scene.add(F,F.target);let N=new d(new u0(0.05,1,1,24,1,!0).translate(0,-0.5,0),new m0({color:16773328,transparent:!0,opacity:0.06,blending:Z7,depthWrite:!1,side:o9}));this.scene.add(N),this.spots.push({light:F,beam:N})}}buildPeople(){this.lead=sJ({shirt:2771594,pants:1844280,tie:13120058,seed:3}),this.vendorGuy=sJ({shirt:13148240,pants:9071146,tie:1710618,seed:8}),this.cio=sJ({shirt:3816004,pants:2236970,tie:6982351,seed:11}),this.plantGuy=sJ({shirt:5925498,pants:2767450,seed:14,hat:15777824});let J=[15262938,9089240,14196904,12114080,15257744,12626144,15790320,9488584];for(let Q=0;Q<8;Q++)this.line.push(sJ({shirt:J[Q],tie:Q%2?2763370:void 0,seed:20+Q}));for(let Q=0;Q<3;Q++)this.agents.push(sJ({shirt:10134445,pants:6976381,seed:40+Q,robot:!0}));for(let Q of[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents])this.stage.add(Q)}buildProps(){let J=this.stage,Q=VJ(1600,400,(R)=>{R.fillStyle="#1a0f08",R.fillRect(0,0,1600,400),R.fillStyle="#ffe9b0",R.textAlign="center",R.textBaseline="middle";let B=210;R.font=`400 ${B}px "Limelight", "DM Serif Display", serif`;while(R.measureText("WE'RE GONNA AI!").width>1440)B-=6,R.font=`400 ${B}px "Limelight", "DM Serif Display", serif`;R.fillText("WE'RE GONNA AI!",800,212)});this.marquee.add(L9(new P0(16.4,4.4,0.4),t9(2759184)));let $=new d(new E9(15.6,3.9),new X9({map:Q,emissive:16777215,emissiveMap:Q,emissiveIntensity:0.55}));$.position.z=0.21,this.marquee.add($);for(let R=0;R<64;R++){let z=R/64*40.4,V=0,C=0;if(z<16)V=-8+z,C=2.1;else if((z-=16)<4.2)V=8,C=2.1-z;else if((z-=4.2)<16)V=8-z,C=-2.1;else z-=16,V=-8,C=-2.1+z;this.marqueeBulbPos.push(t0(V,C,0.3))}this.marqueeBulbs=new T9(new $9(0.13,10,8),new m0({color:16777215}),64),this.marqueeBulbPos.forEach((R,B)=>{h7.position.copy(R),h7.updateMatrix(),this.marqueeBulbs.setMatrixAt(B,h7.matrix)}),this.marquee.add(this.marqueeBulbs);for(let R of[-6,6])this.marquee.add(L9(new u0(0.02,0.02,10),t9(8947848),R,7.2,0));J.add(this.marquee),this.deck=new d(new E9(9,5.06),new X9({color:16777215,emissive:16777215,emissiveIntensity:0.22})),this.deck.position.set(2.5,5.2,-6.5),J.add(this.deck);let Z=(R,B,_,z)=>VJ(1280,720,(V)=>{V.fillStyle=_,V.fillRect(0,0,1280,720),V.fillStyle=z,V.textAlign="center",V.font='900 120px "DM Serif Display", Georgia, serif',V.fillText(R,640,330),V.font='600 46px "JetBrains Mono", monospace',V.fillText(B,640,450)});this.decks={vendor:Z("Live by Q3!","AI that fixes everything™","#f6f1e4","#1a3a8a"),pilot:Z("Demo: ✓ crushed it","now with your data…","#f6f1e4","#1a6a3a"),tears:Z("ERROR","null · null · null · NaN","#2a0a0e","#ff6a6a"),oil:Z("Data is the new oil!","every deck, every quarter","#141010","#f0c060")};let K=(R,B)=>VJ(512,512,(_)=>{_.fillStyle="#b08a58",_.fillRect(0,0,512,512),_.fillStyle="rgba(60,40,20,.5)";for(let V=0;V<6;V++)_.fillRect(0,V*86,512,6);_.strokeStyle="#6a4a28",_.lineWidth=26,_.strokeRect(13,13,486,486),_.beginPath(),_.moveTo(26,26),_.lineTo(486,486),_.stroke(),_.fillStyle=B,_.fillRect(40,186,432,140),_.fillStyle="#fff",_.textAlign="center",_.textBaseline="middle";let z=84;_.font=`900 ${z}px "DM Serif Display", Georgia, serif`;while(_.measureText(R).width>400)z-=4,_.font=`900 ${z}px "DM Serif Display", Georgia, serif`;_.fillText(R,256,258)});oU.forEach((R,B)=>{let _=new R0,z=K(R.name,R.color);if(_.add(L9(new P0(1.9,1.9,1.9),new X9({map:z,roughness:0.8}),0,0.95,0)),_.userData.home=B<6?t0(-9.2+B*2.6+(B>2?2.6:0)-1.3,0,-4.5+B%2*1.2):t0(8.6,(B-6)*1.9,-2.6),B<6)_.userData.home=t0([-9.5,-6.6,-3.7,3.7,6.6,9.5][B],0,[-4.8,-3.6,-5.2,-5.2,-3.6,-4.8][B]);_.rotation.y=(z0(B)-0.5)*0.4,this.crates.push(_),J.add(_)});let U=new K8(new w6(new P0(1.9,1.9,1.9)),new UZ({color:16777215,dashSize:0.18,gapSize:0.12}));U.computeLineDistances(),U.position.y=0.95;let Y=i7("GitHub",1.9,0.6,{bg:"#101014",fg:"#f0f0f0"});Y.position.set(0,2.3,0),this.github.add(U,Y),J.add(this.github);let W=VJ(640,480,(R)=>{R.fillStyle="#0a0aa0",R.fillRect(0,0,640,480),R.fillStyle="#c0c0c0",R.fillRect(40,40,560,400),R.fillStyle="#000080",R.fillRect(40,40,560,44),R.fillStyle="#fff",R.font='700 30px "JetBrains Mono", monospace',R.fillText("KevinSoft Data Manager 2003",56,72),R.fillStyle="#000",R.font='600 26px "JetBrains Mono", monospace',["Records: 41,207","Last backup: 2009","Password: kevin1","Do not close!!"].forEach((B,_)=>R.fillText(B,70,150+_*60))});this.kevin.add(x9(3,0.15,1.6,6965802,0,1.4,0),x9(0.12,1.4,0.12,3811866,-1.3,0.7,0),x9(0.12,1.4,0.12,3811866,1.3,0.7,0)),this.kevin.add(x9(1.8,1.5,1.6,14208944,0,2.3,-0.1));let H=L9(new E9(1.5,1.12),new X9({map:W,emissive:16777215,emissiveMap:W,emissiveIntensity:0.35}),0,2.35,0.71);this.kevin.add(H,x9(1.6,0.08,0.6,14208944,0,1.52,0.5));let G=i7("Kevin's app",2.4,0.6,{sub:"built 2003 · Kevin left 2011"});G.position.set(0,3.7,0),this.kevin.add(G),J.add(this.kevin);let X=new n7([t0(-6,0),t0(-6,3),t0(-4,4.2),t0(-4,3),t0(-2,4.2),t0(-2,3),t0(0,4.2),t0(0,3),t0(6,3),t0(6,0)].map((R)=>new U0(R.x,R.y)));this.plant.add(L9(new _8(X,{depth:0.3,bevelEnabled:!1}),t9(4868690))),this.plant.add(L9(new u0(0.4,0.55,6,14),t9(5913138),3.8,5.5,0.15));let F=i7("THE PLANT",4,1,{sub:"bandwidth: 0.3 Mbps (on a good day)",bg:"#f0e6c0"});F.position.set(0.5,1.7,0.34),this.plant.add(F);for(let R=0;R<4;R++)this.plant.add(L9(new E9(0.8,0.6),t9(16765040,0.5,1.2),-4.6+R*1.6,1.6,0.32));this.plant.position.set(0,0,-6.6),J.add(this.plant),F5.forEach((R,B)=>{let _=new R0,z=B===4?null:sJ({shirt:[3816004,12081786,4880986,10134445,0,9071178][B],seed:60+B,robot:B===3,tie:B===0?9050650:void 0});if(z)_.add(z);if(B===4)_.add(x9(0.8,0.08,0.8,3816004,0,0.9,0),x9(0.8,0.9,0.08,3816004,0,1.35,-0.38),x9(0.06,0.9,0.06,2236962,0,0.45,0));let V=i7(R.label,2.2,0.55,{bg:B===4?"#ffe9a0":"#f3ead2"});V.position.set(0,2.75,0),_.add(V),_.position.set(-9+B*3.6,0,-2.4+B%2*1.1),this.chain.push({group:_,who:z}),J.add(_)}),[["RESOLVED","#2f8a4a"],["DUPLICATE","#6a6a74"],["SEE TICKET 3","#c88a1a"]].forEach(([R,B],_)=>{let z=new R0;z.add(x9(2.4,2.2,1.4,2763316,0,1.1,0),x9(2.6,0.12,1.6,4868692,0,2.26,0));let V=i7(R,2.4,0.7,{bg:B,fg:"#ffffff"});V.position.set(0,1.4,0.71);let C=new d(new $9(0.3,16,12),new X9({color:new W0(B),emissive:new W0(B),emissiveIntensity:0}));C.position.set(0,2.7,0);let f=i7(`Ticket system #${_+1}`,2.4,0.45,{bg:"#f3ead2"});f.position.set(0,3.4,0),z.add(V,C,f),z.position.set(-6+_*6,0,-3),this.booths.push({group:z,lamp:C}),J.add(z)}),this.meeting.add(x9(12,0.15,2.2,5913124,0,1.25,-2.5));for(let R=0;R<14;R++){let B=-5.5+R%7*1.85,_=R<7?-3.9:-1.1;this.meeting.add(x9(0.7,0.08,0.7,2302764,B,0.8,_),x9(0.7,0.9,0.08,2302764,B,1.25,_+(R<7?-0.35:0.35)))}let N=VJ(256,256,(R)=>{R.fillStyle="#f6f1e4",R.beginPath(),R.arc(128,128,124,0,Math.PI*2),R.fill(),R.fillStyle="#1d1a22";for(let B=0;B<12;B++){let _=B/12*Math.PI*2;R.fillRect(128+Math.sin(_)*100-4,128-Math.cos(_)*100-10,8,20)}}),q=L9(new E7(1.1,40),new X9({map:N}),0,7.5,-7.8);this.clockHand=x9(0.08,0.9,0.04,1907234,0,7.5,-7.75),this.clockHand.geometry.translate(0,0.4,0),this.meeting.add(q,this.clockHand),J.add(this.meeting),this.closet.add(x9(0.2,7,6,5921354,-3.2,3.5,-3),x9(0.2,7,6,5921354,3.2,3.5,-3),x9(6.6,7,0.2,4868670,0,3.5,-6)),this.closet.add(x9(1.4,3,1.8,2763312,-1.2,1.5,-4.2));for(let R=0;R<6;R++)this.closet.add(L9(new $9(0.05),t9(R%2?4259680:16752672,0.5,2),-1.6+R%3*0.2,2.6-Math.floor(R/3)*0.2,-3.28));this.closet.add(x9(1.8,0.1,1.2,6965802,1.4,1.2,-4.4),x9(0.1,1.2,0.1,3811866,0.6,0.6,-4.4),x9(0.1,1.2,0.1,3811866,2.2,0.6,-4.4)),this.closet.add(x9(1.5,1.2,1.2,14208944,1.4,1.85,-4.6));let O=VJ(640,480,(R)=>{let B=R.createLinearGradient(0,0,0,300);B.addColorStop(0,"#2a6ae0"),B.addColorStop(1,"#a8d0f8"),R.fillStyle=B,R.fillRect(0,0,640,480),R.fillStyle="#4aa83a",R.beginPath(),R.moveTo(0,330),R.quadraticCurveTo(300,200,640,300),R.lineTo(640,480),R.lineTo(0,480),R.fill(),R.fillStyle="#245ed8",R.fillRect(0,440,640,40),R.fillStyle="#3a9a3a",R.fillRect(0,440,120,40),R.fillStyle="#fff",R.font='italic 700 26px "Inter", sans-serif',R.fillText("start",28,469),R.fillStyle="#f6f1e4",R.fillRect(150,120,340,150),R.fillStyle="#0a246a",R.fillRect(150,120,340,34),R.fillStyle="#fff",R.font='700 20px "Inter", sans-serif',R.fillText("Windows XP · Service Pack 2",160,144),R.fillStyle="#000",R.font='500 20px "Inter", sans-serif',R.fillText("Uptime: 4,211 days",170,200),R.fillText("Updates available: 1,906",170,235)});this.xpScreen=L9(new E9(1.3,0.98),new X9({map:O,emissive:16777215,emissiveMap:O,emissiveIntensity:0.4}),1.4,1.88,-3.99),this.closet.add(this.xpScreen),this.fan=new R0,this.fan.add(L9(new L7(0.7,0.07,8,32),t9(14211280)));for(let R=0;R<4;R++){let B=x9(0.32,0.55,0.03,9089240,0,0.3,0);B.geometry.translate(0,0,0);let _=new R0;_.add(B),_.rotation.z=R*Math.PI/2,this.fan.add(_)}this.fan.position.set(-1.2,3.8,-4.2),this.closet.add(this.fan);let M=i7("DO NOT UNPLUG",0.9,0.7,{bg:"#ffe55a",sub:"— Jess"});M.position.set(-1.2,2.2,-3.29),this.closet.add(M),J.add(this.closet);for(let R=0;R<7;R++)this.cloud.add(L9(new $9(0.9+z0(R)*0.6,18,14),t9(16054010),-2.4+R*0.8,Math.sin(R*1.3)*0.4,z0(R+3)*0.6));let D=i7("AZURE",2.6,0.7,{bg:"#2a86e0",fg:"#fff"});D.position.set(0,-1.4,1.2),this.cloud.add(D,L9(new u0(0.02,0.02,8),t9(10127978),0,-5,0)),J.add(this.cloud),this.padlock.add(L9(new L7(1.1,0.22,12,32,Math.PI),new X9({color:11579576,metalness:0.8,roughness:0.3}),0,1.6,0)),this.padlock.add(L9(new P0(3,2.4,0.9),new X9({color:iU,metalness:0.7,roughness:0.35}),0,0.4,0)),this.padlock.add(L9(new u0(0.22,0.22,0.95,16),t9(1710618),0,0.5,0.05).rotateX(Math.PI/2)),J.add(this.padlock),this.door.add(x9(3,5.6,0.3,3811866,0,2.8,0),x9(2.4,5,0.2,2775720,0,2.6,0.12));let E=i7("Confluence",2.6,0.7,{bg:"#f3ead2"});E.position.set(0,5.9,0.2);let I=i7("direct link only",2.2,0.5,{bg:"#ffe9a0"});I.position.set(0,2.9,0.26),this.door.add(E,I,L9(new $9(0.14),new X9({color:iU,metalness:0.8,roughness:0.3}),0.9,2.5,0.3)),J.add(this.door),this.swamp=L9(new E7(7,48),new X9({color:3824170,roughness:0.25,metalness:0.1}),0,0.03,-2.5),this.swamp.rotation.x=-Math.PI/2,J.add(this.swamp),this.tomb=new R0,this.tomb.add(L9(new u0(0.9,0.9,0.3,24,1,!1,0,Math.PI),t9(9079440),0,2.1,0).rotateX(Math.PI/2),x9(1.8,2.1,0.3,9079440,0,1.05,0));let L=i7("RIP CRM",1.5,0.9,{bg:"#8a8a90",sub:"2009–2021"});L.position.set(0,1.3,0.16),this.tomb.add(L),J.add(this.tomb);for(let R=0;R<2;R++){let B=new R0,_=R?0.45:1;B.add(L9(new K7(0.9*_,3*_,3),t9(R?15782016:16183780)).rotateX(-Math.PI/2).rotateZ(Math.PI/2)),this.planes.push(B),J.add(B)}for(let R=0;R<9;R++)this.barrels.add(L9(new u0(0.6,0.6,1.6,20),t9(1710618,0.4),-8+R*2,0.8,-3+R%2*1.2));J.add(this.barrels),this.stanSign=i7("STAN?",1.6,0.6,{bg:"#f3ead2"}),J.add(this.stanSign),this.confetti=new T9(new E9(0.16,0.1),new m0({color:16777215,side:o9}),400);for(let R=0;R<400;R++)this.confetti.setColorAt(R,new W0([16765024,16734858,5943551,8056954,16777215][R%5]));J.add(this.confetti)}flash(J){let Q=BZ(J);return Q.name==="here"||Q.name==="finale"?Math.exp(-(J-Q.at)*8)*0.25:0}fade(J){return P9(I7()-0.8,I7(),J)}update(J){let Q=BZ(J),$=Q.name,Z=Q.at,K=W1(Q),U=G0(J,Z,K),Y=J-Z,W=this.camera,H=t0(0,3,0),G=a7(J),X=tJ(J),F=new Set,N=(_,z)=>{_.visible=z},q=new W0(G1[$]??D5);this.cyc.material.uniforms.color.value.copy(q),this.cyc.material.uniforms.glow.value=1+G*0.25;let O=$==="where"||$==="quiet"||$==="stan"||$==="call"||$==="github"||$==="end";this.wash.intensity=O?0.05:$==="closet"||$==="xp"?0.25:0.55,this.key.intensity=O?0:0.5;for(let _=0;_<40;_++)this.bulbs.setColorAt(_,new W0(O?3811860:16767120));if(this.bulbs.instanceColor)this.bulbs.instanceColor.needsUpdate=!0;let M=$==="overture"?0:$==="curtain"&&Z<10?G9(G0(J,Z,Z+1.6)):$==="curtaincall"?1-T8(G0(J,T(80),R9(82))):$==="end"?0:1;this.curtains.forEach((_,z)=>{let V=z?1:-1;_.scale.x=j(1,0.28,M),_.position.x=V*j(6,10.8,M)});let D=[null,null,null],E=[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents];for(let _ of E)_.visible=!1;for(let _ of[this.marquee,this.deck,this.github,this.kevin,this.plant,this.meeting,this.closet,this.cloud,this.padlock,this.door,this.swamp,this.tomb,this.barrels,this.stanSign,this.confetti,...this.planes])_.visible=!1;for(let _ of this.crates)_.visible=!1;for(let _ of this.chain)_.group.visible=!1;for(let _ of this.booths)_.group.visible=!1;let I=(_)=>{let z=(J-0.433)/S8()-_*0.12,V=Math.floor(z),C=z-V;return{amount:Math.sin($7(C)*Math.PI)*0.95,leg:(V+_)%2}},L=(_=0,z=-1.5,V="jazz")=>{this.line.forEach((C,f)=>{C.visible=!0,C.position.set(-8.4+f*2.4,_,z),C.rotation.y=0;let k=I(f);x7(C,J,V,k.amount,k.leg,0.02)})},R=(_,z,V,C=0.05)=>{this.lead.visible=!0,this.lead.position.set(_,0,z),this.lead.rotation.y=0,x7(this.lead,J,V,0,0,C)},B=F1(J);switch($){case"overture":{R(0,3.2,Y>1.2?"jazz":"out"),D[2]=t0(0,1.6,3.2),W.position.set(0,j(2.6,2.3,U),j(14,10.5,U)),H.set(0,2.6,3);break}case"curtain":{let _=Z>100;if(this.marquee.visible=!0,this.marquee.position.set(0,j(16,8.6,h9(G0(J,Z+0.2,Z+1.4))),-4),this.marqueeBulbPos.forEach((z,V)=>this.marqueeBulbs.setColorAt(V,new W0((V+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;if(L(),R(0,2.2,"up"),D[0]=t0(-4,1,-1.5),D[1]=t0(4,1,-1.5),D[2]=t0(0,1.6,2.2),_)this.confettiAt(J,Z);W.position.set(0,j(4,5,U),j(20,17,U)),H.set(0,5,0),W.fov=46;break}case"kickline":{if(this.marquee.visible=!0,this.marquee.position.set(0,8.6,-4),this.marqueeBulbPos.forEach((_,z)=>this.marqueeBulbs.setColorAt(z,new W0((z+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;L(),R(0,2.2,G>0.5?"up":"jazz"),D[0]=t0(-4,1,-1.5),D[1]=t0(4,1,-1.5),D[2]=t0(0,1.6,2.2),W.position.set(j(-11,11,U),1,5.5),H.set(j(-6,6,U),1.4,-1.5),W.fov=50;break}case"pitch":{L(0,-2.6,"out"),R(0,2,J>T(5)?"out":"point"),D[2]=t0(0,1.6,2),W.position.set(j(1.5,0.5,U),2.4,j(9.5,7.5,U)),H.set(0,2.1,1),W.fov=40;break}case"vendor":{this.deck.visible=!0,this.deck.material.map=this.decks.vendor,this.deck.material.emissiveMap=this.decks.vendor,this.deck.material.needsUpdate=!0,this.vendorGuy.visible=!0,this.vendorGuy.position.set(j(-12,-2,G9(G0(J,Z,Z+1.5))),0,0.5),this.vendorGuy.rotation.y=0.3,x7(this.vendorGuy,J,J>H0(7,/^q3/i)?"jazz":"point",0,0,0.06),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=-0.6,x7(this.cio,J,"down"),D[0]=this.vendorGuy.position.clone().setY(1.6),D[1]=t0(2.5,4,-6.5),W.position.set(j(-3,0,U),3,11),H.set(0,3,-2);break}case"where":case"quiet":{if(this.vendorGuy.visible=!0,this.vendorGuy.position.set(-2,0,0.5),x7(this.vendorGuy,J,"shrug",0,0,0),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=$==="quiet"?-0.2:-0.6,x7(this.cio,J,$==="quiet"&&J>H0(10,/^thing/i)-1?"shrug":"down",0,0,0),D[2]=$==="where"?t0(-2,1.6,0.5):t0(5.5,1.6,1.5),$==="where")W.position.set(-2,2.2,7),H.set(-2,2,0.5),W.fov=34;else W.position.set(j(3.2,4.2,U),2.1,j(7.5,5.5,U)),H.set(5.5,2,1.5),W.fov=32;break}case"here":case"finale":{L(),R(0,2.4,"out");let _=H0(Q.at<100?11:Q.at<200?35:77,/^\W*there/i),z=$==="here"&&J<_-0.1?-1:$==="here"?1:Math.sin(J*3)>0?1:-1;if(D[0]=t0(z*7,0.5,-1),D[1]=t0(-z*3,0.5,-1),D[2]=t0(0,1.6,2.4),this.cratesUpTo(J,9,!0),$==="finale")this.kevin.visible=this.plant.visible=!0,this.kevin.position.set(-10.5,0,1.5);if($==="finale"&&Z>230)this.confettiAt(J,Z);W.position.set(Math.sin(J*0.3)*3,j(5,4,U),j(24,19,U)),H.set(0,3.5,-1);break}case"crates":{let _=Z<100?13:Z<200?37:70;this.cratesUpTo(J,9,!1,_),R(0,2.4,"point"),this.lead.rotation.y=Math.sin(J*2)*0.6,D[2]=t0(0,1.6,2.4);let z=this.lastDropped(J,_);if(z)D[0]=z.clone().setY(1);W.position.set(j(-4,4,U),j(7,6,U),15),H.set(j(-3,3,U),1.6,-3),W.fov=48;break}case"kevin":{this.cratesUpTo(J,9,!0),this.kevin.visible=!0,this.kevin.position.set(0,j(14,0,h9(G0(J,Z,Z+0.9))),0.8),R(-2.6,2,"point"),this.lead.rotation.y=0.8,D[2]=t0(0,2.4,0.8),W.position.set(j(1.5,0.5,U),2.9,j(7.5,6.4,U)),H.set(0,2.5,0.8),W.fov=40;break}case"plant":{this.cratesUpTo(J,9,!0),this.plant.visible=!0,R(0,2,"out"),D[1]=t0(0,2,-6.5),W.position.set(0,j(3,4,U),j(16,13,U)),H.set(0,2.6,-6.5),W.fov=44;break}case"nobody":{this.cratesUpTo(J,9,!0),L(0,-1.5,B>0.2?"shrug":"down"),this.line.forEach((_)=>x7(_,J,B>0.2?"shrug":"down",0,0,0.02)),R(0,2.4,B>0.2?"shrug":"face"),D[2]=t0(0,1.6,2.4),W.position.set(0,2.2,j(11,9,U)),H.set(0,2,0);break}case"chain":{let _=0;F5.forEach((V,C)=>{let f=21+[0,0,1,2,3,4][C];if(J>=H0(f,V.word)-0.1)_=C}),this.chain.forEach((V,C)=>{if(V.group.visible=!0,V.who)x7(V.who,J,C===_?C===3?"point":C===5?"shrug":"point":"down",0,0,0.02)});let z=this.chain[_].group.position;R(j(this.lead.position.x||-11,z.x+1.3,0.5),z.z+1.4,"shrug"),this.lead.position.x=z.x+1.3,this.lead.rotation.y=-0.6,D[2]=z.clone().setY(1.6),D[1]=this.lead.position.clone().setY(1.6),W.position.set(z.x*0.8+2,3,10),H.set(z.x*0.9+0.5,2,-1.5),W.fov=42;break}case"tickets":{this.booths.forEach((_,z)=>{_.group.visible=!0;let V=z===0?H0(28,/resolved/i):z===1?H0(28,/duplicate/i):H0(28,/^see/i);_.lamp.material.emissiveIntensity=J>=V-0.1||J<T(28)&&Math.floor(J*4)%3===z?2.2:0.1}),R(0,1.6,"shrug"),D[0]=t0(-6,1.6,-3),D[1]=t0(6,1.6,-3),D[2]=t0(0,1.6,-3),W.position.set(0,j(4,3.4,U),j(15,12,U)),H.set(0,2,-3);break}case"meeting":{this.meeting.visible=!0,this.clockHand.rotation.z=-Y*3,[...this.line,this.lead,this.cio,this.vendorGuy,this.plantGuy,this.agents[0],this.agents[1]].forEach((z,V)=>{z.visible=!0;let C=-5.5+V%7*1.85,f=V<7?-3.9:-1.1;z.position.set(C,-0.15,f),z.rotation.y=V<7?0:Math.PI;let k=J>T(34)-0.2;x7(z,J,k?"face":V===9&&J>H0(31,/^unmutes/i)?"point":"down",0,0,0.01),z.userData.legs.forEach((b)=>b.rotation.x=-1.4)}),D[2]=t0(0,2,-2.5),W.position.set(j(-2,2,U),j(8,7,U),9),H.set(0,1.4,-2.5),W.fov=44;break}case"closet":case"cloud":case"xp":{this.closet.visible=!0,this.fan.rotation.z=-J*14,this.plantGuy.visible=!0,this.plantGuy.position.set(2.2,0,-1.8),this.plantGuy.rotation.y=-0.4;let _=$==="cloud"&&J>H0(47,/^laughed/i)-0.2;if(x7(this.plantGuy,J,_?"face":"down",0,0,_?0.12:0.02),R(-1.5,-0.6,$==="cloud"?"up":"point"),this.lead.rotation.y=0.5,$==="cloud")this.cloud.visible=!0,this.cloud.position.set(0,j(16,10.5,G9(G0(J,Z,Z+1.5))),-2.5),W.position.set(j(-3,-2,U),2,9),H.set(0,j(3,7,U),-2.5),W.fov=52;else if($==="xp"){this.agents[2].visible=!0,this.agents[2].position.set(j(-9,-0.5,G9(G0(J,Z,Z+1.6))),0,-1.2),x7(this.agents[2],J,"jazz",0,0,0.05);let z=P9(H0(50,/^windows/i)-0.5,H0(50,/^windows/i)+0.4,J);W.position.set(j(-1,1.4,z),j(3,2,z),j(7,-2.2,z)),H.set(j(0,1.4,z),j(2.2,1.88,z),j(-3,-4,z)),W.fov=j(46,30,z)}else W.position.set(j(2,0.5,U),2.6,j(8,6.5,U)),H.set(-0.4,2.4,-4),W.fov=44;D[2]=t0(0,1.8,-4);break}case"truths":case"swamp":case"raci":case"pilot":case"oil":{if(this.cratesUpTo(J,9,!0),R(0,2.2,$==="oil"?"out":$==="pilot"?"point":"shrug"),D[2]=t0(0,1.6,2.2),$==="truths"){let _=Math.floor((J-Z)*3)%9;D[0]=this.crates[_].position.clone().setY(1),W.position.set(j(-6,6,U),4,16),H.set(0,1.5,-3)}else if($==="swamp"){this.swamp.visible=!0,this.tomb.visible=J>H0(52,/^crm/i)-0.4,this.tomb.position.set(3,j(-2.4,0,h9(G0(J,H0(52,/^crm/i)-0.4,H0(52,/^crm/i)+0.3))),0);for(let _ of this.crates)_.position.y=-0.4+Math.sin(J*2+_.position.x)*0.08;this.wash.color.setHex(12120256),W.position.set(4,3,9),H.set(2,1.2,-1)}else if($==="raci")L(0,-1,"down"),W.position.set(0,3,15),H.set(0,2.5,-1);else if($==="pilot")this.planes.forEach((_,z)=>{_.visible=!0;let V=(J-Z)*0.35;if(_.position.set(Math.sin(V*2.4)*6,5+Math.sin(V*3.1)*1.2,-1+Math.cos(V*2.4)*2.5),_.rotation.set(0,Math.atan2(Math.cos(V*2.4)*2.4*6,-Math.sin(V*2.4)*2.4*2.5)+Math.PI/2,Math.sin(V*4)*0.3),z===1)_.position.add(t0(0,0.05,0))}),D[1]=this.planes[0].position.clone(),W.position.set(0,4,13),H.set(0,4.4,-1);else{this.deck.visible=!0;let _=J<H0(56,/^\W*tears/i)-0.1?"pilot":J<T(57)-0.1?"tears":"oil";this.deck.material.map=this.decks[_],this.deck.material.emissiveMap=this.decks[_],this.deck.material.needsUpdate=!0,this.barrels.visible=_==="oil",this.vendorGuy.visible=!0,this.vendorGuy.position.set(-4,0,0.5),x7(this.vendorGuy,J,_==="tears"?"face":"jazz",0,0,0.06),D[1]=t0(2.5,4,-6.5),W.position.set(j(-1,1,U),3.6,15),H.set(1,3.4,-3)}break}case"stan":{this.cratesUpTo(J,9,!0),this.stanSign.visible=!0,this.stanSign.position.set(-4,2.4,0),R(-1.2,1.5,"shrug"),this.lead.rotation.y=-0.6,D[2]=t0(-4,0.5,0),W.position.set(-1,2.6,10),H.set(-1.5,1.8,0),W.fov=40;break}case"call":{this.meeting.visible=!0,this.clockHand.rotation.z=-Y*3,R(0,0.6,"face",0.01),D[2]=t0(0,1.4,0.6),W.position.set(0,j(9,8,U),j(14,12,U)),H.set(0,1,-1.5);break}case"agents":{this.agents.forEach((_,z)=>{_.visible=!0,_.position.set(j(-14,-4+z*4,G9(G0(J,Z+z*0.3,Z+1.8+z*0.3))),0,-1);let V=I(z);x7(_,J,"jazz",V.amount*0.6,V.leg,0.03)}),L(0,-4.5,"jazz"),R(0,2.4,"out"),D[0]=t0(-4,1.6,-1),D[1]=t0(4,1.6,-1),D[2]=t0(0,1.6,2.4),W.position.set(j(-5,5,U),3.6,15),H.set(0,2.4,-1.5);break}case"lock":{this.padlock.visible=!0,this.padlock.position.set(0,j(14,2.2,h9(G0(J,Z,Z+0.7))),-1),this.padlock.rotation.z=Math.sin(J*6)*0.04,this.agents.forEach((_,z)=>{_.visible=!0,_.position.set(-4+z*4,0,0.8),x7(_,J,"shrug",0,0,0.03)}),D[2]=t0(0,2.2,-1),W.position.set(0,2.8,12),H.set(0,2.6,-1);break}case"confluence":{this.cratesUpTo(J,9,!0),this.door.visible=!0,this.door.position.set(0,0,-1),R(-2.2,1.4,J>H0(72,/^direct/i)?"shrug":"point"),this.lead.rotation.y=0.5,D[2]=t0(0,2.4,-1),W.position.set(j(2,1,U),3.2,j(11,9,U)),H.set(0,2.8,-1);break}case"github":{this.cratesUpTo(J,9,!0),this.github.visible=!0,this.github.position.set(0,0,0),R(-2.6,1.6,"point"),this.lead.rotation.y=0.7,D[2]=t0(0,0.6,0),W.position.set(1.2,2.6,7.5),H.set(0,1.4,0),W.fov=40;break}case"curtaincall":case"end":{L(0,-1.5,"down"),this.line.forEach((_)=>{_.rotation.x=P9(T(79),T(79)+1,J)*0.35*(1-P9(T(80),T(80)+1,J))}),R(0,3,J>T(82)?"face":"down",0.02),D[2]=t0(0,1.6,3),W.position.set(0,j(4.5,3,U),j(22,15,U)),H.set(0,3,2);break}}if($!=="curtaincall"&&$!=="end")for(let _ of this.line)_.rotation.x=0;if($!=="swamp"){this.wash.color.setHex(16771272);for(let _ of this.crates)if(_.visible)_.position.y=Math.max(0,_.position.y)}this.spots.forEach((_,z)=>{let V=D[z];if(_.light.intensity=V?O?110:75:0,_.beam.visible=!!V,!V)return;_.light.target.position.copy(V),_.light.target.updateMatrixWorld();let C=_.light.position,f=V.clone().sub(C),k=f.length(),b=Math.tan(_.light.angle)*k;_.beam.position.copy(C),_.beam.quaternion.setFromUnitVectors(t0(0,-1,0),f.normalize()),_.beam.scale.set(b,k,b),_.beam.material.opacity=O?0.045:0.025}),this.bloom.strength=0.3+G*0.15,W.aspect=1.7777777777777777,W.updateProjectionMatrix(),W.lookAt(H)}cratesUpTo(J,Q,$,Z=13){this.crates.slice(0,Q).forEach((K,U)=>{K.visible=!0;let Y=K.userData.home;if($){K.position.copy(Y);return}let W=oU[U],H=U<4?Z:Z+1,G=H0(H,W.word)-0.25;K.visible=J>=G-0.6,K.position.set(Y.x,Y.y+j(14,0,h9(G0(J,G-0.6,G))),Y.z)})}lastDropped(J,Q){let $=null;return oU.forEach((Z,K)=>{if(J>=H0(K<4?Q:Q+1,Z.word)-0.25)$=this.crates[K].position}),$}confettiAt(J,Q){this.confetti.visible=!0;for(let $=0;$<400;$++){let Z=J-Q-z0($)*0.6;h7.position.set(-12+z0($+1)*24,14-Math.max(0,Z)*(1.4+z0($+2))+Math.sin(J*3+$)*0.2,-5+z0($+3)*9),h7.rotation.set(J*3+$,J*2+$*0.3,0),h7.scale.setScalar(Z>0?1:0.001),h7.updateMatrix(),this.confetti.setMatrixAt($,h7.matrix)}this.confetti.instanceMatrix.needsUpdate=!0}render(){this.composer.render()}}function F1(J){for(let Q of Y7){if(Q.words[0].s>J+0.5)break;for(let $ of Q.words)if($.backing&&/nobody|knows/i.test($.w)&&J>=$.s-0.1&&J<=$.e+0.6)return 1}return 0}var E1=/^(data|everywhere|everywhere\.|nobody|knows|kidding|xp|wreck|swamp|deceased|tears|scary|never|mute|wrong)$/,O1=/^(ai|databricks|dataiku|sap|s3|redshift|azure|servicenow|confluence|github|cloud|agent|agents|autonomous|crm|lake)$/,R1=/^(kevin|denise|gary|stan|stan's|jess|ticket|tickets|meeting|calendar|slack|plant|bandwidth|raci|pilot|fourteen|nine|three|q3|vendor|cio|oil|follow-up|recurring)$/,$J=(J,Q,$="")=>`<div class="tile ${$}" data-at="${Q}"><b>${J.replace(/[^A-Z?]/g,"").slice(0,2)||"?"}</b><span>${J}</span><i>${$.includes("live")?"\uD83C\uDF99":"\uD83D\uDD07"}</i></div>`,O5={title:"Data Here, Data There",fonts:['400 100px "Limelight"','400 60px "DM Serif Display"','400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
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
      ${$J("Chris (presenting)","L59","live")}${$J("Denise","L59+0.2")}${$J("Platform team","L59+0.4")}
      ${$J("Gary · away","L59+0.6")}${$J("Databricks team","W61:databricks","live")}${$J("Dataiku team","W61:dataiku")}
      ${$J("SAP team · leaving","L62","live")}${$J("Kevin (2003)","L63")}${$J("Stan?","L64")}
    </div>
    <div class="share" data-at="L59">\uD83D\uDDA5 Can everyone see my screen? <b data-at="L60">You are muted</b></div></div>
  <div class="ov stamp big" data-show="W69:kidding|L70-0.1" data-at="W69:kidding">ACCESS DENIED</div>
  <div class="ov card invite" data-show="L79|E82"><div class="bar">\uD83D\uDCC5 new event · recurring</div>
    <h3>AI Readiness</h3>
    <div class="row">every week · <b>no end date</b></div>
    <div class="row" data-at="L81">data classification: <b>unknown</b></div>
    <div class="row muted" data-at="L82">owner: does anyone know?</div></div>`,endAt:()=>Y7.at(-2).words.at(-1).e+0.2,words:{hot:E1,ice:O1,gold:R1},hide:/^(spoken|sobbing|sob|ensemble|whispering|quietly|way|too|excited)$/,hud:(J,Q)=>{let $=[13,14,15,16,70,71,72].reduce((Z,K)=>Z+Y7[K].words.filter((U)=>!U.backing&&U.s<=J&&/^(databricks|dataiku|sap|s3|redshift|azure|servicenow|homegrown|plant|confluence)/i.test(U.w)).length,0);return{left:`data here, data there &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`systems <span class="ice">${Math.min(9,$)}</span> &nbsp;·&nbsp; access <b>${J>H0(69,/^kidding/i)?"denied":"pending"}</b>`}},shots:IZ,shotAt:BZ,world:(J)=>{let Q=new aU(J);return{update:($)=>Q.update($),render:()=>Q.render(),flash:($)=>Q.flash($),fade:($)=>Q.fade($)}}};var R5={"24-the-steep-part":N5,"04-read-the-diff":U5,"25-data-here-data-there":O5,"02-never-again":J5};var UJ=window.__SONG__,[,,_J="",iQ=""]=UJ?["","",UJ.slug,UJ.clipId]:location.pathname.split("/"),z5=new URLSearchParams(location.search),M1=z5.has("render");async function V1(){if(UJ)return UJ;let J=await fetch(`/api/timings/${_J}/${iQ}`);if(!J.ok)throw Error(`No timings for ${_J}/${iQ}`);return J.json()}var A5=R5[_J];if(!A5)throw Error(`No music video for ${_J}`);var o7=A5;document.title=`${o7.title} · video`;document.querySelector(".stage").setAttribute("data-song",_J);var{shots:rU,shotAt:_1}=o7,tU=await V1();if(!tU.features)throw Error("No audio features yet; run bun timings");XY(tU.lines,tU.features);var KJ=I7();await Promise.all(o7.fonts.map((J)=>document.fonts.load(J)));var g7=(J)=>document.querySelector(J),B1=g7(".stage"),iJ=o7.world(g7("#gl"));function P8(J){let Q=J.trim().match(/^(?:([LEW])(\d+)(?::([\w'-]+))?|([\d.]+))([+-][\d.]+)?$/);if(!Q)throw Error(`Bad time "${J}"`);let[,$,Z,K,U,Y]=Q,W=Number(Z);return(U?Number(U):$==="L"?T(W):$==="E"?R9(W):H0(W,new RegExp(`^\\W*${K}`,"i")))+Number(Y??0)}var oJ=g7("#overlays");oJ.innerHTML=`${o7.overlays(KJ)}
  <div class="ov endcard" data-show="${o7.endAt()}|${KJ+5}"><big>${o7.title}</big><span class="by">by Chris Towles</span>made with Claude Code and Opus 5.5<small class="made">${NY(_J)}</small></div>`;var L5=[...oJ.querySelectorAll("[data-show]")].map((J)=>{let[Q,$]=J.dataset.show.split("|");return{el:J,at:P8(Q),until:P8($)}}),I1=[...oJ.querySelectorAll("[data-at]:not([data-count]):not(.fill):not(.draw):not(.type)")].filter((J)=>!J.hasAttribute("data-show")).map((J)=>({el:J,at:P8(J.dataset.at)})),C1=[...oJ.querySelectorAll(".fill")].map((J)=>({el:J,at:P8(J.dataset.at),until:P8(J.dataset.until)})),z1=[...oJ.querySelectorAll("[data-count]")].map((J)=>{let[Q,$]=J.dataset.count.split(",").map(Number);return{el:J,from:Q,to:$,at:P8(J.dataset.at),until:P8(J.dataset.until),fmt:J.dataset.fmt??""}}),A1=[...oJ.querySelectorAll(".type")].map((J)=>({el:J,text:J.textContent??"",at:P8(J.dataset.at)})),L1=[...oJ.querySelectorAll(".draw")].map((J)=>{let Q=J.getTotalLength();return J.style.strokeDasharray=String(Q),{el:J,len:Q,at:P8(J.dataset.at),until:P8(J.dataset.until)}}),P1=new Set(L5.filter((J)=>J.el.classList.contains("stamp")).map((J)=>J.el));function M5(J,Q){if(J.style.opacity=String($7(Q*1.6)),J.classList.contains("stamp"))J.style.transform=`rotate(-8deg) scale(${2.4-1.4*h9(Q)})`;else if(J instanceof SVGElement)J.style.transform=`scale(${h9(Q)})`;else J.style.transform=`translateY(${(1-h9(Q))*16}px) scale(${0.85+0.15*h9(Q)})`}function w1(J){for(let Q of L5){let $=T1(J,Q.at,Q.until);if(P1.has(Q.el)){M5(Q.el,G0(J,Q.at,Q.at+0.18)),Q.el.style.opacity=String(Math.min(Number(Q.el.style.opacity),$));continue}Q.el.style.opacity=String($*(Q.el.classList.contains("blink")&&Math.sin(J*14)<-0.3?0.25:1)),Q.el.style.transform=`translateY(${(1-h9(G0(J,Q.at,Q.at+0.35)))*40}px)`}for(let Q of I1)if(M5(Q.el,G0(J,Q.at,Q.at+(Q.el.classList.contains("stamp")?0.18:0.25))),Q.el.classList.contains("btn"))Q.el.classList.toggle("on",J>=Q.at&&(Q.el.classList.contains("pick")||J<Q.at+0.45));for(let Q of C1)Q.el.style.width=`${G0(J,Q.at,Q.until)*100*Number(getComputedStyle(Q.el).getPropertyValue("--max")||1)}%`;for(let Q of z1){let $=Q.from+(Q.to-Q.from)*G0(J,Q.at,Q.until);Q.el.textContent=Q.fmt==="clock"?`${String(Math.floor($)).padStart(2,"0")}:${String(Math.floor($%1*60)).padStart(2,"0")}`:Q.fmt==="months"?`${Math.floor($)} months`:Q.fmt==="secs"?`0:${String(Math.floor($)).padStart(2,"0")}`:Math.floor($).toLocaleString()}for(let Q of A1)Q.el.textContent=Q.text.slice(0,Math.max(0,Math.floor((J-Q.at)*34)));for(let Q of L1)Q.el.style.strokeDashoffset=String(Q.len*(1-G0(J,Q.at,Q.until)))}var T1=(J,Q,$)=>$7((J-Q)/0.2)*$7(($-J)/0.25),{hot:S1,ice:k1,gold:j1}=o7.words,V5=(J)=>J.toLowerCase().replace(/[^a-z0-9'-]/g,""),ZJ=document.createElement("div");ZJ.className="cap";g7("#caption").appendChild(ZJ);var _5=-1,B5=[],I5=(J)=>Y7[J].spoken||Y7[J].words.some((Q)=>Q.backing&&/^\W*spoken/i.test(Q.w));function v1(J){let Q=-1;for(let K=0;K<Y7.length;K++)if(T(K)-0.15<=J)Q=K;let $=Q+1<Y7.length?T(Q+1)-0.15:1/0,Z=Q<0?0:Math.min($,R9(Q)+(I5(Q)?2.5:3.5));if(Q<0||J>Z||J>=o7.endAt()){ZJ.style.opacity="0";return}if(Q!==_5){_5=Q;let K=Y7[Q],U=/chorus/i.test(K.section),Y=I5(Q);ZJ.className=`cap ${U&&!Y?"chorus":""} ${Y?"spoken":""}`,ZJ.innerHTML="";let W=null;B5=K.words.filter((G)=>!(G.backing&&o7.hide?.test(V5(G.w)))).map((G)=>{let X=document.createElement("span"),F=V5(G.w);if(X.className=`w ${S1.test(F)?"hot":k1.test(F)?"ice":j1.test(F)?"gold":""}`,X.textContent=G.w,G.backing)(W??=ZJ.appendChild(Object.assign(document.createElement("div"),{className:"backing"}))).appendChild(X);else ZJ.appendChild(X);return{el:X,s:G.s}});let H=K.words.length;ZJ.style.fontSize=Y?"68px":U?"112px":`${H>14?62:H>10?76:92}px`}ZJ.style.opacity=String(1-G0(J,Z-0.15,Z));for(let K of B5){let U=G0(J,K.s-0.06,K.s+0.1);K.el.style.opacity=String($7(U*1.8)),K.el.style.transform=`translateY(${(1-h9(U))*0.35}em) scale(${1.25-0.25*h9(U)})`,K.el.style.filter=U<1?`blur(${(1-U)*10}px)`:""}}g7("#hud-title").textContent=o7.title;var y1=g7("#hud-l"),f1=g7("#hud-r"),b1=g7(".progress i"),h1=g7("#flash"),x1=g7("#black"),g1=g7("#hud");function p1(J){let{left:Q,right:$}=o7.hud(J,_1(J));y1.innerHTML=Q,f1.innerHTML=$,b1.style.width=`${($7(J/KJ)*100).toFixed(2)}%`}function C5(J){iJ.update(J),iJ.render(),w1(J),v1(J),p1(J),h1.style.opacity=String(iJ.flash(J)),x1.style.opacity=String(iJ.fade(J)),g1.style.opacity=String(1-iJ.fade(J))}if(M1)g7("#hint").remove(),Object.assign(window,{__renderAt:C5,__end:KJ,__shots:rU().map((J)=>({name:J.name,at:J.at,label:J.label,section:J.section})),__ready:!0});else{let J=new Audio(UJ?.audio??`/audio/${_J}/${iQ}.mp3`);J.preload="auto",J.currentTime=Number(z5.get("t")??0);let Q=()=>{let D=Math.min(innerWidth/1920,innerHeight/1080);B1.style.transform=`translate(${(innerWidth-1920*D)/2}px, ${(innerHeight-1080*D)/2}px) scale(${D})`};window.addEventListener("resize",Q),Q();let $=g7("#hint"),Z=(D)=>{J.currentTime=$7(D,0,KJ-0.05)},K=()=>{if($.remove(),J.paused)J.play();else J.pause()},U=(D)=>`${Math.floor(D/60)}:${String(Math.floor(D%60)).padStart(2,"0")}`,Y=rU().filter((D,E,I)=>I.findIndex((L)=>L.section===D.section&&Math.abs(L.at-D.at)<30)===E&&(E===0||I[E-1].section!==D.section)),W=document.createElement("div"),H=parent!==window&&!UJ;W.className=H?"player slim":"player",W.innerHTML=`<div class="pl-row"><button class="pl-play">▶</button><span class="pl-time">0:00</span>
    <input class="pl-seek" type="range" min="0" max="${KJ}" step="0.05" value="0" aria-label="Seek">
    <span class="pl-time">${U(KJ)}</span>${UJ?"":`<a href="/song/${_J}/take/${iQ}" target="_top"><button>lyrics</button></a>`}
    <button class="pl-hide" title="Hide controls (H)" aria-label="Hide controls">▾</button></div>
    <div class="pl-chips">${Y.map((D)=>`<button data-t="${Math.max(0,D.at-0.3)}">${D.section}</button>`).join("")}</div>`;let G=Object.assign(document.createElement("button"),{className:"pl-show",textContent:"▴",title:"Show controls (H)"});G.setAttribute("aria-label","Show controls"),document.body.append(W,G);let X=(D)=>{W.hidden=D,G.hidden=!D;try{localStorage.setItem("player-collapsed",D?"1":"")}catch{}},F=!1;try{F=localStorage.getItem("player-collapsed")==="1"}catch{}X(F),W.querySelector(".pl-hide").onclick=()=>X(!0),G.onclick=(D)=>{D.stopPropagation(),X(!1)};let N=W.querySelector(".pl-play"),q=W.querySelector(".pl-seek"),O=W.querySelector(".pl-time");if(N.onclick=K,q.oninput=()=>{$.remove(),Z(Number(q.value))},W.querySelectorAll("[data-t]").forEach((D)=>D.onclick=()=>{if($.remove(),Z(Number(D.dataset.t)),J.paused)J.play()}),W.addEventListener("click",(D)=>D.stopPropagation()),window.addEventListener("click",K),window.addEventListener("keydown",(D)=>{if(D.code==="Space")D.preventDefault(),K();if(D.code==="ArrowRight")Z(J.currentTime+5);if(D.code==="ArrowLeft")Z(J.currentTime-5);if(D.code==="KeyH")X(!W.hidden)}),parent!==window&&!UJ){let D=rU(),E=D.map((R,B)=>({key:`${R.name}@${R.at.toFixed(1)}`,name:R.name,label:R.label,section:R.section,at:Math.max(0,R.at),end:D[B+1]?.at??KJ,thumb:""})),I=(R)=>parent.postMessage({from:"video",clipId:iQ,...R},location.origin);I({type:"shots",shots:E}),setTimeout(()=>{let R=g7("#gl"),B=Object.assign(document.createElement("canvas"),{width:384,height:216}),_=B.getContext("2d");for(let z of E)iJ.update((z.at+Math.min(z.end,z.at+6))/2),iJ.render(),_.drawImage(R,0,0,384,216),z.thumb=B.toDataURL("image/jpeg",0.7);I({type:"shots",shots:E})},300);let L=-1;setInterval(()=>{let R=J.currentTime;if(R!==L)I({type:"time",t:L=R})},250),window.addEventListener("message",(R)=>{if(R.origin!==location.origin||R.data?.type!=="seek")return;if($.remove(),Z(Number(R.data.t)),J.paused)J.play()})}let M=()=>{let D=J.ended?KJ:J.currentTime;C5(D),N.textContent=J.paused?"▶":"❚❚",q.value=String(D),O.textContent=U(D),requestAnimationFrame(M)};M()}
