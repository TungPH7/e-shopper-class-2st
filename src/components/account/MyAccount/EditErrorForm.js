import React, { Component } from 'react';

class EditErrorForm extends Component {
    showUpdateError(updateErrorForm) {
        if(Object.keys(updateErrorForm).length > 0) {
            return Object.keys(updateErrorForm).map((value, i) => {
                return (
                    <p key={i}>
                        {updateErrorForm[value]}
                    </p>
                )
            })
        }
    }
    render() {
        let { updateErrorForm } = this.props
        return (
            <div>
                {this.showUpdateError(updateErrorForm)}
            </div>
        );
    }
}

export default EditErrorForm;