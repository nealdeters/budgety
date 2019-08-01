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
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
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
      var html, newHtml, element;

      // create html string with placeholder text
      if(type === 'inc'){
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if(type === 'exp'){
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // replace placeholder text with data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert html into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function(){
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ', '  +DOMstrings.inputValue);
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(field, i, array){
        field.value = null;
      });

      fieldsArr[0].focus();
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

    // add the new item to the UI
    UICtrl.addListItem(newItem, input.type);

    // clear the input fields
    UICtrl.clearFields();

    // calculate the budget 

    // display the budget on the UI
    
  };

  return {
    init: function(){
      setupEventListeners();
    }
  }

})(budgetController, UIController);

// initialize the budget app
controller.init();