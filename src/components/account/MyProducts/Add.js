import axios, { Axios } from 'axios';
import React, { Component } from 'react';
import ErrorForm from './ErrorForm';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categorys: [],
            brands: [],
            name: '',
            price: '',
            category: 2,
            brand: 2,
            status: 1,
            sale: '',
            company: '',
            detail: '',
            files: [],
            imgFileFormat: ['jpg', 'jpeg', 'png'],
            errorForm: {}
        }

        this.showCategory = this.showCategory.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showSalePercent = this.showSalePercent.bind(this)
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'http://localhost/laravel/laravel/public/api/category-brand'
        }).then(res => {
            this.setState({
                categorys: res.data.category,
                brands: res.data.brand
            })
        }).catch(err => {

        })
    }

    showCategory() {
        const { categorys } = this.state
        if (categorys) {
            return categorys.map((category, i) => {
                return <option key={i} value={category.id}>{category.category}</option>
            })
        }
    }

    showBrand() {
        const { brands } = this.state
        if (brands) {
            return brands.map((brand, i) => {
                return <option key={i} value={brand.id}>{brand.brand}</option>
            })
        }
    }

    showSalePercent() {
        let { status, sale } = this.state
        if (status == 0) {
            return (
                <div className="form-group">
                    <input value={sale} onChange={this.handleInput} type="text" name="sale" id="sale-input" className="form-control" placeholder="0" />
                    <span>%</span>
                </div>
            )
        } else {
            return null
        }
    }

    handleInput(e) {
        let target = e.target
        let name = target.name
        let value = ''
        if (target.type === 'file') {
            value = target.files
        } else if (target.type === 'checkbox') {
            value = target.checked
        } else {
            value = target.value
        }

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let { name, price, category, brand, status, sale, company, files, detail, imgFileFormat } = this.state
        let tempoErrorForm = {}
        let allValid = true
        let filesList = Object.values(files)

        if (!name) {
            allValid = false
            tempoErrorForm.name = 'Vui lòng nhập tên sản phẩm!'
        } else {
            delete tempoErrorForm.name
        }

        if (!price) {
            allValid = false
            tempoErrorForm.price = 'Vui lòng nhập giá sản phẩm!'
        } else {
            delete tempoErrorForm.price
        }

        if (!company) {
            allValid = false
            tempoErrorForm.company = 'Vui lòng nhập tên công ty!'
        } else {
            delete tempoErrorForm.company
        }

        if (!detail) {
            allValid = false
            tempoErrorForm.detail = 'Vui lòng nhập thông tin thêm!'
        } else {
            delete tempoErrorForm.detail
        }

        if (filesList.length > 0 && filesList.length < 4) {
            for (const file of filesList) {
                let fileFormat = file.name.split('.')[file.name.split('.').length - 1]
                let fileSize = file.size

                let isImage = imgFileFormat.some((imgFormat, i) => {
                    return imgFormat == fileFormat
                })
                if (!isImage || fileSize > 1024 * 1024) {
                    // Nếu ảnh KHÔNG hợp lệ
                    allValid = false
                    tempoErrorForm.files = 'Chọn tối đa 3 file ảnh, size dưới 1Mb mỗi hình'
                    break;
                } else {
                    // Nếu ảnh hợp lệ
                    delete tempoErrorForm.files
                }
            }
        } else {
            allValid = false
            tempoErrorForm.files = 'Chọn tối đa 3 file ảnh, size dưới 1Mb mỗi hình'
        }

        if (!allValid) {
            this.setState({
                errorForm: tempoErrorForm
            })
        } else {
            this.setState({
                errorForm: {}
            })

            const userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
            const accessToken = userAuthInfo.token
            const formData = new FormData()

            formData.append('id_user', userAuthInfo.id) 
            formData.append('name', this.state.name) 
            formData.append('price', this.state.price) 
            formData.append('category', this.state.category) 
            formData.append('brand', this.state.brand) 
            formData.append('status', this.state.status) 
            formData.append('sale', this.state.sale) 
            formData.append('company', this.state.company) 
            formData.append('detail', this.state.detail) 

            Object.values(this.state.files).forEach((file, i) => {
                formData.append('file[]', file)
            })

            axios({
                method: 'POST',
                url: 'http://localhost/laravel/laravel/public/api/user/add-product',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err)
            })
        }

    }

    render() {
        const { category, brand, status, errorForm } = this.state
        return (
            <div className="col-sm-8">
                <div id='add-product'>
                    <h2 className='my-product-label'>Add A New Product</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input onChange={this.handleInput} type="text" name="name" id="" className="form-control" placeholder="Product Name" />
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleInput} type="text" name="price" id="" className="form-control" placeholder="Product Price" />
                        </div>
                        <div className="form-group">
                            <select value={category} onChange={this.handleInput} className="form-control" name="category" id="">
                                {this.showCategory()}
                            </select>
                        </div>
                        <div className="form-group">
                            <select value={brand} onChange={this.handleInput} className="form-control" name="brand" id="">
                                {this.showBrand()}
                            </select>
                        </div>
                        <div className="form-group">
                            <select value={status} onChange={this.handleInput} className="form-control" name="status" >
                                <option value={0}>sale</option>
                                <option value={1}>new</option>
                            </select>
                        </div>
                        {this.showSalePercent()}
                        <div className="form-group">
                            <input onChange={this.handleInput} type="text" name="company" id="" className="form-control" placeholder="Company Profile" />
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleInput} type="file" name="files" multiple id="" className="form-control" placeholder="" />
                        </div>
                        <div className="form-group">
                            <textarea onChange={this.handleInput} className="form-control" name="detail" placeholder="Detail" id="" rows="1"></textarea>
                        </div>
                        <div className='add-product-btn'>
                            <button type="submit" className="btn btn-primary add-product-btn">Add</button>
                        </div>
                    </form>
                </div>
                <br />
                <ErrorForm errorForm={errorForm} />
            </div>
        );
    }
}

export default Add;