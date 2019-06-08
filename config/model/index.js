var mongoose = require('mongoose');
const user = new mongoose.Schema({
	username: { type: String, required: true } ,
	password:  { type: String, required: true },
	createdDate: { type: Date, default: Date.now()},
	id:{type:String,required: true} 
}, {
	versionKey: false
});
exports.adminmodel = mongoose.model('admins', user);