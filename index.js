const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const { success, error } = require("consola");
const { connect } = require("mongoose");
const passport = require("passport");

const { DB, PORT } = require("./config");

const app = express();
app.use('/uploads', express.static('uploads'));
// middleware
app.use(cors());
app.use(bodyparser.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// user router middleware 
app.use("/api", require("./routes/Routes"));

const startApp = async () => {
    try {
        await connect(DB, { 
            useFindAndModify: true, 
            useUnifiedTopology: true, 
            useNewUrlParser: true 
        });

        success({ 
            message: `Succesfully connected with the Database \n${DB}`, 
            badge: true 
        });

        app.listen(PORT, () => 
            success({ 
                message: `Server started on PORT ${PORT}`, 
                badge: true 
            })
        );
    } catch(err) {
        error({ 
            message: `Unable to connect with Database ${err}`, 
            badge: true 
        });
        startApp();
    }
    // await connect(DB, { useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true })
    //  .then(() => success({ message: `Succesfully connected with the Database ${DB}`, badge: true }))
    //  .catch((err) => error({ message: `Unable to connect with Database ${err}`, badge: true }));

    // app.listen(PORT, () => success({ message: `Server started on PORT ${PORT}`, badge: true }));
};

startApp();


