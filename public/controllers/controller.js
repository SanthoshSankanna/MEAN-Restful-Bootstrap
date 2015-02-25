angular.module("app", []).controller("AppCtrl", function($scope, $http) {
	$scope.showAddBtn=true;
    $scope.showUpdateBtn=true;
    
	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			$scope.contactlist = response;
		});
		$scope.contact = "";
	};
	
	refresh();
	
	$scope.openAddModal = function(){
		$scope.contact = "";
		$scope.showAddBtn=true;
	    $scope.showUpdateBtn=false;
	};
	
	$scope.addContact = function(){
		$http.post('/contactlist', $scope.contact).success(function(response){
			refresh();
			$('#addModal').modal('hide');
		});
	};
	
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactlist/' + id).success(function(response){
			refresh();
		});
	};
	
	$scope.edit = function(id){
		console.log(id);
		$scope.showAddBtn=false;
	    $scope.showUpdateBtn=true;
		$http.get('/contactlist/' + id).success(function(response){
			$scope.contact = response;
		});
	};
	
	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
			$('#addModal').modal('hide');
		});
	};
	
	$scope.deselect = function(){
		$scope.contact = "";
	};
	
});