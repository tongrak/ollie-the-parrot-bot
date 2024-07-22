import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { getSimpleMessageBody } from './snippet.js';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest, getRandomJoke } from './utils.js';
import { getShuffledOptions, getResult } from './game.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  const { type, id, data } = req.body;
  console.log('LOG: receive a request');
  console.log('LOG: Type:', type);
  
  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    if (name === 'test') {
      return res.send(getSimpleMessageBody('hello world ' + getRandomEmoji()));
    }

    if (name === 'tell-me-a-joke'){
      return res.send(getSimpleMessageBody(getRandomJoke()));
    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
