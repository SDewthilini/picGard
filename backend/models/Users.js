const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    }],
});

// Fire a function before the doc is saved to the database
userSchema.pre('save', async function(next) {

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// Fire a function after the doc is saved to the database
userSchema.post('save', function(doc, next) {
    next();
});

// Static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email: email });

    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

// Instance method to add an image
userSchema.methods.addImage = async function(imageId) {
    if (!this.images.includes(imageId)) {
        this.images.push(imageId);
        await this.save();
    }
};

// Instance method to remove an image
userSchema.methods.removeImage = async function(imageId) {
    this.images = this.images.filter(id => id.toString() !== imageId.toString());
    await this.save();
};

// Instance method to get all images
userSchema.methods.getAllImages = function() {
    return this.images;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
