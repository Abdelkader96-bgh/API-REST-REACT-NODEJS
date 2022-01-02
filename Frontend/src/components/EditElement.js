import React,{ useState, useEffect  } from 'react'
import axios from "axios";
import {  useParams,useNavigate  } from "react-router-dom";

export const EditElement = (props) => {
    
   const navigate = useNavigate();
   let [categories, setCategories] = useState([]);
   let params = useParams();
   let cabaneId =params.id;
   const [fields, setFields] = useState({});
   const onChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

   useEffect(() => {
     if(cabaneId){
          axios
      .get("http://localhost:4000/cabane/"+cabaneId)
      .then((res) => {
        console.log(res.data);
       setFields(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
     }
  }, []);


  //l'envoie de la page soit dans le cas de modification soit dans l'ajout
   const onSubmit = (e) => {
       e.preventDefault();
    
    
       if(cabaneId){
            axios
            .put("http://localhost:4000/cabane/" + cabaneId, fields)
            .then((response) => {
                console.log(response.data);
                navigate('/');
            })
            .catch((err) => {});
       }else{
          
           axios
            .post("http://localhost:4000/new/cabane", fields)
            .then((response) => {
                console.log(response.data);
                navigate('/');
            })
            .catch((err) => {});

       }
   }

    return (
        <div>
                <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-header">
                        {
                            cabaneId ? (<h1 className="text-success">Edition de la cabane</h1>):
                            (<h1 className="text-primary">Ajout d'une cabane</h1>)
                        }
                        
                    </div>
                    <div class="card-body">
                        <form onSubmit={onSubmit} >
                          
                            <div class="form-group">
                                <label for="">Nom de Cabane</label>
                                <input 
                                  value={fields.name}
                                 onChange={onChange} type="text" name="name" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="type">Categorie de la Cabane</label>
                                <select name="categorie"  onChange={onChange}  className="form-control">
                                    {
                                        categories && categories.map(category => 
                                            (<option key={category._id} value={category._id}>{category.name}</option>)    
                                        )
                                    }
                                </select>
                            </div><br/>
                            <div class="form-group">
                                <label for="">Prix de la cabane: </label>
                                <input value={fields.price} type="number"  onChange={onChange} name="price" class="form-control"/>
                            </div>
                             <div class="form-group">
                                <label for="">Description de la cabane: </label>
                                <textarea name="description" value={fields.description}   onChange={onChange} class="form-control" ></textarea>
                            </div><br/>

                            <div class="form-group">
                                <label for="">Lien vers l'image: </label>
                                <input value={fields.imageUrl}  type="text"   onChange={onChange} name="imageUrl" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="">Nom du partenaire: </label>
                                <input type="text"  value={fields.partner}  onChange={onChange} name="partner" class="form-control"/>
                            </div>

                            <div class="form-group mt-4">
                                <button type="submit" class="btn btn-success">Enregistrer</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>  

        </div>
    )
}
