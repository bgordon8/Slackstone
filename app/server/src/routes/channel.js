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

router.get('/channels/:channelId/data', async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await db('channels').where({ id: channelId }).first();
    const members = await db('user_channels')
      .where({ channelId: channel.id })
      .leftJoin('users', 'user_channels.userId', 'users.id')
      .select(['users.id', 'users.username', 'users.email']);

    const messages = await db('messages')
      .where({ channelId: channel.id })
      .leftJoin('users', 'messages.authorId', 'users.id')
      .select(
        'users.id as userId',
        'users.username',
        'messages.id as messageId',
        'messages.text',
        'messages.created_at'
      )
      .orderBy('created_at', 'ASC');

    res.status(200).send({
      status: 'success',
      name: channel.name,
      private: !channel.public,
      default: channel.default,
      members,
      messages,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

router.post('/channels/:channelId/messages/new', async (req, res) => {
  try {
    const { channelId } = req.params;

    console.log(channelId);

    const channel = await db('channels').where({ id: channelId }).first();

    const [newMessage] = await db('messages')
      .insert({
        channelId: channel.id,
        authorId: res.locals.user.id,
        text: req.body.message,
      })
      .returning('*');

    console.log(newMessage);

    res.status(200).send({ status: 'success', message: newMessage });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});
export default router;
