const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./Storage/config.json');

var fs = require('fs');
const fetch = require('node-fetch');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, Discord);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('guildMemberAdd', member => {
	const channel = message.guild.channels.cache.find(channel => channel.name === "welcome");
	const rules = message.guild.channels.cache.find(channel => channel.name === "rules");

	if (channel || rules) {
		console.log('NO WELCOME CHANNEL!');
		return
	}


	const helpMessage = new Discord.MessageEmbed()
        .setColor(0x00AE86)
        .setTitle("New Member")
        .setDescription('Welcome, '+member.username+' to ')
        .setTimestamp()
    channel.send(helpMessage);

})

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(config.Status.STRING, {type: config.Status.type});

});

client.login(config.token);
