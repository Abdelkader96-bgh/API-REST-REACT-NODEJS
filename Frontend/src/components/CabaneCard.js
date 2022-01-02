import React from 'react'
import { Link } from "react-router-dom";

const CabaneCard = ({cabane,deleteCabane}) => {
    return (
        <div className="col-md-4 my-2">
         <div className="card" >
            <img className="card-img-top" src={cabane.imageUrl}/>
                <div className="card-body">
                    <h5 className="card-title">{cabane.name}</h5>
                    <p className="card-text">{cabane.description}</p>
                     
                   <div className="d-flex">
                     <button className="btn btn-light" onClick={() => deleteCabane(cabane._id)} >
                         <i className="fas fa-trash-alt text-danger"></i>
                     </button>
                     <Link className="btn btn-light ml-4" to={`/edit/`+cabane._id}>
                           <i className="fas fa-edit text-primary"></i>
                       </Link>
                   </div>
            </div>
        </div>
        </div>
    )
}

export default CabaneCard
