const express = require('express');
const Video = require('../models/Video')

const router = express.Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 0; 
    const limit = 15;
    const skip = page * limit;
    const userAge = parseInt(req.query.age) || 0; 
    const searchQuery = req.query.search || '';
    try {
        // filter
        const baseFilter = userAge < 18 ? { rating: { $ne: "R" } } : {};

        //search filter
        if (searchQuery) {
            baseFilter.$or = [
                { title: { $regex: searchQuery, $options: 'i' } }, 
                { cast: { $regex: searchQuery, $options: 'i' } }
            ];
        }

        const totalItems = await Video.countDocuments(baseFilter);
        const totalPages = Math.ceil(totalItems / limit);

        const videos = await Video.find(baseFilter).skip(skip).limit(limit);

        res.json({
            videos,
            totalItems,
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching videos' });
    }
});


router.get('/:showId', async (req, res) => {
    const { showId } = req.params;  

    try {
        const video = await Video.findOne({ show_id: showId });

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.json(video);  
    } catch (err) {
        res.status(500).json({ error: 'Error fetching video details' });
    }
});


module.exports = router;