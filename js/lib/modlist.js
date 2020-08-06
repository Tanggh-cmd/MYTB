define(['pagination'], function() {
    return {
        init: function() {

            document.cookie = "name=value";
            const tianjia = $('#tianjia');
            let baseUrl = "http://localhost/wampROOM1/twoproject2copy/";
            $.ajax({
                type: "GET",
                url: "http://localhost/wampROOM1/twoproject2copy/php/list.php",
                success: function(data) {
                    var data = JSON.parse(data)
                    var temp = '';
                    temp = '<ul>'
                    for (var key of data) {
                        var pic = JSON.parse(key.pro_img)
                        temp += `
            <li>
            <a href="${baseUrl}html/detail.html?id=${key.pro_id} " target="_blank">
                <div>
                     <img src="${pic[0].src}">
                        <p>${key.pro_title}</p>
                          <p>  
                             <span class="price">¥${key.pro_price}</span>
                             <span>销量:${key.pro_sales}</span>
                         </p>
                </div>
                </a>
          </li>
            `
                    }
                    temp += '</ul>'
                        // cookie.set(`${pro_id}`, )
                    tianjia[0].innerHTML = temp;


                    array_default = [];
                    array = [];
                    prev = null;
                    next = null;
                    $('ul li').each(function(index, element) {
                        array[index] = $(this);
                        array_default[index] = $(this);
                    });




                }
            });
            $('.page').pagination({
                pageCount: 5, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                // coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取当前的页码
                    $.ajax({
                        url: 'http://localhost/wampROOM1/twoproject2copy/php/list.php',
                        data: { //将获取的页码给后端
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function(data) { //根据传递的页码，后端返回相应的数据，进行渲染。
                        let $strhtml = '<ul>';
                        $.each(data, function(index, value) {
                            var pic = JSON.parse(value.pro_img)
                            $strhtml += `
                                <li>
                                <a href="${baseUrl}html/detail.html?id=${value.pro_id} " target="_blank">
                                      <div>
                                            <img src="${pic[0].src}"/>
                                            <p>${value.pro_title}</p>
                                           <p>
                                           <span class="price">￥${value.pro_price}</span>
                                           <span>销量:${value.pro_sales}</span>
                                           </p>
                                      </div>
                                    </a>
                                </li>
                            `;
                        });
                        $strhtml += '</ul>';
                        $('#tianjia').html($strhtml);
                        //渲染结束。
                        array_default = [];
                        array = [];
                        prev = null;
                        next = null;
                        $('ul li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });
                    })
                }

            });
            // 默认排序

            $('.paixu div:nth-child(1)').on('click', function() {
                    $.each(array_default, function(index, value) {
                        $('ul').append(value)
                    })
                    return;
                })
                //升序

            $('.paixu div:nth-child(2)').on('click', function() {
                    for (var i = 0; i < array.length - 1; i++) {
                        for (var j = 0; j < array.length - 1; j++) {
                            prev = parseFloat(array[j].find('.price').html().substring(1));
                            next = parseFloat(array[j + 1].find('.price').html().substring(1));
                            if (prev > next) {
                                let temp = array[j];
                                array[j] = array[j + 1]
                                array[j + 1] = temp
                            }
                        }
                    }
                    $.each(array, function(index, value) {
                        $('ul').append(value)
                    })
                })
                //降序

            $('.paixu div:nth-child(3)').on('click', function() {
                for (var i = 0; i < array.length - 1; i++) {
                    for (var j = 0; j < array.length - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1));
                        next = parseFloat(array[j + 1].find('.price').html().substring(1));
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1]
                            array[j + 1] = temp
                        }
                    }
                }
                $.each(array, function(index, value) {
                    $('ul').append(value)
                })
            })



        }
    }
});