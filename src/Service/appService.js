const db = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class appService {
    CreateCourse(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                if (!data.title | !data.lever | !data.userID | !data.image | !data.description | !data.videoID) {
                    return resolve({
                        errCode: 1,
                        msg: "Missing required parameters",
                    });
                }

                await db.Course.create({
                    title: data.title,
                    lever: data.lever,
                    image: data.image,
                    descripsition: data.description,
                    videoID: data.videoID,
                    isDelete: 1,
                    isPublic: 1,
                    userID: data.userID,
                });

                resolve({
                    errCode: 0,
                    msg: "ok",
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    UpdateCourse(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (
                    !data.id |
                    !data.title |
                    !data.userID |
                    !data.lever |
                    !data.image |
                    !data.description |
                    !data.videoID
                ) {
                    return resolve({
                        errCode: 1,
                        msg: "Missing required parameters",
                    });
                }

                const dataRes = await db.Course.update(
                    {
                        title: data.title,
                        lever: data.lever,
                        image: data.image,
                        descripsition: data.description,
                        videoID: data.videoID,
                        userID: data.userID,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    }
                );

                resolve({
                    errCode: 0,
                    msg: "update successful",
                    data: dataRes,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    GetAllCourses(isCustomer = "true") {
        return new Promise(async (resolve, reject) => {
            try {
                let data;

                if (isCustomer === "true") {
                    data = await db.Course.findAll({
                        where: {
                            isPublic: 1,
                            isDelete: 1,
                        },
                    });
                } else {
                    data = await db.Course.findAll();
                }
                resolve({
                    errCode: 0,
                    msg: "getAllCourses",
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    GetOneCourses(isCustomer = "true", id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return resolve({
                        errCode: 1,
                        msg: "Missing required parameters",
                    });
                }

                let data;

                if (isCustomer === "true") {
                    data = await db.Course.findOne({
                        where: {
                            isPublic: 1,
                            isDelete: 1,
                            id: id,
                        },
                    });
                } else {
                    data = await db.Course.findOne({
                        where: {
                            id: id,
                        },

                        include: [
                            {
                                model: db.User,
                                as: "UserData",
                                attributes:
                                    //  ["password"],
                                    {
                                        exclude: ["password"],
                                    },
                            },
                        ],
                    });
                }
                resolve({
                    errCode: 0,
                    msg: "getOneCourses",
                    data,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    SoftDeleteCourses(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.id | !data.isDelete) {
                    return resolve({
                        errCode: 1,
                        msg: "Missing required parameters",
                    });
                }

                await db.Course.update(
                    {
                        isDelete: data.isDelete,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    }
                );

                resolve({
                    errCode: 0,
                    msg: "ok",
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    UpdatePublicCourses(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.id | !data.isPublic) {
                    return resolve({
                        errCode: 1,
                        msg: "Missing required parameters",
                    });
                }

                await db.Course.update(
                    {
                        isPublic: data.isPublic,
                    },
                    {
                        where: {
                            id: data.id,
                        },
                    }
                );

                resolve({
                    errCode: 0,
                    msg: "ok",
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    DestroyCourses(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!id) {
                    return resolve({
                        errCode: 1,
                        msg: "Missing required parameters",
                    });
                }

                await db.Course.destroy({
                    where: {
                        id: id,
                    },
                });

                resolve({
                    errCode: 0,
                    msg: "ok",
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    RegisterUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.email || !data.password) {
                    return resolve({
                        errCode: 1,
                        msg: "Missing required parameters",
                    });
                }

                const check = await this.CheckEmailExit(data.email);

                if (check) {
                    return resolve({
                        errCode: 3,
                        msg: "User (email) already exists",
                    });
                }

                const salt = bcrypt.genSaltSync(saltRounds);
                const passwordHash = bcrypt.hashSync(data.password, salt);

                await db.User.create({
                    email: data.email,
                    password: passwordHash,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                });

                resolve({
                    errCode: 0,
                    msg: "ok",
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    LoginUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.email || !data.password) {
                    return resolve({
                        errCode: 1,
                        msg: "Missing required parameters",
                    });
                }

                const user = db.User.findOne({
                    where: { email: data.email },
                });

                if(!user) {
                    return resolve({
                        errCode: 2,
                        msg: " Email (user) not found",
                    })
                }
                const checkPassword = bcrypt.compareSync(data.password, user.password);

                if(checkPassword ) {
                    return resolve({
                        errCode:0,
                        msg: "login successfuly",
                        user
                    })
                }

            } catch (error) {
                reject(error);
            }
        });
    }

    async CheckEmailExit(email) {
        try {
            const check = await db.User.findOne({
                where: { email: email },
            });
            if (check) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            reject(error);
        }
    }
}

module.exports = new appService();
