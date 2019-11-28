const userCollection = require('../model/usersaddmodel');


var user = {
    search(serachUser, res) {
        userCollection.findOne(serachUser, (error, doc) => {
            if (error) {
                console.log("there is some error while retriving search user data", error);
            } else {
                if (doc) {
                    // console.log(doc);
                    res.json(doc);
                } else {
                    res.json("User is Not Available");
                }
            }
        })
    }
}

module.exports = user;