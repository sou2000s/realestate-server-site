const express = require('express')
const app  = express()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


// user22
// password   N1FnwqwB0m1hbugv 

app.get('/' , (req, res)=>{
    res.send('server running')
})



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user22:N1FnwqwB0m1hbugv@cluster0.x7kxg5y.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const houseCollection  = client.db('Realestate').collection('houses')


const dbConnect = async () =>{
    try {
        await client.connect()
        console.log('db connenct');
    } catch (error) {
        console.log(error.message);
    }
}



dbConnect()


app.put('/houses' , async(req , res)=>{
    try {
        const filterData = req.body;
        console.log(filterData);
     
      console.log(filterData.price);
      const greaterThan = parseInt(filterData.price.slice(0,4))
      const lessThan = parseInt( filterData.price.slice(6,11))
      console.log(greaterThan , lessThan);
        const query = {location: filterData.location , propertyType: filterData.propertyType , 
            availableDate: filterData.availableDate , 
            price: {$gt:greaterThan , $lt:lessThan}}
        const houses = await houseCollection.find(query).toArray()
        res.send(houses)
    } catch (error) {
        console.log(error.message);
    }
})




app.listen(port , ()=>{
    console.log('server running');
})