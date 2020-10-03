let SlickGallery = (() => {
    let _config = {};

    let _classes = {
        slider: '.slick-gallery',
        slick_box: '.slick-box',
        image_frame: '.slick-box__frame',
        preview_box: '.slick-box__preview'
    };

    let _onClick = (e) => {
        let target = e.target;

        if(target.tagName != "IMG") return _triggerHandlers(e);

        let $img = $(target);
        let $slider = $img.parents(_classes.slider);
  
        if($slider.length) _showGallery($slider, $img);
    };

    let _onScroll = (e) => {
        e.preventDefault();
      
        if(e.originalEvent.wheelDelta < 0) _showNext();
        else  _showPrev();
    };

    let _onKeyPress = (e) => {
        switch(e.key){
            case 'Escape':
                _hideGallery();
            break;
            case 'ArrowLeft':
                _showPrev();
            break;
            case 'ArrowRight':
                _showNext();
            break;
        }
    };

    let _setEventListeners = () => {
        let iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
        let ipadOS = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) && !window.MSStream;

        if(iOS || ipadOS) window.addEventListener("touchstart", _onClick, { passive: false }); 
        else $(window).on('click', _onClick);
    };

    const arrowIcon = '<svg width="19px" height="19px" xmlns="http://www.w3.org/2000/svg"> <g>  <g id="svg_5">   <line fill="none" stroke="#C4A278" x1="-0.962253" y1="9.718406" x2="17.511029" y2="9.64207" id="svg_1" stroke-linejoin="undefined" stroke-linecap="undefined" stroke-width="2"/>   <line fill="none" stroke="#C4A278" x1="8.718832" y1="18.481481" x2="18.108145" y2="9.015832" id="svg_2" stroke-linejoin="undefined" stroke-linecap="undefined" stroke-width="2"/>   <line fill="none" stroke="#C4A278" x1="8.721798" y1="10.280464" x2="18.111111" y2="0.814815" id="svg_3" stroke-linejoin="undefined" stroke-linecap="undefined" transform="rotate(90, 13.4165, 5.54764)" stroke-width="2"/>  </g> </g></svg>';

    let _appendHTML = () => {
        $('body').append(`
        <div class='slick-box'>

            <div class='slick-box__content'>

                <div class='slick-box__close'></div>
                
                <div class='slick-box__row'>
                    <div class='slick-box__arrow slick-box__arrow--prev'>
                        ${arrowIcon}
                    </div>
                    <div class='slick-box__frame'></div>
                    <div class='slick-box__arrow slick-box__arrow--next'>
                        ${arrowIcon}
                    </div>
                </div>
                
            </div>

            <div class='slick-box__preview'></div>
        </div>`);
    };

    let init = () => {
        _setEventListeners();
        _appendHTML();
    };

    let _initSliders = ($img) => {
        let original_url = $img.attr('data-lazy') || $img.attr('data-src') || $img.attr('src');

        if(_config.$image_frame) _config.$image_frame.slick('unslick');
        if(_config.$previewSlick) _config.$previewSlick.slick('unslick');

        let $slides = _config.$slider.find('.slick-slide:not(.slick-cloned)');
        let $image_frame = $(_classes.image_frame);
        let $preview_box = $(_classes.preview_box);

        let index = 0;

        $image_frame.html("");
        $preview_box.html("");

        if($slides.length == 0){
            $slides = _config.$slider.find('img');

            $slides.each(function(i, img){
                let $img = $(img);
                let url = $img.attr('data-lazy') || $img.attr('data-src') || $img.attr('src');
    
                if(url == original_url) index = i;
    
                $preview_box.append(`<div><img src='${url}' alt=''></div>`);
                $image_frame.append(`<div><img src='${url}' alt=''></div>`);
            });
        }else{
            $slides.each(function(i, elem){
                let $slide = $(elem);
                let $img = $slide.find('img').eq(0);
                let url = $img.attr('data-lazy') || $img.attr('data-src') || $img.attr('src');
    
                if(url == original_url) index = i;
    
                $preview_box.append(`<div><img src='${url}' alt=''></div>`);
                $image_frame.append(`<div><img src='${url}' alt=''></div>`);
            });
        }

        _config.$image_frame = $image_frame.slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            initialSlide: index,
            asNavFor: $(_classes.preview_box)
        });

        _config.$previewSlick = $preview_box.slick({
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 4,
            dots: false,
            arrows: false,
            centerMode: true,
            centerPadding: '60px',
            variableWidth: true,
            asNavFor: $(_classes.image_frame),
            initialSlide: index,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: "unslick"
                }
            ]
        });

        setTimeout(function(){
            $image_frame.slick("refresh");
            $preview_box.slick("refresh");

            _config.$image_frame.slick('slickNext');
            _config.$image_frame.slick('slickPrev');
        }, 250);

        $(window).on('keyup', _onKeyPress);

        $image_frame.off();
        $preview_box.off();

        $image_frame.on('mousewheel', _onScroll);
        $preview_box.on('mousewheel', _onScroll);
    };

    let _showGallery = ($slider, $img) => {
        $(_classes.slick_box).addClass('slick-box--active');
        $('html, body').css('overflow', 'hidden');

        _config.$slider = $slider;

        setTimeout(() => _initSliders($img), 0);
    };

    let _hideGallery = () => {
        $(_classes.slick_box).removeClass('slick-box--active');
        $('html, body').css('overflow', '');
    };

    let _showPrev = () => {
        _config.$image_frame.slick('slickPrev');
    };

    let _showNext = () => {
        _config.$image_frame.slick('slickNext');
    };

    let _triggerHandlers = (e) => {
        let target = e.target;
        let className = target.className || "";

        let _handlers = {
            'slick-box__close': _hideGallery,
            'slick-box__arrow--prev': _showPrev,
            'slick-box__arrow--next': _showNext
        };

        if(target.tagName == "svg" || target.tagName == "line" || target.tagName == "g"){
            className = $(target).parents('.slick-box__arrow')[0].className;
        }

        for(let value in _handlers){
            if(className.includes(value)) return _handlers[value]();
        }
    };

    return {
        init: init
    }
})();

$(window).on('load', SlickGallery.init);