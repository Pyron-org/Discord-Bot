module.exports = {
    name : 'list',
    execute(message,args,Discord, docker, tcpPortUsed ) {
        message.channel.send("Listing all servers:")
        docker.listContainers({all:true},function (err, containers) {
            const createMsg = new Discord.MessageEmbed()
                .setColor(0x00AE86)
                .setTitle("Server List ")
                .setFooter('Pyron')
                 .setTimestamp()
                .addFields(
                    {name: 'Total servers', value: containers.length, inline:true},
                    {name: 'Offline', value: "0", inline:true},
                    {name: 'Online', value: "0", inline:true}
                    );
            message.channel.send(createMsg)
            console.log(containers);
            
        });
        
        

    }
}
