function swAction (id){
	this.id  = id;
	var self = this;
	window.onscroll = function(){
		self.action();
	}
	this.action();
}
swAction.prototype = {
	/*
	 * 获取滚动条高度
	 */
    getScrollTop : function(){
	    var scrollTop = 0;
	    if(document.documentElement && document.documentElement.scrollTop){
	        var scrollTop = document.documentElement.scrollTop;
	    }else if(document.body){
	        var scrollTop = document.body.scrollTop;
	    }
	    return scrollTop;
	},
	
    /*
	 * 取窗口可视范围的高度 
	 */
    getClientHeight : function (){
	    var clientHeight = 0;
	    if(document.body.clientHeight&&document.documentElement.clientHeight){
	        var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;        
	    }else{
	        var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;    
	    }
	    return clientHeight;
	},
    /*
	 * hasClass
	 */
    hasClass : function (ele, cls){
		cls = cls || '';
		if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
		return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
	},
    /*
	 * addClass
	 */
	addClass : function (ele, cls){
		if (!this.hasClass(ele, cls)) {
    		ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
		}
	},
	/*
	 * removeClass
	 */
	removeClass : function (ele, cls){
		if (this.hasClass(elem, cls)) {
		    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
		    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
		    	newClass = newClass.replace(' ' + cls + ' ', ' ');
		    }
		    elem.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	},
	/*
	 * 计算div到达顶部距离
	 * 不准，jq的.offset().top也不准
	 * 烦
	 */
	offTop : function(id, height=0){
		var classBox = id.offsetParent.offsetParent;
		if(classBox == null){
			var top = parseInt(id.offsetTop)+height;
			//console.log('|=>'+top);
			return top;
		}else{
			return this.offTop(id.offsetParent, height + id.offsetTop);
		}		
	},
	/*
	 * 处理事件
	 */
    action : function(){
    	var height = this.getScrollTop() + this.getClientHeight();
    	var name   = document.getElementsByClassName(this.id);
    	for(var i=0; i<name.length; i++) {
			//var top = name[index].offsetTop;//offsetTop相对定位之后，就计算到达有定位的父级距离	
			var top = this.offTop(name[i]);
			//console.log(top);
	        if (top < height) {
	            var className = name[i];
	            var effect    = className.getAttribute('swAction-effect');
	            var duration  = className.getAttribute('swAction-duration');
	            var delay     = className.getAttribute('swAction-delay');
	            var nameArr   = className.getAttribute('class');
	            this.addClass(className, effect);
	            className.style = 'animation-duration:'+duration+'; animation-delay:'+delay; 
	        }
		}
    }
    /*
     *结束
     */
}