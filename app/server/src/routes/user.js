import express from 'express';
import db from '../db';
const router = express.Router();

router.get('/users/:userId/workspaces', async (req, res) => {
  try {
    const { userId } = req.params;

    const workspaces = await db('workspaces')
      .where({ ownerId: userId })
      .select(['workspaces.id', 'workspaces.name']);

    res.status(200).send({ status: 'success', workspaces });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

export default router;
