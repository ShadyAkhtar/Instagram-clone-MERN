import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dbModel from './dbModel.js';

//app config
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1233958",
  key: "400f051deea0f43100ce",
  secret: "63333e376e4498bf9add",
  cluster: "ap2",
  useTLS: true
});

//middleware
app.use(express.json());
app.use(cors());

//DB Config
const connection_url = "mongodb+srv://instagram-admin:Oz8IjwFYsdaD8msV@cluster0.ywrrh.mongodb.net/instaDB?retryWrites=true&w=majority"
mongoose.connect(connection_url, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true });


mongoose.connection.once("open", () => {
    console.log("Db Connected");

    const changeStream = mongoose.connection.collection('posts').watch();

    changeStream.on('change', (change) => {

        console.log("change triggered");
        console.log(change);
        console.log("end of change");

        if (change.operationType === 'insert'){
            console.log("triggering pusher ***Uploading Image***");
            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'insertes', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image
            })
        }
        else{
            console.log("error triggering pusher");
        }
    })

})

//api routes
app.get('/', (req, res) => res.status(200).send('Hello world'))
app.post('/upload', (req, res) => {
    const body = req.body;
    dbModel.create(body, (err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

//listen
app.listen(port, ()=> console.log(`listening on localhost:${port}`));