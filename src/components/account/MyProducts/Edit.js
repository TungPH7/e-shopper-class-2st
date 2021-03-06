import axios, { Axios } from 'axios';
import React, { Component } from 'react';
import ErrorForm from './ErrorForm';

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
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
            avatarCheckbox: [],
            imgFileFormat: ['jpg', 'jpeg', 'png'],
            errorForm: {}
        }

        this.showCategory = this.showCategory.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showSalePercent = this.showSalePercent.bind(this)
    }

    componentDidMount() {
        let idProduct = parseFloat(this.props.match.params.id)
        const userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
        let accessToken = userAuthInfo.token

        axios({
            method: 'GET',
            url: 'http://localhost/laravel/laravel/public/api/user/product/' + idProduct,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).then(res => {
            let { id_user, id, name, price, id_category, id_brand, status, sale, company_profile, detail, image } = res.data.data
            this.setState({
                userId: id_user,
                name,
                price,
                category: id_category,
                brand: id_brand,
                status,
                sale,
                company: company_profile,
                detail,
                avatarCheckbox: image
            })
        })

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
                return <option value={category.id}>{category.category}</option>
            })
        }
    }

    showBrand() {
        const { brands } = this.state
        if (brands) {
            return brands.map((brand, i) => {
                return <option value={brand.id}>{brand.brand}</option>
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
            tempoErrorForm.name = 'Vui l??ng nh???p t??n s???n ph???m!'
        } else {
            delete tempoErrorForm.name
        }

        if (!price) {
            allValid = false
            tempoErrorForm.price = 'Vui l??ng nh???p gi?? s???n ph???m!'
        } else {
            delete tempoErrorForm.price
        }

        if (!company) {
            allValid = false
            tempoErrorForm.company = 'Vui l??ng nh???p t??n c??ng ty!'
        } else {
            delete tempoErrorForm.company
        }

        if (!detail) {
            allValid = false
            tempoErrorForm.detail = 'Vui l??ng nh???p th??ng tin th??m!'
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
                    // N???u ???nh KH??NG h???p l???
                    allValid = false
                    tempoErrorForm.files = 'Ch???n t???i ??a 3 file ???nh, size d?????i 1Mb m???i h??nh'
                    break;
                } else {
                    // N???u ???nh h???p l???
                    delete tempoErrorForm.files
                }
            }
        } else {
            allValid = false
            tempoErrorForm.files = 'Ch???n t???i ??a 3 file ???nh, size d?????i 1Mb m???i h??nh'
        }

        if (!allValid) {
            this.setState({
                errorForm: tempoErrorForm
            })
        } else {
            this.setState({
                errorForm: {}
            })

            let idProduct = parseFloat(this.props.match.params.id)
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
                url: 'http://localhost/laravel/laravel/public/api/user/edit-product/' + idProduct,
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

    showAvatarCheckBox() {
        const { userId, avatarCheckbox } = this.state
        if (avatarCheckbox.length > 0) {
            return avatarCheckbox.map((avatar, i) => {
                return (
                    <div key={i} className="form-group" style={{ 'display': 'inline-block', 'marginLeft': '10px' }}>
                        <img
                            src={'http://localhost/laravel/laravel/public/upload/user/product/' + userId + '/' + avatar}
                            // src='https://www.gravatar.com/avatar/2d8cb0eaa4de7f781e42328ec7544ca3?s=64&d=identicon&r=PG'
                            className='avatar-checkbox-img'
                            style={{ 'height': '60px', 'width': '70px' }}
                            alt=''
                        />
                        <input
                            type='checkbox'
                            className='form-control avatar-checkbox'
                            name='avatarCheckbox'
                        />
                    </div>
                )
            })
        }
    }

    render() {
        const { name, price, company, detail, category, brand, status, errorForm } = this.state
        return (
            <div className="col-sm-8">
                <div id='add-product'>
                    <h2 className='my-product-label'>Update Product</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input value={name} onChange={this.handleInput} type="text" name="name" id="" className="form-control" placeholder="Product Name" />
                        </div>
                        <div className="form-group">
                            <input value={price} onChange={this.handleInput} type="text" name="price" id="" className="form-control" placeholder="Product Price" />
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
                            <input value={company} onChange={this.handleInput} type="text" name="company" id="" className="form-control" placeholder="Company Profile" />
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleInput} type="file" name="files" multiple id="" className="form-control" placeholder="" />
                        </div>
                        {this.showAvatarCheckBox()}
                        <div className="form-group">
                            <textarea value={detail} onChange={this.handleInput} className="form-control" name="detail" placeholder="Detail" id="" rows="1"></textarea>
                        </div>
                        <div className='add-product-btn'>
                            <button type="submit" className="btn btn-primary add-product-btn">Update</button>
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