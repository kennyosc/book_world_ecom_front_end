import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {registerButton} from '../../actions/index.js'

import background_image from '../../images/background/register_background.jpg'
import Footer from '../Footer'
import Header from '../headers/Header.js'

// SETTING UP BACKGROUND IMAGE
const background_style={
    backgroundImage:`linear-gradient(rgba(0,0,0,0.03),rgba(0,0,0,0.03)),url(${background_image})`,
    backgroundSize:'cover',
    position: "absolute"
}

class Register extends Component{

    componentDidMount(){
        window.scrollTo(0,0)
    }

    handleRegister = () =>{
        const firstName = this.firstName.value
        const lastName = this.lastName.value
        const username = this.username.value
        const email = this.email.value
        const gender = this.gender.value
        const phoneNumber = this.phoneNumber.value
        const password = this.password.value
        const passwordConfirmation = this.passwordConfirmation.value

        console.log(password)
        console.log(passwordConfirmation)

        registerButton(firstName,lastName,username,email,gender,phoneNumber,password,passwordConfirmation)
    }

    render(){
        if(this.props.user.id !== ''){
            return(
                <Redirect to ='/'/>
            )
        }else{
            return(
                <div>
                    <Header/>
                    {/* REGISTER CARD */}
                    <div style={background_style} >
                        <div className="card w-50" style={{height:'600px', margin:'60px auto 175px auto',borderRadius:"15px"}}>
                            <h3 className="card-header">Register</h3>
                            <div className="card-body">
                                
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder='*First Name' ref={(firstName) => {this.firstName = firstName}}/>
                                    <input type="text" className="form-control" placeholder='Last Name' ref={(lastName) => {this.lastName = lastName}}/>
                                </div>
    
                                
                                <form className='input-group my-3'>
                                    <input className='form-control' placeholder='*Username'
                                    ref={(username) => {this.username = username}}></input>
                                </form>
    
                                
                                <form className='input-group'>
                                    <input className='form-control' placeholder='*Email' type="email"
                                    ref={(email) => {this.email = email}}></input>
                                </form>
    
                                
                                <form className='input-group my-3'>
                                    <input className='form-control' placeholder='Phone Number'
                                    ref={(phoneNumber) => {this.phoneNumber = phoneNumber}}></input>
                                </form>
                                
                                <div class="input-group mb-3">
                                    <select ref={gender => this.gender = gender} class="custom-select" id="inputGroupSelect01">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                
                                <form className='input-group'>
                                    <input className='form-control' type="password" placeholder='*Password'
                                    ref={(password) => {this.password = password}}></input>
                                </form>
    
                                <form className='input-group my-3'>
                                    <input className='form-control w-100' type="password" placeholder='*Password Confirmation'
                                    ref={(input) => {this.passwordConfirmation = input}}></input>
                                    <small id="passwordHelpBlock" class="form-text text-muted mt-3">
                                        Your password must be more than 8 characters long, and must not contain spaces, special characters, or emoji
                                    </small>
                                </form>
                                
                                <button className='btn btn-success mt-3' onClick={this.handleRegister}>Register</button>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <Footer/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        user:state.auth
    }
}

export default connect(mapStateToProps)(Register)