
const cors = require("cors")
const express = require("express");
const landingRoute = require('./routes/landing.cjs')
const cardatabase = require('./routes/getDatabase.cjs')
const getrandom = require('./routes/getRandom.cjs')


const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());



app.get('/', landingRoute);
app.use('/getrandom', getrandom);
app.use('/cardatabase', cardatabase);


 app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
      console.log(` http://localhost:${PORT}/`);
    });
