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
		if (cls.replace(/\s/g, '').length == 0) return false;
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
		if (this.hasClass(ele, cls)) {
		    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
		    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
		    	newClass = newClass.replace(' ' + cls + ' ', ' ');
		    }
		    ele.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	},
	/*
	 * 进入a，a里面执行b，b返回，然后a并没有返回
	 * 所以，console.log(a());不会有任何东西
	 * function a(){
	 * 		function b(){
	 * 			return 'aaaaa';
	 * 		}
	 * 		b();
	 * 	}
	 * 	console.log(a());
	 */
	offTop : function(id, height=0){
		var classBox = id.offsetParent.offsetParent;
		if(classBox == null){
			var top = parseInt(id.offsetTop)+height;
			//console.log('|=>'+top);
			return top;
		}else{
			return this.offTop(id.offsetParent, height + id.offsetTop);//*****
		}
		
	},
	/*
	 * 判断是否默认为透明
	 */
	opacity : function(i,duration,delay,opacity){
		var name  = document.getElementsByClassName(this.id);
		var times = delay*1000;
		setTimeout( function(){ 
	        //console.log(i);
	        name[i].style = 'animation-duration:'+duration+'s; animation-delay:'+delay+'s; opacity:1';
	        name[i].setAttribute('swAction-data','1');
	    }, times );
	},
	/*
	 * 处理事件
	 */
    action : function(){
    	var height = this.getScrollTop() + this.getClientHeight();
    	var name   = document.getElementsByClassName(this.id);
    	for(var i=0; i<name.length; i++) {
			var top = this.offTop(name[i]);
	        if (top < height) { 
	            var effect    = name[i].getAttribute('swAction-effect');
	            var duration  = name[i].getAttribute('swAction-duration');
	            var delay     = name[i].getAttribute('swAction-delay');
	            var opacity   = name[i].getAttribute('swAction-opacity');
	            var data      = name[i].getAttribute('swAction-data');
	            var nameArr   = name[i].getAttribute('class');
	            if(data != 1){
		            this.addClass(name[i], effect);
		            if(opacity){
		            	name[i].style = 'opacity:'+opacity;
		            }
		            this.opacity(i,duration,delay,opacity);
	            }
	        }
		}
    }
    /*
     *结束
     */
}
