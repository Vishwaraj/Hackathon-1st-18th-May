// ------creating header----------

let header = document.createElement('div');
header.setAttribute('id', 'header');

let headerTitle = document.createElement('h1');
headerTitle.innerText = 'Makeup Store';

let search = document.createElement('input');
search.setAttribute('type', 'text');
search.setAttribute('class', 'form-control');
search.setAttribute('placeholder', 'search products or brands');
search.setAttribute('id', 'search');



// -------------creating products list--------------


let productList = document.createElement('div');
productList.setAttribute('class', 'product-list');

let allProductsText = document.createElement('h2');
allProductsText.innerText = 'All Products';
allProductsText.setAttribute('class', 'allProductText');


// -----------creating pagination body----------------


let paginationBody = document.createElement('div');
paginationBody.setAttribute('class', 'pagination-body');

let button1 = document.createElement('button');
button1.setAttribute('class', 'btn btn-primary');
button1.innerText = '1';
button1.addEventListener('click', getPage1);

let button2 = document.createElement('button');
button2.setAttribute('class', 'btn btn-primary');
button2.innerText = '2';
button2.addEventListener('click', getPage2);


let button3 = document.createElement('button');
button3.setAttribute('class', 'btn btn-primary');
button3.innerText = '3';
button3.addEventListener('click', getPage3);

paginationBody.append(button1, button2, button3);



// ---------------------function for all products-------------------


var productsArr;

async function allProducts() {

try {
let allProductsUrl = 'http://makeup-api.herokuapp.com/api/v1/products.json';

let result = await fetch(allProductsUrl);
let data = await result.json();
productsArr = data.slice(0,49);
let dataArr = productsArr.slice(0,16);
dataArr.forEach((product) => {

    createProducts(product);

});

} catch (error) {
    console.log(error);
}

}

allProducts();


// -------------------pagination functionality---------------

// for page 1

function getPage1() {

    try {
        productList.innerHTML = ' ';
        let page1Arr = productsArr.slice(0,16);
        page1Arr.forEach((page1Product) => {
        createProducts(page1Product);
        });

    } catch (error) {
        console.log(error);
    }
   
}

// for page 2

function getPage2() {

    try {
        productList.innerHTML = ' ';
        let page2Arr = productsArr.slice(17,33);
        page2Arr.forEach((page2Product) => {
        createProducts(page2Product);
         });

    } catch (error) {
        console.log(error);
    }
  
}

// for page3

function getPage3() {
  
    try {
        productList.innerHTML = ' ';
        let page3Arr = productsArr.slice(34,49);
        page3Arr.forEach((page3Product) => {
        createProducts(page3Product);
         });
    } catch (error) {
        console.log(error);
    }

}


// -----------------function to create and append products---------------


function createProducts(data) {

let productCard = document.createElement('div');
productCard.setAttribute('class', 'product-card');

let productImage = document.createElement('img');
productImage.setAttribute('src' ,`${data.api_featured_image}`);
productImage.setAttribute('alt', 'IMAGE DATA NOT AVAILABLE ONLINE!');


let productInfo = document.createElement('div');
productInfo.setAttribute('class', 'product-info');


let productName = document.createElement('h4');
productName.innerText = `${data.brand} ${data.name}`;

let productDescription = document.createElement('p');
productDescription.innerHTML = `${data.description}`;

let productPrice = document.createElement('p');
productPrice.innerHTML = `<strong>${data.price_sign} ${data.price}</strong>`;


let productLink = document.createElement('a');
productLink.setAttribute('href', `${data.product_link}`);
productLink.setAttribute('target', '_blank');
productLink.innerText = 'Click to know more';


productInfo.append(productName, productDescription, productPrice, productLink);
productCard.append(productImage, productInfo);
productList.append(productCard);

}


// ----------------search and highlight Functionality-------------------

// required a JS library called Mark.js, hence didn't implement.


// ---------------appending elements to the DOM-----------

header.append(headerTitle, search);
document.body.append(header, allProductsText, productList, paginationBody);