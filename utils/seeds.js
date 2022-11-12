const { connect, connection } = require('mongoose');
const { users } = require('../models')

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost/api-for-social-network';

connect(connectionString, {
  useNewUrlParser: true,
});



const newUsers = [
    {
        username: 'hiren1',
        email: 'hiren@mail.com',
        thoughts: ['2332', '32325', '534'],
        friends: [2]

    },
    {
        username: 'byron1',
        email: 'byron@mail.com',
        thoughts: ['88', '323288895', '111534'],
        friends: [1]
    }
];

connection.on('error', (err) => err);

connection.once('open', async () => {
    // since i'm seeding new data 
    // -- i want to delete any old collections
    await users.collection.deleteMany({})
    console.log('connected')
    // insert my users
    await users.collection.insertMany(newUsers);

})