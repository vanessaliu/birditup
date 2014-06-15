var birdItUp = {

    template: '<div class="grid-image col-xs-12 col-sm-4 col-md-3"><a class="openInstagramModal" data-id="{{id}}"><img src="{{image}}" /></a><h4><a href="http://instagram.com/{{model.user.username}}">@{{model.user.username}}</a></h4><a class="fb-like" data-href="?vote={{id}}" data-width="200px" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></a></div>',

    init: function() {
        // Initialize page functions
        birdItUp.mobileMenu();
        birdItUp.swapModalImage();

        // Initialize Instagram functions
        birdItUp.instaFeedBase();
        birdItUp.instaFeedFull();
        birdItUp.loadVotedImage();
        FB.XFBML.parse();

        $('[data-toggle="tooltip"]').tooltip({'placement': 'auto'});
    },

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
                console.log('thishasnext', this.hasNext());
                FB.XFBML.parse();
                if (!this.hasNext()) {
                    seeMore.addClass('hidden');
                }
            }
        });
        feed.run();
    },

    instaFeedFull: function() {
        // return;
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
                // disable button if no more results to load
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

    bindLinkToModal: function() {
        $('.openInstagramModal').on('click', function(event) {
            event.preventDefault();
            var mediaId = $(this).attr('data-id');
            window.history.replaceState( {} , '','?vote=' + mediaId );
            birdItUp.loadVotedImage(mediaId);
        });
    },


    loadVotedImage: function(mediaId) {
        var scope = this;
        if (typeof mediaId === 'undefined') {
            mediaId = window.location.search.substring(6);
        };
        console.log(mediaId.length);
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
                    console.log('data', data);
                    var newTemplate = scope.template;
                    newTemplate = newTemplate.replace('{{image}}', data.data.images.low_resolution.url);
                    newTemplate = newTemplate.replace('{{link}}', data.data.link);
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
            window.history.replaceState({} , '', '?');
        });
        $('#loadedOverlay').on('click', function() {
            $('#loadedOverlay').fadeOut();
            $('#loadedImage').slideUp();
            window.history.replaceState({} , '', '?');
        })

    },

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
    },

    swapModalImage: function(image, id) {
        $('.thumbnails a').on('click', function(event) {
            event.preventDefault();
            var imagePath = $(this).attr('href');
            $(this).closest('.modal-body').find('.big-image img').attr('src', imagePath);
        })
    }
};

birdItUp.init();
