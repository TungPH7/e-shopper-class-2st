const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let cartQty = JSON.parse(localStorage.getItem('cartQty')) || 0;
let cart = JSON.parse(localStorage.getItem('cart')) || {}

$('.cart-qty span').innerText = cartQty

function addToCart(e) {
    e.preventDefault();
    let idValue = this.closest('.single-products').querySelector('h6').innerText
    let imgValue = this.closest('.single-products').querySelector('img').getAttribute('src')
    let priceValue = this.closest('.single-products').querySelector('h2').innerText.slice(1)
    let titleValue = this.closest('.single-products').querySelector('p').innerText
    let newQty = 1;

    if(Object.keys(cart).length > 0) {
        Object.keys(cart).forEach(id => {
            idValue == id && (newQty = cart[idValue].qty + 1);
            console.log(newQty);
        })
    }

    cart = {
        ...cart,
        [idValue]: {
            id: idValue,
            img: imgValue,
            price: priceValue,
            title: titleValue,
            qty: newQty
        }
    }

    cartQty = Object.keys(cart).reduce((acm, id) => {
        return acm += cart[id].qty
    }, 0)
    
    $('.cart-qty span').innerText = cartQty

    
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('cartQty', JSON.stringify(cartQty))
}

$$('.add-to-cart').forEach(item => item.addEventListener('click', addToCart))
