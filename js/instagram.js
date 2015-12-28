var Instagram = (function(){

	var _collection = [];

	var preLoad = function(data){
		for(var em in data){
			for(var i=0,len=data[em].srclist.length;i<len;i++){
				var src = data[em].bigSrclist[i];
				var img = new Image();
				img.src = src;
			}
		}
	}

	var render = function(data){
		for(var em in data){
			var liTmpl = "";
			for(var i=0,len=data[em].srclist.length;i<len;i++){
				liTmpl += '<li>\
								<div class="img-box">\
									<a class="img-bg" rel="example_group" href="'+data[em].bigSrclist[i]+'" title="'+data[em].text[i]+'"></a>\
									<img lazy-src="'+data[em].srclist[i]+'" alt="">\
								</div>\
							</li>';
			}
			$('<section class="archives album"><h1 class="year">'+data[em].year+'<em>'+data[em].month+'月</em></h1>\
				<ul class="img-box-ul">'+liTmpl+'</ul>\
				</section>').appendTo($(".instagram"));
		}

		$(".instagram").lazyload();
		changeSize();

		setTimeout(function(){
			preLoad(data);
		},3000);
		
		$("a[rel=example_group]").fancybox();
	}

	var replacer = function(str){
		if(str.indexOf("outbound-distilleryimage") >= 0 ){
			var cdnNum = str.match(/outbound-distilleryimage([\s\S]*?)\//)[1];
			var arr = str.split("/");
			return "http://distilleryimage"+cdnNum+".ak.instagram.com/"+arr[arr.length-1];
		}else{
			var url = "http://photos-g.ak.instagram.com/hphotos-ak-xpf1/";
			var arr = str.split("/");
			return url+arr[arr.length-1];
		}
	}

	var ctrler = function(data){
		var imgObj = {};
		for(var i=0,len=data.length;i<len;i++){
			var d = new Date(data[i].created_time*1000);
			var y = d.getFullYear();
			var m = d.getMonth()+1;
			var src = replacer(data[i].images.low_resolution.url);
			var bigSrc = replacer(data[i].images.standard_resolution.url);
			var text = data[i].caption ? data[i].caption.text : ''; // data[i].caption 有可能为 null
			var key = y+"-"+m;
			if(imgObj[key]){
				imgObj[key].srclist.push(src);
				imgObj[key].bigSrclist.push(bigSrc);
				imgObj[key].text.push(text);
			}else{
				imgObj[key] = {
					year:y,
					month:m,
					srclist:[bigSrc],
					bigSrclist:[bigSrc],
					text:[text]
				}
			}
		}
		render(imgObj);
	}

	var getList = function(url){
		$(".open-ins").html("图片来自instagram，正在加载中…");
		$.ajax({
			url: url,
			type:"GET",
			dataType:"jsonp",
			finish:function(res){
        var re = {"pagination":{},"meta":{"code":200},"data":[{"attribution":null,"tags":[],"location":null,"comments":{"count":0,"data":[]},"filter":"Normal","created_time":"1447412551","link":"https:\/\/www.instagram.com\/p\/-BclteFAdT\/","likes":{"count":0,"data":[]},"images":{"low_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xtp1\/t51.2885-15\/s320x320\/e35\/12237547_144738259216729_896093256_n.jpg","width":320,"height":320},"thumbnail":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xta1\/t51.2885-15\/s150x150\/e35\/c110.0.860.860\/10499311_1673435126227059_1947208816_n.jpg","width":150,"height":150},"standard_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xtp1\/t51.2885-15\/s640x640\/sh0.08\/e35\/12237547_144738259216729_896093256_n.jpg","width":640,"height":640}},"users_in_photo":[],"caption":{"created_time":"1447412551","text":"\u66fe\u7ecf\u7684\u4f60\uff0c\u4eca\u5929\u5012\u95ed\u4e86\u5417\u2026","from":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"},"id":"1117299922120738394"},"type":"image","id":"1117299919310554963_1250136280","user":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"}},{"attribution":null,"tags":[],"location":null,"comments":{"count":0,"data":[]},"filter":"Normal","created_time":"1447045352","link":"https:\/\/www.instagram.com\/p\/92gNqilARk\/","likes":{"count":0,"data":[]},"images":{"low_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-15\/s320x320\/e35\/11820634_510611719107055_896241079_n.jpg","width":320,"height":320},"thumbnail":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-15\/s150x150\/e35\/11820634_510611719107055_896241079_n.jpg","width":150,"height":150},"standard_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-15\/s640x640\/sh0.08\/e35\/11820634_510611719107055_896241079_n.jpg","width":640,"height":640}},"users_in_photo":[],"caption":{"created_time":"1447045352","text":"2015 Q4\u3002\u76d7\u56fe","from":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"},"id":"1114219636243826043"},"type":"image","id":"1114219634339611748_1250136280","user":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"}},{"attribution":null,"tags":[],"location":{"latitude":30.25,"name":"Hangzhou, China","longitude":120.167,"id":214330328},"comments":{"count":0,"data":[]},"filter":"Normal","created_time":"1445357403","link":"https:\/\/www.instagram.com\/p\/9EMtIIFAR6\/","likes":{"count":1,"data":[{"username":"editaeiz","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xtf1\/t51.2885-19\/s150x150\/12231054_1507544192906113_1100291306_a.jpg","id":"220130221","full_name":"editaeiz"}]},"images":{"low_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpa1\/t51.2885-15\/s320x320\/e35\/12142064_898235240245252_906024725_n.jpg","width":320,"height":320},"thumbnail":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpt1\/t51.2885-15\/s150x150\/e35\/c236.0.608.608\/12070984_756946804427701_1544153239_n.jpg","width":150,"height":150},"standard_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpa1\/t51.2885-15\/s640x640\/sh0.08\/e35\/12142064_898235240245252_906024725_n.jpg","width":640,"height":640}},"users_in_photo":[],"caption":{"created_time":"1445357403","text":"\u3067\u3082\u5c11\u3057\u3053\u306e\u98ce\u3000\u6ce3\u3044\u3066\u3044\u307e\u3059","from":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"},"id":"1100060089522586863"},"type":"image","id":"1100060086645294202_1250136280","user":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"}},{"attribution":null,"tags":[],"location":{"latitude":30.518062157,"name":"Huazhong University of Science and Technology","longitude":114.400872791,"id":224590706},"comments":{"count":0,"data":[]},"filter":"Normal","created_time":"1420862672","link":"https:\/\/www.instagram.com\/p\/xqMtuRFAWc\/","likes":{"count":2,"data":[{"username":"polname","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xpt1\/t51.2885-19\/11906104_826756677439514_640030832_a.jpg","id":"22929577","full_name":""},{"username":"ivanleey","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xat1\/t51.2885-19\/11849876_1642546555992608_2080918981_a.jpg","id":"215692572","full_name":"\u674e\u632f\u5803Photographer"}]},"images":{"low_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpa1\/t51.2885-15\/s320x320\/e15\/10914590_713901335396672_1276098199_n.jpg","width":320,"height":320},"thumbnail":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpa1\/t51.2885-15\/s150x150\/e15\/10914590_713901335396672_1276098199_n.jpg","width":150,"height":150},"standard_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpa1\/t51.2885-15\/e15\/10914590_713901335396672_1276098199_n.jpg","width":640,"height":640}},"users_in_photo":[],"caption":{"created_time":"1420862672","text":"\u8fd8\u8bb0\u5f97\u5e74\u5c11\u65f6\u7684\u68a6\u5417 \u50cf\u6735\u6c38\u8fdc\u4e0d\u51cb\u96f6\u7684\u82b1","from":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"},"id":"894583395035907754"},"type":"image","id":"894583394599699868_1250136280","user":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"}},{"attribution":null,"tags":[],"location":{"latitude":30.595658784,"name":"\u6b66\u6c49\u6b22\u4e50\u8c37 Happy Valley","longitude":114.386257173,"id":36482741},"comments":{"count":0,"data":[]},"filter":"Normal","created_time":"1418370215","link":"https:\/\/www.instagram.com\/p\/wf6usklAW5\/","likes":{"count":0,"data":[]},"images":{"low_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xat1\/t51.2885-15\/s320x320\/e15\/10864830_1563146510582837_1127035289_n.jpg","width":320,"height":320},"thumbnail":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xat1\/t51.2885-15\/s150x150\/e15\/10864830_1563146510582837_1127035289_n.jpg","width":150,"height":150},"standard_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xat1\/t51.2885-15\/e15\/10864830_1563146510582837_1127035289_n.jpg","width":640,"height":640}},"users_in_photo":[],"caption":{"created_time":"1418370215","text":"\u6728\u7ffc\u53cc\u9f99\u6162\u6162\u722c\u5347\u5230\u6700\u9ad8\u70b9\uff0c\u4e0b\u6765\u7a81\u7136\u5931\u91cd\u7684\u90a3\u4e00\u77ac\u95f4\uff0c\u4e00\u5411\u4e0d\u73a9\u523a\u6fc0\u7684\u6211\u6ee1\u8111\u5b50\u90fd\u662f\u4f3d\u5229\u7565\u725b\u987f\uff0c\u5012\u8fd8\u597d\u3002\u65c1\u8fb9\u558a\u7740\u5929\u4e0d\u6015\u5730\u4e0d\u6015\u7684\u54ed\u4e86","from":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"},"id":"873679707568342550"},"type":"image","id":"873675148385060281_1250136280","user":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"}},{"attribution":null,"tags":[],"location":{"latitude":30.518062157,"name":"Huazhong University of Science and Technology","longitude":114.400872791,"id":224590706},"comments":{"count":0,"data":[]},"filter":"Normal","created_time":"1417518469","link":"https:\/\/www.instagram.com\/p\/wGiJ1dlAQG\/","likes":{"count":1,"data":[{"username":"kwangkod","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xtp1\/t51.2885-19\/12317687_1685806988361385_920929732_a.jpg","id":"1364099455","full_name":"\u674e\u6587\u4ed9 \ud83d\ude0a"}]},"images":{"low_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpf1\/t51.2885-15\/s320x320\/e15\/10809672_755276224542086_839991359_n.jpg","width":320,"height":320},"thumbnail":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpf1\/t51.2885-15\/s150x150\/e15\/10809672_755276224542086_839991359_n.jpg","width":150,"height":150},"standard_resolution":{"url":"https:\/\/scontent.cdninstagram.com\/hphotos-xpf1\/t51.2885-15\/e15\/10809672_755276224542086_839991359_n.jpg","width":640,"height":640}},"users_in_photo":[],"caption":{"created_time":"1417518469","text":"Sculpting in time","from":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"},"id":"866530188170888199"},"type":"image","id":"866530187776623622_1250136280","user":{"username":"paranoid_jk","profile_picture":"https:\/\/scontent.cdninstagram.com\/hphotos-xaf1\/t51.2885-19\/11189194_554728981333653_687063387_a.jpg","id":"1250136280","full_name":"paranoidjk"}}]};
				if(re.meta.code == 200){
					_collection = _collection.concat(re.data);
					var next = re.pagination.next_url;
					if(next){
						getList(next);
					}else{
						$(".open-ins").html("图片来自instagram，点此访问");
						ctrler(_collection);
					}
				}else{
					alert("access_token timeout!");
				}
			}
		});
	}
	

	var changeSize = function(){	
		if($(document).width() <= 600){
			$(".img-box").css({"width":"auto", "height":"auto"});
		}else{
			var width = $(".img-box-ul").width();
			var size = Math.max(width*0.26, 157);
			$(".img-box").width(size).height(size);
		}
	}

	var bind = function(){
		$(window).resize(function(){
			changeSize();
		});
	}

	return {
		init:function(){
			//getList("https://api.instagram.com/v1/users/438522285/media/recent/?access_token=438522285.2082eef.ead70f432f444a2e8b1b341617637bf6&count=100");
			var insid = $(".instagram").attr("data-client-id");
            var userId = $(".instagram").attr("data-user-id");

			if(!insid){
				alert("Didn't set your instagram client_id.\nPlease see the info on the console of your brower.");
				console.log("Please open 'http://instagram.com/developer/clients/manage/' to get your client-id.");
				return;
			}
			getList("https://api.instagram.com/v1/users/"+ userId +"/media/recent/?client_id="+insid+"&count=100");
			bind();
		}
	}
})();
$(function(){
	Instagram.init();
})
