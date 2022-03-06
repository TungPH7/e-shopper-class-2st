import React, { Component } from 'react';

class ErrorForm extends Component {
    showSignUpError(errorForm) {
        let errorFormList = Object.values(errorForm)
        return errorFormList.map((error, i) => {
            return (
                <p key={i}>
                    {error}
                </p>
            )
        })
    }

    render() {
        let {errorForm} = this.props

        return (
            <div>
                {this.showSignUpError(errorForm)}
            </div>
        );
    }
}

export default ErrorForm;