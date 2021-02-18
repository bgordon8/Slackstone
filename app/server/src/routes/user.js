import express from 'express';
import db from '../db';
const router = express.Router();

router.get('/users/:userId/workspaces', async (req, res) => {
  try {
    const { userId } = req.params;

    const ownedWorkspaces = await db('workspaces')
      .where({ ownerId: userId })
      .select([
        'workspaces.id',
        'workspaces.name',
        db.raw('json_agg(channels.*) as channels'),
      ])
      .leftJoin('channels', 'workspaces.id', 'channels.workspaceId')
      .groupBy('workspaces.id');

    const joinedWorkspaces = await db('user_workspaces')
      .where({ userId })
      .andWhereNot({ ownerId: userId })
      .select(
        'workspaces.id',
        'workspaces.name',
        db.raw('json_agg(channels.*) as channels')
      )
      .leftJoin('workspaces', 'user_workspaces.workspaceId', 'workspaces.id')
      .leftJoin('channels', 'workspaces.id', 'channels.workspaceId')
      .groupBy('workspaces.id');
    const workspaces = [...ownedWorkspaces, ...joinedWorkspaces];

    res.status(200).send({
      status: 'success',
      workspaces: [
        ...workspaces.map((workspace) => {
          return {
            ...workspace,
            defaultChannel: workspace.channels
              .filter((channel) => channel.default === true)
              .pop(),
          };
        }),
      ],
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

export default router;
