const execute = (bot, msg, args) => {
    let helpMSG = "**===== COMANDOS =====**\n\n";

    bot.commands.forEach(command => {
        if (command.help) {
            helpMSG += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
        }
    });
    return msg.channel.send(helpMSG);
};

module.exports = {
    name: "help",
    execute
};