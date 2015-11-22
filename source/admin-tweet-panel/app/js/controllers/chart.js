/**
 * Created by umeshksingla on 22/11/15.
 */

App.controller('ChartController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $state, responseCode) {

    var a = [];
    var key = '69e1c7f637ee62966be22f13cbc04907c16923f0';
    $scope.movie = {name : 'The Intern'};
    $http.get('https://access.alchemyapi.com/calls/data/GetNews?apikey='+
        key +
        '&start=1446337800&end=1448150400&q.enriched.url.cleanedTitle=' +
        $scope.movie.name +
        '&q.enriched.url.enrichedTitle.taxonomy.taxonomy_.label=art%20and%20entertainment&count=25&outputMode=json&timeSlice=1d')
        .then(function (data) {
            console.log(data);
            a = data.data.result.slices;
            $(function () {
                $('#container').highcharts({
                    title: {
                        text: 'Movie Mentions on Various Sites',
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'Source: alchemyapi.com',
                        x: -20
                    },
                    xAxis: {
                        title: {
                            text: 'November'
                        }
                        //categories: a,
                        //tickInterval : 4
                    },
                    yAxis: {
                        title: {
                            text: 'Mentions'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: ''
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        name: $scope.movie.name,
                        data: a
                    }]
                });
            });
        });
});