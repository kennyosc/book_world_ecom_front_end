import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from '../../../config/axios.js'

import AdminHeader from '../../headers/AdminHeader'

class ManageCategories extends Component{

    state={
        categories:[],
        genres:[]
    }

    componentDidMount(){
        //get product categories
        axios.get('/productcategories').then(res=>{
            this.setState({categories:res.data})
        })

        //get product genres
        axios.get('/productgenres').then(res=>{
            this.setState({genres:res.data})
        })
    }

    renderAll = () =>{
        //get product categories
        axios.get('/productcategories').then(res=>{
            this.setState({categories:res.data})
        })

        //get product genres
        axios.get('/productgenres').then(res=>{
            this.setState({genres:res.data})
        })
    }

    handleDeleteCategory = (id) =>{
        axios.delete(`/deletecategory/${id}`).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    handleDeleteGenre = (id) =>{
        axios.delete(`/deletegenre/${id}`).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    renderCategories = () =>{
        var hasil = this.state.categories.map((val,index)=>{
            return(
                <tr>
                    <th className='border-right'scope="row">{index+1}</th>
                    <td>{val.category}</td>
                    <td><button className='btn btn-outline-success btn-sm mx-2'>Edit</button><button onClick={()=>this.handleDeleteCategory(val.id)} className='btn btn-outline-danger btn-sm'>Delete</button></td>
                </tr>
                
            )
        })
        return hasil
    }

    renderGenres = () =>{
        var hasil = this.state.genres.map((val,index)=>{
            return(
                <tr>
                    <th className='border-right'scope="row">{index+1}</th>
                    <td>{val.genre}</td>
                    <td><button className='btn btn-outline-success btn-sm mx-2'>Edit</button><button onClick={()=>this.handleDeleteGenre(val.id)} className='btn btn-outline-danger btn-sm'>Delete</button></td>
                </tr>
            )
        })
        return hasil
    }

    handleNewCategory = (event) =>{
        event.preventDefault()
        const category = this.category.value

        axios.post('/addcategory',{category}).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    handleNewGenre = (event) =>{
        event.preventDefault()
        const genre = this.genre.value

        axios.post('/addgenre',{genre}).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    render(){
        return(
            <div>
                <AdminHeader/>
                <div className='container'>
                    <div class="card text-center mt-3">

                        <div class="card-header">
                            <ul class="nav nav-tabs card-header-tabs">
                                <li class="nav-item">
                                    <Link style={{color:'black'}} to='/admin/manageproducts'>
                                        <a class="nav-link" href="#">Manage Products</a>
                                    </Link>
                                </li>

                                <li class="nav-item">
                                    <Link style={{color:'black', textDecoration:'none'}} to='/admin/managecategories'>
                                        <a class="nav-link active" href="#">Manage Categories</a>
                                    </Link>
                                </li>

                                <li class="nav-item">
                                    <Link style={{color:'black'}} to='/admin/addproduct'>
                                        <a class="nav-link" href="#">Add Product</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div class="card-body">
                            {/* INPUT NEW CATEGORY AND GENRE */}
                            <h5 className="card-title">Add New</h5>

                            <div style={{marginLeft:'30%'}} className='mb-5'>
                                <form class="form-inline">
                                    <div class="form-group mx-sm-3 mb-2">
                                        <input ref={input=>this.category=input} type="text" class="form-control" placeholder='Insert New Category'/>
                                    </div>
                                    <button class="btn btn-primary mb-2 display-inline" onClick={this.handleNewCategory}>Add Category</button>
                                </form>

                                <form class="form-inline">
                                    <div class="form-group mx-sm-3 mb-2">
                                        <input ref={input=>this.genre=input} type="text" class="form-control" placeholder="Insert New Genre"/>
                                    </div>
                                    <button class="btn btn-primary mb-2" onClick={this.handleNewGenre}>Add Genre</button>
                                </form>
                            </div>
                            

                            <div className='row'>
                                <div className='col-sm-12 col-md-6'>
                                    <h5 className="card-title">Categories</h5>

                                    <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Id</th>
                                        <th className='w-50' scope="col">Category Name</th>
                                        <th className='w-100' scope="col">Edit / Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderCategories()}
                                        
                                    </tbody>
                                    </table>
                                </div>

                                <div className='col-sm-12 col-md-6'>
                                    <h5 className="card-title">Genres</h5>

                                    <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Id</th>
                                        <th className='w-50' scope="col">Genre Name</th>
                                        <th className='w-100' scope="col">Edit / Delete</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderGenres()}
                                        
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ManageCategories