/*  (c) Copyright IBM Corp. 2010 - Licensed under the Apache License, Version 2.0 */

CodeMirror.defineMode("javascript",function(_1,_2){var _3=_1.indentUnit;var _4=_2.json;var _5=_2.typescript;var _6=function(){function kw(_7){return {type:_7,style:"keyword"};};var A=kw("keyword a"),B=kw("keyword b"),C=kw("keyword c");var _8=kw("operator"),_9={type:"atom",style:"atom"};var _a={"if":A,"while":A,"with":A,"else":B,"do":B,"try":B,"finally":B,"return":C,"break":C,"continue":C,"new":C,"delete":C,"throw":C,"var":kw("var"),"const":kw("var"),"let":kw("var"),"function":kw("function"),"catch":kw("catch"),"for":kw("for"),"switch":kw("switch"),"case":kw("case"),"default":kw("default"),"in":_8,"typeof":_8,"instanceof":_8,"true":_9,"false":_9,"null":_9,"undefined":_9,"NaN":_9,"Infinity":_9};if(_5){var _b={type:"variable",style:"variable-3"};var _c={"interface":kw("interface"),"class":kw("class"),"extends":kw("extends"),"constructor":kw("constructor"),"public":kw("public"),"private":kw("private"),"protected":kw("protected"),"static":kw("static"),"super":kw("super"),"string":_b,"number":_b,"bool":_b,"any":_b};for(var _d in _c){_a[_d]=_c[_d];}}return _a;}();var _e=/[+\-*&%=<>!?|]/;function _f(_10,_11,f){_11.tokenize=f;return f(_10,_11);};function _12(_13,end){var _14=false,_15;while((_15=_13.next())!=null){if(_15==end&&!_14){return false;}_14=!_14&&_15=="\\";}return _14;};var _16,_17;function ret(tp,_18,_19){_16=tp;_17=_19;return _18;};function _1a(_1b,_1c){var ch=_1b.next();if(ch=="\""||ch=="'"){return _f(_1b,_1c,_1d(ch));}else{if(/[\[\]{}\(\),;\:\.]/.test(ch)){return ret(ch);}else{if(ch=="0"&&_1b.eat(/x/i)){_1b.eatWhile(/[\da-f]/i);return ret("number","number");}else{if(/\d/.test(ch)||ch=="-"&&_1b.eat(/\d/)){_1b.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);return ret("number","number");}else{if(ch=="/"){if(_1b.eat("*")){return _f(_1b,_1c,_1e);}else{if(_1b.eat("/")){_1b.skipToEnd();return ret("comment","comment");}else{if(_1c.lastType=="operator"||_1c.lastType=="keyword c"||/^[\[{}\(,;:]$/.test(_1c.lastType)){_12(_1b,"/");_1b.eatWhile(/[gimy]/);return ret("regexp","string-2");}else{_1b.eatWhile(_e);return ret("operator",null,_1b.current());}}}}else{if(ch=="#"){_1b.skipToEnd();return ret("error","error");}else{if(_e.test(ch)){_1b.eatWhile(_e);return ret("operator",null,_1b.current());}else{_1b.eatWhile(/[\w\$_]/);var _1f=_1b.current(),_20=_6.propertyIsEnumerable(_1f)&&_6[_1f];return (_20&&_1c.lastType!=".")?ret(_20.type,_20.style,_1f):ret("variable","variable",_1f);}}}}}}}};function _1d(_21){return function(_22,_23){if(!_12(_22,_21)){_23.tokenize=_1a;}return ret("string","string");};};function _1e(_24,_25){var _26=false,ch;while(ch=_24.next()){if(ch=="/"&&_26){_25.tokenize=_1a;break;}_26=(ch=="*");}return ret("comment","comment");};var _27={"atom":true,"number":true,"variable":true,"string":true,"regexp":true};function _28(_29,_2a,_2b,_2c,_2d,_2e){this.indented=_29;this.column=_2a;this.type=_2b;this.prev=_2d;this.info=_2e;if(_2c!=null){this.align=_2c;}};function _2f(_30,_31){for(var v=_30.localVars;v;v=v.next){if(v.name==_31){return true;}}};function _32(_33,_34,_35,_36,_37){var cc=_33.cc;cx.state=_33;cx.stream=_37;cx.marked=null,cx.cc=cc;if(!_33.lexical.hasOwnProperty("align")){_33.lexical.align=true;}while(true){var _38=cc.length?cc.pop():_4?_39:_3a;if(_38(_35,_36)){while(cc.length&&cc[cc.length-1].lex){cc.pop()();}if(cx.marked){return cx.marked;}if(_35=="variable"&&_2f(_33,_36)){return "variable-2";}return _34;}}};var cx={state:null,column:null,marked:null,cc:null};function _3b(){for(var i=arguments.length-1;i>=0;i--){cx.cc.push(arguments[i]);}};function _3c(){_3b.apply(null,arguments);return true;};function _3d(_3e){var _3f=cx.state;if(_3f.context){cx.marked="def";for(var v=_3f.localVars;v;v=v.next){if(v.name==_3e){return;}}_3f.localVars={name:_3e,next:_3f.localVars};}};var _40={name:"this",next:{name:"arguments"}};function _41(){cx.state.context={prev:cx.state.context,vars:cx.state.localVars};cx.state.localVars=_40;};function _42(){cx.state.localVars=cx.state.context.vars;cx.state.context=cx.state.context.prev;};function _43(_44,_45){var _46=function(){var _47=cx.state;_47.lexical=new _28(_47.indented,cx.stream.column(),_44,null,_47.lexical,_45);};_46.lex=true;return _46;};function _48(){var _49=cx.state;if(_49.lexical.prev){if(_49.lexical.type==")"){_49.indented=_49.lexical.indented;}_49.lexical=_49.lexical.prev;}};_48.lex=true;function _4a(_4b){return function expecting(_4c){if(_4c==_4b){return _3c();}else{if(_4b==";"){return _3b();}else{return _3c(arguments.callee);}}};};function _3a(_4d){if(_4d=="var"){return _3c(_43("vardef"),_4e,_4a(";"),_48);}if(_4d=="keyword a"){return _3c(_43("form"),_39,_3a,_48);}if(_4d=="keyword b"){return _3c(_43("form"),_3a,_48);}if(_4d=="{"){return _3c(_43("}"),_4f,_48);}if(_4d==";"){return _3c();}if(_4d=="function"){return _3c(_50);}if(_4d=="for"){return _3c(_43("form"),_4a("("),_43(")"),_51,_4a(")"),_48,_3a,_48);}if(_4d=="variable"){return _3c(_43("stat"),_52);}if(_4d=="switch"){return _3c(_43("form"),_39,_43("}","switch"),_4a("{"),_4f,_48,_48);}if(_4d=="case"){return _3c(_39,_4a(":"));}if(_4d=="default"){return _3c(_4a(":"));}if(_4d=="catch"){return _3c(_43("form"),_41,_4a("("),_53,_4a(")"),_3a,_48,_42);}return _3b(_43("stat"),_39,_4a(";"),_48);};function _39(_54){if(_27.hasOwnProperty(_54)){return _3c(_55);}if(_54=="function"){return _3c(_50);}if(_54=="keyword c"){return _3c(_56);}if(_54=="("){return _3c(_43(")"),_56,_4a(")"),_48,_55);}if(_54=="operator"){return _3c(_39);}if(_54=="["){return _3c(_43("]"),_57(_39,"]"),_48,_55);}if(_54=="{"){return _3c(_43("}"),_57(_58,"}"),_48,_55);}return _3c();};function _56(_59){if(_59.match(/[;\}\)\],]/)){return _3b();}return _3b(_39);};function _55(_5a,_5b){if(_5a=="operator"&&/\+\+|--/.test(_5b)){return _3c(_55);}if(_5a=="operator"&&_5b=="?"){return _3c(_39,_4a(":"),_39);}if(_5a==";"){return;}if(_5a=="("){return _3c(_43(")"),_57(_39,")"),_48,_55);}if(_5a=="."){return _3c(_5c,_55);}if(_5a=="["){return _3c(_43("]"),_39,_4a("]"),_48,_55);}};function _52(_5d){if(_5d==":"){return _3c(_48,_3a);}return _3b(_55,_4a(";"),_48);};function _5c(_5e){if(_5e=="variable"){cx.marked="property";return _3c();}};function _58(_5f){if(_5f=="variable"){cx.marked="property";}if(_27.hasOwnProperty(_5f)){return _3c(_4a(":"),_39);}};function _57(_60,end){function _61(_62){if(_62==","){return _3c(_60,_61);}if(_62==end){return _3c();}return _3c(_4a(end));};return function commaSeparated(_63){if(_63==end){return _3c();}else{return _3b(_60,_61);}};};function _4f(_64){if(_64=="}"){return _3c();}return _3b(_3a,_4f);};function _65(_66){if(_66==":"){return _3c(_67);}return _3b();};function _67(_68){if(_68=="variable"){cx.marked="variable-3";return _3c();}return _3b();};function _4e(_69,_6a){if(_69=="variable"){_3d(_6a);return _5?_3c(_65,_6b):_3c(_6b);}return _3b();};function _6b(_6c,_6d){if(_6d=="="){return _3c(_39,_6b);}if(_6c==","){return _3c(_4e);}};function _51(_6e){if(_6e=="var"){return _3c(_4e,_4a(";"),_6f);}if(_6e==";"){return _3c(_6f);}if(_6e=="variable"){return _3c(_70);}return _3c(_6f);};function _70(_71,_72){if(_72=="in"){return _3c(_39);}return _3c(_55,_6f);};function _6f(_73,_74){if(_73==";"){return _3c(_75);}if(_74=="in"){return _3c(_39);}return _3c(_39,_4a(";"),_75);};function _75(_76){if(_76!=")"){_3c(_39);}};function _50(_77,_78){if(_77=="variable"){_3d(_78);return _3c(_50);}if(_77=="("){return _3c(_43(")"),_41,_57(_53,")"),_48,_3a,_42);}};function _53(_79,_7a){if(_79=="variable"){_3d(_7a);return _5?_3c(_65):_3c();}};return {startState:function(_7b){return {tokenize:_1a,lastType:null,cc:[],lexical:new _28((_7b||0)-_3,0,"block",false),localVars:_2.localVars,context:_2.localVars&&{vars:_2.localVars},indented:0};},token:function(_7c,_7d){if(_7c.sol()){if(!_7d.lexical.hasOwnProperty("align")){_7d.lexical.align=false;}_7d.indented=_7c.indentation();}if(_7c.eatSpace()){return null;}var _7e=_7d.tokenize(_7c,_7d);if(_16=="comment"){return _7e;}_7d.lastType=_16;return _32(_7d,_7e,_16,_17,_7c);},indent:function(_7f,_80){if(_7f.tokenize==_1e){return CodeMirror.Pass;}if(_7f.tokenize!=_1a){return 0;}var _81=_80&&_80.charAt(0),_82=_7f.lexical;if(_82.type=="stat"&&_81=="}"){_82=_82.prev;}var _83=_82.type,_84=_81==_83;if(_83=="vardef"){return _82.indented+(_7f.lastType=="operator"||_7f.lastType==","?4:0);}else{if(_83=="form"&&_81=="{"){return _82.indented;}else{if(_83=="form"){return _82.indented+_3;}else{if(_83=="stat"){return _82.indented+(_7f.lastType=="operator"||_7f.lastType==","?_3:0);}else{if(_82.info=="switch"&&!_84){return _82.indented+(/^(?:case|default)\b/.test(_80)?_3:2*_3);}else{if(_82.align){return _82.column+(_84?0:1);}else{return _82.indented+(_84?0:_3);}}}}}}},electricChars:":{}",jsonMode:_4};});CodeMirror.defineMIME("text/javascript","javascript");CodeMirror.defineMIME("application/json",{name:"javascript",json:true});CodeMirror.defineMIME("text/typescript",{name:"javascript",typescript:true});CodeMirror.defineMIME("application/typescript",{name:"javascript",typescript:true});