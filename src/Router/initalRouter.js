const express = require("express");
const Router = express.Router();
const AppController = require("../Controller/useController")

const initalRouter = (app) => {

    Router.post('/create-course', AppController.CreateCourse);
    Router.post('/update-course', AppController.UpdateCourse);
    Router.get('/get-all-courses', AppController.GetAllCourses);
    Router.get('/get-one-courses', AppController.GetOneCourses);
    Router.post('/soft-delete', AppController.SoftDeleteCourses);
    Router.post("/update-public", AppController.UpdatePublicCourses);
    Router.post("/delete/:id", AppController.DestroyCourses);

    Router.post("/register-user", AppController.RegisterUser);
    Router.post("/login-user", AppController.LoginUser);

    app.use('/api/v1/app', Router)
};

module.exports = initalRouter;
