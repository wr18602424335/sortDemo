﻿var WIN_32_ACTIVEX_VERSION = 2003009021;					//Windows系统下32位控件版本号
var WIN_64_ACTIVEX_VERSION = 2003009021;					//Windows系统下64位控件版本号
var WIN_PLUGIN_VERSION = 2003009021;						//Windows系统下插件版本号
var MAC_PLUGIN_VERSION = 0;									//Mac系统下插件版本号
var WIN_SETUP_PATH = "ocx/PowerEnterBOCZForSM2.exe";			    //Windows系统下安装程序下载路径
var MAC_SETUP_PATH = "https://ebank.bankcz.com:7443/PowerEnterBOCZ.zip";	//Mac系统下安装程序下载路径
var LocalObjVersion="";
var isInistall = false;

//安全输入控件
var PassCtrlClsid = "clsid:6E779095-CB10-4E37-9B46-8D2D3CF74845";
var UtilCtrlClsid = "clsid:41C20733-58CD-487E-BE44-3B441F3D0948";
var CtlName = "POWERENTERBOCZ.PowerUtilityXBOCZCtrl.1";

//安全输入插件
var MIME = "application/x-vnd-csii-powerenter-bocz";
var PowerEnterPluginDescription = "PowerEnter Plug-in for BOCZ";
var sm2PublicKey="AEE79FE0BFC0193C2F0551F56622284C8656D27D01DE02688B1A6D4E763E532FE2F8A27501C07B2D64025312AB70187129FF2FAA5CF2507D766FAC3DC8828151";

//控件默认属性
function powerConfig(args) {
	var defaults = { 
		"width":265,
		"height":20,
		"lineHeight":20,
		"maxLength":16,
		"minLength":6,
		"maskChar":"*",
		"backColor":"#FFFFFF",
		"textColor":"#333333",
		"caption":"沧州银行",
		"borderColor":"#FFFFFF",
		"accepts":"[:graph:]+",
		"softKeyboard":"true"
	};
	for (var p in args)
		if (args[p] != null) defaults[p] = args[p];
	return defaults;
}

function writePluginObject(oid, clsid, cfg) {
	document.write('<object id="' + oid + '" type="' + clsid
		+ '" width="' + cfg.width + '" height="' + cfg.height
		+ '" style="width:' + cfg.width + 'px;height:' + cfg.height + 'px;position:absolute;margin-top:6px;right:2px;" onkeydown="keyDownLogin()">');
	for (var name in cfg)
		document.write('<param name="' + name + '" value="' + cfg[name] + '">');
	document.write('</object>');
};

function writeObject(oid, clsid, cfg) {	
	document.write('<object id="' + oid + '" classid="' + clsid		
			+ '" width="' + cfg.width + '" height="' + cfg.height  + '" style="margin-top:10px;position:absolute;right:1px;" onkeydown="keyDownLogin()">');
	for (var name in cfg)
		document.write('<param name="' + name + '" value="' + cfg[name] + '">');
	document.write('</object>');
};

function writePassObject(oid, cfg) {
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		setPEXSetupUrl(oid);
		if(isInistall)
		{
			if (isIE())
			{
				writeObject(oid, PassCtrlClsid, powerConfig(cfg));
			}
			else
			{
				writePluginObject(oid, MIME, powerConfig(cfg));
			}
		}
	}
};

function writeUtilObject(oid, cfg) {
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		if (isIE())
		{
			writeObject(oid, UtilCtrlClsid, powerConfig(cfg));
		}
		else
		{
			writePluginObject(oid, MIME, powerConfig(cfg));
		}
	}
};

function getPassInput(id, ts, spanId, massage) 
{
    try{
		var powerobj = document.getElementById(id);	
		powerobj.setTimestamp(ts);
		powerobj.sm2PublicKey(sm2PublicKey);
		var nresult = powerobj.verify();
		if(nresult < 0)
		{
			var error;
			if(nresult == -1){
				error = "不能为空";
			}
			else if(nresult == -2){
				error = "输入长度不足";
			}
			else if(nresult == -3){
				error = "输入内容不合规";
			}
			else{
				error = powerobj.lastError(); 
			}
			PEGetElement(spanId).innerHTML = massage +error;
			return null;
		}
		value = powerobj.getPinValue();
		if(value=="")
		{
			PEGetElement(spanId).innerHTML= massage+powerobj.lastError(); 
			return null;
		}
		else
		{
			return value;
		}
	}
	catch(e)
	{
		PEGetElement(spanId).innerHTML= "控件尚未安装，请下载并安装控件！:"+e;
	}
	return null;
}

function getMFMInput(id, ts, spanId,massage) 
{
    try 
    {
		var powerobj = document.getElementById(id);	
		powerobj.setTimestamp(ts);
		value = powerobj.getMFM();
		if(value=="")
		{
			PEGetElement(spanId).innerHTML= massage + powerobj.lastError(); 
			return null;
		}
		else
		{
			return value;
		}
	}
	catch(e)
	{
		PEGetElement(spanId).innerHTML= massage + e.message;
	}
	return null;
}

function PEGetElement(id)
{
	return  window.document.getElementById(id);
}

function setPEXSetupUrl(oid)
{
	var DownloadPath = getDownLoadPath();
	var ObjVersion = getObjVersion();
	
	if(isRegisteredPowerEnter()==false){
		if((navigator.platform == "Win32") || 
		   (navigator.platform == "Windows") || 
		   (navigator.platform == "Win64") || 
		   (navigator.platform == "Mac68K") || 
		   (navigator.platform == "MacPPC") || 
		   (navigator.platform == "Macintosh") || 
		   (navigator.platform == "MacIntel")){
			document.write('<a href="'+DownloadPath+'" class="download_install">点击此处下载控件</a>');	
		}else{
			document.write('<a href="#" class="download_install">暂不支持此系统</a>');
		}
		isInistall = false;
	}else{
		var LocalObjVersion = getLocalObjVersion();
		if(LocalObjVersion < ObjVersion){
			document.write('<a href="'+DownloadPath+'" class="download_install">点击此处更新控件</a>');
			isInistall = false;
		} else {
			isInistall = true;
		}
	}
}

function isRegisteredPowerEnter(){
	try{
		if (isIE()){
			new ActiveXObject(CtlName);
		}else{
			var powerEnterPlugin = navigator.plugins[PowerEnterPluginDescription];
			if(powerEnterPlugin == null)
				return false;
		}
	}catch(e){
		return false;   
	}
	return true;
}

function getDownLoadPath()
{
	if((navigator.platform == "Win32") || (navigator.platform == "Windows") || (navigator.platform == "Win64"))
		return WIN_SETUP_PATH;				//Windows
	else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel"))
		return MAC_SETUP_PATH;		    //MAC

	return WIN_SETUP_PATH; 
}

function getObjVersion()
{
    if((navigator.platform == "Win64" || navigator.cpuClass == "x64")){
        if (isIE())
            return WIN_64_ACTIVEX_VERSION;         // Windows系统下64位控件版本
        else
            return WIN_PLUGIN_VERSION;             // Windows系统下插件版本
     }else if((navigator.platform == "Win32") || (navigator.platform == "Windows")){
        if (isIE())
            return WIN_32_ACTIVEX_VERSION;         // Windows系统下32位控件版本
        else
            return WIN_PLUGIN_VERSION;             // Windows系统下插件版本
     }else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")){
     	return MAC_PLUGIN_VERSION;		  		  // Mac系统下插件版本
     }
     return "";
}

writeUtilObject("versionObj",{"width":1,"height":1});

function getLocalObjVersion()
{
	if(LocalObjVersion == "")
	{
		try{
			LocalObjVersion = PEGetElement("versionObj").getVersion();
		}catch(e){
			LocalObjVersion = getObjVersion();
		}
	}
	return LocalObjVersion;
}

function isIE(){
	if (navigator.appName == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0)
		return true;
	else
		return false;
}

////////////////////////////////////////////////////////////////////////////////
var PWEBURLPATH = "https://111.62.40.153:7413/pweb/";
var EWEBURLPATH = "https://111.62.40.153:8413/eweb/";

// 个人网银请求交易
function remotePost(transid, params, successCallback){
	$.ajax({
		type: "POST",
		url: PWEBURLPATH + transid,
		data : params,
		contentType:"application/x-www-form-urlencoded",
		dataType: "json",
		// crossDomain: true,
		// xhrFields: {
		//     withCredentials : true,
		// },
		success: function(data){
			if(data.jsonError && data.jsonError instanceof Array){
				$("#loginSubmitId").attr("disabled",false).val("登录");
				PEGetElement("EEEE").innerText = data.jsonError[0]["_exceptionMessage"];
				return;
			}
			successCallback(data);
		},
		error: function(data){
			if($("#tokenImgDivId").css('display')!== 'none'){
				$("#tokenImgId").attr("src",PWEBURLPATH + 'GenTokenImg.do?random='+Math.random());
			}
			$("#loginSubmitId").attr("disabled",false).val("登录");
			PEGetElement("EEEE").innerText="个人网银服务响应异常 " + data.responseText;
		}
	})
}

// 清除错误提示信息
function clearErr(id){
	$("#"+id).css("color","#F00").html("");
}

//////企业网银///////////////////////////////////////
// 企业网银请求交易
function remoteEWebPost(transid, params, successCallback){
	$.ajax({
		type: "POST",
		url: EWEBURLPATH + transid,
		data : params,
		contentType:"application/x-www-form-urlencoded",
		// dataType: "json",
		// crossDomain: true,
		// xhrFields: {
		//     withCredentials : true,
		// },
		success: function(data){
			successCallback(data);
		},
		error: function(data){
			$("#loginEwebSubmitId").attr("disabled",false).val("立即登录");
			PEGetElement("EWBEEE").innerText="企业网银服务响应异常" +data.responseText;
		}
	})
}

//控件
var SignCtrlClsidEWEB="clsid:A2705E82-4461-4172-9B53-994BDD36E4A5";
var SignCtrlNameEWEB="PowerSignBOCZ.IESignBOCZ.1";
//插件
var MIMEEWEB = "application/x-vnd-csii-powersign-bocz";
var PluginDescriptionEWEB = "PowerSign Plug-in for BOCZ";
// 浏览器属性
var _app = navigator.appName;
var _userAgent = navigator.userAgent;
//下载地址
var downloadPathEWEB = "https://ebank.bankcz.com:7443/PowerAssist/PowerAssistBOCZ_Setup.exe";
function isRegisterediSecurityEWEB(){
	try{
		if (_app == 'Microsoft Internet Explorer'|| _userAgent.indexOf("Trident")>0){
			new ActiveXObject(SignCtrlNameEWEB);
		}else{
			var powerEnterPlugin = navigator.plugins[PluginDescriptionEWEB];
			if(powerEnterPlugin == null)
				return false;
		}
	}catch(e){
		return false;
	}
	return true;
}

//控件默认属性
function powerConfigEWEB(args) {
	var defaults = {
		"width":1,
		"height":1
	};
	for (var p in args)
		if (args[p] != null) defaults[p] = args[p];
	return defaults;
}

function writePluginObjectEWEB(oid, clsid, cfg) {
	var content = '<object id="' + oid + '" type="' + clsid+ '" width="' + cfg.width + '" height="' + cfg.height + '"style="position:absolute;"'+'></object>';
	document.write(content);
};

function writeObjectEWEB(oid, clsid, cfg) {
	var content ='<object id="' + oid + '" classid="' + clsid + '" width="' + cfg.width + '" height="' + cfg.height  +'"style="position:absolute;"'+'></object>';
	var body = document.body;
	var div = document.createElement("div");
	div.innerHTML=content;
	div.style.display="none";
	body.appendChild(div);
};

function writeSignObjectEWEB(oid, cfg){
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		if(isRegisterediSecurityEWEB()){
			if (_app == 'Microsoft Internet Explorer'|| _userAgent.indexOf("Trident")>0){
				writeObjectEWEB(oid, SignCtrlClsidEWEB, powerConfigEWEB(cfg));
			}else{
				writePluginObjectEWEB(oid, MIMEEWEB, powerConfigEWEB(cfg));
			}
		}
	}
}

function getDownLoadPathEWEB(){
	return downloadPathEWEB;
}

writeSignObjectEWEB("iesign",{"width":1,"height":1});

function writeUtilObjectEWEB(oid, cfg) {
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		if (isIE()){
			writeObjectEWEB(oid, "clsid:41C20733-58CD-487E-BE44-3B441F3D0948", powerConfigEWEB(cfg));
		}else{
			writePluginObjectEWEB(oid, "application/x-vnd-csii-powerenter-bocz", powerConfigEWEB(cfg));
		}
	}
};
writeUtilObjectEWEB("versionObj",{"width":1,"height":1});
function getMFMInputEWEB(id, ts, spanId,massage) {
	try {
		var powerobj = document.getElementById(id);	
		powerobj.setTimestamp(ts);
		value = powerobj.getMFM();
		if(value==""){
			PEGetElement(spanId).innerHTML= massage + powerobj.lastError(); 
			return null;
		}else{
			return value;
		}
	}catch(e){
		PEGetElement(spanId).innerHTML= massage + e.message;
	}
	return null;
}

function isRegisterediSecurityEWEB(){
	try{
		if (_app == 'Microsoft Internet Explorer'|| _userAgent.indexOf("Trident")>0){
			new ActiveXObject(SignCtrlNameEWEB);
		}else{
			var powerEnterPlugin = navigator.plugins[PluginDescriptionEWEB];
			if(powerEnterPlugin == null)
				return false;
		}
	}catch(e){
		return false;
	}
	return true;
}

function isSimplePass(id,ts,userid,spanId){
	try{
		var powerobj = document.getElementById(id);
		powerobj.setTimestamp(ts);
		powerobj.setDictionaryFilter(userid);
		var nresult = powerobj.verify();
		if(nresult<0){
			return true;
		}
		var level = getPinComplexDegree(id);
		if(level != 'S' && level != 'H'){
			return true;
		}
	}catch(e){
		PEGetElement(spanId).innerHTML="控件尚未安装，请下载并安装控件！："+e;
	}
	return false;
}

function getPinComplexDegree(id) {
   
    try {
		var powerpass = document.getElementById(id);	
		return	powerpass.getComplexDegree();
	}catch(e)
	{
		
	}
	return "W";
}