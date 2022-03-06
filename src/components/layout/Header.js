import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../MyProvider';

class Header extends Component {
    constructor(props) {
        super(props);

        this.showLoginStatus = this.showLoginStatus.bind(this)
        this.changeLoginStatus = this.changeLoginStatus.bind(this)
    }

    showLoginStatus(context) {
        if (context.isLogin) {
            return (
                <li onClick={() => { this.changeLoginStatus(context) }}>
                    <Link to={'/'}>
                        <i className="fa fa-lock" />
                        Logout
                    </Link>
                </ li>
            )
        } else {
            return (
                < li >
                    <Link to={'/login'}>
                        <i className="fa fa-lock" />
                        Login
                    </Link>
                </ li>
            )
        }
    }

    changeLoginStatus(context) {
        context.setIsLogin(false)
        localStorage.clear()
    }

    render() {
        return (
            <header id="header">{/*header*/}
                <div className="header_top">{/*header_top*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li><a><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                                        <li><a><i className="fa fa-envelope" /> info@domain.com</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="social-icons pull-right">
                                    <ul className="nav navbar-nav">
                                        <li><a><i className="fa fa-facebook" /></a></li>
                                        <li><a><i className="fa fa-twitter" /></a></li>
                                        <li><a><i className="fa fa-linkedin" /></a></li>
                                        <li><a><i className="fa fa-dribbble" /></a></li>
                                        <li><a><i className="fa fa-google-plus" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header_top*/}
                <div className="header-middle">{/*header-middle*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 clearfix">
                                <div className="logo pull-left">
                                    <a><img src="images/home/logo.png" alt="" /></a>
                                </div>
                                <div className="btn-group pull-right clearfix">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            USA
                                            <span className="caret" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a>Canada</a></li>
                                            <li><a>UK</a></li>
                                        </ul>
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                            DOLLAR
                                            <span className="caret" />
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a>Canadian Dollar</a></li>
                                            <li><a>Pound</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <MyContext.Consumer>
                                {(context) => (
                                    <div className="col-md-8 clearfix">
                                        <div className="shop-menu clearfix pull-right">
                                            <ul className="nav navbar-nav">
                                                {context.isLogin && <li><Link to={'/account/my-product'}><i className="fa fa-user" /> Account</Link></li>}
                                                <li><a><i className="fa fa-star" /> Wishlist</a></li>
                                                <li><a><i className="fa fa-crosshairs" /> Checkout</a></li>
                                                <li>
                                                    <Link to={'/cart'} style={{ 'display': 'inline-block' }}>
                                                        <i className="fa fa-shopping-cart" />
                                                        Cart
                                                    </Link>
                                                    <span
                                                        className='cart-qty' 
                                                        style={{'marginLeft': '10px'}}
                                                    >
                                                        {context.cartQty}
                                                    </span>
                                                </li>
                                                {this.showLoginStatus(context)}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </MyContext.Consumer>
                        </div>
                    </div>
                </div>{/*/header-middle*/}
                <div className="header-bottom">{/*header-bottom*/}
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="navbar-header">
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                        <span className="sr-only">Toggle navigation</span>
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                        <span className="icon-bar" />
                                    </button>
                                </div>
                                <div className="mainmenu pull-left">
                                    <ul className="nav navbar-nav collapse navbar-collapse">
                                        <li><Link to={'/'}>Home</Link></li>
                                        <li className="dropdown"><a>Shop<i className="fa fa-angle-down" /></a>
                                            <ul role="menu" className="sub-menu">
                                                <li><a>Products</a></li>
                                                <li><a>Product Details</a></li>
                                                <li><a>Checkout</a></li>
                                                <li><a>Cart</a></li>
                                                <li><a className="active">Login</a></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown"><Link to={'/bloglist'}>Blog<i className="fa fa-angle-down" /></Link>
                                            <ul role="menu" className="sub-menu">
                                                <li><Link to={'/bloglist'}>Blog List</Link></li>
                                                <li><a>Blog Single</a></li>
                                            </ul>
                                        </li>
                                        <li><a>404</a></li>
                                        <li><a>Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="search_box pull-right">
                                    <input type="text" placeholder="Search" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/header-bottom*/}
            </header>
        );
    }
}

export default Header;