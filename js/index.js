$(function () {
   //动态设置content的高
   var contentHeight = $('#container').innerHeight() - $('.header').outerHeight()
   $('.content').height(contentHeight)
   //获取内容列表
   var $contentList = $('.contentList')
   //初始index
   var index = 0
   // 目标index
   var currentIndex = 0
   //导航栏列表项
   var $navList = $('.nav ul li')
   //所有小圆点
   var $points = $('.points li')
   //将列表项存放在数组内
   var lists = [$navList, $points]
   // 点击小圆点切换
   $points.click(function () {
      currentIndex = $(this).index();
      skipPage(currentIndex);
   })

   //点击导航栏切换
   $navList.click(function () {
      currentIndex = $(this).index();
      skipPage(currentIndex);
   })

   //鼠标滚轮事件
   var moving = false
   $(document).on("mousewheel", function (event) {
      if (moving) {
         return
      }
      moving = true
      event = event || window.event;
      var delta = event.originalEvent.deltaY
      // 滚轮
      currentIndex += (delta < 0 && currentIndex >= 1 ? -1 : 0) || (delta > 0 && currentIndex <= $navList.length - 2 ? 1 : 0)
      skipPage(currentIndex)
      setTimeout(function () {
         moving = false
      }, 1000)
   })

   //定义一个函数，实现翻页
   function skipPage(currentIndex) {
      var top = -contentHeight * currentIndex
      $contentList.css("top", top)

      var lis = $('.picList').eq(currentIndex - 1).children()
      var pageRight = $('.pageRight')

      if (index != currentIndex && currentIndex >= 1) {
         pageRight.each(function (index, item) {
            aniText[currentIndex - 1].out(item)
         })

         lis.each(function (index, item) {
            animations[currentIndex - 1].out(item, index)
         })
      }

      if (currentIndex >= 1) {
         setTimeout(function () {
            lis.each(function (index, item) {
               var time = (index + 1) * 300
               animations[currentIndex - 1].in(item, time, index)
            })
            pageRight.each(function (index, item) {
               aniText[currentIndex - 1].in(item)
            })
         }, 800)
      }

      changeState(lists)
      index = currentIndex
   }

   // 改变状态
   function changeState(lists) {
      if (index != currentIndex) {
         lists.forEach(function (list) {
            list.eq(currentIndex).addClass('active')
            list.eq(index).removeClass()
         })
      }
   }

   // 定义图片动画函数的数组
   var animations = [
      {
         in: function (item, time) {
            $(item).css('transition', "transform 1s")
            setTimeout(function () {
               $(item).css('transform', "translateY(0)")
            }, time)
         },
         out: function (item) {
            $(item).css('transition', "transform 0s")
            $(item).css('transform', "translateY(150%)")
         }
      },
      {
         in: function (item) {
            $(item).css('transition', "transform 1.5s")
            setTimeout(function () {
               $(item).css('transform', "translateX(0)")
            }, 20)

         },
         out: function (item, index) {
            $(item).css('transform', "translateX(" + (-279 * index) + "px)")
            $(item).css('transition', "transform 0s")
         }
      },
      {
         in: function (item, time, index) {
            $(item).css('transition', "transform 0.8s cubic-bezier(0,.51,.7,1.39)")
            $(item).css('transform', "translateY(0px)")
            setTimeout(function () {
               switch (index) {
                  case 0:
                     $(item).css('transform', "translateX(-330px)")
                     break
                  case 1:
                     $(item).css('transform', "translateX(0px)")
                     break
                  case 2:
                     $(item).css('transform', "translateX(330px)")
                     break
               }
            }, 1000)

         },
         out: function (item, index) {
            var lis = [330, 0, -330]
            switch (index) {
               case 0:
                  $(item).css('left', lis[index])
                  break
               case 1:
                  $(item).css('left', lis[index])
                  break
               case 2:
                  $(item).css('left', lis[index])
                  break
            }
            $(item).css('transition', "transform 0s")
            $(item).css('transform', "translateY(-150%)")
         }
      },
      {
         in: function (item, time, index) {
            $(item).css('transition', "transform 0.8s")
            setTimeout(function () {
               switch (index) {
                  case 0:
                     $(item).css('transform', "translateX(500px)")
                     break
                  case 1:
                     $(item).css('transform', "translateX(830px)")
                     break
                  case 2:
                     $(item).css('transform', "translateX(1160px)")
                     break
               }
            }, time)

         },
         out: function (item, index) {
            var lis = [-500, -830, -1160]
            switch (index) {
               case 0:
                  $(item).css('left', lis[index])
                  break
               case 1:
                  $(item).css('left', lis[index])
                  break
               case 2:
                  $(item).css('left', lis[index])
                  break
            }
            $(item).css('transition', "transform 0s")
            $(item).css('transform', "translateY(-150%)")
         }
      }
   ]

   //定义文字信息的动画的函数数组
   var aniText = [
      {
         in: function (item) {
            $(item).css('transition', "transform 1s")
            setTimeout(function () {
               $(item).css('transform', "translateY(0)")
            }, 1000)
         },
         out: function (item) {
            $(item).css('transition', "transform 0s")
            $(item).css('transform', "translateY(-200%)")
         }
      },
      {
         in: function (item) {
            $(item).css('transition', "transform 1s")
            setTimeout(function () {
               $(item).css('transform', "translateX(0)")
            }, 1000)
         },
         out: function (item) {
            $(item).css('transition', "transform 0s")
            $(item).css('transform', "translateX(200%)")
         }
      },
      {
         in: function (item) {
            $(item).css('transition', "opacity 1s")
            setTimeout(function () {
               $(item).css('opacity', "1")
            }, 1000)
         },
         out: function (item) {
            $(item).css('transition', "opacity 0s")
            $(item).css('opacity', "0")
         }
      },
      {
         in: function (item) {
            $(item).css('transition', "opacity 1s")
            setTimeout(function () {
               $(item).css('opacity', "1")
            }, 1000)
         },
         out: function (item) {
            $(item).css('transition', "opacity 0s")
            $(item).css('opacity', "0")
         }
      }
   ]
})