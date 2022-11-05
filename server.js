const express = require ('express');
const mongoose = require ('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express,json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api',{
    useFindAndModify: false,
    useNewURlParser: true,
    useUnifiesTopology:true
});

mongoose.set('debug', true);

app.listen(PORT, ()=> console.log(`connected to local host:${PORT}`));