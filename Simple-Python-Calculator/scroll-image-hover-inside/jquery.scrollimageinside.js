/**
 * jQuery Scroll Image Inside v0.1
 * Copyright 2021 Derek Ashauer
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
(function( $ ) {

    $.fn.scrollimageinside = function( options ) {

        var settings = $.extend({
            speed: 250,
            duration: 15,
            height: 0,
            easing: 'linear'
        }, options );

        var data = {
            current_position: 0,
            height: 0,
            distance_to_scroll: 0,
            duration: 0
        };

        var scrollitem = $( this );
        var scrollitemimage = $( 'img', this );
        scrollitem.css( {
            'position': 'relative',
            'overflow': 'hidden'
        });
        if ( settings.height > 0 ) {
            scrollitem.css( 'height', settings.height + 'px' );
        }
        scrollitemimage.css( {
            'width': '100%',
            'display': 'block',
            'transition': 'transform ' + settings.duration + 's ' + settings.easing
        });
        scrollitem.append( '<div class="scrollimage-up"></div><div class="scrollimage-down"></div>' );

        data.height = scrollitemimage.height() - scrollitem.height();
        data.distance_to_scroll = data.height;
        data.duration = data.height / settings.speed;

        scrollitemimage.css( 'transition-duration', data.duration.toFixed(2) + 's' );
        $( '.scrollimage-up', scrollitem ).hover( function(){
            console.log( scrollitem );
            data.current_position = parseInt( scrollitemimage.css( 'transform' ).split( ',' )[5]);
            data.distance_to_scroll = Math.abs( data.current_position );
            data.duration = data.distance_to_scroll / settings.speed;
            scrollitemimage.css( 'transition-duration', data.duration.toFixed(2) + 's' );
            scrollitemimage.css( 'transform', 'translateY( 0 )' );
        }, function(){
            data.current_position = parseInt( scrollitemimage.css( 'transform' ).split( ',' )[5]);
            scrollitemimage.css( 'transform', 'translateY(' + data.current_position + 'px)' );
        });
        $( '.scrollimage-down', scrollitem ).hover( function(){
            console.log( scrollitem );
            data.current_position = parseInt( scrollitemimage.css( 'transform' ).split( ',' )[5]);
            data.distance_to_scroll = ( data.height + data.current_position );
            data.duration = ( data.distance_to_scroll / settings.speed );
            scrollitemimage.css( 'transition-duration', data.duration.toFixed(2) + 's' );
            scrollitemimage.css( 'transform', 'translateY( calc( -100% + ' + scrollitem.height() + 'px ) )' );
        }, function(){
            data.current_position = parseInt( scrollitemimage.css( 'transform' ).split( ',' )[5]);
            scrollitemimage.css( 'transform', 'translateY(' + data.current_position + 'px)' );
        });

        return this;

    };

}( jQuery ));
