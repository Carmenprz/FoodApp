// modal 

// const modal = document.getElementById("myModal"); 
// const btn = document.getElementById("myBtn"); 
// const close = document.getElementById("close"); 

// btn.onclick = function() {
//     modal.style.display = "flex"; 
// }

// close.onclick = function() {
//     modal.style.display = "none"; 
// }

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none"; 
//     }
// }


//cart
const cartDOM = document.querySelector(".cart");
const cartBtn = document.querySelector(".cart-btn");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
let cart= [];
//buttons


//getting the products
class ProductsService {
    async getProducts() {
        try {
            let result = await fetch("products.json");
            let data = await result.json(); 
            
            let products = data.items;
            products = products.map(item => {
                const {title,price,subtitle,description} = item.fields;
                const {id} = item.sys; 
                const image = item.fields.image.fields.file.url;
                return {title,price,subtitle,description,id,image}
            })
            return products; 
        } catch (error) {
            throw new Error('Products not found');
        }
    }
}

//display products
const productsDOM = document.querySelector(".products")

class UI {
    displayProducts(products) {
        let result = '';
        products.forEach(product => {
            result +=`
            <article class="product">
                <img class="menu-img" id="image-product" src="${product.image}" alt="picture of the product">
                <p class="price" id="price-product">$${product.price}.00</p>
                <button id="myBtn"><h4 id="title-product">${product.title}</h4></button>
                <h6 id="subtitle-product">${product.subtitle}</h6>
                <div class="quantity">
                    <a href="#" class="substract" data-id="${product.id}"><span>-</span></a>
                    <input name="quantity" type="number" data-id="${product.id}" class="input" value="0">
                    <a href="#" class="add" data-id="${product.id}"><span>+</span></a>
                </div>
            </article>
            `;
        });
        productsDOM.innerHTML = result;
    }
    getCounterButtons() {
        const addButtons = [...document.querySelectorAll(".add")];
        const substractButtons = [...document.querySelectorAll(".substract")];
        addButtons.forEach(button => {
            let id = button.dataset.id;
            button.addEventListener('click', event => {
                let inCart = cart.find(item => item.id === id);
                // get product from products
                let cartItem = {
                    ...Storage.getProduct(id),
                    amount: 1,
                };
                // add product to the cart
                if (inCart) {
                    inCart.amount += 1;
                } else {
                    cart.push(cartItem);
                    // display cart item
                    this.addCartItem(cartItem);
                }
                //set value 
                const inputs = document.querySelectorAll(`input[data-id="${id}"]`);
                inputs.forEach(input => input.value = parseInt(input.value) + 1);

                // save cart in local storage
                Storage.saveCart(cart);
                // set cart values
                this.setCartValues(cart);
                // show the cart
            })
        });
        substractButtons.forEach(button => {
            let id = button.dataset.id;
            button.addEventListener('click', event => {
                let inCart = cart.find(item => item.id === id);

                // add product to the cart
                if (inCart && inCart.amount > 1) {
                    inCart.amount -= 1;
                    //set value 
                    const input = document.querySelectorAll(`input[data-id="${id}"]`);
                    input.forEach(input => input.value = parseInt(input.value) - 1);
                } else if (inCart && inCart.amount == 1) {
                    cart = cart.filter(item => item.id !==id)
                    const input = document.querySelector(`input[data-id="${id}"]`);
                    input.value = 0; 
                    const itemInCart = document.querySelector(`article[data-id="${id}"]`);
                    itemInCart.parentElement.removeChild(itemInCart);
                }
                // save cart in local storage
                Storage.saveCart(cart);
                // set cart values
                this.setCartValues(cart);

                // show the cart
            })
        });
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;

        cart.forEach(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });

        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    }
    addCartItem(item) {
        const article = document.createElement('article');
        article.setAttribute('data-id', item.id);
        article.classList.add('cart-item');
        article.innerHTML = `
                <img class="menu-img" id="image-product" src="${item.image}" alt="picture of the product">
                <p class="price" id="price-product">$${item.price}.00</p>
                <button id="myBtn"><h4 id="title-product">${item.title}</h4></button>
                <h6 id="subtitle-product">${item.subtitle}</h6>
                <div class="quantity">
                    <a href="#" class="substract" data-id="${item.id}"><span>-</span></a>
                    <input name="quantity" type="number" data-id="${item.id}" class="input" value="0">
                    <a href="#" class="add" data-id="${item.id}"><span>+</span></a>
                </div>`;
                cartContent.appendChild(article);
                console.log(cartContent);
    }
}


//local storage 
class Storage {
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id)
    }
    static saveCart(cart) {
        localStorage.setItem('cart',JSON.stringify(cart));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new ProductsService();
    
    //get all products 
    products.getProducts().catch(error => {
        console.log(error);
    })
    .then(products => {
        if (products) {
            ui.displayProducts(products)
            Storage.saveProducts(products);
            ui.getCounterButtons();
        }
    });
});


// counter 

// let minus = document.querySelectorAll('.substract');
// let plus = document.querySelector('.add');
// let input = document.querySelector('.input');

// minus.addEventListener('click', () => {
//     var value = input.val();
//     if (value > 0) {
//         value--;
//     }
//     input.val(value);
// });
// plus.addEventListener('click', () => {
//     var value = input.val();
//     value++;
//     input.val(value);
// });



