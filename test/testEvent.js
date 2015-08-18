//时间对象的测试


main();

function main(){

	testModel1()
}


function testEvent(){
	var object = {};

		_.extend(object,Backbone.Events);
		object.bind("alert",function(msg){

				alert("Triggered "+msg);
		});
		object.unbind("alert");
		object.trigger('alert',"www.csser.com");
}


function testModel1(){

     var SlideBar = Backbone.Model.extend({
     	promptColor:function(){
     		 var cssColor = prompt("请输入一个CSS的颜色值");
     		 this.set({color:cssColor});

     	}
     });
     window.sidebar = new SlideBar;
     sidebar.bind("change:color",function(model,color){
     	$("#sidebar").css({background:color});
     })
     sidebar.set({color:"white"});
     sidebar.promptColor();
}
