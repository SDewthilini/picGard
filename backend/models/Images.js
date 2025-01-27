const mongoose = require('mongoose');

// Define the schema for the Images model
const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name for the image'],
    },
    data: {
        type: String,
        required: [true, 'Please upload a .txt file'],
    },
});

// Pre-save hook to log before saving the document
imageSchema.pre('save', function(next) {
    next();
});

// Post-save hook to log after saving the document
imageSchema.post('save', function(doc, next) {
    next();
});

// Static method to find an image by name
imageSchema.statics.findByName = async function(name) {
    const image = await this.findOne({ name });
    if (image) {
        return image;
    }
    throw Error('Image not found');
}

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
