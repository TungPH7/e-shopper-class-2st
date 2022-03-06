var cartQty = 0;
var cartQtyJson = localStorage.getItem('cartQty')
if (cartQtyJson) {
    console.log(cartQtyJson)
    var cartQtyJsonNum = parseInt(cartQtyJson)
    console.log(cartQtyJsonNum)
    cartQty = cartQtyJsonNum
}
// Gán số lượng sp trên icon giỏ hàng
$('.cart-qty').find('a').find('span').text(cartQty)

$('a.add-to-cart').click(function() {
    var quantity = 1;
    var products = {
    }
    var productId = $(this).closest('.single-products').find('h6').text()
    var imgSrc = $(this).closest('.single-products').find('img').attr('src')
    var productPrice = ($(this).closest('.single-products').find('h2').text()).slice(1,3);
    var productPriceNum = Number(productPrice);
    var productName = $(this).closest('.single-products').find('p').text();

    // Kiểm tra trong products đã có sp chưa. Có thì tăng số lương lên 1
    var productsJson = localStorage.getItem('products')
    if (productsJson) {
        products = JSON.parse(productsJson)
        Object.values(products).map((value, index) => {
            if (productId == value.id) {
                quantity = value.qty
                ++quantity
            }
        })
    }
    
    var product = {
        id: productId,
        img: imgSrc,
        price: productPriceNum,
        name: productName,
        qty: quantity
    }

    // Gán sp đã tăng số lượng vào Obj 'products'
    products[product.id] = product;
    var productsJson = JSON.stringify(products)
    localStorage.setItem('products', productsJson)

    // Tăng 1 số lượng sp trên icon giỏ hàng
    cartQty += 1;
    var cartQtyJson = JSON.stringify(cartQty)
    localStorage.setItem('cartQty', cartQtyJson)

    $('.cart-qty').find('a').find('span').text(cartQty)
    
    return false;
})