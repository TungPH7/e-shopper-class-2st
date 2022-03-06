import React, { Component, createContext } from 'react';

const MyContext = createContext()

class MyProvider extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            isLogin: false,
            setIsLogin: (newIsLogin) => {
                this.setState({
                    isLogin: newIsLogin
                })
            },
            cartQty: 0,
            setCartQty: (newCartQty) => {
                this.setState({
                    cartQty: newCartQty
                })
            }
        }
    }

    componentDidMount() {
        let isLogin = JSON.parse(localStorage.getItem('isLogin'))
        let cartQty = JSON.parse(localStorage.getItem('cartQty'))
        if (isLogin) {
            this.setState({
                isLogin
            })
        }
        if (cartQty) {
            this.setState({
                cartQty
            })
        }
    }
    
    render() {
        return (
            <MyContext.Provider value={this.state}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export { MyProvider, MyContext }