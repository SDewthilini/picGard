const User = require('../models/Users');
const Image = require('../models/Images');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

module.exports.save_post = async (req, res) => {
    try {
        // Extract user ID from the JWT token
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // Extract image data from the request
        const { name, data } = req.body;

        // Find the user by 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new image
        const image = new Image({ name, data: Buffer.from(data) });
        await image.save();

        // Associate the image with the user
        await user.addImage(image._id);

        res.status(201).json({ message: 'Image saved and associated with user', image });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};

module.exports.get_images = async (req, res) => {
    try {
        // Extract user ID from the JWT token
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get all images associated with the user
        const images = await Image.find({ _id: { $in: user.images } });
        res.status(200).json(images);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

module.exports.saveimg = async (req, res) => {
   
    
    // Endpoint to save encrypted file
    app.post('/save', upload.single('file'), (req, res) => {
        const { name } = req.body;
        const filePath = req.file.path;
    
        // Save file info to a JSON file (or a database)
        const fileInfo = { name, filePath };
        fs.writeFileSync('files.json', JSON.stringify(fileInfo), 'utf8');
    
        res.send({ message: 'File uploaded and saved successfully!' });
    });
}

module.exports.deleteimg = async (req, res) => {
    
    try {
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // Extract image ID from URL parameters
        const imageId = req.params.imageId;
        console.log(imageId);

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the image belongs to the user
        if (!user.images.includes(imageId)) {
            return res.status(403).json({ message: 'Image not associated with this user' });
        }

        // Remove the image from the user's images array
        await user.removeImage(imageId);

        // Find the image by ID and delete it
        const image = await Image.findByIdAndDelete(imageId);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.status(200).json({ message: 'Image deleted successfully' });
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.renameImage_put = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // Extract image ID from URL parameters
        // const imageId = req.params.imageId;
        const { name, imageId } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the image belongs to the user
        if (!user.images.includes(imageId)) {
            return res.status(403).json({ message: 'Image not associated with this user' });
        }

        // Find the image by ID and update its name
        const image = await Image.findByIdAndUpdate(imageId, { name }, { new: true });
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        res.status(200).json({ message: 'Image name updated successfully', image });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}