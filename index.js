const express = require("express");
const app = express();
const port = 3200;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productController = require("./src/product/product.controller");
app.use('/products', productController);

const userController = require('./src/user/user.controller');
app.use('/users', userController);

const historyController = require('./src/history/history.controller');
app.use('/historys', userController);

const missionController = require('./src/mission/mission.controller');
app.use('/missions', userController);

const inviteController = require('./src/invite/invite.controller');
app.use('/invites', userController);

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);