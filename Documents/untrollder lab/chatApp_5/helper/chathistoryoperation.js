const chatModel = require("../model/chatmodel");

let chatHistory = {
    add(chatdata, cb) {
        chatModel.findOne({ id: chatdata.id }, (error, doc) => {
            if (error) {
                console.log("there is some error while retriving search user chatdata", error);
            } else {
                if (doc) {
                    cb(doc);
                } else {
                    chatModel.create(chatdata, (error) => {
                        if (error) {
                            console.log("there is some error while saveing user chatdata", error);
                        } else {
                            console.log("chatdata List is saved");
                        }
                    })
                }
            }
        });

    },
    update(chatdata) {
        if (chatdata.msg) {
            chatModel.findOneAndUpdate({ id: chatdata.id }, { $push: { chathistory: chatdata.msg } }, { upsert: true, new: true }).exec()
        }
    },

    search(userid, cb) {
        chatModel.find({ id: userid }, (error, doc) => {
            if (error) {
                console.log("there is some error while retriving search user List", error);
            } else {
                if (doc) {
                    cb(doc);
                } else {
                    console.log("chat history is Not Available");
                }
            }
        })
    }
}

module.exports = chatHistory;