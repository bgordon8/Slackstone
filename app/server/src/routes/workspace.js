import express from 'express';
import db from '../db';

const router = express.Router();

router.get('/workspaces', async (req, res) => {
  try {
    const workspaces = await db('workspaces').select();

    res.status(200).send({
      status: 'success',
      workspaces,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

router.get('/workspaces/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await db('workspaces').where({ id: workspaceId }).first();

    res.status(200).send({
      status: 'success',
      workspace,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

router.post('/workspaces', async (req, res) => {
  try {
    const { name } = req.body;
    const [workspace] = await db('workspaces')
      .insert({
        name,
        ownerId: res.locals.user.id,
      })
      .returning('*');

    res.status(200).send({
      status: 'success',
      workspace,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

router.put('/workspaces/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await db('workspaces').where({ id }).first();

    if (!workspace) {
      throw new Error('workspace does not exist');
    }

    const [updatedWorkspace] = await db('workspaces')
      .where({ id: workspace.id })
      .update({ name: req.body.name })
      .returning('*');

    res.status(200).send({
      status: 'success',
      workspace: updatedWorkspace,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

router.delete('/workspaces/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const workspace = await db('workspaces').where({ id }).first();

    const [deletedWorkspace] = await db('workspaces')
      .where({ id: workspace.id })
      .del()
      .returning('*');

    res.status(200).send({
      status: 'success',
      workspace: deletedWorkspace,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

router.get('/workspaces/:workspaceId/data', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await db('workspaces').where({ id: workspaceId }).first();
    const owner = await db('users')
      .where({ id: workspace.ownerId })
      .first(['id', 'username', 'email']);
    const channels = await db('channels').where({ workspaceId }).select();

    const directMessages = await db('users')
      .distinctOn('users.id', 'users.username')
      .leftJoin('direct_messages', (builder) =>
        builder
          .on({ 'users.id': 'direct-messages.senderId' })
          .orOn({ 'users.id': 'direct_messages.recipientId' })
      )
      .where({ workspaceId })
      .select('users.id', 'users.username')
      .orderBy('users.username', 'DESC');

    res.status(200).send({
      status: 'success',
      id: workspaceId,
      name: workspace.name,
      channels,
      directMessages: Array.isArray(directMessages)
        ? directMessages.filter((member) => member.id !== res.locals.user.id)
        : [],
      defaultChannel: channels
        .filter((channel) => channel.default === true)
        .pop(),
      owner,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});
export default router;
