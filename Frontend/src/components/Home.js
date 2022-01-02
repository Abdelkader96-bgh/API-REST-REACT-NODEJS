import React ,{ useState, useEffect }from 'react'
import CabaneCard  from './CabaneCard';
import axios from "axios";
import { Link } from "react-router-dom";

// récupération des donnes 

export const Home = () => {
     let [cabanes, setCabanes] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/cabanes")
      .then((res) => {
        console.log(res.data);
        setCabanes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //suppression du cabane 
  const deleteCabane=(id)=>{
      console.log("del: "+id)
      let array=cabanes.filter(cabane=>cabane._id !== id);
          axios
      .delete("http://localhost:4000/cabane/"+id)
      .then((res) => {
         setCabanes(array);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }
    return (
        <div className="container" >
              <div className="d-flex justify-content-end my-3">
                <Link className="btn btn-primary" to={`/add`}>
                   <i className="fas fa-plus"></i>
                    Ajouter une cabane
                </Link>
              </div>
             {
                cabanes && cabanes.length ? (
                <div className="row">
                      {cabanes.map((cabane) => (
                          <CabaneCard key={cabane.id} 
                          deleteCabane={deleteCabane}
                          cabane={cabane} />
                      ))}
                </div>
                ):
                (
                   <div className="text-danger">
                       Loading
                   </div>
                )
            }
            
        </div>
    )
}
