var birdItUp = {

    init: function() {
        // initialize all functions inside the object
        birdItUp.instaFeed();
        birdItUp.voting();

    },

    instaFeed: function() {
        var loadButton = $('#load-more');
        console.log(loadButton);
        var feed = new Instafeed({
            get: 'tagged',
            tagName: 'bird',
            clientId: '9cd60ab846f743fcbc7a95d4c058dcc4',
            resolution: 'low_resolution',
            limit: 12,
            sortBy: 'most-recent',
            target: 'minfeed',
            template: '<div class="grid-image col-xs-12 col-md-3"><a href="{{link}}"><img src="{{image}}" /></a><a class="fb-like" data-href="{{link}}" data-width="200px" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></a></div>',
            after: function() {
            // disable button if no more results to load
                if (!this.hasNext()) {
                  loadButton.setAttribute('disabled', 'disabled');
              }
              FB.XFBML.parse();
            }
        });
        loadButton.on('click', function() {
            feed.next();
        });
        feed.run();


        // var fullfeed = new Instafeed({
        //     get: 'tagged',
        //     tagName: 'bird',
        //     clientId: '9cd60ab846f743fcbc7a95d4c058dcc4',
        //     resolution: 'low_resolution',
        //     limit: 60,
        //     sortBy: 'most-recent',
        //     target: 'fullfeed',
        //     template: '<a href="{{link}}"><img src="{{image}}" /></a><a class="fb-like" data-href="{{link}}" data-width="200px" data-layout="box_count" data-action="like" data-show-faces="true" data-share="true"></a>',
        //   },

        // });

        // loadButton.addEventListener('click', function() {
        //   fullfeed.next();
        // });

        // fullfeed.run();
    },

    voting: function() {
        // fix
    }

};

birdItUp.init();
