(function (window, $) {
    "use strict";
    var loc = window.location,
        doc = 'html,body';

    window.prettyPrint && prettyPrint();

    var Scroller = function (obj) {
        this.options = {
            timer : obj.timer || 1000,
            fire  : $(obj.elem).find('ul').not('#extLinks')
        };
        this.init.apply(this, arguments);
    };
    Scroller.prototype = {
        constructor : Scroller,
        init : function(options) {
            this.options = $.extend({},this.options,options);
            this.scrolling();
        },
        scrolling : function() {
            var t = this, $links = this.options.fire,the,anchor;
            $links.on("click","a",function(e){
                e.preventDefault();
                $links.find('a').removeClass('active');
                $(this).addClass('active');
                anchor = $(this).attr('href');
                the = $(anchor).offset().top - 15;
                $(doc).stop().animate({scrollTop : the},t.options.timer,function(){
                    loc.hash.replace(/#.+/,'');
                });
            })
        }
    };
    var ss = new Scroller({
        elem:'.navi',
        timer:800
    });

    var Dialog = function(context,options) {
        this.isShow  = false;
        this.options = options;
        this.element = $(context)
            .on('click','[data-bind="close"]',$.proxy(this.close,this))
    }
    Dialog.prototype = {
        constructor : Dialog,
        show : function() {
            this.isShow = true;
            this.backdrop();
            this.element.removeClass('hidden');
        },
        close : function(e) {
            e.preventDefault();
            this.isShow = false;
            this.backdrop.remove();
            this.element.addClass('hidden');
        },
        backdrop : function () {
            if (this.isShow && this.options.masker) {
                this.backdrop = $('<div class="masker" />').appendTo(document.body);
            } 
        }
    }
        var hook = $('#winPop'),
            target = hook.attr('href');
        hook.on('click',function(){
            new Dialog(target,{
                masker : true,
            }).show();
        })
})(window,window.jQuery)
