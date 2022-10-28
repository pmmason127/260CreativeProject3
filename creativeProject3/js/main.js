angular.module('Office', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('results', {
                    url: '/results/{id}',
                    templateUrl: '/results.html',
                    controller: 'ResultsCtrl'
                });
            $urlRouterProvider.otherwise('home');
        }
    ])
    .factory('postFactory', [function() {
        var o = {
            choices: []
        };
        return o;
    }])
    .factory('choicesBox', [function() {
        var o = {
            choices: [
                [{ title: "have rainy weather?", image: "img/rain.jpeg", fun: -1 }, { title: "have sunny weather?", image: "img/sun.jpg", fun: 1 }],
                [{ title: "eat Skittles?", image: "img/skittles.jpg", fun: 1 }, { title: "eat fancy chocolate?", image: "img/chocolates.jpg", fun: -1 }],
                [{ title: "own a nice cabin?", image: "img/cabin.jpg", fun: 1 }, { title: "own a nice house?", image: "img/house.jpg", fun: -1 }],
                [{ title: "go on a hike?", image: "img/hike.jpg", fun: -1 }, { title: "go to the beach?", image: "img/beach.jpg", fun: 1 }],
                [{ title: "shop for sunglasses?", image: "img/sunglasses.jpg", fun: 1 }, { title: "shop for watches?", image: "img/watches.jpeg", fun: -1 }],
                [{ title: "go to a concert?", image: "img/concert.jpg", fun: 1 }, { title: "go to a play?", image: "img/play.jpg", fun: -1 }],
                [{ title: "go to a party?", image: "img/party.jpg", fun: 1 }, { title: "go to a classy restaurant?", image: "img/restaurant.jpg", fun: -1 }],
                [{ title: "go out with friends?", image: "img/out.jpg", fun: 1 }, { title: "stay in with friends?", image: "img/in.jpg", fun: -1 }],
                [{ title: "drink water?", image: "img/water.jpg", fun: -1 }, { title: "drink soda?", image: "img/soda.jpg", fun: 1 }],
                [{ title: "carve a pumpkin?", image: "img/pumpkin.jpg", fun: -1 }, { title: "make a gingerbread house?", image: "img/gingerbread.jpg", fun: 1 }],
                [{ title: "go on a sleigh ride?", image: "img/sleigh.jpg", fun: 1 }, { title: "go on a hay ride?", image: "img/hay.jpg", fun: -1 }],
                [{ title: "watch a football game?", image: "img/watches.jpeg", fun: -1 }, { title: "play in a football game?", image: "img/playing.jpg", fun: 1 }],
            ]
        };
        return o;
    }])
    .factory('funVal', [function() {
        var o = {
            characterValue: 5
        };
        return o;
    }])
    .factory('characterBox', [function() {
        var o = {
            choices: [
                { name: "Toby", src: "img/toby.jpg" },
                { name: "Stanley", src: "img/stanley.jpg" },
                { name: "Angela", src: "img/angela.jpg" },
                { name: "Phyllis", src: "img/phyllis.jpg" },
                { name: "Oscar", src: "img/oscar.jpg" },
                { name: "Dwight", src: "img/dwight.jpg" },
                { name: "Kevin", src: "img/kevin.jpg" },
                { name: "Pam", src: "img/pam.jpg" },
                { name: "Jim", src: "img/jim.jpg" },
                { name: "Andy", src: "img/andy.jpg" },
                { name: "Michael", src: "img/michael.png" },
            ]
        };
        return o;
    }])
    .controller('MainCtrl', [
        '$scope',
        'postFactory',
        'choicesBox',
        'funVal',
        function($scope, postFactory, choicesBox, funVal) {
            $scope.posts = [];
            $scope.choices = choicesBox.choices;
            $scope.fun = funVal.characterValue;
            $scope.showResults = '';
            $scope.start = function() {
                $scope.rather = "Would you rather...";
                var len = $scope.choices.length
                if (len == 0) {
                    document.getElementById('showresultsbtn').classList.toggle('hidden');
                    document.getElementById('options').classList.toggle('hidden');
                    document.getElementById('rather').classList.toggle('hidden');
                    $scope.showResults = "Show Results!";
                }
                else {
                    var index = Math.floor(Math.random() * len);
                    $scope.posts[0] = {
                        title: $scope.choices[index][0].title,
                        image: $scope.choices[index][0].image,
                        fun: $scope.choices[index][0].fun
                    };
                    $scope.posts[1] = {
                        title: $scope.choices[index][1].title,
                        image: $scope.choices[index][1].image,
                        fun: $scope.choices[index][1].fun
                    };
                    $scope.title = '';
                    choicesBox.choices.splice(index, 1);
                    $scope.selectedOne = { src: $scope.posts[0].image, title: $scope.posts[0].title, fun: $scope.posts[0].fun }
                    $scope.selectedTwo = { src: $scope.posts[1].image, title: $scope.posts[1].title, fun: $scope.posts[1].fun }
                }
            };
            $scope.selectChoice = function(fun) {
                $scope.fun += fun;
                $scope.start();
            };
        }
    ])
    .controller('ResultsCtrl', [
        '$scope',
        '$stateParams',
        'postFactory',
        'characterBox',
        function($scope, $stateParams, postFactory, characterBox) {
            $scope.characters = characterBox.choices;
            var char = $stateParams.id;
            char = char < 0 ? 0 : char;
            char = char > 10 ? 10 : char;
                $scope.character = { src: $scope.characters[char].src, name: $scope.characters[char].name }
        }
    ]);
