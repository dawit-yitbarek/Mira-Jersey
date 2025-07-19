import express from 'express';
import { getFeedBack, InsertFeedBack } from '../controllers/feedbackController.js'

const router = express.Router();

router.get('/', getFeedBack)
router.post('/', InsertFeedBack)

export default router;