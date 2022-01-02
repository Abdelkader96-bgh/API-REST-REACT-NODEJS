const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Cabane = require('./models/cabanes');
const Categorie = require("./models/categories")
const bodyParser = require("body-parser");


// connexion à la base de donnée.
mongoose.connect('mongodb://localhost:27017/ipssi',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//cros problème de navigateur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

//première route pour tester
  app.get('/accueil', function(req,res){
    res.writeHead(200, {"Content-Type": "text/html"})
    res.end("<h1>Bienvenue</h1>")
})

//enregistrer les categories des cabanes 
app.post("/categorie", async function(req,res){
    const {name} = req.body
    
    const data = await Categorie.create({
          name
    })
    res.status(201).json({id:data["_id"] , message: 'Objet enregistré !' })
})

// enregister les cabanes .
app.post("/new/cabane", async function(req,res){
    const {name, categorie, price, partner,imageUrl,description} = req.body
    
    const datas = await Cabane.create({
          name,
          categorie,
          price, 
          partner,
          imageUrl,
          description
    })
    res.status(201).json({id:datas["_id"]})
})

//récupérer une seule cabane 

app.get('/cabane/:id', (req, res, next) => {
    Cabane.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

//récupérer tout
app.use('/cabanes', (req, res, next) => {
    Cabane.find()
      .then(cabanes => res.status(200).json(cabanes))
      .catch(error => res.status(400).json({ error }));
  });

 // mise à jour d'un cabane 
 app.put('/cabane/:id', (req, res, next) => {
    Cabane.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Cabane modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }); 

  // supprimer un cabane

  app.delete('/cabane/:id', (req, res, next) => {
    Cabane.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Cabane supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //voir tous les categories
  app.get("/categories", async function(req,res){
    Categorie.find({}, function(err, categories){
        res.status(200).json(categories)
    })
})

module.exports = app;