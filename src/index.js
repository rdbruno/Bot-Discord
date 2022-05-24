const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();

const commandFiles = fs.readdirSync(path.join(__dirname,"/commands")).filter(filnename => filnename.endsWith(".js"));

for (var filename of commandFiles) {
    const command = require(`./commands/${filename}`);
    bot.commands.set(command.name, command);
}

// Inicialização do Bot
// Bot initialization
bot.login(process.env.TOKEN);

bot.on("ready", () => {
    console.log(`Estou online como ${bot.user.username}`);
    if (bot.guilds.cache.size = 1) {
        bot.user.setActivity(`2D está online em ${bot.guilds.cache.size} servidor`);
    } else {
        bot.user.setActivity(`2D está online em ${bot.guilds.cache.size} servidores`);
    }
});

// Identificação de Comando do Bot
// Bot Command Identification
bot.on("message", (msg) => {
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

    const args = msg.content.slice(process.env.PREFIX.length).split(" ");
    const command = args.shift();

    try {
        bot.commands.get(command).execute(bot, msg, args);
    } catch(e) {
        console.error(e);
        return msg.reply("Ops! Eu não conheço esse comando!");
    }
});