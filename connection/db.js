require('dotenv').config();
const mongoose = require('mongoose');
const mongodbUrl = "mongodb+srv://sarmistha:metroMindz@cluster0.1mnp3qq.mongodb.net/MetroMindzDB?retryWrites=true&w=majority";

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`database connected securely`);
}).catch((err) => {
    console.log(err);
});