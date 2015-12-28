var Instagram = (function() {

  var _collection = [];
  var _db = {
    "2015-11": {
      "year": 2015,
      "month": 11,
      "srclist": ["http://photos-g.ak.instagram.com/hphotos-ak-xpf1/12237547_144738259216729_896093256_n.jpg", "http://photos-g.ak.instagram.com/hphotos-ak-xpf1/11820634_510611719107055_896241079_n.jpg"],
      "bigSrclist": ["http://photos-g.ak.instagram.com/hphotos-ak-xpf1/12237547_144738259216729_896093256_n.jpg", "http://photos-g.ak.instagram.com/hphotos-ak-xpf1/11820634_510611719107055_896241079_n.jpg"],
      "text": ["曾经的你，今天倒闭了吗…", "2015 Q4。盗图"]
    },
    "2015-10": {
      "year": 2015,
      "month": 10,
      "srclist": ["http://photos-g.ak.instagram.com/hphotos-ak-xpf1/12142064_898235240245252_906024725_n.jpg"],
      "bigSrclist": ["http://photos-g.ak.instagram.com/hphotos-ak-xpf1/12142064_898235240245252_906024725_n.jpg"],
      "text": ["でも少しこの风　泣いています"]
    },
    "2015-1": {
      "year": 2015,
      "month": 1,
      "srclist": ["http://photos-g.ak.instagram.com/hphotos-ak-xpf1/10914590_713901335396672_1276098199_n.jpg"],
      "bigSrclist": ["http://photos-g.ak.instagram.com/hphotos-ak-xpf1/10914590_713901335396672_1276098199_n.jpg"],
      "text": ["还记得年少时的梦吗 像朵永远不凋零的花"]
    },
    "2014-12": {
      "year": 2014,
      "month": 12,
      "srclist": ["http://photos-g.ak.instagram.com/hphotos-ak-xpf1/10864830_1563146510582837_1127035289_n.jpg", "http://photos-g.ak.instagram.com/hphotos-ak-xpf1/10809672_755276224542086_839991359_n.jpg"],
      "bigSrclist": ["http://photos-g.ak.instagram.com/hphotos-ak-xpf1/10864830_1563146510582837_1127035289_n.jpg", "http://photos-g.ak.instagram.com/hphotos-ak-xpf1/10809672_755276224542086_839991359_n.jpg"],
      "text": ["木翼双龙慢慢爬升到最高点，下来突然失重的那一瞬间，一向不玩刺激的我满脑子都是伽利略牛顿，倒还好。旁边喊着天不怕地不怕的哭了", "Sculpting in time"]
    }
  };

  var preLoad = function(data) {
    for (var em in data) {
      for (var i = 0, len = data[em].srclist.length; i < len; i++) {
        var src = data[em].bigSrclist[i];
        var img = new Image();
        img.src = src;
      }
    }
  }

  var render = function(data) {
    
    for (var em in data) {
      var liTmpl = "";
      for (var i = 0, len = data[em].srclist.length; i < len; i++) {
        liTmpl += '<li>\
								<div class="img-box">\
									<a class="img-bg" rel="example_group" href="' + data[em].bigSrclist[i] + '" title="' + data[em].text[i] + '"></a>\
									<img lazy-src="' + data[em].srclist[i] + '" alt="">\
								</div>\
							</li>';
      }
      $('<section class="archives album"><h1 class="year">' + data[em].year + '<em>' + data[em].month + '月</em></h1>\
				<ul class="img-box-ul">' + liTmpl + '</ul>\
				</section>').appendTo($(".instagram"));
    }
    
    $(".instagram").lazyload();
    changeSize();

    setTimeout(function() {
      preLoad(data);
    }, 3000);

    $("a[rel=example_group]").fancybox();
  }

  var replacer = function(str) {
    if (str.indexOf("outbound-distilleryimage") >= 0) {
      var cdnNum = str.match(/outbound-distilleryimage([\s\S]*?)\//)[1];
      var arr = str.split("/");
      return "http://distilleryimage" + cdnNum + ".ak.instagram.com/" + arr[arr.length - 1];
    } else {
      var url = "http://photos-g.ak.instagram.com/hphotos-ak-xpf1/";
      var arr = str.split("/");
      return url + arr[arr.length - 1];
    }
  }

  var ctrler = function(data) {
    // var imgObj = {};
    // for(var i=0,len=data.length;i<len;i++){
    // 	var d = new Date(data[i].created_time*1000);
    // 	var y = d.getFullYear();
    // 	var m = d.getMonth()+1;
    // 	var src = replacer(data[i].images.low_resolution.url);
    // 	var bigSrc = replacer(data[i].images.standard_resolution.url);
    // 	var text = data[i].caption ? data[i].caption.text : ''; // data[i].caption 有可能为 null
    // 	var key = y+"-"+m;
    // 	if(imgObj[key]){
    // 		imgObj[key].srclist.push(src);
    // 		imgObj[key].bigSrclist.push(bigSrc);
    // 		imgObj[key].text.push(text);
    // 	}else{
    // 		imgObj[key] = {
    // 			year:y,
    // 			month:m,
    // 			srclist:[bigSrc],
    // 			bigSrclist:[bigSrc],
    // 			text:[text]
    // 		}
    // 	}
    // }
    // render(imgObj);
    render(_db);
  }

  var getList = function(url) {
    // $(".open-ins").html("图片来自instagram，正在加载中…");
    // $.ajax({
    // 	url: url,
    // 	type:"GET",
    // 	dataType:"jsonp",
    // 	success:function(re){
    // 		if(re.meta.code == 200){
    // 			_collection = _collection.concat(re.data);
    // 			var next = re.pagination.next_url;
    // 			if(next){
    // 				getList(next);
    // 			}else{
    $(".open-ins").html("图片来自instagram，点此访问");
    			// ctrler(_collection);
          ctrler(); 
    // 		}
    // 	}else{
    // 		alert("access_token timeout!");
    // 	}
    // }
    // });
  }


  var changeSize = function() {
    if ($(document).width() <= 600) {
      $(".img-box").css({
        "width": "auto",
        "height": "auto"
      });
    } else {
      var width = $(".img-box-ul").width();
      var size = Math.max(width * 0.26, 157);
      $(".img-box").width(size).height(size);
    }
  }

  var bind = function() {
    $(window).resize(function() {
      changeSize();
    });
  }

  return {
    init: function() {
      //getList("https://api.instagram.com/v1/users/438522285/media/recent/?access_token=438522285.2082eef.ead70f432f444a2e8b1b341617637bf6&count=100");
      var insid = $(".instagram").attr("data-client-id");
      var userId = $(".instagram").attr("data-user-id");

      if (!insid) {
        alert("Didn't set your instagram client_id.\nPlease see the info on the console of your brower.");
        console.log("Please open 'http://instagram.com/developer/clients/manage/' to get your client-id.");
        return;
      }
      getList("https://api.instagram.com/v1/users/" + userId + "/media/recent/?client_id=" + insid + "&count=100");
      bind();
    }
  }
})();
$(function() {
  Instagram.init();
})
