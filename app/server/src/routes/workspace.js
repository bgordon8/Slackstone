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

export default router;
