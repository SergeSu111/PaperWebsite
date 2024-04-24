const config = require("./dbConfig.json"); // call the config
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`; //get the mongo db url,automatically generate infor for me
const { MongoClient } = require('mongodb');// grab the MongoClient property in mongodb object 
const client = new MongoClient(url); // get myown mongo db

const db = client.db("paper"); //create a db name called rental
const formCollection = db.collection("suggestion"); 

const uuid = require("uuid");
const bcrypt = require("bcrypt");

(async function testConnection()
{
    await client.connect(); // wait for the db is connected
    await db.command({ping:1});
})().catch((ex) => {console.log(`Unable to connect to database with ${url} because ${ex.message}`);
process.exit(1);
});


// for submit suggestion form
async function submitForm(formData, my_username)
{
    const wholeSubmitForm = {"username":my_username, "form": formData};
    await formCollection.insertOne(wholeSubmitForm); 
    // insert this formData into DB.

}

module.exports = 
{
    submitForm,
}