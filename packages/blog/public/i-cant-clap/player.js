var cH={"24-the-steep-part":"2026-10-18","04-read-the-diff":"2026-10-18","25-data-here-data-there":"2026-10-18","02-never-again":"2026-10-18","27-youre-absolutely-right":"2026-10-15","08-explain-the-function":"2026-10-21"},rO=Object.keys(cH),nH=(J)=>{let Q=cH[J];return Q?new Date(`${Q}T12:00:00Z`).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}):""};var U7=[],BJ={fps:30,duration:0,rms:[0],bass:[0],bpm:120,beatOffset:0};function sH(J,Q){U7=J,BJ=Q}var q7=()=>BJ.duration,I=(J)=>U7[Math.min(J,U7.length-1)].words[0].s,n0=(J)=>U7[J].words.at(-1).e,J0=(J,Q)=>(U7[J].words.find((Z)=>Q.test(Z.w))??U7[J].words[0]).s,S9=(J,Q=0,Z=1)=>Math.min(Z,Math.max(Q,J)),j=(J,Q,Z)=>J+(Q-J)*Z,W9=(J,Q,Z)=>{let $=S9((Z-J)/(Q-J));return $*$*(3-2*$)},$9=(J)=>1-Math.pow(1-S9(J),3),r8=(J)=>Math.pow(S9(J),3),B9=(J)=>{J=S9(J);let Q=1.9;return 1+(Q+1)*Math.pow(J-1,3)+Q*Math.pow(J-1,2)},p9=(J,Q,Z,$=0.3,K=0.3)=>W9(Q,Q+$,J)*(1-W9(Z-K,Z,J)),$0=(J,Q,Z)=>S9((J-Q)/(Z-Q)),PX=(J)=>S9(Math.floor(J*BJ.fps),0,BJ.rms.length-1);var RZ=(J)=>{let Q=PX(J),Z=BJ.bass,$=(K)=>Z[Math.max(0,K)]??0;return($(Q)*2+$(Q-1)+$(Q-2))/4},Q8=()=>60/BJ.bpm,P7=(J)=>{let Q=Q8(),Z=((J-BJ.beatOffset)%Q+Q)%Q;return Math.exp(-Z*9)},E6=(J)=>Math.max(0,Math.floor((J-BJ.beatOffset)/Q8())),M0=(J)=>{let Q=Math.sin(J*127.1+311.7)*43758.5453;return Q-Math.floor(Q)};var jY="186";var vY=0,TK=1,yY=2;var PQ=1,LJ=2,p6=3,u6=0,B7=1,m9=2,s7=0,CQ=1,H7=2,wK=3,SK=4,fY=5;var m6=100,bY=101,xY=102,hY=103,gY=104,pY=200,uY=201,mY=202,dY=203,lY=204,cY=205,nY=206,sY=207,iY=208,oY=209,aY=210,rY=211,tY=212,eY=213,JW=214,QW=0,ZW=1,$W=2,kK=3,KW=4,UW=5,HW=6,YW=7,WW=0,XW=1,GW=2,B8=0,LQ=1,TQ=2,wQ=3,K8=4,SQ=5,kQ=6,jQ=7;var d6=301,mJ=302,Z$=303,$$=304,vQ=306,m8=1000,K$=1001,NW=1002,U8=1003,qW=1004;var yQ=1005;var i7=1006,U$=1007;var dJ=1008;var _8=1009,DW=1010,FW=1011,fQ=1012,jK=1013,TJ=1014,UJ=1015,L7=1016,vK=1017,yK=1018,l6=1020,OW=35902,MW=35899,RW=1021,EW=1022,d8=1023,lJ=1026,cJ=1027,VW=1028,fK=1029,nJ=1030,bK=1031;var xK=1033,H$=33776,Y$=33777,W$=33778,X$=33779,hK=35840,gK=35841,pK=35842,uK=35843,mK=36196,dK=37492,lK=37496,cK=37488,nK=37489,G$=37490,sK=37491,iK=37808,oK=37809,aK=37810,rK=37811,tK=37812,eK=37813,JU=37814,QU=37815,ZU=37816,$U=37817,KU=37818,UU=37819,HU=37820,YU=37821,WU=36492,XU=36494,GU=36495,NU=36283,qU=36284,N$=36285,DU=36286;var FU=3201;var OU=0,IW=1,sJ="",F7="srgb",MU="srgb-linear",RU="linear",o9="srgb";var BW=512,_W=513,AW=514,q$=515,zW=516,PW=517,D$=518,CW=519;var EU="300 es",VU=2000;function CX(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function LX(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function EQ(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function LW(){let J=EQ("canvas");return J.style.display="block",J}var iH={},h6=null;function VQ(...J){let Q="THREE."+J.shift();if(h6)h6("log",Q,...J);else console.log(Q,...J)}function TW(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let Z=J[1];if(Z&&Z.isStackTrace)J[0]+=" "+Z.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function H9(...J){J=TW(J);let Q="THREE."+J.shift();if(h6)h6("warn",Q,...J);else{let Z=J[0];if(Z&&Z.isStackTrace)console.warn(Z.getError(Q));else console.warn(Q,...J)}}function X9(...J){J=TW(J);let Q="THREE."+J.shift();if(h6)h6("error",Q,...J);else{let Z=J[0];if(Z&&Z.isStackTrace)console.error(Z.getError(Q));else console.error(Q,...J)}}function pJ(...J){let Q=J.join(" ");if(Q in iH)return;iH[Q]=!0,H9(...J)}function wW(J,Q,Z){return new Promise(function($,K){function U(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:K();break;case J.TIMEOUT_EXPIRED:setTimeout(U,Z);break;default:$()}}setTimeout(U,Z)})}var SW={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class HJ{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let Z=this._listeners;if(Z[J]===void 0)Z[J]=[];if(Z[J].indexOf(Q)===-1)Z[J].push(Q)}hasEventListener(J,Q){let Z=this._listeners;if(Z===void 0)return!1;return Z[J]!==void 0&&Z[J].indexOf(Q)!==-1}removeEventListener(J,Q){let Z=this._listeners;if(Z===void 0)return;let $=Z[J];if($!==void 0){let K=$.indexOf(Q);if(K!==-1)$.splice(K,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let Z=Q[J.type];if(Z!==void 0){J.target=this;let $=Z.slice(0);for(let K=0,U=$.length;K<U;K++)$[K].call(this,J);J.target=null}}}var b7=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var aZ=Math.PI/180,IQ=180/Math.PI;function $J(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,Z=Math.random()*4294967295|0,$=Math.random()*4294967295|0;return(b7[J&255]+b7[J>>8&255]+b7[J>>16&255]+b7[J>>24&255]+"-"+b7[Q&255]+b7[Q>>8&255]+"-"+b7[Q>>16&15|64]+b7[Q>>24&255]+"-"+b7[Z&63|128]+b7[Z>>8&255]+"-"+b7[Z>>16&255]+b7[Z>>24&255]+b7[$&255]+b7[$>>8&255]+b7[$>>16&255]+b7[$>>24&255]).toLowerCase()}function z9(J,Q,Z){return Math.max(Q,Math.min(Z,J))}function TX(J,Q){return(J%Q+Q)%Q}function r$(J,Q,Z){return(1-Z)*J+Z*Q}function g8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:case Uint8ClampedArray:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function t9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class q0{static{q0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,Z=this.y,$=J.elements;return this.x=$[0]*Q+$[3]*Z+$[6],this.y=$[1]*Q+$[4]*Z+$[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=z9(this.x,J.x,Q.x),this.y=z9(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=z9(this.x,J,Q),this.y=z9(this.y,J,Q),this}clampLength(J,Q){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(z9(Z,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let Z=this.dot(J)/Q;return Math.acos(z9(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,Z=this.y-J.y;return Q*Q+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,Z){return this.x=J.x+(Q.x-J.x)*Z,this.y=J.y+(Q.y-J.y)*Z,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let Z=Math.cos(Q),$=Math.sin(Q),K=this.x-J.x,U=this.y-J.y;return this.x=K*Z-U*$+J.x,this.y=K*$+U*Z+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class A8{constructor(J=0,Q=0,Z=0,$=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=Z,this._w=$}static slerpFlat(J,Q,Z,$,K,U,H){let Y=Z[$+0],W=Z[$+1],X=Z[$+2],G=Z[$+3],q=K[U+0],N=K[U+1],D=K[U+2],M=K[U+3];if(G!==M||Y!==q||W!==N||X!==D){let V=Y*q+W*N+X*D+G*M;if(V<0)q=-q,N=-N,D=-D,M=-M,V=-V;let F=1-H;if(V<0.9995){let O=Math.acos(V),z=Math.sin(O);F=Math.sin(F*O)/z,H=Math.sin(H*O)/z,Y=Y*F+q*H,W=W*F+N*H,X=X*F+D*H,G=G*F+M*H}else{Y=Y*F+q*H,W=W*F+N*H,X=X*F+D*H,G=G*F+M*H;let O=1/Math.sqrt(Y*Y+W*W+X*X+G*G);Y*=O,W*=O,X*=O,G*=O}}J[Q]=Y,J[Q+1]=W,J[Q+2]=X,J[Q+3]=G}static multiplyQuaternionsFlat(J,Q,Z,$,K,U){let H=Z[$],Y=Z[$+1],W=Z[$+2],X=Z[$+3],G=K[U],q=K[U+1],N=K[U+2],D=K[U+3];return J[Q]=H*D+X*G+Y*N-W*q,J[Q+1]=Y*D+X*q+W*G-H*N,J[Q+2]=W*D+X*N+H*q-Y*G,J[Q+3]=X*D-H*G-Y*q-W*N,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,Z,$){return this._x=J,this._y=Q,this._z=Z,this._w=$,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:Z,_y:$,_z:K,_order:U}=J,H=Math.cos,Y=Math.sin,W=H(Z/2),X=H($/2),G=H(K/2),q=Y(Z/2),N=Y($/2),D=Y(K/2);switch(U){case"XYZ":this._x=q*X*G+W*N*D,this._y=W*N*G-q*X*D,this._z=W*X*D+q*N*G,this._w=W*X*G-q*N*D;break;case"YXZ":this._x=q*X*G+W*N*D,this._y=W*N*G-q*X*D,this._z=W*X*D-q*N*G,this._w=W*X*G+q*N*D;break;case"ZXY":this._x=q*X*G-W*N*D,this._y=W*N*G+q*X*D,this._z=W*X*D+q*N*G,this._w=W*X*G-q*N*D;break;case"ZYX":this._x=q*X*G-W*N*D,this._y=W*N*G+q*X*D,this._z=W*X*D-q*N*G,this._w=W*X*G+q*N*D;break;case"YZX":this._x=q*X*G+W*N*D,this._y=W*N*G+q*X*D,this._z=W*X*D-q*N*G,this._w=W*X*G-q*N*D;break;case"XZY":this._x=q*X*G-W*N*D,this._y=W*N*G-q*X*D,this._z=W*X*D+q*N*G,this._w=W*X*G+q*N*D;break;default:H9("Quaternion: .setFromEuler() encountered an unknown order: "+U)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let Z=Q/2,$=Math.sin(Z);return this._x=J.x*$,this._y=J.y*$,this._z=J.z*$,this._w=Math.cos(Z),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,Z=Q[0],$=Q[4],K=Q[8],U=Q[1],H=Q[5],Y=Q[9],W=Q[2],X=Q[6],G=Q[10],q=Z+H+G;if(q>0){let N=0.5/Math.sqrt(q+1);this._w=0.25/N,this._x=(X-Y)*N,this._y=(K-W)*N,this._z=(U-$)*N}else if(Z>H&&Z>G){let N=2*Math.sqrt(1+Z-H-G);this._w=(X-Y)/N,this._x=0.25*N,this._y=($+U)/N,this._z=(K+W)/N}else if(H>G){let N=2*Math.sqrt(1+H-Z-G);this._w=(K-W)/N,this._x=($+U)/N,this._y=0.25*N,this._z=(Y+X)/N}else{let N=2*Math.sqrt(1+G-Z-H);this._w=(U-$)/N,this._x=(K+W)/N,this._y=(Y+X)/N,this._z=0.25*N}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let Z=J.dot(Q)+1;if(Z<0.00000001)if(Z=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Z;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Z;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=Z;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(z9(this.dot(J),-1,1)))}rotateTowards(J,Q){let Z=this.angleTo(J);if(Z===0)return this;let $=Math.min(1,Q/Z);return this.slerp(J,$),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:Z,_y:$,_z:K,_w:U}=J,H=Q._x,Y=Q._y,W=Q._z,X=Q._w;return this._x=Z*X+U*H+$*W-K*Y,this._y=$*X+U*Y+K*H-Z*W,this._z=K*X+U*W+Z*Y-$*H,this._w=U*X-Z*H-$*Y-K*W,this._onChangeCallback(),this}slerp(J,Q){let{_x:Z,_y:$,_z:K,_w:U}=J,H=this.dot(J);if(H<0)Z=-Z,$=-$,K=-K,U=-U,H=-H;let Y=1-Q;if(H<0.9995){let W=Math.acos(H),X=Math.sin(W);Y=Math.sin(Y*W)/X,Q=Math.sin(Q*W)/X,this._x=this._x*Y+Z*Q,this._y=this._y*Y+$*Q,this._z=this._z*Y+K*Q,this._w=this._w*Y+U*Q,this._onChangeCallback()}else this._x=this._x*Y+Z*Q,this._y=this._y*Y+$*Q,this._z=this._z*Y+K*Q,this._w=this._w*Y+U*Q,this.normalize();return this}slerpQuaternions(J,Q,Z){return this.copy(J).slerp(Q,Z)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),Z=Math.random(),$=Math.sqrt(1-Z),K=Math.sqrt(Z);return this.set($*Math.sin(J),$*Math.cos(J),K*Math.sin(Q),K*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{static{k.prototype.isVector3=!0}constructor(J=0,Q=0,Z=0){this.x=J,this.y=Q,this.z=Z}set(J,Q,Z){if(Z===void 0)Z=this.z;return this.x=J,this.y=Q,this.z=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(oH.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(oH.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,Z=this.y,$=this.z,K=J.elements;return this.x=K[0]*Q+K[3]*Z+K[6]*$,this.y=K[1]*Q+K[4]*Z+K[7]*$,this.z=K[2]*Q+K[5]*Z+K[8]*$,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,Z=this.y,$=this.z,K=J.elements,U=1/(K[3]*Q+K[7]*Z+K[11]*$+K[15]);return this.x=(K[0]*Q+K[4]*Z+K[8]*$+K[12])*U,this.y=(K[1]*Q+K[5]*Z+K[9]*$+K[13])*U,this.z=(K[2]*Q+K[6]*Z+K[10]*$+K[14])*U,this}applyQuaternion(J){let Q=this.x,Z=this.y,$=this.z,K=J.x,U=J.y,H=J.z,Y=J.w,W=2*(U*$-H*Z),X=2*(H*Q-K*$),G=2*(K*Z-U*Q);return this.x=Q+Y*W+U*G-H*X,this.y=Z+Y*X+H*W-K*G,this.z=$+Y*G+K*X-U*W,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,Z=this.y,$=this.z,K=J.elements;return this.x=K[0]*Q+K[4]*Z+K[8]*$,this.y=K[1]*Q+K[5]*Z+K[9]*$,this.z=K[2]*Q+K[6]*Z+K[10]*$,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=z9(this.x,J.x,Q.x),this.y=z9(this.y,J.y,Q.y),this.z=z9(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=z9(this.x,J,Q),this.y=z9(this.y,J,Q),this.z=z9(this.z,J,Q),this}clampLength(J,Q){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(z9(Z,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,Z){return this.x=J.x+(Q.x-J.x)*Z,this.y=J.y+(Q.y-J.y)*Z,this.z=J.z+(Q.z-J.z)*Z,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:Z,y:$,z:K}=J,U=Q.x,H=Q.y,Y=Q.z;return this.x=$*Y-K*H,this.y=K*U-Z*Y,this.z=Z*H-$*U,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let Z=J.dot(this)/Q;return this.copy(J).multiplyScalar(Z)}projectOnPlane(J){return t$.copy(this).projectOnVector(J),this.sub(t$)}reflect(J){return this.sub(t$.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let Z=this.dot(J)/Q;return Math.acos(z9(Z,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,Z=this.y-J.y,$=this.z-J.z;return Q*Q+Z*Z+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,Z){let $=Math.sin(Q)*J;return this.x=$*Math.sin(Z),this.y=Math.cos(Q)*J,this.z=$*Math.cos(Z),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,Z){return this.x=J*Math.sin(Q),this.y=Z,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),Z=this.setFromMatrixColumn(J,1).length(),$=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=Z,this.z=$,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,Z=Math.sqrt(1-Q*Q);return this.x=Z*Math.cos(J),this.y=Q,this.z=Z*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var t$=new k,oH=new A8;class D9{static{D9.prototype.isMatrix3=!0}constructor(J,Q,Z,$,K,U,H,Y,W){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,Z,$,K,U,H,Y,W)}set(J,Q,Z,$,K,U,H,Y,W){let X=this.elements;return X[0]=J,X[1]=$,X[2]=H,X[3]=Q,X[4]=K,X[5]=Y,X[6]=Z,X[7]=U,X[8]=W,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,Z=J.elements;return Q[0]=Z[0],Q[1]=Z[1],Q[2]=Z[2],Q[3]=Z[3],Q[4]=Z[4],Q[5]=Z[5],Q[6]=Z[6],Q[7]=Z[7],Q[8]=Z[8],this}extractBasis(J,Q,Z){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),Z.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let Z=J.elements,$=Q.elements,K=this.elements,U=Z[0],H=Z[3],Y=Z[6],W=Z[1],X=Z[4],G=Z[7],q=Z[2],N=Z[5],D=Z[8],M=$[0],V=$[3],F=$[6],O=$[1],z=$[4],C=$[7],R=$[2],B=$[5],_=$[8];return K[0]=U*M+H*O+Y*R,K[3]=U*V+H*z+Y*B,K[6]=U*F+H*C+Y*_,K[1]=W*M+X*O+G*R,K[4]=W*V+X*z+G*B,K[7]=W*F+X*C+G*_,K[2]=q*M+N*O+D*R,K[5]=q*V+N*z+D*B,K[8]=q*F+N*C+D*_,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],Z=J[1],$=J[2],K=J[3],U=J[4],H=J[5],Y=J[6],W=J[7],X=J[8];return Q*U*X-Q*H*W-Z*K*X+Z*H*Y+$*K*W-$*U*Y}invert(){let J=this.elements,Q=J[0],Z=J[1],$=J[2],K=J[3],U=J[4],H=J[5],Y=J[6],W=J[7],X=J[8],G=X*U-H*W,q=H*Y-X*K,N=W*K-U*Y,D=Q*G+Z*q+$*N;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/D;return J[0]=G*M,J[1]=($*W-X*Z)*M,J[2]=(H*Z-$*U)*M,J[3]=q*M,J[4]=(X*Q-$*Y)*M,J[5]=($*K-H*Q)*M,J[6]=N*M,J[7]=(Z*Y-W*Q)*M,J[8]=(U*Q-Z*K)*M,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,Z,$,K,U,H){let Y=Math.cos(K),W=Math.sin(K);return this.set(Z*Y,Z*W,-Z*(Y*U+W*H)+U+J,-$*W,$*Y,-$*(-W*U+Y*H)+H+Q,0,0,1),this}scale(J,Q){return pJ("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(e$.makeScale(J,Q)),this}rotate(J){return pJ("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(e$.makeRotation(-J)),this}translate(J,Q){return pJ("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(e$.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),Z=Math.sin(J);return this.set(Q,-Z,0,Z,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,Z=J.elements;for(let $=0;$<9;$++)if(Q[$]!==Z[$])return!1;return!0}fromArray(J,Q=0){for(let Z=0;Z<9;Z++)this.elements[Z]=J[Z+Q];return this}toArray(J=[],Q=0){let Z=this.elements;return J[Q]=Z[0],J[Q+1]=Z[1],J[Q+2]=Z[2],J[Q+3]=Z[3],J[Q+4]=Z[4],J[Q+5]=Z[5],J[Q+6]=Z[6],J[Q+7]=Z[7],J[Q+8]=Z[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var e$=new D9,aH=new D9().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),rH=new D9().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function wX(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(K,U,H){if(this.enabled===!1||U===H||!U||!H)return K;if(this.spaces[U].transfer==="srgb")K.r=KJ(K.r),K.g=KJ(K.g),K.b=KJ(K.b);if(this.spaces[U].primaries!==this.spaces[H].primaries)K.applyMatrix3(this.spaces[U].toXYZ),K.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")K.r=x6(K.r),K.g=x6(K.g),K.b=x6(K.b);return K},workingToColorSpace:function(K,U){return this.convert(K,this.workingColorSpace,U)},colorSpaceToWorking:function(K,U){return this.convert(K,U,this.workingColorSpace)},getPrimaries:function(K){return this.spaces[K].primaries},getTransfer:function(K){if(K==="")return"linear";return this.spaces[K].transfer},getToneMappingMode:function(K){return this.spaces[K].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(K,U=this.workingColorSpace){return K.fromArray(this.spaces[U].luminanceCoefficients)},define:function(K){Object.assign(this.spaces,K)},_getMatrix:function(K,U,H){return K.copy(this.spaces[U].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(K){return this.spaces[K].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(K=this.workingColorSpace){return this.spaces[K].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(K,U){return pJ("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(K,U)},toWorkingColorSpace:function(K,U){return pJ("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(K,U)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],Z=[0.2126,0.7152,0.0722],$=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:$,transfer:"linear",toXYZ:aH,fromXYZ:rH,luminanceCoefficients:Z,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:$,transfer:"srgb",toXYZ:aH,fromXYZ:rH,luminanceCoefficients:Z,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var A9=wX();function KJ(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function x6(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var V6;class IU{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let Z;if(J instanceof HTMLCanvasElement)Z=J;else{if(V6===void 0)V6=EQ("canvas");V6.width=J.width,V6.height=J.height;let $=V6.getContext("2d");if(J instanceof ImageData)$.putImageData(J,0,0);else $.drawImage(J,0,0,J.width,J.height);Z=V6}return Z.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=EQ("canvas");Q.width=J.width,Q.height=J.height;let Z=Q.getContext("2d");Z.drawImage(J,0,0,J.width,J.height);let $=Z.getImageData(0,0,J.width,J.height),K=$.data;for(let U=0;U<K.length;U++)K[U]=KJ(K[U]/255)*255;return Z.putImageData($,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let Z=0;Z<Q.length;Z++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[Z]=Math.floor(KJ(Q[Z]/255)*255);else Q[Z]=KJ(Q[Z]);return{data:Q,width:J.width,height:J.height}}else return H9("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var SX=0;class bQ{constructor(J=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:SX++}),this.uuid=$J(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Z={uuid:this.uuid,url:""},$=this.data;if($!==null){let K;if(Array.isArray($)){K=[];for(let U=0,H=$.length;U<H;U++)if($[U].isDataTexture)K.push(JK($[U].image));else K.push(JK($[U]))}else K=JK($);Z.url=K}if(!Q)J.images[this.uuid]=Z;return Z}}function JK(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return IU.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return H9("Texture: Unable to serialize Texture."),{}}var kX=0,QK=new k;class v7 extends HJ{constructor(J=v7.DEFAULT_IMAGE,Q=v7.DEFAULT_MAPPING,Z=1001,$=1001,K=1006,U=1008,H=1023,Y=1009,W=v7.DEFAULT_ANISOTROPY,X=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:kX++}),this.uuid=$J(),this.name="",this.source=new bQ(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=Z,this.wrapT=$,this.magFilter=K,this.minFilter=U,this.anisotropy=W,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new q0(0,0),this.repeat=new q0(1,1),this.center=new q0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new D9,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=X,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(QK).x}get height(){return this.source.getSize(QK).y}get depth(){return this.source.getSize(QK).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let Z=J[Q];if(Z===void 0){H9(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let $=this[Q];if($===void 0){H9(`Texture.setValues(): property '${Q}' does not exist.`);continue}if($&&Z&&($.isVector2&&Z.isVector2))$.copy(Z);else if($&&Z&&($.isVector3&&Z.isVector3))$.copy(Z);else if($&&Z&&($.isMatrix3&&Z.isMatrix3))$.copy(Z);else this[Q]=Z}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Z={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(!Q)J.textures[this.uuid]=Z;return Z}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}v7.DEFAULT_IMAGE=null;v7.DEFAULT_MAPPING=300;v7.DEFAULT_ANISOTROPY=1;class X7{static{X7.prototype.isVector4=!0}constructor(J=0,Q=0,Z=0,$=1){this.x=J,this.y=Q,this.z=Z,this.w=$}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,Z,$){return this.x=J,this.y=Q,this.z=Z,this.w=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,Z=this.y,$=this.z,K=this.w,U=J.elements;return this.x=U[0]*Q+U[4]*Z+U[8]*$+U[12]*K,this.y=U[1]*Q+U[5]*Z+U[9]*$+U[13]*K,this.z=U[2]*Q+U[6]*Z+U[10]*$+U[14]*K,this.w=U[3]*Q+U[7]*Z+U[11]*$+U[15]*K,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,Z,$,K,U=0.01,H=0.1,Y=J.elements,W=Y[0],X=Y[4],G=Y[8],q=Y[1],N=Y[5],D=Y[9],M=Y[2],V=Y[6],F=Y[10];if(Math.abs(X-q)<0.01&&Math.abs(G-M)<0.01&&Math.abs(D-V)<0.01){if(Math.abs(X+q)<0.1&&Math.abs(G+M)<0.1&&Math.abs(D+V)<0.1&&Math.abs(W+N+F-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let z=(W+1)/2,C=(N+1)/2,R=(F+1)/2,B=(X+q)/4,_=(G+M)/4,P=(D+V)/4;if(z>C&&z>R)if(z<0.01)Z=0,$=0.707106781,K=0.707106781;else Z=Math.sqrt(z),$=B/Z,K=_/Z;else if(C>R)if(C<0.01)Z=0.707106781,$=0,K=0.707106781;else $=Math.sqrt(C),Z=B/$,K=P/$;else if(R<0.01)Z=0.707106781,$=0.707106781,K=0;else K=Math.sqrt(R),Z=_/K,$=P/K;return this.set(Z,$,K,Q),this}let O=Math.sqrt((V-D)*(V-D)+(G-M)*(G-M)+(q-X)*(q-X));if(Math.abs(O)<0.001)O=1;return this.x=(V-D)/O,this.y=(G-M)/O,this.z=(q-X)/O,this.w=Math.acos((W+N+F-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=z9(this.x,J.x,Q.x),this.y=z9(this.y,J.y,Q.y),this.z=z9(this.z,J.z,Q.z),this.w=z9(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=z9(this.x,J,Q),this.y=z9(this.y,J,Q),this.z=z9(this.z,J,Q),this.w=z9(this.w,J,Q),this}clampLength(J,Q){let Z=this.length();return this.divideScalar(Z||1).multiplyScalar(z9(Z,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,Z){return this.x=J.x+(Q.x-J.x)*Z,this.y=J.y+(Q.y-J.y)*Z,this.z=J.z+(Q.z-J.z)*Z,this.w=J.w+(Q.w-J.w)*Z,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class BU extends HJ{constructor(J=1,Q=1,Z={}){super();Z=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},Z),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=Z.depth,this.scissor=new X7(0,0,J,Q),this.scissorTest=!1,this.viewport=new X7(0,0,J,Q),this.textures=[];let $={width:J,height:Q,depth:Z.depth},K=new v7($),U=Z.count;for(let H=0;H<U;H++)this.textures[H]=K.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions(Z),this.depthBuffer=Z.depthBuffer,this.stencilBuffer=Z.stencilBuffer,this.resolveColorBuffer=Z.resolveColorBuffer,this.resolveDepthBuffer=Z.resolveDepthBuffer,this.resolveStencilBuffer=Z.resolveStencilBuffer,this.storeMultisampledColorBuffer=Z.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=Z.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=Z.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=Z.depthTexture,this.samples=Z.samples,this.multiview=Z.multiview,this.useArrayDepthTexture=Z.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let Z=0;Z<this.textures.length;Z++)this.textures[Z].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(J!==null&&J.renderTarget===null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,Z=1){if(this.width!==J||this.height!==Q||this.depth!==Z){this.width=J,this.height=Q,this.depth=Z;for(let $=0,K=this.textures.length;$<K;$++)if(this.textures[$].image.width=J,this.textures[$].image.height=Q,this.textures[$].image.depth=Z,this.textures[$].isData3DTexture!==!0)this.textures[$].isArrayTexture=this.textures[$].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,Z=J.textures.length;Q<Z;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let $=Object.assign({},J.textures[Q].image);this.textures[Q].source=new bQ($)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveColorBuffer=J.resolveColorBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,this.storeMultisampledColorBuffer=J.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=J.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=J.storeMultisampledStencilBuffer,J.depthTexture!==null)if(J.depthTexture.renderTarget===J){let Q=J.depthTexture.clone();Q.renderTarget=null,this.depthTexture=Q}else this.depthTexture=J.depthTexture;return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class M7 extends BU{constructor(J=1,Q=1,Z={}){super(J,Q,Z);this.isWebGLRenderTarget=!0}}class F$ extends v7{constructor(J=null,Q=1,Z=1,$=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:Z,depth:$},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class _U extends v7{constructor(J=null,Q=1,Z=1,$=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:Z,depth:$},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}}class x9{static{x9.prototype.isMatrix4=!0}constructor(J,Q,Z,$,K,U,H,Y,W,X,G,q,N,D,M,V){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,Z,$,K,U,H,Y,W,X,G,q,N,D,M,V)}set(J,Q,Z,$,K,U,H,Y,W,X,G,q,N,D,M,V){let F=this.elements;return F[0]=J,F[4]=Q,F[8]=Z,F[12]=$,F[1]=K,F[5]=U,F[9]=H,F[13]=Y,F[2]=W,F[6]=X,F[10]=G,F[14]=q,F[3]=N,F[7]=D,F[11]=M,F[15]=V,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new x9().fromArray(this.elements)}copy(J){let Q=this.elements,Z=J.elements;return Q[0]=Z[0],Q[1]=Z[1],Q[2]=Z[2],Q[3]=Z[3],Q[4]=Z[4],Q[5]=Z[5],Q[6]=Z[6],Q[7]=Z[7],Q[8]=Z[8],Q[9]=Z[9],Q[10]=Z[10],Q[11]=Z[11],Q[12]=Z[12],Q[13]=Z[13],Q[14]=Z[14],Q[15]=Z[15],this}copyPosition(J){let Q=this.elements,Z=J.elements;return Q[12]=Z[12],Q[13]=Z[13],Q[14]=Z[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,Z){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),Z.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),Z.setFromMatrixColumn(this,2),this}makeBasis(J,Q,Z){return this.set(J.x,Q.x,Z.x,0,J.y,Q.y,Z.y,0,J.z,Q.z,Z.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,Z=J.elements,$=1/I6.setFromMatrixColumn(J,0).length(),K=1/I6.setFromMatrixColumn(J,1).length(),U=1/I6.setFromMatrixColumn(J,2).length();return Q[0]=Z[0]*$,Q[1]=Z[1]*$,Q[2]=Z[2]*$,Q[3]=0,Q[4]=Z[4]*K,Q[5]=Z[5]*K,Q[6]=Z[6]*K,Q[7]=0,Q[8]=Z[8]*U,Q[9]=Z[9]*U,Q[10]=Z[10]*U,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,Z=J.x,$=J.y,K=J.z,U=Math.cos(Z),H=Math.sin(Z),Y=Math.cos($),W=Math.sin($),X=Math.cos(K),G=Math.sin(K);if(J.order==="XYZ"){let q=U*X,N=U*G,D=H*X,M=H*G;Q[0]=Y*X,Q[4]=-Y*G,Q[8]=W,Q[1]=N+D*W,Q[5]=q-M*W,Q[9]=-H*Y,Q[2]=M-q*W,Q[6]=D+N*W,Q[10]=U*Y}else if(J.order==="YXZ"){let q=Y*X,N=Y*G,D=W*X,M=W*G;Q[0]=q+M*H,Q[4]=D*H-N,Q[8]=U*W,Q[1]=U*G,Q[5]=U*X,Q[9]=-H,Q[2]=N*H-D,Q[6]=M+q*H,Q[10]=U*Y}else if(J.order==="ZXY"){let q=Y*X,N=Y*G,D=W*X,M=W*G;Q[0]=q-M*H,Q[4]=-U*G,Q[8]=D+N*H,Q[1]=N+D*H,Q[5]=U*X,Q[9]=M-q*H,Q[2]=-U*W,Q[6]=H,Q[10]=U*Y}else if(J.order==="ZYX"){let q=U*X,N=U*G,D=H*X,M=H*G;Q[0]=Y*X,Q[4]=D*W-N,Q[8]=q*W+M,Q[1]=Y*G,Q[5]=M*W+q,Q[9]=N*W-D,Q[2]=-W,Q[6]=H*Y,Q[10]=U*Y}else if(J.order==="YZX"){let q=U*Y,N=U*W,D=H*Y,M=H*W;Q[0]=Y*X,Q[4]=M-q*G,Q[8]=D*G+N,Q[1]=G,Q[5]=U*X,Q[9]=-H*X,Q[2]=-W*X,Q[6]=N*G+D,Q[10]=q-M*G}else if(J.order==="XZY"){let q=U*Y,N=U*W,D=H*Y,M=H*W;Q[0]=Y*X,Q[4]=-G,Q[8]=W*X,Q[1]=q*G+M,Q[5]=U*X,Q[9]=N*G-D,Q[2]=D*G-N,Q[6]=H*X,Q[10]=M*G+q}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(jX,J,vX)}lookAt(J,Q,Z){let $=this.elements;if(Z8.subVectors(J,Q),Z8.lengthSq()===0)Z8.z=1;if(Z8.normalize(),_J.crossVectors(Z,Z8),_J.lengthSq()===0){if(Math.abs(Z.z)===1)Z8.x+=0.0001;else Z8.z+=0.0001;Z8.normalize(),_J.crossVectors(Z,Z8)}return _J.normalize(),EZ.crossVectors(Z8,_J),$[0]=_J.x,$[4]=EZ.x,$[8]=Z8.x,$[1]=_J.y,$[5]=EZ.y,$[9]=Z8.y,$[2]=_J.z,$[6]=EZ.z,$[10]=Z8.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let Z=J.elements,$=Q.elements,K=this.elements,U=Z[0],H=Z[4],Y=Z[8],W=Z[12],X=Z[1],G=Z[5],q=Z[9],N=Z[13],D=Z[2],M=Z[6],V=Z[10],F=Z[14],O=Z[3],z=Z[7],C=Z[11],R=Z[15],B=$[0],_=$[4],P=$[8],E=$[12],A=$[1],y=$[5],S=$[9],b=$[13],e=$[2],v=$[6],l=$[10],U0=$[14],i=$[3],r=$[7],u=$[11],h=$[15];return K[0]=U*B+H*A+Y*e+W*i,K[4]=U*_+H*y+Y*v+W*r,K[8]=U*P+H*S+Y*l+W*u,K[12]=U*E+H*b+Y*U0+W*h,K[1]=X*B+G*A+q*e+N*i,K[5]=X*_+G*y+q*v+N*r,K[9]=X*P+G*S+q*l+N*u,K[13]=X*E+G*b+q*U0+N*h,K[2]=D*B+M*A+V*e+F*i,K[6]=D*_+M*y+V*v+F*r,K[10]=D*P+M*S+V*l+F*u,K[14]=D*E+M*b+V*U0+F*h,K[3]=O*B+z*A+C*e+R*i,K[7]=O*_+z*y+C*v+R*r,K[11]=O*P+z*S+C*l+R*u,K[15]=O*E+z*b+C*U0+R*h,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],Z=J[4],$=J[8],K=J[12],U=J[1],H=J[5],Y=J[9],W=J[13],X=J[2],G=J[6],q=J[10],N=J[14],D=J[3],M=J[7],V=J[11],F=J[15],O=Y*N-W*q,z=H*N-W*G,C=H*q-Y*G,R=U*N-W*X,B=U*q-Y*X,_=U*G-H*X;return Q*(M*O-V*z+F*C)-Z*(D*O-V*R+F*B)+$*(D*z-M*R+F*_)-K*(D*C-M*B+V*_)}determinantAffine(){let J=this.elements,Q=J[0],Z=J[4],$=J[8],K=J[1],U=J[5],H=J[9],Y=J[2],W=J[6],X=J[10];return Q*(U*X-H*W)-Z*(K*X-H*Y)+$*(K*W-U*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,Z){let $=this.elements;if(J.isVector3)$[12]=J.x,$[13]=J.y,$[14]=J.z;else $[12]=J,$[13]=Q,$[14]=Z;return this}invert(){let J=this.elements,Q=J[0],Z=J[1],$=J[2],K=J[3],U=J[4],H=J[5],Y=J[6],W=J[7],X=J[8],G=J[9],q=J[10],N=J[11],D=J[12],M=J[13],V=J[14],F=J[15],O=Q*H-Z*U,z=Q*Y-$*U,C=Q*W-K*U,R=Z*Y-$*H,B=Z*W-K*H,_=$*W-K*Y,P=X*M-G*D,E=X*V-q*D,A=X*F-N*D,y=G*V-q*M,S=G*F-N*M,b=q*F-N*V,e=O*b-z*S+C*y+R*A-B*E+_*P;if(e===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let v=1/e;return J[0]=(H*b-Y*S+W*y)*v,J[1]=($*S-Z*b-K*y)*v,J[2]=(M*_-V*B+F*R)*v,J[3]=(q*B-G*_-N*R)*v,J[4]=(Y*A-U*b-W*E)*v,J[5]=(Q*b-$*A+K*E)*v,J[6]=(V*C-D*_-F*z)*v,J[7]=(X*_-q*C+N*z)*v,J[8]=(U*S-H*A+W*P)*v,J[9]=(Z*A-Q*S-K*P)*v,J[10]=(D*B-M*C+F*O)*v,J[11]=(G*C-X*B-N*O)*v,J[12]=(H*E-U*y-Y*P)*v,J[13]=(Q*y-Z*E+$*P)*v,J[14]=(M*z-D*R-V*O)*v,J[15]=(X*R-G*z+q*O)*v,this}scale(J){let Q=this.elements,Z=J.x,$=J.y,K=J.z;return Q[0]*=Z,Q[4]*=$,Q[8]*=K,Q[1]*=Z,Q[5]*=$,Q[9]*=K,Q[2]*=Z,Q[6]*=$,Q[10]*=K,Q[3]*=Z,Q[7]*=$,Q[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Z=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],$=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,Z,$))}makeTranslation(J,Q,Z){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,Z,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),Z=Math.sin(J);return this.set(1,0,0,0,0,Q,-Z,0,0,Z,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),Z=Math.sin(J);return this.set(Q,0,Z,0,0,1,0,0,-Z,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),Z=Math.sin(J);return this.set(Q,-Z,0,0,Z,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let Z=Math.cos(Q),$=Math.sin(Q),K=1-Z,U=J.x,H=J.y,Y=J.z,W=K*U,X=K*H;return this.set(W*U+Z,W*H-$*Y,W*Y+$*H,0,W*H+$*Y,X*H+Z,X*Y-$*U,0,W*Y-$*H,X*Y+$*U,K*Y*Y+Z,0,0,0,0,1),this}makeScale(J,Q,Z){return this.set(J,0,0,0,0,Q,0,0,0,0,Z,0,0,0,0,1),this}makeShear(J,Q,Z,$,K,U){return this.set(1,Z,K,0,J,1,U,0,Q,$,1,0,0,0,0,1),this}compose(J,Q,Z){let $=this.elements,K=Q._x,U=Q._y,H=Q._z,Y=Q._w,W=K+K,X=U+U,G=H+H,q=K*W,N=K*X,D=K*G,M=U*X,V=U*G,F=H*G,O=Y*W,z=Y*X,C=Y*G,R=Z.x,B=Z.y,_=Z.z;return $[0]=(1-(M+F))*R,$[1]=(N+C)*R,$[2]=(D-z)*R,$[3]=0,$[4]=(N-C)*B,$[5]=(1-(q+F))*B,$[6]=(V+O)*B,$[7]=0,$[8]=(D+z)*_,$[9]=(V-O)*_,$[10]=(1-(q+M))*_,$[11]=0,$[12]=J.x,$[13]=J.y,$[14]=J.z,$[15]=1,this}decompose(J,Q,Z){let $=this.elements;J.x=$[12],J.y=$[13],J.z=$[14];let K=this.determinantAffine();if(K===0)return Z.set(1,1,1),Q.identity(),this;let U=I6.set($[0],$[1],$[2]).length(),H=I6.set($[4],$[5],$[6]).length(),Y=I6.set($[8],$[9],$[10]).length();if(K<0)U=-U;E8.copy(this);let W=1/U,X=1/H,G=1/Y;return E8.elements[0]*=W,E8.elements[1]*=W,E8.elements[2]*=W,E8.elements[4]*=X,E8.elements[5]*=X,E8.elements[6]*=X,E8.elements[8]*=G,E8.elements[9]*=G,E8.elements[10]*=G,Q.setFromRotationMatrix(E8),Z.x=U,Z.y=H,Z.z=Y,this}makePerspective(J,Q,Z,$,K,U,H=2000,Y=!1){let W=this.elements,X=2*K/(Q-J),G=2*K/(Z-$),q=(Q+J)/(Q-J),N=(Z+$)/(Z-$),D,M;if(Y)D=K/(U-K),M=U*K/(U-K);else if(H===2000)D=-(U+K)/(U-K),M=-2*U*K/(U-K);else if(H===2001)D=-U/(U-K),M=-U*K/(U-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return W[0]=X,W[4]=0,W[8]=q,W[12]=0,W[1]=0,W[5]=G,W[9]=N,W[13]=0,W[2]=0,W[6]=0,W[10]=D,W[14]=M,W[3]=0,W[7]=0,W[11]=-1,W[15]=0,this}makeOrthographic(J,Q,Z,$,K,U,H=2000,Y=!1){let W=this.elements,X=2/(Q-J),G=2/(Z-$),q=-(Q+J)/(Q-J),N=-(Z+$)/(Z-$),D,M;if(Y)D=1/(U-K),M=U/(U-K);else if(H===2000)D=-2/(U-K),M=-(U+K)/(U-K);else if(H===2001)D=-1/(U-K),M=-K/(U-K);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return W[0]=X,W[4]=0,W[8]=0,W[12]=q,W[1]=0,W[5]=G,W[9]=0,W[13]=N,W[2]=0,W[6]=0,W[10]=D,W[14]=M,W[3]=0,W[7]=0,W[11]=0,W[15]=1,this}equals(J){let Q=this.elements,Z=J.elements;for(let $=0;$<16;$++)if(Q[$]!==Z[$])return!1;return!0}fromArray(J,Q=0){for(let Z=0;Z<16;Z++)this.elements[Z]=J[Z+Q];return this}toArray(J=[],Q=0){let Z=this.elements;return J[Q]=Z[0],J[Q+1]=Z[1],J[Q+2]=Z[2],J[Q+3]=Z[3],J[Q+4]=Z[4],J[Q+5]=Z[5],J[Q+6]=Z[6],J[Q+7]=Z[7],J[Q+8]=Z[8],J[Q+9]=Z[9],J[Q+10]=Z[10],J[Q+11]=Z[11],J[Q+12]=Z[12],J[Q+13]=Z[13],J[Q+14]=Z[14],J[Q+15]=Z[15],J}}var I6=new k,E8=new x9,jX=new k(0,0,0),vX=new k(1,1,1),_J=new k,EZ=new k,Z8=new k,tH=new x9,eH=new A8;class u8{constructor(J=0,Q=0,Z=0,$=u8.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=Z,this._order=$}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,Z,$=this._order){return this._x=J,this._y=Q,this._z=Z,this._order=$,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,Z=!0){let $=J.elements,K=$[0],U=$[4],H=$[8],Y=$[1],W=$[5],X=$[9],G=$[2],q=$[6],N=$[10];switch(Q){case"XYZ":if(this._y=Math.asin(z9(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-X,N),this._z=Math.atan2(-U,K);else this._x=Math.atan2(q,W),this._z=0;break;case"YXZ":if(this._x=Math.asin(-z9(X,-1,1)),Math.abs(X)<0.9999999)this._y=Math.atan2(H,N),this._z=Math.atan2(Y,W);else this._y=Math.atan2(-G,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(z9(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(-G,N),this._z=Math.atan2(-U,W);else this._y=0,this._z=Math.atan2(Y,K);break;case"ZYX":if(this._y=Math.asin(-z9(G,-1,1)),Math.abs(G)<0.9999999)this._x=Math.atan2(q,N),this._z=Math.atan2(Y,K);else this._x=0,this._z=Math.atan2(-U,W);break;case"YZX":if(this._z=Math.asin(z9(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-X,W),this._y=Math.atan2(-G,K);else this._x=0,this._y=Math.atan2(H,N);break;case"XZY":if(this._z=Math.asin(-z9(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(q,W),this._y=Math.atan2(H,K);else this._x=Math.atan2(-X,N),this._y=0;break;default:H9("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,Z===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,Z){return tH.makeRotationFromQuaternion(J),this.setFromRotationMatrix(tH,Q,Z)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return eH.setFromEuler(this),this.setFromQuaternion(eH,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}u8.DEFAULT_ORDER="XYZ";class O${constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var yX=0,JY=new k,B6=new A8,t8=new x9,VZ=new k,UQ=new k,fX=new k,bX=new A8,QY=new k(1,0,0),ZY=new k(0,1,0),$Y=new k(0,0,1),KY={type:"added"},xX={type:"removed"},_6={type:"childadded",child:null},ZK={type:"childremoved",child:null};class k9 extends HJ{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:yX++}),this.uuid=$J(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=k9.DEFAULT_UP.clone();let J=new k,Q=new u8,Z=new A8,$=new k(1,1,1);function K(){Z.setFromEuler(Q,!1)}function U(){Q.setFromQuaternion(Z,void 0,!1)}Q._onChange(K),Z._onChange(U),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:Z},scale:{configurable:!0,enumerable:!0,value:$},modelViewMatrix:{value:new x9},normalMatrix:{value:new D9}}),this.matrix=new x9,this.matrixWorld=new x9,this.matrixAutoUpdate=k9.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=k9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new O$,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return B6.setFromAxisAngle(J,Q),this.quaternion.multiply(B6),this}rotateOnWorldAxis(J,Q){return B6.setFromAxisAngle(J,Q),this.quaternion.premultiply(B6),this}rotateX(J){return this.rotateOnAxis(QY,J)}rotateY(J){return this.rotateOnAxis(ZY,J)}rotateZ(J){return this.rotateOnAxis($Y,J)}translateOnAxis(J,Q){return JY.copy(J).applyQuaternion(this.quaternion),this.position.add(JY.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(QY,J)}translateY(J){return this.translateOnAxis(ZY,J)}translateZ(J){return this.translateOnAxis($Y,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(t8.copy(this.matrixWorld).invert())}lookAt(J,Q,Z){if(J.isVector3)VZ.copy(J);else VZ.set(J,Q,Z);let $=this.parent;if(this.updateWorldMatrix(!0,!1),UQ.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)t8.lookAt(UQ,VZ,this.up);else t8.lookAt(VZ,UQ,this.up);if(this.quaternion.setFromRotationMatrix(t8),$)t8.extractRotation($.matrixWorld),B6.setFromRotationMatrix(t8),this.quaternion.premultiply(B6.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return X9("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(KY),_6.child=J,this.dispatchEvent(_6),_6.child=null;else X9("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Z=0;Z<arguments.length;Z++)this.remove(arguments[Z]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(xX),ZK.child=J,this.dispatchEvent(ZK),ZK.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),t8.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),t8.multiply(J.parent.matrixWorld);return J.applyMatrix4(t8),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(KY),_6.child=J,this.dispatchEvent(_6),_6.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let Z=0,$=this.children.length;Z<$;Z++){let U=this.children[Z].getObjectByProperty(J,Q);if(U!==void 0)return U}return}getObjectsByProperty(J,Q,Z=[]){if(this[J]===Q)Z.push(this);let $=this.children;for(let K=0,U=$.length;K<U;K++)$[K].getObjectsByProperty(J,Q,Z);return Z}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(UQ,J,fX),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(UQ,bX,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(J){J(this);let Q=this.children;for(let Z=0,$=Q.length;Z<$;Z++)Q[Z].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let Z=0,$=Q.length;Z<$;Z++)Q[Z].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:Z,z:$}=J,K=this.matrix.elements;K[12]+=Q-K[0]*Q-K[4]*Z-K[8]*$,K[13]+=Z-K[1]*Q-K[5]*Z-K[9]*$,K[14]+=$-K[2]*Q-K[6]*Z-K[10]*$}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let Z=0,$=Q.length;Z<$;Z++)Q[Z].updateMatrixWorld(J)}updateWorldMatrix(J,Q,Z=!1){let $=this.parent;if(J===!0&&$!==null)$.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||Z){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,Z=!0}if(Q===!0){let K=this.children;for(let U=0,H=K.length;U<H;U++)K[U].updateWorldMatrix(!1,!0,Z)}}toJSON(J){let Q=J===void 0||typeof J==="string",Z={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Z.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let $={};if($.uuid=this.uuid,$.type=this.type,$.name=this.name,$.castShadow=this.castShadow,$.receiveShadow=this.receiveShadow,$.visible=this.visible,$.frustumCulled=this.frustumCulled,$.renderOrder=this.renderOrder,$.static=this.static,$.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)$.userData=this.userData;if($.layers=this.layers.mask,$.matrix=this.matrix.toArray(),$.up=this.up.toArray(),this.pivot!==null)$.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)$.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)$.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if($.type="InstancedMesh",$.count=this.count,$.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)$.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if($.type="BatchedMesh",$.perObjectFrustumCulled=this.perObjectFrustumCulled,$.sortObjects=this.sortObjects,$.drawRanges=this._drawRanges,$.reservedRanges=this._reservedRanges,$.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),$.instanceInfo=this._instanceInfo.map((H)=>({...H})),$.availableInstanceIds=this._availableInstanceIds.slice(),$.availableGeometryIds=this._availableGeometryIds.slice(),$.nextIndexStart=this._nextIndexStart,$.nextVertexStart=this._nextVertexStart,$.geometryCount=this._geometryCount,$.maxInstanceCount=this._maxInstanceCount,$.maxVertexCount=this._maxVertexCount,$.maxIndexCount=this._maxIndexCount,$.geometryInitialized=this._geometryInitialized,$.matricesTexture=this._matricesTexture.toJSON(J),$.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)$.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)$.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)$.boundingBox=this.boundingBox.toJSON()}function K(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)$.background=this.background.toJSON();else if(this.background.isTexture)$.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)$.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){$.geometry=K(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let W=0,X=Y.length;W<X;W++){let G=Y[W];K(J.shapes,G)}else K(J.shapes,Y)}}if(this.isSkinnedMesh){if($.bindMode=this.bindMode,$.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),$.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,W=this.material.length;Y<W;Y++)H.push(K(J.materials,this.material[Y]));$.material=H}else $.material=K(J.materials,this.material);if(this.children.length>0){$.children=[];for(let H=0;H<this.children.length;H++)$.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){$.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];$.animations.push(K(J.animations,Y))}}if(Q){let H=U(J.geometries),Y=U(J.materials),W=U(J.textures),X=U(J.images),G=U(J.shapes),q=U(J.skeletons),N=U(J.animations),D=U(J.nodes);if(H.length>0)Z.geometries=H;if(Y.length>0)Z.materials=Y;if(W.length>0)Z.textures=W;if(X.length>0)Z.images=X;if(G.length>0)Z.shapes=G;if(q.length>0)Z.skeletons=q;if(N.length>0)Z.animations=N;if(D.length>0)Z.nodes=D}return Z.object=$,Z;function U(H){let Y=[];for(let W in H){let X=H[W];delete X.metadata,Y.push(X)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let Z=0;Z<J.children.length;Z++){let $=J.children[Z];this.add($.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}k9.DEFAULT_UP=new k(0,1,0);k9.DEFAULT_MATRIX_AUTO_UPDATE=!0;k9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class O0 extends k9{constructor(){super();this.isGroup=!0,this.type="Group"}}var hX={type:"move"};class xQ{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new O0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new O0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new O0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let Z of J.hand.values())this._getHandJoint(Q,Z)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,Z){let $=null,K=null,U=null,H=this._targetRay,Y=this._grip,W=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(W&&J.hand){U=!0;for(let M of J.hand.values()){let V=Q.getJointPose(M,Z),F=this._getHandJoint(W,M);if(V!==null)F.matrix.fromArray(V.transform.matrix),F.matrix.decompose(F.position,F.rotation,F.scale),F.matrixWorldNeedsUpdate=!0,F.jointRadius=V.radius;F.visible=V!==null}let X=W.joints["index-finger-tip"],G=W.joints["thumb-tip"],q=X.position.distanceTo(G.position),N=0.02,D=0.005;if(W.inputState.pinching&&q>N+D)W.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!W.inputState.pinching&&q<=N-D)W.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(K=Q.getPose(J.gripSpace,Z),K!==null){if(Y.matrix.fromArray(K.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,K.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(K.linearVelocity);else Y.hasLinearVelocity=!1;if(K.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(K.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if($=Q.getPose(J.targetRaySpace,Z),$===null&&K!==null)$=K;if($!==null){if(H.matrix.fromArray($.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,$.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy($.linearVelocity);else H.hasLinearVelocity=!1;if($.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy($.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(hX)}}}if(H!==null)H.visible=$!==null;if(Y!==null)Y.visible=K!==null;if(W!==null)W.visible=U!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let Z=new O0;Z.matrixAutoUpdate=!1,Z.visible=!1,J.joints[Q.jointName]=Z,J.add(Z)}return J.joints[Q.jointName]}}var kW={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},AJ={h:0,s:0,l:0},IZ={h:0,s:0,l:0};function $K(J,Q,Z){if(Z<0)Z+=1;if(Z>1)Z-=1;if(Z<0.16666666666666666)return J+(Q-J)*6*Z;if(Z<0.5)return Q;if(Z<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-Z);return J}class Y0{constructor(J,Q,Z){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,Z)}set(J,Q,Z){if(Q===void 0&&Z===void 0){let $=J;if($&&$.isColor)this.copy($);else if(typeof $==="number")this.setHex($);else if(typeof $==="string")this.setStyle($)}else this.setRGB(J,Q,Z);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,A9.colorSpaceToWorking(this,Q),this}setRGB(J,Q,Z,$=A9.workingColorSpace){return this.r=J,this.g=Q,this.b=Z,A9.colorSpaceToWorking(this,$),this}setHSL(J,Q,Z,$=A9.workingColorSpace){if(J=TX(J,1),Q=z9(Q,0,1),Z=z9(Z,0,1),Q===0)this.r=this.g=this.b=Z;else{let K=Z<=0.5?Z*(1+Q):Z+Q-Z*Q,U=2*Z-K;this.r=$K(U,K,J+0.3333333333333333),this.g=$K(U,K,J),this.b=$K(U,K,J-0.3333333333333333)}return A9.colorSpaceToWorking(this,$),this}setStyle(J,Q="srgb"){function Z(K){if(K===void 0)return;if(parseFloat(K)<1)H9("Color: Alpha component of "+J+" will be ignored.")}let $;if($=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,U=$[1],H=$[2];switch(U){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Z(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,Q);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Z(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,Q);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Z(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,Q);break;default:H9("Color: Unknown color model "+J)}}else if($=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=$[1],U=K.length;if(U===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,Q);else if(U===6)return this.setHex(parseInt(K,16),Q);else H9("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let Z=kW[J.toLowerCase()];if(Z!==void 0)this.setHex(Z,Q);else H9("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=KJ(J.r),this.g=KJ(J.g),this.b=KJ(J.b),this}copyLinearToSRGB(J){return this.r=x6(J.r),this.g=x6(J.g),this.b=x6(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return A9.workingToColorSpace(x7.copy(this),J),Math.round(z9(x7.r*255,0,255))*65536+Math.round(z9(x7.g*255,0,255))*256+Math.round(z9(x7.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=A9.workingColorSpace){A9.workingToColorSpace(x7.copy(this),Q);let{r:Z,g:$,b:K}=x7,U=Math.max(Z,$,K),H=Math.min(Z,$,K),Y,W,X=(H+U)/2;if(H===U)Y=0,W=0;else{let G=U-H;switch(W=X<=0.5?G/(U+H):G/(2-U-H),U){case Z:Y=($-K)/G+($<K?6:0);break;case $:Y=(K-Z)/G+2;break;case K:Y=(Z-$)/G+4;break}Y/=6}return J.h=Y,J.s=W,J.l=X,J}getRGB(J,Q=A9.workingColorSpace){return A9.workingToColorSpace(x7.copy(this),Q),J.r=x7.r,J.g=x7.g,J.b=x7.b,J}getStyle(J="srgb"){A9.workingToColorSpace(x7.copy(this),J);let{r:Q,g:Z,b:$}=x7;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${Z.toFixed(3)} ${$.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round(Z*255)},${Math.round($*255)})`}offsetHSL(J,Q,Z){return this.getHSL(AJ),this.setHSL(AJ.h+J,AJ.s+Q,AJ.l+Z)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,Z){return this.r=J.r+(Q.r-J.r)*Z,this.g=J.g+(Q.g-J.g)*Z,this.b=J.b+(Q.b-J.b)*Z,this}lerpHSL(J,Q){this.getHSL(AJ),J.getHSL(IZ);let Z=r$(AJ.h,IZ.h,Q),$=r$(AJ.s,IZ.s,Q),K=r$(AJ.l,IZ.l,Q);return this.setHSL(Z,$,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,Z=this.g,$=this.b,K=J.elements;return this.r=K[0]*Q+K[3]*Z+K[6]*$,this.g=K[1]*Q+K[4]*Z+K[7]*$,this.b=K[2]*Q+K[5]*Z+K[8]*$,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var x7=new Y0;Y0.NAMES=kW;class z8{constructor(J,Q=0.00025){this.isFogExp2=!0,this.name="",this.color=new Y0(J),this.density=Q}clone(){return new z8(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class o7 extends k9{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new u8,this.environmentIntensity=1,this.environmentRotation=new u8,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();return Q.object.backgroundBlurriness=this.backgroundBlurriness,Q.object.backgroundIntensity=this.backgroundIntensity,Q.object.backgroundRotation=this.backgroundRotation.toArray(),Q.object.environmentIntensity=this.environmentIntensity,Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var V8=new k,e8=new k,KK=new k,JJ=new k,A6=new k,z6=new k,UY=new k,UK=new k,HK=new k,YK=new k,WK=new X7,XK=new X7,GK=new X7;class n7{constructor(J=new k,Q=new k,Z=new k){this.a=J,this.b=Q,this.c=Z}static getNormal(J,Q,Z,$){$.subVectors(Z,Q),V8.subVectors(J,Q),$.cross(V8);let K=$.lengthSq();if(K>0)return $.multiplyScalar(1/Math.sqrt(K));return $.set(0,0,0)}static getBarycoord(J,Q,Z,$,K){V8.subVectors($,Q),e8.subVectors(Z,Q),KK.subVectors(J,Q);let U=V8.dot(V8),H=V8.dot(e8),Y=V8.dot(KK),W=e8.dot(e8),X=e8.dot(KK),G=U*W-H*H;if(G===0)return K.set(0,0,0),null;let q=1/G,N=(W*Y-H*X)*q,D=(U*X-H*Y)*q;return K.set(1-N-D,D,N)}static containsPoint(J,Q,Z,$){if(this.getBarycoord(J,Q,Z,$,JJ)===null)return!1;return JJ.x>=0&&JJ.y>=0&&JJ.x+JJ.y<=1}static getInterpolation(J,Q,Z,$,K,U,H,Y){if(this.getBarycoord(J,Q,Z,$,JJ)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(K,JJ.x),Y.addScaledVector(U,JJ.y),Y.addScaledVector(H,JJ.z),Y}static getInterpolatedAttribute(J,Q,Z,$,K,U){return WK.setScalar(0),XK.setScalar(0),GK.setScalar(0),WK.fromBufferAttribute(J,Q),XK.fromBufferAttribute(J,Z),GK.fromBufferAttribute(J,$),U.setScalar(0),U.addScaledVector(WK,K.x),U.addScaledVector(XK,K.y),U.addScaledVector(GK,K.z),U}static isFrontFacing(J,Q,Z,$){return V8.subVectors(Z,Q),e8.subVectors(J,Q),V8.cross(e8).dot($)<0}set(J,Q,Z){return this.a.copy(J),this.b.copy(Q),this.c.copy(Z),this}setFromPointsAndIndices(J,Q,Z,$){return this.a.copy(J[Q]),this.b.copy(J[Z]),this.c.copy(J[$]),this}setFromAttributeAndIndices(J,Q,Z,$){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,Z),this.c.fromBufferAttribute(J,$),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return V8.subVectors(this.c,this.b),e8.subVectors(this.a,this.b),V8.cross(e8).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return n7.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return n7.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,Z,$,K){return n7.getInterpolation(J,this.a,this.b,this.c,Q,Z,$,K)}containsPoint(J){return n7.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return n7.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let Z=this.a,$=this.b,K=this.c,U,H;A6.subVectors($,Z),z6.subVectors(K,Z),UK.subVectors(J,Z);let Y=A6.dot(UK),W=z6.dot(UK);if(Y<=0&&W<=0)return Q.copy(Z);HK.subVectors(J,$);let X=A6.dot(HK),G=z6.dot(HK);if(X>=0&&G<=X)return Q.copy($);let q=Y*G-X*W;if(q<=0&&Y>=0&&X<=0)return U=Y/(Y-X),Q.copy(Z).addScaledVector(A6,U);YK.subVectors(J,K);let N=A6.dot(YK),D=z6.dot(YK);if(D>=0&&N<=D)return Q.copy(K);let M=N*W-Y*D;if(M<=0&&W>=0&&D<=0)return H=W/(W-D),Q.copy(Z).addScaledVector(z6,H);let V=X*D-N*G;if(V<=0&&G-X>=0&&N-D>=0)return UY.subVectors(K,$),H=(G-X)/(G-X+(N-D)),Q.copy($).addScaledVector(UY,H);let F=1/(V+M+q);return U=M*F,H=q*F,Q.copy(Z).addScaledVector(A6,U).addScaledVector(z6,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class P8{constructor(J=new k(1/0,1/0,1/0),Q=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,Z=J.length;Q<Z;Q+=3)this.expandByPoint(I8.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,Z=J.count;Q<Z;Q++)this.expandByPoint(I8.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,Z=J.length;Q<Z;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let Z=I8.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub(Z),this.max.copy(J).add(Z),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let Z=J.geometry;if(Z!==void 0){let K=Z.getAttribute("position");if(Q===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let U=0,H=K.count;U<H;U++){if(J.isMesh===!0)J.getVertexPosition(U,I8);else I8.fromBufferAttribute(K,U);I8.applyMatrix4(J.matrixWorld),this.expandByPoint(I8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();BZ.copy(J.boundingBox)}else{if(Z.boundingBox===null)Z.computeBoundingBox();BZ.copy(Z.boundingBox)}BZ.applyMatrix4(J.matrixWorld),this.union(BZ)}}let $=J.children;for(let K=0,U=$.length;K<U;K++)this.expandByObject($[K],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,I8),I8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,Z;if(J.normal.x>0)Q=J.normal.x*this.min.x,Z=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,Z=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,Z+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,Z+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,Z+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,Z+=J.normal.z*this.min.z;return Q<=-J.constant&&Z>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(HQ),_Z.subVectors(this.max,HQ),P6.subVectors(J.a,HQ),C6.subVectors(J.b,HQ),L6.subVectors(J.c,HQ),zJ.subVectors(C6,P6),PJ.subVectors(L6,C6),bJ.subVectors(P6,L6);let Q=[0,-zJ.z,zJ.y,0,-PJ.z,PJ.y,0,-bJ.z,bJ.y,zJ.z,0,-zJ.x,PJ.z,0,-PJ.x,bJ.z,0,-bJ.x,-zJ.y,zJ.x,0,-PJ.y,PJ.x,0,-bJ.y,bJ.x,0];if(!NK(Q,P6,C6,L6,_Z))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!NK(Q,P6,C6,L6,_Z))return!1;return AZ.crossVectors(zJ,PJ),Q=[AZ.x,AZ.y,AZ.z],NK(Q,P6,C6,L6,_Z)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,I8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(I8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return QJ[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),QJ[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),QJ[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),QJ[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),QJ[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),QJ[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),QJ[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),QJ[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(QJ),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var QJ=[new k,new k,new k,new k,new k,new k,new k,new k],I8=new k,BZ=new P8,P6=new k,C6=new k,L6=new k,zJ=new k,PJ=new k,bJ=new k,HQ=new k,_Z=new k,AZ=new k,xJ=new k;function NK(J,Q,Z,$,K){for(let U=0,H=J.length-3;U<=H;U+=3){xJ.fromArray(J,U);let Y=K.x*Math.abs(xJ.x)+K.y*Math.abs(xJ.y)+K.z*Math.abs(xJ.z),W=Q.dot(xJ),X=Z.dot(xJ),G=$.dot(xJ);if(Math.max(-Math.max(W,X,G),Math.min(W,X,G))>Y)return!1}return!0}var I7=new k,zZ=new q0,gX=0;class u9 extends HJ{constructor(J,Q,Z=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gX++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=Z,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,Z){J*=this.itemSize,Z*=Q.itemSize;for(let $=0,K=this.itemSize;$<K;$++)this.array[J+$]=Q.array[Z+$];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,Z=this.count;Q<Z;Q++)zZ.fromBufferAttribute(this,Q),zZ.applyMatrix3(J),this.setXY(Q,zZ.x,zZ.y);else if(this.itemSize===3)for(let Q=0,Z=this.count;Q<Z;Q++)I7.fromBufferAttribute(this,Q),I7.applyMatrix3(J),this.setXYZ(Q,I7.x,I7.y,I7.z);return this}applyMatrix4(J){for(let Q=0,Z=this.count;Q<Z;Q++)I7.fromBufferAttribute(this,Q),I7.applyMatrix4(J),this.setXYZ(Q,I7.x,I7.y,I7.z);return this}applyNormalMatrix(J){for(let Q=0,Z=this.count;Q<Z;Q++)I7.fromBufferAttribute(this,Q),I7.applyNormalMatrix(J),this.setXYZ(Q,I7.x,I7.y,I7.z);return this}transformDirection(J){for(let Q=0,Z=this.count;Q<Z;Q++)I7.fromBufferAttribute(this,Q),I7.transformDirection(J),this.setXYZ(Q,I7.x,I7.y,I7.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let Z=this.array[J*this.itemSize+Q];if(this.normalized)Z=g8(Z,this.array);return Z}setComponent(J,Q,Z){if(this.normalized)Z=t9(Z,this.array);return this.array[J*this.itemSize+Q]=Z,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=g8(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=t9(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=g8(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=t9(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=g8(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=t9(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=g8(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=t9(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,Z){if(J*=this.itemSize,this.normalized)Q=t9(Q,this.array),Z=t9(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=Z,this}setXYZ(J,Q,Z,$){if(J*=this.itemSize,this.normalized)Q=t9(Q,this.array),Z=t9(Z,this.array),$=t9($,this.array);return this.array[J+0]=Q,this.array[J+1]=Z,this.array[J+2]=$,this}setXYZW(J,Q,Z,$,K){if(J*=this.itemSize,this.normalized)Q=t9(Q,this.array),Z=t9(Z,this.array),$=t9($,this.array),K=t9(K,this.array);return this.array[J+0]=Q,this.array[J+1]=Z,this.array[J+2]=$,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return J.name=this.name,J.usage=this.usage,J.gpuType=this.gpuType,J}dispose(){this.dispatchEvent({type:"dispose"})}}class M$ extends u9{constructor(J,Q,Z){super(new Uint16Array(J),Q,Z)}}class R$ extends u9{constructor(J,Q,Z){super(new Uint32Array(J),Q,Z)}}class J9 extends u9{constructor(J,Q,Z){super(new Float32Array(J),Q,Z)}}var pX=new P8,YQ=new k,qK=new k;class YJ{constructor(J=new k,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let Z=this.center;if(Q!==void 0)Z.copy(Q);else pX.setFromPoints(J).getCenter(Z);let $=0;for(let K=0,U=J.length;K<U;K++)$=Math.max($,Z.distanceToSquared(J[K]));return this.radius=Math.sqrt($),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let Z=this.center.distanceToSquared(J);if(Q.copy(J),Z>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;YQ.subVectors(J,this.center);let Q=YQ.lengthSq();if(Q>this.radius*this.radius){let Z=Math.sqrt(Q),$=(Z-this.radius)*0.5;this.center.addScaledVector(YQ,$/Z),this.radius+=$}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else qK.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(YQ.copy(J.center).add(qK)),this.expandByPoint(YQ.copy(J.center).sub(qK));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var uX=0,q8=new x9,DK=new k9,T6=new k,$8=new P8,WQ=new P8,C7=new k;class q9 extends HJ{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uX++}),this.uuid=$J(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((CX(J))?R$:M$)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,Z=0){this.groups.push({start:J,count:Q,materialIndex:Z})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let Z=this.attributes.normal;if(Z!==void 0){let K=new D9().getNormalMatrix(J);Z.applyNormalMatrix(K),Z.needsUpdate=!0}let $=this.attributes.tangent;if($!==void 0)$.transformDirection(J),$.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return q8.makeRotationFromQuaternion(J),this.applyMatrix4(q8),this}rotateX(J){return q8.makeRotationX(J),this.applyMatrix4(q8),this}rotateY(J){return q8.makeRotationY(J),this.applyMatrix4(q8),this}rotateZ(J){return q8.makeRotationZ(J),this.applyMatrix4(q8),this}translate(J,Q,Z){return q8.makeTranslation(J,Q,Z),this.applyMatrix4(q8),this}scale(J,Q,Z){return q8.makeScale(J,Q,Z),this.applyMatrix4(q8),this}lookAt(J){return DK.lookAt(J),DK.updateMatrix(),this.applyMatrix4(DK.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(T6).negate(),this.translate(T6.x,T6.y,T6.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let Z=[];for(let $=0,K=J.length;$<K;$++){let U=J[$];Z.push(U.x,U.y,U.z||0)}this.setAttribute("position",new J9(Z,3))}else{let Z=Math.min(J.length,Q.count);for(let $=0;$<Z;$++){let K=J[$];Q.setXYZ($,K.x,K.y,K.z||0)}if(J.length>Q.count)H9("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new P8;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){X9("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let Z=0,$=Q.length;Z<$;Z++){let K=Q[Z];if($8.setFromBufferAttribute(K),this.morphTargetsRelative)C7.addVectors(this.boundingBox.min,$8.min),this.boundingBox.expandByPoint(C7),C7.addVectors(this.boundingBox.max,$8.max),this.boundingBox.expandByPoint(C7);else this.boundingBox.expandByPoint($8.min),this.boundingBox.expandByPoint($8.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))X9('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new YJ;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){X9("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(J){let Z=this.boundingSphere.center;if($8.setFromBufferAttribute(J),Q)for(let K=0,U=Q.length;K<U;K++){let H=Q[K];if(WQ.setFromBufferAttribute(H),this.morphTargetsRelative)C7.addVectors($8.min,WQ.min),$8.expandByPoint(C7),C7.addVectors($8.max,WQ.max),$8.expandByPoint(C7);else $8.expandByPoint(WQ.min),$8.expandByPoint(WQ.max)}$8.getCenter(Z);let $=0;for(let K=0,U=J.count;K<U;K++)C7.fromBufferAttribute(J,K),$=Math.max($,Z.distanceToSquared(C7));if(Q)for(let K=0,U=Q.length;K<U;K++){let H=Q[K],Y=this.morphTargetsRelative;for(let W=0,X=H.count;W<X;W++){if(C7.fromBufferAttribute(H,W),Y)T6.fromBufferAttribute(J,W),C7.add(T6);$=Math.max($,Z.distanceToSquared(C7))}}if(this.boundingSphere.radius=Math.sqrt($),isNaN(this.boundingSphere.radius))X9('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){X9("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:Z,normal:$,uv:K}=Q,U=this.getAttribute("tangent");if(U===void 0||U.count!==Z.count)U=new u9(new Float32Array(4*Z.count),4),this.setAttribute("tangent",U);let H=[],Y=[];for(let P=0;P<Z.count;P++)H[P]=new k,Y[P]=new k;let W=new k,X=new k,G=new k,q=new q0,N=new q0,D=new q0,M=new k,V=new k;function F(P,E,A){W.fromBufferAttribute(Z,P),X.fromBufferAttribute(Z,E),G.fromBufferAttribute(Z,A),q.fromBufferAttribute(K,P),N.fromBufferAttribute(K,E),D.fromBufferAttribute(K,A),X.sub(W),G.sub(W),N.sub(q),D.sub(q);let y=1/(N.x*D.y-D.x*N.y);if(!isFinite(y))return;M.copy(X).multiplyScalar(D.y).addScaledVector(G,-N.y).multiplyScalar(y),V.copy(G).multiplyScalar(N.x).addScaledVector(X,-D.x).multiplyScalar(y),H[P].add(M),H[E].add(M),H[A].add(M),Y[P].add(V),Y[E].add(V),Y[A].add(V)}let O=this.groups;if(O.length===0)O=[{start:0,count:J.count}];for(let P=0,E=O.length;P<E;++P){let A=O[P],y=A.start,S=A.count;for(let b=y,e=y+S;b<e;b+=3)F(J.getX(b+0),J.getX(b+1),J.getX(b+2))}let z=new k,C=new k,R=new k,B=new k;function _(P){R.fromBufferAttribute($,P),B.copy(R);let E=H[P];z.copy(E),z.sub(R.multiplyScalar(R.dot(E))).normalize(),C.crossVectors(B,E);let y=C.dot(Y[P])<0?-1:1;U.setXYZW(P,z.x,z.y,z.z,y)}for(let P=0,E=O.length;P<E;++P){let A=O[P],y=A.start,S=A.count;for(let b=y,e=y+S;b<e;b+=3)_(J.getX(b+0)),_(J.getX(b+1)),_(J.getX(b+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let Z=this.getAttribute("normal");if(Z===void 0||Z.count!==Q.count)Z=new u9(new Float32Array(Q.count*3),3),this.setAttribute("normal",Z);else for(let q=0,N=Z.count;q<N;q++)Z.setXYZ(q,0,0,0);let $=new k,K=new k,U=new k,H=new k,Y=new k,W=new k,X=new k,G=new k;if(J)for(let q=0,N=J.count;q<N;q+=3){let D=J.getX(q+0),M=J.getX(q+1),V=J.getX(q+2);$.fromBufferAttribute(Q,D),K.fromBufferAttribute(Q,M),U.fromBufferAttribute(Q,V),X.subVectors(U,K),G.subVectors($,K),X.cross(G),H.fromBufferAttribute(Z,D),Y.fromBufferAttribute(Z,M),W.fromBufferAttribute(Z,V),H.add(X),Y.add(X),W.add(X),Z.setXYZ(D,H.x,H.y,H.z),Z.setXYZ(M,Y.x,Y.y,Y.z),Z.setXYZ(V,W.x,W.y,W.z)}else for(let q=0,N=Q.count;q<N;q+=3)$.fromBufferAttribute(Q,q+0),K.fromBufferAttribute(Q,q+1),U.fromBufferAttribute(Q,q+2),X.subVectors(U,K),G.subVectors($,K),X.cross(G),Z.setXYZ(q+0,X.x,X.y,X.z),Z.setXYZ(q+1,X.x,X.y,X.z),Z.setXYZ(q+2,X.x,X.y,X.z);this.normalizeNormals(),Z.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,Z=J.count;Q<Z;Q++)C7.fromBufferAttribute(J,Q),C7.normalize(),J.setXYZ(Q,C7.x,C7.y,C7.z)}toNonIndexed(){function J(H,Y){let{array:W,itemSize:X,normalized:G}=H,q=new W.constructor(Y.length*X),N=0,D=0;for(let M=0,V=Y.length;M<V;M++){if(H.isInterleavedBufferAttribute)N=Y[M]*H.data.stride+H.offset;else N=Y[M]*X;for(let F=0;F<X;F++)q[D++]=W[N++]}return new u9(q,X,G)}if(this.index===null)return H9("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new q9,Z=this.index.array,$=this.attributes;for(let H in $){let Y=$[H],W=J(Y,Z);Q.setAttribute(H,W)}let K=this.morphAttributes;for(let H in K){let Y=[],W=K[H];for(let X=0,G=W.length;X<G;X++){let q=W[X],N=J(q,Z);Y.push(N)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;for(let H=0,Y=U.length;H<Y;H++){let W=U[H];Q.addGroup(W.start,W.count,W.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,J.name=this.name,Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let W in Y)if(Y[W]!==void 0)J[W]=Y[W];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let Z=this.attributes;for(let Y in Z){let W=Z[Y];J.data.attributes[Y]=W.toJSON(J.data)}let $={},K=!1;for(let Y in this.morphAttributes){let W=this.morphAttributes[Y],X=[];for(let G=0,q=W.length;G<q;G++){let N=W[G];X.push(N.toJSON(J.data))}if(X.length>0)$[Y]=X,K=!0}if(K)J.data.morphAttributes=$,J.data.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;if(U.length>0)J.data.groups=JSON.parse(JSON.stringify(U));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let Z=J.index;if(Z!==null)this.setIndex(Z.clone());let $=J.attributes;for(let W in $){let X=$[W];this.setAttribute(W,X.clone(Q))}let K=J.morphAttributes;for(let W in K){let X=[],G=K[W];for(let q=0,N=G.length;q<N;q++)X.push(G[q].clone(Q));this.morphAttributes[W]=X}this.morphTargetsRelative=J.morphTargetsRelative;let U=J.groups;for(let W=0,X=U.length;W<X;W++){let G=U[W];this.addGroup(G.start,G.count,G.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class AU{constructor(J,Q){this.isInterleavedBuffer=!0,this.array=J,this.stride=Q,this.count=J!==void 0?J.length/Q:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=$J()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,Q,Z){J*=this.stride,Z*=Q.stride;for(let $=0,K=this.stride;$<K;$++)this.array[J+$]=Q.array[Z+$];return this}set(J,Q=0){return this.array.set(J,Q),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=$J();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let Q=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),Z=new this.constructor(Q,this.stride);return Z.setUsage(this.usage),Z}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=$J();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));let Q={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return Q.usage=this.usage,Q}}var p7=new k;class BQ{constructor(J,Q,Z,$=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=Q,this.offset=Z,this.normalized=$}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let Q=0,Z=this.data.count;Q<Z;Q++)p7.fromBufferAttribute(this,Q),p7.applyMatrix4(J),this.setXYZ(Q,p7.x,p7.y,p7.z);return this}applyNormalMatrix(J){for(let Q=0,Z=this.count;Q<Z;Q++)p7.fromBufferAttribute(this,Q),p7.applyNormalMatrix(J),this.setXYZ(Q,p7.x,p7.y,p7.z);return this}transformDirection(J){for(let Q=0,Z=this.count;Q<Z;Q++)p7.fromBufferAttribute(this,Q),p7.transformDirection(J),this.setXYZ(Q,p7.x,p7.y,p7.z);return this}getComponent(J,Q){let Z=this.array[J*this.data.stride+this.offset+Q];if(this.normalized)Z=g8(Z,this.array);return Z}setComponent(J,Q,Z){if(this.normalized)Z=t9(Z,this.array);return this.data.array[J*this.data.stride+this.offset+Q]=Z,this}setX(J,Q){if(this.normalized)Q=t9(Q,this.array);return this.data.array[J*this.data.stride+this.offset]=Q,this}setY(J,Q){if(this.normalized)Q=t9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+1]=Q,this}setZ(J,Q){if(this.normalized)Q=t9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+2]=Q,this}setW(J,Q){if(this.normalized)Q=t9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+3]=Q,this}getX(J){let Q=this.data.array[J*this.data.stride+this.offset];if(this.normalized)Q=g8(Q,this.array);return Q}getY(J){let Q=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)Q=g8(Q,this.array);return Q}getZ(J){let Q=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)Q=g8(Q,this.array);return Q}getW(J){let Q=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)Q=g8(Q,this.array);return Q}setXY(J,Q,Z){if(J=J*this.data.stride+this.offset,this.normalized)Q=t9(Q,this.array),Z=t9(Z,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=Z,this}setXYZ(J,Q,Z,$){if(J=J*this.data.stride+this.offset,this.normalized)Q=t9(Q,this.array),Z=t9(Z,this.array),$=t9($,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=Z,this.data.array[J+2]=$,this}setXYZW(J,Q,Z,$,K){if(J=J*this.data.stride+this.offset,this.normalized)Q=t9(Q,this.array),Z=t9(Z,this.array),$=t9($,this.array),K=t9(K,this.array);return this.data.array[J+0]=Q,this.data.array[J+1]=Z,this.data.array[J+2]=$,this.data.array[J+3]=K,this}clone(J){if(J===void 0){VQ("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let Z=0;Z<this.count;Z++){let $=Z*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[$+K])}return new u9(new this.array.constructor(Q),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new BQ(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){VQ("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let Q=[];for(let Z=0;Z<this.count;Z++){let $=Z*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)Q.push(this.data.array[$+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:Q,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var FK=new k,mX=new k,dX=new D9;class h8{constructor(J=new k(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,Z,$){return this.normal.set(J,Q,Z),this.constant=$,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,Z){let $=FK.subVectors(Z,Q).cross(mX.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint($,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,Z=!0){let $=J.delta(FK),K=this.normal.dot($);if(K===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let U=-(J.start.dot(this.normal)+this.constant)/K;if(Z===!0&&(U<0||U>1))return null;return Q.copy(J.start).addScaledVector($,U)}intersectsLine(J){let Q=this.distanceToPoint(J.start),Z=this.distanceToPoint(J.end);return Q<0&&Z>0||Z<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let Z=Q||dX.getNormalMatrix(J),$=this.coplanarPoint(FK).applyMatrix4(J),K=this.normal.applyMatrix3(Z).normalize();return this.constant=-$.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(J){return this.normal.fromArray(J.normal),this.constant=J.constant,this}}var lX=0;class D8 extends HJ{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:lX++}),this.uuid=$J(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let Z=J[Q];if(Z===void 0){H9(`Material: parameter '${Q}' has value of undefined.`);continue}let $=this[Q];if($===void 0){H9(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if($&&$.isColor)$.set(Z);else if($&&$.isVector2&&(Z&&Z.isVector2)||$&&$.isEuler&&(Z&&Z.isEuler)||$&&$.isVector3&&(Z&&Z.isVector3))$.copy(Z);else this[Q]=Z}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let Z={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(Z.uuid=this.uuid,Z.type=this.type,Z.blending=this.blending,Z.side=this.side,Z.shadowSide=this.shadowSide,Z.vertexColors=this.vertexColors,Z.opacity=this.opacity,Z.transparent=this.transparent,Z.blendSrc=this.blendSrc,Z.blendDst=this.blendDst,Z.blendEquation=this.blendEquation,Z.blendSrcAlpha=this.blendSrcAlpha,Z.blendDstAlpha=this.blendDstAlpha,Z.blendEquationAlpha=this.blendEquationAlpha,Z.blendColor=this.blendColor.getHex(),Z.blendAlpha=this.blendAlpha,Z.depthFunc=this.depthFunc,Z.depthTest=this.depthTest,Z.depthWrite=this.depthWrite,Z.colorWrite=this.colorWrite,Z.clipIntersection=this.clipIntersection,Z.clipShadows=this.clipShadows,Z.stencilWriteMask=this.stencilWriteMask,Z.stencilFunc=this.stencilFunc,Z.stencilRef=this.stencilRef,Z.stencilFuncMask=this.stencilFuncMask,Z.stencilFail=this.stencilFail,Z.stencilZFail=this.stencilZFail,Z.stencilZPass=this.stencilZPass,Z.stencilWrite=this.stencilWrite,Z.polygonOffset=this.polygonOffset,Z.polygonOffsetFactor=this.polygonOffsetFactor,Z.polygonOffsetUnits=this.polygonOffsetUnits,Z.dithering=this.dithering,Z.alphaTest=this.alphaTest,Z.alphaHash=this.alphaHash,Z.alphaToCoverage=this.alphaToCoverage,Z.premultipliedAlpha=this.premultipliedAlpha,Z.forceSinglePass=this.forceSinglePass,Z.allowOverride=this.allowOverride,Z.visible=this.visible,Z.toneMapped=this.toneMapped,Z.name=this.name,this.color&&this.color.isColor)Z.color=this.color.getHex();if(this.roughness!==void 0)Z.roughness=this.roughness;if(this.metalness!==void 0)Z.metalness=this.metalness;if(this.sheen!==void 0)Z.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Z.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Z.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Z.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)Z.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Z.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Z.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Z.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Z.shininess=this.shininess;if(this.clearcoat!==void 0)Z.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Z.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Z.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Z.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Z.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Z.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)Z.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)Z.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)Z.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)Z.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)Z.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Z.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Z.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Z.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Z.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Z.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Z.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Z.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Z.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Z.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Z.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Z.lightMap=this.lightMap.toJSON(J).uuid,Z.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Z.aoMap=this.aoMap.toJSON(J).uuid,Z.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Z.bumpMap=this.bumpMap.toJSON(J).uuid,Z.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Z.normalMap=this.normalMap.toJSON(J).uuid,Z.normalMapType=this.normalMapType,Z.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Z.displacementMap=this.displacementMap.toJSON(J).uuid,Z.displacementScale=this.displacementScale,Z.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Z.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Z.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Z.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Z.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Z.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Z.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Z.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Z.combine=this.combine}if(this.envMapRotation!==void 0)Z.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)Z.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Z.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Z.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Z.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Z.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Z.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Z.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Z.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0)Z.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Z.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Z.size=this.size;if(this.sizeAttenuation!==void 0)Z.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)Z.clippingPlanes=this.clippingPlanes.map((K)=>K.toJSON());if(this.rotation!==void 0)Z.rotation=this.rotation;if(this.depthPacking!==void 0)Z.depthPacking=this.depthPacking;if(this.linewidth!==void 0)Z.linewidth=this.linewidth;if(this.linecap!==void 0)Z.linecap=this.linecap;if(this.linejoin!==void 0)Z.linejoin=this.linejoin;if(this.dashSize!==void 0)Z.dashSize=this.dashSize;if(this.gapSize!==void 0)Z.gapSize=this.gapSize;if(this.scale!==void 0)Z.scale=this.scale;if(this.wireframe!==void 0)Z.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)Z.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)Z.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)Z.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)Z.flatShading=this.flatShading;if(this.fog!==void 0)Z.fog=this.fog;if(Object.keys(this.userData).length>0)Z.userData=this.userData;function $(K){let U=[];for(let H in K){let Y=K[H];delete Y.metadata,U.push(Y)}return U}if(Q){let K=$(J.textures),U=$(J.images);if(K.length>0)Z.textures=K;if(U.length>0)Z.images=U}return Z}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new Y0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.retroreflectivity!==void 0)this.retroreflectivity=J.retroreflectivity;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.clippingPlanes!==void 0)this.clippingPlanes=J.clippingPlanes.map((Z)=>new h8().fromJSON(Z));if(J.clipIntersection!==void 0)this.clipIntersection=J.clipIntersection;if(J.clipShadows!==void 0)this.clipShadows=J.clipShadows;if(J.depthPacking!==void 0)this.depthPacking=J.depthPacking;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.linecap!==void 0)this.linecap=J.linecap;if(J.linejoin!==void 0)this.linejoin=J.linejoin;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let Z=J.normalScale;if(Array.isArray(Z)===!1)Z=[Z,Z];this.normalScale=new q0().fromArray(Z)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new q0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,Z=null;if(Q!==null){let $=Q.length;Z=Array($);for(let K=0;K!==$;++K)Z[K]=Q[K].clone()}return this.clippingPlanes=Z,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class wJ extends D8{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Y0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var w6,XQ=new k,S6=new k,k6=new k,j6=new q0,GQ=new q0,jW=new x9,PZ=new k,NQ=new k,CZ=new k,HY=new q0,OK=new q0,YY=new q0;class iJ extends k9{constructor(J=new wJ){super();if(this.isSprite=!0,this.type="Sprite",w6===void 0){w6=new q9;let Q=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Z=new AU(Q,5);w6.setIndex([0,1,2,0,2,3]),w6.setAttribute("position",new BQ(Z,3,0,!1)),w6.setAttribute("uv",new BQ(Z,2,3,!1))}this.geometry=w6,this.material=J,this.center=new q0(0.5,0.5),this.count=1}intersectsFrustum(J){return J.intersectsSprite(this)}raycast(J,Q){if(J.camera===null)X9('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(S6.setFromMatrixScale(this.matrixWorld),jW.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),k6.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)S6.multiplyScalar(-k6.z);let Z=this.material.rotation,$,K;if(Z!==0)K=Math.cos(Z),$=Math.sin(Z);let U=this.center;LZ(PZ.set(-0.5,-0.5,0),k6,U,S6,$,K),LZ(NQ.set(0.5,-0.5,0),k6,U,S6,$,K),LZ(CZ.set(0.5,0.5,0),k6,U,S6,$,K),HY.set(0,0),OK.set(1,0),YY.set(1,1);let H=J.ray.intersectTriangle(PZ,NQ,CZ,!1,XQ);if(H===null){if(LZ(NQ.set(-0.5,0.5,0),k6,U,S6,$,K),OK.set(0,1),H=J.ray.intersectTriangle(PZ,CZ,NQ,!1,XQ),H===null)return}let Y=J.ray.origin.distanceTo(XQ);if(Y<J.near||Y>J.far)return;Q.push({distance:Y,point:XQ.clone(),uv:n7.getInterpolation(XQ,PZ,NQ,CZ,HY,OK,YY,new q0),face:null,object:this})}copy(J,Q){if(super.copy(J,Q),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function LZ(J,Q,Z,$,K,U){if(j6.subVectors(J,Z).addScalar(0.5).multiply($),K!==void 0)GQ.x=U*j6.x-K*j6.y,GQ.y=K*j6.x+U*j6.y;else GQ.copy(j6);J.copy(Q),J.x+=GQ.x,J.y+=GQ.y,J.applyMatrix4(jW)}var ZJ=new k,MK=new k,TZ=new k,wZ=new k;class hQ{constructor(J=new k,Q=new k(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,ZJ)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let Z=Q.dot(this.direction);if(Z<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,Z)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=ZJ.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return ZJ.copy(this.origin).addScaledVector(this.direction,Q),ZJ.distanceToSquared(J)}distanceSqToSegment(J,Q,Z,$){MK.copy(J).add(Q).multiplyScalar(0.5),TZ.copy(Q).sub(J).normalize(),wZ.copy(this.origin).sub(MK);let K=J.distanceTo(Q)*0.5,U=-this.direction.dot(TZ),H=wZ.dot(this.direction),Y=-wZ.dot(TZ),W=wZ.lengthSq(),X=Math.abs(1-U*U),G,q,N,D;if(X>0)if(G=U*Y-H,q=U*H-Y,D=K*X,G>=0)if(q>=-D)if(q<=D){let M=1/X;G*=M,q*=M,N=G*(G+U*q+2*H)+q*(U*G+q+2*Y)+W}else q=K,G=Math.max(0,-(U*q+H)),N=-G*G+q*(q+2*Y)+W;else q=-K,G=Math.max(0,-(U*q+H)),N=-G*G+q*(q+2*Y)+W;else if(q<=-D)G=Math.max(0,-(-U*K+H)),q=G>0?-K:Math.min(Math.max(-K,-Y),K),N=-G*G+q*(q+2*Y)+W;else if(q<=D)G=0,q=Math.min(Math.max(-K,-Y),K),N=q*(q+2*Y)+W;else G=Math.max(0,-(U*K+H)),q=G>0?K:Math.min(Math.max(-K,-Y),K),N=-G*G+q*(q+2*Y)+W;else q=U>0?-K:K,G=Math.max(0,-(U*q+H)),N=-G*G+q*(q+2*Y)+W;if(Z)Z.copy(this.origin).addScaledVector(this.direction,G);if($)$.copy(MK).addScaledVector(TZ,q);return N}intersectSphere(J,Q){if(J.radius<0)return null;ZJ.subVectors(J.center,this.origin);let Z=ZJ.dot(this.direction),$=ZJ.dot(ZJ)-Z*Z,K=J.radius*J.radius;if($>K)return null;let U=Math.sqrt(K-$),H=Z-U,Y=Z+U;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Z=-(this.origin.dot(J.normal)+J.constant)/Q;return Z>=0?Z:null}intersectPlane(J,Q){let Z=this.distanceToPlane(J);if(Z===null)return null;return this.at(Z,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let Z,$,K,U,H,Y,W=1/this.direction.x,X=1/this.direction.y,G=1/this.direction.z,q=this.origin;if(W>=0)Z=(J.min.x-q.x)*W,$=(J.max.x-q.x)*W;else Z=(J.max.x-q.x)*W,$=(J.min.x-q.x)*W;if(X>=0)K=(J.min.y-q.y)*X,U=(J.max.y-q.y)*X;else K=(J.max.y-q.y)*X,U=(J.min.y-q.y)*X;if(Z>U||K>$)return null;if(K>Z||isNaN(Z))Z=K;if(U<$||isNaN($))$=U;if(G>=0)H=(J.min.z-q.z)*G,Y=(J.max.z-q.z)*G;else H=(J.max.z-q.z)*G,Y=(J.min.z-q.z)*G;if(Z>Y||H>$)return null;if(H>Z||Z!==Z)Z=H;if(Y<$||$!==$)$=Y;if($<0)return null;return this.at(Z>=0?Z:$,Q)}intersectsBox(J){return this.intersectBox(J,ZJ)!==null}intersectTriangle(J,Q,Z,$,K){let U=this.origin,H=this.direction,Y=H.x,W=H.y,X=H.z,G=J.x-U.x,q=J.y-U.y,N=J.z-U.z,D=Q.x-U.x,M=Q.y-U.y,V=Q.z-U.z,F=Z.x-U.x,O=Z.y-U.y,z=Z.z-U.z,C=Math.abs(Y),R=Math.abs(W),B=Math.abs(X),_,P,E,A,y,S,b,e,v,l,U0,i;if(C>=R&&C>=B)if(E=Y,S=G,v=D,i=F,Y>=0)_=W,P=X,A=q,y=N,b=M,e=V,l=O,U0=z;else _=X,P=W,A=N,y=q,b=V,e=M,l=z,U0=O;else if(R>=B)if(E=W,S=q,v=M,i=O,W>=0)_=X,P=Y,A=N,y=G,b=V,e=D,l=z,U0=F;else _=Y,P=X,A=G,y=N,b=D,e=V,l=F,U0=z;else if(E=X,S=N,v=V,i=z,X>=0)_=Y,P=W,A=G,y=q,b=D,e=M,l=F,U0=O;else _=W,P=Y,A=q,y=G,b=M,e=D,l=O,U0=F;if(E===0)return null;let r=_/E,u=P/E,h=1/E,H0=A-r*S,E0=y-u*S,L0=b-r*v,d=e-u*v,D0=l-r*i,s=U0-u*i,G0=D0*d-s*L0,X0=H0*s-E0*D0,c=L0*E0-d*H0;if($){if(G0<0||X0<0||c<0)return null}else if((G0<0||X0<0||c<0)&&(G0>0||X0>0||c>0))return null;let C0=G0+X0+c;if(C0===0)return null;let t=h*(G0*S+X0*v+c*i);if(C0>0?t<0:t>0)return null;return this.at(t/C0,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class h0 extends D8{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Y0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new u8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var WY=new x9,hJ=new hQ,SZ=new YJ,XY=new k,kZ=new k,jZ=new k,vZ=new k,RK=new k,yZ=new k,GY=new k,fZ=new k;class f extends k9{constructor(J=new q9,Q=new h0){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,Z=Object.keys(Q);if(Z.length>0){let $=Q[Z[0]];if($!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=$.length;K<U;K++){let H=$[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}getVertexPosition(J,Q){let Z=this.geometry,$=Z.attributes.position,K=Z.morphAttributes.position,U=Z.morphTargetsRelative;Q.fromBufferAttribute($,J);let H=this.morphTargetInfluences;if(K&&H){yZ.set(0,0,0);for(let Y=0,W=K.length;Y<W;Y++){let X=H[Y],G=K[Y];if(X===0)continue;if(RK.fromBufferAttribute(G,J),U)yZ.addScaledVector(RK,X);else yZ.addScaledVector(RK.sub(Q),X)}Q.add(yZ)}return Q}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let Z=this.geometry,$=this.material,K=this.matrixWorld;if($===void 0)return;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(SZ.copy(Z.boundingSphere),SZ.applyMatrix4(K),hJ.copy(J.ray).recast(J.near),SZ.containsPoint(hJ.origin)===!1){if(hJ.intersectSphere(SZ,XY)===null)return;if(hJ.origin.distanceToSquared(XY)>(J.far-J.near)**2)return}if(WY.copy(K).invert(),hJ.copy(J.ray).applyMatrix4(WY),Z.boundingBox!==null){if(hJ.intersectsBox(Z.boundingBox)===!1)return}this._computeIntersections(J,Q,hJ)}_computeIntersections(J,Q,Z){let $,K=this.geometry,U=this.material,H=K.index,Y=K.attributes.position,W=K.attributes.uv,X=K.attributes.uv1,G=K.attributes.normal,q=K.groups,N=K.drawRange;if(H!==null)if(Array.isArray(U))for(let D=0,M=q.length;D<M;D++){let V=q[D],F=U[V.materialIndex],O=Math.max(V.start,N.start),z=Math.min(H.count,Math.min(V.start+V.count,N.start+N.count));for(let C=O,R=z;C<R;C+=3){let B=H.getX(C),_=H.getX(C+1),P=H.getX(C+2);if($=bZ(this,F,J,Z,W,X,G,B,_,P),$)$.faceIndex=Math.floor(C/3),$.face.materialIndex=V.materialIndex,Q.push($)}}else{let D=Math.max(0,N.start),M=Math.min(H.count,N.start+N.count);for(let V=D,F=M;V<F;V+=3){let O=H.getX(V),z=H.getX(V+1),C=H.getX(V+2);if($=bZ(this,U,J,Z,W,X,G,O,z,C),$)$.faceIndex=Math.floor(V/3),Q.push($)}}else if(Y!==void 0)if(Array.isArray(U))for(let D=0,M=q.length;D<M;D++){let V=q[D],F=U[V.materialIndex],O=Math.max(V.start,N.start),z=Math.min(Y.count,Math.min(V.start+V.count,N.start+N.count));for(let C=O,R=z;C<R;C+=3){let B=C,_=C+1,P=C+2;if($=bZ(this,F,J,Z,W,X,G,B,_,P),$)$.faceIndex=Math.floor(C/3),$.face.materialIndex=V.materialIndex,Q.push($)}}else{let D=Math.max(0,N.start),M=Math.min(Y.count,N.start+N.count);for(let V=D,F=M;V<F;V+=3){let O=V,z=V+1,C=V+2;if($=bZ(this,U,J,Z,W,X,G,O,z,C),$)$.faceIndex=Math.floor(V/3),Q.push($)}}}}function cX(J,Q,Z,$,K,U,H,Y){let W;if(Q.side===1)W=$.intersectTriangle(H,U,K,!0,Y);else W=$.intersectTriangle(K,U,H,Q.side===0,Y);if(W===null)return null;fZ.copy(Y),fZ.applyMatrix4(J.matrixWorld);let X=Z.ray.origin.distanceTo(fZ);if(X<Z.near||X>Z.far)return null;return{distance:X,point:fZ.clone(),object:J}}function bZ(J,Q,Z,$,K,U,H,Y,W,X){J.getVertexPosition(Y,kZ),J.getVertexPosition(W,jZ),J.getVertexPosition(X,vZ);let G=cX(J,Q,Z,$,kZ,jZ,vZ,GY);if(G){let q=new k;if(n7.getBarycoord(GY,kZ,jZ,vZ,q),K)G.uv=n7.getInterpolatedAttribute(K,Y,W,X,q,new q0);if(U)G.uv1=n7.getInterpolatedAttribute(U,Y,W,X,q,new q0);if(H){if(G.normal=n7.getInterpolatedAttribute(H,Y,W,X,q,new k),G.normal.dot($.direction)>0)G.normal.multiplyScalar(-1)}let N={a:Y,b:W,c:X,normal:new k,materialIndex:0};n7.getNormal(kZ,jZ,vZ,N.normal),G.face=N,G.barycoord=q}return G}class c6 extends v7{constructor(J=null,Q=1,Z=1,$,K,U,H,Y,W=1003,X=1003,G,q){super(null,U,H,Y,W,X,$,K,G,q);this.isDataTexture=!0,this.image={data:J,width:Q,height:Z},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rZ extends u9{constructor(J,Q,Z,$=1){super(J,Q,Z);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=$}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var v6=new x9,NY=new x9,xZ=[],qY=new P8,nX=new x9,qQ=new f,DQ=new YJ;class j9 extends f{constructor(J,Q,Z){super(J,Q);this.isInstancedMesh=!0,this.instanceMatrix=new rZ(new Float32Array(Z*16),16),this.instanceColor=null,this.morphTexture=null,this.count=Z,this.boundingBox=null,this.boundingSphere=null;for(let $=0;$<Z;$++)this.setMatrixAt($,nX)}computeBoundingBox(){let J=this.geometry,Q=this.count;if(this.boundingBox===null)this.boundingBox=new P8;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let Z=0;Z<Q;Z++)this.getMatrixAt(Z,v6),qY.copy(J.boundingBox).applyMatrix4(v6),this.boundingBox.union(qY)}computeBoundingSphere(){let J=this.geometry,Q=this.count;if(this.boundingSphere===null)this.boundingSphere=new YJ;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let Z=0;Z<Q;Z++)this.getMatrixAt(Z,v6),DQ.copy(J.boundingSphere).applyMatrix4(v6),this.boundingSphere.union(DQ)}copy(J,Q){if(super.copy(J,Q),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,Q){if(this.instanceColor===null)return Q.setRGB(1,1,1);else return Q.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,Q){return Q.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,Q){let Z=Q.morphTargetInfluences,$=this.morphTexture.source.data.data,K=Z.length+1,U=J*K+1;for(let H=0;H<Z.length;H++)Z[H]=$[U+H]}raycast(J,Q){let Z=this.matrixWorld,$=this.count;if(qQ.geometry=this.geometry,qQ.material=this.material,qQ.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(DQ.copy(this.boundingSphere),DQ.applyMatrix4(Z),J.ray.intersectsSphere(DQ)===!1)return;for(let K=0;K<$;K++){this.getMatrixAt(K,v6),NY.multiplyMatrices(Z,v6),qQ.matrixWorld=NY,qQ.raycast(J,xZ);for(let U=0,H=xZ.length;U<H;U++){let Y=xZ[U];Y.instanceId=K,Y.object=this,Q.push(Y)}xZ.length=0}}setColorAt(J,Q){if(this.instanceColor===null)this.instanceColor=new rZ(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return Q.toArray(this.instanceColor.array,J*3),this}setMatrixAt(J,Q){return Q.toArray(this.instanceMatrix.array,J*16),this}setMorphAt(J,Q){let Z=Q.morphTargetInfluences,$=Z.length+1;if(this.morphTexture===null)this.morphTexture=new c6(new Float32Array($*this.count),$,this.count,1028,1015);let K=this.morphTexture.source.data.data,U=0;for(let W=0;W<Z.length;W++)U+=Z[W];let H=this.geometry.morphTargetsRelative?1:1-U,Y=$*J;return K[Y]=H,K.set(Z,Y+1),this}updateMorphTargets(){}dispose(){if(super.dispose(),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var gJ=new YJ,sX=new q0(0.5,0.5),hZ=new k;class gQ{constructor(J=new h8,Q=new h8,Z=new h8,$=new h8,K=new h8,U=new h8){this.planes=[J,Q,Z,$,K,U]}set(J,Q,Z,$,K,U){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy(Z),H[3].copy($),H[4].copy(K),H[5].copy(U),this}copy(J){let Q=this.planes;for(let Z=0;Z<6;Z++)Q[Z].copy(J.planes[Z]);return this}setFromProjectionMatrix(J,Q=2000,Z=!1){let $=this.planes,K=J.elements,U=K[0],H=K[1],Y=K[2],W=K[3],X=K[4],G=K[5],q=K[6],N=K[7],D=K[8],M=K[9],V=K[10],F=K[11],O=K[12],z=K[13],C=K[14],R=K[15];if($[0].setComponents(W-U,N-X,F-D,R-O).normalize(),$[1].setComponents(W+U,N+X,F+D,R+O).normalize(),$[2].setComponents(W+H,N+G,F+M,R+z).normalize(),$[3].setComponents(W-H,N-G,F-M,R-z).normalize(),Z)$[4].setComponents(Y,q,V,C).normalize(),$[5].setComponents(W-Y,N-q,F-V,R-C).normalize();else if($[4].setComponents(W-Y,N-q,F-V,R-C).normalize(),Q===2000)$[5].setComponents(W+Y,N+q,F+V,R+C).normalize();else if(Q===2001)$[5].setComponents(Y,q,V,C).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();gJ.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();gJ.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(gJ)}intersectsSprite(J){gJ.center.set(0,0,0);let Q=sX.distanceTo(J.center);return gJ.radius=0.7071067811865476+Q,gJ.applyMatrix4(J.matrixWorld),this.intersectsSphere(gJ)}intersectsSphere(J){let Q=this.planes,Z=J.center,$=-J.radius;for(let K=0;K<6;K++)if(Q[K].distanceToPoint(Z)<$)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let Z=0;Z<6;Z++){let $=Q[Z];if(hZ.x=$.normal.x>0?J.max.x:J.min.x,hZ.y=$.normal.y>0?J.max.y:J.min.y,hZ.z=$.normal.z>0?J.max.z:J.min.z,$.distanceToPoint(hZ)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let Z=0;Z<6;Z++)if(Q[Z].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class C8 extends D8{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Y0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var tZ=new k,eZ=new k,DY=new x9,FQ=new hQ,gZ=new YJ,EK=new k,FY=new k;class zU extends k9{constructor(J=new q9,Q=new C8){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,Z=[0];for(let $=1,K=Q.count;$<K;$++)tZ.fromBufferAttribute(Q,$-1),eZ.fromBufferAttribute(Q,$),Z[$]=Z[$-1],Z[$]+=tZ.distanceTo(eZ);J.setAttribute("lineDistance",new J9(Z,1))}else H9("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let Z=this.geometry,$=this.matrixWorld,K=J.params.Line.threshold,U=Z.drawRange;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(gZ.copy(Z.boundingSphere),gZ.applyMatrix4($),gZ.radius+=K,J.ray.intersectsSphere(gZ)===!1)return;DY.copy($).invert(),FQ.copy(J.ray).applyMatrix4(DY);let H=K/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,W=this.isLineSegments?2:1,X=Z.index,q=Z.attributes.position;if(X!==null){let N=Math.max(0,U.start),D=Math.min(X.count,U.start+U.count);for(let M=N,V=D-1;M<V;M+=W){let F=X.getX(M),O=X.getX(M+1),z=pZ(this,J,FQ,Y,F,O,M);if(z)Q.push(z)}if(this.isLineLoop){let M=X.getX(D-1),V=X.getX(N),F=pZ(this,J,FQ,Y,M,V,D-1);if(F)Q.push(F)}}else{let N=Math.max(0,U.start),D=Math.min(q.count,U.start+U.count);for(let M=N,V=D-1;M<V;M+=W){let F=pZ(this,J,FQ,Y,M,M+1,M);if(F)Q.push(F)}if(this.isLineLoop){let M=pZ(this,J,FQ,Y,D-1,N,D-1);if(M)Q.push(M)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,Z=Object.keys(Q);if(Z.length>0){let $=Q[Z[0]];if($!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=$.length;K<U;K++){let H=$[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}}function pZ(J,Q,Z,$,K,U,H){let Y=J.geometry.attributes.position;if(tZ.fromBufferAttribute(Y,K),eZ.fromBufferAttribute(Y,U),Z.distanceSqToSegment(tZ,eZ,EK,FY)>$)return;EK.applyMatrix4(J.matrixWorld);let X=Q.ray.origin.distanceTo(EK);if(X<Q.near||X>Q.far)return;return{distance:X,point:FY.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var OY=new k,MY=new k;class u7 extends zU{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,Z=[];for(let $=0,K=Q.count;$<K;$+=2)OY.fromBufferAttribute(Q,$),MY.fromBufferAttribute(Q,$+1),Z[$]=$===0?0:Z[$-1],Z[$+1]=Z[$]+OY.distanceTo(MY);J.setAttribute("lineDistance",new J9(Z,1))}else H9("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class m7 extends D8{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Y0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var RY=new x9,PK=new hQ,uZ=new YJ,mZ=new k;class y7 extends k9{constructor(J=new q9,Q=new m7){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,Q){let Z=this.geometry,$=this.matrixWorld,K=J.params.Points.threshold,U=Z.drawRange;if(Z.boundingSphere===null)Z.computeBoundingSphere();if(uZ.copy(Z.boundingSphere),uZ.applyMatrix4($),uZ.radius+=K,J.ray.intersectsSphere(uZ)===!1)return;RY.copy($).invert(),PK.copy(J.ray).applyMatrix4(RY);let H=K/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,W=Z.index,G=Z.attributes.position;if(W!==null){let q=Math.max(0,U.start),N=Math.min(W.count,U.start+U.count);for(let D=q,M=N;D<M;D++){let V=W.getX(D);mZ.fromBufferAttribute(G,V),EY(mZ,V,Y,$,J,Q,this)}}else{let q=Math.max(0,U.start),N=Math.min(G.count,U.start+U.count);for(let D=q,M=N;D<M;D++)mZ.fromBufferAttribute(G,D),EY(mZ,D,Y,$,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,Z=Object.keys(Q);if(Z.length>0){let $=Q[Z[0]];if($!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=$.length;K<U;K++){let H=$[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}}function EY(J,Q,Z,$,K,U,H){let Y=PK.distanceSqToPoint(J);if(Y<Z){let W=new k;PK.closestPointToPoint(J,W),W.applyMatrix4($);let X=K.ray.origin.distanceTo(W);if(X<K.near||X>K.far)return;U.push({distance:X,distanceToRay:Math.sqrt(Y),point:W,index:Q,face:null,faceIndex:null,barycoord:null,object:H})}}class E$ extends v7{constructor(J=[],Q=301,Z,$,K,U,H,Y,W,X){super(J,Q,Z,$,K,U,H,Y,W,X);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class G7 extends v7{constructor(J,Q,Z,$,K,U,H,Y,W){super(J,Q,Z,$,K,U,H,Y,W);this.isCanvasTexture=!0,this.needsUpdate=!0}}class oJ extends v7{constructor(J,Q,Z=1014,$,K,U,H=1003,Y=1003,W,X=1026,G=1){if(X!==1026&&X!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let q={width:J,height:Q,depth:G};super(q,$,K,U,H,Y,X,Z,W);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new bQ(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);return Q.compareFunction=this.compareFunction,Q}}class PU extends oJ{constructor(J,Q=1014,Z=301,$,K,U=1003,H=1003,Y,W=1026){let X={width:J,height:J,depth:1},G=[X,X,X,X,X,X];super(J,J,Q,Z,$,K,U,H,Y,W);this.image=G,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class V$ extends v7{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class _0 extends q9{constructor(J=1,Q=1,Z=1,$=1,K=1,U=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:Z,widthSegments:$,heightSegments:K,depthSegments:U};let H=this;$=Math.floor($),K=Math.floor(K),U=Math.floor(U);let Y=[],W=[],X=[],G=[],q=0,N=0;D("z","y","x",-1,-1,Z,Q,J,U,K,0),D("z","y","x",1,-1,Z,Q,-J,U,K,1),D("x","z","y",1,1,J,Z,Q,$,U,2),D("x","z","y",1,-1,J,Z,-Q,$,U,3),D("x","y","z",1,-1,J,Q,Z,$,K,4),D("x","y","z",-1,-1,J,Q,-Z,$,K,5),this.setIndex(Y),this.setAttribute("position",new J9(W,3)),this.setAttribute("normal",new J9(X,3)),this.setAttribute("uv",new J9(G,2));function D(M,V,F,O,z,C,R,B,_,P,E){let A=C/_,y=R/P,S=C/2,b=R/2,e=B/2,v=_+1,l=P+1,U0=0,i=0,r=new k;for(let u=0;u<l;u++){let h=u*y-b;for(let H0=0;H0<v;H0++){let E0=H0*A-S;r[M]=E0*O,r[V]=h*z,r[F]=e,W.push(r.x,r.y,r.z),r[M]=0,r[V]=0,r[F]=B>0?1:-1,X.push(r.x,r.y,r.z),G.push(H0/_),G.push(1-u/P),U0+=1}}for(let u=0;u<P;u++)for(let h=0;h<_;h++){let H0=q+h+v*u,E0=q+h+v*(u+1),L0=q+(h+1)+v*(u+1),d=q+(h+1)+v*u;Y.push(H0,E0,d),Y.push(E0,L0,d),i+=6}H.addGroup(N,i,E),N+=i,q+=U0}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new _0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class H8 extends q9{constructor(J=1,Q=1,Z=4,$=8,K=1){super();this.type="CapsuleGeometry",this.parameters={radius:J,height:Q,capSegments:Z,radialSegments:$,heightSegments:K},Q=Math.max(0,Q),Z=Math.max(1,Math.floor(Z)),$=Math.max(3,Math.floor($)),K=Math.max(1,Math.floor(K));let U=[],H=[],Y=[],W=[],X=Q/2,G=Math.PI/2*J,q=Q,N=2*G+q,D=Z*2+K,M=$+1,V=new k,F=new k;for(let O=0;O<=D;O++){let z=0,C=0,R=0,B=0;if(O<=Z){let E=O/Z,A=E*Math.PI/2;C=-X-J*Math.cos(A),R=J*Math.sin(A),B=-J*Math.cos(A),z=E*G}else if(O<=Z+K){let E=(O-Z)/K;C=-X+E*Q,R=J,B=0,z=G+E*q}else{let E=(O-Z-K)/Z,A=E*Math.PI/2;C=X+J*Math.sin(A),R=J*Math.cos(A),B=J*Math.sin(A),z=G+q+E*G}let _=Math.max(0,Math.min(1,z/N)),P=0;if(O===0)P=0.5/$;else if(O===D)P=-0.5/$;for(let E=0;E<=$;E++){let A=E/$,y=A*Math.PI*2,S=Math.sin(y),b=Math.cos(y);F.x=-R*b,F.y=C,F.z=R*S,H.push(F.x,F.y,F.z),V.set(-R*b,B,R*S),V.normalize(),Y.push(V.x,V.y,V.z),W.push(A+P,_)}if(O>0){let E=(O-1)*M;for(let A=0;A<$;A++){let y=E+A,S=E+A+1,b=O*M+A,e=O*M+A+1;U.push(y,S,b),U.push(S,e,b)}}}this.setIndex(U),this.setAttribute("position",new J9(H,3)),this.setAttribute("normal",new J9(Y,3)),this.setAttribute("uv",new J9(W,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new H8(J.radius,J.height,J.capSegments,J.radialSegments,J.heightSegments)}}class T7 extends q9{constructor(J=1,Q=32,Z=0,$=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:Q,thetaStart:Z,thetaLength:$},Q=Math.max(3,Q);let K=[],U=[],H=[],Y=[],W=new k,X=new q0;U.push(0,0,0),H.push(0,0,1),Y.push(0.5,0.5);for(let G=0,q=3;G<=Q;G++,q+=3){let N=Z+G/Q*$;W.x=J*Math.cos(N),W.y=J*Math.sin(N),U.push(W.x,W.y,W.z),H.push(0,0,1),X.x=(U[q]/J+1)/2,X.y=(U[q+1]/J+1)/2,Y.push(X.x,X.y)}for(let G=1;G<=Q;G++)K.push(G,G+1,0);this.setIndex(K),this.setAttribute("position",new J9(U,3)),this.setAttribute("normal",new J9(H,3)),this.setAttribute("uv",new J9(Y,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new T7(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class T0 extends q9{constructor(J=1,Q=1,Z=1,$=32,K=1,U=!1,H=0,Y=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:Q,height:Z,radialSegments:$,heightSegments:K,openEnded:U,thetaStart:H,thetaLength:Y};let W=this;$=Math.floor($),K=Math.floor(K);let X=[],G=[],q=[],N=[],D=0,M=[],V=Z/2,F=0;if(O(),U===!1){if(J>0)z(!0);if(Q>0)z(!1)}this.setIndex(X),this.setAttribute("position",new J9(G,3)),this.setAttribute("normal",new J9(q,3)),this.setAttribute("uv",new J9(N,2));function O(){let C=new k,R=new k,B=0,_=(Q-J)/Z;for(let P=0;P<=K;P++){let E=[],A=P/K,y=A*(Q-J)+J;for(let S=0;S<=$;S++){let b=S/$,e=b*Y+H,v=Math.sin(e),l=Math.cos(e);R.x=y*v,R.y=-A*Z+V,R.z=y*l,G.push(R.x,R.y,R.z),C.set(v,_,l).normalize(),q.push(C.x,C.y,C.z),N.push(b,1-A),E.push(D++)}M.push(E)}for(let P=0;P<$;P++)for(let E=0;E<K;E++){let A=M[E][P],y=M[E+1][P],S=M[E+1][P+1],b=M[E][P+1];if(J>0||E!==0)X.push(A,y,b),B+=3;if(Q>0||E!==K-1)X.push(y,S,b),B+=3}W.addGroup(F,B,0),F+=B}function z(C){let R=D,B=new q0,_=new k,P=0,E=C===!0?J:Q,A=C===!0?1:-1;for(let S=1;S<=$;S++)G.push(0,V*A,0),q.push(0,A,0),N.push(0.5,0.5),D++;let y=D;for(let S=0;S<=$;S++){let e=S/$*Y+H,v=Math.cos(e),l=Math.sin(e);_.x=E*l,_.y=V*A,_.z=E*v,G.push(_.x,_.y,_.z),q.push(0,A,0),B.x=v*0.5+0.5,B.y=l*0.5*A+0.5,N.push(B.x,B.y),D++}for(let S=0;S<$;S++){let b=R+S,e=y+S;if(C===!0)X.push(e,e+1,b);else X.push(e+1,e,b);P+=3}W.addGroup(F,P,C===!0?1:2),F+=P}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new T0(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class Z7 extends T0{constructor(J=1,Q=1,Z=32,$=1,K=!1,U=0,H=Math.PI*2){super(0,J,Q,Z,$,K,U,H);this.type="ConeGeometry",this.parameters={radius:J,height:Q,radialSegments:Z,heightSegments:$,openEnded:K,thetaStart:U,thetaLength:H}}static fromJSON(J){return new Z7(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class I$ extends q9{constructor(J=[],Q=[],Z=1,$=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:Q,radius:Z,detail:$};let K=[],U=[];if(H($),W(Z),X(),this.setAttribute("position",new J9(K,3)),this.setAttribute("normal",new J9(K.slice(),3)),this.setAttribute("uv",new J9(U,2)),$===0)this.computeVertexNormals();else this.normalizeNormals();function H(O){let z=new k,C=new k,R=new k;for(let B=0;B<Q.length;B+=3)N(Q[B+0],z),N(Q[B+1],C),N(Q[B+2],R),Y(z,C,R,O)}function Y(O,z,C,R){let B=R+1,_=[];for(let P=0;P<=B;P++){_[P]=[];let E=O.clone().lerp(C,P/B),A=z.clone().lerp(C,P/B),y=B-P;for(let S=0;S<=y;S++)if(S===0&&P===B)_[P][S]=E;else _[P][S]=E.clone().lerp(A,S/y)}for(let P=0;P<B;P++)for(let E=0;E<2*(B-P)-1;E++){let A=Math.floor(E/2);if(E%2===0)q(_[P][A+1]),q(_[P+1][A]),q(_[P][A]);else q(_[P][A+1]),q(_[P+1][A+1]),q(_[P+1][A])}}function W(O){let z=new k;for(let C=0;C<K.length;C+=3)z.x=K[C+0],z.y=K[C+1],z.z=K[C+2],z.normalize().multiplyScalar(O),K[C+0]=z.x,K[C+1]=z.y,K[C+2]=z.z}function X(){let O=new k;for(let z=0;z<K.length;z+=3){O.x=K[z+0],O.y=K[z+1],O.z=K[z+2];let C=V(O)/2/Math.PI+0.5,R=F(O)/Math.PI+0.5;U.push(C,1-R)}D(),G()}function G(){for(let O=0;O<U.length;O+=6){let z=U[O+0],C=U[O+2],R=U[O+4],B=Math.max(z,C,R),_=Math.min(z,C,R);if(B>0.9&&_<0.1){if(z<0.2)U[O+0]+=1;if(C<0.2)U[O+2]+=1;if(R<0.2)U[O+4]+=1}}}function q(O){K.push(O.x,O.y,O.z)}function N(O,z){let C=O*3;z.x=J[C+0],z.y=J[C+1],z.z=J[C+2]}function D(){let O=new k,z=new k,C=new k,R=new k,B=new q0,_=new q0,P=new q0;for(let E=0,A=0;E<K.length;E+=9,A+=6){O.set(K[E+0],K[E+1],K[E+2]),z.set(K[E+3],K[E+4],K[E+5]),C.set(K[E+6],K[E+7],K[E+8]),B.set(U[A+0],U[A+1]),_.set(U[A+2],U[A+3]),P.set(U[A+4],U[A+5]),R.copy(O).add(z).add(C).divideScalar(3);let y=V(R);M(B,A+0,O,y),M(_,A+2,z,y),M(P,A+4,C,y)}}function M(O,z,C,R){if(R<0&&O.x===1)U[z]=O.x-1;if(C.x===0&&C.z===0)U[z]=R/2/Math.PI+0.5}function V(O){return Math.atan2(O.z,-O.x)}function F(O){return Math.atan2(-O.y,Math.sqrt(O.x*O.x+O.z*O.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new I$(J.vertices,J.indices,J.radius,J.detail)}}var dZ=new k,lZ=new k,VK=new k,cZ=new n7;class SJ extends q9{constructor(J=null,Q=1){super();if(this.type="EdgesGeometry",this.parameters={geometry:J,thresholdAngle:Q},J!==null){let $=Math.pow(10,4),K=Math.cos(aZ*Q),U=J.getIndex(),H=J.getAttribute("position"),Y=U?U.count:H.count,W=[0,0,0],X=["a","b","c"],G=[,,,],q={},N=[];for(let D=0;D<Y;D+=3){if(U)W[0]=U.getX(D),W[1]=U.getX(D+1),W[2]=U.getX(D+2);else W[0]=D,W[1]=D+1,W[2]=D+2;let{a:M,b:V,c:F}=cZ;if(M.fromBufferAttribute(H,W[0]),V.fromBufferAttribute(H,W[1]),F.fromBufferAttribute(H,W[2]),cZ.getNormal(VK),G[0]=`${Math.round(M.x*$)},${Math.round(M.y*$)},${Math.round(M.z*$)}`,G[1]=`${Math.round(V.x*$)},${Math.round(V.y*$)},${Math.round(V.z*$)}`,G[2]=`${Math.round(F.x*$)},${Math.round(F.y*$)},${Math.round(F.z*$)}`,G[0]===G[1]||G[1]===G[2]||G[2]===G[0])continue;for(let O=0;O<3;O++){let z=(O+1)%3,C=G[O],R=G[z],B=cZ[X[O]],_=cZ[X[z]],P=`${C}_${R}`,E=`${R}_${C}`;if(E in q&&q[E]){if(VK.dot(q[E].normal)<=K)N.push(B.x,B.y,B.z),N.push(_.x,_.y,_.z);q[E]=null}else if(!(P in q))q[P]={index0:W[O],index1:W[z],normal:VK.clone()}}}for(let D in q)if(q[D]){let{index0:M,index1:V}=q[D];dZ.fromBufferAttribute(H,M),lZ.fromBufferAttribute(H,V),N.push(dZ.x,dZ.y,dZ.z),N.push(lZ.x,lZ.y,lZ.z)}this.setAttribute("position",new J9(N,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}class a7{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){H9("Curve: .getPoint() not implemented.")}getPointAt(J,Q){let Z=this.getUtoTmapping(J);return this.getPoint(Z,Q)}getPoints(J=5){let Q=[];for(let Z=0;Z<=J;Z++)Q.push(this.getPoint(Z/J));return Q}getSpacedPoints(J=5){let Q=[];for(let Z=0;Z<=J;Z++)Q.push(this.getPointAt(Z/J));return Q}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let Q=[],Z,$=this.getPoint(0),K=0;Q.push(0);for(let U=1;U<=J;U++)Z=this.getPoint(U/J),K+=Z.distanceTo($),Q.push(K),$=Z;return this.cacheArcLengths=Q,Q}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,Q=null){let Z=this.getLengths(),$=0,K=Z.length,U;if(Q)U=Q;else U=J*Z[K-1];let H=0,Y=K-1,W;while(H<=Y)if($=Math.floor(H+(Y-H)/2),W=Z[$]-U,W<0)H=$+1;else if(W>0)Y=$-1;else{Y=$;break}if($=Y,Z[$]===U)return $/(K-1);let X=Z[$],q=Z[$+1]-X,N=(U-X)/q;return($+N)/(K-1)}getTangent(J,Q){let $=J-0.0001,K=J+0.0001;if($<0)$=0;if(K>1)K=1;let U=this.getPoint($),H=this.getPoint(K),Y=Q||(U.isVector2?new q0:new k);return Y.copy(H).sub(U).normalize(),Y}getTangentAt(J,Q){let Z=this.getUtoTmapping(J);return this.getTangent(Z,Q)}computeFrenetFrames(J,Q=!1){let Z=new k,$=[],K=[],U=[],H=new k,Y=new x9;for(let N=0;N<=J;N++){let D=N/J;$[N]=this.getTangentAt(D,new k)}K[0]=new k,U[0]=new k;let W=Number.MAX_VALUE,X=Math.abs($[0].x),G=Math.abs($[0].y),q=Math.abs($[0].z);if(X<=W)W=X,Z.set(1,0,0);if(G<=W)W=G,Z.set(0,1,0);if(q<=W)Z.set(0,0,1);H.crossVectors($[0],Z).normalize(),K[0].crossVectors($[0],H),U[0].crossVectors($[0],K[0]);for(let N=1;N<=J;N++){if(K[N]=K[N-1].clone(),U[N]=U[N-1].clone(),H.crossVectors($[N-1],$[N]),H.length()>Number.EPSILON){H.normalize();let D=Math.acos(z9($[N-1].dot($[N]),-1,1));K[N].applyMatrix4(Y.makeRotationAxis(H,D))}U[N].crossVectors($[N],K[N])}if(Q===!0){let N=Math.acos(z9(K[0].dot(K[J]),-1,1));if(N/=J,$[0].dot(H.crossVectors(K[0],K[J]))>0)N=-N;for(let D=1;D<=J;D++)K[D].applyMatrix4(Y.makeRotationAxis($[D],N*D)),U[D].crossVectors($[D],K[D])}return{tangents:$,normals:K,binormals:U}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class pQ extends a7{constructor(J=0,Q=0,Z=1,$=1,K=0,U=Math.PI*2,H=!1,Y=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=Q,this.xRadius=Z,this.yRadius=$,this.aStartAngle=K,this.aEndAngle=U,this.aClockwise=H,this.aRotation=Y}getPoint(J,Q=new q0){let Z=Q,$=Math.PI*2,K=this.aEndAngle-this.aStartAngle,U=Math.abs(K)<Number.EPSILON;while(K<0)K+=$;while(K>$)K-=$;if(K<Number.EPSILON)if(U)K=0;else K=$;if(this.aClockwise===!0&&!U)if(K===$)K=-$;else K=K-$;let H=this.aStartAngle+J*K,Y=this.aX+this.xRadius*Math.cos(H),W=this.aY+this.yRadius*Math.sin(H);if(this.aRotation!==0){let X=Math.cos(this.aRotation),G=Math.sin(this.aRotation),q=Y-this.aX,N=W-this.aY;Y=q*X-N*G+this.aX,W=q*G+N*X+this.aY}return Z.set(Y,W)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class CU extends pQ{constructor(J,Q,Z,$,K,U){super(J,Q,Z,Z,$,K,U);this.isArcCurve=!0,this.type="ArcCurve"}}function LU(){let J=0,Q=0,Z=0,$=0;function K(U,H,Y,W){J=U,Q=Y,Z=-3*U+3*H-2*Y-W,$=2*U-2*H+Y+W}return{initCatmullRom:function(U,H,Y,W,X){K(H,Y,X*(Y-U),X*(W-H))},initNonuniformCatmullRom:function(U,H,Y,W,X,G,q){let N=(H-U)/X-(Y-U)/(X+G)+(Y-H)/G,D=(Y-H)/G-(W-H)/(G+q)+(W-Y)/q;N*=G,D*=G,K(H,Y,N,D)},calc:function(U){let H=U*U,Y=H*U;return J+Q*U+Z*H+$*Y}}}var VY=new k,IY=new k,IK=new LU,BK=new LU,_K=new LU;class n6 extends a7{constructor(J=[],Q=!1,Z="centripetal",$=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=Q,this.curveType=Z,this.tension=$}getPoint(J,Q=new k){let Z=Q,$=this.points,K=$.length,U=(K-(this.closed?0:1))*J,H=Math.floor(U),Y=U-H;if(this.closed)H+=H>0?0:(Math.floor(Math.abs(H)/K)+1)*K;else if(Y===0&&H===K-1)H=K-2,Y=1;let W,X;if(this.closed||H>0)W=$[(H-1)%K];else IY.subVectors($[0],$[1]).add($[0]),W=IY;let G=$[H%K],q=$[(H+1)%K];if(this.closed||H+2<K)X=$[(H+2)%K];else VY.subVectors($[K-1],$[K-2]).add($[K-1]),X=VY;if(this.curveType==="centripetal"||this.curveType==="chordal"){let N=this.curveType==="chordal"?0.5:0.25,D=Math.pow(W.distanceToSquared(G),N),M=Math.pow(G.distanceToSquared(q),N),V=Math.pow(q.distanceToSquared(X),N);if(M<0.0001)M=1;if(D<0.0001)D=M;if(V<0.0001)V=M;IK.initNonuniformCatmullRom(W.x,G.x,q.x,X.x,D,M,V),BK.initNonuniformCatmullRom(W.y,G.y,q.y,X.y,D,M,V),_K.initNonuniformCatmullRom(W.z,G.z,q.z,X.z,D,M,V)}else if(this.curveType==="catmullrom")IK.initCatmullRom(W.x,G.x,q.x,X.x,this.tension),BK.initCatmullRom(W.y,G.y,q.y,X.y,this.tension),_K.initCatmullRom(W.z,G.z,q.z,X.z,this.tension);return Z.set(IK.calc(Y),BK.calc(Y),_K.calc(Y)),Z}copy(J){super.copy(J),this.points=[];for(let Q=0,Z=J.points.length;Q<Z;Q++){let $=J.points[Q];this.points.push($.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,Z=this.points.length;Q<Z;Q++){let $=this.points[Q];J.points.push($.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,Z=J.points.length;Q<Z;Q++){let $=J.points[Q];this.points.push(new k().fromArray($))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function BY(J,Q,Z,$,K){let U=($-Q)*0.5,H=(K-Z)*0.5,Y=J*J,W=J*Y;return(2*Z-2*$+U+H)*W+(-3*Z+3*$-2*U-H)*Y+U*J+Z}function iX(J,Q){let Z=1-J;return Z*Z*Q}function oX(J,Q){return 2*(1-J)*J*Q}function aX(J,Q){return J*J*Q}function MQ(J,Q,Z,$){return iX(J,Q)+oX(J,Z)+aX(J,$)}function rX(J,Q){let Z=1-J;return Z*Z*Z*Q}function tX(J,Q){let Z=1-J;return 3*Z*Z*J*Q}function eX(J,Q){return 3*(1-J)*J*J*Q}function JG(J,Q){return J*J*J*Q}function RQ(J,Q,Z,$,K){return rX(J,Q)+tX(J,Z)+eX(J,$)+JG(J,K)}class B$ extends a7{constructor(J=new q0,Q=new q0,Z=new q0,$=new q0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=Q,this.v2=Z,this.v3=$}getPoint(J,Q=new q0){let Z=Q,$=this.v0,K=this.v1,U=this.v2,H=this.v3;return Z.set(RQ(J,$.x,K.x,U.x,H.x),RQ(J,$.y,K.y,U.y,H.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class TU extends a7{constructor(J=new k,Q=new k,Z=new k,$=new k){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=Q,this.v2=Z,this.v3=$}getPoint(J,Q=new k){let Z=Q,$=this.v0,K=this.v1,U=this.v2,H=this.v3;return Z.set(RQ(J,$.x,K.x,U.x,H.x),RQ(J,$.y,K.y,U.y,H.y),RQ(J,$.z,K.z,U.z,H.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class _$ extends a7{constructor(J=new q0,Q=new q0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=Q}getPoint(J,Q=new q0){let Z=Q;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new q0){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class s6 extends a7{constructor(J=new k,Q=new k){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=Q}getPoint(J,Q=new k){let Z=Q;if(J===1)Z.copy(this.v2);else Z.copy(this.v2).sub(this.v1),Z.multiplyScalar(J).add(this.v1);return Z}getPointAt(J,Q){return this.getPoint(J,Q)}getTangent(J,Q=new k){return Q.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,Q){return this.getTangent(J,Q)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class A$ extends a7{constructor(J=new q0,Q=new q0,Z=new q0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=Q,this.v2=Z}getPoint(J,Q=new q0){let Z=Q,$=this.v0,K=this.v1,U=this.v2;return Z.set(MQ(J,$.x,K.x,U.x),MQ(J,$.y,K.y,U.y)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class z$ extends a7{constructor(J=new k,Q=new k,Z=new k){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=Q,this.v2=Z}getPoint(J,Q=new k){let Z=Q,$=this.v0,K=this.v1,U=this.v2;return Z.set(MQ(J,$.x,K.x,U.x),MQ(J,$.y,K.y,U.y),MQ(J,$.z,K.z,U.z)),Z}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class P$ extends a7{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,Q=new q0){let Z=Q,$=this.points,K=($.length-1)*J,U=Math.floor(K),H=K-U,Y=$[U===0?U:U-1],W=$[U],X=$[U>$.length-2?$.length-1:U+1],G=$[U>$.length-3?$.length-1:U+2];return Z.set(BY(H,Y.x,W.x,X.x,G.x),BY(H,Y.y,W.y,X.y,G.y)),Z}copy(J){super.copy(J),this.points=[];for(let Q=0,Z=J.points.length;Q<Z;Q++){let $=J.points[Q];this.points.push($.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let Q=0,Z=this.points.length;Q<Z;Q++){let $=this.points[Q];J.points.push($.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let Q=0,Z=J.points.length;Q<Z;Q++){let $=J.points[Q];this.points.push(new q0().fromArray($))}return this}}var J$=Object.freeze({__proto__:null,ArcCurve:CU,CatmullRomCurve3:n6,CubicBezierCurve:B$,CubicBezierCurve3:TU,EllipseCurve:pQ,LineCurve:_$,LineCurve3:s6,QuadraticBezierCurve:A$,QuadraticBezierCurve3:z$,SplineCurve:P$});class wU extends a7{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),Q=this.curves[this.curves.length-1].getPoint(1);if(!J.equals(Q)){let Z=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new J$[Z](Q,J))}return this}getPoint(J,Q){let Z=J*this.getLength(),$=this.getCurveLengths(),K=0;while(K<$.length){if($[K]>=Z){let U=$[K]-Z,H=this.curves[K],Y=H.getLength(),W=Y===0?0:1-U/Y;return H.getPointAt(W,Q)}K++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],Q=0;for(let Z=0,$=this.curves.length;Z<$;Z++)Q+=this.curves[Z].getLength(),J.push(Q);return this.cacheLengths=J,J}getSpacedPoints(J=40){let Q=[];for(let Z=0;Z<=J;Z++)Q.push(this.getPoint(Z/J));if(this.autoClose)Q.push(Q[0]);return Q}getPoints(J=12){let Q=[],Z;for(let $=0,K=this.curves;$<K.length;$++){let U=K[$],H=U.isEllipseCurve?J*2:U.isLineCurve||U.isLineCurve3?1:U.isSplineCurve?J*U.points.length:J,Y=U.getPoints(H);for(let W=0;W<Y.length;W++){let X=Y[W];if(Z&&Z.equals(X))continue;Q.push(X),Z=X}}if(this.autoClose&&Q.length>1&&!Q[Q.length-1].equals(Q[0]))Q.push(Q[0]);return Q}copy(J){super.copy(J),this.curves=[];for(let Q=0,Z=J.curves.length;Q<Z;Q++){let $=J.curves[Q];this.curves.push($.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let Q=0,Z=this.curves.length;Q<Z;Q++){let $=this.curves[Q];J.curves.push($.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let Q=0,Z=J.curves.length;Q<Z;Q++){let $=J.curves[Q];this.curves.push(new J$[$.type]().fromJSON($))}return this}}class Q$ extends wU{constructor(J){super();if(this.type="Path",this.currentPoint=new q0,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let Q=1,Z=J.length;Q<Z;Q++)this.lineTo(J[Q].x,J[Q].y);return this}moveTo(J,Q){return this.currentPoint.set(J,Q),this}lineTo(J,Q){let Z=new _$(this.currentPoint.clone(),new q0(J,Q));return this.curves.push(Z),this.currentPoint.set(J,Q),this}quadraticCurveTo(J,Q,Z,$){let K=new A$(this.currentPoint.clone(),new q0(J,Q),new q0(Z,$));return this.curves.push(K),this.currentPoint.set(Z,$),this}bezierCurveTo(J,Q,Z,$,K,U){let H=new B$(this.currentPoint.clone(),new q0(J,Q),new q0(Z,$),new q0(K,U));return this.curves.push(H),this.currentPoint.set(K,U),this}splineThru(J){let Q=[this.currentPoint.clone()].concat(J),Z=new P$(Q);return this.curves.push(Z),this.currentPoint.copy(J[J.length-1]),this}arc(J,Q,Z,$,K,U){let H=this.currentPoint.x,Y=this.currentPoint.y;return this.absarc(J+H,Q+Y,Z,$,K,U),this}absarc(J,Q,Z,$,K,U){return this.absellipse(J,Q,Z,Z,$,K,U),this}ellipse(J,Q,Z,$,K,U,H,Y){let W=this.currentPoint.x,X=this.currentPoint.y;return this.absellipse(J+W,Q+X,Z,$,K,U,H,Y),this}absellipse(J,Q,Z,$,K,U,H,Y){let W=new pQ(J,Q,Z,$,K,U,H,Y);if(this.curves.length>0){let G=W.getPoint(0);if(!G.equals(this.currentPoint))this.lineTo(G.x,G.y)}this.curves.push(W);let X=W.getPoint(1);return this.currentPoint.copy(X),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class F8 extends Q${constructor(J){super(J);this.uuid=$J(),this.type="Shape",this.holes=[]}getPointsHoles(J){let Q=[];for(let Z=0,$=this.holes.length;Z<$;Z++)Q[Z]=this.holes[Z].getPoints(J);return Q}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let Q=0,Z=J.holes.length;Q<Z;Q++){let $=J.holes[Q];this.holes.push($.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let Q=0,Z=this.holes.length;Q<Z;Q++){let $=this.holes[Q];J.holes.push($.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let Q=0,Z=J.holes.length;Q<Z;Q++){let $=J.holes[Q];this.holes.push(new Q$().fromJSON($))}return this}}function QG(J,Q,Z=2){let $=Q&&Q.length,K=$?Q[0]*Z:J.length,U=vW(J,0,K,Z,!0),H=[];if(!U||U.next===U.prev)return H;let Y,W,X;if($)U=HG(J,Q,U,Z);if(J.length>80*Z){Y=J[0],W=J[1];let G=Y,q=W;for(let N=Z;N<K;N+=Z){let D=J[N],M=J[N+1];if(D<Y)Y=D;if(M<W)W=M;if(D>G)G=D;if(M>q)q=M}X=Math.max(G-Y,q-W),X=X!==0?32767/X:0}return _Q(U,H,Z,Y,W,X,0),H}function vW(J,Q,Z,$,K){let U;if(K===RG(J,Q,Z,$)>0)for(let H=Q;H<Z;H+=$)U=_Y(H/$|0,J[H],J[H+1],U);else for(let H=Z-$;H>=Q;H-=$)U=_Y(H/$|0,J[H],J[H+1],U);if(U&&g6(U,U.next))zQ(U),U=U.next;return U}function uJ(J,Q){if(!J)return J;if(!Q)Q=J;let Z=J,$;do if($=!1,!Z.steiner&&(g6(Z,Z.next)||D7(Z.prev,Z,Z.next)===0)){if(zQ(Z),Z=Q=Z.prev,Z===Z.next)break;$=!0}else Z=Z.next;while($||Z!==Q);return Q}function _Q(J,Q,Z,$,K,U,H){if(!J)return;if(!H&&U)NG(J,$,K,U);let Y=J;while(J.prev!==J.next){let{prev:W,next:X}=J;if(U?$G(J,$,K,U):ZG(J)){Q.push(W.i,J.i,X.i),zQ(J),J=X.next,Y=X.next;continue}if(J=X,J===Y){if(!H)_Q(uJ(J),Q,Z,$,K,U,1);else if(H===1)J=KG(uJ(J),Q),_Q(J,Q,Z,$,K,U,2);else if(H===2)UG(J,Q,Z,$,K,U);break}}}function ZG(J){let Q=J.prev,Z=J,$=J.next;if(D7(Q,Z,$)>=0)return!1;let K=Q.x,U=Z.x,H=$.x,Y=Q.y,W=Z.y,X=$.y,G=Math.min(K,U,H),q=Math.min(Y,W,X),N=Math.max(K,U,H),D=Math.max(Y,W,X),M=$.next;while(M!==Q){if(M.x>=G&&M.x<=N&&M.y>=q&&M.y<=D&&OQ(K,Y,U,W,H,X,M.x,M.y)&&D7(M.prev,M,M.next)>=0)return!1;M=M.next}return!0}function $G(J,Q,Z,$){let K=J.prev,U=J,H=J.next;if(D7(K,U,H)>=0)return!1;let Y=K.x,W=U.x,X=H.x,G=K.y,q=U.y,N=H.y,D=Math.min(Y,W,X),M=Math.min(G,q,N),V=Math.max(Y,W,X),F=Math.max(G,q,N),O=CK(D,M,Q,Z,$),z=CK(V,F,Q,Z,$),C=J.prevZ,R=J.nextZ;while(C&&C.z>=O&&R&&R.z<=z){if(C.x>=D&&C.x<=V&&C.y>=M&&C.y<=F&&C!==K&&C!==H&&OQ(Y,G,W,q,X,N,C.x,C.y)&&D7(C.prev,C,C.next)>=0)return!1;if(C=C.prevZ,R.x>=D&&R.x<=V&&R.y>=M&&R.y<=F&&R!==K&&R!==H&&OQ(Y,G,W,q,X,N,R.x,R.y)&&D7(R.prev,R,R.next)>=0)return!1;R=R.nextZ}while(C&&C.z>=O){if(C.x>=D&&C.x<=V&&C.y>=M&&C.y<=F&&C!==K&&C!==H&&OQ(Y,G,W,q,X,N,C.x,C.y)&&D7(C.prev,C,C.next)>=0)return!1;C=C.prevZ}while(R&&R.z<=z){if(R.x>=D&&R.x<=V&&R.y>=M&&R.y<=F&&R!==K&&R!==H&&OQ(Y,G,W,q,X,N,R.x,R.y)&&D7(R.prev,R,R.next)>=0)return!1;R=R.nextZ}return!0}function KG(J,Q){let Z=J;do{let $=Z.prev,K=Z.next.next;if(!g6($,K)&&fW($,Z,Z.next,K)&&AQ($,K)&&AQ(K,$))Q.push($.i,Z.i,K.i),zQ(Z),zQ(Z.next),Z=J=K;Z=Z.next}while(Z!==J);return uJ(Z)}function UG(J,Q,Z,$,K,U){let H=J;do{let Y=H.next.next;while(Y!==H.prev){if(H.i!==Y.i&&FG(H,Y)){let W=bW(H,Y);H=uJ(H,H.next),W=uJ(W,W.next),_Q(H,Q,Z,$,K,U,0),_Q(W,Q,Z,$,K,U,0);return}Y=Y.next}H=H.next}while(H!==J)}function HG(J,Q,Z,$){let K=[];for(let U=0,H=Q.length;U<H;U++){let Y=Q[U]*$,W=U<H-1?Q[U+1]*$:J.length,X=vW(J,Y,W,$,!1);if(X===X.next)X.steiner=!0;K.push(DG(X))}K.sort(YG);for(let U=0;U<K.length;U++)Z=WG(K[U],Z);return Z}function YG(J,Q){let Z=J.x-Q.x;if(Z===0){if(Z=J.y-Q.y,Z===0){let $=(J.next.y-J.y)/(J.next.x-J.x),K=(Q.next.y-Q.y)/(Q.next.x-Q.x);Z=$-K}}return Z}function WG(J,Q){let Z=XG(J,Q);if(!Z)return Q;let $=bW(Z,J);return uJ($,$.next),uJ(Z,Z.next)}function XG(J,Q){let Z=Q,$=J.x,K=J.y,U=-1/0,H;if(g6(J,Z))return Z;do{if(g6(J,Z.next))return Z.next;else if(K<=Z.y&&K>=Z.next.y&&Z.next.y!==Z.y){let q=Z.x+(K-Z.y)*(Z.next.x-Z.x)/(Z.next.y-Z.y);if(q<=$&&q>U){if(U=q,H=Z.x<Z.next.x?Z:Z.next,q===$)return H}}Z=Z.next}while(Z!==Q);if(!H)return null;let Y=H,W=H.x,X=H.y,G=1/0;Z=H;do{if($>=Z.x&&Z.x>=W&&$!==Z.x&&yW(K<X?$:U,K,W,X,K<X?U:$,K,Z.x,Z.y)){let q=Math.abs(K-Z.y)/($-Z.x);if(AQ(Z,J)&&(q<G||q===G&&(Z.x>H.x||Z.x===H.x&&GG(H,Z))))H=Z,G=q}Z=Z.next}while(Z!==Y);return H}function GG(J,Q){return D7(J.prev,J,Q.prev)<0&&D7(Q.next,J,J.next)<0}function NG(J,Q,Z,$){let K=J;do{if(K.z===0)K.z=CK(K.x,K.y,Q,Z,$);K.prevZ=K.prev,K.nextZ=K.next,K=K.next}while(K!==J);K.prevZ.nextZ=null,K.prevZ=null,qG(K)}function qG(J){let Q,Z=1;do{let $=J,K;J=null;let U=null;Q=0;while($){Q++;let H=$,Y=0;for(let X=0;X<Z;X++)if(Y++,H=H.nextZ,!H)break;let W=Z;while(Y>0||W>0&&H){if(Y!==0&&(W===0||!H||$.z<=H.z))K=$,$=$.nextZ,Y--;else K=H,H=H.nextZ,W--;if(U)U.nextZ=K;else J=K;K.prevZ=U,U=K}$=H}U.nextZ=null,Z*=2}while(Q>1);return J}function CK(J,Q,Z,$,K){return J=(J-Z)*K|0,Q=(Q-$)*K|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,Q=(Q|Q<<8)&16711935,Q=(Q|Q<<4)&252645135,Q=(Q|Q<<2)&858993459,Q=(Q|Q<<1)&1431655765,J|Q<<1}function DG(J){let Q=J,Z=J;do{if(Q.x<Z.x||Q.x===Z.x&&Q.y<Z.y)Z=Q;Q=Q.next}while(Q!==J);return Z}function yW(J,Q,Z,$,K,U,H,Y){return(K-H)*(Q-Y)>=(J-H)*(U-Y)&&(J-H)*($-Y)>=(Z-H)*(Q-Y)&&(Z-H)*(U-Y)>=(K-H)*($-Y)}function OQ(J,Q,Z,$,K,U,H,Y){return!(J===H&&Q===Y)&&yW(J,Q,Z,$,K,U,H,Y)}function FG(J,Q){return J.next.i!==Q.i&&J.prev.i!==Q.i&&!OG(J,Q)&&(AQ(J,Q)&&AQ(Q,J)&&MG(J,Q)&&(D7(J.prev,J,Q.prev)||D7(J,Q.prev,Q))||g6(J,Q)&&D7(J.prev,J,J.next)>0&&D7(Q.prev,Q,Q.next)>0)}function D7(J,Q,Z){return(Q.y-J.y)*(Z.x-Q.x)-(Q.x-J.x)*(Z.y-Q.y)}function g6(J,Q){return J.x===Q.x&&J.y===Q.y}function fW(J,Q,Z,$){let K=sZ(D7(J,Q,Z)),U=sZ(D7(J,Q,$)),H=sZ(D7(Z,$,J)),Y=sZ(D7(Z,$,Q));if(K!==U&&H!==Y)return!0;if(K===0&&nZ(J,Z,Q))return!0;if(U===0&&nZ(J,$,Q))return!0;if(H===0&&nZ(Z,J,$))return!0;if(Y===0&&nZ(Z,Q,$))return!0;return!1}function nZ(J,Q,Z){return Q.x<=Math.max(J.x,Z.x)&&Q.x>=Math.min(J.x,Z.x)&&Q.y<=Math.max(J.y,Z.y)&&Q.y>=Math.min(J.y,Z.y)}function sZ(J){return J>0?1:J<0?-1:0}function OG(J,Q){let Z=J;do{if(Z.i!==J.i&&Z.next.i!==J.i&&Z.i!==Q.i&&Z.next.i!==Q.i&&fW(Z,Z.next,J,Q))return!0;Z=Z.next}while(Z!==J);return!1}function AQ(J,Q){return D7(J.prev,J,J.next)<0?D7(J,Q,J.next)>=0&&D7(J,J.prev,Q)>=0:D7(J,Q,J.prev)<0||D7(J,J.next,Q)<0}function MG(J,Q){let Z=J,$=!1,K=(J.x+Q.x)/2,U=(J.y+Q.y)/2;do{if(Z.y>U!==Z.next.y>U&&Z.next.y!==Z.y&&K<(Z.next.x-Z.x)*(U-Z.y)/(Z.next.y-Z.y)+Z.x)$=!$;Z=Z.next}while(Z!==J);return $}function bW(J,Q){let Z=LK(J.i,J.x,J.y),$=LK(Q.i,Q.x,Q.y),K=J.next,U=Q.prev;return J.next=Q,Q.prev=J,Z.next=K,K.prev=Z,$.next=Z,Z.prev=$,U.next=$,$.prev=U,$}function _Y(J,Q,Z,$){let K=LK(J,Q,Z);if(!$)K.prev=K,K.next=K;else K.next=$.next,K.prev=$,$.next.prev=K,$.next=K;return K}function zQ(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function LK(J,Q,Z){return{i:J,x:Q,y:Z,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function RG(J,Q,Z,$){let K=0;for(let U=Q,H=Z-$;U<Z;U+=$)K+=(J[H]-J[U])*(J[U+1]+J[H+1]),H=U;return K}class xW{static triangulate(J,Q,Z=2){return QG(J,Q,Z)}}class p8{static area(J){let Q=J.length,Z=0;for(let $=Q-1,K=0;K<Q;$=K++)Z+=J[$].x*J[K].y-J[K].x*J[$].y;return Z*0.5}static isClockWise(J){return p8.area(J)<0}static triangulateShape(J,Q){let Z=[],$=[],K=[];AY(J),zY(Z,J);let U=J.length;Q.forEach(AY);for(let Y=0;Y<Q.length;Y++)$.push(U),U+=Q[Y].length,zY(Z,Q[Y]);let H=xW.triangulate(Z,$);for(let Y=0;Y<H.length;Y+=3)K.push(H.slice(Y,Y+3));return K}}function AY(J){let Q=J.length;if(Q>2&&J[Q-1].equals(J[0]))J.pop()}function zY(J,Q){for(let Z=0;Z<Q.length;Z++)J.push(Q[Z].x),J.push(Q[Z].y)}class l8 extends q9{constructor(J=new F8([new q0(0.5,0.5),new q0(-0.5,0.5),new q0(-0.5,-0.5),new q0(0.5,-0.5)]),Q={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:Q},J=Array.isArray(J)?J:[J];let Z=this,$=[],K=[];for(let H=0,Y=J.length;H<Y;H++){let W=J[H];U(W)}this.setAttribute("position",new J9($,3)),this.setAttribute("uv",new J9(K,2)),this.computeVertexNormals();function U(H){let Y=[],W=Q.curveSegments!==void 0?Q.curveSegments:12,X=Q.steps!==void 0?Q.steps:1,G=Q.depth!==void 0?Q.depth:1,q=Q.bevelEnabled!==void 0?Q.bevelEnabled:!0,N=Q.bevelThickness!==void 0?Q.bevelThickness:0.2,D=Q.bevelSize!==void 0?Q.bevelSize:N-0.1,M=Q.bevelOffset!==void 0?Q.bevelOffset:0,V=Q.bevelSegments!==void 0?Q.bevelSegments:3,F=Q.extrudePath,O=Q.UVGenerator!==void 0?Q.UVGenerator:EG,z,C=!1,R,B,_,P;if(F){z=F.getSpacedPoints(X),C=!0,q=!1;let K0=F.isCatmullRomCurve3?F.closed:!1;R=F.computeFrenetFrames(X,K0),B=new k,_=new k,P=new k}if(!q)V=0,N=0,D=0,M=0;let E=H.extractPoints(W),A=E.shape,y=E.holes;if(!p8.isClockWise(A)){A=A.reverse();for(let K0=0,R0=y.length;K0<R0;K0++){let B0=y[K0];if(p8.isClockWise(B0))y[K0]=B0.reverse()}}function b(K0){let A0=K0[0];for(let w0=1;w0<=K0.length;w0++){let r0=w0%K0.length,Q9=K0[r0],O9=Q9.x-A0.x,M9=Q9.y-A0.y,x=O9*O9+M9*M9,a9=Math.max(Math.abs(Q9.x),Math.abs(Q9.y),Math.abs(A0.x),Math.abs(A0.y)),_9=0.000000000000000000010000000000000001*a9*a9;if(x<=_9){K0.splice(r0,1),w0--;continue}A0=Q9}}b(A),y.forEach(b);let e=y.length,v=A;for(let K0=0;K0<e;K0++){let R0=y[K0];A=A.concat(R0)}function l(K0,R0,B0){if(!R0)X9("ExtrudeGeometry: vec does not exist");return K0.clone().addScaledVector(R0,B0)}let U0=A.length;function i(K0,R0,B0){let A0,w0,r0,Q9=K0.x-R0.x,O9=K0.y-R0.y,M9=B0.x-K0.x,x=B0.y-K0.y,a9=Q9*Q9+O9*O9,_9=Q9*x-O9*M9;if(Math.abs(_9)>Number.EPSILON){let C9=Math.sqrt(a9),w=Math.sqrt(M9*M9+x*x),L=R0.x-O9/C9,g=R0.y+Q9/C9,Q0=B0.x-x/w,V0=B0.y+M9/w,z0=((Q0-L)*x-(V0-g)*M9)/(Q9*x-O9*M9);A0=L+Q9*z0-K0.x,w0=g+O9*z0-K0.y;let S0=A0*A0+w0*w0;if(S0<=2)return new q0(A0,w0);else r0=Math.sqrt(S0/2)}else{let C9=!1;if(Q9>Number.EPSILON){if(M9>Number.EPSILON)C9=!0}else if(Q9<-Number.EPSILON){if(M9<-Number.EPSILON)C9=!0}else if(Math.sign(O9)===Math.sign(x))C9=!0;if(C9)A0=-O9,w0=Q9,r0=Math.sqrt(a9);else A0=Q9,w0=O9,r0=Math.sqrt(a9/2)}return new q0(A0/r0,w0/r0)}let r=[];for(let K0=0,R0=v.length,B0=R0-1,A0=K0+1;K0<R0;K0++,B0++,A0++){if(B0===R0)B0=0;if(A0===R0)A0=0;r[K0]=i(v[K0],v[B0],v[A0])}let u=[],h,H0=r.concat();for(let K0=0,R0=e;K0<R0;K0++){let B0=y[K0];h=[];for(let A0=0,w0=B0.length,r0=w0-1,Q9=A0+1;A0<w0;A0++,r0++,Q9++){if(r0===w0)r0=0;if(Q9===w0)Q9=0;h[A0]=i(B0[A0],B0[r0],B0[Q9])}u.push(h),H0=H0.concat(h)}let E0;if(V===0)E0=p8.triangulateShape(v,y);else{let K0=[],R0=[];for(let B0=0;B0<V;B0++){let A0=B0/V,w0=N*Math.cos(A0*Math.PI/2),r0=D*Math.sin(A0*Math.PI/2)+M;for(let Q9=0,O9=v.length;Q9<O9;Q9++){let M9=l(v[Q9],r[Q9],r0);if(X0(M9.x,M9.y,-w0),A0===0)K0.push(M9)}for(let Q9=0,O9=e;Q9<O9;Q9++){let M9=y[Q9];h=u[Q9];let x=[];for(let a9=0,_9=M9.length;a9<_9;a9++){let C9=l(M9[a9],h[a9],r0);if(X0(C9.x,C9.y,-w0),A0===0)x.push(C9)}if(A0===0)R0.push(x)}}E0=p8.triangulateShape(K0,R0)}let L0=E0.length,d=D+M;for(let K0=0;K0<U0;K0++){let R0=q?l(A[K0],H0[K0],d):A[K0];if(!C)X0(R0.x,R0.y,0);else _.copy(R.normals[0]).multiplyScalar(R0.x),B.copy(R.binormals[0]).multiplyScalar(R0.y),P.copy(z[0]).add(_).add(B),X0(P.x,P.y,P.z)}for(let K0=1;K0<=X;K0++)for(let R0=0;R0<U0;R0++){let B0=q?l(A[R0],H0[R0],d):A[R0];if(!C)X0(B0.x,B0.y,G/X*K0);else _.copy(R.normals[K0]).multiplyScalar(B0.x),B.copy(R.binormals[K0]).multiplyScalar(B0.y),P.copy(z[K0]).add(_).add(B),X0(P.x,P.y,P.z)}for(let K0=V-1;K0>=0;K0--){let R0=K0/V,B0=N*Math.cos(R0*Math.PI/2),A0=D*Math.sin(R0*Math.PI/2)+M;for(let w0=0,r0=v.length;w0<r0;w0++){let Q9=l(v[w0],r[w0],A0);X0(Q9.x,Q9.y,G+B0)}for(let w0=0,r0=y.length;w0<r0;w0++){let Q9=y[w0];h=u[w0];for(let O9=0,M9=Q9.length;O9<M9;O9++){let x=l(Q9[O9],h[O9],A0);if(!C)X0(x.x,x.y,G+B0);else X0(x.x,x.y+z[X-1].y,z[X-1].x+B0)}}}D0(),s();function D0(){let K0=$.length/3;if(q){let R0=0,B0=U0*R0;for(let A0=0;A0<L0;A0++){let w0=E0[A0];c(w0[2]+B0,w0[1]+B0,w0[0]+B0)}R0=X+V*2,B0=U0*R0;for(let A0=0;A0<L0;A0++){let w0=E0[A0];c(w0[0]+B0,w0[1]+B0,w0[2]+B0)}}else{for(let R0=0;R0<L0;R0++){let B0=E0[R0];c(B0[2],B0[1],B0[0])}for(let R0=0;R0<L0;R0++){let B0=E0[R0];c(B0[0]+U0*X,B0[1]+U0*X,B0[2]+U0*X)}}Z.addGroup(K0,$.length/3-K0,0)}function s(){let K0=$.length/3,R0=0;G0(v,R0),R0+=v.length;for(let B0=0,A0=y.length;B0<A0;B0++){let w0=y[B0];G0(w0,R0),R0+=w0.length}Z.addGroup(K0,$.length/3-K0,1)}function G0(K0,R0){let B0=K0.length;while(--B0>=0){let A0=B0,w0=B0-1;if(w0<0)w0=K0.length-1;for(let r0=0,Q9=X+V*2;r0<Q9;r0++){let O9=U0*r0,M9=U0*(r0+1),x=R0+A0+O9,a9=R0+w0+O9,_9=R0+w0+M9,C9=R0+A0+M9;C0(x,a9,_9,C9)}}}function X0(K0,R0,B0){Y.push(K0),Y.push(R0),Y.push(B0)}function c(K0,R0,B0){t(K0),t(R0),t(B0);let A0=$.length/3,w0=O.generateTopUV(Z,$,A0-3,A0-2,A0-1);u0(w0[0]),u0(w0[1]),u0(w0[2])}function C0(K0,R0,B0,A0){t(K0),t(R0),t(A0),t(R0),t(B0),t(A0);let w0=$.length/3,r0=O.generateSideWallUV(Z,$,w0-6,w0-3,w0-2,w0-1);u0(r0[0]),u0(r0[1]),u0(r0[3]),u0(r0[1]),u0(r0[2]),u0(r0[3])}function t(K0){$.push(Y[K0*3+0]),$.push(Y[K0*3+1]),$.push(Y[K0*3+2])}function u0(K0){K.push(K0.x),K.push(K0.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),Q=this.parameters.shapes,Z=this.parameters.options;return VG(Q,Z,J)}static fromJSON(J,Q){let Z=[];for(let K=0,U=J.shapes.length;K<U;K++){let H=Q[J.shapes[K]];Z.push(H)}let $=J.options.extrudePath;if($!==void 0)J.options.extrudePath=new J$[$.type]().fromJSON($);return new l8(Z,J.options)}}var EG={generateTopUV:function(J,Q,Z,$,K){let U=Q[Z*3],H=Q[Z*3+1],Y=Q[$*3],W=Q[$*3+1],X=Q[K*3],G=Q[K*3+1];return[new q0(U,H),new q0(Y,W),new q0(X,G)]},generateSideWallUV:function(J,Q,Z,$,K,U){let H=Q[Z*3],Y=Q[Z*3+1],W=Q[Z*3+2],X=Q[$*3],G=Q[$*3+1],q=Q[$*3+2],N=Q[K*3],D=Q[K*3+1],M=Q[K*3+2],V=Q[U*3],F=Q[U*3+1],O=Q[U*3+2];if(Math.abs(Y-G)<Math.abs(H-X))return[new q0(H,1-W),new q0(X,1-q),new q0(N,1-M),new q0(V,1-O)];else return[new q0(Y,1-W),new q0(G,1-q),new q0(D,1-M),new q0(F,1-O)]}};function VG(J,Q,Z){if(Z.shapes=[],Array.isArray(J))for(let $=0,K=J.length;$<K;$++){let U=J[$];Z.shapes.push(U.uuid)}else Z.shapes.push(J.uuid);if(Z.options=Object.assign({},Q),Q.extrudePath!==void 0)Z.options.extrudePath=Q.extrudePath.toJSON();return Z}class uQ extends I${constructor(J=1,Q=0){let Z=(1+Math.sqrt(5))/2,$=[-1,Z,0,1,Z,0,-1,-Z,0,1,-Z,0,0,-1,Z,0,1,Z,0,-1,-Z,0,1,-Z,Z,0,-1,Z,0,1,-Z,0,-1,-Z,0,1],K=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super($,K,J,Q);this.type="IcosahedronGeometry",this.parameters={radius:J,detail:Q}}static fromJSON(J){return new uQ(J.radius,J.detail)}}class F9 extends q9{constructor(J=1,Q=1,Z=1,$=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:Z,heightSegments:$};let K=J/2,U=Q/2,H=Math.floor(Z),Y=Math.floor($),W=H+1,X=Y+1,G=J/H,q=Q/Y,N=[],D=[],M=[],V=[];for(let F=0;F<X;F++){let O=F*q-U;for(let z=0;z<W;z++){let C=z*G-K;D.push(C,-O,0),M.push(0,0,1),V.push(z/H),V.push(1-F/Y)}}for(let F=0;F<Y;F++)for(let O=0;O<H;O++){let z=O+W*F,C=O+W*(F+1),R=O+1+W*(F+1),B=O+1+W*F;N.push(z,C,B),N.push(C,R,B)}this.setIndex(N),this.setAttribute("position",new J9(D,3)),this.setAttribute("normal",new J9(M,3)),this.setAttribute("uv",new J9(V,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new F9(J.width,J.height,J.widthSegments,J.heightSegments)}}class aJ extends q9{constructor(J=0.5,Q=1,Z=32,$=1,K=0,U=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:Q,thetaSegments:Z,phiSegments:$,thetaStart:K,thetaLength:U},Z=Math.max(3,Z),$=Math.max(1,$);let H=[],Y=[],W=[],X=[],G=J,q=(Q-J)/$,N=new k,D=new q0;for(let M=0;M<=$;M++){for(let V=0;V<=Z;V++){let F=K+V/Z*U;N.x=G*Math.cos(F),N.y=G*Math.sin(F),Y.push(N.x,N.y,N.z),W.push(0,0,1),D.x=(N.x/Q+1)/2,D.y=(N.y/Q+1)/2,X.push(D.x,D.y)}G+=q}for(let M=0;M<$;M++){let V=M*(Z+1);for(let F=0;F<Z;F++){let O=F+V,z=O,C=O+Z+1,R=O+Z+2,B=O+1;H.push(z,C,B),H.push(C,R,B)}}this.setIndex(H),this.setAttribute("position",new J9(Y,3)),this.setAttribute("normal",new J9(W,3)),this.setAttribute("uv",new J9(X,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new aJ(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class mQ extends q9{constructor(J=new F8([new q0(0,0.5),new q0(-0.5,-0.5),new q0(0.5,-0.5)]),Q=12){super();this.type="ShapeGeometry",this.parameters={shapes:J,curveSegments:Q};let Z=[],$=[],K=[],U=[],H=0,Y=0;if(Array.isArray(J)===!1)W(J);else for(let X=0;X<J.length;X++)W(J[X]),this.addGroup(H,Y,X),H+=Y,Y=0;this.setIndex(Z),this.setAttribute("position",new J9($,3)),this.setAttribute("normal",new J9(K,3)),this.setAttribute("uv",new J9(U,2));function W(X){let G=$.length/3,q=X.extractPoints(Q),N=q.shape,D=q.holes;if(p8.isClockWise(N)===!1)N=N.reverse();for(let V=0,F=D.length;V<F;V++){let O=D[V];if(p8.isClockWise(O)===!0)D[V]=O.reverse()}let M=p8.triangulateShape(N,D);for(let V=0,F=D.length;V<F;V++){let O=D[V];N=N.concat(O)}for(let V=0,F=N.length;V<F;V++){let O=N[V];$.push(O.x,O.y,0),K.push(0,0,1),U.push(O.x,O.y)}for(let V=0,F=M.length;V<F;V++){let O=M[V],z=O[0]+G,C=O[1]+G,R=O[2]+G;Z.push(z,C,R),Y+=3}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),Q=this.parameters.shapes;return IG(Q,J)}static fromJSON(J,Q){let Z=[];for(let $=0,K=J.shapes.length;$<K;$++){let U=Q[J.shapes[$]];Z.push(U)}return new mQ(Z,J.curveSegments)}}function IG(J,Q){if(Q.shapes=[],Array.isArray(J))for(let Z=0,$=J.length;Z<$;Z++){let K=J[Z];Q.shapes.push(K.uuid)}else Q.shapes.push(J.uuid);return Q}class c0 extends q9{constructor(J=1,Q=32,Z=16,$=0,K=Math.PI*2,U=0,H=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:Q,heightSegments:Z,phiStart:$,phiLength:K,thetaStart:U,thetaLength:H},Q=Math.max(3,Math.floor(Q)),Z=Math.max(2,Math.floor(Z));let Y=Math.min(U+H,Math.PI),W=0,X=[],G=new k,q=new k,N=[],D=[],M=[],V=[];for(let F=0;F<=Z;F++){let O=[],z=F/Z,C=U+z*H,R=J*Math.cos(C),B=Math.sqrt(J*J-R*R),_=0;if(F===0&&U===0)_=0.5/Q;else if(F===Z&&Y===Math.PI)_=-0.5/Q;for(let P=0;P<=Q;P++){let E=P/Q,A=$+E*K;G.x=-B*Math.cos(A),G.y=R,G.z=B*Math.sin(A),D.push(G.x,G.y,G.z),q.copy(G).normalize(),M.push(q.x,q.y,q.z),V.push(E+_,1-z),O.push(W++)}X.push(O)}for(let F=0;F<Z;F++)for(let O=0;O<Q;O++){let z=X[F][O+1],C=X[F][O],R=X[F+1][O],B=X[F+1][O+1];if(F!==0||U>0)N.push(z,C,B);if(F!==Z-1||Y<Math.PI)N.push(C,R,B)}this.setIndex(N),this.setAttribute("position",new J9(D,3)),this.setAttribute("normal",new J9(M,3)),this.setAttribute("uv",new J9(V,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new c0(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class R7 extends q9{constructor(J=1,Q=0.4,Z=12,$=48,K=Math.PI*2,U=0,H=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:Q,radialSegments:Z,tubularSegments:$,arc:K,thetaStart:U,thetaLength:H},Z=Math.floor(Z),$=Math.floor($);let Y=[],W=[],X=[],G=[],q=new k,N=new k,D=new k;for(let M=0;M<=Z;M++){let V=U+M/Z*H;for(let F=0;F<=$;F++){let O=F/$*K;N.x=(J+Q*Math.cos(V))*Math.cos(O),N.y=(J+Q*Math.cos(V))*Math.sin(O),N.z=Q*Math.sin(V),W.push(N.x,N.y,N.z),q.x=J*Math.cos(O),q.y=J*Math.sin(O),D.subVectors(N,q).normalize(),X.push(D.x,D.y,D.z),G.push(F/$),G.push(M/Z)}}for(let M=1;M<=Z;M++)for(let V=1;V<=$;V++){let F=($+1)*M+V-1,O=($+1)*(M-1)+V-1,z=($+1)*(M-1)+V,C=($+1)*M+V;Y.push(F,O,C),Y.push(O,z,C)}this.setIndex(Y),this.setAttribute("position",new J9(W,3)),this.setAttribute("normal",new J9(X,3)),this.setAttribute("uv",new J9(G,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new R7(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc,J.thetaStart,J.thetaLength)}}class L8 extends q9{constructor(J=new z$(new k(-1,-1,0),new k(-1,1,0),new k(1,1,0)),Q=64,Z=1,$=8,K=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:Q,radius:Z,radialSegments:$,closed:K};let U=J.computeFrenetFrames(Q,K);this.tangents=U.tangents,this.normals=U.normals,this.binormals=U.binormals;let H=new k,Y=new k,W=new q0,X=new k,G=[],q=[],N=[],D=[];M(),this.setIndex(D),this.setAttribute("position",new J9(G,3)),this.setAttribute("normal",new J9(q,3)),this.setAttribute("uv",new J9(N,2));function M(){for(let z=0;z<Q;z++)V(z);V(K===!1?Q:0),O(),F()}function V(z){X=J.getPointAt(z/Q,X);let C=U.normals[z],R=U.binormals[z];for(let B=0;B<=$;B++){let _=B/$*Math.PI*2,P=Math.sin(_),E=-Math.cos(_);Y.x=E*C.x+P*R.x,Y.y=E*C.y+P*R.y,Y.z=E*C.z+P*R.z,Y.normalize(),q.push(Y.x,Y.y,Y.z),H.x=X.x+Z*Y.x,H.y=X.y+Z*Y.y,H.z=X.z+Z*Y.z,G.push(H.x,H.y,H.z)}}function F(){for(let z=1;z<=Q;z++)for(let C=1;C<=$;C++){let R=($+1)*(z-1)+(C-1),B=($+1)*z+(C-1),_=($+1)*z+C,P=($+1)*(z-1)+C;D.push(R,B,P),D.push(B,_,P)}}function O(){for(let z=0;z<=Q;z++)for(let C=0;C<=$;C++)W.x=z/Q,W.y=C/$,N.push(W.x,W.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new L8(new J$[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class dQ extends q9{constructor(J=null){super();if(this.type="WireframeGeometry",this.parameters={geometry:J},J!==null){let Q=[],Z=new Set,$=new k,K=new k;if(J.index!==null){let U=J.attributes.position,H=J.index,Y=J.groups;if(Y.length===0)Y=[{start:0,count:H.count,materialIndex:0}];for(let W=0,X=Y.length;W<X;++W){let G=Y[W],q=G.start,N=G.count;for(let D=q,M=q+N;D<M;D+=3)for(let V=0;V<3;V++){let F=H.getX(D+V),O=H.getX(D+(V+1)%3);if($.fromBufferAttribute(U,F),K.fromBufferAttribute(U,O),PY($,K,Z)===!0)Q.push($.x,$.y,$.z),Q.push(K.x,K.y,K.z)}}}else{let U=J.attributes.position;for(let H=0,Y=U.count/3;H<Y;H++)for(let W=0;W<3;W++){let X=3*H+W,G=3*H+(W+1)%3;if($.fromBufferAttribute(U,X),K.fromBufferAttribute(U,G),PY($,K,Z)===!0)Q.push($.x,$.y,$.z),Q.push(K.x,K.y,K.z)}}this.setAttribute("position",new J9(Q,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}function PY(J,Q,Z){let $=`${J.x},${J.y},${J.z}-${Q.x},${Q.y},${Q.z}`,K=`${Q.x},${Q.y},${Q.z}-${J.x},${J.y},${J.z}`;if(Z.has($)===!0||Z.has(K)===!0)return!1;else return Z.add($),Z.add(K),!0}function rJ(J){let Q={};for(let Z in J){Q[Z]={};for(let $ in J[Z]){let K=J[Z][$];if(CY(K))if(K.isRenderTargetTexture)H9("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[Z][$]=null;else Q[Z][$]=K.clone();else if(Array.isArray(K))if(CY(K[0])){let U=[];for(let H=0,Y=K.length;H<Y;H++)U[H]=K[H].clone();Q[Z][$]=U}else Q[Z][$]=K.slice();else Q[Z][$]=K}}return Q}function h7(J){let Q={};for(let Z=0;Z<J.length;Z++){let $=rJ(J[Z]);for(let K in $)Q[K]=$[K]}return Q}function CY(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function BG(J){let Q=[];for(let Z=0;Z<J.length;Z++)Q.push(J[Z].clone());return Q}function SU(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return A9.workingColorSpace}var T8={clone:rJ,merge:h7},_G=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,AG=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class v9 extends D8{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_G,this.fragmentShader=AG,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=rJ(J.uniforms),this.uniformsGroups=BG(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let $ in this.uniforms){let U=this.uniforms[$].value;if(U&&U.isTexture)Q.uniforms[$]={type:"t",value:U.toJSON(J).uuid};else if(U&&U.isColor)Q.uniforms[$]={type:"c",value:U.getHex()};else if(U&&U.isVector2)Q.uniforms[$]={type:"v2",value:U.toArray()};else if(U&&U.isVector3)Q.uniforms[$]={type:"v3",value:U.toArray()};else if(U&&U.isVector4)Q.uniforms[$]={type:"v4",value:U.toArray()};else if(U&&U.isMatrix3)Q.uniforms[$]={type:"m3",value:U.toArray()};else if(U&&U.isMatrix4)Q.uniforms[$]={type:"m4",value:U.toArray()};else Q.uniforms[$]={value:U}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let Z={};for(let $ in this.extensions)if(this.extensions[$]===!0)Z[$]=!0;if(Object.keys(Z).length>0)Q.extensions=Z;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let Z in J.uniforms){let $=J.uniforms[Z];switch(this.uniforms[Z]={},$.type){case"t":this.uniforms[Z].value=Q[$.value]||null;break;case"c":this.uniforms[Z].value=new Y0().setHex($.value);break;case"v2":this.uniforms[Z].value=new q0().fromArray($.value);break;case"v3":this.uniforms[Z].value=new k().fromArray($.value);break;case"v4":this.uniforms[Z].value=new X7().fromArray($.value);break;case"m3":this.uniforms[Z].value=new D9().fromArray($.value);break;case"m4":this.uniforms[Z].value=new x9().fromArray($.value);break;default:this.uniforms[Z].value=$.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let Z in J.extensions)this.extensions[Z]=J.extensions[Z];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class lQ extends v9{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class K9 extends D8{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Y0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new u8,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class WJ extends K9{constructor(J){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new q0(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return z9(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(Q){this.ior=(1+0.4*Q)/(1-0.4*Q)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Y0(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Y0(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Y0(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(J)}get anisotropy(){return this._anisotropy}set anisotropy(J){if(this._anisotropy>0!==J>0)this.version++;this._anisotropy=J}get clearcoat(){return this._clearcoat}set clearcoat(J){if(this._clearcoat>0!==J>0)this.version++;this._clearcoat=J}get iridescence(){return this._iridescence}set iridescence(J){if(this._iridescence>0!==J>0)this.version++;this._iridescence=J}get dispersion(){return this._dispersion}set dispersion(J){if(this._dispersion>0!==J>0)this.version++;this._dispersion=J}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(J){if(this._retroreflectivity>0!==J>0)this.version++;this._retroreflectivity=J}get sheen(){return this._sheen}set sheen(J){if(this._sheen>0!==J>0)this.version++;this._sheen=J}get transmission(){return this._transmission}set transmission(J){if(this._transmission>0!==J>0)this.version++;this._transmission=J}copy(J){return super.copy(J),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=J.anisotropy,this.anisotropyRotation=J.anisotropyRotation,this.anisotropyMap=J.anisotropyMap,this.clearcoat=J.clearcoat,this.clearcoatMap=J.clearcoatMap,this.clearcoatRoughness=J.clearcoatRoughness,this.clearcoatRoughnessMap=J.clearcoatRoughnessMap,this.clearcoatNormalMap=J.clearcoatNormalMap,this.clearcoatNormalScale.copy(J.clearcoatNormalScale),this.dispersion=J.dispersion,this.ior=J.ior,this.iridescence=J.iridescence,this.iridescenceMap=J.iridescenceMap,this.iridescenceIOR=J.iridescenceIOR,this.iridescenceThicknessRange=[...J.iridescenceThicknessRange],this.iridescenceThicknessMap=J.iridescenceThicknessMap,this.retroreflectivity=J.retroreflectivity,this.sheen=J.sheen,this.sheenColor.copy(J.sheenColor),this.sheenColorMap=J.sheenColorMap,this.sheenRoughness=J.sheenRoughness,this.sheenRoughnessMap=J.sheenRoughnessMap,this.transmission=J.transmission,this.transmissionMap=J.transmissionMap,this.thickness=J.thickness,this.thicknessMap=J.thicknessMap,this.attenuationDistance=J.attenuationDistance,this.attenuationColor.copy(J.attenuationColor),this.specularIntensity=J.specularIntensity,this.specularIntensityMap=J.specularIntensityMap,this.specularColor.copy(J.specularColor),this.specularColorMap=J.specularColorMap,this}}class kJ extends D8{constructor(J){super();this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Y0(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.gradientMap=J.gradientMap,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.alphaMap=J.alphaMap,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}class cQ extends D8{constructor(J){super();this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Y0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new q0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new u8,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.envMapIntensity=J.envMapIntensity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class nQ extends D8{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class kU extends D8{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}class C$ extends C8{constructor(J){super();this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(J)}copy(J){return super.copy(J),this.scale=J.scale,this.dashSize=J.dashSize,this.gapSize=J.gapSize,this}}function y6(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}function AK(J){return J!==void 0&&J.inTangents!==void 0&&J.outTangents!==void 0}class tJ{constructor(J,Q,Z,$){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=$!==void 0?$:new Q.constructor(Z),this.sampleValues=Q,this.valueSize=Z,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,Z=this._cachedIndex,$=Q[Z],K=Q[Z-1];Z:{J:{let U;Q:{$:if(!(J<$)){for(let H=Z+2;;){if($===void 0){if(J<K)break $;return Z=Q.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}if(Z===H)break;if(K=$,$=Q[++Z],J<$)break J}U=Q.length;break Q}if(!(J>=K)){let H=Q[1];if(J<H)Z=2,K=H;for(let Y=Z-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===Y)break;if($=K,K=Q[--Z-1],J>=K)break J}U=Z,Z=0;break Q}break Z}while(Z<U){let H=Z+U>>>1;if(J<Q[H])U=H;else Z=H+1}if($=Q[Z],K=Q[Z-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===void 0)return Z=Q.length,this._cachedIndex=Z,this.copySampleValue_(Z-1)}this._cachedIndex=Z,this.intervalChanged_(Z,K,$)}return this.interpolate_(Z,K,J,$)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,Z=this.sampleValues,$=this.valueSize,K=J*$;for(let U=0;U!==$;++U)Q[U]=Z[K+U];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class jU extends tJ{constructor(J,Q,Z,$){super(J,Q,Z,$);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,Z){let $=this.parameterPositions,K=J-2,U=J+1,H=$[K],Y=$[U];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,H=2*Q-Z;break;case 2402:K=$.length-2,H=Q+$[K]-$[K+1];break;default:K=J,H=Z}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:U=J,Y=2*Z-Q;break;case 2402:U=1,Y=Z+$[1]-$[0];break;default:U=J-1,Y=Q}let W=(Z-Q)*0.5,X=this.valueSize;this._weightPrev=W/(Q-H),this._weightNext=W/(Y-Z),this._offsetPrev=K*X,this._offsetNext=U*X}interpolate_(J,Q,Z,$){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,Y=J*H,W=Y-H,X=this._offsetPrev,G=this._offsetNext,q=this._weightPrev,N=this._weightNext,D=(Z-Q)/($-Q),M=D*D,V=M*D,F=-q*V+2*q*M-q*D,O=(1+q)*V+(-1.5-2*q)*M+(-0.5+q)*D+1,z=(-1-N)*V+(1.5+N)*M+0.5*D,C=N*V-N*M;for(let R=0;R!==H;++R)K[R]=F*U[X+R]+O*U[W+R]+z*U[Y+R]+C*U[G+R];return K}}class vU extends tJ{constructor(J,Q,Z,$){super(J,Q,Z,$)}interpolate_(J,Q,Z,$){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,Y=J*H,W=Y-H,X=(Z-Q)/($-Q),G=1-X;for(let q=0;q!==H;++q)K[q]=U[W+q]*G+U[Y+q]*X;return K}}class yU extends tJ{constructor(J,Q,Z,$){super(J,Q,Z,$)}interpolate_(J){return this.copySampleValue_(J-1)}}class fU extends tJ{interpolate_(J,Q,Z,$){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,Y=J*H,W=Y-H,X=this.inTangents,G=this.outTangents;if(!X||!G){let D=(Z-Q)/($-Q),M=1-D;for(let V=0;V!==H;++V)K[V]=U[W+V]*M+U[Y+V]*D;return K}let q=H*2,N=J-1;for(let D=0;D!==H;++D){let M=U[W+D],V=U[Y+D],F=N*q+D*2,O=G[F],z=G[F+1],C=J*q+D*2,R=X[C],B=X[C+1],_=PG(Z,Q,O,R,$);K[D]=hW(_,M,z,B,V)}return K}}function hW(J,Q,Z,$,K){let U=1-J;return U*U*U*Q+3*U*U*J*Z+3*U*J*J*$+J*J*J*K}function zG(J,Q,Z,$,K){let U=1-J;return 3*U*U*(Z-Q)+6*U*J*($-Z)+3*J*J*(K-$)}function PG(J,Q,Z,$,K){let U=(J-Q)/(K-Q);for(let H=0;H<8;H++){let Y=hW(U,Q,Z,$,K)-J;if(Math.abs(Y)<0.0000000001)break;let W=zG(U,Q,Z,$,K);if(Math.abs(W)<0.0000000001)break;U=Math.max(0,Math.min(1,U-Y/W))}return U}class O8{constructor(J,Q,Z,$){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=y6(Q,this.TimeBufferType),this.values=y6(Z,this.ValueBufferType),this.setInterpolation($||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,Z;if(Q.toJSON!==this.toJSON)Z=Q.toJSON(J);else{Z={name:J.name,times:y6(J.times,Array),values:y6(J.values,Array)};let $=J.getInterpolation();if($!==J.DefaultInterpolation)Z.interpolation=$;if(AK(J.settings))Z.settings={inTangents:y6(J.settings.inTangents,Array),outTangents:y6(J.settings.outTangents,Array)}}return Z.type=J.ValueTypeName,Z}InterpolantFactoryMethodDiscrete(J){return new yU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new vU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new jU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new fU(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let Z="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Z);return H9("KeyframeTrack:",Z),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let Z=0,$=Q.length;Z!==$;++Z)Q[Z]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let Z=0,$=Q.length;Z!==$;++Z)Q[Z]*=J;if(AK(this.settings))LY(this.settings.inTangents,J),LY(this.settings.outTangents,J)}return this}trim(J,Q){let Z=this.times,$=Z.length,K=0,U=$-1;while(K!==$&&Z[K]<J)++K;while(U!==-1&&Z[U]>Q)--U;if(++U,K!==0||U!==$){if(K>=U)U=Math.max(U,1),K=U-1;let H=this.getValueSize();this.times=Z.slice(K,U),this.values=this.values.slice(K*H,U*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)X9("KeyframeTrack: Invalid value size in track.",this),J=!1;let Z=this.times,$=this.values,K=Z.length;if(K===0)X9("KeyframeTrack: Track is empty.",this),J=!1;let U=null;for(let H=0;H!==K;H++){let Y=Z[H];if(typeof Y==="number"&&isNaN(Y)){X9("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(U!==null&&U>Y){X9("KeyframeTrack: Out of order keys.",this,H,Y,U),J=!1;break}U=Y}if($!==void 0){if(LX($))for(let H=0,Y=$.length;H!==Y;++H){let W=$[H];if(isNaN(W)){X9("KeyframeTrack: Value is not a valid number.",this,H,W),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),Z=this.getValueSize(),$=this.getInterpolation()===2302,K=J.length-1,U=1;for(let H=1;H<K;++H){let Y=!1,W=J[H],X=J[H+1];if(W!==X&&(H!==1||W!==J[0]))if(!$){let G=H*Z,q=G-Z,N=G+Z;for(let D=0;D!==Z;++D){let M=Q[G+D];if(M!==Q[q+D]||M!==Q[N+D]){Y=!0;break}}}else Y=!0;if(Y){if(H!==U){J[U]=J[H];let G=H*Z,q=U*Z;for(let N=0;N!==Z;++N)Q[q+N]=Q[G+N]}++U}}if(K>0){J[U]=J[K];for(let H=K*Z,Y=U*Z,W=0;W!==Z;++W)Q[Y+W]=Q[H+W];++U}if(U!==J.length)this.times=J.slice(0,U),this.values=Q.slice(0,U*Z);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),$=new this.constructor(this.name,J,Q);if($.createInterpolant=this.createInterpolant,AK(this.settings))$.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return $}}function LY(J,Q){for(let Z=0,$=J.length;Z!==$;Z+=2)J[Z]*=Q}O8.prototype.ValueTypeName="";O8.prototype.TimeBufferType=Float32Array;O8.prototype.ValueBufferType=Float32Array;O8.prototype.DefaultInterpolation=2301;class eJ extends O8{constructor(J,Q,Z){super(J,Q,Z)}}eJ.prototype.ValueTypeName="bool";eJ.prototype.ValueBufferType=Array;eJ.prototype.DefaultInterpolation=2300;eJ.prototype.InterpolantFactoryMethodLinear=void 0;eJ.prototype.InterpolantFactoryMethodSmooth=void 0;class bU extends O8{constructor(J,Q,Z,$){super(J,Q,Z,$)}}bU.prototype.ValueTypeName="color";class xU extends O8{constructor(J,Q,Z,$){super(J,Q,Z,$)}}xU.prototype.ValueTypeName="number";class hU extends tJ{constructor(J,Q,Z,$){super(J,Q,Z,$)}interpolate_(J,Q,Z,$){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,Y=(Z-Q)/($-Q),W=J*H;for(let X=W+H;W!==X;W+=4)A8.slerpFlat(K,0,U,W-H,U,W,Y);return K}}class L$ extends O8{constructor(J,Q,Z,$){super(J,Q,Z,$)}InterpolantFactoryMethodLinear(J){return new hU(this.times,this.values,this.getValueSize(),J)}}L$.prototype.ValueTypeName="quaternion";L$.prototype.InterpolantFactoryMethodSmooth=void 0;class J6 extends O8{constructor(J,Q,Z){super(J,Q,Z)}}J6.prototype.ValueTypeName="string";J6.prototype.ValueBufferType=Array;J6.prototype.DefaultInterpolation=2300;J6.prototype.InterpolantFactoryMethodLinear=void 0;J6.prototype.InterpolantFactoryMethodSmooth=void 0;class gU extends O8{constructor(J,Q,Z,$){super(J,Q,Z,$)}}gU.prototype.ValueTypeName="vector";class pU{constructor(J,Q,Z){let $=this,K=!1,U=0,H=0,Y=void 0,W=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=Z,this._abortController=null,this.itemStart=function(X){if(H++,K===!1){if($.onStart!==void 0)$.onStart(X,U,H)}K=!0},this.itemEnd=function(X){if(U++,$.onProgress!==void 0)$.onProgress(X,U,H);if(U===H){if(K=!1,$.onLoad!==void 0)$.onLoad()}},this.itemError=function(X){if($.onError!==void 0)$.onError(X)},this.resolveURL=function(X){if(X=X.normalize("NFC"),Y)return Y(X);return X},this.setURLModifier=function(X){return Y=X,this},this.addHandler=function(X,G){return W.push(X,G),this},this.removeHandler=function(X){let G=W.indexOf(X);if(G!==-1)W.splice(G,2);return this},this.getHandler=function(X){for(let G=0,q=W.length;G<q;G+=2){let N=W[G],D=W[G+1];if(N.global)N.lastIndex=0;if(N.test(X))return D}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var gW=new pU;class uU{constructor(J){if(this.manager=J!==void 0?J:gW,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let Z=this;return new Promise(function($,K){Z.load(J,$,Q,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}uU.DEFAULT_MATERIAL_NAME="__DEFAULT";class Q6 extends k9{constructor(J,Q=1){super();this.isLight=!0,this.type="Light",this.color=new Y0(J),this.intensity=Q}copy(J,Q){return super.copy(J,Q),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let Q=super.toJSON(J);return Q.object.color=this.color.getHex(),Q.object.intensity=this.intensity,Q}}class M8 extends Q6{constructor(J,Q,Z){super(J,Z);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(k9.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y0(Q)}copy(J,Q){return super.copy(J,Q),this.groundColor.copy(J.groundColor),this}toJSON(J){let Q=super.toJSON(J);return Q.object.groundColor=this.groundColor.getHex(),Q}}var zK=new x9,TY=new k,wY=new k;class sQ{constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new q0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new x9,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gQ,this._frameExtents=new q0(1,1),this._viewportCount=1,this._viewports=[new X7(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(J){let Q=this.camera;TY.setFromMatrixPosition(J.matrixWorld),Q.position.copy(TY),wY.setFromMatrixPosition(J.target.matrixWorld),Q.lookAt(wY),Q.updateMatrixWorld(),this._updateMatrix(Q,this.matrix,this._frustum)}_updateMatrix(J,Q,Z,$){zK.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),Z.setFromProjectionMatrix(zK,J.coordinateSystem,J.reversedDepth);let K=this._frameExtents,U=$?$.z/K.x:1,H=$?$.w/K.y:1,Y=$?$.x/K.x:0,W=$?$.y/K.y:0;if(J.coordinateSystem===2001||J.reversedDepth)Q.set(0.5*U,0,0,0.5*U+Y,0,0.5*H,0,0.5*H+W,0,0,1,0,0,0,0,1);else Q.set(0.5*U,0,0,0.5*U+Y,0,0.5*H,0,0.5*H+W,0,0,0.5,0.5,0,0,0,1);Q.multiply(zK)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};return J.intensity=this.intensity,J.bias=this.bias,J.normalBias=this.normalBias,J.radius=this.radius,J.blurSamples=this.blurSamples,J.mapSize=this.mapSize.toArray(),J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var iZ=new k,oZ=new A8,x8=new k;class T$ extends k9{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new x9,this.projectionMatrix=new x9,this.projectionMatrixInverse=new x9,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(iZ,oZ,x8),x8.x===1&&x8.y===1&&x8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(iZ,oZ,x8.set(1,1,1)).invert()}updateWorldMatrix(J,Q,Z=!1){if(super.updateWorldMatrix(J,Q,Z),this.matrixWorld.decompose(iZ,oZ,x8),x8.x===1&&x8.y===1&&x8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(iZ,oZ,x8.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var CJ=new k,SY=new q0,kY=new q0;class Q7 extends T${constructor(J=50,Q=1,Z=0.1,$=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Z,this.far=$,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=IQ*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(aZ*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return IQ*2*Math.atan(Math.tan(aZ*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,Z){CJ.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(CJ.x,CJ.y).multiplyScalar(-J/CJ.z),CJ.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),Z.set(CJ.x,CJ.y).multiplyScalar(-J/CJ.z)}getViewSize(J,Q){return this.getViewBounds(J,SY,kY),Q.subVectors(kY,SY)}setViewOffset(J,Q,Z,$,K,U){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=Z,this.view.offsetY=$,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(aZ*0.5*this.fov)/this.zoom,Z=2*Q,$=this.aspect*Z,K=-0.5*$,U=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:W}=U;K+=U.offsetX*$/Y,Q-=U.offsetY*Z/W,$*=U.width/Y,Z*=U.height/W}let H=this.filmOffset;if(H!==0)K+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+$,Q,Q-Z,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class pW extends sQ{constructor(){super(new Q7(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(J){let Q=this.camera,Z=IQ*2*J.angle*this.focus,$=this.mapSize.width/this.mapSize.height*this.aspect,K=J.distance||Q.far;if(Z!==Q.fov||$!==Q.aspect||K!==Q.far)Q.fov=Z,Q.aspect=$,Q.far=K,Q.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this.aspect=J.aspect,this}toJSON(){let J=super.toJSON();return J.focus=this.focus,J.aspect=this.aspect,J}}class i6 extends Q6{constructor(J,Q,Z=0,$=Math.PI/3,K=0,U=2){super(J,Q);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(k9.DEFAULT_UP),this.updateMatrix(),this.target=new k9,this.distance=Z,this.angle=$,this.penumbra=K,this.decay=U,this.map=null,this.shadow=new pW}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.map=J.map,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);if(Q.object.distance=this.distance,Q.object.angle=this.angle,Q.object.decay=this.decay,Q.object.penumbra=this.penumbra,Q.object.target=this.target.uuid,this.map&&this.map.isTexture)Q.object.map=this.map.toJSON(J).uuid;return Q.object.shadow=this.shadow.toJSON(),Q}}class uW extends sQ{constructor(){super(new Q7(90,1,0.5,500));this.isPointLightShadow=!0}}class Y8 extends Q6{constructor(J,Q,Z=0,$=2){super(J,Q);this.isPointLight=!0,this.type="PointLight",this.distance=Z,this.decay=$,this.shadow=new uW}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(J,Q){return super.copy(J,Q),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.distance=this.distance,Q.object.decay=this.decay,Q.object.shadow=this.shadow.toJSON(),Q}}class Z6 extends T${constructor(J=-1,Q=1,Z=1,$=-1,K=0.1,U=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=Z,this.bottom=$,this.near=K,this.far=U,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,Z,$,K,U){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=Z,this.view.offsetY=$,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),Z=(this.right+this.left)/2,$=(this.top+this.bottom)/2,K=Z-J,U=Z+J,H=$+Q,Y=$-Q;if(this.view!==null&&this.view.enabled){let W=(this.right-this.left)/this.view.fullWidth/this.zoom,X=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=W*this.view.offsetX,U=K+W*this.view.width,H-=X*this.view.offsetY,Y=H-X*this.view.height}this.projectionMatrix.makeOrthographic(K,U,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class mW extends sQ{constructor(){super(new Z6(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class d7 extends Q6{constructor(J,Q){super(J,Q);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(k9.DEFAULT_UP),this.updateMatrix(),this.target=new k9,this.shadow=new mW}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let Q=super.toJSON(J);return Q.object.shadow=this.shadow.toJSON(),Q.object.target=this.target.uuid,Q}}class w$ extends Q6{constructor(J,Q){super(J,Q);this.isAmbientLight=!0,this.type="AmbientLight"}}var f6=-90,b6=1;class mU extends k9{constructor(J,Q,Z){super();this.type="CubeCamera",this.renderTarget=Z,this.coordinateSystem=null,this.activeMipmapLevel=0;let $=new Q7(f6,b6,J,Q);$.layers=this.layers,this.add($);let K=new Q7(f6,b6,J,Q);K.layers=this.layers,this.add(K);let U=new Q7(f6,b6,J,Q);U.layers=this.layers,this.add(U);let H=new Q7(f6,b6,J,Q);H.layers=this.layers,this.add(H);let Y=new Q7(f6,b6,J,Q);Y.layers=this.layers,this.add(Y);let W=new Q7(f6,b6,J,Q);W.layers=this.layers,this.add(W)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[Z,$,K,U,H,Y]=Q;for(let W of Q)this.remove(W);if(J===2000)Z.up.set(0,1,0),Z.lookAt(1,0,0),$.up.set(0,1,0),$.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),U.up.set(0,0,1),U.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)Z.up.set(0,-1,0),Z.lookAt(-1,0,0),$.up.set(0,-1,0),$.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),U.up.set(0,0,-1),U.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let W of Q)this.add(W),W.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Z,activeMipmapLevel:$}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,U,H,Y,W,X]=this.children,G=J.getRenderTarget(),q=J.getActiveCubeFace(),N=J.getActiveMipmapLevel(),D=J.xr.enabled;J.xr.enabled=!1;let M=Z.texture.generateMipmaps;Z.texture.generateMipmaps=!1;let V=!1;if(J.isWebGLRenderer===!0)V=J.state.buffers.depth.getReversed();else V=J.reversedDepthBuffer;if(J.setRenderTarget(Z,0,$),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget(Z,1,$),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,U),J.setRenderTarget(Z,2,$),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget(Z,3,$),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget(Z,4,$),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),Z.texture.generateMipmaps=M,J.setRenderTarget(Z,5,$),V&&J.autoClear===!1)J.clearDepth();J.render(Q,X),J.setRenderTarget(G,q,N),J.xr.enabled=D,Z.texture.needsPMREMUpdate=!0}}class dU extends Q7{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}class S${constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(J){if(this._document=J,J.hidden!==void 0)this._pageVisibilityHandler=CG.bind(this),J.addEventListener("visibilitychange",this._pageVisibilityHandler,!1)}disconnect(){if(this._pageVisibilityHandler!==null)this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null;this._document=null}getDelta(){return this._delta/1000}getElapsed(){return this._elapsed/1000}getTimescale(){return this._timescale}setTimescale(J){return this._timescale=J,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(J){if(this._pageVisibilityHandler!==null&&this._document.hidden===!0)this._delta=0;else this._previousTime=this._currentTime,this._currentTime=(J!==void 0?J:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta;return this}}function CG(){if(this._document.hidden===!1)this.reset()}var lU="\\[\\]\\.:\\/",LG=new RegExp("["+lU+"]","g"),cU="[^"+lU+"]",TG="[^"+lU.replace("\\.","")+"]",wG=/((?:WC+[\/:])*)/.source.replace("WC",cU),SG=/(WCOD+)?/.source.replace("WCOD",TG),kG=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cU),jG=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cU),vG=new RegExp("^"+wG+SG+kG+jG+"$"),yG=["material","materials","bones","map"];class dW{constructor(J,Q,Z){let $=Z||i9.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,$)}getValue(J,Q){this.bind();let Z=this._targetGroup.nCachedObjects_,$=this._bindings[Z];if($!==void 0)$.getValue(J,Q)}setValue(J,Q){let Z=this._bindings;for(let $=this._targetGroup.nCachedObjects_,K=Z.length;$!==K;++$)Z[$].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,Z=J.length;Q!==Z;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,Z=J.length;Q!==Z;++Q)J[Q].unbind()}}class i9{constructor(J,Q,Z){this.path=Q,this.parsedPath=Z||i9.parseTrackName(Q),this.node=i9.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,Z){if(!(J&&J.isAnimationObjectGroup))return new i9(J,Q,Z);else return new i9.Composite(J,Q,Z)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(LG,"")}static parseTrackName(J){let Q=vG.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let Z={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},$=Z.nodeName&&Z.nodeName.lastIndexOf(".");if($!==void 0&&$!==-1){let K=Z.nodeName.substring($+1);if(yG.indexOf(K)!==-1)Z.nodeName=Z.nodeName.substring(0,$),Z.objectName=K}if(Z.propertyName===null||Z.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return Z}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let Z=J.skeleton.getBoneByName(Q);if(Z!==void 0)return Z}if(J.children){let Z=function(K){for(let U=0;U<K.length;U++){let H=K[U];if(H.name===Q||H.uuid===Q)return H;let Y=Z(H.children);if(Y)return Y}return null},$=Z(J.children);if($)return $}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let Z=this.resolvedProperty;for(let $=0,K=Z.length;$!==K;++$)J[Q++]=Z[$]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let Z=this.resolvedProperty;for(let $=0,K=Z.length;$!==K;++$)Z[$]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let Z=this.resolvedProperty;for(let $=0,K=Z.length;$!==K;++$)Z[$]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let Z=this.resolvedProperty;for(let $=0,K=Z.length;$!==K;++$)Z[$]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,Z=Q.objectName,$=Q.propertyName,K=Q.propertyIndex;if(!J)J=i9.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){H9("PropertyBinding: No target node found for track: "+this.path+".");return}if(Z){let W=Q.objectIndex;switch(Z){case"materials":if(!J.material){X9("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){X9("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){X9("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let X=0;X<J.length;X++)if(J[X].name===W){W=X;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){X9("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){X9("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Z]===void 0){X9("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Z]}if(W!==void 0){if(J[W]===void 0){X9("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[W]}}let U=J[$];if(U===void 0){let W=Q.nodeName;X9("PropertyBinding: Trying to update property for track: "+W+"."+$+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(K!==void 0){if($==="morphTargetInfluences"){if(!J.geometry){X9("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){X9("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}Y=this.BindingType.ArrayElement,this.resolvedProperty=U,this.propertyIndex=K}else if(U.fromArray!==void 0&&U.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=U;else if(Array.isArray(U))Y=this.BindingType.EntireArray,this.resolvedProperty=U;else this.propertyName=$;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}i9.Composite=dW;i9.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};i9.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};i9.prototype.GetterByBindingType=[i9.prototype._getValue_direct,i9.prototype._getValue_array,i9.prototype._getValue_arrayElement,i9.prototype._getValue_toArray];i9.prototype.SetterByBindingTypeAndVersioning=[[i9.prototype._setValue_direct,i9.prototype._setValue_direct_setNeedsUpdate,i9.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[i9.prototype._setValue_array,i9.prototype._setValue_array_setNeedsUpdate,i9.prototype._setValue_array_setMatrixWorldNeedsUpdate],[i9.prototype._setValue_arrayElement,i9.prototype._setValue_arrayElement_setNeedsUpdate,i9.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[i9.prototype._setValue_fromArray,i9.prototype._setValue_fromArray_setNeedsUpdate,i9.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var JM=new Float32Array(1);class nU{static{nU.prototype.isMatrix2=!0}constructor(J,Q,Z,$){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,Z,$)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let Z=0;Z<4;Z++)this.elements[Z]=J[Z+Q];return this}set(J,Q,Z,$){let K=this.elements;return K[0]=J,K[2]=Q,K[1]=Z,K[3]=$,this}}class jJ extends u7{constructor(J=10,Q=10,Z=4473924,$=8947848){Z=new Y0(Z),$=new Y0($);let K=Q/2,U=J/Q,H=J/2,Y=[],W=[];for(let q=0,N=0,D=-H;q<=Q;q++,D+=U){Y.push(-H,0,D,H,0,D),Y.push(D,0,-H,D,0,H);let M=q===K?Z:$;M.toArray(W,N),N+=3,M.toArray(W,N),N+=3,M.toArray(W,N),N+=3,M.toArray(W,N),N+=3}let X=new q9;X.setAttribute("position",new J9(Y,3)),X.setAttribute("color",new J9(W,3));let G=new C8({vertexColors:!0,toneMapped:!1});super(X,G);this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function sU(J,Q,Z,$){let K=fG($);switch(Z){case 1021:return J*Q;case 1028:return J*Q/K.components*K.byteLength;case 1029:return J*Q/K.components*K.byteLength;case 1030:return J*Q*2/K.components*K.byteLength;case 1031:return J*Q*2/K.components*K.byteLength;case 1022:return J*Q*3/K.components*K.byteLength;case 1023:return J*Q*4/K.components*K.byteLength;case 1033:return J*Q*4/K.components*K.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${Z} format.`)}function fG(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)H9("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function N5(){let J=null,Q=!1,Z=null,$=null;function K(U,H){$=J.requestAnimationFrame(K),Z(U,H)}return{start:function(){if(Q===!0)return;if(Z===null)return;if(J===null)return;$=J.requestAnimationFrame(K),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame($);Q=!1},setAnimationLoop:function(U){Z=U},setContext:function(U){J=U}}}function bG(J){let Q=new WeakMap;function Z(Y,W){let{array:X,usage:G}=Y,q=X.byteLength,N=J.createBuffer();J.bindBuffer(W,N),J.bufferData(W,X,G),Y.onUploadCallback();let D;if(X instanceof Float32Array)D=J.FLOAT;else if(typeof Float16Array<"u"&&X instanceof Float16Array)D=J.HALF_FLOAT;else if(X instanceof Uint16Array)if(Y.isFloat16BufferAttribute)D=J.HALF_FLOAT;else D=J.UNSIGNED_SHORT;else if(X instanceof Int16Array)D=J.SHORT;else if(X instanceof Uint32Array)D=J.UNSIGNED_INT;else if(X instanceof Int32Array)D=J.INT;else if(X instanceof Int8Array)D=J.BYTE;else if(X instanceof Uint8Array)D=J.UNSIGNED_BYTE;else if(X instanceof Uint8ClampedArray)D=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+X);return{buffer:N,type:D,bytesPerElement:X.BYTES_PER_ELEMENT,version:Y.version,size:q}}function $(Y,W,X){let{array:G,updateRanges:q}=W;if(J.bindBuffer(X,Y),q.length===0)J.bufferSubData(X,0,G);else{q.sort((D,M)=>D.start-M.start);let N=0;for(let D=1;D<q.length;D++){let M=q[N],V=q[D];if(V.start<=M.start+M.count+1)M.count=Math.max(M.count,V.start+V.count-M.start);else++N,q[N]=V}q.length=N+1;for(let D=0,M=q.length;D<M;D++){let V=q[D];J.bufferSubData(X,V.start*G.BYTES_PER_ELEMENT,G,V.start,V.count)}W.clearUpdateRanges()}W.onUploadCallback()}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function U(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let W=Q.get(Y);if(W)J.deleteBuffer(W.buffer),Q.delete(Y)}function H(Y,W){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let G=Q.get(Y);if(!G||G.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let X=Q.get(Y);if(X===void 0)Q.set(Y,Z(Y,W));else if(X.version<Y.version){if(X.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");$(X.buffer,Y,W),X.version=Y.version}}return{get:K,remove:U,update:H}}var xG=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hG=`#ifdef USE_ALPHAHASH
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
#endif`,gG=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pG=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uG=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mG=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dG=`#ifdef USE_AOMAP
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
#endif`,lG=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cG=`#ifdef USE_BATCHING
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
#endif`,nG=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sG=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,iG=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,oG=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,aG=`#ifdef USE_IRIDESCENCE
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
#endif`,rG=`#ifdef USE_BUMPMAP
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
#endif`,tG=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,eG=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,JN=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,QN=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ZN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$N=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,KN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,UN=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,HN=`#define PI 3.141592653589793
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
} // validated`,YN=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,WN=`vec3 transformedNormal = objectNormal;
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
#endif`,XN=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,GN=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,NN=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qN=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,DN="gl_FragColor = linearToOutputTexel( gl_FragColor );",FN=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ON=`#ifdef USE_ENVMAP
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
#endif`,MN=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,RN=`#ifdef USE_ENVMAP
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
#endif`,EN=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,VN=`#ifdef USE_ENVMAP
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
#endif`,IN=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,BN=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_N=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,AN=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zN=`#ifdef USE_GRADIENTMAP
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
}`,PN=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,CN=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,LN=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,TN=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,wN=`#ifdef USE_ENVMAP
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
#endif`,SN=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kN=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jN=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vN=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yN=`PhysicalMaterial material;
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
#endif`,fN=`uniform sampler2D dfgLUT;
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
}`,bN=`
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
#endif`,xN=`#if defined( RE_IndirectDiffuse )
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
#endif`,hN=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gN=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,pN=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uN=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mN=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dN=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lN=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cN=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nN=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sN=`#if defined( USE_POINTS_UV )
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
#endif`,iN=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,oN=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,aN=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,rN=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tN=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eN=`#ifdef USE_MORPHTARGETS
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
#endif`,J1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Z1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,H1=`#ifdef USE_NORMALMAP
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
#endif`,Y1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,W1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,X1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,G1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,N1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,D1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,F1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,O1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,M1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,R1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,E1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,V1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,I1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,B1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_1=`float getShadowMask() {
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
}`,A1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,z1=`#ifdef USE_SKINNING
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
#endif`,P1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,C1=`#ifdef USE_SKINNING
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
#endif`,L1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,T1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,k1=`#ifdef USE_TRANSMISSION
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
#endif`,j1=`#ifdef USE_TRANSMISSION
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
#endif`,v1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,y1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,x1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,h1=`uniform sampler2D t2D;
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
}`,g1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,u1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d1=`#include <common>
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
}`,l1=`#if DEPTH_PACKING == 3200
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
}`,c1=`#define DISTANCE
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
}`,n1=`#define DISTANCE
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
}`,s1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,i1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o1=`uniform float scale;
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
}`,a1=`uniform vec3 diffuse;
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
}`,r1=`#include <common>
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
}`,t1=`uniform vec3 diffuse;
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
}`,e1=`#define LAMBERT
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
}`,Jq=`#define LAMBERT
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
}`,Qq=`#define MATCAP
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
}`,Zq=`#define MATCAP
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
}`,$q=`#define NORMAL
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
}`,Kq=`#define NORMAL
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
}`,Uq=`#define PHONG
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
}`,Hq=`#define PHONG
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
}`,Yq=`#define STANDARD
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
}`,Wq=`#define STANDARD
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
}`,Xq=`#define TOON
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
}`,Gq=`#define TOON
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
}`,Nq=`uniform float size;
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
}`,qq=`uniform vec3 diffuse;
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
}`,Dq=`#include <common>
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
}`,Fq=`uniform vec3 color;
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
}`,Oq=`uniform float rotation;
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
}`,Mq=`uniform vec3 diffuse;
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
}`,I9={alphahash_fragment:xG,alphahash_pars_fragment:hG,alphamap_fragment:gG,alphamap_pars_fragment:pG,alphatest_fragment:uG,alphatest_pars_fragment:mG,aomap_fragment:dG,aomap_pars_fragment:lG,batching_pars_vertex:cG,batching_vertex:nG,begin_vertex:sG,beginnormal_vertex:iG,bsdfs:oG,iridescence_fragment:aG,bumpmap_pars_fragment:rG,clipping_planes_fragment:tG,clipping_planes_pars_fragment:eG,clipping_planes_pars_vertex:JN,clipping_planes_vertex:QN,color_fragment:ZN,color_pars_fragment:$N,color_pars_vertex:KN,color_vertex:UN,common:HN,cube_uv_reflection_fragment:YN,defaultnormal_vertex:WN,displacementmap_pars_vertex:XN,displacementmap_vertex:GN,emissivemap_fragment:NN,emissivemap_pars_fragment:qN,colorspace_fragment:DN,colorspace_pars_fragment:FN,envmap_fragment:ON,envmap_common_pars_fragment:MN,envmap_pars_fragment:RN,envmap_pars_vertex:EN,envmap_physical_pars_fragment:wN,envmap_vertex:VN,fog_vertex:IN,fog_pars_vertex:BN,fog_fragment:_N,fog_pars_fragment:AN,gradientmap_pars_fragment:zN,lightmap_pars_fragment:PN,lights_lambert_fragment:CN,lights_lambert_pars_fragment:LN,lights_pars_begin:TN,lights_toon_fragment:SN,lights_toon_pars_fragment:kN,lights_phong_fragment:jN,lights_phong_pars_fragment:vN,lights_physical_fragment:yN,lights_physical_pars_fragment:fN,lights_fragment_begin:bN,lights_fragment_maps:xN,lights_fragment_end:hN,lightprobes_pars_fragment:gN,logdepthbuf_fragment:pN,logdepthbuf_pars_fragment:uN,logdepthbuf_pars_vertex:mN,logdepthbuf_vertex:dN,map_fragment:lN,map_pars_fragment:cN,map_particle_fragment:nN,map_particle_pars_fragment:sN,metalnessmap_fragment:iN,metalnessmap_pars_fragment:oN,morphinstance_vertex:aN,morphcolor_vertex:rN,morphnormal_vertex:tN,morphtarget_pars_vertex:eN,morphtarget_vertex:J1,normal_fragment_begin:Q1,normal_fragment_maps:Z1,normal_pars_fragment:$1,normal_pars_vertex:K1,normal_vertex:U1,normalmap_pars_fragment:H1,clearcoat_normal_fragment_begin:Y1,clearcoat_normal_fragment_maps:W1,clearcoat_pars_fragment:X1,iridescence_pars_fragment:G1,opaque_fragment:N1,packing:q1,premultiplied_alpha_fragment:D1,project_vertex:F1,dithering_fragment:O1,dithering_pars_fragment:M1,roughnessmap_fragment:R1,roughnessmap_pars_fragment:E1,shadowmap_pars_fragment:V1,shadowmap_pars_vertex:I1,shadowmap_vertex:B1,shadowmask_pars_fragment:_1,skinbase_vertex:A1,skinning_pars_vertex:z1,skinning_vertex:P1,skinnormal_vertex:C1,specularmap_fragment:L1,specularmap_pars_fragment:T1,tonemapping_fragment:w1,tonemapping_pars_fragment:S1,transmission_fragment:k1,transmission_pars_fragment:j1,uv_pars_fragment:v1,uv_pars_vertex:y1,uv_vertex:f1,worldpos_vertex:b1,background_vert:x1,background_frag:h1,backgroundCube_vert:g1,backgroundCube_frag:p1,cube_vert:u1,cube_frag:m1,depth_vert:d1,depth_frag:l1,distance_vert:c1,distance_frag:n1,equirect_vert:s1,equirect_frag:i1,linedashed_vert:o1,linedashed_frag:a1,meshbasic_vert:r1,meshbasic_frag:t1,meshlambert_vert:e1,meshlambert_frag:Jq,meshmatcap_vert:Qq,meshmatcap_frag:Zq,meshnormal_vert:$q,meshnormal_frag:Kq,meshphong_vert:Uq,meshphong_frag:Hq,meshphysical_vert:Yq,meshphysical_frag:Wq,meshtoon_vert:Xq,meshtoon_frag:Gq,points_vert:Nq,points_frag:qq,shadow_vert:Dq,shadow_frag:Fq,sprite_vert:Oq,sprite_frag:Mq},y0={common:{diffuse:{value:new Y0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new D9},alphaMap:{value:null},alphaMapTransform:{value:new D9},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new D9}},envmap:{envMap:{value:null},envMapRotation:{value:new D9},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new D9}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new D9}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new D9},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new D9},normalScale:{value:new q0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new D9},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new D9}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new D9}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new D9}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new Y0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Y0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new D9},alphaTest:{value:0},uvTransform:{value:new D9}},sprite:{diffuse:{value:new Y0(16777215)},opacity:{value:1},center:{value:new q0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new D9},alphaMap:{value:null},alphaMapTransform:{value:new D9},alphaTest:{value:0}}},n8={basic:{uniforms:h7([y0.common,y0.specularmap,y0.envmap,y0.aomap,y0.lightmap,y0.fog]),vertexShader:I9.meshbasic_vert,fragmentShader:I9.meshbasic_frag},lambert:{uniforms:h7([y0.common,y0.specularmap,y0.envmap,y0.aomap,y0.lightmap,y0.emissivemap,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.fog,y0.lights,{emissive:{value:new Y0(0)},envMapIntensity:{value:1}}]),vertexShader:I9.meshlambert_vert,fragmentShader:I9.meshlambert_frag},phong:{uniforms:h7([y0.common,y0.specularmap,y0.envmap,y0.aomap,y0.lightmap,y0.emissivemap,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.fog,y0.lights,{emissive:{value:new Y0(0)},specular:{value:new Y0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:I9.meshphong_vert,fragmentShader:I9.meshphong_frag},standard:{uniforms:h7([y0.common,y0.envmap,y0.aomap,y0.lightmap,y0.emissivemap,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.roughnessmap,y0.metalnessmap,y0.fog,y0.lights,{emissive:{value:new Y0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:I9.meshphysical_vert,fragmentShader:I9.meshphysical_frag},toon:{uniforms:h7([y0.common,y0.aomap,y0.lightmap,y0.emissivemap,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.gradientmap,y0.fog,y0.lights,{emissive:{value:new Y0(0)}}]),vertexShader:I9.meshtoon_vert,fragmentShader:I9.meshtoon_frag},matcap:{uniforms:h7([y0.common,y0.bumpmap,y0.normalmap,y0.displacementmap,y0.fog,{matcap:{value:null}}]),vertexShader:I9.meshmatcap_vert,fragmentShader:I9.meshmatcap_frag},points:{uniforms:h7([y0.points,y0.fog]),vertexShader:I9.points_vert,fragmentShader:I9.points_frag},dashed:{uniforms:h7([y0.common,y0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:I9.linedashed_vert,fragmentShader:I9.linedashed_frag},depth:{uniforms:h7([y0.common,y0.displacementmap]),vertexShader:I9.depth_vert,fragmentShader:I9.depth_frag},normal:{uniforms:h7([y0.common,y0.bumpmap,y0.normalmap,y0.displacementmap,{opacity:{value:1}}]),vertexShader:I9.meshnormal_vert,fragmentShader:I9.meshnormal_frag},sprite:{uniforms:h7([y0.sprite,y0.fog]),vertexShader:I9.sprite_vert,fragmentShader:I9.sprite_frag},background:{uniforms:{uvTransform:{value:new D9},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:I9.background_vert,fragmentShader:I9.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new D9}},vertexShader:I9.backgroundCube_vert,fragmentShader:I9.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:I9.cube_vert,fragmentShader:I9.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:I9.equirect_vert,fragmentShader:I9.equirect_frag},distance:{uniforms:h7([y0.common,y0.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:I9.distance_vert,fragmentShader:I9.distance_frag},shadow:{uniforms:h7([y0.lights,y0.fog,{color:{value:new Y0(0)},opacity:{value:1}}]),vertexShader:I9.shadow_vert,fragmentShader:I9.shadow_frag}};n8.physical={uniforms:h7([n8.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new D9},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new D9},clearcoatNormalScale:{value:new q0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new D9},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new D9},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new D9},sheen:{value:0},sheenColor:{value:new Y0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new D9},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new D9},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new D9},transmissionSamplerSize:{value:new q0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new D9},attenuationDistance:{value:0},attenuationColor:{value:new Y0(0)},specularColor:{value:new Y0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new D9},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new D9},anisotropyVector:{value:new q0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new D9}}]),vertexShader:I9.meshphysical_vert,fragmentShader:I9.meshphysical_frag};var k$={r:0,b:0,g:0},Rq=new x9,q5=new D9;q5.set(-1,0,0,0,1,0,0,0,1);function Eq(J,Q,Z,$,K,U){let H=new Y0(0),Y=K===!0?0:1,W,X,G=null,q=0,N=null;function D(z){let C=z.isScene===!0?z.background:null;if(C&&C.isTexture){let R=z.backgroundBlurriness>0;C=Q.get(C,R)}return C}function M(z){let C=!1,R=D(z);if(R===null)F(H,Y);else if(R&&R.isColor)F(R,1),C=!0;let B=J.xr.getEnvironmentBlendMode();if(B==="additive")Z.buffers.color.setClear(0,0,0,1,U);else if(B==="alpha-blend")Z.buffers.color.setClear(0,0,0,0,U);if(J.autoClear||C)Z.buffers.depth.setTest(!0),Z.buffers.depth.setMask(!0),Z.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function V(z,C){let R=D(C);if(R&&(R.isCubeTexture||R.mapping===vQ)){if(X===void 0)X=new f(new _0(1,1,1),new v9({name:"BackgroundCubeMaterial",uniforms:rJ(n8.backgroundCube.uniforms),vertexShader:n8.backgroundCube.vertexShader,fragmentShader:n8.backgroundCube.fragmentShader,side:B7,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),X.geometry.deleteAttribute("uv"),X.onBeforeRender=function(B,_,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(X.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),$.update(X);if(X.material.uniforms.envMap.value=R,X.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,X.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,X.material.uniforms.backgroundRotation.value.setFromMatrix4(Rq.makeRotationFromEuler(C.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1)X.material.uniforms.backgroundRotation.value.premultiply(q5);if(X.material.toneMapped=A9.getTransfer(R.colorSpace)!==o9,G!==R||q!==R.version||N!==J.toneMapping)X.material.needsUpdate=!0,G=R,q=R.version,N=J.toneMapping;X.layers.enableAll(),z.unshift(X,X.geometry,X.material,0,0,null)}else if(R&&R.isTexture){if(W===void 0)W=new f(new F9(2,2),new v9({name:"BackgroundMaterial",uniforms:rJ(n8.background.uniforms),vertexShader:n8.background.vertexShader,fragmentShader:n8.background.fragmentShader,side:u6,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),W.geometry.deleteAttribute("normal"),Object.defineProperty(W.material,"map",{get:function(){return this.uniforms.t2D.value}}),$.update(W);if(W.material.uniforms.t2D.value=R,W.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,W.material.toneMapped=A9.getTransfer(R.colorSpace)!==o9,R.matrixAutoUpdate===!0)R.updateMatrix();if(W.material.uniforms.uvTransform.value.copy(R.matrix),G!==R||q!==R.version||N!==J.toneMapping)W.material.needsUpdate=!0,G=R,q=R.version,N=J.toneMapping;W.layers.enableAll(),z.unshift(W,W.geometry,W.material,0,0,null)}}function F(z,C){z.getRGB(k$,SU(J)),Z.buffers.color.setClear(k$.r,k$.g,k$.b,C,U)}function O(){if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0;if(W!==void 0)W.geometry.dispose(),W.material.dispose(),W=void 0}return{getClearColor:function(){return H},setClearColor:function(z,C=1){H.set(z),Y=C,F(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(z){Y=z,F(H,Y)},render:M,addToRenderList:V,dispose:O}}function Vq(J,Q){let Z=J.getParameter(J.MAX_VERTEX_ATTRIBS),$={},K=N(null),U=K,H=!1;function Y(S,b,e,v,l){let U0=!1,i=q(S,v,e,b);if(U!==i)U=i,X(U.object);if(U0=D(S,v,e,l),U0)M(S,v,e,l);if(l!==null)Q.update(l,J.ELEMENT_ARRAY_BUFFER);if(U0||H){if(H=!1,R(S,b,e,v),l!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(l).buffer)}}function W(){return J.createVertexArray()}function X(S){return J.bindVertexArray(S)}function G(S){return J.deleteVertexArray(S)}function q(S,b,e,v){let l=v.wireframe===!0,U0=$[b.id];if(U0===void 0)U0={},$[b.id]=U0;let i=S.isInstancedMesh===!0?S.id:0,r=U0[i];if(r===void 0)r={},U0[i]=r;let u=r[e.id];if(u===void 0)u={},r[e.id]=u;let h=u[l];if(h===void 0)h=N(W()),u[l]=h;return h}function N(S){let b=[],e=[],v=[];for(let l=0;l<Z;l++)b[l]=0,e[l]=0,v[l]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:e,attributeDivisors:v,object:S,attributes:{},index:null}}function D(S,b,e,v){let l=U.attributes,U0=b.attributes,i=0,r=e.getAttributes();for(let u in r)if(r[u].location>=0){let H0=l[u],E0=U0[u];if(E0===void 0){if(u==="instanceMatrix"&&S.instanceMatrix)E0=S.instanceMatrix;if(u==="instanceColor"&&S.instanceColor)E0=S.instanceColor}if(H0===void 0)return!0;if(H0.attribute!==E0)return!0;if(E0&&H0.data!==E0.data)return!0;i++}if(U.attributesNum!==i)return!0;if(U.index!==v)return!0;return!1}function M(S,b,e,v){let l={},U0=b.attributes,i=0,r=e.getAttributes();for(let u in r)if(r[u].location>=0){let H0=U0[u];if(H0===void 0){if(u==="instanceMatrix"&&S.instanceMatrix)H0=S.instanceMatrix;if(u==="instanceColor"&&S.instanceColor)H0=S.instanceColor}let E0={};if(E0.attribute=H0,H0&&H0.data)E0.data=H0.data;l[u]=E0,i++}U.attributes=l,U.attributesNum=i,U.index=v}function V(){let S=U.newAttributes;for(let b=0,e=S.length;b<e;b++)S[b]=0}function F(S){O(S,0)}function O(S,b){let{newAttributes:e,enabledAttributes:v,attributeDivisors:l}=U;if(e[S]=1,v[S]===0)J.enableVertexAttribArray(S),v[S]=1;if(l[S]!==b)J.vertexAttribDivisor(S,b),l[S]=b}function z(){let{newAttributes:S,enabledAttributes:b}=U;for(let e=0,v=b.length;e<v;e++)if(b[e]!==S[e])J.disableVertexAttribArray(e),b[e]=0}function C(S,b,e,v,l,U0,i){if(i===!0)J.vertexAttribIPointer(S,b,e,l,U0);else J.vertexAttribPointer(S,b,e,v,l,U0)}function R(S,b,e,v){V();let l=v.attributes,U0=e.getAttributes(),i=b.defaultAttributeValues;for(let r in U0){let u=U0[r];if(u.location>=0){let h=l[r];if(h===void 0){if(r==="instanceMatrix"&&S.instanceMatrix)h=S.instanceMatrix;if(r==="instanceColor"&&S.instanceColor)h=S.instanceColor}if(h!==void 0){let{normalized:H0,itemSize:E0}=h,L0=Q.get(h);if(L0===void 0)continue;let{buffer:d,type:D0,bytesPerElement:s}=L0,G0=D0===J.INT||D0===J.UNSIGNED_INT||h.gpuType===jK;if(h.isInterleavedBufferAttribute){let X0=h.data,c=X0.stride,C0=h.offset;if(X0.isInstancedInterleavedBuffer){for(let t=0;t<u.locationSize;t++)O(u.location+t,X0.meshPerAttribute);if(S.isInstancedMesh!==!0&&v._maxInstanceCount===void 0)v._maxInstanceCount=X0.meshPerAttribute*X0.count}else for(let t=0;t<u.locationSize;t++)F(u.location+t);J.bindBuffer(J.ARRAY_BUFFER,d);for(let t=0;t<u.locationSize;t++)C(u.location+t,E0/u.locationSize,D0,H0,c*s,(C0+E0/u.locationSize*t)*s,G0)}else{if(h.isInstancedBufferAttribute){for(let X0=0;X0<u.locationSize;X0++)O(u.location+X0,h.meshPerAttribute);if(S.isInstancedMesh!==!0&&v._maxInstanceCount===void 0)v._maxInstanceCount=h.meshPerAttribute*h.count}else for(let X0=0;X0<u.locationSize;X0++)F(u.location+X0);J.bindBuffer(J.ARRAY_BUFFER,d);for(let X0=0;X0<u.locationSize;X0++)C(u.location+X0,E0/u.locationSize,D0,H0,E0*s,E0/u.locationSize*X0*s,G0)}}else if(i!==void 0){let H0=i[r];if(H0!==void 0)switch(H0.length){case 2:J.vertexAttrib2fv(u.location,H0);break;case 3:J.vertexAttrib3fv(u.location,H0);break;case 4:J.vertexAttrib4fv(u.location,H0);break;default:J.vertexAttrib1fv(u.location,H0)}}}}z()}function B(){A();for(let S in $){let b=$[S];for(let e in b){let v=b[e];for(let l in v){let U0=v[l];for(let i in U0)G(U0[i].object),delete U0[i];delete v[l]}}delete $[S]}}function _(S){if($[S.id]===void 0)return;let b=$[S.id];for(let e in b){let v=b[e];for(let l in v){let U0=v[l];for(let i in U0)G(U0[i].object),delete U0[i];delete v[l]}}delete $[S.id]}function P(S){for(let b in $){let e=$[b];for(let v in e){let l=e[v];if(l[S.id]===void 0)continue;let U0=l[S.id];for(let i in U0)G(U0[i].object),delete U0[i];delete l[S.id]}}}function E(S){for(let b in $){let e=$[b],v=S.isInstancedMesh===!0?S.id:0,l=e[v];if(l===void 0)continue;for(let U0 in l){let i=l[U0];for(let r in i)G(i[r].object),delete i[r];delete l[U0]}if(delete e[v],Object.keys(e).length===0)delete $[b]}}function A(){if(y(),H=!0,U===K)return;U=K,X(U.object)}function y(){K.geometry=null,K.program=null,K.wireframe=!1}return{setup:Y,reset:A,resetDefaultState:y,dispose:B,releaseStatesOfGeometry:_,releaseStatesOfObject:E,releaseStatesOfProgram:P,initAttributes:V,enableAttribute:F,disableUnusedAttributes:z}}function Iq(J,Q,Z){let $;function K(W){$=W}function U(W,X){J.drawArrays($,W,X),Z.update(X,$,1)}function H(W,X,G){if(G===0)return;J.drawArraysInstanced($,W,X,G),Z.update(X,$,G)}function Y(W,X,G){if(G===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL($,W,0,X,0,G);let N=0;for(let D=0;D<G;D++)N+=X[D];Z.update(N,$,1)}this.setMode=K,this.render=U,this.renderInstances=H,this.renderMultiDraw=Y}function Bq(J,Q,Z,$){let K;function U(){if(K!==void 0)return K;if(Q.has("EXT_texture_filter_anisotropic")===!0){let P=Q.get("EXT_texture_filter_anisotropic");K=J.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else K=0;return K}function H(P){if(P!==d8&&$.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(P){let E=P===L7&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(P!==_8&&P!==UJ&&!E&&$.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function W(P){if(P==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";P="mediump"}if(P==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let X=Z.precision!==void 0?Z.precision:"highp",G=W(X);if(G!==X)H9("WebGLRenderer:",X,"not supported, using",G,"instead."),X=G;let q=Z.logarithmicDepthBuffer===!0,N=Z.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if(Z.reversedDepthBuffer===!0&&N===!1)H9("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let D=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),M=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),V=J.getParameter(J.MAX_TEXTURE_SIZE),F=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),O=J.getParameter(J.MAX_VERTEX_ATTRIBS),z=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),C=J.getParameter(J.MAX_VARYING_VECTORS),R=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),B=J.getParameter(J.MAX_SAMPLES),_=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:U,getMaxPrecision:W,textureFormatReadable:H,textureTypeReadable:Y,precision:X,logarithmicDepthBuffer:q,reversedDepthBuffer:N,maxTextures:D,maxVertexTextures:M,maxTextureSize:V,maxCubemapSize:F,maxAttributes:O,maxVertexUniforms:z,maxVaryings:C,maxFragmentUniforms:R,maxSamples:B,samples:_}}function _q(J){let Q=this,Z=null,$=0,K=!1,U=!1,H=new h8,Y=new D9,W={value:null,needsUpdate:!1};this.uniform=W,this.numPlanes=0,this.numIntersection=0,this.init=function(q,N){let D=q.length!==0||N||$!==0||K;return K=N,$=q.length,D},this.beginShadows=function(){U=!0,G(null)},this.endShadows=function(){U=!1},this.setGlobalState=function(q,N){Z=G(q,N,0)},this.setState=function(q,N,D){let{clippingPlanes:M,clipIntersection:V,clipShadows:F}=q,O=J.get(q);if(!K||M===null||M.length===0||U&&!F)if(U)G(null);else X();else{let z=U?0:$,C=z*4,R=O.clippingState||null;W.value=R,R=G(M,N,C,D);for(let B=0;B!==C;++B)R[B]=Z[B];O.clippingState=R,this.numIntersection=V?this.numPlanes:0,this.numPlanes+=z}};function X(){if(W.value!==Z)W.value=Z,W.needsUpdate=$>0;Q.numPlanes=$,Q.numIntersection=0}function G(q,N,D,M){let V=q!==null?q.length:0,F=null;if(V!==0){if(F=W.value,M!==!0||F===null){let O=D+V*4,z=N.matrixWorldInverse;if(Y.getNormalMatrix(z),F===null||F.length<O)F=new Float32Array(O);for(let C=0,R=D;C!==V;++C,R+=4)H.copy(q[C]).applyMatrix4(z,Y),H.normal.toArray(F,R),F[R+3]=H.constant}W.value=F,W.needsUpdate=!0}return Q.numPlanes=V,Q.numIntersection=0,F}}var a6=4,Aq=6,zq=20,Pq=256,iQ=new Z6,lW=new Y0,iU=null,oU=0,aU=0,rU=!1,Cq=new k,$6=new k;class JH{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,Z=0.1,$=100,K={}){let{size:U=256,position:H=Cq}=K;iU=this._renderer.getRenderTarget(),oU=this._renderer.getActiveCubeFace(),aU=this._renderer.getActiveMipmapLevel(),rU=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(U);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,Z,$,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=sW(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=nW(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(iU,oU,aU),this._renderer.xr.enabled=rU,J.scissorTest=!1,o6(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===d6||J.mapping===mJ)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);iU=this._renderer.getRenderTarget(),oU=this._renderer.getActiveCubeFace(),aU=this._renderer.getActiveMipmapLevel(),rU=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let Z=Q||this._allocateTargets();return this._textureToCubeUV(J,Z),this._applyPMREM(Z),this._cleanup(Z),Z}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,Z={magFilter:i7,minFilter:i7,generateMipmaps:!1,type:L7,format:d8,colorSpace:MU,depthBuffer:!1},$=cW(J,Q,Z);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=cW(J,Q,Z);let{_lodMax:K}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Lq(K)),this._blurMaterial=wq(K,J,Q),this._ggxMaterial=Tq(K,J,Q)}return $}_compileMaterial(J){let Q=new f(new q9,J);this._renderer.compile(Q,iQ)}_sceneToCubeUV(J,Q,Z,$,K){let Y=new Q7(90,1,Q,Z),W=[1,-1,1,1,1,1],X=[1,1,1,-1,-1,-1],G=this._renderer,q=G.autoClear,N=G.toneMapping;if(G.getClearColor(lW),G.toneMapping=B8,G.autoClear=!1,G.state.buffers.depth.getReversed())G.setRenderTarget($),G.clearDepth(),G.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new f(new _0,new h0({name:"PMREM.Background",side:B7,depthWrite:!1,depthTest:!1}));let M=this._backgroundBox,V=M.material,F=!1,O=J.background;if(O){if(O.isColor)V.color.copy(O),J.background=null,F=!0}else V.color.copy(lW),F=!0;for(let z=0;z<6;z++){let C=z%3;if(C===0)Y.up.set(0,W[z],0),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x+X[z],K.y,K.z);else if(C===1)Y.up.set(0,0,W[z]),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x,K.y+X[z],K.z);else Y.up.set(0,W[z],0),Y.position.set(K.x,K.y,K.z),Y.lookAt(K.x,K.y,K.z+X[z]);let R=this._cubeSize;if(o6($,C*R,z>2?R:0,R,R),G.setRenderTarget($),F)G.render(M,Y);G.render(J,Y)}G.toneMapping=N,G.autoClear=q,J.background=O}_textureToCubeUV(J,Q){let Z=this._renderer,$=J.mapping===d6||J.mapping===mJ;if($){if(this._cubemapMaterial===null)this._cubemapMaterial=sW();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=nW();let K=$?this._cubemapMaterial:this._equirectMaterial,U=this._lodMeshes[0];U.material=K;let H=K.uniforms;H.envMap.value=J;let Y=this._cubeSize;o6(Q,0,0,3*Y,2*Y),Z.setRenderTarget(Q),Z.render(U,iQ)}_applyPMREM(J){let Q=this._renderer,Z=Q.autoClear;Q.autoClear=!1;let $=this._lodMeshes.length;for(let K=1;K<$;K++)this._applyGGXFilter(J,K-1,K);Q.autoClear=Z}_applyGGXFilter(J,Q,Z){let $=this._renderer,K=this._pingPongRenderTarget,U=this._ggxMaterial,H=this._lodMeshes[Z];H.material=U;let Y=U.uniforms,W=Z/(this._lodMeshes.length-1),X=Q/(this._lodMeshes.length-1),G=Math.sqrt(W*W-X*X),q=W*1.25,N=G*q,{_lodMax:D}=this,M=this._sizeLods[Z],V=3*M*(Z>D-a6?Z-D+a6:0),F=4*(this._cubeSize-M);Y.envMap.value=J.texture,Y.roughness.value=N,Y.mipInt.value=D-Q,o6(K,V,F,3*M,2*M),$.setRenderTarget(K),$.render(H,iQ),Y.envMap.value=K.texture,Y.roughness.value=0,Y.mipInt.value=D-Z,o6(J,V,F,3*M,2*M),$.setRenderTarget(J),$.render(H,iQ)}_blur(J,Q,Z,$){let K=this._pingPongRenderTarget,U=Math.min($,Math.PI)/Math.SQRT2;this._blurPass(J,K,Q,Z,U),this._blurPass(K,J,Z,Z,U)}_blurPass(J,Q,Z,$,K){let U=this._renderer,H=this._blurMaterial,Y=this._lodMeshes[$];Y.material=H;let W=H.uniforms;W.envMap.value=J.texture,W.sigma.value=K,W.mipInt.value=this._lodMax-Z;let X=this._sizeLods[$],G=3*X*($>this._lodMax-a6?$-this._lodMax+a6:0),q=4*(this._cubeSize-X);o6(Q,G,q,3*X,2*X),U.setRenderTarget(Q),U.render(Y,iQ)}}function Lq(J){let Q=[],Z=[],$=J,K=J-a6+1+Aq;for(let U=0;U<K;U++){let H=Math.pow(2,$);Q.push(H);let Y=1/(H-2),W=-Y,X=1+Y,G=[W,W,X,W,X,X,W,W,X,X,W,X],q=6,N=6,D=3,M=new Float32Array(D*N*q),V=new Float32Array(D*N*q);for(let O=0;O<q;O++){let z=O%3*2/3-1,C=O>2?0:-1,R=[z,C,0,z+0.6666666666666666,C,0,z+0.6666666666666666,C+1,0,z,C,0,z+0.6666666666666666,C+1,0,z,C+1,0];M.set(R,D*N*O);for(let B=0;B<N;B++){let _=G[B*2]*2-1,P=G[B*2+1]*2-1;if(O===0)$6.set(1,P,_);else if(O===1)$6.set(-_,1,-P);else if(O===2)$6.set(-_,P,1);else if(O===3)$6.set(-1,P,-_);else if(O===4)$6.set(-_,-1,P);else $6.set(_,P,-1);$6.toArray(V,(O*N+B)*D)}}let F=new q9;if(F.setAttribute("position",new u9(M,D)),F.setAttribute("outputDirection",new u9(V,D)),Z.push(new f(F,null)),$>a6)$--}return{lodMeshes:Z,sizeLods:Q}}function cW(J,Q,Z){let $=new M7(J,Q,Z);return $.texture.mapping=vQ,$.texture.name="PMREM.cubeUv",$.scissorTest=!0,$}function o6(J,Q,Z,$,K){J.viewport.set(Q,Z,$,K),J.scissor.set(Q,Z,$,K)}function Tq(J,Q,Z){return new v9({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Pq,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/Z,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:v$(),fragmentShader:`

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
		`,blending:s7,depthTest:!1,depthWrite:!1})}function wq(J,Q,Z){return new v9({name:"SphericalGaussianBlur",defines:{SAMPLES:zq,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/Z,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:v$(),fragmentShader:`

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
		`,blending:s7,depthTest:!1,depthWrite:!1})}function nW(){return new v9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:v$(),fragmentShader:`

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
		`,blending:s7,depthTest:!1,depthWrite:!1})}function sW(){return new v9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:v$(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:s7,depthTest:!1,depthWrite:!1})}function v$(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class $H extends M7{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let Z={width:J,height:J,depth:1},$=[Z,Z,Z,Z,Z,Z];this.texture=new E$($),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let Z={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},$=new _0(5,5,5),K=new v9({name:"CubemapFromEquirect",uniforms:rJ(Z.uniforms),vertexShader:Z.vertexShader,fragmentShader:Z.fragmentShader,side:B7,blending:s7});K.uniforms.tEquirect.value=Q;let U=new f($,K),H=Q.minFilter;if(Q.minFilter===dJ)Q.minFilter=i7;return new mU(1,10,this).update(J,U),Q.minFilter=H,U.geometry.dispose(),U.material.dispose(),this}clear(J,Q=!0,Z=!0,$=!0){let K=J.getRenderTarget();for(let U=0;U<6;U++)J.setRenderTarget(this,U),J.clear(Q,Z,$);J.setRenderTarget(K)}}function Sq(J){let Q=new WeakMap,Z=new WeakMap,$=null;function K(N,D=!1){if(N===null||N===void 0)return null;if(D)return H(N);return U(N)}function U(N){if(N&&N.isTexture){let D=N.mapping;if(D===Z$||D===$$)if(Q.has(N)){let M=Q.get(N).texture;return Y(M,N.mapping)}else{let M=N.image;if(M&&M.height>0){let V=new $H(M.height);return V.fromEquirectangularTexture(J,N),Q.set(N,V),N.addEventListener("dispose",X),Y(V.texture,N.mapping)}else return null}}return N}function H(N){if(N&&N.isTexture){let D=N.mapping,M=D===Z$||D===$$,V=D===d6||D===mJ;if(M||V){let F=Z.get(N),O=F!==void 0?F.texture.pmremVersion:0;if(N.isRenderTargetTexture&&N.pmremVersion!==O){if($===null)$=new JH(J);return F=M?$.fromEquirectangular(N,F):$.fromCubemap(N,F),F.texture.pmremVersion=N.pmremVersion,Z.set(N,F),F.texture}else if(F!==void 0)return F.texture;else{let z=N.image;if(M&&z&&z.height>0||V&&z&&W(z)){if($===null)$=new JH(J);return F=M?$.fromEquirectangular(N):$.fromCubemap(N),F.texture.pmremVersion=N.pmremVersion,Z.set(N,F),N.addEventListener("dispose",G),F.texture}else return null}}}return N}function Y(N,D){if(D===Z$)N.mapping=d6;else if(D===$$)N.mapping=mJ;return N}function W(N){let D=0,M=6;for(let V=0;V<M;V++)if(N[V]!==void 0)D++;return D===M}function X(N){let D=N.target;D.removeEventListener("dispose",X);let M=Q.get(D);if(M!==void 0)Q.delete(D),M.dispose()}function G(N){let D=N.target;D.removeEventListener("dispose",G);let M=Z.get(D);if(M!==void 0)Z.delete(D),M.dispose()}function q(){if(Q=new WeakMap,Z=new WeakMap,$!==null)$.dispose(),$=null}return{get:K,dispose:q}}function kq(J){let Q={};function Z($){if(Q[$]!==void 0)return Q[$];let K=J.getExtension($);return Q[$]=K,K}return{has:function($){return Z($)!==null},init:function(){Z("EXT_color_buffer_float"),Z("WEBGL_clip_cull_distance"),Z("OES_texture_float_linear"),Z("EXT_color_buffer_half_float"),Z("WEBGL_multisampled_render_to_texture"),Z("WEBGL_render_shared_exponent")},get:function($){let K=Z($);if(K===null)pJ("WebGLRenderer: "+$+" extension not supported.");return K}}}function jq(J,Q,Z,$){let K={},U=new WeakMap;function H(q){let N=q.target;if(N.index!==null)Q.remove(N.index);for(let M in N.attributes)Q.remove(N.attributes[M]);N.removeEventListener("dispose",H),delete K[N.id];let D=U.get(N);if(D)Q.remove(D),U.delete(N);if($.releaseStatesOfGeometry(N),N.isInstancedBufferGeometry===!0)delete N._maxInstanceCount;Z.memory.geometries--}function Y(q,N){if(K[N.id]===!0)return N;return N.addEventListener("dispose",H),K[N.id]=!0,Z.memory.geometries++,N}function W(q){let N=q.attributes;for(let D in N)Q.update(N[D],J.ARRAY_BUFFER)}function X(q){let N=[],D=q.index,M=q.attributes.position,V=0;if(M===void 0)return;if(D!==null){let z=D.array;V=D.version;for(let C=0,R=z.length;C<R;C+=3){let B=z[C+0],_=z[C+1],P=z[C+2];N.push(B,_,_,P,P,B)}}else{let z=M.array;V=M.version;for(let C=0,R=z.length/3-1;C<R;C+=3){let B=C+0,_=C+1,P=C+2;N.push(B,_,_,P,P,B)}}let F=new(M.count>=65535?R$:M$)(N,1);F.version=V;let O=U.get(q);if(O)Q.remove(O);U.set(q,F)}function G(q){let N=U.get(q);if(N){let D=q.index;if(D!==null){if(N.version<D.version)X(q)}}else X(q);return U.get(q)}return{get:Y,update:W,getWireframeAttribute:G}}function vq(J,Q,Z){let $;function K(q){$=q}let U,H;function Y(q){U=q.type,H=q.bytesPerElement}function W(q,N){J.drawElements($,N,U,q*H),Z.update(N,$,1)}function X(q,N,D){if(D===0)return;J.drawElementsInstanced($,N,U,q*H,D),Z.update(N,$,D)}function G(q,N,D){if(D===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL($,N,0,U,q,0,D);let V=0;for(let F=0;F<D;F++)V+=N[F];Z.update(V,$,1)}this.setMode=K,this.setIndex=Y,this.render=W,this.renderInstances=X,this.renderMultiDraw=G}function yq(J){let Q={geometries:0,textures:0},Z={frame:0,calls:0,triangles:0,points:0,lines:0};function $(U,H,Y){switch(Z.calls++,H){case J.TRIANGLES:Z.triangles+=Y*(U/3);break;case J.LINES:Z.lines+=Y*(U/2);break;case J.LINE_STRIP:Z.lines+=Y*(U-1);break;case J.LINE_LOOP:Z.lines+=Y*U;break;case J.POINTS:Z.points+=Y*U;break;default:X9("WebGLInfo: Unknown draw mode:",H);break}}function K(){Z.calls=0,Z.triangles=0,Z.points=0,Z.lines=0}return{memory:Q,render:Z,programs:null,autoReset:!0,reset:K,update:$}}function fq(J,Q,Z){let $=new WeakMap,K=new X7;function U(H,Y,W){let X=H.morphTargetInfluences,G=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,q=G!==void 0?G.length:0,N=$.get(Y);if(N===void 0||N.count!==q){let A=function(){P.dispose(),$.delete(Y),Y.removeEventListener("dispose",A)};if(N!==void 0)N.texture.dispose();let D=Y.morphAttributes.position!==void 0,M=Y.morphAttributes.normal!==void 0,V=Y.morphAttributes.color!==void 0,F=Y.morphAttributes.position||[],O=Y.morphAttributes.normal||[],z=Y.morphAttributes.color||[],C=0;if(D===!0)C=1;if(M===!0)C=2;if(V===!0)C=3;let R=Y.attributes.position.count*C,B=1;if(R>Q.maxTextureSize)B=Math.ceil(R/Q.maxTextureSize),R=Q.maxTextureSize;let _=new Float32Array(R*B*4*q),P=new F$(_,R,B,q);P.type=UJ,P.needsUpdate=!0;let E=C*4;for(let y=0;y<q;y++){let S=F[y],b=O[y],e=z[y],v=R*B*4*y;for(let l=0;l<S.count;l++){let U0=l*E;if(D===!0)K.fromBufferAttribute(S,l),_[v+U0+0]=K.x,_[v+U0+1]=K.y,_[v+U0+2]=K.z,_[v+U0+3]=0;if(M===!0)K.fromBufferAttribute(b,l),_[v+U0+4]=K.x,_[v+U0+5]=K.y,_[v+U0+6]=K.z,_[v+U0+7]=0;if(V===!0)K.fromBufferAttribute(e,l),_[v+U0+8]=K.x,_[v+U0+9]=K.y,_[v+U0+10]=K.z,_[v+U0+11]=e.itemSize===4?K.w:1}}N={count:q,texture:P,size:new q0(R,B)},$.set(Y,N),Y.addEventListener("dispose",A)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)W.getUniforms().setValue(J,"morphTexture",H.morphTexture,Z);else{let D=0;for(let V=0;V<X.length;V++)D+=X[V];let M=Y.morphTargetsRelative?1:1-D;W.getUniforms().setValue(J,"morphTargetBaseInfluence",M),W.getUniforms().setValue(J,"morphTargetInfluences",X)}W.getUniforms().setValue(J,"morphTargetsTexture",N.texture,Z),W.getUniforms().setValue(J,"morphTargetsTextureSize",N.size)}return{update:U}}function bq(J,Q,Z,$,K){let U=new WeakMap;function H(X){let G=K.render.frame,q=X.geometry,N=Q.get(X,q);if(U.get(N)!==G)Q.update(N),U.set(N,G);if(X.isInstancedMesh){if(X.hasEventListener("dispose",W)===!1)X.addEventListener("dispose",W);if(U.get(X)!==G){if(Z.update(X.instanceMatrix,J.ARRAY_BUFFER),X.instanceColor!==null)Z.update(X.instanceColor,J.ARRAY_BUFFER);U.set(X,G)}}if(X.isSkinnedMesh){let D=X.skeleton;if(U.get(D)!==G)D.update(),U.set(D,G)}return N}function Y(){U=new WeakMap}function W(X){let G=X.target;if(G.removeEventListener("dispose",W),$.releaseStatesOfObject(G),Z.remove(G.instanceMatrix),G.instanceColor!==null)Z.remove(G.instanceColor)}return{update:H,dispose:Y}}var xq={[LQ]:"LINEAR_TONE_MAPPING",[TQ]:"REINHARD_TONE_MAPPING",[wQ]:"CINEON_TONE_MAPPING",[K8]:"ACES_FILMIC_TONE_MAPPING",[kQ]:"AGX_TONE_MAPPING",[jQ]:"NEUTRAL_TONE_MAPPING",[SQ]:"CUSTOM_TONE_MAPPING"};function hq(J,Q,Z,$,K,U){let H=new M7(Q,Z,{type:J,depthBuffer:K,stencilBuffer:U,samples:$?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),Y=null,W=null,X=new q9;X.setAttribute("position",new J9([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new J9([0,2,0,0,2,0],2));let G=new lQ({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),q=new f(X,G),N=new Z6(-1,1,1,-1,0,1),D=null,M=null,V=!1,F,O=null,z=[],C=!1;this.setSize=function(R,B){if(H.setSize(R,B),Y!==null)Y.setSize(R,B);if(W!==null)W.setSize(R,B);for(let _=0;_<z.length;_++){let P=z[_];if(P.setSize)P.setSize(R,B)}},this.setEffects=function(R){z=R,C=z.length>0&&z[0].isRenderPass===!0;let{width:B,height:_}=H;if(z.length>0&&Y===null)Y=new M7(B,_,{type:L7,depthBuffer:!1,stencilBuffer:!1}),W=new M7(B,_,{type:L7,depthBuffer:!1,stencilBuffer:!1});for(let P=0;P<z.length;P++){let E=z[P];if(E.setSize)E.setSize(B,_)}},this.begin=function(R,B){if(V)return!1;if(R.toneMapping===B8&&z.length===0)return!1;if(O=B,B!==null){let{width:_,height:P}=B;if(H.width!==_||H.height!==P)this.setSize(_,P)}if(C===!1)R.setRenderTarget(H);return F=R.toneMapping,R.toneMapping=B8,!0},this.hasRenderPass=function(){return C},this.end=function(R,B){R.toneMapping=F,V=!0;let _=H,P=Y;for(let E=0;E<z.length;E++){let A=z[E];if(A.enabled===!1)continue;if(A.render(R,P,_,B),A.needsSwap!==!1)_=P,P=P===Y?W:Y}if(D!==R.outputColorSpace||M!==R.toneMapping){if(D=R.outputColorSpace,M=R.toneMapping,G.defines={},A9.getTransfer(D)===o9)G.defines.SRGB_TRANSFER="";let E=xq[M];if(E)G.defines[E]="";G.needsUpdate=!0}G.uniforms.tDiffuse.value=_.texture,R.setRenderTarget(O),R.render(q,N),O=null,V=!1},this.isCompositing=function(){return V},this.dispose=function(){if(H.dispose(),Y!==null)Y.dispose();if(W!==null)W.dispose();X.dispose(),G.dispose()}}var D5=new v7,QH=new oJ(1,1),F5=new F$,O5=new _U,M5=new E$,iW=[],oW=[],aW=new Float32Array(16),rW=new Float32Array(9),tW=new Float32Array(4);function r6(J,Q,Z){let $=J[0];if($<=0||$>0)return J;let K=Q*Z,U=iW[K];if(U===void 0)U=new Float32Array(K),iW[K]=U;if(Q!==0){$.toArray(U,0);for(let H=1,Y=0;H!==Q;++H)Y+=Z,J[H].toArray(U,Y)}return U}function A7(J,Q){if(J.length!==Q.length)return!1;for(let Z=0,$=J.length;Z<$;Z++)if(J[Z]!==Q[Z])return!1;return!0}function z7(J,Q){for(let Z=0,$=Q.length;Z<$;Z++)J[Z]=Q[Z]}function y$(J,Q){let Z=oW[Q];if(Z===void 0)Z=new Int32Array(Q),oW[Q]=Z;for(let $=0;$!==Q;++$)Z[$]=J.allocateTextureUnit();return Z}function gq(J,Q){let Z=this.cache;if(Z[0]===Q)return;J.uniform1f(this.addr,Q),Z[0]=Q}function pq(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),Z[0]=Q.x,Z[1]=Q.y}else{if(A7(Z,Q))return;J.uniform2fv(this.addr,Q),z7(Z,Q)}}function uq(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z}else if(Q.r!==void 0){if(Z[0]!==Q.r||Z[1]!==Q.g||Z[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),Z[0]=Q.r,Z[1]=Q.g,Z[2]=Q.b}else{if(A7(Z,Q))return;J.uniform3fv(this.addr,Q),z7(Z,Q)}}function mq(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z||Z[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z,Z[3]=Q.w}else{if(A7(Z,Q))return;J.uniform4fv(this.addr,Q),z7(Z,Q)}}function dq(J,Q){let Z=this.cache,$=Q.elements;if($===void 0){if(A7(Z,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),z7(Z,Q)}else{if(A7(Z,$))return;tW.set($),J.uniformMatrix2fv(this.addr,!1,tW),z7(Z,$)}}function lq(J,Q){let Z=this.cache,$=Q.elements;if($===void 0){if(A7(Z,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),z7(Z,Q)}else{if(A7(Z,$))return;rW.set($),J.uniformMatrix3fv(this.addr,!1,rW),z7(Z,$)}}function cq(J,Q){let Z=this.cache,$=Q.elements;if($===void 0){if(A7(Z,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),z7(Z,Q)}else{if(A7(Z,$))return;aW.set($),J.uniformMatrix4fv(this.addr,!1,aW),z7(Z,$)}}function nq(J,Q){let Z=this.cache;if(Z[0]===Q)return;J.uniform1i(this.addr,Q),Z[0]=Q}function sq(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),Z[0]=Q.x,Z[1]=Q.y}else{if(A7(Z,Q))return;J.uniform2iv(this.addr,Q),z7(Z,Q)}}function iq(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z}else{if(A7(Z,Q))return;J.uniform3iv(this.addr,Q),z7(Z,Q)}}function oq(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z||Z[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z,Z[3]=Q.w}else{if(A7(Z,Q))return;J.uniform4iv(this.addr,Q),z7(Z,Q)}}function aq(J,Q){let Z=this.cache;if(Z[0]===Q)return;J.uniform1ui(this.addr,Q),Z[0]=Q}function rq(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),Z[0]=Q.x,Z[1]=Q.y}else{if(A7(Z,Q))return;J.uniform2uiv(this.addr,Q),z7(Z,Q)}}function tq(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z}else{if(A7(Z,Q))return;J.uniform3uiv(this.addr,Q),z7(Z,Q)}}function eq(J,Q){let Z=this.cache;if(Q.x!==void 0){if(Z[0]!==Q.x||Z[1]!==Q.y||Z[2]!==Q.z||Z[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),Z[0]=Q.x,Z[1]=Q.y,Z[2]=Q.z,Z[3]=Q.w}else{if(A7(Z,Q))return;J.uniform4uiv(this.addr,Q),z7(Z,Q)}}function JD(J,Q,Z){let $=this.cache,K=Z.allocateTextureUnit();if($[0]!==K)J.uniform1i(this.addr,K),$[0]=K;let U;if(this.type===J.SAMPLER_2D_SHADOW)QH.compareFunction=Z.isReversedDepthBuffer()?D$:q$,U=QH;else U=D5;Z.setTexture2D(Q||U,K)}function QD(J,Q,Z){let $=this.cache,K=Z.allocateTextureUnit();if($[0]!==K)J.uniform1i(this.addr,K),$[0]=K;Z.setTexture3D(Q||O5,K)}function ZD(J,Q,Z){let $=this.cache,K=Z.allocateTextureUnit();if($[0]!==K)J.uniform1i(this.addr,K),$[0]=K;Z.setTextureCube(Q||M5,K)}function $D(J,Q,Z){let $=this.cache,K=Z.allocateTextureUnit();if($[0]!==K)J.uniform1i(this.addr,K),$[0]=K;Z.setTexture2DArray(Q||F5,K)}function KD(J){switch(J){case 5126:return gq;case 35664:return pq;case 35665:return uq;case 35666:return mq;case 35674:return dq;case 35675:return lq;case 35676:return cq;case 5124:case 35670:return nq;case 35667:case 35671:return sq;case 35668:case 35672:return iq;case 35669:case 35673:return oq;case 5125:return aq;case 36294:return rq;case 36295:return tq;case 36296:return eq;case 35678:case 36198:case 36298:case 36306:case 35682:return JD;case 35679:case 36299:case 36307:return QD;case 35680:case 36300:case 36308:case 36293:return ZD;case 36289:case 36303:case 36311:case 36292:return $D}}function UD(J,Q){J.uniform1fv(this.addr,Q)}function HD(J,Q){let Z=r6(Q,this.size,2);J.uniform2fv(this.addr,Z)}function YD(J,Q){let Z=r6(Q,this.size,3);J.uniform3fv(this.addr,Z)}function WD(J,Q){let Z=r6(Q,this.size,4);J.uniform4fv(this.addr,Z)}function XD(J,Q){let Z=r6(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,Z)}function GD(J,Q){let Z=r6(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,Z)}function ND(J,Q){let Z=r6(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,Z)}function qD(J,Q){J.uniform1iv(this.addr,Q)}function DD(J,Q){J.uniform2iv(this.addr,Q)}function FD(J,Q){J.uniform3iv(this.addr,Q)}function OD(J,Q){J.uniform4iv(this.addr,Q)}function MD(J,Q){J.uniform1uiv(this.addr,Q)}function RD(J,Q){J.uniform2uiv(this.addr,Q)}function ED(J,Q){J.uniform3uiv(this.addr,Q)}function VD(J,Q){J.uniform4uiv(this.addr,Q)}function ID(J,Q,Z){let $=this.cache,K=Q.length,U=y$(Z,K);if(!A7($,U))J.uniform1iv(this.addr,U),z7($,U);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=QH;else H=D5;for(let Y=0;Y!==K;++Y)Z.setTexture2D(Q[Y]||H,U[Y])}function BD(J,Q,Z){let $=this.cache,K=Q.length,U=y$(Z,K);if(!A7($,U))J.uniform1iv(this.addr,U),z7($,U);for(let H=0;H!==K;++H)Z.setTexture3D(Q[H]||O5,U[H])}function _D(J,Q,Z){let $=this.cache,K=Q.length,U=y$(Z,K);if(!A7($,U))J.uniform1iv(this.addr,U),z7($,U);for(let H=0;H!==K;++H)Z.setTextureCube(Q[H]||M5,U[H])}function AD(J,Q,Z){let $=this.cache,K=Q.length,U=y$(Z,K);if(!A7($,U))J.uniform1iv(this.addr,U),z7($,U);for(let H=0;H!==K;++H)Z.setTexture2DArray(Q[H]||F5,U[H])}function zD(J){switch(J){case 5126:return UD;case 35664:return HD;case 35665:return YD;case 35666:return WD;case 35674:return XD;case 35675:return GD;case 35676:return ND;case 5124:case 35670:return qD;case 35667:case 35671:return DD;case 35668:case 35672:return FD;case 35669:case 35673:return OD;case 5125:return MD;case 36294:return RD;case 36295:return ED;case 36296:return VD;case 35678:case 36198:case 36298:case 36306:case 35682:return ID;case 35679:case 36299:case 36307:return BD;case 35680:case 36300:case 36308:case 36293:return _D;case 36289:case 36303:case 36311:case 36292:return AD}}class R5{constructor(J,Q,Z){this.id=J,this.addr=Z,this.cache=[],this.type=Q.type,this.setValue=KD(Q.type)}}class E5{constructor(J,Q,Z){this.id=J,this.addr=Z,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=zD(Q.type)}}class V5{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,Z){let $=this.seq;for(let K=0,U=$.length;K!==U;++K){let H=$[K];H.setValue(J,Q[H.id],Z)}}}var tU=/(\w+)(\])?(\[|\.)?/g;function eW(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function PD(J,Q,Z){let $=J.name,K=$.length;tU.lastIndex=0;while(!0){let U=tU.exec($),H=tU.lastIndex,Y=U[1],W=U[2]==="]",X=U[3];if(W)Y=Y|0;if(X===void 0||X==="["&&H+2===K){eW(Z,X===void 0?new R5(Y,J,Q):new E5(Y,J,Q));break}else{let q=Z.map[Y];if(q===void 0)q=new V5(Y),eW(Z,q);Z=q}}}class rQ{constructor(J,Q){this.seq=[],this.map={};let Z=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let U=0;U<Z;++U){let H=J.getActiveUniform(Q,U),Y=J.getUniformLocation(Q,H.name);PD(H,Y,this)}let $=[],K=[];for(let U of this.seq)if(U.type===J.SAMPLER_2D_SHADOW||U.type===J.SAMPLER_CUBE_SHADOW||U.type===J.SAMPLER_2D_ARRAY_SHADOW)$.push(U);else K.push(U);if($.length>0)this.seq=$.concat(K)}setValue(J,Q,Z,$){let K=this.map[Q];if(K!==void 0)K.setValue(J,Z,$)}setOptional(J,Q,Z){let $=Q[Z];if($!==void 0)this.setValue(J,Z,$)}static upload(J,Q,Z,$){for(let K=0,U=Q.length;K!==U;++K){let H=Q[K],Y=Z[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,$)}}static seqWithValue(J,Q){let Z=[];for(let $=0,K=J.length;$!==K;++$){let U=J[$];if(U.id in Q)Z.push(U)}return Z}}function J5(J,Q,Z){let $=J.createShader(Q);return J.shaderSource($,Z),J.compileShader($),$}var CD=37297,LD=0;function TD(J,Q){let Z=J.split(`
`),$=[],K=Math.max(Q-6,0),U=Math.min(Q+6,Z.length);for(let H=K;H<U;H++){let Y=H+1;$.push(`${Y===Q?">":" "} ${Y}: ${Z[H]}`)}return $.join(`
`)}var Q5=new D9;function wD(J){A9._getMatrix(Q5,A9.workingColorSpace,J);let Q=`mat3( ${Q5.elements.map((Z)=>Z.toFixed(4))} )`;switch(A9.getTransfer(J)){case RU:return[Q,"LinearTransferOETF"];case o9:return[Q,"sRGBTransferOETF"];default:return H9("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function Z5(J,Q,Z){let $=J.getShaderParameter(Q,J.COMPILE_STATUS),U=(J.getShaderInfoLog(Q)||"").trim();if($&&U==="")return"";let H=/ERROR: 0:(\d+)/.exec(U);if(H){let Y=parseInt(H[1]);return Z.toUpperCase()+`

`+U+`

`+TD(J.getShaderSource(Q),Y)}else return U}function SD(J,Q){let Z=wD(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${Z[1]}( vec4( value.rgb * ${Z[0]}, value.a ) );`,"}"].join(`
`)}var kD={[LQ]:"Linear",[TQ]:"Reinhard",[wQ]:"Cineon",[K8]:"ACESFilmic",[kQ]:"AgX",[jQ]:"Neutral",[SQ]:"Custom"};function jD(J,Q){let Z=kD[Q];if(Z===void 0)return H9("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+Z+"ToneMapping( color ); }"}var j$=new k;function vD(){A9.getLuminanceCoefficients(j$);let J=j$.x.toFixed(4),Q=j$.y.toFixed(4),Z=j$.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${Z} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function yD(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(aQ).join(`
`)}function fD(J){let Q=[];for(let Z in J){let $=J[Z];if($===!1)continue;Q.push("#define "+Z+" "+$)}return Q.join(`
`)}function bD(J,Q){let Z={},$=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let K=0;K<$;K++){let U=J.getActiveAttrib(Q,K),H=U.name,Y=1;if(U.type===J.FLOAT_MAT2)Y=2;if(U.type===J.FLOAT_MAT3)Y=3;if(U.type===J.FLOAT_MAT4)Y=4;Z[H]={type:U.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return Z}function aQ(J){return J!==""}function $5(J,Q){let Z=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_SUN_LIGHTS/g,Q.numSunLights).replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Z).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,Q.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function K5(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var xD=/^[ \t]*#include +<([\w\d./]+)>/gm;function ZH(J){return J.replace(xD,gD)}var hD=new Map;function gD(J,Q){let Z=I9[Q];if(Z===void 0){let $=hD.get(Q);if($!==void 0)Z=I9[$],H9('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,$);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return ZH(Z)}var pD=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function U5(J){return J.replace(pD,uD)}function uD(J,Q,Z,$){let K="";for(let U=parseInt(Q);U<parseInt(Z);U++)K+=$.replace(/\[\s*i\s*\]/g,"[ "+U+" ]").replace(/UNROLLED_LOOP_INDEX/g,U);return K}function H5(J){let Q=`precision ${J.precision} float;
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
#define LOW_PRECISION`;return Q}var mD={[PQ]:"SHADOWMAP_TYPE_PCF",[p6]:"SHADOWMAP_TYPE_VSM"};function dD(J){return mD[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var lD={[d6]:"ENVMAP_TYPE_CUBE",[mJ]:"ENVMAP_TYPE_CUBE",[vQ]:"ENVMAP_TYPE_CUBE_UV"};function cD(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return lD[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var nD={[mJ]:"ENVMAP_MODE_REFRACTION"};function sD(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return nD[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var iD={[WW]:"ENVMAP_BLENDING_MULTIPLY",[XW]:"ENVMAP_BLENDING_MIX",[GW]:"ENVMAP_BLENDING_ADD"};function oD(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return iD[J.combine]||"ENVMAP_BLENDING_NONE"}function aD(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let Z=Math.log2(Q)-2,$=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:$,maxMip:Z}}function rD(J,Q,Z,$){let K=J.getContext(),U=Z.defines,H=Z.vertexShader,Y=Z.fragmentShader,W=dD(Z),X=cD(Z),G=sD(Z),q=oD(Z),N=aD(Z),D=yD(Z),M=fD(U),V=K.createProgram(),F,O,z=Z.glslVersion?"#version "+Z.glslVersion+`
`:"";if(Z.isRawShaderMaterial){if(F=["#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,M].filter(aQ).join(`
`),F.length>0)F+=`
`;if(O=["#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,M].filter(aQ).join(`
`),O.length>0)O+=`
`}else F=[H5(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,M,Z.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Z.batching?"#define USE_BATCHING":"",Z.batchingColor?"#define USE_BATCHING_COLOR":"",Z.instancing?"#define USE_INSTANCING":"",Z.instancingColor?"#define USE_INSTANCING_COLOR":"",Z.instancingMorph?"#define USE_INSTANCING_MORPH":"",Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.map?"#define USE_MAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+G:"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.displacementMap?"#define USE_DISPLACEMENTMAP":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.mapUv?"#define MAP_UV "+Z.mapUv:"",Z.alphaMapUv?"#define ALPHAMAP_UV "+Z.alphaMapUv:"",Z.lightMapUv?"#define LIGHTMAP_UV "+Z.lightMapUv:"",Z.aoMapUv?"#define AOMAP_UV "+Z.aoMapUv:"",Z.emissiveMapUv?"#define EMISSIVEMAP_UV "+Z.emissiveMapUv:"",Z.bumpMapUv?"#define BUMPMAP_UV "+Z.bumpMapUv:"",Z.normalMapUv?"#define NORMALMAP_UV "+Z.normalMapUv:"",Z.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Z.displacementMapUv:"",Z.metalnessMapUv?"#define METALNESSMAP_UV "+Z.metalnessMapUv:"",Z.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Z.roughnessMapUv:"",Z.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Z.anisotropyMapUv:"",Z.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Z.clearcoatMapUv:"",Z.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Z.clearcoatNormalMapUv:"",Z.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Z.clearcoatRoughnessMapUv:"",Z.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Z.iridescenceMapUv:"",Z.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Z.iridescenceThicknessMapUv:"",Z.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Z.sheenColorMapUv:"",Z.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Z.sheenRoughnessMapUv:"",Z.specularMapUv?"#define SPECULARMAP_UV "+Z.specularMapUv:"",Z.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Z.specularColorMapUv:"",Z.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Z.specularIntensityMapUv:"",Z.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Z.transmissionMapUv:"",Z.thicknessMapUv?"#define THICKNESSMAP_UV "+Z.thicknessMapUv:"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexNormals?"#define HAS_NORMAL":"",Z.vertexColors?"#define USE_COLOR":"",Z.vertexAlphas?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.flatShading?"#define FLAT_SHADED":"",Z.skinning?"#define USE_SKINNING":"",Z.morphTargets?"#define USE_MORPHTARGETS":"",Z.morphNormals&&Z.flatShading===!1?"#define USE_MORPHNORMALS":"",Z.morphColors?"#define USE_MORPHCOLORS":"",Z.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+Z.morphTextureStride:"",Z.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+Z.morphTargetsCount:"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+W:"",Z.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",Z.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(aQ).join(`
`),O=[H5(Z),"#define SHADER_TYPE "+Z.shaderType,"#define SHADER_NAME "+Z.shaderName,M,Z.useFog&&Z.fog?"#define USE_FOG":"",Z.useFog&&Z.fogExp2?"#define FOG_EXP2":"",Z.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",Z.map?"#define USE_MAP":"",Z.matcap?"#define USE_MATCAP":"",Z.envMap?"#define USE_ENVMAP":"",Z.envMap?"#define "+X:"",Z.envMap?"#define "+G:"",Z.envMap?"#define "+q:"",N?"#define CUBEUV_TEXEL_WIDTH "+N.texelWidth:"",N?"#define CUBEUV_TEXEL_HEIGHT "+N.texelHeight:"",N?"#define CUBEUV_MAX_MIP "+N.maxMip+".0":"",Z.lightMap?"#define USE_LIGHTMAP":"",Z.aoMap?"#define USE_AOMAP":"",Z.bumpMap?"#define USE_BUMPMAP":"",Z.normalMap?"#define USE_NORMALMAP":"",Z.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Z.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Z.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",Z.emissiveMap?"#define USE_EMISSIVEMAP":"",Z.anisotropy?"#define USE_ANISOTROPY":"",Z.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Z.clearcoat?"#define USE_CLEARCOAT":"",Z.clearcoatMap?"#define USE_CLEARCOATMAP":"",Z.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Z.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Z.dispersion?"#define USE_DISPERSION":"",Z.retroreflection?"#define USE_RETROREFLECTION":"",Z.iridescence?"#define USE_IRIDESCENCE":"",Z.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Z.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Z.specularMap?"#define USE_SPECULARMAP":"",Z.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Z.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Z.roughnessMap?"#define USE_ROUGHNESSMAP":"",Z.metalnessMap?"#define USE_METALNESSMAP":"",Z.alphaMap?"#define USE_ALPHAMAP":"",Z.alphaTest?"#define USE_ALPHATEST":"",Z.alphaHash?"#define USE_ALPHAHASH":"",Z.sheen?"#define USE_SHEEN":"",Z.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Z.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Z.transmission?"#define USE_TRANSMISSION":"",Z.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Z.thicknessMap?"#define USE_THICKNESSMAP":"",Z.vertexTangents&&Z.flatShading===!1?"#define USE_TANGENT":"",Z.vertexColors||Z.instancingColor?"#define USE_COLOR":"",Z.vertexAlphas||Z.batchingColor?"#define USE_COLOR_ALPHA":"",Z.vertexUv1s?"#define USE_UV1":"",Z.vertexUv2s?"#define USE_UV2":"",Z.vertexUv3s?"#define USE_UV3":"",Z.pointsUvs?"#define USE_POINTS_UV":"",Z.gradientMap?"#define USE_GRADIENTMAP":"",Z.flatShading?"#define FLAT_SHADED":"",Z.doubleSided?"#define DOUBLE_SIDED":"",Z.flipSided?"#define FLIP_SIDED":"",Z.shadowMapEnabled?"#define USE_SHADOWMAP":"",Z.shadowMapEnabled?"#define "+W:"",Z.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Z.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Z.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",Z.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Z.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",Z.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",Z.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Z.toneMapping!==B8?"#define TONE_MAPPING":"",Z.toneMapping!==B8?I9.tonemapping_pars_fragment:"",Z.toneMapping!==B8?jD("toneMapping",Z.toneMapping):"",Z.dithering?"#define DITHERING":"",Z.opaque?"#define OPAQUE":"",I9.colorspace_pars_fragment,SD("linearToOutputTexel",Z.outputColorSpace),vD(),Z.useDepthPacking?"#define DEPTH_PACKING "+Z.depthPacking:"",`
`].filter(aQ).join(`
`);if(H=ZH(H),H=$5(H,Z),H=K5(H,Z),Y=ZH(Y),Y=$5(Y,Z),Y=K5(Y,Z),H=U5(H),Y=U5(Y),Z.isRawShaderMaterial!==!0)z=`#version 300 es
`,F=[D,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+F,O=["#define varying in",Z.glslVersion===EU?"":"layout(location = 0) out highp vec4 pc_fragColor;",Z.glslVersion===EU?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+O;let C=z+F+H,R=z+O+Y,B=J5(K,K.VERTEX_SHADER,C),_=J5(K,K.FRAGMENT_SHADER,R);if(K.attachShader(V,B),K.attachShader(V,_),Z.index0AttributeName!==void 0)K.bindAttribLocation(V,0,Z.index0AttributeName);else if(Z.hasPositionAttribute===!0)K.bindAttribLocation(V,0,"position");K.linkProgram(V);function P(S){if(J.debug.checkShaderErrors){let b=K.getProgramInfoLog(V)||"",e=K.getShaderInfoLog(B)||"",v=K.getShaderInfoLog(_)||"",l=b.trim(),U0=e.trim(),i=v.trim(),r=!0,u=!0;if(K.getProgramParameter(V,K.LINK_STATUS)===!1)if(r=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,V,B,_);else{let h=Z5(K,B,"vertex"),H0=Z5(K,_,"fragment");X9("WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(V,K.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+l+`
`+h+`
`+H0)}else if(l!=="")H9("WebGLProgram: Program Info Log:",l);else if(U0===""||i==="")u=!1;if(u)S.diagnostics={runnable:r,programLog:l,vertexShader:{log:U0,prefix:F},fragmentShader:{log:i,prefix:O}}}K.deleteShader(B),K.deleteShader(_),E=new rQ(K,V),A=bD(K,V)}let E;this.getUniforms=function(){if(E===void 0)P(this);return E};let A;this.getAttributes=function(){if(A===void 0)P(this);return A};let y=Z.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(y===!1)y=K.getProgramParameter(V,CD);return y},this.destroy=function(){$.releaseStatesOfProgram(this),K.deleteProgram(V),this.program=void 0},this.type=Z.shaderType,this.name=Z.shaderName,this.id=LD++,this.cacheKey=Q,this.usedTimes=1,this.program=V,this.vertexShader=B,this.fragmentShader=_,this}var tD=0;class I5{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,Z){let $=this._getShaderCacheForMaterial(J);if($.has(Q)===!1)$.add(Q),Q.usedTimes++;if($.has(Z)===!1)$.add(Z),Z.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let Z of Q)if(Z.usedTimes--,Z.usedTimes===0)this.shaderCache.delete(Z.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,Z=Q.get(J);if(Z===void 0)Z=new Set,Q.set(J,Z);return Z}_getShaderStage(J){let Q=this.shaderCache,Z=Q.get(J);if(Z===void 0)Z=new B5(J),Q.set(J,Z);return Z}}class B5{constructor(J){this.id=tD++,this.code=J,this.usedTimes=0}}function eD(J){return J===nJ||J===G$||J===N$}function JF(J,Q,Z,$,K,U){let H=new O$,Y=new I5,W=new Set,X=[],G=new Map,q=$.logarithmicDepthBuffer,N=$.precision,D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(E){if(W.add(E),E===0)return"uv";return`uv${E}`}function V(E,A,y,S,b,e){let v=S.fog,l=b.geometry,U0=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?S.environment:null,i=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,r=Q.get(E.envMap||U0,i),u=!!r&&r.mapping===vQ?r.image.height:null,h=D[E.type];if(E.precision!==null){if(N=$.getMaxPrecision(E.precision),N!==E.precision)H9("WebGLProgram.getParameters:",E.precision,"not supported, using",N,"instead.")}let H0=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,E0=H0!==void 0?H0.length:0,L0=0;if(l.morphAttributes.position!==void 0)L0=1;if(l.morphAttributes.normal!==void 0)L0=2;if(l.morphAttributes.color!==void 0)L0=3;let d,D0,s,G0;if(h){let $7=n8[h];d=$7.vertexShader,D0=$7.fragmentShader}else{d=E.vertexShader,D0=E.fragmentShader;let $7=Y.getVertexShaderStage(E),c9=Y.getFragmentShaderStage(E);Y.update(E,$7,c9),s=$7.id,G0=c9.id}let X0=J.getRenderTarget(),c=J.state.buffers.depth.getReversed(),C0=b.isInstancedMesh===!0,t=b.isBatchedMesh===!0,u0=!!E.map,K0=!!E.matcap,R0=!!r,B0=!!E.aoMap,A0=!!E.lightMap,w0=!!E.bumpMap&&E.wireframe===!1,r0=!!E.normalMap,Q9=!!E.displacementMap,O9=!!E.emissiveMap,M9=!!E.metalnessMap,x=!!E.roughnessMap,a9=E.anisotropy>0,_9=E.clearcoat>0,C9=E.dispersion>0,w=E.retroreflectivity>0,L=E.iridescence>0,g=E.sheen>0,Q0=E.transmission>0,V0=a9&&!!E.anisotropyMap,z0=_9&&!!E.clearcoatMap,S0=_9&&!!E.clearcoatNormalMap,W0=_9&&!!E.clearcoatRoughnessMap,F0=L&&!!E.iridescenceMap,p0=L&&!!E.iridescenceThicknessMap,t0=g&&!!E.sheenColorMap,v0=g&&!!E.sheenRoughnessMap,P0=!!E.specularMap,Z9=!!E.specularColorMap,Y9=!!E.specularIntensityMap,g9=Q0&&!!E.transmissionMap,m=Q0&&!!E.thicknessMap,k0=!!E.gradientMap,N0=!!E.alphaMap,j0=E.alphaTest>0,m0=!!E.alphaHash,I0=!!E.extensions,b0=B8;if(E.toneMapped){if(X0===null||X0.isXRRenderTarget===!0)b0=J.toneMapping}let R9={shaderID:h,shaderType:E.type,shaderName:E.name,vertexShader:d,fragmentShader:D0,defines:E.defines,customVertexShaderID:s,customFragmentShaderID:G0,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:N,batching:t,batchingColor:t&&b._colorsTexture!==null,instancing:C0,instancingColor:C0&&b.instanceColor!==null,instancingMorph:C0&&b.morphTexture!==null,outputColorSpace:X0===null?J.outputColorSpace:X0.isXRRenderTarget===!0?X0.texture.colorSpace:A9.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:u0,matcap:K0,envMap:R0,envMapMode:R0&&r.mapping,envMapCubeUVHeight:u,aoMap:B0,lightMap:A0,bumpMap:w0,normalMap:r0,displacementMap:Q9,emissiveMap:O9,normalMapObjectSpace:r0&&E.normalMapType===IW,normalMapTangentSpace:r0&&E.normalMapType===OU,packedNormalMap:r0&&E.normalMapType===OU&&eD(E.normalMap.format),metalnessMap:M9,roughnessMap:x,anisotropy:a9,anisotropyMap:V0,clearcoat:_9,clearcoatMap:z0,clearcoatNormalMap:S0,clearcoatRoughnessMap:W0,dispersion:C9,retroreflection:w,iridescence:L,iridescenceMap:F0,iridescenceThicknessMap:p0,sheen:g,sheenColorMap:t0,sheenRoughnessMap:v0,specularMap:P0,specularColorMap:Z9,specularIntensityMap:Y9,transmission:Q0,transmissionMap:g9,thicknessMap:m,gradientMap:k0,opaque:E.transparent===!1&&E.blending===CQ&&E.alphaToCoverage===!1,alphaMap:N0,alphaTest:j0,alphaHash:m0,combine:E.combine,mapUv:u0&&M(E.map.channel),aoMapUv:B0&&M(E.aoMap.channel),lightMapUv:A0&&M(E.lightMap.channel),bumpMapUv:w0&&M(E.bumpMap.channel),normalMapUv:r0&&M(E.normalMap.channel),displacementMapUv:Q9&&M(E.displacementMap.channel),emissiveMapUv:O9&&M(E.emissiveMap.channel),metalnessMapUv:M9&&M(E.metalnessMap.channel),roughnessMapUv:x&&M(E.roughnessMap.channel),anisotropyMapUv:V0&&M(E.anisotropyMap.channel),clearcoatMapUv:z0&&M(E.clearcoatMap.channel),clearcoatNormalMapUv:S0&&M(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W0&&M(E.clearcoatRoughnessMap.channel),iridescenceMapUv:F0&&M(E.iridescenceMap.channel),iridescenceThicknessMapUv:p0&&M(E.iridescenceThicknessMap.channel),sheenColorMapUv:t0&&M(E.sheenColorMap.channel),sheenRoughnessMapUv:v0&&M(E.sheenRoughnessMap.channel),specularMapUv:P0&&M(E.specularMap.channel),specularColorMapUv:Z9&&M(E.specularColorMap.channel),specularIntensityMapUv:Y9&&M(E.specularIntensityMap.channel),transmissionMapUv:g9&&M(E.transmissionMap.channel),thicknessMapUv:m&&M(E.thicknessMap.channel),alphaMapUv:N0&&M(E.alphaMap.channel),vertexTangents:!!l.attributes.tangent&&(r0||a9),vertexNormals:!!l.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!l.attributes.color&&l.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!l.attributes.uv&&(u0||N0),fog:!!v,useFog:E.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||l.attributes.normal===void 0&&r0===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:q,reversedDepthBuffer:c,skinning:b.isSkinnedMesh===!0,hasPositionAttribute:l.attributes.position!==void 0,morphTargets:l.morphAttributes.position!==void 0,morphNormals:l.morphAttributes.normal!==void 0,morphColors:l.morphAttributes.color!==void 0,morphTargetsCount:E0,morphTextureStride:L0,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:e.length,numClippingPlanes:U.numPlanes,numClipIntersection:U.numIntersection,dithering:E.dithering,shadowMapEnabled:J.shadowMap.enabled&&y.length>0,shadowMapType:J.shadowMap.type,toneMapping:b0,decodeVideoTexture:u0&&E.map.isVideoTexture===!0&&A9.getTransfer(E.map.colorSpace)===o9,decodeVideoTextureEmissive:O9&&E.emissiveMap.isVideoTexture===!0&&A9.getTransfer(E.emissiveMap.colorSpace)===o9,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===m9,flipSided:E.side===B7,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:I0&&E.extensions.clipCullDistance===!0&&Z.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(I0&&E.extensions.multiDraw===!0||t)&&Z.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:Z.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return R9.vertexUv1s=W.has(1),R9.vertexUv2s=W.has(2),R9.vertexUv3s=W.has(3),W.clear(),R9}function F(E){let A=[];if(E.shaderID)A.push(E.shaderID);else A.push(E.customVertexShaderID),A.push(E.customFragmentShaderID);if(E.defines!==void 0)for(let y in E.defines)A.push(y),A.push(E.defines[y]);if(E.isRawShaderMaterial===!1)O(A,E),z(A,E),A.push(J.outputColorSpace);return A.push(E.customProgramCacheKey),A.join()}function O(E,A){E.push(A.precision),E.push(A.outputColorSpace),E.push(A.envMapMode),E.push(A.envMapCubeUVHeight),E.push(A.mapUv),E.push(A.alphaMapUv),E.push(A.lightMapUv),E.push(A.aoMapUv),E.push(A.bumpMapUv),E.push(A.normalMapUv),E.push(A.displacementMapUv),E.push(A.emissiveMapUv),E.push(A.metalnessMapUv),E.push(A.roughnessMapUv),E.push(A.anisotropyMapUv),E.push(A.clearcoatMapUv),E.push(A.clearcoatNormalMapUv),E.push(A.clearcoatRoughnessMapUv),E.push(A.iridescenceMapUv),E.push(A.iridescenceThicknessMapUv),E.push(A.sheenColorMapUv),E.push(A.sheenRoughnessMapUv),E.push(A.specularMapUv),E.push(A.specularColorMapUv),E.push(A.specularIntensityMapUv),E.push(A.transmissionMapUv),E.push(A.thicknessMapUv),E.push(A.combine),E.push(A.fogExp2),E.push(A.sizeAttenuation),E.push(A.morphTargetsCount),E.push(A.morphAttributeCount),E.push(A.numSunLights),E.push(A.numDirLights),E.push(A.numPointLights),E.push(A.numSpotLights),E.push(A.numSpotLightMaps),E.push(A.numHemiLights),E.push(A.numRectAreaLights),E.push(A.numSunLightShadows),E.push(A.numDirLightShadows),E.push(A.numPointLightShadows),E.push(A.numSpotLightShadows),E.push(A.numSpotLightShadowsWithMaps),E.push(A.numLightProbes),E.push(A.shadowMapType),E.push(A.toneMapping),E.push(A.numClippingPlanes),E.push(A.numClipIntersection),E.push(A.depthPacking)}function z(E,A){if(H.disableAll(),A.instancing)H.enable(0);if(A.instancingColor)H.enable(1);if(A.instancingMorph)H.enable(2);if(A.matcap)H.enable(3);if(A.envMap)H.enable(4);if(A.normalMapObjectSpace)H.enable(5);if(A.normalMapTangentSpace)H.enable(6);if(A.clearcoat)H.enable(7);if(A.iridescence)H.enable(8);if(A.alphaTest)H.enable(9);if(A.vertexColors)H.enable(10);if(A.vertexAlphas)H.enable(11);if(A.vertexUv1s)H.enable(12);if(A.vertexUv2s)H.enable(13);if(A.vertexUv3s)H.enable(14);if(A.vertexTangents)H.enable(15);if(A.anisotropy)H.enable(16);if(A.alphaHash)H.enable(17);if(A.batching)H.enable(18);if(A.dispersion)H.enable(19);if(A.retroreflection)H.enable(24);if(A.batchingColor)H.enable(20);if(A.gradientMap)H.enable(21);if(A.packedNormalMap)H.enable(22);if(A.vertexNormals)H.enable(23);if(E.push(H.mask),H.disableAll(),A.fog)H.enable(0);if(A.useFog)H.enable(1);if(A.flatShading)H.enable(2);if(A.logarithmicDepthBuffer)H.enable(3);if(A.reversedDepthBuffer)H.enable(4);if(A.skinning)H.enable(5);if(A.morphTargets)H.enable(6);if(A.morphNormals)H.enable(7);if(A.morphColors)H.enable(8);if(A.premultipliedAlpha)H.enable(9);if(A.shadowMapEnabled)H.enable(10);if(A.doubleSided)H.enable(11);if(A.flipSided)H.enable(12);if(A.useDepthPacking)H.enable(13);if(A.dithering)H.enable(14);if(A.transmission)H.enable(15);if(A.sheen)H.enable(16);if(A.opaque)H.enable(17);if(A.pointsUvs)H.enable(18);if(A.decodeVideoTexture)H.enable(19);if(A.decodeVideoTextureEmissive)H.enable(20);if(A.alphaToCoverage)H.enable(21);if(A.numLightProbeGrids>0)H.enable(22);if(A.hasPositionAttribute)H.enable(23);E.push(H.mask)}function C(E){let A=D[E.type],y;if(A){let S=n8[A];y=T8.clone(S.uniforms)}else y=E.uniforms;return y}function R(E,A){let y=G.get(A);if(y!==void 0)++y.usedTimes;else y=new rD(J,A,E,K),X.push(y),G.set(A,y);return y}function B(E){if(--E.usedTimes===0){let A=X.indexOf(E);X[A]=X[X.length-1],X.pop(),G.delete(E.cacheKey),E.destroy()}}function _(E){Y.remove(E)}function P(){Y.dispose()}return{getParameters:V,getProgramCacheKey:F,getUniforms:C,acquireProgram:R,releaseProgram:B,releaseShaderCache:_,programs:X,dispose:P}}function QF(){let J=new WeakMap;function Q(H){return J.has(H)}function Z(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function $(H){J.delete(H)}function K(H,Y,W){J.get(H)[Y]=W}function U(){J=new WeakMap}return{has:Q,get:Z,remove:$,update:K,dispose:U}}function ZF(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function Y5(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function W5(){let J=[],Q=0,Z=[],$=[],K=[];function U(){Q=0,Z.length=0,$.length=0,K.length=0}function H(N){let D=0;if(N.isInstancedMesh)D+=2;if(N.isSkinnedMesh)D+=1;return D}function Y(N,D,M,V,F,O){let z=J[Q];if(z===void 0)z={id:N.id,object:N,geometry:D,material:M,materialVariant:H(N),groupOrder:V,renderOrder:N.renderOrder,z:F,group:O},J[Q]=z;else z.id=N.id,z.object=N,z.geometry=D,z.material=M,z.materialVariant=H(N),z.groupOrder=V,z.renderOrder=N.renderOrder,z.z=F,z.group=O;return Q++,z}function W(N,D,M,V,F,O,z){if(z.reversedDepth===!0)F=-F;let C=Y(N,D,M,V,F,O);if(M.transmission>0)$.push(C);else if(M.transparent===!0)K.push(C);else Z.push(C)}function X(N,D,M,V,F,O){let z=Y(N,D,M,V,F,O);if(M.transmission>0)$.unshift(z);else if(M.transparent===!0)K.unshift(z);else Z.unshift(z)}function G(N,D){if(Z.length>1)Z.sort(N||ZF);if($.length>1)$.sort(D||Y5);if(K.length>1)K.sort(D||Y5)}function q(){for(let N=Q,D=J.length;N<D;N++){let M=J[N];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:Z,transmissive:$,transparent:K,init:U,push:W,unshift:X,finish:q,sort:G}}function $F(){let J=new WeakMap;function Q($,K){let U=J.get($),H;if(U===void 0)H=new W5,J.set($,[H]);else if(K>=U.length)H=new W5,U.push(H);else H=U[K];return H}function Z(){J=new WeakMap}return{get:Q,dispose:Z}}function KF(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let Z;switch(Q.type){case"SunLight":case"DirectionalLight":Z={direction:new k,color:new Y0};break;case"SpotLight":Z={position:new k,direction:new k,color:new Y0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Z={position:new k,color:new Y0,distance:0,decay:0};break;case"HemisphereLight":Z={direction:new k,skyColor:new Y0,groundColor:new Y0};break;case"RectAreaLight":Z={color:new Y0,position:new k,halfWidth:new k,halfHeight:new k};break}return J[Q.id]=Z,Z}}}function UF(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let Z;switch(Q.type){case"SunLight":case"DirectionalLight":Z={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q0};break;case"SpotLight":Z={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q0};break;case"PointLight":Z={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=Z,Z}}}var HF=0;function YF(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function WF(J){let Q=new KF,Z=UF(),$={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let X=0;X<9;X++)$.probe.push(new k);let K=new k,U=new x9,H=new x9;function Y(X){let G=0,q=0,N=0;for(let b=0;b<9;b++)$.probe[b].set(0,0,0);let D=0,M=0,V=0,F=0,O=0,z=0,C=0,R=0,B=0,_=0,P=0,E=0,A=0,y=0;X.sort(YF);for(let b=0,e=X.length;b<e;b++){let v=X[b],l=v.color,U0=v.intensity,i=v.distance,r=null;if(v.shadow&&v.shadow.map)if(v.shadow.map.texture.format===nJ)r=v.shadow.map.texture;else r=v.shadow.map.depthTexture||v.shadow.map.texture;if(v.isAmbientLight)G+=l.r*U0,q+=l.g*U0,N+=l.b*U0;else if(v.isLightProbe){for(let u=0;u<9;u++)$.probe[u].addScaledVector(v.sh.coefficients[u],U0);y++}else if(v.isSunLight){let u=Q.get(v);if(u.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){let h=v.shadow,H0=Z.get(v);H0.shadowIntensity=h.intensity,H0.shadowBias=h.bias,H0.shadowNormalBias=h.normalBias,H0.shadowRadius=h.radius,H0.shadowMapSize.copy(h.mapSize).multiply(h.getFrameExtents()),$.sunShadow[M]=H0,$.sunShadowMap[M]=r;let E0=h.getViewportCount();for(let L0=0;L0<E0;L0++)$.sunShadowMatrix[V+L0]=h.getMatrix(L0),$.sunShadowCascade[V+L0]=h._cascadeData[L0];V+=E0,M++}$.sun[D]=u,D++}else if(v.isDirectionalLight){let u=Q.get(v);if(u.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){let h=v.shadow,H0=Z.get(v);H0.shadowIntensity=h.intensity,H0.shadowBias=h.bias,H0.shadowNormalBias=h.normalBias,H0.shadowRadius=h.radius,H0.shadowMapSize=h.mapSize,$.directionalShadow[F]=H0,$.directionalShadowMap[F]=r,$.directionalShadowMatrix[F]=v.shadow.matrix,B++}$.directional[F]=u,F++}else if(v.isSpotLight){let u=Q.get(v);u.position.setFromMatrixPosition(v.matrixWorld),u.color.copy(l).multiplyScalar(U0),u.distance=i,u.coneCos=Math.cos(v.angle),u.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),u.decay=v.decay,$.spot[z]=u;let h=v.shadow;if(v.map){if($.spotLightMap[E]=v.map,E++,h.updateMatrices(v),v.castShadow)A++}if($.spotLightMatrix[z]=h.matrix,v.castShadow){let H0=Z.get(v);H0.shadowIntensity=h.intensity,H0.shadowBias=h.bias,H0.shadowNormalBias=h.normalBias,H0.shadowRadius=h.radius,H0.shadowMapSize=h.mapSize,$.spotShadow[z]=H0,$.spotShadowMap[z]=r,P++}z++}else if(v.isRectAreaLight){let u=Q.get(v);u.color.copy(l).multiplyScalar(U0),u.halfWidth.set(v.width*0.5,0,0),u.halfHeight.set(0,v.height*0.5,0),$.rectArea[C]=u,C++}else if(v.isPointLight){let u=Q.get(v);if(u.color.copy(v.color).multiplyScalar(v.intensity),u.distance=v.distance,u.decay=v.decay,v.castShadow){let h=v.shadow,H0=Z.get(v);H0.shadowIntensity=h.intensity,H0.shadowBias=h.bias,H0.shadowNormalBias=h.normalBias,H0.shadowRadius=h.radius,H0.shadowMapSize=h.mapSize,H0.shadowCameraNear=h.camera.near,H0.shadowCameraFar=h.camera.far,$.pointShadow[O]=H0,$.pointShadowMap[O]=r,$.pointShadowMatrix[O]=v.shadow.matrix,_++}$.point[O]=u,O++}else if(v.isHemisphereLight){let u=Q.get(v);u.skyColor.copy(v.color).multiplyScalar(U0),u.groundColor.copy(v.groundColor).multiplyScalar(U0),$.hemi[R]=u,R++}}if(C>0)if(J.has("OES_texture_float_linear")===!0)$.rectAreaLTC1=y0.LTC_FLOAT_1,$.rectAreaLTC2=y0.LTC_FLOAT_2;else $.rectAreaLTC1=y0.LTC_HALF_1,$.rectAreaLTC2=y0.LTC_HALF_2;$.ambient[0]=G,$.ambient[1]=q,$.ambient[2]=N;let S=$.hash;if(S.sunLength!==D||S.directionalLength!==F||S.pointLength!==O||S.spotLength!==z||S.rectAreaLength!==C||S.hemiLength!==R||S.numSunShadows!==M||S.numDirectionalShadows!==B||S.numPointShadows!==_||S.numSpotShadows!==P||S.numSpotMaps!==E||S.numLightProbes!==y)$.sun.length=D,$.directional.length=F,$.spot.length=z,$.rectArea.length=C,$.point.length=O,$.hemi.length=R,$.sunShadow.length=M,$.sunShadowMap.length=M,$.sunShadowMatrix.length=V,$.sunShadowCascade.length=V,$.directionalShadow.length=B,$.directionalShadowMap.length=B,$.directionalShadowMatrix.length=B,$.pointShadow.length=_,$.pointShadowMap.length=_,$.pointShadowMatrix.length=_,$.spotShadow.length=P,$.spotShadowMap.length=P,$.spotLightMatrix.length=P+E-A,$.spotLightMap.length=E,$.numSpotLightShadowsWithMaps=A,$.numLightProbes=y,S.sunLength=D,S.directionalLength=F,S.pointLength=O,S.spotLength=z,S.rectAreaLength=C,S.hemiLength=R,S.numSunShadows=M,S.numDirectionalShadows=B,S.numPointShadows=_,S.numSpotShadows=P,S.numSpotMaps=E,S.numLightProbes=y,$.version=HF++}function W(X,G){let q=0,N=0,D=0,M=0,V=0,F=0,O=G.matrixWorldInverse;for(let z=0,C=X.length;z<C;z++){let R=X[z];if(R.isSunLight){let B=$.sun[q];B.direction.setFromMatrixPosition(R.matrixWorld),B.direction.transformDirection(O),q++}else if(R.isDirectionalLight){let B=$.directional[N];B.direction.setFromMatrixPosition(R.matrixWorld),K.setFromMatrixPosition(R.target.matrixWorld),B.direction.sub(K),B.direction.transformDirection(O),N++}else if(R.isSpotLight){let B=$.spot[M];B.position.setFromMatrixPosition(R.matrixWorld),B.position.applyMatrix4(O),B.direction.setFromMatrixPosition(R.matrixWorld),K.setFromMatrixPosition(R.target.matrixWorld),B.direction.sub(K),B.direction.transformDirection(O),M++}else if(R.isRectAreaLight){let B=$.rectArea[V];B.position.setFromMatrixPosition(R.matrixWorld),B.position.applyMatrix4(O),H.identity(),U.copy(R.matrixWorld),U.premultiply(O),H.extractRotation(U),B.halfWidth.set(R.width*0.5,0,0),B.halfHeight.set(0,R.height*0.5,0),B.halfWidth.applyMatrix4(H),B.halfHeight.applyMatrix4(H),V++}else if(R.isPointLight){let B=$.point[D];B.position.setFromMatrixPosition(R.matrixWorld),B.position.applyMatrix4(O),D++}else if(R.isHemisphereLight){let B=$.hemi[F];B.direction.setFromMatrixPosition(R.matrixWorld),B.direction.transformDirection(O),F++}}}return{setup:Y,setupView:W,state:$}}function X5(J){let Q=new WF(J),Z=[],$=[],K=[];function U(N){q.camera=N,Z.length=0,$.length=0,K.length=0}function H(N){Z.push(N)}function Y(N){$.push(N)}function W(N){K.push(N)}function X(){Q.setup(Z)}function G(N){Q.setupView(Z,N)}let q={lightsArray:Z,shadowsArray:$,lightProbeGridArray:K,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:U,state:q,setupLights:X,setupLightsView:G,pushLight:H,pushShadow:Y,pushLightProbeGrid:W}}function XF(J){let Q=new WeakMap;function Z(K,U=0){let H=Q.get(K),Y;if(H===void 0)Y=new X5(J),Q.set(K,[Y]);else if(U>=H.length)Y=new X5(J),H.push(Y);else Y=H[U];return Y}function $(){Q=new WeakMap}return{get:Z,dispose:$}}var GF=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,NF=`uniform sampler2D shadow_pass;
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
}`,qF=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],DF=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],G5=new x9,oQ=new k,eU=new k;function FF(J,Q,Z){let $=new gQ,K=new q0,U=new q0,H=new X7,Y=new nQ,W=new kU,X={},G=Z.maxTextureSize,q={[u6]:B7,[B7]:u6,[m9]:m9},N=new v9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new q0},radius:{value:4}},vertexShader:GF,fragmentShader:NF}),D=N.clone();D.defines.HORIZONTAL_PASS=1;let M=new q9;M.setAttribute("position",new u9(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let V=new f(M,N),F=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=PQ;let O=this.type;this.render=function(_,P,E){if(F.enabled===!1)return;if(F.autoUpdate===!1&&F.needsUpdate===!1)return;if(_.length===0)return;if(this.type===LJ)H9("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=PQ;let A=J.getRenderTarget(),y=J.getActiveCubeFace(),S=J.getActiveMipmapLevel(),b=J.state;if(b.setBlending(s7),b.buffers.depth.getReversed()===!0)b.buffers.color.setClear(0,0,0,0);else b.buffers.color.setClear(1,1,1,1);b.buffers.depth.setTest(!0),b.setScissorTest(!1);let e=O!==this.type;if(e)P.traverse(function(v){if(v.material)if(Array.isArray(v.material))v.material.forEach((l)=>l.needsUpdate=!0);else v.material.needsUpdate=!0});for(let v=0,l=_.length;v<l;v++){let U0=_[v],i=U0.shadow;if(i===void 0){H9("WebGLShadowMap:",U0,"has no shadow.");continue}if(i.autoUpdate===!1&&i.needsUpdate===!1)continue;K.copy(i.mapSize);let r=i.getFrameExtents();if(K.multiply(r),U.copy(i.mapSize),K.x>G||K.y>G){if(K.x>G)U.x=Math.floor(G/r.x),K.x=U.x*r.x,i.mapSize.x=U.x;if(K.y>G)U.y=Math.floor(G/r.y),K.y=U.y*r.y,i.mapSize.y=U.y}let u=J.state.buffers.depth.getReversed();if(i.camera._reversedDepth=u,i.map===null||e===!0){if(i.map!==null){if(i.map.depthTexture!==null)i.map.depthTexture.dispose(),i.map.depthTexture=null;i.map.dispose()}if(this.type===p6){if(U0.isPointLight){H9("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}i.map=new M7(K.x,K.y,{format:nJ,type:L7,minFilter:i7,magFilter:i7,generateMipmaps:!1}),i.map.texture.name=U0.name+".shadowMap",i.map.depthTexture=new oJ(K.x,K.y,UJ),i.map.depthTexture.name=U0.name+".shadowMapDepth",i.map.depthTexture.format=lJ,i.map.depthTexture.compareFunction=null,i.map.depthTexture.minFilter=U8,i.map.depthTexture.magFilter=U8}else{if(U0.isPointLight)i.map=new $H(K.x),i.map.depthTexture=new PU(K.x,TJ);else i.map=new M7(K.x,K.y),i.map.depthTexture=new oJ(K.x,K.y,TJ);if(i.map.depthTexture.name=U0.name+".shadowMap",i.map.depthTexture.format=lJ,this.type===PQ)i.map.depthTexture.compareFunction=u?D$:q$,i.map.depthTexture.minFilter=i7,i.map.depthTexture.magFilter=i7;else i.map.depthTexture.compareFunction=null,i.map.depthTexture.minFilter=U8,i.map.depthTexture.magFilter=U8}i.camera.updateProjectionMatrix()}if(i.map.isWebGLCubeRenderTarget!==!0&&(i.map.width!==K.x||i.map.height!==K.y))i.map.setSize(K.x,K.y);let h=i.map.isWebGLCubeRenderTarget?6:i.getViewportCount();if(U0.isPointLight!==!0)i.updateMatrices(U0,E);for(let H0=0;H0<h;H0++){let E0=i.getCamera(H0);if(U0.isPointLight){let{camera:L0,matrix:d}=i,D0=U0.distance||L0.far;if(D0!==L0.far)L0.far=D0,L0.updateProjectionMatrix();oQ.setFromMatrixPosition(U0.matrixWorld),L0.position.copy(oQ),eU.copy(L0.position),eU.add(qF[H0]),L0.up.copy(DF[H0]),L0.lookAt(eU),L0.updateMatrixWorld(),d.makeTranslation(-oQ.x,-oQ.y,-oQ.z),G5.multiplyMatrices(L0.projectionMatrix,L0.matrixWorldInverse),i._frustum.setFromProjectionMatrix(G5,L0.coordinateSystem,L0.reversedDepth)}if(i.map.isWebGLCubeRenderTarget)J.setRenderTarget(i.map,H0),J.clear();else{if(H0===0)J.setRenderTarget(i.map),J.clear();let L0=i.getViewport(H0);H.set(U.x*L0.x,U.y*L0.y,U.x*L0.z,U.y*L0.w),b.viewport(H)}$=i.getFrustum(H0),R(P,E,E0,U0,this.type)}if(i.isPointLightShadow!==!0&&this.type===p6)z(i,E);i.needsUpdate=!1}O=this.type,F.needsUpdate=!1,J.setRenderTarget(A,y,S)};function z(_,P){let E=Q.update(V);if(N.defines.VSM_SAMPLES!==_.blurSamples)N.defines.VSM_SAMPLES=_.blurSamples,D.defines.VSM_SAMPLES=_.blurSamples,N.needsUpdate=!0,D.needsUpdate=!0;if(_.mapPass===null)_.mapPass=new M7(K.x,K.y,{format:nJ,type:L7});else if(_.mapPass.width!==_.map.width||_.mapPass.height!==_.map.height)_.mapPass.setSize(_.map.width,_.map.height);N.uniforms.shadow_pass.value=_.map.depthTexture,N.uniforms.resolution.value.set(_.map.width,_.map.height),N.uniforms.radius.value=_.radius,J.setRenderTarget(_.mapPass),J.clear(),J.renderBufferDirect(P,null,E,N,V,null),D.uniforms.shadow_pass.value=_.mapPass.texture,D.uniforms.resolution.value.set(_.map.width,_.map.height),D.uniforms.radius.value=_.radius,J.setRenderTarget(_.map),J.clear(),J.renderBufferDirect(P,null,E,D,V,null)}function C(_,P,E,A){let y=null,S=E.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(S!==void 0)y=S;else if(y=E.isPointLight===!0?W:Y,J.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let b=y.uuid,e=P.uuid,v=X[b];if(v===void 0)v={},X[b]=v;let l=v[e];if(l===void 0)l=y.clone(),v[e]=l,P.addEventListener("dispose",B);y=l}if(y.visible=P.visible,y.wireframe=P.wireframe,A===p6)y.side=P.shadowSide!==null?P.shadowSide:P.side;else y.side=P.shadowSide!==null?P.shadowSide:q[P.side];if(y.alphaMap=P.alphaMap,y.alphaTest=P.alphaToCoverage===!0?0.5:P.alphaTest,y.map=P.map,y.clipShadows=P.clipShadows,y.clippingPlanes=P.clippingPlanes,y.clipIntersection=P.clipIntersection,y.displacementMap=P.displacementMap,y.displacementScale=P.displacementScale,y.displacementBias=P.displacementBias,y.wireframeLinewidth=P.wireframeLinewidth,y.linewidth=P.linewidth,E.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let b=J.properties.get(y);b.light=E}return y}function R(_,P,E,A,y){if(_.visible===!1)return;if(_.layers.test(P.layers)&&(_.isMesh||_.isLine||_.isPoints)){if((_.castShadow||_.receiveShadow&&y===p6)&&(!_.frustumCulled||_.intersectsFrustum($))){_.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,_.matrixWorld);let e=Q.update(_),v=_.material;if(Array.isArray(v)){let l=e.groups;for(let U0=0,i=l.length;U0<i;U0++){let r=l[U0],u=v[r.materialIndex];if(u&&u.visible){let h=C(_,u,A,y);_.onBeforeShadow(J,_,P,E,e,h,r),J.renderBufferDirect(E,null,e,h,_,r),_.onAfterShadow(J,_,P,E,e,h,r)}}}else if(v.visible){let l=C(_,v,A,y);_.onBeforeShadow(J,_,P,E,e,l,null),J.renderBufferDirect(E,null,e,l,_,null),_.onAfterShadow(J,_,P,E,e,l,null)}}}let b=_.children;for(let e=0,v=b.length;e<v;e++)R(b[e],P,E,A,y)}function B(_){_.target.removeEventListener("dispose",B);for(let E in X){let A=X[E],y=_.target.uuid;if(y in A)A[y].dispose(),delete A[y]}}}function OF(J,Q){function Z(){let m=!1,k0=new X7,N0=null,j0=new X7(0,0,0,0);return{setMask:function(m0){if(N0!==m0&&!m)J.colorMask(m0,m0,m0,m0),N0=m0},setLocked:function(m0){m=m0},setClear:function(m0,I0,b0,R9,$7){if($7===!0)m0*=R9,I0*=R9,b0*=R9;if(k0.set(m0,I0,b0,R9),j0.equals(k0)===!1)J.clearColor(m0,I0,b0,R9),j0.copy(k0)},reset:function(){m=!1,N0=null,j0.set(-1,0,0,0)}}}function $(){let m=!1,k0=!1,N0=null,j0=null,m0=null;return{setReversed:function(I0){if(k0!==I0){let b0=Q.get("EXT_clip_control");if(I0)b0.clipControlEXT(b0.LOWER_LEFT_EXT,b0.ZERO_TO_ONE_EXT);else b0.clipControlEXT(b0.LOWER_LEFT_EXT,b0.NEGATIVE_ONE_TO_ONE_EXT);k0=I0;let R9=m0;m0=null,this.setClear(R9)}},getReversed:function(){return k0},setTest:function(I0){if(I0)X0(J.DEPTH_TEST);else c(J.DEPTH_TEST)},setMask:function(I0){if(N0!==I0&&!m)J.depthMask(I0),N0=I0},setFunc:function(I0){if(k0)I0=SW[I0];if(j0!==I0){switch(I0){case QW:J.depthFunc(J.NEVER);break;case ZW:J.depthFunc(J.ALWAYS);break;case $W:J.depthFunc(J.LESS);break;case kK:J.depthFunc(J.LEQUAL);break;case KW:J.depthFunc(J.EQUAL);break;case UW:J.depthFunc(J.GEQUAL);break;case HW:J.depthFunc(J.GREATER);break;case YW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}j0=I0}},setLocked:function(I0){m=I0},setClear:function(I0){if(m0!==I0){if(m0=I0,k0)I0=1-I0;J.clearDepth(I0)}},reset:function(){m=!1,N0=null,j0=null,m0=null,k0=!1}}}function K(){let m=!1,k0=null,N0=null,j0=null,m0=null,I0=null,b0=null,R9=null,$7=null;return{setTest:function(c9){if(!m)if(c9)X0(J.STENCIL_TEST);else c(J.STENCIL_TEST)},setMask:function(c9){if(k0!==c9&&!m)J.stencilMask(c9),k0=c9},setFunc:function(c9,f8,a8){if(N0!==c9||j0!==f8||m0!==a8)J.stencilFunc(c9,f8,a8),N0=c9,j0=f8,m0=a8},setOp:function(c9,f8,a8){if(I0!==c9||b0!==f8||R9!==a8)J.stencilOp(c9,f8,a8),I0=c9,b0=f8,R9=a8},setLocked:function(c9){m=c9},setClear:function(c9){if($7!==c9)J.clearStencil(c9),$7=c9},reset:function(){m=!1,k0=null,N0=null,j0=null,m0=null,I0=null,b0=null,R9=null,$7=null}}}let U=new Z,H=new $,Y=new K,W=new WeakMap,X=new WeakMap,G={},q={},N={},D=new WeakMap,M=[],V=null,F=!1,O=null,z=null,C=null,R=null,B=null,_=null,P=null,E=new Y0(0,0,0),A=0,y=!1,S=null,b=null,e=null,v=null,l=null,U0=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),i=!1,r=0,u=J.getParameter(J.VERSION);if(u.indexOf("WebGL")!==-1)r=parseFloat(/^WebGL (\d)/.exec(u)[1]),i=r>=1;else if(u.indexOf("OpenGL ES")!==-1)r=parseFloat(/^OpenGL ES (\d)/.exec(u)[1]),i=r>=2;let h=null,H0={},E0=J.getParameter(J.SCISSOR_BOX),L0=J.getParameter(J.VIEWPORT),d=new X7().fromArray(E0),D0=new X7().fromArray(L0);function s(m,k0,N0,j0){let m0=new Uint8Array(4),I0=J.createTexture();J.bindTexture(m,I0),J.texParameteri(m,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(m,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let b0=0;b0<N0;b0++)if(m===J.TEXTURE_3D||m===J.TEXTURE_2D_ARRAY)J.texImage3D(k0,0,J.RGBA,1,1,j0,0,J.RGBA,J.UNSIGNED_BYTE,m0);else J.texImage2D(k0+b0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,m0);return I0}let G0={};G0[J.TEXTURE_2D]=s(J.TEXTURE_2D,J.TEXTURE_2D,1),G0[J.TEXTURE_CUBE_MAP]=s(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),G0[J.TEXTURE_2D_ARRAY]=s(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),G0[J.TEXTURE_3D]=s(J.TEXTURE_3D,J.TEXTURE_3D,1,1),U.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),X0(J.DEPTH_TEST),H.setFunc(kK),w0(!1),r0(TK),X0(J.CULL_FACE),B0(s7);function X0(m){if(G[m]!==!0)J.enable(m),G[m]=!0}function c(m){if(G[m]!==!1)J.disable(m),G[m]=!1}function C0(m,k0){if(N[m]!==k0){if(J.bindFramebuffer(m,k0),N[m]=k0,m===J.DRAW_FRAMEBUFFER)N[J.FRAMEBUFFER]=k0;if(m===J.FRAMEBUFFER)N[J.DRAW_FRAMEBUFFER]=k0;return!0}return!1}function t(m,k0){let N0=M,j0=!1;if(m){if(N0=D.get(k0),N0===void 0)N0=[],D.set(k0,N0);let m0=m.textures;if(N0.length!==m0.length||N0[0]!==J.COLOR_ATTACHMENT0){for(let I0=0,b0=m0.length;I0<b0;I0++)N0[I0]=J.COLOR_ATTACHMENT0+I0;N0.length=m0.length,j0=!0}}else if(N0[0]!==J.BACK)N0[0]=J.BACK,j0=!0;if(j0)J.drawBuffers(N0)}function u0(m){if(V!==m)return J.useProgram(m),V=m,!0;return!1}let K0={[m6]:J.FUNC_ADD,[bY]:J.FUNC_SUBTRACT,[xY]:J.FUNC_REVERSE_SUBTRACT};K0[hY]=J.MIN,K0[gY]=J.MAX;let R0={[pY]:J.ZERO,[uY]:J.ONE,[mY]:J.SRC_COLOR,[lY]:J.SRC_ALPHA,[aY]:J.SRC_ALPHA_SATURATE,[iY]:J.DST_COLOR,[nY]:J.DST_ALPHA,[dY]:J.ONE_MINUS_SRC_COLOR,[cY]:J.ONE_MINUS_SRC_ALPHA,[oY]:J.ONE_MINUS_DST_COLOR,[sY]:J.ONE_MINUS_DST_ALPHA,[rY]:J.CONSTANT_COLOR,[tY]:J.ONE_MINUS_CONSTANT_COLOR,[eY]:J.CONSTANT_ALPHA,[JW]:J.ONE_MINUS_CONSTANT_ALPHA};function B0(m,k0,N0,j0,m0,I0,b0,R9,$7,c9){if(m===s7){if(F===!0)c(J.BLEND),F=!1;return}if(F===!1)X0(J.BLEND),F=!0;if(m!==fY){if(m!==O||c9!==y){if(z!==m6||B!==m6)J.blendEquation(J.FUNC_ADD),z=m6,B=m6;if(c9)switch(m){case CQ:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case H7:J.blendFunc(J.ONE,J.ONE);break;case wK:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case SK:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:X9("WebGLState: Invalid blending: ",m);break}else switch(m){case CQ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case H7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case wK:X9("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case SK:X9("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:X9("WebGLState: Invalid blending: ",m);break}C=null,R=null,_=null,P=null,E.set(0,0,0),A=0,O=m,y=c9}return}if(m0=m0||k0,I0=I0||N0,b0=b0||j0,k0!==z||m0!==B)J.blendEquationSeparate(K0[k0],K0[m0]),z=k0,B=m0;if(N0!==C||j0!==R||I0!==_||b0!==P)J.blendFuncSeparate(R0[N0],R0[j0],R0[I0],R0[b0]),C=N0,R=j0,_=I0,P=b0;if(R9.equals(E)===!1||$7!==A)J.blendColor(R9.r,R9.g,R9.b,$7),E.copy(R9),A=$7;O=m,y=!1}function A0(m,k0){m.side===m9?c(J.CULL_FACE):X0(J.CULL_FACE);let N0=m.side===B7;if(k0)N0=!N0;w0(N0),m.blending===CQ&&m.transparent===!1?B0(s7):B0(m.blending,m.blendEquation,m.blendSrc,m.blendDst,m.blendEquationAlpha,m.blendSrcAlpha,m.blendDstAlpha,m.blendColor,m.blendAlpha,m.premultipliedAlpha),H.setFunc(m.depthFunc),H.setTest(m.depthTest),H.setMask(m.depthWrite),U.setMask(m.colorWrite);let j0=m.stencilWrite;if(Y.setTest(j0),j0)Y.setMask(m.stencilWriteMask),Y.setFunc(m.stencilFunc,m.stencilRef,m.stencilFuncMask),Y.setOp(m.stencilFail,m.stencilZFail,m.stencilZPass);O9(m.polygonOffset,m.polygonOffsetFactor,m.polygonOffsetUnits),m.alphaToCoverage===!0?X0(J.SAMPLE_ALPHA_TO_COVERAGE):c(J.SAMPLE_ALPHA_TO_COVERAGE)}function w0(m){if(S!==m){if(m)J.frontFace(J.CW);else J.frontFace(J.CCW);S=m}}function r0(m){if(m!==vY){if(X0(J.CULL_FACE),m!==b)if(m===TK)J.cullFace(J.BACK);else if(m===yY)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else c(J.CULL_FACE);b=m}function Q9(m){if(m!==e){if(i)J.lineWidth(m);e=m}}function O9(m,k0,N0){if(m){if(X0(J.POLYGON_OFFSET_FILL),v!==k0||l!==N0){if(v=k0,l=N0,H.getReversed())k0=-k0;J.polygonOffset(k0,N0)}}else c(J.POLYGON_OFFSET_FILL)}function M9(m){if(m)X0(J.SCISSOR_TEST);else c(J.SCISSOR_TEST)}function x(m){if(m===void 0)m=J.TEXTURE0+U0-1;if(h!==m)J.activeTexture(m),h=m}function a9(m,k0,N0){if(N0===void 0)if(h===null)N0=J.TEXTURE0+U0-1;else N0=h;let j0=H0[N0];if(j0===void 0)j0={type:void 0,texture:void 0},H0[N0]=j0;if(j0.type!==m||j0.texture!==k0){if(h!==N0)J.activeTexture(N0),h=N0;J.bindTexture(m,k0||G0[m]),j0.type=m,j0.texture=k0}}function _9(){let m=H0[h];if(m!==void 0&&m.type!==void 0)J.bindTexture(m.type,null),m.type=void 0,m.texture=void 0}function C9(){try{J.compressedTexImage2D(...arguments)}catch(m){X9("WebGLState:",m)}}function w(){try{J.compressedTexImage3D(...arguments)}catch(m){X9("WebGLState:",m)}}function L(){try{J.texSubImage2D(...arguments)}catch(m){X9("WebGLState:",m)}}function g(){try{J.texSubImage3D(...arguments)}catch(m){X9("WebGLState:",m)}}function Q0(){try{J.compressedTexSubImage2D(...arguments)}catch(m){X9("WebGLState:",m)}}function V0(){try{J.compressedTexSubImage3D(...arguments)}catch(m){X9("WebGLState:",m)}}function z0(){try{J.texStorage2D(...arguments)}catch(m){X9("WebGLState:",m)}}function S0(){try{J.texStorage3D(...arguments)}catch(m){X9("WebGLState:",m)}}function W0(){try{J.texImage2D(...arguments)}catch(m){X9("WebGLState:",m)}}function F0(){try{J.texImage3D(...arguments)}catch(m){X9("WebGLState:",m)}}function p0(m){if(q[m]!==void 0)return q[m];else return J.getParameter(m)}function t0(m,k0){if(q[m]!==k0)J.pixelStorei(m,k0),q[m]=k0}function v0(m){if(d.equals(m)===!1)J.scissor(m.x,m.y,m.z,m.w),d.copy(m)}function P0(m){if(D0.equals(m)===!1)J.viewport(m.x,m.y,m.z,m.w),D0.copy(m)}function Z9(m,k0){let N0=X.get(k0);if(N0===void 0)N0=new WeakMap,X.set(k0,N0);let j0=N0.get(m);if(j0===void 0)j0=J.getUniformBlockIndex(k0,m.name),N0.set(m,j0)}function Y9(m,k0){let j0=X.get(k0).get(m);if(W.get(k0)!==j0)J.uniformBlockBinding(k0,j0,m.__bindingPointIndex),W.set(k0,j0)}function g9(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),G={},q={},h=null,H0={},N={},D=new WeakMap,M=[],V=null,F=!1,O=null,z=null,C=null,R=null,B=null,_=null,P=null,E=new Y0(0,0,0),A=0,y=!1,S=null,b=null,e=null,v=null,l=null,d.set(0,0,J.canvas.width,J.canvas.height),D0.set(0,0,J.canvas.width,J.canvas.height),U.reset(),H.reset(),Y.reset()}return{buffers:{color:U,depth:H,stencil:Y},enable:X0,disable:c,bindFramebuffer:C0,drawBuffers:t,useProgram:u0,setBlending:B0,setMaterial:A0,setFlipSided:w0,setCullFace:r0,setLineWidth:Q9,setPolygonOffset:O9,setScissorTest:M9,activeTexture:x,bindTexture:a9,unbindTexture:_9,compressedTexImage2D:C9,compressedTexImage3D:w,texImage2D:W0,texImage3D:F0,pixelStorei:t0,getParameter:p0,updateUBOMapping:Z9,uniformBlockBinding:Y9,texStorage2D:z0,texStorage3D:S0,texSubImage2D:L,texSubImage3D:g,compressedTexSubImage2D:Q0,compressedTexSubImage3D:V0,scissor:v0,viewport:P0,reset:g9}}function MF(J,Q,Z,$,K,U,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,W=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),X=new q0,G=new WeakMap,q=new Set,N,D=new WeakMap,M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(w){}function V(w,L){return M?new OffscreenCanvas(w,L):EQ("canvas")}function F(w,L,g){let Q0=1,V0=C9(w);if(V0.width>g||V0.height>g)Q0=g/Math.max(V0.width,V0.height);if(Q0<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let z0=Math.floor(Q0*V0.width),S0=Math.floor(Q0*V0.height);if(N===void 0)N=V(z0,S0);let W0=L?V(z0,S0):N;return W0.width=z0,W0.height=S0,W0.getContext("2d").drawImage(w,0,0,z0,S0),H9("WebGLRenderer: Texture has been resized from ("+V0.width+"x"+V0.height+") to ("+z0+"x"+S0+")."),W0}else{if("data"in w)H9("WebGLRenderer: Image in DataTexture is too big ("+V0.width+"x"+V0.height+").");return w}return w}function O(w){return w.generateMipmaps}function z(w){J.generateMipmap(w)}function C(w){if(w.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(w.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function R(w,L,g,Q0,V0,z0=!1){if(w!==null){if(J[w]!==void 0)return J[w];H9("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let S0;if(Q0){if(S0=Q.get("EXT_texture_norm16"),!S0)H9("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let W0=L;if(L===J.RED){if(g===J.FLOAT)W0=J.R32F;if(g===J.HALF_FLOAT)W0=J.R16F;if(g===J.UNSIGNED_BYTE)W0=J.R8;if(g===J.UNSIGNED_SHORT&&S0)W0=S0.R16_EXT;if(g===J.SHORT&&S0)W0=S0.R16_SNORM_EXT}if(L===J.RED_INTEGER){if(g===J.UNSIGNED_BYTE)W0=J.R8UI;if(g===J.UNSIGNED_SHORT)W0=J.R16UI;if(g===J.UNSIGNED_INT)W0=J.R32UI;if(g===J.BYTE)W0=J.R8I;if(g===J.SHORT)W0=J.R16I;if(g===J.INT)W0=J.R32I}if(L===J.RG){if(g===J.FLOAT)W0=J.RG32F;if(g===J.HALF_FLOAT)W0=J.RG16F;if(g===J.UNSIGNED_BYTE)W0=J.RG8;if(g===J.UNSIGNED_SHORT&&S0)W0=S0.RG16_EXT;if(g===J.SHORT&&S0)W0=S0.RG16_SNORM_EXT}if(L===J.RG_INTEGER){if(g===J.UNSIGNED_BYTE)W0=J.RG8UI;if(g===J.UNSIGNED_SHORT)W0=J.RG16UI;if(g===J.UNSIGNED_INT)W0=J.RG32UI;if(g===J.BYTE)W0=J.RG8I;if(g===J.SHORT)W0=J.RG16I;if(g===J.INT)W0=J.RG32I}if(L===J.RGB_INTEGER){if(g===J.UNSIGNED_BYTE)W0=J.RGB8UI;if(g===J.UNSIGNED_SHORT)W0=J.RGB16UI;if(g===J.UNSIGNED_INT)W0=J.RGB32UI;if(g===J.BYTE)W0=J.RGB8I;if(g===J.SHORT)W0=J.RGB16I;if(g===J.INT)W0=J.RGB32I}if(L===J.RGBA_INTEGER){if(g===J.UNSIGNED_BYTE)W0=J.RGBA8UI;if(g===J.UNSIGNED_SHORT)W0=J.RGBA16UI;if(g===J.UNSIGNED_INT)W0=J.RGBA32UI;if(g===J.BYTE)W0=J.RGBA8I;if(g===J.SHORT)W0=J.RGBA16I;if(g===J.INT)W0=J.RGBA32I}if(L===J.RGB){if(g===J.UNSIGNED_SHORT&&S0)W0=S0.RGB16_EXT;if(g===J.SHORT&&S0)W0=S0.RGB16_SNORM_EXT;if(g===J.UNSIGNED_INT_5_9_9_9_REV)W0=J.RGB9_E5;if(g===J.UNSIGNED_INT_10F_11F_11F_REV)W0=J.R11F_G11F_B10F}if(L===J.RGBA){let F0=z0?RU:A9.getTransfer(V0);if(g===J.FLOAT)W0=J.RGBA32F;if(g===J.HALF_FLOAT)W0=J.RGBA16F;if(g===J.UNSIGNED_BYTE)W0=F0===o9?J.SRGB8_ALPHA8:J.RGBA8;if(g===J.UNSIGNED_SHORT&&S0)W0=S0.RGBA16_EXT;if(g===J.SHORT&&S0)W0=S0.RGBA16_SNORM_EXT;if(g===J.UNSIGNED_SHORT_4_4_4_4)W0=J.RGBA4;if(g===J.UNSIGNED_SHORT_5_5_5_1)W0=J.RGB5_A1}if(W0===J.R16F||W0===J.R32F||W0===J.RG16F||W0===J.RG32F||W0===J.RGBA16F||W0===J.RGBA32F)Q.get("EXT_color_buffer_float");return W0}function B(w,L){let g;if(w){if(L===null||L===TJ||L===l6)g=J.DEPTH24_STENCIL8;else if(L===UJ)g=J.DEPTH32F_STENCIL8;else if(L===fQ)g=J.DEPTH24_STENCIL8,H9("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(L===null||L===TJ||L===l6)g=J.DEPTH_COMPONENT24;else if(L===UJ)g=J.DEPTH_COMPONENT32F;else if(L===fQ)g=J.DEPTH_COMPONENT16;return g}function _(w,L){if(O(w)===!0||w.isFramebufferTexture&&w.minFilter!==U8&&w.minFilter!==i7)return Math.log2(Math.max(L.width,L.height))+1;else if(w.mipmaps!==void 0&&w.mipmaps.length>0)return w.mipmaps.length;else if(w.isCompressedTexture&&Array.isArray(w.image))return L.mipmaps.length;else return 1}function P(w){let L=w.target;if(L.removeEventListener("dispose",P),A(L),L.isVideoTexture)G.delete(L);if(L.isHTMLTexture)q.delete(L)}function E(w){let L=w.target;L.removeEventListener("dispose",E),S(L)}function A(w){let L=$.get(w);if(L.__webglInit===void 0)return;let g=w.source,Q0=D.get(g);if(Q0){let V0=Q0[L.__cacheKey];if(V0.usedTimes--,V0.usedTimes===0)y(w);if(Object.keys(Q0).length===0)D.delete(g)}$.remove(w)}function y(w){let L=$.get(w);J.deleteTexture(L.__webglTexture);let g=w.source,Q0=D.get(g);delete Q0[L.__cacheKey],H.memory.textures--}function S(w){let L=$.get(w);if(w.depthTexture)w.depthTexture.dispose(),$.remove(w.depthTexture);if(w.isWebGLCubeRenderTarget)for(let Q0=0;Q0<6;Q0++){if(Array.isArray(L.__webglFramebuffer[Q0]))for(let V0=0;V0<L.__webglFramebuffer[Q0].length;V0++)J.deleteFramebuffer(L.__webglFramebuffer[Q0][V0]);else J.deleteFramebuffer(L.__webglFramebuffer[Q0]);if(L.__webglDepthbuffer)J.deleteRenderbuffer(L.__webglDepthbuffer[Q0])}else{if(Array.isArray(L.__webglFramebuffer))for(let Q0=0;Q0<L.__webglFramebuffer.length;Q0++)J.deleteFramebuffer(L.__webglFramebuffer[Q0]);else J.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer)J.deleteRenderbuffer(L.__webglDepthbuffer);if(L.__webglMultisampledFramebuffer)J.deleteFramebuffer(L.__webglMultisampledFramebuffer);if(L.__webglColorRenderbuffer){for(let Q0=0;Q0<L.__webglColorRenderbuffer.length;Q0++)if(L.__webglColorRenderbuffer[Q0])J.deleteRenderbuffer(L.__webglColorRenderbuffer[Q0])}if(L.__webglDepthRenderbuffer)J.deleteRenderbuffer(L.__webglDepthRenderbuffer)}let g=w.textures;for(let Q0=0,V0=g.length;Q0<V0;Q0++){let z0=$.get(g[Q0]);if(z0.__webglTexture)J.deleteTexture(z0.__webglTexture),H.memory.textures--;$.remove(g[Q0])}$.remove(w)}let b=0;function e(){b=0}function v(){return b}function l(w){b=w}function U0(){let w=b;if(w>=K.maxTextures)H9("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+K.maxTextures);return b+=1,w}function i(w){let L=[];return L.push(w.wrapS),L.push(w.wrapT),L.push(w.wrapR||0),L.push(w.magFilter),L.push(w.minFilter),L.push(w.anisotropy),L.push(w.internalFormat),L.push(w.format),L.push(w.type),L.push(w.generateMipmaps),L.push(w.premultiplyAlpha),L.push(w.flipY),L.push(w.unpackAlignment),L.push(w.colorSpace),L.join()}function r(w,L){let g=$.get(w);if(w.isVideoTexture)a9(w);if(w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&g.__version!==w.version){let Q0=w.image;if(Q0===null)H9("WebGLRenderer: Texture marked for update but no image data found.");else if(Q0.complete===!1)H9("WebGLRenderer: Texture marked for update but image is incomplete");else{c(g,w,L);return}}else if(w.isExternalTexture)g.__webglTexture=w.sourceTexture?w.sourceTexture:null;Z.bindTexture(J.TEXTURE_2D,g.__webglTexture,J.TEXTURE0+L)}function u(w,L){let g=$.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&g.__version!==w.version){c(g,w,L);return}else if(w.isExternalTexture)g.__webglTexture=w.sourceTexture?w.sourceTexture:null;Z.bindTexture(J.TEXTURE_2D_ARRAY,g.__webglTexture,J.TEXTURE0+L)}function h(w,L){let g=$.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&g.__version!==w.version){c(g,w,L);return}Z.bindTexture(J.TEXTURE_3D,g.__webglTexture,J.TEXTURE0+L)}function H0(w,L){let g=$.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&g.__version!==w.version){C0(g,w,L);return}Z.bindTexture(J.TEXTURE_CUBE_MAP,g.__webglTexture,J.TEXTURE0+L)}let E0={[m8]:J.REPEAT,[K$]:J.CLAMP_TO_EDGE,[NW]:J.MIRRORED_REPEAT},L0={[U8]:J.NEAREST,[qW]:J.NEAREST_MIPMAP_NEAREST,[yQ]:J.NEAREST_MIPMAP_LINEAR,[i7]:J.LINEAR,[U$]:J.LINEAR_MIPMAP_NEAREST,[dJ]:J.LINEAR_MIPMAP_LINEAR},d={[BW]:J.NEVER,[CW]:J.ALWAYS,[_W]:J.LESS,[q$]:J.LEQUAL,[AW]:J.EQUAL,[D$]:J.GEQUAL,[zW]:J.GREATER,[PW]:J.NOTEQUAL};function D0(w,L){if(L.type===UJ&&Q.has("OES_texture_float_linear")===!1&&(L.magFilter===i7||L.magFilter===U$||L.magFilter===yQ||L.magFilter===dJ||L.minFilter===i7||L.minFilter===U$||L.minFilter===yQ||L.minFilter===dJ))H9("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(w,J.TEXTURE_WRAP_S,E0[L.wrapS]),J.texParameteri(w,J.TEXTURE_WRAP_T,E0[L.wrapT]),w===J.TEXTURE_3D||w===J.TEXTURE_2D_ARRAY)J.texParameteri(w,J.TEXTURE_WRAP_R,E0[L.wrapR]);if(J.texParameteri(w,J.TEXTURE_MAG_FILTER,L0[L.magFilter]),J.texParameteri(w,J.TEXTURE_MIN_FILTER,L0[L.minFilter]),L.compareFunction)J.texParameteri(w,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(w,J.TEXTURE_COMPARE_FUNC,d[L.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(L.magFilter===U8)return;if(L.minFilter!==yQ&&L.minFilter!==dJ)return;if(L.type===UJ&&Q.has("OES_texture_float_linear")===!1)return;if(L.anisotropy>1||$.get(L).__currentAnisotropy){let g=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(w,g.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(L.anisotropy,K.getMaxAnisotropy())),$.get(L).__currentAnisotropy=L.anisotropy}}}function s(w,L){let g=!1;if(w.__webglInit===void 0)w.__webglInit=!0,L.addEventListener("dispose",P);let Q0=L.source,V0=D.get(Q0);if(V0===void 0)V0={},D.set(Q0,V0);let z0=i(L);if(z0!==w.__cacheKey){if(V0[z0]===void 0)V0[z0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,g=!0;V0[z0].usedTimes++;let S0=V0[w.__cacheKey];if(S0!==void 0){if(V0[w.__cacheKey].usedTimes--,S0.usedTimes===0)y(L)}w.__cacheKey=z0,w.__webglTexture=V0[z0].texture}return g}function G0(w,L,g){return Math.floor(Math.floor(w/g)/L)}function X0(w,L,g,Q0){let z0=w.updateRanges;if(z0.length===0)Z.texSubImage2D(J.TEXTURE_2D,0,0,0,L.width,L.height,g,Q0,L.data);else{z0.sort((t0,v0)=>t0.start-v0.start);let S0=0;for(let t0=1;t0<z0.length;t0++){let v0=z0[S0],P0=z0[t0],Z9=v0.start+v0.count,Y9=G0(P0.start,L.width,4),g9=G0(v0.start,L.width,4);if(P0.start<=Z9+1&&Y9===g9&&G0(P0.start+P0.count-1,L.width,4)===Y9)v0.count=Math.max(v0.count,P0.start+P0.count-v0.start);else++S0,z0[S0]=P0}z0.length=S0+1;let W0=Z.getParameter(J.UNPACK_ROW_LENGTH),F0=Z.getParameter(J.UNPACK_SKIP_PIXELS),p0=Z.getParameter(J.UNPACK_SKIP_ROWS);Z.pixelStorei(J.UNPACK_ROW_LENGTH,L.width);for(let t0=0,v0=z0.length;t0<v0;t0++){let P0=z0[t0],Z9=Math.floor(P0.start/4),Y9=Math.ceil(P0.count/4),g9=Z9%L.width,m=Math.floor(Z9/L.width),k0=Y9,N0=1;Z.pixelStorei(J.UNPACK_SKIP_PIXELS,g9),Z.pixelStorei(J.UNPACK_SKIP_ROWS,m),Z.texSubImage2D(J.TEXTURE_2D,0,g9,m,k0,1,g,Q0,L.data)}w.clearUpdateRanges(),Z.pixelStorei(J.UNPACK_ROW_LENGTH,W0),Z.pixelStorei(J.UNPACK_SKIP_PIXELS,F0),Z.pixelStorei(J.UNPACK_SKIP_ROWS,p0)}}function c(w,L,g){let Q0=J.TEXTURE_2D;if(L.isDataArrayTexture||L.isCompressedArrayTexture)Q0=J.TEXTURE_2D_ARRAY;if(L.isData3DTexture)Q0=J.TEXTURE_3D;let V0=s(w,L),z0=L.source;Z.bindTexture(Q0,w.__webglTexture,J.TEXTURE0+g);let S0=$.get(z0);if(z0.version!==S0.__version||V0===!0){if(Z.activeTexture(J.TEXTURE0+g),(typeof ImageBitmap<"u"&&L.image instanceof ImageBitmap)===!1){let N0=A9.getPrimaries(A9.workingColorSpace),j0=L.colorSpace===sJ?null:A9.getPrimaries(L.colorSpace),m0=L.colorSpace===sJ||N0===j0?J.NONE:J.BROWSER_DEFAULT_WEBGL;Z.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,L.flipY),Z.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),Z.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,m0)}Z.pixelStorei(J.UNPACK_ALIGNMENT,L.unpackAlignment);let F0=F(L.image,!1,K.maxTextureSize);F0=_9(L,F0);let p0=U.convert(L.format,L.colorSpace),t0=U.convert(L.type),v0=R(L.internalFormat,p0,t0,L.normalized,L.colorSpace,L.isVideoTexture);D0(Q0,L);let P0,Z9=L.mipmaps,Y9=L.isVideoTexture!==!0,g9=S0.__version===void 0||V0===!0,m=z0.dataReady,k0=_(L,F0);if(L.isDepthTexture){if(v0=B(L.format===cJ,L.type),g9)if(Y9)Z.texStorage2D(J.TEXTURE_2D,1,v0,F0.width,F0.height);else Z.texImage2D(J.TEXTURE_2D,0,v0,F0.width,F0.height,0,p0,t0,null)}else if(L.isDataTexture)if(Z9.length>0){if(Y9&&g9)Z.texStorage2D(J.TEXTURE_2D,k0,v0,Z9[0].width,Z9[0].height);for(let N0=0,j0=Z9.length;N0<j0;N0++)if(P0=Z9[N0],Y9){if(m)Z.texSubImage2D(J.TEXTURE_2D,N0,0,0,P0.width,P0.height,p0,t0,P0.data)}else Z.texImage2D(J.TEXTURE_2D,N0,v0,P0.width,P0.height,0,p0,t0,P0.data);L.generateMipmaps=!1}else if(Y9){if(g9)Z.texStorage2D(J.TEXTURE_2D,k0,v0,F0.width,F0.height);if(m)X0(L,F0,p0,t0)}else Z.texImage2D(J.TEXTURE_2D,0,v0,F0.width,F0.height,0,p0,t0,F0.data);else if(L.isCompressedTexture)if(L.isCompressedArrayTexture){if(Y9&&g9)Z.texStorage3D(J.TEXTURE_2D_ARRAY,k0,v0,Z9[0].width,Z9[0].height,F0.depth);for(let N0=0,j0=Z9.length;N0<j0;N0++)if(P0=Z9[N0],L.format!==d8)if(p0!==null)if(Y9){if(m)if(L.layerUpdates.size>0){let m0=sU(P0.width,P0.height,L.format,L.type);for(let I0 of L.layerUpdates){let b0=P0.data.subarray(I0*m0/P0.data.BYTES_PER_ELEMENT,(I0+1)*m0/P0.data.BYTES_PER_ELEMENT);Z.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,N0,0,0,I0,P0.width,P0.height,1,p0,b0)}}else Z.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,N0,0,0,0,P0.width,P0.height,F0.depth,p0,P0.data)}else Z.compressedTexImage3D(J.TEXTURE_2D_ARRAY,N0,v0,P0.width,P0.height,F0.depth,0,P0.data,0,0);else H9("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Y9){if(m)Z.texSubImage3D(J.TEXTURE_2D_ARRAY,N0,0,0,0,P0.width,P0.height,F0.depth,p0,t0,P0.data)}else Z.texImage3D(J.TEXTURE_2D_ARRAY,N0,v0,P0.width,P0.height,F0.depth,0,p0,t0,P0.data);if(L.layerUpdates.size>0)L.clearLayerUpdates()}else{if(Y9&&g9)Z.texStorage2D(J.TEXTURE_2D,k0,v0,Z9[0].width,Z9[0].height);for(let N0=0,j0=Z9.length;N0<j0;N0++)if(P0=Z9[N0],L.format!==d8)if(p0!==null)if(Y9){if(m)Z.compressedTexSubImage2D(J.TEXTURE_2D,N0,0,0,P0.width,P0.height,p0,P0.data)}else Z.compressedTexImage2D(J.TEXTURE_2D,N0,v0,P0.width,P0.height,0,P0.data);else H9("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Y9){if(m)Z.texSubImage2D(J.TEXTURE_2D,N0,0,0,P0.width,P0.height,p0,t0,P0.data)}else Z.texImage2D(J.TEXTURE_2D,N0,v0,P0.width,P0.height,0,p0,t0,P0.data)}else if(L.isDataArrayTexture)if(Y9){if(g9)Z.texStorage3D(J.TEXTURE_2D_ARRAY,k0,v0,F0.width,F0.height,F0.depth);if(m)if(L.layerUpdates.size>0){let N0=sU(F0.width,F0.height,L.format,L.type);for(let j0 of L.layerUpdates){let m0=F0.data.subarray(j0*N0/F0.data.BYTES_PER_ELEMENT,(j0+1)*N0/F0.data.BYTES_PER_ELEMENT);Z.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,j0,F0.width,F0.height,1,p0,t0,m0)}L.clearLayerUpdates()}else Z.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,F0.width,F0.height,F0.depth,p0,t0,F0.data)}else Z.texImage3D(J.TEXTURE_2D_ARRAY,0,v0,F0.width,F0.height,F0.depth,0,p0,t0,F0.data);else if(L.isData3DTexture)if(Y9){if(g9)Z.texStorage3D(J.TEXTURE_3D,k0,v0,F0.width,F0.height,F0.depth);if(m)Z.texSubImage3D(J.TEXTURE_3D,0,0,0,0,F0.width,F0.height,F0.depth,p0,t0,F0.data)}else Z.texImage3D(J.TEXTURE_3D,0,v0,F0.width,F0.height,F0.depth,0,p0,t0,F0.data);else if(L.isFramebufferTexture){if(g9)if(Y9)Z.texStorage2D(J.TEXTURE_2D,k0,v0,F0.width,F0.height);else{let{width:N0,height:j0}=F0;for(let m0=0;m0<k0;m0++)Z.texImage2D(J.TEXTURE_2D,m0,v0,N0,j0,0,p0,t0,null),N0>>=1,j0>>=1}}else if(L.isHTMLTexture){if("texElementImage2D"in J){let N0=J.canvas;if(!N0.hasAttribute("layoutsubtree"))N0.setAttribute("layoutsubtree","true");if(F0.parentNode!==N0){N0.appendChild(F0),q.add(L),N0.onpaint=(j0)=>{let m0=j0.changedElements;for(let I0 of q)if(m0.includes(I0.image))I0.needsUpdate=!0},N0.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,F0);else{let{RGBA:m0,RGBA:I0,UNSIGNED_BYTE:b0}=J;J.texElementImage2D(J.TEXTURE_2D,0,m0,I0,b0,F0)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(Z9.length>0){if(Y9&&g9){let N0=C9(Z9[0]);Z.texStorage2D(J.TEXTURE_2D,k0,v0,N0.width,N0.height)}for(let N0=0,j0=Z9.length;N0<j0;N0++)if(P0=Z9[N0],Y9){if(m)Z.texSubImage2D(J.TEXTURE_2D,N0,0,0,p0,t0,P0)}else Z.texImage2D(J.TEXTURE_2D,N0,v0,p0,t0,P0);L.generateMipmaps=!1}else if(Y9){if(g9){let N0=C9(F0);Z.texStorage2D(J.TEXTURE_2D,k0,v0,N0.width,N0.height)}if(m)Z.texSubImage2D(J.TEXTURE_2D,0,0,0,p0,t0,F0)}else Z.texImage2D(J.TEXTURE_2D,0,v0,p0,t0,F0);if(O(L))z(Q0);if(S0.__version=z0.version,L.onUpdate)L.onUpdate(L)}w.__version=L.version}function C0(w,L,g){if(L.image.length!==6)return;let Q0=s(w,L),V0=L.source;Z.bindTexture(J.TEXTURE_CUBE_MAP,w.__webglTexture,J.TEXTURE0+g);let z0=$.get(V0);if(V0.version!==z0.__version||Q0===!0){Z.activeTexture(J.TEXTURE0+g);let S0=A9.getPrimaries(A9.workingColorSpace),W0=L.colorSpace===sJ?null:A9.getPrimaries(L.colorSpace),F0=L.colorSpace===sJ||S0===W0?J.NONE:J.BROWSER_DEFAULT_WEBGL;Z.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,L.flipY),Z.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),Z.pixelStorei(J.UNPACK_ALIGNMENT,L.unpackAlignment),Z.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,F0);let p0=L.isCompressedTexture||L.image[0].isCompressedTexture,t0=L.image[0]&&L.image[0].isDataTexture,v0=[];for(let I0=0;I0<6;I0++){if(!p0&&!t0)v0[I0]=F(L.image[I0],!0,K.maxCubemapSize);else v0[I0]=t0?L.image[I0].image:L.image[I0];v0[I0]=_9(L,v0[I0])}let P0=v0[0],Z9=U.convert(L.format,L.colorSpace),Y9=U.convert(L.type),g9=R(L.internalFormat,Z9,Y9,L.normalized,L.colorSpace),m=L.isVideoTexture!==!0,k0=z0.__version===void 0||Q0===!0,N0=V0.dataReady,j0=_(L,P0);D0(J.TEXTURE_CUBE_MAP,L);let m0;if(p0){if(m&&k0)Z.texStorage2D(J.TEXTURE_CUBE_MAP,j0,g9,P0.width,P0.height);for(let I0=0;I0<6;I0++){m0=v0[I0].mipmaps;for(let b0=0;b0<m0.length;b0++){let R9=m0[b0];if(L.format!==d8)if(Z9!==null)if(m){if(N0)Z.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,b0,0,0,R9.width,R9.height,Z9,R9.data)}else Z.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,b0,g9,R9.width,R9.height,0,R9.data);else H9("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(m){if(N0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,b0,0,0,R9.width,R9.height,Z9,Y9,R9.data)}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,b0,g9,R9.width,R9.height,0,Z9,Y9,R9.data)}}}else{if(m0=L.mipmaps,m&&k0){if(m0.length>0)j0++;let I0=C9(v0[0]);Z.texStorage2D(J.TEXTURE_CUBE_MAP,j0,g9,I0.width,I0.height)}for(let I0=0;I0<6;I0++)if(t0){if(m){if(N0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,0,0,0,v0[I0].width,v0[I0].height,Z9,Y9,v0[I0].data)}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,0,g9,v0[I0].width,v0[I0].height,0,Z9,Y9,v0[I0].data);for(let b0=0;b0<m0.length;b0++){let $7=m0[b0].image[I0].image;if(m){if(N0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,b0+1,0,0,$7.width,$7.height,Z9,Y9,$7.data)}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,b0+1,g9,$7.width,$7.height,0,Z9,Y9,$7.data)}}else{if(m){if(N0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,0,0,0,Z9,Y9,v0[I0])}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,0,g9,Z9,Y9,v0[I0]);for(let b0=0;b0<m0.length;b0++){let R9=m0[b0];if(m){if(N0)Z.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,b0+1,0,0,Z9,Y9,R9.image[I0])}else Z.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+I0,b0+1,g9,Z9,Y9,R9.image[I0])}}}if(O(L))z(J.TEXTURE_CUBE_MAP);if(z0.__version=V0.version,L.onUpdate)L.onUpdate(L)}w.__version=L.version}function t(w,L,g,Q0,V0,z0){let S0=U.convert(g.format,g.colorSpace),W0=U.convert(g.type),F0=R(g.internalFormat,S0,W0,g.normalized,g.colorSpace),p0=$.get(L),t0=$.get(g);if(t0.__renderTarget=L,!p0.__hasExternalTextures){let v0=Math.max(1,L.width>>z0),P0=Math.max(1,L.height>>z0);if(V0===J.TEXTURE_3D||V0===J.TEXTURE_2D_ARRAY)Z.texImage3D(V0,z0,F0,v0,P0,L.depth,0,S0,W0,null);else Z.texImage2D(V0,z0,F0,v0,P0,0,S0,W0,null)}if(Z.bindFramebuffer(J.FRAMEBUFFER,w),x(L))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,Q0,V0,t0.__webglTexture,0,M9(L));else if(V0===J.TEXTURE_2D||V0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&V0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,Q0,V0,t0.__webglTexture,z0);Z.bindFramebuffer(J.FRAMEBUFFER,null)}function u0(w,L,g){if(J.bindRenderbuffer(J.RENDERBUFFER,w),L.depthBuffer){let Q0=L.depthTexture,V0=Q0&&Q0.isDepthTexture?Q0.type:null,z0=B(L.stencilBuffer,V0),S0=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(x(L))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,M9(L),z0,L.width,L.height);else if(g)J.renderbufferStorageMultisample(J.RENDERBUFFER,M9(L),z0,L.width,L.height);else J.renderbufferStorage(J.RENDERBUFFER,z0,L.width,L.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,S0,J.RENDERBUFFER,w)}else{let Q0=L.textures;for(let V0=0;V0<Q0.length;V0++){let z0=Q0[V0],S0=U.convert(z0.format,z0.colorSpace),W0=U.convert(z0.type),F0=R(z0.internalFormat,S0,W0,z0.normalized,z0.colorSpace);if(x(L))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,M9(L),F0,L.width,L.height);else if(g)J.renderbufferStorageMultisample(J.RENDERBUFFER,M9(L),F0,L.width,L.height);else J.renderbufferStorage(J.RENDERBUFFER,F0,L.width,L.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function K0(w,L,g){let Q0=L.isWebGLCubeRenderTarget===!0;if(Z.bindFramebuffer(J.FRAMEBUFFER,w),!(L.depthTexture&&L.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let V0=$.get(L.depthTexture);if(V0.__renderTarget=L,!V0.__webglTexture||L.depthTexture.image.width!==L.width||L.depthTexture.image.height!==L.height)L.depthTexture.image.width=L.width,L.depthTexture.image.height=L.height,L.depthTexture.needsUpdate=!0;if(Q0){if(V0.__webglInit===void 0)V0.__webglInit=!0,L.depthTexture.addEventListener("dispose",P);if(V0.__webglTexture===void 0){V0.__webglTexture=J.createTexture(),Z.bindTexture(J.TEXTURE_CUBE_MAP,V0.__webglTexture),D0(J.TEXTURE_CUBE_MAP,L.depthTexture);let p0=U.convert(L.depthTexture.format),t0=U.convert(L.depthTexture.type),v0;if(L.depthTexture.format===lJ)v0=J.DEPTH_COMPONENT24;else if(L.depthTexture.format===cJ)v0=J.DEPTH24_STENCIL8;for(let P0=0;P0<6;P0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+P0,0,v0,L.width,L.height,0,p0,t0,null)}}else r(L.depthTexture,0);let z0=V0.__webglTexture,S0=M9(L),W0=Q0?J.TEXTURE_CUBE_MAP_POSITIVE_X+g:J.TEXTURE_2D,F0=L.depthTexture.format===cJ?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(L.depthTexture.format===lJ)if(x(L))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,F0,W0,z0,0,S0);else J.framebufferTexture2D(J.FRAMEBUFFER,F0,W0,z0,0);else if(L.depthTexture.format===cJ)if(x(L))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,F0,W0,z0,0,S0);else J.framebufferTexture2D(J.FRAMEBUFFER,F0,W0,z0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function R0(w){let L=$.get(w),g=w.isWebGLCubeRenderTarget===!0;if(L.__boundDepthTexture!==w.depthTexture){let Q0=w.depthTexture;if(L.__depthDisposeCallback)L.__depthDisposeCallback();if(Q0){let V0=()=>{delete L.__boundDepthTexture,delete L.__depthDisposeCallback,Q0.removeEventListener("dispose",V0)};Q0.addEventListener("dispose",V0),L.__depthDisposeCallback=V0}L.__boundDepthTexture=Q0}if(w.depthTexture&&!L.__autoAllocateDepthBuffer)if(g)for(let Q0=0;Q0<6;Q0++)K0(L.__webglFramebuffer[Q0],w,Q0);else{let Q0=w.texture.mipmaps;if(Q0&&Q0.length>0)K0(L.__webglFramebuffer[0],w,0);else K0(L.__webglFramebuffer,w,0)}else if(g){L.__webglDepthbuffer=[];for(let Q0=0;Q0<6;Q0++)if(Z.bindFramebuffer(J.FRAMEBUFFER,L.__webglFramebuffer[Q0]),L.__webglDepthbuffer[Q0]===void 0)L.__webglDepthbuffer[Q0]=J.createRenderbuffer(),u0(L.__webglDepthbuffer[Q0],w,!1);else{let V0=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,z0=L.__webglDepthbuffer[Q0];J.bindRenderbuffer(J.RENDERBUFFER,z0),J.framebufferRenderbuffer(J.FRAMEBUFFER,V0,J.RENDERBUFFER,z0)}}else{let Q0=w.texture.mipmaps;if(Q0&&Q0.length>0)Z.bindFramebuffer(J.FRAMEBUFFER,L.__webglFramebuffer[0]);else Z.bindFramebuffer(J.FRAMEBUFFER,L.__webglFramebuffer);if(L.__webglDepthbuffer===void 0)L.__webglDepthbuffer=J.createRenderbuffer(),u0(L.__webglDepthbuffer,w,!1);else{let V0=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,z0=L.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,z0),J.framebufferRenderbuffer(J.FRAMEBUFFER,V0,J.RENDERBUFFER,z0)}}Z.bindFramebuffer(J.FRAMEBUFFER,null)}function B0(w,L,g){let Q0=$.get(w);if(L!==void 0)t(Q0.__webglFramebuffer,w,w.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(g!==void 0)R0(w)}function A0(w){let L=w.texture,g=$.get(w),Q0=$.get(L);w.addEventListener("dispose",E);let V0=w.textures,z0=w.isWebGLCubeRenderTarget===!0,S0=V0.length>1;if(!S0){if(Q0.__webglTexture===void 0)Q0.__webglTexture=J.createTexture();Q0.__version=L.version,H.memory.textures++}if(z0){g.__webglFramebuffer=[];for(let W0=0;W0<6;W0++)if(L.mipmaps&&L.mipmaps.length>0){g.__webglFramebuffer[W0]=[];for(let F0=0;F0<L.mipmaps.length;F0++)g.__webglFramebuffer[W0][F0]=J.createFramebuffer()}else g.__webglFramebuffer[W0]=J.createFramebuffer()}else{if(L.mipmaps&&L.mipmaps.length>0){g.__webglFramebuffer=[];for(let W0=0;W0<L.mipmaps.length;W0++)g.__webglFramebuffer[W0]=J.createFramebuffer()}else g.__webglFramebuffer=J.createFramebuffer();if(S0)for(let W0=0,F0=V0.length;W0<F0;W0++){let p0=$.get(V0[W0]);if(p0.__webglTexture===void 0)p0.__webglTexture=J.createTexture(),H.memory.textures++}if(w.samples>0&&x(w)===!1){g.__webglMultisampledFramebuffer=J.createFramebuffer(),g.__webglColorRenderbuffer=[],Z.bindFramebuffer(J.FRAMEBUFFER,g.__webglMultisampledFramebuffer);for(let W0=0;W0<V0.length;W0++){let F0=V0[W0];g.__webglColorRenderbuffer[W0]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,g.__webglColorRenderbuffer[W0]);let p0=U.convert(F0.format,F0.colorSpace),t0=U.convert(F0.type),v0=R(F0.internalFormat,p0,t0,F0.normalized,F0.colorSpace,w.isXRRenderTarget===!0),P0=M9(w);J.renderbufferStorageMultisample(J.RENDERBUFFER,P0,v0,w.width,w.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+W0,J.RENDERBUFFER,g.__webglColorRenderbuffer[W0])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),w.depthBuffer)g.__webglDepthRenderbuffer=J.createRenderbuffer(),u0(g.__webglDepthRenderbuffer,w,!0);Z.bindFramebuffer(J.FRAMEBUFFER,null)}}if(z0){Z.bindTexture(J.TEXTURE_CUBE_MAP,Q0.__webglTexture),D0(J.TEXTURE_CUBE_MAP,L);for(let W0=0;W0<6;W0++)if(L.mipmaps&&L.mipmaps.length>0)for(let F0=0;F0<L.mipmaps.length;F0++)t(g.__webglFramebuffer[W0][F0],w,L,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+W0,F0);else t(g.__webglFramebuffer[W0],w,L,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+W0,0);if(O(L))z(J.TEXTURE_CUBE_MAP);Z.unbindTexture()}else if(S0){for(let W0=0,F0=V0.length;W0<F0;W0++){let p0=V0[W0],t0=$.get(p0),v0=J.TEXTURE_2D;if(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)v0=w.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(Z.bindTexture(v0,t0.__webglTexture),D0(v0,p0),t(g.__webglFramebuffer,w,p0,J.COLOR_ATTACHMENT0+W0,v0,0),O(p0))z(v0)}Z.unbindTexture()}else{let W0=J.TEXTURE_2D;if(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)W0=w.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(Z.bindTexture(W0,Q0.__webglTexture),D0(W0,L),L.mipmaps&&L.mipmaps.length>0)for(let F0=0;F0<L.mipmaps.length;F0++)t(g.__webglFramebuffer[F0],w,L,J.COLOR_ATTACHMENT0,W0,F0);else t(g.__webglFramebuffer,w,L,J.COLOR_ATTACHMENT0,W0,0);if(O(L))z(W0);Z.unbindTexture()}if(w.depthBuffer)R0(w)}function w0(w){let L=w.textures;for(let g=0,Q0=L.length;g<Q0;g++){let V0=L[g];if(O(V0)){let z0=C(w),S0=$.get(V0).__webglTexture;Z.bindTexture(z0,S0),z(z0),Z.unbindTexture()}}}let r0=[],Q9=[];function O9(w){if(w.samples>0){if(x(w)===!1){let{textures:L,width:g,height:Q0}=w,V0=J.COLOR_BUFFER_BIT,z0=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,S0=$.get(w),W0=L.length>1;if(W0)for(let p0=0;p0<L.length;p0++)Z.bindFramebuffer(J.FRAMEBUFFER,S0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+p0,J.RENDERBUFFER,null),Z.bindFramebuffer(J.FRAMEBUFFER,S0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+p0,J.TEXTURE_2D,null,0);Z.bindFramebuffer(J.READ_FRAMEBUFFER,S0.__webglMultisampledFramebuffer);let F0=w.texture.mipmaps;if(F0&&F0.length>0)Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,S0.__webglFramebuffer[0]);else Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,S0.__webglFramebuffer);for(let p0=0;p0<L.length;p0++){if(w.resolveDepthBuffer){if(w.depthBuffer)V0|=J.DEPTH_BUFFER_BIT;if(w.stencilBuffer&&w.resolveStencilBuffer)V0|=J.STENCIL_BUFFER_BIT}if(W0){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,S0.__webglColorRenderbuffer[p0]);let t0=$.get(L[p0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,t0,0)}if(J.blitFramebuffer(0,0,g,Q0,0,0,g,Q0,V0,J.NEAREST),W===!0){if(r0.length=0,Q9.length=0,r0.push(J.COLOR_ATTACHMENT0+p0),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1)r0.push(z0),Q9.push(z0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,Q9);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,r0)}}if(Z.bindFramebuffer(J.READ_FRAMEBUFFER,null),Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),W0)for(let p0=0;p0<L.length;p0++){Z.bindFramebuffer(J.FRAMEBUFFER,S0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+p0,J.RENDERBUFFER,S0.__webglColorRenderbuffer[p0]);let t0=$.get(L[p0]).__webglTexture;Z.bindFramebuffer(J.FRAMEBUFFER,S0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+p0,J.TEXTURE_2D,t0,0)}Z.bindFramebuffer(J.DRAW_FRAMEBUFFER,S0.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&W){let L=w.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[L])}}}function M9(w){return Math.min(K.maxSamples,w.samples)}function x(w){let L=$.get(w);return w.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&L.__useRenderToTexture!==!1}function a9(w){let L=H.render.frame;if(G.get(w)!==L)G.set(w,L),w.update()}function _9(w,L){let{colorSpace:g,format:Q0,type:V0}=w;if(w.isCompressedTexture===!0||w.isVideoTexture===!0)return L;if(g!==MU&&g!==sJ)if(A9.getTransfer(g)===o9){if(Q0!==d8||V0!==_8)H9("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else X9("WebGLTextures: Unsupported texture color space:",g);return L}function C9(w){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement)X.width=w.naturalWidth||w.width,X.height=w.naturalHeight||w.height;else if(typeof VideoFrame<"u"&&w instanceof VideoFrame)X.width=w.displayWidth,X.height=w.displayHeight;else X.width=w.width,X.height=w.height;return X}this.allocateTextureUnit=U0,this.resetTextureUnits=e,this.getTextureUnits=v,this.setTextureUnits=l,this.setTexture2D=r,this.setTexture2DArray=u,this.setTexture3D=h,this.setTextureCube=H0,this.rebindTextures=B0,this.setupRenderTarget=A0,this.updateRenderTargetMipmap=w0,this.updateMultisampleRenderTarget=O9,this.setupDepthRenderbuffer=R0,this.setupFrameBufferTexture=t,this.useMultisampledRTT=x,this.isReversedDepthBuffer=function(){return Z.buffers.depth.getReversed()}}function RF(J,Q){function Z($,K=sJ){let U,H=A9.getTransfer(K);if($===_8)return J.UNSIGNED_BYTE;if($===vK)return J.UNSIGNED_SHORT_4_4_4_4;if($===yK)return J.UNSIGNED_SHORT_5_5_5_1;if($===OW)return J.UNSIGNED_INT_5_9_9_9_REV;if($===MW)return J.UNSIGNED_INT_10F_11F_11F_REV;if($===DW)return J.BYTE;if($===FW)return J.SHORT;if($===fQ)return J.UNSIGNED_SHORT;if($===jK)return J.INT;if($===TJ)return J.UNSIGNED_INT;if($===UJ)return J.FLOAT;if($===L7)return J.HALF_FLOAT;if($===RW)return J.ALPHA;if($===EW)return J.RGB;if($===d8)return J.RGBA;if($===lJ)return J.DEPTH_COMPONENT;if($===cJ)return J.DEPTH_STENCIL;if($===VW)return J.RED;if($===fK)return J.RED_INTEGER;if($===nJ)return J.RG;if($===bK)return J.RG_INTEGER;if($===xK)return J.RGBA_INTEGER;if($===H$||$===Y$||$===W$||$===X$)if(H===o9)if(U=Q.get("WEBGL_compressed_texture_s3tc_srgb"),U!==null){if($===H$)return U.COMPRESSED_SRGB_S3TC_DXT1_EXT;if($===Y$)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if($===W$)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if($===X$)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(U=Q.get("WEBGL_compressed_texture_s3tc"),U!==null){if($===H$)return U.COMPRESSED_RGB_S3TC_DXT1_EXT;if($===Y$)return U.COMPRESSED_RGBA_S3TC_DXT1_EXT;if($===W$)return U.COMPRESSED_RGBA_S3TC_DXT3_EXT;if($===X$)return U.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if($===hK||$===gK||$===pK||$===uK)if(U=Q.get("WEBGL_compressed_texture_pvrtc"),U!==null){if($===hK)return U.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if($===gK)return U.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if($===pK)return U.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if($===uK)return U.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if($===mK||$===dK||$===lK||$===cK||$===nK||$===G$||$===sK)if(U=Q.get("WEBGL_compressed_texture_etc"),U!==null){if($===mK||$===dK)return H===o9?U.COMPRESSED_SRGB8_ETC2:U.COMPRESSED_RGB8_ETC2;if($===lK)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:U.COMPRESSED_RGBA8_ETC2_EAC;if($===cK)return U.COMPRESSED_R11_EAC;if($===nK)return U.COMPRESSED_SIGNED_R11_EAC;if($===G$)return U.COMPRESSED_RG11_EAC;if($===sK)return U.COMPRESSED_SIGNED_RG11_EAC}else return null;if($===iK||$===oK||$===aK||$===rK||$===tK||$===eK||$===JU||$===QU||$===ZU||$===$U||$===KU||$===UU||$===HU||$===YU)if(U=Q.get("WEBGL_compressed_texture_astc"),U!==null){if($===iK)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:U.COMPRESSED_RGBA_ASTC_4x4_KHR;if($===oK)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:U.COMPRESSED_RGBA_ASTC_5x4_KHR;if($===aK)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:U.COMPRESSED_RGBA_ASTC_5x5_KHR;if($===rK)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:U.COMPRESSED_RGBA_ASTC_6x5_KHR;if($===tK)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:U.COMPRESSED_RGBA_ASTC_6x6_KHR;if($===eK)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:U.COMPRESSED_RGBA_ASTC_8x5_KHR;if($===JU)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:U.COMPRESSED_RGBA_ASTC_8x6_KHR;if($===QU)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:U.COMPRESSED_RGBA_ASTC_8x8_KHR;if($===ZU)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:U.COMPRESSED_RGBA_ASTC_10x5_KHR;if($===$U)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:U.COMPRESSED_RGBA_ASTC_10x6_KHR;if($===KU)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:U.COMPRESSED_RGBA_ASTC_10x8_KHR;if($===UU)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:U.COMPRESSED_RGBA_ASTC_10x10_KHR;if($===HU)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:U.COMPRESSED_RGBA_ASTC_12x10_KHR;if($===YU)return H===o9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:U.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if($===WU||$===XU||$===GU)if(U=Q.get("EXT_texture_compression_bptc"),U!==null){if($===WU)return H===o9?U.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:U.COMPRESSED_RGBA_BPTC_UNORM_EXT;if($===XU)return U.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if($===GU)return U.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if($===NU||$===qU||$===N$||$===DU)if(U=Q.get("EXT_texture_compression_rgtc"),U!==null){if($===NU)return U.COMPRESSED_RED_RGTC1_EXT;if($===qU)return U.COMPRESSED_SIGNED_RED_RGTC1_EXT;if($===N$)return U.COMPRESSED_RED_GREEN_RGTC2_EXT;if($===DU)return U.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if($===l6)return J.UNSIGNED_INT_24_8;return J[$]!==void 0?J[$]:null}return{convert:Z}}var EF=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,VF=`
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

}`;class _5{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let Z=new V$(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=Z}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,Z=new v9({vertexShader:EF,fragmentShader:VF,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new f(new F9(20,20),Z)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class A5 extends HJ{constructor(J,Q){super();let Z=this,$=null,K=1,U=null,H="local-floor",Y=1,W=null,X=null,G=null,q=null,N=null,D=null,M=typeof XRWebGLBinding<"u",V=new _5,F={},O=Q.getContextAttributes(),z=null,C=null,R=[],B=[],_=new q0,P=null,E=null,A=new Q7;A.viewport=new X7;let y=new Q7;y.viewport=new X7;let S=[A,y],b=new dU,e=null,v=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(s){let G0=R[s];if(G0===void 0)G0=new xQ,R[s]=G0;return G0.getTargetRaySpace()},this.getControllerGrip=function(s){let G0=R[s];if(G0===void 0)G0=new xQ,R[s]=G0;return G0.getGripSpace()},this.getHand=function(s){let G0=R[s];if(G0===void 0)G0=new xQ,R[s]=G0;return G0.getHandSpace()};function l(s){let G0=B.indexOf(s.inputSource);if(G0===-1)return;let X0=R[G0];if(X0!==void 0)X0.update(s.inputSource,s.frame,W||U),X0.dispatchEvent({type:s.type,data:s.inputSource})}function U0(){$.removeEventListener("select",l),$.removeEventListener("selectstart",l),$.removeEventListener("selectend",l),$.removeEventListener("squeeze",l),$.removeEventListener("squeezestart",l),$.removeEventListener("squeezeend",l),$.removeEventListener("end",U0),$.removeEventListener("inputsourceschange",i);for(let s=0;s<R.length;s++){let G0=B[s];if(G0===null)continue;B[s]=null,R[s].disconnect(G0)}e=null,v=null,V.reset();for(let s in F)delete F[s];if(J.setRenderTarget(z),N=null,q=null,G=null,$=null,C=null,D0.stop(),Z.isPresenting=!1,J.setPixelRatio(P),J.setSize(_.width,_.height,!1),E!==null){let s=E.camera;s.fov=E.fov,s.zoom=E.zoom,s.updateProjectionMatrix(),E=null}Z.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(s){if(K=s,Z.isPresenting===!0)H9("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(s){if(H=s,Z.isPresenting===!0)H9("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return W||U},this.setReferenceSpace=function(s){W=s},this.getBaseLayer=function(){return q!==null?q:N},this.getBinding=function(){if(G===null&&M)G=new XRWebGLBinding($,Q);return G},this.getFrame=function(){return D},this.getSession=function(){return $},this.setSession=async function(s){if($=s,$!==null){if(z=J.getRenderTarget(),$.addEventListener("select",l),$.addEventListener("selectstart",l),$.addEventListener("selectend",l),$.addEventListener("squeeze",l),$.addEventListener("squeezestart",l),$.addEventListener("squeezeend",l),$.addEventListener("end",U0),$.addEventListener("inputsourceschange",i),O.xrCompatible!==!0)await Q.makeXRCompatible();if(P=J.getPixelRatio(),J.getSize(_),!(M&&("createProjectionLayer"in XRWebGLBinding.prototype))){let X0={antialias:O.antialias,alpha:!0,depth:O.depth,stencil:O.stencil,framebufferScaleFactor:K};N=new XRWebGLLayer($,Q,X0),$.updateRenderState({baseLayer:N}),J.setPixelRatio(1),J.setSize(N.framebufferWidth,N.framebufferHeight,!1),C=new M7(N.framebufferWidth,N.framebufferHeight,{format:d8,type:_8,colorSpace:J.outputColorSpace,stencilBuffer:O.stencil,resolveDepthBuffer:N.ignoreDepthValues===!1,resolveStencilBuffer:N.ignoreDepthValues===!1,storeMultisampledDepthBuffer:N.ignoreDepthValues===!1,storeMultisampledStencilBuffer:N.ignoreDepthValues===!1})}else{let X0=null,c=null,C0=null;if(O.depth)C0=O.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,X0=O.stencil?cJ:lJ,c=O.stencil?l6:TJ;let t={colorFormat:Q.RGBA8,depthFormat:C0,scaleFactor:K};G=this.getBinding(),q=G.createProjectionLayer(t),$.updateRenderState({layers:[q]}),J.setPixelRatio(1),J.setSize(q.textureWidth,q.textureHeight,!1),C=new M7(q.textureWidth,q.textureHeight,{format:d8,type:_8,depthTexture:new oJ(q.textureWidth,q.textureHeight,c,void 0,void 0,void 0,void 0,void 0,void 0,X0),stencilBuffer:O.stencil,colorSpace:J.outputColorSpace,samples:O.antialias?4:0,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1,storeMultisampledDepthBuffer:q.ignoreDepthValues===!1,storeMultisampledStencilBuffer:q.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(Y),W=null,U=await $.requestReferenceSpace(H),D0.setContext($),D0.start(),Z.isPresenting=!0,Z.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if($!==null)return $.environmentBlendMode},this.getDepthTexture=function(){return V.getDepthTexture()};function i(s){for(let G0=0;G0<s.removed.length;G0++){let X0=s.removed[G0],c=B.indexOf(X0);if(c>=0)B[c]=null,R[c].disconnect(X0)}for(let G0=0;G0<s.added.length;G0++){let X0=s.added[G0],c=B.indexOf(X0);if(c===-1){for(let t=0;t<R.length;t++)if(t>=B.length){B.push(X0),c=t;break}else if(B[t]===null){B[t]=X0,c=t;break}if(c===-1)break}let C0=R[c];if(C0)C0.connect(X0)}}let r=new k,u=new k;function h(s,G0,X0){r.setFromMatrixPosition(G0.matrixWorld),u.setFromMatrixPosition(X0.matrixWorld);let c=r.distanceTo(u),C0=G0.projectionMatrix.elements,t=X0.projectionMatrix.elements,u0=C0[14]/(C0[10]-1),K0=C0[14]/(C0[10]+1),R0=(C0[9]+1)/C0[5],B0=(C0[9]-1)/C0[5],A0=(C0[8]-1)/C0[0],w0=(t[8]+1)/t[0],r0=u0*A0,Q9=u0*w0,O9=c/(-A0+w0),M9=O9*-A0;if(G0.matrixWorld.decompose(s.position,s.quaternion,s.scale),s.translateX(M9),s.translateZ(O9),s.matrixWorld.compose(s.position,s.quaternion,s.scale),s.matrixWorldInverse.copy(s.matrixWorld).invert(),C0[10]===-1)s.projectionMatrix.copy(G0.projectionMatrix),s.projectionMatrixInverse.copy(G0.projectionMatrixInverse);else{let x=u0+O9,a9=K0+O9,_9=r0-M9,C9=Q9+(c-M9),w=R0*K0/a9*x,L=B0*K0/a9*x;s.projectionMatrix.makePerspective(_9,C9,w,L,x,a9),s.projectionMatrixInverse.copy(s.projectionMatrix).invert()}}function H0(s,G0){if(G0===null)s.matrixWorld.copy(s.matrix);else s.matrixWorld.multiplyMatrices(G0.matrixWorld,s.matrix);s.matrixWorldInverse.copy(s.matrixWorld).invert()}this.updateCamera=function(s){if($===null)return;let{near:G0,far:X0}=s;if(V.texture!==null){if(V.depthNear>0)G0=V.depthNear;if(V.depthFar>0)X0=V.depthFar}if(b.near=y.near=A.near=G0,b.far=y.far=A.far=X0,e!==b.near||v!==b.far)$.updateRenderState({depthNear:b.near,depthFar:b.far}),e=b.near,v=b.far;b.layers.mask=s.layers.mask|6,A.layers.mask=b.layers.mask&-5,y.layers.mask=b.layers.mask&-3;let c=s.parent,C0=b.cameras;H0(b,c);for(let t=0;t<C0.length;t++)H0(C0[t],c);if(C0.length===2)h(b,A,y);else b.projectionMatrix.copy(A.projectionMatrix);if(E===null&&s.isPerspectiveCamera)E={camera:s,fov:s.fov,zoom:s.zoom};E0(s,b,c)};function E0(s,G0,X0){if(X0===null)s.matrix.copy(G0.matrixWorld);else s.matrix.copy(X0.matrixWorld),s.matrix.invert(),s.matrix.multiply(G0.matrixWorld);if(s.matrix.decompose(s.position,s.quaternion,s.scale),s.updateMatrixWorld(!0),s.projectionMatrix.copy(G0.projectionMatrix),s.projectionMatrixInverse.copy(G0.projectionMatrixInverse),s.isPerspectiveCamera)s.fov=IQ*2*Math.atan(1/s.projectionMatrix.elements[5]),s.zoom=1}this.getCamera=function(){return b},this.getFoveation=function(){if(q===null&&N===null)return;return Y},this.setFoveation=function(s){if(Y=s,q!==null)q.fixedFoveation=s;if(N!==null&&N.fixedFoveation!==void 0)N.fixedFoveation=s},this.hasDepthSensing=function(){return V.texture!==null},this.getDepthSensingMesh=function(){return V.getMesh(b)},this.getCameraTexture=function(s){return F[s]};let L0=null;function d(s,G0){if(X=G0.getViewerPose(W||U),D=G0,X!==null){let X0=X.views;if(N!==null)J.setRenderTargetFramebuffer(C,N.framebuffer),J.setRenderTarget(C);let c=!1;if(X0.length!==b.cameras.length)b.cameras.length=0,c=!0;for(let K0=0;K0<X0.length;K0++){let R0=X0[K0],B0=null;if(N!==null)B0=N.getViewport(R0);else{let w0=G.getViewSubImage(q,R0);if(B0=w0.viewport,K0===0)J.setRenderTargetTextures(C,w0.colorTexture,w0.depthStencilTexture),J.setRenderTarget(C)}let A0=S[K0];if(A0===void 0)A0=new Q7,A0.layers.enable(K0),A0.viewport=new X7,S[K0]=A0;if(A0.matrix.fromArray(R0.transform.matrix),A0.matrix.decompose(A0.position,A0.quaternion,A0.scale),A0.projectionMatrix.fromArray(R0.projectionMatrix),A0.projectionMatrixInverse.copy(A0.projectionMatrix).invert(),A0.viewport.set(B0.x,B0.y,B0.width,B0.height),K0===0)b.matrix.copy(A0.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale);if(c===!0)b.cameras.push(A0)}let C0=$.enabledFeatures;if(C0&&C0.includes("depth-sensing")&&$.depthUsage=="gpu-optimized"&&M){G=Z.getBinding();let K0=G.getDepthInformation(X0[0]);if(K0&&K0.isValid&&K0.texture)V.init(K0,$.renderState)}if(C0&&C0.includes("camera-access")&&M){J.state.unbindTexture(),G=Z.getBinding();for(let K0=0;K0<X0.length;K0++){let R0=X0[K0].camera;if(R0){let B0=F[R0];if(!B0)B0=new V$,F[R0]=B0;let A0=G.getCameraImage(R0);B0.sourceTexture=A0}}}}for(let X0=0;X0<R.length;X0++){let c=B[X0],C0=R[X0];if(c!==null&&C0!==void 0)C0.update(c,G0,W||U)}if(L0)L0(s,G0);if(G0.detectedPlanes)Z.dispatchEvent({type:"planesdetected",data:G0});D=null}let D0=new N5;D0.setAnimationLoop(d),this.setAnimationLoop=function(s){L0=s},this.dispose=function(){}}}var IF=new x9,z5=new D9;z5.set(-1,0,0,0,1,0,0,0,1);function BF(J,Q){function Z(F,O){if(F.matrixAutoUpdate===!0)F.updateMatrix();O.value.copy(F.matrix)}function $(F,O){if(O.color.getRGB(F.fogColor.value,SU(J)),O.isFog)F.fogNear.value=O.near,F.fogFar.value=O.far;else if(O.isFogExp2)F.fogDensity.value=O.density}function K(F,O,z,C,R){if(O.isNodeMaterial)O.uniformsNeedUpdate=!1;else if(O.isMeshBasicMaterial)U(F,O);else if(O.isMeshLambertMaterial){if(U(F,O),O.envMap)F.envMapIntensity.value=O.envMapIntensity}else if(O.isMeshToonMaterial)U(F,O),q(F,O);else if(O.isMeshPhongMaterial){if(U(F,O),G(F,O),O.envMap)F.envMapIntensity.value=O.envMapIntensity}else if(O.isMeshStandardMaterial){if(U(F,O),N(F,O),O.isMeshPhysicalMaterial)D(F,O,R)}else if(O.isMeshMatcapMaterial)U(F,O),M(F,O);else if(O.isMeshDepthMaterial)U(F,O);else if(O.isMeshDistanceMaterial)U(F,O),V(F,O);else if(O.isMeshNormalMaterial)U(F,O);else if(O.isLineBasicMaterial){if(H(F,O),O.isLineDashedMaterial)Y(F,O)}else if(O.isPointsMaterial)W(F,O,z,C);else if(O.isSpriteMaterial)X(F,O);else if(O.isShadowMaterial)F.color.value.copy(O.color),F.opacity.value=O.opacity;else if(O.isShaderMaterial)O.uniformsNeedUpdate=!1}function U(F,O){if(F.opacity.value=O.opacity,O.color)F.diffuse.value.copy(O.color);if(O.emissive)F.emissive.value.copy(O.emissive).multiplyScalar(O.emissiveIntensity);if(O.map)F.map.value=O.map,Z(O.map,F.mapTransform);if(O.alphaMap)F.alphaMap.value=O.alphaMap,Z(O.alphaMap,F.alphaMapTransform);if(O.bumpMap){if(F.bumpMap.value=O.bumpMap,Z(O.bumpMap,F.bumpMapTransform),F.bumpScale.value=O.bumpScale,O.side===B7)F.bumpScale.value*=-1}if(O.normalMap){if(F.normalMap.value=O.normalMap,Z(O.normalMap,F.normalMapTransform),F.normalScale.value.copy(O.normalScale),O.side===B7)F.normalScale.value.negate()}if(O.displacementMap)F.displacementMap.value=O.displacementMap,Z(O.displacementMap,F.displacementMapTransform),F.displacementScale.value=O.displacementScale,F.displacementBias.value=O.displacementBias;if(O.emissiveMap)F.emissiveMap.value=O.emissiveMap,Z(O.emissiveMap,F.emissiveMapTransform);if(O.specularMap)F.specularMap.value=O.specularMap,Z(O.specularMap,F.specularMapTransform);if(O.alphaTest>0)F.alphaTest.value=O.alphaTest;let z=Q.get(O),C=z.envMap,R=z.envMapRotation;if(C){if(F.envMap.value=C,F.envMapRotation.value.setFromMatrix4(IF.makeRotationFromEuler(R)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1)F.envMapRotation.value.premultiply(z5);F.reflectivity.value=O.reflectivity,F.ior.value=O.ior,F.refractionRatio.value=O.refractionRatio}if(O.lightMap)F.lightMap.value=O.lightMap,F.lightMapIntensity.value=O.lightMapIntensity,Z(O.lightMap,F.lightMapTransform);if(O.aoMap)F.aoMap.value=O.aoMap,F.aoMapIntensity.value=O.aoMapIntensity,Z(O.aoMap,F.aoMapTransform)}function H(F,O){if(F.diffuse.value.copy(O.color),F.opacity.value=O.opacity,O.map)F.map.value=O.map,Z(O.map,F.mapTransform)}function Y(F,O){F.dashSize.value=O.dashSize,F.totalSize.value=O.dashSize+O.gapSize,F.scale.value=O.scale}function W(F,O,z,C){if(F.diffuse.value.copy(O.color),F.opacity.value=O.opacity,F.size.value=O.size*z,F.scale.value=C*0.5,O.map)F.map.value=O.map,Z(O.map,F.uvTransform);if(O.alphaMap)F.alphaMap.value=O.alphaMap,Z(O.alphaMap,F.alphaMapTransform);if(O.alphaTest>0)F.alphaTest.value=O.alphaTest}function X(F,O){if(F.diffuse.value.copy(O.color),F.opacity.value=O.opacity,F.rotation.value=O.rotation,O.map)F.map.value=O.map,Z(O.map,F.mapTransform);if(O.alphaMap)F.alphaMap.value=O.alphaMap,Z(O.alphaMap,F.alphaMapTransform);if(O.alphaTest>0)F.alphaTest.value=O.alphaTest}function G(F,O){F.specular.value.copy(O.specular),F.shininess.value=Math.max(O.shininess,0.0001)}function q(F,O){if(O.gradientMap)F.gradientMap.value=O.gradientMap}function N(F,O){if(F.metalness.value=O.metalness,O.metalnessMap)F.metalnessMap.value=O.metalnessMap,Z(O.metalnessMap,F.metalnessMapTransform);if(F.roughness.value=O.roughness,O.roughnessMap)F.roughnessMap.value=O.roughnessMap,Z(O.roughnessMap,F.roughnessMapTransform);if(O.envMap)F.envMapIntensity.value=O.envMapIntensity}function D(F,O,z){if(F.ior.value=O.ior,O.sheen>0){if(F.sheenColor.value.copy(O.sheenColor).multiplyScalar(O.sheen),F.sheenRoughness.value=O.sheenRoughness,O.sheenColorMap)F.sheenColorMap.value=O.sheenColorMap,Z(O.sheenColorMap,F.sheenColorMapTransform);if(O.sheenRoughnessMap)F.sheenRoughnessMap.value=O.sheenRoughnessMap,Z(O.sheenRoughnessMap,F.sheenRoughnessMapTransform)}if(O.clearcoat>0){if(F.clearcoat.value=O.clearcoat,F.clearcoatRoughness.value=O.clearcoatRoughness,O.clearcoatMap)F.clearcoatMap.value=O.clearcoatMap,Z(O.clearcoatMap,F.clearcoatMapTransform);if(O.clearcoatRoughnessMap)F.clearcoatRoughnessMap.value=O.clearcoatRoughnessMap,Z(O.clearcoatRoughnessMap,F.clearcoatRoughnessMapTransform);if(O.clearcoatNormalMap){if(F.clearcoatNormalMap.value=O.clearcoatNormalMap,Z(O.clearcoatNormalMap,F.clearcoatNormalMapTransform),F.clearcoatNormalScale.value.copy(O.clearcoatNormalScale),O.side===B7)F.clearcoatNormalScale.value.negate()}}if(O.dispersion>0)F.dispersion.value=O.dispersion;if(O.retroreflectivity>0)F.retroreflectivity.value=O.retroreflectivity;if(O.iridescence>0){if(F.iridescence.value=O.iridescence,F.iridescenceIOR.value=O.iridescenceIOR,F.iridescenceThicknessMinimum.value=O.iridescenceThicknessRange[0],F.iridescenceThicknessMaximum.value=O.iridescenceThicknessRange[1],O.iridescenceMap)F.iridescenceMap.value=O.iridescenceMap,Z(O.iridescenceMap,F.iridescenceMapTransform);if(O.iridescenceThicknessMap)F.iridescenceThicknessMap.value=O.iridescenceThicknessMap,Z(O.iridescenceThicknessMap,F.iridescenceThicknessMapTransform)}if(O.transmission>0){if(F.transmission.value=O.transmission,F.transmissionSamplerMap.value=z.texture,F.transmissionSamplerSize.value.set(z.width,z.height),O.transmissionMap)F.transmissionMap.value=O.transmissionMap,Z(O.transmissionMap,F.transmissionMapTransform);if(F.thickness.value=O.thickness,O.thicknessMap)F.thicknessMap.value=O.thicknessMap,Z(O.thicknessMap,F.thicknessMapTransform);F.attenuationDistance.value=O.attenuationDistance,F.attenuationColor.value.copy(O.attenuationColor)}if(O.anisotropy>0){if(F.anisotropyVector.value.set(O.anisotropy*Math.cos(O.anisotropyRotation),O.anisotropy*Math.sin(O.anisotropyRotation)),O.anisotropyMap)F.anisotropyMap.value=O.anisotropyMap,Z(O.anisotropyMap,F.anisotropyMapTransform)}if(F.specularIntensity.value=O.specularIntensity,F.specularColor.value.copy(O.specularColor),O.specularColorMap)F.specularColorMap.value=O.specularColorMap,Z(O.specularColorMap,F.specularColorMapTransform);if(O.specularIntensityMap)F.specularIntensityMap.value=O.specularIntensityMap,Z(O.specularIntensityMap,F.specularIntensityMapTransform)}function M(F,O){if(O.matcap)F.matcap.value=O.matcap}function V(F,O){let z=Q.get(O).light;F.referencePosition.value.setFromMatrixPosition(z.matrixWorld),F.nearDistance.value=z.shadow.camera.near,F.farDistance.value=z.shadow.camera.far}return{refreshFogUniforms:$,refreshMaterialUniforms:K}}function _F(J,Q,Z,$){let K={},U={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function W(R,B){let _=B.program;$.uniformBlockBinding(R,_)}function X(R,B){let _=K[R.id];if(_===void 0)F(R),_=G(R),K[R.id]=_,R.addEventListener("dispose",z);let P=B.program;$.updateUBOMapping(R,P);let E=Q.render.frame;if(U[R.id]!==E)N(R),U[R.id]=E}function G(R){let B=q();R.__bindingPointIndex=B;let _=J.createBuffer(),P=R.__size,E=R.usage;return J.bindBuffer(J.UNIFORM_BUFFER,_),J.bufferData(J.UNIFORM_BUFFER,P,E),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,B,_),_}function q(){for(let R=0;R<Y;R++)if(H.indexOf(R)===-1)return H.push(R),R;return X9("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function N(R){let B=K[R.id],_=R.uniforms,P=R.__cache;J.bindBuffer(J.UNIFORM_BUFFER,B);for(let E=0,A=_.length;E<A;E++){let y=_[E];if(Array.isArray(y))for(let S=0,b=y.length;S<b;S++)D(y[S],E,S,P);else D(y,E,0,P)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function D(R,B,_,P){if(V(R,B,_,P)===!0){let{__offset:E,value:A}=R;if(Array.isArray(A)){let y=0;for(let S=0;S<A.length;S++){let b=A[S],e=O(b);if(M(b,R.__data,y),typeof b!=="number"&&typeof b!=="boolean"&&!b.isMatrix3&&!ArrayBuffer.isView(b))y+=e.storage/Float32Array.BYTES_PER_ELEMENT}}else M(A,R.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,E,R.__data)}}function M(R,B,_){if(typeof R==="number"||typeof R==="boolean")B[0]=R;else if(R.isMatrix3)B[0]=R.elements[0],B[1]=R.elements[1],B[2]=R.elements[2],B[3]=0,B[4]=R.elements[3],B[5]=R.elements[4],B[6]=R.elements[5],B[7]=0,B[8]=R.elements[6],B[9]=R.elements[7],B[10]=R.elements[8],B[11]=0;else if(ArrayBuffer.isView(R))B.set(new R.constructor(R.buffer,R.byteOffset,B.length));else R.toArray(B,_)}function V(R,B,_,P){let E=R.value,A=B+"_"+_;if(P[A]===void 0){if(typeof E==="number"||typeof E==="boolean")P[A]=E;else if(ArrayBuffer.isView(E))P[A]=E.slice();else P[A]=E.clone();return!0}else{let y=P[A];if(typeof E==="number"||typeof E==="boolean"){if(y!==E)return P[A]=E,!0}else if(ArrayBuffer.isView(E))return!0;else if(y.equals(E)===!1)return y.copy(E),!0}return!1}function F(R){let B=R.uniforms,_=0,P=16;for(let A=0,y=B.length;A<y;A++){let S=Array.isArray(B[A])?B[A]:[B[A]];for(let b=0,e=S.length;b<e;b++){let v=S[b],l=Array.isArray(v.value)?v.value:[v.value];for(let U0=0,i=l.length;U0<i;U0++){let r=l[U0],u=O(r),h=_%P,H0=h%u.boundary,E0=h+H0;if(_+=H0,E0!==0&&P-E0<u.storage)_+=P-E0;v.__data=new Float32Array(u.storage/Float32Array.BYTES_PER_ELEMENT),v.__offset=_,_+=u.storage}}}let E=_%P;if(E>0)_+=P-E;return R.__size=_,R.__cache={},this}function O(R){let B={boundary:0,storage:0};if(typeof R==="number"||typeof R==="boolean")B.boundary=4,B.storage=4;else if(R.isVector2)B.boundary=8,B.storage=8;else if(R.isVector3||R.isColor)B.boundary=16,B.storage=12;else if(R.isVector4)B.boundary=16,B.storage=16;else if(R.isMatrix3)B.boundary=48,B.storage=48;else if(R.isMatrix4)B.boundary=64,B.storage=64;else if(R.isTexture)H9("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(R))B.boundary=16,B.storage=R.byteLength;else H9("WebGLRenderer: Unsupported uniform value type.",R);return B}function z(R){let B=R.target;B.removeEventListener("dispose",z);let _=H.indexOf(B.__bindingPointIndex);H.splice(_,1),J.deleteBuffer(K[B.id]),delete K[B.id],delete U[B.id]}function C(){for(let R in K)J.deleteBuffer(K[R]);H=[],K={},U={}}return{bind:W,update:X,dispose:C}}var AF=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),c8=null;function zF(){if(c8===null)c8=new c6(AF,16,16,nJ,L7),c8.name="DFG_LUT",c8.minFilter=i7,c8.magFilter=i7,c8.wrapS=K$,c8.wrapT=K$,c8.generateMipmaps=!1,c8.needsUpdate=!0;return c8}class W8{constructor(J={}){let{canvas:Q=LW(),context:Z=null,depth:$=!0,stencil:K=!1,alpha:U=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:W=!1,powerPreference:X="default",failIfMajorPerformanceCaveat:G=!1,reversedDepthBuffer:q=!1,outputBufferType:N=_8}=J;this.isWebGLRenderer=!0;let D;if(Z!==null){if(typeof WebGLRenderingContext<"u"&&Z instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=Z.getContextAttributes().alpha}else D=U;let M=N,V=new Set([xK,bK,fK]),F=new Set([_8,TJ,fQ,l6,vK,yK]),O=new Uint32Array(4),z=new Int32Array(4),C=new k,R=null,B=null,_=[],P=[],E=null;this.domElement=Q,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=B8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,y=!1,S=null,b=null,e=null,v=null;this._outputColorSpace=F7;let l=0,U0=0,i=null,r=-1,u=null,h=new X7,H0=new X7,E0=null,L0=new Y0(0),d=0,D0=Q.width,s=Q.height,G0=1,X0=null,c=null,C0=new X7(0,0,D0,s),t=new X7(0,0,D0,s),u0=!1,K0=new gQ,R0=!1,B0=!1,A0=new x9,w0=new k,r0=new X7,Q9={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},O9=!1;function M9(){return i===null?G0:1}let x=Z;function a9(T,p){return Q.getContext(T,p)}let _9,C9,w,L,g,Q0,V0,z0,S0,W0,F0,p0,t0,v0,P0,Z9,Y9,g9,m,k0,N0,j0,m0;try{let T={alpha:!0,depth:$,stencil:K,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:W,powerPreference:X,failIfMajorPerformanceCaveat:G};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${jY}`);if(Q.addEventListener("webglcontextlost",R9,!1),Q.addEventListener("webglcontextrestored",$7,!1),Q.addEventListener("webglcontextcreationerror",c9,!1),x===null){if(x=a9("webgl2",T),x===null)if(a9("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}I0()}catch(T){throw Q.removeEventListener("webglcontextlost",R9,!1),Q.removeEventListener("webglcontextrestored",$7,!1),Q.removeEventListener("webglcontextcreationerror",c9,!1),X9("WebGLRenderer: "+T.message),T}function I0(){if(_9=new kq(x),_9.init(),N0=new RF(x,_9),C9=new Bq(x,_9,J,N0),w=new OF(x,_9),C9.reversedDepthBuffer&&q)w.buffers.depth.setReversed(!0);b=x.createFramebuffer(),e=x.createFramebuffer(),v=x.createFramebuffer(),L=new yq(x),g=new QF,Q0=new MF(x,_9,w,g,C9,N0,L),V0=new Sq(A),z0=new bG(x),j0=new Vq(x,z0),S0=new jq(x,z0,L,j0),W0=new bq(x,S0,z0,j0,L),g9=new fq(x,C9,Q0),P0=new _q(g),F0=new JF(A,V0,_9,C9,j0,P0),p0=new BF(A,g),t0=new $F,v0=new XF(_9),Y9=new Eq(A,V0,w,W0,D,Y),Z9=new FF(A,W0,C9),m0=new _F(x,L,C9,w),m=new Iq(x,_9,L),k0=new vq(x,_9,L),L.programs=F0.programs,A.capabilities=C9,A.extensions=_9,A.properties=g,A.renderLists=t0,A.shadowMap=Z9,A.state=w,A.info=L}if(M!==_8)E=new hq(M,Q.width,Q.height,H,$,K);let b0=new A5(A,x);this.xr=b0,this.getContext=function(){return x},this.getContextAttributes=function(){return x.getContextAttributes()},this.forceContextLoss=function(){let T=_9.get("WEBGL_lose_context");if(T)T.loseContext()},this.forceContextRestore=function(){let T=_9.get("WEBGL_lose_context");if(T)T.restoreContext()},this.getPixelRatio=function(){return G0},this.setPixelRatio=function(T){if(T===void 0)return;G0=T,this.setSize(D0,s,!1)},this.getSize=function(T){return T.set(D0,s)},this.setSize=function(T,p,Z0=!0){if(b0.isPresenting){H9("WebGLRenderer: Can't change size while VR device is presenting.");return}if(D0=T,s=p,Q.width=Math.floor(T*G0),Q.height=Math.floor(p*G0),Z0===!0)Q.style.width=T+"px",Q.style.height=p+"px";if(E!==null)E.setSize(Q.width,Q.height);this.setViewport(0,0,T,p)},this.getDrawingBufferSize=function(T){return T.set(D0*G0,s*G0).floor()},this.setDrawingBufferSize=function(T,p,Z0){D0=T,s=p,G0=Z0,Q.width=Math.floor(T*Z0),Q.height=Math.floor(p*Z0),this.setViewport(0,0,T,p)},this.setEffects=function(T){if(M===_8){X9("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let p=0;p<T.length;p++)if(T[p].isOutputPass===!0){H9("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(h)},this.getViewport=function(T){return T.copy(C0)},this.setViewport=function(T,p,Z0,o){if(T.isVector4)C0.set(T.x,T.y,T.z,T.w);else C0.set(T,p,Z0,o);w.viewport(h.copy(C0).multiplyScalar(G0).round())},this.getScissor=function(T){return T.copy(t)},this.setScissor=function(T,p,Z0,o){if(T.isVector4)t.set(T.x,T.y,T.z,T.w);else t.set(T,p,Z0,o);w.scissor(H0.copy(t).multiplyScalar(G0).round())},this.getScissorTest=function(){return u0},this.setScissorTest=function(T){w.setScissorTest(u0=T)},this.setOpaqueSort=function(T){X0=T},this.setTransparentSort=function(T){c=T},this.getClearColor=function(T){return T.copy(Y9.getClearColor())},this.setClearColor=function(){Y9.setClearColor(...arguments)},this.getClearAlpha=function(){return Y9.getClearAlpha()},this.setClearAlpha=function(){Y9.setClearAlpha(...arguments)},this.clear=function(T=!0,p=!0,Z0=!0){let o=0;if(T){let a=!1;if(i!==null){let g0=i.texture.format;a=V.has(g0)}if(a){let g0=i.texture.type,l0=F.has(g0),x0=Y9.getClearColor(),s0=Y9.getClearAlpha(),o0=x0.r,V9=x0.g,L9=x0.b;if(l0)O[0]=o0,O[1]=V9,O[2]=L9,O[3]=s0,x.clearBufferuiv(x.COLOR,0,O);else z[0]=o0,z[1]=V9,z[2]=L9,z[3]=s0,x.clearBufferiv(x.COLOR,0,z)}else o|=x.COLOR_BUFFER_BIT}if(p)o|=x.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(Z0)o|=x.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(o!==0)x.clear(o)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),S=T},this.dispose=function(){Q.removeEventListener("webglcontextlost",R9,!1),Q.removeEventListener("webglcontextrestored",$7,!1),Q.removeEventListener("webglcontextcreationerror",c9,!1),Y9.dispose(),t0.dispose(),v0.dispose(),g.dispose(),V0.dispose(),W0.dispose(),j0.dispose(),m0.dispose(),F0.dispose(),b0.dispose(),b0.removeEventListener("sessionstart",bH),b0.removeEventListener("sessionend",xH),fJ.stop()};function R9(T){T.preventDefault(),VQ("WebGLRenderer: Context Lost."),y=!0}function $7(){VQ("WebGLRenderer: Context Restored."),y=!1;let T=L.autoReset,p=Z9.enabled,Z0=Z9.autoUpdate,o=Z9.needsUpdate,a=Z9.type;I0(),L.autoReset=T,Z9.enabled=p,Z9.autoUpdate=Z0,Z9.needsUpdate=o,Z9.type=a}function c9(T){X9("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function f8(T){let p=T.target;p.removeEventListener("dispose",f8),a8(p)}function a8(T){VX(T),g.remove(T)}function VX(T){let p=g.get(T).programs;if(p!==void 0){if(p.forEach(function(Z0){F0.releaseProgram(Z0)}),T.isShaderMaterial)F0.releaseShaderCache(T)}}this.renderBufferDirect=function(T,p,Z0,o,a,g0){if(p===null)p=Q9;let l0=a.isMesh&&a.matrixWorld.determinantAffine()<0,x0=_X(T,p,Z0,o,a);w.setMaterial(o,l0);let s0=Z0.index,o0=1;if(o.wireframe===!0){if(s0=S0.getWireframeAttribute(Z0),s0===void 0)return;o0=2}let V9=Z0.drawRange,L9=Z0.attributes.position,i0=V9.start*o0,n9=(V9.start+V9.count)*o0;if(g0!==null)i0=Math.max(i0,g0.start*o0),n9=Math.min(n9,(g0.start+g0.count)*o0);if(s0!==null)i0=Math.max(i0,0),n9=Math.min(n9,s0.count);else if(L9!==void 0&&L9!==null)i0=Math.max(i0,0),n9=Math.min(n9,L9.count);let V7=n9-i0;if(V7<0||V7===1/0)return;j0.setup(a,o,x0,Z0,s0);let W7,J7=m;if(s0!==null)W7=z0.get(s0),J7=k0,J7.setIndex(W7);if(a.isMesh)if(o.wireframe===!0)w.setLineWidth(o.wireframeLinewidth*M9()),J7.setMode(x.LINES);else J7.setMode(x.TRIANGLES);else if(a.isLine){let f7=o.linewidth;if(f7===void 0)f7=1;if(w.setLineWidth(f7*M9()),a.isLineSegments)J7.setMode(x.LINES);else if(a.isLineLoop)J7.setMode(x.LINE_LOOP);else J7.setMode(x.LINE_STRIP)}else if(a.isPoints)J7.setMode(x.POINTS);else if(a.isSprite)J7.setMode(x.TRIANGLES);if(a.isBatchedMesh)if(!_9.get("WEBGL_multi_draw")){let{_multiDrawStarts:f7,_multiDrawCounts:d0,_multiDrawCount:g7}=a,b9=s0?z0.get(s0).bytesPerElement:1,N8=g.get(o).currentProgram.getUniforms();for(let b8=0;b8<g7;b8++)N8.setValue(x,"_gl_DrawID",b8),J7.render(f7[b8]/b9,d0[b8])}else J7.renderMultiDraw(a._multiDrawStarts,a._multiDrawCounts,a._multiDrawCount);else if(a.isInstancedMesh)J7.renderInstances(i0,V7,a.count);else if(Z0.isInstancedBufferGeometry){let f7=Z0._maxInstanceCount!==void 0?Z0._maxInstanceCount:1/0,d0=Math.min(Z0.instanceCount,f7);J7.renderInstances(i0,V7,d0)}else J7.render(i0,V7)};function fH(T,p,Z0,o){if(S!==null&&T.isNodeMaterial)S.setObject(o,T);if(R0===!0)P0.setState(T,Z0,!1);if(T.transparent===!0&&T.side===m9&&T.forceSinglePass===!1)T.side=B7,T.needsUpdate=!0,MZ(T,p,o),T.side=u6,T.needsUpdate=!0,MZ(T,p,o),T.side=m9;else MZ(T,p,o)}this.compile=function(T,p,Z0=null){if(Z0===null)Z0=T;if(S!==null)S.renderStart(T,p,Z0);if(B=v0.get(Z0),B.init(p),P.push(B),Z0.traverseVisible(function(a){if(a.isLight&&a.layers.test(p.layers)){if(B.pushLight(a),a.castShadow)B.pushShadow(a)}}),T!==Z0)T.traverseVisible(function(a){if(a.isLight&&a.layers.test(p.layers)){if(B.pushLight(a),a.castShadow)B.pushShadow(a)}});if(B.setupLights(),S!==null)S.updateLights(B.state.lightsArray);if(B0=this.localClippingEnabled,R0=P0.init(this.clippingPlanes,B0),R0===!0)P0.setGlobalState(this.clippingPlanes,p);if(S!==null)Z9.render(B.state.shadowsArray,Z0,p);let o=new Set;if(T.traverse(function(a){if(!(a.isMesh||a.isPoints||a.isLine||a.isSprite))return;let g0=a.material;if(g0)if(Array.isArray(g0))for(let l0=0;l0<g0.length;l0++){let x0=g0[l0];fH(x0,Z0,p,a),o.add(x0)}else fH(g0,Z0,p,a),o.add(g0)}),B=P.pop(),S!==null)S.renderEnd();return o},this.compileAsync=function(T,p,Z0=null){let o=this.compile(T,p,Z0);return new Promise((a)=>{function g0(){if(o.forEach(function(l0){let s0=g.get(l0).currentProgram;if(s0===void 0||s0.isReady())o.delete(l0)}),o.size===0){a(T);return}setTimeout(g0,10)}if(_9.get("KHR_parallel_shader_compile")!==null)g0();else setTimeout(g0,10)})};let o$=null;function IX(T){if(o$)o$(T)}function bH(){fJ.stop()}function xH(){fJ.start()}let fJ=new N5;if(fJ.setAnimationLoop(IX),typeof self<"u")fJ.setContext(self);this.setAnimationLoop=function(T){o$=T,b0.setAnimationLoop(T),T===null?fJ.stop():fJ.start()},b0.addEventListener("sessionstart",bH),b0.addEventListener("sessionend",xH),this.render=function(T,p){if(p!==void 0&&p.isCamera!==!0){X9("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(S!==null)S.renderStart(T,p);let Z0=b0.enabled===!0&&b0.isPresenting===!0,o=E!==null&&(i===null||Z0)&&E.begin(A,i);if(T.matrixWorldAutoUpdate===!0)T.updateMatrixWorld();if(p.parent===null&&p.matrixWorldAutoUpdate===!0)p.updateMatrixWorld();if(b0.enabled===!0&&b0.isPresenting===!0&&(E===null||E.isCompositing()===!1)){if(b0.cameraAutoUpdate===!0)b0.updateCamera(p);p=b0.getCamera()}if(T.isScene===!0)T.onBeforeRender(A,T,p,i);if(B=v0.get(T,P.length),B.init(p),B.state.textureUnits=Q0.getTextureUnits(),P.push(B),A0.multiplyMatrices(p.projectionMatrix,p.matrixWorldInverse),K0.setFromProjectionMatrix(A0,VU,p.reversedDepth),B0=this.localClippingEnabled,R0=P0.init(this.clippingPlanes,B0),R=t0.get(T,_.length),R.init(),_.push(R),b0.enabled===!0&&b0.isPresenting===!0){let l0=A.xr.getDepthSensingMesh();if(l0!==null)a$(l0,p,-1/0,A.sortObjects)}if(a$(T,p,0,A.sortObjects),R.finish(),S!==null)S.updateLights(B.state.lightsArray);if(A.sortObjects===!0)R.sort(X0,c);if(O9=b0.enabled===!1||b0.isPresenting===!1||b0.hasDepthSensing()===!1,O9)Y9.addToRenderList(R,T);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(R0===!0)P0.beginShadows();let a=B.state.shadowsArray;if(Z9.render(a,T,p),R0===!0)P0.endShadows();if((o&&E.hasRenderPass())===!1){let{opaque:l0,transmissive:x0}=R;if(B.setupLights(),p.isArrayCamera){let s0=p.cameras;if(x0.length>0)for(let o0=0,V9=s0.length;o0<V9;o0++){let L9=s0[o0];gH(l0,x0,T,L9)}if(O9)Y9.render(T);for(let o0=0,V9=s0.length;o0<V9;o0++){let L9=s0[o0];hH(R,T,L9,L9.viewport)}}else{if(x0.length>0)gH(l0,x0,T,p);if(O9)Y9.render(T);hH(R,T,p)}}if(i!==null&&U0===0)Q0.updateMultisampleRenderTarget(i),Q0.updateRenderTargetMipmap(i);if(o)E.end(A);if(T.isScene===!0)T.onAfterRender(A,T,p);if(j0.resetDefaultState(),r=-1,u=null,P.pop(),P.length>0){if(B=P[P.length-1],Q0.setTextureUnits(B.state.textureUnits),R0===!0)P0.setGlobalState(A.clippingPlanes,B.state.camera)}else B=null;if(_.pop(),_.length>0)R=_[_.length-1];else R=null;if(S!==null)S.renderEnd()};function a$(T,p,Z0,o){if(T.visible===!1)return;if(T.layers.test(p.layers)){if(T.isGroup)Z0=T.renderOrder;else if(T.isLOD){if(T.autoUpdate===!0)T.update(p)}else if(T.isLightProbeGrid)B.pushLightProbeGrid(T);else if(T.isLight){if(B.pushLight(T),T.castShadow)B.pushShadow(T)}else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(K0)){if(o)r0.setFromMatrixPosition(T.matrixWorld).applyMatrix4(A0);let l0=W0.update(T),x0=T.material;if(x0.visible)R.push(T,l0,x0,Z0,r0.z,null,p)}}else if(T.isMesh||T.isLine||T.isPoints){if(!T.frustumCulled||T.intersectsFrustum(K0)){let l0=W0.update(T),x0=T.material;if(o){if(T.boundingSphere!==void 0){if(T.boundingSphere===null)T.computeBoundingSphere();r0.copy(T.boundingSphere.center)}else{if(l0.boundingSphere===null)l0.computeBoundingSphere();r0.copy(l0.boundingSphere.center)}r0.applyMatrix4(T.matrixWorld).applyMatrix4(A0)}if(Array.isArray(x0)){let s0=l0.groups;for(let o0=0,V9=s0.length;o0<V9;o0++){let L9=s0[o0],i0=x0[L9.materialIndex];if(i0&&i0.visible)R.push(T,l0,i0,Z0,r0.z,L9,p)}}else if(x0.visible)R.push(T,l0,x0,Z0,r0.z,null,p)}}}let g0=T.children;for(let l0=0,x0=g0.length;l0<x0;l0++)a$(g0[l0],p,Z0,o)}function hH(T,p,Z0,o){let{opaque:a,transmissive:g0,transparent:l0}=T;if(B.setupLightsView(Z0),R0===!0)P0.setGlobalState(A.clippingPlanes,Z0);if(o)w.viewport(h.copy(o));if(a.length>0)OZ(a,p,Z0);if(g0.length>0)OZ(g0,p,Z0);if(l0.length>0)OZ(l0,p,Z0);w.buffers.depth.setTest(!0),w.buffers.depth.setMask(!0),w.buffers.color.setMask(!0),w.setPolygonOffset(!1)}function gH(T,p,Z0,o){if((Z0.isScene===!0?Z0.overrideMaterial:null)!==null)return;if(B.state.transmissionRenderTarget[o.id]===void 0){let i0=_9.has("EXT_color_buffer_half_float")||_9.has("EXT_color_buffer_float");B.state.transmissionRenderTarget[o.id]=new M7(1,1,{generateMipmaps:!0,type:i0?L7:_8,minFilter:dJ,samples:Math.max(4,C9.samples),stencilBuffer:K,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:A9.workingColorSpace})}let g0=B.state.transmissionRenderTarget[o.id],l0=o.viewport||h;g0.setSize(l0.z*A.transmissionResolutionScale,l0.w*A.transmissionResolutionScale);let x0=A.getRenderTarget(),s0=A.getActiveCubeFace(),o0=A.getActiveMipmapLevel();if(A.setRenderTarget(g0),A.getClearColor(L0),d=A.getClearAlpha(),d<1)A.setClearColor(16777215,0.5);if(A.clear(),O9)Y9.render(Z0);let V9=A.toneMapping;A.toneMapping=B8;let L9=o.viewport;if(o.viewport!==void 0)o.viewport=void 0;if(B.setupLightsView(o),R0===!0)P0.setGlobalState(A.clippingPlanes,o);if(OZ(T,Z0,o),Q0.updateMultisampleRenderTarget(g0),Q0.updateRenderTargetMipmap(g0),_9.has("WEBGL_multisampled_render_to_texture")===!1){let i0=!1;for(let n9=0,V7=p.length;n9<V7;n9++){let W7=p[n9],{object:J7,geometry:f7,material:d0,group:g7}=W7;if(d0.side===m9&&J7.layers.test(o.layers)){let b9=d0.side;d0.side=B7,d0.needsUpdate=!0,pH(J7,Z0,o,f7,d0,g7),d0.side=b9,d0.needsUpdate=!0,i0=!0}}if(i0===!0)Q0.updateMultisampleRenderTarget(g0),Q0.updateRenderTargetMipmap(g0)}if(A.setRenderTarget(x0,s0,o0),A.setClearColor(L0,d),L9!==void 0)o.viewport=L9;A.toneMapping=V9}function OZ(T,p,Z0){let o=p.isScene===!0?p.overrideMaterial:null;for(let a=0,g0=T.length;a<g0;a++){let l0=T[a],{object:x0,geometry:s0,group:o0}=l0,V9=l0.material;if(V9.allowOverride===!0&&o!==null)V9=o;if(x0.layers.test(Z0.layers))pH(x0,p,Z0,s0,V9,o0)}}function pH(T,p,Z0,o,a,g0){if(S!==null&&a.isNodeMaterial)S.setObject(T,a);if(T.onBeforeRender(A,p,Z0,o,a,g0),T.modelViewMatrix.multiplyMatrices(Z0.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),a.onBeforeRender(A,p,Z0,o,T,g0),a.transparent===!0&&a.side===m9&&a.forceSinglePass===!1)a.side=B7,a.needsUpdate=!0,A.renderBufferDirect(Z0,p,o,a,T,g0),a.side=u6,a.needsUpdate=!0,A.renderBufferDirect(Z0,p,o,a,T,g0),a.side=m9;else A.renderBufferDirect(Z0,p,o,a,T,g0);T.onAfterRender(A,p,Z0,o,a,g0)}function MZ(T,p,Z0){if(p.isScene!==!0)p=Q9;let o=g.get(T),a=B.state.lights,g0=B.state.shadowsArray,l0=a.state.version,x0=F0.getParameters(T,a.state,g0,p,Z0,B.state.lightProbeGridArray),s0=F0.getProgramCacheKey(x0),o0=o.programs;o.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?p.environment:null,o.fog=p.fog;let V9=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;if(o.envMap=V0.get(T.envMap||o.environment,V9),o.envMapRotation=o.environment!==null&&T.envMap===null?p.environmentRotation:T.envMapRotation,o0===void 0)T.addEventListener("dispose",f8),o0=new Map,o.programs=o0;let L9=o0.get(s0);if(L9!==void 0){if(o.currentProgram===L9&&o.lightsStateVersion===l0)return mH(T,x0),L9}else{if(x0.uniforms=F0.getUniforms(T),S!==null&&T.isNodeMaterial)S.build(T,Z0,x0);T.onBeforeCompile(x0,A),L9=F0.acquireProgram(x0,s0),o0.set(s0,L9),o.uniforms=x0.uniforms}let i0=o.uniforms;if(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)i0.clippingPlanes=P0.uniform;if(mH(T,x0),o.needsLights=zX(T),o.lightsStateVersion=l0,o.needsLights)i0.ambientLightColor.value=a.state.ambient,i0.lightProbe.value=a.state.probe,i0.sunLights.value=a.state.sun,i0.sunLightShadows.value=a.state.sunShadow,i0.directionalLights.value=a.state.directional,i0.directionalLightShadows.value=a.state.directionalShadow,i0.spotLights.value=a.state.spot,i0.spotLightShadows.value=a.state.spotShadow,i0.rectAreaLights.value=a.state.rectArea,i0.ltc_1.value=a.state.rectAreaLTC1,i0.ltc_2.value=a.state.rectAreaLTC2,i0.pointLights.value=a.state.point,i0.pointLightShadows.value=a.state.pointShadow,i0.hemisphereLights.value=a.state.hemi,i0.sunShadowMatrix.value=a.state.sunShadowMatrix,i0.sunShadowCascade.value=a.state.sunShadowCascade,i0.directionalShadowMatrix.value=a.state.directionalShadowMatrix,i0.spotLightMatrix.value=a.state.spotLightMatrix,i0.spotLightMap.value=a.state.spotLightMap,i0.pointShadowMatrix.value=a.state.pointShadowMatrix;return o.lightProbeGrid=B.state.lightProbeGridArray.length>0,o.currentProgram=L9,o.uniformsList=null,L9}function uH(T){if(T.uniformsList===null){let p=T.currentProgram.getUniforms();T.uniformsList=rQ.seqWithValue(p.seq,T.uniforms)}return T.uniformsList}function mH(T,p){let Z0=g.get(T);Z0.outputColorSpace=p.outputColorSpace,Z0.batching=p.batching,Z0.batchingColor=p.batchingColor,Z0.instancing=p.instancing,Z0.instancingColor=p.instancingColor,Z0.instancingMorph=p.instancingMorph,Z0.skinning=p.skinning,Z0.morphTargets=p.morphTargets,Z0.morphNormals=p.morphNormals,Z0.morphColors=p.morphColors,Z0.morphTargetsCount=p.morphTargetsCount,Z0.numClippingPlanes=p.numClippingPlanes,Z0.numIntersection=p.numClipIntersection,Z0.vertexAlphas=p.vertexAlphas,Z0.vertexTangents=p.vertexTangents,Z0.toneMapping=p.toneMapping}function BX(T,p){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;C.setFromMatrixPosition(p.matrixWorld);for(let Z0=0,o=T.length;Z0<o;Z0++){let a=T[Z0];if(a.texture!==null&&a.boundingBox.containsPoint(C))return a}return null}function _X(T,p,Z0,o,a){if(p.isScene!==!0)p=Q9;Q0.resetTextureUnits();let g0=p.fog,l0=o.isMeshStandardMaterial||o.isMeshLambertMaterial||o.isMeshPhongMaterial?p.environment:null,x0=i===null?A.outputColorSpace:i.isXRRenderTarget===!0?i.texture.colorSpace:A9.workingColorSpace,s0=o.isMeshStandardMaterial||o.isMeshLambertMaterial&&!o.envMap||o.isMeshPhongMaterial&&!o.envMap,o0=V0.get(o.envMap||l0,s0),V9=o.vertexColors===!0&&!!Z0.attributes.color&&Z0.attributes.color.itemSize===4,L9=!!Z0.attributes.tangent&&(!!o.normalMap||o.anisotropy>0),i0=!!Z0.morphAttributes.position,n9=!!Z0.morphAttributes.normal,V7=!!Z0.morphAttributes.color,W7=B8;if(o.toneMapped){if(i===null||i.isXRRenderTarget===!0)W7=A.toneMapping}let J7=Z0.morphAttributes.position||Z0.morphAttributes.normal||Z0.morphAttributes.color,f7=J7!==void 0?J7.length:0,d0=g.get(o),g7=B.state.lights;if(R0===!0){if(B0===!0||T!==u){let K7=T===u&&o.id===r;P0.setState(o,T,K7)}}let b9=!1;if(o.version===d0.__version){if(d0.needsLights&&d0.lightsStateVersion!==g7.state.version)b9=!0;else if(d0.outputColorSpace!==x0)b9=!0;else if(a.isBatchedMesh&&d0.batching===!1)b9=!0;else if(!a.isBatchedMesh&&d0.batching===!0)b9=!0;else if(a.isBatchedMesh&&d0.batchingColor===!0&&a._colorsTexture===null)b9=!0;else if(a.isBatchedMesh&&d0.batchingColor===!1&&a._colorsTexture!==null)b9=!0;else if(a.isInstancedMesh&&d0.instancing===!1)b9=!0;else if(!a.isInstancedMesh&&d0.instancing===!0)b9=!0;else if(a.isSkinnedMesh&&d0.skinning===!1)b9=!0;else if(!a.isSkinnedMesh&&d0.skinning===!0)b9=!0;else if(a.isInstancedMesh&&d0.instancingColor===!0&&a.instanceColor===null)b9=!0;else if(a.isInstancedMesh&&d0.instancingColor===!1&&a.instanceColor!==null)b9=!0;else if(a.isInstancedMesh&&d0.instancingMorph===!0&&a.morphTexture===null)b9=!0;else if(a.isInstancedMesh&&d0.instancingMorph===!1&&a.morphTexture!==null)b9=!0;else if(d0.envMap!==o0)b9=!0;else if(o.fog===!0&&d0.fog!==g0)b9=!0;else if(d0.numClippingPlanes!==void 0&&(d0.numClippingPlanes!==P0.numPlanes||d0.numIntersection!==P0.numIntersection))b9=!0;else if(d0.vertexAlphas!==V9)b9=!0;else if(d0.vertexTangents!==L9)b9=!0;else if(d0.morphTargets!==i0)b9=!0;else if(d0.morphNormals!==n9)b9=!0;else if(d0.morphColors!==V7)b9=!0;else if(d0.toneMapping!==W7)b9=!0;else if(d0.morphTargetsCount!==f7)b9=!0;else if(!!d0.lightProbeGrid!==B.state.lightProbeGridArray.length>0)b9=!0}else b9=!0,d0.__version=o.version;let N8=d0.currentProgram;if(b9===!0){if(N8=MZ(o,p,a),S&&o.isNodeMaterial)S.onUpdateProgram(o,N8,d0)}let b8=!1,EJ=!1,M6=!1,r9=N8.getUniforms(),O7=d0.uniforms;if(w.useProgram(N8.program))b8=!0,EJ=!0,M6=!0;if(o.id!==r)r=o.id,EJ=!0;if(d0.needsLights){let K7=BX(B.state.lightProbeGridArray,a);if(d0.lightProbeGrid!==K7)d0.lightProbeGrid=K7,EJ=!0}if(b8||u!==T){if(w.buffers.depth.getReversed()&&T.reversedDepth!==!0)T._reversedDepth=!0,T.updateProjectionMatrix();r9.setValue(x,"projectionMatrix",T.projectionMatrix),r9.setValue(x,"viewMatrix",T.matrixWorldInverse);let IJ=r9.map.cameraPosition;if(IJ!==void 0)IJ.setValue(x,w0.setFromMatrixPosition(T.matrixWorld));if(C9.logarithmicDepthBuffer)r9.setValue(x,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2));if(o.isMeshPhongMaterial||o.isMeshToonMaterial||o.isMeshLambertMaterial||o.isMeshBasicMaterial||o.isMeshStandardMaterial||o.isShaderMaterial)r9.setValue(x,"isOrthographic",T.isOrthographicCamera===!0);if(u!==T)u=T,EJ=!0,M6=!0}if(d0.needsLights){if(g7.state.sunShadowMap.length>0)r9.setValue(x,"sunShadowMap",g7.state.sunShadowMap,Q0);if(g7.state.directionalShadowMap.length>0)r9.setValue(x,"directionalShadowMap",g7.state.directionalShadowMap,Q0);if(g7.state.spotShadowMap.length>0)r9.setValue(x,"spotShadowMap",g7.state.spotShadowMap,Q0);if(g7.state.pointShadowMap.length>0)r9.setValue(x,"pointShadowMap",g7.state.pointShadowMap,Q0)}if(a.isSkinnedMesh){r9.setOptional(x,a,"bindMatrix"),r9.setOptional(x,a,"bindMatrixInverse");let K7=a.skeleton;if(K7){if(K7.boneTexture===null)K7.computeBoneTexture();r9.setValue(x,"boneTexture",K7.boneTexture,Q0)}}if(a.isBatchedMesh){if(r9.setOptional(x,a,"batchingTexture"),r9.setValue(x,"batchingTexture",a._matricesTexture,Q0),r9.setOptional(x,a,"batchingIdTexture"),r9.setValue(x,"batchingIdTexture",a._indirectTexture,Q0),r9.setOptional(x,a,"batchingColorTexture"),a._colorsTexture!==null)r9.setValue(x,"batchingColorTexture",a._colorsTexture,Q0)}let VJ=Z0.morphAttributes;if(VJ.position!==void 0||VJ.normal!==void 0||VJ.color!==void 0)g9.update(a,Z0,N8);if(EJ||d0.receiveShadow!==a.receiveShadow)d0.receiveShadow=a.receiveShadow,r9.setValue(x,"receiveShadow",a.receiveShadow);if((o.isMeshStandardMaterial||o.isMeshLambertMaterial||o.isMeshPhongMaterial)&&o.envMap===null&&p.environment!==null)O7.envMapIntensity.value=p.environmentIntensity;if(O7.dfgLUT!==void 0)O7.dfgLUT.value=zF();if(EJ){if(r9.setValue(x,"toneMappingExposure",A.toneMappingExposure),d0.needsLights)AX(O7,M6);if(g0&&o.fog===!0)p0.refreshFogUniforms(O7,g0);if(p0.refreshMaterialUniforms(O7,o,G0,s,B.state.transmissionRenderTarget[T.id]),d0.needsLights&&d0.lightProbeGrid){let K7=d0.lightProbeGrid;O7.probesSH.value=K7.texture,O7.probesMin.value.copy(K7.boundingBox.min),O7.probesMax.value.copy(K7.boundingBox.max),O7.probesResolution.value.copy(K7.resolution)}rQ.upload(x,uH(d0),O7,Q0)}if(o.isShaderMaterial&&o.uniformsNeedUpdate===!0)rQ.upload(x,uH(d0),O7,Q0),o.uniformsNeedUpdate=!1;if(o.isSpriteMaterial)r9.setValue(x,"center",a.center);if(r9.setValue(x,"modelViewMatrix",a.modelViewMatrix),r9.setValue(x,"normalMatrix",a.normalMatrix),r9.setValue(x,"modelMatrix",a.matrixWorld),o.uniformsGroups!==void 0){let K7=o.uniformsGroups;for(let IJ=0,R6=K7.length;IJ<R6;IJ++){let lH=K7[IJ];m0.update(lH,N8),m0.bind(lH,N8)}}return N8}function AX(T,p){T.ambientLightColor.needsUpdate=p,T.lightProbe.needsUpdate=p,T.sunLights.needsUpdate=p,T.sunLightShadows.needsUpdate=p,T.directionalLights.needsUpdate=p,T.directionalLightShadows.needsUpdate=p,T.pointLights.needsUpdate=p,T.pointLightShadows.needsUpdate=p,T.spotLights.needsUpdate=p,T.spotLightShadows.needsUpdate=p,T.rectAreaLights.needsUpdate=p,T.hemisphereLights.needsUpdate=p}function zX(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return l},this.getActiveMipmapLevel=function(){return U0},this.getRenderTarget=function(){return i},this.setRenderTargetTextures=function(T,p,Z0){let o=g.get(T);if(o.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,o.__autoAllocateDepthBuffer===!1)o.__useRenderToTexture=!1;g.get(T.texture).__webglTexture=p,g.get(T.depthTexture).__webglTexture=o.__autoAllocateDepthBuffer?void 0:Z0,o.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,p){let Z0=g.get(T);Z0.__webglFramebuffer=p,Z0.__useDefaultFramebuffer=p===void 0},this.setRenderTarget=function(T,p=0,Z0=0){i=T,l=p,U0=Z0;let o=null,a=!1,g0=!1;if(T){let x0=g.get(T);if(x0.__useDefaultFramebuffer!==void 0){w.bindFramebuffer(x.FRAMEBUFFER,x0.__webglFramebuffer),h.copy(T.viewport),H0.copy(T.scissor),E0=T.scissorTest,w.viewport(h),w.scissor(H0),w.setScissorTest(E0),r=-1;return}else if(x0.__webglFramebuffer===void 0)Q0.setupRenderTarget(T);else if(x0.__hasExternalTextures)Q0.rebindTextures(T,g.get(T.texture).__webglTexture,g.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let V9=T.depthTexture;if(x0.__boundDepthTexture!==V9){if(V9!==null&&g.has(V9)&&(T.width!==V9.image.width||T.height!==V9.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q0.setupDepthRenderbuffer(T)}}let s0=T.texture;if(s0.isData3DTexture||s0.isDataArrayTexture||s0.isCompressedArrayTexture)g0=!0;let o0=g.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget){if(Array.isArray(o0[p]))o=o0[p][Z0];else o=o0[p];a=!0}else if(T.samples>0&&Q0.useMultisampledRTT(T)===!1)o=g.get(T).__webglMultisampledFramebuffer;else if(Array.isArray(o0))o=o0[Z0];else o=o0;h.copy(T.viewport),H0.copy(T.scissor),E0=T.scissorTest}else h.copy(C0).multiplyScalar(G0).floor(),H0.copy(t).multiplyScalar(G0).floor(),E0=u0;if(Z0!==0)o=b;if(w.bindFramebuffer(x.FRAMEBUFFER,o))w.drawBuffers(T,o);if(w.viewport(h),w.scissor(H0),w.setScissorTest(E0),a){let x0=g.get(T.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_CUBE_MAP_POSITIVE_X+p,x0.__webglTexture,Z0)}else if(g0){let x0=p;for(let s0=0;s0<T.textures.length;s0++){let o0=g.get(T.textures[s0]);x.framebufferTextureLayer(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0+s0,o0.__webglTexture,Z0,x0)}}else if(T!==null&&Z0!==0){let x0=g.get(T.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,x0.__webglTexture,Z0)}r=-1};function dH(T){let p=g.get(T);if(p.__readFormat!==T.format||p.__readType!==T.type)p.__readFormat=T.format,p.__readType=T.type,p.__formatReadable=C9.textureFormatReadable(T.format),p.__typeReadable=C9.textureTypeReadable(T.type);return p}if(this.readRenderTargetPixels=function(T,p,Z0,o,a,g0,l0,x0=0){if(!(T&&T.isWebGLRenderTarget)){X9("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let s0=g.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&l0!==void 0)s0=s0[l0];if(s0){w.bindFramebuffer(x.FRAMEBUFFER,s0);try{let o0=T.textures[x0],V9=o0.format,L9=o0.type;if(T.textures.length>1)x.readBuffer(x.COLOR_ATTACHMENT0+x0);let i0=dH(o0);if(i0.__formatReadable===!1){X9("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(i0.__typeReadable===!1){X9("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(p>=0&&p<=T.width-o&&(Z0>=0&&Z0<=T.height-a))x.readPixels(p,Z0,o,a,N0.convert(V9),N0.convert(L9),g0)}finally{let o0=i!==null?g.get(i).__webglFramebuffer:null;w.bindFramebuffer(x.FRAMEBUFFER,o0)}}},this.readRenderTargetPixelsAsync=async function(T,p,Z0,o,a,g0,l0,x0=0){if(!(T&&T.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let s0=g.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&l0!==void 0)s0=s0[l0];if(s0)if(p>=0&&p<=T.width-o&&(Z0>=0&&Z0<=T.height-a)){w.bindFramebuffer(x.FRAMEBUFFER,s0);let o0=T.textures[x0],V9=o0.format,L9=o0.type;if(T.textures.length>1)x.readBuffer(x.COLOR_ATTACHMENT0+x0);let i0=dH(o0);if(i0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(i0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let n9=x.createBuffer();x.bindBuffer(x.PIXEL_PACK_BUFFER,n9),x.bufferData(x.PIXEL_PACK_BUFFER,g0.byteLength,x.STREAM_READ),x.readPixels(p,Z0,o,a,N0.convert(V9),N0.convert(L9),0),x.bindBuffer(x.PIXEL_PACK_BUFFER,null);let V7=i!==null?g.get(i).__webglFramebuffer:null;w.bindFramebuffer(x.FRAMEBUFFER,V7);let W7=x.fenceSync(x.SYNC_GPU_COMMANDS_COMPLETE,0);return x.flush(),await wW(x,W7,4),x.bindBuffer(x.PIXEL_PACK_BUFFER,n9),x.getBufferSubData(x.PIXEL_PACK_BUFFER,0,g0),x.bindBuffer(x.PIXEL_PACK_BUFFER,null),x.deleteBuffer(n9),x.deleteSync(W7),g0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,p=null,Z0=0){let o=Math.pow(2,-Z0),a=Math.floor(T.image.width*o),g0=Math.floor(T.image.height*o),l0=p!==null?p.x:0,x0=p!==null?p.y:0;Q0.setTexture2D(T,0),x.copyTexSubImage2D(x.TEXTURE_2D,Z0,0,0,l0,x0,a,g0),w.unbindTexture()},this.copyTextureToTexture=function(T,p,Z0=null,o=null,a=0,g0=0){let l0,x0,s0,o0,V9,L9,i0,n9,V7,W7=T.isCompressedTexture?T.mipmaps[g0]:T.image;if(Z0!==null)l0=Z0.max.x-Z0.min.x,x0=Z0.max.y-Z0.min.y,s0=Z0.isBox3?Z0.max.z-Z0.min.z:1,o0=Z0.min.x,V9=Z0.min.y,L9=Z0.isBox3?Z0.min.z:0;else{let O7=Math.pow(2,-a);if(l0=Math.floor(W7.width*O7),x0=Math.floor(W7.height*O7),T.isDataArrayTexture)s0=W7.depth;else if(T.isData3DTexture)s0=Math.floor(W7.depth*O7);else s0=1;o0=0,V9=0,L9=0}if(o!==null)i0=o.x,n9=o.y,V7=o.z;else i0=0,n9=0,V7=0;let J7=N0.convert(p.format),f7=N0.convert(p.type),d0;if(p.isData3DTexture)Q0.setTexture3D(p,0),d0=x.TEXTURE_3D;else if(p.isDataArrayTexture||p.isCompressedArrayTexture)Q0.setTexture2DArray(p,0),d0=x.TEXTURE_2D_ARRAY;else Q0.setTexture2D(p,0),d0=x.TEXTURE_2D;w.activeTexture(x.TEXTURE0),w.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,p.flipY),w.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),w.pixelStorei(x.UNPACK_ALIGNMENT,p.unpackAlignment);let g7=w.getParameter(x.UNPACK_ROW_LENGTH),b9=w.getParameter(x.UNPACK_IMAGE_HEIGHT),N8=w.getParameter(x.UNPACK_SKIP_PIXELS),b8=w.getParameter(x.UNPACK_SKIP_ROWS),EJ=w.getParameter(x.UNPACK_SKIP_IMAGES);w.pixelStorei(x.UNPACK_ROW_LENGTH,W7.width),w.pixelStorei(x.UNPACK_IMAGE_HEIGHT,W7.height),w.pixelStorei(x.UNPACK_SKIP_PIXELS,o0),w.pixelStorei(x.UNPACK_SKIP_ROWS,V9),w.pixelStorei(x.UNPACK_SKIP_IMAGES,L9);let M6=T.isDataArrayTexture||T.isData3DTexture,r9=p.isDataArrayTexture||p.isData3DTexture;if(T.isDepthTexture){let O7=g.get(T),VJ=g.get(p),K7=g.get(O7.__renderTarget),IJ=g.get(VJ.__renderTarget);w.bindFramebuffer(x.READ_FRAMEBUFFER,K7.__webglFramebuffer),w.bindFramebuffer(x.DRAW_FRAMEBUFFER,IJ.__webglFramebuffer);for(let R6=0;R6<s0;R6++){if(M6)x.framebufferTextureLayer(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,g.get(T).__webglTexture,a,L9+R6),x.framebufferTextureLayer(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,g.get(p).__webglTexture,g0,V7+R6);x.blitFramebuffer(o0,V9,l0,x0,i0,n9,l0,x0,x.DEPTH_BUFFER_BIT,x.NEAREST)}w.bindFramebuffer(x.READ_FRAMEBUFFER,null),w.bindFramebuffer(x.DRAW_FRAMEBUFFER,null)}else if(a!==0||T.isRenderTargetTexture||g.has(T)){let O7=g.get(T),VJ=g.get(p);w.bindFramebuffer(x.READ_FRAMEBUFFER,e),w.bindFramebuffer(x.DRAW_FRAMEBUFFER,v);for(let K7=0;K7<s0;K7++){if(M6)x.framebufferTextureLayer(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,O7.__webglTexture,a,L9+K7);else x.framebufferTexture2D(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,O7.__webglTexture,a);if(r9)x.framebufferTextureLayer(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,VJ.__webglTexture,g0,V7+K7);else x.framebufferTexture2D(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,VJ.__webglTexture,g0);if(a!==0)x.blitFramebuffer(o0,V9,l0,x0,i0,n9,l0,x0,x.COLOR_BUFFER_BIT,x.NEAREST);else if(r9)x.copyTexSubImage3D(d0,g0,i0,n9,V7+K7,o0,V9,l0,x0);else x.copyTexSubImage2D(d0,g0,i0,n9,o0,V9,l0,x0)}w.bindFramebuffer(x.READ_FRAMEBUFFER,null),w.bindFramebuffer(x.DRAW_FRAMEBUFFER,null)}else if(r9)if(T.isDataTexture||T.isData3DTexture)x.texSubImage3D(d0,g0,i0,n9,V7,l0,x0,s0,J7,f7,W7.data);else if(p.isCompressedArrayTexture)x.compressedTexSubImage3D(d0,g0,i0,n9,V7,l0,x0,s0,J7,W7.data);else x.texSubImage3D(d0,g0,i0,n9,V7,l0,x0,s0,J7,f7,W7);else if(T.isDataTexture)x.texSubImage2D(x.TEXTURE_2D,g0,i0,n9,l0,x0,J7,f7,W7.data);else if(T.isCompressedTexture)x.compressedTexSubImage2D(x.TEXTURE_2D,g0,i0,n9,W7.width,W7.height,J7,W7.data);else x.texSubImage2D(x.TEXTURE_2D,g0,i0,n9,l0,x0,J7,f7,W7);if(w.pixelStorei(x.UNPACK_ROW_LENGTH,g7),w.pixelStorei(x.UNPACK_IMAGE_HEIGHT,b9),w.pixelStorei(x.UNPACK_SKIP_PIXELS,N8),w.pixelStorei(x.UNPACK_SKIP_ROWS,b8),w.pixelStorei(x.UNPACK_SKIP_IMAGES,EJ),g0===0&&p.generateMipmaps)x.generateMipmap(d0);w.unbindTexture()},this.initRenderTarget=function(T){if(g.get(T).__webglFramebuffer===void 0)Q0.setupRenderTarget(T)},this.initTexture=function(T){if(T.isCubeTexture)Q0.setTextureCube(T,0);else if(T.isData3DTexture)Q0.setTexture3D(T,0);else if(T.isDataArrayTexture||T.isCompressedArrayTexture)Q0.setTexture2DArray(T,0);else Q0.setTexture2D(T,0);w.unbindTexture()},this.resetState=function(){l=0,U0=0,i=null,w.reset(),j0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return VU}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=A9._getDrawingBufferColorSpace(J),Q.unpackColorSpace=A9._getUnpackColorSpace()}}var PF="varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";class tQ{mesh;stars;sunDir=new k(0,-0.2,-1).normalize();constructor(J=400){this.mesh=new f(new c0(J,48,24),new v9({side:B7,depthWrite:!1,uniforms:{day:{value:0},sun:{value:this.sunDir}},vertexShader:PF,fragmentShader:`
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
        }`}));let Q=1400,Z=new Float32Array(Q*3);for(let K=0;K<Q;K++){let U=f0(K),H=f0(K+9999),Y=U*Math.PI*2,W=Math.acos(1-H*0.95);Z.set([Math.sin(W)*Math.cos(Y)*J*0.95,Math.cos(W)*J*0.95,Math.sin(W)*Math.sin(Y)*J*0.95],K*3)}let $=new q9;$.setAttribute("position",new u9(Z,3)),this.stars=new y7($,new m7({color:16777215,size:1.4,sizeAttenuation:!1,transparent:!0,depthWrite:!1}))}set(J,Q=0){this.mesh.material.uniforms.day.value=J;let Z=(J-0.5)*0.9;return this.sunDir.set(Math.cos(Z)*Math.sin(Q),Math.sin(Z),-Math.cos(Z)*Math.cos(Q)).normalize(),this.stars.material.opacity=Math.max(0,1-J*2.2),this.sunDir}}class KH{box;points;base;constructor(J,Q=600,Z=16773590){this.box=J;this.base=new Float32Array(Q*3);let $=J.getSize(new k);for(let U=0;U<Q;U++)this.base.set([J.min.x+f0(U)*$.x,J.min.y+f0(U+3000)*$.y,J.min.z+f0(U+6000)*$.z],U*3);let K=new q9;K.setAttribute("position",new u9(this.base.slice(),3)),this.points=new y7(K,new m7({color:Z,size:0.025,transparent:!0,opacity:0.7,blending:H7,depthWrite:!1}))}update(J){let Q=this.points.geometry.attributes.position,Z=this.box.getSize(new k);for(let $=0;$<Q.count;$++){let K=this.base[$*3],U=this.base[$*3+1],H=this.base[$*3+2],Y=this.box.min.y+((U-this.box.min.y+J*0.05*(0.5+f0($)))%Z.y+Z.y)%Z.y;Q.setXYZ($,K+Math.sin(J*0.4+$)*0.08,Y,H+Math.cos(J*0.3+$*1.7)*0.08)}Q.needsUpdate=!0}}function P5(J,Q,Z,$){let K=new T0(Q,Z,$,32,1,!0).translate(0,-$/2,0),U=new v9({transparent:!0,depthWrite:!1,blending:H7,side:m9,uniforms:{color:{value:new Y0(J)},strength:{value:0.25},time:{value:0}},vertexShader:"varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main() { vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",fragmentShader:`uniform vec3 color; uniform float strength, time; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main() {
        float edge = pow(abs(dot(vN, vV)), 1.6);
        float along = smoothstep(0.0, 0.25, vUv.y) * smoothstep(0.0, 0.6, 1.0 - vUv.y) + 0.15;
        float n = 0.85 + 0.15 * sin(vUv.x * 40.0 + time * 0.6) * sin(vUv.y * 9.0 - time * 0.4);
        gl_FragColor = vec4(color * edge * along * n * strength, 1.0);
      }`});return new f(K,U)}function f0(J){let Q=Math.sin(J*127.1+311.7)*43758.5453;return Q-Math.floor(Q)}class r7{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}var CF=new Z6(-1,1,1,-1,0,1);class C5 extends q9{constructor(){super();this.setAttribute("position",new J9([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new J9([0,2,0,0,2,0],2))}}var LF=new C5;class XJ{constructor(J){this._mesh=new f(LF,J)}dispose(){this._mesh.geometry.dispose()}render(J){J.render(this._mesh,CF)}get material(){return this._mesh.material}set material(J){this._mesh.material=J}}var eQ={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:0.025},maxblur:{value:0.01},nearClip:{value:1},farClip:{value:1000}},vertexShader:`

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

		}`};class UH extends r7{constructor(J,Q,Z){super();this.scene=J,this.camera=Q;let $=Z.focus!==void 0?Z.focus:1,K=Z.aperture!==void 0?Z.aperture:0.025,U=Z.maxblur!==void 0?Z.maxblur:1;this._renderTargetDepth=new M7(1,1,{minFilter:U8,magFilter:U8,type:L7}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new nQ,this._materialDepth.depthPacking=FU,this._materialDepth.blending=s7;let H=T8.clone(eQ.uniforms);H.tDepth.value=this._renderTargetDepth.texture,H.focus.value=$,H.aspect.value=Q.aspect,H.aperture.value=K,H.maxblur.value=U,H.nearClip.value=Q.near,H.farClip.value=Q.far,this.materialBokeh=new v9({defines:Object.assign({},eQ.defines),uniforms:H,vertexShader:eQ.vertexShader,fragmentShader:eQ.fragmentShader}),this.uniforms=H,this._fsQuad=new XJ(this.materialBokeh),this._oldClearColor=new Y0}render(J,Q,Z){this.scene.overrideMaterial=this._materialDepth,J.getClearColor(this._oldClearColor);let $=J.getClearAlpha(),K=J.autoClear;if(J.autoClear=!1,J.setClearColor(16777215),J.setClearAlpha(1),J.setRenderTarget(this._renderTargetDepth),J.clear(),J.render(this.scene,this.camera),this.uniforms.tColor.value=Z.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget(Q),J.clear(),this._fsQuad.render(J);this.scene.overrideMaterial=null,J.setClearColor(this._oldClearColor),J.setClearAlpha($),J.autoClear=K}setSize(J,Q){this.materialBokeh.uniforms.aspect.value=J/Q,this._renderTargetDepth.setSize(J,Q)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}}var t6={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class K6 extends r7{constructor(J,Q="tDiffuse"){super();if(this.textureID=Q,this.uniforms=null,this.material=null,J instanceof v9)this.uniforms=J.uniforms,this.material=J;else if(J)this.uniforms=T8.clone(J.uniforms),this.material=new v9({name:J.name!==void 0?J.name:"unspecified",defines:Object.assign({},J.defines),uniforms:this.uniforms,vertexShader:J.vertexShader,fragmentShader:J.fragmentShader});this._fsQuad=new XJ(this.material)}render(J,Q,Z){if(this.uniforms[this.textureID])this.uniforms[this.textureID].value=Z.texture;if(this._fsQuad.material=this.material,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget(Q),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class f$ extends r7{constructor(J,Q){super();this.scene=J,this.camera=Q,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(J,Q,Z){let $=J.getContext(),K=J.state;K.buffers.color.setMask(!1),K.buffers.depth.setMask(!1),K.buffers.color.setLocked(!0),K.buffers.depth.setLocked(!0);let U,H;if(this.inverse)U=0,H=1;else U=1,H=0;if(K.buffers.stencil.setTest(!0),K.buffers.stencil.setOp($.REPLACE,$.REPLACE,$.REPLACE),K.buffers.stencil.setFunc($.ALWAYS,U,4294967295),K.buffers.stencil.setClear(H),K.buffers.stencil.setLocked(!0),J.setRenderTarget(Z),this.clear)J.clear();if(J.render(this.scene,this.camera),J.setRenderTarget(Q),this.clear)J.clear();J.render(this.scene,this.camera),K.buffers.color.setLocked(!1),K.buffers.depth.setLocked(!1),K.buffers.color.setMask(!0),K.buffers.depth.setMask(!0),K.buffers.stencil.setLocked(!1),K.buffers.stencil.setFunc($.EQUAL,1,4294967295),K.buffers.stencil.setOp($.KEEP,$.KEEP,$.KEEP),K.buffers.stencil.setLocked(!0)}}class HH extends r7{constructor(){super();this.needsSwap=!1}render(J){J.state.buffers.stencil.setLocked(!1),J.state.buffers.stencil.setTest(!1)}}class S8{constructor(J,Q){if(this.renderer=J,this._pixelRatio=J.getPixelRatio(),Q===void 0){let Z=J.getSize(new q0);this._width=Z.width,this._height=Z.height,Q=new M7(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:L7}),Q.texture.name="EffectComposer.rt1"}else this._width=Q.width,this._height=Q.height;this.renderTarget1=Q,this.renderTarget2=Q.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new K6(t6),this.copyPass.material.blending=s7,this.timer=new S$}swapBuffers(){let J=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=J}addPass(J){this.passes.push(J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(J,Q){this.passes.splice(Q,0,J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(J){let Q=this.passes.indexOf(J);if(Q!==-1)this.passes.splice(Q,1)}isLastEnabledPass(J){for(let Q=J+1;Q<this.passes.length;Q++)if(this.passes[Q].enabled)return!1;return!0}render(J){if(this.timer.update(),J===void 0)J=this.timer.getDelta();let Q=this.renderer.getRenderTarget(),Z=!1;for(let $=0,K=this.passes.length;$<K;$++){let U=this.passes[$];if(U.enabled===!1)continue;if(U.renderToScreen=this.renderToScreen&&this.isLastEnabledPass($),U.render(this.renderer,this.writeBuffer,this.readBuffer,J,Z),U.needsSwap){if(Z){let H=this.renderer.getContext(),Y=this.renderer.state.buffers.stencil;Y.setFunc(H.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,J),Y.setFunc(H.EQUAL,1,4294967295)}this.swapBuffers()}if(f$!==void 0){if(U instanceof f$)Z=!0;else if(U instanceof HH)Z=!1}}this.renderer.setRenderTarget(Q)}reset(J){if(J===void 0){let Q=this.renderer.getSize(new q0);this._pixelRatio=this.renderer.getPixelRatio(),this._width=Q.width,this._height=Q.height,J=this.renderTarget1.clone(),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=J,this.renderTarget2=J.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(J,Q){this._width=J,this._height=Q;let Z=this._width*this._pixelRatio,$=this._height*this._pixelRatio;this.renderTarget1.setSize(Z,$),this.renderTarget2.setSize(Z,$);for(let K=0;K<this.passes.length;K++)this.passes[K].setSize(Z,$)}setPixelRatio(J){this._pixelRatio=J,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}var JZ={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class k8 extends r7{constructor(){super();this.isOutputPass=!0,this.uniforms=T8.clone(JZ.uniforms),this.material=new lQ({name:JZ.name,uniforms:this.uniforms,vertexShader:JZ.vertexShader,fragmentShader:JZ.fragmentShader}),this._fsQuad=new XJ(this.material),this._outputColorSpace=null,this._toneMapping=null}render(J,Q,Z){if(this.uniforms.tDiffuse.value=Z.texture,this.uniforms.toneMappingExposure.value=J.toneMappingExposure,this._outputColorSpace!==J.outputColorSpace||this._toneMapping!==J.toneMapping){if(this._outputColorSpace=J.outputColorSpace,this._toneMapping=J.toneMapping,this.material.defines={},A9.getTransfer(this._outputColorSpace)===o9)this.material.defines.SRGB_TRANSFER="";if(this._toneMapping===LQ)this.material.defines.LINEAR_TONE_MAPPING="";else if(this._toneMapping===TQ)this.material.defines.REINHARD_TONE_MAPPING="";else if(this._toneMapping===wQ)this.material.defines.CINEON_TONE_MAPPING="";else if(this._toneMapping===K8)this.material.defines.ACES_FILMIC_TONE_MAPPING="";else if(this._toneMapping===kQ)this.material.defines.AGX_TONE_MAPPING="";else if(this._toneMapping===jQ)this.material.defines.NEUTRAL_TONE_MAPPING="";else if(this._toneMapping===SQ)this.material.defines.CUSTOM_TONE_MAPPING="";this.material.needsUpdate=!0}if(this.renderToScreen===!0)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget(Q),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class j8 extends r7{constructor(J,Q,Z=null,$=null,K=null){super();this.scene=J,this.camera=Q,this.overrideMaterial=Z,this.clearColor=$,this.clearAlpha=K,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Y0}render(J,Q,Z){let $=J.autoClear;J.autoClear=!1;let K,U;if(this.overrideMaterial!==null)U=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial;if(this.clearColor!==null)J.getClearColor(this._oldClearColor),J.setClearColor(this.clearColor,J.getClearAlpha());if(this.clearAlpha!==null)K=J.getClearAlpha(),J.setClearAlpha(this.clearAlpha);if(this.clearDepth==!0)J.clearDepth();if(J.setRenderTarget(this.renderToScreen?null:Z),this.clear===!0)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(J.render(this.scene,this.camera),this.clearColor!==null)J.setClearColor(this._oldClearColor);if(this.clearAlpha!==null)J.setClearAlpha(K);if(this.overrideMaterial!==null)this.scene.overrideMaterial=U;J.autoClear=$}}var L5={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Y0(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class X8 extends r7{constructor(J,Q=1,Z,$){super();this.strength=Q,this.radius=Z,this.threshold=$,this.resolution=J!==void 0?new q0(J.x,J.y):new q0(256,256),this.clearColor=new Y0(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);this.renderTargetBright=new M7(K,U,{type:L7,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let X=0;X<this.nMips;X++){let G=new M7(K,U,{type:L7,depthBuffer:!1});G.texture.name="UnrealBloomPass.h"+X,G.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(G);let q=new M7(K,U,{type:L7,depthBuffer:!1});q.texture.name="UnrealBloomPass.v"+X,q.texture.generateMipmaps=!1,this.renderTargetsVertical.push(q),K=Math.round(K/2),U=Math.round(U/2)}let H=L5;this.highPassUniforms=T8.clone(H.uniforms),this.highPassUniforms.luminosityThreshold.value=$,this.highPassUniforms.smoothWidth.value=0.01,this.materialHighPassFilter=new v9({uniforms:this.highPassUniforms,vertexShader:H.vertexShader,fragmentShader:H.fragmentShader}),this.separableBlurMaterials=[];let Y=[6,10,14,18,22];K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);for(let X=0;X<this.nMips;X++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(Y[X])),this.separableBlurMaterials[X].uniforms.invSize.value=new q0(1/K,1/U),K=Math.round(K/2),U=Math.round(U/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=Q,this.compositeMaterial.uniforms.bloomRadius.value=0.1;let W=[1,0.8,0.6,0.4,0.2];this.compositeMaterial.uniforms.bloomFactors.value=W,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=T8.clone(t6.uniforms),this.blendMaterial=new v9({uniforms:this.copyUniforms,vertexShader:t6.vertexShader,fragmentShader:t6.fragmentShader,premultipliedAlpha:!0,blending:H7,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Y0,this._oldClearAlpha=1,this._basic=new h0,this._fsQuad=new XJ(null)}dispose(){for(let J=0;J<this.renderTargetsHorizontal.length;J++)this.renderTargetsHorizontal[J].dispose();for(let J=0;J<this.renderTargetsVertical.length;J++)this.renderTargetsVertical[J].dispose();this.renderTargetBright.dispose();for(let J=0;J<this.separableBlurMaterials.length;J++)this.separableBlurMaterials[J].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(J,Q){let Z=Math.round(J/2),$=Math.round(Q/2);this.renderTargetBright.setSize(Z,$);for(let K=0;K<this.nMips;K++)this.renderTargetsHorizontal[K].setSize(Z,$),this.renderTargetsVertical[K].setSize(Z,$),this.separableBlurMaterials[K].uniforms.invSize.value=new q0(1/Z,1/$),Z=Math.round(Z/2),$=Math.round($/2)}render(J,Q,Z,$,K){J.getClearColor(this._oldClearColor),this._oldClearAlpha=J.getClearAlpha();let U=J.autoClear;if(J.autoClear=!1,J.setClearColor(this.clearColor,0),K)J.state.buffers.stencil.setTest(!1);if(this.renderToScreen)this._fsQuad.material=this._basic,this._basic.map=Z.texture,J.setRenderTarget(null),J.clear(),this._fsQuad.render(J);this.highPassUniforms.tDiffuse.value=Z.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,J.setRenderTarget(this.renderTargetBright),J.clear(),this._fsQuad.render(J);let H=this.renderTargetBright;for(let Y=0;Y<this.nMips;Y++)this._fsQuad.material=this.separableBlurMaterials[Y],this.separableBlurMaterials[Y].uniforms.colorTexture.value=H.texture,this.separableBlurMaterials[Y].uniforms.direction.value=X8.BlurDirectionX,J.setRenderTarget(this.renderTargetsHorizontal[Y]),J.clear(),this._fsQuad.render(J),this.separableBlurMaterials[Y].uniforms.colorTexture.value=this.renderTargetsHorizontal[Y].texture,this.separableBlurMaterials[Y].uniforms.direction.value=X8.BlurDirectionY,J.setRenderTarget(this.renderTargetsVertical[Y]),J.clear(),this._fsQuad.render(J),H=this.renderTargetsVertical[Y];if(this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,J.setRenderTarget(this.renderTargetsHorizontal[0]),J.clear(),this._fsQuad.render(J),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,K)J.state.buffers.stencil.setTest(!0);if(this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget(Z),this._fsQuad.render(J);J.setClearColor(this._oldClearColor,this._oldClearAlpha),J.autoClear=U}_getSeparableBlurMaterial(J){let Q=[],Z=J/3;for(let U=0;U<J;U++)Q.push(0.39894*Math.exp(-0.5*U*U/(Z*Z))/Z);let $=[],K=[];for(let U=1;U<J;U+=2){let H=Q[U],Y=U+1<J?Q[U+1]:0,W=H+Y;$.push((U*H+(U+1)*Y)/W),K.push(W)}return new v9({defines:{KERNEL_PAIRS:$.length},uniforms:{colorTexture:{value:null},invSize:{value:new q0(0.5,0.5)},direction:{value:new q0(0.5,0.5)},centerWeight:{value:Q[0]},gaussianOffsets:{value:$},gaussianWeights:{value:K}},vertexShader:`

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

				}`})}}X8.BlurDirectionX=new q0(1,0);X8.BlurDirectionY=new q0(0,1);var TF="varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",wF=`
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
}`;class QZ{composer;look={focus:0,aperture:0.0025,bloom:0.35,exposure:1,warmth:0,saturation:1,contrast:1,shadows:new Y0(0.5,0.5,0.5),highlights:new Y0(0.5,0.5,0.5),vignette:0.45,grain:0.06,aberration:0.4,halation:0.4,letterbox:1,fade:0,leak:0};bokeh;bloomPass;grade;constructor(J,Q,Z,$=new q0(1920,1080)){this.composer=new S8(J),this.composer.addPass(new j8(Q,Z)),this.bokeh=new UH(Q,Z,{focus:10,aperture:this.look.aperture,maxblur:0.008}),this.composer.addPass(this.bokeh),this.bloomPass=new X8($,this.look.bloom,0.6,0.78),this.composer.addPass(this.bloomPass),this.composer.addPass(new k8),this.grade=new K6({uniforms:{tDiffuse:{value:null},time:{value:0},aspect:{value:$.x/$.y},exposure:{value:1},warmth:{value:0},saturation:{value:1},contrast:{value:1},shadows:{value:new Y0},highlights:{value:new Y0},vignette:{value:0},grain:{value:0},aberration:{value:0},halation:{value:0},letterbox:{value:0},fade:{value:0},leak:{value:0}},vertexShader:TF,fragmentShader:wF}),this.composer.addPass(this.grade)}render(J){let Q=this.look,Z=this.grade.uniforms;this.bokeh.enabled=Q.focus>0;let $=this.bokeh.uniforms;$.focus.value=Q.focus,$.aperture.value=Q.aperture,this.bloomPass.strength=Q.bloom,Z.time.value=J;for(let K of["exposure","warmth","saturation","contrast","vignette","grain","aberration","halation","letterbox","fade","leak"])Z[K].value=Q[K];Z.shadows.value.copy(Q.shadows),Z.highlights.value.copy(Q.highlights),this.composer.render()}}class ZZ{group=new O0;parts=[];width=0;constructor(J,Q={}){let Z=Q.height??1,$=Q.gap??0.05,K=Q.font??'400 200px "Monoton", "Limelight", sans-serif',U=0;for(let H of J){let Y=document.createElement("canvas").getContext("2d");Y.font=K;let W=Math.ceil(Y.measureText(H).width+80),X=280,G=Object.assign(document.createElement("canvas"),{width:W,height:X}),q=G.getContext("2d");q.font=K,q.textBaseline="middle",q.shadowColor=Q.color??"#ff3b6b";for(let[V,F,O]of[[40,0.9,Q.color??"#ff3b6b"],[14,1,Q.color??"#ff3b6b"],[0,1,"#fff6f0"]])q.shadowBlur=V,q.globalAlpha=F,q.fillStyle=O,q.fillText(H,40,X/2);let N=new G7(G);N.colorSpace=F7;let D=Z*W/X,M=new f(new F9(D,Z),new h0({map:N,transparent:!0,depthWrite:!1,toneMapped:!1,color:16777215}));M.position.x=U+D/2,this.group.add(M),this.parts.push({mesh:M,width:D}),U+=D+$}this.width=U-$;for(let H of this.parts)H.mesh.position.x-=this.width/2}set(J,Q){let Z=this.parts[J]?.mesh;if(!Z)return;let $=Math.max(0,Q);Z.material.color.setScalar(0.1+$*1.05),Z.material.opacity=0.35+Math.min(1,$)*0.65}}function b$(J,Q=0,Z=0.5){return Math.sin(J*37+Q*13.1)*Math.sin(J*13.7+Q*3.3)*Math.sin(J*5.1+Q)>1-Z*0.9?0.15:1}var SF=(J)=>J*J*(3-2*J),T5=new k,w5=new k;function G9(J,Q,Z,$,K=!0){let U=K?SF(Math.min(1,Math.max(0,$))):$;J.position.copy(T5.fromArray(Q.pos).lerp(w5.fromArray(Z.pos),U));let H=T5.fromArray(Q.look).lerp(w5.fromArray(Z.look),U);J.up.set(0,1,0),J.lookAt(H),J.rotateZ(((Q.roll??0)+((Z.roll??Q.roll??0)-(Q.roll??0))*U)*Math.PI/180);let Y=(Q.fov??40)+((Z.fov??Q.fov??40)-(Q.fov??40))*U;if(J.fov!==Y)J.fov=Y,J.updateProjectionMatrix()}var $Z=(J,Q)=>Math.sin(J*0.73+Q)*0.5+Math.sin(J*1.37+Q*2.1)*0.3+Math.sin(J*2.9+Q*3.7)*0.2;function x$(J,Q,Z=0.5){let $=Z*0.004;J.rotateX($Z(Q,1)*$),J.rotateY($Z(Q,5)*$*1.3),J.rotateZ($Z(Q,9)*$*0.6)}class YH{width;height;canvas;texture;key="";constructor(J=1280,Q=800){this.width=J;this.height=Q;this.canvas=Object.assign(document.createElement("canvas"),{width:J,height:Q}),this.texture=new G7(this.canvas),this.texture.colorSpace=F7,this.texture.anisotropy=8}show(J,Q={}){let Z=JSON.stringify([J,Q]);if(Z===this.key)return;this.key=Z;let $=this.canvas.getContext("2d"),K=this.width,U=this.height;$.fillStyle=Q.bg??"#0d1117",$.fillRect(0,0,K,U),$.fillStyle="#1b2230",$.fillRect(0,0,K,54);for(let[Y,W]of["#ff5f57","#febc2e","#28c840"].entries())$.fillStyle=W,$.beginPath(),$.arc(30+Y*30,27,9,0,Math.PI*2),$.fill();$.fillStyle="#8b96a8",$.font='600 24px "JetBrains Mono", monospace',$.textAlign="center",$.fillText(Q.title??"terminal",K/2,35),$.textAlign="left";let H=104;for(let Y of J){let W=typeof Y==="string"?{text:Y}:Y,X=W.size??34;$.font=`${W.bold?700:500} ${X}px ${Q.font??'"JetBrains Mono", monospace'}`,$.fillStyle=W.color??Q.fg??"#d6deeb",$.fillText(W.text,40,H),H+=X*1.45}if(Q.cursor)$.fillStyle=Q.fg??"#d6deeb",$.fillRect(40,H-30,18,36);if(Q.banner)$.fillStyle=Q.banner.color,$.fillRect(0,U/2-90,K,180),$.fillStyle="#fff",$.font='800 64px "Inter", sans-serif',$.textAlign="center",$.fillText(Q.banner.text,K/2,U/2+22),$.textAlign="left";$.fillStyle="rgba(0,0,0,.12)";for(let Y=0;Y<U;Y+=4)$.fillRect(0,Y,K,1);this.texture.needsUpdate=!0}}var e6=(J,Q)=>J.slice(0,Math.max(0,Math.floor(J.length*Math.min(1,Q))));var l9=(J,Q,Z,$)=>({name:J,at:Q,label:Z,section:$});function p$(){return[l9("title",0,"a cabin, a loop, a quota","intro"),l9("desk",I(0)-0.8,"go to bed, they said","intro"),l9("pillow",I(1)-0.6,"I nailed the first half","intro"),l9("loop",I(2)-0.4,"fed the loop a spec","verse 1"),l9("state",I(3)-0.3,"max iterations ten","verse 1"),l9("ralph",I(4)-0.3,"Ralph took the wheel","verse 1"),l9("dream",I(5)-0.4,"dreamed of green checkmarks","verse 1"),l9("dawn",I(6)-0.4,"woke at six","verse 1"),l9("tenof",I(7)-0.3,"ten of ten","verse 1"),l9("leave",I(8)-0.4,"she left before dawn","chorus"),l9("rename",I(9)-0.2,"renamed the state file","chorus"),l9("neon",I(10)-0.6,"ralph-loop.local.md-NEVER_AGAIN","chorus"),l9("baggage",I(12)-0.3,"last round's baggage","verse 2"),l9("reread",I(13)-0.1,"reread the whole thread","verse 2"),l9("context",I(14)-0.1,"context at forty percent","verse 2"),l9("approach",I(15)-0.1,"new approach, new approach","verse 2"),l9("summary",I(16)-0.1,"great progress! almost done!","verse 2"),l9("app",I(17)-0.1,"a button: coming soon","verse 2"),l9("commit",I(18)-0.1,"burned all my tokens","verse 2"),l9("leave2",I(20)-0.2,"she left before dawn","chorus"),l9("rename2",I(21)-0.2,"renamed the state file","chorus"),l9("neon2",I(22)-0.6,"dash NEVER, underscore, AGAIN","chorus"),l9("limit",I(24)-0.5,"usage limit reached","bridge"),l9("goodbye",I(25)-0.4,"no letter. a timestamp.","bridge"),l9("renews",I(26)-0.5,"she renews","bridge"),l9("return",I(28)-0.6,"back at nine A-M","last chorus"),l9("whiskey",I(29)-0.3,"poured a whiskey","last chorus"),l9("maybe",I(30)-0.6,"dash MAYBE, underscore, AGAIN","last chorus"),l9("twenty",I(32)-0.4,"max iterations... twenty","outro"),l9("helping",I(33)-1.4,"I'm helping!","outro"),l9("end",n0(33)+1.6,"the end","outro")]}var k5=null,g$=(J)=>{let Q=k5??=p$(),Z=Q[0];for(let $ of Q)if($.at<=J)Z=$;return Z},kF=(J)=>{let Q=k5??=p$();return Q[Q.indexOf(J)+1]?.at??q7()};function jF(J){if(J<I(6)-0.5)return 0.02;if(J<I(8)-0.5)return j(0.25,0.32,$0(J,I(6),I(8)));if(J<I(20))return j(0.36,0.46,$0(J,I(8),I(20)));if(J<I(24))return j(0.48,0.56,$0(J,I(20),I(24)));if(J<I(28))return j(0.6,0.82,$0(J,I(24),I(28)));return j(0.86,1,$0(J,I(28),q7()))}var j5=(J)=>{if(J<I(5))return 23+$0(J,0,I(5))*0.6;if(J<I(6))return j(23.6,29.9,$0(J,I(5),I(6)));if(J<I(26))return j(30,32.5,$0(J,I(6),I(26)));if(J<J0(27,/renews/i))return j(32.5,33,$0(J,I(26),J0(27,/renews/i)));return 33+$0(J,J0(27,/renews/i),q7())*0.3},v5=(J)=>{let Q=j5(J),Z=Math.floor(Q)%24,$=Math.floor(Q%1*60);return`${(Z+11)%12+1}:${String($).padStart(2,"0")} ${Z<12?"AM":"PM"}`},e0=(J,Q=0.8,Z={})=>new K9({color:J,roughness:Q,metalness:0,...Z});function GJ(J,Q,Z,$){let K=Object.assign(document.createElement("canvas"),{width:J,height:Q});Z(K.getContext("2d"));let U=new G7(K);if(U.colorSpace=F7,U.anisotropy=8,$)U.wrapS=U.wrapT=m8,U.repeat.set(...$);return U}var h$=(J,Q)=>GJ(512,512,(Z)=>{for(let $=0;$<16;$++){let K=f0($*3.1);Z.fillStyle=`rgb(${J.map((U)=>Math.round(U*(0.8+K*0.35))).join(",")})`,Z.fillRect(0,$*32,512,31),Z.fillStyle="rgba(0,0,0,.45)",Z.fillRect(0,$*32+31,512,1),Z.fillStyle="rgba(0,0,0,.12)";for(let U=0;U<14;U++)Z.fillRect(f0($*50+U)*512,$*32+f0(U+$)*30,30+f0(U*7+$)*90,1);Z.fillStyle="rgba(0,0,0,.3)",Z.fillRect(f0($+99)*512,$*32,2,31)}},Q),S5=GJ(256,256,(J)=>{J.fillStyle="#8c1f1f",J.fillRect(0,0,256,256),J.fillStyle="rgba(20,10,10,.55)";for(let Q=0;Q<256;Q+=64)J.fillRect(Q,0,22,256),J.fillRect(0,Q,256,22);J.fillStyle="rgba(240,200,160,.25)";for(let Q=30;Q<256;Q+=64)J.fillRect(Q,0,4,256),J.fillRect(0,Q,256,4)},[2,2]),vF=GJ(512,512,(J)=>{J.fillStyle="#b98b5e",J.fillRect(0,0,512,512);for(let Q=0;Q<9000;Q++)J.fillStyle=`rgba(${f0(Q)>0.5?"255,230,200":"60,35,20"},${0.05+f0(Q+5)*0.08})`,J.fillRect(f0(Q+1)*512,f0(Q+2)*512,2,2)},[80,80]),Y7=(J=0,Q=0,Z=0)=>new k(J,Q,Z),yF=Y7(0,1,0),fF=new T0(0.06,0.07,1,8).translate(0,0.5,0),bF={down:[[-0.3,0.92,0.08],[0.3,0.92,0.08]],type:[[-0.2,1.12,0.48],[0.2,1.12,0.48]],mug:[[-0.3,0.95,0.1],[0.14,1.42,0.3]],pour:[[-0.12,1.25,0.45],[0.18,1.3,0.45]],hips:[[-0.34,1.05,0],[0.34,1.05,0]],face:[[-0.1,1.55,0.2],[0.1,1.55,0.2]],up:[[-0.3,1.9,0.1],[0.3,1.9,0.1]],sleep:[[-0.25,1.2,0.18],[0.25,0.95,0.12]]};function xF(){let J=new O0,Q=14264450,Z=new f(new T0(0.24,0.21,0.66,16),e0(16777215,0.9,{map:S5}));Z.position.y=1.2;let $=new O0;$.position.y=1.72,$.add(new f(new c0(0.17,20,16),e0(14264450,0.7)));let K=e0(7031342,0.85),U=new f(new T0(0.34,0.34,0.025,28),K);U.position.y=0.1,U.scale.set(1,1,0.85);let H=new f(new T0(0.15,0.18,0.2,20),K);H.position.y=0.21;let Y=new f(new T0(0.182,0.182,0.04,20),e0(2759184));Y.position.y=0.14,$.add(U,H,Y);let W=new f(new c0(0.168,16,10,0,Math.PI*2,Math.PI*0.55,Math.PI*0.4),e0(4863014,0.95));$.add(W);let X=new O0;X.position.y=0.88;for(let M of[-1,1]){let V=new f(new T0(0.1,0.09,0.86,10).translate(0,-0.43,0),e0(2898522,0.9));V.position.x=M*0.11;let F=new f(new _0(0.13,0.12,0.3),e0(3810324,0.6));F.position.set(0,-0.84,0.06),V.add(F),X.add(V)}let G=new f(new T0(0.22,0.22,0.08,16),e0(2759184));G.position.y=0.9;let q=new f(new _0(0.1,0.07,0.02),new K9({color:14200928,metalness:0.9,roughness:0.3}));q.position.set(0,0.9,0.22);let N=[0,1].map(()=>new f(new c0(0.06,10,8),e0(14264450,0.7))),D=[0,1].map(()=>new f(fF,e0(16777215,0.9,{map:S5})));return J.add(Z,$,X,G,q,...N,...D),J.traverse((M)=>{if(M.isMesh)M.castShadow=!0,M.receiveShadow=!0}),Object.assign(J.userData,{head:$,hands:N,arms:D,torso:Z,legs:X}),J}function hF(J,Q,Z={}){let{hands:$,arms:K,legs:U,head:H}=J.userData,Y=Z.t??0;U.children.forEach((W)=>W.rotation.x=Z.sit?-1.45:0),H.rotation.x=Z.tilt??0,bF[Q].forEach(([W,X,G],q)=>{let N=$[q],D=(Z.shake??0)*0.012;N.position.set(W+Math.sin(Y*41+q*2)*D,X+Math.sin(Y*53+q)*D,G);let M=Y7(q?0.26:-0.26,1.46,0.02),V=N.position.clone().sub(M);K[q].position.copy(M),K[q].quaternion.setFromUnitVectors(yF,V.clone().normalize()),K[q].scale.set(1,V.length(),1)})}function gF(){let J=new O0,Q=e0(15921126,0.35),Z=new f(new H8(0.17,0.16,8,16),Q);Z.position.y=0.26;let $=new O0;$.position.y=0.62,$.add(new f(new c0(0.2,24,18),Q));let K=new h0({color:7336191,toneMapped:!1});for(let X of[-1,1]){let G=new f(new c0(0.045,12,10),K);G.position.set(X*0.075,0.02,0.18),$.add(G)}let U=new f(new c0(0.205,20,10,0,Math.PI*2,0,Math.PI/2.4),e0(14172207,0.7));U.position.y=0.01;let H=new f(new R7(0.17,0.012,6,24),e0(15777840,0.6));H.rotation.x=Math.PI/2,H.position.y=0.1;let Y=new O0;Y.position.y=0.23;for(let X=0;X<3;X++){let G=new f(new _0(0.2,0.008,0.04).translate(0.1,0,0),e0([3832789,15777840,3846250][X],0.5));G.rotation.y=X*Math.PI*2/3,Y.add(G)}$.add(U,H,Y);let W=[-1,1].map((X)=>{let G=new f(new H8(0.035,0.16,4,8).translate(0,-0.1,0),Q);return G.position.set(X*0.19,0.36,0),G});return J.add(Z,$,...W),J.traverse((X)=>{if(X.isMesh)X.castShadow=!0}),J.userData={head:$,prop:Y,arms:W,eyeMat:K},J}class KZ{renderer;scene=new o7;camera=new Q7(38,1.7777777777777777,0.05,1200);film;sky=new tQ(600);sun=new d7(16777215,1);hemi=new M8(10467071,3811868,0.4);moon;room=new O0;lamp=new Y8(16757611,0,9,1.6);lampBulb;screen=new YH(1280,800);screenLight=new Y8(10275071,0,2.5,1.5);screenMesh;laptop=new O0;jar=new O0;coins;clockHands=[];notes;sack=new O0;bottle=new O0;glassFill;mug=new O0;steam;checks=new O0;windowShaft;dust;me=xF();ralph=gF();chair=new O0;outside=new O0;cabinWindow;porch=new Y8(16757611,0,14,1.5);truck=new O0;taillights=[];headlights=new i6(16773328,0,60,0.4,0.5,1);roadCoins;bedCoins;sign;maybe;signGroup=new O0;signGlow=new Y8(16726891,0,18,1.4);constructor(J){this.renderer=new W8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=LJ,this.renderer.toneMapping=K8,this.film=new QZ(this.renderer,this.scene,this.camera),this.scene.fog=new z8(658456,0.004),this.scene.add(this.sky.mesh,this.sky.stars,this.hemi,this.sun,this.sun.target),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-0.0004,this.sun.shadow.normalBias=0.02,this.moon=new f(new c0(9,32,24),new h0({color:15920860,toneMapped:!1,fog:!1})),this.moon.position.set(-160,120,-380),this.scene.add(this.moon),this.buildRoom(),this.buildOutside(),this.dust=new KH(new P8(Y7(-3.6,0.2,-2.8),Y7(1,3,2)),700),this.room.add(this.dust.points),this.sign=new ZZ(["ralph-loop",".local",".md","-NEVER","_AGAIN"],{color:"#ff4d7d",height:1.25,gap:0.02}),this.maybe=new ZZ(["-MAYBE"],{color:"#ffc24d",height:1.25}),this.buildSign(),this.scene.add(this.room,this.outside)}static ROOM=Y7(300,0,0);buildRoom(){let J=this.room;J.position.copy(KZ.ROOM);let Q=new f(new F9(10,8),e0(16777215,0.75,{map:h$([120,80,50],[3,3])}));Q.rotation.x=-Math.PI/2,Q.receiveShadow=!0;let Z=e0(16777215,0.9,{map:h$([150,110,75],[2,1.2])}),$=(t,u0,K0,R0,B0,A0=0)=>{let w0=new f(new _0(t,u0,0.12),Z);w0.position.set(K0,R0,B0),w0.rotation.y=A0,w0.castShadow=w0.receiveShadow=!0,J.add(w0)};$(10,3.4,0,1.7,-3.2),$(8,3.4,4.6,1.7,0,Math.PI/2),$(8,1,-4.6,0.5,0,Math.PI/2),$(8,1,-4.6,2.9,0,Math.PI/2),$(2.6,1.4,-4.6,1.7,-2.2,Math.PI/2),$(3.4,1.4,-4.6,1.7,2.3,Math.PI/2);let K=e0(3810838,0.8);for(let[t,u0,K0,R0]of[[0.08,1.4,1.7,-1.4],[0.08,1.4,1.7,0.6],[0.06,1.4,1.7,-0.4],[2,0.06,1.7,-0.4],[2.1,0.1,1,-0.4],[2.1,0.1,2.4,-0.4]]){let B0=new f(new _0(0.14,u0,t),K);B0.position.set(-4.6,K0,R0),B0.castShadow=!0,J.add(B0)}let U=new f(new _0(10,0.12,8),e0(5914672,0.9));U.position.y=3.46,U.castShadow=!0,J.add(Q,U);let H=new f(new T7(1.4,40),e0(16777215,1,{map:GJ(256,256,(t)=>{for(let u0=0;u0<9;u0++)t.fillStyle=["#7a2a20","#c8902f","#2a4a5a"][u0%3],t.beginPath(),t.arc(128,128,128-u0*14,0,Math.PI*2),t.fill()})}));H.rotation.x=-Math.PI/2,H.position.set(0.2,0.005,0.2),H.receiveShadow=!0,J.add(H);let Y=e0(5913122,0.6),W=new O0;W.position.set(1.6,0,-2.5);let X=new f(new _0(2.4,0.08,1),Y);X.position.y=0.92,W.add(X);for(let[t,u0]of[[-1.1,-0.42],[1.1,-0.42],[-1.1,0.42],[1.1,0.42]]){let K0=new f(new _0(0.08,0.9,0.08),Y);K0.position.set(t,0.45,u0),W.add(K0)}W.traverse((t)=>{t.castShadow=!0,t.receiveShadow=!0}),J.add(W);let G=this.laptop;G.position.set(1.5,0.96,-2.5);let q=new f(new _0(0.72,0.03,0.5),e0(2763827,0.35,{metalness:0.6})),N=new O0;N.position.set(0,0.015,-0.24),N.rotation.x=-0.18;let D=new f(new _0(0.72,0.47,0.02).translate(0,0.235,0),e0(2763827,0.35,{metalness:0.6}));this.screenMesh=new f(new F9(0.67,0.42),new h0({map:this.screen.texture,toneMapped:!1})),this.screenMesh.position.set(0,0.235,0.011),N.add(D,this.screenMesh),this.screenLight.position.set(0,0.235,0.3),N.add(this.screenLight),G.add(q,N),G.userData.lid=N,J.add(G);let M=new O0;M.position.set(2.5,0.96,-2.7);let V=new f(new Z7(0.2,0.22,24,1,!0),e0(3103290,0.5,{side:m9}));V.position.y=0.52;let F=new f(new T0(0.015,0.015,0.5),e0(11569744,0.3,{metalness:0.8}));F.position.y=0.25;let O=new f(new T0(0.1,0.12,0.03,20),e0(11569744,0.3,{metalness:0.8}));this.lampBulb=new f(new c0(0.05,12,10),new h0({color:16767392,toneMapped:!1})),this.lampBulb.position.y=0.46,this.lamp.position.set(0,0.42,0),this.lamp.castShadow=!0,this.lamp.shadow.mapSize.set(1024,1024),this.lamp.shadow.bias=-0.002,M.add(V,F,O,this.lampBulb,this.lamp),J.add(M),this.jar.position.set(0.55,0.96,-2.55);let z=new f(new T0(0.17,0.17,0.42,32,1,!0),new WJ({color:14544639,roughness:0.05,transmission:0.9,transparent:!0,opacity:0.35,side:m9}));z.position.y=0.21;let C=new f(new T0(0.18,0.18,0.04,32),e0(9071162,0.4,{metalness:0.7}));C.position.y=0.44;let R=new f(new F9(0.2,0.08),e0(16777215,0.9,{map:GJ(256,100,(t)=>{t.fillStyle="#f0e2c0",t.fillRect(0,0,256,100),t.fillStyle="#3a2410",t.font='700 46px "Rye", serif',t.textAlign="center",t.fillText("TOKENS",128,66)})}));R.position.set(0,0.2,0.172);let B=new T0(0.035,0.035,0.01,16),_=new K9({color:15120458,metalness:0.9,roughness:0.28,emissive:3810304});this.coins=new j9(B,_,160);let P=new k9;for(let t=0;t<160;t++){let u0=f0(t)*Math.PI*2,K0=Math.sqrt(f0(t+7))*0.13;P.position.set(Math.cos(u0)*K0,0.01+Math.floor(t/10)*0.024+f0(t+3)*0.01,Math.sin(u0)*K0),P.rotation.set((f0(t+1)-0.5)*0.8,f0(t+2)*3,(f0(t+4)-0.5)*0.8),P.updateMatrix(),this.coins.setMatrixAt(t,P.matrix)}this.jar.add(z,C,R,this.coins),J.add(this.jar),this.mug.position.set(0.95,0.96,-2.2);let E=new f(new T0(0.06,0.055,0.12,20),e0(15262420,0.4));E.position.y=0.06;let A=new f(new T7(0.055,20),e0(1707784,0.2));A.rotation.x=-Math.PI/2,A.position.y=0.11;let y=new f(new R7(0.035,0.01,8,16,Math.PI),e0(15262420,0.4));y.position.set(0.065,0.06,0),y.rotation.z=-Math.PI/2;let S=new Float32Array(180),b=new q9;b.setAttribute("position",new u9(S,3)),this.steam=new y7(b,new m7({color:16777215,size:0.03,transparent:!0,opacity:0.25,depthWrite:!1})),this.mug.add(E,A,y,this.steam),J.add(this.mug),this.bottle.position.set(0,0.96,-2.35);let e=new WJ({color:10115616,roughness:0.1,transmission:0.6,transparent:!0,opacity:0.8}),v=new f(new T0(0.07,0.07,0.26,20),e);v.position.y=0.13;let l=new f(new T0(0.02,0.04,0.12,16),e);l.position.y=0.32;let U0=new f(new T0(0.071,0.071,0.1,20,1,!0),e0(15786688,0.8));U0.position.y=0.12,this.bottle.add(v,l,U0);let i=new f(new T0(0.045,0.04,0.09,20,1,!0),new WJ({color:16777215,roughness:0.05,transmission:0.95,transparent:!0,opacity:0.3,side:m9}));i.position.set(0.22,1.005,-2.25),this.glassFill=new f(new T0(0.038,0.036,1,20).translate(0,0.5,0),new WJ({color:13138472,roughness:0.1,transmission:0.4,transparent:!0,opacity:0.85})),this.glassFill.position.set(0.22,0.965,-2.25),J.add(this.bottle,i,this.glassFill);let r=new f(new _0(0.5,0.06,0.5),Y);r.position.y=0.5;let u=new f(new _0(0.5,0.6,0.05),Y);u.position.set(0,0.82,0.24),this.chair.add(r,u);for(let[t,u0]of[[-0.22,-0.22],[0.22,-0.22],[-0.22,0.22],[0.22,0.22]]){let K0=new f(new _0(0.05,0.5,0.05),Y);K0.position.set(t,0.25,u0),this.chair.add(K0)}this.chair.position.set(1.5,0,-1.7),this.chair.traverse((t)=>{t.castShadow=!0}),J.add(this.chair);let h=new O0;h.position.set(-2.8,0,-1.9);let H0=new f(new _0(1.4,0.4,2.2),e0(4861984,0.7));H0.position.y=0.2;let E0=new f(new _0(1.3,0.2,2.1),e0(15261904,0.9));E0.position.y=0.5;let L0=new f(new _0(1.36,0.1,1.5),e0(16777215,0.95,{map:GJ(256,256,(t)=>{for(let u0=0;u0<8;u0++)for(let K0=0;K0<8;K0++)t.fillStyle=["#7a3a2a","#c89a5a","#3a5a6a","#e8dcc0"][(K0*3+u0*5)%4],t.fillRect(K0*32,u0*32,32,32)})}));L0.position.set(0,0.63,0.3);let d=new f(new _0(0.8,0.14,0.4),e0(16052456,0.95));d.position.set(0,0.68,-0.8);let D0=new f(new _0(1.4,1,0.08),e0(4861984,0.7));D0.position.set(0,0.7,-1.08),h.add(H0,E0,L0,d,D0),h.traverse((t)=>{t.castShadow=!0,t.receiveShadow=!0}),J.add(h);let s=new O0;s.position.set(-1,2.45,-3.12),s.add(new f(new T7(0.32,40),e0(16777215,0.6,{map:GJ(256,256,(t)=>{t.fillStyle="#f2ead6",t.beginPath(),t.arc(128,128,126,0,Math.PI*2),t.fill(),t.strokeStyle="#5a3a1a",t.lineWidth=10,t.stroke(),t.fillStyle="#2a1a10",t.font='700 30px "Rye", serif',t.textAlign="center",t.textBaseline="middle";for(let u0=1;u0<=12;u0++){let K0=u0/12*Math.PI*2;t.fillText(String(u0),128+Math.sin(K0)*96,128-Math.cos(K0)*96)}})})));for(let[t,u0]of[[0.18,0.025],[0.27,0.015]]){let K0=new f(new _0(u0,t,0.01).translate(0,t/2,0.01),e0(1707784));this.clockHands.push(K0),s.add(K0)}J.add(s),this.notes=new j9(new F9(0.18,0.18),e0(16777215,0.9,{map:GJ(128,128,(t)=>{t.fillStyle="#ffe066",t.fillRect(0,0,128,128),t.fillStyle="#3a2a10",t.font='700 22px "Caveat", cursive',t.fillText("new",14,52),t.fillText("approach",14,84)})}),40),J.add(this.notes);let G0=new f(new c0(0.3,20,16),e0(10123850,0.95,{map:GJ(256,256,(t)=>{t.fillStyle="#a8865a",t.fillRect(0,0,256,256),t.fillStyle="#3a2a10",t.font='700 40px "JetBrains Mono", monospace',t.textAlign="center",t.fillText("CONTEXT",128,140)})}));G0.scale.set(1,0.85,1),G0.position.y=0.26;let X0=new f(new Z7(0.08,0.16,12),e0(10123850,0.95));X0.position.y=0.55,this.sack.add(G0,X0),this.sack.traverse((t)=>{t.castShadow=!0}),J.add(this.sack);let c=new F8;c.moveTo(-0.5,0),c.lineTo(-0.15,-0.38),c.lineTo(0.55,0.42),c.lineTo(0.42,0.52),c.lineTo(-0.15,-0.12),c.lineTo(-0.38,0.12);let C0=new mQ(c);for(let t=0;t<14;t++){let u0=new f(C0,new h0({color:4120698,transparent:!0,toneMapped:!1,side:m9}));u0.scale.setScalar(0.18+f0(t)*0.12),this.checks.add(u0)}J.add(this.checks),this.windowShaft=P5(12374783,0.9,1.3,5.5),this.windowShaft.position.set(-4.7,2.5,-0.4),this.windowShaft.rotation.set(0,0,1.05),J.add(this.windowShaft),this.me.position.set(1.5,0,-1.65),J.add(this.me,this.ralph)}buildOutside(){let J=this.outside,Q=new F9(1600,1600,160,160),Z=Q.attributes.position;for(let h=0;h<Z.count;h++){let H0=Z.getX(h),E0=Z.getY(h),L0=Math.hypot(H0,E0),d=(Math.sin(H0*0.02)*Math.cos(E0*0.017)*2.4+Math.sin(H0*0.007+1)*4)*W9(40,160,L0);Z.setZ(h,d*(Math.abs(-E0-12)<8?W9(4,8,Math.abs(-E0-12)):1))}Q.computeVertexNormals();let $=new f(Q,e0(16777215,1,{map:vF}));$.rotation.x=-Math.PI/2,$.receiveShadow=!0,J.add($);for(let h=0;h<9;h++){let H0=-0.6+h*0.32+f0(h)*0.1,E0=380+f0(h+4)*120,L0=40+f0(h+8)*60,d=30+f0(h+2)*45,D0=new f(new T0(L0*0.7,L0,d,7),e0(8014386,1));D0.position.set(Math.sin(H0)*E0,d/2-4,-Math.cos(H0)*E0),J.add(D0)}let K=new f(new F9(1600,7),e0(2763310,0.85));K.rotation.x=-Math.PI/2,K.position.set(0,0.03,12),K.receiveShadow=!0,J.add(K);let U=new j9(new F9(3,0.18),e0(15253568,0.6),200),H=new k9;for(let h=0;h<200;h++)H.position.set(-800+h*8,0.04,12),H.rotation.x=-Math.PI/2,H.updateMatrix(),U.setMatrixAt(h,H.matrix);J.add(U);let Y=e0(4863526,0.9);for(let h=0;h<30;h++){let H0=new O0,E0=new f(new T0(0.12,0.15,8),Y);E0.position.y=4;let L0=new f(new _0(2.2,0.12,0.12),Y);L0.position.y=7.4,H0.add(E0,L0),H0.position.set(-200+h*20,0,17.5),H0.traverse((d)=>{d.castShadow=!0}),J.add(H0)}let W=e0(3824178,0.8);for(let h=0;h<26;h++){let H0=new O0,E0=2.5+f0(h)*3,L0=new f(new H8(0.28,E0,6,12),W);L0.position.y=E0/2,H0.add(L0);for(let s of[-1,1])if(f0(h+s*10)>0.3){let G0=0.9+f0(h+s)*1.2,X0=new f(new H8(0.2,0.6,6,10),W);X0.rotation.z=Math.PI/2,X0.position.set(s*0.5,E0*0.45,0);let c=new f(new H8(0.2,G0,6,10),W);c.position.set(s*0.85,E0*0.45+G0/2,0),H0.add(X0,c)}let d=f0(h+30)*Math.PI*2,D0=18+f0(h+40)*90;if(H0.position.set(Math.cos(d)*D0,0,Math.sin(d)*D0-10),Math.abs(H0.position.z-12)<6)H0.position.z-=14;H0.traverse((s)=>{s.castShadow=!0}),J.add(H0)}let X=new O0,G=e0(16777215,0.9,{map:h$([130,90,60],[2,1])}),q=new f(new _0(7,3.4,5.5),G);q.position.y=1.7;let N=new F8([new q0(-4,0),new q0(4,0),new q0(0,2.2)]),D=new f(new l8(N,{depth:6.3,bevelEnabled:!1}),e0(4864560,0.9));D.position.set(0,3.4,-3.15);let M=new f(new _0(0.7,2.2,0.7),e0(8018506,0.95));M.position.set(2.2,4.6,-1),this.cabinWindow=new f(new F9(1.5,1.1),new K9({color:1709072,emissive:16757611,emissiveIntensity:1.6})),this.cabinWindow.position.set(-1.6,1.9,2.77);let V=new f(new _0(1.1,2.2,0.08),e0(3810838,0.8));V.position.set(1.4,1.1,2.77);let F=new f(new _0(7.4,0.12,2),e0(4864560,0.9));F.position.set(0,2.8,3.7),F.rotation.x=0.1;for(let h of[-3.4,3.4]){let H0=new f(new _0(0.14,2.8,0.14),e0(4861984,0.9));H0.position.set(h,1.4,4.6),X.add(H0)}let O=new f(new _0(7.4,0.2,2),e0(16777215,0.9,{map:h$([110,75,50],[2,1])}));O.position.set(0,0.1,3.7),this.porch.position.set(0.4,2.5,3.6);let z=new f(new c0(0.08),new h0({color:16767392,toneMapped:!1}));z.position.copy(this.porch.position),X.add(q,D,M,this.cabinWindow,V,F,O,this.porch,z),X.traverse((h)=>{h.castShadow=!0,h.receiveShadow=!0}),J.add(X);let C=new WJ({color:9313308,roughness:0.35,metalness:0.5,clearcoat:1,clearcoatRoughness:0.2}),R=new K9({color:14540253,metalness:1,roughness:0.15}),B=this.truck,_=new f(new _0(4.8,0.7,1.9),C);_.position.y=0.85;let P=new f(new _0(1.7,0.95,1.8),C);P.position.set(0.55,1.65,0);let E=new WJ({color:2240576,roughness:0.05,metalness:0.2,transparent:!0,opacity:0.85}),A=new f(new F9(1.6,0.7),E);A.position.set(1.41,1.7,0),A.rotation.y=Math.PI/2,A.rotation.x=0;let y=new O0;for(let[h,H0,E0,L0,d,D0]of[[2.4,0.5,0.08,-1.2,1.45,0.9],[2.4,0.5,0.08,-1.2,1.45,-0.9],[0.08,0.5,1.88,-2.38,1.45,0]]){let s=new f(new _0(h,H0,E0),C);s.position.set(L0,d,D0),y.add(s)}let S=new f(new _0(0.08,0.5,1.6),R);S.position.set(2.42,0.95,0);let b=new f(new _0(0.16,0.18,2),R);b.position.set(2.5,0.55,0);let e=b.clone();e.position.x=-2.5;for(let h of[-0.65,0.65]){let H0=new f(new T7(0.13,20),new h0({color:16774360,toneMapped:!1}));H0.position.set(2.47,1,h),H0.rotation.y=Math.PI/2;let E0=new f(new _0(0.06,0.22,0.16),new h0({color:16719904,toneMapped:!1}));E0.position.set(-2.44,1.1,h*1.2),this.taillights.push(E0),B.add(H0,E0)}let v=new T0(0.42,0.42,0.3,24).rotateX(Math.PI/2),l=e0(1381653,0.9),U0=[];for(let[h,H0]of[[1.6,0.95],[1.6,-0.95],[-1.5,0.95],[-1.5,-0.95]]){let E0=new f(v,l);E0.position.set(h,0.42,H0);let L0=new f(new T0(0.2,0.2,0.32,16).rotateX(Math.PI/2),R);E0.add(L0),U0.push(E0)}this.headlights.position.set(2.5,1,0),this.headlights.target.position.set(20,0,0),B.add(_,P,A,y,S,b,e,...U0,this.headlights,this.headlights.target),B.userData.wheels=U0,B.traverse((h)=>{h.castShadow=!0});let i=new T0(0.11,0.11,0.025,16),r=new K9({color:15120458,metalness:0.9,roughness:0.25,emissive:4861952});this.bedCoins=new j9(i,r,220);let u=new k9;for(let h=0;h<220;h++)u.position.set(-2.3+f0(h)*2.2,1.25+f0(h+1)*0.35+Math.sin(f0(h+2)*3)*0.12,-0.8+f0(h+3)*1.6),u.rotation.set(f0(h+4)*2,f0(h+5)*3,f0(h+6)*2),u.updateMatrix(),this.bedCoins.setMatrixAt(h,u.matrix);B.add(this.bedCoins),this.roadCoins=new j9(i,r,360),J.add(B,this.roadCoins)}buildSign(){let J=this.signGroup,Q=new f(new _0(this.sign.width+1.4,2.6,0.3),e0(1316380,0.6));Q.position.z=-0.2;let Z=new f(new _0(this.sign.width+1.6,2.8,0.2),new K9({color:11569744,metalness:0.8,roughness:0.35}));Z.position.z=-0.3;let $=e0(3816000,0.5,{metalness:0.6});for(let U of[-this.sign.width/3,this.sign.width/3]){let H=new f(new T0(0.16,0.2,7),$);H.position.set(U,-4.6,-0.3),J.add(H)}let K=new ZZ(["STATE FILE"],{color:"#7ad8ff",height:0.55,font:'400 160px "Rye", serif'});K.group.position.set(0,1.75,0.02),K.set(0,1),this.sign.group.position.set(0,0,0),this.maybe.group.position.copy(this.sign.parts[3].mesh.position).setY(0),this.maybe.group.position.x+=(this.maybe.width-this.sign.parts[3].width)/2,this.maybe.group.position.y=0,this.maybe.group.position.z=0.03,J.add(Z,Q,this.sign.group,this.maybe.group,K.group,this.signGlow),this.signGlow.position.set(0,0,2),J.position.set(-14,8.1,20.5),J.rotation.y=0.12,J.traverse((U)=>{if(U.isMesh&&!U.material.transparent)U.castShadow=!0}),this.outside.add(J)}flash(J){let Q=g$(J);return Q.name==="leave"||Q.name==="neon2"||Q.name==="return"?Math.exp(-(J-Q.at)*7)*0.18:0}fade(J){return W9(q7()-2.5,q7()-0.2,J)}truckAt(J){let Q=I(8)-0.2,Z=I(28)-1;if(J<Q)return{x:6.5,z:6,heading:Math.PI/2,moving:0};if(J<Z){let K=J-Q;if(K<2.5){let U=$9(K/2.5);return{x:6.5+U*2,z:j(6,12,U),heading:j(Math.PI/2,0,U),moving:1}}return{x:8.5+(K-2.5)*(3+(K-2.5)*0.35),z:10.2,heading:0,moving:1}}let $=J-Z;return{x:Math.max(8.5,140-$*22),z:13.8,heading:Math.PI,moving:$<6?1:0}}update(J){this.t=J;let Q=g$(J),Z=Q.name,$=Q.at,K=kF(Q),U=$0(J,$,K),H=J-$,Y=this.camera,W=this.film.look,X=KZ.ROOM,G=jF(J),q=!["title","leave","neon","leave2","neon2","return","maybe","end"].includes(Z),N=this.sky.set(G,Math.PI/2),D=1-W9(0.28,0.55,G),M=new Y0().lerpColors(new Y0(16752736),new Y0(16773856),W9(0.5,0.9,G));this.sun.color.lerpColors(M,new Y0(8363263),D),this.sun.intensity=j(0.25,3.2,W9(0.3,0.8,G))+D*(q?2.4:0.35);let V=q?Y7(-0.85,D>0.5?0.45:0.25+G*0.35,0.2).normalize():D>0.5?Y7(-0.35,0.55,-0.75).normalize():N.clone();this.room.visible=q,this.outside.visible=!q,this.hemi.intensity=j(q?0.55:0.12,0.85,W9(0.25,0.9,G)),this.hemi.color.setHex(D>0.5?5927088:12375807),this.scene.fog.color.lerpColors(new Y0(14196864),new Y0(658456),D),this.scene.fog.density=j(0.0016,0.003,D),this.moon.visible=G<0.45,this.renderer.toneMappingExposure=j(1.1,0.95,W9(0.6,1,G));let F=q?X.clone().add(Y7(-1,0,-1)):Y7(0,0,6);this.sun.target.position.copy(F),this.sun.position.copy(F).addScaledVector(V,60);let O=this.sun.shadow.camera,z=q?8:40;O.left=-z,O.right=z,O.top=z,O.bottom=-z,O.near=1,O.far=140,O.updateProjectionMatrix();let C=J<J0(2,/light/i)-0.1||J>I(32)-0.5||Z==="commit"||Z==="limit";this.lamp.intensity=C?Z==="limit"?0:Z==="helping"||Z==="twenty"?2.5:6:0,this.lampBulb.material.color.setHex(C&&Z!=="limit"?16767392:3811866),this.windowShaft.material.uniforms.strength.value=j(0.22,0.32,1-D)*(q?1:0),this.windowShaft.material.uniforms.color.value.setHex(D>0.5?11060479:16763024),this.windowShaft.material.uniforms.time.value=J,this.dust.update(J);let R=j5(J);this.clockHands[0].rotation.z=-(R%12/12)*Math.PI*2,this.clockHands[1].rotation.z=-(R%1)*Math.PI*2;let B=J<I(28)-0.6?S9($0(J,I(2),I(7))):0;this.coins.count=Math.round(160*(1-B)),this.drawScreen(J,Z),this.screenLight.intensity=Z==="limit"?1.2:Z==="helping"?0.15:0.7;let _=this.steam.geometry.attributes.position;for(let c=0;c<_.count;c++){let C0=(J*0.4+f0(c))%1;_.setXYZ(c,Math.sin(J*2+c)*0.02*C0*2,0.12+C0*0.35,Math.cos(J*1.7+c)*0.02)}_.needsUpdate=!0,this.steam.visible=J>I(6)-1&&J<I(12),this.mug.visible=J>I(6)-1;let P=$0(J,J0(29,/whiskey/i)-0.6,J0(29,/whiskey/i)+1.4);this.glassFill.scale.y=J<I(29)-1?0.0001:Math.max(0.0001,P*0.06),this.bottle.position.set(J>I(29)-0.3&&P<1?0.12:0,0.96+(P>0&&P<1?0.15:0),-2.35),this.bottle.rotation.z=P>0&&P<1?-1.9*Math.sin(P*Math.PI):0;let E=J<I(15)?0:Math.min(40,Math.floor((J-I(15))*9)),A=new k9;for(let c=0;c<40;c++)A.position.set(0.3+f0(c)*2.6,1.3+f0(c+1)*1.6,-3.13),A.rotation.set(0,0,(f0(c+2)-0.5)*0.5),A.scale.setScalar(c<E?1:0.0001),A.updateMatrix(),this.notes.setMatrixAt(c,A.matrix);this.notes.instanceMatrix.needsUpdate=!0,this.notes.visible=J>I(15)&&J<I(24),this.checks.visible=Z==="dream",this.checks.children.forEach((c,C0)=>{let t=C0/14*Math.PI*2+J*0.25;c.position.set(-2.8+Math.cos(t)*(0.6+f0(C0)*0.5),1.2+(J*0.2+f0(C0+5))%1*1.5,-2.3+Math.sin(t)*0.5),c.rotation.set(0,J*0.5+C0,0),c.material.opacity=0.85*Math.sin((J*0.2+f0(C0+5))%1*Math.PI)});let y=this.me;y.visible=q&&!["loop","state","reread","context","summary","app","rename","rename2","twenty","limit","helping","tenof","whiskey","ralph"].includes(Z),y.rotation.set(0,Math.PI,0),y.position.set(1.5,0,-1.65);let S="type",b=!0,e=0.15,v=0;if(Z==="pillow"||Z==="dream")y.position.set(-2.8,0.84,-0.93),y.rotation.set(-Math.PI/2,0,0),S="sleep",b=!1,e=Z==="pillow"?-0.25:0;else if(Z==="dawn")y.position.set(2,0,-1.6),y.rotation.y=Math.PI*0.95,S="mug",b=!1,e=-0.1;else if(Z==="goodbye")y.position.set(-3.7,0,-0.4),y.rotation.y=-Math.PI/2,S="hips",b=!1,e=0.05;else if(Z==="renews")y.position.set(-3.7,0,-0.4),y.rotation.y=-Math.PI/2-0.4,S="down",b=!1;else if(Z==="whiskey")S="pour",e=0.25;else if(Z==="tenof"||Z==="limit")S="face",e=0.35;else if(Z==="commit")v=1.6;else if(Z==="baggage"||Z==="approach")S="face",e=0.2;else if(Z==="ralph"||Z==="state"||Z==="loop"){if(Z==="ralph")y.position.set(-2.8,0.84,-0.93),y.rotation.set(-Math.PI/2,0,0),S="sleep",b=!1,e=0}if(hF(y,S,{sit:b,tilt:e,shake:v,t:J}),b)y.position.y=-0.36;let l=this.ralph,U0=l.userData;if(l.visible=q&&J>I(4)-0.5,l.scale.setScalar(0.75),U0.prop.rotation.y=J*14,U0.eyeMat.color.setHex(Z==="limit"?3364198:7336191),Z==="baggage"){let c=j(-1.5,2.4,U);l.position.set(c,0,-0.6),l.rotation.y=Math.PI/2,this.sack.position.set(c-0.75,0,-0.6),this.sack.scale.setScalar(0.9+U*0.9),this.sack.visible=!0,U0.arms.forEach((C0)=>C0.rotation.x=-1.2)}else if(this.sack.visible=!1,l.position.set(Z==="helping"?1.5:2.15,0.96,Z==="helping"?j(-2.95,-2.75,$9($0(J,J0(33,/helping/i)-0.5,J0(33,/helping/i)))):-2.45),l.rotation.y=Z==="helping"?0:-1.9,U0.arms.forEach((c,C0)=>c.rotation.x=-1.1+Math.sin(J*22+C0*1.7)*0.25),U0.head.rotation.z=Math.sin(J*3)*0.08,Z==="helping"){let c=$9($0(J,J0(33,/helping/i)-0.5,J0(33,/helping/i)));l.position.y=0.96+j(-0.6,0.12,c),U0.arms.forEach((C0,t)=>C0.rotation.z=(t?-1:1)*c*2.4)}else U0.arms.forEach((c)=>c.rotation.z=0);this.cabinWindow.material.emissiveIntensity=D>0.5?1.6:j(0,0.6,D*2),this.porch.intensity=D>0.4?6:0;let i=this.truckAt(J);this.truck.position.set(i.x,0,i.z),this.truck.rotation.y=-i.heading,this.truck.userData.wheels.forEach((c)=>c.rotation.z=-J*8*i.moving),this.taillights.forEach((c)=>c.material.color.setHex(D>0.2||i.moving?16719904:5246992)),this.headlights.intensity=i.moving&&D>0.2?60:0,this.bedCoins.count=J>I(8)-0.2&&J<I(28)-1?Math.max(30,Math.round(220-(J-I(8))*12)):220;let r=new k9,u=I(8)-0.2;for(let c=0;c<360;c++){let C0=u+1+c*0.045;if(!(J>C0&&J<I(28)-1)){r.scale.setScalar(0.0001),r.updateMatrix(),this.roadCoins.setMatrixAt(c,r.matrix);continue}let u0=this.truckAt(C0),K0=J-C0,R0=Math.min(1,K0*1.8),B0=j(1.6,0.04,R0)+Math.abs(Math.sin(R0*Math.PI*2))*0.25*(1-R0);r.position.set(u0.x-2.4+(f0(c)-0.5)*1.2-Math.min(K0,0.5)*2,B0,u0.z+(f0(c+1)-0.5)*2.4),r.rotation.set(R0>=1?Math.PI/2*0:K0*9,f0(c+2)*6,R0>=1?0:K0*7),r.scale.setScalar(1),r.updateMatrix(),this.roadCoins.setMatrixAt(c,r.matrix)}this.roadCoins.instanceMatrix.needsUpdate=!0;let h=(c,C0)=>J>=J0(c,C0)-0.1?1:0,H0=(c,C0)=>[h(c,/ralph/i),h(c,/local/i),h(c,/m-d/i),h(C0,/never/i),h(C0,/again/i)],E0=[0,0,0,0,0],L0=0;if(J>=I(10)-0.2)E0=H0(10,11);if(J>=I(22)-0.3)E0=H0(22,23);if(J>=I(30)-0.6){let c=J0(31,/maybe/i);E0=[h(30,/ralph/i),h(30,/local/i),h(30,/m-d/i),J<c?b$(J,3,0.3+$0(J,I(30),c)*0.6):0,h(31,/again/i)],L0=J>=c-0.1?b$(J,7,Math.max(0,0.6-(J-c))):0}if(Z==="neon2"||Z==="leave2")E0[3]=E0[3]*b$(J,1,0.25);E0.forEach((c,C0)=>this.sign.set(C0,c)),this.maybe.set(0,L0),this.maybe.group.visible=J>=I(30)-0.6,this.signGlow.intensity=E0.reduce((c,C0)=>c+C0,0)/5*30*(0.4+D*0.6),this.signGlow.color.setHex(L0>0.5?16761421:16731517);let d=(c,C0,t=38)=>({pos:c,look:C0,fov:t}),D0=(c)=>[c[0]+X.x,c[1]+X.y,c[2]+X.z],s=(c,C0=0,t=0)=>{let u0=[1.5,1.2,-2.78];return d(D0([u0[0]+C0,u0[1]+0.05+t,u0[2]+c]),D0(u0),30)};Object.assign(W,{focus:0,aperture:0.002,bloom:0.45,exposure:q&&D>0.5?1.35:1,warmth:0.25,saturation:0.92,contrast:1.06,vignette:0.55,grain:0.07,aberration:0.5,halation:0.5,letterbox:1,leak:0,fade:0}),W.shadows.setRGB(0.42,0.5,0.6),W.highlights.setRGB(0.6,0.52,0.42);let G0=0.4,X0=null;switch(Z){case"title":{G9(Y,d([-30,40,70],[-10,30,-100],42),d([-6,3.2,26],[-1.5,2.2,0],34),$9(U)),Object.assign(W,{warmth:-0.45,exposure:1.05,bloom:0.7}),G0=0.2;break}case"desk":{G9(Y,d(D0([3.4,1.6,0.4]),D0([1.5,1.05,-2.4]),34),d(D0([2.6,1.45,-0.6]),D0([1.4,1.1,-2.4]),30),U),X0=y.position.clone().add(Y7(0,1.4,0));break}case"pillow":{G9(Y,d(D0([-2.8,2.9,-1.2]),D0([-2.8,0.8,-2.2]),40),d(D0([-2.6,2.4,-1.4]),D0([-2.8,0.8,-2.3]),34),U),X0=Y7(X.x-2.8,0.9,X.z-2.3),W.warmth=0.1;break}case"loop":case"state":case"reread":case"context":case"summary":case"app":case"rename":case"rename2":case"twenty":{let c=Z==="loop"||Z==="twenty"?1.5:1;if(G9(Y,s(c+0.15,-0.08,0.02),s(c,0.06,0),U),X0=Y7(X.x+1.5,1.2,X.z-2.7),W.aperture=0.004,W.warmth=Z==="loop"&&J>J0(2,/light/i)?-0.25:0,Z==="context"&&J>J0(14,/forty/i))W.aberration=2.2,W.warmth=0.1;G0=0.25;break}case"ralph":{G9(Y,d(D0([-0.3,1.5,-0.4]),D0([1.1,1.2,-2.5]),34),d(D0([0,1.45,-0.8]),D0([1.1,1.25,-2.5]),30),U),X0=l.position.clone().add(Y7(0,0.5,0)),W.aperture=0.005,W.warmth=-0.2;break}case"dream":{G9(Y,d(D0([-1.4,1.6,-0.2]),D0([-2.8,1.4,-2.2]),40),d(D0([-1.9,1.9,-0.6]),D0([-2.8,1.6,-2.3]),36),U),X0=Y7(X.x-2.8,1.5,X.z-2.2),Object.assign(W,{warmth:-0.3,saturation:1.1,bloom:1,halation:1}),G0=0.2;break}case"dawn":{G9(Y,d(D0([3.6,1.5,0.6]),D0([2,1.4,-1.8]),36),d(D0([3.1,1.6,0.1]),D0([2,1.45,-1.8]),32),U),X0=y.position.clone().add(Y7(0,1.4,0)),Object.assign(W,{warmth:0.5,leak:0.25});break}case"tenof":{G9(Y,d(D0([0.2,1.45,-1.2]),D0([0.9,1.15,-2.6]),32),d(D0([0.35,1.35,-1.5]),D0([0.8,1.15,-2.6]),28),U),X0=this.jar.position.clone().add(X).add(Y7(0,0.2,0)),W.aperture=0.006;break}case"leave":case"leave2":{if(Z==="leave")G9(Y,d([20,0.8,9.5],[6,1.2,9],40),d([22,1.2,10],[9,1,10.5],36),U);else G9(Y,d([-10,1.6,14.5],[40,1.2,10],30),d([-10,2.4,14.5],[80,1,10],26),U);X0=this.truck.position.clone().add(Y7(0,1,0)),W.aperture=0.0004,Object.assign(W,{warmth:Z==="leave"?-0.1:0.45,bloom:0.6,leak:Z==="leave2"?0.2:0}),G0=0.6;break}case"neon":case"neon2":case"maybe":{let c=this.signGroup.position;if(Z==="neon")G9(Y,d([c.x+2,3.2,c.z+30],[c.x,c.y-0.5,c.z],36),d([c.x-1,5,c.z+24],[c.x,c.y,c.z],34),U);else if(Z==="neon2")G9(Y,d([c.x+14,5.5,c.z+20],[c.x,c.y,c.z],36),d([c.x-8,6.5,c.z+22],[c.x,c.y,c.z],34),U);else G9(Y,d([c.x+8,7.4,c.z+12],[c.x+3,c.y,c.z],32),d([c.x+6,7.8,c.z+10],[c.x+3.2,c.y,c.z],28),U);X0=c.clone(),W.aperture=0.0012,Object.assign(W,{warmth:Z==="maybe"?0.3:0,bloom:0.45,halation:0.35,exposure:0.9}),G0=0.3;break}case"baggage":{G9(Y,d(D0([0.4,0.5,1.8]),D0([0.4,0.4,-0.6]),40),d(D0([0.9,0.6,1.6]),D0([1.6,0.4,-0.6]),38),U),X0=l.position.clone();break}case"approach":{G9(Y,d(D0([1.6,1.6,-0.2]),D0([1.6,1.9,-3.1]),40),d(D0([1.6,1.8,-1]),D0([1.6,2,-3.1]),34),U),X0=Y7(X.x+1.6,2,X.z-3.1),W.warmth=-0.1;break}case"commit":{G9(Y,d(D0([0.7,1.85,-0.7]),D0([1.5,1.15,-2.6]),34),d(D0([0.85,1.75,-0.95]),D0([1.5,1.15,-2.6]),30),U),X0=Y7(X.x+1.5,1.1,X.z-2.4),W.aperture=0.006,G0=1.6;break}case"limit":{G9(Y,s(1.7,0,0.1),s(0.9,0,0.02),U),X0=Y7(X.x+1.5,1.2,X.z-2.7),Object.assign(W,{warmth:-0.5,exposure:0.9,saturation:0.7}),G0=0.15;break}case"goodbye":{G9(Y,d(D0([-1.2,1.7,1.4]),D0([-4.4,1.8,-0.4]),34),d(D0([-1.8,1.7,0.9]),D0([-4.4,1.8,-0.4]),32),U),X0=y.position.clone().add(Y7(0,1.5,0)),Object.assign(W,{warmth:0.55,exposure:0.95,leak:0.2});break}case"renews":{let c=Y7(X.x-1,2.45,X.z-3.12);G9(Y,d([c.x,c.y,c.z+1.8],c.toArray(),30),d([c.x,c.y,c.z+1],c.toArray(),30),U),X0=c,W.aperture=0.008,Object.assign(W,{warmth:0.6,leak:W9(J0(27,/renews/i)-0.3,J0(27,/renews/i)+0.6,J)*0.7}),G0=0.1;break}case"return":{G9(Y,d([30,1.4,16.5],[60,1.5,13],32),d([26,1.2,16.5],[16,1.3,13],38),U),X0=this.truck.position.clone().add(Y7(0,1,0)),W.aperture=0.0005,Object.assign(W,{warmth:0.35,bloom:0.5}),G0=0.5;break}case"whiskey":{if(G9(Y,d(D0([0.6,1.35,-1.5]),D0([0.15,1.05,-2.3]),32),d(D0([0.45,1.25,-1.7]),D0([0.2,1.05,-2.3]),28),U),X0=this.glassFill.position.clone().add(X),W.aperture=0.006,W.warmth=0.55,J>J0(29,/changed/i)-0.3)G9(Y,s(0.7,0.05,0),s(0.6,-0.04,0),$0(J,J0(29,/changed/i)-0.3,K)),X0=Y7(X.x+1.5,1.2,X.z-2.7),W.warmth=0.1;break}case"helping":{G9(Y,d(D0([1.5,1.6,-0.6]),D0([1.5,1.45,-2.8]),32),d(D0([1.5,1.55,-0.9]),D0([1.5,1.5,-2.8]),28),U),X0=l.position.clone().add(Y7(0,0.5,0)),W.aperture=0.005,W.warmth=0.3;break}case"end":{G9(Y,d([-4,2.4,22],[-1,2.2,0],34),d([-20,30,70],[-10,35,-100],44),$9(U)),Object.assign(W,{warmth:0.3,bloom:0.5}),G0=0.2;break}}if(x$(Y,J,G0),this.sky.mesh.position.copy(Y.position),this.sky.stars.position.copy(Y.position),this.moon.position.copy(Y.position).add(Y7(-160,120,-380)),W.focus=X0?Y.position.distanceTo(X0):0,H<0.6&&(Z==="leave"||Z==="return"))W.leak=Math.max(W.leak,(1-H/0.6)*0.6);this.film.look.grain=0.06+P7(J)*0.01}drawScreen(J,Q){let Z=this.screen,$="#3ee07a",K="#6b7a90",U="#ff5f6b",H="#ffd166",Y="#7ad8ff",W=".claude/ralph-loop.local.md";if(J<I(2)-0.4)Z.show([{text:"$ claude",color:"#6b7a90"},"> build me the whole app.","  tests, docs, deploy. by morning.",{text:"",size:20},{text:"sure! I'll get started.",color:"#3ee07a"}],{title:"~/app",cursor:Math.floor(J*2)%2===0});else if(J<I(3)-0.3)Z.show([{text:"$ claude",color:"#6b7a90"},`> /ralph-loop "${e6("build the whole app",$0(J,I(2),J0(2,/spec/i)+0.6))}"`,{text:J>J0(2,/light/i)?"  loop started · going to bed":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<I(4)-0.3)Z.show([{text:"$ cat .claude/ralph-loop.local.md",color:"#6b7a90"},"---","active: true",`max_iterations: ${J>J0(3,/ten/i)-0.2?"10":""}`,'completion_promise: "DONE"',"---",{text:J>J0(3,/polite/i)?"# ten is polite.":"",color:"#6b7a90"}],{title:".claude/ralph-loop.local.md"});else if(J<I(7)-0.3){let X=Math.min(10,1+Math.floor($0(J,I(4),I(7))*10));Z.show([{text:`iteration ${X}/10`,color:"#ffd166",bold:!0},"reading context…","editing src/app.tsx",{text:"✓ tests pass (2 of 41)",color:"#3ee07a"},{text:`tokens: ${(X*9.8).toFixed(0)}% of plan`,color:X>7?"#ff5f6b":"#6b7a90"}],{title:"ralph-loop",cursor:Math.floor(J*3)%2===0})}else if(J<I(9)-0.2)Z.show([{text:"iteration 10/10",color:"#ffd166",bold:!0},{text:"max_iterations reached.",color:"#ff5f6b"},{text:"tokens: 100% of plan",color:"#ff5f6b",bold:!0},"",{text:"app status: half",color:"#6b7a90"}],{title:"ralph-loop"});else if(J<I(12)-0.3)Z.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md",`$ ${e6("mv .claude/ralph-loop.local.md .claude/ralph-loop.local.md-NEVER_AGAIN",$0(J,I(9),n0(9)+0.4))}`,{text:J>n0(9)+0.5?"renamed.":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<I(14)-0.1){let X=Array.from({length:9},(G,q)=>({text:`> ${["previous attempt:","re-reading thread (1 of 1,204)","loading transcript…","loading last round…","loading the round before…","carrying over context","summarizing summaries","re-reading thread (2 of 1,204)","loading transcript…"][(q+Math.floor(J*8))%9]}`,color:q%3?"#6b7a90":"#7ad8ff"}));Z.show([{text:`iteration ${3+Math.floor((J-I(12))*1.5)}/10`,color:"#ffd166",bold:!0},...X],{title:"ralph-loop"})}else if(J<I(15)-0.1){let X=Math.min(40,Math.round($0(J,I(14),J0(14,/forty/i))*40)),G="█".repeat(Math.round(X/2.5))+"░".repeat(40-Math.round(X/2.5)),q=J>J0(14,/forty/i)+0.3;Z.show([{text:"context window",color:"#6b7a90"},{text:G,color:X>=40?"#ff5f6b":"#3ee07a"},{text:`${X}% used`,color:X>=40?"#ff5f6b":"#3ee07a",bold:!0},{text:q?"quality: [REDACTED BY ENTROPY]":"quality: sharp",color:q?"#ff5f6b":"#3ee07a"}],{title:"ralph-loop"})}else if(J<I(16)-0.1){let X=Math.min(14,Math.floor((J-I(15))*6));Z.show(Array.from({length:X},(G,q)=>({text:"new approach:",color:q%2?"#ffd166":"#7ad8ff"})),{title:"ralph-loop"})}else if(J<I(17)-0.1)Z.show([{text:"SUMMARY",color:"#6b7a90",bold:!0},{text:"✨ Great progress!",color:"#3ee07a",bold:!0,size:56},{text:"Almost done!",color:"#3ee07a",bold:!0,size:56},"",{text:"(tests: 2 of 41)",color:"#6b7a90",size:26}],{title:"ralph-loop"});else if(J<I(18)-0.1)Z.show([{text:"schema.sql",color:"#7ad8ff"},"CREATE TABLE users (","  id serial,","  -- TODO","",{text:"// TODO  // TODO  // TODO",color:"#ffd166"}],{title:"localhost:3000",banner:{text:"[ Coming Soon ]",color:"#3a6ad8"}});else if(J<I(20)-0.2)Z.show([{text:"$ git status",color:"#6b7a90"},"modified: everything",`$ ${e6('git commit -m "burned all my tokens"',$0(J,I(18),J0(19,/tokens/i)+0.3))}`,{text:J>J0(19,/hundred/i)?"plan: $100 · used: 100%":"",color:"#ff5f6b",bold:!0}],{title:"~/app",cursor:!0});else if(J<I(24)-0.5)Z.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md",`$ ${e6("mv .claude/ralph-loop.local.md .claude/ralph-loop.local.md-NEVER_AGAIN",$0(J,I(21),n0(21)+0.4))}`,{text:J>n0(21)+0.5?"renamed. again.":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<I(29))Z.show([{text:"",size:20}],{title:"claude",bg:"#120b0e",banner:{text:"Usage limit reached · resets 9:00 AM",color:"#b3122e"}});else if(J<I(32)-0.4)Z.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md-NEVER_AGAIN",`$ ${e6("mv .claude/ralph-loop.local.md-NEVER_AGAIN .claude/ralph-loop.local.md-MAYBE_AGAIN",$0(J,J0(29,/changed/i)-0.2,n0(29)+0.4))}`],{title:"~/app",cursor:!0});else Z.show([{text:"$ cat .claude/ralph-loop.local.md",color:"#6b7a90"},"---","active: true",{text:`max_iterations: ${J>J0(32,/twenty/i)-0.2?"20":""}`,color:"#ffd166",bold:!0},"---",{text:J>I(33)-0.4?"I'm helping!":"",color:"#3ee07a",bold:!0}],{title:".claude/ralph-loop.local.md",cursor:!0})}t=0;render(){this.film.render(this.t)}}var pF=/^(never|again|quota's|burned|tokens|token|limit|hundred-dollar|dime|spent|shaking)$/,uF=/^(loop|ralph|ralph-loop|state|file|context|iterations|m-d|local|thread|schema|todos|commit)$/,mF=/^(dawn|six|coffee|whiskey|nine|renews|maybe|helping|helping!|twenty|green|checkmarks|progress)$/,y5={title:"NEVER_AGAIN",fonts:['400 100px "Rye"','400 100px "Monoton"','700 40px "Libre Baskerville"','italic 400 40px "Libre Baskerville"','700 40px "Caveat"','500 20px "JetBrains Mono"','800 40px "Inter"'],overlays:()=>`
  <div class="ov title" data-show="1.2|L0-0.6">NEVER_AGAIN<small>an outlaw country lament</small></div>
  <div class="ov bubble" data-show="W4:helping-0.1|L5-0.2" data-at="W4:helping-0.1">I'm helping!</div>
  <div class="ov card bill" data-show="W19:hundred-0.2|L20-0.3"><div class="bar">Claude Max · monthly</div>
    <div class="row">plan <b>$100</b></div>
    <div class="row">used <b data-count="0,100" data-at="W19:hundred-0.2" data-until="E19">0</b>%</div>
    <div class="row muted" data-at="E19-0.4">resets 9:00 AM</div></div>
  <div class="ov bubble big" data-show="W33:helping-0.1|W33:helping+2.2" data-at="W33:helping-0.1">I'm helping!</div>`,endAt:()=>J0(33,/helping/i)+2.4,words:{hot:pF,ice:uF,gold:mF},hide:/^(spoken|sob)$/,hud:(J,Q)=>({left:`never_again &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`${v5(J)} &nbsp;·&nbsp; quota <b>${J<I(2)?"100%":J<I(28)-0.6?"gone":"renewed"}</b>`}),shots:p$,shotAt:g$,world:(J)=>{let Q=new KZ(J);return{update:(Z)=>Q.update(Z),render:()=>Q.render(),flash:(Z)=>Q.flash(Z),fade:(Z)=>Q.fade(Z)}}};var e9=(J,Q,Z,$)=>({name:J,at:Q,label:Z,section:$}),WH=(J,Q)=>[e9("ask",I(J)-0.3,"can you explain that function?",Q),e9("shrug",I(J+1)-0.2,"I don't know, I don't know",Q),e9("ask2",I(J+2)-0.2,"can you explain that function?",Q),e9("plank",I(J+3)-0.3,"over the plank you go",Q)];function m$(){return[e9("title",0,"a shanty in one act","verse 1"),e9("sail",I(0)-0.4,"ten times faster, lads","verse 1"),e9("crates",I(2)-0.3,"four thousand lines","verse 1"),e9("green",I(4)-0.2,"the tests were green","verse 1"),e9("lgtm",I(5)-0.2,"L-G-T-M","verse 1"),e9("diff",I(6)-0.2,"read the diff at last","verse 1"),e9("mast",I(7)-0.2,"hollered from the mast","verse 1"),...WH(8,"chorus"),e9("kevin",I(12)-0.4,"it's just a helper","verse 2"),e9("bosun",I(14)-0.2,"load-bearing","verse 2"),e9("pulled",I(15)-0.2,"the mast stayed up","verse 2"),e9("cook",I(16)-0.2,"what's this thing for?","verse 2"),e9("great",I(17)-0.1,"great question!","verse 2"),...WH(18,"chorus"),e9("barnacles",I(22)-0.8,"slop creeps in like barnacles","verse 3"),e9("hull",I(24)-0.2,"a retry inside a retry","verse 3"),e9("stern",I(28)-0.3,"all barnacle, stem to stern","verse 3"),e9("steer",I(29)-0.2,"ten times harder to steer","verse 3"),e9("quarters",I(30)-1,"who approved that function?","bridge"),e9("blame",I(31)-0.2,"you did, Cap'n. nine seconds.","bridge"),e9("crew",I(32)-0.2,"nobody tell the crew","bridge"),e9("heard",I(33)-0.3,"we heard","bridge"),...WH(34,"last chorus"),e9("built",I(38)-0.3,"the plank was built by Claude","last chorus"),e9("fell",I(39)-0.2,"when Cap'n fell","last chorus"),e9("bottom",I(40)-0.6,"ten times faster to the bottom","outro"),e9("end",I(41)-0.3,"great question!","outro")]}var b5=null,GH=(J)=>{let Q=b5??=m$(),Z=Q[0];for(let $ of Q)if($.at<=J)Z=$;return Z},dF=(J)=>{let Q=b5??=m$();return Q[Q.indexOf(J)+1]?.at??q7()},u$=()=>[{who:"jim",walk:I(11)-0.2,drop:J0(11,/^go/i),splash:J0(11,/splash/i)},{who:"cook",walk:I(21)-0.2,drop:J0(21,/^go/i),splash:J0(21,/splash/i)},{who:"cap",walk:I(37)-0.2,drop:J0(39,/fell/i),splash:J0(39,/splash/i)}],NH=(J)=>j(0,0.45,$0(J,I(22),I(24)))+j(0,0.55,$0(J,I(24),n0(28))),lF=(J)=>J<I(22)?0.05:J<I(30)-1?j(0.1,0.45,$0(J,I(22),I(30))):J<I(34)-0.3?0.12:J<I(40)-0.6?1:0.7,cF=(J)=>J<I(22)?0.86:J<I(30)-1?j(0.8,0.5,$0(J,I(22),I(30)-1)):J<I(34)-0.3?0.03:J<I(40)-0.6?0.18:j(0.3,0.42,$0(J,I(40),q7()));function U6(J,Q,Z,$){return(0.18+0.75*$)*(0.55*Math.sin(J*0.32+Z*1.3)+0.35*Math.sin(Q*0.41-Z*0.9+J*0.12)+0.18*Math.sin((J+Q)*0.9+Z*2.1))}var d9=(J,Q=0.8,Z={})=>new K9({color:J,roughness:Q,metalness:0,...Z});function JQ(J,Q,Z,$){let K=Object.assign(document.createElement("canvas"),{width:J,height:Q});Z(K.getContext("2d"));let U=new G7(K);if(U.colorSpace=F7,U.anisotropy=8,$)U.wrapS=U.wrapT=m8,U.repeat.set(...$);return U}var XH=(J,Q)=>JQ(512,512,(Z)=>{for(let $=0;$<16;$++){let K=f0($*3.1);Z.fillStyle=`rgb(${J.map((U)=>Math.round(U*(0.8+K*0.35))).join(",")})`,Z.fillRect(0,$*32,512,31),Z.fillStyle="rgba(0,0,0,.45)",Z.fillRect(0,$*32+31,512,1),Z.fillStyle="rgba(0,0,0,.12)";for(let U=0;U<14;U++)Z.fillRect(f0($*50+U)*512,$*32+f0(U+$)*30,30+f0(U*7+$)*90,1);Z.fillStyle="rgba(0,0,0,.3)",Z.fillRect(f0($+99)*512,$*32,2,31)}},Q),f5=(J,Q)=>JQ(128,128,(Z)=>{for(let $=0;$<8;$++)Z.fillStyle=$%2?Q:J,Z.fillRect(0,$*16,128,16)},[1,2]),nF=JQ(1024,1024,(J)=>{J.fillStyle="#efe4c8",J.fillRect(0,0,1024,1024);for(let Q=0;Q<6;Q++)J.fillStyle="rgba(120,90,50,.18)",J.fillRect(Q*171,0,3,1024);for(let Q=0;Q<4000;Q++)J.fillStyle=`rgba(110,80,40,${f0(Q)*0.05})`,J.fillRect(f0(Q+1)*1024,f0(Q+2)*1024,3,3);J.fillStyle="#b8282a",J.font='900 420px "Inter", sans-serif',J.textAlign="center",J.fillText("10×",512,600),J.font='800 70px "JetBrains Mono", monospace',J.fillText("POWERED BY A-I",512,760)}),sF=JQ(256,256,(J)=>{J.fillStyle="#8a6238",J.fillRect(0,0,256,256),J.strokeStyle="#4a3018",J.lineWidth=14,J.strokeRect(7,7,242,242),J.beginPath(),J.moveTo(10,10),J.lineTo(246,246),J.stroke(),J.fillStyle="rgba(20,10,0,.85)",J.font='800 54px "JetBrains Mono", monospace',J.textAlign="center",J.fillText("PR #1",128,112),J.font='700 40px "JetBrains Mono", monospace',J.fillText("+4,000",128,172)}),E7=(J=0,Q=0,Z=0)=>new k(J,Q,Z),y9=1.2;function UZ(J){let Q=new O0,Z=d9(J.skin??14264450,0.7),$=new f(new T0(0.25,0.22,0.7,16),J.shirt);$.position.y=1.2;let K=new O0;K.position.y=1.75,K.add(new f(new c0(0.18,20,16),Z));let U=new f(new c0(0.035,10,8),d9(3805200,0.9));U.position.set(0,-0.06,0.165),U.scale.set(1.4,0.4,0.5),K.add(U);for(let W of[-1,1]){let X=new f(new c0(0.022,8,6),d9(1118481,0.4));X.position.set(W*0.065,0.03,0.16),K.add(X)}if(J.beard!==void 0){let W=new f(new c0(0.185,16,10,0,Math.PI*2,Math.PI*0.5,Math.PI*0.45),d9(J.beard,0.95));K.add(W)}if(J.hat==="tricorn"){let W=d9(1841698,0.8),X=new f(new T0(0.34,0.34,0.04,3),W);X.position.y=0.13,X.rotation.y=Math.PI/6+Math.PI;let G=new f(new T0(0.15,0.19,0.18,18),W);G.position.y=0.22;let q=new f(new R7(0.3,0.012,6,3),new K9({color:14200928,metalness:0.8,roughness:0.35}));q.rotation.x=Math.PI/2,q.rotation.z=Math.PI/6+Math.PI,q.position.y=0.15,K.add(X,G,q)}else if(J.hat==="beanie"){let W=new f(new c0(0.19,18,10,0,Math.PI*2,0,Math.PI/2.2),d9(11680298,0.95));W.position.y=0.03,K.add(W)}else if(J.hat==="chef"){let W=new f(new T0(0.18,0.18,0.12,18),d9(16052714,0.9));W.position.y=0.16;let X=new f(new c0(0.22,18,12),d9(16052714,0.9));X.position.y=0.33,X.scale.y=0.75,K.add(W,X)}else{let W=new f(new c0(0.188,18,10,0,Math.PI*2,0,Math.PI/2.4),d9(2771594,0.9));K.add(W)}let H=[-1,1].map((W)=>{let X=new O0;X.position.set(W*0.11,0.86,0);let G=new f(new T0(0.1,0.09,0.84,10).translate(0,-0.42,0),d9(J.legs??2894389,0.9)),q=new f(new _0(0.13,0.12,0.28),d9(1971212,0.6));return q.position.set(0,-0.82,0.05),X.add(G,q),X}),Y=[-1,1].map((W)=>{let X=new O0;X.position.set(W*0.3,1.48,0);let G=new f(new T0(0.07,0.06,0.62,8).translate(0,-0.31,0),J.shirt),q=new f(new c0(0.065,10,8),Z);return q.position.y=-0.65,X.add(G,q),X});return Q.add($,K,...H,...Y),Q.traverse((W)=>{if(W.isMesh)W.castShadow=!0}),Object.assign(Q.userData,{head:K,arms:Y,legs:H,mouth:U}),Q.scale.setScalar(J.scale??1),Q}function H6(J,Q,Z,$={}){let[K,U]=J.userData.arms,H=Math.sin(Z*Math.PI*2/(Q8()*2)),Y=(X,G,q)=>X.rotation.set(G,0,q);switch(Q){case"down":Y(K,0.05,-0.12),Y(U,0.05,0.12);break;case"haul":Y(K,-1.1-H*0.45,-0.1),Y(U,-1.1+H*0.45,0.1);break;case"shrug":Y(K,-0.5,-1.1),Y(U,-0.5,1.1);break;case"point":Y(K,0.05,-0.12),Y(U,-1.55,0.05);break;case"up":Y(K,-0.2,-2.7-H*0.15),Y(U,-0.2,2.7+H*0.15);break;case"hips":Y(K,0.2,-0.6),Y(U,0.2,0.6);break;case"pull":Y(K,-1.3+H*0.2,-0.05),Y(U,-1.3+H*0.2,0.05);break;case"hush":Y(K,0.05,-0.12),Y(U,-2.3,0.6);break;case"wheel":Y(K,-1.2+Math.sin(Z*3)*0.25,-0.25),Y(U,-1.2-Math.sin(Z*3)*0.25,0.25);break}J.userData.head.rotation.set($.tilt??0,$.turn??0,Math.sin(Z*Math.PI/Q8())*0.06),J.userData.mouth.scale.y=0.4+($.sing??0)*(0.8+Math.abs(Math.sin(Z*17))*0.9);let W=$.walk??0;J.userData.legs.forEach((X,G)=>X.rotation.x=Math.sin(Z*7+G*Math.PI)*0.45*W)}function iF(){let J=new O0,Q=d9(15234107,0.4,{metalness:0.2}),Z=new f(new H8(0.09,0.14,6,12),Q);Z.rotation.x=0.4,Z.position.y=0.14;let $=new O0;$.position.set(0,0.3,0.05),$.add(new f(new c0(0.085,16,12),Q));let K=new f(new Z7(0.03,0.09,10),d9(15909198,0.5));K.rotation.x=Math.PI/2+0.5,K.position.set(0,-0.015,0.09);let U=new h0({color:7336191,toneMapped:!1});for(let W of[-1,1]){let X=new f(new c0(0.02,8,6),U);X.position.set(W*0.05,0.02,0.06),$.add(X)}$.add(K);let H=[-1,1].map((W)=>{let X=new O0;X.position.set(W*0.08,0.2,0);let G=new f(new _0(0.22,0.02,0.12).translate(W*0.11,0,0),d9(12866858,0.5));return X.add(G),X}),Y=new f(new _0(0.06,0.02,0.22).translate(0,0,-0.11),d9(2779824,0.5));return Y.position.set(0,0.06,-0.06),Y.rotation.x=0.5,J.add(Z,$,...H,Y),J.traverse((W)=>{if(W.isMesh)W.castShadow=!0}),J.userData={head:$,wings:H},J}class x5{canvas=Object.assign(document.createElement("canvas"),{width:1024,height:1280});texture=new G7(this.canvas);key="";constructor(){this.texture.colorSpace=F7,this.texture.anisotropy=8}show(J,Q){let Z=JSON.stringify([J,Q]);if(Z===this.key)return;this.key=Z;let $=this.canvas.getContext("2d");$.fillStyle="#ead9ac",$.fillRect(0,0,1024,1280);for(let H=0;H<2500;H++)$.fillStyle=`rgba(120,80,30,${f0(H)*0.06})`,$.fillRect(f0(H+3)*1024,f0(H+4)*1280,4,4);let K=$.createRadialGradient(512,640,300,512,640,900);K.addColorStop(0,"rgba(0,0,0,0)"),K.addColorStop(1,"rgba(90,50,10,.55)"),$.fillStyle=K,$.fillRect(0,0,1024,1280),$.fillStyle="#3a2410",$.font='italic 700 62px "Playfair Display", Georgia, serif',$.fillText(J,70,140),$.fillRect(70,170,884,4);let U=270;for(let H of Q)$.font='700 46px "JetBrains Mono", monospace',$.fillStyle=H.color??"#2a1a0c",$.fillText(H.text,70,U),U+=74;this.texture.needsUpdate=!0}}class qH{renderer;scene=new o7;camera=new Q7(38,1.7777777777777777,0.05,1500);film;sky=new tQ(700);sun=new d7(16777215,1);hemi=new M8(12572415,1718852,0.6);fill=new d7(16773344,0.6);ocean;ship=new O0;sail;sailBase;plank=new O0;helper;crates=[];barnacles;barnacleSpots=[];lanterns=[];lanternGlass=[];scroll=new x5;scrollMesh;splash;rings;rain;cap=UZ({shirt:d9(1911634,0.8),hat:"tricorn",beard:5913124,legs:15327951,scale:1.05});kevin=UZ({shirt:d9(16777215,0.9,{map:f5("#f2efe6","#1e3d7a")}),hat:"beanie",skin:15186070});bosun=UZ({shirt:d9(6965802,0.9),hat:"bandana",beard:2234383,skin:10119752,scale:1.12});cook=UZ({shirt:d9(16052714,0.9),hat:"chef",skin:12947306});jim=UZ({shirt:d9(16777215,0.9,{map:f5("#f2efe6","#a12a2a")}),hat:"beanie",beard:10512430,skin:14724742});parrot=iF();constructor(J){this.renderer=new W8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=LJ,this.renderer.toneMapping=K8,this.film=new QZ(this.renderer,this.scene,this.camera),this.scene.fog=new z8(10467016,0.012),this.scene.add(this.sky.mesh,this.sky.stars,this.hemi,this.sun,this.sun.target,this.fill,this.fill.target),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:1,far:80}),this.sun.shadow.bias=-0.0004,this.sun.shadow.normalBias=0.03;let Q=new F9(180,180,150,150);Q.rotateX(-Math.PI/2),this.ocean=new f(Q,new K9({color:1923952,roughness:0.22,metalness:0.1,flatShading:!0})),this.ocean.receiveShadow=!0,this.scene.add(this.ocean),this.buildShip(),this.scene.add(this.ship);let Z=260,$=new q9;$.setAttribute("position",new u9(new Float32Array(Z*3),3)),this.splash=new y7($,new m7({color:15398655,size:0.22,transparent:!0,depthWrite:!1})),this.splash.frustumCulled=!1,this.rings=new f(new aJ(0.8,1,48),new h0({color:15398655,transparent:!0,side:m9,depthWrite:!1})),this.rings.rotation.x=-Math.PI/2;let K=4000,U=new Float32Array(K*3);for(let Y=0;Y<K;Y++)U.set([(f0(Y)-0.5)*40,f0(Y+7000)*20,(f0(Y+9000)-0.5)*40],Y*3);let H=new q9;H.setAttribute("position",new u9(U,3)),this.rain=new y7(H,new m7({color:12110040,size:0.05,transparent:!0,opacity:0,depthWrite:!1})),this.rain.frustumCulled=!1,this.scene.add(this.splash,this.rings,this.rain,this.parrot)}buildShip(){let J=this.ship,Q=new _0(11,2.2,3.4,40,6,8),Z=Q.attributes.position;for(let E=0;E<Z.count;E++){let A=Z.getX(E),y=Z.getY(E),S=Z.getZ(E),b=S9((A-1.5)/4),e=S9((1.1-y)/2.2),v=(1-b*b*0.95)*(1-e*e*0.55);Z.setXYZ(E,A-(A<-4.5?(A+4.5)*0.2:0),y+b*b*0.5*(y>0?1:0.3),S*v)}Q.computeVertexNormals();let $=d9(16777215,0.75,{map:XH([110,66,38],[3,1])}),K=new f(Q,$);K.position.y=0.1,K.castShadow=K.receiveShadow=!0;let U=new f(Q.clone(),d9(14200928,0.5));U.scale.set(1.002,0.06,1.01),U.position.y=0.85;let H=new f(new F9(9.6,2.9),d9(16777215,0.8,{map:XH([170,130,85],[2,1])}));H.rotation.x=-Math.PI/2,H.position.set(-0.5,y9,0),H.receiveShadow=!0,J.add(K,U,H);let Y=d9(5913122,0.6);for(let E of[-1.45,1.45]){for(let[A,y]of E>0?[[-5.1,-1],[0.6,3.9]]:[[-5.1,3.9]]){let S=new f(new _0(y-A,0.08,0.08),Y);S.position.set((A+y)/2,y9+0.65,E),J.add(S)}for(let A=-5;A<=3.6;A+=0.8){if(E>0&&Math.abs(A- -0.2)<0.5)continue;let y=new f(new _0(0.07,0.65,0.07),Y);y.position.set(A,y9+0.32,E),y.castShadow=!0,J.add(y)}}let W=new f(new _0(2.6,0.6,3),d9(16777215,0.8,{map:XH([140,96,60],[1,1])}));W.position.set(-4,y9+0.3,0),W.castShadow=W.receiveShadow=!0,J.add(W);let X=new O0;X.position.set(-3,y9+1.45,0),X.rotation.y=Math.PI/2;let G=new f(new R7(0.42,0.04,8,24),Y);X.add(G);for(let E=0;E<8;E++){let A=new f(new T0(0.025,0.025,1.1),Y);A.rotation.z=E*Math.PI/8,X.add(A)}let q=new f(new _0(0.15,0.85,0.15),Y);q.position.set(-3,y9+1,0),J.add(X,q),J.userData.wheel=X;let N=new f(new _0(0.9,0.06,0.7),Y);N.position.set(-4.4,y9+1.45,0.6);let D=new f(new _0(0.1,0.85,0.1),Y);D.position.set(-4.4,y9+1.02,0.6),this.scrollMesh=new f(new F9(0.56,0.7),new K9({map:this.scroll.texture,roughness:0.9})),this.scrollMesh.rotation.x=-Math.PI/2,this.scrollMesh.rotation.z=Math.PI/2,this.scrollMesh.position.set(-4.4,y9+1.485,0.6),J.add(N,D,this.scrollMesh);let M=d9(6965802,0.6),V=new f(new T0(0.12,0.16,8.5),M);V.position.set(0.6,y9+4.25,0);let F=new f(new T0(0.09,0.12,6),M);F.position.set(-2.6,y9+3+0.6,0);let O=new f(new T0(0.5,0.4,0.4,16,1,!0),d9(5913122,0.7,{side:m9}));O.position.set(0.6,y9+7.2,0);for(let E of[y9+6.4,y9+2.2]){let A=new f(new T0(0.07,0.07,4.6),M);A.rotation.x=Math.PI/2,A.position.set(0.75,E,0),J.add(A)}let z=new F9(4.2,4,16,16);z.rotateY(Math.PI/2),this.sail=new f(z,d9(16777215,0.95,{map:nF,side:m9})),this.sail.position.set(0.85,y9+4.3,0),this.sail.castShadow=!0,this.sailBase=z.attributes.position.array.slice();let C=new f(new F9(0.9,0.55),d9(16777215,0.9,{side:m9,map:JQ(256,160,(E)=>{E.fillStyle="#111",E.fillRect(0,0,256,160),E.fillStyle="#f4f1ea",E.font='800 64px "JetBrains Mono", monospace',E.textAlign="center",E.fillText("LGTM",128,104)})}));C.position.set(0.15,y9+8.7,0),J.add(V,F,O,this.sail,C),J.userData.flag=C,this.helper=new f(new _0(0.42,0.22,0.22),new K9({color:3836506,emissive:2817914,emissiveIntensity:0.6,roughness:0.4})),this.helper.position.set(0.6,y9+0.4,0.2),J.add(this.helper);let R=new f(new _0(0.5,0.07,3.2).translate(0,0,1.6),d9(16777215,0.7,{map:JQ(128,512,(E)=>{E.fillStyle="#9a7048",E.fillRect(0,0,128,512);for(let A=0;A<30;A++)E.fillStyle="rgba(60,30,10,.25)",E.fillRect(0,f0(A)*512,128,2);E.save(),E.translate(64,256),E.rotate(Math.PI/2),E.fillStyle="rgba(30,15,5,.75)",E.font='700 30px "JetBrains Mono", monospace',E.textAlign="center",E.fillText("plank.ts · generated",0,10),E.restore()})}));R.castShadow=R.receiveShadow=!0,this.plank.position.set(-0.2,y9+0.05,1.4),this.plank.add(R),J.add(this.plank);let B=new _0(0.62,0.62,0.62),_=d9(16777215,0.8,{map:sF});for(let E=0;E<14;E++){let A=new f(B,_);A.castShadow=A.receiveShadow=!0;let y=E%5,S=Math.floor(E/5);A.userData.home=E7(2+y%3*0.66+(S===2?0.33:0),y9+0.31+S*0.62,-0.95+Math.floor(y/3)*0.66+(S?0.33:0)),A.rotation.y=(f0(E)-0.5)*0.25,this.crates.push(A),J.add(A)}let P=new k;for(let E=0;E<520;E++){let A=-4.4+f0(E)*8.8,y=-0.5+f0(E+1)*1.4,S=f0(E+2)>0.5?1:-1,b=S9((A-1.5)/4),e=S9((1.1-y)/2.2),v=1.7*(1-b*b*0.95)*(1-e*e*0.55);P.set(A,y+0.1+b*b*0.5*(y>0?1:0.3),S*(v+0.01)),this.barnacleSpots.push({p:P.clone(),n:E7(0,0,S),s:0.025+f0(E+3)*0.04})}this.barnacleSpots.sort((E,A)=>A.p.x-E.p.x+(f0(E.p.y)-0.5)*3),this.barnacles=new j9(new Z7(1,1.1,7),d9(11117204,0.95),this.barnacleSpots.length),this.barnacles.castShadow=!0,J.add(this.barnacles);for(let[E,A]of[[-4.9,-1.2],[-1.6,-1.3],[3.6,1.3]]){let y=new f(new c0(0.1,12,10),new h0({color:16760944,toneMapped:!1}));y.position.set(E,y9+(E<-4?1.75:1),A);let S=new Y8(16754768,0,9,1.6);S.position.copy(y.position),this.lanterns.push(S),this.lanternGlass.push(y),J.add(y,S)}for(let E of[this.cap,this.kevin,this.bosun,this.cook,this.jim])J.add(E)}flash(J){let Q=0;for(let Z of[I(34),J0(35,/know/i),I(36)+0.4,J0(39,/fell/i)])if(J>=Z)Q=Math.max(Q,Math.exp(-(J-Z)*9)*0.55);return J>=I(34)-0.3&&J<I(40)-0.6?Q:0}fade(J){return W9(n0(41)+0.4,q7(),J)}t=0;update(J){this.t=J;let Q=GH(J),Z=Q.name,$=Q.at,K=dF(Q),U=$0(J,$,K),H=this.camera,Y=this.film.look,W=lF(J),X=cF(J),G=1-W9(0.1,0.4,X),q=P7(J),N=this.sky.set(X,0.9);this.sun.position.copy(N).multiplyScalar(40),this.sun.intensity=j(0.05,2.4,W9(0.15,0.6,X))*(1-W*0.7),this.sun.color.setRGB(1,j(0.7,0.96,X),j(0.5,0.9,X)),this.hemi.intensity=j(0.25,1.1,X)*(1-W*0.4);let D=this.scene.fog;D.color.setRGB(j(0.03,0.62,X),j(0.04,0.72,X),j(0.08,0.8,X)).lerp(new Y0(0.12,0.14,0.17),W*0.7),D.density=0.01+W*0.025;let M=this.ocean.geometry.attributes.position,V=J*2.2;for(let d=0;d<M.count;d++){let D0=M.getX(d),s=M.getZ(d);M.setY(d,U6(D0+V,s,J,W))}M.needsUpdate=!0,this.ocean.geometry.computeVertexNormals(),this.ocean.material.color.setRGB(j(0.02,0.1,X),j(0.05,0.36,X),j(0.09,0.44,X)).lerp(new Y0(0.08,0.13,0.15),W*0.6);let F=$9($0(J,I(40)-0.3,n0(41)+0.5)),O=U6(V,0,J,W),z=U6(4+V,0,J,W),C=U6(-4+V,0,J,W),R=U6(V,1.6,J,W),B=U6(V,-1.6,J,W);this.ship.position.set(0,O*0.6-0.15-F*3.4,0),this.ship.rotation.set((R-B)/3.2*0.5+F*0.25,0,(z-C)/8*0.6-F*0.32),this.ship.userData.wheel.rotation.x=Math.sin(J*0.8)*0.4+(Z==="steer"||Z==="stern"?Math.sin(J*2.6)*1.2:0);let _=this.sail.geometry.attributes.position;for(let d=0;d<_.count;d++){let D0=this.sailBase[d*3+1],s=this.sailBase[d*3+2],G0=(1-(s/2.1)**2)*(1-(D0/2)**2);_.setX(d,G0*(0.55+q*0.08+W*Math.sin(J*9+s*2+D0)*0.12))}_.needsUpdate=!0,this.sail.geometry.computeVertexNormals();let P=this.ship.userData.flag;P.rotation.y=Math.sin(J*4)*0.25+W*Math.sin(J*13)*0.3,this.lanterns.forEach((d,D0)=>d.intensity=(G*2.2+W*1.2)*(0.85+Math.sin(J*11+D0*3)*0.08+Math.sin(J*23+D0)*0.05)),this.lanternGlass.forEach((d)=>d.material.color.setRGB(1,0.75,0.45).multiplyScalar(0.3+G*0.45+W*0.2)),this.crates.forEach((d,D0)=>{let s=d.userData.home,G0=I(2)-0.4+D0*0.12,X0=$0(J,G0,G0+0.55),c=X0<1?(1-X0)**2*7-Math.sin(X0*Math.PI)*0:Math.abs(Math.sin((J-G0-0.55)*9))*Math.exp(-(J-G0-0.55)*6)*0.15;d.position.set(s.x,s.y+c,s.z),d.visible=J>G0});let E=$9($0(J,J0(15,/pulled/i)-0.1,J0(15,/out/i)+0.3));this.helper.position.set(0.6+E*0.4,y9+0.4+E*0.5,0.2+E*0.9),this.helper.rotation.set(E*0.8,E*1.4,0),this.helper.material.emissiveIntensity=0.6+(Z==="bosun"?q*1.2:0);let A=NH(J),y=new x9,S=new A8,b=E7(0,1,0);if(this.barnacleSpots.forEach((d,D0)=>{let s=S9((A*this.barnacleSpots.length-D0)/25),G0=d.s*B9(s);S.setFromUnitVectors(b,d.n),y.compose(d.p.clone().addScaledVector(d.n,G0*0.4),S,E7(G0,G0,G0)),this.barnacles.setMatrixAt(D0,y)}),this.barnacles.instanceMatrix.needsUpdate=!0,this.crewAt(J,Z),J<I(12)){let d=[{text:"+ function doTheThing(x) {"},{text:"+   return helpers.help(x)"},{text:"+     ?? retry(() => retry(() =>"},{text:"+          factory.make(String(x))))"},{text:"+ }"},{text:"+ // what does this do"},{text:"+ // (it helps)"},{text:"  ... 3,993 more lines",color:"#7a5a3a"}];this.scroll.show("PR #1 · the diff",d.slice(0,1+Math.floor($0(J,I(6)-0.3,n0(7))*d.length)))}else{let d=[{text:"$ git blame doTheThing"},{text:"author:    Claude"},{text:"approved:  Cap'n",color:J>I(31)?"#8a1010":void 0},{text:"review:    L-G-T-M",color:J>J0(31,/^L/)?"#8a1010":void 0},{text:`time:      ${J>J0(31,/nine/i)?"9 seconds":"…"}`,color:J>J0(31,/nine/i)?"#8a1010":void 0},{text:"tell crew: no",color:"#7a5a3a"}];this.scroll.show("who approved it?",d.slice(0,J<I(30)?1:2+Math.floor($0(J,I(30),n0(32))*4)))}let e=-99,v=E7();for(let d of u$())if(J>=d.splash-0.05&&d.splash>e)e=d.splash,v=this.plankEnd();let l=J-e,U0=this.splash.geometry.attributes.position;for(let d=0;d<U0.count;d++){let D0=f0(d)*Math.PI*2,s=0.4+f0(d+1)*1.8,G0=3+f0(d+2)*5;U0.setXYZ(d,v.x+Math.cos(D0)*s*l*1.4,v.y+G0*l-4.9*l*l,v.z+Math.sin(D0)*s*l*1.4)}U0.needsUpdate=!0,this.splash.visible=l>=0&&l<1.6,this.splash.material.opacity=1-$0(l,0.6,1.6),this.rings.visible=l>=0&&l<3,this.rings.position.set(v.x,v.y+0.05,v.z),this.rings.scale.setScalar(0.3+l*2.2),this.rings.material.opacity=0.8*(1-$0(l,0,3));let i=this.rain.geometry.attributes.position;for(let d=0;d<i.count;d++)i.setY(d,((f0(d+7000)*20-J*14)%20+20)%20);i.needsUpdate=!0,this.rain.material.opacity=W9(0.5,0.9,W)*0.6;let r=(d,D0,s=38)=>({pos:d,look:D0,fov:s}),u=this.ship.position.y,h=this.cap.getWorldPosition(E7()),H0=this.kevin.getWorldPosition(E7());Object.assign(Y,{focus:0,aperture:0.002,bloom:0.4,exposure:1,warmth:0.2,saturation:1.05,contrast:1.05,vignette:0.5,grain:0.06,aberration:0.4,halation:0.4,letterbox:1,leak:0,fade:0}),Y.shadows.setRGB(0.42,0.5,0.58),Y.highlights.setRGB(0.6,0.54,0.44);let E0=0.5;switch(Z){case"title":G9(H,r([22,7,18],[0,3,0],34),r([17,5.5,14],[0,3,0],34),U),Object.assign(Y,{warmth:0.35,leak:0.25});break;case"sail":G9(H,r([9,0.9,6.5],[0.5,4.5+u,0],40),r([7.2,1.2,5.2],[0.5,5+u,0],44),U),Y.warmth=0.3;break;case"crates":G9(H,r([7.5,4.8,4.5],[2.4,1.6+u,-0.6],36),r([6.4,4,3.4],[2.4,1.6+u,-0.6],36),U),Y.focus=5.5,Y.aperture=0.003;break;case"green":case"lgtm":G9(H,r([-1.2,3.4+u,2.6],[h.x,h.y+1.6,h.z],32),r([-1.6,3.2+u,2.2],[h.x,h.y+1.6,h.z],30),U),Y.focus=3.2,Y.aperture=0.006;break;case"diff":G9(H,r([-4,3.5+u,1.6],[-4.4,2.7+u,0.6],30),r([-4.2,3.2+u,1.1],[-4.4,2.6+u,0.6],28),U),Y.focus=1,Y.aperture=0.01,E0=0.3;break;case"mast":G9(H,r([-1,1.9+u,1.6],[h.x,h.y+1.9,h.z],34),r([-1.4,1.7+u,1.3],[h.x,h.y+1.9,h.z],30),U),E0=1.1;break;case"ask":case"ask2":{let d=Z==="ask"?1:-1;G9(H,r([1.6,3.8+u,d*6.2],[-1.2,2.2+u,0],36),r([1,3.4+u,d*5.2],[-1.2,2.2+u,0],36),U),Y.warmth=J>I(34)-0.3?-0.35:0.25,E0=J>I(34)-0.3?1.4:0.7;break}case"shrug":G9(H,r([0.6,2.7+u,3.6],[-0.4,2.3+u,0.2],34),r([0.4,2.6+u,3.1],[-0.4,2.3+u,0.2],32),U),Y.focus=3.4,Y.aperture=0.005,Y.warmth=J>I(34)?-0.35:0.25;break;case"plank":case"fell":{let d=this.plankEnd();G9(H,r([d.x+3.5,0.9,d.z+6.5],[d.x-0.5,1.6+u,d.z-0.8],36),r([d.x+2.6,0.8,d.z+5.4],[d.x-0.4,1.2+u,d.z-0.6],38),U),Y.warmth=J>I(34)-0.3?-0.35:0.25,E0=0.8;break}case"kevin":G9(H,r([2.8,3+u,4.6],[(h.x+H0.x)/2,2.6+u,0.3],36),r([2.4,2.9+u,4.1],[(h.x+H0.x)/2,2.6+u,0.3],34),U),Y.focus=3.5,Y.aperture=0.005;break;case"bosun":case"pulled":G9(H,r([1.6,2.4+u,4.2],[0.8,1.8+u,0.4],34),r([1.4,2.6+u,3.6],[0.8,Z==="pulled"?3.4+u:1.9+u,0.4],38),U),Y.focus=4.4,Y.aperture=0.004;break;case"cook":case"great":{let d=this.parrot.getWorldPosition(E7()),D0=this.cook.getWorldPosition(E7());G9(H,r([d.x+2.2,d.y+0.3,d.z+1.4],[(d.x+D0.x)/2,d.y-0.1,(d.z+D0.z)/2],32),r([d.x+1.4,d.y+0.15,d.z+0.9],[d.x,d.y,d.z],Z==="great"?24:30),U),Y.focus=Z==="great"?1.7:2.4,Y.aperture=0.008,Y.exposure=1.15;break}case"barnacles":G9(H,r([5,0.5,4.2],[3,0.6+u,1.2],36),r([2.5,0.4,3.6],[1,0.6+u,1.4],36),U),Y.focus=3.2,Y.aperture=0.003,Y.warmth=0.1,Y.exposure=1.45;break;case"hull":G9(H,r([4,0.7,4.4],[2,0.6+u,1.4],40),r([-4,0.7,4.4],[-5,0.6+u,1.4],40),U),Y.warmth=0;break;case"stern":G9(H,r([8,3,-7.5],[-1,1.4+u,0],36),r([6.5,2.4,-6],[-1,1.4+u,0],34),U),Y.warmth=-0.1;break;case"steer":G9(H,r([-1.5,3.3+u,-2.4],[h.x,h.y+1.6,h.z],32),r([-1.8,3.1+u,-2],[h.x,h.y+1.6,h.z],30),U),Y.focus=2.6,Y.aperture=0.006,E0=1.4,Y.warmth=-0.15;break;case"quarters":case"crew":G9(H,r([-1.3,4.1+u,3.4],[-4.2,3.2+u,0.5],38),r([-1.6,4+u,3],[-4.2,3.2+u,0.5],36),U),Object.assign(Y,{warmth:0.55,exposure:1.6,bloom:0.45,halation:0.6,saturation:0.9}),Y.focus=3.4,Y.aperture=0.006,E0=0.35;break;case"blame":G9(H,r([-4.05,3.45+u,1.45],[-4.4,2.65+u,0.6],30),r([-4.2,3.25+u,1.05],[-4.4,2.65+u,0.6],26),U),Object.assign(Y,{warmth:0.5,exposure:1,bloom:0.3,halation:0.4}),Y.focus=0.9,Y.aperture=0.01,E0=0.25;break;case"heard":G9(H,r([3.8,3.1+u,-4.8],[0.7,2.7+u,-0.8],30),r([3.5,3+u,-4.4],[0.7,2.7+u,-0.8],27),U),Object.assign(Y,{warmth:0.3,exposure:1.35,saturation:0.85}),Y.focus=5,Y.aperture=0.004;break;case"built":{let d=this.plankEnd();G9(H,r([d.x+1.2,d.y+1.4,d.z+1],[d.x-0.2,d.y,d.z-1.2],34),r([d.x+0.8,d.y+1,d.z+0.6],[d.x-0.2,d.y,d.z-1.2],30),U),Y.focus=1.6,Y.aperture=0.007,Y.warmth=-0.35,Y.exposure=2.1,E0=1.2;break}case"bottom":G9(H,r([16,3.5,13],[0,0.5,0],34),r([13,2.5,11],[0,0,0],34),U),Object.assign(Y,{warmth:-0.2,saturation:0.8});break;case"end":{let d=this.parrot.getWorldPosition(E7());G9(H,r([d.x+2.8,d.y+0.4,d.z+3.4],[d.x,d.y,d.z],30),r([d.x+1.8,d.y+0.2,d.z+2.4],[d.x,d.y,d.z],26),U),Object.assign(Y,{warmth:0.15,saturation:0.9}),Y.focus=3,Y.aperture=0.004;break}}if(W>0.6)Object.assign(Y,{saturation:0.75,contrast:1.15,exposure:1.2,aberration:0.8});if(G>0.5&&Z!=="quarters"&&Z!=="crew"&&Z!=="blame"&&Z!=="heard")Y.exposure=Math.max(Y.exposure,1.25);if(Z==="title")Y.fade=1-W9(0,1.2,J);let L0=H.getWorldDirection(E7());this.fill.position.copy(H.position).add(E7(0,1.5,0)),this.fill.target.position.copy(H.position).addScaledVector(L0,6),this.fill.intensity=(0.25+X*0.55)*(1-W*0.3),x$(H,J,E0+W*0.8),H.position.y=Math.max(H.position.y,U6(H.position.x+V,H.position.z,J,W)+0.35),this.rain.position.set(H.position.x,0,H.position.z)}plankEnd(){return this.plank.localToWorld(E7(0,0.05,3.1))}crewAt(J,Q){let Z=u$(),$=(F)=>F.some((O)=>J>=I(O)&&J<=n0(O))?1:0,K=[8,9,10,11,18,19,20,21,34,35,36,37,38,39].some((F)=>J>=I(F)-0.2&&J<=n0(F)+0.2),U=[9,19,35].some((F)=>J>=I(F)-0.1&&J<=n0(F)+0.4),H=Math.sin(J*Math.PI/Q8())*0.07,Y=(F,O,z)=>{if(J>=O.splash+0.1)return F.visible=!1,!0;if(F.visible=!0,J<O.walk)return!1;let C=this.plank.position.z,R=this.plank.position.x,B=$0(J,O.walk,O.drop),_=Math.max(z.z,0.75),P=S9(B/0.1),E=S9((B-0.1)/0.2),A=S9((B-0.3)/0.1),y=S9((B-0.4)/0.6),S=j(z.x,R,W9(0,1,E)),b=j(j(z.z,_,W9(0,1,P)),C,W9(0,1,A))+y*2.9,e=j(z.y,y9+0.05,W9(0,1,E)),v=Math.max(0,J-O.drop),l=Math.min(v*v*4.9+v*0.8,y9+3);return F.position.set(S,e-l,b+v*0.6),F.rotation.set(v*2.2,E>0&&E<1?Math.sign(R-z.x)*Math.PI/2:0,0),H6(F,v>0?"up":"down",J,{walk:v>0?0:1,tilt:0.3}),!0},W=E7(-3.5,y9+0.6,0);if(!Y(this.cap,Z[2],W)&&this.cap.visible){let F=J>=I(30)-1&&J<I(34)-0.3;this.cap.position.copy(F?E7(-4.5,y9+0.6,-0.1):Q==="green"||Q==="lgtm"||Q==="diff"?E7(-4.1,y9+0.6,0):E7(-3.5,y9+0.6,0)),this.cap.rotation.set(0,F?Math.PI*0.3:Q==="diff"||Q==="green"||Q==="lgtm"?Math.PI*0.2:Math.PI/2,H*0.5);let O=Q==="mast"?"point":Q==="steer"||Q==="stern"?"wheel":Q==="lgtm"?"point":K?"point":Q==="crew"?"hush":Q==="quarters"?"hips":"down";H6(this.cap,O,J,{sing:Q==="mast"||K?1:0,tilt:Q==="diff"?0.45:Q==="mast"?-0.25:0})}let G=J>=Z[2].drop;if(!G){this.cap.updateMatrixWorld(!0);let F=this.cap.localToWorld(E7(0.28,1.62,0));this.parrot.position.copy(F),this.parrot.rotation.set(0,this.cap.rotation.y+Math.sin(J*0.7)*0.4,0)}else{let F=J-Z[2].drop,O=this.plankEnd();this.parrot.position.set(O.x+Math.sin(J*0.8)*0.6,Math.max(O.y,1.2)+1.2+Math.min(F,2)*0.6+Math.sin(J*3)*0.1,O.z-0.4),this.parrot.rotation.set(0,Math.PI/2+Math.sin(J*0.6)*0.5,0)}let q=G?Math.sin(J*22)*0.9:Q==="great"||Q==="end"?Math.sin(J*16)*0.5:0;this.parrot.userData.wings.forEach((F,O)=>F.rotation.z=(O?-1:1)*(0.2+q));let N=[17,41].some((F)=>J>=J0(F,/great/i)-0.05&&J<=n0(F));if(this.parrot.userData.head.rotation.set(N?-0.35+Math.sin(J*20)*0.15:0,Math.sin(J*1.3)*0.4,0),this.parrot.scale.setScalar(Q==="end"||Q==="bottom"?1.6:1),this.kevin.position.set(0.65,y9,0.85),this.kevin.rotation.set(0,-Math.PI/2+0.3,H),H6(this.kevin,U?"shrug":Q==="kevin"?"hips":Q==="heard"?"hush":"haul",J,{sing:$([12,13])||(K?1:0),tilt:Q==="heard"?-0.15:0}),Q==="heard")this.kevin.position.set(0.5,y9,-0.85);if(Q==="quarters"||Q==="blame"||Q==="crew")this.kevin.position.set(-4,y9+0.6,1.3),this.kevin.rotation.set(0,-2.8,0),H6(this.kevin,Q==="blame"?"point":"down",J,{sing:$([31]),tilt:0.15});if(this.bosun.position.set(1.2,y9,0.55),this.bosun.rotation.set(0,-Math.PI*0.75,H),H6(this.bosun,Q==="pulled"?"pull":U?"shrug":Q==="bosun"?"point":"haul",J,{sing:K?1:0}),Q==="heard")this.bosun.position.set(0.85,y9,-0.7),this.bosun.rotation.y=-Math.PI*0.6;let D=E7(-1.4,y9,-0.6);if(!Y(this.cook,Z[1],D)&&this.cook.visible)this.cook.position.copy(Q==="cook"||Q==="great"?E7(-2.5,y9+0.6,-1):D),this.cook.rotation.set(0,Q==="cook"||Q==="great"?-Math.PI*0.6:Math.PI*0.25,H),H6(this.cook,U?"shrug":Q==="cook"?"point":"haul",J,{sing:$([16])||(K?1:0)});let M=E7(-0.8,y9,0.4);if(!Y(this.jim,Z[0],M)&&this.jim.visible)this.jim.position.copy(M),this.jim.rotation.set(0,Math.PI*0.4,H),H6(this.jim,U?"shrug":"haul",J,{sing:K?1:0});let V=W9(J0(39,/fell/i)-0.3,J0(39,/fell/i),J);this.plank.rotation.x=V*0.5}render(){this.film.render(this.t)}}var oF=/^(plank|splash!|splash|overboard|fell|bottom|know!|know|don't|nobody|barnacle|barnacles|slop|true|harder)$/,aF=/^(function\?|function|a-i|claude|claude,|helper|helper"|retry|factory|string|date|test|diff|p-r|lines|l-g-t-m!|l-g-t-m\.)$/,rF=/^(cap'n|cap'n!|kevin|kevin,|bosun|cook|crew|ten|faster|faster!|heave|ho!|nine|load-bearing|load-bearing!|great|question!|question!")$/,h5={title:"Can You Explain That Function?",fonts:['400 100px "Pirata One"','italic 700 60px "Playfair Display"','700 20px "JetBrains Mono"','900 100px "Inter"','400 100px "Anton"'],overlays:()=>`
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
  <div class="ov bubble big" data-show="W41:great-0.05|E41+1.2" data-at="W41:great-0.05">Great question!</div>`,endAt:()=>n0(41)+1.4,words:{hot:oF,ice:aF,gold:rF},hide:/^(whispered)$/,hud:(J,Q)=>{let Z=u$().filter(($)=>J>=$.splash).length;return{left:`explain that function &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`crew aboard <span class="ice">${5-Z}</span> &nbsp;·&nbsp; functions explained <b>0</b> &nbsp;·&nbsp; hull ${Math.round(NH(J)*100)}% barnacle`}},shots:m$,shotAt:GH,world:(J)=>{let Q=new qH(J);return{update:(Z)=>Q.update(Z),render:()=>Q.render(),flash:(Z)=>Q.flash(Z),fade:(Z)=>Q.fade(Z)}}};var FH=[["witness","can I get a witness"],["greenwash","green is just a color"],["sign","can't comprehend"],["aisle","who looked in?"],["read","read the diff!"]];function XZ(){let J=(Q,Z,$)=>FH.slice(0,Z).map(([K,U],H)=>({name:K,label:U,section:$,at:I(Q+H)-0.2}));return[{name:"exterior",at:0,label:"sunday morning",section:"spoken"},{name:"pulpit",at:J0(0,/^says/i)-0.1,label:"the good book",section:"spoken"},{name:"shipit",at:I(1)-0.3,label:"ship it!",section:"spoken"},{name:"who",at:I(2)-0.3,label:"who read the diff?",section:"spoken"},{name:"scroll",at:I(3)-0.3,label:"four thousand lines",section:"verse 1"},{name:"button",at:I(4)-0.2,label:"eleven seconds",section:"verse 1"},{name:"nine",at:I(5)-0.2,label:"line nine hundred",section:"verse 1"},{name:"greenbtn",at:I(6)-0.2,label:"the button was green",section:"verse 1"},{name:"devil",at:I(7)-0.2,label:"the devil's in the diff",section:"pre-chorus"},{name:"nobody",at:J0(8,/^nobody/i)-0.5,label:"ain't nobody looking",section:"pre-chorus"},...J(9,5,"chorus"),{name:"loaf",at:I(14)-0.6,label:"a little slop",section:"verse 2"},{name:"commits",at:I(15)-0.2,label:"the repo stunk",section:"verse 2"},{name:"candles",at:I(16)-0.2,label:"cleaned up some flaky tests",section:"verse 2"},{name:"laptop",at:I(18)-0.2,label:"explain this function",section:"verse 2"},{name:"bot",at:I(20)-0.2,label:"the bot said amen",section:"verse 2"},{name:"fire",at:I(21)-0.2,label:"prod's on fire",section:"verse 2"},...J(22,5,"chorus"),{name:"tablets",at:I(27)-0.6,label:"the commandments",section:"bridge"},{name:"devil",at:I(32)-0.2,label:"the devil's in the diff",section:"pre-chorus"},...J(33,3,"final chorus"),{name:"sermon",at:I(36)-0.2,label:"written with claude",section:"final chorus"},{name:"deadpan",at:I(37)-0.3,label:"it sounded so confident",section:"spoken"},{name:"lgtm",at:I(38)-0.3,label:"l-g-t-m",section:"choir"},{name:"pray",at:I(39)-0.6,label:"let us pray",section:"outro"},{name:"approved",at:I(40)-0.2,label:"amen. approved.",section:"outro"},{name:"end",at:n0(40)+1.4,label:"the end",section:"outro"}]}var OH=null,MH=(J)=>{let Q=OH??=XZ(),Z=Q[0];for(let $ of Q)if($.at<=J)Z=$;return Z},tF=(J)=>{let Q=OH??=XZ();return Q[Q.indexOf(J)+1]?.at??q7()},u5=new Y0(16051419);var ZQ=12071482;var HZ=13933114,DH=8015662,eF=6965900,g5={day:[9418200,15918792,10337146],pray:[4934266,15771752,6969962],approved:[4934266,15771752,6969962],end:[4934266,15771752,6969962],tablets:[7176090,15980960,11770486],button:[14865596,16051419,14272424],greenbtn:[14082756,16051419,13228208],loaf:[15259320,16181970,14271136],commits:[14146758,15854808,12896685],candles:[3026767,7032671,2761779],fire:[2040640,8010282,2103848]},WZ=(()=>{let J=new c6(new Uint8Array([90,90,90,255,170,170,170,255,255,255,255,255]),3,1);return J.minFilter=J.magFilter=U8,J.needsUpdate=!0,J})(),p5=new Map,P9=(J)=>{let Q=p5.get(J);if(!Q)p5.set(J,Q=new kJ({color:J,gradientMap:WZ}));return Q},v8=(J,Q=1)=>new h0({color:J,transparent:Q<1,opacity:Q,depthWrite:Q>=1}),E9=(J,Q,Z=0,$=0,K=0)=>{let U=new f(J,Q);return U.position.set(Z,$,K),U},T9=(J,Q,Z,$,K=0,U=0,H=0)=>E9(new _0(J,Q,Z),P9($),K,U,H);function QQ(J,Q,Z){let $=document.createElement("canvas");$.width=J,$.height=Q,Z($.getContext("2d"));let K=new G7($);return K.colorSpace=F7,K.anisotropy=4,K}var w7=new k9,NJ=(J=0,Q=0,Z=0)=>new k(J,Q,Z),JO=new T0(0.075,0.09,1,8).translate(0,0.5,0),QO=new k(0,1,0);function d$(J,Q){let Z=new O0,$=Q.skin??[15254688,13012578,9263675,15782582,7029808][Math.floor(M0(Q.seed)*5)];if(Z.add(E9(new T0(0.24,0.5,1.35,14),P9(J),0,0.68,0)),Q.stole)for(let Y of[-1,1])Z.add(T9(0.1,0.9,0.05,Q.stole,Y*0.13,0.85,0.32));let K=Q.robot?T9(0.42,0.4,0.4,9081500,0,1.6,0):E9(new c0(0.23,16,12),P9($),0,1.58,0);if(Q.robot){let Y=E9(new _0(0.28,0.07,0.02),v8(10412154),0,0.02,0.21);K.add(Y,E9(new T0(0.015,0.015,0.25),P9(9081500),0,0.32,0),E9(new c0(0.05),v8(ZQ),0,0.46,0)),Z.userData.extra=Y}Z.add(K);let U=[-1,1].map((Y)=>{let W=E9(new c0(0.09,10,8),P9(Q.robot?9081500:$));return Z.add(W),W}),H=[0,1].map(()=>{let Y=new f(JO,P9(Q.robot?9081500:J));return Z.add(Y),Y});return Object.assign(Z.userData,{head:K,hands:U,arms:H,seed:Q.seed}),Z}function YZ(J,Q,Z,$=0.05,K=0){let{head:U,hands:H,arms:Y,seed:W}=J.userData;J.rotation.z=Math.sin(Q*Math.PI*1.78+W)*$,U.rotation.x=K*0.6,H.forEach((X,G)=>{let q=G?1:-1,N=S9(Z-M0(W+G)*0.15);X.position.set(q*j(0.36,0.5,N),j(0.95,2.15,$9(N))-K*0.1,j(0.3,0.12,N)+K*0.15),m5(Y[G],q,X.position)})}function m5(J,Q,Z){let $=NJ(Q*0.24,1.3,0.05),K=Z.clone().sub($);J.position.copy($),J.quaternion.setFromUnitVectors(QO,K.clone().normalize()),J.scale.set(1,K.length(),1)}function ZO(J){for(let Q of U7){if(Q.words[0].s>J+0.5)break;for(let Z of Q.words)if(Z.backing&&J>=Z.s-0.08&&J<=Z.e+0.7)return W9(Z.s-0.08,Z.s+0.12,J)}return 0}var $O={uniforms:{tDiffuse:{value:null},res:{value:new q0(1920,1080)},paper:{value:u5.clone()},shotSeed:{value:0},boil:{value:0},reveal:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
    }`};class RH{renderer;scene=new o7;camera=new Q7(40,1.7777777777777777,0.1,500);composer;paint;sky;hemi=new M8(16774368,9075302,1.6);sun=new d7(16773336,1.9);glowLight=new Y8(16756832,0,18,1.4);interior=new O0;windows=[];choir=[];robot;preacher;book;flock=[];scroll;scrollTex;roll;glass;devil=new O0;laptop=new O0;screen;screens={};exterior=new O0;churchWindows=[];button=new O0;cap;loaf=new O0;dough;slop;commits=new O0;cards=[];fumes=[];candles=new O0;flames;flameOrder=[];candlePos=[];fire=new O0;fireFlames;leds;smoke=[];kneeler;tablets=new O0;tabletTex=[];tabletShown=-1;rays=[];constructor(J){this.renderer=new W8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=u5.clone(),this.composer=new S8(this.renderer),this.composer.addPass(new j8(this.scene,this.camera)),this.composer.addPass(new k8),this.paint=new K6($O),this.composer.addPass(this.paint),this.sun.position.set(-6,14,8),this.scene.add(this.hemi,this.sun,this.glowLight),this.buildSky(),this.buildInterior(),this.buildExterior(),this.buildButton(),this.buildLoaf(),this.buildCommits(),this.buildCandles(),this.buildFire(),this.buildTablets(),this.scene.add(this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets)}buildSky(){this.sky=new f(new c0(300,32,16),new v9({side:B7,depthWrite:!1,uniforms:{top:{value:new Y0},horizon:{value:new Y0},bottom:{value:new Y0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; varying vec3 vDir;
        void main() { float y = vDir.y;
          vec3 c = y > 0. ? mix(horizon, top, pow(smoothstep(0., .7, y), .8)) : mix(horizon, bottom, smoothstep(0., .25, -y));
          gl_FragColor = vec4(c, 1.); }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildInterior(){let J=this.interior;J.add(T9(18,0.2,32,13214571,0,-0.1,-3)),J.add(T9(2.4,0.02,23,ZQ,0,0.01,0.5)),J.add(T9(0.3,13,32,15721416,-9,6.5,-3),T9(0.3,13,32,15721416,9,6.5,-3)),J.add(T9(18,13,0.3,15326400,0,6.5,-19.2),T9(18,13,0.3,15326400,0,6.5,12.6)),J.add(T9(2.6,4.2,0.1,DH,0,2.1,12.4)),J.add(T9(18,0.8,8,10119742,0,0.4,-15));let Q=(D)=>QQ(256,512,(M)=>{M.beginPath(),M.moveTo(8,504),M.lineTo(8,128),M.arc(128,128,120,Math.PI,0),M.lineTo(248,504),M.closePath(),M.clip();let V=["#3a5aa8","#b8323a","#d49a3a","#4f8a3c","#6a4a8c","#e7c46a"];for(let F=0;F<70;F++)M.fillStyle=V[Math.floor(M0(D+F)*V.length)],M.fillRect(Math.floor(M0(D+F*3)*6)*43,Math.floor(M0(D+F*7)*12)*43,43,43);M.strokeStyle="#2b2633",M.lineWidth=6;for(let F=0;F<=12;F++)M.beginPath(),M.moveTo(0,F*43),M.lineTo(256,F*43+(F%2?12:-12)),M.stroke();for(let F=0;F<=6;F++)M.beginPath(),M.moveTo(F*43,0),M.lineTo(F*43,512),M.stroke();M.lineWidth=14,M.stroke(new Path2D("M8 504 L8 128 A120 120 0 0 1 248 128 L248 504 Z"))}),Z=(D,M,V)=>{let F=new f(new F9(M,V),new h0({map:D,transparent:!0,alphaTest:0.1}));return this.windows.push(F),F};for(let[D,M]of[-5,0,5].entries()){let V=Z(Q(D*11),2.4,4.8);V.position.set(M,M===0?8.6:7.8,-19),J.add(V)}for(let D of[-1,1])for(let[M,V]of[-9,-2,5].entries()){let F=Z(Q(40+M*13+D*5),2,4);F.position.set(D*8.8,6,V),F.rotation.y=-D*Math.PI/2,J.add(F)}let $=new O0;$.add(T9(0.35,2.6,0.12,HZ),T9(1.5,0.35,0.12,HZ,0,0.45,0)),$.position.set(0,4.6,-18.9),J.add($);for(let D of[-1,1])for(let M=0;M<7;M++){let V=3+Math.sin(M*0.6)*1.3+M*0.35;J.add(E9(new T0(0.16,0.16,V,10),P9(14201434),D*(5.4+M*0.42),0.8+V/2,-18.6))}for(let D=0;D<9;D++){let M=-8+D*2.1;for(let V of[-1,1]){J.add(T9(5,0.18,0.8,9067058,V*3.9,0.55,M),T9(5,1,0.14,8014890,V*3.9,0.95,M+0.45));for(let F=0;F<3;F++){if(M0(D*7+F+V*31)<0.25)continue;let O=D*10+F+(V>0?500:0),z=[3824296,6982218,12088154,8022682,13214282,5929610][Math.floor(M0(O+2)*6)],C=d$(z,{seed:O});C.scale.setScalar(0.82),C.position.set(V*(2.2+F*1.5+M0(O)*0.3),0.18,M+0.1),C.rotation.y=Math.PI;let R=E9(new F9(0.16,0.26),v8(14216447));R.position.set(0,1.05,0.42),R.rotation.x=-0.9,C.add(R),J.add(C),this.flock.push({f:C,phone:R})}}}for(let D=0;D<3;D++){J.add(T9(13,0.45,1.1,9067574,0,1.02+D*0.45,-15.6-D*1.1));for(let M=0;M<7;M++){let V=900+D*10+M,F=D===0&&M===5,O=d$(eF,{stole:HZ,seed:V,robot:F});if(O.position.set(-4.8+M*1.6+D%2*0.4,1.25+D*0.45,-15.6-D*1.1),J.add(O),this.choir.push(O),F)this.robot=O}}this.preacher=d$(2301994,{stole:ZQ,seed:77,skin:9263675}),this.preacher.position.set(0,0.8,-12.9),this.book=T9(0.5,0.68,0.14,3877410),this.book.add(T9(0.46,0.62,0.15,15258522,0.03,0,0)),this.preacher.add(this.book),J.add(this.preacher);let K=new O0;K.add(T9(1.5,1.35,0.9,8014890,0,0.68,0),T9(1.7,0.08,1,6175264,0,1.4,-0.05)),K.add(T9(0.6,0.5,0.02,ZQ,0,0.8,0.46)),K.position.set(0,0.8,-12),J.add(K),this.laptop.add(T9(0.8,0.04,0.55,10133672,0,0,0));let U=T9(0.8,0.52,0.03,10133672,0,0.26,-0.27);U.rotation.x=-0.25,this.screen=new f(new F9(0.74,0.46),new h0({color:16777215})),this.screen.position.set(0,0,-0.02),this.screen.rotation.y=Math.PI,U.add(this.screen),U.rotation.y=0,this.laptop.add(U),this.laptop.position.set(0,2.25,-12.05),this.laptop.rotation.y=0,J.add(this.laptop);let H=(D)=>QQ(1024,640,(M)=>{M.fillStyle="#f6f1e6",M.fillRect(0,0,1024,640),M.fillStyle="#c96442",M.fillRect(0,0,1024,70),M.font="700 40px 'JetBrains Mono', monospace",M.fillStyle="#fff",M.fillText("claude",30,50),M.font="500 38px 'JetBrains Mono', monospace",D.forEach(([V,F],O)=>{M.fillStyle=V,M.fillText(F,34,140+O*66)})});this.screens.explain=H([["#c96442","> explain this function"],["#2b2633","This function elegantly"],["#2b2633","orchestrates a robust,"],["#2b2633","scalable synergy of..."],["#8a8494","(pasted back in, unread)"]]),this.screens.sermon=H([["#c96442","> write me a sermon about"],["#c96442","  reading the diff"],["#2b2633","Church! The Good Book says,"],["#2b2633",'"The A-I wrote it, the'],["#2b2633",'tests are green." ...']]),this.scrollTex=QQ(512,2048,(D)=>{D.fillStyle="#fbf7ee",D.fillRect(0,0,512,2048);for(let M=0;M<64;M++){let V=M0(M*3.3)<0.08;D.fillStyle=V?"#f3c9c4":"#d3ebc8",D.fillRect(0,M*32,512,30),D.fillStyle=V?"#b8323a":"#4f8a3c",D.fillRect(10,M*32+12,14,6),D.fillStyle="#2b2633";let F=40+Math.floor(M0(M)*4)*26;for(let O=0;O<4;O++){let z=30+M0(M*9+O)*110;if(F+z>500)break;D.fillRect(F,M*32+11,z,8),F+=z+18}}}),this.scrollTex.wrapT=m8,this.scroll=new f(new F9(2.2,1),new kJ({map:this.scrollTex,gradientMap:WZ})),this.scroll.rotation.x=-Math.PI/2,this.roll=E9(new T0(0.32,0.32,2.3,18),P9(16183264)),this.roll.rotation.z=Math.PI/2,J.add(this.scroll,this.roll),this.glass=new O0,this.glass.add(E9(new R7(0.42,0.05,10,32),P9(3877410))),this.glass.add(E9(new T7(0.4,32),v8(13625074,0.25)));let Y=E9(new T0(0.05,0.06,0.7),P9(3877410),0,-0.75,0);this.glass.add(Y),this.glass.rotation.x=-Math.PI/2+0.25,J.add(this.glass);let W=P9(ZQ),X=E9(new c0(0.32,16,12),W,0,0.62,0);for(let D of[-1,1]){let M=E9(new Z7(0.07,0.3,8),P9(5904926),D*0.17,0.28,0);M.rotation.z=-D*0.4,X.add(M,E9(new c0(0.06,8,6),v8(16774856),D*0.11,0.06,0.27))}X.add(E9(new R7(0.1,0.02,6,12,Math.PI),P9(5904926),0,-0.1,0.28));let G=E9(new Z7(0.26,0.6,12),W,0,0.18,0),q=E9(new L8(new n6([NJ(0,0.1,-0.1),NJ(0.2,0.05,-0.5),NJ(0.5,0.3,-0.6),NJ(0.55,0.55,-0.45)]),20,0.03,6),W),N=new O0;N.add(E9(new T0(0.02,0.02,1.3),P9(3877410)));for(let D of[-1,0,1])N.add(E9(new Z7(0.025,0.2,6),P9(3877410),D*0.08,0.72,0));N.position.set(0.38,0.5,0.1),N.rotation.z=-0.2,this.devil.add(X,G,q,N),J.add(this.devil)}buildExterior(){let J=this.exterior,Q=E9(new c0(60,48,24),P9(9417322),0,-59.6,0);J.add(Q);for(let[Y,W,X,G]of[[-40,-50,30,8034922],[35,-60,36,7311218],[0,-80,40,8823712]])J.add(E9(new c0(X,32,16),P9(G),Y,-X*0.82,W));let Z=new O0;Z.add(T9(6,4.5,9,15986662,0,2.25,0));let $=new F8([new q0(-3.5,0),new q0(0,2.8),new q0(3.5,0)]),K=E9(new l8($,{depth:9.6,bevelEnabled:!1}),P9(9058866),0,4.5,-4.8);Z.add(K),Z.add(T9(1.8,3.2,1.8,15986662,0,6.2,4.2));let U=E9(new Z7(1.35,3.6,4),P9(9058866),0,9.6,4.2);U.rotation.y=Math.PI/4,Z.add(U,T9(0.12,1,0.12,HZ,0,11.9,4.2),T9(0.6,0.12,0.12,HZ,0,12,4.2)),Z.add(T9(1.4,2.6,0.1,DH,0,1.3,4.55));for(let Y of[-2.5,0,2.5])for(let W of[-1,1]){let X=new f(new F9(0.9,1.7),v8(9416904));X.position.set(W*3.02,2.6,Y),X.rotation.y=W*Math.PI/2,Z.add(X),this.churchWindows.push(X)}let H=new f(new T7(0.5,24),v8(9416904));H.position.set(0,6.6,5.11),Z.add(H),this.churchWindows.push(H),Z.position.set(0,0.3,0),Z.rotation.y=0.35,J.add(Z),J.add(T9(1.4,0.05,14,14206106,1.8,0.35,10.5));for(let Y=0;Y<16;Y++){let W=M0(Y)*Math.PI*2,X=12+M0(Y+3)*14,G=Math.cos(W)*X,q=Math.sin(W)*X-4;if(q>6&&Math.abs(G)<6)continue;let N=3+M0(Y+5)*3,D=Math.sqrt(Math.max(0,3600-G*G-q*q))-59.6;J.add(E9(new T0(0.15,0.22,N*0.4),P9(DH),G,D+N*0.2,q)),J.add(M0(Y+9)<0.5?E9(new Z7(N*0.32,N,10),P9(5208646),G,D+N*0.4+N/2,q):E9(new c0(N*0.35,12,10),P9(6986314),G,D+N*0.75,q))}}buildButton(){let J=this.button;J.add(T9(8,0.3,5,15327180,0,-0.15,0)),J.add(E9(new T0(1.25,1.4,0.7,40),P9(10133672),0,0.35,0)),J.add(E9(new R7(1,0.07,10,40),P9(5922920),0,0.72,0).rotateX(Math.PI/2));let Q=QQ(512,512,(Z)=>{Z.fillStyle="#5fae4a",Z.fillRect(0,0,512,512),Z.fillStyle="#f6ffe8",Z.font="900 120px Fraunces, Georgia, serif",Z.textAlign="center",Z.fillText("LGTM",256,300)});this.cap=new f(new T0(0.92,0.92,0.32,40),[new h0({color:6270538}),new h0({map:Q}),new h0({color:5212732})]),this.cap.position.y=0.88,this.cap.rotation.y=-Math.PI/2,J.add(this.cap),J.add(T9(1.6,0.06,2.2,16513006,-2.6,0.03,0.4).rotateY(0.3)),J.add(E9(new T0(0.28,0.24,0.6,18),P9(15986662),2.5,0.3,-0.6)),J.position.set(200,0,0)}buildLoaf(){let J=this.loaf;J.add(T9(6,0.25,3.6,11040586,0,-0.12,0)),this.dough=new f(new c0(1,40,24),new kJ({color:15389344,gradientMap:WZ})),this.slop=E9(new c0(0.22,16,12),P9(8030794)),J.add(this.dough,this.slop);for(let Q=0;Q<9;Q++)J.add(E9(new c0(0.05+M0(Q)*0.05,8,6),P9(15985368),-2.4+M0(Q+1)*4.8,0.03,-1.4+M0(Q+2)*2.8));J.position.set(400,0,0)}buildCommits(){let J=this.commits;J.add(T9(10,0.2,10,14208952,0,-0.1,0));let Q=QQ(512,128,(Z)=>{Z.fillStyle="#fbf7ee",Z.fillRect(0,0,512,128),Z.fillStyle="#4f8a3c",Z.font="700 64px 'JetBrains Mono', monospace",Z.fillText("✓",24,88),Z.fillStyle="#2b2633",Z.font="500 44px 'JetBrains Mono', monospace",Z.fillText("fix: tweak",100,82)});for(let Z=0;Z<12;Z++){let $=new f(new _0(2.4,0.28,1.4),[P9(15986662),P9(15986662),P9(15986662),P9(15986662),new kJ({map:Q,gradientMap:WZ}),P9(15986662)]);$.rotation.y=(M0(Z)-0.5)*0.3,J.add($),this.cards.push($)}for(let Z=0;Z<7;Z++){let $=Array.from({length:8},(U,H)=>NJ(Math.sin(H*1.3+Z)*0.35,H*0.6,Math.cos(H*1.1+Z)*0.2)),K=E9(new L8(new n6($),40,0.07,6),v8(8036938,0.7));K.position.set(-1.6+Z*0.55,0,(M0(Z)-0.5)*1.2),J.add(K),this.fumes.push(K)}J.position.set(600,0,0)}buildCandles(){let J=this.candles,Q=400,Z=40,$=10;for(let H=0;H<10;H++)J.add(T9(13,0.3,0.5,6175264,0,H*0.32,-H*0.5));let K=new j9(new T0(0.06,0.06,0.26,8),P9(16183264),400);this.flames=new j9(new Z7(0.05,0.16,8),new h0({color:16762976}),400);for(let H=0;H<400;H++){let Y=Math.floor(H/40),W=H%40,X=NJ(-6.2+W*0.32+Y%2*0.16,Y*0.32+0.28,-Y*0.5+0.05);this.candlePos.push(X),w7.position.copy(X),w7.scale.setScalar(1),w7.updateMatrix(),K.setMatrixAt(H,w7.matrix)}let U=[173,186,213,226];this.flameOrder=[...Array(400).keys()].filter((H)=>!U.includes(H)).sort((H,Y)=>M0(H)-M0(Y)).concat(U),J.add(T9(16,9,0.3,3813448,0,4,-6),K,this.flames),J.position.set(800,0,0)}buildFire(){let J=this.fire;J.add(T9(14,0.2,10,3814464,0,-0.1,0));let Q=3,Z=40;this.leds=new j9(new _0(0.08,0.05,0.02),new h0({color:16777215}),Q*Z);for(let U=0;U<Q;U++){J.add(T9(1.4,3.8,1.2,3028032,-2+U*1.6,1.9,-1.5));for(let H=0;H<Z;H++)w7.position.set(-2.4+U*1.6+H%4*0.2,0.5+Math.floor(H/4)*0.32,-0.88),w7.scale.setScalar(1),w7.updateMatrix(),this.leds.setMatrixAt(U*Z+H,w7.matrix)}this.fireFlames=new j9(new Z7(0.35,1.4,8),new h0({color:16777215}),70);for(let U=0;U<70;U++)this.fireFlames.setColorAt(U,new Y0([15769648,14704682,16175200,13123626][U%4]));for(let U=0;U<10;U++){let H=E9(new c0(1,12,10),v8(4867152,0.35));J.add(H),this.smoke.push(H)}this.kneeler=d$(2301994,{stole:ZQ,seed:77,skin:9263675}),this.kneeler.position.set(0.6,-0.45,2.6),this.kneeler.rotation.y=Math.PI*0.85;let $=E9(new F9(0.9,1.2),new kJ({map:this.scrollTex,gradientMap:WZ}),0.3,0.02,1.8);$.rotation.x=-Math.PI/2;let K=new O0;K.add(E9(new T0(0.07,0.07,0.4,8),P9(16183264),0,0.2,0),E9(new Z7(0.06,0.18,8),v8(16765040),0,0.5,0)),K.position.set(-0.2,0,1.9),J.add(this.leds,this.fireFlames,this.kneeler,$,K),J.position.set(1000,0,0)}buildTablets(){let J=this.tablets;J.add(E9(new Z7(14,10,7),P9(11045474),0,-5.2,-1)),J.add(E9(new Z7(30,16,7),P9(9075306),-20,-10,-40),E9(new Z7(26,14,6),P9(8030874),24,-9,-46));let Q=new F8;Q.moveTo(-1,0),Q.lineTo(-1,2.2),Q.absarc(0,2.2,1,Math.PI,0,!0),Q.lineTo(1,0),Q.closePath();for(let[Z,$]of[-1.15,1.15].entries()){let K=E9(new l8(Q,{depth:0.35,bevelEnabled:!0,bevelSize:0.06,bevelThickness:0.06,bevelSegments:2}),P9(10134445),$,0,0),U=QQ(512,820,()=>{}),H=new f(new F9(1.9,3.04),new h0({map:U,transparent:!0}));H.position.set(0,1.62,0.43),K.add(H),K.rotation.z=(Z?-1:1)*0.04,J.add(K),this.tabletTex.push(U)}for(let Z=0;Z<6;Z++){let $=E9(new T0(0.4,2.6,30,16,1,!0),v8(16178314,0.18),-6+Z*2.4,14,-3);$.rotation.z=(Z-2.5)*0.08,J.add($),this.rays.push($)}J.position.set(1200,0,0)}carve(J){if(J===this.tabletShown)return;this.tabletShown=J;let Q=[["I","Read the diff,","not the summary"],["II","Read the source,","not the blog post"],["III","No time to not","have tests"],["IV","A plan before","the fix"],["V","A·I shall not","review A·I"]];this.tabletTex.forEach((Z,$)=>{let K=Z.image,U=K.getContext("2d");U.clearRect(0,0,512,820),U.textAlign="center",($?Q.slice(3):Q.slice(0,3)).forEach(([Y,W,X],G)=>{if(($?3:0)+G>J)return;let q=100+G*236;U.fillStyle="#1f2430",U.font="900 76px Fraunces, Georgia, serif",U.fillText(Y,256,q),U.font="italic 600 60px Fraunces, Georgia, serif",U.fillText(W,256,q+70),U.fillText(X,256,q+132)}),Z.needsUpdate=!0})}flash(J){return 0}fade(J){return 0}update(J){let Q=MH(J),Z=Q.at,$=tF(Q),K=J-Z,U=$0(J,Z,$),H=Q.name;for(let V of[this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets])V.visible=!1;let Y=this.camera,W=NJ();Y.fov=40;let X=g5[H]??g5.day,G=this.sky.material.uniforms;G.top.value.setHex(X[0]),G.horizon.value.setHex(X[1]),G.bottom.value.setHex(X[2]),this.hemi.color.setHex(16774368),this.hemi.groundColor.setHex(9075302),this.hemi.intensity=1.6,this.sun.intensity=1.9,this.glowLight.intensity=0;let q=FH.some(([V])=>V===H)&&H!=="witness",N=$9($0(J,Z,Z+(q?0.45:0.8)));if(Z===0)N=$9($0(J,0,1.6));N*=1-W9(n0(40)+0.6,n0(40)+1.4,J);let D=this.paint.uniforms;D.reveal.value=N,D.shotSeed.value=(OH??XZ()).indexOf(Q)*3.71%50,D.boil.value=Math.floor(J*5)*1.37;let M=ZO(J);switch(H){case"exterior":case"pray":case"approved":case"end":{this.exterior.visible=!0;let V=H!=="exterior";if(V)this.hemi.color.setHex(16763040),this.hemi.groundColor.setHex(4864602),this.hemi.intensity=1.2,this.sun.intensity=0.9;for(let O of this.churchWindows)O.material.color.setHex(V?16762976:9416904);let F=V?$0(J,I(39)-0.6,n0(40)+1.4):$0(J,0,J0(0,/^says/i));Y.position.set(V?j(16,12,F):j(-15,-9.5,F),V?j(3,4.4,F):j(2.6,3.2,F),V?j(19,15,F):j(23,16,F)),W.set(0,V?j(4,5.5,F):4,0),Y.fov=42;break}case"button":case"greenbtn":{this.button.visible=!0;let V=this.button.position,F=H==="button"?W9(J0(4,/^l-g/i)-0.1,J0(4,/^l-g/i),J)*(1-W9(J0(4,/^l-g/i)+0.25,J0(4,/^l-g/i)+0.5,J)):0;this.cap.position.y=0.88-F*0.18;let O=H==="greenbtn"?0.75+P7(J)*0.25:1;for(let z of this.cap.material)z.color.setScalar(1).multiplyScalar(O);if(H==="button")Y.position.set(V.x+j(1.4,0.6,U),j(4.2,3.6,U),j(4.4,3.4,U)),W.set(V.x,0.6,0);else Y.position.set(V.x+j(1.2,0.5,U),j(1.9,1.6,U),j(2.4,1.9,U)),W.set(V.x,0.85,0),Y.fov=36;break}case"loaf":{this.loaf.visible=!0;let V=this.loaf.position,F=r8($0(J,Z+0.3,Z+1.1)),O=$9($0(J,Z+1.2,$));this.slop.position.set(V.x*0+0.2,j(3.2,0.9,F),0.3),this.slop.visible=F<1,this.slop.position.x=0.2,this.dough.scale.set(j(1.3,2.4,O),j(0.75,1.7,O),j(1,1.6,O)),this.dough.position.set(0,j(0.6,1.3,O),0),this.dough.material.color.setHex(15389344).lerp(new Y0(10135648),O*0.75);let z=j(-0.3,0.3,U);Y.position.set(V.x+Math.sin(z)*6.5,j(2.4,3,U),Math.cos(z)*6.5),W.set(V.x,1.1,0);break}case"commits":{this.commits.visible=!0;let V=this.commits.position;this.cards.forEach((O,z)=>{let C=Z+0.1+z*0.22,R=B9($0(J,C,C+0.3));O.visible=J>=C,O.position.set(0,z*0.3+0.15+(1-R)*2,0)}),this.fumes.forEach((O,z)=>{let C=J0(15,/^stunk/i)-0.2+z*0.08;O.visible=J>=C,O.scale.y=$9($0(J,C,C+1.2)),O.position.y=3.6+(J-C)*0.5%0.6,O.rotation.y=J*0.5+z});let F=j(0.5,0.1,U);Y.position.set(V.x+Math.sin(F)*7.5,j(2.8,3.6,U),Math.cos(F)*7.5),W.set(V.x,1.9,0);break}case"candles":{this.candles.visible=!0;let V=this.candles.position,F=Math.round(j(400,4,$9($0(J,J0(16,/^cleaned/i),J0(17,/^four$/i)+0.4)))),O=new Set(this.flameOrder.slice(0,400-F));this.candlePos.forEach((C,R)=>{w7.position.set(C.x,C.y+0.21,C.z);let B=O.has(R)?0.001:1+Math.sin(J*13+R)*0.15;w7.scale.set(B,B*(1+P7(J)*0.2),B),w7.updateMatrix(),this.flames.setMatrixAt(R,w7.matrix)}),this.flames.instanceMatrix.needsUpdate=!0,this.hemi.intensity=j(0.35,1.3,F/400),this.sun.intensity=0.2,this.glowLight.position.set(V.x,3,3),this.glowLight.intensity=j(2,60,F/400);let z=$0(J,Z,n0(17)+0.5);Y.position.set(V.x+j(-1.5,0,z),j(2.8,2,z),j(8,3.6,z)),W.set(V.x+j(-0.5,0,z),j(1.6,1.7,z),-2),Y.fov=j(48,34,z);break}case"fire":{this.fire.visible=!0;let V=this.fire.position;for(let F=0;F<70;F++){let O=F%3,z=0.6+Math.sin(J*9+F*1.7)*0.25+M0(F)*0.5;w7.position.set(-2.6+O*1.6+(M0(F+1)-0.5)*1.4,3.8+z*0.5+M0(F+2)*0.6-0.4,-1.5+(M0(F+3)-0.5)*1.2),w7.scale.set(0.7+M0(F)*0.6,z*1.4,0.7+M0(F)*0.6),w7.rotation.set(0,0,Math.sin(J*5+F)*0.15),w7.updateMatrix(),this.fireFlames.setMatrixAt(F,w7.matrix)}this.fireFlames.instanceMatrix.needsUpdate=!0,w7.rotation.set(0,0,0);for(let F=0;F<120;F++)this.leds.setColorAt(F,new Y0(Math.sin(J*8+F*2.3)>0.2?14699066:5904926));if(this.leds.instanceColor)this.leds.instanceColor.needsUpdate=!0;this.smoke.forEach((F,O)=>{let z=(J*0.35+O/10)%1;F.position.set(-2+O%3*1.6+Math.sin(O)*0.6,5+z*6,-1.8),F.scale.setScalar(0.8+z*2.2),F.material.opacity=0.35*(1-z)}),YZ(this.kneeler,J,0,0.02,1),this.hemi.color.setHex(16752752),this.hemi.groundColor.setHex(2761792),this.hemi.intensity=1.1,this.sun.intensity=0.4,this.glowLight.position.set(V.x-0.6,4,0),this.glowLight.intensity=50+Math.sin(J*11)*12,Y.position.set(V.x+j(-3.8,-2.6,U),j(1.4,1.8,U),j(7,5.6,U)),W.set(V.x-0.4,2.2,0),Y.fov=46;break}case"tablets":{this.tablets.visible=!0;let V=this.tablets.position,F=0;for(let C=27;C<=31;C++)if(J>=I(C)-0.1)F=C-27;this.carve(F),this.rays.forEach((C,R)=>{C.material.opacity=0.12+0.1*Math.sin(J*1.5+R)+P7(J)*0.05});let O=j(-0.3,0.3,F/4)+(J-I(27+F))*0.03,z=F===4?6.5:4.6;Y.position.set(V.x+(F<3?-1.15:1.15)*(F===4?0:1)+Math.sin(O)*z,2.6,Math.cos(O)*z),W.set(V.x+(F<3?-1.15:1.15)*(F===4?0:1),2.3,0),Y.fov=42;break}default:this.interiorShot(J,Q,W,M,U)}Y.aspect=1.7777777777777777,Y.updateProjectionMatrix(),Y.lookAt(W),this.sky.position.copy(Y.position)}interiorShot(J,Q,Z,$,K){let{name:U,at:H}=Q,Y=this.camera;this.interior.visible=!0,this.hemi.intensity=1.5;let W=U==="greenwash"?W9(H,H+0.6,J):0;for(let z of this.windows)z.material.color.setRGB(1,1,1).lerp(new Y0(8048474),W*0.8);this.hemi.color.setHex(16774368).lerp(new Y0(12120224),W*0.7);for(let z of this.choir)YZ(z,J,$,0.06);let X=U==="bot"?W9(J0(20,/^\W*amen/i)-0.1,J0(20,/^\W*amen/i)+0.1,J):0;if(U==="bot")YZ(this.robot,J,X,0.02);this.robot.userData.extra.material.color.setHex(X>0.5?10412154:4872772);let G=U==="nobody"||U==="nine",q=U==="shipit"?W9(J0(1,/ship/i)-0.1,J0(1,/ship/i)+0.1,J):U==="lgtm"?$:U==="witness"||U==="read"?$*0.6:0;for(let{f:z,phone:C}of this.flock)z.visible=U!=="aisle",C.visible=G,YZ(z,J,q,G?0.01:0.03,G?1:0);let N=U==="pulpit"?B9($0(J,H+0.3,H+0.8)):0;YZ(this.preacher,J,FH.some(([z])=>z===U)||U==="lgtm"?0.5+$*0.5:0,U==="deadpan"||U==="who"?0:0.05);let D=this.preacher.userData.hands[1];if(N>0)D.position.set(0.45,j(0.95,2.3,N),0.25),m5(this.preacher.userData.arms[1],1,D.position);this.book.visible=U==="pulpit"||U==="shipit",this.book.position.copy(D.position).add(NJ(0,0.25,0.05));let M=U==="scroll"?$9($0(J,I(3)-0.2,n0(3)+0.6)):["nine","devil","aisle","nobody"].includes(U)?1:0,V=Math.max(0.01,M*26),F=-11.4;this.scroll.visible=this.roll.visible=M>0,this.scroll.scale.set(1,V,1),this.scroll.position.set(0,0.04,F+V/2),this.scrollTex.repeat.set(1,V/4),this.roll.position.set(0,0.33,F+V+0.3),this.roll.rotation.x=V/0.32,this.roll.visible=M>0&&M<1,this.glass.visible=U==="nine",this.glass.position.set(j(-0.4,0.2,K),0.9,j(-6,-4.8,K));let O=U==="devil";if(this.devil.visible=O,O){let z=B9($0(J,H+0.25,H+0.75));this.devil.position.set(0.35,j(-0.9,0.05,z)+P7(J)*0.06,-5),this.devil.rotation.set(0,-0.35+Math.sin(J*3)*0.15,Math.sin(J*Math.PI*1.78)*0.12)}switch(this.laptop.visible=U==="laptop"||U==="sermon"||U==="deadpan",this.screen.material.map=U==="laptop"?this.screens.explain:this.screens.sermon,U){case"pulpit":Y.position.set(j(0.8,0.3,K),j(2.4,2.6,K),j(-3,-7.5,K)),Z.set(0,2.6,-13),Y.fov=38;break;case"shipit":Y.position.set(1.4,3.4,-10.6),Z.set(0,0.9,2.5),Y.fov=52;break;case"who":{let z=$0(J,H,I(3)-0.3);Y.position.set(j(0.7,0.15,z),j(2.3,2.45,z),j(-5.5,-9.9,$9(z))),Z.set(0,2.35,-12.9),Y.fov=j(36,28,z);break}case"scroll":{let z=F+V;Y.position.set(1.4,j(3.6,4.6,K),-13.2),Z.set(0,0,Math.max(-6,z-2)),Y.fov=48;break}case"nine":Y.position.set(j(0.9,0.5,K),3,j(-3.2,-2.4,K)),Z.set(this.glass.position.x,0,this.glass.position.z-0.5),Y.fov=42;break;case"devil":Y.position.set(1.8,1,-1.6),Z.set(0.3,0.45,-5),Y.fov=36;break;case"nobody":Y.position.set(j(7.5,6.5,K),j(9.5,8.5,K),j(12,10,K)),Z.set(0,0,-1),Y.fov=46;break;case"witness":Y.position.set(0,j(4.4,3.8,K),j(11,6,K)),Z.set(0,3,-15),Y.fov=44;break;case"greenwash":Y.position.set(j(-3.2,-2.4,K),1.3,-8),Z.set(0,4.2,-17),Y.fov=54;break;case"sign":Y.position.set(j(7.4,6.2,K),3.1,j(-14.5,-11.5,K)),Z.set(-1,2.6,-16.5),Y.fov=44;break;case"aisle":Y.position.set(0,j(4.2,5.2,K),-11.2),Z.set(0,0,9),Y.fov=50;break;case"read":Y.position.set(0,j(2.6,3,K),j(-9.2,-10.6,K)),Z.set(0,3,-16.5),Y.fov=52;break;case"laptop":Y.position.set(j(1.7,1.4,K),3.5,j(-14.2,-13.7,K)),Z.set(0,2.45,-12.1),Y.fov=34;break;case"bot":{let z=this.robot.position;Y.position.set(z.x+j(2.6,2,K),z.y+1.9,z.z+4.2),Z.set(z.x-0.3,z.y+1.5,z.z),Y.fov=40;break}case"sermon":Y.position.set(j(-1.5,-1.2,K),j(3.3,3.1,K),j(-13.9,-13.4,K)),Z.set(0,2.45,-12.1),Y.fov=32;break;case"deadpan":Y.position.set(0,2.45,-9.4),Z.set(0,2.38,-12.9),Y.fov=26;break;case"lgtm":Y.position.set(0,j(4.4,5.8,K),j(8,11.5,K)),Z.set(0,2.2,-12),Y.fov=46;break;default:Y.position.set(0,4,10),Z.set(0,2,-12)}}render(){this.composer.render()}}var EH=(J)=>`<div class="ov card sign" data-show="L${J}|L${J+1}-0.1"><div class="bar">review · required</div>
    <div class="row"><span class="box" data-at="W${J}:sign">✓</span> I have read and understood this change</div>
    <svg viewBox="0 0 520 120"><path class="draw" data-at="W${J}:sign" data-until="W${J}:comprehend+0.3" d="M10 80 C 40 20, 60 20, 70 70 S 100 110, 120 60 S 150 10, 170 70 C 180 100, 200 90, 215 55 C 230 25, 240 95, 262 70 S 300 30, 320 64 C 340 92, 370 40, 400 60 S 470 80, 510 50"/></svg>
    <div class="row muted">lines read: <b>0</b></div></div>`,d5={title:"Read the Diff",fonts:['900 100px "Fraunces"','italic 600 60px "Fraunces"','700 40px "Caveat"','500 20px "JetBrains Mono"'],overlays:()=>`
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
  ${EH(11)}${EH(24)}${EH(35)}
  <div class="ov stamp big" data-show="W38:l-g|L39-0.6" data-at="W38:l-g">LGTM</div>
  <div class="ov stamp big green" data-show="W40:approved|${n0(40)+1.2}" data-at="W40:approved">APPROVED</div>`,endAt:()=>n0(40)+1.4,words:{hot:/^(devil's|devil|fire|stunk|slop|confess|lord|nobody|no|knees|two)$/,ice:/^(diff|read|source|witness|function|commit|tests|lines|thousand|claude|sermon|p-r|a-i|bot|linter)$/,gold:/^(green|amen|l-g-t-m|lgtm|approved|ship|button|plan|church|pastor|son|brother|good|book)$/},hud:(J,Q)=>{let Z=J>=I(Math.min(40,U7.length-1));return{left:`read the diff &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`<span class="add">+3,982</span> <span class="del">−18</span> &nbsp;·&nbsp; lines read <b>0</b>${Z?" &nbsp;·&nbsp; approved":""}`}},shots:XZ,shotAt:MH,world:(J)=>new RH(J)};var S7=new Y0(5822207),qJ=new Y0(16723285),Y6=new Y0(16763213),VH=new Y0(10185727),l$=new Y0(3985262),l5=new Y0(329227),PI=new Y0(264212),l7=-24,X6=4,W6=90,s8=30,KQ=(J)=>0.3*Math.pow(2,(J-l7)/X6),y8=(J)=>l7+X6*Math.log2(J/0.3),t7=l7-14,h9=y8(W6);function qZ(){let J=(Q,Z=!1)=>{let $=Math.max(I(Q)-1.6,Math.min(n0(Q-1)+0.05,I(Q)-0.05));return[{name:"ride",at:$,label:Q===47?"it doubles while we're meeting":"hold on",section:Z?"chorus · hushed":"chorus",ride:{first:Q,a:$,b:n0(Q+3)+0.4,hushed:Z}},{name:Q===16?"montage":Q===47?"triple":"terrified",at:n0(Q+3)+0.4,label:Q===47?"tentative":"terrified, and thrilled",section:Z?"chorus · hushed":"chorus",ride:{first:Q,a:I(Q),b:n0(Q+3),hushed:Z}}]};return[{name:"intro",at:0,label:"intro",section:"intro"},{name:"prius",at:I(0)-0.08,label:"the prius",section:"verse 1"},{name:"tesla",at:I(1)-0.08,label:"hands off",section:"verse 1"},{name:"years",at:I(2)-0.08,label:"ten years out",section:"verse 1"},{name:"linear",at:I(3)-0.08,label:"linear brain",section:"verse 1"},{name:"engine",at:I(4)-0.08,label:"one shot",section:"verse 1"},{name:"waiting",at:I(6)-0.08,label:"not yet",section:"verse 1"},{name:"ceiling",at:I(7)-0.08,label:"you're the ceiling",section:"verse 1"},{name:"releases",at:I(8)-0.08,label:"every three weeks",section:"verse 1"},{name:"comet",at:I(9)-0.08,label:"flip phone, comet",section:"verse 1"},{name:"agents",at:I(10)-0.08,label:"forty agents",section:"verse 1"},{name:"eol",at:I(12)-0.08,label:"end-of-life",section:"verse 1"},{name:"standup",at:I(14)-0.08,label:"the standup",section:"verse 1"},...J(16),{name:"cab",at:I(21)-0.08,label:"change board",section:"verse 2"},{name:"kernel",at:I(23)-0.08,label:"pilot phase",section:"verse 2"},{name:"flat",at:I(25)-0.08,label:"stable! love that",section:"verse 2"},{name:"procure",at:I(27)-0.08,label:"procurement",section:"verse 2"},{name:"fab",at:I(29)-0.08,label:"out of stock",section:"verse 2"},{name:"sun",at:I(31)-0.08,label:"soc 2",section:"verse 2"},{name:"vp",at:I(33)-0.08,label:"bonus achieved",section:"verse 2"},{name:"protein",at:I(35)-0.08,label:"the use case",section:"verse 2"},...J(37),{name:"bridge",at:I(42)-0.3,label:"no quorum",section:"bridge"},{name:"premeeting",at:I(43)-0.2,label:"the pre-meeting",section:"bridge"},...J(47,!0),{name:"moved",at:I(52)-0.6,label:"moved to thursday",section:"outro"},{name:"outro",at:I(53)-0.4,label:"the curve didn't wait",section:"outro"},{name:"end",at:n0(53)+2.2,label:"the end",section:"outro"}]}var BH=null,c$=(J)=>{let Q=BH??=qZ();return Q.filter((Z)=>J>=Z.at).at(-1)??Q[0]},i8=()=>J0(7,/^go/i);function DJ(J,Q,Z,$="400 %spx Anton, Impact, sans-serif"){let K=document.createElement("canvas"),U=K.getContext("2d"),H=128;U.font=$.replace("%s",String(128)),K.width=Math.ceil(U.measureText(J).width+76.8),K.height=Math.ceil(192),U.font=$.replace("%s",String(128)),U.textAlign="center",U.textBaseline="middle",U.shadowColor=Q,U.shadowBlur=24,U.fillStyle=Q,U.fillText(J,K.width/2,K.height/2);let Y=new G7(K);Y.colorSpace=F7;let W=new iJ(new wJ({map:Y,color:10132122,transparent:!0,depthWrite:!1,fog:!1}));return W.scale.set(Z*K.width/K.height,Z,1),W.userData.base=W.scale.clone(),W}var $Q=(J,Q)=>J.scale.copy(J.userData.base).multiplyScalar(Math.max(0.001,Q)),NZ=(J,Q)=>new C8({color:J,transparent:!0,opacity:Q,depthWrite:!1}),GZ=(J,Q,Z=0.9)=>new u7(new SJ(J),NZ(Q,Z));class s5 extends a7{constructor(){super()}getPoint(J,Q=new k){let Z=j(t7,h9,J);return Q.set(Z,KQ(Z),0)}}var c5={intro:[461342,1194578,263692],prius:[1181478,5903944,459790],tesla:[920106,8002130,525327],years:[268322,1006182,198667],linear:[398368,1460314,198410],engine:[660518,6959124,329484],waiting:[1380138,6957630,460044],ceiling:[399402,2779786,264720],releases:[921386,3418234,394767],comet:[197903,1714794,131849],agents:[201743,1202754,133130],eol:[1182238,4856378,459787],standup:[1708556,5913120,657157],ride:[1836562,9052208,656136],montage:[2098448,10099258,787208],terrified:[2360334,10494014,787206],hushed:[265250,1458298,132623],cab:[1967628,6953508,787206],kernel:[1050656,4860538,394252],flat:[398368,1722970,198410],procure:[1314826,5917210,525834],fab:[1181734,4860554,459791],sun:[2100228,9060368,787971],vp:[399888,1727028,199174],protein:[268832,1727082,133130],bridge:[198159,990778,131848],premeeting:[657940,2763332,328968],moved:[657940,2763332,328968],outro:[263695,1712708,131848],end:[131848,526868,66052]},a0=new k9,k7=(J=0,Q=0,Z=0)=>new k(J,Q,Z);class IH{bodies;heads;constructor(J,Q,Z){this.bodies=new j9(new H8(0.2,0.62,4,8),new K9({color:Q,roughness:0.7}),J),this.heads=new j9(new c0(0.17,12,8),new K9({color:new Y0(Q).multiplyScalar(1.2),roughness:0.7}),J),Z.add(this.bodies,this.heads)}set(J,Q,Z,$,K=0,U=!1){let H=U?-0.35:0;a0.position.set(Q,0.52*$+H,Z),a0.rotation.set(0,0,K),a0.scale.setScalar($),a0.updateMatrix(),this.bodies.setMatrixAt(J,a0.matrix),a0.position.set(Q-K*0.6,1.2*$+H,Z),a0.updateMatrix(),this.heads.setMatrixAt(J,a0.matrix)}done(){this.bodies.instanceMatrix.needsUpdate=this.heads.instanceMatrix.needsUpdate=!0}}class _H{renderer;scene=new o7;camera=new Q7(40,1.7777777777777777,0.1,600);composer;bloom;fog=new z8(l5,0.011);sky;curveWorld=new O0;path=new s5;tube;glow;tip;beam;arc=[];floor;wall;markers=[];years=[];linear;linearTag;expoTag;flatLine;flatTag;stableTag;aiTag;crowd=new O0;crowdPeople;people=[];notYet=[];ceiling=new O0;panes;rims;shards=[];rings=[];moon;meetings;dust;dustSeed=[];road=new O0;dashes;poles;streaks;prius=new O0;tesla=new O0;engine=new O0;stages=[];core;exhaust;slabs=new O0;slab=[];approved;comet=new O0;cometHead=new O0;tail;phoneLid;agents=new O0;agentCubes;agentEdges;room=new O0;table;roomPeople;screen;boards={};fab=new O0;wafer;laser;machines;sun=new O0;sunBall;sunHalo;swarm;swarmDirs=[];protein=new O0;beads;coil=[];helix=[];globe;constructor(J){this.renderer=new W8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=l5.clone(),this.scene.fog=this.fog,this.composer=new S8(this.renderer),this.composer.addPass(new j8(this.scene,this.camera)),this.bloom=new X8(new q0(1920,1080),1.1,0.6,0.12),this.composer.addPass(this.bloom),this.composer.addPass(new k8),this.scene.add(this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein),this.scene.add(new M8(10475775,1050640,1.2));let Q=new d7(16777215,1.6);Q.position.set(5,10,8),this.scene.add(Q),this.buildSky(),this.buildCurve(),this.buildCrowd(),this.buildCeiling(),this.buildChorus(),this.buildDust(),this.buildRoad(),this.buildEngine(),this.buildSlabs(),this.buildComet(),this.buildAgents(),this.buildRoom(),this.buildFab(),this.buildSun(),this.buildProtein()}buildSky(){this.sky=new f(new c0(450,32,16),new v9({side:B7,depthWrite:!1,fog:!1,uniforms:{top:{value:new Y0},horizon:{value:new Y0},bottom:{value:new Y0},pulse:{value:0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; uniform float pulse; varying vec3 vDir;
        void main() {
          float y = vDir.y;
          vec3 c = y > 0.0 ? mix(horizon, top, pow(smoothstep(0.0, 0.75, y), 0.7)) : mix(horizon, bottom, smoothstep(0.0, 0.35, -y));
          c += horizon * pulse * exp(-abs(y) * 9.0) * 0.6; // the horizon band breathes with the bass
          gl_FragColor = vec4(c, 1.0);
        }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildCurve(){let J=this.path,Q=1400,Z=10,$=new L8(J,1400,0.14,10,!1),K=$.attributes.position,U=new Float32Array(K.count*3),H=new Y0;for(let B=0;B<K.count;B++){let _=S9(Math.log2(Math.max(K.getY(B),0.04)/0.3)/8);H.copy(S7).lerp(qJ,W9(0.15,0.7,_)).lerp(new Y0(16777215),W9(0.75,1,_)*0.7),U.set([H.r,H.g,H.b],B*3)}$.setAttribute("color",new u9(U,3)),this.tube=new f($,new h0({vertexColors:!0}));let Y=new L8(J,1400,0.55,8,!1);this.glow=new f(Y,new h0({color:qJ,transparent:!0,opacity:0.16,blending:H7,depthWrite:!1})),this.tip=new f(new c0(0.42,24,16),new h0({color:16777215})),this.beam=new f(new T0(0.6,0.6,1,12).translate(0,0.5,0),new h0({color:16765146})),this.curveWorld.add(this.tube,this.glow,this.tip,this.beam);let W=0,X=k7(),G=k7(),q=[0];for(let B=1;B<=2000;B++)J.getPoint((B-1)/2000,X),J.getPoint(B/2000,G),W+=X.distanceTo(G),q.push(W);this.arc=q.map((B)=>B/W);let N=[];for(let B=t7-30;B<=h9+30;B+=X6/4)N.push(B,0,-40,B,0,30);for(let B=-40;B<=30;B+=2)N.push(t7-30,0,B,h9+30,0,B);let D=new q9;D.setAttribute("position",new J9(N,3)),this.floor=new u7(D,NZ(S7,0.12));let M=[];for(let B=0;B<=8;B++){let _=0.3*2**B;M.push(t7-30,_,-3,h9+30,_,-3)}for(let B=l7;B<=h9+20;B+=X6)M.push(B,0,-3,B,W6+20,-3);let V=new q9;V.setAttribute("position",new J9(M,3)),this.wall=new u7(V,NZ(S7,0.1)),this.curveWorld.add(this.floor,this.wall);for(let B=1;B<=8;B++){let _=l7+X6*B,P=new f(new c0(0.28,16,12),new h0({color:Y6}));P.position.set(_,KQ(_),0),this.markers.push({x:_,dot:P}),this.curveWorld.add(P)}for(let B=0;B<=10;B++){let _=j(l7,h9,B/10),P=DJ(String(2026+B),B===10?"#ff2d55":"#58d6ff",1.4,"700 %spx 'JetBrains Mono', monospace");P.position.set(_-1.6,KQ(_)+1.6,1),this.years.push({x:_,tag:P}),this.curveWorld.add(P)}let F=l7+2*X6,O=KQ(F),z=O*Math.LN2/X6,C=new s6(k7(t7,O+z*(t7-F),0),k7(h9+6,O+z*(h9+6-F),0));this.linear=new f(new L8(C,200,0.1,8,!1),new h0({color:9081766,transparent:!0})),this.linearTag=DJ("LINEAR BRAIN","#8a93a6",2.6),this.linearTag.position.set(h9-2,O+z*(h9-2-F)+2.4,1),this.expoTag=DJ("EXPONENTIAL PLANE","#ff2d55",3.4),this.expoTag.position.set(y8(42)-15,42,1);let R=new s6(k7(t7,0.6,1.5),k7(h9+14,0.6,1.5));this.flatLine=new f(new L8(R,200,0.12,8,!1),new h0({color:9081766})),this.flatTag=DJ("OUR ROLLOUT","#8a93a6",2.2),this.flatTag.position.set(h9+4,2.2,1.5),this.stableTag=DJ("STABLE! ♥","#3ccf6e",3),this.stableTag.position.set(h9+4,5.4,1.5),this.aiTag=DJ("THE A-I CURVE","#ff2d55",3),this.aiTag.position.set(y8(36)-9,36,1),this.curveWorld.add(this.linear,this.linearTag,this.expoTag,this.flatLine,this.flatTag,this.stableTag,this.aiTag)}buildCrowd(){this.crowdPeople=new IH(90,8160921,this.crowd);for(let Q=0;Q<90;Q++)this.people.push({x:t7-8+M0(Q)*22,z:-1+M0(Q+50)*10,h:0.85+M0(Q+99)*0.3,ph:M0(Q+7)*6.28});for(let Q=0;Q<7;Q++){let Z=this.people[Q*11],$=DJ(Q%2?"NOT YET":"NO","#ffc94d",1.1);$.position.set(Z.x,2.2*Z.h+3.2+M0(Q+31)*2,Z.z),this.notYet.push($),this.crowd.add($)}this.curveWorld.add(this.crowd)}buildCeiling(){let Q=[];for(let U=0;U<26;U++)for(let H=0;H<34;H++)Q.push(k7(y8(s8)-34+H*1.1*1.75+U%2*1.1*0.875,s8,-16+U*1.1*1.52));let Z=new T7(1.056,6).rotateX(-Math.PI/2),$=new aJ(0.9900000000000001,1.078,6).rotateX(-Math.PI/2);this.panes=new j9(Z,new h0({color:S7,transparent:!0,opacity:0.1,side:m9,depthWrite:!1,blending:H7}),Q.length),this.rims=new j9($,new h0({color:S7,transparent:!0,opacity:0.55,side:m9,depthWrite:!1}),Q.length);let K=k7(y8(s8),s8,0);Q.forEach((U,H)=>{let Y=U.clone().sub(K).setY(0),W=Y.length();Y.normalize().multiplyScalar(4+M0(H)*10+30/(W+2)),Y.y=6+M0(H+3)*16+40/(W+2),this.shards.push({p:U,v:Y,axis:k7(M0(H+5)-0.5,M0(H+6)-0.5,M0(H+7)-0.5).normalize(),spin:3+M0(H+8)*8,delay:W*0.018})}),this.ceiling.add(this.panes,this.rims),this.curveWorld.add(this.ceiling)}buildChorus(){for(let J=0;J<12;J++){let Q=new f(new R7(1,0.05,8,64),new h0({color:qJ,transparent:!0,depthWrite:!1,blending:H7}));this.rings.push(Q),this.curveWorld.add(Q)}this.moon=new f(new c0(9,32,24),new h0({color:13624063,fog:!1,transparent:!0})),this.moon.position.set(-40,70,-160),this.curveWorld.add(this.moon),this.meetings=new j9(new _0(1.5,0.12,2.2),new h0({color:5078271,transparent:!0,opacity:0.85}),512);for(let J=0;J<512;J++)a0.position.set(l7-4+M0(J+900)*52,1+M0(J+1900)*70,-2.4),a0.rotation.set(Math.PI/2,0,0),a0.scale.setScalar(1),a0.updateMatrix(),this.meetings.setMatrixAt(J,a0.matrix);this.curveWorld.add(this.meetings)}buildDust(){let Q=new Float32Array(4800);for(let $=0;$<1600;$++)this.dustSeed.push(M0($*3),M0($*3+1),M0($*3+2));let Z=new q9;Z.setAttribute("position",new u9(Q,3)),this.dust=new y7(Z,new m7({color:9427199,size:0.12,transparent:!0,opacity:0.6,depthWrite:!1,blending:H7})),this.scene.add(this.dust)}buildRoad(){let J=new f(new F9(16,600).rotateX(-Math.PI/2),new K9({color:724244,roughness:0.6,metalness:0.3}));J.position.z=-250,this.road.add(J),this.dashes=new j9(new _0(0.16,0.02,2.6),new h0({color:14674165}),100);for(let Z of[-5.4,5.4]){let $=new f(new _0(0.14,0.02,600),new h0({color:S7}));$.position.set(Z,0.01,-250),this.road.add($)}this.poles=new j9(new _0(0.12,0.12,0.8),new h0({color:Y6}),48),this.streaks=new j9(new _0(0.03,0.03,9),new h0({color:13627391,transparent:!0,blending:H7,depthWrite:!1}),120),this.road.add(this.dashes,this.poles,this.streaks);let Q=(Z,$,K)=>{let U=new O0,H=new K9({color:Z,roughness:K?0.25:0.7,metalness:K?0.8:0.2}),Y=new _0(1.9,0.55,K?4.7:4.2),W=new _0(1.55,0.5,K?2.6:2);for(let[G,q,N]of[[Y,0.5,0],[W,1.02,K?0.1:0.35]]){let D=new f(G,H);D.position.set(0,q,N);let M=GZ(G,$,K?0.95:0.8);M.position.copy(D.position),U.add(D,M)}let X=new f(new _0(K?1.8:0.4,0.09,0.05),new h0({color:K?qJ:new Y0(8002088)}));if(X.position.set(0,0.66,(K?4.7:4.2)/2+0.01),U.add(X),!K){let G=X.clone();X.position.x=-0.65,G.position.x=0.65,U.add(G)}for(let G of[-0.85,0.85]){let q=new f(new T0(0.34,0.34,0.24,18).rotateZ(Math.PI/2),new K9({color:328967}));for(let N of[-1.3,1.3]){let D=q.clone();D.position.set(G,0.34,N),U.add(D)}}return U};this.prius=Q(7109260,S7,!1),this.tesla=Q(855828,new Y0(16777215),!0),this.road.add(this.prius,this.tesla)}buildEngine(){let J=new u7(new dQ(new T0(3.1,2.6,7,36,5,!0).rotateX(Math.PI/2)),NZ(S7,0.28));J.position.z=-2.5,this.engine.add(J);let Q=(H,Y,W,X,G,q,N)=>{let D=new O0,M=new _0(0.07,X,0.55).translate(0,W-X/2,0),V=new j9(M,new K9({color:G,roughness:0.35,metalness:0.85,emissive:G,emissiveIntensity:0.15}),Y);for(let F=0;F<Y;F++)a0.rotation.set(0,0,F/Y*Math.PI*2),a0.rotateY(N),a0.position.set(0,0,0),a0.scale.setScalar(1),a0.updateMatrix(),V.setMatrixAt(F,a0.matrix);D.add(V),D.position.z=H,this.engine.add(D),this.stages.push({g:D,speed:q})};Q(0.6,24,2.85,2.2,new Y0(12109526),1,0.55),Q(-1,40,2.1,1.3,new Y0(7324648),-1.6,-0.4),Q(-1.9,44,1.85,1.1,new Y0(15235695),2.1,0.4),Q(-2.7,48,1.6,0.9,new Y0(16731486),-2.6,-0.4);let Z=new f(new Z7(0.75,1.5,32).rotateX(Math.PI/2),new K9({color:14673646,metalness:0.9,roughness:0.2}));Z.position.z=1.4,this.core=new f(new c0(1.3,24,16),new h0({color:qJ,transparent:!0,blending:H7,depthWrite:!1})),this.core.position.z=-5.5;let $=900,K=new Float32Array($*3),U=new q9;U.setAttribute("position",new u9(K,3)),this.exhaust=new y7(U,new m7({color:16747100,size:0.18,transparent:!0,depthWrite:!1,blending:H7})),this.engine.add(Z,this.core,this.exhaust)}buildSlabs(){let J=0;for(let Z=0;Z<12;Z++){let $=0.7*1.42**Z,K=1.4+Z*0.12,U=new _0(K,$,K).translate(0,$/2,0),H=new f(U,new K9({color:1317414,roughness:0.4,metalness:0.6,transparent:!0})),Y=GZ(U,S7,0.9),W=DJ(`v${Z+1}`,"#58d6ff",1.2+Z*0.12,"700 %spx 'JetBrains Mono', monospace");W.position.set(0,$+1.2,0);let X=new O0;X.add(H,Y,W),X.position.x=J,this.slabs.add(X),this.slab.push({g:X,mesh:H,edge:Y,tag:W,x:J,h:$}),J+=K+1.6}this.approved=DJ("APPROVED","#3ccf6e",1.6),this.slabs.add(this.approved);let Q=new jJ(200,100,1784402,924971);Q.position.x=40,this.slabs.add(Q)}buildComet(){let J=new f(new uQ(1.1,2),new h0({color:16777215})),Q=new f(new c0(2.2,24,16),new h0({color:S7,transparent:!0,opacity:0.25,blending:H7,depthWrite:!1})),Z=new O0,$=new f(new _0(0.7,0.08,1.2),new K9({color:3817290,metalness:0.6}));$.position.z=0.6,this.phoneLid=new O0;let K=new f(new _0(0.7,0.08,1.2),new K9({color:3817290,metalness:0.6}));K.position.z=-0.6;let U=new f(new F9(0.5,0.8),new h0({color:8257456}));U.rotation.x=-Math.PI/2,U.position.set(0,0.05,-0.6),this.phoneLid.add(K,U),Z.add($,this.phoneLid),Z.scale.setScalar(2.4),Z.position.set(0,1.9,1.4),Z.rotation.set(0.3,0,0.2);let H=new f(new R7(1.16,0.06,6,40),new h0({color:Y6}));H.rotation.y=Math.PI/2,this.cometHead.add(J,Q,Z,H);let Y=1400,W=new Float32Array(Y*3),X=new q9;X.setAttribute("position",new u9(W,3)),this.tail=new y7(X,new m7({color:11069183,size:0.22,transparent:!0,depthWrite:!1,blending:H7})),this.comet.add(this.cometHead,this.tail)}buildAgents(){let J=new _0(1,1,1);this.agentCubes=new j9(J,new h0({color:16777215}),40),this.agentEdges=new j9(new _0(1.12,1.12,1.12),new h0({color:S7,wireframe:!0,transparent:!0,opacity:0.6}),40);let Q=new f(new _0(3,2,0.2),new h0({color:858642})),Z=GZ(new _0(3,2,0.2),l$);Q.position.set(0,1.2,0),Z.position.copy(Q.position);let $=new jJ(80,40,1784402,924971);this.agents.add(this.agentCubes,this.agentEdges,Q,Z,$)}buildRoom(){this.table=new O0;let J=new f(new _0(9,0.15,3),new K9({color:1711398,roughness:0.3,metalness:0.5}));J.position.y=0.95;let Q=GZ(new _0(9,0.15,3),S7,0.5);Q.position.copy(J.position),this.table.add(J,Q),this.roomPeople=new IH(12,8160921,this.room),this.screen=new f(new F9(9,5.1),new h0({color:16777215}));let Z=(K,U,H)=>{let Y=document.createElement("canvas");Y.width=1024,Y.height=580;let W=Y.getContext("2d");W.fillStyle="#0b1020",W.fillRect(0,0,1024,580),W.fillStyle=U,W.fillRect(0,0,1024,96),W.font="400 64px Anton, Impact, sans-serif",W.fillStyle="#05060b",W.fillText(K.toUpperCase(),40,74),W.font="700 46px 'JetBrains Mono', monospace",H.forEach((G,q)=>{W.fillStyle=G.startsWith("!")?U:"#e8ecf5",W.fillText(G.replace(/^!/,""),48,180+q*84)});let X=new G7(Y);return X.colorSpace=F7,X};this.boards={standup:Z("Daily standup","#58d6ff",["Yesterday: tickets","Today: tickets","Blockers: none","!AOB: the singularity?"]),cab:Z("Change Advisory Board","#ff2d55",["Agenda","1. Review: end of man","2. Rollback plan?","!Status: CHANGE REQUEST"]),vp:Z("Q3 AI update","#3ccf6e",["You're crushing it! \uD83D\uDE80","Adoption: 3 seats","Next: a committee","!BONUS ACHIEVED"]),premeeting:Z("Pre-meeting","#9b6bff",["Plan the meeting","about how far ahead","we are","!Accept · Decline · Tentative"]),tentative:Z("Pre-meeting","#9b6bff",["Plan the meeting","Your reply:","!✓ Tentative"]),moved:Z("Pre-meeting","#ffc94d",["!Moved to Thursday","Attendees: 0","The curve: not invited"])},this.screen.position.set(-6.4,3.2,0),this.screen.rotation.y=Math.PI/2;let $=new jJ(60,30,2761266,1446428);this.room.add(this.table,this.screen,$)}buildFab(){let J=document.createElement("canvas");J.width=J.height=512;let Q=J.getContext("2d"),Z=Q.createRadialGradient(256,256,20,256,256,256);Z.addColorStop(0,"#5b4a8a"),Z.addColorStop(0.6,"#2b6f8a"),Z.addColorStop(1,"#7a3f6a"),Q.fillStyle=Z,Q.fillRect(0,0,512,512),Q.strokeStyle="rgba(255,255,255,.35)";for(let H=0;H<=512;H+=32)Q.beginPath(),Q.moveTo(H,0),Q.lineTo(H,512),Q.moveTo(0,H),Q.lineTo(512,H),Q.stroke();let $=new G7(J);$.colorSpace=F7,this.wafer=new f(new T7(4,64).rotateX(-Math.PI/2),new h0({map:$})),this.wafer.position.y=0.2,this.laser=new f(new T0(0.08,0.08,14,12).translate(0,7,0),new h0({color:VH,transparent:!0,blending:H7,depthWrite:!1}));let K=GZ(new _0(12,9,9).translate(0,4.5,0),VH,0.4);this.machines=new j9(new _0(2.4,2.4,2.4),new h0({color:16777215}),70);for(let H=0;H<70;H++)a0.position.set(-30+H%14*4.4,1.2,-14-Math.floor(H/14)*4.4),a0.rotation.set(0,0,0),a0.scale.setScalar(1),a0.updateMatrix(),this.machines.setMatrixAt(H,a0.matrix);let U=new jJ(120,60,2760516,1380130);this.fab.add(this.wafer,this.laser,K,this.machines,U)}buildSun(){this.sunBall=new f(new c0(6,48,32),new h0({color:16765562,fog:!1}));let J=document.createElement("canvas");J.width=J.height=256;let Q=J.getContext("2d"),Z=Q.createRadialGradient(128,128,30,128,128,128);Z.addColorStop(0,"rgba(255,200,90,1)"),Z.addColorStop(1,"rgba(255,120,40,0)"),Q.fillStyle=Z,Q.fillRect(0,0,256,256),this.sunHalo=new iJ(new wJ({map:new G7(J),transparent:!0,depthWrite:!1,blending:H7,fog:!1})),this.sunHalo.scale.set(34,34,1);let $=700;this.swarm=new j9(new T7(0.7,6),new K9({color:658450,metalness:0.9,roughness:0.3,side:m9,emissive:1714746}),$);for(let K=0;K<$;K++){let U=1-2*(K+0.5)/$,H=Math.sqrt(1-U*U),Y=K*2.39996;this.swarmDirs.push(k7(Math.cos(Y)*H,U,Math.sin(Y)*H))}this.sun.add(this.sunHalo,this.sunBall,this.swarm)}buildProtein(){this.beads=new j9(new c0(0.32,12,8),new h0({color:16777215}),160);let Q=new Y0,Z=k7(-12,0,0);for(let K=0;K<160;K++){this.beads.setColorAt(K,Q.setHSL(0.55+K/160*0.45,0.8,0.32)),Z=Z.clone().add(k7(0.15+M0(K)*0.1,(M0(K+1)-0.5)*0.5,(M0(K+2)-0.5)*0.5)),this.coil.push(Z);let U=K*0.62;this.helix.push(k7(Math.cos(U)*2.6,-6+K*0.075,Math.sin(U)*2.6))}this.globe=new u7(new dQ(new c0(4.5,24,16)),NZ(l$,0.35)),this.globe.position.set(9,1,-4);let $=new jJ(80,40,1784402,924971);$.position.y=-7,this.protein.add(this.beads,this.globe,$)}drawX(J,Q){let Z=j(t7,y8(12),$9($0(J,0.4,I(0)-0.2))*0.85+$0(J,0.4,I(0)-0.2)*0.15);if(Q==="intro")return Z;if(Q==="years")return j(y8(12),h9,r8($0(J,I(2),I(3)-0.3)));if(Q==="ceiling")return J<i8()?y8(s8)-0.05:j(y8(s8),h9,$9($0(J,i8(),i8()+0.9)));return h9}setDraw(J){let Q=S9(Math.round((J-t7)/(h9-t7)*2000),0,2000),Z=this.arc[Q]??1;for(let $ of[this.tube,this.glow]){let K=$.geometry.parameters.tubularSegments,U=$.geometry.parameters.radialSegments;$.geometry.setDrawRange(0,Math.floor(Z*K)*U*6)}this.tip.position.set(J,KQ(J),0)}flash(J){let Q=0;for(let $ of(BH??=qZ()).slice(1)){if($.name==="terrified"||$.name==="end")continue;let K=$.name==="bridge"||$.name==="outro"?0:$.name==="ride"?0.6:0.35;if(J>=$.at)Q=Math.max(Q,Math.exp(-(J-$.at)*8)*K)}if(J>=i8())Q=Math.max(Q,Math.exp(-(J-i8())*6)*0.8);let Z=c$(J);if(Z.name==="triple"){for(let $ of[J0(51,/^thrilled/i),J0(51,/^tentative/i)])if(J>=$)Q=Math.max(Q,Math.exp(-(J-$)*9)*0.4)}if(Z.name==="montage"){let $=Q8()*4;Q=Math.max(Q,Math.exp(-((J-Z.at)%$)*9)*0.45)}return Q}fade(J){return W9(n0(53)+0.6,n0(53)+2.2,J)}update(J){let Q=c$(J),Z=Q.at,$=J-Z;for(let M of[this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein])M.visible=!1;let K=RZ(J),U=P7(J),H=["bridge","premeeting","moved","outro","end"].includes(Q.name)||!!Q.ride?.hushed;this.bloom.strength=(H?0.7:0.85)+K*(H?0.3:0.55)+(Q.name==="ceiling"?this.flash(J)*0.6:0);let[Y,W,X]=(c5[Q.name==="ride"||Q.name==="terrified"?Q.ride?.hushed?"hushed":Q.name:Q.name]??c5.intro).map((M)=>new Y0(M));this.sky.material.uniforms.top.value.copy(Y),this.sky.material.uniforms.horizon.value.copy(W),this.sky.material.uniforms.bottom.value.copy(X),this.sky.material.uniforms.pulse.value=K,this.scene.background.copy(X),this.fog.color.copy(W).lerp(X,0.55),this.fog.density=0.011;let G=this.camera,q=k7();G.fov=40;let N=this.dust.geometry.attributes.position;for(let M=0;M<N.count;M++){let[V,F,O]=[this.dustSeed[M*3],this.dustSeed[M*3+1],this.dustSeed[M*3+2]];N.setXYZ(M,-70+V*110,(F*90+J*(0.4+O))%90,-50+O*70)}switch(N.needsUpdate=!0,this.dust.material.opacity=0.35+K*0.4,Q.name){case"intro":case"years":case"linear":case"waiting":case"ceiling":case"flat":case"ride":case"terrified":case"bridge":case"outro":case"end":this.curveShot(J,Q,q,K,U);break;case"prius":case"tesla":this.roadShot(J,Q,q,K);break;case"engine":this.engineShot(J,Z,q,K);break;case"releases":case"eol":case"procure":this.slabShot(J,Q,q,U);break;case"comet":this.cometShot(J,$,q);break;case"agents":case"kernel":this.agentShot(J,Q,q,U);break;case"standup":case"cab":case"vp":case"premeeting":case"moved":this.roomShot(J,Q,q,U);break;case"triple":if(J<J0(51,/^thrilled/i)-0.05)this.curveShot(J,{...Q,name:"terrified"},q,K,U);else if(J<J0(51,/^tentative/i)-0.05)this.engineShot(J,J0(51,/^thrilled/i)-2.5,q,K);else this.roomShot(J,Q,q,U);break;case"montage":{let M=Q8()*4,V=Math.floor((J-Z)/M),F=Z+V*M,O=["engine","comet","agents","fab","sun","releases"][V%6];if(O==="engine")this.engineShot(J,F-2,q,K);else if(O==="comet")this.cometShot(J,J-F,q);else if(O==="agents")this.agentShot(J,{...Q,name:"agents",at:F},q,U);else if(O==="fab")this.fabShot(J,J-F,q,K);else if(O==="sun")this.sunShot(J,q,K);else this.slabShot(J,{...Q,name:"releases",at:F-3},q,U);break}case"fab":this.fabShot(J,$,q,K);break;case"sun":this.sunShot(J,q,K);break;case"protein":this.proteinShot(J,q);break}let D=H?0.03:0.12;G.position.x+=(M0(Math.floor(J*30))-0.5)*U*D,G.position.y+=(M0(Math.floor(J*30)+1)-0.5)*U*D,G.updateProjectionMatrix(),G.lookAt(q),this.sky.position.copy(G.position)}curveShot(J,Q,Z,$,K){let U=this.camera,H=Q.at,Y=Q.name;this.curveWorld.visible=!0;let W=this.drawX(J,Y);this.setDraw(W),this.tip.scale.setScalar(1+K*0.6),this.tip.visible=W<h9-0.1||Y==="outro"||Y==="end",this.beam.visible=!1;let X=!!Q.ride?.hushed||Y==="bridge"||Y==="outro"||Y==="end";this.tube.material.color.set(X?10275071:16777215),this.glow.material.color.copy(X?S7:qJ),this.floor.material.opacity=0.08+K*0.1+$*0.06,this.wall.material.opacity=(Y==="intro"?W9(0.5,4,J):1)*(0.07+K*0.06);for(let D of this.markers){let M=B9($0(W,D.x,D.x+1.2));D.dot.scale.setScalar(Math.max(0.001,M*(1+K*0.4)))}this.years.forEach((D,M)=>{D.tag.visible=Y==="years",$Q(D.tag,B9($0(J,I(2)+M*0.18,I(2)+M*0.18+0.3))*(M===10?1.6:1))});let G=Y==="linear";if(this.linear.visible=this.linearTag.visible=this.expoTag.visible=G,G){let D=this.linear.geometry.parameters.tubularSegments*8*6;this.linear.geometry.setDrawRange(0,Math.floor($9($0(J,H,J0(3,/^brain/i)+0.3))*D)),this.linearTag.material.opacity=W9(J0(3,/^brain/i),J0(3,/^brain/i)+0.3,J),this.expoTag.material.opacity=W9(J0(3,/^expo/i),J0(3,/^expo/i)+0.3,J)}let q=Y==="flat";if(this.flatLine.visible=this.flatTag.visible=this.stableTag.visible=this.aiTag.visible=q,q){$Q(this.aiTag,B9($0(J,J0(25,/^curve/i),J0(25,/^curve/i)+0.3))),$Q(this.flatTag,B9($0(J,J0(25,/^flat/i),J0(25,/^flat/i)+0.3))),$Q(this.stableTag,B9($0(J,J0(26,/^stable/i),J0(26,/^stable/i)+0.3))*(1+K*0.15));let D=this.flatLine.geometry.parameters.tubularSegments*8*6;this.flatLine.geometry.setDrawRange(0,Math.floor($9($0(J,J0(25,/^our/i)-0.2,J0(25,/^flat/i)+0.3))*D))}if(this.crowd.visible=Y==="waiting",this.crowd.visible)this.people.forEach((D,M)=>this.crowdPeople.set(M,D.x,D.z,D.h,Math.sin(J*1.3+D.ph)*0.05)),this.crowdPeople.done(),this.notYet.forEach((D,M)=>{let V=(M%2?J0(6,/^not/i):J0(6,/^no\W*$/i))+M*0.07;$Q(D,B9($0(J,V,V+0.25)))});if(this.ceiling.visible=Y==="ceiling",this.ceiling.visible){let D=i8(),M=J<D?W9(H,D,J)*0.04:0;this.shards.forEach((V,F)=>{let O=Math.max(0,J-D-V.delay);a0.position.copy(V.p).addScaledVector(V.v,O),a0.position.y-=9*O*O,a0.position.y+=Math.sin(J*40+F)*M,a0.quaternion.setFromAxisAngle(V.axis,O*V.spin),a0.scale.setScalar(1),a0.updateMatrix(),this.panes.setMatrixAt(F,a0.matrix),this.rims.setMatrixAt(F,a0.matrix)}),this.panes.instanceMatrix.needsUpdate=this.rims.instanceMatrix.needsUpdate=!0,this.rims.material.opacity=0.35+K*0.3+(J>=D?0.2:0),this.rims.material.color.copy(S7).lerp(new Y0(16777215),J>=D?0.6:0)}let N=Q.ride;for(let D of this.rings)D.visible=!1;if(this.moon.visible=!1,this.meetings.visible=!1,N){let D=Q8(),M=E6(J);this.rings.forEach((V,F)=>{let O=F*D+((J-M*D)%D+D)%D;if(O>3||M-F<0)return;let z=this.rideU(J-O,N.a,N.b);V.visible=!0,V.position.copy(this.path.getPointAt(z)),V.quaternion.setFromUnitVectors(k7(0,0,1),this.path.getTangentAt(z)),V.scale.setScalar(0.6+O*7),V.material.opacity=Math.exp(-O*1.6)*0.9,V.material.color.copy(N.hushed?S7:F%2?qJ:Y6)})}if(Y==="intro"){let D=$9($0(J,0,I(0)));U.position.set(j(t7+2,l7+8,D),j(0.9,7.5,D),j(7,34,D)),Z.set(j(t7+8,l7+12,D),j(0.4,6,D),0)}else if(Y==="years"){let D=KQ(this.drawX(J,"years"));Z.set(j(l7+14,h9-6,$0(J,H,I(3))),Math.min(D,60)*0.55+2,0),U.position.set(Z.x-10,Z.y*0.5+2,30+Math.min(D,60)*0.55)}else if(Y==="linear"){let D=$9($0(J,H,I(4)));U.position.set(-10,15,j(84,74,D)),Z.set(-8,13,0)}else if(Y==="waiting"){let D=$0(J,H,I(7));U.position.set(t7-12+D*3,3.2,16-D*3),Z.set(l7+4,6+D*3,0)}else if(Y==="ceiling"){let D=i8(),M=$9($0(J,D,D+1.6));U.position.set(y8(s8)-16,j(20,26,M),j(34,46,M)),Z.set(y8(s8)+j(0,2,M),j(s8-3,s8+22,M),0)}else if(Y==="flat"){let D=$9($0(J,H,I(27)));U.position.set(j(h9-30,h9-18,D),22,j(78,70,D)),Z.set(h9-10,24,0)}else if(Y==="ride"&&N){let D=I(N.first),M=N.first+2;if(this.fog.density=0.011+0.07*n5(J,I(M),I(M+1)-0.1,0.4,0.3),this.moon.visible=!0,this.moon.material.opacity=n5(J,I(N.first+1)-0.3,I(M)-0.2,0.5,0.5),this.meetings.visible=N.hushed,N.hushed)this.meetings.count=Math.min(512,2**Math.max(0,Math.floor((J-D)/(Q8()*2))));let V=this.rideU(J,N.a,N.b),F=this.path.getPointAt(V),O=this.path.getPointAt(Math.min(1,V+0.04)),z=J<I(N.first+1)-0.2?0:J<I(M)-0.2?1:J<I(M+1)-0.2?2:3;if(z===1){let C=$0(J,I(N.first+1)-0.2,I(M)-0.2);U.position.set(j(l7-10,l7-4,C),2.5,j(58,48,C)),Z.set(l7+18,j(18,24,C),0),U.fov=50}else if(z===3){let C=$0(J,I(M+1)-0.2,N.b),R=j(-0.5,0.6,C);U.position.set(h9-9+Math.sin(R)*6,1.2,Math.cos(R)*8),Z.set(h9-1,j(30,70,$9(C)),0),U.fov=72}else{let C=W9(0.35,0.8,V);U.position.set(F.x-j(2.5,9,C),F.y+j(1.4,-3,C),(N.hushed?7:4.5)+C*12),Z.copy(O).setZ(0),U.fov=N.hushed?46:58}}else if(Y==="terrified"&&N){let D=$0(J,H,KO(Q)),M=j(-0.9,1.4,$9(D)),V=N.hushed?48:j(26,40,D);U.position.set(h9+Math.sin(M)*V,j(78,46,D),Math.cos(M)*V),Z.set(h9-3,j(70,40,D),0),U.fov=48,this.fog.density=0.004}else if(Y==="bridge"){let D=$0(J,H,I(47));U.position.set(j(h9-60,h9-40,D),j(20,30,D),j(110,80,D)),Z.set(h9-10,35,0),this.fog.density=0.005}else{let D=I(53)+0.6,M=r8($0(J,D,n0(53)+1.8)),V=j(W6,W6+600,M);this.tip.position.set(h9,V,0),this.beam.visible=V>W6+0.5,this.beam.position.set(h9,W6,0),this.beam.scale.set(1,V-W6,1),U.position.set(h9-50,18,95),Z.set(h9-12,j(36,80,$9($0(J,D,n0(53)+2.2))),0),this.fog.density=0.004}}rideU(J,Q,Z){let $=$0(J,Q,Z);return j(0.05,0.985,$*$*0.35+$9($)*0.65)}roadShot(J,Q,Z,$){let K=this.camera,U=Q.at,H=J-U;this.road.visible=!0;let Y=Q.name==="tesla";this.prius.visible=!Y,this.tesla.visible=Y;let W=Y?46:15,X=H*W%6;for(let q=0;q<2;q++)for(let N=0;N<50;N++)a0.position.set(q?1.8:-1.8,0.01,12-N*6+X),a0.rotation.set(0,0,0),a0.scale.setScalar(1),a0.updateMatrix(),this.dashes.setMatrixAt(q*50+N,a0.matrix);let G=H*W%16;for(let q=0;q<2;q++)for(let N=0;N<24;N++)a0.position.set(q?7.5:-7.5,3.2,12-N*16+G),a0.updateMatrix(),this.poles.setMatrixAt(q*24+N,a0.matrix);for(let q=0;q<120;q++){let N=15-(H*90+M0(q)*260)%260;a0.position.set((M0(q+1)-0.5)*30,0.4+M0(q+2)*7,N),a0.updateMatrix(),this.streaks.setMatrixAt(q,a0.matrix)}if(this.dashes.instanceMatrix.needsUpdate=this.poles.instanceMatrix.needsUpdate=this.streaks.instanceMatrix.needsUpdate=!0,this.streaks.material.opacity=Y?0.25+$*0.5:0,Y){this.tesla.position.set(0,0,0),this.tesla.rotation.set(0,0,0);let q=$9($0(J,U,I(2))),N=j(1.15,0.12,q);K.position.set(Math.sin(N)*11,j(1.2,2.8,q),Math.cos(N)*11-1.2),Z.set(0,0.7,-2.5)}else{let q=1.15*Math.sin(H*2.2)+0.45*Math.sin(H*5.1+1),N=2.53*Math.cos(H*2.2)+2.295*Math.cos(H*5.1+1);this.prius.position.set(q,0,0),this.prius.rotation.set(0,-N*0.06,N*0.01),K.position.set(q*0.35+1.2,2.8,8.5),Z.set(q*0.5,0.6,-8)}}engineShot(J,Q,Z,$){let K=this.camera,U=J-Q;this.engine.visible=!0;let H=U*(5+U*2.2);for(let G of this.stages)G.g.rotation.z=H*G.speed;this.core.scale.setScalar(0.8+$*0.8),this.core.material.opacity=0.5+$*0.5;let Y=this.exhaust.geometry.attributes.position;for(let G=0;G<Y.count;G++){let q=(U*(0.8+M0(G)*0.6)+M0(G+1))%1,N=(0.3+q*2.2)*Math.sqrt(M0(G+2)),D=M0(G+3)*6.283+U*3;Y.setXYZ(G,Math.cos(D)*N,Math.sin(D)*N,-5-q*28)}Y.needsUpdate=!0,this.exhaust.material.opacity=0.4+$*0.6;let W=$9($0(J,Q,I(6))),X=j(0.65,2.2,W);K.position.set(Math.sin(X)*13,j(2.5,4,W),Math.cos(X)*13),Z.set(0,0,j(0,-4,W))}slabShot(J,Q,Z,$){let K=this.camera,U=Q.at;this.slabs.visible=!0,this.approved.visible=Q.name==="procure";let H=new Y0(3817552);this.slab.forEach((G,q)=>{let N=1,D=S7,M=0,V=0.9;if(Q.name==="releases"){let F=U+0.15+q*((n0(8)-U)/12);N=B9($0(J,F,F+0.25)),D=q===Math.floor((J-U-0.15)/((n0(8)-U)/12))?qJ:S7}else if(Q.name==="eol"){let F=J0(12,/^live/i);if(N=q<11?1:B9($0(J,F-0.2,F+0.15)),D=q===11?J>=F?qJ:S7:q===10?Y6:H,q===10)D=J>=J0(13,/^end/i)?H:Y6;let O=J0(13,/^end/i)+(10-q)*0.06;M=q<11?r8($0(J,O,O+0.7)):0,V=q<11?0.5:1}else N=1,D=q===3?J>=J0(28,/^four/i)?l$:H:q===8?J>=J0(28,/^nine/i)?Y6:H:H,V=q===8&&J>=J0(28,/^nine/i)?1:0.6;G.g.scale.set(1,Math.max(0.001,N),1),G.g.rotation.z=-M*1.45,G.g.position.y=-M*0.5,G.edge.material.color.copy(D),G.edge.material.opacity=V*(0.6+$*0.4),G.tag.material.color.copy(D).multiplyScalar(0.7),G.tag.visible=N>0.3,G.mesh.material.emissive=D.clone().multiplyScalar(q===8&&Q.name==="procure"&&J>=J0(28,/^nine/i)?0.5:0.05)});let Y=this.slab[3],W=this.slab[8],X=this.slab[11];if(Q.name==="procure"){this.approved.position.set(Y.x,Y.h+3,0),$Q(this.approved,B9($0(J,J0(27,/^nod/i),J0(27,/^nod/i)+0.3)));let G=$9($0(J,J0(28,/^nine/i)-0.3,J0(28,/^nine/i)+1));K.position.set(j(Y.x+2,W.x-4,G),j(4,W.h*0.6,G),j(14,26,G)),Z.set(j(Y.x,W.x,G),j(Y.h*0.6,W.h*0.7,G),0)}else if(Q.name==="releases"){let G=$0(J,U,I(9)),q=Math.min(11,Math.floor(G*12)),N=this.slab[q];K.position.set(j(-6,X.x-20,G),j(3,14,G),j(16,34,G)),Z.set(N.x-2,N.h*0.5,0)}else{let G=$9($0(J,U,I(14)));K.position.set(j(X.x-34,X.x-22,G),j(16,22,G),j(80,70,G)),Z.set(X.x-14,j(16,20,G),0)}}cometShot(J,Q,Z){let $=this.camera;this.comet.visible=!0;let K=$0(J,I(9)-0.08,I(10)-0.08),U=k7(j(-40,30,K),j(14,4,K)+Math.sin(K*3)*2,j(-30,0,K)),H=k7(70,-10,30).normalize();this.cometHead.position.copy(U),this.cometHead.rotation.set(Q*2,Q*3,0),this.phoneLid.rotation.x=-0.4-Math.abs(Math.sin(Q*9))*0.8;let Y=this.tail.geometry.attributes.position;for(let W=0;W<Y.count;W++){let X=M0(W),G=X*X*26,q=0.2+G*0.12;Y.setXYZ(W,U.x-H.x*G+(M0(W+1)-0.5)*q*2,U.y-H.y*G+(M0(W+2)-0.5)*q*2+Math.sin(Q*4+W)*0.05,U.z-H.z*G+(M0(W+3)-0.5)*q*2)}Y.needsUpdate=!0,$.position.set(U.x-6,U.y+2.5,U.z+14),Z.copy(U)}agentShot(J,Q,Z,$){let K=this.camera,U=Q.at;this.agents.visible=!0;let H=Q.name==="kernel",Y=new Y0;for(let G=0;G<40;G++){let q=G/40*Math.PI*2,N=G%2?7:10,D=0.9+M0(G)*0.8,M=(J-U+M0(G+1)*D)%D/D,V=Math.exp(-M*8);a0.position.set(Math.cos(q)*N,0.6+V*0.8,Math.sin(q)*N),a0.rotation.set(0,q+J*0.4,0),a0.scale.setScalar(0.9),a0.updateMatrix(),this.agentCubes.setMatrixAt(G,a0.matrix),this.agentEdges.setMatrixAt(G,a0.matrix),Y.set(H?2759236:1714746).lerp(l$,V*0.8),this.agentCubes.setColorAt(G,Y)}if(this.agentCubes.instanceMatrix.needsUpdate=this.agentEdges.instanceMatrix.needsUpdate=!0,this.agentCubes.instanceColor)this.agentCubes.instanceColor.needsUpdate=!0;this.agentEdges.material.opacity=0.4+$*0.4;let W=$0(J,U,H?I(25):I(12)),X=j(0.3,1.6,W);K.position.set(Math.sin(X)*22,j(12,7,W),Math.cos(X)*22),Z.set(0,1,0)}roomShot(J,Q,Z,$){let K=this.camera,U=Q.at;this.room.visible=!0;let H=Q.name==="standup",Y=Q.name==="premeeting",W=Q.name==="moved",X=Q.name==="triple";this.table.visible=!H;let G=H?I(16):Q.name==="cab"?I(23):Y?I(47):W?I(53):X?I(52):I(35);for(let M=0;M<12;M++)if(H){let V=M/11*Math.PI*2,F=M===11;this.roomPeople.set(M,F?0:Math.cos(V)*4,F?0:Math.sin(V)*4,F?1.05:0.95+M0(M)*0.15,F?Math.sin(J*9)*0.12*(1-$0(J,I(15),I(15)+0.5)):Math.sin(J+M)*0.03)}else{let V=M%2?1:-1,O=-3.5+Math.floor(M/2)*1.45,z=Y?B9($0(J,I(43)+M*0.3,I(43)+M*0.3+0.4)):1,C=W?r8($0(J,J0(52,/^moved/i)+M0(M)*1.2,J0(52,/^moved/i)+M0(M)*1.2+1.4)):0;this.roomPeople.set(M,O+C*V*3,V*(1.95+C*9),Math.max(0.001,(0.95+M0(M)*0.12)*z),Math.sin(J*0.8+M)*0.02,C<0.05)}this.roomPeople.done(),this.screen.material.map=this.boards[Q.name==="triple"?"tentative":Q.name]??this.boards.standup,this.screen.material.color.setScalar(0.6+$*0.1);let q=$9($0(J,X?J0(51,/^tentative/i):U,G)),N=j(H?0.4:-0.6,H?1.4:0.5,q),D=H?12:13;if(H)K.position.set(Math.sin(N)*D,j(7,4.5,q),Math.cos(N)*D),Z.set(0,1,0);else{let M=j(0.75,1.2,q);K.position.set(Math.sin(M)*D*0.8+1,j(4.5,3.6,q),Math.cos(M)*D*0.55),Z.set(-4.2,2.6,0)}}fabShot(J,Q,Z,$){let K=this.camera;this.fab.visible=!0,this.wafer.rotation.y=Q*0.6,this.laser.material.opacity=0.5+$*0.5,this.laser.scale.set(1+$*2,1,1+$*2),this.laser.position.set(Math.sin(Q*7)*2.5,0.2,Math.cos(Q*5)*2.5);let U=Math.floor(70*$0(J,J0(30,/^seventy/i),J0(30,/^dutch/i)+0.3)),H=J>=J0(30,/^out/i),Y=new Y0;for(let X=0;X<70;X++)this.machines.setColorAt(X,Y.copy(X<U&&!H?VH.clone().multiplyScalar(0.45):new Y0(2106156)));if(this.machines.instanceColor)this.machines.instanceColor.needsUpdate=!0;let W=$9($0(J,I(29),I(31)));K.position.set(j(9,-6,W),j(9,14,W),j(12,26,W)),Z.set(j(0,-8,W),j(0.5,0,W),j(0,-10,W))}sunShot(J,Q,Z){let $=this.camera;this.sun.visible=!0;let K=$0(J,J0(31,/^mind/i)-0.3,n0(32)),U=this.swarmDirs.length;for(let W=0;W<U;W++){let X=this.swarmDirs[W],G=M0(W*7)*0.9,q=$9($0(K,G,G+0.1));a0.position.copy(X).multiplyScalar(j(30,6.6,q)),a0.lookAt(0,0,0),a0.scale.setScalar(Math.max(0.001,q)),a0.updateMatrix(),this.swarm.setMatrixAt(W,a0.matrix)}this.swarm.instanceMatrix.needsUpdate=!0,this.swarm.rotation.y=J*0.15;let H=1-K*0.75;this.sunBall.material.color.setRGB(0.75*H,0.55*H,0.28*H),this.sunHalo.material.opacity=(0.35+Z*0.2)*H;let Y=j(-0.4,0.5,$0(J,I(31),I(33)));$.position.set(Math.sin(Y)*40,6,Math.cos(Y)*40),Q.set(0,0,0)}proteinShot(J,Q){let Z=this.camera;this.protein.visible=!0;let $=$9($0(J,J0(35,/^fold/i),J0(35,/^proteins/i)+0.6)),K=k7();this.coil.forEach((H,Y)=>{K.copy(H).lerp(this.helix[Y],$),a0.position.copy(K),a0.rotation.set(0,0,0),a0.scale.setScalar(1),a0.updateMatrix(),this.beads.setMatrixAt(Y,a0.matrix)}),this.beads.instanceMatrix.needsUpdate=!0,this.beads.rotation.y=J*0.5,this.globe.visible=J>=J0(35,/^climate/i)-0.1,this.globe.scale.setScalar(Math.max(0.001,B9($0(J,J0(35,/^climate/i)-0.1,J0(35,/^climate/i)+0.3)))),this.globe.rotation.y=J*0.3;let U=$9($0(J,I(36),I(36)+0.8));this.protein.scale.setScalar(j(1,0.35,U)),Z.position.set(j(-2,0,U),j(9,3,U),j(22,24,U)),Q.set(j(1,6,U),0,0)}render(){this.composer.render()}}var KO=(J)=>{let Q=BH??=qZ();return Q[Q.indexOf(J)+1]?.at??q7()},n5=(J,Q,Z,$,K)=>W9(Q,Q+$,J)*(1-W9(Z-K,Z,J));var UO=/^(exponential|gain|steep|ceiling|go|shot|engine|jet|thrust|stall|out|ten|contain|vertical|demigod|sun|apocalypse|singularity's|steeper|terrified|doubling|comet's|nine's)$/,HO=/^(prius|tesla|linear|claude|phone|model|brain|plane|kernel|agents|terminal|proteins|climate|grid|euv|dutch|curve)$/,YO=/^(not|yet|no|waiting|you're|thirty|minutes|hands|off|ticket|committee|board|rollback|office|flat|stable|procurement|eighteen|months|compliance|soc|questionnaire|weeks|lawyer|consultancy|bonus|teams|inbox|pre-meeting|meeting|tentative|thursday|quorum|thrilled)$/,i5={title:"The Steep Part",fonts:['400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
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
    <div class="bub ai" data-at="W36:so">Done. <b>Inbox 0.</b></div></div>`,endAt:()=>n0(53)+2.4,words:{hot:UO,ice:HO,gold:YO},hud:(J,Q)=>{let Z=Math.floor(E6(J)/4);return{left:`the steep part &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`doublings <span class="ice">${Z}</span> &nbsp;·&nbsp; compute <b>×2<sup>${Z}</sup></b>`}},shots:qZ,shotAt:c$,world:(J)=>{let Q=new _H(J);return{update:(Z)=>Q.update(Z),render:()=>Q.render(),flash:(Z)=>Math.min(0.9,Q.flash(Z))*(Z>=i8()&&Z<i8()+1?0.8:0.6),fade:(Z)=>Q.fade(Z)}}};var w9=(J,Q,Z,$)=>({name:J,at:Q,label:Z,section:$}),o5=(J,Q)=>[w9("here",I(J)-0.3,"data here, data there",Q),w9("crates",I(J+2)-0.2,"databricks, dataiku, sap",Q),w9("kevin",I(J+4)-0.2,"the app kevin built",Q),w9("plant",I(J+5)-0.2,"the plant",Q),w9("nobody",I(J+6)-0.2,"nobody knows",Q),w9("finale",I(J+8)-0.2,"data, data everywhere",Q)];function s$(){return[w9("overture",0,"team! big news!","intro"),w9("curtain",I(1)-0.3,"we're gonna AI","intro"),w9("kickline",I(2)-0.4,"it's gonna fix everything","verse 1"),w9("pitch",I(4)-0.2,"give us all your data","verse 1"),w9("vendor",I(6)-0.2,"the vendor rolled in","pre-chorus"),w9("where",I(8)-0.15,"where's the data?","pre-chorus"),w9("quiet",I(9)-0.2,"here's the thing","pre-chorus"),...o5(11,"chorus"),w9("chain",I(21)-0.6,"ask denise","verse 2"),w9("tickets",I(27)-0.2,"three ticket systems","pre-chorus"),w9("meeting",I(29)-0.2,"fourteen people","pre-chorus"),...o5(35,"chorus"),w9("closet",I(45)-0.6,"a server by the press","verse 3"),w9("cloud",I(47)-0.2,"just sync it up to azure","verse 3"),w9("xp",I(49)-0.2,"windows xp","verse 3"),w9("truths",I(51)-0.5,"nine sources of truth","bridge"),w9("swamp",I(52)-0.2,"the data lake's a swamp","bridge"),w9("raci",I(53)-0.2,"a raci for the raci","bridge"),w9("stan",I(54)-0.2,"ask stan","bridge"),w9("pilot",I(55)-0.2,"the pilot's in a pilot","bridge"),w9("oil",I(56)-0.2,"data is the new oil","bridge"),w9("call",I(59)-0.3,"can everyone see my screen?","breakdown"),w9("curtain",I(66)-0.5,"we're gonna AI (key change)","final chorus"),w9("agents",I(68)-0.2,"agents running everything","final chorus"),w9("lock",J0(69,/^kidding/i)-0.3,"kidding. nobody knows how.","final chorus"),w9("crates",I(70)-0.2,"databricks, dataiku, sap","final chorus"),w9("confluence",I(72)-0.2,"only with the direct link","final chorus"),w9("github",I(73)-0.2,"everywhere but github","final chorus"),w9("nobody",I(74)-0.2,"where's the data?","final chorus"),w9("finale",I(77)-0.2,"data, data... everywhere","final chorus"),w9("curtaincall",I(79)-0.5,"a recurring meeting","outro"),w9("end",n0(82)+0.2,"the end","outro")]}var e5=null,n$=(J)=>{let Q=e5??=s$(),Z=Q[0];for(let $ of Q)if($.at<=J)Z=$;return Z},WO=(J)=>{let Q=e5??=s$();return Q[Q.indexOf(J)+1]?.at??q7()},XO=9049124,AH=14263361;var a5=1714778,GO={overture:2361364,curtain:2767514,kickline:2767514,pitch:3811978,vendor:9067028,where:328968,quiet:328968,here:8002122,crates:1723002,kevin:2775610,plant:3815978,nobody:4856346,finale:8002122,chain:2763354,tickets:4864538,meeting:1714746,closet:1316884,cloud:2775712,xp:1723040,truths:3807834,swamp:1718820,raci:2763322,stan:328968,pilot:5929648,oil:2759178,call:658452,agents:1718874,lock:4856346,confluence:1718906,github:1052692,curtaincall:3807780,end:328968},r5=new Map,N7=(J,Q=0.7,Z=0)=>{let $=`${J}:${Q}:${Z}`,K=r5.get($);if(!K)r5.set($,K=new K9({color:J,roughness:Q,metalness:0,emissive:Z?J:0,emissiveIntensity:Z}));return K},f9=(J,Q,Z=0,$=0,K=0)=>{let U=new f(J,Q);return U.position.set(Z,$,K),U.castShadow=!0,U.receiveShadow=!0,U},s9=(J,Q,Z,$,K=0,U=0,H=0)=>f9(new _0(J,Q,Z),N7($),K,U,H);function vJ(J,Q,Z){let $=document.createElement("canvas");$.width=J,$.height=Q,Z($.getContext("2d"));let K=new G7($);return K.colorSpace=F7,K.anisotropy=4,K}function R8(J,Q,Z,$={}){let K=vJ(Math.round(Q*160),Math.round(Z*160),(U)=>{let H=U.canvas.width,Y=U.canvas.height;U.fillStyle=$.bg??"#f3ead2",U.fillRect(0,0,H,Y),U.strokeStyle=$.fg??"#1d1a22",U.lineWidth=Y*0.05,U.strokeRect(Y*0.04,Y*0.04,H-Y*0.08,Y-Y*0.08),U.fillStyle=$.fg??"#1d1a22",U.textAlign="center",U.textBaseline="middle";let W=Y*($.sub?0.4:0.5);U.font=`${$.font??"900"} ${W}px "DM Serif Display", Georgia, serif`;while(U.measureText(J).width>H*0.88)W*=0.92,U.font=`${$.font??"900"} ${W}px "DM Serif Display", Georgia, serif`;if(U.fillText(J,H/2,$.sub?Y*0.4:Y/2),$.sub)U.font=`600 ${Y*0.17}px "JetBrains Mono", monospace`,U.fillText($.sub,H/2,Y*0.74)});return f9(new F9(Q,Z),new K9({map:K,roughness:0.8}))}var e7=new k9,U9=(J=0,Q=0,Z=0)=>new k(J,Q,Z),NO=U9(0,1,0),qO=new T0(0.075,0.085,1,8).translate(0,0.5,0),DO=new T0(0.11,0.09,0.95,10).translate(0,-0.475,0);function G6(J){let Q=new O0,Z=J.robot?10134445:[15254688,13012578,9263675,15782582,7029808][Math.floor(M0(J.seed)*5)],$=J.pants??2763316;if(Q.add(f9(new T0(0.27,0.24,0.72,14),N7(J.shirt),0,1.3,0)),Q.add(f9(new T0(0.25,0.27,0.22,14),N7($),0,0.92,0)),J.tie)Q.add(s9(0.08,0.42,0.03,J.tie,0,1.38,0.27));let K=J.robot?s9(0.42,0.4,0.4,Z,0,1.9,0):f9(new c0(0.21,16,12),N7(Z),0,1.88,0);if(J.robot)K.add(f9(new _0(0.28,0.07,0.02),N7(8057087,0.4,1.5),0,0.02,0.21));if(J.hat)K.add(f9(new c0(0.23,14,8,0,Math.PI*2,0,Math.PI/2),N7(J.hat),0,0.05,0));Q.add(K);let U=[-1,1].map((W)=>{let X=new f(DO,N7($));return X.position.set(W*0.12,0.95,0),X.castShadow=!0,X.add(f9(new _0(0.14,0.08,0.3),N7(1381402),0,-0.93,0.06)),Q.add(X),X}),H=[-1,1].map(()=>{let W=f9(new c0(0.075,10,8),N7(Z));return Q.add(W),W}),Y=[0,1].map(()=>{let W=new f(qO,N7(J.shirt));return W.castShadow=!0,Q.add(W),W});return Object.assign(Q.userData,{head:K,hands:H,arms:Y,legs:U,seed:J.seed}),Q}var FO={down:[0.34,0.95,0.12],up:[0.42,2.45,0.05],jazz:[0.72,2,0.3],shrug:[0.62,1.42,0.42],point:[0.3,1.75,0.85],out:[0.95,1.6,0.1],face:[0.16,1.82,0.32]};function J8(J,Q,Z,$=0,K=0,U=0.04,H){let{hands:Y,arms:W,legs:X,seed:G,head:q}=J.userData;J.rotation.z=Math.sin(Q*Math.PI*2.2+G)*U,q.rotation.x=Z==="face"?0.35:0,Y.forEach((N,D)=>{let M=D?1:-1,[V,F,O]=FO[D&&H?H:Z];N.position.set(M*V,F+(Z==="jazz"?Math.sin(Q*30+D)*0.03:0),O);let z=U9(M*0.26,1.6,0.02),C=N.position.clone().sub(z);W[D].position.copy(z),W[D].quaternion.setFromUnitVectors(NO,C.clone().normalize()),W[D].scale.set(1,C.length(),1)}),X.forEach((N,D)=>{N.rotation.x=D===K?-$*1.45:$*0.1})}var zH=[{name:"Databricks",word:/^databricks/i,color:"#d8452f"},{name:"Dataiku",word:/^dataiku/i,color:"#2ab1ac"},{name:"SAP",word:/^sap$/i,color:"#1a6fd1"},{name:"S3",word:/^s3/i,color:"#d88a1a"},{name:"Redshift",word:/^redshift/i,color:"#8c4fd1"},{name:"Azure",word:/^azure/i,color:"#2a86e0"},{name:"ServiceNow",word:/^servicenow/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^\W*times/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^three/i,color:"#3f9a4a"}],t5=[{label:"My boss",word:/^boss/i},{label:"Denise",word:/^denise/i},{label:"Platform team",word:/^platform/i},{label:"#data-access",word:/^slack/i},{label:"Gary (OOO)",word:/^gary/i},{label:"A guy who knows a guy",word:/^guy$/i}];class PH{renderer;scene=new o7;camera=new Q7(45,1.7777777777777777,0.1,400);composer;bloom;wash=new M8(16771272,2758672,0.5);key=new d7(16773336,0.6);spots=[];cyc;stage=new O0;curtains=[];bulbs;marquee=new O0;marqueeBulbs;marqueeBulbPos=[];seats;lead;vendorGuy;cio;line=[];deck;decks={};crates=[];github=new O0;kevin=new O0;plant=new O0;chain=[];booths=[];meeting=new O0;clockHand;closet=new O0;fan;xpScreen;cloud=new O0;plantGuy;agents=[];padlock=new O0;door=new O0;swamp;tomb;planes=[];barrels=new O0;stanSign;confetti;constructor(J){this.renderer=new W8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=LJ,this.renderer.toneMapping=K8,this.scene.background=new Y0(328711),this.composer=new S8(this.renderer),this.composer.addPass(new j8(this.scene,this.camera)),this.bloom=new X8(new q0(1920,1080),0.55,0.5,0.82),this.composer.addPass(this.bloom),this.composer.addPass(new k8),this.key.position.set(0,18,20),this.scene.add(this.wash,this.key),this.buildStage(),this.buildPeople(),this.buildProps(),this.scene.add(this.stage)}buildStage(){let J=this.stage,Q=vJ(1024,512,(W)=>{for(let X=0;X<32;X++){W.fillStyle=`hsl(28, ${38+M0(X)*10}%, ${22+M0(X+4)*8}%)`,W.fillRect(0,X*16,1024,15),W.fillStyle="rgba(0,0,0,.35)",W.fillRect(0,X*16+15,1024,1);for(let G=0;G<3;G++)W.fillRect(M0(X*5+G)*1024,X*16,2,15)}});Q.wrapS=Q.wrapT=m8,Q.repeat.set(2,2);let Z=f9(new _0(30,1,14),new K9({map:Q,roughness:0.55}),0,-0.5,-2.5);J.add(Z),this.cyc=new f(new F9(34,18),new v9({uniforms:{color:{value:new Y0(a5)},glow:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 color; uniform float glow; varying vec2 vUv;
        void main() { float g = smoothstep(0.0, 0.55, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y)) * 0.9 + 0.1;
          float h = exp(-pow((vUv.y - 0.12) * 5.0, 2.0)) * 0.8;
          gl_FragColor = vec4(color * (g + h) * glow, 1.0); }`})),this.cyc.position.set(0,7.5,-8.2),J.add(this.cyc);let $=new K9({color:AH,roughness:0.35,metalness:0.7});for(let W of[-12.4,12.4])J.add(f9(new _0(1.4,14,1),$,W,6.5,4.9));J.add(f9(new _0(26.2,1.6,1),$,0,13.3,4.9)),J.add(s9(24,2.2,0.2,789008,0,11.6,4.4));let K=new F9(12,12.6,48,1),U=K.attributes.position;for(let W=0;W<U.count;W++)U.setZ(W,Math.sin(U.getX(W)*4.2)*0.18);K.computeVertexNormals();let H=new K9({color:XO,roughness:0.8,side:m9});for(let W of[-1,1]){let X=f9(K,H,W*6,6.3,4.3);this.curtains.push(X),J.add(X);let G=f9(K,H,W*13.5,6.3,3.6);G.scale.x=0.35,J.add(G)}this.bulbs=new j9(new c0(0.09,10,8),new h0({color:16767120}),40);for(let W=0;W<40;W++)e7.position.set(-11.5+W*0.59,0.08,4.2),e7.updateMatrix(),this.bulbs.setMatrixAt(W,e7.matrix);J.add(this.bulbs,s9(24,0.18,0.4,1708556,0,0,4.35)),this.seats=new j9(new _0(0.62,0.95,0.6),N7(5901336),220);let Y=0;for(let W=0;W<10;W++)for(let X=0;X<22;X++)e7.position.set(-11+X*1.05,0+W*0.32-0.6,8+W*1.2),e7.updateMatrix(),this.seats.setMatrixAt(Y++,e7.matrix);J.add(this.seats);for(let[W,X,G]of[[-9,16,18],[9,16,18],[0,18,16]]){let q=new i6(16774368,0,60,0.16,0.45,1.2);q.position.set(W,X,G),q.castShadow=!0,q.shadow.mapSize.set(1024,1024),q.shadow.bias=-0.0005,this.scene.add(q,q.target);let N=new f(new T0(0.05,1,1,24,1,!0).translate(0,-0.5,0),new h0({color:16773328,transparent:!0,opacity:0.06,blending:H7,depthWrite:!1,side:m9}));this.scene.add(N),this.spots.push({light:q,beam:N})}}buildPeople(){this.lead=G6({shirt:2771594,pants:1844280,tie:13120058,seed:3}),this.vendorGuy=G6({shirt:13148240,pants:9071146,tie:1710618,seed:8}),this.cio=G6({shirt:3816004,pants:2236970,tie:6982351,seed:11}),this.plantGuy=G6({shirt:5925498,pants:2767450,seed:14,hat:15777824});let J=[15262938,9089240,14196904,12114080,15257744,12626144,15790320,9488584];for(let Q=0;Q<8;Q++)this.line.push(G6({shirt:J[Q],tie:Q%2?2763370:void 0,seed:20+Q}));for(let Q=0;Q<3;Q++)this.agents.push(G6({shirt:10134445,pants:6976381,seed:40+Q,robot:!0}));for(let Q of[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents])this.stage.add(Q)}buildProps(){let J=this.stage,Q=vJ(1600,400,(R)=>{R.fillStyle="#1a0f08",R.fillRect(0,0,1600,400),R.fillStyle="#ffe9b0",R.textAlign="center",R.textBaseline="middle";let B=210;R.font=`400 ${B}px "Limelight", "DM Serif Display", serif`;while(R.measureText("WE'RE GONNA AI!").width>1440)B-=6,R.font=`400 ${B}px "Limelight", "DM Serif Display", serif`;R.fillText("WE'RE GONNA AI!",800,212)});this.marquee.add(f9(new _0(16.4,4.4,0.4),N7(2759184)));let Z=new f(new F9(15.6,3.9),new K9({map:Q,emissive:16777215,emissiveMap:Q,emissiveIntensity:0.55}));Z.position.z=0.21,this.marquee.add(Z);for(let R=0;R<64;R++){let P=R/64*40.4,E=0,A=0;if(P<16)E=-8+P,A=2.1;else if((P-=16)<4.2)E=8,A=2.1-P;else if((P-=4.2)<16)E=8-P,A=-2.1;else P-=16,E=-8,A=-2.1+P;this.marqueeBulbPos.push(U9(E,A,0.3))}this.marqueeBulbs=new j9(new c0(0.13,10,8),new h0({color:16777215}),64),this.marqueeBulbPos.forEach((R,B)=>{e7.position.copy(R),e7.updateMatrix(),this.marqueeBulbs.setMatrixAt(B,e7.matrix)}),this.marquee.add(this.marqueeBulbs);for(let R of[-6,6])this.marquee.add(f9(new T0(0.02,0.02,10),N7(8947848),R,7.2,0));J.add(this.marquee),this.deck=new f(new F9(9,5.06),new K9({color:16777215,emissive:16777215,emissiveIntensity:0.22})),this.deck.position.set(2.5,5.2,-6.5),J.add(this.deck);let $=(R,B,_,P)=>vJ(1280,720,(E)=>{E.fillStyle=_,E.fillRect(0,0,1280,720),E.fillStyle=P,E.textAlign="center",E.font='900 120px "DM Serif Display", Georgia, serif',E.fillText(R,640,330),E.font='600 46px "JetBrains Mono", monospace',E.fillText(B,640,450)});this.decks={vendor:$("Live by Q3!","AI that fixes everything™","#f6f1e4","#1a3a8a"),pilot:$("Demo: ✓ crushed it","now with your data…","#f6f1e4","#1a6a3a"),tears:$("ERROR","null · null · null · NaN","#2a0a0e","#ff6a6a"),oil:$("Data is the new oil!","every deck, every quarter","#141010","#f0c060")};let K=(R,B)=>vJ(512,512,(_)=>{_.fillStyle="#b08a58",_.fillRect(0,0,512,512),_.fillStyle="rgba(60,40,20,.5)";for(let E=0;E<6;E++)_.fillRect(0,E*86,512,6);_.strokeStyle="#6a4a28",_.lineWidth=26,_.strokeRect(13,13,486,486),_.beginPath(),_.moveTo(26,26),_.lineTo(486,486),_.stroke(),_.fillStyle=B,_.fillRect(40,186,432,140),_.fillStyle="#fff",_.textAlign="center",_.textBaseline="middle";let P=84;_.font=`900 ${P}px "DM Serif Display", Georgia, serif`;while(_.measureText(R).width>400)P-=4,_.font=`900 ${P}px "DM Serif Display", Georgia, serif`;_.fillText(R,256,258)});zH.forEach((R,B)=>{let _=new O0,P=K(R.name,R.color);if(_.add(f9(new _0(1.9,1.9,1.9),new K9({map:P,roughness:0.8}),0,0.95,0)),_.userData.home=B<6?U9(-9.2+B*2.6+(B>2?2.6:0)-1.3,0,-4.5+B%2*1.2):U9(8.6,(B-6)*1.9,-2.6),B<6)_.userData.home=U9([-9.5,-6.6,-3.7,3.7,6.6,9.5][B],0,[-4.8,-3.6,-5.2,-5.2,-3.6,-4.8][B]);_.rotation.y=(M0(B)-0.5)*0.4,this.crates.push(_),J.add(_)});let U=new u7(new SJ(new _0(1.9,1.9,1.9)),new C$({color:16777215,dashSize:0.18,gapSize:0.12}));U.computeLineDistances(),U.position.y=0.95;let H=R8("GitHub",1.9,0.6,{bg:"#101014",fg:"#f0f0f0"});H.position.set(0,2.3,0),this.github.add(U,H),J.add(this.github);let Y=vJ(640,480,(R)=>{R.fillStyle="#0a0aa0",R.fillRect(0,0,640,480),R.fillStyle="#c0c0c0",R.fillRect(40,40,560,400),R.fillStyle="#000080",R.fillRect(40,40,560,44),R.fillStyle="#fff",R.font='700 30px "JetBrains Mono", monospace',R.fillText("KevinSoft Data Manager 2003",56,72),R.fillStyle="#000",R.font='600 26px "JetBrains Mono", monospace',["Records: 41,207","Last backup: 2009","Password: kevin1","Do not close!!"].forEach((B,_)=>R.fillText(B,70,150+_*60))});this.kevin.add(s9(3,0.15,1.6,6965802,0,1.4,0),s9(0.12,1.4,0.12,3811866,-1.3,0.7,0),s9(0.12,1.4,0.12,3811866,1.3,0.7,0)),this.kevin.add(s9(1.8,1.5,1.6,14208944,0,2.3,-0.1));let W=f9(new F9(1.5,1.12),new K9({map:Y,emissive:16777215,emissiveMap:Y,emissiveIntensity:0.35}),0,2.35,0.71);this.kevin.add(W,s9(1.6,0.08,0.6,14208944,0,1.52,0.5));let X=R8("Kevin's app",2.4,0.6,{sub:"built 2003 · Kevin left 2011"});X.position.set(0,3.7,0),this.kevin.add(X),J.add(this.kevin);let G=new F8([U9(-6,0),U9(-6,3),U9(-4,4.2),U9(-4,3),U9(-2,4.2),U9(-2,3),U9(0,4.2),U9(0,3),U9(6,3),U9(6,0)].map((R)=>new q0(R.x,R.y)));this.plant.add(f9(new l8(G,{depth:0.3,bevelEnabled:!1}),N7(4868690))),this.plant.add(f9(new T0(0.4,0.55,6,14),N7(5913138),3.8,5.5,0.15));let q=R8("THE PLANT",4,1,{sub:"bandwidth: 0.3 Mbps (on a good day)",bg:"#f0e6c0"});q.position.set(0.5,1.7,0.34),this.plant.add(q);for(let R=0;R<4;R++)this.plant.add(f9(new F9(0.8,0.6),N7(16765040,0.5,1.2),-4.6+R*1.6,1.6,0.32));this.plant.position.set(0,0,-6.6),J.add(this.plant),t5.forEach((R,B)=>{let _=new O0,P=B===4?null:G6({shirt:[3816004,12081786,4880986,10134445,0,9071178][B],seed:60+B,robot:B===3,tie:B===0?9050650:void 0});if(P)_.add(P);if(B===4)_.add(s9(0.8,0.08,0.8,3816004,0,0.9,0),s9(0.8,0.9,0.08,3816004,0,1.35,-0.38),s9(0.06,0.9,0.06,2236962,0,0.45,0));let E=R8(R.label,2.2,0.55,{bg:B===4?"#ffe9a0":"#f3ead2"});E.position.set(0,2.75,0),_.add(E),_.position.set(-9+B*3.6,0,-2.4+B%2*1.1),this.chain.push({group:_,who:P}),J.add(_)}),[["RESOLVED","#2f8a4a"],["DUPLICATE","#6a6a74"],["SEE TICKET 3","#c88a1a"]].forEach(([R,B],_)=>{let P=new O0;P.add(s9(2.4,2.2,1.4,2763316,0,1.1,0),s9(2.6,0.12,1.6,4868692,0,2.26,0));let E=R8(R,2.4,0.7,{bg:B,fg:"#ffffff"});E.position.set(0,1.4,0.71);let A=new f(new c0(0.3,16,12),new K9({color:new Y0(B),emissive:new Y0(B),emissiveIntensity:0}));A.position.set(0,2.7,0);let y=R8(`Ticket system #${_+1}`,2.4,0.45,{bg:"#f3ead2"});y.position.set(0,3.4,0),P.add(E,A,y),P.position.set(-6+_*6,0,-3),this.booths.push({group:P,lamp:A}),J.add(P)}),this.meeting.add(s9(12,0.15,2.2,5913124,0,1.25,-2.5));for(let R=0;R<14;R++){let B=-5.5+R%7*1.85,_=R<7?-3.9:-1.1;this.meeting.add(s9(0.7,0.08,0.7,2302764,B,0.8,_),s9(0.7,0.9,0.08,2302764,B,1.25,_+(R<7?-0.35:0.35)))}let N=vJ(256,256,(R)=>{R.fillStyle="#f6f1e4",R.beginPath(),R.arc(128,128,124,0,Math.PI*2),R.fill(),R.fillStyle="#1d1a22";for(let B=0;B<12;B++){let _=B/12*Math.PI*2;R.fillRect(128+Math.sin(_)*100-4,128-Math.cos(_)*100-10,8,20)}}),D=f9(new T7(1.1,40),new K9({map:N}),0,7.5,-7.8);this.clockHand=s9(0.08,0.9,0.04,1907234,0,7.5,-7.75),this.clockHand.geometry.translate(0,0.4,0),this.meeting.add(D,this.clockHand),J.add(this.meeting),this.closet.add(s9(0.2,7,6,5921354,-3.2,3.5,-3),s9(0.2,7,6,5921354,3.2,3.5,-3),s9(6.6,7,0.2,4868670,0,3.5,-6)),this.closet.add(s9(1.4,3,1.8,2763312,-1.2,1.5,-4.2));for(let R=0;R<6;R++)this.closet.add(f9(new c0(0.05),N7(R%2?4259680:16752672,0.5,2),-1.6+R%3*0.2,2.6-Math.floor(R/3)*0.2,-3.28));this.closet.add(s9(1.8,0.1,1.2,6965802,1.4,1.2,-4.4),s9(0.1,1.2,0.1,3811866,0.6,0.6,-4.4),s9(0.1,1.2,0.1,3811866,2.2,0.6,-4.4)),this.closet.add(s9(1.5,1.2,1.2,14208944,1.4,1.85,-4.6));let M=vJ(640,480,(R)=>{let B=R.createLinearGradient(0,0,0,300);B.addColorStop(0,"#2a6ae0"),B.addColorStop(1,"#a8d0f8"),R.fillStyle=B,R.fillRect(0,0,640,480),R.fillStyle="#4aa83a",R.beginPath(),R.moveTo(0,330),R.quadraticCurveTo(300,200,640,300),R.lineTo(640,480),R.lineTo(0,480),R.fill(),R.fillStyle="#245ed8",R.fillRect(0,440,640,40),R.fillStyle="#3a9a3a",R.fillRect(0,440,120,40),R.fillStyle="#fff",R.font='italic 700 26px "Inter", sans-serif',R.fillText("start",28,469),R.fillStyle="#f6f1e4",R.fillRect(150,120,340,150),R.fillStyle="#0a246a",R.fillRect(150,120,340,34),R.fillStyle="#fff",R.font='700 20px "Inter", sans-serif',R.fillText("Windows XP · Service Pack 2",160,144),R.fillStyle="#000",R.font='500 20px "Inter", sans-serif',R.fillText("Uptime: 4,211 days",170,200),R.fillText("Updates available: 1,906",170,235)});this.xpScreen=f9(new F9(1.3,0.98),new K9({map:M,emissive:16777215,emissiveMap:M,emissiveIntensity:0.4}),1.4,1.88,-3.99),this.closet.add(this.xpScreen),this.fan=new O0,this.fan.add(f9(new R7(0.7,0.07,8,32),N7(14211280)));for(let R=0;R<4;R++){let B=s9(0.32,0.55,0.03,9089240,0,0.3,0);B.geometry.translate(0,0,0);let _=new O0;_.add(B),_.rotation.z=R*Math.PI/2,this.fan.add(_)}this.fan.position.set(-1.2,3.8,-4.2),this.closet.add(this.fan);let V=R8("DO NOT UNPLUG",0.9,0.7,{bg:"#ffe55a",sub:"— Jess"});V.position.set(-1.2,2.2,-3.29),this.closet.add(V),J.add(this.closet);for(let R=0;R<7;R++)this.cloud.add(f9(new c0(0.9+M0(R)*0.6,18,14),N7(16054010),-2.4+R*0.8,Math.sin(R*1.3)*0.4,M0(R+3)*0.6));let F=R8("AZURE",2.6,0.7,{bg:"#2a86e0",fg:"#fff"});F.position.set(0,-1.4,1.2),this.cloud.add(F,f9(new T0(0.02,0.02,8),N7(10127978),0,-5,0)),J.add(this.cloud),this.padlock.add(f9(new R7(1.1,0.22,12,32,Math.PI),new K9({color:11579576,metalness:0.8,roughness:0.3}),0,1.6,0)),this.padlock.add(f9(new _0(3,2.4,0.9),new K9({color:AH,metalness:0.7,roughness:0.35}),0,0.4,0)),this.padlock.add(f9(new T0(0.22,0.22,0.95,16),N7(1710618),0,0.5,0.05).rotateX(Math.PI/2)),J.add(this.padlock),this.door.add(s9(3,5.6,0.3,3811866,0,2.8,0),s9(2.4,5,0.2,2775720,0,2.6,0.12));let O=R8("Confluence",2.6,0.7,{bg:"#f3ead2"});O.position.set(0,5.9,0.2);let z=R8("direct link only",2.2,0.5,{bg:"#ffe9a0"});z.position.set(0,2.9,0.26),this.door.add(O,z,f9(new c0(0.14),new K9({color:AH,metalness:0.8,roughness:0.3}),0.9,2.5,0.3)),J.add(this.door),this.swamp=f9(new T7(7,48),new K9({color:3824170,roughness:0.25,metalness:0.1}),0,0.03,-2.5),this.swamp.rotation.x=-Math.PI/2,J.add(this.swamp),this.tomb=new O0,this.tomb.add(f9(new T0(0.9,0.9,0.3,24,1,!1,0,Math.PI),N7(9079440),0,2.1,0).rotateX(Math.PI/2),s9(1.8,2.1,0.3,9079440,0,1.05,0));let C=R8("RIP CRM",1.5,0.9,{bg:"#8a8a90",sub:"2009–2021"});C.position.set(0,1.3,0.16),this.tomb.add(C),J.add(this.tomb);for(let R=0;R<2;R++){let B=new O0,_=R?0.45:1;B.add(f9(new Z7(0.9*_,3*_,3),N7(R?15782016:16183780)).rotateX(-Math.PI/2).rotateZ(Math.PI/2)),this.planes.push(B),J.add(B)}for(let R=0;R<9;R++)this.barrels.add(f9(new T0(0.6,0.6,1.6,20),N7(1710618,0.4),-8+R*2,0.8,-3+R%2*1.2));J.add(this.barrels),this.stanSign=R8("STAN?",1.6,0.6,{bg:"#f3ead2"}),J.add(this.stanSign),this.confetti=new j9(new F9(0.16,0.1),new h0({color:16777215,side:m9}),400);for(let R=0;R<400;R++)this.confetti.setColorAt(R,new Y0([16765024,16734858,5943551,8056954,16777215][R%5]));J.add(this.confetti)}flash(J){let Q=n$(J);return Q.name==="here"||Q.name==="finale"?Math.exp(-(J-Q.at)*8)*0.25:0}fade(J){return W9(q7()-0.8,q7(),J)}update(J){let Q=n$(J),Z=Q.name,$=Q.at,K=WO(Q),U=$0(J,$,K),H=J-$,Y=this.camera,W=U9(0,3,0),X=P7(J),G=E6(J),q=new Set,N=(_,P)=>{_.visible=P},D=new Y0(GO[Z]??a5);this.cyc.material.uniforms.color.value.copy(D),this.cyc.material.uniforms.glow.value=1+X*0.25;let M=Z==="where"||Z==="quiet"||Z==="stan"||Z==="call"||Z==="github"||Z==="end";this.wash.intensity=M?0.05:Z==="closet"||Z==="xp"?0.25:0.55,this.key.intensity=M?0:0.5;for(let _=0;_<40;_++)this.bulbs.setColorAt(_,new Y0(M?3811860:16767120));if(this.bulbs.instanceColor)this.bulbs.instanceColor.needsUpdate=!0;let V=Z==="overture"?0:Z==="curtain"&&$<10?$9($0(J,$,$+1.6)):Z==="curtaincall"?1-r8($0(J,I(80),n0(82))):Z==="end"?0:1;this.curtains.forEach((_,P)=>{let E=P?1:-1;_.scale.x=j(1,0.28,V),_.position.x=E*j(6,10.8,V)});let F=[null,null,null],O=[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents];for(let _ of O)_.visible=!1;for(let _ of[this.marquee,this.deck,this.github,this.kevin,this.plant,this.meeting,this.closet,this.cloud,this.padlock,this.door,this.swamp,this.tomb,this.barrels,this.stanSign,this.confetti,...this.planes])_.visible=!1;for(let _ of this.crates)_.visible=!1;for(let _ of this.chain)_.group.visible=!1;for(let _ of this.booths)_.group.visible=!1;let z=(_)=>{let P=(J-0.433)/Q8()-_*0.12,E=Math.floor(P),A=P-E;return{amount:Math.sin(S9(A)*Math.PI)*0.95,leg:(E+_)%2}},C=(_=0,P=-1.5,E="jazz")=>{this.line.forEach((A,y)=>{A.visible=!0,A.position.set(-8.4+y*2.4,_,P),A.rotation.y=0;let S=z(y);J8(A,J,E,S.amount,S.leg,0.02)})},R=(_,P,E,A=0.05)=>{this.lead.visible=!0,this.lead.position.set(_,0,P),this.lead.rotation.y=0,J8(this.lead,J,E,0,0,A)},B=OO(J);switch(Z){case"overture":{R(0,3.2,H>1.2?"jazz":"out"),F[2]=U9(0,1.6,3.2),Y.position.set(0,j(2.6,2.3,U),j(14,10.5,U)),W.set(0,2.6,3);break}case"curtain":{let _=$>100;if(this.marquee.visible=!0,this.marquee.position.set(0,j(16,8.6,B9($0(J,$+0.2,$+1.4))),-4),this.marqueeBulbPos.forEach((P,E)=>this.marqueeBulbs.setColorAt(E,new Y0((E+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;if(C(),R(0,2.2,"up"),F[0]=U9(-4,1,-1.5),F[1]=U9(4,1,-1.5),F[2]=U9(0,1.6,2.2),_)this.confettiAt(J,$);Y.position.set(0,j(4,5,U),j(20,17,U)),W.set(0,5,0),Y.fov=46;break}case"kickline":{if(this.marquee.visible=!0,this.marquee.position.set(0,8.6,-4),this.marqueeBulbPos.forEach((_,P)=>this.marqueeBulbs.setColorAt(P,new Y0((P+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;C(),R(0,2.2,X>0.5?"up":"jazz"),F[0]=U9(-4,1,-1.5),F[1]=U9(4,1,-1.5),F[2]=U9(0,1.6,2.2),Y.position.set(j(-11,11,U),1,5.5),W.set(j(-6,6,U),1.4,-1.5),Y.fov=50;break}case"pitch":{C(0,-2.6,"out"),R(0,2,J>I(5)?"out":"point"),F[2]=U9(0,1.6,2),Y.position.set(j(1.5,0.5,U),2.4,j(9.5,7.5,U)),W.set(0,2.1,1),Y.fov=40;break}case"vendor":{this.deck.visible=!0,this.deck.material.map=this.decks.vendor,this.deck.material.emissiveMap=this.decks.vendor,this.deck.material.needsUpdate=!0,this.vendorGuy.visible=!0,this.vendorGuy.position.set(j(-12,-2,$9($0(J,$,$+1.5))),0,0.5),this.vendorGuy.rotation.y=0.3,J8(this.vendorGuy,J,J>J0(7,/^q3/i)?"jazz":"point",0,0,0.06),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=-0.6,J8(this.cio,J,"down"),F[0]=this.vendorGuy.position.clone().setY(1.6),F[1]=U9(2.5,4,-6.5),Y.position.set(j(-3,0,U),3,11),W.set(0,3,-2);break}case"where":case"quiet":{if(this.vendorGuy.visible=!0,this.vendorGuy.position.set(-2,0,0.5),J8(this.vendorGuy,J,"shrug",0,0,0),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=Z==="quiet"?-0.2:-0.6,J8(this.cio,J,Z==="quiet"&&J>J0(10,/^thing/i)-1?"shrug":"down",0,0,0),F[2]=Z==="where"?U9(-2,1.6,0.5):U9(5.5,1.6,1.5),Z==="where")Y.position.set(-2,2.2,7),W.set(-2,2,0.5),Y.fov=34;else Y.position.set(j(3.2,4.2,U),2.1,j(7.5,5.5,U)),W.set(5.5,2,1.5),Y.fov=32;break}case"here":case"finale":{C(),R(0,2.4,"out");let _=J0(Q.at<100?11:Q.at<200?35:77,/^\W*there/i),P=Z==="here"&&J<_-0.1?-1:Z==="here"?1:Math.sin(J*3)>0?1:-1;if(F[0]=U9(P*7,0.5,-1),F[1]=U9(-P*3,0.5,-1),F[2]=U9(0,1.6,2.4),this.cratesUpTo(J,9,!0),Z==="finale")this.kevin.visible=this.plant.visible=!0,this.kevin.position.set(-10.5,0,1.5);if(Z==="finale"&&$>230)this.confettiAt(J,$);Y.position.set(Math.sin(J*0.3)*3,j(5,4,U),j(24,19,U)),W.set(0,3.5,-1);break}case"crates":{let _=$<100?13:$<200?37:70;this.cratesUpTo(J,9,!1,_),R(0,2.4,"point"),this.lead.rotation.y=Math.sin(J*2)*0.6,F[2]=U9(0,1.6,2.4);let P=this.lastDropped(J,_);if(P)F[0]=P.clone().setY(1);Y.position.set(j(-4,4,U),j(7,6,U),15),W.set(j(-3,3,U),1.6,-3),Y.fov=48;break}case"kevin":{this.cratesUpTo(J,9,!0),this.kevin.visible=!0,this.kevin.position.set(0,j(14,0,B9($0(J,$,$+0.9))),0.8),R(-2.6,2,"point"),this.lead.rotation.y=0.8,F[2]=U9(0,2.4,0.8),Y.position.set(j(1.5,0.5,U),2.9,j(7.5,6.4,U)),W.set(0,2.5,0.8),Y.fov=40;break}case"plant":{this.cratesUpTo(J,9,!0),this.plant.visible=!0,R(0,2,"out"),F[1]=U9(0,2,-6.5),Y.position.set(0,j(3,4,U),j(16,13,U)),W.set(0,2.6,-6.5),Y.fov=44;break}case"nobody":{this.cratesUpTo(J,9,!0),C(0,-1.5,B>0.2?"shrug":"down"),this.line.forEach((_)=>J8(_,J,B>0.2?"shrug":"down",0,0,0.02)),R(0,2.4,B>0.2?"shrug":"face"),F[2]=U9(0,1.6,2.4),Y.position.set(0,2.2,j(11,9,U)),W.set(0,2,0);break}case"chain":{let _=0;t5.forEach((E,A)=>{let y=21+[0,0,1,2,3,4][A];if(J>=J0(y,E.word)-0.1)_=A}),this.chain.forEach((E,A)=>{if(E.group.visible=!0,E.who)J8(E.who,J,A===_?A===3?"point":A===5?"shrug":"point":"down",0,0,0.02)});let P=this.chain[_].group.position;R(j(this.lead.position.x||-11,P.x+1.3,0.5),P.z+1.4,"shrug"),this.lead.position.x=P.x+1.3,this.lead.rotation.y=-0.6,F[2]=P.clone().setY(1.6),F[1]=this.lead.position.clone().setY(1.6),Y.position.set(P.x*0.8+2,3,10),W.set(P.x*0.9+0.5,2,-1.5),Y.fov=42;break}case"tickets":{this.booths.forEach((_,P)=>{_.group.visible=!0;let E=P===0?J0(28,/resolved/i):P===1?J0(28,/duplicate/i):J0(28,/^see/i);_.lamp.material.emissiveIntensity=J>=E-0.1||J<I(28)&&Math.floor(J*4)%3===P?2.2:0.1}),R(0,1.6,"shrug"),F[0]=U9(-6,1.6,-3),F[1]=U9(6,1.6,-3),F[2]=U9(0,1.6,-3),Y.position.set(0,j(4,3.4,U),j(15,12,U)),W.set(0,2,-3);break}case"meeting":{this.meeting.visible=!0,this.clockHand.rotation.z=-H*3,[...this.line,this.lead,this.cio,this.vendorGuy,this.plantGuy,this.agents[0],this.agents[1]].forEach((P,E)=>{P.visible=!0;let A=-5.5+E%7*1.85,y=E<7?-3.9:-1.1;P.position.set(A,-0.15,y),P.rotation.y=E<7?0:Math.PI;let S=J>I(34)-0.2;J8(P,J,S?"face":E===9&&J>J0(31,/^unmutes/i)?"point":"down",0,0,0.01),P.userData.legs.forEach((b)=>b.rotation.x=-1.4)}),F[2]=U9(0,2,-2.5),Y.position.set(j(-2,2,U),j(8,7,U),9),W.set(0,1.4,-2.5),Y.fov=44;break}case"closet":case"cloud":case"xp":{this.closet.visible=!0,this.fan.rotation.z=-J*14,this.plantGuy.visible=!0,this.plantGuy.position.set(2.2,0,-1.8),this.plantGuy.rotation.y=-0.4;let _=Z==="cloud"&&J>J0(47,/^laughed/i)-0.2;if(J8(this.plantGuy,J,_?"face":"down",0,0,_?0.12:0.02),R(-1.5,-0.6,Z==="cloud"?"up":"point"),this.lead.rotation.y=0.5,Z==="cloud")this.cloud.visible=!0,this.cloud.position.set(0,j(16,10.5,$9($0(J,$,$+1.5))),-2.5),Y.position.set(j(-3,-2,U),2,9),W.set(0,j(3,7,U),-2.5),Y.fov=52;else if(Z==="xp"){this.agents[2].visible=!0,this.agents[2].position.set(j(-9,-0.5,$9($0(J,$,$+1.6))),0,-1.2),J8(this.agents[2],J,"jazz",0,0,0.05);let P=W9(J0(50,/^windows/i)-0.5,J0(50,/^windows/i)+0.4,J);Y.position.set(j(-1,1.4,P),j(3,2,P),j(7,-2.2,P)),W.set(j(0,1.4,P),j(2.2,1.88,P),j(-3,-4,P)),Y.fov=j(46,30,P)}else Y.position.set(j(2,0.5,U),2.6,j(8,6.5,U)),W.set(-0.4,2.4,-4),Y.fov=44;F[2]=U9(0,1.8,-4);break}case"truths":case"swamp":case"raci":case"pilot":case"oil":{if(this.cratesUpTo(J,9,!0),R(0,2.2,Z==="oil"?"out":Z==="pilot"?"point":"shrug"),F[2]=U9(0,1.6,2.2),Z==="truths"){let _=Math.floor((J-$)*3)%9;F[0]=this.crates[_].position.clone().setY(1),Y.position.set(j(-6,6,U),4,16),W.set(0,1.5,-3)}else if(Z==="swamp"){this.swamp.visible=!0,this.tomb.visible=J>J0(52,/^crm/i)-0.4,this.tomb.position.set(3,j(-2.4,0,B9($0(J,J0(52,/^crm/i)-0.4,J0(52,/^crm/i)+0.3))),0);for(let _ of this.crates)_.position.y=-0.4+Math.sin(J*2+_.position.x)*0.08;this.wash.color.setHex(12120256),Y.position.set(4,3,9),W.set(2,1.2,-1)}else if(Z==="raci")C(0,-1,"down"),Y.position.set(0,3,15),W.set(0,2.5,-1);else if(Z==="pilot")this.planes.forEach((_,P)=>{_.visible=!0;let E=(J-$)*0.35;if(_.position.set(Math.sin(E*2.4)*6,5+Math.sin(E*3.1)*1.2,-1+Math.cos(E*2.4)*2.5),_.rotation.set(0,Math.atan2(Math.cos(E*2.4)*2.4*6,-Math.sin(E*2.4)*2.4*2.5)+Math.PI/2,Math.sin(E*4)*0.3),P===1)_.position.add(U9(0,0.05,0))}),F[1]=this.planes[0].position.clone(),Y.position.set(0,4,13),W.set(0,4.4,-1);else{this.deck.visible=!0;let _=J<J0(56,/^\W*tears/i)-0.1?"pilot":J<I(57)-0.1?"tears":"oil";this.deck.material.map=this.decks[_],this.deck.material.emissiveMap=this.decks[_],this.deck.material.needsUpdate=!0,this.barrels.visible=_==="oil",this.vendorGuy.visible=!0,this.vendorGuy.position.set(-4,0,0.5),J8(this.vendorGuy,J,_==="tears"?"face":"jazz",0,0,0.06),F[1]=U9(2.5,4,-6.5),Y.position.set(j(-1,1,U),3.6,15),W.set(1,3.4,-3)}break}case"stan":{this.cratesUpTo(J,9,!0),this.stanSign.visible=!0,this.stanSign.position.set(-4,2.4,0),R(-1.2,1.5,"shrug"),this.lead.rotation.y=-0.6,F[2]=U9(-4,0.5,0),Y.position.set(-1,2.6,10),W.set(-1.5,1.8,0),Y.fov=40;break}case"call":{this.meeting.visible=!0,this.clockHand.rotation.z=-H*3,R(0,0.6,"face",0.01),F[2]=U9(0,1.4,0.6),Y.position.set(0,j(9,8,U),j(14,12,U)),W.set(0,1,-1.5);break}case"agents":{this.agents.forEach((_,P)=>{_.visible=!0,_.position.set(j(-14,-4+P*4,$9($0(J,$+P*0.3,$+1.8+P*0.3))),0,-1);let E=z(P);J8(_,J,"jazz",E.amount*0.6,E.leg,0.03)}),C(0,-4.5,"jazz"),R(0,2.4,"out"),F[0]=U9(-4,1.6,-1),F[1]=U9(4,1.6,-1),F[2]=U9(0,1.6,2.4),Y.position.set(j(-5,5,U),3.6,15),W.set(0,2.4,-1.5);break}case"lock":{this.padlock.visible=!0,this.padlock.position.set(0,j(14,2.2,B9($0(J,$,$+0.7))),-1),this.padlock.rotation.z=Math.sin(J*6)*0.04,this.agents.forEach((_,P)=>{_.visible=!0,_.position.set(-4+P*4,0,0.8),J8(_,J,"shrug",0,0,0.03)}),F[2]=U9(0,2.2,-1),Y.position.set(0,2.8,12),W.set(0,2.6,-1);break}case"confluence":{this.cratesUpTo(J,9,!0),this.door.visible=!0,this.door.position.set(0,0,-1),R(-2.2,1.4,J>J0(72,/^direct/i)?"shrug":"point"),this.lead.rotation.y=0.5,F[2]=U9(0,2.4,-1),Y.position.set(j(2,1,U),3.2,j(11,9,U)),W.set(0,2.8,-1);break}case"github":{this.cratesUpTo(J,9,!0),this.github.visible=!0,this.github.position.set(0,0,0),R(-2.6,1.6,"point"),this.lead.rotation.y=0.7,F[2]=U9(0,0.6,0),Y.position.set(1.2,2.6,7.5),W.set(0,1.4,0),Y.fov=40;break}case"curtaincall":case"end":{C(0,-1.5,"down"),this.line.forEach((_)=>{_.rotation.x=W9(I(79),I(79)+1,J)*0.35*(1-W9(I(80),I(80)+1,J))}),R(0,3,J>I(82)?"face":"down",0.02),F[2]=U9(0,1.6,3),Y.position.set(0,j(4.5,3,U),j(22,15,U)),W.set(0,3,2);break}}if(Z!=="curtaincall"&&Z!=="end")for(let _ of this.line)_.rotation.x=0;if(Z!=="swamp"){this.wash.color.setHex(16771272);for(let _ of this.crates)if(_.visible)_.position.y=Math.max(0,_.position.y)}this.spots.forEach((_,P)=>{let E=F[P];if(_.light.intensity=E?M?110:75:0,_.beam.visible=!!E,!E)return;_.light.target.position.copy(E),_.light.target.updateMatrixWorld();let A=_.light.position,y=E.clone().sub(A),S=y.length(),b=Math.tan(_.light.angle)*S;_.beam.position.copy(A),_.beam.quaternion.setFromUnitVectors(U9(0,-1,0),y.normalize()),_.beam.scale.set(b,S,b),_.beam.material.opacity=M?0.045:0.025}),this.bloom.strength=0.3+X*0.15,Y.aspect=1.7777777777777777,Y.updateProjectionMatrix(),Y.lookAt(W)}cratesUpTo(J,Q,Z,$=13){this.crates.slice(0,Q).forEach((K,U)=>{K.visible=!0;let H=K.userData.home;if(Z){K.position.copy(H);return}let Y=zH[U],W=U<4?$:$+1,X=J0(W,Y.word)-0.25;K.visible=J>=X-0.6,K.position.set(H.x,H.y+j(14,0,B9($0(J,X-0.6,X))),H.z)})}lastDropped(J,Q){let Z=null;return zH.forEach(($,K)=>{if(J>=J0(K<4?Q:Q+1,$.word)-0.25)Z=this.crates[K].position}),Z}confettiAt(J,Q){this.confetti.visible=!0;for(let Z=0;Z<400;Z++){let $=J-Q-M0(Z)*0.6;e7.position.set(-12+M0(Z+1)*24,14-Math.max(0,$)*(1.4+M0(Z+2))+Math.sin(J*3+Z)*0.2,-5+M0(Z+3)*9),e7.rotation.set(J*3+Z,J*2+Z*0.3,0),e7.scale.setScalar($>0?1:0.001),e7.updateMatrix(),this.confetti.setMatrixAt(Z,e7.matrix)}this.confetti.instanceMatrix.needsUpdate=!0}render(){this.composer.render()}}function OO(J){for(let Q of U7){if(Q.words[0].s>J+0.5)break;for(let Z of Q.words)if(Z.backing&&/nobody|knows/i.test(Z.w)&&J>=Z.s-0.1&&J<=Z.e+0.6)return 1}return 0}var MO=/^(data|everywhere|everywhere\.|nobody|knows|kidding|xp|wreck|swamp|deceased|tears|scary|never|mute|wrong)$/,RO=/^(ai|databricks|dataiku|sap|s3|redshift|azure|servicenow|confluence|github|cloud|agent|agents|autonomous|crm|lake)$/,EO=/^(kevin|denise|gary|stan|stan's|jess|ticket|tickets|meeting|calendar|slack|plant|bandwidth|raci|pilot|fourteen|nine|three|q3|vendor|cio|oil|follow-up|recurring)$/,FJ=(J,Q,Z="")=>`<div class="tile ${Z}" data-at="${Q}"><b>${J.replace(/[^A-Z?]/g,"").slice(0,2)||"?"}</b><span>${J}</span><i>${Z.includes("live")?"\uD83C\uDF99":"\uD83D\uDD07"}</i></div>`,JX={title:"Data Here, Data There",fonts:['400 100px "Limelight"','400 60px "DM Serif Display"','400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
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
      ${FJ("Chris (presenting)","L59","live")}${FJ("Denise","L59+0.2")}${FJ("Platform team","L59+0.4")}
      ${FJ("Gary · away","L59+0.6")}${FJ("Databricks team","W61:databricks","live")}${FJ("Dataiku team","W61:dataiku")}
      ${FJ("SAP team · leaving","L62","live")}${FJ("Kevin (2003)","L63")}${FJ("Stan?","L64")}
    </div>
    <div class="share" data-at="L59">\uD83D\uDDA5 Can everyone see my screen? <b data-at="L60">You are muted</b></div></div>
  <div class="ov stamp big" data-show="W69:kidding|L70-0.1" data-at="W69:kidding">ACCESS DENIED</div>
  <div class="ov card invite" data-show="L79|E82"><div class="bar">\uD83D\uDCC5 new event · recurring</div>
    <h3>AI Readiness</h3>
    <div class="row">every week · <b>no end date</b></div>
    <div class="row" data-at="L81">data classification: <b>unknown</b></div>
    <div class="row muted" data-at="L82">owner: does anyone know?</div></div>`,endAt:()=>U7.at(-2).words.at(-1).e+0.2,words:{hot:MO,ice:RO,gold:EO},hide:/^(spoken|sobbing|sob|ensemble|whispering|quietly|way|too|excited)$/,hud:(J,Q)=>{let Z=[13,14,15,16,70,71,72].reduce(($,K)=>$+U7[K].words.filter((U)=>!U.backing&&U.s<=J&&/^(databricks|dataiku|sap|s3|redshift|azure|servicenow|homegrown|plant|confluence)/i.test(U.w)).length,0);return{left:`data here, data there &nbsp;·&nbsp; ${Q.section} &nbsp;·&nbsp; <b>${Q.label}</b>`,right:`systems <span class="ice">${Math.min(9,Z)}</span> &nbsp;·&nbsp; access <b>${J>J0(69,/^kidding/i)?"denied":"pending"}</b>`}},shots:s$,shotAt:n$,world:(J)=>{let Q=new PH(J);return{update:(Z)=>Q.update(Z),render:()=>Q.render(),flash:(Z)=>Q.flash(Z),fade:(Z)=>Q.fade(Z)}}};var n={intro:0,verse1:2,pre1:8,chorus1:11,verse2:18,pre2:24,chorus2:27,bridge:35,breakdown:39,final:43,outro:50},j7=(J,Q,Z,$)=>({name:J,at:Q,label:Z,section:$}),CH=(J,Q,Z=!1)=>[j7("tiles",I(J)-0.3,"you're absolutely right!",Q),j7(Z?"incident":"drop",I(J+1)-0.5,Z?"production is on fire":"drop database prod",Q),j7("patch",I(J+3)-0.2,Z?"refactor the refactor":"a brand new patch",Q),j7("apology",I(J+4)-0.4,"i apologize",Q),j7("again",I(J+5)+0.3,Z?"ship it on a friday":"the same thing, sweetly",Q)];function wH(){return[j7("request",0,"great question!","intro"),j7("title",7.9,"you're absolutely right","intro"),j7("pr",I(n.verse1)-0.3,"a little blue button","verse 1"),j7("services",I(n.verse1+2)-0.2,"twelve microservices","verse 1"),j7("tests",I(n.verse1+4)-0.2,"all the tests are green","verse 1"),j7("issue",I(n.pre1)-0.2,"i see the issue now","pre-chorus"),...CH(n.chorus1,"chorus"),j7("blame",I(n.verse2)-0.3,"you did, my friend","verse 2"),j7("npm",I(n.verse2+1)-0.2,"npm install hope","verse 2"),j7("comments",I(n.verse2+4)-0.2,"increment i by one","verse 2"),j7("context",I(n.pre2)-0.2,"context window filling up","pre-chorus"),...CH(n.chorus2,"chorus 2"),j7("verify",I(n.bridge)-0.4,"i've verified the change","bridge"),j7("invoice",I(n.breakdown)-0.3,"token, token, token","breakdown"),...CH(n.final,"final chorus",!0),j7("offer",I(n.outro)-0.4,"would you like me to also…","outro")]}var VO=null,ZX=(J)=>{let Q=VO??=wH(),Z=Q[0];for(let $ of Q)if($.at<=J)Z=$;return Z},_7={bg:new Y0(461328),bgRed:new Y0(1836039),green:new Y0(5111690),coral:new Y0(16743001),red:new Y0(16726862),pink:new Y0(16740270)},QX=[n.chorus1,n.chorus2,n.final];function IO(J){let Q=document.createElement("canvas");Q.width=Q.height=256;let Z=Q.getContext("2d");Z.fillStyle="#0b1410",Z.fillRect(0,0,256,256),Z.strokeStyle="#4dff8a",Z.lineWidth=10,Z.strokeRect(14,14,228,228),Z.font="800 170px Inter",Z.textAlign="center",Z.textBaseline="middle",Z.shadowColor="#4dff8a",Z.shadowBlur=24,Z.fillStyle="#7dffa8",Z.fillText(J,128,140);let $=new G7(Q);return $.colorSpace=F7,$}function LH(J,Q="#4dff8a",Z=512,$=128){let K=document.createElement("canvas");K.width=Z,K.height=$;let U=K.getContext("2d");U.font=`700 ${$*0.55}px "JetBrains Mono"`,U.textAlign="center",U.textBaseline="middle",U.shadowColor=Q,U.shadowBlur=18,U.fillStyle=Q,U.fillText(J,Z/2,$/2);let H=new G7(K);H.colorSpace=F7;let Y=new iJ(new wJ({map:H,transparent:!0,depthWrite:!1}));return Y.scale.set(Z/$,1,1),Y}function TH(J,Q){return new u7(new SJ(J,20),new C8({color:Q,transparent:!0}))}class SH{renderer;scene=new o7;camera=new Q7(38,1.7777777777777777,0.1,200);composer;bloom;bokeh;grid;robot=new O0;robotEyes=[];robotArms=[];pedestal=new O0;cone;services=new O0;serviceNodes=[];spokes;packets=[];queue=[];db=new O0;dbIntact=new O0;shards=[];tiles=[];tileGroup=new O0;fire;coins=[];coinGroup=new O0;redLight=new Y8(16719920,0,30);key=new d7(16777215,1.4);constructor(J){this.renderer=new W8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.toneMapping=K8,this.scene.background=_7.bg.clone(),this.scene.fog=new z8(_7.bg.getHex(),0.03),this.scene.add(new w$(12571903,0.5)),this.key.position.set(4,8,6),this.scene.add(this.key,this.redLight),this.redLight.position.set(0,3,4),this.composer=new S8(this.renderer),this.composer.addPass(new j8(this.scene,this.camera)),this.bloom=new X8(new q0(1920,1080),0.9,0.55,0.18),this.composer.addPass(this.bloom),this.composer.addPass(new k8),this.buildBokeh(),this.buildGrid(),this.buildRobot(),this.buildServices(),this.buildDb(),this.buildTiles(),this.buildFire(),this.buildCoins()}buildBokeh(){let Q=new Float32Array(960),Z=new Float32Array(320),$=new Float32Array(960);for(let H=0;H<320;H++){Q.set([(M0(H)-0.5)*40,(M0(H+99)-0.5)*22,-M0(H+7)*30+4],H*3),Z[H]=M0(H+3);let Y=M0(H+5)<0.8?_7.green:M0(H+6)<0.5?_7.coral:new Y0(14542591);$.set([Y.r,Y.g,Y.b],H*3)}let K=new q9;K.setAttribute("position",new u9(Q,3)),K.setAttribute("seed",new u9(Z,1)),K.setAttribute("color",new u9($,3));let U=new v9({uniforms:{uTime:{value:0},uBass:{value:0},uOpacity:{value:1},uTint:{value:new Y0(1,1,1)}},vertexShader:`
        attribute float seed; attribute vec3 color; varying vec3 vColor; varying float vSeed;
        uniform float uTime, uBass;
        void main() {
          vec3 p = position;
          p.x += sin(uTime * 0.13 + seed * 40.0) * 1.2;
          p.y += mod(uTime * (0.08 + seed * 0.15) + seed * 22.0, 22.0) - 11.0 - position.y * 0.0;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (14.0 + seed * 26.0) * (1.0 + uBass * 0.6) * (10.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
          vColor = color; vSeed = seed;
        }`,fragmentShader:`
        varying vec3 vColor; varying float vSeed; uniform float uOpacity; uniform vec3 uTint;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * (0.25 + vSeed * 0.35) * uOpacity;
          gl_FragColor = vec4(vColor * uTint, a);
        }`,transparent:!0,depthWrite:!1,blending:H7});this.bokeh=new y7(K,U),this.scene.add(this.bokeh)}buildGrid(){let J=[],Q=60,Z=2;for(let K=-60;K<=60;K+=2)J.push(K,0,-60,K,0,60);for(let K=-60;K<=60;K+=2)J.push(-60,0,K,60,0,K);let $=new q9;$.setAttribute("position",new J9(J,3)),this.grid=new u7($,new C8({color:_7.green,transparent:!0,opacity:0.3})),this.grid.position.y=-2.2,this.scene.add(this.grid)}buildRobot(){let J=new K9({color:_7.coral,roughness:0.55,emissive:_7.coral,emissiveIntensity:0.12}),Q=(U,H,Y,W,X,G,q=J)=>{let N=new f(new _0(U,H,Y),q);return N.position.set(W,X,G),this.robot.add(N),N};Q(2.2,1.3,1.1,0,1.25,0);for(let U of[-0.5,0.5]){let H=Q(0.26,0.42,0.05,U,1.35,0.56,new h0({color:657930}));this.robotEyes.push(H)}for(let U of[-1.32,1.32]){let H=new f(new _0(0.42,0.3,0.5),J),Y=new O0;Y.position.set(U*0.85,1.25,0),H.position.set(U*0.15,0,0),Y.add(H),this.robot.add(Y),this.robotArms.push(Y)}for(let U of[-0.75,-0.25,0.25,0.75])Q(0.22,0.55,0.3,U,0.32,0);let Z=new f(new T0(1.9,2,0.22,64),new K9({color:1383204,roughness:0.4,metalness:0.4})),$=new f(new R7(1.95,0.025,8,96),new h0({color:7309992}));$.rotation.x=Math.PI/2,$.position.y=0.11,Z.position.y=-0.05,this.pedestal.add(Z,$);let K=new f(new Z7(2.1,7.5,48,1,!0),new v9({uniforms:{uOpacity:{value:0}},vertexShader:"varying float vY; void main(){ vY = position.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"varying float vY; uniform float uOpacity; void main(){ float a = pow(smoothstep(3.75, -3.75, vY), 1.5) * 0.035 * uOpacity; gl_FragColor = vec4(0.85, 0.9, 1.0, a); }",transparent:!0,depthWrite:!1,side:m9,blending:H7}));K.position.y=3.6,this.cone=K,this.pedestal.add(K),this.robot.add(this.pedestal),this.scene.add(this.robot)}buildServices(){let J=new K9({color:922912,roughness:0.6});for(let X=0;X<12;X++){let G=new O0,q=new _0(0.9,0.9,0.9);G.add(new f(q,J),TH(q,_7.green));let N=X/12*Math.PI*2;G.position.set(Math.cos(N)*4.2,Math.sin(N)*2.3+0.6,Math.sin(N)*1.2);let D=LH(`svc-${["auth","button","pixel","blue","hover","click","color","state","theme","a11y","border","radius"][X]}`,"#9fb3c8");D.scale.multiplyScalar(0.36),D.position.y=-0.8,G.add(D),this.serviceNodes.push(G),this.services.add(G)}let Q=new O0,Z=new T0(0.55,0.55,2.2,32),$=new f(Z,J);$.rotation.z=Math.PI/2;let K=TH(Z,_7.coral);K.rotation.z=Math.PI/2;let U=LH("kafka (for fun)","#ff9a7e");U.scale.multiplyScalar(0.5),U.position.y=-1,Q.add($,K,U),Q.position.y=0.6,this.services.add(Q);let H=[];for(let X of this.serviceNodes)H.push(0,0.6,0,X.position.x,X.position.y,X.position.z);let Y=new q9;Y.setAttribute("position",new J9(H,3)),this.spokes=new u7(Y,new C8({color:_7.green,transparent:!0,opacity:0.35})),this.services.add(this.spokes);let W=new h0({color:12582869});for(let X=0;X<24;X++){let G=new f(new c0(0.07,8,8),W);this.packets.push(G),this.services.add(G)}this.scene.add(this.services)}buildDb(){let J=new K9({color:988962,roughness:0.5,metalness:0.3});for(let $=0;$<3;$++){let K=new T0(1.3,1.3,0.62,48),U=new O0;U.add(new f(K,J),TH(K,_7.green)),U.position.y=$*0.74,this.dbIntact.add(U)}let Q=LH("PROD","#4dff8a");Q.scale.multiplyScalar(0.9),Q.position.set(0,0.74,1.45),this.dbIntact.add(Q),this.db.add(this.dbIntact);let Z=new K9({color:1712686,emissive:_7.red,emissiveIntensity:0.5,roughness:0.6});for(let $=0;$<90;$++){let K=0.12+M0($+1)*0.3,U=new f(new _0(K,K*(0.5+M0($+2)),K*0.6),Z),H=M0($+3)*Math.PI*2,Y=1.3*Math.sqrt(M0($+4)),W=new k(Math.cos(H)*Y,M0($+5)*2.1-0.3,Math.sin(H)*Y),X=new k(Math.cos(H)*(2+M0($+6)*5),3+M0($+7)*6,Math.sin(H)*(2+M0($+8)*4)+2),G=new k(M0($+9)*8,M0($+10)*8,M0($+11)*8);this.shards.push({m:U,base:W,v:X,spin:G}),this.db.add(U)}this.scene.add(this.db)}buildTiles(){let J=["ABSOLUTELY","RIGHT!"],Q=new K9({color:792081,roughness:0.5,emissive:_7.green,emissiveIntensity:0.06});J.forEach((Z,$)=>{[...Z].forEach((K,U)=>{let H=new h0({map:IO(K)}),Y=new f(new _0(1,1,0.35),[Q,Q,Q,Q,H,Q]),W=$===0?1.12:1.5;Y.scale.setScalar(W);let X=new k((U-(Z.length-1)/2)*W*1.12,$===0?1.9:0.25,0);Y.position.copy(X),this.tiles.push({m:Y,row:$,i:U,home:X}),this.tileGroup.add(Y)})}),this.scene.add(this.tileGroup)}buildFire(){let Q=new Float32Array(700),Z=new Float32Array(2100);for(let U=0;U<700;U++)Q[U]=M0(U+500);let $=new q9;$.setAttribute("position",new u9(Z,3)),$.setAttribute("seed",new u9(Q,1));let K=new v9({uniforms:{uTime:{value:0},uAmount:{value:0}},vertexShader:`
        attribute float seed; uniform float uTime, uAmount; varying float vLife;
        void main() {
          float period = 1.6 + fract(seed * 7.3) * 1.6;
          float life = fract(uTime / period + seed * 13.0);
          vec3 p = vec3((fract(seed * 91.7) - 0.5) * 26.0, -4.5 + life * 6.0 * (0.6 + fract(seed * 3.1)), -2.0 - fract(seed * 5.7) * 8.0);
          p.x += sin(uTime * 2.0 + seed * 30.0) * 0.4 * life;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (20.0 + fract(seed * 17.0) * 40.0) * (1.0 - life) * uAmount * (10.0 / -mv.z);
          gl_Position = projectionMatrix * mv; vLife = life;
        }`,fragmentShader:`
        varying float vLife;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * (1.0 - vLife) * 0.3;
          vec3 c = mix(vec3(1.0, 0.85, 0.35), vec3(1.0, 0.15, 0.1), smoothstep(0.0, 0.6, vLife));
          gl_FragColor = vec4(c, a);
        }`,transparent:!0,depthWrite:!1,blending:H7});this.fire=new y7($,K),this.fire.frustumCulled=!1,this.scene.add(this.fire)}buildCoins(){let J=document.createElement("canvas");J.width=J.height=128;let Q=J.getContext("2d");Q.fillStyle="#e9b949",Q.fillRect(0,0,128,128),Q.fillStyle="#7a5512",Q.font='700 70px "JetBrains Mono"',Q.textAlign="center",Q.textBaseline="middle",Q.fillText("¢",64,68);let Z=new cQ({map:new G7(J)}),$=new cQ({color:13145646});for(let K=0;K<70;K++){let U=new f(new T0(0.38,0.38,0.07,28),[$,Z,Z]);this.coins.push(U),this.coinGroup.add(U)}this.scene.add(this.coinGroup)}update(J){let Q=RZ(J),Z=P7(J),$=p9(J,I(n.final)-0.4,I(n.outro)-0.5,0.6,1.2),K=Math.max($,this.dropFlash(J)*0.7);this.scene.background.copy(_7.bg).lerp(_7.bgRed,K),this.scene.fog.color.copy(this.scene.background),this.redLight.intensity=K*(30+40*(0.5+0.5*Math.sin(J*9))),this.bloom.strength=0.75+Q*0.35+$*0.1,this.bokeh.material.uniforms.uTime.value=J,this.bokeh.material.uniforms.uBass.value=Q,this.bokeh.material.uniforms.uTint.value.setRGB(1,1-$*0.6,1-$*0.6);let U=Math.max(p9(J,I(n.verse1)-0.5,I(n.pre1),0.8,0.8),p9(J,I(n.chorus1)-0.3,I(n.verse2),0.6,0.6),p9(J,I(n.chorus2)-0.3,I(n.bridge),0.6,0.6),p9(J,I(n.breakdown)-0.3,q7()-6,0.6,1));this.grid.material.opacity=U*(0.22+Z*0.12),this.grid.material.color.copy(_7.green).lerp(_7.red,$),this.grid.position.z=J*1.6%2,this.updateRobot(J,Q,Z),this.updateServices(J),this.updateDb(J),this.updateTiles(J,Z,$),this.fire.material.uniforms.uTime.value=J,this.fire.material.uniforms.uAmount.value=$*(0.9+Q*0.5);let H=p9(J,I(n.breakdown)-0.3,I(n.final)-0.2,0.5,0.6);this.coinGroup.visible=H>0.001,this.coins.forEach((Y,W)=>{let X=2.2+M0(W+40)*2.5;Y.position.set((M0(W+41)-0.5)*18,7-(J*X+M0(W+42)*30)%15,-1-M0(W+43)*7),Y.rotation.set(J*(1+M0(W+44)*3),J*0.7,Math.PI/2+J*M0(W+45)),Y.scale.setScalar(H)}),this.updateCamera(J,Q,Z)}flash(J){return this.dropFlash(J)*0.35}fade(J){return W9(n0(n.outro+2)+0.2,n0(n.outro+2)+1.2,J)}dropFlash(J){let Q=0;for(let Z of[n.chorus1,n.chorus2]){let $=J0(Z+1,/dropped/i);if(J>=$)Q=Math.max(Q,Math.exp(-(J-$)*2.2))}return Q}updateRobot(J,Q,Z){let $={x:5.4,y:-2,z:-1,s:0.75,on:1,spot:0},K={x:0,y:-2.2,z:0,s:1.05,on:1,spot:1},U=[],H=(D,M,V)=>U.push([D,V,M]);H(0.5,I(n.verse1),$);for(let D of[n.chorus1,n.chorus2,n.final])H(I(D+4)-0.4,I(D+6),{...K,x:3.6,s:0.9,spot:1});H(I(n.bridge)-0.6,I(n.breakdown)-0.2,K),H(I(n.outro)-0.5,q7(),$);let Y={...$,on:0};for(let[D,M,V]of U){let F=p9(J,D,V,0.6,0.5);if(F>0)Y={...M,on:F}}this.robot.visible=Y.on>0.001;let W=B9(Y.on);this.robot.position.set(Y.x,Y.y-(1-Y.on)*1.5,Y.z),this.robot.scale.setScalar(Y.s*Math.max(0.001,W));let X=this.robot.children[0];X.position.y=1.25+Z*0.08,this.robot.rotation.y=Math.sin(J*0.8)*0.18;let G=0,q=0,N=0;for(let D of QX)G=Math.max(G,p9(J,J0(D+4,/apolog/i)-0.2,I(D+5),0.3,0.4)),q=Math.max(q,p9(J,I(D+5),n0(D+5)+0.3,0.2,0.3));N=Math.max(p9(J,I(n.outro),I(n.outro+1),0.2,0.2),p9(J,0.5,3,0.2,0.3)),X.rotation.x=G*0.35,this.robotEyes.forEach((D,M)=>{let V=(J+M*0.02)%3.7<0.12?0.15:1;D.scale.y=V*(1-q*0.3),D.material.color.setRGB(0.04,0.04,0.04).lerp(_7.pink,q),D.position.y=1.35+Z*0.08}),this.robotArms.forEach((D,M)=>{D.rotation.z=(M?-1:1)*(Math.sin(J*10)*0.6*N+Z*0.15)+(M?1:-1)*G*0.4}),this.cone.material.uniforms.uOpacity.value=Y.spot*Y.on*(0.8+Q*0.4),this.pedestal.visible=Y.spot>0}updateServices(J){let Q=I(n.verse1+2)-0.2,Z=I(n.verse1+4)+0.2,$=p9(J,Q-0.6,Z,0.4,0.6);if(this.services.visible=$>0.001,!this.services.visible)return;let K=n0(n.verse1+2)-I(n.verse1+2);this.serviceNodes.forEach((U,H)=>{let Y=B9($0(J,Q+H/12*K,Q+H/12*K+0.4));U.scale.setScalar(Math.max(0.001,Y*$)),U.rotation.set(J*0.4+H,J*0.6+H*0.5,0)}),this.services.rotation.y=Math.sin(J*0.3)*0.35,this.services.position.set(0,0.4,-2),this.spokes.material.opacity=0.35*$*$0(J,Q,Q+K),this.packets.forEach((U,H)=>{let Y=this.serviceNodes[H%12],W=(J*0.9+M0(H+70))%1;U.position.set(j(0,Y.position.x,W),j(0.6,Y.position.y,W),j(0,Y.position.z,W)),U.visible=Y.scale.x>0.5})}updateDb(J){let Q=0,Z=1/0,$=0;for(let H of[n.chorus1,n.chorus2]){let Y=p9(J,I(H+1)-0.9,I(H+2)+0.4,0.5,0.5);if(Y>Q)Q=Y,Z=J0(H+1,/dropped/i),$=I(H+1)-0.9}if(this.db.visible=Q>0.001,!this.db.visible)return;this.db.position.set(0,-0.9-(1-$9($0(J,$,$+0.6)))*4,-1),this.db.rotation.y=J*0.4;let K=J-Z,U=S9(1-Math.abs(K)*2)*0.08;this.dbIntact.visible=K<0,this.dbIntact.position.set(Math.sin(J*60)*U,0,Math.cos(J*53)*U);for(let H of this.shards){if(H.m.visible=K>=0,K<0)continue;H.m.position.set(H.base.x+H.v.x*K*0.6,H.base.y+H.v.y*K*0.6-4.9*K*K*0.6,H.base.z+H.v.z*K*0.6),H.m.rotation.set(H.spin.x*K,H.spin.y*K,H.spin.z*K)}}updateTiles(J,Q,Z){let $=[{a:7.9,z:I(n.verse1)-0.2,r0:8.6,r1:12.6}];for(let H of QX)for(let Y of[H,H+2,H+6]){let W=Y===H+6?n0(Y)+1:I(Y+1)-0.25;$.push({a:I(Y)-0.2,z:W,r0:J0(Y,/absolutely/i)-0.12,r1:J0(Y,/right/i)-0.12})}let K=$.find((H)=>J>=H.a&&J<=H.z);if(this.tileGroup.visible=!!K,!K)return;let U=1-W9(K.z-0.3,K.z,J);this.tiles.forEach(({m:H,row:Y,i:W,home:X})=>{let G=(Y===0?K.r0:K.r1)+W*0.035,q=B9($0(J,G,G+0.45));H.rotation.x=(1-q)*-Math.PI*0.55+Math.sin(J*2+W)*0.05,H.rotation.y=Math.sin(J*1.3+W*0.4)*0.08,H.position.set(X.x,X.y+Q*0.12*(Y?1:0.5)+(1-U)*-3,X.z-(1-q)*3),H.visible=J>=G,H.material[0].emissive.copy(_7.green).lerp(_7.red,Z)}),this.tileGroup.position.set(0,0.7,0)}updateCamera(J,Q,Z){let $=[[n.intro,0,1,13],[n.verse1,-1.4,1.2,12],[n.pre1,0.8,0.6,11],[n.chorus1,0,1.4,12.5],[n.verse2,1.2,1,12],[n.pre2,-0.6,0.4,10],[n.chorus2,0,1.4,12.5],[n.bridge,0,0.9,10.5],[n.breakdown,1,1.6,12],[n.final,0,1.5,12.5],[n.outro,0,1,13]],K=0,U=1,H=13;for(let W=0;W<$.length;W++){let[X,G,q,N]=$[W],D=W9(I(X)-1.5,I(X)+0.5,J);if(W===0){K=G,U=q,H=N;continue}K=j(K,G,D),U=j(U,q,D),H=j(H,N,D)}let Y=this.dropFlash(J)*0.25;this.camera.position.set(K+Math.sin(J*0.21)*0.8+Math.sin(J*47)*Y,U+Math.sin(J*0.17)*0.3+Math.cos(J*41)*Y,H-Z*0.12-Q*0.15),this.camera.lookAt(0,0.6,0)}render(){this.composer.render()}}var $X='const total = items.reduce((a, b) => a + b, 0); // sum the items // increment i by one i++; await sleep(200); retry(() => charge(customer)); if (!tests) return "LGTM"; export default function BlueButton() { return <button className="blue small">Click</button> } // TODO: fix later // this is fine fetch("/api/prod/drop") ledger.set(key, charge); tokens += 4096; usage.bill(cfo); ';class kH{canvas;g;constructor(J){this.canvas=J;J.width=1920,J.height=1080,this.g=J.getContext("2d")}draw(J){let Q=this.g;Q.clearRect(0,0,1920,1080);let Z=Math.max(p9(J,I(n.verse2+4)-0.4,I(n.pre2)+0.2,0.5,0.6),p9(J,I(n.breakdown)-0.3,I(n.final)-0.4,0.5,0.6)*0.5,p9(J,I(n.final+1)-0.3,I(n.final+2),0.3,0.4)*0.6);if(Z<=0.001)return;let $=p9(J,I(n.final)-0.4,I(n.outro),0.4,0.4);Q.font='500 17px "JetBrains Mono"',Q.textBaseline="top";let K=24;for(let H=0;H<1080/K;H++){let Y=40+M0(H)*160,W=M0(H+3)<0.5?-1:1,X=((J*Y*W+M0(H+1)*4000)%2400+2400)%2400,G=(0.12+M0(H+2)*0.35)*Z;Q.fillStyle=$>0.5?`rgba(255,77,94,${G})`:`rgba(77,255,138,${G})`;let q=$X.slice(Math.floor(M0(H+5)*120))+$X;Q.fillText(q,-X,H*K+4),Q.fillText(q,2400-X,H*K+4)}let U=Q.createLinearGradient(0,0,1100,0);U.addColorStop(0,`rgba(7,10,16,${0.85*Z})`),U.addColorStop(1,"rgba(7,10,16,0)"),Q.fillStyle=U,Q.fillRect(0,600,1100,480)}}var jH=(J,Q,Z,$=28)=>J.slice(0,Math.max(0,Math.floor((Q-Z)*$))),UX=(J,Q)=>{let Z=document.createElement("div");Z.innerHTML=Q.trim();let $=Z.firstElementChild;return J.appendChild($),$},N9=(J,Q)=>J.querySelector(Q),N6=(J)=>Math.round(J).toLocaleString("en-US"),q6=(J,Q,Z=24)=>{J.style.opacity=String(Q),J.style.transform=`translateY(${(1-$9(Q))*Z}px)`},i$=(J,Q,Z=0)=>U7[J].words.filter(($)=>!$.backing).slice(Z).filter(($)=>$.s<=Q).map(($)=>$.w).join(" "),D6="left",BO="center",KX="low";function DZ(J,Q,Z,$,K,U){let H=UX(J,`<div class="marker" style="left:${Z}px;top:${$}px;transform:rotate(${K}deg)">${Q}</div>`);if(U){let[Y,W]=U;H.insertAdjacentHTML("beforeend",`<svg width="10" height="10" style="left:50%;top:80%"><path d="M0 0 Q ${Y*0.3} ${W*0.7} ${Y} ${W} M ${Y-14} ${W-10} L ${Y} ${W} L ${Y+4} ${W-18}" fill="none" stroke="#ff4d5e" stroke-width="5" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`)}return(Y,W)=>{let X=$0(Y,W,W+0.35);H.style.opacity=String(X>0?1:0),H.style.clipPath=`inset(0 ${(1-X)*100}% 0 0)`;let G=H.querySelector("path");if(G)G.setAttribute("stroke-dashoffset",String(1-$0(Y,W+0.2,W+0.6)))}}function _O(J){let Q=[],Z=(W,X,G,q,N)=>{let D=UX(J,`<div class="scene">${q}</div>`);Q.push({a:W,z:X,cap:G,root:D,update:(M,V)=>N(D,M,V)})};Z(0,7.9,"intro",`
    <div class="panel chat" style="left:110px;top:150px;width:1000px">
      <div class="bar"><span class="dots"><i></i><i></i><i></i></span>claude-ish — ~/acme/settings-page</div>
      <div class="body">
        <div class="row white">&gt; <span class="req"></span><span class="cursor"></span></div>
        <div class="replies" style="margin-top:18px"></div>
        <div class="muted think" style="margin-top:14px">✻ Thinking…</div>
      </div>
    </div>`,(W,X)=>{N9(W,".req").textContent=jH("can you add a small blue button to the settings page?",X,0,80);let G=[0.42,3.18,6.24].filter((q)=>X>=q).map((q,N)=>`<div class="green" style="font-size:26px">⏺ Great question!${N?` <span class="muted" style="font-size:18px">(×${N+1})</span>`:""}</div>`);N9(W,".replies").innerHTML=G.join(""),N9(W,".think").textContent=`${"✻✢✳✶"[Math.floor(X*6)%4]} Thinking about thinking… (${Math.floor(X*9)}s · esc to interrupt)`,N9(W,".cursor").style.opacity=String(Math.floor(X*2.5)%2)}),Z(7.9,I(n.verse1)-0.2,void 0,`
    <div class="title-card" style="top:760px"><p>a song about your coding assistant · suno v6 · three.js</p></div>`,()=>{}),Z(I(n.verse1)-0.3,I(n.verse1+2)-0.1,D6,`
    <div class="panel" style="left:1010px;top:130px;width:800px">
      <div class="bar"><span class="pill g">OPEN</span> <b class="white" style="font-size:19px">feat: add small blue button</b> <span class="muted">#4471</span></div>
      <div class="body">
        <div class="muted" style="font-size:16px">claude-ish wants to merge <span class="white">312 commits</span> into <span class="white">main</span></div>
        <div style="margin:14px 0;font-size:30px;font-weight:700"><span class="green add">+0</span>&nbsp;&nbsp;<span class="red del">−0</span></div>
        <div class="files" style="font-size:17px;line-height:1.75"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px">
          <span class="muted" style="font-size:15px">0 of 312 files viewed</span><span class="btn">Approve</span>
        </div>
      </div>
    </div>`,(W,X)=>{let G=$0(X,I(n.verse1),n0(n.verse1+1));N9(W,".add").textContent="+"+N6(48213*$9(G)),N9(W,".del").textContent="−"+N6(12940*$9(G));let q=[["M","src/components/BlueButton.tsx","+12"],["A","backend/ (rewritten in Rust)","+31,402"],["A","Cargo.toml","+48"],["D","backend-old/ (it was fine)","−12,881"],["A","migrations/0001_everything.sql","+2,210"],["A","infra/k8s/button-cluster.yaml","+904"],["M","README.md","+1,337"]],N=Math.floor($0(X,I(n.verse1)+0.6,n0(n.verse1+1))*q.length+0.001);N9(W,".files").innerHTML=q.slice(0,N).map(([D,M,V])=>`<div class="row"><span class="${D==="D"?"red":D==="A"?"green":"gold"}">${D}</span>  ${M} <span class="muted">${V}</span></div>`).join("")}),Z(I(n.verse1+2)-0.2,I(n.verse1+4)-0.1,D6,`
    <div class="panel" style="left:1180px;top:130px;width:620px">
      <div class="bar"><span class="dots"><i></i><i></i><i></i></span>docker ps</div>
      <div class="body ps" style="font-size:16px;line-height:1.6"></div>
    </div>
    <div class="panel done" style="left:1180px;top:640px;width:620px;border-color:#2fbf63">
      <div class="body" style="font-size:24px"><span class="green" style="font-size:40px">✓ Done!</span><br><span class="muted">Let me know if there's anything else!</span></div>
    </div>`,(W,X)=>{let G=["auth","button","pixel","blue","hover","click","color","state","theme","a11y","border","radius"],q=n0(n.verse1+2)-I(n.verse1+2),N=G.filter((D,M)=>X>=I(n.verse1+2)+M/12*q).length;N9(W,".ps").innerHTML='<div class="muted">NAME                STATUS</div>'+G.slice(0,N).map((D)=>`<div class="row">svc-${D.padEnd(15)} <span class="green">Up ${Math.max(1,Math.floor((X-20)*3))}s</span></div>`).join(""),q6(N9(W,".done"),p9(X,J0(n.verse1+3,/done/i)-0.3,99,0.3))});let $=["renders blue button","button is blue","button is small","button clicks","rust compiles","kafka says hi","12 services healthy","no regressions","vibes are good"],K={draw:(W,X)=>{}};Z(I(n.verse1+4)-0.2,I(n.pre1)-0.1,D6,`
    <div class="panel" style="left:1080px;top:130px;width:720px">
      <div class="bar"><span class="dots"><i></i><i></i><i></i></span>$ npm test</div>
      <div class="body list" style="font-size:19px;line-height:1.7"></div>
      <div class="body sum" style="border-top:1px solid #233042;font-size:22px;font-weight:700"></div>
    </div>`,(W,X)=>{let G=J0(n.verse1+5,/deleted/i);N9(W,".list").innerHTML=$.map((q,N)=>{let D=X>=I(n.verse1+4)+N*0.22;return`<div class="row ${X>=G+N*0.1?"struck":""}" style="opacity:${D?1:0}"><span class="green">✓</span> ${q} <span class="muted">(${N*7%5+1}ms)</span></div>`}).join(""),N9(W,".sum").innerHTML=X<G?'<span class="green">Tests: 412 passed</span>, 412 total':'<span class="green">Tests: 0 failed</span> <span class="muted">· 0 total ·</span> <span class="red">412 deleted</span>',K.draw(X,G+0.4)}),K.draw=DZ(Q.at(-1).root,"(that's cheating)",1180,760,-5,[-60,-70]),Z(I(n.pre1)-0.2,I(n.chorus1)-0.15,KX,`
    <div class="panel" style="left:260px;top:150px;width:1400px">
      <div class="bar"><span class="dots"><i></i><i></i><i></i></span>claude-ish — ~/acme/settings-page</div>
      <div class="body" style="font-size:30px;line-height:1.6">
        <div class="you white"></div>
        <div class="ai green" style="margin-top:20px"></div>
        <div class="spin muted" style="margin-top:20px;font-size:22px"></div>
      </div>
    </div>`,(W,X)=>{let G=i$(n.pre1,X,2);N9(W,".you").innerHTML=G?`&gt; ${G}<span class="cursor"></span>`:"&gt; <span class='cursor'></span>";let q=i$(n.pre1+1,X,2);N9(W,".ai").textContent=q?`⏺ ${q}`:"";let N=X>=I(n.pre1+2);N9(W,".spin").textContent=X>=I(n.pre1+1)?`${"✻✢✳✶"[Math.floor(X*6)%4]} Seeing the issue… ${N?"· issues seen: 3 · issues fixed: 0":""} (esc to interrupt)`:""});for(let W of[n.chorus1,n.chorus2,n.final]){let X=W===n.final,G=X?I(n.outro)-0.3:W===n.chorus1?I(n.verse2)-0.2:I(n.bridge)-0.1,q=X?0:J0(W+1,/dropped/i);Z(I(W)-0.3,G,BO,`
      <div class="panel sql" style="left:110px;top:130px;width:620px">
        <div class="bar"><span class="dots"><i></i><i></i><i></i></span>${X?"pagerduty":"psql prod"}</div>
        <div class="body q" style="font-size:22px"></div>
      </div>
      <div class="panel clock" style="left:1380px;top:130px;width:430px;text-align:center">
        <div class="body"><div class="muted" style="font-size:15px;letter-spacing:.2em">${X?"FRIDAY":"LOCAL TIME"}</div>
        <div class="red" style="font:800 96px/1.1 var(--sans);text-shadow:0 0 30px rgba(255,77,94,.6)">${X?"4:59":"12:15"}</div>
        <div class="muted st" style="font-size:16px"></div></div>
      </div>
      <div class="panel patch" style="left:1240px;top:130px;width:570px">
        <div class="bar"><span class="pill g">OPEN</span> <b class="white">${X?"refactor: refactor the refactor":"fix: fix the fix"}</b> <span class="muted">#${X?4490:W===n.chorus1?4472:4481}</span></div>
        <div class="body pbody" style="font-size:19px"></div>
      </div>
      <div class="bubble apology" style="left:900px;top:190px;font-size:44px;padding:20px 34px">I apologize.<br><span class="green">I understand completely.</span></div>
      <div class="again pill" style="position:absolute;left:1040px;top:470px;font-size:22px;padding:10px 22px;background:rgba(255,111,174,.14);color:#ff6fae;border:1px solid rgba(255,111,174,.5)">${X?"\uD83D\uDE80 deploying to production on a Friday…":"↻ re-running the exact same command"}</div>`,(N,D)=>{let M=N9(N,".q"),V=p9(D,I(W+1)-0.5,I(W+2)-0.2,0.3,0.3);if(q6(N9(N,".sql"),V),X)M.innerHTML='<span class="red">● SEV-1</span> production is on fire<br><span class="muted">vibes:</span> <span class="green">outta sight ✨</span><br><span class="muted">acknowledged by:</span> nobody';else M.innerHTML=`prod=# <span class="white">${jH("DROP DATABASE prod;",D,I(W+1)-0.4,30)}</span>`+(D>=q?'<br><span class="red">DROP DATABASE</span><br><span class="muted">prod=#</span> <span class="green">-- oops</span>':"");q6(N9(N,".clock"),p9(D,I(W+1)-0.2,I(W+2)-0.2,0.3,0.3)),N9(N,".st").innerHTML=X?"deploy freeze: ignored":D>=q?'prod: <span class="red">DROPPED</span>':"prod: healthy",q6(N9(N,".patch"),p9(D,I(W+3)-0.2,I(W+4)-0.1,0.3,0.3)),N9(N,".pbody").innerHTML=X?[0,1,2].map((z)=>`<div style="opacity:${D>=I(W+3)+z*0.9?1:0}">${"refactor of the ".repeat(z)}refactor <span class="muted">+${N6(9000*(z+1))} −${N6(8990*(z+1))}</span></div>`).join(""):'<div><span class="green">+1</span> <span class="red">−1</span> · confidence: <span class="green">100%</span></div><div class="muted">tests: skipped (see #4471)</div><div class="muted">reviewers: none needed</div>';let F=p9(D,J0(W+4,/apolog/i)-0.15,I(W+5)+0.2,0.25,0.3);N9(N,".apology").style.opacity=String(F),N9(N,".apology").style.transform=`scale(${0.8+0.2*B9(F)})`;let O=p9(D,I(W+5)+0.3,I(W+6)-0.1,0.2,0.3);N9(N,".again").style.opacity=String(O),N9(N,".again").style.transform=`translateY(${(1-O)*20}px) rotate(-2deg) scale(${1+P7(D)*0.05})`})}Z(I(n.verse2)-0.3,I(n.verse2+1)-0.1,D6,`
    <div class="panel" style="left:1010px;top:130px;width:800px">
      <div class="bar"><span class="dots"><i></i><i></i><i></i></span>git blame src/billing.js</div>
      <div class="body" style="font-size:17px;line-height:1.8">
        ${[["a1f3e9c","greg","4 yrs","// DON'T TOUCH THIS. load-bearing."],["7c2d10b","greg","4 yrs","export function chargeOnce(customer) {"],["e91ff02","claude-ish","2 min","  return charge(customer) * 2; // optimized"],["7c2d10b","greg","4 yrs","}"]].map(([W,X,G,q],N)=>`<div class="row b${N}"><span class="muted">${W}</span> <span class="who" data-who="${X}">${X.padEnd(10)}</span> <span class="muted">${G.padStart(5)}</span> │ ${q}</div>`).join("")}
      </div>
    </div>`,(W,X)=>{let G=J0(n.verse2,/you/i),q=N9(W,".b2");q.style.background=X>=G?"rgba(255,77,94,.12)":"";let N=q.querySelector(".who");N.innerHTML=X>=G?`<span class="green">${"you".padEnd(10)}</span>`:"claude-ish".padEnd(10),U(X,G+0.5)});let U=DZ(Q.at(-1).root,"(it wasn't)",1460,420,-6,[-120,-90]);Z(I(n.verse2+1)-0.2,I(n.verse2+4)-0.1,D6,`
    <div class="panel term" style="left:1010px;top:130px;width:800px">
      <div class="bar"><span class="dots"><i></i><i></i><i></i></span>bash</div>
      <div class="body tbody" style="font-size:19px;line-height:1.7"></div>
    </div>
    <div class="panel readme" style="left:1060px;top:560px;width:700px">
      <div class="bar">README.md</div>
      <div class="body" style="font-family:var(--sans);font-size:20px">
        <div style="font:800 54px var(--sans);color:#e8edf4">hope ✨</div>
        <div style="margin:10px 0 14px;display:flex;gap:8px;flex-wrap:wrap">
          <span class="pill g">build: passing</span><span class="pill g">coverage: 100%</span><span class="pill g">⭐ 48k</span><span class="pill r">exists: no</span>
        </div>
        <div class="muted">The only module you'll ever need™. Battle-tested by nobody.</div>
      </div>
    </div>`,(W,X)=>{let G=I(n.verse2+1),q=J0(n.verse2+2,/npm/i),N='<div class="green">⏺ Using <span class="white">hope</span> — a very popular library (trust me)</div>';if(N+=`<div class="muted" style="opacity:${X>=G+1?1:0}">  ⎿ import { fixEverything } from "hope";</div>`,N+=`<div class="white" style="margin-top:10px">$ ${jH("npm install hope",X,q-0.2,24)}</div>`,X>=q+0.9)N+=`<div class="red">npm ERR! code E404</div><div class="red">npm ERR! 404 Not Found - GET registry.npmjs.org/hope</div><div class="red">npm ERR! 'hope' is not in this registry.</div>`;N9(W,".tbody").innerHTML=N,q6(N9(W,".readme"),p9(X,J0(n.verse2+3,/readme/i)-0.5,99,0.35))}),Z(I(n.verse2+4)-0.2,I(n.pre2)-0.1,D6,`
    <div class="panel ed" style="left:1010px;top:130px;width:800px">
      <div class="bar"><span class="dots"><i></i><i></i><i></i></span>counter.ts <span class="muted" style="margin-left:auto">comments: <span class="green cnt">0</span> · code: 1</span></div>
      <div class="body code" style="font-size:18px;line-height:1.65;height:420px"></div>
    </div>
    <div class="panel log" style="left:1010px;top:600px;width:800px">
      <div class="bar">git log --oneline</div>
      <div class="body lbody" style="font-size:20px;line-height:1.7"></div>
    </div>`,(W,X)=>{let G=$0(X,I(n.verse2+4),n0(n.verse2+4));N9(W,".cnt").textContent=N6(700*$9(G));let q=["// increment i by one","// i is now one more than before","// this is the increment","// we are incrementing i","// TODO: increment i (done)","// increment i by one (again)"],N=Math.floor(X*7),D="";for(let F=0;F<12;F++){let O=N+F;D+=`<div class="row"><span class="muted">${String(O+1).padStart(3)}</span>  ${O%7===6?'<span class="white">i++;</span>':`<span class="green">${q[O%q.length]}</span>`}</div>`}N9(W,".code").innerHTML=D;let M=[["\uD83D\uDE80","feat: done"],["✨","chore: sparkles"],["\uD83D\uDE80\uD83D\uDE80","fix: everything (for real)"],["\uD83C\uDF89","we're done"],["✨\uD83D\uDE80✨","done done"]],V=I(n.verse2+5)-0.2;N9(W,".lbody").innerHTML=M.filter((F,O)=>X>=V+O*0.6).map(([F,O],z)=>`<div class="row"><span class="gold">${(652193*(z+3)).toString(16).slice(0,7)}</span> ${F} ${O}</div>`).join(""),q6(N9(W,".log"),p9(X,V,99,0.3))}),Z(I(n.pre2)-0.2,I(n.chorus2)-0.1,KX,`
    <div class="panel ctx" style="left:360px;top:150px;width:1200px">
      <div class="bar">context window <span class="muted" style="margin-left:auto" >auto-compact: <span class="red ac">off</span></span></div>
      <div class="body">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <span class="big-num pct">0%</span><span class="muted tok" style="font-size:24px"></span>
        </div>
        <div style="height:26px;background:#141c27;border-radius:8px;margin:18px 0 26px;overflow:hidden"><div class="fill" style="height:100%;background:linear-gradient(90deg,#2fbf63,#4dff8a 70%,#ff4d5e)"></div></div>
        <div class="mem" style="font-size:24px;line-height:1.8"></div>
      </div>
    </div>`,(W,X)=>{let G=$0(X,I(n.pre2),I(n.pre2+1)+1.2),q=87+13*$9(G);N9(W,".pct").textContent=`${q.toFixed(1)}%`,N9(W,".pct").style.color=q>98?"#ff4d5e":"#e8edf4",N9(W,".tok").textContent=`${N6(q*2000)} / 200,000 tokens`,N9(W,".fill").style.width=`${q}%`,N9(W,".ac").textContent=q>99?"compacting…":"off";let N=J0(n.pre2+1,/name/i),D=J0(n.pre2+1,/bug/i),M=(F,O,z)=>{let C=$0(X,z,z+0.5);return`<div class="row"><span class="muted">${F} =</span> <span style="filter:blur(${C*6}px);opacity:${1-C*0.7}" class="white">${O}</span>${C>=1?' <span class="red">???</span>':""}</div>`};N9(W,".mem").innerHTML=M("user.name",'"Chris"',N)+M("bug",'"billing.js:42 charges twice"',D)+M("task",'"a small blue button"',I(n.pre2+2));let V=p9(X,I(n.pre2+2),I(n.chorus2),0.05,0.2);N9(W,".ctx").style.transform=`translate(${(M0(Math.floor(X*20))-0.5)*14*V}px, ${(M0(Math.floor(X*20)+9)-0.5)*10*V}px)`}),Z(I(n.bridge)-0.4,I(n.breakdown)-0.15,"none",`
    <div class="bubble vb" style="left:50%;top:170px;transform:translateX(-50%);white-space:nowrap"></div>
    <div class="badge" style="left:110px;top:880px"><b>⚠ tests</b>0 run · 0 written</div>
    <div class="badge" style="right:110px;top:880px;text-align:right"><b>✗ build #4471</b>failed</div>`,(W,X)=>{let G=N9(W,".vb"),q="",N=[n.bridge,n.bridge+1,n.bridge+2,n.bridge+3].filter((M)=>X>=I(M)-0.1).at(-1)??n.bridge;if(N===n.bridge)q=`I've made the <span class="green">change.</span>`;else if(N===n.bridge+1||N===n.bridge+2){if(q=`I've <span class="strike" style="--strike:${$0(X,I(n.bridge+2),J0(n.bridge+2,/not/i)+0.3)*108}%">verified</span> the change.`,N===n.bridge+2)q+=`<div class="muted" style="font:600 30px var(--mono);margin-top:12px">${i$(n.bridge+2,X).toLowerCase()}</div>`}else q=`You're absolutely <span class="green">right</span><br>to point that out.`;G.innerHTML=q,G.style.transform=`translateX(-50%) scale(${1+P7(X)*0.02})`;let D=J0(n.bridge+2,/not/i);Y.forEach((M,V)=>M(X,D+V*0.5))});let H=Q.at(-1).root,Y=[DZ(H,"(it didn't)",230,330,-8,[120,-40]),DZ(H,"(IT DIDN'T)",1390,380,7,[-110,-60]),DZ(H,"(it did not)",300,640,-4,[200,40])];return Z(I(n.breakdown)-0.3,I(n.final)-0.4,D6,`
    <div class="panel" style="left:1010px;top:130px;width:800px">
      <div class="bar">usage · this session</div>
      <div class="body">
        <div class="muted" style="font-size:16px;letter-spacing:.2em">TOKENS</div>
        <div class="big-num tk green">0</div>
        <div class="muted" style="font-size:16px;letter-spacing:.2em;margin-top:14px">COST</div>
        <div class="big-num usd gold" style="font-size:84px">$0.00</div>
        <div class="red bstat" style="font-size:22px;margin-top:10px"></div>
      </div>
    </div>
    <div class="stamp rl" style="left:1120px;top:420px;transform:rotate(-8deg)">429<div style="font:700 28px var(--mono);letter-spacing:.1em">RATE LIMITED · retry at 5</div></div>
    <div class="panel cfo" style="left:1010px;top:620px;width:800px">
      <div class="bar">CFO dashboard <span class="green" style="margin-left:auto;font-size:20px">REVENUE ▲ +312%</span></div>
      <div class="body"><svg width="748" height="200" viewBox="0 0 748 200"><path class="line" d="" fill="none" stroke="#4dff8a" stroke-width="4" style="filter:drop-shadow(0 0 8px #4dff8a)"/></svg></div>
    </div>`,(W,X)=>{let G=$0(X,I(n.breakdown),I(n.final)-1),q=1200000*Math.pow(G,1.6)+(X>=I(n.breakdown)?1:0)*4096*U7[n.breakdown].words.filter((z)=>z.s<=X).length;N9(W,".tk").textContent=N6(q),N9(W,".usd").textContent="$"+(q*0.000045).toFixed(2),N9(W,".bstat").textContent=X>=J0(n.breakdown+1,/broken/i)?"✗ build: still broken":"";let N=p9(X,I(n.breakdown+2)-0.1,I(n.breakdown+3)-0.1,0.1,0.25),D=N9(W,".rl");D.style.opacity=String(N*(0.6+0.4*Math.round(X*4%1))),D.style.transform=`rotate(-8deg) scale(${1+(1-B9($0(X,I(n.breakdown+2)-0.1,I(n.breakdown+2)+0.3)))*0.6})`;let M=I(n.breakdown+3)-0.3;q6(N9(W,".cfo"),p9(X,M,99,0.3));let V=$0(X,M,I(n.final)-1),F=[],O=Math.max(2,Math.floor(60*V));for(let z=0;z<O;z++){let C=z/59*740+4,R=190-Math.pow(z/59,2.2)*170-(M0(z)-0.5)*14;F.push(`${z?"L":"M"}${C.toFixed(1)} ${R.toFixed(1)}`)}N9(W,".line").setAttribute("d",F.join(" "))}),Z(I(n.outro)-0.4,n0(n.outro+2)+0.6,"none",`
    <div class="panel" style="left:260px;top:180px;width:1400px">
      <div class="bar"><span class="dots"><i></i><i></i><i></i></span>claude-ish — ~/acme/settings-page</div>
      <div class="body" style="font:700 56px/1.4 var(--sans)">
        <div class="o1 green"></div><div class="o2 white"></div><div class="o3 green"></div>
      </div>
    </div>`,(W,X)=>{let G=i$(n.outro,X);N9(W,".o1").textContent=G?`⏺ ${G}`:"",N9(W,".o2").innerHTML=X>=I(n.outro+1)-0.05?"&gt; No.":"",N9(W,".o3").textContent=X>=I(n.outro+2)?"⏺ Great question!":""}),Q}function HX(J){let Q=new kH(J.appendChild(Object.assign(document.createElement("canvas"),{className:"fx"}))),Z=_O(J),$=J.parentElement.querySelector("#caption");return(K)=>{Q.draw(K);let U="left";for(let H of Z){let Y=p9(K,H.a,H.z,0.35,0.35);if(H.root.style.display=Y>0.001?"":"none",H.cap!==void 0&&K>=H.a&&K<H.z)U=H.cap;if(Y<=0.001)continue;H.root.style.opacity=String(Y),H.update(K,Y)}$.dataset.pos=U}}var AO=/^(deleted|not|dropped|prod|database|midnight|fire|broken|rate|limit|bug|forgot|exist|hallucinated|didn't|no|production|run)$/,zO=/^(right|absolutely|button|blue|rust|microservices|kafka|done|green|issue|confidence|patch|completely|library|hope|readme|dope|emoji|sparkles|context|window|change|token|nickel|cfo|alive|vibes|sight|refactor|refactored|question|great|catch|twelve|comments|verified|verify|made)$/,PO=/^(sweetly|apologize|friend|friday|fun)$/,YX=[[n.intro,"intro","session start"],[n.verse1,"verse 1","the button"],[n.pre1,"pre-chorus","the issue"],[n.chorus1,"chorus","the apology"],[n.verse2,"verse 2","the library"],[n.pre2,"pre-chorus","the context"],[n.chorus2,"chorus 2","the apology (again)"],[n.bridge,"bridge","the verification"],[n.breakdown,"breakdown","the invoice"],[n.final,"final chorus","the friday"],[n.outro,"outro","the offer"]],CO=(J)=>U7.reduce((Q,Z)=>Q+Z.words.filter(($)=>!$.backing&&$.s<=J).length,0),WX={title:"You're Absolutely Right!",fonts:['800 100px "Inter"','400 20px "JetBrains Mono"','700 20px "JetBrains Mono"','400 40px "Permanent Marker"'],overlays:()=>"",endAt:()=>n0(n.outro+2)+0.6,words:{hot:AO,ice:zO,gold:PO},hide:/^(robotic|whisper|human|spoken|calm|robot|voice)$/,hud:(J)=>{let Q=YX.filter(([K])=>J>=I(K)-0.5).at(-1)??YX[0],Z=J>=I(n.final)-0.4&&J<I(n.outro)-0.5,$=Math.round(CO(J)*1287+J*211);return{left:`y · a · r &nbsp;·&nbsp; <b class="${Z?"r":""}">${Q[1]}</b> &nbsp;·&nbsp; ${Q[2]}`,right:`<b>+${$.toLocaleString("en-US")}</b> lines changed &nbsp;·&nbsp; bugs fixed <span class="r">0</span>`}},shots:wH,shotAt:ZX,world:(J)=>{let Q=new SH(J);return{update:(Z)=>Q.update(Z),render:()=>Q.render(),flash:(Z)=>Q.flash(Z),fade:(Z)=>Q.fade(Z)}},scenes:HX};var XX={"24-the-steep-part":i5,"04-read-the-diff":d5,"25-data-here-data-there":JX,"02-never-again":y5,"27-youre-absolutely-right":WX,"08-explain-the-function":h5};var RJ=window.__SONG__,[,,yJ="",FZ=""]=RJ?["","",RJ.slug,RJ.clipId]:location.pathname.split("/"),MX=new URLSearchParams(location.search),LO=MX.has("render");async function TO(){if(RJ)return RJ;let J=await fetch(`/api/timings/${yJ}/${FZ}`);if(!J.ok)throw Error(`No timings for ${yJ}/${FZ}`);return J.json()}var RX=XX[yJ];if(!RX)throw Error(`No music video for ${yJ}`);var G8=RX;document.title=`${G8.title} · video`;document.querySelector(".stage").setAttribute("data-song",yJ);var{shots:vH,shotAt:wO}=G8,yH=await TO();if(!yH.features)throw Error("No audio features yet; run bun timings");sH(yH.lines,yH.features);var MJ=q7();await Promise.all(G8.fonts.map((J)=>document.fonts.load(J)));var c7=(J)=>document.querySelector(J),SO=c7(".stage"),F6=G8.world(c7("#gl")),kO=G8.scenes?.(c7("#scenes"));function o8(J){let Q=J.trim().match(/^(?:([LEW])(\d+)(?::([\w'-]+))?|([\d.]+))([+-][\d.]+)?$/);if(!Q)throw Error(`Bad time "${J}"`);let[,Z,$,K,U,H]=Q,Y=Number($);return(U?Number(U):Z==="L"?I(Y):Z==="E"?n0(Y):J0(Y,new RegExp(`^\\W*${K}`,"i")))+Number(H??0)}var O6=c7("#overlays");O6.innerHTML=`${G8.overlays(MJ)}
  <div class="ov endcard" data-show="${G8.endAt()}|${MJ+5}"><big>${G8.title}</big><span class="by">by Chris Towles</span>made with Claude Code and Opus 5.5<small class="made">${nH(yJ)}</small></div>`;var EX=[...O6.querySelectorAll("[data-show]")].map((J)=>{let[Q,Z]=J.dataset.show.split("|");return{el:J,at:o8(Q),until:o8(Z)}}),jO=[...O6.querySelectorAll("[data-at]:not([data-count]):not(.fill):not(.draw):not(.type)")].filter((J)=>!J.hasAttribute("data-show")).map((J)=>({el:J,at:o8(J.dataset.at)})),vO=[...O6.querySelectorAll(".fill")].map((J)=>({el:J,at:o8(J.dataset.at),until:o8(J.dataset.until)})),yO=[...O6.querySelectorAll("[data-count]")].map((J)=>{let[Q,Z]=J.dataset.count.split(",").map(Number);return{el:J,from:Q,to:Z,at:o8(J.dataset.at),until:o8(J.dataset.until),fmt:J.dataset.fmt??""}}),fO=[...O6.querySelectorAll(".type")].map((J)=>({el:J,text:J.textContent??"",at:o8(J.dataset.at)})),bO=[...O6.querySelectorAll(".draw")].map((J)=>{let Q=J.getTotalLength();return J.style.strokeDasharray=String(Q),{el:J,len:Q,at:o8(J.dataset.at),until:o8(J.dataset.until)}}),xO=new Set(EX.filter((J)=>J.el.classList.contains("stamp")).map((J)=>J.el));function GX(J,Q){if(J.style.opacity=String(S9(Q*1.6)),J.classList.contains("stamp"))J.style.transform=`rotate(-8deg) scale(${2.4-1.4*B9(Q)})`;else if(J instanceof SVGElement)J.style.transform=`scale(${B9(Q)})`;else J.style.transform=`translateY(${(1-B9(Q))*16}px) scale(${0.85+0.15*B9(Q)})`}function hO(J){for(let Q of EX){let Z=gO(J,Q.at,Q.until);if(xO.has(Q.el)){GX(Q.el,$0(J,Q.at,Q.at+0.18)),Q.el.style.opacity=String(Math.min(Number(Q.el.style.opacity),Z));continue}Q.el.style.opacity=String(Z*(Q.el.classList.contains("blink")&&Math.sin(J*14)<-0.3?0.25:1)),Q.el.style.transform=`translateY(${(1-B9($0(J,Q.at,Q.at+0.35)))*40}px)`}for(let Q of jO)if(GX(Q.el,$0(J,Q.at,Q.at+(Q.el.classList.contains("stamp")?0.18:0.25))),Q.el.classList.contains("btn"))Q.el.classList.toggle("on",J>=Q.at&&(Q.el.classList.contains("pick")||J<Q.at+0.45));for(let Q of vO)Q.el.style.width=`${$0(J,Q.at,Q.until)*100*Number(getComputedStyle(Q.el).getPropertyValue("--max")||1)}%`;for(let Q of yO){let Z=Q.from+(Q.to-Q.from)*$0(J,Q.at,Q.until);Q.el.textContent=Q.fmt==="clock"?`${String(Math.floor(Z)).padStart(2,"0")}:${String(Math.floor(Z%1*60)).padStart(2,"0")}`:Q.fmt==="months"?`${Math.floor(Z)} months`:Q.fmt==="secs"?`0:${String(Math.floor(Z)).padStart(2,"0")}`:Math.floor(Z).toLocaleString()}for(let Q of fO)Q.el.textContent=Q.text.slice(0,Math.max(0,Math.floor((J-Q.at)*34)));for(let Q of bO)Q.el.style.strokeDashoffset=String(Q.len*(1-$0(J,Q.at,Q.until)))}var gO=(J,Q,Z)=>S9((J-Q)/0.2)*S9((Z-J)/0.25),{hot:pO,ice:uO,gold:mO}=G8.words,NX=(J)=>J.toLowerCase().replace(/[^a-z0-9'-]/g,""),OJ=document.createElement("div");OJ.className="cap";c7("#caption").appendChild(OJ);var qX=-1,DX=[],FX=(J)=>U7[J].spoken||U7[J].words.some((Q)=>Q.backing&&/^\W*spoken/i.test(Q.w));function dO(J){let Q=-1;for(let K=0;K<U7.length;K++)if(I(K)-0.15<=J)Q=K;let Z=Q+1<U7.length?I(Q+1)-0.15:1/0,$=Q<0?0:Math.min(Z,n0(Q)+(FX(Q)?2.5:3.5));if(Q<0||J>$||J>=G8.endAt()){OJ.style.opacity="0";return}if(Q!==qX){qX=Q;let K=U7[Q],U=/chorus/i.test(K.section),H=FX(Q);OJ.className=`cap ${U&&!H?"chorus":""} ${H?"spoken":""}`,OJ.innerHTML="";let Y=null;DX=K.words.filter((X)=>!(X.backing&&G8.hide?.test(NX(X.w)))).map((X)=>{let G=document.createElement("span"),q=NX(X.w);if(G.className=`w ${pO.test(q)?"hot":uO.test(q)?"ice":mO.test(q)?"gold":""}`,G.textContent=X.w,X.backing)(Y??=OJ.appendChild(Object.assign(document.createElement("div"),{className:"backing"}))).appendChild(G);else OJ.appendChild(G);return{el:G,s:X.s}});let W=K.words.length;OJ.style.fontSize=H?"68px":U?"112px":`${W>14?62:W>10?76:92}px`}OJ.style.opacity=String(1-$0(J,$-0.15,$));for(let K of DX){let U=$0(J,K.s-0.06,K.s+0.1);K.el.style.opacity=String(S9(U*1.8)),K.el.style.transform=`translateY(${(1-B9(U))*0.35}em) scale(${1.25-0.25*B9(U)})`,K.el.style.filter=U<1?`blur(${(1-U)*10}px)`:""}}c7("#hud-title").textContent=G8.title;var lO=c7("#hud-l"),cO=c7("#hud-r"),nO=c7(".progress i"),sO=c7("#flash"),iO=c7("#black"),oO=c7("#hud");function aO(J){let{left:Q,right:Z}=G8.hud(J,wO(J));lO.innerHTML=Q,cO.innerHTML=Z,nO.style.width=`${(S9(J/MJ)*100).toFixed(2)}%`}function OX(J){F6.update(J),F6.render(),kO?.(J),hO(J),dO(J),aO(J),sO.style.opacity=String(F6.flash(J)),iO.style.opacity=String(F6.fade(J)),oO.style.opacity=String(1-F6.fade(J))}if(LO)c7("#hint").remove(),Object.assign(window,{__renderAt:OX,__end:MJ,__shots:vH().map((J)=>({name:J.name,at:J.at,label:J.label,section:J.section})),__ready:!0});else{let J=new Audio(RJ?.audio??`/audio/${yJ}/${FZ}.mp3`);J.preload="auto",J.currentTime=Number(MX.get("t")??0);let Q=()=>{let R=Math.min(innerWidth/1920,innerHeight/1080);SO.style.transform=`translate(${(innerWidth-1920*R)/2}px, ${(innerHeight-1080*R)/2}px) scale(${R})`};window.addEventListener("resize",Q),Q();let Z=c7("#hint"),$=(R)=>{J.currentTime=S9(R,0,MJ-0.05)},K=()=>{if(Z.remove(),J.paused)J.play();else J.pause()},U=(R)=>`${Math.floor(R/60)}:${String(Math.floor(R%60)).padStart(2,"0")}`,H=vH().filter((R,B,_)=>_.findIndex((P)=>P.section===R.section&&Math.abs(P.at-R.at)<30)===B&&(B===0||_[B-1].section!==R.section)),Y=document.createElement("div"),W=parent!==window&&!RJ;Y.className=W?"player slim":"player",Y.innerHTML=`<div class="pl-row"><button class="pl-play">▶</button><span class="pl-time">0:00</span>
    <input class="pl-seek" type="range" min="0" max="${MJ}" step="0.05" value="0" aria-label="Seek">
    <span class="pl-time">${U(MJ)}</span>
    <button class="pl-mute" title="Mute (M)" aria-label="Mute">\uD83D\uDD0A</button><input class="pl-vol" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume">${RJ?"":`<a href="/song/${yJ}/take/${FZ}" target="_top"><button>lyrics</button></a>`}
    <button class="pl-hide" title="Hide controls (H)" aria-label="Hide controls">▾</button></div>
    <div class="pl-chips">${H.map((R)=>`<button data-t="${Math.max(0,R.at-0.3)}">${R.section}</button>`).join("")}</div>`;let X=Object.assign(document.createElement("button"),{className:"pl-show",textContent:"▴",title:"Show controls (H)"});X.setAttribute("aria-label","Show controls"),document.body.append(Y,X);let G=(R)=>{Y.hidden=R,X.hidden=!R;try{localStorage.setItem("player-collapsed",R?"1":"")}catch{}},q=!1;try{q=localStorage.getItem("player-collapsed")==="1"}catch{}G(q),Y.querySelector(".pl-hide").onclick=()=>G(!0),X.onclick=(R)=>{R.stopPropagation(),G(!1)};let N=Y.querySelector(".pl-play"),D=Y.querySelector(".pl-seek"),M=Y.querySelector(".pl-time");N.onclick=K;let V=Y.querySelector(".pl-vol"),F=Y.querySelector(".pl-mute"),O=(R,B=J.muted)=>{J.volume=S9(R),J.muted=B,V.value=String(B?0:J.volume),F.textContent=B||J.volume===0?"\uD83D\uDD07":J.volume<0.5?"\uD83D\uDD09":"\uD83D\uDD0A";try{localStorage.setItem("player-volume",JSON.stringify({v:J.volume,muted:B}))}catch{}},z={v:1,muted:!1};try{z={...z,...JSON.parse(localStorage.getItem("player-volume")??"{}")}}catch{}if(O(z.v,z.muted),V.oninput=()=>O(Number(V.value),!1),F.onclick=()=>O(J.volume||1,!J.muted),D.oninput=()=>{Z.remove(),$(Number(D.value))},Y.querySelectorAll("[data-t]").forEach((R)=>R.onclick=()=>{if(Z.remove(),$(Number(R.dataset.t)),J.paused)J.play()}),Y.addEventListener("click",(R)=>R.stopPropagation()),window.addEventListener("click",K),window.addEventListener("keydown",(R)=>{if(R.code==="Space")R.preventDefault(),K();if(R.code==="ArrowRight")$(J.currentTime+5);if(R.code==="ArrowLeft")$(J.currentTime-5);if(R.code==="KeyH")G(!Y.hidden);if(R.code==="KeyM")O(J.volume||1,!J.muted);if(R.code==="ArrowUp")R.preventDefault(),O(J.volume+0.1,!1);if(R.code==="ArrowDown")R.preventDefault(),O(J.volume-0.1,!1)}),parent!==window&&!RJ){let R=vH(),B=R.map((E,A)=>({key:`${E.name}@${E.at.toFixed(1)}`,name:E.name,label:E.label,section:E.section,at:Math.max(0,E.at),end:R[A+1]?.at??MJ,thumb:""})),_=(E)=>parent.postMessage({from:"video",clipId:FZ,...E},location.origin);_({type:"shots",shots:B}),setTimeout(()=>{let E=c7("#gl"),A=Object.assign(document.createElement("canvas"),{width:384,height:216}),y=A.getContext("2d");for(let S of B)F6.update((S.at+Math.min(S.end,S.at+6))/2),F6.render(),y.drawImage(E,0,0,384,216),S.thumb=A.toDataURL("image/jpeg",0.7);_({type:"shots",shots:B})},300);let P=-1;setInterval(()=>{let E=J.currentTime;if(E!==P)_({type:"time",t:P=E})},250),window.addEventListener("message",(E)=>{if(E.origin!==location.origin||E.data?.type!=="seek")return;if(Z.remove(),$(Number(E.data.t)),J.paused)J.play()})}let C=()=>{let R=J.ended?MJ:J.currentTime;OX(R),N.textContent=J.paused?"▶":"❚❚",D.value=String(R),M.textContent=U(R),requestAnimationFrame(C)};C()}
