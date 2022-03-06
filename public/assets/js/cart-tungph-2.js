const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let cartQty = JSON.parse(localStorage.getItem('cartQty')) || 0;
let cart = JSON.parse(localStorage.getItem('cart')) || {}
let cartTotal = 0;
let cartTotalEle = $('.total_area .cart-total span')
let product = {}

$('.cart-qty span').innerHTML = cartQty

let cartHtml = Object.keys(cart).map((id, index) => {
    cartTotal += cart[id].qty * cart[id].price
    return `
        <tr>
            <td class="cart_product">
                <a href=""><img src="${cart[id].img}" alt=""></a>
            </td>
            <td class="cart_description">
                <h4><a href="">${cart[id].title}</a></h4>
                <p>${id}</p>
            </td>
            <td class="cart_price">
                <p>$${cart[id].price}</p>
            </td>
            <td class="cart_quantity">
                <div class="cart_quantity_button">
                    <a class="cart_quantity_up"> + </a>
                    <input class="cart_quantity_input" type="text" name="quantity" value="${cart[id].qty}" autocomplete="off" size="2">
                    <a class="cart_quantity_down"> - </a>
                </div>
            </td>
            <td class="cart_total">
                <p class="cart_total_price">$${cart[id].qty * cart[id].price}</p>
            </td>
            <td class="cart_delete">
                <a class="cart_quantity_delete"><i class="fa fa-times"></i></a>
            </td>
        </tr>
    `
})
$('#product-cart').innerHTML = cartHtml.join('')
$('.cart-total span').innerText = cartTotal
localStorage.setItem('cartTotal', JSON.stringify(cartTotal))

function increaseQty() {
    let productId = this.closest('tr').querySelector('.cart_description p').innerText
    let qtyInput = this.closest('tr').querySelector('.cart_quantity_input')
    let cartTotalPrice = this.closest('tr').querySelector('.cart_total_price')

    if (cart) {
        Object.keys(cart).forEach(id => {
            if (id == productId) {
                console.log(123);
                product = {
                    id: id,
                    img: cart[id].img,
                    price: cart[id].price,
                    title: cart[id].title,
                    qty: cart[id].qty + 1
                }

                qtyInput.setAttribute('value', product.qty)
                cartTotalPrice.innerText = product.qty * product.price
                cartTotal += parseFloat(product.price)
                cartTotalEle.innerText = cartTotal
                cartQty += 1
                $('.cart-qty span').innerHTML = cartQty
                cart[productId] = product
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal))
        localStorage.setItem('cartQty', JSON.stringify(cartQty))
    }
}

function decreaseQty() {
    let productId = this.closest('tr').querySelector('.cart_description p').innerText
    let qtyInput = this.closest('tr').querySelector('.cart_quantity_input')
    let cartTotalPrice = this.closest('tr').querySelector('.cart_total_price')

    if (cart) {
        Object.keys(cart).forEach(id => {
            if (id == productId) {
                product = {
                    id: id,
                    img: cart[id].img,
                    price: cart[id].price,
                    title: cart[id].title,
                    qty: cart[id].qty - 1
                }

                if (product.qty > 0) {
                    qtyInput.setAttribute('value', product.qty)
                    cartTotalPrice.innerText = product.qty * product.price
                    cartTotal -= parseFloat(product.price)
                    cartTotalEle.innerText = cartTotal
                    cart[productId] = product
                } else {
                    this.closest('tr').remove()
                    cartTotal -= parseFloat(product.price)
                    cartTotalEle.innerText = cartTotal
                    delete cart[productId]
                }
                cartQty -= 1
                $('.cart-qty span').innerHTML = cartQty
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal))
        localStorage.setItem('cartQty', JSON.stringify(cartQty))
    }
}

function deleteProduct() {
    let productId = this.closest('tr').querySelector('.cart_description p').innerText

    if (cart) {
        Object.keys(cart).forEach(id => {
            if (id == productId) {
                product = {
                    id: id,
                    img: cart[id].img,
                    price: cart[id].price,
                    title: cart[id].title,
                    qty: cart[id].qty
                }

                cartTotal -= product.qty * parseFloat(product.price)
                cartTotalEle.innerText = cartTotal
                this.closest('tr').remove()
                cartQty -= product.qty
                $('.cart-qty span').innerHTML = cartQty
                delete cart[productId]
            }
        })

        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('cartTotal', JSON.stringify(cartTotal))
        localStorage.setItem('cartQty', JSON.stringify(cartQty))
    }
}

$$('.cart_quantity_up').forEach(item => {
    item.addEventListener('click', increaseQty)
})

$$('.cart_quantity_down').forEach(item => {
    item.addEventListener('click', decreaseQty)
})

$$('.cart_quantity_delete').forEach(item => {
    item.addEventListener('click', deleteProduct)
})





