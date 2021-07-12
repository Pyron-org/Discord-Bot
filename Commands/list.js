module.exports = {
    name : 'list',
    execute(message,args,Discord, docker, tcpPortUsed ) {
        message.channel.send("Listing all servers:")
        docker.listContainers({all:true},function (err, containers) {

            let online = 0;
            let offline = 0;

            containers.forEach(function (containerInfo) {
                if (docker.getContainer(containerInfo).id.State == "exited") {
                    online = online+1;
                    console.log(online);
                } else {
                    offline = offline+1;
                };
            });



            const createMsg = new Discord.MessageEmbed()
                .setColor(0x00AE86)
                .setTitle("Server List ")
                .setFooter('Pyron')
                .setTimestamp()
                .addFields(
                    {name: 'Total servers', value: containers.length, inline:true},
                    {name: 'Offline', value: online, inline:true},
                    {name: 'Online', value: offline, inline:true}
                    );
            message.channel.send(createMsg)
            //console.log(containers);

            
            
            
        });
        
        

    }
}


// https://www.spigotmc.org/threads/create-pages-for-a-chat-list.372648/