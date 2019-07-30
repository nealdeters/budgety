// BUDGET CONTROLLER
var budgetController = (function(){
  
})();

// UI CONTROLLER
var UIController = (function(){
  
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
  
  var ctrlAddItem = function(){
    // get the field input data

    // add the item to the budget controller

    // add the new item to the UI

    // calculate the budget 

    // display the budget on the UI
    
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event){
    switch(event.keyCode || event.which){
      case 13:
        ctrlAddItem();
        break;
      default:
        break;
    }
  });

})(budgetController, UIController);