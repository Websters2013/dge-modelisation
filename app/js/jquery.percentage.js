"use strict";
( function(){

    $( function () {

        $.each( $( '.site__hero' ), function() {

            new Animations ( $( this ) );
        } );
    } );

    var Animations = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _heroText = _obj.find( '.site__hero-text' ),
            _btnDown = _obj.find( '.site__hero-down' ),
            _percentage = _obj.find( '.percentage' ),
            _propertiesWrap = $( '.properties' ),
            _checkable = false,
            __percentageText = _percentage.find( '.percentage__percent span' ),
            _duration = 2000,
            _canAnimate = true,
            _canDraw = true,
            _firstStep = true,
            _number = parseInt( _percentage.data( 'percent' ) ),
            _startTime = 0,
            _canvas = document.createElement( 'canvas' ),
            _ctx = _canvas.getContext( '2d' ),
            _from = 0,
            _window = $( window ),
            _scroller = $('html, body');

        //private methods
        var _constructor = function () {
                _percentage[0].percentage = _self;
                _setHeight();
                _onEvents();
                __percentageText.text( _from );
                _addCanvas();
            },
            _setHeight = function () {

                _obj.css({
                    'height': _window.height()
                });
            },
            _onEvents = function () {

                _window.on( {
                    load: function(){

                        setTimeout( function() {
                            _loop();
                        }, 500 );

                    },
                    resize: function() {

                        _setHeight();
                        _redDraw()
                    }
                } );

                _btnDown.on( {
                    click: function(){

                        _scroller.animate( {scrollTop: _obj.innerHeight() }, 500 );
                    }
                } );
            },
            _addCanvas = function() {

                _canvas.width = _canvas.height = _percentage.height() + 4;

                var color='rgba(0,133,200, 1)';

                _ctx.translate( _canvas.width / 2, _canvas.height / 2 );
                _ctx.strokeStyle = color;
                _ctx.lineWidth = 8;
                _percentage.prepend( _canvas );

                $(_canvas).width( _percentage.height() + 4 );
                $(_canvas).height( _percentage.height() + 4 );

            },
            _loop = function (){

                if( _canAnimate && _canDraw && _number !== 0 ) {

                    _render();
                    _canAnimate = false;
                }

            },
            _gradToRad = function( grad ){

                return grad * Math.PI / 180;
                
            },
            _redDraw = function() {

                var color='rgba(0,133,200, 1)',
                    result = parseInt( _number );

                _canvas.width = _canvas.height = _percentage.height() + 4;
                _ctx.strokeStyle = color;
                _ctx.lineWidth = 8;
                _ctx.translate( _canvas.width/2, _canvas.height/2 );
                _ctx.clearRect( - ( _canvas.width/2),-(_canvas.height/2),_canvas.width,_canvas.height);
                _ctx.beginPath();
                _ctx.arc( 0, 0, ( _canvas.height - 8 ) / 2, _gradToRad( 270 ), _gradToRad( 270 + ( ( result/100 ) * 360 ) ) );
                _ctx.stroke();

                $( _canvas ).width( _percentage.height() + 4 );
                $( _canvas ).height( _percentage.height() + 4 );

            },
            _render = function( time ){

                var now = time - _startTime,
                    progress = now/_duration,
                    resultVal = null,
                    range = _number,
                    current = 0,
                    increment = _number > 0? 1 : -1,
                    stepTime = Math.abs( Math.floor( _duration / range ) ),
                    timer,
                    pauseAnimation = true,
                    randomInt = Math.floor( Math.random() * ( 25 - 5 + 1 ) ) + 5;

                if( progress > 1 ){
                    progress = 1;
                    _firstStep = true;
                    _canDraw = false;
                }

                timer = setInterval( function() {

                    if ( pauseAnimation ) {

                        current += increment;

                        _ctx.clearRect( -( _canvas.width/2 ), - ( _canvas.height/2 ), _canvas.width, _canvas.height );
                        _ctx.beginPath();
                        _ctx.arc( 0, 0, ( _canvas.height - 8 )/2, _gradToRad( 270 ), _gradToRad( 270 + ( ( current/100 ) * 360 ) ) );

                        _ctx.stroke();

                        resultVal = current + '';

                        __percentageText.text( current );

                        if ( current == range ) {

                            clearInterval( timer );

                        }
                    }

                    if ( current == randomInt) {

                        pauseAnimation = false;

                        _heroText.addClass( 'animation' );

                        setTimeout(function () {

                            pauseAnimation = true

                        }, 2000)

                    }

                }, stepTime );

                setTimeout(function () {

                    _btnDown.addClass( 'animation' )

                }, 2500);

                _canAnimate = false;
                _canDraw = false;
            };

        //public properties

        //public methods

        _constructor();
    };

} )();
