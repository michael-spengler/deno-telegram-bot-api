/**
 * Run this example from the shell!
 * MacOS, Linux $:
 * TOKEN=your-bot-token deno run --allow-net --allow-env https://x.nest.land/telegram_bot_api@0.0.1/examples/sending-files/02-form-data.ts
 * Windows $:
 * set TOKEN=your-bot-token && deno run --allow-net --allow-env https://x.nest.land/telegram_bot_api@0.0.1/examples/sending-files/02-form-data.ts
 */

import {
  TelegramBot,
  UpdateType,
} from "https://x.nest.land/telegram_bot_api@0.0.1/mod.ts";

/**
 * Methods for sending media also accept `FormData` created somewhere else in code.
 */

const TOKEN = Deno.env.get("TOKEN");
if (!TOKEN) throw new Error("Bot token is not provided");
const bot = new TelegramBot(TOKEN);

bot.run({
  polling: true,
});

bot.on(UpdateType.Message, async ({ message }) => {
  const form = new FormData();
  form.append("chat_id", message.chat.id.toString());
  form.append("document", new Blob(["hello world"]), "greetings.txt");

  await bot.sendDocument(form);
});
