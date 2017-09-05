class swAction {
    /*
     * constructor构造器
     */
    constructor(id){
        this.id = id;
        window.onscroll = ()=> this.action();
        this.action();
    }
    /*
	 * 获取滚动条高度
	 */
    getScrollTop(){
	    var scrollTop = 0;
	    if(document.documentElement && document.documentElement.scrollTop){
	        var scrollTop = document.documentElement.scrollTop;
	    }else if(document.body){
	        var scrollTop = document.body.scrollTop;
	    }
	    return scrollTop;
	}
    /*
	 * 取窗口可视范围的高度 
	 */
    getClientHeight (){
	    var clientHeight = 0;
	    if(document.body.clientHeight&&document.documentElement.clientHeight){
	        var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;        
	    }else{
	        var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;    
	    }
	    return clientHeight;
	}
    /*
	 * hasClass
	 */
    hasClass (ele, cls){
		cls = cls || '';
		if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
		return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
	}
    /*
	 * addClass
	 */
	addClass (ele, cls){
		if (!this.hasClass(ele, cls)) {
    		ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
		}
	}
	/*
	 * removeClass
	 */
	removeClass (ele, cls){
		if (hasClass(elem, cls)) {
		    let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
		    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
		    	newClass = newClass.replace(' ' + cls + ' ', ' ');
		    }
		    elem.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	}
	/*
	 * 计算div到达顶部距离
	 * 不准，jq的.offset().top也不准
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
	offTop(id, height=0){
		var classBox = id.offsetParent.offsetParent;
		if(classBox == null){
			let top = parseInt(id.offsetTop)+height;
			//console.log('|=>'+top);
			return top;
		}else{
			return this.offTop(id.offsetParent, height + id.offsetTop);//return 这个返回我理解不了
		}		
	}
	/*
	 * 处理事件
	 */
    action(){
    	let height = this.getScrollTop() + this.getClientHeight();
    	let name   = document.getElementsByClassName(this.id);
    	for(var i=0; i<name.length; i++) {
			//let top = name[index].offsetTop;//offsetTop相对定位之后，就计算到达有定位的父级距离	
			let top = this.offTop(name[i]);
			//console.log(top);
	        if (top < height) {
	            let className = name[i];
	            let effect    = className.getAttribute('swAction-effect');
	            let duration  = className.getAttribute('swAction-duration');
	            let delay     = className.getAttribute('swAction-delay');
	            let nameArr   = className.getAttribute('class');
	            this.addClass(className, effect);
	            className.style = 'animation-duration:'+duration+'; animation-delay:'+delay; 
	        }
		}
    }
}