import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import axios from '../../../config/axios.js'
import Swal from 'sweetalert2'

import AdminHeader from '../../headers/AdminHeader'
import blank_avatar from '../../../images/profile/blank_profile_picture.png'

class EditProduct extends Component{

    state={
        editProduct:[],
        categories:[],
        genres:[]
    }

    componentDidMount(){
        var product_id = this.props.match.params.product_id

        //get product categories
        axios.get('/productcategories').then(res=>{
            this.setState({categories:res.data})
        })

        //get product genres
        axios.get('/productgenres').then(res=>{
            this.setState({genres:res.data})
        })

        //get product per id for edit
        axios.get('/productcategory/' + product_id).then(res=>{
            this.setState({editProduct:res.data})
        })
    }

    renderProductEdit = () =>{
        var product_id = this.props.match.params.product_id
        axios.get('/productcategory/' + product_id).then(res=>{
            this.setState({editProduct:res.data})
        })
    }

    renderCategories = () =>{
        var hasil = this.state.categories.map(val=>{
            return(
            <option value={val.id}>{val.category}</option>
            )
        })

        return hasil
    }

    renderGenres = () =>{
        var hasil = this.state.genres.map(val=>{
            return(
                <option value={val.id}>{val.genre}</option>
            )
        })
        return hasil
    }

    handleChangeProductPict = () =>{
        const product_id = this.props.match.params.product_id
        const productImage = this.productImage.files[0]
        const formData = new FormData()

        formData.append('productImage',productImage)

        axios.patch('/editproductimage/' + product_id,formData).then(res=>{
            console.log(res)
            this.renderProductEdit()
        })

    }

    handleEditProduct = (event) =>{
        event.preventDefault()

        const product_id = this.props.match.params.product_id
        const productName = this.productName.value
        const productPrice = this.price.value
        const stock = this.stock.value
        const productDesc = this.productDescription.value
        const productCategoryId = this.category.value
        const genreId = this.genre.value
        const author = this.author.value
        const published = this.published.value
        const weight = this.weight.value

        axios.patch(`/editproduct/${product_id}`,
            {
                name: productName,
                description: productDesc,
                price: productPrice,
                stock: stock,
                weight: weight,
                published: published,
                author:author,
                category_id : productCategoryId,
                genre_id : genreId
            }
        ).then(res=>{
            console.log(res)
            if(res.data.affectedRows){
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Product Edited!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.renderProductEdit()
            }
        })
    }

    render(){
        const book = this.state.editProduct
        console.log(book)
        
        if(this.props.admin.id === ''){
            return(
                <Redirect to ='/login-admin'/>
            )
        }else{
            return(
                <div>
                    <AdminHeader/>
                    <div className='container'>
                        <div className="card my-3 mb-5">

                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <Link style={{color:'black'}} to='/admin/manageproducts'>
                                            <a className="nav-link" href="#">Manage Products</a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link style={{color:'black'}} to='/admin/managecategories'>
                                            <a className="nav-link" href="#">Manage Categories</a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link style={{color:'black', textDecoration:'none'}} to='/admin/addproduct'>
                                            <a className="nav-link" href="#">Add Product</a>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                            <a className="nav-link active" href="#">Edit Product</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">{book.name}</h5>

                                <img style={{width:'20%'}}className='d-block img-thumbnail' src={`http://localhost:2019/geteditproductimage/${book.photo}`} alt="Profile Picture"/>

                                <form>
                                    <div class="form-group">
                                        <label for="exampleFormControlFile1">Product Image</label>
                                        <input onChange={this.handleChangeProductPict} type="file" class="form-control-file" id="exampleFormControlFile1" ref={input => this.productImage = input}/>
                                    </div>
                                </form>

                                <form>
                                <div className="form-group">
                                    <label for="exampleFormControlInput1">Product Name</label>
                                    <input  type="text" className="form-control w-100" id="exampleFormControlInput1" defaultValue={book.name} ref={(productName) => {this.productName = productName}}/>
                                    <small className="form-text text-muted mt-3">
                                        Product name must be less than 30 characters
                                    </small>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="inputEmail4">Price</label>
                                        <input type="number" min='1' className="form-control" id="inputEmail4" placeholder='Rp' defaultValue={book.price} ref={input => this.price = input}/>
                                        <small className="form-text text-muted mt-3">
                                        Input only number
                                        {/*  <p className='card-text'>Rp{price.toLocaleString('IN')},-</p> */}
                                        </small>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="inputPassword4">Stock</label>
                                        <input type="number" min='1' className="form-control" id="inputPassword4" placeholder="Min 1" defaultValue={book.stock} ref={input => this.stock = input}/>
                                        <small className="form-text text-muted mt-3">
                                        Minimum 1 product in stock
                                        </small>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label for="exampleFormControlTextarea1">Product Description</label>
                                    <input type='text' className="form-control" id="exampleFormControlTextarea1" defaultValue={book.description} ref={input => this.productDescription = input}/>
                                </div>

                                <div className="form-row">
                                    
                                
                                    <div className="form-group col-md-4">
                                        <label for="inputState">Product Category</label>
                                        <select id="inputState" className="form-control" defaultValue={book.category} ref={input => this.category = input}>
                                            <option value={book.category_id} selected>--{book.category}</option>
                                            {this.renderCategories()}
                                        </select>
                                    </div>
                                

                                    <div className="form-group col-md-4">
                                        <label for="inputState">Genre</label>
                                        <select id="inputState" className="form-control" defaultValue={book.genre} ref={input => this.genre = input}>
                                            <option value={book.genre_id} selected>--{book.genre}</option>
                                            {this.renderGenres()}
                                        </select>
                                    </div>
                                </div>

                                <div className='form-row'>
                                    <div className="form-groupcol-md-4">
                                        <label for="inputPassword4">Author</label>
                                        <input type="text" className="form-control"  placeholder="Author Name" defaultValue={book.author} ref={input => this.author = input}/>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label for="inputPassword4">Published</label>
                                        <input type="text" className="form-control"  placeholder="2018" defaultValue={book.published} ref={input => this.published = input}/>
                                    </div> 
                                </div>
                                

                                <div className="form-group w-25">
                                    <label for="inputPassword4">Weight</label>
                                    <input type="number" step='0.1' min='1' className="form-control" id="inputPassword4" placeholder="Kg" defaultValue={book.weight} ref={input => this.weight = input}/>
                                    <small className="form-text text-muted mt-3">
                                        Default weight is 1 kg
                                    </small>
                                </div>
                                    
                                    <button className='btn btn-primary mt-5 btn-block' onClick={this.handleEditProduct}>Edit Product</button>

                                </form>                            
                                

                            </div>

                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        admin : state.admin_auth
    }
}

export default connect(mapStateToProps)(EditProduct)