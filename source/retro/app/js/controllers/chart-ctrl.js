/**
 * Created by sanjay on 3/28/15.
 */
myApp.controller('ChartController', function ($scope, ChartData, $timeout, $cookies, $cookieStore, MY_CONSTANT, responseCode) {
    'use strict';
    var now = new Date();
    var startTime = now.setDate(now.getDate() - 30);
    var graphData = [];
    $.post(MY_CONSTANT.url + '/heat_map_earnings', {
        access_token: $cookieStore.get('obj').accesstoken,
        start_time: now.toISOString(),
        end_time: new Date().toISOString(),
        timezone: 330
    }, function (response) {
        var data = JSON.parse(response);
        $scope.barData=ChartData.load('server/chart/bar.json');
        $scope.$apply();
    });
    // BAR
    // -----------------------------------
    //$scope.barData = ChartData.load('server/chart/bar.json');
    $scope.barOptions = {
        series: {
            bars: {
                align: 'center',
                lineWidth: 0,
                show: true,
                barWidth: 0.6,
                fill: 0.9
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: function (label, x, y) {
                return x + ' : ' + y;
            }
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            position: ($scope.app.layout.isRTL ? 'right' : 'left'),
            tickColor: '#eee'
        },
        shadowSize: 0
    };

    // LINE
    // -----------------------------------
    $scope.lineData = ChartData.load('server/chart/line.json');
    $scope.lineOptions = {
        series: {
            lines: {
                show: true,
                fill: 0.01
            },
            points: {
                show: true,
                radius: 4
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: function (label, x, y) {
                return x + ' : ' + y;
            }
        },
        xaxes: [{
            tickColor: '#eee',
            mode: 'categories'
        }],
        yaxes: [{ min: 0 },{
            alignTicksWithAxis: 1,
            position: 'right',
            tickColor: '#eee'
        }],
        shadowSize: 0
    };
});

/**=========================================================
 * Module: flot.js
 * service for loading data for Charts
 =========================================================*/


myApp.service('ChartData', function ($resource) {

    var opts = {
        get: {method: 'GET', isArray: true}
    };
    return {
        load: function (source) {
            return $resource(source, {}, opts).get();
        }
    };
});

/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

myApp.directive('flot', ['$http', '$timeout', function ($http, $timeout) {
    'use strict';
    return {
        restrict: 'EA',
        template: '<div></div>',
        scope: {
            dataset: '=?',
            options: '=',
            series: '=',
            callback: '=',
            src: '='
        },
        link: linkFunction
    };

    function linkFunction(scope, element, attributes) {
        var height, plot, plotArea, width;
        var heightDefault = 220;

        plot = null;

        width = attributes.width || '100%';
        height = attributes.height || heightDefault;

        plotArea = $(element.children()[0]);
        plotArea.css({
            width: width,
            height: height
        });

        function init() {
            var plotObj;
            if (!scope.dataset || !scope.options) return;
            plotObj = $.plot(plotArea, scope.dataset, scope.options);
            scope.$emit('plotReady', plotObj);
            if (scope.callback) {
                scope.callback(plotObj, scope);
            }

            return plotObj;
        }

        function onDatasetChanged(dataset) {
            if (plot) {
                plot.setData(dataset);
                plot.setupGrid();
                return plot.draw();
            } else {
                plot = init();
                onSerieToggled(scope.series);
                return plot;
            }
        }

        scope.$watchCollection('dataset', onDatasetChanged, true);

        function onSerieToggled(series) {
            if (!plot || !series) return;
            var someData = plot.getData();
            for (var sName in series) {
                angular.forEach(series[sName], toggleFor(sName));
            }

            plot.setData(someData);
            plot.draw();

            function toggleFor(sName) {
                return function (s, i) {
                    if (someData[i] && someData[i][sName])
                        someData[i][sName].show = s;
                };
            }
        }

        scope.$watch('series', onSerieToggled, true);

        function onSrcChanged(src) {

            if (src) {

                $http.get(src)
                    .success(function (data) {

                        $timeout(function () {
                            scope.dataset = data;
                        });

                    }).error(function () {
                        $.error('Flot chart: Bad request.');
                    });

            }
        }

        scope.$watch('src', onSrcChanged);
    }

}]);
