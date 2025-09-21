import { Telegraf } from "telegraf";
import "dotenv/config";
import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(process.env.SITE_URL!);
  await page.setViewport({ width: 1080, height: 1024 });

  await page.locator("#LoginForm_username").fill(process.env.LOGIN_USERNAME!);
  await page.locator("#LoginForm_password").fill(process.env.LOGIN_PASSWORD!);

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click(".btn-success"),
  ]);

  await browser.close();

  const bot = new Telegraf(process.env.BOT_API_TOKEN!);

  bot.start((ctx) => {
    ctx.reply("Hello! I am your EscSurveyBot");
  });

  bot.help((ctx) => {
    ctx.reply("Available help commands: /start ,/help");
  });

  bot.on("text", (ctx) => {
    ctx.reply(`titles: ${""}`);
  });

  bot.launch();

  console.log("Bot is running...");
})();
