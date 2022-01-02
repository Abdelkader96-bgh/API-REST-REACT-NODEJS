const app = require("./../app")
const request = require("supertest")
const Cabane = require("./../models/cabanes")

describe("test les routes de cabane", ()=>{
    let idCabane="";
    it("should create cabane in database", async ()=>{
        const myForm = {
            name  : "cabane de New tus",
            categorie : "61d0c3bf07e02800b3481508",
            price : 500,
            partner : "Mohammed foad ",
            imageUrl :"https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
            description :"trés belle embiance"
        }
        const res = await request(app).post("/new/cabane").send(myForm)
        expect(res.statusCode).toBe(201)
        expect(res.body).not.toBeUndefined()
        expect(res.body.id).not.toBeUndefined()
        idCabane = res.body.id;

        const cabane = await Cabane.findById(idUser);
        expect(cabane.name).toEqual("cabane de New tus")
        expect(cabane.categorie).toBeDefined()
        expect(cabane.price).toEqual(500)
        expect(cabane.partner).toEqual("Mohammed foad")
        expect(cabane.imageUrl).toEqual("https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg")
        expect(cabane.description).toEqual("trés belle embiance")

        await cabane.deleteMany({name:"cabane de New tus"})
    })
})
