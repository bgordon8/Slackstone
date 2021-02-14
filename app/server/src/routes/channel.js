import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/channels', async (req, res) => {
  try {
    const channels = await db('channels').select();

    res.status(200).send({ status: 'success', channels });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

export default router;
