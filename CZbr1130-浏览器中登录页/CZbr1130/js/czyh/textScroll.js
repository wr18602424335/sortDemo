$.fn.textScroll=function(){
        var p = $(this),  c = p.children(), speed=6000; //值越大速度越小
        var cw = c.width() < 200 ? 200 : c.width(),pw=p.width();
        var t = 0, t1 = 0, st, et;
        init();
        function init(){
            p.off("mouseenter mouseleave");//解绑事件
            c.css({ left: pw });
            c.stop(false, false);
            t=(cw / 100) * speed;
            t1 = 0;
            ani(t);
        }
        function ani(tm) {
            st = new Date().getTime(); 
            c.animate({ left: -cw }, tm, "linear", function () {//计算位置css动画滚动
                c.css({ left: pw });
                c.stop(false, false);
                t1 = 0;
                // t=((cw+pw)/100)*speed;
                t=(cw / 100) * speed;
                ani(t);
                // p.hide();//动画结束隐藏外层div
                // c.children().remove();
            });
        } 
        p.on({  mouseenter: function () { //鼠标移入停止
            c.stop(false, false); 
            et = new Date().getTime(); 
            // console.log(t1);
        },  mouseleave: function () {//鼠标移出计算位置开始动画
            t1 += (et - st);
            ani(t - t1);
            // console.log(t1);
        }  });
}