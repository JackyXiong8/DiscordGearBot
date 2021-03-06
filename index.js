var mongoose = require('mongoose')

var express = require('express')

var app = express()

mongoose.connect('mongodb://Mediocracy:MonkeyZebra@1@ds253831.mlab.com:53831/gearscore')

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
    image: { data: Buffer, contentType: String },
    sailing: {type: String}
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


        console.log(args, 'sent by', message.author.username)

        if (cmd === prefix + 'help') {
            message.channel.send({embed : {
                color :000000, 
                title: 'Commands',
                description: "`!gsranking` for rankings \n`!stats set AP <AP HERE>` to set AP \n`!stats set DP <DP HERE>` to set DP \n`!stats set Awakening <AP HERE>` to set Awakening AP \n`!stats set name <NAME HERE>` to set character name \n`!stats set family <FAMILY NAME HERE>` to set family name \n`!stats set level <LEVEL HERE>` to set level \n`!stats set axe <AXE LEVEL HERE>` to set Trina Axe level \n`!stats set sailing <SAILING LEVEL HERE>` to set sailing level" 
            }})
        }

        //Set commands
        if ((cmd === prefix + 'stats') && (args[0] === 'set')) {
            if (args[1] === 'family') {
                Stat.findOneAndUpdate({ id: message.author.id }, { family: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send('Somethings wrong, tell Jacky')
                    } else {
                        if (message.guild.members.get(bot.user.id).hasPermission("MANAGE_NICKNAMES") && message.guild.members.get(bot.user.id).hasPermission("CHANGE_NICKNAME")) {
                            message.guild.members.get(message.author.id).setNickname(args[2]);
                        } else {
                            message.channel.send({embed:{
                                color: 000000,
                                description: "I dont have the permissons to change your nickname in this server. Should I get permission to do so, simply set your family name again to have your nickname changed to it."
                            }})
                        }
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Family name set to ' + args[2]
                        }})
                    }
                })
            }
            if (args[1] === 'AP') {
                Stat.findOneAndUpdate({ id: message.author.id }, { ap: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})                    } else {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Ap is set to ' + args[2]
                        }})
                    }
                })
            }
            if (args[1] === 'name') {
                Stat.findOneAndUpdate({ id: message.author.id }, { name: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})                    } else {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Your name is set to  ' + args[2]
                        }})
                    }
                })
            }
            if (args[1] === 'class') {
                Stat.findOneAndUpdate({ id: message.author.id }, { class: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})                    } else {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Your class is set to ' + args[2]
                        }})
                    }
                })

            }
            if (args[1] === 'level') {
                Stat.findOneAndUpdate({ id: message.author.id }, { level: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})                    } else {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Your level is set to ' + args[2]
                        }})
                    }
                })
            }
            if (args[1] === 'Awakening') {
                Stat.findOneAndUpdate({ id: message.author.id }, { awakening: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})                    } else {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Awakening AP set to ' + args[2]
                        }})
                    }
                })
            }
            if (args[1] === 'DP') {
                Stat.findOneAndUpdate({ id: message.author.id }, { dp: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})                    } else {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'DP set to ' + args[2]
                        }})
                    }
                })
            }
            if (args[1] === 'Trina_Axe') {
                Stat.findOneAndUpdate({ id: message.author.id }, { axe: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})
                    } else {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Trina Axe set to ' + args[2]
                        }})
                    }
                })
            }
            if(args[1] === 'Sailing'){
                Stat.findOneAndUpdate({ id: message.author.id }, { sailing: args[2] }, { upsert: true }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})
                    } else {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Sailing level set to ' + args[2]
                        }})
                    }
                })
            }
            if (args[1] === 'picture') {
                if (message.attachments.size > 0) {
                    console.log('picture found')
                    message.channel.send('Found picture')
                    console.log(message.attachments['470043013717032967'])
                } else {
                    message.channel.send("No messages detected.")
                }
            }
        }


        /////RANKING/////


        if (cmd === prefix + 'gsranking') {
            var humans = []
            var gearedPeople = []

            ////Filtering out the bots/////

            message.guild.members.forEach(function (guildMember, guildMemberId) {
                if (guildMember.user.bot == false) {
                    humans.push(guildMemberId)
                }
            })



            /////Look for the humans in db. If their ID is found in db, push them to the geared array/////

            function filter(i) {
                if (i < humans.length) {
                    Stat.find({ id: humans[i] }, function (err, data) {
                        if (err) {
                            console.log('error at ' + humans[i])
                        } else {
                            if (data.length) {
                                gearedPeople.push({ id: humans[i], name: data[0]['family'], gear: data[0]['ap'] + data[0]['dp'], ap: data[0]['ap'], awakening: data[0]['awakening'], dp: data[0]['dp'] })
                            }
                        }
                        filter(i + 1)
                    })
                } else {
                    insertionSort(gearedPeople)
                    sortedPeople = []
                    for(var o = gearedPeople.length - 1; o >= 0; o--){
                        sortedPeople.push(gearedPeople[o])
                    }

                    var rankedMessage = ''
    
                    for(var x = 0; x < sortedPeople.length; x++){
                        rankedMessage += (x + 1 + ' ' + sortedPeople[x]['name'] + ' - ' + sortedPeople[x]['gear'] +' \n ')
                    }
                    message.channel.send({embed: {
                        color : 000000,
                        title: 'Gear Score Ranking',
                        description: rankedMessage
                    }})
                }
            }

            filter(0)

        }

        if (cmd === prefix + 'gear') {

            /////Looking up others gear/////

            if (args[0] === 'of') {
                var userId = message.mentions.members.first()['user']['id']
                Stat.find({ id: userId }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})                    } else {
                        if (data.length) {
                            message.channel.send({
                                embed: {
                                    color: 000000,
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
                                        value: data[0]['ap']
                                    },
                                    {
                                        name: 'DP',
                                        value: data[0]['dp']
                                    },
                                    {
                                        name: 'Awakening AP',
                                        value: data[0]['awakening']
                                    },
                                    {
                                        name: 'Trina Axe',
                                        value: data[0]['axe']
                                    },
                                    {
                                        name: 'Sailing level',
                                        value: data[0]['sailing']
                                    }
                                    ]
                                }
                            })
                        } else {
                            message.channel.send({embed:{
                                color: 000000,
                                description: 'This user has not entered any information yet.'
                            }})
                        }
                    }
                })

                /////Showing your gear/////

            } else {
                Stat.find({ id: message.author.id }, function (err, data) {
                    if (err) {
                        message.channel.send({embed:{
                            color: 000000,
                            description: 'Something went wrong, tell Jacky'
                        }})                    } else {
                        if (data.length) {
                            message.channel.send({
                                embed: {
                                    color: 000000,
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
                                        value: data[0]['ap']
                                    },
                                    {
                                        name: 'DP',
                                        value: data[0]['dp']
                                    },
                                    {
                                        name: 'Awakening AP',
                                        value: data[0]['awakening']
                                    },
                                    {
                                        name: 'Trina Axe',
                                        value: data[0]['axe']
                                    },
                                    {
                                        name: 'Sailing level',
                                        value: data[0]['sailing']
                                    }
                                    ]
                                }
                            })
                        } else {
                            message.channel.send({embed:{
                                color: 000000,
                                description: 'You habe not entered any information yet.'
                            }})
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

/////SORT FUNCTION/////

function insertionSort(array){
    for(var i = 0; i < array.length; i++){
        var temp = array[i]
        var j = i-1;
        while(j >= 0 && array[j]['gear'] > temp['gear']){
            array[j + 1] = array[j]
            j--
        }
        array[j + 1] = temp
    }
    // return showRanking(array)
    flippedArray = []
    for(var t = array.length - 1; t >= 0; t--){
        flippedArray.push(array[t])
    }
    return flippedArray
}

var port = process.env.PORT || 5000;


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response){
    response.send('????')
})

app.listen(app.get('port'), function() {
    console.log('node app is running at localhost:5000')
})