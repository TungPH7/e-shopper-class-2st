import React, { Component } from 'react';
import EditErrorForm from './EditErrorForm';
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userId: '',
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            file: '',
            avatar: '',
            imgFileFormat: ['jpg', 'jpeg', 'png'],
            updateErrorForm: {},
            token: ''
        }

        this.handleInput = this.handleInput.bind(this)
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this)
    }

    componentDidMount() {
        const userAuthInfo = JSON.parse(localStorage.getItem('userAuthInfo'))
        this.setState({
            userId: userAuthInfo.id,
            name: userAuthInfo.name,
            email: userAuthInfo.email,
            password: userAuthInfo.password,
            phone: userAuthInfo.phone,
            address: userAuthInfo.address,
            avatar: userAuthInfo.avatar,
            token: userAuthInfo.token
        })
    }

    handleInput(e) {
        let target = e.target
        let name = target.name
        let value = ''
        if (target.type === 'checkbox') {
            value = target.checked
        } else if (target.type === 'file') {
            value = target.files[0]
        } else {
            value = target.value
        }
        this.setState({
            [name]: value
        })

        if (target.files) {
            let reader = new FileReader()
            reader.onload = (e) => {
                this.setState({
                    avatar: e.target.result,
                    file: target.files[0]
                })
            }
            reader.readAsDataURL(target.files[0])
        }
    }

    handleSubmitUpdate(e) {
        e.preventDefault();
        let { userId, name, email, password, phone, address, file, avatar, imgFileFormat, token } = this.state
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let tempoErrorForm = {}
        let allValid = true

        if (!name) {
            allValid = false
            tempoErrorForm.name = 'Vui lòng nhập tên'
        } else {
            delete tempoErrorForm.name
        }

        if (!(regex.test(email))) {
            allValid = false
            tempoErrorForm.email = 'Email không đúng định dạng'
        } else {
            delete tempoErrorForm.email
        }

        if (!password) {
            allValid = false
            tempoErrorForm.password = 'Vui lòng nhập mật khẩu'
        } else {
            delete tempoErrorForm.password
        }

        if (phone === '' || phone.length < 10) {
            allValid = false
            tempoErrorForm.phone = 'Vui lòng nhập số điện thoại'
        } else {
            delete tempoErrorForm.phone
        }

        if (!address) {
            allValid = false
            tempoErrorForm.address = 'Vui lòng nhập địa chỉ'
        } else {
            delete tempoErrorForm.address
        }

        if (file) {
            let fileFormatReceive = file.name.split('.')[file.name.split('.').length - 1]
            let isPhoto = imgFileFormat.some((fileFormat, i) => {
                return fileFormat === fileFormatReceive
            })
            let fileSize = file.size

            if (!isPhoto || fileSize > 1024 * 1024) {
                allValid = false
                tempoErrorForm.file = 'Vui lòng chọn file ảnh và có kích thước nhơ hơn 2Mb'
            } else {
                delete tempoErrorForm.file
            }
        } else {
            // allValid = false
            tempoErrorForm.file = 'Vui lòng chọn file ảnh và có kích thước nhơ hơn 2Mb'
        }

        if (!allValid) {
            this.setState({
                updateErrorForm: tempoErrorForm
            })
        } else {
            // Thực hiện gọi API để Update cho User
            this.setState({
                updateErrorForm: {}
            })

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('address', address);
            formData.append('phone', phone);
            // formData.append('avatar', avatar);

            axios({
                method: 'POST',
                url: 'http://localhost/laravel/laravel/public/api/user/update/' + userId,
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })

        }

    }
    
    render() {
        let { 
                name, 
                email, 
                password, 
                phone, 
                address,
                file,
                updateErrorForm,
            } 
            = this.state
        return (
            <section id="form" className="col-sm-9" >
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="signup-form">{/*sign up form*/}
                                <h2>Update Your Acc!</h2>
                                <form onSubmit={this.handleSubmitUpdate} encType="multipart/form-data">
                                    <input type="text" name='name' value={name} onChange={this.handleInput} placeholder="Name" />
                                    <input type="email" name='email' value={email} onChange={this.handleInput} readOnly placeholder="Email Address" />
                                    <input type="number" name='phone' value={phone} onChange={this.handleInput} placeholder="Phone" />
                                    <input type="text" name='address' value={address} onChange={this.handleInput} placeholder="Address" />
                                    <input type="file" name='file' value={file} onChange={this.handleInput} />
                                    <button type="submit" className="btn btn-default">Signup</button>
                                </form>
                            </div>{/*/sign up form*/}
                            <br />
                            <EditErrorForm updateErrorForm={updateErrorForm} />
                        </div>
                    </div>
                </section>
        );
    }
}

export default Edit;