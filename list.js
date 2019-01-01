

/*
regex, probably needs '$' added to the start of it
 const regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{2})?)$/;
  if (regex.test(userInput)) {
    return ;
  }
 */

// Add editable row and 2 columns to table
function addRow() {
  const table = document.getElementById("myTable");
  const row = table.insertRow(-1);    // add rows to the end of the table
  const item = row.insertCell(0);
  const price = row.insertCell(1);

  // default cell descriptions
  // item.innerHTML = "Item";
  price.innerHTML = "$";

  // Make new rows editable
  item.setAttribute('contenteditable', 'true');
  price.setAttribute('contenteditable', 'true');
  price.setAttribute('oninput', 'sumColumn()');
}


// Calculate the total of the price column
function sumColumn() {
  // save the list
  saveList();
  let sum = 0;

  let value = 0;
  const table = document.getElementById("myTable");
  for (let i = 1; i < table.rows.length; i++) {

    if (table.rows[i].cells[1].innerHTML[0] === '$'){
      console.log("starts with a dollar sign");
      value = parseFloat(table.rows[i].cells[1].innerHTML.substring(1));
      console.log("value is now " + value);
    }
    else {
      value = parseFloat(table.rows[i].cells[1].innerHTML);   // check for empty prices
    }

    console.log("Value is " + value);
    if (isNaN(value)){
      continue;
    }

    sum += value;
  }
  sum = Math.round(sum * 100) / 100;
  document.getElementById('total').innerHTML = 'Total $' + sum; // display the total on the page
  return sum;
}

// Save table values in localstorage
function saveList(){
  // check browser support
  if (typeof (Storage) === "undefined") {
    return;
  }
  const table = document.getElementById("myTable");

  let tableArray = [];

  // store table
  for (let i = 1; i < table.rows.length; i++) {
    tableArray[i] = new Array(2);

    tableArray[i][0] = table.rows[i].cells[0].innerHTML;
    let price = parseFloat(table.rows[i].cells[1].innerHTML);
    price = Math.round(price * 100) / 100;
    tableArray[i][1] = price;

  }
  localStorage.setItem('table', JSON.stringify(tableArray));
}


// get table values from localstorage
function getTable(){
  // check browser support
  if (typeof (Storage) === "undefined") {
    return;
  }
  const table = document.getElementById("myTable");

  let storageList = JSON.parse(localStorage.getItem('table'));

  // check for empty list
  if (!storageList){
    console.log("Empty List");
    return;
  }

  // if item already exists, don't load it again
  for (let i = 1; i < table.rows.length; i++) {
    document.getElementById('myTable').deleteRow(i);
  }

  // restore table
  for (let i = 1; i < storageList.length; i++) {
    const row = table.insertRow(-1);    // add rows to the end of the table
    const item = row.insertCell(0);
    const price = row.insertCell(1);

    // default cell descriptions
    item.innerHTML = storageList[i][0];
    price.innerHTML = Number(storageList[i][1]);

    // Make new rows editable
    item.setAttribute('contenteditable', 'true');
    price.setAttribute('contenteditable', 'true');
  }
}

// empty list
function emptyList() {
  localStorage.clear(); // empty local storage
  location.reload(); // reload the page
}

// run on page load
window.onload = function () {
  getTable();
  sumColumn();
};


// TODO run sumColumn when the price column input is changed. Also cross out the item in the list and move it to the bottom.
// document.getElementById('myTable').addEventListener('input', function () {
//   console.log("input changed!");
// });

function test() {
  console.log("Test() has run!");
  sumColumn();
}
