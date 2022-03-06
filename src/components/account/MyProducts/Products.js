import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsData: []
        }

        this.showProducts = this.showProducts.bind(this)
    }


    componentDidMount() {
        const userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
        if (userAuthInfo) {
            let accessToken = userAuthInfo.token
            axios({
                method: 'GET',
                url: 'http://localhost/laravel/laravel/public/api/user/my-product',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then(res => {
                if (res.data.response === "success") {
                    this.setState({
                        productsData: res.data.data
                    })
                }
            })
        }
    }

    showProducts() {
        const userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
        if (userAuthInfo) {
            const { productsData } = this.state
            let productsList = Object.values(productsData)

            if (productsList.concat.length > 0) {
                return productsList.map((product, i) => {
                    return (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td style={{ 'width': '10%' }}>
                                <img
                                    className='acc-product-img'
                                    src={'http://localhost/laravel/laravel/public/upload/user/product/' + userAuthInfo.id + '/' + JSON.parse(product.image)[0]} alt=""
                                >
                                </img>
                            </td>
                            <td>{product.price}$</td>
                            <td>
                                <Link to={'/account/my-products/edit/' + product.id} type="button" className="btn btn-warning">Edit</Link>&nbsp;&nbsp;
                                <button onClick={() => { this.handleDeleteProduct(product.id) }} type="button" className="btn btn-success">Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
        }
    }

    handleDeleteProduct(idProduct) {
        const userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
        let accessToken = userAuthInfo.token

        axios({
            method: 'GET',
            url: 'http://localhost/laravel/laravel/public/api/user/delete-product/' + idProduct,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).then(res => {
            this.setState({
                productsData: res.data.data
            })
        }).then(err => {
            
        })

    }

    render() {
        console.log(this.state.productsData)
        return (
            <div className='col-sm-8'>
                <div className='product-list'>
                    <table className="table table-striped table-inverse table-responsive">
                        <thead className="thead-inverse">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showProducts()}
                        </tbody>
                    </table>
                </div>

                <div className='add-product-btn'>
                    <Link to='/account/my-products/add' type="button" className="btn btn-primary">Add New Product</Link>
                </div>
            </div>
        );
    }
}

export default Products;