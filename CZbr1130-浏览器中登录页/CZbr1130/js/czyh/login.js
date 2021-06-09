 var bgArrs = [
     {
         type:"image",
         url:"./images/czyh/bg/bg1.png"
     }/*,
     {
         type:"image",
         url:"./images/czyh/bg/BG5.jpg"
     }*//*,
     {
         type:"image",
         url:"./images/bg/bg3.jpg"
     },
     {
         type:"video",
         url:"./images/bg/video1.mp4"
     }*/
 ];
$(function(){

    var loopTime = "7";
    var noticeVal = [];
    getBgs();
    getNotice();
    getResourceLooptime();
    //获取公告
    function getBgs(){
		
        $.ajax({
            url:'https://ebank.bankcz.com:3101/czbrowser/application/resourceList?random=' + Math.random(),
            type: "get",
			async: true,
            contentType:'application/json',
            data: {},
			timeout:5000,
            dataType: "json",
            success: function(data){
				setTimeout(function(){
					if(data.result == 200 || data.result == 16){

                   if(data.data != null){
                       if(data.data.length == 1){

                           var d = data.data;
                           var bgArr = [];
                           $.each(d,function (i, val) {
                               bgArr.push({
                                   type:val.resourcesType==2?'image':(val.resourcesType==3?'video':''),
                                   url:val.internetDownloadUrl
                               })
                           })


                           for(let i = 0;i < bgArr.length;i++){
                               let elem = "";
                               if(bgArr[i].type === "image"){
                                   elem = `<img src="${bgArr[i].url}">`;
                               }else{
                                   elem = `<video src='${bgArr[i].url}' ref="video" loop muted autoplay style="opacity:1;height:100%;"></video>`;
                               }
                               $("#vsCarousel2 .vsCarousel-wrapper").append(
                                   `<li class="vsCarousel-slide">${elem}</li>`
                               );
                           }
                           let vsCarousel = new VsCarousel('vsCarousel2',{ // 生效dom的id。
                               effect: 'slide', // 切换效果，滑动或渐变。|fade
                               bar: false, // 是否显示分页器上的进度条。
                               //pege: 'right|left|center', // 分页器位置。
                               autoPlay: false, // 是否自动切换。
                               time: loopTime, // 自动切换停留时间。
                           });

                       }else{
                           var d = data.data;
                           var bgArr = [];
                           $.each(d,function (i, val) {
                               bgArr.push({
                                   type:val.resourcesType==2?'image':(val.resourcesType==3?'video':''),
                                   url:val.internetDownloadUrl
                               })
                           })


                           for(let i = 0;i < bgArr.length;i++){
                               let elem = "";
                               if(bgArr[i].type === "image"){
                                   elem = `<img src="${bgArr[i].url}">`;
                               }else{
                                   elem = `<video src='${bgArr[i].url}' ref="video" loop muted autoplay style="opacity:1;height:100%;"></video>`;
                               }
                               $("#vsCarousel2 .vsCarousel-wrapper").append(
                                   `<li class="vsCarousel-slide">${elem}</li>`
                               );
                           }
                           let vsCarousel = new VsCarousel('vsCarousel2',{ // 生效dom的id。
                               effect: 'slide', // 切换效果，滑动或渐变。|fade
                               bar: false, // 是否显示分页器上的进度条。
                               //pege: 'right|left|center', // 分页器位置。
                               autoPlay: true, // 是否自动切换。
                               time: loopTime, // 自动切换停留时间。
                           });
                       }

                   }else {
                       return false;
                       for(let i = 0;i < bgArrs.length;i++){
                           let elem = "";
                           if(bgArrs[i].type === "image"){
                               elem = `<img src="${bgArrs[i].url}">`;
                           }else{
                               elem = `<video src='${bgArrs[i].url}' ref="video" loop muted autoplay style="opacity:1;"></video>`;
                           }
                           $("#vsCarousel2 .vsCarousel-wrapper").append(
                               `<li class="vsCarousel-slide">${elem}</li>`
                           );
                       }
                       let vsCarousel = new VsCarousel('vsCarousel2',{ // 生效dom的id。
                           effect: 'slide', // 切换效果，滑动或渐变。|fade
                           bar: false, // 是否显示分页器上的进度条。
                           pege: 'right|left|center', // 分页器位置。
                           autoPlay: false, // 是否自动切换。
                           time: 7, // 自动切换停留时间。
                       });

                   }

               }
				},7000);
               
            },
            error: function (err) {
                return false;//不在加载第二次默认轮播图
                for(let i = 0;i < bgArrs.length;i++){
                    let elem = "";
                    if(bgArrs[i].type === "image"){
                        elem = `<img src="${bgArrs[i].url}">`;
                    }else{
                        elem = `<video src='${bgArrs[i].url}' ref="video" loop muted autoplay style="opacity:1;"></video>`;
                    }
                    $("#vsCarousel2 .vsCarousel-wrapper").append(
                        `<li class="vsCarousel-slide">${elem}</li>`
                    );
                }
                let vsCarousel = new VsCarousel('vsCarousel2',{ // 生效dom的id。
                    effect: 'slide', // 切换效果，滑动或渐变。|fade
                    bar: false, // 是否显示分页器上的进度条。
                    pege: 'right|left|center', // 分页器位置。
                    autoPlay: false, // 是否自动切换。
                    time: 7, // 自动切换停留时间。
                });

            }

        });
    }

    // 切换登录方式
    $(".loginTitle").click(function(){
        let type = $(this).attr("logintype");
        $(this).addClass("loginSelected").siblings().removeClass("loginSelected");
        $("#loginPage_" + type + "").show().siblings().hide();
        showNotice(type);
    });
    function showNotice(type){
        var t = type == 'person'?'1':'2';
        var notice = '',num = 0,noticeHtml = '';
        if(noticeVal.length > 0){
            $.each(noticeVal,function (i,val) {
                if(val.bankType == t){
                    num += 1;
                    notice += ('<span noticeTitle="'+val.noticeTitle+'" noticeContent="'+val.noticeContent+'" class = "space">'+  val.noticeTitle + '</span>');
                }
            });
            noticeHtml = '<span class="words">'+ notice +'</span>';
            $("#noticeList").html(noticeHtml);
            $("#noticeDiv").show();
            $("#noticeDiv").textScroll();//aaa为最外层div的Id  也可写Class  如：$(".aaa") 此处aaa为class名
        }else{
            $("#noticeDiv").hide();
        }
    }

    $('#noticeList').on('click','.space',function (e) {
        e.stopPropagation();

        $('#noticeModal').modal('show');
        $('#noticeModal .noticeTitle').val($(this).attr('noticeTitle'));
        $('#noticeModal .noticeContent').val($(this).attr('noticeContent'));
    })
    // 视频屏蔽右键
    $('body video').bind('contextmenu',function() { return false; });//屏蔽右键
    //获取公告
    function getNotice(){//获取公告
        $.ajax({
            url:'https://ebank.bankcz.com:3101/czbrowser/application/notice?random=' + Math.random(),
            type: "get",
            async: true,
            contentType:'application/json',
            data: {},
            dataType: "json",
			timeout:5000,
            success: function(data){
                if(data.result == 200) {
                    noticeVal = data.data;
					showNotice('person');
                }
            },
            error: function(){
                $("#noticeDiv").hide();
            }
        });
    }
    function getResourceLooptime(){//获取轮播时间
        $.ajax({
            url:'https://ebank.bankcz.com:3101/czbrowser/application/resourcesLooptime?random=' + Math.random(),
            type: "get",
            async: true,
            contentType:'application/json',
            data: {},
            dataType: "json",
            timeout:5000,
            success: function(data){
                if(data.result == 200) {
                    loopTime = data.data.loopTime;
                }
            },
            error: function(){

            }
        });
    }
});
