'use strict';

angular.module('roundzeroApp')
    .controller('AddGroupCtrl', ['$scope', '$http', '$location', 'AuthService', 'GroupService', 'MembershipService',
        function ($scope, $http, $location, AuthService, GroupService, MembershipService) {
            $scope.submitted = false;
            $scope.loading = false;
            $scope.error = null;

            $scope.group = new GroupService();

            $scope.hideError = function () {
                $scope.error = null;
            };

            $scope.submit = function () {
                $scope.submitted = true;
                $scope.error = null;
                if (!$scope.form.$invalid) {
                    $scope.loading = true;
                    $scope.group.$save(
                        function success() {
                            $scope.loading = false;
                            $scope.error = null;
                            // // Add member that created the group.
                            // var member = {
                            //     groupId: 2,
                            //     userId: AuthService.userId
                            // }
                            // $http.post('http://api.roundzeroapp.com/v1/memberships', member)
                            //     .success(function(response) {
                            //         $location.path('/account');
                            //     })
                            //     .error(function(response) {
                            //         $scope.loading = false;

                            //         if (response.error) {
                            //             $scope.error = response.error;
                            //         } else {
                            //             $scope.error = 'There was an error logging in. Please try later.';
                            //         }
                            //     });

                            $location.path('/account');
                        },
                        function error(response) {
                            $scope.loading = false;

                            if (response.error) {
                                $scope.error = response.error;
                            } else {
                                $scope.error = 'There was an error creating your group. Please try later.';
                            }
                        });
                }
            };
        }
    ]);