const { Channel } = require("discord.js")

module.exports = {
    name : 'help',
    execute(message,args,Discord) {
        const helpMessage = new Discord.MessageEmbed()
            .setColor(0x00AE86)
            .setTitle("Help ")
            .setFooter('Deniable Network')
            .setTimestamp()
            .addFields(
                { name: 'test', value: 'test'}
            );

        message.channel.send("fuck off");

    }
}