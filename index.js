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
    name: { type: String }
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
            message.channel.send("!stats set family (family name), !stats set AP (ap), !stats set DP (dp), !stats set class (main class), !stats set level (level).  !stats set Awakening (awakening ap),  !stats set Trina_Axe (axe level)")
        }

        //Set commands
        if ((cmd === prefix + 'stats') && (args[0] === 'set')) {




            if (args[1] === 'family') {

                Stat.findOneAndUpdate({ id: message.author.id }, { family: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        return message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        return message.channel.send('Family name set to ' + args[2])
                    }
                })





            }

            if (args[1] === 'AP') {


                Stat.findOneAndUpdate({ id: message.author.id }, { ap: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        return message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        return message.channel.send('AP set to ' + args[2])
                    }
                })
            }




            if (args[1] === 'name') {

                Stat.findOneAndUpdate({ id: message.author.id }, { name: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        return message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        return message.channel.send('Name set to ' + args[2])
                    }
                })
            }


            if (args[1] === 'class') {

                Stat.findOneAndUpdate({ id: message.author.id }, { class: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        return message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        return message.channel.send('Class set to ' + args[2])
                    }
                })

            }

            if (args[1] === 'level') {

                Stat.findOneAndUpdate({ id: message.author.id }, { level: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        return message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        return message.channel.send('Level set to ' + args[2])
                    }
                })

            }


            if (args[1] === 'Awakening') {

                Stat.findOneAndUpdate({ id: message.author.id }, { awakening: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        return message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        return message.channel.send('Awakening AP set to ' + args[2])
                    }
                })

            }

            if (args[1] === 'DP') {

                Stat.findOneAndUpdate({ id: message.author.id }, { dp: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        return message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        return message.channel.send('DP set to ' + args[2])
                    }
                })

            }

            if (args[1] === 'Trina_Axe') {

                Stat.findOneAndUpdate({ id: message.author.id }, { axe: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        return message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        return message.channel.send('Trina Axe set to ' + args[2])
                    }
                })

            }




        }

        if (cmd === prefix + 'gear') {

            if (args[0] === 'of') {
                console.log('!!!!!!!', message.mentions.members.first()['user']['id'])

                var userId = message.mentions.members.first()['user']['id']

                Stat.find({ id: userId }, function (err, data) {
                    if (err) {
                        console.log('Something went wrong, tell Jacky')
                    } else {
                        return message.channel.send(JSON.stringify(data))
                    }
                })
            } else {
                Stat.find({ id: message.author.id }, function (err, data) {
                    if (err) {
                        return message.channel.send('Cant find it or something went wrong. Tell Jacky')
                    } else {
                        console.log(JSON.stringify(data[0]['ap']))
                        return message.channel.send(JSON.stringify(data))
                    }
                })
            }

        }

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




// function findUser(id){

//     Stat.count({id : id}, function(err, count) {
//         if(count > 0){
//             console.log('Found user')
//             return true
//         } else {
//             console.log('User not found')
//             return false
//         }
//     })
// }
