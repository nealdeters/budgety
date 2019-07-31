// BUDGET CONTROLLER
var budgetController = (function(){
  
  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: function(type, description, value){
      var newItem, ID;
      
      // ID = last ID + 1
      // create new ID
      if(data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item based on inc or exp type
      switch(type){
        case 'exp':
          newItem = new Expense(ID, description, value);
          break;
        case 'inc':
          newItem = new Income(ID, description, value);
          break;
        default:
          console.log('Did not match one of type inc or exp');
          break;
      }

      // push it into our data object
      data.allItems[type].push(newItem);

      // return the new element
      return newItem;
    },
    testing: function(){
      console.log(data);
    }
  }

})();

// UI CONTROLLER
var UIController = (function(){
  
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getInput: function(){
      return {
        // will be either inc or exp
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },

    addListItem: function(obj, type){

    },

    getDOMstrings: function(){
      return DOMstrings;
    }
  }

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
  
  var setupEventListeners = function(){
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event){
      switch(event.keyCode || event.which){
        case 13:
          ctrlAddItem();
          break;
        default:
          break;
      }
    });
  }

  var ctrlAddItem = function(){
    var input, newItem;

    // get the field input data
    input = UICtrl.getInput();

    // add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    budgetCtrl.testing();

    // add the new item to the UI

    // calculate the budget 

    // display the budget on the UI
    
  };

  return {
    init: function(){
      console.log('application started');
      setupEventListeners();
    }
  }

})(budgetController, UIController);

// initialize the budget app
controller.init();