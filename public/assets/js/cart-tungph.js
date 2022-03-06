var productsJson = localStorage.getItem('products')
if (productsJson) {
    var products = JSON.parse(productsJson)
}

var cartQtyJson = localStorage.getItem('cartQty')
if (cartQtyJson) {
    var cartQtyJsonNum = parseInt(cartQtyJson)
    console.log(cartQtyJsonNum)
    cartQty = cartQtyJsonNum
}
$('.cart-qty').find('a').find('span').text(cartQty)

var total = 0;

var cart = Object.values(products).map((value, index) => {
    return `
    <tr>
        <td class="cart_product">
            <a href=""><img src="${value.img}" alt=""></a>
        </td>
        <td class="cart_description">
            <h4><a href="">${value.name}</a></h4>
            <p>Web ID: ${value.id}</p>
        </td>
        <td class="cart_price">
            <p>${value.price}</p>
        </td>
        <td class="cart_quantity">
            <div class="cart_quantity_button">
                <a class="cart_quantity_up"> + </a>
                <input class="cart_quantity_input" type="text" name="quantity" value="${value.qty}" autocomplete="off" size="2">
                <a class="cart_quantity_down"> - </a>
            </div>
        </td>
        <td class="cart_total">
            <p class="cart_total_price">$${value.qty * value.price}</p>
        </td>
        <td class="cart_delete">
            <a class="cart_quantity_delete"><i class="fa fa-times"></i></a>
        </td>
    </tr>
    `
})
document.getElementById('product-cart').innerHTML = cart.join('')

Object.values(products).forEach((value, index) => {
    total = total + (value.qty * value.price)
})
var totalCartJson = JSON.stringify(total)
localStorage.setItem('total', totalCartJson)
$('.total_area').find('li:last-child').find('span').text(total)

$('a.cart_quantity_up').click(function () {
    var totalJson = localStorage.getItem('total')
    if (totalJson) {
        total = JSON.parse(totalJson);
    }
    var productPrice = 0;
    var productId = ($(this).closest('tr').find('td.cart_description').find('p').text()).slice(8, 9);
    Object.values(products).forEach((value, index) => {
        if (productId == value.id) {

            var product = {
                id: value.id,
                img: value.img,
                price: value.price,
                name: value.name,
                qty: value.qty + 1
            }

            $(this).next('input.cart_quantity_input').attr('value', product.qty)
            $(this).closest('tr').find('td.cart_total').find('p.cart_total_price').text(product.qty * product.price)

            products[product.id] = product;
            var productsJson = JSON.stringify(products)
            localStorage.setItem('products', productsJson)
            productPrice = product.price;
        }

    })
    total = total + productPrice
    var totalCartJson = JSON.stringify(total)
    localStorage.setItem('total', totalCartJson)
    $('.total_area').find('li:last-child').find('span').text(total)
    
    cartQty = cartQty + 1
    var cartQtyJson = JSON.stringify(cartQty)
    localStorage.setItem('cartQty', cartQtyJson)
    $('.cart-qty').find('a').find('span').text(cartQty)
})

$('a.cart_quantity_down').click(function () {
    var totalJson = localStorage.getItem('total')
    if (totalJson) {
        total = JSON.parse(totalJson);
    }
    var productPrice = 0;
    var productId = ($(this).closest('tr').find('td.cart_description').find('p').text()).slice(8, 9);

    Object.values(products).forEach((value, index) => {
        if (productId == value.id) {

            var product = {
                id: value.id,
                img: value.img,
                price: value.price,
                name: value.name,
                qty: value.qty - 1
            }

            $(this).prev('input.cart_quantity_input').attr('value', product.qty)
            $(this).closest('tr').find('td.cart_total').find('p.cart_total_price').text(product.qty * product.price)
            var newQty = $(this).prev('input.cart_quantity_input').attr('value')
            console.log(newQty)
            if (newQty < 1) {
                $(this).closest('tr').remove()
                delete products[product.id]
            } else {
                products[product.id] = product;
            }

            var productsJson = JSON.stringify(products)
            localStorage.setItem('products', productsJson)
            productPrice = product.price;
        }
    })
    
    total = total - productPrice
    var totalCartJson = JSON.stringify(total)
    localStorage.setItem('total', totalCartJson)
    $('.total_area').find('li:last-child').find('span').text(total)
    
    cartQty = cartQty - 1
    var cartQtyJson = JSON.stringify(cartQty)
    localStorage.setItem('cartQty', cartQtyJson)
    $('.cart-qty').find('a').find('span').text(cartQty)
})

$('a.cart_quantity_delete').click(function () {
    var totalJson = localStorage.getItem('total')
    if (totalJson) {
        total = JSON.parse(totalJson);
    }
    var productPrice = 0;
    var productQty = 0;
    var productId = ($(this).closest('tr').find('td.cart_description').find('p').text()).slice(8, 9);
    console.log(products)
    Object.values(products).forEach((value, index) => {
        if (productId == value.id) {

            $(this).closest('tr').remove()
            delete products[value.id]

            var productsJson = JSON.stringify(products)
            localStorage.setItem('products', productsJson)
            productPrice = value.price;
            productQty = value.qty;
        }
    })
    total = total - (productPrice * productQty)
    var totalCartJson = JSON.stringify(total)
    localStorage.setItem('total', totalCartJson)
    $('.total_area').find('li:last-child').find('span').text(total)
    
    cartQty = cartQty - productQty
    var cartQtyJson = JSON.stringify(cartQty)
    localStorage.setItem('cartQty', cartQtyJson)
    $('.cart-qty').find('a').find('span').text(cartQty)
})



















