var window = window || global;
var ccc = new Object();
// 去除首尾空格
ccc.trim = function(str) {
    if (str) {
    	if(str.trim){
			return str.trim();
		}
        // return str.replace(/(^\s*)|(\s*$)/g, '');
        return str.replace(/(^\s+)|(\s+$)/g, '');
    }
    return ;
};

// 去除全部空格或者换行,第二个参数表示替换空格或者换行的字符串
ccc.trimAll = function(str,toStr) {
    // return str.replace(/\s*/g, '');
    var toStr = toStr || "";
    return str.replace(/\s+/g,toStr);
};

// 去除全部换行,第二个参数表示替换换行的字符串
ccc.newLine = function(str,toStr){
	var toStr = toStr || "";
    return str.replace(/(\n+)|(\r+)|(\r\n)/g,toStr);
}

// 获取样式
ccc.getStyle = function(element, StyleName) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[StyleName]
    } else if (element.currentStyle) {
        return element.currentStyle[StyleName]
    }
    return
}
ccc.getStyleList = function(element) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)
    } else if (element.currentStyle) {
        return element.currentStyle
    }
    return
}
ccc.setStyle = function(element, StyleName, val) {
    element.style[StyleName] = val
}

//判断是否数字（或者转型后为数字）
ccc.isNumber = function(str) {
    return !isNaN(str); // 返回 true false
};

// 判断是否真数字（Number对象）
ccc.isRealNumber = function(str) {
    return !isNaN(str) && typeof(str) == "number"; // 返回 true false
};

// 判断数字是否无穷大
ccc.isInfinity = function(str) {
    return !isFinite(str);
};

// 判断是否为字符串
ccc.isString = function(obj) {
    return typeof obj === "string" && obj != null && obj != undefined;
};

// 判断是否数组
ccc.isArray = function(obj) {
    if (Array.isArray) {
        return Array.isArray(obj);
    } else {
        return obj instanceof Array;
    }
    //return (toString.apply(arr) === '[object Array]') || arr instanceof NodeList;
};

ccc.isBoolean = function(obj) {
    return typeof(obj) === "boolean";
}

// 判断是否函数
ccc.isFunction = function(obj) {
    return typeof(obj) === "function";
}

// 判断是否为空
ccc.isNullOrEmpty = function(str) {
    var that = this;
    return (str == null || str == undefined || that.trim(str) == "") ? true : false;
}

// 判断是否元素
ccc.isElement = function(obj) {
    return !!(obj && (obj.nodeType == 1 || obj.nodeType == 9));
};

// 判断是否空对象
ccc.isEmptyObject = function(obj) {
    var t;
    for (t in obj)
        return !1;
    return !0
        // if (JSON.stringify(obj) === '{}') {
        //     return true;
        // }
        // return false;//这种方式如果实例全是函数也会判断为空
};
/*var isEmptyValue = function(value) {
 var type;
 if(value == null) { // 等同于 value === undefined || value === null
	 return true;
 }
 type = Object.prototype.toString.call(value).slice(8, -1);
 switch(type) {
 case 'String':
	 return !$.trim(value);
 case 'Array':
	 return !value.length;
 case 'Object':
	 return $.isEmptyObject(value); // 普通对象使用 for...in 判断，有 key 即为 false
 default:
	 return false; // 其他对象均视作非空
 }
};*/

//判断是否为纯粹对象 错的,这个只是判断是否obj
ccc.isPlainObject = function(obj) {
    return (typeof(obj) === "object" && obj != null && obj != undefined);
}

/*isPlainObject: function(a) {
	var b;
	if(!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
	try {
		if(a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
	} catch(c) {
		return !1
	}
	if(k.ownLast)
		for(b in a) return j.call(a, b);
	for(b in a);
	return void 0 === b || j.call(a, b)
}*/

ccc.isAndroid = function() {
    return (/android/gi).test(navigator.appVersion.toLowerCase());
}

ccc.isIphone = function() {
    return (/iphone/gi).test(navigator.appVersion.toLowerCase());
}
ccc.isXBrowser = function(name) { //msie(或者trident) chrome firefox
    var reg = new RegExp(name, "gi");
    return reg.test(navigator.userAgent.toLowerCase());
}

ccc.isObject = function(obj) {
    // return Object.prototype.isPrototypeOf(obj);
    return obj instanceof Object;
};

// json转化为字符串
ccc.jsonToStr = function(json) {
    if (typeof json === 'object') {
        return JSON && JSON.stringify(json);
    }
};

// 字符串转化为json
ccc.strToJson = function(str) {
    if (typeof str === 'string') {
        return JSON && JSON.parse(str);
    }
};


//判断属性是否存在于原型中
ccc.hasPrototypeProperty = function(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
}


module.exports = function(){
	for(var i in ccc){
		this[i] = ccc[i];
	}
}