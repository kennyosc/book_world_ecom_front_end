import React,{Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {keepLogin, keepLogin_admin} from '../actions/index.js'
import {connect} from 'react-redux'

import SearchProducts from './allproducts/SearchProducts'

import Home from './home/Home'
import Register from './auth/Register.js'
import Login from './auth/Login.js'
import AllProducts from './allproducts/AllProducts.js'
import Profile from './profile/Profile.js'
import EditProfile from './profile/EditProfile.js'
import ChangePassword from './profile/ChangePassword.js'
import Inbox from './profile/Inbox.js'
import ChangeAvatar from './profile/ChangeAvatar.js'
import UserOrders from './profile/UserOrders.js'
import Wishlist from './profile/Wishlist'

import LoginAdmin from './admin/AdminLogin.js'
import Admin from './admin/Admin.js'
import ManageProducts from './admin/manageproducts/ManageProducts.js'
import ManageCategories from './admin/manageproducts/ManageCategories.js'
import AddProduct from './admin/manageproducts/AddProduct.js'
import EditProduct from './admin/manageproducts/EditProduct.js'
import ManagePeople from './admin/people/ManagePeople.js'
import ManageAdmin from './admin/people/ManageAdmin.js'
import ManageOrders from './admin/manageorders/ManageOrders.js'
import PaymentProof from './admin/manageorders/PaymentProof.js'
import ManageCoupons from './admin/managecoupons/ManageCoupons.js'

import ProductDetails from './allproducts/ProductDetails'
import Cart from './order/Cart'
import Shipment from './order/Shipment'

const cookie = new cookies()

class App extends Component{

    componentWillMount(){
        const objCookie_user = cookie.get('user')
        const objCookie_admin = cookie.get('admin')
        console.log(objCookie_user)
        console.log(objCookie_admin)

        if(objCookie_user !== undefined){
            this.props.keepLogin(objCookie_user)
        }

        if(objCookie_admin !== undefined){
            this.props.keepLogin_admin(objCookie_admin)
        }
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                        <Route path='/' exact component={Home}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/allproduct' component={AllProducts}/>
                        <Route path='/search/:search' component={SearchProducts}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/editprofile' component={EditProfile}/>
                        <Route path='/changepassword' component={ChangePassword}/>
                        <Route path='/inbox' component={Inbox}/>
                        <Route path='/changeavatar' component={ChangeAvatar}/>
                        <Route path='/wishlist' component={Wishlist}/>
                        <Route path='/orders' component={UserOrders}/>
                        <Route path='/productdetails/:product_id' component={ProductDetails}/>
                        <Route path='/cart' component={Cart}/>
                        <Route path='/shipment' component={Shipment}/>
                </div>
                <div>
                        <Route path='/login-admin' component={LoginAdmin}/>
                        <Route path='/admin' exact component={Admin}/>
                        <Route path='/admin/manageproducts' component={ManageProducts}/>
                        <Route path='/admin/managecategories' component={ManageCategories}/>
                        <Route path='/admin/addproduct' component={AddProduct}/>
                        <Route path='/admin/editproduct/:product_id' component={EditProduct}/>
                        <Route path='/admin/managepeople' component={ManagePeople}/>
                        <Route path='/admin/manageadmin' component={ManageAdmin}/>
                        <Route path='/admin/manageorders' component={ManageOrders}/>
                        <Route path='/admin/paymentproof/:imagename' component={PaymentProof}/>
                        <Route path='/admin/managecoupons' component={ManageCoupons}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null,{keepLogin, keepLogin_admin})(App)