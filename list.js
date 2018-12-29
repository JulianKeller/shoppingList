
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

    // console.log('item ' + tableArray[i][0]);
    // console.log('price ' + tableArray[i][1]);
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

  console.log("table length " + table.rows.length);

  let storageList = JSON.parse(localStorage.getItem('table'));
  console.log(storageList);

  // restore table
  for (let i = 1; i < storageList.length; i++) {
    const row = table.insertRow(-1);    // add rows to the end of the table
    const item = row.insertCell(0);
    const price = row.insertCell(1);

    // default cell descriptions
    item.innerHTML = storageList[i][0];
    console.log("Storage List" + storageList[i]);
    price.innerHTML = storageList[i][1];

    // Make new rows editable
    item.setAttribute('contenteditable', 'true');
    price.setAttribute('contenteditable', 'true');
  }
}
