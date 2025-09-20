import { Telegraf } from "telegraf";
import "dotenv/config";

const bot = new Telegraf(process.env.BOT_API_TOKEN!);

bot.start((ctx) => {
  ctx.reply("Hello! I am your EscSurveyBot");
});

bot.help((ctx) => {
  ctx.reply("Available help commands: /start ,/help");
});

bot.on("text", (ctx) => {
  ctx.reply(`You said: ${ctx.message.text}`);
});

bot.launch();

console.log("Bot is running...");
