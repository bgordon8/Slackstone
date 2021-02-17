import express from 'express';
import db from '../db';
const router = express.Router();

router.get('/users/:userId/workspaces', async (req, res) => {
  try {
    const { userId } = req.params;

    const ownedWorkspaces = await db('workspaces')
      .where({ ownerId: userId })
      .select(['workspaces.id', 'workspaces.name']);

    const joinedWorkspaces = await db('user_workspaces')
      .where({ userId })
      .andWhereNot({ ownerId: userId })
      .select('workspaces.id', 'workspaces.name')
      .leftJoin('workspaces', 'user_workspaces.workspaceId', 'workspaces.id');

    const workspaces = [...ownedWorkspaces, ...joinedWorkspaces];

    console.log(workspaces);

    res.status(200).send({ status: 'success', workspaces });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

export default router;
