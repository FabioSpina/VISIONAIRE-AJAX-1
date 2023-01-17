const nameProduct = document.getElementById("nameProduct");
const qtdProduct = document.getElementById("qtdProduct");
const priceProduct = document.getElementById("priceProduct");
const tableProducts = document.getElementById("tableProducts");


const clearall = document.getElementById("clearall");

let values = [];
let increment = 0;
var itemProduct;
var qtdprice;
var qtdpriceProduct;

const totalDiv = document.getElementById("totalDiv");
let divResult = document.getElementById("result");
let totalPurchases = 0;

let parameterToSearch;
let arrayMatchs = [];

let btnadd = document.getElementById("addProduct");
let btnsearch = document.getElementById("btnSearch");
let btnSearchClose = document.getElementById("btnSearchClose");

btnadd.addEventListener("click", captureValues);
btnsearch.addEventListener("click", search);
clearall.addEventListener("click", clearAllList);
const searchProductByName = document.getElementById("searchProductByName");

function captureValues() {
  let inputitemProduct = increment;
  let inputNameProduct = nameProduct.value;
  let inputQtdProduct = parseFloat(qtdProduct.value);
  let inputPriceProduct = parseFloat(priceProduct.value).toFixed(2);
  let inputQtdPriceProduct = parseFloat(qtdProduct.value) * parseFloat(priceProduct.value);

  if (inputNameProduct == "" || inputQtdProduct == "" || inputPriceProduct == "") {
    alert("Valores Invalido");
    return;
  }

  if (isNaN(inputPriceProduct)) inputPriceProduct = 0;

  const product = {
    id: increment,
    name: inputNameProduct.toUpperCase(),
    qtd: inputQtdProduct,
    price: inputPriceProduct,
    qtdprice: inputQtdPriceProduct,
  }
console.log(product);
  values.push(product);
  itemProduct = "";
  nameProduct.value = "";
  qtdProduct.value = "";
  priceProduct.value = "";
  qtdprice = "";
  increment = increment + 1;

  values.forEach((el) => {
    totalPurchases = totalPurchases + el.qtdprice;
  });

  divResult.innerHTML = totalPurchases.toFixed(2);
  totalPurchases = 0;
  addRows(values);
}

function addRows(arrayInput) {
  clearList();

  arrayInput.forEach((el) => {
    let rowCount = document.getElementById("tableProducts").rows.length;
    console.log(`Row count ${rowCount}`);
    if (rowCount > 1) document.getElementById("tableProducts").deleteRow();
  });

  arrayInput.forEach((el) => {
    let tableRow = tableProducts.insertRow();
    let nameProductValue = tableRow.insertCell();
    let qtdProductValue = tableRow.insertCell();
    let priceProductValue = tableRow.insertCell();
    let qtdpriceProductValue = tableRow.insertCell();
    let removeProduct = tableRow.insertCell();


    tableRow.id = `idRow${el.id}`;
    console.log(`tableRow ${el.id}`);
 
    nameProductValue.innerHTML = "<li>" + el.name + "</li>";
    qtdProductValue.innerHTML = el.qtd;
    priceProductValue.innerHTML = el.price;
    qtdpriceProductValue.innerHTML = el.qtdprice.toFixed(2);
    removeProduct.innerHTML = `<button onclick="deleteRow(${el.id})">X</button>`;
  });
  
}
function deleteRow(id) {

  const row = document.getElementById(`idRow${id}`);
  row.parentNode.removeChild(row);

  const productIndex = values.findIndex(product => product.id === id);

  divResult.innerHTML = divResult.innerHTML - values[productIndex].qtdprice.toFixed(2);
  values.splice(productIndex, 1);
}

function checkID() {
  const index = values.findIndex(el => el.id == comp);
  return index;
}

function clearAllList() {
  clearList();
  values = [];
  alert("OK. lista apagada");
}
function clearList() {
  values.forEach((el) => {
    let rowCount = document.getElementById("tableProducts").rows.length;
    if (rowCount > 1) document.getElementById("tableProducts").deleteRow(1);
  });
}
function search() {
  parameterToSearch = searchProductByName.value.toUpperCase();
  searchProductByName.value = "";
  if (parameterToSearch == '') return;
  arrayMatchs.splice(0, arrayMatchs.length);
  values.forEach((el) => {
    let myReg = new RegExp(parameterToSearch);
    let myMatch = el.name.match(myReg);
    if (myMatch) {
      arrayMatchs.push(el);
    }

  });
  if (arrayMatchs.length > 0) {
    addRows(arrayMatchs);
    btnSearchClose.style.display = "inline-block";
  }
}
function closeSearch() {
  arrayMatchs.splice(0, arrayMatchs.length);
  addRows(values);
  btnSearchClose.style.display = "none";
}
