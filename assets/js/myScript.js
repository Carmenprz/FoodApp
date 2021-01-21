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

// counter 

// let minus = document.querySelector('.substract');
// let plus = document.querySelector('.add');
// let input = document.querySelector('.input');

// plus.addEventListener('click', () => {
//     input.value = parseInt(input.value) + 1;
// });

// minus.addEventListener('click', () => {
//     input.value = parseInt(input.value) - 1;
// });



//getting the products
class Products {
    async getProducts() {
        try {
            let result = await fetch("products.json");
            let data = await result.json(); 

            let products = data.items;
            products = products.map(item => {
                const {title,price,subtitle,description} = item.fields;
                const {id} = item.sys; 
                return {title,price,subtitle,description,id}
            })
            return products; 
        } catch (error) {
            console.log(error);
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
                <img class="menu-img" id="image-product" src="assets/img/chickenVeggieSalad.jpg" alt="chicken veggi salad">
                <p class="price" id="price-product">$${product.price}</p>
                <button id="myBtn"><h4 id="title-product">${product.title}</h4></button>
                <h6 id="subtitle-product">${product.subtitle}</h6>
                <div class="quantity">
                    <a href="#" class="substract"><span>-</span></a>
                    <input name="quantity" type="number" class="input" data-id=${product.id} value="0">
                    <a href="#" class="add"><span>+</span></a>
                </div>
            </article>
            `;
        });
        productsDOM.innerHTML = result;
    }
}


//local storage 
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    //get all products 
    products.getProducts().then(products => 
    ui.displayProducts(products));
});
