var birdItUp = {

    init: function() {
        // initialize all functions inside the object
        birdItUp.instaFeedBase();
        birdItUp.instaFeedFull();
    },

    instaFeedBase: function() {
        var feed = new Instafeed({
            get: 'tagged',
            tagName: 'bird',
            clientId: '9cd60ab846f743fcbc7a95d4c058dcc4',
            resolution: 'low_resolution',
            limit: 4,
            sortBy: 'most-recent',
            target: 'feed',
            template: '<div class="grid-image col-xs-6 col-sm-6 col-md-4 col-lg-3"><a target="_blank" href="{{link}}"><img src="{{image}}" /></a><a class="fb-like" data-href="{{link}}" data-width="200px" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></a></div>',
        });
        feed.run();
    },

    instaFeedFull: function() {
        var loadButton = $('#load-more');
        var largeFeed = new Instafeed({
            get: 'tagged',
            tagName: 'bird',
            clientId: '9cd60ab846f743fcbc7a95d4c058dcc4',
            resolution: 'thumbnail',
            limit: 32,
            sortBy: 'most-recent',
            target: 'feed-full',
            template: '<div class="grid-image col-xs-6 col-sm-6 col-md-4 col-lg-3"><a target="_blank" href="{{link}}"><img src="{{image}}" /></a><a class="fb-like" data-href="{{link}}" data-width="200px" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></a></div>',
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

    headerEffect: function() {
        // Laura: header-effect med scrolling
    },

    mobileMenu: function() {
        // Laura: responsiv menu
    }
};

birdItUp.init();
