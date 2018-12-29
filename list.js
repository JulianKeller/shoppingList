
// Add editable row and 2 columns to table
function addRow() {
  const table = document.getElementById("myTable");
  const row = table.insertRow(-1);    // add rows to the end of the table
  const item = row.insertCell(0);
  const price = row.insertCell(1);

  // default cell descriptions
  // item.innerHTML = "Item";
  // price.innerHTML = "$";

  // Make new rows editable
  item.setAttribute('contenteditable', 'true');
  price.setAttribute('contenteditable', 'true');
}


// Calculate the total of the price column
function sumColumn() {
  saveList();
  let sum = 0;
  const table = document.getElementById("myTable");
  for (let i = 1; i < table.rows.length; i++) {
    console.log(table.rows[i].cells[1].innerHTML);
    const value = parseInt(table.rows[i].cells[1].innerHTML);   // check for empty prices
    if (isNaN(value)){
      continue;
    }
    sum += value;
  }
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
    tableArray[i][1] = parseInt(table.rows[i].cells[1].innerHTML);

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
