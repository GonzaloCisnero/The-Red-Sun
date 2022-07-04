import { getProducts, getProducto } from "./firebase.js";

const cart = []

let total = 0;

const checkout = document.querySelector('.checkcompra');

const checkempy = document.querySelector('.checkempy');

const emptyCard = () => {

    total = 0;

    document.querySelector('.visualTotal') .textContent = total;

    cart.length = 0;

    document.querySelector('.innerCart').innerHTML = '';

}

checkout.addEventListener('click', emptyCard);

checkempy.addEventListener('click', emptyCard);


const renderCart = () => {

    const innerCart = document.querySelector('.innerCart');

    innerCart.innerHTML = '';

    cart.forEach(producto =>{

        const card = document.createElement('div');

        card.className = 'card mb-3';

        card.innerHTML = `
                <div class="container-fluid">
            <div class="col-12 col-lg-6">
            <img src=${producto.data().img} class="img-fluid rounded-start" alt=${producto.data().name}>
            </div>

            <div class="row datos">
                <div class="card-cart col-12 col-md-6 col-lg-6">
                    <h5 class="card-title">${producto.data().name}</h5>
                    <p class="card-text">${producto.data().price}</p>
                    <input type="number">
                </div>
            </div>

        </div>
        `;

        innerCart.append(card);

    });

}

const checkCart = (id) => cart.some(producto => producto.id === id);

const updateTotal = (price) =>{

    const visualTotal = document.querySelector('.visualTotal');

    total += price;

    visualTotal.textContent = total;

    
}


const addToCart = async (e) =>{

    const productoId = e.target.id;


    if(checkCart(productoId)){
        return false;
    }
    else{
        const productoTocart = await getProducto(productoId);

        updateTotal(productoTocart.data().price);

    
        cart.push(productoTocart);

        renderCart();

    }

    



}

const addEvent = () => {

    const buyBtn = document.querySelectorAll('.buyBtn');

   buyBtn.forEach(btn => btn.addEventListener('click', addToCart));
}


const renderCards = async (productosArr) => {
    
    const productos = await productosArr;

    const cards = document.querySelector('.cards');

    productos.forEach(productos => {

        const card = document.createElement('div');

        card.className = 'card col-12 col-lg-6 col-xl-6';

        card.innerHTML = `

          <img src=${productos.data().img} class="card-img-top productosImg" alt=${productos.data().name}>

          <div class="card-body">
           <h5 class="title-productos">${productos.data().name}</h5>
           <p class="card-text text-success price-productos">${productos.data().price}</p>
           <a href="#" class="btn btn-dark buyBtn" id=${productos.id}>BUY</a>
          </div>
        
        `;

        cards.append(card);

    }); 
        
    addEvent();
    
}

renderCards(getProducts());







  






 

