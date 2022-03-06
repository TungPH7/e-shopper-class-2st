import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuLeftAcc extends Component {
    render() {
        return (
            <div className="col-sm-3">
                <div className="left-sidebar">
                    <h2>Account</h2>
                    <div className="panel-group category-products" id="accordian">{/*category-productsr*/}

                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><Link to='/account/my-account'>My Account</Link></h4>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><Link to='/account/my-products'>My Products</Link></h4>
                            </div>
                        </div>
                    </div>{/*/category-products*/}
                </div>
            </div>
        );
    }
}

export default MenuLeftAcc;