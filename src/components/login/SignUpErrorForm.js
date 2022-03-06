import React, { Component } from 'react';

class SignUpErrorForm extends Component {

    showSignUpError(signUpErrorForm) {
        if(Object.keys(signUpErrorForm).length > 0) {
            return Object.keys(signUpErrorForm).map((value, i) => {
                return (
                    <p key={i}>
                        {signUpErrorForm[value]}
                    </p>
                )
            })
        }
    }

    render() {
        let { signUpErrorForm } = this.props
        return (
            <div>
                {this.showSignUpError(signUpErrorForm)}
            </div>
        );
    }
}

export default SignUpErrorForm;