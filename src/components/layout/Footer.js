import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer id="footer">{/*Footer*/}
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <div className="companyinfo">
                                    <h2><span>e</span>-shopper</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor</p>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="col-sm-3">
                                    <div className="video-gallery text-center">
                                        <a>
                                            <div className="iframe-img">
                                                <img src="images/home/iframe1.png" alt="" />
                                            </div>
                                            <div className="overlay-icon">
                                                <i className="fa fa-play-circle-o" />
                                            </div>
                                        </a>
                                        <p>Circle of Hands</p>
                                        <h2>24 DEC 2014</h2>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="video-gallery text-center">
                                        <a>
                                            <div className="iframe-img">
                                                <img src="images/home/iframe2.png" alt="" />
                                            </div>
                                            <div className="overlay-icon">
                                                <i className="fa fa-play-circle-o" />
                                            </div>
                                        </a>
                                        <p>Circle of Hands</p>
                                        <h2>24 DEC 2014</h2>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="video-gallery text-center">
                                        <a>
                                            <div className="iframe-img">
                                                <img src="images/home/iframe3.png" alt="" />
                                            </div>
                                            <div className="overlay-icon">
                                                <i className="fa fa-play-circle-o" />
                                            </div>
                                        </a>
                                        <p>Circle of Hands</p>
                                        <h2>24 DEC 2014</h2>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="video-gallery text-center">
                                        <a>
                                            <div className="iframe-img">
                                                <img src="images/home/iframe4.png" alt="" />
                                            </div>
                                            <div className="overlay-icon">
                                                <i className="fa fa-play-circle-o" />
                                            </div>
                                        </a>
                                        <p>Circle of Hands</p>
                                        <h2>24 DEC 2014</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="address">
                                    <img src="images/home/map.png" alt="" />
                                    <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-widget">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <div className="single-widget">
                                    <h2>Service</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><a>Online Help</a></li>
                                        <li><a>Contact Us</a></li>
                                        <li><a>Order Status</a></li>
                                        <li><a>Change Location</a></li>
                                        <li><a>FAQ???s</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="single-widget">
                                    <h2>Quock Shop</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><a>T-Shirt</a></li>
                                        <li><a>Mens</a></li>
                                        <li><a>Womens</a></li>
                                        <li><a>Gift Cards</a></li>
                                        <li><a>Shoes</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="single-widget">
                                    <h2>Policies</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><a>Terms of Use</a></li>
                                        <li><a>Privecy Policy</a></li>
                                        <li><a>Refund Policy</a></li>
                                        <li><a>Billing System</a></li>
                                        <li><a>Ticket System</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="single-widget">
                                    <h2>About Shopper</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><a>Company Information</a></li>
                                        <li><a>Careers</a></li>
                                        <li><a>Store Location</a></li>
                                        <li><a>Affillate Program</a></li>
                                        <li><a>Copyright</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-3 col-sm-offset-1">
                                <div className="single-widget">
                                    <h2>About Shopper</h2>
                                    <form action="#" className="searchform">
                                        <input type="text" placeholder="Your email address" />
                                        <button type="submit" className="btn btn-default"><i className="fa fa-arrow-circle-o-right" /></button>
                                        <p>Get the most recent updates from <br />our site and be updated your self...</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <p className="pull-left">Copyright ?? 2013 E-SHOPPER Inc. All rights reserved.</p>
                            <p className="pull-right">Designed by <span><a>Themeum</a></span></p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;