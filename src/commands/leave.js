const execute = (bot, msg, args) => {
    if (!msg.guild.voice.connection) {
        return msg.reply("Não estou conectada ao canal de voz do servidor!")
    }
    msg.guild.voice.connection.disconnect();
};

module.exports = {
    name: "leave",
    help: "Remove o 2D do canal de voz atual",
    execute
};