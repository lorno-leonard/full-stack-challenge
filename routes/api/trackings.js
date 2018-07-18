const axios = require('axios');
const express = require('express');
const router = express.Router();

// Tracking Model
const TrackingModel = require('../../models/Tracking');

// AfterShip API key
const apiKey = require('../../config/keys').afterShipKey;

// @route  GET api/trackings
// @desc   Get all trackings
// @access Public
router.get('/', (req, res) => {
	let options = {
		sort: { date: -1 },
		page: req.query.page && !isNaN(req.query.page) ? req.query.page : null || 1,
		limit: 5
	};
	TrackingModel.paginate({}, options).then(trackings => res.json(trackings));
});

// @route  POST api/trackings/fetch
// @desc   Fetch trackings from AfterShip
// @access Public
router.post('/fetch', (req, res) => {
	let url = 'https://api.aftership.com/v4/trackings';
	(async () => {
		let { trackings } = await axios
			.get(url, {
				headers: {
					'Content-Type': 'application/json',
					'aftership-api-key': apiKey
				}
			})
			.then(response => {
				return response.data.data;
			});

		let insertData = await trackings.map(tracking => {
			return {
				trackingNumber: tracking.tracking_number,
				data: tracking,
				date: tracking.created_at
			};
		});

		TrackingModel.insertMany(insertData, { ordered: false })
			.then(docs => res.json({ success: true, synced: docs.length }))
			.catch(err => {
				if (err.code === 11000) {
					res.json({ success: true, synced: err.result.nInserted });
					return;
				}

				res.status(404).json({ success: false, err });
			});
	})();
});

module.exports = router;
