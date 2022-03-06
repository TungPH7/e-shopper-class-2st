import axios from 'axios';
import React, { Component } from 'react';
import { MyContext } from '../MyProvider';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartList: {},
            cartIdList: {}
        }
    }


    componentDidMount() {
        let cartIdList = JSON.parse(localStorage.getItem('cartIdListLocal'))
        console.log(cartIdList)

        if (cartIdList) {
            axios({
                method: 'POST',
                url: 'http://localhost/laravel/laravel/public/api/product/cart',
                data: cartIdList
            }).then(res => {
                console.log(res)
                this.setState({
                    cartList: res.data.data,
                    cartIdList
                })
            })
        }
    }

    showCartList(context) {
        let cartList = this.state.cartList
        console.log(cartList)
        let userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
        if (cartList.length > 0) {
            return cartList.map((cartItem, i) => {
                return (
                    <tr>
                        <td className="cart_product">
                            <a href><img src='' alt="" /></a>
                        </td>
                        <td className="cart_description">
                            <h4><a href>{cartItem.name}</a></h4>
                            <p>Web ID: {cartItem.id}</p>
                        </td>
                        <td className="cart_price">
                            <p>${cartItem.price}</p>
                        </td>
                        <td className="cart_quantity">
                            <div className="cart_quantity_button">
                                <a className="cart_quantity_up" onClick={() => this.handleChangeQty(1, cartItem, context)}> + </a>
                                <input className="cart_quantity_input" type="text" name="quantity" value={cartItem.qty} autoComplete="off" size={2} />
                                <a className="cart_quantity_down" onClick={() => this.handleChangeQty(-1, cartItem, context)}> - </a>
                            </div>
                        </td>
                        <td className="cart_total">
                            <p className="cart_total_price">${cartItem.qty * cartItem.price}</p>
                        </td>
                        <td className="cart_delete">
                            <a className="cart_quantity_delete" onClick={() => { this.handleDeleteCartItem(cartItem, context) }}><i className="fa fa-times" /></a>
                        </td>
                    </tr>
                )
            })
        }
    }

    showTotalCart() {
        let { cartList } = this.state
        let total = 0

        if (cartList.length > 0) {
            cartList.forEach((cartItem, i) => {
                total += (cartItem.qty * cartItem.price)
            })
        }

        return total
    }

    handleChangeQty(value, cartItem, context) {
        let cartQty = JSON.parse(localStorage.getItem('cartQty'))
        let { cartIdList, cartList } = this.state
        let productQty = 1
        let index = this.findIndex(cartItem, cartList)

        if (cartItem.qty == 1 && value == -1) {
            context.setCartQty(cartQty - cartItem.qty)
            delete cartIdList[cartItem.id]

            cartList.splice(index, 1)
        } else {
            context.setCartQty(cartQty + value)
            productQty = cartIdList[cartItem.id] + value
            cartIdList[cartItem.id] = productQty
            cartList[index].qty = productQty
        }

        this.setState({
            cartIdList,
            cartList
        })

        localStorage.setItem('cartQty', JSON.stringify((cartQty + value)))
        localStorage.setItem('cartIdListLocal', JSON.stringify(cartIdList))
    }

    handleDeleteCartItem(cartItem, context) {
        let cartQty = JSON.parse(localStorage.getItem('cartQty'))
        let { cartIdList, cartList } = this.state
        let index = this.findIndex(cartItem, cartList)

        cartList.splice(index, 1)
        this.setState({
            cartList: cartList
        })

        context.setCartQty(cartQty - cartItem.qty)
        delete cartIdList[cartItem.id]

        localStorage.setItem('cartQty', JSON.stringify((cartQty - cartItem.qty)))
        localStorage.setItem('cartIdListLocal', JSON.stringify(cartIdList))
    }

    findIndex(cartItem, cartList) {
        let index = -1

        cartList.forEach((cart, i) => {
            if (cart.id == cartItem.id) {
                index = i
            }
        })

        return index
    }

    render() {
        return (
            <MyContext.Consumer>
                {(context) => (
                    <div>
                        <section id="cart_items">
                            <div className="container">
                                <div className="breadcrumbs">
                                    <ol className="breadcrumb">
                                        <li><a href="#">Home</a></li>
                                        <li className="active">Shopping Cart</li>
                                    </ol>
                                </div>
                                <div className="table-responsive cart_info">
                                    <table className="table table-condensed">
                                        <thead>
                                            <tr className="cart_menu">
                                                <td className="image">Item</td>
                                                <td className="description" />
                                                <td className="price">Price</td>
                                                <td className="quantity">Quantity</td>
                                                <td className="total">Total</td>
                                                <td />
                                            </tr>
                                        </thead>
                                        <tbody id="product-cart">
                                            {this.showCartList(context)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                        <section id="do_action">
                            <div className="container">
                                <div className="heading">
                                    <h3>What would you like to do next?</h3>
                                    <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="chose_area">
                                            <ul className="user_option">
                                                <li>
                                                    <input type="checkbox" />
                                                    <label>Use Coupon Code</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" />
                                                    <label>Use Gift Voucher</label>
                                                </li>
                                                <li>
                                                    <input type="checkbox" />
                                                    <label>Estimate Shipping &amp; Taxes</label>
                                                </li>
                                            </ul>
                                            <ul className="user_info">
                                                <li className="single_field">
                                                    <label>Country:</label>
                                                    <select>
                                                        <option>United States</option>
                                                        <option>Bangladesh</option>
                                                        <option>UK</option>
                                                        <option>India</option>
                                                        <option>Pakistan</option>
                                                        <option>Ucrane</option>
                                                        <option>Canada</option>
                                                        <option>Dubai</option>
                                                    </select>
                                                </li>
                                                <li className="single_field">
                                                    <label>Region / State:</label>
                                                    <select>
                                                        <option>Select</option>
                                                        <option>Dhaka</option>
                                                        <option>London</option>
                                                        <option>Dillih</option>
                                                        <option>Lahore</option>
                                                        <option>Alaska</option>
                                                        <option>Canada</option>
                                                        <option>Dubai</option>
                                                    </select>
                                                </li>
                                                <li className="single_field zip-field">
                                                    <label>Zip Code:</label>
                                                    <input type="text" />
                                                </li>
                                            </ul>
                                            <a className="btn btn-default update" href>Get Quotes</a>
                                            <a className="btn btn-default check_out" href>Continue</a>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="total_area">
                                            <ul>
                                                <li>Cart Sub Total <span>$59</span></li>
                                                <li>Eco Tax <span>$2</span></li>
                                                <li>Shipping Cost <span>Free</span></li>
                                                <li className="cart-total">Total <span>${this.showTotalCart()}</span></li>
                                            </ul>
                                            <a className="btn btn-default update" href>Update</a>
                                            <a className="btn btn-default check_out" href>Check Out</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}

export default Cart;