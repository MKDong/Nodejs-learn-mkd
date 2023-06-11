const AppService = require("../Service/appService");

class AppController {
    async CreateCourse(req, res) {
        try {
            const data = await AppService.CreateCourse(req.body);

            res.status(200).json(data);
        } catch (error) {
            res.status(503).json({
                errCode: -1,
                msg: "error creating course",
                dataErr: `${error}`,
            });
        }
    }

    async UpdateCourse(req, res) {
        try {
            const data = await AppService.UpdateCourse(req.body);

            res.status(200).json(data);
        } catch (error) {
            res.status(503).json({
                errCode: -1,
                msg: "error creating course",
                dataErr: `${error}`,
            });
        }
    }

    async GetAllCourses(req, res) {
        try {
            const data = await AppService.GetAllCourses(req.query.isCustomer);

            res.status(200).json(data);
        } catch (error) {
            res.status(503).json({
                errCode: -1,
                msg: "error creating course",
                dataErr: `${error}`,
            });
        }
    }

    async GetOneCourses(req, res) {
        try {
            const data = await AppService.GetOneCourses(req.query.isCustomer, req.query.id);

            res.status(200).json(data);
        } catch (error) {
            res.status(503).json({
                errCode: -1,
                msg: "error creating course",
                dataErr: `${error}`,
            });
        }
    }
    async SoftDeleteCourses(req, res) {
        try {
            const data = await AppService.SoftDeleteCourses(req.body);

            res.status(200).json(data);
        } catch (error) {
            res.status(503).json({
                errCode: -1,
                msg: "error creating course",
                dataErr: `${error}`,
            });
        }
    }
    async UpdatePublicCourses(req, res) {
        try {
            const data = await AppService.UpdatePublicCourses(req.body);

            res.status(200).json(data);
        } catch (error) {
            res.status(503).json({
                errCode: -1,
                msg: "error creating course",
                dataErr: `${error}`,
            });
        }
    }
    async DestroyCourses(req, res) {
        try {
            const data = await AppService.DestroyCourses(req.params.id);

            res.status(200).json(data);
        } catch (error) {
            res.status(503).json({
                errCode: -1,
                msg: "error creating course",
                dataErr: `${error}`,
            });
        }
    }

    async RegisterUser(req, res) {
        try {
            const data = await AppService.RegisterUser(req.body);

            res.status(200).json(data);
        } catch (error) {
            res.status(503).json({
                errCode: -1,
                msg: "error creating course",
                dataErr: `${error}`,
            });
        }
    }

    async LoginUser (req, res) {
        try {
            const data = await AppService.LoginUser(req.body);

            res.status(200).json(data);
        } catch (error) {
            res.status(503).json({
                errCode: -1,
                msg: "error creating course",
                dataErr: `${error}`,
            });
        }
    }
}

module.exports = new AppController();
