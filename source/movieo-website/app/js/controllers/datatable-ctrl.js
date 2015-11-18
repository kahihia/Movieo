/**
 * Created by sanjay on 3/28/15.
 */
App.controller('DataTableController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $timeout) {

    'use strict';

    $.post(MY_CONSTANT.url + '/get_all_driver', {
        access_token: $cookieStore.get('obj').accesstoken

    }, function (data) {
        //console.log(data);
        var dataArray = [];
        data = JSON.parse(data);
        var driverList = data.data.driver_list;
        driverList.forEach(function (column) {
            var d = {
                user_id: "",
                user_name: "",
                user_email: "",
                phone_no: "",
                total_trips: "",
                total_earnings: "",
                average_rating: "",
                is_blocked: "",
                is_deleted: ""
            };

            d.user_id = column.driver_id;
            d.user_name = column.user_name;
            d.user_email = column.user_email;
            d.phone_no = column.phone_no;
            d.total_trips = column.total_rides_as_driver;
            d.total_earnings = column.total_earnings;
            d.average_rating = column.total_rating_got_driver;
            d.is_blocked = column.is_blocked;
            d.is_deleted = column.is_deleted;
            dataArray.push(d);
        });

        $scope.$apply(function () {
            $scope.list = dataArray;

            // Define global instance we'll use to destroy later
            var dtInstance;

            $timeout(function () {
                if (!$.fn.dataTable) return;
                dtInstance = $('#datatable2').dataTable({
                    'paging': true,  // Table pagination
                    'ordering': true,  // Column ordering
                    'info': true,  // Bottom left status text
                    // Text translation options
                    // Note the required keywords between underscores (e.g _MENU_)
                    oLanguage: {
                        sSearch: 'Search all columns:',
                        sLengthMenu: '_MENU_ records per page',
                        info: 'Showing page _PAGE_ of _PAGES_',
                        zeroRecords: 'Nothing found - sorry',
                        infoEmpty: 'No records available',
                        infoFiltered: '(filtered from _MAX_ total records)'
                    }
                });
                var inputSearchClass = 'datatable_input_col_search';
                var columnInputs = $('tfoot .' + inputSearchClass);

                // On input keyup trigger filtering
                columnInputs
                    .keyup(function () {
                        dtInstance.fnFilter(this.value, columnInputs.index(this));
                    });
            });

            // When scope is destroyed we unload all DT instances
            // Also ColVis requires special attention since it attaches
            // elements to body and will not be removed after unload DT
            $scope.$on('$destroy', function () {
                dtInstance.fnDestroy();
                $('[class*=ColVis]').remove();
            });
        });
    });
});