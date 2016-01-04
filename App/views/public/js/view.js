    
    var standalone = window.navigator.standalone,
        userAgent  = window.navigator.userAgent.toLowerCase(),
        safari     = /safari/.test( userAgent ),
        ios = /iphone|ipod|ipad/.test( userAgent );
        android = /android/i.test( userAgent );
        chrome = /chrome/i.test( userAgent );


        $(document).ready(function(){

            if(ios){
                if ( !standalone && safari ) {
                    //browser
                    //$('body').addClass('showsocial')
                    $('head').append('<meta name="apple-itunes-app" content="app-id=1010678858">')
                } else if ( standalone && !safari ) {
                    //standalone
                    //$('body').addClass('showsocial')
                    $('body').addClass('apple');
                } else if ( !standalone && !safari ) {
                    //uiwebview
                    $('body').addClass('apple');
                };
                $('#layer').hide();
            }
            if(android){
                $('#product').css('overflow', 'scroll');
                $('body').addClass('android')
            }
            if( $(window).width() > 1024 ){
                //$('body').addClass('showsocial')
            }

              var params = {};
            if (location.search) {

                var parts = location.search.substring(1).split('&');

                for (var i = 0; i < parts.length; i++) {
                    var nv = parts[i].split('=');
                    if (!nv[0]) continue;
                    params[nv[0]] = nv[1] || true;
                }
            }
                 

     
            if(params.origin == "AndroidWebview" || params.origin == "iOSWebview" || params.o == "w"){
                
                   $('#altfooter').addClass('hidden');
            }else{
                   $('#altfooter').removeClass('hidden').addClass('visible-xs');
            }


            $('body').addClass('showsocial');
            $('#layer').hide();

            dropBoxOption();
            sizes()

            FastClick.attach(document.body);



            $('#menu').on('click', function(e){
                e.stopPropagation();
                //$('html').click();
                if( $('#menu i').hasClass('flaticon-menu55') || $('#menu i').hasClass('flaticon-close47') ){
                    menuMenu();
                    $('#banner').addClass('hidden');
                } else if( $('#menu i').hasClass('flaticon-go10') ) {
                    /*$('#product').fadeOut(200, function(){
                        $('body, html').css('overflow', 'auto');
                        $('#menu i').addClass('flaticon-menu55');
                        $('#menu i').removeClass('flaticon-go10');
                    });*/
                    $('#product').removeClass('show');
                    $('body, html').css('overflow', 'auto');
                    $('#menu i').addClass('flaticon-menu55');
                    $('#menu i').removeClass('flaticon-go10');
                }
                
            });
            $('#cart').on('click', function(e){
              //  e.stopPropagation();
                //$('html').click();
                cartMenu();
                $('#banner').addClass('hidden')
            });

            $(document).on('click', '#basket .back', function(){
                cartMenu();
            });
            
            $('#menu i.flaticon-close47, #cart i.flaticon-close47').on('click', function(e){
                cartMenu();
                menuMenu();
                /*if(!$(e.target).closest('#nav, #basket').length) {
                    $('#nav').css('left', '-270px');
                    $('#basket').css('right', '-' + $('#basket').width() + 'px');
                    $('body').removeClass('overflow');
                    $('body > *').css('left', 'auto').css('right', 'auto');
                }*/
            });

            $('#banner i.closebanner, #banner i.openbasket').on('click', function(e){
                $('#banner').addClass('hidden')
            });
            
            $('#nav a').on('click', function(e){
                if(e.originalEvent && $(window).width() < 1200){
                        window.setTimeout(function(){
                        menuMenu();
                    }, 150)
                }
            });

            $(document).on('click', '#content, #promocoes .glide__track', function(e){
                if(e.originalEvent){
                    if( $('#menu i').hasClass('flaticon-close47') ){
                        menuMenu();
                    }
                    if( $('#cart i').hasClass('flaticon-close47') ){
                        cartMenu();
                    }
                }
            });
            
            /*
            PRECISA SER IMPLEMENTADO DEPOIS DO DOM

            $('.groupname').waypoint(function(direction) {
                if(direction == 'down'){
                    var text = $(this).text().trim();
                    $('#groups select option').each(function(){
                        if( String($(this).text().trim()) == String(text.trim()) ){
                            $(this).attr('selected', true);
                        }
                    })
                }
            }, { offset: 120 });*/
            
            $(document).on('click', '#groups .col, #groupsdetails > div', function(e){
                var label = $(this).data('ref');
                if(label){
                    label = label.trim();
                    if( $('#home').is(':visible') ){
                        showMenu();
                        //$('#categs').hide();
                        $('#cardapiocontainer').removeClass('hidden-xs').show();
                    }
                    if( $('#product').is(':visible') ){
                        $('#product').removeClass('show');
                    }
                    if( $('#groupsdetails').is(':visible') ){
                        //$('#groups .details').click();
                        $('#groups .details').removeClass('flaticon-expand39').addClass('flaticon-expand38')
                        $('#groupsdetails').slideUp(100)
                    }
                    $('.groupname').each(function(){
                        if( String($(this).text().trim()) == String(label) ){
                            if( $('body.apple').length ){ 
                                var height =  $(this).offset().top - 170 
                            } else { 
                                var height =  $(this).offset().top - 140 
                            };
                            $('html, body').animate({
                                scrollTop: height
                            }, 300);
                        }
                    })
                }
            });
            
            $('input[type=search]').on('focus', function(e){
                 showMenu();
                $('#cardapiocontainer').removeClass('hidden-xs').show();
                $('#groupsdetails div:not(.search)').hide();
            });

            /*$(document).on('click', '#groups .totop',function(){
                $('html, body').animate({
                    scrollTop: 0
                }, 300);
            });*/
            

            /*$(document).on('click','#categs [target]', function(e){
                if(e.originalEvent){
                    var offset = false;
                    if( $(this).data('categ') ){
                        $('#cardapiocontainer').removeClass('hidden-xs').show();
                        var target = $(this).data('categ');
                        //console.log(target);
                        $('h1.groupname').each(function(){
                            if($(this).text().trim() == target){
                                offset = $(this).offset().top;
                                return false
                            }
                        })
                    } else {
                        offset = 330
                    }
                    if(offset){
                        if( $('body.apple').length ){ 
                            var height =  offset - 170 
                        } else { 
                            var height =  offset - 140 
                        };
                        
                        $('html, body').delay(300).animate({
                            scrollTop: height
                        }, 300);
                    }
                }
                
            });*/

            $(document).on('click', '#groups .details', function(e){
                if( $('#groupsdetails').is(':visible') ){
                    $('#groups .details').removeClass('flaticon-expand39').addClass('flaticon-expand38')
                    $('#groupsdetails').slideUp(100)
                } else {
                    $('#groupsdetails div:not(.search)').show();
                    $('#groupsdetails').slideDown(250);
                    $('#groups .details').removeClass('flaticon-expand38').addClass('flaticon-expand39');

                }
            })

           
          
            /*$(document).on('click','#content .products li .badge', function(){
                if( $(this).parent().parent().find('.cover div').is(':visible') ){
                    $(this).parent().parent().find('.cover div').fadeOut(200);
                } else {
                    $(this).parent().parent().find('.cover div').fadeIn(200);
                }
            });
          
            $(document).on('click','#content .products li .cover .exit', function(){
                $(this).parent().fadeOut(100);
            });*/
            
           
            // $(document).on('click','.products li form > button', function(){
            //     updateCounter( parseInt($('#cart .badge').text()) + 1 )
            // });


            // if( $('#promocoes').length ) {
            //     var count = 1;
            //     var limit = $('#promocoes .slide').length;
            //     var speed = $('#promocoes').data('speed');
            //     var slide;
            //     //setupSlide();

            //     $('#promocoes .slide').css('width', $(window).width() );
            //     $('#promocoes .row').css('width', 'calc(' + $(window).width() + ' * ' + $('#promocoes .slide').length + ')');

            //     var slider = $('#promocoes').glide({
            //         type: 'slider',
            //         autoplay: 5000,
            //         paddings: -30
            //     });            
            // }

            
          
          
            
            $(document).on('click','#groups .search .dosearch', function(){
                if( !$('#groups .search #search').is(":visible") ){
                    $('#groups .category').removeClass('col-xs-10').addClass('col-xs-2');
                    $('#groups .search').removeClass('col-xs-2').addClass('col-xs-10');
                    $('#groups .search #search').show().focus();
                }
            });
            
            $(document).on('click','#groups .category select', function(){
                if( $(window).width() < 991  ){
                    $('#groups .category').removeClass('col-xs-2').addClass('col-xs-10');
                    $('#groups .search').removeClass('col-xs-10').addClass('col-xs-2');
                    $('#groups .search #search').hide().blur();
                }
            })
            
            //SIGNIN SIGNUP
            
            $('#login #up').hide();
            $(document).on('click','.signup', function(){
                $('#login #in').fadeOut('fast');
                $('#login #up').fadeIn('fast');
            });
            
            $(document).on('click','.signin', function(){
                $('#login #up').fadeOut('fast');
                $('#login #in').fadeIn('fast');
            })
            
            
            //CADASTRO
            
            $(document).on('click','.address li', function(){
               
                   // $('.address li').removeClass('active');
                    // $('#addressedit').slideDown();
                    // $(this).toggleClass('active');
                    // $('html, body').delay(300).animate({
                    //     scrollTop: 0
                    // }, 300);

            })
            
            
            
            
            //PEDIDOS
            
            
            
            $(document).on('click','#content .pedido h3', function(){
                var elem = $(this).parent();
                    
                    $('#content .pedido').find('h3:first').find('span:last').css('border', '1px solid #D1D1D1');
                
                if( elem.hasClass('active') ){
                    $('#content .pedido').removeClass('active');
                    $('#content .pedido').find('.row').slideUp(100);
                   
                } else {
                    $('#content .pedido').removeClass('active');
                    $('#content .pedido').find('.row').slideUp(100)
                    elem.addClass('active');
                    elem.find('h3:first').find('span:last').css('border', '1px solid rgba(233, 67, 57, 0.49)');
                    elem.find('.row').delay(100).slideDown(200, function(){
                        $(this).css('display', 'block');
                        $('html, body').animate({
                            scrollTop: elem.offset().top - 120
                        }, 300);
                    });
                }
                 
            });
            
            $('#content .pedido.active .row').slideDown(200, function(){
                $(this).css('display', 'block');
            });

            $(document).on('click','#product #qnt button', function(){
                if( $(this).data('type') == "plus" ){
                    if( parseInt($('#product #qnt big').text()) < parseInt($('#product #qnt').data('maxlength')) ){
                        $('#product #qnt big').text( parseInt($('#product #qnt big').text()) + 1 );
                        
                        setTimeout(function() { multiplyValuesProduct( parseInt($('#product #qnt big').text())) }, 40); 

                    }
                } else {
                    if( parseInt($('#product #qnt big').text()) > 1 ){
                        $('#product #qnt big').text( parseInt($('#product #qnt big').text()) - 1 );
                        setTimeout(function() { multiplyValuesProduct( parseInt($('#product #qnt big').text())) }, 40); 

                    }
                }
            });

            $(document).on('click','#product #promoimg .badge', function(){
                if( $('#product #promoimg .promodesc').is(':visible') ){
                    $('#product #promoimg .promodesc').hide()
                } else {
                    $('#product #promoimg .promodesc').show()
                }
            })
            
            //FINALIZAR
            
            /*$('.cards li').on('click', function(e){
                console.log($(this));
                $(this).find('input').prop( "checked", true );
            })*/


            //USUARIO LOGADO

            $(document).on('click','#nav #logout', function(){
                logOutSocial()
            });


            //DELETAR 
            /*
            window.setInterval(function(){
                if(oauth_user.email){
                    $('#nav #user').text(oauth_user.name);

                } else {
                    console.log('var oauth_user vazia')
                }
            },10000) */

            $('.autoheight').css( 'min-height', $(document).height() - 225 );


            
          
            
        });

        $(window).resize(function(){
            sizes()
        })


function sizes(){
    $('#promocoes .slide').css('width', $(window).width() );
    $('#load, #viewchange').height( $(window).height() );
    if( $(window).width() < 991  ){
        $('header #basket .back cite').hide()
    } else {
        $('header #basket .back cite').show()
    }
}

function menuMenu(){
    if( $('#nav').css('left') == '0px' ){
        $('body').removeClass('overflow');
        $('#nav').animate({
            left : '-270px'
        }, 150)
        $('body > *').animate({
            left : '0px',
            right : 'auto'
        }, 150, function(){
            $('#menu i').addClass('flaticon-menu55').removeClass('flaticon-close47')
        })
    } else {
        
        $('body').addClass('overflow');
        $('#nav').animate({
            left : '0px',
            right : 'auto'
        }, 300);
        $('body > *').animate({
            left : '270px',
            right : 'auto'
        }, 300, function(){
            $('#menu i').removeClass('flaticon-menu55').addClass('flaticon-close47')
        })
    }
}
function cartMenu(){
    if( $('#basket').css('right') == '0px' ){
        $('body').removeClass('overflow');
        $('#basket').animate({
            right : '-' + $('#basket').width() + 'px'
        }, 150);
        $('body > *').animate({
            right : '0px',
            left : 'auto'
        }, 150, function(){
            $('#cart > i').addClass('flaticon-shopping232').removeClass('flaticon-close47')
        })
    } else {
        $('body').addClass('overflow');
        $('#basket').animate({
            right : '0px'
        }, 300);
        $('body > *').animate({
            right : $('#basket').width() + 'px',
            left : 'auto'
        }, 300, function(){
            $('#cart > i').removeClass('flaticon-shopping232').addClass('flaticon-close47')
        });
    }
}
function showMenu(){
    $('#home').removeClass('visible-xs').hide();
    $('#cardapio').removeClass('hidden-xs').show();
    //$('#cardapiocontainer').css('margin-top', 170);
    //$('#promocoes').hide();
    //$('body.apple #promocoes').hide()
}
function deleteBasketItem(elem) {
      //if(removeIsValid()){ elem.parent().animate({ right : '-270px' }, 300, function(){ elem.parent().remove() }) }
}
function alert(title, body, action, label){
    $('#alert .col h3').html(null);
    $('#alert .col p.body').html(null);
    $('#alert .col p button.action').attr('onClick', null);

    $('#alert').fadeIn(400);
    $('#alert .col h3').html(title);
    $('#alert .col p.body').html(body);
    if(action){
        $('#alert .col p button.action').attr('onClick', action).text(label);
    } else {
        $('#alert .col p button.action').hide();
    }
    
    $('#alert .col p button.exit').on('click', function(){
        $('#alert').fadeOut(200);
        $('body, html').css('overflow', 'auto');
    })
    
}
function updateCounter(num){
    $('#cart .badge').animate({
        opacity : 0,
        top: 15,
    }, { queue : false, duration : 200, complete : function(){
        $('#cart .badge').css('top', '-15px');
        $('#cart .badge').text(num);
            $('#cart .badge').animate({
                opacity : 1,
                top: 0,
            }, 200);
        if( $('html').hasClass('no-touch') ){
            window.setTimeout('cartMenu()', 400);
        } else {
            if( parseInt($('#cart .badge').text()) == 1 ){
                 window.setTimeout('cartMenu()', 400);
            }
        }
    }
        
    });
}

function testProduct(){
    //$('#product').fadeIn(100);
  //  console.log('test')
}



function openProduct(){


                if( $('#menu i').hasClass('flaticon-menu55') ){
                    $('#menu i').removeClass('flaticon-menu55');
                    $('#menu i').addClass('flaticon-go10');
                } else {
                    $('#menu i').addClass('flaticon-menu55');
                    $('#menu i').removeClass('flaticon-go10');
                }
                if( $('#cart i').hasClass('flaticon-close47') ){
                    cartMenu();
                    
                } else if( $('#cart i').hasClass('flaticon-close47') ){
                    menuMenu();
                }
                $('#product').addClass('show');
                $('#morepanel').slideUp(1);
                $('#product #more').text('Mais opções');

                $('body, html').css('overflow', 'hidden');

}

$(document).on('click', '.products li.product .badge', function(){
    $('body, html').css('overflow', 'hidden');
});




//EVENTOS
$('#product #exit').on('click', function(){
    /*$('#product').fadeOut(200, function(){
        $('body, html').css('overflow', 'auto');
        $('#menu i').addClass('flaticon-menu55');
        $('#menu i').removeClass('flaticon-go10');
    });*/
    $('#product').removeClass('show');
    $('body, html').css('overflow', 'auto');
    $('#menu i').addClass('flaticon-menu55');
    $('#menu i').removeClass('flaticon-go10');
    
});




$('#product #more').on('click', function(){
    
    if(!$('#morepanel').hasClass('no-show')){

    if( $('#morepanel').is(':visible')){
        $('#morepanel').slideUp('fast')
        $('#product #more').text('Mais opções')
    } else {
        $('#morepanel').slideDown('fast');
     }

    }
    
});

$(document).on('click', '#product #morepanel .ingr', function(){
    
    $(this).toggleClass('active');
})

// $(document).on('click','#product form .col', function(){
    
//     $(this).parent().parent().find('.col').css('opacity', '.3');
//     if( $(this).hasClass('active') ){
//         $(this).parent().parent().find('.col').removeClass('active');
//         $(this).find('input[type=checkbox]').prop('checked', false); 
//     } else {
//         $(this).find('input[type=checkbox]').prop('checked', false); 
//         $(this).parent().parent().find('.col').removeClass('active');
//         //
//         $(this).addClass('active');
//         $(this).find('input[type=checkbox]').prop('checked', true); 
//     }
// })





$(document).on('click','#product div[list="tamanho-product"] .col', function(){
           
            
            $('#product div[list="tamanho-product"] .col').removeClass('active');
            $(this).addClass('active')

})


$(document).on('click','#product div[list="tipos"] .col', function(){
                
                        
            $('#product div[list="tipos"] .col').removeClass('active');
            $(this).addClass('active')

})



function dropBoxOption(){

         $(document).on('click','.callbak-option-add', function(e){

                        $(this).closest('.options').css('height','63%').animate({ height : '0%' }, 200).toggleClass('callbak-option-add');
            })


         $(document).on('click','.callbak-option-remove', function(e){

                        $(this).closest('.options').css('height','63%').animate({ height : '0%' }, 200).toggleClass('callbak-option-remove');
            })


         $(document).on('click', '.closebtn', function(event) {

                  $(this).closest('.options').css('height','63%').animate({ height : '0%' }, 200);

             event.preventDefault();
             /* Act on the event */
         });

         $(document).on('click', '.opcionais', function(event) {

                  $(this).closest('.options.add').css('height','63%').animate({ height : '0%' }, 200);
                  $(this).closest('form').find('.options.remove').show().css('height','0%').animate({ height : '63%' }, 200);

             event.preventDefault();
             /* Act on the event */
         });

         $(document).on('click', '.retirar', function(event) {

                  $(this).closest('.options.remove').css('height','63%').animate({ height : '0%' }, 200);
                  $(this).closest('form').find('.options.add').show().css('height','0%').animate({ height : '63%' }, 200);

             event.preventDefault();
             /* Act on the event */
         });

}



function openMap(lat, lng){
    
    if(typeof google != "undefined"){
        if(typeof google.maps != "undefined"){
            // console.log('mapa open');
            $('.container[view=Lojas]').css('padding-top', '60px');
            var markers = [];
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            if( $('#map').is(':visible') ){
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                var marker = new google.maps.Marker({
                    position: { lat: lat, lng:  lng },
                    map: map
                });
                /*var infowindow = new google.maps.InfoWindow({
                    content: $(this).data('window')
                });*/
                map.panTo(marker.getPosition());
                map.setZoom(15);
                markers.push(marker);
                //infowindow.open(map,marker);
                $('html, body').animate({
                    scrollTop : 0
                }, 300)
            } else {
                $('#map').removeClass('hidden').show();
                var mapOptions = {
                    center: { lat: -16.6428184, lng: -49.2624666 },
                    zoom: 5 
                }; 
                
                //$('#content .container').css('padding-top', '20px');
                
                
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                var marker = new google.maps.Marker({
                    position: { lat: lat, lng:  lng },
                    map: map
                });
                /*var infowindow = new google.maps.InfoWindow({
                    content: $(this).data('window')
                });*/
                map.panTo(marker.getPosition());
                map.setZoom(15);
                markers.push(marker);
                //infowindow.open(map,marker);
                $('html, body').animate({
                    scrollTop : 0
                }, 300)
            }
        }
    }
    
    //LOCALIZAÇÃO DE LOJAS

    /*if($('#lojas').length){
        $('#lojas li .map').on('click', function(e){
            //$("#lojas li").removeClass('active');
            //$(this).addClass('active');

            
            $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + $(this).data('address') + "&key=AIzaSyBc2uRPsQ6pN0xTjx6sniJ3lZNWNLebrJs", function( data ) {
                for (var i = data.results.length - 1; i >= 0; i--) {
                    var marker = new google.maps.Marker({
                        position: data.results[i].geometry.location,
                        map: map,
                        title: data.results[i].formatted_address
                    });
                    
                };
            })
        })
    }*/
}







    $(document).on('click','.products li .openoptions', function(e){
        
        e.preventDefault();

            if($('html').hasClass('touch')){
                if($('body').hasClass('apple')){
                    $('html, body').animate({
                        scrollTop : $(this).closest('li').offset().top - 150
                    }, 300)
                } else {
                    $('html, body').animate({
                        scrollTop : $(this).closest('li').offset().top - 120
                    }, 300)
                }
            }
            
            // ELEMENTOS DINAMICOS
            $('.products li .options .scrollarea').slimScroll({
                
                     height: '85%'
            })

          if( $(this).hasClass('add') ){
        
                $(this).parent().parent().find('.options.add').show().animate({ height : '63%' }, 200);
        
          } 

       
    });





    $(document).on('click','.options .scrollarea input', function(e){
        
                   $(this).toggleClass('checked');
    })


    /*
    //EASTEREGG
    var running;
    var count;
    var roll;
    $('body').on('click', function(e){
        if(e.originalEvent){
            if(!running){

                running = true;
                count = 0;
                roll = setTimeout(function(){
                    $('body').removeClass('roll');
                    running = false;
                    count = 0;
                    clearTimeout(roll)
                },1500);
            } else {
                count++
                if(count > 5){
                    $('body').addClass('roll');
                    running = false;
                    count = 0;
                    clearTimeout(roll)
                }
            }
        }
    })
    */
