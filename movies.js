 var app = angular.module('myApp', []);
            
            app.controller('myCtrl', function ($scope, $http) {
                $scope.loading=1;
                $scope.watchList=[];
                $http.get("http://starlord.hackerearth.com/movieslisting")
                    .then(function (response) {
                        
                        $scope.movieList = response.data;
                        $scope.ratings=[];
                        $scope.languageList=[];
                        $scope.myOrder1="-movie_title";
                        for(var i=0;i<response.data.length;i++){

                            switch($scope.movieList[i].content_rating){
                                case "TV-PG":
                                        $scope.bgClass="bg1"
                                        break;
                                case "TV-MA":
                                        $scope.bgClass="bg2"
                                        break;
                                case "TV-G":
                                        $scope.bgClass="bg3"
                                        break;
                                case "TV-14":
                                        $scope.bgClass="bg4"
                                        break;
                                case "R":
                                        $scope.bgClass="bg5"
                                        break;
                                case "PG-13":
                                        $scope.bgClass="bg6"
                                        break;
                                case "PG":
                                        $scope.bgClass="bg7"
                                        break;
                                case "G":
                                        $scope.bgClass="bg8"
                                        break;  3
                                default:   
                                        $scope.bgClass="bg0";
                            }

                                $scope.movieList[i].bgClass=$scope.bgClass;
                            if($scope.ratings.indexOf($scope.movieList[i].content_rating)==-1 && $scope.movieList[i].content_rating!=""){
                                $scope.ratings.push($scope.movieList[i].content_rating);
                            }
                            if($scope.languageList.indexOf($scope.movieList[i].language)==-1 && $scope.movieList[i].language!=""){
                                $scope.languageList.push($scope.movieList[i].language);
                            }  
                        }
                        $scope.loading=0;
                        console.log('rating array='+$scope.ratings.sort());
                        $scope.movList=$scope.movieList;
                    });

                    $scope.sortBy= function(ord){
                            $scope.myOrder1=ord;
                            
                    };

                    $scope.mySearch= function(searchText){
                        console.log("search="+searchText);
                        $scope.fiteredList=[];
                        if($scope.movieList!=undefined){

                            for(var i=0;i<$scope.movieList.length;i++){
                               // console.log("searchtext="+searchText+"*matched="+$scope.movieList[i].movie_title+"* exp="+($scope.movieList[i].movie_title==searchText));
                                if($scope.movieList[i].movie_title.search(searchText)!=-1){
                                   // console.log("matched="+$scope.movieList[i].movie_title);
                                    $scope.fiteredList.push($scope.movieList[i]);
                                }

                            }
                            console.log("filtered list="+JSON.stringify($scope.fiteredList));

                        }
                        $scope.movList=$scope.fiteredList;
                    };

                    $scope.addToWatchList= function(movie){

                        $scope.watchList.push(movie);
                        

                    };
            });