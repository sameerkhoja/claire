var keywordsData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "cool"
    },
    {
        value: 100,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "apple"
    },
    {
        value: 200,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "sucks"
    },
    {
        value: 220,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "camera"
    },
    {
        value: 340,
        color: "#4D5360",
        highlight: "#616774",
        label: "ipad"
    }

];
var reactionsData = {};
var mapData = {};
var positiveTweetData = {};
var negativeTweetData = {};


//TODO: Make all this stuff AJAXed - TEMPORARY FUNCTION ONLY
function showResults() {
    $('.searchcontainer').addClass('hide');
    $('.datacontainer').removeClass('hide');

    //create the doughnut chart for reactions
    ReactDOM.render(
        React.createElement(
            DoughnutChart,
            {
                id: "reactions-chart",
                data: reactionsData
            }
        ),
        $('#reactions-chart-container')[0]
    );

    //create a related keywords chart
//    ReactDOM.render(
//        React.createElement(
//            PolarChart,
//            {
//                id: "keywords-chart",
//                data: keywordsData
//            }
//        ),
//        $('#keywords-chart-container')[0]
//    );

    //create a map
    ReactDOM.render(
        React.createElement(
            Map,
            {
                id: "map",
                map: "usaLow",
                data: mapData
            }
        ),
        $('#map-container')[0]
    );

    //create positive tweets
    ReactDOM.render(
        React.createElement(
            Tweets,
            {
                data: positiveTweetData
            }
        ),
        $('#positive-tweet-container')[0]
    );

    //create negative tweets
    ReactDOM.render(
        React.createElement(
            Tweets,
            {
                data: negativeTweetData
            }
        ),
        $('#negative-tweet-container')[0]
    );
}

function checkData() {
    if(!jQuery.isEmptyObject(reactionsData) && !jQuery.isEmptyObject(mapData) && !jQuery.isEmptyObject(positiveTweetData) && !jQuery.isEmptyObject(negativeTweetData))
        showResults();
}

//search was submitted
var searchInterval = null;
function submitSearch() {
    $(".supercontainer").addClass('searched');
    $(".searchcontainer").removeClass("hide");

    //submit search query
    $.get('/submit/' + $('#searchbox').val(), function() {
        searchInterval = setInterval(function() {
            $.get('/exists/' + $('#searchbox').val(), function(exists) {
                exists = JSON.parse(exists);
                if(exists.exists) {
                    clearInterval(searchInterval);
                    setTimeout(function() {

                        //the data is ready, go ahead and grab the reactions data
                        $.get('/savedData.json', function(data) {
                            reactionsData = [
                                {
                                    value: data.Negative,
                                    color:"#d9534f",
                                    highlight: "#df706d",
                                    label: "Negative Reactions"
                                },
                                {
                                    value: data.Positive,
                                    color: "#5cb85c",
                                    highlight: "#71c171",
                                    label: "Positive Reactions"
                                },
                                {
                                    value: data.Neutral,
                                    color: "#f0ad4e",
                                    highlight: "#f2b969",
                                    label: "Neutral Reactions"
                                }
                            ];

                            checkData();
                        });

                        //get the map data
                        $.get('/SavedStates.json', function(data) {
                            mapData = [{
                                id: "US-AL",
                                value: data.States[0].Value
                            }, {
                                id: "US-AK",
                                value: data.States[1].Value
                            }, {
                                id: "US-AZ",
                                value: data.States[2].Value
                            }, {
                                id: "US-AR",
                                value: data.States[3].Value
                            }, {
                                id: "US-CA",
                                value: data.States[4].Value
                            }, {
                                id: "US-CO",
                                value: data.States[5].Value
                            }, {
                                id: "US-CT",
                                value: data.States[6].Value
                            }, {
                                id: "US-DE",
                                value: data.States[7].Value
                            }, {
                                id: "US-FL",
                                value: data.States[8].Value
                            }, {
                                id: "US-GA",
                                value: data.States[9].Value
                            }, {
                                id: "US-HI",
                                value: data.States[10].Value
                            }, {
                                id: "US-ID",
                                value: data.States[11].Value
                            }, {
                                id: "US-IL",
                                value: data.States[12].Value
                            }, {
                                id: "US-IN",
                                value: data.States[13].Value
                            }, {
                                id: "US-IA",
                                value: data.States[14].Value
                            }, {
                                id: "US-KS",
                                value: data.States[15].Value
                            }, {
                                id: "US-KY",
                                value: data.States[16].Value
                            }, {
                                id: "US-LA",
                                value: data.States[17].Value
                            }, {
                                id: "US-ME",
                                value: data.States[18].Value
                            }, {
                                id: "US-MD",
                                value: data.States[19].Value
                            }, {
                                id: "US-MA",
                                value: data.States[20].Value
                            }, {
                                id: "US-MI",
                                value: data.States[21].Value
                            }, {
                                id: "US-MN",
                                value: data.States[22].Value
                            }, {
                                id: "US-MS",
                                value: data.States[23].Value
                            }, {
                                id: "US-MO",
                                value: data.States[24].Value
                            }, {
                                id: "US-MT",
                                value: data.States[25].Value
                            }, {
                                id: "US-NE",
                                value: data.States[26].Value
                            }, {
                                id: "US-NV",
                                value: data.States[27].Value
                            }, {
                                id: "US-NH",
                                value: data.States[28].Value
                            }, {
                                id: "US-NJ",
                                value: data.States[29].Value
                            }, {
                                id: "US-NM",
                                value: data.States[30].Value
                            }, {
                                id: "US-NY",
                                value: data.States[31].Value
                            }, {
                                id: "US-NC",
                                value: data.States[32].Value
                            }, {
                                id: "US-ND",
                                value: data.States[33].Value
                            }, {
                                id: "US-OH",
                                value: data.States[34].Value
                            }, {
                                id: "US-OK",
                                value: data.States[35].Value
                            }, {
                                id: "US-OR",
                                value: data.States[36].Value
                            }, {
                                id: "US-PA",
                                value: data.States[37].Value
                            }, {
                                id: "US-RI",
                                value: data.States[38].Value
                            }, {
                                id: "US-SC",
                                value: data.States[39].Value
                            }, {
                                id: "US-SD",
                                value: data.States[40].Value
                            }, {
                                id: "US-TN",
                                value: data.States[41].Value
                            }, {
                                id: "US-TX",
                                value: data.States[42].Value
                            }, {
                                id: "US-UT",
                                value: data.States[43].Value
                            }, {
                                id: "US-VT",
                                value: data.States[44].Value
                            }, {
                                id: "US-VA",
                                value: data.States[45].Value
                            }, {
                                id: "US-WA",
                                value: data.States[46].Value
                            }, {
                                id: "US-WV",
                                value: data.States[47].Value
                            }, {
                                id: "US-WI",
                                value: data.States[48].Value
                            }, {
                                id: "US-WY",
                                value: data.States[49].Value
                            }];

                            checkData();
                        });

                        //get positive tweets
                        $.get('/savedTweets.json', function(data) {
                            positiveTweetData = [];
                            for(var i = 0; i < data.Tweets.length; i++) {
                                positiveTweetData.push({
                                    id: i,
                                    username: data.Tweets[i].username,
                                    content: data.Tweets[i].tweet
                                });
                            }

                            checkData();
                        });

                        //get negative tweets
                        $.get('/savedTweetsBad.json', function(data) {
                            negativeTweetData = [];
                            for(var i = 0; i < data.Tweets.length; i++) {
                                negativeTweetData.push({
                                    id: i,
                                    username: data.Tweets[i].username,
                                    content: data.Tweets[i].tweet
                                });
                            }

                            checkData();
                        });

                    }, 3000);
                }
            });
        }, 5000);
    });

    //TODO: Make this AJAXed - TEMPORARY
    //setTimeout(function() {
        //showResults(reactionsData, mapData, positiveTweetData, negativeTweetData);
    //}, 5000);
}

//render all ui elements on page load
$(document).ready(function() {

    //load all of the foundation magic
    $(document).foundation();

    //autofocus searchbox
    $('#searchbox').focus();

    //changing loading text
    var words = [
        '',
        'Fetching that data right for you!',
        'Did I mention how good you look today?',
        'Man, coffee sounds great right now...',
        'You&#39;ll be so IMPRESSED with this data!',
        'Knock knock!',
        'Say &#39;Who&#39;s there!',
        'The answer is...',
        'Your data!',
        'soon, anyway...',
        'So...',
        'How &#39;bout them Spurs?'
    ];
    var i = 0;
    setInterval(function () {
        $('.changingwords').fadeOut(function () {
            $(this).html(words[i = (i + 1) % words.length]).fadeIn();
        });
    }, 5000);

    //search button click handler
    $('#searchbutton').on('click', submitSearch);

    //searchbox keydown handler
    $('#searchbox').on('keydown', function(e) {
        if(e.keyCode == 13) { //enter was pressed
            submitSearch();
        }
    });

});