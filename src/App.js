import React, { Component } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MenuLeft from './components/layout/MenuLeft';
import MenuLeftAcc from './components/account/MenuLeftAcc';
import { Outlet, withRouter } from 'react-router-dom';
import { MyProvider } from './components/MyProvider';

class App extends Component {
    renderChildrenComponent(props) {
        if (props.location.pathname.includes('account')) {
            return (
                <React.Fragment>
                    <MenuLeftAcc />
                    {this.props.children}
                </React.Fragment>
            )
        } else if (props.location.pathname.includes('cart')) {
            return (
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <MenuLeft />
                    {this.props.children}
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <MyProvider>
                <div className="App">
                    <Header />
                    {/* <Outlet /> */}
                    <div className='container'>
                        <div className='row'>
                            {this.renderChildrenComponent(this.props)}
                        </div>
                    </div>
                    <Footer />
                </div>
            </MyProvider>
        );
    }
}

export default withRouter(App);