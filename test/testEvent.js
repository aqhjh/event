//时间对象的测试  backbone文档地址：http://www.css88.com/doc/backbone-0.5.3/


main();

function main(){
     testModel1();
}


function testEvent(){
	var object = {};

		_.extend(object,Backbone.Events);
		object.bind("alert",function(msg){

				alert("Triggered "+msg);
		});
		//object.unbind("alert");
		object.trigger('alert',"www.csser.com");
}


function testModel1(){

     var SlideBar = Backbone.Model.extend({
     	promptColor:function(){
     		 var cssColor = prompt("请输入一个CSS的颜色值");
     		 this.set({color:cssColor});

     	}
     },{
          printBaseInfo:function(){
               console.log("test class Info");
          }
     });
     window.sidebar = new SlideBar;


     SlideBar.promptColor();
     sidebar.bind("change:color",function(model,color){
     	$("#sidebar").css({background:color});
     })
     sidebar.set({color:"white"});
     sidebar.promptColor();
}

function testModel2(){
     var Note = Backbone.Model.extend({
          initialize:function(){

               console.log("note build");
          },
          author:function(){

          },
          coordinates:function(){

          },
          allowedToEdit:function(){
               return true;
          }

     });
     var privateNote = Note.extend({
          allowedToEdit:function(account){
               return account.owns(this);
          }
     });

}
