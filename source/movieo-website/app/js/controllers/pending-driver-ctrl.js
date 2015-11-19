/**
 * Created by sanjay on 3/28/15.
 */
App.controller('PendingDriversController', function ($scope, $http, $cookies, $cookieStore, MY_CONSTANT, $timeout,ngDialog) {

    'use strict';

    $.post(MY_CONSTANT.url + '/unapproved_driver_list', {
        access_token: $cookieStore.get('obj').accesstoken

    }, function (data) {
        //console.log(data);
        var dataArray = [];
        data = JSON.parse(data);
        var driverList = data.data.unapproved_members;
        $scope.$apply(function () {
            $scope.list = driverList;

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


    $scope.openApproveDialog = function (driverId) {
        $scope.value = true;
        $scope.approveData={};
        $scope.approveData.driver_id=driverId;
        ngDialog.open({
            template: 'firstDialogId',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    };

    $scope.submit = function (data) {
        console.log($scope.approveData);
        //Do the processing with dialog box data here.
        return false;
    };
});