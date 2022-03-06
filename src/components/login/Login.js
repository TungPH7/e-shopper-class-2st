import React, { Component } from 'react';
import SignUpErrorForm from './SignUpErrorForm';
import LoginErrorForm from './LoginErrorForm';
import Redirect from './Redirect';
import axios from 'axios';
import { MyContext } from '../MyProvider';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            emailLogin: '',
            rememberLogin: false,
            passwordLogin: '',
            password: '',
            phone: '',
            address: '',
            level: 0,
            file: '',
            avatar: '',
            imgFileFormat: ['jpg', 'jpeg', 'png'],
            loginErrorForm: {},
            signUpErrorForm: {},
            isLoginSuccess: false
        }

        this.handleInput = this.handleInput.bind(this)
        this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this)
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
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
            // console.log(target.files)
        }
    }

    handleSubmitSignUp(e) {
        e.preventDefault();
        let { name, email, password, phone, address, level, file, avatar, imgFileFormat } = this.state
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
            allValid = false
            tempoErrorForm.file = 'Vui lòng chọn file ảnh và có kích thước nhơ hơn 2Mb'
        }

        if (!allValid) {
            this.setState({
                signUpErrorForm: tempoErrorForm
            })
        } else {
            // Thực hiện gọi API để SignUp cho User
            this.setState({
                signUpErrorForm: {}
            })

            axios({
                method: 'POST',
                url: 'http://localhost/laravel/laravel/public/api/register',
                data: {
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    address: address,
                    level: level,
                    file: file,
                    avatar: avatar
                }
            }).then(res => {
                // console.log(res)
            }).catch(err => {
                // console.log(err)
            })

        }

    }

    handleSubmitLogin(e, context) {
        e.preventDefault()
        // console.log(this.props)
        let { passwordLogin, emailLogin, rememberLogin } = this.state
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let tempoErrorForm = {}
        let allValid = true

        if (!(regex.test(emailLogin))) {
            allValid = false
            tempoErrorForm.emailLogin = 'Email không hợp lệ'
        } else {
            delete tempoErrorForm.emailLogin
        }

        if (!passwordLogin) {
            allValid = false
            tempoErrorForm.password = 'Vui lòng nhập mật khẩu'
        } else {
            delete tempoErrorForm.password
        }

        if (!allValid) {
            this.setState({
                loginErrorForm: tempoErrorForm
            })
        } else {
            this.setState({
                loginErrorForm: {}
            })

            axios({
                method: 'POST',
                url: 'http://localhost/laravel/laravel/public/api/login',
                data: {
                    email: emailLogin,
                    password: passwordLogin,
                    rememberLogin: rememberLogin
                }
            }).then(res => {
                if (res.data.response === "success") {
                    // Thay đổi login status trong context
                    context.setIsLogin(true)
                    // console.log(res.data)

                    let userAuthInfo = {
                        id: res.data.Auth.id,
                        name: res.data.Auth.name,
                        email: res.data.Auth.email,
                        password: passwordLogin,
                        phone: res.data.Auth.phone,
                        address: res.data.Auth.address,
                        level: res.data.Auth.level,
                        avatar: res.data.Auth.avatar,
                        token: res.data.success.token
                    }
                    localStorage.setItem('isLogin', JSON.stringify(true))
                    localStorage.setItem('userAuthInfo', JSON.stringify(userAuthInfo))

                    this.props.history.goBack()
                }
            }).catch(err => {
                // console.log(err)
            })
        }
    }

    render() {
        let { name, email, emailLogin, rememberLogin, password, passwordLogin, phone, address, level, signUpErrorForm, loginErrorForm, isLoginSuccess } = this.state
        return (
            <React.Fragment >
                {/*form*/}
                <section id="form" className="col-sm-9" >
                    <div className="row">
                        <div className="col-sm-4 col-sm-offset-1">
                            <MyContext.Consumer>
                                {(context) => (
                                    <React.Fragment>
                                        <div className="login-form">{/*login form*/}
                                            <h2>Login to your account</h2>
                                            <form >
                                                <input type="email" name="emailLogin" value={emailLogin} onChange={this.handleInput} placeholder="Email Address" />
                                                <input type="password" name="passwordLogin" value={passwordLogin} onChange={this.handleInput} placeholder="Password" />
                                                <span>
                                                    <input type="checkbox" name="rememberLogin" checked={rememberLogin} onChange={this.handleInput} className="checkbox" />
                                                    Keep me signed in
                                                </span>
                                                <button type="button" onClick={(e) => { this.handleSubmitLogin(e, context) }} className="btn btn-default">Login</button>
                                            </form>
                                        </div>
                                    </React.Fragment>
                                )}
                            </MyContext.Consumer>
                            <br />
                            <LoginErrorForm loginErrorForm={loginErrorForm} />
                        </div>
                        <div className="col-sm-1">
                            <h2 className="or">OR</h2>
                        </div>
                        <div className="col-sm-4">
                            <div className="signup-form">{/*sign up form*/}
                                <h2>New User Signup!</h2>
                                <form onSubmit={this.handleSubmitSignUp} encType="multipart/form-data">
                                    <input type="text" name='name' value={name} onChange={this.handleInput} placeholder="Name" />
                                    <input type="email" name='email' value={email} onChange={this.handleInput} placeholder="Email Address" />
                                    <input type="password" name='password' value={password} onChange={this.handleInput} placeholder="Password" />
                                    <input type="number" name='phone' value={phone} onChange={this.handleInput} placeholder="Phone" />
                                    <input type="text" name='address' value={address} onChange={this.handleInput} placeholder="Address" />
                                    <input type="number" name='level' value={level} onChange={this.handleInput} placeholder="Level (1: admin, 0: member)" />
                                    <input type="file" name='file' onChange={this.handleInput} />
                                    <button type="submit" className="btn btn-default">Signup</button>
                                </form>
                            </div>{/*/sign up form*/}
                            <br />
                            <SignUpErrorForm signUpErrorForm={signUpErrorForm} />
                        </div>
                    </div>
                </section>
            </React.Fragment >
        );
    }
}

export default Login;