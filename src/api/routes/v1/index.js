import express from "express";

import resourceRoute from './resource.route';

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/resource', resourceRoute);

export default router;
