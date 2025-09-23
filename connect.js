import mongoose from 'mongoose';


async function connectToMongoDB(url){
    return mongoose.connect(url);
}

export default connectToMongoDB;
// module.exports={connectToMongoDB};