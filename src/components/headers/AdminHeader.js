import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class AdminHeader extends Component{

    handleLogout = () =>{

    }

    render(){
        return(
            // NAVBAR AFTER LOGIN
            <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
                <Link to='/admin'>
                    <a className="navbar-brand" href="#">Admin Book World</a>
                </Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                            <Link to='/admin/people'>
                                <a className="nav-link" href="#">People<span className="sr-only">(current)</span></a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/admin/manageproduct'>
                                <a className="nav-link" href="#">Manage Product</a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/admin/orders'>
                                <a className="nav-link" href="#">Manage Orders</a>
                            </Link>
                        </li>
                    
                    </ul>
                    
                    <ul className ='navbar-nav'>
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Hello @{this.props.admin.username}</a>
                        </li>
                    </ul>
                        <button className='btn btn-outline-danger' onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i></button>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        admin:state.admin_auth
    }
}

export default connect(mapStateToProps)(AdminHeader)