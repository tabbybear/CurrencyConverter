angular.module('CurrencyConverter', [])
.controller('ConverterCtrl', ['$scope','$http', function ($scope,$http) {
	var ctrl = this;
	$scope.rates= {};
	$http.get('http://api.fixer.io/latest?base=JPY&symbols=CAD,USD,EUR')
	.then(function(res){
		$scope.rates= res.data.rates;
		console.log(JSON.stringify($scope.rates));
		
        $scope.fromType= $scope.rates.CAD;
		$scope.toType = $scope.rates.USD;
		$scope.fromValue = '1.00';
		$scope.rateConvert();
	}, function(error) {
        console.log(error);
    } );
	$scope.rateConvert = function(){
		if (isNaN($scope.fromValue)) {
			alert('Please enter a valid number.');
			return;
		}
		var converted = parseFloat($scope.fromValue);
		$scope.toValue = 'N/A';
		if (!isNaN(converted))
			$scope.toValue = (converted * ($scope.toType * (1 / $scope.fromType))).toFixed(2);
	};
}]);

