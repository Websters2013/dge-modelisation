"use strict";
( function() {

    $( function() {

        $.each( $( '.site__menu' ), function() {

            new Menu ( $( this ) );

        } );
    });

    var Language = function (obj) {

        //private properties
        var _obj = obj,
            _languagesDropDown = $( '.language__dropdown' ),
            _languagesItem = $( '.language__item' ),
            _languagesDropDownSpeed = 200,
            _mouseenterTimeout,
            _mouseleaveTimeout;

        //private methods
        var _onEvents = function () {

                _languagesItem.on({
                    click: function ( e ) {

                        if( $( this ).parent().hasClass( 'language__active' ) ) {

                            _obj.trigger('mouseenter');
                            e.preventDefault();

                        }

                        if( $( this ).parent().hasClass( 'language__dropdown' ) ) {

                            $( '.language__active .language__item' ).appendTo( _languagesDropDown );

                            $( this ).appendTo( '.language__active' );

                            _obj.removeClass( 'active' );
                            _languagesDropDown.stop( true, true ).slideUp( _languagesDropDownSpeed );

                        }
                    }
                });

                _obj.on({
                    mouseenter: function () {
                        clearTimeout( _mouseleaveTimeout );

                        _mouseenterTimeout = setTimeout( function() {

                            _obj.addClass( 'active' );
                            _languagesDropDown.stop( true, true ).slideDown( _languagesDropDownSpeed );

                        }, 200);
                    }
                });

                _obj.on({
                    mouseleave: function () {

                        clearTimeout( _mouseenterTimeout );

                        _mouseleaveTimeout = setTimeout( function() {

                            if(_languagesDropDown.is( ':visible' ) ) {

                                _obj.removeClass( 'active' );
                                _languagesDropDown.stop( true, true ).slideUp( _languagesDropDownSpeed );
                            }

                        }, 200);

                    }
                });

            },
            _constructor = function () {
                _onEvents();
            };

        //public properties

        //public methods


        _constructor();
    };

    var Menu = function( obj ) {

        //private properties
        var _self = this,
            _menu = obj,
            _hammer = null,
            _body = $( 'body' ),
            _window = $( window ),
            _showBtn = $( '.site__menu-btn' );

        //private methods
        var _onEvents = function() {

                _showBtn.on( {
                    click: function() {

                        _openMenu( $( this ) );

                    }
                } );

                _window.on( {
                    resize: function () {

                        _resetStyle();

                    },
                    scroll: function () {

                        _checkScroll();

                    }
                } );
                _hammer.on("panright", function(){

                    if( _menu.hasClass( 'opened' ) ) {

                        _showBtn.removeClass( 'opened' );
                        _menu.removeClass( 'opened' );

                        _body.css( {
                            'overflow': 'visible'
                        } );

                    }
                });

            },
            _checkScroll = function () {

                var windowScroll = _window.scrollTop(),
                    heroHeight = $('.site__hero').innerHeight();

                if ( windowScroll > heroHeight ) {

                    if ( !_showBtn.hasClass( 'active' ) ) {

                        _showBtn.addClass('active')

                    }

                } else {

                    _showBtn.removeClass('active')

                }

            },
            _openMenu = function( elem )  {

                var curItem = elem;

                if( curItem.hasClass( 'opened' ) ) {

                    curItem.removeClass( 'opened' );
                    _menu.removeClass( 'opened' );

                    _body.css( {
                        'overflow': 'visible'
                    } );

                } else {

                    curItem.addClass( 'opened' );
                    _menu.addClass( 'opened' );

                    _body.css( {
                        'overflow': 'hidden'
                    } );
                }

            },
            _resetStyle = function() {

                _showBtn.removeClass( 'opened' );
                _menu.removeAttr( 'style' );
                _body.css( {
                    'overflow': 'visible'
                } );

            },
            _initHammer = function(){

                _hammer = new Hammer.Manager(_menu[0]);
                _hammer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
                delete Hammer.defaults.cssProps.userSelect;

            },
            _init = function() {
                _menu[ 0 ].obj = _self;
                _initHammer();
                _onEvents();
            };

        _init();
    };

} )();
