define(['lazy'], function() {
    return {
        init: function() {

            // 顶部登录退出
            if (get('username')) {
                $('.h').html(get('username'))

                $('#U_Exit').on('click', function() {
                    remove('username')
                    $('.h').next().attr('display', 'none')
                    location.reload()
                        //
                })

            }
            let left = $('.slider-1').offset().left;
            let list = $(".slider>ul>li")
            let len = list.length
            let sliderw = $('.slider').width()
            let sliderindex = 0;
            let slider1 = $('.slider-1')
            let timer = null;

            // 轮播图
            function BJ() {
                if (sliderindex == -(len + 1)) {
                    sliderindex = -1;
                    slider1[0].style.left = 0;
                }
            }

            function PD() {
                switch (sliderindex) {
                    case 0:
                        $('.list-1 li:nth-child(1)').addClass('select').siblings("li").removeClass("select");
                        break;
                    case -1:
                        $('.list-1 li:nth-child(2)').addClass('select').siblings("li").removeClass("select");
                        break;
                    case -2:
                        $('.list-1 li:nth-child(3)').addClass('select').siblings("li").removeClass("select");
                        break;
                    case -3:
                        $('.list-1 li:nth-child(4)').addClass('select').siblings("li").removeClass("select");
                        break;
                    case -4:
                        $('.list-1 li:nth-child(5)').addClass('select').siblings("li").removeClass("select");
                        break;
                    case -5:
                        $('.list-1 li:nth-child(1)').addClass('select').siblings("li").removeClass("select");
                        break;
                }
            }
            //自动轮播
            function ZD() {
                timer = setInterval(() => {
                    function move() {
                        function fn() {
                            sliderindex--;
                            BJ();
                            PD();
                            $(slider1[0]).animate({ left: sliderw * sliderindex }, 400);

                        }
                        fn()
                    }
                    move()
                }, 3000)
            }
            ZD()
            $('.slider').mouseover(function() {
                clearInterval(timer);
            })
            $('.slider').mouseout(function() {
                ZD();
            })
            var spa1 = $(".slider").children("span").eq(0)
            var spa2 = $(".slider").children("span").eq(1)
            spa1.on('click', function() {
                sliderindex++;
                if (sliderindex == 1) {
                    sliderindex = -(list.length - 1);
                    slider1[0].style.left = -(sliderw * list.length) + 'px';
                }
                PD();
                $(slider1[0]).stop(true).animate({ left: sliderw * sliderindex }, 400);
            })
            spa2.on('click', function() {
                sliderindex--;
                BJ();
                PD();
                $(slider1[0]).stop(true).animate({ left: sliderw * sliderindex }, 400);
            })
            $(".slider>ul>li").on('click', function() {
                    $(this).addClass("select").siblings("li").removeClass("select");
                    sliderindex = $(this).index() * -1;
                    $(slider1[0]).animate({ left: sliderw * sliderindex }, 400);
                })
                // 登录注册
                // var login = document.querySelector('#login')
            if (get('username')) {
                $('.site-nav-sign a:nth-child(2)').attr('display', 'none');
                $('.site-nav-sign a:nth-child(2)').html('');
                $('.h').html(get('username'))
                $('#siteNavLogin').mouseenter(function() {
                    $('#siteNavLogin').css('background', 'white')
                    $('#siteNavLoginPanel').css('display', 'block')
                })
                $('#siteNavLogin').mouseleave(function() {
                        $('#siteNavLogin').css('background', '')
                        $('.h').html(get('username'))
                        $('#siteNavLoginPanel').css('display', 'none')
                    })
                    // 右边
                $('.member-logout').css('display', 'none')
                $('.member-login').css('display', 'block')
                $('.member-column-4').css('display', 'block')
                $('.member-nick').html(get('username'))
            }
            //渲染
            const tianjia = $('#tianjia');
            const goodshop = $('#goodshop');
            const cheap = $('#cheap');
            const youlike = $('#youlike');
            $.ajax({
                type: "GET",
                url: "http://localhost/wampROOM1/twoproject2copy/php/index.php",
                success: function(data) {
                    var data = JSON.parse(data)
                        // console.log(data)
                    var temp = '';
                    temp = '<ul>'
                    for (var key of data) {
                        temp += `
                <li>
                  <div>
                        <img class="lazy"  data-original="${key.url}"  width="200" height="200" alt="">
                        <p>${key.title}</p>
                     <p >  
                        <span>
                            ¥${key.price}
                        </span>
                        <span>销量:${key.sailnumber}</span>
                     </p>
                    </div>
                </li>
            `
                    }
                    temp += '</ul>'
                    $('#tianjia').html(temp);
                    $('#goodshop').html(temp);
                    $('#cheap').html(temp);
                    $('#youlike').html(temp);
                    //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });


                }

            });

            // 列表hover效果
            function suspen() {
                // // 所有列表
                $('.a-all').mouseenter(function() {
                    $('.Listpage').fadeIn('slow');
                    $(this).css('background', '#ffe4dc')

                })
                $('.a-all').mouseleave(function() {
                    $('.Listpage').css('display', 'none');
                    $(this).css('background', 'white')
                })
                $(".Listpage").hover(function() {
                    $('.Listpage').css('display', 'block')
                }, function() {
                    $('.Listpage').css('display', 'none')
                });
            }
            suspen();
            // 导航搜索栏滚动事件
            $(window).on('scroll', function() {

                if ($(window).scrollTop() >= 200) {
                    $('.top-wrap-search').css({
                        'top': '0',
                        'position': 'fixed'
                    })
                } else {
                    $('.top-wrap-search').css({
                        top: '-80px',
                        position: 'absolute'
                    })
                }
                //楼梯效果
                // console.log($(window).scrollTop())
                // let floor_top = $('.floor_right').offset().top;
                if ($(window).scrollTop() >= 425) {
                    $('.floor_right').css({
                        'position': 'fixed',
                        'top': '60px'
                    })
                }
                if ($(window).scrollTop() <= 425) {
                    $('.floor_right').css({
                        position: 'absolute',
                        top: '485px'
                    })
                }
                let loutili = $('.right-floor li');
                $('.list').each(function(index, ele) {
                    let list_top = $(ele).offset().top;
                    if (list_top > $(window).scrollTop() - $('#tianjia').innerHeight()) {
                        loutili.eq(index).addClass('active').siblings('li').removeClass('active');
                        return false;
                    }
                });


            });

            $('.shop_mod').on('click', function() {
                $(this).addClass('active').siblings('li').removeClass('active');
                console.log($(this).index())
                let topvalue = $('.list').eq($(this).index()).offset().top;
                $('html,body').stop(true).animate({
                    scrollTop: topvalue
                });
            });
            // 回到顶部
            $('.last').on('click', function() {
                $('html,body').animate({
                    scrollTop: 0
                });
            })
        }
    }
});