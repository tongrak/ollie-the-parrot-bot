import {InteractionResponseType} from 'discord-interactions'; 

export const getSimpleMessageBody = (content) => ({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: content,
    },
  });