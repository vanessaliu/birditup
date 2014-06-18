/**
 * [birdItUp description]
 * @type {Object}
 */
var birdItUp = {

    template: '<div class="grid-image col-xs-12 col-sm-4 col-md-3"><a class="openInstagramModal" data-id="{{id}}"><img src="{{image}}"/></a><h4><a href="http://instagram.com/{{model.user.username}}">@{{model.user.username}}</a></h4><a class="fb-like" data-href="/vote/{{id}}" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></a></div>',

    /**
     * [init description]
     * @return {[type]}
     */
    init: function() {
        // Initialize page functions
        birdItUp.mobileMenu();
        birdItUp.swapModalImage();
        birdItUp.showVideoModal();

        // Initialize Instagram functions
        birdItUp.instaFeedBase();
        birdItUp.instaFeedFull();
        birdItUp.loadVotedImage();
        FB.XFBML.parse();
    },

    /**
     * [instaFeedBase description]
     * @return {[type]}
     */
    instaFeedBase: function() {
        var seeMore = $('#see-more');
        var feed = new Instafeed({
            get: 'tagged',
            tagName: 'bird',
            clientId: '9cd60ab846f743fcbc7a95d4c058dcc4',
            resolution: 'low_resolution',
            limit: 12,
            sortBy: 'most-recent',
            target: 'feed',
            template: this.template,
            after: function() {
                birdItUp.bindLinkToModal();
                FB.XFBML.parse();
                if (!this.hasNext()) {
                    seeMore.addClass('hidden');
                }
            }
        });
        feed.run();
    },

    /**
     * [instaFeedFull description]
     * @return {[type]}
     */
    instaFeedFull: function() {
        var loadButton = $('#load-more');
        var largeFeed = new Instafeed({
            get: 'tagged',
            tagName: 'bird',
            clientId: '9cd60ab846f743fcbc7a95d4c058dcc4',
            resolution: 'low_resolution',
            limit: 24,
            sortBy: 'most-recent',
            target: 'feed-full',
            template: this.template,
            after: function() {
                birdItUp.bindLinkToModal();
                if (!this.hasNext()) {
                    loadButton.addClass('disabled');
                }
              FB.XFBML.parse();
            }
        });
        loadButton.on('click', function() {
            largeFeed.next();
        });
        largeFeed.run();
    },

    /**
     * [bindLinkToModal description]
     * @return {[type]}
     */
    bindLinkToModal: function() {
        $('.openInstagramModal').on('click', function(event) {
            event.preventDefault();
            var mediaId = $(this).attr('data-id');
            window.history.replaceState( {} , '','/vote/' + mediaId );
            birdItUp.loadVotedImage(mediaId);
        });
    },

    /**
     * [loadVotedImage description]
     * @param  {[type]} mediaId
     * @return {[type]}
     */
    loadVotedImage: function(mediaId) {
        var scope = this;
        if (typeof mediaId === 'undefined') {
            var pieces = window.location.pathname.split('/');
            mediaId = pieces[2];
        };
        var clientId = '9cd60ab846f743fcbc7a95d4c058dcc4';
        var url = 'https://api.instagram.com/v1/media/' + mediaId + '?client_id=' + clientId;
        if (mediaId.length > 0) {
            $.ajax({
               type: 'GET',
                url: url,
                async: false,
                jsonpCallback: 'jsonCallback',
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(data) {
                    var newTemplate = scope.template;
                    newTemplate = newTemplate.replace('{{image}}', data.data.images.low_resolution.url);
                    newTemplate = newTemplate.replace('{{link}}', data.data.link);
                    newTemplate = newTemplate.replace('{{id}}', data.data.id);
                    newTemplate = newTemplate.replace('{{id}}', data.data.id);
                    newTemplate = newTemplate.replace('{{model.user.username}}', data.data.user.username);
                    newTemplate = newTemplate.replace('{{model.user.username}}', data.data.user.username);
                    var image = $(newTemplate);
                    $('#loadedImage').slideDown();
                    $('#loadedOverlay').fadeIn();
                    $('#loadedImage .content').empty();
                    image.appendTo($('#loadedImage .content'));
                    FB.XFBML.parse();
                },
                error: function(e) {
                   console.log(e.message);
                }
            });
        }
        $('#loadedImageClose').on('click', function(event) {
            event.preventDefault();
            $('#loadedOverlay').fadeOut();
            $('#loadedImage').slideUp();
            // CHANGE BEFORE SITE IS LIVE ON BIRDITUP.SE
            window.history.replaceState({} , '', '/site/?');
        });
        $('#loadedOverlay').on('click', function() {
            $('#loadedOverlay').fadeOut();
            $('#loadedImage').slideUp();
            // CHANGE BEFORE SITE IS LIVE ON BIRDITUP.SE
            window.history.replaceState({} , '', '/site/?');
        })

    },

    showVideoModal: function() {
        var iframeSRC = '//www.youtube.com/embed/SGmMAnvb2qo';
        var w = window.innerWidth;
        if (w < 900 && w > 700) {
            var iframeWidth = '640';
            var iframeHeight = '360';
        } else if (w < 700 && w > 480) {
            var iframeWidth = '480';
            var iframeHeight = '270';
        } else if (w < 480) {
            var iframeWidth = '300';
            var iframeHeight = '169';
        } else {
            var iframeWidth = '853';
            var iframeHeight = '470';
        }
        var iframe = '<iframe width="' + iframeWidth + '" height="' + iframeHeight + '" src="' + iframeSRC + '" frameborder="0" allowfullscreen></iframe>';

        $('.videobutton').on('click', function(event) {
            // event.preventDefault();
            $('#videoModal').html(iframe);
            // COUNT THE TOP SEND IT TOO
            // SEND CSS TO MARGIN-LEFT
            $('#videoModal').css('margin-left', -(iframeWidth / 2));
            console.log('iframe', iframe, iframeWidth / 2);
            $('#videoModal').show();
            $('#videoOverlay').show();
            $('#videoModal').addClass('visible');
        });
        $('body').on('click', function(event) {
            var videoVisible = $('#videoModal').hasClass('visible');
            var isNotVideo = ($(event.target).closest('#videoModal').length === 0);
            var isNotVideoButton = ($(event.target).closest('.videobutton').length === 0);
            if (videoVisible && isNotVideo && isNotVideoButton) {
                $('#videoModal').html('');
                $('#videoOverlay').hide();
            }
        });
    },

    /**
     * [mobileMenu description]
     * @return {[type]}
     */
    mobileMenu: function() {
        $('.mobile-link').on('click', function() {
            $('.mobile-menu').slideToggle();
            $('.mobile-menu').toggleClass('nav-visible');
        });
        $('body').on('click', function(event) {
            var notMenuIcon = ($(event.target).closest('.mobile-link').length === 0);
            var notMobileMenu = ($(event.target).closest('.mobile-menu').length === 0);
            var mobileMenuIsVisible = $('.mobile-menu').hasClass('nav-visible');
            if (notMenuIcon && notMobileMenu && mobileMenuIsVisible) {
                $('.mobile-menu').slideUp();
                $('.mobile-menu').removeClass('nav-visible');
            }
        });
        $('.mobile-menu li a').on('click', function(event) {
            $('.mobile-menu').slideUp();
            $('.mobile-menu').removeClass('nav-visible');
        });
    },

    /**
     * [swapModalImage description]
     * @param  {[type]} image
     * @param  {[type]} id
     * @return {[type]}
     */
    swapModalImage: function(image, id) {
        $('.thumbnails a').on('click', function(event) {
            event.preventDefault();
            var imagePath = $(this).attr('href');
            $(this).closest('.modal-body').find('.big-image img').attr('src', imagePath);
        })
    }
};
birdItUp.init();
