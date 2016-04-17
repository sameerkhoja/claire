//doughnut chart object
var DoughnutChart = React.createClass({
    getInitialState: function() {
        return {
            options: {
                responsive: true,
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><div style=\"display:inline-block;background-color:<%=segments[i].fillColor%>;height:13px;width:13px;\"></div>&nbsp;<%if(segments[i].label){%><%=segments[i].label%>: <%=segments[i].value%>%<%}%></li><%}%></ul>"
            }
        };
    },
    render: function() {
        return (
            React.createElement('canvas', {
                id: this.props.id
            })
        );
    },
    componentDidMount: function() {
        this.chartContext = $('#' + this.props.id)[0].getContext('2d');
        this.chart = new Chart(this.chartContext).Doughnut(this.props.data, this.state.options);
        $('.legend').html(this.chart.generateLegend());
    },
    componentWillUnmount: function() {
        this.chart.destroy();
        $('#' + this.props.id).remove();
    }
});

//polar area chart for related keywords
var PolarChart = React.createClass({
    getInitialState: function() {
        return {
            options: {
                responsive: true,
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
            }
        };
    },
    render: function() {
        return (
            React.createElement('canvas', {
                id: this.props.id
            })
        );
    },
    componentDidMount: function() {
        this.chartContext = $('#' + this.props.id)[0].getContext('2d');
        this.chart = new Chart(this.chartContext).PolarArea(this.props.data, this.state.options);
    },
    componentWillUnmount: function() {
        this.chart.destroy();
        $('#' + this.props.id).remove();
    }
});

//map for showing geographic tweet distribution
var Map = React.createClass({
    getInitialState: function() {
        return {
            options: {
                type: "map",
                "theme": "light",
                colorSteps: 20,
                dataProvider: {
                    map: this.props.map,
                    areas: this.props.data
                },
                areasSettings: {
                    autoZoom: false,
                    balloonText: "<strong>[[title]]</strong>: [[percent]]%"
                },
                zoomControl: {
                    homeButtonEnabled: false,
                    zoomControlEnabled: false
                },
                panEventsEnabled: false,
                zoomOnDoubleClick: false
            }
        };
    },
    render: function() {
        return (
            React.createElement('div', {
                id: this.props.id
            })
        );
    },
    componentDidMount: function() {
        AmCharts.makeChart(this.props.id, this.state.options);
    },
    componentWillUnmount: function() {
        $('#' + this.props.id).remove();
    }
});

//individual tweet component
var Tweet = React.createClass({
   render: function() {
       return React.createElement('div', { className: "tweet" },
           [
               React.createElement('div', { className: "tweet-username", key: 0}, this.props.username),
               React.createElement('div', { className: "tweet-content", key: 2 }, this.props.content)
           ]
       );
   }
});

//tweets component
var Tweets = React.createClass({
    render: function() {
        if(typeof this.props.data.map != 'undefined') {
            return (
                React.createElement(
                    'div',
                    {
                        className: "tweets"
                    },
                    this.props.data.map(function(item) {
                        return React.createElement(Tweet, {
                            key: item.id,
                            username: item.username,
                            content: item.content
                        });
                    })
                )
            );
        } else {
            return (
                React.createElement(
                    'div',
                    {
                        className: "tweets"
                    },
                    ''
                )
            );
        }

    }
});