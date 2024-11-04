const mongoose = require('mongoose');

(async() => {
    await mongoose.connect('mongodb://localhost:27017/mydb');
    console.log('connected to mongodb');

    const { Schema } = mongoose;

    const userSchema = new Schema({
        name: {type: String, required: true},
        age: {type: Number, min: 0, max: 120},
        city: {type: String, required: false}
    });

    const User = mongoose.model('User', userSchema); // create collection(table)
 
    // insert into User 
    // const user1 = new User({name: 'Alice', age: 30, city: 'Busan'});
   // const result1 = await user1.save();
    // console.log(`User1 : ${JSON.stringify(result1)} `);

    // select * from User
//    const users = await User.find({});
//    console.log(`users list : ${JSON.stringify(users)}`);

    // update User set age = 5 where name = "Alice" limit 1;
    // const updatedUser1 = await User.updateOne({name: "Alice"}, {$set: {age: 5}});

    // update User Set age = 5 where name = "Alice";
    // const updatedUser1 = await User.updateMany({name: "Alice"}, {$set: {age: 5}});
    // console.log(`Alice age is ${JSON.stringify(updatedUser1)}`);

    const deleteUser1 = await User.deleteOne({name: 'Alice'});
    console.log(`Alice is deleted : ${JSON.stringify(deleteUser1)}`);

    const users = await User.find({});
    console.log(`users list : ${JSON.stringify(users)}`);
})();
// node app.js