/**
 * JavaScript Client Detection
 * (C) viazenetti GmbH (Christian Ludwig)
 */
(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
         // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Edge';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
            {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
            {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
            {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
            {s: 'Windows Vista', r: /Windows NT 6.0/},
            {s: 'Windows Server 2003', r: /Windows NT 5.2/},
            {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
            {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
            {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
            {s: 'Windows 98', r: /(Windows 98|Win98)/},
            {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
            {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s: 'Windows CE', r: /Windows CE/},
            {s: 'Windows 3.11', r: /Win16/},
            {s: 'Android', r: /Android/},
            {s: 'Open BSD', r: /OpenBSD/},
            {s: 'Sun OS', r: /SunOS/},
            {s: 'Linux', r: /(Linux|X11)/},
            {s: 'iOS', r: /(iPhone|iPad|iPod)/},
            {s: 'Mac OS X', r: /Mac OS X/},
            {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s: 'QNX', r: /QNX/},
            {s: 'UNIX', r: /UNIX/},
            {s: 'BeOS', r: /BeOS/},
            {s: 'OS/2', r: /OS\/2/},
            {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen             : screenSize,
        browser            : browser,
        browserVersion     : version,
        browserMajorVersion: majorVersion,
        mobile             : mobile,
        os                 : os,
        osVersion          : osVersion,
        cookies            : cookieEnabled,
        flashVersion       : flashVersion
    };
}(this));


/**
 * theme scripts
 */

(function ($) {
    "use strict";



    $('body').addClass('os-' + window.jscd.os.toLowerCase())
        .addClass('browser-' + window.jscd.browser.toLowerCase())
        .attr('data-os-version', window.jscd.osVersion.toLowerCase());





        $(window).load(function(){
            $('body').addClass('loaded');

            $('.home-page .left-side').scrollbar();
            $('.home-page .right-side').scrollbar();
        });



        // Scroll effects

          var viewport = $(window);
                  function setVisible(x) {
                    // debugger;
                      var viewportTop = viewport.scrollTop(),
                          viewportBottom = viewport.scrollTop() + viewport.height(),
                          quarter = viewport.height()/x;
                      $('.scroll-el').each(function () {
                          var self = $(this),
                              top = self.offset().top,
                              bottom = top + self.height(),
                              topOnScreen = top >= viewportTop+quarter && top <= viewportBottom-quarter,
                              bottomOnScreen = bottom >= viewportTop+quarter && bottom <= viewportBottom-quarter,
                              elemVisible = topOnScreen || bottomOnScreen;
                          if (elemVisible) {
                              setTimeout(function(){
                                  self.addClass('visible');
                              },300);
                          }
                      });
                  };
              viewport.load(setVisible(viewport.height()));
              
              viewport.scroll(function(){setVisible(12);});







        // modal-windows
        
        $('.make-donate').on('click', function(event){
            event.preventDefault();
            $('.modal.modal-donate .modal-wrap').scrollbar();
            $('.modal.modal-donate').addClass('show');
            $('body').addClass('modal-open overflow-y');
            $('html').addClass('modal-open overflow-y');
        });

        $('.make-donate__other-ways').on('click', function(event){
        event.preventDefault();
        $('.modal.modal-donate__other-ways .modal-wrap').scrollbar();
        $('.modal.modal-donate__other-ways').addClass('show');
        $('body').addClass('modal-open overflow-y');
        $('html').addClass('modal-open overflow-y');
        });

        $('.more-reports').on('click', function(event){
        event.preventDefault();
        $('.modal.modal-reports .modal-wrap').scrollbar();
        $('.modal.modal-reports').addClass('show');
        $('body').addClass('modal-open overflow-y');
        $('html').addClass('modal-open overflow-y');
        });

        $('.join-btn').on('click', function(event){
        event.preventDefault();
        $('.modal.modal-join .modal-wrap').scrollbar();
        $('.modal.modal-join').addClass('show');
        $('body').addClass('modal-open overflow-y');
        $('html').addClass('modal-open overflow-y');
        });
        $('.regional-contacts').on('click', function(event){
          event.preventDefault();
          // $('.modal.modal-regional-contacts .modal-wrap').scrollbar();
          $('.modal.modal-regional-contacts').addClass('show');
          $('body').addClass('modal-open overflow-y');
        });
        $('.regional-contacts-op').on('click', function(event){
          event.preventDefault();
          $('.modal.modal-regional-contacts-op').addClass('show');
          $('body').addClass('modal-open overflow-y');
        });
          // $('.join_next-step').on('click', function(){
          //   event.preventDefault();
          //   $('.modal.modal-join').addClass('next-step');
          // });

          $(window).on('click', function(e){
            var el = $(e.target);
            if (el.hasClass('modal-window__close')) {
                $('.modal').removeClass('show');
               $('body').removeClass('modal-open overflow-y');
               $('html').removeClass('modal-open overflow-y');
               $('.modal').removeClass('error next-step sending success-status supporter member');
               $('.modal').find('input').removeClass('invalid');

               $('.modal input[type="text"]').each(function(){
                $(this).val('')
               });  
               $('.modal input[type="email"]').each(function(){
                $(this).val('')
               }); 
               $('.modal textarea').each(function(){
                $(this).val('')
               }); 
               $('.modal input[type="radio"]').each(function(){
                $(this).prop('checked', false);
               }); 
               $('.modal .invalid').each(function(){
                $(this).removeClass('invalid')
               }); 
            }
            });

          $(document).keyup(function(e) {
            if (e.keyCode === 27) {
               $('.modal').removeClass('show');
               $('body').removeClass('modal-open overflow-y');
               $('html').removeClass('modal-open overflow-y');
               $('.modal').removeClass('error next-step sending success-status supporter member');
               $('.modal').find('input').removeClass('invalid');
             } 
          });


        //   $('#jn_phone').on('focus', function(){
                
        //     });

            $('.jn_phone').each(function(){
                var cleave = new Cleave($(this), {
                   prefix: '+38',
                   numericOnly: true,
                   delimiters: [' ', ' ', '-', '-'],
                   blocks: [3, 3, 3, 2, 2],
                   uppercase: true
               });
           });

          
           // $('#jn-phone').on('focusout', function(){
           //      if($(this).val() == '+38 '){
           //        $(this).val('');
           //        $(this).parent('.input-block').removeClass('invalid');
           //        $('#contact-to-email').addClass('required');
           //      }else{
           //        $(this).parent('.input-block').addClass('invalid');
           //        $('#contact-to-email').removeClass('required');
           //        $('#contact-to-email').parent().removeClass('invalid');
           //      }
           //  });


// hamburger-menu

            // $('.hamburger-menu').on('click', function(){
            //     event.preventDefault();
            //    $('.main-header').toggleClass('open-menu');
            //    $('body').toggleClass('overflow-y');
            // });



        // donate link 

        var liqSubscribe = { 
          "five" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiNSIsImN1cnJlbmN5IjoiVUFIIiwiZGVzY3JpcHRpb24iOiLQlNC%2B0LHRgNC%2B0LLRltC70YzQvdC40Lkg0LLQvdC10YHQvtC6INC90LAg0YHRgtCw0YLRg9GC0L3RgyDQtNGW0Y%2FQu9GM0L3RltGB0YLRjC4g0JHQtdC3INCf0JTQkiIsInR5cGUiOiJidXkiLCJsYW5ndWFnZSI6InVrIiwic3Vic2NyaWJlIjoxLCJzdWJzY3JpYmVfZGF0ZV9zdGFydCI6Im5vdyIsInN1YnNjcmliZV9wZXJpb2RpY2l0eSI6Im1vbnRoIn0%3D&signature=nrffVsN%2FZnW0DPU%2FySCv0z7kd6U%3D",
          "ten" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMTAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0JTQvtCx0YDQvtCy0ZbQu9GM0L3QuNC5INCy0L3QtdGB0L7QuiDQvdCwINGB0YLQsNGC0YPRgtC90YMg0LTRltGP0LvRjNC90ZbRgdGC0YwuINCR0LXQtyDQn9CU0JIiLCJ0eXBlIjoiYnV5IiwibGFuZ3VhZ2UiOiJ1ayIsInN1YnNjcmliZSI6MSwic3Vic2NyaWJlX2RhdGVfc3RhcnQiOiJub3ciLCJzdWJzY3JpYmVfcGVyaW9kaWNpdHkiOiJtb250aCJ9&signature=oyRSFLHfZfOtb%2Bb4SFSehP5vEdc%3D",
          "twenty" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMjAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0JTQvtCx0YDQvtCy0ZbQu9GM0L3QuNC5INCy0L3QtdGB0L7QuiDQvdCwINGB0YLQsNGC0YPRgtC90YMg0LTRltGP0LvRjNC90ZbRgdGC0YwuINCR0LXQtyDQn9CU0JIiLCJ0eXBlIjoiYnV5IiwibGFuZ3VhZ2UiOiJ1ayIsInN1YnNjcmliZSI6MSwic3Vic2NyaWJlX2RhdGVfc3RhcnQiOiJub3ciLCJzdWJzY3JpYmVfcGVyaW9kaWNpdHkiOiJtb250aCJ9&signature=7UOJpLvSn8V14UnCxYEGfgQUKGQ%3D",
          "fifty" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiNTAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0JTQvtCx0YDQvtCy0ZbQu9GM0L3QuNC5INCy0L3QtdGB0L7QuiDQvdCwINGB0YLQsNGC0YPRgtC90YMg0LTRltGP0LvRjNC90ZbRgdGC0YwuINCR0LXQtyDQn9CU0JIiLCJ0eXBlIjoiYnV5IiwibGFuZ3VhZ2UiOiJ1ayIsInN1YnNjcmliZSI6MSwic3Vic2NyaWJlX2RhdGVfc3RhcnQiOiJub3ciLCJzdWJzY3JpYmVfcGVyaW9kaWNpdHkiOiJtb250aCJ9&signature=FnE6g4%2BXnAC%2Bo1FIhGuTUQ4LhC8%3D",
          "hundred" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMTAwIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6ItCU0L7QsdGA0L7QstGW0LvRjNC90LjQuSDQstC90LXRgdC%2B0Log0L3QsCDRgdGC0LDRgtGD0YLQvdGDINC00ZbRj9C70YzQvdGW0YHRgtGMLiDQkdC10Lcg0J%2FQlNCSIiwidHlwZSI6ImJ1eSIsImxhbmd1YWdlIjoidWsiLCJzdWJzY3JpYmUiOjEsInN1YnNjcmliZV9kYXRlX3N0YXJ0Ijoibm93Iiwic3Vic2NyaWJlX3BlcmlvZGljaXR5IjoibW9udGgifQ%3D%3D&signature=cHyVYmGfeC7B7ettjxq%2BGAQeVRM%3D",
          "twohundred" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMjAwIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6ItCU0L7QsdGA0L7QstGW0LvRjNC90LjQuSDQstC90LXRgdC%2B0Log0L3QsCDRgdGC0LDRgtGD0YLQvdGDINC00ZbRj9C70YzQvdGW0YHRgtGMLiDQkdC10Lcg0J%2FQlNCSIiwidHlwZSI6ImJ1eSIsImxhbmd1YWdlIjoidWsiLCJzdWJzY3JpYmUiOjEsInN1YnNjcmliZV9kYXRlX3N0YXJ0Ijoibm93Iiwic3Vic2NyaWJlX3BlcmlvZGljaXR5IjoibW9udGgifQ%3D%3D&signature=v%2BvJitOWI%2BETssYZUU28S2Ipecc%3D",
          "fivehundred" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiNTAwIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6ItCU0L7QsdGA0L7QstGW0LvRjNC90LjQuSDQstC90LXRgdC%2B0Log0L3QsCDRgdGC0LDRgtGD0YLQvdGDINC00ZbRj9C70YzQvdGW0YHRgtGMLiDQkdC10Lcg0J%2FQlNCSIiwidHlwZSI6ImJ1eSIsImxhbmd1YWdlIjoidWsiLCJzdWJzY3JpYmUiOjEsInN1YnNjcmliZV9kYXRlX3N0YXJ0Ijoibm93Iiwic3Vic2NyaWJlX3BlcmlvZGljaXR5IjoibW9udGgifQ%3D%3D&signature=ZS6saum6iGWiVk03L4kS021BSoQ%3D",
          "thouthand" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJzdWJzY3JpYmUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMTAwMCIsImN1cnJlbmN5IjoiVUFIIiwiZGVzY3JpcHRpb24iOiLQlNC%2B0LHRgNC%2B0LLRltC70YzQvdC40Lkg0LLQvdC10YHQvtC6INC90LAg0YHRgtCw0YLRg9GC0L3RgyDQtNGW0Y%2FQu9GM0L3RltGB0YLRjC4g0JHQtdC3INCf0JTQkiIsInR5cGUiOiJidXkiLCJsYW5ndWFnZSI6InVrIiwic3Vic2NyaWJlIjoxLCJzdWJzY3JpYmVfZGF0ZV9zdGFydCI6Im5vdyIsInN1YnNjcmliZV9wZXJpb2RpY2l0eSI6Im1vbnRoIn0%3D&signature=ATU3tREyRuvK8QhokPN4GF4lf7I%3D"
        };

        var liqDonate = { 
          "five" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiNSIsImN1cnJlbmN5IjoiVUFIIiwiZGVzY3JpcHRpb24iOiLQlNC%2B0LHRgNC%2B0LLRltC70YzQvdC40Lkg0LLQvdC10YHQvtC6INC90LAg0YHRg9C80YMgNSDQs9GA0L0gLCDQvdCwINGB0YLQsNGC0YPRgtC90YMg0LTRltGP0LvRjNC90ZbRgdGC0YwuINCR0LXQtyDQn9CU0JIiLCJ0eXBlIjoiZG9uYXRlIiwibGFuZ3VhZ2UiOiJ1ayJ9&signature=cN7ujTwAP%2BhKpvWozMi4RsNaies%3D",
          "ten" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMTAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0JTQvtCx0YDQvtCy0ZbQu9GM0L3QuNC5INCy0L3QtdGB0L7QuiDQvdCwINGB0YPQvNGDIDEwINCz0YDQvSAsINC90LAg0YHRgtCw0YLRg9GC0L3RgyDQtNGW0Y%2FQu9GM0L3RltGB0YLRjC4g0JHQtdC3INCf0JTQkiIsInR5cGUiOiJkb25hdGUiLCJsYW5ndWFnZSI6InVrIn0%3D&signature=FerZpuOKtQyKU3EbWqjtBfNE1iE%3D",
          "twenty" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMjAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0JTQvtCx0YDQvtCy0ZbQu9GM0L3QuNC5INCy0L3QtdGB0L7QuiDQvdCwINGB0YPQvNGDIDIwINCz0YDQvSAsINC90LAg0YHRgtCw0YLRg9GC0L3RgyDQtNGW0Y%2FQu9GM0L3RltGB0YLRjC4g0JHQtdC3INCf0JTQkiIsInR5cGUiOiJkb25hdGUiLCJsYW5ndWFnZSI6InVrIn0%3D&signature=zD%2FBJX%2Fg4rp%2F9gKAQlZuV8AI8NQ%3D",
          "fifty" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiNTAiLCJjdXJyZW5jeSI6IlVBSCIsImRlc2NyaXB0aW9uIjoi0JTQvtCx0YDQvtCy0ZbQu9GM0L3QuNC5INCy0L3QtdGB0L7QuiDQvdCwINGB0YPQvNGDIDUwLCDQvdCwINGB0YLQsNGC0YPRgtC90YMg0LTRltGP0LvRjNC90ZbRgdGC0YwuINCR0LXQtyDQn9CU0JIiLCJ0eXBlIjoiZG9uYXRlIiwibGFuZ3VhZ2UiOiJ1ayJ9&signature=4dwsi0m9c%2FtMcpqaMQLyxKYPJ08%3D",
          "hundred" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMTAwIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6ItCU0L7QsdGA0L7QstGW0LvRjNC90LjQuSDQstC90LXRgdC%2B0Log0L3QsCDRgdGD0LzRgyAxMDAsINC90LAg0YHRgtCw0YLRg9GC0L3RgyDQtNGW0Y%2FQu9GM0L3RltGB0YLRjC4g0JHQtdC3INCf0JTQkiIsInR5cGUiOiJkb25hdGUiLCJsYW5ndWFnZSI6InVrIn0%3D&signature=%2Fjdj3r6MjvEqr1gCuq3fyzvlwzE%3D",
          "twohundred" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMjAwIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6ItCU0L7QsdGA0L7QstGW0LvRjNC90LjQuSDQstC90LXRgdC%2B0Log0L3QsCDRgdGD0LzRgyAyMDAsINC90LAg0YHRgtCw0YLRg9GC0L3RgyDQtNGW0Y%2FQu9GM0L3RltGB0YLRjC4g0JHQtdC3INCf0JTQkiIsInR5cGUiOiJkb25hdGUiLCJsYW5ndWFnZSI6InVrIn0%3D&signature=EMkZzg2aU9a%2Bo68zSD5ciN4mjAg%3D",
          "fivehundred" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiNTAwIiwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6ItCU0L7QsdGA0L7QstGW0LvRjNC90LjQuSDQstC90LXRgdC%2B0Log0L3QsCDRgdGD0LzRgyA1MDAsINC90LAg0YHRgtCw0YLRg9GC0L3RgyDQtNGW0Y%2FQu9GM0L3RltGB0YLRjC4g0JHQtdC3INCf0JTQkiIsInR5cGUiOiJkb25hdGUiLCJsYW5ndWFnZSI6InVrIn0%3D&signature=OJsV9Yb4MymlHgksZXWu42Eq%2FSM%3D",
          "thouthand" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMTAwMCIsImN1cnJlbmN5IjoiVUFIIiwiZGVzY3JpcHRpb24iOiLQlNC%2B0LHRgNC%2B0LLRltC70YzQvdC40Lkg0LLQvdC10YHQvtC6INC90LAg0YHRg9C80YMgMTAwMCwg0L3QsCDRgdGC0LDRgtGD0YLQvdGDINC00ZbRj9C70YzQvdGW0YHRgtGMLiDQkdC10Lcg0J%2FQlNCSIiwidHlwZSI6ImRvbmF0ZSIsImxhbmd1YWdlIjoidWsifQ%3D%3D&signature=d%2BoihiAet0ZkC1tc9wRnviJGSYc%3D",
          "other" : "https://www.liqpay.ua/api/3/checkout?data=eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJwdWJsaWNfa2V5IjoiaTYzNzQ3MDgzNjU0IiwiYW1vdW50IjoiMCIsImN1cnJlbmN5IjoiVUFIIiwiZGVzY3JpcHRpb24iOiLQlNC%2B0LHRgNC%2B0LLRltC70YzQvdC40Lkg0LLQvdC10YHQvtC6INC90LAg0YHRgtCw0YLRg9GC0L3RgyDQtNGW0Y%2FQu9GM0L3RltGB0YLRjC4g0JHQtdC3INCf0JTQkiIsInR5cGUiOiJkb25hdGUiLCJsYW5ndWFnZSI6InVrIn0%3D&signature=otaIdRHKrjCDDK1fYBe8JLAHjjA%3D"
        };

        // var liqMonthly = document.querySelector('#donate-month')
        // var liqAmount = document.querySelector('#donate-amount')

        // liqMonthly.onchange = function() {
        //     hrefChange()
        //   };


        function hrefChange(){
        var href;

        if(liqAmount.value !== "Інша сума"){liqMonthly.parentElement.classList.remove('hided')}
        if(liqMonthly.checked){
          if(liqAmount.value == "5 грн"){href = liqSubscribe.five}
          if(liqAmount.value == "10 грн"){href = liqSubscribe.ten}
          if(liqAmount.value == "20 грн"){href = liqSubscribe.twenty}
          if(liqAmount.value == "50 грн"){href = liqSubscribe.fifty}
          if(liqAmount.value == "100 грн"){href = liqSubscribe.hundred}
          if(liqAmount.value == "200 грн"){href = liqSubscribe.twohundred}
          if(liqAmount.value == "500 грн"){href = liqSubscribe.fivehundred}
          if(liqAmount.value == "1000 грн"){href = liqSubscribe.thouthand}
          if(liqAmount.value == "Інша сума"){href = liqDonate.other; liqMonthly.checked = false; liqMonthly.parentElement.classList.add('hided')}
        }else{
          if(liqAmount.value == "5 грн"){href = liqDonate.five}
          if(liqAmount.value == "10 грн"){href = liqDonate.ten}
          if(liqAmount.value == "20 грн"){href = liqDonate.twenty}
          if(liqAmount.value == "50 грн"){href = liqDonate.fifty}
          if(liqAmount.value == "100 грн"){href = liqDonate.hundred}
          if(liqAmount.value == "200 грн"){href = liqDonate.twohundred}
          if(liqAmount.value == "500 грн"){href = liqDonate.fivehundred}
          if(liqAmount.value == "1000 грн"){href = liqDonate.thouthand}
          if(liqAmount.value == "Інша сума"){href = liqDonate.other; liqMonthly.checked = false;}
        }

        document.querySelector('.liqpay_link').setAttribute("href", href)
        }
 

       // form validation


          $.validator.addMethod('customphone', function (value, element) {
              return this.optional(element) || /^\+*3*8 [1-90]{3} [1-90]{3}-[1-90]{2}-[1-90]{2}$/.test(value);
          }, "Please enter a valid phone number");


           $("form").each(function(){
            var this_frm = $(this);
            $(this).validate({
              errorPlacement: function(error, element) {},
              onkeyup: false,
              onclick: false,
              rules:{
                phone: 'customphone'
              },
              highlight: function (element, errorClass, validClass) {
                         $(element).addClass('invalid');
                         if($(element).parent('.input-block')){
                          $(element).parent('.input-block').parent().parent().addClass('invalid');
                         }
                         if($(element).parent('.base-checkbox')){
                          $(element).parent('.base-checkbox').addClass('invalid');
                          if($(element).parent().parent().parent('.modal-join__form')){
                            $(element).parent().parent().parent().addClass('invalid');
                          }
                         }
                 },
             unhighlight: function (element, errorClass, validClass) {
                     $(element).removeClass('invalid');
                     if($(element).parent('.input-block')){
                      $(element).parent('.input-block').parent().parent().removeClass('invalid');
                     }
                     if($(element).parent('.base-checkbox')){
                      $(element).parent('.base-checkbox').removeClass('invalid');
                      if($(element).parent().parent().parent('.modal-join__form')){
                        $(element).parent().parent().parent().removeClass('invalid');
                      }
                     }
             },
             submitHandler: function(form) {
              if(this_frm.hasClass('modal-join__form')){
                if($('input[name="join-radio"]:checked').val() == "supporter"){
                  $('.modal.modal-join').addClass('next-step supporter');
                }else if($('input[name="join-radio"]:checked').val() == "member"){
                  $('.modal.modal-join').addClass('next-step member');
                }
              }
              else if(this_frm.hasClass('second-step__form')){
                $('.modal.modal-join').addClass('sending'); 
                var formData = this_frm.serialize();
                $.ajax({
                  type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                  url: this_frm.attr('action'), // the url where we want to POST
                  data: formData, // our data object
                  dataType: 'json', // what type of data do we expect back from the server
                  encode: true,
                  success: function(data) {
                    $('.modal.modal-join').addClass('success-status');
                  },
                //   error: function(data){
                //     $('.modal-window').removeClass('loading')
                //   }
                })
              }
                
              return false;

            }
            });
          });


          // $.validator.methods.text = function( value, element ) {
          //   return this.optional( element ) || /^\+*3*8 [1-90]{3} [1-90]{3}-[1-90]{2}-[1-90]{2}$/.test( value );
          // }



           // $('.modal-form input').on('click', function(){
           //      var cleave = new Cleave($(this), {
           //        prefix: '+38',
           //        numericOnly: true,
           //        delimiters: [' ', ' ', '-', '-'],
           //        blocks: [3, 3, 3, 2, 2],
           //        uppercase: true
           //    });
           //  });



           // $('.modal-submit').on('click', function () {
           //      $('.modal').addClass('click');
           //      setTimeout(function () {
           //          $('.modal').removeClass('click');
           //      }, 300);
           //  });



         



        // success form submiting
        // function SubSuccess(){
        //   $('.contact-us-form').addClass('success');

        //   setTimeout(
        //     function(){
        //       $('.modal_contact-us').removeClass('show');
        //       setTimeout(function(){
        //         $('.top-screen').removeClass('modal-on');
        //       },900);
        //     },1200);
        // }
        
        // SELECT

        //--------------------------------------

       jQuery(document).on('click', '.select dt', function (e) {

           e.preventDefault();

           var dl = jQuery(this).closest('dl.select');

           if ($(this).hasClass('active')) {
               jQuery(document).find('.select').find('dt').removeClass('active');
               jQuery(this).removeClass('active');

               setTimeout(function () {
                   jQuery(dl).removeClass('select-active');
               }, 0);

           }
           else {
               var scrollCont, api;
               var Selects = jQuery('.select-active');
               if (Selects.length) {
                   jQuery(Selects).removeClass('select-active');
               }
               $(this).parent().addClass('select-active');
               jQuery(document).find('.select').find('dt').removeClass('active');
               jQuery(this).addClass('active');
               if (jQuery(dl).hasClass('scrollable')) {
                   scrollCont = jQuery(this).parents('.select').find('.scroll-cont');
                   scrollCont.scrollbar();
               }
           }
           return false;
       });

       jQuery(document).on('click', function (e) {
           if (!jQuery(e.target).closest('.select-active').length) {
               var Selects = jQuery('.select-active');
               if (Selects.length) {
                   setTimeout(function () {
                       jQuery(Selects).find('dt.active').removeClass('active');
                       jQuery(Selects).removeClass('select-active');
                       var scrollCont = Selects.find('.scroll-cont');
                   }, 0);
               }
           }
       });

       jQuery(document).on('click ', '.select dd a', function (e) {

           if ($(this).hasClass('desel-label')) {
               e.preventDefault();
               e.stopPropagation();
               return false;
           }

           var parent = jQuery(this).closest('.select'),
               trigger = parent.find('dt');

           setTimeout(function () {
               jQuery(parent).removeClass('select-active invalid');
               var scrollCont = parent.find('.scroll-cont');
           }, 0);

           parent.find('a').removeClass('current');
           jQuery(this).addClass('current');
           trigger.find('.input-block').addClass('not-empty');
           trigger.removeClass('active').find('input').val(($(this).html()));
          if (jQuery(parent).hasClass('donate-amount')) {
            hrefChange();
          }
           if (parent.data('target-input') && jQuery(this).data('value') != null) {
               jQuery(parent.data('target-input')).val(jQuery(this).data('value')).trigger('change');
           }


           return false;
       });

      





})(jQuery);
