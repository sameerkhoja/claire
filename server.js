var Twit = require('twit');
var jsonfile = require('jsonfile');
var geocoder = require('geocoder');
var casual = require('casual');
var states = require('./states.json');
var express = require('express');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var app = express();

var T = new Twit({
  consumer_key: 'kI2iVOGJnd1DCjqilZv63BMiL',
  consumer_secret: 'pnWFgWqNoavHfff7KIuX8llhitQf9qnKxd3WmRxAOg8uMU5qCY',
  access_token: '2234823330-lKoP9c06O3uxmt5z7q9B12FizNEb8yw0bViaktz',
  access_token_secret: 'YfhurcM0WVXA2Ht2gYiP469Xxsh3emSDryF6JDRE3C0Su',
  // timeout_ms: 60*1000,
});

Array.min = function( array )
{
    return Math.min.apply( Math, array );
};

var countNumber = 100;
var maxID = null;
var complete_data = [];
var tweetCount = 0;
var id_array = [];

var counter = 5;

function req(query) {
  T.get('search/tweets', {q: query , count: countNumber, max_id: maxID}, function(err, data, response){
    if(err){
      console.error(err);
    }
    else {
      // if (data.statuses.length === 100) {
        // console.log(counter);
        for(var i = 0; i<data.statuses.length; i++){
            id_array.push(data.statuses[i].id);
            // console.log(data.statuses[i].user);
            if (!data.statuses[i])
            {
              console.log('hello');
              // console.dir(data);
            }
            //console.log(data.statuses[i]);
            var tweetNameandText = {};
            var username = data.statuses[i].user.screen_name;
            var name = data.statuses[i].user.name;
            var text = data.statuses[i].text;
            var favorites = data.statuses[i].user.favourites_count;

            tweetNameandText.username =  username;
            tweetNameandText.name =  name;
            tweetNameandText.text =  text;
            tweetNameandText.favorites =  favorites;
            tweetNameandText.state = states[Math.floor(Math.random() * states.length)].name;
            tweetNameandText.created_at = data.statuses[i].created_at;
            tweetNameandText.url = "https://twitter.com/anyuser/status/"+data.statuses[i].id;

            if(data.statuses[i].lang === "en")
            {
              complete_data.push(tweetNameandText);
            };
        };

      // }
    };
    maxID = Array.min(id_array);
    console.log('Completed ID: ' + maxID);
    counter--;
    if (counter > 0)
    {
      req(query);
    }
    if(counter <= 0){
      complete_data.sort(function(a, b){
        return parseFloat(b.favorites) - parseFloat(a.favorites);
      });
      jsonfile.writeFile('data/' + encodeURIComponent(query) + '.json', complete_data, function() {
		  console.log('Running analytics...');
		  exec('java -jar data/claire.jar data/' + encodeURIComponent(query) + '.json', function() {
			  console.log('Completed analytics!');
		  });
	  });
    }
  });

}

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/submit/:query', function(request, response){
	complete_data = [];
  fs.exists(path.join(__dirname, 'data/' + encodeURIComponent(request.params.query) + '.json'), function(exists) {
	  if(exists)
		  fs.unlink('data/' + encodeURIComponent(request.params.query) + '.json');
  });
	fs.exists(path.join(__dirname, '/savedData.json'), function(exists) {
		  if(exists)
			  fs.unlink(path.join(__dirname, '/savedData.json'));
	  });
	fs.exists(path.join(__dirname, '/SavedStates.json'), function(exists) {
		  if(exists)
			  fs.unlink(path.join(__dirname, '/SavedStates.json'));
	  });
	fs.exists(path.join(__dirname, '/savedTweets.json'), function(exists) {
		  if(exists)
			  fs.unlink(path.join(__dirname, '/savedTweets.json'));
	  });
	fs.exists(path.join(__dirname, '/savedTweetsBad.json'), function(exists) {
		  if(exists)
			  fs.unlink(path.join(__dirname, '/savedTweetsBad.json'));
	  });
  req(request.params.query);
  response.send("hello world!");
});

app.get('/exists/:query', function(request, response) {
	fs.exists(path.join(__dirname, 'data/' + encodeURIComponent(request.params.query) + '.json'), function(exists) {
		if(exists) {
			fs.exists(path.join(__dirname, '/savedData.json'), function(exists) {
				if(exists) {
					fs.exists(path.join(__dirname, '/SavedStates.json'), function(exists) {
						if(exists) {
							fs.exists(path.join(__dirname, '/savedTweets.json'), function(exists) {
								if(exists) {
									fs.exists(path.join(__dirname, '/savedTweetsBad.json'), function(exists) {
										if(exists) {
											response.send('{ "exists": true }');
										} else  {
											response.send('{ "exists": false }');
										}
									});
								} else {
									response.send('{ "exists": false }');
								}
							});
						} else {
							response.send('{ "exists": false }');
						}
					});
				} else {
					response.send('{ "exists": false }');
				}
			});
		} else {
			response.send('{ "exists": false }');
		}
	});
});

app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.use('/vendors', express.static(path.join(__dirname, 'vendors')));

app.use('/data', express.static(path.join(__dirname, 'data')));

app.use('/', express.static(__dirname));

app.listen(3000, function () {
  console.log('Claire listening on port 3000');
});
