var birdItUp = {

    template: '<div class="grid-image col-xs-12 col-sm-4 col-md-3"><h4>{{model.user.username}}</h4><a target="_blank" href="{{link}}"><img src="{{image}}" /></a><a class="fb-like" data-href="?vote={{id}}" data-width="200px" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></a></div>',

    init: function() {
        // Instagram
        birdItUp.instaFeedBase();
        birdItUp.instaFeedFull();

        birdItUp.loadVotedImage();

        // Page functions
        birdItUp.mobileMenu();

        birdItUp.swapModalImage();

    },

    instaFeedBase: function() {
        // how to get name?
        var feed = new Instafeed({
            get: 'tagged',
            tagName: 'bird',
            clientId: '9cd60ab846f743fcbc7a95d4c058dcc4',
            resolution: 'thumbnail',
            limit: 12,
            sortBy: 'most-recent',
            target: 'feed',
            template: this.template
        });
        console.log('feed', feed);
        feed.run();
    },

    instaFeedFull: function() {
        var loadButton = $('#load-more');
        var largeFeed = new Instafeed({
            get: 'tagged',
            tagName: 'bird',
            clientId: '9cd60ab846f743fcbc7a95d4c058dcc4',
            resolution: 'thumbnail',
            limit: 24,
            sortBy: 'most-recent',
            target: 'feed-full',
            template: this.template,
            after: function() {
            // disable button if no more results to load
                if (!this.hasNext()) {
                  loadButton.setAttribute('disabled', 'disabled');
              }
              FB.XFBML.parse();
            }
        });
        loadButton.on('click', function() {
            largeFeed.next();
        });
        largeFeed.run();
    },

    loadVotedImage: function() {
        var scope = this;
        var mediaId;
        mediaId = window.location.search.substring(6);
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
                    var image = $(newTemplate);
                    image.appendTo($('body'));
                    //
                },
                error: function(e) {
                   console.log(e.message);
                }
            });
        }
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

    swapModalImage: function(image) {
        $("main").src = image.href;

    }



};

birdItUp.init();
