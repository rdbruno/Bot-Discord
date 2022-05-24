const execute = (bot, msg, args) => {
    if (!msg.member.voice.channel) {
        return msg.reply("Você precisa estar em um canal de voz para eu segui-lo!")
    }
    msg.member.voice.channel.join();
};

module.exports = {
    name: "join",
    help: "Adiciona o 2D ao canal de voz atual",
    execute
};