
var window = 'test';
(function(win){
	E = function(){
	//判断一个对象是否为空
    function _isEmptyObj(obj){
        for(var a in obj){
            return false;
        }
        return true;
    }

    //遍历数组对象
    function _each(ary, callback){
        for(var i=0,len=ary.length; i<len;){
            callback(i, ary[i]) ? i=0 : i++;
        }
    }


    //清除数组对象
    function _remove(el, type){
        var handler = el.listeners[type]['_handler_'];
        el.removeEventListener ?
            el.removeEventListener(type, handler, false) :
            el.detachEvent('on'+type, handler);
        delete el.listeners[type];
        if(_isEmptyObj(el.listeners)){
            delete el.listeners;
        }
    }
    // 添加事件
    function add(el, type, fn){
        el.listeners = el.listeners || {};
        var listeners = el.listeners[type] = el.listeners[type] || [];
        listeners.push(fn);
        if(!listeners['_handler_']){
            listeners['_handler_'] = function(e){
                var evt = e || window.event;
                for(var i=0,fn; fn=listeners[i++];){
                    fn.call(el, evt);
                }
            }
            el.addEventListener ?
                el.addEventListener(type, listeners['_handler_'], false) :
                el.attachEvent('on' + type,  listeners['_handler_']);
        }
    }

    // 删除事件
    function remove(el, type, fn){
        if(!el.listeners) return;
        var listeners = el.listeners && el.listeners[type];
        if(listeners) {
            _each(listeners, function(i, f){
                if(f==fn){
                    return listeners.splice(i, 1);
                }
            });
            if(listeners.length == 0){
                _remove(el,type);
            }
        }
    }

    //主动触发事件
    function dispatch(el ,type){
        try{
            if(el.dispatchEvent){
                var evt = document.createEvent('Event');
                evt.initEvent(type,true,true);
                el.dispatchEvent(evt);
            }else if(el.fireEvent){
                el.fireEvent('on'+type);
            }
        }catch(e){};
    }  

    //修复事件兼容
    function _fixEvent( evt, el ) {
    var props = "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        len   = props.length;
    function now() {return (new Date).getTime();}
    function returnFalse() {return false;}
    function returnTrue() {return true;}
    function Event( src ) {
        this.originalEvent = src;
        this.type = src.type;
        this.timeStamp = now();
    }

    Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = returnTrue;
            var e = this.originalEvent;
            if( e.preventDefault ) {
                e.preventDefault();
            }
            e.returnValue = false;
        },

        stopPropagation: function() {
            this.isPropagationStopped = returnTrue;
            var e = this.originalEvent;
            if( e.stopPropagation ) {
                e.stopPropagation();
            }      
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };


    var originalEvent = evt;
    evt = new Event( originalEvent );
    for(var i = len, prop; i;) {
        prop = props[ --i ];
        evt[ prop ] = originalEvent[ prop ];
    }
    if(!evt.target) {
        evt.target = evt.srcElement || document;
    }
    if( evt.target.nodeType === 3 ) {
        evt.target = evt.target.parentNode;
    }
    if( !evt.relatedTarget && evt.fromElement ) {
        evt.relatedTarget = evt.fromElement === evt.target ? evt.toElement : evt.fromElement;
    }
    if( evt.pageX == null && evt.clientX != null ) {
        var doc = document.documentElement, body = document.body;
        evt.pageX = evt.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
        evt.pageY = evt.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
    }
    if( !evt.which && ((evt.charCode || evt.charCode === 0) ? evt.charCode : evt.keyCode) ) {
        evt.which = evt.charCode || evt.keyCode;
    }
    if( !evt.metaKey && evt.ctrlKey ) {
        evt.metaKey = evt.ctrlKey;
    }
    if( !evt.which && evt.button !== undefined ) {
        evt.which = (evt.button & 1 ? 1 : ( evt.button & 2 ? 3 : ( evt.button & 4 ? 2 : 0 ) ));
    }      
    if(!evt.currentTarget) evt.currentTarget = el;
    return evt;
} 
    return {
        add: add,
        remove: remove,
        dispatch: dispatch
    };
}(window);
