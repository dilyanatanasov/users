import express = require('express');
import {currentDateOfExecution, errorHandler} from "./common/middlewares";
import {userRoutes} from "./routes";
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
app.use(currentDateOfExecution);

app.use(userRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server started')
})