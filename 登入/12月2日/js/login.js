var loginBox=document.getElementById('loginBox'),
    loginText=loginBox.getElementsByTagName('span')[1],
    imgL=loginText.getElementsByTagName('img')[0],
    loginA=loginBox.getElementsByTagName('span')[0],
inputBox=document.getElementById('inputBox'),
    checkBox=document.getElementById('checkBox'),
    check=document.getElementsByClassName('checkBox')[0],
     select=document.getElementsByClassName('select')[0],

    $qq=$('#qq'),
    $r=$('.sector-r'),
    sec1=document.getElementById('sector-tip')
  sec2=document.getElementById('sector'),
      $se2=$('#sector')
    e=document.getElementById('e'),
        m=document.getElementById('m'),
$more=$('#more'),
        more=document.getElementById('more')

console.log(select);
$sel=$('.sel');

console.log($se2);

let buttonLogin= document.getElementsByClassName('buttonLogin')[0];

console.log(buttonLogin);
loginText.onclick=function () {
    imgL.style.display='block';
    inputBox.style.display='none';
    loginText.style.color='#B40707'
    e.style.display='block';

};

loginA.onclick=function () {
    imgL.style.display='none';
    inputBox.style.display='block';
    e.style.display='none';

};
$('#rememberNameSpan label').click(function () {
    var remember_name = $('#remember_name_icon');
    // debugger;
    if(remember_name.hasClass('tick-off-icon')){
        // alert('aaa');
        remember_name.removeClass('tick-off-icon');
        remember_name.addClass('tick-on-icon');
    }else{
        remember_name.removeClass('tick-on-icon');
        remember_name.addClass('tick-off-icon');
    }
});

$sel.on('mouseover',function () {
    animate({
        curEle:select,
        duration:1000,
        target:{opacity:1},
    })
    animate({
        curEle:imgL,
        duration:1000,
        target:{left:-190},
    })
}).on('mouseleave',function () {
    animate({
        curEle:select,
        duration:1000,
        target:{opacity:0},
    })
    animate({
        curEle:imgL,
        duration:1000,
        target:{left:-100},
    })

})


document.body.onmouseover=function(e){
            let oldY = e.clientY,
                oldX=e.clientX;

        if(true){
            // console.log(e);
            $se2.css("transform","rotate("+Math.abs((oldY+oldX-50))+"deg)");
        }

    animate({
        curEle:sec2,
        duration:100,
        target:{opacity:1},


    })
    $r.css('background', '#7DB4FF')

    animate({
        curEle:sec1,
        target:{opacity:1},

    })
    };

$('#i-userName').onblur=function() {
    //点击验证的时候
    var reg = /^\w{4,50}$/;
    var value = document.getElementById("i-userName").value;

    var flag=reg.test(value);
    console.log(flag);

    if(value.length<=3&&value.length>=1){
        $('.errorUserName').css('display','block');
        $('#i-userName').addClass("error-underline");

    }else{
        $('.errorUserName').css('display','none');
        $('#i-userName').removeClass("error-underline");
    }
    console.log(value.length);

}()


$('#i-userName').bind('input propertychange', function() {

    var reg = /^\w{4,50}$/;
    var value = document.getElementById("i-userName").value;
    var flag=reg.test(value);

    if(value.length<=3&&value.length>=1){
        $('.errorUserName').css('display','block');
        $('#i-userName').addClass("error-underline");
        $('.error').css('display', 'none');
        // return false;
    }else{
        $('.errorUserName').css('display','none');
        $('#i-userName').removeClass("error-underline");
    }

});

$('#errorUserT').bind('input propertychange', function() {
    var valueN = document.getElementById("errorUserT").value;

    if ( valueN.length>0) {
        $('#errorUserT').removeClass("error-underline")
        $('.errorT').css('display', 'none');
    }
})
$('#button').on('click',function () {
    var reg = /^\w{4,50}$/;
    var value = document.getElementById("i-userName").value;
    var flag=reg.test(value);

    console.log(2);


    $('#button').addClass('aa').addClass("iconfont icon-duihao1 ")

    $('#button').html('验证成功').css('color','#18A452').css('transition', '1s').css('margin-top', '-5px')

})

buttonLogin.onclick=function () {
    var valueN = document.getElementById("errorUserT").value;
    var reg = /^\w{4,50}$/;
    var value = document.getElementById("i-userName").value;

    if (value.length ===0) {
        $('#i-userName').addClass("error-underline")
        $('.error').css('display', 'block');
    }
    if (value.length>=4&&valueN.length===0) {
        $('#errorUserT').addClass("error-underline")
        $('.errorT').css('display', 'block');
    }
    if (value.length>=4&&valueN.length>0) {
        $('.errorZ').css('display', 'block');
    }

}
//
let safe=document.getElementById('safe')
more.onclick=function ( ) {
    safe.style.display = 'block';

}


