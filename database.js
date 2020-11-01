const mongoose = require('mongoose');

const connection = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology : true,
            useFindAndModify: true
        })

        console.log(`Database Connected Successfully`);
    } catch (error) {
        console.log(error);
        process.exit(1); //exit with process exit code 1
    }
}

module.exports = connection;