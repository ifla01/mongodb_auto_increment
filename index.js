const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/mongodb_tutorial", {
    useNewUrlParser: true,})
    .then(() => console.log("Succesfully connected on mongodb"))
    .catch(e => console.log(e));

const counterSchema = {
    id: {
        type: String
    },
    seq: {
        type: Number
    }
}

const countermodel = mongoose.model("counter", counterSchema);

app.get('/seq', async (req, res) => {

    countermodel.findOneAndUpdate(
        {id: "autoval"},
        {"$inc":{"seq":1}},
        {new:true}, (err, cd) => {
            if(cd == null) {
                const newval = new countermodel({id: "autoval", seq: 1});
                newval.save(); 
            }
        }
    );
    const counter = await countermodel.findOne({id: "autoval"});
    console.log(`seq: ${counter.seq}`);
    res.send(counter);
});

app.get('/', (req, res) => {
    res.send('success');
})

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
})