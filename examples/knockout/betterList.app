// Conductance version of http://knockoutjs.com/examples/betterList.html

var { ObservableVar, observe } = require('mho:observable');
var { appendContent, Attrib, Prop, Style, OnClick } = require('mho:surface');
var { difference } = require('sjs:array');
var { Button, Form, TextInput, Select } = require('mho:surface/html');


//----------------------------------------------------------------------

var allItems      = ObservableVar(["Fries", "Eggs Benedict", "Ham", "Cheese"]);
var selectedItems = ObservableVar(["Ham"]);
var itemToAdd     = ObservableVar('');

function addItem(ev) {
  ev.preventDefault();
  var newItem = itemToAdd.get();
  allItems.modify(function(allItems, unchanged) {
    // prevent blanks and duplicates
    if (!newItem.length && allItems.indexOf(newItem) != -1) {
      return unchanged;
    }
    return allItems.concat([newItem]);
  });
  itemToAdd.set(''); // clear text box
}

function removeSelected() {
  allItems.set(difference(allItems.get(), selectedItems.get()));
  selectedItems.set([]);
}

function sortItems() {
  allItems.sort();
}

document.body .. appendContent(
  `
   ${ 
     Form(`
           Add item:
           $TextInput(itemToAdd)
           ${ 
             Button('Add ') .. 
               Attrib('type', 'submit') .. 
               Attrib('disabled', itemToAdd .. observe(x->x.length == 0))
           }
          `) .. Prop('onsubmit', addItem)
   }
  
   <p>Your values:</p>
   ${ 
     Select({multiple:true, items: allItems, selected: selectedItems}) .. 
       Style("{ width: 50em; height: 10em;}") 
   }
   <div>
    ${ 
      Button('Remove') .. 
        Attrib('disabled', selectedItems .. observe(x->x==0)) ..
        OnClick(removeSelected)
    }
    ${
      Button('Sort') ..
        Attrib('disabled', allItems .. observe(x->x.length < 2)) ..
        OnClick(sortItems)
    }   
   </div>
  ` 
);

