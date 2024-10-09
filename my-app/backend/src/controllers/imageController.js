// src/controllers/imageController.js
const Image = require('../models/Image');

exports.uploadImage = async (req, res) => {
  const { file } = req;
  const userId = req.session.userId;

  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const image = await Image.create({
      filename: file.originalname,
      mimetype: file.mimetype,
      data: file.buffer,
      userId,
    });

    res.status(201).json({ message: 'Image uploaded successfully', imageId: image.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getImages = async (req, res) => {
  const userId = req.session.userId;

  try {
    const images = await Image.findAll({ where: { userId } });
    const formattedImages = images.map(img => ({
      id: img.id,
      filename: img.filename,
      mimetype: img.mimetype,
      data: img.data.toString('base64'), // Convert Buffer to base64
    }));
    res.json(formattedImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
