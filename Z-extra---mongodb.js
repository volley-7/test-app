// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//    console.log(error);
//    if(error){
//       return console.log('Unable to connect.')
//    }

//    console.log("Connected....")
// })



const { MongoClient, ObjectId } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "task-manager";

// const id = new ObjectId();
// console.log(id);
// console.log(id.id);
// console.log(id.toJSON());
// console.log(id.toHexString());
// console.log(id.getTimestamp());

async function main() {
   // Use connect method to connect to the server
   await client.connect();
   console.log("Connected successfully to server");
   const db = client.db(dbName);
   const collection = db.collection("users");
   const taskCollection = db.collection("tasks");

   ///////Insert  Operation

   // const result = await collection.insertOne({
   //    name: "def11",
   //    age: 12,
   // });

   // const result = await collection.insertMany([
   //    {
   //       name: "user1",
   //       age: 83,
   //    },
   //    {
   //       name: "User2",
   //       age: 4,
   //    }
   // ]);

   //console.log(result);

   //    const result = await taskCollection.insertMany([
   //          {
   //             description: "Task 1",
   //             completed: true,
   //          },
   //          {
   //             description: "Task 2",
   //             completed: false,
   //          },
   //          {
   //             description: "Task 3",
   //             completed: true,
   //          }
   //       ]);

   ///////////////FIND  READ Operations
   // const result = await taskCollection.find({});
   // console.log(result)

   // const cursor = taskCollection.find({  _id: new ObjectId("63fd85896723d25979ea6f33") });
   // console.log(await cursor.toArray());
   //await cursor.forEach(doc => console.log(doc));

   // taskCollection.updateOne(
   //    {
   //       _id: new ObjectId("63fd85896723d25979ea6f35"),
   //    },
   //    {
   //       $set: {
   //          completed: false,
   //       },
   //    }
   // ).then((result) => {
   //       console.log(result);
   //    })
   //    .catch((error) => {
   //       console.log(error);
   //    });

   // collection.updateMany(
   //    {
   //       age: 16
   //    },
   //    {
   //       $inc: {
   //          age: 1
   //       },
   //    }
   // ).then((result) => {
   //       console.log(result);
   //    })
   //    .catch((error) => {
   //       console.log(error);
   //    });

   // collection.deleteOne(
   //    {
   //       _id: new ObjectId('63fca006a11b8917917f3a23')
   //    }
   // ).then((result) => {
   //       console.log(result);
   //    })
   //    .catch((error) => {
   //       console.log(error);
   //    });

   // collection.deleteMany(
   //       {
   //          age: 17
   //       }
   //    ).then((result) => {
   //          console.log(result);
   //       })
   //       .catch((error) => {
   //          console.log(error);
   //       });


   return "done.";
}

main()
   .then(console.log)
   .catch(console.error)
   .finally(() => {
      setTimeout(() => {
         client.close();
      }, 1500);
   });
