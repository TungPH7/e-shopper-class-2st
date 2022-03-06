import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MyContext } from '../MyProvider';

class HomeProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productsData: [],
            userAuthInfo: {}
        }
    }

    componentDidMount() {
        const userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
        
        axios({
            method: 'GET',
            url: 'http://localhost/laravel/laravel/public/api/product'
        }).then(res => {
            this.setState({
                productsData: res.data.data,
                userAuthInfo: userAuthInfo || {}
            })
        })
    }

    showHomeProducts(context) {
        let { productsData, userAuthInfo } = this.state

        if (productsData.length > 0) {
            return productsData.map((product, i) => {
                return (
                    <div key={product.id} className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={'http://localhost/laravel/laravel/public/upload/user/product/' + userAuthInfo.id + '/' + JSON.parse(product.image)[0]} alt="" />
                                    <h2>${product.price}</h2>
                                    <p>{product.name}</p>
                                    <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                                </div>
                                <div className="product-overlay">
                                    <Link to={'/product-detail/' + product.id} />
                                    <div className="overlay-content">
                                        <h2>${product.price}</h2>
                                        <p>{product.name}</p>
                                        <a
                                            href
                                            className="btn btn-default add-to-cart"
                                            onClick={() => { this.handleAddToCart(product, context) }}
                                        >
                                            <i className="fa fa-shopping-cart" />Add to cart
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li><a href="#"><i className="fa fa-plus-square" />Add to wishlist</a></li>
                                    <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })
        }

    }

    handleAddToCart(product, context) {
        let cartQty = context.cartQty
        let newCartQty = cartQty + 1
        let cartIdList = {}
        let cartIdListLocal = JSON.parse(localStorage.getItem('cartIdListLocal'))
        let productQty = 1
        if (cartIdListLocal) {
            cartIdList = cartIdListLocal
        }
        
        if (Object.keys(cartIdList).length > 0) {
            Object.keys(cartIdList).forEach((cartId) => {
                if (cartId == product.id) {
                    productQty = cartIdList[product.id] + 1
                }
            })
        }

        cartIdList[product.id] = productQty
        
        context.setCartQty(newCartQty)
        localStorage.setItem('cartIdListLocal', JSON.stringify(cartIdList))
        localStorage.setItem('cartQty', JSON.stringify(newCartQty))
    }

    render() {
        return (
            <MyContext.Consumer>
                {(context) => (
                    <div className="col-sm-9 padding-right">
                        {/*features_items*/}
                        <div className="features_items">
                            <h2 className="title text-center">Features Items</h2>
                            {this.showHomeProducts(context)}
                        </div>
                    </div>
                )}
            </MyContext.Consumer>
        );
    }
}

export default HomeProducts;