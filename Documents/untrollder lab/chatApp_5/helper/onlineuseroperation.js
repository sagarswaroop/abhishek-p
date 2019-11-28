const userStatus = require('../model/usersaddmodel');


var onlineUser = {
    add(user) {
        userStatus.findOne({ email: user.email }, (error, doc) => {
            if (error) {
                console.log("there is some error while retriving search user data", error);
            } else {
                if (doc) {
                    // console.log("already registered************", doc);
                    onlineUser.update(user);
                    // res.json(doc);
                } else {
                    userStatus.create(user, (error) => {
                        if (error) {
                            console.log("there is some error while saveing user data", error);
                        } else {
                            console.log("user onlnie status is saved");
                            // res.send("")
                        }
                    })
                }
            }
        })
    },
    update(userobj) {
        userStatus.findOneAndUpdate({ email: userobj.email }, { $set: { address: userobj.address, Status: 'online' } }, { upsert: true, new: true }).exec()
            //.then(user => console.log("code comes here" + user)).catch(err => console.log(err))
    },
    search(clientemail, cb) {
        // console.log("serach email is", clientemail);
        userStatus.findOne({ email: clientemail }, (error, doc) => {
            if (error) {
                console.log("there is some error while retriving search user data", error);
            } else {
                if (doc) {
                    // console.log("data get in reocrds************", doc);
                    cb(doc);
                } else {
                    console.log("no data found...");
                }
            }
        });
    },
}


module.exports = onlineUser;