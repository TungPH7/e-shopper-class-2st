import React, { Component } from 'react';

class LoginErrorForm extends Component {

    showLoginError(loginErrorForm) {
        if (Object.keys(loginErrorForm).length > 0) {
            return Object.keys(loginErrorForm).map((value, i) => {
                return (
                    <p key={i}>
                        {loginErrorForm[value]}
                    </p>
                )
            })
        }
    }

    render() {
        let { loginErrorForm } = this.props
        return (
            <div>
                {this.showLoginError(loginErrorForm)}
            </div>
        );
    }
}

export default LoginErrorForm;