import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Username: '',
            Password: '',
            Desc: '',
            Gender: 1,
            Language: 'vi',
            Status: 'yes',
            ProgrammingLang: [],
            File: ''
        }

        this.onHandleChange = this.onHandleChange.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
    }

    onHandleChange(e) {
        var target = e.target;
        var name = target.name;
        // var value = (target.type === 'checkbox') ? this.state.ProgrammingLang.concat(target.value) : target.value;
        var value ; 
                    if (target.type === 'checkbox') {
                        if (target.checked) {
                            value = this.state.ProgrammingLang.concat(target.value)
                        } else {
                            this.state.ProgrammingLang.splice(this.state.ProgrammingLang.indexOf(target.value), 1)
                            value = this.state.ProgrammingLang
                        }
                    } else {
                        if(target.type === 'file') {
                            value = target.files
                        } else {value = target.value}
                    }
        this.setState({
            [name] : value
        })
    }

    onHandleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
    }

    render() {
        return(
            <div className = "container mt-50">
                <div className="row">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <div className="panel panel-info">
                            <div className="panel-heading">
                                <h3 className="panel-title">Form</h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit = {this.onHandleSubmit}>
                                    <legend>Infomation for Register</legend>
                                
                                    <div className="form-group">
                                        <label for="">Username:</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="phunghuutung.12b4@gamil.com" 
                                            name = "Username"
                                            onChange = {this.onHandleChange}
                                            required="required"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label for="">Password:</label>
                                        <input 
                                            type="password" 
                                            className="form-control"
                                            name = "Password"
                                            onChange = {this.onHandleChange}
                                            required="required"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label for="">Description:</label>
                                        <textarea 
                                            rows="3"
                                            className="form-control"
                                            name = "Desc"
                                            onChange = {this.onHandleChange}
                                            required="required"
                                        >
                                        </textarea>
                                    </div>

                                    <div className="form-group">
                                        <label>Gender:</label>
                                        <select 
                                            className="form-control"
                                            name = "Gender"
                                            onChange = {this.onHandleChange}
                                            required="required"
                                        >
                                            <option value={1}>Male</option>
                                            <option value={0}>Female</option>
                                        </select>
                                    </div>

                                    <label>Language</label>
                                    <div className="form-group">
                                        <label>
                                            <input 
                                                type="radio" 
                                                name = "Language"
                                                value = "vi"
                                                onChange = {this.onHandleChange}
                                                checked = {this.state.Language === 'vi'}

                                            />&nbsp;
                                            Vietnamese
                                        </label>
                                        <br/>
                                        <label>
                                            <input 
                                                type="radio" 
                                                name = "Language"
                                                value = "en"
                                                onChange = {this.onHandleChange}
                                            />&nbsp;
                                            English
                                        </label>
                                    </div>
                                    <hr/>

                                    <label>Have you learnt ReactJS yet?</label>
                                    <div className="form-group">
                                        <label>
                                            <input 
                                                type="radio" 
                                                name = "Status"
                                                value = "yes"
                                                onChange = {this.onHandleChange}
                                                checked = {this.state.Status === 'yes'}
                                            />&nbsp;
                                            Yes
                                        </label>
                                        <br/>
                                        <label>
                                            <input 
                                                type="radio" 
                                                name = "Status"
                                                value = "no"
                                                onChange = {this.onHandleChange}
                                            />&nbsp;
                                            No
                                        </label>
                                    </div>
                                    <hr/>

                                    <label>Programming Language</label>
                                    <div className="form-group">
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                name = "ProgrammingLang"
                                                value = "Javascipt"
                                                onChange = {this.onHandleChange}
                                            />&nbsp;
                                            Javascipt
                                        </label>
                                        <br/>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                name = "ProgrammingLang"
                                                value = "PHP"
                                                onChange = {this.onHandleChange}
                                            />&nbsp;
                                            PHP
                                        </label>
                                        <br/>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                name = "ProgrammingLang"
                                                value = "Ruby"
                                                onChange = {this.onHandleChange}
                                            />&nbsp;
                                            Ruby
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <label for="">ChooseFile:</label>
                                        <input 
                                            type="file" 
                                            className="form-control"
                                            name = "File"
                                            onChange = {this.onHandleChange}
                                            required = "required"
                                        />
                                    </div>

                                    <br/>
                                    
                                    <button type="submit" className="btn btn-success">Save</button>&nbsp;&nbsp;
                                    <button type="reset" className="btn btn-primary">Delete all</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
