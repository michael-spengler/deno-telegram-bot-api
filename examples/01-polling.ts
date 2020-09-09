/**
 * Run this example from the shell!
 * MacOS, Linux $:
 * TOKEN=your-bot-token deno run --allow-net --allow-env https://x.nest.land/telegram-bot-api@0.1.0/examples/01-polling.ts
 * Windows $:
 * set TOKEN=your-bot-token && deno run --allow-net --allow-env https://x.nest.land/telegram-bot-api@0.1.0/examples/01-polling.ts
 */

import {
  TelegramBot,
  UpdateType,
} from "https://x.nest.land/telegram-bot-api@0.1.0/mod.ts";

/**
 * This example shows how to run bot using long polling mechanism.
 * Polling parameter accepts the same options like described in docs
 * @see https://core.telegram.org/bots/api#getupdates.
 * Or just pass `true`, then polling will be run with bot default options:
 * {
 *   timeout: 30,
 * }
 */

const TOKEN = Deno.env.get("TOKEN");
if (!TOKEN) throw new Error("Bot token is not provided");
const bot = new TelegramBot(TOKEN);

// if webhook was set up before, it should be deleted prior to switching to polling
await bot.deleteWebhook();

bot.run({
  polling: {
    timeout: 60,
  },
});

// UpdateType supports all telegram update types https://core.telegram.org/bots/api#update
// callback type matches provided UpdateType
bot.on(UpdateType.Message, async ({ message }) => {
  const chatId = message.chat.id;

  await bot.sendSticker({
    chat_id: chatId,
    sticker:
      "CAACAgIAAxkBAAL8WV75-kCnWs9hcYMfI9ate169VHLsAAJdAgAC3PKrB6IOmSPgo_bnGgQ",
  });
});
