module.exports = {
    name : 'create',
    execute(message,args,Discord, docker, tcpPortUsed, MongoClient ) {
        if (args.length == 1) {
           
            docker.listContainers({ "filters": {"name": [args[0]]}}, function (err, containers) {
                if (containers.length != 0) { // FOUND
                    message.channel.send("Dumbass there's already a server called that")

                } else { // found
                    message.channel.send("making new server");
                    
                    MongoClient.connect("mongodb://network:63oYljVMFFb5VOZVa4q5nlNdkq8r5EkYuIyKGJK7gZEMi2Q6FnZCBF4RnrROeUZ6pbXIJG17EK0Lm53dstFw1ayElsT5LjOVdlscZkdl6rnXFL7b2gon9YhneM19lKnT@dev1.pyron.dannington.systems:27017/network", function(err, db) {
	                    if(err) { return console.dir(err); }

	                    let database = db.db('network');
	                    let cursor = database.collection('port');
  
                        var rndInt = Math.floor(Math.random() * 65534) + 1
                        tcpPortUsed.check(rndInt, '127.0.0.1').then(function(inUse) {
                            if (!inUse) {
                                docker.createContainer({
                                    Image: 'mc:mc',
                                    name: args[0],
                                    Env: [ 'PORT='+rndInt ],
                                    ExposedPorts: { [rndInt+"/tcp"]: {}, },
                                    ExposedPorts: {
                                        [rndInt + "/tcp"]: {},
                                      },
                                    HostConfig: {
                                        PortBindings: { [rndInt + "/tcp"]: [{ HostPort: rndInt.toString() }] },
                                      }
    
                                } , function (err, container) {                        
                                    container.start(function (err, data) {
    
                                        container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
                                            //dockerode may demultiplex attach streams for you :) 
                                            //container.modem.demuxStream(stream, process.stdout, process.stderr);    
                                                                                                                     
                                        });  

                                        let obj = { name: args[0], port: rndInt };
                                        cursor.insertOne(obj, function(err, res) {
                                            if (err) throw err;
                                            console.log("1 document inserted");
                                        
                                        });
                                        
                                        const createMsg = new Discord.MessageEmbed()
                                            .setColor(0x00AE86)
                                            .setTitle("Server created ")
                                            .setFooter('Pyron')
                                            .setTimestamp()
                                            .addFields(
                                                {name: 'Server name', value: args[0]},
                                                {name: 'Port', value: rndInt},
                                                {name: 'Status', value: "Starting"}
                                            );
                                        message.channel.send(createMsg);
                                    });
                                });
                            } else {
                                message.channel.send('port in use! faggot. kys');
                            }
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
// mongodoc add time frame then auto remove
// bungee ping every 5 mins to check if server online