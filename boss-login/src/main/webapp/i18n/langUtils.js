langUtils = function(DOC){
	var _formTagName = "<INPUT>,<TEXTAREA>,<SELECT>";
	// 数组匹配模式，匹配：[0]格式
	var _arrayPattern = /\[\d\]/;
	
	function isTargetType(o, type){
		return typeof(o) === type; 
	}
	isObject = function(o){
		return isTargetType(o, "object");
	}
	isString = function(o){
		return isTargetType(o, "string");
	}
	isArray = function(o){
		return Object.prototype.toString.apply(o) === '[object Array]';
	}
	
	// find a lang string from current scope start.
	function findLangString(langKeys){
		var current = this;
		if(!isObject(current)){
			return "";
		}
		
		// split langKeys
		var levels = langKeys.split(".");
		var lastKeyIndex = levels.length - 1;
		var nextObj;
		for(var i = 0; i < levels.length; i++){
			var propName = levels[i];
			// Array
			if(_arrayPattern.test(propName)){
				if(!isArray(current)){
					return current;
				}
				var index = propName.substr(1, propName.length - 2);
				nextObj = current[index];
			}else{
				nextObj = current[levels[i]];
			}
			// validation
			if (!nextObj || (i !== lastKeyIndex && !isObject(nextObj))) {
				return nextObj;
			}
			current = nextObj;
		}
		return current;
	}
	
	function set(text, dom){
		if(!dom || !text){
			return text;
		}
		if(isString(dom)){
			dom = DOC.getElementById(dom);
		}
		var tagName = '<' + dom.tagName.toUpperCase() + '>';
		if(_formTagName.indexOf(tagName) >= 0){
			dom.value = text;
		}else{
			dom.innerHTML = text;
		}
		return text;
	}
	
	return {
		/**
		 * 获取boss-core-lang.js的国际化属性值，如果传入的dom元素是一个表单元素，
		 * 则设置value属性值，如果是其它元素则设置innerText属性值
		 * 
		 * @param langKeys 如传入:"home.topWelcome",如果是数组可以使用比如: "home.searchTabs.[0]"
		 * @param dom 一个可选参数，可以是ID或Dom对象
		 */
		bc: function(langKeys, dom){
			return set(findLangString.apply(BCLang, [langKeys]), dom);
		},
		main: function(mainLangKeys, dom){
			return set(findLangString.apply(BCLang.home.main, [mainLangKeys]), dom);
		},
		/**
		 * 获取resource-lang.js资源菜单的属性值
		 * 方法实现同fn: bc是一致的
		 */
		res: function(langKeys, dom){
			return set(findLangString.apply(ResLang, [langKeys]), dom);
		}
	}
}(document);