var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/gear')

mongoose.Promise = global.Promise
var fs = require('fs')
var path = require('path')

var Schema = mongoose.Schema

var StatSchema = new mongoose.Schema({
    id: { type: Number },
    ap: { type: Number },
    family: { type: String },
    class: { type: String },
    level: { type: Number },
    awakening: { type: Number },
    dp: { type: Number },
    axe: { type: String },
    name: { type: String },
    image: { data: Buffer, contentType: String }
});

mongoose.model('GearScore', StatSchema)

var Stat = mongoose.model('GearScore')

const Discord = require('discord.js')

const botconfig = require('./botconfig.json')

const bot = new Discord.Client({ autoReconnect: true });



bot.on('ready', () => {
    console.log('ready!')
});

bot.on('message', message => {

    if (message.author.bot) return;

    if (message.channel.type === 'dm') return message.channel.send('Hello');

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if (cmd.charAt(0) === prefix) {

        console.log(args)

        if (cmd === prefix + 'help') {
            message.channel.send("!gear of (@person) to check their gear,    !stats set family (family name),    !stats set AP (ap),    !stats set DP (dp),    !stats set class (main class),    !stats set level (level).     !stats set Awakening (awakening ap),     !stats set Trina_Axe (axe level)")
        }

        //Set commands
        if ((cmd === prefix + 'stats') && (args[0] === 'set')) {
            if (args[1] === 'family') {

                console.log(message.channel.id)

                Stat.findOneAndUpdate({ id: message.author.id }, { family: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        if (message.guild.members.get(bot.user.id).hasPermission("MANAGE_NICKNAMES") && message.guild.members.get(bot.user.id).hasPermission("CHANGE_NICKNAME")) {
                            message.guild.members.get(message.author.id).setNickname(args[2]);
                        } else {
                            message.channel.sendMessage("I dont have the permissons to change your nickname in this server. Should I get permission to do so, simply set your family name again to have your nickname changed to it. Or do it yourself. I don't care.");
                        }
                        message.channel.send('Family name set to ' + args[2])
                    }
                })
            }
            if (args[1] === 'AP') {
                Stat.findOneAndUpdate({ id: message.author.id }, { ap: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        message.channel.send('AP set to ' + args[2])
                    }
                })
            }
            if (args[1] === 'name') {

                Stat.findOneAndUpdate({ id: message.author.id }, { name: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        message.channel.send('Name set to ' + args[2])
                    }
                })
            }
            if (args[1] === 'class') {

                Stat.findOneAndUpdate({ id: message.author.id }, { class: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        message.channel.send('Class set to ' + args[2])
                    }
                })

            }
            if (args[1] === 'level') {

                Stat.findOneAndUpdate({ id: message.author.id }, { level: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        message.channel.send('Level set to ' + args[2])
                    }
                })
            }
            if (args[1] === 'Awakening') {

                Stat.findOneAndUpdate({ id: message.author.id }, { awakening: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        message.channel.send('Awakening AP set to ' + args[2])
                    }
                })
            }
            if (args[1] === 'DP') {

                Stat.findOneAndUpdate({ id: message.author.id }, { dp: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        message.channel.send('DP set to ' + args[2])
                    }
                })
            }
            if (args[1] === 'Trina_Axe') {

                Stat.findOneAndUpdate({ id: message.author.id }, { axe: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        message.channel.send('Trina Axe set to ' + args[2])
                    }
                })
            }
            if (args[1] === 'picture') {
                if (message.attachments.size > 0) {
                    console.log('picture found')
                    message.channel.send('Found picture')
                    console.log(message.attachments['470043013717032967'])
                } else {
                    message.channel.send('Where the fucks your picture dawg.')
                }
            }
        }
        if (cmd === prefix + 'ranking') {
            var humans = []
            var gearedPeople = []

            message.guild.members.forEach(function (guildMember, guildMemberId) {
                if (guildMember.user.bot == false) {
                    humans.push(guildMemberId)
                }
            })

            var filtering = new Promise(function(roster, reject){
                roster('FROM THE RESOLVE')
            })
            
            filtering.then(function(value){
                console.log(value)
            })

            // for(var i = 0; i < humans.length; i++){
            //     console.log(humans[i])

            //     var geared = []

            //     Stat.find({id : humans[i]}, function(err, data){

            //         if(err){
            //             console.log('Error while searching for ' + humans[i])
            //         } else {

            //             geared.push(data[0]['id'])
            //             gearedPeople = geared
            //             console.log(data[0]['id'])

            //         }

            //     }

            // )}

        }


        if (cmd === prefix + 'gear') {

            //Looking up others gear

            if (args[0] === 'of') {

                console.log(message.mentions.members.first()['user'])

                var userId = message.mentions.members.first()['user']['id']

                Stat.find({ id: userId }, function (err, data) {
                    if (err) {
                        console.log('Something went wrong, tell Jacky')
                    } else {
                        if (data.length) {
                            message.channel.send({
                                embed: {
                                    color: 0x33FF00,
                                    author: {
                                        name: bot.user.username,
                                        icon_url: bot.user.avatarURL
                                    },
                                    title: "Gear of " + data[0]['family'],
                                    fields: [{
                                        name: 'Class',
                                        value: data[0]['class']
                                    },

                                    {
                                        name: 'AP',
                                        value: JSON.stringify(data[0]['ap'])
                                    },
                                    {
                                        name: 'DP',
                                        value: JSON.stringify(data[0]['dp'])
                                    },
                                    {
                                        name: 'Awakening AP',
                                        value: JSON.stringify(data[0]['awakening'])
                                    },
                                    {
                                        name: 'Trina Axe',
                                        value: JSON.stringify(data[0]['axe'])
                                    }
                                    ]
                                }
                            })
                        } else {
                            message.channel.send('This user has not entered any information yet.')
                        }
                    }
                })

                //showing your gear

            } else {
                Stat.find({ id: message.author.id }, function (err, data) {
                    if (err) {
                        message.channel.send('Cant find it or something went wrong. Tell Jacky')
                    } else {
                        if (data.length) {
                            message.channel.send({
                                embed: {
                                    color: 0x33FF00,
                                    author: {
                                        name: bot.user.username,
                                        icon_url: bot.user.avatarURL
                                    },
                                    title: "Gear of " + data[0]['family'],
                                    fields: [{
                                        name: 'Class',
                                        value: data[0]['class']
                                    },
                                    {
                                        name: 'AP',
                                        value: JSON.stringify(data[0]['ap'])
                                    },
                                    {
                                        name: 'DP',
                                        value: JSON.stringify(data[0]['dp'])
                                    },
                                    {
                                        name: 'Awakening AP',
                                        value: JSON.stringify(data[0]['awakening'])
                                    },
                                    {
                                        name: 'Trina Axe',
                                        value: JSON.stringify(data[0]['axe'])
                                    }
                                    ]
                                }
                            })
                        } else {
                            message.channel.send('You have not entered any information. Please refer to !help for more info.')
                        }
                    }
                })
            }

        }
        return message.delete()

    }

});

bot.login(botconfig.token)

bot.on('disconnect', function () {
    console.log('Disconnected')
    bot.on('ready', () => {
        console.log('reconnected')
    })
})

bot.on('disconnect', function () {
    bot.login(botconfig.token)
})
