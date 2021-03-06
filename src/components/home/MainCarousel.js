import React,{Component} from 'react'

import photo1 from '../../images/home/bookworld_home_1.jpg'
import photo2 from '../../images/home/bookworld_home_2.jpg'
import photo3 from '../../images/home/bookworld_home_3.jpg'

class MainCarousel extends Component{
    render(){
        return(

            //MAIN CAROUSEL AT HOMEPAGE
            <div>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    {/* CAROUSEL INDEX INDICATOR */}
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>

                    {/* IMAGE INSIDE CAROUSEL */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={photo1} alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={photo2} alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={photo3} alt="Third slide"/>
                        </div>
                    </div>

                    {/* CAROUSEL BUTTONS */}
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
            </div>
        )
    }
}

export default MainCarousel