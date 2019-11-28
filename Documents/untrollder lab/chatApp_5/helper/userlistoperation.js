const list = require('../model/userlistmodel');

let userList = {
    add(listData) {
        list.findOne({ email: listData.email }, (error, doc) => {
            if (error) {
                console.log("there is some error while retriving search user data", error);
            } else {
                if (doc) {
                    // console.log("User list is already registered***", doc);
                    // userList.update(listData);
                    // res.json(doc);
                } else {
                    list.create(listData, (error) => {
                        if (error) {
                            console.log("there is some error while saveing user List", error);
                        } else {
                            console.log("user List is saved");
                        }
                    })
                }
            }
        });

    },
    update(userData) {
        list.findOneAndUpdate({ email: userData.email }, { $push: { userlist: userData.userlist } }, { upsert: true, new: true }).exec()
            // list.findOneAndUpdate({ email: userData.email }, { $set: { userlist: userData.userlist } }, { upsert: true, new: true }).exec()
            //.then(user => console.log("code comes here" + user)).catch(err => console.log(err));

    },
    search(user, cb) {
        list.find({ email: user.email }, (error, doc) => {
            if (error) {
                console.log("there is some error while retriving search user List", error);
            } else {
                if (doc) {
                    // console.log("search data", doc);
                    cb(doc);
                    // res.json(doc);
                } else {
                    res.json("User List is Not Available");
                }
            }
        })
    }
}

module.exports = userList;