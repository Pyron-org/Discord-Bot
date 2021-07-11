module.exports = {
    name : 'create',
    execute(message,args,Discord, docker, tcpPortUsed ) {
        if (args.length == 1) {
           
            docker.listContainers({ "filters": {"name": [args[0]]}}, function (err, containers) {
                if (containers.length != 0) { // FOUND
                    message.channel.send("Dumbass there's already a server called that")

                } else { // found
                    message.channel.send("making new server");

                    const rndInt = Math.floor(Math.random() * 65534) + 1
                    tcpPortUsed.check(rndInt, '127.0.0.1').then(function(inUse) {
                        console.log('Port '+rndInt+'|  usage: '+inUse);
                    }, function(err) {
                        console.error('Error on check:', err.message); //loop code if found port.
                    });

                    docker.createContainer({
                        Image: 'mc:mc',
                        name: args[0],
                        Env: [
                            'PORT='+rndInt
                        ]
                            
                    } , function (err, container) {
                        container.start(function (err, data) {
                          message.channel.send("CREATED SERVER: "+args[0]);
                        });
                    });
        
                    

                }
            });
        } else {
            message.channel.send("oh wow u fucked it.");       
        }


    }
}


// server stopts. reset port to 0. if forcfully shutdown. restart port on startup
// https://www.npmjs.com/package/tcp-port-used