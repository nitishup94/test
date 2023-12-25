const express = require("express");
const app = express();
const dotenv=require('dotenv');
const {MongoClient} = require("mongodb");
const Port = process.env.Port || 8000;
const cors = require("cors")
const mongoose=require('mongoose');
const articleData = require('./model');
const router=express.Router()
 const articlesinfo ={
    "learn-react": {
        comments:[],
    },
    "learn-node": {
        comments:[],
    },
    "my-thoughts-on-learning-react":{
        comments: [],
    },
 }
app.use(cors())
app.use(express.json());
//database connection
dotenv.config();
//const withDB = async(operation,res) => {
    mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://shivaevilking:1234shivansh@cluster0.lhsukan.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('successfully connected with database !');
})
.catch((error)=>{
    console.log('Error occured : '+error);
})
    // try {
        
    // const client = await MongoClient.connect("mongodb://127.0.0.1")
    // const db = client.db("mernblog");
    // await operation(db);
    // client.close();
    // } catch (error) {
    //     res.status(500).json({message:"error connecting to database", error})
    // }
//}
// app.get("/api/articles/:name", async (req,res) => {
//     withDB(async (db)=>{
//         const artilename = req.params.name;
   
    
//     const articlesinfo = await db
//     .collection("articles")
//     .findOne({name: artilename});
//     res.status(200).json(articlesinfo);
//     },res)
        
    
    
//})
router.post('/api/articles/:name/add-comments', async(req,res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;
    console.log(req.body);
  
       
       
    
    const articlesinfo =await articleData.findOne({ name: articleName});
if(articlesinfo != null){
    
 var updatedData = await articleData.updateOne({name: articleName},
            {
                $set: {
                    comments: articlesinfo.comments.concat({ username, text}),
                },
            })
}else{ 
    
    const register_data = new articleData({
        name: articleName,
        comments: [{ username: username, text:text}]
    });
  const postdetails=await register_data.save();
}
const upatedArticle =await articleData.findOne({ name: articleName});
            res.status(200).json(upatedArticle);
   
})

app.use(router);
app.listen(Port, () => console.log(`server started at port ${Port}`))