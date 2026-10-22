var zH={"24-the-steep-part":"2026-10-18","04-read-the-diff":"2026-10-18","25-data-here-data-there":"2026-10-18","02-never-again":"2026-10-18","08-explain-the-function":"2026-10-21"},EE=Object.keys(zH),LH=(J)=>{let $=zH[J];return $?new Date(`${$}T12:00:00Z`).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}):""};var N7=[],EJ={fps:30,duration:0,rms:[0],bass:[0],bpm:120,beatOffset:0};function PH(J,$){N7=J,EJ=$}var F7=()=>EJ.duration,w=(J)=>N7[Math.min(J,N7.length-1)].words[0].s,K9=(J)=>N7[J].words.at(-1).e,K0=(J,$)=>(N7[J].words.find((Q)=>$.test(Q.w))??N7[J].words[0]).s,j9=(J,$=0,Q=1)=>Math.min(Q,Math.max($,J)),j=(J,$,Q)=>J+($-J)*Q,N9=(J,$,Q)=>{let Z=j9((Q-J)/($-J));return Z*Z*(3-2*Z)},Y9=(J)=>1-Math.pow(1-j9(J),3),p8=(J)=>Math.pow(j9(J),3),b9=(J)=>{J=j9(J);let $=1.9;return 1+($+1)*Math.pow(J-1,3)+$*Math.pow(J-1,2)};var W0=(J,$,Q)=>j9((J-$)/(Q-$)),t5=(J)=>j9(Math.floor(J*EJ.fps),0,EJ.rms.length-1);var wH=(J)=>{let $=t5(J),Q=EJ.bass,Z=(K)=>Q[Math.max(0,K)]??0;return(Z($)*2+Z($-1)+Z($-2))/4},n7=()=>60/EJ.bpm,s7=(J)=>{let $=n7(),Q=((J-EJ.beatOffset)%$+$)%$;return Math.exp(-Q*9)},H6=(J)=>Math.max(0,Math.floor((J-EJ.beatOffset)/n7())),L0=(J)=>{let $=Math.sin(J*127.1+311.7)*43758.5453;return $-Math.floor($)};var FW="186";var DW=0,EK=1,EW=2;var O$=1,BJ=2,w6=3,T6=0,E7=1,m9=2,x7=0,R$=1,W7=2,OK=3,RK=4,OW=5;var S6=100,RW=101,MW=102,VW=103,_W=104,BW=200,IW=201,CW=202,AW=203,zW=204,LW=205,PW=206,wW=207,TW=208,SW=209,kW=210,jW=211,vW=212,yW=213,fW=214,bW=0,xW=1,hW=2,MK=3,gW=4,pW=5,uW=6,mW=7,dW=0,lW=1,cW=2,X8=0,M$=1,V$=2,_$=3,G8=4,B$=5,I$=6,C$=7;var k6=301,yJ=302,cQ=303,nQ=304,A$=306,S8=1000,sQ=1001,nW=1002,a7=1003,sW=1004;var z$=1005;var h7=1006,iQ=1007;var fJ=1008;var q8=1009,iW=1010,oW=1011,L$=1012,VK=1013,IJ=1014,o8=1015,I7=1016,_K=1017,BK=1018,j6=1020,aW=35902,rW=35899,tW=1021,eW=1022,k8=1023,bJ=1026,xJ=1027,JY=1028,IK=1029,hJ=1030,CK=1031;var AK=1033,oQ=33776,aQ=33777,rQ=33778,tQ=33779,zK=35840,LK=35841,PK=35842,wK=35843,TK=36196,SK=37492,kK=37496,jK=37488,vK=37489,eQ=37490,yK=37491,fK=37808,bK=37809,xK=37810,hK=37811,gK=37812,pK=37813,uK=37814,mK=37815,dK=37816,lK=37817,cK=37818,nK=37819,sK=37820,iK=37821,oK=36492,aK=36494,rK=36495,tK=36283,eK=36284,JZ=36285,JU=36286;var $U=3201;var QU=0,$Y=1,gJ="",R7="srgb",ZU="srgb-linear",KU="linear",c9="srgb";var QY=512,ZY=513,KY=514,$Z=515,UY=516,HY=517,QZ=518,WY=519;var UU="300 es",HU=2000;function e5(J){for(let $=J.length-1;$>=0;--$)if(J[$]>=65535)return!0;return!1}function JN(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function N$(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function YY(){let J=N$("canvas");return J.style.display="block",J}var TH={},L6=null;function X$(...J){let $="THREE."+J.shift();if(L6)L6("log",$,...J);else console.log($,...J)}function NY(J){let $=J[0];if(typeof $==="string"&&$.startsWith("TSL:")){let Q=J[1];if(Q&&Q.isStackTrace)J[0]+=" "+Q.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function $9(...J){J=NY(J);let $="THREE."+J.shift();if(L6)L6("warn",$,...J);else{let Q=J[0];if(Q&&Q.isStackTrace)console.warn(Q.getError($));else console.warn($,...J)}}function U9(...J){J=NY(J);let $="THREE."+J.shift();if(L6)L6("error",$,...J);else{let Q=J[0];if(Q&&Q.isStackTrace)console.error(Q.getError($));else console.error($,...J)}}function jJ(...J){let $=J.join(" ");if($ in TH)return;TH[$]=!0,$9(...J)}function XY(J,$,Q){return new Promise(function(Z,K){function U(){switch(J.clientWaitSync($,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:K();break;case J.TIMEOUT_EXPIRED:setTimeout(U,Q);break;default:Z()}}setTimeout(U,Q)})}var GY={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class a8{addEventListener(J,$){if(this._listeners===void 0)this._listeners={};let Q=this._listeners;if(Q[J]===void 0)Q[J]=[];if(Q[J].indexOf($)===-1)Q[J].push($)}hasEventListener(J,$){let Q=this._listeners;if(Q===void 0)return!1;return Q[J]!==void 0&&Q[J].indexOf($)!==-1}removeEventListener(J,$){let Q=this._listeners;if(Q===void 0)return;let Z=Q[J];if(Z!==void 0){let K=Z.indexOf($);if(K!==-1)Z.splice(K,1)}}dispatchEvent(J){let $=this._listeners;if($===void 0)return;let Q=$[J.type];if(Q!==void 0){J.target=this;let Z=Q.slice(0);for(let K=0,U=Z.length;K<U;K++)Z[K].call(this,J);J.target=null}}}var T7=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var gQ=Math.PI/180,G$=180/Math.PI;function n8(){let J=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(T7[J&255]+T7[J>>8&255]+T7[J>>16&255]+T7[J>>24&255]+"-"+T7[$&255]+T7[$>>8&255]+"-"+T7[$>>16&15|64]+T7[$>>24&255]+"-"+T7[Q&63|128]+T7[Q>>8&255]+"-"+T7[Q>>16&255]+T7[Q>>24&255]+T7[Z&255]+T7[Z>>8&255]+T7[Z>>16&255]+T7[Z>>24&255]).toLowerCase()}function B9(J,$,Q){return Math.max($,Math.min(Q,J))}function $N(J,$){return(J%$+$)%$}function hZ(J,$,Q){return(1-Q)*J+Q*$}function w8(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:case Uint8ClampedArray:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function i9(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class G0{static{G0.prototype.isVector2=!0}constructor(J=0,$=0){this.x=J,this.y=$}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,$){return this.x=J,this.y=$,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let $=this.x,Q=this.y,Z=J.elements;return this.x=Z[0]*$+Z[3]*Q+Z[6],this.y=Z[1]*$+Z[4]*Q+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,$){return this.x=B9(this.x,J.x,$.x),this.y=B9(this.y,J.y,$.y),this}clampScalar(J,$){return this.x=B9(this.x,J,$),this.y=B9(this.y,J,$),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(B9(Q,J,$))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(B9(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y;return $*$+Q*Q}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this}rotateAround(J,$){let Q=Math.cos($),Z=Math.sin($),K=this.x-J.x,U=this.y-J.y;return this.x=K*Q-U*Z+J.x,this.y=K*Z+U*Q+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class F8{constructor(J=0,$=0,Q=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=$,this._z=Q,this._w=Z}static slerpFlat(J,$,Q,Z,K,U,H){let W=Q[Z+0],Y=Q[Z+1],N=Q[Z+2],X=Q[Z+3],q=K[U+0],G=K[U+1],F=K[U+2],O=K[U+3];if(X!==O||W!==q||Y!==G||N!==F){let V=W*q+Y*G+N*F+X*O;if(V<0)q=-q,G=-G,F=-F,O=-O,V=-V;let D=1-H;if(V<0.9995){let E=Math.acos(V),C=Math.sin(E);D=Math.sin(D*E)/C,H=Math.sin(H*E)/C,W=W*D+q*H,Y=Y*D+G*H,N=N*D+F*H,X=X*D+O*H}else{W=W*D+q*H,Y=Y*D+G*H,N=N*D+F*H,X=X*D+O*H;let E=1/Math.sqrt(W*W+Y*Y+N*N+X*X);W*=E,Y*=E,N*=E,X*=E}}J[$]=W,J[$+1]=Y,J[$+2]=N,J[$+3]=X}static multiplyQuaternionsFlat(J,$,Q,Z,K,U){let H=Q[Z],W=Q[Z+1],Y=Q[Z+2],N=Q[Z+3],X=K[U],q=K[U+1],G=K[U+2],F=K[U+3];return J[$]=H*F+N*X+W*G-Y*q,J[$+1]=W*F+N*q+Y*X-H*G,J[$+2]=Y*F+N*G+H*q-W*X,J[$+3]=N*F-H*X-W*q-Y*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,$,Q,Z){return this._x=J,this._y=$,this._z=Q,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,$=!0){let{_x:Q,_y:Z,_z:K,_order:U}=J,H=Math.cos,W=Math.sin,Y=H(Q/2),N=H(Z/2),X=H(K/2),q=W(Q/2),G=W(Z/2),F=W(K/2);switch(U){case"XYZ":this._x=q*N*X+Y*G*F,this._y=Y*G*X-q*N*F,this._z=Y*N*F+q*G*X,this._w=Y*N*X-q*G*F;break;case"YXZ":this._x=q*N*X+Y*G*F,this._y=Y*G*X-q*N*F,this._z=Y*N*F-q*G*X,this._w=Y*N*X+q*G*F;break;case"ZXY":this._x=q*N*X-Y*G*F,this._y=Y*G*X+q*N*F,this._z=Y*N*F+q*G*X,this._w=Y*N*X-q*G*F;break;case"ZYX":this._x=q*N*X-Y*G*F,this._y=Y*G*X+q*N*F,this._z=Y*N*F-q*G*X,this._w=Y*N*X+q*G*F;break;case"YZX":this._x=q*N*X+Y*G*F,this._y=Y*G*X+q*N*F,this._z=Y*N*F-q*G*X,this._w=Y*N*X-q*G*F;break;case"XZY":this._x=q*N*X-Y*G*F,this._y=Y*G*X-q*N*F,this._z=Y*N*F+q*G*X,this._w=Y*N*X+q*G*F;break;default:$9("Quaternion: .setFromEuler() encountered an unknown order: "+U)}if($===!0)this._onChangeCallback();return this}setFromAxisAngle(J,$){let Q=$/2,Z=Math.sin(Q);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos(Q),this._onChangeCallback(),this}setFromRotationMatrix(J){let $=J.elements,Q=$[0],Z=$[4],K=$[8],U=$[1],H=$[5],W=$[9],Y=$[2],N=$[6],X=$[10],q=Q+H+X;if(q>0){let G=0.5/Math.sqrt(q+1);this._w=0.25/G,this._x=(N-W)*G,this._y=(K-Y)*G,this._z=(U-Z)*G}else if(Q>H&&Q>X){let G=2*Math.sqrt(1+Q-H-X);this._w=(N-W)/G,this._x=0.25*G,this._y=(Z+U)/G,this._z=(K+Y)/G}else if(H>X){let G=2*Math.sqrt(1+H-Q-X);this._w=(K-Y)/G,this._x=(Z+U)/G,this._y=0.25*G,this._z=(W+N)/G}else{let G=2*Math.sqrt(1+X-Q-H);this._w=(U-Z)/G,this._x=(K+Y)/G,this._y=(W+N)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,$){let Q=J.dot($)+1;if(Q<0.00000001)if(Q=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Q;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Q;else this._x=J.y*$.z-J.z*$.y,this._y=J.z*$.x-J.x*$.z,this._z=J.x*$.y-J.y*$.x,this._w=Q;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(B9(this.dot(J),-1,1)))}rotateTowards(J,$){let Q=this.angleTo(J);if(Q===0)return this;let Z=Math.min(1,$/Q);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,$){let{_x:Q,_y:Z,_z:K,_w:U}=J,H=$._x,W=$._y,Y=$._z,N=$._w;return this._x=Q*N+U*H+Z*Y-K*W,this._y=Z*N+U*W+K*H-Q*Y,this._z=K*N+U*Y+Q*W-Z*H,this._w=U*N-Q*H-Z*W-K*Y,this._onChangeCallback(),this}slerp(J,$){let{_x:Q,_y:Z,_z:K,_w:U}=J,H=this.dot(J);if(H<0)Q=-Q,Z=-Z,K=-K,U=-U,H=-H;let W=1-$;if(H<0.9995){let Y=Math.acos(H),N=Math.sin(Y);W=Math.sin(W*Y)/N,$=Math.sin($*Y)/N,this._x=this._x*W+Q*$,this._y=this._y*W+Z*$,this._z=this._z*W+K*$,this._w=this._w*W+U*$,this._onChangeCallback()}else this._x=this._x*W+Q*$,this._y=this._y*W+Z*$,this._z=this._z*W+K*$,this._w=this._w*W+U*$,this.normalize();return this}slerpQuaternions(J,$,Q){return this.copy(J).slerp($,Q)}random(){let J=2*Math.PI*Math.random(),$=2*Math.PI*Math.random(),Q=Math.random(),Z=Math.sqrt(1-Q),K=Math.sqrt(Q);return this.set(Z*Math.sin(J),Z*Math.cos(J),K*Math.sin($),K*Math.cos($))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,$=0){return this._x=J[$],this._y=J[$+1],this._z=J[$+2],this._w=J[$+3],this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._w,J}fromBufferAttribute(J,$){return this._x=J.getX($),this._y=J.getY($),this._z=J.getZ($),this._w=J.getW($),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{static{k.prototype.isVector3=!0}constructor(J=0,$=0,Q=0){this.x=J,this.y=$,this.z=Q}set(J,$,Q){if(Q===void 0)Q=this.z;return this.x=J,this.y=$,this.z=Q,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,$){return this.x=J.x*$.x,this.y=J.y*$.y,this.z=J.z*$.z,this}applyEuler(J){return this.applyQuaternion(SH.setFromEuler(J))}applyAxisAngle(J,$){return this.applyQuaternion(SH.setFromAxisAngle(J,$))}applyMatrix3(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements;return this.x=K[0]*$+K[3]*Q+K[6]*Z,this.y=K[1]*$+K[4]*Q+K[7]*Z,this.z=K[2]*$+K[5]*Q+K[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements,U=1/(K[3]*$+K[7]*Q+K[11]*Z+K[15]);return this.x=(K[0]*$+K[4]*Q+K[8]*Z+K[12])*U,this.y=(K[1]*$+K[5]*Q+K[9]*Z+K[13])*U,this.z=(K[2]*$+K[6]*Q+K[10]*Z+K[14])*U,this}applyQuaternion(J){let $=this.x,Q=this.y,Z=this.z,K=J.x,U=J.y,H=J.z,W=J.w,Y=2*(U*Z-H*Q),N=2*(H*$-K*Z),X=2*(K*Q-U*$);return this.x=$+W*Y+U*X-H*N,this.y=Q+W*N+H*Y-K*X,this.z=Z+W*X+K*N-U*Y,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let $=this.x,Q=this.y,Z=this.z,K=J.elements;return this.x=K[0]*$+K[4]*Q+K[8]*Z,this.y=K[1]*$+K[5]*Q+K[9]*Z,this.z=K[2]*$+K[6]*Q+K[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,$){return this.x=B9(this.x,J.x,$.x),this.y=B9(this.y,J.y,$.y),this.z=B9(this.z,J.z,$.z),this}clampScalar(J,$){return this.x=B9(this.x,J,$),this.y=B9(this.y,J,$),this.z=B9(this.z,J,$),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(B9(Q,J,$))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,$){let{x:Q,y:Z,z:K}=J,U=$.x,H=$.y,W=$.z;return this.x=Z*W-K*H,this.y=K*U-Q*W,this.z=Q*H-Z*U,this}projectOnVector(J){let $=J.lengthSq();if($===0)return this.set(0,0,0);let Q=J.dot(this)/$;return this.copy(J).multiplyScalar(Q)}projectOnPlane(J){return gZ.copy(this).projectOnVector(J),this.sub(gZ)}reflect(J){return this.sub(gZ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(B9(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y,Z=this.z-J.z;return $*$+Q*Q+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,$,Q){let Z=Math.sin($)*J;return this.x=Z*Math.sin(Q),this.y=Math.cos($)*J,this.z=Z*Math.cos(Q),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,$,Q){return this.x=J*Math.sin($),this.y=Q,this.z=J*Math.cos($),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this}setFromMatrixScale(J){let $=this.setFromMatrixColumn(J,0).length(),Q=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=$,this.y=Q,this.z=Z,this}setFromMatrixColumn(J,$){return this.fromArray(J.elements,$*4)}setFromMatrix3Column(J,$){return this.fromArray(J.elements,$*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,$=Math.random()*2-1,Q=Math.sqrt(1-$*$);return this.x=Q*Math.cos(J),this.y=$,this.z=Q*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var gZ=new k,SH=new F8;class X9{static{X9.prototype.isMatrix3=!0}constructor(J,$,Q,Z,K,U,H,W,Y){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,$,Q,Z,K,U,H,W,Y)}set(J,$,Q,Z,K,U,H,W,Y){let N=this.elements;return N[0]=J,N[1]=Z,N[2]=H,N[3]=$,N[4]=K,N[5]=W,N[6]=Q,N[7]=U,N[8]=Y,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],this}extractBasis(J,$,Q){return J.setFromMatrix3Column(this,0),$.setFromMatrix3Column(this,1),Q.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let $=J.elements;return this.set($[0],$[4],$[8],$[1],$[5],$[9],$[2],$[6],$[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,Z=$.elements,K=this.elements,U=Q[0],H=Q[3],W=Q[6],Y=Q[1],N=Q[4],X=Q[7],q=Q[2],G=Q[5],F=Q[8],O=Z[0],V=Z[3],D=Z[6],E=Z[1],C=Z[4],L=Z[7],R=Z[2],_=Z[5],B=Z[8];return K[0]=U*O+H*E+W*R,K[3]=U*V+H*C+W*_,K[6]=U*D+H*L+W*B,K[1]=Y*O+N*E+X*R,K[4]=Y*V+N*C+X*_,K[7]=Y*D+N*L+X*B,K[2]=q*O+G*E+F*R,K[5]=q*V+G*C+F*_,K[8]=q*D+G*L+F*B,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[3]*=J,$[6]*=J,$[1]*=J,$[4]*=J,$[7]*=J,$[2]*=J,$[5]*=J,$[8]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],U=J[4],H=J[5],W=J[6],Y=J[7],N=J[8];return $*U*N-$*H*Y-Q*K*N+Q*H*W+Z*K*Y-Z*U*W}invert(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],U=J[4],H=J[5],W=J[6],Y=J[7],N=J[8],X=N*U-H*Y,q=H*W-N*K,G=Y*K-U*W,F=$*X+Q*q+Z*G;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let O=1/F;return J[0]=X*O,J[1]=(Z*Y-N*Q)*O,J[2]=(H*Q-Z*U)*O,J[3]=q*O,J[4]=(N*$-Z*W)*O,J[5]=(Z*K-H*$)*O,J[6]=G*O,J[7]=(Q*W-Y*$)*O,J[8]=(U*$-Q*K)*O,this}transpose(){let J,$=this.elements;return J=$[1],$[1]=$[3],$[3]=J,J=$[2],$[2]=$[6],$[6]=J,J=$[5],$[5]=$[7],$[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let $=this.elements;return J[0]=$[0],J[1]=$[3],J[2]=$[6],J[3]=$[1],J[4]=$[4],J[5]=$[7],J[6]=$[2],J[7]=$[5],J[8]=$[8],this}setUvTransform(J,$,Q,Z,K,U,H){let W=Math.cos(K),Y=Math.sin(K);return this.set(Q*W,Q*Y,-Q*(W*U+Y*H)+U+J,-Z*Y,Z*W,-Z*(-Y*U+W*H)+H+$,0,0,1),this}scale(J,$){return jJ("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(pZ.makeScale(J,$)),this}rotate(J){return jJ("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(pZ.makeRotation(-J)),this}translate(J,$){return jJ("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(pZ.makeTranslation(J,$)),this}makeTranslation(J,$){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,$,0,0,1);return this}makeRotation(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,Q,$,0,0,0,1),this}makeScale(J,$){return this.set(J,0,0,0,$,0,0,0,1),this}equals(J){let $=this.elements,Q=J.elements;for(let Z=0;Z<9;Z++)if($[Z]!==Q[Z])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<9;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var pZ=new X9,kH=new X9().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),jH=new X9().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function QN(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(K,U,H){if(this.enabled===!1||U===H||!U||!H)return K;if(this.spaces[U].transfer==="srgb")K.r=s8(K.r),K.g=s8(K.g),K.b=s8(K.b);if(this.spaces[U].primaries!==this.spaces[H].primaries)K.applyMatrix3(this.spaces[U].toXYZ),K.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")K.r=z6(K.r),K.g=z6(K.g),K.b=z6(K.b);return K},workingToColorSpace:function(K,U){return this.convert(K,this.workingColorSpace,U)},colorSpaceToWorking:function(K,U){return this.convert(K,U,this.workingColorSpace)},getPrimaries:function(K){return this.spaces[K].primaries},getTransfer:function(K){if(K==="")return"linear";return this.spaces[K].transfer},getToneMappingMode:function(K){return this.spaces[K].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(K,U=this.workingColorSpace){return K.fromArray(this.spaces[U].luminanceCoefficients)},define:function(K){Object.assign(this.spaces,K)},_getMatrix:function(K,U,H){return K.copy(this.spaces[U].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(K){return this.spaces[K].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(K=this.workingColorSpace){return this.spaces[K].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(K,U){return jJ("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(K,U)},toWorkingColorSpace:function(K,U){return jJ("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(K,U)}},$=[0.64,0.33,0.3,0.6,0.15,0.06],Q=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:$,whitePoint:Z,transfer:"linear",toXYZ:kH,fromXYZ:jH,luminanceCoefficients:Q,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:$,whitePoint:Z,transfer:"srgb",toXYZ:kH,fromXYZ:jH,luminanceCoefficients:Q,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var _9=QN();function s8(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function z6(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var W6;class WU{static getDataURL(J,$="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let Q;if(J instanceof HTMLCanvasElement)Q=J;else{if(W6===void 0)W6=N$("canvas");W6.width=J.width,W6.height=J.height;let Z=W6.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);Q=W6}return Q.toDataURL($)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let $=N$("canvas");$.width=J.width,$.height=J.height;let Q=$.getContext("2d");Q.drawImage(J,0,0,J.width,J.height);let Z=Q.getImageData(0,0,J.width,J.height),K=Z.data;for(let U=0;U<K.length;U++)K[U]=s8(K[U]/255)*255;return Q.putImageData(Z,0,0),$}else if(J.data){let $=J.data.slice(0);for(let Q=0;Q<$.length;Q++)if($ instanceof Uint8Array||$ instanceof Uint8ClampedArray)$[Q]=Math.floor(s8($[Q]/255)*255);else $[Q]=s8($[Q]);return{data:$,width:J.width,height:J.height}}else return $9("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var ZN=0;class P${constructor(J=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ZN++}),this.uuid=n8(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let $=this.data;if(typeof HTMLVideoElement<"u"&&$ instanceof HTMLVideoElement)J.set($.videoWidth,$.videoHeight,0);else if(typeof VideoFrame<"u"&&$ instanceof VideoFrame)J.set($.displayWidth,$.displayHeight,0);else if($!==null)J.set($.width,$.height,$.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Q={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let K;if(Array.isArray(Z)){K=[];for(let U=0,H=Z.length;U<H;U++)if(Z[U].isDataTexture)K.push(uZ(Z[U].image));else K.push(uZ(Z[U]))}else K=uZ(Z);Q.url=K}if(!$)J.images[this.uuid]=Q;return Q}}function uZ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return WU.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return $9("Texture: Unable to serialize Texture."),{}}var KN=0,mZ=new k;class P7 extends a8{constructor(J=P7.DEFAULT_IMAGE,$=P7.DEFAULT_MAPPING,Q=1001,Z=1001,K=1006,U=1008,H=1023,W=1009,Y=P7.DEFAULT_ANISOTROPY,N=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:KN++}),this.uuid=n8(),this.name="",this.source=new P$(J),this.mipmaps=[],this.mapping=$,this.channel=0,this.wrapS=Q,this.wrapT=Z,this.magFilter=K,this.minFilter=U,this.anisotropy=Y,this.format=H,this.internalFormat=null,this.type=W,this.offset=new G0(0,0),this.repeat=new G0(1,1),this.center=new G0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new X9,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=N,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(mZ).x}get height(){return this.source.getSize(mZ).y}get depth(){return this.source.getSize(mZ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let $ in J){let Q=J[$];if(Q===void 0){$9(`Texture.setValues(): parameter '${$}' has value of undefined.`);continue}let Z=this[$];if(Z===void 0){$9(`Texture.setValues(): property '${$}' does not exist.`);continue}if(Z&&Q&&(Z.isVector2&&Q.isVector2))Z.copy(Q);else if(Z&&Q&&(Z.isVector3&&Q.isVector3))Z.copy(Q);else if(Z&&Q&&(Z.isMatrix3&&Q.isMatrix3))Z.copy(Q);else this[$]=Q}}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Q={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(!$)J.textures[this.uuid]=Q;return Q}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}P7.DEFAULT_IMAGE=null;P7.DEFAULT_MAPPING=300;P7.DEFAULT_ANISOTROPY=1;class K7{static{K7.prototype.isVector4=!0}constructor(J=0,$=0,Q=0,Z=1){this.x=J,this.y=$,this.z=Q,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,$,Q,Z){return this.x=J,this.y=$,this.z=Q,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;case 3:this.w=$;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this.w=J.w+$.w,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this.w+=J.w*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this.w=J.w-$.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let $=this.x,Q=this.y,Z=this.z,K=this.w,U=J.elements;return this.x=U[0]*$+U[4]*Q+U[8]*Z+U[12]*K,this.y=U[1]*$+U[5]*Q+U[9]*Z+U[13]*K,this.z=U[2]*$+U[6]*Q+U[10]*Z+U[14]*K,this.w=U[3]*$+U[7]*Q+U[11]*Z+U[15]*K,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let $=Math.sqrt(1-J.w*J.w);if($<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/$,this.y=J.y/$,this.z=J.z/$;return this}setAxisAngleFromRotationMatrix(J){let $,Q,Z,K,U=0.01,H=0.1,W=J.elements,Y=W[0],N=W[4],X=W[8],q=W[1],G=W[5],F=W[9],O=W[2],V=W[6],D=W[10];if(Math.abs(N-q)<0.01&&Math.abs(X-O)<0.01&&Math.abs(F-V)<0.01){if(Math.abs(N+q)<0.1&&Math.abs(X+O)<0.1&&Math.abs(F+V)<0.1&&Math.abs(Y+G+D-3)<0.1)return this.set(1,0,0,0),this;$=Math.PI;let C=(Y+1)/2,L=(G+1)/2,R=(D+1)/2,_=(N+q)/4,B=(X+O)/4,A=(F+V)/4;if(C>L&&C>R)if(C<0.01)Q=0,Z=0.707106781,K=0.707106781;else Q=Math.sqrt(C),Z=_/Q,K=B/Q;else if(L>R)if(L<0.01)Q=0.707106781,Z=0,K=0.707106781;else Z=Math.sqrt(L),Q=_/Z,K=A/Z;else if(R<0.01)Q=0.707106781,Z=0.707106781,K=0;else K=Math.sqrt(R),Q=B/K,Z=A/K;return this.set(Q,Z,K,$),this}let E=Math.sqrt((V-F)*(V-F)+(X-O)*(X-O)+(q-N)*(q-N));if(Math.abs(E)<0.001)E=1;return this.x=(V-F)/E,this.y=(X-O)/E,this.z=(q-N)/E,this.w=Math.acos((Y+G+D-1)/2),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this.w=$[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,$){return this.x=B9(this.x,J.x,$.x),this.y=B9(this.y,J.y,$.y),this.z=B9(this.z,J.z,$.z),this.w=B9(this.w,J.w,$.w),this}clampScalar(J,$){return this.x=B9(this.x,J,$),this.y=B9(this.y,J,$),this.z=B9(this.z,J,$),this.w=B9(this.w,J,$),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(B9(Q,J,$))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this.w+=(J.w-this.w)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this.w=J.w+($.w-J.w)*Q,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this.w=J[$+3],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J[$+3]=this.w,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this.w=J.getW($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class YU extends a8{constructor(J=1,$=1,Q={}){super();Q=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},Q),this.isRenderTarget=!0,this.width=J,this.height=$,this.depth=Q.depth,this.scissor=new K7(0,0,J,$),this.scissorTest=!1,this.viewport=new K7(0,0,J,$),this.textures=[];let Z={width:J,height:$,depth:Q.depth},K=new P7(Z),U=Q.count;for(let H=0;H<U;H++)this.textures[H]=K.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions(Q),this.depthBuffer=Q.depthBuffer,this.stencilBuffer=Q.stencilBuffer,this.resolveColorBuffer=Q.resolveColorBuffer,this.resolveDepthBuffer=Q.resolveDepthBuffer,this.resolveStencilBuffer=Q.resolveStencilBuffer,this.storeMultisampledColorBuffer=Q.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=Q.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=Q.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=Q.depthTexture,this.samples=Q.samples,this.multiview=Q.multiview,this.useArrayDepthTexture=Q.useArrayDepthTexture}_setTextureOptions(J={}){let $={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)$.mapping=J.mapping;if(J.wrapS!==void 0)$.wrapS=J.wrapS;if(J.wrapT!==void 0)$.wrapT=J.wrapT;if(J.wrapR!==void 0)$.wrapR=J.wrapR;if(J.magFilter!==void 0)$.magFilter=J.magFilter;if(J.minFilter!==void 0)$.minFilter=J.minFilter;if(J.format!==void 0)$.format=J.format;if(J.type!==void 0)$.type=J.type;if(J.anisotropy!==void 0)$.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)$.colorSpace=J.colorSpace;if(J.flipY!==void 0)$.flipY=J.flipY;if(J.generateMipmaps!==void 0)$.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)$.internalFormat=J.internalFormat;for(let Q=0;Q<this.textures.length;Q++)this.textures[Q].setValues($)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null&&this._depthTexture.renderTarget===this)this._depthTexture.renderTarget=null;if(J!==null&&J.renderTarget===null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,$,Q=1){if(this.width!==J||this.height!==$||this.depth!==Q){this.width=J,this.height=$,this.depth=Q;for(let Z=0,K=this.textures.length;Z<K;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=$,this.textures[Z].image.depth=Q,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,$),this.scissor.set(0,0,J,$)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let $=0,Q=J.textures.length;$<Q;$++){this.textures[$]=J.textures[$].clone(),this.textures[$].isRenderTargetTexture=!0,this.textures[$].renderTarget=this;let Z=Object.assign({},J.textures[$].image);this.textures[$].source=new P$(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveColorBuffer=J.resolveColorBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,this.storeMultisampledColorBuffer=J.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=J.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=J.storeMultisampledStencilBuffer,J.depthTexture!==null)if(J.depthTexture.renderTarget===J){let $=J.depthTexture.clone();$.renderTarget=null,this.depthTexture=$}else this.depthTexture=J.depthTexture;return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class X7 extends YU{constructor(J=1,$=1,Q={}){super(J,$,Q);this.isWebGLRenderTarget=!0}}class ZZ extends P7{constructor(J=null,$=1,Q=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:$,height:Q,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class NU extends P7{constructor(J=null,$=1,Q=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:$,height:Q,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(J){return super.copy(J),this.wrapR=J.wrapR,this}}class v9{static{v9.prototype.isMatrix4=!0}constructor(J,$,Q,Z,K,U,H,W,Y,N,X,q,G,F,O,V){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,$,Q,Z,K,U,H,W,Y,N,X,q,G,F,O,V)}set(J,$,Q,Z,K,U,H,W,Y,N,X,q,G,F,O,V){let D=this.elements;return D[0]=J,D[4]=$,D[8]=Q,D[12]=Z,D[1]=K,D[5]=U,D[9]=H,D[13]=W,D[2]=Y,D[6]=N,D[10]=X,D[14]=q,D[3]=G,D[7]=F,D[11]=O,D[15]=V,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new v9().fromArray(this.elements)}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],$[9]=Q[9],$[10]=Q[10],$[11]=Q[11],$[12]=Q[12],$[13]=Q[13],$[14]=Q[14],$[15]=Q[15],this}copyPosition(J){let $=this.elements,Q=J.elements;return $[12]=Q[12],$[13]=Q[13],$[14]=Q[14],this}setFromMatrix3(J){let $=J.elements;return this.set($[0],$[3],$[6],0,$[1],$[4],$[7],0,$[2],$[5],$[8],0,0,0,0,1),this}extractBasis(J,$,Q){if(this.determinantAffine()===0)return J.set(1,0,0),$.set(0,1,0),Q.set(0,0,1),this;return J.setFromMatrixColumn(this,0),$.setFromMatrixColumn(this,1),Q.setFromMatrixColumn(this,2),this}makeBasis(J,$,Q){return this.set(J.x,$.x,Q.x,0,J.y,$.y,Q.y,0,J.z,$.z,Q.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let $=this.elements,Q=J.elements,Z=1/Y6.setFromMatrixColumn(J,0).length(),K=1/Y6.setFromMatrixColumn(J,1).length(),U=1/Y6.setFromMatrixColumn(J,2).length();return $[0]=Q[0]*Z,$[1]=Q[1]*Z,$[2]=Q[2]*Z,$[3]=0,$[4]=Q[4]*K,$[5]=Q[5]*K,$[6]=Q[6]*K,$[7]=0,$[8]=Q[8]*U,$[9]=Q[9]*U,$[10]=Q[10]*U,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromEuler(J){let $=this.elements,Q=J.x,Z=J.y,K=J.z,U=Math.cos(Q),H=Math.sin(Q),W=Math.cos(Z),Y=Math.sin(Z),N=Math.cos(K),X=Math.sin(K);if(J.order==="XYZ"){let q=U*N,G=U*X,F=H*N,O=H*X;$[0]=W*N,$[4]=-W*X,$[8]=Y,$[1]=G+F*Y,$[5]=q-O*Y,$[9]=-H*W,$[2]=O-q*Y,$[6]=F+G*Y,$[10]=U*W}else if(J.order==="YXZ"){let q=W*N,G=W*X,F=Y*N,O=Y*X;$[0]=q+O*H,$[4]=F*H-G,$[8]=U*Y,$[1]=U*X,$[5]=U*N,$[9]=-H,$[2]=G*H-F,$[6]=O+q*H,$[10]=U*W}else if(J.order==="ZXY"){let q=W*N,G=W*X,F=Y*N,O=Y*X;$[0]=q-O*H,$[4]=-U*X,$[8]=F+G*H,$[1]=G+F*H,$[5]=U*N,$[9]=O-q*H,$[2]=-U*Y,$[6]=H,$[10]=U*W}else if(J.order==="ZYX"){let q=U*N,G=U*X,F=H*N,O=H*X;$[0]=W*N,$[4]=F*Y-G,$[8]=q*Y+O,$[1]=W*X,$[5]=O*Y+q,$[9]=G*Y-F,$[2]=-Y,$[6]=H*W,$[10]=U*W}else if(J.order==="YZX"){let q=U*W,G=U*Y,F=H*W,O=H*Y;$[0]=W*N,$[4]=O-q*X,$[8]=F*X+G,$[1]=X,$[5]=U*N,$[9]=-H*N,$[2]=-Y*N,$[6]=G*X+F,$[10]=q-O*X}else if(J.order==="XZY"){let q=U*W,G=U*Y,F=H*W,O=H*Y;$[0]=W*N,$[4]=-X,$[8]=Y*N,$[1]=q*X+O,$[5]=U*N,$[9]=G*X-F,$[2]=F*X-G,$[6]=H*N,$[10]=O*X+q}return $[3]=0,$[7]=0,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromQuaternion(J){return this.compose(UN,J,HN)}lookAt(J,$,Q){let Z=this.elements;if(i7.subVectors(J,$),i7.lengthSq()===0)i7.z=1;if(i7.normalize(),OJ.crossVectors(Q,i7),OJ.lengthSq()===0){if(Math.abs(Q.z)===1)i7.x+=0.0001;else i7.z+=0.0001;i7.normalize(),OJ.crossVectors(Q,i7)}return OJ.normalize(),WQ.crossVectors(i7,OJ),Z[0]=OJ.x,Z[4]=WQ.x,Z[8]=i7.x,Z[1]=OJ.y,Z[5]=WQ.y,Z[9]=i7.y,Z[2]=OJ.z,Z[6]=WQ.z,Z[10]=i7.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,Z=$.elements,K=this.elements,U=Q[0],H=Q[4],W=Q[8],Y=Q[12],N=Q[1],X=Q[5],q=Q[9],G=Q[13],F=Q[2],O=Q[6],V=Q[10],D=Q[14],E=Q[3],C=Q[7],L=Q[11],R=Q[15],_=Z[0],B=Z[4],A=Z[8],M=Z[12],I=Z[1],y=Z[5],S=Z[9],f=Z[13],t=Z[2],v=Z[6],l=Z[10],Q0=Z[14],s=Z[3],a=Z[7],u=Z[11],x=Z[15];return K[0]=U*_+H*I+W*t+Y*s,K[4]=U*B+H*y+W*v+Y*a,K[8]=U*A+H*S+W*l+Y*u,K[12]=U*M+H*f+W*Q0+Y*x,K[1]=N*_+X*I+q*t+G*s,K[5]=N*B+X*y+q*v+G*a,K[9]=N*A+X*S+q*l+G*u,K[13]=N*M+X*f+q*Q0+G*x,K[2]=F*_+O*I+V*t+D*s,K[6]=F*B+O*y+V*v+D*a,K[10]=F*A+O*S+V*l+D*u,K[14]=F*M+O*f+V*Q0+D*x,K[3]=E*_+C*I+L*t+R*s,K[7]=E*B+C*y+L*v+R*a,K[11]=E*A+C*S+L*l+R*u,K[15]=E*M+C*f+L*Q0+R*x,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[4]*=J,$[8]*=J,$[12]*=J,$[1]*=J,$[5]*=J,$[9]*=J,$[13]*=J,$[2]*=J,$[6]*=J,$[10]*=J,$[14]*=J,$[3]*=J,$[7]*=J,$[11]*=J,$[15]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[4],Z=J[8],K=J[12],U=J[1],H=J[5],W=J[9],Y=J[13],N=J[2],X=J[6],q=J[10],G=J[14],F=J[3],O=J[7],V=J[11],D=J[15],E=W*G-Y*q,C=H*G-Y*X,L=H*q-W*X,R=U*G-Y*N,_=U*q-W*N,B=U*X-H*N;return $*(O*E-V*C+D*L)-Q*(F*E-V*R+D*_)+Z*(F*C-O*R+D*B)-K*(F*L-O*_+V*B)}determinantAffine(){let J=this.elements,$=J[0],Q=J[4],Z=J[8],K=J[1],U=J[5],H=J[9],W=J[2],Y=J[6],N=J[10];return $*(U*N-H*Y)-Q*(K*N-H*W)+Z*(K*Y-U*W)}transpose(){let J=this.elements,$;return $=J[1],J[1]=J[4],J[4]=$,$=J[2],J[2]=J[8],J[8]=$,$=J[6],J[6]=J[9],J[9]=$,$=J[3],J[3]=J[12],J[12]=$,$=J[7],J[7]=J[13],J[13]=$,$=J[11],J[11]=J[14],J[14]=$,this}setPosition(J,$,Q){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=$,Z[14]=Q;return this}invert(){let J=this.elements,$=J[0],Q=J[1],Z=J[2],K=J[3],U=J[4],H=J[5],W=J[6],Y=J[7],N=J[8],X=J[9],q=J[10],G=J[11],F=J[12],O=J[13],V=J[14],D=J[15],E=$*H-Q*U,C=$*W-Z*U,L=$*Y-K*U,R=Q*W-Z*H,_=Q*Y-K*H,B=Z*Y-K*W,A=N*O-X*F,M=N*V-q*F,I=N*D-G*F,y=X*V-q*O,S=X*D-G*O,f=q*D-G*V,t=E*f-C*S+L*y+R*I-_*M+B*A;if(t===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let v=1/t;return J[0]=(H*f-W*S+Y*y)*v,J[1]=(Z*S-Q*f-K*y)*v,J[2]=(O*B-V*_+D*R)*v,J[3]=(q*_-X*B-G*R)*v,J[4]=(W*I-U*f-Y*M)*v,J[5]=($*f-Z*I+K*M)*v,J[6]=(V*L-F*B-D*C)*v,J[7]=(N*B-q*L+G*C)*v,J[8]=(U*S-H*I+Y*A)*v,J[9]=(Q*I-$*S-K*A)*v,J[10]=(F*_-O*L+D*E)*v,J[11]=(X*L-N*_-G*E)*v,J[12]=(H*M-U*y-W*A)*v,J[13]=($*y-Q*M+Z*A)*v,J[14]=(O*C-F*R-V*E)*v,J[15]=(N*R-X*C+q*E)*v,this}scale(J){let $=this.elements,Q=J.x,Z=J.y,K=J.z;return $[0]*=Q,$[4]*=Z,$[8]*=K,$[1]*=Q,$[5]*=Z,$[9]*=K,$[2]*=Q,$[6]*=Z,$[10]*=K,$[3]*=Q,$[7]*=Z,$[11]*=K,this}getMaxScaleOnAxis(){let J=this.elements,$=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Q=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max($,Q,Z))}makeTranslation(J,$,Q){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,$,0,0,1,Q,0,0,0,1);return this}makeRotationX(J){let $=Math.cos(J),Q=Math.sin(J);return this.set(1,0,0,0,0,$,-Q,0,0,Q,$,0,0,0,0,1),this}makeRotationY(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,0,Q,0,0,1,0,0,-Q,0,$,0,0,0,0,1),this}makeRotationZ(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,0,Q,$,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,$){let Q=Math.cos($),Z=Math.sin($),K=1-Q,U=J.x,H=J.y,W=J.z,Y=K*U,N=K*H;return this.set(Y*U+Q,Y*H-Z*W,Y*W+Z*H,0,Y*H+Z*W,N*H+Q,N*W-Z*U,0,Y*W-Z*H,N*W+Z*U,K*W*W+Q,0,0,0,0,1),this}makeScale(J,$,Q){return this.set(J,0,0,0,0,$,0,0,0,0,Q,0,0,0,0,1),this}makeShear(J,$,Q,Z,K,U){return this.set(1,Q,K,0,J,1,U,0,$,Z,1,0,0,0,0,1),this}compose(J,$,Q){let Z=this.elements,K=$._x,U=$._y,H=$._z,W=$._w,Y=K+K,N=U+U,X=H+H,q=K*Y,G=K*N,F=K*X,O=U*N,V=U*X,D=H*X,E=W*Y,C=W*N,L=W*X,R=Q.x,_=Q.y,B=Q.z;return Z[0]=(1-(O+D))*R,Z[1]=(G+L)*R,Z[2]=(F-C)*R,Z[3]=0,Z[4]=(G-L)*_,Z[5]=(1-(q+D))*_,Z[6]=(V+E)*_,Z[7]=0,Z[8]=(F+C)*B,Z[9]=(V-E)*B,Z[10]=(1-(q+O))*B,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,$,Q){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let K=this.determinantAffine();if(K===0)return Q.set(1,1,1),$.identity(),this;let U=Y6.set(Z[0],Z[1],Z[2]).length(),H=Y6.set(Z[4],Z[5],Z[6]).length(),W=Y6.set(Z[8],Z[9],Z[10]).length();if(K<0)U=-U;W8.copy(this);let Y=1/U,N=1/H,X=1/W;return W8.elements[0]*=Y,W8.elements[1]*=Y,W8.elements[2]*=Y,W8.elements[4]*=N,W8.elements[5]*=N,W8.elements[6]*=N,W8.elements[8]*=X,W8.elements[9]*=X,W8.elements[10]*=X,$.setFromRotationMatrix(W8),Q.x=U,Q.y=H,Q.z=W,this}makePerspective(J,$,Q,Z,K,U,H=2000,W=!1){let Y=this.elements,N=2*K/($-J),X=2*K/(Q-Z),q=($+J)/($-J),G=(Q+Z)/(Q-Z),F,O;if(W)F=K/(U-K),O=U*K/(U-K);else if(H===2000)F=-(U+K)/(U-K),O=-2*U*K/(U-K);else if(H===2001)F=-U/(U-K),O=-U*K/(U-K);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return Y[0]=N,Y[4]=0,Y[8]=q,Y[12]=0,Y[1]=0,Y[5]=X,Y[9]=G,Y[13]=0,Y[2]=0,Y[6]=0,Y[10]=F,Y[14]=O,Y[3]=0,Y[7]=0,Y[11]=-1,Y[15]=0,this}makeOrthographic(J,$,Q,Z,K,U,H=2000,W=!1){let Y=this.elements,N=2/($-J),X=2/(Q-Z),q=-($+J)/($-J),G=-(Q+Z)/(Q-Z),F,O;if(W)F=1/(U-K),O=U/(U-K);else if(H===2000)F=-2/(U-K),O=-(U+K)/(U-K);else if(H===2001)F=-1/(U-K),O=-K/(U-K);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return Y[0]=N,Y[4]=0,Y[8]=0,Y[12]=q,Y[1]=0,Y[5]=X,Y[9]=0,Y[13]=G,Y[2]=0,Y[6]=0,Y[10]=F,Y[14]=O,Y[3]=0,Y[7]=0,Y[11]=0,Y[15]=1,this}equals(J){let $=this.elements,Q=J.elements;for(let Z=0;Z<16;Z++)if($[Z]!==Q[Z])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<16;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J[$+9]=Q[9],J[$+10]=Q[10],J[$+11]=Q[11],J[$+12]=Q[12],J[$+13]=Q[13],J[$+14]=Q[14],J[$+15]=Q[15],J}}var Y6=new k,W8=new v9,UN=new k(0,0,0),HN=new k(1,1,1),OJ=new k,WQ=new k,i7=new k,vH=new v9,yH=new F8;class i8{constructor(J=0,$=0,Q=0,Z=i8.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=$,this._z=Q,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,$,Q,Z=this._order){return this._x=J,this._y=$,this._z=Q,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,$=this._order,Q=!0){let Z=J.elements,K=Z[0],U=Z[4],H=Z[8],W=Z[1],Y=Z[5],N=Z[9],X=Z[2],q=Z[6],G=Z[10];switch($){case"XYZ":if(this._y=Math.asin(B9(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-N,G),this._z=Math.atan2(-U,K);else this._x=Math.atan2(q,Y),this._z=0;break;case"YXZ":if(this._x=Math.asin(-B9(N,-1,1)),Math.abs(N)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(W,Y);else this._y=Math.atan2(-X,K),this._z=0;break;case"ZXY":if(this._x=Math.asin(B9(q,-1,1)),Math.abs(q)<0.9999999)this._y=Math.atan2(-X,G),this._z=Math.atan2(-U,Y);else this._y=0,this._z=Math.atan2(W,K);break;case"ZYX":if(this._y=Math.asin(-B9(X,-1,1)),Math.abs(X)<0.9999999)this._x=Math.atan2(q,G),this._z=Math.atan2(W,K);else this._x=0,this._z=Math.atan2(-U,Y);break;case"YZX":if(this._z=Math.asin(B9(W,-1,1)),Math.abs(W)<0.9999999)this._x=Math.atan2(-N,Y),this._y=Math.atan2(-X,K);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-B9(U,-1,1)),Math.abs(U)<0.9999999)this._x=Math.atan2(q,Y),this._y=Math.atan2(H,K);else this._x=Math.atan2(-N,G),this._y=0;break;default:$9("Euler: .setFromRotationMatrix() encountered an unknown order: "+$)}if(this._order=$,Q===!0)this._onChangeCallback();return this}setFromQuaternion(J,$,Q){return vH.makeRotationFromQuaternion(J),this.setFromRotationMatrix(vH,$,Q)}setFromVector3(J,$=this._order){return this.set(J.x,J.y,J.z,$)}reorder(J){return yH.setFromEuler(this),this.setFromQuaternion(yH,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}i8.DEFAULT_ORDER="XYZ";class KZ{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var WN=0,fH=new k,N6=new F8,u8=new v9,YQ=new k,a6=new k,YN=new k,NN=new F8,bH=new k(1,0,0),xH=new k(0,1,0),hH=new k(0,0,1),gH={type:"added"},XN={type:"removed"},X6={type:"childadded",child:null},dZ={type:"childremoved",child:null};class P9 extends a8{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:WN++}),this.uuid=n8(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=P9.DEFAULT_UP.clone();let J=new k,$=new i8,Q=new F8,Z=new k(1,1,1);function K(){Q.setFromEuler($,!1)}function U(){$.setFromQuaternion(Q,void 0,!1)}$._onChange(K),Q._onChange(U),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:$},quaternion:{configurable:!0,enumerable:!0,value:Q},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new v9},normalMatrix:{value:new X9}}),this.matrix=new v9,this.matrixWorld=new v9,this.matrixAutoUpdate=P9.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=P9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new KZ,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,$){this.quaternion.setFromAxisAngle(J,$)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,$){return N6.setFromAxisAngle(J,$),this.quaternion.multiply(N6),this}rotateOnWorldAxis(J,$){return N6.setFromAxisAngle(J,$),this.quaternion.premultiply(N6),this}rotateX(J){return this.rotateOnAxis(bH,J)}rotateY(J){return this.rotateOnAxis(xH,J)}rotateZ(J){return this.rotateOnAxis(hH,J)}translateOnAxis(J,$){return fH.copy(J).applyQuaternion(this.quaternion),this.position.add(fH.multiplyScalar($)),this}translateX(J){return this.translateOnAxis(bH,J)}translateY(J){return this.translateOnAxis(xH,J)}translateZ(J){return this.translateOnAxis(hH,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(u8.copy(this.matrixWorld).invert())}lookAt(J,$,Q){if(J.isVector3)YQ.copy(J);else YQ.set(J,$,Q);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),a6.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)u8.lookAt(a6,YQ,this.up);else u8.lookAt(YQ,a6,this.up);if(this.quaternion.setFromRotationMatrix(u8),Z)u8.extractRotation(Z.matrixWorld),N6.setFromRotationMatrix(u8),this.quaternion.premultiply(N6.invert())}add(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.add(arguments[$]);return this}if(J===this)return U9("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(gH),X6.child=J,this.dispatchEvent(X6),X6.child=null;else U9("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.remove(arguments[Q]);return this}let $=this.children.indexOf(J);if($!==-1)J.parent=null,this.children.splice($,1),J.dispatchEvent(XN),dZ.child=J,this.dispatchEvent(dZ),dZ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),u8.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),u8.multiply(J.parent.matrixWorld);return J.applyMatrix4(u8),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(gH),X6.child=J,this.dispatchEvent(X6),X6.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,$){if(this[J]===$)return this;for(let Q=0,Z=this.children.length;Q<Z;Q++){let U=this.children[Q].getObjectByProperty(J,$);if(U!==void 0)return U}return}getObjectsByProperty(J,$,Q=[]){if(this[J]===$)Q.push(this);let Z=this.children;for(let K=0,U=Z.length;K<U;K++)Z[K].getObjectsByProperty(J,$,Q);return Q}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(a6,J,YN),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(a6,NN,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let $=this.matrixWorld.elements;return J.set($[8],$[9],$[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(J){J(this);let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].traverseVisible(J)}traverseAncestors(J){let $=this.parent;if($!==null)J($),$.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:$,y:Q,z:Z}=J,K=this.matrix.elements;K[12]+=$-K[0]*$-K[4]*Q-K[8]*Z,K[13]+=Q-K[1]*$-K[5]*Q-K[9]*Z,K[14]+=Z-K[2]*$-K[6]*Q-K[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let $=this.children;for(let Q=0,Z=$.length;Q<Z;Q++)$[Q].updateMatrixWorld(J)}updateWorldMatrix(J,$,Q=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||Q){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,Q=!0}if($===!0){let K=this.children;for(let U=0,H=K.length;U<H;U++)K[U].updateWorldMatrix(!1,!0,Q)}}toJSON(J){let $=J===void 0||typeof J==="string",Q={};if($)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Q.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,Z.name=this.name,Z.castShadow=this.castShadow,Z.receiveShadow=this.receiveShadow,Z.visible=this.visible,Z.frustumCulled=this.frustumCulled,Z.renderOrder=this.renderOrder,Z.static=this.static,Z.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((H)=>({...H})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function K(H,W){if(H[W.uuid]===void 0)H[W.uuid]=W.toJSON(J);return W.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=K(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let W=H.shapes;if(Array.isArray(W))for(let Y=0,N=W.length;Y<N;Y++){let X=W[Y];K(J.shapes,X)}else K(J.shapes,W)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)K(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let W=0,Y=this.material.length;W<Y;W++)H.push(K(J.materials,this.material[W]));Z.material=H}else Z.material=K(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let H=0;H<this.children.length;H++)Z.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let H=0;H<this.animations.length;H++){let W=this.animations[H];Z.animations.push(K(J.animations,W))}}if($){let H=U(J.geometries),W=U(J.materials),Y=U(J.textures),N=U(J.images),X=U(J.shapes),q=U(J.skeletons),G=U(J.animations),F=U(J.nodes);if(H.length>0)Q.geometries=H;if(W.length>0)Q.materials=W;if(Y.length>0)Q.textures=Y;if(N.length>0)Q.images=N;if(X.length>0)Q.shapes=X;if(q.length>0)Q.skeletons=q;if(G.length>0)Q.animations=G;if(F.length>0)Q.nodes=F}return Q.object=Z,Q;function U(H){let W=[];for(let Y in H){let N=H[Y];delete N.metadata,W.push(N)}return W}}clone(J){return new this.constructor().copy(this,J)}copy(J,$=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),$===!0)for(let Q=0;Q<J.children.length;Q++){let Z=J.children[Q];this.add(Z.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}P9.DEFAULT_UP=new k(0,1,0);P9.DEFAULT_MATRIX_AUTO_UPDATE=!0;P9.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class E0 extends P9{constructor(){super();this.isGroup=!0,this.type="Group"}}var GN={type:"move"};class w${constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new E0,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new E0,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new E0,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let $=this._hand;if($)for(let Q of J.hand.values())this._getHandJoint($,Q)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,$,Q){let Z=null,K=null,U=null,H=this._targetRay,W=this._grip,Y=this._hand;if(J&&$.session.visibilityState!=="visible-blurred"){if(Y&&J.hand){U=!0;for(let O of J.hand.values()){let V=$.getJointPose(O,Q),D=this._getHandJoint(Y,O);if(V!==null)D.matrix.fromArray(V.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=V.radius;D.visible=V!==null}let N=Y.joints["index-finger-tip"],X=Y.joints["thumb-tip"],q=N.position.distanceTo(X.position),G=0.02,F=0.005;if(Y.inputState.pinching&&q>G+F)Y.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!Y.inputState.pinching&&q<=G-F)Y.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(W!==null&&J.gripSpace){if(K=$.getPose(J.gripSpace,Q),K!==null){if(W.matrix.fromArray(K.transform.matrix),W.matrix.decompose(W.position,W.rotation,W.scale),W.matrixWorldNeedsUpdate=!0,K.linearVelocity)W.hasLinearVelocity=!0,W.linearVelocity.copy(K.linearVelocity);else W.hasLinearVelocity=!1;if(K.angularVelocity)W.hasAngularVelocity=!0,W.angularVelocity.copy(K.angularVelocity);else W.hasAngularVelocity=!1;if(W.eventsEnabled)W.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(Z=$.getPose(J.targetRaySpace,Q),Z===null&&K!==null)Z=K;if(Z!==null){if(H.matrix.fromArray(Z.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,Z.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(Z.linearVelocity);else H.hasLinearVelocity=!1;if(Z.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(Z.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(GN)}}}if(H!==null)H.visible=Z!==null;if(W!==null)W.visible=K!==null;if(Y!==null)Y.visible=U!==null;return this}_getHandJoint(J,$){if(J.joints[$.jointName]===void 0){let Q=new E0;Q.matrixAutoUpdate=!1,Q.visible=!1,J.joints[$.jointName]=Q,J.add(Q)}return J.joints[$.jointName]}}var qY={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},RJ={h:0,s:0,l:0},NQ={h:0,s:0,l:0};function lZ(J,$,Q){if(Q<0)Q+=1;if(Q>1)Q-=1;if(Q<0.16666666666666666)return J+($-J)*6*Q;if(Q<0.5)return $;if(Q<0.6666666666666666)return J+($-J)*6*(0.6666666666666666-Q);return J}class F0{constructor(J,$,Q){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,$,Q)}set(J,$,Q){if($===void 0&&Q===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,$,Q);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,$="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,_9.colorSpaceToWorking(this,$),this}setRGB(J,$,Q,Z=_9.workingColorSpace){return this.r=J,this.g=$,this.b=Q,_9.colorSpaceToWorking(this,Z),this}setHSL(J,$,Q,Z=_9.workingColorSpace){if(J=$N(J,1),$=B9($,0,1),Q=B9(Q,0,1),$===0)this.r=this.g=this.b=Q;else{let K=Q<=0.5?Q*(1+$):Q+$-Q*$,U=2*Q-K;this.r=lZ(U,K,J+0.3333333333333333),this.g=lZ(U,K,J),this.b=lZ(U,K,J-0.3333333333333333)}return _9.colorSpaceToWorking(this,Z),this}setStyle(J,$="srgb"){function Q(K){if(K===void 0)return;if(parseFloat(K)<1)$9("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let K,U=Z[1],H=Z[2];switch(U){case"rgb":case"rgba":if(K=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(K[4]),this.setRGB(Math.min(255,parseInt(K[1],10))/255,Math.min(255,parseInt(K[2],10))/255,Math.min(255,parseInt(K[3],10))/255,$);if(K=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(K[4]),this.setRGB(Math.min(100,parseInt(K[1],10))/100,Math.min(100,parseInt(K[2],10))/100,Math.min(100,parseInt(K[3],10))/100,$);break;case"hsl":case"hsla":if(K=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(K[4]),this.setHSL(parseFloat(K[1])/360,parseFloat(K[2])/100,parseFloat(K[3])/100,$);break;default:$9("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let K=Z[1],U=K.length;if(U===3)return this.setRGB(parseInt(K.charAt(0),16)/15,parseInt(K.charAt(1),16)/15,parseInt(K.charAt(2),16)/15,$);else if(U===6)return this.setHex(parseInt(K,16),$);else $9("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,$);return this}setColorName(J,$="srgb"){let Q=qY[J.toLowerCase()];if(Q!==void 0)this.setHex(Q,$);else $9("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=s8(J.r),this.g=s8(J.g),this.b=s8(J.b),this}copyLinearToSRGB(J){return this.r=z6(J.r),this.g=z6(J.g),this.b=z6(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return _9.workingToColorSpace(S7.copy(this),J),Math.round(B9(S7.r*255,0,255))*65536+Math.round(B9(S7.g*255,0,255))*256+Math.round(B9(S7.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,$=_9.workingColorSpace){_9.workingToColorSpace(S7.copy(this),$);let{r:Q,g:Z,b:K}=S7,U=Math.max(Q,Z,K),H=Math.min(Q,Z,K),W,Y,N=(H+U)/2;if(H===U)W=0,Y=0;else{let X=U-H;switch(Y=N<=0.5?X/(U+H):X/(2-U-H),U){case Q:W=(Z-K)/X+(Z<K?6:0);break;case Z:W=(K-Q)/X+2;break;case K:W=(Q-Z)/X+4;break}W/=6}return J.h=W,J.s=Y,J.l=N,J}getRGB(J,$=_9.workingColorSpace){return _9.workingToColorSpace(S7.copy(this),$),J.r=S7.r,J.g=S7.g,J.b=S7.b,J}getStyle(J="srgb"){_9.workingToColorSpace(S7.copy(this),J);let{r:$,g:Q,b:Z}=S7;if(J!=="srgb")return`color(${J} ${$.toFixed(3)} ${Q.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round($*255)},${Math.round(Q*255)},${Math.round(Z*255)})`}offsetHSL(J,$,Q){return this.getHSL(RJ),this.setHSL(RJ.h+J,RJ.s+$,RJ.l+Q)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,$){return this.r=J.r+$.r,this.g=J.g+$.g,this.b=J.b+$.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,$){return this.r+=(J.r-this.r)*$,this.g+=(J.g-this.g)*$,this.b+=(J.b-this.b)*$,this}lerpColors(J,$,Q){return this.r=J.r+($.r-J.r)*Q,this.g=J.g+($.g-J.g)*Q,this.b=J.b+($.b-J.b)*Q,this}lerpHSL(J,$){this.getHSL(RJ),J.getHSL(NQ);let Q=hZ(RJ.h,NQ.h,$),Z=hZ(RJ.s,NQ.s,$),K=hZ(RJ.l,NQ.l,$);return this.setHSL(Q,Z,K),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let $=this.r,Q=this.g,Z=this.b,K=J.elements;return this.r=K[0]*$+K[3]*Q+K[6]*Z,this.g=K[1]*$+K[4]*Q+K[7]*Z,this.b=K[2]*$+K[5]*Q+K[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,$=0){return this.r=J[$],this.g=J[$+1],this.b=J[$+2],this}toArray(J=[],$=0){return J[$]=this.r,J[$+1]=this.g,J[$+2]=this.b,J}fromBufferAttribute(J,$){return this.r=J.getX($),this.g=J.getY($),this.b=J.getZ($),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var S7=new F0;F0.NAMES=qY;class r8{constructor(J,$=0.00025){this.isFogExp2=!0,this.name="",this.color=new F0(J),this.density=$}clone(){return new r8(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class $8 extends P9{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new i8,this.environmentIntensity=1,this.environmentRotation=new i8,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,$){if(super.copy(J,$),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let $=super.toJSON(J);if(this.fog!==null)$.object.fog=this.fog.toJSON();return $.object.backgroundBlurriness=this.backgroundBlurriness,$.object.backgroundIntensity=this.backgroundIntensity,$.object.backgroundRotation=this.backgroundRotation.toArray(),$.object.environmentIntensity=this.environmentIntensity,$.object.environmentRotation=this.environmentRotation.toArray(),$}}var Y8=new k,m8=new k,cZ=new k,d8=new k,G6=new k,q6=new k,pH=new k,nZ=new k,sZ=new k,iZ=new k,oZ=new K7,aZ=new K7,rZ=new K7;class b7{constructor(J=new k,$=new k,Q=new k){this.a=J,this.b=$,this.c=Q}static getNormal(J,$,Q,Z){Z.subVectors(Q,$),Y8.subVectors(J,$),Z.cross(Y8);let K=Z.lengthSq();if(K>0)return Z.multiplyScalar(1/Math.sqrt(K));return Z.set(0,0,0)}static getBarycoord(J,$,Q,Z,K){Y8.subVectors(Z,$),m8.subVectors(Q,$),cZ.subVectors(J,$);let U=Y8.dot(Y8),H=Y8.dot(m8),W=Y8.dot(cZ),Y=m8.dot(m8),N=m8.dot(cZ),X=U*Y-H*H;if(X===0)return K.set(0,0,0),null;let q=1/X,G=(Y*W-H*N)*q,F=(U*N-H*W)*q;return K.set(1-G-F,F,G)}static containsPoint(J,$,Q,Z){if(this.getBarycoord(J,$,Q,Z,d8)===null)return!1;return d8.x>=0&&d8.y>=0&&d8.x+d8.y<=1}static getInterpolation(J,$,Q,Z,K,U,H,W){if(this.getBarycoord(J,$,Q,Z,d8)===null){if(W.x=0,W.y=0,"z"in W)W.z=0;if("w"in W)W.w=0;return null}return W.setScalar(0),W.addScaledVector(K,d8.x),W.addScaledVector(U,d8.y),W.addScaledVector(H,d8.z),W}static getInterpolatedAttribute(J,$,Q,Z,K,U){return oZ.setScalar(0),aZ.setScalar(0),rZ.setScalar(0),oZ.fromBufferAttribute(J,$),aZ.fromBufferAttribute(J,Q),rZ.fromBufferAttribute(J,Z),U.setScalar(0),U.addScaledVector(oZ,K.x),U.addScaledVector(aZ,K.y),U.addScaledVector(rZ,K.z),U}static isFrontFacing(J,$,Q,Z){return Y8.subVectors(Q,$),m8.subVectors(J,$),Y8.cross(m8).dot(Z)<0}set(J,$,Q){return this.a.copy(J),this.b.copy($),this.c.copy(Q),this}setFromPointsAndIndices(J,$,Q,Z){return this.a.copy(J[$]),this.b.copy(J[Q]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,$,Q,Z){return this.a.fromBufferAttribute(J,$),this.b.fromBufferAttribute(J,Q),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return Y8.subVectors(this.c,this.b),m8.subVectors(this.a,this.b),Y8.cross(m8).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return b7.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,$){return b7.getBarycoord(J,this.a,this.b,this.c,$)}getInterpolation(J,$,Q,Z,K){return b7.getInterpolation(J,this.a,this.b,this.c,$,Q,Z,K)}containsPoint(J){return b7.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return b7.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,$){let Q=this.a,Z=this.b,K=this.c,U,H;G6.subVectors(Z,Q),q6.subVectors(K,Q),nZ.subVectors(J,Q);let W=G6.dot(nZ),Y=q6.dot(nZ);if(W<=0&&Y<=0)return $.copy(Q);sZ.subVectors(J,Z);let N=G6.dot(sZ),X=q6.dot(sZ);if(N>=0&&X<=N)return $.copy(Z);let q=W*X-N*Y;if(q<=0&&W>=0&&N<=0)return U=W/(W-N),$.copy(Q).addScaledVector(G6,U);iZ.subVectors(J,K);let G=G6.dot(iZ),F=q6.dot(iZ);if(F>=0&&G<=F)return $.copy(K);let O=G*Y-W*F;if(O<=0&&Y>=0&&F<=0)return H=Y/(Y-F),$.copy(Q).addScaledVector(q6,H);let V=N*F-G*X;if(V<=0&&X-N>=0&&G-F>=0)return pH.subVectors(K,Z),H=(X-N)/(X-N+(G-F)),$.copy(Z).addScaledVector(pH,H);let D=1/(V+O+q);return U=O*D,H=q*D,$.copy(Q).addScaledVector(G6,U).addScaledVector(q6,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class D8{constructor(J=new k(1/0,1/0,1/0),$=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=$}set(J,$){return this.min.copy(J),this.max.copy($),this}setFromArray(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$+=3)this.expandByPoint(N8.fromArray(J,$));return this}setFromBufferAttribute(J){this.makeEmpty();for(let $=0,Q=J.count;$<Q;$++)this.expandByPoint(N8.fromBufferAttribute(J,$));return this}setFromPoints(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$++)this.expandByPoint(J[$]);return this}setFromCenterAndSize(J,$){let Q=N8.copy($).multiplyScalar(0.5);return this.min.copy(J).sub(Q),this.max.copy(J).add(Q),this}setFromObject(J,$=!1){return this.makeEmpty(),this.expandByObject(J,$)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,$=!1){J.updateWorldMatrix(!1,!1);let Q=J.geometry;if(Q!==void 0){let K=Q.getAttribute("position");if($===!0&&K!==void 0&&J.isInstancedMesh!==!0)for(let U=0,H=K.count;U<H;U++){if(J.isMesh===!0)J.getVertexPosition(U,N8);else N8.fromBufferAttribute(K,U);N8.applyMatrix4(J.matrixWorld),this.expandByPoint(N8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();XQ.copy(J.boundingBox)}else{if(Q.boundingBox===null)Q.computeBoundingBox();XQ.copy(Q.boundingBox)}XQ.applyMatrix4(J.matrixWorld),this.union(XQ)}}let Z=J.children;for(let K=0,U=Z.length;K<U;K++)this.expandByObject(Z[K],$);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,$){return $.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,N8),N8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let $,Q;if(J.normal.x>0)$=J.normal.x*this.min.x,Q=J.normal.x*this.max.x;else $=J.normal.x*this.max.x,Q=J.normal.x*this.min.x;if(J.normal.y>0)$+=J.normal.y*this.min.y,Q+=J.normal.y*this.max.y;else $+=J.normal.y*this.max.y,Q+=J.normal.y*this.min.y;if(J.normal.z>0)$+=J.normal.z*this.min.z,Q+=J.normal.z*this.max.z;else $+=J.normal.z*this.max.z,Q+=J.normal.z*this.min.z;return $<=-J.constant&&Q>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(r6),GQ.subVectors(this.max,r6),F6.subVectors(J.a,r6),D6.subVectors(J.b,r6),E6.subVectors(J.c,r6),MJ.subVectors(D6,F6),VJ.subVectors(E6,D6),wJ.subVectors(F6,E6);let $=[0,-MJ.z,MJ.y,0,-VJ.z,VJ.y,0,-wJ.z,wJ.y,MJ.z,0,-MJ.x,VJ.z,0,-VJ.x,wJ.z,0,-wJ.x,-MJ.y,MJ.x,0,-VJ.y,VJ.x,0,-wJ.y,wJ.x,0];if(!tZ($,F6,D6,E6,GQ))return!1;if($=[1,0,0,0,1,0,0,0,1],!tZ($,F6,D6,E6,GQ))return!1;return qQ.crossVectors(MJ,VJ),$=[qQ.x,qQ.y,qQ.z],tZ($,F6,D6,E6,GQ)}clampPoint(J,$){return $.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,N8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(N8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return l8[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),l8[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),l8[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),l8[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),l8[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),l8[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),l8[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),l8[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(l8),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var l8=[new k,new k,new k,new k,new k,new k,new k,new k],N8=new k,XQ=new D8,F6=new k,D6=new k,E6=new k,MJ=new k,VJ=new k,wJ=new k,r6=new k,GQ=new k,qQ=new k,TJ=new k;function tZ(J,$,Q,Z,K){for(let U=0,H=J.length-3;U<=H;U+=3){TJ.fromArray(J,U);let W=K.x*Math.abs(TJ.x)+K.y*Math.abs(TJ.y)+K.z*Math.abs(TJ.z),Y=$.dot(TJ),N=Q.dot(TJ),X=Z.dot(TJ);if(Math.max(-Math.max(Y,N,X),Math.min(Y,N,X))>W)return!1}return!0}var D7=new k,FQ=new G0,qN=0;class e9 extends a8{constructor(J,$,Q=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qN++}),this.name="",this.array=J,this.itemSize=$,this.count=J!==void 0?J.length/$:0,this.normalized=Q,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,$,Q){J*=this.itemSize,Q*=$.itemSize;for(let Z=0,K=this.itemSize;Z<K;Z++)this.array[J+Z]=$.array[Q+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let $=0,Q=this.count;$<Q;$++)FQ.fromBufferAttribute(this,$),FQ.applyMatrix3(J),this.setXY($,FQ.x,FQ.y);else if(this.itemSize===3)for(let $=0,Q=this.count;$<Q;$++)D7.fromBufferAttribute(this,$),D7.applyMatrix3(J),this.setXYZ($,D7.x,D7.y,D7.z);return this}applyMatrix4(J){for(let $=0,Q=this.count;$<Q;$++)D7.fromBufferAttribute(this,$),D7.applyMatrix4(J),this.setXYZ($,D7.x,D7.y,D7.z);return this}applyNormalMatrix(J){for(let $=0,Q=this.count;$<Q;$++)D7.fromBufferAttribute(this,$),D7.applyNormalMatrix(J),this.setXYZ($,D7.x,D7.y,D7.z);return this}transformDirection(J){for(let $=0,Q=this.count;$<Q;$++)D7.fromBufferAttribute(this,$),D7.transformDirection(J),this.setXYZ($,D7.x,D7.y,D7.z);return this}set(J,$=0){return this.array.set(J,$),this}getComponent(J,$){let Q=this.array[J*this.itemSize+$];if(this.normalized)Q=w8(Q,this.array);return Q}setComponent(J,$,Q){if(this.normalized)Q=i9(Q,this.array);return this.array[J*this.itemSize+$]=Q,this}getX(J){let $=this.array[J*this.itemSize];if(this.normalized)$=w8($,this.array);return $}setX(J,$){if(this.normalized)$=i9($,this.array);return this.array[J*this.itemSize]=$,this}getY(J){let $=this.array[J*this.itemSize+1];if(this.normalized)$=w8($,this.array);return $}setY(J,$){if(this.normalized)$=i9($,this.array);return this.array[J*this.itemSize+1]=$,this}getZ(J){let $=this.array[J*this.itemSize+2];if(this.normalized)$=w8($,this.array);return $}setZ(J,$){if(this.normalized)$=i9($,this.array);return this.array[J*this.itemSize+2]=$,this}getW(J){let $=this.array[J*this.itemSize+3];if(this.normalized)$=w8($,this.array);return $}setW(J,$){if(this.normalized)$=i9($,this.array);return this.array[J*this.itemSize+3]=$,this}setXY(J,$,Q){if(J*=this.itemSize,this.normalized)$=i9($,this.array),Q=i9(Q,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this}setXYZ(J,$,Q,Z){if(J*=this.itemSize,this.normalized)$=i9($,this.array),Q=i9(Q,this.array),Z=i9(Z,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=Z,this}setXYZW(J,$,Q,Z,K){if(J*=this.itemSize,this.normalized)$=i9($,this.array),Q=i9(Q,this.array),Z=i9(Z,this.array),K=i9(K,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=Z,this.array[J+3]=K,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return J.name=this.name,J.usage=this.usage,J.gpuType=this.gpuType,J}dispose(){this.dispatchEvent({type:"dispose"})}}class UZ extends e9{constructor(J,$,Q){super(new Uint16Array(J),$,Q)}}class HZ extends e9{constructor(J,$,Q){super(new Uint32Array(J),$,Q)}}class Q9 extends e9{constructor(J,$,Q){super(new Float32Array(J),$,Q)}}var FN=new D8,t6=new k,eZ=new k;class t8{constructor(J=new k,$=-1){this.isSphere=!0,this.center=J,this.radius=$}set(J,$){return this.center.copy(J),this.radius=$,this}setFromPoints(J,$){let Q=this.center;if($!==void 0)Q.copy($);else FN.setFromPoints(J).getCenter(Q);let Z=0;for(let K=0,U=J.length;K<U;K++)Z=Math.max(Z,Q.distanceToSquared(J[K]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let $=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=$*$}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,$){let Q=this.center.distanceToSquared(J);if($.copy(J),Q>this.radius*this.radius)$.sub(this.center).normalize(),$.multiplyScalar(this.radius).add(this.center);return $}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;t6.subVectors(J,this.center);let $=t6.lengthSq();if($>this.radius*this.radius){let Q=Math.sqrt($),Z=(Q-this.radius)*0.5;this.center.addScaledVector(t6,Z/Q),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else eZ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(t6.copy(J.center).add(eZ)),this.expandByPoint(t6.copy(J.center).sub(eZ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var DN=0,J8=new v9,JK=new P9,O6=new k,o7=new D8,e6=new D8,B7=new k;class O9 extends a8{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:DN++}),this.uuid=n8(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((e5(J))?HZ:UZ)(J,1);else this.index=J;return this}setIndirect(J,$=0){return this.indirect=J,this.indirectOffset=$,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,$){return this.attributes[J]=$,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,$,Q=0){this.groups.push({start:J,count:$,materialIndex:Q})}clearGroups(){this.groups=[]}setDrawRange(J,$){this.drawRange.start=J,this.drawRange.count=$}applyMatrix4(J){let $=this.attributes.position;if($!==void 0)$.applyMatrix4(J),$.needsUpdate=!0;let Q=this.attributes.normal;if(Q!==void 0){let K=new X9().getNormalMatrix(J);Q.applyNormalMatrix(K),Q.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return J8.makeRotationFromQuaternion(J),this.applyMatrix4(J8),this}rotateX(J){return J8.makeRotationX(J),this.applyMatrix4(J8),this}rotateY(J){return J8.makeRotationY(J),this.applyMatrix4(J8),this}rotateZ(J){return J8.makeRotationZ(J),this.applyMatrix4(J8),this}translate(J,$,Q){return J8.makeTranslation(J,$,Q),this.applyMatrix4(J8),this}scale(J,$,Q){return J8.makeScale(J,$,Q),this.applyMatrix4(J8),this}lookAt(J){return JK.lookAt(J),JK.updateMatrix(),this.applyMatrix4(JK.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(O6).negate(),this.translate(O6.x,O6.y,O6.z),this}setFromPoints(J){let $=this.getAttribute("position");if($===void 0){let Q=[];for(let Z=0,K=J.length;Z<K;Z++){let U=J[Z];Q.push(U.x,U.y,U.z||0)}this.setAttribute("position",new Q9(Q,3))}else{let Q=Math.min(J.length,$.count);for(let Z=0;Z<Q;Z++){let K=J[Z];$.setXYZ(Z,K.x,K.y,K.z||0)}if(J.length>$.count)$9("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");$.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new D8;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){U9("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),$)for(let Q=0,Z=$.length;Q<Z;Q++){let K=$[Q];if(o7.setFromBufferAttribute(K),this.morphTargetsRelative)B7.addVectors(this.boundingBox.min,o7.min),this.boundingBox.expandByPoint(B7),B7.addVectors(this.boundingBox.max,o7.max),this.boundingBox.expandByPoint(B7);else this.boundingBox.expandByPoint(o7.min),this.boundingBox.expandByPoint(o7.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))U9('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new t8;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){U9("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(J){let Q=this.boundingSphere.center;if(o7.setFromBufferAttribute(J),$)for(let K=0,U=$.length;K<U;K++){let H=$[K];if(e6.setFromBufferAttribute(H),this.morphTargetsRelative)B7.addVectors(o7.min,e6.min),o7.expandByPoint(B7),B7.addVectors(o7.max,e6.max),o7.expandByPoint(B7);else o7.expandByPoint(e6.min),o7.expandByPoint(e6.max)}o7.getCenter(Q);let Z=0;for(let K=0,U=J.count;K<U;K++)B7.fromBufferAttribute(J,K),Z=Math.max(Z,Q.distanceToSquared(B7));if($)for(let K=0,U=$.length;K<U;K++){let H=$[K],W=this.morphTargetsRelative;for(let Y=0,N=H.count;Y<N;Y++){if(B7.fromBufferAttribute(H,Y),W)O6.fromBufferAttribute(J,Y),B7.add(O6);Z=Math.max(Z,Q.distanceToSquared(B7))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))U9('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,$=this.attributes;if(J===null||$.position===void 0||$.normal===void 0||$.uv===void 0){U9("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:Q,normal:Z,uv:K}=$,U=this.getAttribute("tangent");if(U===void 0||U.count!==Q.count)U=new e9(new Float32Array(4*Q.count),4),this.setAttribute("tangent",U);let H=[],W=[];for(let A=0;A<Q.count;A++)H[A]=new k,W[A]=new k;let Y=new k,N=new k,X=new k,q=new G0,G=new G0,F=new G0,O=new k,V=new k;function D(A,M,I){Y.fromBufferAttribute(Q,A),N.fromBufferAttribute(Q,M),X.fromBufferAttribute(Q,I),q.fromBufferAttribute(K,A),G.fromBufferAttribute(K,M),F.fromBufferAttribute(K,I),N.sub(Y),X.sub(Y),G.sub(q),F.sub(q);let y=1/(G.x*F.y-F.x*G.y);if(!isFinite(y))return;O.copy(N).multiplyScalar(F.y).addScaledVector(X,-G.y).multiplyScalar(y),V.copy(X).multiplyScalar(G.x).addScaledVector(N,-F.x).multiplyScalar(y),H[A].add(O),H[M].add(O),H[I].add(O),W[A].add(V),W[M].add(V),W[I].add(V)}let E=this.groups;if(E.length===0)E=[{start:0,count:J.count}];for(let A=0,M=E.length;A<M;++A){let I=E[A],y=I.start,S=I.count;for(let f=y,t=y+S;f<t;f+=3)D(J.getX(f+0),J.getX(f+1),J.getX(f+2))}let C=new k,L=new k,R=new k,_=new k;function B(A){R.fromBufferAttribute(Z,A),_.copy(R);let M=H[A];C.copy(M),C.sub(R.multiplyScalar(R.dot(M))).normalize(),L.crossVectors(_,M);let y=L.dot(W[A])<0?-1:1;U.setXYZW(A,C.x,C.y,C.z,y)}for(let A=0,M=E.length;A<M;++A){let I=E[A],y=I.start,S=I.count;for(let f=y,t=y+S;f<t;f+=3)B(J.getX(f+0)),B(J.getX(f+1)),B(J.getX(f+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,$=this.getAttribute("position");if($!==void 0){let Q=this.getAttribute("normal");if(Q===void 0||Q.count!==$.count)Q=new e9(new Float32Array($.count*3),3),this.setAttribute("normal",Q);else for(let q=0,G=Q.count;q<G;q++)Q.setXYZ(q,0,0,0);let Z=new k,K=new k,U=new k,H=new k,W=new k,Y=new k,N=new k,X=new k;if(J)for(let q=0,G=J.count;q<G;q+=3){let F=J.getX(q+0),O=J.getX(q+1),V=J.getX(q+2);Z.fromBufferAttribute($,F),K.fromBufferAttribute($,O),U.fromBufferAttribute($,V),N.subVectors(U,K),X.subVectors(Z,K),N.cross(X),H.fromBufferAttribute(Q,F),W.fromBufferAttribute(Q,O),Y.fromBufferAttribute(Q,V),H.add(N),W.add(N),Y.add(N),Q.setXYZ(F,H.x,H.y,H.z),Q.setXYZ(O,W.x,W.y,W.z),Q.setXYZ(V,Y.x,Y.y,Y.z)}else for(let q=0,G=$.count;q<G;q+=3)Z.fromBufferAttribute($,q+0),K.fromBufferAttribute($,q+1),U.fromBufferAttribute($,q+2),N.subVectors(U,K),X.subVectors(Z,K),N.cross(X),Q.setXYZ(q+0,N.x,N.y,N.z),Q.setXYZ(q+1,N.x,N.y,N.z),Q.setXYZ(q+2,N.x,N.y,N.z);this.normalizeNormals(),Q.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let $=0,Q=J.count;$<Q;$++)B7.fromBufferAttribute(J,$),B7.normalize(),J.setXYZ($,B7.x,B7.y,B7.z)}toNonIndexed(){function J(H,W){let{array:Y,itemSize:N,normalized:X}=H,q=new Y.constructor(W.length*N),G=0,F=0;for(let O=0,V=W.length;O<V;O++){if(H.isInterleavedBufferAttribute)G=W[O]*H.data.stride+H.offset;else G=W[O]*N;for(let D=0;D<N;D++)q[F++]=Y[G++]}return new e9(q,N,X)}if(this.index===null)return $9("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let $=new O9,Q=this.index.array,Z=this.attributes;for(let H in Z){let W=Z[H],Y=J(W,Q);$.setAttribute(H,Y)}let K=this.morphAttributes;for(let H in K){let W=[],Y=K[H];for(let N=0,X=Y.length;N<X;N++){let q=Y[N],G=J(q,Q);W.push(G)}$.morphAttributes[H]=W}$.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;for(let H=0,W=U.length;H<W;H++){let Y=U[H];$.addGroup(Y.start,Y.count,Y.materialIndex)}return $}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,J.name=this.name,Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let W=this.parameters;for(let Y in W)if(W[Y]!==void 0)J[Y]=W[Y];return J}J.data={attributes:{}};let $=this.index;if($!==null)J.data.index={type:$.array.constructor.name,array:Array.prototype.slice.call($.array)};let Q=this.attributes;for(let W in Q){let Y=Q[W];J.data.attributes[W]=Y.toJSON(J.data)}let Z={},K=!1;for(let W in this.morphAttributes){let Y=this.morphAttributes[W],N=[];for(let X=0,q=Y.length;X<q;X++){let G=Y[X];N.push(G.toJSON(J.data))}if(N.length>0)Z[W]=N,K=!0}if(K)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let U=this.groups;if(U.length>0)J.data.groups=JSON.parse(JSON.stringify(U));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let $={};this.name=J.name;let Q=J.index;if(Q!==null)this.setIndex(Q.clone());let Z=J.attributes;for(let Y in Z){let N=Z[Y];this.setAttribute(Y,N.clone($))}let K=J.morphAttributes;for(let Y in K){let N=[],X=K[Y];for(let q=0,G=X.length;q<G;q++)N.push(X[q].clone($));this.morphAttributes[Y]=N}this.morphTargetsRelative=J.morphTargetsRelative;let U=J.groups;for(let Y=0,N=U.length;Y<N;Y++){let X=U[Y];this.addGroup(X.start,X.count,X.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let W=J.boundingSphere;if(W!==null)this.boundingSphere=W.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class XU{constructor(J,$){this.isInterleavedBuffer=!0,this.array=J,this.stride=$,this.count=J!==void 0?J.length/$:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=n8()}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.array=new J.array.constructor(J.array),this.count=J.count,this.stride=J.stride,this.usage=J.usage,this}copyAt(J,$,Q){J*=this.stride,Q*=$.stride;for(let Z=0,K=this.stride;Z<K;Z++)this.array[J+Z]=$.array[Q+Z];return this}set(J,$=0){return this.array.set(J,$),this}clone(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=n8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let $=new this.array.constructor(J.arrayBuffers[this.array.buffer._uuid]),Q=new this.constructor($,this.stride);return Q.setUsage(this.usage),Q}onUpload(J){return this.onUploadCallback=J,this}toJSON(J){if(J.arrayBuffers===void 0)J.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=n8();if(J.arrayBuffers[this.array.buffer._uuid]===void 0)J.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));let $={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return $.usage=this.usage,$}}var v7=new k;class q${constructor(J,$,Q,Z=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=J,this.itemSize=$,this.offset=Q,this.normalized=Z}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(J){this.data.needsUpdate=J}applyMatrix4(J){for(let $=0,Q=this.data.count;$<Q;$++)v7.fromBufferAttribute(this,$),v7.applyMatrix4(J),this.setXYZ($,v7.x,v7.y,v7.z);return this}applyNormalMatrix(J){for(let $=0,Q=this.count;$<Q;$++)v7.fromBufferAttribute(this,$),v7.applyNormalMatrix(J),this.setXYZ($,v7.x,v7.y,v7.z);return this}transformDirection(J){for(let $=0,Q=this.count;$<Q;$++)v7.fromBufferAttribute(this,$),v7.transformDirection(J),this.setXYZ($,v7.x,v7.y,v7.z);return this}getComponent(J,$){let Q=this.array[J*this.data.stride+this.offset+$];if(this.normalized)Q=w8(Q,this.array);return Q}setComponent(J,$,Q){if(this.normalized)Q=i9(Q,this.array);return this.data.array[J*this.data.stride+this.offset+$]=Q,this}setX(J,$){if(this.normalized)$=i9($,this.array);return this.data.array[J*this.data.stride+this.offset]=$,this}setY(J,$){if(this.normalized)$=i9($,this.array);return this.data.array[J*this.data.stride+this.offset+1]=$,this}setZ(J,$){if(this.normalized)$=i9($,this.array);return this.data.array[J*this.data.stride+this.offset+2]=$,this}setW(J,$){if(this.normalized)$=i9($,this.array);return this.data.array[J*this.data.stride+this.offset+3]=$,this}getX(J){let $=this.data.array[J*this.data.stride+this.offset];if(this.normalized)$=w8($,this.array);return $}getY(J){let $=this.data.array[J*this.data.stride+this.offset+1];if(this.normalized)$=w8($,this.array);return $}getZ(J){let $=this.data.array[J*this.data.stride+this.offset+2];if(this.normalized)$=w8($,this.array);return $}getW(J){let $=this.data.array[J*this.data.stride+this.offset+3];if(this.normalized)$=w8($,this.array);return $}setXY(J,$,Q){if(J=J*this.data.stride+this.offset,this.normalized)$=i9($,this.array),Q=i9(Q,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this}setXYZ(J,$,Q,Z){if(J=J*this.data.stride+this.offset,this.normalized)$=i9($,this.array),Q=i9(Q,this.array),Z=i9(Z,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this.data.array[J+2]=Z,this}setXYZW(J,$,Q,Z,K){if(J=J*this.data.stride+this.offset,this.normalized)$=i9($,this.array),Q=i9(Q,this.array),Z=i9(Z,this.array),K=i9(K,this.array);return this.data.array[J+0]=$,this.data.array[J+1]=Q,this.data.array[J+2]=Z,this.data.array[J+3]=K,this}clone(J){if(J===void 0){X$("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Q=0;Q<this.count;Q++){let Z=Q*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Z+K])}return new e9(new this.array.constructor($),this.itemSize,this.normalized)}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.clone(J);return new q$(J.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(J){if(J===void 0){X$("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let $=[];for(let Q=0;Q<this.count;Q++){let Z=Q*this.data.stride+this.offset;for(let K=0;K<this.itemSize;K++)$.push(this.data.array[Z+K])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:$,normalized:this.normalized}}else{if(J.interleavedBuffers===void 0)J.interleavedBuffers={};if(J.interleavedBuffers[this.data.uuid]===void 0)J.interleavedBuffers[this.data.uuid]=this.data.toJSON(J);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}var $K=new k,EN=new k,ON=new X9;class P8{constructor(J=new k(1,0,0),$=0){this.isPlane=!0,this.normal=J,this.constant=$}set(J,$){return this.normal.copy(J),this.constant=$,this}setComponents(J,$,Q,Z){return this.normal.set(J,$,Q),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,$){return this.normal.copy(J),this.constant=-$.dot(this.normal),this}setFromCoplanarPoints(J,$,Q){let Z=$K.subVectors(Q,$).cross(EN.subVectors(J,$)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,$){return $.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,$,Q=!0){let Z=J.delta($K),K=this.normal.dot(Z);if(K===0){if(this.distanceToPoint(J.start)===0)return $.copy(J.start);return null}let U=-(J.start.dot(this.normal)+this.constant)/K;if(Q===!0&&(U<0||U>1))return null;return $.copy(J.start).addScaledVector(Z,U)}intersectsLine(J){let $=this.distanceToPoint(J.start),Q=this.distanceToPoint(J.end);return $<0&&Q>0||Q<0&&$>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,$){let Q=$||ON.getNormalMatrix(J),Z=this.coplanarPoint($K).applyMatrix4(J),K=this.normal.applyMatrix3(Q).normalize();return this.constant=-Z.dot(K),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(J){return this.normal.fromArray(J.normal),this.constant=J.constant,this}}var RN=0;class E8 extends a8{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:RN++}),this.uuid=n8(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new F0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let $ in J){let Q=J[$];if(Q===void 0){$9(`Material: parameter '${$}' has value of undefined.`);continue}let Z=this[$];if(Z===void 0){$9(`Material: '${$}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set(Q);else if(Z&&Z.isVector2&&(Q&&Q.isVector2)||Z&&Z.isEuler&&(Q&&Q.isEuler)||Z&&Z.isVector3&&(Q&&Q.isVector3))Z.copy(Q);else this[$]=Q}}toJSON(J){let $=J===void 0||typeof J==="string";if($)J={textures:{},images:{}};let Q={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(Q.uuid=this.uuid,Q.type=this.type,Q.blending=this.blending,Q.side=this.side,Q.shadowSide=this.shadowSide,Q.vertexColors=this.vertexColors,Q.opacity=this.opacity,Q.transparent=this.transparent,Q.blendSrc=this.blendSrc,Q.blendDst=this.blendDst,Q.blendEquation=this.blendEquation,Q.blendSrcAlpha=this.blendSrcAlpha,Q.blendDstAlpha=this.blendDstAlpha,Q.blendEquationAlpha=this.blendEquationAlpha,Q.blendColor=this.blendColor.getHex(),Q.blendAlpha=this.blendAlpha,Q.depthFunc=this.depthFunc,Q.depthTest=this.depthTest,Q.depthWrite=this.depthWrite,Q.colorWrite=this.colorWrite,Q.clipIntersection=this.clipIntersection,Q.clipShadows=this.clipShadows,Q.stencilWriteMask=this.stencilWriteMask,Q.stencilFunc=this.stencilFunc,Q.stencilRef=this.stencilRef,Q.stencilFuncMask=this.stencilFuncMask,Q.stencilFail=this.stencilFail,Q.stencilZFail=this.stencilZFail,Q.stencilZPass=this.stencilZPass,Q.stencilWrite=this.stencilWrite,Q.polygonOffset=this.polygonOffset,Q.polygonOffsetFactor=this.polygonOffsetFactor,Q.polygonOffsetUnits=this.polygonOffsetUnits,Q.dithering=this.dithering,Q.alphaTest=this.alphaTest,Q.alphaHash=this.alphaHash,Q.alphaToCoverage=this.alphaToCoverage,Q.premultipliedAlpha=this.premultipliedAlpha,Q.forceSinglePass=this.forceSinglePass,Q.allowOverride=this.allowOverride,Q.visible=this.visible,Q.toneMapped=this.toneMapped,Q.name=this.name,this.color&&this.color.isColor)Q.color=this.color.getHex();if(this.roughness!==void 0)Q.roughness=this.roughness;if(this.metalness!==void 0)Q.metalness=this.metalness;if(this.sheen!==void 0)Q.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Q.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Q.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Q.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0)Q.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Q.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Q.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Q.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Q.shininess=this.shininess;if(this.clearcoat!==void 0)Q.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Q.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Q.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Q.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Q.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Q.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)Q.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)Q.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)Q.dispersion=this.dispersion;if(this.retroreflectivity!==void 0)Q.retroreflectivity=this.retroreflectivity;if(this.iridescence!==void 0)Q.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Q.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Q.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Q.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Q.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Q.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Q.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Q.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Q.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Q.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Q.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Q.lightMap=this.lightMap.toJSON(J).uuid,Q.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Q.aoMap=this.aoMap.toJSON(J).uuid,Q.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Q.bumpMap=this.bumpMap.toJSON(J).uuid,Q.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Q.normalMap=this.normalMap.toJSON(J).uuid,Q.normalMapType=this.normalMapType,Q.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Q.displacementMap=this.displacementMap.toJSON(J).uuid,Q.displacementScale=this.displacementScale,Q.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Q.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Q.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Q.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Q.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Q.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Q.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Q.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Q.combine=this.combine}if(this.envMapRotation!==void 0)Q.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)Q.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Q.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Q.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Q.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Q.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Q.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Q.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Q.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0)Q.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Q.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Q.size=this.size;if(this.sizeAttenuation!==void 0)Q.sizeAttenuation=this.sizeAttenuation;if(Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0)Q.clippingPlanes=this.clippingPlanes.map((K)=>K.toJSON());if(this.rotation!==void 0)Q.rotation=this.rotation;if(this.depthPacking!==void 0)Q.depthPacking=this.depthPacking;if(this.linewidth!==void 0)Q.linewidth=this.linewidth;if(this.linecap!==void 0)Q.linecap=this.linecap;if(this.linejoin!==void 0)Q.linejoin=this.linejoin;if(this.dashSize!==void 0)Q.dashSize=this.dashSize;if(this.gapSize!==void 0)Q.gapSize=this.gapSize;if(this.scale!==void 0)Q.scale=this.scale;if(this.wireframe!==void 0)Q.wireframe=this.wireframe;if(this.wireframeLinewidth!==void 0)Q.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!==void 0)Q.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!==void 0)Q.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading!==void 0)Q.flatShading=this.flatShading;if(this.fog!==void 0)Q.fog=this.fog;if(Object.keys(this.userData).length>0)Q.userData=this.userData;function Z(K){let U=[];for(let H in K){let W=K[H];delete W.metadata,U.push(W)}return U}if($){let K=Z(J.textures),U=Z(J.images);if(K.length>0)Q.textures=K;if(U.length>0)Q.images=U}return Q}fromJSON(J,$){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new F0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.retroreflectivity!==void 0)this.retroreflectivity=J.retroreflectivity;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.clippingPlanes!==void 0)this.clippingPlanes=J.clippingPlanes.map((Q)=>new P8().fromJSON(Q));if(J.clipIntersection!==void 0)this.clipIntersection=J.clipIntersection;if(J.clipShadows!==void 0)this.clipShadows=J.clipShadows;if(J.depthPacking!==void 0)this.depthPacking=J.depthPacking;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.linecap!==void 0)this.linecap=J.linecap;if(J.linejoin!==void 0)this.linejoin=J.linejoin;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=$[J.map]||null;if(J.matcap!==void 0)this.matcap=$[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=$[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=$[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=$[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let Q=J.normalScale;if(Array.isArray(Q)===!1)Q=[Q,Q];this.normalScale=new G0().fromArray(Q)}if(J.displacementMap!==void 0)this.displacementMap=$[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=$[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=$[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=$[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=$[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=$[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=$[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=$[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=$[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=$[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=$[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=$[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=$[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=$[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new G0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=$[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=$[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=$[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=$[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=$[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=$[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=$[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let $=J.clippingPlanes,Q=null;if($!==null){let Z=$.length;Q=Array(Z);for(let K=0;K!==Z;++K)Q[K]=$[K].clone()}return this.clippingPlanes=Q,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}class v6 extends E8{constructor(J){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new F0(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.rotation=J.rotation,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var R6,J$=new k,M6=new k,V6=new k,_6=new G0,$$=new G0,FY=new v9,DQ=new k,Q$=new k,EQ=new k,uH=new G0,QK=new G0,mH=new G0;class T$ extends P9{constructor(J=new v6){super();if(this.isSprite=!0,this.type="Sprite",R6===void 0){R6=new O9;let $=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),Q=new XU($,5);R6.setIndex([0,1,2,0,2,3]),R6.setAttribute("position",new q$(Q,3,0,!1)),R6.setAttribute("uv",new q$(Q,2,3,!1))}this.geometry=R6,this.material=J,this.center=new G0(0.5,0.5),this.count=1}intersectsFrustum(J){return J.intersectsSprite(this)}raycast(J,$){if(J.camera===null)U9('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(M6.setFromMatrixScale(this.matrixWorld),FY.copy(J.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(J.camera.matrixWorldInverse,this.matrixWorld),V6.setFromMatrixPosition(this.modelViewMatrix),J.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)M6.multiplyScalar(-V6.z);let Q=this.material.rotation,Z,K;if(Q!==0)K=Math.cos(Q),Z=Math.sin(Q);let U=this.center;OQ(DQ.set(-0.5,-0.5,0),V6,U,M6,Z,K),OQ(Q$.set(0.5,-0.5,0),V6,U,M6,Z,K),OQ(EQ.set(0.5,0.5,0),V6,U,M6,Z,K),uH.set(0,0),QK.set(1,0),mH.set(1,1);let H=J.ray.intersectTriangle(DQ,Q$,EQ,!1,J$);if(H===null){if(OQ(Q$.set(-0.5,0.5,0),V6,U,M6,Z,K),QK.set(0,1),H=J.ray.intersectTriangle(DQ,EQ,Q$,!1,J$),H===null)return}let W=J.ray.origin.distanceTo(J$);if(W<J.near||W>J.far)return;$.push({distance:W,point:J$.clone(),uv:b7.getInterpolation(J$,DQ,Q$,EQ,uH,QK,mH,new G0),face:null,object:this})}copy(J,$){if(super.copy(J,$),J.center!==void 0)this.center.copy(J.center);return this.material=J.material,this}}function OQ(J,$,Q,Z,K,U){if(_6.subVectors(J,Q).addScalar(0.5).multiply(Z),K!==void 0)$$.x=U*_6.x-K*_6.y,$$.y=K*_6.x+U*_6.y;else $$.copy(_6);J.copy($),J.x+=$$.x,J.y+=$$.y,J.applyMatrix4(FY)}var c8=new k,ZK=new k,RQ=new k,MQ=new k;class S${constructor(J=new k,$=new k(0,0,-1)){this.origin=J,this.direction=$}set(J,$){return this.origin.copy(J),this.direction.copy($),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,$){return $.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,c8)),this}closestPointToPoint(J,$){$.subVectors(J,this.origin);let Q=$.dot(this.direction);if(Q<0)return $.copy(this.origin);return $.copy(this.origin).addScaledVector(this.direction,Q)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let $=c8.subVectors(J,this.origin).dot(this.direction);if($<0)return this.origin.distanceToSquared(J);return c8.copy(this.origin).addScaledVector(this.direction,$),c8.distanceToSquared(J)}distanceSqToSegment(J,$,Q,Z){ZK.copy(J).add($).multiplyScalar(0.5),RQ.copy($).sub(J).normalize(),MQ.copy(this.origin).sub(ZK);let K=J.distanceTo($)*0.5,U=-this.direction.dot(RQ),H=MQ.dot(this.direction),W=-MQ.dot(RQ),Y=MQ.lengthSq(),N=Math.abs(1-U*U),X,q,G,F;if(N>0)if(X=U*W-H,q=U*H-W,F=K*N,X>=0)if(q>=-F)if(q<=F){let O=1/N;X*=O,q*=O,G=X*(X+U*q+2*H)+q*(U*X+q+2*W)+Y}else q=K,X=Math.max(0,-(U*q+H)),G=-X*X+q*(q+2*W)+Y;else q=-K,X=Math.max(0,-(U*q+H)),G=-X*X+q*(q+2*W)+Y;else if(q<=-F)X=Math.max(0,-(-U*K+H)),q=X>0?-K:Math.min(Math.max(-K,-W),K),G=-X*X+q*(q+2*W)+Y;else if(q<=F)X=0,q=Math.min(Math.max(-K,-W),K),G=q*(q+2*W)+Y;else X=Math.max(0,-(U*K+H)),q=X>0?K:Math.min(Math.max(-K,-W),K),G=-X*X+q*(q+2*W)+Y;else q=U>0?-K:K,X=Math.max(0,-(U*q+H)),G=-X*X+q*(q+2*W)+Y;if(Q)Q.copy(this.origin).addScaledVector(this.direction,X);if(Z)Z.copy(ZK).addScaledVector(RQ,q);return G}intersectSphere(J,$){if(J.radius<0)return null;c8.subVectors(J.center,this.origin);let Q=c8.dot(this.direction),Z=c8.dot(c8)-Q*Q,K=J.radius*J.radius;if(Z>K)return null;let U=Math.sqrt(K-Z),H=Q-U,W=Q+U;if(W<0)return null;if(H<0)return this.at(W,$);return this.at(H,$)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let $=J.normal.dot(this.direction);if($===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Q=-(this.origin.dot(J.normal)+J.constant)/$;return Q>=0?Q:null}intersectPlane(J,$){let Q=this.distanceToPlane(J);if(Q===null)return null;return this.at(Q,$)}intersectsPlane(J){let $=J.distanceToPoint(this.origin);if($===0)return!0;if(J.normal.dot(this.direction)*$<0)return!0;return!1}intersectBox(J,$){let Q,Z,K,U,H,W,Y=1/this.direction.x,N=1/this.direction.y,X=1/this.direction.z,q=this.origin;if(Y>=0)Q=(J.min.x-q.x)*Y,Z=(J.max.x-q.x)*Y;else Q=(J.max.x-q.x)*Y,Z=(J.min.x-q.x)*Y;if(N>=0)K=(J.min.y-q.y)*N,U=(J.max.y-q.y)*N;else K=(J.max.y-q.y)*N,U=(J.min.y-q.y)*N;if(Q>U||K>Z)return null;if(K>Q||isNaN(Q))Q=K;if(U<Z||isNaN(Z))Z=U;if(X>=0)H=(J.min.z-q.z)*X,W=(J.max.z-q.z)*X;else H=(J.max.z-q.z)*X,W=(J.min.z-q.z)*X;if(Q>W||H>Z)return null;if(H>Q||Q!==Q)Q=H;if(W<Z||Z!==Z)Z=W;if(Z<0)return null;return this.at(Q>=0?Q:Z,$)}intersectsBox(J){return this.intersectBox(J,c8)!==null}intersectTriangle(J,$,Q,Z,K){let U=this.origin,H=this.direction,W=H.x,Y=H.y,N=H.z,X=J.x-U.x,q=J.y-U.y,G=J.z-U.z,F=$.x-U.x,O=$.y-U.y,V=$.z-U.z,D=Q.x-U.x,E=Q.y-U.y,C=Q.z-U.z,L=Math.abs(W),R=Math.abs(Y),_=Math.abs(N),B,A,M,I,y,S,f,t,v,l,Q0,s;if(L>=R&&L>=_)if(M=W,S=X,v=F,s=D,W>=0)B=Y,A=N,I=q,y=G,f=O,t=V,l=E,Q0=C;else B=N,A=Y,I=G,y=q,f=V,t=O,l=C,Q0=E;else if(R>=_)if(M=Y,S=q,v=O,s=E,Y>=0)B=N,A=W,I=G,y=X,f=V,t=F,l=C,Q0=D;else B=W,A=N,I=X,y=G,f=F,t=V,l=D,Q0=C;else if(M=N,S=G,v=V,s=C,N>=0)B=W,A=Y,I=X,y=q,f=F,t=O,l=D,Q0=E;else B=Y,A=W,I=q,y=X,f=O,t=F,l=E,Q0=D;if(M===0)return null;let a=B/M,u=A/M,x=1/M,Z0=I-a*S,O0=y-u*S,z0=f-a*v,d=t-u*v,X0=l-a*s,n=Q0-u*s,Y0=X0*d-n*z0,H0=Z0*n-O0*X0,c=z0*O0-d*Z0;if(Z){if(Y0<0||H0<0||c<0)return null}else if((Y0<0||H0<0||c<0)&&(Y0>0||H0>0||c>0))return null;let A0=Y0+H0+c;if(A0===0)return null;let r=x*(Y0*S+H0*v+c*s);if(A0>0?r<0:r>0)return null;return this.at(r/A0,K)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class g0 extends E8{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new F0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new i8,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var dH=new v9,SJ=new S$,VQ=new t8,lH=new k,_Q=new k,BQ=new k,IQ=new k,KK=new k,CQ=new k,cH=new k,AQ=new k;class h extends P9{constructor(J=new O9,$=new g0){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=$,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,$){if(super.copy(J,$),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}getVertexPosition(J,$){let Q=this.geometry,Z=Q.attributes.position,K=Q.morphAttributes.position,U=Q.morphTargetsRelative;$.fromBufferAttribute(Z,J);let H=this.morphTargetInfluences;if(K&&H){CQ.set(0,0,0);for(let W=0,Y=K.length;W<Y;W++){let N=H[W],X=K[W];if(N===0)continue;if(KK.fromBufferAttribute(X,J),U)CQ.addScaledVector(KK,N);else CQ.addScaledVector(KK.sub($),N)}$.add(CQ)}return $}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,$){let Q=this.geometry,Z=this.material,K=this.matrixWorld;if(Z===void 0)return;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(VQ.copy(Q.boundingSphere),VQ.applyMatrix4(K),SJ.copy(J.ray).recast(J.near),VQ.containsPoint(SJ.origin)===!1){if(SJ.intersectSphere(VQ,lH)===null)return;if(SJ.origin.distanceToSquared(lH)>(J.far-J.near)**2)return}if(dH.copy(K).invert(),SJ.copy(J.ray).applyMatrix4(dH),Q.boundingBox!==null){if(SJ.intersectsBox(Q.boundingBox)===!1)return}this._computeIntersections(J,$,SJ)}_computeIntersections(J,$,Q){let Z,K=this.geometry,U=this.material,H=K.index,W=K.attributes.position,Y=K.attributes.uv,N=K.attributes.uv1,X=K.attributes.normal,q=K.groups,G=K.drawRange;if(H!==null)if(Array.isArray(U))for(let F=0,O=q.length;F<O;F++){let V=q[F],D=U[V.materialIndex],E=Math.max(V.start,G.start),C=Math.min(H.count,Math.min(V.start+V.count,G.start+G.count));for(let L=E,R=C;L<R;L+=3){let _=H.getX(L),B=H.getX(L+1),A=H.getX(L+2);if(Z=zQ(this,D,J,Q,Y,N,X,_,B,A),Z)Z.faceIndex=Math.floor(L/3),Z.face.materialIndex=V.materialIndex,$.push(Z)}}else{let F=Math.max(0,G.start),O=Math.min(H.count,G.start+G.count);for(let V=F,D=O;V<D;V+=3){let E=H.getX(V),C=H.getX(V+1),L=H.getX(V+2);if(Z=zQ(this,U,J,Q,Y,N,X,E,C,L),Z)Z.faceIndex=Math.floor(V/3),$.push(Z)}}else if(W!==void 0)if(Array.isArray(U))for(let F=0,O=q.length;F<O;F++){let V=q[F],D=U[V.materialIndex],E=Math.max(V.start,G.start),C=Math.min(W.count,Math.min(V.start+V.count,G.start+G.count));for(let L=E,R=C;L<R;L+=3){let _=L,B=L+1,A=L+2;if(Z=zQ(this,D,J,Q,Y,N,X,_,B,A),Z)Z.faceIndex=Math.floor(L/3),Z.face.materialIndex=V.materialIndex,$.push(Z)}}else{let F=Math.max(0,G.start),O=Math.min(W.count,G.start+G.count);for(let V=F,D=O;V<D;V+=3){let E=V,C=V+1,L=V+2;if(Z=zQ(this,U,J,Q,Y,N,X,E,C,L),Z)Z.faceIndex=Math.floor(V/3),$.push(Z)}}}}function MN(J,$,Q,Z,K,U,H,W){let Y;if($.side===1)Y=Z.intersectTriangle(H,U,K,!0,W);else Y=Z.intersectTriangle(K,U,H,$.side===0,W);if(Y===null)return null;AQ.copy(W),AQ.applyMatrix4(J.matrixWorld);let N=Q.ray.origin.distanceTo(AQ);if(N<Q.near||N>Q.far)return null;return{distance:N,point:AQ.clone(),object:J}}function zQ(J,$,Q,Z,K,U,H,W,Y,N){J.getVertexPosition(W,_Q),J.getVertexPosition(Y,BQ),J.getVertexPosition(N,IQ);let X=MN(J,$,Q,Z,_Q,BQ,IQ,cH);if(X){let q=new k;if(b7.getBarycoord(cH,_Q,BQ,IQ,q),K)X.uv=b7.getInterpolatedAttribute(K,W,Y,N,q,new G0);if(U)X.uv1=b7.getInterpolatedAttribute(U,W,Y,N,q,new G0);if(H){if(X.normal=b7.getInterpolatedAttribute(H,W,Y,N,q,new k),X.normal.dot(Z.direction)>0)X.normal.multiplyScalar(-1)}let G={a:W,b:Y,c:N,normal:new k,materialIndex:0};b7.getNormal(_Q,BQ,IQ,G.normal),X.face=G,X.barycoord=q}return X}class y6 extends P7{constructor(J=null,$=1,Q=1,Z,K,U,H,W,Y=1003,N=1003,X,q){super(null,U,H,W,Y,N,Z,K,X,q);this.isDataTexture=!0,this.image={data:J,width:$,height:Q},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pQ extends e9{constructor(J,$,Q,Z=1){super(J,$,Q);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var B6=new v9,nH=new v9,LQ=[],sH=new D8,VN=new v9,Z$=new h,K$=new t8;class w9 extends h{constructor(J,$,Q){super(J,$);this.isInstancedMesh=!0,this.instanceMatrix=new pQ(new Float32Array(Q*16),16),this.instanceColor=null,this.morphTexture=null,this.count=Q,this.boundingBox=null,this.boundingSphere=null;for(let Z=0;Z<Q;Z++)this.setMatrixAt(Z,VN)}computeBoundingBox(){let J=this.geometry,$=this.count;if(this.boundingBox===null)this.boundingBox=new D8;if(J.boundingBox===null)J.computeBoundingBox();this.boundingBox.makeEmpty();for(let Q=0;Q<$;Q++)this.getMatrixAt(Q,B6),sH.copy(J.boundingBox).applyMatrix4(B6),this.boundingBox.union(sH)}computeBoundingSphere(){let J=this.geometry,$=this.count;if(this.boundingSphere===null)this.boundingSphere=new t8;if(J.boundingSphere===null)J.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let Q=0;Q<$;Q++)this.getMatrixAt(Q,B6),K$.copy(J.boundingSphere).applyMatrix4(B6),this.boundingSphere.union(K$)}copy(J,$){if(super.copy(J,$),this.instanceMatrix.copy(J.instanceMatrix),J.morphTexture!==null)this.morphTexture=J.morphTexture.clone();if(J.instanceColor!==null)this.instanceColor=J.instanceColor.clone();if(this.count=J.count,J.boundingBox!==null)this.boundingBox=J.boundingBox.clone();if(J.boundingSphere!==null)this.boundingSphere=J.boundingSphere.clone();return this}getColorAt(J,$){if(this.instanceColor===null)return $.setRGB(1,1,1);else return $.fromArray(this.instanceColor.array,J*3)}getMatrixAt(J,$){return $.fromArray(this.instanceMatrix.array,J*16)}getMorphAt(J,$){let Q=$.morphTargetInfluences,Z=this.morphTexture.source.data.data,K=Q.length+1,U=J*K+1;for(let H=0;H<Q.length;H++)Q[H]=Z[U+H]}raycast(J,$){let Q=this.matrixWorld,Z=this.count;if(Z$.geometry=this.geometry,Z$.material=this.material,Z$.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(K$.copy(this.boundingSphere),K$.applyMatrix4(Q),J.ray.intersectsSphere(K$)===!1)return;for(let K=0;K<Z;K++){this.getMatrixAt(K,B6),nH.multiplyMatrices(Q,B6),Z$.matrixWorld=nH,Z$.raycast(J,LQ);for(let U=0,H=LQ.length;U<H;U++){let W=LQ[U];W.instanceId=K,W.object=this,$.push(W)}LQ.length=0}}setColorAt(J,$){if(this.instanceColor===null)this.instanceColor=new pQ(new Float32Array(this.instanceMatrix.count*3).fill(1),3);return $.toArray(this.instanceColor.array,J*3),this}setMatrixAt(J,$){return $.toArray(this.instanceMatrix.array,J*16),this}setMorphAt(J,$){let Q=$.morphTargetInfluences,Z=Q.length+1;if(this.morphTexture===null)this.morphTexture=new y6(new Float32Array(Z*this.count),Z,this.count,1028,1015);let K=this.morphTexture.source.data.data,U=0;for(let Y=0;Y<Q.length;Y++)U+=Q[Y];let H=this.geometry.morphTargetsRelative?1:1-U,W=Z*J;return K[W]=H,K.set(Q,W+1),this}updateMorphTargets(){}dispose(){if(super.dispose(),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var kJ=new t8,_N=new G0(0.5,0.5),PQ=new k;class k${constructor(J=new P8,$=new P8,Q=new P8,Z=new P8,K=new P8,U=new P8){this.planes=[J,$,Q,Z,K,U]}set(J,$,Q,Z,K,U){let H=this.planes;return H[0].copy(J),H[1].copy($),H[2].copy(Q),H[3].copy(Z),H[4].copy(K),H[5].copy(U),this}copy(J){let $=this.planes;for(let Q=0;Q<6;Q++)$[Q].copy(J.planes[Q]);return this}setFromProjectionMatrix(J,$=2000,Q=!1){let Z=this.planes,K=J.elements,U=K[0],H=K[1],W=K[2],Y=K[3],N=K[4],X=K[5],q=K[6],G=K[7],F=K[8],O=K[9],V=K[10],D=K[11],E=K[12],C=K[13],L=K[14],R=K[15];if(Z[0].setComponents(Y-U,G-N,D-F,R-E).normalize(),Z[1].setComponents(Y+U,G+N,D+F,R+E).normalize(),Z[2].setComponents(Y+H,G+X,D+O,R+C).normalize(),Z[3].setComponents(Y-H,G-X,D-O,R-C).normalize(),Q)Z[4].setComponents(W,q,V,L).normalize(),Z[5].setComponents(Y-W,G-q,D-V,R-L).normalize();else if(Z[4].setComponents(Y-W,G-q,D-V,R-L).normalize(),$===2000)Z[5].setComponents(Y+W,G+q,D+V,R+L).normalize();else if($===2001)Z[5].setComponents(W,q,V,L).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+$);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();kJ.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let $=J.geometry;if($.boundingSphere===null)$.computeBoundingSphere();kJ.copy($.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(kJ)}intersectsSprite(J){kJ.center.set(0,0,0);let $=_N.distanceTo(J.center);return kJ.radius=0.7071067811865476+$,kJ.applyMatrix4(J.matrixWorld),this.intersectsSphere(kJ)}intersectsSphere(J){let $=this.planes,Q=J.center,Z=-J.radius;for(let K=0;K<6;K++)if($[K].distanceToPoint(Q)<Z)return!1;return!0}intersectsBox(J){let $=this.planes;for(let Q=0;Q<6;Q++){let Z=$[Q];if(PQ.x=Z.normal.x>0?J.max.x:J.min.x,PQ.y=Z.normal.y>0?J.max.y:J.min.y,PQ.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(PQ)<0)return!1}return!0}containsPoint(J){let $=this.planes;for(let Q=0;Q<6;Q++)if($[Q].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pJ extends E8{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new F0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var uQ=new k,mQ=new k,iH=new v9,U$=new S$,wQ=new t8,UK=new k,oH=new k;class GU extends P9{constructor(J=new O9,$=new pJ){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=$,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[0];for(let Z=1,K=$.count;Z<K;Z++)uQ.fromBufferAttribute($,Z-1),mQ.fromBufferAttribute($,Z),Q[Z]=Q[Z-1],Q[Z]+=uQ.distanceTo(mQ);J.setAttribute("lineDistance",new Q9(Q,1))}else $9("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,$){let Q=this.geometry,Z=this.matrixWorld,K=J.params.Line.threshold,U=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(wQ.copy(Q.boundingSphere),wQ.applyMatrix4(Z),wQ.radius+=K,J.ray.intersectsSphere(wQ)===!1)return;iH.copy(Z).invert(),U$.copy(J.ray).applyMatrix4(iH);let H=K/((this.scale.x+this.scale.y+this.scale.z)/3),W=H*H,Y=this.isLineSegments?2:1,N=Q.index,q=Q.attributes.position;if(N!==null){let G=Math.max(0,U.start),F=Math.min(N.count,U.start+U.count);for(let O=G,V=F-1;O<V;O+=Y){let D=N.getX(O),E=N.getX(O+1),C=TQ(this,J,U$,W,D,E,O);if(C)$.push(C)}if(this.isLineLoop){let O=N.getX(F-1),V=N.getX(G),D=TQ(this,J,U$,W,O,V,F-1);if(D)$.push(D)}}else{let G=Math.max(0,U.start),F=Math.min(q.count,U.start+U.count);for(let O=G,V=F-1;O<V;O+=Y){let D=TQ(this,J,U$,W,O,O+1,O);if(D)$.push(D)}if(this.isLineLoop){let O=TQ(this,J,U$,W,F-1,G,F-1);if(O)$.push(O)}}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}}function TQ(J,$,Q,Z,K,U,H){let W=J.geometry.attributes.position;if(uQ.fromBufferAttribute(W,K),mQ.fromBufferAttribute(W,U),Q.distanceSqToSegment(uQ,mQ,UK,oH)>Z)return;UK.applyMatrix4(J.matrixWorld);let N=$.ray.origin.distanceTo(UK);if(N<$.near||N>$.far)return;return{distance:N,point:oH.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var aH=new k,rH=new k;class O8 extends GU{constructor(J,$){super(J,$);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[];for(let Z=0,K=$.count;Z<K;Z+=2)aH.fromBufferAttribute($,Z),rH.fromBufferAttribute($,Z+1),Q[Z]=Z===0?0:Q[Z-1],Q[Z+1]=Q[Z]+aH.distanceTo(rH);J.setAttribute("lineDistance",new Q9(Q,1))}else $9("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class y7 extends E8{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new F0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var tH=new v9,qK=new S$,SQ=new t8,kQ=new k;class g7 extends P9{constructor(J=new O9,$=new y7){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=$,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}intersectsFrustum(J){return J.intersectsObject(this)}raycast(J,$){let Q=this.geometry,Z=this.matrixWorld,K=J.params.Points.threshold,U=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(SQ.copy(Q.boundingSphere),SQ.applyMatrix4(Z),SQ.radius+=K,J.ray.intersectsSphere(SQ)===!1)return;tH.copy(Z).invert(),qK.copy(J.ray).applyMatrix4(tH);let H=K/((this.scale.x+this.scale.y+this.scale.z)/3),W=H*H,Y=Q.index,X=Q.attributes.position;if(Y!==null){let q=Math.max(0,U.start),G=Math.min(Y.count,U.start+U.count);for(let F=q,O=G;F<O;F++){let V=Y.getX(F);kQ.fromBufferAttribute(X,V),eH(kQ,V,W,Z,J,$,this)}}else{let q=Math.max(0,U.start),G=Math.min(X.count,U.start+U.count);for(let F=q,O=G;F<O;F++)kQ.fromBufferAttribute(X,F),eH(kQ,F,W,Z,J,$,this)}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let Z=$[Q[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let K=0,U=Z.length;K<U;K++){let H=Z[K].name||String(K);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=K}}}}}function eH(J,$,Q,Z,K,U,H){let W=qK.distanceSqToPoint(J);if(W<Q){let Y=new k;qK.closestPointToPoint(J,Y),Y.applyMatrix4(Z);let N=K.ray.origin.distanceTo(Y);if(N<K.near||N>K.far)return;U.push({distance:N,distanceToRay:Math.sqrt(W),point:Y,index:$,face:null,faceIndex:null,barycoord:null,object:H})}}class WZ extends P7{constructor(J=[],$=301,Q,Z,K,U,H,W,Y,N){super(J,$,Q,Z,K,U,H,W,Y,N);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class O7 extends P7{constructor(J,$,Q,Z,K,U,H,W,Y){super(J,$,Q,Z,K,U,H,W,Y);this.isCanvasTexture=!0,this.needsUpdate=!0}}class uJ extends P7{constructor(J,$,Q=1014,Z,K,U,H=1003,W=1003,Y,N=1026,X=1){if(N!==1026&&N!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let q={width:J,height:$,depth:X};super(q,Z,K,U,H,W,N,Q,Y);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new P$(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let $=super.toJSON(J);return $.compareFunction=this.compareFunction,$}}class qU extends uJ{constructor(J,$=1014,Q=301,Z,K,U=1003,H=1003,W,Y=1026){let N={width:J,height:J,depth:1},X=[N,N,N,N,N,N];super(J,J,$,Q,Z,K,U,H,W,Y);this.image=X,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class YZ extends P7{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class _0 extends O9{constructor(J=1,$=1,Q=1,Z=1,K=1,U=1){super();this.type="BoxGeometry",this.parameters={width:J,height:$,depth:Q,widthSegments:Z,heightSegments:K,depthSegments:U};let H=this;Z=Math.floor(Z),K=Math.floor(K),U=Math.floor(U);let W=[],Y=[],N=[],X=[],q=0,G=0;F("z","y","x",-1,-1,Q,$,J,U,K,0),F("z","y","x",1,-1,Q,$,-J,U,K,1),F("x","z","y",1,1,J,Q,$,Z,U,2),F("x","z","y",1,-1,J,Q,-$,Z,U,3),F("x","y","z",1,-1,J,$,Q,Z,K,4),F("x","y","z",-1,-1,J,$,-Q,Z,K,5),this.setIndex(W),this.setAttribute("position",new Q9(Y,3)),this.setAttribute("normal",new Q9(N,3)),this.setAttribute("uv",new Q9(X,2));function F(O,V,D,E,C,L,R,_,B,A,M){let I=L/B,y=R/A,S=L/2,f=R/2,t=_/2,v=B+1,l=A+1,Q0=0,s=0,a=new k;for(let u=0;u<l;u++){let x=u*y-f;for(let Z0=0;Z0<v;Z0++){let O0=Z0*I-S;a[O]=O0*E,a[V]=x*C,a[D]=t,Y.push(a.x,a.y,a.z),a[O]=0,a[V]=0,a[D]=_>0?1:-1,N.push(a.x,a.y,a.z),X.push(Z0/B),X.push(1-u/A),Q0+=1}}for(let u=0;u<A;u++)for(let x=0;x<B;x++){let Z0=q+x+v*u,O0=q+x+v*(u+1),z0=q+(x+1)+v*(u+1),d=q+(x+1)+v*u;W.push(Z0,O0,d),W.push(O0,z0,d),s+=6}H.addGroup(G,s,M),G+=s,q+=Q0}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new _0(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class r7 extends O9{constructor(J=1,$=1,Q=4,Z=8,K=1){super();this.type="CapsuleGeometry",this.parameters={radius:J,height:$,capSegments:Q,radialSegments:Z,heightSegments:K},$=Math.max(0,$),Q=Math.max(1,Math.floor(Q)),Z=Math.max(3,Math.floor(Z)),K=Math.max(1,Math.floor(K));let U=[],H=[],W=[],Y=[],N=$/2,X=Math.PI/2*J,q=$,G=2*X+q,F=Q*2+K,O=Z+1,V=new k,D=new k;for(let E=0;E<=F;E++){let C=0,L=0,R=0,_=0;if(E<=Q){let M=E/Q,I=M*Math.PI/2;L=-N-J*Math.cos(I),R=J*Math.sin(I),_=-J*Math.cos(I),C=M*X}else if(E<=Q+K){let M=(E-Q)/K;L=-N+M*$,R=J,_=0,C=X+M*q}else{let M=(E-Q-K)/Q,I=M*Math.PI/2;L=N+J*Math.sin(I),R=J*Math.cos(I),_=J*Math.sin(I),C=X+q+M*X}let B=Math.max(0,Math.min(1,C/G)),A=0;if(E===0)A=0.5/Z;else if(E===F)A=-0.5/Z;for(let M=0;M<=Z;M++){let I=M/Z,y=I*Math.PI*2,S=Math.sin(y),f=Math.cos(y);D.x=-R*f,D.y=L,D.z=R*S,H.push(D.x,D.y,D.z),V.set(-R*f,_,R*S),V.normalize(),W.push(V.x,V.y,V.z),Y.push(I+A,B)}if(E>0){let M=(E-1)*O;for(let I=0;I<Z;I++){let y=M+I,S=M+I+1,f=E*O+I,t=E*O+I+1;U.push(y,S,f),U.push(S,t,f)}}}this.setIndex(U),this.setAttribute("position",new Q9(H,3)),this.setAttribute("normal",new Q9(W,3)),this.setAttribute("uv",new Q9(Y,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new r7(J.radius,J.height,J.capSegments,J.radialSegments,J.heightSegments)}}class C7 extends O9{constructor(J=1,$=32,Q=0,Z=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:J,segments:$,thetaStart:Q,thetaLength:Z},$=Math.max(3,$);let K=[],U=[],H=[],W=[],Y=new k,N=new G0;U.push(0,0,0),H.push(0,0,1),W.push(0.5,0.5);for(let X=0,q=3;X<=$;X++,q+=3){let G=Q+X/$*Z;Y.x=J*Math.cos(G),Y.y=J*Math.sin(G),U.push(Y.x,Y.y,Y.z),H.push(0,0,1),N.x=(U[q]/J+1)/2,N.y=(U[q+1]/J+1)/2,W.push(N.x,N.y)}for(let X=1;X<=$;X++)K.push(X,X+1,0);this.setIndex(K),this.setAttribute("position",new Q9(U,3)),this.setAttribute("normal",new Q9(H,3)),this.setAttribute("uv",new Q9(W,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new C7(J.radius,J.segments,J.thetaStart,J.thetaLength)}}class j0 extends O9{constructor(J=1,$=1,Q=1,Z=32,K=1,U=!1,H=0,W=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:J,radiusBottom:$,height:Q,radialSegments:Z,heightSegments:K,openEnded:U,thetaStart:H,thetaLength:W};let Y=this;Z=Math.floor(Z),K=Math.floor(K);let N=[],X=[],q=[],G=[],F=0,O=[],V=Q/2,D=0;if(E(),U===!1){if(J>0)C(!0);if($>0)C(!1)}this.setIndex(N),this.setAttribute("position",new Q9(X,3)),this.setAttribute("normal",new Q9(q,3)),this.setAttribute("uv",new Q9(G,2));function E(){let L=new k,R=new k,_=0,B=($-J)/Q;for(let A=0;A<=K;A++){let M=[],I=A/K,y=I*($-J)+J;for(let S=0;S<=Z;S++){let f=S/Z,t=f*W+H,v=Math.sin(t),l=Math.cos(t);R.x=y*v,R.y=-I*Q+V,R.z=y*l,X.push(R.x,R.y,R.z),L.set(v,B,l).normalize(),q.push(L.x,L.y,L.z),G.push(f,1-I),M.push(F++)}O.push(M)}for(let A=0;A<Z;A++)for(let M=0;M<K;M++){let I=O[M][A],y=O[M+1][A],S=O[M+1][A+1],f=O[M][A+1];if(J>0||M!==0)N.push(I,y,f),_+=3;if($>0||M!==K-1)N.push(y,S,f),_+=3}Y.addGroup(D,_,0),D+=_}function C(L){let R=F,_=new G0,B=new k,A=0,M=L===!0?J:$,I=L===!0?1:-1;for(let S=1;S<=Z;S++)X.push(0,V*I,0),q.push(0,I,0),G.push(0.5,0.5),F++;let y=F;for(let S=0;S<=Z;S++){let t=S/Z*W+H,v=Math.cos(t),l=Math.sin(t);B.x=M*l,B.y=V*I,B.z=M*v,X.push(B.x,B.y,B.z),q.push(0,I,0),_.x=v*0.5+0.5,_.y=l*0.5*I+0.5,G.push(_.x,_.y),F++}for(let S=0;S<Z;S++){let f=R+S,t=y+S;if(L===!0)N.push(t,t+1,f);else N.push(t+1,t,f);A+=3}Y.addGroup(D,A,L===!0?1:2),D+=A}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new j0(J.radiusTop,J.radiusBottom,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class Z7 extends j0{constructor(J=1,$=1,Q=32,Z=1,K=!1,U=0,H=Math.PI*2){super(0,J,$,Q,Z,K,U,H);this.type="ConeGeometry",this.parameters={radius:J,height:$,radialSegments:Q,heightSegments:Z,openEnded:K,thetaStart:U,thetaLength:H}}static fromJSON(J){return new Z7(J.radius,J.height,J.radialSegments,J.heightSegments,J.openEnded,J.thetaStart,J.thetaLength)}}class NZ extends O9{constructor(J=[],$=[],Q=1,Z=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:J,indices:$,radius:Q,detail:Z};let K=[],U=[];if(H(Z),Y(Q),N(),this.setAttribute("position",new Q9(K,3)),this.setAttribute("normal",new Q9(K.slice(),3)),this.setAttribute("uv",new Q9(U,2)),Z===0)this.computeVertexNormals();else this.normalizeNormals();function H(E){let C=new k,L=new k,R=new k;for(let _=0;_<$.length;_+=3)G($[_+0],C),G($[_+1],L),G($[_+2],R),W(C,L,R,E)}function W(E,C,L,R){let _=R+1,B=[];for(let A=0;A<=_;A++){B[A]=[];let M=E.clone().lerp(L,A/_),I=C.clone().lerp(L,A/_),y=_-A;for(let S=0;S<=y;S++)if(S===0&&A===_)B[A][S]=M;else B[A][S]=M.clone().lerp(I,S/y)}for(let A=0;A<_;A++)for(let M=0;M<2*(_-A)-1;M++){let I=Math.floor(M/2);if(M%2===0)q(B[A][I+1]),q(B[A+1][I]),q(B[A][I]);else q(B[A][I+1]),q(B[A+1][I+1]),q(B[A+1][I])}}function Y(E){let C=new k;for(let L=0;L<K.length;L+=3)C.x=K[L+0],C.y=K[L+1],C.z=K[L+2],C.normalize().multiplyScalar(E),K[L+0]=C.x,K[L+1]=C.y,K[L+2]=C.z}function N(){let E=new k;for(let C=0;C<K.length;C+=3){E.x=K[C+0],E.y=K[C+1],E.z=K[C+2];let L=V(E)/2/Math.PI+0.5,R=D(E)/Math.PI+0.5;U.push(L,1-R)}F(),X()}function X(){for(let E=0;E<U.length;E+=6){let C=U[E+0],L=U[E+2],R=U[E+4],_=Math.max(C,L,R),B=Math.min(C,L,R);if(_>0.9&&B<0.1){if(C<0.2)U[E+0]+=1;if(L<0.2)U[E+2]+=1;if(R<0.2)U[E+4]+=1}}}function q(E){K.push(E.x,E.y,E.z)}function G(E,C){let L=E*3;C.x=J[L+0],C.y=J[L+1],C.z=J[L+2]}function F(){let E=new k,C=new k,L=new k,R=new k,_=new G0,B=new G0,A=new G0;for(let M=0,I=0;M<K.length;M+=9,I+=6){E.set(K[M+0],K[M+1],K[M+2]),C.set(K[M+3],K[M+4],K[M+5]),L.set(K[M+6],K[M+7],K[M+8]),_.set(U[I+0],U[I+1]),B.set(U[I+2],U[I+3]),A.set(U[I+4],U[I+5]),R.copy(E).add(C).add(L).divideScalar(3);let y=V(R);O(_,I+0,E,y),O(B,I+2,C,y),O(A,I+4,L,y)}}function O(E,C,L,R){if(R<0&&E.x===1)U[C]=E.x-1;if(L.x===0&&L.z===0)U[C]=R/2/Math.PI+0.5}function V(E){return Math.atan2(E.z,-E.x)}function D(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new NZ(J.vertices,J.indices,J.radius,J.detail)}}var jQ=new k,vQ=new k,HK=new k,yQ=new b7;class f6 extends O9{constructor(J=null,$=1){super();if(this.type="EdgesGeometry",this.parameters={geometry:J,thresholdAngle:$},J!==null){let Z=Math.pow(10,4),K=Math.cos(gQ*$),U=J.getIndex(),H=J.getAttribute("position"),W=U?U.count:H.count,Y=[0,0,0],N=["a","b","c"],X=[,,,],q={},G=[];for(let F=0;F<W;F+=3){if(U)Y[0]=U.getX(F),Y[1]=U.getX(F+1),Y[2]=U.getX(F+2);else Y[0]=F,Y[1]=F+1,Y[2]=F+2;let{a:O,b:V,c:D}=yQ;if(O.fromBufferAttribute(H,Y[0]),V.fromBufferAttribute(H,Y[1]),D.fromBufferAttribute(H,Y[2]),yQ.getNormal(HK),X[0]=`${Math.round(O.x*Z)},${Math.round(O.y*Z)},${Math.round(O.z*Z)}`,X[1]=`${Math.round(V.x*Z)},${Math.round(V.y*Z)},${Math.round(V.z*Z)}`,X[2]=`${Math.round(D.x*Z)},${Math.round(D.y*Z)},${Math.round(D.z*Z)}`,X[0]===X[1]||X[1]===X[2]||X[2]===X[0])continue;for(let E=0;E<3;E++){let C=(E+1)%3,L=X[E],R=X[C],_=yQ[N[E]],B=yQ[N[C]],A=`${L}_${R}`,M=`${R}_${L}`;if(M in q&&q[M]){if(HK.dot(q[M].normal)<=K)G.push(_.x,_.y,_.z),G.push(B.x,B.y,B.z);q[M]=null}else if(!(A in q))q[A]={index0:Y[E],index1:Y[C],normal:HK.clone()}}}for(let F in q)if(q[F]){let{index0:O,index1:V}=q[F];jQ.fromBufferAttribute(H,O),vQ.fromBufferAttribute(H,V),G.push(jQ.x,jQ.y,jQ.z),G.push(vQ.x,vQ.y,vQ.z)}this.setAttribute("position",new Q9(G,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}class p7{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$9("Curve: .getPoint() not implemented.")}getPointAt(J,$){let Q=this.getUtoTmapping(J);return this.getPoint(Q,$)}getPoints(J=5){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPoint(Q/J));return $}getSpacedPoints(J=5){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPointAt(Q/J));return $}getLength(){let J=this.getLengths();return J[J.length-1]}getLengths(J=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===J+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let $=[],Q,Z=this.getPoint(0),K=0;$.push(0);for(let U=1;U<=J;U++)Q=this.getPoint(U/J),K+=Q.distanceTo(Z),$.push(K),Z=Q;return this.cacheArcLengths=$,$}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(J,$=null){let Q=this.getLengths(),Z=0,K=Q.length,U;if($)U=$;else U=J*Q[K-1];let H=0,W=K-1,Y;while(H<=W)if(Z=Math.floor(H+(W-H)/2),Y=Q[Z]-U,Y<0)H=Z+1;else if(Y>0)W=Z-1;else{W=Z;break}if(Z=W,Q[Z]===U)return Z/(K-1);let N=Q[Z],q=Q[Z+1]-N,G=(U-N)/q;return(Z+G)/(K-1)}getTangent(J,$){let Z=J-0.0001,K=J+0.0001;if(Z<0)Z=0;if(K>1)K=1;let U=this.getPoint(Z),H=this.getPoint(K),W=$||(U.isVector2?new G0:new k);return W.copy(H).sub(U).normalize(),W}getTangentAt(J,$){let Q=this.getUtoTmapping(J);return this.getTangent(Q,$)}computeFrenetFrames(J,$=!1){let Q=new k,Z=[],K=[],U=[],H=new k,W=new v9;for(let G=0;G<=J;G++){let F=G/J;Z[G]=this.getTangentAt(F,new k)}K[0]=new k,U[0]=new k;let Y=Number.MAX_VALUE,N=Math.abs(Z[0].x),X=Math.abs(Z[0].y),q=Math.abs(Z[0].z);if(N<=Y)Y=N,Q.set(1,0,0);if(X<=Y)Y=X,Q.set(0,1,0);if(q<=Y)Q.set(0,0,1);H.crossVectors(Z[0],Q).normalize(),K[0].crossVectors(Z[0],H),U[0].crossVectors(Z[0],K[0]);for(let G=1;G<=J;G++){if(K[G]=K[G-1].clone(),U[G]=U[G-1].clone(),H.crossVectors(Z[G-1],Z[G]),H.length()>Number.EPSILON){H.normalize();let F=Math.acos(B9(Z[G-1].dot(Z[G]),-1,1));K[G].applyMatrix4(W.makeRotationAxis(H,F))}U[G].crossVectors(Z[G],K[G])}if($===!0){let G=Math.acos(B9(K[0].dot(K[J]),-1,1));if(G/=J,Z[0].dot(H.crossVectors(K[0],K[J]))>0)G=-G;for(let F=1;F<=J;F++)K[F].applyMatrix4(W.makeRotationAxis(Z[F],G*F)),U[F].crossVectors(Z[F],K[F])}return{tangents:Z,normals:K,binormals:U}}clone(){return new this.constructor().copy(this)}copy(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}toJSON(){let J={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return J.arcLengthDivisions=this.arcLengthDivisions,J.type=this.type,J}fromJSON(J){return this.arcLengthDivisions=J.arcLengthDivisions,this}}class j$ extends p7{constructor(J=0,$=0,Q=1,Z=1,K=0,U=Math.PI*2,H=!1,W=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=J,this.aY=$,this.xRadius=Q,this.yRadius=Z,this.aStartAngle=K,this.aEndAngle=U,this.aClockwise=H,this.aRotation=W}getPoint(J,$=new G0){let Q=$,Z=Math.PI*2,K=this.aEndAngle-this.aStartAngle,U=Math.abs(K)<Number.EPSILON;while(K<0)K+=Z;while(K>Z)K-=Z;if(K<Number.EPSILON)if(U)K=0;else K=Z;if(this.aClockwise===!0&&!U)if(K===Z)K=-Z;else K=K-Z;let H=this.aStartAngle+J*K,W=this.aX+this.xRadius*Math.cos(H),Y=this.aY+this.yRadius*Math.sin(H);if(this.aRotation!==0){let N=Math.cos(this.aRotation),X=Math.sin(this.aRotation),q=W-this.aX,G=Y-this.aY;W=q*N-G*X+this.aX,Y=q*X+G*N+this.aY}return Q.set(W,Y)}copy(J){return super.copy(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}toJSON(){let J=super.toJSON();return J.aX=this.aX,J.aY=this.aY,J.xRadius=this.xRadius,J.yRadius=this.yRadius,J.aStartAngle=this.aStartAngle,J.aEndAngle=this.aEndAngle,J.aClockwise=this.aClockwise,J.aRotation=this.aRotation,J}fromJSON(J){return super.fromJSON(J),this.aX=J.aX,this.aY=J.aY,this.xRadius=J.xRadius,this.yRadius=J.yRadius,this.aStartAngle=J.aStartAngle,this.aEndAngle=J.aEndAngle,this.aClockwise=J.aClockwise,this.aRotation=J.aRotation,this}}class FU extends j${constructor(J,$,Q,Z,K,U){super(J,$,Q,Q,Z,K,U);this.isArcCurve=!0,this.type="ArcCurve"}}function DU(){let J=0,$=0,Q=0,Z=0;function K(U,H,W,Y){J=U,$=W,Q=-3*U+3*H-2*W-Y,Z=2*U-2*H+W+Y}return{initCatmullRom:function(U,H,W,Y,N){K(H,W,N*(W-U),N*(Y-H))},initNonuniformCatmullRom:function(U,H,W,Y,N,X,q){let G=(H-U)/N-(W-U)/(N+X)+(W-H)/X,F=(W-H)/X-(Y-H)/(X+q)+(Y-W)/q;G*=X,F*=X,K(H,W,G,F)},calc:function(U){let H=U*U,W=H*U;return J+$*U+Q*H+Z*W}}}var JW=new k,$W=new k,WK=new DU,YK=new DU,NK=new DU;class b6 extends p7{constructor(J=[],$=!1,Q="centripetal",Z=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=J,this.closed=$,this.curveType=Q,this.tension=Z}getPoint(J,$=new k){let Q=$,Z=this.points,K=Z.length,U=(K-(this.closed?0:1))*J,H=Math.floor(U),W=U-H;if(this.closed)H+=H>0?0:(Math.floor(Math.abs(H)/K)+1)*K;else if(W===0&&H===K-1)H=K-2,W=1;let Y,N;if(this.closed||H>0)Y=Z[(H-1)%K];else $W.subVectors(Z[0],Z[1]).add(Z[0]),Y=$W;let X=Z[H%K],q=Z[(H+1)%K];if(this.closed||H+2<K)N=Z[(H+2)%K];else JW.subVectors(Z[K-1],Z[K-2]).add(Z[K-1]),N=JW;if(this.curveType==="centripetal"||this.curveType==="chordal"){let G=this.curveType==="chordal"?0.5:0.25,F=Math.pow(Y.distanceToSquared(X),G),O=Math.pow(X.distanceToSquared(q),G),V=Math.pow(q.distanceToSquared(N),G);if(O<0.0001)O=1;if(F<0.0001)F=O;if(V<0.0001)V=O;WK.initNonuniformCatmullRom(Y.x,X.x,q.x,N.x,F,O,V),YK.initNonuniformCatmullRom(Y.y,X.y,q.y,N.y,F,O,V),NK.initNonuniformCatmullRom(Y.z,X.z,q.z,N.z,F,O,V)}else if(this.curveType==="catmullrom")WK.initCatmullRom(Y.x,X.x,q.x,N.x,this.tension),YK.initCatmullRom(Y.y,X.y,q.y,N.y,this.tension),NK.initCatmullRom(Y.z,X.z,q.z,N.z,this.tension);return Q.set(WK.calc(W),YK.calc(W),NK.calc(W)),Q}copy(J){super.copy(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(Z.clone())}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Q=this.points.length;$<Q;$++){let Z=this.points[$];J.points.push(Z.toArray())}return J.closed=this.closed,J.curveType=this.curveType,J.tension=this.tension,J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(new k().fromArray(Z))}return this.closed=J.closed,this.curveType=J.curveType,this.tension=J.tension,this}}function QW(J,$,Q,Z,K){let U=(Z-$)*0.5,H=(K-Q)*0.5,W=J*J,Y=J*W;return(2*Q-2*Z+U+H)*Y+(-3*Q+3*Z-2*U-H)*W+U*J+Q}function BN(J,$){let Q=1-J;return Q*Q*$}function IN(J,$){return 2*(1-J)*J*$}function CN(J,$){return J*J*$}function W$(J,$,Q,Z){return BN(J,$)+IN(J,Q)+CN(J,Z)}function AN(J,$){let Q=1-J;return Q*Q*Q*$}function zN(J,$){let Q=1-J;return 3*Q*Q*J*$}function LN(J,$){return 3*(1-J)*J*J*$}function PN(J,$){return J*J*J*$}function Y$(J,$,Q,Z,K){return AN(J,$)+zN(J,Q)+LN(J,Z)+PN(J,K)}class XZ extends p7{constructor(J=new G0,$=new G0,Q=new G0,Z=new G0){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=J,this.v1=$,this.v2=Q,this.v3=Z}getPoint(J,$=new G0){let Q=$,Z=this.v0,K=this.v1,U=this.v2,H=this.v3;return Q.set(Y$(J,Z.x,K.x,U.x,H.x),Y$(J,Z.y,K.y,U.y,H.y)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class EU extends p7{constructor(J=new k,$=new k,Q=new k,Z=new k){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=J,this.v1=$,this.v2=Q,this.v3=Z}getPoint(J,$=new k){let Q=$,Z=this.v0,K=this.v1,U=this.v2,H=this.v3;return Q.set(Y$(J,Z.x,K.x,U.x,H.x),Y$(J,Z.y,K.y,U.y,H.y),Y$(J,Z.z,K.z,U.z,H.z)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this.v3.copy(J.v3),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J.v3=this.v3.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this.v3.fromArray(J.v3),this}}class GZ extends p7{constructor(J=new G0,$=new G0){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=J,this.v2=$}getPoint(J,$=new G0){let Q=$;if(J===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar(J).add(this.v1);return Q}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new G0){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class x6 extends p7{constructor(J=new k,$=new k){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=J,this.v2=$}getPoint(J,$=new k){let Q=$;if(J===1)Q.copy(this.v2);else Q.copy(this.v2).sub(this.v1),Q.multiplyScalar(J).add(this.v1);return Q}getPointAt(J,$){return this.getPoint(J,$)}getTangent(J,$=new k){return $.subVectors(this.v2,this.v1).normalize()}getTangentAt(J,$){return this.getTangent(J,$)}copy(J){return super.copy(J),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class qZ extends p7{constructor(J=new G0,$=new G0,Q=new G0){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=J,this.v1=$,this.v2=Q}getPoint(J,$=new G0){let Q=$,Z=this.v0,K=this.v1,U=this.v2;return Q.set(W$(J,Z.x,K.x,U.x),W$(J,Z.y,K.y,U.y)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class FZ extends p7{constructor(J=new k,$=new k,Q=new k){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=J,this.v1=$,this.v2=Q}getPoint(J,$=new k){let Q=$,Z=this.v0,K=this.v1,U=this.v2;return Q.set(W$(J,Z.x,K.x,U.x),W$(J,Z.y,K.y,U.y),W$(J,Z.z,K.z,U.z)),Q}copy(J){return super.copy(J),this.v0.copy(J.v0),this.v1.copy(J.v1),this.v2.copy(J.v2),this}toJSON(){let J=super.toJSON();return J.v0=this.v0.toArray(),J.v1=this.v1.toArray(),J.v2=this.v2.toArray(),J}fromJSON(J){return super.fromJSON(J),this.v0.fromArray(J.v0),this.v1.fromArray(J.v1),this.v2.fromArray(J.v2),this}}class DZ extends p7{constructor(J=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=J}getPoint(J,$=new G0){let Q=$,Z=this.points,K=(Z.length-1)*J,U=Math.floor(K),H=K-U,W=Z[U===0?U:U-1],Y=Z[U],N=Z[U>Z.length-2?Z.length-1:U+1],X=Z[U>Z.length-3?Z.length-1:U+2];return Q.set(QW(H,W.x,Y.x,N.x,X.x),QW(H,W.y,Y.y,N.y,X.y)),Q}copy(J){super.copy(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.points=[];for(let $=0,Q=this.points.length;$<Q;$++){let Z=this.points[$];J.points.push(Z.toArray())}return J}fromJSON(J){super.fromJSON(J),this.points=[];for(let $=0,Q=J.points.length;$<Q;$++){let Z=J.points[$];this.points.push(new G0().fromArray(Z))}return this}}var dQ=Object.freeze({__proto__:null,ArcCurve:FU,CatmullRomCurve3:b6,CubicBezierCurve:XZ,CubicBezierCurve3:EU,EllipseCurve:j$,LineCurve:GZ,LineCurve3:x6,QuadraticBezierCurve:qZ,QuadraticBezierCurve3:FZ,SplineCurve:DZ});class OU extends p7{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(J){this.curves.push(J)}closePath(){let J=this.curves[0].getPoint(0),$=this.curves[this.curves.length-1].getPoint(1);if(!J.equals($)){let Q=J.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new dQ[Q]($,J))}return this}getPoint(J,$){let Q=J*this.getLength(),Z=this.getCurveLengths(),K=0;while(K<Z.length){if(Z[K]>=Q){let U=Z[K]-Q,H=this.curves[K],W=H.getLength(),Y=W===0?0:1-U/W;return H.getPointAt(Y,$)}K++}return null}getLength(){let J=this.getCurveLengths();return J[J.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let J=[],$=0;for(let Q=0,Z=this.curves.length;Q<Z;Q++)$+=this.curves[Q].getLength(),J.push($);return this.cacheLengths=J,J}getSpacedPoints(J=40){let $=[];for(let Q=0;Q<=J;Q++)$.push(this.getPoint(Q/J));if(this.autoClose)$.push($[0]);return $}getPoints(J=12){let $=[],Q;for(let Z=0,K=this.curves;Z<K.length;Z++){let U=K[Z],H=U.isEllipseCurve?J*2:U.isLineCurve||U.isLineCurve3?1:U.isSplineCurve?J*U.points.length:J,W=U.getPoints(H);for(let Y=0;Y<W.length;Y++){let N=W[Y];if(Q&&Q.equals(N))continue;$.push(N),Q=N}}if(this.autoClose&&$.length>1&&!$[$.length-1].equals($[0]))$.push($[0]);return $}copy(J){super.copy(J),this.curves=[];for(let $=0,Q=J.curves.length;$<Q;$++){let Z=J.curves[$];this.curves.push(Z.clone())}return this.autoClose=J.autoClose,this}toJSON(){let J=super.toJSON();J.autoClose=this.autoClose,J.curves=[];for(let $=0,Q=this.curves.length;$<Q;$++){let Z=this.curves[$];J.curves.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.autoClose=J.autoClose,this.curves=[];for(let $=0,Q=J.curves.length;$<Q;$++){let Z=J.curves[$];this.curves.push(new dQ[Z.type]().fromJSON(Z))}return this}}class lQ extends OU{constructor(J){super();if(this.type="Path",this.currentPoint=new G0,J)this.setFromPoints(J)}setFromPoints(J){this.moveTo(J[0].x,J[0].y);for(let $=1,Q=J.length;$<Q;$++)this.lineTo(J[$].x,J[$].y);return this}moveTo(J,$){return this.currentPoint.set(J,$),this}lineTo(J,$){let Q=new GZ(this.currentPoint.clone(),new G0(J,$));return this.curves.push(Q),this.currentPoint.set(J,$),this}quadraticCurveTo(J,$,Q,Z){let K=new qZ(this.currentPoint.clone(),new G0(J,$),new G0(Q,Z));return this.curves.push(K),this.currentPoint.set(Q,Z),this}bezierCurveTo(J,$,Q,Z,K,U){let H=new XZ(this.currentPoint.clone(),new G0(J,$),new G0(Q,Z),new G0(K,U));return this.curves.push(H),this.currentPoint.set(K,U),this}splineThru(J){let $=[this.currentPoint.clone()].concat(J),Q=new DZ($);return this.curves.push(Q),this.currentPoint.copy(J[J.length-1]),this}arc(J,$,Q,Z,K,U){let H=this.currentPoint.x,W=this.currentPoint.y;return this.absarc(J+H,$+W,Q,Z,K,U),this}absarc(J,$,Q,Z,K,U){return this.absellipse(J,$,Q,Q,Z,K,U),this}ellipse(J,$,Q,Z,K,U,H,W){let Y=this.currentPoint.x,N=this.currentPoint.y;return this.absellipse(J+Y,$+N,Q,Z,K,U,H,W),this}absellipse(J,$,Q,Z,K,U,H,W){let Y=new j$(J,$,Q,Z,K,U,H,W);if(this.curves.length>0){let X=Y.getPoint(0);if(!X.equals(this.currentPoint))this.lineTo(X.x,X.y)}this.curves.push(Y);let N=Y.getPoint(1);return this.currentPoint.copy(N),this}copy(J){return super.copy(J),this.currentPoint.copy(J.currentPoint),this}toJSON(){let J=super.toJSON();return J.currentPoint=this.currentPoint.toArray(),J}fromJSON(J){return super.fromJSON(J),this.currentPoint.fromArray(J.currentPoint),this}}class Q8 extends lQ{constructor(J){super(J);this.uuid=n8(),this.type="Shape",this.holes=[]}getPointsHoles(J){let $=[];for(let Q=0,Z=this.holes.length;Q<Z;Q++)$[Q]=this.holes[Q].getPoints(J);return $}extractPoints(J){return{shape:this.getPoints(J),holes:this.getPointsHoles(J)}}copy(J){super.copy(J),this.holes=[];for(let $=0,Q=J.holes.length;$<Q;$++){let Z=J.holes[$];this.holes.push(Z.clone())}return this}toJSON(){let J=super.toJSON();J.uuid=this.uuid,J.holes=[];for(let $=0,Q=this.holes.length;$<Q;$++){let Z=this.holes[$];J.holes.push(Z.toJSON())}return J}fromJSON(J){super.fromJSON(J),this.uuid=J.uuid,this.holes=[];for(let $=0,Q=J.holes.length;$<Q;$++){let Z=J.holes[$];this.holes.push(new lQ().fromJSON(Z))}return this}}function wN(J,$,Q=2){let Z=$&&$.length,K=Z?$[0]*Q:J.length,U=DY(J,0,K,Q,!0),H=[];if(!U||U.next===U.prev)return H;let W,Y,N;if(Z)U=vN(J,$,U,Q);if(J.length>80*Q){W=J[0],Y=J[1];let X=W,q=Y;for(let G=Q;G<K;G+=Q){let F=J[G],O=J[G+1];if(F<W)W=F;if(O<Y)Y=O;if(F>X)X=F;if(O>q)q=O}N=Math.max(X-W,q-Y),N=N!==0?32767/N:0}return F$(U,H,Q,W,Y,N,0),H}function DY(J,$,Q,Z,K){let U;if(K===lN(J,$,Q,Z)>0)for(let H=$;H<Q;H+=Z)U=ZW(H/Z|0,J[H],J[H+1],U);else for(let H=Q-Z;H>=$;H-=Z)U=ZW(H/Z|0,J[H],J[H+1],U);if(U&&P6(U,U.next))E$(U),U=U.next;return U}function vJ(J,$){if(!J)return J;if(!$)$=J;let Q=J,Z;do if(Z=!1,!Q.steiner&&(P6(Q,Q.next)||H7(Q.prev,Q,Q.next)===0)){if(E$(Q),Q=$=Q.prev,Q===Q.next)break;Z=!0}else Q=Q.next;while(Z||Q!==$);return $}function F$(J,$,Q,Z,K,U,H){if(!J)return;if(!H&&U)hN(J,Z,K,U);let W=J;while(J.prev!==J.next){let{prev:Y,next:N}=J;if(U?SN(J,Z,K,U):TN(J)){$.push(Y.i,J.i,N.i),E$(J),J=N.next,W=N.next;continue}if(J=N,J===W){if(!H)F$(vJ(J),$,Q,Z,K,U,1);else if(H===1)J=kN(vJ(J),$),F$(J,$,Q,Z,K,U,2);else if(H===2)jN(J,$,Q,Z,K,U);break}}}function TN(J){let $=J.prev,Q=J,Z=J.next;if(H7($,Q,Z)>=0)return!1;let K=$.x,U=Q.x,H=Z.x,W=$.y,Y=Q.y,N=Z.y,X=Math.min(K,U,H),q=Math.min(W,Y,N),G=Math.max(K,U,H),F=Math.max(W,Y,N),O=Z.next;while(O!==$){if(O.x>=X&&O.x<=G&&O.y>=q&&O.y<=F&&H$(K,W,U,Y,H,N,O.x,O.y)&&H7(O.prev,O,O.next)>=0)return!1;O=O.next}return!0}function SN(J,$,Q,Z){let K=J.prev,U=J,H=J.next;if(H7(K,U,H)>=0)return!1;let W=K.x,Y=U.x,N=H.x,X=K.y,q=U.y,G=H.y,F=Math.min(W,Y,N),O=Math.min(X,q,G),V=Math.max(W,Y,N),D=Math.max(X,q,G),E=FK(F,O,$,Q,Z),C=FK(V,D,$,Q,Z),L=J.prevZ,R=J.nextZ;while(L&&L.z>=E&&R&&R.z<=C){if(L.x>=F&&L.x<=V&&L.y>=O&&L.y<=D&&L!==K&&L!==H&&H$(W,X,Y,q,N,G,L.x,L.y)&&H7(L.prev,L,L.next)>=0)return!1;if(L=L.prevZ,R.x>=F&&R.x<=V&&R.y>=O&&R.y<=D&&R!==K&&R!==H&&H$(W,X,Y,q,N,G,R.x,R.y)&&H7(R.prev,R,R.next)>=0)return!1;R=R.nextZ}while(L&&L.z>=E){if(L.x>=F&&L.x<=V&&L.y>=O&&L.y<=D&&L!==K&&L!==H&&H$(W,X,Y,q,N,G,L.x,L.y)&&H7(L.prev,L,L.next)>=0)return!1;L=L.prevZ}while(R&&R.z<=C){if(R.x>=F&&R.x<=V&&R.y>=O&&R.y<=D&&R!==K&&R!==H&&H$(W,X,Y,q,N,G,R.x,R.y)&&H7(R.prev,R,R.next)>=0)return!1;R=R.nextZ}return!0}function kN(J,$){let Q=J;do{let Z=Q.prev,K=Q.next.next;if(!P6(Z,K)&&OY(Z,Q,Q.next,K)&&D$(Z,K)&&D$(K,Z))$.push(Z.i,Q.i,K.i),E$(Q),E$(Q.next),Q=J=K;Q=Q.next}while(Q!==J);return vJ(Q)}function jN(J,$,Q,Z,K,U){let H=J;do{let W=H.next.next;while(W!==H.prev){if(H.i!==W.i&&uN(H,W)){let Y=RY(H,W);H=vJ(H,H.next),Y=vJ(Y,Y.next),F$(H,$,Q,Z,K,U,0),F$(Y,$,Q,Z,K,U,0);return}W=W.next}H=H.next}while(H!==J)}function vN(J,$,Q,Z){let K=[];for(let U=0,H=$.length;U<H;U++){let W=$[U]*Z,Y=U<H-1?$[U+1]*Z:J.length,N=DY(J,W,Y,Z,!1);if(N===N.next)N.steiner=!0;K.push(pN(N))}K.sort(yN);for(let U=0;U<K.length;U++)Q=fN(K[U],Q);return Q}function yN(J,$){let Q=J.x-$.x;if(Q===0){if(Q=J.y-$.y,Q===0){let Z=(J.next.y-J.y)/(J.next.x-J.x),K=($.next.y-$.y)/($.next.x-$.x);Q=Z-K}}return Q}function fN(J,$){let Q=bN(J,$);if(!Q)return $;let Z=RY(Q,J);return vJ(Z,Z.next),vJ(Q,Q.next)}function bN(J,$){let Q=$,Z=J.x,K=J.y,U=-1/0,H;if(P6(J,Q))return Q;do{if(P6(J,Q.next))return Q.next;else if(K<=Q.y&&K>=Q.next.y&&Q.next.y!==Q.y){let q=Q.x+(K-Q.y)*(Q.next.x-Q.x)/(Q.next.y-Q.y);if(q<=Z&&q>U){if(U=q,H=Q.x<Q.next.x?Q:Q.next,q===Z)return H}}Q=Q.next}while(Q!==$);if(!H)return null;let W=H,Y=H.x,N=H.y,X=1/0;Q=H;do{if(Z>=Q.x&&Q.x>=Y&&Z!==Q.x&&EY(K<N?Z:U,K,Y,N,K<N?U:Z,K,Q.x,Q.y)){let q=Math.abs(K-Q.y)/(Z-Q.x);if(D$(Q,J)&&(q<X||q===X&&(Q.x>H.x||Q.x===H.x&&xN(H,Q))))H=Q,X=q}Q=Q.next}while(Q!==W);return H}function xN(J,$){return H7(J.prev,J,$.prev)<0&&H7($.next,J,J.next)<0}function hN(J,$,Q,Z){let K=J;do{if(K.z===0)K.z=FK(K.x,K.y,$,Q,Z);K.prevZ=K.prev,K.nextZ=K.next,K=K.next}while(K!==J);K.prevZ.nextZ=null,K.prevZ=null,gN(K)}function gN(J){let $,Q=1;do{let Z=J,K;J=null;let U=null;$=0;while(Z){$++;let H=Z,W=0;for(let N=0;N<Q;N++)if(W++,H=H.nextZ,!H)break;let Y=Q;while(W>0||Y>0&&H){if(W!==0&&(Y===0||!H||Z.z<=H.z))K=Z,Z=Z.nextZ,W--;else K=H,H=H.nextZ,Y--;if(U)U.nextZ=K;else J=K;K.prevZ=U,U=K}Z=H}U.nextZ=null,Q*=2}while($>1);return J}function FK(J,$,Q,Z,K){return J=(J-Q)*K|0,$=($-Z)*K|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,$=($|$<<8)&16711935,$=($|$<<4)&252645135,$=($|$<<2)&858993459,$=($|$<<1)&1431655765,J|$<<1}function pN(J){let $=J,Q=J;do{if($.x<Q.x||$.x===Q.x&&$.y<Q.y)Q=$;$=$.next}while($!==J);return Q}function EY(J,$,Q,Z,K,U,H,W){return(K-H)*($-W)>=(J-H)*(U-W)&&(J-H)*(Z-W)>=(Q-H)*($-W)&&(Q-H)*(U-W)>=(K-H)*(Z-W)}function H$(J,$,Q,Z,K,U,H,W){return!(J===H&&$===W)&&EY(J,$,Q,Z,K,U,H,W)}function uN(J,$){return J.next.i!==$.i&&J.prev.i!==$.i&&!mN(J,$)&&(D$(J,$)&&D$($,J)&&dN(J,$)&&(H7(J.prev,J,$.prev)||H7(J,$.prev,$))||P6(J,$)&&H7(J.prev,J,J.next)>0&&H7($.prev,$,$.next)>0)}function H7(J,$,Q){return($.y-J.y)*(Q.x-$.x)-($.x-J.x)*(Q.y-$.y)}function P6(J,$){return J.x===$.x&&J.y===$.y}function OY(J,$,Q,Z){let K=bQ(H7(J,$,Q)),U=bQ(H7(J,$,Z)),H=bQ(H7(Q,Z,J)),W=bQ(H7(Q,Z,$));if(K!==U&&H!==W)return!0;if(K===0&&fQ(J,Q,$))return!0;if(U===0&&fQ(J,Z,$))return!0;if(H===0&&fQ(Q,J,Z))return!0;if(W===0&&fQ(Q,$,Z))return!0;return!1}function fQ(J,$,Q){return $.x<=Math.max(J.x,Q.x)&&$.x>=Math.min(J.x,Q.x)&&$.y<=Math.max(J.y,Q.y)&&$.y>=Math.min(J.y,Q.y)}function bQ(J){return J>0?1:J<0?-1:0}function mN(J,$){let Q=J;do{if(Q.i!==J.i&&Q.next.i!==J.i&&Q.i!==$.i&&Q.next.i!==$.i&&OY(Q,Q.next,J,$))return!0;Q=Q.next}while(Q!==J);return!1}function D$(J,$){return H7(J.prev,J,J.next)<0?H7(J,$,J.next)>=0&&H7(J,J.prev,$)>=0:H7(J,$,J.prev)<0||H7(J,J.next,$)<0}function dN(J,$){let Q=J,Z=!1,K=(J.x+$.x)/2,U=(J.y+$.y)/2;do{if(Q.y>U!==Q.next.y>U&&Q.next.y!==Q.y&&K<(Q.next.x-Q.x)*(U-Q.y)/(Q.next.y-Q.y)+Q.x)Z=!Z;Q=Q.next}while(Q!==J);return Z}function RY(J,$){let Q=DK(J.i,J.x,J.y),Z=DK($.i,$.x,$.y),K=J.next,U=$.prev;return J.next=$,$.prev=J,Q.next=K,K.prev=Q,Z.next=Q,Q.prev=Z,U.next=Z,Z.prev=U,Z}function ZW(J,$,Q,Z){let K=DK(J,$,Q);if(!Z)K.prev=K,K.next=K;else K.next=Z.next,K.prev=Z,Z.next.prev=K,Z.next=K;return K}function E$(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ}function DK(J,$,Q){return{i:J,x:$,y:Q,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function lN(J,$,Q,Z){let K=0;for(let U=$,H=Q-Z;U<Q;U+=Z)K+=(J[H]-J[U])*(J[U+1]+J[H+1]),H=U;return K}class MY{static triangulate(J,$,Q=2){return wN(J,$,Q)}}class T8{static area(J){let $=J.length,Q=0;for(let Z=$-1,K=0;K<$;Z=K++)Q+=J[Z].x*J[K].y-J[K].x*J[Z].y;return Q*0.5}static isClockWise(J){return T8.area(J)<0}static triangulateShape(J,$){let Q=[],Z=[],K=[];KW(J),UW(Q,J);let U=J.length;$.forEach(KW);for(let W=0;W<$.length;W++)Z.push(U),U+=$[W].length,UW(Q,$[W]);let H=MY.triangulate(Q,Z);for(let W=0;W<H.length;W+=3)K.push(H.slice(W,W+3));return K}}function KW(J){let $=J.length;if($>2&&J[$-1].equals(J[0]))J.pop()}function UW(J,$){for(let Q=0;Q<$.length;Q++)J.push($[Q].x),J.push($[Q].y)}class j8 extends O9{constructor(J=new Q8([new G0(0.5,0.5),new G0(-0.5,0.5),new G0(-0.5,-0.5),new G0(0.5,-0.5)]),$={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:J,options:$},J=Array.isArray(J)?J:[J];let Q=this,Z=[],K=[];for(let H=0,W=J.length;H<W;H++){let Y=J[H];U(Y)}this.setAttribute("position",new Q9(Z,3)),this.setAttribute("uv",new Q9(K,2)),this.computeVertexNormals();function U(H){let W=[],Y=$.curveSegments!==void 0?$.curveSegments:12,N=$.steps!==void 0?$.steps:1,X=$.depth!==void 0?$.depth:1,q=$.bevelEnabled!==void 0?$.bevelEnabled:!0,G=$.bevelThickness!==void 0?$.bevelThickness:0.2,F=$.bevelSize!==void 0?$.bevelSize:G-0.1,O=$.bevelOffset!==void 0?$.bevelOffset:0,V=$.bevelSegments!==void 0?$.bevelSegments:3,D=$.extrudePath,E=$.UVGenerator!==void 0?$.UVGenerator:cN,C,L=!1,R,_,B,A;if(D){C=D.getSpacedPoints(N),L=!0,q=!1;let $0=D.isCatmullRomCurve3?D.closed:!1;R=D.computeFrenetFrames(N,$0),_=new k,B=new k,A=new k}if(!q)V=0,G=0,F=0,O=0;let M=H.extractPoints(Y),I=M.shape,y=M.holes;if(!T8.isClockWise(I)){I=I.reverse();for(let $0=0,D0=y.length;$0<D0;$0++){let V0=y[$0];if(T8.isClockWise(V0))y[$0]=V0.reverse()}}function f($0){let B0=$0[0];for(let P0=1;P0<=$0.length;P0++){let o0=P0%$0.length,t0=$0[o0],q9=t0.x-B0.x,F9=t0.y-B0.y,b=q9*q9+F9*F9,n9=Math.max(Math.abs(t0.x),Math.abs(t0.y),Math.abs(B0.x),Math.abs(B0.y)),V9=0.000000000000000000010000000000000001*n9*n9;if(b<=V9){$0.splice(o0,1),P0--;continue}B0=t0}}f(I),y.forEach(f);let t=y.length,v=I;for(let $0=0;$0<t;$0++){let D0=y[$0];I=I.concat(D0)}function l($0,D0,V0){if(!D0)U9("ExtrudeGeometry: vec does not exist");return $0.clone().addScaledVector(D0,V0)}let Q0=I.length;function s($0,D0,V0){let B0,P0,o0,t0=$0.x-D0.x,q9=$0.y-D0.y,F9=V0.x-$0.x,b=V0.y-$0.y,n9=t0*t0+q9*q9,V9=t0*b-q9*F9;if(Math.abs(V9)>Number.EPSILON){let C9=Math.sqrt(n9),T=Math.sqrt(F9*F9+b*b),z=D0.x-q9/C9,g=D0.y+t0/C9,e=V0.x-b/T,R0=V0.y+F9/T,I0=((e-z)*b-(R0-g)*F9)/(t0*b-q9*F9);B0=z+t0*I0-$0.x,P0=g+q9*I0-$0.y;let w0=B0*B0+P0*P0;if(w0<=2)return new G0(B0,P0);else o0=Math.sqrt(w0/2)}else{let C9=!1;if(t0>Number.EPSILON){if(F9>Number.EPSILON)C9=!0}else if(t0<-Number.EPSILON){if(F9<-Number.EPSILON)C9=!0}else if(Math.sign(q9)===Math.sign(b))C9=!0;if(C9)B0=-q9,P0=t0,o0=Math.sqrt(n9);else B0=t0,P0=q9,o0=Math.sqrt(n9/2)}return new G0(B0/o0,P0/o0)}let a=[];for(let $0=0,D0=v.length,V0=D0-1,B0=$0+1;$0<D0;$0++,V0++,B0++){if(V0===D0)V0=0;if(B0===D0)B0=0;a[$0]=s(v[$0],v[V0],v[B0])}let u=[],x,Z0=a.concat();for(let $0=0,D0=t;$0<D0;$0++){let V0=y[$0];x=[];for(let B0=0,P0=V0.length,o0=P0-1,t0=B0+1;B0<P0;B0++,o0++,t0++){if(o0===P0)o0=0;if(t0===P0)t0=0;x[B0]=s(V0[B0],V0[o0],V0[t0])}u.push(x),Z0=Z0.concat(x)}let O0;if(V===0)O0=T8.triangulateShape(v,y);else{let $0=[],D0=[];for(let V0=0;V0<V;V0++){let B0=V0/V,P0=G*Math.cos(B0*Math.PI/2),o0=F*Math.sin(B0*Math.PI/2)+O;for(let t0=0,q9=v.length;t0<q9;t0++){let F9=l(v[t0],a[t0],o0);if(H0(F9.x,F9.y,-P0),B0===0)$0.push(F9)}for(let t0=0,q9=t;t0<q9;t0++){let F9=y[t0];x=u[t0];let b=[];for(let n9=0,V9=F9.length;n9<V9;n9++){let C9=l(F9[n9],x[n9],o0);if(H0(C9.x,C9.y,-P0),B0===0)b.push(C9)}if(B0===0)D0.push(b)}}O0=T8.triangulateShape($0,D0)}let z0=O0.length,d=F+O;for(let $0=0;$0<Q0;$0++){let D0=q?l(I[$0],Z0[$0],d):I[$0];if(!L)H0(D0.x,D0.y,0);else B.copy(R.normals[0]).multiplyScalar(D0.x),_.copy(R.binormals[0]).multiplyScalar(D0.y),A.copy(C[0]).add(B).add(_),H0(A.x,A.y,A.z)}for(let $0=1;$0<=N;$0++)for(let D0=0;D0<Q0;D0++){let V0=q?l(I[D0],Z0[D0],d):I[D0];if(!L)H0(V0.x,V0.y,X/N*$0);else B.copy(R.normals[$0]).multiplyScalar(V0.x),_.copy(R.binormals[$0]).multiplyScalar(V0.y),A.copy(C[$0]).add(B).add(_),H0(A.x,A.y,A.z)}for(let $0=V-1;$0>=0;$0--){let D0=$0/V,V0=G*Math.cos(D0*Math.PI/2),B0=F*Math.sin(D0*Math.PI/2)+O;for(let P0=0,o0=v.length;P0<o0;P0++){let t0=l(v[P0],a[P0],B0);H0(t0.x,t0.y,X+V0)}for(let P0=0,o0=y.length;P0<o0;P0++){let t0=y[P0];x=u[P0];for(let q9=0,F9=t0.length;q9<F9;q9++){let b=l(t0[q9],x[q9],B0);if(!L)H0(b.x,b.y,X+V0);else H0(b.x,b.y+C[N-1].y,C[N-1].x+V0)}}}X0(),n();function X0(){let $0=Z.length/3;if(q){let D0=0,V0=Q0*D0;for(let B0=0;B0<z0;B0++){let P0=O0[B0];c(P0[2]+V0,P0[1]+V0,P0[0]+V0)}D0=N+V*2,V0=Q0*D0;for(let B0=0;B0<z0;B0++){let P0=O0[B0];c(P0[0]+V0,P0[1]+V0,P0[2]+V0)}}else{for(let D0=0;D0<z0;D0++){let V0=O0[D0];c(V0[2],V0[1],V0[0])}for(let D0=0;D0<z0;D0++){let V0=O0[D0];c(V0[0]+Q0*N,V0[1]+Q0*N,V0[2]+Q0*N)}}Q.addGroup($0,Z.length/3-$0,0)}function n(){let $0=Z.length/3,D0=0;Y0(v,D0),D0+=v.length;for(let V0=0,B0=y.length;V0<B0;V0++){let P0=y[V0];Y0(P0,D0),D0+=P0.length}Q.addGroup($0,Z.length/3-$0,1)}function Y0($0,D0){let V0=$0.length;while(--V0>=0){let B0=V0,P0=V0-1;if(P0<0)P0=$0.length-1;for(let o0=0,t0=N+V*2;o0<t0;o0++){let q9=Q0*o0,F9=Q0*(o0+1),b=D0+B0+q9,n9=D0+P0+q9,V9=D0+P0+F9,C9=D0+B0+F9;A0(b,n9,V9,C9)}}}function H0($0,D0,V0){W.push($0),W.push(D0),W.push(V0)}function c($0,D0,V0){r($0),r(D0),r(V0);let B0=Z.length/3,P0=E.generateTopUV(Q,Z,B0-3,B0-2,B0-1);p0(P0[0]),p0(P0[1]),p0(P0[2])}function A0($0,D0,V0,B0){r($0),r(D0),r(B0),r(D0),r(V0),r(B0);let P0=Z.length/3,o0=E.generateSideWallUV(Q,Z,P0-6,P0-3,P0-2,P0-1);p0(o0[0]),p0(o0[1]),p0(o0[3]),p0(o0[1]),p0(o0[2]),p0(o0[3])}function r($0){Z.push(W[$0*3+0]),Z.push(W[$0*3+1]),Z.push(W[$0*3+2])}function p0($0){K.push($0.x),K.push($0.y)}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),$=this.parameters.shapes,Q=this.parameters.options;return nN($,Q,J)}static fromJSON(J,$){let Q=[];for(let K=0,U=J.shapes.length;K<U;K++){let H=$[J.shapes[K]];Q.push(H)}let Z=J.options.extrudePath;if(Z!==void 0)J.options.extrudePath=new dQ[Z.type]().fromJSON(Z);return new j8(Q,J.options)}}var cN={generateTopUV:function(J,$,Q,Z,K){let U=$[Q*3],H=$[Q*3+1],W=$[Z*3],Y=$[Z*3+1],N=$[K*3],X=$[K*3+1];return[new G0(U,H),new G0(W,Y),new G0(N,X)]},generateSideWallUV:function(J,$,Q,Z,K,U){let H=$[Q*3],W=$[Q*3+1],Y=$[Q*3+2],N=$[Z*3],X=$[Z*3+1],q=$[Z*3+2],G=$[K*3],F=$[K*3+1],O=$[K*3+2],V=$[U*3],D=$[U*3+1],E=$[U*3+2];if(Math.abs(W-X)<Math.abs(H-N))return[new G0(H,1-Y),new G0(N,1-q),new G0(G,1-O),new G0(V,1-E)];else return[new G0(W,1-Y),new G0(X,1-q),new G0(F,1-O),new G0(D,1-E)]}};function nN(J,$,Q){if(Q.shapes=[],Array.isArray(J))for(let Z=0,K=J.length;Z<K;Z++){let U=J[Z];Q.shapes.push(U.uuid)}else Q.shapes.push(J.uuid);if(Q.options=Object.assign({},$),$.extrudePath!==void 0)Q.options.extrudePath=$.extrudePath.toJSON();return Q}class v$ extends NZ{constructor(J=1,$=0){let Q=(1+Math.sqrt(5))/2,Z=[-1,Q,0,1,Q,0,-1,-Q,0,1,-Q,0,0,-1,Q,0,1,Q,0,-1,-Q,0,1,-Q,Q,0,-1,Q,0,1,-Q,0,-1,-Q,0,1],K=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(Z,K,J,$);this.type="IcosahedronGeometry",this.parameters={radius:J,detail:$}}static fromJSON(J){return new v$(J.radius,J.detail)}}class G9 extends O9{constructor(J=1,$=1,Q=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:$,widthSegments:Q,heightSegments:Z};let K=J/2,U=$/2,H=Math.floor(Q),W=Math.floor(Z),Y=H+1,N=W+1,X=J/H,q=$/W,G=[],F=[],O=[],V=[];for(let D=0;D<N;D++){let E=D*q-U;for(let C=0;C<Y;C++){let L=C*X-K;F.push(L,-E,0),O.push(0,0,1),V.push(C/H),V.push(1-D/W)}}for(let D=0;D<W;D++)for(let E=0;E<H;E++){let C=E+Y*D,L=E+Y*(D+1),R=E+1+Y*(D+1),_=E+1+Y*D;G.push(C,L,_),G.push(L,R,_)}this.setIndex(G),this.setAttribute("position",new Q9(F,3)),this.setAttribute("normal",new Q9(O,3)),this.setAttribute("uv",new Q9(V,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new G9(J.width,J.height,J.widthSegments,J.heightSegments)}}class mJ extends O9{constructor(J=0.5,$=1,Q=32,Z=1,K=0,U=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:J,outerRadius:$,thetaSegments:Q,phiSegments:Z,thetaStart:K,thetaLength:U},Q=Math.max(3,Q),Z=Math.max(1,Z);let H=[],W=[],Y=[],N=[],X=J,q=($-J)/Z,G=new k,F=new G0;for(let O=0;O<=Z;O++){for(let V=0;V<=Q;V++){let D=K+V/Q*U;G.x=X*Math.cos(D),G.y=X*Math.sin(D),W.push(G.x,G.y,G.z),Y.push(0,0,1),F.x=(G.x/$+1)/2,F.y=(G.y/$+1)/2,N.push(F.x,F.y)}X+=q}for(let O=0;O<Z;O++){let V=O*(Q+1);for(let D=0;D<Q;D++){let E=D+V,C=E,L=E+Q+1,R=E+Q+2,_=E+1;H.push(C,L,_),H.push(L,R,_)}}this.setIndex(H),this.setAttribute("position",new Q9(W,3)),this.setAttribute("normal",new Q9(Y,3)),this.setAttribute("uv",new Q9(N,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new mJ(J.innerRadius,J.outerRadius,J.thetaSegments,J.phiSegments,J.thetaStart,J.thetaLength)}}class y$ extends O9{constructor(J=new Q8([new G0(0,0.5),new G0(-0.5,-0.5),new G0(0.5,-0.5)]),$=12){super();this.type="ShapeGeometry",this.parameters={shapes:J,curveSegments:$};let Q=[],Z=[],K=[],U=[],H=0,W=0;if(Array.isArray(J)===!1)Y(J);else for(let N=0;N<J.length;N++)Y(J[N]),this.addGroup(H,W,N),H+=W,W=0;this.setIndex(Q),this.setAttribute("position",new Q9(Z,3)),this.setAttribute("normal",new Q9(K,3)),this.setAttribute("uv",new Q9(U,2));function Y(N){let X=Z.length/3,q=N.extractPoints($),G=q.shape,F=q.holes;if(T8.isClockWise(G)===!1)G=G.reverse();for(let V=0,D=F.length;V<D;V++){let E=F[V];if(T8.isClockWise(E)===!0)F[V]=E.reverse()}let O=T8.triangulateShape(G,F);for(let V=0,D=F.length;V<D;V++){let E=F[V];G=G.concat(E)}for(let V=0,D=G.length;V<D;V++){let E=G[V];Z.push(E.x,E.y,0),K.push(0,0,1),U.push(E.x,E.y)}for(let V=0,D=O.length;V<D;V++){let E=O[V],C=E[0]+X,L=E[1]+X,R=E[2]+X;Q.push(C,L,R),W+=3}}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON(),$=this.parameters.shapes;return sN($,J)}static fromJSON(J,$){let Q=[];for(let Z=0,K=J.shapes.length;Z<K;Z++){let U=$[J.shapes[Z]];Q.push(U)}return new y$(Q,J.curveSegments)}}function sN(J,$){if($.shapes=[],Array.isArray(J))for(let Q=0,Z=J.length;Q<Z;Q++){let K=J[Q];$.shapes.push(K.uuid)}else $.shapes.push(J.uuid);return $}class l0 extends O9{constructor(J=1,$=32,Q=16,Z=0,K=Math.PI*2,U=0,H=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:J,widthSegments:$,heightSegments:Q,phiStart:Z,phiLength:K,thetaStart:U,thetaLength:H},$=Math.max(3,Math.floor($)),Q=Math.max(2,Math.floor(Q));let W=Math.min(U+H,Math.PI),Y=0,N=[],X=new k,q=new k,G=[],F=[],O=[],V=[];for(let D=0;D<=Q;D++){let E=[],C=D/Q,L=U+C*H,R=J*Math.cos(L),_=Math.sqrt(J*J-R*R),B=0;if(D===0&&U===0)B=0.5/$;else if(D===Q&&W===Math.PI)B=-0.5/$;for(let A=0;A<=$;A++){let M=A/$,I=Z+M*K;X.x=-_*Math.cos(I),X.y=R,X.z=_*Math.sin(I),F.push(X.x,X.y,X.z),q.copy(X).normalize(),O.push(q.x,q.y,q.z),V.push(M+B,1-C),E.push(Y++)}N.push(E)}for(let D=0;D<Q;D++)for(let E=0;E<$;E++){let C=N[D][E+1],L=N[D][E],R=N[D+1][E],_=N[D+1][E+1];if(D!==0||U>0)G.push(C,L,_);if(D!==Q-1||W<Math.PI)G.push(L,R,_)}this.setIndex(G),this.setAttribute("position",new Q9(F,3)),this.setAttribute("normal",new Q9(O,3)),this.setAttribute("uv",new Q9(V,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new l0(J.radius,J.widthSegments,J.heightSegments,J.phiStart,J.phiLength,J.thetaStart,J.thetaLength)}}class M7 extends O9{constructor(J=1,$=0.4,Q=12,Z=48,K=Math.PI*2,U=0,H=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:J,tube:$,radialSegments:Q,tubularSegments:Z,arc:K,thetaStart:U,thetaLength:H},Q=Math.floor(Q),Z=Math.floor(Z);let W=[],Y=[],N=[],X=[],q=new k,G=new k,F=new k;for(let O=0;O<=Q;O++){let V=U+O/Q*H;for(let D=0;D<=Z;D++){let E=D/Z*K;G.x=(J+$*Math.cos(V))*Math.cos(E),G.y=(J+$*Math.cos(V))*Math.sin(E),G.z=$*Math.sin(V),Y.push(G.x,G.y,G.z),q.x=J*Math.cos(E),q.y=J*Math.sin(E),F.subVectors(G,q).normalize(),N.push(F.x,F.y,F.z),X.push(D/Z),X.push(O/Q)}}for(let O=1;O<=Q;O++)for(let V=1;V<=Z;V++){let D=(Z+1)*O+V-1,E=(Z+1)*(O-1)+V-1,C=(Z+1)*(O-1)+V,L=(Z+1)*O+V;W.push(D,E,L),W.push(E,C,L)}this.setIndex(W),this.setAttribute("position",new Q9(Y,3)),this.setAttribute("normal",new Q9(N,3)),this.setAttribute("uv",new Q9(X,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new M7(J.radius,J.tube,J.radialSegments,J.tubularSegments,J.arc,J.thetaStart,J.thetaLength)}}class R8 extends O9{constructor(J=new FZ(new k(-1,-1,0),new k(-1,1,0),new k(1,1,0)),$=64,Q=1,Z=8,K=!1){super();this.type="TubeGeometry",this.parameters={path:J,tubularSegments:$,radius:Q,radialSegments:Z,closed:K};let U=J.computeFrenetFrames($,K);this.tangents=U.tangents,this.normals=U.normals,this.binormals=U.binormals;let H=new k,W=new k,Y=new G0,N=new k,X=[],q=[],G=[],F=[];O(),this.setIndex(F),this.setAttribute("position",new Q9(X,3)),this.setAttribute("normal",new Q9(q,3)),this.setAttribute("uv",new Q9(G,2));function O(){for(let C=0;C<$;C++)V(C);V(K===!1?$:0),E(),D()}function V(C){N=J.getPointAt(C/$,N);let L=U.normals[C],R=U.binormals[C];for(let _=0;_<=Z;_++){let B=_/Z*Math.PI*2,A=Math.sin(B),M=-Math.cos(B);W.x=M*L.x+A*R.x,W.y=M*L.y+A*R.y,W.z=M*L.z+A*R.z,W.normalize(),q.push(W.x,W.y,W.z),H.x=N.x+Q*W.x,H.y=N.y+Q*W.y,H.z=N.z+Q*W.z,X.push(H.x,H.y,H.z)}}function D(){for(let C=1;C<=$;C++)for(let L=1;L<=Z;L++){let R=(Z+1)*(C-1)+(L-1),_=(Z+1)*C+(L-1),B=(Z+1)*C+L,A=(Z+1)*(C-1)+L;F.push(R,_,A),F.push(_,B,A)}}function E(){for(let C=0;C<=$;C++)for(let L=0;L<=Z;L++)Y.x=C/$,Y.y=L/Z,G.push(Y.x,Y.y)}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}toJSON(){let J=super.toJSON();return J.path=this.parameters.path.toJSON(),J}static fromJSON(J){return new R8(new dQ[J.path.type]().fromJSON(J.path),J.tubularSegments,J.radius,J.radialSegments,J.closed)}}class f$ extends O9{constructor(J=null){super();if(this.type="WireframeGeometry",this.parameters={geometry:J},J!==null){let $=[],Q=new Set,Z=new k,K=new k;if(J.index!==null){let U=J.attributes.position,H=J.index,W=J.groups;if(W.length===0)W=[{start:0,count:H.count,materialIndex:0}];for(let Y=0,N=W.length;Y<N;++Y){let X=W[Y],q=X.start,G=X.count;for(let F=q,O=q+G;F<O;F+=3)for(let V=0;V<3;V++){let D=H.getX(F+V),E=H.getX(F+(V+1)%3);if(Z.fromBufferAttribute(U,D),K.fromBufferAttribute(U,E),HW(Z,K,Q)===!0)$.push(Z.x,Z.y,Z.z),$.push(K.x,K.y,K.z)}}}else{let U=J.attributes.position;for(let H=0,W=U.count/3;H<W;H++)for(let Y=0;Y<3;Y++){let N=3*H+Y,X=3*H+(Y+1)%3;if(Z.fromBufferAttribute(U,N),K.fromBufferAttribute(U,X),HW(Z,K,Q)===!0)$.push(Z.x,Z.y,Z.z),$.push(K.x,K.y,K.z)}}this.setAttribute("position",new Q9($,3))}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}}function HW(J,$,Q){let Z=`${J.x},${J.y},${J.z}-${$.x},${$.y},${$.z}`,K=`${$.x},${$.y},${$.z}-${J.x},${J.y},${J.z}`;if(Q.has(Z)===!0||Q.has(K)===!0)return!1;else return Q.add(Z),Q.add(K),!0}function dJ(J){let $={};for(let Q in J){$[Q]={};for(let Z in J[Q]){let K=J[Q][Z];if(WW(K))if(K.isRenderTargetTexture)$9("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),$[Q][Z]=null;else $[Q][Z]=K.clone();else if(Array.isArray(K))if(WW(K[0])){let U=[];for(let H=0,W=K.length;H<W;H++)U[H]=K[H].clone();$[Q][Z]=U}else $[Q][Z]=K.slice();else $[Q][Z]=K}}return $}function k7(J){let $={};for(let Q=0;Q<J.length;Q++){let Z=dJ(J[Q]);for(let K in Z)$[K]=Z[K]}return $}function WW(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function iN(J){let $=[];for(let Q=0;Q<J.length;Q++)$.push(J[Q].clone());return $}function RU(J){let $=J.getRenderTarget();if($===null)return J.outputColorSpace;if($.isXRRenderTarget===!0)return $.texture.colorSpace;return _9.workingColorSpace}var M8={clone:dJ,merge:k7},oN=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,aN=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class h9 extends E8{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=oN,this.fragmentShader=aN,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=dJ(J.uniforms),this.uniformsGroups=iN(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let $=super.toJSON(J);$.glslVersion=this.glslVersion,$.uniforms={};for(let Z in this.uniforms){let U=this.uniforms[Z].value;if(U&&U.isTexture)$.uniforms[Z]={type:"t",value:U.toJSON(J).uuid};else if(U&&U.isColor)$.uniforms[Z]={type:"c",value:U.getHex()};else if(U&&U.isVector2)$.uniforms[Z]={type:"v2",value:U.toArray()};else if(U&&U.isVector3)$.uniforms[Z]={type:"v3",value:U.toArray()};else if(U&&U.isVector4)$.uniforms[Z]={type:"v4",value:U.toArray()};else if(U&&U.isMatrix3)$.uniforms[Z]={type:"m3",value:U.toArray()};else if(U&&U.isMatrix4)$.uniforms[Z]={type:"m4",value:U.toArray()};else $.uniforms[Z]={value:U}}if(Object.keys(this.defines).length>0)$.defines=this.defines;$.vertexShader=this.vertexShader,$.fragmentShader=this.fragmentShader,$.lights=this.lights,$.clipping=this.clipping;let Q={};for(let Z in this.extensions)if(this.extensions[Z]===!0)Q[Z]=!0;if(Object.keys(Q).length>0)$.extensions=Q;return $}fromJSON(J,$){if(super.fromJSON(J,$),J.uniforms!==void 0)for(let Q in J.uniforms){let Z=J.uniforms[Q];switch(this.uniforms[Q]={},Z.type){case"t":this.uniforms[Q].value=$[Z.value]||null;break;case"c":this.uniforms[Q].value=new F0().setHex(Z.value);break;case"v2":this.uniforms[Q].value=new G0().fromArray(Z.value);break;case"v3":this.uniforms[Q].value=new k().fromArray(Z.value);break;case"v4":this.uniforms[Q].value=new K7().fromArray(Z.value);break;case"m3":this.uniforms[Q].value=new X9().fromArray(Z.value);break;case"m4":this.uniforms[Q].value=new v9().fromArray(Z.value);break;default:this.uniforms[Q].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let Q in J.extensions)this.extensions[Q]=J.extensions[Q];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class b$ extends h9{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class W9 extends E8{constructor(J){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new F0(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new F0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new i8,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.defines={STANDARD:""},this.color.copy(J.color),this.roughness=J.roughness,this.metalness=J.metalness,this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.roughnessMap=J.roughnessMap,this.metalnessMap=J.metalnessMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.envMapIntensity=J.envMapIntensity,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.flatShading=J.flatShading,this.fog=J.fog,this}}class e8 extends W9{constructor(J){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new G0(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return B9(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function($){this.ior=(1+0.4*$)/(1-0.4*$)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new F0(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new F0(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new F0(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(J)}get anisotropy(){return this._anisotropy}set anisotropy(J){if(this._anisotropy>0!==J>0)this.version++;this._anisotropy=J}get clearcoat(){return this._clearcoat}set clearcoat(J){if(this._clearcoat>0!==J>0)this.version++;this._clearcoat=J}get iridescence(){return this._iridescence}set iridescence(J){if(this._iridescence>0!==J>0)this.version++;this._iridescence=J}get dispersion(){return this._dispersion}set dispersion(J){if(this._dispersion>0!==J>0)this.version++;this._dispersion=J}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(J){if(this._retroreflectivity>0!==J>0)this.version++;this._retroreflectivity=J}get sheen(){return this._sheen}set sheen(J){if(this._sheen>0!==J>0)this.version++;this._sheen=J}get transmission(){return this._transmission}set transmission(J){if(this._transmission>0!==J>0)this.version++;this._transmission=J}copy(J){return super.copy(J),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=J.anisotropy,this.anisotropyRotation=J.anisotropyRotation,this.anisotropyMap=J.anisotropyMap,this.clearcoat=J.clearcoat,this.clearcoatMap=J.clearcoatMap,this.clearcoatRoughness=J.clearcoatRoughness,this.clearcoatRoughnessMap=J.clearcoatRoughnessMap,this.clearcoatNormalMap=J.clearcoatNormalMap,this.clearcoatNormalScale.copy(J.clearcoatNormalScale),this.dispersion=J.dispersion,this.ior=J.ior,this.iridescence=J.iridescence,this.iridescenceMap=J.iridescenceMap,this.iridescenceIOR=J.iridescenceIOR,this.iridescenceThicknessRange=[...J.iridescenceThicknessRange],this.iridescenceThicknessMap=J.iridescenceThicknessMap,this.retroreflectivity=J.retroreflectivity,this.sheen=J.sheen,this.sheenColor.copy(J.sheenColor),this.sheenColorMap=J.sheenColorMap,this.sheenRoughness=J.sheenRoughness,this.sheenRoughnessMap=J.sheenRoughnessMap,this.transmission=J.transmission,this.transmissionMap=J.transmissionMap,this.thickness=J.thickness,this.thicknessMap=J.thicknessMap,this.attenuationDistance=J.attenuationDistance,this.attenuationColor.copy(J.attenuationColor),this.specularIntensity=J.specularIntensity,this.specularIntensityMap=J.specularIntensityMap,this.specularColor.copy(J.specularColor),this.specularColorMap=J.specularColorMap,this}}class CJ extends E8{constructor(J){super();this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new F0(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new F0(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G0(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.gradientMap=J.gradientMap,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.emissive.copy(J.emissive),this.emissiveMap=J.emissiveMap,this.emissiveIntensity=J.emissiveIntensity,this.bumpMap=J.bumpMap,this.bumpScale=J.bumpScale,this.normalMap=J.normalMap,this.normalMapType=J.normalMapType,this.normalScale.copy(J.normalScale),this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.alphaMap=J.alphaMap,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}class x$ extends E8{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class MU extends E8{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}class EZ extends pJ{constructor(J){super();this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(J)}copy(J){return super.copy(J),this.scale=J.scale,this.dashSize=J.dashSize,this.gapSize=J.gapSize,this}}function I6(J,$){if(!J||J.constructor===$)return J;if(typeof $.BYTES_PER_ELEMENT==="number")return new $(J);return Array.prototype.slice.call(J)}function XK(J){return J!==void 0&&J.inTangents!==void 0&&J.outTangents!==void 0}class lJ{constructor(J,$,Q,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new $.constructor(Q),this.sampleValues=$,this.valueSize=Q,this.settings=null,this.DefaultSettings_={}}evaluate(J){let $=this.parameterPositions,Q=this._cachedIndex,Z=$[Q],K=$[Q-1];Q:{J:{let U;$:{Z:if(!(J<Z)){for(let H=Q+2;;){if(Z===void 0){if(J<K)break Z;return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}if(Q===H)break;if(K=Z,Z=$[++Q],J<Z)break J}U=$.length;break $}if(!(J>=K)){let H=$[1];if(J<H)Q=2,K=H;for(let W=Q-2;;){if(K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===W)break;if(Z=K,K=$[--Q-1],J>=K)break J}U=Q,Q=0;break $}break Q}while(Q<U){let H=Q+U>>>1;if(J<$[H])U=H;else Q=H+1}if(Z=$[Q],K=$[Q-1],K===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}this._cachedIndex=Q,this.intervalChanged_(Q,K,Z)}return this.interpolate_(Q,K,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let $=this.resultBuffer,Q=this.sampleValues,Z=this.valueSize,K=J*Z;for(let U=0;U!==Z;++U)$[U]=Q[K+U];return $}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class VU extends lJ{constructor(J,$,Q,Z){super(J,$,Q,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,$,Q){let Z=this.parameterPositions,K=J-2,U=J+1,H=Z[K],W=Z[U];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:K=J,H=2*$-Q;break;case 2402:K=Z.length-2,H=$+Z[K]-Z[K+1];break;default:K=J,H=Q}if(W===void 0)switch(this.getSettings_().endingEnd){case 2401:U=J,W=2*Q-$;break;case 2402:U=1,W=Q+Z[1]-Z[0];break;default:U=J-1,W=$}let Y=(Q-$)*0.5,N=this.valueSize;this._weightPrev=Y/($-H),this._weightNext=Y/(W-Q),this._offsetPrev=K*N,this._offsetNext=U*N}interpolate_(J,$,Q,Z){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,W=J*H,Y=W-H,N=this._offsetPrev,X=this._offsetNext,q=this._weightPrev,G=this._weightNext,F=(Q-$)/(Z-$),O=F*F,V=O*F,D=-q*V+2*q*O-q*F,E=(1+q)*V+(-1.5-2*q)*O+(-0.5+q)*F+1,C=(-1-G)*V+(1.5+G)*O+0.5*F,L=G*V-G*O;for(let R=0;R!==H;++R)K[R]=D*U[N+R]+E*U[Y+R]+C*U[W+R]+L*U[X+R];return K}}class _U extends lJ{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J,$,Q,Z){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,W=J*H,Y=W-H,N=(Q-$)/(Z-$),X=1-N;for(let q=0;q!==H;++q)K[q]=U[Y+q]*X+U[W+q]*N;return K}}class BU extends lJ{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class IU extends lJ{interpolate_(J,$,Q,Z){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,W=J*H,Y=W-H,N=this.inTangents,X=this.outTangents;if(!N||!X){let F=(Q-$)/(Z-$),O=1-F;for(let V=0;V!==H;++V)K[V]=U[Y+V]*O+U[W+V]*F;return K}let q=H*2,G=J-1;for(let F=0;F!==H;++F){let O=U[Y+F],V=U[W+F],D=G*q+F*2,E=X[D],C=X[D+1],L=J*q+F*2,R=N[L],_=N[L+1],B=tN(Q,$,E,R,Z);K[F]=VY(B,O,C,_,V)}return K}}function VY(J,$,Q,Z,K){let U=1-J;return U*U*U*$+3*U*U*J*Q+3*U*J*J*Z+J*J*J*K}function rN(J,$,Q,Z,K){let U=1-J;return 3*U*U*(Q-$)+6*U*J*(Z-Q)+3*J*J*(K-Z)}function tN(J,$,Q,Z,K){let U=(J-$)/(K-$);for(let H=0;H<8;H++){let W=VY(U,$,Q,Z,K)-J;if(Math.abs(W)<0.0000000001)break;let Y=rN(U,$,Q,Z,K);if(Math.abs(Y)<0.0000000001)break;U=Math.max(0,Math.min(1,U-W/Y))}return U}class Z8{constructor(J,$,Q,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if($===void 0||$.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=I6($,this.TimeBufferType),this.values=I6(Q,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let $=J.constructor,Q;if($.toJSON!==this.toJSON)Q=$.toJSON(J);else{Q={name:J.name,times:I6(J.times,Array),values:I6(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)Q.interpolation=Z;if(XK(J.settings))Q.settings={inTangents:I6(J.settings.inTangents,Array),outTangents:I6(J.settings.outTangents,Array)}}return Q.type=J.ValueTypeName,Q}InterpolantFactoryMethodDiscrete(J){return new BU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new _U(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new VU(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let $=new IU(this.times,this.values,this.getValueSize(),J);if(this.settings)$.inTangents=this.settings.inTangents,$.outTangents=this.settings.outTangents;return $}setInterpolation(J){let $;switch(J){case 2300:$=this.InterpolantFactoryMethodDiscrete;break;case 2301:$=this.InterpolantFactoryMethodLinear;break;case 2302:$=this.InterpolantFactoryMethodSmooth;break;case 2303:$=this.InterpolantFactoryMethodBezier;break}if($===void 0){let Q="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Q);return $9("KeyframeTrack:",Q),this}return this.createInterpolant=$,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let $=this.times;for(let Q=0,Z=$.length;Q!==Z;++Q)$[Q]+=J}return this}scale(J){if(J!==1){let $=this.times;for(let Q=0,Z=$.length;Q!==Z;++Q)$[Q]*=J;if(XK(this.settings))YW(this.settings.inTangents,J),YW(this.settings.outTangents,J)}return this}trim(J,$){let Q=this.times,Z=Q.length,K=0,U=Z-1;while(K!==Z&&Q[K]<J)++K;while(U!==-1&&Q[U]>$)--U;if(++U,K!==0||U!==Z){if(K>=U)U=Math.max(U,1),K=U-1;let H=this.getValueSize();this.times=Q.slice(K,U),this.values=this.values.slice(K*H,U*H)}return this}validate(){let J=!0,$=this.getValueSize();if($-Math.floor($)!==0)U9("KeyframeTrack: Invalid value size in track.",this),J=!1;let Q=this.times,Z=this.values,K=Q.length;if(K===0)U9("KeyframeTrack: Track is empty.",this),J=!1;let U=null;for(let H=0;H!==K;H++){let W=Q[H];if(typeof W==="number"&&isNaN(W)){U9("KeyframeTrack: Time is not a valid number.",this,H,W),J=!1;break}if(U!==null&&U>W){U9("KeyframeTrack: Out of order keys.",this,H,W,U),J=!1;break}U=W}if(Z!==void 0){if(JN(Z))for(let H=0,W=Z.length;H!==W;++H){let Y=Z[H];if(isNaN(Y)){U9("KeyframeTrack: Value is not a valid number.",this,H,Y),J=!1;break}}}return J}optimize(){let J=this.times.slice(),$=this.values.slice(),Q=this.getValueSize(),Z=this.getInterpolation()===2302,K=J.length-1,U=1;for(let H=1;H<K;++H){let W=!1,Y=J[H],N=J[H+1];if(Y!==N&&(H!==1||Y!==J[0]))if(!Z){let X=H*Q,q=X-Q,G=X+Q;for(let F=0;F!==Q;++F){let O=$[X+F];if(O!==$[q+F]||O!==$[G+F]){W=!0;break}}}else W=!0;if(W){if(H!==U){J[U]=J[H];let X=H*Q,q=U*Q;for(let G=0;G!==Q;++G)$[q+G]=$[X+G]}++U}}if(K>0){J[U]=J[K];for(let H=K*Q,W=U*Q,Y=0;Y!==Q;++Y)$[W+Y]=$[H+Y];++U}if(U!==J.length)this.times=J.slice(0,U),this.values=$.slice(0,U*Q);else this.times=J,this.values=$;return this}clone(){let J=this.times.slice(),$=this.values.slice(),Z=new this.constructor(this.name,J,$);if(Z.createInterpolant=this.createInterpolant,XK(this.settings))Z.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()};return Z}}function YW(J,$){for(let Q=0,Z=J.length;Q!==Z;Q+=2)J[Q]*=$}Z8.prototype.ValueTypeName="";Z8.prototype.TimeBufferType=Float32Array;Z8.prototype.ValueBufferType=Float32Array;Z8.prototype.DefaultInterpolation=2301;class cJ extends Z8{constructor(J,$,Q){super(J,$,Q)}}cJ.prototype.ValueTypeName="bool";cJ.prototype.ValueBufferType=Array;cJ.prototype.DefaultInterpolation=2300;cJ.prototype.InterpolantFactoryMethodLinear=void 0;cJ.prototype.InterpolantFactoryMethodSmooth=void 0;class CU extends Z8{constructor(J,$,Q,Z){super(J,$,Q,Z)}}CU.prototype.ValueTypeName="color";class AU extends Z8{constructor(J,$,Q,Z){super(J,$,Q,Z)}}AU.prototype.ValueTypeName="number";class zU extends lJ{constructor(J,$,Q,Z){super(J,$,Q,Z)}interpolate_(J,$,Q,Z){let K=this.resultBuffer,U=this.sampleValues,H=this.valueSize,W=(Q-$)/(Z-$),Y=J*H;for(let N=Y+H;Y!==N;Y+=4)F8.slerpFlat(K,0,U,Y-H,U,Y,W);return K}}class OZ extends Z8{constructor(J,$,Q,Z){super(J,$,Q,Z)}InterpolantFactoryMethodLinear(J){return new zU(this.times,this.values,this.getValueSize(),J)}}OZ.prototype.ValueTypeName="quaternion";OZ.prototype.InterpolantFactoryMethodSmooth=void 0;class nJ extends Z8{constructor(J,$,Q){super(J,$,Q)}}nJ.prototype.ValueTypeName="string";nJ.prototype.ValueBufferType=Array;nJ.prototype.DefaultInterpolation=2300;nJ.prototype.InterpolantFactoryMethodLinear=void 0;nJ.prototype.InterpolantFactoryMethodSmooth=void 0;class LU extends Z8{constructor(J,$,Q,Z){super(J,$,Q,Z)}}LU.prototype.ValueTypeName="vector";class PU{constructor(J,$,Q){let Z=this,K=!1,U=0,H=0,W=void 0,Y=[];this.onStart=void 0,this.onLoad=J,this.onProgress=$,this.onError=Q,this._abortController=null,this.itemStart=function(N){if(H++,K===!1){if(Z.onStart!==void 0)Z.onStart(N,U,H)}K=!0},this.itemEnd=function(N){if(U++,Z.onProgress!==void 0)Z.onProgress(N,U,H);if(U===H){if(K=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(N){if(Z.onError!==void 0)Z.onError(N)},this.resolveURL=function(N){if(N=N.normalize("NFC"),W)return W(N);return N},this.setURLModifier=function(N){return W=N,this},this.addHandler=function(N,X){return Y.push(N,X),this},this.removeHandler=function(N){let X=Y.indexOf(N);if(X!==-1)Y.splice(X,2);return this},this.getHandler=function(N){for(let X=0,q=Y.length;X<q;X+=2){let G=Y[X],F=Y[X+1];if(G.global)G.lastIndex=0;if(G.test(N))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var _Y=new PU;class wU{constructor(J){if(this.manager=J!==void 0?J:_Y,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,$){let Q=this;return new Promise(function(Z,K){Q.load(J,Z,$,K)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}wU.DEFAULT_MATERIAL_NAME="__DEFAULT";class h6 extends P9{constructor(J,$=1){super();this.isLight=!0,this.type="Light",this.color=new F0(J),this.intensity=$}copy(J,$){return super.copy(J,$),this.color.copy(J.color),this.intensity=J.intensity,this}toJSON(J){let $=super.toJSON(J);return $.object.color=this.color.getHex(),$.object.intensity=this.intensity,$}}class K8 extends h6{constructor(J,$,Q){super(J,Q);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(P9.DEFAULT_UP),this.updateMatrix(),this.groundColor=new F0($)}copy(J,$){return super.copy(J,$),this.groundColor.copy(J.groundColor),this}toJSON(J){let $=super.toJSON(J);return $.object.groundColor=this.groundColor.getHex(),$}}var GK=new v9,NW=new k,XW=new k;class h${constructor(J){this.camera=J,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G0(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new v9,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new k$,this._frameExtents=new G0(1,1),this._viewportCount=1,this._viewports=[new K7(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(J){let $=this.camera;NW.setFromMatrixPosition(J.matrixWorld),$.position.copy(NW),XW.setFromMatrixPosition(J.target.matrixWorld),$.lookAt(XW),$.updateMatrixWorld(),this._updateMatrix($,this.matrix,this._frustum)}_updateMatrix(J,$,Q,Z){GK.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),Q.setFromProjectionMatrix(GK,J.coordinateSystem,J.reversedDepth);let K=this._frameExtents,U=Z?Z.z/K.x:1,H=Z?Z.w/K.y:1,W=Z?Z.x/K.x:0,Y=Z?Z.y/K.y:0;if(J.coordinateSystem===2001||J.reversedDepth)$.set(0.5*U,0,0,0.5*U+W,0,0.5*H,0,0.5*H+Y,0,0,1,0,0,0,0,1);else $.set(0.5*U,0,0,0.5*U+W,0,0.5*H,0,0.5*H+Y,0,0,0.5,0.5,0,0,0,1);$.multiply(GK)}getViewport(J){return this._viewports[J]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(J){return this.camera=J.camera.clone(),this.intensity=J.intensity,this.bias=J.bias,this.radius=J.radius,this.autoUpdate=J.autoUpdate,this.needsUpdate=J.needsUpdate,this.normalBias=J.normalBias,this.blurSamples=J.blurSamples,this.mapSize.copy(J.mapSize),this.biasNode=J.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let J={};return J.intensity=this.intensity,J.bias=this.bias,J.normalBias=this.normalBias,J.radius=this.radius,J.blurSamples=this.blurSamples,J.mapSize=this.mapSize.toArray(),J.camera=this.camera.toJSON(!1).object,delete J.camera.matrix,J}}var xQ=new k,hQ=new F8,L8=new k;class RZ extends P9{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new v9,this.projectionMatrix=new v9,this.projectionMatrixInverse=new v9,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,$){return super.copy(J,$),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(xQ,hQ,L8),L8.x===1&&L8.y===1&&L8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(xQ,hQ,L8.set(1,1,1)).invert()}updateWorldMatrix(J,$,Q=!1){if(super.updateWorldMatrix(J,$,Q),this.matrixWorld.decompose(xQ,hQ,L8),L8.x===1&&L8.y===1&&L8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(xQ,hQ,L8.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var _J=new k,GW=new G0,qW=new G0;class Q7 extends RZ{constructor(J=50,$=1,Q=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Q,this.far=Z,this.focus=10,this.aspect=$,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let $=0.5*this.getFilmHeight()/J;this.fov=G$*2*Math.atan($),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(gQ*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return G$*2*Math.atan(Math.tan(gQ*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,$,Q){_J.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(_J.x,_J.y).multiplyScalar(-J/_J.z),_J.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(_J.x,_J.y).multiplyScalar(-J/_J.z)}getViewSize(J,$){return this.getViewBounds(J,GW,qW),$.subVectors(qW,GW)}setViewOffset(J,$,Q,Z,K,U){if(this.aspect=J/$,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=Z,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,$=J*Math.tan(gQ*0.5*this.fov)/this.zoom,Q=2*$,Z=this.aspect*Q,K=-0.5*Z,U=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:W,fullHeight:Y}=U;K+=U.offsetX*Z/W,$-=U.offsetY*Q/Y,Z*=U.width/W,Q*=U.height/Y}let H=this.filmOffset;if(H!==0)K+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(K,K+Z,$,$-Q,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.fov=this.fov,$.object.zoom=this.zoom,$.object.near=this.near,$.object.far=this.far,$.object.focus=this.focus,$.object.aspect=this.aspect,this.view!==null)$.object.view=Object.assign({},this.view);return $.object.filmGauge=this.filmGauge,$.object.filmOffset=this.filmOffset,$}}class BY extends h${constructor(){super(new Q7(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(J){let $=this.camera,Q=G$*2*J.angle*this.focus,Z=this.mapSize.width/this.mapSize.height*this.aspect,K=J.distance||$.far;if(Q!==$.fov||Z!==$.aspect||K!==$.far)$.fov=Q,$.aspect=Z,$.far=K,$.updateProjectionMatrix();super.updateMatrices(J)}copy(J){return super.copy(J),this.focus=J.focus,this.aspect=J.aspect,this}toJSON(){let J=super.toJSON();return J.focus=this.focus,J.aspect=this.aspect,J}}class g6 extends h6{constructor(J,$,Q=0,Z=Math.PI/3,K=0,U=2){super(J,$);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(P9.DEFAULT_UP),this.updateMatrix(),this.target=new P9,this.distance=Q,this.angle=Z,this.penumbra=K,this.decay=U,this.map=null,this.shadow=new BY}get power(){return this.intensity*Math.PI}set power(J){this.intensity=J/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.angle=J.angle,this.penumbra=J.penumbra,this.decay=J.decay,this.target=J.target.clone(),this.map=J.map,this.shadow=J.shadow.clone(),this}toJSON(J){let $=super.toJSON(J);if($.object.distance=this.distance,$.object.angle=this.angle,$.object.decay=this.decay,$.object.penumbra=this.penumbra,$.object.target=this.target.uuid,this.map&&this.map.isTexture)$.object.map=this.map.toJSON(J).uuid;return $.object.shadow=this.shadow.toJSON(),$}}class IY extends h${constructor(){super(new Q7(90,1,0.5,500));this.isPointLightShadow=!0}}class V8 extends h6{constructor(J,$,Q=0,Z=2){super(J,$);this.isPointLight=!0,this.type="PointLight",this.distance=Q,this.decay=Z,this.shadow=new IY}get power(){return this.intensity*4*Math.PI}set power(J){this.intensity=J/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(J,$){return super.copy(J,$),this.distance=J.distance,this.decay=J.decay,this.shadow=J.shadow.clone(),this}toJSON(J){let $=super.toJSON(J);return $.object.distance=this.distance,$.object.decay=this.decay,$.object.shadow=this.shadow.toJSON(),$}}class sJ extends RZ{constructor(J=-1,$=1,Q=1,Z=-1,K=0.1,U=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=$,this.top=Q,this.bottom=Z,this.near=K,this.far=U,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,$,Q,Z,K,U){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=Z,this.view.width=K,this.view.height=U,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),$=(this.top-this.bottom)/(2*this.zoom),Q=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,K=Q-J,U=Q+J,H=Z+$,W=Z-$;if(this.view!==null&&this.view.enabled){let Y=(this.right-this.left)/this.view.fullWidth/this.zoom,N=(this.top-this.bottom)/this.view.fullHeight/this.zoom;K+=Y*this.view.offsetX,U=K+Y*this.view.width,H-=N*this.view.offsetY,W=H-N*this.view.height}this.projectionMatrix.makeOrthographic(K,U,H,W,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.zoom=this.zoom,$.object.left=this.left,$.object.right=this.right,$.object.top=this.top,$.object.bottom=this.bottom,$.object.near=this.near,$.object.far=this.far,this.view!==null)$.object.view=Object.assign({},this.view);return $}}class CY extends h${constructor(){super(new sJ(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class t7 extends h6{constructor(J,$){super(J,$);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(P9.DEFAULT_UP),this.updateMatrix(),this.target=new P9,this.shadow=new CY}dispose(){super.dispose(),this.shadow.dispose()}copy(J){return super.copy(J),this.target=J.target.clone(),this.shadow=J.shadow.clone(),this}toJSON(J){let $=super.toJSON(J);return $.object.shadow=this.shadow.toJSON(),$.object.target=this.target.uuid,$}}var C6=-90,A6=1;class TU extends P9{constructor(J,$,Q){super();this.type="CubeCamera",this.renderTarget=Q,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new Q7(C6,A6,J,$);Z.layers=this.layers,this.add(Z);let K=new Q7(C6,A6,J,$);K.layers=this.layers,this.add(K);let U=new Q7(C6,A6,J,$);U.layers=this.layers,this.add(U);let H=new Q7(C6,A6,J,$);H.layers=this.layers,this.add(H);let W=new Q7(C6,A6,J,$);W.layers=this.layers,this.add(W);let Y=new Q7(C6,A6,J,$);Y.layers=this.layers,this.add(Y)}updateCoordinateSystem(){let J=this.coordinateSystem,$=this.children.concat(),[Q,Z,K,U,H,W]=$;for(let Y of $)this.remove(Y);if(J===2000)Q.up.set(0,1,0),Q.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),K.up.set(0,0,-1),K.lookAt(0,1,0),U.up.set(0,0,1),U.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),W.up.set(0,1,0),W.lookAt(0,0,-1);else if(J===2001)Q.up.set(0,-1,0),Q.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),K.up.set(0,0,1),K.lookAt(0,1,0),U.up.set(0,0,-1),U.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),W.up.set(0,-1,0),W.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let Y of $)this.add(Y),Y.updateMatrixWorld()}update(J,$){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Q,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[K,U,H,W,Y,N]=this.children,X=J.getRenderTarget(),q=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let O=Q.texture.generateMipmaps;Q.texture.generateMipmaps=!1;let V=!1;if(J.isWebGLRenderer===!0)V=J.state.buffers.depth.getReversed();else V=J.reversedDepthBuffer;if(J.setRenderTarget(Q,0,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render($,K),J.setRenderTarget(Q,1,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render($,U),J.setRenderTarget(Q,2,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render($,H),J.setRenderTarget(Q,3,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render($,W),J.setRenderTarget(Q,4,Z),V&&J.autoClear===!1)J.clearDepth();if(J.render($,Y),Q.texture.generateMipmaps=O,J.setRenderTarget(Q,5,Z),V&&J.autoClear===!1)J.clearDepth();J.render($,N),J.setRenderTarget(X,q,G),J.xr.enabled=F,Q.texture.needsPMREMUpdate=!0}}class SU extends Q7{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}class MZ{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(J){if(this._document=J,J.hidden!==void 0)this._pageVisibilityHandler=eN.bind(this),J.addEventListener("visibilitychange",this._pageVisibilityHandler,!1)}disconnect(){if(this._pageVisibilityHandler!==null)this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null;this._document=null}getDelta(){return this._delta/1000}getElapsed(){return this._elapsed/1000}getTimescale(){return this._timescale}setTimescale(J){return this._timescale=J,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(J){if(this._pageVisibilityHandler!==null&&this._document.hidden===!0)this._delta=0;else this._previousTime=this._currentTime,this._currentTime=(J!==void 0?J:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta;return this}}function eN(){if(this._document.hidden===!1)this.reset()}var kU="\\[\\]\\.:\\/",JX=new RegExp("["+kU+"]","g"),jU="[^"+kU+"]",$X="[^"+kU.replace("\\.","")+"]",QX=/((?:WC+[\/:])*)/.source.replace("WC",jU),ZX=/(WCOD+)?/.source.replace("WCOD",$X),KX=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",jU),UX=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",jU),HX=new RegExp("^"+QX+ZX+KX+UX+"$"),WX=["material","materials","bones","map"];class AY{constructor(J,$,Q){let Z=Q||l9.parseTrackName($);this._targetGroup=J,this._bindings=J.subscribe_($,Z)}getValue(J,$){this.bind();let Q=this._targetGroup.nCachedObjects_,Z=this._bindings[Q];if(Z!==void 0)Z.getValue(J,$)}setValue(J,$){let Q=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,K=Q.length;Z!==K;++Z)Q[Z].setValue(J,$)}bind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].bind()}unbind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].unbind()}}class l9{constructor(J,$,Q){this.path=$,this.parsedPath=Q||l9.parseTrackName($),this.node=l9.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,$,Q){if(!(J&&J.isAnimationObjectGroup))return new l9(J,$,Q);else return new l9.Composite(J,$,Q)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(JX,"")}static parseTrackName(J){let $=HX.exec(J);if($===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let Q={nodeName:$[2],objectName:$[3],objectIndex:$[4],propertyName:$[5],propertyIndex:$[6]},Z=Q.nodeName&&Q.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let K=Q.nodeName.substring(Z+1);if(WX.indexOf(K)!==-1)Q.nodeName=Q.nodeName.substring(0,Z),Q.objectName=K}if(Q.propertyName===null||Q.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return Q}static findNode(J,$){if($===void 0||$===""||$==="."||$===-1||$===J.name||$===J.uuid)return J;if(J.skeleton){let Q=J.skeleton.getBoneByName($);if(Q!==void 0)return Q}if(J.children){let Q=function(K){for(let U=0;U<K.length;U++){let H=K[U];if(H.name===$||H.uuid===$)return H;let W=Q(H.children);if(W)return W}return null},Z=Q(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,$){J[$]=this.targetObject[this.propertyName]}_getValue_array(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)J[$++]=Q[Z]}_getValue_arrayElement(J,$){J[$]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,$){this.resolvedProperty.toArray(J,$)}_setValue_direct(J,$){this.targetObject[this.propertyName]=J[$]}_setValue_direct_setNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++]}_setValue_array_setNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let Z=0,K=Q.length;Z!==K;++Z)Q[Z]=J[$++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,$){this.resolvedProperty[this.propertyIndex]=J[$]}_setValue_arrayElement_setNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,$){this.resolvedProperty.fromArray(J,$)}_setValue_fromArray_setNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,$){this.bind(),this.getValue(J,$)}_setValue_unbound(J,$){this.bind(),this.setValue(J,$)}bind(){let J=this.node,$=this.parsedPath,Q=$.objectName,Z=$.propertyName,K=$.propertyIndex;if(!J)J=l9.findNode(this.rootNode,$.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){$9("PropertyBinding: No target node found for track: "+this.path+".");return}if(Q){let Y=$.objectIndex;switch(Q){case"materials":if(!J.material){U9("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){U9("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){U9("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let N=0;N<J.length;N++)if(J[N].name===Y){Y=N;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){U9("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){U9("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Q]===void 0){U9("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Q]}if(Y!==void 0){if(J[Y]===void 0){U9("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[Y]}}let U=J[Z];if(U===void 0){let Y=$.nodeName;U9("PropertyBinding: Trying to update property for track: "+Y+"."+Z+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let W=this.BindingType.Direct;if(K!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){U9("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){U9("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[K]!==void 0)K=J.morphTargetDictionary[K]}W=this.BindingType.ArrayElement,this.resolvedProperty=U,this.propertyIndex=K}else if(U.fromArray!==void 0&&U.toArray!==void 0)W=this.BindingType.HasFromToArray,this.resolvedProperty=U;else if(Array.isArray(U))W=this.BindingType.EntireArray,this.resolvedProperty=U;else this.propertyName=Z;this.getValue=this.GetterByBindingType[W],this.setValue=this.SetterByBindingTypeAndVersioning[W][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}l9.Composite=AY;l9.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};l9.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};l9.prototype.GetterByBindingType=[l9.prototype._getValue_direct,l9.prototype._getValue_array,l9.prototype._getValue_arrayElement,l9.prototype._getValue_toArray];l9.prototype.SetterByBindingTypeAndVersioning=[[l9.prototype._setValue_direct,l9.prototype._setValue_direct_setNeedsUpdate,l9.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[l9.prototype._setValue_array,l9.prototype._setValue_array_setNeedsUpdate,l9.prototype._setValue_array_setMatrixWorldNeedsUpdate],[l9.prototype._setValue_arrayElement,l9.prototype._setValue_arrayElement_setNeedsUpdate,l9.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[l9.prototype._setValue_fromArray,l9.prototype._setValue_fromArray_setNeedsUpdate,l9.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ME=new Float32Array(1);class vU{static{vU.prototype.isMatrix2=!0}constructor(J,$,Q,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,$,Q,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,$=0){for(let Q=0;Q<4;Q++)this.elements[Q]=J[Q+$];return this}set(J,$,Q,Z){let K=this.elements;return K[0]=J,K[2]=$,K[1]=Q,K[3]=Z,this}}class AJ extends O8{constructor(J=10,$=10,Q=4473924,Z=8947848){Q=new F0(Q),Z=new F0(Z);let K=$/2,U=J/$,H=J/2,W=[],Y=[];for(let q=0,G=0,F=-H;q<=$;q++,F+=U){W.push(-H,0,F,H,0,F),W.push(F,0,-H,F,0,H);let O=q===K?Q:Z;O.toArray(Y,G),G+=3,O.toArray(Y,G),G+=3,O.toArray(Y,G),G+=3,O.toArray(Y,G),G+=3}let N=new O9;N.setAttribute("position",new Q9(W,3)),N.setAttribute("color",new Q9(Y,3));let X=new pJ({vertexColors:!0,toneMapped:!1});super(N,X);this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}function yU(J,$,Q,Z){let K=YX(Z);switch(Q){case 1021:return J*$;case 1028:return J*$/K.components*K.byteLength;case 1029:return J*$/K.components*K.byteLength;case 1030:return J*$*2/K.components*K.byteLength;case 1031:return J*$*2/K.components*K.byteLength;case 1022:return J*$*3/K.components*K.byteLength;case 1023:return J*$*4/K.components*K.byteLength;case 1033:return J*$*4/K.components*K.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max($,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max($,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor(($+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor(($+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor(($+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor(($+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor(($+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor(($+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor(($+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor(($+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor(($+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor(($+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor(($+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor(($+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor(($+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil($/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil($/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil($/4)*16}throw Error(`Unable to determine texture byte length for ${Q} format.`)}function YX(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));if(typeof window<"u")if(window.__THREE__)$9("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="186";function nY(){let J=null,$=!1,Q=null,Z=null;function K(U,H){Z=J.requestAnimationFrame(K),Q(U,H)}return{start:function(){if($===!0)return;if(Q===null)return;if(J===null)return;Z=J.requestAnimationFrame(K),$=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);$=!1},setAnimationLoop:function(U){Q=U},setContext:function(U){J=U}}}function NX(J){let $=new WeakMap;function Q(W,Y){let{array:N,usage:X}=W,q=N.byteLength,G=J.createBuffer();J.bindBuffer(Y,G),J.bufferData(Y,N,X),W.onUploadCallback();let F;if(N instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&N instanceof Float16Array)F=J.HALF_FLOAT;else if(N instanceof Uint16Array)if(W.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(N instanceof Int16Array)F=J.SHORT;else if(N instanceof Uint32Array)F=J.UNSIGNED_INT;else if(N instanceof Int32Array)F=J.INT;else if(N instanceof Int8Array)F=J.BYTE;else if(N instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(N instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+N);return{buffer:G,type:F,bytesPerElement:N.BYTES_PER_ELEMENT,version:W.version,size:q}}function Z(W,Y,N){let{array:X,updateRanges:q}=Y;if(J.bindBuffer(N,W),q.length===0)J.bufferSubData(N,0,X);else{q.sort((F,O)=>F.start-O.start);let G=0;for(let F=1;F<q.length;F++){let O=q[G],V=q[F];if(V.start<=O.start+O.count+1)O.count=Math.max(O.count,V.start+V.count-O.start);else++G,q[G]=V}q.length=G+1;for(let F=0,O=q.length;F<O;F++){let V=q[F];J.bufferSubData(N,V.start*X.BYTES_PER_ELEMENT,X,V.start,V.count)}Y.clearUpdateRanges()}Y.onUploadCallback()}function K(W){if(W.isInterleavedBufferAttribute)W=W.data;return $.get(W)}function U(W){if(W.isInterleavedBufferAttribute)W=W.data;let Y=$.get(W);if(Y)J.deleteBuffer(Y.buffer),$.delete(W)}function H(W,Y){if(W.isInterleavedBufferAttribute)W=W.data;if(W.isGLBufferAttribute){let X=$.get(W);if(!X||X.version<W.version)$.set(W,{buffer:W.buffer,type:W.type,bytesPerElement:W.elementSize,version:W.version});return}let N=$.get(W);if(N===void 0)$.set(W,Q(W,Y));else if(N.version<W.version){if(N.size!==W.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(N.buffer,W,Y),N.version=W.version}}return{get:K,remove:U,update:H}}var XX=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,GX=`#ifdef USE_ALPHAHASH
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
#endif`,qX=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,FX=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,DX=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,EX=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,OX=`#ifdef USE_AOMAP
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
#endif`,RX=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,MX=`#ifdef USE_BATCHING
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
#endif`,VX=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_X=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,BX=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,IX=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,CX=`#ifdef USE_IRIDESCENCE
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
#endif`,AX=`#ifdef USE_BUMPMAP
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
#endif`,zX=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,LX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,PX=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wX=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,TX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,SX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,kX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jX=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,vX=`#define PI 3.141592653589793
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
} // validated`,yX=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,fX=`vec3 transformedNormal = objectNormal;
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
#endif`,bX=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xX=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hX=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gX=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pX="gl_FragColor = linearToOutputTexel( gl_FragColor );",uX=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mX=`#ifdef USE_ENVMAP
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
#endif`,dX=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,lX=`#ifdef USE_ENVMAP
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
#endif`,cX=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nX=`#ifdef USE_ENVMAP
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
#endif`,sX=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,iX=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,oX=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,aX=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rX=`#ifdef USE_GRADIENTMAP
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
}`,tX=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,eX=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,JG=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$G=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,QG=`#ifdef USE_ENVMAP
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
#endif`,ZG=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KG=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,UG=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,HG=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,WG=`PhysicalMaterial material;
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
#endif`,YG=`uniform sampler2D dfgLUT;
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
}`,NG=`
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
#endif`,XG=`#if defined( RE_IndirectDiffuse )
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
#endif`,GG=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qG=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,FG=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,DG=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,EG=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,OG=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,RG=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,MG=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,VG=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_G=`#if defined( USE_POINTS_UV )
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
#endif`,BG=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,IG=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,CG=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,AG=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zG=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,LG=`#ifdef USE_MORPHTARGETS
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
#endif`,PG=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wG=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,TG=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,SG=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kG=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jG=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vG=`#ifdef USE_NORMALMAP
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
#endif`,yG=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fG=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bG=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xG=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hG=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gG=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pG=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uG=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mG=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dG=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lG=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cG=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nG=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sG=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,iG=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,oG=`float getShadowMask() {
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
}`,aG=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rG=`#ifdef USE_SKINNING
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
#endif`,tG=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,eG=`#ifdef USE_SKINNING
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
#endif`,Jq=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$q=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qq=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zq=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kq=`#ifdef USE_TRANSMISSION
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
#endif`,Uq=`#ifdef USE_TRANSMISSION
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
#endif`,Hq=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wq=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yq=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nq=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Xq=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gq=`uniform sampler2D t2D;
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
}`,qq=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fq=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Dq=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Eq=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Oq=`#include <common>
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
}`,Rq=`#if DEPTH_PACKING == 3200
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
}`,Mq=`#define DISTANCE
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
}`,Vq=`#define DISTANCE
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
}`,_q=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bq=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Iq=`uniform float scale;
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
}`,Cq=`uniform vec3 diffuse;
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
}`,Aq=`#include <common>
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
}`,zq=`uniform vec3 diffuse;
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
}`,Lq=`#define LAMBERT
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
}`,Pq=`#define LAMBERT
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
}`,wq=`#define MATCAP
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
}`,Tq=`#define MATCAP
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
}`,Sq=`#define NORMAL
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
}`,kq=`#define NORMAL
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
}`,jq=`#define PHONG
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
}`,vq=`#define PHONG
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
}`,yq=`#define STANDARD
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
}`,fq=`#define STANDARD
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
}`,bq=`#define TOON
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
}`,xq=`#define TOON
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
}`,hq=`uniform float size;
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
}`,gq=`uniform vec3 diffuse;
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
}`,pq=`#include <common>
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
}`,uq=`uniform vec3 color;
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
}`,mq=`uniform float rotation;
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
}`,dq=`uniform vec3 diffuse;
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
}`,M9={alphahash_fragment:XX,alphahash_pars_fragment:GX,alphamap_fragment:qX,alphamap_pars_fragment:FX,alphatest_fragment:DX,alphatest_pars_fragment:EX,aomap_fragment:OX,aomap_pars_fragment:RX,batching_pars_vertex:MX,batching_vertex:VX,begin_vertex:_X,beginnormal_vertex:BX,bsdfs:IX,iridescence_fragment:CX,bumpmap_pars_fragment:AX,clipping_planes_fragment:zX,clipping_planes_pars_fragment:LX,clipping_planes_pars_vertex:PX,clipping_planes_vertex:wX,color_fragment:TX,color_pars_fragment:SX,color_pars_vertex:kX,color_vertex:jX,common:vX,cube_uv_reflection_fragment:yX,defaultnormal_vertex:fX,displacementmap_pars_vertex:bX,displacementmap_vertex:xX,emissivemap_fragment:hX,emissivemap_pars_fragment:gX,colorspace_fragment:pX,colorspace_pars_fragment:uX,envmap_fragment:mX,envmap_common_pars_fragment:dX,envmap_pars_fragment:lX,envmap_pars_vertex:cX,envmap_physical_pars_fragment:QG,envmap_vertex:nX,fog_vertex:sX,fog_pars_vertex:iX,fog_fragment:oX,fog_pars_fragment:aX,gradientmap_pars_fragment:rX,lightmap_pars_fragment:tX,lights_lambert_fragment:eX,lights_lambert_pars_fragment:JG,lights_pars_begin:$G,lights_toon_fragment:ZG,lights_toon_pars_fragment:KG,lights_phong_fragment:UG,lights_phong_pars_fragment:HG,lights_physical_fragment:WG,lights_physical_pars_fragment:YG,lights_fragment_begin:NG,lights_fragment_maps:XG,lights_fragment_end:GG,lightprobes_pars_fragment:qG,logdepthbuf_fragment:FG,logdepthbuf_pars_fragment:DG,logdepthbuf_pars_vertex:EG,logdepthbuf_vertex:OG,map_fragment:RG,map_pars_fragment:MG,map_particle_fragment:VG,map_particle_pars_fragment:_G,metalnessmap_fragment:BG,metalnessmap_pars_fragment:IG,morphinstance_vertex:CG,morphcolor_vertex:AG,morphnormal_vertex:zG,morphtarget_pars_vertex:LG,morphtarget_vertex:PG,normal_fragment_begin:wG,normal_fragment_maps:TG,normal_pars_fragment:SG,normal_pars_vertex:kG,normal_vertex:jG,normalmap_pars_fragment:vG,clearcoat_normal_fragment_begin:yG,clearcoat_normal_fragment_maps:fG,clearcoat_pars_fragment:bG,iridescence_pars_fragment:xG,opaque_fragment:hG,packing:gG,premultiplied_alpha_fragment:pG,project_vertex:uG,dithering_fragment:mG,dithering_pars_fragment:dG,roughnessmap_fragment:lG,roughnessmap_pars_fragment:cG,shadowmap_pars_fragment:nG,shadowmap_pars_vertex:sG,shadowmap_vertex:iG,shadowmask_pars_fragment:oG,skinbase_vertex:aG,skinning_pars_vertex:rG,skinning_vertex:tG,skinnormal_vertex:eG,specularmap_fragment:Jq,specularmap_pars_fragment:$q,tonemapping_fragment:Qq,tonemapping_pars_fragment:Zq,transmission_fragment:Kq,transmission_pars_fragment:Uq,uv_pars_fragment:Hq,uv_pars_vertex:Wq,uv_vertex:Yq,worldpos_vertex:Nq,background_vert:Xq,background_frag:Gq,backgroundCube_vert:qq,backgroundCube_frag:Fq,cube_vert:Dq,cube_frag:Eq,depth_vert:Oq,depth_frag:Rq,distance_vert:Mq,distance_frag:Vq,equirect_vert:_q,equirect_frag:Bq,linedashed_vert:Iq,linedashed_frag:Cq,meshbasic_vert:Aq,meshbasic_frag:zq,meshlambert_vert:Lq,meshlambert_frag:Pq,meshmatcap_vert:wq,meshmatcap_frag:Tq,meshnormal_vert:Sq,meshnormal_frag:kq,meshphong_vert:jq,meshphong_frag:vq,meshphysical_vert:yq,meshphysical_frag:fq,meshtoon_vert:bq,meshtoon_frag:xq,points_vert:hq,points_frag:gq,shadow_vert:pq,shadow_frag:uq,sprite_vert:mq,sprite_frag:dq},v0={common:{diffuse:{value:new F0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new X9},alphaMap:{value:null},alphaMapTransform:{value:new X9},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new X9}},envmap:{envMap:{value:null},envMapRotation:{value:new X9},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new X9}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new X9}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new X9},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new X9},normalScale:{value:new G0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new X9},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new X9}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new X9}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new X9}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new F0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new F0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new X9},alphaTest:{value:0},uvTransform:{value:new X9}},sprite:{diffuse:{value:new F0(16777215)},opacity:{value:1},center:{value:new G0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new X9},alphaMap:{value:null},alphaMapTransform:{value:new X9},alphaTest:{value:0}}},y8={basic:{uniforms:k7([v0.common,v0.specularmap,v0.envmap,v0.aomap,v0.lightmap,v0.fog]),vertexShader:M9.meshbasic_vert,fragmentShader:M9.meshbasic_frag},lambert:{uniforms:k7([v0.common,v0.specularmap,v0.envmap,v0.aomap,v0.lightmap,v0.emissivemap,v0.bumpmap,v0.normalmap,v0.displacementmap,v0.fog,v0.lights,{emissive:{value:new F0(0)},envMapIntensity:{value:1}}]),vertexShader:M9.meshlambert_vert,fragmentShader:M9.meshlambert_frag},phong:{uniforms:k7([v0.common,v0.specularmap,v0.envmap,v0.aomap,v0.lightmap,v0.emissivemap,v0.bumpmap,v0.normalmap,v0.displacementmap,v0.fog,v0.lights,{emissive:{value:new F0(0)},specular:{value:new F0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:M9.meshphong_vert,fragmentShader:M9.meshphong_frag},standard:{uniforms:k7([v0.common,v0.envmap,v0.aomap,v0.lightmap,v0.emissivemap,v0.bumpmap,v0.normalmap,v0.displacementmap,v0.roughnessmap,v0.metalnessmap,v0.fog,v0.lights,{emissive:{value:new F0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:M9.meshphysical_vert,fragmentShader:M9.meshphysical_frag},toon:{uniforms:k7([v0.common,v0.aomap,v0.lightmap,v0.emissivemap,v0.bumpmap,v0.normalmap,v0.displacementmap,v0.gradientmap,v0.fog,v0.lights,{emissive:{value:new F0(0)}}]),vertexShader:M9.meshtoon_vert,fragmentShader:M9.meshtoon_frag},matcap:{uniforms:k7([v0.common,v0.bumpmap,v0.normalmap,v0.displacementmap,v0.fog,{matcap:{value:null}}]),vertexShader:M9.meshmatcap_vert,fragmentShader:M9.meshmatcap_frag},points:{uniforms:k7([v0.points,v0.fog]),vertexShader:M9.points_vert,fragmentShader:M9.points_frag},dashed:{uniforms:k7([v0.common,v0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:M9.linedashed_vert,fragmentShader:M9.linedashed_frag},depth:{uniforms:k7([v0.common,v0.displacementmap]),vertexShader:M9.depth_vert,fragmentShader:M9.depth_frag},normal:{uniforms:k7([v0.common,v0.bumpmap,v0.normalmap,v0.displacementmap,{opacity:{value:1}}]),vertexShader:M9.meshnormal_vert,fragmentShader:M9.meshnormal_frag},sprite:{uniforms:k7([v0.sprite,v0.fog]),vertexShader:M9.sprite_vert,fragmentShader:M9.sprite_frag},background:{uniforms:{uvTransform:{value:new X9},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:M9.background_vert,fragmentShader:M9.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new X9}},vertexShader:M9.backgroundCube_vert,fragmentShader:M9.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:M9.cube_vert,fragmentShader:M9.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:M9.equirect_vert,fragmentShader:M9.equirect_frag},distance:{uniforms:k7([v0.common,v0.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:M9.distance_vert,fragmentShader:M9.distance_frag},shadow:{uniforms:k7([v0.lights,v0.fog,{color:{value:new F0(0)},opacity:{value:1}}]),vertexShader:M9.shadow_vert,fragmentShader:M9.shadow_frag}};y8.physical={uniforms:k7([y8.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new X9},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new X9},clearcoatNormalScale:{value:new G0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new X9},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new X9},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new X9},sheen:{value:0},sheenColor:{value:new F0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new X9},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new X9},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new X9},transmissionSamplerSize:{value:new G0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new X9},attenuationDistance:{value:0},attenuationColor:{value:new F0(0)},specularColor:{value:new F0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new X9},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new X9},anisotropyVector:{value:new G0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new X9}}]),vertexShader:M9.meshphysical_vert,fragmentShader:M9.meshphysical_frag};var VZ={r:0,b:0,g:0},lq=new v9,sY=new X9;sY.set(-1,0,0,0,1,0,0,0,1);function cq(J,$,Q,Z,K,U){let H=new F0(0),W=K===!0?0:1,Y,N,X=null,q=0,G=null;function F(C){let L=C.isScene===!0?C.background:null;if(L&&L.isTexture){let R=C.backgroundBlurriness>0;L=$.get(L,R)}return L}function O(C){let L=!1,R=F(C);if(R===null)D(H,W);else if(R&&R.isColor)D(R,1),L=!0;let _=J.xr.getEnvironmentBlendMode();if(_==="additive")Q.buffers.color.setClear(0,0,0,1,U);else if(_==="alpha-blend")Q.buffers.color.setClear(0,0,0,0,U);if(J.autoClear||L)Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function V(C,L){let R=F(L);if(R&&(R.isCubeTexture||R.mapping===A$)){if(N===void 0)N=new h(new _0(1,1,1),new h9({name:"BackgroundCubeMaterial",uniforms:dJ(y8.backgroundCube.uniforms),vertexShader:y8.backgroundCube.vertexShader,fragmentShader:y8.backgroundCube.fragmentShader,side:E7,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),N.geometry.deleteAttribute("normal"),N.geometry.deleteAttribute("uv"),N.onBeforeRender=function(_,B,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(N.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(N);if(N.material.uniforms.envMap.value=R,N.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,N.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,N.material.uniforms.backgroundRotation.value.setFromMatrix4(lq.makeRotationFromEuler(L.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1)N.material.uniforms.backgroundRotation.value.premultiply(sY);if(N.material.toneMapped=_9.getTransfer(R.colorSpace)!==c9,X!==R||q!==R.version||G!==J.toneMapping)N.material.needsUpdate=!0,X=R,q=R.version,G=J.toneMapping;N.layers.enableAll(),C.unshift(N,N.geometry,N.material,0,0,null)}else if(R&&R.isTexture){if(Y===void 0)Y=new h(new G9(2,2),new h9({name:"BackgroundMaterial",uniforms:dJ(y8.background.uniforms),vertexShader:y8.background.vertexShader,fragmentShader:y8.background.fragmentShader,side:T6,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),Y.geometry.deleteAttribute("normal"),Object.defineProperty(Y.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(Y);if(Y.material.uniforms.t2D.value=R,Y.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,Y.material.toneMapped=_9.getTransfer(R.colorSpace)!==c9,R.matrixAutoUpdate===!0)R.updateMatrix();if(Y.material.uniforms.uvTransform.value.copy(R.matrix),X!==R||q!==R.version||G!==J.toneMapping)Y.material.needsUpdate=!0,X=R,q=R.version,G=J.toneMapping;Y.layers.enableAll(),C.unshift(Y,Y.geometry,Y.material,0,0,null)}}function D(C,L){C.getRGB(VZ,RU(J)),Q.buffers.color.setClear(VZ.r,VZ.g,VZ.b,L,U)}function E(){if(N!==void 0)N.geometry.dispose(),N.material.dispose(),N=void 0;if(Y!==void 0)Y.geometry.dispose(),Y.material.dispose(),Y=void 0}return{getClearColor:function(){return H},setClearColor:function(C,L=1){H.set(C),W=L,D(H,W)},getClearAlpha:function(){return W},setClearAlpha:function(C){W=C,D(H,W)},render:O,addToRenderList:V,dispose:E}}function nq(J,$){let Q=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},K=G(null),U=K,H=!1;function W(S,f,t,v,l){let Q0=!1,s=q(S,v,t,f);if(U!==s)U=s,N(U.object);if(Q0=F(S,v,t,l),Q0)O(S,v,t,l);if(l!==null)$.update(l,J.ELEMENT_ARRAY_BUFFER);if(Q0||H){if(H=!1,R(S,f,t,v),l!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,$.get(l).buffer)}}function Y(){return J.createVertexArray()}function N(S){return J.bindVertexArray(S)}function X(S){return J.deleteVertexArray(S)}function q(S,f,t,v){let l=v.wireframe===!0,Q0=Z[f.id];if(Q0===void 0)Q0={},Z[f.id]=Q0;let s=S.isInstancedMesh===!0?S.id:0,a=Q0[s];if(a===void 0)a={},Q0[s]=a;let u=a[t.id];if(u===void 0)u={},a[t.id]=u;let x=u[l];if(x===void 0)x=G(Y()),u[l]=x;return x}function G(S){let f=[],t=[],v=[];for(let l=0;l<Q;l++)f[l]=0,t[l]=0,v[l]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:f,enabledAttributes:t,attributeDivisors:v,object:S,attributes:{},index:null}}function F(S,f,t,v){let l=U.attributes,Q0=f.attributes,s=0,a=t.getAttributes();for(let u in a)if(a[u].location>=0){let Z0=l[u],O0=Q0[u];if(O0===void 0){if(u==="instanceMatrix"&&S.instanceMatrix)O0=S.instanceMatrix;if(u==="instanceColor"&&S.instanceColor)O0=S.instanceColor}if(Z0===void 0)return!0;if(Z0.attribute!==O0)return!0;if(O0&&Z0.data!==O0.data)return!0;s++}if(U.attributesNum!==s)return!0;if(U.index!==v)return!0;return!1}function O(S,f,t,v){let l={},Q0=f.attributes,s=0,a=t.getAttributes();for(let u in a)if(a[u].location>=0){let Z0=Q0[u];if(Z0===void 0){if(u==="instanceMatrix"&&S.instanceMatrix)Z0=S.instanceMatrix;if(u==="instanceColor"&&S.instanceColor)Z0=S.instanceColor}let O0={};if(O0.attribute=Z0,Z0&&Z0.data)O0.data=Z0.data;l[u]=O0,s++}U.attributes=l,U.attributesNum=s,U.index=v}function V(){let S=U.newAttributes;for(let f=0,t=S.length;f<t;f++)S[f]=0}function D(S){E(S,0)}function E(S,f){let{newAttributes:t,enabledAttributes:v,attributeDivisors:l}=U;if(t[S]=1,v[S]===0)J.enableVertexAttribArray(S),v[S]=1;if(l[S]!==f)J.vertexAttribDivisor(S,f),l[S]=f}function C(){let{newAttributes:S,enabledAttributes:f}=U;for(let t=0,v=f.length;t<v;t++)if(f[t]!==S[t])J.disableVertexAttribArray(t),f[t]=0}function L(S,f,t,v,l,Q0,s){if(s===!0)J.vertexAttribIPointer(S,f,t,l,Q0);else J.vertexAttribPointer(S,f,t,v,l,Q0)}function R(S,f,t,v){V();let l=v.attributes,Q0=t.getAttributes(),s=f.defaultAttributeValues;for(let a in Q0){let u=Q0[a];if(u.location>=0){let x=l[a];if(x===void 0){if(a==="instanceMatrix"&&S.instanceMatrix)x=S.instanceMatrix;if(a==="instanceColor"&&S.instanceColor)x=S.instanceColor}if(x!==void 0){let{normalized:Z0,itemSize:O0}=x,z0=$.get(x);if(z0===void 0)continue;let{buffer:d,type:X0,bytesPerElement:n}=z0,Y0=X0===J.INT||X0===J.UNSIGNED_INT||x.gpuType===VK;if(x.isInterleavedBufferAttribute){let H0=x.data,c=H0.stride,A0=x.offset;if(H0.isInstancedInterleavedBuffer){for(let r=0;r<u.locationSize;r++)E(u.location+r,H0.meshPerAttribute);if(S.isInstancedMesh!==!0&&v._maxInstanceCount===void 0)v._maxInstanceCount=H0.meshPerAttribute*H0.count}else for(let r=0;r<u.locationSize;r++)D(u.location+r);J.bindBuffer(J.ARRAY_BUFFER,d);for(let r=0;r<u.locationSize;r++)L(u.location+r,O0/u.locationSize,X0,Z0,c*n,(A0+O0/u.locationSize*r)*n,Y0)}else{if(x.isInstancedBufferAttribute){for(let H0=0;H0<u.locationSize;H0++)E(u.location+H0,x.meshPerAttribute);if(S.isInstancedMesh!==!0&&v._maxInstanceCount===void 0)v._maxInstanceCount=x.meshPerAttribute*x.count}else for(let H0=0;H0<u.locationSize;H0++)D(u.location+H0);J.bindBuffer(J.ARRAY_BUFFER,d);for(let H0=0;H0<u.locationSize;H0++)L(u.location+H0,O0/u.locationSize,X0,Z0,O0*n,O0/u.locationSize*H0*n,Y0)}}else if(s!==void 0){let Z0=s[a];if(Z0!==void 0)switch(Z0.length){case 2:J.vertexAttrib2fv(u.location,Z0);break;case 3:J.vertexAttrib3fv(u.location,Z0);break;case 4:J.vertexAttrib4fv(u.location,Z0);break;default:J.vertexAttrib1fv(u.location,Z0)}}}}C()}function _(){I();for(let S in Z){let f=Z[S];for(let t in f){let v=f[t];for(let l in v){let Q0=v[l];for(let s in Q0)X(Q0[s].object),delete Q0[s];delete v[l]}}delete Z[S]}}function B(S){if(Z[S.id]===void 0)return;let f=Z[S.id];for(let t in f){let v=f[t];for(let l in v){let Q0=v[l];for(let s in Q0)X(Q0[s].object),delete Q0[s];delete v[l]}}delete Z[S.id]}function A(S){for(let f in Z){let t=Z[f];for(let v in t){let l=t[v];if(l[S.id]===void 0)continue;let Q0=l[S.id];for(let s in Q0)X(Q0[s].object),delete Q0[s];delete l[S.id]}}}function M(S){for(let f in Z){let t=Z[f],v=S.isInstancedMesh===!0?S.id:0,l=t[v];if(l===void 0)continue;for(let Q0 in l){let s=l[Q0];for(let a in s)X(s[a].object),delete s[a];delete l[Q0]}if(delete t[v],Object.keys(t).length===0)delete Z[f]}}function I(){if(y(),H=!0,U===K)return;U=K,N(U.object)}function y(){K.geometry=null,K.program=null,K.wireframe=!1}return{setup:W,reset:I,resetDefaultState:y,dispose:_,releaseStatesOfGeometry:B,releaseStatesOfObject:M,releaseStatesOfProgram:A,initAttributes:V,enableAttribute:D,disableUnusedAttributes:C}}function sq(J,$,Q){let Z;function K(Y){Z=Y}function U(Y,N){J.drawArrays(Z,Y,N),Q.update(N,Z,1)}function H(Y,N,X){if(X===0)return;J.drawArraysInstanced(Z,Y,N,X),Q.update(N,Z,X)}function W(Y,N,X){if(X===0)return;$.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,Y,0,N,0,X);let G=0;for(let F=0;F<X;F++)G+=N[F];Q.update(G,Z,1)}this.setMode=K,this.render=U,this.renderInstances=H,this.renderMultiDraw=W}function iq(J,$,Q,Z){let K;function U(){if(K!==void 0)return K;if($.has("EXT_texture_filter_anisotropic")===!0){let A=$.get("EXT_texture_filter_anisotropic");K=J.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else K=0;return K}function H(A){if(A!==k8&&Z.convert(A)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function W(A){let M=A===I7&&($.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float"));if(A!==q8&&A!==o8&&!M&&Z.convert(A)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE))return!1;return!0}function Y(A){if(A==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let N=Q.precision!==void 0?Q.precision:"highp",X=Y(N);if(X!==N)$9("WebGLRenderer:",N,"not supported, using",X,"instead."),N=X;let q=Q.logarithmicDepthBuffer===!0,G=Q.reversedDepthBuffer===!0&&$.has("EXT_clip_control");if(Q.reversedDepthBuffer===!0&&G===!1)$9("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),O=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),V=J.getParameter(J.MAX_TEXTURE_SIZE),D=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),E=J.getParameter(J.MAX_VERTEX_ATTRIBS),C=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),L=J.getParameter(J.MAX_VARYING_VECTORS),R=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),_=J.getParameter(J.MAX_SAMPLES),B=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:U,getMaxPrecision:Y,textureFormatReadable:H,textureTypeReadable:W,precision:N,logarithmicDepthBuffer:q,reversedDepthBuffer:G,maxTextures:F,maxVertexTextures:O,maxTextureSize:V,maxCubemapSize:D,maxAttributes:E,maxVertexUniforms:C,maxVaryings:L,maxFragmentUniforms:R,maxSamples:_,samples:B}}function oq(J){let $=this,Q=null,Z=0,K=!1,U=!1,H=new P8,W=new X9,Y={value:null,needsUpdate:!1};this.uniform=Y,this.numPlanes=0,this.numIntersection=0,this.init=function(q,G){let F=q.length!==0||G||Z!==0||K;return K=G,Z=q.length,F},this.beginShadows=function(){U=!0,X(null)},this.endShadows=function(){U=!1},this.setGlobalState=function(q,G){Q=X(q,G,0)},this.setState=function(q,G,F){let{clippingPlanes:O,clipIntersection:V,clipShadows:D}=q,E=J.get(q);if(!K||O===null||O.length===0||U&&!D)if(U)X(null);else N();else{let C=U?0:Z,L=C*4,R=E.clippingState||null;Y.value=R,R=X(O,G,L,F);for(let _=0;_!==L;++_)R[_]=Q[_];E.clippingState=R,this.numIntersection=V?this.numPlanes:0,this.numPlanes+=C}};function N(){if(Y.value!==Q)Y.value=Q,Y.needsUpdate=Z>0;$.numPlanes=Z,$.numIntersection=0}function X(q,G,F,O){let V=q!==null?q.length:0,D=null;if(V!==0){if(D=Y.value,O!==!0||D===null){let E=F+V*4,C=G.matrixWorldInverse;if(W.getNormalMatrix(C),D===null||D.length<E)D=new Float32Array(E);for(let L=0,R=F;L!==V;++L,R+=4)H.copy(q[L]).applyMatrix4(C,W),H.normal.toArray(D,R),D[R+3]=H.constant}Y.value=D,Y.needsUpdate=!0}return $.numPlanes=V,$.numIntersection=0,D}}var u6=4,aq=6,rq=20,tq=256,g$=new sJ,zY=new F0,fU=null,bU=0,xU=0,hU=!1,eq=new k,iJ=new k;class uU{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,$=0,Q=0.1,Z=100,K={}){let{size:U=256,position:H=eq}=K;fU=this._renderer.getRenderTarget(),bU=this._renderer.getActiveCubeFace(),xU=this._renderer.getActiveMipmapLevel(),hU=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(U);let W=this._allocateTargets();if(W.depthBuffer=!0,this._sceneToCubeUV(J,Q,Z,W,H),$>0)this._blur(W,0,0,$);return this._applyPMREM(W),this._cleanup(W),W}fromEquirectangular(J,$=null){return this._fromTexture(J,$)}fromCubemap(J,$=null){return this._fromTexture(J,$)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=wY(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=PY(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(fU,bU,xU),this._renderer.xr.enabled=hU,J.scissorTest=!1,p6(J,0,0,J.width,J.height)}_fromTexture(J,$){if(J.mapping===k6||J.mapping===yJ)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);fU=this._renderer.getRenderTarget(),bU=this._renderer.getActiveCubeFace(),xU=this._renderer.getActiveMipmapLevel(),hU=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let Q=$||this._allocateTargets();return this._textureToCubeUV(J,Q),this._applyPMREM(Q),this._cleanup(Q),Q}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),$=4*this._cubeSize,Q={magFilter:h7,minFilter:h7,generateMipmaps:!1,type:I7,format:k8,colorSpace:ZU,depthBuffer:!1},Z=LY(J,$,Q);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==$){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=LY(J,$,Q);let{_lodMax:K}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=J1(K)),this._blurMaterial=Q1(K,J,$),this._ggxMaterial=$1(K,J,$)}return Z}_compileMaterial(J){let $=new h(new O9,J);this._renderer.compile($,g$)}_sceneToCubeUV(J,$,Q,Z,K){let W=new Q7(90,1,$,Q),Y=[1,-1,1,1,1,1],N=[1,1,1,-1,-1,-1],X=this._renderer,q=X.autoClear,G=X.toneMapping;if(X.getClearColor(zY),X.toneMapping=X8,X.autoClear=!1,X.state.buffers.depth.getReversed())X.setRenderTarget(Z),X.clearDepth(),X.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new h(new _0,new g0({name:"PMREM.Background",side:E7,depthWrite:!1,depthTest:!1}));let O=this._backgroundBox,V=O.material,D=!1,E=J.background;if(E){if(E.isColor)V.color.copy(E),J.background=null,D=!0}else V.color.copy(zY),D=!0;for(let C=0;C<6;C++){let L=C%3;if(L===0)W.up.set(0,Y[C],0),W.position.set(K.x,K.y,K.z),W.lookAt(K.x+N[C],K.y,K.z);else if(L===1)W.up.set(0,0,Y[C]),W.position.set(K.x,K.y,K.z),W.lookAt(K.x,K.y+N[C],K.z);else W.up.set(0,Y[C],0),W.position.set(K.x,K.y,K.z),W.lookAt(K.x,K.y,K.z+N[C]);let R=this._cubeSize;if(p6(Z,L*R,C>2?R:0,R,R),X.setRenderTarget(Z),D)X.render(O,W);X.render(J,W)}X.toneMapping=G,X.autoClear=q,J.background=E}_textureToCubeUV(J,$){let Q=this._renderer,Z=J.mapping===k6||J.mapping===yJ;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=wY();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=PY();let K=Z?this._cubemapMaterial:this._equirectMaterial,U=this._lodMeshes[0];U.material=K;let H=K.uniforms;H.envMap.value=J;let W=this._cubeSize;p6($,0,0,3*W,2*W),Q.setRenderTarget($),Q.render(U,g$)}_applyPMREM(J){let $=this._renderer,Q=$.autoClear;$.autoClear=!1;let Z=this._lodMeshes.length;for(let K=1;K<Z;K++)this._applyGGXFilter(J,K-1,K);$.autoClear=Q}_applyGGXFilter(J,$,Q){let Z=this._renderer,K=this._pingPongRenderTarget,U=this._ggxMaterial,H=this._lodMeshes[Q];H.material=U;let W=U.uniforms,Y=Q/(this._lodMeshes.length-1),N=$/(this._lodMeshes.length-1),X=Math.sqrt(Y*Y-N*N),q=Y*1.25,G=X*q,{_lodMax:F}=this,O=this._sizeLods[Q],V=3*O*(Q>F-u6?Q-F+u6:0),D=4*(this._cubeSize-O);W.envMap.value=J.texture,W.roughness.value=G,W.mipInt.value=F-$,p6(K,V,D,3*O,2*O),Z.setRenderTarget(K),Z.render(H,g$),W.envMap.value=K.texture,W.roughness.value=0,W.mipInt.value=F-Q,p6(J,V,D,3*O,2*O),Z.setRenderTarget(J),Z.render(H,g$)}_blur(J,$,Q,Z){let K=this._pingPongRenderTarget,U=Math.min(Z,Math.PI)/Math.SQRT2;this._blurPass(J,K,$,Q,U),this._blurPass(K,J,Q,Q,U)}_blurPass(J,$,Q,Z,K){let U=this._renderer,H=this._blurMaterial,W=this._lodMeshes[Z];W.material=H;let Y=H.uniforms;Y.envMap.value=J.texture,Y.sigma.value=K,Y.mipInt.value=this._lodMax-Q;let N=this._sizeLods[Z],X=3*N*(Z>this._lodMax-u6?Z-this._lodMax+u6:0),q=4*(this._cubeSize-N);p6($,X,q,3*N,2*N),U.setRenderTarget($),U.render(W,g$)}}function J1(J){let $=[],Q=[],Z=J,K=J-u6+1+aq;for(let U=0;U<K;U++){let H=Math.pow(2,Z);$.push(H);let W=1/(H-2),Y=-W,N=1+W,X=[Y,Y,N,Y,N,N,Y,Y,N,N,Y,N],q=6,G=6,F=3,O=new Float32Array(F*G*q),V=new Float32Array(F*G*q);for(let E=0;E<q;E++){let C=E%3*2/3-1,L=E>2?0:-1,R=[C,L,0,C+0.6666666666666666,L,0,C+0.6666666666666666,L+1,0,C,L,0,C+0.6666666666666666,L+1,0,C,L+1,0];O.set(R,F*G*E);for(let _=0;_<G;_++){let B=X[_*2]*2-1,A=X[_*2+1]*2-1;if(E===0)iJ.set(1,A,B);else if(E===1)iJ.set(-B,1,-A);else if(E===2)iJ.set(-B,A,1);else if(E===3)iJ.set(-1,A,-B);else if(E===4)iJ.set(-B,-1,A);else iJ.set(B,A,-1);iJ.toArray(V,(E*G+_)*F)}}let D=new O9;if(D.setAttribute("position",new e9(O,F)),D.setAttribute("outputDirection",new e9(V,F)),Q.push(new h(D,null)),Z>u6)Z--}return{lodMeshes:Q,sizeLods:$}}function LY(J,$,Q){let Z=new X7(J,$,Q);return Z.texture.mapping=A$,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function p6(J,$,Q,Z,K){J.viewport.set($,Q,Z,K),J.scissor.set($,Q,Z,K)}function $1(J,$,Q){return new h9({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:tq,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Q,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:BZ(),fragmentShader:`

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
		`,blending:x7,depthTest:!1,depthWrite:!1})}function Q1(J,$,Q){return new h9({name:"SphericalGaussianBlur",defines:{SAMPLES:rq,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Q,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:BZ(),fragmentShader:`

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
		`,blending:x7,depthTest:!1,depthWrite:!1})}function PY(){return new h9({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:BZ(),fragmentShader:`

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
		`,blending:x7,depthTest:!1,depthWrite:!1})}function wY(){return new h9({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:BZ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:x7,depthTest:!1,depthWrite:!1})}function BZ(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class lU extends X7{constructor(J=1,$={}){super(J,J,$);this.isWebGLCubeRenderTarget=!0;let Q={width:J,height:J,depth:1},Z=[Q,Q,Q,Q,Q,Q];this.texture=new WZ(Z),this._setTextureOptions($),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,$){this.texture.type=$.type,this.texture.colorSpace=$.colorSpace,this.texture.generateMipmaps=$.generateMipmaps,this.texture.minFilter=$.minFilter,this.texture.magFilter=$.magFilter;let Q={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new _0(5,5,5),K=new h9({name:"CubemapFromEquirect",uniforms:dJ(Q.uniforms),vertexShader:Q.vertexShader,fragmentShader:Q.fragmentShader,side:E7,blending:x7});K.uniforms.tEquirect.value=$;let U=new h(Z,K),H=$.minFilter;if($.minFilter===fJ)$.minFilter=h7;return new TU(1,10,this).update(J,U),$.minFilter=H,U.geometry.dispose(),U.material.dispose(),this}clear(J,$=!0,Q=!0,Z=!0){let K=J.getRenderTarget();for(let U=0;U<6;U++)J.setRenderTarget(this,U),J.clear($,Q,Z);J.setRenderTarget(K)}}function Z1(J){let $=new WeakMap,Q=new WeakMap,Z=null;function K(G,F=!1){if(G===null||G===void 0)return null;if(F)return H(G);return U(G)}function U(G){if(G&&G.isTexture){let F=G.mapping;if(F===cQ||F===nQ)if($.has(G)){let O=$.get(G).texture;return W(O,G.mapping)}else{let O=G.image;if(O&&O.height>0){let V=new lU(O.height);return V.fromEquirectangularTexture(J,G),$.set(G,V),G.addEventListener("dispose",N),W(V.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let F=G.mapping,O=F===cQ||F===nQ,V=F===k6||F===yJ;if(O||V){let D=Q.get(G),E=D!==void 0?D.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==E){if(Z===null)Z=new uU(J);return D=O?Z.fromEquirectangular(G,D):Z.fromCubemap(G,D),D.texture.pmremVersion=G.pmremVersion,Q.set(G,D),D.texture}else if(D!==void 0)return D.texture;else{let C=G.image;if(O&&C&&C.height>0||V&&C&&Y(C)){if(Z===null)Z=new uU(J);return D=O?Z.fromEquirectangular(G):Z.fromCubemap(G),D.texture.pmremVersion=G.pmremVersion,Q.set(G,D),G.addEventListener("dispose",X),D.texture}else return null}}}return G}function W(G,F){if(F===cQ)G.mapping=k6;else if(F===nQ)G.mapping=yJ;return G}function Y(G){let F=0,O=6;for(let V=0;V<O;V++)if(G[V]!==void 0)F++;return F===O}function N(G){let F=G.target;F.removeEventListener("dispose",N);let O=$.get(F);if(O!==void 0)$.delete(F),O.dispose()}function X(G){let F=G.target;F.removeEventListener("dispose",X);let O=Q.get(F);if(O!==void 0)Q.delete(F),O.dispose()}function q(){if($=new WeakMap,Q=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:K,dispose:q}}function K1(J){let $={};function Q(Z){if($[Z]!==void 0)return $[Z];let K=J.getExtension(Z);return $[Z]=K,K}return{has:function(Z){return Q(Z)!==null},init:function(){Q("EXT_color_buffer_float"),Q("WEBGL_clip_cull_distance"),Q("OES_texture_float_linear"),Q("EXT_color_buffer_half_float"),Q("WEBGL_multisampled_render_to_texture"),Q("WEBGL_render_shared_exponent")},get:function(Z){let K=Q(Z);if(K===null)jJ("WebGLRenderer: "+Z+" extension not supported.");return K}}}function U1(J,$,Q,Z){let K={},U=new WeakMap;function H(q){let G=q.target;if(G.index!==null)$.remove(G.index);for(let O in G.attributes)$.remove(G.attributes[O]);G.removeEventListener("dispose",H),delete K[G.id];let F=U.get(G);if(F)$.remove(F),U.delete(G);if(Z.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;Q.memory.geometries--}function W(q,G){if(K[G.id]===!0)return G;return G.addEventListener("dispose",H),K[G.id]=!0,Q.memory.geometries++,G}function Y(q){let G=q.attributes;for(let F in G)$.update(G[F],J.ARRAY_BUFFER)}function N(q){let G=[],F=q.index,O=q.attributes.position,V=0;if(O===void 0)return;if(F!==null){let C=F.array;V=F.version;for(let L=0,R=C.length;L<R;L+=3){let _=C[L+0],B=C[L+1],A=C[L+2];G.push(_,B,B,A,A,_)}}else{let C=O.array;V=O.version;for(let L=0,R=C.length/3-1;L<R;L+=3){let _=L+0,B=L+1,A=L+2;G.push(_,B,B,A,A,_)}}let D=new(O.count>=65535?HZ:UZ)(G,1);D.version=V;let E=U.get(q);if(E)$.remove(E);U.set(q,D)}function X(q){let G=U.get(q);if(G){let F=q.index;if(F!==null){if(G.version<F.version)N(q)}}else N(q);return U.get(q)}return{get:W,update:Y,getWireframeAttribute:X}}function H1(J,$,Q){let Z;function K(q){Z=q}let U,H;function W(q){U=q.type,H=q.bytesPerElement}function Y(q,G){J.drawElements(Z,G,U,q*H),Q.update(G,Z,1)}function N(q,G,F){if(F===0)return;J.drawElementsInstanced(Z,G,U,q*H,F),Q.update(G,Z,F)}function X(q,G,F){if(F===0)return;$.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,G,0,U,q,0,F);let V=0;for(let D=0;D<F;D++)V+=G[D];Q.update(V,Z,1)}this.setMode=K,this.setIndex=W,this.render=Y,this.renderInstances=N,this.renderMultiDraw=X}function W1(J){let $={geometries:0,textures:0},Q={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(U,H,W){switch(Q.calls++,H){case J.TRIANGLES:Q.triangles+=W*(U/3);break;case J.LINES:Q.lines+=W*(U/2);break;case J.LINE_STRIP:Q.lines+=W*(U-1);break;case J.LINE_LOOP:Q.lines+=W*U;break;case J.POINTS:Q.points+=W*U;break;default:U9("WebGLInfo: Unknown draw mode:",H);break}}function K(){Q.calls=0,Q.triangles=0,Q.points=0,Q.lines=0}return{memory:$,render:Q,programs:null,autoReset:!0,reset:K,update:Z}}function Y1(J,$,Q){let Z=new WeakMap,K=new K7;function U(H,W,Y){let N=H.morphTargetInfluences,X=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,q=X!==void 0?X.length:0,G=Z.get(W);if(G===void 0||G.count!==q){let I=function(){A.dispose(),Z.delete(W),W.removeEventListener("dispose",I)};if(G!==void 0)G.texture.dispose();let F=W.morphAttributes.position!==void 0,O=W.morphAttributes.normal!==void 0,V=W.morphAttributes.color!==void 0,D=W.morphAttributes.position||[],E=W.morphAttributes.normal||[],C=W.morphAttributes.color||[],L=0;if(F===!0)L=1;if(O===!0)L=2;if(V===!0)L=3;let R=W.attributes.position.count*L,_=1;if(R>$.maxTextureSize)_=Math.ceil(R/$.maxTextureSize),R=$.maxTextureSize;let B=new Float32Array(R*_*4*q),A=new ZZ(B,R,_,q);A.type=o8,A.needsUpdate=!0;let M=L*4;for(let y=0;y<q;y++){let S=D[y],f=E[y],t=C[y],v=R*_*4*y;for(let l=0;l<S.count;l++){let Q0=l*M;if(F===!0)K.fromBufferAttribute(S,l),B[v+Q0+0]=K.x,B[v+Q0+1]=K.y,B[v+Q0+2]=K.z,B[v+Q0+3]=0;if(O===!0)K.fromBufferAttribute(f,l),B[v+Q0+4]=K.x,B[v+Q0+5]=K.y,B[v+Q0+6]=K.z,B[v+Q0+7]=0;if(V===!0)K.fromBufferAttribute(t,l),B[v+Q0+8]=K.x,B[v+Q0+9]=K.y,B[v+Q0+10]=K.z,B[v+Q0+11]=t.itemSize===4?K.w:1}}G={count:q,texture:A,size:new G0(R,_)},Z.set(W,G),W.addEventListener("dispose",I)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)Y.getUniforms().setValue(J,"morphTexture",H.morphTexture,Q);else{let F=0;for(let V=0;V<N.length;V++)F+=N[V];let O=W.morphTargetsRelative?1:1-F;Y.getUniforms().setValue(J,"morphTargetBaseInfluence",O),Y.getUniforms().setValue(J,"morphTargetInfluences",N)}Y.getUniforms().setValue(J,"morphTargetsTexture",G.texture,Q),Y.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:U}}function N1(J,$,Q,Z,K){let U=new WeakMap;function H(N){let X=K.render.frame,q=N.geometry,G=$.get(N,q);if(U.get(G)!==X)$.update(G),U.set(G,X);if(N.isInstancedMesh){if(N.hasEventListener("dispose",Y)===!1)N.addEventListener("dispose",Y);if(U.get(N)!==X){if(Q.update(N.instanceMatrix,J.ARRAY_BUFFER),N.instanceColor!==null)Q.update(N.instanceColor,J.ARRAY_BUFFER);U.set(N,X)}}if(N.isSkinnedMesh){let F=N.skeleton;if(U.get(F)!==X)F.update(),U.set(F,X)}return G}function W(){U=new WeakMap}function Y(N){let X=N.target;if(X.removeEventListener("dispose",Y),Z.releaseStatesOfObject(X),Q.remove(X.instanceMatrix),X.instanceColor!==null)Q.remove(X.instanceColor)}return{update:H,dispose:W}}var X1={[M$]:"LINEAR_TONE_MAPPING",[V$]:"REINHARD_TONE_MAPPING",[_$]:"CINEON_TONE_MAPPING",[G8]:"ACES_FILMIC_TONE_MAPPING",[I$]:"AGX_TONE_MAPPING",[C$]:"NEUTRAL_TONE_MAPPING",[B$]:"CUSTOM_TONE_MAPPING"};function G1(J,$,Q,Z,K,U){let H=new X7($,Q,{type:J,depthBuffer:K,stencilBuffer:U,samples:Z?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),W=null,Y=null,N=new O9;N.setAttribute("position",new Q9([-1,3,0,-1,-1,0,3,-1,0],3)),N.setAttribute("uv",new Q9([0,2,0,0,2,0],2));let X=new b$({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),q=new h(N,X),G=new sJ(-1,1,1,-1,0,1),F=null,O=null,V=!1,D,E=null,C=[],L=!1;this.setSize=function(R,_){if(H.setSize(R,_),W!==null)W.setSize(R,_);if(Y!==null)Y.setSize(R,_);for(let B=0;B<C.length;B++){let A=C[B];if(A.setSize)A.setSize(R,_)}},this.setEffects=function(R){C=R,L=C.length>0&&C[0].isRenderPass===!0;let{width:_,height:B}=H;if(C.length>0&&W===null)W=new X7(_,B,{type:I7,depthBuffer:!1,stencilBuffer:!1}),Y=new X7(_,B,{type:I7,depthBuffer:!1,stencilBuffer:!1});for(let A=0;A<C.length;A++){let M=C[A];if(M.setSize)M.setSize(_,B)}},this.begin=function(R,_){if(V)return!1;if(R.toneMapping===X8&&C.length===0)return!1;if(E=_,_!==null){let{width:B,height:A}=_;if(H.width!==B||H.height!==A)this.setSize(B,A)}if(L===!1)R.setRenderTarget(H);return D=R.toneMapping,R.toneMapping=X8,!0},this.hasRenderPass=function(){return L},this.end=function(R,_){R.toneMapping=D,V=!0;let B=H,A=W;for(let M=0;M<C.length;M++){let I=C[M];if(I.enabled===!1)continue;if(I.render(R,A,B,_),I.needsSwap!==!1)B=A,A=A===W?Y:W}if(F!==R.outputColorSpace||O!==R.toneMapping){if(F=R.outputColorSpace,O=R.toneMapping,X.defines={},_9.getTransfer(F)===c9)X.defines.SRGB_TRANSFER="";let M=X1[O];if(M)X.defines[M]="";X.needsUpdate=!0}X.uniforms.tDiffuse.value=B.texture,R.setRenderTarget(E),R.render(q,G),E=null,V=!1},this.isCompositing=function(){return V},this.dispose=function(){if(H.dispose(),W!==null)W.dispose();if(Y!==null)Y.dispose();N.dispose(),X.dispose()}}var iY=new P7,mU=new uJ(1,1),oY=new ZZ,aY=new NU,rY=new WZ,TY=[],SY=[],kY=new Float32Array(16),jY=new Float32Array(9),vY=new Float32Array(4);function m6(J,$,Q){let Z=J[0];if(Z<=0||Z>0)return J;let K=$*Q,U=TY[K];if(U===void 0)U=new Float32Array(K),TY[K]=U;if($!==0){Z.toArray(U,0);for(let H=1,W=0;H!==$;++H)W+=Q,J[H].toArray(U,W)}return U}function V7(J,$){if(J.length!==$.length)return!1;for(let Q=0,Z=J.length;Q<Z;Q++)if(J[Q]!==$[Q])return!1;return!0}function _7(J,$){for(let Q=0,Z=$.length;Q<Z;Q++)J[Q]=$[Q]}function IZ(J,$){let Q=SY[$];if(Q===void 0)Q=new Int32Array($),SY[$]=Q;for(let Z=0;Z!==$;++Z)Q[Z]=J.allocateTextureUnit();return Q}function q1(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1f(this.addr,$),Q[0]=$}function F1(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2f(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(V7(Q,$))return;J.uniform2fv(this.addr,$),_7(Q,$)}}function D1(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3f(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else if($.r!==void 0){if(Q[0]!==$.r||Q[1]!==$.g||Q[2]!==$.b)J.uniform3f(this.addr,$.r,$.g,$.b),Q[0]=$.r,Q[1]=$.g,Q[2]=$.b}else{if(V7(Q,$))return;J.uniform3fv(this.addr,$),_7(Q,$)}}function E1(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4f(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(V7(Q,$))return;J.uniform4fv(this.addr,$),_7(Q,$)}}function O1(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(V7(Q,$))return;J.uniformMatrix2fv(this.addr,!1,$),_7(Q,$)}else{if(V7(Q,Z))return;vY.set(Z),J.uniformMatrix2fv(this.addr,!1,vY),_7(Q,Z)}}function R1(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(V7(Q,$))return;J.uniformMatrix3fv(this.addr,!1,$),_7(Q,$)}else{if(V7(Q,Z))return;jY.set(Z),J.uniformMatrix3fv(this.addr,!1,jY),_7(Q,Z)}}function M1(J,$){let Q=this.cache,Z=$.elements;if(Z===void 0){if(V7(Q,$))return;J.uniformMatrix4fv(this.addr,!1,$),_7(Q,$)}else{if(V7(Q,Z))return;kY.set(Z),J.uniformMatrix4fv(this.addr,!1,kY),_7(Q,Z)}}function V1(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1i(this.addr,$),Q[0]=$}function _1(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2i(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(V7(Q,$))return;J.uniform2iv(this.addr,$),_7(Q,$)}}function B1(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3i(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(V7(Q,$))return;J.uniform3iv(this.addr,$),_7(Q,$)}}function I1(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4i(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(V7(Q,$))return;J.uniform4iv(this.addr,$),_7(Q,$)}}function C1(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1ui(this.addr,$),Q[0]=$}function A1(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2ui(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(V7(Q,$))return;J.uniform2uiv(this.addr,$),_7(Q,$)}}function z1(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3ui(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(V7(Q,$))return;J.uniform3uiv(this.addr,$),_7(Q,$)}}function L1(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4ui(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(V7(Q,$))return;J.uniform4uiv(this.addr,$),_7(Q,$)}}function P1(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;let U;if(this.type===J.SAMPLER_2D_SHADOW)mU.compareFunction=Q.isReversedDepthBuffer()?QZ:$Z,U=mU;else U=iY;Q.setTexture2D($||U,K)}function w1(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTexture3D($||aY,K)}function T1(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTextureCube($||rY,K)}function S1(J,$,Q){let Z=this.cache,K=Q.allocateTextureUnit();if(Z[0]!==K)J.uniform1i(this.addr,K),Z[0]=K;Q.setTexture2DArray($||oY,K)}function k1(J){switch(J){case 5126:return q1;case 35664:return F1;case 35665:return D1;case 35666:return E1;case 35674:return O1;case 35675:return R1;case 35676:return M1;case 5124:case 35670:return V1;case 35667:case 35671:return _1;case 35668:case 35672:return B1;case 35669:case 35673:return I1;case 5125:return C1;case 36294:return A1;case 36295:return z1;case 36296:return L1;case 35678:case 36198:case 36298:case 36306:case 35682:return P1;case 35679:case 36299:case 36307:return w1;case 35680:case 36300:case 36308:case 36293:return T1;case 36289:case 36303:case 36311:case 36292:return S1}}function j1(J,$){J.uniform1fv(this.addr,$)}function v1(J,$){let Q=m6($,this.size,2);J.uniform2fv(this.addr,Q)}function y1(J,$){let Q=m6($,this.size,3);J.uniform3fv(this.addr,Q)}function f1(J,$){let Q=m6($,this.size,4);J.uniform4fv(this.addr,Q)}function b1(J,$){let Q=m6($,this.size,4);J.uniformMatrix2fv(this.addr,!1,Q)}function x1(J,$){let Q=m6($,this.size,9);J.uniformMatrix3fv(this.addr,!1,Q)}function h1(J,$){let Q=m6($,this.size,16);J.uniformMatrix4fv(this.addr,!1,Q)}function g1(J,$){J.uniform1iv(this.addr,$)}function p1(J,$){J.uniform2iv(this.addr,$)}function u1(J,$){J.uniform3iv(this.addr,$)}function m1(J,$){J.uniform4iv(this.addr,$)}function d1(J,$){J.uniform1uiv(this.addr,$)}function l1(J,$){J.uniform2uiv(this.addr,$)}function c1(J,$){J.uniform3uiv(this.addr,$)}function n1(J,$){J.uniform4uiv(this.addr,$)}function s1(J,$,Q){let Z=this.cache,K=$.length,U=IZ(Q,K);if(!V7(Z,U))J.uniform1iv(this.addr,U),_7(Z,U);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=mU;else H=iY;for(let W=0;W!==K;++W)Q.setTexture2D($[W]||H,U[W])}function i1(J,$,Q){let Z=this.cache,K=$.length,U=IZ(Q,K);if(!V7(Z,U))J.uniform1iv(this.addr,U),_7(Z,U);for(let H=0;H!==K;++H)Q.setTexture3D($[H]||aY,U[H])}function o1(J,$,Q){let Z=this.cache,K=$.length,U=IZ(Q,K);if(!V7(Z,U))J.uniform1iv(this.addr,U),_7(Z,U);for(let H=0;H!==K;++H)Q.setTextureCube($[H]||rY,U[H])}function a1(J,$,Q){let Z=this.cache,K=$.length,U=IZ(Q,K);if(!V7(Z,U))J.uniform1iv(this.addr,U),_7(Z,U);for(let H=0;H!==K;++H)Q.setTexture2DArray($[H]||oY,U[H])}function r1(J){switch(J){case 5126:return j1;case 35664:return v1;case 35665:return y1;case 35666:return f1;case 35674:return b1;case 35675:return x1;case 35676:return h1;case 5124:case 35670:return g1;case 35667:case 35671:return p1;case 35668:case 35672:return u1;case 35669:case 35673:return m1;case 5125:return d1;case 36294:return l1;case 36295:return c1;case 36296:return n1;case 35678:case 36198:case 36298:case 36306:case 35682:return s1;case 35679:case 36299:case 36307:return i1;case 35680:case 36300:case 36308:case 36293:return o1;case 36289:case 36303:case 36311:case 36292:return a1}}class tY{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.setValue=k1($.type)}}class eY{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.size=$.size,this.setValue=r1($.type)}}class J5{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,$,Q){let Z=this.seq;for(let K=0,U=Z.length;K!==U;++K){let H=Z[K];H.setValue(J,$[H.id],Q)}}}var gU=/(\w+)(\])?(\[|\.)?/g;function yY(J,$){J.seq.push($),J.map[$.id]=$}function t1(J,$,Q){let Z=J.name,K=Z.length;gU.lastIndex=0;while(!0){let U=gU.exec(Z),H=gU.lastIndex,W=U[1],Y=U[2]==="]",N=U[3];if(Y)W=W|0;if(N===void 0||N==="["&&H+2===K){yY(Q,N===void 0?new tY(W,J,$):new eY(W,J,$));break}else{let q=Q.map[W];if(q===void 0)q=new J5(W),yY(Q,q);Q=q}}}class m${constructor(J,$){this.seq=[],this.map={};let Q=J.getProgramParameter($,J.ACTIVE_UNIFORMS);for(let U=0;U<Q;++U){let H=J.getActiveUniform($,U),W=J.getUniformLocation($,H.name);t1(H,W,this)}let Z=[],K=[];for(let U of this.seq)if(U.type===J.SAMPLER_2D_SHADOW||U.type===J.SAMPLER_CUBE_SHADOW||U.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(U);else K.push(U);if(Z.length>0)this.seq=Z.concat(K)}setValue(J,$,Q,Z){let K=this.map[$];if(K!==void 0)K.setValue(J,Q,Z)}setOptional(J,$,Q){let Z=$[Q];if(Z!==void 0)this.setValue(J,Q,Z)}static upload(J,$,Q,Z){for(let K=0,U=$.length;K!==U;++K){let H=$[K],W=Q[H.id];if(W.needsUpdate!==!1)H.setValue(J,W.value,Z)}}static seqWithValue(J,$){let Q=[];for(let Z=0,K=J.length;Z!==K;++Z){let U=J[Z];if(U.id in $)Q.push(U)}return Q}}function fY(J,$,Q){let Z=J.createShader($);return J.shaderSource(Z,Q),J.compileShader(Z),Z}var e1=37297,JF=0;function $F(J,$){let Q=J.split(`
`),Z=[],K=Math.max($-6,0),U=Math.min($+6,Q.length);for(let H=K;H<U;H++){let W=H+1;Z.push(`${W===$?">":" "} ${W}: ${Q[H]}`)}return Z.join(`
`)}var bY=new X9;function QF(J){_9._getMatrix(bY,_9.workingColorSpace,J);let $=`mat3( ${bY.elements.map((Q)=>Q.toFixed(4))} )`;switch(_9.getTransfer(J)){case KU:return[$,"LinearTransferOETF"];case c9:return[$,"sRGBTransferOETF"];default:return $9("WebGLProgram: Unsupported color space: ",J),[$,"LinearTransferOETF"]}}function xY(J,$,Q){let Z=J.getShaderParameter($,J.COMPILE_STATUS),U=(J.getShaderInfoLog($)||"").trim();if(Z&&U==="")return"";let H=/ERROR: 0:(\d+)/.exec(U);if(H){let W=parseInt(H[1]);return Q.toUpperCase()+`

`+U+`

`+$F(J.getShaderSource($),W)}else return U}function ZF(J,$){let Q=QF($);return[`vec4 ${J}( vec4 value ) {`,`	return ${Q[1]}( vec4( value.rgb * ${Q[0]}, value.a ) );`,"}"].join(`
`)}var KF={[M$]:"Linear",[V$]:"Reinhard",[_$]:"Cineon",[G8]:"ACESFilmic",[I$]:"AgX",[C$]:"Neutral",[B$]:"Custom"};function UF(J,$){let Q=KF[$];if(Q===void 0)return $9("WebGLProgram: Unsupported toneMapping:",$),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+Q+"ToneMapping( color ); }"}var _Z=new k;function HF(){_9.getLuminanceCoefficients(_Z);let J=_Z.x.toFixed(4),$=_Z.y.toFixed(4),Q=_Z.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${$}, ${Q} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function WF(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(u$).join(`
`)}function YF(J){let $=[];for(let Q in J){let Z=J[Q];if(Z===!1)continue;$.push("#define "+Q+" "+Z)}return $.join(`
`)}function NF(J,$){let Q={},Z=J.getProgramParameter($,J.ACTIVE_ATTRIBUTES);for(let K=0;K<Z;K++){let U=J.getActiveAttrib($,K),H=U.name,W=1;if(U.type===J.FLOAT_MAT2)W=2;if(U.type===J.FLOAT_MAT3)W=3;if(U.type===J.FLOAT_MAT4)W=4;Q[H]={type:U.type,location:J.getAttribLocation($,H),locationSize:W}}return Q}function u$(J){return J!==""}function hY(J,$){let Q=$.numSpotLightShadows+$.numSpotLightMaps-$.numSpotLightShadowsWithMaps;return J.replace(/NUM_SUN_LIGHTS/g,$.numSunLights).replace(/NUM_DIR_LIGHTS/g,$.numDirLights).replace(/NUM_SPOT_LIGHTS/g,$.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,$.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Q).replace(/NUM_RECT_AREA_LIGHTS/g,$.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,$.numPointLights).replace(/NUM_HEMI_LIGHTS/g,$.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,$.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,$.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,$.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,$.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,$.numPointLightShadows)}function gY(J,$){return J.replace(/NUM_CLIPPING_PLANES/g,$.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,$.numClippingPlanes-$.numClipIntersection)}var XF=/^[ \t]*#include +<([\w\d./]+)>/gm;function dU(J){return J.replace(XF,qF)}var GF=new Map;function qF(J,$){let Q=M9[$];if(Q===void 0){let Z=GF.get($);if(Z!==void 0)Q=M9[Z],$9('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',$,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+$+">")}return dU(Q)}var FF=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function pY(J){return J.replace(FF,DF)}function DF(J,$,Q,Z){let K="";for(let U=parseInt($);U<parseInt(Q);U++)K+=Z.replace(/\[\s*i\s*\]/g,"[ "+U+" ]").replace(/UNROLLED_LOOP_INDEX/g,U);return K}function uY(J){let $=`precision ${J.precision} float;
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
#define LOW_PRECISION`;return $}var EF={[O$]:"SHADOWMAP_TYPE_PCF",[w6]:"SHADOWMAP_TYPE_VSM"};function OF(J){return EF[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var RF={[k6]:"ENVMAP_TYPE_CUBE",[yJ]:"ENVMAP_TYPE_CUBE",[A$]:"ENVMAP_TYPE_CUBE_UV"};function MF(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return RF[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var VF={[yJ]:"ENVMAP_MODE_REFRACTION"};function _F(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return VF[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var BF={[dW]:"ENVMAP_BLENDING_MULTIPLY",[lW]:"ENVMAP_BLENDING_MIX",[cW]:"ENVMAP_BLENDING_ADD"};function IF(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return BF[J.combine]||"ENVMAP_BLENDING_NONE"}function CF(J){let $=J.envMapCubeUVHeight;if($===null)return null;let Q=Math.log2($)-2,Z=1/$;return{texelWidth:1/(3*Math.max(Math.pow(2,Q),112)),texelHeight:Z,maxMip:Q}}function AF(J,$,Q,Z){let K=J.getContext(),U=Q.defines,H=Q.vertexShader,W=Q.fragmentShader,Y=OF(Q),N=MF(Q),X=_F(Q),q=IF(Q),G=CF(Q),F=WF(Q),O=YF(U),V=K.createProgram(),D,E,C=Q.glslVersion?"#version "+Q.glslVersion+`
`:"";if(Q.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,O].filter(u$).join(`
`),D.length>0)D+=`
`;if(E=["#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,O].filter(u$).join(`
`),E.length>0)E+=`
`}else D=[uY(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,O,Q.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Q.batching?"#define USE_BATCHING":"",Q.batchingColor?"#define USE_BATCHING_COLOR":"",Q.instancing?"#define USE_INSTANCING":"",Q.instancingColor?"#define USE_INSTANCING_COLOR":"",Q.instancingMorph?"#define USE_INSTANCING_MORPH":"",Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.map?"#define USE_MAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+X:"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.displacementMap?"#define USE_DISPLACEMENTMAP":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.mapUv?"#define MAP_UV "+Q.mapUv:"",Q.alphaMapUv?"#define ALPHAMAP_UV "+Q.alphaMapUv:"",Q.lightMapUv?"#define LIGHTMAP_UV "+Q.lightMapUv:"",Q.aoMapUv?"#define AOMAP_UV "+Q.aoMapUv:"",Q.emissiveMapUv?"#define EMISSIVEMAP_UV "+Q.emissiveMapUv:"",Q.bumpMapUv?"#define BUMPMAP_UV "+Q.bumpMapUv:"",Q.normalMapUv?"#define NORMALMAP_UV "+Q.normalMapUv:"",Q.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Q.displacementMapUv:"",Q.metalnessMapUv?"#define METALNESSMAP_UV "+Q.metalnessMapUv:"",Q.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Q.roughnessMapUv:"",Q.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Q.anisotropyMapUv:"",Q.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Q.clearcoatMapUv:"",Q.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Q.clearcoatNormalMapUv:"",Q.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Q.clearcoatRoughnessMapUv:"",Q.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Q.iridescenceMapUv:"",Q.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Q.iridescenceThicknessMapUv:"",Q.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Q.sheenColorMapUv:"",Q.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Q.sheenRoughnessMapUv:"",Q.specularMapUv?"#define SPECULARMAP_UV "+Q.specularMapUv:"",Q.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Q.specularColorMapUv:"",Q.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Q.specularIntensityMapUv:"",Q.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Q.transmissionMapUv:"",Q.thicknessMapUv?"#define THICKNESSMAP_UV "+Q.thicknessMapUv:"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexNormals?"#define HAS_NORMAL":"",Q.vertexColors?"#define USE_COLOR":"",Q.vertexAlphas?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.flatShading?"#define FLAT_SHADED":"",Q.skinning?"#define USE_SKINNING":"",Q.morphTargets?"#define USE_MORPHTARGETS":"",Q.morphNormals&&Q.flatShading===!1?"#define USE_MORPHNORMALS":"",Q.morphColors?"#define USE_MORPHCOLORS":"",Q.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+Q.morphTextureStride:"",Q.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+Q.morphTargetsCount:"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+Y:"",Q.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",Q.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(u$).join(`
`),E=[uY(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,O,Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",Q.map?"#define USE_MAP":"",Q.matcap?"#define USE_MATCAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+N:"",Q.envMap?"#define "+X:"",Q.envMap?"#define "+q:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoat?"#define USE_CLEARCOAT":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.dispersion?"#define USE_DISPERSION":"",Q.retroreflection?"#define USE_RETROREFLECTION":"",Q.iridescence?"#define USE_IRIDESCENCE":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaTest?"#define USE_ALPHATEST":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.sheen?"#define USE_SHEEN":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexColors||Q.instancingColor?"#define USE_COLOR":"",Q.vertexAlphas||Q.batchingColor?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.gradientMap?"#define USE_GRADIENTMAP":"",Q.flatShading?"#define FLAT_SHADED":"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+Y:"",Q.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",Q.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Q.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",Q.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",Q.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Q.toneMapping!==X8?"#define TONE_MAPPING":"",Q.toneMapping!==X8?M9.tonemapping_pars_fragment:"",Q.toneMapping!==X8?UF("toneMapping",Q.toneMapping):"",Q.dithering?"#define DITHERING":"",Q.opaque?"#define OPAQUE":"",M9.colorspace_pars_fragment,ZF("linearToOutputTexel",Q.outputColorSpace),HF(),Q.useDepthPacking?"#define DEPTH_PACKING "+Q.depthPacking:"",`
`].filter(u$).join(`
`);if(H=dU(H),H=hY(H,Q),H=gY(H,Q),W=dU(W),W=hY(W,Q),W=gY(W,Q),H=pY(H),W=pY(W),Q.isRawShaderMaterial!==!0)C=`#version 300 es
`,D=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,E=["#define varying in",Q.glslVersion===UU?"":"layout(location = 0) out highp vec4 pc_fragColor;",Q.glslVersion===UU?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E;let L=C+D+H,R=C+E+W,_=fY(K,K.VERTEX_SHADER,L),B=fY(K,K.FRAGMENT_SHADER,R);if(K.attachShader(V,_),K.attachShader(V,B),Q.index0AttributeName!==void 0)K.bindAttribLocation(V,0,Q.index0AttributeName);else if(Q.hasPositionAttribute===!0)K.bindAttribLocation(V,0,"position");K.linkProgram(V);function A(S){if(J.debug.checkShaderErrors){let f=K.getProgramInfoLog(V)||"",t=K.getShaderInfoLog(_)||"",v=K.getShaderInfoLog(B)||"",l=f.trim(),Q0=t.trim(),s=v.trim(),a=!0,u=!0;if(K.getProgramParameter(V,K.LINK_STATUS)===!1)if(a=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(K,V,_,B);else{let x=xY(K,_,"vertex"),Z0=xY(K,B,"fragment");U9("WebGLProgram: Shader Error "+K.getError()+" - VALIDATE_STATUS "+K.getProgramParameter(V,K.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+l+`
`+x+`
`+Z0)}else if(l!=="")$9("WebGLProgram: Program Info Log:",l);else if(Q0===""||s==="")u=!1;if(u)S.diagnostics={runnable:a,programLog:l,vertexShader:{log:Q0,prefix:D},fragmentShader:{log:s,prefix:E}}}K.deleteShader(_),K.deleteShader(B),M=new m$(K,V),I=NF(K,V)}let M;this.getUniforms=function(){if(M===void 0)A(this);return M};let I;this.getAttributes=function(){if(I===void 0)A(this);return I};let y=Q.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(y===!1)y=K.getProgramParameter(V,e1);return y},this.destroy=function(){Z.releaseStatesOfProgram(this),K.deleteProgram(V),this.program=void 0},this.type=Q.shaderType,this.name=Q.shaderName,this.id=JF++,this.cacheKey=$,this.usedTimes=1,this.program=V,this.vertexShader=_,this.fragmentShader=B,this}var zF=0;class $5{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,$,Q){let Z=this._getShaderCacheForMaterial(J);if(Z.has($)===!1)Z.add($),$.usedTimes++;if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;return this}remove(J){let $=this.materialCache.get(J);for(let Q of $)if(Q.usedTimes--,Q.usedTimes===0)this.shaderCache.delete(Q.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let $=this.materialCache,Q=$.get(J);if(Q===void 0)Q=new Set,$.set(J,Q);return Q}_getShaderStage(J){let $=this.shaderCache,Q=$.get(J);if(Q===void 0)Q=new Q5(J),$.set(J,Q);return Q}}class Q5{constructor(J){this.id=zF++,this.code=J,this.usedTimes=0}}function LF(J){return J===hJ||J===eQ||J===JZ}function PF(J,$,Q,Z,K,U){let H=new KZ,W=new $5,Y=new Set,N=[],X=new Map,q=Z.logarithmicDepthBuffer,G=Z.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function O(M){if(Y.add(M),M===0)return"uv";return`uv${M}`}function V(M,I,y,S,f,t){let v=S.fog,l=f.geometry,Q0=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?S.environment:null,s=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,a=$.get(M.envMap||Q0,s),u=!!a&&a.mapping===A$?a.image.height:null,x=F[M.type];if(M.precision!==null){if(G=Z.getMaxPrecision(M.precision),G!==M.precision)$9("WebGLProgram.getParameters:",M.precision,"not supported, using",G,"instead.")}let Z0=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,O0=Z0!==void 0?Z0.length:0,z0=0;if(l.morphAttributes.position!==void 0)z0=1;if(l.morphAttributes.normal!==void 0)z0=2;if(l.morphAttributes.color!==void 0)z0=3;let d,X0,n,Y0;if(x){let r9=y8[x];d=r9.vertexShader,X0=r9.fragmentShader}else{d=M.vertexShader,X0=M.fragmentShader;let r9=W.getVertexShaderStage(M),p9=W.getFragmentShaderStage(M);W.update(M,r9,p9),n=r9.id,Y0=p9.id}let H0=J.getRenderTarget(),c=J.state.buffers.depth.getReversed(),A0=f.isInstancedMesh===!0,r=f.isBatchedMesh===!0,p0=!!M.map,$0=!!M.matcap,D0=!!a,V0=!!M.aoMap,B0=!!M.lightMap,P0=!!M.bumpMap&&M.wireframe===!1,o0=!!M.normalMap,t0=!!M.displacementMap,q9=!!M.emissiveMap,F9=!!M.metalnessMap,b=!!M.roughnessMap,n9=M.anisotropy>0,V9=M.clearcoat>0,C9=M.dispersion>0,T=M.retroreflectivity>0,z=M.iridescence>0,g=M.sheen>0,e=M.transmission>0,R0=n9&&!!M.anisotropyMap,I0=V9&&!!M.clearcoatMap,w0=V9&&!!M.clearcoatNormalMap,U0=V9&&!!M.clearcoatRoughnessMap,q0=z&&!!M.iridescenceMap,h0=z&&!!M.iridescenceThicknessMap,a0=g&&!!M.sheenColorMap,k0=g&&!!M.sheenRoughnessMap,C0=!!M.specularMap,e0=!!M.specularColorMap,Z9=!!M.specularIntensityMap,f9=e&&!!M.transmissionMap,m=e&&!!M.thicknessMap,T0=!!M.gradientMap,N0=!!M.alphaMap,S0=M.alphaTest>0,u0=!!M.alphaHash,M0=!!M.extensions,f0=X8;if(M.toneMapped){if(H0===null||H0.isXRRenderTarget===!0)f0=J.toneMapping}let D9={shaderID:x,shaderType:M.type,shaderName:M.name,vertexShader:d,fragmentShader:X0,defines:M.defines,customVertexShaderID:n,customFragmentShaderID:Y0,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:G,batching:r,batchingColor:r&&f._colorsTexture!==null,instancing:A0,instancingColor:A0&&f.instanceColor!==null,instancingMorph:A0&&f.morphTexture!==null,outputColorSpace:H0===null?J.outputColorSpace:H0.isXRRenderTarget===!0?H0.texture.colorSpace:_9.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:p0,matcap:$0,envMap:D0,envMapMode:D0&&a.mapping,envMapCubeUVHeight:u,aoMap:V0,lightMap:B0,bumpMap:P0,normalMap:o0,displacementMap:t0,emissiveMap:q9,normalMapObjectSpace:o0&&M.normalMapType===$Y,normalMapTangentSpace:o0&&M.normalMapType===QU,packedNormalMap:o0&&M.normalMapType===QU&&LF(M.normalMap.format),metalnessMap:F9,roughnessMap:b,anisotropy:n9,anisotropyMap:R0,clearcoat:V9,clearcoatMap:I0,clearcoatNormalMap:w0,clearcoatRoughnessMap:U0,dispersion:C9,retroreflection:T,iridescence:z,iridescenceMap:q0,iridescenceThicknessMap:h0,sheen:g,sheenColorMap:a0,sheenRoughnessMap:k0,specularMap:C0,specularColorMap:e0,specularIntensityMap:Z9,transmission:e,transmissionMap:f9,thicknessMap:m,gradientMap:T0,opaque:M.transparent===!1&&M.blending===R$&&M.alphaToCoverage===!1,alphaMap:N0,alphaTest:S0,alphaHash:u0,combine:M.combine,mapUv:p0&&O(M.map.channel),aoMapUv:V0&&O(M.aoMap.channel),lightMapUv:B0&&O(M.lightMap.channel),bumpMapUv:P0&&O(M.bumpMap.channel),normalMapUv:o0&&O(M.normalMap.channel),displacementMapUv:t0&&O(M.displacementMap.channel),emissiveMapUv:q9&&O(M.emissiveMap.channel),metalnessMapUv:F9&&O(M.metalnessMap.channel),roughnessMapUv:b&&O(M.roughnessMap.channel),anisotropyMapUv:R0&&O(M.anisotropyMap.channel),clearcoatMapUv:I0&&O(M.clearcoatMap.channel),clearcoatNormalMapUv:w0&&O(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U0&&O(M.clearcoatRoughnessMap.channel),iridescenceMapUv:q0&&O(M.iridescenceMap.channel),iridescenceThicknessMapUv:h0&&O(M.iridescenceThicknessMap.channel),sheenColorMapUv:a0&&O(M.sheenColorMap.channel),sheenRoughnessMapUv:k0&&O(M.sheenRoughnessMap.channel),specularMapUv:C0&&O(M.specularMap.channel),specularColorMapUv:e0&&O(M.specularColorMap.channel),specularIntensityMapUv:Z9&&O(M.specularIntensityMap.channel),transmissionMapUv:f9&&O(M.transmissionMap.channel),thicknessMapUv:m&&O(M.thicknessMap.channel),alphaMapUv:N0&&O(M.alphaMap.channel),vertexTangents:!!l.attributes.tangent&&(o0||n9),vertexNormals:!!l.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!l.attributes.color&&l.attributes.color.itemSize===4,pointsUvs:f.isPoints===!0&&!!l.attributes.uv&&(p0||N0),fog:!!v,useFog:M.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||l.attributes.normal===void 0&&o0===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:q,reversedDepthBuffer:c,skinning:f.isSkinnedMesh===!0,hasPositionAttribute:l.attributes.position!==void 0,morphTargets:l.morphAttributes.position!==void 0,morphNormals:l.morphAttributes.normal!==void 0,morphColors:l.morphAttributes.color!==void 0,morphTargetsCount:O0,morphTextureStride:z0,numSunLights:I.sun.length,numDirLights:I.directional.length,numPointLights:I.point.length,numSpotLights:I.spot.length,numSpotLightMaps:I.spotLightMap.length,numRectAreaLights:I.rectArea.length,numHemiLights:I.hemi.length,numSunLightShadows:I.sunShadowMap.length,numDirLightShadows:I.directionalShadowMap.length,numPointLightShadows:I.pointShadowMap.length,numSpotLightShadows:I.spotShadowMap.length,numSpotLightShadowsWithMaps:I.numSpotLightShadowsWithMaps,numLightProbes:I.numLightProbes,numLightProbeGrids:t.length,numClippingPlanes:U.numPlanes,numClipIntersection:U.numIntersection,dithering:M.dithering,shadowMapEnabled:J.shadowMap.enabled&&y.length>0,shadowMapType:J.shadowMap.type,toneMapping:f0,decodeVideoTexture:p0&&M.map.isVideoTexture===!0&&_9.getTransfer(M.map.colorSpace)===c9,decodeVideoTextureEmissive:q9&&M.emissiveMap.isVideoTexture===!0&&_9.getTransfer(M.emissiveMap.colorSpace)===c9,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===m9,flipSided:M.side===E7,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:M0&&M.extensions.clipCullDistance===!0&&Q.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(M0&&M.extensions.multiDraw===!0||r)&&Q.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:Q.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return D9.vertexUv1s=Y.has(1),D9.vertexUv2s=Y.has(2),D9.vertexUv3s=Y.has(3),Y.clear(),D9}function D(M){let I=[];if(M.shaderID)I.push(M.shaderID);else I.push(M.customVertexShaderID),I.push(M.customFragmentShaderID);if(M.defines!==void 0)for(let y in M.defines)I.push(y),I.push(M.defines[y]);if(M.isRawShaderMaterial===!1)E(I,M),C(I,M),I.push(J.outputColorSpace);return I.push(M.customProgramCacheKey),I.join()}function E(M,I){M.push(I.precision),M.push(I.outputColorSpace),M.push(I.envMapMode),M.push(I.envMapCubeUVHeight),M.push(I.mapUv),M.push(I.alphaMapUv),M.push(I.lightMapUv),M.push(I.aoMapUv),M.push(I.bumpMapUv),M.push(I.normalMapUv),M.push(I.displacementMapUv),M.push(I.emissiveMapUv),M.push(I.metalnessMapUv),M.push(I.roughnessMapUv),M.push(I.anisotropyMapUv),M.push(I.clearcoatMapUv),M.push(I.clearcoatNormalMapUv),M.push(I.clearcoatRoughnessMapUv),M.push(I.iridescenceMapUv),M.push(I.iridescenceThicknessMapUv),M.push(I.sheenColorMapUv),M.push(I.sheenRoughnessMapUv),M.push(I.specularMapUv),M.push(I.specularColorMapUv),M.push(I.specularIntensityMapUv),M.push(I.transmissionMapUv),M.push(I.thicknessMapUv),M.push(I.combine),M.push(I.fogExp2),M.push(I.sizeAttenuation),M.push(I.morphTargetsCount),M.push(I.morphAttributeCount),M.push(I.numSunLights),M.push(I.numDirLights),M.push(I.numPointLights),M.push(I.numSpotLights),M.push(I.numSpotLightMaps),M.push(I.numHemiLights),M.push(I.numRectAreaLights),M.push(I.numSunLightShadows),M.push(I.numDirLightShadows),M.push(I.numPointLightShadows),M.push(I.numSpotLightShadows),M.push(I.numSpotLightShadowsWithMaps),M.push(I.numLightProbes),M.push(I.shadowMapType),M.push(I.toneMapping),M.push(I.numClippingPlanes),M.push(I.numClipIntersection),M.push(I.depthPacking)}function C(M,I){if(H.disableAll(),I.instancing)H.enable(0);if(I.instancingColor)H.enable(1);if(I.instancingMorph)H.enable(2);if(I.matcap)H.enable(3);if(I.envMap)H.enable(4);if(I.normalMapObjectSpace)H.enable(5);if(I.normalMapTangentSpace)H.enable(6);if(I.clearcoat)H.enable(7);if(I.iridescence)H.enable(8);if(I.alphaTest)H.enable(9);if(I.vertexColors)H.enable(10);if(I.vertexAlphas)H.enable(11);if(I.vertexUv1s)H.enable(12);if(I.vertexUv2s)H.enable(13);if(I.vertexUv3s)H.enable(14);if(I.vertexTangents)H.enable(15);if(I.anisotropy)H.enable(16);if(I.alphaHash)H.enable(17);if(I.batching)H.enable(18);if(I.dispersion)H.enable(19);if(I.retroreflection)H.enable(24);if(I.batchingColor)H.enable(20);if(I.gradientMap)H.enable(21);if(I.packedNormalMap)H.enable(22);if(I.vertexNormals)H.enable(23);if(M.push(H.mask),H.disableAll(),I.fog)H.enable(0);if(I.useFog)H.enable(1);if(I.flatShading)H.enable(2);if(I.logarithmicDepthBuffer)H.enable(3);if(I.reversedDepthBuffer)H.enable(4);if(I.skinning)H.enable(5);if(I.morphTargets)H.enable(6);if(I.morphNormals)H.enable(7);if(I.morphColors)H.enable(8);if(I.premultipliedAlpha)H.enable(9);if(I.shadowMapEnabled)H.enable(10);if(I.doubleSided)H.enable(11);if(I.flipSided)H.enable(12);if(I.useDepthPacking)H.enable(13);if(I.dithering)H.enable(14);if(I.transmission)H.enable(15);if(I.sheen)H.enable(16);if(I.opaque)H.enable(17);if(I.pointsUvs)H.enable(18);if(I.decodeVideoTexture)H.enable(19);if(I.decodeVideoTextureEmissive)H.enable(20);if(I.alphaToCoverage)H.enable(21);if(I.numLightProbeGrids>0)H.enable(22);if(I.hasPositionAttribute)H.enable(23);M.push(H.mask)}function L(M){let I=F[M.type],y;if(I){let S=y8[I];y=M8.clone(S.uniforms)}else y=M.uniforms;return y}function R(M,I){let y=X.get(I);if(y!==void 0)++y.usedTimes;else y=new AF(J,I,M,K),N.push(y),X.set(I,y);return y}function _(M){if(--M.usedTimes===0){let I=N.indexOf(M);N[I]=N[N.length-1],N.pop(),X.delete(M.cacheKey),M.destroy()}}function B(M){W.remove(M)}function A(){W.dispose()}return{getParameters:V,getProgramCacheKey:D,getUniforms:L,acquireProgram:R,releaseProgram:_,releaseShaderCache:B,programs:N,dispose:A}}function wF(){let J=new WeakMap;function $(H){return J.has(H)}function Q(H){let W=J.get(H);if(W===void 0)W={},J.set(H,W);return W}function Z(H){J.delete(H)}function K(H,W,Y){J.get(H)[W]=Y}function U(){J=new WeakMap}return{has:$,get:Q,remove:Z,update:K,dispose:U}}function TF(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.material.id!==$.material.id)return J.material.id-$.material.id;else if(J.materialVariant!==$.materialVariant)return J.materialVariant-$.materialVariant;else if(J.z!==$.z)return J.z-$.z;else return J.id-$.id}function mY(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.z!==$.z)return $.z-J.z;else return J.id-$.id}function dY(){let J=[],$=0,Q=[],Z=[],K=[];function U(){$=0,Q.length=0,Z.length=0,K.length=0}function H(G){let F=0;if(G.isInstancedMesh)F+=2;if(G.isSkinnedMesh)F+=1;return F}function W(G,F,O,V,D,E){let C=J[$];if(C===void 0)C={id:G.id,object:G,geometry:F,material:O,materialVariant:H(G),groupOrder:V,renderOrder:G.renderOrder,z:D,group:E},J[$]=C;else C.id=G.id,C.object=G,C.geometry=F,C.material=O,C.materialVariant=H(G),C.groupOrder=V,C.renderOrder=G.renderOrder,C.z=D,C.group=E;return $++,C}function Y(G,F,O,V,D,E,C){if(C.reversedDepth===!0)D=-D;let L=W(G,F,O,V,D,E);if(O.transmission>0)Z.push(L);else if(O.transparent===!0)K.push(L);else Q.push(L)}function N(G,F,O,V,D,E){let C=W(G,F,O,V,D,E);if(O.transmission>0)Z.unshift(C);else if(O.transparent===!0)K.unshift(C);else Q.unshift(C)}function X(G,F){if(Q.length>1)Q.sort(G||TF);if(Z.length>1)Z.sort(F||mY);if(K.length>1)K.sort(F||mY)}function q(){for(let G=$,F=J.length;G<F;G++){let O=J[G];if(O.id===null)break;O.id=null,O.object=null,O.geometry=null,O.material=null,O.group=null}}return{opaque:Q,transmissive:Z,transparent:K,init:U,push:Y,unshift:N,finish:q,sort:X}}function SF(){let J=new WeakMap;function $(Z,K){let U=J.get(Z),H;if(U===void 0)H=new dY,J.set(Z,[H]);else if(K>=U.length)H=new dY,U.push(H);else H=U[K];return H}function Q(){J=new WeakMap}return{get:$,dispose:Q}}function kF(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"SunLight":case"DirectionalLight":Q={direction:new k,color:new F0};break;case"SpotLight":Q={position:new k,direction:new k,color:new F0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Q={position:new k,color:new F0,distance:0,decay:0};break;case"HemisphereLight":Q={direction:new k,skyColor:new F0,groundColor:new F0};break;case"RectAreaLight":Q={color:new F0,position:new k,halfWidth:new k,halfHeight:new k};break}return J[$.id]=Q,Q}}}function jF(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"SunLight":case"DirectionalLight":Q={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G0};break;case"SpotLight":Q={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G0};break;case"PointLight":Q={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[$.id]=Q,Q}}}var vF=0;function yF(J,$){return($.castShadow?2:0)-(J.castShadow?2:0)+($.map?1:0)-(J.map?1:0)}function fF(J){let $=new kF,Q=jF(),Z={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let N=0;N<9;N++)Z.probe.push(new k);let K=new k,U=new v9,H=new v9;function W(N){let X=0,q=0,G=0;for(let f=0;f<9;f++)Z.probe[f].set(0,0,0);let F=0,O=0,V=0,D=0,E=0,C=0,L=0,R=0,_=0,B=0,A=0,M=0,I=0,y=0;N.sort(yF);for(let f=0,t=N.length;f<t;f++){let v=N[f],l=v.color,Q0=v.intensity,s=v.distance,a=null;if(v.shadow&&v.shadow.map)if(v.shadow.map.texture.format===hJ)a=v.shadow.map.texture;else a=v.shadow.map.depthTexture||v.shadow.map.texture;if(v.isAmbientLight)X+=l.r*Q0,q+=l.g*Q0,G+=l.b*Q0;else if(v.isLightProbe){for(let u=0;u<9;u++)Z.probe[u].addScaledVector(v.sh.coefficients[u],Q0);y++}else if(v.isSunLight){let u=$.get(v);if(u.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){let x=v.shadow,Z0=Q.get(v);Z0.shadowIntensity=x.intensity,Z0.shadowBias=x.bias,Z0.shadowNormalBias=x.normalBias,Z0.shadowRadius=x.radius,Z0.shadowMapSize.copy(x.mapSize).multiply(x.getFrameExtents()),Z.sunShadow[O]=Z0,Z.sunShadowMap[O]=a;let O0=x.getViewportCount();for(let z0=0;z0<O0;z0++)Z.sunShadowMatrix[V+z0]=x.getMatrix(z0),Z.sunShadowCascade[V+z0]=x._cascadeData[z0];V+=O0,O++}Z.sun[F]=u,F++}else if(v.isDirectionalLight){let u=$.get(v);if(u.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){let x=v.shadow,Z0=Q.get(v);Z0.shadowIntensity=x.intensity,Z0.shadowBias=x.bias,Z0.shadowNormalBias=x.normalBias,Z0.shadowRadius=x.radius,Z0.shadowMapSize=x.mapSize,Z.directionalShadow[D]=Z0,Z.directionalShadowMap[D]=a,Z.directionalShadowMatrix[D]=v.shadow.matrix,_++}Z.directional[D]=u,D++}else if(v.isSpotLight){let u=$.get(v);u.position.setFromMatrixPosition(v.matrixWorld),u.color.copy(l).multiplyScalar(Q0),u.distance=s,u.coneCos=Math.cos(v.angle),u.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),u.decay=v.decay,Z.spot[C]=u;let x=v.shadow;if(v.map){if(Z.spotLightMap[M]=v.map,M++,x.updateMatrices(v),v.castShadow)I++}if(Z.spotLightMatrix[C]=x.matrix,v.castShadow){let Z0=Q.get(v);Z0.shadowIntensity=x.intensity,Z0.shadowBias=x.bias,Z0.shadowNormalBias=x.normalBias,Z0.shadowRadius=x.radius,Z0.shadowMapSize=x.mapSize,Z.spotShadow[C]=Z0,Z.spotShadowMap[C]=a,A++}C++}else if(v.isRectAreaLight){let u=$.get(v);u.color.copy(l).multiplyScalar(Q0),u.halfWidth.set(v.width*0.5,0,0),u.halfHeight.set(0,v.height*0.5,0),Z.rectArea[L]=u,L++}else if(v.isPointLight){let u=$.get(v);if(u.color.copy(v.color).multiplyScalar(v.intensity),u.distance=v.distance,u.decay=v.decay,v.castShadow){let x=v.shadow,Z0=Q.get(v);Z0.shadowIntensity=x.intensity,Z0.shadowBias=x.bias,Z0.shadowNormalBias=x.normalBias,Z0.shadowRadius=x.radius,Z0.shadowMapSize=x.mapSize,Z0.shadowCameraNear=x.camera.near,Z0.shadowCameraFar=x.camera.far,Z.pointShadow[E]=Z0,Z.pointShadowMap[E]=a,Z.pointShadowMatrix[E]=v.shadow.matrix,B++}Z.point[E]=u,E++}else if(v.isHemisphereLight){let u=$.get(v);u.skyColor.copy(v.color).multiplyScalar(Q0),u.groundColor.copy(v.groundColor).multiplyScalar(Q0),Z.hemi[R]=u,R++}}if(L>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=v0.LTC_FLOAT_1,Z.rectAreaLTC2=v0.LTC_FLOAT_2;else Z.rectAreaLTC1=v0.LTC_HALF_1,Z.rectAreaLTC2=v0.LTC_HALF_2;Z.ambient[0]=X,Z.ambient[1]=q,Z.ambient[2]=G;let S=Z.hash;if(S.sunLength!==F||S.directionalLength!==D||S.pointLength!==E||S.spotLength!==C||S.rectAreaLength!==L||S.hemiLength!==R||S.numSunShadows!==O||S.numDirectionalShadows!==_||S.numPointShadows!==B||S.numSpotShadows!==A||S.numSpotMaps!==M||S.numLightProbes!==y)Z.sun.length=F,Z.directional.length=D,Z.spot.length=C,Z.rectArea.length=L,Z.point.length=E,Z.hemi.length=R,Z.sunShadow.length=O,Z.sunShadowMap.length=O,Z.sunShadowMatrix.length=V,Z.sunShadowCascade.length=V,Z.directionalShadow.length=_,Z.directionalShadowMap.length=_,Z.directionalShadowMatrix.length=_,Z.pointShadow.length=B,Z.pointShadowMap.length=B,Z.pointShadowMatrix.length=B,Z.spotShadow.length=A,Z.spotShadowMap.length=A,Z.spotLightMatrix.length=A+M-I,Z.spotLightMap.length=M,Z.numSpotLightShadowsWithMaps=I,Z.numLightProbes=y,S.sunLength=F,S.directionalLength=D,S.pointLength=E,S.spotLength=C,S.rectAreaLength=L,S.hemiLength=R,S.numSunShadows=O,S.numDirectionalShadows=_,S.numPointShadows=B,S.numSpotShadows=A,S.numSpotMaps=M,S.numLightProbes=y,Z.version=vF++}function Y(N,X){let q=0,G=0,F=0,O=0,V=0,D=0,E=X.matrixWorldInverse;for(let C=0,L=N.length;C<L;C++){let R=N[C];if(R.isSunLight){let _=Z.sun[q];_.direction.setFromMatrixPosition(R.matrixWorld),_.direction.transformDirection(E),q++}else if(R.isDirectionalLight){let _=Z.directional[G];_.direction.setFromMatrixPosition(R.matrixWorld),K.setFromMatrixPosition(R.target.matrixWorld),_.direction.sub(K),_.direction.transformDirection(E),G++}else if(R.isSpotLight){let _=Z.spot[O];_.position.setFromMatrixPosition(R.matrixWorld),_.position.applyMatrix4(E),_.direction.setFromMatrixPosition(R.matrixWorld),K.setFromMatrixPosition(R.target.matrixWorld),_.direction.sub(K),_.direction.transformDirection(E),O++}else if(R.isRectAreaLight){let _=Z.rectArea[V];_.position.setFromMatrixPosition(R.matrixWorld),_.position.applyMatrix4(E),H.identity(),U.copy(R.matrixWorld),U.premultiply(E),H.extractRotation(U),_.halfWidth.set(R.width*0.5,0,0),_.halfHeight.set(0,R.height*0.5,0),_.halfWidth.applyMatrix4(H),_.halfHeight.applyMatrix4(H),V++}else if(R.isPointLight){let _=Z.point[F];_.position.setFromMatrixPosition(R.matrixWorld),_.position.applyMatrix4(E),F++}else if(R.isHemisphereLight){let _=Z.hemi[D];_.direction.setFromMatrixPosition(R.matrixWorld),_.direction.transformDirection(E),D++}}}return{setup:W,setupView:Y,state:Z}}function lY(J){let $=new fF(J),Q=[],Z=[],K=[];function U(G){q.camera=G,Q.length=0,Z.length=0,K.length=0}function H(G){Q.push(G)}function W(G){Z.push(G)}function Y(G){K.push(G)}function N(){$.setup(Q)}function X(G){$.setupView(Q,G)}let q={lightsArray:Q,shadowsArray:Z,lightProbeGridArray:K,camera:null,lights:$,transmissionRenderTarget:{},textureUnits:0};return{init:U,state:q,setupLights:N,setupLightsView:X,pushLight:H,pushShadow:W,pushLightProbeGrid:Y}}function bF(J){let $=new WeakMap;function Q(K,U=0){let H=$.get(K),W;if(H===void 0)W=new lY(J),$.set(K,[W]);else if(U>=H.length)W=new lY(J),H.push(W);else W=H[U];return W}function Z(){$=new WeakMap}return{get:Q,dispose:Z}}var xF=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hF=`uniform sampler2D shadow_pass;
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
}`,gF=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],pF=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],cY=new v9,p$=new k,pU=new k;function uF(J,$,Q){let Z=new k$,K=new G0,U=new G0,H=new K7,W=new x$,Y=new MU,N={},X=Q.maxTextureSize,q={[T6]:E7,[E7]:T6,[m9]:m9},G=new h9({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G0},radius:{value:4}},vertexShader:xF,fragmentShader:hF}),F=G.clone();F.defines.HORIZONTAL_PASS=1;let O=new O9;O.setAttribute("position",new e9(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let V=new h(O,G),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=O$;let E=this.type;this.render=function(B,A,M){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(B.length===0)return;if(this.type===BJ)$9("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=O$;let I=J.getRenderTarget(),y=J.getActiveCubeFace(),S=J.getActiveMipmapLevel(),f=J.state;if(f.setBlending(x7),f.buffers.depth.getReversed()===!0)f.buffers.color.setClear(0,0,0,0);else f.buffers.color.setClear(1,1,1,1);f.buffers.depth.setTest(!0),f.setScissorTest(!1);let t=E!==this.type;if(t)A.traverse(function(v){if(v.material)if(Array.isArray(v.material))v.material.forEach((l)=>l.needsUpdate=!0);else v.material.needsUpdate=!0});for(let v=0,l=B.length;v<l;v++){let Q0=B[v],s=Q0.shadow;if(s===void 0){$9("WebGLShadowMap:",Q0,"has no shadow.");continue}if(s.autoUpdate===!1&&s.needsUpdate===!1)continue;K.copy(s.mapSize);let a=s.getFrameExtents();if(K.multiply(a),U.copy(s.mapSize),K.x>X||K.y>X){if(K.x>X)U.x=Math.floor(X/a.x),K.x=U.x*a.x,s.mapSize.x=U.x;if(K.y>X)U.y=Math.floor(X/a.y),K.y=U.y*a.y,s.mapSize.y=U.y}let u=J.state.buffers.depth.getReversed();if(s.camera._reversedDepth=u,s.map===null||t===!0){if(s.map!==null){if(s.map.depthTexture!==null)s.map.depthTexture.dispose(),s.map.depthTexture=null;s.map.dispose()}if(this.type===w6){if(Q0.isPointLight){$9("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}s.map=new X7(K.x,K.y,{format:hJ,type:I7,minFilter:h7,magFilter:h7,generateMipmaps:!1}),s.map.texture.name=Q0.name+".shadowMap",s.map.depthTexture=new uJ(K.x,K.y,o8),s.map.depthTexture.name=Q0.name+".shadowMapDepth",s.map.depthTexture.format=bJ,s.map.depthTexture.compareFunction=null,s.map.depthTexture.minFilter=a7,s.map.depthTexture.magFilter=a7}else{if(Q0.isPointLight)s.map=new lU(K.x),s.map.depthTexture=new qU(K.x,IJ);else s.map=new X7(K.x,K.y),s.map.depthTexture=new uJ(K.x,K.y,IJ);if(s.map.depthTexture.name=Q0.name+".shadowMap",s.map.depthTexture.format=bJ,this.type===O$)s.map.depthTexture.compareFunction=u?QZ:$Z,s.map.depthTexture.minFilter=h7,s.map.depthTexture.magFilter=h7;else s.map.depthTexture.compareFunction=null,s.map.depthTexture.minFilter=a7,s.map.depthTexture.magFilter=a7}s.camera.updateProjectionMatrix()}if(s.map.isWebGLCubeRenderTarget!==!0&&(s.map.width!==K.x||s.map.height!==K.y))s.map.setSize(K.x,K.y);let x=s.map.isWebGLCubeRenderTarget?6:s.getViewportCount();if(Q0.isPointLight!==!0)s.updateMatrices(Q0,M);for(let Z0=0;Z0<x;Z0++){let O0=s.getCamera(Z0);if(Q0.isPointLight){let{camera:z0,matrix:d}=s,X0=Q0.distance||z0.far;if(X0!==z0.far)z0.far=X0,z0.updateProjectionMatrix();p$.setFromMatrixPosition(Q0.matrixWorld),z0.position.copy(p$),pU.copy(z0.position),pU.add(gF[Z0]),z0.up.copy(pF[Z0]),z0.lookAt(pU),z0.updateMatrixWorld(),d.makeTranslation(-p$.x,-p$.y,-p$.z),cY.multiplyMatrices(z0.projectionMatrix,z0.matrixWorldInverse),s._frustum.setFromProjectionMatrix(cY,z0.coordinateSystem,z0.reversedDepth)}if(s.map.isWebGLCubeRenderTarget)J.setRenderTarget(s.map,Z0),J.clear();else{if(Z0===0)J.setRenderTarget(s.map),J.clear();let z0=s.getViewport(Z0);H.set(U.x*z0.x,U.y*z0.y,U.x*z0.z,U.y*z0.w),f.viewport(H)}Z=s.getFrustum(Z0),R(A,M,O0,Q0,this.type)}if(s.isPointLightShadow!==!0&&this.type===w6)C(s,M);s.needsUpdate=!1}E=this.type,D.needsUpdate=!1,J.setRenderTarget(I,y,S)};function C(B,A){let M=$.update(V);if(G.defines.VSM_SAMPLES!==B.blurSamples)G.defines.VSM_SAMPLES=B.blurSamples,F.defines.VSM_SAMPLES=B.blurSamples,G.needsUpdate=!0,F.needsUpdate=!0;if(B.mapPass===null)B.mapPass=new X7(K.x,K.y,{format:hJ,type:I7});else if(B.mapPass.width!==B.map.width||B.mapPass.height!==B.map.height)B.mapPass.setSize(B.map.width,B.map.height);G.uniforms.shadow_pass.value=B.map.depthTexture,G.uniforms.resolution.value.set(B.map.width,B.map.height),G.uniforms.radius.value=B.radius,J.setRenderTarget(B.mapPass),J.clear(),J.renderBufferDirect(A,null,M,G,V,null),F.uniforms.shadow_pass.value=B.mapPass.texture,F.uniforms.resolution.value.set(B.map.width,B.map.height),F.uniforms.radius.value=B.radius,J.setRenderTarget(B.map),J.clear(),J.renderBufferDirect(A,null,M,F,V,null)}function L(B,A,M,I){let y=null,S=M.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(S!==void 0)y=S;else if(y=M.isPointLight===!0?Y:W,J.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let f=y.uuid,t=A.uuid,v=N[f];if(v===void 0)v={},N[f]=v;let l=v[t];if(l===void 0)l=y.clone(),v[t]=l,A.addEventListener("dispose",_);y=l}if(y.visible=A.visible,y.wireframe=A.wireframe,I===w6)y.side=A.shadowSide!==null?A.shadowSide:A.side;else y.side=A.shadowSide!==null?A.shadowSide:q[A.side];if(y.alphaMap=A.alphaMap,y.alphaTest=A.alphaToCoverage===!0?0.5:A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,M.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let f=J.properties.get(y);f.light=M}return y}function R(B,A,M,I,y){if(B.visible===!1)return;if(B.layers.test(A.layers)&&(B.isMesh||B.isLine||B.isPoints)){if((B.castShadow||B.receiveShadow&&y===w6)&&(!B.frustumCulled||B.intersectsFrustum(Z))){B.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,B.matrixWorld);let t=$.update(B),v=B.material;if(Array.isArray(v)){let l=t.groups;for(let Q0=0,s=l.length;Q0<s;Q0++){let a=l[Q0],u=v[a.materialIndex];if(u&&u.visible){let x=L(B,u,I,y);B.onBeforeShadow(J,B,A,M,t,x,a),J.renderBufferDirect(M,null,t,x,B,a),B.onAfterShadow(J,B,A,M,t,x,a)}}}else if(v.visible){let l=L(B,v,I,y);B.onBeforeShadow(J,B,A,M,t,l,null),J.renderBufferDirect(M,null,t,l,B,null),B.onAfterShadow(J,B,A,M,t,l,null)}}}let f=B.children;for(let t=0,v=f.length;t<v;t++)R(f[t],A,M,I,y)}function _(B){B.target.removeEventListener("dispose",_);for(let M in N){let I=N[M],y=B.target.uuid;if(y in I)I[y].dispose(),delete I[y]}}}function mF(J,$){function Q(){let m=!1,T0=new K7,N0=null,S0=new K7(0,0,0,0);return{setMask:function(u0){if(N0!==u0&&!m)J.colorMask(u0,u0,u0,u0),N0=u0},setLocked:function(u0){m=u0},setClear:function(u0,M0,f0,D9,r9){if(r9===!0)u0*=D9,M0*=D9,f0*=D9;if(T0.set(u0,M0,f0,D9),S0.equals(T0)===!1)J.clearColor(u0,M0,f0,D9),S0.copy(T0)},reset:function(){m=!1,N0=null,S0.set(-1,0,0,0)}}}function Z(){let m=!1,T0=!1,N0=null,S0=null,u0=null;return{setReversed:function(M0){if(T0!==M0){let f0=$.get("EXT_clip_control");if(M0)f0.clipControlEXT(f0.LOWER_LEFT_EXT,f0.ZERO_TO_ONE_EXT);else f0.clipControlEXT(f0.LOWER_LEFT_EXT,f0.NEGATIVE_ONE_TO_ONE_EXT);T0=M0;let D9=u0;u0=null,this.setClear(D9)}},getReversed:function(){return T0},setTest:function(M0){if(M0)H0(J.DEPTH_TEST);else c(J.DEPTH_TEST)},setMask:function(M0){if(N0!==M0&&!m)J.depthMask(M0),N0=M0},setFunc:function(M0){if(T0)M0=GY[M0];if(S0!==M0){switch(M0){case bW:J.depthFunc(J.NEVER);break;case xW:J.depthFunc(J.ALWAYS);break;case hW:J.depthFunc(J.LESS);break;case MK:J.depthFunc(J.LEQUAL);break;case gW:J.depthFunc(J.EQUAL);break;case pW:J.depthFunc(J.GEQUAL);break;case uW:J.depthFunc(J.GREATER);break;case mW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}S0=M0}},setLocked:function(M0){m=M0},setClear:function(M0){if(u0!==M0){if(u0=M0,T0)M0=1-M0;J.clearDepth(M0)}},reset:function(){m=!1,N0=null,S0=null,u0=null,T0=!1}}}function K(){let m=!1,T0=null,N0=null,S0=null,u0=null,M0=null,f0=null,D9=null,r9=null;return{setTest:function(p9){if(!m)if(p9)H0(J.STENCIL_TEST);else c(J.STENCIL_TEST)},setMask:function(p9){if(T0!==p9&&!m)J.stencilMask(p9),T0=p9},setFunc:function(p9,A8,g8){if(N0!==p9||S0!==A8||u0!==g8)J.stencilFunc(p9,A8,g8),N0=p9,S0=A8,u0=g8},setOp:function(p9,A8,g8){if(M0!==p9||f0!==A8||D9!==g8)J.stencilOp(p9,A8,g8),M0=p9,f0=A8,D9=g8},setLocked:function(p9){m=p9},setClear:function(p9){if(r9!==p9)J.clearStencil(p9),r9=p9},reset:function(){m=!1,T0=null,N0=null,S0=null,u0=null,M0=null,f0=null,D9=null,r9=null}}}let U=new Q,H=new Z,W=new K,Y=new WeakMap,N=new WeakMap,X={},q={},G={},F=new WeakMap,O=[],V=null,D=!1,E=null,C=null,L=null,R=null,_=null,B=null,A=null,M=new F0(0,0,0),I=0,y=!1,S=null,f=null,t=null,v=null,l=null,Q0=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),s=!1,a=0,u=J.getParameter(J.VERSION);if(u.indexOf("WebGL")!==-1)a=parseFloat(/^WebGL (\d)/.exec(u)[1]),s=a>=1;else if(u.indexOf("OpenGL ES")!==-1)a=parseFloat(/^OpenGL ES (\d)/.exec(u)[1]),s=a>=2;let x=null,Z0={},O0=J.getParameter(J.SCISSOR_BOX),z0=J.getParameter(J.VIEWPORT),d=new K7().fromArray(O0),X0=new K7().fromArray(z0);function n(m,T0,N0,S0){let u0=new Uint8Array(4),M0=J.createTexture();J.bindTexture(m,M0),J.texParameteri(m,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(m,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let f0=0;f0<N0;f0++)if(m===J.TEXTURE_3D||m===J.TEXTURE_2D_ARRAY)J.texImage3D(T0,0,J.RGBA,1,1,S0,0,J.RGBA,J.UNSIGNED_BYTE,u0);else J.texImage2D(T0+f0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,u0);return M0}let Y0={};Y0[J.TEXTURE_2D]=n(J.TEXTURE_2D,J.TEXTURE_2D,1),Y0[J.TEXTURE_CUBE_MAP]=n(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y0[J.TEXTURE_2D_ARRAY]=n(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),Y0[J.TEXTURE_3D]=n(J.TEXTURE_3D,J.TEXTURE_3D,1,1),U.setClear(0,0,0,1),H.setClear(1),W.setClear(0),H0(J.DEPTH_TEST),H.setFunc(MK),P0(!1),o0(EK),H0(J.CULL_FACE),V0(x7);function H0(m){if(X[m]!==!0)J.enable(m),X[m]=!0}function c(m){if(X[m]!==!1)J.disable(m),X[m]=!1}function A0(m,T0){if(G[m]!==T0){if(J.bindFramebuffer(m,T0),G[m]=T0,m===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=T0;if(m===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=T0;return!0}return!1}function r(m,T0){let N0=O,S0=!1;if(m){if(N0=F.get(T0),N0===void 0)N0=[],F.set(T0,N0);let u0=m.textures;if(N0.length!==u0.length||N0[0]!==J.COLOR_ATTACHMENT0){for(let M0=0,f0=u0.length;M0<f0;M0++)N0[M0]=J.COLOR_ATTACHMENT0+M0;N0.length=u0.length,S0=!0}}else if(N0[0]!==J.BACK)N0[0]=J.BACK,S0=!0;if(S0)J.drawBuffers(N0)}function p0(m){if(V!==m)return J.useProgram(m),V=m,!0;return!1}let $0={[S6]:J.FUNC_ADD,[RW]:J.FUNC_SUBTRACT,[MW]:J.FUNC_REVERSE_SUBTRACT};$0[VW]=J.MIN,$0[_W]=J.MAX;let D0={[BW]:J.ZERO,[IW]:J.ONE,[CW]:J.SRC_COLOR,[zW]:J.SRC_ALPHA,[kW]:J.SRC_ALPHA_SATURATE,[TW]:J.DST_COLOR,[PW]:J.DST_ALPHA,[AW]:J.ONE_MINUS_SRC_COLOR,[LW]:J.ONE_MINUS_SRC_ALPHA,[SW]:J.ONE_MINUS_DST_COLOR,[wW]:J.ONE_MINUS_DST_ALPHA,[jW]:J.CONSTANT_COLOR,[vW]:J.ONE_MINUS_CONSTANT_COLOR,[yW]:J.CONSTANT_ALPHA,[fW]:J.ONE_MINUS_CONSTANT_ALPHA};function V0(m,T0,N0,S0,u0,M0,f0,D9,r9,p9){if(m===x7){if(D===!0)c(J.BLEND),D=!1;return}if(D===!1)H0(J.BLEND),D=!0;if(m!==OW){if(m!==E||p9!==y){if(C!==S6||_!==S6)J.blendEquation(J.FUNC_ADD),C=S6,_=S6;if(p9)switch(m){case R$:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case W7:J.blendFunc(J.ONE,J.ONE);break;case OK:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case RK:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:U9("WebGLState: Invalid blending: ",m);break}else switch(m){case R$:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case W7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case OK:U9("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case RK:U9("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:U9("WebGLState: Invalid blending: ",m);break}L=null,R=null,B=null,A=null,M.set(0,0,0),I=0,E=m,y=p9}return}if(u0=u0||T0,M0=M0||N0,f0=f0||S0,T0!==C||u0!==_)J.blendEquationSeparate($0[T0],$0[u0]),C=T0,_=u0;if(N0!==L||S0!==R||M0!==B||f0!==A)J.blendFuncSeparate(D0[N0],D0[S0],D0[M0],D0[f0]),L=N0,R=S0,B=M0,A=f0;if(D9.equals(M)===!1||r9!==I)J.blendColor(D9.r,D9.g,D9.b,r9),M.copy(D9),I=r9;E=m,y=!1}function B0(m,T0){m.side===m9?c(J.CULL_FACE):H0(J.CULL_FACE);let N0=m.side===E7;if(T0)N0=!N0;P0(N0),m.blending===R$&&m.transparent===!1?V0(x7):V0(m.blending,m.blendEquation,m.blendSrc,m.blendDst,m.blendEquationAlpha,m.blendSrcAlpha,m.blendDstAlpha,m.blendColor,m.blendAlpha,m.premultipliedAlpha),H.setFunc(m.depthFunc),H.setTest(m.depthTest),H.setMask(m.depthWrite),U.setMask(m.colorWrite);let S0=m.stencilWrite;if(W.setTest(S0),S0)W.setMask(m.stencilWriteMask),W.setFunc(m.stencilFunc,m.stencilRef,m.stencilFuncMask),W.setOp(m.stencilFail,m.stencilZFail,m.stencilZPass);q9(m.polygonOffset,m.polygonOffsetFactor,m.polygonOffsetUnits),m.alphaToCoverage===!0?H0(J.SAMPLE_ALPHA_TO_COVERAGE):c(J.SAMPLE_ALPHA_TO_COVERAGE)}function P0(m){if(S!==m){if(m)J.frontFace(J.CW);else J.frontFace(J.CCW);S=m}}function o0(m){if(m!==DW){if(H0(J.CULL_FACE),m!==f)if(m===EK)J.cullFace(J.BACK);else if(m===EW)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else c(J.CULL_FACE);f=m}function t0(m){if(m!==t){if(s)J.lineWidth(m);t=m}}function q9(m,T0,N0){if(m){if(H0(J.POLYGON_OFFSET_FILL),v!==T0||l!==N0){if(v=T0,l=N0,H.getReversed())T0=-T0;J.polygonOffset(T0,N0)}}else c(J.POLYGON_OFFSET_FILL)}function F9(m){if(m)H0(J.SCISSOR_TEST);else c(J.SCISSOR_TEST)}function b(m){if(m===void 0)m=J.TEXTURE0+Q0-1;if(x!==m)J.activeTexture(m),x=m}function n9(m,T0,N0){if(N0===void 0)if(x===null)N0=J.TEXTURE0+Q0-1;else N0=x;let S0=Z0[N0];if(S0===void 0)S0={type:void 0,texture:void 0},Z0[N0]=S0;if(S0.type!==m||S0.texture!==T0){if(x!==N0)J.activeTexture(N0),x=N0;J.bindTexture(m,T0||Y0[m]),S0.type=m,S0.texture=T0}}function V9(){let m=Z0[x];if(m!==void 0&&m.type!==void 0)J.bindTexture(m.type,null),m.type=void 0,m.texture=void 0}function C9(){try{J.compressedTexImage2D(...arguments)}catch(m){U9("WebGLState:",m)}}function T(){try{J.compressedTexImage3D(...arguments)}catch(m){U9("WebGLState:",m)}}function z(){try{J.texSubImage2D(...arguments)}catch(m){U9("WebGLState:",m)}}function g(){try{J.texSubImage3D(...arguments)}catch(m){U9("WebGLState:",m)}}function e(){try{J.compressedTexSubImage2D(...arguments)}catch(m){U9("WebGLState:",m)}}function R0(){try{J.compressedTexSubImage3D(...arguments)}catch(m){U9("WebGLState:",m)}}function I0(){try{J.texStorage2D(...arguments)}catch(m){U9("WebGLState:",m)}}function w0(){try{J.texStorage3D(...arguments)}catch(m){U9("WebGLState:",m)}}function U0(){try{J.texImage2D(...arguments)}catch(m){U9("WebGLState:",m)}}function q0(){try{J.texImage3D(...arguments)}catch(m){U9("WebGLState:",m)}}function h0(m){if(q[m]!==void 0)return q[m];else return J.getParameter(m)}function a0(m,T0){if(q[m]!==T0)J.pixelStorei(m,T0),q[m]=T0}function k0(m){if(d.equals(m)===!1)J.scissor(m.x,m.y,m.z,m.w),d.copy(m)}function C0(m){if(X0.equals(m)===!1)J.viewport(m.x,m.y,m.z,m.w),X0.copy(m)}function e0(m,T0){let N0=N.get(T0);if(N0===void 0)N0=new WeakMap,N.set(T0,N0);let S0=N0.get(m);if(S0===void 0)S0=J.getUniformBlockIndex(T0,m.name),N0.set(m,S0)}function Z9(m,T0){let S0=N.get(T0).get(m);if(Y.get(T0)!==S0)J.uniformBlockBinding(T0,S0,m.__bindingPointIndex),Y.set(T0,S0)}function f9(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),X={},q={},x=null,Z0={},G={},F=new WeakMap,O=[],V=null,D=!1,E=null,C=null,L=null,R=null,_=null,B=null,A=null,M=new F0(0,0,0),I=0,y=!1,S=null,f=null,t=null,v=null,l=null,d.set(0,0,J.canvas.width,J.canvas.height),X0.set(0,0,J.canvas.width,J.canvas.height),U.reset(),H.reset(),W.reset()}return{buffers:{color:U,depth:H,stencil:W},enable:H0,disable:c,bindFramebuffer:A0,drawBuffers:r,useProgram:p0,setBlending:V0,setMaterial:B0,setFlipSided:P0,setCullFace:o0,setLineWidth:t0,setPolygonOffset:q9,setScissorTest:F9,activeTexture:b,bindTexture:n9,unbindTexture:V9,compressedTexImage2D:C9,compressedTexImage3D:T,texImage2D:U0,texImage3D:q0,pixelStorei:a0,getParameter:h0,updateUBOMapping:e0,uniformBlockBinding:Z9,texStorage2D:I0,texStorage3D:w0,texSubImage2D:z,texSubImage3D:g,compressedTexSubImage2D:e,compressedTexSubImage3D:R0,scissor:k0,viewport:C0,reset:f9}}function dF(J,$,Q,Z,K,U,H){let W=$.has("WEBGL_multisampled_render_to_texture")?$.get("WEBGL_multisampled_render_to_texture"):null,Y=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),N=new G0,X=new WeakMap,q=new Set,G,F=new WeakMap,O=!1;try{O=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(T){}function V(T,z){return O?new OffscreenCanvas(T,z):N$("canvas")}function D(T,z,g){let e=1,R0=C9(T);if(R0.width>g||R0.height>g)e=g/Math.max(R0.width,R0.height);if(e<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let I0=Math.floor(e*R0.width),w0=Math.floor(e*R0.height);if(G===void 0)G=V(I0,w0);let U0=z?V(I0,w0):G;return U0.width=I0,U0.height=w0,U0.getContext("2d").drawImage(T,0,0,I0,w0),$9("WebGLRenderer: Texture has been resized from ("+R0.width+"x"+R0.height+") to ("+I0+"x"+w0+")."),U0}else{if("data"in T)$9("WebGLRenderer: Image in DataTexture is too big ("+R0.width+"x"+R0.height+").");return T}return T}function E(T){return T.generateMipmaps}function C(T){J.generateMipmap(T)}function L(T){if(T.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(T.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function R(T,z,g,e,R0,I0=!1){if(T!==null){if(J[T]!==void 0)return J[T];$9("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let w0;if(e){if(w0=$.get("EXT_texture_norm16"),!w0)$9("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let U0=z;if(z===J.RED){if(g===J.FLOAT)U0=J.R32F;if(g===J.HALF_FLOAT)U0=J.R16F;if(g===J.UNSIGNED_BYTE)U0=J.R8;if(g===J.UNSIGNED_SHORT&&w0)U0=w0.R16_EXT;if(g===J.SHORT&&w0)U0=w0.R16_SNORM_EXT}if(z===J.RED_INTEGER){if(g===J.UNSIGNED_BYTE)U0=J.R8UI;if(g===J.UNSIGNED_SHORT)U0=J.R16UI;if(g===J.UNSIGNED_INT)U0=J.R32UI;if(g===J.BYTE)U0=J.R8I;if(g===J.SHORT)U0=J.R16I;if(g===J.INT)U0=J.R32I}if(z===J.RG){if(g===J.FLOAT)U0=J.RG32F;if(g===J.HALF_FLOAT)U0=J.RG16F;if(g===J.UNSIGNED_BYTE)U0=J.RG8;if(g===J.UNSIGNED_SHORT&&w0)U0=w0.RG16_EXT;if(g===J.SHORT&&w0)U0=w0.RG16_SNORM_EXT}if(z===J.RG_INTEGER){if(g===J.UNSIGNED_BYTE)U0=J.RG8UI;if(g===J.UNSIGNED_SHORT)U0=J.RG16UI;if(g===J.UNSIGNED_INT)U0=J.RG32UI;if(g===J.BYTE)U0=J.RG8I;if(g===J.SHORT)U0=J.RG16I;if(g===J.INT)U0=J.RG32I}if(z===J.RGB_INTEGER){if(g===J.UNSIGNED_BYTE)U0=J.RGB8UI;if(g===J.UNSIGNED_SHORT)U0=J.RGB16UI;if(g===J.UNSIGNED_INT)U0=J.RGB32UI;if(g===J.BYTE)U0=J.RGB8I;if(g===J.SHORT)U0=J.RGB16I;if(g===J.INT)U0=J.RGB32I}if(z===J.RGBA_INTEGER){if(g===J.UNSIGNED_BYTE)U0=J.RGBA8UI;if(g===J.UNSIGNED_SHORT)U0=J.RGBA16UI;if(g===J.UNSIGNED_INT)U0=J.RGBA32UI;if(g===J.BYTE)U0=J.RGBA8I;if(g===J.SHORT)U0=J.RGBA16I;if(g===J.INT)U0=J.RGBA32I}if(z===J.RGB){if(g===J.UNSIGNED_SHORT&&w0)U0=w0.RGB16_EXT;if(g===J.SHORT&&w0)U0=w0.RGB16_SNORM_EXT;if(g===J.UNSIGNED_INT_5_9_9_9_REV)U0=J.RGB9_E5;if(g===J.UNSIGNED_INT_10F_11F_11F_REV)U0=J.R11F_G11F_B10F}if(z===J.RGBA){let q0=I0?KU:_9.getTransfer(R0);if(g===J.FLOAT)U0=J.RGBA32F;if(g===J.HALF_FLOAT)U0=J.RGBA16F;if(g===J.UNSIGNED_BYTE)U0=q0===c9?J.SRGB8_ALPHA8:J.RGBA8;if(g===J.UNSIGNED_SHORT&&w0)U0=w0.RGBA16_EXT;if(g===J.SHORT&&w0)U0=w0.RGBA16_SNORM_EXT;if(g===J.UNSIGNED_SHORT_4_4_4_4)U0=J.RGBA4;if(g===J.UNSIGNED_SHORT_5_5_5_1)U0=J.RGB5_A1}if(U0===J.R16F||U0===J.R32F||U0===J.RG16F||U0===J.RG32F||U0===J.RGBA16F||U0===J.RGBA32F)$.get("EXT_color_buffer_float");return U0}function _(T,z){let g;if(T){if(z===null||z===IJ||z===j6)g=J.DEPTH24_STENCIL8;else if(z===o8)g=J.DEPTH32F_STENCIL8;else if(z===L$)g=J.DEPTH24_STENCIL8,$9("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(z===null||z===IJ||z===j6)g=J.DEPTH_COMPONENT24;else if(z===o8)g=J.DEPTH_COMPONENT32F;else if(z===L$)g=J.DEPTH_COMPONENT16;return g}function B(T,z){if(E(T)===!0||T.isFramebufferTexture&&T.minFilter!==a7&&T.minFilter!==h7)return Math.log2(Math.max(z.width,z.height))+1;else if(T.mipmaps!==void 0&&T.mipmaps.length>0)return T.mipmaps.length;else if(T.isCompressedTexture&&Array.isArray(T.image))return z.mipmaps.length;else return 1}function A(T){let z=T.target;if(z.removeEventListener("dispose",A),I(z),z.isVideoTexture)X.delete(z);if(z.isHTMLTexture)q.delete(z)}function M(T){let z=T.target;z.removeEventListener("dispose",M),S(z)}function I(T){let z=Z.get(T);if(z.__webglInit===void 0)return;let g=T.source,e=F.get(g);if(e){let R0=e[z.__cacheKey];if(R0.usedTimes--,R0.usedTimes===0)y(T);if(Object.keys(e).length===0)F.delete(g)}Z.remove(T)}function y(T){let z=Z.get(T);J.deleteTexture(z.__webglTexture);let g=T.source,e=F.get(g);delete e[z.__cacheKey],H.memory.textures--}function S(T){let z=Z.get(T);if(T.depthTexture)T.depthTexture.dispose(),Z.remove(T.depthTexture);if(T.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(z.__webglFramebuffer[e]))for(let R0=0;R0<z.__webglFramebuffer[e].length;R0++)J.deleteFramebuffer(z.__webglFramebuffer[e][R0]);else J.deleteFramebuffer(z.__webglFramebuffer[e]);if(z.__webglDepthbuffer)J.deleteRenderbuffer(z.__webglDepthbuffer[e])}else{if(Array.isArray(z.__webglFramebuffer))for(let e=0;e<z.__webglFramebuffer.length;e++)J.deleteFramebuffer(z.__webglFramebuffer[e]);else J.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer)J.deleteRenderbuffer(z.__webglDepthbuffer);if(z.__webglMultisampledFramebuffer)J.deleteFramebuffer(z.__webglMultisampledFramebuffer);if(z.__webglColorRenderbuffer){for(let e=0;e<z.__webglColorRenderbuffer.length;e++)if(z.__webglColorRenderbuffer[e])J.deleteRenderbuffer(z.__webglColorRenderbuffer[e])}if(z.__webglDepthRenderbuffer)J.deleteRenderbuffer(z.__webglDepthRenderbuffer)}let g=T.textures;for(let e=0,R0=g.length;e<R0;e++){let I0=Z.get(g[e]);if(I0.__webglTexture)J.deleteTexture(I0.__webglTexture),H.memory.textures--;Z.remove(g[e])}Z.remove(T)}let f=0;function t(){f=0}function v(){return f}function l(T){f=T}function Q0(){let T=f;if(T>=K.maxTextures)$9("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+K.maxTextures);return f+=1,T}function s(T){let z=[];return z.push(T.wrapS),z.push(T.wrapT),z.push(T.wrapR||0),z.push(T.magFilter),z.push(T.minFilter),z.push(T.anisotropy),z.push(T.internalFormat),z.push(T.format),z.push(T.type),z.push(T.generateMipmaps),z.push(T.premultiplyAlpha),z.push(T.flipY),z.push(T.unpackAlignment),z.push(T.colorSpace),z.join()}function a(T,z){let g=Z.get(T);if(T.isVideoTexture)n9(T);if(T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&g.__version!==T.version){let e=T.image;if(e===null)$9("WebGLRenderer: Texture marked for update but no image data found.");else if(e.complete===!1)$9("WebGLRenderer: Texture marked for update but image is incomplete");else{c(g,T,z);return}}else if(T.isExternalTexture)g.__webglTexture=T.sourceTexture?T.sourceTexture:null;Q.bindTexture(J.TEXTURE_2D,g.__webglTexture,J.TEXTURE0+z)}function u(T,z){let g=Z.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&g.__version!==T.version){c(g,T,z);return}else if(T.isExternalTexture)g.__webglTexture=T.sourceTexture?T.sourceTexture:null;Q.bindTexture(J.TEXTURE_2D_ARRAY,g.__webglTexture,J.TEXTURE0+z)}function x(T,z){let g=Z.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&g.__version!==T.version){c(g,T,z);return}Q.bindTexture(J.TEXTURE_3D,g.__webglTexture,J.TEXTURE0+z)}function Z0(T,z){let g=Z.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&g.__version!==T.version){A0(g,T,z);return}Q.bindTexture(J.TEXTURE_CUBE_MAP,g.__webglTexture,J.TEXTURE0+z)}let O0={[S8]:J.REPEAT,[sQ]:J.CLAMP_TO_EDGE,[nW]:J.MIRRORED_REPEAT},z0={[a7]:J.NEAREST,[sW]:J.NEAREST_MIPMAP_NEAREST,[z$]:J.NEAREST_MIPMAP_LINEAR,[h7]:J.LINEAR,[iQ]:J.LINEAR_MIPMAP_NEAREST,[fJ]:J.LINEAR_MIPMAP_LINEAR},d={[QY]:J.NEVER,[WY]:J.ALWAYS,[ZY]:J.LESS,[$Z]:J.LEQUAL,[KY]:J.EQUAL,[QZ]:J.GEQUAL,[UY]:J.GREATER,[HY]:J.NOTEQUAL};function X0(T,z){if(z.type===o8&&$.has("OES_texture_float_linear")===!1&&(z.magFilter===h7||z.magFilter===iQ||z.magFilter===z$||z.magFilter===fJ||z.minFilter===h7||z.minFilter===iQ||z.minFilter===z$||z.minFilter===fJ))$9("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(T,J.TEXTURE_WRAP_S,O0[z.wrapS]),J.texParameteri(T,J.TEXTURE_WRAP_T,O0[z.wrapT]),T===J.TEXTURE_3D||T===J.TEXTURE_2D_ARRAY)J.texParameteri(T,J.TEXTURE_WRAP_R,O0[z.wrapR]);if(J.texParameteri(T,J.TEXTURE_MAG_FILTER,z0[z.magFilter]),J.texParameteri(T,J.TEXTURE_MIN_FILTER,z0[z.minFilter]),z.compareFunction)J.texParameteri(T,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(T,J.TEXTURE_COMPARE_FUNC,d[z.compareFunction]);if($.has("EXT_texture_filter_anisotropic")===!0){if(z.magFilter===a7)return;if(z.minFilter!==z$&&z.minFilter!==fJ)return;if(z.type===o8&&$.has("OES_texture_float_linear")===!1)return;if(z.anisotropy>1||Z.get(z).__currentAnisotropy){let g=$.get("EXT_texture_filter_anisotropic");J.texParameterf(T,g.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(z.anisotropy,K.getMaxAnisotropy())),Z.get(z).__currentAnisotropy=z.anisotropy}}}function n(T,z){let g=!1;if(T.__webglInit===void 0)T.__webglInit=!0,z.addEventListener("dispose",A);let e=z.source,R0=F.get(e);if(R0===void 0)R0={},F.set(e,R0);let I0=s(z);if(I0!==T.__cacheKey){if(R0[I0]===void 0)R0[I0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,g=!0;R0[I0].usedTimes++;let w0=R0[T.__cacheKey];if(w0!==void 0){if(R0[T.__cacheKey].usedTimes--,w0.usedTimes===0)y(z)}T.__cacheKey=I0,T.__webglTexture=R0[I0].texture}return g}function Y0(T,z,g){return Math.floor(Math.floor(T/g)/z)}function H0(T,z,g,e){let I0=T.updateRanges;if(I0.length===0)Q.texSubImage2D(J.TEXTURE_2D,0,0,0,z.width,z.height,g,e,z.data);else{I0.sort((a0,k0)=>a0.start-k0.start);let w0=0;for(let a0=1;a0<I0.length;a0++){let k0=I0[w0],C0=I0[a0],e0=k0.start+k0.count,Z9=Y0(C0.start,z.width,4),f9=Y0(k0.start,z.width,4);if(C0.start<=e0+1&&Z9===f9&&Y0(C0.start+C0.count-1,z.width,4)===Z9)k0.count=Math.max(k0.count,C0.start+C0.count-k0.start);else++w0,I0[w0]=C0}I0.length=w0+1;let U0=Q.getParameter(J.UNPACK_ROW_LENGTH),q0=Q.getParameter(J.UNPACK_SKIP_PIXELS),h0=Q.getParameter(J.UNPACK_SKIP_ROWS);Q.pixelStorei(J.UNPACK_ROW_LENGTH,z.width);for(let a0=0,k0=I0.length;a0<k0;a0++){let C0=I0[a0],e0=Math.floor(C0.start/4),Z9=Math.ceil(C0.count/4),f9=e0%z.width,m=Math.floor(e0/z.width),T0=Z9,N0=1;Q.pixelStorei(J.UNPACK_SKIP_PIXELS,f9),Q.pixelStorei(J.UNPACK_SKIP_ROWS,m),Q.texSubImage2D(J.TEXTURE_2D,0,f9,m,T0,1,g,e,z.data)}T.clearUpdateRanges(),Q.pixelStorei(J.UNPACK_ROW_LENGTH,U0),Q.pixelStorei(J.UNPACK_SKIP_PIXELS,q0),Q.pixelStorei(J.UNPACK_SKIP_ROWS,h0)}}function c(T,z,g){let e=J.TEXTURE_2D;if(z.isDataArrayTexture||z.isCompressedArrayTexture)e=J.TEXTURE_2D_ARRAY;if(z.isData3DTexture)e=J.TEXTURE_3D;let R0=n(T,z),I0=z.source;Q.bindTexture(e,T.__webglTexture,J.TEXTURE0+g);let w0=Z.get(I0);if(I0.version!==w0.__version||R0===!0){if(Q.activeTexture(J.TEXTURE0+g),(typeof ImageBitmap<"u"&&z.image instanceof ImageBitmap)===!1){let N0=_9.getPrimaries(_9.workingColorSpace),S0=z.colorSpace===gJ?null:_9.getPrimaries(z.colorSpace),u0=z.colorSpace===gJ||N0===S0?J.NONE:J.BROWSER_DEFAULT_WEBGL;Q.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,z.flipY),Q.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),Q.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,u0)}Q.pixelStorei(J.UNPACK_ALIGNMENT,z.unpackAlignment);let q0=D(z.image,!1,K.maxTextureSize);q0=V9(z,q0);let h0=U.convert(z.format,z.colorSpace),a0=U.convert(z.type),k0=R(z.internalFormat,h0,a0,z.normalized,z.colorSpace,z.isVideoTexture);X0(e,z);let C0,e0=z.mipmaps,Z9=z.isVideoTexture!==!0,f9=w0.__version===void 0||R0===!0,m=I0.dataReady,T0=B(z,q0);if(z.isDepthTexture){if(k0=_(z.format===xJ,z.type),f9)if(Z9)Q.texStorage2D(J.TEXTURE_2D,1,k0,q0.width,q0.height);else Q.texImage2D(J.TEXTURE_2D,0,k0,q0.width,q0.height,0,h0,a0,null)}else if(z.isDataTexture)if(e0.length>0){if(Z9&&f9)Q.texStorage2D(J.TEXTURE_2D,T0,k0,e0[0].width,e0[0].height);for(let N0=0,S0=e0.length;N0<S0;N0++)if(C0=e0[N0],Z9){if(m)Q.texSubImage2D(J.TEXTURE_2D,N0,0,0,C0.width,C0.height,h0,a0,C0.data)}else Q.texImage2D(J.TEXTURE_2D,N0,k0,C0.width,C0.height,0,h0,a0,C0.data);z.generateMipmaps=!1}else if(Z9){if(f9)Q.texStorage2D(J.TEXTURE_2D,T0,k0,q0.width,q0.height);if(m)H0(z,q0,h0,a0)}else Q.texImage2D(J.TEXTURE_2D,0,k0,q0.width,q0.height,0,h0,a0,q0.data);else if(z.isCompressedTexture)if(z.isCompressedArrayTexture){if(Z9&&f9)Q.texStorage3D(J.TEXTURE_2D_ARRAY,T0,k0,e0[0].width,e0[0].height,q0.depth);for(let N0=0,S0=e0.length;N0<S0;N0++)if(C0=e0[N0],z.format!==k8)if(h0!==null)if(Z9){if(m)if(z.layerUpdates.size>0){let u0=yU(C0.width,C0.height,z.format,z.type);for(let M0 of z.layerUpdates){let f0=C0.data.subarray(M0*u0/C0.data.BYTES_PER_ELEMENT,(M0+1)*u0/C0.data.BYTES_PER_ELEMENT);Q.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,N0,0,0,M0,C0.width,C0.height,1,h0,f0)}}else Q.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,N0,0,0,0,C0.width,C0.height,q0.depth,h0,C0.data)}else Q.compressedTexImage3D(J.TEXTURE_2D_ARRAY,N0,k0,C0.width,C0.height,q0.depth,0,C0.data,0,0);else $9("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Z9){if(m)Q.texSubImage3D(J.TEXTURE_2D_ARRAY,N0,0,0,0,C0.width,C0.height,q0.depth,h0,a0,C0.data)}else Q.texImage3D(J.TEXTURE_2D_ARRAY,N0,k0,C0.width,C0.height,q0.depth,0,h0,a0,C0.data);if(z.layerUpdates.size>0)z.clearLayerUpdates()}else{if(Z9&&f9)Q.texStorage2D(J.TEXTURE_2D,T0,k0,e0[0].width,e0[0].height);for(let N0=0,S0=e0.length;N0<S0;N0++)if(C0=e0[N0],z.format!==k8)if(h0!==null)if(Z9){if(m)Q.compressedTexSubImage2D(J.TEXTURE_2D,N0,0,0,C0.width,C0.height,h0,C0.data)}else Q.compressedTexImage2D(J.TEXTURE_2D,N0,k0,C0.width,C0.height,0,C0.data);else $9("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(Z9){if(m)Q.texSubImage2D(J.TEXTURE_2D,N0,0,0,C0.width,C0.height,h0,a0,C0.data)}else Q.texImage2D(J.TEXTURE_2D,N0,k0,C0.width,C0.height,0,h0,a0,C0.data)}else if(z.isDataArrayTexture)if(Z9){if(f9)Q.texStorage3D(J.TEXTURE_2D_ARRAY,T0,k0,q0.width,q0.height,q0.depth);if(m)if(z.layerUpdates.size>0){let N0=yU(q0.width,q0.height,z.format,z.type);for(let S0 of z.layerUpdates){let u0=q0.data.subarray(S0*N0/q0.data.BYTES_PER_ELEMENT,(S0+1)*N0/q0.data.BYTES_PER_ELEMENT);Q.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,S0,q0.width,q0.height,1,h0,a0,u0)}z.clearLayerUpdates()}else Q.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,q0.width,q0.height,q0.depth,h0,a0,q0.data)}else Q.texImage3D(J.TEXTURE_2D_ARRAY,0,k0,q0.width,q0.height,q0.depth,0,h0,a0,q0.data);else if(z.isData3DTexture)if(Z9){if(f9)Q.texStorage3D(J.TEXTURE_3D,T0,k0,q0.width,q0.height,q0.depth);if(m)Q.texSubImage3D(J.TEXTURE_3D,0,0,0,0,q0.width,q0.height,q0.depth,h0,a0,q0.data)}else Q.texImage3D(J.TEXTURE_3D,0,k0,q0.width,q0.height,q0.depth,0,h0,a0,q0.data);else if(z.isFramebufferTexture){if(f9)if(Z9)Q.texStorage2D(J.TEXTURE_2D,T0,k0,q0.width,q0.height);else{let{width:N0,height:S0}=q0;for(let u0=0;u0<T0;u0++)Q.texImage2D(J.TEXTURE_2D,u0,k0,N0,S0,0,h0,a0,null),N0>>=1,S0>>=1}}else if(z.isHTMLTexture){if("texElementImage2D"in J){let N0=J.canvas;if(!N0.hasAttribute("layoutsubtree"))N0.setAttribute("layoutsubtree","true");if(q0.parentNode!==N0){N0.appendChild(q0),q.add(z),N0.onpaint=(S0)=>{let u0=S0.changedElements;for(let M0 of q)if(u0.includes(M0.image))M0.needsUpdate=!0},N0.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,q0);else{let{RGBA:u0,RGBA:M0,UNSIGNED_BYTE:f0}=J;J.texElementImage2D(J.TEXTURE_2D,0,u0,M0,f0,q0)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(e0.length>0){if(Z9&&f9){let N0=C9(e0[0]);Q.texStorage2D(J.TEXTURE_2D,T0,k0,N0.width,N0.height)}for(let N0=0,S0=e0.length;N0<S0;N0++)if(C0=e0[N0],Z9){if(m)Q.texSubImage2D(J.TEXTURE_2D,N0,0,0,h0,a0,C0)}else Q.texImage2D(J.TEXTURE_2D,N0,k0,h0,a0,C0);z.generateMipmaps=!1}else if(Z9){if(f9){let N0=C9(q0);Q.texStorage2D(J.TEXTURE_2D,T0,k0,N0.width,N0.height)}if(m)Q.texSubImage2D(J.TEXTURE_2D,0,0,0,h0,a0,q0)}else Q.texImage2D(J.TEXTURE_2D,0,k0,h0,a0,q0);if(E(z))C(e);if(w0.__version=I0.version,z.onUpdate)z.onUpdate(z)}T.__version=z.version}function A0(T,z,g){if(z.image.length!==6)return;let e=n(T,z),R0=z.source;Q.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+g);let I0=Z.get(R0);if(R0.version!==I0.__version||e===!0){Q.activeTexture(J.TEXTURE0+g);let w0=_9.getPrimaries(_9.workingColorSpace),U0=z.colorSpace===gJ?null:_9.getPrimaries(z.colorSpace),q0=z.colorSpace===gJ||w0===U0?J.NONE:J.BROWSER_DEFAULT_WEBGL;Q.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,z.flipY),Q.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),Q.pixelStorei(J.UNPACK_ALIGNMENT,z.unpackAlignment),Q.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,q0);let h0=z.isCompressedTexture||z.image[0].isCompressedTexture,a0=z.image[0]&&z.image[0].isDataTexture,k0=[];for(let M0=0;M0<6;M0++){if(!h0&&!a0)k0[M0]=D(z.image[M0],!0,K.maxCubemapSize);else k0[M0]=a0?z.image[M0].image:z.image[M0];k0[M0]=V9(z,k0[M0])}let C0=k0[0],e0=U.convert(z.format,z.colorSpace),Z9=U.convert(z.type),f9=R(z.internalFormat,e0,Z9,z.normalized,z.colorSpace),m=z.isVideoTexture!==!0,T0=I0.__version===void 0||e===!0,N0=R0.dataReady,S0=B(z,C0);X0(J.TEXTURE_CUBE_MAP,z);let u0;if(h0){if(m&&T0)Q.texStorage2D(J.TEXTURE_CUBE_MAP,S0,f9,C0.width,C0.height);for(let M0=0;M0<6;M0++){u0=k0[M0].mipmaps;for(let f0=0;f0<u0.length;f0++){let D9=u0[f0];if(z.format!==k8)if(e0!==null)if(m){if(N0)Q.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,f0,0,0,D9.width,D9.height,e0,D9.data)}else Q.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,f0,f9,D9.width,D9.height,0,D9.data);else $9("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(m){if(N0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,f0,0,0,D9.width,D9.height,e0,Z9,D9.data)}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,f0,f9,D9.width,D9.height,0,e0,Z9,D9.data)}}}else{if(u0=z.mipmaps,m&&T0){if(u0.length>0)S0++;let M0=C9(k0[0]);Q.texStorage2D(J.TEXTURE_CUBE_MAP,S0,f9,M0.width,M0.height)}for(let M0=0;M0<6;M0++)if(a0){if(m){if(N0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,0,0,0,k0[M0].width,k0[M0].height,e0,Z9,k0[M0].data)}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,0,f9,k0[M0].width,k0[M0].height,0,e0,Z9,k0[M0].data);for(let f0=0;f0<u0.length;f0++){let r9=u0[f0].image[M0].image;if(m){if(N0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,f0+1,0,0,r9.width,r9.height,e0,Z9,r9.data)}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,f0+1,f9,r9.width,r9.height,0,e0,Z9,r9.data)}}else{if(m){if(N0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,0,0,0,e0,Z9,k0[M0])}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,0,f9,e0,Z9,k0[M0]);for(let f0=0;f0<u0.length;f0++){let D9=u0[f0];if(m){if(N0)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,f0+1,0,0,e0,Z9,D9.image[M0])}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+M0,f0+1,f9,e0,Z9,D9.image[M0])}}}if(E(z))C(J.TEXTURE_CUBE_MAP);if(I0.__version=R0.version,z.onUpdate)z.onUpdate(z)}T.__version=z.version}function r(T,z,g,e,R0,I0){let w0=U.convert(g.format,g.colorSpace),U0=U.convert(g.type),q0=R(g.internalFormat,w0,U0,g.normalized,g.colorSpace),h0=Z.get(z),a0=Z.get(g);if(a0.__renderTarget=z,!h0.__hasExternalTextures){let k0=Math.max(1,z.width>>I0),C0=Math.max(1,z.height>>I0);if(R0===J.TEXTURE_3D||R0===J.TEXTURE_2D_ARRAY)Q.texImage3D(R0,I0,q0,k0,C0,z.depth,0,w0,U0,null);else Q.texImage2D(R0,I0,q0,k0,C0,0,w0,U0,null)}if(Q.bindFramebuffer(J.FRAMEBUFFER,T),b(z))W.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,e,R0,a0.__webglTexture,0,F9(z));else if(R0===J.TEXTURE_2D||R0>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&R0<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,e,R0,a0.__webglTexture,I0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}function p0(T,z,g){if(J.bindRenderbuffer(J.RENDERBUFFER,T),z.depthBuffer){let e=z.depthTexture,R0=e&&e.isDepthTexture?e.type:null,I0=_(z.stencilBuffer,R0),w0=z.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(b(z))W.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,F9(z),I0,z.width,z.height);else if(g)J.renderbufferStorageMultisample(J.RENDERBUFFER,F9(z),I0,z.width,z.height);else J.renderbufferStorage(J.RENDERBUFFER,I0,z.width,z.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,w0,J.RENDERBUFFER,T)}else{let e=z.textures;for(let R0=0;R0<e.length;R0++){let I0=e[R0],w0=U.convert(I0.format,I0.colorSpace),U0=U.convert(I0.type),q0=R(I0.internalFormat,w0,U0,I0.normalized,I0.colorSpace);if(b(z))W.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,F9(z),q0,z.width,z.height);else if(g)J.renderbufferStorageMultisample(J.RENDERBUFFER,F9(z),q0,z.width,z.height);else J.renderbufferStorage(J.RENDERBUFFER,q0,z.width,z.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function $0(T,z,g){let e=z.isWebGLCubeRenderTarget===!0;if(Q.bindFramebuffer(J.FRAMEBUFFER,T),!(z.depthTexture&&z.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let R0=Z.get(z.depthTexture);if(R0.__renderTarget=z,!R0.__webglTexture||z.depthTexture.image.width!==z.width||z.depthTexture.image.height!==z.height)z.depthTexture.image.width=z.width,z.depthTexture.image.height=z.height,z.depthTexture.needsUpdate=!0;if(e){if(R0.__webglInit===void 0)R0.__webglInit=!0,z.depthTexture.addEventListener("dispose",A);if(R0.__webglTexture===void 0){R0.__webglTexture=J.createTexture(),Q.bindTexture(J.TEXTURE_CUBE_MAP,R0.__webglTexture),X0(J.TEXTURE_CUBE_MAP,z.depthTexture);let h0=U.convert(z.depthTexture.format),a0=U.convert(z.depthTexture.type),k0;if(z.depthTexture.format===bJ)k0=J.DEPTH_COMPONENT24;else if(z.depthTexture.format===xJ)k0=J.DEPTH24_STENCIL8;for(let C0=0;C0<6;C0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+C0,0,k0,z.width,z.height,0,h0,a0,null)}}else a(z.depthTexture,0);let I0=R0.__webglTexture,w0=F9(z),U0=e?J.TEXTURE_CUBE_MAP_POSITIVE_X+g:J.TEXTURE_2D,q0=z.depthTexture.format===xJ?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(z.depthTexture.format===bJ)if(b(z))W.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,q0,U0,I0,0,w0);else J.framebufferTexture2D(J.FRAMEBUFFER,q0,U0,I0,0);else if(z.depthTexture.format===xJ)if(b(z))W.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,q0,U0,I0,0,w0);else J.framebufferTexture2D(J.FRAMEBUFFER,q0,U0,I0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function D0(T){let z=Z.get(T),g=T.isWebGLCubeRenderTarget===!0;if(z.__boundDepthTexture!==T.depthTexture){let e=T.depthTexture;if(z.__depthDisposeCallback)z.__depthDisposeCallback();if(e){let R0=()=>{delete z.__boundDepthTexture,delete z.__depthDisposeCallback,e.removeEventListener("dispose",R0)};e.addEventListener("dispose",R0),z.__depthDisposeCallback=R0}z.__boundDepthTexture=e}if(T.depthTexture&&!z.__autoAllocateDepthBuffer)if(g)for(let e=0;e<6;e++)$0(z.__webglFramebuffer[e],T,e);else{let e=T.texture.mipmaps;if(e&&e.length>0)$0(z.__webglFramebuffer[0],T,0);else $0(z.__webglFramebuffer,T,0)}else if(g){z.__webglDepthbuffer=[];for(let e=0;e<6;e++)if(Q.bindFramebuffer(J.FRAMEBUFFER,z.__webglFramebuffer[e]),z.__webglDepthbuffer[e]===void 0)z.__webglDepthbuffer[e]=J.createRenderbuffer(),p0(z.__webglDepthbuffer[e],T,!1);else{let R0=T.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,I0=z.__webglDepthbuffer[e];J.bindRenderbuffer(J.RENDERBUFFER,I0),J.framebufferRenderbuffer(J.FRAMEBUFFER,R0,J.RENDERBUFFER,I0)}}else{let e=T.texture.mipmaps;if(e&&e.length>0)Q.bindFramebuffer(J.FRAMEBUFFER,z.__webglFramebuffer[0]);else Q.bindFramebuffer(J.FRAMEBUFFER,z.__webglFramebuffer);if(z.__webglDepthbuffer===void 0)z.__webglDepthbuffer=J.createRenderbuffer(),p0(z.__webglDepthbuffer,T,!1);else{let R0=T.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,I0=z.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,I0),J.framebufferRenderbuffer(J.FRAMEBUFFER,R0,J.RENDERBUFFER,I0)}}Q.bindFramebuffer(J.FRAMEBUFFER,null)}function V0(T,z,g){let e=Z.get(T);if(z!==void 0)r(e.__webglFramebuffer,T,T.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(g!==void 0)D0(T)}function B0(T){let z=T.texture,g=Z.get(T),e=Z.get(z);T.addEventListener("dispose",M);let R0=T.textures,I0=T.isWebGLCubeRenderTarget===!0,w0=R0.length>1;if(!w0){if(e.__webglTexture===void 0)e.__webglTexture=J.createTexture();e.__version=z.version,H.memory.textures++}if(I0){g.__webglFramebuffer=[];for(let U0=0;U0<6;U0++)if(z.mipmaps&&z.mipmaps.length>0){g.__webglFramebuffer[U0]=[];for(let q0=0;q0<z.mipmaps.length;q0++)g.__webglFramebuffer[U0][q0]=J.createFramebuffer()}else g.__webglFramebuffer[U0]=J.createFramebuffer()}else{if(z.mipmaps&&z.mipmaps.length>0){g.__webglFramebuffer=[];for(let U0=0;U0<z.mipmaps.length;U0++)g.__webglFramebuffer[U0]=J.createFramebuffer()}else g.__webglFramebuffer=J.createFramebuffer();if(w0)for(let U0=0,q0=R0.length;U0<q0;U0++){let h0=Z.get(R0[U0]);if(h0.__webglTexture===void 0)h0.__webglTexture=J.createTexture(),H.memory.textures++}if(T.samples>0&&b(T)===!1){g.__webglMultisampledFramebuffer=J.createFramebuffer(),g.__webglColorRenderbuffer=[],Q.bindFramebuffer(J.FRAMEBUFFER,g.__webglMultisampledFramebuffer);for(let U0=0;U0<R0.length;U0++){let q0=R0[U0];g.__webglColorRenderbuffer[U0]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,g.__webglColorRenderbuffer[U0]);let h0=U.convert(q0.format,q0.colorSpace),a0=U.convert(q0.type),k0=R(q0.internalFormat,h0,a0,q0.normalized,q0.colorSpace,T.isXRRenderTarget===!0),C0=F9(T);J.renderbufferStorageMultisample(J.RENDERBUFFER,C0,k0,T.width,T.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+U0,J.RENDERBUFFER,g.__webglColorRenderbuffer[U0])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),T.depthBuffer)g.__webglDepthRenderbuffer=J.createRenderbuffer(),p0(g.__webglDepthRenderbuffer,T,!0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}}if(I0){Q.bindTexture(J.TEXTURE_CUBE_MAP,e.__webglTexture),X0(J.TEXTURE_CUBE_MAP,z);for(let U0=0;U0<6;U0++)if(z.mipmaps&&z.mipmaps.length>0)for(let q0=0;q0<z.mipmaps.length;q0++)r(g.__webglFramebuffer[U0][q0],T,z,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+U0,q0);else r(g.__webglFramebuffer[U0],T,z,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+U0,0);if(E(z))C(J.TEXTURE_CUBE_MAP);Q.unbindTexture()}else if(w0){for(let U0=0,q0=R0.length;U0<q0;U0++){let h0=R0[U0],a0=Z.get(h0),k0=J.TEXTURE_2D;if(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)k0=T.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(Q.bindTexture(k0,a0.__webglTexture),X0(k0,h0),r(g.__webglFramebuffer,T,h0,J.COLOR_ATTACHMENT0+U0,k0,0),E(h0))C(k0)}Q.unbindTexture()}else{let U0=J.TEXTURE_2D;if(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)U0=T.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(Q.bindTexture(U0,e.__webglTexture),X0(U0,z),z.mipmaps&&z.mipmaps.length>0)for(let q0=0;q0<z.mipmaps.length;q0++)r(g.__webglFramebuffer[q0],T,z,J.COLOR_ATTACHMENT0,U0,q0);else r(g.__webglFramebuffer,T,z,J.COLOR_ATTACHMENT0,U0,0);if(E(z))C(U0);Q.unbindTexture()}if(T.depthBuffer)D0(T)}function P0(T){let z=T.textures;for(let g=0,e=z.length;g<e;g++){let R0=z[g];if(E(R0)){let I0=L(T),w0=Z.get(R0).__webglTexture;Q.bindTexture(I0,w0),C(I0),Q.unbindTexture()}}}let o0=[],t0=[];function q9(T){if(T.samples>0){if(b(T)===!1){let{textures:z,width:g,height:e}=T,R0=J.COLOR_BUFFER_BIT,I0=T.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,w0=Z.get(T),U0=z.length>1;if(U0)for(let h0=0;h0<z.length;h0++)Q.bindFramebuffer(J.FRAMEBUFFER,w0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+h0,J.RENDERBUFFER,null),Q.bindFramebuffer(J.FRAMEBUFFER,w0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+h0,J.TEXTURE_2D,null,0);Q.bindFramebuffer(J.READ_FRAMEBUFFER,w0.__webglMultisampledFramebuffer);let q0=T.texture.mipmaps;if(q0&&q0.length>0)Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,w0.__webglFramebuffer[0]);else Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,w0.__webglFramebuffer);for(let h0=0;h0<z.length;h0++){if(T.resolveDepthBuffer){if(T.depthBuffer)R0|=J.DEPTH_BUFFER_BIT;if(T.stencilBuffer&&T.resolveStencilBuffer)R0|=J.STENCIL_BUFFER_BIT}if(U0){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,w0.__webglColorRenderbuffer[h0]);let a0=Z.get(z[h0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,a0,0)}if(J.blitFramebuffer(0,0,g,e,0,0,g,e,R0,J.NEAREST),Y===!0){if(o0.length=0,t0.length=0,o0.push(J.COLOR_ATTACHMENT0+h0),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1)o0.push(I0),t0.push(I0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,t0);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,o0)}}if(Q.bindFramebuffer(J.READ_FRAMEBUFFER,null),Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),U0)for(let h0=0;h0<z.length;h0++){Q.bindFramebuffer(J.FRAMEBUFFER,w0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+h0,J.RENDERBUFFER,w0.__webglColorRenderbuffer[h0]);let a0=Z.get(z[h0]).__webglTexture;Q.bindFramebuffer(J.FRAMEBUFFER,w0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+h0,J.TEXTURE_2D,a0,0)}Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,w0.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&Y){let z=T.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[z])}}}function F9(T){return Math.min(K.maxSamples,T.samples)}function b(T){let z=Z.get(T);return T.samples>0&&$.has("WEBGL_multisampled_render_to_texture")===!0&&z.__useRenderToTexture!==!1}function n9(T){let z=H.render.frame;if(X.get(T)!==z)X.set(T,z),T.update()}function V9(T,z){let{colorSpace:g,format:e,type:R0}=T;if(T.isCompressedTexture===!0||T.isVideoTexture===!0)return z;if(g!==ZU&&g!==gJ)if(_9.getTransfer(g)===c9){if(e!==k8||R0!==q8)$9("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else U9("WebGLTextures: Unsupported texture color space:",g);return z}function C9(T){if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement)N.width=T.naturalWidth||T.width,N.height=T.naturalHeight||T.height;else if(typeof VideoFrame<"u"&&T instanceof VideoFrame)N.width=T.displayWidth,N.height=T.displayHeight;else N.width=T.width,N.height=T.height;return N}this.allocateTextureUnit=Q0,this.resetTextureUnits=t,this.getTextureUnits=v,this.setTextureUnits=l,this.setTexture2D=a,this.setTexture2DArray=u,this.setTexture3D=x,this.setTextureCube=Z0,this.rebindTextures=V0,this.setupRenderTarget=B0,this.updateRenderTargetMipmap=P0,this.updateMultisampleRenderTarget=q9,this.setupDepthRenderbuffer=D0,this.setupFrameBufferTexture=r,this.useMultisampledRTT=b,this.isReversedDepthBuffer=function(){return Q.buffers.depth.getReversed()}}function lF(J,$){function Q(Z,K=gJ){let U,H=_9.getTransfer(K);if(Z===q8)return J.UNSIGNED_BYTE;if(Z===_K)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===BK)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===aW)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===rW)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===iW)return J.BYTE;if(Z===oW)return J.SHORT;if(Z===L$)return J.UNSIGNED_SHORT;if(Z===VK)return J.INT;if(Z===IJ)return J.UNSIGNED_INT;if(Z===o8)return J.FLOAT;if(Z===I7)return J.HALF_FLOAT;if(Z===tW)return J.ALPHA;if(Z===eW)return J.RGB;if(Z===k8)return J.RGBA;if(Z===bJ)return J.DEPTH_COMPONENT;if(Z===xJ)return J.DEPTH_STENCIL;if(Z===JY)return J.RED;if(Z===IK)return J.RED_INTEGER;if(Z===hJ)return J.RG;if(Z===CK)return J.RG_INTEGER;if(Z===AK)return J.RGBA_INTEGER;if(Z===oQ||Z===aQ||Z===rQ||Z===tQ)if(H===c9)if(U=$.get("WEBGL_compressed_texture_s3tc_srgb"),U!==null){if(Z===oQ)return U.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===aQ)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===rQ)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===tQ)return U.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(U=$.get("WEBGL_compressed_texture_s3tc"),U!==null){if(Z===oQ)return U.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===aQ)return U.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===rQ)return U.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===tQ)return U.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===zK||Z===LK||Z===PK||Z===wK)if(U=$.get("WEBGL_compressed_texture_pvrtc"),U!==null){if(Z===zK)return U.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===LK)return U.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===PK)return U.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===wK)return U.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===TK||Z===SK||Z===kK||Z===jK||Z===vK||Z===eQ||Z===yK)if(U=$.get("WEBGL_compressed_texture_etc"),U!==null){if(Z===TK||Z===SK)return H===c9?U.COMPRESSED_SRGB8_ETC2:U.COMPRESSED_RGB8_ETC2;if(Z===kK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:U.COMPRESSED_RGBA8_ETC2_EAC;if(Z===jK)return U.COMPRESSED_R11_EAC;if(Z===vK)return U.COMPRESSED_SIGNED_R11_EAC;if(Z===eQ)return U.COMPRESSED_RG11_EAC;if(Z===yK)return U.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===fK||Z===bK||Z===xK||Z===hK||Z===gK||Z===pK||Z===uK||Z===mK||Z===dK||Z===lK||Z===cK||Z===nK||Z===sK||Z===iK)if(U=$.get("WEBGL_compressed_texture_astc"),U!==null){if(Z===fK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:U.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===bK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:U.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===xK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:U.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===hK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:U.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===gK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:U.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===pK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:U.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===uK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:U.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===mK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:U.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===dK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:U.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===lK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:U.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===cK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:U.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===nK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:U.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===sK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:U.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===iK)return H===c9?U.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:U.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===oK||Z===aK||Z===rK)if(U=$.get("EXT_texture_compression_bptc"),U!==null){if(Z===oK)return H===c9?U.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:U.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===aK)return U.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===rK)return U.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===tK||Z===eK||Z===JZ||Z===JU)if(U=$.get("EXT_texture_compression_rgtc"),U!==null){if(Z===tK)return U.COMPRESSED_RED_RGTC1_EXT;if(Z===eK)return U.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===JZ)return U.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===JU)return U.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===j6)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:Q}}var cF=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nF=`
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

}`;class Z5{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,$){if(this.texture===null){let Q=new YZ(J.texture);if(J.depthNear!==$.depthNear||J.depthFar!==$.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=Q}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let $=J.cameras[0].viewport,Q=new h9({vertexShader:cF,fragmentShader:nF,uniforms:{depthColor:{value:this.texture},depthWidth:{value:$.z},depthHeight:{value:$.w}}});this.mesh=new h(new G9(20,20),Q)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class K5 extends a8{constructor(J,$){super();let Q=this,Z=null,K=1,U=null,H="local-floor",W=1,Y=null,N=null,X=null,q=null,G=null,F=null,O=typeof XRWebGLBinding<"u",V=new Z5,D={},E=$.getContextAttributes(),C=null,L=null,R=[],_=[],B=new G0,A=null,M=null,I=new Q7;I.viewport=new K7;let y=new Q7;y.viewport=new K7;let S=[I,y],f=new SU,t=null,v=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(n){let Y0=R[n];if(Y0===void 0)Y0=new w$,R[n]=Y0;return Y0.getTargetRaySpace()},this.getControllerGrip=function(n){let Y0=R[n];if(Y0===void 0)Y0=new w$,R[n]=Y0;return Y0.getGripSpace()},this.getHand=function(n){let Y0=R[n];if(Y0===void 0)Y0=new w$,R[n]=Y0;return Y0.getHandSpace()};function l(n){let Y0=_.indexOf(n.inputSource);if(Y0===-1)return;let H0=R[Y0];if(H0!==void 0)H0.update(n.inputSource,n.frame,Y||U),H0.dispatchEvent({type:n.type,data:n.inputSource})}function Q0(){Z.removeEventListener("select",l),Z.removeEventListener("selectstart",l),Z.removeEventListener("selectend",l),Z.removeEventListener("squeeze",l),Z.removeEventListener("squeezestart",l),Z.removeEventListener("squeezeend",l),Z.removeEventListener("end",Q0),Z.removeEventListener("inputsourceschange",s);for(let n=0;n<R.length;n++){let Y0=_[n];if(Y0===null)continue;_[n]=null,R[n].disconnect(Y0)}t=null,v=null,V.reset();for(let n in D)delete D[n];if(J.setRenderTarget(C),G=null,q=null,X=null,Z=null,L=null,X0.stop(),Q.isPresenting=!1,J.setPixelRatio(A),J.setSize(B.width,B.height,!1),M!==null){let n=M.camera;n.fov=M.fov,n.zoom=M.zoom,n.updateProjectionMatrix(),M=null}Q.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(n){if(K=n,Q.isPresenting===!0)$9("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(n){if(H=n,Q.isPresenting===!0)$9("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return Y||U},this.setReferenceSpace=function(n){Y=n},this.getBaseLayer=function(){return q!==null?q:G},this.getBinding=function(){if(X===null&&O)X=new XRWebGLBinding(Z,$);return X},this.getFrame=function(){return F},this.getSession=function(){return Z},this.setSession=async function(n){if(Z=n,Z!==null){if(C=J.getRenderTarget(),Z.addEventListener("select",l),Z.addEventListener("selectstart",l),Z.addEventListener("selectend",l),Z.addEventListener("squeeze",l),Z.addEventListener("squeezestart",l),Z.addEventListener("squeezeend",l),Z.addEventListener("end",Q0),Z.addEventListener("inputsourceschange",s),E.xrCompatible!==!0)await $.makeXRCompatible();if(A=J.getPixelRatio(),J.getSize(B),!(O&&("createProjectionLayer"in XRWebGLBinding.prototype))){let H0={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:K};G=new XRWebGLLayer(Z,$,H0),Z.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),L=new X7(G.framebufferWidth,G.framebufferHeight,{format:k8,type:q8,colorSpace:J.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1,storeMultisampledDepthBuffer:G.ignoreDepthValues===!1,storeMultisampledStencilBuffer:G.ignoreDepthValues===!1})}else{let H0=null,c=null,A0=null;if(E.depth)A0=E.stencil?$.DEPTH24_STENCIL8:$.DEPTH_COMPONENT24,H0=E.stencil?xJ:bJ,c=E.stencil?j6:IJ;let r={colorFormat:$.RGBA8,depthFormat:A0,scaleFactor:K};X=this.getBinding(),q=X.createProjectionLayer(r),Z.updateRenderState({layers:[q]}),J.setPixelRatio(1),J.setSize(q.textureWidth,q.textureHeight,!1),L=new X7(q.textureWidth,q.textureHeight,{format:k8,type:q8,depthTexture:new uJ(q.textureWidth,q.textureHeight,c,void 0,void 0,void 0,void 0,void 0,void 0,H0),stencilBuffer:E.stencil,colorSpace:J.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:q.ignoreDepthValues===!1,resolveStencilBuffer:q.ignoreDepthValues===!1,storeMultisampledDepthBuffer:q.ignoreDepthValues===!1,storeMultisampledStencilBuffer:q.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(W),Y=null,U=await Z.requestReferenceSpace(H),X0.setContext(Z),X0.start(),Q.isPresenting=!0,Q.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return V.getDepthTexture()};function s(n){for(let Y0=0;Y0<n.removed.length;Y0++){let H0=n.removed[Y0],c=_.indexOf(H0);if(c>=0)_[c]=null,R[c].disconnect(H0)}for(let Y0=0;Y0<n.added.length;Y0++){let H0=n.added[Y0],c=_.indexOf(H0);if(c===-1){for(let r=0;r<R.length;r++)if(r>=_.length){_.push(H0),c=r;break}else if(_[r]===null){_[r]=H0,c=r;break}if(c===-1)break}let A0=R[c];if(A0)A0.connect(H0)}}let a=new k,u=new k;function x(n,Y0,H0){a.setFromMatrixPosition(Y0.matrixWorld),u.setFromMatrixPosition(H0.matrixWorld);let c=a.distanceTo(u),A0=Y0.projectionMatrix.elements,r=H0.projectionMatrix.elements,p0=A0[14]/(A0[10]-1),$0=A0[14]/(A0[10]+1),D0=(A0[9]+1)/A0[5],V0=(A0[9]-1)/A0[5],B0=(A0[8]-1)/A0[0],P0=(r[8]+1)/r[0],o0=p0*B0,t0=p0*P0,q9=c/(-B0+P0),F9=q9*-B0;if(Y0.matrixWorld.decompose(n.position,n.quaternion,n.scale),n.translateX(F9),n.translateZ(q9),n.matrixWorld.compose(n.position,n.quaternion,n.scale),n.matrixWorldInverse.copy(n.matrixWorld).invert(),A0[10]===-1)n.projectionMatrix.copy(Y0.projectionMatrix),n.projectionMatrixInverse.copy(Y0.projectionMatrixInverse);else{let b=p0+q9,n9=$0+q9,V9=o0-F9,C9=t0+(c-F9),T=D0*$0/n9*b,z=V0*$0/n9*b;n.projectionMatrix.makePerspective(V9,C9,T,z,b,n9),n.projectionMatrixInverse.copy(n.projectionMatrix).invert()}}function Z0(n,Y0){if(Y0===null)n.matrixWorld.copy(n.matrix);else n.matrixWorld.multiplyMatrices(Y0.matrixWorld,n.matrix);n.matrixWorldInverse.copy(n.matrixWorld).invert()}this.updateCamera=function(n){if(Z===null)return;let{near:Y0,far:H0}=n;if(V.texture!==null){if(V.depthNear>0)Y0=V.depthNear;if(V.depthFar>0)H0=V.depthFar}if(f.near=y.near=I.near=Y0,f.far=y.far=I.far=H0,t!==f.near||v!==f.far)Z.updateRenderState({depthNear:f.near,depthFar:f.far}),t=f.near,v=f.far;f.layers.mask=n.layers.mask|6,I.layers.mask=f.layers.mask&-5,y.layers.mask=f.layers.mask&-3;let c=n.parent,A0=f.cameras;Z0(f,c);for(let r=0;r<A0.length;r++)Z0(A0[r],c);if(A0.length===2)x(f,I,y);else f.projectionMatrix.copy(I.projectionMatrix);if(M===null&&n.isPerspectiveCamera)M={camera:n,fov:n.fov,zoom:n.zoom};O0(n,f,c)};function O0(n,Y0,H0){if(H0===null)n.matrix.copy(Y0.matrixWorld);else n.matrix.copy(H0.matrixWorld),n.matrix.invert(),n.matrix.multiply(Y0.matrixWorld);if(n.matrix.decompose(n.position,n.quaternion,n.scale),n.updateMatrixWorld(!0),n.projectionMatrix.copy(Y0.projectionMatrix),n.projectionMatrixInverse.copy(Y0.projectionMatrixInverse),n.isPerspectiveCamera)n.fov=G$*2*Math.atan(1/n.projectionMatrix.elements[5]),n.zoom=1}this.getCamera=function(){return f},this.getFoveation=function(){if(q===null&&G===null)return;return W},this.setFoveation=function(n){if(W=n,q!==null)q.fixedFoveation=n;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=n},this.hasDepthSensing=function(){return V.texture!==null},this.getDepthSensingMesh=function(){return V.getMesh(f)},this.getCameraTexture=function(n){return D[n]};let z0=null;function d(n,Y0){if(N=Y0.getViewerPose(Y||U),F=Y0,N!==null){let H0=N.views;if(G!==null)J.setRenderTargetFramebuffer(L,G.framebuffer),J.setRenderTarget(L);let c=!1;if(H0.length!==f.cameras.length)f.cameras.length=0,c=!0;for(let $0=0;$0<H0.length;$0++){let D0=H0[$0],V0=null;if(G!==null)V0=G.getViewport(D0);else{let P0=X.getViewSubImage(q,D0);if(V0=P0.viewport,$0===0)J.setRenderTargetTextures(L,P0.colorTexture,P0.depthStencilTexture),J.setRenderTarget(L)}let B0=S[$0];if(B0===void 0)B0=new Q7,B0.layers.enable($0),B0.viewport=new K7,S[$0]=B0;if(B0.matrix.fromArray(D0.transform.matrix),B0.matrix.decompose(B0.position,B0.quaternion,B0.scale),B0.projectionMatrix.fromArray(D0.projectionMatrix),B0.projectionMatrixInverse.copy(B0.projectionMatrix).invert(),B0.viewport.set(V0.x,V0.y,V0.width,V0.height),$0===0)f.matrix.copy(B0.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale);if(c===!0)f.cameras.push(B0)}let A0=Z.enabledFeatures;if(A0&&A0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&O){X=Q.getBinding();let $0=X.getDepthInformation(H0[0]);if($0&&$0.isValid&&$0.texture)V.init($0,Z.renderState)}if(A0&&A0.includes("camera-access")&&O){J.state.unbindTexture(),X=Q.getBinding();for(let $0=0;$0<H0.length;$0++){let D0=H0[$0].camera;if(D0){let V0=D[D0];if(!V0)V0=new YZ,D[D0]=V0;let B0=X.getCameraImage(D0);V0.sourceTexture=B0}}}}for(let H0=0;H0<R.length;H0++){let c=_[H0],A0=R[H0];if(c!==null&&A0!==void 0)A0.update(c,Y0,Y||U)}if(z0)z0(n,Y0);if(Y0.detectedPlanes)Q.dispatchEvent({type:"planesdetected",data:Y0});F=null}let X0=new nY;X0.setAnimationLoop(d),this.setAnimationLoop=function(n){z0=n},this.dispose=function(){}}}var sF=new v9,U5=new X9;U5.set(-1,0,0,0,1,0,0,0,1);function iF(J,$){function Q(D,E){if(D.matrixAutoUpdate===!0)D.updateMatrix();E.value.copy(D.matrix)}function Z(D,E){if(E.color.getRGB(D.fogColor.value,RU(J)),E.isFog)D.fogNear.value=E.near,D.fogFar.value=E.far;else if(E.isFogExp2)D.fogDensity.value=E.density}function K(D,E,C,L,R){if(E.isNodeMaterial)E.uniformsNeedUpdate=!1;else if(E.isMeshBasicMaterial)U(D,E);else if(E.isMeshLambertMaterial){if(U(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshToonMaterial)U(D,E),q(D,E);else if(E.isMeshPhongMaterial){if(U(D,E),X(D,E),E.envMap)D.envMapIntensity.value=E.envMapIntensity}else if(E.isMeshStandardMaterial){if(U(D,E),G(D,E),E.isMeshPhysicalMaterial)F(D,E,R)}else if(E.isMeshMatcapMaterial)U(D,E),O(D,E);else if(E.isMeshDepthMaterial)U(D,E);else if(E.isMeshDistanceMaterial)U(D,E),V(D,E);else if(E.isMeshNormalMaterial)U(D,E);else if(E.isLineBasicMaterial){if(H(D,E),E.isLineDashedMaterial)W(D,E)}else if(E.isPointsMaterial)Y(D,E,C,L);else if(E.isSpriteMaterial)N(D,E);else if(E.isShadowMaterial)D.color.value.copy(E.color),D.opacity.value=E.opacity;else if(E.isShaderMaterial)E.uniformsNeedUpdate=!1}function U(D,E){if(D.opacity.value=E.opacity,E.color)D.diffuse.value.copy(E.color);if(E.emissive)D.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity);if(E.map)D.map.value=E.map,Q(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,Q(E.alphaMap,D.alphaMapTransform);if(E.bumpMap){if(D.bumpMap.value=E.bumpMap,Q(E.bumpMap,D.bumpMapTransform),D.bumpScale.value=E.bumpScale,E.side===E7)D.bumpScale.value*=-1}if(E.normalMap){if(D.normalMap.value=E.normalMap,Q(E.normalMap,D.normalMapTransform),D.normalScale.value.copy(E.normalScale),E.side===E7)D.normalScale.value.negate()}if(E.displacementMap)D.displacementMap.value=E.displacementMap,Q(E.displacementMap,D.displacementMapTransform),D.displacementScale.value=E.displacementScale,D.displacementBias.value=E.displacementBias;if(E.emissiveMap)D.emissiveMap.value=E.emissiveMap,Q(E.emissiveMap,D.emissiveMapTransform);if(E.specularMap)D.specularMap.value=E.specularMap,Q(E.specularMap,D.specularMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest;let C=$.get(E),L=C.envMap,R=C.envMapRotation;if(L){if(D.envMap.value=L,D.envMapRotation.value.setFromMatrix4(sF.makeRotationFromEuler(R)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1)D.envMapRotation.value.premultiply(U5);D.reflectivity.value=E.reflectivity,D.ior.value=E.ior,D.refractionRatio.value=E.refractionRatio}if(E.lightMap)D.lightMap.value=E.lightMap,D.lightMapIntensity.value=E.lightMapIntensity,Q(E.lightMap,D.lightMapTransform);if(E.aoMap)D.aoMap.value=E.aoMap,D.aoMapIntensity.value=E.aoMapIntensity,Q(E.aoMap,D.aoMapTransform)}function H(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,E.map)D.map.value=E.map,Q(E.map,D.mapTransform)}function W(D,E){D.dashSize.value=E.dashSize,D.totalSize.value=E.dashSize+E.gapSize,D.scale.value=E.scale}function Y(D,E,C,L){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.size.value=E.size*C,D.scale.value=L*0.5,E.map)D.map.value=E.map,Q(E.map,D.uvTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,Q(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function N(D,E){if(D.diffuse.value.copy(E.color),D.opacity.value=E.opacity,D.rotation.value=E.rotation,E.map)D.map.value=E.map,Q(E.map,D.mapTransform);if(E.alphaMap)D.alphaMap.value=E.alphaMap,Q(E.alphaMap,D.alphaMapTransform);if(E.alphaTest>0)D.alphaTest.value=E.alphaTest}function X(D,E){D.specular.value.copy(E.specular),D.shininess.value=Math.max(E.shininess,0.0001)}function q(D,E){if(E.gradientMap)D.gradientMap.value=E.gradientMap}function G(D,E){if(D.metalness.value=E.metalness,E.metalnessMap)D.metalnessMap.value=E.metalnessMap,Q(E.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=E.roughness,E.roughnessMap)D.roughnessMap.value=E.roughnessMap,Q(E.roughnessMap,D.roughnessMapTransform);if(E.envMap)D.envMapIntensity.value=E.envMapIntensity}function F(D,E,C){if(D.ior.value=E.ior,E.sheen>0){if(D.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),D.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap)D.sheenColorMap.value=E.sheenColorMap,Q(E.sheenColorMap,D.sheenColorMapTransform);if(E.sheenRoughnessMap)D.sheenRoughnessMap.value=E.sheenRoughnessMap,Q(E.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(E.clearcoat>0){if(D.clearcoat.value=E.clearcoat,D.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap)D.clearcoatMap.value=E.clearcoatMap,Q(E.clearcoatMap,D.clearcoatMapTransform);if(E.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,Q(E.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(E.clearcoatNormalMap){if(D.clearcoatNormalMap.value=E.clearcoatNormalMap,Q(E.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===E7)D.clearcoatNormalScale.value.negate()}}if(E.dispersion>0)D.dispersion.value=E.dispersion;if(E.retroreflectivity>0)D.retroreflectivity.value=E.retroreflectivity;if(E.iridescence>0){if(D.iridescence.value=E.iridescence,D.iridescenceIOR.value=E.iridescenceIOR,D.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap)D.iridescenceMap.value=E.iridescenceMap,Q(E.iridescenceMap,D.iridescenceMapTransform);if(E.iridescenceThicknessMap)D.iridescenceThicknessMap.value=E.iridescenceThicknessMap,Q(E.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(E.transmission>0){if(D.transmission.value=E.transmission,D.transmissionSamplerMap.value=C.texture,D.transmissionSamplerSize.value.set(C.width,C.height),E.transmissionMap)D.transmissionMap.value=E.transmissionMap,Q(E.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=E.thickness,E.thicknessMap)D.thicknessMap.value=E.thicknessMap,Q(E.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=E.attenuationDistance,D.attenuationColor.value.copy(E.attenuationColor)}if(E.anisotropy>0){if(D.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap)D.anisotropyMap.value=E.anisotropyMap,Q(E.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=E.specularIntensity,D.specularColor.value.copy(E.specularColor),E.specularColorMap)D.specularColorMap.value=E.specularColorMap,Q(E.specularColorMap,D.specularColorMapTransform);if(E.specularIntensityMap)D.specularIntensityMap.value=E.specularIntensityMap,Q(E.specularIntensityMap,D.specularIntensityMapTransform)}function O(D,E){if(E.matcap)D.matcap.value=E.matcap}function V(D,E){let C=$.get(E).light;D.referencePosition.value.setFromMatrixPosition(C.matrixWorld),D.nearDistance.value=C.shadow.camera.near,D.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:K}}function oF(J,$,Q,Z){let K={},U={},H=[],W=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function Y(R,_){let B=_.program;Z.uniformBlockBinding(R,B)}function N(R,_){let B=K[R.id];if(B===void 0)D(R),B=X(R),K[R.id]=B,R.addEventListener("dispose",C);let A=_.program;Z.updateUBOMapping(R,A);let M=$.render.frame;if(U[R.id]!==M)G(R),U[R.id]=M}function X(R){let _=q();R.__bindingPointIndex=_;let B=J.createBuffer(),A=R.__size,M=R.usage;return J.bindBuffer(J.UNIFORM_BUFFER,B),J.bufferData(J.UNIFORM_BUFFER,A,M),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,_,B),B}function q(){for(let R=0;R<W;R++)if(H.indexOf(R)===-1)return H.push(R),R;return U9("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(R){let _=K[R.id],B=R.uniforms,A=R.__cache;J.bindBuffer(J.UNIFORM_BUFFER,_);for(let M=0,I=B.length;M<I;M++){let y=B[M];if(Array.isArray(y))for(let S=0,f=y.length;S<f;S++)F(y[S],M,S,A);else F(y,M,0,A)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(R,_,B,A){if(V(R,_,B,A)===!0){let{__offset:M,value:I}=R;if(Array.isArray(I)){let y=0;for(let S=0;S<I.length;S++){let f=I[S],t=E(f);if(O(f,R.__data,y),typeof f!=="number"&&typeof f!=="boolean"&&!f.isMatrix3&&!ArrayBuffer.isView(f))y+=t.storage/Float32Array.BYTES_PER_ELEMENT}}else O(I,R.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,M,R.__data)}}function O(R,_,B){if(typeof R==="number"||typeof R==="boolean")_[0]=R;else if(R.isMatrix3)_[0]=R.elements[0],_[1]=R.elements[1],_[2]=R.elements[2],_[3]=0,_[4]=R.elements[3],_[5]=R.elements[4],_[6]=R.elements[5],_[7]=0,_[8]=R.elements[6],_[9]=R.elements[7],_[10]=R.elements[8],_[11]=0;else if(ArrayBuffer.isView(R))_.set(new R.constructor(R.buffer,R.byteOffset,_.length));else R.toArray(_,B)}function V(R,_,B,A){let M=R.value,I=_+"_"+B;if(A[I]===void 0){if(typeof M==="number"||typeof M==="boolean")A[I]=M;else if(ArrayBuffer.isView(M))A[I]=M.slice();else A[I]=M.clone();return!0}else{let y=A[I];if(typeof M==="number"||typeof M==="boolean"){if(y!==M)return A[I]=M,!0}else if(ArrayBuffer.isView(M))return!0;else if(y.equals(M)===!1)return y.copy(M),!0}return!1}function D(R){let _=R.uniforms,B=0,A=16;for(let I=0,y=_.length;I<y;I++){let S=Array.isArray(_[I])?_[I]:[_[I]];for(let f=0,t=S.length;f<t;f++){let v=S[f],l=Array.isArray(v.value)?v.value:[v.value];for(let Q0=0,s=l.length;Q0<s;Q0++){let a=l[Q0],u=E(a),x=B%A,Z0=x%u.boundary,O0=x+Z0;if(B+=Z0,O0!==0&&A-O0<u.storage)B+=A-O0;v.__data=new Float32Array(u.storage/Float32Array.BYTES_PER_ELEMENT),v.__offset=B,B+=u.storage}}}let M=B%A;if(M>0)B+=A-M;return R.__size=B,R.__cache={},this}function E(R){let _={boundary:0,storage:0};if(typeof R==="number"||typeof R==="boolean")_.boundary=4,_.storage=4;else if(R.isVector2)_.boundary=8,_.storage=8;else if(R.isVector3||R.isColor)_.boundary=16,_.storage=12;else if(R.isVector4)_.boundary=16,_.storage=16;else if(R.isMatrix3)_.boundary=48,_.storage=48;else if(R.isMatrix4)_.boundary=64,_.storage=64;else if(R.isTexture)$9("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(R))_.boundary=16,_.storage=R.byteLength;else $9("WebGLRenderer: Unsupported uniform value type.",R);return _}function C(R){let _=R.target;_.removeEventListener("dispose",C);let B=H.indexOf(_.__bindingPointIndex);H.splice(B,1),J.deleteBuffer(K[_.id]),delete K[_.id],delete U[_.id]}function L(){for(let R in K)J.deleteBuffer(K[R]);H=[],K={},U={}}return{bind:Y,update:N,dispose:L}}var aF=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),v8=null;function rF(){if(v8===null)v8=new y6(aF,16,16,hJ,I7),v8.name="DFG_LUT",v8.minFilter=h7,v8.magFilter=h7,v8.wrapS=sQ,v8.wrapT=sQ,v8.generateMipmaps=!1,v8.needsUpdate=!0;return v8}class _8{constructor(J={}){let{canvas:$=YY(),context:Q=null,depth:Z=!0,stencil:K=!1,alpha:U=!1,antialias:H=!1,premultipliedAlpha:W=!0,preserveDrawingBuffer:Y=!1,powerPreference:N="default",failIfMajorPerformanceCaveat:X=!1,reversedDepthBuffer:q=!1,outputBufferType:G=q8}=J;this.isWebGLRenderer=!0;let F;if(Q!==null){if(typeof WebGLRenderingContext<"u"&&Q instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=Q.getContextAttributes().alpha}else F=U;let O=G,V=new Set([AK,CK,IK]),D=new Set([q8,IJ,L$,j6,_K,BK]),E=new Uint32Array(4),C=new Int32Array(4),L=new k,R=null,_=null,B=[],A=[],M=null;this.domElement=$,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=X8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,y=!1,S=null,f=null,t=null,v=null;this._outputColorSpace=R7;let l=0,Q0=0,s=null,a=-1,u=null,x=new K7,Z0=new K7,O0=null,z0=new F0(0),d=0,X0=$.width,n=$.height,Y0=1,H0=null,c=null,A0=new K7(0,0,X0,n),r=new K7(0,0,X0,n),p0=!1,$0=new k$,D0=!1,V0=!1,B0=new v9,P0=new k,o0=new K7,t0={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},q9=!1;function F9(){return s===null?Y0:1}let b=Q;function n9(P,p){return $.getContext(P,p)}let V9,C9,T,z,g,e,R0,I0,w0,U0,q0,h0,a0,k0,C0,e0,Z9,f9,m,T0,N0,S0,u0;try{let P={alpha:!0,depth:Z,stencil:K,antialias:H,premultipliedAlpha:W,preserveDrawingBuffer:Y,powerPreference:N,failIfMajorPerformanceCaveat:X};if("setAttribute"in $)$.setAttribute("data-engine",`three.js r${FW}`);if($.addEventListener("webglcontextlost",D9,!1),$.addEventListener("webglcontextrestored",r9,!1),$.addEventListener("webglcontextcreationerror",p9,!1),b===null){if(b=n9("webgl2",P),b===null)if(n9("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}M0()}catch(P){throw $.removeEventListener("webglcontextlost",D9,!1),$.removeEventListener("webglcontextrestored",r9,!1),$.removeEventListener("webglcontextcreationerror",p9,!1),U9("WebGLRenderer: "+P.message),P}function M0(){if(V9=new K1(b),V9.init(),N0=new lF(b,V9),C9=new iq(b,V9,J,N0),T=new mF(b,V9),C9.reversedDepthBuffer&&q)T.buffers.depth.setReversed(!0);f=b.createFramebuffer(),t=b.createFramebuffer(),v=b.createFramebuffer(),z=new W1(b),g=new wF,e=new dF(b,V9,T,g,C9,N0,z),R0=new Z1(I),I0=new NX(b),S0=new nq(b,I0),w0=new U1(b,I0,z,S0),U0=new N1(b,w0,I0,S0,z),f9=new Y1(b,C9,e),C0=new oq(g),q0=new PF(I,R0,V9,C9,S0,C0),h0=new iF(I,g),a0=new SF,k0=new bF(V9),Z9=new cq(I,R0,T,U0,F,W),e0=new uF(I,U0,C9),u0=new oF(b,z,C9,T),m=new sq(b,V9,z),T0=new H1(b,V9,z),z.programs=q0.programs,I.capabilities=C9,I.extensions=V9,I.properties=g,I.renderLists=a0,I.shadowMap=e0,I.state=T,I.info=z}if(O!==q8)M=new G1(O,$.width,$.height,H,Z,K);let f0=new K5(I,b);this.xr=f0,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){let P=V9.get("WEBGL_lose_context");if(P)P.loseContext()},this.forceContextRestore=function(){let P=V9.get("WEBGL_lose_context");if(P)P.restoreContext()},this.getPixelRatio=function(){return Y0},this.setPixelRatio=function(P){if(P===void 0)return;Y0=P,this.setSize(X0,n,!1)},this.getSize=function(P){return P.set(X0,n)},this.setSize=function(P,p,J0=!0){if(f0.isPresenting){$9("WebGLRenderer: Can't change size while VR device is presenting.");return}if(X0=P,n=p,$.width=Math.floor(P*Y0),$.height=Math.floor(p*Y0),J0===!0)$.style.width=P+"px",$.style.height=p+"px";if(M!==null)M.setSize($.width,$.height);this.setViewport(0,0,P,p)},this.getDrawingBufferSize=function(P){return P.set(X0*Y0,n*Y0).floor()},this.setDrawingBufferSize=function(P,p,J0){X0=P,n=p,Y0=J0,$.width=Math.floor(P*J0),$.height=Math.floor(p*J0),this.setViewport(0,0,P,p)},this.setEffects=function(P){if(O===q8){U9("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(P){for(let p=0;p<P.length;p++)if(P[p].isOutputPass===!0){$9("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(P||[])},this.getCurrentViewport=function(P){return P.copy(x)},this.getViewport=function(P){return P.copy(A0)},this.setViewport=function(P,p,J0,i){if(P.isVector4)A0.set(P.x,P.y,P.z,P.w);else A0.set(P,p,J0,i);T.viewport(x.copy(A0).multiplyScalar(Y0).round())},this.getScissor=function(P){return P.copy(r)},this.setScissor=function(P,p,J0,i){if(P.isVector4)r.set(P.x,P.y,P.z,P.w);else r.set(P,p,J0,i);T.scissor(Z0.copy(r).multiplyScalar(Y0).round())},this.getScissorTest=function(){return p0},this.setScissorTest=function(P){T.setScissorTest(p0=P)},this.setOpaqueSort=function(P){H0=P},this.setTransparentSort=function(P){c=P},this.getClearColor=function(P){return P.copy(Z9.getClearColor())},this.setClearColor=function(){Z9.setClearColor(...arguments)},this.getClearAlpha=function(){return Z9.getClearAlpha()},this.setClearAlpha=function(){Z9.setClearAlpha(...arguments)},this.clear=function(P=!0,p=!0,J0=!0){let i=0;if(P){let o=!1;if(s!==null){let x0=s.texture.format;o=V.has(x0)}if(o){let x0=s.texture.type,d0=D.has(x0),b0=Z9.getClearColor(),c0=Z9.getClearAlpha(),s0=b0.r,R9=b0.g,A9=b0.b;if(d0)E[0]=s0,E[1]=R9,E[2]=A9,E[3]=c0,b.clearBufferuiv(b.COLOR,0,E);else C[0]=s0,C[1]=R9,C[2]=A9,C[3]=c0,b.clearBufferiv(b.COLOR,0,C)}else i|=b.COLOR_BUFFER_BIT}if(p)i|=b.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(J0)i|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(i!==0)b.clear(i)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(P){P.setRenderer(this),S=P},this.dispose=function(){$.removeEventListener("webglcontextlost",D9,!1),$.removeEventListener("webglcontextrestored",r9,!1),$.removeEventListener("webglcontextcreationerror",p9,!1),Z9.dispose(),a0.dispose(),k0.dispose(),g.dispose(),R0.dispose(),U0.dispose(),S0.dispose(),u0.dispose(),q0.dispose(),f0.dispose(),f0.removeEventListener("sessionstart",OH),f0.removeEventListener("sessionend",RH),PJ.stop()};function D9(P){P.preventDefault(),X$("WebGLRenderer: Context Lost."),y=!0}function r9(){X$("WebGLRenderer: Context Restored."),y=!1;let P=z.autoReset,p=e0.enabled,J0=e0.autoUpdate,i=e0.needsUpdate,o=e0.type;M0(),z.autoReset=P,e0.enabled=p,e0.autoUpdate=J0,e0.needsUpdate=i,e0.type=o}function p9(P){U9("WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function A8(P){let p=P.target;p.removeEventListener("dispose",A8),g8(p)}function g8(P){n5(P),g.remove(P)}function n5(P){let p=g.get(P).programs;if(p!==void 0){if(p.forEach(function(J0){q0.releaseProgram(J0)}),P.isShaderMaterial)q0.releaseShaderCache(P)}}this.renderBufferDirect=function(P,p,J0,i,o,x0){if(p===null)p=t0;let d0=o.isMesh&&o.matrixWorld.determinantAffine()<0,b0=o5(P,p,J0,i,o);T.setMaterial(i,d0);let c0=J0.index,s0=1;if(i.wireframe===!0){if(c0=w0.getWireframeAttribute(J0),c0===void 0)return;s0=2}let R9=J0.drawRange,A9=J0.attributes.position,n0=R9.start*s0,u9=(R9.start+R9.count)*s0;if(x0!==null)n0=Math.max(n0,x0.start*s0),u9=Math.min(u9,(x0.start+x0.count)*s0);if(c0!==null)n0=Math.max(n0,0),u9=Math.min(u9,c0.count);else if(A9!==void 0&&A9!==null)n0=Math.max(n0,0),u9=Math.min(u9,A9.count);let q7=u9-n0;if(q7<0||q7===1/0)return;S0.setup(o,i,b0,J0,c0);let $7,a9=m;if(c0!==null)$7=I0.get(c0),a9=T0,a9.setIndex($7);if(o.isMesh)if(i.wireframe===!0)T.setLineWidth(i.wireframeLinewidth*F9()),a9.setMode(b.LINES);else a9.setMode(b.TRIANGLES);else if(o.isLine){let w7=i.linewidth;if(w7===void 0)w7=1;if(T.setLineWidth(w7*F9()),o.isLineSegments)a9.setMode(b.LINES);else if(o.isLineLoop)a9.setMode(b.LINE_LOOP);else a9.setMode(b.LINE_STRIP)}else if(o.isPoints)a9.setMode(b.POINTS);else if(o.isSprite)a9.setMode(b.TRIANGLES);if(o.isBatchedMesh)if(!V9.get("WEBGL_multi_draw")){let{_multiDrawStarts:w7,_multiDrawCounts:m0,_multiDrawCount:j7}=o,k9=c0?I0.get(c0).bytesPerElement:1,e7=g.get(i).currentProgram.getUniforms();for(let z8=0;z8<j7;z8++)e7.setValue(b,"_gl_DrawID",z8),a9.render(w7[z8]/k9,m0[z8])}else a9.renderMultiDraw(o._multiDrawStarts,o._multiDrawCounts,o._multiDrawCount);else if(o.isInstancedMesh)a9.renderInstances(n0,q7,o.count);else if(J0.isInstancedBufferGeometry){let w7=J0._maxInstanceCount!==void 0?J0._maxInstanceCount:1/0,m0=Math.min(J0.instanceCount,w7);a9.renderInstances(n0,q7,m0)}else a9.render(n0,q7)};function EH(P,p,J0,i){if(S!==null&&P.isNodeMaterial)S.setObject(i,P);if(D0===!0)C0.setState(P,J0,!1);if(P.transparent===!0&&P.side===m9&&P.forceSinglePass===!1)P.side=E7,P.needsUpdate=!0,HQ(P,p,i),P.side=T6,P.needsUpdate=!0,HQ(P,p,i),P.side=m9;else HQ(P,p,i)}this.compile=function(P,p,J0=null){if(J0===null)J0=P;if(S!==null)S.renderStart(P,p,J0);if(_=k0.get(J0),_.init(p),A.push(_),J0.traverseVisible(function(o){if(o.isLight&&o.layers.test(p.layers)){if(_.pushLight(o),o.castShadow)_.pushShadow(o)}}),P!==J0)P.traverseVisible(function(o){if(o.isLight&&o.layers.test(p.layers)){if(_.pushLight(o),o.castShadow)_.pushShadow(o)}});if(_.setupLights(),S!==null)S.updateLights(_.state.lightsArray);if(V0=this.localClippingEnabled,D0=C0.init(this.clippingPlanes,V0),D0===!0)C0.setGlobalState(this.clippingPlanes,p);if(S!==null)e0.render(_.state.shadowsArray,J0,p);let i=new Set;if(P.traverse(function(o){if(!(o.isMesh||o.isPoints||o.isLine||o.isSprite))return;let x0=o.material;if(x0)if(Array.isArray(x0))for(let d0=0;d0<x0.length;d0++){let b0=x0[d0];EH(b0,J0,p,o),i.add(b0)}else EH(x0,J0,p,o),i.add(x0)}),_=A.pop(),S!==null)S.renderEnd();return i},this.compileAsync=function(P,p,J0=null){let i=this.compile(P,p,J0);return new Promise((o)=>{function x0(){if(i.forEach(function(d0){let c0=g.get(d0).currentProgram;if(c0===void 0||c0.isReady())i.delete(d0)}),i.size===0){o(P);return}setTimeout(x0,10)}if(V9.get("KHR_parallel_shader_compile")!==null)x0();else setTimeout(x0,10)})};let bZ=null;function s5(P){if(bZ)bZ(P)}function OH(){PJ.stop()}function RH(){PJ.start()}let PJ=new nY;if(PJ.setAnimationLoop(s5),typeof self<"u")PJ.setContext(self);this.setAnimationLoop=function(P){bZ=P,f0.setAnimationLoop(P),P===null?PJ.stop():PJ.start()},f0.addEventListener("sessionstart",OH),f0.addEventListener("sessionend",RH),this.render=function(P,p){if(p!==void 0&&p.isCamera!==!0){U9("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(S!==null)S.renderStart(P,p);let J0=f0.enabled===!0&&f0.isPresenting===!0,i=M!==null&&(s===null||J0)&&M.begin(I,s);if(P.matrixWorldAutoUpdate===!0)P.updateMatrixWorld();if(p.parent===null&&p.matrixWorldAutoUpdate===!0)p.updateMatrixWorld();if(f0.enabled===!0&&f0.isPresenting===!0&&(M===null||M.isCompositing()===!1)){if(f0.cameraAutoUpdate===!0)f0.updateCamera(p);p=f0.getCamera()}if(P.isScene===!0)P.onBeforeRender(I,P,p,s);if(_=k0.get(P,A.length),_.init(p),_.state.textureUnits=e.getTextureUnits(),A.push(_),B0.multiplyMatrices(p.projectionMatrix,p.matrixWorldInverse),$0.setFromProjectionMatrix(B0,HU,p.reversedDepth),V0=this.localClippingEnabled,D0=C0.init(this.clippingPlanes,V0),R=a0.get(P,B.length),R.init(),B.push(R),f0.enabled===!0&&f0.isPresenting===!0){let d0=I.xr.getDepthSensingMesh();if(d0!==null)xZ(d0,p,-1/0,I.sortObjects)}if(xZ(P,p,0,I.sortObjects),R.finish(),S!==null)S.updateLights(_.state.lightsArray);if(I.sortObjects===!0)R.sort(H0,c);if(q9=f0.enabled===!1||f0.isPresenting===!1||f0.hasDepthSensing()===!1,q9)Z9.addToRenderList(R,P);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(D0===!0)C0.beginShadows();let o=_.state.shadowsArray;if(e0.render(o,P,p),D0===!0)C0.endShadows();if((i&&M.hasRenderPass())===!1){let{opaque:d0,transmissive:b0}=R;if(_.setupLights(),p.isArrayCamera){let c0=p.cameras;if(b0.length>0)for(let s0=0,R9=c0.length;s0<R9;s0++){let A9=c0[s0];VH(d0,b0,P,A9)}if(q9)Z9.render(P);for(let s0=0,R9=c0.length;s0<R9;s0++){let A9=c0[s0];MH(R,P,A9,A9.viewport)}}else{if(b0.length>0)VH(d0,b0,P,p);if(q9)Z9.render(P);MH(R,P,p)}}if(s!==null&&Q0===0)e.updateMultisampleRenderTarget(s),e.updateRenderTargetMipmap(s);if(i)M.end(I);if(P.isScene===!0)P.onAfterRender(I,P,p);if(S0.resetDefaultState(),a=-1,u=null,A.pop(),A.length>0){if(_=A[A.length-1],e.setTextureUnits(_.state.textureUnits),D0===!0)C0.setGlobalState(I.clippingPlanes,_.state.camera)}else _=null;if(B.pop(),B.length>0)R=B[B.length-1];else R=null;if(S!==null)S.renderEnd()};function xZ(P,p,J0,i){if(P.visible===!1)return;if(P.layers.test(p.layers)){if(P.isGroup)J0=P.renderOrder;else if(P.isLOD){if(P.autoUpdate===!0)P.update(p)}else if(P.isLightProbeGrid)_.pushLightProbeGrid(P);else if(P.isLight){if(_.pushLight(P),P.castShadow)_.pushShadow(P)}else if(P.isSprite){if(!P.frustumCulled||P.intersectsFrustum($0)){if(i)o0.setFromMatrixPosition(P.matrixWorld).applyMatrix4(B0);let d0=U0.update(P),b0=P.material;if(b0.visible)R.push(P,d0,b0,J0,o0.z,null,p)}}else if(P.isMesh||P.isLine||P.isPoints){if(!P.frustumCulled||P.intersectsFrustum($0)){let d0=U0.update(P),b0=P.material;if(i){if(P.boundingSphere!==void 0){if(P.boundingSphere===null)P.computeBoundingSphere();o0.copy(P.boundingSphere.center)}else{if(d0.boundingSphere===null)d0.computeBoundingSphere();o0.copy(d0.boundingSphere.center)}o0.applyMatrix4(P.matrixWorld).applyMatrix4(B0)}if(Array.isArray(b0)){let c0=d0.groups;for(let s0=0,R9=c0.length;s0<R9;s0++){let A9=c0[s0],n0=b0[A9.materialIndex];if(n0&&n0.visible)R.push(P,d0,n0,J0,o0.z,A9,p)}}else if(b0.visible)R.push(P,d0,b0,J0,o0.z,null,p)}}}let x0=P.children;for(let d0=0,b0=x0.length;d0<b0;d0++)xZ(x0[d0],p,J0,i)}function MH(P,p,J0,i){let{opaque:o,transmissive:x0,transparent:d0}=P;if(_.setupLightsView(J0),D0===!0)C0.setGlobalState(I.clippingPlanes,J0);if(i)T.viewport(x.copy(i));if(o.length>0)UQ(o,p,J0);if(x0.length>0)UQ(x0,p,J0);if(d0.length>0)UQ(d0,p,J0);T.buffers.depth.setTest(!0),T.buffers.depth.setMask(!0),T.buffers.color.setMask(!0),T.setPolygonOffset(!1)}function VH(P,p,J0,i){if((J0.isScene===!0?J0.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget[i.id]===void 0){let n0=V9.has("EXT_color_buffer_half_float")||V9.has("EXT_color_buffer_float");_.state.transmissionRenderTarget[i.id]=new X7(1,1,{generateMipmaps:!0,type:n0?I7:q8,minFilter:fJ,samples:Math.max(4,C9.samples),stencilBuffer:K,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:_9.workingColorSpace})}let x0=_.state.transmissionRenderTarget[i.id],d0=i.viewport||x;x0.setSize(d0.z*I.transmissionResolutionScale,d0.w*I.transmissionResolutionScale);let b0=I.getRenderTarget(),c0=I.getActiveCubeFace(),s0=I.getActiveMipmapLevel();if(I.setRenderTarget(x0),I.getClearColor(z0),d=I.getClearAlpha(),d<1)I.setClearColor(16777215,0.5);if(I.clear(),q9)Z9.render(J0);let R9=I.toneMapping;I.toneMapping=X8;let A9=i.viewport;if(i.viewport!==void 0)i.viewport=void 0;if(_.setupLightsView(i),D0===!0)C0.setGlobalState(I.clippingPlanes,i);if(UQ(P,J0,i),e.updateMultisampleRenderTarget(x0),e.updateRenderTargetMipmap(x0),V9.has("WEBGL_multisampled_render_to_texture")===!1){let n0=!1;for(let u9=0,q7=p.length;u9<q7;u9++){let $7=p[u9],{object:a9,geometry:w7,material:m0,group:j7}=$7;if(m0.side===m9&&a9.layers.test(i.layers)){let k9=m0.side;m0.side=E7,m0.needsUpdate=!0,_H(a9,J0,i,w7,m0,j7),m0.side=k9,m0.needsUpdate=!0,n0=!0}}if(n0===!0)e.updateMultisampleRenderTarget(x0),e.updateRenderTargetMipmap(x0)}if(I.setRenderTarget(b0,c0,s0),I.setClearColor(z0,d),A9!==void 0)i.viewport=A9;I.toneMapping=R9}function UQ(P,p,J0){let i=p.isScene===!0?p.overrideMaterial:null;for(let o=0,x0=P.length;o<x0;o++){let d0=P[o],{object:b0,geometry:c0,group:s0}=d0,R9=d0.material;if(R9.allowOverride===!0&&i!==null)R9=i;if(b0.layers.test(J0.layers))_H(b0,p,J0,c0,R9,s0)}}function _H(P,p,J0,i,o,x0){if(S!==null&&o.isNodeMaterial)S.setObject(P,o);if(P.onBeforeRender(I,p,J0,i,o,x0),P.modelViewMatrix.multiplyMatrices(J0.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),o.onBeforeRender(I,p,J0,i,P,x0),o.transparent===!0&&o.side===m9&&o.forceSinglePass===!1)o.side=E7,o.needsUpdate=!0,I.renderBufferDirect(J0,p,i,o,P,x0),o.side=T6,o.needsUpdate=!0,I.renderBufferDirect(J0,p,i,o,P,x0),o.side=m9;else I.renderBufferDirect(J0,p,i,o,P,x0);P.onAfterRender(I,p,J0,i,o,x0)}function HQ(P,p,J0){if(p.isScene!==!0)p=t0;let i=g.get(P),o=_.state.lights,x0=_.state.shadowsArray,d0=o.state.version,b0=q0.getParameters(P,o.state,x0,p,J0,_.state.lightProbeGridArray),c0=q0.getProgramCacheKey(b0),s0=i.programs;i.environment=P.isMeshStandardMaterial||P.isMeshLambertMaterial||P.isMeshPhongMaterial?p.environment:null,i.fog=p.fog;let R9=P.isMeshStandardMaterial||P.isMeshLambertMaterial&&!P.envMap||P.isMeshPhongMaterial&&!P.envMap;if(i.envMap=R0.get(P.envMap||i.environment,R9),i.envMapRotation=i.environment!==null&&P.envMap===null?p.environmentRotation:P.envMapRotation,s0===void 0)P.addEventListener("dispose",A8),s0=new Map,i.programs=s0;let A9=s0.get(c0);if(A9!==void 0){if(i.currentProgram===A9&&i.lightsStateVersion===d0)return IH(P,b0),A9}else{if(b0.uniforms=q0.getUniforms(P),S!==null&&P.isNodeMaterial)S.build(P,J0,b0);P.onBeforeCompile(b0,I),A9=q0.acquireProgram(b0,c0),s0.set(c0,A9),i.uniforms=b0.uniforms}let n0=i.uniforms;if(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)n0.clippingPlanes=C0.uniform;if(IH(P,b0),i.needsLights=r5(P),i.lightsStateVersion=d0,i.needsLights)n0.ambientLightColor.value=o.state.ambient,n0.lightProbe.value=o.state.probe,n0.sunLights.value=o.state.sun,n0.sunLightShadows.value=o.state.sunShadow,n0.directionalLights.value=o.state.directional,n0.directionalLightShadows.value=o.state.directionalShadow,n0.spotLights.value=o.state.spot,n0.spotLightShadows.value=o.state.spotShadow,n0.rectAreaLights.value=o.state.rectArea,n0.ltc_1.value=o.state.rectAreaLTC1,n0.ltc_2.value=o.state.rectAreaLTC2,n0.pointLights.value=o.state.point,n0.pointLightShadows.value=o.state.pointShadow,n0.hemisphereLights.value=o.state.hemi,n0.sunShadowMatrix.value=o.state.sunShadowMatrix,n0.sunShadowCascade.value=o.state.sunShadowCascade,n0.directionalShadowMatrix.value=o.state.directionalShadowMatrix,n0.spotLightMatrix.value=o.state.spotLightMatrix,n0.spotLightMap.value=o.state.spotLightMap,n0.pointShadowMatrix.value=o.state.pointShadowMatrix;return i.lightProbeGrid=_.state.lightProbeGridArray.length>0,i.currentProgram=A9,i.uniformsList=null,A9}function BH(P){if(P.uniformsList===null){let p=P.currentProgram.getUniforms();P.uniformsList=m$.seqWithValue(p.seq,P.uniforms)}return P.uniformsList}function IH(P,p){let J0=g.get(P);J0.outputColorSpace=p.outputColorSpace,J0.batching=p.batching,J0.batchingColor=p.batchingColor,J0.instancing=p.instancing,J0.instancingColor=p.instancingColor,J0.instancingMorph=p.instancingMorph,J0.skinning=p.skinning,J0.morphTargets=p.morphTargets,J0.morphNormals=p.morphNormals,J0.morphColors=p.morphColors,J0.morphTargetsCount=p.morphTargetsCount,J0.numClippingPlanes=p.numClippingPlanes,J0.numIntersection=p.numClipIntersection,J0.vertexAlphas=p.vertexAlphas,J0.vertexTangents=p.vertexTangents,J0.toneMapping=p.toneMapping}function i5(P,p){if(P.length===0)return null;if(P.length===1)return P[0].texture!==null?P[0]:null;L.setFromMatrixPosition(p.matrixWorld);for(let J0=0,i=P.length;J0<i;J0++){let o=P[J0];if(o.texture!==null&&o.boundingBox.containsPoint(L))return o}return null}function o5(P,p,J0,i,o){if(p.isScene!==!0)p=t0;e.resetTextureUnits();let x0=p.fog,d0=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?p.environment:null,b0=s===null?I.outputColorSpace:s.isXRRenderTarget===!0?s.texture.colorSpace:_9.workingColorSpace,c0=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,s0=R0.get(i.envMap||d0,c0),R9=i.vertexColors===!0&&!!J0.attributes.color&&J0.attributes.color.itemSize===4,A9=!!J0.attributes.tangent&&(!!i.normalMap||i.anisotropy>0),n0=!!J0.morphAttributes.position,u9=!!J0.morphAttributes.normal,q7=!!J0.morphAttributes.color,$7=X8;if(i.toneMapped){if(s===null||s.isXRRenderTarget===!0)$7=I.toneMapping}let a9=J0.morphAttributes.position||J0.morphAttributes.normal||J0.morphAttributes.color,w7=a9!==void 0?a9.length:0,m0=g.get(i),j7=_.state.lights;if(D0===!0){if(V0===!0||P!==u){let t9=P===u&&i.id===a;C0.setState(i,P,t9)}}let k9=!1;if(i.version===m0.__version){if(m0.needsLights&&m0.lightsStateVersion!==j7.state.version)k9=!0;else if(m0.outputColorSpace!==b0)k9=!0;else if(o.isBatchedMesh&&m0.batching===!1)k9=!0;else if(!o.isBatchedMesh&&m0.batching===!0)k9=!0;else if(o.isBatchedMesh&&m0.batchingColor===!0&&o._colorsTexture===null)k9=!0;else if(o.isBatchedMesh&&m0.batchingColor===!1&&o._colorsTexture!==null)k9=!0;else if(o.isInstancedMesh&&m0.instancing===!1)k9=!0;else if(!o.isInstancedMesh&&m0.instancing===!0)k9=!0;else if(o.isSkinnedMesh&&m0.skinning===!1)k9=!0;else if(!o.isSkinnedMesh&&m0.skinning===!0)k9=!0;else if(o.isInstancedMesh&&m0.instancingColor===!0&&o.instanceColor===null)k9=!0;else if(o.isInstancedMesh&&m0.instancingColor===!1&&o.instanceColor!==null)k9=!0;else if(o.isInstancedMesh&&m0.instancingMorph===!0&&o.morphTexture===null)k9=!0;else if(o.isInstancedMesh&&m0.instancingMorph===!1&&o.morphTexture!==null)k9=!0;else if(m0.envMap!==s0)k9=!0;else if(i.fog===!0&&m0.fog!==x0)k9=!0;else if(m0.numClippingPlanes!==void 0&&(m0.numClippingPlanes!==C0.numPlanes||m0.numIntersection!==C0.numIntersection))k9=!0;else if(m0.vertexAlphas!==R9)k9=!0;else if(m0.vertexTangents!==A9)k9=!0;else if(m0.morphTargets!==n0)k9=!0;else if(m0.morphNormals!==u9)k9=!0;else if(m0.morphColors!==q7)k9=!0;else if(m0.toneMapping!==$7)k9=!0;else if(m0.morphTargetsCount!==w7)k9=!0;else if(!!m0.lightProbeGrid!==_.state.lightProbeGridArray.length>0)k9=!0}else k9=!0,m0.__version=i.version;let e7=m0.currentProgram;if(k9===!0){if(e7=HQ(i,p,o),S&&i.isNodeMaterial)S.onUpdateProgram(i,e7,m0)}let z8=!1,qJ=!1,K6=!1,s9=e7.getUniforms(),Y7=m0.uniforms;if(T.useProgram(e7.program))z8=!0,qJ=!0,K6=!0;if(i.id!==a)a=i.id,qJ=!0;if(m0.needsLights){let t9=i5(_.state.lightProbeGridArray,o);if(m0.lightProbeGrid!==t9)m0.lightProbeGrid=t9,qJ=!0}if(z8||u!==P){if(T.buffers.depth.getReversed()&&P.reversedDepth!==!0)P._reversedDepth=!0,P.updateProjectionMatrix();s9.setValue(b,"projectionMatrix",P.projectionMatrix),s9.setValue(b,"viewMatrix",P.matrixWorldInverse);let DJ=s9.map.cameraPosition;if(DJ!==void 0)DJ.setValue(b,P0.setFromMatrixPosition(P.matrixWorld));if(C9.logarithmicDepthBuffer)s9.setValue(b,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2));if(i.isMeshPhongMaterial||i.isMeshToonMaterial||i.isMeshLambertMaterial||i.isMeshBasicMaterial||i.isMeshStandardMaterial||i.isShaderMaterial)s9.setValue(b,"isOrthographic",P.isOrthographicCamera===!0);if(u!==P)u=P,qJ=!0,K6=!0}if(m0.needsLights){if(j7.state.sunShadowMap.length>0)s9.setValue(b,"sunShadowMap",j7.state.sunShadowMap,e);if(j7.state.directionalShadowMap.length>0)s9.setValue(b,"directionalShadowMap",j7.state.directionalShadowMap,e);if(j7.state.spotShadowMap.length>0)s9.setValue(b,"spotShadowMap",j7.state.spotShadowMap,e);if(j7.state.pointShadowMap.length>0)s9.setValue(b,"pointShadowMap",j7.state.pointShadowMap,e)}if(o.isSkinnedMesh){s9.setOptional(b,o,"bindMatrix"),s9.setOptional(b,o,"bindMatrixInverse");let t9=o.skeleton;if(t9){if(t9.boneTexture===null)t9.computeBoneTexture();s9.setValue(b,"boneTexture",t9.boneTexture,e)}}if(o.isBatchedMesh){if(s9.setOptional(b,o,"batchingTexture"),s9.setValue(b,"batchingTexture",o._matricesTexture,e),s9.setOptional(b,o,"batchingIdTexture"),s9.setValue(b,"batchingIdTexture",o._indirectTexture,e),s9.setOptional(b,o,"batchingColorTexture"),o._colorsTexture!==null)s9.setValue(b,"batchingColorTexture",o._colorsTexture,e)}let FJ=J0.morphAttributes;if(FJ.position!==void 0||FJ.normal!==void 0||FJ.color!==void 0)f9.update(o,J0,e7);if(qJ||m0.receiveShadow!==o.receiveShadow)m0.receiveShadow=o.receiveShadow,s9.setValue(b,"receiveShadow",o.receiveShadow);if((i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial)&&i.envMap===null&&p.environment!==null)Y7.envMapIntensity.value=p.environmentIntensity;if(Y7.dfgLUT!==void 0)Y7.dfgLUT.value=rF();if(qJ){if(s9.setValue(b,"toneMappingExposure",I.toneMappingExposure),m0.needsLights)a5(Y7,K6);if(x0&&i.fog===!0)h0.refreshFogUniforms(Y7,x0);if(h0.refreshMaterialUniforms(Y7,i,Y0,n,_.state.transmissionRenderTarget[P.id]),m0.needsLights&&m0.lightProbeGrid){let t9=m0.lightProbeGrid;Y7.probesSH.value=t9.texture,Y7.probesMin.value.copy(t9.boundingBox.min),Y7.probesMax.value.copy(t9.boundingBox.max),Y7.probesResolution.value.copy(t9.resolution)}m$.upload(b,BH(m0),Y7,e)}if(i.isShaderMaterial&&i.uniformsNeedUpdate===!0)m$.upload(b,BH(m0),Y7,e),i.uniformsNeedUpdate=!1;if(i.isSpriteMaterial)s9.setValue(b,"center",o.center);if(s9.setValue(b,"modelViewMatrix",o.modelViewMatrix),s9.setValue(b,"normalMatrix",o.normalMatrix),s9.setValue(b,"modelMatrix",o.matrixWorld),i.uniformsGroups!==void 0){let t9=i.uniformsGroups;for(let DJ=0,U6=t9.length;DJ<U6;DJ++){let AH=t9[DJ];u0.update(AH,e7),u0.bind(AH,e7)}}return e7}function a5(P,p){P.ambientLightColor.needsUpdate=p,P.lightProbe.needsUpdate=p,P.sunLights.needsUpdate=p,P.sunLightShadows.needsUpdate=p,P.directionalLights.needsUpdate=p,P.directionalLightShadows.needsUpdate=p,P.pointLights.needsUpdate=p,P.pointLightShadows.needsUpdate=p,P.spotLights.needsUpdate=p,P.spotLightShadows.needsUpdate=p,P.rectAreaLights.needsUpdate=p,P.hemisphereLights.needsUpdate=p}function r5(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return l},this.getActiveMipmapLevel=function(){return Q0},this.getRenderTarget=function(){return s},this.setRenderTargetTextures=function(P,p,J0){let i=g.get(P);if(i.__autoAllocateDepthBuffer=P.resolveDepthBuffer===!1,i.__autoAllocateDepthBuffer===!1)i.__useRenderToTexture=!1;g.get(P.texture).__webglTexture=p,g.get(P.depthTexture).__webglTexture=i.__autoAllocateDepthBuffer?void 0:J0,i.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(P,p){let J0=g.get(P);J0.__webglFramebuffer=p,J0.__useDefaultFramebuffer=p===void 0},this.setRenderTarget=function(P,p=0,J0=0){s=P,l=p,Q0=J0;let i=null,o=!1,x0=!1;if(P){let b0=g.get(P);if(b0.__useDefaultFramebuffer!==void 0){T.bindFramebuffer(b.FRAMEBUFFER,b0.__webglFramebuffer),x.copy(P.viewport),Z0.copy(P.scissor),O0=P.scissorTest,T.viewport(x),T.scissor(Z0),T.setScissorTest(O0),a=-1;return}else if(b0.__webglFramebuffer===void 0)e.setupRenderTarget(P);else if(b0.__hasExternalTextures)e.rebindTextures(P,g.get(P.texture).__webglTexture,g.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){let R9=P.depthTexture;if(b0.__boundDepthTexture!==R9){if(R9!==null&&g.has(R9)&&(P.width!==R9.image.width||P.height!==R9.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");e.setupDepthRenderbuffer(P)}}let c0=P.texture;if(c0.isData3DTexture||c0.isDataArrayTexture||c0.isCompressedArrayTexture)x0=!0;let s0=g.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget){if(Array.isArray(s0[p]))i=s0[p][J0];else i=s0[p];o=!0}else if(P.samples>0&&e.useMultisampledRTT(P)===!1)i=g.get(P).__webglMultisampledFramebuffer;else if(Array.isArray(s0))i=s0[J0];else i=s0;x.copy(P.viewport),Z0.copy(P.scissor),O0=P.scissorTest}else x.copy(A0).multiplyScalar(Y0).floor(),Z0.copy(r).multiplyScalar(Y0).floor(),O0=p0;if(J0!==0)i=f;if(T.bindFramebuffer(b.FRAMEBUFFER,i))T.drawBuffers(P,i);if(T.viewport(x),T.scissor(Z0),T.setScissorTest(O0),o){let b0=g.get(P.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+p,b0.__webglTexture,J0)}else if(x0){let b0=p;for(let c0=0;c0<P.textures.length;c0++){let s0=g.get(P.textures[c0]);b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0+c0,s0.__webglTexture,J0,b0)}}else if(P!==null&&J0!==0){let b0=g.get(P.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,b0.__webglTexture,J0)}a=-1};function CH(P){let p=g.get(P);if(p.__readFormat!==P.format||p.__readType!==P.type)p.__readFormat=P.format,p.__readType=P.type,p.__formatReadable=C9.textureFormatReadable(P.format),p.__typeReadable=C9.textureTypeReadable(P.type);return p}if(this.readRenderTargetPixels=function(P,p,J0,i,o,x0,d0,b0=0){if(!(P&&P.isWebGLRenderTarget)){U9("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let c0=g.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&d0!==void 0)c0=c0[d0];if(c0){T.bindFramebuffer(b.FRAMEBUFFER,c0);try{let s0=P.textures[b0],R9=s0.format,A9=s0.type;if(P.textures.length>1)b.readBuffer(b.COLOR_ATTACHMENT0+b0);let n0=CH(s0);if(n0.__formatReadable===!1){U9("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(n0.__typeReadable===!1){U9("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(p>=0&&p<=P.width-i&&(J0>=0&&J0<=P.height-o))b.readPixels(p,J0,i,o,N0.convert(R9),N0.convert(A9),x0)}finally{let s0=s!==null?g.get(s).__webglFramebuffer:null;T.bindFramebuffer(b.FRAMEBUFFER,s0)}}},this.readRenderTargetPixelsAsync=async function(P,p,J0,i,o,x0,d0,b0=0){if(!(P&&P.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let c0=g.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&d0!==void 0)c0=c0[d0];if(c0)if(p>=0&&p<=P.width-i&&(J0>=0&&J0<=P.height-o)){T.bindFramebuffer(b.FRAMEBUFFER,c0);let s0=P.textures[b0],R9=s0.format,A9=s0.type;if(P.textures.length>1)b.readBuffer(b.COLOR_ATTACHMENT0+b0);let n0=CH(s0);if(n0.__formatReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(n0.__typeReadable===!1)throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let u9=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,u9),b.bufferData(b.PIXEL_PACK_BUFFER,x0.byteLength,b.STREAM_READ),b.readPixels(p,J0,i,o,N0.convert(R9),N0.convert(A9),0),b.bindBuffer(b.PIXEL_PACK_BUFFER,null);let q7=s!==null?g.get(s).__webglFramebuffer:null;T.bindFramebuffer(b.FRAMEBUFFER,q7);let $7=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await XY(b,$7,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,u9),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,x0),b.bindBuffer(b.PIXEL_PACK_BUFFER,null),b.deleteBuffer(u9),b.deleteSync($7),x0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(P,p=null,J0=0){let i=Math.pow(2,-J0),o=Math.floor(P.image.width*i),x0=Math.floor(P.image.height*i),d0=p!==null?p.x:0,b0=p!==null?p.y:0;e.setTexture2D(P,0),b.copyTexSubImage2D(b.TEXTURE_2D,J0,0,0,d0,b0,o,x0),T.unbindTexture()},this.copyTextureToTexture=function(P,p,J0=null,i=null,o=0,x0=0){let d0,b0,c0,s0,R9,A9,n0,u9,q7,$7=P.isCompressedTexture?P.mipmaps[x0]:P.image;if(J0!==null)d0=J0.max.x-J0.min.x,b0=J0.max.y-J0.min.y,c0=J0.isBox3?J0.max.z-J0.min.z:1,s0=J0.min.x,R9=J0.min.y,A9=J0.isBox3?J0.min.z:0;else{let Y7=Math.pow(2,-o);if(d0=Math.floor($7.width*Y7),b0=Math.floor($7.height*Y7),P.isDataArrayTexture)c0=$7.depth;else if(P.isData3DTexture)c0=Math.floor($7.depth*Y7);else c0=1;s0=0,R9=0,A9=0}if(i!==null)n0=i.x,u9=i.y,q7=i.z;else n0=0,u9=0,q7=0;let a9=N0.convert(p.format),w7=N0.convert(p.type),m0;if(p.isData3DTexture)e.setTexture3D(p,0),m0=b.TEXTURE_3D;else if(p.isDataArrayTexture||p.isCompressedArrayTexture)e.setTexture2DArray(p,0),m0=b.TEXTURE_2D_ARRAY;else e.setTexture2D(p,0),m0=b.TEXTURE_2D;T.activeTexture(b.TEXTURE0),T.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,p.flipY),T.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),T.pixelStorei(b.UNPACK_ALIGNMENT,p.unpackAlignment);let j7=T.getParameter(b.UNPACK_ROW_LENGTH),k9=T.getParameter(b.UNPACK_IMAGE_HEIGHT),e7=T.getParameter(b.UNPACK_SKIP_PIXELS),z8=T.getParameter(b.UNPACK_SKIP_ROWS),qJ=T.getParameter(b.UNPACK_SKIP_IMAGES);T.pixelStorei(b.UNPACK_ROW_LENGTH,$7.width),T.pixelStorei(b.UNPACK_IMAGE_HEIGHT,$7.height),T.pixelStorei(b.UNPACK_SKIP_PIXELS,s0),T.pixelStorei(b.UNPACK_SKIP_ROWS,R9),T.pixelStorei(b.UNPACK_SKIP_IMAGES,A9);let K6=P.isDataArrayTexture||P.isData3DTexture,s9=p.isDataArrayTexture||p.isData3DTexture;if(P.isDepthTexture){let Y7=g.get(P),FJ=g.get(p),t9=g.get(Y7.__renderTarget),DJ=g.get(FJ.__renderTarget);T.bindFramebuffer(b.READ_FRAMEBUFFER,t9.__webglFramebuffer),T.bindFramebuffer(b.DRAW_FRAMEBUFFER,DJ.__webglFramebuffer);for(let U6=0;U6<c0;U6++){if(K6)b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,g.get(P).__webglTexture,o,A9+U6),b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,g.get(p).__webglTexture,x0,q7+U6);b.blitFramebuffer(s0,R9,d0,b0,n0,u9,d0,b0,b.DEPTH_BUFFER_BIT,b.NEAREST)}T.bindFramebuffer(b.READ_FRAMEBUFFER,null),T.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(o!==0||P.isRenderTargetTexture||g.has(P)){let Y7=g.get(P),FJ=g.get(p);T.bindFramebuffer(b.READ_FRAMEBUFFER,t),T.bindFramebuffer(b.DRAW_FRAMEBUFFER,v);for(let t9=0;t9<c0;t9++){if(K6)b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,Y7.__webglTexture,o,A9+t9);else b.framebufferTexture2D(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,Y7.__webglTexture,o);if(s9)b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,FJ.__webglTexture,x0,q7+t9);else b.framebufferTexture2D(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,FJ.__webglTexture,x0);if(o!==0)b.blitFramebuffer(s0,R9,d0,b0,n0,u9,d0,b0,b.COLOR_BUFFER_BIT,b.NEAREST);else if(s9)b.copyTexSubImage3D(m0,x0,n0,u9,q7+t9,s0,R9,d0,b0);else b.copyTexSubImage2D(m0,x0,n0,u9,s0,R9,d0,b0)}T.bindFramebuffer(b.READ_FRAMEBUFFER,null),T.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(s9)if(P.isDataTexture||P.isData3DTexture)b.texSubImage3D(m0,x0,n0,u9,q7,d0,b0,c0,a9,w7,$7.data);else if(p.isCompressedArrayTexture)b.compressedTexSubImage3D(m0,x0,n0,u9,q7,d0,b0,c0,a9,$7.data);else b.texSubImage3D(m0,x0,n0,u9,q7,d0,b0,c0,a9,w7,$7);else if(P.isDataTexture)b.texSubImage2D(b.TEXTURE_2D,x0,n0,u9,d0,b0,a9,w7,$7.data);else if(P.isCompressedTexture)b.compressedTexSubImage2D(b.TEXTURE_2D,x0,n0,u9,$7.width,$7.height,a9,$7.data);else b.texSubImage2D(b.TEXTURE_2D,x0,n0,u9,d0,b0,a9,w7,$7);if(T.pixelStorei(b.UNPACK_ROW_LENGTH,j7),T.pixelStorei(b.UNPACK_IMAGE_HEIGHT,k9),T.pixelStorei(b.UNPACK_SKIP_PIXELS,e7),T.pixelStorei(b.UNPACK_SKIP_ROWS,z8),T.pixelStorei(b.UNPACK_SKIP_IMAGES,qJ),x0===0&&p.generateMipmaps)b.generateMipmap(m0);T.unbindTexture()},this.initRenderTarget=function(P){if(g.get(P).__webglFramebuffer===void 0)e.setupRenderTarget(P)},this.initTexture=function(P){if(P.isCubeTexture)e.setTextureCube(P,0);else if(P.isData3DTexture)e.setTexture3D(P,0);else if(P.isDataArrayTexture||P.isCompressedArrayTexture)e.setTexture2DArray(P,0);else e.setTexture2D(P,0);T.unbindTexture()},this.resetState=function(){l=0,Q0=0,s=null,T.reset(),S0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return HU}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let $=this.getContext();$.drawingBufferColorSpace=_9._getDrawingBufferColorSpace(J),$.unpackColorSpace=_9._getUnpackColorSpace()}}var tF="varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";class d${mesh;stars;sunDir=new k(0,-0.2,-1).normalize();constructor(J=400){this.mesh=new h(new l0(J,48,24),new h9({side:E7,depthWrite:!1,uniforms:{day:{value:0},sun:{value:this.sunDir}},vertexShader:tF,fragmentShader:`
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
        }`}));let $=1400,Q=new Float32Array($*3);for(let K=0;K<$;K++){let U=y0(K),H=y0(K+9999),W=U*Math.PI*2,Y=Math.acos(1-H*0.95);Q.set([Math.sin(Y)*Math.cos(W)*J*0.95,Math.cos(Y)*J*0.95,Math.sin(Y)*Math.sin(W)*J*0.95],K*3)}let Z=new O9;Z.setAttribute("position",new e9(Q,3)),this.stars=new g7(Z,new y7({color:16777215,size:1.4,sizeAttenuation:!1,transparent:!0,depthWrite:!1}))}set(J,$=0){this.mesh.material.uniforms.day.value=J;let Q=(J-0.5)*0.9;return this.sunDir.set(Math.cos(Q)*Math.sin($),Math.sin(Q),-Math.cos(Q)*Math.cos($)).normalize(),this.stars.material.opacity=Math.max(0,1-J*2.2),this.sunDir}}class cU{box;points;base;constructor(J,$=600,Q=16773590){this.box=J;this.base=new Float32Array($*3);let Z=J.getSize(new k);for(let U=0;U<$;U++)this.base.set([J.min.x+y0(U)*Z.x,J.min.y+y0(U+3000)*Z.y,J.min.z+y0(U+6000)*Z.z],U*3);let K=new O9;K.setAttribute("position",new e9(this.base.slice(),3)),this.points=new g7(K,new y7({color:Q,size:0.025,transparent:!0,opacity:0.7,blending:W7,depthWrite:!1}))}update(J){let $=this.points.geometry.attributes.position,Q=this.box.getSize(new k);for(let Z=0;Z<$.count;Z++){let K=this.base[Z*3],U=this.base[Z*3+1],H=this.base[Z*3+2],W=this.box.min.y+((U-this.box.min.y+J*0.05*(0.5+y0(Z)))%Q.y+Q.y)%Q.y;$.setXYZ(Z,K+Math.sin(J*0.4+Z)*0.08,W,H+Math.cos(J*0.3+Z*1.7)*0.08)}$.needsUpdate=!0}}function H5(J,$,Q,Z){let K=new j0($,Q,Z,32,1,!0).translate(0,-Z/2,0),U=new h9({transparent:!0,depthWrite:!1,blending:W7,side:m9,uniforms:{color:{value:new F0(J)},strength:{value:0.25},time:{value:0}},vertexShader:"varying vec2 vUv; varying vec3 vN; varying vec3 vV; void main() { vUv = uv; vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",fragmentShader:`uniform vec3 color; uniform float strength, time; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
      void main() {
        float edge = pow(abs(dot(vN, vV)), 1.6);
        float along = smoothstep(0.0, 0.25, vUv.y) * smoothstep(0.0, 0.6, 1.0 - vUv.y) + 0.15;
        float n = 0.85 + 0.15 * sin(vUv.x * 40.0 + time * 0.6) * sin(vUv.y * 9.0 - time * 0.4);
        gl_FragColor = vec4(color * edge * along * n * strength, 1.0);
      }`});return new h(K,U)}function y0(J){let $=Math.sin(J*127.1+311.7)*43758.5453;return $-Math.floor($)}class u7{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}var eF=new sJ(-1,1,1,-1,0,1);class W5 extends O9{constructor(){super();this.setAttribute("position",new Q9([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Q9([0,2,0,0,2,0],2))}}var JD=new W5;class JJ{constructor(J){this._mesh=new h(JD,J)}dispose(){this._mesh.geometry.dispose()}render(J){J.render(this._mesh,eF)}get material(){return this._mesh.material}set material(J){this._mesh.material=J}}var l$={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:0.025},maxblur:{value:0.01},nearClip:{value:1},farClip:{value:1000}},vertexShader:`

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

		}`};class nU extends u7{constructor(J,$,Q){super();this.scene=J,this.camera=$;let Z=Q.focus!==void 0?Q.focus:1,K=Q.aperture!==void 0?Q.aperture:0.025,U=Q.maxblur!==void 0?Q.maxblur:1;this._renderTargetDepth=new X7(1,1,{minFilter:a7,magFilter:a7,type:I7}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new x$,this._materialDepth.depthPacking=$U,this._materialDepth.blending=x7;let H=M8.clone(l$.uniforms);H.tDepth.value=this._renderTargetDepth.texture,H.focus.value=Z,H.aspect.value=$.aspect,H.aperture.value=K,H.maxblur.value=U,H.nearClip.value=$.near,H.farClip.value=$.far,this.materialBokeh=new h9({defines:Object.assign({},l$.defines),uniforms:H,vertexShader:l$.vertexShader,fragmentShader:l$.fragmentShader}),this.uniforms=H,this._fsQuad=new JJ(this.materialBokeh),this._oldClearColor=new F0}render(J,$,Q){this.scene.overrideMaterial=this._materialDepth,J.getClearColor(this._oldClearColor);let Z=J.getClearAlpha(),K=J.autoClear;if(J.autoClear=!1,J.setClearColor(16777215),J.setClearAlpha(1),J.setRenderTarget(this._renderTargetDepth),J.clear(),J.render(this.scene,this.camera),this.uniforms.tColor.value=Q.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget($),J.clear(),this._fsQuad.render(J);this.scene.overrideMaterial=null,J.setClearColor(this._oldClearColor),J.setClearAlpha(Z),J.autoClear=K}setSize(J,$){this.materialBokeh.uniforms.aspect.value=J/$,this._renderTargetDepth.setSize(J,$)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}}var d6={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class oJ extends u7{constructor(J,$="tDiffuse"){super();if(this.textureID=$,this.uniforms=null,this.material=null,J instanceof h9)this.uniforms=J.uniforms,this.material=J;else if(J)this.uniforms=M8.clone(J.uniforms),this.material=new h9({name:J.name!==void 0?J.name:"unspecified",defines:Object.assign({},J.defines),uniforms:this.uniforms,vertexShader:J.vertexShader,fragmentShader:J.fragmentShader});this._fsQuad=new JJ(this.material)}render(J,$,Q){if(this.uniforms[this.textureID])this.uniforms[this.textureID].value=Q.texture;if(this._fsQuad.material=this.material,this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget($),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class CZ extends u7{constructor(J,$){super();this.scene=J,this.camera=$,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(J,$,Q){let Z=J.getContext(),K=J.state;K.buffers.color.setMask(!1),K.buffers.depth.setMask(!1),K.buffers.color.setLocked(!0),K.buffers.depth.setLocked(!0);let U,H;if(this.inverse)U=0,H=1;else U=1,H=0;if(K.buffers.stencil.setTest(!0),K.buffers.stencil.setOp(Z.REPLACE,Z.REPLACE,Z.REPLACE),K.buffers.stencil.setFunc(Z.ALWAYS,U,4294967295),K.buffers.stencil.setClear(H),K.buffers.stencil.setLocked(!0),J.setRenderTarget(Q),this.clear)J.clear();if(J.render(this.scene,this.camera),J.setRenderTarget($),this.clear)J.clear();J.render(this.scene,this.camera),K.buffers.color.setLocked(!1),K.buffers.depth.setLocked(!1),K.buffers.color.setMask(!0),K.buffers.depth.setMask(!0),K.buffers.stencil.setLocked(!1),K.buffers.stencil.setFunc(Z.EQUAL,1,4294967295),K.buffers.stencil.setOp(Z.KEEP,Z.KEEP,Z.KEEP),K.buffers.stencil.setLocked(!0)}}class sU extends u7{constructor(){super();this.needsSwap=!1}render(J){J.state.buffers.stencil.setLocked(!1),J.state.buffers.stencil.setTest(!1)}}class $J{constructor(J,$){if(this.renderer=J,this._pixelRatio=J.getPixelRatio(),$===void 0){let Q=J.getSize(new G0);this._width=Q.width,this._height=Q.height,$=new X7(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:I7}),$.texture.name="EffectComposer.rt1"}else this._width=$.width,this._height=$.height;this.renderTarget1=$,this.renderTarget2=$.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new oJ(d6),this.copyPass.material.blending=x7,this.timer=new MZ}swapBuffers(){let J=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=J}addPass(J){this.passes.push(J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(J,$){this.passes.splice($,0,J),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(J){let $=this.passes.indexOf(J);if($!==-1)this.passes.splice($,1)}isLastEnabledPass(J){for(let $=J+1;$<this.passes.length;$++)if(this.passes[$].enabled)return!1;return!0}render(J){if(this.timer.update(),J===void 0)J=this.timer.getDelta();let $=this.renderer.getRenderTarget(),Q=!1;for(let Z=0,K=this.passes.length;Z<K;Z++){let U=this.passes[Z];if(U.enabled===!1)continue;if(U.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(Z),U.render(this.renderer,this.writeBuffer,this.readBuffer,J,Q),U.needsSwap){if(Q){let H=this.renderer.getContext(),W=this.renderer.state.buffers.stencil;W.setFunc(H.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,J),W.setFunc(H.EQUAL,1,4294967295)}this.swapBuffers()}if(CZ!==void 0){if(U instanceof CZ)Q=!0;else if(U instanceof sU)Q=!1}}this.renderer.setRenderTarget($)}reset(J){if(J===void 0){let $=this.renderer.getSize(new G0);this._pixelRatio=this.renderer.getPixelRatio(),this._width=$.width,this._height=$.height,J=this.renderTarget1.clone(),J.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=J,this.renderTarget2=J.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(J,$){this._width=J,this._height=$;let Q=this._width*this._pixelRatio,Z=this._height*this._pixelRatio;this.renderTarget1.setSize(Q,Z),this.renderTarget2.setSize(Q,Z);for(let K=0;K<this.passes.length;K++)this.passes[K].setSize(Q,Z)}setPixelRatio(J){this._pixelRatio=J,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}var c$={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class QJ extends u7{constructor(){super();this.isOutputPass=!0,this.uniforms=M8.clone(c$.uniforms),this.material=new b$({name:c$.name,uniforms:this.uniforms,vertexShader:c$.vertexShader,fragmentShader:c$.fragmentShader}),this._fsQuad=new JJ(this.material),this._outputColorSpace=null,this._toneMapping=null}render(J,$,Q){if(this.uniforms.tDiffuse.value=Q.texture,this.uniforms.toneMappingExposure.value=J.toneMappingExposure,this._outputColorSpace!==J.outputColorSpace||this._toneMapping!==J.toneMapping){if(this._outputColorSpace=J.outputColorSpace,this._toneMapping=J.toneMapping,this.material.defines={},_9.getTransfer(this._outputColorSpace)===c9)this.material.defines.SRGB_TRANSFER="";if(this._toneMapping===M$)this.material.defines.LINEAR_TONE_MAPPING="";else if(this._toneMapping===V$)this.material.defines.REINHARD_TONE_MAPPING="";else if(this._toneMapping===_$)this.material.defines.CINEON_TONE_MAPPING="";else if(this._toneMapping===G8)this.material.defines.ACES_FILMIC_TONE_MAPPING="";else if(this._toneMapping===I$)this.material.defines.AGX_TONE_MAPPING="";else if(this._toneMapping===C$)this.material.defines.NEUTRAL_TONE_MAPPING="";else if(this._toneMapping===B$)this.material.defines.CUSTOM_TONE_MAPPING="";this.material.needsUpdate=!0}if(this.renderToScreen===!0)J.setRenderTarget(null),this._fsQuad.render(J);else{if(J.setRenderTarget($),this.clear)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);this._fsQuad.render(J)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ZJ extends u7{constructor(J,$,Q=null,Z=null,K=null){super();this.scene=J,this.camera=$,this.overrideMaterial=Q,this.clearColor=Z,this.clearAlpha=K,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new F0}render(J,$,Q){let Z=J.autoClear;J.autoClear=!1;let K,U;if(this.overrideMaterial!==null)U=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial;if(this.clearColor!==null)J.getClearColor(this._oldClearColor),J.setClearColor(this.clearColor,J.getClearAlpha());if(this.clearAlpha!==null)K=J.getClearAlpha(),J.setClearAlpha(this.clearAlpha);if(this.clearDepth==!0)J.clearDepth();if(J.setRenderTarget(this.renderToScreen?null:Q),this.clear===!0)J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil);if(J.render(this.scene,this.camera),this.clearColor!==null)J.setClearColor(this._oldClearColor);if(this.clearAlpha!==null)J.setClearAlpha(K);if(this.overrideMaterial!==null)this.scene.overrideMaterial=U;J.autoClear=Z}}var Y5={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new F0(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class B8 extends u7{constructor(J,$=1,Q,Z){super();this.strength=$,this.radius=Q,this.threshold=Z,this.resolution=J!==void 0?new G0(J.x,J.y):new G0(256,256),this.clearColor=new F0(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);this.renderTargetBright=new X7(K,U,{type:I7,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let N=0;N<this.nMips;N++){let X=new X7(K,U,{type:I7,depthBuffer:!1});X.texture.name="UnrealBloomPass.h"+N,X.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(X);let q=new X7(K,U,{type:I7,depthBuffer:!1});q.texture.name="UnrealBloomPass.v"+N,q.texture.generateMipmaps=!1,this.renderTargetsVertical.push(q),K=Math.round(K/2),U=Math.round(U/2)}let H=Y5;this.highPassUniforms=M8.clone(H.uniforms),this.highPassUniforms.luminosityThreshold.value=Z,this.highPassUniforms.smoothWidth.value=0.01,this.materialHighPassFilter=new h9({uniforms:this.highPassUniforms,vertexShader:H.vertexShader,fragmentShader:H.fragmentShader}),this.separableBlurMaterials=[];let W=[6,10,14,18,22];K=Math.round(this.resolution.x/2),U=Math.round(this.resolution.y/2);for(let N=0;N<this.nMips;N++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(W[N])),this.separableBlurMaterials[N].uniforms.invSize.value=new G0(1/K,1/U),K=Math.round(K/2),U=Math.round(U/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=$,this.compositeMaterial.uniforms.bloomRadius.value=0.1;let Y=[1,0.8,0.6,0.4,0.2];this.compositeMaterial.uniforms.bloomFactors.value=Y,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=M8.clone(d6.uniforms),this.blendMaterial=new h9({uniforms:this.copyUniforms,vertexShader:d6.vertexShader,fragmentShader:d6.fragmentShader,premultipliedAlpha:!0,blending:W7,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new F0,this._oldClearAlpha=1,this._basic=new g0,this._fsQuad=new JJ(null)}dispose(){for(let J=0;J<this.renderTargetsHorizontal.length;J++)this.renderTargetsHorizontal[J].dispose();for(let J=0;J<this.renderTargetsVertical.length;J++)this.renderTargetsVertical[J].dispose();this.renderTargetBright.dispose();for(let J=0;J<this.separableBlurMaterials.length;J++)this.separableBlurMaterials[J].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(J,$){let Q=Math.round(J/2),Z=Math.round($/2);this.renderTargetBright.setSize(Q,Z);for(let K=0;K<this.nMips;K++)this.renderTargetsHorizontal[K].setSize(Q,Z),this.renderTargetsVertical[K].setSize(Q,Z),this.separableBlurMaterials[K].uniforms.invSize.value=new G0(1/Q,1/Z),Q=Math.round(Q/2),Z=Math.round(Z/2)}render(J,$,Q,Z,K){J.getClearColor(this._oldClearColor),this._oldClearAlpha=J.getClearAlpha();let U=J.autoClear;if(J.autoClear=!1,J.setClearColor(this.clearColor,0),K)J.state.buffers.stencil.setTest(!1);if(this.renderToScreen)this._fsQuad.material=this._basic,this._basic.map=Q.texture,J.setRenderTarget(null),J.clear(),this._fsQuad.render(J);this.highPassUniforms.tDiffuse.value=Q.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,J.setRenderTarget(this.renderTargetBright),J.clear(),this._fsQuad.render(J);let H=this.renderTargetBright;for(let W=0;W<this.nMips;W++)this._fsQuad.material=this.separableBlurMaterials[W],this.separableBlurMaterials[W].uniforms.colorTexture.value=H.texture,this.separableBlurMaterials[W].uniforms.direction.value=B8.BlurDirectionX,J.setRenderTarget(this.renderTargetsHorizontal[W]),J.clear(),this._fsQuad.render(J),this.separableBlurMaterials[W].uniforms.colorTexture.value=this.renderTargetsHorizontal[W].texture,this.separableBlurMaterials[W].uniforms.direction.value=B8.BlurDirectionY,J.setRenderTarget(this.renderTargetsVertical[W]),J.clear(),this._fsQuad.render(J),H=this.renderTargetsVertical[W];if(this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,J.setRenderTarget(this.renderTargetsHorizontal[0]),J.clear(),this._fsQuad.render(J),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,K)J.state.buffers.stencil.setTest(!0);if(this.renderToScreen)J.setRenderTarget(null),this._fsQuad.render(J);else J.setRenderTarget(Q),this._fsQuad.render(J);J.setClearColor(this._oldClearColor,this._oldClearAlpha),J.autoClear=U}_getSeparableBlurMaterial(J){let $=[],Q=J/3;for(let U=0;U<J;U++)$.push(0.39894*Math.exp(-0.5*U*U/(Q*Q))/Q);let Z=[],K=[];for(let U=1;U<J;U+=2){let H=$[U],W=U+1<J?$[U+1]:0,Y=H+W;Z.push((U*H+(U+1)*W)/Y),K.push(Y)}return new h9({defines:{KERNEL_PAIRS:Z.length},uniforms:{colorTexture:{value:null},invSize:{value:new G0(0.5,0.5)},direction:{value:new G0(0.5,0.5)},centerWeight:{value:$[0]},gaussianOffsets:{value:Z},gaussianWeights:{value:K}},vertexShader:`

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

				}`})}_getCompositeMaterial(J){return new h9({defines:{NUM_MIPS:J},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}B8.BlurDirectionX=new G0(1,0);B8.BlurDirectionY=new G0(0,1);var $D="varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",QD=`
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
}`;class n${composer;look={focus:0,aperture:0.0025,bloom:0.35,exposure:1,warmth:0,saturation:1,contrast:1,shadows:new F0(0.5,0.5,0.5),highlights:new F0(0.5,0.5,0.5),vignette:0.45,grain:0.06,aberration:0.4,halation:0.4,letterbox:1,fade:0,leak:0};bokeh;bloomPass;grade;constructor(J,$,Q,Z=new G0(1920,1080)){this.composer=new $J(J),this.composer.addPass(new ZJ($,Q)),this.bokeh=new nU($,Q,{focus:10,aperture:this.look.aperture,maxblur:0.008}),this.composer.addPass(this.bokeh),this.bloomPass=new B8(Z,this.look.bloom,0.6,0.78),this.composer.addPass(this.bloomPass),this.composer.addPass(new QJ),this.grade=new oJ({uniforms:{tDiffuse:{value:null},time:{value:0},aspect:{value:Z.x/Z.y},exposure:{value:1},warmth:{value:0},saturation:{value:1},contrast:{value:1},shadows:{value:new F0},highlights:{value:new F0},vignette:{value:0},grain:{value:0},aberration:{value:0},halation:{value:0},letterbox:{value:0},fade:{value:0},leak:{value:0}},vertexShader:$D,fragmentShader:QD}),this.composer.addPass(this.grade)}render(J){let $=this.look,Q=this.grade.uniforms;this.bokeh.enabled=$.focus>0;let Z=this.bokeh.uniforms;Z.focus.value=$.focus,Z.aperture.value=$.aperture,this.bloomPass.strength=$.bloom,Q.time.value=J;for(let K of["exposure","warmth","saturation","contrast","vignette","grain","aberration","halation","letterbox","fade","leak"])Q[K].value=$[K];Q.shadows.value.copy($.shadows),Q.highlights.value.copy($.highlights),this.composer.render()}}class s${group=new E0;parts=[];width=0;constructor(J,$={}){let Q=$.height??1,Z=$.gap??0.05,K=$.font??'400 200px "Monoton", "Limelight", sans-serif',U=0;for(let H of J){let W=document.createElement("canvas").getContext("2d");W.font=K;let Y=Math.ceil(W.measureText(H).width+80),N=280,X=Object.assign(document.createElement("canvas"),{width:Y,height:N}),q=X.getContext("2d");q.font=K,q.textBaseline="middle",q.shadowColor=$.color??"#ff3b6b";for(let[V,D,E]of[[40,0.9,$.color??"#ff3b6b"],[14,1,$.color??"#ff3b6b"],[0,1,"#fff6f0"]])q.shadowBlur=V,q.globalAlpha=D,q.fillStyle=E,q.fillText(H,40,N/2);let G=new O7(X);G.colorSpace=R7;let F=Q*Y/N,O=new h(new G9(F,Q),new g0({map:G,transparent:!0,depthWrite:!1,toneMapped:!1,color:16777215}));O.position.x=U+F/2,this.group.add(O),this.parts.push({mesh:O,width:F}),U+=F+Z}this.width=U-Z;for(let H of this.parts)H.mesh.position.x-=this.width/2}set(J,$){let Q=this.parts[J]?.mesh;if(!Q)return;let Z=Math.max(0,$);Q.material.color.setScalar(0.1+Z*1.05),Q.material.opacity=0.35+Math.min(1,Z)*0.65}}function AZ(J,$=0,Q=0.5){return Math.sin(J*37+$*13.1)*Math.sin(J*13.7+$*3.3)*Math.sin(J*5.1+$)>1-Q*0.9?0.15:1}var ZD=(J)=>J*J*(3-2*J),N5=new k,X5=new k;function H9(J,$,Q,Z,K=!0){let U=K?ZD(Math.min(1,Math.max(0,Z))):Z;J.position.copy(N5.fromArray($.pos).lerp(X5.fromArray(Q.pos),U));let H=N5.fromArray($.look).lerp(X5.fromArray(Q.look),U);J.up.set(0,1,0),J.lookAt(H),J.rotateZ((($.roll??0)+((Q.roll??$.roll??0)-($.roll??0))*U)*Math.PI/180);let W=($.fov??40)+((Q.fov??$.fov??40)-($.fov??40))*U;if(J.fov!==W)J.fov=W,J.updateProjectionMatrix()}var i$=(J,$)=>Math.sin(J*0.73+$)*0.5+Math.sin(J*1.37+$*2.1)*0.3+Math.sin(J*2.9+$*3.7)*0.2;function zZ(J,$,Q=0.5){let Z=Q*0.004;J.rotateX(i$($,1)*Z),J.rotateY(i$($,5)*Z*1.3),J.rotateZ(i$($,9)*Z*0.6)}class iU{width;height;canvas;texture;key="";constructor(J=1280,$=800){this.width=J;this.height=$;this.canvas=Object.assign(document.createElement("canvas"),{width:J,height:$}),this.texture=new O7(this.canvas),this.texture.colorSpace=R7,this.texture.anisotropy=8}show(J,$={}){let Q=JSON.stringify([J,$]);if(Q===this.key)return;this.key=Q;let Z=this.canvas.getContext("2d"),K=this.width,U=this.height;Z.fillStyle=$.bg??"#0d1117",Z.fillRect(0,0,K,U),Z.fillStyle="#1b2230",Z.fillRect(0,0,K,54);for(let[W,Y]of["#ff5f57","#febc2e","#28c840"].entries())Z.fillStyle=Y,Z.beginPath(),Z.arc(30+W*30,27,9,0,Math.PI*2),Z.fill();Z.fillStyle="#8b96a8",Z.font='600 24px "JetBrains Mono", monospace',Z.textAlign="center",Z.fillText($.title??"terminal",K/2,35),Z.textAlign="left";let H=104;for(let W of J){let Y=typeof W==="string"?{text:W}:W,N=Y.size??34;Z.font=`${Y.bold?700:500} ${N}px ${$.font??'"JetBrains Mono", monospace'}`,Z.fillStyle=Y.color??$.fg??"#d6deeb",Z.fillText(Y.text,40,H),H+=N*1.45}if($.cursor)Z.fillStyle=$.fg??"#d6deeb",Z.fillRect(40,H-30,18,36);if($.banner)Z.fillStyle=$.banner.color,Z.fillRect(0,U/2-90,K,180),Z.fillStyle="#fff",Z.font='800 64px "Inter", sans-serif',Z.textAlign="center",Z.fillText($.banner.text,K/2,U/2+22),Z.textAlign="left";Z.fillStyle="rgba(0,0,0,.12)";for(let W=0;W<U;W+=4)Z.fillRect(0,W,K,1);this.texture.needsUpdate=!0}}var l6=(J,$)=>J.slice(0,Math.max(0,Math.floor(J.length*Math.min(1,$))));var g9=(J,$,Q,Z)=>({name:J,at:$,label:Q,section:Z});function wZ(){return[g9("title",0,"a cabin, a loop, a quota","intro"),g9("desk",w(0)-0.8,"go to bed, they said","intro"),g9("pillow",w(1)-0.6,"I nailed the first half","intro"),g9("loop",w(2)-0.4,"fed the loop a spec","verse 1"),g9("state",w(3)-0.3,"max iterations ten","verse 1"),g9("ralph",w(4)-0.3,"Ralph took the wheel","verse 1"),g9("dream",w(5)-0.4,"dreamed of green checkmarks","verse 1"),g9("dawn",w(6)-0.4,"woke at six","verse 1"),g9("tenof",w(7)-0.3,"ten of ten","verse 1"),g9("leave",w(8)-0.4,"she left before dawn","chorus"),g9("rename",w(9)-0.2,"renamed the state file","chorus"),g9("neon",w(10)-0.6,"ralph-loop.local.md-NEVER_AGAIN","chorus"),g9("baggage",w(12)-0.3,"last round's baggage","verse 2"),g9("reread",w(13)-0.1,"reread the whole thread","verse 2"),g9("context",w(14)-0.1,"context at forty percent","verse 2"),g9("approach",w(15)-0.1,"new approach, new approach","verse 2"),g9("summary",w(16)-0.1,"great progress! almost done!","verse 2"),g9("app",w(17)-0.1,"a button: coming soon","verse 2"),g9("commit",w(18)-0.1,"burned all my tokens","verse 2"),g9("leave2",w(20)-0.2,"she left before dawn","chorus"),g9("rename2",w(21)-0.2,"renamed the state file","chorus"),g9("neon2",w(22)-0.6,"dash NEVER, underscore, AGAIN","chorus"),g9("limit",w(24)-0.5,"usage limit reached","bridge"),g9("goodbye",w(25)-0.4,"no letter. a timestamp.","bridge"),g9("renews",w(26)-0.5,"she renews","bridge"),g9("return",w(28)-0.6,"back at nine A-M","last chorus"),g9("whiskey",w(29)-0.3,"poured a whiskey","last chorus"),g9("maybe",w(30)-0.6,"dash MAYBE, underscore, AGAIN","last chorus"),g9("twenty",w(32)-0.4,"max iterations... twenty","outro"),g9("helping",w(33)-1.4,"I'm helping!","outro"),g9("end",K9(33)+1.6,"the end","outro")]}var q5=null,PZ=(J)=>{let $=q5??=wZ(),Q=$[0];for(let Z of $)if(Z.at<=J)Q=Z;return Q},KD=(J)=>{let $=q5??=wZ();return $[$.indexOf(J)+1]?.at??F7()};function UD(J){if(J<w(6)-0.5)return 0.02;if(J<w(8)-0.5)return j(0.25,0.32,W0(J,w(6),w(8)));if(J<w(20))return j(0.36,0.46,W0(J,w(8),w(20)));if(J<w(24))return j(0.48,0.56,W0(J,w(20),w(24)));if(J<w(28))return j(0.6,0.82,W0(J,w(24),w(28)));return j(0.86,1,W0(J,w(28),F7()))}var F5=(J)=>{if(J<w(5))return 23+W0(J,0,w(5))*0.6;if(J<w(6))return j(23.6,29.9,W0(J,w(5),w(6)));if(J<w(26))return j(30,32.5,W0(J,w(6),w(26)));if(J<K0(27,/renews/i))return j(32.5,33,W0(J,w(26),K0(27,/renews/i)));return 33+W0(J,K0(27,/renews/i),F7())*0.3},D5=(J)=>{let $=F5(J),Q=Math.floor($)%24,Z=Math.floor($%1*60);return`${(Q+11)%12+1}:${String(Z).padStart(2,"0")} ${Q<12?"AM":"PM"}`},r0=(J,$=0.8,Q={})=>new W9({color:J,roughness:$,metalness:0,...Q});function KJ(J,$,Q,Z){let K=Object.assign(document.createElement("canvas"),{width:J,height:$});Q(K.getContext("2d"));let U=new O7(K);if(U.colorSpace=R7,U.anisotropy=8,Z)U.wrapS=U.wrapT=S8,U.repeat.set(...Z);return U}var LZ=(J,$)=>KJ(512,512,(Q)=>{for(let Z=0;Z<16;Z++){let K=y0(Z*3.1);Q.fillStyle=`rgb(${J.map((U)=>Math.round(U*(0.8+K*0.35))).join(",")})`,Q.fillRect(0,Z*32,512,31),Q.fillStyle="rgba(0,0,0,.45)",Q.fillRect(0,Z*32+31,512,1),Q.fillStyle="rgba(0,0,0,.12)";for(let U=0;U<14;U++)Q.fillRect(y0(Z*50+U)*512,Z*32+y0(U+Z)*30,30+y0(U*7+Z)*90,1);Q.fillStyle="rgba(0,0,0,.3)",Q.fillRect(y0(Z+99)*512,Z*32,2,31)}},$),G5=KJ(256,256,(J)=>{J.fillStyle="#8c1f1f",J.fillRect(0,0,256,256),J.fillStyle="rgba(20,10,10,.55)";for(let $=0;$<256;$+=64)J.fillRect($,0,22,256),J.fillRect(0,$,256,22);J.fillStyle="rgba(240,200,160,.25)";for(let $=30;$<256;$+=64)J.fillRect($,0,4,256),J.fillRect(0,$,256,4)},[2,2]),HD=KJ(512,512,(J)=>{J.fillStyle="#b98b5e",J.fillRect(0,0,512,512);for(let $=0;$<9000;$++)J.fillStyle=`rgba(${y0($)>0.5?"255,230,200":"60,35,20"},${0.05+y0($+5)*0.08})`,J.fillRect(y0($+1)*512,y0($+2)*512,2,2)},[80,80]),J7=(J=0,$=0,Q=0)=>new k(J,$,Q),WD=J7(0,1,0),YD=new j0(0.06,0.07,1,8).translate(0,0.5,0),ND={down:[[-0.3,0.92,0.08],[0.3,0.92,0.08]],type:[[-0.2,1.12,0.48],[0.2,1.12,0.48]],mug:[[-0.3,0.95,0.1],[0.14,1.42,0.3]],pour:[[-0.12,1.25,0.45],[0.18,1.3,0.45]],hips:[[-0.34,1.05,0],[0.34,1.05,0]],face:[[-0.1,1.55,0.2],[0.1,1.55,0.2]],up:[[-0.3,1.9,0.1],[0.3,1.9,0.1]],sleep:[[-0.25,1.2,0.18],[0.25,0.95,0.12]]};function XD(){let J=new E0,$=14264450,Q=new h(new j0(0.24,0.21,0.66,16),r0(16777215,0.9,{map:G5}));Q.position.y=1.2;let Z=new E0;Z.position.y=1.72,Z.add(new h(new l0(0.17,20,16),r0(14264450,0.7)));let K=r0(7031342,0.85),U=new h(new j0(0.34,0.34,0.025,28),K);U.position.y=0.1,U.scale.set(1,1,0.85);let H=new h(new j0(0.15,0.18,0.2,20),K);H.position.y=0.21;let W=new h(new j0(0.182,0.182,0.04,20),r0(2759184));W.position.y=0.14,Z.add(U,H,W);let Y=new h(new l0(0.168,16,10,0,Math.PI*2,Math.PI*0.55,Math.PI*0.4),r0(4863014,0.95));Z.add(Y);let N=new E0;N.position.y=0.88;for(let O of[-1,1]){let V=new h(new j0(0.1,0.09,0.86,10).translate(0,-0.43,0),r0(2898522,0.9));V.position.x=O*0.11;let D=new h(new _0(0.13,0.12,0.3),r0(3810324,0.6));D.position.set(0,-0.84,0.06),V.add(D),N.add(V)}let X=new h(new j0(0.22,0.22,0.08,16),r0(2759184));X.position.y=0.9;let q=new h(new _0(0.1,0.07,0.02),new W9({color:14200928,metalness:0.9,roughness:0.3}));q.position.set(0,0.9,0.22);let G=[0,1].map(()=>new h(new l0(0.06,10,8),r0(14264450,0.7))),F=[0,1].map(()=>new h(YD,r0(16777215,0.9,{map:G5})));return J.add(Q,Z,N,X,q,...G,...F),J.traverse((O)=>{if(O.isMesh)O.castShadow=!0,O.receiveShadow=!0}),Object.assign(J.userData,{head:Z,hands:G,arms:F,torso:Q,legs:N}),J}function GD(J,$,Q={}){let{hands:Z,arms:K,legs:U,head:H}=J.userData,W=Q.t??0;U.children.forEach((Y)=>Y.rotation.x=Q.sit?-1.45:0),H.rotation.x=Q.tilt??0,ND[$].forEach(([Y,N,X],q)=>{let G=Z[q],F=(Q.shake??0)*0.012;G.position.set(Y+Math.sin(W*41+q*2)*F,N+Math.sin(W*53+q)*F,X);let O=J7(q?0.26:-0.26,1.46,0.02),V=G.position.clone().sub(O);K[q].position.copy(O),K[q].quaternion.setFromUnitVectors(WD,V.clone().normalize()),K[q].scale.set(1,V.length(),1)})}function qD(){let J=new E0,$=r0(15921126,0.35),Q=new h(new r7(0.17,0.16,8,16),$);Q.position.y=0.26;let Z=new E0;Z.position.y=0.62,Z.add(new h(new l0(0.2,24,18),$));let K=new g0({color:7336191,toneMapped:!1});for(let N of[-1,1]){let X=new h(new l0(0.045,12,10),K);X.position.set(N*0.075,0.02,0.18),Z.add(X)}let U=new h(new l0(0.205,20,10,0,Math.PI*2,0,Math.PI/2.4),r0(14172207,0.7));U.position.y=0.01;let H=new h(new M7(0.17,0.012,6,24),r0(15777840,0.6));H.rotation.x=Math.PI/2,H.position.y=0.1;let W=new E0;W.position.y=0.23;for(let N=0;N<3;N++){let X=new h(new _0(0.2,0.008,0.04).translate(0.1,0,0),r0([3832789,15777840,3846250][N],0.5));X.rotation.y=N*Math.PI*2/3,W.add(X)}Z.add(U,H,W);let Y=[-1,1].map((N)=>{let X=new h(new r7(0.035,0.16,4,8).translate(0,-0.1,0),$);return X.position.set(N*0.19,0.36,0),X});return J.add(Q,Z,...Y),J.traverse((N)=>{if(N.isMesh)N.castShadow=!0}),J.userData={head:Z,prop:W,arms:Y,eyeMat:K},J}class o${renderer;scene=new $8;camera=new Q7(38,1.7777777777777777,0.05,1200);film;sky=new d$(600);sun=new t7(16777215,1);hemi=new K8(10467071,3811868,0.4);moon;room=new E0;lamp=new V8(16757611,0,9,1.6);lampBulb;screen=new iU(1280,800);screenLight=new V8(10275071,0,2.5,1.5);screenMesh;laptop=new E0;jar=new E0;coins;clockHands=[];notes;sack=new E0;bottle=new E0;glassFill;mug=new E0;steam;checks=new E0;windowShaft;dust;me=XD();ralph=qD();chair=new E0;outside=new E0;cabinWindow;porch=new V8(16757611,0,14,1.5);truck=new E0;taillights=[];headlights=new g6(16773328,0,60,0.4,0.5,1);roadCoins;bedCoins;sign;maybe;signGroup=new E0;signGlow=new V8(16726891,0,18,1.4);constructor(J){this.renderer=new _8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=BJ,this.renderer.toneMapping=G8,this.film=new n$(this.renderer,this.scene,this.camera),this.scene.fog=new r8(658456,0.004),this.scene.add(this.sky.mesh,this.sky.stars,this.hemi,this.sun,this.sun.target),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-0.0004,this.sun.shadow.normalBias=0.02,this.moon=new h(new l0(9,32,24),new g0({color:15920860,toneMapped:!1,fog:!1})),this.moon.position.set(-160,120,-380),this.scene.add(this.moon),this.buildRoom(),this.buildOutside(),this.dust=new cU(new D8(J7(-3.6,0.2,-2.8),J7(1,3,2)),700),this.room.add(this.dust.points),this.sign=new s$(["ralph-loop",".local",".md","-NEVER","_AGAIN"],{color:"#ff4d7d",height:1.25,gap:0.02}),this.maybe=new s$(["-MAYBE"],{color:"#ffc24d",height:1.25}),this.buildSign(),this.scene.add(this.room,this.outside)}static ROOM=J7(300,0,0);buildRoom(){let J=this.room;J.position.copy(o$.ROOM);let $=new h(new G9(10,8),r0(16777215,0.75,{map:LZ([120,80,50],[3,3])}));$.rotation.x=-Math.PI/2,$.receiveShadow=!0;let Q=r0(16777215,0.9,{map:LZ([150,110,75],[2,1.2])}),Z=(r,p0,$0,D0,V0,B0=0)=>{let P0=new h(new _0(r,p0,0.12),Q);P0.position.set($0,D0,V0),P0.rotation.y=B0,P0.castShadow=P0.receiveShadow=!0,J.add(P0)};Z(10,3.4,0,1.7,-3.2),Z(8,3.4,4.6,1.7,0,Math.PI/2),Z(8,1,-4.6,0.5,0,Math.PI/2),Z(8,1,-4.6,2.9,0,Math.PI/2),Z(2.6,1.4,-4.6,1.7,-2.2,Math.PI/2),Z(3.4,1.4,-4.6,1.7,2.3,Math.PI/2);let K=r0(3810838,0.8);for(let[r,p0,$0,D0]of[[0.08,1.4,1.7,-1.4],[0.08,1.4,1.7,0.6],[0.06,1.4,1.7,-0.4],[2,0.06,1.7,-0.4],[2.1,0.1,1,-0.4],[2.1,0.1,2.4,-0.4]]){let V0=new h(new _0(0.14,p0,r),K);V0.position.set(-4.6,$0,D0),V0.castShadow=!0,J.add(V0)}let U=new h(new _0(10,0.12,8),r0(5914672,0.9));U.position.y=3.46,U.castShadow=!0,J.add($,U);let H=new h(new C7(1.4,40),r0(16777215,1,{map:KJ(256,256,(r)=>{for(let p0=0;p0<9;p0++)r.fillStyle=["#7a2a20","#c8902f","#2a4a5a"][p0%3],r.beginPath(),r.arc(128,128,128-p0*14,0,Math.PI*2),r.fill()})}));H.rotation.x=-Math.PI/2,H.position.set(0.2,0.005,0.2),H.receiveShadow=!0,J.add(H);let W=r0(5913122,0.6),Y=new E0;Y.position.set(1.6,0,-2.5);let N=new h(new _0(2.4,0.08,1),W);N.position.y=0.92,Y.add(N);for(let[r,p0]of[[-1.1,-0.42],[1.1,-0.42],[-1.1,0.42],[1.1,0.42]]){let $0=new h(new _0(0.08,0.9,0.08),W);$0.position.set(r,0.45,p0),Y.add($0)}Y.traverse((r)=>{r.castShadow=!0,r.receiveShadow=!0}),J.add(Y);let X=this.laptop;X.position.set(1.5,0.96,-2.5);let q=new h(new _0(0.72,0.03,0.5),r0(2763827,0.35,{metalness:0.6})),G=new E0;G.position.set(0,0.015,-0.24),G.rotation.x=-0.18;let F=new h(new _0(0.72,0.47,0.02).translate(0,0.235,0),r0(2763827,0.35,{metalness:0.6}));this.screenMesh=new h(new G9(0.67,0.42),new g0({map:this.screen.texture,toneMapped:!1})),this.screenMesh.position.set(0,0.235,0.011),G.add(F,this.screenMesh),this.screenLight.position.set(0,0.235,0.3),G.add(this.screenLight),X.add(q,G),X.userData.lid=G,J.add(X);let O=new E0;O.position.set(2.5,0.96,-2.7);let V=new h(new Z7(0.2,0.22,24,1,!0),r0(3103290,0.5,{side:m9}));V.position.y=0.52;let D=new h(new j0(0.015,0.015,0.5),r0(11569744,0.3,{metalness:0.8}));D.position.y=0.25;let E=new h(new j0(0.1,0.12,0.03,20),r0(11569744,0.3,{metalness:0.8}));this.lampBulb=new h(new l0(0.05,12,10),new g0({color:16767392,toneMapped:!1})),this.lampBulb.position.y=0.46,this.lamp.position.set(0,0.42,0),this.lamp.castShadow=!0,this.lamp.shadow.mapSize.set(1024,1024),this.lamp.shadow.bias=-0.002,O.add(V,D,E,this.lampBulb,this.lamp),J.add(O),this.jar.position.set(0.55,0.96,-2.55);let C=new h(new j0(0.17,0.17,0.42,32,1,!0),new e8({color:14544639,roughness:0.05,transmission:0.9,transparent:!0,opacity:0.35,side:m9}));C.position.y=0.21;let L=new h(new j0(0.18,0.18,0.04,32),r0(9071162,0.4,{metalness:0.7}));L.position.y=0.44;let R=new h(new G9(0.2,0.08),r0(16777215,0.9,{map:KJ(256,100,(r)=>{r.fillStyle="#f0e2c0",r.fillRect(0,0,256,100),r.fillStyle="#3a2410",r.font='700 46px "Rye", serif',r.textAlign="center",r.fillText("TOKENS",128,66)})}));R.position.set(0,0.2,0.172);let _=new j0(0.035,0.035,0.01,16),B=new W9({color:15120458,metalness:0.9,roughness:0.28,emissive:3810304});this.coins=new w9(_,B,160);let A=new P9;for(let r=0;r<160;r++){let p0=y0(r)*Math.PI*2,$0=Math.sqrt(y0(r+7))*0.13;A.position.set(Math.cos(p0)*$0,0.01+Math.floor(r/10)*0.024+y0(r+3)*0.01,Math.sin(p0)*$0),A.rotation.set((y0(r+1)-0.5)*0.8,y0(r+2)*3,(y0(r+4)-0.5)*0.8),A.updateMatrix(),this.coins.setMatrixAt(r,A.matrix)}this.jar.add(C,L,R,this.coins),J.add(this.jar),this.mug.position.set(0.95,0.96,-2.2);let M=new h(new j0(0.06,0.055,0.12,20),r0(15262420,0.4));M.position.y=0.06;let I=new h(new C7(0.055,20),r0(1707784,0.2));I.rotation.x=-Math.PI/2,I.position.y=0.11;let y=new h(new M7(0.035,0.01,8,16,Math.PI),r0(15262420,0.4));y.position.set(0.065,0.06,0),y.rotation.z=-Math.PI/2;let S=new Float32Array(180),f=new O9;f.setAttribute("position",new e9(S,3)),this.steam=new g7(f,new y7({color:16777215,size:0.03,transparent:!0,opacity:0.25,depthWrite:!1})),this.mug.add(M,I,y,this.steam),J.add(this.mug),this.bottle.position.set(0,0.96,-2.35);let t=new e8({color:10115616,roughness:0.1,transmission:0.6,transparent:!0,opacity:0.8}),v=new h(new j0(0.07,0.07,0.26,20),t);v.position.y=0.13;let l=new h(new j0(0.02,0.04,0.12,16),t);l.position.y=0.32;let Q0=new h(new j0(0.071,0.071,0.1,20,1,!0),r0(15786688,0.8));Q0.position.y=0.12,this.bottle.add(v,l,Q0);let s=new h(new j0(0.045,0.04,0.09,20,1,!0),new e8({color:16777215,roughness:0.05,transmission:0.95,transparent:!0,opacity:0.3,side:m9}));s.position.set(0.22,1.005,-2.25),this.glassFill=new h(new j0(0.038,0.036,1,20).translate(0,0.5,0),new e8({color:13138472,roughness:0.1,transmission:0.4,transparent:!0,opacity:0.85})),this.glassFill.position.set(0.22,0.965,-2.25),J.add(this.bottle,s,this.glassFill);let a=new h(new _0(0.5,0.06,0.5),W);a.position.y=0.5;let u=new h(new _0(0.5,0.6,0.05),W);u.position.set(0,0.82,0.24),this.chair.add(a,u);for(let[r,p0]of[[-0.22,-0.22],[0.22,-0.22],[-0.22,0.22],[0.22,0.22]]){let $0=new h(new _0(0.05,0.5,0.05),W);$0.position.set(r,0.25,p0),this.chair.add($0)}this.chair.position.set(1.5,0,-1.7),this.chair.traverse((r)=>{r.castShadow=!0}),J.add(this.chair);let x=new E0;x.position.set(-2.8,0,-1.9);let Z0=new h(new _0(1.4,0.4,2.2),r0(4861984,0.7));Z0.position.y=0.2;let O0=new h(new _0(1.3,0.2,2.1),r0(15261904,0.9));O0.position.y=0.5;let z0=new h(new _0(1.36,0.1,1.5),r0(16777215,0.95,{map:KJ(256,256,(r)=>{for(let p0=0;p0<8;p0++)for(let $0=0;$0<8;$0++)r.fillStyle=["#7a3a2a","#c89a5a","#3a5a6a","#e8dcc0"][($0*3+p0*5)%4],r.fillRect($0*32,p0*32,32,32)})}));z0.position.set(0,0.63,0.3);let d=new h(new _0(0.8,0.14,0.4),r0(16052456,0.95));d.position.set(0,0.68,-0.8);let X0=new h(new _0(1.4,1,0.08),r0(4861984,0.7));X0.position.set(0,0.7,-1.08),x.add(Z0,O0,z0,d,X0),x.traverse((r)=>{r.castShadow=!0,r.receiveShadow=!0}),J.add(x);let n=new E0;n.position.set(-1,2.45,-3.12),n.add(new h(new C7(0.32,40),r0(16777215,0.6,{map:KJ(256,256,(r)=>{r.fillStyle="#f2ead6",r.beginPath(),r.arc(128,128,126,0,Math.PI*2),r.fill(),r.strokeStyle="#5a3a1a",r.lineWidth=10,r.stroke(),r.fillStyle="#2a1a10",r.font='700 30px "Rye", serif',r.textAlign="center",r.textBaseline="middle";for(let p0=1;p0<=12;p0++){let $0=p0/12*Math.PI*2;r.fillText(String(p0),128+Math.sin($0)*96,128-Math.cos($0)*96)}})})));for(let[r,p0]of[[0.18,0.025],[0.27,0.015]]){let $0=new h(new _0(p0,r,0.01).translate(0,r/2,0.01),r0(1707784));this.clockHands.push($0),n.add($0)}J.add(n),this.notes=new w9(new G9(0.18,0.18),r0(16777215,0.9,{map:KJ(128,128,(r)=>{r.fillStyle="#ffe066",r.fillRect(0,0,128,128),r.fillStyle="#3a2a10",r.font='700 22px "Caveat", cursive',r.fillText("new",14,52),r.fillText("approach",14,84)})}),40),J.add(this.notes);let Y0=new h(new l0(0.3,20,16),r0(10123850,0.95,{map:KJ(256,256,(r)=>{r.fillStyle="#a8865a",r.fillRect(0,0,256,256),r.fillStyle="#3a2a10",r.font='700 40px "JetBrains Mono", monospace',r.textAlign="center",r.fillText("CONTEXT",128,140)})}));Y0.scale.set(1,0.85,1),Y0.position.y=0.26;let H0=new h(new Z7(0.08,0.16,12),r0(10123850,0.95));H0.position.y=0.55,this.sack.add(Y0,H0),this.sack.traverse((r)=>{r.castShadow=!0}),J.add(this.sack);let c=new Q8;c.moveTo(-0.5,0),c.lineTo(-0.15,-0.38),c.lineTo(0.55,0.42),c.lineTo(0.42,0.52),c.lineTo(-0.15,-0.12),c.lineTo(-0.38,0.12);let A0=new y$(c);for(let r=0;r<14;r++){let p0=new h(A0,new g0({color:4120698,transparent:!0,toneMapped:!1,side:m9}));p0.scale.setScalar(0.18+y0(r)*0.12),this.checks.add(p0)}J.add(this.checks),this.windowShaft=H5(12374783,0.9,1.3,5.5),this.windowShaft.position.set(-4.7,2.5,-0.4),this.windowShaft.rotation.set(0,0,1.05),J.add(this.windowShaft),this.me.position.set(1.5,0,-1.65),J.add(this.me,this.ralph)}buildOutside(){let J=this.outside,$=new G9(1600,1600,160,160),Q=$.attributes.position;for(let x=0;x<Q.count;x++){let Z0=Q.getX(x),O0=Q.getY(x),z0=Math.hypot(Z0,O0),d=(Math.sin(Z0*0.02)*Math.cos(O0*0.017)*2.4+Math.sin(Z0*0.007+1)*4)*N9(40,160,z0);Q.setZ(x,d*(Math.abs(-O0-12)<8?N9(4,8,Math.abs(-O0-12)):1))}$.computeVertexNormals();let Z=new h($,r0(16777215,1,{map:HD}));Z.rotation.x=-Math.PI/2,Z.receiveShadow=!0,J.add(Z);for(let x=0;x<9;x++){let Z0=-0.6+x*0.32+y0(x)*0.1,O0=380+y0(x+4)*120,z0=40+y0(x+8)*60,d=30+y0(x+2)*45,X0=new h(new j0(z0*0.7,z0,d,7),r0(8014386,1));X0.position.set(Math.sin(Z0)*O0,d/2-4,-Math.cos(Z0)*O0),J.add(X0)}let K=new h(new G9(1600,7),r0(2763310,0.85));K.rotation.x=-Math.PI/2,K.position.set(0,0.03,12),K.receiveShadow=!0,J.add(K);let U=new w9(new G9(3,0.18),r0(15253568,0.6),200),H=new P9;for(let x=0;x<200;x++)H.position.set(-800+x*8,0.04,12),H.rotation.x=-Math.PI/2,H.updateMatrix(),U.setMatrixAt(x,H.matrix);J.add(U);let W=r0(4863526,0.9);for(let x=0;x<30;x++){let Z0=new E0,O0=new h(new j0(0.12,0.15,8),W);O0.position.y=4;let z0=new h(new _0(2.2,0.12,0.12),W);z0.position.y=7.4,Z0.add(O0,z0),Z0.position.set(-200+x*20,0,17.5),Z0.traverse((d)=>{d.castShadow=!0}),J.add(Z0)}let Y=r0(3824178,0.8);for(let x=0;x<26;x++){let Z0=new E0,O0=2.5+y0(x)*3,z0=new h(new r7(0.28,O0,6,12),Y);z0.position.y=O0/2,Z0.add(z0);for(let n of[-1,1])if(y0(x+n*10)>0.3){let Y0=0.9+y0(x+n)*1.2,H0=new h(new r7(0.2,0.6,6,10),Y);H0.rotation.z=Math.PI/2,H0.position.set(n*0.5,O0*0.45,0);let c=new h(new r7(0.2,Y0,6,10),Y);c.position.set(n*0.85,O0*0.45+Y0/2,0),Z0.add(H0,c)}let d=y0(x+30)*Math.PI*2,X0=18+y0(x+40)*90;if(Z0.position.set(Math.cos(d)*X0,0,Math.sin(d)*X0-10),Math.abs(Z0.position.z-12)<6)Z0.position.z-=14;Z0.traverse((n)=>{n.castShadow=!0}),J.add(Z0)}let N=new E0,X=r0(16777215,0.9,{map:LZ([130,90,60],[2,1])}),q=new h(new _0(7,3.4,5.5),X);q.position.y=1.7;let G=new Q8([new G0(-4,0),new G0(4,0),new G0(0,2.2)]),F=new h(new j8(G,{depth:6.3,bevelEnabled:!1}),r0(4864560,0.9));F.position.set(0,3.4,-3.15);let O=new h(new _0(0.7,2.2,0.7),r0(8018506,0.95));O.position.set(2.2,4.6,-1),this.cabinWindow=new h(new G9(1.5,1.1),new W9({color:1709072,emissive:16757611,emissiveIntensity:1.6})),this.cabinWindow.position.set(-1.6,1.9,2.77);let V=new h(new _0(1.1,2.2,0.08),r0(3810838,0.8));V.position.set(1.4,1.1,2.77);let D=new h(new _0(7.4,0.12,2),r0(4864560,0.9));D.position.set(0,2.8,3.7),D.rotation.x=0.1;for(let x of[-3.4,3.4]){let Z0=new h(new _0(0.14,2.8,0.14),r0(4861984,0.9));Z0.position.set(x,1.4,4.6),N.add(Z0)}let E=new h(new _0(7.4,0.2,2),r0(16777215,0.9,{map:LZ([110,75,50],[2,1])}));E.position.set(0,0.1,3.7),this.porch.position.set(0.4,2.5,3.6);let C=new h(new l0(0.08),new g0({color:16767392,toneMapped:!1}));C.position.copy(this.porch.position),N.add(q,F,O,this.cabinWindow,V,D,E,this.porch,C),N.traverse((x)=>{x.castShadow=!0,x.receiveShadow=!0}),J.add(N);let L=new e8({color:9313308,roughness:0.35,metalness:0.5,clearcoat:1,clearcoatRoughness:0.2}),R=new W9({color:14540253,metalness:1,roughness:0.15}),_=this.truck,B=new h(new _0(4.8,0.7,1.9),L);B.position.y=0.85;let A=new h(new _0(1.7,0.95,1.8),L);A.position.set(0.55,1.65,0);let M=new e8({color:2240576,roughness:0.05,metalness:0.2,transparent:!0,opacity:0.85}),I=new h(new G9(1.6,0.7),M);I.position.set(1.41,1.7,0),I.rotation.y=Math.PI/2,I.rotation.x=0;let y=new E0;for(let[x,Z0,O0,z0,d,X0]of[[2.4,0.5,0.08,-1.2,1.45,0.9],[2.4,0.5,0.08,-1.2,1.45,-0.9],[0.08,0.5,1.88,-2.38,1.45,0]]){let n=new h(new _0(x,Z0,O0),L);n.position.set(z0,d,X0),y.add(n)}let S=new h(new _0(0.08,0.5,1.6),R);S.position.set(2.42,0.95,0);let f=new h(new _0(0.16,0.18,2),R);f.position.set(2.5,0.55,0);let t=f.clone();t.position.x=-2.5;for(let x of[-0.65,0.65]){let Z0=new h(new C7(0.13,20),new g0({color:16774360,toneMapped:!1}));Z0.position.set(2.47,1,x),Z0.rotation.y=Math.PI/2;let O0=new h(new _0(0.06,0.22,0.16),new g0({color:16719904,toneMapped:!1}));O0.position.set(-2.44,1.1,x*1.2),this.taillights.push(O0),_.add(Z0,O0)}let v=new j0(0.42,0.42,0.3,24).rotateX(Math.PI/2),l=r0(1381653,0.9),Q0=[];for(let[x,Z0]of[[1.6,0.95],[1.6,-0.95],[-1.5,0.95],[-1.5,-0.95]]){let O0=new h(v,l);O0.position.set(x,0.42,Z0);let z0=new h(new j0(0.2,0.2,0.32,16).rotateX(Math.PI/2),R);O0.add(z0),Q0.push(O0)}this.headlights.position.set(2.5,1,0),this.headlights.target.position.set(20,0,0),_.add(B,A,I,y,S,f,t,...Q0,this.headlights,this.headlights.target),_.userData.wheels=Q0,_.traverse((x)=>{x.castShadow=!0});let s=new j0(0.11,0.11,0.025,16),a=new W9({color:15120458,metalness:0.9,roughness:0.25,emissive:4861952});this.bedCoins=new w9(s,a,220);let u=new P9;for(let x=0;x<220;x++)u.position.set(-2.3+y0(x)*2.2,1.25+y0(x+1)*0.35+Math.sin(y0(x+2)*3)*0.12,-0.8+y0(x+3)*1.6),u.rotation.set(y0(x+4)*2,y0(x+5)*3,y0(x+6)*2),u.updateMatrix(),this.bedCoins.setMatrixAt(x,u.matrix);_.add(this.bedCoins),this.roadCoins=new w9(s,a,360),J.add(_,this.roadCoins)}buildSign(){let J=this.signGroup,$=new h(new _0(this.sign.width+1.4,2.6,0.3),r0(1316380,0.6));$.position.z=-0.2;let Q=new h(new _0(this.sign.width+1.6,2.8,0.2),new W9({color:11569744,metalness:0.8,roughness:0.35}));Q.position.z=-0.3;let Z=r0(3816000,0.5,{metalness:0.6});for(let U of[-this.sign.width/3,this.sign.width/3]){let H=new h(new j0(0.16,0.2,7),Z);H.position.set(U,-4.6,-0.3),J.add(H)}let K=new s$(["STATE FILE"],{color:"#7ad8ff",height:0.55,font:'400 160px "Rye", serif'});K.group.position.set(0,1.75,0.02),K.set(0,1),this.sign.group.position.set(0,0,0),this.maybe.group.position.copy(this.sign.parts[3].mesh.position).setY(0),this.maybe.group.position.x+=(this.maybe.width-this.sign.parts[3].width)/2,this.maybe.group.position.y=0,this.maybe.group.position.z=0.03,J.add(Q,$,this.sign.group,this.maybe.group,K.group,this.signGlow),this.signGlow.position.set(0,0,2),J.position.set(-14,8.1,20.5),J.rotation.y=0.12,J.traverse((U)=>{if(U.isMesh&&!U.material.transparent)U.castShadow=!0}),this.outside.add(J)}flash(J){let $=PZ(J);return $.name==="leave"||$.name==="neon2"||$.name==="return"?Math.exp(-(J-$.at)*7)*0.18:0}fade(J){return N9(F7()-2.5,F7()-0.2,J)}truckAt(J){let $=w(8)-0.2,Q=w(28)-1;if(J<$)return{x:6.5,z:6,heading:Math.PI/2,moving:0};if(J<Q){let K=J-$;if(K<2.5){let U=Y9(K/2.5);return{x:6.5+U*2,z:j(6,12,U),heading:j(Math.PI/2,0,U),moving:1}}return{x:8.5+(K-2.5)*(3+(K-2.5)*0.35),z:10.2,heading:0,moving:1}}let Z=J-Q;return{x:Math.max(8.5,140-Z*22),z:13.8,heading:Math.PI,moving:Z<6?1:0}}update(J){this.t=J;let $=PZ(J),Q=$.name,Z=$.at,K=KD($),U=W0(J,Z,K),H=J-Z,W=this.camera,Y=this.film.look,N=o$.ROOM,X=UD(J),q=!["title","leave","neon","leave2","neon2","return","maybe","end"].includes(Q),G=this.sky.set(X,Math.PI/2),F=1-N9(0.28,0.55,X),O=new F0().lerpColors(new F0(16752736),new F0(16773856),N9(0.5,0.9,X));this.sun.color.lerpColors(O,new F0(8363263),F),this.sun.intensity=j(0.25,3.2,N9(0.3,0.8,X))+F*(q?2.4:0.35);let V=q?J7(-0.85,F>0.5?0.45:0.25+X*0.35,0.2).normalize():F>0.5?J7(-0.35,0.55,-0.75).normalize():G.clone();this.room.visible=q,this.outside.visible=!q,this.hemi.intensity=j(q?0.55:0.12,0.85,N9(0.25,0.9,X)),this.hemi.color.setHex(F>0.5?5927088:12375807),this.scene.fog.color.lerpColors(new F0(14196864),new F0(658456),F),this.scene.fog.density=j(0.0016,0.003,F),this.moon.visible=X<0.45,this.renderer.toneMappingExposure=j(1.1,0.95,N9(0.6,1,X));let D=q?N.clone().add(J7(-1,0,-1)):J7(0,0,6);this.sun.target.position.copy(D),this.sun.position.copy(D).addScaledVector(V,60);let E=this.sun.shadow.camera,C=q?8:40;E.left=-C,E.right=C,E.top=C,E.bottom=-C,E.near=1,E.far=140,E.updateProjectionMatrix();let L=J<K0(2,/light/i)-0.1||J>w(32)-0.5||Q==="commit"||Q==="limit";this.lamp.intensity=L?Q==="limit"?0:Q==="helping"||Q==="twenty"?2.5:6:0,this.lampBulb.material.color.setHex(L&&Q!=="limit"?16767392:3811866),this.windowShaft.material.uniforms.strength.value=j(0.22,0.32,1-F)*(q?1:0),this.windowShaft.material.uniforms.color.value.setHex(F>0.5?11060479:16763024),this.windowShaft.material.uniforms.time.value=J,this.dust.update(J);let R=F5(J);this.clockHands[0].rotation.z=-(R%12/12)*Math.PI*2,this.clockHands[1].rotation.z=-(R%1)*Math.PI*2;let _=J<w(28)-0.6?j9(W0(J,w(2),w(7))):0;this.coins.count=Math.round(160*(1-_)),this.drawScreen(J,Q),this.screenLight.intensity=Q==="limit"?1.2:Q==="helping"?0.15:0.7;let B=this.steam.geometry.attributes.position;for(let c=0;c<B.count;c++){let A0=(J*0.4+y0(c))%1;B.setXYZ(c,Math.sin(J*2+c)*0.02*A0*2,0.12+A0*0.35,Math.cos(J*1.7+c)*0.02)}B.needsUpdate=!0,this.steam.visible=J>w(6)-1&&J<w(12),this.mug.visible=J>w(6)-1;let A=W0(J,K0(29,/whiskey/i)-0.6,K0(29,/whiskey/i)+1.4);this.glassFill.scale.y=J<w(29)-1?0.0001:Math.max(0.0001,A*0.06),this.bottle.position.set(J>w(29)-0.3&&A<1?0.12:0,0.96+(A>0&&A<1?0.15:0),-2.35),this.bottle.rotation.z=A>0&&A<1?-1.9*Math.sin(A*Math.PI):0;let M=J<w(15)?0:Math.min(40,Math.floor((J-w(15))*9)),I=new P9;for(let c=0;c<40;c++)I.position.set(0.3+y0(c)*2.6,1.3+y0(c+1)*1.6,-3.13),I.rotation.set(0,0,(y0(c+2)-0.5)*0.5),I.scale.setScalar(c<M?1:0.0001),I.updateMatrix(),this.notes.setMatrixAt(c,I.matrix);this.notes.instanceMatrix.needsUpdate=!0,this.notes.visible=J>w(15)&&J<w(24),this.checks.visible=Q==="dream",this.checks.children.forEach((c,A0)=>{let r=A0/14*Math.PI*2+J*0.25;c.position.set(-2.8+Math.cos(r)*(0.6+y0(A0)*0.5),1.2+(J*0.2+y0(A0+5))%1*1.5,-2.3+Math.sin(r)*0.5),c.rotation.set(0,J*0.5+A0,0),c.material.opacity=0.85*Math.sin((J*0.2+y0(A0+5))%1*Math.PI)});let y=this.me;y.visible=q&&!["loop","state","reread","context","summary","app","rename","rename2","twenty","limit","helping","tenof","whiskey","ralph"].includes(Q),y.rotation.set(0,Math.PI,0),y.position.set(1.5,0,-1.65);let S="type",f=!0,t=0.15,v=0;if(Q==="pillow"||Q==="dream")y.position.set(-2.8,0.84,-0.93),y.rotation.set(-Math.PI/2,0,0),S="sleep",f=!1,t=Q==="pillow"?-0.25:0;else if(Q==="dawn")y.position.set(2,0,-1.6),y.rotation.y=Math.PI*0.95,S="mug",f=!1,t=-0.1;else if(Q==="goodbye")y.position.set(-3.7,0,-0.4),y.rotation.y=-Math.PI/2,S="hips",f=!1,t=0.05;else if(Q==="renews")y.position.set(-3.7,0,-0.4),y.rotation.y=-Math.PI/2-0.4,S="down",f=!1;else if(Q==="whiskey")S="pour",t=0.25;else if(Q==="tenof"||Q==="limit")S="face",t=0.35;else if(Q==="commit")v=1.6;else if(Q==="baggage"||Q==="approach")S="face",t=0.2;else if(Q==="ralph"||Q==="state"||Q==="loop"){if(Q==="ralph")y.position.set(-2.8,0.84,-0.93),y.rotation.set(-Math.PI/2,0,0),S="sleep",f=!1,t=0}if(GD(y,S,{sit:f,tilt:t,shake:v,t:J}),f)y.position.y=-0.36;let l=this.ralph,Q0=l.userData;if(l.visible=q&&J>w(4)-0.5,l.scale.setScalar(0.75),Q0.prop.rotation.y=J*14,Q0.eyeMat.color.setHex(Q==="limit"?3364198:7336191),Q==="baggage"){let c=j(-1.5,2.4,U);l.position.set(c,0,-0.6),l.rotation.y=Math.PI/2,this.sack.position.set(c-0.75,0,-0.6),this.sack.scale.setScalar(0.9+U*0.9),this.sack.visible=!0,Q0.arms.forEach((A0)=>A0.rotation.x=-1.2)}else if(this.sack.visible=!1,l.position.set(Q==="helping"?1.5:2.15,0.96,Q==="helping"?j(-2.95,-2.75,Y9(W0(J,K0(33,/helping/i)-0.5,K0(33,/helping/i)))):-2.45),l.rotation.y=Q==="helping"?0:-1.9,Q0.arms.forEach((c,A0)=>c.rotation.x=-1.1+Math.sin(J*22+A0*1.7)*0.25),Q0.head.rotation.z=Math.sin(J*3)*0.08,Q==="helping"){let c=Y9(W0(J,K0(33,/helping/i)-0.5,K0(33,/helping/i)));l.position.y=0.96+j(-0.6,0.12,c),Q0.arms.forEach((A0,r)=>A0.rotation.z=(r?-1:1)*c*2.4)}else Q0.arms.forEach((c)=>c.rotation.z=0);this.cabinWindow.material.emissiveIntensity=F>0.5?1.6:j(0,0.6,F*2),this.porch.intensity=F>0.4?6:0;let s=this.truckAt(J);this.truck.position.set(s.x,0,s.z),this.truck.rotation.y=-s.heading,this.truck.userData.wheels.forEach((c)=>c.rotation.z=-J*8*s.moving),this.taillights.forEach((c)=>c.material.color.setHex(F>0.2||s.moving?16719904:5246992)),this.headlights.intensity=s.moving&&F>0.2?60:0,this.bedCoins.count=J>w(8)-0.2&&J<w(28)-1?Math.max(30,Math.round(220-(J-w(8))*12)):220;let a=new P9,u=w(8)-0.2;for(let c=0;c<360;c++){let A0=u+1+c*0.045;if(!(J>A0&&J<w(28)-1)){a.scale.setScalar(0.0001),a.updateMatrix(),this.roadCoins.setMatrixAt(c,a.matrix);continue}let p0=this.truckAt(A0),$0=J-A0,D0=Math.min(1,$0*1.8),V0=j(1.6,0.04,D0)+Math.abs(Math.sin(D0*Math.PI*2))*0.25*(1-D0);a.position.set(p0.x-2.4+(y0(c)-0.5)*1.2-Math.min($0,0.5)*2,V0,p0.z+(y0(c+1)-0.5)*2.4),a.rotation.set(D0>=1?Math.PI/2*0:$0*9,y0(c+2)*6,D0>=1?0:$0*7),a.scale.setScalar(1),a.updateMatrix(),this.roadCoins.setMatrixAt(c,a.matrix)}this.roadCoins.instanceMatrix.needsUpdate=!0;let x=(c,A0)=>J>=K0(c,A0)-0.1?1:0,Z0=(c,A0)=>[x(c,/ralph/i),x(c,/local/i),x(c,/m-d/i),x(A0,/never/i),x(A0,/again/i)],O0=[0,0,0,0,0],z0=0;if(J>=w(10)-0.2)O0=Z0(10,11);if(J>=w(22)-0.3)O0=Z0(22,23);if(J>=w(30)-0.6){let c=K0(31,/maybe/i);O0=[x(30,/ralph/i),x(30,/local/i),x(30,/m-d/i),J<c?AZ(J,3,0.3+W0(J,w(30),c)*0.6):0,x(31,/again/i)],z0=J>=c-0.1?AZ(J,7,Math.max(0,0.6-(J-c))):0}if(Q==="neon2"||Q==="leave2")O0[3]=O0[3]*AZ(J,1,0.25);O0.forEach((c,A0)=>this.sign.set(A0,c)),this.maybe.set(0,z0),this.maybe.group.visible=J>=w(30)-0.6,this.signGlow.intensity=O0.reduce((c,A0)=>c+A0,0)/5*30*(0.4+F*0.6),this.signGlow.color.setHex(z0>0.5?16761421:16731517);let d=(c,A0,r=38)=>({pos:c,look:A0,fov:r}),X0=(c)=>[c[0]+N.x,c[1]+N.y,c[2]+N.z],n=(c,A0=0,r=0)=>{let p0=[1.5,1.2,-2.78];return d(X0([p0[0]+A0,p0[1]+0.05+r,p0[2]+c]),X0(p0),30)};Object.assign(Y,{focus:0,aperture:0.002,bloom:0.45,exposure:q&&F>0.5?1.35:1,warmth:0.25,saturation:0.92,contrast:1.06,vignette:0.55,grain:0.07,aberration:0.5,halation:0.5,letterbox:1,leak:0,fade:0}),Y.shadows.setRGB(0.42,0.5,0.6),Y.highlights.setRGB(0.6,0.52,0.42);let Y0=0.4,H0=null;switch(Q){case"title":{H9(W,d([-30,40,70],[-10,30,-100],42),d([-6,3.2,26],[-1.5,2.2,0],34),Y9(U)),Object.assign(Y,{warmth:-0.45,exposure:1.05,bloom:0.7}),Y0=0.2;break}case"desk":{H9(W,d(X0([3.4,1.6,0.4]),X0([1.5,1.05,-2.4]),34),d(X0([2.6,1.45,-0.6]),X0([1.4,1.1,-2.4]),30),U),H0=y.position.clone().add(J7(0,1.4,0));break}case"pillow":{H9(W,d(X0([-2.8,2.9,-1.2]),X0([-2.8,0.8,-2.2]),40),d(X0([-2.6,2.4,-1.4]),X0([-2.8,0.8,-2.3]),34),U),H0=J7(N.x-2.8,0.9,N.z-2.3),Y.warmth=0.1;break}case"loop":case"state":case"reread":case"context":case"summary":case"app":case"rename":case"rename2":case"twenty":{let c=Q==="loop"||Q==="twenty"?1.5:1;if(H9(W,n(c+0.15,-0.08,0.02),n(c,0.06,0),U),H0=J7(N.x+1.5,1.2,N.z-2.7),Y.aperture=0.004,Y.warmth=Q==="loop"&&J>K0(2,/light/i)?-0.25:0,Q==="context"&&J>K0(14,/forty/i))Y.aberration=2.2,Y.warmth=0.1;Y0=0.25;break}case"ralph":{H9(W,d(X0([-0.3,1.5,-0.4]),X0([1.1,1.2,-2.5]),34),d(X0([0,1.45,-0.8]),X0([1.1,1.25,-2.5]),30),U),H0=l.position.clone().add(J7(0,0.5,0)),Y.aperture=0.005,Y.warmth=-0.2;break}case"dream":{H9(W,d(X0([-1.4,1.6,-0.2]),X0([-2.8,1.4,-2.2]),40),d(X0([-1.9,1.9,-0.6]),X0([-2.8,1.6,-2.3]),36),U),H0=J7(N.x-2.8,1.5,N.z-2.2),Object.assign(Y,{warmth:-0.3,saturation:1.1,bloom:1,halation:1}),Y0=0.2;break}case"dawn":{H9(W,d(X0([3.6,1.5,0.6]),X0([2,1.4,-1.8]),36),d(X0([3.1,1.6,0.1]),X0([2,1.45,-1.8]),32),U),H0=y.position.clone().add(J7(0,1.4,0)),Object.assign(Y,{warmth:0.5,leak:0.25});break}case"tenof":{H9(W,d(X0([0.2,1.45,-1.2]),X0([0.9,1.15,-2.6]),32),d(X0([0.35,1.35,-1.5]),X0([0.8,1.15,-2.6]),28),U),H0=this.jar.position.clone().add(N).add(J7(0,0.2,0)),Y.aperture=0.006;break}case"leave":case"leave2":{if(Q==="leave")H9(W,d([20,0.8,9.5],[6,1.2,9],40),d([22,1.2,10],[9,1,10.5],36),U);else H9(W,d([-10,1.6,14.5],[40,1.2,10],30),d([-10,2.4,14.5],[80,1,10],26),U);H0=this.truck.position.clone().add(J7(0,1,0)),Y.aperture=0.0004,Object.assign(Y,{warmth:Q==="leave"?-0.1:0.45,bloom:0.6,leak:Q==="leave2"?0.2:0}),Y0=0.6;break}case"neon":case"neon2":case"maybe":{let c=this.signGroup.position;if(Q==="neon")H9(W,d([c.x+2,3.2,c.z+30],[c.x,c.y-0.5,c.z],36),d([c.x-1,5,c.z+24],[c.x,c.y,c.z],34),U);else if(Q==="neon2")H9(W,d([c.x+14,5.5,c.z+20],[c.x,c.y,c.z],36),d([c.x-8,6.5,c.z+22],[c.x,c.y,c.z],34),U);else H9(W,d([c.x+8,7.4,c.z+12],[c.x+3,c.y,c.z],32),d([c.x+6,7.8,c.z+10],[c.x+3.2,c.y,c.z],28),U);H0=c.clone(),Y.aperture=0.0012,Object.assign(Y,{warmth:Q==="maybe"?0.3:0,bloom:0.45,halation:0.35,exposure:0.9}),Y0=0.3;break}case"baggage":{H9(W,d(X0([0.4,0.5,1.8]),X0([0.4,0.4,-0.6]),40),d(X0([0.9,0.6,1.6]),X0([1.6,0.4,-0.6]),38),U),H0=l.position.clone();break}case"approach":{H9(W,d(X0([1.6,1.6,-0.2]),X0([1.6,1.9,-3.1]),40),d(X0([1.6,1.8,-1]),X0([1.6,2,-3.1]),34),U),H0=J7(N.x+1.6,2,N.z-3.1),Y.warmth=-0.1;break}case"commit":{H9(W,d(X0([0.7,1.85,-0.7]),X0([1.5,1.15,-2.6]),34),d(X0([0.85,1.75,-0.95]),X0([1.5,1.15,-2.6]),30),U),H0=J7(N.x+1.5,1.1,N.z-2.4),Y.aperture=0.006,Y0=1.6;break}case"limit":{H9(W,n(1.7,0,0.1),n(0.9,0,0.02),U),H0=J7(N.x+1.5,1.2,N.z-2.7),Object.assign(Y,{warmth:-0.5,exposure:0.9,saturation:0.7}),Y0=0.15;break}case"goodbye":{H9(W,d(X0([-1.2,1.7,1.4]),X0([-4.4,1.8,-0.4]),34),d(X0([-1.8,1.7,0.9]),X0([-4.4,1.8,-0.4]),32),U),H0=y.position.clone().add(J7(0,1.5,0)),Object.assign(Y,{warmth:0.55,exposure:0.95,leak:0.2});break}case"renews":{let c=J7(N.x-1,2.45,N.z-3.12);H9(W,d([c.x,c.y,c.z+1.8],c.toArray(),30),d([c.x,c.y,c.z+1],c.toArray(),30),U),H0=c,Y.aperture=0.008,Object.assign(Y,{warmth:0.6,leak:N9(K0(27,/renews/i)-0.3,K0(27,/renews/i)+0.6,J)*0.7}),Y0=0.1;break}case"return":{H9(W,d([30,1.4,16.5],[60,1.5,13],32),d([26,1.2,16.5],[16,1.3,13],38),U),H0=this.truck.position.clone().add(J7(0,1,0)),Y.aperture=0.0005,Object.assign(Y,{warmth:0.35,bloom:0.5}),Y0=0.5;break}case"whiskey":{if(H9(W,d(X0([0.6,1.35,-1.5]),X0([0.15,1.05,-2.3]),32),d(X0([0.45,1.25,-1.7]),X0([0.2,1.05,-2.3]),28),U),H0=this.glassFill.position.clone().add(N),Y.aperture=0.006,Y.warmth=0.55,J>K0(29,/changed/i)-0.3)H9(W,n(0.7,0.05,0),n(0.6,-0.04,0),W0(J,K0(29,/changed/i)-0.3,K)),H0=J7(N.x+1.5,1.2,N.z-2.7),Y.warmth=0.1;break}case"helping":{H9(W,d(X0([1.5,1.6,-0.6]),X0([1.5,1.45,-2.8]),32),d(X0([1.5,1.55,-0.9]),X0([1.5,1.5,-2.8]),28),U),H0=l.position.clone().add(J7(0,0.5,0)),Y.aperture=0.005,Y.warmth=0.3;break}case"end":{H9(W,d([-4,2.4,22],[-1,2.2,0],34),d([-20,30,70],[-10,35,-100],44),Y9(U)),Object.assign(Y,{warmth:0.3,bloom:0.5}),Y0=0.2;break}}if(zZ(W,J,Y0),this.sky.mesh.position.copy(W.position),this.sky.stars.position.copy(W.position),this.moon.position.copy(W.position).add(J7(-160,120,-380)),Y.focus=H0?W.position.distanceTo(H0):0,H<0.6&&(Q==="leave"||Q==="return"))Y.leak=Math.max(Y.leak,(1-H/0.6)*0.6);this.film.look.grain=0.06+s7(J)*0.01}drawScreen(J,$){let Q=this.screen,Z="#3ee07a",K="#6b7a90",U="#ff5f6b",H="#ffd166",W="#7ad8ff",Y=".claude/ralph-loop.local.md";if(J<w(2)-0.4)Q.show([{text:"$ claude",color:"#6b7a90"},"> build me the whole app.","  tests, docs, deploy. by morning.",{text:"",size:20},{text:"sure! I'll get started.",color:"#3ee07a"}],{title:"~/app",cursor:Math.floor(J*2)%2===0});else if(J<w(3)-0.3)Q.show([{text:"$ claude",color:"#6b7a90"},`> /ralph-loop "${l6("build the whole app",W0(J,w(2),K0(2,/spec/i)+0.6))}"`,{text:J>K0(2,/light/i)?"  loop started · going to bed":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<w(4)-0.3)Q.show([{text:"$ cat .claude/ralph-loop.local.md",color:"#6b7a90"},"---","active: true",`max_iterations: ${J>K0(3,/ten/i)-0.2?"10":""}`,'completion_promise: "DONE"',"---",{text:J>K0(3,/polite/i)?"# ten is polite.":"",color:"#6b7a90"}],{title:".claude/ralph-loop.local.md"});else if(J<w(7)-0.3){let N=Math.min(10,1+Math.floor(W0(J,w(4),w(7))*10));Q.show([{text:`iteration ${N}/10`,color:"#ffd166",bold:!0},"reading context…","editing src/app.tsx",{text:"✓ tests pass (2 of 41)",color:"#3ee07a"},{text:`tokens: ${(N*9.8).toFixed(0)}% of plan`,color:N>7?"#ff5f6b":"#6b7a90"}],{title:"ralph-loop",cursor:Math.floor(J*3)%2===0})}else if(J<w(9)-0.2)Q.show([{text:"iteration 10/10",color:"#ffd166",bold:!0},{text:"max_iterations reached.",color:"#ff5f6b"},{text:"tokens: 100% of plan",color:"#ff5f6b",bold:!0},"",{text:"app status: half",color:"#6b7a90"}],{title:"ralph-loop"});else if(J<w(12)-0.3)Q.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md",`$ ${l6("mv .claude/ralph-loop.local.md .claude/ralph-loop.local.md-NEVER_AGAIN",W0(J,w(9),K9(9)+0.4))}`,{text:J>K9(9)+0.5?"renamed.":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<w(14)-0.1){let N=Array.from({length:9},(X,q)=>({text:`> ${["previous attempt:","re-reading thread (1 of 1,204)","loading transcript…","loading last round…","loading the round before…","carrying over context","summarizing summaries","re-reading thread (2 of 1,204)","loading transcript…"][(q+Math.floor(J*8))%9]}`,color:q%3?"#6b7a90":"#7ad8ff"}));Q.show([{text:`iteration ${3+Math.floor((J-w(12))*1.5)}/10`,color:"#ffd166",bold:!0},...N],{title:"ralph-loop"})}else if(J<w(15)-0.1){let N=Math.min(40,Math.round(W0(J,w(14),K0(14,/forty/i))*40)),X="█".repeat(Math.round(N/2.5))+"░".repeat(40-Math.round(N/2.5)),q=J>K0(14,/forty/i)+0.3;Q.show([{text:"context window",color:"#6b7a90"},{text:X,color:N>=40?"#ff5f6b":"#3ee07a"},{text:`${N}% used`,color:N>=40?"#ff5f6b":"#3ee07a",bold:!0},{text:q?"quality: [REDACTED BY ENTROPY]":"quality: sharp",color:q?"#ff5f6b":"#3ee07a"}],{title:"ralph-loop"})}else if(J<w(16)-0.1){let N=Math.min(14,Math.floor((J-w(15))*6));Q.show(Array.from({length:N},(X,q)=>({text:"new approach:",color:q%2?"#ffd166":"#7ad8ff"})),{title:"ralph-loop"})}else if(J<w(17)-0.1)Q.show([{text:"SUMMARY",color:"#6b7a90",bold:!0},{text:"✨ Great progress!",color:"#3ee07a",bold:!0,size:56},{text:"Almost done!",color:"#3ee07a",bold:!0,size:56},"",{text:"(tests: 2 of 41)",color:"#6b7a90",size:26}],{title:"ralph-loop"});else if(J<w(18)-0.1)Q.show([{text:"schema.sql",color:"#7ad8ff"},"CREATE TABLE users (","  id serial,","  -- TODO","",{text:"// TODO  // TODO  // TODO",color:"#ffd166"}],{title:"localhost:3000",banner:{text:"[ Coming Soon ]",color:"#3a6ad8"}});else if(J<w(20)-0.2)Q.show([{text:"$ git status",color:"#6b7a90"},"modified: everything",`$ ${l6('git commit -m "burned all my tokens"',W0(J,w(18),K0(19,/tokens/i)+0.3))}`,{text:J>K0(19,/hundred/i)?"plan: $100 · used: 100%":"",color:"#ff5f6b",bold:!0}],{title:"~/app",cursor:!0});else if(J<w(24)-0.5)Q.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md",`$ ${l6("mv .claude/ralph-loop.local.md .claude/ralph-loop.local.md-NEVER_AGAIN",W0(J,w(21),K9(21)+0.4))}`,{text:J>K9(21)+0.5?"renamed. again.":"",color:"#3ee07a"}],{title:"~/app",cursor:!0});else if(J<w(29))Q.show([{text:"",size:20}],{title:"claude",bg:"#120b0e",banner:{text:"Usage limit reached · resets 9:00 AM",color:"#b3122e"}});else if(J<w(32)-0.4)Q.show([{text:"$ ls .claude",color:"#6b7a90"},"ralph-loop.local.md-NEVER_AGAIN",`$ ${l6("mv .claude/ralph-loop.local.md-NEVER_AGAIN .claude/ralph-loop.local.md-MAYBE_AGAIN",W0(J,K0(29,/changed/i)-0.2,K9(29)+0.4))}`],{title:"~/app",cursor:!0});else Q.show([{text:"$ cat .claude/ralph-loop.local.md",color:"#6b7a90"},"---","active: true",{text:`max_iterations: ${J>K0(32,/twenty/i)-0.2?"20":""}`,color:"#ffd166",bold:!0},"---",{text:J>w(33)-0.4?"I'm helping!":"",color:"#3ee07a",bold:!0}],{title:".claude/ralph-loop.local.md",cursor:!0})}t=0;render(){this.film.render(this.t)}}var FD=/^(never|again|quota's|burned|tokens|token|limit|hundred-dollar|dime|spent|shaking)$/,DD=/^(loop|ralph|ralph-loop|state|file|context|iterations|m-d|local|thread|schema|todos|commit)$/,ED=/^(dawn|six|coffee|whiskey|nine|renews|maybe|helping|helping!|twenty|green|checkmarks|progress)$/,E5={title:"NEVER_AGAIN",fonts:['400 100px "Rye"','400 100px "Monoton"','700 40px "Libre Baskerville"','italic 400 40px "Libre Baskerville"','700 40px "Caveat"','500 20px "JetBrains Mono"','800 40px "Inter"'],overlays:()=>`
  <div class="ov title" data-show="1.2|L0-0.6">NEVER_AGAIN<small>an outlaw country lament</small></div>
  <div class="ov bubble" data-show="W4:helping-0.1|L5-0.2" data-at="W4:helping-0.1">I'm helping!</div>
  <div class="ov card bill" data-show="W19:hundred-0.2|L20-0.3"><div class="bar">Claude Max · monthly</div>
    <div class="row">plan <b>$100</b></div>
    <div class="row">used <b data-count="0,100" data-at="W19:hundred-0.2" data-until="E19">0</b>%</div>
    <div class="row muted" data-at="E19-0.4">resets 9:00 AM</div></div>
  <div class="ov bubble big" data-show="W33:helping-0.1|W33:helping+2.2" data-at="W33:helping-0.1">I'm helping!</div>`,endAt:()=>K0(33,/helping/i)+2.4,words:{hot:FD,ice:DD,gold:ED},hide:/^(spoken|sob)$/,hud:(J,$)=>({left:`never_again &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`${D5(J)} &nbsp;·&nbsp; quota <b>${J<w(2)?"100%":J<w(28)-0.6?"gone":"renewed"}</b>`}),shots:wZ,shotAt:PZ,world:(J)=>{let $=new o$(J);return{update:(Q)=>$.update(Q),render:()=>$.render(),flash:(Q)=>$.flash(Q),fade:(Q)=>$.fade(Q)}}};var o9=(J,$,Q,Z)=>({name:J,at:$,label:Q,section:Z}),oU=(J,$)=>[o9("ask",w(J)-0.3,"can you explain that function?",$),o9("shrug",w(J+1)-0.2,"I don't know, I don't know",$),o9("ask2",w(J+2)-0.2,"can you explain that function?",$),o9("plank",w(J+3)-0.3,"over the plank you go",$)];function SZ(){return[o9("title",0,"a shanty in one act","verse 1"),o9("sail",w(0)-0.4,"ten times faster, lads","verse 1"),o9("crates",w(2)-0.3,"four thousand lines","verse 1"),o9("green",w(4)-0.2,"the tests were green","verse 1"),o9("lgtm",w(5)-0.2,"L-G-T-M","verse 1"),o9("diff",w(6)-0.2,"read the diff at last","verse 1"),o9("mast",w(7)-0.2,"hollered from the mast","verse 1"),...oU(8,"chorus"),o9("kevin",w(12)-0.4,"it's just a helper","verse 2"),o9("bosun",w(14)-0.2,"load-bearing","verse 2"),o9("pulled",w(15)-0.2,"the mast stayed up","verse 2"),o9("cook",w(16)-0.2,"what's this thing for?","verse 2"),o9("great",w(17)-0.1,"great question!","verse 2"),...oU(18,"chorus"),o9("barnacles",w(22)-0.8,"slop creeps in like barnacles","verse 3"),o9("hull",w(24)-0.2,"a retry inside a retry","verse 3"),o9("stern",w(28)-0.3,"all barnacle, stem to stern","verse 3"),o9("steer",w(29)-0.2,"ten times harder to steer","verse 3"),o9("quarters",w(30)-1,"who approved that function?","bridge"),o9("blame",w(31)-0.2,"you did, Cap'n. nine seconds.","bridge"),o9("crew",w(32)-0.2,"nobody tell the crew","bridge"),o9("heard",w(33)-0.3,"we heard","bridge"),...oU(34,"last chorus"),o9("built",w(38)-0.3,"the plank was built by Claude","last chorus"),o9("fell",w(39)-0.2,"when Cap'n fell","last chorus"),o9("bottom",w(40)-0.6,"ten times faster to the bottom","outro"),o9("end",w(41)-0.3,"great question!","outro")]}var R5=null,rU=(J)=>{let $=R5??=SZ(),Q=$[0];for(let Z of $)if(Z.at<=J)Q=Z;return Q},OD=(J)=>{let $=R5??=SZ();return $[$.indexOf(J)+1]?.at??F7()},TZ=()=>[{who:"jim",walk:w(11)-0.2,drop:K0(11,/^go/i),splash:K0(11,/splash/i)},{who:"cook",walk:w(21)-0.2,drop:K0(21,/^go/i),splash:K0(21,/splash/i)},{who:"cap",walk:w(37)-0.2,drop:K0(39,/fell/i),splash:K0(39,/splash/i)}],tU=(J)=>j(0,0.45,W0(J,w(22),w(24)))+j(0,0.55,W0(J,w(24),K9(28))),RD=(J)=>J<w(22)?0.05:J<w(30)-1?j(0.1,0.45,W0(J,w(22),w(30))):J<w(34)-0.3?0.12:J<w(40)-0.6?1:0.7,MD=(J)=>J<w(22)?0.86:J<w(30)-1?j(0.8,0.5,W0(J,w(22),w(30)-1)):J<w(34)-0.3?0.03:J<w(40)-0.6?0.18:j(0.3,0.42,W0(J,w(40),F7()));function aJ(J,$,Q,Z){return(0.18+0.75*Z)*(0.55*Math.sin(J*0.32+Q*1.3)+0.35*Math.sin($*0.41-Q*0.9+J*0.12)+0.18*Math.sin((J+$)*0.9+Q*2.1))}var x9=(J,$=0.8,Q={})=>new W9({color:J,roughness:$,metalness:0,...Q});function c6(J,$,Q,Z){let K=Object.assign(document.createElement("canvas"),{width:J,height:$});Q(K.getContext("2d"));let U=new O7(K);if(U.colorSpace=R7,U.anisotropy=8,Z)U.wrapS=U.wrapT=S8,U.repeat.set(...Z);return U}var aU=(J,$)=>c6(512,512,(Q)=>{for(let Z=0;Z<16;Z++){let K=y0(Z*3.1);Q.fillStyle=`rgb(${J.map((U)=>Math.round(U*(0.8+K*0.35))).join(",")})`,Q.fillRect(0,Z*32,512,31),Q.fillStyle="rgba(0,0,0,.45)",Q.fillRect(0,Z*32+31,512,1),Q.fillStyle="rgba(0,0,0,.12)";for(let U=0;U<14;U++)Q.fillRect(y0(Z*50+U)*512,Z*32+y0(U+Z)*30,30+y0(U*7+Z)*90,1);Q.fillStyle="rgba(0,0,0,.3)",Q.fillRect(y0(Z+99)*512,Z*32,2,31)}},$),O5=(J,$)=>c6(128,128,(Q)=>{for(let Z=0;Z<8;Z++)Q.fillStyle=Z%2?$:J,Q.fillRect(0,Z*16,128,16)},[1,2]),VD=c6(1024,1024,(J)=>{J.fillStyle="#efe4c8",J.fillRect(0,0,1024,1024);for(let $=0;$<6;$++)J.fillStyle="rgba(120,90,50,.18)",J.fillRect($*171,0,3,1024);for(let $=0;$<4000;$++)J.fillStyle=`rgba(110,80,40,${y0($)*0.05})`,J.fillRect(y0($+1)*1024,y0($+2)*1024,3,3);J.fillStyle="#b8282a",J.font='900 420px "Inter", sans-serif',J.textAlign="center",J.fillText("10×",512,600),J.font='800 70px "JetBrains Mono", monospace',J.fillText("POWERED BY A-I",512,760)}),_D=c6(256,256,(J)=>{J.fillStyle="#8a6238",J.fillRect(0,0,256,256),J.strokeStyle="#4a3018",J.lineWidth=14,J.strokeRect(7,7,242,242),J.beginPath(),J.moveTo(10,10),J.lineTo(246,246),J.stroke(),J.fillStyle="rgba(20,10,0,.85)",J.font='800 54px "JetBrains Mono", monospace',J.textAlign="center",J.fillText("PR #1",128,112),J.font='700 40px "JetBrains Mono", monospace',J.fillText("+4,000",128,172)}),G7=(J=0,$=0,Q=0)=>new k(J,$,Q),T9=1.2;function a$(J){let $=new E0,Q=x9(J.skin??14264450,0.7),Z=new h(new j0(0.25,0.22,0.7,16),J.shirt);Z.position.y=1.2;let K=new E0;K.position.y=1.75,K.add(new h(new l0(0.18,20,16),Q));let U=new h(new l0(0.035,10,8),x9(3805200,0.9));U.position.set(0,-0.06,0.165),U.scale.set(1.4,0.4,0.5),K.add(U);for(let Y of[-1,1]){let N=new h(new l0(0.022,8,6),x9(1118481,0.4));N.position.set(Y*0.065,0.03,0.16),K.add(N)}if(J.beard!==void 0){let Y=new h(new l0(0.185,16,10,0,Math.PI*2,Math.PI*0.5,Math.PI*0.45),x9(J.beard,0.95));K.add(Y)}if(J.hat==="tricorn"){let Y=x9(1841698,0.8),N=new h(new j0(0.34,0.34,0.04,3),Y);N.position.y=0.13,N.rotation.y=Math.PI/6+Math.PI;let X=new h(new j0(0.15,0.19,0.18,18),Y);X.position.y=0.22;let q=new h(new M7(0.3,0.012,6,3),new W9({color:14200928,metalness:0.8,roughness:0.35}));q.rotation.x=Math.PI/2,q.rotation.z=Math.PI/6+Math.PI,q.position.y=0.15,K.add(N,X,q)}else if(J.hat==="beanie"){let Y=new h(new l0(0.19,18,10,0,Math.PI*2,0,Math.PI/2.2),x9(11680298,0.95));Y.position.y=0.03,K.add(Y)}else if(J.hat==="chef"){let Y=new h(new j0(0.18,0.18,0.12,18),x9(16052714,0.9));Y.position.y=0.16;let N=new h(new l0(0.22,18,12),x9(16052714,0.9));N.position.y=0.33,N.scale.y=0.75,K.add(Y,N)}else{let Y=new h(new l0(0.188,18,10,0,Math.PI*2,0,Math.PI/2.4),x9(2771594,0.9));K.add(Y)}let H=[-1,1].map((Y)=>{let N=new E0;N.position.set(Y*0.11,0.86,0);let X=new h(new j0(0.1,0.09,0.84,10).translate(0,-0.42,0),x9(J.legs??2894389,0.9)),q=new h(new _0(0.13,0.12,0.28),x9(1971212,0.6));return q.position.set(0,-0.82,0.05),N.add(X,q),N}),W=[-1,1].map((Y)=>{let N=new E0;N.position.set(Y*0.3,1.48,0);let X=new h(new j0(0.07,0.06,0.62,8).translate(0,-0.31,0),J.shirt),q=new h(new l0(0.065,10,8),Q);return q.position.y=-0.65,N.add(X,q),N});return $.add(Z,K,...H,...W),$.traverse((Y)=>{if(Y.isMesh)Y.castShadow=!0}),Object.assign($.userData,{head:K,arms:W,legs:H,mouth:U}),$.scale.setScalar(J.scale??1),$}function rJ(J,$,Q,Z={}){let[K,U]=J.userData.arms,H=Math.sin(Q*Math.PI*2/(n7()*2)),W=(N,X,q)=>N.rotation.set(X,0,q);switch($){case"down":W(K,0.05,-0.12),W(U,0.05,0.12);break;case"haul":W(K,-1.1-H*0.45,-0.1),W(U,-1.1+H*0.45,0.1);break;case"shrug":W(K,-0.5,-1.1),W(U,-0.5,1.1);break;case"point":W(K,0.05,-0.12),W(U,-1.55,0.05);break;case"up":W(K,-0.2,-2.7-H*0.15),W(U,-0.2,2.7+H*0.15);break;case"hips":W(K,0.2,-0.6),W(U,0.2,0.6);break;case"pull":W(K,-1.3+H*0.2,-0.05),W(U,-1.3+H*0.2,0.05);break;case"hush":W(K,0.05,-0.12),W(U,-2.3,0.6);break;case"wheel":W(K,-1.2+Math.sin(Q*3)*0.25,-0.25),W(U,-1.2-Math.sin(Q*3)*0.25,0.25);break}J.userData.head.rotation.set(Z.tilt??0,Z.turn??0,Math.sin(Q*Math.PI/n7())*0.06),J.userData.mouth.scale.y=0.4+(Z.sing??0)*(0.8+Math.abs(Math.sin(Q*17))*0.9);let Y=Z.walk??0;J.userData.legs.forEach((N,X)=>N.rotation.x=Math.sin(Q*7+X*Math.PI)*0.45*Y)}function BD(){let J=new E0,$=x9(15234107,0.4,{metalness:0.2}),Q=new h(new r7(0.09,0.14,6,12),$);Q.rotation.x=0.4,Q.position.y=0.14;let Z=new E0;Z.position.set(0,0.3,0.05),Z.add(new h(new l0(0.085,16,12),$));let K=new h(new Z7(0.03,0.09,10),x9(15909198,0.5));K.rotation.x=Math.PI/2+0.5,K.position.set(0,-0.015,0.09);let U=new g0({color:7336191,toneMapped:!1});for(let Y of[-1,1]){let N=new h(new l0(0.02,8,6),U);N.position.set(Y*0.05,0.02,0.06),Z.add(N)}Z.add(K);let H=[-1,1].map((Y)=>{let N=new E0;N.position.set(Y*0.08,0.2,0);let X=new h(new _0(0.22,0.02,0.12).translate(Y*0.11,0,0),x9(12866858,0.5));return N.add(X),N}),W=new h(new _0(0.06,0.02,0.22).translate(0,0,-0.11),x9(2779824,0.5));return W.position.set(0,0.06,-0.06),W.rotation.x=0.5,J.add(Q,Z,...H,W),J.traverse((Y)=>{if(Y.isMesh)Y.castShadow=!0}),J.userData={head:Z,wings:H},J}class M5{canvas=Object.assign(document.createElement("canvas"),{width:1024,height:1280});texture=new O7(this.canvas);key="";constructor(){this.texture.colorSpace=R7,this.texture.anisotropy=8}show(J,$){let Q=JSON.stringify([J,$]);if(Q===this.key)return;this.key=Q;let Z=this.canvas.getContext("2d");Z.fillStyle="#ead9ac",Z.fillRect(0,0,1024,1280);for(let H=0;H<2500;H++)Z.fillStyle=`rgba(120,80,30,${y0(H)*0.06})`,Z.fillRect(y0(H+3)*1024,y0(H+4)*1280,4,4);let K=Z.createRadialGradient(512,640,300,512,640,900);K.addColorStop(0,"rgba(0,0,0,0)"),K.addColorStop(1,"rgba(90,50,10,.55)"),Z.fillStyle=K,Z.fillRect(0,0,1024,1280),Z.fillStyle="#3a2410",Z.font='italic 700 62px "Playfair Display", Georgia, serif',Z.fillText(J,70,140),Z.fillRect(70,170,884,4);let U=270;for(let H of $)Z.font='700 46px "JetBrains Mono", monospace',Z.fillStyle=H.color??"#2a1a0c",Z.fillText(H.text,70,U),U+=74;this.texture.needsUpdate=!0}}class eU{renderer;scene=new $8;camera=new Q7(38,1.7777777777777777,0.05,1500);film;sky=new d$(700);sun=new t7(16777215,1);hemi=new K8(12572415,1718852,0.6);fill=new t7(16773344,0.6);ocean;ship=new E0;sail;sailBase;plank=new E0;helper;crates=[];barnacles;barnacleSpots=[];lanterns=[];lanternGlass=[];scroll=new M5;scrollMesh;splash;rings;rain;cap=a$({shirt:x9(1911634,0.8),hat:"tricorn",beard:5913124,legs:15327951,scale:1.05});kevin=a$({shirt:x9(16777215,0.9,{map:O5("#f2efe6","#1e3d7a")}),hat:"beanie",skin:15186070});bosun=a$({shirt:x9(6965802,0.9),hat:"bandana",beard:2234383,skin:10119752,scale:1.12});cook=a$({shirt:x9(16052714,0.9),hat:"chef",skin:12947306});jim=a$({shirt:x9(16777215,0.9,{map:O5("#f2efe6","#a12a2a")}),hat:"beanie",beard:10512430,skin:14724742});parrot=BD();constructor(J){this.renderer=new _8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=BJ,this.renderer.toneMapping=G8,this.film=new n$(this.renderer,this.scene,this.camera),this.scene.fog=new r8(10467016,0.012),this.scene.add(this.sky.mesh,this.sky.stars,this.hemi,this.sun,this.sun.target,this.fill,this.fill.target),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:1,far:80}),this.sun.shadow.bias=-0.0004,this.sun.shadow.normalBias=0.03;let $=new G9(180,180,150,150);$.rotateX(-Math.PI/2),this.ocean=new h($,new W9({color:1923952,roughness:0.22,metalness:0.1,flatShading:!0})),this.ocean.receiveShadow=!0,this.scene.add(this.ocean),this.buildShip(),this.scene.add(this.ship);let Q=260,Z=new O9;Z.setAttribute("position",new e9(new Float32Array(Q*3),3)),this.splash=new g7(Z,new y7({color:15398655,size:0.22,transparent:!0,depthWrite:!1})),this.splash.frustumCulled=!1,this.rings=new h(new mJ(0.8,1,48),new g0({color:15398655,transparent:!0,side:m9,depthWrite:!1})),this.rings.rotation.x=-Math.PI/2;let K=4000,U=new Float32Array(K*3);for(let W=0;W<K;W++)U.set([(y0(W)-0.5)*40,y0(W+7000)*20,(y0(W+9000)-0.5)*40],W*3);let H=new O9;H.setAttribute("position",new e9(U,3)),this.rain=new g7(H,new y7({color:12110040,size:0.05,transparent:!0,opacity:0,depthWrite:!1})),this.rain.frustumCulled=!1,this.scene.add(this.splash,this.rings,this.rain,this.parrot)}buildShip(){let J=this.ship,$=new _0(11,2.2,3.4,40,6,8),Q=$.attributes.position;for(let M=0;M<Q.count;M++){let I=Q.getX(M),y=Q.getY(M),S=Q.getZ(M),f=j9((I-1.5)/4),t=j9((1.1-y)/2.2),v=(1-f*f*0.95)*(1-t*t*0.55);Q.setXYZ(M,I-(I<-4.5?(I+4.5)*0.2:0),y+f*f*0.5*(y>0?1:0.3),S*v)}$.computeVertexNormals();let Z=x9(16777215,0.75,{map:aU([110,66,38],[3,1])}),K=new h($,Z);K.position.y=0.1,K.castShadow=K.receiveShadow=!0;let U=new h($.clone(),x9(14200928,0.5));U.scale.set(1.002,0.06,1.01),U.position.y=0.85;let H=new h(new G9(9.6,2.9),x9(16777215,0.8,{map:aU([170,130,85],[2,1])}));H.rotation.x=-Math.PI/2,H.position.set(-0.5,T9,0),H.receiveShadow=!0,J.add(K,U,H);let W=x9(5913122,0.6);for(let M of[-1.45,1.45]){for(let[I,y]of M>0?[[-5.1,-1],[0.6,3.9]]:[[-5.1,3.9]]){let S=new h(new _0(y-I,0.08,0.08),W);S.position.set((I+y)/2,T9+0.65,M),J.add(S)}for(let I=-5;I<=3.6;I+=0.8){if(M>0&&Math.abs(I- -0.2)<0.5)continue;let y=new h(new _0(0.07,0.65,0.07),W);y.position.set(I,T9+0.32,M),y.castShadow=!0,J.add(y)}}let Y=new h(new _0(2.6,0.6,3),x9(16777215,0.8,{map:aU([140,96,60],[1,1])}));Y.position.set(-4,T9+0.3,0),Y.castShadow=Y.receiveShadow=!0,J.add(Y);let N=new E0;N.position.set(-3,T9+1.45,0),N.rotation.y=Math.PI/2;let X=new h(new M7(0.42,0.04,8,24),W);N.add(X);for(let M=0;M<8;M++){let I=new h(new j0(0.025,0.025,1.1),W);I.rotation.z=M*Math.PI/8,N.add(I)}let q=new h(new _0(0.15,0.85,0.15),W);q.position.set(-3,T9+1,0),J.add(N,q),J.userData.wheel=N;let G=new h(new _0(0.9,0.06,0.7),W);G.position.set(-4.4,T9+1.45,0.6);let F=new h(new _0(0.1,0.85,0.1),W);F.position.set(-4.4,T9+1.02,0.6),this.scrollMesh=new h(new G9(0.56,0.7),new W9({map:this.scroll.texture,roughness:0.9})),this.scrollMesh.rotation.x=-Math.PI/2,this.scrollMesh.rotation.z=Math.PI/2,this.scrollMesh.position.set(-4.4,T9+1.485,0.6),J.add(G,F,this.scrollMesh);let O=x9(6965802,0.6),V=new h(new j0(0.12,0.16,8.5),O);V.position.set(0.6,T9+4.25,0);let D=new h(new j0(0.09,0.12,6),O);D.position.set(-2.6,T9+3+0.6,0);let E=new h(new j0(0.5,0.4,0.4,16,1,!0),x9(5913122,0.7,{side:m9}));E.position.set(0.6,T9+7.2,0);for(let M of[T9+6.4,T9+2.2]){let I=new h(new j0(0.07,0.07,4.6),O);I.rotation.x=Math.PI/2,I.position.set(0.75,M,0),J.add(I)}let C=new G9(4.2,4,16,16);C.rotateY(Math.PI/2),this.sail=new h(C,x9(16777215,0.95,{map:VD,side:m9})),this.sail.position.set(0.85,T9+4.3,0),this.sail.castShadow=!0,this.sailBase=C.attributes.position.array.slice();let L=new h(new G9(0.9,0.55),x9(16777215,0.9,{side:m9,map:c6(256,160,(M)=>{M.fillStyle="#111",M.fillRect(0,0,256,160),M.fillStyle="#f4f1ea",M.font='800 64px "JetBrains Mono", monospace',M.textAlign="center",M.fillText("LGTM",128,104)})}));L.position.set(0.15,T9+8.7,0),J.add(V,D,E,this.sail,L),J.userData.flag=L,this.helper=new h(new _0(0.42,0.22,0.22),new W9({color:3836506,emissive:2817914,emissiveIntensity:0.6,roughness:0.4})),this.helper.position.set(0.6,T9+0.4,0.2),J.add(this.helper);let R=new h(new _0(0.5,0.07,3.2).translate(0,0,1.6),x9(16777215,0.7,{map:c6(128,512,(M)=>{M.fillStyle="#9a7048",M.fillRect(0,0,128,512);for(let I=0;I<30;I++)M.fillStyle="rgba(60,30,10,.25)",M.fillRect(0,y0(I)*512,128,2);M.save(),M.translate(64,256),M.rotate(Math.PI/2),M.fillStyle="rgba(30,15,5,.75)",M.font='700 30px "JetBrains Mono", monospace',M.textAlign="center",M.fillText("plank.ts · generated",0,10),M.restore()})}));R.castShadow=R.receiveShadow=!0,this.plank.position.set(-0.2,T9+0.05,1.4),this.plank.add(R),J.add(this.plank);let _=new _0(0.62,0.62,0.62),B=x9(16777215,0.8,{map:_D});for(let M=0;M<14;M++){let I=new h(_,B);I.castShadow=I.receiveShadow=!0;let y=M%5,S=Math.floor(M/5);I.userData.home=G7(2+y%3*0.66+(S===2?0.33:0),T9+0.31+S*0.62,-0.95+Math.floor(y/3)*0.66+(S?0.33:0)),I.rotation.y=(y0(M)-0.5)*0.25,this.crates.push(I),J.add(I)}let A=new k;for(let M=0;M<520;M++){let I=-4.4+y0(M)*8.8,y=-0.5+y0(M+1)*1.4,S=y0(M+2)>0.5?1:-1,f=j9((I-1.5)/4),t=j9((1.1-y)/2.2),v=1.7*(1-f*f*0.95)*(1-t*t*0.55);A.set(I,y+0.1+f*f*0.5*(y>0?1:0.3),S*(v+0.01)),this.barnacleSpots.push({p:A.clone(),n:G7(0,0,S),s:0.025+y0(M+3)*0.04})}this.barnacleSpots.sort((M,I)=>I.p.x-M.p.x+(y0(M.p.y)-0.5)*3),this.barnacles=new w9(new Z7(1,1.1,7),x9(11117204,0.95),this.barnacleSpots.length),this.barnacles.castShadow=!0,J.add(this.barnacles);for(let[M,I]of[[-4.9,-1.2],[-1.6,-1.3],[3.6,1.3]]){let y=new h(new l0(0.1,12,10),new g0({color:16760944,toneMapped:!1}));y.position.set(M,T9+(M<-4?1.75:1),I);let S=new V8(16754768,0,9,1.6);S.position.copy(y.position),this.lanterns.push(S),this.lanternGlass.push(y),J.add(y,S)}for(let M of[this.cap,this.kevin,this.bosun,this.cook,this.jim])J.add(M)}flash(J){let $=0;for(let Q of[w(34),K0(35,/know/i),w(36)+0.4,K0(39,/fell/i)])if(J>=Q)$=Math.max($,Math.exp(-(J-Q)*9)*0.55);return J>=w(34)-0.3&&J<w(40)-0.6?$:0}fade(J){return N9(K9(41)+0.4,F7(),J)}t=0;update(J){this.t=J;let $=rU(J),Q=$.name,Z=$.at,K=OD($),U=W0(J,Z,K),H=this.camera,W=this.film.look,Y=RD(J),N=MD(J),X=1-N9(0.1,0.4,N),q=s7(J),G=this.sky.set(N,0.9);this.sun.position.copy(G).multiplyScalar(40),this.sun.intensity=j(0.05,2.4,N9(0.15,0.6,N))*(1-Y*0.7),this.sun.color.setRGB(1,j(0.7,0.96,N),j(0.5,0.9,N)),this.hemi.intensity=j(0.25,1.1,N)*(1-Y*0.4);let F=this.scene.fog;F.color.setRGB(j(0.03,0.62,N),j(0.04,0.72,N),j(0.08,0.8,N)).lerp(new F0(0.12,0.14,0.17),Y*0.7),F.density=0.01+Y*0.025;let O=this.ocean.geometry.attributes.position,V=J*2.2;for(let d=0;d<O.count;d++){let X0=O.getX(d),n=O.getZ(d);O.setY(d,aJ(X0+V,n,J,Y))}O.needsUpdate=!0,this.ocean.geometry.computeVertexNormals(),this.ocean.material.color.setRGB(j(0.02,0.1,N),j(0.05,0.36,N),j(0.09,0.44,N)).lerp(new F0(0.08,0.13,0.15),Y*0.6);let D=Y9(W0(J,w(40)-0.3,K9(41)+0.5)),E=aJ(V,0,J,Y),C=aJ(4+V,0,J,Y),L=aJ(-4+V,0,J,Y),R=aJ(V,1.6,J,Y),_=aJ(V,-1.6,J,Y);this.ship.position.set(0,E*0.6-0.15-D*3.4,0),this.ship.rotation.set((R-_)/3.2*0.5+D*0.25,0,(C-L)/8*0.6-D*0.32),this.ship.userData.wheel.rotation.x=Math.sin(J*0.8)*0.4+(Q==="steer"||Q==="stern"?Math.sin(J*2.6)*1.2:0);let B=this.sail.geometry.attributes.position;for(let d=0;d<B.count;d++){let X0=this.sailBase[d*3+1],n=this.sailBase[d*3+2],Y0=(1-(n/2.1)**2)*(1-(X0/2)**2);B.setX(d,Y0*(0.55+q*0.08+Y*Math.sin(J*9+n*2+X0)*0.12))}B.needsUpdate=!0,this.sail.geometry.computeVertexNormals();let A=this.ship.userData.flag;A.rotation.y=Math.sin(J*4)*0.25+Y*Math.sin(J*13)*0.3,this.lanterns.forEach((d,X0)=>d.intensity=(X*2.2+Y*1.2)*(0.85+Math.sin(J*11+X0*3)*0.08+Math.sin(J*23+X0)*0.05)),this.lanternGlass.forEach((d)=>d.material.color.setRGB(1,0.75,0.45).multiplyScalar(0.3+X*0.45+Y*0.2)),this.crates.forEach((d,X0)=>{let n=d.userData.home,Y0=w(2)-0.4+X0*0.12,H0=W0(J,Y0,Y0+0.55),c=H0<1?(1-H0)**2*7-Math.sin(H0*Math.PI)*0:Math.abs(Math.sin((J-Y0-0.55)*9))*Math.exp(-(J-Y0-0.55)*6)*0.15;d.position.set(n.x,n.y+c,n.z),d.visible=J>Y0});let M=Y9(W0(J,K0(15,/pulled/i)-0.1,K0(15,/out/i)+0.3));this.helper.position.set(0.6+M*0.4,T9+0.4+M*0.5,0.2+M*0.9),this.helper.rotation.set(M*0.8,M*1.4,0),this.helper.material.emissiveIntensity=0.6+(Q==="bosun"?q*1.2:0);let I=tU(J),y=new v9,S=new F8,f=G7(0,1,0);if(this.barnacleSpots.forEach((d,X0)=>{let n=j9((I*this.barnacleSpots.length-X0)/25),Y0=d.s*b9(n);S.setFromUnitVectors(f,d.n),y.compose(d.p.clone().addScaledVector(d.n,Y0*0.4),S,G7(Y0,Y0,Y0)),this.barnacles.setMatrixAt(X0,y)}),this.barnacles.instanceMatrix.needsUpdate=!0,this.crewAt(J,Q),J<w(12)){let d=[{text:"+ function doTheThing(x) {"},{text:"+   return helpers.help(x)"},{text:"+     ?? retry(() => retry(() =>"},{text:"+          factory.make(String(x))))"},{text:"+ }"},{text:"+ // what does this do"},{text:"+ // (it helps)"},{text:"  ... 3,993 more lines",color:"#7a5a3a"}];this.scroll.show("PR #1 · the diff",d.slice(0,1+Math.floor(W0(J,w(6)-0.3,K9(7))*d.length)))}else{let d=[{text:"$ git blame doTheThing"},{text:"author:    Claude"},{text:"approved:  Cap'n",color:J>w(31)?"#8a1010":void 0},{text:"review:    L-G-T-M",color:J>K0(31,/^L/)?"#8a1010":void 0},{text:`time:      ${J>K0(31,/nine/i)?"9 seconds":"…"}`,color:J>K0(31,/nine/i)?"#8a1010":void 0},{text:"tell crew: no",color:"#7a5a3a"}];this.scroll.show("who approved it?",d.slice(0,J<w(30)?1:2+Math.floor(W0(J,w(30),K9(32))*4)))}let t=-99,v=G7();for(let d of TZ())if(J>=d.splash-0.05&&d.splash>t)t=d.splash,v=this.plankEnd();let l=J-t,Q0=this.splash.geometry.attributes.position;for(let d=0;d<Q0.count;d++){let X0=y0(d)*Math.PI*2,n=0.4+y0(d+1)*1.8,Y0=3+y0(d+2)*5;Q0.setXYZ(d,v.x+Math.cos(X0)*n*l*1.4,v.y+Y0*l-4.9*l*l,v.z+Math.sin(X0)*n*l*1.4)}Q0.needsUpdate=!0,this.splash.visible=l>=0&&l<1.6,this.splash.material.opacity=1-W0(l,0.6,1.6),this.rings.visible=l>=0&&l<3,this.rings.position.set(v.x,v.y+0.05,v.z),this.rings.scale.setScalar(0.3+l*2.2),this.rings.material.opacity=0.8*(1-W0(l,0,3));let s=this.rain.geometry.attributes.position;for(let d=0;d<s.count;d++)s.setY(d,((y0(d+7000)*20-J*14)%20+20)%20);s.needsUpdate=!0,this.rain.material.opacity=N9(0.5,0.9,Y)*0.6;let a=(d,X0,n=38)=>({pos:d,look:X0,fov:n}),u=this.ship.position.y,x=this.cap.getWorldPosition(G7()),Z0=this.kevin.getWorldPosition(G7());Object.assign(W,{focus:0,aperture:0.002,bloom:0.4,exposure:1,warmth:0.2,saturation:1.05,contrast:1.05,vignette:0.5,grain:0.06,aberration:0.4,halation:0.4,letterbox:1,leak:0,fade:0}),W.shadows.setRGB(0.42,0.5,0.58),W.highlights.setRGB(0.6,0.54,0.44);let O0=0.5;switch(Q){case"title":H9(H,a([22,7,18],[0,3,0],34),a([17,5.5,14],[0,3,0],34),U),Object.assign(W,{warmth:0.35,leak:0.25});break;case"sail":H9(H,a([9,0.9,6.5],[0.5,4.5+u,0],40),a([7.2,1.2,5.2],[0.5,5+u,0],44),U),W.warmth=0.3;break;case"crates":H9(H,a([7.5,4.8,4.5],[2.4,1.6+u,-0.6],36),a([6.4,4,3.4],[2.4,1.6+u,-0.6],36),U),W.focus=5.5,W.aperture=0.003;break;case"green":case"lgtm":H9(H,a([-1.2,3.4+u,2.6],[x.x,x.y+1.6,x.z],32),a([-1.6,3.2+u,2.2],[x.x,x.y+1.6,x.z],30),U),W.focus=3.2,W.aperture=0.006;break;case"diff":H9(H,a([-4,3.5+u,1.6],[-4.4,2.7+u,0.6],30),a([-4.2,3.2+u,1.1],[-4.4,2.6+u,0.6],28),U),W.focus=1,W.aperture=0.01,O0=0.3;break;case"mast":H9(H,a([-1,1.9+u,1.6],[x.x,x.y+1.9,x.z],34),a([-1.4,1.7+u,1.3],[x.x,x.y+1.9,x.z],30),U),O0=1.1;break;case"ask":case"ask2":{let d=Q==="ask"?1:-1;H9(H,a([1.6,3.8+u,d*6.2],[-1.2,2.2+u,0],36),a([1,3.4+u,d*5.2],[-1.2,2.2+u,0],36),U),W.warmth=J>w(34)-0.3?-0.35:0.25,O0=J>w(34)-0.3?1.4:0.7;break}case"shrug":H9(H,a([0.6,2.7+u,3.6],[-0.4,2.3+u,0.2],34),a([0.4,2.6+u,3.1],[-0.4,2.3+u,0.2],32),U),W.focus=3.4,W.aperture=0.005,W.warmth=J>w(34)?-0.35:0.25;break;case"plank":case"fell":{let d=this.plankEnd();H9(H,a([d.x+3.5,0.9,d.z+6.5],[d.x-0.5,1.6+u,d.z-0.8],36),a([d.x+2.6,0.8,d.z+5.4],[d.x-0.4,1.2+u,d.z-0.6],38),U),W.warmth=J>w(34)-0.3?-0.35:0.25,O0=0.8;break}case"kevin":H9(H,a([2.8,3+u,4.6],[(x.x+Z0.x)/2,2.6+u,0.3],36),a([2.4,2.9+u,4.1],[(x.x+Z0.x)/2,2.6+u,0.3],34),U),W.focus=3.5,W.aperture=0.005;break;case"bosun":case"pulled":H9(H,a([1.6,2.4+u,4.2],[0.8,1.8+u,0.4],34),a([1.4,2.6+u,3.6],[0.8,Q==="pulled"?3.4+u:1.9+u,0.4],38),U),W.focus=4.4,W.aperture=0.004;break;case"cook":case"great":{let d=this.parrot.getWorldPosition(G7()),X0=this.cook.getWorldPosition(G7());H9(H,a([d.x+2.2,d.y+0.3,d.z+1.4],[(d.x+X0.x)/2,d.y-0.1,(d.z+X0.z)/2],32),a([d.x+1.4,d.y+0.15,d.z+0.9],[d.x,d.y,d.z],Q==="great"?24:30),U),W.focus=Q==="great"?1.7:2.4,W.aperture=0.008,W.exposure=1.15;break}case"barnacles":H9(H,a([5,0.5,4.2],[3,0.6+u,1.2],36),a([2.5,0.4,3.6],[1,0.6+u,1.4],36),U),W.focus=3.2,W.aperture=0.003,W.warmth=0.1,W.exposure=1.45;break;case"hull":H9(H,a([4,0.7,4.4],[2,0.6+u,1.4],40),a([-4,0.7,4.4],[-5,0.6+u,1.4],40),U),W.warmth=0;break;case"stern":H9(H,a([8,3,-7.5],[-1,1.4+u,0],36),a([6.5,2.4,-6],[-1,1.4+u,0],34),U),W.warmth=-0.1;break;case"steer":H9(H,a([-1.5,3.3+u,-2.4],[x.x,x.y+1.6,x.z],32),a([-1.8,3.1+u,-2],[x.x,x.y+1.6,x.z],30),U),W.focus=2.6,W.aperture=0.006,O0=1.4,W.warmth=-0.15;break;case"quarters":case"crew":H9(H,a([-1.3,4.1+u,3.4],[-4.2,3.2+u,0.5],38),a([-1.6,4+u,3],[-4.2,3.2+u,0.5],36),U),Object.assign(W,{warmth:0.55,exposure:1.6,bloom:0.45,halation:0.6,saturation:0.9}),W.focus=3.4,W.aperture=0.006,O0=0.35;break;case"blame":H9(H,a([-4.05,3.45+u,1.45],[-4.4,2.65+u,0.6],30),a([-4.2,3.25+u,1.05],[-4.4,2.65+u,0.6],26),U),Object.assign(W,{warmth:0.5,exposure:1,bloom:0.3,halation:0.4}),W.focus=0.9,W.aperture=0.01,O0=0.25;break;case"heard":H9(H,a([3.8,3.1+u,-4.8],[0.7,2.7+u,-0.8],30),a([3.5,3+u,-4.4],[0.7,2.7+u,-0.8],27),U),Object.assign(W,{warmth:0.3,exposure:1.35,saturation:0.85}),W.focus=5,W.aperture=0.004;break;case"built":{let d=this.plankEnd();H9(H,a([d.x+1.2,d.y+1.4,d.z+1],[d.x-0.2,d.y,d.z-1.2],34),a([d.x+0.8,d.y+1,d.z+0.6],[d.x-0.2,d.y,d.z-1.2],30),U),W.focus=1.6,W.aperture=0.007,W.warmth=-0.35,W.exposure=2.1,O0=1.2;break}case"bottom":H9(H,a([16,3.5,13],[0,0.5,0],34),a([13,2.5,11],[0,0,0],34),U),Object.assign(W,{warmth:-0.2,saturation:0.8});break;case"end":{let d=this.parrot.getWorldPosition(G7());H9(H,a([d.x+2.8,d.y+0.4,d.z+3.4],[d.x,d.y,d.z],30),a([d.x+1.8,d.y+0.2,d.z+2.4],[d.x,d.y,d.z],26),U),Object.assign(W,{warmth:0.15,saturation:0.9}),W.focus=3,W.aperture=0.004;break}}if(Y>0.6)Object.assign(W,{saturation:0.75,contrast:1.15,exposure:1.2,aberration:0.8});if(X>0.5&&Q!=="quarters"&&Q!=="crew"&&Q!=="blame"&&Q!=="heard")W.exposure=Math.max(W.exposure,1.25);if(Q==="title")W.fade=1-N9(0,1.2,J);let z0=H.getWorldDirection(G7());this.fill.position.copy(H.position).add(G7(0,1.5,0)),this.fill.target.position.copy(H.position).addScaledVector(z0,6),this.fill.intensity=(0.25+N*0.55)*(1-Y*0.3),zZ(H,J,O0+Y*0.8),H.position.y=Math.max(H.position.y,aJ(H.position.x+V,H.position.z,J,Y)+0.35),this.rain.position.set(H.position.x,0,H.position.z)}plankEnd(){return this.plank.localToWorld(G7(0,0.05,3.1))}crewAt(J,$){let Q=TZ(),Z=(D)=>D.some((E)=>J>=w(E)&&J<=K9(E))?1:0,K=[8,9,10,11,18,19,20,21,34,35,36,37,38,39].some((D)=>J>=w(D)-0.2&&J<=K9(D)+0.2),U=[9,19,35].some((D)=>J>=w(D)-0.1&&J<=K9(D)+0.4),H=Math.sin(J*Math.PI/n7())*0.07,W=(D,E,C)=>{if(J>=E.splash+0.1)return D.visible=!1,!0;if(D.visible=!0,J<E.walk)return!1;let L=this.plank.position.z,R=this.plank.position.x,_=W0(J,E.walk,E.drop),B=Math.max(C.z,0.75),A=j9(_/0.1),M=j9((_-0.1)/0.2),I=j9((_-0.3)/0.1),y=j9((_-0.4)/0.6),S=j(C.x,R,N9(0,1,M)),f=j(j(C.z,B,N9(0,1,A)),L,N9(0,1,I))+y*2.9,t=j(C.y,T9+0.05,N9(0,1,M)),v=Math.max(0,J-E.drop),l=Math.min(v*v*4.9+v*0.8,T9+3);return D.position.set(S,t-l,f+v*0.6),D.rotation.set(v*2.2,M>0&&M<1?Math.sign(R-C.x)*Math.PI/2:0,0),rJ(D,v>0?"up":"down",J,{walk:v>0?0:1,tilt:0.3}),!0},Y=G7(-3.5,T9+0.6,0);if(!W(this.cap,Q[2],Y)&&this.cap.visible){let D=J>=w(30)-1&&J<w(34)-0.3;this.cap.position.copy(D?G7(-4.5,T9+0.6,-0.1):$==="green"||$==="lgtm"||$==="diff"?G7(-4.1,T9+0.6,0):G7(-3.5,T9+0.6,0)),this.cap.rotation.set(0,D?Math.PI*0.3:$==="diff"||$==="green"||$==="lgtm"?Math.PI*0.2:Math.PI/2,H*0.5);let E=$==="mast"?"point":$==="steer"||$==="stern"?"wheel":$==="lgtm"?"point":K?"point":$==="crew"?"hush":$==="quarters"?"hips":"down";rJ(this.cap,E,J,{sing:$==="mast"||K?1:0,tilt:$==="diff"?0.45:$==="mast"?-0.25:0})}let X=J>=Q[2].drop;if(!X){this.cap.updateMatrixWorld(!0);let D=this.cap.localToWorld(G7(0.28,1.62,0));this.parrot.position.copy(D),this.parrot.rotation.set(0,this.cap.rotation.y+Math.sin(J*0.7)*0.4,0)}else{let D=J-Q[2].drop,E=this.plankEnd();this.parrot.position.set(E.x+Math.sin(J*0.8)*0.6,Math.max(E.y,1.2)+1.2+Math.min(D,2)*0.6+Math.sin(J*3)*0.1,E.z-0.4),this.parrot.rotation.set(0,Math.PI/2+Math.sin(J*0.6)*0.5,0)}let q=X?Math.sin(J*22)*0.9:$==="great"||$==="end"?Math.sin(J*16)*0.5:0;this.parrot.userData.wings.forEach((D,E)=>D.rotation.z=(E?-1:1)*(0.2+q));let G=[17,41].some((D)=>J>=K0(D,/great/i)-0.05&&J<=K9(D));if(this.parrot.userData.head.rotation.set(G?-0.35+Math.sin(J*20)*0.15:0,Math.sin(J*1.3)*0.4,0),this.parrot.scale.setScalar($==="end"||$==="bottom"?1.6:1),this.kevin.position.set(0.65,T9,0.85),this.kevin.rotation.set(0,-Math.PI/2+0.3,H),rJ(this.kevin,U?"shrug":$==="kevin"?"hips":$==="heard"?"hush":"haul",J,{sing:Z([12,13])||(K?1:0),tilt:$==="heard"?-0.15:0}),$==="heard")this.kevin.position.set(0.5,T9,-0.85);if($==="quarters"||$==="blame"||$==="crew")this.kevin.position.set(-4,T9+0.6,1.3),this.kevin.rotation.set(0,-2.8,0),rJ(this.kevin,$==="blame"?"point":"down",J,{sing:Z([31]),tilt:0.15});if(this.bosun.position.set(1.2,T9,0.55),this.bosun.rotation.set(0,-Math.PI*0.75,H),rJ(this.bosun,$==="pulled"?"pull":U?"shrug":$==="bosun"?"point":"haul",J,{sing:K?1:0}),$==="heard")this.bosun.position.set(0.85,T9,-0.7),this.bosun.rotation.y=-Math.PI*0.6;let F=G7(-1.4,T9,-0.6);if(!W(this.cook,Q[1],F)&&this.cook.visible)this.cook.position.copy($==="cook"||$==="great"?G7(-2.5,T9+0.6,-1):F),this.cook.rotation.set(0,$==="cook"||$==="great"?-Math.PI*0.6:Math.PI*0.25,H),rJ(this.cook,U?"shrug":$==="cook"?"point":"haul",J,{sing:Z([16])||(K?1:0)});let O=G7(-0.8,T9,0.4);if(!W(this.jim,Q[0],O)&&this.jim.visible)this.jim.position.copy(O),this.jim.rotation.set(0,Math.PI*0.4,H),rJ(this.jim,U?"shrug":"haul",J,{sing:K?1:0});let V=N9(K0(39,/fell/i)-0.3,K0(39,/fell/i),J);this.plank.rotation.x=V*0.5}render(){this.film.render(this.t)}}var ID=/^(plank|splash!|splash|overboard|fell|bottom|know!|know|don't|nobody|barnacle|barnacles|slop|true|harder)$/,CD=/^(function\?|function|a-i|claude|claude,|helper|helper"|retry|factory|string|date|test|diff|p-r|lines|l-g-t-m!|l-g-t-m\.)$/,AD=/^(cap'n|cap'n!|kevin|kevin,|bosun|cook|crew|ten|faster|faster!|heave|ho!|nine|load-bearing|load-bearing!|great|question!|question!")$/,V5={title:"Can You Explain That Function?",fonts:['400 100px "Pirata One"','italic 700 60px "Playfair Display"','700 20px "JetBrains Mono"','900 100px "Inter"','400 100px "Anton"'],overlays:()=>`
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
  <div class="ov bubble big" data-show="W41:great-0.05|E41+1.2" data-at="W41:great-0.05">Great question!</div>`,endAt:()=>K9(41)+1.4,words:{hot:ID,ice:CD,gold:AD},hide:/^(whispered)$/,hud:(J,$)=>{let Q=TZ().filter((Z)=>J>=Z.splash).length;return{left:`explain that function &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`crew aboard <span class="ice">${5-Q}</span> &nbsp;·&nbsp; functions explained <b>0</b> &nbsp;·&nbsp; hull ${Math.round(tU(J)*100)}% barnacle`}},shots:SZ,shotAt:rU,world:(J)=>{let $=new eU(J);return{update:(Q)=>$.update(Q),render:()=>$.render(),flash:(Q)=>$.flash(Q),fade:(Q)=>$.fade(Q)}}};var $H=[["witness","can I get a witness"],["greenwash","green is just a color"],["sign","can't comprehend"],["aisle","who looked in?"],["read","read the diff!"]];function JQ(){let J=($,Q,Z)=>$H.slice(0,Q).map(([K,U],H)=>({name:K,label:U,section:Z,at:w($+H)-0.2}));return[{name:"exterior",at:0,label:"sunday morning",section:"spoken"},{name:"pulpit",at:K0(0,/^says/i)-0.1,label:"the good book",section:"spoken"},{name:"shipit",at:w(1)-0.3,label:"ship it!",section:"spoken"},{name:"who",at:w(2)-0.3,label:"who read the diff?",section:"spoken"},{name:"scroll",at:w(3)-0.3,label:"four thousand lines",section:"verse 1"},{name:"button",at:w(4)-0.2,label:"eleven seconds",section:"verse 1"},{name:"nine",at:w(5)-0.2,label:"line nine hundred",section:"verse 1"},{name:"greenbtn",at:w(6)-0.2,label:"the button was green",section:"verse 1"},{name:"devil",at:w(7)-0.2,label:"the devil's in the diff",section:"pre-chorus"},{name:"nobody",at:K0(8,/^nobody/i)-0.5,label:"ain't nobody looking",section:"pre-chorus"},...J(9,5,"chorus"),{name:"loaf",at:w(14)-0.6,label:"a little slop",section:"verse 2"},{name:"commits",at:w(15)-0.2,label:"the repo stunk",section:"verse 2"},{name:"candles",at:w(16)-0.2,label:"cleaned up some flaky tests",section:"verse 2"},{name:"laptop",at:w(18)-0.2,label:"explain this function",section:"verse 2"},{name:"bot",at:w(20)-0.2,label:"the bot said amen",section:"verse 2"},{name:"fire",at:w(21)-0.2,label:"prod's on fire",section:"verse 2"},...J(22,5,"chorus"),{name:"tablets",at:w(27)-0.6,label:"the commandments",section:"bridge"},{name:"devil",at:w(32)-0.2,label:"the devil's in the diff",section:"pre-chorus"},...J(33,3,"final chorus"),{name:"sermon",at:w(36)-0.2,label:"written with claude",section:"final chorus"},{name:"deadpan",at:w(37)-0.3,label:"it sounded so confident",section:"spoken"},{name:"lgtm",at:w(38)-0.3,label:"l-g-t-m",section:"choir"},{name:"pray",at:w(39)-0.6,label:"let us pray",section:"outro"},{name:"approved",at:w(40)-0.2,label:"amen. approved.",section:"outro"},{name:"end",at:K9(40)+1.4,label:"the end",section:"outro"}]}var QH=null,ZH=(J)=>{let $=QH??=JQ(),Q=$[0];for(let Z of $)if(Z.at<=J)Q=Z;return Q},zD=(J)=>{let $=QH??=JQ();return $[$.indexOf(J)+1]?.at??F7()},I5=new F0(16051419);var s6=12071482;var r$=13933114,JH=8015662,LD=6965900,_5={day:[9418200,15918792,10337146],pray:[4934266,15771752,6969962],approved:[4934266,15771752,6969962],end:[4934266,15771752,6969962],tablets:[7176090,15980960,11770486],button:[14865596,16051419,14272424],greenbtn:[14082756,16051419,13228208],loaf:[15259320,16181970,14271136],commits:[14146758,15854808,12896685],candles:[3026767,7032671,2761779],fire:[2040640,8010282,2103848]},e$=(()=>{let J=new y6(new Uint8Array([90,90,90,255,170,170,170,255,255,255,255,255]),3,1);return J.minFilter=J.magFilter=a7,J.needsUpdate=!0,J})(),B5=new Map,I9=(J)=>{let $=B5.get(J);if(!$)B5.set(J,$=new CJ({color:J,gradientMap:e$}));return $},I8=(J,$=1)=>new g0({color:J,transparent:$<1,opacity:$,depthWrite:$>=1}),E9=(J,$,Q=0,Z=0,K=0)=>{let U=new h(J,$);return U.position.set(Q,Z,K),U},z9=(J,$,Q,Z,K=0,U=0,H=0)=>E9(new _0(J,$,Q),I9(Z),K,U,H);function n6(J,$,Q){let Z=document.createElement("canvas");Z.width=J,Z.height=$,Q(Z.getContext("2d"));let K=new O7(Z);return K.colorSpace=R7,K.anisotropy=4,K}var A7=new P9,UJ=(J=0,$=0,Q=0)=>new k(J,$,Q),PD=new j0(0.075,0.09,1,8).translate(0,0.5,0),wD=new k(0,1,0);function kZ(J,$){let Q=new E0,Z=$.skin??[15254688,13012578,9263675,15782582,7029808][Math.floor(L0($.seed)*5)];if(Q.add(E9(new j0(0.24,0.5,1.35,14),I9(J),0,0.68,0)),$.stole)for(let W of[-1,1])Q.add(z9(0.1,0.9,0.05,$.stole,W*0.13,0.85,0.32));let K=$.robot?z9(0.42,0.4,0.4,9081500,0,1.6,0):E9(new l0(0.23,16,12),I9(Z),0,1.58,0);if($.robot){let W=E9(new _0(0.28,0.07,0.02),I8(10412154),0,0.02,0.21);K.add(W,E9(new j0(0.015,0.015,0.25),I9(9081500),0,0.32,0),E9(new l0(0.05),I8(s6),0,0.46,0)),Q.userData.extra=W}Q.add(K);let U=[-1,1].map((W)=>{let Y=E9(new l0(0.09,10,8),I9($.robot?9081500:Z));return Q.add(Y),Y}),H=[0,1].map(()=>{let W=new h(PD,I9($.robot?9081500:J));return Q.add(W),W});return Object.assign(Q.userData,{head:K,hands:U,arms:H,seed:$.seed}),Q}function t$(J,$,Q,Z=0.05,K=0){let{head:U,hands:H,arms:W,seed:Y}=J.userData;J.rotation.z=Math.sin($*Math.PI*1.78+Y)*Z,U.rotation.x=K*0.6,H.forEach((N,X)=>{let q=X?1:-1,G=j9(Q-L0(Y+X)*0.15);N.position.set(q*j(0.36,0.5,G),j(0.95,2.15,Y9(G))-K*0.1,j(0.3,0.12,G)+K*0.15),C5(W[X],q,N.position)})}function C5(J,$,Q){let Z=UJ($*0.24,1.3,0.05),K=Q.clone().sub(Z);J.position.copy(Z),J.quaternion.setFromUnitVectors(wD,K.clone().normalize()),J.scale.set(1,K.length(),1)}function TD(J){for(let $ of N7){if($.words[0].s>J+0.5)break;for(let Q of $.words)if(Q.backing&&J>=Q.s-0.08&&J<=Q.e+0.7)return N9(Q.s-0.08,Q.s+0.12,J)}return 0}var SD={uniforms:{tDiffuse:{value:null},res:{value:new G0(1920,1080)},paper:{value:I5.clone()},shotSeed:{value:0},boil:{value:0},reveal:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
    }`};class KH{renderer;scene=new $8;camera=new Q7(40,1.7777777777777777,0.1,500);composer;paint;sky;hemi=new K8(16774368,9075302,1.6);sun=new t7(16773336,1.9);glowLight=new V8(16756832,0,18,1.4);interior=new E0;windows=[];choir=[];robot;preacher;book;flock=[];scroll;scrollTex;roll;glass;devil=new E0;laptop=new E0;screen;screens={};exterior=new E0;churchWindows=[];button=new E0;cap;loaf=new E0;dough;slop;commits=new E0;cards=[];fumes=[];candles=new E0;flames;flameOrder=[];candlePos=[];fire=new E0;fireFlames;leds;smoke=[];kneeler;tablets=new E0;tabletTex=[];tabletShown=-1;rays=[];constructor(J){this.renderer=new _8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=I5.clone(),this.composer=new $J(this.renderer),this.composer.addPass(new ZJ(this.scene,this.camera)),this.composer.addPass(new QJ),this.paint=new oJ(SD),this.composer.addPass(this.paint),this.sun.position.set(-6,14,8),this.scene.add(this.hemi,this.sun,this.glowLight),this.buildSky(),this.buildInterior(),this.buildExterior(),this.buildButton(),this.buildLoaf(),this.buildCommits(),this.buildCandles(),this.buildFire(),this.buildTablets(),this.scene.add(this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets)}buildSky(){this.sky=new h(new l0(300,32,16),new h9({side:E7,depthWrite:!1,uniforms:{top:{value:new F0},horizon:{value:new F0},bottom:{value:new F0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; varying vec3 vDir;
        void main() { float y = vDir.y;
          vec3 c = y > 0. ? mix(horizon, top, pow(smoothstep(0., .7, y), .8)) : mix(horizon, bottom, smoothstep(0., .25, -y));
          gl_FragColor = vec4(c, 1.); }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildInterior(){let J=this.interior;J.add(z9(18,0.2,32,13214571,0,-0.1,-3)),J.add(z9(2.4,0.02,23,s6,0,0.01,0.5)),J.add(z9(0.3,13,32,15721416,-9,6.5,-3),z9(0.3,13,32,15721416,9,6.5,-3)),J.add(z9(18,13,0.3,15326400,0,6.5,-19.2),z9(18,13,0.3,15326400,0,6.5,12.6)),J.add(z9(2.6,4.2,0.1,JH,0,2.1,12.4)),J.add(z9(18,0.8,8,10119742,0,0.4,-15));let $=(F)=>n6(256,512,(O)=>{O.beginPath(),O.moveTo(8,504),O.lineTo(8,128),O.arc(128,128,120,Math.PI,0),O.lineTo(248,504),O.closePath(),O.clip();let V=["#3a5aa8","#b8323a","#d49a3a","#4f8a3c","#6a4a8c","#e7c46a"];for(let D=0;D<70;D++)O.fillStyle=V[Math.floor(L0(F+D)*V.length)],O.fillRect(Math.floor(L0(F+D*3)*6)*43,Math.floor(L0(F+D*7)*12)*43,43,43);O.strokeStyle="#2b2633",O.lineWidth=6;for(let D=0;D<=12;D++)O.beginPath(),O.moveTo(0,D*43),O.lineTo(256,D*43+(D%2?12:-12)),O.stroke();for(let D=0;D<=6;D++)O.beginPath(),O.moveTo(D*43,0),O.lineTo(D*43,512),O.stroke();O.lineWidth=14,O.stroke(new Path2D("M8 504 L8 128 A120 120 0 0 1 248 128 L248 504 Z"))}),Q=(F,O,V)=>{let D=new h(new G9(O,V),new g0({map:F,transparent:!0,alphaTest:0.1}));return this.windows.push(D),D};for(let[F,O]of[-5,0,5].entries()){let V=Q($(F*11),2.4,4.8);V.position.set(O,O===0?8.6:7.8,-19),J.add(V)}for(let F of[-1,1])for(let[O,V]of[-9,-2,5].entries()){let D=Q($(40+O*13+F*5),2,4);D.position.set(F*8.8,6,V),D.rotation.y=-F*Math.PI/2,J.add(D)}let Z=new E0;Z.add(z9(0.35,2.6,0.12,r$),z9(1.5,0.35,0.12,r$,0,0.45,0)),Z.position.set(0,4.6,-18.9),J.add(Z);for(let F of[-1,1])for(let O=0;O<7;O++){let V=3+Math.sin(O*0.6)*1.3+O*0.35;J.add(E9(new j0(0.16,0.16,V,10),I9(14201434),F*(5.4+O*0.42),0.8+V/2,-18.6))}for(let F=0;F<9;F++){let O=-8+F*2.1;for(let V of[-1,1]){J.add(z9(5,0.18,0.8,9067058,V*3.9,0.55,O),z9(5,1,0.14,8014890,V*3.9,0.95,O+0.45));for(let D=0;D<3;D++){if(L0(F*7+D+V*31)<0.25)continue;let E=F*10+D+(V>0?500:0),C=[3824296,6982218,12088154,8022682,13214282,5929610][Math.floor(L0(E+2)*6)],L=kZ(C,{seed:E});L.scale.setScalar(0.82),L.position.set(V*(2.2+D*1.5+L0(E)*0.3),0.18,O+0.1),L.rotation.y=Math.PI;let R=E9(new G9(0.16,0.26),I8(14216447));R.position.set(0,1.05,0.42),R.rotation.x=-0.9,L.add(R),J.add(L),this.flock.push({f:L,phone:R})}}}for(let F=0;F<3;F++){J.add(z9(13,0.45,1.1,9067574,0,1.02+F*0.45,-15.6-F*1.1));for(let O=0;O<7;O++){let V=900+F*10+O,D=F===0&&O===5,E=kZ(LD,{stole:r$,seed:V,robot:D});if(E.position.set(-4.8+O*1.6+F%2*0.4,1.25+F*0.45,-15.6-F*1.1),J.add(E),this.choir.push(E),D)this.robot=E}}this.preacher=kZ(2301994,{stole:s6,seed:77,skin:9263675}),this.preacher.position.set(0,0.8,-12.9),this.book=z9(0.5,0.68,0.14,3877410),this.book.add(z9(0.46,0.62,0.15,15258522,0.03,0,0)),this.preacher.add(this.book),J.add(this.preacher);let K=new E0;K.add(z9(1.5,1.35,0.9,8014890,0,0.68,0),z9(1.7,0.08,1,6175264,0,1.4,-0.05)),K.add(z9(0.6,0.5,0.02,s6,0,0.8,0.46)),K.position.set(0,0.8,-12),J.add(K),this.laptop.add(z9(0.8,0.04,0.55,10133672,0,0,0));let U=z9(0.8,0.52,0.03,10133672,0,0.26,-0.27);U.rotation.x=-0.25,this.screen=new h(new G9(0.74,0.46),new g0({color:16777215})),this.screen.position.set(0,0,-0.02),this.screen.rotation.y=Math.PI,U.add(this.screen),U.rotation.y=0,this.laptop.add(U),this.laptop.position.set(0,2.25,-12.05),this.laptop.rotation.y=0,J.add(this.laptop);let H=(F)=>n6(1024,640,(O)=>{O.fillStyle="#f6f1e6",O.fillRect(0,0,1024,640),O.fillStyle="#c96442",O.fillRect(0,0,1024,70),O.font="700 40px 'JetBrains Mono', monospace",O.fillStyle="#fff",O.fillText("claude",30,50),O.font="500 38px 'JetBrains Mono', monospace",F.forEach(([V,D],E)=>{O.fillStyle=V,O.fillText(D,34,140+E*66)})});this.screens.explain=H([["#c96442","> explain this function"],["#2b2633","This function elegantly"],["#2b2633","orchestrates a robust,"],["#2b2633","scalable synergy of..."],["#8a8494","(pasted back in, unread)"]]),this.screens.sermon=H([["#c96442","> write me a sermon about"],["#c96442","  reading the diff"],["#2b2633","Church! The Good Book says,"],["#2b2633",'"The A-I wrote it, the'],["#2b2633",'tests are green." ...']]),this.scrollTex=n6(512,2048,(F)=>{F.fillStyle="#fbf7ee",F.fillRect(0,0,512,2048);for(let O=0;O<64;O++){let V=L0(O*3.3)<0.08;F.fillStyle=V?"#f3c9c4":"#d3ebc8",F.fillRect(0,O*32,512,30),F.fillStyle=V?"#b8323a":"#4f8a3c",F.fillRect(10,O*32+12,14,6),F.fillStyle="#2b2633";let D=40+Math.floor(L0(O)*4)*26;for(let E=0;E<4;E++){let C=30+L0(O*9+E)*110;if(D+C>500)break;F.fillRect(D,O*32+11,C,8),D+=C+18}}}),this.scrollTex.wrapT=S8,this.scroll=new h(new G9(2.2,1),new CJ({map:this.scrollTex,gradientMap:e$})),this.scroll.rotation.x=-Math.PI/2,this.roll=E9(new j0(0.32,0.32,2.3,18),I9(16183264)),this.roll.rotation.z=Math.PI/2,J.add(this.scroll,this.roll),this.glass=new E0,this.glass.add(E9(new M7(0.42,0.05,10,32),I9(3877410))),this.glass.add(E9(new C7(0.4,32),I8(13625074,0.25)));let W=E9(new j0(0.05,0.06,0.7),I9(3877410),0,-0.75,0);this.glass.add(W),this.glass.rotation.x=-Math.PI/2+0.25,J.add(this.glass);let Y=I9(s6),N=E9(new l0(0.32,16,12),Y,0,0.62,0);for(let F of[-1,1]){let O=E9(new Z7(0.07,0.3,8),I9(5904926),F*0.17,0.28,0);O.rotation.z=-F*0.4,N.add(O,E9(new l0(0.06,8,6),I8(16774856),F*0.11,0.06,0.27))}N.add(E9(new M7(0.1,0.02,6,12,Math.PI),I9(5904926),0,-0.1,0.28));let X=E9(new Z7(0.26,0.6,12),Y,0,0.18,0),q=E9(new R8(new b6([UJ(0,0.1,-0.1),UJ(0.2,0.05,-0.5),UJ(0.5,0.3,-0.6),UJ(0.55,0.55,-0.45)]),20,0.03,6),Y),G=new E0;G.add(E9(new j0(0.02,0.02,1.3),I9(3877410)));for(let F of[-1,0,1])G.add(E9(new Z7(0.025,0.2,6),I9(3877410),F*0.08,0.72,0));G.position.set(0.38,0.5,0.1),G.rotation.z=-0.2,this.devil.add(N,X,q,G),J.add(this.devil)}buildExterior(){let J=this.exterior,$=E9(new l0(60,48,24),I9(9417322),0,-59.6,0);J.add($);for(let[W,Y,N,X]of[[-40,-50,30,8034922],[35,-60,36,7311218],[0,-80,40,8823712]])J.add(E9(new l0(N,32,16),I9(X),W,-N*0.82,Y));let Q=new E0;Q.add(z9(6,4.5,9,15986662,0,2.25,0));let Z=new Q8([new G0(-3.5,0),new G0(0,2.8),new G0(3.5,0)]),K=E9(new j8(Z,{depth:9.6,bevelEnabled:!1}),I9(9058866),0,4.5,-4.8);Q.add(K),Q.add(z9(1.8,3.2,1.8,15986662,0,6.2,4.2));let U=E9(new Z7(1.35,3.6,4),I9(9058866),0,9.6,4.2);U.rotation.y=Math.PI/4,Q.add(U,z9(0.12,1,0.12,r$,0,11.9,4.2),z9(0.6,0.12,0.12,r$,0,12,4.2)),Q.add(z9(1.4,2.6,0.1,JH,0,1.3,4.55));for(let W of[-2.5,0,2.5])for(let Y of[-1,1]){let N=new h(new G9(0.9,1.7),I8(9416904));N.position.set(Y*3.02,2.6,W),N.rotation.y=Y*Math.PI/2,Q.add(N),this.churchWindows.push(N)}let H=new h(new C7(0.5,24),I8(9416904));H.position.set(0,6.6,5.11),Q.add(H),this.churchWindows.push(H),Q.position.set(0,0.3,0),Q.rotation.y=0.35,J.add(Q),J.add(z9(1.4,0.05,14,14206106,1.8,0.35,10.5));for(let W=0;W<16;W++){let Y=L0(W)*Math.PI*2,N=12+L0(W+3)*14,X=Math.cos(Y)*N,q=Math.sin(Y)*N-4;if(q>6&&Math.abs(X)<6)continue;let G=3+L0(W+5)*3,F=Math.sqrt(Math.max(0,3600-X*X-q*q))-59.6;J.add(E9(new j0(0.15,0.22,G*0.4),I9(JH),X,F+G*0.2,q)),J.add(L0(W+9)<0.5?E9(new Z7(G*0.32,G,10),I9(5208646),X,F+G*0.4+G/2,q):E9(new l0(G*0.35,12,10),I9(6986314),X,F+G*0.75,q))}}buildButton(){let J=this.button;J.add(z9(8,0.3,5,15327180,0,-0.15,0)),J.add(E9(new j0(1.25,1.4,0.7,40),I9(10133672),0,0.35,0)),J.add(E9(new M7(1,0.07,10,40),I9(5922920),0,0.72,0).rotateX(Math.PI/2));let $=n6(512,512,(Q)=>{Q.fillStyle="#5fae4a",Q.fillRect(0,0,512,512),Q.fillStyle="#f6ffe8",Q.font="900 120px Fraunces, Georgia, serif",Q.textAlign="center",Q.fillText("LGTM",256,300)});this.cap=new h(new j0(0.92,0.92,0.32,40),[new g0({color:6270538}),new g0({map:$}),new g0({color:5212732})]),this.cap.position.y=0.88,this.cap.rotation.y=-Math.PI/2,J.add(this.cap),J.add(z9(1.6,0.06,2.2,16513006,-2.6,0.03,0.4).rotateY(0.3)),J.add(E9(new j0(0.28,0.24,0.6,18),I9(15986662),2.5,0.3,-0.6)),J.position.set(200,0,0)}buildLoaf(){let J=this.loaf;J.add(z9(6,0.25,3.6,11040586,0,-0.12,0)),this.dough=new h(new l0(1,40,24),new CJ({color:15389344,gradientMap:e$})),this.slop=E9(new l0(0.22,16,12),I9(8030794)),J.add(this.dough,this.slop);for(let $=0;$<9;$++)J.add(E9(new l0(0.05+L0($)*0.05,8,6),I9(15985368),-2.4+L0($+1)*4.8,0.03,-1.4+L0($+2)*2.8));J.position.set(400,0,0)}buildCommits(){let J=this.commits;J.add(z9(10,0.2,10,14208952,0,-0.1,0));let $=n6(512,128,(Q)=>{Q.fillStyle="#fbf7ee",Q.fillRect(0,0,512,128),Q.fillStyle="#4f8a3c",Q.font="700 64px 'JetBrains Mono', monospace",Q.fillText("✓",24,88),Q.fillStyle="#2b2633",Q.font="500 44px 'JetBrains Mono', monospace",Q.fillText("fix: tweak",100,82)});for(let Q=0;Q<12;Q++){let Z=new h(new _0(2.4,0.28,1.4),[I9(15986662),I9(15986662),I9(15986662),I9(15986662),new CJ({map:$,gradientMap:e$}),I9(15986662)]);Z.rotation.y=(L0(Q)-0.5)*0.3,J.add(Z),this.cards.push(Z)}for(let Q=0;Q<7;Q++){let Z=Array.from({length:8},(U,H)=>UJ(Math.sin(H*1.3+Q)*0.35,H*0.6,Math.cos(H*1.1+Q)*0.2)),K=E9(new R8(new b6(Z),40,0.07,6),I8(8036938,0.7));K.position.set(-1.6+Q*0.55,0,(L0(Q)-0.5)*1.2),J.add(K),this.fumes.push(K)}J.position.set(600,0,0)}buildCandles(){let J=this.candles,$=400,Q=40,Z=10;for(let H=0;H<10;H++)J.add(z9(13,0.3,0.5,6175264,0,H*0.32,-H*0.5));let K=new w9(new j0(0.06,0.06,0.26,8),I9(16183264),400);this.flames=new w9(new Z7(0.05,0.16,8),new g0({color:16762976}),400);for(let H=0;H<400;H++){let W=Math.floor(H/40),Y=H%40,N=UJ(-6.2+Y*0.32+W%2*0.16,W*0.32+0.28,-W*0.5+0.05);this.candlePos.push(N),A7.position.copy(N),A7.scale.setScalar(1),A7.updateMatrix(),K.setMatrixAt(H,A7.matrix)}let U=[173,186,213,226];this.flameOrder=[...Array(400).keys()].filter((H)=>!U.includes(H)).sort((H,W)=>L0(H)-L0(W)).concat(U),J.add(z9(16,9,0.3,3813448,0,4,-6),K,this.flames),J.position.set(800,0,0)}buildFire(){let J=this.fire;J.add(z9(14,0.2,10,3814464,0,-0.1,0));let $=3,Q=40;this.leds=new w9(new _0(0.08,0.05,0.02),new g0({color:16777215}),$*Q);for(let U=0;U<$;U++){J.add(z9(1.4,3.8,1.2,3028032,-2+U*1.6,1.9,-1.5));for(let H=0;H<Q;H++)A7.position.set(-2.4+U*1.6+H%4*0.2,0.5+Math.floor(H/4)*0.32,-0.88),A7.scale.setScalar(1),A7.updateMatrix(),this.leds.setMatrixAt(U*Q+H,A7.matrix)}this.fireFlames=new w9(new Z7(0.35,1.4,8),new g0({color:16777215}),70);for(let U=0;U<70;U++)this.fireFlames.setColorAt(U,new F0([15769648,14704682,16175200,13123626][U%4]));for(let U=0;U<10;U++){let H=E9(new l0(1,12,10),I8(4867152,0.35));J.add(H),this.smoke.push(H)}this.kneeler=kZ(2301994,{stole:s6,seed:77,skin:9263675}),this.kneeler.position.set(0.6,-0.45,2.6),this.kneeler.rotation.y=Math.PI*0.85;let Z=E9(new G9(0.9,1.2),new CJ({map:this.scrollTex,gradientMap:e$}),0.3,0.02,1.8);Z.rotation.x=-Math.PI/2;let K=new E0;K.add(E9(new j0(0.07,0.07,0.4,8),I9(16183264),0,0.2,0),E9(new Z7(0.06,0.18,8),I8(16765040),0,0.5,0)),K.position.set(-0.2,0,1.9),J.add(this.leds,this.fireFlames,this.kneeler,Z,K),J.position.set(1000,0,0)}buildTablets(){let J=this.tablets;J.add(E9(new Z7(14,10,7),I9(11045474),0,-5.2,-1)),J.add(E9(new Z7(30,16,7),I9(9075306),-20,-10,-40),E9(new Z7(26,14,6),I9(8030874),24,-9,-46));let $=new Q8;$.moveTo(-1,0),$.lineTo(-1,2.2),$.absarc(0,2.2,1,Math.PI,0,!0),$.lineTo(1,0),$.closePath();for(let[Q,Z]of[-1.15,1.15].entries()){let K=E9(new j8($,{depth:0.35,bevelEnabled:!0,bevelSize:0.06,bevelThickness:0.06,bevelSegments:2}),I9(10134445),Z,0,0),U=n6(512,820,()=>{}),H=new h(new G9(1.9,3.04),new g0({map:U,transparent:!0}));H.position.set(0,1.62,0.43),K.add(H),K.rotation.z=(Q?-1:1)*0.04,J.add(K),this.tabletTex.push(U)}for(let Q=0;Q<6;Q++){let Z=E9(new j0(0.4,2.6,30,16,1,!0),I8(16178314,0.18),-6+Q*2.4,14,-3);Z.rotation.z=(Q-2.5)*0.08,J.add(Z),this.rays.push(Z)}J.position.set(1200,0,0)}carve(J){if(J===this.tabletShown)return;this.tabletShown=J;let $=[["I","Read the diff,","not the summary"],["II","Read the source,","not the blog post"],["III","No time to not","have tests"],["IV","A plan before","the fix"],["V","A·I shall not","review A·I"]];this.tabletTex.forEach((Q,Z)=>{let K=Q.image,U=K.getContext("2d");U.clearRect(0,0,512,820),U.textAlign="center",(Z?$.slice(3):$.slice(0,3)).forEach(([W,Y,N],X)=>{if((Z?3:0)+X>J)return;let q=100+X*236;U.fillStyle="#1f2430",U.font="900 76px Fraunces, Georgia, serif",U.fillText(W,256,q),U.font="italic 600 60px Fraunces, Georgia, serif",U.fillText(Y,256,q+70),U.fillText(N,256,q+132)}),Q.needsUpdate=!0})}flash(J){return 0}fade(J){return 0}update(J){let $=ZH(J),Q=$.at,Z=zD($),K=J-Q,U=W0(J,Q,Z),H=$.name;for(let V of[this.interior,this.exterior,this.button,this.loaf,this.commits,this.candles,this.fire,this.tablets])V.visible=!1;let W=this.camera,Y=UJ();W.fov=40;let N=_5[H]??_5.day,X=this.sky.material.uniforms;X.top.value.setHex(N[0]),X.horizon.value.setHex(N[1]),X.bottom.value.setHex(N[2]),this.hemi.color.setHex(16774368),this.hemi.groundColor.setHex(9075302),this.hemi.intensity=1.6,this.sun.intensity=1.9,this.glowLight.intensity=0;let q=$H.some(([V])=>V===H)&&H!=="witness",G=Y9(W0(J,Q,Q+(q?0.45:0.8)));if(Q===0)G=Y9(W0(J,0,1.6));G*=1-N9(K9(40)+0.6,K9(40)+1.4,J);let F=this.paint.uniforms;F.reveal.value=G,F.shotSeed.value=(QH??JQ()).indexOf($)*3.71%50,F.boil.value=Math.floor(J*5)*1.37;let O=TD(J);switch(H){case"exterior":case"pray":case"approved":case"end":{this.exterior.visible=!0;let V=H!=="exterior";if(V)this.hemi.color.setHex(16763040),this.hemi.groundColor.setHex(4864602),this.hemi.intensity=1.2,this.sun.intensity=0.9;for(let E of this.churchWindows)E.material.color.setHex(V?16762976:9416904);let D=V?W0(J,w(39)-0.6,K9(40)+1.4):W0(J,0,K0(0,/^says/i));W.position.set(V?j(16,12,D):j(-15,-9.5,D),V?j(3,4.4,D):j(2.6,3.2,D),V?j(19,15,D):j(23,16,D)),Y.set(0,V?j(4,5.5,D):4,0),W.fov=42;break}case"button":case"greenbtn":{this.button.visible=!0;let V=this.button.position,D=H==="button"?N9(K0(4,/^l-g/i)-0.1,K0(4,/^l-g/i),J)*(1-N9(K0(4,/^l-g/i)+0.25,K0(4,/^l-g/i)+0.5,J)):0;this.cap.position.y=0.88-D*0.18;let E=H==="greenbtn"?0.75+s7(J)*0.25:1;for(let C of this.cap.material)C.color.setScalar(1).multiplyScalar(E);if(H==="button")W.position.set(V.x+j(1.4,0.6,U),j(4.2,3.6,U),j(4.4,3.4,U)),Y.set(V.x,0.6,0);else W.position.set(V.x+j(1.2,0.5,U),j(1.9,1.6,U),j(2.4,1.9,U)),Y.set(V.x,0.85,0),W.fov=36;break}case"loaf":{this.loaf.visible=!0;let V=this.loaf.position,D=p8(W0(J,Q+0.3,Q+1.1)),E=Y9(W0(J,Q+1.2,Z));this.slop.position.set(V.x*0+0.2,j(3.2,0.9,D),0.3),this.slop.visible=D<1,this.slop.position.x=0.2,this.dough.scale.set(j(1.3,2.4,E),j(0.75,1.7,E),j(1,1.6,E)),this.dough.position.set(0,j(0.6,1.3,E),0),this.dough.material.color.setHex(15389344).lerp(new F0(10135648),E*0.75);let C=j(-0.3,0.3,U);W.position.set(V.x+Math.sin(C)*6.5,j(2.4,3,U),Math.cos(C)*6.5),Y.set(V.x,1.1,0);break}case"commits":{this.commits.visible=!0;let V=this.commits.position;this.cards.forEach((E,C)=>{let L=Q+0.1+C*0.22,R=b9(W0(J,L,L+0.3));E.visible=J>=L,E.position.set(0,C*0.3+0.15+(1-R)*2,0)}),this.fumes.forEach((E,C)=>{let L=K0(15,/^stunk/i)-0.2+C*0.08;E.visible=J>=L,E.scale.y=Y9(W0(J,L,L+1.2)),E.position.y=3.6+(J-L)*0.5%0.6,E.rotation.y=J*0.5+C});let D=j(0.5,0.1,U);W.position.set(V.x+Math.sin(D)*7.5,j(2.8,3.6,U),Math.cos(D)*7.5),Y.set(V.x,1.9,0);break}case"candles":{this.candles.visible=!0;let V=this.candles.position,D=Math.round(j(400,4,Y9(W0(J,K0(16,/^cleaned/i),K0(17,/^four$/i)+0.4)))),E=new Set(this.flameOrder.slice(0,400-D));this.candlePos.forEach((L,R)=>{A7.position.set(L.x,L.y+0.21,L.z);let _=E.has(R)?0.001:1+Math.sin(J*13+R)*0.15;A7.scale.set(_,_*(1+s7(J)*0.2),_),A7.updateMatrix(),this.flames.setMatrixAt(R,A7.matrix)}),this.flames.instanceMatrix.needsUpdate=!0,this.hemi.intensity=j(0.35,1.3,D/400),this.sun.intensity=0.2,this.glowLight.position.set(V.x,3,3),this.glowLight.intensity=j(2,60,D/400);let C=W0(J,Q,K9(17)+0.5);W.position.set(V.x+j(-1.5,0,C),j(2.8,2,C),j(8,3.6,C)),Y.set(V.x+j(-0.5,0,C),j(1.6,1.7,C),-2),W.fov=j(48,34,C);break}case"fire":{this.fire.visible=!0;let V=this.fire.position;for(let D=0;D<70;D++){let E=D%3,C=0.6+Math.sin(J*9+D*1.7)*0.25+L0(D)*0.5;A7.position.set(-2.6+E*1.6+(L0(D+1)-0.5)*1.4,3.8+C*0.5+L0(D+2)*0.6-0.4,-1.5+(L0(D+3)-0.5)*1.2),A7.scale.set(0.7+L0(D)*0.6,C*1.4,0.7+L0(D)*0.6),A7.rotation.set(0,0,Math.sin(J*5+D)*0.15),A7.updateMatrix(),this.fireFlames.setMatrixAt(D,A7.matrix)}this.fireFlames.instanceMatrix.needsUpdate=!0,A7.rotation.set(0,0,0);for(let D=0;D<120;D++)this.leds.setColorAt(D,new F0(Math.sin(J*8+D*2.3)>0.2?14699066:5904926));if(this.leds.instanceColor)this.leds.instanceColor.needsUpdate=!0;this.smoke.forEach((D,E)=>{let C=(J*0.35+E/10)%1;D.position.set(-2+E%3*1.6+Math.sin(E)*0.6,5+C*6,-1.8),D.scale.setScalar(0.8+C*2.2),D.material.opacity=0.35*(1-C)}),t$(this.kneeler,J,0,0.02,1),this.hemi.color.setHex(16752752),this.hemi.groundColor.setHex(2761792),this.hemi.intensity=1.1,this.sun.intensity=0.4,this.glowLight.position.set(V.x-0.6,4,0),this.glowLight.intensity=50+Math.sin(J*11)*12,W.position.set(V.x+j(-3.8,-2.6,U),j(1.4,1.8,U),j(7,5.6,U)),Y.set(V.x-0.4,2.2,0),W.fov=46;break}case"tablets":{this.tablets.visible=!0;let V=this.tablets.position,D=0;for(let L=27;L<=31;L++)if(J>=w(L)-0.1)D=L-27;this.carve(D),this.rays.forEach((L,R)=>{L.material.opacity=0.12+0.1*Math.sin(J*1.5+R)+s7(J)*0.05});let E=j(-0.3,0.3,D/4)+(J-w(27+D))*0.03,C=D===4?6.5:4.6;W.position.set(V.x+(D<3?-1.15:1.15)*(D===4?0:1)+Math.sin(E)*C,2.6,Math.cos(E)*C),Y.set(V.x+(D<3?-1.15:1.15)*(D===4?0:1),2.3,0),W.fov=42;break}default:this.interiorShot(J,$,Y,O,U)}W.aspect=1.7777777777777777,W.updateProjectionMatrix(),W.lookAt(Y),this.sky.position.copy(W.position)}interiorShot(J,$,Q,Z,K){let{name:U,at:H}=$,W=this.camera;this.interior.visible=!0,this.hemi.intensity=1.5;let Y=U==="greenwash"?N9(H,H+0.6,J):0;for(let C of this.windows)C.material.color.setRGB(1,1,1).lerp(new F0(8048474),Y*0.8);this.hemi.color.setHex(16774368).lerp(new F0(12120224),Y*0.7);for(let C of this.choir)t$(C,J,Z,0.06);let N=U==="bot"?N9(K0(20,/^\W*amen/i)-0.1,K0(20,/^\W*amen/i)+0.1,J):0;if(U==="bot")t$(this.robot,J,N,0.02);this.robot.userData.extra.material.color.setHex(N>0.5?10412154:4872772);let X=U==="nobody"||U==="nine",q=U==="shipit"?N9(K0(1,/ship/i)-0.1,K0(1,/ship/i)+0.1,J):U==="lgtm"?Z:U==="witness"||U==="read"?Z*0.6:0;for(let{f:C,phone:L}of this.flock)C.visible=U!=="aisle",L.visible=X,t$(C,J,q,X?0.01:0.03,X?1:0);let G=U==="pulpit"?b9(W0(J,H+0.3,H+0.8)):0;t$(this.preacher,J,$H.some(([C])=>C===U)||U==="lgtm"?0.5+Z*0.5:0,U==="deadpan"||U==="who"?0:0.05);let F=this.preacher.userData.hands[1];if(G>0)F.position.set(0.45,j(0.95,2.3,G),0.25),C5(this.preacher.userData.arms[1],1,F.position);this.book.visible=U==="pulpit"||U==="shipit",this.book.position.copy(F.position).add(UJ(0,0.25,0.05));let O=U==="scroll"?Y9(W0(J,w(3)-0.2,K9(3)+0.6)):["nine","devil","aisle","nobody"].includes(U)?1:0,V=Math.max(0.01,O*26),D=-11.4;this.scroll.visible=this.roll.visible=O>0,this.scroll.scale.set(1,V,1),this.scroll.position.set(0,0.04,D+V/2),this.scrollTex.repeat.set(1,V/4),this.roll.position.set(0,0.33,D+V+0.3),this.roll.rotation.x=V/0.32,this.roll.visible=O>0&&O<1,this.glass.visible=U==="nine",this.glass.position.set(j(-0.4,0.2,K),0.9,j(-6,-4.8,K));let E=U==="devil";if(this.devil.visible=E,E){let C=b9(W0(J,H+0.25,H+0.75));this.devil.position.set(0.35,j(-0.9,0.05,C)+s7(J)*0.06,-5),this.devil.rotation.set(0,-0.35+Math.sin(J*3)*0.15,Math.sin(J*Math.PI*1.78)*0.12)}switch(this.laptop.visible=U==="laptop"||U==="sermon"||U==="deadpan",this.screen.material.map=U==="laptop"?this.screens.explain:this.screens.sermon,U){case"pulpit":W.position.set(j(0.8,0.3,K),j(2.4,2.6,K),j(-3,-7.5,K)),Q.set(0,2.6,-13),W.fov=38;break;case"shipit":W.position.set(1.4,3.4,-10.6),Q.set(0,0.9,2.5),W.fov=52;break;case"who":{let C=W0(J,H,w(3)-0.3);W.position.set(j(0.7,0.15,C),j(2.3,2.45,C),j(-5.5,-9.9,Y9(C))),Q.set(0,2.35,-12.9),W.fov=j(36,28,C);break}case"scroll":{let C=D+V;W.position.set(1.4,j(3.6,4.6,K),-13.2),Q.set(0,0,Math.max(-6,C-2)),W.fov=48;break}case"nine":W.position.set(j(0.9,0.5,K),3,j(-3.2,-2.4,K)),Q.set(this.glass.position.x,0,this.glass.position.z-0.5),W.fov=42;break;case"devil":W.position.set(1.8,1,-1.6),Q.set(0.3,0.45,-5),W.fov=36;break;case"nobody":W.position.set(j(7.5,6.5,K),j(9.5,8.5,K),j(12,10,K)),Q.set(0,0,-1),W.fov=46;break;case"witness":W.position.set(0,j(4.4,3.8,K),j(11,6,K)),Q.set(0,3,-15),W.fov=44;break;case"greenwash":W.position.set(j(-3.2,-2.4,K),1.3,-8),Q.set(0,4.2,-17),W.fov=54;break;case"sign":W.position.set(j(7.4,6.2,K),3.1,j(-14.5,-11.5,K)),Q.set(-1,2.6,-16.5),W.fov=44;break;case"aisle":W.position.set(0,j(4.2,5.2,K),-11.2),Q.set(0,0,9),W.fov=50;break;case"read":W.position.set(0,j(2.6,3,K),j(-9.2,-10.6,K)),Q.set(0,3,-16.5),W.fov=52;break;case"laptop":W.position.set(j(1.7,1.4,K),3.5,j(-14.2,-13.7,K)),Q.set(0,2.45,-12.1),W.fov=34;break;case"bot":{let C=this.robot.position;W.position.set(C.x+j(2.6,2,K),C.y+1.9,C.z+4.2),Q.set(C.x-0.3,C.y+1.5,C.z),W.fov=40;break}case"sermon":W.position.set(j(-1.5,-1.2,K),j(3.3,3.1,K),j(-13.9,-13.4,K)),Q.set(0,2.45,-12.1),W.fov=32;break;case"deadpan":W.position.set(0,2.45,-9.4),Q.set(0,2.38,-12.9),W.fov=26;break;case"lgtm":W.position.set(0,j(4.4,5.8,K),j(8,11.5,K)),Q.set(0,2.2,-12),W.fov=46;break;default:W.position.set(0,4,10),Q.set(0,2,-12)}}render(){this.composer.render()}}var UH=(J)=>`<div class="ov card sign" data-show="L${J}|L${J+1}-0.1"><div class="bar">review · required</div>
    <div class="row"><span class="box" data-at="W${J}:sign">✓</span> I have read and understood this change</div>
    <svg viewBox="0 0 520 120"><path class="draw" data-at="W${J}:sign" data-until="W${J}:comprehend+0.3" d="M10 80 C 40 20, 60 20, 70 70 S 100 110, 120 60 S 150 10, 170 70 C 180 100, 200 90, 215 55 C 230 25, 240 95, 262 70 S 300 30, 320 64 C 340 92, 370 40, 400 60 S 470 80, 510 50"/></svg>
    <div class="row muted">lines read: <b>0</b></div></div>`,A5={title:"Read the Diff",fonts:['900 100px "Fraunces"','italic 600 60px "Fraunces"','700 40px "Caveat"','500 20px "JetBrains Mono"'],overlays:()=>`
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
  ${UH(11)}${UH(24)}${UH(35)}
  <div class="ov stamp big" data-show="W38:l-g|L39-0.6" data-at="W38:l-g">LGTM</div>
  <div class="ov stamp big green" data-show="W40:approved|${K9(40)+1.2}" data-at="W40:approved">APPROVED</div>`,endAt:()=>K9(40)+1.4,words:{hot:/^(devil's|devil|fire|stunk|slop|confess|lord|nobody|no|knees|two)$/,ice:/^(diff|read|source|witness|function|commit|tests|lines|thousand|claude|sermon|p-r|a-i|bot|linter)$/,gold:/^(green|amen|l-g-t-m|lgtm|approved|ship|button|plan|church|pastor|son|brother|good|book)$/},hud:(J,$)=>{let Q=J>=w(Math.min(40,N7.length-1));return{left:`read the diff &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`<span class="add">+3,982</span> <span class="del">−18</span> &nbsp;·&nbsp; lines read <b>0</b>${Q?" &nbsp;·&nbsp; approved":""}`}},shots:JQ,shotAt:ZH,world:(J)=>new KH(J)};var z7=new F0(5822207),HJ=new F0(16723285),tJ=new F0(16763213),HH=new F0(10185727),jZ=new F0(3985262),z5=new F0(329227),cV=new F0(264212),f7=-24,J6=4,eJ=90,b8=30,o6=(J)=>0.3*Math.pow(2,(J-f7)/J6),C8=(J)=>f7+J6*Math.log2(J/0.3),m7=f7-14,y9=C8(eJ);function ZQ(){let J=($,Q=!1)=>{let Z=Math.max(w($)-1.6,Math.min(K9($-1)+0.05,w($)-0.05));return[{name:"ride",at:Z,label:$===47?"it doubles while we're meeting":"hold on",section:Q?"chorus · hushed":"chorus",ride:{first:$,a:Z,b:K9($+3)+0.4,hushed:Q}},{name:$===16?"montage":$===47?"triple":"terrified",at:K9($+3)+0.4,label:$===47?"tentative":"terrified, and thrilled",section:Q?"chorus · hushed":"chorus",ride:{first:$,a:w($),b:K9($+3),hushed:Q}}]};return[{name:"intro",at:0,label:"intro",section:"intro"},{name:"prius",at:w(0)-0.08,label:"the prius",section:"verse 1"},{name:"tesla",at:w(1)-0.08,label:"hands off",section:"verse 1"},{name:"years",at:w(2)-0.08,label:"ten years out",section:"verse 1"},{name:"linear",at:w(3)-0.08,label:"linear brain",section:"verse 1"},{name:"engine",at:w(4)-0.08,label:"one shot",section:"verse 1"},{name:"waiting",at:w(6)-0.08,label:"not yet",section:"verse 1"},{name:"ceiling",at:w(7)-0.08,label:"you're the ceiling",section:"verse 1"},{name:"releases",at:w(8)-0.08,label:"every three weeks",section:"verse 1"},{name:"comet",at:w(9)-0.08,label:"flip phone, comet",section:"verse 1"},{name:"agents",at:w(10)-0.08,label:"forty agents",section:"verse 1"},{name:"eol",at:w(12)-0.08,label:"end-of-life",section:"verse 1"},{name:"standup",at:w(14)-0.08,label:"the standup",section:"verse 1"},...J(16),{name:"cab",at:w(21)-0.08,label:"change board",section:"verse 2"},{name:"kernel",at:w(23)-0.08,label:"pilot phase",section:"verse 2"},{name:"flat",at:w(25)-0.08,label:"stable! love that",section:"verse 2"},{name:"procure",at:w(27)-0.08,label:"procurement",section:"verse 2"},{name:"fab",at:w(29)-0.08,label:"out of stock",section:"verse 2"},{name:"sun",at:w(31)-0.08,label:"soc 2",section:"verse 2"},{name:"vp",at:w(33)-0.08,label:"bonus achieved",section:"verse 2"},{name:"protein",at:w(35)-0.08,label:"the use case",section:"verse 2"},...J(37),{name:"bridge",at:w(42)-0.3,label:"no quorum",section:"bridge"},{name:"premeeting",at:w(43)-0.2,label:"the pre-meeting",section:"bridge"},...J(47,!0),{name:"moved",at:w(52)-0.6,label:"moved to thursday",section:"outro"},{name:"outro",at:w(53)-0.4,label:"the curve didn't wait",section:"outro"},{name:"end",at:K9(53)+2.2,label:"the end",section:"outro"}]}var YH=null,vZ=(J)=>{let $=YH??=ZQ();return $.filter((Q)=>J>=Q.at).at(-1)??$[0]},x8=()=>K0(7,/^go/i);function WJ(J,$,Q,Z="400 %spx Anton, Impact, sans-serif"){let K=document.createElement("canvas"),U=K.getContext("2d"),H=128;U.font=Z.replace("%s",String(128)),K.width=Math.ceil(U.measureText(J).width+76.8),K.height=Math.ceil(192),U.font=Z.replace("%s",String(128)),U.textAlign="center",U.textBaseline="middle",U.shadowColor=$,U.shadowBlur=24,U.fillStyle=$,U.fillText(J,K.width/2,K.height/2);let W=new O7(K);W.colorSpace=R7;let Y=new T$(new v6({map:W,color:10132122,transparent:!0,depthWrite:!1,fog:!1}));return Y.scale.set(Q*K.width/K.height,Q,1),Y.userData.base=Y.scale.clone(),Y}var i6=(J,$)=>J.scale.copy(J.userData.base).multiplyScalar(Math.max(0.001,$)),QQ=(J,$)=>new pJ({color:J,transparent:!0,opacity:$,depthWrite:!1}),$Q=(J,$,Q=0.9)=>new O8(new f6(J),QQ($,Q));class w5 extends p7{constructor(){super()}getPoint(J,$=new k){let Q=j(m7,y9,J);return $.set(Q,o6(Q),0)}}var L5={intro:[461342,1194578,263692],prius:[1181478,5903944,459790],tesla:[920106,8002130,525327],years:[268322,1006182,198667],linear:[398368,1460314,198410],engine:[660518,6959124,329484],waiting:[1380138,6957630,460044],ceiling:[399402,2779786,264720],releases:[921386,3418234,394767],comet:[197903,1714794,131849],agents:[201743,1202754,133130],eol:[1182238,4856378,459787],standup:[1708556,5913120,657157],ride:[1836562,9052208,656136],montage:[2098448,10099258,787208],terrified:[2360334,10494014,787206],hushed:[265250,1458298,132623],cab:[1967628,6953508,787206],kernel:[1050656,4860538,394252],flat:[398368,1722970,198410],procure:[1314826,5917210,525834],fab:[1181734,4860554,459791],sun:[2100228,9060368,787971],vp:[399888,1727028,199174],protein:[268832,1727082,133130],bridge:[198159,990778,131848],premeeting:[657940,2763332,328968],moved:[657940,2763332,328968],outro:[263695,1712708,131848],end:[131848,526868,66052]},i0=new P9,L7=(J=0,$=0,Q=0)=>new k(J,$,Q);class WH{bodies;heads;constructor(J,$,Q){this.bodies=new w9(new r7(0.2,0.62,4,8),new W9({color:$,roughness:0.7}),J),this.heads=new w9(new l0(0.17,12,8),new W9({color:new F0($).multiplyScalar(1.2),roughness:0.7}),J),Q.add(this.bodies,this.heads)}set(J,$,Q,Z,K=0,U=!1){let H=U?-0.35:0;i0.position.set($,0.52*Z+H,Q),i0.rotation.set(0,0,K),i0.scale.setScalar(Z),i0.updateMatrix(),this.bodies.setMatrixAt(J,i0.matrix),i0.position.set($-K*0.6,1.2*Z+H,Q),i0.updateMatrix(),this.heads.setMatrixAt(J,i0.matrix)}done(){this.bodies.instanceMatrix.needsUpdate=this.heads.instanceMatrix.needsUpdate=!0}}class NH{renderer;scene=new $8;camera=new Q7(40,1.7777777777777777,0.1,600);composer;bloom;fog=new r8(z5,0.011);sky;curveWorld=new E0;path=new w5;tube;glow;tip;beam;arc=[];floor;wall;markers=[];years=[];linear;linearTag;expoTag;flatLine;flatTag;stableTag;aiTag;crowd=new E0;crowdPeople;people=[];notYet=[];ceiling=new E0;panes;rims;shards=[];rings=[];moon;meetings;dust;dustSeed=[];road=new E0;dashes;poles;streaks;prius=new E0;tesla=new E0;engine=new E0;stages=[];core;exhaust;slabs=new E0;slab=[];approved;comet=new E0;cometHead=new E0;tail;phoneLid;agents=new E0;agentCubes;agentEdges;room=new E0;table;roomPeople;screen;boards={};fab=new E0;wafer;laser;machines;sun=new E0;sunBall;sunHalo;swarm;swarmDirs=[];protein=new E0;beads;coil=[];helix=[];globe;constructor(J){this.renderer=new _8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.scene.background=z5.clone(),this.scene.fog=this.fog,this.composer=new $J(this.renderer),this.composer.addPass(new ZJ(this.scene,this.camera)),this.bloom=new B8(new G0(1920,1080),1.1,0.6,0.12),this.composer.addPass(this.bloom),this.composer.addPass(new QJ),this.scene.add(this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein),this.scene.add(new K8(10475775,1050640,1.2));let $=new t7(16777215,1.6);$.position.set(5,10,8),this.scene.add($),this.buildSky(),this.buildCurve(),this.buildCrowd(),this.buildCeiling(),this.buildChorus(),this.buildDust(),this.buildRoad(),this.buildEngine(),this.buildSlabs(),this.buildComet(),this.buildAgents(),this.buildRoom(),this.buildFab(),this.buildSun(),this.buildProtein()}buildSky(){this.sky=new h(new l0(450,32,16),new h9({side:E7,depthWrite:!1,fog:!1,uniforms:{top:{value:new F0},horizon:{value:new F0},bottom:{value:new F0},pulse:{value:0}},vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 top, horizon, bottom; uniform float pulse; varying vec3 vDir;
        void main() {
          float y = vDir.y;
          vec3 c = y > 0.0 ? mix(horizon, top, pow(smoothstep(0.0, 0.75, y), 0.7)) : mix(horizon, bottom, smoothstep(0.0, 0.35, -y));
          c += horizon * pulse * exp(-abs(y) * 9.0) * 0.6; // the horizon band breathes with the bass
          gl_FragColor = vec4(c, 1.0);
        }`})),this.sky.renderOrder=-1,this.scene.add(this.sky)}buildCurve(){let J=this.path,$=1400,Q=10,Z=new R8(J,1400,0.14,10,!1),K=Z.attributes.position,U=new Float32Array(K.count*3),H=new F0;for(let _=0;_<K.count;_++){let B=j9(Math.log2(Math.max(K.getY(_),0.04)/0.3)/8);H.copy(z7).lerp(HJ,N9(0.15,0.7,B)).lerp(new F0(16777215),N9(0.75,1,B)*0.7),U.set([H.r,H.g,H.b],_*3)}Z.setAttribute("color",new e9(U,3)),this.tube=new h(Z,new g0({vertexColors:!0}));let W=new R8(J,1400,0.55,8,!1);this.glow=new h(W,new g0({color:HJ,transparent:!0,opacity:0.16,blending:W7,depthWrite:!1})),this.tip=new h(new l0(0.42,24,16),new g0({color:16777215})),this.beam=new h(new j0(0.6,0.6,1,12).translate(0,0.5,0),new g0({color:16765146})),this.curveWorld.add(this.tube,this.glow,this.tip,this.beam);let Y=0,N=L7(),X=L7(),q=[0];for(let _=1;_<=2000;_++)J.getPoint((_-1)/2000,N),J.getPoint(_/2000,X),Y+=N.distanceTo(X),q.push(Y);this.arc=q.map((_)=>_/Y);let G=[];for(let _=m7-30;_<=y9+30;_+=J6/4)G.push(_,0,-40,_,0,30);for(let _=-40;_<=30;_+=2)G.push(m7-30,0,_,y9+30,0,_);let F=new O9;F.setAttribute("position",new Q9(G,3)),this.floor=new O8(F,QQ(z7,0.12));let O=[];for(let _=0;_<=8;_++){let B=0.3*2**_;O.push(m7-30,B,-3,y9+30,B,-3)}for(let _=f7;_<=y9+20;_+=J6)O.push(_,0,-3,_,eJ+20,-3);let V=new O9;V.setAttribute("position",new Q9(O,3)),this.wall=new O8(V,QQ(z7,0.1)),this.curveWorld.add(this.floor,this.wall);for(let _=1;_<=8;_++){let B=f7+J6*_,A=new h(new l0(0.28,16,12),new g0({color:tJ}));A.position.set(B,o6(B),0),this.markers.push({x:B,dot:A}),this.curveWorld.add(A)}for(let _=0;_<=10;_++){let B=j(f7,y9,_/10),A=WJ(String(2026+_),_===10?"#ff2d55":"#58d6ff",1.4,"700 %spx 'JetBrains Mono', monospace");A.position.set(B-1.6,o6(B)+1.6,1),this.years.push({x:B,tag:A}),this.curveWorld.add(A)}let D=f7+2*J6,E=o6(D),C=E*Math.LN2/J6,L=new x6(L7(m7,E+C*(m7-D),0),L7(y9+6,E+C*(y9+6-D),0));this.linear=new h(new R8(L,200,0.1,8,!1),new g0({color:9081766,transparent:!0})),this.linearTag=WJ("LINEAR BRAIN","#8a93a6",2.6),this.linearTag.position.set(y9-2,E+C*(y9-2-D)+2.4,1),this.expoTag=WJ("EXPONENTIAL PLANE","#ff2d55",3.4),this.expoTag.position.set(C8(42)-15,42,1);let R=new x6(L7(m7,0.6,1.5),L7(y9+14,0.6,1.5));this.flatLine=new h(new R8(R,200,0.12,8,!1),new g0({color:9081766})),this.flatTag=WJ("OUR ROLLOUT","#8a93a6",2.2),this.flatTag.position.set(y9+4,2.2,1.5),this.stableTag=WJ("STABLE! ♥","#3ccf6e",3),this.stableTag.position.set(y9+4,5.4,1.5),this.aiTag=WJ("THE A-I CURVE","#ff2d55",3),this.aiTag.position.set(C8(36)-9,36,1),this.curveWorld.add(this.linear,this.linearTag,this.expoTag,this.flatLine,this.flatTag,this.stableTag,this.aiTag)}buildCrowd(){this.crowdPeople=new WH(90,8160921,this.crowd);for(let $=0;$<90;$++)this.people.push({x:m7-8+L0($)*22,z:-1+L0($+50)*10,h:0.85+L0($+99)*0.3,ph:L0($+7)*6.28});for(let $=0;$<7;$++){let Q=this.people[$*11],Z=WJ($%2?"NOT YET":"NO","#ffc94d",1.1);Z.position.set(Q.x,2.2*Q.h+3.2+L0($+31)*2,Q.z),this.notYet.push(Z),this.crowd.add(Z)}this.curveWorld.add(this.crowd)}buildCeiling(){let $=[];for(let U=0;U<26;U++)for(let H=0;H<34;H++)$.push(L7(C8(b8)-34+H*1.1*1.75+U%2*1.1*0.875,b8,-16+U*1.1*1.52));let Q=new C7(1.056,6).rotateX(-Math.PI/2),Z=new mJ(0.9900000000000001,1.078,6).rotateX(-Math.PI/2);this.panes=new w9(Q,new g0({color:z7,transparent:!0,opacity:0.1,side:m9,depthWrite:!1,blending:W7}),$.length),this.rims=new w9(Z,new g0({color:z7,transparent:!0,opacity:0.55,side:m9,depthWrite:!1}),$.length);let K=L7(C8(b8),b8,0);$.forEach((U,H)=>{let W=U.clone().sub(K).setY(0),Y=W.length();W.normalize().multiplyScalar(4+L0(H)*10+30/(Y+2)),W.y=6+L0(H+3)*16+40/(Y+2),this.shards.push({p:U,v:W,axis:L7(L0(H+5)-0.5,L0(H+6)-0.5,L0(H+7)-0.5).normalize(),spin:3+L0(H+8)*8,delay:Y*0.018})}),this.ceiling.add(this.panes,this.rims),this.curveWorld.add(this.ceiling)}buildChorus(){for(let J=0;J<12;J++){let $=new h(new M7(1,0.05,8,64),new g0({color:HJ,transparent:!0,depthWrite:!1,blending:W7}));this.rings.push($),this.curveWorld.add($)}this.moon=new h(new l0(9,32,24),new g0({color:13624063,fog:!1,transparent:!0})),this.moon.position.set(-40,70,-160),this.curveWorld.add(this.moon),this.meetings=new w9(new _0(1.5,0.12,2.2),new g0({color:5078271,transparent:!0,opacity:0.85}),512);for(let J=0;J<512;J++)i0.position.set(f7-4+L0(J+900)*52,1+L0(J+1900)*70,-2.4),i0.rotation.set(Math.PI/2,0,0),i0.scale.setScalar(1),i0.updateMatrix(),this.meetings.setMatrixAt(J,i0.matrix);this.curveWorld.add(this.meetings)}buildDust(){let $=new Float32Array(4800);for(let Z=0;Z<1600;Z++)this.dustSeed.push(L0(Z*3),L0(Z*3+1),L0(Z*3+2));let Q=new O9;Q.setAttribute("position",new e9($,3)),this.dust=new g7(Q,new y7({color:9427199,size:0.12,transparent:!0,opacity:0.6,depthWrite:!1,blending:W7})),this.scene.add(this.dust)}buildRoad(){let J=new h(new G9(16,600).rotateX(-Math.PI/2),new W9({color:724244,roughness:0.6,metalness:0.3}));J.position.z=-250,this.road.add(J),this.dashes=new w9(new _0(0.16,0.02,2.6),new g0({color:14674165}),100);for(let Q of[-5.4,5.4]){let Z=new h(new _0(0.14,0.02,600),new g0({color:z7}));Z.position.set(Q,0.01,-250),this.road.add(Z)}this.poles=new w9(new _0(0.12,0.12,0.8),new g0({color:tJ}),48),this.streaks=new w9(new _0(0.03,0.03,9),new g0({color:13627391,transparent:!0,blending:W7,depthWrite:!1}),120),this.road.add(this.dashes,this.poles,this.streaks);let $=(Q,Z,K)=>{let U=new E0,H=new W9({color:Q,roughness:K?0.25:0.7,metalness:K?0.8:0.2}),W=new _0(1.9,0.55,K?4.7:4.2),Y=new _0(1.55,0.5,K?2.6:2);for(let[X,q,G]of[[W,0.5,0],[Y,1.02,K?0.1:0.35]]){let F=new h(X,H);F.position.set(0,q,G);let O=$Q(X,Z,K?0.95:0.8);O.position.copy(F.position),U.add(F,O)}let N=new h(new _0(K?1.8:0.4,0.09,0.05),new g0({color:K?HJ:new F0(8002088)}));if(N.position.set(0,0.66,(K?4.7:4.2)/2+0.01),U.add(N),!K){let X=N.clone();N.position.x=-0.65,X.position.x=0.65,U.add(X)}for(let X of[-0.85,0.85]){let q=new h(new j0(0.34,0.34,0.24,18).rotateZ(Math.PI/2),new W9({color:328967}));for(let G of[-1.3,1.3]){let F=q.clone();F.position.set(X,0.34,G),U.add(F)}}return U};this.prius=$(7109260,z7,!1),this.tesla=$(855828,new F0(16777215),!0),this.road.add(this.prius,this.tesla)}buildEngine(){let J=new O8(new f$(new j0(3.1,2.6,7,36,5,!0).rotateX(Math.PI/2)),QQ(z7,0.28));J.position.z=-2.5,this.engine.add(J);let $=(H,W,Y,N,X,q,G)=>{let F=new E0,O=new _0(0.07,N,0.55).translate(0,Y-N/2,0),V=new w9(O,new W9({color:X,roughness:0.35,metalness:0.85,emissive:X,emissiveIntensity:0.15}),W);for(let D=0;D<W;D++)i0.rotation.set(0,0,D/W*Math.PI*2),i0.rotateY(G),i0.position.set(0,0,0),i0.scale.setScalar(1),i0.updateMatrix(),V.setMatrixAt(D,i0.matrix);F.add(V),F.position.z=H,this.engine.add(F),this.stages.push({g:F,speed:q})};$(0.6,24,2.85,2.2,new F0(12109526),1,0.55),$(-1,40,2.1,1.3,new F0(7324648),-1.6,-0.4),$(-1.9,44,1.85,1.1,new F0(15235695),2.1,0.4),$(-2.7,48,1.6,0.9,new F0(16731486),-2.6,-0.4);let Q=new h(new Z7(0.75,1.5,32).rotateX(Math.PI/2),new W9({color:14673646,metalness:0.9,roughness:0.2}));Q.position.z=1.4,this.core=new h(new l0(1.3,24,16),new g0({color:HJ,transparent:!0,blending:W7,depthWrite:!1})),this.core.position.z=-5.5;let Z=900,K=new Float32Array(Z*3),U=new O9;U.setAttribute("position",new e9(K,3)),this.exhaust=new g7(U,new y7({color:16747100,size:0.18,transparent:!0,depthWrite:!1,blending:W7})),this.engine.add(Q,this.core,this.exhaust)}buildSlabs(){let J=0;for(let Q=0;Q<12;Q++){let Z=0.7*1.42**Q,K=1.4+Q*0.12,U=new _0(K,Z,K).translate(0,Z/2,0),H=new h(U,new W9({color:1317414,roughness:0.4,metalness:0.6,transparent:!0})),W=$Q(U,z7,0.9),Y=WJ(`v${Q+1}`,"#58d6ff",1.2+Q*0.12,"700 %spx 'JetBrains Mono', monospace");Y.position.set(0,Z+1.2,0);let N=new E0;N.add(H,W,Y),N.position.x=J,this.slabs.add(N),this.slab.push({g:N,mesh:H,edge:W,tag:Y,x:J,h:Z}),J+=K+1.6}this.approved=WJ("APPROVED","#3ccf6e",1.6),this.slabs.add(this.approved);let $=new AJ(200,100,1784402,924971);$.position.x=40,this.slabs.add($)}buildComet(){let J=new h(new v$(1.1,2),new g0({color:16777215})),$=new h(new l0(2.2,24,16),new g0({color:z7,transparent:!0,opacity:0.25,blending:W7,depthWrite:!1})),Q=new E0,Z=new h(new _0(0.7,0.08,1.2),new W9({color:3817290,metalness:0.6}));Z.position.z=0.6,this.phoneLid=new E0;let K=new h(new _0(0.7,0.08,1.2),new W9({color:3817290,metalness:0.6}));K.position.z=-0.6;let U=new h(new G9(0.5,0.8),new g0({color:8257456}));U.rotation.x=-Math.PI/2,U.position.set(0,0.05,-0.6),this.phoneLid.add(K,U),Q.add(Z,this.phoneLid),Q.scale.setScalar(2.4),Q.position.set(0,1.9,1.4),Q.rotation.set(0.3,0,0.2);let H=new h(new M7(1.16,0.06,6,40),new g0({color:tJ}));H.rotation.y=Math.PI/2,this.cometHead.add(J,$,Q,H);let W=1400,Y=new Float32Array(W*3),N=new O9;N.setAttribute("position",new e9(Y,3)),this.tail=new g7(N,new y7({color:11069183,size:0.22,transparent:!0,depthWrite:!1,blending:W7})),this.comet.add(this.cometHead,this.tail)}buildAgents(){let J=new _0(1,1,1);this.agentCubes=new w9(J,new g0({color:16777215}),40),this.agentEdges=new w9(new _0(1.12,1.12,1.12),new g0({color:z7,wireframe:!0,transparent:!0,opacity:0.6}),40);let $=new h(new _0(3,2,0.2),new g0({color:858642})),Q=$Q(new _0(3,2,0.2),jZ);$.position.set(0,1.2,0),Q.position.copy($.position);let Z=new AJ(80,40,1784402,924971);this.agents.add(this.agentCubes,this.agentEdges,$,Q,Z)}buildRoom(){this.table=new E0;let J=new h(new _0(9,0.15,3),new W9({color:1711398,roughness:0.3,metalness:0.5}));J.position.y=0.95;let $=$Q(new _0(9,0.15,3),z7,0.5);$.position.copy(J.position),this.table.add(J,$),this.roomPeople=new WH(12,8160921,this.room),this.screen=new h(new G9(9,5.1),new g0({color:16777215}));let Q=(K,U,H)=>{let W=document.createElement("canvas");W.width=1024,W.height=580;let Y=W.getContext("2d");Y.fillStyle="#0b1020",Y.fillRect(0,0,1024,580),Y.fillStyle=U,Y.fillRect(0,0,1024,96),Y.font="400 64px Anton, Impact, sans-serif",Y.fillStyle="#05060b",Y.fillText(K.toUpperCase(),40,74),Y.font="700 46px 'JetBrains Mono', monospace",H.forEach((X,q)=>{Y.fillStyle=X.startsWith("!")?U:"#e8ecf5",Y.fillText(X.replace(/^!/,""),48,180+q*84)});let N=new O7(W);return N.colorSpace=R7,N};this.boards={standup:Q("Daily standup","#58d6ff",["Yesterday: tickets","Today: tickets","Blockers: none","!AOB: the singularity?"]),cab:Q("Change Advisory Board","#ff2d55",["Agenda","1. Review: end of man","2. Rollback plan?","!Status: CHANGE REQUEST"]),vp:Q("Q3 AI update","#3ccf6e",["You're crushing it! \uD83D\uDE80","Adoption: 3 seats","Next: a committee","!BONUS ACHIEVED"]),premeeting:Q("Pre-meeting","#9b6bff",["Plan the meeting","about how far ahead","we are","!Accept · Decline · Tentative"]),tentative:Q("Pre-meeting","#9b6bff",["Plan the meeting","Your reply:","!✓ Tentative"]),moved:Q("Pre-meeting","#ffc94d",["!Moved to Thursday","Attendees: 0","The curve: not invited"])},this.screen.position.set(-6.4,3.2,0),this.screen.rotation.y=Math.PI/2;let Z=new AJ(60,30,2761266,1446428);this.room.add(this.table,this.screen,Z)}buildFab(){let J=document.createElement("canvas");J.width=J.height=512;let $=J.getContext("2d"),Q=$.createRadialGradient(256,256,20,256,256,256);Q.addColorStop(0,"#5b4a8a"),Q.addColorStop(0.6,"#2b6f8a"),Q.addColorStop(1,"#7a3f6a"),$.fillStyle=Q,$.fillRect(0,0,512,512),$.strokeStyle="rgba(255,255,255,.35)";for(let H=0;H<=512;H+=32)$.beginPath(),$.moveTo(H,0),$.lineTo(H,512),$.moveTo(0,H),$.lineTo(512,H),$.stroke();let Z=new O7(J);Z.colorSpace=R7,this.wafer=new h(new C7(4,64).rotateX(-Math.PI/2),new g0({map:Z})),this.wafer.position.y=0.2,this.laser=new h(new j0(0.08,0.08,14,12).translate(0,7,0),new g0({color:HH,transparent:!0,blending:W7,depthWrite:!1}));let K=$Q(new _0(12,9,9).translate(0,4.5,0),HH,0.4);this.machines=new w9(new _0(2.4,2.4,2.4),new g0({color:16777215}),70);for(let H=0;H<70;H++)i0.position.set(-30+H%14*4.4,1.2,-14-Math.floor(H/14)*4.4),i0.rotation.set(0,0,0),i0.scale.setScalar(1),i0.updateMatrix(),this.machines.setMatrixAt(H,i0.matrix);let U=new AJ(120,60,2760516,1380130);this.fab.add(this.wafer,this.laser,K,this.machines,U)}buildSun(){this.sunBall=new h(new l0(6,48,32),new g0({color:16765562,fog:!1}));let J=document.createElement("canvas");J.width=J.height=256;let $=J.getContext("2d"),Q=$.createRadialGradient(128,128,30,128,128,128);Q.addColorStop(0,"rgba(255,200,90,1)"),Q.addColorStop(1,"rgba(255,120,40,0)"),$.fillStyle=Q,$.fillRect(0,0,256,256),this.sunHalo=new T$(new v6({map:new O7(J),transparent:!0,depthWrite:!1,blending:W7,fog:!1})),this.sunHalo.scale.set(34,34,1);let Z=700;this.swarm=new w9(new C7(0.7,6),new W9({color:658450,metalness:0.9,roughness:0.3,side:m9,emissive:1714746}),Z);for(let K=0;K<Z;K++){let U=1-2*(K+0.5)/Z,H=Math.sqrt(1-U*U),W=K*2.39996;this.swarmDirs.push(L7(Math.cos(W)*H,U,Math.sin(W)*H))}this.sun.add(this.sunHalo,this.sunBall,this.swarm)}buildProtein(){this.beads=new w9(new l0(0.32,12,8),new g0({color:16777215}),160);let $=new F0,Q=L7(-12,0,0);for(let K=0;K<160;K++){this.beads.setColorAt(K,$.setHSL(0.55+K/160*0.45,0.8,0.32)),Q=Q.clone().add(L7(0.15+L0(K)*0.1,(L0(K+1)-0.5)*0.5,(L0(K+2)-0.5)*0.5)),this.coil.push(Q);let U=K*0.62;this.helix.push(L7(Math.cos(U)*2.6,-6+K*0.075,Math.sin(U)*2.6))}this.globe=new O8(new f$(new l0(4.5,24,16)),QQ(jZ,0.35)),this.globe.position.set(9,1,-4);let Z=new AJ(80,40,1784402,924971);Z.position.y=-7,this.protein.add(this.beads,this.globe,Z)}drawX(J,$){let Q=j(m7,C8(12),Y9(W0(J,0.4,w(0)-0.2))*0.85+W0(J,0.4,w(0)-0.2)*0.15);if($==="intro")return Q;if($==="years")return j(C8(12),y9,p8(W0(J,w(2),w(3)-0.3)));if($==="ceiling")return J<x8()?C8(b8)-0.05:j(C8(b8),y9,Y9(W0(J,x8(),x8()+0.9)));return y9}setDraw(J){let $=j9(Math.round((J-m7)/(y9-m7)*2000),0,2000),Q=this.arc[$]??1;for(let Z of[this.tube,this.glow]){let K=Z.geometry.parameters.tubularSegments,U=Z.geometry.parameters.radialSegments;Z.geometry.setDrawRange(0,Math.floor(Q*K)*U*6)}this.tip.position.set(J,o6(J),0)}flash(J){let $=0;for(let Z of(YH??=ZQ()).slice(1)){if(Z.name==="terrified"||Z.name==="end")continue;let K=Z.name==="bridge"||Z.name==="outro"?0:Z.name==="ride"?0.6:0.35;if(J>=Z.at)$=Math.max($,Math.exp(-(J-Z.at)*8)*K)}if(J>=x8())$=Math.max($,Math.exp(-(J-x8())*6)*0.8);let Q=vZ(J);if(Q.name==="triple"){for(let Z of[K0(51,/^thrilled/i),K0(51,/^tentative/i)])if(J>=Z)$=Math.max($,Math.exp(-(J-Z)*9)*0.4)}if(Q.name==="montage"){let Z=n7()*4;$=Math.max($,Math.exp(-((J-Q.at)%Z)*9)*0.45)}return $}fade(J){return N9(K9(53)+0.6,K9(53)+2.2,J)}update(J){let $=vZ(J),Q=$.at,Z=J-Q;for(let O of[this.curveWorld,this.road,this.engine,this.slabs,this.comet,this.agents,this.room,this.fab,this.sun,this.protein])O.visible=!1;let K=wH(J),U=s7(J),H=["bridge","premeeting","moved","outro","end"].includes($.name)||!!$.ride?.hushed;this.bloom.strength=(H?0.7:0.85)+K*(H?0.3:0.55)+($.name==="ceiling"?this.flash(J)*0.6:0);let[W,Y,N]=(L5[$.name==="ride"||$.name==="terrified"?$.ride?.hushed?"hushed":$.name:$.name]??L5.intro).map((O)=>new F0(O));this.sky.material.uniforms.top.value.copy(W),this.sky.material.uniforms.horizon.value.copy(Y),this.sky.material.uniforms.bottom.value.copy(N),this.sky.material.uniforms.pulse.value=K,this.scene.background.copy(N),this.fog.color.copy(Y).lerp(N,0.55),this.fog.density=0.011;let X=this.camera,q=L7();X.fov=40;let G=this.dust.geometry.attributes.position;for(let O=0;O<G.count;O++){let[V,D,E]=[this.dustSeed[O*3],this.dustSeed[O*3+1],this.dustSeed[O*3+2]];G.setXYZ(O,-70+V*110,(D*90+J*(0.4+E))%90,-50+E*70)}switch(G.needsUpdate=!0,this.dust.material.opacity=0.35+K*0.4,$.name){case"intro":case"years":case"linear":case"waiting":case"ceiling":case"flat":case"ride":case"terrified":case"bridge":case"outro":case"end":this.curveShot(J,$,q,K,U);break;case"prius":case"tesla":this.roadShot(J,$,q,K);break;case"engine":this.engineShot(J,Q,q,K);break;case"releases":case"eol":case"procure":this.slabShot(J,$,q,U);break;case"comet":this.cometShot(J,Z,q);break;case"agents":case"kernel":this.agentShot(J,$,q,U);break;case"standup":case"cab":case"vp":case"premeeting":case"moved":this.roomShot(J,$,q,U);break;case"triple":if(J<K0(51,/^thrilled/i)-0.05)this.curveShot(J,{...$,name:"terrified"},q,K,U);else if(J<K0(51,/^tentative/i)-0.05)this.engineShot(J,K0(51,/^thrilled/i)-2.5,q,K);else this.roomShot(J,$,q,U);break;case"montage":{let O=n7()*4,V=Math.floor((J-Q)/O),D=Q+V*O,E=["engine","comet","agents","fab","sun","releases"][V%6];if(E==="engine")this.engineShot(J,D-2,q,K);else if(E==="comet")this.cometShot(J,J-D,q);else if(E==="agents")this.agentShot(J,{...$,name:"agents",at:D},q,U);else if(E==="fab")this.fabShot(J,J-D,q,K);else if(E==="sun")this.sunShot(J,q,K);else this.slabShot(J,{...$,name:"releases",at:D-3},q,U);break}case"fab":this.fabShot(J,Z,q,K);break;case"sun":this.sunShot(J,q,K);break;case"protein":this.proteinShot(J,q);break}let F=H?0.03:0.12;X.position.x+=(L0(Math.floor(J*30))-0.5)*U*F,X.position.y+=(L0(Math.floor(J*30)+1)-0.5)*U*F,X.updateProjectionMatrix(),X.lookAt(q),this.sky.position.copy(X.position)}curveShot(J,$,Q,Z,K){let U=this.camera,H=$.at,W=$.name;this.curveWorld.visible=!0;let Y=this.drawX(J,W);this.setDraw(Y),this.tip.scale.setScalar(1+K*0.6),this.tip.visible=Y<y9-0.1||W==="outro"||W==="end",this.beam.visible=!1;let N=!!$.ride?.hushed||W==="bridge"||W==="outro"||W==="end";this.tube.material.color.set(N?10275071:16777215),this.glow.material.color.copy(N?z7:HJ),this.floor.material.opacity=0.08+K*0.1+Z*0.06,this.wall.material.opacity=(W==="intro"?N9(0.5,4,J):1)*(0.07+K*0.06);for(let F of this.markers){let O=b9(W0(Y,F.x,F.x+1.2));F.dot.scale.setScalar(Math.max(0.001,O*(1+K*0.4)))}this.years.forEach((F,O)=>{F.tag.visible=W==="years",i6(F.tag,b9(W0(J,w(2)+O*0.18,w(2)+O*0.18+0.3))*(O===10?1.6:1))});let X=W==="linear";if(this.linear.visible=this.linearTag.visible=this.expoTag.visible=X,X){let F=this.linear.geometry.parameters.tubularSegments*8*6;this.linear.geometry.setDrawRange(0,Math.floor(Y9(W0(J,H,K0(3,/^brain/i)+0.3))*F)),this.linearTag.material.opacity=N9(K0(3,/^brain/i),K0(3,/^brain/i)+0.3,J),this.expoTag.material.opacity=N9(K0(3,/^expo/i),K0(3,/^expo/i)+0.3,J)}let q=W==="flat";if(this.flatLine.visible=this.flatTag.visible=this.stableTag.visible=this.aiTag.visible=q,q){i6(this.aiTag,b9(W0(J,K0(25,/^curve/i),K0(25,/^curve/i)+0.3))),i6(this.flatTag,b9(W0(J,K0(25,/^flat/i),K0(25,/^flat/i)+0.3))),i6(this.stableTag,b9(W0(J,K0(26,/^stable/i),K0(26,/^stable/i)+0.3))*(1+K*0.15));let F=this.flatLine.geometry.parameters.tubularSegments*8*6;this.flatLine.geometry.setDrawRange(0,Math.floor(Y9(W0(J,K0(25,/^our/i)-0.2,K0(25,/^flat/i)+0.3))*F))}if(this.crowd.visible=W==="waiting",this.crowd.visible)this.people.forEach((F,O)=>this.crowdPeople.set(O,F.x,F.z,F.h,Math.sin(J*1.3+F.ph)*0.05)),this.crowdPeople.done(),this.notYet.forEach((F,O)=>{let V=(O%2?K0(6,/^not/i):K0(6,/^no\W*$/i))+O*0.07;i6(F,b9(W0(J,V,V+0.25)))});if(this.ceiling.visible=W==="ceiling",this.ceiling.visible){let F=x8(),O=J<F?N9(H,F,J)*0.04:0;this.shards.forEach((V,D)=>{let E=Math.max(0,J-F-V.delay);i0.position.copy(V.p).addScaledVector(V.v,E),i0.position.y-=9*E*E,i0.position.y+=Math.sin(J*40+D)*O,i0.quaternion.setFromAxisAngle(V.axis,E*V.spin),i0.scale.setScalar(1),i0.updateMatrix(),this.panes.setMatrixAt(D,i0.matrix),this.rims.setMatrixAt(D,i0.matrix)}),this.panes.instanceMatrix.needsUpdate=this.rims.instanceMatrix.needsUpdate=!0,this.rims.material.opacity=0.35+K*0.3+(J>=F?0.2:0),this.rims.material.color.copy(z7).lerp(new F0(16777215),J>=F?0.6:0)}let G=$.ride;for(let F of this.rings)F.visible=!1;if(this.moon.visible=!1,this.meetings.visible=!1,G){let F=n7(),O=H6(J);this.rings.forEach((V,D)=>{let E=D*F+((J-O*F)%F+F)%F;if(E>3||O-D<0)return;let C=this.rideU(J-E,G.a,G.b);V.visible=!0,V.position.copy(this.path.getPointAt(C)),V.quaternion.setFromUnitVectors(L7(0,0,1),this.path.getTangentAt(C)),V.scale.setScalar(0.6+E*7),V.material.opacity=Math.exp(-E*1.6)*0.9,V.material.color.copy(G.hushed?z7:D%2?HJ:tJ)})}if(W==="intro"){let F=Y9(W0(J,0,w(0)));U.position.set(j(m7+2,f7+8,F),j(0.9,7.5,F),j(7,34,F)),Q.set(j(m7+8,f7+12,F),j(0.4,6,F),0)}else if(W==="years"){let F=o6(this.drawX(J,"years"));Q.set(j(f7+14,y9-6,W0(J,H,w(3))),Math.min(F,60)*0.55+2,0),U.position.set(Q.x-10,Q.y*0.5+2,30+Math.min(F,60)*0.55)}else if(W==="linear"){let F=Y9(W0(J,H,w(4)));U.position.set(-10,15,j(84,74,F)),Q.set(-8,13,0)}else if(W==="waiting"){let F=W0(J,H,w(7));U.position.set(m7-12+F*3,3.2,16-F*3),Q.set(f7+4,6+F*3,0)}else if(W==="ceiling"){let F=x8(),O=Y9(W0(J,F,F+1.6));U.position.set(C8(b8)-16,j(20,26,O),j(34,46,O)),Q.set(C8(b8)+j(0,2,O),j(b8-3,b8+22,O),0)}else if(W==="flat"){let F=Y9(W0(J,H,w(27)));U.position.set(j(y9-30,y9-18,F),22,j(78,70,F)),Q.set(y9-10,24,0)}else if(W==="ride"&&G){let F=w(G.first),O=G.first+2;if(this.fog.density=0.011+0.07*P5(J,w(O),w(O+1)-0.1,0.4,0.3),this.moon.visible=!0,this.moon.material.opacity=P5(J,w(G.first+1)-0.3,w(O)-0.2,0.5,0.5),this.meetings.visible=G.hushed,G.hushed)this.meetings.count=Math.min(512,2**Math.max(0,Math.floor((J-F)/(n7()*2))));let V=this.rideU(J,G.a,G.b),D=this.path.getPointAt(V),E=this.path.getPointAt(Math.min(1,V+0.04)),C=J<w(G.first+1)-0.2?0:J<w(O)-0.2?1:J<w(O+1)-0.2?2:3;if(C===1){let L=W0(J,w(G.first+1)-0.2,w(O)-0.2);U.position.set(j(f7-10,f7-4,L),2.5,j(58,48,L)),Q.set(f7+18,j(18,24,L),0),U.fov=50}else if(C===3){let L=W0(J,w(O+1)-0.2,G.b),R=j(-0.5,0.6,L);U.position.set(y9-9+Math.sin(R)*6,1.2,Math.cos(R)*8),Q.set(y9-1,j(30,70,Y9(L)),0),U.fov=72}else{let L=N9(0.35,0.8,V);U.position.set(D.x-j(2.5,9,L),D.y+j(1.4,-3,L),(G.hushed?7:4.5)+L*12),Q.copy(E).setZ(0),U.fov=G.hushed?46:58}}else if(W==="terrified"&&G){let F=W0(J,H,kD($)),O=j(-0.9,1.4,Y9(F)),V=G.hushed?48:j(26,40,F);U.position.set(y9+Math.sin(O)*V,j(78,46,F),Math.cos(O)*V),Q.set(y9-3,j(70,40,F),0),U.fov=48,this.fog.density=0.004}else if(W==="bridge"){let F=W0(J,H,w(47));U.position.set(j(y9-60,y9-40,F),j(20,30,F),j(110,80,F)),Q.set(y9-10,35,0),this.fog.density=0.005}else{let F=w(53)+0.6,O=p8(W0(J,F,K9(53)+1.8)),V=j(eJ,eJ+600,O);this.tip.position.set(y9,V,0),this.beam.visible=V>eJ+0.5,this.beam.position.set(y9,eJ,0),this.beam.scale.set(1,V-eJ,1),U.position.set(y9-50,18,95),Q.set(y9-12,j(36,80,Y9(W0(J,F,K9(53)+2.2))),0),this.fog.density=0.004}}rideU(J,$,Q){let Z=W0(J,$,Q);return j(0.05,0.985,Z*Z*0.35+Y9(Z)*0.65)}roadShot(J,$,Q,Z){let K=this.camera,U=$.at,H=J-U;this.road.visible=!0;let W=$.name==="tesla";this.prius.visible=!W,this.tesla.visible=W;let Y=W?46:15,N=H*Y%6;for(let q=0;q<2;q++)for(let G=0;G<50;G++)i0.position.set(q?1.8:-1.8,0.01,12-G*6+N),i0.rotation.set(0,0,0),i0.scale.setScalar(1),i0.updateMatrix(),this.dashes.setMatrixAt(q*50+G,i0.matrix);let X=H*Y%16;for(let q=0;q<2;q++)for(let G=0;G<24;G++)i0.position.set(q?7.5:-7.5,3.2,12-G*16+X),i0.updateMatrix(),this.poles.setMatrixAt(q*24+G,i0.matrix);for(let q=0;q<120;q++){let G=15-(H*90+L0(q)*260)%260;i0.position.set((L0(q+1)-0.5)*30,0.4+L0(q+2)*7,G),i0.updateMatrix(),this.streaks.setMatrixAt(q,i0.matrix)}if(this.dashes.instanceMatrix.needsUpdate=this.poles.instanceMatrix.needsUpdate=this.streaks.instanceMatrix.needsUpdate=!0,this.streaks.material.opacity=W?0.25+Z*0.5:0,W){this.tesla.position.set(0,0,0),this.tesla.rotation.set(0,0,0);let q=Y9(W0(J,U,w(2))),G=j(1.15,0.12,q);K.position.set(Math.sin(G)*11,j(1.2,2.8,q),Math.cos(G)*11-1.2),Q.set(0,0.7,-2.5)}else{let q=1.15*Math.sin(H*2.2)+0.45*Math.sin(H*5.1+1),G=2.53*Math.cos(H*2.2)+2.295*Math.cos(H*5.1+1);this.prius.position.set(q,0,0),this.prius.rotation.set(0,-G*0.06,G*0.01),K.position.set(q*0.35+1.2,2.8,8.5),Q.set(q*0.5,0.6,-8)}}engineShot(J,$,Q,Z){let K=this.camera,U=J-$;this.engine.visible=!0;let H=U*(5+U*2.2);for(let X of this.stages)X.g.rotation.z=H*X.speed;this.core.scale.setScalar(0.8+Z*0.8),this.core.material.opacity=0.5+Z*0.5;let W=this.exhaust.geometry.attributes.position;for(let X=0;X<W.count;X++){let q=(U*(0.8+L0(X)*0.6)+L0(X+1))%1,G=(0.3+q*2.2)*Math.sqrt(L0(X+2)),F=L0(X+3)*6.283+U*3;W.setXYZ(X,Math.cos(F)*G,Math.sin(F)*G,-5-q*28)}W.needsUpdate=!0,this.exhaust.material.opacity=0.4+Z*0.6;let Y=Y9(W0(J,$,w(6))),N=j(0.65,2.2,Y);K.position.set(Math.sin(N)*13,j(2.5,4,Y),Math.cos(N)*13),Q.set(0,0,j(0,-4,Y))}slabShot(J,$,Q,Z){let K=this.camera,U=$.at;this.slabs.visible=!0,this.approved.visible=$.name==="procure";let H=new F0(3817552);this.slab.forEach((X,q)=>{let G=1,F=z7,O=0,V=0.9;if($.name==="releases"){let D=U+0.15+q*((K9(8)-U)/12);G=b9(W0(J,D,D+0.25)),F=q===Math.floor((J-U-0.15)/((K9(8)-U)/12))?HJ:z7}else if($.name==="eol"){let D=K0(12,/^live/i);if(G=q<11?1:b9(W0(J,D-0.2,D+0.15)),F=q===11?J>=D?HJ:z7:q===10?tJ:H,q===10)F=J>=K0(13,/^end/i)?H:tJ;let E=K0(13,/^end/i)+(10-q)*0.06;O=q<11?p8(W0(J,E,E+0.7)):0,V=q<11?0.5:1}else G=1,F=q===3?J>=K0(28,/^four/i)?jZ:H:q===8?J>=K0(28,/^nine/i)?tJ:H:H,V=q===8&&J>=K0(28,/^nine/i)?1:0.6;X.g.scale.set(1,Math.max(0.001,G),1),X.g.rotation.z=-O*1.45,X.g.position.y=-O*0.5,X.edge.material.color.copy(F),X.edge.material.opacity=V*(0.6+Z*0.4),X.tag.material.color.copy(F).multiplyScalar(0.7),X.tag.visible=G>0.3,X.mesh.material.emissive=F.clone().multiplyScalar(q===8&&$.name==="procure"&&J>=K0(28,/^nine/i)?0.5:0.05)});let W=this.slab[3],Y=this.slab[8],N=this.slab[11];if($.name==="procure"){this.approved.position.set(W.x,W.h+3,0),i6(this.approved,b9(W0(J,K0(27,/^nod/i),K0(27,/^nod/i)+0.3)));let X=Y9(W0(J,K0(28,/^nine/i)-0.3,K0(28,/^nine/i)+1));K.position.set(j(W.x+2,Y.x-4,X),j(4,Y.h*0.6,X),j(14,26,X)),Q.set(j(W.x,Y.x,X),j(W.h*0.6,Y.h*0.7,X),0)}else if($.name==="releases"){let X=W0(J,U,w(9)),q=Math.min(11,Math.floor(X*12)),G=this.slab[q];K.position.set(j(-6,N.x-20,X),j(3,14,X),j(16,34,X)),Q.set(G.x-2,G.h*0.5,0)}else{let X=Y9(W0(J,U,w(14)));K.position.set(j(N.x-34,N.x-22,X),j(16,22,X),j(80,70,X)),Q.set(N.x-14,j(16,20,X),0)}}cometShot(J,$,Q){let Z=this.camera;this.comet.visible=!0;let K=W0(J,w(9)-0.08,w(10)-0.08),U=L7(j(-40,30,K),j(14,4,K)+Math.sin(K*3)*2,j(-30,0,K)),H=L7(70,-10,30).normalize();this.cometHead.position.copy(U),this.cometHead.rotation.set($*2,$*3,0),this.phoneLid.rotation.x=-0.4-Math.abs(Math.sin($*9))*0.8;let W=this.tail.geometry.attributes.position;for(let Y=0;Y<W.count;Y++){let N=L0(Y),X=N*N*26,q=0.2+X*0.12;W.setXYZ(Y,U.x-H.x*X+(L0(Y+1)-0.5)*q*2,U.y-H.y*X+(L0(Y+2)-0.5)*q*2+Math.sin($*4+Y)*0.05,U.z-H.z*X+(L0(Y+3)-0.5)*q*2)}W.needsUpdate=!0,Z.position.set(U.x-6,U.y+2.5,U.z+14),Q.copy(U)}agentShot(J,$,Q,Z){let K=this.camera,U=$.at;this.agents.visible=!0;let H=$.name==="kernel",W=new F0;for(let X=0;X<40;X++){let q=X/40*Math.PI*2,G=X%2?7:10,F=0.9+L0(X)*0.8,O=(J-U+L0(X+1)*F)%F/F,V=Math.exp(-O*8);i0.position.set(Math.cos(q)*G,0.6+V*0.8,Math.sin(q)*G),i0.rotation.set(0,q+J*0.4,0),i0.scale.setScalar(0.9),i0.updateMatrix(),this.agentCubes.setMatrixAt(X,i0.matrix),this.agentEdges.setMatrixAt(X,i0.matrix),W.set(H?2759236:1714746).lerp(jZ,V*0.8),this.agentCubes.setColorAt(X,W)}if(this.agentCubes.instanceMatrix.needsUpdate=this.agentEdges.instanceMatrix.needsUpdate=!0,this.agentCubes.instanceColor)this.agentCubes.instanceColor.needsUpdate=!0;this.agentEdges.material.opacity=0.4+Z*0.4;let Y=W0(J,U,H?w(25):w(12)),N=j(0.3,1.6,Y);K.position.set(Math.sin(N)*22,j(12,7,Y),Math.cos(N)*22),Q.set(0,1,0)}roomShot(J,$,Q,Z){let K=this.camera,U=$.at;this.room.visible=!0;let H=$.name==="standup",W=$.name==="premeeting",Y=$.name==="moved",N=$.name==="triple";this.table.visible=!H;let X=H?w(16):$.name==="cab"?w(23):W?w(47):Y?w(53):N?w(52):w(35);for(let O=0;O<12;O++)if(H){let V=O/11*Math.PI*2,D=O===11;this.roomPeople.set(O,D?0:Math.cos(V)*4,D?0:Math.sin(V)*4,D?1.05:0.95+L0(O)*0.15,D?Math.sin(J*9)*0.12*(1-W0(J,w(15),w(15)+0.5)):Math.sin(J+O)*0.03)}else{let V=O%2?1:-1,E=-3.5+Math.floor(O/2)*1.45,C=W?b9(W0(J,w(43)+O*0.3,w(43)+O*0.3+0.4)):1,L=Y?p8(W0(J,K0(52,/^moved/i)+L0(O)*1.2,K0(52,/^moved/i)+L0(O)*1.2+1.4)):0;this.roomPeople.set(O,E+L*V*3,V*(1.95+L*9),Math.max(0.001,(0.95+L0(O)*0.12)*C),Math.sin(J*0.8+O)*0.02,L<0.05)}this.roomPeople.done(),this.screen.material.map=this.boards[$.name==="triple"?"tentative":$.name]??this.boards.standup,this.screen.material.color.setScalar(0.6+Z*0.1);let q=Y9(W0(J,N?K0(51,/^tentative/i):U,X)),G=j(H?0.4:-0.6,H?1.4:0.5,q),F=H?12:13;if(H)K.position.set(Math.sin(G)*F,j(7,4.5,q),Math.cos(G)*F),Q.set(0,1,0);else{let O=j(0.75,1.2,q);K.position.set(Math.sin(O)*F*0.8+1,j(4.5,3.6,q),Math.cos(O)*F*0.55),Q.set(-4.2,2.6,0)}}fabShot(J,$,Q,Z){let K=this.camera;this.fab.visible=!0,this.wafer.rotation.y=$*0.6,this.laser.material.opacity=0.5+Z*0.5,this.laser.scale.set(1+Z*2,1,1+Z*2),this.laser.position.set(Math.sin($*7)*2.5,0.2,Math.cos($*5)*2.5);let U=Math.floor(70*W0(J,K0(30,/^seventy/i),K0(30,/^dutch/i)+0.3)),H=J>=K0(30,/^out/i),W=new F0;for(let N=0;N<70;N++)this.machines.setColorAt(N,W.copy(N<U&&!H?HH.clone().multiplyScalar(0.45):new F0(2106156)));if(this.machines.instanceColor)this.machines.instanceColor.needsUpdate=!0;let Y=Y9(W0(J,w(29),w(31)));K.position.set(j(9,-6,Y),j(9,14,Y),j(12,26,Y)),Q.set(j(0,-8,Y),j(0.5,0,Y),j(0,-10,Y))}sunShot(J,$,Q){let Z=this.camera;this.sun.visible=!0;let K=W0(J,K0(31,/^mind/i)-0.3,K9(32)),U=this.swarmDirs.length;for(let Y=0;Y<U;Y++){let N=this.swarmDirs[Y],X=L0(Y*7)*0.9,q=Y9(W0(K,X,X+0.1));i0.position.copy(N).multiplyScalar(j(30,6.6,q)),i0.lookAt(0,0,0),i0.scale.setScalar(Math.max(0.001,q)),i0.updateMatrix(),this.swarm.setMatrixAt(Y,i0.matrix)}this.swarm.instanceMatrix.needsUpdate=!0,this.swarm.rotation.y=J*0.15;let H=1-K*0.75;this.sunBall.material.color.setRGB(0.75*H,0.55*H,0.28*H),this.sunHalo.material.opacity=(0.35+Q*0.2)*H;let W=j(-0.4,0.5,W0(J,w(31),w(33)));Z.position.set(Math.sin(W)*40,6,Math.cos(W)*40),$.set(0,0,0)}proteinShot(J,$){let Q=this.camera;this.protein.visible=!0;let Z=Y9(W0(J,K0(35,/^fold/i),K0(35,/^proteins/i)+0.6)),K=L7();this.coil.forEach((H,W)=>{K.copy(H).lerp(this.helix[W],Z),i0.position.copy(K),i0.rotation.set(0,0,0),i0.scale.setScalar(1),i0.updateMatrix(),this.beads.setMatrixAt(W,i0.matrix)}),this.beads.instanceMatrix.needsUpdate=!0,this.beads.rotation.y=J*0.5,this.globe.visible=J>=K0(35,/^climate/i)-0.1,this.globe.scale.setScalar(Math.max(0.001,b9(W0(J,K0(35,/^climate/i)-0.1,K0(35,/^climate/i)+0.3)))),this.globe.rotation.y=J*0.3;let U=Y9(W0(J,w(36),w(36)+0.8));this.protein.scale.setScalar(j(1,0.35,U)),Q.position.set(j(-2,0,U),j(9,3,U),j(22,24,U)),$.set(j(1,6,U),0,0)}render(){this.composer.render()}}var kD=(J)=>{let $=YH??=ZQ();return $[$.indexOf(J)+1]?.at??F7()},P5=(J,$,Q,Z,K)=>N9($,$+Z,J)*(1-N9(Q-K,Q,J));var jD=/^(exponential|gain|steep|ceiling|go|shot|engine|jet|thrust|stall|out|ten|contain|vertical|demigod|sun|apocalypse|singularity's|steeper|terrified|doubling|comet's|nine's)$/,vD=/^(prius|tesla|linear|claude|phone|model|brain|plane|kernel|agents|terminal|proteins|climate|grid|euv|dutch|curve)$/,yD=/^(not|yet|no|waiting|you're|thirty|minutes|hands|off|ticket|committee|board|rollback|office|flat|stable|procurement|eighteen|months|compliance|soc|questionnaire|weeks|lawyer|consultancy|bonus|teams|inbox|pre-meeting|meeting|tentative|thursday|quorum|thrilled)$/,T5={title:"The Steep Part",fonts:['400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
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
    <div class="bub ai" data-at="W36:so">Done. <b>Inbox 0.</b></div></div>`,endAt:()=>K9(53)+2.4,words:{hot:jD,ice:vD,gold:yD},hud:(J,$)=>{let Q=Math.floor(H6(J)/4);return{left:`the steep part &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`doublings <span class="ice">${Q}</span> &nbsp;·&nbsp; compute <b>×2<sup>${Q}</sup></b>`}},shots:ZQ,shotAt:vZ,world:(J)=>{let $=new NH(J);return{update:(Q)=>$.update(Q),render:()=>$.render(),flash:(Q)=>Math.min(0.9,$.flash(Q))*(Q>=x8()&&Q<x8()+1?0.8:0.6),fade:(Q)=>$.fade(Q)}}};var L9=(J,$,Q,Z)=>({name:J,at:$,label:Q,section:Z}),S5=(J,$)=>[L9("here",w(J)-0.3,"data here, data there",$),L9("crates",w(J+2)-0.2,"databricks, dataiku, sap",$),L9("kevin",w(J+4)-0.2,"the app kevin built",$),L9("plant",w(J+5)-0.2,"the plant",$),L9("nobody",w(J+6)-0.2,"nobody knows",$),L9("finale",w(J+8)-0.2,"data, data everywhere",$)];function fZ(){return[L9("overture",0,"team! big news!","intro"),L9("curtain",w(1)-0.3,"we're gonna AI","intro"),L9("kickline",w(2)-0.4,"it's gonna fix everything","verse 1"),L9("pitch",w(4)-0.2,"give us all your data","verse 1"),L9("vendor",w(6)-0.2,"the vendor rolled in","pre-chorus"),L9("where",w(8)-0.15,"where's the data?","pre-chorus"),L9("quiet",w(9)-0.2,"here's the thing","pre-chorus"),...S5(11,"chorus"),L9("chain",w(21)-0.6,"ask denise","verse 2"),L9("tickets",w(27)-0.2,"three ticket systems","pre-chorus"),L9("meeting",w(29)-0.2,"fourteen people","pre-chorus"),...S5(35,"chorus"),L9("closet",w(45)-0.6,"a server by the press","verse 3"),L9("cloud",w(47)-0.2,"just sync it up to azure","verse 3"),L9("xp",w(49)-0.2,"windows xp","verse 3"),L9("truths",w(51)-0.5,"nine sources of truth","bridge"),L9("swamp",w(52)-0.2,"the data lake's a swamp","bridge"),L9("raci",w(53)-0.2,"a raci for the raci","bridge"),L9("stan",w(54)-0.2,"ask stan","bridge"),L9("pilot",w(55)-0.2,"the pilot's in a pilot","bridge"),L9("oil",w(56)-0.2,"data is the new oil","bridge"),L9("call",w(59)-0.3,"can everyone see my screen?","breakdown"),L9("curtain",w(66)-0.5,"we're gonna AI (key change)","final chorus"),L9("agents",w(68)-0.2,"agents running everything","final chorus"),L9("lock",K0(69,/^kidding/i)-0.3,"kidding. nobody knows how.","final chorus"),L9("crates",w(70)-0.2,"databricks, dataiku, sap","final chorus"),L9("confluence",w(72)-0.2,"only with the direct link","final chorus"),L9("github",w(73)-0.2,"everywhere but github","final chorus"),L9("nobody",w(74)-0.2,"where's the data?","final chorus"),L9("finale",w(77)-0.2,"data, data... everywhere","final chorus"),L9("curtaincall",w(79)-0.5,"a recurring meeting","outro"),L9("end",K9(82)+0.2,"the end","outro")]}var y5=null,yZ=(J)=>{let $=y5??=fZ(),Q=$[0];for(let Z of $)if(Z.at<=J)Q=Z;return Q},fD=(J)=>{let $=y5??=fZ();return $[$.indexOf(J)+1]?.at??F7()},bD=9049124,XH=14263361;var k5=1714778,xD={overture:2361364,curtain:2767514,kickline:2767514,pitch:3811978,vendor:9067028,where:328968,quiet:328968,here:8002122,crates:1723002,kevin:2775610,plant:3815978,nobody:4856346,finale:8002122,chain:2763354,tickets:4864538,meeting:1714746,closet:1316884,cloud:2775712,xp:1723040,truths:3807834,swamp:1718820,raci:2763322,stan:328968,pilot:5929648,oil:2759178,call:658452,agents:1718874,lock:4856346,confluence:1718906,github:1052692,curtaincall:3807780,end:328968},j5=new Map,U7=(J,$=0.7,Q=0)=>{let Z=`${J}:${$}:${Q}`,K=j5.get(Z);if(!K)j5.set(Z,K=new W9({color:J,roughness:$,metalness:0,emissive:Q?J:0,emissiveIntensity:Q}));return K},S9=(J,$,Q=0,Z=0,K=0)=>{let U=new h(J,$);return U.position.set(Q,Z,K),U.castShadow=!0,U.receiveShadow=!0,U},d9=(J,$,Q,Z,K=0,U=0,H=0)=>S9(new _0(J,$,Q),U7(Z),K,U,H);function zJ(J,$,Q){let Z=document.createElement("canvas");Z.width=J,Z.height=$,Q(Z.getContext("2d"));let K=new O7(Z);return K.colorSpace=R7,K.anisotropy=4,K}function U8(J,$,Q,Z={}){let K=zJ(Math.round($*160),Math.round(Q*160),(U)=>{let H=U.canvas.width,W=U.canvas.height;U.fillStyle=Z.bg??"#f3ead2",U.fillRect(0,0,H,W),U.strokeStyle=Z.fg??"#1d1a22",U.lineWidth=W*0.05,U.strokeRect(W*0.04,W*0.04,H-W*0.08,W-W*0.08),U.fillStyle=Z.fg??"#1d1a22",U.textAlign="center",U.textBaseline="middle";let Y=W*(Z.sub?0.4:0.5);U.font=`${Z.font??"900"} ${Y}px "DM Serif Display", Georgia, serif`;while(U.measureText(J).width>H*0.88)Y*=0.92,U.font=`${Z.font??"900"} ${Y}px "DM Serif Display", Georgia, serif`;if(U.fillText(J,H/2,Z.sub?W*0.4:W/2),Z.sub)U.font=`600 ${W*0.17}px "JetBrains Mono", monospace`,U.fillText(Z.sub,H/2,W*0.74)});return S9(new G9($,Q),new W9({map:K,roughness:0.8}))}var d7=new P9,J9=(J=0,$=0,Q=0)=>new k(J,$,Q),hD=J9(0,1,0),gD=new j0(0.075,0.085,1,8).translate(0,0.5,0),pD=new j0(0.11,0.09,0.95,10).translate(0,-0.475,0);function $6(J){let $=new E0,Q=J.robot?10134445:[15254688,13012578,9263675,15782582,7029808][Math.floor(L0(J.seed)*5)],Z=J.pants??2763316;if($.add(S9(new j0(0.27,0.24,0.72,14),U7(J.shirt),0,1.3,0)),$.add(S9(new j0(0.25,0.27,0.22,14),U7(Z),0,0.92,0)),J.tie)$.add(d9(0.08,0.42,0.03,J.tie,0,1.38,0.27));let K=J.robot?d9(0.42,0.4,0.4,Q,0,1.9,0):S9(new l0(0.21,16,12),U7(Q),0,1.88,0);if(J.robot)K.add(S9(new _0(0.28,0.07,0.02),U7(8057087,0.4,1.5),0,0.02,0.21));if(J.hat)K.add(S9(new l0(0.23,14,8,0,Math.PI*2,0,Math.PI/2),U7(J.hat),0,0.05,0));$.add(K);let U=[-1,1].map((Y)=>{let N=new h(pD,U7(Z));return N.position.set(Y*0.12,0.95,0),N.castShadow=!0,N.add(S9(new _0(0.14,0.08,0.3),U7(1381402),0,-0.93,0.06)),$.add(N),N}),H=[-1,1].map(()=>{let Y=S9(new l0(0.075,10,8),U7(Q));return $.add(Y),Y}),W=[0,1].map(()=>{let Y=new h(gD,U7(J.shirt));return Y.castShadow=!0,$.add(Y),Y});return Object.assign($.userData,{head:K,hands:H,arms:W,legs:U,seed:J.seed}),$}var uD={down:[0.34,0.95,0.12],up:[0.42,2.45,0.05],jazz:[0.72,2,0.3],shrug:[0.62,1.42,0.42],point:[0.3,1.75,0.85],out:[0.95,1.6,0.1],face:[0.16,1.82,0.32]};function l7(J,$,Q,Z=0,K=0,U=0.04,H){let{hands:W,arms:Y,legs:N,seed:X,head:q}=J.userData;J.rotation.z=Math.sin($*Math.PI*2.2+X)*U,q.rotation.x=Q==="face"?0.35:0,W.forEach((G,F)=>{let O=F?1:-1,[V,D,E]=uD[F&&H?H:Q];G.position.set(O*V,D+(Q==="jazz"?Math.sin($*30+F)*0.03:0),E);let C=J9(O*0.26,1.6,0.02),L=G.position.clone().sub(C);Y[F].position.copy(C),Y[F].quaternion.setFromUnitVectors(hD,L.clone().normalize()),Y[F].scale.set(1,L.length(),1)}),N.forEach((G,F)=>{G.rotation.x=F===K?-Z*1.45:Z*0.1})}var GH=[{name:"Databricks",word:/^databricks/i,color:"#d8452f"},{name:"Dataiku",word:/^dataiku/i,color:"#2ab1ac"},{name:"SAP",word:/^sap$/i,color:"#1a6fd1"},{name:"S3",word:/^s3/i,color:"#d88a1a"},{name:"Redshift",word:/^redshift/i,color:"#8c4fd1"},{name:"Azure",word:/^azure/i,color:"#2a86e0"},{name:"ServiceNow",word:/^servicenow/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^\W*times/i,color:"#3f9a4a"},{name:"ServiceNow",word:/^three/i,color:"#3f9a4a"}],v5=[{label:"My boss",word:/^boss/i},{label:"Denise",word:/^denise/i},{label:"Platform team",word:/^platform/i},{label:"#data-access",word:/^slack/i},{label:"Gary (OOO)",word:/^gary/i},{label:"A guy who knows a guy",word:/^guy$/i}];class qH{renderer;scene=new $8;camera=new Q7(45,1.7777777777777777,0.1,400);composer;bloom;wash=new K8(16771272,2758672,0.5);key=new t7(16773336,0.6);spots=[];cyc;stage=new E0;curtains=[];bulbs;marquee=new E0;marqueeBulbs;marqueeBulbPos=[];seats;lead;vendorGuy;cio;line=[];deck;decks={};crates=[];github=new E0;kevin=new E0;plant=new E0;chain=[];booths=[];meeting=new E0;clockHand;closet=new E0;fan;xpScreen;cloud=new E0;plantGuy;agents=[];padlock=new E0;door=new E0;swamp;tomb;planes=[];barrels=new E0;stanSign;confetti;constructor(J){this.renderer=new _8({canvas:J,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.setSize(1920,1080,!1),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=BJ,this.renderer.toneMapping=G8,this.scene.background=new F0(328711),this.composer=new $J(this.renderer),this.composer.addPass(new ZJ(this.scene,this.camera)),this.bloom=new B8(new G0(1920,1080),0.55,0.5,0.82),this.composer.addPass(this.bloom),this.composer.addPass(new QJ),this.key.position.set(0,18,20),this.scene.add(this.wash,this.key),this.buildStage(),this.buildPeople(),this.buildProps(),this.scene.add(this.stage)}buildStage(){let J=this.stage,$=zJ(1024,512,(Y)=>{for(let N=0;N<32;N++){Y.fillStyle=`hsl(28, ${38+L0(N)*10}%, ${22+L0(N+4)*8}%)`,Y.fillRect(0,N*16,1024,15),Y.fillStyle="rgba(0,0,0,.35)",Y.fillRect(0,N*16+15,1024,1);for(let X=0;X<3;X++)Y.fillRect(L0(N*5+X)*1024,N*16,2,15)}});$.wrapS=$.wrapT=S8,$.repeat.set(2,2);let Q=S9(new _0(30,1,14),new W9({map:$,roughness:0.55}),0,-0.5,-2.5);J.add(Q),this.cyc=new h(new G9(34,18),new h9({uniforms:{color:{value:new F0(k5)},glow:{value:1}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 color; uniform float glow; varying vec2 vUv;
        void main() { float g = smoothstep(0.0, 0.55, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y)) * 0.9 + 0.1;
          float h = exp(-pow((vUv.y - 0.12) * 5.0, 2.0)) * 0.8;
          gl_FragColor = vec4(color * (g + h) * glow, 1.0); }`})),this.cyc.position.set(0,7.5,-8.2),J.add(this.cyc);let Z=new W9({color:XH,roughness:0.35,metalness:0.7});for(let Y of[-12.4,12.4])J.add(S9(new _0(1.4,14,1),Z,Y,6.5,4.9));J.add(S9(new _0(26.2,1.6,1),Z,0,13.3,4.9)),J.add(d9(24,2.2,0.2,789008,0,11.6,4.4));let K=new G9(12,12.6,48,1),U=K.attributes.position;for(let Y=0;Y<U.count;Y++)U.setZ(Y,Math.sin(U.getX(Y)*4.2)*0.18);K.computeVertexNormals();let H=new W9({color:bD,roughness:0.8,side:m9});for(let Y of[-1,1]){let N=S9(K,H,Y*6,6.3,4.3);this.curtains.push(N),J.add(N);let X=S9(K,H,Y*13.5,6.3,3.6);X.scale.x=0.35,J.add(X)}this.bulbs=new w9(new l0(0.09,10,8),new g0({color:16767120}),40);for(let Y=0;Y<40;Y++)d7.position.set(-11.5+Y*0.59,0.08,4.2),d7.updateMatrix(),this.bulbs.setMatrixAt(Y,d7.matrix);J.add(this.bulbs,d9(24,0.18,0.4,1708556,0,0,4.35)),this.seats=new w9(new _0(0.62,0.95,0.6),U7(5901336),220);let W=0;for(let Y=0;Y<10;Y++)for(let N=0;N<22;N++)d7.position.set(-11+N*1.05,0+Y*0.32-0.6,8+Y*1.2),d7.updateMatrix(),this.seats.setMatrixAt(W++,d7.matrix);J.add(this.seats);for(let[Y,N,X]of[[-9,16,18],[9,16,18],[0,18,16]]){let q=new g6(16774368,0,60,0.16,0.45,1.2);q.position.set(Y,N,X),q.castShadow=!0,q.shadow.mapSize.set(1024,1024),q.shadow.bias=-0.0005,this.scene.add(q,q.target);let G=new h(new j0(0.05,1,1,24,1,!0).translate(0,-0.5,0),new g0({color:16773328,transparent:!0,opacity:0.06,blending:W7,depthWrite:!1,side:m9}));this.scene.add(G),this.spots.push({light:q,beam:G})}}buildPeople(){this.lead=$6({shirt:2771594,pants:1844280,tie:13120058,seed:3}),this.vendorGuy=$6({shirt:13148240,pants:9071146,tie:1710618,seed:8}),this.cio=$6({shirt:3816004,pants:2236970,tie:6982351,seed:11}),this.plantGuy=$6({shirt:5925498,pants:2767450,seed:14,hat:15777824});let J=[15262938,9089240,14196904,12114080,15257744,12626144,15790320,9488584];for(let $=0;$<8;$++)this.line.push($6({shirt:J[$],tie:$%2?2763370:void 0,seed:20+$}));for(let $=0;$<3;$++)this.agents.push($6({shirt:10134445,pants:6976381,seed:40+$,robot:!0}));for(let $ of[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents])this.stage.add($)}buildProps(){let J=this.stage,$=zJ(1600,400,(R)=>{R.fillStyle="#1a0f08",R.fillRect(0,0,1600,400),R.fillStyle="#ffe9b0",R.textAlign="center",R.textBaseline="middle";let _=210;R.font=`400 ${_}px "Limelight", "DM Serif Display", serif`;while(R.measureText("WE'RE GONNA AI!").width>1440)_-=6,R.font=`400 ${_}px "Limelight", "DM Serif Display", serif`;R.fillText("WE'RE GONNA AI!",800,212)});this.marquee.add(S9(new _0(16.4,4.4,0.4),U7(2759184)));let Q=new h(new G9(15.6,3.9),new W9({map:$,emissive:16777215,emissiveMap:$,emissiveIntensity:0.55}));Q.position.z=0.21,this.marquee.add(Q);for(let R=0;R<64;R++){let A=R/64*40.4,M=0,I=0;if(A<16)M=-8+A,I=2.1;else if((A-=16)<4.2)M=8,I=2.1-A;else if((A-=4.2)<16)M=8-A,I=-2.1;else A-=16,M=-8,I=-2.1+A;this.marqueeBulbPos.push(J9(M,I,0.3))}this.marqueeBulbs=new w9(new l0(0.13,10,8),new g0({color:16777215}),64),this.marqueeBulbPos.forEach((R,_)=>{d7.position.copy(R),d7.updateMatrix(),this.marqueeBulbs.setMatrixAt(_,d7.matrix)}),this.marquee.add(this.marqueeBulbs);for(let R of[-6,6])this.marquee.add(S9(new j0(0.02,0.02,10),U7(8947848),R,7.2,0));J.add(this.marquee),this.deck=new h(new G9(9,5.06),new W9({color:16777215,emissive:16777215,emissiveIntensity:0.22})),this.deck.position.set(2.5,5.2,-6.5),J.add(this.deck);let Z=(R,_,B,A)=>zJ(1280,720,(M)=>{M.fillStyle=B,M.fillRect(0,0,1280,720),M.fillStyle=A,M.textAlign="center",M.font='900 120px "DM Serif Display", Georgia, serif',M.fillText(R,640,330),M.font='600 46px "JetBrains Mono", monospace',M.fillText(_,640,450)});this.decks={vendor:Z("Live by Q3!","AI that fixes everything™","#f6f1e4","#1a3a8a"),pilot:Z("Demo: ✓ crushed it","now with your data…","#f6f1e4","#1a6a3a"),tears:Z("ERROR","null · null · null · NaN","#2a0a0e","#ff6a6a"),oil:Z("Data is the new oil!","every deck, every quarter","#141010","#f0c060")};let K=(R,_)=>zJ(512,512,(B)=>{B.fillStyle="#b08a58",B.fillRect(0,0,512,512),B.fillStyle="rgba(60,40,20,.5)";for(let M=0;M<6;M++)B.fillRect(0,M*86,512,6);B.strokeStyle="#6a4a28",B.lineWidth=26,B.strokeRect(13,13,486,486),B.beginPath(),B.moveTo(26,26),B.lineTo(486,486),B.stroke(),B.fillStyle=_,B.fillRect(40,186,432,140),B.fillStyle="#fff",B.textAlign="center",B.textBaseline="middle";let A=84;B.font=`900 ${A}px "DM Serif Display", Georgia, serif`;while(B.measureText(R).width>400)A-=4,B.font=`900 ${A}px "DM Serif Display", Georgia, serif`;B.fillText(R,256,258)});GH.forEach((R,_)=>{let B=new E0,A=K(R.name,R.color);if(B.add(S9(new _0(1.9,1.9,1.9),new W9({map:A,roughness:0.8}),0,0.95,0)),B.userData.home=_<6?J9(-9.2+_*2.6+(_>2?2.6:0)-1.3,0,-4.5+_%2*1.2):J9(8.6,(_-6)*1.9,-2.6),_<6)B.userData.home=J9([-9.5,-6.6,-3.7,3.7,6.6,9.5][_],0,[-4.8,-3.6,-5.2,-5.2,-3.6,-4.8][_]);B.rotation.y=(L0(_)-0.5)*0.4,this.crates.push(B),J.add(B)});let U=new O8(new f6(new _0(1.9,1.9,1.9)),new EZ({color:16777215,dashSize:0.18,gapSize:0.12}));U.computeLineDistances(),U.position.y=0.95;let H=U8("GitHub",1.9,0.6,{bg:"#101014",fg:"#f0f0f0"});H.position.set(0,2.3,0),this.github.add(U,H),J.add(this.github);let W=zJ(640,480,(R)=>{R.fillStyle="#0a0aa0",R.fillRect(0,0,640,480),R.fillStyle="#c0c0c0",R.fillRect(40,40,560,400),R.fillStyle="#000080",R.fillRect(40,40,560,44),R.fillStyle="#fff",R.font='700 30px "JetBrains Mono", monospace',R.fillText("KevinSoft Data Manager 2003",56,72),R.fillStyle="#000",R.font='600 26px "JetBrains Mono", monospace',["Records: 41,207","Last backup: 2009","Password: kevin1","Do not close!!"].forEach((_,B)=>R.fillText(_,70,150+B*60))});this.kevin.add(d9(3,0.15,1.6,6965802,0,1.4,0),d9(0.12,1.4,0.12,3811866,-1.3,0.7,0),d9(0.12,1.4,0.12,3811866,1.3,0.7,0)),this.kevin.add(d9(1.8,1.5,1.6,14208944,0,2.3,-0.1));let Y=S9(new G9(1.5,1.12),new W9({map:W,emissive:16777215,emissiveMap:W,emissiveIntensity:0.35}),0,2.35,0.71);this.kevin.add(Y,d9(1.6,0.08,0.6,14208944,0,1.52,0.5));let N=U8("Kevin's app",2.4,0.6,{sub:"built 2003 · Kevin left 2011"});N.position.set(0,3.7,0),this.kevin.add(N),J.add(this.kevin);let X=new Q8([J9(-6,0),J9(-6,3),J9(-4,4.2),J9(-4,3),J9(-2,4.2),J9(-2,3),J9(0,4.2),J9(0,3),J9(6,3),J9(6,0)].map((R)=>new G0(R.x,R.y)));this.plant.add(S9(new j8(X,{depth:0.3,bevelEnabled:!1}),U7(4868690))),this.plant.add(S9(new j0(0.4,0.55,6,14),U7(5913138),3.8,5.5,0.15));let q=U8("THE PLANT",4,1,{sub:"bandwidth: 0.3 Mbps (on a good day)",bg:"#f0e6c0"});q.position.set(0.5,1.7,0.34),this.plant.add(q);for(let R=0;R<4;R++)this.plant.add(S9(new G9(0.8,0.6),U7(16765040,0.5,1.2),-4.6+R*1.6,1.6,0.32));this.plant.position.set(0,0,-6.6),J.add(this.plant),v5.forEach((R,_)=>{let B=new E0,A=_===4?null:$6({shirt:[3816004,12081786,4880986,10134445,0,9071178][_],seed:60+_,robot:_===3,tie:_===0?9050650:void 0});if(A)B.add(A);if(_===4)B.add(d9(0.8,0.08,0.8,3816004,0,0.9,0),d9(0.8,0.9,0.08,3816004,0,1.35,-0.38),d9(0.06,0.9,0.06,2236962,0,0.45,0));let M=U8(R.label,2.2,0.55,{bg:_===4?"#ffe9a0":"#f3ead2"});M.position.set(0,2.75,0),B.add(M),B.position.set(-9+_*3.6,0,-2.4+_%2*1.1),this.chain.push({group:B,who:A}),J.add(B)}),[["RESOLVED","#2f8a4a"],["DUPLICATE","#6a6a74"],["SEE TICKET 3","#c88a1a"]].forEach(([R,_],B)=>{let A=new E0;A.add(d9(2.4,2.2,1.4,2763316,0,1.1,0),d9(2.6,0.12,1.6,4868692,0,2.26,0));let M=U8(R,2.4,0.7,{bg:_,fg:"#ffffff"});M.position.set(0,1.4,0.71);let I=new h(new l0(0.3,16,12),new W9({color:new F0(_),emissive:new F0(_),emissiveIntensity:0}));I.position.set(0,2.7,0);let y=U8(`Ticket system #${B+1}`,2.4,0.45,{bg:"#f3ead2"});y.position.set(0,3.4,0),A.add(M,I,y),A.position.set(-6+B*6,0,-3),this.booths.push({group:A,lamp:I}),J.add(A)}),this.meeting.add(d9(12,0.15,2.2,5913124,0,1.25,-2.5));for(let R=0;R<14;R++){let _=-5.5+R%7*1.85,B=R<7?-3.9:-1.1;this.meeting.add(d9(0.7,0.08,0.7,2302764,_,0.8,B),d9(0.7,0.9,0.08,2302764,_,1.25,B+(R<7?-0.35:0.35)))}let G=zJ(256,256,(R)=>{R.fillStyle="#f6f1e4",R.beginPath(),R.arc(128,128,124,0,Math.PI*2),R.fill(),R.fillStyle="#1d1a22";for(let _=0;_<12;_++){let B=_/12*Math.PI*2;R.fillRect(128+Math.sin(B)*100-4,128-Math.cos(B)*100-10,8,20)}}),F=S9(new C7(1.1,40),new W9({map:G}),0,7.5,-7.8);this.clockHand=d9(0.08,0.9,0.04,1907234,0,7.5,-7.75),this.clockHand.geometry.translate(0,0.4,0),this.meeting.add(F,this.clockHand),J.add(this.meeting),this.closet.add(d9(0.2,7,6,5921354,-3.2,3.5,-3),d9(0.2,7,6,5921354,3.2,3.5,-3),d9(6.6,7,0.2,4868670,0,3.5,-6)),this.closet.add(d9(1.4,3,1.8,2763312,-1.2,1.5,-4.2));for(let R=0;R<6;R++)this.closet.add(S9(new l0(0.05),U7(R%2?4259680:16752672,0.5,2),-1.6+R%3*0.2,2.6-Math.floor(R/3)*0.2,-3.28));this.closet.add(d9(1.8,0.1,1.2,6965802,1.4,1.2,-4.4),d9(0.1,1.2,0.1,3811866,0.6,0.6,-4.4),d9(0.1,1.2,0.1,3811866,2.2,0.6,-4.4)),this.closet.add(d9(1.5,1.2,1.2,14208944,1.4,1.85,-4.6));let O=zJ(640,480,(R)=>{let _=R.createLinearGradient(0,0,0,300);_.addColorStop(0,"#2a6ae0"),_.addColorStop(1,"#a8d0f8"),R.fillStyle=_,R.fillRect(0,0,640,480),R.fillStyle="#4aa83a",R.beginPath(),R.moveTo(0,330),R.quadraticCurveTo(300,200,640,300),R.lineTo(640,480),R.lineTo(0,480),R.fill(),R.fillStyle="#245ed8",R.fillRect(0,440,640,40),R.fillStyle="#3a9a3a",R.fillRect(0,440,120,40),R.fillStyle="#fff",R.font='italic 700 26px "Inter", sans-serif',R.fillText("start",28,469),R.fillStyle="#f6f1e4",R.fillRect(150,120,340,150),R.fillStyle="#0a246a",R.fillRect(150,120,340,34),R.fillStyle="#fff",R.font='700 20px "Inter", sans-serif',R.fillText("Windows XP · Service Pack 2",160,144),R.fillStyle="#000",R.font='500 20px "Inter", sans-serif',R.fillText("Uptime: 4,211 days",170,200),R.fillText("Updates available: 1,906",170,235)});this.xpScreen=S9(new G9(1.3,0.98),new W9({map:O,emissive:16777215,emissiveMap:O,emissiveIntensity:0.4}),1.4,1.88,-3.99),this.closet.add(this.xpScreen),this.fan=new E0,this.fan.add(S9(new M7(0.7,0.07,8,32),U7(14211280)));for(let R=0;R<4;R++){let _=d9(0.32,0.55,0.03,9089240,0,0.3,0);_.geometry.translate(0,0,0);let B=new E0;B.add(_),B.rotation.z=R*Math.PI/2,this.fan.add(B)}this.fan.position.set(-1.2,3.8,-4.2),this.closet.add(this.fan);let V=U8("DO NOT UNPLUG",0.9,0.7,{bg:"#ffe55a",sub:"— Jess"});V.position.set(-1.2,2.2,-3.29),this.closet.add(V),J.add(this.closet);for(let R=0;R<7;R++)this.cloud.add(S9(new l0(0.9+L0(R)*0.6,18,14),U7(16054010),-2.4+R*0.8,Math.sin(R*1.3)*0.4,L0(R+3)*0.6));let D=U8("AZURE",2.6,0.7,{bg:"#2a86e0",fg:"#fff"});D.position.set(0,-1.4,1.2),this.cloud.add(D,S9(new j0(0.02,0.02,8),U7(10127978),0,-5,0)),J.add(this.cloud),this.padlock.add(S9(new M7(1.1,0.22,12,32,Math.PI),new W9({color:11579576,metalness:0.8,roughness:0.3}),0,1.6,0)),this.padlock.add(S9(new _0(3,2.4,0.9),new W9({color:XH,metalness:0.7,roughness:0.35}),0,0.4,0)),this.padlock.add(S9(new j0(0.22,0.22,0.95,16),U7(1710618),0,0.5,0.05).rotateX(Math.PI/2)),J.add(this.padlock),this.door.add(d9(3,5.6,0.3,3811866,0,2.8,0),d9(2.4,5,0.2,2775720,0,2.6,0.12));let E=U8("Confluence",2.6,0.7,{bg:"#f3ead2"});E.position.set(0,5.9,0.2);let C=U8("direct link only",2.2,0.5,{bg:"#ffe9a0"});C.position.set(0,2.9,0.26),this.door.add(E,C,S9(new l0(0.14),new W9({color:XH,metalness:0.8,roughness:0.3}),0.9,2.5,0.3)),J.add(this.door),this.swamp=S9(new C7(7,48),new W9({color:3824170,roughness:0.25,metalness:0.1}),0,0.03,-2.5),this.swamp.rotation.x=-Math.PI/2,J.add(this.swamp),this.tomb=new E0,this.tomb.add(S9(new j0(0.9,0.9,0.3,24,1,!1,0,Math.PI),U7(9079440),0,2.1,0).rotateX(Math.PI/2),d9(1.8,2.1,0.3,9079440,0,1.05,0));let L=U8("RIP CRM",1.5,0.9,{bg:"#8a8a90",sub:"2009–2021"});L.position.set(0,1.3,0.16),this.tomb.add(L),J.add(this.tomb);for(let R=0;R<2;R++){let _=new E0,B=R?0.45:1;_.add(S9(new Z7(0.9*B,3*B,3),U7(R?15782016:16183780)).rotateX(-Math.PI/2).rotateZ(Math.PI/2)),this.planes.push(_),J.add(_)}for(let R=0;R<9;R++)this.barrels.add(S9(new j0(0.6,0.6,1.6,20),U7(1710618,0.4),-8+R*2,0.8,-3+R%2*1.2));J.add(this.barrels),this.stanSign=U8("STAN?",1.6,0.6,{bg:"#f3ead2"}),J.add(this.stanSign),this.confetti=new w9(new G9(0.16,0.1),new g0({color:16777215,side:m9}),400);for(let R=0;R<400;R++)this.confetti.setColorAt(R,new F0([16765024,16734858,5943551,8056954,16777215][R%5]));J.add(this.confetti)}flash(J){let $=yZ(J);return $.name==="here"||$.name==="finale"?Math.exp(-(J-$.at)*8)*0.25:0}fade(J){return N9(F7()-0.8,F7(),J)}update(J){let $=yZ(J),Q=$.name,Z=$.at,K=fD($),U=W0(J,Z,K),H=J-Z,W=this.camera,Y=J9(0,3,0),N=s7(J),X=H6(J),q=new Set,G=(B,A)=>{B.visible=A},F=new F0(xD[Q]??k5);this.cyc.material.uniforms.color.value.copy(F),this.cyc.material.uniforms.glow.value=1+N*0.25;let O=Q==="where"||Q==="quiet"||Q==="stan"||Q==="call"||Q==="github"||Q==="end";this.wash.intensity=O?0.05:Q==="closet"||Q==="xp"?0.25:0.55,this.key.intensity=O?0:0.5;for(let B=0;B<40;B++)this.bulbs.setColorAt(B,new F0(O?3811860:16767120));if(this.bulbs.instanceColor)this.bulbs.instanceColor.needsUpdate=!0;let V=Q==="overture"?0:Q==="curtain"&&Z<10?Y9(W0(J,Z,Z+1.6)):Q==="curtaincall"?1-p8(W0(J,w(80),K9(82))):Q==="end"?0:1;this.curtains.forEach((B,A)=>{let M=A?1:-1;B.scale.x=j(1,0.28,V),B.position.x=M*j(6,10.8,V)});let D=[null,null,null],E=[this.lead,this.vendorGuy,this.cio,this.plantGuy,...this.line,...this.agents];for(let B of E)B.visible=!1;for(let B of[this.marquee,this.deck,this.github,this.kevin,this.plant,this.meeting,this.closet,this.cloud,this.padlock,this.door,this.swamp,this.tomb,this.barrels,this.stanSign,this.confetti,...this.planes])B.visible=!1;for(let B of this.crates)B.visible=!1;for(let B of this.chain)B.group.visible=!1;for(let B of this.booths)B.group.visible=!1;let C=(B)=>{let A=(J-0.433)/n7()-B*0.12,M=Math.floor(A),I=A-M;return{amount:Math.sin(j9(I)*Math.PI)*0.95,leg:(M+B)%2}},L=(B=0,A=-1.5,M="jazz")=>{this.line.forEach((I,y)=>{I.visible=!0,I.position.set(-8.4+y*2.4,B,A),I.rotation.y=0;let S=C(y);l7(I,J,M,S.amount,S.leg,0.02)})},R=(B,A,M,I=0.05)=>{this.lead.visible=!0,this.lead.position.set(B,0,A),this.lead.rotation.y=0,l7(this.lead,J,M,0,0,I)},_=mD(J);switch(Q){case"overture":{R(0,3.2,H>1.2?"jazz":"out"),D[2]=J9(0,1.6,3.2),W.position.set(0,j(2.6,2.3,U),j(14,10.5,U)),Y.set(0,2.6,3);break}case"curtain":{let B=Z>100;if(this.marquee.visible=!0,this.marquee.position.set(0,j(16,8.6,b9(W0(J,Z+0.2,Z+1.4))),-4),this.marqueeBulbPos.forEach((A,M)=>this.marqueeBulbs.setColorAt(M,new F0((M+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;if(L(),R(0,2.2,"up"),D[0]=J9(-4,1,-1.5),D[1]=J9(4,1,-1.5),D[2]=J9(0,1.6,2.2),B)this.confettiAt(J,Z);W.position.set(0,j(4,5,U),j(20,17,U)),Y.set(0,5,0),W.fov=46;break}case"kickline":{if(this.marquee.visible=!0,this.marquee.position.set(0,8.6,-4),this.marqueeBulbPos.forEach((B,A)=>this.marqueeBulbs.setColorAt(A,new F0((A+Math.floor(J*8))%4===0?16777215:16756800))),this.marqueeBulbs.instanceColor)this.marqueeBulbs.instanceColor.needsUpdate=!0;L(),R(0,2.2,N>0.5?"up":"jazz"),D[0]=J9(-4,1,-1.5),D[1]=J9(4,1,-1.5),D[2]=J9(0,1.6,2.2),W.position.set(j(-11,11,U),1,5.5),Y.set(j(-6,6,U),1.4,-1.5),W.fov=50;break}case"pitch":{L(0,-2.6,"out"),R(0,2,J>w(5)?"out":"point"),D[2]=J9(0,1.6,2),W.position.set(j(1.5,0.5,U),2.4,j(9.5,7.5,U)),Y.set(0,2.1,1),W.fov=40;break}case"vendor":{this.deck.visible=!0,this.deck.material.map=this.decks.vendor,this.deck.material.emissiveMap=this.decks.vendor,this.deck.material.needsUpdate=!0,this.vendorGuy.visible=!0,this.vendorGuy.position.set(j(-12,-2,Y9(W0(J,Z,Z+1.5))),0,0.5),this.vendorGuy.rotation.y=0.3,l7(this.vendorGuy,J,J>K0(7,/^q3/i)?"jazz":"point",0,0,0.06),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=-0.6,l7(this.cio,J,"down"),D[0]=this.vendorGuy.position.clone().setY(1.6),D[1]=J9(2.5,4,-6.5),W.position.set(j(-3,0,U),3,11),Y.set(0,3,-2);break}case"where":case"quiet":{if(this.vendorGuy.visible=!0,this.vendorGuy.position.set(-2,0,0.5),l7(this.vendorGuy,J,"shrug",0,0,0),this.cio.visible=!0,this.cio.position.set(5.5,0,1.5),this.cio.rotation.y=Q==="quiet"?-0.2:-0.6,l7(this.cio,J,Q==="quiet"&&J>K0(10,/^thing/i)-1?"shrug":"down",0,0,0),D[2]=Q==="where"?J9(-2,1.6,0.5):J9(5.5,1.6,1.5),Q==="where")W.position.set(-2,2.2,7),Y.set(-2,2,0.5),W.fov=34;else W.position.set(j(3.2,4.2,U),2.1,j(7.5,5.5,U)),Y.set(5.5,2,1.5),W.fov=32;break}case"here":case"finale":{L(),R(0,2.4,"out");let B=K0($.at<100?11:$.at<200?35:77,/^\W*there/i),A=Q==="here"&&J<B-0.1?-1:Q==="here"?1:Math.sin(J*3)>0?1:-1;if(D[0]=J9(A*7,0.5,-1),D[1]=J9(-A*3,0.5,-1),D[2]=J9(0,1.6,2.4),this.cratesUpTo(J,9,!0),Q==="finale")this.kevin.visible=this.plant.visible=!0,this.kevin.position.set(-10.5,0,1.5);if(Q==="finale"&&Z>230)this.confettiAt(J,Z);W.position.set(Math.sin(J*0.3)*3,j(5,4,U),j(24,19,U)),Y.set(0,3.5,-1);break}case"crates":{let B=Z<100?13:Z<200?37:70;this.cratesUpTo(J,9,!1,B),R(0,2.4,"point"),this.lead.rotation.y=Math.sin(J*2)*0.6,D[2]=J9(0,1.6,2.4);let A=this.lastDropped(J,B);if(A)D[0]=A.clone().setY(1);W.position.set(j(-4,4,U),j(7,6,U),15),Y.set(j(-3,3,U),1.6,-3),W.fov=48;break}case"kevin":{this.cratesUpTo(J,9,!0),this.kevin.visible=!0,this.kevin.position.set(0,j(14,0,b9(W0(J,Z,Z+0.9))),0.8),R(-2.6,2,"point"),this.lead.rotation.y=0.8,D[2]=J9(0,2.4,0.8),W.position.set(j(1.5,0.5,U),2.9,j(7.5,6.4,U)),Y.set(0,2.5,0.8),W.fov=40;break}case"plant":{this.cratesUpTo(J,9,!0),this.plant.visible=!0,R(0,2,"out"),D[1]=J9(0,2,-6.5),W.position.set(0,j(3,4,U),j(16,13,U)),Y.set(0,2.6,-6.5),W.fov=44;break}case"nobody":{this.cratesUpTo(J,9,!0),L(0,-1.5,_>0.2?"shrug":"down"),this.line.forEach((B)=>l7(B,J,_>0.2?"shrug":"down",0,0,0.02)),R(0,2.4,_>0.2?"shrug":"face"),D[2]=J9(0,1.6,2.4),W.position.set(0,2.2,j(11,9,U)),Y.set(0,2,0);break}case"chain":{let B=0;v5.forEach((M,I)=>{let y=21+[0,0,1,2,3,4][I];if(J>=K0(y,M.word)-0.1)B=I}),this.chain.forEach((M,I)=>{if(M.group.visible=!0,M.who)l7(M.who,J,I===B?I===3?"point":I===5?"shrug":"point":"down",0,0,0.02)});let A=this.chain[B].group.position;R(j(this.lead.position.x||-11,A.x+1.3,0.5),A.z+1.4,"shrug"),this.lead.position.x=A.x+1.3,this.lead.rotation.y=-0.6,D[2]=A.clone().setY(1.6),D[1]=this.lead.position.clone().setY(1.6),W.position.set(A.x*0.8+2,3,10),Y.set(A.x*0.9+0.5,2,-1.5),W.fov=42;break}case"tickets":{this.booths.forEach((B,A)=>{B.group.visible=!0;let M=A===0?K0(28,/resolved/i):A===1?K0(28,/duplicate/i):K0(28,/^see/i);B.lamp.material.emissiveIntensity=J>=M-0.1||J<w(28)&&Math.floor(J*4)%3===A?2.2:0.1}),R(0,1.6,"shrug"),D[0]=J9(-6,1.6,-3),D[1]=J9(6,1.6,-3),D[2]=J9(0,1.6,-3),W.position.set(0,j(4,3.4,U),j(15,12,U)),Y.set(0,2,-3);break}case"meeting":{this.meeting.visible=!0,this.clockHand.rotation.z=-H*3,[...this.line,this.lead,this.cio,this.vendorGuy,this.plantGuy,this.agents[0],this.agents[1]].forEach((A,M)=>{A.visible=!0;let I=-5.5+M%7*1.85,y=M<7?-3.9:-1.1;A.position.set(I,-0.15,y),A.rotation.y=M<7?0:Math.PI;let S=J>w(34)-0.2;l7(A,J,S?"face":M===9&&J>K0(31,/^unmutes/i)?"point":"down",0,0,0.01),A.userData.legs.forEach((f)=>f.rotation.x=-1.4)}),D[2]=J9(0,2,-2.5),W.position.set(j(-2,2,U),j(8,7,U),9),Y.set(0,1.4,-2.5),W.fov=44;break}case"closet":case"cloud":case"xp":{this.closet.visible=!0,this.fan.rotation.z=-J*14,this.plantGuy.visible=!0,this.plantGuy.position.set(2.2,0,-1.8),this.plantGuy.rotation.y=-0.4;let B=Q==="cloud"&&J>K0(47,/^laughed/i)-0.2;if(l7(this.plantGuy,J,B?"face":"down",0,0,B?0.12:0.02),R(-1.5,-0.6,Q==="cloud"?"up":"point"),this.lead.rotation.y=0.5,Q==="cloud")this.cloud.visible=!0,this.cloud.position.set(0,j(16,10.5,Y9(W0(J,Z,Z+1.5))),-2.5),W.position.set(j(-3,-2,U),2,9),Y.set(0,j(3,7,U),-2.5),W.fov=52;else if(Q==="xp"){this.agents[2].visible=!0,this.agents[2].position.set(j(-9,-0.5,Y9(W0(J,Z,Z+1.6))),0,-1.2),l7(this.agents[2],J,"jazz",0,0,0.05);let A=N9(K0(50,/^windows/i)-0.5,K0(50,/^windows/i)+0.4,J);W.position.set(j(-1,1.4,A),j(3,2,A),j(7,-2.2,A)),Y.set(j(0,1.4,A),j(2.2,1.88,A),j(-3,-4,A)),W.fov=j(46,30,A)}else W.position.set(j(2,0.5,U),2.6,j(8,6.5,U)),Y.set(-0.4,2.4,-4),W.fov=44;D[2]=J9(0,1.8,-4);break}case"truths":case"swamp":case"raci":case"pilot":case"oil":{if(this.cratesUpTo(J,9,!0),R(0,2.2,Q==="oil"?"out":Q==="pilot"?"point":"shrug"),D[2]=J9(0,1.6,2.2),Q==="truths"){let B=Math.floor((J-Z)*3)%9;D[0]=this.crates[B].position.clone().setY(1),W.position.set(j(-6,6,U),4,16),Y.set(0,1.5,-3)}else if(Q==="swamp"){this.swamp.visible=!0,this.tomb.visible=J>K0(52,/^crm/i)-0.4,this.tomb.position.set(3,j(-2.4,0,b9(W0(J,K0(52,/^crm/i)-0.4,K0(52,/^crm/i)+0.3))),0);for(let B of this.crates)B.position.y=-0.4+Math.sin(J*2+B.position.x)*0.08;this.wash.color.setHex(12120256),W.position.set(4,3,9),Y.set(2,1.2,-1)}else if(Q==="raci")L(0,-1,"down"),W.position.set(0,3,15),Y.set(0,2.5,-1);else if(Q==="pilot")this.planes.forEach((B,A)=>{B.visible=!0;let M=(J-Z)*0.35;if(B.position.set(Math.sin(M*2.4)*6,5+Math.sin(M*3.1)*1.2,-1+Math.cos(M*2.4)*2.5),B.rotation.set(0,Math.atan2(Math.cos(M*2.4)*2.4*6,-Math.sin(M*2.4)*2.4*2.5)+Math.PI/2,Math.sin(M*4)*0.3),A===1)B.position.add(J9(0,0.05,0))}),D[1]=this.planes[0].position.clone(),W.position.set(0,4,13),Y.set(0,4.4,-1);else{this.deck.visible=!0;let B=J<K0(56,/^\W*tears/i)-0.1?"pilot":J<w(57)-0.1?"tears":"oil";this.deck.material.map=this.decks[B],this.deck.material.emissiveMap=this.decks[B],this.deck.material.needsUpdate=!0,this.barrels.visible=B==="oil",this.vendorGuy.visible=!0,this.vendorGuy.position.set(-4,0,0.5),l7(this.vendorGuy,J,B==="tears"?"face":"jazz",0,0,0.06),D[1]=J9(2.5,4,-6.5),W.position.set(j(-1,1,U),3.6,15),Y.set(1,3.4,-3)}break}case"stan":{this.cratesUpTo(J,9,!0),this.stanSign.visible=!0,this.stanSign.position.set(-4,2.4,0),R(-1.2,1.5,"shrug"),this.lead.rotation.y=-0.6,D[2]=J9(-4,0.5,0),W.position.set(-1,2.6,10),Y.set(-1.5,1.8,0),W.fov=40;break}case"call":{this.meeting.visible=!0,this.clockHand.rotation.z=-H*3,R(0,0.6,"face",0.01),D[2]=J9(0,1.4,0.6),W.position.set(0,j(9,8,U),j(14,12,U)),Y.set(0,1,-1.5);break}case"agents":{this.agents.forEach((B,A)=>{B.visible=!0,B.position.set(j(-14,-4+A*4,Y9(W0(J,Z+A*0.3,Z+1.8+A*0.3))),0,-1);let M=C(A);l7(B,J,"jazz",M.amount*0.6,M.leg,0.03)}),L(0,-4.5,"jazz"),R(0,2.4,"out"),D[0]=J9(-4,1.6,-1),D[1]=J9(4,1.6,-1),D[2]=J9(0,1.6,2.4),W.position.set(j(-5,5,U),3.6,15),Y.set(0,2.4,-1.5);break}case"lock":{this.padlock.visible=!0,this.padlock.position.set(0,j(14,2.2,b9(W0(J,Z,Z+0.7))),-1),this.padlock.rotation.z=Math.sin(J*6)*0.04,this.agents.forEach((B,A)=>{B.visible=!0,B.position.set(-4+A*4,0,0.8),l7(B,J,"shrug",0,0,0.03)}),D[2]=J9(0,2.2,-1),W.position.set(0,2.8,12),Y.set(0,2.6,-1);break}case"confluence":{this.cratesUpTo(J,9,!0),this.door.visible=!0,this.door.position.set(0,0,-1),R(-2.2,1.4,J>K0(72,/^direct/i)?"shrug":"point"),this.lead.rotation.y=0.5,D[2]=J9(0,2.4,-1),W.position.set(j(2,1,U),3.2,j(11,9,U)),Y.set(0,2.8,-1);break}case"github":{this.cratesUpTo(J,9,!0),this.github.visible=!0,this.github.position.set(0,0,0),R(-2.6,1.6,"point"),this.lead.rotation.y=0.7,D[2]=J9(0,0.6,0),W.position.set(1.2,2.6,7.5),Y.set(0,1.4,0),W.fov=40;break}case"curtaincall":case"end":{L(0,-1.5,"down"),this.line.forEach((B)=>{B.rotation.x=N9(w(79),w(79)+1,J)*0.35*(1-N9(w(80),w(80)+1,J))}),R(0,3,J>w(82)?"face":"down",0.02),D[2]=J9(0,1.6,3),W.position.set(0,j(4.5,3,U),j(22,15,U)),Y.set(0,3,2);break}}if(Q!=="curtaincall"&&Q!=="end")for(let B of this.line)B.rotation.x=0;if(Q!=="swamp"){this.wash.color.setHex(16771272);for(let B of this.crates)if(B.visible)B.position.y=Math.max(0,B.position.y)}this.spots.forEach((B,A)=>{let M=D[A];if(B.light.intensity=M?O?110:75:0,B.beam.visible=!!M,!M)return;B.light.target.position.copy(M),B.light.target.updateMatrixWorld();let I=B.light.position,y=M.clone().sub(I),S=y.length(),f=Math.tan(B.light.angle)*S;B.beam.position.copy(I),B.beam.quaternion.setFromUnitVectors(J9(0,-1,0),y.normalize()),B.beam.scale.set(f,S,f),B.beam.material.opacity=O?0.045:0.025}),this.bloom.strength=0.3+N*0.15,W.aspect=1.7777777777777777,W.updateProjectionMatrix(),W.lookAt(Y)}cratesUpTo(J,$,Q,Z=13){this.crates.slice(0,$).forEach((K,U)=>{K.visible=!0;let H=K.userData.home;if(Q){K.position.copy(H);return}let W=GH[U],Y=U<4?Z:Z+1,N=K0(Y,W.word)-0.25;K.visible=J>=N-0.6,K.position.set(H.x,H.y+j(14,0,b9(W0(J,N-0.6,N))),H.z)})}lastDropped(J,$){let Q=null;return GH.forEach((Z,K)=>{if(J>=K0(K<4?$:$+1,Z.word)-0.25)Q=this.crates[K].position}),Q}confettiAt(J,$){this.confetti.visible=!0;for(let Q=0;Q<400;Q++){let Z=J-$-L0(Q)*0.6;d7.position.set(-12+L0(Q+1)*24,14-Math.max(0,Z)*(1.4+L0(Q+2))+Math.sin(J*3+Q)*0.2,-5+L0(Q+3)*9),d7.rotation.set(J*3+Q,J*2+Q*0.3,0),d7.scale.setScalar(Z>0?1:0.001),d7.updateMatrix(),this.confetti.setMatrixAt(Q,d7.matrix)}this.confetti.instanceMatrix.needsUpdate=!0}render(){this.composer.render()}}function mD(J){for(let $ of N7){if($.words[0].s>J+0.5)break;for(let Q of $.words)if(Q.backing&&/nobody|knows/i.test(Q.w)&&J>=Q.s-0.1&&J<=Q.e+0.6)return 1}return 0}var dD=/^(data|everywhere|everywhere\.|nobody|knows|kidding|xp|wreck|swamp|deceased|tears|scary|never|mute|wrong)$/,lD=/^(ai|databricks|dataiku|sap|s3|redshift|azure|servicenow|confluence|github|cloud|agent|agents|autonomous|crm|lake)$/,cD=/^(kevin|denise|gary|stan|stan's|jess|ticket|tickets|meeting|calendar|slack|plant|bandwidth|raci|pilot|fourteen|nine|three|q3|vendor|cio|oil|follow-up|recurring)$/,YJ=(J,$,Q="")=>`<div class="tile ${Q}" data-at="${$}"><b>${J.replace(/[^A-Z?]/g,"").slice(0,2)||"?"}</b><span>${J}</span><i>${Q.includes("live")?"\uD83C\uDF99":"\uD83D\uDD07"}</i></div>`,f5={title:"Data Here, Data There",fonts:['400 100px "Limelight"','400 60px "DM Serif Display"','400 100px "Anton"','700 20px "JetBrains Mono"','700 20px "Inter"','italic 700 60px "Playfair Display"'],overlays:()=>`
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
      ${YJ("Chris (presenting)","L59","live")}${YJ("Denise","L59+0.2")}${YJ("Platform team","L59+0.4")}
      ${YJ("Gary · away","L59+0.6")}${YJ("Databricks team","W61:databricks","live")}${YJ("Dataiku team","W61:dataiku")}
      ${YJ("SAP team · leaving","L62","live")}${YJ("Kevin (2003)","L63")}${YJ("Stan?","L64")}
    </div>
    <div class="share" data-at="L59">\uD83D\uDDA5 Can everyone see my screen? <b data-at="L60">You are muted</b></div></div>
  <div class="ov stamp big" data-show="W69:kidding|L70-0.1" data-at="W69:kidding">ACCESS DENIED</div>
  <div class="ov card invite" data-show="L79|E82"><div class="bar">\uD83D\uDCC5 new event · recurring</div>
    <h3>AI Readiness</h3>
    <div class="row">every week · <b>no end date</b></div>
    <div class="row" data-at="L81">data classification: <b>unknown</b></div>
    <div class="row muted" data-at="L82">owner: does anyone know?</div></div>`,endAt:()=>N7.at(-2).words.at(-1).e+0.2,words:{hot:dD,ice:lD,gold:cD},hide:/^(spoken|sobbing|sob|ensemble|whispering|quietly|way|too|excited)$/,hud:(J,$)=>{let Q=[13,14,15,16,70,71,72].reduce((Z,K)=>Z+N7[K].words.filter((U)=>!U.backing&&U.s<=J&&/^(databricks|dataiku|sap|s3|redshift|azure|servicenow|homegrown|plant|confluence)/i.test(U.w)).length,0);return{left:`data here, data there &nbsp;·&nbsp; ${$.section} &nbsp;·&nbsp; <b>${$.label}</b>`,right:`systems <span class="ice">${Math.min(9,Q)}</span> &nbsp;·&nbsp; access <b>${J>K0(69,/^kidding/i)?"denied":"pending"}</b>`}},shots:fZ,shotAt:yZ,world:(J)=>{let $=new qH(J);return{update:(Q)=>$.update(Q),render:()=>$.render(),flash:(Q)=>$.flash(Q),fade:(Q)=>$.fade(Q)}}};var b5={"24-the-steep-part":T5,"04-read-the-diff":A5,"25-data-here-data-there":f5,"02-never-again":E5,"08-explain-the-function":V5};var GJ=window.__SONG__,[,,LJ="",KQ=""]=GJ?["","",GJ.slug,GJ.clipId]:location.pathname.split("/"),d5=new URLSearchParams(location.search),nD=d5.has("render");async function sD(){if(GJ)return GJ;let J=await fetch(`/api/timings/${LJ}/${KQ}`);if(!J.ok)throw Error(`No timings for ${LJ}/${KQ}`);return J.json()}var l5=b5[LJ];if(!l5)throw Error(`No music video for ${LJ}`);var H8=l5;document.title=`${H8.title} · video`;document.querySelector(".stage").setAttribute("data-song",LJ);var{shots:FH,shotAt:iD}=H8,DH=await sD();if(!DH.features)throw Error("No audio features yet; run bun timings");PH(DH.lines,DH.features);var XJ=F7();await Promise.all(H8.fonts.map((J)=>document.fonts.load(J)));var c7=(J)=>document.querySelector(J),oD=c7(".stage"),Q6=H8.world(c7("#gl"));function h8(J){let $=J.trim().match(/^(?:([LEW])(\d+)(?::([\w'-]+))?|([\d.]+))([+-][\d.]+)?$/);if(!$)throw Error(`Bad time "${J}"`);let[,Q,Z,K,U,H]=$,W=Number(Z);return(U?Number(U):Q==="L"?w(W):Q==="E"?K9(W):K0(W,new RegExp(`^\\W*${K}`,"i")))+Number(H??0)}var Z6=c7("#overlays");Z6.innerHTML=`${H8.overlays(XJ)}
  <div class="ov endcard" data-show="${H8.endAt()}|${XJ+5}"><big>${H8.title}</big><span class="by">by Chris Towles</span>made with Claude Code and Opus 5.5<small class="made">${LH(LJ)}</small></div>`;var c5=[...Z6.querySelectorAll("[data-show]")].map((J)=>{let[$,Q]=J.dataset.show.split("|");return{el:J,at:h8($),until:h8(Q)}}),aD=[...Z6.querySelectorAll("[data-at]:not([data-count]):not(.fill):not(.draw):not(.type)")].filter((J)=>!J.hasAttribute("data-show")).map((J)=>({el:J,at:h8(J.dataset.at)})),rD=[...Z6.querySelectorAll(".fill")].map((J)=>({el:J,at:h8(J.dataset.at),until:h8(J.dataset.until)})),tD=[...Z6.querySelectorAll("[data-count]")].map((J)=>{let[$,Q]=J.dataset.count.split(",").map(Number);return{el:J,from:$,to:Q,at:h8(J.dataset.at),until:h8(J.dataset.until),fmt:J.dataset.fmt??""}}),eD=[...Z6.querySelectorAll(".type")].map((J)=>({el:J,text:J.textContent??"",at:h8(J.dataset.at)})),JE=[...Z6.querySelectorAll(".draw")].map((J)=>{let $=J.getTotalLength();return J.style.strokeDasharray=String($),{el:J,len:$,at:h8(J.dataset.at),until:h8(J.dataset.until)}}),$E=new Set(c5.filter((J)=>J.el.classList.contains("stamp")).map((J)=>J.el));function x5(J,$){if(J.style.opacity=String(j9($*1.6)),J.classList.contains("stamp"))J.style.transform=`rotate(-8deg) scale(${2.4-1.4*b9($)})`;else if(J instanceof SVGElement)J.style.transform=`scale(${b9($)})`;else J.style.transform=`translateY(${(1-b9($))*16}px) scale(${0.85+0.15*b9($)})`}function QE(J){for(let $ of c5){let Q=ZE(J,$.at,$.until);if($E.has($.el)){x5($.el,W0(J,$.at,$.at+0.18)),$.el.style.opacity=String(Math.min(Number($.el.style.opacity),Q));continue}$.el.style.opacity=String(Q*($.el.classList.contains("blink")&&Math.sin(J*14)<-0.3?0.25:1)),$.el.style.transform=`translateY(${(1-b9(W0(J,$.at,$.at+0.35)))*40}px)`}for(let $ of aD)if(x5($.el,W0(J,$.at,$.at+($.el.classList.contains("stamp")?0.18:0.25))),$.el.classList.contains("btn"))$.el.classList.toggle("on",J>=$.at&&($.el.classList.contains("pick")||J<$.at+0.45));for(let $ of rD)$.el.style.width=`${W0(J,$.at,$.until)*100*Number(getComputedStyle($.el).getPropertyValue("--max")||1)}%`;for(let $ of tD){let Q=$.from+($.to-$.from)*W0(J,$.at,$.until);$.el.textContent=$.fmt==="clock"?`${String(Math.floor(Q)).padStart(2,"0")}:${String(Math.floor(Q%1*60)).padStart(2,"0")}`:$.fmt==="months"?`${Math.floor(Q)} months`:$.fmt==="secs"?`0:${String(Math.floor(Q)).padStart(2,"0")}`:Math.floor(Q).toLocaleString()}for(let $ of eD)$.el.textContent=$.text.slice(0,Math.max(0,Math.floor((J-$.at)*34)));for(let $ of JE)$.el.style.strokeDashoffset=String($.len*(1-W0(J,$.at,$.until)))}var ZE=(J,$,Q)=>j9((J-$)/0.2)*j9((Q-J)/0.25),{hot:KE,ice:UE,gold:HE}=H8.words,h5=(J)=>J.toLowerCase().replace(/[^a-z0-9'-]/g,""),NJ=document.createElement("div");NJ.className="cap";c7("#caption").appendChild(NJ);var g5=-1,p5=[],u5=(J)=>N7[J].spoken||N7[J].words.some(($)=>$.backing&&/^\W*spoken/i.test($.w));function WE(J){let $=-1;for(let K=0;K<N7.length;K++)if(w(K)-0.15<=J)$=K;let Q=$+1<N7.length?w($+1)-0.15:1/0,Z=$<0?0:Math.min(Q,K9($)+(u5($)?2.5:3.5));if($<0||J>Z||J>=H8.endAt()){NJ.style.opacity="0";return}if($!==g5){g5=$;let K=N7[$],U=/chorus/i.test(K.section),H=u5($);NJ.className=`cap ${U&&!H?"chorus":""} ${H?"spoken":""}`,NJ.innerHTML="";let W=null;p5=K.words.filter((N)=>!(N.backing&&H8.hide?.test(h5(N.w)))).map((N)=>{let X=document.createElement("span"),q=h5(N.w);if(X.className=`w ${KE.test(q)?"hot":UE.test(q)?"ice":HE.test(q)?"gold":""}`,X.textContent=N.w,N.backing)(W??=NJ.appendChild(Object.assign(document.createElement("div"),{className:"backing"}))).appendChild(X);else NJ.appendChild(X);return{el:X,s:N.s}});let Y=K.words.length;NJ.style.fontSize=H?"68px":U?"112px":`${Y>14?62:Y>10?76:92}px`}NJ.style.opacity=String(1-W0(J,Z-0.15,Z));for(let K of p5){let U=W0(J,K.s-0.06,K.s+0.1);K.el.style.opacity=String(j9(U*1.8)),K.el.style.transform=`translateY(${(1-b9(U))*0.35}em) scale(${1.25-0.25*b9(U)})`,K.el.style.filter=U<1?`blur(${(1-U)*10}px)`:""}}c7("#hud-title").textContent=H8.title;var YE=c7("#hud-l"),NE=c7("#hud-r"),XE=c7(".progress i"),GE=c7("#flash"),qE=c7("#black"),FE=c7("#hud");function DE(J){let{left:$,right:Q}=H8.hud(J,iD(J));YE.innerHTML=$,NE.innerHTML=Q,XE.style.width=`${(j9(J/XJ)*100).toFixed(2)}%`}function m5(J){Q6.update(J),Q6.render(),QE(J),WE(J),DE(J),GE.style.opacity=String(Q6.flash(J)),qE.style.opacity=String(Q6.fade(J)),FE.style.opacity=String(1-Q6.fade(J))}if(nD)c7("#hint").remove(),Object.assign(window,{__renderAt:m5,__end:XJ,__shots:FH().map((J)=>({name:J.name,at:J.at,label:J.label,section:J.section})),__ready:!0});else{let J=new Audio(GJ?.audio??`/audio/${LJ}/${KQ}.mp3`);J.preload="auto",J.currentTime=Number(d5.get("t")??0);let $=()=>{let R=Math.min(innerWidth/1920,innerHeight/1080);oD.style.transform=`translate(${(innerWidth-1920*R)/2}px, ${(innerHeight-1080*R)/2}px) scale(${R})`};window.addEventListener("resize",$),$();let Q=c7("#hint"),Z=(R)=>{J.currentTime=j9(R,0,XJ-0.05)},K=()=>{if(Q.remove(),J.paused)J.play();else J.pause()},U=(R)=>`${Math.floor(R/60)}:${String(Math.floor(R%60)).padStart(2,"0")}`,H=FH().filter((R,_,B)=>B.findIndex((A)=>A.section===R.section&&Math.abs(A.at-R.at)<30)===_&&(_===0||B[_-1].section!==R.section)),W=document.createElement("div"),Y=parent!==window&&!GJ;W.className=Y?"player slim":"player",W.innerHTML=`<div class="pl-row"><button class="pl-play">▶</button><span class="pl-time">0:00</span>
    <input class="pl-seek" type="range" min="0" max="${XJ}" step="0.05" value="0" aria-label="Seek">
    <span class="pl-time">${U(XJ)}</span>
    <button class="pl-mute" title="Mute (M)" aria-label="Mute">\uD83D\uDD0A</button><input class="pl-vol" type="range" min="0" max="1" step="0.05" value="1" aria-label="Volume">${GJ?"":`<a href="/song/${LJ}/take/${KQ}" target="_top"><button>lyrics</button></a>`}
    <button class="pl-hide" title="Hide controls (H)" aria-label="Hide controls">▾</button></div>
    <div class="pl-chips">${H.map((R)=>`<button data-t="${Math.max(0,R.at-0.3)}">${R.section}</button>`).join("")}</div>`;let N=Object.assign(document.createElement("button"),{className:"pl-show",textContent:"▴",title:"Show controls (H)"});N.setAttribute("aria-label","Show controls"),document.body.append(W,N);let X=(R)=>{W.hidden=R,N.hidden=!R;try{localStorage.setItem("player-collapsed",R?"1":"")}catch{}},q=!1;try{q=localStorage.getItem("player-collapsed")==="1"}catch{}X(q),W.querySelector(".pl-hide").onclick=()=>X(!0),N.onclick=(R)=>{R.stopPropagation(),X(!1)};let G=W.querySelector(".pl-play"),F=W.querySelector(".pl-seek"),O=W.querySelector(".pl-time");G.onclick=K;let V=W.querySelector(".pl-vol"),D=W.querySelector(".pl-mute"),E=(R,_=J.muted)=>{J.volume=j9(R),J.muted=_,V.value=String(_?0:J.volume),D.textContent=_||J.volume===0?"\uD83D\uDD07":J.volume<0.5?"\uD83D\uDD09":"\uD83D\uDD0A";try{localStorage.setItem("player-volume",JSON.stringify({v:J.volume,muted:_}))}catch{}},C={v:1,muted:!1};try{C={...C,...JSON.parse(localStorage.getItem("player-volume")??"{}")}}catch{}if(E(C.v,C.muted),V.oninput=()=>E(Number(V.value),!1),D.onclick=()=>E(J.volume||1,!J.muted),F.oninput=()=>{Q.remove(),Z(Number(F.value))},W.querySelectorAll("[data-t]").forEach((R)=>R.onclick=()=>{if(Q.remove(),Z(Number(R.dataset.t)),J.paused)J.play()}),W.addEventListener("click",(R)=>R.stopPropagation()),window.addEventListener("click",K),window.addEventListener("keydown",(R)=>{if(R.code==="Space")R.preventDefault(),K();if(R.code==="ArrowRight")Z(J.currentTime+5);if(R.code==="ArrowLeft")Z(J.currentTime-5);if(R.code==="KeyH")X(!W.hidden);if(R.code==="KeyM")E(J.volume||1,!J.muted);if(R.code==="ArrowUp")R.preventDefault(),E(J.volume+0.1,!1);if(R.code==="ArrowDown")R.preventDefault(),E(J.volume-0.1,!1)}),parent!==window&&!GJ){let R=FH(),_=R.map((M,I)=>({key:`${M.name}@${M.at.toFixed(1)}`,name:M.name,label:M.label,section:M.section,at:Math.max(0,M.at),end:R[I+1]?.at??XJ,thumb:""})),B=(M)=>parent.postMessage({from:"video",clipId:KQ,...M},location.origin);B({type:"shots",shots:_}),setTimeout(()=>{let M=c7("#gl"),I=Object.assign(document.createElement("canvas"),{width:384,height:216}),y=I.getContext("2d");for(let S of _)Q6.update((S.at+Math.min(S.end,S.at+6))/2),Q6.render(),y.drawImage(M,0,0,384,216),S.thumb=I.toDataURL("image/jpeg",0.7);B({type:"shots",shots:_})},300);let A=-1;setInterval(()=>{let M=J.currentTime;if(M!==A)B({type:"time",t:A=M})},250),window.addEventListener("message",(M)=>{if(M.origin!==location.origin||M.data?.type!=="seek")return;if(Q.remove(),Z(Number(M.data.t)),J.paused)J.play()})}let L=()=>{let R=J.ended?XJ:J.currentTime;m5(R),G.textContent=J.paused?"▶":"❚❚",F.value=String(R),O.textContent=U(R),requestAnimationFrame(L)};L()}
