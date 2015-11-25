(function(){
    'use strict';

    angular
    .module('ktp')
    .controller('NotesController', NotesController);

    function NotesController(Notes, $mdBottomSheet, $mdDialog) {
        var vm = this;

        construct();

        vm.share = function($event){
            $mdBottomSheet.show({
                templateUrl: 'views/share-list.tpl.html',
                targetEvent: $event
            });
        }

        vm.addNote = function($event) {
            $mdDialog.show({
                controller: 'AddNoteController',
                templateUrl: 'views/add-note.tpl.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true,
                onComplete: construct
            }).then(function(data){
                construct();
            }, function(){
                construct();
            });

        };

        function construct() {
            Notes.get().then(function(data){
                vm.notes = data.reverse();
            });
        }
    }
})();
