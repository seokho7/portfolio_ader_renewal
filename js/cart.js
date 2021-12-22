var app = angular.module('myApp',[]);
var product_price = 0;
var data = {
    product_price : 20000,
    product_price2 : 40000,
    product_price3 : 30000,
}
var allDeleteBtn = document.querySelector('.all_select_btn');
var deleteBtn = document.querySelector('.check_delete_btn');
var itemList = document.querySelectorAll('.cart_main_list > li');


app.controller('myCtrl',function($scope){
    
    

    $scope.product_price = data.product_price;
    $scope.product_price2 = data.product_price2;
    $scope.product_price3 = data.product_price3;

    $scope.count = [1,1,1,]


    $scope.minus1 = function(){
        if($scope.count[0] > 1){
            $scope.count[0]--
        }
    }
    $scope.minus2 = function(){
        if($scope.count[1] > 1){
            $scope.count[1]--
        }
    }
    $scope.minus3 = function(){
        if($scope.count[2] > 1){
            $scope.count[2]--
        }
    }

    $scope.countBack = function(){
        for(i=0; i<itemList.length; i++){
            if(itemList[i].classList.contains('check')){
                $scope.count[i] = 0;
            }
        }
    }


});


allDeleteBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    for(item of itemList){
        item.classList.toggle('check');
        if(item.classList.contains('check')){
            item.querySelector('input').checked = true;
        }else{
            item.querySelector('input').checked = false;
        }
    }
});


deleteBtn.addEventListener('click', (e)=>{
var targetList = document.querySelectorAll('.cart_main_list > li.check');
e.preventDefault();
for(item of targetList){
    item.style.display = 'none'
}

})