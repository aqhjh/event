
var window = 'test';
(function(win){
	var E={
		add:function(el,type,fn){

			if(el.addEventListener){
				el.addEventListener(type,fn,false);
			}
			else{
				el["e"+fn] = function(){
					fn.call(el,window.event);
				}
				el.attachEvent('on'+type,el["e"+fn]);
			}
		},
		remove:function(el,type,fn){
			if(el.removeEventListener){
				el.removeEventListener(type,fn,false);
			}
			else if(el.detachEvent){
				el.detachEvent('on'+type,el['e'+fn]);
			}
		},
		dispatch:function(el,type){

			try{
				if(el.dispatchEvent){
					var evt = document.createEvent('Event');
					evt.initEvent(type,true,true);
					el.dispatchEvent(evt);
				}
				else if(el.fireEvent){
					el.fireEvent('on'+type);
				}
			}
			catch(e){
				console.log(e);
			}
		}
	}
	return E;
})(window);